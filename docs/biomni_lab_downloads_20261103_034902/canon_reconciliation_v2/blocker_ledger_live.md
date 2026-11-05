---
title: Brenus — Blocker Ledger Live
version: 2.0
created: 2026-04-29
agent: Canon Reconciliation + Migration Agent v2
authority: PhD Verification Agent (2026-04-27/28) + Weaponization Agent (2026-04-28/29)
supersedes: brenus_final_blockers_registry.md v1.1-FINAL
policy: This document is the single live reference for all open blockers. Downstream agents must consult this before asserting any claim in a blocked domain. A BLOCKED field is a hard gate — do not assert, do not infer, do not inherit from prior agent canon.
---

# BRENUS — BLOCKER LEDGER LIVE v2.0

## SUMMARY TABLE

| Blocker ID | Domain | Status | Impact | Resolution Path | Last Updated |
|------------|--------|--------|--------|-----------------|--------------|
| B-001 | Human cell line identity for STC-1010 | **RESOLVED** | HIGH | ASCO 2023 e14661 direct retrieval | 2026-04-28 |
| B-002 | Clinical GMP manufacturing parameters | **BLOCKED** | MEDIUM | Brenus data room / IND filing | 2026-04-28 |
| B-003 | Human clinical efficacy and safety data | **PARTIALLY CLOSED — PRESS-RELEASE-ONLY** | HIGH | AACR 2026 CT051 via BusinessWire | 2026-04-29 |
| B-004 | Bevacizumab arm assignment in BreAK CRC-001 | **PROVISIONAL** | LOW | Protocol document from Brenus | 2026-04-28 |
| B-005 | ASCO 2024 abstract-specific claims | **CLOSED — CLAIM INVALIDATED** | MEDIUM | Weaponization Agent finding | 2026-04-29 |
| B-006 | HT29 BRAF V600E scientific conflict resolution | **BLOCKED** | HIGH | Additional data from Brenus | 2026-04-28 |
| SC-001 | HT29 BRAF V600E vs. BRAF WT eligibility conflict | **ACTIVE CONFLICT** | HIGH | Cannot resolve without Brenus internal data | 2026-04-28 |

---

## DETAILED ENTRIES

---

### B-001 — Human Cell Line Identity for Clinical STC-1010
**Status: RESOLVED** (2026-04-28)

**Confirmed cell lines:** HCT116, HT29, LoVo — `[PROVISIONAL — high confidence]`
**Source:** ASCO 2023 abstract e14661 (JCO 41:16_suppl:e14661)
**Verbatim:** *"We confirmed these proof-of-concept efficacy with the human STC-1010 using three CRC human cell lines (HCT116, HT29 and Lovo)."*

**Activated conflict:** Resolution of B-001 activates SC-001 (HT29 BRAF V600E vs. BRAF WT eligibility). See SC-001 entry.

**What may be asserted:**
- "STC-1010 uses HCT116, HT29, and LoVo human CRC cell lines" — `[PROVISIONAL]`
- Full confirmation requires ASCO abstract database access or Brenus NDA data room

---

### B-002 — Clinical GMP Manufacturing Parameters
**Status: BLOCKED**

**What is blocked:** All clinical GMP manufacturing parameters for STC-1010:
- Clinical batch size and cell concentration
- Clinical irradiation dose
- Clinical haptenation concentration and duration
- Clinical formulation buffer, cryoprotectant, storage conditions
- Any GMP-specific process parameters

**What may be asserted (with correct tagging):**
- "Murine surrogate manufacturing: DNFB 12.7 µg/mL 30 min, 10 Gy irradiation, 42°C thermal stress, 25 Gy final inactivation, EBSS + 80 g/L sucrose at -80°C" — `[VERIFIED — murine only, Alzeeb et al. 2024]`
- "Brenus states the manufacturing process is GMP ready and scalable" — `[COMPANY_CLAIM]`
- "Clinical GMP parameters are not disclosed in any publicly available source" — `[VERIFIED]`

**Resolution path:** Brenus data room / IND filing (CMC section)

---

### B-003 — Human Clinical Efficacy and Safety Data
**Status: PARTIALLY CLOSED — PRESS-RELEASE-ONLY** (updated 2026-04-29)

**Change from v1.1:** Weaponization Agent (2026-04-29) confirmed AACR 2026 CT051 data via BusinessWire press release (Apr 14, 2026). Data is real and citable but carries PRESS-RELEASE-ONLY evidence grade.

**Confirmed data points (PRESS-RELEASE-ONLY):**
| Data point | Value | Evidence grade |
|------------|-------|----------------|
| Patients treated | n=6 | PRESS-RELEASE-ONLY |
| Median follow-up | ~6 months | PRESS-RELEASE-ONLY |
| DLTs | 0 | PRESS-RELEASE-ONLY |
| DCR (RECIST) | 100% (6/6) | PRESS-RELEASE-ONLY — indistinguishable from SOC |
| DTH responses | Observed | PRESS-RELEASE-ONLY — surrogate marker only |
| Line of therapy | 1L MSS mCRC | PRESS-RELEASE-ONLY |
| Trial | NCT06934538 (BreAK CRC-001) | PRESS-RELEASE-ONLY |

**What remains blocked:**
- Confidence intervals on any data point — BLOCKED
- ORR breakdown — BLOCKED
- PFS data — BLOCKED
- Quantified immune response data — BLOCKED
- Any peer-reviewed clinical publication — BLOCKED (does not exist)

**Hard rule:** PRESS-RELEASE-ONLY data must not be presented as peer-reviewed evidence. Must not be used to claim STC-1010 efficacy. DCR of 100% in n=6 is indistinguishable from mFOLFOX6 ± bev SOC (~80–90% DCR).

**Source:** BusinessWire AACR 2026 CT051 (Apr 14, 2026): https://www.businesswire.com/news/home/20260414465808/en/

---

### B-004 — Bevacizumab Arm Assignment in BreAK CRC-001
**Status: PROVISIONAL**

**What is confirmed:** Registry states "mFOLFOX6 with or without bevacizumab" — `[VERIFIED]`
**What is provisional:** Which specific arms receive bevacizumab; rationale for optionality

**What may be asserted:**
- "STC-1010 is administered with mFOLFOX6 with or without bevacizumab" — `[VERIFIED]`
- "Arm-level bevacizumab assignment is not specified in the public registry" — `[VERIFIED]`

**Resolution path:** Protocol document from Brenus (not publicly available)

---

### B-005 — ASCO 2024 Abstract-Specific Claims
**Status: CLOSED — CLAIM INVALIDATED** (2026-04-29)

**Change from v1.1:** Weaponization Agent (2026-04-29) confirmed ASCO 2024 (abstract 238381) was a **trial design presentation only** — zero patient-level data. First patients were not dosed until September 2025.

**Finding:** Any prior canon claim citing "ASCO 2024 efficacy data" for STC-1010 is factually incorrect. ASCO 2024 contained no patient-level data.

**Correct citation for first-in-human data:** AACR 2026 CT051 (April 14, 2026) — see B-003.

**What may be asserted:**
- "ASCO 2024 (abstract 238381) was a trial design presentation; no patient-level data was presented" — `[VERIFIED — Weaponization Agent]`
- "First patients were dosed in September 2025" — `[VERIFIED — registry + Brenus PR]`

**Sweep result:** No active ASCO 2024 efficacy claims found in any Brenus canon file after reconciliation sweep (2026-04-29).

---

### B-006 — HT29 BRAF V600E Scientific Conflict Resolution
**Status: BLOCKED**

**What is blocked:** Any resolution of the scientific conflict documented in SC-001. Specifically: whether the use of BRAF V600E-mutant HT29 as a vaccine component creates a meaningful scientific problem for the BRAF wild-type patient population enrolled in BreAK CRC-001.

**Data needed to resolve:**
1. Primary source explicitly addressing rationale for HT29 inclusion in context of BRAF WT patient eligibility
2. Proteomic or immunological data showing whether BRAF V600E-associated antigens in HT29 contribute meaningfully to the vaccine's antigen repertoire for BRAF WT patients
3. Mechanistic explanation for the BRAF WT eligibility requirement
4. Clinical or preclinical data showing immune response patterns in BRAF WT patients vaccinated with HT29-containing preparations

**What may be asserted:**
- "STC-1010 contains HT29, a BRAF V600E-mutant cell line, while BreAK CRC-001 enrolls only BRAF wild-type patients. The scientific rationale for this design choice is not disclosed in any retrieved source." — `[VERIFIED facts]` + `[BLOCKED — rationale not retrieved]`

**Hard rule:** Do not assert this is a flaw. Do not assert it is intentional. Document and flag as unresolved.

---

### SC-001 — HT29 BRAF V600E vs. BRAF Wild-Type Eligibility Conflict
**Status: ACTIVE CONFLICT**

**Known facts (all VERIFIED):**
1. HT29 is confirmed as one of three human cell lines in clinical STC-1010 — `[VERIFIED]` (ASCO 2023 e14661)
2. HT29 carries BRAF V600E mutation — established cell line biology
3. BreAK CRC-001 Exclusion Criterion #7 explicitly excludes BRAF-mutant patients — `[VERIFIED]` (NCT06934538)
4. All three arms require BRAF wild-type disease — `[VERIFIED]` (NCT06934538)

**The conflict:** Vaccine contains BRAF V600E-mutant cell line; trial enrolls only BRAF WT patients.

**What cannot be resolved without additional data:**
- Scientific significance of the BRAF V600E/WT mismatch
- Whether this is a design flaw, intentional choice, or clinically irrelevant feature
- Any mechanistic explanation

**Hard rule:** Do not speculate about resolution. Document accurately and flag as unresolved. Resolution tracked in B-006.

---

## RESOLUTION PRIORITY ORDER

| Priority | Blocker | Rationale |
|----------|---------|-----------|
| 1 | B-006 / SC-001 | Highest-priority open scientific question; requires Brenus internal data |
| 2 | B-003 (full closure) | Peer-reviewed publication of BreAK CRC-001 interim results needed to upgrade from PRESS-RELEASE-ONLY |
| 3 | B-002 | GMP parameters needed for CMC diligence |
| 4 | B-004 | Protocol detail; "with or without" framing sufficient for most positioning contexts |
| ~~5~~ | ~~B-001~~ | **RESOLVED** |
| ~~6~~ | ~~B-005~~ | **CLOSED — INVALIDATED** |

---

## CHANGE LOG

| Version | Date | Change |
|---------|------|--------|
| 1.0-FINAL | 2026-04-28 | Initial creation from Canon v2 FREEZE |
| 1.1-FINAL | 2026-04-28 | B-001 resolved; SC-001 and B-006 added |
| 2.0 | 2026-04-29 | B-003 updated to PARTIALLY CLOSED — PRESS-RELEASE-ONLY (Weaponization Agent AACR 2026 CT051 retrieval); B-005 CLOSED — CLAIM INVALIDATED (ASCO 2024 = study design only, no patient data); supersedes v1.1-FINAL |

---

*Canon Reconciliation + Migration Agent v2 — 2026-04-29*
*Authority: PhD Verification Agent + Weaponization Agent*
