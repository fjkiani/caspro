# Data and Code Availability

## Data Availability

### Primary Data Artifacts

All data are public GEO series matrices (platform GPL570), read directly by the analysis script:

**Cohorts:**
- **GSE63885** — https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE63885 (honest n=75: 34 resistant, 41 sensitive; 26 `na` samples excluded)
- **GSE30161** — https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE30161 (n=58: 10 resistant, PFI < 180 d)
- **GSE51373** — https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE51373 (n=28: 12 resistant, author classification)

Pooled n=161, 56 resistant, 105 sensitive.

### Receipts and Validation

**Primary results receipt:**
- `mfap4_multicohort_results.json` — exact AUROC values, bootstrap CIs, DeLong tests, cross-validation, LOCO transfer, and cross-cohort stability. Validates all reported numbers in the manuscript. Emitted deterministically by the analysis script.

**Figure receipts (current, honest — in `figures/`):**
- `fig1_forest_mfap4_vs_cage.png` / `.svg` — per-cohort AUROC forest plot (MFAP4 vs STROMAL_CAGE)
- `fig2_stability_solo_vs_cage.png` / `.svg` — cross-cohort stability (single gene vs composite)
- `fig3_roc_per_cohort.png` / `.svg` — ROC curves per cohort

> Figures from the earlier retracted single-cohort analysis (which displayed AUROC 0.763) have been removed from the figure set so that no shipped figure depicts a retracted result.

## Code Availability

### Analysis Scripts

**Primary analysis (single deterministic script):**
- `publications/07-MFAP4/scripts/mfap4_multicohort_validation.py`
  - Reads the three GEO series matrices; auto-detects and log2-transforms linear-scale matrices
  - Applies fixed probe maps and label definitions; z-scores within cohort
  - Computes MFAP4 and STROMAL_CAGE AUROC with bootstrap CIs (n=5000, seed=7), DeLong tests, repeated stratified CV (seed=42), and leave-one-cohort-out transfer
  - Outputs `mfap4_multicohort_results.json` with every reported metric

**Legacy (transparency only — reproduces the retracted 0.763):**
- `publications/07-MFAP4/scripts/gse63885_bootstrap_ci.py`
  - Retained only to document the +0.079 labeling inflation; **not** used for any reported result

### Dependencies

**Python packages:**
- `numpy` (array operations)
- `pandas` (data manipulation)
- `scikit-learn` (logistic regression, cross-validation, ROC AUC)
- `scipy` (statistical functions)
- `matplotlib` (figure generation)
- `seaborn` (enhanced plotting)

**Installation:**
```bash
pip install numpy pandas scikit-learn scipy matplotlib seaborn
```

## Reproducibility

> **Correction notice.** The single-cohort script `gse63885_bootstrap_ci.py` reproduces the
> **retracted** headline (MFAP4 AUROC 0.763 at n=101), which counts 26 samples with no recorded
> platinum-response outcome as "sensitive." The current, honest result is produced by the multi-cohort
> script below and is **0.684 (95% CI 0.557–0.805)** at n=75. Use the multi-cohort script for the
> reported numbers.

### One-Command Reproduction (current, honest results)

**Regenerate all multi-cohort results (from publication folder):**
```bash
cd publications/07-MFAP4
python scripts/mfap4_multicohort_validation.py --data-dir <geo_series_matrix_dir> --out mfap4_multicohort_results.json
```

This command (deterministic; bootstrap seed=7, CV seed=42):
1. Loads GSE63885, GSE30161, GSE51373 series matrices; auto-detects and log2-transforms linear-scale matrices.
2. Parses platinum-resistance labels column-wise (robust to ragged per-sample characteristics ordering); excludes GSE63885 `na` samples.
3. Maps probes to genes and z-scores expression within each cohort.
4. Computes MFAP4 and STROMAL_CAGE AUROC with bootstrap 95% CIs, DeLong tests, repeated stratified CV, and leave-one-cohort-out transfer.
5. Writes `mfap4_multicohort_results.json` with every reported metric, and prints the GSE63885 honest (n=75) vs published (n=101) reconciliation.

**Legacy single-cohort script (reproduces the retracted 0.763 only):**
```bash
python scripts/gse63885_bootstrap_ci.py
```

**Figures.** The current honest figures (`fig1_forest_mfap4_vs_cage`, `fig2_stability_solo_vs_cage`, `fig3_roc_per_cohort`; each `.png` and `.svg`) are derived directly from `mfap4_multicohort_results.json` and are provided in `figures/`. The retracted single-cohort figure-generation script has been removed so that no figure depicting the retracted 0.763 is produced or shipped.

### Validation

**Verify reported (honest) metrics:**
```bash
python -c "import json; r = json.load(open('mfap4_multicohort_results.json')); s=r['single_gene_mfap4']; print('MFAP4 GSE63885 AUROC (honest, n=75):', s['reconciliation']['honest_n75']['auroc']); print('MFAP4 cross-cohort SD:', s['cross_cohort']['sd']); print('STROMAL_CAGE cross-cohort SD:', r['stromal_cage_user']['cross_cohort']['sd'])"
```

Expected output:
```
MFAP4 GSE63885 AUROC (honest, n=75): 0.6836
MFAP4 cross-cohort SD: 0.11
STROMAL_CAGE cross-cohort SD: 0.046
```

### Provenance Tracking

All scripts include:
- **Version control**: Git-tracked with commit history
- **Seed values**: Fixed random seeds (seed=7 for bootstrap, seed=42 for CV) for reproducibility
- **Input/output validation**: Checksums and file size validation
- **Complete audit trail**: All transformations logged with timestamps

---

**Last Updated**: January 28, 2025  
**Reproducibility Status**: ✅ Validated
