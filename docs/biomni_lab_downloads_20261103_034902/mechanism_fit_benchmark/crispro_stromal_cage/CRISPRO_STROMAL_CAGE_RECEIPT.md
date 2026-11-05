# CRISPRO STROMAL CAGE / IMMUNE ACCESS — DISCOVERY RECEIPT

**Experiment:** Train a fresh Elastic Net logistic model on GSE30161 restricted to the Stromal Cage / Immune Access gene panel, freeze the coefficients, and fire the frozen model at the independent GSE63885 harness.
**Date:** 2026-07-18
**Status of this model:** `FROZEN_DISCOVERY_ONLY`.
**Status of this document:** This builds and characterizes a **new mechanism-scoped signature**. It is **NOT** the CrisPRO / `sl_agent` engine, and it does **not** by itself promote the Objective-B outcome engine to RELEASED.

---

## 0. Headline result

| Panel | Endpoint (GSE63885) | n (pos/neg) | AUROC | DeLong 95% CI | p vs 0.5 | Verdict vs pre-registered bar |
|-------|---------------------|-------------|-------|---------------|----------|-------------------------------|
| **Core-13 (Stromal Cage)** | **platinum-sensitivity** | 75 (41/34) | **0.638** | **0.513 – 0.764** | **0.031** | **INCONCLUSIVE** |
| Core-13 | chemoresponse | 75 (65/10) | 0.509 | 0.355 – 0.663 | 0.907 | NOT_SUPPORTED |
| Full-28 (+extension) | platinum-sensitivity | 75 (41/34) | 0.598 | 0.468 – 0.729 | 0.139 | NOT_SUPPORTED |
| Full-28 | chemoresponse | 75 (65/10) | 0.528 | 0.344 – 0.711 | 0.767 | NOT_SUPPORTED |

**Plain reading:** The Stromal Cage mechanism carries a **weak but better-than-chance** platinum-sensitivity signal that transfers across cohorts (Core-13, AUROC 0.638, CI lower clears 0.5, p=0.031) — **but it does not reach the 0.70 release bar**. Chemoresponse is at chance. The frozen model is **INCONCLUSIVE at best; not release-supportive.** Two honest sub-findings:
1. **Parsimony wins:** the 2-gene core (CXCL12, POSTN) transfers *better* out-of-distribution than the full 28-gene panel (0.638 vs 0.598) — the extension genes overfit training noise, exactly as the nested-CV instability predicted.
2. **Mechanistic direction is coherent:** the only surviving coefficients are stromal/desmoplasia markers with **negative** weights — higher stromal-cage expression → lower predicted platinum sensitivity. Biologically sensible, statistically weak.

---

## 1. Why the target had to change (a hard data finding)

The user's request said "predicting chemoresponse," trained on GSE30161. **This is mathematically impossible on GSE30161:**

- GSE30161 chemoresponse = **54 responders (32 CR + 22 PR) vs 1 non-responder (1 PD)** (+3 unknown). A classifier cannot learn the resistant class from a single patient. (This is the same degeneracy that made GSE30161 chemoresponse uninterpretable in the prior external-validation run.)

**Resolution (locked, discovery-only):** the training target was changed to **PFI-derived platinum-sensitivity** on GSE30161 (PFI ≥ 180 d = sensitive; PFI < 180 d = resistant; published 180-day cutoff). Balance: **48 sensitive / 10 resistant** — trainable (10 minority events), but imbalanced and **low-EPV (10 events / up to 28 features → EPV ≈ 0.36)**. This is the binding fragility caveat.

**Censoring disclosure (label definition):** the resistant class uses the PFI<180 d cutoff without conditioning on the relapse-event flag. Auditing the flag directly: of the 10 patients with PFI < 180 d, **9 have a confirmed relapse event (`relapse_event`=1)** and **1 is early-censored** (`relapse_event`≠1). A strictly censoring-aware label (resistant only if PFI<180 **and** confirmed relapse) would therefore use **9 resistant / 48 sensitive**, differing from the label used by **exactly one patient (1/58, 1.7%)**. This is a minor label-definition sensitivity on an already small minority class, not a class collapse; it does not change the discovery-only status or the low-EPV caveat, and the headline finding rests on the independent-cohort AUROC regardless.

- GSE63885 was scored on **both** endpoints: platinum-sensitivity (41/34 — matched label definition, primary) and chemoresponse (65/10 — independent clinical label, secondary cross-check).

**Consequence for interpretation:** because the training label is derived from survival (PFI), this is a **discovery signature, not a leakage-safe clinical-label validation**. It answers "does the Stromal Cage mechanism carry transferable platinum-response signal?" — not "is this a deployable clinical classifier."

---

## 2. Methods (frozen; exact)

### 2.1 Feature panel (pre-registered, locked before training)
- **Core-13 (Stromal Cage / Immune Access):** CXCL12, CXCR4, FAP, ACTA2, POSTN, CXCL9, CXCL10, CXCL11, CXCR3, CCL2, CCL5, CCL7, CCR2.
- **Extension-15 (stromal/EMT + T-cell access):** TGFB1, PDGFRB, COL1A1, VIM, TWIST1, ZEB1, PDCD1, CD8A, GZMB, IFNG, CD274, LGALS1, THBS1, SPARC, TIMP1.
- Both a **Core-13** model and a **Full-28** model were trained and reported so the marginal value of the extension is visible.
- **All 28 genes have GPL570 probes in both cohorts — 0 dropped.** Both cohorts are the same platform (Affymetrix HG-U133 Plus 2.0), giving clean cross-cohort feature transfer.

### 2.2 Expression processing
- Source: GEO series matrices (GPL570), 54,675 probes each. Both confirmed log2 (GSE30161 median 3.51; GSE63885 median 6.89).
- **Probe→gene collapse (pre-registered):** most highly expressed probe per gene (max mean across samples); multi-gene probes counted for each listed gene. **The selection *rule* is identical for both cohorts, but it was run independently within each cohort — so the winning probe is not guaranteed to be the same probe in both.** Audit (`crispro_probe_concordance.csv`): the same probe was selected in both cohorts for **22/28** panel genes; for **6/28** (CD274, CXCL11, CXCR3, TGFB1, THBS1, ZEB1) a different probe won in GSE63885 than in GSE30161. This means a frozen coefficient trained on one probe was, for those genes, applied to a *different* probe at test time — a genuine transfer imperfection.
  - **Impact — the winning Core-13 model is probe-invariant.** Elastic net zeroed all Core-13 genes except **CXCL12 and POSTN, and both use the SAME probe in both cohorts**, so the headline Core-13 result is unaffected. As a sensitivity check the whole live-fire was rerun with **probes locked from the training cohort** (GSE30161-selected probe applied to both cohorts): Core-13 platinum-sensitivity AUROC = **0.6385 (bit-identical)**; Full-28 = 0.5897 vs 0.5983 originally (Δ = −0.0086); chemoresponse cells move by ≤ 0.0015. **Every verdict is unchanged.** Table: `crispro_probe_lock_sensitivity.csv`.

### 2.3 Model, training, and freezing
- **Model:** Elastic Net logistic regression (`penalty='elasticnet'`, `solver='saga'`, `class_weight='balanced'`, `max_iter=5000`, `random_state=42`).
- **Honest discovery estimate (nested CV):** outer 5-fold stratified (seed 42) for the performance estimate; inner 5-fold stratified `GridSearchCV` over `C ∈ {0.01…10}`, `l1_ratio ∈ {0.1…0.9}` for tuning. **Feature scaling (z-score) fit inside each training fold only.** Reported metric = **mean outer-fold AUC** (never in-sample).
- **Freeze:** refit on all GSE30161 training data at the inner-CV-selected hyperparameters; exported **coefficients, intercept, per-gene scaler mean/scale, and the frozen operating threshold** to `crispro_stromal_cage_v1_coefficients.{json,csv}`.
- **Frozen operating threshold** = Youden's J on the training ROC, locked with the model (not re-tuned on the test cohort).

### 2.4 Leakage guard (satisfied)
- Features are **molecular only** (expression). No survival/clinical variable enters the feature matrix.
- The z-scaler and hyperparameter selection are fit only within training folds / on the training cohort; **the GSE63885 test cohort is never seen during any fit**.
- Live-fire predictions are produced by applying the frozen scaler + frozen coefficients to GSE63885 — no refitting, no re-scaling on test.

### 2.5 Evaluation
- AUROC (threshold-free primary) + **DeLong** normal-approx 95% CI + **2000× stratified bootstrap** CI (seed 42) + p vs 0.5.
- Operating metrics (sens/spec/PPV/NPV) at the frozen threshold, secondary.
- **Pre-registered release bar (unchanged):** RELEASE-SUPPORTIVE = AUROC ≥ 0.70 AND CI lower > 0.5; INCONCLUSIVE = 0.60 ≤ AUROC < 0.70 or CI crosses 0.5; NOT_SUPPORTED = AUROC < 0.60.

---

## 3. Training-cohort behaviour (nested CV)

`crispro_nested_cv_training_metrics.csv`.

| Panel | Outer-fold AUCs | Mean ± SD (honest discovery estimate) | In-sample AUC (NOT primary) |
|-------|-----------------|----------------------------------------|-----------------------------|
| Core-13 | 0.50, 0.55, 0.80, 0.61, 0.50 | **0.592 ± 0.112** | 0.710 |
| Full-28 | 0.25, 0.60, 0.65, 0.78, 0.39 | **0.533 ± 0.189** | 0.827 |

The wide fold-to-fold spread (Core 0.50–0.80; Full 0.25–0.78) is the expected signature of **low EPV (10 events)** — the training cohort itself barely separates on this panel, and the in-sample AUCs (0.71/0.83) are optimistic artifacts, correctly **not** used as the result.

---

## 4. Frozen coefficients (the weapon, locked)

`crispro_stromal_cage_v1_coefficients.{json,csv}`. Elastic-net shrinkage drove most genes to zero:

**Core-13 (C=0.1, l1_ratio=0.7) → 2 non-zero genes:**
- CXCL12 = **−0.150**, POSTN = **−0.104** (both stromal-cage/desmoplasia; negative → more stroma, less platinum sensitivity).

**Full-28 (C=0.03, l1_ratio=0.1) → 12 non-zero genes:** dominated by the same stromal/matrix axis — CXCL12, POSTN, COL1A1, THBS1, SPARC (all negative) — plus immune-access CXCL11/CXCR3 (negative) and CCL5 (positive).

**Independent-reload reproducibility: CONFIRMED (measured).** Rebuilding predictions from the JSON artifact alone (frozen coefficients + scaler + intercept, applied by hand) is **exactly deterministic** — recomputing twice from the artifact gives max|Δ| = 0.00e+00. The full-precision recompute vs the saved per-patient CSV differs by max|Δ| = **4.91e-05**, which is entirely attributable to the CSV rounding probabilities to 4 decimals. That rounding **changes 0 of 75 calls** at the frozen threshold and changes the AUROC by **0.00e+00** (0.638451 either way). (An earlier draft of this line quoted "< 1e-15"; that figure was not a measured comparison and is corrected here to the measured 4.91e-05 CSV-rounding delta / exact 0.00e+00 determinism.)

---

## 5. Live fire — cross-cohort transfer and its caveat

`crispro_live_fire_metrics.csv`, `crispro_live_fire_predictions_gse63885.csv`, figure `crispro_live_fire_roc.png/svg`.

- **Core-13 platinum-sensitivity AUROC = 0.638 (CI 0.513–0.764, p=0.031)** is the model's best out-of-distribution result: a real, better-than-chance signal that **does not clear 0.70** → **INCONCLUSIVE**.
- Everything else is at or near chance → NOT_SUPPORTED.

**Threshold-transfer caveat (important).** At the frozen Youden threshold the model calls almost everyone "resistant" on GSE63885 (sensitivity 0.00–0.07, specificity 1.00). Cause: a large **cross-cohort location shift** on the active genes —

| Gene | GSE30161 (train) mean (SD) | GSE63885 (test) mean (SD) |
|------|-----------------------------|----------------------------|
| CXCL12 | 4.38 (0.80) | 8.95 (1.53) |
| POSTN | 3.97 (1.73) | 9.09 (2.35) |

a ~4.5 log2-unit shift (different labs / normalization). The frozen z-scaler corrects scale but not this residual distributional difference, so the **operating point does not transfer** — while **AUROC (rank-based) is unaffected** and remains the honest discrimination metric. A deployable version would need cross-cohort calibration (e.g., quantile normalization to a reference, or per-cohort recentering), which is out of scope for a frozen discovery run.

---

## 6. Verdict

- **The Stromal Cage / Immune Access mechanism produces a weak, sub-threshold, but non-random platinum-sensitivity signal** (Core-13 AUROC 0.638) that transfers to an independent cohort with the correct mechanistic sign. It is **INCONCLUSIVE against the pre-registered 0.70 bar — not release-supportive.**
- **This does not change the Objective-B outcome engine's runtime status.** It remains **SHADOW_ONLY / NOT RELEASED.** This frozen discovery model is a *new external-style signature built here*, is **discovery-only** (survival-derived training label, EPV ≈ 0.36, 10 minority events), and is **not** the CrisPRO / `sl_agent` engine. A release would require a model clearing ≥ 0.70 with CI lower > 0.5 on the harness under the leakage-safe protocol — this run does not meet it.
- **What was learned (worth keeping):** (a) the stromal-cage axis (CXCL12 + POSTN) is the transferable part of the signal; the wider panel adds noise. (b) The signal lives in platinum-sensitivity, not chemoresponse. (c) Any future deployment must solve cross-cohort calibration, not just discrimination.

---

## 7. Deliverables and SHA-256 manifest

All files in `mechanism_fit_benchmark/crispro_stromal_cage/`.

| File | SHA-256 |
|------|---------|
| stromal_cage_expression_gse30161.csv | `6f0d5577c50c0bb0b8d415c23ad9e4f4893f58a8d44ce6cdbec1b1e55a1430b0` |
| stromal_cage_expression_gse63885.csv | `9bfba17b65c74e0a0ca6fd396dffb6de6c036aad517c52ec12b43a8ec66904b3` |
| train_labels_gse30161.csv | `cf84e1b590bf0605602a2f1e71e860b32d0397d10322f97ab23e7e568ed0e189` |
| crispro_stromal_cage_v1_coefficients.json | `652b8a1a2cdf9e01d8c2ee7cc43542c3ef905ae8d5b13980d403350e8c3d408f` |
| crispro_stromal_cage_v1_coefficients.csv | `f284baf60119b453ccc1350f1ae8a3fabeff266817687d49df49d0257a0f8522` |
| crispro_nested_cv_training_metrics.csv | `4bb1683f27f9e8d5689adc3eca1f5cd75e1924fb3db829602ee89162ecd46637` |
| crispro_live_fire_predictions_gse63885.csv | `125e51980e7b1218a938b35247fb3dfa3a8b3dc72da21441a38e4ec0933aa91b` |
| crispro_live_fire_metrics.csv | `c869757a60fb086d250208f55383a42e254c32efe1709c77e771c267e52ea4af` |
| crispro_live_fire_roc.png | `ee3f6c87cc299db631654f9480626dd50ad1d61519d543dff1699082e456e885` |
| crispro_live_fire_roc.svg | `ef018d424e6ea3b08e9ae2e98dbbb6fa94fd3b24105fea61904f984ff7f948c3` |

*(This receipt is excluded from its own manifest.)*

---

## 8. One-paragraph plain-English summary

We built a brand-new model from the Stromal Cage / Immune Access genes, trained it on one ovarian cohort (GSE30161), froze its weights, and fired it at a completely separate cohort (GSE63885) — a legitimate out-of-distribution test with no circularity. Because the training cohort had only one chemo-resistant patient, we trained on a survival-derived platinum-sensitivity label instead (making this a discovery experiment, not a clinical validation). The frozen model shrank down to two stromal genes — CXCL12 and POSTN — and on the independent cohort it scored AUROC 0.638 for platinum sensitivity: a real, better-than-chance signal in the biologically correct direction (more stroma → less platinum sensitivity), but below the 0.70 release bar, so INCONCLUSIVE. The two-gene core actually beat the full 28-gene panel, meaning the wider net mostly added noise. The engine's status is unchanged (SHADOW_ONLY / NOT RELEASED): this is a promising-but-weak discovery signature, it is not the CrisPRO engine, and it does not clear the bar. The honest takeaway is that the Stromal Cage axis carries transferable platinum-response signal worth pursuing, but this frozen model is not yet a releasable classifier — and any deployment would first have to fix the large cross-cohort normalization shift that breaks its operating threshold.
