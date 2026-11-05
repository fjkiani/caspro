# Excluded Trials Log — Comparator Hunter Agent
**Date:** 2026-04-28
**Scope:** BreAK CRC-001 comparator adjudication

This file documents all trials that were considered and excluded from the direct/partial comparator set, with explicit rationale. Trials assigned STRUCTURAL PRECEDENT ONLY or EXCLUDE decisions are logged here.

---

## EXCL-01: GRANITE GO-004 (NCT03639714)
**Decision:** STRUCTURAL PRECEDENT ONLY (not a comparator)
**Shortlist source:** Prior Agent 3 canon (cited as "GRANITE")

### Exclusion Rationale
1. **Wrong phase:** Phase 1/2 (not registrational)
2. **Wrong population:** Multi-tumor (MSS CRC + NSCLC + GEA + mUC); not CRC-specific
3. **Wrong line:** End-stage, multi-line patients (not 1L)
4. **Non-randomized:** Single-arm; no control
5. **No chemo backbone:** Nivo + ipi only; no oxaliplatin or bevacizumab
6. **No results posted:** COMPLETED status but has_results=false on ClinicalTrials.gov

### What It Provides
- Early proof-of-concept for neoantigen vaccine immunogenicity in MSS CRC
- Mechanistic precedent for GRT-C901/GRT-R902 platform (predecessor to GO-010)

### Identifier Correction
Prior Agent 3 cited NCT03639714 as "GRANITE" without distinguishing it from GO-010 (NCT05141721). These are sequential trials of the same program. NCT03639714 = GO-004 (Phase 1/2, completed). NCT05141721 = GO-010 (Phase 2/3, ongoing). Both are relevant but must not be conflated.

---

## EXCL-02: SAR445877 + FOLFOX6 + bev (NCT07500298)
**Decision:** STRUCTURAL PRECEDENT ONLY (not yet a comparator)
**Shortlist source:** Prior shortlist as "NCI-2026-02086/SAR445877"

### Exclusion Rationale
1. **Not yet recruiting:** Start date 2026-09-03; no patients enrolled as of 2026-04-28
2. **Phase 1 only:** Dose-escalation; primary endpoint is safety, not efficacy
3. **No results:** No efficacy data will be available until 2028–2030 at earliest
4. **Non-randomized:** Dose-escalation design; no control arm

### What It Provides
- Confirms that mFOLFOX6 + bev backbone is being used in 1L MSS mCRC trials with novel agents
- Competitive intelligence: Sanofi/MD Anderson are pursuing the same backbone as BreAK CRC-001
- Future watch item: If SAR445877 advances to Phase 2/3, it becomes a direct comparator

### Identifier Resolution
"NCI-2026-02086" in prior shortlist = confirmed secondary ID on NCT07500298. The primary NCT is NCT07500298. Both identifiers refer to the same trial.

---

## EXCL-03: STAR15 (NCT06149481)
**Decision:** EXCLUDE (definitive)
**Shortlist source:** Prior shortlist as "STAR15 (NCT pending)"

### Exclusion Rationale
1. **Wrong line:** Eligibility requires ≥2 prior lines of systemic therapy. BreAK CRC-001 is 1L. No population overlap.
2. **No chemo backbone:** Retifanlimab + TriAdeno vaccine + N-803 ± SX-682. No oxaliplatin, no bevacizumab.
3. **Non-randomized:** 2-arm but not randomized (patients assigned to arms, not randomized)
4. **No results:** Recruiting since March 2024; completion expected 2030

### Prior Shortlist Error
The shortlist described STAR15 as "NCT pending." This is incorrect. NCT06149481 has been registered since November 2023 and has been actively recruiting since March 2024. The NCI protocol number is 001563-C (NIH Clinical Center). This error should be corrected in any downstream documents that reference the shortlist.

### What It Provides
- Mechanistic interest: TriAdeno vaccine (CEA/MUC1/brachyury) targets antigens overlapping with STC-1010 whole-cell approach
- NCI sponsorship provides regulatory credibility for the vaccine + checkpoint combination strategy in mCRC
- Late-line data (when available) may inform biomarker selection for future BreAK CRC-001 expansion cohorts

---

## Trials Not on Shortlist — Considered and Excluded

The following trials were identified during primary source searches but were not on the original shortlist. They are logged here for completeness.

### NCT05171660 — Sintilimab + bev + XELOX Phase III (BBCAPX)
- **Status:** Recruiting (randomized, n=494, 20 centers, China)
- **Decision:** WATCH — not yet a comparator (no results), but is the randomized follow-on to CARD-04 (NCT04194359)
- **Rationale for exclusion from current set:** No results posted; Chinese-only trial; sintilimab not approved in US/EU

### NCT04194359 Phase III follow-on (BMC Cancer 2023 protocol)
- Same as NCT05171660 above.

---

## Summary

| Trial | NCT | Exclusion Category | Reason |
|-------|-----|-------------------|--------|
| GRANITE GO-004 | NCT03639714 | STRUCTURAL PRECEDENT ONLY | Wrong phase/line/population; no results |
| SAR445877 + FOLFOX6 + bev | NCT07500298 | STRUCTURAL PRECEDENT ONLY | Not yet recruiting; Phase 1 only |
| STAR15 | NCT06149481 | EXCLUDE | Wrong line (≥2L refractory); no chemo backbone |
| BBCAPX Phase III | NCT05171660 | WATCH | No results; Chinese-only |

---

*Log generated 2026-04-28. All registry data from ClinicalTrials.gov API v2.*
