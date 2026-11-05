# CrisPRO CEACAM5 Gate Architecture MDC — Grounding Addendum
## Section 12: Claim Classification, Quarantine Register, and Computation Receipts

**Version:** 1.0  
**Date:** 2026-06-01  
**Supersedes:** All narrative `[INFERENCE]` labels in `crispro_ceacam5_gate_architecture_mdc_v1.md`  
**Grounding standard:** v1.0-2026-06-01  
**Receipt artifact:** `grounding_receipt_table_v1.csv`  
**SHA-256:** 111cada017ca1e44fc9c2420717245441bc4a3f930b87dc958e1a0a0140655ab  

---

## 12.1 Classification Rule (Enforced)

| Class | Definition | Allowed output label |
|---|---|---|
| **SOURCED** | Claim maps 1:1 to a number or finding in a named published source. No arithmetic, no cross-study transfer, no analyst judgment required. | "Confirmed" |
| **COMPUTED** | Produced by arithmetic from named inputs. Formula reproducible from inputs alone. If any input is OPEN_ASSUMPTION, claim is quarantined and carries inherited assumption IDs. | "Estimated" |
| **OPEN_ASSUMPTION** | Cannot be directly sourced or computed from sourced inputs. Includes cross-population transfers, analyst-assigned scores, pricing estimates without a contract, probability estimates without a base rate. | "Question / Pending" |
| **EXECUTED** | Test run, file created, API called, or hash generated in this session. Receipt IS the artifact. | "Passed" |

**Rule:** No claim may be upgraded from OPEN_ASSUMPTION to COMPUTED or SOURCED without a receipt. No COMPUTED claim may omit its input chain. Any COMPUTED claim that inherits an OPEN_ASSUMPTION must carry that inheritance explicitly.

---

## 12.2 Claim Register Summary

| Class | Count | Quarantined |
|---|---|---|
| SOURCED | 15 | 0 |
| COMPUTED | 12 | 10 (all that inherit any OPEN_ASSUMPTION) |
| OPEN_ASSUMPTION | 10 | 10 |
| EXECUTED | 0 | — |
| **Total** | **37** | **21** |

**Clean claims (not quarantined): 16**  
These are: P01, P02, P03, G04, G05, G06, G09, CL01, CL02, CL03, CL04, IO01, IO02, IO03, CS01, CS02

---

## 12.3 Computation Receipts (COMPUTED claims)

All formulas executed in code. Inputs named with proof type. Ranges propagated from inherited OPEN_ASSUMPTIONs.

### P03 — MSS mCRC US pool
**Formula:** P01 × P02 = 55,000 × 0.85  
**Inputs:** P01 (SOURCED: SEER 2024), P02 (SOURCED: Le et al. NEJM 2015)  
**Output:** 46,750/year | Range: 42,640–50,460  
**Inherited assumptions:** None  

### G03 — Gate 1b pool (CEACAM5 ≥80%)
**Formula:** P03 × G02 = 46,750 × 0.28  
**Inputs:** P03 (COMPUTED, clean), G02 (OPEN_ASSUMPTION, CRITICAL)  
**Output:** 13,090/year | Range: **7,013–18,700** (G02 drives entire range)  
**Inherited assumptions:** G01, G02  

### G08 — Two-gate pool
**Formula:** G03 × G07 = 13,090 × 0.50  
**Inputs:** G03 (COMPUTED, inherits G02), G07 (OPEN_ASSUMPTION)  
**Output:** 6,545/year | Range: **2,454–11,220**  
**Inherited assumptions:** G01, G02, G07  

### G11 — Three-gate pool
**Formula:** G08 × G09 × (1 − anti-corr discount) = 6,545 × 0.21 × [0.40–1.00]  
**Inputs:** G08 (COMPUTED, inherits G01/G02/G07), G09 (SOURCED: CO.26), G10 (OPEN_ASSUMPTION)  
**Output:** 825/year base | Range: **550–2,917**  
**Inherited assumptions:** G01, G02, G07, G10  

### F03 — Revenue per patient
**Formula:** F01 × F02 = $80,000 × 0.50  
**Inputs:** F01 (OPEN_ASSUMPTION), F02 (OPEN_ASSUMPTION)  
**Output:** $40,000 | Range: $19,800–$112,500  
**Inherited assumptions:** F01, F02  

### F05 — Peak annual revenue (two-gate, US)
**Formula:** G08 × F04 × F03 = 6,545 × 0.45 × $40,000  
**Inputs:** G08 (COMPUTED, inherits G01/G02/G07), F04 (OPEN_ASSUMPTION), F03 (COMPUTED, inherits F01/F02)  
**Output:** $118M | Range: **$12M–$820M**  
**Inherited assumptions:** G01, G02, G07, F01, F02, F04  

### F07 — Expected Value (two-gate)
**Formula:** F05 × F06 = $118M × 0.30  
**Inputs:** F05 (COMPUTED, inherits 6 OPEN_ASSUMPTIONs), F06 (OPEN_ASSUMPTION)  
**Output:** $35M | Range: **$1.2M–$410M**  
**Inherited assumptions:** G01, G02, G07, F01, F02, F04, F06  

### F08 — NPV (two-gate base case)
**Formula:** Σ[(F05 × F06) / (1.12^yr)] for yr=7..16, minus $70M  
**Inputs:** F07 (COMPUTED, inherits 7 OPEN_ASSUMPTIONs), discount rate 12% (OPEN_ASSUMPTION), 10-year horizon (OPEN_ASSUMPTION), total cost $70M (OPEN_ASSUMPTION)  
**Output:** +$31M | Range: **−$67M to +$1,104M**  
**⚠ NPV sign is NOT a reliable decision input until G02 and F06 are resolved.**  
**Inherited assumptions:** G01, G02, G07, F01, F02, F04, F06, discount_rate, horizon, total_cost  

### CS05 — Two-gate Phase 2 total cost
**Formula:** (350 screened × $280/patient) + (50 enrolled × $50,000)  
**Inputs:** CS01 (SOURCED), CS02 (SOURCED), CS04 (OPEN_ASSUMPTION)  
**Output:** $2.6M | Range: $1.6M–$5.1M  
**Inherited assumptions:** G01, G02, G07 (screen ratio), CS04  

### CS06 — Three-gate Phase 2 total cost
**Formula:** (2,850 screened × $2,530/patient) + (50 enrolled × $50,000)  
**Inputs:** CS01 (SOURCED), CS02 (SOURCED), CS03 (OPEN_ASSUMPTION), CS04 (OPEN_ASSUMPTION)  
**Output:** $9.7M | Range: $4.3M–$17.5M  
**Inherited assumptions:** G01, G02, G07, G10, CS03, CS04  

### V01 — B2 (cCEA) Vector B score
**Formula:** Sum of 11 analyst-assigned dimension scores [2,3,3,2,3,3,3,3,1,2,2] = 27/33  
**Inputs:** All 11 dimension scores are analyst judgments  
**Output:** 27/33 | Ranking direction (B2 > B3 > B1 > B4 > B5) is directionally supported but not a statistical result  
**Inherited assumptions:** All 11 dimension scores  

### V02 — Weighted gate ranking
**Formula:** Weighted sum across 6 criteria with analyst-assigned weights  
**Inputs:** V01 dimension scores (analyst judgments), 6 criterion weights (analyst judgments)  
**Output:** B2=4.72, B1=3.60, B3=3.19, B4=2.86, B5=2.44  
**Sensitivity:** If predictive weight drops from 0.25 to 0.15 and evidence rises from 0.25 to 0.35, B1 and B2 swap positions  
**Inherited assumptions:** All V01 scores, all 6 weights  

---

## 12.4 Quarantine Register (OPEN_ASSUMPTION claims)

### G01 — CEACAM5 ≥50% IHC prevalence in MSS CRC ~50%
**Risk:** HIGH | **Priority:** 1 (resolve before any business case presentation)  
**Range:** 40–65%  
**Downstream contamination:** G02, G03, G08, G11, F05, F07, F08, CS05, CS06  
**Closure test:** Retrospective IHC analysis of ≥200 MSS CRC FFPE tumor samples with CEACAM5 H-score at ≥50% and ≥80% thresholds. OR: published CRC-specific IHC prevalence table from a tusamitamab CRC cohort enrollment report.  
**Timeline:** 6–12 months (retrospective study)  

### G02 — CEACAM5 ≥80% IHC prevalence in MSS CRC ~28%
**Risk:** CRITICAL | **Priority:** 1  
**Range:** 15–40%  
**Downstream contamination:** G03, G08, G11, F05, F07, F08, CS05, CS06  
**Closure test:** Same study as G01, with ≥80% threshold reported separately. This is the single most consequential unverified input. If G02 = 15%, two-gate pool = 2,454/year and NPV turns negative. If G02 = 40%, pool = 11,220/year and NPV is strongly positive.  
**Timeline:** Same as G01  

### G07 — cCEA ≥100 prevalence in CEACAM5 ≥80% CRC ~50%
**Risk:** HIGH | **Priority:** 2  
**Range:** 35–60%  
**Downstream contamination:** G08, G11, F05, F07, F08, CS05  
**Closure test:** Serum CEA measurement in ≥100 MSS CRC patients with confirmed CEACAM5 ≥80% IHC. Retrospective from banked serum in existing CRC cohort.  
**Timeline:** 6–18 months  

### G10 — CEACAM5-high anti-correlated with IO permissiveness in CRC
**Risk:** HIGH | **Priority:** 3 (only relevant for three-gate)  
**Range:** 0–60% discount on three-gate pool  
**Downstream contamination:** G11 only  
**Closure test:** Co-expression analysis of CEACAM5 IHC and pTMB/Immunoscore in ≥100 MSS CRC samples.  
**Timeline:** 12–24 months  

### F01 — Drug price $80,000/year
**Risk:** MEDIUM | **Priority:** 4 (not resolvable pre-approval)  
**Range:** $60K–$150K/year  
**Downstream contamination:** F03, F05, F07, F08  
**Closure test:** Sanofi internal pricing model or published WAC at approval.  

### F02 — Treatment duration 6 months
**Risk:** MEDIUM | **Priority:** 4 (not resolvable pre-Phase 2)  
**Range:** 4–9 months for responders  
**Downstream contamination:** F03, F05, F07, F08  
**Closure test:** Median PFS from CRC-specific tusamitamab Phase 2 cohort.  

### F04 — Peak market penetration 45%
**Risk:** HIGH | **Priority:** 4 (not resolvable pre-approval)  
**Range:** 25–65%  
**Downstream contamination:** F05, F07, F08  
**Closure test:** Market research or comparable ADC launch data in enriched CRC population.  

### F06 — P(approval) two-gate = 30%
**Risk:** HIGH | **Priority:** 2 (resolvable via literature NOW)  
**Range:** 10–50%  
**Downstream contamination:** F07, F08  
**Closure test:** Published meta-analysis of Phase 2→3 success rates for enriched-population oncology ADCs (e.g., Wong et al. Biostatistics 2019 or equivalent).  
**Timeline:** Immediate — literature search only  

### CS03 — pTMB NGS panel cost $1,500–3,000/patient
**Risk:** LOW | **Priority:** 5 (only relevant for three-gate)  
**Range:** $800–$4,000  
**Downstream contamination:** CS06 only  
**Closure test:** Confirmed trial contract pricing from CRC Phase 2.  

### CS04 — Phase 2 treatment cost ~$50,000/enrolled patient
**Risk:** MEDIUM | **Priority:** 5  
**Range:** $30K–$100K  
**Downstream contamination:** CS05, CS06  
**Closure test:** Sanofi internal trial budget or published ADC Phase 2 cost benchmarks.  

---

## 12.5 What Remains Valid Without Resolving Any Assumption

The following claims are SOURCED and unaffected by any quarantine:

| ID | Claim | Source |
|---|---|---|
| G04 | cCEA ≥100 in IHC-high: ORR 41.7% (10/24) | Gazzah et al. C13 |
| G05 | cCEA <100 in IHC-high: ORR 8.1% (3/37) | Gazzah et al. C14 |
| G06 | IHC-to-cCEA ρ = 0.43 | Gazzah et al. C15 |
| G09 | pTMB ≥28 prevalence in MSS CRC ~21% | CO.26 C34 |
| CL01 | CEACAM5 50–79% PFS HR = 1.38 (0.92–2.07) | Besse WCLC 2024 C03 |
| CL02 | CEACAM5 ≥80% OS HR = 0.71 (0.49–1.03) | Besse WCLC 2024 C06 |
| CL03 | CEACAM5 prognostic in both CARMEN-LC03 arms | Besse WCLC 2024 C10 |
| CL04 | 90% assessed on archival tissue | Besse WCLC 2024 C09 |
| IO01 | pTMB ≥28: OS HR=0.34 (n=35) | CO.26 C18 |
| IO02 | Immunoscore-IC-high: PFS HR~0.55 | AtezoTRIBE C20 |
| IO03 | DetermaIO IOOPT+: PFS HR=0.10 (n=16) | AtezoTRIBE C21 |
| CS01 | CEACAM5 IHC cost $150–300/patient | CMS fee schedule |
| CS02 | cCEA serum assay cost $30–80/patient | CMS fee schedule |

**The mechanistic and clinical rationale for the two-gate architecture (B1+B2) rests entirely on SOURCED claims.** The business case (pool size, EV, NPV) rests on OPEN_ASSUMPTIONs and must be presented as a model with named assumptions, not as a conclusion.

---

## 12.6 Manager Agent Rule (Active for All Downstream Outputs)

Any output produced after this addendum must:
1. Cite the claim ID (P01, G02, F06, etc.) when referencing a number
2. State the claim type (SOURCED / COMPUTED / OPEN_ASSUMPTION) inline
3. Never present a COMPUTED output that inherits an OPEN_ASSUMPTION as a "result" — label it "estimated, pending [assumption ID] resolution"
4. Never add a new claim without classifying it first
5. Never upgrade an OPEN_ASSUMPTION to SOURCED or COMPUTED without a receipt

---

*Addendum v1.0 — 2026-06-01 | Receipt SHA-256: 111cada017ca1e44fc9c2420717245441bc4a3f930b87dc958e1a0a0140655ab*
