"""
RES-OV-P0-006 acceptance test: ctDNA is wired into Prophet as PROGNOSTIC-ONLY.

Proves:
  1. detect_ctdna_mrd_signal emits a ResistanceSignalData with detected=False
     (structurally excluded from the routing probability/count) but carries the
     reproduced ctDNA tier + provenance ctdna_status=WIRED_PROGNOSTIC_ONLY_V1.
  2. TF+PF High/High input maps to group 2 / tier HIGH (Paracchini et al. reproduction).
  3. A full predict_resistance() call WITH ctDNA HIGH produces the SAME resistance
     probability and risk_level as WITHOUT ctDNA -> ctDNA never changes routing.
  4. The ctDNA signal is present in signals_detected either way (surfaced to clinician).
"""
import asyncio
import sys, os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from layer1_engines.resistance_prophet.signals import ovarian
from layer1_engines.resistance_prophet.resistance_prophet_service import ResistanceProphetService
from layer1_engines.resistance_prophet.schemas import ResistanceSignal


def test_ctdna_signal_prognostic_only_high():
    sig = asyncio.run(ovarian.detect_ctdna_mrd_signal(
        {"tumor_fraction": 40.0, "proportion_fragments": 0.25}  # High/High
    ))
    assert sig.signal_type == ResistanceSignal.MRD_CTDNA
    assert sig.detected is False, "ctDNA must be prognostic-only (detected=False)"
    assert sig.probability == 0.0 and sig.confidence == 0.0
    assert sig.provenance["ctdna_status"] == "WIRED_PROGNOSTIC_ONLY_V1"
    assert sig.provenance["influences_routing"] is False
    assert sig.provenance["tier"] == "HIGH"
    assert sig.provenance["group"] == 2


def test_ctdna_signal_absent_when_no_input():
    sig = asyncio.run(ovarian.detect_ctdna_mrd_signal(None))
    assert sig.detected is False
    assert sig.provenance["ctdna_status"] == "WIRED_PROGNOSTIC_ONLY_V1"
    assert sig.provenance["input_present"] is False


def test_ctdna_does_not_change_routing():
    svc = ResistanceProphetService()

    common = dict(
        patient_id="TEST-OV-1",
        disease_type="ovarian_cancer",
        current_sae_features={"dna_repair_deficiency": 0.2, "source": "test"},
        baseline_sae_features={"dna_repair_deficiency": 0.9, "source": "patient_baseline"},
        treatment_history=[{"regimen": "carboplatin+paclitaxel"}],
        current_drug_class="PARP_INHIBITOR",
        mutations=[{"gene": "BRCA1", "variant": "reversion"}],
        return_object=True,
        is_post_treatment=True,
    )

    pred_no = asyncio.run(svc.predict_resistance(**common))
    pred_hi = asyncio.run(svc.predict_resistance(
        **common,
        ctdna_context={"tumor_fraction": 45.0, "proportion_fragments": 0.28},  # High/High
    ))

    # Routing invariants: probability + risk level identical with/without ctDNA.
    assert abs(pred_no.probability - pred_hi.probability) < 1e-9, (
        f"ctDNA changed probability: {pred_no.probability} -> {pred_hi.probability}"
    )
    assert pred_no.risk_level == pred_hi.risk_level, "ctDNA changed risk level (routing)"

    # But the ctDNA signal IS surfaced (present in signals_detected) when provided.
    ctdna_sigs = [s for s in pred_hi.signals_detected if s.signal_type == ResistanceSignal.MRD_CTDNA]
    assert len(ctdna_sigs) == 1
    assert ctdna_sigs[0].provenance["tier"] == "HIGH"
    assert ctdna_sigs[0].detected is False


if __name__ == "__main__":
    test_ctdna_signal_prognostic_only_high()
    test_ctdna_signal_absent_when_no_input()
    test_ctdna_does_not_change_routing()
    print("ALL ctDNA prognostic-only wiring tests PASSED")
