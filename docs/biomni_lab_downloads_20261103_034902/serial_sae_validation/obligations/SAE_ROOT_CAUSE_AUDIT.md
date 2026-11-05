# SAE_ROOT_CAUSE_AUDIT.md — Root-cause audit of the Serial-SAE discovery-correlation collapse

**Author:** Fahad Kiani / CrisPRO. **Date:** 2026-07-27.
**Manuscript:** "Post-Treatment Pathway Scores Associate With Platinum Resistance in HGSOC" (GSE165897, n=11 paired).

> **Research use only (RUO).** Not for clinical decision-making. All quantitative results are
> derivation-cohort observations (GSE165897, n=11 paired). No claim of clinical validity is made.

---

## 0. Scope and result in one line

The published discovery headline is post-NACT DDR pathway score vs progression-free interval (PFI),
Spearman **rho = -0.711, p = 0.014**. The frozen reproduction pipeline gives **rho = -0.209, p = 0.537**.
This audit locates the original emitter, diffs the two pipelines on the four required dimensions, isolates
the single feature-construction difference, reruns both side by side on the same 11 patients, and reaches
the mandated two-outcome classification.

**FINAL CLASSIFICATION: `NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`**
(equivalently `ORIGINAL_FIGURE_NOT_REPRODUCIBLE_UNDER_ANY_TESTED_PIPELINE`).

The published value cannot be traced to any reproducible, historical (version-control), or manual source;
the surviving pipeline on verified raw data does not produce it under any tested configuration. The one
feature-construction divergence that exists (original 8-gene DDR set vs frozen 14-gene DDR set) moves
post_ddr in the correct (more negative) direction, from **-0.2091 to -0.3545**, but is **insufficient**:
no feature x statistical test x PFI vector x gene-set combination reaches -0.711/p=0.014 from the verified
raw data (three historical DDR gene-set definitions tested; §4, §6, §7). The exact feature matrix behind
-0.711 (`results/pathway_scores.csv`) is deleted and absent from all version-control history, so it cannot
be audited against its own inputs; the surviving score generator on checksum-identical raw data does not
reproduce it. **`ORIGINAL_ERROR` is deliberately NOT the label:** the only concrete data error found (the
PFI vector) is *disproven* as a cause of the -0.711 magnitude (§3a) — applying the wrong PFI gives rho
≈ -0.01, not -0.711 — so there is no demonstrated erroneous computation that produced -0.711, only an
untraceable one.

A **separate, additional problem** is stated in Section 7: at n=11 the AUROC confidence intervals are so
wide (e.g. [0.125, 0.933] and [0.0, 0.767]) that **no discrimination claim is supportable regardless of
whether the point estimate is explained.** This power problem does not substitute for the reproducibility
answer above; both stand.

---

## 1. Locating the exact code that emitted -0.711 / p=0.014

Grepping every surviving script for the literal `-0.71` / `0.014` returns exactly three sites:

| File:line | Content | Nature |
|---|---|---|
| `scripts/composite_roc_analysis_gse165897.py:399` | `f.write("   - GSE165897: n=11, strong correlations (rho = -0.71, p = 0.014)")` | **Hardcoded narrative string** in the report's "Validation Strategy" text |
| `scripts/w1_discovery.py:259` | `-0.71` referenced as **the claim being tested** | Not a computed output |
| `scripts/w3_rigor.py:92` | `post_ddr_corr: 0.014` recorded as **a manuscript value being logged** | Not a computed output |

**Critical finding.** The literal `-0.71, p = 0.014` in `composite_roc_analysis_gse165897.py` is a
**hardcoded string** written into the narrative section of the report. It is **not** derived at runtime
from that script's `correlation_results` object (the script's live correlations are written elsewhere via
`.format()` on computed values). **No surviving script computes -0.711 as a live output.** The published
figure was never regenerable from a single self-contained script; it depended on a precomputed feature
file that no longer exists (Section 5).

The **score-generating** original pipeline is `scripts/pathway_kinetics_gse165897.py`, which produced the
(now-deleted) `data/serial_sae/gse165897/results/pathway_scores.csv`. Its consumers
(`composite_roc_analysis_gse165897.py`, `test_alternative_pathway_features_gse165897.py`) **read that
precomputed CSV**; neither recomputes scores from raw UMI. This is the pipeline diffed below.

---

## 2. Four-dimension diff: original pipeline vs frozen reproduction

| Dimension | ORIGINAL (`pathway_kinetics_gse165897.py` -> `composite_roc_analysis_gse165897.py`) | FROZEN (`w1_discovery.py`) | Same? |
|---|---|---|---|
| **(a) Patient/sample inclusion (exact IDs)** | EOC1005, EOC136, EOC153, EOC227, EOC3, EOC349, EOC372, EOC443, EOC540, EOC733, EOC87 (n=11) | Identical 11 IDs | **SAME** |
| **(b) Feature construction — DDR gene set** | **8 genes:** BRCA1, BRCA2, ATM, ATR, CHEK1, CHEK2, RAD51, PARP1 | **14 genes:** BRCA1, BRCA2, PALB2, RAD51, ATM, ATR, CHEK1, CHEK2, TP53, XRCC1, PARP1, FANCA, FANCC, FANCD2 | **DIFFERS (+6 genes)** |
| **(b) Feature construction — normalization** | pseudobulk sum UMI -> CPM -> log2(CPM+1) -> mean over gene set -> **extra ÷15, clip [0,1]** | pseudobulk sum UMI -> CPM -> log2(CPM+1) -> mean over gene set (no rescale) | rescale differs but see §4 |
| **(b) Cell-type filtering** | none (all cells aggregated) | none (all cells aggregated) | **SAME** |
| **(c) Statistical test** | `scipy.stats.spearmanr(score, PFI_days)`, two-sided, default tie handling | identical `spearmanr`, two-sided, default ties | **SAME** |
| **(d) Filtering / imputation / outlier removal** | none | none | **SAME** |
| **(extra) PFI vector** | pre-correction PFI (`pfi_data_complete.json`, deleted) | corrected PFI (`resistance_labels.json`, 2026-05-09) | DIFFERS (3 values) |

**The only feature-construction divergence (dimension b) that changes the statistic is the DDR gene set:
8 genes (original) vs 14 genes (frozen).** The +6 genes are PALB2, TP53, XRCC1, FANCA, FANCC, FANCD2. All
8 original genes and all 14 frozen genes are present in the expression matrix (no alias failures for DDR).

The ÷15 rescale is a **monotonic** transform, so it cannot change a rank-based Spearman correlation — and
the side-by-side rerun confirms it gives byte-identical rho (§4). Dimensions (a), (c), (d) are identical.
The PFI vector differs but is tested separately and shown insufficient (§4).

---

## 3. The specific divergent step (single answer)

**The original analysis used an 8-gene DDR set; the frozen pipeline uses a 14-gene DDR set. That is the
one feature-construction difference.** It is directionally correct — restricting to the original 8 genes
makes post_ddr **more negative** (-0.2091 -> -0.3545). But it is **not sufficient**: it explains only part
of the gap and cannot reach -0.711 (§4, §6).

All other candidate differences are excluded:
- **Rescale (÷15, clip):** monotonic -> provably cannot change Spearman -> confirmed byte-identical rho.
- **PFI vector:** swapping OLD<->NEW PFI on a fixed feature matrix moves post_ddr only to -0.0091 (frozen
  genes) or -0.0957 (original genes) under OLD PFI — nowhere near -0.711.
- **Patients / cell filtering / test / ties / sidedness / imputation:** identical in both pipelines.

**§3a — the PFI data error is NOT a cause of the -0.711 magnitude.** The PFI vector does contain a
documented, confirmed data error (EOC87 274d -> 30d, also a flipped resistance class; EOC1005 126->65;
EOC136 210->520; source Zhang et al. 2022, Sci Adv 8:eabm1831, Table 1). But applying the *wrong* (OLD,
pre-correction) PFI to the reproducible feature matrix gives post_ddr rho = **-0.0091** (14-gene) /
**-0.0957** (8-gene) — essentially zero. The wrong PFI moves the correlation *toward zero*, not toward
-0.711. Therefore the PFI error **cannot** be presented as part of the explanation for the published
magnitude, and this figure is **not** labeled `ORIGINAL_ERROR`. The PFI error stands as a separate,
confirmed data-quality issue (it is the correct basis for the 8R/3S -> 7R/4S label fix), documented in
its own right — but it is not the source of -0.711.

---

## 4. Side-by-side rerun on the SAME 11 patients (decisive)

One shared pseudobulk matrix was built from the verified raw UMI (checksums below), then post_ddr was
computed **four ways** (original-8 vs frozen-14 genes) x (÷15 rescale vs plain mean) and correlated with
both PFI vectors. Same 11 patients throughout.

Source: `scripts/sae_root_cause_rerun.py`; results `tables/sae_root_cause_rerun.json`.
Raw checksums: UMI sha16 = `d604a459df7e5e70`, cellInfo sha16 = `7366ec57d7de3613` (match W1 provenance).

**Built-in correctness check (PASSED):** frozen 14-gene plain-mean + corrected PFI reproduces
`w1_discovery_features.csv` exactly — rho = **-0.2091**, p = **0.5372**, with per-patient values matching
(e.g. EOC1005 = 2.6635, EOC87 = 2.6233). The shared harness therefore faithfully reproduces the frozen pipeline.

| Configuration | rho (OLD PFI) | p (OLD) | rho (NEW/corrected PFI) | p (NEW) |
|---|---|---|---|---|
| **ORIG 8-gene, ÷15 rescale** | -0.0957 | 0.7796 | **-0.3545** | 0.2847 |
| **ORIG 8-gene, plain mean** | -0.0957 | 0.7796 | **-0.3545** | 0.2847 |
| **FROZEN 14-gene, plain mean** | -0.0091 | 0.9788 | **-0.2091** | 0.5372 |
| **FROZEN 14-gene, ÷15 rescale** | -0.0091 | 0.9788 | **-0.2091** | 0.5372 |

**Readouts.**
1. **÷15 rescale changes nothing** (rows 1 vs 2, and 3 vs 4 are identical) -> rescale is NOT the cause.
2. **Gene set is the only lever with any effect:** 14->8 genes moves rho from -0.2091 to -0.3545 under
   corrected PFI. Correct direction, but **stops at -0.3545**.
3. **PFI alone is insufficient:** the most-negative post_ddr under OLD PFI is -0.0957 (original genes).
4. **The best achievable post_ddr from raw is -0.3545 (p=0.2847, non-significant).** The full gap to
   -0.711 is **NOT closed** by the isolated difference, nor by any combination tested here.

**Explicit statement (as required):** the identified difference (gene set) explains only **part** of the
gap (-0.2091 -> -0.3545) and I therefore kept looking (Section 6). No tested pipeline closes the gap to -0.711.

---

## 5. The exact -0.711 inputs are deleted and unrecoverable

`composite_roc_analysis_gse165897.py` reads (lines 34–35):
- `DATA_DIR/results/pathway_scores.csv` (precomputed feature matrix behind -0.711)
- `DATA_DIR/pfi_data_complete.json` (pre-correction PFI)

Scoped searches — shared-workspace `serial_sae_validation/` (depth 3), results `serial_sae_validation/`
(depth 3), and a full recursive search of local `/workspace` — find **neither file**; the `results/`
subdirectory that would hold `pathway_scores.csv` **does not exist**. (Recursive `find` on the S3 FUSE
root was deliberately avoided; it times out. Absence is established from the specific expected paths.)
The exact feature values behind -0.711 are **permanently unrecoverable**, so -0.711 cannot be regenerated
or audited against its own inputs. The surviving generator (`pathway_kinetics_gse165897.py`) on
checksum-identical raw data does not reproduce it.

---

## 6. Exhaustive sweep: nothing reaches -0.711

To rule out any remaining defensible pipeline choice, all features (pre / post / delta x ddr / pi3k / vegf
plus both composites) were correlated with both PFI vectors under both Spearman and Pearson, using the
original gene sets. Source: `scripts/sae_exhaustive_sweep.py`; summary `tables/sae_exhaustive_sweep_summary.json`.

**Manuscript Table-2 significance set vs best raw recomputation (corrected PFI, Spearman):**

| Feature | Manuscript p | Recomputed rho | Recomputed p | Reproduces? |
|---|---|---|---|---|
| post_ddr | 0.014 | -0.3545 | 0.2847 | **NO** |
| post_pi3k | 0.020 | -0.1909 | 0.5739 | **NO** |
| post_vegf | 0.088 | -0.4091 | 0.2115 | **NO** |
| post_composite_equal | 0.023 | -0.2727 | 0.4171 | **NO** |
| post_composite_weighted | 0.023 | -0.2727 | 0.4171 | **NO** |

- **`any_combination_reaches_-0.711` = false.**
- **Most negative post_ddr obtainable from raw = -0.3545 (p=0.2847, NS).**
- **All five manuscript Table-2 p-values recompute to p > 0.2.** The manuscript's entire
  "post-treatment pathway scores predict resistance" significance set is not reproducible from raw data —
  this is broader than the single -0.711 figure.

---

## 6b. Version-control (git) history check

Three repositories were searched across their **full history** (all branches, all commits):
crispro-backend-v2 (HEAD `d5ed8c3`), crispro-backend-v3 (HEAD `b2b2df2`), Synthetic-Lethality (HEAD
`d2538e8`). The shared-workspace scripts directory is not itself a git repository.

- **`pathway_kinetics_gse165897.py` and `pathway_scores.csv`: no history in any repo.** They never
  existed under version control; they lived only in the shared workspace and the deleted data directory.
- **A fourth, previously-unaudited artifact set exists in crispro-backend-v2**, all added in one commit
  **`e69324c`** ("Extend v3 Therapy-Fit contract with pan-tumor RUO axes") and never modified afterward:
  - `scripts/validation/validate_ovarian_pathway_model.py`
  - `api/services/efficacy_orchestrator/ovarian_pathway_model.py`
  - `api/services/efficacy_orchestrator/ovarian_pathway_gates.py`
  - `api/services/efficacy_orchestrator/OVARIAN_PATHWAY_VALIDATION_COMPLETE.md`
- **In every one of these, `-0.711` is a hardcoded constant, not a computed output.**
  `validate_ovarian_pathway_model.py` stores it in an `expected_correlations` dict
  (`"post_ddr": {"rho": -0.711, "p": 0.014}`) and performs a tolerance check
  (`abs(rho - expected_rho) < 0.15`). Critically, it **reads the now-deleted**
  `data/serial_sae/gse165897/results/pathway_scores.csv` (its `PATHWAY_SCORES_CSV`) and pulls columns
  `ddr/pi3k/vegf` from the `post-NACT` row — it does **not** recompute pathway scores from raw UMI. The
  "Observed -0.711" reported in `OVARIAN_PATHWAY_VALIDATION_COMPLETE.md` was therefore produced once from
  that deleted CSV and is not regenerable.
- The result files that would hold the observed values (`composite_scores_correlation.csv`,
  `AUC_summary_table.csv`, `results/FINAL_REPORT.md`) are **absent from all three repo histories**.
- `ovarian_pathway_model.py` defines a **third** DDR gene-set (26 genes; `OVARIAN_PATHWAYS['DDR']` =
  BRCA1/2, PALB2, RAD51/C/D, BRIP1, BARD1, ATM, ATR, CHEK1/2, RAD52, RAD54L, FANCA/B/C/D2/E/F/G,
  MRE11A, RAD50, NBN, XRCC2/3). Tested on the same verified raw data
  (`scripts/sae_v2_geneset_test.py` -> `tables/sae_v2_geneset_test.json`):

  | DDR gene set | rho (OLD PFI) | rho (corrected PFI) |
  |---|---|---|
  | 8-gene (pathway_kinetics) | -0.0957 | -0.3545 |
  | 14-gene (w1_discovery, frozen) | -0.0091 | -0.2091 |
  | **26-gene (v2 ovarian_pathway_model)** | **+0.1185** | **-0.1455** |

  The 26-gene set is **weaker**, not stronger. **All three historical DDR definitions on raw data:
  most negative post_ddr = -0.3545; none reaches -0.711.**

**Result of the git check:** no commit contains a computation that produces -0.711 from data. The only
version-controlled appearances are hardcoded constants and a validation script that consumed a deleted
intermediate. (The literals `0.711...` in unrelated TCGA-OV hypoxia reports and other repos' CSVs are
different analyses/datasets, not this figure.)

---

## 6c. Manual / non-Python path check

Searched for `.ipynb`, `.R`, `.Rmd`, `.xlsx`, `.xls` across: all three repo trees (current + full
history), the shared-workspace `serial_sae_validation/` tree, the results `serial_sae_validation/` tree,
and local `/workspace`.

- **Zero** `.ipynb`, `.R`, or `.Rmd` files exist in any of the three repositories (current tree or
  history), or in the shared-workspace / results `serial_sae_validation/` trees.
- The only spreadsheets found anywhere are unrelated third-party paper supplements
  (`EMS128591-supplement-1..7.xlsx`, `ccr-20-4314_table_s1..s3`) under a separate
  `tests/resistance_prophet/kill-chain/` directory — none reference the GSE165897 pathway analysis.
- No non-Python file references gse165897 pathway scores, ovarian pathway correlations, or Table 2.

**Result of the manual check:** Table 2 has **no** manual, R, or spreadsheet computational path. It was
produced entirely within the Python pipeline already audited.

---

## 7. DISTINCT, ADDITIONAL problem — n=11 is underpowered for any discrimination claim

This is a **separate** problem and does **not** substitute for the reproducibility answer above.

Even if the -0.711 point estimate were somehow explained, at n=11 the AUROC confidence intervals are so
wide that **no discrimination claim can be supported**:

| Metric | AUROC | 95% CI |
|---|---|---|
| post_ddr (corrected labels) | 0.5714 | **[0.125, 0.933]** |
| post_ddr (manuscript labels) | 0.75 | **[0.375, 1.0]** |
| post_pi3k (corrected labels) | 0.3571 | **[0.0, 0.767]** |

Every interval spans the 0.5 no-discrimination line (and the DDR correlation's own bootstrap CI
[-0.7536, 0.5794] spans zero). At n=11 the estimates are uninformative regardless of sign. **This
under-powering is a standalone reason the discovery cannot support a resistance-prediction claim, in
addition to the non-reproducibility established in Sections 4–6.**

---

## 8. Final classification (mandated choice)

**`NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`**
(equivalently `ORIGINAL_FIGURE_NOT_REPRODUCIBLE_UNDER_ANY_TESTED_PIPELINE`).

- **No source establishes -0.711.** Git history across three repos (§6b) and a manual/non-Python path
  search (§6c) both completed: every appearance of -0.711 is a hardcoded string or hardcoded `expected`
  constant; the one script that read a live value consumed the deleted `pathway_scores.csv` and does not
  recompute from raw; there is no `.ipynb`/`.R`/`.Rmd`/`.xlsx` analysis path.
- The one feature-construction difference (DDR gene set) is isolated and directionally correct
  (-0.2091 -> -0.3545) but **insufficient**; three historical DDR gene-set definitions (8/14/26 genes)
  were tested and the ceiling from raw is **-0.3545 (NS)**. No feature x test x PFI x gene-set
  combination reaches -0.711/p=0.014.
- The exact original feature matrix is deleted and absent from all version-control history, so -0.711
  cannot be audited against its own inputs.
- **`ORIGINAL_ERROR` is deliberately NOT used.** The only concrete data error found (the PFI vector) is
  *disproven* as a cause of the magnitude (§3a): the wrong PFI yields rho ≈ -0.01, moving the
  correlation toward zero, not toward -0.711. No erroneous computation was shown to have produced
  -0.711 — the value is untraceable, not demonstrably miscomputed.
- The PFI data error remains documented as a **separate, confirmed data-quality issue** (§3a), not as
  an explanation for -0.711.

The label-scheme question (8R/3S vs 7R/4S) is **not** the cause and is not reintroduced: the discovery
correlation uses continuous PFI and is byte-identical (rho = -0.2091) under both label schemes.

---

## 9. Traceability

| Element | Source |
|---|---|
| -0.711 emitter (hardcoded string) | `scripts/composite_roc_analysis_gse165897.py:399` |
| Original score generator (8-gene DDR, ÷15 rescale) | `scripts/pathway_kinetics_gse165897.py` |
| Frozen reproduction (14-gene DDR) | `scripts/w1_discovery.py`; `w1_discovery.json` (W1-01); `w1_discovery_features.csv` |
| Side-by-side gene-set/rescale/PFI rerun | `scripts/sae_root_cause_rerun.py`; `tables/sae_root_cause_rerun.json` |
| Exhaustive feature x test x PFI x gene-set sweep | `scripts/sae_exhaustive_sweep.py`; `tables/sae_exhaustive_sweep_summary.json` |
| Third (v2 26-gene) DDR set tested on raw | `scripts/sae_v2_geneset_test.py`; `tables/sae_v2_geneset_test.json` |
| Git-history hit: hardcoded -0.711 + validation script | crispro-backend-v2 commit `e69324c`: `scripts/validation/validate_ovarian_pathway_model.py`, `api/services/efficacy_orchestrator/ovarian_pathway_model.py`, `ovarian_pathway_gates.py`, `OVARIAN_PATHWAY_VALIDATION_COMPLETE.md` |
| Repos searched (full history) | crispro-backend-v2 `d5ed8c3`, crispro-backend-v3 `b2b2df2`, Synthetic-Lethality `d2538e8` |
| PFI-swap isolation (fixed feature matrix) | `worker-0.ipynb` cell `cell-f412325fd78f` (see ITEM1_REPRODUCIBILITY_FORENSIC.md §3) |
| CI / permutation / bootstrap for -0.209 | `worker-0.ipynb` cell `cell-cf87e6400cba` (see ITEM1_REPRODUCIBILITY_FORENSIC.md §5) |
| Raw data checksums | UMI sha16 `d604a459df7e5e70`; cellInfo sha16 `7366ec57d7de3613` |
| Deleted -0.711 inputs | `results/pathway_scores.csv`, `pfi_data_complete.json` (absent from all scoped locations AND all repo histories) |
| Canonical labels + corrected PFI | `gse165897/resistance_labels.json` (Zhang et al. 2022, Sci Adv 8:eabm1831, Table 1) |
