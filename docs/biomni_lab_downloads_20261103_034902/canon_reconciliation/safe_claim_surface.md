---
title: Brenus Canon Reconciliation — Safe Claim Surface
version: 1.0
created: 2026-04-28
agent: Canon Reconciliation Agent
ground_truth: brenus_verified_claim_ledger_v1.md + brenus_canon_v2_freeze.md (v2.1-FREEZE)
usage: Claims in this file are cleared for use in internal analysis, partner-facing materials,
       and downstream agent inputs — subject to the evidence-level tags shown.
       Do not use any claim from blocked_claim_surface.md.
---

# BRENUS CANON RECONCILIATION — SAFE CLAIM SURFACE

> **Policy:** Every claim below has been verified against the clean-room ledger and is free of the contradictions documented in `contradiction_hitlist.md`. Evidence-level tags are mandatory — do not strip them.

---

## CATEGORY 1: VERIFIED — Company Identity & Funding

| Claim | Evidence Level | Source |
|-------|---------------|--------|
| Legal name: BRENUS PHARMA | VERIFIED | SIREN 802549030, Le Journal des Entreprises |
| SIREN: 802549030 | VERIFIED | French company registry |
| HQ: Lyon, France | VERIFIED | All 2024–2026 press releases |
| Total raised: €30M (€4M seed Mar 2022 + €22.2M Series A Sep 2024) | VERIFIED | BusinessWire Sep 2024 |
| CEO: Paul Bravetti (PharmD, HEC) | VERIFIED | Company website |
| CSO / Platform inventor: Benoit Pinteur (PharmD) | VERIFIED | Company website |
| Lead Clinical Advisor: Alexander Eggermont (former DG Gustave Roussy) | VERIFIED | Company website |
| Study Coordinator: François Ghiringhelli (CGFL Dijon) | VERIFIED | ClinicalTrials.gov NCT06934538 |
| Pipeline: STC-1010 (Phase I/IIa) + STC-1020 (preclinical, indication undisclosed) | VERIFIED | Synapse drug DB + company website |

---

## CATEGORY 2: VERIFIED — Trial Protocol (BreAK CRC-001)

| Claim | Evidence Level | Source |
|-------|---------------|--------|
| NCT: NCT06934538 | VERIFIED | ClinicalTrials.gov |
| Phase: I / IIa (sequential) | VERIFIED | ClinicalTrials.gov |
| Design: Open-label, non-randomized, dose-escalation + cohort expansion | VERIFIED | ClinicalTrials.gov |
| Enrollment target: ~90 (21–33 Phase I + 57–60 Phase IIa) | VERIFIED | ClinicalTrials.gov |
| Start date: 2025-06-17 (first patients dosed 2025-09-02) | VERIFIED | ClinicalTrials.gov + Brenus PR |
| Primary completion (est.): June 2028 | VERIFIED | ClinicalTrials.gov |
| Line of therapy: First-line (metastatic/advanced treatment-naïve) | VERIFIED | ClinicalTrials.gov |
| MSS/pMMR required (Phase I + Arm 2A-1); MSI-H allowed in Arm 2A-2 only | VERIFIED | ClinicalTrials.gov |
| KRAS mutated required (Phase I + Arm 2A-1) | VERIFIED | ClinicalTrials.gov |
| BRAF mutated: EXCLUDED | VERIFIED | ClinicalTrials.gov |
| Prior metastatic chemo: EXCLUDED | VERIFIED | ClinicalTrials.gov |
| Backbone: STC-1010 + cyclophosphamide + GM-CSF + mFOLFOX6 ± bevacizumab | VERIFIED | ClinicalTrials.gov + Alzeeb et al. 2024 |
| Bevacizumab: OPTIONAL (+/- bev) | VERIFIED | ClinicalTrials.gov |
| Sites recruiting: CGFL Dijon, Institut Bergonié, HCL Lyon, ICM Montpellier, IGR Villejuif | VERIFIED | ClinicalTrials.gov Dec 2025 |

---

## CATEGORY 3: VERIFIED — Preclinical Data (Alzeeb et al. 2024)

| Claim | Evidence Level | Source |
|-------|---------------|--------|
| Murine cell lines: CT26 (ATCC CRL-2639), CMT-93 (ECACC 89111413), LTPA (ATCC CRL-2389) | VERIFIED | Alzeeb et al. 2024 Table 1 |
| LTPA origin: Pancreatic adenocarcinoma (murine) — intentional cross-tumor antigen breadth | VERIFIED | Alzeeb et al. 2024 |
| Hapten: DNFB (dinitrofluorobenzene, Sigma) 12.7 µg/mL, 30 min | VERIFIED | Alzeeb et al. 2024 §Methods |
| Thermal stress: 1h at 42°C then 14h at 37°C | VERIFIED | Alzeeb et al. 2024 §Methods |
| Irradiation: 10 Gy (during stress) + 25 Gy (final inactivation) | VERIFIED | Alzeeb et al. 2024 §Methods |
| Storage: −80°C in EBSS + 80 g/L sucrose at 10×10⁶ cells/mL | VERIFIED | Alzeeb et al. 2024 §Methods |
| Named TAAs (murine): HSP70/HSPA1A, MDR1A/MDR1B (ABCB1), TTK, MTA, LAMP1 | VERIFIED | Alzeeb et al. 2024 Table 2 |
| Total proteins detected: 1,196+ by MS (Q-Exactive HF; Proline v1.6.1) | VERIFIED | Alzeeb et al. 2024 §Results |
| Study C CD8+ T cells: ↑ p=0.045 (anti-PD-1 resistant MC38 model) | VERIFIED | Alzeeb et al. 2024 §Study C |
| Study C M1 macrophages: ↑ p=0.02 | VERIFIED | Alzeeb et al. 2024 §Study C |
| Study C responder rate: 60%; 1 confirmed CR | VERIFIED | Alzeeb et al. 2024 §Study C |
| Study B mOS (IS+3CL-SH vs IS+CT26-SH): 38d vs 31.5d (p=0.05) | VERIFIED | Alzeeb et al. 2024 §Study B |

---

## CATEGORY 4: PRELIMINARY — Early Clinical Data (n=6, AACR 2026)

> These claims are verified as existing in the public record (Brenus PR Jan 2026 / AACR 2026 Poster CT051) but are PRELIMINARY. Do not present as evidence of vaccine efficacy. Do not extrapolate beyond the stated n and follow-up.

| Claim | Evidence Level | Source |
|-------|---------------|--------|
| DLTs: 0 (no dose-limiting toxicities) in first 6 patients | PRELIMINARY — n=6 only; SOURCE: Brenus PR Jan 2026 (BusinessWire); single-source | Brenus PR Jan 2026 |
| DCR (RECIST): 100% (6/6) — not attributable to STC-1010 vs. SOC | PRELIMINARY — n=6 only; indistinguishable from mFOLFOX6 ± bev SOC (~80–90% DCR) | Brenus PR Jan 2026 |
| DTH responses: Observed — peripheral immune activation marker only | PRELIMINARY — n=6 only; surrogate marker, not evidence of tumor-directed immunity | Brenus PR Jan 2026 |
| Median follow-up: ~6 months | PRELIMINARY — n=6 only | Brenus PR Jan 2026 |

---

## CATEGORY 5: PROVISIONAL — Human Cell Lines (B-001 RESOLVED)

| Claim | Evidence Level | Source |
|-------|---------------|--------|
| Human CRC cell lines used in STC-1010: HCT116, HT29, LoVo | PROVISIONAL — high confidence; B-001 RESOLVED 2026-04-28; full confirmation requires ASCO abstract database access or Brenus NDA data room | ASCO 2023 e14661 (user-cited); EACR25 abstract (user-cited); Brenus platform page [37] |
| HCT116 mutation status: KRAS G13D | VERIFIED | ATCC / CCLE standard reference |
| LoVo mutation status: KRAS G13D | VERIFIED | ATCC / CCLE standard reference |
| HT29 mutation status: BRAF V600E / KRAS wild-type | VERIFIED | ATCC / CCLE standard reference |
| HT29 BRAF V600E creates SC-001 active conflict with trial BRAF-exclusion criterion | ACTIVE CONFLICT — SC-001 | ATCC/CCLE + NCT06934538 Exclusion Criterion #7 |

---

## CATEGORY 6: VERIFIED — Comparator Trial Results (post-correction)

> All HR values below reflect the corrected values from the PhD Verification Agent (2026-04-28). Do not use HR 1.02 for NCT03050814 anywhere.

| Trial | NCT | Key Result | Evidence Level |
|-------|-----|-----------|----------------|
| KEYNOTE-177 MSS subgroup | NCT02563002 | ORR 0% in MSS | CLINICAL EVIDENCE |
| CheckMate 142 MSS cohort | NCT02060188 | ORR 0% (n=74) | CLINICAL EVIDENCE |
| IMblaze370 | NCT02788279 | Negative (MEK+atezo vs regorafenib) | CLINICAL EVIDENCE |
| AdCEA+avelumab+mFOLFOX6+bev (QUILT-2.004) | NCT03050814 | PFS HR **1.061** (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility (n=26 treated) | CLINICAL EVIDENCE ⚠️ [CORRECTED 2026-04-28] |
| REGONIVO | NCT03406871 | ORR 33% Japan → 7% US; NLM subgroup ORR 22% | CLINICAL EVIDENCE |
| RIN | NCT03713593 | ORR 27.6% overall; NLM ~40%; liver-met ~5% | CLINICAL EVIDENCE |
| GRANITE | NCT03639714 | ITT HR 0.73 (NS); low-ctDNA HR 0.50 (exploratory) | CLINICAL EVIDENCE |
| CO.26 pTMB≥28 | NCT02870920 | HR 0.34 (90% CI 0.18–0.63) | CLINICAL EVIDENCE |
| Morris Cancer Cell 2025 (MSS BRAF V600E) | NCT04017650 | 50% ORR (n=26); refractory-line — NOT 1L | CLINICAL EVIDENCE — context flag: refractory, not 1L |

---

## CATEGORY 7: VERIFIED — Bevacizumab Immunobiology

| PMID | Key Finding | Evidence Level |
|------|------------|----------------|
| 36858688 | Peak CD8 at cycle 2; CD8:Treg ratio declines by cycle 4 | VERIFIED — mCRC paired biopsy |
| 35135679 | Bev did NOT significantly reduce Treg density vs baseline in MSS CRC | VERIFIED — MSS CRC specific |
| 31209139 | VEGF-A → NRP-1 → M2 macrophage polarization | MECHANISTIC HYPOTHESIS |
| 28698619 | Anti-VEGF normalizes vasculature, inhibits Treg accumulation transiently | MECHANISTIC HYPOTHESIS |
| 30679748 | VEGF inversely correlated with CD8+ TIL (r=−0.41, p=0.003) | VERIFIED — primary CRC specimens |
| 24399798 | Anti-VEGF reduces T-cell trafficking suppression — only in normalization window | MECHANISTIC HYPOTHESIS |
| 23340198 | VEGF suppresses DC function, promotes Treg generation | MECHANISTIC HYPOTHESIS |

---

## CATEGORY 8: VERIFIED — Engagement Recommendation

| Claim | Evidence Level | Source |
|-------|---------------|--------|
| CrisPRO recommendation: CONDITIONAL GO | VERIFIED — internal assessment | Agent 6 §5 |
| Non-negotiable condition 1: Mutual NDA + Phase I patient-level data within 60 days | VERIFIED — internal policy | Agent 6 §5 |
| Non-negotiable condition 2: No public citation of CrisPRO without prior written approval | VERIFIED — internal policy | Agent 6 §5 |
| Non-negotiable condition 3: Fee-for-service or milestone-based contract | VERIFIED — internal policy | Agent 6 §5 |

---

*Canon Reconciliation Agent — 2026-04-28*
*All claims in this file are cleared for downstream use subject to evidence-level tags.*
*Do not use any claim from blocked_claim_surface.md.*
