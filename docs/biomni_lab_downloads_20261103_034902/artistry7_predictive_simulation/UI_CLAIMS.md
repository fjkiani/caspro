# UI_CLAIMS — what the Doctor-Portal MAY and MUST NOT say

This block is **RUO / hypothesis-only**. The UI that renders `simulated_predictive_outcome`
must present it under a red **SIMULATED** banner and honor the following claim boundaries.
Every payload already carries `disclaimers: ["RUO", "not_clinical_decision_support",
"not_validated_predictive_biomarker", "IMMUNE_ACCESS_external_AUROC_NOT_SUPPORTED"]`.

---

## MAY claim (supported by the payload)

- "**Deterministic reprogramming SIMULATION** (research use only): under a fixed rule set, the
  modeled Sequence B (Metformin → Dupilumab → checkpoint inhibitor) shifts this patient's
  **score-space** state and moves the modeled **immune-access universe from A to B**."
- "This is a **counterfactual/hypothesis**, reproduced from the ARTISTRY-7 'Lazarus' simulator
  (`reproduction_basis = artistry7_sequence_B_lazarus_simulator`), **not** a fitted survival model."
- "Baseline **SPE tier** (TIER_1_TRIPLE / TIER_1A_ACCESSIBLE) is a **prognostic** association
  (TCGA n=427, 3-tier log-rank p ≈ 0.0038)." — display from `prognostic_baseline`, labeled prognostic.
- "The simulated **IMMUNE_ACCESS delta** is +X.XX (score units), crossing the design threshold 0.40." — from `delta_summary.IMMUNE_ACCESS_delta`.
- "The simulator flags that the **checkpoint prerequisite was not met** at the point of IO
  application (mechanistic flag)." — from `prereq_met`, when false.
- "PLATINUM_WINDOW cohort KM median ≈ 84.1 months (n=9, 5 events) — shown as a **cohort
  reference anchor, not a prediction for this patient**." — from `reference_anchor` only, verbatim label.
- "Eligibility gates: tier / tier_refined / platinum_window — with pass/fail and expected vs actual." — from `eligibility` / `gate_failures`.
- "Directional **analogy only**: an external cohort (GSE102073) showed a non-significant curve-flip
  direction (p ≈ 0.48)." — from `analogy_note`, clearly labeled analogy.

## MUST NOT claim (forbidden)

- MUST NOT state or imply a **predicted survival / OS in months** for the patient. There is no
  `predicted_os_months`; the 84.1-month figure is a cohort anchor only and MUST NOT be shown as
  "this patient's expected survival."
- MUST NOT present IMMUNE_ACCESS (or Stromal-Cage / ARTISTRY-7) as a **validated predictive
  biomarker**. In-house validation on GSE30161 + GSE63885 was **NOT-SUPPORTED (9/9 configs)**.
- MUST NOT describe the output as a **treatment recommendation, clinical decision support, or
  eligibility determination** for any therapy.
- MUST NOT claim the simulation is a **fitted / trained model** or that it was "validated on"
  GSE102073 or the n=9 window cohort. It is a deterministic rule application.
- MUST NOT assert "**the drug didn't fail, patient selection did**" as a proven conclusion. At
  most: "the simulator's prerequisite flag is *consistent with* a selection-timing hypothesis."
- MUST NOT claim TIER_1A vs TIER_1B (access/cage) **determines survival** — that contrast is
  **NS (log-rank p ≈ 0.126)**.
- MUST NOT merge this block into the **evidence matrix / ranked interventions / evidence
  receipts**. It is a sibling, RUO, observational panel.
- MUST NOT surface any of this when the feature flag is **OFF** (payload is `{"status":"disabled"}`).

---

## Rendering rules
1. Red **SIMULATED — Research Use Only** banner on the whole block; never mix with validated evidence.
2. Show the four `disclaimers` chips verbatim.
3. Universe A→B shown as a state transition, not a survival/response probability.
4. Any KM/curve visual must be labeled **cohort reference (n=9, 5 events)**, physically separated
   from the patient panel, and must not carry the patient's identifier as a predicted point.
5. When `status ∈ {"disabled","ineligible"}`, render the reason (or gate_failures) — never a simulated curve.
