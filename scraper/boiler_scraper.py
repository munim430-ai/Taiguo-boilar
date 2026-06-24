#!/usr/bin/env python3
"""
Boiler Registry Scraper
Extracts public boiler registration records from the Bangladesh Boiler Inspection Department.
Source: http://www.boilerdata.boiler.gov.bd/info/bs/boilerinforeportdue12.php

Usage:
    python boiler_scraper.py                  # Full run (all series, 1-15000)
    python boiler_scraper.py --resume         # Resume from last saved checkpoint
    python boiler_scraper.py --series "EP:"   # Single series only
    python boiler_scraper.py --max-num 1000   # Limit range per series
"""

import argparse
import csv
import json
import logging
import os
import random
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Lock

import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

TARGET_URL = "http://www.boilerdata.boiler.gov.bd/info/bs/boileroutputdue2.php"

# Exact dropdown values from the form at boilerinforeportdue12.php
SERIES_OPTIONS = ["Ba: Bo:", "EP:", "BL:", "EBL:", "CP:", "UP:", "K:", "NL:", "A:", "PB:"]

BOILER_MAX = 15_000
MAX_WORKERS = 3          # Conservative concurrency cap
MIN_DELAY = 0.5          # Seconds between requests per worker
MAX_DELAY = 1.5
REQUEST_TIMEOUT = 20     # Seconds
MAX_RETRIES = 3
RETRY_BACKOFF = [2, 4, 8]

_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(_SCRIPT_DIR, "database_export.csv")
JSON_FILE = os.path.join(_SCRIPT_DIR, "records.json")
PROGRESS_FILE = os.path.join(_SCRIPT_DIR, "progress.json")
LOG_FILE = os.path.join(_SCRIPT_DIR, "scraper.log")

REQUEST_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Content-Type": "application/x-www-form-urlencoded",
    "Referer": (
        "http://www.boilerdata.boiler.gov.bd/info/bs/boilerinforeportdue12.php"
    ),
}

CSV_FIELDNAMES = [
    "registration_series",
    "registration_number",
    "organization_name",
    "expiry_date",
    "fee_amount",
]

# ---------------------------------------------------------------------------
# Logging setup
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Global state (thread-safe via locks)
# ---------------------------------------------------------------------------

_write_lock = Lock()
_progress_lock = Lock()
_counters_lock = Lock()

_stats = {"found": 0, "empty": 0, "errors": 0, "total": 0}


# ---------------------------------------------------------------------------
# Core scraping logic
# ---------------------------------------------------------------------------

def _post(session: requests.Session, series: str, number: int) -> requests.Response | None:
    """Submit the form and return the Response, retrying on transient errors."""
    payload = {
        "series": series,
        "boilerno": str(number),
        "Submit": "Submit",
    }
    for attempt, backoff in enumerate([0] + RETRY_BACKOFF, start=1):
        if backoff:
            time.sleep(backoff)
        try:
            resp = session.post(
                TARGET_URL,
                data=payload,
                headers=REQUEST_HEADERS,
                timeout=REQUEST_TIMEOUT,
            )
            resp.raise_for_status()
            return resp
        except requests.exceptions.RequestException as exc:
            log.warning(
                "Request failed (attempt %d/%d) series=%r num=%d: %s",
                attempt,
                MAX_RETRIES + 1,
                series,
                number,
                exc,
            )
    log.error("Giving up on series=%r num=%d after %d attempts", series, number, MAX_RETRIES + 1)
    return None


def _parse(html: str, series: str, number: int) -> dict | None:
    """
    Parse the HTML response.
    Returns a record dict if data was found, None if the query returned no record.
    """
    soup = BeautifulSoup(html, "lxml")

    # The result data lives in a <table style="border-collapse:collapse">
    data_table = soup.find("table", style=lambda s: s and "border-collapse" in s)
    if data_table is None:
        return None

    # Build a label -> value map from the table rows
    fields: dict[str, str] = {}
    for row in data_table.find_all("tr"):
        cells = row.find_all("td")
        if len(cells) == 2:
            label = cells[0].get_text(strip=True).rstrip(".")
            value = cells[1].get_text(strip=True)
            fields[label] = value

    # Rows present only when a record is found
    if "Company Name" not in fields:
        return None

    return {
        "registration_series": series,
        "registration_number": number,
        "organization_name": fields.get("Company Name", ""),
        "expiry_date": fields.get("Expire Date", ""),
        "fee_amount": fields.get("Fee Amount", ""),
    }


# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------

def _append_csv(record: dict) -> None:
    file_exists = os.path.isfile(CSV_FILE)
    with _write_lock:
        with open(CSV_FILE, "a", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=CSV_FIELDNAMES)
            if not file_exists or os.path.getsize(CSV_FILE) == 0:
                writer.writeheader()
            writer.writerow(record)


def _append_json_record(record: dict) -> None:
    with _write_lock:
        # Maintain a JSON array by rewriting the tail of the file
        if not os.path.isfile(JSON_FILE) or os.path.getsize(JSON_FILE) == 0:
            with open(JSON_FILE, "w", encoding="utf-8") as fh:
                json.dump([record], fh, indent=2, ensure_ascii=False)
        else:
            # Read existing, append, rewrite — acceptable for the record counts expected
            with open(JSON_FILE, "r", encoding="utf-8") as fh:
                data = json.load(fh)
            data.append(record)
            with open(JSON_FILE, "w", encoding="utf-8") as fh:
                json.dump(data, fh, indent=2, ensure_ascii=False)


# ---------------------------------------------------------------------------
# Progress / checkpoint helpers
# ---------------------------------------------------------------------------

def _load_progress() -> dict:
    if os.path.isfile(PROGRESS_FILE):
        with open(PROGRESS_FILE, encoding="utf-8") as fh:
            return json.load(fh)
    return {}


def _save_progress(progress: dict) -> None:
    with _progress_lock:
        with open(PROGRESS_FILE, "w", encoding="utf-8") as fh:
            json.dump(progress, fh, indent=2)


# ---------------------------------------------------------------------------
# Worker
# ---------------------------------------------------------------------------

def _process_one(session: requests.Session, series: str, number: int) -> dict | None:
    """Fetch + parse one (series, number) combination. Returns record or None."""
    time.sleep(random.uniform(MIN_DELAY, MAX_DELAY))

    response = _post(session, series, number)
    with _counters_lock:
        _stats["total"] += 1

    if response is None:
        with _counters_lock:
            _stats["errors"] += 1
        return None

    record = _parse(response.text, series, number)
    if record:
        with _counters_lock:
            _stats["found"] += 1
        log.info(
            "FOUND  %-12s #%-6d  %s  (expires %s)",
            series,
            number,
            record["organization_name"],
            record["expiry_date"],
        )
        _append_csv(record)
        _append_json_record(record)
    else:
        with _counters_lock:
            _stats["empty"] += 1
        log.debug("empty  %-12s #%d", series, number)

    return record


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------

def run(series_list: list[str], max_num: int, resume: bool) -> None:
    progress = _load_progress() if resume else {}
    total_combos = len(series_list) * max_num
    log.info(
        "Starting scrape: %d series × %d numbers = %d combinations  workers=%d",
        len(series_list),
        max_num,
        total_combos,
        MAX_WORKERS,
    )

    session = requests.Session()
    session.headers.update(REQUEST_HEADERS)

    for series in series_list:
        start_num = progress.get(series, 0) + 1
        if start_num > max_num:
            log.info("Series %r already complete, skipping.", series)
            continue

        log.info("Processing series %r  starting from #%d", series, start_num)

        with ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
            futures = {
                pool.submit(_process_one, session, series, num): num
                for num in range(start_num, max_num + 1)
            }
            completed_in_series = start_num - 1
            checkpoint_every = 100

            for future in as_completed(futures):
                num = futures[future]
                try:
                    future.result()
                except Exception as exc:
                    log.error("Unhandled error series=%r num=%d: %s", series, num, exc)
                    with _counters_lock:
                        _stats["errors"] += 1

                completed_in_series = max(completed_in_series, num)
                if completed_in_series % checkpoint_every == 0:
                    progress[series] = completed_in_series
                    _save_progress(progress)
                    log.info(
                        "Progress: series=%r  num=%d/%d  found=%d  empty=%d  errors=%d",
                        series,
                        completed_in_series,
                        max_num,
                        _stats["found"],
                        _stats["empty"],
                        _stats["errors"],
                    )

        # Mark series fully done
        progress[series] = max_num
        _save_progress(progress)
        log.info("Series %r complete.", series)

    log.info(
        "Scrape finished. found=%d  empty=%d  errors=%d  total=%d",
        _stats["found"],
        _stats["empty"],
        _stats["errors"],
        _stats["total"],
    )
    log.info("CSV output : %s", CSV_FILE)
    log.info("JSON output: %s", JSON_FILE)


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Scrape the Bangladesh public boiler registration registry."
    )
    parser.add_argument(
        "--resume",
        action="store_true",
        help="Resume from the last saved checkpoint (progress.json).",
    )
    parser.add_argument(
        "--series",
        type=str,
        default=None,
        help=(
            'Limit to a single series, e.g. --series "EP:".  '
            "Valid options: " + ", ".join(repr(s) for s in SERIES_OPTIONS)
        ),
    )
    parser.add_argument(
        "--max-num",
        type=int,
        default=BOILER_MAX,
        help=f"Upper bound for the boiler number range (default: {BOILER_MAX}).",
    )
    return parser.parse_args()


def main() -> None:
    args = _parse_args()

    if args.series:
        if args.series not in SERIES_OPTIONS:
            log.error(
                "Unknown series %r. Valid options: %s",
                args.series,
                SERIES_OPTIONS,
            )
            sys.exit(1)
        series_list = [args.series]
    else:
        series_list = SERIES_OPTIONS

    run(series_list=series_list, max_num=args.max_num, resume=args.resume)


if __name__ == "__main__":
    main()
