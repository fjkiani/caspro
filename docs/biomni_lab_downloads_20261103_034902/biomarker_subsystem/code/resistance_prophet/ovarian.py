"""
Ovarian Signal Detectors
Encapsulates Ovarian-specific resistance logic:
1. DNA Repair Restoration (Positive Delta) - The "Reversion" Signal
2. Pathway Escape (Target Loss) - The "Downregulation" Signal

Refactored from monolithic ResistanceProphetService.
"""

from typing import Dict, List, Optional
import logging

from ..schemas import (
    ResistanceSignalData, ResistanceSignal, MechanismBreakdown
)
from ..constants import (
    DNA_REPAIR_THRESHOLD, PATHWAY_ESCAPE_THRESHOLD,
    WEIGHT_PATIENT_BASELINE, WEIGHT_POPULATION_BASELINE,
    PATHWAY_CONTRIBUTIONS, DRUG_PATHWAY_TARGETS,
    OV_HIGH_RISK_GENES, PATHWAY_NAMES
)


logger = logging.getLogger(__name__)

import math


async def detect_restoration(
    current_sae: Dict,
    baseline_sae: Dict
) -> ResistanceSignalData:
    """
    Detect DNA Repair Restoration (Signal 1 - Phenotypic).
    
    Logic:
    DNA Repair Capacity Score = Deficiency Score (High = High Deficiency/Sensitive).
    Restoration (Resistance) = Deficiency DROPS (Score goes High -> Low).
    
    restoration_delta = baseline_deficiency - current_deficiency
    Restoration Detected if delta > Threshold.
    
    Ref: MANAGER_ANSWERS_TO_ZO_SAE_QUESTIONS.md (C7, R2)
    """
    logger.info("Detecting DNA_REPAIR_RESTORATION (OV) - explicit deficiency logic...")
    
    # Explicit Naming: Score is Deficiency
    if not current_sae or not baseline_sae:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.DNA_REPAIR_RESTORATION,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="SAE features unavailable for restoration analysis",
            provenance={"status": "missing_sae_features"},
            baseline_reliability=1.0
        )

    # Helper to extract deficiency (handles Schema V1/V2 ambiguity)
    def _get_deficiency(sae_dict):
        if "dna_repair_deficiency" in sae_dict:
            val = sae_dict["dna_repair_deficiency"]
            if val is not None: return float(val)
        if "dna_repair_capacity" in sae_dict:
             val = sae_dict["dna_repair_capacity"]
             if val is not None: return 1.0 - float(val)
        return 0.5

    current_deficiency = _get_deficiency(current_sae)
    baseline_deficiency = _get_deficiency(baseline_sae)
    
    # Calculate Delta (Positive Drop = Restoration/Resistance)
    restoration_delta = baseline_deficiency - current_deficiency
    
    # Check reliability
    is_pop_baseline = baseline_sae.get("is_population_average", False)
    reliability = WEIGHT_POPULATION_BASELINE if is_pop_baseline else WEIGHT_PATIENT_BASELINE
    
    # Detection Threshold
    detected = restoration_delta > DNA_REPAIR_THRESHOLD
    
    # Probability (Sigmoid): Smooth transition around threshold
    # Matches legacy shape but with corrected sign (restoration_delta)
    # If delta == threshold, prob = 0.5
    # If delta >> threshold, prob -> 1.0
    try:
        probability = 1.0 / (1.0 + math.exp(-10 * (restoration_delta - DNA_REPAIR_THRESHOLD)))
    except OverflowError:
        probability = 0.0 if restoration_delta < DNA_REPAIR_THRESHOLD else 1.0
        
    probability = float(max(0.0, min(1.0, probability)))
    
    # Confidence (do not zero out - capture signal quality)
    base_confidence = 0.85  # Max confidence for this signal type
    confidence = float(base_confidence * reliability)
        
    # Build Rationale
    rationale = (
        f"DNA repair deficiency change: {restoration_delta:+.2f} "
        f"(baseline={baseline_deficiency:.2f} → current={current_deficiency:.2f}). "
        f"{'Restoration detected' if detected else 'No significant restoration'} "
        f"(threshold={DNA_REPAIR_THRESHOLD:+.2f}). "
        f"Baselined against {'Population (Penalty Applied)' if is_pop_baseline else 'Patient History'}."
    )
    
    # Mechanism Breakdown (components are typically current - baseline in legacy schemas)
    # We clarify directionality in the provenance
    breakdown = MechanismBreakdown(
        ddr_pathway_change=current_sae.get("pathway_burden_ddr", 0) - baseline_sae.get("pathway_burden_ddr", 0),
        hrr_essentiality_change=current_sae.get("essentiality_hrr", 0) - baseline_sae.get("essentiality_hrr", 0),
        exon_disruption_change=current_sae.get("exon_disruption_score", 0) - baseline_sae.get("exon_disruption_score", 0),
        pathway_contributions=PATHWAY_CONTRIBUTIONS
    )
    
    return ResistanceSignalData(
        signal_type=ResistanceSignal.DNA_REPAIR_RESTORATION,
        detected=detected,
        probability=probability,
        confidence=confidence,
        rationale=rationale,
        provenance={
            "restoration_delta": restoration_delta,
            "baseline_deficiency": baseline_deficiency,
            "current_deficiency": current_deficiency,
            "threshold": DNA_REPAIR_THRESHOLD,
            "baseline_source": "population" if is_pop_baseline else "patient",
            "note": "Positive delta = Deficiency Dropping = Restoration"
        },
        mechanism_breakdown=breakdown,
        baseline_reliability=reliability
    )


async def detect_escape(
    current_sae: Dict,
    baseline_sae: Dict,
    drug_class: Optional[str]
) -> ResistanceSignalData:
    """
    Detect Pathway Escape / Target Loss (Signal 2 - Phenotypic).
    
    Logic:
    Escape = Target Pathway Burden DROPS significantly (tumor no longer relies on it).
    
    Example: 
    - Drug: Anti-VEGF
    - Baseline VEGF: 0.8
    - Current VEGF: 0.2
    - Result: TARGETLOST / ESCAPE
    """
    logger.info("Detecting PATHWAY_ESCAPE (OV)...")

    # Longitudinal escape markers (grounded):
    # These are observational (ctDNA rise / CA-125 rebound). They are not mechanism-vector escape,
    # but they are valid early warning signals and are usable for offline ground-truth replay.
    ctdna_rise_flag = current_sae.get("ctdna_rise_flag")
    ca125_rebound_flag = current_sae.get("ca125_rebound_flag")
    if ctdna_rise_flag is True or ca125_rebound_flag is True:
        # Reliability: baseline quality still matters; use population-baseline penalty when applicable.
        is_pop_baseline = bool(baseline_sae.get("is_population_average", False))
        reliability = WEIGHT_POPULATION_BASELINE if is_pop_baseline else WEIGHT_PATIENT_BASELINE
        # Conservative: this is a warning, not a mechanistic proof.
        probability = 0.70 if (ctdna_rise_flag is True and ca125_rebound_flag is True) else 0.60
        confidence = float(0.70 * reliability)
        rationale = (
            "Longitudinal escape markers observed: "
            f"ctDNA_rise_flag={ctdna_rise_flag}, ca125_rebound_flag={ca125_rebound_flag}. "
            "This is a phenotype-level warning (RUO), independent of mechanism-vector drift."
        )
        return ResistanceSignalData(
            signal_type=ResistanceSignal.PATHWAY_ESCAPE,
            detected=True,
            probability=float(probability),
            confidence=float(confidence),
            rationale=rationale,
            provenance={
                "status": "longitudinal_flags",
                "ctdna_rise_flag": bool(ctdna_rise_flag),
                "ca125_rebound_flag": bool(ca125_rebound_flag),
                "baseline_source": "population" if is_pop_baseline else "patient",
                "note": "Phenotype-level escape warning; does not assert targeted-axis drop",
            },
            escaped_pathways=[],
            baseline_reliability=reliability,
        )

    if not current_sae or not baseline_sae:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.PATHWAY_ESCAPE,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="SAE features unavailable for escape analysis",
            provenance={"status": "missing_sae_features"},
            baseline_reliability=1.0
        )
    
    if not drug_class:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.PATHWAY_ESCAPE,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="No drug class provided for pathway escape analysis",
            provenance={"status": "no_drug_class"},
            baseline_reliability=1.0
        )
        
    # Identify target pathways for this drug
    targets = []
    drug_key = drug_class.lower().replace(" ", "_").replace("-", "_")
    
    # Try direct match
    if drug_key in DRUG_PATHWAY_TARGETS:
        targets = DRUG_PATHWAY_TARGETS[drug_key]
    else:
        # Try suffix match
        for key, vals in DRUG_PATHWAY_TARGETS.items():
            if key in drug_key or drug_key in key:
                targets = vals
                break
                
    if not targets:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.PATHWAY_ESCAPE,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale=f"No target pathways mapped for class: {drug_class}",
            provenance={"status": "unknown_targets"},
            baseline_reliability=1.0
        )

    # Check for Target Loss
    current_vec = current_sae.get("mechanism_vector", [])
    baseline_vec = baseline_sae.get("mechanism_vector", [])
    
    # Assuming vector is indexed corresponding to PATHWAY_NAMES order in constants
    # For now, simplistic generic check since we don't have the explicit map index available
    # in constants.py (only names). 
    # TODO: In integration, ensure we have the Index Map. 
    # For V2 Refactor, avoiding complex mapping logic drift, we assume logic provided
    # in SAE service handles the vector properly. Here we will use a simplified assumption
    # or just placeholder logic if the vector indices aren't guaranteed.
    
    # SAFEGUARD: If vectors are empty/mismatched, abort
    if not current_vec or not baseline_vec or len(current_vec) != len(baseline_vec):
         return ResistanceSignalData(
            signal_type=ResistanceSignal.PATHWAY_ESCAPE,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="Mechanism vectors unavailable or mismatched",
            provenance={"status": "vector_error"},
            baseline_reliability=1.0
        )
        
    # Check reliability
    is_pop_baseline = baseline_sae.get("is_population_average", False)
    reliability = WEIGHT_POPULATION_BASELINE if is_pop_baseline else WEIGHT_PATIENT_BASELINE

    escaped_targets = []
    max_drop = 0.0
    
    # Create Index Map from Canonical Constants
    PATHWAY_INDEX = {name.upper(): i for i, name in enumerate(PATHWAY_NAMES)}
    
    # Validation: Ensure vector length matches canonical definition
    if len(current_vec) != len(PATHWAY_NAMES):
        logger.error(f"Mechanism vector length mismatch. Expected {len(PATHWAY_NAMES)}, got {len(current_vec)}")
        return ResistanceSignalData(
            signal_type=ResistanceSignal.PATHWAY_ESCAPE,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale=f"Vector length mismatch (Exp {len(PATHWAY_NAMES)} vs {len(current_vec)})",
            provenance={"status": "vector_mismatch_error"},
            baseline_reliability=1.0
        )
    
    for target in targets:
        target_key = target.upper()
        if target_key in PATHWAY_INDEX:
            idx = PATHWAY_INDEX[target_key]
            # Since we validated length, simplistic index access is safe
            drop = baseline_vec[idx] - current_vec[idx] # Positive value = Drop
            if drop > PATHWAY_ESCAPE_THRESHOLD:
                escaped_targets.append(target)
                max_drop = max(max_drop, drop)
    
    detected = len(escaped_targets) > 0
    
    if detected:
        probability = min(0.95, 0.5 + (max_drop * 2.0))
        confidence = 0.80
    else:
        probability = 0.0
        confidence = 0.0
        
    rationale = (
        f"Target pathway analysis: {len(escaped_targets)} escaped. "
        f"{'ESCAPE DETECTED' if detected else 'Targets engaged'}: {', '.join(escaped_targets) if escaped_targets else 'None'}. "
        f"Max drop: {max_drop:.2f}."
    )
    
    return ResistanceSignalData(
        signal_type=ResistanceSignal.PATHWAY_ESCAPE,
        detected=detected,
        probability=float(probability),
        confidence=float(confidence),
        rationale=rationale,
        provenance={
            "escaped_targets": escaped_targets,
            "max_drop": max_drop,
            "threshold": PATHWAY_ESCAPE_THRESHOLD
        },
        escaped_pathways=escaped_targets,
        baseline_reliability=reliability
    )

async def detect_genomic_resistance(
    mutations: List[Dict],
    drug_class: Optional[str] = None
) -> ResistanceSignalData:
    """
    Detect Ovarian high-risk gene resistance (Signal 4).
    Uses OV_HIGH_RISK_GENES.
    
    CRITICAL LOGIC:
    - Filters by 'effect': "RESISTANCE" vs "SENSITIVITY".
    - "SENSITIVITY" genes (e.g. MBD4) do NOT contribute to Risk Probability.
    """
    logger.info("Detecting GENE_LEVEL_RESISTANCE (OV)...")
    
    if not mutations:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.GENE_LEVEL_RESISTANCE,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="No mutations provided",
            provenance={"status": "no_mutations"}
        )
        
    patient_genes = {m.get("gene", "").upper() for m in mutations}
    
    detected_resistance_genes = []
    detected_sensitivity_genes = []
    
    max_risk_prob = 0.0
    
    for gene, info in OV_HIGH_RISK_GENES.items():
        if gene in patient_genes:
            effect = info.get("effect", "RESISTANCE")
            
            entry = {
                "gene": gene,
                "effect": effect,
                "mechanism": info.get("mechanism"),
                "rationale": info.get("rationale")
            }
            
            if effect == "RESISTANCE":
                detected_resistance_genes.append(entry)
                # Naive probability mapping for V2
                rr = info.get("relative_risk") or 1.5
                prob = rr / (rr + 1.0)
                max_risk_prob = max(max_risk_prob, prob)
            else:
                detected_sensitivity_genes.append(entry)
                
    # Determination:
    # Detected if we found RESISTANCE genes.
    # We report Sensitivity genes in provenance/rationale but they don't drive "Resistance Detected" flag directly
    # unless we want "Mixed Signal". For Prophet "Resistance", we flag bad news only.
    
    detected = len(detected_resistance_genes) > 0
    
    rationale_parts = []
    if detected:
        genes = ", ".join([g["gene"] for g in detected_resistance_genes])
        rationale_parts.append(f"Resistance driver(s) detected: {genes}.")
    
    if detected_sensitivity_genes:
        genes = ", ".join([g["gene"] for g in detected_sensitivity_genes])
        rationale_parts.append(f"Sensitivity marker(s) detected: {genes} (Positive Prognosis).")
        
    if not rationale_parts:
        rationale_parts.append("No genomic resistance drivers detected.")
        
    provenance = {
        "resistance_genes": detected_resistance_genes,
        "sensitivity_genes": detected_sensitivity_genes,
        "validation_source": "OV_Knowledge_Base"
    }
    
    return ResistanceSignalData(
        signal_type=ResistanceSignal.GENE_LEVEL_RESISTANCE,
        detected=detected,
        probability=float(max_risk_prob),
        confidence=0.90 if detected else 0.0,
        rationale=" ".join(rationale_parts),
        provenance=provenance,
        baseline_reliability=1.0 # Genomic data is reliable (not dependent on baseline)
    )


async def detect_ca125_kinetics(
    ca125_history: List[Dict],
    timing_context: Optional["PatientRegimenFeatureTable"] = None
) -> ResistanceSignalData:
    """
    Detect CA-125 Kinetic Resistance (Signal 3 - Dynamic).
    
    Logic:
    1. ENGINE (Priority): KELIM (K < 0.5 or Unfavorable).
    2. HEURISTIC (Fallback): Doubling from Nadir or Monotonic Rise.
    
    Input: List of {"date": "YYYY-MM-DD" or int, "value": float}
    """
    logger.info("Detecting CA125_KINETICS (OV)...")
    
    # 1. ENGINE PATH (Priority)
    if timing_context and timing_context.regimens:
        # Get most recent regimen with KELIM data
        # Assuming regimens are chronological or we take the last one
        last_regimen = timing_context.regimens[-1]
        kelim = last_regimen.chemosensitivity_features.kelim_ca125
        
        if kelim and (kelim.category or kelim.k is not None):
            detected = False
            probability = 0.0
            rationale_parts = []
            
            # Logic: Unfavorable or K < 0.1 (Slow/Rising)
            is_unfavorable = kelim.category == "Unfavorable"
            k_val = kelim.k if kelim.k is not None else 1.0
            
            if is_unfavorable or k_val < 0.1:
                detected = True
                probability = 0.85
                rationale_parts.append(f"Engine-Verified KELIM: {kelim.category or 'Rising/Slow'} (K={k_val}).")
            else:
                rationale_parts.append(f"Engine-Verified KELIM: Favorable/Intermediate (K={k_val}).")
                
            return ResistanceSignalData(
                signal_type=ResistanceSignal.CA125_KINETICS,
                detected=detected,
                probability=probability,
                confidence=0.90, # High confidence in Engine
                rationale=" ".join(rationale_parts),
                provenance={
                    "source": "timing_engine_v1",
                    "kelim": kelim.dict(),
                    "regimen_id": last_regimen.regimen_id
                },
                baseline_reliability=1.0
            )

    # 2. HEURISTIC FALLBACK
    if not ca125_history or len(ca125_history) < 2:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.CA125_KINETICS,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="Insufficient CA-125 history (need >= 2 points) and no Engine KELIM.",
            provenance={"status": "insufficient_data"}
        )
        
    try:
        # Sort by date (assuming isoformat or comparable)
        series = sorted(ca125_history, key=lambda x: str(x.get("date", "")))
        values = [float(x.get("value")) for x in series if x.get("value") is not None]
    except Exception as e:
        logger.error(f"Error parsing CA-125 series: {e}")
        return ResistanceSignalData(
            signal_type=ResistanceSignal.CA125_KINETICS,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="Error parsing CA-125 series",
            provenance={"status": "parse_error"}
        )
    
    if len(values) < 2:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.CA125_KINETICS,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="Insufficient numeric CA-125 values",
            provenance={"status": "insufficient_values"}
        )

    current_val = values[-1]
    nadir = min(values)
    
    detected = False
    probability = 0.0
    rationale_list = []
    
    # Check 1: Progression from Nadir (Rustin Criteria approx)
    if current_val > 20.0: # Minimum threshold absolute
        if current_val >= 2.0 * nadir:
            detected = True
            probability = 0.95
            rationale_list.append(f"Doubling from Nadir ({nadir} -> {current_val}).")
        elif current_val >= 1.5 * nadir:
            if not detected:
                probability = 0.40
                rationale_list.append(f"Rising from Nadir ({nadir} -> {current_val}).")
            
    # Check 2: Recent Trend (Last 3 points)
    if len(values) >= 3:
        recent = values[-3:]
        # Monotonic Increase
        if recent[0] < recent[1] < recent[2]:
            if not detected: 
                detected = True
                probability = max(probability, 0.75)
                rationale_list.append(f"Consecutive rise ({recent[0]}->{recent[1]}->{recent[2]}).")
    
    conf = 0.90 if detected else 0.0
    
    final_rationale = " ".join(rationale_list) if rationale_list else f"Stable kinetics (Current: {current_val}, Nadir: {nadir})."
    
    return ResistanceSignalData(
        signal_type=ResistanceSignal.CA125_KINETICS,
        detected=detected,
        probability=float(probability),
        confidence=float(conf),
        rationale=final_rationale,
        provenance={
            "current": current_val,
            "nadir": nadir,
            "trend": "rising" if detected else "stable"
        },
        baseline_reliability=1.0
    )


async def detect_diamond_features(
    current_sae: Dict
) -> ResistanceSignalData:
    """
    Detect "Diamond" True SAE Features (Verified Resistance Drivers).
    checks for high activation of the 9 validated features (27607, etc).
    
    Source: SAE_FAILURE_POSTMORTEM.mdc
    """
    logger.info("Detecting DIAMOND_SAE_FEATURES...")
    
    # We expect `current_sae` to potentially have a 'features' or 'activations' dict 
    # where keys are string feature indices. 
    # Or, if it is the raw sparse dict itself.
    # We will look for a "features" key first, then fallback to the dict itself.
    
    features_map = current_sae.get("features", current_sae) # Try nested, then self
    
    if not features_map or not isinstance(features_map, dict):
        # Fallback: maybe it's a list? If so, we need index.
        # But SAE service usually returns sparse dict {index: value} or dense list.
        # If dense list:
        if isinstance(features_map, list):
            # Convert to dict for O(1) lookup if possible, or just list access
            pass # Handle below
        else:
             return ResistanceSignalData(
                signal_type=ResistanceSignal.GENE_LEVEL_RESISTANCE, # Overloading this or creating new?
                # Actually, let's stick to GENE_LEVEL or introduce a new SignalType? 
                # Schema might strictly define SignalType. 
                # Let's check Schema. Generic "known_resistance_marker"?
                # For now, we will piggyback on GENURIC_RISK or GENE_LEVEL, 
                # OR better: The "Diamond" features are conceptually "Mechanism Signals".
                # Let's use GENE_LEVEL_RESISTANCE type but with "True SAE" mechanism label for now 
                # to avoid schema breaking, or just check if we can add a type.
                # Re-using GENE_LEVEL_RESISTANCE since it flows into Driver Alerts.
                detected=False,
                probability=0.0,
                confidence=0.0,
                rationale="SAE Features unavailable",
                provenance={"status": "missing_data"}
            )

    from ..constants import DIAMOND_SAE_FEATURES
    
    detected_diamonds = []
    max_prob = 0.0
    
    for feat_idx, meta in DIAMOND_SAE_FEATURES.items():
        # Check if feature is present and active (>0)
        # Handle string/int key mismatch
        val = 0.0
        if isinstance(features_map, list):
             idx = int(feat_idx)
             if idx < len(features_map):
                 val = features_map[idx]
        else:
             val = features_map.get(feat_idx) or features_map.get(int(feat_idx)) or 0.0
             
        if val and val > 0.1: # Threshold for activation
             # Feature is Active
             # Probability derived from Effect Size (Cohen's d).
             # Heuristic: d=0.5 -> prob=0.6, d=1.0 -> prob=0.8
             d = meta["effect_size"]
             # Simple sigmoid-like mapping
             prob = 0.5 + (d * 0.4) # 0.635 -> ~0.75
             max_prob = max(max_prob, prob)
             
             detected_diamonds.append({
                 "index": feat_idx,
                 "value": val,
                 "mechanism": meta["mechanism"],
                 "rationale": meta["rationale"]
             })
             
    detected = len(detected_diamonds) > 0
    
    if detected:
        descriptions = [f"Feature {d['index']} ({d['mechanism']})" for d in detected_diamonds]
        rationale = f"True SAE Diamond Signal: Found {len(detected_diamonds)} validated driver(s): {', '.join(descriptions)}."
    else:
        rationale = "No Diamond SAE features detected."
        
    return ResistanceSignalData(
        signal_type=ResistanceSignal.GENE_LEVEL_RESISTANCE, # Mapping to Driver logic
        detected=detected,
        probability=float(min(0.95, max_prob)),
        confidence=0.90 if detected else 0.0, # High confidence because these are validated
        rationale=rationale,
        provenance={
            "diamond_source": "Phase 2 Postmortem",
            "active_features": detected_diamonds
        },
        baseline_reliability=1.0
    )


async def detect_transcriptomic_risk(
    current_sae: Dict
) -> ResistanceSignalData:
    """
    Detect Transcriptomic Risk (Layer 1 - Intrinsic).
    Checks for high expression of validated markers (MFAP4).
    """
    logger.info("Detecting TRANSCRIPTOMIC_RISK (OV)...")
    
    # Expectation: current_sae has an "expression" key Dict[str, float]
    expression_data = current_sae.get("expression", {})
    
    # If expression data is missing, we check if keys are mixed at root (fallback)
    # But strictly speaking we prefer "expression" dict to be clean.
    if not expression_data:
         # Try logic: check if MFAP4 is in root
         if "MFAP4" in current_sae:
             expression_data = current_sae
    
    if not expression_data:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.GENE_LEVEL_RESISTANCE, # Using GENE_LEVEL but implies RNA
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="Expression data unavailable",
            provenance={"status": "missing_expression_data"}
        )

    from ..constants import OV_TRANSCRIPTOMIC_MARKERS
    
    detected_markers = []
    max_prob = 0.0
    
    for marker, meta in OV_TRANSCRIPTOMIC_MARKERS.items():
        val = expression_data.get(marker)
        if val is not None and float(val) >= meta["threshold"]:
             # Detected
             # Map AUROC to prob? AUROC 0.763 is strong but not 1.0.
             # Let's map high expression to High Risk Prob (0.75+)
             prob = 0.80 # Strong signal
             max_prob = max(max_prob, prob)
             
             detected_markers.append({
                 "marker": marker,
                 "value": val,
                 "mechanism": meta["mechanism"],
                 "rationale": meta["rationale"]
             })
             
    detected = len(detected_markers) > 0
    
    if detected:
        descriptions = [f"{m['marker']} (Val: {m['value']})" for m in detected_markers]
        rationale = f"Intrinsic Resistance (Layer 1): Detected {', '.join(descriptions)}. {detected_markers[0]['rationale']}"
    else:
        rationale = "No transcriptomic resistance markers detected."
        
    return ResistanceSignalData(
        signal_type=ResistanceSignal.GENE_LEVEL_RESISTANCE, # Using GENE_LEVEL for now
        detected=detected,
        probability=float(max_prob),
        confidence=0.85 if detected else 0.0, # High confidence (validated)
        rationale=rationale,
        provenance={
            "source": "GSE63885 Validation",
            "markers": detected_markers
        },
        baseline_reliability=1.0
    )


async def detect_engine_pfi(
    timing_context: Optional["PatientRegimenFeatureTable"]
) -> ResistanceSignalData:
    """
    Detect Platinum Resistance via Engine PFI (Signal 6 - Drug Class).
    
    Logic:
    PFI < 6 months = Platinum Resistant (High Risk).
    PFI 6-12 months = Partially Sensitive (Medium Risk).
    """
    logger.info("Detecting DRUG_CLASS_RESISTANCE (PFI) via Engine...")
    
    if not timing_context or not timing_context.regimens:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.DRUG_CLASS_RESISTANCE,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale="Engine timing context unavailable",
            provenance={"status": "missing_context"}
        )
        
    # Analyze last relevant regimen (Platinum)
    # Ideally filtering for 'platinum' class, but taking last is safe start
    target_regimen = timing_context.regimens[-1]
    pfi = target_regimen.timing_features.pfi_months
    
    detected = False
    probability = 0.0
    rationale = f"PFI: {pfi} months."
    
    if pfi is not None:
        if pfi < 6.0:
            detected = True
            probability = 0.95
            rationale = f"Platinum Resistant: PFI {pfi:.1f} months (< 6m)."
        elif pfi < 12.0:
            # Partially Sensitive - weak signal or Medium Risk (Prophet usually flags High only?)
            # Let's flag it but with lower probability
            detected = True 
            probability = 0.60
            rationale = f"Partially Platinum Sensitive: PFI {pfi:.1f} months (6-12m)."
        else:
            rationale = f"Platinum Sensitive: PFI {pfi:.1f} months (> 12m)."
            
    return ResistanceSignalData(
        signal_type=ResistanceSignal.DRUG_CLASS_RESISTANCE,
        detected=detected,
        probability=probability,
        confidence=0.95, # Verified Engine
        rationale=rationale,
        provenance={
            "source": "timing_engine_v1",
            "pfi_months": pfi,
            "regimen_id": target_regimen.regimen_id
        },
        baseline_reliability=1.0
    )


async def detect_kelim_genotype_convergence(
    mutations: List[Dict],
    timing_context: Optional["PatientRegimenFeatureTable"] = None
) -> ResistanceSignalData:
    """
    Detect KELIM + Genotype Convergence (Signal 3/4 Hybrid).
    
    Post-Audit v2: One-hot genotype encoding.
    Model: Logit(P) = β₀ + β₁(BRCA) + β₂(MAPK) + β₃(K) + β₄(BRCA×K) + β₅(MAPK×K)
    
    Each genotype gets its OWN interaction with K (biologically correct).
    BRCA and MAPK affect different pathways (HR vs RAS/RAF) — they are NOT 
    endpoints of a single axis.
    
    Coefficients fitted on Monte Carlo simulation anchored to:
    - Colomban et al., EBioMedicine 2023 (ARIEL2, n=476) K distributions
    - TCGA-OV (Nature 2011, n=345) resistance prevalence
    
    NOTE: These coefficients are simulation-derived priors. They MUST be
    re-fitted on real serial CA-125 data (ARIEL2/3, GOG-0218) before
    clinical deployment.
    """
    logger.info("Detecting KELIM_GENOTYPE_CONVERGENCE (OV)...")
    
    # 1. One-hot encode genotype (Audit Fix #2)
    brca_mut = 0
    mapk_mut = 0
    genotype_label = "WT / Unknown"
    
    if mutations:
        patient_genes = {m.get("gene", "").upper() for m in mutations}
        if "BRCA1" in patient_genes or "BRCA2" in patient_genes:
            brca_mut = 1
            genotype_label = "BRCA1/2 Mutant"
        if "NF1" in patient_genes or "BRAF" in patient_genes or "KRAS" in patient_genes or "NRAS" in patient_genes:
            mapk_mut = 1
            genotype_label = "MAPK Pathway Mutant" if not brca_mut else "BRCA + MAPK Co-Mutant"
            
    # 2. Extract KELIM K value
    # RES-OV-P0-009 FIX: after the P0-005 rename the log-linear shim populates
    # kelim_obj.k (raw decay constant), while kelim_obj.kelim (normalised KELIM)
    # is None. Reading only .kelim made this signal permanently dead. Read .k as
    # the primary value with .kelim as fallback so Signal 6 fires again.
    kelim_k = None
    kelim_field_used = None
    if timing_context and timing_context.regimens:
        last_regimen = timing_context.regimens[-1]
        kelim_obj = last_regimen.chemosensitivity_features.kelim_ca125
        if kelim_obj is not None:
            if kelim_obj.k is not None:
                kelim_k = float(kelim_obj.k)
                kelim_field_used = "k (raw log-linear decay constant, shim)"
            elif kelim_obj.kelim is not None:
                kelim_k = float(kelim_obj.kelim)
                kelim_field_used = "kelim (normalised)"
            
    if kelim_k is None:
        return ResistanceSignalData(
            signal_type=ResistanceSignal.KELIM_GENOTYPE_CONVERGENCE,
            detected=False,
            probability=0.0,
            confidence=0.0,
            rationale=f"Cannot compute convergence. Missing KELIM kinetics. (Genotype: {genotype_label})",
            provenance={"status": "missing_kelim"}
        )

    # 3. One-hot interaction regression model
    # Logit(P) = β₀ + β₁(BRCA) + β₂(MAPK) + β₃(K) + β₄(BRCA×K) + β₅(MAPK×K)
    # Coefficients from post-audit simulation (Colomban-anchored)
    # IMPORTANT: These are simulation priors — must be re-fitted on real data.
    
    b0 = 2.9076          # Intercept
    b_brca = 0.6015      # BRCA main effect
    b_mapk = 0.3172      # MAPK main effect
    b_kelim = -3.2202    # KELIM main effect (higher K = lower risk)
    b_brca_x_k = -0.9227 # BRCA × K interaction
    b_mapk_x_k = -0.5223 # MAPK × K interaction
    
    logit = (
        b0 
        + b_brca * brca_mut 
        + b_mapk * mapk_mut 
        + b_kelim * kelim_k 
        + b_brca_x_k * (brca_mut * kelim_k)
        + b_mapk_x_k * (mapk_mut * kelim_k)
    )
    
    import math
    try:
        probability = 1.0 / (1.0 + math.exp(-logit))
    except OverflowError:
        probability = 0.0 if logit < 0 else 1.0
        
    detected = probability > 0.60
    
    # Confidence is capped because coefficients are simulation-derived
    confidence = 0.70  # Reduced from 0.85 — coefficients not yet fitted on real data
    
    rationale = (
        f"Multi-Modal Convergence: {genotype_label} + KELIM (K={kelim_k:.2f}). "
        f"Computed Risk Probability: {probability:.2%}. "
        f"{'Convergence Resistance Detected' if detected else 'Favorable Response'}. "
        f"[Simulation-derived coefficients — pending real-data calibration]"
    )
    
    return ResistanceSignalData(
        signal_type=ResistanceSignal.KELIM_GENOTYPE_CONVERGENCE,
        detected=detected,
        probability=float(probability),
        confidence=confidence,
        rationale=rationale,
        provenance={
            "genotype_label": genotype_label,
            "brca_mut": brca_mut,
            "mapk_mut": mapk_mut,
            "kelim_k": kelim_k,
            "brca_x_k": brca_mut * kelim_k,
            "mapk_x_k": mapk_mut * kelim_k,
            "logit_score": logit,
            "model": "One-Hot Interaction Regression v2 (Post-Audit)",
            "coefficient_source": "Simulation-derived, Colomban 2023 anchored",
            "calibration_status": "PENDING_REAL_DATA",
            "kelim_field_used": kelim_field_used,  # RES-OV-P0-009: proves Signal 6 reads .k
            "signal6_status": "WIRED_ACTIVE_SIMULATION_ANCHORED"
        },
        baseline_reliability=1.0
    )


# ──────────────────────────────────────────────────────────────────────
# Signal 7: MRD ctDNA (Modality-Gated)
# ──────────────────────────────────────────────────────────────────────

def detect_mrd_signal(
    ctdna_data: Optional[Dict] = None,
) -> Dict:
    """
    Detect MRD (Minimal Residual Disease) ctDNA signal.
    
    Modality-gated: accepts either panel_proxy or sWGS data and enforces
    the appropriate schema constraints.
    
    Ground Truth Constraints (Alpha-Locked, 2026-03-01):
      1. TF (ichorCNA sWGS) ≠ VAF (panel). Different assay, scale, biology.
      2. PF requires BAM fragment lengths. Cannot reconstruct from panel exports.
      3. 19q12 (CCNE1) ≠ 19q13.42 (ZNF/miR-515). Never conflate.
    
    Actionability gating:
      v1 = prognostic/monitoring only (cannot alter recommendations)
      v2 = multimodal TF+PF grouping (monitoring intensity)
      v3 = decision-triggering (after replay validation)
    
    Reference: Paracchini et al. 2026; CTDNA_MRD_AUDIT.mdc
    """
    from ..mrd_contracts import (
        MRDDataModality, MRDTier, MRDTimepoint, MRDActionability,
        PanelProxyMRD, SWGSFullMRD, MRDSignalResult,
        TF_CUTOFF_EXPLORATORY, PF_CUTOFF_EXPLORATORY,
    )

    # ── No data: return empty signal ──
    if not ctdna_data:
        return MRDSignalResult(
            signal_type="MRD_CTDNA",
            detected=False,
            severity="INFO",
            rationale="No ctDNA data available for this patient.",
            provenance={"module": "ovarian.detect_mrd_signal", "version": "v1.0"}
        ).model_dump()

    modality = ctdna_data.get("data_modality", "panel_proxy")
    patient_id = ctdna_data.get("patient_id", "unknown")
    timepoint = ctdna_data.get("timepoint", "B1")

    # ── Panel Proxy Path (v1) ──
    if modality == "panel_proxy":
        proxy_val = ctdna_data.get("panel_proxy_value")
        trend = ctdna_data.get("trend", "unknown")
        variant_count = ctdna_data.get("variant_count", 0)

        # Construct validated record (schema enforces no TF/PF)
        try:
            record = PanelProxyMRD(
                patient_id=patient_id,
                timepoint=timepoint,
                panel_proxy_value=proxy_val,
                variant_count=variant_count,
                trend=trend,
            )
        except Exception as e:
            logger.error(f"MRD schema validation failed (panel_proxy): {e}")
            return MRDSignalResult(
                detected=False,
                severity="INFO",
                rationale=f"Panel proxy data failed schema validation: {e}",
                provenance={"module": "ovarian.detect_mrd_signal", "error": str(e)}
            ).model_dump()

        # Simple detection: any detectable ctDNA above noise
        detected = proxy_val is not None and proxy_val > 0.001
        severity = "WARNING" if detected and trend == "rising" else "INFO"

        return MRDSignalResult(
            signal_type="MRD_CTDNA",
            detected=detected,
            severity=severity,
            tier=MRDTier.INTERMEDIATE if detected else MRDTier.LOW,
            confidence=0.50,  # Capped: panel proxy, v1 only
            rationale=(
                f"Panel ctDNA proxy detected (VAF={proxy_val:.4f}, "
                f"variants={variant_count}, trend={trend}). "
                f"Labeled as Panel ctDNA Proxy — NOT sWGS Tumor Fraction. "
                f"Prognostic/monitoring only (v1)."
                if detected else
                "No detectable ctDNA from panel proxy."
            ),
            mrd_record=record,
            provenance={
                "module": "ovarian.detect_mrd_signal",
                "modality": "panel_proxy",
                "assay": record.provenance_assay,
                "actionability": record.actionability.value,
                "version": "v1.0",
            }
        ).model_dump()

    # ── sWGS Path (v2) ──
    elif modality == "sWGS":
        tf = ctdna_data.get("tumor_fraction_pct")
        pf = ctdna_data.get("proportion_fragments")
        cnv_events = ctdna_data.get("CNV_events", [])

        if tf is None:
            return MRDSignalResult(
                detected=False,
                severity="INFO",
                rationale="sWGS modality specified but tumor_fraction_pct is missing.",
                provenance={"module": "ovarian.detect_mrd_signal", "error": "missing_tf"}
            ).model_dump()

        # Compute MRD group using exploratory cutoffs
        tf_high = tf >= TF_CUTOFF_EXPLORATORY
        pf_high = pf is not None and pf >= PF_CUTOFF_EXPLORATORY

        if pf is not None:
            if tf_high and pf_high:
                mrd_group = 2
                mrd_tier = MRDTier.HIGH
            elif not tf_high and not pf_high:
                mrd_group = 0
                mrd_tier = MRDTier.LOW
            else:
                mrd_group = 1
                mrd_tier = MRDTier.INTERMEDIATE
        else:
            # PF not available — TF-only stratification
            mrd_group = None
            mrd_tier = MRDTier.HIGH if tf_high else MRDTier.LOW

        # Construct validated record
        try:
            record = SWGSFullMRD(
                patient_id=patient_id,
                timepoint=timepoint,
                tumor_fraction_pct=tf,
                proportion_fragments=pf,
                MRD_group=mrd_group,
                MRD_tier=mrd_tier,
                CNV_events=cnv_events,
            )
        except Exception as e:
            logger.error(f"MRD schema validation failed (sWGS): {e}")
            return MRDSignalResult(
                detected=False,
                severity="INFO",
                rationale=f"sWGS data failed schema validation: {e}",
                provenance={"module": "ovarian.detect_mrd_signal", "error": str(e)}
            ).model_dump()

        detected = tf > TF_CUTOFF_EXPLORATORY or (pf is not None and pf > PF_CUTOFF_EXPLORATORY)
        severity = "CRITICAL" if mrd_tier == MRDTier.HIGH else (
            "WARNING" if mrd_tier == MRDTier.INTERMEDIATE else "INFO"
        )

        pf_str = f", PF={pf:.4f}" if pf is not None else " (PF not available — fragment data not provided)"
        rationale = (
            f"sWGS MRD: TF={tf:.2f}%{pf_str}. "
            f"MRD Group {mrd_group if mrd_group is not None else 'N/A'} ({mrd_tier.value}). "
            f"Cutoffs: TF≥{TF_CUTOFF_EXPLORATORY}%, PF≥{PF_CUTOFF_EXPLORATORY} "
            f"(Paracchini et al. 2026, exploratory — NOT locked clinical thresholds)."
        )

        return MRDSignalResult(
            signal_type="MRD_CTDNA",
            detected=detected,
            severity=severity,
            tier=mrd_tier,
            confidence=0.70 if pf is not None else 0.55,  # Higher with multimodal
            rationale=rationale,
            mrd_record=record,
            provenance={
                "module": "ovarian.detect_mrd_signal",
                "modality": "sWGS",
                "assay": record.provenance_assay,
                "actionability": record.actionability.value,
                "cutoff_source": "Paracchini et al. 2026 (exploratory)",
                "version": "v1.0",
            }
        ).model_dump()

    else:
        return MRDSignalResult(
            detected=False,
            severity="INFO",
            rationale=f"Unknown MRD data modality: {modality}",
            provenance={"module": "ovarian.detect_mrd_signal", "error": "unknown_modality"}
        ).model_dump()


# ──────────────────────────────────────────────────────────────────────
# Signal 7b: ctDNA / MRD — PROGNOSTIC-ONLY bridge (RES-OV-P0-006 FIX)
# ──────────────────────────────────────────────────────────────────────
#
# Bridges the externally-reproduced Paracchini et al. 2026 ctDNA method
# (kinetics/ctdna_mrd.py — TF/PF headline numbers reproduced exactly) into the
# Prophet signal system as a PROGNOSTIC-ONLY signal.
#
# HONESTY CONTRACT (V1 "Panel ctDNA Proxy" / prognostic-only):
#   The emitted ResistanceSignalData carries detected=False on purpose. In this
#   engine, compute_probability()/stratify_risk() only consume signals where
#   `detected and confidence > 0`. Emitting detected=False therefore *structurally
#   guarantees* the ctDNA tier is EXCLUDED from the resistance probability and the
#   drug-routing signal count, while still travelling in signals_detected so the
#   clinician sees the ctDNA tier + prognostic context. This is the V1 contract
#   from the method's own honesty ladder (V2 grouping code-complete but gated off;
#   V3 decision-triggering NOT implemented). influences_routing is always False.
#
#   Provenance flips ctdna_status: NOT_WIRED_INTO_PROPHET -> WIRED_PROGNOSTIC_ONLY_V1.

async def detect_ctdna_mrd_signal(
    ctdna_context: Optional[Dict] = None,
) -> ResistanceSignalData:
    """
    Prognostic-only ctDNA/MRD signal (RES-OV-P0-006 wiring).

    Consumes an optional ctdna_context dict (keys: tumor_fraction,
    proportion_fragments, panel_vaf, status) via the reproduced-from-published
    evaluate_ctdna_mrd() classifier and surfaces the ctDNA prognostic tier.

    ALWAYS returns detected=False so it can never enter the routing probability
    (prognostic-only contract). Returns a not-detected/empty signal when no
    ctDNA input is present.
    """
    logger.info("Detecting ctDNA_MRD (OV) — prognostic-only V1 bridge...")

    # Import the externally-reproduced classifier (kinetics/ctdna_mrd.py)
    try:
        from ..kinetics.ctdna_mrd import evaluate_ctdna_mrd
    except Exception as e:  # pragma: no cover - import guard
        logger.error(f"ctDNA module import failed: {e}")
        return ResistanceSignalData(
            signal_type=ResistanceSignal.MRD_CTDNA,
            detected=False, probability=0.0, confidence=0.0,
            rationale=f"ctDNA module unavailable: {e}",
            provenance={"ctdna_status": "MODULE_IMPORT_ERROR"},
            baseline_reliability=1.0,
        )

    result = evaluate_ctdna_mrd(ctdna_context)

    if result is None:
        # No ctDNA input — signal simply absent (not an error).
        return ResistanceSignalData(
            signal_type=ResistanceSignal.MRD_CTDNA,
            detected=False, probability=0.0, confidence=0.0,
            rationale="No ctDNA input provided (signal absent).",
            provenance={
                "ctdna_status": "WIRED_PROGNOSTIC_ONLY_V1",
                "input_present": False,
            },
            baseline_reliability=1.0,
        )

    # Build prognostic-only rationale.
    pfs_ctx = (
        f" Reproduced median PFS context for this group: "
        f"{result.median_pfs_months_context:.1f} mo."
        if result.median_pfs_months_context is not None else ""
    )
    rationale = (
        f"ctDNA/MRD prognostic tier: {result.tier}"
        f"{f' (group {result.group}: {result.group_label})' if result.group is not None else ''}. "
        f"Version={result.version}. PROGNOSTIC-ONLY — does NOT change resistance "
        f"probability or drug routing (V1 contract).{pfs_ctx}"
    )

    prov = dict(result.provenance)
    prov.update({
        "ctdna_status": "WIRED_PROGNOSTIC_ONLY_V1",
        "input_present": True,
        "prognostic_only": True,
        "influences_routing": False,
        "tier": result.tier,
        "group": result.group,
        "version": result.version,
    })

    return ResistanceSignalData(
        signal_type=ResistanceSignal.MRD_CTDNA,
        detected=False,          # <-- prognostic-only: never enters routing math
        probability=0.0,         # <-- never contributes to resistance probability
        confidence=0.0,          # <-- excluded by compute_probability() filter
        rationale=rationale,
        provenance=prov,
        baseline_reliability=1.0,
    )
