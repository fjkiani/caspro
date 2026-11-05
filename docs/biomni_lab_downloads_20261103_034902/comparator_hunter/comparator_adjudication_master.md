# Comparator Hunter Agent — Master Adjudication Table
**Agent:** Comparator Hunter (Agent 1, Adjudication Run)
**Date:** 2026-04-28
**Scope:** BreAK CRC-001 (NCT06934538) — STC-1010 haptenated whole-cell vaccine, 1L MSS/pMMR mCRC, backbone mFOLFOX6 ± bevacizumab
**Method:** All claims verified from primary sources only (ClinicalTrials.gov API v2, PMC full text, company press releases where noted). No claim inherits trust from prior canon files.

---

## Adjudication Decision Labels

| Label | Definition |
|-------|-----------|
| DIRECT COMPARATOR | Same disease (1L MSS/pMMR mCRC), same backbone class (oxaliplatin + bev), randomized, results available or maturing |
| PARTIAL COMPARATOR | Overlapping population or mechanism but differs on line, backbone, or randomization |
| STRUCTURAL PRECEDENT ONLY | Different line or population; provides mechanistic/regulatory precedent but not head-to-head context |
| EXCLUDE | Wrong disease, wrong line, or no scientific relevance to BreAK CRC-001 |

## Evidence Labels

| Label | Definition |
|-------|-----------|
| PEER-REVIEWED | Published in indexed journal; full text verified |
| PRESS-RELEASE-ONLY | Data from company press release; not peer-reviewed; treat as preliminary |
| PRIMARY-REGISTRY-ONLY | ClinicalTrials.gov record only; no results posted |
| LITERATURE-SUPPORTED | Registry record + peer-reviewed publication cross-confirmed |

---

## Master Adjudication Table

| # | Trial Name | NCT | Status | Phase | n | Line | Population | Backbone | Randomized | Results | Evidence Label | Decision | Confidence |
|---|-----------|-----|--------|-------|---|------|-----------|---------|-----------|---------|---------------|---------|-----------|
| 1 | QUILT-2.004 | NCT03050814 | TERMINATED | 2 | 30 | 1L | mCRC (all-comer, not MSS-restricted) | FOLFOX + bev | YES (2-arm) | YES (has_results=true; HR 1.061) | LITERATURE-SUPPORTED | DIRECT COMPARATOR | HIGH |
| 2 | GRANITE GO-010 | NCT05141721 | ACTIVE_NOT_RECRUITING | 2/3 | 700 enrolled; 69 treated in Ph2 analysis | 1L maintenance | MSS mCRC (excludes dMMR, BRAF V600E) | FP + bev (maintenance) | YES (1:1) | INTERIM ONLY (press release) | PRESS-RELEASE-ONLY | DIRECT COMPARATOR | MEDIUM |
| 3 | GRANITE GO-004 | NCT03639714 | COMPLETED | 1/2 | 29 | Multi-line (end-stage) | MSS CRC + NSCLC + GEA + mUC | Nivo + ipi (no chemo backbone) | NO (single-arm) | NO (has_results=false) | PRIMARY-REGISTRY-ONLY | STRUCTURAL PRECEDENT ONLY | LOW |
| 4 | Sintilimab + bev + XELOX | NCT04194359 | COMPLETED | 2 | 25 | 1L | RAS-mutant MSS mCRC | XELOX + bev | NO (single-arm) | YES (eClinicalMedicine 2023) | PEER-REVIEWED | PARTIAL COMPARATOR | MEDIUM |
| 5 | Tislelizumab + XELOX + bev | NCT05970302 | RECRUITING | 2 | 52 | 1L | MSS/pMMR RAS-mutated mCRC | XELOX + bev | NO (single-arm) | NO | PRIMARY-REGISTRY-ONLY | PARTIAL COMPARATOR | LOW |
| 6 | Cadonilimab + CapeOX + bev | NCT06566755 | RECRUITING | 3 | 30 | 1L | RAS-mutated or right-sided MSS mCRC | CapeOX + bev | NO (single-arm) | NO | PRIMARY-REGISTRY-ONLY | PARTIAL COMPARATOR | LOW |
| 7 | SAR445877 + FOLFOX6 + bev | NCT07500298 | NOT_YET_RECRUITING | 1 | 41 | 1L | MSS mCRC | FOLFOX6 + bev | NO (dose-escalation) | NO | PRIMARY-REGISTRY-ONLY | STRUCTURAL PRECEDENT ONLY | LOW |
| 8 | STAR15 | NCT06149481 | RECRUITING | 1/2 | 60 | ≥2L (refractory) | mCRC (all-comer; MSI-H must have had prior CPI) | SX-682 + TriAdeno + retifanlimab + N-803 | NO (2-arm non-randomized) | NO | PRIMARY-REGISTRY-ONLY | EXCLUDE | HIGH |

---

## Critical Adjudication Notes

### Trial 1 — QUILT-2.004 (NCT03050814): DIRECT COMPARATOR ✓
- **Why direct:** 1L mCRC, FOLFOX + bev backbone, randomized 2-arm, results posted.
- **Limitation:** Not MSS-restricted at enrollment (enrolled all-comer mCRC); MSS subgroup not separately powered. HR 1.061 (0.380–2.966, p=0.91) is from a terminated trial with n=26 evaluable — wide CI, no efficacy signal. This is the **closest structural match** to BreAK CRC-001 but the null result and termination are the key data points.
- **Canon status:** HR 1.061 confirmed and patched in REC-001/REC-002/REC-003. Use only this value.

### Trial 2 — GRANITE GO-010 (NCT05141721): DIRECT COMPARATOR (MEDIUM confidence)
- **Why direct:** 1L MSS mCRC, randomized 1:1, maintenance after oxaliplatin induction, FP + bev backbone, neoantigen vaccine mechanism.
- **Critical limitation:** All efficacy data (HR 0.73 [90%CI 0.44-1.21] all-comers; HR 0.50 [90%CI 0.20-1.28] ctDNA-low) come from **company press releases only** [42][53]. Not peer-reviewed. Trial not statistically powered for Phase 2 PFS. Gritstone bio filed Chapter 11 bankruptcy October 2024 — program continuity uncertain.
- **Mechanism difference:** Neoantigen vaccine (personalized mRNA + adenoviral vectors) vs STC-1010 (haptenated whole-cell). Different antigen targeting strategy.
- **Backbone difference:** Maintenance FP + bev (not induction FOLFOX + bev). BreAK CRC-001 uses mFOLFOX6 ± bev throughout.
- **Evidence label:** PRESS-RELEASE-ONLY. Downstream agents must not cite HR 0.73 as peer-reviewed.

### Trial 3 — GRANITE GO-004 (NCT03639714): STRUCTURAL PRECEDENT ONLY
- **Why not direct:** Phase 1/2, non-randomized, n=29, multi-tumor (not CRC-specific), end-stage patients, no chemo backbone. This is the early-phase predecessor to GO-010.
- **Prior canon error:** Agent 3 cited NCT03639714 as "GRANITE" without distinguishing it from GO-010. These are different trials. NCT03639714 provides mechanistic proof-of-concept only.
- **No results posted** on ClinicalTrials.gov despite COMPLETED status.

### Trial 4 — Sintilimab + bev + XELOX (NCT04194359): PARTIAL COMPARATOR
- **Why partial:** 1L RAS-mutant MSS mCRC, XELOX + bev backbone (XELOX ≈ CapeOX, not mFOLFOX6), single-arm, n=25, single-center Chinese trial.
- **Key results:** ORR 84% (95%CI 63.9–95.5%), mPFS 18.2 months (FAS), DCR 100%. Published eClinicalMedicine 2023 [51].
- **Limitation:** n=25 is severely underpowered; single-arm (no control); single-center; Chinese population; sintilimab not approved in US/EU. Results are hypothesis-generating only. The 84% ORR is strikingly high and should be interpreted with caution given small n and single-arm design.
- **Relevance to BreAK CRC-001:** Demonstrates that anti-PD-1 + bev + oxaliplatin-based chemo can achieve high ORR in 1L RAS-mutant MSS mCRC. Provides biological plausibility for the combination strategy but is not a direct benchmark.
- **Phase III follow-on:** NCT05171660 (randomized, n=494, 20 centers) is ongoing — watch for results.

### Trial 5 — Tislelizumab + XELOX + bev (NCT05970302): PARTIAL COMPARATOR (LOW confidence)
- **Why partial:** 1L MSS/pMMR RAS-mutated mCRC, XELOX + bev backbone, anti-PD-1 mechanism. Chinese trial, single-arm, n=52, no results.
- **Limitation:** No results posted. Chinese-only trial (NCC-009591). Tislelizumab not approved in US for CRC. Primary endpoint ORR only.

### Trial 6 — Cadonilimab + CapeOX + bev (NCT06566755): PARTIAL COMPARATOR (LOW confidence)
- **Why partial:** 1L RAS-mutated or right-sided MSS mCRC, CapeOX + bev backbone, PD-1/CTLA-4 bispecific (AK104). Chinese trial, single-arm, n=30, no results.
- **Limitation:** No results posted. Chinese-only trial. Cadonilimab not approved in US/EU for CRC. Phase 3 label but single-arm design is unusual for Phase 3 — likely registrational intent for Chinese market only.

### Trial 7 — SAR445877 + FOLFOX6 + bev (NCT07500298): STRUCTURAL PRECEDENT ONLY
- **Why not direct:** Phase 1 dose-escalation only, NOT YET RECRUITING (start date 2026-09-03), n=41, primary endpoint safety only. No efficacy data will be available for years.
- **Identifier resolution:** "NCI-2026-02086" in prior shortlist = secondary ID on NCT07500298. Confirmed.
- **Relevance:** SAR445877 mechanism unknown from public sources (Sanofi asset). The FOLFOX6 + bev backbone is identical to BreAK CRC-001. This trial will eventually be a direct comparator but is currently pre-data.

### Trial 8 — STAR15 (NCT06149481): EXCLUDE
- **Why excluded:** Eligibility requires ≥2 prior lines of systemic therapy. This is a **refractory/late-line** trial. BreAK CRC-001 is 1L. No population overlap.
- **Mechanism note:** TriAdeno vaccine (CEA/MUC1/brachyury) + retifanlimab (PD-1) + N-803 (IL-15 agonist) + SX-682 (CXCR1/2 inhibitor) is a multi-agent immunotherapy combination with no chemo backbone. Mechanistically interesting but wrong line.
- **Prior shortlist error:** The shortlist described STAR15 as "NCT pending" — this is incorrect. NCT06149481 has been registered since November 2023 and has been recruiting since March 2024.

---

## Summary Decision Matrix

| Decision | Trials | Count |
|---------|--------|-------|
| DIRECT COMPARATOR | QUILT-2.004, GRANITE GO-010 | 2 |
| PARTIAL COMPARATOR | Sintilimab+bev+XELOX, Tislelizumab+XELOX+bev, Cadonilimab+CapeOX+bev | 3 |
| STRUCTURAL PRECEDENT ONLY | GRANITE GO-004, SAR445877+FOLFOX6+bev | 2 |
| EXCLUDE | STAR15 | 1 |

---

*All primary source queries executed 2026-04-28. Evidence labels reflect data available at time of adjudication.*
