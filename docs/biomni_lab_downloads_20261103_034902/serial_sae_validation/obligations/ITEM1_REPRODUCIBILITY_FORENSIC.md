# ITEM1_REPRODUCIBILITY_FORENSIC.md — Serial-SAE discovery-correlation collapse (rho -0.711 -> -0.209)

**Author:** Fahad Kiani / CrisPRO. **Date:** 2026-07-27.

> **Research use only (RUO).** Not for clinical decision-making. All quantitative results are
> derivation-cohort observations (GSE165897, n=11 paired). No claim of clinical validity is made.

**Question (verbatim scope).** The manuscript discovery headline is post-NACT DDR pathway score vs
progression-free interval (PFI) Spearman **rho = -0.711, p = 0.014** (GSE165897, n=11). On
re-derivation the same relationship is **rho = -0.209, p = 0.537**. A ~70% magnitude drop is an
upstream-difference signal, not a framing choice. This document (1) puts both code paths side by side,
(2) diffs their inputs, (3) states whether -0.209 is distinguishable from zero, (4) isolates the exact
change that collapsed the magnitude, and (5) assigns an explicit category.

---

## 1. The two code paths, side by side

| Attribute | ORIGINAL run (rho = -0.711) | REPRODUCTION run (rho = -0.209) |
|---|---|---|
| Script | `scripts/composite_roc_analysis_gse165897.py` | `scripts/w1_discovery.py` (+ independent re-derivation `expansion_results/discovery_rederivation.json`) |
| Where the number is emitted | line 399: `f.write("   - GSE165897: n=11, strong correlations (rho = -0.71, p = 0.014)")` | `w1_discovery.json` check `W1-01`; `discovery_rederivation.json` `post_ddr_vs_PFI_spearman` |
| Pathway-score input | **precomputed** `DATA_DIR/results/pathway_scores.csv` (line 34) | **recomputed from raw** UMI: pseudobulk sum -> CPM -> log2(CPM+1) -> mean over gene set |
| PFI input | **precomputed** `DATA_DIR/pfi_data_complete.json` (line 35) | canonical `gse165897/resistance_labels.json` (corrected 2026-05-09) |
| Feature matrix on disk today | **DELETED / not recoverable** (see section 4) | `w1_discovery_features.csv` (present, checksummed) |
| Test | Spearman(pathway score, continuous PFI-in-days) | identical: Spearman(pathway score, continuous PFI-in-days) |
| N | 11 | 11 |
| Patients | same 11 (EOC1005, EOC136, EOC153, EOC227, EOC3, EOC349, EOC372, EOC443, EOC540, EOC733, EOC87) | same 11 (identical IDs) |

**Reproducibility of the reproduction.** `w1_discovery.py` and the independent frozen-pipeline
`discovery_rederivation.json` agree exactly: post_ddr rho = **-0.2091**, p = **0.5372**
(`reproduces_W1: true`). The reproduction is internally reproducible; the original is not.

---

## 2. Input diff (what is the same, what differs)

- **Same patients:** yes, identical 11 IDs. This is **NOT** a subset change.
- **Same N:** yes, 11 in both.
- **Same test / preprocessing at the correlation step:** yes — Spearman of pathway score against
  continuous PFI-in-days. Spearman is rank-based, so a purely monotonic rescale (the original
  `pathway_kinetics_gse165897.py` applied an extra 0–1 rescale over empirical range 0–15 after
  `mean(log2(CPM+1))`) cannot change it.
- **Label scheme is irrelevant to this correlation:** rho = **-0.2091** is byte-identical under
  manuscript labels (8R/3S) and corrected labels (7R/4S) in `w1_discovery.json`
  (`reproduced_manuscript_labels` == `reproduced_corrected_labels`), because the discovery correlation
  uses continuous PFI, not the R/S label. **The 8R/3S -> 7R/4S label correction is therefore NOT the
  cause of the collapse.**
- **Two inputs differ between the runs:**
  1. **PFI vector** — the original used pre-correction PFI; corrected PFI fixes three values
     (below). One of these flips a resistance class (EOC87).
  2. **Pathway-score feature matrix** — the original loaded a precomputed `pathway_scores.csv` that no
     longer exists; the reproduction recomputes scores from raw UMI. These are different numbers.

### PFI values that differ (OLD pre-correction -> NEW corrected), source `resistance_labels.json` (Zhang et al. 2022 Sci Adv 8:eabm1831, Table 1)

| Patient | OLD PFI (days) | NEW PFI (days) | Effect |
|---|---|---|---|
| EOC87 | 274 | 30 | **flips class** sensitive -> resistant (documented data-quality correction; see §6a) |
| EOC1005 | 126 | 65 | both resistant (no class change) |
| EOC136 | 210 | 520 | both sensitive (no class change) |

All other 8 PFI values are unchanged.

---

## 3. Root-cause isolation (decisive test)

To determine whether the PFI correction alone caused the collapse, hold the pathway-score feature
matrix **FIXED** (the surviving raw-recomputed `w1_discovery_features.csv`) and swap **only** the PFI
vector between OLD (pre-correction) and NEW (corrected). Same 11 patients, same features, same N; the
only thing that moves is PFI.

Source: `worker-0.ipynb` cell `cell-f412325fd78f`.

| feature | rho_OLD (wrong PFI) | p_OLD | rho_NEW (corrected PFI) | p_NEW | delta_rho |
|---|---|---|---|---|---|
| **post_ddr** | **-0.0091** | 0.9788 | **-0.2091** | 0.5372 | 0.2000 |
| post_pi3k | 0.4055 | 0.2160 | 0.1091 | 0.7495 | 0.2964 |
| post_vegf | 0.3326 | 0.3176 | -0.1545 | 0.6500 | 0.4871 |
| delta_ddr | 0.0410 | 0.9047 | -0.1091 | 0.7495 | 0.1501 |
| post_composite_equal | 0.3417 | 0.3037 | -0.1636 | 0.6307 | 0.5053 |
| post_composite_weighted | 0.1868 | 0.5824 | -0.2545 | 0.4500 | 0.4413 |

**Interpretation.** With the *wrong* (OLD) PFI applied to the *surviving reproducible* feature matrix,
post_ddr rho = **-0.0091** — essentially zero, and nowhere near -0.711. Therefore:

- **The PFI correction alone does NOT reproduce -0.711.** Neither the wrong PFI nor the corrected PFI,
  on the reproducible feature matrix, produces a strong negative correlation.
- The only remaining input that could have produced -0.711 is the **original precomputed
  `pathway_scores.csv`** — i.e., a *different set of feature values* from the ones that recompute from
  raw UMI. That file is deleted (section 4), so -0.711 cannot be regenerated or audited.
- The -0.711 was thus produced by a combination of (a) a documented **PFI data error** (EOC87 274d,
  which was also the wrong resistance class) and (b) an **original feature matrix that cannot be
  reproduced** from surviving raw data.

---

## 4. Provenance of the deleted original inputs

`composite_roc_analysis_gse165897.py` reads (lines 34–35):
- `DATA_DIR/results/pathway_scores.csv`
- `DATA_DIR/pfi_data_complete.json`

Scoped search (shared-workspace `serial_sae_validation/` depth 3; results `serial_sae_validation/`
depth 3; full recursive on local `/workspace`) finds **neither file**, and the `results/` subdirectory
that would contain `pathway_scores.csv` **does not exist**. The original scoring pipeline
(`test_alternative_pathway_features_gse165897.py`, `pathway_kinetics_gse165897.py`) also reads the same
precomputed `results/pathway_scores.csv`; none of these inputs survive. The exact feature values behind
-0.711 are therefore **permanently unrecoverable**. (Recursive `find` over the `/mnt` root was avoided;
it times out on the S3 FUSE mount. The absence is established from the specific expected locations.)

---

## 5. Is -0.209 distinguishable from zero at n=11?

Source: `worker-0.ipynb` cell `cell-cf87e6400cba`. Feature = post_ddr, corrected PFI, n = 11.

| Statistic | Value |
|---|---|
| Spearman rho | **-0.2091** |
| Spearman asymptotic p (scipy) | **0.5372** |
| Fisher-z 95% CI | **[-0.7287, 0.4633]** |
| Permutation two-sided p (20,000 shuffles, rng seed 42) | **0.5388** |
| Bootstrap 95% CI (10,000 resamples, percentile) | **[-0.7536, 0.5794]** |
| Bootstrap CI spans zero? | **True** |

**Answer: NO.** -0.209 is **not statistically distinguishable from zero**. Every interval spans zero
and both p-values exceed 0.5. At n=11 the estimate is uninformative regardless of sign — it can neither
confirm nor exclude a real association.

---

## 6. Category assignment (explicit) — corrected 2026-07-27

The original -0.711 is categorized as **`NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`** (equivalently
`ORIGINAL_FIGURE_NOT_REPRODUCIBLE_UNDER_ANY_TESTED_PIPELINE`):

- **NO computational or manual source establishes -0.711.** Version-control history (three repos:
  crispro-backend-v2, crispro-backend-v3, Synthetic-Lethality) and a manual-path search
  (.ipynb/.R/.Rmd/.xlsx) were both completed (§8, §9). Every place -0.711 appears is a **hardcoded
  string or a hardcoded "expected" constant** — the v2 validation script
  (`scripts/validation/validate_ovarian_pathway_model.py`) holds it in an `expected_correlations` dict
  and merely tolerance-checks a value it read from the now-deleted `pathway_scores.csv`; it does **not**
  compute scores from raw. No script computes -0.711 as a live output from raw data.

- **NEVER_REPRODUCIBLE from surviving artifacts.** The feature matrix behind -0.711
  (`results/pathway_scores.csv`) is deleted and absent from all three repo histories; independent
  recomputation from raw UMI does not reproduce it under any of the **three** historical DDR gene-set
  definitions (8-gene, 14-gene, 26-gene). Most negative post_ddr obtainable from raw = **-0.3545 (NS)**.

- **NOT SENSITIVE_TO_SUBSET** — ruled out. Identical 11 patients in both runs; no subset/cohort change.

- **NOT attributable to the PFI error (this is the correction).** An earlier draft of this section
  listed the PFI data error as a *causal component of the -0.711 magnitude*. **That is withdrawn:** §3
  disproves it. Applying the OLD (pre-correction) PFI — including the erroneous EOC87 = 274d — to the
  reproducible feature matrix gives post_ddr rho = **-0.0091** (14-gene) / **-0.0957** (8-gene),
  essentially zero and nowhere near -0.711. The wrong PFI does **not** move the correlation toward
  -0.711, so it cannot be presented as part of the explanation for that magnitude. The label
  **ORIGINAL_ERROR is therefore NOT used** for -0.711, because no computation was shown to have run and
  produced -0.711 through an identified erroneous mechanism.

### 6a. The PFI data error, documented separately as a confirmed data-quality issue

The PFI error is real and remains on record as its **own, independent** finding — it is *not* an
explanation for -0.711:

- EOC87 PFI **274d -> 30d** (also flipped resistance class sensitive -> resistant); EOC1005 126d -> 65d;
  EOC136 210d -> 520d. Source: `resistance_labels.json` (Zhang et al. 2022, Sci Adv 8:eabm1831, Table 1).
- This corrects the manuscript label split (stale 8R/3S -> corrected 7R/4S) and is the correct basis for
  all downstream resistance labels. Its effect on the discovery correlation is documented in §3 and is
  small (delta_rho = 0.20 on post_ddr) and does not approach the published magnitude.

**Bottom line for the ledger.** The -0.711 discovery headline is **WRONG**, not "not yet confirmed."
The surviving reproducible pipeline on corrected data yields rho = **-0.209 (p = 0.537), indistinguishable
from zero**. The manuscript sentence "confirmed the Serial-SAE hypothesis" is unsupported and must be
removed; the discovery correlation must be reported as **not reproduced at the stated magnitude, with the
original value labeled `NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED` — it cannot be traced to any
reproducible, historical (version-control), or manual source, and the surviving pipeline on verified raw
data does not produce it under any tested configuration**. (The PFI data error is a separate, confirmed
data-quality issue per §6a, not the explanation for the -0.711 magnitude.)

---

## 7. Traceability

| Element | Source |
|---|---|
| Original -0.711 emitter | `scripts/composite_roc_analysis_gse165897.py` line 399; inputs lines 34–35 (both deleted) |
| Reproduction rho = -0.209 | `scripts/w1_discovery.py`; `w1_discovery.json` (W1-01); `expansion_results/discovery_rederivation.json` |
| Fixed feature matrix | `w1_discovery_features.csv` (UMI sha16 d604a459df7e5e70; cellInfo sha16 7366ec57d7de3613; 51786 cells, 22 pseudobulk groups) |
| PFI-swap isolation test | `worker-0.ipynb` cell `cell-f412325fd78f` |
| CI / p-value / permutation / bootstrap | `worker-0.ipynb` cell `cell-cf87e6400cba` |
| Canonical labels + corrected PFI | `gse165897/resistance_labels.json` (Zhang et al. 2022, Sci Adv 8:eabm1831, Table 1) |

---

## 8. Addendum (2026-07-27) — gene-set isolation, exhaustive sweep, and mandated classification label

This addendum reconciles the forensic record with the narrowed root-cause rerun. It does not change any
number above; it adds the isolated feature-construction difference and the two-outcome classification.

**(a) The -0.71 emitter is a hardcoded narrative string.** `composite_roc_analysis_gse165897.py:399`
writes the literal `"ρ = -0.71, p = 0.014"` into the report's "Validation Strategy" text; it is not a
live computation from that run's `correlation_results`. No surviving script computes -0.711 as an output.

**(b) Isolated feature-construction difference = DDR gene set (8 vs 14 genes).** Original
`pathway_kinetics_gse165897.py` uses **8** DDR genes (BRCA1, BRCA2, ATM, ATR, CHEK1, CHEK2, RAD51,
PARP1); frozen `w1_discovery.py` uses **14** (adds PALB2, TP53, XRCC1, FANCA, FANCC, FANCD2). Side-by-side
on one shared pseudobulk (`sae_root_cause_rerun.py` / `sae_root_cause_rerun.json`):

| Config (corrected PFI) | rho | p |
|---|---|---|
| ORIG 8-gene (mean or ÷15) | **-0.3545** | 0.2847 |
| FROZEN 14-gene (mean or ÷15) | **-0.2091** | 0.5372 |

The ÷15 rescale is monotonic and gives byte-identical Spearman (confirmed). The gene set is the single
lever; it is directionally correct (-0.2091 -> -0.3545) but **insufficient** — it does not reach -0.711.

**(c) Exhaustive sweep** (`sae_exhaustive_sweep.py` / `sae_exhaustive_sweep_summary.json`): all features x
Spearman/Pearson x OLD/NEW PFI x original gene sets. `any_combination_reaches_-0.711 = false`; most
negative post_ddr obtainable from raw = **-0.3545 (NS)**; all five manuscript Table-2 p-values
(0.014, 0.020, 0.088, 0.023, 0.023) recompute to **p > 0.2**.

**(d) Mandated classification label.** The label is **`NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`**
(= `ORIGINAL_FIGURE_NOT_REPRODUCIBLE_UNDER_ANY_TESTED_PIPELINE`). `ORIGINAL_ERROR` is **not** used, per §6
(the PFI mechanism is disproven, not confirmed). Full audit: `SAE_ROOT_CAUSE_AUDIT.md`.

**(e) Distinct power problem (does not substitute for the above).** At n=11 the AUROC CIs are enormous —
post_ddr [0.125, 0.933] (corrected) / [0.375, 1.0] (manuscript labels); post_pi3k [0.0, 0.767]. No
discrimination claim is supportable regardless of whether the point estimate is explained.

**(f) Version-control history check + manual/non-Python path check (both completed).**

*Git history.* Three repos were searched in full history (all branches, all commits): crispro-backend-v2
(`d5ed8c3`), crispro-backend-v3 (`b2b2df2`), Synthetic-Lethality (`d2538e8`). Findings:
- `pathway_kinetics_gse165897.py` and `pathway_scores.csv`: **no history in any of the three repos** —
  they never existed under version control (they lived only in the shared workspace / deleted data dir).
- A **fourth** artifact set surfaced in crispro-backend-v2 under `api/services/efficacy_orchestrator/`
  and `scripts/validation/`, all added in a single commit **`e69324c`** ("Extend v3 Therapy-Fit
  contract...") and never subsequently modified: `validate_ovarian_pathway_model.py`,
  `ovarian_pathway_model.py`, `ovarian_pathway_gates.py`, `OVARIAN_PATHWAY_VALIDATION_COMPLETE.md`.
  Every occurrence of `-0.711` in these is a **hardcoded provenance docstring or a hardcoded
  `expected_correlations` constant**. `validate_ovarian_pathway_model.py` **reads** the now-deleted
  `data/serial_sae/gse165897/results/pathway_scores.csv` (its `PATHWAY_SCORES_CSV` path) and only
  tolerance-checks the value it read against the hardcoded -0.711; it does **not** recompute scores from
  raw UMI. The "Observed -0.711" in the validation doc was thus produced once from the deleted CSV and
  is not regenerable. The result CSVs (`composite_scores_correlation.csv`, `AUC_summary_table.csv`) are
  **absent from all three repo histories**.
- This script uses a **third** DDR gene-set definition (26 genes; `OVARIAN_PATHWAYS['DDR']`). Tested on
  the same verified raw data (`sae_v2_geneset_test.py` / `sae_v2_geneset_test.json`): post_ddr rho =
  **-0.1455** (corrected PFI) / **+0.1185** (old PFI) — even weaker than the 8- and 14-gene sets. **All
  three historical DDR gene sets on raw data: most negative = -0.3545; none reaches -0.711.**

*Manual / non-Python path.* Searched for `.ipynb`, `.R`, `.Rmd`, `.xlsx`, `.xls` across all three repo
trees (current + full history), the shared-workspace `serial_sae_validation/` tree, the results
`serial_sae_validation/` tree, and local `/workspace`. Result: **zero** notebooks, R scripts, or Rmd
files anywhere; the only spreadsheets found are unrelated third-party paper supplements
(`EMS128591-supplement-*.xlsx`, `ccr-20-4314_table_*`) in a separate `resistance_prophet/kill-chain` test
directory, none referencing the GSE165897 pathway analysis. **Table 2 has no manual, R, or spreadsheet
computational path** — it was produced entirely within the audited Python pipeline.

*Conclusion of both checks.* No prior computation and no manual path establishes -0.711. It exists only as
hardcoded constants/strings; the one script that read a live value consumed a deleted intermediate and
does not recompute from raw. Hence `NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`.
