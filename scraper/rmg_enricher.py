#!/usr/bin/env python3
"""
RMG Company Enricher
Enriches rmg_companies.csv with contact details and foreign buyer relationships
using free, public data sources.

Sources:
  1. BGMEA member directory (bgmea.com.bd)     -> phone, address
  2. RSC factory list (rsc-bd.org)             -> buyer brands
  3. GitHub open-source supply chain datasets  -> additional buyer/factory data

Add GitHub dataset URLs to GITHUB_DATASETS below as you find them.
Each URL must point to a raw CSV or JSON file on GitHub.

Usage:
    python rmg_enricher.py               # Full run
    python rmg_enricher.py --resume      # Resume from checkpoint
    python rmg_enricher.py --limit 100   # Process only first N companies (for testing)
"""

import argparse
import csv
import json
import logging
import os
import random
import sys
import time

import requests
from bs4 import BeautifulSoup
from rapidfuzz import fuzz, process

_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

INPUT_FILE    = os.path.join(_SCRIPT_DIR, "rmg_companies.csv")
OUTPUT_FILE   = os.path.join(_SCRIPT_DIR, "rmg_enriched.csv")
PROGRESS_FILE = os.path.join(_SCRIPT_DIR, "rmg_progress.json")
LOG_FILE      = os.path.join(_SCRIPT_DIR, "enricher.log")

BGMEA_CACHE   = os.path.join(_SCRIPT_DIR, "bgmea_cache.json")
RSC_CACHE     = os.path.join(_SCRIPT_DIR, "rsc_cache.json")
GITHUB_CACHE  = os.path.join(_SCRIPT_DIR, "github_datasets_cache.json")

BGMEA_BASE_URL = "https://bgmea.com.bd/member-list"
RSC_BASE_URL   = "https://rsc-bd.org/factory-list"

GITHUB_DATASETS = [
    # Add raw GitHub CSV/JSON URLs here:
    # "https://raw.githubusercontent.com/org/repo/main/factories/bangladesh.csv",
]

MATCH_CONFIRMED = 80
MATCH_LOW       = 60
REQUEST_TIMEOUT = 20
REQUEST_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

OUTPUT_FIELDNAMES = [
    "registration_series", "registration_number", "organization_name",
    "expiry_date", "fee_amount",
    "bgmea_id", "bgmea_address", "bgmea_phone",
    "rsc_factory_id", "rsc_address", "rsc_buyers",
    "github_buyers", "github_source",
    "match_score", "match_confidence",
]

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger(__name__)


def _get(url, session, retries=3):
    for attempt in range(1, retries + 1):
        try:
            resp = session.get(url, headers=REQUEST_HEADERS, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            return resp.text
        except requests.RequestException as exc:
            log.warning("GET %s attempt %d/%d failed: %s", url, attempt, retries, exc)
            if attempt < retries:
                time.sleep(2 ** attempt)
    log.error("Giving up on %s", url)
    return None


def _scrape_bgmea(session):
    records = []
    page = 1
    seen_pages = set()
    log.info("Fetching BGMEA member directory...")
    while True:
        url = f"{BGMEA_BASE_URL}?page={page}" if page > 1 else BGMEA_BASE_URL
        html = _get(url, session)
        if not html:
            break
        soup = BeautifulSoup(html, "lxml")
        rows = soup.select("table tbody tr") or soup.select(".member-item") or soup.select(".factory-item")
        if not rows:
            rows = [r for r in soup.select("tr") if len(r.select("td")) >= 3]
        if not rows:
            log.warning("BGMEA page %d: no member rows found.", page)
            break
        page_key = len(rows)
        if page_key in seen_pages and page > 1:
            break
        seen_pages.add(page_key)
        for row in rows:
            cells = row.select("td")
            if len(cells) < 3:
                continue
            texts = [c.get_text(" ", strip=True) for c in cells]
            rec = {
                "bgmea_id": texts[0] if texts else "",
                "name":     texts[1] if len(texts) > 1 else "",
                "address":  texts[2] if len(texts) > 2 else "",
                "phone":    texts[3] if len(texts) > 3 else "",
            }
            if rec["name"]:
                records.append(rec)
        log.info("BGMEA page %d: %d records so far", page, len(records))
        next_link = soup.find("a", string=lambda t: t and ("next" in t.lower() or "»" in t))
        if not next_link or page > 200:
            break
        page += 1
        time.sleep(random.uniform(1.0, 2.0))
    log.info("BGMEA: %d records total", len(records))
    return records


def _load_bgmea(session):
    if os.path.isfile(BGMEA_CACHE):
        with open(BGMEA_CACHE, encoding="utf-8") as f:
            data = json.load(f)
        log.info("BGMEA cache: %d records", len(data))
        return data
    data = _scrape_bgmea(session)
    if data:
        with open(BGMEA_CACHE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    return data


def _scrape_rsc(session):
    records = []
    page = 1
    log.info("Fetching RSC factory list...")
    while True:
        url = f"{RSC_BASE_URL}?page={page}" if page > 1 else RSC_BASE_URL
        html = _get(url, session)
        if not html:
            break
        soup = BeautifulSoup(html, "lxml")
        rows = soup.select("table tbody tr") or soup.select(".factory-row") or soup.select(".factory-card")
        if not rows:
            rows = [r for r in soup.select("tr") if len(r.select("td")) >= 2]
        if not rows:
            log.warning("RSC page %d: no rows found.", page)
            break
        for row in rows:
            cells = row.select("td")
            if len(cells) < 2:
                continue
            texts = [c.get_text(" ", strip=True) for c in cells]
            buyers_cell = ""
            for c in cells:
                links = c.select("a, img")
                if links:
                    names = [l.get("alt") or l.get("title") or l.get_text(strip=True) for l in links]
                    candidate = ", ".join(b for b in names if b)
                    if len(candidate) > len(buyers_cell):
                        buyers_cell = candidate
            rec = {
                "rsc_factory_id": texts[0] if texts else "",
                "name":           texts[1] if len(texts) > 1 else texts[0] if texts else "",
                "address":        texts[2] if len(texts) > 2 else "",
                "buyers":         buyers_cell,
            }
            if rec["name"]:
                records.append(rec)
        log.info("RSC page %d: %d records so far", page, len(records))
        next_link = soup.find("a", string=lambda t: t and ("next" in t.lower() or "»" in t))
        if not next_link or page > 200:
            break
        page += 1
        time.sleep(random.uniform(1.0, 2.0))
    log.info("RSC: %d records total", len(records))
    return records


def _load_rsc(session):
    if os.path.isfile(RSC_CACHE):
        with open(RSC_CACHE, encoding="utf-8") as f:
            data = json.load(f)
        log.info("RSC cache: %d records", len(data))
        return data
    data = _scrape_rsc(session)
    if data:
        with open(RSC_CACHE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    return data


def _load_github_datasets(session):
    if not GITHUB_DATASETS:
        return []
    if os.path.isfile(GITHUB_CACHE):
        with open(GITHUB_CACHE, encoding="utf-8") as f:
            data = json.load(f)
        log.info("GitHub cache: %d records", len(data))
        return data
    all_records = []
    for url in GITHUB_DATASETS:
        log.info("Fetching GitHub dataset: %s", url)
        content = _get(url, session)
        if not content:
            continue
        records = []
        if url.endswith(".csv"):
            import io
            reader = csv.DictReader(io.StringIO(content))
            for row in reader:
                norm = {k.lower().strip(): v.strip() for k, v in row.items()}
                name = (norm.get("name") or norm.get("factory_name") or
                        norm.get("facility_name") or norm.get("organization_name") or "")
                if name:
                    records.append({"name": name, "address": norm.get("address", ""),
                                    "buyers": norm.get("buyers", norm.get("contributors", norm.get("brands", ""))),
                                    "source": url})
        elif url.endswith(".json"):
            try:
                data = json.loads(content)
                items = data if isinstance(data, list) else data.get("features", data.get("facilities", data.get("results", [])))
                for item in items:
                    if isinstance(item, dict):
                        name = item.get("name") or item.get("factory_name") or item.get("facility_name") or ""
                        if name:
                            buyers = ", ".join(item["contributors"]) if isinstance(item.get("contributors"), list) else item.get("buyers", "")
                            records.append({"name": name, "address": item.get("address", ""), "buyers": buyers, "source": url})
            except json.JSONDecodeError:
                log.warning("Could not parse JSON from %s", url)
        log.info("GitHub %s: %d records", url, len(records))
        all_records.extend(records)
    if all_records:
        with open(GITHUB_CACHE, "w", encoding="utf-8") as f:
            json.dump(all_records, f, indent=2, ensure_ascii=False)
    return all_records


def _best_match(query, candidates, threshold=MATCH_LOW):
    if not candidates:
        return None, 0
    result = process.extractOne(query, candidates, scorer=fuzz.token_sort_ratio)
    if result and result[1] >= threshold:
        return result[0], result[1]
    return None, 0


def _confidence(score):
    if score >= MATCH_CONFIRMED:
        return "confirmed"
    if score >= MATCH_LOW:
        return "low"
    return "none"


def _load_progress():
    if os.path.isfile(PROGRESS_FILE):
        with open(PROGRESS_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {"last_index": -1}


def _save_progress(progress):
    with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
        json.dump(progress, f, indent=2)


def run(resume, limit):
    if not os.path.isfile(INPUT_FILE):
        log.error("Input file not found: %s — run rmg_filter.py first.", INPUT_FILE)
        sys.exit(1)

    with open(INPUT_FILE, newline="", encoding="utf-8") as f:
        companies = list(csv.DictReader(f))

    if limit:
        companies = companies[:limit]

    log.info("Loaded %d RMG companies to enrich.", len(companies))

    session = requests.Session()
    bgmea_records  = _load_bgmea(session)
    rsc_records    = _load_rsc(session)
    github_records = _load_github_datasets(session)

    bgmea_names  = [r["name"] for r in bgmea_records]
    rsc_names    = [r["name"] for r in rsc_records]
    github_names = [r["name"] for r in github_records]

    log.info("Reference data: BGMEA=%d  RSC=%d  GitHub=%d", len(bgmea_records), len(rsc_records), len(github_records))

    progress    = _load_progress() if resume else {"last_index": -1}
    start_index = progress["last_index"] + 1

    if start_index >= len(companies):
        log.info("All companies already processed. Done.")
        return

    mode = "a" if resume and os.path.isfile(OUTPUT_FILE) else "w"
    with open(OUTPUT_FILE, mode, newline="", encoding="utf-8") as fout:
        writer = csv.DictWriter(fout, fieldnames=OUTPUT_FIELDNAMES)
        if mode == "w":
            writer.writeheader()

        for i, company in enumerate(companies):
            if i < start_index:
                continue

            name = company.get("organization_name", "").strip()
            row = {
                "registration_series": company.get("registration_series", ""),
                "registration_number": company.get("registration_number", ""),
                "organization_name":   name,
                "expiry_date":         company.get("expiry_date", ""),
                "fee_amount":          company.get("fee_amount", ""),
                "bgmea_id": "", "bgmea_address": "", "bgmea_phone": "",
                "rsc_factory_id": "", "rsc_address": "", "rsc_buyers": "",
                "github_buyers": "", "github_source": "",
                "match_score": 0, "match_confidence": "none",
            }

            best_score = 0

            matched, score = _best_match(name, bgmea_names)
            if matched:
                rec = bgmea_records[bgmea_names.index(matched)]
                row["bgmea_id"] = rec.get("bgmea_id", "")
                row["bgmea_address"] = rec.get("address", "")
                row["bgmea_phone"] = rec.get("phone", "")
                if score > best_score:
                    best_score = score

            matched, score = _best_match(name, rsc_names)
            if matched:
                rec = rsc_records[rsc_names.index(matched)]
                row["rsc_factory_id"] = rec.get("rsc_factory_id", "")
                row["rsc_address"] = rec.get("address", "")
                row["rsc_buyers"] = rec.get("buyers", "")
                if score > best_score:
                    best_score = score

            matched, score = _best_match(name, github_names)
            if matched:
                rec = github_records[github_names.index(matched)]
                row["github_buyers"] = rec.get("buyers", "")
                row["github_source"] = rec.get("source", "")
                if score > best_score:
                    best_score = score

            row["match_score"]      = best_score
            row["match_confidence"] = _confidence(best_score)
            writer.writerow(row)

            if (i + 1) % 100 == 0:
                progress["last_index"] = i
                _save_progress(progress)
                log.info("Progress: %d/%d", i + 1, len(companies))

        progress["last_index"] = len(companies) - 1
        _save_progress(progress)

    log.info("Enrichment complete. Output: %s", OUTPUT_FILE)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--resume", action="store_true")
    parser.add_argument("--limit", type=int, default=None)
    args = parser.parse_args()
    run(resume=args.resume, limit=args.limit)


if __name__ == "__main__":
    main()
