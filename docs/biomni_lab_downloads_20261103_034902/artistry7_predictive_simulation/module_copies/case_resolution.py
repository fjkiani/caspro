"""
Layer 0 Contract — Case Resolution

Tumor board output schema for CrisPRO v3 pipeline.
This is the final contract: all pipeline results converge here.
"""

from dataclasses import dataclass, field
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

from .patient_state import PatientMetadata


class GateResult(BaseModel):
    """Result of a gate evaluation."""
    status: str  # PASS, FAIL, UNKNOWN
    reason: str = ""
    inferred: bool = False


class EngineOutput(BaseModel):
    """Output from a single engine."""
    engine_name: str
    status: str = "OK"  # OK, ERROR, SKIPPED
    data: Dict[str, Any] = Field(default_factory=dict)
    error: Optional[str] = None

    def __getattr__(self, name: str):
        """Allow attribute-style access to data dict for test compatibility."""
        if name.startswith("_") or name in self.model_fields:
            raise AttributeError(name)
        try:
            return self.data[name]
        except KeyError:
            raise AttributeError(f"EngineOutput '{self.engine_name}' has no attribute '{name}'")


class EvidenceReceipt(BaseModel):
    """An evidence receipt linking a recommendation to literature."""
    pmid: Optional[str] = None
    tier: Optional[str] = None  # VALIDATED, STRONG, MECHANISTIC, INSUFFICIENT
    description: Optional[str] = None
    source_kb: Optional[str] = None


class RankedIntervention(BaseModel):
    """A ranked intervention (drug or trial) with full scoring."""
    drug_name: Optional[str] = None
    trial_id: Optional[str] = None
    support_score: Optional[float] = None
    contradiction_score: Optional[float] = None
    net_alignment: Optional[float] = None
    evidence_tier: Optional[str] = None  # VALIDATED, STRONG, MECHANISTIC, INSUFFICIENT
    evidence_receipts: List[EvidenceReceipt] = Field(default_factory=list)
    provenance: Optional[str] = None
    tags: List[str] = Field(default_factory=list)


class MissingDataItem(BaseModel):
    """A missing data field that affects confidence."""
    field: str
    impact: Optional[str] = None
    next_best_test_if_known: Optional[str] = None


class NextBestTest(BaseModel):
    """The recommended next test to improve confidence."""
    test_name: str
    reason: Optional[str] = None
    clinical_utility: Optional[str] = None


@dataclass
class MarrowGuardResult:
    """MarrowGuard DDI + lineage + rescue output. Present only when MARROWGUARD_ENABLED=true."""
    ddi_results: List[Any]                    # List of DDIResult objects (typed as Any to avoid circular import)
    lineage_result: Optional[Any] = None      # LineageResult or None
    rescue_protocol: Optional[Any] = None     # RescueProtocol or None
    feature_flag: str = "MARROWGUARD_ENABLED"
    ruo: str = "RUO"


class CaseResolution(BaseModel):
    """
    The master output contract for the v3 pipeline.

    Contains: patient summary, gate results, engine outputs,
    ranked interventions, missing data, confidence, metadata.
    """
    patient_summary: Optional[str] = None
    gates: Dict[str, GateResult] = Field(default_factory=dict)
    engines: Dict[str, EngineOutput] = Field(default_factory=dict)
    ranked_interventions: List[RankedIntervention] = Field(default_factory=list)
    missing_data: List[MissingDataItem] = Field(default_factory=list)
    next_best_test: Optional[NextBestTest] = None
    confidence_level: Optional[str] = None  # L0, L1, L2
    evidence_receipts: Dict[str, List[EvidenceReceipt]] = Field(default_factory=dict)
    active_gates: Dict[str, GateResult] = Field(default_factory=dict)
    marrowguard: Optional[Any] = None  # MarrowGuardResult when MARROWGUARD_ENABLED=true, else None

    # Evo2 variant evidence — populated when EVO2_SCORING_ENABLED=true
    # Each entry is a flat evidence packet from Evo2ScoreResponse.to_evidence_packet().
    # None when flag is off. Never contains Evo2 internals — flat dicts only.
    # RUO: ruo_status=True is hardcoded inside each packet.
    evo2_evidence: Optional[List[Dict[str, Any]]] = Field(
        None,
        description=(
            "Evo2 variant-effect evidence packets. Populated when EVO2_SCORING_ENABLED=true. "
            "Each packet is a flat dict from Evo2ScoreResponse.to_evidence_packet(). "
            "None when flag is off or engine failed. RUO — not for clinical use."
        )
    )

    # ARTISTRY-7 prognostic baseline — SPE tier context for the tumor board.
    # This is a PROGNOSTIC association block (TCGA n=427 3-tier log-rank p~0.003819),
    # NOT a predictive/treatment claim. Populated whenever an ARTISTRY-7 sample is in
    # scope; INDEPENDENT of the predictive-simulation feature flag so it is byte-stable
    # when the flag flips. Flat dict only — never merged into engines/evidence rows.
    prognostic_baseline: Optional[Dict[str, Any]] = Field(
        None,
        description=(
            "ARTISTRY-7 SPE prognostic baseline (tier, tier_refined, IMMUNE_ACCESS, OS context). "
            "evidence_status='prognostic_association'. Prognostic only; not a predictive biomarker. "
            "None when no ARTISTRY-7 sample is in scope. Independent of PREDICTIVE_SIMULATION_MODE."
        )
    )

    # PREDICTIVE_REPROGRAMMING_SIMULATION — observable, DEFAULT-OFF counterfactual block.
    # Populated ONLY when PREDICTIVE_SIMULATION_MODE (or include_predictive_simulation) is ON.
    #   - flag off              -> {"status": "disabled"} (or None)
    #   - flag on, gates fail   -> {"status": "ineligible", "gate_failures": [...]}
    #   - flag on, gates pass   -> {"status": "simulated_predictive_reprogramming", ...}
    # RUO / hypothesis-only. Deterministic reprogramming SHIFT simulation (score-space /
    # universe A->B), NOT a fitted survival model and NOT individual OS. Never assigns a
    # patient predicted_os_months. Doctor-Portal curve-flip viz reads ONLY this field.
    simulated_predictive_outcome: Optional[Dict[str, Any]] = Field(
        None,
        description=(
            "Deterministic reprogramming-simulation block (RUO, hypothesis-only). Populated only "
            "when the predictive-simulation flag is ON and eligibility gates pass; otherwise "
            "'disabled' / 'ineligible' / None. Score-space & universe A->B shifts from the ARTISTRY-7 "
            "Lazarus simulator — NOT a survival model, NOT patient OS. Sibling to prognostic_baseline; "
            "never merged into evidence_matrix. IMMUNE_ACCESS external AUROC is NOT-SUPPORTED."
        )
    )

    metadata: PatientMetadata = Field(default_factory=PatientMetadata)

    # Alias for tumor board formatter
    @property
    def case_resolution(self):
        return self
