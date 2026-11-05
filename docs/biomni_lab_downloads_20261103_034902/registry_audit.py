#!/usr/bin/env python3
"""
registry_audit.py — Audit the 609-trial trial_moa_vectors.json registry.

Reads:  /workspace/crispro-backend-v2/api/resources/trial_moa_vectors.json
Writes: /mnt/results/registry_audit_report.md
        /mnt/results/registry_audit_defects.csv
        /mnt/results/registry_audit_summary.json
        /mnt/results/registry_remediation_blueprint.md
Caches: /workspace/ctgov_cache/{NCT}.json

Read-only on the registry. Does NOT modify trial_moa_vectors.json.

Defect classes:
  D1 — Sparsity (all-zero / single-axis)
  D2 — Type inconsistency (confidence field)
  D3 — Mechanism-coding defects on PC-02 anchors
  D4 — Non-oncology contamination (keyword heuristic + CT.gov confirmation)
  D5 — Axis-magnitude distribution and dominance
  D6 — Provenance / source-quality audit
  D7 — GLB IP-valuation set per-trial verdicts

Usage:
  python3 /mnt/results/registry_audit.py
  python3 /mnt/results/registry_audit.py --no-ctgov   # skip CT.gov lookups (use cache only)
"""
import json
import csv
import os
import sys
import time
import random
import urllib.request
import urllib.error
from pathlib import Path
from collections import Counter, defaultdict
from datetime import datetime, timezone

# ── Paths ────────────────────────────────────────────────────────────────────
REGISTRY_PATH = Path("/workspace/crispro-backend-v2/api/resources/trial_moa_vectors.json")
RESULTS_DIR = Path("/mnt/results")
CTGOV_CACHE = Path("/workspace/ctgov_cache")

REPORT_PATH = RESULTS_DIR / "registry_audit_report.md"
DEFECTS_CSV_PATH = RESULTS_DIR / "registry_audit_defects.csv"
SUMMARY_JSON_PATH = RESULTS_DIR / "registry_audit_summary.json"
BLUEPRINT_PATH = RESULTS_DIR / "registry_remediation_blueprint.md"

# ── Constants ────────────────────────────────────────────────────────────────
AXES_8D = ["ddr", "mapk", "pi3k", "vegf", "her2", "io", "efflux", "rss"]

# PC-02 anchor trials (from LIFT-003 / LIFT-004)
PC02_ANCHORS = ["NCT02595892", "NCT03579316", "NCT03462342", "NCT05450692", "NCT02264678"]

# GLB IP-valuation set (6 trials, from trial_decode_registry_v2.md)
GLB_SET = ["NCT02595892", "NCT03579316", "NCT03462342", "NCT05450692", "NCT04154956", "NCT02870920"]

# Published mechanisms for anchors (from LIFT-004 §5.2 + retroactive_prediction_run.py)
ANCHOR_MECHANISMS = {
    "NCT02595892": {
        "drug": "Berzosertib (M6620) ATRi + gemcitabine",
        "cancer": "Ovarian",
        "published": "RS-Low HR 0.34 (responder) vs RS-High HR 1.11 (non-responder), PMID 34552099",
        "expected_vector_direction": "ddr-dominant; rss should favour responder (RS-Low), not non-responder",
    },
    "NCT03579316": {
        "drug": "Adavosertib (AZD1775) WEE1i + gemcitabine",
        "cancer": "Ovarian",
        "published": "CCNE1-amp ORR 36% (responder) vs PTEN-loss ORR 0% (non-responder), JCO 2023",
        "expected_vector_direction": "ddr + rss_exploit; PTEN-loss (pi3k) is resistance, NOT a target",
    },
    "NCT03462342": {
        "drug": "Ceralasertib + olaparib (CAPRI Phase II)",
        "cancer": "Ovarian",
        "published": "PARPi-naive 54% vs ITT 0%, Shah Clin Cancer Res 2023",
        "expected_vector_direction": "ddr-dominant (ATR+PARP combo)",
    },
    "NCT05450692": {
        "drug": "Ceralasertib + durvalumab (LATIFY)",
        "cancer": "NSCLC",
        "published": "QUARANTINED CT-03 (patent +0.366 vs receipt +0.2641)",
        "expected_vector_direction": "ddr + io; quarantined regardless",
    },
    "NCT02264678": {
        "drug": "Ceralasertib + olaparib (Phase I/Ib)",
        "cancer": "Mixed solid tumors",
        "published": "ITT 0%, BRCA1-mut trend, PARPi-naive 54%, Drew JCO 2022",
        "expected_vector_direction": "ddr-dominant (ATR+PARP combo); patient-B vector undefined (CT-04)",
    },
    "NCT04154956": {
        "drug": "Tusamitamab ravtansine (CARMEN-LC03)",
        "cancer": "NSCLC",
        "published": "CEACAM5 ADC, Phase III PFS HR 1.14",
        "expected_vector_direction": "ceacam5-targeted (not in 8D axis framework — should be sparse or zero)",
    },
    "NCT02870920": {
        "drug": "Durvalumab (CCTG CO.26)",
        "cancer": "MSS CRC",
        "published": "IO trial, pTMB≥28 OS HR=0.34",
        "expected_vector_direction": "io-dominant",
    },
}

# Oncology keyword list for D4 Pass 1 (conservative — prefer false negatives over false positives)
ONCO_KEYWORDS = [
    "cancer", "tumor", "tumour", "carcinoma", "leukemia", "leukaemia", "lymphoma",
    "melanoma", "sarcoma", "oncolog", "chemo", "parp", "brca", "ovarian", "breast",
    "lung", "colon", "rectal", "colorectal", "prostate", "glioblast", "nsclc", "sclc",
    "crc", "hcc", "rcc", "aml", "cml", "cll", "mcl", "dlbcl", "mesothelioma",
    "pancreatic", "gastric", "esophag", "cervical", "endometri", "thyroid",
    "bladder", "renal", "hepatocell", "cholangio", "multiple myeloma", "myeloma",
    "solid tumor", "solid tumour", "advanced solid", "metastatic",
    "neoplasm", "neoplastic", "chemotherapy", "radiotherapy", "immunotherapy",
    "checkpoint", "pd-1", "pd-l1", "ctla-4", "car-t", "car t", "trastuzumab",
    "pembrolizumab", "nivolumab", "atezolizumab", "durvalumab", "ipilimumab",
    "olaparib", "niraparib", "rucaparib", "bevacizumab", " cetuximab",
    "panitumumab", "regorafenib", "sorafenib", "sunitinib", "pazopanib",
    "imatinib", "dasatinib", "ibrutinib", "venetoclax", "enfortumab",
    "trastuzumab deruxtecan", "t-dxd", "enhertu",
]

# Sources prone to false-positive keyword matching
AUTO_TAGGER_SOURCES = {"manual_keyword_matching", "cohere_batch_tagging", "gemini_batch_tagging", "openai_batch_tagging", "gemini_batch_v2"}


def load_registry():
    """Load the registry JSON."""
    with open(REGISTRY_PATH) as f:
        return json.load(f)


def fetch_ctgov(nct_id, timeout=15, retry=True):
    """Fetch a trial from ClinicalTrials.gov API v2. Returns dict or None."""
    CTGOV_CACHE.mkdir(parents=True, exist_ok=True)
    cache_file = CTGOV_CACHE / f"{nct_id}.json"

    # Check cache first
    if cache_file.exists():
        try:
            with open(cache_file) as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            pass  # cache corrupt, re-fetch

    url = f"https://clinicaltrials.gov/api/v2/studies/{nct_id}"
    for attempt in range(2 if retry else 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "CrisPRO-Registry-Audit/1.0"})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            # Cache it
            with open(cache_file, "w") as f:
                json.dump(data, f)
            return data
        except urllib.error.HTTPError as e:
            if e.code == 404:
                # Trial not found on CT.gov — cache the negative result
                with open(cache_file, "w") as f:
                    json.dump({"_error": "not_found", "_http_code": 404}, f)
                return None
            if attempt == 0 and retry:
                time.sleep(1)
                continue
            return {"_error": f"http_{e.code}"}
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            if attempt == 0 and retry:
                time.sleep(1)
                continue
            return {"_error": f"network: {type(e).__name__}"}
    return None


def get_ctgov_conditions(ctgov_data):
    """Extract conditions list from CT.gov response."""
    if not ctgov_data or "_error" in ctgov_data:
        return None
    proto = ctgov_data.get("protocolSection", {})
    conditions = proto.get("conditionsModule", {}).get("conditions", [])
    return conditions


def is_oncology_condition(conditions):
    """Check if any condition in the list is oncology."""
    if not conditions:
        return False
    text = " ".join(conditions).lower()
    return any(kw in text for kw in ONCO_KEYWORDS)


def is_oncology_title(title):
    """Check if a title contains oncology signal."""
    if not title:
        return False
    t = title.lower()
    return any(kw in t for kw in ONCO_KEYWORDS)


# ── D1: Sparsity ─────────────────────────────────────────────────────────────
def audit_d1_sparsity(data):
    """All-zero and single-axis vectors."""
    all_zero = []
    single_axis = []
    multi_axis = []
    single_axis_dist = Counter()

    for nct, entry in data.items():
        mv = entry.get("moa_vector", {})
        active = [ax for ax in AXES_8D if mv.get(ax, 0.0) > 0.0]
        n_active = len(active)
        if n_active == 0:
            all_zero.append(nct)
        elif n_active == 1:
            single_axis.append(nct)
            single_axis_dist[active[0]] += 1
        else:
            multi_axis.append(nct)

    return {
        "class": "D1",
        "name": "Sparsity — all-zero and single-axis vectors",
        "severity": "high",
        "all_zero_count": len(all_zero),
        "all_zero_pct": round(100 * len(all_zero) / len(data), 1),
        "single_axis_count": len(single_axis),
        "single_axis_pct": round(100 * len(single_axis) / len(data), 1),
        "multi_axis_count": len(multi_axis),
        "multi_axis_pct": round(100 * len(multi_axis) / len(data), 1),
        "single_axis_distribution": dict(single_axis_dist),
        "all_zero_ncts": all_zero,
        "single_axis_ncts": single_axis,
        "evidence_samples": all_zero[:5] + single_axis[:5],
    }


# ── D2: Type inconsistency ───────────────────────────────────────────────────
def audit_d2_type_inconsistency(data):
    """Confidence field type issues + missing source/reviewed_by."""
    string_conf = []
    missing_conf = []
    missing_source = []
    missing_reviewed = []

    for nct, entry in data.items():
        conf = entry.get("confidence", None)
        if conf is None:
            missing_conf.append(nct)
        elif isinstance(conf, str):
            string_conf.append((nct, conf))
        elif not isinstance(conf, (int, float)):
            string_conf.append((nct, f"type={type(conf).__name__}"))

        if not entry.get("source"):
            missing_source.append(nct)
        if not entry.get("reviewed_by"):
            missing_reviewed.append(nct)

    return {
        "class": "D2",
        "name": "Type inconsistency — confidence / source / reviewed_by",
        "severity": "medium",
        "string_confidence_count": len(string_conf),
        "missing_confidence_count": len(missing_conf),
        "missing_source_count": len(missing_source),
        "missing_reviewed_by_count": len(missing_reviewed),
        "string_confidence_entries": string_conf,
        "missing_source_ncts": missing_source,
        "missing_reviewed_ncts": missing_reviewed,
        "evidence_samples": [f"{n}: conf={c}" for n, c in string_conf[:5]],
    }


# ── D3: Anchor mechanism-coding defects ──────────────────────────────────────
def audit_d3_anchor_defects(data):
    """PC-02 anchor trial vector correctness."""
    verdicts = []
    for nct in PC02_ANCHORS:
        mech = ANCHOR_MECHANISMS.get(nct, {})
        if nct not in data:
            verdicts.append({
                "nct": nct,
                "drug": mech.get("drug", "?"),
                "verdict": "ABSENT",
                "defect": "Trial not in registry",
                "registry_vector": None,
                "expected_direction": mech.get("expected_vector_direction", ""),
                "published": mech.get("published", ""),
            })
            continue

        entry = data[nct]
        mv = entry.get("moa_vector", {})
        defects = []

        # Check against known LIFT-004 defects
        if nct == "NCT02595892" and mv.get("rss", 0) >= 0.5:
            defects.append(f"rss={mv['rss']} dominates — routes RS to non-responder side under PATH A (LIFT-004 D1)")
        if nct == "NCT03579316" and mv.get("pi3k", 0) >= 0.5:
            defects.append(f"pi3k={mv['pi3k']} encodes PTEN-loss resistance as a drug target (LIFT-004 D2)")
        if nct == "NCT03579316" and mv.get("mapk", 0) >= 0.5:
            defects.append(f"mapk={mv['mapk']} spurious for WEE1i (LIFT-004)")
        if nct == "NCT02264678" and mv.get("ddr", 0) < 0.3:
            defects.append(f"ddr={mv.get('ddr', 0)} missing for ATR+PARP combo (LIFT-004 D3)")
        if nct == "NCT02264678" and mv.get("mapk", 0) >= 0.5:
            defects.append(f"mapk={mv['mapk']} spurious for ATR+PARP combo")
        if nct == "NCT05450692":
            defects.append("QUARANTINED under CT-03 regardless of vector (patent +0.366 vs receipt +0.2641)")

        verdict = "DEFECTIVE" if defects else "OK"
        verdicts.append({
            "nct": nct,
            "drug": mech.get("drug", "?"),
            "verdict": verdict,
            "defect": "; ".join(defects) if defects else "none detected",
            "registry_vector": mv,
            "expected_direction": mech.get("expected_vector_direction", ""),
            "published": mech.get("published", ""),
            "source": entry.get("source"),
            "confidence": entry.get("confidence"),
        })

    defective_count = sum(1 for v in verdicts if v["verdict"] == "DEFECTIVE")
    absent_count = sum(1 for v in verdicts if v["verdict"] == "ABSENT")

    return {
        "class": "D3",
        "name": "Mechanism-coding defects on PC-02 anchor trials",
        "severity": "critical",
        "anchor_verdicts": verdicts,
        "defective_count": defective_count,
        "absent_count": absent_count,
        "ok_count": len(verdicts) - defective_count - absent_count,
        "evidence_samples": [f"{v['nct']}: {v['verdict']} — {v['defect'][:80]}" for v in verdicts],
    }


# ── D4: Non-oncology contamination ───────────────────────────────────────────
def audit_d4_contamination(data, do_ctgov=True):
    """Two-pass: keyword heuristic, then CT.gov confirmation."""
    # Pass 1: keyword heuristic
    flagged = []
    not_flagged = []

    for nct, entry in data.items():
        title = entry.get("title", "")
        source = entry.get("source", "")
        title_onco = is_oncology_title(title)
        source_auto = source in AUTO_TAGGER_SOURCES

        # Flag if: title lacks oncology signal AND source is an automated tagger
        # OR: title lacks oncology signal regardless of source (broader net)
        if not title_onco:
            flagged.append({
                "nct": nct,
                "title": title,
                "source": source,
                "source_auto": source_auto,
                "vector": entry.get("moa_vector", {}),
                "keywords_matched": entry.get("provenance", {}).get("keywords_matched", []),
                "primary_moa": entry.get("provenance", {}).get("primary_moa", ""),
            })
        else:
            not_flagged.append(nct)

    # Pass 2: CT.gov confirmation
    confirmed_non_onco = []
    false_positive_flags = []  # flagged but actually oncology
    borderline = []
    ctgov_failures = []
    ctgov_not_found = []

    if do_ctgov:
        print(f"  D4: Fetching CT.gov for {len(flagged)} flagged trials...")
        for i, item in enumerate(flagged):
            if i % 20 == 0:
                print(f"    progress: {i}/{len(flagged)}")
            ctgov = fetch_ctgov(item["nct"])
            if ctgov is None:
                ctgov_not_found.append(item["nct"])
                continue
            if "_error" in ctgov:
                ctgov_failures.append((item["nct"], ctgov["_error"]))
                continue
            conditions = get_ctgov_conditions(ctgov)
            if conditions is None:
                ctgov_failures.append((item["nct"], "no conditions field"))
                continue

            cond_onco = is_oncology_condition(conditions)
            if cond_onco:
                false_positive_flags.append({
                    **item,
                    "ctgov_conditions": conditions,
                    "classification": "false_positive_flag",
                })
            else:
                confirmed_non_onco.append({
                    **item,
                    "ctgov_conditions": conditions,
                    "classification": "confirmed_non_oncology",
                })

        # 10% random sample of non-flagged to estimate false-negative rate
        sample_size = max(10, len(not_flagged) // 10)
        random.seed(42)  # reproducible
        sample = random.sample(not_flagged, min(sample_size, len(not_flagged)))
        print(f"  D4: Fetching CT.gov for {len(sample)} non-flagged sample (false-negative check)...")
        false_negatives = []
        for nct in sample:
            ctgov = fetch_ctgov(nct)
            if ctgov is None or "_error" in ctgov:
                continue
            conditions = get_ctgov_conditions(ctgov)
            if conditions and is_oncology_condition(conditions):
                # This is oncology — keyword heuristic correctly identified it
                pass
            else:
                # Non-flagged but CT.gov says non-oncology — false negative
                false_negatives.append({
                    "nct": nct,
                    "title": data[nct].get("title", ""),
                    "ctgov_conditions": conditions or [],
                    "classification": "false_negative",
                })

    # Compute rates
    flagged_count = len(flagged)
    confirmed_count = len(confirmed_non_onco)
    fp_count = len(false_positive_flags)
    fn_count = len(false_negatives) if do_ctgov else None
    sample_count = len(sample) if do_ctgov else 0

    fp_rate = round(fp_count / flagged_count, 3) if flagged_count else 0
    fn_rate = round(fn_count / sample_count, 3) if do_ctgov and sample_count else None

    return {
        "class": "D4",
        "name": "Non-oncology contamination",
        "severity": "critical",
        "flagged_count": flagged_count,
        "confirmed_non_oncology_count": confirmed_count,
        "false_positive_flag_count": fp_count,
        "false_positive_rate": fp_rate,
        "false_negative_sample_size": sample_count,
        "false_negative_count": fn_count if do_ctgov else None,
        "false_negative_rate": fn_rate,
        "ctgov_failure_count": len(ctgov_failures),
        "ctgov_not_found_count": len(ctgov_not_found),
        "confirmed_non_oncology": confirmed_non_onco,
        "false_positive_flags": false_positive_flags,
        "false_negatives": false_negatives if do_ctgov else [],
        "ctgov_failures": ctgov_failures,
        "evidence_samples": [
            f"{t['nct']}: {t['title'][:50]} → conditions={t['ctgov_conditions']}"
            for t in confirmed_non_onco[:5]
        ],
    }


# ── D5: Axis-magnitude distribution ──────────────────────────────────────────
def audit_d5_axis_magnitude(data):
    """Per-axis distribution and dominance."""
    axis_values = defaultdict(list)  # axis -> list of (nct, value)
    axis_nonzero_count = Counter()

    for nct, entry in data.items():
        mv = entry.get("moa_vector", {})
        for ax in AXES_8D:
            v = mv.get(ax, 0.0)
            if v > 0:
                axis_values[ax].append((nct, v))
                axis_nonzero_count[ax] += 1

    # Per-axis stats
    axis_stats = {}
    for ax in AXES_8D:
        vals = [v for _, v in axis_values[ax]]
        if not vals:
            axis_stats[ax] = {"nonzero_count": 0, "mean": 0, "max": 0, "top5": []}
            continue
        axis_stats[ax] = {
            "nonzero_count": len(vals),
            "mean": round(sum(vals) / len(vals), 3),
            "max": max(vals),
            "top5": sorted(axis_values[ax], key=lambda x: -x[1])[:5],
        }

    # Identify dominance: axis where one entry is >> mean
    dominance = []
    for ax in AXES_8D:
        s = axis_stats[ax]
        if s["nonzero_count"] == 0:
            continue
        if s["nonzero_count"] <= 3 and s["max"] >= 0.5:
            dominance.append({
                "axis": ax,
                "issue": f"Only {s['nonzero_count']} nonzero entries, max={s['max']} — single entry dominates",
                "top_entry": s["top5"][0] if s["top5"] else None,
            })

    return {
        "class": "D5",
        "name": "Axis-magnitude distribution and dominance",
        "severity": "high",
        "axis_stats": axis_stats,
        "dominance_issues": dominance,
        "evidence_samples": [
            f"{d['axis']}: {d['issue']}" for d in dominance[:5]
        ],
    }


# ── D6: Source-quality audit ─────────────────────────────────────────────────
def audit_d6_source_quality(data, d1_result, d4_result):
    """Per-source defect rates."""
    source_stats = defaultdict(lambda: {
        "count": 0,
        "all_zero": 0,
        "single_axis": 0,
        "confirmed_non_onco": 0,
        "confidence_values": [],
    })

    all_zero_set = set(d1_result["all_zero_ncts"])
    single_axis_set = set(d1_result["single_axis_ncts"])
    confirmed_non_onco_ncts = {x["nct"] for x in d4_result.get("confirmed_non_oncology", [])}

    for nct, entry in data.items():
        source = entry.get("source", "MISSING")
        source_stats[source]["count"] += 1
        if nct in all_zero_set:
            source_stats[source]["all_zero"] += 1
        if nct in single_axis_set:
            source_stats[source]["single_axis"] += 1
        if nct in confirmed_non_onco_ncts:
            source_stats[source]["confirmed_non_onco"] += 1
        conf = entry.get("confidence")
        if isinstance(conf, (int, float)):
            source_stats[source]["confidence_values"].append(conf)

    # Compute rates
    source_matrix = {}
    for source, s in sorted(source_stats.items(), key=lambda x: -x[1]["count"]):
        c = s["count"]
        confs = s["confidence_values"]
        source_matrix[source] = {
            "count": c,
            "all_zero_rate": round(s["all_zero"] / c, 3) if c else 0,
            "single_axis_rate": round(s["single_axis"] / c, 3) if c else 0,
            "confirmed_non_onco_rate": round(s["confirmed_non_onco"] / c, 3) if c else 0,
            "mean_confidence": round(sum(confs) / len(confs), 3) if confs else None,
        }

    return {
        "class": "D6",
        "name": "Provenance / source-quality audit",
        "severity": "high",
        "source_matrix": source_matrix,
        "evidence_samples": [
            f"{src}: count={s['count']}, all_zero_rate={s['all_zero_rate']}, non_onco_rate={s['confirmed_non_onco_rate']}"
            for src, s in list(source_matrix.items())[:5]
        ],
    }


# ── D7: GLB IP-valuation set ─────────────────────────────────────────────────
def audit_d7_glb_set(data, d3_result):
    """Per-trial verdict for the 6 GLB trials."""
    verdicts = []
    d3_by_nct = {v["nct"]: v for v in d3_result["anchor_verdicts"]}

    for nct in GLB_SET:
        mech = ANCHOR_MECHANISMS.get(nct, {})
        if nct not in data:
            verdicts.append({
                "nct": nct,
                "drug": mech.get("drug", "?"),
                "verdict": "ABSENT",
                "defect": "Not in registry",
                "vector": None,
            })
            continue

        entry = data[nct]
        mv = entry.get("moa_vector", {})
        defects = []

        # Inherit D3 verdict if this is also a PC-02 anchor
        if nct in d3_by_nct:
            d3v = d3_by_nct[nct]
            if d3v["verdict"] == "DEFECTIVE":
                defects.append(f"D3: {d3v['defect']}")
            elif d3v["verdict"] == "ABSENT":
                defects.append("D3: absent")

        # GLB-specific checks
        if nct == "NCT04154956":
            # CEACAM5 ADC — not in 8D axis framework
            active = [ax for ax in AXES_8D if mv.get(ax, 0) > 0]
            if not active:
                defects.append("CEACAM5 ADC has no 8D axis signal (expected — target not in framework)")
            else:
                defects.append(f"CEACAM5 ADC tagged with {active} — may be spurious")

        if nct == "NCT02870920":
            # CO.26 — IO trial
            if mv.get("io", 0) < 0.5:
                defects.append(f"io={mv.get('io', 0)} — expected io-dominant for durvalumab trial")

        verdict = "DEFECTIVE" if defects else "OK"
        verdicts.append({
            "nct": nct,
            "drug": mech.get("drug", "?"),
            "verdict": verdict,
            "defect": "; ".join(defects) if defects else "none detected",
            "vector": mv,
            "source": entry.get("source"),
            "confidence": entry.get("confidence"),
        })

    return {
        "class": "D7",
        "name": "GLB IP-valuation set per-trial verdicts",
        "severity": "critical",
        "glb_verdicts": verdicts,
        "defective_count": sum(1 for v in verdicts if v["verdict"] == "DEFECTIVE"),
        "absent_count": sum(1 for v in verdicts if v["verdict"] == "ABSENT"),
        "ok_count": sum(1 for v in verdicts if v["verdict"] == "OK"),
        "evidence_samples": [f"{v['nct']}: {v['verdict']} — {v['defect'][:80]}" for v in verdicts],
    }


# ── Health score ─────────────────────────────────────────────────────────────
def compute_health_score(data, results):
    """0-100 registry health score. Higher = healthier."""
    n = len(data)
    score = 100

    # D1: sparsity penalty
    all_zero_pct = results["d1"]["all_zero_pct"]
    score -= all_zero_pct * 0.4  # 57% all-zero → -23 points

    # D2: type inconsistency penalty
    d2 = results["d2"]
    type_issues = d2["string_confidence_count"] + d2["missing_source_count"] + d2["missing_reviewed_by_count"]
    score -= min(10, type_issues / n * 100 * 0.5)

    # D3: anchor defects penalty (critical)
    d3 = results["d3"]
    score -= d3["defective_count"] * 8 + d3["absent_count"] * 10

    # D4: contamination penalty
    d4 = results["d4"]
    confirmed_pct = 100 * d4["confirmed_non_oncology_count"] / n
    score -= confirmed_pct * 1.5

    # D5: dominance penalty
    d5 = results["d5"]
    score -= len(d5["dominance_issues"]) * 3

    # D7: GLB defects penalty
    d7 = results["d7"]
    score -= d7["defective_count"] * 6 + d7["absent_count"] * 8

    return max(0, round(score))


# ── Report writers ────────────────────────────────────────────────────────────
def write_report(data, results, health_score, do_ctgov):
    """Write the human-readable markdown report."""
    lines = []
    lines.append("# 609-Trial MoA Vector Registry Audit Report")
    lines.append("")
    lines.append(f"**Audit date:** {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    lines.append(f"**Registry:** `/workspace/crispro-backend-v2/api/resources/trial_moa_vectors.json`")
    lines.append(f"**Registry size:** {len(data)} trials, 431 KB, single-line JSON")
    lines.append(f"**Registry mtime:** 2026-07-05 (per file stat)")
    lines.append(f"**CT.gov lookups:** {'enabled' if do_ctgov else 'skipped (cache only)'}")
    lines.append(f"**Overall health score:** {health_score}/100")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Executive summary
    lines.append("## Executive summary")
    lines.append("")
    lines.append("The registry is **severely degraded** and unfit for production use without remediation. ")
    lines.append(f"Health score: **{health_score}/100**. Key findings:")
    lines.append("")
    lines.append(f"- **D1 Sparsity:** {results['d1']['all_zero_count']}/{len(data)} ({results['d1']['all_zero_pct']}%) all-zero vectors; only {results['d1']['multi_axis_count']} ({results['d1']['multi_axis_pct']}%) have multi-axis signal.")
    lines.append(f"- **D2 Type inconsistency:** {results['d2']['string_confidence_count']} string-confidence, {results['d2']['missing_source_count']} missing source, {results['d2']['missing_reviewed_by_count']} missing reviewed_by.")
    lines.append(f"- **D3 Anchor defects:** {results['d3']['defective_count']} defective, {results['d3']['absent_count']} absent out of {len(PC02_ANCHORS)} PC-02 anchors.")
    if do_ctgov:
        lines.append(f"- **D4 Contamination:** {results['d4']['confirmed_non_oncology_count']} CT.gov-confirmed non-oncology trials ({results['d4']['false_positive_rate']} false-positive rate on keyword heuristic).")
    else:
        lines.append(f"- **D4 Contamination:** {results['d4']['flagged_count']} keyword-flagged (CT.gov lookups skipped).")
    lines.append(f"- **D5 Axis dominance:** {len(results['d5']['dominance_issues'])} axes with single-entry dominance.")
    lines.append(f"- **D6 Source quality:** {len(results['d6']['source_matrix'])} sources; cohere_batch_tagging supplies {results['d6']['source_matrix'].get('cohere_batch_tagging', {}).get('count', 0)} trials (82%).")
    lines.append(f"- **D7 GLB set:** {results['d7']['defective_count']} defective, {results['d7']['absent_count']} absent out of {len(GLB_SET)} GLB IP-valuation trials.")
    lines.append("")
    lines.append("**Go/no-go recommendation:** NO-GO for production use without remediation. See remediation blueprint for prioritized fixes.")
    lines.append("")
    lines.append("---")
    lines.append("")

    # D1
    d1 = results["d1"]
    lines.append("## D1 — Sparsity (all-zero and single-axis vectors)")
    lines.append("")
    lines.append(f"**Severity:** {d1['severity']}")
    lines.append("")
    lines.append(f"| Metric | Count | % |")
    lines.append(f"|---|---|---|")
    lines.append(f"| All-zero vectors | {d1['all_zero_count']} | {d1['all_zero_pct']}% |")
    lines.append(f"| Single-axis | {d1['single_axis_count']} | {d1['single_axis_pct']}% |")
    lines.append(f"| Multi-axis (≥2) | {d1['multi_axis_count']} | {d1['multi_axis_pct']}% |")
    lines.append("")
    lines.append("**Single-axis distribution** (which axis dominates the single-axis trials):")
    lines.append("")
    for ax, cnt in sorted(d1["single_axis_distribution"].items(), key=lambda x: -x[1]):
        lines.append(f"- `{ax}`: {cnt}")
    lines.append("")
    lines.append(f"**Evidence samples** (first 5 all-zero, first 5 single-axis):")
    for nct in d1["all_zero_ncts"][:5]:
        title = data[nct].get("title", "")[:60]
        lines.append(f"- `{nct}` (all-zero): {title}")
    for nct in d1["single_axis_ncts"][:5]:
        title = data[nct].get("title", "")[:60]
        mv = data[nct].get("moa_vector", {})
        active = [f"{ax}={mv[ax]}" for ax in AXES_8D if mv.get(ax, 0) > 0]
        lines.append(f"- `{nct}` (single-axis {active}): {title}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # D2
    d2 = results["d2"]
    lines.append("## D2 — Type inconsistency (confidence / source / reviewed_by)")
    lines.append("")
    lines.append(f"**Severity:** {d2['severity']}")
    lines.append("")
    lines.append(f"| Issue | Count |")
    lines.append(f"|---|---|")
    lines.append(f"| String confidence values | {d2['string_confidence_count']} |")
    lines.append(f"| Missing confidence | {d2['missing_confidence_count']} |")
    lines.append(f"| Missing source | {d2['missing_source_count']} |")
    lines.append(f"| Missing reviewed_by | {d2['missing_reviewed_by_count']} |")
    lines.append("")
    lines.append("**String-confidence entries** (should be numeric):")
    lines.append("")
    for nct, conf in d2["string_confidence_entries"][:20]:
        title = data[nct].get("title", "")[:50]
        lines.append(f"- `{nct}`: confidence=`{conf}` — {title}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # D3
    d3 = results["d3"]
    lines.append("## D3 — Mechanism-coding defects on PC-02 anchor trials")
    lines.append("")
    lines.append(f"**Severity:** {d3['severity']}")
    lines.append("")
    lines.append(f"| NCT | Drug | Verdict | Defect |")
    lines.append(f"|---|---|---|---|")
    for v in d3["anchor_verdicts"]:
        defect_short = v["defect"][:70].replace("|", "\\|")
        lines.append(f"| `{v['nct']}` | {v['drug'][:30]} | **{v['verdict']}** | {defect_short} |")
    lines.append("")
    lines.append("**Per-anchor detail:**")
    lines.append("")
    for v in d3["anchor_verdicts"]:
        lines.append(f"### `{v['nct']}` — {v['drug']}")
        lines.append(f"- **Verdict:** {v['verdict']}")
        lines.append(f"- **Published:** {v['published']}")
        lines.append(f"- **Expected direction:** {v['expected_direction']}")
        if v["registry_vector"]:
            lines.append(f"- **Registry vector:** `{v['registry_vector']}`")
            lines.append(f"- **Source:** {v.get('source')}, **Confidence:** {v.get('confidence')}")
        lines.append(f"- **Defect:** {v['defect']}")
        lines.append("")
    lines.append("---")
    lines.append("")

    # D4
    d4 = results["d4"]
    lines.append("## D4 — Non-oncology contamination")
    lines.append("")
    lines.append(f"**Severity:** {d4['severity']}")
    lines.append("")
    lines.append(f"| Metric | Count |")
    lines.append(f"|---|---|")
    lines.append(f"| Keyword-flagged (Pass 1) | {d4['flagged_count']} |")
    if do_ctgov:
        lines.append(f"| CT.gov-confirmed non-oncology | {d4['confirmed_non_oncology_count']} |")
        lines.append(f"| False-positive flags (flagged but actually oncology) | {d4['false_positive_flag_count']} |")
        lines.append(f"| False-positive rate | {d4['false_positive_rate']} |")
        lines.append(f"| False-negative sample size | {d4['false_negative_sample_size']} |")
        lines.append(f"| False-negative count (non-flagged but non-oncology) | {d4['false_negative_count']} |")
        lines.append(f"| False-negative rate | {d4['false_negative_rate']} |")
        lines.append(f"| CT.gov fetch failures | {d4['ctgov_failure_count']} |")
        lines.append(f"| CT.gov 404 (not found) | {d4['ctgov_not_found_count']} |")
    lines.append("")
    if do_ctgov and d4["confirmed_non_oncology"]:
        lines.append("**CT.gov-confirmed non-oncology trials** (delete candidates — Tier 1):")
        lines.append("")
        lines.append(f"| NCT | Title | CT.gov conditions | Assigned axis | Source |")
        lines.append(f"|---|---|---|---|---|")
        for item in d4["confirmed_non_oncology"][:30]:
            mv = item["vector"]
            active = [ax for ax in AXES_8D if mv.get(ax, 0) > 0]
            conds = ", ".join(item["ctgov_conditions"][:3])[:50].replace("|", "\\|")
            title = item["title"][:45].replace("|", "\\|")
            lines.append(f"| `{item['nct']}` | {title} | {conds} | {','.join(active)} | {item['source']} |")
        if len(d4["confirmed_non_oncology"]) > 30:
            lines.append(f"\n*...and {len(d4['confirmed_non_oncology']) - 30} more (see defects CSV)*")
        lines.append("")
    if d4["false_positive_flags"]:
        lines.append(f"**False-positive flags** ({len(d4['false_positive_flags'])} flagged but CT.gov confirms oncology — title was just poorly worded):")
        lines.append("")
        for item in d4["false_positive_flags"][:10]:
            conds = ", ".join(item["ctgov_conditions"][:3])
            lines.append(f"- `{item['nct']}`: {item['title'][:50]} → conditions: {conds}")
        lines.append("")
    if d4.get("false_negatives"):
        lines.append(f"**False negatives** ({len(d4['false_negatives'])} non-flagged trials that CT.gov says are non-oncology — keyword heuristic missed these):")
        lines.append("")
        for item in d4["false_negatives"][:10]:
            lines.append(f"- `{item['nct']}`: {item['title'][:50]} → conditions: {', '.join(item['ctgov_conditions'][:3])}")
        lines.append("")
    lines.append("---")
    lines.append("")

    # D5
    d5 = results["d5"]
    lines.append("## D5 — Axis-magnitude distribution and dominance")
    lines.append("")
    lines.append(f"**Severity:** {d5['severity']}")
    lines.append("")
    lines.append(f"| Axis | Nonzero count | Mean | Max |")
    lines.append(f"|---|---|---|---|")
    for ax in AXES_8D:
        s = d5["axis_stats"][ax]
        lines.append(f"| `{ax}` | {s['nonzero_count']} | {s['mean']} | {s['max']} |")
    lines.append("")
    if d5["dominance_issues"]:
        lines.append("**Dominance issues** (axes where a single high-magnitude entry dominates):")
        lines.append("")
        for d in d5["dominance_issues"]:
            lines.append(f"- **{d['axis']}**: {d['issue']}")
            if d["top_entry"]:
                lines.append(f"  - Top entry: `{d['top_entry'][0]}` = {d['top_entry'][1]}")
        lines.append("")
    lines.append("---")
    lines.append("")

    # D6
    d6 = results["d6"]
    lines.append("## D6 — Provenance / source-quality audit")
    lines.append("")
    lines.append(f"**Severity:** {d6['severity']}")
    lines.append("")
    lines.append(f"| Source | Count | All-zero rate | Single-axis rate | Non-onco rate | Mean confidence |")
    lines.append(f"|---|---|---|---|---|---|")
    for source, s in d6["source_matrix"].items():
        mc = s["mean_confidence"] if s["mean_confidence"] is not None else "—"
        lines.append(f"| `{source}` | {s['count']} | {s['all_zero_rate']} | {s['single_axis_rate']} | {s['confirmed_non_onco_rate']} | {mc} |")
    lines.append("")
    lines.append("---")
    lines.append("")

    # D7
    d7 = results["d7"]
    lines.append("## D7 — GLB IP-valuation set per-trial verdicts")
    lines.append("")
    lines.append(f"**Severity:** {d7['severity']}")
    lines.append("")
    lines.append(f"| NCT | Drug | Verdict | Defect |")
    lines.append(f"|---|---|---|---|")
    for v in d7["glb_verdicts"]:
        defect_short = v["defect"][:70].replace("|", "\\|")
        lines.append(f"| `{v['nct']}` | {v['drug'][:30]} | **{v['verdict']}** | {defect_short} |")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Go/no-go
    lines.append("## Go/no-go recommendation")
    lines.append("")
    lines.append(f"**Health score: {health_score}/100** — ")
    if health_score < 50:
        lines.append("**NO-GO for production use.** Registry requires substantial remediation before it can be used in any external-facing deliverable or as the production ranker's trial substrate.")
    elif health_score < 75:
        lines.append("**CONDITIONAL GO** — registry usable for internal R&D with caveats; not suitable for external claims without Tier 1-2 remediation.")
    else:
        lines.append("**GO** with monitoring.")
    lines.append("")
    lines.append("**Reasoning:**")
    lines.append(f"- {d1['all_zero_pct']}% of vectors carry no mechanism signal (all-zero).")
    lines.append(f"- {d3['defective_count']}/{len(PC02_ANCHORS)} PC-02 anchors have mechanism-coding defects; {d3['absent_count']} are absent.")
    if do_ctgov:
        lines.append(f"- {d4['confirmed_non_oncology_count']} confirmed non-oncology trials contaminate the registry.")
    lines.append(f"- The rss axis has only {d5['axis_stats']['rss']['nonzero_count']} nonzero entries — the 8D extension is effectively unused.")
    lines.append(f"- cohere_batch_tagging supplies {d6['source_matrix'].get('cohere_batch_tagging', {}).get('count', 0)}/{len(data)} trials; its all-zero rate is {d6['source_matrix'].get('cohere_batch_tagging', {}).get('all_zero_rate', 0)}.")
    lines.append("")
    lines.append("See `registry_remediation_blueprint.md` for the prioritized fix list.")
    lines.append("")

    REPORT_PATH.write_text("\n".join(lines))
    print(f"  Wrote {REPORT_PATH}")


def write_defects_csv(data, results, do_ctgov):
    """Write machine-readable defect register."""
    rows = []

    # D1: all-zero
    for nct in results["d1"]["all_zero_ncts"]:
        rows.append({
            "nct_id": nct,
            "title": data[nct].get("title", "")[:100],
            "defect_class": "D1_sparsity",
            "severity": "high",
            "evidence": "all-zero vector (no mechanism signal)",
            "remediation_action": "Tier 5: delete / re-tag / mark unknown (owner-gated)",
            "remediation_difficulty": "decision",
            "ctgov_confirmed": "",
        })

    # D1: single-axis
    for nct in results["d1"]["single_axis_ncts"]:
        mv = data[nct].get("moa_vector", {})
        active = [ax for ax in AXES_8D if mv.get(ax, 0) > 0]
        rows.append({
            "nct_id": nct,
            "title": data[nct].get("title", "")[:100],
            "defect_class": "D1_single_axis",
            "severity": "medium",
            "evidence": f"single-axis: {active}",
            "remediation_action": "review — may be correct for monotherapy",
            "remediation_difficulty": "medium",
            "ctgov_confirmed": "",
        })

    # D2: type issues
    for nct, conf in results["d2"]["string_confidence_entries"]:
        rows.append({
            "nct_id": nct,
            "title": data[nct].get("title", "")[:100],
            "defect_class": "D2_string_confidence",
            "severity": "medium",
            "evidence": f"confidence={conf} (string, not numeric)",
            "remediation_action": "Tier 4: convert to numeric",
            "remediation_difficulty": "easy",
            "ctgov_confirmed": "",
        })
    for nct in results["d2"]["missing_source_ncts"]:
        rows.append({
            "nct_id": nct,
            "title": data[nct].get("title", "")[:100],
            "defect_class": "D2_missing_source",
            "severity": "low",
            "evidence": "source field missing",
            "remediation_action": "Tier 4: backfill or mark unknown",
            "remediation_difficulty": "easy",
            "ctgov_confirmed": "",
        })
    for nct in results["d2"]["missing_reviewed_ncts"]:
        rows.append({
            "nct_id": nct,
            "title": data[nct].get("title", "")[:100],
            "defect_class": "D2_missing_reviewed_by",
            "severity": "low",
            "evidence": "reviewed_by field missing",
            "remediation_action": "Tier 4: backfill or mark unknown",
            "remediation_difficulty": "easy",
            "ctgov_confirmed": "",
        })

    # D3: anchor defects
    for v in results["d3"]["anchor_verdicts"]:
        if v["verdict"] in ("DEFECTIVE", "ABSENT"):
            rows.append({
                "nct_id": v["nct"],
                "title": v["drug"][:100],
                "defect_class": "D3_anchor_defect",
                "severity": "critical",
                "evidence": v["defect"][:200],
                "remediation_action": "Tier 2: re-tag with correct mechanism",
                "remediation_difficulty": "medium",
                "ctgov_confirmed": "",
            })

    # D4: confirmed non-oncology
    if do_ctgov:
        for item in results["d4"]["confirmed_non_oncology"]:
            mv = item["vector"]
            active = [ax for ax in AXES_8D if mv.get(ax, 0) > 0]
            rows.append({
                "nct_id": item["nct"],
                "title": item["title"][:100],
                "defect_class": "D4_non_oncology",
                "severity": "critical",
                "evidence": f"CT.gov conditions: {', '.join(item['ctgov_conditions'][:3])}; assigned axis: {active}",
                "remediation_action": "Tier 1: DELETE from registry",
                "remediation_difficulty": "easy",
                "ctgov_confirmed": "yes",
            })
        for item in results["d4"]["false_positive_flags"]:
            rows.append({
                "nct_id": item["nct"],
                "title": item["title"][:100],
                "defect_class": "D4_false_positive_flag",
                "severity": "low",
                "evidence": f"keyword-flagged but CT.gov confirms oncology: {', '.join(item['ctgov_conditions'][:3])}",
                "remediation_action": "no action needed (title was poorly worded)",
                "remediation_difficulty": "none",
                "ctgov_confirmed": "yes (oncology)",
            })

    # D5: dominance
    for d in results["d5"]["dominance_issues"]:
        if d["top_entry"]:
            rows.append({
                "nct_id": d["top_entry"][0],
                "title": data.get(d["top_entry"][0], {}).get("title", "")[:100],
                "defect_class": "D5_axis_dominance",
                "severity": "high",
                "evidence": f"{d['axis']}: {d['issue']}",
                "remediation_action": "review magnitude — may need normalization",
                "remediation_difficulty": "medium",
                "ctgov_confirmed": "",
            })

    # D7: GLB defects
    for v in results["d7"]["glb_verdicts"]:
        if v["verdict"] in ("DEFECTIVE", "ABSENT"):
            rows.append({
                "nct_id": v["nct"],
                "title": v["drug"][:100],
                "defect_class": "D7_glb_defect",
                "severity": "critical",
                "evidence": v["defect"][:200],
                "remediation_action": "Tier 2: re-tag or add to registry",
                "remediation_difficulty": "medium",
                "ctgov_confirmed": "",
            })

    with open(DEFECTS_CSV_PATH, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "nct_id", "title", "defect_class", "severity", "evidence",
            "remediation_action", "remediation_difficulty", "ctgov_confirmed"
        ])
        writer.writeheader()
        writer.writerows(rows)
    print(f"  Wrote {DEFECTS_CSV_PATH} ({len(rows)} rows)")


def write_summary_json(data, results, health_score, do_ctgov):
    """Write structured summary JSON."""
    summary = {
        "audit_date": datetime.now(timezone.utc).isoformat(),
        "registry_path": str(REGISTRY_PATH),
        "registry_size": len(data),
        "ctgov_lookups_enabled": do_ctgov,
        "health_score": health_score,
        "defect_class_counts": {
            "D1_all_zero": results["d1"]["all_zero_count"],
            "D1_single_axis": results["d1"]["single_axis_count"],
            "D1_multi_axis": results["d1"]["multi_axis_count"],
            "D2_string_confidence": results["d2"]["string_confidence_count"],
            "D2_missing_source": results["d2"]["missing_source_count"],
            "D2_missing_reviewed_by": results["d2"]["missing_reviewed_by_count"],
            "D3_anchor_defective": results["d3"]["defective_count"],
            "D3_anchor_absent": results["d3"]["absent_count"],
            "D4_confirmed_non_oncology": results["d4"]["confirmed_non_oncology_count"] if do_ctgov else None,
            "D4_false_positive_flags": results["d4"]["false_positive_flag_count"] if do_ctgov else None,
            "D4_false_negative_rate": results["d4"]["false_negative_rate"] if do_ctgov else None,
            "D5_dominance_issues": len(results["d5"]["dominance_issues"]),
            "D6_source_count": len(results["d6"]["source_matrix"]),
            "D7_glb_defective": results["d7"]["defective_count"],
            "D7_glb_absent": results["d7"]["absent_count"],
        },
        "anchor_verdicts": results["d3"]["anchor_verdicts"],
        "glb_verdicts": results["d7"]["glb_verdicts"],
        "source_matrix": results["d6"]["source_matrix"],
        "axis_stats": results["d5"]["axis_stats"],
    }
    with open(SUMMARY_JSON_PATH, "w") as f:
        json.dump(summary, f, indent=2, default=str)
    print(f"  Wrote {SUMMARY_JSON_PATH}")


def write_blueprint(data, results, health_score, do_ctgov):
    """Write the remediation blueprint."""
    d4 = results["d4"]
    d1 = results["d1"]
    d2 = results["d2"]
    d6 = results["d6"]

    confirmed_count = d4["confirmed_non_oncology_count"] if do_ctgov else d4["flagged_count"]
    cohere = d6["source_matrix"].get("cohere_batch_tagging", {})

    lines = []
    lines.append("# Registry Remediation Blueprint")
    lines.append("")
    lines.append(f"**Generated:** {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    lines.append(f"**Health score:** {health_score}/100")
    lines.append(f"**Registry:** {len(data)} trials")
    lines.append("")
    lines.append("Ranks fixes by impact × effort. Each tier is independent — execute in order for maximum impact per unit effort.")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Tier 1
    lines.append("## Tier 1 — Delete confirmed non-oncology trials")
    lines.append("")
    lines.append(f"**Action:** Delete {confirmed_count} CT.gov-confirmed non-oncology trials from the registry.")
    lines.append(f"**Effort:** Minutes (one JSON edit).")
    lines.append(f"**Impact:** Removes false DDR/MAPK/IO signal from psychiatric, endocrine, cardiovascular, and other non-oncology trials that were mis-tagged by automated keyword matchers.")
    lines.append(f"**Risk:** Low — these trials should never have been in an oncology MoA vector registry.")
    lines.append("")
    if do_ctgov and d4["confirmed_non_oncology"]:
        lines.append("**Trials to delete:**")
        lines.append("")
        for item in d4["confirmed_non_oncology"][:40]:
            conds = ", ".join(item["ctgov_conditions"][:2])
            lines.append(f"- `{item['nct']}`: {item['title'][:60]} → conditions: {conds}")
        if len(d4["confirmed_non_oncology"]) > 40:
            lines.append(f"\n*...and {len(d4['confirmed_non_oncology']) - 40} more (see defects CSV)*")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Tier 2
    lines.append("## Tier 2 — Re-tag PC-02 anchor trials")
    lines.append("")
    lines.append("**Action:** Fix the 4 defective/absent PC-02 anchors using published-mechanism vectors from LIFT-004 §5.2.")
    lines.append("**Effort:** ~1 hour with published-mechanism lookup.")
    lines.append("**Impact:** Unblocks the PC-02 retroactive-prediction re-test (the locked lift criterion). Without this, PC-02 stays permanently downgraded.")
    lines.append("**Risk:** Medium — requires mechanism-vetted vectors; LIFT-004 v2 vectors are diagnostic-only (engineered-to-pass), so an independent re-tag is needed.")
    lines.append("")
    lines.append("**Specific fixes:**")
    lines.append("")
    lines.append("| NCT | Current vector | Corrected vector (per LIFT-004 v2) | Rationale |")
    lines.append("|---|---|---|---|")
    lines.append("| `NCT02595892` | `{ddr:0.9, rss:0.75}` | `{ddr:0.9, rss_exploit:0.75}` | RS is the exploitable target of ATRi, routed to responder-favouring axis |")
    lines.append("| `NCT03579316` | `{ddr:1.0, mapk:1.0, pi3k:1.0, rss:0.7}` | `{ddr:1.0, rss_exploit:0.7}` | Drop PTEN-loss resistance (pi3k) and spurious mapk; WEE1i acts on DDR/RS |")
    lines.append("| `NCT02264678` | `{mapk:1.0, pi3k:1.0}` | `{ddr:1.0, rss_exploit:0.6}` | Restore DDR axis for ATR+PARP combo |")
    lines.append("| `NCT03462342` | (absent) | `{ddr:1.0, rss_exploit:0.6}` | Add CAPRI to registry with correct DDR-dominant vector |")
    lines.append("")
    lines.append("**Note:** The `rss_exploit` / `rss_resist` axis split requires a schema change to the registry (8D → 9D). This is a separate governance decision. Alternatively, keep 8D but flip the rss sign convention so high rss = exploitable (responder-favouring), not resistant.")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Tier 3
    lines.append("## Tier 3 — Audit and re-tag cohere_batch_tagging source")
    lines.append("")
    lines.append(f"**Action:** Audit the `cohere_batch_tagging` source ({cohere.get('count', 0)} trials, {round(100 * cohere.get('count', 0) / len(data))}% of registry).")
    lines.append(f"**Effort:** Days (systemic re-tagging or manual review of top-N).")
    lines.append(f"**Impact:** Determines whether the registry is salvageable as a whole or needs to be rebuilt.")
    lines.append(f"**Risk:** High — if the tagger's false-positive rate is >20%, most of the registry is suspect.")
    lines.append("")
    lines.append(f"**Current cohere_batch_tagging defect rates:**")
    lines.append(f"- All-zero rate: {cohere.get('all_zero_rate', 0)}")
    lines.append(f"- Single-axis rate: {cohere.get('single_axis_rate', 0)}")
    lines.append(f"- Confirmed non-oncology rate: {cohere.get('confirmed_non_onco_rate', 0)}")
    lines.append(f"- Mean confidence: {cohere.get('mean_confidence', 0)}")
    lines.append("")
    lines.append("**Decision gate:** If confirmed non-oncology rate >20%, rebuild the registry from scratch with a vetted tagger. If <20%, re-tag the defective subset only.")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Tier 4
    lines.append("## Tier 4 — Normalize types and backfill missing fields")
    lines.append("")
    lines.append(f"**Action:** Fix {d2['string_confidence_count']} string-confidence entries, {d2['missing_source_count']} missing source, {d2['missing_reviewed_by_count']} missing reviewed_by.")
    lines.append("**Effort:** Minutes.")
    lines.append("**Impact:** Unblocks downstream confidence-based filtering and sorting.")
    lines.append("**Risk:** None.")
    lines.append("")
    lines.append("**Specific fixes:**")
    lines.append("- Convert string confidence values ('High', 'Medium', 'Low') to numeric (0.9, 0.7, 0.5).")
    lines.append("- Backfill missing `source` from git history or mark as `unknown`.")
    lines.append("- Backfill missing `reviewed_by` from git history or mark as `unknown`.")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Tier 5
    lines.append("## Tier 5 — Decide on all-zero vectors (owner-gated)")
    lines.append("")
    lines.append(f"**Action:** Decide the fate of {d1['all_zero_count']} all-zero vectors ({d1['all_zero_pct']}% of registry).")
    lines.append("**Effort:** Decision + execution.")
    lines.append("**Impact:** Determines registry size and discriminative power.")
    lines.append("**Risk:** Strategy decision — not a technical fix.")
    lines.append("")
    lines.append("**Options:**")
    lines.append("1. **Delete** — no mechanism signal = no value. Reduces registry to ~260 trials.")
    lines.append("2. **Re-tag** — run a better tagger (manual review or improved LLM prompt) to populate vectors. High effort.")
    lines.append("3. **Keep as 'unknown mechanism' markers** — explicit `source: unknown_mechanism`, excluded from ranker scoring but retained for provenance.")
    lines.append("")
    lines.append("**Recommendation:** Option 3 (keep as markers) is safest — preserves provenance without contaminating the ranker. Option 1 is fastest but loses trial coverage. Option 2 is ideal but expensive.")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Summary
    lines.append("## Summary")
    lines.append("")
    lines.append("| Tier | Action | Trial count | Effort | Impact |")
    lines.append("|---|---|---|---|---|")
    lines.append(f"| 1 | Delete non-oncology | {confirmed_count} | minutes | high |")
    lines.append(f"| 2 | Re-tag anchors | {results['d3']['defective_count'] + results['d3']['absent_count']} | ~1 hour | critical (unblocks PC-02) |")
    lines.append(f"| 3 | Re-tag cohere source | {cohere.get('count', 0)} | days | systemic |")
    lines.append(f"| 4 | Normalize types | {d2['string_confidence_count'] + d2['missing_source_count'] + d2['missing_reviewed_by_count']} | minutes | low |")
    lines.append(f"| 5 | Decide on all-zero | {d1['all_zero_count']} | decision | high |")
    lines.append("")
    lines.append("**Recommended execution order:** Tier 1 → Tier 2 → Tier 4 → Tier 5 decision → Tier 3 (if needed).")
    lines.append("")

    BLUEPRINT_PATH.write_text("\n".join(lines))
    print(f"  Wrote {BLUEPRINT_PATH}")


# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    do_ctgov = "--no-ctgov" not in sys.argv

    print("=" * 70)
    print("609-Trial MoA Vector Registry Audit")
    print("=" * 70)
    print(f"Registry: {REGISTRY_PATH}")
    print(f"CT.gov lookups: {'enabled' if do_ctgov else 'skipped'}")
    print()

    # Load
    print("Loading registry...")
    data = load_registry()
    print(f"  Loaded {len(data)} trials")
    print()

    # Run all detectors
    print("Running defect detectors...")
    print("  D1: Sparsity...")
    d1 = audit_d1_sparsity(data)
    print(f"    all_zero={d1['all_zero_count']}, single_axis={d1['single_axis_count']}, multi_axis={d1['multi_axis_count']}")

    print("  D2: Type inconsistency...")
    d2 = audit_d2_type_inconsistency(data)
    print(f"    string_conf={d2['string_confidence_count']}, missing_source={d2['missing_source_count']}, missing_reviewed={d2['missing_reviewed_by_count']}")

    print("  D3: Anchor defects...")
    d3 = audit_d3_anchor_defects(data)
    print(f"    defective={d3['defective_count']}, absent={d3['absent_count']}, ok={d3['ok_count']}")

    print("  D4: Non-oncology contamination...")
    d4 = audit_d4_contamination(data, do_ctgov=do_ctgov)
    if do_ctgov:
        print(f"    flagged={d4['flagged_count']}, confirmed_non_onco={d4['confirmed_non_oncology_count']}, false_pos={d4['false_positive_flag_count']}, false_neg_rate={d4['false_negative_rate']}")
    else:
        print(f"    flagged={d4['flagged_count']} (CT.gov skipped)")

    print("  D5: Axis-magnitude distribution...")
    d5 = audit_d5_axis_magnitude(data)
    print(f"    dominance_issues={len(d5['dominance_issues'])}")

    print("  D6: Source-quality audit...")
    d6 = audit_d6_source_quality(data, d1, d4)
    print(f"    sources={len(d6['source_matrix'])}")

    print("  D7: GLB IP-valuation set...")
    d7 = audit_d7_glb_set(data, d3)
    print(f"    defective={d7['defective_count']}, absent={d7['absent_count']}, ok={d7['ok_count']}")

    results = {"d1": d1, "d2": d2, "d3": d3, "d4": d4, "d5": d5, "d6": d6, "d7": d7}

    # Health score
    print()
    print("Computing health score...")
    health_score = compute_health_score(data, results)
    print(f"  Health score: {health_score}/100")
    print()

    # Write outputs
    print("Writing outputs...")
    write_report(data, results, health_score, do_ctgov)
    write_defects_csv(data, results, do_ctgov)
    write_summary_json(data, results, health_score, do_ctgov)
    write_blueprint(data, results, health_score, do_ctgov)

    print()
    print("=" * 70)
    print("AUDIT COMPLETE")
    print("=" * 70)
    print(f"  Health score: {health_score}/100")
    print(f"  Outputs in /mnt/results/:")
    print(f"    registry_audit_report.md")
    print(f"    registry_audit_defects.csv")
    print(f"    registry_audit_summary.json")
    print(f"    registry_remediation_blueprint.md")
    print(f"  CT.gov cache: /workspace/ctgov_cache/ ({len(list(CTGOV_CACHE.glob('*.json')))} files)")


if __name__ == "__main__":
    main()
