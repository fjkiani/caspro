# MODEL CARD — Resistance Prophet S3 candidate

| Field | Value |
|---|---|
| **Model / candidate id** | `RESISTANCE_PROPHET_S3_CANDIDATE` |
| **Version** | `0.2.0` |
| **Status** | `RESEARCH_CANDIDATE_LOCKED` — research use only, not a clinical product |
| **Machine-readable spec** | `candidate_spec_v0.2.0.json` (authoritative; this card is the human-readable view; v0.1.0 retained as superseded) |
| **Endpoint contract** | `ENDPOINT_CONTRACT` v1.0.0 (`ENDPOINT_CONTRACT_v1.md` / `.json`) |
| **Deployment flag** | `ZETA_S3_RESEARCH_ENABLED` — default **off** |
| **Regulatory status** | Research Use Only. Not for diagnostic procedures. No CE/IVDR/FDA submission exists. |
| **Date** | 2026-08-19 |

---

## 1. Intended use

### 1.1 Supported now — `RANKING_ONLY`

Rank-orders patients with high-grade serous ovarian carcinoma by **copy-number signature 3 exposure measured on
the diagnosis-stage specimen (`s3_diag`)**, as a research-use enrichment variable for cohort selection,
hypothesis generation, and trial-design simulation.

The only claim the evidence supports is **relative ordering**: among patients scored by this candidate, those
with lower `s3_diag` were more likely to be classified platinum-resistant at registration in the BriTROC-1
cohort. Nothing beyond ordering is supported.

### 1.2 Explicitly NOT supported

| Not supported | Reason (measured, not asserted) |
|---|---|
| Per-patient probability of platinum resistance | Calibration slope 1.537, 95% CI **[0.3394, 2.7345]** — the CI spans values from severe under-dispersion to severe over-dispersion. Brier 0.1484 vs prevalence-only 0.1163 ⇒ **skill −0.2762**: the frozen scorer's absolute risks are *worse than quoting the base rate*. |
| Treatment selection or treatment de-escalation | No prospective comparison exists, no named clinical decision has been specified, Gate E is `BLOCKED`. |
| Prognostic statement to a patient | Gates C, D, E all `BLOCKED`; no external cohort has been tested. |
| Any clinical decision threshold | `0.10` is permanently `REJECTED_AS_LOCK` (§5). v0.2.0 locks **0.075** as a *research-candidate* operating point for shadow scoring and the Gate E hypothesis — it is not a clinical decision threshold. |
| "88% confidence" or any AUROC→confidence conversion | Categorically prohibited (§7). AUROC is a rank statistic over pairs, not a per-patient probability. |
| "Durable" or "independent" biomarker language | Prohibited by `CLAIM_LEDGER.md` row 9; this work does not lift that prohibition. |

### 1.3 Target population and out-of-scope populations

- **In scope for the evidence as it stands:** relapsed/recurrent high-grade serous ovarian carcinoma with an
  evaluable diagnosis-stage shallow-WGS copy-number profile, as represented by BriTROC-1 (UK, multi-site).
- **Out of scope:** any non-HGSOC histology (the cohort is 94/95 HGSC where histology is recorded, 1 HGEC);
  any specimen type or assay pipeline not equivalent to the source shallow-WGS/QDNAseq→`CNsignatures` route;
  any tumour type outside ovarian. No transfer evidence exists.

---

## 2. Feature and direction

| Item | Value |
|---|---|
| Feature | `s3_diag` — Macintyre 2018 copy-number **signature 3** exposure on the diagnosis-stage specimen |
| Framework | `MACINTYRE_2018_7_SIGNATURE` (Macintyre G, Goranova TE, De Silva D, et al. *Nat Genet* **50**, 1262–1270, 2018; DOI 10.1038/s41588-018-0179-8) |
| Units | dimensionless exposure fraction in [0, 1] |
| Prespecified | **Yes** — single feature, no selection step, therefore no selection can leak |
| Scaling denominator (pinned) | SD = **0.133721** computed on the n=98 modeling set (documented value 0.1337) |
| **Direction constant** | **`HIGHER_S3_IS_PLATINUM_SENSITIVE`** |
| Sign of score | resistance score is **monotone decreasing** in `s3_diag` |
| Forbidden aliases | `cosmic_cn_signatures.Sig7`, `cosmic_cn_signatures.Sig3`, `SBS3`, any COSMIC-namespace field |

**Framework mismatch is an error, not a fallback.** COSMIC CN signatures and COSMIC SBS3 are different
frameworks with different definitions. A scorer that reads a COSMIC-namespace field and treats it as a
Macintyre exposure must **raise**, never silently return `None` or a default. This is not hypothetical: it is
the live defect recorded as **C02** in `contradiction_register.csv` (`prognosis.py:70–80` derives a threshold
from Macintyre/BriTROC s7 but reads
`molecular_profile.signatures.cosmic_cn_signatures.Sig7`).

**Direction is source-attributed and independently verified in both denominators**
(Smith P, Bradley T, Gavarró LM, et al. *Nat Commun* **14**, 4387, 2023; DOI 10.1038/s41467-023-39867-7:
"CN signature 3 (s3), associated with defective HR, was significantly *lower* … in the primary resistant
population at diagnosis"). A declared direction contradicting the locked constant must cause a refusal.

**AUROC orientation, stated plainly to prevent a recurring misreading.** With positive class = *resistant* and
the raw `s3_diag` value used directly as the score, AUROC **below** 0.5 is the *expected, correct* result for a
protective feature. `AUROC_protective = 1 − AUROC_raw`. Reporting only the reversed number without saying that
the axis was reversed is how a protective marker gets mistaken for a resistance predictor.

---

## 3. Training data, denominators, and provenance

| Ladder step | n | resistant | sensitive | prevalence |
|---|---|---|---|---|
| **A** full BriTROC-1 clinical table (`figure_1B_layer_1.tsv`) | 273 | 66 | 207 | 0.2418 |
| **B** after label parse | 273 | 66 | 207 | 0.2418 |
| **C** with evaluable diagnosis-stage CN exposures — **primary denominator** | **98** | **20** | 78 | **0.2041** |
| **D** after covariate parse | 98 | 20 | 78 | 0.2041 |
| **E** covariate-complete case — **the "nine events" set** | **67** | **9** | 58 | **0.1343** |

Full ladder in `denominator_reconciliation.csv`. `strict_n_missing_label = 0`.

**Selection is not random and is reported as a threat to validity, not hidden.**
- labelled → set98: Fisher exact OR **0.6125**, p **0.2511** (0.2041 inside vs 0.2951 outside)
- **set98 → set67: Fisher exact OR 0.2821, p 0.0162** (0.1343 inside vs **0.3548** outside)

The covariate-complete subset is **depleted of resistant patients**. Every statistic quoted at n=67 —
including AUROC 0.887 and the adjusted OR — is computed on a set whose event prevalence is significantly lower
than the set it was drawn from. This is a material limitation of the n=67 analyses.

### Provenance (enforced at load time by the research scorer)

| Item | Value |
|---|---|
| Source archive | Nature Communications MOESM10 supplementary archive for DOI 10.1038/s41467-023-39867-7 |
| Archive SHA256 | `2f7f15417e3a5076633dd75abbad75a26285d94ec1e26f8f22ebf10d337a0a3f` |
| Archive bytes | 10,603,503 |
| `figure_4A.tsv` | `0441d719edea4377c2ad1cc4f9e922a44edbc7481729194dce3bfbb2069a0187` |
| `figure_1B_layer_1.tsv` | `3c65ef5921b6d9a2a311fab4070f2f2af99c90b5e14a8e0629eae2b62f3b9b1d` |
| `figure_2.tsv` | `9e653d2b10b25c668bc508da9b1a667d94a7f99bd0500ba53aaeb53d51a9a3eb` |
| Independent rebuild vs archived master | **0 mismatched cells** (159 × 26) |

---

## 4. Performance

All figures below are reproduced from source data by `s3_pipeline/` in this deliverable, not copied from prior
receipts. Seed 42 throughout; 10,000 label permutations; 2,000 bootstrap resamples; paired bootstrap for all
model-vs-model deltas.

### 4.1 Primary denominator (n=98, 20 events, prevalence 0.2041)

| Metric | Value | 95% CI |
|---|---|---|
| AUROC, raw `s3_diag` vs resistance | **0.2715** | [0.1532, 0.4058] |
| AUROC, protective orientation (1 − raw) | **0.7285** | [0.5942, 0.8468] |
| AUPRC (resistance, reversed axis) | 0.3478 | [0.2635, 0.5143] — prevalence null **0.2041** |
| Permutation p (two-sided, 10,000) | **0.0014** | — |
| Mann–Whitney p | 0.0017 | — |
| Median `s3_diag` | resistant **0.046383** vs sensitive **0.154783** | — |

Across all seven signatures at this denominator, **s3 is the only one surviving BH-FDR** (q = 0.0118;
`obl3_all7_signatures_bh.csv`).

### 4.2 Covariate-complete subset (n=67, 9 events, prevalence 0.1343)

| Metric | Value | 95% CI |
|---|---|---|
| AUROC, raw | **0.113** | [0.0421, 0.1983] |
| AUROC, protective | **0.887** | **[0.8017, 0.9579]** |
| AUPRC | 0.4179 | [0.301, 0.7282] — prevalence null 0.1343 |
| Permutation p | **9.999e-05** | — |
| Mann–Whitney p | 0.00021040055521920662 | — |

> **Mandatory citation form.** Any use of 0.887 (or the receipted 0.8807) must carry, in the same sentence:
> **n=67, 9 events**, **reversed raw feature**, and the **selection warning** from §3. The number is not
> quotable bare.

### 4.3 The receipted CV AUROC 0.8807 is arithmetic, not added information

`s3_diag_cv_validation.json` reports `cv_auroc_mean_for_resistance = 0.8807231800766283`
(sd 0.00454242948722634; fold band [0.871647509578544, 0.8889367816091954]).

| Quantity | Value |
|---|---|
| Raw AUROC of `s3_diag` | 0.1130268199 |
| 1 − raw | **0.8869731801** |
| Reproduced CV AUROC (RepeatedStratifiedKFold 5×200) | 0.8817097701 (sd 0.0051862804) |
| Reproduced LOO AUROC | **0.8716475096** (documented 0.871647509578544 — exact) |
| **max \|AUROC(fitted) − (1 − AUROC(raw s3))\| over 1,000 test folds** | **1.11e-16** |

A single-feature logistic model is a **monotone** transform of that feature, and AUROC is invariant to monotone
transforms. Cross-validating it therefore recovers the raw feature's AUROC to machine precision and adds no
information about generalisation. The published **fold band width is 0.0192**; the honest stratified bootstrap
CI on the same data is **[0.8017, 0.9579]**, width **0.1562** — **8.14× wider**. Presenting the fold band as an
uncertainty interval understates uncertainty by roughly an order of magnitude.

### 4.4 Adjusted effect — exact-specification reproduction

Re-running the archived specification (`obl3_s3_quantification.py`) on the independently rebuilt table:

| Estimate | Reproduced | Documented | Match |
|---|---|---|---|
| `s3_diag` SD (n=98 modeling set) | **0.133721** | 0.1337 | yes |
| MLE OR per SD | **0.0252** (β −3.6791, p **0.0141**, CI [0.0013, 0.4759]) | 0.0252 / 0.0141 | yes |
| Firth OR per SD | **0.0825** (β −2.4949, Wald p **0.0095**, LRT p 4.9e-05) | 0.0825 / 0.0095 | yes |
| Cox OS HR per SD | **0.6869** (p **0.0430**, CI [0.4775, 0.9883]) | 0.6869 / 0.043 | yes |
| Schoenfeld global p | **0.2251** — no PH violation | 0.2251 | yes |

Pinned covariate contract: `[s3_diag_z, age_z, stage_adv, brca, nlines]` for logistic; `[s3_diag_z, age_z,
stage_adv, brca]` for Cox (**no** `nlines`); `nlines` via `pd.to_numeric(..., errors="coerce")` so `'4+'` →
NaN → median-filled. Sensitivity recode `'4+'`→5 gives OR/SD 0.0214, p 0.0198 — same direction, same order of
magnitude.

**MLE and Firth agree in direction and significance**, so the effect is not a separation artifact. But
**5 covariates on 9 events is EPV 1.8** and is flagged `UNDERPOWERED_FLAG: true` in the source receipt; the
adjusted point estimate (OR 0.0252 per SD) is not a stable effect size and must not be quoted as one.

### 4.5 Calibration — fails

Frozen production scorer (`score_cn_resistance.py`: `sigmoid(β₀ + β₁·z(s3_diag))`, β₀ = −1.5244530417837185,
β₁ = −2.349692574868657, µ = 0.1767425892802721, σ = 0.13804070487798628) on n=67:

| Metric | Value |
|---|---|
| AUROC | 0.887 |
| Calibration intercept | **−2.1174** CI [−3.4144, −0.8204] |
| Calibration slope | **1.537** CI **[0.3394, 2.7345]** |
| Brier | **0.1484** |
| Brier, prevalence-only | 0.1163 |
| **Brier skill vs prevalence** | **−0.2762** |

The scorer discriminates and is **mis-calibrated in the direction of over-predicting risk**. The source
receipt says the same thing ("Miscalibrated (over-predicts risk) at n=67; discrimination is reliable, absolute
risk is NOT"). Rank use only.

### 4.6 Incremental value — 4+ models on identical folds

n=67, 9 events; RepeatedStratifiedKFold 5×20 = 100 fits per model; Firth-penalised logistic primary;
**all standardisation inside training folds**; seed 42. Leakage guard passed
(`preprocessing_varies_across_folds = True` for every fitted model). AUPRC prevalence null 0.1343; Brier
prevalence-only 0.1163.

| Model | Kind | Features | OOF AUROC | fold SD | OOF AUPRC | OOF Brier |
|---|---|---|---|---|---|---|
| `M0_clinical` | fitted | age_z; stage_adv; num_lines_n | 0.5867 | 0.0437 | 0.2200 | 0.1212 |
| `M1_s3_only` | fitted | s3_diag | **0.8747** | 0.0062 | 0.4041 | **0.0910** |
| `M2a_shipped_s7_rule` | fixed | s7_diag ≥ 0.25 (production rule) | 0.6446 | 0.0000 | 0.2114 | 0.2090 |
| `M2b_s7_continuous` | fitted | s7_diag | 0.4108 | 0.0792 | 0.1453 | 0.1221 |
| `M2c_frozen_s3_scorer` | fixed | pinned sigmoid | 0.8870 | 0.0000 | 0.4179 | 0.1484 |
| `M3a_clinical_plus_s3` | fitted | M0 + s3_diag | 0.8752 | 0.0182 | **0.4325** | 0.1005 |
| `M3b_s7_plus_s3` | fitted | s7_diag; s3_diag | 0.8581 | 0.0160 | 0.4033 | 0.0984 |
| `M4a_hrd_only` | fitted | brca_mut; hr_gene_mut | 0.3139 | 0.0607 | 0.1011 | 0.1257 |
| `M4b_hrd_plus_s3` | fitted | M4a + s3_diag | 0.8507 | 0.0162 | 0.4129 | 0.1001 |
| `M5_full` | fitted | 6 parameters | 0.8372 | 0.0303 | 0.3602 | 0.1155 |

Paired-bootstrap deltas, 2,000 draws (CI excluding zero marked **T**):

| Comparison | ΔAUROC | 95% CI | excl. 0 |
|---|---|---|---|
| M0 clinical → clinical + s3 | **+0.3525** | [0.1494, 0.5480] | **T** |
| M0 clinical → s3 alone | +0.3410 | [0.1092, 0.5670] | **T** |
| **M4a BRCA/HR mutation → + s3** | **+0.6571** | **[0.4713, 0.8257]** | **T** |
| M4a BRCA/HR mutation → s3 alone | +0.6609 | [0.4463, 0.8506] | **T** |
| M2b s7 continuous → s7 + s3 | +0.4080 | [0.1494, 0.6782] | **T** |
| M2a shipped s7 rule → s3 alone | +0.2232 | [0.0498, 0.3927] | **T** |
| M2c frozen scorer → refit s3 | −0.0192 | [−0.0403, −0.0029] | **T** |

ΔAUPRC: M0→M3a **+0.2078** [0.0100, 0.4494] T; M0→M1 +0.1840 [−0.0922, 0.4676] **F**; M4a→M4b **+0.3836**
[0.2015, 0.6256] T; M2b→M3b +0.2614 [0.0929, 0.5972] T; M2a→M1 +0.1679 [0.0080, 0.4434] T.
ΔBrier: M2a→M1 −0.1185 [−0.2076, −0.0392] T; M4a→M4b −0.0261 [−0.0516, −0.0009] T; M4a→M1 −0.0343
[−0.0567, −0.0099] T; M2c→M1 −0.0579 [−0.0913, −0.0244] T.

Full-data Firth LRT for dropping `s3_diag` (**non-OOF**, reported as supporting not primary evidence):
clinical + s3 → p **0.000423**; brca + hr + s3 → p **0.000145**; s7 + s3 → p **0.000154**.

> **Power warning, carried with every delta:** n=67 with 9 events. **Events-per-variable is below 2 for every
> multivariable model.** These comparisons can exclude large effects but cannot establish small ones.

### 4.7 S3 is not a restatement of BRCA/HR mutation status — the actual new result

| Set | Variable | n mutant | point-biserial r with s3 | p | s3 medians (mut vs wt) | MWU p | AUROC of mutation alone |
|---|---|---|---|---|---|---|---|
| 98 | `brca_mut` | 19 | **0.0912** | 0.3718 | 0.152 vs 0.1188 | 0.3203 | **0.4724** |
| 98 | `hr_gene_mut` | 26 | 0.0347 | 0.7341 | 0.1385 vs 0.1312 | 0.7565 | 0.4590 |
| 67 | `brca_mut` | 19 | 0.0478 | 0.7011 | 0.152 vs 0.1341 | 0.6461 | 0.5287 |
| 67 | `hr_gene_mut` | 26 | −0.0379 | 0.7609 | 0.1385 vs 0.1463 | 0.7138 | 0.5326 |

BRCA-stratified `s3_diag` at n=98: **wildtype** n=79 / 17 events, raw AUROC **0.3292** [0.1964, 0.472]
(protective 0.6708), `interpretable = True`; **mutant** n=19 / **3 events**, raw AUROC 0.0208 [0.0, 0.125],
`interpretable = False` — 3 events supports no conclusion and is labelled as such.

**Interpretation.** Germline/somatic BRCA and HR-gene mutation status carries essentially *no* discriminating
information for registration platinum classification in this cohort (AUROC 0.459–0.533, i.e. chance), and is
**uncorrelated with `s3_diag`** (|r| ≤ 0.091, all p > 0.37). `s3_diag` retains its signal within the
BRCA-wildtype stratum. So the answer to "does S3 just rediscover the HRD/BRCA axis?" is: it re-derives a
published *copy-number* HRD axis, but it is **not** a proxy for mutation-defined HRD, and it is not redundant
with it (ΔAUROC +0.6571 [0.4713, 0.8257]).

### 4.8 Influence

Base AUROC 0.2715. Leave-one-event-out (20 drops): min **0.2352**, max **0.2827**, range 0.0476 — matches the
documented range exactly. Leave-one-subject-out (98 drops): identical range.
`no_single_subject_flips_direction = True`. The signal is not one-patient-driven.

### 4.9 Post-lock evidence updates (2026-08-19, spec v0.2.0)

**NFE-3 — selection-bias sensitivity (resolves Gate B5 → PASS_WITH_CAVEATS).** The 31 patients dropped from
the covariate-complete set are missing all five covariates jointly, and their exclusion is outcome-associated
(resistant rate 35.5% dropped vs 13.4% retained; Fisher p = 0.0162). Within-fold multiple imputation
(IterativeImputer, m = 10 per fold, outcome as predictor, held-out outcomes masked; Firth estimator;
identical 5×20 folds; Rubin pooling) on the full n = 98: M0 AUROC 0.5171 [0.4691, 0.5652], M3a 0.7008
[0.6759, 0.7256], **ΔAUROC 0.1836 [0.1563, 0.2109] — excludes zero** (KNN sensitivity: 0.0955
[0.0882, 0.1029]). The complete-case Δ 0.3525 was inflated by outcome-selective exclusion; the transported
estimate is ~0.18. Caveats: MNAR not excludable; 20 events. M3a (0.7008) does not beat raw s3 alone on n = 98
(0.7285) — the parsimonious M1 remains primary. (`nfe3_imputation.json`,
`tables/nfe3_imputation_incremental_value.csv`.)

**NFE-1 — framework crosswalk (decisive negative).** On TCGA-OV (n = 529, both frameworks scored by their
originating laboratories): s3 ↔ CX3 Spearman ρ = **0.305** [0.227, 0.382]; s3 ↔ CX2 ρ = 0.279; s3 ↔
(CX3 − CX2) ρ = 0.156; call concordance 54.3%, Cohen's κ = 0.084. All seven contrasts fall decisively below
the 0.80 concordance criterion; s3's strongest CX correlates are negative (CX4 −0.570, CX8 −0.529).
**Consequence:** no CX-framework cohort (OV04, Hartwig as published) can serve as external validation. The
Gate C route is direct Macintyre s1–s7 quantification (natively supported by `CINSignatureQuantification`)
on absolute CN profiles with platinum outcomes (TCGA-OV ASCAT/SNP6 + TCGA-CDR; PCAWG-OV).
(`nfe1_crosswalk.json`, `tables/nfe1_crosswalk_concordance.csv`, `figures/fig5_framework_crosswalk.png`.)

---

## 5. Threshold record — `0.075` LOCKED (v0.2.0); `0.10` REJECTED as a lock

### 5.1 Locked research-candidate operating point (v0.2.0, 2026-08-19)

| Item | Value |
|---|---|
| Locked value | **0.075** (`LOCKED_THRESHOLD`; flag when `s3_diag ≤ 0.075`) |
| Provenance | `LOCKED_THRESHOLD_PROVENANCE` — dataset: BriTROC-1 diagnosis primary analysis set (n = 98, 20 events, prevalence 0.2041); analysis: Youden-J optimum over the prespecified grid [0.025–0.150] on out-of-fold predictions (J = 0.4564) |
| Stability | Inside the 100-fold in-fold cutpoint envelope [0.0502, 0.0798] and the bootstrap cutpoint CI [0.0467, 0.2084] |
| Operating characteristics (n = 98) | Sens 0.700 [0.481, 0.855]; Spec 0.756 [0.651, 0.838]; PPV 0.424 [0.272, 0.592]; NPV 0.908 [0.813, 0.957]; 33/98 flagged (tp 14, fp 19, fn 6) |
| Operating characteristics (n = 67) | Sens 0.889; Spec 0.776; J 0.665 |
| Scope of the lock | **Research-candidate lock only** — pins the shadow-scorer operating point and the Gate E designated decision. Not a clinical threshold; no §7 prohibition is lifted |
| Gate E designated decision | *"Prioritize s3_diag ≤ 0.075 patients for non-platinum clinical-trial screening."* (`GATE_E_DESIGNATED_DECISION`) |

### 5.2 Rejected candidate — `0.10`

| Item | Value |
|---|---|
| Candidate evaluated | **0.10** |
| Provenance | **`UNSOURCED_IN_REPOSITORY`** — supplied by the directive; not found in any file on any ref of any repo |
| Direction | `low_is_event` (flag when `s3_diag ≤ t`) |
| In-fold optimal cutpoint across 100 training folds | median **0.0646**, IQR [0.0646, 0.0798], min **0.0502**, max **0.0798**, 2.5–97.5 pctile [0.0588, 0.0798] |
| Bootstrap CI of the cutpoint | [0.0467, 0.2084] |
| Inside fold envelope? | **No** |
| Inside bootstrap CI? | Yes |
| **Verdict** | **`REJECTED_AS_LOCK`** — permanently refused by the scorer; superseded by the 0.075 lock in v0.2.0 |

Operating characteristics at 0.10:

| Set | n | prev | flagged | TP | FP | Sens (CI) | Spec (CI) | PPV (CI) | NPV | Youden J |
|---|---|---|---|---|---|---|---|---|---|---|
| 98 | 98 | 0.2041 | 40 | 15 | 25 | 0.750 [0.531, 0.888] | 0.679 [0.570, 0.773] | **0.375 [0.242, 0.530]** | 0.914 | 0.429 |
| 67 | 67 | 0.1343 | 26 | 9 | 17 | 1.000 [0.701, 1.000] | 0.707 [0.580, 0.808] | **0.346 [0.194, 0.538]** | 1.000 | 0.707 |

Best Youden J at n=98 is **t = 0.075** (J 0.456; Sens 0.700, Spec 0.756, PPV 0.424), not 0.10 (J 0.429).
Mean OOF sensitivity at the in-fold cut is 0.6525 and specificity 0.7510 — i.e. the honest out-of-fold
operating point is materially worse than the apparent one.

**PPV ≈ 0.35–0.38 means roughly two of every three flagged patients are not resistant.** Any use of this cut
must state that.

The v0.2.0 lock satisfied the change-control rule: a version bump (0.1.0 → 0.2.0), a six-field provenance
record naming the dataset and analysis that produced it, and out-of-fold operating characteristics at the
locked value. Any further substitution without all three is rejected by the scorer (adversarial test family
4, 12 tests).

---

## 6. Novelty position — stated honestly

**Is this a new biomarker? No.**

This re-derives a **published** copy-number HRD axis (Macintyre s3), on the **same cohort** that published it
(BriTROC-1), using an independent implementation. That makes it **method/implementation validation**, not
biomarker discovery. The source repository's own frozen scorer says the same thing in its self-labels
("RE-DERIVES a known HRD/platinum-sensitivity axis … method validation, not a novel biomarker";
"not_a_knockout").

**What is genuinely new in this deliverable:**
1. The measured demonstration that `s3_diag` is **not a restatement of the BRCA/HR mutation axis** in this
   cohort (§4.7) — mutation status is at chance, uncorrelated with s3, and s3 adds ΔAUROC +0.6571
   [0.4713, 0.8257] over it.
2. The proof that the receipted CV AUROC 0.8807 is `1 − AUROC(raw)` to **1.11e-16** and therefore adds no
   generalisation evidence (§4.3), together with the 8.14× interval-width correction.
3. An exact-specification reconciliation that reproduces the documented adjusted OR, Firth OR and Cox HR from
   a from-source rebuild (§4.4), which pins the covariate contract for any future re-run.
4. The falsification of the **shipped** s7 ≥ 0.25 prognosis rule as a resistance predictor (`M2b` continuous
   s7 OOF AUROC 0.4108 — below chance; §4.6), and the identification of its namespace and fail-open QC defects.
5. The first direct s3 ↔ CX framework crosswalk (NFE-1, n = 529 TCGA-OV): a decisive **negative** result
   (ρ = 0.305) that closes the CX-cohort validation route and redirects Gate C to direct Macintyre
   quantification (§4.9).

---

## 7. Prohibitions encoded in this card and in `candidate_spec_v0.2.0.json`

1. **No AUROC → "confidence"/probability conversion.** 0.8807 is not "88% confidence". It is a rank statistic
   on 9 events after axis reversal.
2. **No calibrated-probability or absolute-risk claim** while the calibration slope CI is [0.3394, 2.7345] and
   Brier skill is negative.
3. **No "durable" or "independent" biomarker language** (`CLAIM_LEDGER.md` row 9 prohibition stands).
4. **No bare quotation of 0.887 / 0.8807** — always with n=67, 9 events, reversed raw feature, selection
   warning.
5. **No threshold substitution** without version bump + provenance + OOF operating characteristics. The
   v0.2.0 lock (0.075) is a research-candidate operating point, not a clinical threshold.
6. **No care-influencing output.** Flag off ⇒ no S3-derived value reaches any response field. Flag on ⇒ every
   S3 output carries `research_only: true` and `intended_use: RANKING_ONLY`, and carries **no** `probability`,
   **no** `action_recommendation`, **no** `treatment_recommendation`.
7. **No presentation of new passing tests as a green repository** — the backend baseline is RED
   (231 failing/erroring nodes on `main`, measured; supersedes an unverifiable "226").
8. **No reconstruction of any unsourced number** (0.8807, 0.10) to make it appear supported.

---

## 8. Ethical, safety and fairness considerations

- **Fairness/subgroup:** the only subgroup analysis the data supports is BRCA-wildtype (n=79, 17 events). The
  BRCA-mutant stratum has **3 events** and is uninformative. No analysis by race, ethnicity, site,
  socioeconomic status, or treatment era is possible — those fields are not in the released tables. Differential
  performance across any of those axes is therefore **unknown**, not absent.
- **Foreseeable harm if misused:** a PPV of ~0.35 used to withhold or de-escalate platinum would harm roughly
  two of every three flagged patients. This is the concrete reason the candidate is gated to research use and
  emits no action.
- **Live safety defect this candidate does not create but must not inherit:** register rows C01/C02/C03 —
  production `prognosis.py` emits `INTENSIFY_SURVEILLANCE` from an `s7 ≥ 0.25` rule whose only evidentiary
  basis is an AUROC (0.8739, n=40, **3 events**) that this repository's own claim ledger classifies as a label
  artifact (it reverses to 0.3136 on label swap alone), reading a **COSMIC-namespace** field for a
  **Macintyre** signature, behind a **fail-open** QC gate. The accompanying patch series fails that path
  closed.

---

## 9. Maintenance, monitoring and change control

| Item | Rule |
|---|---|
| Version bump required for | any change to the feature definition, scaling denominator, direction constant, model form, threshold, or endpoint contract |
| Provenance enforcement | scorer refuses to load unless the source-data SHA256 **and** the spec version match the pinned values |
| Monitoring hooks required before any non-research use | input distribution drift on `s3_diag`; per-sample assay QC (MAPD) with a **fail-closed** gate; namespace assertion on the signature field |
| Retirement condition | if an external cohort (Gate C) fails to replicate the direction, the candidate is retired, not re-tuned |

---

## 10. Evidence gate status (summary; full program in `CLINICAL_PROOF_PROGRAM.md`)

| Gate | Status | One-line blocker |
|---|---|---|
| **A** analytical validity | **PARTIAL PASS** | run-to-run reproducibility demonstrated on published exposures; cross-site/batch/specimen reproducibility needs raw shallow-WGS BAMs + pipeline version + per-sample MAPD, and there is **no raw-CN → s3 exposure code path in any repository** (register C12) |
| **B** internal clinical validity | **CONDITIONAL PASS, ranking only** | calibration not credibly estimable at 9–20 events; BRCA-mutant subgroup has 3 events |
| **C** external retrospective | **BLOCKED** | needs an independent HGSOC cohort with diagnosis-stage Macintyre-framework CN exposures + registration platinum classification; both on-disk leads excluded (see program §C) |
| **D** prospective silent | **BLOCKED** | no registered protocol, no prospective assay/scoring pipeline |
| **E** clinical utility | **BLOCKED** | no named clinical decision the score would change |
| **F** governance | **PARTIAL** | model card / intended use / versioning / checksum-provenance delivered; IRB, clinical, quality and regulatory review not obtained |

---

## 11. Companion artifacts

`candidate_spec_v0.2.0.json` · `ENDPOINT_CONTRACT_v1.md` / `.json` · `s3_reproduction_report.md` ·
`architecture_map.md` / `.json` · `contradiction_register.csv` · `unsourced_numbers_forensic.md` ·
`denominator_reconciliation.csv` · `incremental_value.csv` · `tables/incremental_value_deltas.csv` ·
`oof_predictions.csv` · `threshold_stability.csv` · `tables/threshold_operating_characteristics.csv` ·
`tables/decision_curve_net_benefit.csv` · `tables/rebuilt_patient_master.csv` ·
`w2_reproduction.json` · `w3_analysis.json` · `w3f_reconciliation.json` ·
`figures/fig1_s3_discrimination.png` … `fig4_threshold_and_net_benefit.png` ·
`code/s3_pipeline/*.py` · `tests/test_adversarial_*.py` · `backend_patch/` · `CLINICAL_PROOF_PROGRAM.md` ·
`PROSPECTIVE_PROTOCOL_SKELETON.md` · `SHA256SUMS`
