# Comparator Hunter Agent — Executive Summary
**Date:** 2026-04-28
**Agent:** Comparator Hunter (Agent 1, Adjudication Run)
**Scope:** BreAK CRC-001 (STC-1010, 1L MSS/pMMR mCRC, mFOLFOX6 ± bev)
**Method:** Primary source verification only. ClinicalTrials.gov API v2 + PMC full text + company press releases (labeled).

---

## Mission Outcome

All 7 trials on the prior shortlist have been adjudicated from primary sources. 3 identifier errors corrected. 8 trials total assessed (7 shortlist + 1 additional identified). Final decisions:

| Decision | Count | Trials |
|---------|-------|--------|
| DIRECT COMPARATOR | 2 | QUILT-2.004, GRANITE GO-010 |
| PARTIAL COMPARATOR | 3 | Sintilimab+bev+XELOX, Tislelizumab+XELOX+bev, Cadonilimab+CapeOX+bev |
| STRUCTURAL PRECEDENT ONLY | 2 | GRANITE GO-004, SAR445877+FOLFOX6+bev |
| EXCLUDE | 1 | STAR15 |

---

## Top-Line Findings

### 1. No positive randomized trial exists in 1L MSS mCRC with immunotherapy
The only completed randomized trial (QUILT-2.004, NCT03050814) was terminated with HR 1.061 (0.380–2.966, p=0.91) — a null result. GRANITE GO-010 (NCT05141721) shows a trend (HR 0.73, 90%CI 0.44–1.21) but is underpowered, press-release-only, and its sponsor filed Chapter 11 in October 2024. The field has not yet produced a positive Phase 3 result.

### 2. QUILT-2.004 is the closest structural match to BreAK CRC-001
Same backbone (mFOLFOX6 + bev), same line (1L), randomized. Its null result is the primary historical benchmark STC-1010 must overcome. The mechanistic distinction (whole-cell + DNFB haptenation vs. defined-antigen viral vector + anti-PD-L1) is the core differentiation narrative.

### 3. GRANITE GO-010's ctDNA-low signal is the most compelling field hypothesis
HR 0.50 (90%CI 0.20–1.28) in ctDNA-low patients (n=31) from a press release. If confirmed in peer-reviewed data, this would validate the vaccine approach in 1L MSS mCRC and suggest patient selection by tumor burden. BreAK CRC-001 should consider whether ctDNA monitoring is incorporated in its biomarker strategy.

### 4. Chinese single-arm trials show high ORRs but are not benchmarks
Sintilimab + bev + XELOX (n=25): ORR 84%, mPFS 18.2 months. These numbers are striking but come from a severely underpowered, single-arm, single-center trial. They establish biological plausibility for the combination class but cannot be used as efficacy benchmarks.

### 5. SAR445877 (NCT07500298) is a future competitive threat
MD Anderson / Sanofi trial using the IDENTICAL backbone (mFOLFOX6 + bev) in 1L MSS mCRC. Not yet recruiting (start 2026-09-03). Phase 1 only. No efficacy data for years. Watch closely.

### 6. STAR15 is definitively excluded
STAR15 (NCT06149481) requires ≥2 prior lines — it is a refractory trial, not 1L. It was incorrectly described as "NCT pending" in the prior shortlist. NCT06149481 has been registered since November 2023 and recruiting since March 2024.

---

## Identifier Corrections (3 errors fixed)

| Error | Correct Value | Impact |
|-------|--------------|--------|
| Prior Agent 3 cited NCT03639714 as "GRANITE" | NCT03639714 = GO-004 (Phase 1/2, completed, n=29, multi-tumor). The registrational GRANITE trial is NCT05141721 (GO-010, Phase 2/3). | Medium — conflation of two different trials |
| Prior shortlist listed "NCI-2026-02086/SAR445877" without NCT | NCI-2026-02086 = secondary ID on NCT07500298 (MD Anderson, Phase 1, not yet recruiting) | Low — identifier resolved |
| Prior shortlist listed STAR15 as "NCT pending" | STAR15 = NCT06149481, registered November 2023, recruiting March 2024 | Medium — trial was findable; shortlist was stale |

---

## Evidence Quality Assessment

| Trial | Evidence Quality | Key Limitation |
|-------|----------------|---------------|
| QUILT-2.004 | LITERATURE-SUPPORTED | Terminated at n=30; not MSS-restricted |
| GRANITE GO-010 | PRESS-RELEASE-ONLY | Not peer-reviewed; sponsor in bankruptcy |
| GRANITE GO-004 | PRIMARY-REGISTRY-ONLY | No results posted; wrong line/population |
| Sintilimab + bev + XELOX | PEER-REVIEWED | n=25; single-arm; single-center; Chinese |
| Tislelizumab + XELOX + bev | PRIMARY-REGISTRY-ONLY | No results; Chinese-only |
| Cadonilimab + CapeOX + bev | PRIMARY-REGISTRY-ONLY | No results; Chinese-only |
| SAR445877 + FOLFOX6 + bev | PRIMARY-REGISTRY-ONLY | Not yet recruiting; Phase 1 only |
| STAR15 | PRIMARY-REGISTRY-ONLY | Wrong line; excluded |

---

## Downstream Agent Routing

### Agent 5 (CrisPRO Fit-Gap)
- Use QUILT-2.004 (HR 1.061) as the primary historical benchmark
- Use GRANITE GO-010 interim data (HR 0.73) as PRELIMINARY landscape context — must be labeled
- Use sintilimab data (ORR 84%, mPFS 18.2mo) as biological plausibility — must note n=25 single-arm
- Do NOT use STAR15 as a comparator

### Agent 6 (Outreach)
- Use QUILT-2.004 and GRANITE GO-010 for landscape framing
- Do NOT cite GRANITE HR 0.73 as established evidence in external communications
- Do NOT cite sintilimab ORR 84% as a benchmark without n=25 caveat

### Canon Master (brenus_crispro_master.md)
- Update §1.7/§1.9 with HR 1.061 (already patched per REC-001/REC-002)
- Add GRANITE GO-010 as new entry with PRESS-RELEASE-ONLY label
- Add STAR15 exclusion note
- Correct GRANITE identifier (NCT03639714 ≠ GO-010)

---

## Files Produced

| File | Description |
|------|-------------|
| `comparator_adjudication_master.md` | Master table: all 8 trials, decisions, evidence labels, critical notes |
| `trial_evidence_cards.md` | Detailed evidence card per trial with all primary-source data |
| `excluded_trials_log.md` | Excluded/structural-precedent trials with rationale |
| `break_crc001_positioning_matrix.md` | Head-to-head positioning vs. direct comparators; CrisPRO implications |
| `evidence_label_glossary.md` | Definitions for all labels; downstream routing rules |
| `comparator_hunter_summary.md` | This file |

---

## Open Items / Watch List

| Item | Priority | Action |
|------|---------|--------|
| GRANITE GO-010 peer-reviewed publication | HIGH | Monitor for journal submission; upgrade from PRESS-RELEASE-ONLY when published |
| GRANITE GO-010 OS data | HIGH | Expected H2 2025 (per OncLive Oct 2024); check if published |
| Gritstone bio bankruptcy outcome | HIGH | Monitor asset sale (bid deadline was Dec 4, 2024); determine if GO-010 Phase 3 continues |
| NCT05171660 (BBCAPX Phase III) results | MEDIUM | Randomized sintilimab + bev + XELOX vs. bev + XELOX; n=494; watch for results |
| SAR445877 (NCT07500298) Phase 1 initiation | MEDIUM | Start date 2026-09-03; monitor for dose-escalation results |
| BreAK CRC-001 ctDNA biomarker strategy | MEDIUM | Consider whether ctDNA monitoring should be incorporated given GRANITE ctDNA-low signal |

---

*Summary generated 2026-04-28. All data from primary sources. No claim inherits trust from prior canon files.*
