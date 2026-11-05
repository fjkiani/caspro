#!/usr/bin/env bash
# INGEST_MASTER.sh - one-touch controlled-data ingestion for the HGSOC
# true-resistance acquisition program. Wraps the per-source pulls.
#
# SAFETY: --dry-run (default) touches NO controlled data (reachability + request
# shape only). Nothing here contains a secret; you export your own credentials.
# Controlled data pulls ONLY with your signed-DUA / DAC-approved login.
#
#   ./INGEST_MASTER.sh                 # dry-run reachability sweep of all sources
#   ./INGEST_MASTER.sh --execute ega   # pull EGA BriTROC-1 (needs EGA_CREDENTIALS + DAC)
#   ./INGEST_MASTER.sh --execute all   # pull everything you have creds for
#
# Credentials expected in the environment (export before --execute):
#   PDS_USER, PDS_PASSWORD                 (Project Data Sphere; signed DUA)
#   DBGAP_NGC   [+ DBGAP_PHS, DBGAP_RUNLIST]   (dbGaP repo key from approved DAR)
#   EGA_CREDENTIALS                        (path to EGA credentials JSON; DAC approval)
#   SYNAPSE_AUTH_TOKEN                     (Synapse PAT; open tier pullable now)
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PY="${PYTHON:-python3}"
MODE="--dry-run"; TARGET="all"
[[ "${1:-}" == "--execute" ]] && { MODE="--execute"; shift; }
[[ -n "${1:-}" ]] && TARGET="$1"

echo "== INGEST_MASTER == mode=$MODE target=$TARGET"
run_one () { # $1 source  $2 idflag  $3 id
  echo ">> $1"
  "$PY" "$HERE/ingest_master.py" --source "$1" "$2" "$3" $MODE || echo "   ($1 step returned non-zero — usually missing creds in dry-run; safe)"
}

case "$TARGET" in
  all)
    if [[ "$MODE" == "--dry-run" ]]; then
      "$PY" "$HERE/ingest_master.py" --all --dry-run
    else
      run_one ega     --dataset EGAD00001011049
      run_one dbgap   --phs     phs000178.v11.p8
      run_one synapse --syn     syn25569736
      run_one pds     --trial   GOG-0218
    fi ;;
  ega)     run_one ega     --dataset "${EGA_DATASET:-EGAD00001011049}" ;;
  dbgap)   run_one dbgap   --phs     "${DBGAP_PHS:-phs000178.v11.p8}" ;;
  synapse) run_one synapse --syn     "${SYN_ENTITY:-syn25569736}" ;;
  pds)     run_one pds     --trial   "${PDS_TRIAL:-GOG-0218}" ;;
  *) echo "unknown target: $TARGET (use: all|ega|dbgap|synapse|pds)"; exit 2 ;;
esac
echo "== done =="
