"""
PLCO CA-125 Kinetics Anchor
===========================

Real, externally-validated CA-125 kinetics from the PLCO ovarian screening cohort.
Replaces the crude peak-minus-trough `ca125_rise_delta` with two principled
longitudinal features:

  1. log_slope  — OLS slope of ln(CA-125) vs days (mirrors the KELIM log-linear shim).
  2. velocity   — mean absolute change in CA-125 per year (rising-marker / ROCA-style proxy).

SCIENTIFIC SCOPE (honest):
  PLCO is a *screening* cohort. There is no platinum treatment window and no
  resistance outcome. This module therefore validates a CA-125 *kinetics /
  rising-marker early-signal* against the real incident-ovarian-cancer outcome
  (`ovar_cancer`). It says NOTHING about treatment resistance and MUST NOT be
  used as a resistance predictor. Tier: externally validated (RUO).

ANCHOR EXTRACTION RULE (locked):
  Series rows are slot status, not exams. A timepoint counts only when BOTH the
  assay level and the day offset are present. Not-done codes (8/9) carry no
  level/days and are naturally excluded. Kinetic anchors require >= 2 completed
  timepoints. For incident cases, only measurements strictly BEFORE the diagnosis
  day are used (non-leaky, prospective).

This module is pure-Python + numpy so it imports cleanly inside the engine and in
offline validation. No pandas dependency at import time.
"""

from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import List, Optional, Sequence, Tuple, Dict, Any
import math

# CA-125 result codes that mean "not done" — never valid kinetic timepoints.
NOT_DONE_CODES = {8, 9}

# Minimum completed timepoints required to fit a slope.
MIN_TIMEPOINTS = 2

# Floor for CA-125 before log transform (U/mL). Values <= 0 are non-physical.
CA125_FLOOR = 0.1


@dataclass
class CA125Point:
    """A single completed CA-125 measurement."""
    day: float          # days from baseline/enrollment
    level: float        # CA-125 U/mL
    result_code: Optional[int] = None


@dataclass
class CA125KineticsResult:
    """Output of the kinetics estimator for one patient."""
    n_timepoints: int
    log_slope: Optional[float]          # ln(U/mL) per day
    log_slope_per_year: Optional[float] # ln(U/mL) per 365.25 days (interpretable)
    velocity: Optional[float]           # U/mL per year (rising-marker proxy)
    baseline_level: Optional[float]
    peak_level: Optional[float]
    span_days: Optional[float]
    modeling_approach: str = "log_linear_ols"
    provenance: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


def _ols_slope(x: Sequence[float], y: Sequence[float]) -> Optional[float]:
    """Ordinary least squares slope of y on x. Returns None if undefined."""
    n = len(x)
    if n < 2:
        return None
    mx = sum(x) / n
    my = sum(y) / n
    sxx = sum((xi - mx) ** 2 for xi in x)
    if sxx == 0:  # all timepoints identical -> slope undefined
        return None
    sxy = sum((xi - mx) * (yi - my) for xi, yi in zip(x, y))
    return sxy / sxx


def compute_ca125_kinetics(
    points: Sequence[CA125Point],
    diagnosis_day: Optional[float] = None,
) -> CA125KineticsResult:
    """
    Compute CA-125 kinetics from completed measurements for one patient.

    Args:
        points: completed CA-125 points (level + day present). Not-done codes are
            filtered here as a defensive second layer.
        diagnosis_day: if provided (incident case), only measurements strictly
            before this day are used (non-leaky, prospective prediction).

    Returns:
        CA125KineticsResult. If fewer than MIN_TIMEPOINTS usable points remain,
        slope/velocity are None and provenance records why.
    """
    # Defensive filtering: drop not-done codes and non-physical / missing values.
    usable: List[CA125Point] = []
    for p in points:
        if p.result_code is not None and int(p.result_code) in NOT_DONE_CODES:
            continue
        if p.level is None or p.day is None:
            continue
        if not math.isfinite(p.level) or not math.isfinite(p.day):
            continue
        if p.level <= 0:
            continue
        if diagnosis_day is not None and p.day >= diagnosis_day:
            continue  # leakage guard: only pre-diagnosis points
        usable.append(p)

    usable.sort(key=lambda q: q.day)
    n = len(usable)

    prov: Dict[str, Any] = {
        "rule": "assay_level+days present; codes 8/9 excluded; pre-diagnosis only",
        "n_input_points": len(points),
        "n_usable_points": n,
        "diagnosis_day_applied": diagnosis_day is not None,
        "tier": "externally_validated_RUO",
        "scope": "screening_early_signal_only__NOT_treatment_resistance",
    }

    if n < MIN_TIMEPOINTS:
        prov["status"] = "insufficient_timepoints"
        return CA125KineticsResult(
            n_timepoints=n, log_slope=None, log_slope_per_year=None,
            velocity=None, baseline_level=None, peak_level=None,
            span_days=None, provenance=prov,
        )

    days = [max(p.day, 0.0) for p in usable]
    levels = [max(p.level, CA125_FLOOR) for p in usable]
    log_levels = [math.log(v) for v in levels]

    slope = _ols_slope(days, log_levels)  # ln per day
    span = days[-1] - days[0]

    # Velocity: mean absolute change per year across consecutive points.
    vel_terms = []
    for a in range(1, n):
        dd = days[a] - days[a - 1]
        if dd > 0:
            vel_terms.append((levels[a] - levels[a - 1]) / dd)
    velocity = (sum(vel_terms) / len(vel_terms) * 365.25) if vel_terms else None

    prov["status"] = "ok" if slope is not None else "degenerate_x"
    return CA125KineticsResult(
        n_timepoints=n,
        log_slope=slope,
        log_slope_per_year=(slope * 365.25) if slope is not None else None,
        velocity=velocity,
        baseline_level=levels[0],
        peak_level=max(levels),
        span_days=span,
        provenance=prov,
    )


def points_from_plco_row(row: Dict[str, Any], n_slots: int = 6) -> List[CA125Point]:
    """
    Build CA125Point list from a wide PLCO patient row using columns
    ca125_level{i}, ca125_days{i}, ca125_result{i}.
    """
    pts: List[CA125Point] = []
    for i in range(n_slots):
        lv = row.get(f"ca125_level{i}")
        dy = row.get(f"ca125_days{i}")
        rc = row.get(f"ca125_result{i}")
        if lv is None or dy is None:
            continue
        try:
            lv_f = float(lv); dy_f = float(dy)
        except (TypeError, ValueError):
            continue
        if not (math.isfinite(lv_f) and math.isfinite(dy_f)):
            continue
        rc_i = None
        try:
            if rc is not None and math.isfinite(float(rc)):
                rc_i = int(float(rc))
        except (TypeError, ValueError):
            rc_i = None
        pts.append(CA125Point(day=dy_f, level=lv_f, result_code=rc_i))
    return pts
