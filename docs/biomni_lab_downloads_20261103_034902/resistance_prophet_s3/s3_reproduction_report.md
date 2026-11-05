# S3 REPRODUCTION REPORT — what S3 actually contributes, rebuilt from source

**Scope:** directive §2. Reconstruct S3's contribution from the raw source data and the code, not from prior
receipts. Every number below was recomputed in this session by `code/s3_pipeline/` on a table rebuilt from the
published archive; where a documented value exists it is quoted alongside and the match or mismatch is stated.

**Companion artifacts:** `w2_reproduction.json`, `w3_analysis.json`, `w3f_reconciliation.json`,
`denominator_reconciliation.csv`, `tables/rebuilt_patient_master.csv`, `MODEL_CARD.md`,
`figures/fig1`–`fig4`.

---

## 1. Source data, checksums, environment

| Item | Value |
|---|---|
| Source | Nature Communications supplementary archive MOESM10 for DOI **10.1038/s41467-023-39867-7** |
| URL | `https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-023-39867-7/MediaObjects/41467_2023_39867_MOESM10_ESM.zip` |
| Citation | Smith P, Bradley T, Gavarró LM, et al. The copy number and mutational landscape of recurrent ovarian high-grade serous carcinoma. *Nat Commun* **14**, 4387 (2023) |
| Archive SHA256 | `2f7f15417e3a5076633dd75abbad75a26285d94ec1e26f8f22ebf10d337a0a3f` (**matches pin**) |
| Archive bytes | 10,603,503 |
| `figure_1B_layer_1.tsv` | `3c65ef5921b6d9a2a311fab4070f2f2af99c90b5e14a8e0629eae2b62f3b9b1d` |
| `figure_2.tsv` | `9e653d2b10b25c668bc508da9b1a667d94a7f99bd0500ba53aaeb53d51a9a3eb` |
| `figure_4A.tsv` | `0441d719edea4377c2ad1cc4f9e922a44edbc7481729194dce3bfbb2069a0187` |
| Environment | Python 3.11.13 · numpy 2.4.6 · pandas 3.0.5 · scipy 1.15.0 · scikit-learn 1.7.1 · Linux-4.19.0-gvisor |
| Seeds | 42 throughout; 10,000 permutations; 2,000 bootstraps |

The three members above are exactly the three inputs of the archived builder
(`obl3_build_patient_table.py`). The analysis is therefore reproducible from a public URL plus this code.

---

## 2. Outcome definition and time origin

| Item | Value |
|---|---|
| Endpoint field | **`pt_sensitivity_at_reg`** ∈ {`resistant`, `sensitive`} |
| Origin | platinum classification recorded **at trial registration** by the source study |
| Time origin | **none** — this is a *status at registration*, not a time-to-event derived here |
| Predictor timing | `s3_diag` = copy-number signature 3 exposure on the **diagnosis-stage** specimen, i.e. measured **before** the outcome is recorded |
| PFI / PFS available? | **No.** `figure_1B_layer_1.tsv` `event` ∈ {`diag`, `os`} only. There is no last-platinum-dose date, no progression date, no per-visit assessability field anywhere in the released tables |

The consequence, stated once and carried through: **platinum-free interval cannot be reconstructed from the
open data.** This is a demonstrated absence (column enumeration across all three members), not an assumption.
The five-class endpoint requested in the directive is therefore specified in `ENDPOINT_CONTRACT_v1.md` with
`primary_refractory`, `censored_before_assessable` and `indeterminate` marked
`NOT_DERIVABLE_FROM_OPEN_DATA` and the exact missing fields named.

Overall survival *is* available (`os_time`, `os_event`) and is used only as the secondary Cox analysis in §6.

---

## 3. Rebuild fidelity — the table diffs clean

Rebuilt table: `tables/rebuilt_patient_master.csv`, shape **(159, 26)**,
`pt_status` = {sensitive 121, resistant 38}.

### 3.1 Versus the archived analysis master (`obl3_patient_master.csv`)

| Check | Result |
|---|---|
| Rows | 159 vs 159; no key present in only one side |
| Columns | identical set; none missing either side |
| **Total mismatched cells** | **0** |
| Max absolute numeric difference, any signature column | ≤ **9.7e-17** (float round-trip) |
| Verdict | **`clean = true`** |

The plan's stop condition ("if the rebuilt table does not reconcile, W3 halts and the discrepancy becomes the
deliverable") is satisfied — the rebuild reconciles exactly, so the downstream analyses are licensed.

### 3.2 Versus the published Brenus CSV (`britroc_master_published.csv`)

| Check | Result |
|---|---|
| Rows | 159 vs 159 |
| Mismatched cells | **64**, all in the `resistant` column |
| Max absolute difference over jointly non-null cells | **0.0** |
| Jointly non-null `resistant` values | **95 / 95 agree** |
| Published `resistant` distribution | {0.0: **76**, NaN: **64**, 1.0: **19**} |
| Rebuilt `resistant` distribution | {0: 121, 1: 38} |
| Composition of the 64 NaNs | **45 sensitive + 19 resistant** in the rebuild |

**Root cause (register C10).** The published CSV takes the platinum label only from `figure_2.tsv`, which
covers 95 of the 159 patients; the archived builder takes it from `figure_1B_layer_1.tsv` first and falls back
to `figure_2.tsv`. Where both have a value they agree perfectly. The published file therefore **silently
discards 64 platinum labels, 19 of them resistant** — half the resistant patients in the cohort.

### 3.3 A latent encoding hazard found while replicating the builder

The archived builder computes `resistant = (pt_status == 'resistant').astype(Int64)`. A **missing** platinum
label is encoded `resistant = 0`, i.e. *platinum-sensitive*, not NA. In this specific archive
`strict_n_missing_label = 0`, so nothing is affected here (faithful encoding: 38 resistant / 121 zero-encoded).
But any future rebuild that filters on `resistant` rather than `pt_status.notna()` would treat unlabelled
patients as sensitive. Recorded so the contract pins `pt_status.notna()` as the filter.

Exposure aggregation, replicated exactly: multiple samples per patient/timepoint are averaged
(`pivot_table(aggfunc='mean')`). **No per-sample QC filter is applied, because per-sample QC metrics are not in
the open data.** That is a limitation of the source release, not a choice.

---

## 4. Denominator reconciliation and the nine events

| Step | Definition | n | resistant | sensitive | prevalence |
|---|---|---|---|---|---|
| **A** | full BriTROC-1 clinical table | **273** | 66 | 207 | 0.2418 |
| **B** | after label parse | 273 | 66 | 207 | 0.2418 |
| **C** | + evaluable diagnosis-stage CN exposures | **98** | **20** | 78 | **0.2041** |
| **D** | after covariate parse | 98 | 20 | 78 | 0.2041 |
| **E** | covariate-complete case | **67** | **9** | 58 | **0.1343** |

**Where "nine events" actually lives.** The directive's nine-event figure is *not* the primary S3 analysis set.
It is step **E** — the subset with complete `age`, `stage`, `num_lines` and `brca` — created solely to fit the
adjusted models. The primary S3 discrimination analysis has **20 events at n=98**. Conflating the two is how
AUROC 0.887 (an n=67 number) gets attached to the n=98 result.

Attrition A→C is **64%**, driven by the requirement for an evaluable diagnosis-stage CN profile.

### 4.1 Selection is not random

| Comparison | Fisher exact OR | p | prevalence in | prevalence out |
|---|---|---|---|---|
| labelled cohort → set98 | 0.6125 | 0.2511 | 0.2041 | 0.2951 |
| **set98 → set67** | **0.2821** | **0.0162** | **0.1343** | **0.3548** |
| `s3_diag` retained vs dropped (into set67) | — | MWU **0.1360** | median 0.1394 | median 0.1028 |

The covariate-complete subset is **significantly depleted of resistant patients** (p = 0.0162). `s3_diag`
itself is not significantly different between retained and dropped patients (p = 0.136), so the selection acts
on the *outcome*, not obviously on the predictor — which is the more damaging direction, because it changes the
prevalence against which PPV and calibration are judged. Every n=67 statistic in this deliverable carries this
warning.

---

## 5. Discrimination, direction, and uncertainty

See `figures/fig1_s3_discrimination.png` (distributions by outcome, ROC at both denominators) and
`figures/fig2_uncertainty_and_calibration.png` (bootstrap and permutation distributions, calibration curve,
fold-band vs bootstrap-CI comparison).

### 5.1 Primary denominator (n=98, 20 events)

| Metric | Reproduced | Documented | Match |
|---|---|---|---|
| AUROC, raw `s3_diag` vs resistance | **0.2715** [0.1532, 0.4058] | 0.2715 | yes |
| AUROC, protective orientation | **0.7285** [0.5942, 0.8468] | 0.7285 | yes |
| AUPRC (reversed axis) | 0.3478 [0.2635, 0.5143] | — | prevalence null **0.2041** |
| Permutation p, two-sided, 10,000 | **0.0014** | — | — |
| Mann–Whitney p | **0.0017** | 0.0017 | yes |
| Median `s3_diag` resistant / sensitive | **0.046383 / 0.154783** | — | — |

Across all seven signatures at this denominator, s3 is the **only** one surviving BH-FDR correction
(q = 0.0118; s4 q = 0.1387; s1 q = 0.2959; s7 q = 0.9262).

### 5.2 Covariate-complete subset (n=67, 9 events)

| Metric | Reproduced | Documented | Match |
|---|---|---|---|
| AUROC, raw | **0.113** [0.0421, 0.1983] | 0.113 | yes |
| AUROC, protective | **0.887** [0.8017, 0.9579] | 0.887 | yes |
| AUPRC | 0.4179 [0.301, 0.7282] | — | prevalence null 0.1343 |
| Permutation p | **9.999e-05** | — | — |
| Mann–Whitney p | **0.00021040055521920662** | 0.00021040055521920662 | yes |
| Median `s3_diag` resistant / sensitive | **0.024353 / 0.176513** | 0.0243531972 / 0.1765128612 | yes |

### 5.3 Direction and the resistance-axis reversal

Declared constant: **`HIGHER_S3_IS_PLATINUM_SENSITIVE`**. Verified in **both** denominators independently.

`AUROC_protective = 1 − AUROC_raw`. With positive class = resistant and raw `s3_diag` as the score, AUROC
**below** 0.5 is the expected and correct result. 0.2715 → 0.7285 and 0.113 → 0.887 are the *same statistic*
read from the other side of the axis, not two findings.

Source attribution for the direction: Macintyre 2018 (s3 = BRCA1/2-related HRD axis, positively prognostic;
anti-correlated with s1 = RAS/MAPK) and Smith 2023 ("CN signature 3 (s3), associated with defective HR, was
significantly **lower** … in the primary resistant population at diagnosis").

---

## 6. Adjusted effect — exact-specification reconciliation

An earlier pass of this work produced near-miss adjusted estimates (OR/SD 0.0189, Firth 0.0633, Cox HR 0.7384).
That gap was run to ground and was a **specification** difference, not a data difference.
`run_w3f_reconcile.py` re-ran the exact archived specification on the independently rebuilt table:

| Estimate | Reproduced | Documented | Match |
|---|---|---|---|
| `s3_diag` SD (n=98 modeling set) | **0.133721** | 0.1337 | yes |
| MLE OR per SD | **0.0252** (β −3.6791, p **0.0141**, OR CI [0.0013, 0.4759]) | 0.0252 / 0.0141 | yes |
| Firth OR per SD | **0.0825** (β −2.4949, Wald p **0.0095**, LRT p 4.9e-05) | 0.0825 / 0.0095 | yes |
| Cox OS HR per SD | **0.6869** (p **0.0430**, HR CI [0.4775, 0.9883]) | 0.6869 / 0.043 | yes |
| Schoenfeld global p | **0.2251**, `ph_violation = false` | 0.2251 | yes |
| `verdict.all_match` | **true** | | |

The four specification details that had to be exactly right (now pinned in
`candidate_spec_v0.1.0.json → covariate_contract_for_adjusted_analyses`):

1. `s3_diag` is standardised by the SD of the **n=98 modeling set** (0.133721), **not** the n=67 complete-case
   SD (0.139083).
2. The HRD covariate is **`brca`**, not any-HR-gene (`hr_gene_mut`).
3. `nlines = pd.to_numeric(num_lines, errors="coerce")` so **`'4+'` becomes NaN and is then median-filled**.
4. The Cox model covariates are only `[s3_diag_z, age_z, stage_adv, brca]` — **`nlines` is not in the Cox
   model**, though it is in the logistic model.

One-at-a-time deviation from the exact spec (MLE OR per SD):

| Variant | OR/SD | p | Cox HR / p |
|---|---|---|---|
| **V0 exact archived spec** | **0.0252** | **0.0141** | **0.6869 / 0.0430** |
| V1 `hr_gene_mut` instead of `brca` | 0.0236 | 0.0136 | — |
| V2 `'4+'` → 5 (right-censored ordinal) | 0.0214 | 0.0198 | — |
| V3 SD taken from n=67 | 0.0247 | 0.0148 | — |
| V4 earlier pass's specification | 0.0199 | 0.0185 | 0.7383 / 0.0937 |

Two things this shows. First, the *direction and order of magnitude are robust* to every one of these choices —
this is not a specification-mining result. Second, the **Cox p-value is fragile**: adding `nlines` to the Cox
model moves p from 0.0430 to 0.0937, i.e. across the conventional 0.05 line. Any survival claim must name its
covariate set.

**Power, stated with the estimate and not in a footnote:** 5 covariates on **9 events** is **EPV 1.8**, flagged
`UNDERPOWERED_FLAG: true` in the source receipt. MLE and Firth agree in direction and significance, so the
effect is not a separation artifact — but the adjusted point estimate (OR 0.0252 per SD, CI spanning
0.0013–0.4759, three orders of magnitude) is **not a usable effect size** and must not be quoted as one.

---

## 7. The receipted 0.8807 — provenance and what it is

`s3_diag_cv_validation.json` exists at `Brenus/clinical_validation/trackA/` on `main` and on 20+ `origin/*`
refs. An earlier reconnaissance claim that it did not exist was wrong and was retracted publicly and in
`PLAN.md` rows F2/F7. What genuinely does not exist is **the script that produced it, the fold assignments, and
the OOF predictions** — a receipt without provenance (register **C04**). Full forensic account in
`unsourced_numbers_forensic.md`.

Documented contents: n=67, 9 resistant / 58 sensitive, `cv_auroc_mean_for_resistance` =
**0.8807231800766283**, `cv_auroc_sd` = 0.00454242948722634, fold band
[0.871647509578544, 0.8889367816091954], `raw_univariate_auroc` = 0.11302681992337164,
`loo_auroc` = 0.871647509578544, `permutation_null` empirical two-sided p = 0.0003999200159968006 at 5,000
permutations, `brier_oof` 0.15286348564965177 vs `brier_prevalence_only` 0.11628425038984185.

### 7.1 The cross-validation adds no information — proven, not argued

| Quantity | Value |
|---|---|
| Raw AUROC of `s3_diag` (positive class = resistant) | 0.1130268199 |
| **1 − raw** | **0.8869731801** |
| Reproduced CV AUROC, RepeatedStratifiedKFold 5-fold × 200 repeats | 0.8817097701 (sd 0.0051862804) |
| Reproduced LOO AUROC | **0.8716475096** vs documented 0.871647509578544 — **exact** |
| **max \|AUROC(fitted model) − (1 − AUROC(raw s3))\| across 1,000 test folds** | **1.11e-16** |

A logistic model on a **single** feature is a monotone increasing transform of that feature. AUROC is invariant
under monotone transforms. Therefore cross-validating a one-feature logistic model recovers the raw feature's
AUROC to machine precision — 1.11e-16 is floating-point noise, not agreement-within-tolerance. The 5×200 CV
scheme, the in-fold scaler, and the class-balanced weighting are all real and correctly implemented, and they
**cannot** change the answer. The receipt's own leakage check confirms this from the other side:
`select_then_cv` 0.8802681992337165 == `select_in_fold` 0.8802681992337165, bit-identical.

This matters because a CV number reads as evidence of generalisation. Here it is evidence of nothing beyond the
apparent AUROC. Cross-validation only starts doing work once a **threshold**, a **calibration**, or a
**multi-feature fit** is introduced — which is precisely where this deliverable applies it (§8, `MODEL_CARD` §4.6).

### 7.2 The fold band is not a confidence interval

| Interval | Bounds | Width |
|---|---|---|
| Published fold band (2.5–97.5 pctile across repeats) | [0.8716, 0.8908] | **0.0192** |
| Honest stratified bootstrap CI on the same data | **[0.8017, 0.9579]** | **0.1562** |
| **Ratio** | | **8.14×** |

The fold band measures dispersion across resampled *training folds of the same 67 patients*. It says nothing
about sampling variability of the population AUROC and it shrinks as you add repeats. Quoting ±0.005 around
0.8807 understates uncertainty by roughly an order of magnitude. The correct statement at this denominator is
**0.887, 95% CI [0.80, 0.96], n=67, 9 events, protective feature read on the reversed axis, on an
outcome-depleted subset**.

### 7.3 Near-miss numbers excluded

| Candidate | What it actually is | Why excluded |
|---|---|---|
| **0.8739** | `roc_auc_score(y_rclass, s7_rel)`, n=40, **3 events** | different signature (s7), different timepoint (relapse), different label (RECIST-derived `rclass`); **reverses to 0.3136** on the same 40-patient feature matrix when only the label is swapped to registration platinum status |
| **0.8870** | frozen production scorer AUROC on n=67 | this is 1 − raw AUROC again, not an independent result |
| ~3,081 lines / 223 unique `repo\|path` | float-substring noise matching the literal string `0.8807` | not AUROC values |

---

## 8. Where cross-validation does real work — incremental value

Full results in `MODEL_CARD.md` §4.6, `incremental_value.csv`, `tables/incremental_value_deltas.csv`,
subject-level `oof_predictions.csv`, and `figures/fig3_incremental_value.png`.

Design: n=67, 9 events; **identical fold indices** across all models; RepeatedStratifiedKFold 5×20 = 100 fits
per model; Firth-penalised logistic primary; **all standardisation inside training folds**; seed 42; paired
bootstrap (2,000 draws) for every delta. Leakage guard passed —
`preprocessing_varies_across_folds = True` for every fitted model.

Headline OOF AUROCs: clinical baseline **0.5867**; s3 alone **0.8747**; shipped s7 ≥ 0.25 rule **0.6446**;
s7 continuous **0.4108**; clinical + s3 **0.8752**; BRCA/HR mutation only **0.3139**; BRCA/HR + s3 **0.8507**.

Two deltas carry the argument, both with CIs excluding zero:

- **clinical → clinical + s3: ΔAUROC +0.3525 [0.1494, 0.5480]**, p 0.0005
- **BRCA/HR mutation → mutation + s3: ΔAUROC +0.6571 [0.4713, 0.8257]**, p < 0.001

ΔAUPRC agrees for both (+0.2078 [0.0100, 0.4494]; +0.3836 [0.2015, 0.6256]). ΔBrier excludes zero for the
mutation comparison (−0.0261 [−0.0516, −0.0009]) but not for the clinical one (−0.0227 [−0.0474, 0.0049]) —
consistent with a discrimination gain that does not buy calibrated risk.

Full-data Firth LRT for dropping `s3_diag` (**non-OOF**, supporting only): p **0.000423** (clinical + s3),
**0.000145** (brca + hr + s3), **0.000154** (s7 + s3).

**Carried with every delta:** n=67, 9 events, **EPV < 2 for every multivariable model**. These comparisons can
exclude large effects; they cannot establish small ones.

### 8.1 Is S3 just the HRD/BRCA axis restated? No — measured

| Set | Variable | n mutant | r with `s3_diag` | p | MWU p (s3 by mutation) | AUROC of mutation alone |
|---|---|---|---|---|---|---|
| 98 | `brca_mut` | 19 | 0.0912 | 0.3718 | 0.3203 | **0.4724** |
| 98 | `hr_gene_mut` | 26 | 0.0347 | 0.7341 | 0.7565 | 0.4590 |
| 67 | `brca_mut` | 19 | 0.0478 | 0.7011 | 0.6461 | 0.5287 |
| 67 | `hr_gene_mut` | 26 | −0.0379 | 0.7609 | 0.7138 | 0.5326 |

BRCA-stratified `s3_diag`, n=98: **wildtype** n=79 / 17 events, raw AUROC **0.3292** [0.1964, 0.472]
(protective 0.6708) — `interpretable = True`. **Mutant** n=19 / **3 events**, raw AUROC 0.0208 [0.0, 0.125] —
`interpretable = False`; 3 events supports no conclusion and is labelled as such rather than reported as
"AUROC 0.98 in BRCA-mutant patients", which is what that stratum would otherwise look like on the reversed axis.

**Conclusion.** Mutation-defined HRD is at chance for this endpoint in this cohort and is uncorrelated with
`s3_diag`. The copy-number axis and the mutation axis are not the same variable here. s3 re-derives a
*published copy-number* HRD axis — that part is method validation, not discovery — but it is **not** a proxy
for BRCA/HR mutation status, and that specific negative result is, as far as this deliverable's evidence goes,
the new contribution.

---

## 9. Thresholds — and why 0.10 is rejected as a lock

See `tables/threshold_operating_characteristics.csv`, `threshold_stability.csv`,
`tables/decision_curve_net_benefit.csv`, `figures/fig4_threshold_and_net_benefit.png`.

Direction: `low_is_event` — flag when `s3_diag ≤ t`.

| t | set | flagged | TP | FP | Sens | Spec | **PPV** | NPV | Youden J |
|---|---|---|---|---|---|---|---|---|---|
| 0.050 | 98 | 26 | 11 | 15 | 0.550 | 0.808 | 0.423 | 0.875 | 0.358 |
| **0.075** | 98 | 33 | 14 | 19 | 0.700 | 0.756 | 0.424 | 0.908 | **0.456** |
| **0.100** | 98 | 40 | 15 | 25 | 0.750 | 0.679 | **0.375 [0.242, 0.530]** | 0.914 | 0.429 |
| 0.150 | 98 | 54 | 16 | 38 | 0.800 | 0.513 | 0.296 | 0.909 | 0.313 |
| 0.075 | 67 | 21 | 8 | 13 | 0.889 | 0.776 | 0.381 | 0.978 | 0.665 |
| **0.100** | 67 | 26 | 9 | 17 | **1.000** | 0.707 | **0.346 [0.194, 0.538]** | 1.000 | 0.707 |

Cutpoint stability across the 100 training folds: median **0.0646**, IQR [0.0646, 0.0798], min **0.0502**,
max **0.0798**, 2.5–97.5 pctile [0.0588, 0.0798]; bootstrap CI of the cutpoint [0.0467, 0.2084].

**Verdict on 0.10: `REJECTED_AS_LOCK`.** It is **outside** the fold envelope (every one of 100 folds chose a
lower cut), inside only the much wider bootstrap CI, and it is not even the best Youden point at the primary
denominator — 0.075 is (J 0.456 vs 0.429). Its provenance is `UNSOURCED_IN_REPOSITORY`: there is no
`s3_diag < 0.10` rule in any file on any ref of any repository. It is a candidate for evaluation, nothing more.

Honest out-of-fold operating point at the in-fold-chosen cut: **mean sensitivity 0.6525, mean specificity
0.7510** — materially worse than the apparent numbers above, which is the expected optimism penalty and the
reason threshold selection is the one place CV genuinely matters here.

**PPV 0.35–0.38 at either denominator means about two of every three flagged patients are not
platinum-resistant.** No threshold in this candidate may be quoted without that.

---

## 10. Influence and robustness

| Analysis | Result |
|---|---|
| Base AUROC (n=98) | 0.2715 |
| Leave-one-event-out (20 drops) | min **0.2352**, max **0.2827**, range 0.0476 — matches documented range exactly |
| Leave-one-subject-out (98 drops) | identical range 0.2352–0.2827 |
| Direction flip by any single subject | **none** (`no_single_subject_flips_direction = true`) |
| Purity / ploidy / immune confounding | **NOT TESTABLE** — per-patient values are not in the released tables |

The signal is not driven by any single patient. It has not been shown to be independent of tumour purity or
ploidy, because the open data does not permit that test; this is recorded as an untested confounder, not a
cleared one.

---

## 11. What this report establishes, and what it does not

**Established.**
1. The analysis is reproducible from a public checksummed URL: the rebuilt table diffs to **0 mismatched
   cells** against the archived master.
2. Every documented headline statistic reproduces: AUROC 0.2715 / 0.113, MWU p to 17 significant figures,
   LOO 0.8716475096 exactly, adjusted MLE OR 0.0252, Firth OR 0.0825, Cox HR 0.6869, LOEO range 0.2352–0.2827.
3. Direction is consistent across both denominators and matches two independent publications.
4. `s3_diag` adds discrimination over both a clinical baseline and mutation-defined HRD, with CIs excluding
   zero on identical folds.
5. The receipted CV AUROC is arithmetic (1 − raw, to 1.11e-16) and its fold band understates uncertainty
   8.14-fold.
6. The 0.10 threshold is unsourced and outside the fold envelope.

**Not established, and not claimable.**
1. Any external validity — no independent cohort has been tested (Gate C `BLOCKED`).
2. Any calibrated probability — slope CI [0.3394, 2.7345], Brier skill **−0.2762**.
3. Any effect size — EPV 1.8 on the adjusted fit.
4. Independence from purity/ploidy — not testable in the open data.
5. Any novelty as a biomarker — this is a re-derivation of a published copy-number axis on the cohort that
   published it.
6. Analytical validity end-to-end — there is **no code path from raw copy-number data to an s3 exposure in any
   repository on any ref** (register **C12**). Every number here starts from *already-computed* exposures
   published as a supplementary table. That gap is the single most important thing to close for Gate A.
