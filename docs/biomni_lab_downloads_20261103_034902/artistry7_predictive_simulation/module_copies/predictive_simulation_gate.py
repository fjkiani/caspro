"""
Layer 2 Gate — Predictive Reprogramming Simulation eligibility.

Decides whether a case is eligible to run the ARTISTRY-7 Lazarus reprogramming
SIMULATION (RUO, hypothesis-only). This gate does NOT run the simulation and does
NOT make any predictive/treatment claim; it only reports eligibility.

All gates must pass:
  1. predictive-simulation feature flag is ON
  2. tier          == TIER_1_TRIPLE
  3. tier_refined  == TIER_1A_ACCESSIBLE
  4. PLATINUM_WINDOW == true   (matches simulate_intervention PLATINUM_WINDOW definition)

Locked facts (do not re-litigate):
  - TIER_1A vs 1B log-rank p~0.126 (NS): access does NOT dictate survival.
  - PLATINUM_WINDOW KM median ~84.1 mo is n=9/5 events; never a patient OS.
  - This gate is prognostic-tier bookkeeping only.
"""

from __future__ import annotations

import os
from typing import Any, Dict, List, Optional, Tuple

TIER_REQUIRED = "TIER_1_TRIPLE"
TIER_REFINED_REQUIRED = "TIER_1A_ACCESSIBLE"

ENV_FLAG = "PREDICTIVE_SIMULATION_MODE"


def flag_enabled(
    request_flag: Optional[bool] = None,
    env: Optional[Dict[str, str]] = None,
) -> bool:
    """
    Effective flag = env(PREDICTIVE_SIMULATION_MODE) OR request(include_predictive_simulation).
    Default OFF. Either channel can enable it; neither is required.
    """
    _env = env if env is not None else os.environ
    env_val = str(_env.get(ENV_FLAG, "false")).strip().lower() in ("1", "true", "yes", "on")
    req_val = bool(request_flag) if request_flag is not None else False
    return env_val or req_val


def _truthy_window(value: Any) -> bool:
    """Normalize the PLATINUM_WINDOW cell (bool / 'True' / 'true' / 1) to a strict bool."""
    if isinstance(value, bool):
        return value
    if value is None:
        return False
    return str(value).strip().lower() in ("1", "true", "yes")


def evaluate_eligibility(
    artistry7_row: Optional[Dict[str, Any]],
    request_flag: Optional[bool] = None,
    env: Optional[Dict[str, str]] = None,
) -> Tuple[bool, str, List[Dict[str, Any]], bool]:
    """
    Returns (eligible, status, gate_failures, flag_on).

    status is one of:
      - "disabled"   : flag off (simulation must not run)
      - "ineligible" : flag on but one or more gates failed
      - "eligible"   : flag on and all gates passed

    gate_failures: list of {gate, expected, actual} for each failed gate (flag-on path only).
    """
    flag_on = flag_enabled(request_flag=request_flag, env=env)
    if not flag_on:
        return (False, "disabled", [], False)

    failures: List[Dict[str, Any]] = []
    row = artistry7_row or {}

    tier = str(row.get("TIER") or row.get("tier") or "")
    tier_refined = str(row.get("TIER_REFINED") or row.get("tier_refined") or "")
    window_raw = row.get("PLATINUM_WINDOW", row.get("platinum_window"))
    window = _truthy_window(window_raw)

    if tier != TIER_REQUIRED:
        failures.append({"gate": "tier", "expected": TIER_REQUIRED, "actual": tier or None})
    if tier_refined != TIER_REFINED_REQUIRED:
        failures.append({"gate": "tier_refined", "expected": TIER_REFINED_REQUIRED, "actual": tier_refined or None})
    if not window:
        failures.append({"gate": "platinum_window", "expected": True, "actual": window})

    if failures:
        return (False, "ineligible", failures, True)
    return (True, "eligible", [], True)
