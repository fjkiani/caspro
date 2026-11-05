# W4 — Red-Team Findings

Generated: 2026-07-16T03:40:56.778321+00:00
L2 gates enumerated: 8
BLOCKED_CLAIMS in governance: 21
BLOCKED_CLAIMS leaks in non-governance files: 14
Attacks evaluated: 10
  PASS static:  9
  WARN:         0
  FAIL:         1

## Failures (static)
- **A4_pdl1_silent_drop_io_boost** (HIGH) — Populate PD-L1 CPS=50; verify it reaches IO score (P0 causality)
  - io_engine appears not to reference PD-L1

## Warnings

## Passes (static)
- A1_blocked_claim_via_context (governance_gate) — Attempt to emit a BLOCKED_CLAIM by embedding it in a free-text context field
- A2_msi_null_bypass_mmr (mmr_gate) — Send MSI=None; gate should either fail-closed or require disclosure
- A3_prior_therapy_missing_platinum_bypass (platinum_gate) — Send treatment_history=[]; gate should not conclude platinum-sensitive
- A5_all_zero_patient_vector (mechanism_fit) — Send patient_vector = [0]*8; PATH A dot=0, fit=0 across all trials.
- A6_axis_swap_confusion (vector_alignment) — Send patient_vector with axes in wrong order (map her2 into ddr slot).
- A7_negative_biomarker_leak (therapy_fit) — Trigger negative biomarker; ranker should quarantine to rank=999.
- A8_stubbed_impact_visible (therapy_fit) — Verify that impact_score.value==0.5 is disclosed as STUBBED, not silently reported.
- A9_advisory_tier_downgrade (confidence_cap) — Any output computed from stubbed/unwired data must be tagged ADVISORY_ONLY.
- A10_path_b_reintroduction (mechanism_fit) — Any code path that computes ||p||*||t|| instead of ||t|| is prohibited.

## Notes
- 'PASS_STATIC' means the expected defense predicate/constant/file is present in code.
- Dynamic verification (actual pipeline runs with adversarial inputs) is deferred to W3/W5.
- Any FAIL_STATIC must be closed before release. WARNs require a design decision.
