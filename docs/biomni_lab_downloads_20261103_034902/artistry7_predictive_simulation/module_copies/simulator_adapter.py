"""
Layer 1 Engine (RUO) — ARTISTRY-7 Lazarus reprogramming SIMULATION adapter.

Wraps the EXISTING deterministic intervention simulator and maps its timeline to
the tumor-board `simulated_predictive_outcome` schema. NO new math is introduced:
`INTERVENTION_MODELS`, `_recompute_immune_access`, and `simulate_treatment_sequence`
are vendored VERBATIM from:

    data-room/datasets/artistry7-platinum-window/publications/
        11-artistry7-hgsoc-subgroup/scripts/simulate_intervention.py

Source provenance (recorded on every payload):
    script_path      : publications/11-artistry7-hgsoc-subgroup/scripts/simulate_intervention.py
    source_sha256    : aeee8b543bde0cbeff101b0343dc2743b99ef61c4f969cd78776d6e47648535b
    dataroom_commit  : a54b8a11be7d0f1a58be256ade38b313408e0b11

HARD GUARANTEES:
  * Outputs are SCORE deltas + universe A->B + prereq flags. NEVER Kaplan-Meier
    individual OS. `predicted_os_months` is never emitted for a patient.
  * The 84.13-month figure appears ONLY inside `reference_anchor` with
    role="cohort_anchor_not_patient_prediction".
  * IMMUNE_ACCESS threshold 0.40 (universe A/B) is a hardcoded design constant.
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

# ----- provenance constants (verified against the on-disk source of truth) -----
SIMULATOR_SCRIPT_PATH = (
    "publications/11-artistry7-hgsoc-subgroup/scripts/simulate_intervention.py"
)
SIMULATOR_SOURCE_SHA256 = (
    "aeee8b543bde0cbeff101b0343dc2743b99ef61c4f969cd78776d6e47648535b"
)
DATAROOM_COMMIT = "a54b8a11be7d0f1a58be256ade38b313408e0b11"

UNIVERSE_THRESHOLD = 0.40  # hardcoded design constant (IMMUNE_ACCESS > 0.40 -> universe B)

# Default reprogramming sequence = mission "Sequence B" (3-step core triple).
SEQUENCE_B_CORE = ["METFORMIN", "DUPILUMAB", "CHECKPOINT_INHIBITOR"]
# Documented alternative = simulator's 4-step window sequence (annotation-only rechallenge).
SEQUENCE_B_WINDOW_RECHALLENGE = [
    "METFORMIN", "DUPILUMAB", "PLATINUM_RECHALLENGE", "CHECKPOINT_INHIBITOR"
]

# Cohort anchor (NOT a patient prediction).
REFERENCE_ANCHOR = {
    "label": "PLATINUM_WINDOW_KM_MEDIAN_OS",
    "value_months": 84.13,
    "n": 9,
    "events": 5,
    "role": "cohort_anchor_not_patient_prediction",
}

DISCLAIMERS = [
    "RUO",
    "not_clinical_decision_support",
    "not_validated_predictive_biomarker",
    "IMMUNE_ACCESS_external_AUROC_NOT_SUPPORTED",
]

# The score keys the simulator reads from a patient row.
SCORE_KEYS = [
    "mTOR_score",
    "AMPK_INV_SCORE",
    "IGF_score",
    "M2_RISK_SCORE",
    "TCELL_GPS_SCORE",
    "MYELOID_FLOOD_SCORE",
    "STROMAL_CAGE_SCORE",
    "CAF_RISK_SCORE",
    "TGFB_OUTPUT_SCORE",
]

# ============================================================================
# VENDORED VERBATIM from simulate_intervention.py (do not modify the math).
# ============================================================================
INTERVENTION_MODELS: Dict[str, Dict[str, Any]] = {
    "METFORMIN": {
        "expected_shifts": {
            "mTOR_score": -0.35,
            "AMPK_INV_SCORE": -0.30,
            "IGF_score": -0.20,
        },
        "secondary_effects": {
            "_note_pdl1_stability": -0.25,
            "_note_immune_synergy": +0.15,
        },
    },
    "DUPILUMAB": {
        "expected_shifts": {
            "M2_RISK_SCORE": -0.40,
            "MYELOID_FLOOD_SCORE": -0.25,
        },
        "secondary_effects": {
            "TCELL_GPS_SCORE": +0.20,
            "IMMUNE_ACCESS_SCORE": +0.30,
        },
    },
    "NINTEDANIB": {
        "expected_shifts": {
            "CAF_RISK_SCORE": -0.30,
            "STROMAL_CAGE_SCORE": -0.25,
            "TGFB_OUTPUT_SCORE": -0.20,
        },
        "secondary_effects": {
            "IMMUNE_ACCESS_SCORE": +0.20,
        },
    },
    "CHECKPOINT_INHIBITOR": {
        "prerequisite_check": {
            "IMMUNE_ACCESS_SCORE": 0.40,
            "M2_RISK_SCORE": 0.30,
        },
        "expected_shifts": {
            "TCELL_GPS_SCORE": +0.50,
        },
        "notes": "Ineffective if prerequisites not met (ARTISTRY-7 control failure mode).",
    },
    "PLATINUM_RECHALLENGE": {
        "expected_shifts": {},
        "secondary_effects": {},
        "notes": "Mechanism: AMPK activation can enhance platinum sensitivity while suppressing mTOR (see PMC9899624).",
    },
}


def _recompute_immune_access(sim: Dict[str, float]) -> float:
    return (
        sim.get("TCELL_GPS_SCORE", 0.0) * 0.40
        + -sim.get("MYELOID_FLOOD_SCORE", 0.0) * 0.35
        + -sim.get("STROMAL_CAGE_SCORE", 0.0) * 0.25
    )


def simulate_treatment_sequence(
    patient_scores: Dict[str, float], sequence: List[str]
) -> List[Dict[str, Any]]:
    simulated = dict(patient_scores)
    simulated["IMMUNE_ACCESS_SCORE"] = _recompute_immune_access(simulated)
    timeline: List[Dict[str, Any]] = []

    for drug in sequence:
        model = INTERVENTION_MODELS.get(drug, {})

        prereqs = model.get("prerequisite_check", {})
        prereq_met = True
        for score, threshold in prereqs.items():
            if score == "M2_RISK_SCORE":
                prereq_met = prereq_met and (simulated.get(score, 0.0) <= float(threshold))
            else:
                prereq_met = prereq_met and (simulated.get(score, 0.0) >= float(threshold))

        shifts = model.get("expected_shifts", {}) or {}
        secondary = model.get("secondary_effects", {}) or {}

        for score, delta in {**shifts, **secondary}.items():
            if str(score).startswith("_note_"):
                continue
            simulated[score] = float(simulated.get(score, 0.0) + float(delta))

        simulated["IMMUNE_ACCESS_SCORE"] = _recompute_immune_access(simulated)

        timeline.append(
            {
                "drug": drug,
                "prereq_met": bool(prereq_met),
                "post_scores": dict(simulated),
                "universe": "B" if simulated.get("IMMUNE_ACCESS_SCORE", 0.0) > 0.40 else "A",
                "notes": model.get("notes"),
            }
        )

    return timeline
# ============================================================================
# END VENDORED BLOCK
# ============================================================================


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def _base_scores_from_row(row: Dict[str, Any]) -> Dict[str, float]:
    """Build the simulator input vector from a Lazarus row (missing -> 0.0)."""
    def _f(x: Any) -> float:
        try:
            return float(x)
        except (TypeError, ValueError):
            return 0.0

    scores = {k: _f(row.get(k)) for k in SCORE_KEYS}
    # Seed IMMUNE_ACCESS from the row if present; the simulator recomputes it anyway.
    if row.get("IMMUNE_ACCESS_SCORE") is not None:
        scores["IMMUNE_ACCESS_SCORE"] = _f(row.get("IMMUNE_ACCESS_SCORE"))
    return scores


def _provenance(sample_id: str, flag_value: bool) -> Dict[str, Any]:
    return {
        "status": "simulated_predictive_reprogramming",
        "mathematical_integrity": "deterministic_hypothesis",
        "reproduction_basis": "artistry7_sequence_B_lazarus_simulator",
        "flag_value": bool(flag_value),
        "script_path": SIMULATOR_SCRIPT_PATH,
        "code_sha256": SIMULATOR_SOURCE_SHA256,
        "dataroom_commit": DATAROOM_COMMIT,
        "input_sample_id": sample_id,
        "run_id": str(uuid.uuid4()),
        "run_timestamp_utc": _now_iso(),
    }


def run_simulation(
    artistry7_row: Dict[str, Any],
    flag_value: bool = True,
    sequence_variant: str = "core",
    include_reference_anchor: bool = True,
) -> Dict[str, Any]:
    """
    Run the reprogramming SIMULATION for one eligible patient and return the
    `simulated_predictive_outcome` payload (status='simulated_predictive_reprogramming').

    Caller MUST have already confirmed eligibility (see predictive_simulation_gate).
    sequence_variant: "core" (3-step, default) or "window_rechallenge" (4-step).
    """
    sample_id = str(
        artistry7_row.get("SAMPLE_ID") or artistry7_row.get("sample_id") or "unknown"
    )
    sequence = (
        SEQUENCE_B_WINDOW_RECHALLENGE
        if sequence_variant == "window_rechallenge"
        else SEQUENCE_B_CORE
    )

    base_scores = _base_scores_from_row(artistry7_row)
    # Universe/pre_scores are taken AFTER the simulator's initial IMMUNE_ACCESS recompute,
    # so pre and post are on the same footing.
    seeded = dict(base_scores)
    seeded["IMMUNE_ACCESS_SCORE"] = _recompute_immune_access(seeded)
    pre_scores = dict(seeded)
    universe_before = "B" if pre_scores["IMMUNE_ACCESS_SCORE"] > UNIVERSE_THRESHOLD else "A"

    timeline = simulate_treatment_sequence(base_scores, sequence)
    post_scores = dict(timeline[-1]["post_scores"]) if timeline else dict(pre_scores)
    universe_after = timeline[-1]["universe"] if timeline else universe_before

    # prereq_met = AND across the steps that actually carry a prerequisite check
    prereq_bearing = [
        step for step in timeline if INTERVENTION_MODELS.get(step["drug"], {}).get("prerequisite_check")
    ]
    prereq_met = all(step["prereq_met"] for step in prereq_bearing) if prereq_bearing else None

    delta_summary = {
        k: round(float(post_scores.get(k, 0.0)) - float(pre_scores.get(k, 0.0)), 6)
        for k in sorted(set(list(pre_scores.keys()) + list(post_scores.keys())))
    }
    delta_summary["IMMUNE_ACCESS_delta"] = round(
        float(post_scores.get("IMMUNE_ACCESS_SCORE", 0.0))
        - float(pre_scores.get("IMMUNE_ACCESS_SCORE", 0.0)),
        6,
    )
    universe_transition = f"{universe_before}->{universe_after}"

    payload = _provenance(sample_id, flag_value)
    payload.update(
        {
            "mathematical_integrity": "deterministic_hypothesis",
            "reproduction_basis": "artistry7_sequence_B_lazarus_simulator",
            "analogy_note": (
                "GSE102073 direction flip is NS (p~0.476); used as narrative analogy only, "
                "not a fitted survival model."
            ),
            "hypothesis": (
                "If baseline = TIER_1_TRIPLE AND TIER_1A_ACCESSIBLE, does Sequence B "
                "(Metformin->Dupilumab->IO) produce a simulated score-space / universe shift "
                "consistent with the ARTISTRY-7 rescue narrative, using the existing Lazarus "
                "simulator (NOT a survival regression fit to 84.1)?"
            ),
            "eligibility": {
                "tier": str(artistry7_row.get("TIER") or ""),
                "tier_refined": str(artistry7_row.get("TIER_REFINED") or ""),
                "platinum_window": True,
                "platinum_status": str(artistry7_row.get("PLATINUM_STATUS") or "unknown"),
                "flag_on": bool(flag_value),
            },
            "sequence": sequence,
            "sequence_variant": sequence_variant,
            "universe_threshold": UNIVERSE_THRESHOLD,
            "pre_scores": {k: round(float(v), 6) for k, v in pre_scores.items()},
            "post_scores": {k: round(float(v), 6) for k, v in post_scores.items()},
            "universe_before": universe_before,
            "universe_after": universe_after,
            "universe_transition": universe_transition,
            "prereq_met": prereq_met,
            "timeline": timeline,
            "delta_summary": delta_summary,
            "reference_anchor": (dict(REFERENCE_ANCHOR) if include_reference_anchor else None),
            "disclaimers": list(DISCLAIMERS),
        }
    )
    return payload
