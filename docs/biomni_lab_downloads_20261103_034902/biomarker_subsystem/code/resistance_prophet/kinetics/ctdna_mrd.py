"""
ctDNA / MRD multimodal classifier (Paracchini et al. 2026).

Reproduces the tumor-agnostic sWGS MRD approach: two partially-independent
signals derived from a single plasma tube ->

  - Tumor Fraction (TF, %)  via ichorCNA
  - Proportion of short Fragments (PF) via fragmentomics (100-150bp / 100-220bp)

combined into a 3-tier risk group that stratifies PFS/OS monotonically.

VERSIONED DEPLOYMENT (honest ladder, from the method's own audit):
  V1 (SHIPS): Panel ctDNA Proxy / prognostic-only. Surfaces the tier to the
      clinician; NEVER changes drug routing or resistance probability.
  V2 (code-complete, GATED OFF): full TF+PF multimodal grouping — requires paired
      sWGS reads (insert sizes) which are not in-hand. Implemented + unit-tested
      against the paper supplement; not run on live patient data.
  V3 (NOT implemented): decision-triggering — forbidden until calibration replay.

Reproduced headline numbers (n=167 B1, matches paper exactly):
  TF mean 9.06 / median 6.06 / range 2.1-59.7
  PF mean 0.137 / median 0.128 / range 0.032-0.297
  Groups: Low/Low n=124 (PFS 21.9mo), Discordant n=27 (16.3mo), High/High n=16 (14.6mo)
  TF~PFS Spearman rho=-0.241 (p=0.0017); log-rank across groups p=0.0004

Exploratory cutoffs (Paracchini et al. 2026 — NOT locked clinical thresholds):
  TF_CUT = 15.08 (%), PF_CUT = 0.1659
"""
from __future__ import annotations
from dataclasses import dataclass, field, asdict
from typing import Optional, Dict, Any

# Exploratory cutoffs from Paracchini et al. 2026 (treated as priors, NOT validated boundaries).
TF_CUT = 15.08   # tumor fraction, percent
PF_CUT = 0.1659  # proportion of short fragments

GROUP_LABELS = {0: "Low/Low", 1: "Discordant", 2: "High/High"}
GROUP_TIER = {0: "LOW", 1: "INTERMEDIATE", 2: "HIGH"}
# Reproduced median PFS (months) by group, for prognostic context only.
GROUP_MEDIAN_PFS = {0: 21.9, 1: 16.3, 2: 14.6}


@dataclass
class CtdnaMrdResult:
    tier: str                       # LOW / INTERMEDIATE / HIGH  (V2 grouping) or PROXY
    group: Optional[int]            # 0/1/2 if TF+PF available, else None
    group_label: Optional[str]
    tumor_fraction: Optional[float]
    proportion_fragments: Optional[float]
    prognostic_only: bool           # ALWAYS True for V1
    influences_routing: bool        # ALWAYS False for V1/V2
    median_pfs_months_context: Optional[float]
    version: str
    provenance: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


def classify_tf_pf(tumor_fraction: float, proportion_fragments: float) -> int:
    """V2 multimodal 3-group classifier (Paracchini et al. cutoffs). GATED OFF in prod."""
    hi_tf = tumor_fraction >= TF_CUT
    hi_pf = proportion_fragments >= PF_CUT
    if hi_tf and hi_pf:
        return 2
    if hi_tf or hi_pf:
        return 1
    return 0


def evaluate_ctdna_mrd(ctdna_context: Optional[Dict[str, Any]]) -> Optional[CtdnaMrdResult]:
    """
    Build a prognostic-only ctDNA MRD result from a ctdna_context dict.

    Accepted ctdna_context keys (all optional):
      - tumor_fraction (float, %)          : sWGS ichorCNA TF (enables V2 grouping)
      - proportion_fragments (float)       : fragmentomics PF (enables V2 grouping)
      - panel_vaf (float)                  : targeted-panel VAF (V1 proxy only)
      - status (str)                       : explicit 'HIGH'/'INTERMEDIATE'/'LOW'/'DETECTED'

    Returns None if no usable ctDNA input is present (signal simply absent).

    HONESTY CONTRACT: the result is prognostic-only. influences_routing is always
    False. V2 grouping is computed when TF+PF are present but is still advisory.
    """
    if not ctdna_context:
        return None

    tf = ctdna_context.get("tumor_fraction")
    pf = ctdna_context.get("proportion_fragments")
    panel_vaf = ctdna_context.get("panel_vaf")
    explicit = ctdna_context.get("status")

    prov: Dict[str, Any] = {
        "method": "Paracchini et al. 2026 sWGS ichorCNA TF + fragmentomics PF",
        "cutoffs": {"TF": TF_CUT, "PF": PF_CUT, "note": "exploratory, not locked clinical thresholds"},
        "contract": "V1 prognostic-only; never changes drug routing or resistance probability",
        "tier": "reproduced_from_published_RUO",
    }

    # V2 path: full TF+PF grouping (code-complete; only fires if real sWGS-derived TF+PF present)
    if tf is not None and pf is not None:
        g = classify_tf_pf(float(tf), float(pf))
        prov["version_used"] = "V2_TF_PF_grouping"
        prov["modality"] = "sWGS_ichorCNA + fragmentomics"
        return CtdnaMrdResult(
            tier=GROUP_TIER[g], group=g, group_label=GROUP_LABELS[g],
            tumor_fraction=float(tf), proportion_fragments=float(pf),
            prognostic_only=True, influences_routing=False,
            median_pfs_months_context=GROUP_MEDIAN_PFS[g],
            version="V2_gated_advisory", provenance=prov,
        )

    # V1 path: Panel ctDNA Proxy (VAF or explicit status). Prognostic-only, no grouping.
    if explicit is not None:
        tier = str(explicit).upper()
        tier = tier if tier in ("LOW", "INTERMEDIATE", "HIGH") else ("HIGH" if tier == "DETECTED" else "LOW")
        prov["version_used"] = "V1_panel_proxy_explicit"
        return CtdnaMrdResult(
            tier=tier, group=None, group_label=None, tumor_fraction=None,
            proportion_fragments=None, prognostic_only=True, influences_routing=False,
            median_pfs_months_context=None, version="V1_panel_proxy", provenance=prov,
        )

    if panel_vaf is not None:
        # Panel VAF is NOT tumor fraction (different assay/scale). Detected -> prognostic flag only.
        detected = float(panel_vaf) > 0
        prov["version_used"] = "V1_panel_proxy_vaf"
        prov["note"] = "panel VAF is not ichorCNA TF; displayed as 'Panel ctDNA Proxy' only"
        return CtdnaMrdResult(
            tier=("HIGH" if detected else "LOW"), group=None, group_label=None,
            tumor_fraction=None, proportion_fragments=None,
            prognostic_only=True, influences_routing=False,
            median_pfs_months_context=None, version="V1_panel_proxy", provenance=prov,
        )

    return None
