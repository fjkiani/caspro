# MFAP4 / STROMAL_CAGE Analysis — Multi-Cohort Honest Validation

**Datasets:** GSE63885, GSE30161, GSE51373 (all Affymetrix GPL570; pooled n=161, 56 platinum-resistant)
**Outcome:** Platinum resistance (disease-free / platinum-free interval <180 d, or original authors' classification)
**Reproducibility:** re-derived from raw GEO series matrices by `scripts/mfap4_multicohort_validation.py`; bootstrap n=5000, seed=7; DeLong test for paired AUROC; deterministic across runs

> **Correction notice.** Earlier versions of this table reported MFAP4 AUROC = 0.763 with an OR = 8.93
> from GSE63885 at n=101. That n=101 counts 26 samples that have **no recorded platinum-response
> outcome** (`na`) as "sensitive." Under the honest definition (excluding those 26), the cohort is
> n=75 and MFAP4 AUROC = **0.684 (95% CI 0.557–0.805)**. All numbers below use the honest definition.

---

## TABLE 1: MFAP4 single-gene, per cohort (honest labels)

| Cohort | n | Resistant | MFAP4 AUROC | 95% CI |
|--------|---|-----------|-------------|--------|
| GSE63885 | 75 | 34 | **0.684** | 0.557–0.805 |
| GSE30161 | 58 | 10 | 0.529 (a coin-flip) | 0.333–0.729 |
| GSE51373 | 28 | 12 | 0.797 | 0.594–0.969 |
| **Cross-cohort** | — | — | mean 0.670; **SD 0.110** | range 0.529–0.797 |

**Note:** MFAP4 alone is a weak single-gene marker and is **unstable across cohorts**, decaying to a
coin-flip (0.529) in GSE30161. It is not suitable as a standalone predictor.

---

## TABLE 2: MFAP4 single-gene vs STROMAL_CAGE composite (FAP, POSTN, ACTA2, MFAP4)

| Cohort | MFAP4 AUROC (95% CI) | STROMAL_CAGE AUROC (95% CI) | Δ (cage − MFAP4) | DeLong p |
|--------|----------------------|------------------------------|-------------------|----------|
| GSE63885 | 0.684 (0.557–0.805) | 0.633 (0.509–0.758) | −0.051 | 0.157 |
| GSE30161 | 0.529 (0.333–0.729) | 0.629 (0.410–0.825) | +0.100 | 0.666 |
| GSE51373 | 0.797 (0.594–0.969) | 0.729 (0.526–0.901) | −0.068 | 0.894 |

**Interpretation:** The composite does **not** significantly exceed single-gene discrimination in any
cohort (no significant DeLong difference; direction inconsistent). This is reported openly rather than
framed as an improvement.

---

## TABLE 3: The composite's real advantage — cross-cohort stability

| Metric (per-cohort AUROC) | MFAP4 alone | STROMAL_CAGE |
|---------------------------|-------------|--------------|
| Mean | 0.670 | 0.664 |
| Range | 0.529–0.797 | 0.629–0.729 |
| **Cross-cohort SD** | **0.110** | **0.046** |
| Leave-one-cohort-out transfer (mean) | 0.670 | 0.651 |
| Ever at/below chance? | **Yes (0.529)** | No |

**Interpretation:** The composite **more than halves** cross-cohort variance (SD 0.110 → 0.046) and
**never collapses to chance**. Its value is stability/reproducibility and interpretability, not peak
discrimination.

---

## FIGURES

- `fig1_forest_mfap4_vs_cage.png` — Forest plot: MFAP4 vs STROMAL_CAGE AUROC (95% CI) per cohort.
- `fig2_stability_solo_vs_cage.png` — Cross-cohort stability: single gene swings 0.53–0.80; composite stays tight and above chance.
- `fig3_roc_per_cohort.png` — ROC curves (MFAP4 vs STROMAL_CAGE) for each cohort.

---

## KEY STATISTICS (honest)

| Metric | Value | Context |
|--------|-------|---------|
| MFAP4 AUROC (GSE63885, honest) | **0.684** (CI 0.557–0.805) | Single-gene, n=75 |
| MFAP4 cross-cohort range | 0.529–0.797 | Unstable; decays to a coin-flip in one cohort |
| STROMAL_CAGE cross-cohort SD | **0.046** (vs 0.110) | Less than half the variance of the single gene |
| Evidence base | n=161, 56 resistant | 3 GPL570 cohorts |
| Classification | **Component Input** (RUO) | Downgraded from Standalone Predictor |

---

## DATA PROVENANCE

All results re-derived from raw GEO series matrices:
- GSE63885, GSE30161, GSE51373 (GEO; platform GPL570).

One-command reproduction: `python scripts/mfap4_multicohort_validation.py --data-dir <geo_dir> --out mfap4_multicohort_results.json`.
Every value in these tables is emitted by that script and cross-referenced in
`MFAP4_verification_report.md` and `mfap4_multicohort_results.json`.
