"""
EPB Bangladesh Export Data Downloader
Downloads all Excel/DOCX files from epb.gov.bd/views/epb-export-data
for every available fiscal year, organized into scraper/epb_data/<FY>/<period>/
"""
import os, re, time, json, random, urllib.parse, requests
from pathlib import Path
from bs4 import BeautifulSoup

BASE_URL   = "https://epb.gov.bd"
OUTPUT_DIR = Path(__file__).parent / "epb_data"
MANIFEST   = OUTPUT_DIR / "manifest.json"
HEADERS    = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
TIMEOUT    = 30

YEARS = [
    ("2025-26", "6922d31281fc96cef9e9bdfc"),
    ("2024-25", "6922d30f81fc96cef9e9bc55"),
    ("2023-24", "6922d30281fc96cef9e9b757"),
    ("2022-23", "6922d2e681fc96cef9e9b033"),
    ("2021-22", "6922d2d381fc96cef9e9aac1"),
    ("2020-21", "6922d2c781fc96cef9e9a716"),
    ("2019-20", "6922d2bb81fc96cef9e9a2f0"),
    ("2018-19", "6922d2b881fc96cef9e9a1de"),
    ("2017-18", "6922d2b881fc96cef9e9a1dd"),
    ("2016-17", "6922d2b881fc96cef9e9a1dc"),
    ("2015-16", "6922d2b881fc96cef9e9a1db"),
    ("2014-15", "6922d2bd81fc96cef9e9a378"),
    ("2013-14", "6922d2b881fc96cef9e9a1da"),
    ("2012-13", "6922d2b881fc96cef9e9a1d9"),
    ("2011-12", "6922d2ab81fc96cef9e99c9d"),
    ("2010-11", "6922d2ab81fc96cef9e99c9c"),
]

session = requests.Session()
session.headers.update(HEADERS)


def _get(url, retries=3):
    for attempt in range(retries):
        try:
            r = session.get(url, timeout=TIMEOUT, verify=False)
            r.raise_for_status()
            return r
        except Exception as e:
            if attempt == retries - 1:
                print(f"  FAIL {url}: {e}")
                return None
            time.sleep(2 ** attempt)


def safe_filename(text):
    text = re.sub(r'[^\w\s\-\(\)]', '', text)
    text = re.sub(r'\s+', '_', text.strip())
    return text[:80] or "file"


def get_period_links(year_label, year_id):
    filters = json.dumps({"export_data_year": year_id})
    url = f"{BASE_URL}/views/epb-export-data?filters={urllib.parse.quote(filters)}&page_size=100"
    r = _get(url)
    if not r:
        return []
    soup = BeautifulSoup(r.text, 'lxml')
    periods = []
    for a in soup.find_all('a', href=True):
        href = a['href']
        if '/pages/epb-export-datas/' not in href:
            continue
        row = a.find_parent('tr')
        if not row:
            continue
        cells = [c.get_text(strip=True) for c in row.find_all('td')]
        title = cells[1] if len(cells) > 1 else 'unknown'
        # Skip duplicates (same href might appear in multiple years due to bug)
        if (title, href) not in periods:
            periods.append((title, href))
    return periods


def get_files_from_period(period_url):
    full_url = BASE_URL + period_url if period_url.startswith('/') else period_url
    r = _get(full_url)
    if not r:
        return []
    soup = BeautifulSoup(r.text, 'lxml')

    files = []
    seen_urls = set()

    for section in soup.find_all(['div', 'li', 'tr']):
        links = section.find_all('a', href=True)
        for a in links:
            href = a['href']
            if href in seen_urls:
                continue
            if any(ext in href.lower() for ext in ['.xlsx', '.xls', '.docx', '.doc', '.pdf', '.csv']):
                label = a.get_text(strip=True) or ''
                if not label:
                    parent_text = section.get_text(separator=' ', strip=True)
                    label = parent_text[:60]
                ext = href.rsplit('.', 1)[-1].lower()
                files.append((label, href, ext))
                seen_urls.add(href)

    # Also grab any direct Oracle Cloud Storage links not inside sections
    for a in soup.find_all('a', href=True):
        href = a['href']
        if 'objectstorage' in href and href not in seen_urls:
            ext = href.rsplit('.', 1)[-1].split('?')[0].lower()
            if ext in ('xlsx', 'xls', 'docx', 'doc', 'pdf', 'csv'):
                label = a.get_text(strip=True) or 'file'
                files.append((label, href, ext))
                seen_urls.add(href)

    return files


def download_file(url, dest_path):
    if dest_path.exists():
        return True  # already downloaded
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    r = _get(url)
    if not r:
        return False
    with open(dest_path, 'wb') as f:
        f.write(r.content)
    return True


def main():
    OUTPUT_DIR.mkdir(exist_ok=True)
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    total_downloaded = 0
    total_skipped = 0

    for year_label, year_id in YEARS:
        print(f"\n{'='*60}")
        print(f"FY {year_label}")
        print(f"{'='*60}")

        periods = get_period_links(year_label, year_id)
        print(f"  Found {len(periods)} periods")
        if not periods:
            continue

        year_dir = OUTPUT_DIR / f"FY_{year_label}"
        year_dir.mkdir(exist_ok=True)
        manifest.setdefault(year_label, {})

        seen_periods = set()
        for period_title, period_href in periods:
            if period_href in seen_periods:
                continue
            seen_periods.add(period_href)

            # Make a safe directory name for this period
            # Extract month range from title (e.g. "জুলাই-জুন" → "Jul-Jun")
            period_safe = re.sub(r'[^\w\-]', '_', period_href.rsplit('/', 1)[-1])[:50]
            period_dir = year_dir / period_safe
            period_dir.mkdir(exist_ok=True)

            print(f"  Period: {period_title[:50]!r}")
            files = get_files_from_period(period_href)
            print(f"    {len(files)} files found")

            manifest[year_label][period_title] = []
            file_counter = {}
            for label, file_url, ext in files:
                fname_base = safe_filename(label) or 'file'
                # Deduplicate filenames within a period
                count = file_counter.get(fname_base, 0)
                file_counter[fname_base] = count + 1
                fname = f"{fname_base}_{count}.{ext}" if count else f"{fname_base}.{ext}"
                dest = period_dir / fname

                ok = download_file(file_url, dest)
                status = "OK" if ok else "FAIL"
                size_kb = dest.stat().st_size // 1024 if dest.exists() else 0
                print(f"    [{status}] {fname[:60]} ({size_kb}KB)")

                if ok:
                    total_downloaded += 1
                    manifest[year_label][period_title].append({
                        "label": label[:80],
                        "file": str(dest.relative_to(OUTPUT_DIR)),
                        "url": file_url,
                        "ext": ext,
                        "size_kb": size_kb,
                    })
                else:
                    total_skipped += 1

                time.sleep(random.uniform(0.3, 0.7))

            time.sleep(random.uniform(0.5, 1.0))

        # Save manifest after each year
        MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2))

    print(f"\n\nDONE. Downloaded: {total_downloaded}, Failed: {total_skipped}")
    print(f"Manifest saved to: {MANIFEST}")


if __name__ == "__main__":
    main()
