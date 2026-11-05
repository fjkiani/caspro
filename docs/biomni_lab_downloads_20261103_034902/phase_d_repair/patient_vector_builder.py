"""
Patient Vector Builder — Phase D Remediation
============================================
Builds an 8D PATH A patient mechanism vector from a PatientState, wiring
biomarkers and somatic mutations into the axes each engine actually reads.

Axes (canonical order, LOCKED):
    ["ddr", "mapk", "pi3k", "vegf", "her2", "io", "efflux", "rss"]

PATH A formula (locked 2026-04-28 by Fahad Kiani):
    fit = clip((p · t) / ‖t‖₂, 0, 1)

Consumed fields (all optional; missing → axis stays 0.0 with a NULL_INPUT stamp):
    biomarkers:
        pd_l1_cps            (float 0-100)   → io
        pd_l1_tps            (float 0-100)   → io
        msi_status           ("MSI-H"|"MSS"|"MSI-L"|"UNKNOWN") → io
        tmb                  (float mut/Mb)  → io  (lineage-gated: only tissue-agnostic when >=10)
        ptmb                 (float mut/Mb)  → io  (plasma, CO.26 anchor)
        ctdna_positive       (bool)          → ddr (advisory nudge only when HRD context)
        lineage              (str)           → io  (gates whether TMB tissue-agnostic path fires)
        pten_status          ("PTEN_null"|"intact"|"loss") → pi3k
        kras_status          ("KRAS_mut"|"WT"|"KRAS_G12C" etc) → mapk
        braf_status          ("BRAF_V600E"|"BRAF_mut"|"WT") → mapk
        her2_status          ("positive"|"amplified"|"negative"|"low") → her2
        vegf_context         (bool)          → vegf (bev history / high VEGF pathway score)
        efflux_context       (bool)          → efflux (ABCB1 fusion / MDR flag)
    somatic_mutations:
        BRCA1/2, PALB2, RAD51C/D → ddr
        TP53                     → ddr (50% weight; matches pathway_to_mechanism_vector.py)
        PTEN                     → pi3k (fallback if biomarkers.pten_status missing)
        KRAS, NRAS, BRAF, MAP2K1 → mapk (fallback)
        CCNE1, CDK2              → ddr↓ + rss↑ (narrow WEE1/ATR route)
        MBD4                     → ddr (via DDR-associated axis)
        ABCB1                    → efflux
    Lineage rules (io tissue-agnostic gate):
        - Approved MSI-H TMB-H tissue-agnostic contexts (pembrolizumab label):
              CRC, gastric, esophageal, endometrial, cervical, prostate, ovarian, other
              solid tumors WHEN MSI-H OR (TMB >= 10 mut/Mb).
        - PD-L1 CPS threshold selection (lineage-dependent):
              CRC / gastric: CPS >= 5
              NSCLC (adeno / squamous): CPS >= 1 (via TPS but supported via CPS→TPS proxy)
              melanoma: presence sufficient; PD-L1 rarely used
              esophageal: CPS >= 10
              cervical: CPS >= 1
              MSS CRC: CPS alone insufficient — requires liver-met-free + pTMB (Rule-Book anchor)
              UNKNOWN lineage: NO tissue-agnostic route allowed. Fails-closed with
                  reason="LINEAGE_UNKNOWN" and NO io contribution.

Every rule that fires emits a provenance stamp:
    {
        "axis": "io",
        "delta": +0.65,
        "rule_id": "IO_PD_L1_CPS_HIGH_LINEAGE_CRC",
        "input_field": "pd_l1_cps",
        "input_value": 45.0,
        "gate": "cps_ge_5",
        "lineage": "crc",
        "evidence_tier": "TIER_1_LABELED",
    }

STUBBED / advisory-only status is stamped when:
    - lineage is UNKNOWN and only CPS is provided → advisory
    - pten status is loss but no downstream drug is proposed → advisory
    - ctDNA-positive but no HRD context → advisory

Every provenance stamp is preserved through ranker call and surfaces on
CaseResolution.engines["mechanism_fit"].data["patient_vector_provenance"].

RUO — Research Use Only.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple


AXES = ("ddr", "mapk", "pi3k", "vegf", "her2", "io", "efflux", "rss")


LINEAGE_ALIASES: Dict[str, str] = {
    "crc": "crc", "colorectal": "crc", "colorectal cancer": "crc", "colon": "crc",
    "mss crc": "crc", "mss_crc": "crc", "mss": "crc",
    "gastric": "gastric", "stomach": "gastric",
    "esophageal": "esophageal", "esophagus": "esophageal", "gej": "esophageal",
    "nsclc": "nsclc", "non-small cell lung cancer": "nsclc", "lung": "nsclc",
    "sclc": "sclc",
    "melanoma": "melanoma",
    "ovarian": "ovarian", "hgsoc": "ovarian",
    "breast": "breast", "tnbc": "breast", "her2+": "breast", "her2-positive": "breast",
    "endometrial": "endometrial", "uterine": "endometrial",
    "cervical": "cervical",
    "prostate": "prostate",
    "renal": "renal", "rcc": "renal",
    "urothelial": "urothelial", "bladder": "urothelial",
    "hnscc": "hnscc", "head and neck": "hnscc",
    "hcc": "hcc", "liver": "hcc", "hepatocellular": "hcc",
    "pancreatic": "pancreatic", "pdac": "pancreatic",
    "unknown": "unknown", "": "unknown", None: "unknown",
}

# Lineage → CPS threshold (labeled cutoff for pembro/nivo)
CPS_THRESHOLDS: Dict[str, float] = {
    "crc": 5.0,
    "gastric": 5.0,
    "esophageal": 10.0,
    "nsclc": 1.0,
    "cervical": 1.0,
    "hnscc": 1.0,
    "urothelial": 10.0,
    "breast": 10.0,   # KEYNOTE-355 TNBC
}

# Lineages that permit tissue-agnostic MSI-H / TMB-H IO route
# (pembrolizumab tissue-agnostic label: MSI-H or dMMR; TMB-H >= 10 mut/Mb)
TISSUE_AGNOSTIC_ELIGIBLE = {
    "crc", "gastric", "esophageal", "endometrial", "ovarian", "cervical",
    "prostate", "hcc", "pancreatic", "nsclc", "melanoma", "hnscc",
    "renal", "urothelial", "breast",
}


@dataclass
class ProvenanceStamp:
    axis: str
    delta: float
    rule_id: str
    input_field: Optional[str] = None
    input_value: Any = None
    gate: Optional[str] = None
    lineage: Optional[str] = None
    evidence_tier: str = "TIER_UNSTATED"
    fail_closed: bool = False
    advisory_only: bool = False
    note: Optional[str] = None


@dataclass
class PatientVectorResult:
    vector: Dict[str, float]
    provenance: List[ProvenanceStamp]
    fail_closed_axes: List[str]
    advisory_axes: List[str]
    lineage_normalized: str
    inputs_seen: Dict[str, Any]

    def as_dict(self) -> Dict[str, Any]:
        return {
            "vector": self.vector,
            "provenance": [
                {
                    "axis": p.axis, "delta": p.delta, "rule_id": p.rule_id,
                    "input_field": p.input_field, "input_value": p.input_value,
                    "gate": p.gate, "lineage": p.lineage,
                    "evidence_tier": p.evidence_tier,
                    "fail_closed": p.fail_closed, "advisory_only": p.advisory_only,
                    "note": p.note,
                }
                for p in self.provenance
            ],
            "fail_closed_axes": self.fail_closed_axes,
            "advisory_axes": self.advisory_axes,
            "lineage_normalized": self.lineage_normalized,
            "inputs_seen": self.inputs_seen,
        }


def _canon_lineage(raw: Any) -> str:
    if raw is None:
        return "unknown"
    key = str(raw).strip().lower()
    if not key:
        return "unknown"
    # Only accept lineages we know how to gate. Everything else → unknown → fail-closed.
    return LINEAGE_ALIASES.get(key, "unknown")


def _clip(x: float) -> float:
    return max(0.0, min(1.0, float(x)))


def build_patient_vector(patient: Any) -> PatientVectorResult:
    """
    Build an 8D PATH A patient mechanism vector from PatientState.

    Never raises on missing inputs. Missing inputs → axis stays 0.0 with a
    NULL_INPUT stamp so the caller can report exactly why an axis was quiet.
    """
    v: Dict[str, float] = {a: 0.0 for a in AXES}
    prov: List[ProvenanceStamp] = []
    fail_closed_axes: List[str] = []
    advisory_axes: List[str] = []

    # ── Normalize inputs ────────────────────────────────────────────────
    biomarkers: Dict[str, Any] = getattr(patient, "biomarkers", None) or {}
    somatic = list(getattr(patient, "somatic_mutations", None) or [])
    disease = getattr(patient, "disease", None) or biomarkers.get("lineage")
    lineage = _canon_lineage(disease or biomarkers.get("lineage"))
    subtype = getattr(patient, "disease_subtype", None)

    inputs_seen: Dict[str, Any] = {
        "lineage_raw": disease,
        "lineage_normalized": lineage,
        "subtype": subtype,
        "biomarkers_keys": sorted(list(biomarkers.keys())),
        "somatic_genes": sorted({str(getattr(m, "gene", "")).upper() for m in somatic if getattr(m, "gene", None)}),
    }

    gene_set = set(inputs_seen["somatic_genes"])

    # ── DDR axis (BRCA/PALB2/TP53/MBD4/RAD51C/D) ────────────────────────
    ddr_delta = 0.0
    ddr_notes: List[str] = []
    for g, w, tier, rid in [
        ("BRCA1", 0.45, "TIER_1_LABELED", "DDR_BRCA1_LOF"),
        ("BRCA2", 0.45, "TIER_1_LABELED", "DDR_BRCA2_LOF"),
        ("PALB2", 0.30, "TIER_2_GUIDELINE", "DDR_PALB2_LOF"),
        ("RAD51C", 0.30, "TIER_2_GUIDELINE", "DDR_RAD51C_LOF"),
        ("RAD51D", 0.30, "TIER_2_GUIDELINE", "DDR_RAD51D_LOF"),
        ("ATM",   0.20, "TIER_2_GUIDELINE", "DDR_ATM_LOF"),
        ("MBD4",  0.15, "TIER_3_EMERGING", "DDR_MBD4_LOF"),
    ]:
        if g in gene_set:
            ddr_delta += w
            ddr_notes.append(g)
            prov.append(ProvenanceStamp(
                axis="ddr", delta=w, rule_id=rid,
                input_field="somatic_mutations", input_value=g,
                evidence_tier=tier, lineage=lineage,
            ))
    # TP53 → +0.15 additive DDR boost (not 50% relative reduction; legacy prototype superseded by pathway_8d_ranker.py)
    if "TP53" in gene_set:
        ddr_delta += 0.15
        prov.append(ProvenanceStamp(
            axis="ddr", delta=0.15, rule_id="DDR_TP53_ADDITIVE_BOOST_015",
            input_field="somatic_mutations", input_value="TP53",
            evidence_tier="TIER_2_GUIDELINE", lineage=lineage,
            note="+0.15 additive DDR boost (not 50% relative reduction; legacy prototype superseded by pathway_8d_ranker.py)",
        ))
    # ctDNA MRD-positive nudge (advisory only; small delta)
    ctdna_pos = biomarkers.get("ctdna_positive")
    if ctdna_pos is True:
        ddr_delta += 0.05
        advisory_axes.append("ddr")
        prov.append(ProvenanceStamp(
            axis="ddr", delta=0.05, rule_id="DDR_CTDNA_MRD_POSITIVE_ADVISORY",
            input_field="ctdna_positive", input_value=True,
            evidence_tier="TIER_3_EMERGING", advisory_only=True, lineage=lineage,
            note="ctDNA MRD-positive advisory nudge; not a labeled indication.",
        ))
    if ddr_delta == 0.0:
        prov.append(ProvenanceStamp(
            axis="ddr", delta=0.0, rule_id="DDR_NULL_INPUT",
            input_field=None, input_value=None, evidence_tier="NONE", lineage=lineage,
        ))
    v["ddr"] = _clip(ddr_delta)

    # ── MAPK axis (KRAS / BRAF / NRAS / MAP2K1) ─────────────────────────
    mapk_delta = 0.0
    kras_status = biomarkers.get("kras_status")
    braf_status = biomarkers.get("braf_status")
    kras_present = False
    braf_present = False
    if kras_status and str(kras_status).lower() not in ("wt", "wildtype", "wild_type", "wild-type", "unknown", "none", ""):
        # biomarker-driven KRAS
        w = 0.55
        if "G12C" in str(kras_status).upper():
            w = 0.65
            rid = "MAPK_KRAS_G12C_BIOMARKER"
        else:
            rid = "MAPK_KRAS_MUT_BIOMARKER"
        mapk_delta += w
        kras_present = True
        prov.append(ProvenanceStamp(
            axis="mapk", delta=w, rule_id=rid,
            input_field="kras_status", input_value=kras_status,
            evidence_tier="TIER_1_LABELED", lineage=lineage,
        ))
    if braf_status and str(braf_status).lower() not in ("wt", "wildtype", "wild_type", "wild-type", "unknown", "none", ""):
        raw = str(braf_status).upper()
        if "V600" in raw:
            w = 0.70
            rid = "MAPK_BRAF_V600E_BIOMARKER"
            tier = "TIER_1_LABELED"
        else:
            w = 0.45
            rid = "MAPK_BRAF_MUT_BIOMARKER"
            tier = "TIER_2_GUIDELINE"
        mapk_delta += w
        braf_present = True
        prov.append(ProvenanceStamp(
            axis="mapk", delta=w, rule_id=rid,
            input_field="braf_status", input_value=braf_status,
            evidence_tier=tier, lineage=lineage,
        ))
    # Somatic fallback if biomarker status absent
    if not kras_present and ("KRAS" in gene_set or "NRAS" in gene_set):
        w = 0.55
        gene = "KRAS" if "KRAS" in gene_set else "NRAS"
        mapk_delta += w
        prov.append(ProvenanceStamp(
            axis="mapk", delta=w, rule_id="MAPK_RAS_SOMATIC_FALLBACK",
            input_field="somatic_mutations", input_value=gene,
            evidence_tier="TIER_2_GUIDELINE", lineage=lineage,
            note="Fell back to somatic gene call because biomarkers.kras_status was absent.",
        ))
    if not braf_present and "BRAF" in gene_set:
        mapk_delta += 0.45
        prov.append(ProvenanceStamp(
            axis="mapk", delta=0.45, rule_id="MAPK_BRAF_SOMATIC_FALLBACK",
            input_field="somatic_mutations", input_value="BRAF",
            evidence_tier="TIER_2_GUIDELINE", lineage=lineage,
            note="Fell back to somatic gene call because biomarkers.braf_status was absent.",
        ))
    if "MAP2K1" in gene_set:
        mapk_delta += 0.25
        prov.append(ProvenanceStamp(
            axis="mapk", delta=0.25, rule_id="MAPK_MAP2K1_SOMATIC",
            input_field="somatic_mutations", input_value="MAP2K1",
            evidence_tier="TIER_3_EMERGING", lineage=lineage,
        ))
    if mapk_delta == 0.0:
        prov.append(ProvenanceStamp(
            axis="mapk", delta=0.0, rule_id="MAPK_NULL_INPUT",
            evidence_tier="NONE", lineage=lineage,
        ))
    v["mapk"] = _clip(mapk_delta)

    # ── PI3K axis (PTEN + PIK3CA + AKT1) ────────────────────────────────
    pi3k_delta = 0.0
    pten_status = biomarkers.get("pten_status")
    pten_present = False
    if pten_status and str(pten_status).lower() not in ("intact", "wt", "wildtype", "wild_type", "wild-type", "unknown", "none", ""):
        raw = str(pten_status).lower()
        if raw in ("pten_null", "null", "loss", "loss_of_function", "lof", "biallelic_loss"):
            w = 0.70
            rid = "PI3K_PTEN_LOSS_BIOMARKER"
        else:
            w = 0.45
            rid = "PI3K_PTEN_ALTERED_BIOMARKER"
        pi3k_delta += w
        pten_present = True
        prov.append(ProvenanceStamp(
            axis="pi3k", delta=w, rule_id=rid,
            input_field="pten_status", input_value=pten_status,
            evidence_tier="TIER_1_LABELED", lineage=lineage,
        ))
    if not pten_present and "PTEN" in gene_set:
        pi3k_delta += 0.60
        prov.append(ProvenanceStamp(
            axis="pi3k", delta=0.60, rule_id="PI3K_PTEN_SOMATIC_FALLBACK",
            input_field="somatic_mutations", input_value="PTEN",
            evidence_tier="TIER_2_GUIDELINE", lineage=lineage,
            note="Fell back to somatic PTEN call because biomarkers.pten_status was absent.",
        ))
    if "PIK3CA" in gene_set:
        pi3k_delta += 0.35
        prov.append(ProvenanceStamp(
            axis="pi3k", delta=0.35, rule_id="PI3K_PIK3CA_SOMATIC",
            input_field="somatic_mutations", input_value="PIK3CA",
            evidence_tier="TIER_2_GUIDELINE", lineage=lineage,
        ))
    if "AKT1" in gene_set:
        pi3k_delta += 0.30
        prov.append(ProvenanceStamp(
            axis="pi3k", delta=0.30, rule_id="PI3K_AKT1_SOMATIC",
            input_field="somatic_mutations", input_value="AKT1",
            evidence_tier="TIER_2_GUIDELINE", lineage=lineage,
        ))
    if pi3k_delta == 0.0:
        prov.append(ProvenanceStamp(
            axis="pi3k", delta=0.0, rule_id="PI3K_NULL_INPUT",
            evidence_tier="NONE", lineage=lineage,
        ))
    v["pi3k"] = _clip(pi3k_delta)

    # ── HER2 axis ────────────────────────────────────────────────────────
    her2_status = biomarkers.get("her2_status")
    if her2_status:
        raw = str(her2_status).lower()
        if raw in ("positive", "amplified", "3+", "her2+", "her2_amplified"):
            v["her2"] = 0.80
            prov.append(ProvenanceStamp(
                axis="her2", delta=0.80, rule_id="HER2_POSITIVE_BIOMARKER",
                input_field="her2_status", input_value=her2_status,
                evidence_tier="TIER_1_LABELED", lineage=lineage,
            ))
        elif raw in ("low", "her2_low", "2+"):
            v["her2"] = 0.40
            prov.append(ProvenanceStamp(
                axis="her2", delta=0.40, rule_id="HER2_LOW_BIOMARKER",
                input_field="her2_status", input_value=her2_status,
                evidence_tier="TIER_1_LABELED", lineage=lineage,
                note="HER2-low (DESTINY-Breast04 label class).",
            ))
        else:
            prov.append(ProvenanceStamp(
                axis="her2", delta=0.0, rule_id="HER2_NEG_OR_UNKNOWN",
                input_field="her2_status", input_value=her2_status,
                evidence_tier="TIER_1_LABELED", lineage=lineage,
            ))
    elif "ERBB2" in gene_set:
        v["her2"] = 0.60
        prov.append(ProvenanceStamp(
            axis="her2", delta=0.60, rule_id="HER2_ERBB2_SOMATIC_FALLBACK",
            input_field="somatic_mutations", input_value="ERBB2",
            evidence_tier="TIER_2_GUIDELINE", lineage=lineage,
        ))
    else:
        prov.append(ProvenanceStamp(
            axis="her2", delta=0.0, rule_id="HER2_NULL_INPUT",
            evidence_tier="NONE", lineage=lineage,
        ))

    # ── VEGF axis ────────────────────────────────────────────────────────
    if biomarkers.get("vegf_context") is True:
        v["vegf"] = 0.50
        prov.append(ProvenanceStamp(
            axis="vegf", delta=0.50, rule_id="VEGF_CONTEXT_FLAG",
            input_field="vegf_context", input_value=True,
            evidence_tier="TIER_3_EMERGING", lineage=lineage,
        ))
    else:
        prov.append(ProvenanceStamp(
            axis="vegf", delta=0.0, rule_id="VEGF_NULL_INPUT",
            evidence_tier="NONE", lineage=lineage,
        ))

    # ── Efflux axis ──────────────────────────────────────────────────────
    if "ABCB1" in gene_set or biomarkers.get("efflux_context") is True:
        v["efflux"] = 0.70
        prov.append(ProvenanceStamp(
            axis="efflux", delta=0.70,
            rule_id="EFFLUX_ABCB1_OR_CONTEXT",
            input_field="somatic_mutations/efflux_context",
            input_value=("ABCB1" if "ABCB1" in gene_set else True),
            evidence_tier="TIER_2_GUIDELINE", lineage=lineage,
        ))
    else:
        prov.append(ProvenanceStamp(
            axis="efflux", delta=0.0, rule_id="EFFLUX_NULL_INPUT",
            evidence_tier="NONE", lineage=lineage,
        ))

    # ── IO axis (PD-L1/CPS + MSI/TMB + lineage gate) ────────────────────
    io_delta = 0.0
    io_reasons: List[str] = []

    cps = biomarkers.get("pd_l1_cps")
    tps = biomarkers.get("pd_l1_tps")
    msi_status = biomarkers.get("msi_status") or biomarkers.get("mmr_status")
    tmb = biomarkers.get("tmb")
    ptmb = biomarkers.get("ptmb")

    io_lineage_ok_for_tissue_agnostic = lineage in TISSUE_AGNOSTIC_ELIGIBLE

    # (1) PD-L1 CPS / TPS — lineage-gated
    if cps is not None:
        try:
            cps_v = float(cps)
            if lineage == "unknown":
                # Fail-closed: no tissue-agnostic PD-L1 rule
                prov.append(ProvenanceStamp(
                    axis="io", delta=0.0,
                    rule_id="IO_PD_L1_CPS_LINEAGE_UNKNOWN_FAIL_CLOSED",
                    input_field="pd_l1_cps", input_value=cps_v,
                    lineage=lineage, fail_closed=True,
                    evidence_tier="TIER_1_LABELED",
                    note="CPS provided but lineage UNKNOWN. No tissue-agnostic CPS rule exists.",
                ))
                if "io" not in fail_closed_axes:
                    fail_closed_axes.append("io")
            elif lineage in ("crc",) and cps_v >= 5.0:
                # MSS CRC nuance: CPS alone insufficient — CO.26 rule-book anchor
                mss_confirmed = bool(biomarkers.get("mss_confirmed"))
                liver_met = biomarkers.get("liver_metastasis")
                if mss_confirmed and (liver_met is True):
                    prov.append(ProvenanceStamp(
                        axis="io", delta=0.0,
                        rule_id="IO_PD_L1_CPS_MSS_LIVER_MET_BLOCKED",
                        input_field="pd_l1_cps", input_value=cps_v,
                        lineage=lineage, gate="cps_ge_5_but_mss_crc_with_liver_mets",
                        fail_closed=True, evidence_tier="TIER_1_LABELED",
                        note=(
                            "MSS CRC with liver metastases — CO.26 rule-book: "
                            "IO not permissive, CPS is not the determining marker."
                        ),
                    ))
                    if "io" not in fail_closed_axes:
                        fail_closed_axes.append("io")
                else:
                    w = min(0.65, 0.30 + 0.007 * cps_v)  # 0.30 at CPS 5 → 0.65 at CPS 50
                    io_delta += w
                    io_reasons.append(f"CPS={cps_v}(CRC)")
                    prov.append(ProvenanceStamp(
                        axis="io", delta=w,
                        rule_id="IO_PD_L1_CPS_HIGH_LINEAGE_CRC",
                        input_field="pd_l1_cps", input_value=cps_v,
                        gate="cps_ge_5", lineage=lineage,
                        evidence_tier="TIER_1_LABELED",
                    ))
            else:
                thr = CPS_THRESHOLDS.get(lineage)
                if thr is None:
                    # Lineage in eligible list but no explicit CPS threshold
                    if cps_v >= 1.0:
                        w = min(0.40, 0.15 + 0.005 * cps_v)
                        io_delta += w
                        io_reasons.append(f"CPS={cps_v}({lineage})")
                        prov.append(ProvenanceStamp(
                            axis="io", delta=w,
                            rule_id="IO_PD_L1_CPS_GENERIC_LINEAGE_ELIGIBLE",
                            input_field="pd_l1_cps", input_value=cps_v,
                            gate="cps_ge_1_generic", lineage=lineage,
                            evidence_tier="TIER_2_GUIDELINE",
                            note=f"Lineage {lineage} has no labeled CPS cutoff — generic monotone rule.",
                        ))
                elif cps_v >= thr:
                    w = min(0.60, 0.25 + 0.006 * cps_v)
                    io_delta += w
                    io_reasons.append(f"CPS={cps_v}({lineage})")
                    prov.append(ProvenanceStamp(
                        axis="io", delta=w,
                        rule_id=f"IO_PD_L1_CPS_HIGH_LINEAGE_{lineage.upper()}",
                        input_field="pd_l1_cps", input_value=cps_v,
                        gate=f"cps_ge_{thr}", lineage=lineage,
                        evidence_tier="TIER_1_LABELED",
                    ))
                else:
                    prov.append(ProvenanceStamp(
                        axis="io", delta=0.0,
                        rule_id=f"IO_PD_L1_CPS_BELOW_LINEAGE_{lineage.upper()}",
                        input_field="pd_l1_cps", input_value=cps_v,
                        gate=f"cps_ge_{thr}", lineage=lineage,
                        evidence_tier="TIER_1_LABELED",
                        note=f"CPS {cps_v} below labeled cutoff for {lineage}.",
                    ))
        except (TypeError, ValueError):
            prov.append(ProvenanceStamp(
                axis="io", delta=0.0, rule_id="IO_PD_L1_CPS_INVALID_VALUE",
                input_field="pd_l1_cps", input_value=cps, lineage=lineage,
                evidence_tier="NONE",
            ))
    # (1b) PD-L1 TPS (NSCLC main path)
    if tps is not None and lineage == "nsclc":
        try:
            tps_v = float(tps)
            if tps_v >= 50.0:
                w = 0.55
                rid = "IO_PD_L1_TPS_HIGH_NSCLC"
            elif tps_v >= 1.0:
                w = 0.30
                rid = "IO_PD_L1_TPS_LOW_NSCLC"
            else:
                w = 0.0
                rid = "IO_PD_L1_TPS_NEG_NSCLC"
            if w > 0:
                io_delta += w
                io_reasons.append(f"TPS={tps_v}(NSCLC)")
            prov.append(ProvenanceStamp(
                axis="io", delta=w, rule_id=rid,
                input_field="pd_l1_tps", input_value=tps_v,
                gate=(f"tps_ge_50" if tps_v >= 50 else "tps_ge_1"),
                lineage=lineage, evidence_tier="TIER_1_LABELED",
            ))
        except (TypeError, ValueError):
            pass

    # (2) MSI-H / dMMR — tissue-agnostic route
    if msi_status and str(msi_status).upper() in ("MSI-H", "MSI-HIGH", "MSI_H", "DEFICIENT", "DMMR", "MMR_DEFICIENT"):
        if io_lineage_ok_for_tissue_agnostic:
            io_delta += 0.60
            io_reasons.append("MSI-H(agnostic)")
            prov.append(ProvenanceStamp(
                axis="io", delta=0.60,
                rule_id="IO_MSI_H_TISSUE_AGNOSTIC",
                input_field="msi_status", input_value=msi_status,
                gate="msi_h_agnostic", lineage=lineage,
                evidence_tier="TIER_1_LABELED",
                note="MSI-H/dMMR pembrolizumab tissue-agnostic label.",
            ))
        else:
            prov.append(ProvenanceStamp(
                axis="io", delta=0.0,
                rule_id="IO_MSI_H_LINEAGE_INELIGIBLE",
                input_field="msi_status", input_value=msi_status,
                lineage=lineage, fail_closed=True,
                evidence_tier="TIER_1_LABELED",
                note="Lineage not on tissue-agnostic label; MSI-H alone insufficient.",
            ))
            if "io" not in fail_closed_axes:
                fail_closed_axes.append("io")

    # (3) TMB high (>= 10 mut/Mb) — tissue-agnostic route
    if tmb is not None:
        try:
            tmb_v = float(tmb)
            if tmb_v >= 10.0 and io_lineage_ok_for_tissue_agnostic:
                w = 0.35 if lineage != "unknown" else 0.0
                if w > 0:
                    io_delta += w
                    io_reasons.append(f"TMB={tmb_v}(agnostic)")
                    prov.append(ProvenanceStamp(
                        axis="io", delta=w,
                        rule_id="IO_TMB_H_TISSUE_AGNOSTIC",
                        input_field="tmb", input_value=tmb_v,
                        gate="tmb_ge_10", lineage=lineage,
                        evidence_tier="TIER_1_LABELED",
                    ))
            elif tmb_v >= 10.0 and not io_lineage_ok_for_tissue_agnostic:
                prov.append(ProvenanceStamp(
                    axis="io", delta=0.0,
                    rule_id="IO_TMB_H_LINEAGE_INELIGIBLE",
                    input_field="tmb", input_value=tmb_v,
                    lineage=lineage, fail_closed=True,
                    evidence_tier="TIER_1_LABELED",
                ))
                if "io" not in fail_closed_axes:
                    fail_closed_axes.append("io")
            else:
                prov.append(ProvenanceStamp(
                    axis="io", delta=0.0,
                    rule_id="IO_TMB_BELOW_THRESHOLD",
                    input_field="tmb", input_value=tmb_v,
                    lineage=lineage,
                    evidence_tier="TIER_1_LABELED",
                ))
        except (TypeError, ValueError):
            pass

    # (4) pTMB (plasma) — CO.26 anchor, requires lineage in {crc, gastric}
    if ptmb is not None:
        try:
            ptmb_v = float(ptmb)
            if ptmb_v >= 28.0 and lineage in ("crc", "gastric"):
                io_delta += 0.30
                io_reasons.append(f"pTMB={ptmb_v}(CO.26)")
                prov.append(ProvenanceStamp(
                    axis="io", delta=0.30,
                    rule_id="IO_PTMB_CO26_HIGH",
                    input_field="ptmb", input_value=ptmb_v,
                    gate="ptmb_ge_28", lineage=lineage,
                    evidence_tier="TIER_1_LABELED",
                ))
            else:
                prov.append(ProvenanceStamp(
                    axis="io", delta=0.0,
                    rule_id="IO_PTMB_BELOW_OR_INELIGIBLE",
                    input_field="ptmb", input_value=ptmb_v,
                    lineage=lineage,
                    evidence_tier="TIER_1_LABELED",
                ))
        except (TypeError, ValueError):
            pass

    if not io_reasons and not any(p.axis == "io" for p in prov):
        prov.append(ProvenanceStamp(
            axis="io", delta=0.0, rule_id="IO_NULL_INPUT",
            evidence_tier="NONE", lineage=lineage,
        ))

    v["io"] = _clip(io_delta)

    # ── RSS axis (Replication stress) ────────────────────────────────────
    rss_delta = 0.0
    if "CCNE1" in gene_set or "CDK2" in gene_set:
        # CCNE1 amp → narrow WEE1/ATR / PKMYT1 route
        rss_delta += 0.60
        gene = "CCNE1" if "CCNE1" in gene_set else "CDK2"
        prov.append(ProvenanceStamp(
            axis="rss", delta=0.60,
            rule_id="RSS_CCNE1_CDK2_AMP_NARROW_WEE1_ATR_PKMYT1",
            input_field="somatic_mutations", input_value=gene,
            evidence_tier="TIER_2_GUIDELINE", lineage=lineage,
            note=(
                "CCNE1 amp → replication stress; narrow WEE1/ATR/PKMYT1 route "
                "(Sanger/DepMap CCNE1→PKMYT1 dep; kill_chain CCNE1_AMPLIFICATION vector)."
            ),
        ))
        # Also nudges DDR down for provenance (kill_chain vector says DDR↓ for CCNE1)
        prov.append(ProvenanceStamp(
            axis="ddr", delta=0.0,
            rule_id="DDR_DOWN_NOTE_CCNE1_AMP",
            input_field="somatic_mutations", input_value=gene,
            evidence_tier="TIER_2_GUIDELINE", advisory_only=True, lineage=lineage,
            note="CCNE1 amp historically deprioritises DDR (kill_chain vector). Not applied numerically to preserve axis independence; RSS captures the effect.",
        ))
    if "SLFN11" in gene_set:
        rss_delta += 0.35
        prov.append(ProvenanceStamp(
            axis="rss", delta=0.35, rule_id="RSS_SLFN11_SILENCING",
            input_field="somatic_mutations", input_value="SLFN11",
            evidence_tier="TIER_3_EMERGING", lineage=lineage,
        ))
    if rss_delta == 0.0:
        prov.append(ProvenanceStamp(
            axis="rss", delta=0.0, rule_id="RSS_NULL_INPUT",
            evidence_tier="NONE", lineage=lineage,
        ))
    v["rss"] = _clip(rss_delta)

    return PatientVectorResult(
        vector=v,
        provenance=prov,
        fail_closed_axes=fail_closed_axes,
        advisory_axes=list(dict.fromkeys(advisory_axes)),
        lineage_normalized=lineage,
        inputs_seen=inputs_seen,
    )
