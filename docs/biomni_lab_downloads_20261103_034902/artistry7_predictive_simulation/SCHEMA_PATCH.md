# SCHEMA_PATCH — CaseResolution contract additions

Two **optional, default-null** sibling fields were added to `CaseResolution`
(`layer0_contracts/case_resolution.py`). They mirror the existing `marrowguard` and
`evo2_evidence` flagged-null precedent. They are **siblings** — never merged into
`engines`, `evidence_receipts`, or any evidence-matrix row.

Current file SHA-256 (`case_resolution.py`): `c7806773cb517aeb50448f920baeecf488fd07742ba8b620fa1be12838f79ee4`

```python
# ADDED to class CaseResolution(BaseModel), immediately before `metadata`:

prognostic_baseline: Optional[Dict[str, Any]] = Field(None, description=...)
simulated_predictive_outcome: Optional[Dict[str, Any]] = Field(None, description=...)
```

Backward compatibility: `CaseResolution()` with no arguments yields
`prognostic_baseline is None` and `simulated_predictive_outcome is None`
(verified). No existing field changed type, name, or default.

---

## Field 1 — `prognostic_baseline`  (PROGNOSTIC, flag-independent)

Populated whenever an ARTISTRY-7 sample is in scope, **independent of the simulation flag**
(so it is byte-stable when the flag flips). `None` when no ARTISTRY-7 sample is present.

```json
{
  "sample_id": "TCGA-04-1517-01",
  "spe_tiers": {
    "tier": "TIER_1_TRIPLE",
    "tier_refined": "TIER_1A_ACCESSIBLE",
    "spe_composite_score": <float|null>
  },
  "tier": "TIER_1_TRIPLE",
  "tier_refined": "TIER_1A_ACCESSIBLE",
  "immune_access_score": 0.0886342827490619,
  "platinum_window": true,
  "os_context": {
    "os_months": <float|null>,
    "os_status": "<str|null>",
    "note": "Prognostic SPE-tier association (TCGA hgsoc n=427, 3-tier log-rank p~0.003819). TIER_1A vs 1B log-rank p~0.126 (NS). Not a predictive/treatment claim."
  },
  "evidence_status": "prognostic_association"
}
```

---

## Field 2 — `simulated_predictive_outcome`  (RUO, DEFAULT-OFF)

Three shapes.

### 2a. Disabled (flag OFF, or flag ON with no ARTISTRY-7 row)
```json
{ "status": "disabled" }
```

### 2b. Ineligible (flag ON, gates fail)
```json
{
  "status": "ineligible",
  "gate_failures": [
    {"gate": "tier",            "expected": "TIER_1_TRIPLE",       "actual": "TIER_3_NONE"},
    {"gate": "tier_refined",    "expected": "TIER_1A_ACCESSIBLE",  "actual": "TIER_3_NONE"},
    {"gate": "platinum_window", "expected": true,                  "actual": false}
  ],
  "eligibility": {"tier": "...", "tier_refined": "...", "platinum_window": false, "flag_on": true},
  "disclaimers": ["RUO", "not_clinical_decision_support", "not_validated_predictive_biomarker", "IMMUNE_ACCESS_external_AUROC_NOT_SUPPORTED"]
}
```

### 2c. Full simulation (flag ON, gates pass)
```json
{
  "status": "simulated_predictive_reprogramming",
  "mathematical_integrity": "deterministic_hypothesis",
  "reproduction_basis": "artistry7_sequence_B_lazarus_simulator",
  "analogy_note": "GSE102073 direction flip is NS (p~0.476); used as narrative analogy only, not a fitted survival model.",
  "hypothesis": "If baseline = TIER_1_TRIPLE AND TIER_1A_ACCESSIBLE, does Sequence B (Metformin->Dupilumab->IO) produce a simulated score-space / universe shift consistent with the ARTISTRY-7 rescue narrative, using the existing Lazarus simulator (NOT a survival regression fit to 84.1)?",
  "flag_value": true,
  "script_path": "publications/11-artistry7-hgsoc-subgroup/scripts/simulate_intervention.py",
  "code_sha256": "aeee8b543bde0cbeff101b0343dc2743b99ef61c4f969cd78776d6e47648535b",
  "dataroom_commit": "a54b8a11be7d0f1a58be256ade38b313408e0b11",
  "input_sample_id": "TCGA-04-1517-01",
  "run_id": "<uuid4>",
  "run_timestamp_utc": "<iso8601 Z>",
  "eligibility": {"tier": "TIER_1_TRIPLE", "tier_refined": "TIER_1A_ACCESSIBLE", "platinum_window": true, "platinum_status": "sensitive", "flag_on": true},
  "sequence": ["METFORMIN", "DUPILUMAB", "CHECKPOINT_INHIBITOR"],
  "sequence_variant": "core",
  "universe_threshold": 0.40,
  "pre_scores":  { "...score_key...": <float>, "IMMUNE_ACCESS_SCORE": 0.088634 },
  "post_scores": { "...score_key...": <float>, "IMMUNE_ACCESS_SCORE": 0.456134 },
  "universe_before": "A",
  "universe_after": "B",
  "universe_transition": "A->B",
  "prereq_met": false,
  "timeline": [ {"drug": "...", "prereq_met": <bool>, "post_scores": {...}, "universe": "A|B", "notes": "..."} ],
  "delta_summary": { "...score_key...": <post-pre float>, "IMMUNE_ACCESS_delta": 0.3675 },
  "reference_anchor": {
    "label": "PLATINUM_WINDOW_KM_MEDIAN_OS",
    "value_months": 84.13,
    "n": 9,
    "events": 5,
    "role": "cohort_anchor_not_patient_prediction"
  },
  "disclaimers": ["RUO", "not_clinical_decision_support", "not_validated_predictive_biomarker", "IMMUNE_ACCESS_external_AUROC_NOT_SUPPORTED"]
}
```

### Hard invariants (enforced by tests)
- `predicted_os_months` / `predicted_survival` never appear anywhere in a `CaseResolution`.
- `84.13` appears **exactly once**, only inside `reference_anchor.value_months`, with
  `role = "cohort_anchor_not_patient_prediction"`.
- `reproduction_basis` is the Lazarus simulator string; `GSE102073_fitted_model` never appears.
- `universe` label uses the hardcoded design constant IMMUNE_ACCESS threshold `0.40`.
- `delta_summary` = per-key `post − pre`, plus explicit `IMMUNE_ACCESS_delta`; `universe_transition` records the A/B move.
