"""
RES-OV-P0-009 acceptance test: dead KELIM Signal 6 now fires.

Before the fix, detect_kelim_genotype_convergence read kelim_obj.kelim, which is
always None after the P0-005 rename (the log-linear shim populates kelim_obj.k).
The signal was therefore silently inoperative.

Proves:
  1. With a timing_context whose KelimCa125.k is populated (kelim=None, as the shim
     produces), the signal computes a probability and reports which field it used.
  2. Provenance records kelim_field_used='k ...' and signal6_status WIRED_ACTIVE.
  3. An unfavorable (low K) BRCA-mutant patient crosses the detection threshold,
     i.e. the signal is capable of firing (detected=True), not permanently dead.
  4. Fallback: if only .kelim is set (legacy), it is still read.
"""
import asyncio
import sys, os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from layer1_engines.resistance_prophet.signals import ovarian
from layer1_engines.resistance_prophet.contracts import (
    PatientRegimenFeatureTable, RegimenFeatureRow, TimingFeatures,
    ChemosensitivityFeatures, KelimCa125, TimingDataQuality,
    TimingContextProvenance, TimingContextInputsUsed,
)
from datetime import datetime


def _make_timing_context(k=None, kelim=None):
    kobj = KelimCa125(k=k, kelim=kelim, category="unfavorable",
                      modeling_approach="local_log_linear_shim", time_window_days=100)
    chemo = ChemosensitivityFeatures(kelim_ca125=kobj, ca125_measurements_used=4)
    dq = TimingDataQuality(has_regimen_history=True, has_ca125_data=True, warnings=[])
    reg = RegimenFeatureRow(
        regimen_id="R1", regimen_name=None, regimen_class="platinum",
        start_date=None, end_date=None,
        timing_features=TimingFeatures(), chemosensitivity_features=chemo, data_quality=dq,
    )
    prov = TimingContextProvenance(
        computed_at=datetime.now(), engine="test",
        ruo_disclaimer="test", inputs_used=TimingContextInputsUsed(source="precomputed_ca125_features"),
    )
    return PatientRegimenFeatureTable(
        schema_version="patient_regimen_feature_table.v1",
        patient_id="TEST", disease_type="ovarian_cancer",
        regimens=[reg], provenance=prov,
    )


def test_signal6_reads_k_field():
    # Unfavorable KELIM (low K) + BRCA mutant -> should compute high risk and fire.
    tc = _make_timing_context(k=0.3, kelim=None)
    sig = asyncio.run(ovarian.detect_kelim_genotype_convergence(
        [{"gene": "BRCA1"}], timing_context=tc
    ))
    assert sig.provenance.get("status") != "missing_kelim", "Signal 6 still dead (read None)"
    assert sig.provenance["kelim_field_used"].startswith("k "), sig.provenance["kelim_field_used"]
    assert sig.provenance["signal6_status"] == "WIRED_ACTIVE_SIMULATION_ANCHORED"
    assert sig.provenance["kelim_k"] == 0.3
    assert sig.detected is True, f"Expected fire on unfavorable K; prob={sig.probability}"
    assert 0.0 < sig.probability <= 1.0


def test_signal6_kelim_fallback():
    # Legacy path: only .kelim populated -> still read.
    tc = _make_timing_context(k=None, kelim=0.3)
    sig = asyncio.run(ovarian.detect_kelim_genotype_convergence(
        [{"gene": "BRCA1"}], timing_context=tc
    ))
    assert sig.provenance["kelim_field_used"].startswith("kelim"), sig.provenance["kelim_field_used"]
    assert sig.provenance["kelim_k"] == 0.3


def test_signal6_missing_when_no_kelim():
    tc = _make_timing_context(k=None, kelim=None)
    sig = asyncio.run(ovarian.detect_kelim_genotype_convergence(
        [{"gene": "BRCA1"}], timing_context=tc
    ))
    assert sig.detected is False
    assert sig.provenance.get("status") == "missing_kelim"


if __name__ == "__main__":
    test_signal6_reads_k_field()
    test_signal6_kelim_fallback()
    test_signal6_missing_when_no_kelim()
    print("ALL KELIM Signal 6 (RES-OV-P0-009) tests PASSED")
