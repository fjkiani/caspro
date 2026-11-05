# Forensic record: the two numbers the directive supplied

Two figures entered this program from outside the evidence base: **AUROC 0.8807** and the
**0.10** decision threshold. Both were traced by an all-refs sweep of 16 clones across 4 remotes.
One was found and fully explained. The other does not exist anywhere.

---

## 1. Correction of a prior finding in this session

**Retracted.** `PLAN.md` rows **F2** and **F7** state that AUROC 0.8807 "exists nowhere" and that
`s3_diag_cv_validation.json` "does not exist on disk". **Both statements are wrong**, were retracted
publicly during this session, and are superseded by this document.

The file is at:

```
/workspace/Brenus/clinical_validation/trackA/s3_diag_cv_validation.json
```

present on `feature/zeta-core-v4-universal-kinetics`, on `main`, and on 20+ `origin/*` refs. The earlier
sweep missed it because it searched `/mnt/results` and the backend clone but not the `Brenus`
`clinical_validation/trackA/` tree. The plan was built on a false negative; the plan's *conclusion* about
what the number means did not survive contact with the file either — see §2.3.

---

## 2. AUROC 0.8807 — FOUND, and it is arithmetic

### 2.1 What the receipt says

`s3_diag_cv_validation.json`, verbatim values:

| Field | Value |
|---|---|
| `n` / resistant / sensitive | 67 / **9** / 58 (prevalence 0.13433, `EPV_univariate` 9) |
| `cv_auroc_mean_for_resistance` | **0.8807231800766283** |
| `cv_auroc_sd` | 0.00454242948722634 |
| `cv_auroc_pctile_2p5_97p5` | [0.871647509578544, 0.8889367816091954] |
| `raw_univariate_auroc` | **0.11302681992337164** |
| `loo_auroc` | 0.871647509578544 |
| scheme | RepeatedStratifiedKFold 5-fold × 200 repeats, class-balanced logistic, scaler fit in-fold (no leakage) |
| `permutation_null` | n_perm 5000, `empirical_p_two_sided` 0.0003999200159968006, null mean 0.47137 |
| `feature_selection_leakage_check` | select_then_cv 0.8802681992337165 == select_in_fold 0.8802681992337165 |
| `univariate_test` | Mann-Whitney p 0.00021040055521920662; median s3 resistant 0.0243531972097147 vs sensitive 0.1765128612447275 |
| `calibration` | `brier_oof` 0.15286348564965177 vs `brier_prevalence_only` 0.11628425038984185 — "Miscalibrated (over-predicts risk) at n=67; discrimination is reliable, absolute risk is NOT." |
| `grade` | "INTERNALLY CROSS-VALIDATED, DISCOVERY-GRADE. NOT clinically proven." |

The receipt is honest about its own limits. The problem is not honesty; it is what the number *is*.

### 2.2 Reproduction

| Quantity | Documented | Reproduced here |
|---|---|---|
| raw AUROC, s3 vs resistance, n=67 | 0.11302681992337164 | **0.113027** |
| 1 − raw | — | **0.886973** |
| CV AUROC mean (5×200, seed 42) | 0.880723 (sd 0.004542) | **0.881710** (sd 0.005186) |
| LOO AUROC | 0.871647509578544 | **0.871648** (exact) |

### 2.3 The finding: cross-validation contributes no information here

Within each of **1,000** test folds, the fitted model's AUROC equals `1 − AUROC(raw s3)` to
**1.11 × 10⁻¹⁶**. A class-balanced logistic on a single standardised feature is a monotone transform of
that feature; AUROC is rank-based and therefore invariant to it. The "cross-validated model" and "the raw
feature, reversed" are the same ranking.

So `0.8807` is not a model result. It is `1 − 0.1130` at n=67 / 9 events, plus resampling noise of order
10⁻³. The correct way to say it: **the s3 exposure, read low-to-high as a resistance axis, ranks
patients with AUROC 0.887 in the covariate-complete subset.** There is no fitted model performance to
report because there is nothing fitted that changes the ranking.

### 2.4 Two further problems with quoting 0.8807

**(a) The published interval is not a confidence interval.** `cv_auroc_pctile_2p5_97p5` = [0.8716, 0.8908]
is the dispersion of *repeated resampling of the same 67 patients*. Sampling uncertainty for the
population AUROC is the stratified bootstrap CI **[0.8017, 0.9579]**.

| Interval | Width |
|---|---|
| published fold band | 0.0192 |
| stratified bootstrap CI | **0.1562** |

The honest interval is **8.14×** wider. Reporting fold dispersion in the position a CI occupies makes a
9-event result look like a locked one. (`architecture_map.md` §3; figure `fig2_uncertainty_and_calibration.png` panel A.)

**(b) The bigger number comes from the smaller, outcome-selected denominator.** 0.8807 lives at n=67 /
9 events. The primary documented result lives at n=98 / 20 events: raw AUROC **0.2715**
(CI 0.1532–0.4058), protective **0.7285** (CI 0.5942–0.8468). The restriction from 98 to 67 is **not
random with respect to the outcome** — prevalence 0.1343 inside vs **0.3548** outside, Fisher exact
OR 0.2821, **p = 0.0162**. Selecting on covariate completeness removed resistant patients preferentially,
and the AUROC rose from 0.7285 to 0.8870 as a result.

**Reporting rule adopted:** 0.8807 (equivalently 0.887) is never quoted without `n=67, 9 events`, the
statement that it is the reversed raw feature, and the selection warning. The headline figure for this
biomarker is **0.7285 at n=98 / 20 events**.

### 2.5 Numbers that are *not* the source of 0.8807, checked and excluded

- **0.8739** — `roc_auc_score(y_rclass, s7_rel)`, n=40, **3 events**: s7 at relapse against a RECIST-derived
  label. Reverses to **0.3136** on the identical 40-patient feature matrix when only the outcome label is
  swapped to registration platinum status. Different signature, different timepoint, different label.
- **0.8870** — the frozen production scorer's AUROC on the same n=67. Same ranking, different scaling.
- The 3,081 raw grep lines containing the literal `0.8807` across 223 unique `repo|path` entries are
  almost entirely float-substring noise (GEO expression matrices, TCGA CSVs, one SVG path coordinate).
  Only the `trackA` receipt is a real occurrence.

---

## 3. The 0.10 threshold — NOT FOUND, and rejected as a lock

**Sweep result: zero hits.** No file on any ref of any clone contains a rule of the form
`s3_diag < 0.10`, `s3 <= 0.1`, or any equivalent. It is not a repository constant. Status:
**`UNSOURCED_IN_REPOSITORY`**.

Because the directive named it, it was evaluated as a *candidate* rather than dismissed.

### 3.1 What 0.10 does, if used

| Set | n flagged | TP | FP | Sens | Spec | PPV (95% CI) | NPV | Youden J |
|---|---|---|---|---|---|---|---|---|
| n=98, 20 events | 40 | 15 | 25 | 0.750 | 0.679 | **0.375 (0.242–0.530)** | 0.914 | 0.429 |
| n=67, 9 events | 26 | 9 | 17 | 1.000 | 0.707 | **0.346 (0.194–0.538)** | 1.000 | 0.707 |

### 3.2 Where the data actually puts the cutpoint

Fold-optimal (Youden) cutpoints across **100** training folds at n=98:

| Statistic | Value |
|---|---|
| median | **0.0646** |
| IQR | 0.0646 – 0.0798 |
| min / max | 0.0502 / 0.0798 |
| 2.5–97.5 percentile across folds | **0.0588 – 0.0798** |
| bootstrap CI of the cutpoint | 0.0467 – 0.2084 |
| mean OOF sensitivity at the in-fold cut | 0.6525 |
| mean OOF specificity at the in-fold cut | 0.7510 |

**0.10 is outside the fold envelope** (the data never once selected it in 100 folds) **but inside the
bootstrap CI** — the cutpoint is simply not well determined at 20 events. Best J at n=98 is at 0.075
(J = 0.456), marginally above 0.10's 0.429.

**Verdict: 0.10 is rejected as a locked threshold and retained only as a labelled candidate.** Any future
lock requires a version bump plus a provenance record, enforced by the adversarial test suite
(`tests/test_adversarial_threshold.py`). See `fig4_threshold_and_net_benefit.png` panel A.

---

## 4. One number that remains unsourced elsewhere in the evidence base

`CLAIM_LEDGER.md` row 16 records ρ = −0.711 as
**`NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`**. Recomputation gives ρ = −0.2091, p = 0.5372,
Fisher-z CI [−0.7287, 0.4633], permutation p 0.5388 (20,000). This audit does not lift that
classification and does not use ρ = −0.711 anywhere.
