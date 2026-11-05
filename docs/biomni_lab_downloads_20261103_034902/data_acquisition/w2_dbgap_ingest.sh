#!/usr/bin/env bash
# W2 dbGaP controlled-data ingestion (PENDING USER AUTH).
# Requires: approved DAR + repository key. Nothing here downloads without YOUR .ngc key.
set -euo pipefail
: "${DBGAP_NGC:?Set DBGAP_NGC=/path/to/prj_XXXXX.ngc (from your approved dbGaP DAR)}"
: "${DBGAP_PHS:?Set DBGAP_PHS=phsXXXXXX.vN.pN (GOG-0218 submission or phs000178 TCGA-OV)}"
WORK="${WORK:-/workspace/dbgap_pull}"; mkdir -p "$WORK"; cd "$WORK"
# 1) configure SRA Toolkit with the repo key (installs toolkit if missing)
command -v prefetch >/dev/null || { echo "Install SRA Toolkit: https://github.com/ncbi/sra-tools"; exit 2; }
vdb-config --import "$DBGAP_NGC"
# 2) fetch the cart / run list for the study (user selects files in dbGaP file selector -> cart file)
#    Example with a krt cart file exported from dbGaP:
#    prefetch --ngc "$DBGAP_NGC" cart_DAR12345_current.krt
# 3) or fetch specific controlled runs once you have the accession list:
if [[ -n "${DBGAP_RUNLIST:-}" ]]; then
  while read -r ACC; do [[ -z "$ACC" ]] && continue; prefetch --ngc "$DBGAP_NGC" "$ACC"; done < "$DBGAP_RUNLIST"
fi
echo "dbGaP pull staged in $WORK (study $DBGAP_PHS). Phenotype/PFI tables are in the study's *.MULTI / phenotype dbGaP files."
