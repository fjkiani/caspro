# CrisPRO CEACAM5/CARMEN Capability Map
## Canonical Audit — Structured Register

**Version:** 1.0  
**Date:** 2026-06-01  
**Grounding standard:** v1.0-2026-06-01  
**Register source:** `grounding_receipt_table_v3.csv` (38 rows, SHA-256: 39c6871a...)  
**Fault log:** `ceacam5_grounding_fault_log_v1.csv` (7 faults, 2 CRITICAL)  
**Classification:** CONFIDENTIAL — INTERNAL USE ONLY  

> **Audit posture:** This document was produced after a Step 0 trust reset (re-display of all 38 register rows, spot-check of all drift-prone claims) and a Step 1 source artifact audit that identified 7 grounding faults, 2 of which are CRITICAL. The fault log is embedded in Section 5. No capability is presented at a higher evidence tier than its actual artifact state supports.

---

## EVIDENCE TIER LEGEND

| Tier | Definition | Allowed in Sanofi-facing materials |
|---|---|---|
| **SOURCED** | Maps 1:1 to a named published source. No arithmetic, no cross-study transfer. | YES — cite source |
| **COMPUTED** | Arithmetic from named inputs. Formula reproducible. If any input is OPEN_ASSUMPTION, tier = COMPUTED(QUARANTINED). | YES with quarantine disclosure |
| **COMPUTED(VERSION-AMBIGUOUS)** | Computation exists and is receipted, but the canonical value is unresolved between documented runs. | NO — quarantined pending resolution |
| **EXPECTED** | Framework exists; capability-specific run has not been executed and receipted. Analyst inference from framework logic. | NO — must be labeled as prospective/hypothesis |
| **UNVERIFIABLE** | Receipt file cited does not exist in repo. Cannot confirm claim was ever produced. | NO — remove from all materials |
| **PROHIBITED** | Numbers from unrelated trials (LATIFY ATRi/NSCLC, berzosertib/OvCa) that must not contaminate CRC CEACAM5 framing. | NEVER |

---

## SECTION 1: CAPABILITY REGISTER

### CAP-01: CARMEN-LC03 Signal Detection

| Field | Content |
|---|---|
| **Purpose** | Establish what the public CARMEN-LC03 trial data actually shows — the factual floor that Sanofi already possesses |
| **Exact inputs** | Besse et al. WCLC 2024 (CARMEN-LC03 primary results); Gazzah et al. NCT02187848 (Phase 1/2) |
| **Method** | Direct extraction from published subgroup analyses. No arithmetic. No transfer. |
| **Outputs** | ITT PFS HR 1.14 (failed); CEACAM5 50–79% PFS HR 1.38 (signal inversion); CEACAM5 ≥80% OS HR 0.71 (CI crosses 1.0); cCEA ≥100 in IHC-high ORR 41.7% vs 8.1%; 90% archival tissue; CEACAM5 prognostic in both arms |
| **Evidence tier** | **SOURCED** — all outputs map 1:1 to named published sources (C01–C17 in register) |
| **Business use** | Establishes the factual anchor for all downstream CrisPRO claims. This is what Sanofi already knows. CrisPRO adds nothing here. |
| **Unresolved dependencies** | Whether ≥80% signal is predictive vs prognostic (UNRESOLVED); fresh vs archival concordance in CRC (UNKNOWN) |

---

### CAP-02: Gate Architecture Engine (Two-Gate System)

| Field | Content |
|---|---|
| **Purpose** | Compute the optimal patient selection gate combination (IHC ≥80% + cCEA ≥100) that maximizes ORR while maintaining a viable trial pool |
| **Exact inputs** | C03 (PFS HR 1.38 for 50–79%), C06 (OS HR 0.71 for ≥80%), C13 (ORR 41.7% cCEA ≥100), C14 (ORR 8.1% cCEA <100), C15 (ρ=0.43 IHC-to-cCEA), G02 (OPEN_ASSUMPTION: ≥80% prevalence in CRC ~28%), G07 (OPEN_ASSUMPTION: cCEA ≥100 prevalence in ≥80% CRC ~50%) |
| **Method** | Pool arithmetic: Gate 1b pool = P03 × G02; Two-gate pool = Gate 1b pool × G07. Vector-Scalpel 11-dimension scoring (D1–D11) for biomarker ranking. |
| **Outputs** | Gate 1b pool: 13,090/yr (COMPUTED, inherits G02); Two-gate pool: 6,545/yr (COMPUTED, inherits G02+G07); Vector-Scalpel ranking: B2 (cCEA, 27/33) > B3 (pTMB, 23/33) > B1 (IHC, 20/33) > B4 (Immunoscore, 19/33) > B5 (DetermaIO, 15/33) |
| **Evidence tier** | **COMPUTED(QUARANTINED)** — pool sizes inherit OPEN_ASSUMPTION G02 (CRITICAL: CRC prevalence not confirmed) and G07 (HIGH: cCEA prevalence transfer from NSCLC). Vector-Scalpel scores are analyst judgments (V01, V02). |
| **Business use** | Defines the trial design recommendation (two-gate, not three-gate). Provides the CFO-facing screen ratio argument (7:1 vs 57:1). Identifies cCEA as the highest-value gate. |
| **Unresolved dependencies** | G02 (CRC prevalence at ≥80%) — de-risk via CB-1 IHC study; G07 (cCEA prevalence in ≥80% CRC) — de-risk via CARMEN-LC03 archival serum |

---

### CAP-03: Two-Layer Failure Decode — LATIFY (Receipted)

| Field | Content |
|---|---|
| **Purpose** | Demonstrate that the CrisPRO mechanism-fit engine can retrospectively identify the patient subgroup that would have responded to ceralasertib+durvalumab (LATIFY, NCT05450692), using only pre-enrollment genomic data |
| **Exact inputs** | STK11/KEAP1/KRAS co-mutation status as patient vector; LATIFY MoA tags (atr_inhibitor, checkpoint_inhibitor, ddr, immunotherapy); 8D axis values: responder [ddr=0.80, mapk=0.70, pi3k=0.20, io=0.75, vegf=0.10, her2=0.00, efflux=0.10, rss=0.00]; non-responder [ddr=0.20, mapk=0.10, pi3k=0.10, io=0.20, vegf=0.10, her2=0.00, efflux=0.40, rss=0.00] |
| **Method** | 8D cosine similarity (PATH A formula: fit = clip((p·t)/‖t‖₂, 0, 1)) between patient vector and trial MoA vector. TAG_VECTORS map MoA tags to axis contributions. Engine scored 806 trials. |
| **Outputs** | Responder score: 0.8936; Non-responder score: 0.6295; Delta: +0.3658 (latify-validation.mdc). NOTE: MANUSCRIPT.md Discussion cites delta_fit = +0.2641 — version conflict unresolved (FL-07, 8D remediation CT-03/DL-05/PC-06). |
| **Evidence tier** | **COMPUTED(VERSION-AMBIGUOUS)** — computation is receipted in `latify-validation.mdc`; specific delta value is quarantined pending vector version resolution. Do not cite a specific delta in Sanofi materials. |
| **Business use** | The LATIFY decode is the only receipted demonstration of the two-layer framework. It is the proof-of-concept anchor for the Sanofi commercial argument. It shows the engine can separate responders from non-responders using pre-enrollment data. |
| **Unresolved dependencies** | Vector version conflict (FL-07): which run is canonical — latify-validation.mdc (+0.3658) or MANUSCRIPT.md (+0.2641)? Quarantined per 8D remediation until resolved. |

---

### CAP-04: Two-Layer Failure Decode — CEACAM5/CARMEN-LC03 (NOT Receipted)

| Field | Content |
|---|---|
| **Purpose** | Apply the two-layer framework to CEACAM5/CARMEN-LC03 to show that the trial failure was predictable from pre-enrollment data — the same pattern as LATIFY |
| **Exact inputs** | CEACAM5 IHC ≥50% enrollment threshold (SOURCED: CARMEN-LC03 protocol); CEACAM5 ≥80% subgroup OS HR 0.71 (SOURCED: C06); cCEA ≥100 ORR 41.7% (SOURCED: C13); CEACAM5 MoA tags (would require: adc_target, surface_antigen, ceacam5_high) |
| **Method** | Framework exists: same 8D cosine engine as CAP-03. CEACAM5-specific patient vectors and MoA tags have NOT been defined, run, or receipted. |
| **Outputs** | **NONE — this run has not been executed.** The claim "CEACAM5 scores HIGH on Target-Lock" is analyst inference. CEACAM5 is absent from `real_target_lock_data.csv` (38-gene panel). No score exists. |
| **Evidence tier** | **EXPECTED** — the framework supports this run; the run has not been executed. The biological rationale for a HIGH score is strong (SOURCED: C06, C13, C14) but is not a system output. |
| **Business use** | This is the most commercially significant capability for the Sanofi pitch — but it cannot be presented as a receipted system output. It must be presented as: "The framework that decoded LATIFY is directly applicable to CEACAM5/CARMEN-LC03. The CEACAM5-specific run is the next execution step." |
| **Unresolved dependencies** | FL-01 (predictions_2024_retroactive.json absent); FL-04 (CEACAM5 not in Target-Lock panel); FL-05 (MANUSCRIPT.md says post-hoc only). All three must be resolved before this capability can be upgraded to COMPUTED. |

> **GROUNDING FAULT:** Prior materials (crispro_capabilities.mdc §4, MDC v1/v2 §Two-Layer) presented this capability as receipted and equivalent to LATIFY. That is false. The correct statement is: LATIFY is receipted (COMPUTED); CEACAM5/CARMEN-LC03 is a structured hypothesis (EXPECTED). These are not symmetric.

---

### CAP-05: Target-Lock Scoring Engine

| Field | Content |
|---|---|
| **Purpose** | Score any gene against the 8-step metastasis cascade to determine whether it is a genuine metastasis driver (HIGH ≥0.35) |
| **Exact inputs** | Gene symbol; Evo2-7B evolutionary likelihood scores; Enformer chromatin accessibility; AlphaFold 3 structural confidence (pLDDT, iPTM); 8-step metastasis cascade labels |
| **Method** | Multi-modal composite: 0.40 × Evo2 + 0.15 × Enformer + 0.45 × essentiality/functionality scores. AUROC 0.976 ± 0.035 on 38-gene × 8-step self-labeled panel. Hold-out AUPRC 0.790. |
| **Outputs** | Per-gene target_lock_score [0,1]; HIGH if ≥0.35. Panel: 38 genes in `real_target_lock_data.csv`. CEACAM5 is NOT in this panel. |
| **Evidence tier** | **COMPUTED** for the 38 genes in the panel (receipted in `real_target_lock_data.csv`). **EXPECTED** for CEACAM5 — not scored, not in panel. |
| **Business use** | Establishes Layer 1 of the two-layer framework. For CEACAM5, the business use is prospective: "We can score CEACAM5 and produce a receipted Target-Lock value. That run is the next step." |
| **Unresolved dependencies** | CEACAM5 run not executed (FL-04). Self-labeled panel — AUROC reflects internal consistency, not independent clinical discrimination. Hold-out AUPRC 0.790 is the honest generalization metric. |

---

### CAP-06: 8D Trial Simulator (Mechanism-Fit Engine)

| Field | Content |
|---|---|
| **Purpose** | Score any patient vector against a database of tagged clinical trials using 8D cosine similarity to identify mechanism-aligned trials |
| **Exact inputs** | Patient mechanism vector (8D: ddr, mapk, pi3k, vegf, her2, io, efflux, rss); Trial MoA tags from DB; TAG_VECTORS lookup table; PATH A formula |
| **Method** | `tags_to_vector(tags)` → 8D trial vector via TAG_VECTORS (max across tags per axis); `cosine_sim(patient_vec, trial_vec)` → fit score [0,1]; PATH A: fit = clip((p·t)/‖t‖₂, 0, 1). Scored against 806 trials (latify-validation.mdc) or 609 patched trials (trials_simulator.py). |
| **Outputs** | Ranked trial list with fit scores; target trial rank and score; delta between responder and non-responder vectors |
| **Evidence tier** | **COMPUTED** — engine is implemented in `retroactive_prediction_run.py` and `api/routers/trials_simulator.py`. PATH A formula locked 2026-04-28. LATIFY run receipted in `latify-validation.mdc`. CEACAM5 run: EXPECTED. |
| **Business use** | The engine is the core IP. It is what Sanofi cannot replicate without licensing the integration algorithm. The LATIFY receipt demonstrates it works. The CEACAM5 application is the next run. |
| **Unresolved dependencies** | CEACAM5 MoA tags not defined for the engine (what tags would represent tusamitamab ravtansine as an ADC targeting CEACAM5?); LATIFY delta version conflict (FL-07) |

---

### CAP-07: Dilution Model

| Field | Content |
|---|---|
| **Purpose** | Quantify how each gate reduces the eligible patient pool and what screen-to-enroll ratio results for a Phase 2 trial |
| **Exact inputs** | P01 (55,000 mCRC/yr, SOURCED), P02 (85% MSS, SOURCED), G02 (≥80% prevalence ~28%, OPEN_ASSUMPTION), G07 (cCEA ≥100 prevalence ~50%, OPEN_ASSUMPTION), G10 (IO anti-correlation, OPEN_ASSUMPTION) |
| **Method** | Sequential pool multiplication: No gate → Gate 1a (×0.50) → Gate 1b (×0.28) → Two-gate (×0.50) → Three-gate (×0.21–0.35). Screen ratio = pool / enrolled (n=50). |
| **Outputs** | No gate: 46,750/yr; Gate 1b: 13,090/yr; Two-gate: 6,545/yr; Three-gate: 825–1,374/yr. Screen ratios: 4:1 (Gate 1b), 7:1 (two-gate), 34–57:1 (three-gate). |
| **Evidence tier** | **COMPUTED(QUARANTINED)** — all pool sizes below Gate 1b inherit OPEN_ASSUMPTION G02 (CRITICAL). Three-gate additionally inherits G10 (HIGH). |
| **Business use** | The 7:1 vs 57:1 screen ratio is the CFO's decision input. It is the most operationally concrete output of the gate architecture. The quarantine means the absolute numbers are uncertain; the directional argument (two-gate is operationally viable; three-gate is not) is robust to the uncertainty. |
| **Unresolved dependencies** | G02 (CRC prevalence at ≥80%) — de-risk via CB-1; G07 (cCEA prevalence) — de-risk via archival serum |

---

### CAP-08: NPV / EV Financial Model

| Field | Content |
|---|---|
| **Purpose** | Compute the expected value and net present value of each gate scenario to identify the positive-NPV path |
| **Exact inputs** | F01 (drug price $80K/yr, OPEN_ASSUMPTION), F02 (treatment duration 6mo, OPEN_ASSUMPTION), F04 (penetration 45%, OPEN_ASSUMPTION), F06 (P(approval) 30%, OPEN_ASSUMPTION), G08 (two-gate pool 6,545, COMPUTED/QUARANTINED), discount rate 12%, horizon 10yr |
| **Method** | EV = pool × penetration × revenue_per_patient × P(approval). NPV = Σ[EV/(1.12^yr)] yr=7..16 − total_cost. |
| **Outputs** | Two-gate NPV: low −$67M, base +$31M, 75th-pct +$326M (F08, COMPUTED/QUARANTINED, 10 inherited OPEN_ASSUMPTIONs). Three-gate NPV: −$68M. |
| **Evidence tier** | **COMPUTED(QUARANTINED)** — 10 inherited OPEN_ASSUMPTIONs. NPV sign is not a reliable decision input until G02 and F06 are resolved. |
| **Business use** | The +$31M base case is the only positive-NPV path. The three-gate negative NPV is the CFO's objection to the IO gate as an enrollment criterion. Both directional conclusions are robust to the uncertainty even if the absolute numbers are not. |
| **Unresolved dependencies** | G02, F01, F02, F04, F06 — all OPEN_ASSUMPTION. F06 pedigree: ORR 41.7% → P(Ph2 success) ~70% (OPEN) → P(Ph3|Ph2) ~50% (OPEN) → 30%. Two ungrounded chain links. |

---

### CAP-09: cCEA CDx IP Claim

| Field | Content |
|---|---|
| **Purpose** | Establish cCEA ≥100 µg/L as CrisPRO's strongest IP anchor — the only biomarker in this analysis with prospective predictive data in the CEACAM5-high population |
| **Exact inputs** | C13 (ORR 41.7% in cCEA ≥100 + IHC-high, n=24), C14 (ORR 8.1% in cCEA <100 + IHC-high, n=37), C15 (IHC-to-cCEA ρ=0.43 — not the same biomarker), CS02 (cCEA assay cost $30–80, CMS CPT 82378) |
| **Method** | Direct source extraction (C13, C14). Gate math: cCEA ≥100 selects for functional target accessibility (shed antigen), not just protein presence. ρ=0.43 proves IHC and cCEA are measuring different things — both are required. |
| **Outputs** | ORR delta: 41.7% vs 8.1% (33.6pp separation within IHC-high patients). Assay cost: $30–80/patient. CDx candidate status: prospective predictive data exists (Phase 1/2). |
| **Evidence tier** | **SOURCED** (C13, C14, C15, CS02) — the ORR separation and assay cost are directly sourced. The CDx candidate claim is a regulatory inference (COMPUTED) from the prospective data. |
| **Business use** | This is the strongest single claim CrisPRO can make to Sanofi. It is the only gate with prospective predictive data. It is operationally simple. It is the integration algorithm IP anchor — Sanofi can run the assay; they cannot replicate the threshold optimization and combination logic without licensing. |
| **Unresolved dependencies** | n=24 in the cCEA ≥100 arm — one additional non-responder changes ORR to 37.5%. CDx regulatory path requires prospective validation in CRC (not yet done). |

---

### CAP-10: Archetype Generator (MSS CRC Patient Archetypes)

| Field | Content |
|---|---|
| **Purpose** | Define canonical patient archetypes for MSS CRC that map to the 8D mechanism vector, enabling the trial simulator to score CEACAM5-targeted trials against specific patient profiles |
| **Exact inputs** | CEACAM5 IHC status (≥80% vs 50–79%); cCEA level (≥100 vs <100); pTMB status (≥28 vs <28); liver mets status; SMAD4 status; MSS/pMMR (pre-screen) |
| **Method** | Map biomarker profile to 8D vector: CEACAM5-high → her2-axis proxy (surface antigen); cCEA-high → efflux-axis proxy (accessibility); pTMB-high → io-axis; SMAD4-loss → mapk-axis modifier. NOTE: CEACAM5 does not map cleanly to any existing 8D axis — the axis definitions were built for DDR/IO/VEGF/HER2 mechanisms, not ADC surface antigens. |
| **Outputs** | **NONE — archetype rows for CEACAM5 MSS CRC have not been defined or run.** The axis mapping for CEACAM5 as an ADC target is an open design problem. |
| **Evidence tier** | **EXPECTED** — the archetype framework exists (demonstrated for LATIFY STK11/KEAP1 archetypes); CEACAM5-specific archetypes have not been defined or receipted. The 8D axis structure may require extension to accommodate ADC surface antigen mechanisms. |
| **Business use** | Once archetypes are defined and run, this capability enables prospective patient stratification for the BreAK CRC-001 trial design. It is the bridge between the gate architecture (CAP-02) and the trial simulator (CAP-06). |
| **Unresolved dependencies** | 8D axis coverage for ADC surface antigen mechanisms (her2-axis is the closest proxy but is not semantically correct for CEACAM5); CEACAM5 MoA tags not defined in TAG_VECTORS |

---

### CAP-11: Franchise Expansion Logic (SAR445877 / SAR445953)

| Field | Content |
|---|---|
| **Purpose** | Extend the CEACAM5 gate architecture to Sanofi's bispecific pipeline (SAR445877, SAR445953 — T cell-recruiting bispecifics) where the IO permissiveness gate (pTMB, Immunoscore) is mechanistically primary rather than exploratory |
| **Exact inputs** | C18 (pTMB ≥28 OS HR=0.34, SOURCED), C20 (Immunoscore-IC-high PFS HR~0.55, SOURCED), G10 (IO anti-correlation in CRC, OPEN_ASSUMPTION), G11 (franchise reuse value $25–55M, OPEN_ASSUMPTION) |
| **Method** | Mechanistic inference: bispecifics require immune context (T cell recruitment) more than ADCs (bystander effect). The IO gate that is exploratory for tusamitamab becomes primary for SAR445877/SAR445953. No formal run or receipt. |
| **Outputs** | Franchise reuse value: $20–40M milestones + $5–15M/yr CDx royalties (OPEN_ASSUMPTION: G11). Three-gate pool for bispecifics: 825–1,374/yr (COMPUTED/QUARANTINED). |
| **Evidence tier** | **EXPECTED** — mechanistic rationale is SOURCED (C18, C20); franchise value is OPEN_ASSUMPTION (G11); no formal run or receipt for bispecific-specific gate optimization. |
| **Business use** | The franchise argument is the CB-4/CB-5 commercial path. It is the reason the platform license is worth more than the single-drug CDx license. It must be presented as prospective/expected, not as a receipted output. |
| **Unresolved dependencies** | G10 (IO anti-correlation in CRC — OPEN_ASSUMPTION); G11 (franchise value — no contract); bispecific-specific archetype definition (same gap as CAP-10) |

---

## SECTION 2: PROHIBITED ZONE

The following numbers, claims, and framings must never appear in CRC CEACAM5 / Sanofi-facing materials. Each entry includes the source of contamination and the correct replacement.

| PROHIBITED item | Source of contamination | Correct replacement |
|---|---|---|
| LATIFY delta_fit = +0.2641 or +0.3658 as a CRC CEACAM5 number | LATIFY is an NSCLC ATRi trial (ceralasertib + durvalumab). Its delta is for STK11/KEAP1/KRAS NSCLC patients, not CEACAM5 CRC patients. | "LATIFY is the receipted precedent demonstrating the framework. The CEACAM5-specific run is EXPECTED." |
| Berzosertib RS-Low HR=0.34 | NCT02595892 — platinum-resistant OvCa ATRi trial. Completely unrelated mechanism and cancer. | Remove entirely from CEACAM5 materials. |
| CEACAM5 ≥80% prevalence in CRC = 28% as a confirmed number | G02 is OPEN_ASSUMPTION (CRITICAL). The 28% figure is derived from NSCLC enrollment fractions (C07/C08). | "CRC prevalence at ≥80% is unconfirmed. Range 15–40%. De-risk via CB-1 IHC study." |
| "CrisPRO decoded CARMEN-LC03" or "CEACAM5 Target-Lock score is HIGH" as receipted claims | FL-01, FL-04 — receipt files absent, CEACAM5 not in panel. | "The framework that decoded LATIFY is applicable to CEACAM5. The CEACAM5-specific run is the next execution step." |
| NPV +$31M as a confirmed business case number | F08 inherits 10 OPEN_ASSUMPTIONs. NPV sign is unreliable until G02 and F06 are resolved. | "Base-case NPV +$31M under stated assumptions. All inputs are OPEN_ASSUMPTION. Directional conclusion (two-gate is the only positive-NPV path) is robust; absolute value is not." |
| "5 trials verified across 3 cancers, 3 mechanism classes" as a CEACAM5 claim | This refers to the broader CrisPRO retroactive validation set (predictions_2024_retroactive.json — FILE ABSENT). CEACAM5 is not one of the verified trials. | Remove from CEACAM5 materials. Reference LATIFY as the single receipted precedent. |
| 6 prospective predictions locked Feb 21, 2026 | FL-02 — predictions_2026_02_21.json does not exist in repo. | Remove until file is located and contents verified. |
| IO permissiveness predicts ADC response | G10 — OPEN_ASSUMPTION. No CRC clinical data. | "IO permissiveness is mechanistically justified for bispecifics (SAR445877/SAR445953). For tusamitamab (ADC), it is exploratory. Collect pTMB in Phase 2; do not gate enrollment on it." |

---

## SECTION 3: SYSTEM ASSEMBLY VALUE

### What Sanofi already has (public CEACAM5 ≥80% observation alone)

Sanofi possesses the following from the public CARMEN-LC03 data:
- The ≥80% post-hoc subgroup signal (OS HR=0.71, CI crosses 1.0) — **SOURCED: C06**
- The signal inversion in 50–79% (PFS HR=1.38) — **SOURCED: C03**
- The knowledge that the trial failed its primary endpoint — **SOURCED: C01**
- The knowledge that 90% of patients were assessed on archival tissue — **SOURCED: C09**
- The knowledge that CEACAM5 is prognostic in both arms — **SOURCED: C10**

**What Sanofi cannot do with this alone:**
1. They cannot determine the optimal IHC threshold (≥80% vs ≥50% vs ≥70%) without a formal gate optimization framework
2. They cannot identify cCEA as an independent, non-redundant second gate (ρ=0.43 — 81% of variance is independent) without the biomarker dependency matrix
3. They cannot compute the screen-to-enroll ratio for each gate combination without the dilution model
4. They cannot rank the three Gate 3 options (pTMB vs Immunoscore vs DetermaIO) by independence, evidence strength, and regulatory defensibility without the Vector-Scalpel framework
5. They cannot determine that the three-gate system is NPV-negative as a standalone enrollment strategy without the financial model
6. They cannot frame the IO gate as exploratory-for-ADC but primary-for-bispecific without the mechanism-fit engine

### What becomes possible when the CrisPRO system is assembled

The following capabilities only exist when the gate architecture, mechanism-fit engine, dilution model, and biomarker dependency matrix are integrated:

**1. Gate Optimality Proof (CAP-02 + CAP-07)**
The two-gate system (IHC ≥80% + cCEA ≥100) is the only gate combination with positive NPV. This is not obvious from the public data — it requires computing the pool size, screen ratio, ORR projection, and NPV for each combination simultaneously. The integration of these four components is the CrisPRO contribution.

**2. Biomarker Non-Redundancy Operationalization (CAP-02)**
ρ=0.43 between IHC and cCEA is SOURCED (C15) — Sanofi can read this number themselves. CrisPRO's contribution is not discovering the non-redundancy; it is formalizing the operational implication in the dependency matrix: that both gates are required, that dropping either gate changes the enrolled population in a quantifiable way, and that the 81% independent variance translates to a specific screen-ratio difference. Without the matrix, a Sanofi internal team would likely treat cCEA as a proxy for IHC and drop one gate on intuition rather than on a computed basis.

**3. Screen Ratio Operationalization (CAP-07) — COMPUTED(QUARANTINED)**
The 7:1 screen ratio for the two-gate system (357 patients screened for 50 enrolled) vs 57:1 for the three-gate system (2,834 screened) is the CFO's decision input. This number only exists when the dilution model is applied to the gate architecture. **Quarantine disclosure: this ratio inherits G02 (CRC prevalence at ≥80% IHC = OPEN_ASSUMPTION, CRITICAL). The absolute screen counts are unreliable until G02 is resolved via CB-1 IHC study. The directional conclusion — two-gate is dramatically more operationally efficient than three-gate — is robust to G02 uncertainty. The absolute numbers are not.** It is the single most operationally concrete output of the system, with the caveat that the absolute values require CB-1 confirmation.

**4. IO Gate Sequencing (CAP-11)**
The recommendation to collect pTMB exploratorily in the two-gate Phase 2 (rather than using it as an enrollment gate) only emerges from the NPV model showing that the three-gate system is NPV-negative as a standalone strategy. Without the financial model, a Sanofi team would likely either include or exclude the IO gate without a principled basis.

**5. Franchise Reuse Architecture (CAP-11) — EXPECTED**
The same gate architecture is designed to apply to SAR445877 and SAR445953, with the IO gate elevated from exploratory to primary. This reuse argument only exists when the mechanism-fit engine is applied across multiple CEACAM5-targeting drugs. **Prospective disclosure: CAP-11 is classified EXPECTED — the bispecific application has not been executed. The reuse architecture is the design intent, not a current output.** It is the reason the platform license (CB-4) is worth more than the single-drug CDx license (CB-3) — but that premium is contingent on executing the bispecific runs.

**6. LATIFY Precedent as Proof-of-Concept (CAP-03)**
The LATIFY decode demonstrates that the mechanism-fit engine can separate responders from non-responders using pre-enrollment genomic data. This is the only receipted demonstration of the two-layer framework. It is the proof that the CEACAM5 application (CAP-04) is not speculative — the engine works; the CEACAM5-specific run is the next step.

### What the system cannot yet claim (EXPECTED capabilities)

The following are prospective extensions that require execution before they can be presented as system outputs:

- CEACAM5 Target-Lock score (CAP-05 extension) — requires adding CEACAM5 to the panel and running the engine
- CEACAM5/CARMEN-LC03 two-layer decode receipt (CAP-04) — requires defining CEACAM5 MoA tags and running the 8D cosine engine
- MSS CRC patient archetypes (CAP-10) — requires defining 8D vectors for CEACAM5-high/low patient profiles
- Franchise reuse value (CAP-11) — requires a contract or comparable deal precedent

---

## SECTION 4: COMMERCIAL DELTA

### Why the assembled system is stronger than the public ≥80% observation alone

The public CEACAM5 ≥80% observation is a post-hoc subgroup signal with a CI that crosses 1.0. Any Sanofi internal team can read the CARMEN-LC03 paper and see it. The observation alone does not tell Sanofi what to do next.

The CrisPRO system adds four things that the public observation cannot provide:

**1. The second gate (cCEA) — the only prospective predictive data in this analysis**
The ORR 41.7% vs 8.1% separation within IHC-high patients (C13, C14) is the strongest single number in the entire analysis. It is prospective (Phase 1/2 data, not post-hoc). It is operationally simple ($30–80/test). It is the CDx IP anchor. Sanofi can run the assay; they cannot replicate the threshold optimization and combination logic without licensing the integration algorithm.

**2. The gate combination proof — why two gates, not one or three**
The NPV model shows that the ≥80% gate alone is breakeven (−$1M), the two-gate system is positive (+$31M base case), and the three-gate system is negative (−$68M) as a standalone enrollment strategy. This is not obvious from the public data. It requires the financial model applied to the dilution model applied to the gate architecture. The directional conclusion is robust even if the absolute numbers are quarantined.

**3. The screen ratio operationalization — the CFO's decision input**
7:1 vs 57:1 is the number that determines whether a Phase 2 is operationally feasible. The two-gate system requires 357 patients screened for 50 enrolled — 5–7 sites. The three-gate system requires 2,834 screened — 28–57 sites. This is the difference between a fundable Phase 2 and an unfundable one.

**4. The LATIFY precedent — proof the framework works**
The LATIFY decode is the only receipted demonstration that the mechanism-fit engine can separate responders from non-responders using pre-enrollment data. It is the proof-of-concept that makes the CEACAM5 application credible. Without it, the CEACAM5 claim is pure hypothesis. With it, the CEACAM5 claim is a structured hypothesis with a receipted precedent in a different cancer.

### The corrected moat statement

**What the moat is NOT:**
"CrisPRO already computed CEACAM5 Target-Lock and decoded CARMEN-LC03 as a receipted system output."

**What the moat IS:**
"CrisPRO has a grounded gate architecture (SOURCED: C13, C14, C15), a receipted mechanism-fit precedent in LATIFY (COMPUTED: latify-validation.mdc), and a strong structured hypothesis for CEACAM5/CARMEN-LC03 that requires one execution step to receipt. The integration algorithm — combining gate optimization, dilution modeling, biomarker dependency ranking, and mechanism-fit scoring — is the IP that Sanofi cannot replicate without licensing. The individual assays are replicable; the map is not."

---

## SECTION 5: FAULT LOG SUMMARY

Seven grounding faults were identified during the Step 1 source artifact audit. Two are CRITICAL and affect the commercial center of the Sanofi argument.

| Fault ID | Severity | Artifact | Tier Claimed | Correct Tier |
|---|---|---|---|---|
| FL-01 | **CRITICAL** | predictions_2024_retroactive.json (absent) | COMPUTED/receipted | EXPECTED |
| FL-02 | HIGH | predictions_2026_02_21.json (absent) | EXECUTED/locked | UNVERIFIABLE |
| FL-03 | MEDIUM | latify_curl_receipts.json (absent; MDC exists) | EXECUTED | COMPUTED(PARTIAL) |
| FL-04 | **CRITICAL** | CEACAM5 absent from real_target_lock_data.csv | COMPUTED/scored | EXPECTED |
| FL-05 | HIGH | MANUSCRIPT.md internal contradiction | COMPUTED/validated | LATIFY=COMPUTED; CEACAM5=EXPECTED |
| FL-06 | HIGH | MDC v2 symmetric LATIFY/CEACAM5 framing | COMPUTED (both) | LATIFY=COMPUTED; CEACAM5=EXPECTED |
| FL-07 | MEDIUM | LATIFY delta version conflict (+0.3658 vs +0.2641) | COMPUTED (single value) | COMPUTED(VERSION-AMBIGUOUS) |

Full fault log: `ceacam5_grounding_fault_log_v1.csv`

**Required actions before any Sanofi-facing use of this capability map:**
1. Remove all language stating CEACAM5 has a receipted Target-Lock score (FL-04)
2. Remove all language citing predictions_2024_retroactive.json or predictions_2026_02_21.json (FL-01, FL-02)
3. Correct MANUSCRIPT.md to distinguish LATIFY (COMPUTED) from CEACAM5 (EXPECTED) (FL-05)
4. Amend MDC v2 §Two-Layer to explicitly state the asymmetric evidence tiers (FL-06)
5. Resolve LATIFY delta version conflict before citing any specific delta value (FL-07)

---

## SECTION 6: CAPABILITY SUMMARY TABLE

| Cap ID | Name | Evidence Tier | Sanofi-Facing? | Key Dependency |
|---|---|---|---|---|
| CAP-01 | CARMEN-LC03 Signal Detection | SOURCED | YES | None — public data |
| CAP-02 | Gate Architecture Engine | COMPUTED(QUARANTINED) | YES with disclosure | G02 (CRC prevalence) |
| CAP-03 | Two-Layer Decode — LATIFY | COMPUTED(VERSION-AMBIGUOUS) | YES, no specific delta | FL-07 version conflict |
| CAP-04 | Two-Layer Decode — CEACAM5 | **EXPECTED** | NO — prospective only | FL-01, FL-04, FL-05 |
| CAP-05 | Target-Lock Engine | COMPUTED (38 genes); EXPECTED (CEACAM5) | YES (38 genes); NO (CEACAM5) | CEACAM5 run not executed |
| CAP-06 | 8D Trial Simulator | COMPUTED | YES | CEACAM5 MoA tags undefined |
| CAP-07 | Dilution Model | COMPUTED(QUARANTINED) | YES with disclosure | G02, G07 |
| CAP-08 | NPV/EV Model | COMPUTED(QUARANTINED) | YES with disclosure | 10 OPEN_ASSUMPTIONs |
| CAP-09 | cCEA CDx IP Claim | SOURCED + COMPUTED | YES — strongest claim | n=24 in cCEA arm |
| CAP-10 | Archetype Generator | EXPECTED | NO — prospective only | 8D axis gap for ADC |
| CAP-11 | Franchise Expansion | EXPECTED | NO — prospective only | G10, G11, no contract |

---

*Capability map v1.0 — 2026-06-01 | CrisPRO internal use only | Grounding standard v1.0-2026-06-01*  
*Fault log: ceacam5_grounding_fault_log_v1.csv | Register: grounding_receipt_table_v3.csv*  
*PATH A governance | Manager audit: PASS on register; FAULT on CEACAM5 two-layer decode tier*
