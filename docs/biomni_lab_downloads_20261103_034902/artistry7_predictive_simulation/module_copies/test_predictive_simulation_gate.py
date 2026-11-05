"""
PREDICTIVE_REPROGRAMMING_SIMULATION — feature-flag integration tests.

Scope: the ARTISTRY-7 Lazarus reprogramming SIMULATION is an OBSERVABLE,
DEFAULT-OFF, RUO / hypothesis-only block on CaseResolution. These tests prove:

  1. Default OFF: simulated_predictive_outcome is "disabled"; prognostic path intact.
  2. Ineligible TIER_3: gates fail (tier, tier_refined, platinum_window).
  3. Ineligible TIER_1B_CAGED: gates fail (tier_refined, platinum_window); tier passes.
  4. Eligible window patient: simulation runs; NO patient predicted_os_months anywhere;
     84.13 appears ONLY in reference_anchor with role='cohort_anchor_not_patient_prediction'.
  5. Prognostic-integrity snapshot: prognostic_baseline + engines + ranked_interventions
     + evidence_receipts are byte-identical whether the flag is ON or OFF.
  6. Determinism + provenance stamp: repeated runs give identical scores/universe; the
     provenance carries the simulator SHA-256 + data-room commit; reproduction_basis is
     the Lazarus simulator (NOT a GSE102073 fitted model).

Fixtures are REAL patients (one row = one real patient) extracted from
crispro_lazarus_output.csv into tests/fixtures/artistry7/pinned_rows.json.

Locked facts these tests defend (do not re-litigate):
  * TCGA hgsoc n=427 3-tier log-rank p~0.003819 -> PROGNOSTIC only.
  * TIER_1A vs 1B log-rank p~0.126 (NS): access does not dictate survival.
  * PLATINUM_WINDOW KM median ~84.13 mo = n=9/5 events -> cohort anchor, never a patient OS.
  * IMMUNE_ACCESS external AUROC is NOT-SUPPORTED (in-house GSE30161+GSE63885).
"""
import os
import json
from pathlib import Path

import pytest

from layer0_contracts.case_resolution import CaseResolution, GateResult
from layer3_orchestrator.case_resolver import resolve

# ---- real-patient fixtures ---------------------------------------------------
_FIXTURE = Path(__file__).resolve().parents[1] / "fixtures" / "artistry7" / "pinned_rows.json"
_ROWS = json.loads(_FIXTURE.read_text())

ELIGIBLE = "TCGA-04-1517-01"        # TIER_1_TRIPLE / TIER_1A_ACCESSIBLE / PLATINUM_WINDOW=True
INELIGIBLE_TIER3 = "TCGA-04-1331-01"    # TIER_3_NONE
INELIGIBLE_TIER1B = "TCGA-04-1337-01"   # TIER_1_TRIPLE but TIER_1B_CAGED, window False


def _row(sample_id):
    return dict(_ROWS[sample_id])


def _resolve(**kwargs):
    """resolve() with harmless required positional args; kwargs drive the sim path."""
    return resolve(
        patient_summary="test-case",
        gates={"g": GateResult(status="PASS")},
        engines={},
        ranked_interventions=[],
        missing_data=[],
        next_best_test=None,
        confidence_level="L1",
        **kwargs,
    )


@pytest.fixture(autouse=True)
def _clear_env():
    """Ensure the env flag never leaks between tests."""
    os.environ.pop("PREDICTIVE_SIMULATION_MODE", None)
    yield
    os.environ.pop("PREDICTIVE_SIMULATION_MODE", None)


# ============================================================================
# Test 1 — DEFAULT OFF
# ============================================================================
class TestDefaultOff:
    def test_flag_off_simulation_disabled_and_no_leak(self):
        """No flag anywhere -> simulated_predictive_outcome disabled; no simulation content leaks."""
        res = _resolve(artistry7_row=_row(ELIGIBLE))
        spo = res.simulated_predictive_outcome
        assert spo == {"status": "disabled"}, spo
        # Nothing from the simulated payload should be present.
        blob = json.dumps(res.model_dump(), default=str)
        assert "simulated_predictive_reprogramming" not in blob
        assert "universe_transition" not in blob
        assert "run_id" not in blob

    def test_backward_compatible_no_kwargs(self):
        """Existing callers passing no ARTISTRY-7 kwargs get None / disabled and nothing else."""
        res = _resolve()
        assert res.prognostic_baseline is None
        assert res.simulated_predictive_outcome == {"status": "disabled"}

    def test_prognostic_baseline_present_even_when_flag_off(self):
        """prognostic_baseline is independent of the flag and marked prognostic-only."""
        res = _resolve(artistry7_row=_row(ELIGIBLE))
        pb = res.prognostic_baseline
        assert pb is not None
        assert pb["evidence_status"] == "prognostic_association"
        assert pb["tier"] == "TIER_1_TRIPLE"


# ============================================================================
# Test 2 — INELIGIBLE (TIER_3)
# ============================================================================
class TestIneligibleTier3:
    def test_tier3_ineligible_all_gates_fail(self):
        res = _resolve(artistry7_row=_row(INELIGIBLE_TIER3), predictive_simulation_flag=True)
        spo = res.simulated_predictive_outcome
        assert spo["status"] == "ineligible"
        failed = {f["gate"] for f in spo["gate_failures"]}
        assert failed == {"tier", "tier_refined", "platinum_window"}, failed
        # No simulation math on an ineligible case.
        assert "post_scores" not in spo
        assert "RUO" in spo["disclaimers"]


# ============================================================================
# Test 3 — INELIGIBLE (TIER_1B_CAGED)
# ============================================================================
class TestIneligibleTier1B:
    def test_tier1b_ineligible_tier_passes_refined_and_window_fail(self):
        res = _resolve(artistry7_row=_row(INELIGIBLE_TIER1B), predictive_simulation_flag=True)
        spo = res.simulated_predictive_outcome
        assert spo["status"] == "ineligible"
        failed = {f["gate"] for f in spo["gate_failures"]}
        # It IS TIER_1_TRIPLE, so the tier gate passes; caged + no window fail.
        assert "tier" not in failed
        assert failed == {"tier_refined", "platinum_window"}, failed
        # Confirm the actual/expected are reported for the caged gate.
        refined = next(f for f in spo["gate_failures"] if f["gate"] == "tier_refined")
        assert refined["expected"] == "TIER_1A_ACCESSIBLE"
        assert refined["actual"] == "TIER_1B_CAGED"


# ============================================================================
# Test 4 — ELIGIBLE: simulation runs, NO patient OS anywhere, anchor is labeled
# ============================================================================
class TestEligibleSimulation:
    def test_eligible_runs_and_transitions_universe(self):
        res = _resolve(artistry7_row=_row(ELIGIBLE), predictive_simulation_flag=True)
        spo = res.simulated_predictive_outcome
        assert spo["status"] == "simulated_predictive_reprogramming"
        assert spo["sequence"] == ["METFORMIN", "DUPILUMAB", "CHECKPOINT_INHIBITOR"]
        assert spo["universe_before"] == "A"
        assert spo["universe_after"] == "B"
        assert spo["universe_transition"] == "A->B"
        # IMMUNE_ACCESS moves up but is a SCORE shift, not survival.
        assert spo["delta_summary"]["IMMUNE_ACCESS_delta"] > 0

    def test_no_patient_predicted_os_anywhere(self):
        """HARD INVARIANT: the 84.13-mo KM median must never be a patient prediction."""
        res = _resolve(artistry7_row=_row(ELIGIBLE), predictive_simulation_flag=True)
        full = res.model_dump()
        blob = json.dumps(full, default=str)

        # No predicted-OS field is ever emitted for a patient object.
        assert "predicted_os_months" not in blob
        assert "predicted_survival" not in blob

        spo = res.simulated_predictive_outcome
        # 84.13 exists ONLY inside reference_anchor, and only as a labeled cohort anchor.
        assert blob.count("84.13") == 1
        anchor = spo["reference_anchor"]
        assert anchor["role"] == "cohort_anchor_not_patient_prediction"
        assert anchor["value_months"] == 84.13
        assert anchor["n"] == 9 and anchor["events"] == 5
        # reproduction_basis is the simulator, NOT a fitted survival model on n=9.
        assert spo["reproduction_basis"] == "artistry7_sequence_B_lazarus_simulator"
        assert "GSE102073_fitted_model" not in blob
        # RUO disclaimers, including the NOT-SUPPORTED external AUROC caveat.
        assert "not_validated_predictive_biomarker" in spo["disclaimers"]
        assert "IMMUNE_ACCESS_external_AUROC_NOT_SUPPORTED" in spo["disclaimers"]

    def test_prereq_flag_is_faithful_control_failure_signal(self):
        """CHECKPOINT prereq is evaluated pre-boost -> False for this patient (ARTISTRY-7 control failure mode)."""
        res = _resolve(artistry7_row=_row(ELIGIBLE), predictive_simulation_flag=True)
        spo = res.simulated_predictive_outcome
        # The simulator reports prereq_met=False even though the universe ends in B,
        # matching the source-of-truth simulator (IO applied before access window fully open).
        assert spo["prereq_met"] is False


# ============================================================================
# Test 5 — PROGNOSTIC INTEGRITY SNAPSHOT (flag ON vs OFF)
# ============================================================================
class TestPrognosticIntegritySnapshot:
    def _snap(self, res):
        d = res.model_dump()
        return {
            "prognostic_baseline": d["prognostic_baseline"],
            "engines": d["engines"],
            "ranked_interventions": d["ranked_interventions"],
            "evidence_receipts": d["evidence_receipts"],
            "gates": d["gates"],
            "confidence_level": d["confidence_level"],
        }

    def test_prognostic_and_core_identical_flag_on_vs_off(self):
        row = _row(ELIGIBLE)
        off = self._snap(_resolve(artistry7_row=dict(row)))
        on = self._snap(_resolve(artistry7_row=dict(row), predictive_simulation_flag=True))
        assert json.dumps(off, sort_keys=True, default=str) == json.dumps(on, sort_keys=True, default=str), \
            "Flipping the predictive-simulation flag must NOT change prognostic_baseline or core case fields."

    def test_env_flag_channel_also_enables(self):
        """Env PREDICTIVE_SIMULATION_MODE enables the simulation independent of the kwarg."""
        os.environ["PREDICTIVE_SIMULATION_MODE"] = "true"
        res = _resolve(artistry7_row=_row(ELIGIBLE))
        assert res.simulated_predictive_outcome["status"] == "simulated_predictive_reprogramming"
        # And prognostic is still identical to the flag-off snapshot.
        os.environ.pop("PREDICTIVE_SIMULATION_MODE", None)
        off = _resolve(artistry7_row=_row(ELIGIBLE))
        assert json.dumps(res.prognostic_baseline, sort_keys=True, default=str) == \
            json.dumps(off.prognostic_baseline, sort_keys=True, default=str)


# ============================================================================
# Test 6 — DETERMINISM + PROVENANCE STAMP
# ============================================================================
class TestDeterminismAndProvenance:
    def test_repeated_runs_identical_scores(self):
        r1 = _resolve(artistry7_row=_row(ELIGIBLE), predictive_simulation_flag=True).simulated_predictive_outcome
        r2 = _resolve(artistry7_row=_row(ELIGIBLE), predictive_simulation_flag=True).simulated_predictive_outcome
        # Deterministic math: scores/universe identical across runs...
        assert r1["post_scores"] == r2["post_scores"]
        assert r1["delta_summary"] == r2["delta_summary"]
        assert r1["universe_transition"] == r2["universe_transition"]
        # ...only run_id (uuid4) and timestamp differ.
        assert r1["run_id"] != r2["run_id"]

    def test_provenance_stamp_complete(self):
        spo = _resolve(artistry7_row=_row(ELIGIBLE), predictive_simulation_flag=True).simulated_predictive_outcome
        for key in (
            "status", "mathematical_integrity", "reproduction_basis", "flag_value",
            "script_path", "code_sha256", "dataroom_commit", "input_sample_id", "run_id",
        ):
            assert key in spo, f"missing provenance key: {key}"
        assert spo["mathematical_integrity"] == "deterministic_hypothesis"
        assert spo["flag_value"] is True
        assert spo["input_sample_id"] == ELIGIBLE
        # SHA-256 is 64 hex chars; data-room commit is a git SHA.
        assert len(spo["code_sha256"]) == 64
        assert spo["code_sha256"] == "aeee8b543bde0cbeff101b0343dc2743b99ef61c4f969cd78776d6e47648535b"
        assert spo["dataroom_commit"] == "a54b8a11be7d0f1a58be256ade38b313408e0b11"
