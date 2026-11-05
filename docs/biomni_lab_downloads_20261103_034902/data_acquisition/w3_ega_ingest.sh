#!/usr/bin/env bash
# W3 EGA BriTROC-1 (EGAD00001011049) ingestion (PENDING USER AUTH).
# Requires DAC approval for the dataset + your EGA credentials. Nothing downloads without them.
set -euo pipefail
: "${EGA_CREDENTIALS:?Set EGA_CREDENTIALS=/path/to/ega_credentials.json  ({\"username\":\"..\",\"password\":\"..\"})}"
DATASET="${EGA_DATASET:-EGAD00001011049}"
WORK="${WORK:-/workspace/ega_pull}"; mkdir -p "$WORK"; cd "$WORK"
command -v pyega3 >/dev/null || pip install pyega3
# list files you are entitled to (verifies DAC approval):
pyega3 -cf "$EGA_CREDENTIALS" files "$DATASET"
# download the whole dataset (or swap for a specific EGAF accession / a file list):
if [[ -n "${EGA_FILELIST:-}" ]]; then
  while read -r ACC; do [[ -z "$ACC" ]] && continue; pyega3 -cf "$EGA_CREDENTIALS" fetch "$ACC" --output-dir "$WORK"; done < "$EGA_FILELIST"
else
  pyega3 -cf "$EGA_CREDENTIALS" fetch "$DATASET" --output-dir "$WORK"
fi
echo "EGA pull staged in $WORK for $DATASET (pair diagnosis vs relapse samples via sample metadata)."
