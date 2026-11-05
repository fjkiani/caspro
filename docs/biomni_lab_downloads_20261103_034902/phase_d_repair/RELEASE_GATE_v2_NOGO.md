# Release Gate v2 — Phase D Remediation

## Verdict

**NOGO for clinical-facing, patient-facing, or trial-recommendation-facing outputs.**

Approved:
- **RESEARCH_ONLY** exploration of the mechanism-fit ranker within the 42-trial scored population.
- **SAFE_TO_DEMO** exposure of the ovarian and melanoma IO gate as exploratory context.
- **SAFE_FOR_PRODUCTION** input validation, unsupported-lineage refusal, empty-vector handling.

This gate **retracts** the earlier SHIP verdict from this session. Six audit findings drove the retraction; five are fixed in code, one is disclosed and blocked at the surface layer.

Repository HEAD at gate time: `4f1748a6194436c560a5388c7576cde087985948` (pre-remediation baseline was `965ed20bce652aff7eb078f3c0e839f03bddc5ca`).

---

## P0 Blockers

| # | Issue | Severity | Affected routes | Containment | Release condition |
|---|-------|----------|-----------------|-------------|-------------------|
| P0-B1 | `eligibility_score` was a `0.75` placeholder. Mechanism-fit ranker does NOT evaluate line/stage/comorbidity/prior-therapy eligibility. | P0 | `resolve_case().engines.mechanism_fit.top_options`, `/api/resolve`, `/api/analyze_patient` | `top_options` now emits `eligibility_status=NOT_EVALUATED` and NO `eligibility_score` field. EXT F1/F2 assert both. | Introduce a real eligibility scorer with unit tests before an `eligibility_score` may reappear. |
| P0-B2 | `p_resp` is a rule-based heuristic `clip(0.10 + 0.70·io_axis, 0.05, 0.85)`, not a fitted response model. | P0 | `io_engine.p_resp` in every route that emits it | `p_resp_status = "RULE_BASED_HEURISTIC"`. `p_resp_prohibited_uses` explicitly forbids `patient_level_response_probability_claim`, `therapy_recommendation`, `benefit_risk_decision`, `trial_ranking_tiebreaker`. `p_resp_allowed_uses = ["exploratory_mechanism_context_only"]`. Unsupported lineages return `p_resp=None`. | Replace with a calibrated predictor whose Brier score, calibration curve, and subgroup performance are held out. |
| P0-B3 | `trials_scored=42` reflects the joined mechanism-fit scoring surface, NOT the clinical trial universe. | P0 | `mechanism_fit.top_options`, `/api/resolve` | W2B coverage: 2,979 trials total, 283 MoA vectors, 160 oncology-populated, **42 Path-A scoreable after join**. Consumers must render `scoring_population_size`, not "best trial". | Grow the scoring population with per-lineage minimums. Every ranking payload must carry `scoring_population_size` and eligibility coverage of the scored subset. |

## P1 Quarantined Features

| # | Issue | User impact | Containment |
|---|-------|-------------|-------------|
| P1-Q1 | Tie arbitration deterministic but not informative (HGSOC/TNBC tier-1 tie_size=4; MSI-H ovarian tie_size=11). Ranker breaks ties by `nct_id` ASC. | Rank=1 within a tier says only "this NCT sorts earliest among ties". | PC-02 tie-safe asserts on `(tier, tier_position, clipped_fit, tie_size_at_tier_1)`. Exact rank is not a success criterion. Consumer surfaces MUST render tier-1 trials as a co-equal set. |
| P1-Q2 | STC-1010 anchor **NCT03579316 is at tier=6, position=9, fit=0.348** for the MSS+KRAS_G12C+liver-met patient. | STC-1010 does not lead the ranking for its own patient class. | PC-02 tie-safe reports `STRICT_FAIL` for this anchor. No output masks the low position. Enrich MSS-CRC mechanism vector (haptenation, MSS-specific IO adjuvants) OR confirm the anchor is not expected to lead. |
| P1-Q3 | LATIFY delta features remain quarantined per PATH A governance decision (2026-04-28). | Any consumer relying on LATIFY deltas may see values not reproduced end-to-end. | Not resolved in this remediation. Requires `retroactive_prediction_run.py --trial-vectors` and reconciliation with CT-03 / DL-05 / PC-06. |

---

## Feature Classification

| Class | Feature |
|-------|---------|
| **BLOCKED** | `eligibility_scoring` — feature is not implemented; placeholder removed |
| **BLOCKED** | `p_resp_patient_level_probability` — not a fitted model; heuristic-only |
| **BLOCKED** | `trial_recommendation` — ranker scores mechanism-fit within 42 scored trials, not the trial universe |
| **RESEARCH_ONLY** | `mechanism_fit_ranking_within_scored_set` — PC-02 4/5 anchors pass tier<=2 + fit>=0.20 + primary axis populated |
| **RESEARCH_ONLY** | `patient_vector_axes_from_biomarkers` — 18/18 W1B counterfactuals pass; P0/P1 rules fire deterministically |
| **SAFE_TO_DEMO** | `io_regimen_gate_ovarian` (`neopembrov_nactp`) — thresholds + provenance populated |
| **SAFE_TO_DEMO** | `io_regimen_gate_melanoma` (`nivo_monotherapy_melanoma`) — thresholds + provenance populated |
| **SAFE_FOR_PRODUCTION** | `io_gate_unsupported_lineage_refusal` — FAIL_CLOSED / NOT_APPLICABLE with p_resp=None, regimen=None |
| **SAFE_FOR_PRODUCTION** | `input_validation_reject` — Pydantic ValidationError on malformed somatic; empty vector routes cleanly |

---

## Measured Evidence

**Executed baseline (not asserted).** PRE commit `965ed20` — `_run_mechanism_fit` returned `{mutations_analyzed, ranker_ready}` (ranker never ran); `_run_io_engine` hardcoded `p_resp=0.15, regimen=neopembrov_nactp` for every patient regardless of lineage or biomarkers.

| Anchor | PRE io_gate | PRE p_resp | PRE regimen | PRE trials_scored | POST io_gate | POST p_resp | POST regimen | POST trials_scored |
|--------|-------------|------------|-------------|-------------------|--------------|-------------|--------------|--------------------|
| A_HGSOC_HRDlow | RULE_OUT | None* | None* | None | RULE_OUT | 0.10 | neopembrov_nactp | 42 |
| B_MSS_CRC_STC1010 | RULE_OUT | None* | None* | None | NOT_APPLICABLE | None | None | 42 |
| C_HER2plus_gastric | RULE_OUT | None* | None* | None | NOT_APPLICABLE | None | None | 42 |
| D_TNBC_BRCA1_germline | RULE_OUT | None* | None* | None | NOT_APPLICABLE | None | None | 42 |
| E_MSI_H_OVARIAN | RULE_OUT | None* | None* | None | JUSTIFIED | 0.765 | neopembrov_nactp | 42 |

\* Pre-remediation `_run_io_engine` returned only `{risk_benefit_gate, rationale}`. The hardcoded values `p_resp=0.15, regimen="neopembrov_nactp"` were passed **into** `evaluate_io_risk_benefit` for every patient regardless of lineage or biomarkers, but were **not surfaced** on the wire — so the executed baseline shows `p_resp=None, regimen=None` in the PRE column. Verbatim source at commit `965ed20`:

```python
def _run_io_engine(self, patient: PatientState) -> dict:
    from layer1_engines.io_engine.io_risk_benefit_gate import evaluate_io_risk_benefit
    try:
        result = evaluate_io_risk_benefit(p_resp=0.15, regimen_key="neopembrov_nactp")
        return {"risk_benefit_gate": result.decision,
                "rationale": result.rationale if hasattr(result, "rationale") else None}
    except Exception as e:
        return {"risk_benefit_gate": "INDETERMINATE", "error": str(e)}
```

Meaning: (a) every patient triggered the same regimen template (`neopembrov_nactp` ovarian NACT+P) regardless of lineage; (b) every patient was scored with the same rule-based `p_resp=0.15`; (c) the value was invisible to the caller. Fixes P0-B2 (labelling) and #2 in the finding list (regimen fallback) both remove this defect. `trials_scored` shows `None` for PRE because `_run_mechanism_fit` at `965ed20` returned only `{mutations_analyzed, ranker_ready}` — the ranker was never invoked.

**Counterfactual + fixture + registry evidence.**

- W1B counterfactuals: **18/18 PASS** (P0/P1 axis-motion rules).
- W2B registry drift: **3/3 PASS** — SQLite is sole runtime source; planted legacy JSON is rejected at boot.
- W3B dynamic bench: **5/5 PASS**. W3B red-team: **10/10 PASS** (including planted registry, malformed input, unknown lineage, contradictory MSI-H + MSS_confirmed, string CPS, negative CPS).
- EXT fixture suite: **7/7 PASS** — HGSOC, MSS-CRC+liver+CPS50, HER2+ gastric, melanoma, unsupported lineage, malformed somatic, empty vector.
- PC-02 tie-safe: **4/5 STRICT_PASS**. `B_MSS_CRC_STC1010` STRICT_FAIL (tier=6) preserved as honest failure.

**PC-02 tie-safe per-anchor:**

| Anchor | Verdict | Tier | Position | Clipped fit | Tier-1 tie size |
|--------|---------|------|----------|-------------|-----------------|
| A_HGSOC_HRDlow | STRICT_PASS | 1 | 3 | 0.582086 | 4 |
| B_MSS_CRC_STC1010 | **STRICT_FAIL** | 6 | 9 | 0.347937 | 1 |
| C_HER2+_gastric | STRICT_PASS | 1 | 2 | 0.800000 | 2 |
| D_TNBC_BRCA1 | STRICT_PASS | 1 | 3 | 0.582086 | 4 |
| E_MSI_H_OVARIAN | STRICT_PASS | 1 | 1 | 0.950000 | 11 |

---

## What Callers May Do Today

1. Explore mechanism-fit vectors and axis provenance for a patient case.
2. Read `io_engine.risk_benefit_gate` for the two registered lineages (ovarian, melanoma) **as exploratory context only**.
3. Inspect ranking within the 42-trial scored population as a **mechanism-fit ordering**, treating `tier` + `tier_position` (not rank) as the signal.
4. Verify unsupported lineages return `NOT_APPLICABLE` with `p_resp=None` and no regimen.
5. Run W1B / EXT / PC-02 tie-safe against any subsequent build to detect regressions.

## What Callers Must NOT Be Led To Believe

1. That `top_options` are clinically eligible trials for this patient.
2. That `io_engine.p_resp` is a patient-level probability of response.
3. That `p_resp` may be used to tie-break trial ranking on any consumer surface.
4. That any `eligibility_score` field is meaningful. **It has been removed from the code path.**
5. That `rank=1` is clinically meaningful when `tier_position=1` co-occurs with `tie_size > 1`.
6. That LATIFY delta features are safe to consume before `retroactive_prediction_run.py --trial-vectors` reconciles CT-03 / DL-05 / PC-06.

---

## Artifacts

- `RELEASE_GATE_v2_NOGO.json` — machine-readable gate
- `W1B_counterfactual_report.json` — 18/18 P0 counterfactuals
- `W2B_registry_and_drift.json` — SQLite-only, drift-guarded, 42 scoreable trials
- `PC02_tiesafe_receipts.json` — 4/5 anchors pass tier-based strict criterion
- `W3B_dynamic_report.json` — 5/5 bench + 10/10 red-team
- `EXT_fixture_report.json` — 7/7 extended fixtures
- `BASELINE_executed_deltas.json` — subprocess-executed PRE (`965ed20`) vs POST (`4f1748a`)
- `patient_vector_builder.py`, `registry_contract.py` — runtime source (committed to repo)
