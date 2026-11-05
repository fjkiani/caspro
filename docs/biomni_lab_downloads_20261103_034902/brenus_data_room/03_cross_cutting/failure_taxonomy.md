# Failure Taxonomy — 7 CORE Comparator Trials
**CrisPRO Cross-Cutting Analysis | Brenus Pharma Data Room**
**Source:** MSS_CRC_IO_comparator_trials_agent3.md (VERIFIED) + brenus_comparator_path_a_report.md (LOCKED)

---

## Overview

Every IO trial that has failed in MSS/pMMR colorectal cancer has failed for a reason that was, in retrospect, identifiable before the trial completed. CrisPRO's failure domain taxonomy maps each trial to the specific mechanism of failure. This is not hindsight — it is the analytical framework that BreAK CRC-001 must use to avoid replicating the same failures.

Eight failure domains have been identified across the MSS CRC IO literature. The 7 CORE comparator trials collectively cover 6 of the 8 domains. BreAK CRC-001 is currently at risk of replicating 3 of them.

---

## Failure Domain Definitions

| Domain | Code | Definition |
|---|---|---|
| Biology | D1 | The mechanism of action was scientifically rational but failed to overcome MSS CRC's structural immunosuppression in humans |
| Selection | D2 | Broad or incorrect patient enrollment diluted the IO signal to statistical noise |
| Architecture | D3 | Trial design (single-arm, underpowered, wrong endpoint) made results uninterpretable |
| Biomarker | D4 | No predictive biomarker was pre-specified; post-hoc analyses generated hypotheses but not evidence |
| Attribution | D5 | IO contribution could not be separated from chemotherapy backbone activity |
| Interpretability | D6 | Results were ambiguous due to design gaps (no control arm, data-driven thresholds, immature data) |
| Translational | D7 | Preclinical models did not recapitulate human MSS CRC biology; murine synergy did not translate |
| Systemic | D8 | External factors (company bankruptcy, regulatory issues, infrastructure collapse) terminated the program |

---

## Trial-Domain Matrix

| CORE | Trial | D1 Biology | D2 Selection | D3 Architecture | D4 Biomarker | D5 Attribution | D6 Interpretability | D7 Translational | D8 Systemic |
|---|---|---|---|---|---|---|---|---|---|
| CORE-01 | QUILT-2.004 | ✓ | | ✓ | | | | | |
| CORE-02 | GRANITE GO-010 | | | | | | ✓ | | ✓ |
| CORE-03 | GVAX + CY + Pembro | ✓ | ✓ | | | | | | |
| CORE-04 | IMblaze370 | ✓ | | | | | | ✓ | |
| CORE-05 | AtezoTRIBE | | ✓ | | | ✓ | | | |
| CORE-06 | MEDITREME | | | ✓ | | ✓ | | | |
| CORE-07 | CCTG CO.26 | | ✓ | | | | ✓ | | |
| **Count** | | **3** | **3** | **2** | **0** | **2** | **2** | **1** | **1** |

---

## Domain-by-Domain Analysis

### D1 Biology — 3 trials (QUILT-2.004, GVAX, IMblaze370)

**The pattern:** The mechanism was scientifically rational. The preclinical data was compelling. The trial was well-executed. The drug failed because human MSS CRC biology is more immunosuppressive than any preclinical model predicted.

**QUILT-2.004:** CEA-specific T-cell responses generated in >80% of patients. No PFS benefit. The CEA antigen is a self-antigen with central tolerance — the immune system has been trained to tolerate it. Even with PD-L1 blockade, the vaccine-primed T cells could not overcome MSS TME suppression.

**GVAX:** ORR 0% despite confirmed T-cell responses and CD8+ infiltration. The whole-cell vaccine generated immune activity. The T cells arrived at the tumor margin. TGF-β and MDSCs prevented effector function. Pharmacodynamic activity ≠ clinical benefit.

**IMblaze370:** MEK inhibition upregulates MHC-I and promotes T-cell infiltration in murine models. In 363 human patients, OS HR=1.00. The murine synergy did not translate. The human MSS CRC TME — with hepatic immune tolerance, KRAS-driven MDSC recruitment, and TGF-β-mediated T-cell exclusion — is not recapitulated in murine models.

**Implication for BreAK CRC-001:** STC-1010's DNFB haptenation mechanism must be shown to address the specific bottleneck that defeated GVAX (T-cell trafficking and effector function within the TME), not just T-cell priming. The protocol rationale must explain why DNFB danger-signal-driven DC maturation is expected to produce a different outcome than GM-CSF secretion.

---

### D2 Selection — 3 trials (GVAX, AtezoTRIBE, CO.26)

**The pattern:** The right drug was given to the wrong patients, or the right patients were mixed with the wrong patients, diluting the signal to noise.

**GVAX:** Refractory setting with maximal immune exclusion. Heavily pretreated patients with established immunosuppressive TMEs. The 1L setting of BreAK CRC-001 is a meaningful improvement — but the TME suppression mechanisms are present in 1L disease as well.

**AtezoTRIBE:** All-comers enrollment mixed MSS (~95%) with MSI-H (~5%). The ITT PFS HR 0.69 is driven by the MSI-H minority. The pMMR/MSS subgroup HR 0.86 is not significant. Unselected enrollment is the canonical D2 failure.

**CO.26:** Liver-metastatic patients (HR ~0.90) diluted the non-liver-metastatic signal (HR ~0.50). The non-liver-met subgroup showed meaningful IO benefit. The liver-met subgroup showed essentially none. Broad enrollment mixed two biologically distinct populations.

**Implication for BreAK CRC-001:** KRAS-mutant enrichment (Arm 2A-1) addresses D2 at the molecular level. But liver-met stratification is the most important D2 gap remaining. GAP-01 (liver-met not pre-specified as stratification variable) is the highest-priority design gap in BreAK CRC-001.

---

### D3 Architecture — 2 trials (QUILT-2.004, MEDITREME)

**The pattern:** The trial design made results uninterpretable regardless of the drug's activity.

**QUILT-2.004:** Terminated at n=30 (target 70) after unplanned interim analysis. HR 1.061 with CI 0.380–2.966. The wide confidence interval means the true effect could be anywhere from a 62% reduction to a 197% increase in hazard. This trial cannot be cited as evidence of anything.

**MEDITREME:** Single-arm design. mFOLFOX6 alone achieves ~50–60% ORR in 1L RAS-mutant mCRC. MEDITREME reported 64.5% ORR. Without a control arm, the IO contribution is unattributable. The result is consistent with chemotherapy alone.

**Implication for BreAK CRC-001:** BreAK CRC-001 must include a randomized control arm or a pre-specified historical control with tight eligibility matching. A single-arm Phase IIa result will face the same interpretability challenge as MEDITREME — any observed ORR will be attributed to mFOLFOX6, not STC-1010.

---

### D4 Biomarker — 0 trials with pre-specified predictive biomarker

**The pattern:** No trial in the 7 CORE comparator set pre-specified a predictive biomarker as an enrollment criterion for the MSS/pMMR population. Every biomarker signal (pTMB ≥28, Immunoscore-IC, ctDNA-low, non-liver-met) was identified post-hoc.

**This is the field-wide gap.** The absence of D4 failures in the matrix is not because biomarker selection worked — it is because no trial attempted prospective biomarker-enriched enrollment in MSS CRC. Every biomarker signal in the field is hypothesis-generating, not validated.

**Implication for BreAK CRC-001:** BreAK CRC-001 has an opportunity to be the first trial to pre-specify a predictive biomarker for MSS CRC IO. The candidates — liver-met status (strongest clinical signal), Immunoscore-IC (strongest immune signal), pTMB ≥28 (strongest molecular signal), ctDNA burden (strongest tumor burden signal) — are all available. Pre-specifying even one as a primary stratification variable would differentiate BreAK CRC-001 from every prior trial in the field.

---

### D5 Attribution — 2 trials (AtezoTRIBE, MEDITREME)

**The pattern:** The chemotherapy backbone was too active to allow detection of IO contribution.

**AtezoTRIBE:** FOLFOXIRI + bev is one of the most active chemotherapy regimens in 1L mCRC. Adding atezolizumab to an already highly active backbone makes IO attribution nearly impossible in an unselected population.

**MEDITREME:** mFOLFOX6 alone achieves ~50–60% ORR. The 64.5% ORR in MEDITREME is within the range of chemotherapy variability. No IO contribution can be demonstrated.

**Implication for BreAK CRC-001:** mFOLFOX6 ± bev is the backbone. Historical ORR for mFOLFOX6 + bev in 1L KRAS-mutant mCRC is approximately 50–55% (TRIBE2: 50%; BECOME bev arm: 54.5%). Any BreAK CRC-001 ORR result must be compared against this historical floor. A randomized control arm is the only design that allows clean attribution.

---

### D6 Interpretability — 2 trials (GRANITE, CO.26)

**The pattern:** Results were ambiguous due to design gaps that prevented definitive conclusions.

**GRANITE:** Primary endpoint not met. Low-ctDNA subgroup HR 0.50 is exploratory — threshold not pre-specified, subgroup not powered, data from press release only. Company bankrupt. Results will likely never be peer-reviewed.

**CO.26:** pTMB ≥28 threshold was data-driven, not pre-specified. GuardantOMNI-specific assay. 2L+ population. The signal is real but cannot be acted on without prospective validation.

**Implication for BreAK CRC-001:** Pre-specify all biomarker analyses before the trial begins. Any threshold identified post-hoc will face the same D6 interpretability challenge as CO.26's pTMB signal.

---

### D7 Translational — 1 trial (IMblaze370)

**The pattern:** Preclinical models generated a compelling hypothesis that did not survive contact with human biology.

**IMblaze370:** MEKi + anti-PD-L1 synergy was demonstrated in murine models. Phase III OS HR=1.00. The murine models did not recapitulate hepatic immune tolerance, KRAS-driven MDSC recruitment, or TGF-β-mediated T-cell exclusion.

**Implication for BreAK CRC-001:** STC-1010's preclinical data (Alzeeb et al. 2024) is from murine surrogate vaccine models (CT26, CMT-93, LTPA, MC38). The authors explicitly state: "Human vaccines based on STC technology should be tested in alternative models." The murine data is hypothesis-generating, not predictive of human outcomes. BreAK CRC-001 is the first human test of the STC mechanism in CRC.

---

### D8 Systemic — 1 trial (GRANITE)

**The pattern:** External factors terminated the program before interpretable data could be generated.

**GRANITE:** Gritstone Oncology filed for Chapter 11 bankruptcy. The trial infrastructure collapsed. The data will likely never be peer-reviewed. The low-ctDNA subgroup signal is permanently hypothesis-generating.

**Implication for BreAK CRC-001:** Sponsor stability is a trial design consideration. BreAK CRC-001's multi-site French academic structure (Institut Bergonié, Gustave Roussy, CGFL, ICM, HCL) provides institutional stability that a single-sponsor biotech cannot guarantee.

---

## BreAK CRC-001 Risk Assessment

| Domain | BreAK CRC-001 Risk | Current Status | Mitigation |
|---|---|---|---|
| D1 Biology | **HIGH** | STC-1010 mechanism untested in humans | Protocol rationale must distinguish from GVAX; pre-specify clinical endpoints not immune biomarkers |
| D2 Selection | **HIGH** | GAP-01: liver-met not stratified | Pre-specify liver-met as stratification variable; KRAS enrichment partially addresses |
| D3 Architecture | **MEDIUM** | Phase IIa design — control arm status unclear | Randomized control arm or pre-specified historical control required |
| D4 Biomarker | **MEDIUM** | No pre-specified predictive biomarker | Opportunity: pre-specify Immunoscore-IC or pTMB as exploratory stratification |
| D5 Attribution | **MEDIUM** | mFOLFOX6 backbone active | Historical control floor: ~50–55% ORR; randomized arm required for attribution |
| D6 Interpretability | **LOW** | Registered trial with pre-specified endpoints | Maintain pre-specification discipline; avoid post-hoc threshold setting |
| D7 Translational | **HIGH** | Preclinical data is murine surrogate only | BreAK CRC-001 is the first human test; manage expectations accordingly |
| D8 Systemic | **LOW** | Multi-site academic structure | Institutional stability is an asset |

**Three domains at HIGH risk: D1 Biology, D2 Selection, D7 Translational.** These are the domains where BreAK CRC-001 is most likely to replicate prior failures if not explicitly addressed in the protocol design.

---

*Source: MSS_CRC_IO_comparator_trials_agent3.md (VERIFIED) + brenus_comparator_path_a_report.md (LOCKED)*
*Governance: MANIFEST.yaml | PATH B: Not used*
