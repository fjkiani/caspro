# CrisPRO CEACAM5 Gate Architecture MDC — Grounding Addendum
## Section 12: Claim Classification, Quarantine Register, and Computation Receipts

**Version:** 2.1 (corrects v1.0 errors in G08 range and F08 high-end NPV; corrects G07 contamination map omission of CS06; corrects F06 timeline overstatement)  
**Date:** 2026-06-01  
**Supersedes:** `crispro_ceacam5_mdc_grounding_addendum_v1.md` and all narrative `[INFERENCE]` labels in `crispro_ceacam5_gate_architecture_mdc_v1.md`  
**Grounding standard:** v1.0-2026-06-01  
**Receipt artifact:** `grounding_receipt_table_v2.csv`  
**SHA-256:** 39c6871a81031e5513c0f20ef9571663d1cacc06fbc0a6485f93d39a58fc154b  

**Corrections from v1.0:**
- G08 low-end range corrected from 1,576 to 2,454 (v1 used G07_low ≈ 22.5%, inconsistent with quarantine register range of 35–60%)
- F08 "high" NPV relabeled: $1,104M was a joint-all-optimistic scenario (theoretical ceiling), not a realistic high. Replaced with 75th-percentile NPV = $326M (each assumption at midpoint of base–high)
- Screen-to-enroll ratios (7:1, 57:1) now include explicit derivation receipts

---

## 12.1 Classification Rule (Enforced)

| Class | Definition | Allowed output label |
|---|---|---|
| **SOURCED** | Claim maps 1:1 to a number or finding in a named published source. No arithmetic, no cross-study transfer, no analyst judgment required. A derived statement is NOT SOURCED even if the source document exists. | "Confirmed" |
| **COMPUTED** | Produced by arithmetic from named inputs. Formula reproducible from inputs alone. If any input is OPEN_ASSUMPTION, claim is quarantined and carries inherited assumption IDs. | "Estimated" |
| **OPEN_ASSUMPTION** | Cannot be directly sourced or computed from sourced inputs. Includes cross-population transfers, analyst-assigned scores, pricing estimates without a contract, probability estimates without a base rate. | "Question / Pending" |
| **EXECUTED** | Test run, file created, API called, or hash generated in this session. Receipt IS the artifact. | "Passed" |

**Upgrade rule:** No claim may be upgraded from OPEN_ASSUMPTION to COMPUTED or SOURCED without a receipt. No COMPUTED claim may omit its input chain.

---

## 12.2 Claim Register Summary

| Class | Count | Quarantined |
|---|---|---|
| SOURCED | 15 | 0 |
| COMPUTED | 12 | 10 |
| OPEN_ASSUMPTION | 10 | 10 |
| EXECUTED | 0 | — |
| **Total** | **37** | **21** |

**Clean claims (not quarantined): 16**  
P01, P02, P03, G04, G05, G06, G09, CL01, CL02, CL03, CL04, IO01, IO02, IO03, CS01, CS02

---

## 12.3 Computation Receipts

### Population base (clean)

| ID | Formula | Low | Base | High | Inherited |
|---|---|---|---|---|---|
| P03 | P01 × P02 = 55,000 × 0.85 | 42,640 | **46,750** | 50,460 | None |

### Gate pool chain (all quarantined — inherit G02 CRITICAL)

| ID | Formula | Low | Base | High | Inherited |
|---|---|---|---|---|---|
| G03 | P03 × G02 | 7,013 | **13,090** | 18,700 | G01, G02 |
| G08 | G03 × G07 | 2,454 | **6,545** | 11,220 | G01, G02, G07 |
| G11 | G08 × G09 × (1−disc) | 550 | **825** | 2,917 | G01, G02, G07, G10 |

*G08 low = 7,013 × 0.35 = 2,454. G08 high = 18,700 × 0.60 = 11,220.*

### Screen-to-enroll ratios (COMPUTED from pool fractions)

| Gate | Derivation | Screened (base) | Ratio |
|---|---|---|---|
| Two-gate | 50 / (G08_base / P03_base) = 50 / (6,545 / 46,750) = 50 / 0.140 | 357 | **7.1:1** |
| Three-gate | 50 / (G11_base / P03_base) = 50 / (825 / 46,750) = 50 / 0.0176 | 2,834 | **56.7:1** |

*These ratios are COMPUTED from pool fractions, not arbitrary. They inherit the same OPEN_ASSUMPTIONs as G08 and G11.*

### Financial chain (all quarantined)

| ID | Formula | Low | Base | 75th-pct | Inherited |
|---|---|---|---|---|---|
| F03 | F01 × F02 | $19,800 | **$40,000** | $70,313 | F01, F02 |
| F05 | G08 × F04 × F03 | $12M | **$118M** | $390M | G01,G02,G07,F01,F02,F04 |
| F07 | F05 × F06 | $1.2M | **$35M** | $156M | +F06 |
| F08 | NPV (yr 7–16, 12% disc, −$70M cost) | −$67M | **+$31M** | +$326M | +disc_rate, horizon, cost |

**F08 note:** The 75th-percentile NPV ($326M) uses each assumption at the midpoint of its base–high range simultaneously. The theoretical ceiling ($1,104M) uses all assumptions at their optimistic extremes simultaneously and is not a realistic scenario. **NPV sign is not a reliable decision input until G02 (CEACAM5 ≥80% CRC prevalence) and F06 (P(approval)) are resolved.**

### Phase 2 cost stack

| ID | Formula | Low | Base | High | Inherited |
|---|---|---|---|---|---|
| CS05 | 357 × (CS01+CS02) + 50 × CS04 | $1.6M | **$2.6M** | $5.1M | G01,G02,G07,CS04 |
| CS06 | 2,834 × (CS01+CS02+CS03) + 50 × CS04 | $4.3M | **$9.7M** | $17.5M | G01,G02,G07,G10,CS03,CS04 |

### Vector scores (analyst judgments — directional only)

| ID | Formula | Output | Sensitivity |
|---|---|---|---|
| V01 | Sum of 11 dimension scores | B2=27/33 | Scores are analyst judgments, not measurements |
| V02 | Weighted sum (6 criteria) | B2>B1>B3>B4>B5 | B1/B2 swap if predictive weight drops from 0.25 to 0.15 |

---

## 12.4 Quarantine Register

### Priority 1 — CRITICAL (resolve before any business case presentation)

**G02 — CEACAM5 ≥80% IHC prevalence in MSS CRC ~28%**  
Range: 15–40% | Contaminates: G03, G08, G11, F05, F07, F08, CS05, CS06  
Closure: Retrospective IHC study in ≥200 MSS CRC FFPE samples at ≥80% threshold. OR: published CRC-specific IHC prevalence from a tusamitamab CRC cohort enrollment report.  
*If G02 = 15%: two-gate pool = 2,454/year, NPV turns negative. If G02 = 40%: pool = 11,220/year, NPV strongly positive. The gate recommendation is directionally stable; the business case is not.*

**G01 — CEACAM5 ≥50% IHC prevalence in MSS CRC ~50%**  
Range: 40–65% | Contaminates: G02 (upstream), G03, G08, G11, F05, F07, F08, CS05, CS06  
Closure: Same study as G02 closure, with ≥50% threshold reported separately.

### Priority 2 — HIGH (resolve before Phase 2 design)

**G07 — cCEA ≥100 prevalence in CEACAM5 ≥80% CRC ~50%**  
Range: 35–60% | Contaminates: G08, G11, F05, F07, F08, CS05, CS06  
Closure: Serum CEA measurement in ≥100 MSS CRC patients with confirmed CEACAM5 ≥80% IHC. Retrospective from banked serum.  
Timeline: 6–18 months.

**F06 — P(approval) two-gate = 30%**  
Range: 10–50% | Contaminates: F07, F08  
Closure: Published meta-analysis of Phase 2→3 success rates for enriched-population oncology ADCs.  
**Timeline: 1–4 weeks (literature search required; a specific meta-analysis for enriched-population ADC Ph2→3 success rates is not confirmed to exist — Wong et al. 2019 and Hay et al. 2014 cover oncology broadly, not ADC-enriched populations specifically). This is the second biggest driver of NPV sign.**

### Priority 3 — MEDIUM (resolve before three-gate decision)

**G10 — CEACAM5-high anti-correlated with IO permissiveness in CRC**  
Range: 0–60% discount on three-gate pool | Contaminates: G11 only  
Closure: Co-expression analysis of CEACAM5 IHC and pTMB/Immunoscore in ≥100 MSS CRC samples.  
*Not in the two-gate pedigree chain. Only relevant if three-gate is pursued.*

### Priority 4 — Not resolvable pre-approval (must remain labeled)

**F01** (drug price $80K/yr): Range $60K–$150K. Closure: Sanofi WAC at approval.  
**F02** (treatment duration 6 mo): Range 4–9 mo. Closure: CRC-specific Phase 2 PFS data.  
**F04** (market penetration 45%): Range 25–65%. Closure: Market research or comparable ADC launch data.

### Priority 5 — Operational (resolvable via contract/budget)

**CS03** (pTMB panel cost $1,500–3,000): Range $800–$4,000. Closure: Trial contract pricing.  
**CS04** (Phase 2 treatment cost $50K/patient): Range $30K–$100K. Closure: Sanofi internal budget.

---

## 12.5 What Remains Valid Without Resolving Any Assumption

The mechanistic and clinical rationale for the two-gate architecture (B1+B2) rests entirely on SOURCED claims:

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

**The business case (pool size, EV, NPV) rests on OPEN_ASSUMPTIONs and must be presented as a model with named assumptions, not as a conclusion.**

---

## 12.6 Manager Agent Rule

Any output produced after this addendum must:
1. Cite the claim ID (P01, G02, F06, etc.) when referencing a number
2. State the claim type inline
3. Never present a COMPUTED output that inherits an OPEN_ASSUMPTION as a "result" — label it "estimated, pending [assumption ID] resolution"
4. Never add a new claim without classifying it first
5. Never upgrade an OPEN_ASSUMPTION without a receipt

---

*Addendum v2.0 — 2026-06-01 | Receipt SHA-256: 39c6871a81031e5513c0f20ef9571663d1cacc06fbc0a6485f93d39a58fc154b*  
*v1.0 SHA-256 (superseded): 111cada017ca1e44fc9c2420717245441bc4a3f930b87dc958e1a0a0140655ab*
