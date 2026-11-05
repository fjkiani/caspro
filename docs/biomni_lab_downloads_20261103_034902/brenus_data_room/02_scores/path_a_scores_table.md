# PATH A Scores — Comparator Trial Ranking
**Program:** BreAK CRC-001 / STC-1010 | Brenus Pharma
**Formula:** PATH A = clip((p·t)/‖t‖₂, 0, 1) — locked 2026-04-28
**Lock date:** 2026-05-04 | **Run date:** 2026-05-01
**Source:** brenus_comparator_path_a_report.md (LOCKED)

---

## Patient Profiles

| Profile | Description | io axis | Ceiling |
|---|---|---|---|
| **P_A** | KRAS-mut MSS mCRC, 1L, **liver-met NEG**, IO-permissive | 0.40 | 0.8902 |
| **P_B** | KRAS-mut MSS mCRC, 1L, **liver-met POS**, IO-suppressed | 0.10 | 0.8016 |

The only difference between P_A and P_B is the io axis (0.40 vs 0.10), reflecting hepatic TME suppression of IO mechanisms in liver-metastatic disease. All other axes are identical.

---

## Score Table — Ranked by fit_A

| Rank | CORE | Trial | Mechanism (plain English) | Tier | fit_A | fit_B | Δ | Rank Δ | Warning |
|---|---|---|---|---|---|---|---|---|---|
| 1 | CORE-04 | IMblaze370 | MEK inhibitor + PD-L1 | TIER1 | **0.8262** | 0.6751 | 0.1511 | 7 | ⚠️ FALSE POSITIVE |
| 2 | CORE-05 | AtezoTRIBE | PD-L1 + FOLFOXIRI + bev | TIER1 | 0.5843 | 0.3671 | 0.2172 | 6 | |
| 3 | CORE-01 | QUILT-2.004 | CEA vaccine + PD-L1 + mFOLFOX6 + bev | TIER1 | 0.5815 | 0.3553 | 0.2261 | 5 | |
| 4 | CORE-02 | GRANITE GO-010 | Neoantigen vaccine + PD-L1 + CTLA-4 + bev | **TIER2** | 0.5411 | 0.2832 | 0.2579 | 4 | ⚠️ TIER2 |
| 5 | CORE-06 | MEDITREME | PD-L1 + CTLA-4 + mFOLFOX6 | TIER1 | 0.5037 | 0.2089 | 0.2949 | 3 | |
| 6 | CORE-03 | GVAX + CY + Pembro | Whole-cell vaccine + CY + PD-1 | TIER1 | 0.4486 | 0.1495 | 0.2991 | 2 | |
| 7 | CORE-07 | CCTG CO.26 | PD-L1 + CTLA-4 vs BSC | TIER1 | 0.4000 | 0.1000 | **0.3000** | 1 | Calibration anchor |

All ceiling checks: **PASS** (no score exceeds P_A ceiling 0.8902 or P_B ceiling 0.8016)

---

## Score Table — Ranked by Δ (liver-met discrimination)

| Rank Δ | CORE | Trial | Δ | Interpretation |
|---|---|---|---|---|
| 1 | CORE-07 | CCTG CO.26 | **0.3000** | Pure IO — maximally sensitive to liver-met suppression. Calibration anchor. |
| 2 | CORE-03 | GVAX + CY + Pembro | 0.2991 | Pure IO — whole-cell vaccine with no MAPK/VEGF axes |
| 3 | CORE-06 | MEDITREME | 0.2949 | High IO, no VEGF — dual CPI sensitive to liver-met |
| 4 | CORE-02 | GRANITE GO-010 | 0.2579 | High IO — ⚠️ TIER2, directional only |
| 5 | CORE-01 | QUILT-2.004 | 0.2261 | Mixed IO+VEGF — partial liver-met independence from bev |
| 6 | CORE-05 | AtezoTRIBE | 0.2172 | High VEGF — bev backbone partially liver-met independent |
| 7 | CORE-04 | IMblaze370 | 0.1511 | High MAPK — MEK inhibition not IO-dependent; liver-met status irrelevant |

**What the Δ ranking means:** Trials with pure or dominant IO mechanisms (CO.26, GVAX, MEDITREME) are most sensitive to liver-met status. This confirms liver-met stratification is the highest-leverage design variable for IO trials in MSS mCRC.

**What the Δ ranking does NOT mean:** CO.26 is not a better trial than QUILT-2.004. The delta ranking is a discrimination test, not a quality ranking.

---

## Critical Interpretation Notes

### ⚠️ CORE-04 IMblaze370 — FALSE POSITIVE (mandatory read before citing)

IMblaze370 ranks **first** on fit_A (0.8262) because the patient's KRAS-driven MAPK burden (mapk=0.70) aligns with cobimetinib's MEK inhibition (mapk=0.85). The formula correctly identifies axis alignment.

**But IMblaze370 is a Phase III definitive negative** — OS HR=1.00, ORR 3% vs 2%, no biomarker subgroup rescued. The MEKi immune priming hypothesis was definitively falsified in humans.

- The high score is a **warning** that the patient population's MAPK burden is real and large
- It is **not** a recommendation that IMblaze370 is a good comparator for STC-1010
- STC-1010's ICD mechanism (DNFB haptenation → DC priming → CD8+ T-cell activation) is mechanistically distinct from MEKi priming
- The MEKi immune priming pathway is **permanently closed** in MSS CRC

### ⚠️ CORE-02 GRANITE GO-010 — TIER2 (directional scores only)

GRANITE GO-010 scores are **directional only**. Gritstone Oncology filed for Chapter 11 bankruptcy. All data derives from press releases (P-003). No peer-reviewed publication exists. Do not cite GRANITE efficacy data in any external document.

### CORE-03 GVAX — Mechanistic mirror of STC-1010

GVAX (whole-cell vaccine + GM-CSF + CY + pembrolizumab) is the closest mechanistic analog to STC-1010 (whole-cell vaccine + DNFB haptenation + CY + mFOLFOX6). GVAX's ORR 0% despite confirmed T-cell responses and CD8+ infiltration is the most important lesson for BreAK CRC-001.

Low fit_A (0.4486) is a **vector geometry artifact** — GVAX has no MAPK or VEGF axis, so the patient's KRAS burden and bev backbone are unmatched. This does not reduce GVAX's clinical relevance as a comparator.

### CORE-07 CO.26 — Calibration anchor

CO.26 has the highest Δ (0.3000) and the lowest fit_A (0.4000). It is a pure IO trial with no MAPK/VEGF/DDR axes. The non-liver-met subgroup OS HR ~0.50 vs liver-met HR ~0.90 is the strongest available evidence that liver-met stratification is the highest-leverage design variable for IO in MSS mCRC.

---

## Ceiling Proof

| Patient | ‖p‖₂ (ceiling) | Max possible fit | All scores ≤ ceiling? |
|---|---|---|---|
| P_A | 0.8902 | 0.8902 | ✓ PASS — highest score 0.8262 |
| P_B | 0.8016 | 0.8016 | ✓ PASS — highest score 0.6751 |

**Cauchy-Schwarz bound:** fit = (p·t)/‖t‖₂ ≤ ‖p‖₂ · ‖t‖₂/‖t‖₂ = ‖p‖₂

Any claim of fit > 0.8902 for P_A is mathematically impossible under PATH A. DL-07 (DDR 0.983) is PERMANENTLY BLOCKED on this basis.

---

*Source: brenus_comparator_path_a_report.md (LOCKED 2026-05-04)*
*Formula authority: path_a_recomputation_lock_v1.md*
*Governance: MANIFEST.yaml*
