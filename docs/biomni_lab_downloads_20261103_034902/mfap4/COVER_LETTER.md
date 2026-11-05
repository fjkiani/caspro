[Date]

Editorial Office
Clinical Cancer Research
American Association for Cancer Research
OR
NPJ Precision Oncology
Nature Portfolio

Re: Submission of manuscript, "MFAP4 Is a Weak, Cohort-Unstable Single-Gene Marker of Platinum Resistance in High-Grade Serous Ovarian Cancer: A Multi-Cohort Honest Validation and Its Repositioning as a Stromal-Composite Component"

Dear Editors,

We are submitting the enclosed manuscript for consideration in *Clinical Cancer Research* [or *NPJ Precision Oncology*].

### Summary of the work

We report a deliberately conservative, multi-cohort re-examination of **MFAP4 as a platinum-resistance biomarker** in high-grade serous ovarian cancer across three platform-matched (GPL570) cohorts (GSE63885, GSE30161, GSE51373; pooled n=161, 56 resistant). Under an honest label definition that excludes samples with no recorded platinum-response outcome, MFAP4 single-gene AUROC in GSE63885 is **0.684** (95% CI: 0.557–0.805, bootstrap n=5000) — not the 0.763 reachable only by counting 26 unevaluable samples as sensitive (an inflation of +0.079). Across the three cohorts MFAP4 alone is unstable, ranging from 0.529 (a coin-flip, GSE30161) to 0.797 (GSE51373), with a cross-cohort SD of 0.110. MFAP4 operates through a stromal/extracellular-matrix mechanism that is orthogonal to DNA-damage-repair (DDR) biomarkers.

**Key findings:**
- MFAP4 single-gene AUROC = 0.684 (95% CI: 0.557–0.805, bootstrap n=5000) in GSE63885 (honest n=75; 34 resistant, 41 sensitive)
- MFAP4 is weak and cohort-unstable (range 0.529–0.797; cross-cohort SD 0.110)
- A stromal composite (`STROMAL_CAGE`: FAP, POSTN, ACTA2, MFAP4) does **not** improve discrimination over the single gene (DeLong p = 0.157, 0.666, 0.894) but more than halves cross-cohort variance (SD 0.110 → 0.046) and never falls to chance
- MFAP4's stromal/ECM axis is orthogonal to DDR pathways (a distinct biological mechanism)

The previously headlined AUROC 0.763 (reported n=101) is **retracted** in this work; it counted 26 samples with no recorded platinum-response outcome as sensitive. This submission's contribution is an honest, reproducible re-derivation and a principled repositioning of MFAP4 from a putative standalone biomarker to a **component input** within a stromal-context readout.

### Manuscript type and scope

This submission is a **biomarker validation study** with multi-cohort re-derivation. It provides executable receipts, complete data provenance, and a single deterministic analysis script. All reported metrics are validated against a machine-readable results file (`mfap4_multicohort_results.json`).

### Data and code availability

**Data source:** GSE63885, GSE30161, GSE51373 (Gene Expression Omnibus; platform GPL570).

**Primary receipt:** `mfap4_multicohort_results.json` (emitted by the analysis script below; deterministic across runs).

**Analysis script:**
- `publications/07-MFAP4/scripts/mfap4_multicohort_validation.py`

**Reproduce command:**
```bash
python publications/07-MFAP4/scripts/mfap4_multicohort_validation.py \
  --data-dir <dir with GSE63885/GSE30161/GSE51373 series_matrix.txt> \
  --out mfap4_multicohort_results.json
```

This command regenerates all reported metrics (single-gene AUROCs, composite AUROCs, DeLong comparisons, cross-cohort stability) and validates reproducibility. A legacy single-cohort script that reproduces the retracted 0.763 is retained only for transparency and is clearly labeled as such in `DATA_CODE_AVAILABILITY.md`.

### Conflicts of interest

[To be completed]

Sincerely,

[Corresponding Author, degrees]
[Institution]
[Email]
