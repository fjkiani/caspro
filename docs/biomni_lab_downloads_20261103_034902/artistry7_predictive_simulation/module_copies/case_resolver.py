"""
Case Resolver — Assembles engine outputs into CaseResolution.

Takes a dict of engine outputs and produces the final CaseResolution
contract for tumor board consumption.
"""

from typing import Any, Dict, List, Optional

from layer0_contracts.case_resolution import (
    CaseResolution, EngineOutput, GateResult, RankedIntervention,
    MissingDataItem, NextBestTest, EvidenceReceipt,
)
from layer0_contracts.patient_state import PatientMetadata


def _build_prognostic_baseline(artistry7_row: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """
    ARTISTRY-7 SPE prognostic baseline. PROGNOSTIC association only (TCGA n=427
    3-tier log-rank p~0.003819); NOT predictive. Independent of the simulation flag,
    so it is byte-stable whether or not the predictive simulation runs.
    Returns None when no ARTISTRY-7 sample is in scope.
    """
    if not artistry7_row:
        return None

    def _num(key: str):
        v = artistry7_row.get(key)
        try:
            return float(v)
        except (TypeError, ValueError):
            return None

    return {
        "sample_id": str(artistry7_row.get("SAMPLE_ID") or artistry7_row.get("sample_id") or "unknown"),
        "spe_tiers": {
            "tier": artistry7_row.get("TIER"),
            "tier_refined": artistry7_row.get("TIER_REFINED"),
            "spe_composite_score": _num("SPE_COMPOSITE_SCORE"),
        },
        "tier": artistry7_row.get("TIER"),
        "tier_refined": artistry7_row.get("TIER_REFINED"),
        "immune_access_score": _num("IMMUNE_ACCESS_SCORE"),
        "platinum_window": bool(str(artistry7_row.get("PLATINUM_WINDOW", "")).strip().lower() in ("1", "true", "yes")),
        "os_context": {
            "os_months": _num("OS_MONTHS"),
            "os_status": artistry7_row.get("OS_STATUS"),
            "note": (
                "Prognostic SPE-tier association (TCGA hgsoc n=427, 3-tier log-rank p~0.003819). "
                "TIER_1A vs 1B log-rank p~0.126 (NS). Not a predictive/treatment claim."
            ),
        },
        "evidence_status": "prognostic_association",
    }


def _build_simulated_predictive_outcome(
    artistry7_row: Optional[Dict[str, Any]],
    predictive_simulation_flag: bool,
    request_flag: Optional[bool] = None,
) -> Optional[Dict[str, Any]]:
    """
    Observable, DEFAULT-OFF reprogramming-simulation block.
      flag off              -> {"status": "disabled"}
      flag on, no sample    -> {"status": "disabled"}  (nothing to simulate)
      flag on, gates fail   -> {"status": "ineligible", "gate_failures": [...]}
      flag on, gates pass   -> full simulated_predictive_reprogramming payload
    """
    from layer2_gates.predictive_simulation_gate import evaluate_eligibility

    # request_flag is folded through the same OR logic used by the gate; the explicit
    # predictive_simulation_flag kwarg is treated as an additional request-side enable.
    effective_request = bool(predictive_simulation_flag) or bool(request_flag) if (
        predictive_simulation_flag or request_flag
    ) else None

    eligible, status, gate_failures, flag_on = evaluate_eligibility(
        artistry7_row, request_flag=effective_request
    )

    if not flag_on:
        return {"status": "disabled"}
    if not artistry7_row:
        return {"status": "disabled"}
    if not eligible:
        return {
            "status": "ineligible",
            "gate_failures": gate_failures,
            "eligibility": {
                "tier": str(artistry7_row.get("TIER") or ""),
                "tier_refined": str(artistry7_row.get("TIER_REFINED") or ""),
                "platinum_window": bool(
                    str(artistry7_row.get("PLATINUM_WINDOW", "")).strip().lower() in ("1", "true", "yes")
                ),
                "flag_on": True,
            },
            "disclaimers": [
                "RUO",
                "not_clinical_decision_support",
                "not_validated_predictive_biomarker",
                "IMMUNE_ACCESS_external_AUROC_NOT_SUPPORTED",
            ],
        }

    from layer1_engines.artistry7_reprogramming.simulator_adapter import run_simulation
    return run_simulation(artistry7_row, flag_value=True)


def resolve(
    patient_summary: str,
    gates: Dict[str, GateResult],
    engines: Dict[str, EngineOutput],
    ranked_interventions: List[RankedIntervention],
    missing_data: List[MissingDataItem],
    next_best_test: Optional[NextBestTest],
    confidence_level: str,
    metadata: Optional[PatientMetadata] = None,
    marrowguard_result=None,
    artistry7_row: Optional[Dict[str, Any]] = None,
    predictive_simulation_flag: bool = False,
    include_predictive_simulation: Optional[bool] = None,
) -> CaseResolution:
    """Assemble all pipeline outputs into a CaseResolution.

    artistry7_row: optional ARTISTRY-7 Lazarus row for the case. When provided,
        a PROGNOSTIC prognostic_baseline is attached (independent of any flag).
    predictive_simulation_flag / include_predictive_simulation: request-side enables
        for the RUO reprogramming SIMULATION (OR'd with env PREDICTIVE_SIMULATION_MODE).
        Both default OFF; when OFF, simulated_predictive_outcome is {"status": "disabled"}
        and the prognostic path is byte-identical to the pre-existing behavior.
    """

    evidence_receipts = {}
    for intervention in ranked_interventions:
        key = intervention.drug_name or intervention.trial_id or "unknown"
        if intervention.evidence_receipts:
            evidence_receipts[key] = intervention.evidence_receipts

    active_gates = {k: v for k, v in gates.items() if v.status != "UNKNOWN"}

    # ARTISTRY-7 blocks (siblings; never merged into engines/evidence rows).
    # prognostic_baseline: prognostic-only, independent of the simulation flag.
    # simulated_predictive_outcome: RUO, default-OFF; 'disabled' unless flag+gates pass.
    prognostic_baseline = _build_prognostic_baseline(artistry7_row)
    simulated_predictive_outcome = _build_simulated_predictive_outcome(
        artistry7_row,
        predictive_simulation_flag=predictive_simulation_flag,
        request_flag=include_predictive_simulation,
    )

    # MarrowGuard advisory DDI tags (never removes interventions)
    if marrowguard_result and marrowguard_result.ddi_results:
        from layer1_engines.marrowguard.ddi_engine import INTERACTION_STATUS_VERIFIED
        for _ddi in marrowguard_result.ddi_results:
            if getattr(_ddi, "alert_severity", None) == "CRITICAL":
                missing_data.append(MissingDataItem(
                    field=f"ddi_alert_{_ddi.perpetrator}_{_ddi.victim}",
                    impact="CRITICAL DDI detected (advisory): " + "; ".join(_ddi.action_directives[:1]),
                    next_best_test_if_known="pharmacist_ddi_review",
                ))
            elif getattr(_ddi, "interaction_status", None) not in (INTERACTION_STATUS_VERIFIED, None):
                missing_data.append(MissingDataItem(
                    field=f"ddi_status_{_ddi.perpetrator}_{_ddi.victim}",
                    impact="DDI status unverified — manual pharmacist review required",
                    next_best_test_if_known="pharmacist_ddi_review",
                ))

        _critical_victims = set()
        for _ddi in marrowguard_result.ddi_results:
            if getattr(_ddi, "alert_severity", None) == "CRITICAL":
                _critical_victims.add(_ddi.victim.lower())
        for intervention in ranked_interventions:
            _drug_name = getattr(intervention, "drug_name", "") or ""
            if _drug_name.lower() in _critical_victims:
                if hasattr(intervention, "tags") and intervention.tags is not None:
                    intervention.tags = list(intervention.tags) + ["DDI_CRITICAL_BLOCK"]
                elif hasattr(intervention, "tags"):
                    intervention.tags = ["DDI_CRITICAL_BLOCK"]

    return CaseResolution(
        patient_summary=patient_summary,
        gates=gates,
        engines=engines,
        ranked_interventions=ranked_interventions,
        missing_data=missing_data,
        next_best_test=next_best_test,
        confidence_level=confidence_level,
        evidence_receipts=evidence_receipts,
        active_gates=active_gates,
        marrowguard=marrowguard_result,
        prognostic_baseline=prognostic_baseline,
        simulated_predictive_outcome=simulated_predictive_outcome,
        metadata=metadata or PatientMetadata(),
    )
