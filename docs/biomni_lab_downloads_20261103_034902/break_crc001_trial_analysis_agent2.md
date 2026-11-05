# BreAK CRC-001 / STC-1010: Trial Protocol Reconstruction & Signal Dilution Analysis
**Agent 2: Trial Protocol & Population Analyst**
**Date of Analysis:** April 2026
**Primary Source:** NCT06934538 (ClinicalTrials.gov, last updated 2025-12-22)

---

> **NOTATION CONVENTION**
> - **[PROTOCOL FACT]** = Directly sourced from ClinicalTrials.gov NCT06934538, ASCO 2024 abstract (JCO 42:TPS3635), or Brenus Pharma press releases
> - **[ANALYTICAL INTERPRETATION]** = Reasoning applied to protocol facts; not stated in source documents
> - **[NOT FOUND IN PUBLIC SOURCES]** = Explicitly flagged gaps

---

## SECTION 1: Trial Schema

### Core Identifiers
| Field | Value | Source |
|-------|-------|--------|
| **NCT Number** | NCT06934538 | ClinicalTrials.gov, accessed April 2026 |
| **Sponsor Study ID** | BreAK CRC-001 | ClinicalTrials.gov |
| **Official Title** | "Open Label, Multicenter, Dose-escalation and Cohort-expansion Phase I/IIA Trial of STC-1010, an Immunotherapy, in Patients With Unresectable Locally Advanced or Metastatic Colorectal Cancer (CRC) - BreAK CRC Trial (BreAK for Brenus Anti-cancer)" | ClinicalTrials.gov |
| **Phase** | Phase I / Phase IIA (sequential) | ClinicalTrials.gov |
| **Study Type** | Interventional, Non-randomized, Sequential | ClinicalTrials.gov |
| **Masking** | Open-label (NONE) | ClinicalTrials.gov |
| **Overall Status** | RECRUITING | ClinicalTrials.gov, last verified 2025-07 |
| **Actual Start Date** | 2025-06-17 | ClinicalTrials.gov |
| **Primary Completion (est.)** | June 2028 | ClinicalTrials.gov |
| **Study Completion (est.)** | June 2029 | ClinicalTrials.gov |
| **Enrollment Target** | ~90 participants (21–33 Phase I + 57–60 Phase IIA) | ClinicalTrials.gov |
| **FDA Regulated Drug** | Yes (IND filed) | ClinicalTrials.gov |
| **DMC** | Yes | ClinicalTrials.gov |

### Sponsor & Collaborators
| Role | Entity |
|------|--------|
| **Lead Sponsor** | Brenus Pharma (Industry; Lyon, France) |
| **Responsible Party** | Sponsor |
| **No listed collaborators** | — |

**Key Contacts [PROTOCOL FACT]:**
- Corinne TORTORELLI, Pharm.D, Ph.D — ctortorelli@brenus-pharma.com
- Rebecca TANZI — rtanzi@brenus-pharma.com

### Sites (as of December 2025 update)
| Site | City | Country | Status |
|------|------|---------|--------|
| Institut Bergonié | Bordeaux | France | RECRUITING |
| Centre Georges François Leclerc (CGFL) | Dijon | France | RECRUITING |
| Hospices Civils de Lyon (HCL) | Lyon | France | RECRUITING |
| Institut du Cancer de Montpellier (ICM) | Montpellier | France | RECRUITING |
| Centre Léon Bérard (CLB) | Lyon | France | NOT YET RECRUITING |
| CHU de Poitiers | Poitiers | France | NOT YET RECRUITING |
| Institut Gustave Roussy (IGR) | Villejuif | France | RECRUITING |
| Institut Jules Bordet | Brussels | Belgium | NOT YET RECRUITING |
| Johns Hopkins | Baltimore, MD | USA | NOT YET RECRUITING |

**[PROTOCOL FACT]:** First patients dosed September 2, 2025 at French sites (CGFL, Institut Bergonié, ICM, HCL). Belgium and US expansion planned for Phase IIA. (Source: Brenus Pharma press release, September 2, 2025)

---

## SECTION 2: Disease Setting & Line of Therapy

### Indication [PROTOCOL FACT]
- **Exact indication:** Unresectable locally advanced (stage IIIC, T4b) OR unresectable metastatic (stage IV, R0) adenocarcinoma of the colon or rectum
- **Histology required:** Adenocarcinoma (histologically confirmed)
- **Resectability:** Explicitly EXCLUDED if resectable with curative intent or if patient is considered for curative strategy by intensifying chemotherapy to induce resectability

### Line of Therapy [PROTOCOL FACT]
- **Setting:** First-line (treatment-naïve for metastatic/advanced disease)
- **Prior adjuvant allowed:** Yes — fluoropyrimidine monotherapy OR oxaliplatin-based chemotherapy is permitted IF >6 months elapsed between end of adjuvant treatment and first relapse
- **Prior metastatic chemotherapy:** EXCLUDED (Exclusion Criterion #4: "Prior chemotherapy for metastatic disease")
- **Prior IO for advanced disease:** EXCLUDED for Phase I and Arm 2A-1; ALLOWED for Arm 2A-2 (MSI-H arm)

### [ANALYTICAL INTERPRETATION] Line of Therapy Significance
The strict 1L-only design means all patients are chemotherapy-naïve in the metastatic setting. This is appropriate for vaccine priming (immune system not yet depleted by multiple lines of cytotoxic therapy) but creates a high bar for efficacy demonstration since mFOLFOX6 ± bevacizumab already achieves ~10–12 months PFS as SOC in 1L mCRC.

---

## SECTION 3: Inclusion/Exclusion Table

| # | Criterion | Type (I/E) | Biomarker Relevance | Dilution Risk |
|---|-----------|------------|---------------------|---------------|
| 1 | Age 18–75 years (>70 must have ECOG PS=0) | I | None | Low — age cap limits elderly patients with potentially different immune senescence |
| 2 | Histologically confirmed unresectable locally advanced (stage IIIC, T4b) or metastatic (stage IV) adenocarcinoma of colon/rectum | I | None | Low |
| 3 | Adjuvant fluoropyrimidine or oxaliplatin-based chemo allowed if >6 months since end of adjuvant and first relapse | I | None | Medium — prior oxaliplatin exposure may affect immune priming capacity |
| 4 | KRAS and BRAF mutation status determination required | I | **HIGH** — BRAF WT required; KRAS mutated required for Phase I and Arm 2A-1 | **HIGH** — KRAS mutation status is a required biomarker gate; see Section 5 |
| 5 | Measurable disease per RECIST 1.1 | I | None | Low |
| 6 | Biopsy at screening and on-treatment (if feasible/safe) | I | Translational | Low — "only if not representing unacceptable clinical risk" creates variability in biomarker data |
| 7 | ECOG PS ≤1 (PS=0 if >70 years) | I | None | Low |
| 8 | Life expectancy >3 months | I | None | Low |
| 9 | Effective contraception | I | None | None |
| 10 | Symptomatic ascites or pleural effusion | E | None | **MEDIUM** — excludes highest-burden patients; may enrich for better prognosis but limits generalizability |
| 11 | DPD deficiency | E | None | Low |
| 12 | Resectable tumor with curative intent | E | None | Low |
| 13 | Prior chemotherapy for metastatic disease | E | None | Low (appropriate) |
| 14 | Prior immunotherapy for advanced/metastatic disease (except Arm 2A-2) | E | **HIGH** | **HIGH** — prior IO exposure excluded in MSS arm; see Section 7 |
| 15 | Prior investigational agent | E | None | Low |
| 16 | **BRAF mutation** | **E** | **CRITICAL** | **HIGH** — BRAF-mutated patients excluded; see Section 5 |
| 17 | Active autoimmune disease (RA, lupus, Crohn's, UC) | E | None | Low |
| 18 | Medical conditions requiring immunosuppressive therapy | E | None | Low |
| 19 | Major surgery <4 weeks prior to first STC-1010 | E | None | Low |
| 20 | Radiotherapy <4 weeks prior (or <2 weeks palliative) | E | None | Low |
| 21 | Prior stem cell or solid organ transplantation | E | None | Low |
| 22 | Dementia/altered mental status | E | None | None |
| 23 | Active drug/alcohol abuse | E | None | None |
| 24 | Deprived of liberty | E | None | None |

**[NOT FOUND IN PUBLIC SOURCES]:**
- MSI/MSS testing methodology (IHC vs. PCR vs. NGS) not specified in public protocol
- Liver metastasis burden limits (number, % liver involvement) not specified
- CEA/CA19-9 thresholds not specified
- Specific KRAS mutation subtypes required (G12C, G12D, G12V, etc.) not specified
- SMAD4 status not mentioned in eligibility criteria
- TMB threshold not specified as eligibility criterion

---

## SECTION 4: Backbone Treatment Map

### 4.1 Chemotherapy Backbone [PROTOCOL FACT]
**mFOLFOX6** (standard regimen) administered as standard of care (SOC)
- Standard mFOLFOX6 components: Oxaliplatin 85 mg/m² IV + Leucovorin 400 mg/m² IV + 5-FU 400 mg/m² IV bolus + 5-FU 2400 mg/m² IV over 46h; every 2 weeks
- **[NOT FOUND IN PUBLIC SOURCES]:** Exact mFOLFOX6 dose modifications, number of planned cycles, and maintenance strategy not specified in public protocol

### 4.2 Bevacizumab [PROTOCOL FACT]
- **Status:** OPTIONAL (mFOLFOX6 **with or without** bevacizumab)
- **Dosing:** **[NOT FOUND IN PUBLIC SOURCES]** — Standard dosing would be 5 mg/kg IV q2w with mFOLFOX6, but this is NOT confirmed in public protocol documents
- **Schedule relative to vaccine:** **[NOT FOUND IN PUBLIC SOURCES]** — No public document specifies the timing of bevacizumab administration relative to STC-1010 injection
- **Stratification by bevacizumab use:** **[NOT FOUND IN PUBLIC SOURCES]** — Not mentioned in public protocol

### 4.3 Cyclophosphamide (Immunostimulant) [PROTOCOL FACT]
- **Role:** Low-dose immunostimulant (IS regimen component)
- **Preclinical dose:** 15 mg/kg IP, day before vaccine (from Alzeeb et al. 2024, DOI: 10.3389/fonc.2024.1427428)
- **Clinical dose:** **[NOT FOUND IN PUBLIC SOURCES]** — Exact clinical dose, route, and timing relative to STC-1010 not specified in public NCT record. The protocol describes "low-dose cyclophosphamide" as part of IS regimen but does not disclose the specific mg/m² or mg/kg dose in public-facing documents.
- **[ANALYTICAL INTERPRETATION]:** Low-dose cyclophosphamide (typically 200–300 mg/m² or 50 mg/day oral metronomic) is used in cancer vaccine trials to deplete regulatory T cells (Tregs). The preclinical dose of 15 mg/kg IP translates to approximately 300–400 mg/m² in humans using standard allometric scaling, consistent with published Treg-depleting regimens.

### 4.4 GM-CSF (Immunostimulant) [PROTOCOL FACT]
- **Role:** Low-dose immunostimulant (IS regimen component); adjuvant to enhance dendritic cell recruitment and antigen presentation
- **Preclinical dose:** 5 µg SC, same day as vaccine (from Alzeeb et al. 2024)
- **Clinical dose:** **[NOT FOUND IN PUBLIC SOURCES]** — Exact clinical dose, route, and timing not specified in public NCT record. Described as "low-dose GM-CSF" in IS regimen.
- **[ANALYTICAL INTERPRETATION]:** Standard GM-CSF doses in cancer vaccine trials range from 100–500 µg SC per injection. The preclinical 5 µg dose in mice is consistent with ~100–250 µg in humans.

### 4.5 STC-1010 Vaccine Schedule [PROTOCOL FACT]
- **Dose escalation:** Two dose levels being evaluated in Phase I
- **Preclinical schedule:** D7, D14, D21 (once weekly × 3) (from Alzeeb et al. 2024)
- **Clinical schedule:** **[NOT FOUND IN PUBLIC SOURCES]** — Exact clinical vaccination schedule (frequency, number of injections, boost schedule) not specified in public NCT record
- **DTH assessment:** After first vaccination (at 1, 24, 48, 72h post-injection) and after 4th, 8th, and every boost — this implies at least 8+ injections are planned
- **Route:** **[NOT FOUND IN PUBLIC SOURCES]** — Route of STC-1010 administration not specified in public protocol (likely SC or intradermal based on vaccine class)

### 4.6 Treatment Summary Table
| Component | Dose | Route | Timing | Source |
|-----------|------|-------|--------|--------|
| STC-1010 | 2 dose levels (escalating) | Not specified publicly | Not specified publicly | NCT06934538 |
| Cyclophosphamide | "Low-dose" (exact not public) | Not specified publicly | Not specified publicly | NCT06934538 |
| GM-CSF | "Low-dose" (exact not public) | Not specified publicly | Not specified publicly | NCT06934538 |
| mFOLFOX6 | Standard | IV | q2w | NCT06934538 |
| Bevacizumab | Standard (if used) | IV | q2w (if used) | NCT06934538 |

---

## SECTION 5: Biomarker Gating Matrix

| Biomarker | Status in Protocol | Details | Source |
|-----------|-------------------|---------|--------|
| **MSI/MSS status** | **REQUIRED AND STRATIFIED** | Phase I and Arm 2A-1: MSS (pMMR) only. Arm 2A-2: MSI-H only. Separate arms for each. | NCT06934538 |
| **KRAS mutation** | **REQUIRED — KRAS MUTATED** | Phase I and Arm 2A-1 explicitly require KRAS-mutated disease. Arm 2A-2 (MSI-H): KRAS mutation status required but arm description also states "KRAS mutated" | NCT06934538 |
| **BRAF mutation** | **EXCLUSION CRITERION** | BRAF-mutated patients are EXCLUDED from all arms | NCT06934538 |
| **RAS status (NRAS)** | **[NOT FOUND IN PUBLIC SOURCES]** | NRAS mutation status not mentioned; only KRAS and BRAF specified | NCT06934538 |
| **TMB** | **NOT GATED** | Not mentioned as eligibility criterion; listed as exploratory biomarker | NCT06934538 |
| **SMAD4** | **NOT GATED** | Not mentioned in eligibility criteria | NCT06934538 |
| **HER2** | **NOT GATED** | Not mentioned | NCT06934538 |
| **ctDNA** | **Exploratory only** | ctDNA dynamic listed as exploratory analysis | NCT06934538; ASCO 2024 |
| **Tumor biopsies** | **Required if feasible** | Screening and on-treatment biopsies required "if not representing unacceptable clinical risk" | NCT06934538 |
| **Immune biomarkers** | **Exploratory** | Cytokine profiles, immunophenotyping, PBMC markers, HLA expression, tumor necrosis, immune infiltration, TLS evolution | Brenus Pharma press release, Jan 2026 |

### Key Biomarker Architecture Notes [ANALYTICAL INTERPRETATION]
1. **KRAS mutation as enrichment strategy:** The requirement for KRAS-mutated disease in Phase I and Arm 2A-1 is a deliberate enrichment strategy. KRAS-mutated mCRC (~40–45% of all mCRC) is excluded from anti-EGFR therapy, making these patients dependent on chemotherapy ± bevacizumab. This also aligns with the preclinical data showing STC-1010 efficacy in KRAS-mutated models.

2. **BRAF exclusion rationale:** BRAF V600E-mutated mCRC (~8–10% of mCRC) has distinct biology (BRAF inhibitor combinations are SOC), different immune microenvironment, and different prognosis. Exclusion is scientifically justified but reduces the eligible population.

3. **MSS/MSI-H separation into distinct arms:** This is a critical design strength — MSS and MSI-H patients are NOT mixed, preventing dilution of the MSS signal by the inherently more immunogenic MSI-H population.

---

## SECTION 6: Endpoint Hierarchy

### 6.1 Phase I Primary Endpoints [PROTOCOL FACT]
**Safety/Tolerability:**
- Incidence, severity, and relationship of Treatment Emergent Adverse Events (TEAEs)
- Serious Adverse Events (SAEs)
- Dose-Limiting Toxicities (DLTs) during dose escalation
- AEs leading to treatment discontinuation
- Clinically significant findings on labs, vital signs, ECGs, physical exams
- **Grading:** CTCAE Version 5.0
- **DLT window:** 28 days
- **Goal:** Determine MTD and RP2D

### 6.2 Phase IIA Primary Endpoint [PROTOCOL FACT]
**Progression-Free Survival (PFS) rate at 12 months:**
- Defined as: proportion of participants alive and without progression (CR, PR, or SD) at 12 months from STC-1010 + IS regimen initiation
- **Assessment:** RECIST 1.1
- **[ANALYTICAL INTERPRETATION]:** This is a single-arm design with no randomized control. The 12-month PFS rate will be compared against historical benchmarks for mFOLFOX6 ± bevacizumab (~50–55% at 12 months in 1L MSS mCRC). The lack of a concurrent control arm is a significant limitation for causal attribution of any benefit to STC-1010.

### 6.3 Phase I Secondary Endpoints [PROTOCOL FACT]
1. **ORR at 6 months** — CR or PR per RECIST 1.1 from STC-1010 + IS initiation
2. **PFS rate at 6 months** — proportion alive with CR, PR, or SD per RECIST 1.1
3. **Median PFS**
4. **Cell-mediated immunity (DTH score)** — after first vaccination (1, 24, 48, 72h post-injection) and after 4th, 8th, and every boost

### 6.4 Phase IIA Secondary Endpoints [PROTOCOL FACT]
1. **Safety/tolerability** — TEAEs, SAEs, discontinuations (at 6, 12, 24 months)
2. **Clinical Benefit Rate (CBR)** — CR + PR + SD ≥6 months (at 12 and 24 months)
3. **Objective Response Rate (ORR)** — CR + PR per RECIST 1.1 (at 6, 12, 24 months)
4. **Duration of Response (DOR)** — first CR/PR to progression or death (at 6, 12, 24 months)
5. **Progression-Free Survival (PFS)** — time to progression or death; median PFS with 95% CI (at 6, 12, 24 months)
6. **Overall Survival (OS)** — time to death from any cause; median OS with 95% CI (at 12 and 24 months)
7. **Metastases resection rate** — percentage undergoing resection (up to 18 months)

### 6.5 Exploratory/Translational Endpoints [PROTOCOL FACT]
**Phase I:**
- Assessment of biomarkers in blood and tumor biopsies at: T0 (baseline/screening), 1 month, 2 months, 6 months, 12 months

**Phase IIA:**
- Assessment of biomarkers in blood and tumor biopsies at: T0, 1 month, 2 months, 6 months, 12 months, and at time of progression (up to 24 months)

**Specific exploratory markers (from Brenus Pharma press release, January 2026):**
- Cytokine profiles
- Immunophenotyping
- PBMC markers
- ctDNA dynamics
- HLA expression
- Tumor necrosis
- Immune infiltration
- Tertiary lymphoid structure (TLS) evolution

**[NOT FOUND IN PUBLIC SOURCES]:**
- Specific biomarker assay platforms (e.g., Olink, CyTOF, IHC panels) not specified
- Pre-specified biomarker response thresholds not defined in public protocol
- Predictive biomarker analysis plan not publicly available

---

## SECTION 7: Signal Dilution Risk Memo

### Overview
Signal dilution in BreAK CRC-001 refers to any factor that could attenuate the detectable vaccine-driven immune or clinical benefit in the trial population, making a true biological effect appear smaller or statistically insignificant. The single-arm design without randomization means dilution risks are particularly consequential — there is no internal control to separate vaccine effect from SOC effect.

---

### 7.1 Dilution Risk Table

| Risk Factor | Biological Mechanism | Magnitude of Risk | Addressable? | How? |
|-------------|---------------------|-------------------|--------------|------|
| **MSS all-comer enrollment (within MSS arm)** | MSS tumors have low mutational burden, sparse TIL infiltration, and immunosuppressive TME (MDSCs, M2 macrophages, Tregs). Vaccine-driven CD8 priming may be insufficient to overcome the "cold" TME in all MSS patients equally. Within the MSS arm, there is no sub-stratification by immune contexture (e.g., Immunoscore, TLS presence/absence). | **HIGH** | **Partially** | Retrospective stratification by Immunoscore, TLS density, or baseline CD8 infiltration from mandatory biopsies. Prospective: add Immunoscore as stratification factor in Phase IIA. |
| **Bevacizumab scheduling vs. vaccine priming window** | Bevacizumab creates a transient vascular normalization window (peak CD8 infiltration at cycle 2, ~4–6 weeks; Treg reconstitution by cycle 4, ~8 weeks). Vaccine-driven CD8 priming requires antigen presentation and T cell trafficking to tumor. If STC-1010 is administered outside the normalization window, the CD8 effectors generated cannot efficiently traffic to the tumor. In MSS CRC specifically, bevacizumab did NOT significantly reduce Treg density vs. baseline (PMID 35135679), limiting the immunostimulatory benefit. The protocol does NOT specify the timing of STC-1010 relative to bevacizumab cycles. | **HIGH** | **Yes** | Define a mandatory vaccine-to-bevacizumab timing window (e.g., vaccinate at cycle 2 of bev, days 14–21 post-first bev dose). Stratify by bevacizumab use (yes/no) in Phase IIA. |
| **KRAS/BRAF/SMAD4 molecular heterogeneity** | KRAS mutation subtypes (G12C, G12D, G12V, G12A, G13D, etc.) have distinct downstream signaling, immune evasion profiles, and neoantigen landscapes. G12C specifically is now targetable (sotorasib/adagrasib). SMAD4 loss (~25% of mCRC) is associated with liver metastasis tropism, TGF-β-mediated immunosuppression, and poor prognosis. The protocol requires KRAS-mutated disease but does NOT sub-stratify by KRAS codon/mutation type or SMAD4 status. | **MEDIUM** | **Partially** | Add KRAS mutation subtype and SMAD4 status to exploratory biomarker panel. Retrospective analysis of response by KRAS subtype. |
| **Liver metastasis burden** | Liver metastases create a profoundly immunosuppressive microenvironment (hepatic Kupffer cells, liver-resident NK cells, portal vein-derived immunosuppressive signals). Patients with high liver metastasis burden (>50% liver involvement) have impaired systemic immune responses and reduced vaccine efficacy. The protocol does NOT specify liver metastasis burden limits or stratification. | **HIGH** | **Yes** | Add liver metastasis burden (% liver involvement, number of lesions) as stratification factor. Consider excluding patients with >50% liver involvement or adding as a pre-specified subgroup analysis. |
| **Prior IO exposure (Arm 2A-2 only)** | Arm 2A-2 (MSI-H) allows prior immunotherapy. Prior anti-PD-1/PD-L1 therapy can induce T cell exhaustion, alter TCR repertoire, and create secondary resistance mechanisms (e.g., JAK1/2 mutations, beta-2-microglobulin loss). Mixing IO-naïve and IO-experienced patients in Arm 2A-2 without stratification will dilute any vaccine signal in the IO-naïve subgroup. | **MEDIUM** | **Yes** | Stratify Arm 2A-2 by prior IO exposure (yes/no). Pre-specify subgroup analysis for IO-naïve vs. IO-experienced patients. |
| **Backbone chemotherapy immunosuppression timing** | mFOLFOX6 causes transient lymphopenia (nadir ~day 7–10 post-infusion), particularly affecting CD4+ T helper cells and NK cells. Oxaliplatin has immunogenic cell death (ICD) properties that may actually enhance antigen presentation, but 5-FU is broadly immunosuppressive. If STC-1010 is administered during the lymphopenic nadir, vaccine-driven T cell priming will be severely impaired. The protocol does NOT specify the timing of STC-1010 relative to mFOLFOX6 cycles. | **HIGH** | **Yes** | Mandate STC-1010 administration on day 1 of each mFOLFOX6 cycle (before chemotherapy) or on day 8–10 (post-nadir recovery). Avoid administration at lymphopenic nadir (days 7–10). |
| **Single-arm design without randomized control** | Without a concurrent randomized control arm receiving mFOLFOX6 ± bevacizumab alone, any observed PFS benefit cannot be causally attributed to STC-1010. Historical controls are confounded by patient selection, site effects, and evolving SOC. | **HIGH** | **Partially** | Phase IIA could incorporate a concurrent registry control arm. Alternatively, use individual patient data meta-analysis from historical 1L MSS mCRC trials as benchmark. |
| **Age cap at 75 years** | Immune senescence (thymic involution, reduced naïve T cell output, impaired DC function) is most pronounced in patients >70 years. The protocol caps enrollment at 75 years and requires PS=0 for patients >70. This may actually REDUCE dilution risk by excluding the most immunosenescent patients, but limits generalizability. | **LOW** | N/A | Not a dilution risk per se; may actually enrich for immunocompetent patients. |
| **Optional biopsy requirement** | On-treatment biopsies are required "only if not representing unacceptable clinical risk." This creates heterogeneous biomarker data — some patients will have paired biopsies, others will not. This limits the power of translational analyses to identify predictive biomarkers. | **MEDIUM** | **Partially** | Mandate biopsies for accessible lesions (e.g., subcutaneous, lymph node, liver accessible by IR). Develop a pre-specified missing data imputation plan. |
| **Lack of MSI-H/MSS cross-contamination** | The protocol correctly separates MSS (Arm 2A-1) and MSI-H (Arm 2A-2) into distinct arms. This is a design STRENGTH that prevents dilution of the MSS signal. | **LOW (mitigated)** | N/A | Already addressed by design. |
| **VEGF-A/NRP-1 axis and M2 macrophage polarization** | VEGF-A promotes M2 macrophage polarization via NRP-1 (PMID 31209139). In patients NOT receiving bevacizumab, ongoing VEGF-A signaling will maintain M2 polarization and suppress vaccine-driven Th1/CD8 responses. In patients receiving bevacizumab, VEGF-A blockade may transiently shift macrophages toward M1, but this effect is incomplete and transient. The optional nature of bevacizumab creates heterogeneity in this immunosuppressive axis. | **MEDIUM** | **Partially** | Stratify by bevacizumab use. Assess M2/M1 macrophage ratio in tumor biopsies as exploratory endpoint. |
| **Lack of randomization within Phase IIA** | Phase IIA is a single-arm expansion, not a randomized trial. The 12-month PFS rate primary endpoint will be compared against historical benchmarks, which are subject to selection bias and temporal confounding. | **HIGH** | **Partially** | Consider adding a concurrent randomized control cohort in Phase IIA, or use a Bayesian adaptive design with pre-specified historical control benchmarks. |

---

### 7.2 Bevacizumab Scheduling Risk — Detailed Analysis [ANALYTICAL INTERPRETATION]

The optional use of bevacizumab in BreAK CRC-001 creates a complex immunological scenario that is NOT addressed in the public protocol:

**The Normalization Window Hypothesis:**
- Bevacizumab cycle 1 (day 1): VEGF-A blockade begins; vascular normalization initiates
- ~Cycle 2 (days 14–28): Peak CD8 T cell infiltration into tumor (normalization window)
- ~Cycle 4 (days 56–84): Treg reconstitution; immunosuppressive TME re-established
- **Optimal vaccine timing:** STC-1010 should ideally be administered to coincide with the normalization window (cycle 2), when the tumor is most accessible to vaccine-primed CD8 T cells

**MSS-Specific Caveat:**
- In MSS CRC specifically, bevacizumab did NOT significantly reduce Treg density vs. baseline (PMID 35135679), suggesting the normalization window may be less immunologically permissive in MSS tumors than in other tumor types
- This means the bevacizumab scheduling risk may be LOWER in MSS patients than in MSI-H patients, but the M2 macrophage polarization risk (VEGF-A/NRP-1 axis) remains relevant

**Protocol Gap:**
- The public NCT record does NOT specify whether STC-1010 is administered before or after bevacizumab on the same day, or on a different day
- The public record does NOT specify whether bevacizumab use is stratified or tracked as a covariate in efficacy analyses

---

### 7.3 KRAS Heterogeneity Risk — Detailed Analysis [ANALYTICAL INTERPRETATION]

The requirement for KRAS-mutated disease is an enrichment strategy, but KRAS mutations are heterogeneous:

| KRAS Mutation | Frequency in mCRC | Immune Profile | Relevance to STC-1010 |
|---------------|-------------------|----------------|----------------------|
| G12D | ~35% of KRAS-mut | Moderate immunosuppression | Most common; likely dominant in trial |
| G12V | ~20% of KRAS-mut | High VEGF-A, immunosuppressive | May reduce vaccine efficacy |
| G12C | ~10% of KRAS-mut | Targetable; distinct biology | Patients may prefer KRAS G12C inhibitors |
| G13D | ~15% of KRAS-mut | Distinct signaling | May have different vaccine response |
| Other | ~20% of KRAS-mut | Variable | Heterogeneous |

**[NOT FOUND IN PUBLIC SOURCES]:** The protocol does not specify which KRAS mutation subtypes are required or excluded. KRAS G12C patients may increasingly opt for sotorasib/adagrasib combinations, potentially reducing enrollment of this subtype.

---

### 7.4 Summary Risk Prioritization

| Priority | Risk Factor | Magnitude | Action Required |
|----------|-------------|-----------|-----------------|
| 1 | Backbone chemotherapy immunosuppression timing | HIGH | Define STC-1010 timing relative to mFOLFOX6 cycle |
| 2 | Bevacizumab scheduling vs. normalization window | HIGH | Stratify by bev use; define timing window |
| 3 | Liver metastasis burden | HIGH | Add as stratification factor |
| 4 | Single-arm design | HIGH | Consider concurrent registry control |
| 5 | MSS all-comer enrollment (within MSS arm) | HIGH | Add Immunoscore/TLS as exploratory stratifier |
| 6 | KRAS/BRAF/SMAD4 heterogeneity | MEDIUM | Add to exploratory biomarker panel |
| 7 | Optional biopsy requirement | MEDIUM | Mandate for accessible lesions |
| 8 | VEGF-A/NRP-1/M2 macrophage axis | MEDIUM | Assess in biopsies; stratify by bev use |
| 9 | Prior IO exposure (Arm 2A-2) | MEDIUM | Stratify within Arm 2A-2 |
| 10 | Age cap / immune senescence | LOW | Not a dilution risk; may enrich |

---

## SECTION 8: Early Clinical Data Summary (as of April 2026)

**[PROTOCOL FACT — from Brenus Pharma press releases and AACR 2026 abstract — PRIMARY SOURCES VERIFIED April 2026]**

> **VERIFICATION NOTE (added post-agent review):** All claims in this section verified against primary sources: BusinessWire press releases dated January 6, 2026 and April 14, 2026, and AACR 2026 abstract CT051. Two separate AACR events must be distinguished: (1) AACRIO conference, February 18–21, 2026, Los Angeles — preclinical + early clinical insights only, no n= or DCR data disclosed; (2) AACR Annual Meeting, April 17–22, 2026, San Diego — CT051 with n=6, 100% DCR data.

### January 2026 Update (Brenus Pharma press release, January 6, 2026):
- First dose levels successfully completed
- No dose-limiting toxicities (DLTs) observed
- Exact CEO quote: *"We are pleased to report that the safety profile observed to date is good and consistent with our expectations with no DLT"* — Paul Bravetti, CEO
- Exact CEO quote: *"preliminary clinical signals are very promising and support further evaluation of subsequent cohorts – we are observing trends in efficacy that are stronger than anything that has been previously reported in hard-to-treat solid tumors"*
- **[GUARDRAIL]:** This CEO quote is promotional language without a comparator arm and should NOT be used as an efficacy claim in any downstream materials
- Trial continuing to enroll at higher dose levels
- Exploratory analyses ongoing: cytokine profiles, immunophenotyping, PBMC markers, ctDNA, HLA expression, tumor necrosis, immune infiltration, TLS evolution

### AACR Immuno-Oncology Conference 2026 (February 18–21, 2026, Los Angeles):
- Separate earlier event — preclinical data and early clinical insights presented
- No specific n= or DCR figures disclosed in public materials from this event
- **[Do NOT conflate with April AACR Annual Meeting data]**

### AACR Annual Meeting 2026 (April 20, 2026; Abstract CT051 — VERIFIED):
- **n=6 patients; median follow-up: 6 months** [exact quote from press release]
- **Safety:** No DLTs observed; favorable safety profile [verified]
- **Efficacy:** 100% disease control rate (DCR) by RECIST [exact quote: "100% disease control rate (DCR) in RECIST"] [verified]
- **Immune activation:** DTH responses observed [exact quote: "delayed-type hypersensitivity (DTH) responses"] [verified]
- **Population:** Metastatic MSS CRC, first-line setting [verified]
- **Authors:** Tosi D (ICM Montpellier), Italiano A (Bergonié), Hollebecque A (Gustave Roussy), You B (HCL Lyon), Richert I, Pinteur B, Bravetti P (Brenus Pharma), Ghiringhelli F (CGFL Dijon) [verified]
- **Poster:** "From preclinical models to first-in-human evaluation of STC-1010 immunotherapy in unresectable advanced colorectal cancer" [verified]
- **Poster Board:** 11, Section 50, Session: First-in-Human Phase I Clinical Trials [verified]

**[ANALYTICAL INTERPRETATION]:** The 100% DCR in 6 patients is encouraging but must be interpreted with extreme caution:
1. n=6 is too small for any efficacy conclusions
2. **100% DCR is NOT distinguishable from SOC effect** — mFOLFOX6 ± bevacizumab alone achieves ~80–90% DCR in 1L mCRC; with n=6 and no control arm, the 100% DCR cannot be attributed to STC-1010
3. Median follow-up of 6 months is insufficient to assess PFS or OS
4. No control arm for comparison
5. DTH responses are a positive immunological signal but do not confirm tumor-directed immunity or clinical benefit
6. **[GUARDRAIL FOR DOWNSTREAM USE]:** Do not present 100% DCR as evidence of vaccine efficacy in any CrisPRO-facing or partner-facing materials without the above caveats explicitly stated

---

## SECTION 9: What Was NOT Found in Public Sources

The following protocol details are **NOT available in any public document** (NCT record, ASCO abstract, press releases, or published papers):

1. **Exact clinical dose of STC-1010** (mg or cell number per injection)
2. **Exact clinical dose of cyclophosphamide** (mg/m² or mg/kg; route; timing relative to vaccine)
3. **Exact clinical dose of GM-CSF** (µg; route; timing relative to vaccine)
4. **Exact vaccination schedule** (frequency, number of injections, boost interval)
5. **Timing of STC-1010 relative to mFOLFOX6 cycles** (day of cycle, pre- vs. post-chemotherapy)
6. **Timing of STC-1010 relative to bevacizumab** (same day? different day? which cycle?)
7. **Bevacizumab stratification** (whether bev use is tracked as a covariate in efficacy analyses)
8. **Liver metastasis burden limits** (no maximum % liver involvement specified)
9. **KRAS mutation subtype requirements** (any KRAS mutation vs. specific codons)
10. **NRAS mutation status** (not mentioned in eligibility)
11. **SMAD4 status** (not mentioned in eligibility or stratification)
12. **MSI/MSS testing methodology** (IHC vs. PCR vs. NGS)
13. **Specific biomarker assay platforms** for exploratory endpoints
14. **Pre-specified biomarker response thresholds**
15. **Historical control benchmark** for Phase IIA primary endpoint comparison
16. **Maintenance strategy** after initial mFOLFOX6 cycles
17. **Number of planned mFOLFOX6 cycles** before potential maintenance
18. **Dose modification rules** for STC-1010 in case of toxicity
19. **Randomization/stratification factors** for Phase IIA (beyond MSS vs. MSI-H arm assignment)
20. **EudraCT number** (European CTA number not listed in public NCT record)

---

## SECTION 10: Source Bibliography

| # | Source | URL | Date |
|---|--------|-----|------|
| 1 | ClinicalTrials.gov NCT06934538 (primary source) | https://clinicaltrials.gov/study/NCT06934538 | Last updated 2025-12-22; accessed April 2026 |
| 2 | ClinicalTrials.gov API JSON record | https://clinicaltrials.gov/api/v2/studies?query.term=STC-1010&format=json | Accessed April 2026 |
| 3 | Alzeeb G et al. "Efficacy of novel allogeneic cancer cells vaccine to treat colorectal cancer." Frontiers in Oncology 2024 | https://doi.org/10.3389/fonc.2024.1427428 | Published 2024 |
| 4 | You B et al. "BreAK CRC, a first-in-human phase I/II trial of STC-1010..." JCO 2024;42:TPS3635 | https://meetings.asco.org/abstracts-presentations/238381 [DOI format unverified — plausible but not confirmed] | ASCO 2024 Annual Meeting, June 2024 |
| 5 | Brenus Pharma press release: "First Patients Dosed in First-in-Human Trial" | https://www.businesswire.com/news/home/20250901588403/en/ | September 2, 2025 |
| 6 | Brenus Pharma press release: "Favorable Tolerability and Clinical Signals in Early Preliminary Results" | https://www.businesswire.com/news/home/20260106391108/en/ | January 6, 2026 |
| 7 | Brenus Pharma press release: "AACR 2026: First-in-Human STC-1010 Data" | https://www.businesswire.com/news/home/20260414465808/en/ | April 14, 2026 |
| 8 | AACR 2026 Abstract CT051: "From preclinical models to first-in-human evaluation of STC-1010" | https://doi.org/10.1158/2326-6074.io2026-a061 (AACRIO 2026 version) | April 20, 2026 |
| 9 | PMID 35135679 — Bevacizumab and Treg density in MSS CRC | PubMed | 2022 |
| 10 | PMID 31209139 — VEGF-A promotes M2 macrophage polarization via NRP-1 | PubMed | 2019 |

---

*End of Report — Agent 2: Trial Protocol & Population Analyst*
*Analysis date: April 2026*
*All protocol facts sourced from public documents; analytical interpretations clearly labeled*
