#!/usr/bin/env bash
# Serial-SAE pipeline - VM setup for a fresh eu-west-1 / europe-west2 node.
# Installs pyega3 (download) + R/QDNAseq (copy-number). Run once on the VM.
#
# Recommended instance: >= 8 vCPU, >= 32 GB RAM, and a >= 750 GB data volume
#   (dataset ~511 GB + QDNAseq intermediates + headroom; preflight requires >= 640 GB free).
#
# This script installs software only. It does NOT create credentials and does NOT download data.
# Create ~/.pyega3/credentials.json yourself on the VM (chmod 600) — never paste secrets anywhere.
set -euo pipefail

echo "== 1. System packages =="
if command -v apt-get >/dev/null; then
  sudo apt-get update -y
  sudo apt-get install -y python3-pip r-base-core samtools libcurl4-openssl-dev libssl-dev libxml2-dev
fi

echo "== 2. Python: pyega3 (pinned) =="
python3 -m pip install --upgrade pip
python3 -m pip install "pyega3==5.0.2"   # EGA download client; pin for reproducibility

echo "== 3. R / Bioconductor: QDNAseq stack =="
Rscript -e 'if(!requireNamespace("BiocManager",quietly=TRUE)) install.packages("BiocManager", repos="https://cloud.r-project.org")'
Rscript -e 'BiocManager::install(c("QDNAseq","QDNAseq.hg19","Biobase"), update=FALSE, ask=FALSE)'

echo "== 4. Verify =="
python3 -c "import pyega3; print('pyega3 OK')"
Rscript -e 'for(p in c("QDNAseq","QDNAseq.hg19","Biobase")) stopifnot(requireNamespace(p,quietly=TRUE)); cat("R packages OK\n")'

cat <<'NOTE'

== Setup complete ==
Next:
  1. Create credentials ON THIS VM (do NOT paste into chat/logs):
       mkdir -p ~/.pyega3
       cat > ~/.pyega3/credentials.json <<'EOF'
       {"username":"YOUR_EGA_USER","password":"YOUR_EGA_PASS"}
       EOF
       chmod 600 ~/.pyega3/credentials.json
  2. Run preflight:
       python3 00_preflight.py --ledger subject_ledger.csv --outdir /data/ega --credentials ~/.pyega3/credentials.json
  3. If it passes, run the pipeline:
       bash run_all.sh
NOTE
