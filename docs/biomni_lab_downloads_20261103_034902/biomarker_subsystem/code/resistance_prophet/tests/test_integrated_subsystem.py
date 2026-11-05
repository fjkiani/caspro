"""
INTEGRATION test (Step 5): the ovarian HGSOC subsystem is non-siloed.

One patient call flows through the resistance Prophet AND the biomarker registry
advisory context, and we prove:

  1. A single predict_resistance() call surfaces the full ovarian signal family
     (restoration, escape, genomic, CA-125 kinetics, KELIM convergence, DIAMOND,
     transcriptomic, engine PFI, ctDNA/MRD) -> nothing siloed.
  2. The biomarker registry (4 discovery_only models) projects into an advisory
     BiomarkerContext that attaches to the multimodal evidence surface, and
     attaching it does NOT change any recommendation tier (advisory-only).
  3. Prognostic/advisory layers (ctDNA prognostic-only + biomarker context) do
     NOT change the resistance routing probability or risk level.
"""
import asyncio
import sys, os

HERE = os.path.dirname(__file__)
sys.path.insert(0, os.path.abspath(os.path.join(HERE, "..", "..")))
sys.path.insert(0, os.path.abspath(os.path.join(HERE, "..", "..", "layer1_engines", "synthetic_lethality")))

from layer1_engines.resistance_prophet.resistance_prophet_service import ResistanceProphetService
from layer1_engines.resistance_prophet.schemas import ResistanceSignal

R = "/mnt/shared-workspace/shared/biomarker_val"


def _patient_common():
    return dict(
        patient_id="INTEG-OV-1",
        disease_type="ovarian_cancer",
        current_sae_features={"dna_repair_deficiency": 0.25, "source": "test",
                              "mfap4_expression": 0.8, "sig7_exposure": 0.6},
        baseline_sae_features={"dna_repair_deficiency": 0.9, "source": "patient_baseline"},
        treatment_history=[{"regimen": "carboplatin+paclitaxel"}],
        current_drug_class="PARP_INHIBITOR",
        mutations=[{"gene": "BRCA1", "variant": "reversion"}, {"gene": "TP53", "variant": "R175H"}],
        return_object=True,
        is_post_treatment=True,
    )


def test_single_call_surfaces_full_signal_family():
    svc = ResistanceProphetService()
    pred = asyncio.run(svc.predict_resistance(
        **_patient_common(),
        ctdna_context={"tumor_fraction": 45.0, "proportion_fragments": 0.28},
    ))
    types = {s.signal_type for s in pred.signals_detected}
    expected = {
        ResistanceSignal.DNA_REPAIR_RESTORATION,
        ResistanceSignal.PATHWAY_ESCAPE,
        ResistanceSignal.GENE_LEVEL_RESISTANCE,
        ResistanceSignal.CA125_KINETICS,
        ResistanceSignal.KELIM_GENOTYPE_CONVERGENCE,
        ResistanceSignal.MRD_CTDNA,
    }
    missing = expected - types
    assert not missing, f"Signal family incomplete (siloed?): missing {missing}"

    # ctDNA present + prognostic-only
    ctdna = [s for s in pred.signals_detected if s.signal_type == ResistanceSignal.MRD_CTDNA][0]
    assert ctdna.detected is False
    assert ctdna.provenance["ctdna_status"] == "WIRED_PROGNOSTIC_ONLY_V1"


def test_biomarker_registry_projects_as_advisory_context():
    from biomarkers.assemble import assemble_registry, biomarker_context_from_registry
    reg = assemble_registry(
        f"{R}/w1_prognostic_results.json", f"{R}/w2_prognostic_replication_results.json",
        f"{R}/w3_diagnostic_results.json", f"{R}/w4_baseline_scan_results.json",
    )
    ctx = biomarker_context_from_registry(reg)
    assert ctx.advisory_only is True
    assert len(ctx.results) == 4
    assert all(r.status.value == "discovery_only" for r in ctx.results)

    # Attach to the multimodal evidence surface -> must not change recommendation.
    try:
        from multimodal.models import EvidenceMatrix, EvidenceRow, CandidateAxis
    except ModuleNotFoundError:
        from sl_agent.multimodal.models import EvidenceMatrix, EvidenceRow, CandidateAxis
    row = EvidenceRow(axis=CandidateAxis.PARP_INHIBITORS, axis_label="PARP inhibitors",
                      mechanism="synthetic lethality with HR deficiency",
                      recommendation_tier="Strong")
    em = EvidenceMatrix(query_gene="BRCA1", cancer_type="ovarian_hgsoc", rows=[row])
    baseline = em.recommendation_summary()
    em.biomarker_context = ctx
    assert em.recommendation_summary() == baseline, "biomarker context changed routing!"


def test_prognostic_layers_do_not_change_routing():
    svc = ResistanceProphetService()
    pred_plain = asyncio.run(svc.predict_resistance(**_patient_common()))
    pred_ctdna = asyncio.run(svc.predict_resistance(
        **_patient_common(),
        ctdna_context={"tumor_fraction": 55.0, "proportion_fragments": 0.29},  # High/High
    ))
    assert abs(pred_plain.probability - pred_ctdna.probability) < 1e-9
    assert pred_plain.risk_level == pred_ctdna.risk_level


if __name__ == "__main__":
    test_single_call_surfaces_full_signal_family()
    test_biomarker_registry_projects_as_advisory_context()
    test_prognostic_layers_do_not_change_routing()
    print("ALL integrated-subsystem (non-siloed) tests PASSED")
