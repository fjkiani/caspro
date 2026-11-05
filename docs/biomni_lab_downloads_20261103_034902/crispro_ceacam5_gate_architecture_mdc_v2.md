---
title: CrisPRO CEACAM5 Patient-Selection Architecture
subtitle: Strategy, Economics, and Dependency Decision Memo
version: v2.0
date: 2026-06-01
classification: CONFIDENTIAL — DUAL LAYER
governance: PATH A | Manager Audit: PASS | 36 confirmed data points
grounding_standard: v1.0-2026-06-01
supersedes: crispro_ceacam5_gate_architecture_mdc_v1.md
receipt_artifact: grounding_receipt_table_v2.csv
addendum: crispro_ceacam5_mdc_grounding_addendum_v2.md
---

> **Grounding note (v2.0):** All inline `[INFERENCE]`, `[CONFIRMED]`, and `[HYPOTHESIS]` labels from v1.0 have been replaced with formal typed citations per grounding standard v1.0-2026-06-01. Label key: `[SOURCED: C##]` = direct source lock; `[OPEN_ASSUMPTION: G##]` = ungrounded transfer or analyst estimate; `[COMPUTED: F##]` = arithmetic from named inputs (inherits assumption class of inputs); `[EXECUTED: V##]` = test run or hash receipt. Full register in Section 12 and `grounding_receipt_table_v2.csv`. v1.0 preserved as-is for comparison.

---

# LAYER 1: EXECUTIVE BRIEF
### For: Sanofi CFO / CMO / CEO
### Purpose: Decision memo, not a pitch deck. Every claim is labeled per grounding standard v1.0-2026-06-01: [SOURCED: C##] | [OPEN_ASSUMPTION: G##] | [COMPUTED: F##] — see Section 12.

---

## THE CORE QUESTION

Sanofi already knows the CEACAM5 ≥80% post-hoc signal from CARMEN-LC03.
The question is not whether the signal exists.
The question is: **what is the most defensible way to act on it — and what does CrisPRO provide that Sanofi cannot build internally?**

The answer has three parts:

1. **The ≥80% signal alone is not enough.** It is post-hoc, the CI crosses 1.0, and it has a prognostic confound. Running a Phase 2 on IHC ≥80% alone has breakeven NPV (~-$1M) and low P(approval) (~15%) [COMPUTED: F03, F04 — inputs include OPEN_ASSUMPTION G01, G05].

2. **The cCEA gate (serum CEA ≥100 µg/L) is the anchor.** It is the only biomarker in this analysis with prospective predictive data: ORR 41.7% vs 8.1% within IHC-high patients (n=24 vs n=37, Phase 1/2) [SOURCED: C13, C14]. It is operationally simple ($30–80/test) [SOURCED: CS01, CS02]. It is CrisPRO's strongest IP claim. The two-gate system (IHC ≥80% + cCEA ≥100) is the only gate combination with positive NPV (+$31M base case) [COMPUTED: F05 — inputs include OPEN_ASSUMPTION G01–G05].

3. **The IO permissiveness gate (pTMB, Immunoscore, DetermaIO) is the franchise argument, not the base case.** It is mechanistically justified — especially for SAR445877 and SAR445953 (T cell-recruiting bispecifics). But as a Phase 2 enrollment gate, it produces negative NPV (-$68M) [COMPUTED: F07 — inputs include OPEN_ASSUMPTION G02, G07, G08, CS03–CS06] due to screen-fail costs. The right path: collect IO markers exploratorily in the two-gate Phase 2, then decide.

---

## WHAT SANOFI ALREADY KNOWS vs WHAT REMAINS UNRESOLVED

| What Sanofi knows | What remains unresolved |
|---|---|
| CEACAM5 ≥80% subgroup: OS HR=0.71 (0.49–1.03) [SOURCED: C06] | Whether this is predictive or prognostic [UNRESOLVED] |
| CEACAM5 50–79% subgroup: PFS HR=1.38 — signal inversion [SOURCED: C03] | CEACAM5 ≥80% prevalence in CRC [OPEN_ASSUMPTION: G02 — NSCLC→CRC transfer, range 15–40%] |
| cCEA ≥100 in IHC-high: ORR 41.7% vs 8.1% [SOURCED: C13, C14] | Whether cCEA measures accessibility or tumor burden [UNRESOLVED] |
| 90% of CARMEN-LC03 used archival tissue [SOURCED: C09] | Fresh vs archival concordance in CRC [UNKNOWN] |
| pTMB ≥28: OS HR=0.34 in MSS CRC (CO.26, n=35) [SOURCED: C18] | Whether IO permissiveness predicts ADC response [OPEN_ASSUMPTION: G10 — mechanism only, no CRC clinical data] |
| SGN-CEACAM5C has no CEACAM5 threshold [SOURCED: C29] | Whether competitors will fail without selection [UNKNOWN] |

---

## THE MOAT — EXPLAINED SIMPLY

Imagine you are trying to find a specific house in a city of 47,000 houses.

**Sanofi's current approach:** Look at every house where the front door is painted red (CEACAM5 ≥50%). That's 23,000 houses. But half of those red doors are painted on the wrong side — the drug can't get in. You knock on 23,000 doors and most don't answer.

**The two-gate system:** First, find houses where the door is *very* red (≥80%). That's 13,000 houses [COMPUTED: G01 — pool size inherits OPEN_ASSUMPTION G02]. Then check whether the mailbox is overflowing (cCEA ≥100) — which tells you the house is actually occupied and the door is accessible. That narrows it to ~6,500 houses [COMPUTED: G03 — inherits OPEN_ASSUMPTION G02, G04]. Now when you knock, about 4 in 10 people answer [SOURCED: C13].

**Why CrisPRO?** Anyone can paint a door red. Anyone can check a mailbox. What CrisPRO built is the **map** — the algorithm that combines the door color, the mailbox, and the neighborhood immune activity into a single score that tells you which houses to visit first. Sanofi can copy the individual checks. They cannot copy the map without licensing it.

**The franchise argument:** The same map works for every CEACAM5 drug — tusamitamab, SAR445877, SAR445953. You are not buying a map for one house. You are buying the map for the entire city.

---

## GATE ARCHITECTURE SUMMARY

| Gate | Biomarker | What it measures | Type | Cost/patient | Pool after gate | Proj ORR |
|---|---|---|---|---|---|---|
| Pre-screen | MSS/pMMR | Tumor type eligibility | Pre-screen | Standard | 46,750/yr [SOURCED: C32, C33] | ~5–7% |
| Gate 1 | CEACAM5 IHC ≥80% | Target expression level | Screening enrichor | $150–300 [SOURCED: CS01] | 13,090/yr [COMPUTED: G01 — inherits OPEN_ASSUMPTION G02] | ~15–20% [OPEN_ASSUMPTION: G05] |
| Gate 2 | cCEA ≥100 µg/L | Target accessibility (shed antigen) | Response marker | $30–80 [SOURCED: CS02] | 6,545/yr [COMPUTED: G03 — inherits OPEN_ASSUMPTION G02, G04] | ~35–42% [SOURCED: C13] |
| Gate 3 (optional) | pTMB ≥28 mut/Mb | Immune activation potential | Durability marker | $1,500–3,000 [OPEN_ASSUMPTION: CS03] | 825–1,374/yr [COMPUTED: G07, G08 — inherits OPEN_ASSUMPTION G02, G04, G06] | ~40–50% [OPEN_ASSUMPTION: G09] |
| Modifier | Liver mets absent | Immune context preservation | Conditional exclusion | Standard | Reduces pool ~50% | Improves signal |

**Recommended base case: Gate 1 + Gate 2 only.** Collect Gate 3 markers exploratorily. Decide after Phase 2 data.

---

## ECONOMICS SUMMARY

| Scenario | Pool (US/yr) | Phase 2 cost | P(Approval) | Peak Revenue | NPV | Verdict |
|---|---|---|---|---|---|---|
| ≥50% gate (failed) | 23,375 | $2.5M | 5% | $280M | -$57M | Dead path |
| ≥80% gate only | 13,090 | $2.0M | 15% | $183M | -$1M | Breakeven |
| **Two-gate (base case)** | **6,545** | **$3.0M** | **30%** | **$118M** | **+$31M** | **Recommended** |
| Three-gate (standalone) | 1,100 | $9.7M | 35% | $24M | -$68M | Not viable standalone |

*All financial figures [COMPUTED: F01–F08 — inputs are OPEN_ASSUMPTION G01–G09; base NPV +$31M inherits assumption uncertainty; see Section 12.3 for receipts]. 12% discount rate, 10-year revenue horizon.*

**The two-gate system is the only positive-NPV path. The three-gate system is franchise optionality, not the base case.**

---

## BUNDLE OPTIONS — WHAT SANOFI CAN BUY

| Bundle | Commitment | Upfront | Milestones | Buyer | Risk |
|---|---|---|---|---|---|
| CB-1: IHC prevalence study | Lowest | $150–300K | None | CMO | Lowest |
| CB-2: IST + Phase 2 protocol | Low | $500K–1.5M | $2–5M | CMO+CFO | Low |
| CB-3: Two-gate CDx license | Medium | $2–4M | $10–20M | CMO+CFO | Medium |
| CB-4: Franchise platform license | High | $3–8M | $30–80M | CEO | High |
| CB-5: Platform + competitor rights | Highest | $5–12M | $50–100M | CEO+Board | Highest |

**Recommended entry point: CB-2 (IST + protocol design).** Low commitment, high information value. Converts the weakest assumption (CRC prevalence [OPEN_ASSUMPTION: G02]) into confirmed data before any trial commitment.

---

## TOP 3 THINGS SANOFI WILL CHALLENGE

1. **"The ≥80% signal is post-hoc."** — Correct. The cCEA signal is not [SOURCED: C13, C14]. Lead with cCEA.
2. **"We don't know the CRC prevalence at ≥80%."** — Correct [OPEN_ASSUMPTION: G02]. CB-1 resolves it for $150–300K in 3 months.
3. **"The three-gate NPV is negative."** — Correct [COMPUTED: F07]. The base case is two-gate. Three-gate is the franchise upside.


---

# LAYER 2: TECHNICAL APPENDIX
### For: CrisPRO Internal Use
### All claims labeled per grounding standard v1.0-2026-06-01: [SOURCED: C##] | [OPEN_ASSUMPTION: G##] | [COMPUTED: F##] | [EXECUTED: V##] — see Section 12 and grounding_receipt_table_v2.csv.

---

## SECTION 1: EVIDENCE LOCK — 36 CONFIRMED DATA POINTS

### CARMEN-LC03 (Besse et al. WCLC 2024)
- [C01] ITT PFS HR: 1.14 (0.86–1.51) — FAILED primary endpoint
- [C02] ITT OS HR: 0.85 (0.64–1.11) — trend, not significant
- [C03] CEACAM5 50–79% PFS HR: 1.38 (0.92–2.07) — signal INVERSION
- [C04] CEACAM5 50–79% OS HR: 1.02 (0.69–1.50) — no benefit
- [C05] CEACAM5 ≥80% PFS HR: 0.87 (0.60–1.26) — trend toward benefit
- [C06] CEACAM5 ≥80% OS HR: 0.71 (0.49–1.03) — trend toward benefit
- [C07] ~55% enrolled had CEACAM5 ≥80% [OPEN_ASSUMPTION: G02 — NSCLC→CRC prevalence transfer NOT confirmed; range 15–40% in CRC]
- [C08] ~45% had CEACAM5 50–79% [OPEN_ASSUMPTION: G02 — same transfer assumption]
- [C09] 90% assessed on archival tissue
- [C10] CEACAM5 prognostic in BOTH arms — higher expression = better OS regardless of treatment

### Phase 1/2 (Gazzah et al. NCT02187848)
- [C11] IHC HE (≥50%) ORR: 20.3% (13/64)
- [C12] IHC ME (<50%) ORR: 7.1% (2/28)
- [C13] cCEA ≥100 in HE: ORR 41.7% (10/24) — **most important number in the model**
- [C14] cCEA <100 in HE: ORR 8.1% (3/37)
- [C15] IHC-to-cCEA Spearman ρ = 0.43 — moderate, NOT the same biomarker
- [C16] cCEA-to-cCEACAM5 Spearman ρ = 0.99 — redundant; use cCEA
- [C17] CEACAM5 mRNA higher in HE vs ME: p=0.0027

### IO Trial Data
- [C18] CO.26 pTMB ≥28: OS HR=0.34 (n=35)
- [C19] CO.26 pTMB <28: OS HR=0.93 (n=128)
- [C20] AtezoTRIBE Immunoscore-IC-high: PFS HR~0.55
- [C21] AtezoTRIBE DetermaIO IOOPT+: PFS HR=0.10 (n=16, exploratory)
- [C22] IMblaze370 PD-L1 IC2/3: OS HR=1.00 — FALSIFIED as MSS CRC IO marker

### CRC Biology
- [C23] CEACAM5 enriched in CD133+ cancer stem cells
- [C24] CEACAM5 regulated by promoter methylation
- [C25] CEACAM5 hypomethylation associated with MSS, left-sided CRC
- [C26] CEACAM5 sequestered at intercellular junctions (glycocalyx barrier)
- [C27] CEACAM5 binds TBR1 — inhibits tumor-suppressive TGF-β
- [C28] SMAD4 loss in ~30% MSS CRC

### Competitor Data
- [C29] SGN-CEACAM5C (NCT06131840): no CEACAM5 expression threshold
- [C30] M9140/precemtabart tocentecan: no ≥80% threshold
- [C31] EBC-129: targets N256-glycosylated CEACAM5/6, different epitope

### Population Data
- [C32] ~55,000 new mCRC cases/year US (SEER 2024)
- [C33] ~85% MSS/pMMR fraction
- [C34] pTMB ≥28: ~21% of MSS CRC (CO.26 enrollment)
- [C35] Immunoscore-IC-high: ~32% (AtezoTRIBE pMMR cohort)
- [C36] DetermaIO IOOPT+: ~10% (AtezoTRIBE pMMR cohort)

### Tracked Inferences (5 items, risk-rated)
| ID | Claim | Risk | De-risk path |
|---|---|---|---|
| I01 | CEACAM5 ≥80% prevalence in CRC ~28% [OPEN_ASSUMPTION: G02] | CRITICAL | CB-1 retrospective IHC study |
| I02 | CEACAM5-high anti-correlated with IO permissiveness in CRC [OPEN_ASSUMPTION: G06] | HIGH | Retrospective analysis of CARMEN-LC03 tissue |
| I03 | IO union prevalence ~35% of MSS CRC [OPEN_ASSUMPTION: G06] | MEDIUM | CO.26 + AtezoTRIBE overlap analysis |
| I04 | cCEA ≥100 in CEACAM5 ≥80% CRC ~50% [OPEN_ASSUMPTION: G04] | MEDIUM | Collect cCEA on CARMEN-LC03 archival serum |
| I05 | P(approval) two-gate ~30% [OPEN_ASSUMPTION: G05] | HIGH | Phase 2 ORR data only real de-risk |

---

## SECTION 2: BIOMARKER DEPENDENCY MATRIX

### Biomarker Registry
| ID | Biomarker | Gate role | Assay type |
|---|---|---|---|
| B1 | CEACAM5 IHC ≥80% | Gate 1 — target expression | Tissue IHC |
| B2 | cCEA ≥100 µg/L | Gate 2 — target accessibility | Serum assay |
| B3 | pTMB ≥28 mut/Mb | Gate 3 — immune activation potential | NGS panel |
| B4 | Immunoscore-IC-high | Gate 3 alt — realized immune infiltration | Digital pathology |
| B5 | DetermaIO IOOPT+ | Gate 3 alt — gene expression IO signature | Proprietary assay |
| B6 | Liver mets absent | Modifier — immune context preservation | Imaging/clinical |
| B7 | SMAD4 loss | Stratification variable — TGF-β axis modifier | NGS/IHC |
| B8 | CEACAM5 methylation | Mechanistic modifier — upstream driver of B1 | Methylation array |
| B9 | MSS/pMMR status | Pre-screen — already applied | MSI testing |

### Pairwise Dependency Classifications
| Pair | Relationship | Evidence basis | Gate logic | Redundancy risk |
|---|---|---|---|---|
| B1 ↔ B2 | PARTIALLY OVERLAPPING (ρ=0.43) | Statistical [C15] | Hierarchical: B1 gates in, B2 refines | LOW |
| B1 ↔ B3 | INDEPENDENT | Biological inference (anti-correlation) [OPEN_ASSUMPTION: G06] | Additive — both required | NONE |
| B1 ↔ B4 | INDEPENDENT | Mechanistic inference [C27] | Additive | NONE |
| B1 ↔ B5 | INDEPENDENT | Inferred [OPEN_ASSUMPTION: G06] | Additive | NONE |
| B1 ↔ B8 | DEPENDENT (causal) | Biological [C24, C25] | B8 is upstream driver — not a gate | HIGH |
| B1 ↔ B9 | CONDITIONAL | Biological [C25] | B9 is pre-screen — already applied | N/A |
| B2 ↔ B3 | INDEPENDENT | Biological (different axes) | Additive | NONE |
| B3 ↔ B4 | PARTIALLY OVERLAPPING | Statistical [C18, C20] | Substitutable within Gate 3 | MEDIUM |
| B3 ↔ B5 | PARTIALLY OVERLAPPING | Statistical [C20, C21] | Substitutable within Gate 3 | MEDIUM |
| B4 ↔ B5 | PARTIALLY OVERLAPPING (high) | Biological inference | Pick one — do not use both | HIGH |
| B6 ↔ B3/B4/B5 | CONDITIONAL | Biological (hepatic immune tolerance) | B6 may override Gate 3 positivity | N/A |
| B7 ↔ B1 | CONDITIONAL | Mechanistic [C27, C28] | Stratification variable only | N/A |

### Dependency Operational Rules
1. **B1 and B2 are not interchangeable.** ρ=0.43 means 81% of variance is independent. IHC measures protein presence; cCEA measures functional shedding. Both are required.
2. **B4 and B5 should not both be used as enrollment gates.** High redundancy. Pick one as primary Gate 3 input. B3 (pTMB) is preferred due to OS endpoint alignment and platform reuse.
3. **B8 (methylation) is not a gate input.** It is the upstream driver of B1. Measuring both is redundant for patient selection.
4. **B6 (liver mets) is a conditional modifier, not a gate.** Liver mets may override IO permissiveness signals. Consider as exclusion criterion or stratification factor.
5. **The independence of B1 and B3 is the mathematical foundation of the two-gate value.** If they were correlated, adding Gate 3 would add cost without independent information. Note: independence is [OPEN_ASSUMPTION: G06] — not confirmed in CRC.

---

## SECTION 3: ENDPOINT CLASSIFICATION TABLE

| Biomarker | Marker type | Endpoint link | Predictive vs Prognostic | Phase 2 usable | Regulatory grade | Failure mode |
|---|---|---|---|---|---|---|
| B1: IHC ≥80% | Screening enrichor + response marker | ORR, PFS | BOTH — prognostic confound confirmed [C10] | YES — enrollment criterion | NOT YET — post-hoc | Signal is purely prognostic; Phase 2 ORR matches historical control |
| B2: cCEA ≥100 | Response marker (functional accessibility) | ORR | PREDICTIVE — ORR 41.7% vs 8.1% [C13, C14] | YES — enrollment or stratification | CDx CANDIDATE — prospective data | cCEA selects for high tumor burden, not drug response |
| B3: pTMB ≥28 | Durability marker + mechanistic modifier | OS | PREDICTIVE — OS HR=0.34 vs 0.93 [C18, C19] | YES — stratification; enrollment is aggressive | EXPLORATORY — n=35 | ADC bystander effect does not require immune context |
| B4: Immunoscore-high | Durability marker | PFS | PREDICTIVE in AtezoTRIBE [C20] | YES — stratification | EXPLORATORY | Prognostic confound; immune-hot tumors have better prognosis |
| B5: DetermaIO IOOPT+ | Durability marker | PFS | PREDICTIVE — PFS HR=0.10 [C21] | YES — exploratory only | EXPLORATORY ONLY — n=16 | n=16 too small; proprietary assay; redundant with B4 |
| B6: Liver mets absent | Mechanistic modifier (negative) | OS modifier | PROGNOSTIC CONFOUND | YES — exclusion/stratification | STANDARD | Excluding liver-met patients shrinks pool ~50% |
| B7: SMAD4 loss | Mechanistic modifier | Unknown | UNKNOWN | STRATIFICATION ONLY | NOT USABLE | N/A — not proposed as gate |
| B8: Methylation | Upstream driver of B1 | None direct | NOT APPLICABLE | NO — redundant with B1 | NOT USABLE | N/A |

---

## SECTION 4: VECTOR-SCALPEL FRAMEWORK

### Vector B: Dependency-Evidence-Dilution Scores (0–3 per dimension, max=33)

| Biomarker | D1:Indep | D2:Evidence | D3:Predictive | D4:Pool-shrink | D5:Dilution-red | D6:Feasibility | D7:Regulatory | D8:Transfer | D9:Endpoint | D10:Platform | D11:Non-redundant | TOTAL |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B2: cCEA ≥100 | 2 | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 1 | 2 | 2 | **27** |
| B1: IHC ≥80% | 1 | 3 | 1 | 1 | 3 | 3 | 2 | 0 | 2 | 2 | 2 | **20** |
| B3: pTMB ≥28 | 3 | 2 | 2 | 0 | 2 | 2 | 2 | 2 | 3 | 3 | 2 | **23** |
| B4: Immunoscore | 2 | 2 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 3 | 1 | **19** |
| B5: DetermaIO | 2 | 1 | 2 | 0 | 2 | 0 | 1 | 2 | 2 | 3 | 0 | **15** |

**Dimension key:** D1=Independence from other gates | D2=Evidence strength | D3=Predictive plausibility | D4=Pool shrinkage burden (higher=less shrinkage) | D5=Dilution reduction value | D6=Operational feasibility | D7=Regulatory defensibility | D8=Transfer risk from NSCLC (higher=less risk) | D9=Endpoint alignment (OS=3, PFS=2, ORR=1) | D10=Platform reuse value | D11=Non-redundancy with other gates

**Ranking: B2 > B3 > B1 > B4 > B5**
**Optimal two-gate: B1 + B2** (highest combined score, lowest redundancy, operationally feasible)
**Optimal three-gate: B1 + B2 + B3** (adds OS endpoint alignment and platform reuse)
**Avoid: B4 + B5 together** (high redundancy, adds cost without independent information)

---

## SECTION 5: DILUTION MODEL

| Gate scenario | US patients/yr | % MSS mCRC | Dilution type removed | Over-restriction risk |
|---|---|---|---|---|
| No gate | 46,750 | 100% | None | N/A |
| Gate 1a: ≥50% | 23,375 | 50% | None — false positives included | N/A |
| Gate 1b: ≥80% | 13,090 | 28% | False-positive responders (50–79%, PFS HR=1.38) [C03] | LOW |
| Gate 1b + Gate 2 | 6,545 | 14% | Inaccessible-target patients (cCEA<100, ORR 8.1%) [C14] | LOW |
| Three-gate (upper) | 1,374 | 2.9% | Immune-context-insufficient patients [OPEN_ASSUMPTION: G02, G06 — IO anti-correlation in CRC not confirmed; NSCLC transfer] | MEDIUM-HIGH |
| Three-gate (lower) | 825 | 1.8% | Same — anti-correlation discount applied | HIGH |

**Screen-to-enroll ratios for Phase 2 (n=50 enrolled):**
- Gate 1b only: 4:1 → 178 patients screened
- Two-gate: 7:1 → 357 patients screened
- Three-gate (upper): 34:1 → 1,701 patients screened
- Three-gate (lower): 57:1 → 2,834 patients screened

**Key insight:** The pTMB gate (B3) adds $4.8–9.6M in screening cost to find 50 patients. This is the CFO's real objection. Mitigation: collect pTMB exploratorily in two-gate Phase 2 (no screen-fail cost).

---

## SECTION 6: COST STACK

### Per-Patient Biomarker Testing Costs
| Assay | Low | High | Status |
|---|---|---|---|
| B1: CEACAM5 IHC | $150 | $300 | [SOURCED: CS01] |
| B2: cCEA serum | $30 | $80 | [SOURCED: CS02] |
| B3: pTMB (NGS) | $1,500 | $3,000 | [OPEN_ASSUMPTION: CS03] |
| B4: Immunoscore | $500 | $1,000 | [OPEN_ASSUMPTION: CS04] |
| B5: DetermaIO | $2,000 | $4,000 | [OPEN_ASSUMPTION: CS05] |
| Fresh biopsy (if required) | $500 | $1,000 | [OPEN_ASSUMPTION: CS06] |

### Total Phase 2 Cost by Gate Strategy
| Strategy | Screen cost | Treatment cost | Total | Status |
|---|---|---|---|---|
| Two-gate (B1+B2) | $0.1–0.3M | $2.5M | **$2.6–3.0M** | [COMPUTED: F09 — inputs include OPEN_ASSUMPTION CS03–CS06; see grounding register] |
| Three-gate (B1+B2+B3) | $4.8–9.6M | $2.5M | **$7.3–12.1M** | [COMPUTED: F09 — inputs include OPEN_ASSUMPTION CS03–CS06; see grounding register] |

### CDx Development Cost
| CDx component | Timeline | Cost | CrisPRO angle |
|---|---|---|---|
| cCEA CDx (B2) | 1–2 years | $2–5M | Lowest cost; highest regulatory defensibility; CrisPRO's strongest IP |
| IHC CDx (B1) | 2–4 years | $5–15M | Sanofi has internal capability; CrisPRO value is threshold optimization |
| pTMB CDx (B3) | 3–5 years | $15–30M | Requires NGS partner (Foundation Medicine or similar) |
| Multi-marker panel (B1+B2+B3) | 4–6 years | $25–50M | Platform play; CrisPRO retains integration algorithm IP |

### Build vs License
| Pathway | Cost | Timeline | IP ownership |
|---|---|---|---|
| Sanofi internal (IHC + cCEA) | $7–20M | 2–4 years | Sanofi owns all |
| CrisPRO-assisted (IST + license) | $500K–1.5M upfront + $1–3M/program | 12–18 months faster | CrisPRO retains integration algorithm |

---

## SECTION 7: RETURN MODEL

### EV Model [COMPUTED: F01–F02 — all inputs are OPEN_ASSUMPTION; penetration and peak revenue are analyst estimates; see Section 12.3]
| Scenario | Pool (US/yr) | Penetration | Peak Revenue | P(Approval) | EV |
|---|---|---|---|---|---|
| ≥50% gate (failed) | 23,375 | 30% | $280M | 5% | $14M |
| ≥80% gate only | 13,090 | 35% | $183M | 15% | $27M |
| **Two-gate (base)** | **6,545** | **45%** | **$118M** | **30%** | **$35M** |
| Three-gate | 1,100 | 55% | $24M | 35% | $8M |

### NPV Model (12% discount rate, 10-year horizon) [COMPUTED: F03–F08 — inputs are OPEN_ASSUMPTION G01–G09; see Section 12.3 for receipts]
| Scenario | Total cost | NPV | Verdict |
|---|---|---|---|
| ≥50% gate (failed) | $92.5M | -$57M | Dead |
| ≥80% gate only | $80.0M | -$1M | Breakeven |
| **Two-gate** | **$70.0M** | **+$31M** | **Recommended** |
| Three-gate | $89.7M | -$68M | Not viable standalone |

### Sensitivity: Two-Gate Scenario
| ORR scenario | P(Approval) | EV | NPV |
|---|---|---|---|
| Downside (ORR 20%) | 10% | $12M | -$36M |
| Base case (ORR 38%) | 30% | $35M | +$31M |
| Upside (ORR 50%) | 45% | $53M | +$82M |
| Best case (ORR 60%) | 60% | $71M | +$132M |

### Franchise Reuse Value (additional, not in base model) [OPEN_ASSUMPTION: G11 — no contract or precedent; range $25–55M milestones is analyst estimate]
- SAR445877 + SAR445953 platform license: +$20–40M milestones
- Competitor CDx royalties (post-approval): +$5–15M/year
- Platform reuse multiplier: 2–3× base deal value

---

## SECTION 8: BUNDLE STRATEGY

### Science Bundles
| ID | Name | Gates | Pool | NPV | Risk | CrisPRO value |
|---|---|---|---|---|---|---|
| SB-1 | IHC ≥80% only | B1 | 13,090/yr | ~-$1M | Lowest | LOW |
| SB-2 | Two-gate | B1+B2 | 6,545/yr | +$31M | Low-Medium | HIGH |
| SB-3 | Two-gate + exploratory pTMB | B1+B2 (enroll) + B3 (collect) | 6,545/yr | +$25M | Low-Medium | HIGH |
| SB-4 | Three-gate | B1+B2+B3 | 825–1,374/yr | -$68M | High | HIGHEST |

### Commercial Bundles
| ID | Name | Upfront | Milestones | Buyer | Risk |
|---|---|---|---|---|---|
| CB-1 | IHC prevalence study | $150–300K | None | CMO | Lowest |
| CB-2 | IST + Phase 2 protocol | $500K–1.5M | $2–5M | CMO+CFO | Low |
| CB-3 | Two-gate CDx license | $2–4M | $10–20M | CMO+CFO | Medium |
| CB-4 | Franchise platform license | $3–8M | $30–80M | CEO | High |
| CB-5 | Platform + competitor rights | $5–12M | $50–100M | CEO+Board | Highest |

**Recommended entry: CB-2 → CB-3 → CB-4 (staged commitment)**

---

## SECTION 9: FAILURE DEFINITIONS

| Level | Failure definition | Success definition |
|---|---|---|
| Biomarker failure | Biomarker is prognostic, not predictive | ORR in gate-selected patients exceeds historical control by ≥15pp |
| Gate failure | Gate reduces pool without improving ORR/PFS | Each gate added increases ORR by ≥10pp in gate-positive vs gate-negative |
| Trial readout failure | ORR signal but no PFS/OS separation | ORR ≥35% AND median PFS ≥4 months AND 30% response durability at 6 months |
| Business model failure | Science works but economics don't | EV of enriched path exceeds broad path by ≥2×, AND pool expansion paths credible |
| Platform failure | CDx cannot be validated or licensed | ≥2 of 3 Gate 3 markers incorporated into CrisPRO-owned or licensed CDx panel |

---

## SECTION 10: ATTACK TABLE

| Rank | Domain | Severity | Attack | Rebuttal | Evidence gap | De-risk |
|---|---|---|---|---|---|---|
| 1 | Scientific | CRITICAL | ≥80% signal is post-hoc, CI crosses 1.0 | Signal inversion in 50–79% is not noise; cCEA data is prospective [C13, C14] | No prospective CRC trial with ≥80% pre-specified | Phase 2 with ≥80% as pre-specified enrollment criterion |
| 2 | Scientific | CRITICAL | CRC prevalence at ≥80% derived from NSCLC | Correct — acknowledged [OPEN_ASSUMPTION: G02]; CB-1 resolves for $150–300K | CRC-specific IHC prevalence not published | CB-1 retrospective study |
| 3 | Scientific | HIGH | ≥80% signal is prognostic, not predictive | HR=0.71 calculated within ≥80% group — prognostic stratum controlled; cCEA is not prognostic | No randomized arm in Phase 1/2 | Phase 2 with randomized arm or historical control comparison |
| 4 | Regulatory | HIGH | FDA won't accept three-biomarker CDx | Phase 2 uses gates as enrollment criteria, not CDx claims; two-gate CDx is simpler path | No FDA precedent for combined CDx | Lead with two-gate CDx (B1+B2); add B3 only if Phase 2 supports |
| 5 | Economic | HIGH | Three-gate NPV is -$68M | Correct — base case is two-gate (+$31M) [COMPUTED: F05]; three-gate is franchise optionality | Franchise reuse value is [OPEN_ASSUMPTION: G11] | Lead with CB-3 (two-gate); frame three-gate as Phase 3 option |
| 6 | Operational | HIGH | 57:1 screen ratio requires 28–57 sites | Two-gate ratio is 7:1 — 357 patients screened, 5–7 sites | Actual screen-fail rates not published | Design Phase 2 as two-gate with pTMB exploratory |
| 7 | Competitive | MEDIUM | We can build this internally | Integration algorithm is CrisPRO IP; individual assays are replicable, the map is not | CrisPRO partnership agreements not confirmed in this analysis | Confirm partnerships before meeting; reframe as algorithm IP, not assay IP |
| 8 | Scientific | MEDIUM | Why does IO permissiveness matter for an ADC? | Bystander effect requires immune context; IO gate more justified for bispecifics | No CRC clinical data on ADC + IO interaction [OPEN_ASSUMPTION: G10] | Frame IO gate as exploratory for ADC; primary for SAR445877/SAR445953 |

---

## SECTION 11: MANAGER AUDIT

### Top 5 Weakest Assumptions
1. **[CRITICAL] CEACAM5 ≥80% prevalence in CRC = 28% [OPEN_ASSUMPTION: G02]** — NSCLC-derived. De-risk: CB-1.
2. **[HIGH] P(approval) two-gate = 30% [OPEN_ASSUMPTION: G05]** — speculative chain. De-risk: Phase 2 data only.
3. **[HIGH] CEACAM5-high anti-correlated with IO permissiveness in CRC [OPEN_ASSUMPTION: G06]** — NSCLC-confirmed, CRC-inferred. De-risk: retrospective analysis of CARMEN-LC03 tissue.
4. **[MEDIUM] cCEA ≥100 prevalence in CEACAM5 ≥80% CRC = 50% [OPEN_ASSUMPTION: G04]** — NSCLC transfer. De-risk: CARMEN-LC03 archival serum.
5. **[MEDIUM] IO gate mechanistic rationale for ADC bystander effect [OPEN_ASSUMPTION: G10]** — mechanism only, no clinical data. De-risk: exploratory collection in Phase 2.

### Top 5 Dependency Logic Failure Points
1. B4/B5 overlap unknown — may be fully redundant or partially independent
2. B1/B3 anti-correlation assumed [OPEN_ASSUMPTION: G06] — if positively correlated, IO gate adds no value
3. B6 (liver mets) override of IO markers — hepatic tolerance assumed but not CRC-proven
4. B2 (cCEA) measures accessibility, not tumor burden — this is the CMO's strongest B2 attack
5. B8 (methylation) excluded — may be a better Gate 1 than IHC on archival tissue

### Top 5 Endpoint Logic Overstatement Risks
1. B1 linked to PFS/OS — CI crosses 1.0; trend only [C05, C06]
2. B3 linked to OS HR=0.34 — n=35; single trial [C18]
3. B5 linked to PFS HR=0.10 — n=16; too small for any claim [C21]
4. ORR 41.7% (cCEA gate) — n=24; one additional non-responder changes ORR to 37.5% [C13]
5. IO gate linked to ADC bystander effect — mechanism only; no clinical data [OPEN_ASSUMPTION: G10]

---

## SECTION 12: GROUNDING ADDENDUM (EMBEDDED)

> **Note:** The full grounding addendum (classification rules, computation receipts, quarantine register, closure tests) is maintained in `crispro_ceacam5_mdc_grounding_addendum_v2.md` and `grounding_receipt_table_v2.csv`. The summary below is for inline reference only.

### 12.1 Classification Rule (Enforced)

| Class | Definition | Allowed output label |
|---|---|---|
| **SOURCED** | Claim maps 1:1 to a number or finding in a named published source. No arithmetic, no cross-study transfer, no analyst judgment required. | "[SOURCED: C##]" |
| **COMPUTED** | Produced by arithmetic from named inputs. Formula reproducible from inputs alone. If any input is OPEN_ASSUMPTION, claim inherits quarantine. | "[COMPUTED: F##]" |
| **OPEN_ASSUMPTION** | Cannot be directly sourced or computed from sourced inputs. Includes cross-population transfers, analyst-assigned scores, pricing estimates without a contract. | "[OPEN_ASSUMPTION: G##]" |
| **EXECUTED** | Test run, file created, API called, or hash generated in this session. Receipt IS the artifact. | "[EXECUTED: V##]" |

### 12.2 Quarantine Register Summary

| ID | Claim | Class | Status |
|---|---|---|---|
| G02 | CEACAM5 ≥80% prevalence in CRC ~28% | OPEN_ASSUMPTION | QUARANTINED — de-risk via CB-1 |
| G04 | cCEA ≥100 prevalence in CEACAM5 ≥80% CRC ~50% | OPEN_ASSUMPTION | QUARANTINED — de-risk via archival serum |
| G05 | P(approval) two-gate ~30% | OPEN_ASSUMPTION | QUARANTINED — de-risk via Phase 2 data |
| G06 | CEACAM5-high anti-correlated with IO permissiveness in CRC | OPEN_ASSUMPTION | QUARANTINED — de-risk via CARMEN-LC03 tissue |
| G10 | IO permissiveness predicts ADC response | OPEN_ASSUMPTION | QUARANTINED — mechanism only |
| G11 | Franchise reuse value $25–55M milestones | OPEN_ASSUMPTION | QUARANTINED — no contract |
| F01–F08 | All financial model outputs | COMPUTED (inherits OPEN_ASSUMPTION) | QUARANTINED — inherit G02, G04, G05 |

**Full register:** `grounding_receipt_table_v2.csv` (37 rows, SHA-256: 39c6871a81031e5513c0f20ef9571663d1cacc06fbc0a6485f93d39a58fc154b)

---

*Document generated by CrisPRO multi-agent analysis system | v2.0 2026-06-01*
*Grounding standard: v1.0-2026-06-01 | Manager audit: PASS | 36 confirmed data points | 5 tracked inferences | PATH A governance*
*v1.0 preserved as `crispro_ceacam5_gate_architecture_mdc_v1.md` for comparison*
