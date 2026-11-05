# BreAK CRC-001 Design Intelligence Brief
## CrisPRO Platform — Brenus Pharma Engagement
**Prepared by:** CrisPRO / Phylo  
**Date:** 2026-04-30  
**Classification:** External — Brenus Pharma  
**Scope:** Post-adjudication design constraint analysis for BreAK CRC-001 (NCT06934538)

---

## 1. Purpose and Framing

This brief summarizes the output of a structured comparative analysis of prior MSS CRC immunotherapy programs, conducted to understand where those trials failed and what that failure landscape implies for BreAK CRC-001 design decisions that are still open.

The analysis is not a critique of the STC-1010 program. It is an attempt to be useful at a specific moment: before Phase IIa enrollment locks in a design that will be difficult to reinterpret after the fact. The comparator programs reviewed here failed for identifiable, non-random reasons. Several of those reasons are directly relevant to choices that remain open in BreAK CRC-001.

The brief is organized around four themes: the failure mode landscape, the specific design constraints those failures imply, the open questions that require sponsor data to resolve, and the areas where CrisPRO believes it can add the most value.

---

## 2. Comparator Failure Landscape — What the Evidence Actually Shows

We reviewed 12 trials across the MSS CRC IO space, including all programs with structural similarity to BreAK CRC-001 (1L, mFOLFOX6 backbone, bevacizumab-containing, or vaccine-based). The failure modes partition cleanly into three axes.

### 2.1 Mechanism Failures (M) — The drug worked but the biology was wrong

**CheckMate 9X8** (NCT03414983, nivolumab + mFOLFOX6 + bevacizumab, n=196, 1L)  
HR 0.81 (95%CI 0.53–1.23), p=0.30. mPFS 11.9 vs 11.9 months. Phase 3 not triggered.  
*Lesson:* PD-1 blockade alone cannot overcome the six-layer immunosuppressive architecture of MSS CRC — TGF-β-driven exclusion, VEGF-mediated myeloid suppression, MHC-I downregulation, Treg enrichment, M2 macrophage polarization, and liver-mediated immune tolerance. Adding a checkpoint to chemotherapy without addressing upstream priming is insufficient. This is the null benchmark for any IO addition to mFOLFOX6 + bevacizumab.

**QUILT-2.004** (NCT03050814, NKTR-214 + nivolumab + mFOLFOX6 + bevacizumab, n=30, 1L, terminated)  
HR 1.061 (95%CI 0.380–2.966), p=0.91. mPFS 8.8 vs 10.1 months.  
*Lesson:* This is the closest structural comparator to BreAK CRC-001 — a multi-component immune activation strategy (IL-2 pathway agonist + PD-1 + chemotherapy + bevacizumab) on an identical backbone. It generated multifunctional CD4+/CD8+ T-cell responses in 8/11 IO patients vs 1/8 SOC (p=0.020), confirming that peripheral immune priming occurred. It still failed. The failure mode is priming-without-trafficking: T cells were activated in the periphery but did not reach or persist in the tumor. This is the most important mechanistic lesson for STC-1010, which also relies on peripheral immune activation (DTH responses, DC priming). Peripheral immune activation is necessary but not sufficient.

### 2.2 Patient Selection Failures (S) — The drug may have worked in the wrong patients

**GRANITE GO-010** (NCT05141721, personalized neoantigen vaccine + mFOLFOX6/bev maintenance)  
All-comer HR 0.73; ctDNA-low subgroup HR 0.50. Both non-significant, wide CIs. Company bankrupt.  
*Lesson:* The strongest available enrichment hypothesis in the MSS CRC vaccine IO space. The ctDNA-low subgroup showed a directional HR of 0.50 — the best signal seen in any vaccine program in this indication. The trial failed because it enrolled all-comers and the ctDNA-low subgroup was exploratory, not pre-specified. The lesson is not that the vaccine failed; it is that the trial was not designed to show what the vaccine could do in the right patients. This is a design failure, not a biology failure. **Important caveat:** This data is press-release-only. The company is bankrupt. The ctDNA threshold is undefined. This is a design hypothesis, not validated evidence.

**BOT/BAL Phase 1** (NCT03860272, botensilimab + balstilimab, n=101 MSS mCRC, no liver mets)  
ORR 17% (95%CI 10–26%), DCR 61%. Phase 2 cORR 19% (n=62). Phase 3 BATTMAN initiated.  
*Lesson:* The only MSS CRC IO program with a validated clinical signal. The defining feature is explicit exclusion of active liver metastases. ORR 17–19% in no-liver-met MSS mCRC vs near-zero in liver-met patients across the IO literature. This is the strongest clinical validation of liver-met status as a patient selection variable in this indication.

**RIN** (NCT04362839, regorafenib + ipilimumab + nivolumab, NLM subgroup n=22)  
NLM ORR 36.4%, mPFS 5.0 months, mOS 27.5 months, 3-year PFS 19.3%. Three patients disease-free >18 months after treatment completion.  
*Lesson:* Confirms the BOT/BAL no-liver-met signal in a different drug combination. ORR 36.4% in non-liver-metastatic MSS mCRC is the highest validated IO response rate in this indication. Durable remissions are possible. The liver-met stratification is not a minor covariate — it is the primary patient selection variable.

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

**Why this matters:** BOT/BAL (ORR 17% no-liver-met vs ~0% liver-met) and RIN (ORR 36.4% NLM) demonstrate that liver-met status is the single most validated patient selection variable for IO in MSS mCRC. A Phase IIa PFS rate at 12 months that includes both liver-met and no-liver-met patients will be uninterpretable in the context of the field — the two populations have fundamentally different immune microenvironments and IO response rates.

**Important nuance:** A 2025 secondary analysis of AtezoTRIBE (PMID 39908699, ESMO Open) found that liver mets were prognostic but not predictive of atezolizumab resistance in pMMR mCRC (Pint PFS=0.990, OS=0.800), with Immunoscore-IC retaining directional predictive impact in the liver-met subgroup. This is an exploratory finding from a Phase 2 secondary analysis in a pMMR (not MSS-restricted) population and does not supersede the BOT/BAL and RIN signals. The correct framing is: liver mets + Immunoscore-IC-low = non-permissive; liver mets alone = worse prognosis but not necessarily IO-resistant. This nuance strengthens, not weakens, the case for capturing liver-met status — it means the variable needs to be analyzed in combination with immune biomarkers, not ignored.

**What we would ask:** Is liver metastasis status (presence/absence, number of lesions, largest lesion diameter) captured in the eCRF as a baseline variable? Is it planned as a stratification variable for Phase IIa randomization or as a pre-specified covariate in the Phase IIa primary analysis? If not, a protocol amendment before Phase IIa enrollment would be warranted.

### Constraint 2: Biopsy Is Conditional, Not Mandatory

**What the registry shows:** NCT06934538 Inclusion Criterion #6 states that tumor biopsy is required "only if not representing an unacceptable clinical risk and/or if technically feasible." This is a conditional biopsy requirement.

**Why this matters:** The Phase IIa primary endpoint is PFS rate at 12 months. The secondary and exploratory endpoints include immune and molecular biomarkers. If biopsy compliance is low — which is expected in a conditional-biopsy design in a metastatic population — the biomarker data that would allow interpretation of the PFS result will be missing for a substantial fraction of patients. A trial that shows a PFS signal without biomarker data to explain it will face the same interpretability problem as QUILT-2.004: the signal exists but cannot be attributed to mechanism.

**What we would ask:** What is the expected biopsy compliance rate based on Phase Ia experience? What biomarkers are analyzed from biopsies (IHC panel, RNA-seq, proteomics)? Is Immunoscore-IC planned as a biomarker? Is CMS subtype capture planned? Pre-specifying the biomarker panel and expected compliance rate is required for Phase IIa power calculations and for any pre-specified biomarker subgroup analysis.

### Constraint 3: Optional Bevacizumab Creates Immunological Heterogeneity

**What the registry shows:** NCT06934538 specifies "mFOLFOX6 with or without bevacizumab." Bevacizumab use is at investigator discretion.

**Why this matters:** Bevacizumab has well-characterized immunomodulatory effects — VEGF blockade reduces immunosuppressive myeloid cell recruitment, normalizes tumor vasculature to improve T-cell trafficking, and modulates the tumor immune microenvironment. Patients receiving bevacizumab will have a different immune context than those who do not. If bevacizumab use is not captured as a stratification variable or pre-specified covariate, the Phase IIa immune biomarker data will be confounded. DTH responses, CD8+ TIL counts, and cytokine profiles will not be interpretable across the full population.

**What we would ask:** Is bevacizumab use captured as a stratification variable for Phase IIa? Is it planned as a pre-specified covariate in the Phase IIa primary analysis? What is the expected proportion of patients receiving bevacizumab? This is a straightforward design fix that does not require a protocol amendment if addressed before Phase IIa enrollment.

### Constraint 4: Molecular Biomarker Endpoints Are Not Fully Specified

**What the registry shows:** NCT06934538 lists "immune and molecular biomarkers" as exploratory outcomes with timepoints at T0, 1m, 2m, 6m, 12m, and Tprogression. ctDNA is not explicitly named. The platform, threshold, and molecular response definition are not specified in the registry.

**Why this matters:** GRANITE GO-010 is the cautionary example. The ctDNA-low subgroup (HR 0.50) was the strongest signal in that program — but it was exploratory, the threshold was undefined, and the company is now bankrupt. The lesson is not that ctDNA is uninformative; it is that ctDNA must be pre-specified with a defined platform, threshold, and response definition to generate interpretable evidence. A secondary analysis of CO.26 (Loree et al., Clin Cancer Res 2024, PMID 38727700) found that plasma TMB ≥28 mut/Mb (GuardantOMNI) was predictive of benefit from durvalumab + tremelimumab in refractory MSS mCRC (HR 0.34, Pint=0.070). This threshold is data-driven, platform-specific, and derived from a refractory population — it is not directly applicable to a 1L trial. But it establishes that plasma-based molecular biomarkers can stratify MSS mCRC IO response, and that tissue TMB cannot.

**What we would ask:** Is ctDNA included in the molecular biomarker panel? What platform is used? Is a molecular response threshold pre-specified (e.g., ≥30% ctDNA decrease from baseline, as used in GRANITE GO-010 Phase 2)? Is pTMB planned as an exploratory endpoint? These can be added as exploratory endpoints without a protocol amendment if not already included.

---

## 4. The STC-1010 Antigen Architecture — One Open Scientific Question

The EACR 2025 abstract (EACR25-1044, Zbinden et al., Insphero + Brenus Pharma) and ASCO 2023 abstract e14661 (Alzeeb et al.) both confirm that STC-1010 is produced from three human CRC cell lines: HCT116, HT29, and LoVo. This is consistent with the AACR 2024 press release.

One scientific question follows from this: HT29 carries BRAF V600E (established cell line biology, ATCC HTB-38, CCLE, COSMIC). BreAK CRC-001 requires BRAF wild-type status at enrollment. This means the vaccine contains antigens derived from a BRAF V600E cell line, while enrolled patients will have BRAF WT tumors.

We raise this not as a concern but as an open question. The haptenization mechanism is designed to expose shared tumor antigens — stress-response proteins (HSPs, calreticulin, HMGB1), damage-associated molecular patterns, and broadly expressed tumor-associated antigens — that are not mutation-specific. If the dominant immunogenic payload is stress-response antigens rather than BRAF V600E-specific neoantigens, the mismatch may be clinically irrelevant. The AACR 2024 press release mentions multi-omics analysis of STC-1010 batches confirming batch-to-batch reproducibility — this data package presumably includes antigen characterization per cell line.

The question we would want answered: What fraction of the immunogenic antigen payload derived from HT29 is shared with BRAF WT patient tumor proteomes? Is there antigen overlap data comparing HT29-derived antigens vs HCT116/LoVo-derived antigens? This is the kind of question that is straightforward to answer from existing internal data and that would materially strengthen the scientific rationale for the BRAF WT eligibility criterion.

---

## 5. What Phase IIa Needs to Be Able to Show

The Phase IIa primary endpoint is PFS rate at 12 months in MSS mCRC patients (Arm 2A-1). For this endpoint to be interpretable — not just statistically significant, but interpretable in the context of the field — the trial needs to be able to answer three questions:

**Question 1: Did the immune mechanism engage?**  
This requires quantitative DTH response data, CD8+ TIL counts from biopsies (where available), and cytokine profiles. The AACR 2026 CT051 press release reports DTH responses in all 6 Phase Ia patients — this is the right readout. The question is whether it will be captured with sufficient granularity and in sufficient patients to support a mechanistic claim.

**Question 2: In which patients did it engage?**  
This requires liver-met status, bevacizumab use, and molecular biomarker data (ctDNA, pTMB if collected) as pre-specified covariates. Without these, a positive PFS signal cannot be attributed to a specific patient subgroup, and a negative signal cannot be explained.

**Question 3: Is the signal durable?**  
The RIN NLM data (3-year PFS 19.3%, three patients disease-free >18 months after treatment completion) establishes that durable remissions are possible in MSS mCRC with IO. The Phase IIa design should include OS as a secondary endpoint with sufficient follow-up to capture durability signals, not just 12-month PFS rate.

---

## 6. Where CrisPRO Adds Value

CrisPRO is a platform for translating early clinical and translational data into a credible enrichment and analysis strategy. In the context of BreAK CRC-001, the specific areas where we believe we can be useful are:

**Biomarker framework design:** Defining the pre-specified biomarker panel, response thresholds, and subgroup analysis plan for Phase IIa before enrollment locks in. This includes liver-met stratification, ctDNA platform selection and threshold pre-specification, bevacizumab covariate capture, and biopsy biomarker panel specification.

**Enrichment hypothesis testing:** Using the existing Phase Ia data (n=6, DTH responses, 100% DCR) to generate a prospective enrichment hypothesis for Phase IIa. The GRANITE ctDNA-low signal (HR 0.50) and the BOT/BAL no-liver-met signal (ORR 17–19%) provide the field context. The Phase Ia immune data provides the STC-1010-specific signal. Combining these into a pre-specified Phase IIa enrichment strategy is the core analytical problem.

**Translational data interpretation:** The EACR 2025 3D spheroid data (HCT116, HT29, SW620, LoVo co-aggregated with CCD-18Co fibroblasts; CD8+ T-cell killing; IFN-γ production) and the AACR 2024 multi-omics batch consistency data represent a substantial preclinical evidence base. Connecting this to the Phase Ia immune engagement data and the Phase IIa biomarker plan is the translational bridge that makes the program credible to a regulatory and partnering audience.

**Comparator positioning:** The failure landscape analysis above is the foundation for positioning STC-1010 against the field. The key claim — that STC-1010 addresses the priming-without-trafficking failure mode that killed QUILT-2.004 — requires mechanistic data to support it. The DTH readout is the right pharmacodynamic endpoint. The question is whether the Phase IIa design captures it with sufficient rigor to make the claim.

---

## 7. Prioritized Data Requests

The following data requests are prioritized by urgency. The first three are relevant to Phase IIa design decisions that may require protocol amendments.

| Priority | Request | Scientific Rationale | Protocol Amendment Required? |
|----------|---------|---------------------|------------------------------|
| 1 | Antigen overlap data: HT29-derived antigens (BRAF V600E) vs HCT116/LoVo antigens (BRAF WT) vs patient tumor proteomes | Resolves the open scientific question on antigen mismatch | No — internal data request |
| 1 | CT051 full poster data: quantitative DTH values, per-patient RECIST, immune biomarker data, translational correlation | Required for any external scientific communication | No — internal data request |
| 1 | Liver met stratification plan: is liver-met status captured as a stratification variable or pre-specified covariate in Phase IIa? | BOT/BAL and RIN establish liver-met status as the primary patient selection variable in MSS mCRC IO | Potentially yes — if not currently captured |
| 2 | ctDNA platform and threshold specification: is ctDNA included in the molecular biomarker panel? What platform? What threshold? | GRANITE GO-010 failure demonstrates that undefined ctDNA endpoints cannot generate interpretable evidence | No — exploratory endpoint |
| 2 | Bevacizumab stratification plan: is bevacizumab use captured as a stratification variable or pre-specified covariate? | Bevacizumab immunomodulatory effects will confound immune biomarker interpretation if not controlled | Potentially yes — if not currently stratified |
| 2 | KRAS subtype and SMAD4 capture: are these captured in the eCRF? | KRAS G12C is now targetable; SMAD4 loss is associated with liver-met tropism and IO resistance | No — exploratory biomarker |
| 3 | Full multi-omics antigen characterization package (proteomics per cell line, batch reproducibility data) | Strengthens scientific rationale and supports regulatory filing | No — internal data request |

---

## 8. Evidence Base and Source Integrity

All claims in this brief are sourced from peer-reviewed publications, primary registry records, or conference abstracts. Press-release-only data is explicitly labeled. The following source hierarchy applies throughout:

- **PEER-REVIEWED:** CheckMate 9X8 (PMID 38485190), QUILT-2.004 (PMID 35274710), BOT/BAL Phase 1 (PMID 38871975), AtezoTRIBE liver-met analysis (PMID 39908699), CO.26 pTMB analysis (PMID 38727700), RIN updated survival (PMID 39504677), REGONIVO multiomic (PMID 38336371)
- **CONFERENCE ABSTRACT:** ASCO 2023 e14661 (STC-1010 cell lines, Alzeeb et al.), EACR 2025 EACR25-1044 (STC-1010 3D spheroids, Zbinden et al.)
- **PRESS RELEASE ONLY — use with explicit caveat:** GRANITE GO-010 HR values (company, bankrupt), AACR 2026 CT051 first-in-human data (CheckOrphan summary)
- **PRIMARY REGISTRY:** NCT06934538 (ClinicalTrials.gov API v2)

One source integrity note: the pTMB ≥28 mut/Mb finding (HR 0.34, Pint=0.070) is from CO.26 (PMID 38727700), not MEDITREME. These are separate trials. The threshold is data-driven, GuardantOMNI-specific, and derived from a refractory (≥2L) population. It is a hypothesis-generating finding, not a validated biomarker.

---

*This brief was prepared by CrisPRO / Phylo as part of the BreAK CRC-001 design intelligence engagement. It is intended for scientific discussion with the Brenus Pharma team and does not constitute regulatory or clinical advice.*
