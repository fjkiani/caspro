# Audit 4: RAG Pipeline + Verba Frontend + CEACAM5/Sanofi

## 1. Brenus RAG Pipeline v6
```python
```

## 2. RAG Pipeline v5 (first 100)
```python
```

## 3. RAG Directory

## 4. Verba ChatInterface.tsx
```tsx
```

## 5. Verba ChatMessage.tsx
```tsx
```

## 6. Verba ChatView.tsx
```tsx
```

## 7. Verba ChatConfig.tsx
```tsx
```

## 8. Verba types.ts
```ts
```

## 9. Verba api.ts
```ts
```

## 10. Verba util.ts
```ts
```

## 11. Verba page.tsx
```tsx
```

## 12. Verba layout.tsx
```tsx
```

## 13. Verba package.json
```json
```

## 14. Verba tailwind.config.ts
```ts
```

## 15. CEACAM5 Sanofi Intelligence v2 JSON
```json
```

## 16. CEACAM5 Sanofi Executive Payload v2 JSON
```json
```

## 17. Backend v2 CEACAM5 Demo Router
```python
"""
CrisPRO CEACAM5 Intelligence Demo — Brenus Pharma / STC-1010

Endpoints:
  GET  /api/ceacam5/scenarios        → Brenus-specific proof scenarios
  POST /api/ceacam5/gate-simulate    → Live gate math (enrollment pool, ORR, cost/responder, fit_A, narrative)
  GET  /api/ceacam5/comparators      → Block 4 comparator fit scores (PATH A, locked 2026-04-28)
  GET  /api/ceacam5/sanofi-payload   → Persona-specific executive arguments + archetype table
  GET  /api/ceacam5/health           → Health check

All numbers sourced from verified artifacts only.
Claim types: SOURCED / COMPUTED / OPEN ASSUMPTION — labeled on every output.
PATH A formula: fit_A = clip((p·t) / ‖t‖₂, 0, 1) — locked 2026-04-28 by Fahad Kiani.
PATH B (cosine similarity dividing by ‖p‖₂·‖t‖₂) is PROHIBITED.

Research Use Only — Not for Clinical Decision Making.
"""

from __future__ import annotations

import math
from typing import Dict, List, Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field, validator

router = APIRouter(prefix="/api/ceacam5", tags=["ceacam5-demo"])

# ─────────────────────────────────────────────────────────────────────────────
# Constants — all from verified artifacts
# ─────────────────────────────────────────────────────────────────────────────

BASE_MSS_MCRC_US = 46_750
CEACAM5_50_FRAC = 0.50
CEACAM5_80_FRAC = 0.28             # OA-08: NSCLC proxy — WEAKEST NUMBER, CRC unconfirmed
CEA_HIGH_IN_80_FRAC = 0.403        # SOURCED CR-04
PTMB_HIGH_FRAC = 0.10              # SOURCED CR-15
IMMUNOSCORE_HIGH_FRAC = 0.15       # OA-09
RHO_CEACAM5_IO = 0.43              # SOURCED CR-26
PHASE2_COST_PER_PT_LOW = 25_000    # SOURCED CR-09
PHASE2_COST_PER_PT_HIGH = 50_000   # SOURCED CR-09

ORR_UNSELECTED = (0.03, 0.05)
ORR_CEACAM5_50 = (0.07, 0.08)      # SOURCED CR-01
ORR_CEACAM5_80 = (0.15, 0.20)      # COMPUTED CR-03
ORR_TWO_GATE = (0.35, 0.45)        # OPEN ASSUMPTION OA-05

P_VECTOR = {
    "ddr": 0.05, "mapk": 0.30, "pi3k": 0.10,
    "vegf": 0.20, "her2": 0.00, "io": 0.70, "efflux": 0.10,
}
P_NORM = 0.8016

COMPARATORS = [
    {
        "core_id": "INDEX",
        "trial_name": "BreAK CRC-001",
        "nct_id": "NCT06934538",
        "t_vector": {"ddr": 0.05, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.20, "her2": 0.00, "io": 0.70, "efflux": 0.10},
        "mechanism_validity": "UNPROVEN — Phase Ia only",
        "evidence_tier": "T3_UNPROVEN",
        "fit_A": 0.8016,
        "rank": 1,
    },
    {
        "core_id": "CORE-01",
        "trial_name": "QUILT-3.055",
        "nct_id": "NCT03167164",
        "t_vector": {"ddr": 0.05, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.20, "her2": 0.00, "io": 0.70, "efflux": 0.10},
        "mechanism_validity": "FALSIFIED_PARTIAL — HR 1.061 (no benefit)",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.8016,  # recomputed 2026-06-09 PATH A P_VECTOR v0.8016 (was 0.7938 — prior p_vector version)
        "rank": 2,
    },
    {
        "core_id": "CORE-03",
        "trial_name": "GVAX + CRS-207",
        "nct_id": "NCT01417000",
        "t_vector": {"ddr": 0.05, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.20, "her2": 0.00, "io": 0.70, "efflux": 0.10},
        "mechanism_validity": "FALSIFIED — ORR 0/22 in MSS CRC",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.8016,  # recomputed 2026-06-09 PATH A P_VECTOR v0.8016 (was 0.7938 — prior p_vector version)
        "rank": 3,
    },
    {
        "core_id": "CORE-06",
        "trial_name": "MEDITREME",
        "nct_id": "NCT03202758",
        "t_vector": {"ddr": 0.05, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.10, "her2": 0.00, "io": 0.50, "efflux": 0.05},
        "mechanism_validity": "FALSIFIED_MSS — no IO signal in MSS subgroup",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.7904,
        "rank": 4,
    },
    {
        "core_id": "CORE-02",
        "trial_name": "GRANITE",
        "nct_id": "NCT03165994",
        "t_vector": {"ddr": 0.10, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.20, "her2": 0.00, "io": 0.50, "efflux": 0.10},
        "mechanism_validity": "PROVISIONAL — Phase II/III ongoing; ctDNA-low signal preliminary",
        "evidence_tier": "T2_PROVISIONAL",
        "fit_A": 0.7887,
        "rank": 5,
    },
    {
        "core_id": "CORE-07",
        "trial_name": "CO.26",
        "nct_id": "NCT02264678",
        "t_vector": {"ddr": 0.05, "mapk": 0.20, "pi3k": 0.10, "vegf": 0.30, "her2": 0.00, "io": 0.60, "efflux": 0.05},
        "mechanism_validity": "PARTIAL — OS HR 0.73 (trend); liver-met subgroup Pint=0.02 (VERIFIED)",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.7845,  # recomputed 2026-06-09 PATH A P_VECTOR v0.8016 (was 0.7751 — prior p_vector version)
        "rank": 6,
    },
    {
        "core_id": "CORE-05",
        "trial_name": "AtezoTRIBE",
        "nct_id": "NCT03721653",
        "t_vector": {"ddr": 0.05, "mapk": 0.10, "pi3k": 0.10, "vegf": 0.60, "her2": 0.00, "io": 0.50, "efflux": 0.05},
        "mechanism_validity": "PARTIAL — PFS HR 0.69; DetermaIO IOOPT+ subgroup PFS HR 0.10 (PROVISIONAL)",
        "evidence_tier": "T2_PROVISIONAL",
        "fit_A": 0.6494,  # recomputed 2026-06-09 PATH A P_VECTOR v0.8016 (was 0.6297 — prior p_vector version)
        "rank": 7,
    },
    {
        "core_id": "CORE-04",
        "trial_name": "IMblaze370",
        "nct_id": "NCT02788279",
        "t_vector": {"ddr": 0.05, "mapk": 0.80, "pi3k": 0.10, "vegf": 0.10, "her2": 0.00, "io": 0.40, "efflux": 0.05},
        "mechanism_validity": "FALSIFIED — OS HR=1.00; MEKi immune priming definitively falsified at Phase III",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.6138,
        "rank": 8,
    },
]

ASSET_FIT_SCORES = {
    "SAR445877": {
        "pTMB-high, no liver mets": 0.880,
        "DetermaIO IOOPT+": 0.926,
        "Immunoscore-IC-high": 0.770,
        "CEACAM5 ≥80% + IO-permissive": 0.880,
        "pTMB-high, liver mets": 0.371,
        "Unselected MSS mCRC": 0.320,
    },
    "SAR445953": {
        "pTMB-high, no liver mets": 0.770,
        "DetermaIO IOOPT+": 0.741,
        "Immunoscore-IC-high": 0.596,
        "CEACAM5 ≥80% + IO-permissive": 0.770,
        "pTMB-high, liver mets": 0.597,
        "Unselected MSS mCRC": 0.480,
    },
    "tusamitamab": {
        "pTMB-high, no liver mets": 0.519,
        "DetermaIO IOOPT+": 0.473,
        "Immunoscore-IC-high": 0.361,
        "CEACAM5 ≥80% + IO-permissive": 0.519,
        "pTMB-high, liver mets": 0.477,
        "Unselected MSS mCRC": 0.490,
    },
    "STC-1010": {
        "pTMB-high, no liver mets": 0.8016,
        "DetermaIO IOOPT+": 0.8016,
        "Immunoscore-IC-high": 0.8016,
        "CEACAM5 ≥80% + IO-permissive": 0.8016,
        "pTMB-high, liver mets": 0.640,
        "Unselected MSS mCRC": 0.8016,
    },
}

BRENUS_SCENARIOS = [
    {
        "id": "B1",
        "title": "CO.26 Liver-Met Subgroup",
        "subtitle": "EC-07 Verified — PMC10698621 Table 2",
        "cancer_label": "MSS mCRC",
        "narrative": (
            "CO.26 tested durvalumab + tremelimumab vs. BSC in MSS mCRC. "
            "The ITT result was negative (OS HR 0.73, trend only). "
            "But the liver-met subgroup told a different story: "
            "patients WITHOUT liver mets had PFS HR=0.54 (Pint=0.02 — SIGNIFICANT). "
            "Patients WITH liver mets had PFS HR=1.39 (harm). "
            "CrisPRO's liver-met toggle captures this split using the EC-07 verified values."
        ),
        "published_result": "PFS HR=0.54 (no-LM, Pint=0.02) vs HR=1.39 (with-LM)",
        "published_doi": "10.1200/JCO.2023.41.16_suppl.3561",
        "pmcid": "PMC10698621",
        "responder_profile": "No liver mets, IO-permissive",
        "non_responder_profile": "Liver mets present",
        "responder_fit": 0.7845,  # recomputed 2026-06-09 (CO.26 fit_A corrected from 0.7751)
        "non_responder_fit": 0.371,
        "delta": "+0.414",  # recomputed 2026-06-09 (was +0.404; CO.26 responder_fit corrected)
        "verdict": "CALLED",
        "claim_type": "SOURCED [EC-07, PMC10698621]",
    },
    {
        "id": "B2",
        "title": "CARMEN-LC03 CEACAM5 ≥80% Subgroup",
        "subtitle": "CR-03 — IASLC 2024 WCLC (post-hoc, not pre-specified)",
        "cancer_label": "NSCLC → CRC extrapolation",
        "narrative": (
            "CARMEN-LC03 tested tusamitamab ravtansine in NSCLC. "
            "The ITT result was negative (PFS HR=1.14, P=0.8204). "
            "The CEACAM5 ≥80% subgroup showed OS HR=0.71 (trend). "
            "The CEACAM5 50–79% subgroup showed PFS HR=1.38 (numerically harmful). "
            "This is the gate architecture argument: the ≥50% gate is too broad. "
            "NOTE: This is NSCLC data — CRC-specific ≥80% prevalence is OA-08 (unconfirmed)."
        ),
        "published_result": "ITT PFS HR=1.14 (P=0.82) vs ≥80% OS HR=0.71 (trend, post-hoc)",
        "published_doi": "10.1016/j.jtho.2024.09.1432",
        "pmcid": "IASLC 2024 WCLC",
        "responder_profile": "CEACAM5 ≥80% (NSCLC)",
        "non_responder_profile": "CEACAM5 50–79% (NSCLC)",
        "responder_fit": 0.7904,
        "non_responder_fit": 0.6494,  # recomputed 2026-06-09 (AtezoTRIBE fit_A corrected from 0.6297)
        "delta": "+0.141",  # recomputed 2026-06-09 (was +0.161; AtezoTRIBE non_responder_fit corrected)
        "verdict": "CALLED (post-hoc)",
        "claim_type": "SOURCED [CR-01, CR-02, CR-03]",
    },
    {
        "id": "B3",
        "title": "pTMB ≥28 in CO.26",
        "subtitle": "CR-16 — Loree et al. PMID 38727700",
        "cancer_label": "MSS mCRC",
        "narrative": (
            "In the CO.26 trial, patients with pTMB ≥28 had OS HR=0.34 (95% CI 0.16–0.73). "
            "This is a 66% reduction in death risk in a trial that was negative in the ITT. "
            "pTMB ≥28 prevalence in MSS mCRC is ~10% (CR-15). "
            "This is the SAR445877 IO-permissive gate argument: "
            "the right patients exist, they're just not being selected."
        ),
        "published_result": "pTMB ≥28: OS HR=0.34 (95% CI 0.16–0.73) vs ITT OS HR=0.73",
        "published_doi": "10.1200/JCO.23.02558",
        "pmcid": "PMID 38727700",
        "responder_profile": "pTMB ≥28 (~10% of MSS mCRC)",
        "non_responder_profile": "pTMB <28 (~90% of MSS mCRC)",
        "responder_fit": 0.880,
        "non_responder_fit": 0.320,
        "delta": "+0.560",
        "verdict": "CALLED",
        "claim_type": "SOURCED [CR-15, CR-16, PMID 38727700]",
    },
]

# ─────────────────────────────────────────────────────────────────────────────
# Sanofi executive payload — persona-specific arguments + archetype table
# Sourced from ceacam5_sanofi_executive_payload_v2.json (v2.1, 2026-06-03)
# and crispro_sanofi_pitch_deck_audited_v2.json (v2, 2026-06-03)
# ─────────────────────────────────────────────────────────────────────────────

SANOFI_PERSONAS = {
    "bd": {
        "id": "bd",
        "label": "Business Development",
        "their_question": "What is the IP position, what can we replicate internally, and what is the licensing structure?",
        "primary_concern": "Competitive moat, deal structure",
        "highlighted_metrics": ["fit_score", "comparator_rank", "enrollment_pool"],
        "key_numbers": [
            {
                "label": "STC-1010 Mechanism Fit Score",
                "value": "0.8016",
                "context": "#1 of 8 comparator trials — highest mechanism alignment in MSS CRC IO landscape",
                "claim_type": "COMPUTED [PATH A locked 2026-04-28]",
            },
            {
                "label": "Current Sanofi Gate (≥50%) ORR",
                "value": "7–8%",
                "context": "CARMEN-LC03 ITT — the gate that failed. The ≥80% + IO-permissive gate projects 35–45% ORR.",
                "claim_type": "SOURCED [CR-01]",
            },
            {
                "label": "What Sanofi cannot replicate without licensing",
                "value": "PATH A algorithm + cross-trial assay coverage map + MSS CRC archetype table",
                "context": "Individual biomarkers (pTMB, Immunoscore, CEACAM5 IHC) are commercially available. The integration architecture is not.",
                "claim_type": "INFERRED",
            },
        ],
        "questions": [
            "How does STC-1010's mechanism score compare to Sanofi's own CEACAM5 assets at this gate?",
            "What's the enrollment pool at the gate Sanofi is currently using (≥50%)?",
            "If the anti-correlation assumption is true, does the deal thesis survive?",
        ],
        "deal_structure": {
            "bundle_1": {
                "label": "IST Support",
                "what_sanofi_gets": "Retrospective IHC study (50 CRC patients) + Phase 2 protocol design",
                "value": "$500K–$1.5M sponsored research agreement",
                "timeline": "Immediately executable",
            },
            "bundle_2": {
                "label": "Platform License",
                "what_sanofi_gets": "IP license to PATH A algorithm + MSS CRC archetype table + two-gate system for all three CEACAM5 assets",
                "value": "$3–8M upfront + $30–80M milestones + 2–4% royalty on CDx revenue",
                "timeline": "On signing",
            },
            "bundle_3": {
                "label": "CDx Co-development",
                "what_sanofi_gets": "CDx validated for CEACAM5 ≥80% + IO permissiveness; Sanofi funds; CrisPRO retains IP for competitor licensing",
                "value": "$1–3M per program + royalty from competitor licensing",
                "timeline": "Phase 2 success",
            },
        },
        "claim_type": "SOURCED [CR-29]; deal terms OPEN ASSUMPTION OA-18, OA-25",
    },
    "cmo": {
        "id": "cmo",
        "label": "Chief Medical Officer",
        "their_question": "What is the scientific basis for the two-gate system, and what are the weakest links?",
        "primary_concern": "Patient selection validity, ORR, safety",
        "highlighted_metrics": ["orr_projection", "gate_breakdown", "structural_contradiction"],
        "key_numbers": [
            {
                "label": "Why one gate failed",
                "value": "CEACAM5 IHC measures protein presence — not immune readiness",
                "context": "The single gate answered one of four questions. It did not select for IO permissiveness, glycocalyx accessibility, or TME architecture.",
                "claim_type": "SOURCED [CR-01, CR-02, CR-24]",
            },
            {
                "label": "ρ(CEACAM5 IHC, cCEA)",
                "value": "0.43",
                "context": "IHC and circulating CEA are measuring different things. Both gates are needed. Neither is redundant. [NSCLC proxy — CRC unknown]",
                "claim_type": "SOURCED [CR-26]",
            },
            {
                "label": "CEACAM5 ≥80% prevalence in CRC",
                "value": "~28% (OPEN ASSUMPTION OA-08)",
                "context": "Derived from NSCLC enrollment data — the weakest number in the dataset. The $150K IHC study fixes this.",
                "claim_type": "OPEN ASSUMPTION OA-08",
            },
        ],
        "weakest_links": [
            {
                "attack": "CEACAM5 ≥80% prevalence in CRC is unknown",
                "our_number": "~28% (OA-08 — NSCLC proxy, CRC unconfirmed)",
                "fix": "50-patient retrospective IHC study on archival CRC tissue. ~$150K. 3 months.",
            },
            {
                "attack": "Cross-cluster independence (CEACAM5-high × IO-permissive) is assumed, not proven in CRC",
                "our_number": "OPEN ASSUMPTION OA-26 — extrapolated from NSCLC",
                "fix": "Same retrospective study: co-stain CEACAM5 IHC with Immunoscore. One study fixes both weaknesses.",
            },
            {
                "attack": "Projected ORR 35–45% is not prospectively validated",
                "our_number": "OPEN ASSUMPTION OA-05 — derived from cCEA ≥100 ORR 41.7% (prospective) + ≥80% IHC OS HR=0.71 (post-hoc)",
                "fix": "Phase 2 protocol design (40–60 patients, two-gate, ORR primary endpoint).",
            },
        ],
        "questions": [
            "What is the scientific basis for the two-gate system, and what are the weakest links?",
            "Which biomarkers are missing from the current protocol that would explain a negative result?",
            "Is the EU clinical hold on tusamitamab a signal about the CEACAM5 target or the modality?",
        ],
        "claim_type": "SOURCED [CR-01, CR-02, CR-03, CR-24, CR-26]; OA-08, OA-26",
    },
    "cfo": {
        "id": "cfo",
        "label": "CFO / Investor",
        "their_question": "What does this cost, what is the return, and what happens if we do nothing?",
        "primary_concern": "Asset survival, trial economics",
        "highlighted_metrics": ["cost_per_responder", "enrollment_pool", "orr_projection"],
        "key_numbers": [
            {
                "label": "Current gate cost per responder",
                "value": "$312K–$714K",
                "context": "CEACAM5 ≥50% gate, 7–8% ORR, $25K–$50K per patient. For every 100 patients enrolled, ~92 receive treatment with no benefit.",
                "claim_type": "COMPUTED [CR-01, CR-09, OA-08a]",
            },
            {
                "label": "Two-gate cost per responder",
                "value": "$56K–$143K",
                "context": "5–12× reduction vs. current gate. This is the trial economics argument — secondary to asset survival.",
                "claim_type": "COMPUTED [CR-09, OA-05, OA-08, OA-09]",
            },
            {
                "label": "The binary for the CFO",
                "value": "Option A: single-gate Phase 2 → 7% ORR → asset dead → $180M+ written off. Option B: $150K IHC study first → two-gate Phase 2 → 35–45% ORR projected → asset lives.",
                "context": "The cost of Option B vs. Option A is $150K + $2–3M Phase 2 spend. The cost of Option A failure is the franchise.",
                "claim_type": "SOURCED [CR-27, CR-28]; ORR projections OPEN ASSUMPTION OA-05",
            },
        ],
        "questions": [
            "What does it cost to run the single-gate Phase 2 vs. the two-gate Phase 2 — and what happens if the single-gate fails again?",
            "At what enrollment pool size does Phase 2 become uneconomical?",
            "What's the cost per responder at the ≥80% gate vs. the ≥50% gate?",
        ],
        "gate_economics": {
            "current_gate": {
                "gate": "CEACAM5 ≥50%",
                "n_per_year": 23375,
                "orr": "7–8%",
                "cost_per_responder": "$312K–$714K",
                "claim_type": "COMPUTED [CR-01, CR-09, OA-08a]",
            },
            "two_gate": {
                "gate": "CEACAM5 ≥80% + IO-permissive (independent)",
                "n_per_year": 4582,
                "orr": "35–45%",
                "cost_per_responder": "$56K–$143K",
                "reduction": "5–12×",
                "claim_type": "COMPUTED [CR-09, OA-05, OA-08, OA-09]",
            },
            "anti_correlated": {
                "gate": "CEACAM5 ≥80% + IO-permissive (anti-correlated)",
                "n_per_year": 2749,
                "orr": "35–45%",
                "cost_per_responder": "$56K–$143K",
                "note": "Pool halved but economics still favorable if ORR holds",
                "claim_type": "COMPUTED [OA-05, OA-08, OA-10, OA-26]",
            },
        },
        "claim_type": "SOURCED [CR-09, CR-27, CR-28]; projections OPEN ASSUMPTION OA-05, OA-18, OA-25",
    },
    "scientist": {
        "id": "scientist",
        "label": "Translational Scientist",
        "their_question": "What is the mechanism, what are the biomarker dependencies, and what experiments resolve the open assumptions?",
        "primary_concern": "Mechanism validity, biomarker biology, open assumptions",
        "highlighted_metrics": ["fit_score", "structural_contradiction", "gate_breakdown"],
        "key_numbers": [
            {
                "label": "ρ(CEACAM5 IHC, cCEA) — NSCLC",
                "value": "0.43",
                "context": "IHC measures protein presence; cCEA measures functional shedding. A patient with IHC ≥80% but cCEA <100 has CEACAM5 sequestered at intercellular junctions — the drug cannot reach it.",
                "claim_type": "SOURCED [CR-26]",
            },
            {
                "label": "CEACAM5-high × IO-permissive independence in CRC",
                "value": "OPEN ASSUMPTION OA-26",
                "context": "Independence is the scientific basis for the two-gate system. If correlated, one gate suffices. The CARMEN-LC03 failure proves they are not correlated in NSCLC. CRC data does not exist.",
                "claim_type": "OPEN ASSUMPTION OA-26",
            },
            {
                "label": "Structural contradiction",
                "value": "CEACAM5-high tumors trend immune-excluded (Zdrehus 2025 PROVISIONAL)",
                "context": "Applying the same CEACAM5 ≥80% gate to SAR445877 (IO-activating) and SAR445953 (ADC) optimizes the ADC and systematically starves the bispecific of the T-cells it needs. One gate. Two assets. One is being set up to fail.",
                "claim_type": "PROVISIONAL [Zdrehus 2025 TCGA-COAD]; SOURCED [Grasso 2018, Gonzalez-Exposito 2019]",
            },
        ],
        "biomarker_dependency_map": {
            "ceacam5_cluster": {
                "description": "Antigen availability — what the drug targets",
                "pairs": [
                    {"pair": "CEACAM5 IHC ↔ cCEA", "rho": 0.43, "relationship": "Weakly dependent", "claim_type": "SOURCED [CR-26]"},
                    {"pair": "cCEA ↔ cCEACAM5", "rho": 0.99, "relationship": "Near-perfectly dependent", "claim_type": "SOURCED [CR-26]"},
                    {"pair": "CEACAM5 IHC archived ↔ fresh", "relationship": "Unreliable after prior therapy", "claim_type": "SOURCED [CR-24]"},
                ],
            },
            "io_cluster": {
                "description": "Immune readiness — what amplifies the response",
                "pairs": [
                    {"pair": "pTMB ≥28 ↔ Immunoscore-IC-high", "relationship": "Partially independent — potential vs realized immunity", "claim_type": "SOURCED [CR-15, CR-18]"},
                    {"pair": "Liver mets ↔ IO permissiveness", "relationship": "Liver mets suppress IO permissiveness", "claim_type": "SOURCED [EC-07, PMC10698621]"},
                ],
            },
            "cross_cluster": {
                "pair": "CEACAM5-high ↔ IO-permissive",
                "nsclc": "Largely independent — SOURCED (CARMEN-LC03 exploratory)",
                "crc": "OPEN ASSUMPTION OA-26 — no CRC-specific data",
                "why_it_matters": "Independence is the scientific basis for the two-gate system. The trial failure proves they are not correlated in NSCLC.",
            },
        },
        "questions": [
            "Why does the model score STC-1010 higher than SAR445877 despite both being IO-dominant?",
            "What does the anti-correlation knob actually represent biologically — is it WNT/β-catenin or something else?",
            "Which of the 4 missing assay markers (GzmB, TOX, MHC-I, TLS) would you prioritize if you could only run one?",
        ],
        "claim_type": "SOURCED [CR-15, CR-16, CR-17, CR-18, CR-26, EC-07]; PROVISIONAL [Zdrehus 2025]; OA-26",
    },
}

# Archetype table from crispro_sanofi_pitch_deck_audited_v2.json
ARCHETYPE_TABLE = [
    {
        "id": "A-01", "trial": "CO.26", "biomarker": "pTMB ≥28 mut/Mb (GuardantOMNI)",
        "n": 35, "observed_hr": "OS HR=0.34 (95% CI 0.16–0.73)", "endpoint": "OS",
        "zone": "Responder", "gate_2": "VERIFIED",
        "source": "Loree et al. Clin Cancer Res 2024 (PMID 38727700) [CR-16]",
    },
    {
        "id": "A-02", "trial": "CO.26", "biomarker": "pTMB <28 mut/Mb",
        "n": 128, "observed_hr": "OS HR=0.93", "endpoint": "OS",
        "zone": "Gap", "gate_2": "VERIFIED",
        "source": "Loree et al. Clin Cancer Res 2024 (PMID 38727700) [CR-16]",
    },
    {
        "id": "A-03", "trial": "CO.26", "biomarker": "Clonal pTMB ≥10.6 mut/Mb",
        "n": "NR", "observed_hr": "OS HR=0.10 (multivariate — NOT comparable to univariate HRs)", "endpoint": "OS",
        "zone": "Responder", "gate_2": "EXPLORATORY",
        "gate_2_note": "Multivariate HR — treat as hypothesis-generating only",
        "source": "Loree et al. Clin Cancer Res 2024 (PMID 38727700)",
    },
    {
        "id": "A-04", "trial": "CO.26", "biomarker": "Non-liver-met subgroup",
        "n": 53, "observed_hr": "PFS HR=0.54 (Pint=0.02 SIGNIFICANT); OS HR=0.65", "endpoint": "OS + PFS",
        "zone": "Responder", "gate_2": "VERIFIED",
        "zone_basis": "PFS HR=0.54 with significant interaction test (Pint=0.02) — strongest verified signal in dataset",
        "source": "EC-07 verified — PMC10698621 Table 2 [EC-07]",
    },
    {
        "id": "A-05", "trial": "CO.26", "biomarker": "Liver-met subgroup",
        "n": 127, "observed_hr": "PFS HR=1.39 (HARMFUL); OS HR=0.79", "endpoint": "OS + PFS",
        "zone": "Non-responder", "gate_2": "VERIFIED",
        "zone_basis": "PFS HR=1.39 (harmful direction) with significant interaction vs. no-LM (Pint=0.02)",
        "source": "EC-07 verified — PMC10698621 Table 2 [EC-07]",
    },
    {
        "id": "A-06", "trial": "AtezoTRIBE", "biomarker": "Immunoscore-IC-high (pMMR)",
        "n": 50, "observed_hr": "PFS HR~0.55", "endpoint": "PFS",
        "zone": "Responder", "gate_2": "VERIFIED",
        "source": "Antoniotti et al. Clin Cancer Res 2023",
    },
    {
        "id": "A-07", "trial": "AtezoTRIBE", "biomarker": "Immunoscore-IC-low (pMMR)",
        "n": 107, "observed_hr": "PFS HR~0.93", "endpoint": "PFS",
        "zone": "Gap", "gate_2": "VERIFIED",
        "source": "Antoniotti et al. Clin Cancer Res 2023",
    },
    {
        "id": "A-08", "trial": "AtezoTRIBE", "biomarker": "DetermaIO IOOPT+",
        "n": 16, "observed_hr": "PFS HR=0.10", "endpoint": "PFS",
        "zone": "Responder", "gate_2": "EXPLORATORY",
        "gate_2_note": "n=16 — underpowered. Exploratory, not pre-specified. Hypothesis-generating only.",
        "source": "PMID 39908699 [CR-17]",
    },
    {
        "id": "A-09", "trial": "IMblaze370", "biomarker": "PD-L1 IC2/3",
        "n": 183, "observed_hr": "OS HR=1.00", "endpoint": "OS",
        "zone": "Gate 2 Blocked", "gate_2": "FALSIFIED",
        "gate_2_note": "Phase III definitive negative — MEKi + atezolizumab mechanism invalidated in MSS CRC",
        "source": "Eng et al. Lancet Oncol 2019",
    },
    {
        "id": "A-10", "trial": "GVAX", "biomarker": "Anti-CEA Ab+ / PD-L1 upregulation",
        "n": 17, "observed_hr": "ORR=0%", "endpoint": "ORR",
        "zone": "Gate 2 Blocked", "gate_2": "FALSIFIED_ORR0",
        "gate_2_note": "ORR=0% despite pharmacodynamic activity (PD-L1 upregulation confirmed). Drug reached target — no clinical response.",
        "source": "Yarchoan et al. Cancer Med 2019",
    },
]

# ─────────────────────────────────────────────────────────────────────────────
# Gate math (pure Python, no DB)
# ─────────────────────────────────────────────────────────────────────────────

def _compute_gate_pool(
    ceacam5_threshold: float,
    io_stringency: float,
    liver_met: bool,
    anti_correlated: bool,
) -> dict:
    base = BASE_MSS_MCRC_US

    if ceacam5_threshold <= 0.0:
        pool = base
        ceacam5_label = "No CEACAM5 gate"
        ceacam5_claim = "SOURCED [CR-25]"
    elif ceacam5_threshold <= 0.50:
        pool = int(base * CEACAM5_50_FRAC)
        ceacam5_label = f"CEACAM5 ≥{int(ceacam5_threshold*100)}% (current Sanofi gate)"
        ceacam5_claim = "SOURCED [CR-01, OA-08a]"
    elif ceacam5_threshold <= 0.80:
        frac = CEACAM5_50_FRAC + (CEACAM5_80_FRAC - CEACAM5_50_FRAC) * ((ceacam5_threshold - 0.50) / 0.30)
        pool = int(base * frac)
        ceacam5_label = f"CEACAM5 ≥{int(ceacam5_threshold*100)}%"
        ceacam5_claim = "COMPUTED [OA-08] — NSCLC proxy, CRC unconfirmed"
    else:
        pool = int(base * CEACAM5_80_FRAC)
        ceacam5_label = "CEACAM5 ≥80% (high-expression gate)"
        ceacam5_claim = "COMPUTED [OA-08] — NSCLC proxy, CRC unconfirmed — WEAKEST NUMBER"

    if io_stringency <= 0.0:
        io_pool_frac = 1.0
        io_label = "No IO selection"
        io_claim = "N/A"
    elif io_stringency <= 0.33:
        io_pool_frac = 0.35
        io_label = "Loose IO enrichment (Immunoscore-IC-high)"
        io_claim = "OPEN ASSUMPTION OA-09"
    elif io_stringency <= 0.66:
        io_pool_frac = IMMUNOSCORE_HIGH_FRAC
        io_label = "Moderate IO enrichment (Immunoscore-IC-high, strict)"
        io_claim = "OPEN ASSUMPTION OA-09"
    else:
        io_pool_frac = PTMB_HIGH_FRAC
        io_label = "Strict IO enrichment (pTMB ≥28 / DetermaIO IOOPT+)"
        io_claim = "SOURCED [CR-15]"

    if io_stringency > 0.0:
        if anti_correlated:
            rho_bear = 0.40
            joint_frac = io_pool_frac * (1.0 - rho_bear)
            pool = int(pool * joint_frac)
            correlation_label = "ANTI-CORRELATED (bear case ρ=0.40)"
            correlation_claim = "OPEN ASSUMPTION OA-26 — CRC ρ unknown; NSCLC ρ=0.43 [CR-26]"
            structural_contradiction = True
        else:
            pool = int(pool * io_pool_frac)
            correlation_label = "INDEPENDENT (optimistic assumption)"
            correlation_claim = "OPEN ASSUMPTION OA-26 — independence unconfirmed in CRC"
            structural_contradiction = False
    else:
        correlation_label = "N/A"
        correlation_claim = "N/A"
        structural_contradiction = False

    if liver_met and io_stringency > 0.0:
        pool = int(pool * 0.30)
        liver_label = "Liver mets present — IO suppressed (EC-07 verified, PFS Pint=0.02)"
        liver_claim = "SOURCED [EC-07, PMC10698621]"
    elif liver_met:
        pool = int(pool * 0.706)
        liver_label = "Liver mets present (70.6% of MSS mCRC)"
        liver_claim = "SOURCED [EC-07, PMC10698621]"
    else:
        liver_label = "No liver mets"
        liver_claim = "SOURCED [EC-07, PMC10698621]"

    if pool >= 3000:
        viability = "VIABLE"
        viability_color = "green"
    elif pool >= 500:
        viability = "MARGINAL"
        viability_color = "amber"
    else:
        viability = "FATAL — trial not launchable at this gate"
        viability_color = "red"

    return {
        "n_per_year": max(0, pool),
        "viability": viability,
        "viability_color": viability_color,
        "gate_breakdown": {
            "ceacam5": {"label": ceacam5_label, "claim_type": ceacam5_claim},
            "io": {"label": io_label, "claim_type": io_claim},
            "correlation": {"label": correlation_label, "claim_type": correlation_claim},
            "liver_met": {"label": liver_label, "claim_type": liver_claim},
        },
        "structural_contradiction": structural_contradiction,
    }


def _compute_orr(ceacam5_threshold: float, io_stringency: float) -> dict:
    if io_stringency > 0.5 and ceacam5_threshold >= 0.80:
        return {"low": ORR_TWO_GATE[0], "high": ORR_TWO_GATE[1],
                "label": "Two-gate projected ORR",
                "claim_type": "OPEN ASSUMPTION OA-05 — no Phase 2 data in this population"}
    elif ceacam5_threshold >= 0.80:
        return {"low": ORR_CEACAM5_80[0], "high": ORR_CEACAM5_80[1],
                "label": "CEACAM5 ≥80% subgroup ORR (post-hoc trend)",
                "claim_type": "COMPUTED [CR-03] — post-hoc, not pre-specified; NSCLC data"}
    elif ceacam5_threshold >= 0.50:
        return {"low": ORR_CEACAM5_50[0], "high": ORR_CEACAM5_50[1],
                "label": "CEACAM5 ≥50% ORR (CARMEN-LC03 ITT)",
                "claim_type": "SOURCED [CR-01]"}
    else:
        return {"low": ORR_UNSELECTED[0], "high": ORR_UNSELECTED[1],
                "label": "Unselected MSS mCRC ORR",
                "claim_type": "SOURCED — historical IO in unselected MSS mCRC"}


def _compute_cost_per_responder(pool_n: int, orr: dict) -> dict:
    if pool_n == 0 or orr["low"] == 0:
        return {"low": None, "high": None, "label": "Cannot compute — pool is zero", "claim_type": "N/A"}
    cost_low = int(PHASE2_COST_PER_PT_LOW / orr["high"])
    cost_high = int(PHASE2_COST_PER_PT_HIGH / orr["low"])
    return {
        "low": cost_low, "high": cost_high,
        "label": f"${cost_low:,}–${cost_high:,} per responder",
        "claim_type": "COMPUTED [CR-09, " + orr["claim_type"].split("[")[-1].rstrip("]") + "]",
    }


def _get_archetype(ceacam5_threshold: float, io_stringency: float, liver_met: bool) -> str:
    if liver_met and io_stringency > 0.5:
        return "pTMB-high, liver mets"
    elif io_stringency > 0.66:
        return "DetermaIO IOOPT+"
    elif io_stringency > 0.33:
        return "Immunoscore-IC-high"
    elif ceacam5_threshold >= 0.80 and io_stringency > 0.0:
        return "CEACAM5 ≥80% + IO-permissive"
    elif io_stringency > 0.0:
        return "pTMB-high, no liver mets"
    else:
        return "Unselected MSS mCRC"


# ─────────────────────────────────────────────────────────────────────────────
# Narrative generator — pure Python, no LLM, deterministic
# Sourced from ceacam5_sanofi_executive_payload_v2.json (v2.1, 2026-06-03)
# ─────────────────────────────────────────────────────────────────────────────

def _build_narrative(
    pool: dict,
    orr: dict,
    cost: dict,
    fit_a: float,
    asset: str,
    request: "GateSimulateRequest",
) -> dict:
    """
    Generate plain-English explanations of the current gate configuration.
    All sentences are threshold-based — no LLM, no hallucination.
    Returns a dict with: headline, pool_sentence, orr_sentence, cost_sentence,
    fit_sentence, risk_sentence (nullable), bottom_line.
    """
    n = pool["n_per_year"]
    viability = pool["viability"]
    orr_lo = int(orr["low"] * 100)
    orr_hi = int(orr["high"] * 100)
    cost_lo = cost.get("low")
    cost_hi = cost.get("high")
    sc = pool["structural_contradiction"]

    # ── Pool sentence ──────────────────────────────────────────────────────
    if n < 500:
        pool_sentence = (
            f"At this gate, fewer than 500 patients per year in the US qualify — "
            f"not enough to run a Phase 2 trial. The gate is too tight."
        )
        pool_tier = "fatal"
    elif n < 2000:
        pool_sentence = (
            f"Roughly {n:,} patients per year qualify — enough for a Phase 2, "
            f"but enrollment will be slow and site selection is critical."
        )
        pool_tier = "tight"
    elif n < 5000:
        pool_sentence = (
            f"About {n:,} patients per year qualify — a workable Phase 2 enrollment pool."
        )
        pool_tier = "viable"
    else:
        pool_sentence = (
            f"Over {n:,} patients per year qualify — enrollment should be fast, "
            f"but the gate may be too wide to enrich for responders."
        )
        pool_tier = "wide"

    # ── ORR sentence ───────────────────────────────────────────────────────
    if orr_hi < 5:
        orr_sentence = (
            f"The projected response rate of {orr_lo}–{orr_hi}% is in the range of historical IO "
            f"in unselected MSS CRC — this gate is not enriching for responders."
        )
        orr_tier = "low"
    elif orr_hi < 15:
        orr_sentence = (
            f"The projected response rate of {orr_lo}–{orr_hi}% is modest — better than unselected, "
            f"but below the threshold where Phase 2 economics work well."
        )
        orr_tier = "modest"
    elif orr_hi < 35:
        orr_sentence = (
            f"The projected response rate of {orr_lo}–{orr_hi}% is meaningful — "
            f"this is the range where a Phase 2 can generate a compelling signal."
        )
        orr_tier = "meaningful"
    else:
        orr_sentence = (
            f"The projected response rate of {orr_lo}–{orr_hi}% is strong — "
            f"this is the two-gate target range, where the trial has a real chance "
            f"of producing a registrational signal."
        )
        orr_tier = "strong"

    # ── Cost sentence ──────────────────────────────────────────────────────
    if cost_lo is None:
        cost_sentence = "Cost per responder cannot be computed — the enrollment pool is zero."
        cost_tier = "fatal"
    elif cost_hi > 500_000:
        cost_sentence = (
            f"At ${cost_lo:,}–${cost_hi:,} per responder, Phase 2 economics are difficult to justify — "
            f"the gate is too wide and most enrolled patients will not respond."
        )
        cost_tier = "poor"
    elif cost_hi > 150_000:
        cost_sentence = (
            f"At ${cost_lo:,}–${cost_hi:,} per responder, trial economics are in a workable range for a Phase 2."
        )
        cost_tier = "ok"
    else:
        cost_sentence = (
            f"At ${cost_lo:,}–${cost_hi:,} per responder, trial economics are strong — "
            f"this gate is efficient."
        )
        cost_tier = "strong"

    # ── Fit sentence (asset-specific) ──────────────────────────────────────
    if asset == "SAR445877":
        asset_label = "SAR445877 (PD1×IL-15)"
        if request.liver_met and request.io_stringency > 0.0:
            fit_sentence = (
                f"SAR445877 scores {fit_a:.4f} at this gate — but liver mets suppress IO permissiveness "
                f"(EC-07 verified, PFS Pint=0.02). This gate is selecting patients whose TME cannot "
                f"support a PD-1×IL-15 response."
            )
        elif fit_a >= 0.85:
            fit_sentence = (
                f"SAR445877 scores {fit_a:.4f} — excellent mechanism alignment. "
                f"The IO axis dominates, and this gate selects IO-permissive tumors that match "
                f"the PD-1×IL-15 mechanism."
            )
        elif fit_a >= 0.75:
            fit_sentence = (
                f"SAR445877 scores {fit_a:.4f} — good mechanism alignment. "
                f"The IO axis is well-matched, with some dilution from non-IO dimensions."
            )
        else:
            fit_sentence = (
                f"SAR445877 scores {fit_a:.4f} — moderate alignment. "
                f"The gate is not fully optimized for the PD-1×IL-15 mechanism."
            )
    elif asset == "SAR445953":
        asset_label = "SAR445953 (CEACAM5×CD3)"
        if fit_a >= 0.75:
            fit_sentence = (
                f"SAR445953 scores {fit_a:.4f} — good alignment. "
                f"This asset needs CEACAM5 target density (ADC mechanism), "
                f"and this gate selects for high-expression tumors."
            )
        else:
            fit_sentence = (
                f"SAR445953 scores {fit_a:.4f} — moderate alignment. "
                f"The CEACAM5 gate is necessary but the IO permissiveness gate "
                f"may be over-restricting the ADC population."
            )
    elif asset == "tusamitamab":
        asset_label = "Tusamitamab (ADC)"
        fit_sentence = (
            f"Tusamitamab scores {fit_a:.4f}. Note: this asset is under EU clinical hold "
            f"in France, Spain, Sweden, and Netherlands as of March 2026. "
            f"Mechanism alignment is secondary to the regulatory status."
        )
    else:  # STC-1010
        asset_label = "STC-1010 / BreAK CRC-001"
        if fit_a >= 0.80:
            fit_sentence = (
                f"STC-1010 scores {fit_a:.4f} — the highest mechanism fit in the comparator landscape. "
                f"The IO axis (0.70) is the dominant dimension, and this gate selects "
                f"IO-permissive tumors that match the haptenated vaccine mechanism."
            )
        else:
            fit_sentence = (
                f"STC-1010 scores {fit_a:.4f} at this gate. "
                f"The IO axis is the dominant mechanism — liver mets suppress the IO response "
                f"and reduce the fit score significantly."
            )

    # ── Risk sentence ──────────────────────────────────────────────────────
    risk_sentence = None
    if asset == "tusamitamab":
        risk_sentence = (
            "EU CLINICAL HOLD: tusamitamab sonditecan is under clinical hold in France, Spain, "
            "Sweden, and Netherlands as of March 6, 2026. This affects European trial sites. [SOURCED CR-27]"
        )
    elif sc and asset in ("SAR445877", "STC-1010"):
        risk_sentence = (
            "Anti-correlation warning: if CEACAM5-high and IO-permissive are anti-correlated in CRC, "
            "this gate is selecting the worst-responding patients for an IO-activating agent — "
            "tumors with the target but without the immune substrate to respond. "
            "The $150K IHC study resolves this. [OPEN ASSUMPTION OA-26]"
        )
    elif request.liver_met and request.io_stringency > 0.0 and asset == "SAR445877":
        risk_sentence = (
            "Liver mets suppress IO permissiveness (EC-07 verified, PFS Pint=0.02). "
            "SAR445877 is an IO-activating agent — this gate may be selecting patients "
            "whose TME cannot support a PD-1×IL-15 response. [SOURCED EC-07, PMC10698621]"
        )

    # ── Headline ───────────────────────────────────────────────────────────
    if pool_tier == "fatal":
        headline = (
            "This gate configuration produces no viable enrollment pool — "
            "the trial cannot launch at this threshold."
        )
    elif pool_tier == "tight" and orr_tier == "strong":
        headline = (
            "Tight patient pool but strong projected response — "
            "this gate is viable if the anti-correlation assumption holds."
        )
    elif pool_tier in ("viable", "tight") and orr_tier == "strong":
        headline = (
            "This is the target configuration: enough patients, strong projected response, "
            "and favorable trial economics."
        )
    elif pool_tier == "wide" and orr_tier in ("low", "modest"):
        headline = (
            "Large pool but low projected response — "
            "widening the gate is enrolling patients who are unlikely to benefit."
        )
    elif orr_tier == "low":
        headline = (
            "This gate is not enriching for responders — "
            "the projected response rate matches unselected MSS CRC."
        )
    elif sc:
        headline = (
            "Structural contradiction detected: this gate may be selecting "
            "the wrong patients for this mechanism."
        )
    else:
        headline = (
            f"Adjusting this gate changes the tradeoff between enrollment speed "
            f"({n:,} patients/yr) and response probability ({orr_lo}–{orr_hi}%)."
        )

    # ── Bottom line ────────────────────────────────────────────────────────
    if pool_tier == "fatal":
        bottom_line = (
            "This gate is not launchable. Widen the CEACAM5 threshold or remove the IO gate."
        )
    elif pool_tier == "tight" and orr_tier == "strong":
        bottom_line = (
            "Viable but fragile — the anti-correlation assumption is the existential risk. "
            "Run the $150K IHC study before committing to this gate."
        )
    elif pool_tier in ("viable", "tight") and orr_tier == "strong":
        bottom_line = (
            "This is the target configuration. The open question is whether the pool estimate "
            "holds in CRC — that requires the retrospective IHC study (OA-08, OA-26)."
        )
    elif pool_tier == "wide" and orr_tier in ("low", "modest"):
        bottom_line = (
            "This gate is enrolling patients who are unlikely to respond. "
            "Tighten the CEACAM5 threshold and add an IO permissiveness gate."
        )
    else:
        bottom_line = (
            f"The gate produces {n:,} patients/yr with {orr_lo}–{orr_hi}% projected ORR. "
            f"Tighten the IO gate to improve response probability at the cost of pool size."
        )

    return {
        "headline": headline,
        "pool_sentence": pool_sentence,
        "orr_sentence": orr_sentence,
        "cost_sentence": cost_sentence,
        "fit_sentence": fit_sentence,
        "risk_sentence": risk_sentence,
        "bottom_line": bottom_line,
    }


# ─────────────────────────────────────────────────────────────────────────────
# Pydantic models
# ─────────────────────────────────────────────────────────────────────────────

class GateSimulateRequest(BaseModel):
    asset: str = Field("SAR445877")
    ceacam5_threshold: float = Field(0.50, ge=0.0, le=1.0)
    io_stringency: float = Field(0.0, ge=0.0, le=1.0)
    liver_met: bool = Field(False)
    anti_correlated: bool = Field(False)

    @validator("asset")
    def validate_asset(cls, v):
        valid = {"SAR445877", "SAR445953", "tusamitamab", "STC-1010"}
        if v not in valid:
            raise ValueError(f"asset must be one of {valid}")
        return v


# ─────────────────────────────────────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────────────────────────────────────

@router.get("/scenarios")
async def get_scenarios():
    return {"scenarios": BRENUS_SCENARIOS, "ruo_disclaimer": "Research Use Only — Not for Clinical Decision Making"}


@router.post("/gate-simulate")
async def gate_simulate(request: GateSimulateRequest):
    pool = _compute_gate_pool(request.ceacam5_threshold, request.io_stringency, request.liver_met, request.anti_correlated)
    orr = _compute_orr(request.ceacam5_threshold, request.io_stringency)
    cost = _compute_cost_per_responder(pool["n_per_year"], orr)
    archetype = _get_archetype(request.ceacam5_threshold, request.io_stringency, request.liver_met)
    asset_scores = ASSET_FIT_SCORES.get(request.asset, {})
    fit_a = asset_scores.get(archetype, asset_scores.get("Unselected MSS mCRC", 0.0))

    narrative = _build_narrative(pool, orr, cost, fit_a, request.asset, request)

    sc_message = None
    if pool["structural_contradiction"] and request.asset in ("SAR445877", "STC-1010"):
        sc_message = (
            f"WARNING: CEACAM5 ≥{int(request.ceacam5_threshold*100)}% gate + IO-permissive gate "
            f"may be anti-correlated in CRC (Zdrehus 2025 PROVISIONAL). "
            f"If CEACAM5-high tumors are IO-silent, this gate selects the worst-responding patients "
            f"for an IO-activating agent. The $150K IHC study resolves this. "
            f"[OPEN ASSUMPTION OA-26 — CRC ρ unknown]"
        )
    elif pool["structural_contradiction"]:
        sc_message = (
            f"NOTE: Anti-correlated assumption applied. "
            f"Enrollment pool reduced by ρ-correction (bear case ρ=0.40). "
            f"[OPEN ASSUMPTION OA-26]"
        )

    eu_hold_warning = None
    if request.asset == "tusamitamab":
        eu_hold_warning = (
            "EU CLINICAL HOLD: tusamitamab sonditecan is under clinical hold in France, Spain, "
            "Sweden, and Netherlands as of March 6, 2026. [SOURCED CR-27]"
        )

    return {
        "asset": request.asset,
        "archetype": archetype,
        "enrollment_pool": {
            "n_per_year": pool["n_per_year"],
            "viability": pool["viability"],
            "viability_color": pool["viability_color"],
            "gate_breakdown": pool["gate_breakdown"],
            "claim_type": "COMPUTED [CR-25, OA-08, OA-09, OA-26, CR-15, EC-07]",
        },
        "orr_projection": orr,
        "cost_per_responder": cost,
        "fit_score": {
            "fit_A": round(fit_a, 4),
            "archetype": archetype,
            "claim_type": "COMPUTED [PATH A locked 2026-04-28]",
        },
        "narrative": narrative,
        "structural_contradiction": {"active": pool["structural_contradiction"], "message": sc_message},
        "eu_hold_warning": eu_hold_warning,
        "ruo_disclaimer": "Research Use Only — Not for Clinical Decision Making",
    }


@router.get("/comparators")
async def get_comparators():
    return {
        "p_vector": P_VECTOR,
        "p_norm": P_NORM,
        "comparators": COMPARATORS,
        "claim_type": "COMPUTED [block4_8d_path_matrix_v2.csv, recomputed 2026-06-02]",
        "ruo_disclaimer": "Research Use Only — Not for Clinical Decision Making",
    }


@router.get("/sanofi-payload")
async def get_sanofi_payload():
    """
    Persona-specific executive arguments + archetype table.
    Sourced from ceacam5_sanofi_executive_payload_v2.json (v2.1, 2026-06-03)
    and crispro_sanofi_pitch_deck_audited_v2.json (v2, 2026-06-03).
    Research Use Only — Not for Clinical Decision Making.
    """
    return {
        "personas": SANOFI_PERSONAS,
        "archetype_table": ARCHETYPE_TABLE,
        "gate_economics_summary": {
            "base_mss_mcrc_us_per_year": BASE_MSS_MCRC_US,
            "base_source": "SEER 2024; 85% MSS fraction — SOURCED [CR-25]",
            "gates": [
                {"gate": "All MSS mCRC (no selection)", "n_per_year": 46750, "orr": "3–5%", "claim_type": "SOURCED [CR-25]"},
                {"gate": "CEACAM5 ≥50% (current Sanofi gate)", "n_per_year": 23375, "orr": "7–8%", "cost_per_responder": "$312K–$714K", "claim_type": "COMPUTED [CR-01, CR-09, OA-08a]"},
                {"gate": "CEACAM5 ≥80% only", "n_per_year": 13090, "orr": "15–20%", "claim_type": "COMPUTED [CR-03, OA-08]", "caveat": "OA-08: 28% prevalence from NSCLC — weakest number"},
                {"gate": "CEACAM5 ≥80% + IO-permissive (independent)", "n_per_year": 4582, "orr": "35–45%", "cost_per_responder": "$56K–$143K", "reduction": "5–12×", "claim_type": "COMPUTED [OA-05, OA-08, OA-09, OA-26]"},
                {"gate": "CEACAM5 ≥80% + IO-permissive (anti-correlated)", "n_per_year": 2749, "orr": "35–45%", "claim_type": "COMPUTED [OA-05, OA-08, OA-10, OA-26]", "note": "Bear case — pool halved if CEACAM5-high and IO-permissive are anti-correlated in CRC"},
            ],
        },
        "ruo_disclaimer": "Research Use Only — Not for Clinical Decision Making",
        "source_files": [
            "ceacam5_sanofi_executive_payload_v2.json v2.1 (2026-06-03)",
            "crispro_sanofi_pitch_deck_audited_v2.json v2 (2026-06-03)",
        ],
    }


@router.get("/health")
async def health():
    return {
        "status": "ok",
        "router": "ceacam5_demo",
        "endpoints": ["/api/ceacam5/scenarios", "/api/ceacam5/gate-simulate", "/api/ceacam5/comparators", "/api/ceacam5/sanofi-payload"],
        "ruo_disclaimer": "Research Use Only — Not for Clinical Decision Making",
    }
```

## 18. Sanofi Pitch Deck Audited v2
```json
```

## 19. Sanofi Outreach Email

## 20. Verba DocumentExplorer.tsx
```tsx
```

## 21. Verba NavbarComponent.tsx
```tsx
```

## AUDIT COMPLETE
