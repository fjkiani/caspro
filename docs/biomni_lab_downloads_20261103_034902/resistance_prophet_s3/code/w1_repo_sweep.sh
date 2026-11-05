#!/usr/bin/env bash
# W1: all-ref search across every git repo on disk for Resistance Prophet / S3 targets.
# Read-only. Writes raw hit files to /workspace/s3work/w1_raw/
set -uo pipefail
OUT=/workspace/s3work/w1_raw
mkdir -p "$OUT"

REPOS=$(for d in /workspace/*/.git; do dirname "$d"; done)

# Target patterns, one per named search
declare -A PAT=(
  [rp_name]='Resistance Prophet|resistance_prophet|predict_resistance'
  [s3_feat]='s3_diag|s3_at_diagnosis|s3@diagnosis|cn_signature_3|CN signature 3|signature_3|sig3_exposure'
  [hrd]='\bHRD\b|hrd_score|homologous_recombination_deficien|brca_mut|hr_gene_mut'
  [endpoint]='platinum_free_interval|pfi_months|platinum_status|pt_sensitivity|primary_refractory|primary_resistant|PLATINUM_RESISTANT|platinum_sensitive|progression_free'
  [named1]='03_resistance_association'
  [named2]='s3_diag_cv_validation'
  [named3]='synthetic_lethality/ovarian'
  [erbb2]='ERBB2'
  [zeta]='zeta_core|ZetaCore|zeta_score|ZETA_CORE'
  [thresh]='THRESHOLD|CUTOFF|cutpoint|calibrat|refus|REFUS|fail_closed|FAIL_CLOSED|recommendation'
  [unsourced]='8807|0\.8807'
)

echo "repo,ref_count" > "$OUT/repo_refs.csv"
for R in $REPOS; do
  cd "$R" 2>/dev/null || continue
  NREF=$(git for-each-ref --format='%(refname)' 2>/dev/null | wc -l)
  echo "$(basename $R),$NREF" >> "$OUT/repo_refs.csv"
done

for KEY in "${!PAT[@]}"; do
  : > "$OUT/hits_${KEY}.txt"
  for R in $REPOS; do
    cd "$R" 2>/dev/null || continue
    RB=$(basename "$R")
    # search every local + remote ref (dedup by tree is not possible cheaply; dedupe lines later)
    REFS=$(git for-each-ref --format='%(refname:short)' refs/heads refs/remotes 2>/dev/null)
    [ -z "$REFS" ] && continue
    git grep -I -n -E -i "${PAT[$KEY]}" $REFS -- \
        ':(exclude)*.pyc' ':(exclude)*node_modules*' ':(exclude)*.min.js' \
        2>/dev/null | sed "s|^|${RB}::|" >> "$OUT/hits_${KEY}.txt"
  done
  # unique file-level summary
  sort -u "$OUT/hits_${KEY}.txt" -o "$OUT/hits_${KEY}.txt"
  wc -l < "$OUT/hits_${KEY}.txt" | xargs -I{} echo "${KEY}: {} hit lines"
done
