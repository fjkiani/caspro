#!/usr/bin/env bash
# =============================================================================
# BriTROC-1 (EGAD00001011049) full/selective BAM pull for Sig7 + Serial-SAE.
#
# RUN THIS ON A EUROPE-PROXIMATE VM (EGA servers are at EBI/CRG in the EU;
# transatlantic pulls are slow). Requires ~281 GB free disk for the 182-pair
# set (364 BAMs) or ~511 GB for the full 679-file dataset.
#
# CREDENTIALS: never hardcoded. Provide an EGA credentials JSON via env:
#   export EGA_CREDS=/path/to/.ega_credentials.json   # {"username":..,"password":..}
# The account must be ENTITLED to EGAD00001011049 (verified live 2026-07-20).
#
# USAGE:
#   export EGA_CREDS=/secure/.ega_credentials.json
#   ./w3_full_cohort_pull.sh paired      # 364 BAMs = 182 diagnosis+relapse pairs (recommended)
#   ./w3_full_cohort_pull.sh all         # all 679 files (~511 GB)
#   ./w3_full_cohort_pull.sh diagnosis   # 182 diagnosis specimens only
# Requires: pip install pyega3 ; and w3_britroc_cohort_182pairs.csv alongside this script.
# =============================================================================
set -euo pipefail
MODE="${1:-paired}"
: "${EGA_CREDS:?Set EGA_CREDS to your EGA credentials JSON path}"
HERE="$(cd "$(dirname "$0")" && pwd)"
COHORT="$HERE/w3_britroc_cohort_182pairs.csv"
OUT="${OUT:-$HERE/britroc_bams}"
CONN="${CONN:-8}"
mkdir -p "$OUT"

python3 - "$MODE" "$COHORT" <<'PY' > "$OUT/_egaf_to_fetch.txt"
import csv, sys
mode, cohort = sys.argv[1], sys.argv[2]
egafs=[]
with open(cohort) as f:
    for r in csv.DictReader(f):
        if mode in ("paired","diagnosis"): egafs.append(r["dx_file_egaf"])
        if mode in ("paired","relapse"):   egafs.append(r["relapse_file_egaf"])
print("\n".join(dict.fromkeys(egafs)))
PY

N=$(wc -l < "$OUT/_egaf_to_fetch.txt")
echo "[$(date)] Mode=$MODE : $N files to fetch into $OUT"
i=0
while read -r EGAF; do
  [ -z "$EGAF" ] && continue
  i=$((i+1))
  echo "[$(date)] ($i/$N) fetching $EGAF ..."
  python3 -m pyega3.pyega3 -c "$CONN" -cf "$EGA_CREDS" fetch "$EGAF" --output-dir "$OUT/" \
     || echo "[WARN] $EGAF failed; continuing"
done < "$OUT/_egaf_to_fetch.txt"
echo "[$(date)] DONE. pyega3 verifies MD5 per file on download."
echo "Next: run QDNAseq (run_qdnaseq.R) then CN-signature fitting (CINSignatureQuantification / britroc-1 repo)."
