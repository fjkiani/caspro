# BreAK CRC-001 Design Intelligence Brief — Repaired v2
## CrisPRO Platform — Brenus Pharma Engagement
**Prepared by:** CrisPRO / Phylo
**Date:** 2026-04-30
**Classification:** External — Brenus Pharma
**Scope:** Post-adjudication design constraint analysis for BreAK CRC-001 (NCT06934538)
**Version note:** v2 applies all Table C rewrites from the Source-Integrity Adjudication
(2026-04-30) against Verified Claim Ledger v1.0 (2026-04-27). Every unsafe statement has
been removed or replaced with the exact safe language from Table D. No new claims introduced.

---

## 1. Purpose and Framing

This brief summarizes the output of a structured comparative analysis of prior MSS CRC immunotherapy programs, conducted to understand where those trials failed and what that failure landscape implies for BreAK CRC-001 design decisions that are still open.

The analysis is not a critique of the STC-1010 program. It is an attempt to be useful at a specific moment: before Phase IIa enrollment locks in a design that will be difficult to reinterpret after the fact. The comparator programs reviewed here failed for identifiable, non-random reasons. Several of those reasons are directly relevant to choices that remain open in BreAK CRC-001.

The brief is organized around four themes: the failure mode landscape, the specific design constraints those failures imply, the open questions that require sponsor data to resolve, and the areas where CrisPRO believes it can add the most value.

---

## 2. Comparator Failure Landscape — What the Evidence Actually Shows

We reviewed 12 trials across the MSS CRC IO space, including all programs with structural similarity to BreAK CRC-001 (1L, mFOLFOX6 backbone, bevacizumab-containing, or vaccine-based). The failure modes partition into three axes.

### 2.1 Mechanism Failures (M) — The drug worked but the biology was wrong

**CheckMate 9X8** (NCT03414983, nivolumab + mFOLFOX6 + bevacizumab, n=196, 1L)
HR 0.81 (95%CI 0.53–1.23), p=0.30. mPFS 11.9 vs 11.9 months. Phase 3 not triggered.
*Lesson:* PD-1 blockade alone was insufficient to improve PFS in 1L MSS mCRC (CheckMate 9X8: HR 0.81, p=0.30, PMID 38485190). The mechanisms underlying IO resistance in MSS CRC are multifactorial and include, among others, T-cell exclusion, myeloid immunosuppression, and liver-mediated immune tolerance — though the relative contribution of each mechanism in the clinical setting has not been established in a single peer-reviewed source. This is the null benchmark for any IO addition to mFOLFOX6 + bevacizumab.

**QUILT-2.004** (NCT03050814, Ad-CEA vaccine + avelumab + mFOLFOX6 + bevacizumab, n=30, 1L, terminated)
HR 1.061 (95%CI 0.380–2.966), p=0.91. mPFS 8.8 vs 10.1 months.
*Lesson:* This is the closest structural comparator to BreAK CRC-001 — a multi-component immune activation strategy (viral vector vaccine + PD-L1 checkpoint + chemotherapy + bevacizumab) on an identical backbone. It generated multifunctional CD4+/CD8+ T-cell responses in 8/11 IO patients vs 1/8 SOC (p=0.020), confirming that peripheral immune priming occurred. It still failed. The failure mode — peripheral immune activation without tumor trafficking — is directly relevant to any vaccine program relying on peripheral immune engagement. Peripheral immune activation is necessary but not sufficient. [Editorial interpretation: the specific mechanism of failure is inferred from the immunological data; it is not established by a single peer-reviewed source.]

### 2.2 Patient Selection Failures (S) — The drug may have worked in the wrong patients

**GRANITE GO-010** (NCT05141721, personalized neoantigen vaccine + mFOLFOX6/bev maintenance)
All-comer HR 0.73; ctDNA-low subgroup HR 0.50. Both non-significant, wide CIs. Company bankrupt.
**[PRESS-RELEASE-ONLY — company bankrupt; ctDNA threshold undefined; not peer-reviewed; do not cite as evidence of efficacy. Use as design hypothesis only.]**
*Lesson:* The ctDNA-low subgroup showed a directional HR of 0.50 — a signal seen in a vaccine program in this indication. The trial enrolled all-comers and the ctDNA-low subgroup was exploratory, not pre-specified. The trial was not designed to test the enrichment hypothesis it retrospectively identified. Whether the underlying biology is capable of generating a clinical signal in a prospectively enriched population remains unknown. This is a design hypothesis, not validated evidence.

**BOT/BAL Phase 1** (NCT03860272, botensilimab + balstilimab, n=101 MSS mCRC, no liver mets)
ORR 17% (95%CI 10–26%), DCR 61%. Phase 2 cORR 19% (n=62, BOT 75mg+BAL; conference presentation, ASCO GI 2025, not yet peer-reviewed). Phase 3 BATTMAN initiated.
*Lesson:* One of two programs with validated IO signals in no-liver-met MSS mCRC. BOT/BAL (ORR 17%, PMID 38871975) and RIN (ORR 36.4% in the NLM subgroup, n=22, PMID 39504677) are the two programs with peer-reviewed evidence of IO activity in this population. The defining feature of BOT/BAL is explicit exclusion of active liver metastases. This is the strongest clinical validation of liver-met status as a patient selection variable in this indication.

**RIN** (NCT04362839, regorafenib + ipilimumab + nivolumab, NLM subgroup n=22)
NLM ORR 36.4%, mPFS 5.0 months, mOS 27.5 months, 3-year PFS 19.3%. Three patients disease-free >18 months after treatment completion.
*Lesson:* Confirms the BOT/BAL no-liver-met signal in a different drug combination. ORR 36.4% in the RIN NLM subgroup (n=22, PMID 39504677) is among the highest reported IO response rates in MSS mCRC. The small subgroup size (n=22) limits the certainty of this ranking. Durable remissions are possible. The liver-met stratification is not a minor covariate — it is the primary patient selection variable.

### 2.3 Architecture Failures (A) — The trial could not show what it needed to show

**GRANITE GO-010** (see above): ctDNA-low subgroup was exploratory, not pre-specified. The trial was not powered to test the enrichment hypothesis it retrospectively identified.

**QUILT-2.004**: n=30, terminated early. Underpowered to detect any signal even if present.

**Sintilimab + bev + XELOX** (NCT04194359): ORR 84%, n=25, single-arm, single-center, Chinese population. Uninterpretable. Cannot attribute to sintilimab vs XELOX + bevacizumab.

**Common thread across architecture failures:** Trials that did not pre-specify biomarker enrichment criteria, did not capture liver-met status as a stratification variable, and did not define ctDNA or immune response thresholds prospectively were unable to generate interpretable evidence even when directional signals were present.

---

## 3. What This Means for BreAK CRC-001 — Four Open Design Constraints

The following four constraints are derived directly from the failure landscape above. Each is grounded in a specific gap identified from the NCT06934538 registry. None requires a fundamental protocol change — most can be addressed through stratification variable capture, covariate pre-specification, or exploratory endpoint formalization before Phase IIa enrollment.

### Constraint 1: Liver Metastasis Status Is Not Captured as a Stratification Variable

**What the registry shows:** NCT06934538 does not include liver metastasis status as an eligibility criterion, stratification variable, or pre-specified covariate. Symptomatic ascites is excluded (Exclusion #1), but liver metastasis burden is not addressed.

**Why this matters:** BOT/BAL (ORR 17% no-liver-met, PMID 38871975) and RIN (ORR 36.4% NLM, n=22, PMID 39504677) demonstrate that liver-met status is the most validated patient selection variable for IO in MSS mCRC. A Phase IIa PFS rate at 12 months that includes both liver-met and no-liver-met patients will be difficult to interpret in the context of the field.

**Important nuance:** A 2025 secondary analysis of AtezoTRIBE (PMID 39908699, ESMO Open) found that liver mets were prognostic but not predictive of atezolizumab resistance in pMMR mCRC (Pint PFS=0.990, OS=0.800). This is an exploratory secondary analysis in a pMMR (not MSS-restricted) population; the Immunoscore-IC interaction within the liver-met subgroup was non-significant (Pint PFS=0.166, OS=0.473). It does not supersede the BOT/BAL and RIN signals. The correct framing is: liver mets + Immunoscore-IC-low = potentially non-permissive; liver mets alone = worse prognosis but not necessarily IO-resistant. This nuance strengthens, not weakens, the case for capturing liver-met status — it means the variable needs to be analyzed in combination with immune biomarkers, not ignored.

**What we would ask:** Is liver metastasis status (presence/absence, number of lesions, largest lesion diameter) captured in the eCRF as a baseline variable? Is it planned as a stratification variable for Phase IIa randomization or as a pre-specified covariate in the Phase IIa primary analysis? If not, a protocol amendment before Phase IIa enrollment would be warranted.

### Constraint 2: Biopsy Is Conditional, Not Mandatory

**What the registry shows:** NCT06934538 Inclusion Criterion #6 states that tumor biopsy is required "only if not representing an unacceptable clinical risk and/or if technically feasible." This is a conditional biopsy requirement.

**Why this matters:** The Phase IIa primary endpoint is PFS rate at 12 months. The secondary and exploratory endpoints include immune and molecular biomarkers. If biopsy compliance is low — which is expected in a conditional-biopsy design in a metastatic population — the biomarker data that would allow interpretation of the PFS result will be missing for a substantial fraction of patients. A trial that shows a PFS signal without biomarker data to explain it will face the same interpretability problem as QUILT-2.004: the signal exists but cannot be attributed to mechanism.

**What we would ask:** What is the expected biopsy compliance rate based on Phase Ia experience? What biomarkers are analyzed from biopsies (IHC panel, RNA-seq, proteomics)? Is Immunoscore-IC planned as a biomarker? Is CMS subtype capture planned? Pre-specifying the biomarker panel and expected compliance rate is required for Phase IIa power calculations and for any pre-specified biomarker subgroup analysis.

### Constraint 3: Optional Bevacizumab Creates Immunological Heterogeneity

**What the registry shows:** NCT06934538 specifies "mFOLFOX6 with or without bevacizumab." Bevacizumab use is at investigator discretion.

**Why this matters:** Bevacizumab's anti-VEGF mechanism has been associated with immunomodulatory effects in preclinical and translational studies, including effects on myeloid cell recruitment and tumor vasculature. Whether these effects materially confound immune biomarker interpretation in BreAK CRC-001 has not been directly tested. Capturing bevacizumab use as a pre-specified covariate would allow this question to be addressed in the Phase IIa analysis.

**What we would ask:** Is bevacizumab use captured as a stratification variable for Phase IIa? Is it planned as a pre-specified covariate in the Phase IIa primary analysis? What is the expected proportion of patients receiving bevacizumab? This is a straightforward design fix that does not require a protocol amendment if addressed before Phase IIa enrollment.

### Constraint 4: Molecular Biomarker Endpoints Are Not Fully Specified

**What the registry shows:** NCT06934538 lists "immune and molecular biomarkers" as exploratory outcomes with timepoints at T0, 1m, 2m, 6m, 12m, and Tprogression. ctDNA is not explicitly named. The platform, threshold, and molecular response definition are not specified in the registry.

**Why this matters:** GRANITE GO-010 is the cautionary example. The ctDNA-low subgroup (HR 0.50) was the strongest signal in that program — but it was exploratory, the threshold was undefined, and the company is now bankrupt. The lesson is not that ctDNA is uninformative; it is that ctDNA must be pre-specified with a defined platform, threshold, and response definition to generate interpretable evidence. A secondary analysis of CO.26 (Loree et al., Clin Cancer Res 2024, PMID 38727700) found that plasma TMB ≥28 mut/Mb (GuardantOMNI) was predictive of benefit from durvalumab + tremelimumab in refractory MSS mCRC (HR 0.34, Pint=0.070). This threshold is data-driven, platform-specific, and derived from a refractory population — it is not directly applicable to a 1L trial. But it establishes that plasma-based molecular biomarkers can stratify MSS mCRC IO response, and that tissue TMB cannot.

**What we would ask:** Is ctDNA included in the molecular biomarker panel? What platform is used? Is a molecular response threshold pre-specified? Is pTMB planned as an exploratory endpoint? These can be added as exploratory endpoints without a protocol amendment if not already included.

---

## 4. The STC-1010 Antigen Architecture — One Open Scientific Question

The EACR 2025 abstract (EACR25-1044, Zbinden et al., Insphero + Brenus Pharma) reports that STC-1010 is produced from HCT116, HT-29, and LoVo cell lines. ASCO 2023 abstract e14661 (Alzeeb et al.) is cited as a second source for this claim; however, that abstract was not independently retrieved in our primary source session due to access limitations. Both sources are sponsor-affiliated. The specific human cell line composition of clinical STC-1010 has not been confirmed by an independent third party.

One scientific question follows from this: HT29 carries BRAF V600E (established cell line biology, ATCC HTB-38, CCLE, COSMIC). BreAK CRC-001 requires BRAF wild-type status at enrollment (NCT06934538 Exclusion Criterion #7). This means the vaccine is reported to contain antigens derived from a BRAF V600E cell line, while enrolled patients will have BRAF WT tumors.

We raise this not as a concern but as an open question. The haptenization mechanism is designed to expose broadly shared tumor antigens, including stress-response proteins and damage-associated molecular patterns. The specific immunogenic payload of clinical STC-1010 — including which proteins are dominant and whether they are mutation-specific — has not been characterized in any retrieved peer-reviewed source. If the dominant immunogenic payload is not BRAF V600E-specific, the mismatch may be clinically irrelevant. Brenus has stated publicly that multi-omics analysis of STC-1010 batches has been conducted to assess batch-to-batch reproducibility. The data package is not in the public record. Whether it includes antigen characterization per cell line is unknown.

The question we would want answered: What fraction of the immunogenic antigen payload derived from HT29 is shared with BRAF WT patient tumor proteomes? Is there antigen overlap data comparing HT29-derived antigens vs HCT116/LoVo-derived antigens? This is the kind of question that is straightforward to answer from existing internal data and that would materially strengthen the scientific rationale for the BRAF WT eligibility criterion.

---

## 5. What Phase IIa Needs to Be Able to Show

The Phase IIa primary endpoint is PFS rate at 12 months in MSS mCRC patients (Arm 2A-1). For this endpoint to be interpretable — not just statistically significant, but interpretable in the context of the field — the trial needs to be able to answer three questions:

**Question 1: Did the immune mechanism engage?**
This requires quantitative DTH response data, CD8+ TIL counts from biopsies (where available), and cytokine profiles. A press-release summary (CheckOrphan, AACR 2026 CT051) reports that DTH responses were observed in all 6 Phase Ia patients. Quantitative DTH values, per-patient RECIST assessments, and immune biomarker data are not publicly available. The DTH readout is the appropriate pharmacodynamic endpoint for a hapten-mediated vaccine mechanism. The question is whether it will be captured with sufficient granularity and in sufficient patients to support a mechanistic claim.

**Question 2: In which patients did it engage?**
This requires liver-met status, bevacizumab use, and molecular biomarker data (ctDNA, pTMB if collected) as pre-specified covariates. Without these, a positive PFS signal cannot be attributed to a specific patient subgroup, and a negative signal cannot be explained.

**Question 3: Is the signal durable?**
The RIN NLM data (3-year PFS 19.3%, three patients disease-free >18 months after treatment completion, PMID 39504677) establishes that durable remissions are possible in MSS mCRC with IO. The Phase IIa design should include OS as a secondary endpoint with sufficient follow-up to capture durability signals, not just 12-month PFS rate.

---

## 6. Where CrisPRO Adds Value

CrisPRO is a platform for translating early clinical and translational data into a credible enrichment and analysis strategy. In the context of BreAK CRC-001, the specific areas where we believe we can be useful are:

**Biomarker framework design:** Defining the pre-specified biomarker panel, response thresholds, and subgroup analysis plan for Phase IIa before enrollment locks in. This includes liver-met stratification, ctDNA platform selection and threshold pre-specification, bevacizumab covariate capture, and biopsy biomarker panel specification.

**Enrichment hypothesis testing:** Using the available Phase Ia summary data (n=6, DTH responses observed in all patients, 100% DCR — per press-release summary only; quantitative data not publicly available) as a starting point for generating a prospective enrichment hypothesis for Phase IIa. The GRANITE ctDNA-low signal (HR 0.50, press-release-only) and the BOT/BAL no-liver-met signal (ORR 17–19%, PMID 38871975) provide the field context. Combining these into a pre-specified Phase IIa enrichment strategy is the core analytical problem.

**Translational data interpretation:** The EACR 2025 3D spheroid data (EACR25-1044, Zbinden et al.) reports CD8+ T-cell-mediated apoptosis in HCT116, HT29, and SW620 cells and cytokine secretion in co-culture with CCD-18Co fibroblasts. IFN-γ production was reported in a separate CAM model study (ASCO 2023 e14661, Alzeeb et al.); that abstract was not independently retrieved in our primary source session. Brenus has reported multi-omics batch consistency data for STC-1010 (AACR 2024). The data package is not in the public record and was not retrieved in our primary source session. Connecting available translational data to the Phase Ia immune engagement summary and the Phase IIa biomarker plan is the translational bridge that makes the program credible to a regulatory and partnering audience.

**Comparator positioning:** The failure landscape analysis above is the foundation for positioning STC-1010 against the field. The key claim — that STC-1010 addresses the peripheral-priming-without-trafficking failure mode observed in QUILT-2.004 — requires mechanistic data to support it. [This is an editorial interpretation; the specific mechanism of failure in QUILT-2.004 is inferred from immunological data, not established by a single peer-reviewed source.] The DTH readout is the right pharmacodynamic endpoint. The question is whether the Phase IIa design captures it with sufficient rigor to make the claim.

---

## 7. Prioritized Data Requests

The following data requests are prioritized by urgency. The first three are relevant to Phase IIa design decisions that may require protocol amendments.

| Priority | Request | Scientific Rationale | Protocol Amendment Required? |
|----------|---------|---------------------|------------------------------|
| 1 | Antigen overlap data: HT29-derived antigens (BRAF V600E) vs HCT116/LoVo antigens (BRAF WT) vs patient tumor proteomes | Resolves the open scientific question on antigen mismatch; cell line composition is reported in sponsor-affiliated abstracts only | No — internal data request |
| 1 | CT051 full poster data: quantitative DTH values, per-patient RECIST, immune biomarker data, translational correlation | Press-release summary only is available; quantitative data required for any external scientific communication | No — internal data request |
| 1 | Liver met stratification plan: is liver-met status captured as a stratification variable or pre-specified covariate in Phase IIa? | BOT/BAL and RIN establish liver-met status as the primary patient selection variable in MSS mCRC IO | Potentially yes — if not currently captured |
| 2 | ctDNA platform and threshold specification: is ctDNA included in the molecular biomarker panel? What platform? What threshold? | GRANITE GO-010 failure demonstrates that undefined ctDNA endpoints cannot generate interpretable evidence | No — exploratory endpoint |
| 2 | Bevacizumab stratification plan: is bevacizumab use captured as a stratification variable or pre-specified covariate? | Bevacizumab's anti-VEGF mechanism has been associated with immunomodulatory effects; capturing use as a covariate would allow this to be addressed in Phase IIa analysis | Potentially yes — if not currently stratified |
| 2 | KRAS subtype and SMAD4 capture: are these captured in the eCRF? | KRAS G12C is now targetable; SMAD4 loss is associated with liver-met tropism and IO resistance | No — exploratory biomarker |
| 3 | Full multi-omics antigen characterization package (proteomics per cell line, batch reproducibility data) | Strengthens scientific rationale and supports regulatory filing; data package not in public record | No — internal data request |

---

## 8. Evidence Base and Source Integrity

All claims in this brief are sourced from peer-reviewed publications, primary registry records, or conference abstracts. Press-release-only data is explicitly labeled. The following source hierarchy applies throughout:

- **PEER-REVIEWED:** CheckMate 9X8 (PMID 38485190), QUILT-2.004 (PMID 35274710), BOT/BAL Phase 1 (PMID 38871975), AtezoTRIBE liver-met analysis (PMID 39908699), CO.26 pTMB analysis (PMID 38727700), RIN updated survival (PMID 39504677)
- **CONFERENCE ABSTRACT (sponsor-affiliated; retrieved):** EACR 2025 EACR25-1044 (STC-1010 3D spheroids, Zbinden et al., Insphero + Brenus Pharma)
- **CONFERENCE ABSTRACT (NOT INDEPENDENTLY RETRIEVED):** ASCO 2023 e14661 (Alzeeb et al.) — cited in secondary sources; access was not achieved in the primary source session due to paywall restrictions. Claims dependent on this abstract are PROVISIONAL.
- **PRESS RELEASE ONLY — use with explicit caveat:** GRANITE GO-010 HR values (company, bankrupt; ctDNA threshold undefined), AACR 2026 CT051 first-in-human summary (CheckOrphan; quantitative data not available)
- **NOT RETRIEVED:** AACR 2024 press release (Akamai block). Claims attributed to this source in prior versions of this brief have been removed.
- **PRIMARY REGISTRY:** NCT06934538 (ClinicalTrials.gov API v2), NCT03050814 (ClinicalTrials.gov API v2 + results)

Source integrity notes:
1. The pTMB ≥28 mut/Mb finding (HR 0.34, Pint=0.070) is from CO.26 (PMID 38727700), not MEDITREME. These are separate trials. The threshold is data-driven, GuardantOMNI-specific, and derived from a refractory (≥2L) population. It is a hypothesis-generating finding, not a validated biomarker.
2. The specific human cell line composition of clinical STC-1010 (HCT116, HT29, LoVo) is reported in sponsor-affiliated conference abstracts only. No independent third-party verification has been retrieved. All claims dependent on cell line identity are PROVISIONAL.
3. No peer-reviewed or conference-abstract human clinical efficacy or safety data for STC-1010 is available in the public record. BreAK CRC-001 (NCT06934538) has no results posted as of the last registry update (2025-12-19).

---

*This brief was prepared by CrisPRO / Phylo as part of the BreAK CRC-001 design intelligence engagement. It is intended for scientific discussion with the Brenus Pharma team and does not constitute regulatory or clinical advice. v2 applies source-integrity adjudication against Verified Claim Ledger v1.0 (2026-04-27). All Table C items have been removed or rewritten using exact Table D safe language. No new claims have been introduced.*
