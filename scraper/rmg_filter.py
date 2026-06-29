#!/usr/bin/env python3
"""
RMG Filter
Reads database_export.csv and extracts only RMG-sector companies
(garment, textile, dyeing, knitwear, etc.) into rmg_companies.csv.

Usage:
    python rmg_filter.py
    python rmg_filter.py --input database_export.csv --output rmg_companies.csv
"""

import argparse
import csv
import logging
import os
import sys

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout)])
log = logging.getLogger(__name__)

_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

INCLUDE_KEYWORDS = [
    "garment", "apparel", "fashion", "knitwear", "sweater", "knit",
    "textile", "fabric", "yarn", "spinning", "weaving", "dyeing", "dye",
    "washing", "laundry", "finishing", "printing", "embroidery",
    "composite", "wear", "woven", "knitting", "shirt", "trouser",
    "trouser", "pant", "jacket", "dress", "rmg",
]

EXCLUDE_KEYWORDS = [
    "hospital", "college", "university", "school", "rice", "jute",
    "paper", "cement", "steel", "food", "pharma", "chemical", "rubber",
    "bank", "tea", "leather", "shoe", "cable", "metal", "engineering",
    "power", "electric", "petroleum", "fertilizer", "soap", "paint",
    "glass", "ceramic", "tannery",
]


def is_rmg(name: str) -> bool:
    lower = name.lower()
    if any(kw in lower for kw in EXCLUDE_KEYWORDS):
        return False
    return any(kw in lower for kw in INCLUDE_KEYWORDS)


def run(input_path: str, output_path: str) -> int:
    if not os.path.isfile(input_path):
        log.error("Input file not found: %s", input_path)
        sys.exit(1)

    included = 0
    total = 0

    with open(input_path, newline="", encoding="utf-8") as fin, \
         open(output_path, "w", newline="", encoding="utf-8") as fout:

        reader = csv.DictReader(fin)
        fieldnames_raw = reader.fieldnames or []
        series_col = next((f for f in fieldnames_raw if "series" in f.lower()), None)
        if series_col is None:
            log.error("Could not find registration_series column in %s", input_path)
            sys.exit(1)

        out_fieldnames = [
            "registration_series", "registration_number",
            "organization_name", "expiry_date", "fee_amount",
        ]
        writer = csv.DictWriter(fout, fieldnames=out_fieldnames)
        writer.writeheader()

        for row in reader:
            total += 1
            name = row.get("organization_name", "").strip()
            if not name:
                continue

            series_val = row.get(series_col, row.get("registration_series", "")).strip()

            if is_rmg(name):
                writer.writerow({
                    "registration_series": series_val,
                    "registration_number": row.get("registration_number", "").strip(),
                    "organization_name": name,
                    "expiry_date": row.get("expiry_date", "").strip(),
                    "fee_amount": row.get("fee_amount", "").strip(),
                })
                included += 1

    log.info("Total records read:   %d", total)
    log.info("RMG companies found:  %d  (%.1f%%)", included, 100 * included / total if total else 0)
    log.info("Output written to:    %s", output_path)
    return included


def main() -> None:
    parser = argparse.ArgumentParser(description="Filter RMG-sector companies from boiler registry CSV.")
    parser.add_argument("--input", default=os.path.join(_SCRIPT_DIR, "database_export.csv"))
    parser.add_argument("--output", default=os.path.join(_SCRIPT_DIR, "rmg_companies.csv"))
    args = parser.parse_args()
    run(args.input, args.output)


if __name__ == "__main__":
    main()
