# Trial Evidence Cards — Comparator Hunter Agent
**Date:** 2026-04-28
**Scope:** BreAK CRC-001 comparator adjudication
**Source discipline:** All data from primary sources only. Evidence labels applied per glossary.

---

## CARD-01: QUILT-2.004
**NCT:** NCT03050814
**Decision:** DIRECT COMPARATOR
**Evidence Label:** LITERATURE-SUPPORTED
**Confidence:** HIGH

### Registry Facts (ClinicalTrials.gov API v2, queried 2026-04-28)
- **Status:** TERMINATED
- **Phase:** 2
- **Allocation:** RANDOMIZED
- **Enrollment:** 30 (26 evaluable per prior literature)
- **Sponsor:** NCI/CCR (org study ID: 170057)
- **Has results:** YES (results section present in registry)
- **Start date:** Not specified in API response
- **Primary completion:** Not specified in API response

### Design
- **Population:** 1L metastatic CRC (not MSS-restricted at enrollment)
- **Intervention arm:** mFOLFOX6 + bevacizumab + Ad-CEA-MUC1-TRICOM vaccine + avelumab (anti-PD-L1)
- **Control arm:** mFOLFOX6 + bevacizumab alone
- **Primary endpoint:** Not specified in registry results section (trial terminated early)

### Efficacy Data (from prior canon, cross-verified)
- **HR (PFS):** 1.061 (95%CI 0.380–2.966), p=0.91
- **Interpretation:** No PFS benefit; trial terminated for futility/slow accrual
- **OS:** Not reported (insufficient events)
- **ORR:** Not separately reported in available sources

### Relevance to BreAK CRC-001
- **Backbone match:** mFOLFOX6 + bevacizumab — IDENTICAL to BreAK CRC-001 backbone
- **Line match:** 1L — IDENTICAL
- **Mechanism comparison:** Ad-CEA vaccine + avelumab (tumor-associated antigen, viral vector) vs STC-1010 (haptenated whole-cell, DNFB-modified). Different antigen strategy; both are active immunotherapy approaches.
- **Key insight:** QUILT-2.004 is the closest structural precedent to BreAK CRC-001. Its null result (HR 1.061) establishes the historical failure benchmark that STC-1010 must overcome. The trial's termination at n=30 means the null result is underpowered — it does not definitively rule out benefit.

### Limitations
- Terminated early (n=30); severely underpowered
- Not MSS-restricted — mixed MSS/MSI-H population may dilute signal
- Ad-CEA targets single antigen (CEA); STC-1010 is whole-cell (broader antigen repertoire)
- Results not published in peer-reviewed journal as of 2026-04-28 (registry results only)

### Canon Status
- HR 1.061 confirmed and patched (REC-001, REC-002, REC-003). Stale HR 1.02 is retired.

---

## CARD-02: GRANITE GO-010
**NCT:** NCT05141721
**Decision:** DIRECT COMPARATOR
**Evidence Label:** PRESS-RELEASE-ONLY (interim Phase 2 data)
**Confidence:** MEDIUM

### Registry Facts (ClinicalTrials.gov API v2, queried 2026-04-28)
- **Status:** ACTIVE_NOT_RECRUITING
- **Phase:** 2/3
- **Allocation:** RANDOMIZED (1:1)
- **Enrollment:** 700 (registered); 104 randomized; 69 treated in Phase 2 analysis
- **Sponsor:** Gritstone bio (now in Chapter 11 bankruptcy as of October 2024)
- **Has results:** NO (no results section in registry)
- **Primary completion:** 2027-03

### Design
- **Population:** 1L MSS mCRC (excludes dMMR/MSI-H, BRAF V600E, TMB <1 mut/Mb)
- **Intervention arm (maintenance):** GRT-C901/GRT-R902 (neoantigen vaccine, saRNA + adenoviral vectors) + atezolizumab + ipilimumab (1 dose) + FP + bev
- **Control arm (maintenance):** FP + bev alone
- **Primary endpoint (Phase 3):** PFS

### Efficacy Data (press releases only — NOT peer-reviewed)
**Data cut: October 17, 2024 (n=69 treated)**
- **All-comers:** HR 0.73 (90%CI 0.44–1.21); 27% relative risk reduction
- **ctDNA-low subgroup (n=31):** HR 0.50 (90%CI 0.20–1.28); 50% relative risk reduction
- **ctDNA-high subgroup (n=30):** HR 0.78 (90%CI 0.39–1.58); 22% relative risk reduction
- **Note:** Study not statistically powered for Phase 2 PFS analysis. No p-values reported. No median PFS values reported in available sources.
- **OS:** Expected H2 2025 (not yet reported)
- **Safety:** No discontinuations due to AEs; favorable tolerability

**Data cut: August 19, 2024 (n=69 treated)**
- **All-comers:** HR 0.79 (95%CI 0.42–1.50)
- **ctDNA-low subgroup:** HR 0.62 (95%CI 0.23–1.70)

### Relevance to BreAK CRC-001
- **Population match:** 1L MSS mCRC — IDENTICAL
- **Backbone difference:** Maintenance FP + bev (not induction mFOLFOX6 + bev). BreAK CRC-001 uses mFOLFOX6 ± bev throughout induction and maintenance.
- **Mechanism comparison:** Personalized neoantigen vaccine (patient-specific, manufactured per patient) vs STC-1010 (haptenated whole-cell, off-the-shelf). Fundamentally different antigen targeting.
- **Key insight:** GRANITE GO-010 is the most scientifically relevant ongoing comparator. The ctDNA-low subgroup HR 0.50 is the most compelling signal in the field for vaccine-based approaches in 1L MSS mCRC. However, all data are press-release-only and the sponsor is in bankruptcy.

### Limitations
- **CRITICAL:** All efficacy data from company press releases. Not peer-reviewed. Must not be cited as established evidence.
- Phase 2 portion not statistically powered for PFS
- Gritstone bio Chapter 11 filing (October 2024) — program continuity uncertain; Phase 3 portion may not complete
- 35/104 randomized patients did not advance to treatment (high dropout rate — 34%)
- Maintenance-only design differs from BreAK CRC-001 induction design
- No median PFS values available in public sources

### Identifier Note
NCT03639714 (GO-004, Phase 1/2, completed, n=29, multi-tumor) is a DIFFERENT trial from NCT05141721 (GO-010, Phase 2/3). Prior Agent 3 canon cited NCT03639714 as "GRANITE" — this is the early-phase predecessor, not the registrational trial.

---

## CARD-03: GRANITE GO-004
**NCT:** NCT03639714
**Decision:** STRUCTURAL PRECEDENT ONLY
**Evidence Label:** PRIMARY-REGISTRY-ONLY
**Confidence:** LOW

### Registry Facts (ClinicalTrials.gov API v2, queried 2026-04-28)
- **Status:** COMPLETED
- **Phase:** 1/2
- **Allocation:** NON_RANDOMIZED
- **Enrollment:** 29
- **Has results:** NO
- **Tumors:** MSS CRC + NSCLC + GEA + mUC (multi-tumor)

### Design
- **Population:** End-stage MSS CRC and other solid tumors (multi-line)
- **Intervention:** GRT-C901/GRT-R902 + nivolumab + ipilimumab (no chemo backbone)
- **Primary endpoint:** Safety/tolerability (Phase 1); preliminary efficacy (Phase 2)

### Relevance to BreAK CRC-001
- Provides early proof-of-concept for neoantigen vaccine immunogenicity in MSS CRC
- Not a comparator: wrong line, wrong population, non-randomized, no chemo backbone, no results posted

### Limitations
- No results posted despite COMPLETED status
- Multi-tumor cohort; CRC-specific data not separately available in public sources
- End-stage patients not comparable to 1L BreAK CRC-001 population

---

## CARD-04: Sintilimab + bev + XELOX
**NCT:** NCT04194359
**Decision:** PARTIAL COMPARATOR
**Evidence Label:** PEER-REVIEWED
**Confidence:** MEDIUM

### Registry Facts
- **Status:** COMPLETED (inferred from publication)
- **Phase:** 2
- **Allocation:** NON_RANDOMIZED (single-arm)
- **Enrollment:** 25
- **Has results:** YES (published eClinicalMedicine 2023)

### Publication
- **Journal:** eClinicalMedicine (The Lancet family)
- **Year:** 2023 (published July 27, 2023; PMID 37554125; DOI 10.1016/j.eclinm.2023.102123)
- **Authors:** Fang X, Zhu N, Zhong C, et al. (Zhejiang University)

### Design
- **Population:** RAS-mutant, MSS, unresectable 1L mCRC (Chinese single-center)
- **Intervention:** Sintilimab 200mg Q3W + bevacizumab 7.5mg/kg Q3W + oxaliplatin 135mg/m² + capecitabine 1g/m² D1-14 (21-day cycle); up to 8 induction cycles then maintenance (sintilimab + bev + cape)
- **Primary endpoints:** ORR (RECIST v1.1) and adverse events

### Efficacy Data (peer-reviewed, verified from PMC full text)
- **ORR:** 84% (95%CI 63.9–95.5%); CR 8%, PR 76%, SD 16%, PD 0%
- **DCR:** 100% (95%CI 86.3–100%)
- **Median PFS (FAS, n=25):** 18.2 months (95%CI 8.93–NR)
- **Median PFS (PPS, n=19, excludes surgical patients):** 9.9 months (95%CI 6.5–NR)
- **Conversion to surgery:** 6/25 (24%) achieved NED status after R0 resection
- **OS:** Not reported (follow-up 16.5 months median)
- **Liver metastasis subgroup ORR:** 93.3% (95%CI 68.1–99.8%)

### Safety
- Grade 3/4 TRAEs: neutropenia 12%, elevated ALT 8%
- No grade 5 events
- Manageable profile

### Biomarkers
- No significant predictors identified (PD-L1, RAS type, TMB) — likely underpowered
- TTN/OBSCN "double-hit" and decreased CNV burden post-treatment in surgical subgroup
- Better TIME infiltration in CR/PR vs non-CR/PR patients

### Relevance to BreAK CRC-001
- **Population match:** 1L RAS-mutant MSS mCRC — close but not identical (BreAK CRC-001 does not restrict to RAS-mutant)
- **Backbone difference:** XELOX (oxaliplatin + capecitabine) vs mFOLFOX6 (oxaliplatin + 5-FU/LV). Both are oxaliplatin-based; XELOX is oral capecitabine vs IV 5-FU.
- **Mechanism difference:** Sintilimab (anti-PD-1 checkpoint inhibitor) vs STC-1010 (active immunotherapy vaccine). Fundamentally different immune activation strategy.
- **Key insight:** Demonstrates that anti-PD-1 + bev + oxaliplatin-based chemo can achieve high ORR (84%) in 1L RAS-mutant MSS mCRC. Provides biological plausibility for the combination class. The 18.2-month mPFS in FAS is striking but must be interpreted with extreme caution given n=25, single-arm, single-center.

### Limitations
- n=25 — severely underpowered; no control arm
- Single-center (Zhejiang University, China)
- Sintilimab not approved in US/EU for CRC
- FAS mPFS 18.2 months vs PPS mPFS 9.9 months — large discrepancy driven by 6 surgical patients achieving NED; FAS figure is inflated by conversion surgery success
- Phase III follow-on (NCT05171660, n=494, randomized) ongoing — results pending

---

## CARD-05: Tislelizumab + XELOX + bev
**NCT:** NCT05970302
**Decision:** PARTIAL COMPARATOR
**Evidence Label:** PRIMARY-REGISTRY-ONLY
**Confidence:** LOW

### Registry Facts (ClinicalTrials.gov API v2, queried 2026-04-28)
- **Status:** RECRUITING
- **Phase:** 2
- **Allocation:** NON_RANDOMIZED (single-arm)
- **Enrollment:** 52
- **Sponsor:** Chinese trial (NCC-009591)
- **Has results:** NO

### Design
- **Population:** 1L MSS/pMMR RAS-mutated mCRC
- **Intervention:** Tislelizumab (anti-PD-1) + XELOX + bevacizumab
- **Primary endpoint:** ORR

### Relevance to BreAK CRC-001
- Same disease and line; similar backbone class (oxaliplatin + bev)
- No results available; Chinese-only trial; tislelizumab not approved in US for CRC
- Provides landscape context only

---

## CARD-06: Cadonilimab + CapeOX + bev
**NCT:** NCT06566755
**Decision:** PARTIAL COMPARATOR
**Evidence Label:** PRIMARY-REGISTRY-ONLY
**Confidence:** LOW

### Registry Facts (ClinicalTrials.gov API v2, queried 2026-04-28)
- **Status:** RECRUITING
- **Phase:** 3
- **Allocation:** NON_RANDOMIZED (single-arm)
- **Enrollment:** 30
- **Sponsor:** Chinese trial (AK104-IIT-C-M-0020)
- **Has results:** NO

### Design
- **Population:** 1L RAS-mutated or right-sided MSS mCRC
- **Intervention:** Cadonilimab (AK104, PD-1/CTLA-4 bispecific) + CapeOX + bevacizumab
- **Primary endpoint:** PFS

### Relevance to BreAK CRC-001
- Same disease and line; similar backbone class
- No results; Chinese-only; cadonilimab not approved in US/EU for CRC
- Phase 3 label with single-arm design is unusual — likely Chinese registrational intent only
- Provides landscape context only

---

## CARD-07: SAR445877 + FOLFOX6 + bev
**NCT:** NCT07500298 (secondary ID: NCI-2026-02086)
**Decision:** STRUCTURAL PRECEDENT ONLY
**Evidence Label:** PRIMARY-REGISTRY-ONLY
**Confidence:** LOW

### Registry Facts (ClinicalTrials.gov API v2, queried 2026-04-28)
- **Status:** NOT_YET_RECRUITING
- **Phase:** 1
- **Allocation:** NON_RANDOMIZED (dose-escalation)
- **Enrollment:** 41
- **Sponsor:** MD Anderson Cancer Center
- **Has results:** NO
- **Start date:** 2026-09-03
- **Completion date:** 2032-12-27

### Design
- **Population:** 1L MSS mCRC
- **Intervention:** SAR445877 (Sanofi; mechanism not publicly disclosed) + mFOLFOX6 + bevacizumab
- **Primary endpoint:** Safety/AEs (dose-escalation)
- **Arms:** Part 1 (dose escalation, BOIN design) → Part 2 (dose expansion, BOP2 design)

### Relevance to BreAK CRC-001
- **Backbone match:** mFOLFOX6 + bevacizumab — IDENTICAL to BreAK CRC-001
- **Population match:** 1L MSS mCRC — IDENTICAL
- **Critical limitation:** NOT YET RECRUITING. No efficacy data will be available until at minimum 2028–2030. Phase 1 only — no efficacy endpoint.
- **Identifier note:** "NCI-2026-02086" in prior shortlist = confirmed secondary ID on NCT07500298.
- Provides future competitive intelligence only; not usable as current comparator

---

## CARD-08: STAR15
**NCT:** NCT06149481
**Decision:** EXCLUDE
**Evidence Label:** PRIMARY-REGISTRY-ONLY
**Confidence:** HIGH (exclusion is definitive)

### Registry Facts (ClinicalTrials.gov API v2, queried 2026-04-28)
- **Status:** RECRUITING
- **Phase:** 1/2
- **Allocation:** NON_RANDOMIZED (2-arm)
- **Enrollment:** 60
- **Sponsor:** National Cancer Institute (NCI)
- **Has results:** NO
- **Start date:** 2024-03-26
- **Completion date:** 2030-10-31

### Design
- **Population:** mCRC with ≥2 prior lines of systemic therapy (refractory)
- **Intervention Arm 1:** Retifanlimab + TriAdeno vaccine + N-803
- **Intervention Arm 2:** Retifanlimab + TriAdeno vaccine + N-803 + SX-682
- **Primary endpoints:** Phase 1: safety; Phase 2: ORR

### Exclusion Rationale
- **Line mismatch:** Requires ≥2 prior lines. BreAK CRC-001 is 1L. No population overlap.
- **No chemo backbone:** STAR15 is checkpoint inhibitor + vaccine + cytokine + CXCR1/2 inhibitor. No oxaliplatin or bevacizumab.
- **Prior shortlist error corrected:** Shortlist described STAR15 as "NCT pending." This is incorrect — NCT06149481 has been registered since November 2023 and recruiting since March 2024.

### Mechanistic Note (for future reference)
TriAdeno vaccine targets CEA, MUC1, and brachyury — overlapping antigen targets with STC-1010 (whole-cell vaccine). N-803 (IL-15 agonist) and SX-682 (CXCR1/2 inhibitor) address TME immunosuppression. This combination is mechanistically interesting for late-line MSS CRC but is not a comparator for 1L BreAK CRC-001.

---

*Evidence cards generated 2026-04-28. All registry data from ClinicalTrials.gov API v2. Literature data from PMC full text. Press release data labeled accordingly.*
