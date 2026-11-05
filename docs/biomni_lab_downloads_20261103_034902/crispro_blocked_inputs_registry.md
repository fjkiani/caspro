# CrisPRO Blocked Inputs Registry: Brenus / STC-1010 / BreAK CRC-001
## Agent 5 — CrisPRO Fit-Gap Analysis, Proceed-Now Lane

**Document ID:** crispro_blocked_inputs_registry.md
**Version:** 1.0
**Date:** 2026-04-28
**Prepared by:** Agent 5 — CrisPRO Fit-Gap Analysis (Proceed-Now Lane)
**Canon reference:** brenus_canon_v2_freeze.md (2026-04-28)
**Blockers reference:** brenus_final_blockers_registry.md (2026-04-28)
**Policy:** This registry documents only blockers that are directly relevant to CrisPRO's computational work on BreAK CRC-001. It does not duplicate the full blockers registry — it maps each blocker to the specific CrisPRO capabilities it gates and quantifies the impact of resolution.

---

## REGISTRY POLICY

| Rule | Requirement |
|------|-------------|
| Hard gate | Any field with status BLOCKED must not be used as a CrisPRO input under any circumstances |
| Provisional gate | Any field with status PROVISIONAL must be labeled [PROVISIONAL — unconfirmed] if used in any output |
| No inheritance | No claim from a blocked source (BusinessWire, BioSpace, AACR CT051, ASCO e14661 pre-verification) may be inherited from prior agent canon |
| Active conflict | OQ-01 (HT29 BRAF V600E) is an active scientific conflict — not a blocker in the traditional sense, but gates HT29-specific modeling until resolved |
| Resolution required | A blocker may only be resolved by direct retrieval of the named primary source or equivalent Brenus data room disclosure |

---

## BLOCKER ENTRIES

---

### B-001 — Human Cell Line Identity for Clinical STC-1010

| Field | Value |
|-------|-------|
| **Blocker ID** | B-001 |
| **Status** | PARTIALLY RESOLVED — HCT116, HT29, LoVo confirmed by ASCO 2023 e14661 (newly verified per mission brief) |
| **Residual active conflict** | OQ-01: HT29 carries BRAF V600E; trial excludes BRAF-mutant patients (Exclusion #7) — conflict documented, NOT resolved |
| **Impact level** | HIGH (residual: MEDIUM for HCT116/LoVo; HIGH for HT29 component) |
| **Domain** | Preclinical biology / vaccine composition |

**What is now unblocked (HCT116 and LoVo):**
- HCT116 and LoVo are confirmed as STC-1010 human cell line components
- HCT116 is KRAS G13D (published); LoVo is KRAS G13D (published) — both KRAS mutated, consistent with trial eligibility
- CrisPRO can now model antigen repertoire for HCT116 and LoVo components using published proteomics

**What remains blocked (HT29 component — OQ-01):**
- HT29 carries BRAF V600E
- Trial excludes BRAF-mutant patients (Exclusion Criterion #7)
- This creates an active scientific conflict between vaccine composition and trial eligibility
- HT29-specific antigen modeling is gated on OQ-01 resolution
- Do not speculate about the implications of this conflict

**What CrisPRO capability it gates (residual):**
- Full three-line antigen mapping (HCT116 + HT29 + LoVo) — gated on OQ-01
- BRAF V600E antigen inclusion scientific assessment — gated on OQ-01
- Complete vaccine-tumor antigen concordance analysis — gated on OQ-01 (partial analysis with HCT116 + LoVo is executable now)

**Resolution path for OQ-01:**
1. Scientific assessment of whether BRAF V600E-derived antigens in the vaccine are immunologically relevant in BRAF WT patients (requires Brenus scientific data or published literature on cross-reactivity)
2. Confirmation from Brenus that HT29 has been or will be substituted with a BRAF WT cell line
3. Regulatory assessment of whether the HT29 BRAF V600E inclusion requires protocol amendment or IND amendment

**Estimated impact if OQ-01 resolved:**
- HIGH: Enables complete three-line antigen mapping; resolves or quantifies the scientific inconsistency; enables CDx biomarker strategy foundation; provides regulatory-grade antigen characterization
- If resolved as "HT29 acceptable": full antigen mapping executable with explicit BRAF V600E caveat
- If resolved as "HT29 is a problem": two-line mapping (HCT116 + LoVo) executable immediately; substitute cell line mapping executable once substitute identified

---

### B-002 — Clinical GMP Manufacturing Parameters

| Field | Value |
|-------|-------|
| **Blocker ID** | B-002 |
| **Status** | BLOCKED |
| **Impact level** | MEDIUM |
| **Domain** | Manufacturing / CMC |

**What is blocked:**
All clinical GMP manufacturing parameters for STC-1010:
- Clinical batch size and cell concentration
- Irradiation dose for clinical product
- Haptenation concentration and duration for clinical product
- Formulation buffer, cryoprotectant, and storage conditions for clinical product
- Any GMP-specific process parameters

**Why blocked:**
Not disclosed in any retrieved source. Alzeeb et al. 2024 reports murine surrogate manufacturing parameters only (DNFB 12.7 µg/mL 30 min; 10 Gy + thermal stress; 25 Gy final; EBSS + 80 g/L sucrose at -80°C) — these are NOT the clinical GMP parameters and cannot be assumed equivalent.

**What CrisPRO capability it gates:**
- Clinical dose-response modeling for STC-1010 (cannot model dose-response without knowing clinical dose)
- Batch-to-batch consistency analysis (cannot assess consistency without GMP parameters)
- Clinical manufacturing scalability assessment (cannot validate "100 patients per batch" claim without CMC data)
- Combination timing optimization that depends on clinical dose (murine IS regimen parameters can be used as a proxy for hypothesis generation only — see Section 3.4 of fit-gap document)

**Resolution path:**
1. Brenus data room / IND filing (CMC section) — requires NDA/CDA
2. Any peer-reviewed publication disclosing clinical manufacturing parameters

**Estimated impact if resolved:**
- MEDIUM: Enables clinical dose-response modeling and combination timing optimization with clinical parameters rather than murine proxies; enables CMC diligence; validates or refutes the "100 patients per batch" manufacturing claim
- Does not unlock human clinical efficacy analysis (that requires B-003)

---

### B-003 — Human Clinical Efficacy and Safety Data for STC-1010

| Field | Value |
|-------|-------|
| **Blocker ID** | B-003 |
| **Status** | BLOCKED |
| **Impact level** | HIGH — highest-impact blocker for CrisPRO's Brenus work |
| **Domain** | Clinical evidence / efficacy |

**What is blocked:**
All human clinical efficacy and safety data for STC-1010. This is an absolute hard gate. Specifically:

| Data point | Source | Retrieval status |
|------------|--------|-----------------|
| n=6 patients treated | BusinessWire / AACR 2026 abstract CT051 | NOT RETRIEVED — Akamai block / not directly accessed |
| 100% DCR (disease control rate) | BusinessWire / AACR 2026 abstract CT051 | NOT RETRIEVED |
| DTH responses in human patients | BusinessWire / AACR 2026 abstract CT051 | NOT RETRIEVED |
| Any other preliminary efficacy signals | BusinessWire / BioSpace / AACR CT051 | NOT RETRIEVED |
| Any safety observations in human patients | Any source | NOT RETRIEVED |

**Why blocked:**
- BreAK CRC-001 (NCT06934538) started 2025-06-17; hasResults=false in registry as of 2025-12-19 [VERIFIED]
- No peer-reviewed clinical publication exists for STC-1010 in humans
- BusinessWire AACR 2024 press release: blocked by Akamai CDN — not retrieved
- BioSpace ASCO 2024 article: returned HTTP 404 — not retrieved
- AACR 2026 abstract CT051: not directly retrieved in PhD verification session
- Per Canon v2 policy: no claim from a blocked source is inherited from prior agent canon

**What CrisPRO capability it gates:**
- Preliminary clinical signal modeling (response rate estimation, PFS projection from early data)
- Pharmacodynamic endpoint validation (DTH as predictor of clinical benefit)
- Safety profile characterization for STC-1010 in humans
- Any comparison of STC-1010 clinical activity to historical benchmarks using STC-1010 data as the numerator
- Evidence-based positioning of STC-1010 vs. historical MSS CRC IO trials
- Power calculations that use observed STC-1010 response rate as the assumed effect size

**Resolution path:**
1. Direct retrieval of AACR 2026 abstract CT051 from AACR meeting library
2. Unblocking of BusinessWire press releases (Akamai CDN restriction — may require institutional access)
3. Interim data from Brenus under NDA/CDA
4. Await peer-reviewed publication of BreAK CRC-001 interim results

**Estimated impact if resolved:**
- HIGH: Unlocks the most impactful CrisPRO capabilities for Brenus — preliminary clinical signal modeling, pharmacodynamic endpoint validation, evidence-based positioning, and power calculations with observed effect size
- Enables CrisPRO to move from hypothesis-generation mode (current state) to data-analysis mode
- Enables comparison of STC-1010 preliminary signals to historical MSS CRC IO benchmarks
- Note: Even if resolved, n=6 data will have very limited statistical power for any biomarker analysis — the primary value is establishing a factual baseline, not generating statistically robust conclusions

---

### B-004 — Bevacizumab Arm Assignment in BreAK CRC-001

| Field | Value |
|-------|-------|
| **Blocker ID** | B-004 |
| **Status** | PROVISIONAL |
| **Impact level** | LOW-MEDIUM |
| **Domain** | Trial design / protocol |

**What is provisional:**
Which specific arms of BreAK CRC-001 receive bevacizumab, and the rationale for the "with or without" optionality. The optionality itself is verified ("with or without" in NCT06934538 [VERIFIED]); the arm-level assignment rule is not.

**Why provisional (not fully blocked):**
The registry explicitly states bevacizumab is "with or without" — this is verified. What is unknown is whether bevacizumab is: (a) physician choice within each arm, (b) biomarker-gated (e.g., VEGF-A expression), (c) arm-specific (e.g., only Arm 2A-1 receives bevacizumab), or (d) determined by some other protocol rule.

**What CrisPRO capability it gates:**
- Arm-specific combination timing optimization (cannot build arm-specific bevacizumab models without knowing which arms receive it)
- Bevacizumab subgroup analysis pre-specification (cannot pre-specify subgroup analysis without knowing the assignment rule)
- VEGF-A/vascular normalization window modeling for specific arms (can be done generically but not arm-specifically)

**Resolution path:**
1. Protocol document from Brenus (not publicly available) — requires NDA/CDA or direct inquiry to trial investigators
2. Direct inquiry to trial investigators at recruiting sites

**Estimated impact if resolved:**
- LOW-MEDIUM: Enables arm-specific combination timing optimization and pre-specified bevacizumab subgroup analysis; relatively low impact compared to B-001 and B-003 because the "with or without" framing is sufficient for most positioning contexts
- Generic bevacizumab combination modeling (not arm-specific) is executable now using verified inputs

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

**What CrisPRO capability it gates:**
- Any analysis using data points attributed to "ASCO 2024" for STC-1010
- Any patient count, response rate, or safety observation from ASCO 2024
- Note: B-005 likely overlaps substantially with B-003 — resolving B-003 (human clinical data) may partially resolve B-005 if the ASCO 2024 abstract contains the same data as the AACR 2026 abstract

**Resolution path:**
1. Direct retrieval from ASCO meeting library (abstracts.asco.org)
2. Brenus-provided copy of the abstract
3. Note: Resolving B-003 via AACR 2026 CT051 may make B-005 redundant if the data sets overlap

**Estimated impact if resolved:**
- MEDIUM: Provides additional clinical context and potentially earlier data than AACR 2026; may contain patient-level data not in the AACR abstract; enables timeline reconstruction of the clinical program
- If B-003 is resolved first, B-005 impact may be reduced to incremental

---

## ACTIVE SCIENTIFIC CONFLICT (NOT A TRADITIONAL BLOCKER)

### OQ-01 — HT29 BRAF V600E vs. Trial BRAF WT Eligibility

| Field | Value |
|-------|-------|
| **Conflict ID** | OQ-01 |
| **Status** | ACTIVE SCIENTIFIC CONFLICT — not resolved |
| **Impact level** | HIGH for HT29-specific modeling; MEDIUM for overall antigen characterization |
| **Domain** | Vaccine composition / trial eligibility |

**What the conflict is:**
- HT29 is confirmed as a component of STC-1010 (ASCO 2023 e14661, newly verified)
- HT29 carries BRAF V600E (published, well-established)
- BreAK CRC-001 excludes BRAF-mutant patients (Exclusion Criterion #7, VERIFIED)
- This creates a scientific inconsistency between the vaccine composition and the trial's eligibility requirement

**What is NOT blocked by OQ-01:**
- HCT116 and LoVo antigen modeling (executable now — both are KRAS G13D, consistent with trial eligibility)
- All other CrisPRO capabilities in Section 3 of the fit-gap document

**What IS gated on OQ-01 resolution:**
- HT29-specific antigen contribution modeling
- Full three-line vaccine antigen concordance analysis
- BRAF V600E antigen inclusion scientific assessment
- Any CrisPRO output that asserts or implies the HT29 BRAF V600E conflict is resolved or inconsequential

**What CrisPRO must NOT do regarding OQ-01:**
- Speculate about the implications of the conflict
- Assert that HT29 BRAF V600E antigens are immunologically inert in BRAF WT patients
- Assert that the conflict does not affect the trial
- Treat the conflict as resolved in any output

**Resolution path:**
1. Scientific assessment from Brenus or independent experts on whether BRAF V600E-derived antigens in the vaccine are immunologically relevant in BRAF WT patients
2. Confirmation from Brenus that HT29 has been or will be substituted with a BRAF WT cell line
3. Regulatory assessment of whether the HT29 BRAF V600E inclusion requires protocol or IND amendment

**Estimated impact if resolved:**
- HIGH if resolved as "HT29 acceptable": full three-line antigen mapping executable; complete CDx biomarker strategy foundation; requires explicit BRAF V600E caveat in all outputs
- HIGH if resolved as "HT29 is a problem": two-line mapping (HCT116 + LoVo) executable immediately; substitute cell line mapping executable once substitute identified; may require protocol amendment disclosure

---

## RESOLUTION PRIORITY ORDER FOR CRISPRO

| Priority | Blocker/Conflict | CrisPRO Rationale |
|----------|-----------------|-------------------|
| 1 (Highest) | B-003 (Human clinical data) | Unlocks the most impactful CrisPRO capabilities: preliminary clinical signal modeling, pharmacodynamic endpoint validation, evidence-based positioning, power calculations with observed effect size |
| 2 | OQ-01 (HT29 BRAF conflict) | Enables complete three-line antigen mapping and CDx biomarker strategy; HCT116/LoVo modeling is already executable |
| 3 | B-005 (ASCO 2024 abstract) | Likely overlaps with B-003; resolving B-003 may partially resolve B-005; provides earlier clinical data timeline |
| 4 | B-002 (GMP manufacturing) | Enables clinical dose-response modeling and combination timing with clinical parameters; lower urgency because murine parameters can serve as proxy for hypothesis generation |
| 5 (Lowest) | B-004 (Bevacizumab arm assignment) | Enables arm-specific combination modeling; "with or without" framing is sufficient for most positioning contexts; generic bevacizumab modeling is executable now |

---

## WHAT IS NOT BLOCKED — QUICK REFERENCE FOR CRISPRO TEAM

The following CrisPRO capabilities are fully executable today using verified inputs. No blocker applies.

| Capability | Verified inputs | Section in fit-gap document |
|------------|----------------|----------------------------|
| Historical control benchmark construction | NCT03050814 full dataset; BreAK CRC-001 Phase IIA endpoint | Section 3.1 |
| Trial design structural analysis | BreAK CRC-001 three-arm structure; QUILT-2.004 design elements | Section 3.2 |
| KRAS/BRAF molecular context modeling | KRAS mutated + BRAF WT eligibility; Alzeeb 2024 murine data; published KRAS literature | Section 3.3 |
| Murine preclinical mechanism anchoring | Alzeeb 2024 full dataset (murine scope only) | Section 3.4 |
| MSI-H vs. MSS arm differentiation | Three-arm structure; QUILT-2.004 MSI-H exclusion; published CheckMate 142 data | Section 3.5 |
| Exploratory biomarker framework design | Verified exploratory endpoint schedule; DTH monitoring protocol; published MSS CRC biomarker literature | Section 3.6 |
| HCT116 and LoVo antigen mapping | HCT116 and LoVo confirmed by ASCO 2023 e14661; published proteomics | Section 3 (new — B-001 partially resolved) |

---

*End of crispro_blocked_inputs_registry.md — v1.0 — 2026-04-28*
*Agent 5 — CrisPRO Fit-Gap Analysis, Proceed-Now Lane*
*Canon reference: brenus_canon_v2_freeze.md | Blockers reference: brenus_final_blockers_registry.md*
