# PREDICTIVE_REPROGRAMMING_SIMULATION — Wiring Blueprint

**Target:** CrisPRO v3 backend (`crispro-backend-v3-push`)
**Status:** Implemented in the working tree; all new tests pass. **Nothing pushed to GitHub.**
**Classification:** RUO / hypothesis-only. This capability is an **observable, default-OFF simulation gate**. It does **not** promote ARTISTRY-7 / Stromal-Cage to a validated predictive biomarker.

---

## 1. What this does (and does not do)

**Does:** Exposes the existing ARTISTRY-7 "Lazarus" intervention simulator as a red-banner,
default-OFF, counterfactual block on the tumor-board `CaseResolution` contract. When (and only
when) a feature flag is ON **and** a case passes tier eligibility gates, the pipeline attaches a
`simulated_predictive_outcome` object describing a **deterministic score-space reprogramming
simulation** (universe A→B), reusing the simulator's math verbatim.

**Does NOT:**
- Does not relabel IMMUNE_ACCESS as predictive. In-house IMMUNE_ACCESS validation on
  GSE30161 + GSE63885 was **NOT-SUPPORTED across all 9 configurations**; that caveat is
  embedded in every payload's `disclaimers`.
- Does not fit a survival model. `reproduction_basis = "artistry7_sequence_B_lazarus_simulator"`,
  never `"GSE102073_fitted_model"`.
- Does not assign any patient a predicted OS. The 84.13-month PLATINUM_WINDOW KM median
  (n=9, 5 events) appears **only** inside `reference_anchor`, labeled
  `role = "cohort_anchor_not_patient_prediction"`.
- Does not change the prognostic path. With the flag OFF, `prognostic_baseline` and all core
  case fields are **byte-identical** to prior behavior (proven by snapshot test).
- Does not build the Doctor-Portal UI. It only exposes the backend field the UI would read.

---

## 2. Locked scientific facts this design defends

| Fact | Value | Role in design |
|------|-------|----------------|
| TCGA hgsoc 3-tier SPE composite | log-rank p ≈ 0.003819 (n=427) | `prognostic_baseline.evidence_status = "prognostic_association"` — PROGNOSTIC only |
| TIER_1A vs TIER_1B | log-rank p ≈ 0.126 (NS) | access/cage does **not** dictate survival; eligibility is tiering bookkeeping, not a survival claim |
| PLATINUM_WINDOW KM median | ≈ 84.13 mo, n=9 / 5 events, CI-upper null | cohort anchor **only**; forbidden as a patient prediction |
| GSE102073 curve flip | p ≈ 0.476 | directional **analogy** only; recorded in `analogy_note`, not a fitted model |
| In-house IMMUNE_ACCESS AUROC | NOT-SUPPORTED (9/9 configs) | permanent `disclaimers` entry `IMMUNE_ACCESS_external_AUROC_NOT_SUPPORTED` |

Reproducibility ≠ validity. Predictive claims remain SHADOW until a treated/responder set
passes a prespecified rule. This wiring makes the simulation **observable**, not **validated**.

---

## 3. Architecture (additive only)

```
Request (include_predictive_simulation)  ─┐
env PREDICTIVE_SIMULATION_MODE           ─┴─►  effective flag = env OR request  (default OFF)
                                                     │
CaseResolution assembly (case_resolver.resolve)      │
        │                                            ▼
        ├─ prognostic_baseline  ◄──────── _build_prognostic_baseline(artistry7_row)
        │        (PROGNOSTIC, flag-independent)
        │
        └─ simulated_predictive_outcome ◄─ _build_simulated_predictive_outcome(...)
                     │
                     ├─ flag OFF ................................ {"status":"disabled"}
                     ├─ flag ON, no ARTISTRY-7 row ............. {"status":"disabled"}
                     ├─ flag ON, gates fail  ──► predictive_simulation_gate.evaluate_eligibility
                     │        └─ {"status":"ineligible", "gate_failures":[...]}
                     └─ flag ON, gates pass  ──► simulator_adapter.run_simulation
                              └─ {"status":"simulated_predictive_reprogramming", ...}
```

### New / changed files
| File | Change |
|------|--------|
| `layer0_contracts/case_resolution.py` | **+2 optional fields** (`prognostic_baseline`, `simulated_predictive_outcome`), both `Optional[Dict[str,Any]] = None`. Mirrors the existing `marrowguard` / `evo2_evidence` default-null precedent. |
| `layer2_gates/predictive_simulation_gate.py` | **NEW.** `flag_enabled(...)` (env OR request) and `evaluate_eligibility(...)` → `(eligible, status, gate_failures, flag_on)`. |
| `layer1_engines/artistry7_reprogramming/simulator_adapter.py` | **NEW.** Vendors `INTERVENTION_MODELS`, `_recompute_immune_access`, `simulate_treatment_sequence` **verbatim** from `simulate_intervention.py`; maps timeline → schema; stamps provenance. |
| `layer3_orchestrator/case_resolver.py` | **+3 optional kwargs** (`artistry7_row`, `predictive_simulation_flag`, `include_predictive_simulation`), default-safe. Two helper builders. Populates the 2 new fields. Existing callers unaffected. |
| `tests/test_layer3/test_predictive_simulation_gate.py` | **NEW.** 6 test classes / 12 assertions. |
| `tests/fixtures/artistry7/pinned_rows.json` | **NEW.** 3 real patient rows (one row = one real patient). |

**Nothing else touched.** ARTISTRY-7 tiering was completely absent from v3 before this change, so
this is a purely additive module + optional contract fields — not a modification of any existing
SL/evidence tier.

---

## 4. Feature flag

- **Env:** `PREDICTIVE_SIMULATION_MODE` (default `false`).
- **Request:** `include_predictive_simulation` (default `false`); the resolver also accepts an
  explicit `predictive_simulation_flag` kwarg for programmatic callers.
- **Effective =** env OR request. OFF ⇒ `simulated_predictive_outcome = {"status":"disabled"}`
  and the prognostic path is byte-identical.

## 5. Eligibility gates (ALL must pass; flag ON)
1. `tier == "TIER_1_TRIPLE"`
2. `tier_refined == "TIER_1A_ACCESSIBLE"`
3. `PLATINUM_WINDOW == true`

Fail ⇒ `{"status":"ineligible", "gate_failures":[{gate, expected, actual}, ...]}`.
Eligible cohort (TIER_1_TRIPLE ∩ TIER_1A_ACCESSIBLE ∩ PLATINUM_WINDOW) = exactly **9** patients.

## 6. Default reprogramming sequence
- **Default:** `["METFORMIN", "DUPILUMAB", "CHECKPOINT_INHIBITOR"]` (mission "Sequence B", 3-step core triple).
- **Optional variant:** `sequence_variant="window_rechallenge"` → 4-step
  `[..., "PLATINUM_RECHALLENGE", "CHECKPOINT_INHIBITOR"]` (PLATINUM_RECHALLENGE is annotation-only, no numeric shift). **Not** the default.

## 7. Worked example (real patient `TCGA-04-1517-01`, flag ON)
- Baseline: TIER_1_TRIPLE / TIER_1A_ACCESSIBLE / PLATINUM_WINDOW=true, IMMUNE_ACCESS = 0.0886 → universe **A**.
- After Sequence B (deterministic shifts): IMMUNE_ACCESS = 0.4561 → universe **B**. `universe_transition = "A->B"`, `IMMUNE_ACCESS_delta = +0.3675`.
- `prereq_met = false` — faithful to the source simulator: the CHECKPOINT prerequisite is
  evaluated **before** its own +0.50 TCELL boost, when IMMUNE_ACCESS is still 0.2561 (< 0.40).
  This is the ARTISTRY-7 "control failure mode" signal surfaced as a mechanistic flag, not a claim.
- `reference_anchor` present and labeled `cohort_anchor_not_patient_prediction`; **no**
  `predicted_os_months` anywhere in the payload.

See `test_evidence/example_payloads.json` for the full flag-off, eligible-on, and both ineligible payloads.
