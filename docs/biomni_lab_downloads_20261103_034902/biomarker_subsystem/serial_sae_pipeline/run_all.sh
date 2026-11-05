#!/usr/bin/env bash
# Serial-SAE pipeline - end-to-end wrapper for the overnight run on the VM.
# Chains: preflight -> download -> QDNAseq breakpoints -> HARD STOP for platinum labels.
# Resume-safe: pyega3 skips completed files; QDNAseq re-runs idempotently. Logs are timestamped.
#
# It intentionally STOPS after QDNAseq. Step 03 (resistance association) requires a
# user-supplied platinum_status label per subject and is NOT run automatically — no labels
# are fabricated.
#
# USAGE (from the pipeline dir on the VM):
#   LEDGER=subject_ledger.csv OUTDIR=/data/ega CRED=~/.pyega3/credentials.json bash run_all.sh
set -euo pipefail

LEDGER="${LEDGER:-subject_ledger.csv}"
OUTDIR="${OUTDIR:-/data/ega}"
CRED="${CRED:-$HOME/.pyega3/credentials.json}"
QDIR="${QDIR:-/data/qdnaseq}"
BINKB="${BINKB:-30}"
LOGDIR="logs/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$LOGDIR" "$QDIR"

echo "== Serial-SAE run_all =="
echo "   ledger=$LEDGER outdir=$OUTDIR qdir=$QDIR bin=${BINKB}kb"
echo "   logs -> $LOGDIR"

echo "== [1/3] preflight =="
python3 00_preflight.py --ledger "$LEDGER" --outdir "$OUTDIR" --credentials "$CRED" 2>&1 | tee "$LOGDIR/00_preflight.log"

echo "== [2/3] EGA download (resumable) =="
python3 01_download_ega.py --ledger "$LEDGER" --outdir "$OUTDIR" --credentials "$CRED" 2>&1 | tee "$LOGDIR/01_download.log"

echo "== [3/3] QDNAseq breakpoints (hg19/${BINKB}kb) =="
Rscript 02_qdnaseq_breakpoints.R "$OUTDIR" "$QDIR" "$BINKB" 2>&1 | tee "$LOGDIR/02_qdnaseq.log"

cat <<NOTE | tee "$LOGDIR/NEXT_STEPS.txt"

== Download + copy-number complete ==
Breakpoints written to: $QDIR/breakpoints_per_sample.csv

STOP: step 03 (resistance association) is NOT run automatically.
To proceed:
  1. Fill deltas + architecture into the ledger:
       python3 04_fill_ledger.py --ledger $LEDGER --breakpoints $QDIR/breakpoints_per_sample.csv \\
           --out subject_ledger_FILLED.csv
  2. ADD a 'platinum_status' column (resistant/sensitive) per subject to subject_ledger_FILLED.csv
     from your clinical annotations. Do NOT guess labels.
  3. Run the gated association test:
       python3 03_resistance_association.py --ledger subject_ledger_FILLED.csv --out sae_result.json
NOTE
echo "run_all finished (paused for labels)."
