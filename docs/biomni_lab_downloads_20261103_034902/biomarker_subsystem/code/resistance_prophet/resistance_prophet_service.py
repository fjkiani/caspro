"""
Resistance Prophet Service Facade
Orchestrates signal detection and prediction engine.
Refactored Jan 2026: Splits Production Heuristic (Proxy) from Research (True SAE).
"""

from typing import Dict, List, Any, Optional, Union
import logging
import asyncio

from .engine import calculate_resistance_prediction
from .shim import serialize_to_legacy
from .schemas import ResistancePrediction
from .contracts import PatientRegimenFeatureTable, RegimenFeatureRow, TimingFeatures, ChemosensitivityFeatures, KelimCa125, TimingDataQuality, TimingContextProvenance, TimingContextInputsUsed
from .signals import ovarian
from .spine import ResistanceDataSpine
from .timing_engine import TimingChemosensitivityEngine

logger = logging.getLogger(__name__)

class ClinicalHeuristicEngine:
    """
    PRODUCTION ENGINE (FORMERLY 'PROXY SAE').
    Uses deterministic heuristics (MFAP4, Pathway rules) to predict resistance.
    Status: OPERATIONAL (Day 1 Mars Plan).
    """
    async def run(
        self,
        patient_id: str,
        disease_type: str,
        current_sae_features: Optional[Dict[str, Any]],
        baseline_sae_features: Optional[Dict[str, Any]],
        treatment_history: List[Dict[str, Any]],
        current_drug_class: str,
        mutations: Optional[List[Dict[str, Any]]] = None,
        is_post_treatment: bool = False,
        timing_context: Optional[PatientRegimenFeatureTable] = None,
        ctdna_context: Optional[Dict[str, Any]] = None  # RES-OV-P0-006: prognostic-only ctDNA
    ) -> ResistancePrediction:
        
        signals = []
        
        # 1. Detect Signals based on Disease Type
        if disease_type and "ovarian" in disease_type.lower():
            results = await asyncio.gather(
                ovarian.detect_restoration(current_sae_features, baseline_sae_features),
                ovarian.detect_escape(current_sae_features, baseline_sae_features, current_drug_class),
                ovarian.detect_genomic_resistance(mutations or [], current_drug_class),
                ovarian.detect_ca125_kinetics([], timing_context=timing_context), 
                ovarian.detect_kelim_genotype_convergence(mutations or [], timing_context=timing_context),
                ovarian.detect_diamond_features(current_sae_features or {}),
                ovarian.detect_transcriptomic_risk(current_sae_features or {}),
                ovarian.detect_engine_pfi(timing_context),
                ovarian.detect_ctdna_mrd_signal(ctdna_context)  # RES-OV-P0-006: prognostic-only
            )
            signals.extend(results)
        else:
            logger.warning(f"No signal detectors found for disease: {disease_type}")

        # 2. Run Engine (Pure Logic)
        baseline_source = "unknown"
        if baseline_sae_features:
            baseline_source = baseline_sae_features.get("source", "unknown")

        molecular_context = {}
        if current_sae_features and "sig7_exposure" in current_sae_features:
            molecular_context["sig7_exposure"] = current_sae_features["sig7_exposure"]
            
        prediction = calculate_resistance_prediction(
            signals=signals,
            treatment_history=treatment_history,
            baseline_source=baseline_source,
            baseline_penalty=False, 
            molecular_context=molecular_context,
            is_post_treatment=is_post_treatment
        )
        
        # Enforce Truth Contract: Provenance
        if prediction.provenance is None:
            prediction.provenance = {}
            
        prediction.provenance["sae_mode"] = "heuristic"
        prediction.provenance["engine"] = "ClinicalHeuristicEngine"
        prediction.provenance["certified_by"] = "Zo_Audit_2026_01_29"
        
        return prediction


class Evo2SAEExtractor_RUO:
    """
    RESEARCH USE ONLY ENGINE (FORMERLY 'TRUE SAE').
    Deep learning extraction path. 
    Status: PLACEHOLDER / BLOCKED.
    """
    async def run(self, *args, **kwargs):
        return {
            "status": "not_implemented",
            "reason": "Research Use Only - Pending Validation (Tier-3 Postmortem)",
            "provenance": None
        }


class ResistanceProphetService:
    """
    Facade that routes to the correct engine based on mode.
    Defaults to ClinicalHeuristicEngine (Proxy).
    """
    def __init__(self):
        self.heuristic_engine = ClinicalHeuristicEngine()
        self.ruo_engine = Evo2SAEExtractor_RUO()

    def _adapt_timing_context(self, raw_context: Dict[str, Any]) -> Optional[PatientRegimenFeatureTable]:
        """
        Adapt raw Timing Engine output (flat list, days) to Prophet Contract (nested, months).
        """
        try:
            # Handle already valid
            if "regimens" in raw_context:
                return PatientRegimenFeatureTable(**raw_context)

            # Handle Endpoint Format: { "timing_features_table": [...], "provenance": ... }
            rows = raw_context.get("timing_features_table")
            if not rows:
                return None
                
            regimens = []
            for r in rows:
                pfi_days = r.get("PFI_days")
                
                # Create TimingFeatures (Convert Days -> Months)
                tf = TimingFeatures(
                    pfi_months=float(pfi_days)/30.44 if pfi_days is not None else None,
                    ptpi_months=float(r.get("PTPI_days"))/30.44 if r.get("PTPI_days") is not None else None,
                    tfi_months=float(r.get("TFI_days"))/30.44 if r.get("TFI_days") is not None else None,
                    pfs_months=float(r.get("PFS_from_regimen_days"))/30.44 if r.get("PFS_from_regimen_days") is not None else None,
                    os_months=float(r.get("OS_from_regimen_days"))/30.44 if r.get("OS_from_regimen_days") is not None else None,
                    platinum_sensitivity_category=r.get("PFI_category")
                )
                
                # Create KELIM Features
                kelim = None
                if r.get("kelim") is not None or r.get("k") is not None:
                     kelim = KelimCa125(
                         k=r.get("k"),
                         kelim=r.get("kelim"),
                         category=r.get("category"),
                         modeling_approach=r.get("modeling_approach"),
                         time_window_days=r.get("time_window_days")
                     )
                     
                chemo = ChemosensitivityFeatures(
                    kelim_ca125=kelim,
                    ca125_measurements_used=r.get("measurements_used_count")
                )
                
                dq = TimingDataQuality(
                    has_regimen_history=True,
                    has_ca125_data=r.get("has_ca125_data", False),
                    warnings=[]
                )
                
                reg_row = RegimenFeatureRow(
                    regimen_id=r.get("regimen_id"),
                    regimen_name=None,
                    regimen_class=r.get("regimen_type"), # Map if needed
                    start_date=None, # Optional in contract
                    end_date=None,
                    timing_features=tf,
                    chemosensitivity_features=chemo,
                    data_quality=dq
                )
                regimens.append(reg_row)

            # Reconstruct Provenance
            raw_prov = raw_context.get("provenance", {})
            prov = TimingContextProvenance(
                computed_at=raw_prov.get("computed_at") or datetime.now(),
                engine="timing_chemosensitivity_engine",
                ruo_disclaimer=raw_prov.get("ruo_disclaimer", "Adapted from V1"),
                inputs_used=TimingContextInputsUsed(source="precomputed_ca125_features")
            )
            
            return PatientRegimenFeatureTable(
                schema_version="patient_regimen_feature_table.v1",
                patient_id=rows[0].get("patient_id", "unknown"),
                disease_type="ovarian_cancer",
                regimens=regimens,
                provenance=prov
            )
            
        except Exception as e:
            logger.warning(f"Failed to adapt timing context: {e}")
            return None

    async def predict_resistance(
        self,
        patient_id: str,
        disease_type: str,
        current_sae_features: Optional[Dict[str, Any]],
        baseline_sae_features: Optional[Dict[str, Any]],
        treatment_history: List[Dict[str, Any]],
        current_drug_class: str,
        mutations: Optional[List[Dict[str, Any]]] = None,
        return_object: bool = False,
        is_post_treatment: bool = False,
        mode: str = "heuristic", # Options: 'heuristic' (default), 'ruo'
        timing_context: Optional[Dict[str, Any]] = None, # Input Contract
        spine: Optional[ResistanceDataSpine] = None, # NEW: V1 Spine
        ctdna_context: Optional[Dict[str, Any]] = None # RES-OV-P0-006: prognostic-only ctDNA (additive, backward-compat)
    ) -> Union[Dict[str, Any], ResistancePrediction]:
        
        # 0. Shim: Convert Spine -> Timing Context (if provided)
        if spine:
            try:
                engine_v1 = TimingChemosensitivityEngine()
                # Process spine to object, then dump to dict for downstream adapter compatibility
                timing_context = engine_v1.process(spine).dict()
                logger.info(f"Prophet: Hydrated timing context from Verified Spine (Patient: {spine.patient_id})")
            except Exception as e:
                logger.error(f"Prophet: Failed to hydrate from Spine: {e}")
        
        if mode == "ruo":
            # TRUTH CONTRACT: RUO path MUST return placeholder or explict failure
            return await self.ruo_engine.run()
            

        # Validate Timing Context Contract (with Adaptation)
        validated_timing_context = None
        if timing_context:
            try:
                # Try direct match
                # validated_timing_context = PatientRegimenFeatureTable(**timing_context)
                # Fallback to Adapter
                validated_timing_context = self._adapt_timing_context(timing_context)
            except Exception as e:
                logger.warning(f"Timing context validation/adaptation failed (Prophet will ignore): {e}")
        else:
             logger.warning("Timing Engine unavailable, falling back to heuristic PFI")

        # Default: Production Heuristic
        prediction = await self.heuristic_engine.run(
            patient_id, disease_type, current_sae_features, 
            baseline_sae_features, treatment_history, current_drug_class, 
            mutations, is_post_treatment,
            timing_context=validated_timing_context,
            ctdna_context=ctdna_context  # RES-OV-P0-006: prognostic-only ctDNA
        )
        
        # TRUTH CONTRACT: Add Provenance
        # We need to inject 'provenance.sae_mode' = 'heuristic'
        # Since prediction is a Pydantic model (ResistancePrediction), we might need to modify it or the serialized dict.
        
        if return_object:
            # If the Pydantic model supports extra fields, good. If not, we might need to wrap it.
            # Assuming standard Pydantic behavior or dict compatibility is handled downstream.
            # Ideally, we add a field to the schema, but for now, we'll rely on the caller/serializer to handle the 'extra' info if it's a dict.
            # If it's an object, we can't easily add attributes unless defined.
            # Let's check schemas.py later. For now, we return as is, but we ensure the *Wrapper* (shim) handles it if serialized.
            return prediction 
            
        # Serialized path (Legacy/Frontend)
        data = serialize_to_legacy(prediction)
        
        # INJECT PROVENANCE
        if "provenance" not in data:
            data["provenance"] = {}
        
        data["provenance"]["sae_mode"] = "heuristic"
        data["provenance"]["engine"] = "ClinicalHeuristicEngine"
        data["provenance"]["certified_by"] = "Zo_Audit_2026_01_29"
        
        return data

def get_resistance_prophet_service() -> ResistanceProphetService:
    return ResistanceProphetService()

