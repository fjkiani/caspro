# Zeta-Core v4.0 — Audit-Correction Delivery Addendum

**Status:** `LOCAL_CHECKPOINT_NOT_RELEASE_READY`
**Capability released:** `RELATIVE_PROGNOSTIC_INDEX_ONLY`
**Absolute-risk calibration:** none exists and none is activated.
**Treatment-predictive field:** none exists and none is activated.
**Deployment claim:** NONE. Code is on a feature branch only; nothing is merged to main and no environment is declared deployed.

This addendum documents the eleven-item completion directive. It **supersedes the `Tests` and
`Regression control` sections of `DELIVERY_REPORT.md`**, which were written while pytest
collection still aborted and therefore described only a partial node universe. Those sections
are retained unmodified for audit continuity and are not authoritative.

---

## 1. Six-way evidence-class separation (item 9)

Every regenerated artifact carries this block verbatim.

| # | Evidence class | Status | What it is not |
|---|---|---|---|
| 1 | `continuous_ruo_prognostic_index` | **RELEASED_FOR_RESEARCH_USE_ONLY** | It is not an absolute survival probability and not a treatment benefit estimate. |
| 2 | `suppressed_unstable_band` | **SUPPRESSED_BY_PRESPECIFIED_GATE_FAILURE** | Suppression is not a statement that the continuous index failed; the continuous index is released and the categorical layer is not. |
| 3 | `coefficient_only_uncertainty` | **RELEASED_WITH_EXPLICIT_SCOPE_LABEL** | It is not a patient-level predictive interval and contains no component for the patient's own measurement error. |
| 4 | `patient_rate_uncertainty` | **RELEASED_WHEN_ESTIMABLE_ELSE_NULL** | It is not coefficient uncertainty and the two are never combined into a single interval. |
| 5 | `absolute_risk_transport_evidence` | **EVALUATED_AND_FAILED_NOTHING_ACTIVATED** | A passing result would still have activated nothing. The failing result is evidence about transportability, not a released output. |
| 6 | `treatment_prediction` | **STRUCTURALLY_UNAVAILABLE** | Absence is structural, not a threshold that could be crossed by supplying more data. Every released prostate cohort is a comparator or control arm, so the comparison is not identified. |

---

## 2. Release contract decision (item 2)

**Decision: `CONTRACT_A_RUO_SCIENTIFIC_WITHHOLDING`.**
Rejected: `CONTRACT_B_STRICT_INDEX_WITHHOLDING`.

`k_day` is released. `reference_percentile` is released when the decline sign is stable.
`percentile_uncertainty_interval` is released when estimable. The categorical band is null on
every path. Absolute probability and treatment fields are null on every path.

**This is a disclosed reversal.** Contract A reclassifies the week-15 landmark from a numeric refusal into a scope annotation. This reverses part of the earlier D8 receipt-redaction behaviour. The reason member OUTSIDE_VALIDATED_LANDMARK_SCOPE is retired rather than deleted so the reversal stays visible in the vocabulary.

Reason vocabulary: 14 total,
13 active,
retired = `OUTSIDE_VALIDATED_LANDMARK_SCOPE`.

---

## 3. Three-observation rule (item 3)

Rule `LOO_SIGN_ESTABLISHMENT`, frozen before any evaluation on VENICE.
At exactly 3 distinct observation days
the fit-precision status is `INSUFFICIENT_FOR_UNCERTAINTY` and every
uncertainty interval is null. The research-use point estimate is released **only** if the decline
sign is independently established by the leave-one-out rule; otherwise the response fails closed
with `DECLINE_SIGN_NOT_INDEPENDENTLY_ESTABLISHED`.

The centred non-monotone three-point case changes k_day by 1.735e-18 relative to the monotone case, so the ordinary least squares point estimate alone cannot detect it. That is the quantitative reason the sign test is a separate leave-one-out rule rather than a property of the fit.

---

## 4. Collection INTERNALERROR (item 4)

**Root cause:** `the live-Cohere-key test module` —
A bare module-level sys.exit(1) executed at import time when COHERE_API_KEY was absent. The resulting SystemExit during collection escalates to INTERNALERROR and aborts the entire session.

**Classification:** TEST_HARNESS_DEFECT, PRE_EXISTING.
Reproduced identically on the pristine base.
**Fix:** Replaced the module-level sys.exit(1) with pytest.skip(..., allow_module_level=True). No production guard was weakened and no production code was changed.

Collection-error module classification:
`{"ENVIRONMENT_MISMATCH": 1, "NEW_REGRESSION": 0, "PRE_EXISTING": 7, "TEST_HARNESS_DEFECT_fixed": 1}`

---

## 5. Test matrix (item 5)

| Gate | Verdict |
|---|---|
| `collection_completes` | **PASS** |
| `focused_suite_all_pass` | **PASS** |
| `no_lost_coverage` | **PASS** |
| `secret_pii_scan_clean` | **PASS** |
| `zero_new_errors` | **PASS** |
| `zero_new_failures` | **PASS** |

**Baseline-versus-branch regression comparison:** the FAILED and ERROR node-id sets are
byte-identical across the pristine base, the branch start commit and the working tree.
`NEW_REGRESSION = 0` for both categories.
Verdict: `ZERO_NEW_FAILURES_AND_ZERO_NEW_ERRORS`.

**Coverage:** None nodes removed,
None mapped to replacements,
None lost →
`NO_LOST_COVERAGE`.

**Secret and patient-identifier scan:** `CLEAN` (scanner v2,
positive control passed = None).
Scanner v1 returned BLOCKED from its own defects, not from repository content: a digit-run pattern matched substrings of decimals and quoted column NAMES were classified as identifier values. v2 adds lookaround anchoring, a schema-reference class, a positive control and a real-value literal scan.

**Release-wide improvement:** NOT CLAIMED. The failing and erroring node sets are byte-identical across the pristine base, the branch start commit and the working tree. The only release-wide change is that complete collection now succeeds.

---

## 6. D10 — absolute-risk transport (item 6)

**Verdict: `FAIL`** — 8 of
10 prespecified gate evaluations failed.

The prespecified support criterion was evaluated on the derivation cohort blind to results.
104 weeks did **not** meet it and was correctly excluded from gating. Calibration slope and
observed-to-expected failed the prespecified gate at every gate-eligible horizon in both
transport variants; the integrated Brier comparison against the age-plus-performance-status
reference passed.

| variant | horizon (wk) | metric | point | 95% CI | gate | verdict |
|---|---|---|---|---|---|---|
| T1 | 26 | `calibration_slope` | 0.5677 | [-0.2498, 1.4528] | [0.8, 1.2] | **FAIL** |
| T1 | 26 | `observed_to_expected` | 0.7351 | [0.4156, 1.4118] | [0.9, 1.1] | **FAIL** |
| T1 | 52 | `calibration_slope` | 0.5437 | [0.0800, 1.0473] | [0.8, 1.2] | **FAIL** |
| T1 | 52 | `observed_to_expected` | 0.7308 | [0.4987, 1.0677] | [0.9, 1.1] | **FAIL** |
| T1 | ALL | `ibs_beats_age_ecog_reference` | 0.2012 | n/a | marker IBS < comparator IBS | **PASS** |
| T2 | 26 | `calibration_slope` | 0.6077 | [-0.2941, 1.5700] | [0.8, 1.2] | **FAIL** |
| T2 | 26 | `observed_to_expected` | 0.6952 | [0.4049, 1.3113] | [0.9, 1.1] | **FAIL** |
| T2 | 52 | `calibration_slope` | 0.5833 | [0.0738, 1.1257] | [0.8, 1.2] | **FAIL** |
| T2 | 52 | `observed_to_expected` | 0.6919 | [0.4814, 0.9875] | [0.9, 1.1] | **FAIL** |
| T2 | ALL | `ibs_beats_age_ecog_reference` | 0.2042 | n/a | marker IBS < comparator IBS | **PASS** |

NOTHING is activated by any result in this receipt.

---

## 7. D11 — fold-local functional form (item 7)

Fold-locality verdict: **`FOLD_LOCAL_PIPELINE_CONFIRMED`**. Global preprocessing before folds is
prohibited and was proved absent: a deliberately prohibited global-rank counterfactual produced a
measurably different held-out likelihood, knot vectors differed across all folds, centring and
scaling constants differed across all folds, and every training fold was strictly smaller than
the full cohort.

| form | marker df | CVPL | CVPL per held-out event | fold SD |
|---|---|---|---|---|
| `raw_k` | 1 | -1901.7464 | -6.4248 | 4.235 |
| `spline_log_k` | 4 | -1903.0439 | -6.4292 | 4.216 |
| `spline_rank` | 4 | -1903.4645 | -6.4306 | 4.190 |
| `linear_rank` | 1 | -1903.8275 | -6.4318 | 4.248 |
| `log_k` | 1 | -1905.4960 | -6.4375 | 4.262 |

No candidate form is distinguishable from the production form at the observed uncertainty.

---

## 8. D12 — selection-bias analysis (item 8)

The eligibility model uses baseline variables only and the marker itself is not a predictor.
Pre-landmark deaths are excluded structurally and are never reweighted, so no pre-landmark death
is compared with a landmark survivor under a common time origin.

The coefficient shift between the weighted and unweighted fits is small and its bootstrap
interval does not exclude zero, so selection into the analysis set does not explain the
coefficient. The excluded landmark survivors are systematically sicker on several baseline
covariates, which is disclosed rather than adjusted away.

---

## 9. What is still not claimed

- No release-wide test improvement.
- No absolute survival probability.
- No treatment benefit.
- No categorical band.
- No deployment. Nothing is merged to `main`; `origin/main` is untouched at `99dd39c657064839fd25c37a69851178bc5e6d9d`.

**Final allowable claim:** An externally OS-associated continuous PSA prognostic index is available for research use. Absolute survival probability and treatment benefit remain unavailable. The categorical band is suppressed because its prespecified stability gate failed.
