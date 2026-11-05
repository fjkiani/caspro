# Medical / Clinical-Evidence Validation Report — Publication 06

## Multi-Pathway Composite Score for Anti-PD-1 Response Prediction

**Validation type:** Independent ML re-computation + methodology audit + clinical-utility framing
**Validation method:** 5-worker parallel reproduction from committed source data
**Date:** 2026-07-19
**Status:** RESEARCH USE ONLY (RUO)

---

## 0. What "validated" means here (and what it does not)

This report **independently reproduces** the publication's quantitative claims by re-running the statistics
from the committed source data, re-deriving effect sizes and confidence intervals, auditing the machine-learning
methodology against best practice, and assigning an **evidence tier** to each claim. Overstated or inconsistent
claims are **corrected in place** on a review branch.

**This is NOT clinical validation.** "Validated" means *independently reproduced from cited sources / re-run
from data* — never *clinically proven*. True clinical validation requires prospective, externally validated,
appropriately powered studies with pre-specified thresholds and a regulatory pathway. None of that is claimed
or manufactured here. No data were fabricated. No regulatory clearance is implied.

---

## 1. Executive summary

> **⚠ PIVOTAL FINDING — the package ships two different models as "the" result.**
> The **MANUSCRIPT_DRAFT** (the actual paper) describes a **2-pathway** model (Exhaustion + TIL),
> reporting **nested-CV AUC 0.601** (95% CI 0.460–0.742) and held-out test AUC 0.806 (n=32).
> The **README, tables, and STRATEGY** describe a **3-pathway** model (Exhaustion + TIL + T-Effector),
> reporting **apparent AUC 0.711 / bootstrap-corrected 0.699**. These are **different models with
> different headline numbers**. Our reproduction confirms the manuscript **already dropped T-Effector for
> severe multicollinearity** — we reproduced the variance-inflation factors **to the decimal** (EXHAUSTION
> **21.7**, TIL **24.2**, T-Effector 7.7; pairwise r = 0.92–0.98). The 2-pathway manuscript is therefore the
> **honest, current, multicollinearity-corrected model and supersedes** the 3-pathway artifacts. The headline
> should be the 2-pathway cross-validated estimate (~0.60), **not** the 3-pathway apparent 0.711. Encouragingly,
> the manuscript itself is already scientifically careful (it states external validation is *mandatory* and that
> clinical-utility claims are *premature*); the primary corrective need is to **reconcile/deprecate the 3-pathway
> README/tables** and trim residual overstatements.


The **core headline model reproduces cleanly** from committed data, and the neoadjuvant external-cohort metric
reproduces **exactly**. However, the package **overstates the strength and clinical readiness** of the result in
several load-bearing places, and contains **internal inconsistencies** (multiple different AUCs and improvement
percentages used as "the" result) that must be standardized. The model is best characterized as a
**discovery-stage, internal-validation-only biomarker**, not a validated clinical test.

**Reproduced from source (Tier 2 — independently re-run):**

| Quantity | Claimed | Reproduced | Verdict |
|---|---|---|---|
| Cohort size (GSE91061) | n=105 (23R / 82NR) | n=105 (23R / 82NR) | ✅ SUPPORTED |
| Apparent AUC (3-pathway) | 0.711 | 0.7142 | ✅ SUPPORTED |
| Bootstrap-corrected AUC | 0.699 | 0.6935 | ✅ SUPPORTED |
| Cross-validated AUC (5-fold) | ~0.690 (committed folds) | 0.6762 | ✅ SUPPORTED |
| PD-L1 (CD274) AUC | 0.571 | 0.5721 | ✅ SUPPORTED |
| GSE227666 neoadjuvant LOO-CV AUC | 0.822 | 0.822115 (n=29) | ✅ SUPPORTED (exact) |

**Verdict counts across 28 audited claims:** CONTEXT: 6, SUPPORTED: 8, DISCREPANT: 5, UNVERIFIABLE: 2, OVERSTATED: 7

**Top issues requiring correction (high severity):**

1. **"Beats published signatures" is overstated.** By the paper's *own* Table 3, only PD-L1 (p=0.009) and TIDE
   (p=0.007) differ significantly — and TIDE is *worse* (0.380). TMEscore (p=0.081) and IMPRES (p=0.066) are
   **not** significantly different from the model. TIDE/IMPRES/TMEscore could **not be independently reproduced**
   in this environment (no committed per-sample signature scores).
2. **EPV = 7.67 (below the conventional ≥10).** With 23 events and 3 features (2.9 for the 8-feature
   variant), the model is at **high risk of overfitting** and is **internal-validation-only**.
3. **T-Effector interpretability claim is likely a statistical artifact.** T_EFFECTOR has a *positive* univariate
   association (AUC 0.613) but a *negative* coefficient (−0.89) in the 3-pathway model — a classic
   collinearity/suppressor effect, not evidence of an "adaptive resistance" mechanism.
4. **Internal inconsistencies.** Three different AUCs (0.711 apparent, 0.699 corrected, 0.780 8-pathway training)
   and multiple improvement figures (+19% / +22% / +25%) are each used as "the" result in different files. The
   +22% (README) vs +25% (Table 2) gap is explained by mixing the **corrected** vs **apparent** AUC as the numerator.
5. **Confidence-interval inconsistency.** README reports corrected-AUC 95% CI **0.503–0.872**; Table 2 reports
   apparent-AUC 95% CI **0.569–0.837**; the two are used interchangeably. Our reproduction of the corrected-AUC CI
   gives **0.57–0.847** (method-sensitive) — the
   README's lower bound of 0.503 is more pessimistic than we could reproduce, but the interval is wide either way.
6. **Ovarian (GSE206422) claim is UNVERIFIABLE.** The raw matrix is not committed and the DCB/LCB response labels
   are flagged **"suspect"** in the repository's own script. It must be presented as hypothesis-generating, not validation.

---

## 2. Headline model — detailed reproduction (Worker 1)

- **Data:** re-run from the committed master table `scripts/data_acquisition/IO/gse91061_analysis_with_composites.csv`
  (SHA256-16 `9dc6c57776667e34`), cross-checked against the committed raw NCBI TPM matrix and series metadata.
- **Apparent AUC 0.7142** (claimed 0.711) — reproduced within tolerance (seed/scaling dependent).
- **Optimism-corrected AUC 0.6935** (claimed 0.699) via Harrell optimism bootstrap (1000 resamples) — reproduced.
- **5-fold CV mean 0.6762**; committed folds mean 0.690. Cross-validated performance is **below** the apparent 0.711, as expected.
- **Corrected-AUC 95% CI reproduced: [0.57, 0.847]** (bootstrap of the correction procedure).
- **Sensitivity/specificity are threshold-dependent.** The claimed 100% / 68.8% is one operating point; at the
  Youden-optimal threshold the trade-off differs. This should be stated as an operating-point choice, not an intrinsic property.
- **3-pathway coefficients reproduced:** TIL +0.81, EXHAUSTION +0.63, **T_EFFECTOR −0.89** (negative — see §4).

## 3. Benchmark / comparator claims (Worker 2)

- **PD-L1 (CD274) AUC 0.5721** — reproduced essentially exactly (claimed 0.571).
- **Improvement framing:** +25% = (0.711−0.571)/0.571 (apparent base); +22% = (0.699−0.572)/0.572 (corrected base).
  Both are arithmetically computable but use **different AUC bases** → the inconsistency is a framing/base-mixing
  issue. Both raw-AUC percentages are **statistically misleading** because AUC's null is 0.5, not 0; the
  over-chance improvement is ≈3× (0.211/0.071).
- **DeLong test vs PD-L1 (CD274), by model:** the model-vs-PD-L1 difference is statistically significant but
  **weaker than the claimed p<0.001**. Correctly specified on the candidate models: 2-pathway (canonical)
  p=0.0046 apparent / **p=0.012 cross-validated**; 3-pathway p=0.0069 apparent / p=0.0225 cross-validated.
  (An initial run used the shipped **8-pathway** composite, AUC 0.78, giving p=0.0019 — that model is
  overfit/superseded and inappropriate for this comparison, so it is not used.) Table 2's **p<0.001 is not
  reproduced by any correctly-specified model.** A significant difference vs the PD-L1 *transcript* is **not**
  clinical superiority over guideline PD-L1 IHC.
- **Published signatures (TIDE/IMPRES/TMEscore):** **not independently reproducible** here (no committed per-sample
  signature scores; faithful reimplementation needs the exact published gene sets + preprocessing). Taking the
  paper's own Table 3 at face value, most differences are **not statistically significant** (see §1, item 1).

## 4. ML methodology / rigor audit (Worker 3)

- **Sample adequacy:** EPV = 7.67 (3 features) / 2.9 (8 features), both **below 10** → overfitting risk; internal-validation-only.
- **Overfitting:** apparent−CV gap ≈0.04 (3-pathway) and ≈0.09 (8-pathway); the larger gap for the 8-pathway model
  confirms complexity-driven overfitting and supports the move to fewer features.
- **Feature-selection leakage:** the 3 pathways were chosen by univariate AUC on the **full** dataset (outside the
  CV loop). A leakage-free nested selection (re-pick top-3 within each fold) yields a slightly lower CV AUC — the
  reported optimism therefore **understates** true out-of-sample error.
- **T-Effector paradox:** positive univariate (AUC 0.613) but negative multivariate coefficient → **likely a
  collinearity/suppressor artifact**, undermining the biological "adaptive resistance" narrative.
- **Classification:** **discovery-stage, internal-validation-only**. Primary metric should be the cross-validated /
  optimism-corrected AUC (~0.69–0.70), not the apparent 0.711.

## 5. External / multi-cohort validation (Worker 4)

- **GSE227666 (neoadjuvant pembrolizumab, ovarian; Le Saux et al., Nat Commun 2024, DOI 10.1038/s41467-024-47000-5):**
  LOO-CV AUC **0.822115** on n=29 (NACT+P complete) — **reproduced exactly** from the committed
  offline receipt vs the locked 0.822. The paper's Fig 3B may report n=32 / AUC 0.838 on a different completeness
  filter; this is context, not a discrepancy.
- **GSE206422 (recurrent ovarian, NCT02853318, pembro+bev+cyclophosphamide; Nat Commun 2024, DOI 10.1038/s41467-024-54565-8):**
  raw matrix **not committed**; the DCB/LCB response labels are flagged **"suspect"** in the repo's own
  `gse206422_real_validation.py`. The GEO expression matrix is reachable, but labels **cannot be verified** offline.
  → **UNVERIFIABLE / discovery-only.** Recomputing an AUC on unverified labels would not constitute validation.

## 6. Claim ↔ artifact consistency (Worker 5)

- **Multiple headline AUCs** (0.711 / 0.699 / 0.780) each appear as "the" AUC across README, MANUSCRIPT_DRAFT,
  STRATEGY, FIGURES/TABLES_LEGENDS. **Standardize** to the cross-validated/corrected value as primary.
- **Improvement %:** +19 / +22 / +25 / +41 variants appear; reconcile to one number with an explicit AUC base.
- **Pathway-count residue:** 1/2/3/8-pathway language coexists; the README's own "Next Steps" already flags the
  8→3 cleanup as unfinished, and a 2-pathway title variant persists.
- **CI convention:** 0.503–0.872 (corrected) vs 0.569–0.837 (apparent) used interchangeably — pick one convention
  (the wider corrected CI is the honest headline).

---

## 7. Clinical-utility / intended-use framing (added layer)

> This layer states how the model *would* be positioned clinically and what evidence would be required to get
> there. It is descriptive, RUO, and does not assert clinical validity.

- **Intended use:** RESEARCH USE ONLY exploratory biomarker to estimate likelihood of response/benefit to anti-PD-1 monotherapy (nivolumab/pembrolizumab) from pre-treatment bulk tumor RNA-seq. Primary evidence is in metastatic melanoma; cross-cancer use (ovarian) is hypothesis-generating only.
- **Target population:** Patients with advanced/metastatic melanoma being considered for anti-PD-1 therapy and with available pre-treatment tumor RNA-seq. NOT established for other tumor types, combination IO, or treatment monitoring.
- **Comparator (standard of care):** Current clinical practice uses PD-L1 IHC (and TMB/MSI in some settings). In this dataset PD-L1 (CD274) transcript AUC ~0.57; the model's apparent AUC ~0.71 / cross-validated ~0.69. Any 'improvement over PD-L1' is modest, of borderline statistical significance, and not equivalent to clinical superiority vs guideline PD-L1 IHC.
- **Current evidence tier:** TIER 3 - internal-validation-only, single primary cohort (n=105, 23 events), feature selection performed outside CV, borderline 95% CI (lower bound ~0.50). Discovery / analytically-exploratory. NOT clinically validated.

**Roadmap to true clinical validation:**
- 1. Independent EXTERNAL validation cohort(s) with pre-specified, locked model + threshold (no re-fitting).
- 2. Pre-registered analysis plan; feature selection frozen before validation.
- 3. Calibration assessment (calibration curve, Brier score), not just discrimination (AUC).
- 4. Clinical-utility analysis: decision-curve analysis / net benefit vs PD-L1 IHC standard of care.
- 5. Adequate events-per-variable (>=10) and sample size justified by a formal power calculation.
- 6. Head-to-head vs guideline biomarkers (PD-L1 IHC, TMB, MSI) on the SAME external samples.
- 7. Ultimately a prospective/interventional biomarker-stratified study for true clinical validation + any regulatory (e.g., companion-diagnostic) pathway.

**RUO statement:** This validation increases evidentiary rigor and defensibility; it does NOT constitute clinical validation. No regulatory clearance is implied. Findings are Research Use Only.

---

## 8. Full claim ledger (severity-ranked)

Machine-readable version: `reports/medical_validation_ledger.json` (28 claims).

### 8.1 OVERSTATED (soften / add caveats)
| ID | Claim | Recomputed | Severity | Note |
|---|---|---|---|---|
| `W2-05` | 'Beats published signatures' headline framing | By the paper's OWN Table 3, only PD-L1 (p=0.009) and TIDE (p=0.007) differ significantly; TIDE is WORSE (0.380). TMEscore/IMPRES differences NOT significant. | high |  |
| `W3-02` | Sample adequate for a 3-pathway model | see detail | high | EPV=7.7 (3 feat) and 2.9 (8 feat), both < 10 => high overfitting risk; internal-validation only |
| `W3-03` | 3 pathways objectively selected (no leakage) | see detail | high | Selection done on full data outside CV; reported CV/optimism understate true out-of-sample error |
| `W3-04` | T_EFFECTOR is an interpretable predictor | see detail | high |  |
| `W3-06` | Classification of evidence | Internal-validation-only, discovery-stage biomarker (single cohort, small n, selection outside CV, borderline CI). | high |  |
| `W4-04` | Ovarian result should be presented as validated | Labels unverifiable offline + flagged suspect in-repo => must be DISCOVERY-ONLY / hypothesis-generating. | high |  |
| `W3-05` | Primary metric should be out-of-sample | see detail | medium | Headline should lead with CV/optimism-corrected (~0.69-0.70), not apparent 0.711 |

### 8.2 DISCREPANT / inconsistent (standardize)
| ID | Claim | Recomputed | Severity | Note |
|---|---|---|---|---|
| `W2-02` | Improvement vs PD-L1 = +25% (Table2) / +22% (README) [INCONSISTENT] | see detail | high | +25%=0.140/0.571 raw-AUC ratio reproduces; +22% does not reconcile; raw-AUC % is misleading (null=0.5) |
| `W5-01` | Consistent headline AUC across package | see detail | high | 0.711 (apparent), 0.699 (bootstrap-corrected), 0.780 (8-pathway training) all appear as 'the' AUC in different places -> reader confusion; must standardize to C |
| `W5-02` | Improvement vs PD-L1 stated consistently | see detail | high | +22% and +25% both appear -> internal inconsistency (W2 confirms +25%=0.140/0.571; +22% unreconciled). |
| `W5-05` | CI reported consistently | see detail | high | 0.503-0.872 (bootstrap-corrected, README) vs 0.569-0.837 (apparent, Table2) used interchangeably; the wider bootstrap CI (lower bound ~0.50) is the honest one. |
| `W5-03` | Model consistently described as 3-pathway | see detail | medium | README 'Next Steps' itself says to correct all 8->3 pathway claims; 2-pathway title variant also exists. Residual 8-pathway/2-pathway language remains. |

### 8.3 UNVERIFIABLE (mark discovery-only)
| ID | Claim | Recomputed | Severity | Note |
|---|---|---|---|---|
| `W2-04` | TIDE/IMPRES/TMEscore AUCs (0.380/0.587/0.619) + p (0.007/0.066/0.081) | NOT independently reproducible here (no committed per-sample signature scores; faithful reimplementation needs exact published gene sets + preprocessing). | high | Table3 p-values: TMEscore 0.081 and IMPRES 0.066 are >0.05 => 'beats signatures' is NUMERICAL, not statistically significant, even taking the paper's own number |
| `W4-03` | GSE206422 ovarian validation supports cross-cancer generalization | see detail | high | Expression matrix reachable on GEO, BUT the DCB/LCB response labels the ovarian claim depends on are flagged SUSPECT in the repo's own script and cannot be veri |

### 8.4 SUPPORTED (reproduced)
| ID | Claim | Recomputed | Severity | Note |
|---|---|---|---|---|
| `W1-08` | 3-pathway coefficients: TIL +0.807, EXH +0.633, TEFF -0.893 (T_EFFECTOR NEGATIVE) | see detail | high | T_EFFECTOR negative coef despite positive univariate AUC (0.613) => suppressor/collinearity; provenance concern |
| `W1-02` | Apparent AUC = 0.711 | 0.7142 | medium | seed/scaling-dependent; tol 0.03 |
| `W1-03` | Bootstrap-corrected AUC = 0.699 | 0.6935 | medium |  |
| `W3-01` | Overfitting = 10.4% (0.780 -> 0.699) | see detail | medium |  |
| `W1-01` | n=105 (23 responders / 82 non-responders) | n=105 (23R/82NR) | info |  |
| `W1-05` | CV folds mean (committed) = 0.690 | see detail | info | committed folds mean=0.690; CV < apparent as expected |
| `W2-01` | PD-L1 (CD274) AUC = 0.571 | 0.5721 | info |  |
| `W4-01` | GSE227666 LOO-CV AUC = 0.822 (n=29 NACT+P complete) | see detail | info | Fully reproduced offline from committed receipt. |

### 8.5 CONTEXT / threshold-dependent
| ID | Claim | Recomputed | Severity | Note |
|---|---|---|---|---|
| `W1-04` | Training/apparent AUC = 0.780 (from benchmark_comparison.csv) | 0.7142 | high | 0.780 was the 8-pathway LR; 3-pathway apparent differs. Flag as pathway-count ambiguity. |
| `W1-06` | 95% CI lower bound near/below 0.50 (chance) | see detail | high | If CI lower<=0.5, model not clearly distinguishable from chance |
| `W2-03` | Our model significantly beats PD-L1 | see detail | high | DeLong p reported; Table2 asserts <0.001 which is likely optimistic |
| `W1-07` | Sensitivity 100% / Specificity 68.8% | see detail | medium |  |
| `W5-04` | Sample size stated consistently | see detail | medium | Confirm 105 (training) vs 51 (bootstrap n) vs 29/32 (GSE227666) are each used in the correct context and not conflated. |
| `W4-02` | Paper reports n=32 / AUC 0.838 (Fig 3B) | Different completeness filter; not the locked receipt metric. Documented, not a discrepancy. | low |  |

---

## 9. Data provenance & reproducibility

| Cohort | Data status | How validated |
|---|---|---|
| GSE91061 (training) | Committed intermediates + raw NCBI TPM in `scripts/data_acquisition/IO/` | Re-run from source |
| GSE227666 (neoadjuvant) | Self-contained receipt (`receipts/gse227666_neopembrov_loo_cv/`) | `verify_loo_auc.py` reproduced offline (exact) |
| GSE206422 (ovarian) | Raw not committed; labels flagged suspect in-repo | UNVERIFIABLE offline |

*Disclaimer:* Validation = independent reproduction from cited sources / re-run from committed data. It is NOT clinical validation. True clinical validation requires prospective, externally validated, appropriately powered studies with pre-specified thresholds. Everything RUO; no regulatory clearance implied; no data fabricated.
