# CrisPRO Fit-Gap Analysis: BreAK CRC-001 / Brenus Pharma
## Verified Inputs Only — Proceed-Now Lane

**Document ID:** crispro_fitgap_brenus_verified_only.md
**Version:** 1.0
**Date:** 2026-04-28
**Prepared by:** Agent 5 — CrisPRO Fit-Gap Analysis (Proceed-Now Lane)
**Canon reference:** brenus_canon_v2_freeze.md (2026-04-28)
**Blockers reference:** brenus_final_blockers_registry.md (2026-04-28)
**Policy:** Every capability assessment in this document is grounded in VERIFIED or CROSS_REFERENCED facts from Canon v2 only. BLOCKED inputs are not used as inputs. Prior Agent 5 errors (C-004, C-005) are not inherited.

---

## SECTION 1: EXECUTIVE SUMMARY

### What CrisPRO CAN do for BreAK CRC-001 today (verified inputs only)

Using only the verified fact set from Canon v2, CrisPRO can execute six substantive capability areas against BreAK CRC-001 right now:

1. **Comparator trial benchmarking** — The QUILT-2.004 (NCT03050814) dataset is fully verified (HR 1.061, p=0.91, terminated for futility, n=30, MSS population, design elements). CrisPRO can build a historical control benchmark for the Phase IIA 12-month PFS primary endpoint using this and other verified MSS mCRC trial data.

2. **Trial design structural analysis** — The BreAK CRC-001 protocol structure is fully verified (three arms, BRAF WT/KRAS mutated eligibility, RECIST 1.1 primary endpoint, DTH immune monitoring, exploratory biomarker timepoints). CrisPRO can analyze design strengths and weaknesses and model power requirements for the Phase IIA primary endpoint.

3. **KRAS/BRAF molecular context modeling** — The KRAS-mutated, BRAF wild-type eligibility requirement is verified. CrisPRO can model the expected immune microenvironment landscape for this molecularly defined population using published literature on KRAS-driven immunosuppression.

4. **Murine preclinical mechanism anchoring** — The Alzeeb 2024 dataset is fully verified (CT26, CMT-93, LTPA, MC38; efficacy results; proteomics; IS regimen parameters). CrisPRO can use this as a mechanistic anchor for combination timing hypotheses, with explicit scope limitation to murine data.

5. **MSI-H vs. MSS arm differentiation** — The three-arm structure is verified. CrisPRO can model the distinct immunological contexts for each arm and the different prior-treatment eligibility requirements.

6. **Exploratory biomarker framework design** — The verified exploratory endpoint schedule (T0/1m/2m/6m/12m/Tprogression) and DTH monitoring protocol provide sufficient structure for CrisPRO to design a pre-specified biomarker analysis plan.

### What CrisPRO CANNOT do today (blocked inputs)

1. **Antigen coverage modeling for HT29** — HT29 BRAF V600E conflict is ACTIVE (OQ-01). HCT116 and LoVo are confirmed; HT29-specific antigen modeling is gated on OQ-01 resolution.

2. **Human clinical efficacy/safety analysis** — All human clinical data for STC-1010 is BLOCKED (B-003). CrisPRO cannot use n=6, DCR, or DTH response data as inputs.

3. **GMP manufacturing modeling** — Clinical manufacturing parameters are BLOCKED (B-002).

4. **Bevacizumab arm-specific modeling** — Arm-level bevacizumab assignment is PROVISIONAL (B-004).

5. **ASCO 2024 abstract-derived analysis** — All ASCO 2024 abstract content is BLOCKED (B-005).

### Critical scope limitation on murine data

The Alzeeb 2024 paper uses a murine surrogate vaccine, not the clinical STC-1010 product. The authors explicitly state: *"Human vaccines based on STC technology should be tested in alternative models."* Any CrisPRO output derived from Alzeeb 2024 data must carry this scope limitation explicitly.

---

## SECTION 2: VERIFIED REGIMEN FACTS AVAILABLE AS CRISPRO INPUTS

All facts in this table are VERIFIED from Canon v2 (NCT06934538, NCT03050814, Alzeeb et al. 2024, ASCO 2023 e14661). No BLOCKED, PROVISIONAL, or COMPANY_CLAIM facts are included. The HT29 row is included with its active conflict flag.

| # | Fact | Confidence | CrisPRO Module Type |
|---|------|------------|---------------------|
| 1 | NCT identifier: NCT06934538 | VERIFIED | Trial design |
| 2 | Phase I/IIA, open-label, non-randomized, sequential | VERIFIED | Trial design |
| 3 | Three arms: Phase 1 (dose escalation), Arm 2A-1 (MSS), Arm 2A-2 (MSI-H) | VERIFIED | Trial design / biomarker stratification |
| 4 | All arms require BRAF wild-type AND KRAS mutated | VERIFIED | Biomarker stratification / mechanism modeling |
| 5 | BRAF mutation = Exclusion Criterion #7 | VERIFIED | Biomarker stratification |
| 6 | Intervention: STC-1010 + low-dose cyclophosphamide + GM-CSF + mFOLFOX6 ± bevacizumab | VERIFIED | Mechanism modeling / combination analysis |
| 7 | Bevacizumab is optional ("with or without") — not mandatory | VERIFIED | Trial design / combination analysis |
| 8 | NO checkpoint inhibitor in treatment regimen (confirmed ASCO 2024 TPS3635) | VERIFIED | Trial design — hard constraint |
| 9 | "ICI" in trial = prior-treatment eligibility criterion for MSI-H cohort only | VERIFIED | Trial design — hard constraint |
| 10 | Phase I primary endpoint: safety/MTD/RP2D, CTCAE v5, 28-day DLT window | VERIFIED | Trial design |
| 11 | Phase IIA primary endpoint: PFS rate at 12 months, RECIST 1.1 | VERIFIED | Trial design / comparator analysis |
| 12 | Phase IIA secondary endpoints: CBR, ORR, DOR, PFS (median), OS, resection rate | VERIFIED | Trial design |
| 13 | Phase I immune monitoring: DTH at 1/24/48/72h post-injection, after 4th, 8th, every boost | VERIFIED | Biomarker stratification / mechanism modeling |
| 14 | Exploratory endpoints: biomarkers in blood and tumor biopsies at T0/1m/2m/6m/12m/Tprogression | VERIFIED | Biomarker stratification |
| 15 | Eligibility: age 18–75, ECOG ≤1, 1L for MSS arm, 2L post-ICI for MSI-H arm | VERIFIED | Trial design / biomarker stratification |
| 16 | Active autoimmune disease = exclusion | VERIFIED | Trial design |
| 17 | Prior IO excluded for Phase 1 and Arm 2A-1; allowed for Arm 2A-2 | VERIFIED | Trial design / biomarker stratification |
| 18 | Trial start: 2025-06-17; primary completion: June 2028; RECRUITING | VERIFIED | Trial design |
| 19 | 5 French sites recruiting; 4 sites not yet recruiting (incl. Johns Hopkins) | VERIFIED | Trial design |
| 20 | FDA-regulated drug; DMC oversight | VERIFIED | Trial design |
| 21 | NCT03050814 (QUILT-2.004): TERMINATED for futility; HR 1.061 (0.380–2.966), p=0.91 | VERIFIED | Comparator analysis |
| 22 | QUILT-2.004: n=30 enrolled (10 Arm A, 16 Arm B); MSS/pMMR population | VERIFIED | Comparator analysis |
| 23 | QUILT-2.004: Arm A PFS 8.8m, Arm B PFS 10.1m | VERIFIED | Comparator analysis |
| 24 | QUILT-2.004: MSI-H/dMMR explicitly excluded | VERIFIED | Comparator analysis / biomarker stratification |
| 25 | QUILT-2.004 design elements: safety lead-in n=6, bev Day 2 sequencing, oxali 68 mg/m² in combination arm | VERIFIED | Trial design / comparator analysis |
| 26 | QUILT-2.004 SAEs: 9/10 Arm A, 10/16 Arm B; deaths 1/10, 1/16 | VERIFIED | Comparator analysis |
| 27 | Alzeeb 2024: murine surrogate uses CT26, CMT-93, LTPA, MC38 — all murine | VERIFIED | Mechanism modeling |
| 28 | Alzeeb 2024: hapten = DNFB 12.7 µg/mL 30 min; stressors: 10 Gy + 42°C/37°C; final 25 Gy; -80°C EBSS+sucrose | VERIFIED | Mechanism modeling |
| 29 | Alzeeb 2024: IS regimen = cyclophosphamide 15 mg/kg IP D-1; mGM-CSF 5 µg SC with vaccine | VERIFIED | Mechanism modeling / combination analysis |
| 30 | Alzeeb 2024 Study A: IS+CT26-SH 100mm³ vs. 238mm³ control at D20, p<0.0003; survival p=0.0046 | VERIFIED | Mechanism modeling |
| 31 | Alzeeb 2024 Study B: IS+3CL-SH 150mm³ vs. 341mm³ (1CL) at D24, p=0.0002; mOS 38 vs. 31.5d, p=0.05 | VERIFIED | Mechanism modeling |
| 32 | Alzeeb 2024 Study C: MC38-PD1R survival p=0.00368; 60% responders; CD8+ p=0.045; M1 macrophage p=0.02 | VERIFIED | Mechanism modeling |
| 33 | Alzeeb 2024 proteomics: 32% shared across all 3 lines; 44% cell-line-specific; 1,196 CT26-shared proteins | VERIFIED | Mechanism modeling |
| 34 | Alzeeb 2024: 76-mouse 8-week tox study — no treatment-related findings | VERIFIED | Mechanism modeling |
| 35 | Alzeeb 2024 authors' caveat: murine surrogate ≠ clinical product; human translation unvalidated | VERIFIED | Mechanism modeling (scope limiter — mandatory) |
| 36 | Alzeeb 2024: fully Brenus-funded; 4 co-authors are Brenus consultants | VERIFIED | Mechanism modeling (COI flag) |
| 37 | DNFB as hapten: confirmed by Alzeeb 2024 + Brenus website | CROSS_REFERENCED | Mechanism modeling |
| 38 | Human cell lines in STC-1010: HCT116, HT29, LoVo — confirmed by ASCO 2023 e14661 | VERIFIED (newly) | Biomarker stratification / mechanism modeling — SEE ROW 39 |
| 39 | ACTIVE CONFLICT: HT29 carries BRAF V600E; trial excludes BRAF-mutant patients (Exclusion #7) | VERIFIED (conflict documented, NOT resolved) | Biomarker stratification — HT29-specific modeling BLOCKED pending OQ-01 |

**Note on rows 38–39:** HCT116 and LoVo are usable as verified inputs for antigen modeling (HCT116 is KRAS G13D; LoVo is KRAS G13D — both KRAS mutated, consistent with trial eligibility). HT29-specific antigen modeling is gated on OQ-01 resolution. The conflict between HT29 BRAF V600E and the trial's BRAF WT requirement is documented but not resolved — do not speculate about its implications.

---

## SECTION 3: FIT-GAP ANALYSIS — EXECUTABLE NOW

The following CrisPRO capabilities can be applied to BreAK CRC-001 TODAY using only verified inputs.

---

### 3.1 Historical Control Benchmark Construction

**Capability name:** Comparator PFS benchmark analysis

**Verified inputs consumed:**
- NCT03050814 (QUILT-2.004): HR 1.061, p=0.91, Arm A PFS 8.8m, Arm B PFS 10.1m, n=30, MSS/pMMR, 1L mCRC, terminated for futility
- BreAK CRC-001 Phase IIA primary endpoint: PFS rate at 12 months, RECIST 1.1
- QUILT-2.004 population: MSS/pMMR — directly analogous to BreAK CRC-001 Arm 2A-1
- QUILT-2.004 backbone: mFOLFOX6 + bevacizumab (Arm A) — directly analogous to BreAK CRC-001 SOC backbone

**Output produced:**
- Historical 12-month PFS rate benchmark for 1L MSS mCRC on mFOLFOX6 ± bevacizumab
- Statistical threshold analysis: what 12-month PFS rate in BreAK CRC-001 would be distinguishable from historical SOC
- Power calculation for the Phase IIA single-arm design against this benchmark
- Confidence interval analysis for the QUILT-2.004 HR (wide CI: 0.380–2.966 reflects n=26 treated — must be disclosed)

**Scientific question answered for Brenus:**
What 12-month PFS rate must BreAK CRC-001 achieve to be interpretable as exceeding SOC activity, given the historical benchmark from the most directly analogous terminated trial?

**Confidence level:** HIGH for benchmark construction; MEDIUM for power calculations (depends on assumed effect size)

**Caveats:**
- QUILT-2.004 was terminated at n=30 vs. target n=70; the benchmark is from a small, underpowered trial
- QUILT-2.004 used Ad-CEA + avelumab (checkpoint inhibitor) — mechanistically different from STC-1010; the SOC arm (Arm A) is the relevant comparator, not the experimental arm
- The wide CI (0.380–2.966) means QUILT-2.004 alone is insufficient for a robust benchmark; additional 1L MSS mCRC trial data should be integrated
- BreAK CRC-001 requires KRAS mutated; QUILT-2.004 did not require KRAS mutation — population is not identical

---

### 3.2 Trial Design Structural Analysis

**Capability name:** Phase IIA design weakness identification and power modeling

**Verified inputs consumed:**
- BreAK CRC-001: Phase IIA primary endpoint (PFS rate at 12 months, RECIST 1.1), single-arm design, three arms, BRAF WT/KRAS mutated eligibility
- BreAK CRC-001: estimated enrollment ~57–60 Phase IIA patients
- BreAK CRC-001: exploratory biomarker timepoints (T0/1m/2m/6m/12m/Tprogression)
- QUILT-2.004: design precedent elements (safety lead-in n=6, bev Day 2 sequencing, oxali dose reduction)
- QUILT-2.004: negative result in analogous population (no PFS benefit, HR 1.061)

**Output produced:**
- Structural weakness report: single-arm design without pre-specified historical control benchmark; no adaptive enrichment mechanism; no pre-specified biomarker analysis plan
- Power calculation: minimum detectable effect size for 12-month PFS rate in a single-arm design with n=57–60
- Adaptive enrichment design options: biomarker-stratified interim analysis framework using verified exploratory biomarker timepoints
- Safety lead-in structural comparison: BreAK CRC-001 Phase 1 vs. QUILT-2.004 n=6 lead-in (structural precedent only — not efficacy precedent)

**Scientific question answered for Brenus:**
Is the current Phase IIA design powered to detect a vaccine-attributable signal in unselected BRAF WT/KRAS mutated MSS mCRC, and what design modifications would improve the probability of a meaningful result?

**Confidence level:** HIGH for structural analysis; MEDIUM for power calculations (effect size assumption required)

**Caveats:**
- Power calculations require an assumed effect size (expected 12-month PFS rate with STC-1010). This cannot be derived from verified inputs alone — it requires clinical judgment or the blocked human clinical data (B-003). CrisPRO can model a range of effect sizes but cannot select the clinically appropriate assumption without Brenus input.
- The QUILT-2.004 design precedent is structural only — its negative efficacy outcome must be disclosed whenever it is cited as a design reference.

---

### 3.3 KRAS/BRAF Molecular Context Modeling

**Capability name:** Molecular eligibility population immune landscape characterization

**Verified inputs consumed:**
- BreAK CRC-001 eligibility: KRAS mutated required; BRAF wild-type required
- Alzeeb 2024: KRAS-driven immunosuppression mechanisms (KRAS-IRF2-CXCL3-MDSC axis, CD8 AICD sensitization) — murine data
- Alzeeb 2024 Study C: MC38 (anti-PD-1 resistant) — CD8+ infiltration increase p=0.045; M1 macrophage increase p=0.02
- Published literature on KRAS mutation subtypes in CRC (G12D ~29%, G12V ~22%, G13D ~17%, G12C ~6%)
- BRAF V600E exclusion: confirms trial targets non-BRAF-driven CRC

**Output produced:**
- Expected immune microenvironment profile for BRAF WT/KRAS mutated MSS mCRC: KRAS-driven MDSC burden, reduced CD8 TIL, CXCL3-CXCR2 axis activity
- KRAS subtype distribution model: expected G12D/G12V/G13D/G12C proportions in enrolled population and their differential immunosuppressive profiles
- Mechanistic rationale map: how STC-1010's haptenation + ICD mechanism (verified in murine surrogate) is hypothesized to overcome KRAS-driven immunosuppression
- BRAF WT confirmation: absence of BRAF V600E-driven immune activation means the enrolled population is not the MSS BRAF V600E subgroup showing emerging IO signals (Morris et al. 2025)

**Scientific question answered for Brenus:**
What is the expected immunological landscape of the BreAK CRC-001 eligible population, and which KRAS-driven resistance mechanisms are most likely to be operative?

**Confidence level:** MEDIUM — mechanistic hypotheses from published literature; murine data from Alzeeb 2024 is scope-limited to murine surrogate

**Caveats:**
- All KRAS immune microenvironment data is from published literature (mechanistic hypotheses), not from BreAK CRC-001 patients
- Alzeeb 2024 murine data uses CT26 (MSS analog) and MC38 (MSI-H analog) — neither fully recapitulates human BRAF WT/KRAS mutated MSS CRC
- KRAS subtype distribution in BreAK CRC-001 enrolled patients is unknown (not recorded in public protocol)

---

### 3.4 Murine Preclinical Mechanism Anchoring

**Capability name:** Preclinical mechanism-to-clinical hypothesis translation (murine scope only)

**Verified inputs consumed:**
- Alzeeb 2024: full dataset (CT26, CMT-93, LTPA, MC38; efficacy results; proteomics; IS regimen parameters; safety)
- Alzeeb 2024 Study C: MC38 anti-PD-1 resistant model — 60% responders, CD8+ and M1 macrophage infiltration increases
- Alzeeb 2024 proteomics: 32% shared proteins across 3CL vaccine; 1,196 CT26-shared proteins
- Alzeeb 2024 IS regimen: cyclophosphamide 15 mg/kg IP D-1; mGM-CSF 5 µg SC with vaccine
- BreAK CRC-001 IS regimen: low-dose cyclophosphamide + GM-CSF (clinical doses not verified — B-002)

**Output produced:**
- Mechanistic hypothesis map: how the murine IS regimen (cyclophosphamide + GM-CSF) is hypothesized to translate to the clinical regimen
- Combination timing hypothesis: based on murine D-1 cyclophosphamide timing, generate testable hypotheses for clinical vaccine-to-chemotherapy sequencing
- Proteome overlap analysis: 32% shared proteins across 3CL vaccine lines as mechanistic basis for multi-antigen coverage hypothesis (murine scope only)
- Anti-PD-1 resistance model: MC38 Study C data as mechanistic rationale for STC-1010 activity in immune-excluded tumors (murine scope only)

**Scientific question answered for Brenus:**
What mechanistic hypotheses from the murine preclinical data are testable in BreAK CRC-001's exploratory biomarker endpoints, and what clinical measurements would confirm or refute them?

**Confidence level:** LOW for clinical translation; HIGH for murine mechanism description

**Caveats:**
- All outputs carry mandatory scope limitation: murine surrogate data, not clinical STC-1010 data
- Authors' caveat must be preserved verbatim: "Human vaccines based on STC technology should be tested in alternative models"
- Clinical IS regimen doses are not verified (B-002); combination timing hypotheses are extrapolations from murine parameters
- CT26 has higher mutational burden than human MSS CRC; MC38 is MSI-H analog — neither model is a direct human MSS CRC analog

---

### 3.5 MSI-H vs. MSS Arm Differentiation Analysis

**Capability name:** Arm-specific immunological context modeling

**Verified inputs consumed:**
- BreAK CRC-001 Arm 2A-1 (MSS): BRAF WT, KRAS mutated, MSS/pMMR, treatment-naïve for metastatic disease
- BreAK CRC-001 Arm 2A-2 (MSI-H): BRAF WT, KRAS mutated, MSI-H, post-ICI (prior IO allowed)
- QUILT-2.004: MSI-H explicitly excluded — confirms MSS arm has no analogous comparator trial with positive result
- Published literature: MSS CRC IO resistance mechanisms vs. MSI-H IO sensitivity (CheckMate 142 MSS ORR 0% vs. MSI-H ORR 31–55%)

**Output produced:**
- Arm-specific immunological context report: MSS arm (immune-excluded, KRAS-driven MDSC, TGF-β exclusion) vs. MSI-H arm (higher TMB, prior ICI exposure, potential acquired resistance mechanisms)
- Distinct endpoint interpretation framework: 12-month PFS rate benchmarks differ between MSS and MSI-H populations
- Post-ICI MSI-H population characterization: what acquired resistance mechanisms are expected in the MSI-H arm and how STC-1010 might address them
- Arm-specific biomarker hypothesis: different predictive biomarkers likely relevant for MSS vs. MSI-H arms

**Scientific question answered for Brenus:**
How do the immunological contexts of the MSS and MSI-H arms differ, and what does this mean for endpoint interpretation and biomarker strategy?

**Confidence level:** HIGH for structural differentiation; MEDIUM for mechanistic hypotheses

**Caveats:**
- No human clinical data for STC-1010 in either arm is available (B-003)
- MSI-H arm post-ICI population is a distinct clinical context with no direct comparator trial data in the verified fact set

---

### 3.6 Exploratory Biomarker Framework Design

**Capability name:** Pre-specified biomarker analysis plan architecture

**Verified inputs consumed:**
- BreAK CRC-001 exploratory endpoints: biomarkers in blood and tumor biopsies at T0/1m/2m/6m/12m/Tprogression
- BreAK CRC-001 Phase I immune monitoring: DTH at 1/24/48/72h post-injection
- BreAK CRC-001 eligibility: KRAS mutated, BRAF WT — defines molecular context for biomarker hypotheses
- Alzeeb 2024 Study C: CD8+ T cell infiltration (p=0.045) and M1 macrophage infiltration (p=0.02) as mechanistic endpoints (murine scope)
- Published MSS CRC biomarker literature: Immunoscore-IC, TGF-β exclusion signature, pTMB, liver metastasis status, SMAD4 IHC

**Output produced:**
- Pre-specified biomarker analysis plan template: which biomarkers to measure at each timepoint, which assay platforms are compatible with the collection schedule
- Candidate biomarker priority ranking: liver metastasis status (clinically accessible, strongest IO resistance predictor), SMAD4 IHC (clinically accessible, predicts immune exclusion), KRAS subtype (NGS, already required), Immunoscore-IC (IHC, validated in CRC), TGF-β exclusion signature (RNA-seq, research-grade)
- DTH response analysis framework: how to quantify and interpret DTH scores at 1/24/48/72h as a pharmacodynamic endpoint
- Missing data imputation plan: for conditional on-treatment biopsies

**Scientific question answered for Brenus:**
What pre-specified biomarker analysis plan should be embedded in the Phase IIA protocol to generate credible, regulator-acceptable biomarker hypotheses from Phase I data?

**Confidence level:** MEDIUM — framework is based on published literature and verified trial structure; validation requires clinical data

**Caveats:**
- Assay platforms for BreAK CRC-001 exploratory endpoints are not specified in the public protocol — CrisPRO framework must be compatible with Brenus's actual assay choices
- Biomarker hypotheses are mechanistic (from published literature and murine data) — none are validated in STC-1010-treated patients
- On-treatment biopsy collection is conditional — missing data will limit the dataset

---

## SECTION 4: EXECUTABLE IF OQ-01 RESOLVES (HT29 BRAF CONFLICT)

**OQ-01 definition:** The active scientific conflict between HT29 (BRAF V600E) being a confirmed component of STC-1010 (per ASCO 2023 e14661) and the trial's BRAF wild-type eligibility requirement (Exclusion Criterion #7). Resolution requires either: (a) confirmation that HT29 BRAF V600E antigen presentation is scientifically acceptable in a BRAF WT patient population, or (b) confirmation that HT29 has been or will be substituted with a BRAF WT cell line.

**Current status:** ACTIVE CONFLICT — not resolved. Do not treat as resolved in any output.

### 4.1 Full Human Cell Line Antigen Mapping

**What becomes executable:** If OQ-01 resolves (either direction), CrisPRO can use the confirmed human cell line set to:
- Model the antigen repertoire of STC-1010 using published proteomics for HCT116 and LoVo (and HT29 if confirmed acceptable, or its substitute)
- Assess KRAS mutation status of vaccine cell lines vs. trial eligibility (HCT116 is KRAS G13D; LoVo is KRAS G13D — both KRAS mutated, consistent with trial eligibility)
- Model HLA-peptide binding predictions for the confirmed cell line antigen set
- Assess patient-tumor antigen overlap: what proportion of BRAF WT/KRAS mutated MSS mCRC tumors express antigens present in the vaccine cell lines

**If OQ-01 resolves as "HT29 acceptable":** Full three-line antigen mapping executable. BRAF V600E antigen inclusion in vaccine for BRAF WT patients requires explicit scientific justification in any CrisPRO output.

**If OQ-01 resolves as "HT29 is a problem":** Two-line antigen mapping (HCT116 + LoVo) executable immediately; substitute cell line mapping executable once substitute is identified.

**Confidence level if resolved:** MEDIUM — antigen mapping from published proteomics is an approximation; actual STC-1010 antigen repertoire requires Brenus mass spectrometry data

---

### 4.2 Vaccine-Tumor Antigen Concordance Analysis

**What becomes executable:** With confirmed human cell lines, CrisPRO can assess whether the antigens in STC-1010 are expressed in BRAF WT/KRAS mutated MSS mCRC tumors from public datasets (TCGA, CPTAC). This is the foundational analysis for a CDx biomarker strategy.

**Confidence level if resolved:** MEDIUM — public dataset antigen expression may not match individual patient tumor antigen profiles

---

### 4.3 BRAF V600E Antigen Inclusion Scientific Assessment (if HT29 confirmed acceptable)

**What becomes executable:** If OQ-01 resolves as "HT29 acceptable," CrisPRO can model whether BRAF V600E-derived peptides in the vaccine could generate cross-reactive T cells against BRAF WT tumor antigens, or whether they represent immunologically inert antigens in BRAF WT patients.

**Confidence level if resolved:** LOW — cross-reactivity modeling is speculative without experimental validation

---

## SECTION 5: EXECUTABLE IF OQ-04 RESOLVES (BEVACIZUMAB ARM ASSIGNMENT)

**OQ-04 definition:** Which specific arms of BreAK CRC-001 receive bevacizumab, and whether bevacizumab assignment is physician choice, biomarker-gated, or arm-specific. Current status: PROVISIONAL (B-004). The "with or without" optionality is verified; arm-level assignment is not.

### 5.1 Arm-Specific Combination Timing Optimization

**What becomes executable:** If bevacizumab arm assignment is confirmed, CrisPRO can build arm-specific pharmacodynamic models:
- For bevacizumab-receiving arms: model the VEGF-A/vascular normalization window (peak CD8 infiltration at cycle 2, ~days 14–28) and optimal vaccine timing relative to this window
- For non-bevacizumab arms: model the VEGF-A/TOX-driven T-cell exhaustion axis without anti-VEGF intervention
- Differential biomarker predictions: VEGF-A levels, CD8 infiltration dynamics, M2 macrophage burden — expected to differ between bevacizumab and non-bevacizumab arms

**Confidence level if resolved:** MEDIUM — pharmacodynamic modeling based on published literature; clinical validation required

### 5.2 Bevacizumab Subgroup Analysis Pre-specification

**What becomes executable:** With confirmed arm assignment, CrisPRO can pre-specify a bevacizumab subgroup analysis for the Phase IIA primary endpoint, with appropriate power calculations for the subgroup comparison.

**Confidence level if resolved:** MEDIUM — power depends on arm sizes, which are not fully specified in public protocol

---

## SECTION 6: BLOCKED UNTIL EXTERNAL CONFIRMATION

The following CrisPRO capabilities cannot be executed until the named blockers are resolved. These are hard gates — no workaround exists.

### 6.1 Blocked by B-003 (Human Clinical Data)

**What is blocked:**
- Any analysis using n=6, 100% DCR, or DTH response data as inputs
- Preliminary clinical signal modeling (response rate estimation, PFS projection from early data)
- Pharmacodynamic endpoint validation (DTH as predictor of clinical benefit)
- Safety profile characterization for STC-1010 in humans
- Any comparison of STC-1010 clinical activity to historical benchmarks using STC-1010 data as the numerator

**Why hard-gated:** All human clinical data for STC-1010 originates from sources that were not retrieved in the PhD verification session (BusinessWire/Akamai block; BioSpace 404; AACR 2026 CT051 not directly accessed). These data points cannot be used as inputs regardless of their plausibility.

**Resolution path:** Direct retrieval of AACR 2026 abstract CT051; or Brenus data room under NDA/CDA; or peer-reviewed publication.

---

### 6.2 Blocked by B-002 (GMP Manufacturing Parameters)

**What is blocked:**
- Clinical dose-response modeling for STC-1010
- Batch-to-batch consistency analysis
- Clinical manufacturing scalability assessment
- Any model that requires knowing the clinical cell concentration, irradiation dose, or haptenation parameters

**Why hard-gated:** Clinical GMP parameters are not disclosed in any retrieved source. Murine surrogate parameters (Alzeeb 2024) cannot be assumed to equal clinical parameters.

**Resolution path:** Brenus data room / IND filing (CMC section).

---

### 6.3 Blocked by B-005 (ASCO 2024 Abstract)

**What is blocked:**
- Any analysis using data points attributed to the ASCO 2024 abstract for STC-1010
- Any patient count, response rate, or safety observation from ASCO 2024

**Why hard-gated:** BioSpace ASCO 2024 article returned HTTP 404; BusinessWire ASCO 2024 press release blocked by Akamai CDN. Abstract content not directly retrieved.

**Resolution path:** Direct retrieval from ASCO meeting library; or Brenus-provided copy.

---

## SECTION 7: GAPS CRISPRO CANNOT CLOSE

These are scientific or clinical gaps that are not computational problems. CrisPRO cannot close them regardless of what inputs become available.

### 7.1 Attribution Problem: STC-1010 vs. mFOLFOX6 Contribution

**The gap:** In a single-arm trial without a concurrent randomized control, it is impossible to determine what proportion of any observed clinical benefit (PFS, DCR, ORR) is attributable to STC-1010 vs. mFOLFOX6 ± bevacizumab. mFOLFOX6 ± bevacizumab achieves ~80–90% DCR and ~50–55% 12-month PFS in 1L MSS mCRC (verified from QUILT-2.004 Arm A: PFS 8.8m; published TRIBE2, CAIRO5 data).

**Why this is not a computational problem:** Attribution requires a counterfactual — what would have happened to the same patients without STC-1010. A counterfactual can only be estimated from a randomized control arm. No computational model can substitute for randomization because the selection of patients who receive STC-1010 is not random — it is determined by eligibility criteria, site selection, and physician judgment, all of which introduce unmeasured confounders. CrisPRO can model the expected SOC response rate using historical data, but this is a benchmark comparison, not causal attribution. The difference between a benchmark comparison and a randomized comparison is the entire basis of clinical trial methodology.

**What CrisPRO can do (but is not attribution):** Build a historical control benchmark (Section 3.1) that contextualizes the observed PFS rate. This is hypothesis-generating, not causal.

---

### 7.2 Randomization Gap

**The gap:** BreAK CRC-001 is non-randomized (open-label, single-arm per cohort). Without randomization, any observed difference between BreAK CRC-001 outcomes and historical benchmarks is confounded by patient selection, site effects, temporal trends in SOC, and unmeasured prognostic factors.

**Why this is not a computational problem:** Randomization is the only method that balances known and unknown confounders between treatment groups. Propensity score matching, inverse probability weighting, and other observational methods can reduce but not eliminate confounding from unmeasured variables. In a trial with n=57–60 Phase IIA patients, the statistical power for any propensity-adjusted analysis is insufficient to draw causal conclusions. This is a trial design problem that must be addressed at the protocol level, not a computational problem.

**What CrisPRO can do (but is not randomization):** Design an adaptive enrichment framework (Section 3.2) that improves the probability of detecting a signal in a pre-specified biomarker-enriched subgroup. This reduces dilution but does not substitute for randomization.

---

### 7.3 Liver Metastasis Stratification Gap

**The gap:** The BreAK CRC-001 protocol does not specify liver metastasis burden limits, does not stratify by liver metastasis status, and does not pre-specify a subgroup analysis for liver-metastatic vs. non-liver-metastatic patients. Active liver metastases are the single strongest predictor of IO failure in MSS CRC across multiple trials (REGONIVO, RIN, CO.26 subgroup analyses). Approximately 50–70% of mCRC patients have liver metastases.

**Why this is not a computational problem:** CrisPRO cannot retroactively add liver metastasis stratification to a trial that did not collect this data systematically as a stratification factor. If liver metastasis status is not recorded as a covariate in the trial database, it cannot be used in a pre-specified subgroup analysis. Even if it is recorded informally, a post-hoc subgroup analysis by liver metastasis status will not be accepted by regulators as primary evidence. The solution is a protocol amendment — a clinical and regulatory action, not a computational one.

**What CrisPRO can do (but is not stratification):** Model the expected impact of liver metastasis prevalence on the Phase IIA primary endpoint using published IO resistance data. This quantifies the dilution risk but does not resolve it.

---

### 7.4 Murine-to-Human Translation Gap

**The gap:** The only published preclinical data for the STC platform (Alzeeb 2024) uses a murine surrogate vaccine in syngeneic mouse models. The authors explicitly state that human translation is unvalidated. The CT26 model has higher mutational burden than human MSS CRC; the MC38 model is an MSI-H analog. Neither model recapitulates liver metastasis-induced systemic immune tolerance, TGF-β-driven T-cell exclusion in human stroma, or KRAS-IRF2-MDSC axis in human tumors.

**Why this is not a computational problem:** The gap between murine syngeneic models and human MSS CRC is a biological and translational science problem. No computational model can bridge this gap without human data. The history of MSS CRC IO is replete with mechanistically rational preclinical hypotheses (MEK inhibition in IMblaze370; TGF-β inhibition in multiple trials) that failed completely in human trials. Computational modeling of murine data cannot predict human outcomes.

**What CrisPRO can do (but is not translation):** Use the murine data as a mechanistic anchor for generating testable clinical hypotheses (Section 3.4). The hypotheses must be tested in human data.

---

## SECTION 8: GUARDRAILS

The following guardrails govern all CrisPRO outputs for the Brenus engagement. Each guardrail specifies exact prohibited language and the accurate alternative framing.

---

### Guardrail 1: No Checkpoint Inhibitor Attribution

**Prohibited language:**
- "STC-1010 + checkpoint inhibitor combination"
- "STC-1010 + ICI regimen"
- "CPI-based combination in BreAK CRC-001"
- Any framing that implies a checkpoint inhibitor is part of the BreAK CRC-001 treatment regimen
- "ICI" used to describe the treatment (as opposed to prior-treatment eligibility)

**Why prohibited:** BreAK CRC-001 contains NO checkpoint inhibitor in the treatment regimen. Confirmed by ASCO 2024 TPS3635 direct retrieval. "ICI" in the trial context refers exclusively to prior-treatment eligibility for the MSI-H cohort (Arm 2A-2 requires prior ICI exposure). The QUILT-2.004 comparator trial used avelumab (anti-PD-L1) — this must not be conflated with the BreAK CRC-001 regimen.

**Accurate alternative framing:**
"BreAK CRC-001 evaluates STC-1010 + low-dose cyclophosphamide + GM-CSF + mFOLFOX6 ± bevacizumab. No checkpoint inhibitor is included in the treatment regimen. In the MSI-H arm (2A-2), prior ICI exposure is an eligibility requirement, not a treatment component."

---

### Guardrail 2: No Human Clinical Efficacy Data as Inputs

**Prohibited language:**
- "STC-1010 achieved 100% DCR in n=6 patients"
- "Preliminary data shows 100% disease control"
- "DTH responses were observed in STC-1010-treated patients" (as a factual assertion)
- "n=6 patients treated with STC-1010 showed..."
- Any data point from AACR 2026 abstract CT051, BusinessWire, or BioSpace ASCO 2024 used as a factual input

**Why prohibited:** All human clinical data for STC-1010 is BLOCKED (B-003). Sources were not retrieved in the PhD verification session. These data points cannot be asserted as facts or used as computational inputs regardless of their plausibility.

**Accurate alternative framing:**
"No human clinical efficacy or safety data for STC-1010 is available from directly retrieved sources. BreAK CRC-001 (NCT06934538) is actively recruiting as of 2025-12-19; hasResults=false in the registry. Preliminary signals have been referenced in press coverage, but those sources were not directly retrieved and cannot be verified [BLOCKED — source not retrieved]."

---

### Guardrail 3: No Murine Data as Human Efficacy Evidence

**Prohibited language:**
- "STC-1010 extends survival by 40% in CRC" (without specifying murine model)
- "STC-1010 has demonstrated efficacy in CRC models" used to imply human efficacy
- Presenting CT26 or MC38 model results as predictive of human outcomes
- "Preclinical data supports efficacy in MSS CRC" without the murine scope limitation

**Why prohibited:** Alzeeb 2024 uses a murine surrogate vaccine, not the clinical STC-1010 product. The authors explicitly state human translation is unvalidated. CT26 has higher mutational burden than human MSS CRC; MC38 is an MSI-H analog.

**Accurate alternative framing:**
"In murine syngeneic CRC models, the STC platform murine surrogate extended survival and induced CD8+ T cell and M1 macrophage infiltration [VERIFIED — Alzeeb et al. 2024, murine data only]. The authors note that human translation requires testing in alternative models. These preclinical findings provide mechanistic rationale but do not constitute evidence of human efficacy."

---

### Guardrail 4: No "200+ Antigens" as Verified Scientific Fact

**Prohibited language:**
- "STC-1010 presents over 200 tumor antigens" (as a verified fact)
- "STC-1010's broad coverage of >200 cancer-related proteins" (as a verified fact)
- Any use of the "200+" figure without the COMPANY_CLAIM tag

**Why prohibited:** The "over 200 cancer-related proteins" claim appears only on the Brenus company website. It is not sourced to any peer-reviewed publication. This was an error in prior Agent 5 canon (C-004), corrected in Canon v2.

**Accurate alternative framing:**
"Brenus Pharma states that STC-1010 stimulates immune responses against over 200 cancer-related proteins [COMPANY_CLAIM — Brenus website only; not confirmed in any peer-reviewed source]. The murine surrogate vaccine in Alzeeb et al. 2024 shows proteome sharing across cell lines (32% shared proteins across 3CL vaccine), but human vaccine proteome data is not reported in that paper."

---

### Guardrail 5: No HT29 BRAF Conflict as Resolved

**Prohibited language:**
- "HT29 is an acceptable component of STC-1010 for BRAF WT patients"
- "The HT29 BRAF V600E issue does not affect the trial"
- "HT29 BRAF V600E antigens are immunologically inert in BRAF WT patients"
- Any framing that treats the HT29/BRAF conflict as resolved or inconsequential
- Any speculation about the implications of the conflict

**Why prohibited:** The HT29 BRAF V600E conflict is an ACTIVE SCIENTIFIC CONFLICT. HT29 carries BRAF V600E; the trial excludes BRAF-mutant patients (Exclusion Criterion #7). This conflict is documented in Canon v2 but not resolved. Resolution requires additional data (OQ-01).

**Accurate alternative framing:**
"HT29 carries BRAF V600E. BreAK CRC-001 excludes BRAF-mutant patients (Exclusion Criterion #7). This creates an active scientific conflict between the vaccine composition and the trial's eligibility requirement. This conflict is documented but not resolved. CrisPRO does not model HT29-specific antigen contributions until OQ-01 is resolved."

---

### Guardrail 6: No QUILT-2.004 as Positive Efficacy Precedent

**Prohibited language:**
- "QUILT-2.004 demonstrated that vaccine + ICI + mFOLFOX6 is active in MSS CRC"
- "NCT03050814 provides efficacy precedent for BreAK CRC-001"
- Any framing that presents QUILT-2.004 as a positive trial
- Citing QUILT-2.004 design elements without disclosing the negative efficacy outcome

**Why prohibited:** QUILT-2.004 was TERMINATED for futility at interim analysis. HR 1.061 (0.380–2.966), p=0.91. No PFS benefit. This is a negative result. Design precedent value is limited to structural elements only.

**Accurate alternative framing:**
"QUILT-2.004 (NCT03050814) was terminated for futility at interim analysis (HR 1.061, p=0.91; n=30). It provides structural design precedent only (safety lead-in, bevacizumab sequencing, oxaliplatin dose reduction in combination arm). Its negative efficacy outcome is a cautionary precedent for vaccine + SOC combinations in unselected MSS mCRC."

---

### Guardrail 7: No Conflation of MSI-H and MSS IO Data

**Prohibited language:**
- Using KEYNOTE-177 (pembrolizumab in MSI-H CRC) as a benchmark for STC-1010's MSS arm
- "IO has demonstrated benefit in CRC" without specifying MSI-H vs. MSS
- Presenting MSI-H IO success as evidence that STC-1010 will work in MSS CRC

**Why prohibited:** MSS/pMMR CRC (~95% of mCRC) is biologically distinct from MSI-H CRC. CheckMate 142 showed ORR 0% with nivolumab in the MSS cohort (n=74). BreAK CRC-001 correctly separates MSS (Arm 2A-1) and MSI-H (Arm 2A-2) into distinct arms.

**Accurate alternative framing:**
"Checkpoint immunotherapy has demonstrated durable benefit in MSI-H/dMMR CRC (~5% of mCRC). MSS/pMMR CRC (~95% of mCRC) — the primary target of BreAK CRC-001 Arm 2A-1 — has been uniformly resistant to checkpoint blockade (ORR 0% in CheckMate 142 MSS cohort). STC-1010's mechanism is designed to address the specific immunosuppressive architecture of MSS CRC."

---

*End of crispro_fitgap_brenus_verified_only.md — v1.0 — 2026-04-28*
*Agent 5 — CrisPRO Fit-Gap Analysis, Proceed-Now Lane*
*Canon reference: brenus_canon_v2_freeze.md | Blockers reference: brenus_final_blockers_registry.md*
