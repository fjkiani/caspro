# Figures and Tables List

> All figures below are generated with corrected, honest multi-cohort numbers and exist on disk in `figures/` (each as `.png` and `.svg`). They are produced from `mfap4_multicohort_results.json` (receipt from `scripts/mfap4_multicohort_validation.py`).

## Figures

### Figure 1: Forest plot — MFAP4 vs STROMAL_CAGE per cohort
- **File**: `figures/fig1_forest_mfap4_vs_cage.png` (and `.svg`)
- **Description**: Per-cohort AUROC with 95% bootstrap CIs for MFAP4 single-gene vs the `STROMAL_CAGE` composite (FAP, POSTN, ACTA2, MFAP4) across GSE63885, GSE30161, GSE51373. Chance (AUROC = 0.5) marked. Shows MFAP4's wide, cohort-dependent spread (0.529–0.797) against the composite's tighter band.

### Figure 2: Cross-cohort stability — single gene vs composite
- **File**: `figures/fig2_stability_solo_vs_cage.png` (and `.svg`)
- **Description**: Cross-cohort dispersion of AUROC for MFAP4 alone (SD 0.110; range 0.529–0.797) versus `STROMAL_CAGE` (SD 0.046; range 0.629–0.729). Visualizes the central finding: the composite is a more *stable* instrument, not a more accurate classifier.

### Figure 3: ROC curves per cohort
- **File**: `figures/fig3_roc_per_cohort.png` (and `.svg`)
- **Description**: ROC curves for MFAP4 and `STROMAL_CAGE` in each of the three cohorts, illustrating the absence of a significant discrimination difference (DeLong p = 0.157, 0.666, 0.894) and MFAP4's near-chance behavior in GSE30161.

## Tables

### Table 1: Head-to-head per cohort
- **File**: `TABLES.md` (Table 1); machine-readable `table_headtohead_per_cohort.csv`
- **Description**: Per-cohort AUROC (95% CI) for MFAP4 and `STROMAL_CAGE`, Δ(CAGE − MFAP4), and DeLong p-value.

### Table 2: Stability and transfer
- **File**: `TABLES.md` (Table 2); machine-readable `table_stability_transfer.csv`
- **Description**: Cross-cohort mean/SD/range for MFAP4 vs `STROMAL_CAGE`, plus leave-one-cohort-out (LOCO) transfer results.

### Table 3: Labeling reconciliation (GSE63885)
- **File**: `TABLES.md` (Table 3)
- **Description**: Honest (n=75) vs previously headlined (n=101) label definitions and the resulting AUROC (0.684 vs 0.763), documenting the +0.079 inflation from counting unevaluable samples as sensitive.

## Supplement

### Supplementary Table 1: Probe-to-Gene Mapping
- **File**: `SUPPLEMENT.md` (Table S1)
- **Description**: Complete GPL570 probe-to-gene mapping for all genes used (MFAP4, FAP, POSTN, ACTA2; and the code-cage genes CXCL12, CXCR4).

---

**Receipt**: `mfap4_multicohort_results.json`
**Generator script**: `scripts/mfap4_multicohort_validation.py` (deterministic)
