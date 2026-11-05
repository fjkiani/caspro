# Brenus / STC-1010 / BreAK CRC-001 — Final Blockers Registry
## PhD Verification Agent | CrisPRO Brenus Diligence Package

**Version:** 1.1-FINAL ⚠️ UPDATED 2026-04-28 [e14661 + TPS3635 direct retrieval]
**Date:** 2026-04-28 (v1.0) | Updated: 2026-04-28 (v1.1) — B-001 resolved; SC-001 and B-006 added
**Authority:** PhD Verification Agent — post B-003 source-clean correction
**Base artifact:** `brenus_verified_claim_ledger_v1.md` (2026-04-27)
**Canon reference:** `brenus_canon_v2_freeze.md` (2026-04-28)
**Machine-ingestible facts:** `brenus_engine_safe_input_block_v2.yaml` (2026-04-28)

> **PURPOSE:** This registry is the single authoritative reference for all unresolved information gaps in the Brenus/STC-1010 fact layer. Downstream agents, strategy memos, and outreach drafts must consult this registry before asserting any claim in a blocked area. A `[BLOCKED]` field is a hard gate — do not assert, do not infer, do not inherit from prior agent canon.

---

## REGISTRY POLICY

| Rule | Requirement |
|------|-------------|
| **Hard gate** | Any field with `status: BLOCKED` must not be asserted in downstream outputs under any circumstances |
| **Provisional gate** | Any field with `status: PROVISIONAL` must be explicitly labeled `[PROVISIONAL — unconfirmed]` if used |
| **No inheritance** | No claim from a blocked source (BusinessWire, BioSpace, AACR CT051, ASCO e14661) may be inherited from prior agent canon |
| **Resolution required** | A blocker may only be resolved by direct retrieval of the named primary source or equivalent Brenus data room disclosure |
| **Re-verification required** | Resolution of any blocker requires re-verification against the primary source before the claim may be tagged `[VERIFIED]` |

---

## BLOCKER SUMMARY TABLE

| Blocker ID | Domain | Status | Impact Level | Resolution Path |
|------------|--------|--------|--------------|-----------------|
| B-001 | Human cell line identity for STC-1010 | ~~BLOCKED~~ **RESOLVED** ⚠️ UPDATED 2026-04-28 [e14661] | HIGH | RESOLVED — ASCO 2023 e14661 DIRECT_SOURCE |
| B-002 | Clinical GMP manufacturing parameters | BLOCKED | MEDIUM | Brenus data room / IND filing |
| B-003 | Human clinical efficacy and safety data | BLOCKED | HIGH | AACR 2026 CT051 direct retrieval; BusinessWire unblock; or Brenus NDA/CDA |
| B-004 | Bevacizumab arm assignment in BreAK CRC-001 | PROVISIONAL | LOW | Protocol document from Brenus |
| B-005 | ASCO 2024 abstract-specific claims | BLOCKED | MEDIUM | ASCO meeting library direct retrieval or Brenus-provided materials |
| B-006 | HT29 BRAF V600E scientific conflict resolution | BLOCKED | HIGH | Additional data from Brenus or primary source addressing design rationale ⚠️ UPDATED 2026-04-28 [e14661] |
| SC-001 | HT29 BRAF V600E vs. BRAF WT eligibility — Scientific Conflict | ACTIVE CONFLICT | HIGH | Cannot be resolved without additional data ⚠️ UPDATED 2026-04-28 [e14661] |

---

## DETAILED BLOCKER ENTRIES

---

### B-001 — Human Cell Line Identity for Clinical STC-1010

⚠️ UPDATED 2026-04-28 [ASCO 2023 e14661 DIRECT_SOURCE] — **STATUS: RESOLVED**

| Field | Value |
|-------|-------|
| **Blocker ID** | B-001 |
| **Status** | **RESOLVED** ⚠️ UPDATED 2026-04-28 |
| **Resolution date** | 2026-04-28 |
| **Impact level** | HIGH |
| **Domain** | Preclinical biology / vaccine composition |

**Resolution source:**
ASCO 2023 abstract e14661, JCO 41:16_suppl:e14661, DOI: 10.1200/JCO.2023.41.16_suppl.e14661 (DIRECT_SOURCE — full abstract body retrieved)

**Exact source excerpt:**
> *"We confirmed these proof-of-concept efficacy with the human STC-1010 using three CRC human cell lines (HCT116, HT29 and Lovo)."*

**Confirmed cell lines:** HCT116, HT29, LoVo — `[VERIFIED]`

**What was blocked (prior status):**
The specific human CRC cell line names used in the clinical STC-1010 product. ASCO 2023 abstract e14661 was not retrieved in the original PhD verification session (paywall/resolver failure). HCT116/HT29/LoVo attribution in prior agent canon (Agent 5 Gap 1) was `[PROVISIONAL]` and had been corrected to `[BLOCKED]` in Canon v2.

**What is now confirmed (engine-routable):**
- "STC-1010 uses HCT116, HT29, and LoVo human CRC cell lines" — `[VERIFIED]` (ASCO 2023 e14661)
- "The murine surrogate vaccine in Alzeeb et al. 2024 uses CT26, CMT-93, LTPA, and MC38 — all murine" — `[VERIFIED]` (unchanged)

**Activated conflict — see SC-001 and B-006:**
Resolution of B-001 activates an ACTIVE SCIENTIFIC CONFLICT: HT29 carries BRAF V600E mutation, while BreAK CRC-001 Exclusion Criterion #7 requires BRAF wild-type patients. This conflict is documented in SC-001 and the resolution path is tracked in B-006. Do not speculate about resolution.

---

### B-002 — Clinical GMP Manufacturing Parameters

| Field | Value |
|-------|-------|
| **Blocker ID** | B-002 |
| **Status** | BLOCKED |
| **Impact level** | MEDIUM |
| **Domain** | Manufacturing / CMC |

**What is blocked:**
All clinical GMP manufacturing parameters for STC-1010, including:
- Clinical batch size and cell concentration
- Irradiation dose for clinical product
- Haptenation concentration and duration for clinical product
- Formulation buffer, cryoprotectant, and storage conditions for clinical product
- Any GMP-specific process parameters

**Why blocked:**
Not disclosed in any retrieved source. The Brenus website states "GMP ready & specifically replicable to other solid tumors" — this is a `[COMPANY_CLAIM]` only. Alzeeb et al. 2024 reports murine surrogate manufacturing parameters only (DNFB 12.7 µg/mL 30 min; 10 Gy + thermal stress; 25 Gy final; EBSS + 80 g/L sucrose at -80°C) — these are **not** the clinical GMP parameters.

**Specific claims that are blocked:**
- Any specific clinical batch size, cell count, or concentration — BLOCKED
- Any specific clinical irradiation dose — BLOCKED
- Any specific clinical haptenation parameters — BLOCKED
- "Clinical manufacturing is identical to murine surrogate parameters" — BLOCKED (not stated in any source)

**What may be asserted (with correct tagging):**
- "Murine surrogate manufacturing uses DNFB 12.7 µg/mL for 30 min, 10 Gy irradiation, 42°C thermal stress, 25 Gy final inactivation, EBSS + 80 g/L sucrose at -80°C" — `[VERIFIED]` (Alzeeb et al. 2024, murine only)
- "Brenus states the manufacturing process is GMP ready and scalable" — `[COMPANY_CLAIM]`
- "Clinical GMP parameters are not disclosed in any publicly available source" — `[VERIFIED]`

**Resolution path:**
1. Brenus data room / IND filing (CMC section)
2. Any peer-reviewed publication disclosing clinical manufacturing parameters

---

### B-003 — Human Clinical Efficacy and Safety Data for STC-1010

| Field | Value |
|-------|-------|
| **Blocker ID** | B-003 |
| **Status** | BLOCKED |
| **Impact level** | HIGH |
| **Domain** | Clinical evidence / efficacy |

**What is blocked:**
All human clinical efficacy and safety data for STC-1010. This is the highest-impact blocker in the registry. It explicitly covers:

| Data point | Source | Retrieval status |
|------------|--------|-----------------|
| n=6 patients treated | BusinessWire / AACR 2026 abstract CT051 | NOT RETRIEVED — Akamai block / not directly accessed |
| 100% DCR (disease control rate) | BusinessWire / AACR 2026 abstract CT051 | NOT RETRIEVED |
| DTH (delayed-type hypersensitivity) responses | BusinessWire / AACR 2026 abstract CT051 | NOT RETRIEVED |
| Any other preliminary efficacy signals | BusinessWire / BioSpace / AACR CT051 | NOT RETRIEVED |
| Any safety observations in human patients | Any source | NOT RETRIEVED |

**Why blocked:**
- BreAK CRC-001 (NCT06934538) started 2025-06-17; `hasResults=false` in registry as of 2025-12-19 — `[VERIFIED]`
- No peer-reviewed clinical publication exists for STC-1010 in humans
- BusinessWire AACR 2024 press release: blocked by Akamai CDN — not retrieved
- BusinessWire InSphero press release: blocked by Akamai CDN — not retrieved
- BioSpace ASCO 2024 article: returned HTTP 404 — not retrieved
- AACR 2026 abstract CT051: not directly retrieved in PhD verification session

**Critical policy note — B-003 correction (DIFF-010):**
Prior agent canon (pre-Canon v2) contained the phrase "beyond n=6 press-release-only preliminary signals." This phrasing implicitly treated n=6, 100% DCR, and DTH responses as a known factual baseline. **This was incorrect.** Those figures originate exclusively from blocked sources. Canon v2 corrects this: n=6, 100% DCR, and DTH response data are explicitly named as blocked-source data and must not be asserted as factual baselines.

**Specific claims that are blocked:**
- "STC-1010 has been administered to n=6 patients" — BLOCKED
- "STC-1010 achieved 100% DCR in preliminary data" — BLOCKED
- "DTH responses were observed in STC-1010-treated patients" — BLOCKED
- Any statement about preliminary clinical activity, tolerability, or immune response in humans — BLOCKED
- Any statement derived from AACR 2026 abstract CT051 — BLOCKED
- Any statement derived from BusinessWire or BioSpace press releases about STC-1010 clinical data — BLOCKED

**What may be asserted (with correct tagging):**
- "BreAK CRC-001 (NCT06934538) is actively recruiting as of 2025-12-19; no results have been posted" — `[VERIFIED]`
- "No peer-reviewed clinical data for STC-1010 in humans is available in any directly retrieved source" — `[VERIFIED]`
- "Preliminary clinical signals have been reported in press releases and conference abstracts, but these sources were not directly retrieved and cannot be verified" — acceptable framing with explicit `[BLOCKED — source not retrieved]` tag

**Resolution path:**
1. Direct retrieval of AACR 2026 abstract CT051 from AACR meeting library
2. Unblocking of BusinessWire press releases (Akamai CDN restriction — may require institutional access or direct URL)
3. Interim data from Brenus under NDA/CDA
4. Await peer-reviewed publication of BreAK CRC-001 interim results

---

### B-004 — Bevacizumab Arm Assignment in BreAK CRC-001

| Field | Value |
|-------|-------|
| **Blocker ID** | B-004 |
| **Status** | PROVISIONAL |
| **Impact level** | LOW |
| **Domain** | Trial design / protocol |

**What is provisional:**
Which specific arms of BreAK CRC-001 receive bevacizumab, and the rationale for the "with or without" optionality.

**Why provisional (not fully blocked):**
The registry (NCT06934538) explicitly states bevacizumab is "with or without" in the intervention description — this is `[VERIFIED]`. The optionality itself is confirmed. What is unknown is the arm-level assignment rule (e.g., whether bevacizumab is physician choice, biomarker-gated, or arm-specific).

**Specific claims that are provisional:**
- "Arm 2A-1 receives bevacizumab" — PROVISIONAL
- "Arm 2A-2 does not receive bevacizumab" — PROVISIONAL
- "Bevacizumab is mandatory in any arm" — PROVISIONAL
- "Bevacizumab assignment follows a specific biomarker criterion" — PROVISIONAL

**What may be asserted (with correct tagging):**
- "STC-1010 is administered with mFOLFOX6 with or without bevacizumab" — `[VERIFIED]`
- "Arm-level bevacizumab assignment is not specified in the public registry" — `[VERIFIED]`

**Resolution path:**
1. Protocol document from Brenus (not publicly available)
2. Direct inquiry to trial investigators

---

### B-005 — ASCO 2024 Abstract-Specific Claims

| Field | Value |
|-------|-------|
| **Blocker ID** | B-005 |
| **Status** | BLOCKED |
| **Impact level** | MEDIUM |
| **Domain** | Clinical evidence / conference data |

**What is blocked:**
Any claims specific to the content of the ASCO 2024 abstract for STC-1010 / BreAK CRC-001. This includes any data, patient numbers, response rates, or conclusions reported in that abstract.

**Why blocked:**
- BioSpace article covering ASCO 2024 abstract: returned HTTP 404 — not retrieved
- BusinessWire ASCO 2024 press release: blocked by Akamai CDN — not retrieved
- The abstract itself was not directly accessed from the ASCO meeting library

**Specific claims that are blocked:**
- Any data point attributed to "ASCO 2024" for STC-1010 — BLOCKED
- Any patient count, response rate, or safety observation from ASCO 2024 — BLOCKED

**What may be asserted:**
- "An ASCO 2024 abstract for STC-1010 / BreAK CRC-001 is referenced in press coverage, but the abstract content was not directly retrieved and cannot be verified" — acceptable with `[BLOCKED — source not retrieved]` tag

**Resolution path:**
1. Direct retrieval from ASCO meeting library (abstracts.asco.org)
2. Brenus-provided copy of the abstract

---

### SC-001 — HT29 BRAF V600E vs. BRAF Wild-Type Eligibility Conflict

⚠️ UPDATED 2026-04-28 [ASCO 2023 e14661 DIRECT_SOURCE] — **STATUS: ACTIVE CONFLICT**

| Field | Value |
|-------|-------|
| **Conflict ID** | SC-001 |
| **Type** | Scientific Conflict |
| **Status** | ACTIVE CONFLICT |
| **Activated** | 2026-04-28 — upon resolution of B-001 |
| **Impact level** | HIGH |
| **Domain** | Vaccine composition / trial eligibility / translational biology |

**What is known (all facts — do not dispute):**
1. HT29 is confirmed as one of three human cell lines in the clinical STC-1010 vaccine — `[VERIFIED]` (ASCO 2023 e14661)
2. HT29 carries the BRAF V600E mutation — established cell line biology, not in dispute
3. BreAK CRC-001 Exclusion Criterion #7 explicitly excludes patients with BRAF mutations — `[VERIFIED]` (NCT06934538)
4. All three arms of BreAK CRC-001 require BRAF wild-type disease — `[VERIFIED]` (NCT06934538)

**The conflict:**
The clinical STC-1010 vaccine contains a BRAF V600E-mutant cell line (HT29), while the trial exclusively enrolls BRAF wild-type patients. The vaccine is designed to stimulate immune responses against antigens expressed by HT29 (among other lines), including potentially BRAF V600E-associated antigens. The enrolled patient population does not carry BRAF V600E mutations.

**What is unknown:**
- Whether the BRAF V600E mutation in HT29 is intentional (e.g., to broaden antigen coverage across mutation profiles), incidental, or creates a meaningful immunological mismatch for BRAF WT patients
- Whether BRAF V600E-associated neoantigens or altered protein expression in HT29 contribute meaningfully to the vaccine's antigen repertoire
- Whether Brenus has a scientific rationale for this design choice that is not disclosed in any retrieved source
- Whether the BRAF WT eligibility requirement is related to treatment safety (e.g., BRAF inhibitor interactions) rather than vaccine biology

**What cannot be resolved without additional data:**
- The scientific significance of the BRAF V600E/WT mismatch between vaccine line and patient population
- Whether this represents a design flaw, an intentional design choice, or a clinically irrelevant feature
- Any mechanistic explanation for why a BRAF-mutant vaccine line would or would not generate effective immunity in BRAF WT patients

**Hard rule:** Do not speculate about resolution. Do not assert that this conflict is benign or problematic. Document it accurately and flag it as unresolved. Resolution path tracked in B-006.

---

### B-006 — HT29 BRAF V600E Scientific Conflict Resolution

⚠️ UPDATED 2026-04-28 [ASCO 2023 e14661 DIRECT_SOURCE] — **STATUS: BLOCKED**

| Field | Value |
|-------|-------|
| **Blocker ID** | B-006 |
| **Status** | BLOCKED |
| **Activated** | 2026-04-28 — upon resolution of B-001 and activation of SC-001 |
| **Impact level** | HIGH |
| **Domain** | Translational biology / vaccine design rationale |

**What is blocked:**
Any resolution of the scientific conflict documented in SC-001. Specifically: whether the use of BRAF V600E-mutant HT29 as a vaccine component creates a meaningful scientific problem for the BRAF wild-type patient population enrolled in BreAK CRC-001.

**Why blocked:**
No retrieved source addresses the scientific rationale for including HT29 (BRAF V600E) in a vaccine intended for BRAF WT patients. The ASCO 2023 e14661 abstract confirms the cell lines but does not address this design question. No other retrieved source provides relevant mechanistic data.

**Data that would be needed to resolve B-006:**
1. A primary source (Brenus publication, data room document, or conference abstract) explicitly addressing the rationale for HT29 inclusion in the context of BRAF WT patient eligibility
2. Proteomic or immunological data showing whether BRAF V600E-associated antigens in HT29 contribute to the vaccine's antigen repertoire in a way that is relevant (or irrelevant) to BRAF WT patients
3. A mechanistic explanation for the BRAF WT eligibility requirement — whether it is driven by vaccine biology, treatment safety (e.g., BRAF inhibitor interactions with mFOLFOX6), or other considerations
4. Any clinical or preclinical data showing immune response patterns in BRAF WT patients vaccinated with HT29-containing preparations

**What may be asserted (with correct tagging):**
- "STC-1010 contains HT29, a BRAF V600E-mutant cell line, while BreAK CRC-001 enrolls only BRAF wild-type patients. The scientific rationale for this design choice is not disclosed in any retrieved source." — `[VERIFIED facts]` + `[BLOCKED — rationale not retrieved]`
- Do not assert that this is a flaw. Do not assert that it is intentional. Document the conflict and the gap.

---

## RESOLUTION PRIORITY ORDER

| Priority | Blocker | Rationale |
|----------|---------|-----------|
| 1 (Highest) | ~~B-001~~ **RESOLVED** ⚠️ 2026-04-28 | B-001 resolved via ASCO 2023 e14661 direct retrieval. HCT116/HT29/LoVo confirmed. |
| 2 | B-006 | Resolving the HT29 BRAF V600E scientific conflict requires additional data from Brenus; now the highest-priority open scientific question |
| 3 | B-003 | Unblocking preliminary clinical data enables evidence-based positioning; currently all clinical claims are hard-gated |
| 4 | B-005 | ASCO 2024 abstract likely overlaps with B-003 data; resolving B-003 may partially resolve B-005 |
| 5 | B-002 | GMP parameters needed for CMC diligence; lower urgency for positioning work |
| 6 (Lowest) | B-004 | Bevacizumab arm assignment is a protocol detail; "with or without" framing is sufficient for most positioning contexts |

---

## WHAT IS NOT BLOCKED — QUICK REFERENCE

The following domains are fully verified and engine-routable. No blocker applies.

| Domain | Confidence | Canon reference |
|--------|------------|-----------------|
| BreAK CRC-001 trial identifiers, arms, eligibility, endpoints, timeline, sites | VERIFIED | Canon v2 Part I |
| NCT03050814 (QUILT-2.004) identifiers, status, HR, p-value, design elements | VERIFIED | Canon v2 Part II |
| Alzeeb et al. 2024 murine cell lines, manufacturing parameters, efficacy results, proteomics, safety, COI | VERIFIED | Canon v2 Part III |
| Hapten identity (DNFB) | CROSS_REFERENCED | Canon v2 Part IV |
| All 6 contradiction resolutions (C-001 through C-006) | VERIFIED | Canon v2 Part V |

---

## HARD STOPS CROSS-REFERENCE

The following Hard Stops from Canon v2 map directly to blockers in this registry:

| Hard Stop # | Canon v2 text | Blocker |
|-------------|---------------|---------|
| 1 | Human cell line identity for STC-1010 | ~~B-001~~ **RESOLVED** ⚠️ 2026-04-28 — HCT116/HT29/LoVo VERIFIED via e14661 |
| 2 | "Over 200 cancer-related proteins" as verified finding | C-004 (resolved — COMPANY_CLAIM) |
| 7 | Any human clinical efficacy data for STC-1010 | B-003 |
| 8 | Alzeeb et al. 2024 as evidence of human STC-1010 efficacy | B-001 (RESOLVED) / B-003 (scope) |
| 9 | n=6 / 100% DCR / DTH response data | B-003 |
| 10 | HT29 BRAF V600E vs. BRAF WT eligibility conflict — ACTIVE SCIENTIFIC CONFLICT ⚠️ UPDATED 2026-04-28 [e14661] | SC-001 / B-006 |

Hard Stops 3–6 are resolved contradictions (C-002, C-003, C-006, C-001) — not open blockers.

---

## CHANGE LOG

| Version | Date | Change |
|---------|------|--------|
| 1.0-FINAL | 2026-04-28 | Initial creation. Derived from Canon v2 FREEZE Part VI and YAML blocked_fields section. B-003 language reflects DIFF-010 correction (n=6/DCR/DTH explicitly named as blocked-source data). |
| 1.1-FINAL | 2026-04-28 | ⚠️ UPDATED [ASCO 2023 e14661 + TPS3635 DIRECT_SOURCE]: B-001 resolved — HCT116/HT29/LoVo confirmed as clinical STC-1010 human cell lines. SC-001 added (HT29 BRAF V600E vs. BRAF WT eligibility — ACTIVE CONFLICT). B-006 added (HT29 BRAF V600E scientific conflict resolution — BLOCKED pending additional data). Summary table updated. Resolution priority order updated. Hard Stops cross-reference updated with Hard Stop #10. |

---

*End of Brenus Final Blockers Registry v1.1-FINAL — 2026-04-28*
*PhD Verification Agent | CrisPRO Brenus Diligence Package*
