# Zeta-Core v4.0 — PSA Relative Prognostic Index: Delivery Report

**Directive:** DEPLOY THE EXTERNALLY VALIDATED PSA PROGNOSTIC INDEX — NO FALSE CALIBRATION.
**Capability released:** `RELATIVE_PROGNOSTIC_INDEX_ONLY`.
**Absolute-risk calibration:** none exists and none is activated.
**Treatment-predictive field:** none exists and none is activated.
**Deployment claim:** none. All code is on a feature branch. Nothing is merged to `main`.
**Status of this report:** Phase A complete, committed and pushed to the feature branch and
verified on the remote. The Phase B validation program has not yet run.

---

## 1. Git state (observed)

| Item | Value |
|---|---|
| branch | `feature/zeta-core-v4-tumor-marker-kinetics` |
| branch HEAD at start of this step | `8308c88b69c2476329049107326f1de205c1a6f3` |
| **final commit** | `ca56de30bf45a41d8c5f53584c31a5df27d36dea` |
| **final tree** | `819e48354e1bdc46e773005e6590fc63a59e49ad` |
| **remote branch SHA (GitHub API + `ls-remote`)** | `ca56de30bf45a41d8c5f53584c31a5df27d36dea` |
| `origin/main` (untouched) | `99dd39c657064839fd25c37a69851178bc5e6d9d` |
| pristine baseline worktree | detached `99dd39c657064839fd25c37a69851178bc5e6d9d` |
| branch-head comparison worktree | detached `8308c88b69c2476329049107326f1de205c1a6f3` |
| working tree | 18 uncommitted entries; **nothing committed or pushed yet** |

The entire `api/services/tumor_marker_kinetics/` package is new on this branch and absent from
`origin/main`, so the correct "CRC / breast / lung unchanged" baseline is the branch's own
committed head `8308c88b`, not `main`.

---

## 2. Frozen reference distribution

| Field | Value |
|---|---|
| path | `api/services/tumor_marker_kinetics/data/venice_psa_k_day_reference_cdf_v1.json` |
| artifact type / version | `FROZEN_EMPIRICAL_REFERENCE_CDF` / `v1` |
| bytes / top-level keys | 25,209 / 54 |
| single-line, LF-terminated, no CR | True / no CR: True |
| **file SHA-256** | `2302bfaba3acdb48dbcc731406cded140ce68169fb922ae516215bc8e80e62da` |
| **content SHA-256** | `a1acb23232c13a4089f6eb78a426292816864b2345e4651ccf01eaa7abd9d51f` |
| content digest recomputes | True |
| `.sha256` sidecar agrees | True |
| source cohort digest | `5c4220c24b1d056c0b61d045f6f45f22d13a9effc90570f8ee67f1b33b62011f` |
| generator / version | `scripts/generate_venice_psa_reference_cdf.py` / 1.0.0 |
| generator SHA-256 | `6eea4fd7f14cae0d2b7c12b8368aad03b57bda2627c06f3b34f55ed1400d6e66` |
| n reference / events | **446** / **296** |
| knots / tied values | 446 / 0 |
| percentile bounds | [0.0011210762331838565, 0.9988789237668162] |
| rate range (day⁻¹) | 8.691943994773028e-05 … 0.08947089486936483 |
| epsilon | 1e-12 (defensive clamp only; cannot bind on a real CDF output) |

**Eligibility cascade:** source rows 621 → VENICE rows 454 → complete model covariates 449 → positive finite rate 449 → week-15 landmark survivors 446.

**CDF convention.** Frozen empirical midrank plotting position F(k) = (L + E/2)/n with L = #{k_i < k} and E = #{k_i == k}. For a distinct value at 1-indexed rank r this equals (r - 0.5)/n, which is exactly the transformation the locked Cox model was fitted on. The naive i/n ECDF is deliberately NOT used: it would return 1.0 at the reference maximum and be inconsistent with the fitted coefficient.

**Extrapolation.** Below the lowest knot: k below the lowest knot returns the lowest knot's plotting position 0.5/n. Never 0. Above the highest
knot: k above the highest knot returns the highest knot's plotting position (n - 0.5)/n. Never 1.

**De-identification.** {"contains_dates": false, "contains_patient_identifiers": false, "contains_source_rows": false} — the knot vector is one
derived regression slope per reference patient, sorted ascending, with every join key stripped.

### 2.1 Determinism and byte-identical regeneration

| Run | `generated_utc` | file SHA-256 | content SHA-256 |
|---|---|---|---|
| 1 (freeze) | `2026-08-13T00:00:00Z` | `2302bfaba3acdb48dbcc7314…` | `a1acb23232c13a4089f6eb78…` |
| 2 (repeat) | `2026-08-13T00:00:00Z` | `2302bfaba3acdb48dbcc7314…` | `a1acb23232c13a4089f6eb78…` |
| 3 (alternate stamp) | `1999-01-01T12:34:56Z` | `095ef269f305ddedf6e6912c…` | `a1acb23232c13a4089f6eb78…` |
| 4 (re-proof, this step) | `2026-08-13T00:00:00Z` | `2302bfaba3acdb48dbcc7314…` | `a1acb23232c13a4089f6eb78…` |
| 5 (re-proof, alternate stamp) | `1999-01-01T12:34:56Z` | `095ef269f305ddedf6e6912c…` | `a1acb23232c13a4089f6eb78…` |

Runs 1 and 2 are byte-identical. Run 4, executed in this step, is **byte-identical to the shipped
artifact** (True). Runs 3 and 5
differ from the shipped file in `generated_utc` only, and the `content_sha256` — which excludes
`content_sha256` and `generated_utc` from its own preimage — is invariant across all five runs
(True). Source parquet
digest `5c4220c24b1d056c0b61d045f6f45f22d13a9effc90570f8ee67f1b33b62011f` (16,434 bytes).

---

## 3. Frozen coefficient and direction

| Field | Value |
|---|---|
| beta (`z_rank` coefficient) | `-0.17278419421744848` |
| standard error | `0.05678256010479415` |
| 95% CI on beta | [`-0.28407596697282594`, `-0.061492421462071026`] |
| exp(beta) per unit `z_rank` | `0.8413191567940249` |
| exp(beta) 95% CI | [`0.7527094614749995`, `0.9403600722668989`] |
| evidence status | `EXTERNALLY_OS_ASSOCIATED` |
| landmark | 15.0 weeks = 105.0 days, comparison strictly greater than |

**Direction, confirmed by certificate.** Higher k_day (faster PSA elimination) maps to a higher reference percentile, a higher z_rank, a lower prognostic log hazard index and a lower relative hazard multiplier. The reverse mapping is structurally impossible while beta < 0.

`direction_certificate()` sweeps an 2001-point rate grid and reports
`reverse_mapping_possible = False` with
0 /
0 /
0 monotonicity violations on the percentile,
`z_rank` and `k_day` checks respectively. **Higher `k_day` yields a lower relative hazard
multiplier.**

| `k_day` | percentile | `z_rank` | multiplier | band |
|---|---|---|---|---|
| `0.0005` | 0.010471253 | -2.3090194 | 1.4902771 | `HIGHER_RELATIVE_HAZARD` |
| `0.002` | 0.051879208 | -1.6268996 | 1.3245894 | `HIGHER_RELATIVE_HAZARD` |
| `0.007266565` | 0.25 | -0.67448976 | 1.1236038 | `HIGHER_RELATIVE_HAZARD` |
| `0.01342055` | 0.5011207 | 0.0028091747 | 0.99951474 | `REFERENCE_RANGE_RELATIVE_HAZARD` |
| `0.02111883` | 0.74999998 | 0.6744897 | 0.88999346 | `REFERENCE_RANGE_RELATIVE_HAZARD` |
| `0.05` | 0.98053757 | 2.0649803 | 0.69991529 | `LOWER_RELATIVE_HAZARD` |
| `0.08` | 0.99782643 | 2.8518077 | 0.61094564 | `LOWER_RELATIVE_HAZARD` |

Multiplier strictly decreasing across the sweep: **True**.

---

## 4. Worked example outputs

| Case | `k_day` | percentile | mode | `z_rank` | log hazard index | multiplier | 95% CI | band |
|---|---|---|---|---|---|---|---|---|
| slowest reference decliner | `8.691943994773028e-05` | 0.001121076233 | AT_KNOT | -3.056128359 | 0.5280506759 | 1.695623765 | (1.206748, 2.382553) | `HIGHER_RELATIVE_HAZARD` |
| lower-quartile knot (Q1) | `0.007266565079515904` | 0.25 | AT_KNOT | -0.6744897502 | 0.116541168 | 1.123603766 | (1.042348, 1.211194) | `REFERENCE_RANGE_RELATIVE_HAZARD` |
| interpolated reference median | `0.013407235485489187` | 0.5 | INTERPOLATED | -2.782916425e-16 | 4.80843972e-17 | 1 | (1, 1) | `REFERENCE_RANGE_RELATIVE_HAZARD` |
| median knot (Q2) | `0.01342055450463369` | 0.5011210762 | AT_KNOT | 0.002810125083 | -0.000485545198 | 0.9995145727 | (0.999202, 0.9998272) | `REFERENCE_RANGE_RELATIVE_HAZARD` |
| upper-quartile knot (Q3) | `0.021118830402140517` | 0.75 | AT_KNOT | 0.6744897502 | -0.116541168 | 0.889993457 | (0.8256318, 0.9593724) | `REFERENCE_RANGE_RELATIVE_HAZARD` |
| canonical anchor fit | `0.03833793027167849` | 0.9539617085 | INTERPOLATED | 1.684544003 | -0.2910625781 | 0.7474689014 | (0.6196884, 0.9015979) | `LOWER_RELATIVE_HAZARD` |
| fastest reference decliner | `0.08947089486936483` | 0.9988789238 | AT_KNOT | 3.056128359 | -0.5280506759 | 0.5897534706 | (0.4197178, 0.8286738) | `LOWER_RELATIVE_HAZARD` |

The canonical anchor is `fit_first_order_decay([0,14,28,42],[100,60,35,20])` →
`k_day = 0.03833793027167849`, status
`FIT_ELIGIBLE`, r² = 0.9995850299799071,
n = 4.

### 4.1 Three near-exactness disclosures (asserted with tolerance, not engineered away)

1. `normal_ppf(0.975)` = `1.9599639845400536` versus the pinned
   `NORMAL_QUANTILE_97_5` = `1.959963984540054`; absolute difference
   4.441e-16. The pinned literal is what the emitted CI uses so the
   evidence receipt reproduces bitwise.
2. `exp(beta + z·SE)` = `0.9403600722668989` versus the receipt's factored
   `exp(beta)·exp(z·SE)` = `0.9403600722668988` — a one-ulp difference.
3. The interpolated reference median returns percentile
   `0.4999999999999999` in mode
   `INTERPOLATED` rather than exactly 0.5.

`exp(BETA_CI_LOW)` = `0.7527094614749995` matches the frozen receipt exactly.

---

## 5. Capability separation (three distinct evidence classes)

| Tier | Authorized axis statuses | Status |
|---|---|---|
| relative prognostic index | ['EXTERNALLY_OS_ASSOCIATED'] | released for `PROSTATE_PSA_KINETICS` only |
| absolute-risk calibrated | [] | `NOT_AVAILABLE_IN_THIS_RELEASE` |
| treatment-predictive | [] | `NOT_AVAILABLE_IN_THIS_RELEASE` |

Blocking gaps, verbatim from the contract:

- absolute risk — No baseline hazard is transported and no calibration gate has passed.
- treatment-predictive — All released prostate cohorts are comparator/control arms, so no treatment-by-kinetics interaction is estimable.

The prognostic tier's real defense is a **hard-coded axis-identity gate** in `serialize_fit`, not
configuration: widening `PROGNOSTIC_INDEX_AXIS_STATUSES` to include the CRC status still refuses
CRC, and de-authorizing the prostate status still refuses prostate. Both gates are tested.

### 5.1 Mandated disclosure, emitted with every payload

> Externally associated with overall survival in comparator cohorts. Relative prognostic index only. Not an absolute survival probability, treatment-benefit estimate, or therapy recommendation. Validated among week-15 survivors with positive estimable early PSA decline. A1-RSE precision gate failed: 66.5% versus 80%.

### 5.2 Limitations emitted with every payload (9)

1. Relative prognostic index only; not an absolute survival probability.
2. Not a treatment-benefit estimate and not a therapy recommendation.
3. No absolute-risk calibration exists; no baseline hazard is transported.
4. Derived from comparator/control arms only, so no treatment-by-kinetics interaction is estimable and treatment prediction is out of scope.
5. A1-RSE precision gate failed: 66.5% versus 80% with RSE<0.5.
6. Defined only among week-15 survivors with a positive estimable early PSA decline; other patients fail closed with a typed reason.
7. relative_prognostic_band values are deterministic display categories, not clinically validated decision thresholds.
8. Joint bootstrap (B=2000) band stability: concordance is 96.7% across the reference distribution but only 49-51% for values sitting exactly on the 0.25 / 0.75 cut points, so the continuous reference_percentile should be preferred over the band near a cut.
9. The reference distribution is a single external trial (VENICE); portability of a within-trial rank transform to other populations is untested.

---

## 6. Fail-closed eligibility

Typed reasons (11): `FIT_QC_FAILED`, `INCOMPATIBLE_RATE_UNIT`, `INSUFFICIENT_DISTINCT_OBSERVATIONS`, `INVALID_CDF_OUTPUT`, `INVALID_MARKER_VALUE`, `MARKER_AXIS_MISMATCH`, `NONPOSITIVE_DECLINE_RATE`, `OUTSIDE_VALIDATED_LANDMARK_SCOPE`, `REFERENCE_ARTIFACT_MISSING`, `REFERENCE_CHECKSUM_MISMATCH`, `REFERENCE_VERSION_UNSUPPORTED`.

Precedence: axis/marker identity → rate unit → fit status → `k` validity → `k` sign → landmark
attestation → reference-artifact faults → `INVALID_CDF_OUTPUT`. The module **never** substitutes
zero, the reference median, a cohort mean, or a default percentile.

| Case | eligible | reason | all numeric fields null |
|---|---|---|---|
| `bad_rate_unit` | False | `INCOMPATIBLE_RATE_UNIT` | True |
| `fit_failed` | False | `NONPOSITIVE_DECLINE_RATE` | True |
| `not_attested_false` | False | `OUTSIDE_VALIDATED_LANDMARK_SCOPE` | True |
| `not_attested_silent` | False | `OUTSIDE_VALIDATED_LANDMARK_SCOPE` | True |
| `wrong_axis` | False | `MARKER_AXIS_MISMATCH` | True |

### 6.1 Landmark scope requires dual attestation

`landmark_confirmed is True` **and** `survived_through_landmark_day > 105.0` (strict).

| Case | `landmark_confirmed` | `survived_through_landmark_day` | attested | not attested because |
|---|---|---|---|---|
| `attested` | True | 140.0 | **True** | — |
| `boundary_equal` | True | 105.0 | **False** | survived_through_landmark_day 105.0 is not strictly greater than day 105.0 (week 15.0) |
| `day_only` | None | 140.0 | **False** | landmark_confirmed was not explicitly True; silence is never treated as eligibility |
| `flag_false` | False | 140.0 | **False** | landmark_confirmed was not explicitly True; silence is never treated as eligibility |
| `flag_only` | True | None | **False** | landmark_confirmed was True but survived_through_landmark_day was missing or non-numeric; the attestation is incomplete |
| `silent` | None | None | **False** | landmark_confirmed was not explicitly True; silence is never treated as eligibility |

`k_day` and `fit_qc` are still released when attestation fails; the six prognostic numeric fields
are `None` and the reason is `OUTSIDE_VALIDATED_LANDMARK_SCOPE`.

---

## 7. B6 — joint bootstrap of the reference CDF and the coefficient

Seed 20260813, 2000/2000 replicates fitted,
0 failures, 49.78 s, resampling the CDF and beta
jointly (True).

| beta bootstrap field | value |
|---|---|
| `bootstrap_ci` | [-0.2897001249917215, -0.0652229293447069] |
| `bootstrap_mean` | -0.17529805959509517 |
| `bootstrap_sd` | 0.055602672220444856 |
| `bootstrap_se_vs_analytic_se_ratio` | 0.9792209459705274 |
| `direction_stability` | 1.0 |
| `frozen_analytic_se` | 0.05678256010479415 |
| `frozen_beta` | -0.17278419421744848 |
| `mean_model_se` | 0.05728624613985672 |
| `note` | 'beta < 0 in a replicate means the deployed direction holds: faster PSA elimination -> higher percentile -> lower relative hazard.' |
| `replicates_with_nonnegative_beta` | 0 |

### 7.1 The prespecified band criterion FAILED

| Metric | Value |
|---|---|
| prespecified criterion | >= 90% band concordance at the frozen quartile knots |
| **criterion met** | **False** |
| quartile-knot concordance | **0.6662** |
| full-grid concordance | 0.9456 |
| population-wide concordance (all 446 knots) | 0.9669 |

| distance to nearest band cut | reference knots | mean band concordance |
|---|---|---|
| `[0.0, 0.02)` | 34 | 0.6687 |
| `[0.02, 0.05)` | 56 | 0.9393 |
| `[0.05, 0.1)` | 88 | 0.9991 |
| `[0.1, 0.25)` | 268 | 1.0000 |

The failure is **structural, not sampling noise**. The frozen Q1 and Q3 knots sit exactly on the band cut points (111.5/446 = 0.25 and 334.5/446 = 0.75), so the prespecified quartile grid measures stability at the least stable possible points. Read it together with the population-wide concordance and the distance-to-cut strata.

A live demonstration of the knife edge: moving `k_day` by one unit in the last place across the
frozen Q1 knot flips the displayed band while the hazard multiplier is unchanged to 15 significant
figures.

| Case | `k_day` | percentile | band |
|---|---|---|---|
| `q1_knot_exact` | `0.007266565079515904` | `0.25` | `REFERENCE_RANGE_RELATIVE_HAZARD` |
| `q1_knot_minus_1ulp` | `0.007266565079515903` | `0.24999999999999994` | `HIGHER_RELATIVE_HAZARD` |
| `q1_truncated_literal_7_266565e_03` | `0.007266565` | `0.24999999537855397` | `HIGHER_RELATIVE_HAZARD` |
| `q3_knot_exact` | `0.021118830402140517` | `0.75` | `REFERENCE_RANGE_RELATIVE_HAZARD` |
| `q3_knot_minus_1ulp` | `0.021118830402140513` | `0.7499999999999999` | `REFERENCE_RANGE_RELATIVE_HAZARD` |
| `q3_knot_plus_1ulp` | `0.02111883040214052` | `0.75` | `REFERENCE_RANGE_RELATIVE_HAZARD` |

**Response.** No threshold was moved, no goalpost was shifted, and `relative_prognostic_band` was
not deleted. The finding is disclosed in the emitted limitations, and the continuous
`reference_percentile` is recommended over the band whenever a value sits near a cut.

**Caveat.** The bootstrap percentile interval at a fixed `k_day` quantifies reference-distribution
resampling uncertainty. It is **not** a new-patient predictive interval.

---

## 8. Tests

| Metric | Value |
|---|---|
| kinetics suite nodes | **564** |
| failed / errors / skipped | **0 / 0 / 0** |
| branch-head nodes in the three pre-existing files | 141 |
| **new nodes added** | **423** (mandated target ≈70, zero skips) |

Regression control against the pristine baseline: **0 regressions, 0 removed nodes**, and the
pre-existing non-passing set is unchanged at **24 nodes**. Those 24 are environmental and reproduce
on untouched `origin/main`:

- `tests/test_contract_shape.py` — 18 errors + 4 failures, requires a localhost server
- `tests/audit/test_therapy_fit_v2_high_risk_behaviors.py::test_extract_biomarkers_ovarian_adds_platinum_resistant_tag`
- `tests/integration/test_bundle_contract.py::test_bundle_contract_strict`

Golden-leaf diff, branch head versus working tree: **0 removed, 0 changed, 85 added** — both
production hardening edits are output-neutral.

### 8.1 CRC / breast / lung: value-identical, **not** byte-identical

The non-prostate payloads differ from the branch head only by three **additional null**
fail-closed keys (`predicted_treatment_benefit`, `treatment_priority`,
`treatment_recommendation`) plus the three corresponding `/contract/fail_closed_keys[7..9]`
manifest strings: **36 null-key leaves + 3 manifest strings, 0 unexplained**. Byte-identity is not
claimed.

---

## 9. Validation battery — 23/23 gates passed

| # | Gate | Verdict | Detail |
|---|---|---|---|
| 1 | kinetics suite: 0 failures | **PASS** | 564 tests, 0 failed, 0 errors |
| 2 | kinetics suite: 0 skips (mandated) | **PASS** | skipped=0 |
| 3 | new test nodes added by this step | **PASS** | 564 - 141 = 423 new nodes (target ~70) |
| 4 | baseline diff: 0 regressions | **PASS** | regressions=[] |
| 5 | baseline diff: 0 removed nodes | **PASS** | removed=[] |
| 6 | pre-existing non-passing set identical | **PASS** | 24 pre-existing non-passing nodes, unchanged |
| 7 | golden leaves: 0 removed | **PASS** | removed=[] |
| 8 | golden leaves: 0 changed | **PASS** | changed=[] |
| 9 | non-prostate additions are only the 3 null keys + their manifest entries | **PASS** | 36 null-key leaves + 3 manifest strings, 0 unexplained |
| 10 | artifact file SHA-256 matches pin | **PASS** | 2302bfaba3acdb48dbcc731406cded140ce68169fb922ae516215bc8e80e62da |
| 11 | artifact content_sha256 matches pin | **PASS** | a1acb23232c13a4089f6eb78a426292816864b2345e4651ccf01eaa7abd9d51f |
| 12 | artifact source cohort digest matches pin | **PASS** | 5c4220c24b1d056c0b61d045f6f45f22d13a9effc90570f8ee67f1b33b62011f |
| 13 | `.sha256` sidecar agrees | **PASS** | 2302bfaba3acdb48dbcc731406cded140ce68169fb922ae516215bc8e80e62da |
| 14 | artifact population pins | **PASS** | n=446 events=296 |
| 15 | regeneration reproduces the artifact byte-for-byte | **PASS** | /workspace/regen_check/venice_psa_k_day_reference_cdf_v1.json |
| 16 | identifier + claim + label scans clean on all emitted payloads | **PASS** | 6 payloads scanned; violations=[] |
| 17 | no identifier-like VALUE anywhere | **PASS** | {} |
| 18 | artifact de-identification attestations all False | **PASS** | 3/3 False |
| 19 | direction certificate: reverse mapping impossible | **PASS** | n_grid=2001 |
| 20 | direction certificate: 0 violations on every check | **PASS** | {'percentile_monotone_decreasing_violations': 0, 'z_rank_monotone_increasing_violations': 0, 'k_day_monotone_nonincreasing_violations': 0} |
| 21 | frozen coefficient is negative | **PASS** | beta < 0 |
| 22 | frozen artifact is NOT gitignored (the .gitignore fix) | **PASS** | artifact visible to git |
| 23 | no credential pattern in tracked tree | **PASS** |  |

---

## 10. Two production defects found by tests

### DEFECT-1 — `_assert_negative_beta` validated the wrong value

`_assert_negative_beta(beta: float = PROSTATE_PSA_COX_BETA)` bound the coefficient as a
**definition-time default**, so the per-call guard validated the import-time value while the
transform resolves the module global at call time. A runtime mutation of the global could have
flipped the prognostic direction silently. Found by a negative test in
`tests/unit/test_prognostic_direction_negative.py`. Fixed with a module-level `_UNSET` sentinel so
the guard resolves and validates the value the arithmetic will actually use. No guard was weakened;
the change is output-neutral.

### DEFECT-2 — the forbidden-label scanner missed separator-styled evasions

`assert_no_forbidden_prognostic_labels` matched literal spaced phrases with word boundaries, and
`_` is not in `[a-z0-9]`, so `clinical_risk`, `low_risk`, `favorable_prognosis` and
`calibrated-risk` all passed the guard. Found by an empirical probe written while repairing eight
key-name-scanner test parameters. Fixed with a **two-pass scan**: the original literal blob, then a
dedicated recursive walker that collapses `_`/`-` runs to spaces and lowercases before re-scanning.

One carve-out was unavoidable and is deliberately visible and tested. `treatment_priority` is
simultaneously a mandated fail-closed key name **and** a forbidden claim phrase, and the contract
self-declares its refused key names as string values. The rule is therefore: an **exact
whole-string self-reference** to a fail-closed key name, in key position or whole-string value
position, is exempt; any surrounding text is a claim and is still caught. Two earlier attempts were
rejected — exempting matching tokens anywhere was too loose, and exempting key position only tripped
a legitimate false positive at `/fail_closed_keys[8]`. Verified: the normalized pass yields no hits
for the contract or for the prostate, CRC, breast and lung payloads; removing the exemption yields
`['treatment priority']`. The guard was strictly tightened, never weakened.

---

## 11. Environment notes (no repository code was changed for these)

- `loguru` 0.7.3 installed — a declared runtime dependency imported by `api/config.py:7` that was
  absent from the sandbox.
- `pytest-asyncio` 1.4.0 installed — a declared dev dependency (`requirements-dev.txt:6`). Its
  absence produced six apparent regressions in `tests/audit/test_therapy_fit_v2_slop_proofs.py`
  that reproduced identically on untouched `origin/main`, so they were never branch regressions.
- `uv` silently upgraded `pytest` 8.4.1 → 9.1.1 while installing `pytest-asyncio`; `pytest` was
  re-pinned to 8.4.1. Final: pytest 8.4.1 + pytest_asyncio 1.4.0.

A `.gitignore` defect was also fixed: line 10 `data/` was excluding the frozen artifact from the
repository, which would have shipped code that cannot load its own reference distribution. A
negation block was added. This was proven with `git ls-files --others --exclude-standard` (both the
artifact and its sidecar are listed) and `git add --dry-run` (both report `add`).
`git check-ignore -v` is **not** a valid test here — it exits 0 even for negation matches.

---

## 12. Pinned evidence receipts (all 7 resolve with matching digests)

| Receipt | Path in `fjkiani/Brenus` | Pinned SHA-256 | Digest matches |
|---|---|---|---|
| `zeta_core_v4_axis_evidence_state_v1` | `clinical_validation/universal_kinetics/receipts/zeta_core_v4_axis_evidence_state_v1.json` | `c538e5408b25c393…` | yes |
| `crc_cea_adam_landmark_validation` | `clinical_validation/universal_kinetics/receipts/crc_cea_adam_landmark_validation.json` | `7869ec5bb91c8100…` | yes |
| `crc_cea_legacy_ols_landmark_validation` | `clinical_validation/universal_kinetics/receipts/crc_cea_legacy_ols_landmark_validation.json` | `f5cfa3606c36c652…` | yes |
| `crc_legacy_reconstruction` | `clinical_validation/universal_kinetics/receipts/crc_legacy_reconstruction.json` | `42c84c40c1e75bd8…` | yes |
| `prostate_cox_anchor_verification` | `clinical_validation/universal_kinetics/receipts/prostate_cox_anchor_verification.json` | `c3f6380f70460bc7…` | yes |
| `prostate_universal_fitter_bridge` | `clinical_validation/universal_kinetics/receipts/prostate_universal_fitter_bridge.json` | `111c33a363489072…` | yes |
| `kelim_multicohort_rank_cox` | `clinical_validation/kelim/kelim_multicohort_rank_cox.json` | `21f3a2674368b4d9…` | yes |

---

## 13. Regenerated deliverables

| File | Bytes | SHA-256 |
|---|---|---|
| `therapy_fit_marker_kinetics_contract_v4.json` | 47,328 | `18c7083698ee787d2c2bfdf5078f80cdeae0c1e1190fb2f4936db0fdb3651727` |
| `zeta_core_v4_prognostic_index_implementation_receipt.json` | 45,986 | `095fc6a8053d8832991c125d3a52afdc4b6db7777d28ee477d3109224305104f` |
| `b6_bootstrap_band_stability.json` | 16,274 | `0c103a3da9cb0e99332c49cd12bef0cb678262ce022d7893b08ac4a817a76676` |

Each file has a `.sha256` sidecar. The contract digest changed from the prior phase
(`cc8ed6706cefe5c4e04be7f22b6f26ca55a1295d841a5f41219d558d56b227fa`) because prostate
`released_outputs` grew from 2 entries to 13, the three-tier `capability_separation` block was
added, and the wrapper now records the frozen reference artifact and the full relative prognostic
index specification. Gates enforced on the emitted contract before writing: no axis declared
calibrated, all 10 fail-closed keys null everywhere, identifier / prohibited-claim /
forbidden-label scans clean, all 7 pinned receipts resolving with matching digests, prostate
released outputs consistent with the capability block, and CRC/breast/lung released outputs
unchanged.

---

## 14. Failed invariants and unresolved limitations

1. **B6 prespecified band criterion FAILED** — 0.6662 versus the
   ≥ 0.90 requirement at the frozen quartile knots. Disclosed, not remediated.
2. **A1-RSE precision gate FAILED** — 66.5% versus 80%. There is deliberately **no runtime RSE
   gate**: the n=446 reference population was not filtered on fit precision, so
   gating a prospective patient on RSE would map them against a distribution built without that
   filter. The failure is disclosed in `limitations` instead.
3. **Artifact/runtime limitations parity is imperfect.** The frozen artifact carries
   8 limitation entries; the runtime `PROGNOSTIC_LIMITATIONS` emitted with every
   payload carries 9. The runtime list adds the B6 band-stability sentence and
   re-words four entries. The artifact was digest-pinned before B6 completed and was **not**
   regenerated, because doing so would invalidate the pinned file and content digests recorded in
   the tests and in the receipt. The runtime list is the authoritative disclosure surface.
4. **Single-trial reference distribution.** VENICE only; portability of a within-trial rank
   transform to other populations is untested.
5. **TROPIC** is excluded from the locked model — no ECOG appears anywhere in the released tables —
   and its OS derivability is still unverified, so B5 remains conditional.
6. **Blocked validation items.** TAX327 raw longitudinal PSA is not cached, so per-timepoint rate
   reliability for TAX327 is blocked. B7 (CRC leave-one-trial-out) is blocked for lack of a cached
   patient-level table. B10 (treatment-predictive) is **permanently blocked** with available data
   because every released prostate cohort is a comparator/control arm. B9 is **not run by design**.
7. **`scikit-survival` is absent** from the environment, so B1's IPCW Brier (Graf) and Uno tAUC
   must be hand-implemented and unit-tested before B1 can be trusted.
8. **Not yet done:** the entire Phase B validation program. No Phase B result auto-activates any
   absolute-risk or treatment field.
9. **This report was regenerated after the push**, so the implementation receipt it cites
   (`095fc6a8…`) was emitted immediately before the commit and therefore records the pre-commit
   working-tree state rather than the commit SHA. Every digest, count and gate result in that
   receipt was produced from the identical tree that became commit `ca56de30`.

---

## 15. What is explicitly NOT claimed

- Not deployed. Not merged to `main`. No environment is running this code.
- No absolute survival probability, no calibrated absolute-risk output, no treatment-benefit
  estimate, no therapy
  recommendation, and no clinical decision threshold.
- `relative_prognostic_band` values are deterministic display categories for one UI surface. They
  are not validated cut points, and near a cut they are unstable by measurement.
- The index is defined only among week-15 survivors with a positive, estimable early PSA decline.
  Everyone else fails closed with a typed reason.

---

## 16. Commit and push (observed)

| Step | Result |
|---|---|
| staged paths | 19, explicitly enumerated; `data/cache.db` restored with `git checkout --` beforehand and confirmed absent from the index |
| commit | `ca56de30bf45a41d8c5f53584c31a5df27d36dea` (normal commit; no amend, no squash, no history rewrite) |
| tree | `819e48354e1bdc46e773005e6590fc63a59e49ad` |
| push | fast-forward `8308c88b..ca56de30`, no force |
| `git ls-remote` branch | `ca56de30bf45a41d8c5f53584c31a5df27d36dea` |
| GitHub API `refs/heads/feature/zeta-core-v4-tumor-marker-kinetics` | `ca56de30bf45a41d8c5f53584c31a5df27d36dea` |
| `git ls-remote` `refs/heads/main` | `99dd39c657064839fd25c37a69851178bc5e6d9d` — **unchanged** |

**Clean-clone proof.** A fresh single-branch clone at `ca56de30` tracks both
`venice_psa_k_day_reference_cdf_v1.json` and its `.sha256` sidecar, the cloned artifact hashes to
`2302bfaba3acdb48dbcc731406cded140ce68169fb922ae516215bc8e80e62da` in agreement with the sidecar,
and running the committed generator inside the clone reproduces the artifact **byte-for-byte**
(`cmp` clean, same digest). This closes the `.gitignore` defect: the frozen reference distribution
now ships with the code that loads it.

No merge to `main` was performed and no deployment is claimed.
