# Trial Failure Adjudication: BreAK CRC-001 Design Constraints
**Document type:** Governance — Trial Design Intelligence  
**Prepared by:** Canon Reconciliation + Migration Agent (Session 4)  
**Date:** 2026-04-30  
**Commissioned by:** Manager directive — failure map framework  
**Evidence base:** Comparator Hunter Agent (Adjudication Master), Weaponization Agent (Exploitation Queue), Agent 3 (Comparator Trials), Agent 4 (Biomarker Biology), Agent 5 (Fit-Gap), Agent 6 (Strategy Memo)  
**Classification:** Internal — CrisPRO Commercial Team & Scientific Leadership Only

---

## MANAGER DIRECTIVE SUMMARY

> "Use the shortlist as a failure map, not just a comparator list. Partition each trial into 'failed because the mechanism was wrong,' 'failed because the patients were wrong,' and 'failed because the trial architecture washed out any real signal,' then use that to redesign BreAK CRC-001 around enrichment, attribution, and serial biomarker readouts."

This document operationalizes that directive. It is structured in four parts:

1. **Failure-Mode Partition Matrix** — each trial partitioned into mechanism failure, patient selection failure, and trial architecture failure
2. **4-Column Adjudication Sheet** — comparator class / likely failure mechanism / reusable design lesson / required BreAK countermeasure
3. **Biomarker Measurement Framework** — the three-layer trial-failure matrix (baseline biology, treatment exposure, on-treatment pharmacodynamics)
4. **Design Constraint Register** — concrete protocol requirements derived from the failure map

---

## PART 1: FAILURE-MODE PARTITION MATRIX

### Framing

The manager identified three failure modes:

| Code | Failure Mode | Definition |
|------|-------------|-----------|
| **M** | Mechanism wrong | The biological mechanism of the intervention was insufficient to overcome MSS CRC immunosuppression, regardless of patient selection or trial design |
| **P** | Patients wrong | The enrolled population was biologically non-permissive; a responding subgroup existed but was diluted by non-responders |
| **A** | Architecture washed out signal | The trial design — single-arm, unselected enrollment, wrong endpoint, no biomarker stratification — made it impossible to detect a real signal even if one existed |

Most trials fail on multiple axes. The partition assigns a **primary** failure mode and **contributing** failure modes. This distinction matters: a primary-M failure means the mechanism itself needs to change; a primary-P or primary-A failure means the mechanism may be sound but the trial was wrong.

---

### Trial 1: CheckMate 9X8 — Nivolumab + mFOLFOX6 + Bevacizumab
**NCT03414983 | Phase 2/3 | n=195 | PEER-REVIEWED | HR 0.81 (0.53–1.23), p=0.30 — PRIMARY ENDPOINT NOT MET**

| Failure Mode | Assessment | Evidence |
|-------------|-----------|---------|
| **M — Mechanism wrong** | **PRIMARY.** Anti-PD-1 monotherapy (nivolumab) addresses only one immunosuppressive axis — PD-1/PD-L1 checkpoint — in a TME with at least six redundant suppressive mechanisms (TGF-β exclusion, MDSC recruitment, MHC-I downregulation, liver tolerance, VEGF-driven exhaustion, SPP1+ macrophage ecosystem). Releasing the PD-1 brake is insufficient when T cells cannot traffic to the tumor and cannot sustain effector function. The MSS/pMMR subgroup showed no differential benefit from the all-comer result, confirming this is not a patient selection artifact. | Agent 3 Tier 1 (CheckMate 142 MSS ORR 0%); Weaponization Agent EQ-01; Agent 4 Domains 1–6 |
| **P — Patients wrong** | **CONTRIBUTING.** 95% MSS/pMMR enrollment is correct for the target population, but no stratification by liver metastasis status, Immunoscore, or TGF-β signature. A non-liver-metastatic subgroup may have shown a signal that was diluted by the ~50–70% liver-metastatic majority. | Agent 3 Synthesis Memo Section 2; Agent 4 Domain 5 |
| **A — Architecture washed out signal** | **CONTRIBUTING.** Phase 2/3 design with Phase 3 expansion contingent on Phase 2 PFS signal. The Phase 2 was not powered for subgroup analyses. No biomarker-enriched primary analysis. No ctDNA or pharmacodynamic co-primary endpoint. | Weaponization Agent EQ-01 |

**Primary failure mode: M (mechanism insufficient)**  
**Implication for STC-1010:** STC-1010's mechanism is fundamentally different — immune education via multi-antigen priming and ICD, not checkpoint release. CheckMate 9X8 proves that releasing the PD-1 brake alone is insufficient; it does not prove that immune education is insufficient. However, STC-1010 still faces the same trafficking and effector function barriers that defeated nivolumab. The mechanism differentiation is real but does not guarantee success.

---

### Trial 2: QUILT-2.004 — AdCEA-MUC1-TRICOM + Avelumab + N-803 + SX-682 + mFOLFOX6 + Bev
**NCT03050814 | Phase 2 | n=30 | LITERATURE-SUPPORTED | HR 1.061 (0.380–2.966), p=0.91 — TERMINATED**

| Failure Mode | Assessment | Evidence |
|-------------|-----------|---------|
| **M — Mechanism wrong** | **PRIMARY.** This trial combined a tumor-associated antigen (TAA) vaccine (CEA/MUC1 peptide), anti-PD-L1 (avelumab), IL-15 agonist (N-803), CXCR1/2 inhibitor (SX-682), and mFOLFOX6 + bev — arguably the most mechanistically comprehensive combination tested in MSS CRC. It still failed completely (HR 1.061). This is the most important negative result in the comparator set: it demonstrates that peripheral immune activation (vaccine priming) + checkpoint release + myeloid axis modulation + chemotherapy backbone is still insufficient in unselected MSS CRC. The bottleneck is not antigen priming or checkpoint release — it is T-cell trafficking and effector function within the TME. | Agent 3 Tier 2 (QUILT-2.004); Weaponization Agent EQ-02; Agent 4 Domains 1–6 |
| **P — Patients wrong** | **CONTRIBUTING.** Not MSS-restricted at enrollment (all-comer mCRC). No liver metastasis stratification. No Immunoscore or TGF-β signature selection. The enrolled population almost certainly included a majority of biologically non-permissive patients. | Agent 3 Tier 2; Comparator Hunter Adjudication Note Trial 1 |
| **A — Architecture washed out signal** | **CONTRIBUTING.** n=30 is severely underpowered for any subgroup analysis. Terminated at interim — no opportunity to identify a responding subgroup retrospectively. Single-arm design (2-arm randomized, but terminated before meaningful subgroup data). | Comparator Hunter Adjudication Note Trial 1 |

**Primary failure mode: M (mechanism insufficient in unselected population)**  
**Implication for STC-1010:** QUILT-2.004 is the null benchmark. It proves that peripheral immune activation + checkpoint release + myeloid modulation + identical backbone (mFOLFOX6 + bev) fails in unselected MSS mCRC. STC-1010's differentiation from QUILT-2.004 is antigen breadth (>200 TAAs vs. CEA/MUC1 only) and ICD-mediated priming mechanism. However, antigen breadth is not the limiting factor — the bottleneck is downstream trafficking and effector function. STC-1010 must demonstrate that its mechanism addresses the trafficking barrier, not just the priming step.

**Manager note:** QUILT-2.004 is the primary negative benchmark. Every BreAK CRC-001 design decision should be tested against the question: "Why would STC-1010 succeed where QUILT-2.004 failed?"

---

### Trial 3: GRANITE GO-010 — GRT-C901/GRT-R902 + Atezolizumab + mFOLFOX6
**NCT05141721 | Phase 2/3 | n=69 (interim) | PRESS-RELEASE-ONLY | HR 0.73 (all-comers), HR 0.50 (ctDNA-low) — NOT SIGNIFICANT**

| Failure Mode | Assessment | Evidence |
|-------------|-----------|---------|
| **M — Mechanism wrong** | **CONTRIBUTING.** Neoantigen vaccine (personalized mRNA + adenoviral vectors) + anti-PD-L1 (atezolizumab) + mFOLFOX6. The mechanism is more sophisticated than QUILT-2.004 (personalized neoantigens vs. shared TAAs), but still failed to reach statistical significance in the all-comer population. The ctDNA-low subgroup trend (HR 0.50) suggests the mechanism may work in a biologically selected subgroup — but the CI is too wide to conclude anything. | Weaponization Agent EQ-04; Agent 3 Tier 3 |
| **P — Patients wrong** | **PRIMARY.** The ctDNA-low subgroup signal (HR 0.50 vs. HR 0.73 all-comers) is the most important data point in this trial. It suggests that low disease burden — a proxy for a less immunosuppressive TME, fewer liver metastases, and more intact immune function — is the key patient selection variable. The all-comer population diluted a real signal in the ctDNA-low subgroup. | Weaponization Agent EQ-04; Agent 3 Tier 3; Agent 5 Section 2.4 |
| **A — Architecture washed out signal** | **CONTRIBUTING.** Phase 2/3 design not powered for ctDNA-low subgroup analysis. Company bankruptcy (Chapter 11, October 2024) orphaned the trial before Phase 3 could be initiated. The ctDNA-low subgroup was exploratory, not pre-specified as a primary analysis. | Weaponization Agent EQ-04 |

**Primary failure mode: P (patients wrong — unselected enrollment diluted a real signal)**  
**Implication for STC-1010:** GRANITE is the biomarker-enrichment warning and ctDNA hypothesis source. The ctDNA-low subgroup trend is the strongest available signal that low disease burden predicts IO benefit in MSS mCRC. BreAK CRC-001 must pre-specify ctDNA-low as a primary enrichment hypothesis, not an exploratory afterthought. The GRANITE failure is not a failure of the vaccine mechanism — it is a failure to enrich for the right patients.

---

### Trial 4: Sintilimab + Bevacizumab + XELOX
**NCT04194359 | Phase 2 | n=25 | PEER-REVIEWED | ORR 84%, mPFS 18.2 months — SINGLE-ARM**

| Failure Mode | Assessment | Evidence |
|-------------|-----------|---------|
| **M — Mechanism wrong** | **NOT APPLICABLE.** This trial showed a high ORR (84%) and mPFS (18.2 months) — it did not fail on efficacy. The question is whether the result is real or artifactual. | Comparator Hunter Adjudication Note Trial 4 |
| **P — Patients wrong** | **PRIMARY CONCERN.** n=25, single-center, Chinese population, single-arm. The 84% ORR is strikingly high and almost certainly reflects patient selection bias (single-center selection, Chinese population with different MSS CRC biology, possible enrichment for favorable prognostic features). The result cannot be generalized to the BreAK CRC-001 population. | Comparator Hunter Adjudication Note Trial 4 |
| **A — Architecture washed out signal** | **PRIMARY CONCERN.** Single-arm, no control. The 84% ORR cannot be compared to a concurrent control. XELOX backbone (not mFOLFOX6) achieves ~50–60% ORR in 1L mCRC — the incremental contribution of sintilimab cannot be determined. | Comparator Hunter Adjudication Note Trial 4 |

**Primary failure mode: NOT A FAILURE — but a cautionary case of uninterpretable positive data**  
**Implication for STC-1010:** Sintilimab provides weak "activity can appear in selected single-arm settings" signal. It is not a benchmark for BreAK CRC-001. Its value is as a structural precedent: anti-PD-1 + bev + oxaliplatin-based chemo can achieve high ORR in 1L RAS-mutant MSS mCRC in a selected population. The Phase III follow-on (NCT05171660, n=494, randomized) will be the definitive test — watch for results.

---

### Trial 5: Botensilimab + Balstilimab (BOT/BAL)
**NCT05608044 | Phase 2 | n=234 | CONFERENCE DATA | cORR 19% (BOT 75mg + BAL) — NO LIVER METS REQUIRED**

| Failure Mode | Assessment | Evidence |
|-------------|-----------|---------|
| **M — Mechanism wrong** | **NOT APPLICABLE for no-liver-met population.** BOT/BAL shows genuine activity (cORR 19%, 2-year OS 42%) in refractory MSS mCRC without liver metastases. The mechanism (Fc-enhanced CTLA-4 + PD-1 dual checkpoint) works in this selected population. | Weaponization Agent EQ-03 |
| **P — Patients wrong** | **CRITICAL DESIGN FEATURE.** The no-liver-met restriction is not a limitation — it is the key insight. BOT/BAL explicitly excludes liver-metastatic patients because the field has learned that liver metastases are the primary IO resistance mechanism. The 19% cORR in no-liver-met patients vs. near-zero in liver-met patients across the MSS CRC IO literature is the strongest clinical validation of the liver metastasis stratification hypothesis. | Weaponization Agent EQ-03; Agent 4 Domain 5 |
| **A — Architecture washed out signal** | **NOT APPLICABLE.** The trial was designed with the right patient selection. The architecture is appropriate for the population. | Weaponization Agent EQ-03 |

**Primary failure mode: NOT A FAILURE — but a critical patient selection lesson**  
**Implication for STC-1010:** BOT/BAL is the strongest clinical validation that IO can work in MSS mCRC — but only in non-liver-metastatic patients. BreAK CRC-001 does not restrict liver-metastatic patients. This is either a competitive advantage (broader population) or a fatal design flaw (dilution by liver-metastatic non-responders). The manager's directive to make liver metastasis status a frontline stratifier is directly supported by the BOT/BAL data.

---

### Trial 6: SAR445877 + mFOLFOX6 + Bevacizumab
**NCT07500298 | Phase 1 | n=41 planned | NOT YET RECRUITING | NO DATA**

| Failure Mode | Assessment | Evidence |
|-------------|-----------|---------|
| **M / P / A** | **NOT APPLICABLE — no data.** This trial has not yet recruited. It is a structural precedent only: identical backbone to BreAK CRC-001, Phase 1 safety primary endpoint, mechanism undisclosed. | Weaponization Agent EQ-06 |

**Implication for STC-1010:** SAR445877 is a watch item. Its identical backbone means it will eventually be a direct comparator. Monitor for mechanism disclosure and IND filing details.

---

## PART 2: 4-COLUMN ADJUDICATION SHEET

> **Manager directive:** "Operationalize the shortlist into a 4-column adjudication sheet for BreAK CRC-001: comparator class, likely failure mechanism, reusable design lesson, and required BreAK countermeasure."

| Trial | Comparator Class | Likely Failure Mechanism | Reusable Design Lesson | Required BreAK CRC-001 Countermeasure |
|-------|-----------------|------------------------|----------------------|--------------------------------------|
| **CheckMate 9X8** (NCT03414983) | **NULL BENCHMARK — Identical backbone** | **PRIMARY: Mechanism insufficient.** Anti-PD-1 alone cannot overcome the six-layer MSS CRC TME suppression. Releasing the PD-1 brake is insufficient when T cells cannot traffic to the tumor. CONTRIBUTING: No liver met stratification; no biomarker enrichment. | PD-1 blockade with identical backbone (mFOLFOX6 + bev) fails in unselected MSS mCRC. The mechanism must address trafficking and effector function, not just checkpoint release. | STC-1010 must demonstrate a pharmacodynamic signal (DTH, TLS evolution, tumor infiltration) that is mechanistically distinct from PD-1 release. Pre-specify a pharmacodynamic co-primary endpoint that proves STC-1010 is doing something CheckMate 9X8 could not. |
| **QUILT-2.004** (NCT03050814) | **PRIMARY NEGATIVE BENCHMARK — Vaccine + IO + identical backbone** | **PRIMARY: Mechanism insufficient in unselected population.** Peripheral immune activation (TAA vaccine) + checkpoint release + myeloid modulation + mFOLFOX6 + bev still failed. The bottleneck is T-cell trafficking and effector function, not antigen priming. CONTRIBUTING: All-comer enrollment; n=30 underpowered; no liver met stratification. | Peripheral immune activation is necessary but not sufficient. Antigen breadth (CEA/MUC1 vs. >200 TAAs) is not the limiting factor. The trial architecture (n=30, all-comer, terminated) made it impossible to identify a responding subgroup. | (1) Assume any all-comer MSS design is wrong. (2) Pre-specify liver metastasis status as a stratification factor. (3) Pre-specify a pharmacodynamic endpoint that distinguishes STC-1010 activity from FOLFOX activity. (4) Power Phase IIa for a biomarker-enriched subgroup, not the all-comer population. |
| **GRANITE GO-010** (NCT05141721) | **BIOMARKER-ENRICHMENT WARNING + ctDNA HYPOTHESIS SOURCE** | **PRIMARY: Patients wrong.** All-comer enrollment diluted a real signal in the ctDNA-low subgroup (HR 0.50 vs. HR 0.73 all-comers). The mechanism (personalized neoantigen vaccine) may work in low-disease-burden patients. CONTRIBUTING: Not powered for ctDNA-low subgroup; company bankruptcy orphaned the trial. | ctDNA-low status is the strongest available enrichment hypothesis for vaccine-based IO in MSS mCRC. The all-comer population consistently dilutes any real signal. Personalized neoantigen approach is logistically complex and showed only a trend — off-the-shelf multi-antigen approach (STC-1010) has a scalability advantage. | (1) Pre-specify ctDNA-low as a primary enrichment hypothesis in Phase IIa. (2) Implement ctDNA kinetics as a co-primary pharmacodynamic endpoint. (3) Design a ctDNA-based early stopping rule (expansion if ctDNA-low subgroup shows signal; termination if no signal in any subgroup). (4) Do not rely on all-comer PFS as the primary endpoint — it will fail. |
| **BOT/BAL** (NCT05608044) | **PATIENT SELECTION LESSON — No-liver-met IO activity** | **NOT A FAILURE in selected population.** BOT/BAL shows genuine IO activity (cORR 19%, 2-year OS 42%) in refractory MSS mCRC without liver metastases. The no-liver-met restriction is the key design insight, not a limitation. | Liver metastasis status is the single strongest clinical predictor of IO failure in MSS CRC. Non-liver-metastatic patients respond at rates of 19–40%; liver-metastatic patients respond at near-zero rates. The field has validated this stratification — BreAK CRC-001 must implement it. | (1) Immediate protocol amendment: add liver metastasis status (number of lesions, % liver involvement, extrahepatic disease) as a mandatory stratification factor. (2) Pre-specify non-liver-metastatic subgroup as the primary analysis population in Phase IIa. (3) Analyze liver metastasis status of all 6 current Phase I patients immediately. (4) Consider liver-directed therapy (SBRT, ablation) before STC-1010 initiation as a protocol amendment option. |
| **Sintilimab + bev + XELOX** (NCT04194359) | **WEAK POSITIVE SIGNAL — Single-arm, selected population** | **NOT A FAILURE — but uninterpretable.** 84% ORR is likely a patient selection artifact (n=25, single-center, Chinese population). Cannot determine sintilimab's contribution over XELOX + bev alone. | Anti-PD-1 + bev + oxaliplatin-based chemo can achieve high ORR in selected 1L RAS-mutant MSS mCRC. The Phase III follow-on (NCT05171660, n=494, randomized) will be the definitive test. Single-arm designs in MSS CRC are uninterpretable — the SOC response rate is too high to detect an IO contribution. | (1) Do not use sintilimab ORR as a benchmark for STC-1010. (2) Reinforce the case for a concurrent control arm or randomized Phase IIa design. (3) Watch NCT05171660 for Phase III results — if positive, raises the bar for all MSS mCRC IO programs. |
| **SAR445877 + mFOLFOX6 + bev** (NCT07500298) | **STRUCTURAL PRECEDENT — Identical backbone, no data** | **NOT APPLICABLE — no data.** Phase 1 safety only. Mechanism undisclosed. | Identical backbone to BreAK CRC-001. Will eventually be a direct comparator. Monitor for mechanism disclosure. | (1) Monitor SAR445877 IND filing and mechanism disclosure. (2) If mechanism is disclosed before BreAK CRC-001 Phase IIa opens, assess whether it addresses the same trafficking/effector function bottleneck as STC-1010. |

---

## PART 3: BIOMARKER MEASUREMENT FRAMEWORK

> **Manager directive:** "Build a trial-failure matrix with three layers: baseline biology, treatment exposure, and on-treatment pharmacodynamics."

### Layer 1: Baseline Biology (Pre-Treatment)

These variables must be collected at screening/baseline for every BreAK CRC-001 patient. They are the primary patient selection and stratification variables.

| Variable | Rationale | Evidence Anchor | Clinical Accessibility | Required Action |
|---------|-----------|----------------|----------------------|----------------|
| **Liver metastasis status** (number of lesions, % liver involvement, extrahepatic disease) | Single strongest predictor of IO failure in MSS CRC. Near-zero IO response rates in liver-metastatic patients across REGONIVO, RIN, CO.26. BOT/BAL validated the no-liver-met restriction. | Agent 4 Domain 5; Agent 3 Synthesis Memo; Weaponization Agent EQ-03 | **HIGH — standard CT/MRI staging** | **IMMEDIATE protocol amendment required.** Add as mandatory stratification factor. |
| **KRAS mutation subtype** (G12C, G12D, G12V, G13D, etc.) | Protocol requires KRAS-mutant disease but does not specify subtype. KRAS G12D drives the most potent MDSC recruitment (KRAS-IRF2-CXCL3 axis). KRAS G12C patients may increasingly opt for sotorasib/adagrasib combinations. | Agent 4 Domain 6; Agent 5 Gap 8 | **HIGH — standard NGS panel** | **Protocol amendment required.** Record KRAS subtype as a covariate. Pre-specify subgroup analysis by KRAS subtype. |
| **ctDNA level** (baseline) | GRANITE ctDNA-low subgroup (HR 0.50) is the strongest available enrichment hypothesis. Low ctDNA = low disease burden = less immunosuppressive TME. | Weaponization Agent EQ-04; Agent 3 Tier 3; Agent 5 Section 2.4 | **HIGH — liquid biopsy (Guardant, Foundation)** | **Pre-specify ctDNA-low as primary enrichment hypothesis.** Define ctDNA-low threshold before Phase IIa opens. |
| **SMAD4 status** (IHC) | SMAD4 loss (~25–30% of CRC) predicts TGF-β-driven immune exclusion and liver metastasis propensity. Clinically accessible. Not currently in BreAK CRC-001 protocol. | Agent 4 Domain 3; Agent 5 Gap 5; Agent 5 Section 7 Q9 | **HIGH — standard IHC** | **Protocol amendment required.** Add SMAD4 IHC to screening biopsy panel. |
| **Bevacizumab use** (yes/no) | Optional bevacizumab creates immunological heterogeneity. VEGF-A/NRP-1/M2 macrophage axis differs between bev and no-bev patients. | Agent 2 Section 7.2; Agent 5 Section 2.3 | **HIGH — treatment assignment** | **Track as mandatory covariate.** Pre-specify subgroup analysis by bevacizumab use. |
| **MHC-I/TAP expression** (IHC/RNA) | TAP1/TAP2 downregulation prevents MHC-I peptide loading — a key resistance mechanism for vaccine-based approaches. | Agent 4 Domain 4; Agent 5 Section 2.5 | **MEDIUM — IHC or RNA-seq** | **Add to screening biopsy panel.** Pre-specify as exploratory biomarker. |
| **TGF-β exclusion signature** (RNA-seq) | TGF-β-driven CXCR3 suppression prevents T-cell trafficking. The primary exclusion mechanism in MSS CRC. | Agent 4 Domain 3; Agent 5 Section 2.2 | **MEDIUM — RNA-seq (research-grade)** | **Add to screening biopsy panel.** Pre-specify as exploratory biomarker. |
| **Immunoscore-IC** (IHC) | AtezoTRIBE Immunoscore-IC high pMMR patients showed PFS HR ~0.50. Validated clinical tool. | Agent 3 Tier 4 (AtezoTRIBE); Agent 5 Section 2.2 | **MEDIUM — standardized IHC** | **Add to screening biopsy panel.** Pre-specify as exploratory biomarker. |

---

### Layer 2: Treatment Exposure (On-Treatment)

These variables must be tracked during treatment to characterize the pharmacological context of any observed response.

| Variable | Rationale | Evidence Anchor | Required Action |
|---------|-----------|----------------|----------------|
| **mFOLFOX6 cycle timing relative to STC-1010 administration** | mFOLFOX6 causes lymphopenic nadir at days 7–10. STC-1010 administered during this window will have severely impaired vaccine-driven T-cell priming. | Agent 2 Section 7.1; Agent 5 Section 2.3 | **Record exact timing of each STC-1010 dose relative to mFOLFOX6 cycle day.** Pre-specify timing analysis as a pharmacodynamic covariate. |
| **Bevacizumab timing relative to STC-1010** | Peak CD8 infiltration occurs at cycle 2 (~days 14–28). Vaccine timing should coincide with the vascular normalization window. | Agent 2 Section 7.2; Agent 5 Section 2.3 | **Record exact timing of bevacizumab relative to STC-1010.** Pre-specify vascular normalization window analysis. |
| **Cyclophosphamide dose and timing** | Low-dose cyclophosphamide is intended to deplete Tregs and enhance vaccine priming. Dose and timing relative to STC-1010 must be tracked. | Agent 1 (STC-1010 regimen); Agent 5 Section 2.3 | **Record cyclophosphamide dose and timing for every patient.** |
| **GM-CSF dose and timing** | GM-CSF is intended to enhance dendritic cell recruitment and vaccine priming. Dose and timing must be tracked. | Agent 1 (STC-1010 regimen); Agent 5 Section 2.3 | **Record GM-CSF dose and timing for every patient.** |
| **Dose reductions / treatment interruptions** | Dose reductions in mFOLFOX6 alter the immunological context. Must be tracked as a covariate. | Agent 2 (protocol); Agent 5 Section 2.3 | **Record all dose modifications as mandatory covariates.** |

---

### Layer 3: On-Treatment Pharmacodynamics (Proving STC-1010 Is Doing Something FOLFOX Cannot)

> **Manager directive:** "Build a trial-failure matrix... to separate three very different failure modes: no priming, priming without trafficking, and trafficking without durable tumor control."

This is the most critical layer. These readouts must distinguish STC-1010-specific activity from FOLFOX backbone activity.

| Variable | Failure Mode It Detects | Rationale | Evidence Anchor | Required Action |
|---------|------------------------|-----------|----------------|----------------|
| **DTH response magnitude** (quantitative, 1/24/48/72h) | **No priming** — if DTH is absent or minimal, STC-1010 is not generating peripheral immune activation | DTH is the only immune activation endpoint currently reported publicly. Quantitative data (not just positive/negative) is needed to assess predictive value. | Agent 1 (AACR 2026 CT051); Agent 5 Section 7 Q7 | **Pre-specify DTH response threshold.** Collect quantitative DTH scores at all time points. Correlate DTH magnitude with clinical endpoints. |
| **ctDNA kinetics** (serial, every cycle) | **No priming OR trafficking without tumor control** — ctDNA clearance is the earliest available signal of tumor response | GRANITE ctDNA-low subgroup (HR 0.50) validates ctDNA as a pharmacodynamic endpoint. ctDNA clearance rate distinguishes STC-1010 activity from FOLFOX activity (FOLFOX reduces ctDNA via cytotoxicity; STC-1010 should reduce ctDNA via immune-mediated tumor control). | Weaponization Agent EQ-04; Agent 3 Tier 3; Agent 5 Section 2.4 | **Pre-specify ctDNA clearance as a co-primary pharmacodynamic endpoint.** Define ctDNA-low threshold. Implement ctDNA-based early stopping rule. |
| **Immune infiltration** (CD8+ TIL density, on-treatment biopsy) | **Priming without trafficking** — if peripheral DTH is present but CD8+ TIL density does not increase on-treatment, STC-1010 is priming but not trafficking | The trafficking bottleneck is the primary failure mode in MSS CRC IO. On-treatment biopsy CD8+ TIL density is the direct measure of whether primed T cells are reaching the tumor. | Agent 4 Domain 1 (TGF-β exclusion); Agent 5 Section 2.2 | **Pre-specify on-treatment biopsy CD8+ TIL density as a mandatory pharmacodynamic endpoint.** Define response threshold (e.g., ≥2-fold increase from baseline). |
| **TLS evolution** (on-treatment biopsy) | **Priming without trafficking OR trafficking without durable control** — TLS formation indicates organized intratumoral immune response | TLS density correlates with durable IO response across tumor types. TLS evolution from baseline to on-treatment biopsy is a direct measure of STC-1010's ability to organize intratumoral immunity. | Agent 2 Section 6.5; Agent 5 Section 2.2 | **Pre-specify TLS density and maturation stage as a mandatory pharmacodynamic endpoint.** Standardize TLS scoring (Sautès-Fridman criteria). |
| **HLA/MHC-I status** (on-treatment biopsy) | **Trafficking without durable control** — if MHC-I is downregulated on-treatment, primed T cells cannot recognize tumor cells | MHC-I downregulation is a key acquired resistance mechanism. On-treatment MHC-I status distinguishes immune evasion from immune exclusion. | Agent 4 Domain 4; Agent 5 Section 2.5 | **Pre-specify on-treatment MHC-I/TAP expression as a mandatory pharmacodynamic endpoint.** |
| **Tumor necrosis** (on-treatment biopsy) | **Trafficking without durable control** — tumor necrosis indicates immune-mediated cytotoxicity | Tumor necrosis on on-treatment biopsy is a direct measure of immune-mediated tumor killing. Distinguishes STC-1010 activity from FOLFOX cytotoxicity (FOLFOX causes apoptosis; immune-mediated killing causes necrosis with inflammatory infiltrate). | Agent 2 Section 6.5; Agent 5 Section 2.2 | **Pre-specify tumor necrosis as a mandatory pharmacodynamic endpoint.** Standardize necrosis scoring. |
| **Neoantigen-specific T-cell expansion** (PBMC, serial) | **No priming** — if neoantigen-specific T cells do not expand, STC-1010 is not generating tumor-directed immunity | Neoantigen-specific T-cell expansion is the most direct measure of vaccine-specific immune activation. Distinguishes STC-1010 activity from non-specific immune activation by FOLFOX. | Agent 2 Section 6.5; Agent 4 Domain 4 | **Pre-specify neoantigen-specific T-cell expansion as an exploratory pharmacodynamic endpoint.** Requires cell line identity disclosure (Gap 1). |

---

### Three-Failure-Mode Diagnostic Framework

The three layers above map directly onto the manager's three failure modes:

```
FAILURE MODE 1: NO PRIMING
  → Diagnostic: DTH absent + ctDNA not clearing + no neoantigen-specific T-cell expansion
  → Interpretation: STC-1010 is not generating peripheral immune activation
  → Implication: Mechanism failure — vaccine priming is insufficient

FAILURE MODE 2: PRIMING WITHOUT TRAFFICKING
  → Diagnostic: DTH present + ctDNA not clearing + CD8+ TIL density not increasing on-treatment
  → Interpretation: STC-1010 is priming T cells but they cannot reach the tumor
  → Implication: TME exclusion barrier (TGF-β, VEGF-A) is blocking trafficking
  → Next step: TGF-β inhibitor combination hypothesis

FAILURE MODE 3: TRAFFICKING WITHOUT DURABLE TUMOR CONTROL
  → Diagnostic: DTH present + CD8+ TIL density increasing + ctDNA not clearing + MHC-I downregulated
  → Interpretation: T cells are reaching the tumor but cannot sustain effector function
  → Implication: Acquired resistance (MHC-I loss, exhaustion, antigen escape)
  → Next step: Combination with checkpoint inhibitor or MHC-I restoration strategy
```

---

## PART 4: DESIGN CONSTRAINT REGISTER

> **Manager directive:** "Before Phase IIa opens, [determine] which patients should be excluded, which subgroup should be enriched, which pharmacodynamic signal proves STC-1010 is doing something FOLFOX cannot, and which readout triggers early termination or expansion."

### Constraint 1: Assume All-Comer MSS Design Is Wrong Until Proven Otherwise

**Source:** Manager directive; Agent 5 conclusion; QUILT-2.004 null result; GRANITE all-comer failure  
**Requirement:** Phase IIa must not use all-comer MSS enrollment as the primary analysis population. The primary analysis must be pre-specified in a biomarker-enriched subgroup.  
**Operationalization:** Pre-specify the non-liver-metastatic, ctDNA-low subgroup as the primary analysis population. All-comer analysis is secondary.

---

### Constraint 2: Liver Metastasis Status Is a Frontline Stratifier

**Source:** Manager directive; BOT/BAL data (cORR 19% no-liver-met vs. ~0% liver-met); Agent 4 Domain 5; Agent 5 Gap 4  
**Requirement:** Liver metastasis status (number of lesions, % liver involvement, extrahepatic disease) must be recorded for every patient and used as a stratification factor in Phase IIa.  
**Operationalization:** Immediate protocol amendment. Analyze liver metastasis status of all 6 current Phase I patients. Pre-specify non-liver-metastatic subgroup as primary analysis population.

---

### Constraint 3: ctDNA-Low Is a Serious Enrichment Hypothesis

**Source:** Manager directive; GRANITE ctDNA-low subgroup (HR 0.50); Agent 3 Tier 3; Agent 5 Section 2.4  
**Requirement:** ctDNA-low status must be pre-specified as a primary enrichment hypothesis, not an exploratory afterthought.  
**Operationalization:** Define ctDNA-low threshold before Phase IIa opens. Implement ctDNA kinetics as a co-primary pharmacodynamic endpoint. Design ctDNA-based early stopping rule.

---

### Constraint 4: Bevacizumab Optionality Must Be Resolved

**Source:** Agent 2 Section 7.2; Agent 5 Section 2.3; Manager directive  
**Requirement:** The optional nature of bevacizumab creates immunological heterogeneity that can mask STC-1010's contribution. Either (a) mandate bevacizumab for all Phase IIa patients, or (b) pre-specify bevacizumab use as a stratification factor with powered subgroup analyses.  
**Operationalization:** Protocol amendment decision required before Phase IIa opens.

---

### Constraint 5: Pre-Specify the Pharmacodynamic Signal That Proves STC-1010 Attribution

**Source:** Manager directive; Agent 5 Gap 2 (attribution problem); QUILT-2.004 null result  
**Requirement:** A pharmacodynamic endpoint that is mechanistically linked to STC-1010 and not to FOLFOX must be pre-specified as a co-primary endpoint. Without this, Phase IIa cannot distinguish STC-1010 activity from FOLFOX activity.  
**Operationalization:** Pre-specify DTH response magnitude + ctDNA clearance rate + CD8+ TIL density increase as the pharmacodynamic co-primary endpoint composite. Define response thresholds before Phase IIa opens.

---

### Constraint 6: Early Termination and Expansion Rules Must Be Pre-Specified

**Source:** Manager directive; Agent 5 Section 2.4; GRANITE precedent  
**Requirement:** Phase IIa must include pre-specified rules for (a) early termination if no pharmacodynamic signal is observed in any subgroup, and (b) expansion if the ctDNA-low or non-liver-metastatic subgroup shows a pharmacodynamic signal.  
**Operationalization:** Bayesian adaptive design framework with pre-specified interim analysis at n=21 (Phase Ia complete) and n=42 (Phase IIa interim). ctDNA-based early stopping rule: if ctDNA clearance rate in the ctDNA-low subgroup is not superior to historical FOLFOX benchmarks at interim, terminate.

---

### Constraint 7: KRAS Subtype Heterogeneity Must Be Tracked

**Source:** Agent 4 Domain 6; Agent 5 Gap 8; Manager directive  
**Requirement:** KRAS mutation subtype (G12C, G12D, G12V, G13D, etc.) must be recorded for every patient and pre-specified as a covariate in efficacy analyses.  
**Operationalization:** Protocol amendment required. Pre-specify subgroup analysis by KRAS subtype. Competitive enrollment strategy for KRAS G12C patients (who may opt for sotorasib/adagrasib combinations).

---

## SUMMARY: FAILURE MAP → DESIGN CONSTRAINT MAPPING

| Failure Map Lesson | Source Trial(s) | Design Constraint | Priority |
|-------------------|----------------|------------------|---------|
| All-comer MSS design fails | QUILT-2.004, GRANITE, CheckMate 9X8 | Biomarker-enriched primary analysis population | **CRITICAL** |
| Liver metastasis is the strongest IO suppressor | BOT/BAL, REGONIVO, RIN, CO.26 | Liver metastasis as frontline stratifier | **CRITICAL** |
| ctDNA-low is the strongest enrichment hypothesis | GRANITE GO-010 | ctDNA-low as primary enrichment hypothesis + co-primary endpoint | **CRITICAL** |
| Attribution to STC-1010 vs. FOLFOX is impossible without pharmacodynamic endpoint | QUILT-2.004, CheckMate 9X8, Sintilimab | Pre-specify pharmacodynamic co-primary endpoint composite | **CRITICAL** |
| Bevacizumab optionality creates immunological heterogeneity | CheckMate 9X8, Agent 2 | Resolve bevacizumab optionality before Phase IIa | **HIGH** |
| KRAS subtype heterogeneity dilutes signal | Agent 4, Agent 5 | Record KRAS subtype as mandatory covariate | **HIGH** |
| Peripheral immune activation is necessary but not sufficient | QUILT-2.004, GVAX, PANVAC | Serial on-treatment biopsies with pre-specified trafficking endpoints | **HIGH** |
| Personalized neoantigen approach is logistically complex | GRANITE GO-010 | STC-1010 off-the-shelf advantage — but must demonstrate superior priming | **MEDIUM** |
| Single-arm designs are uninterpretable in MSS CRC | Sintilimab, GRANITE | Consider randomized Phase IIa or concurrent registry control | **MEDIUM** |

---

## DOCUMENT GOVERNANCE

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Status | FINAL — ready for manager review |
| Evidence labels | All claims traceable to Agent evidence wall |
| Blockers resolved | None — this document is analysis only |
| Blockers created | None |
| Next action | Manager review → Protocol amendment prioritization → CrisPRO engagement scoping |
| Commit target | `fjkiani/Brenus` main — next commit batch |

---

*End of document*  
*Prepared by Canon Reconciliation + Migration Agent (Session 4)*  
*Evidence base: Comparator Hunter Agent, Weaponization Agent, Agents 1–5*  
*Classification: Internal — CrisPRO Commercial Team & Scientific Leadership Only*
