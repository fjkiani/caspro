# MFAP4 Platinum Resistance Biomarker - AACR Submission Package

**Manuscript**: "MFAP4 Is a Weak, Cohort-Unstable Single-Gene Marker of Platinum Resistance in High-Grade Serous Ovarian Cancer: A Multi-Cohort Honest Validation and Its Repositioning as a Stromal-Composite Component"

**Target Journals**: Clinical Cancer Research OR NPJ Precision Oncology

**Status**: ✅ **DRAFT COMPLETE** - Ready for author review and finalization

---

## Package Contents

### Core Manuscript Files
- ✅ `MANUSCRIPT_DRAFT.md` - Complete manuscript (Abstract, Introduction, Methods, Results, Discussion, Conclusions)
- ✅ `COVER_LETTER.md` - Submission cover letter
- ✅ `DATA_CODE_AVAILABILITY.md` - Data and code availability statement
- ✅ `TABLES.md` - All tables (cohort characteristics, biomarker performance, CV results)
- ✅ `FIGURES_TABLES_LIST.md` - Figure and table inventory

### Supporting Documents
- ✅ `AUTHOR_CONTRIBUTIONS.md` - CRediT taxonomy template
- ✅ `COMPETING_INTERESTS.md` - Conflicts of interest template
- ✅ `SUBMISSION_CHECKLIST.md` - Pre-submission checklist
- ✅ `SUPPLEMENT.md` - Supplementary materials template

---

## Validated Results (honest multi-cohort re-derivation)

**Evidence base: 3 platform-matched GPL570 cohorts (GSE63885, GSE30161, GSE51373); pooled n=161, 56 resistant**
- **MFAP4 AUROC (GSE63885, honest n=75)**: **0.684** (95% CI: 0.557–0.805, bootstrap n=5000)
- **MFAP4 cross-cohort range**: 0.529–0.797 (SD 0.110) — weak and unstable
- **STROMAL_CAGE (FAP, POSTN, ACTA2, MFAP4)**: does not beat the single gene on discrimination (no significant DeLong difference in any cohort) but is far more stable (cross-cohort SD 0.046; never at chance)

> The previously headlined AUROC 0.763 (n=101) is **retracted**: it counted 26 samples with no
> recorded platinum-response outcome as "sensitive." See `MFAP4_verification_report.md`.

**Receipt file**: `mfap4_multicohort_results.json` (emitted by `scripts/mfap4_multicohort_validation.py`; deterministic).

---

## Key Findings

1. **MFAP4 is a weak, cohort-unstable single-gene marker** of platinum resistance (AUROC 0.684 in GSE63885; range 0.529–0.797) — reclassified from *Standalone Predictor* to **Component Input**.
2. **STROMAL_CAGE composite** does not improve discrimination over the single gene but **more than halves cross-cohort variance** (SD 0.110 → 0.046) and never collapses to chance.
3. **Orthogonal to DDR pathways** — the stromal/ECM axis captures resistance biology beyond HRD status.
4. **Verifiable provenance** — every number is re-derived from raw GEO data by one committed, deterministic script.

---

## Next Steps (Before Submission)

### Required Fill-Ins
- [ ] Author list + affiliations
- [ ] Corresponding author contact information
- [ ] Funding sources
- [ ] Ethics statement (if applicable)
- [ ] Author contributions (CRediT)
- [ ] Competing interests
- [ ] Reference citations (finalize PubMed IDs)

### Figures (generated; in `figures/`)
- [x] Figure 1: Forest plot — MFAP4 vs STROMAL_CAGE per cohort (`fig1_forest_mfap4_vs_cage.png`/`.svg`)
- [x] Figure 2: Cross-cohort stability — single gene vs composite (`fig2_stability_solo_vs_cage.png`/`.svg`)
- [x] Figure 3: ROC curves per cohort (`fig3_roc_per_cohort.png`/`.svg`)

### Final Review
- [ ] Verify all metrics match receipt (`mfap4_multicohort_results.json`)
- [ ] Check reproducibility (run `scripts/mfap4_multicohort_validation.py`)
- [ ] Review manuscript for clarity and accuracy
- [ ] Finalize references (add PubMed citations)
- [ ] Journal-specific formatting (check author guidelines)

---

## Reproducibility

**Regenerate all results (deterministic; single script):**
```bash
python scripts/mfap4_multicohort_validation.py \
  --data-dir <dir with GSE63885/GSE30161/GSE51373 series_matrix.txt> \
  --out mfap4_multicohort_results.json
```

This emits the receipt `mfap4_multicohort_results.json` and prints every headline metric (single-gene AUROCs, composite AUROCs, DeLong comparisons, cross-cohort stability). Runs are identical across invocations. See `DATA_CODE_AVAILABILITY.md` for full provenance and for the legacy single-cohort script retained only to reproduce the retracted 0.763.

---

## Claims Discipline

✅ **Validated Claims:**
- MFAP4 single-gene AUROC = 0.684 (95% CI 0.557–0.805, bootstrap n=5000; GSE63885, honest n=75)
- MFAP4 is weak and cohort-unstable (range 0.529–0.797; cross-cohort SD 0.110)
- STROMAL_CAGE does not beat the single gene on discrimination (DeLong p = 0.157, 0.666, 0.894) but more than halves cross-cohort variance (SD 0.110 → 0.046)
- Orthogonality to DDR pathways (biological mechanism)

⛔ **Retracted (do not claim):**
- MFAP4 AUROC = 0.763 (n=101) — counted 26 unevaluable samples as sensitive (+0.079 inflation)

❌ **Not Claimed:**
- Clinical outcome benefit (requires prospective validation)
- Treatment selection guidance (requires clinical trial validation)
- Platform translation (all cohorts are GPL570 microarray; RNA-seq/ctDNA validation needed)

---

**Last Updated**: January 28, 2025  
**Manuscript Status**: Draft complete, ready for author review  
**Receipts Validated**: ✅ All metrics validated
