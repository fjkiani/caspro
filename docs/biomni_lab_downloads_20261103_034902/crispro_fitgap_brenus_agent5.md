# CrisPRO Fit-Gap Architecture Map: Brenus Pharma / STC-1010
**Prepared by Agent 5: CrisPRO Fit-Gap Architecture Mapper**
**Date:** April 2026
**Classification:** Internal — CrisPRO Commercial Team Use Only
**Evidence Base:** Agents 1–4 (Corporate Dossier, Trial Protocol, Comparator Trials, Biomarker Biology)

---

> **DOCUMENT PURPOSE:** This document is a diligence-grade internal assessment for the CrisPRO commercial team. It maps where CrisPRO's computational platform adds genuine, defensible value to the Brenus Pharma / STC-1010 program, where it cannot help, and what guardrails must govern any external engagement. Every claim is traceable to the four Agent evidence streams. No CrisPRO capabilities beyond those described in the mission brief are asserted.

---

## SECTION 1: USE-CASE SUMMARY

Brenus Pharma is a Lyon-based clinical-stage biotech (€30M raised; Phase I/IIa active as of April 2026) developing STC-1010, a haptenated allogeneic whole-cell cancer vaccine, for first-line unresectable locally advanced or metastatic colorectal cancer (mCRC) [VERIFIED — Agent 1]. The core scientific problem is one of the most intractable in oncology: making MSS/pMMR CRC — which constitutes ~95% of all mCRC and is structurally resistant to checkpoint immunotherapy — responsive to immune-based treatment. STC-1010 attempts to overcome this resistance by generating a broad polyclonal immune response against >200 tumor antigens via DNFB haptenation and immunogenic cell death (ICD), administered alongside low-dose cyclophosphamide, GM-CSF, and standard mFOLFOX6 ± bevacizumab [VERIFIED — Agent 1, Agent 2]. The program has produced encouraging early safety data (no DLTs, n=6, median follow-up 6 months) and a 100% disease control rate (DCR) by RECIST [PRELIMINARY — n=6 only; VERIFIED — Agent 1, Agent 2], but faces a fundamental challenge: the MSS CRC tumor microenvironment (TME) is a layered, redundant immunosuppressive architecture — TGF-β-driven T-cell exclusion, liver metastasis-induced systemic immune tolerance, KRAS-driven MDSC recruitment, and MHC-I downregulation — that has defeated every prior IO approach in unselected MSS CRC populations [PROVEN EFFICACY — Agent 3]. Brenus requires computational precision oncology support to (a) identify the patient subgroup within MSS CRC most likely to respond to STC-1010, (b) design a Phase IIa trial that can detect a real signal in that subgroup without being diluted by the non-responding majority, (c) model the mechanistic interactions between STC-1010 and its combination partners, and (d) build a biomarker-driven regulatory strategy before the program reaches a pivotal decision point.

---

## SECTION 2: FIT ANALYSIS — WHERE CRISPRO ADDS GENUINE VALUE

### 2.1 Biomarker Stratification Engine

**FIT LEVEL: HIGH**

**Specific application:** The single most urgent unmet need in the BreAK CRC-001 program is the absence of a validated predictive biomarker for STC-1010 response. Agent 4 identifies a five-biomarker composite hypothesis — absence of active liver metastases, low TGF-β exclusion signature, SMAD4 intact, intact MHC-I/TAP expression, and KRAS-WT or BRAF V600E MSS — as the theoretical "highest benefit subgroup" [MECHANISTIC HYPOTHESIS — Agent 4]. Agent 3 confirms that every prior MSS CRC IO trial that enrolled unselected patients failed, while subgroup analyses consistently show separable biology in immune-inflamed, non-liver-metastatic, pTMB-high patients [PROVEN EFFICACY in subgroup analyses — Agent 3]. CrisPRO's biomarker stratification engine would integrate the exploratory biomarker data already being collected in BreAK CRC-001 (cytokine profiles, immunophenotyping, PBMC markers, ctDNA, HLA expression, tumor necrosis, immune infiltration, TLS evolution [VERIFIED — Agent 2]) with the published MSS CRC biomarker literature to identify which combination of baseline features predicts DTH response, ctDNA clearance, and ultimately 12-month non-progression.

**Evidence anchor:** Agent 4 Section 5 (Priority Stratification Hypothesis) provides the mechanistic framework. Agent 3 Synthesis Memo Section 2 (Biomarker Subgroup Structures) provides the clinical validation landscape. Agent 2 Section 6.5 (Exploratory Endpoints) confirms the data streams available for analysis.

**Deliverable:** A ranked biomarker panel with clinical accessibility classification, a composite enrichment score for Phase IIa patient selection, and a pre-specified biomarker analysis plan for the Phase IIa protocol amendment.

**Timeline relevance:** NOW (Phase I) — the exploratory biomarker data from the first 6–21 patients is being collected now; analysis must begin immediately to inform Phase IIa design before enrollment opens.

---

### 2.2 TME Profiling

**FIT LEVEL: HIGH**

**Specific application:** The BreAK CRC-001 protocol collects mandatory tumor biopsies at baseline and on-treatment (where feasible) [VERIFIED — Agent 2], and the exploratory endpoint list includes immune infiltration, TLS evolution, tumor necrosis, and HLA expression [VERIFIED — Agent 2]. However, the protocol does not specify the assay platforms, does not pre-specify response thresholds, and does not include a pre-specified missing data imputation plan [NOT FOUND IN PUBLIC SOURCES — Agent 2]. CrisPRO's TME profiling capability would provide multi-omic characterization of the immune contexture from these biopsies — specifically mapping the six immunosuppressive layers identified in Agent 4: TGF-β exclusion signature, MDSC/SPP1+ macrophage burden, MHC-I/TAP status, KRAS-IRF2-CXCL3 axis activity, liver metastasis-associated Treg expansion, and VEGF-A/TOX-driven T-cell exhaustion [MECHANISTIC HYPOTHESIS — Agent 4]. This profiling would generate the first human TME data for STC-1010, which is currently entirely absent from the public record [VERIFIED — Agent 1 Section 6.2].

**Evidence anchor:** Agent 4 Domains 1–6 provide the mechanistic framework for what to measure. Agent 2 Section 7.1 (Dilution Risk Table) identifies MSS all-comer enrollment within the MSS arm as a HIGH dilution risk, addressable by retrospective stratification by Immunoscore or TLS density from mandatory biopsies. Agent 3 Tier 4 (AtezoTRIBE Immunoscore-IC subgroup) confirms that Immunoscore-IC high pMMR patients show PFS HR ~0.50 [PHARMACODYNAMIC ACTIVITY — Agent 3].

**Deliverable:** A standardized TME profiling panel (IHC + RNA-seq + flow cytometry) for BreAK CRC-001 biopsies; a pre-specified analysis plan linking TME features to clinical endpoints; a TME atlas comparing STC-1010-treated patients to historical MSS CRC IO trial biopsies.

**Timeline relevance:** NOW (Phase I) — biopsy collection is ongoing; assay platform decisions must be made before samples are processed.

---

### 2.3 Combination Therapy Optimization

**FIT LEVEL: MEDIUM**

**Specific application:** STC-1010 is administered in a four-component regimen: STC-1010 + cyclophosphamide + GM-CSF + mFOLFOX6 ± bevacizumab [VERIFIED — Agent 1, Agent 2]. Agent 2 identifies three HIGH-magnitude dilution risks related to combination timing: (1) backbone chemotherapy immunosuppression timing — mFOLFOX6 causes lymphopenic nadir at days 7–10, and if STC-1010 is administered during this window, vaccine-driven T-cell priming will be severely impaired; (2) bevacizumab scheduling vs. the vascular normalization window — peak CD8 infiltration occurs at cycle 2 (~days 14–28), and vaccine timing should coincide with this window; (3) VEGF-A/NRP-1/M2 macrophage axis — the optional nature of bevacizumab creates heterogeneity in this immunosuppressive axis [ANALYTICAL INTERPRETATION — Agent 2]. CrisPRO's combination therapy optimization module would model the pharmacodynamic interactions between these four components, identify the optimal sequencing and timing, and generate testable hypotheses for protocol amendment.

**Evidence anchor:** Agent 2 Section 7.2 (Bevacizumab Scheduling Risk) and Section 7.1 (Dilution Risk Table, Priority 1 and 2). Agent 4 Domain 3 (TGF-β) and Domain 6 (Myeloid Suppression) provide the mechanistic basis for cyclophosphamide and bevacizumab interactions. Agent 3 Synthesis Memo Section 4 (Combination Strategies) identifies TKI + PD-1/PD-L1 in non-liver-metastatic MSS CRC as the highest-promise combination [PHARMACODYNAMIC ACTIVITY — Agent 3].

**Deliverable:** A pharmacodynamic interaction model for the STC-1010 four-component regimen; a recommended vaccination timing window relative to mFOLFOX6 cycles and bevacizumab; a sensitivity analysis of bevacizumab use (yes/no) on predicted vaccine efficacy.

**Timeline relevance:** NOW (Phase I) — timing decisions affect current patients; SOON (Phase IIa design) — protocol amendment opportunity.

**Limitation:** CrisPRO's modeling will be constrained by the absence of published clinical dose data for STC-1010, cyclophosphamide, and GM-CSF in this regimen [NOT FOUND IN PUBLIC SOURCES — Agent 2]. Modeling will rely on preclinical data (Alzeeb et al. 2024) and published analogues from other vaccine trials.

---

### 2.4 Trial Design Intelligence

**FIT LEVEL: HIGH**

**Specific application:** The BreAK CRC-001 Phase IIa design has three critical structural weaknesses identified by Agent 2: (1) single-arm design without a randomized control — the 12-month PFS rate primary endpoint will be compared against historical benchmarks, which are subject to selection bias and temporal confounding; (2) no pre-specified historical control benchmark for the Phase IIa primary endpoint; (3) no adaptive enrichment mechanism to concentrate enrollment in the responding subgroup [ANALYTICAL INTERPRETATION — Agent 2]. Agent 3 confirms that every single-arm MSS CRC IO trial has failed to demonstrate benefit attributable to the IO component, because the SOC chemotherapy response rate (~80–90% DCR, ~50–55% 12-month PFS) is high enough to mask any vaccine contribution [PROVEN EFFICACY — Agent 3]. CrisPRO's trial design intelligence would provide: adaptive enrichment design options for Phase IIa; power calculations for biomarker-enriched subgroup analyses; endpoint selection guidance (ctDNA clearance as early pharmacodynamic co-primary endpoint, per GRANITE low-ctDNA subgroup signal [PHARMACODYNAMIC ACTIVITY — Agent 3]); and a Bayesian adaptive design framework that allows early go/no-go decisions based on biomarker-defined subgroups.

**Evidence anchor:** Agent 2 Section 6.2 (Phase IIa Primary Endpoint) and Section 7.4 (Summary Risk Prioritization, Priority 4: Single-arm design). Agent 3 Synthesis Memo Section 5 (Well-Designed MSS CRC IO Trial) provides the design template. Agent 3 Tier 3 (GRANITE phase II) confirms that primary endpoint failure in an unselected MSS CRC population is the expected outcome without biomarker enrichment [PROVEN EFFICACY — Agent 3].

**Deliverable:** A Phase IIa protocol amendment proposal with adaptive enrichment design; power calculations for the biomarker-enriched primary analysis; a ctDNA-based early stopping rule; a historical control benchmark analysis using individual patient data from published 1L MSS mCRC trials.

**Timeline relevance:** SOON (Phase IIa design) — Phase IIa design decisions must be made before Phase I completes (~Q2 2026 per company guidance [VERIFIED — Agent 1]).

---

### 2.5 Resistance Mechanism Mapping

**FIT LEVEL: MEDIUM**

**Specific application:** The BreAK CRC-001 protocol collects on-treatment and progression biopsies [VERIFIED — Agent 2], creating an opportunity to map acquired resistance mechanisms as patients progress. Agent 4 identifies seven key resistance mechanisms relevant to STC-1010: TGF-β-mediated CXCR3 suppression preventing T-cell trafficking [MECHANISTIC HYPOTHESIS — Agent 4]; TAP1/TAP2 downregulation preventing MHC-I peptide loading [MECHANISTIC HYPOTHESIS — Agent 4]; KRAS-IRF2-CXCL3-driven MDSC recruitment [MECHANISTIC HYPOTHESIS — Agent 4]; SPP1+ macrophage ecosystem formation [MECHANISTIC HYPOTHESIS — Agent 4]; liver metastasis-induced systemic T-cell siphoning [VALIDATED CLINICAL OBSERVATION — Agent 4]; VEGF-A/TOX-driven T-cell exhaustion [MECHANISTIC HYPOTHESIS — Agent 4]; and antigen loss/downregulation (not yet characterized for STC-1010's antigen target panel). CrisPRO's resistance mechanism mapping would systematically characterize which of these mechanisms is operative at progression in each patient, generating a resistance taxonomy that informs next-line combination strategies.

**Evidence anchor:** Agent 4 Appendix (Key Unknowns) identifies seven critical unknowns about STC-1010's mechanism, all of which are addressable through resistance biopsy analysis. Agent 3 Tier 1 (CheckMate 142 MSS cohort) confirms that MSS CRC resistance to PD-1 blockade is mechanistically distinct from MSI-H resistance [PROVEN EFFICACY — Agent 3].

**Deliverable:** A resistance mechanism taxonomy for STC-1010-treated MSS CRC patients; a panel of resistance biomarkers for on-treatment and progression biopsies; a computational model linking baseline TME features to specific resistance mechanisms at progression.

**Timeline relevance:** SOON (Phase IIa design) — resistance biopsy protocol must be specified before Phase IIa opens; LATER (Phase III) — resistance taxonomy informs combination strategy for Phase III.

**Limitation:** Resistance mechanism mapping requires paired baseline/progression biopsies. The BreAK CRC-001 protocol makes on-treatment biopsies conditional ("only if not representing unacceptable clinical risk") [VERIFIED — Agent 2], which will limit the dataset. CrisPRO cannot generate resistance data that Brenus does not collect.

---

### 2.6 Regulatory Intelligence

**FIT LEVEL: MEDIUM**

**Specific application:** Brenus has no validated predictive biomarker for STC-1010 [VERIFIED — Agent 1 Section 6.2]. Without a companion diagnostic (CDx) strategy, the program faces a regulatory pathway that is increasingly difficult for IO agents in unselected populations — the FDA and EMA have both signaled that biomarker-unselected IO approvals in CRC are unlikely given the accumulated negative trial data [MECHANISTIC PLAUSIBILITY — Agent 3 context]. CrisPRO's regulatory intelligence module would map the FDA/EMA biomarker qualification pathway for the most promising candidate biomarkers (absence of liver metastases, Immunoscore-IC, TGF-β exclusion signature), identify the evidentiary standard required for CDx co-development, and design the biomarker qualification strategy for Phase IIa/III.

**Evidence anchor:** Agent 4 Section 4 (Biomarker Accessibility Classification) identifies which candidate biomarkers are clinically accessible now (liver metastasis status, SMAD4 IHC, KRAS/BRAF NGS) vs. research-only (TGF-β exclusion signature, TAP expression, MDSC frequency). Agent 3 Tier 4 (CCTG CO.26 pTMB subgroup) provides the strongest existing biomarker signal in MSS CRC IO [PHARMACODYNAMIC ACTIVITY + clinical signal — Agent 3].

**Deliverable:** A biomarker qualification roadmap for the top 3 candidate biomarkers; a CDx co-development strategy for Phase IIa/III; a regulatory risk assessment for the current single-arm Phase IIa design.

**Timeline relevance:** SOON (Phase IIa design) — biomarker qualification strategy must be embedded in Phase IIa protocol; LATER (Phase III) — CDx submission timeline.

**Limitation:** CrisPRO cannot substitute for regulatory counsel or direct FDA/EMA engagement. The regulatory intelligence module provides strategic framing, not legal or regulatory filing services.

---

## SECTION 3: GAP ANALYSIS — WHERE CRISPRO CANNOT HELP (OR HELP ALONE)

### Gap 1: Human Cell Line Identity (Undisclosed IP)

⚠️ **[REWRITTEN — PhD Verification Agent 2026-04-28. Prior version contained errors corrected by C-005. See Verified Claim Ledger v1.0 Section E, Contradiction C-005.]**

**Gap description:** The specific human CRC cell lines used in the clinical STC-1010 product have not been confirmed in any retrieved peer-reviewed source. The only published preclinical paper (Alzeeb et al. 2024, Frontiers Oncology, DOI 10.3389/fonc.2024.1427428) uses **exclusively murine cell lines**: CT26 (BALB/c colon tumor, ATCC CRL-2639), CMT-93 (rectal carcinoma, ECACC 89111413), LTPA (pancreatic adenocarcinoma, ATCC CRL-2389), and MC38 (Kerafast). No human cell lines appear in this paper. The Brenus company website states that the clinical product uses "well-characterized allogeneic human cell lines" but does not name them [COMPANY_CLAIM — Brenus website only]. The specific human line identity (previously attributed in prior agent canon to HCT116, HT29, and LoVo) is **PROVISIONAL/BLOCKED** — those attributions require confirmation from ASCO 2023 abstract e14661 or equivalent primary source, which was not successfully retrieved in the PhD verification session (paywall/resolver failure). **Prior agent canon language stating that human lines were "never publicly disclosed" was partially correct in outcome but incorrect in framing — the Alzeeb 2024 paper uses murine lines, not undisclosed human lines.**

**Critically, the authors of Alzeeb et al. 2024 themselves state:** *"Although the results in mouse models are promising, predicting efficacy in patients requires exploration in different models due to the use of a murine surrogate in syngeneic models. Human vaccines based on STC technology should be tested in alternative models, such as ex vivo immune response activation tests, to better assess biological and clinical responses."* This caveat must be preserved in any scientific summary.

**Why CrisPRO cannot close it:** CrisPRO's biomarker stratification and TME profiling capabilities require knowledge of which antigens STC-1010 presents to the immune system. Without knowing the human cell line identity, CrisPRO cannot model antigen coverage, predict HLA-peptide binding, or assess whether the vaccine's antigen repertoire matches the patient's tumor antigen landscape. The company claims >200 tumor antigens [COMPANY_CLAIM — Brenus website only; not confirmed in any peer-reviewed source], but without cell line identity, independent validation is impossible.

**What IS needed:** (1) Retrieval of ASCO 2023 abstract e14661 to confirm or deny HCT116/HT29/LoVo attribution; (2) Brenus disclosure of human cell line identity under NDA/CDA to enable computational antigen mapping; (3) alternatively, Brenus must provide the mass spectrometry antigen dataset directly to CrisPRO for analysis.

**Risk to Brenus:** Without antigen characterization, the program cannot develop a mechanistic rationale for patient selection based on tumor antigen expression, cannot design a CDx strategy, and cannot respond to regulatory questions about the biological basis for efficacy in specific patient subgroups. Additionally, if any of the human cell lines carry BRAF V600E (e.g., HT29), this would create a scientific inconsistency with the trial's BRAF wild-type eligibility requirement (Exclusion Criterion #7 of NCT06934538).

---

### Gap 2: Attribution Problem (STC-1010 vs. FOLFOX Contribution to 100% DCR)

**Gap description:** The 100% DCR reported at AACR 2026 (n=6, median follow-up 6 months) [PRELIMINARY — n=6 only; VERIFIED — Agent 1] cannot be attributed to STC-1010. mFOLFOX6 ± bevacizumab alone achieves ~80–90% DCR in first-line mCRC [PROVEN EFFICACY — Agent 3]. With n=6 and no control arm, the 100% DCR is statistically indistinguishable from SOC effect.

**Why CrisPRO cannot close it:** This is a fundamental clinical trial design problem, not a computational problem. No amount of modeling can separate STC-1010's contribution from FOLFOX's contribution in a single-arm trial with n=6. CrisPRO can model what the expected DCR would be with FOLFOX alone (using historical data), but this does not constitute causal attribution.

**What IS needed:** A randomized control arm — either a concurrent registry control or a randomized Phase IIa design — is the only way to establish causal attribution. Alternatively, a pharmacodynamic endpoint (e.g., DTH response magnitude, ctDNA clearance rate, neoantigen-specific T-cell expansion) that is mechanistically linked to STC-1010 and not to FOLFOX could serve as a surrogate for vaccine-specific activity.

**Risk to Brenus:** If Phase IIa is also single-arm and the 12-month PFS rate is consistent with historical FOLFOX benchmarks, the program will face a "no added value" regulatory conclusion. The GRANITE phase II trial (neoantigen vaccine + checkpoint blockade + maintenance chemo) failed its primary endpoint in an unselected MSS CRC population [PROVEN EFFICACY — Agent 3] — a cautionary precedent for single-arm designs without biomarker enrichment.

---

### Gap 3: n=6 Data Limitation

**Gap description:** All clinical efficacy data for STC-1010 as of April 2026 derives from 6 patients with a median follow-up of 6 months [PRELIMINARY — n=6 only; SOURCE: Brenus PR Jan 2026 (BusinessWire); single-source chain through Agent 1 and Agent 2 — not independently verified ⚠️ [CLARIFIED 2026-04-29]]. No peer-reviewed clinical publication exists. All data is from press releases only [VERIFIED — Agent 1 Section 6.2].

**Why CrisPRO cannot close it:** CrisPRO's computational capabilities require input data. With n=6, there is insufficient statistical power for any biomarker analysis, subgroup analysis, or predictive modeling. The exploratory biomarker data (cytokine profiles, immunophenotyping, PBMC markers, ctDNA, HLA expression, TLS evolution) from these 6 patients may generate hypotheses but cannot validate them.

**What IS needed:** Enrollment of the full Phase I cohort (21–33 patients per protocol [VERIFIED — Agent 2]) with complete exploratory biomarker data. The Phase Ia complete safety data and exploratory efficacy across dose cohorts was expected Q2 2026 [VERIFIED — Agent 1] — this dataset will be the first meaningful input for CrisPRO analysis.

**Risk to Brenus:** Premature claims about efficacy based on n=6 data (e.g., the CEO's statement that trends are "stronger than anything previously reported in hard-to-treat solid tumors" [VERIFIED — Agent 1]) create credibility risk with sophisticated investors, partners, and regulators who will apply the same scrutiny as this analysis.

---

### Gap 4: Liver Metastasis Prevalence in Enrolled Patients

**Gap description:** The BreAK CRC-001 protocol does not specify liver metastasis burden limits, does not stratify by liver metastasis status, and does not track liver metastasis as a covariate in efficacy analyses [NOT FOUND IN PUBLIC SOURCES — Agent 2]. Agent 3 and Agent 4 both identify active liver metastases as the single strongest predictor of IO failure in MSS CRC — with near-zero response rates in liver-metastatic patients across REGONIVO, RIN, and CO.26 [PROVEN EFFICACY in subgroup analyses — Agent 3]. Approximately 50–70% of mCRC patients have liver metastases [VALIDATED CLINICAL OBSERVATION — Agent 4].

**Why CrisPRO cannot close it:** CrisPRO cannot retroactively add liver metastasis stratification to a trial that did not collect this data systematically. If the n=6 patients include a high proportion of liver-metastatic patients, the 100% DCR may reflect FOLFOX activity in a population where STC-1010 has no immunological activity.

**What IS needed:** Immediate protocol amendment to (a) record liver metastasis status (number, % liver involvement, presence of extrahepatic disease) for all enrolled patients; (b) add liver metastasis burden as a stratification factor in Phase IIa; (c) pre-specify a subgroup analysis for non-liver-metastatic vs. liver-metastatic patients. Locoregional liver-directed therapies (SBRT, ablation) before STC-1010 initiation may be a strategy worth exploring in a protocol amendment [MECHANISTIC HYPOTHESIS — Agent 4].

**Risk to Brenus:** If Phase IIa enrolls predominantly liver-metastatic patients (the majority of mCRC), the trial will almost certainly fail to show a vaccine-attributable benefit, regardless of STC-1010's true activity in the non-liver-metastatic subgroup.

---

### Gap 5: Absence of Validated Predictive Biomarker

**Gap description:** No validated predictive biomarker for STC-1010 response exists. The trial collects exploratory biomarkers but has no pre-specified biomarker response thresholds and no pre-specified predictive biomarker analysis plan [NOT FOUND IN PUBLIC SOURCES — Agent 2]. Agent 4 provides a five-biomarker composite hypothesis [MECHANISTIC HYPOTHESIS — Agent 4], but this is entirely unvalidated in clinical data.

**Why CrisPRO cannot close it alone:** CrisPRO can generate biomarker hypotheses and analysis plans, but cannot validate them without clinical data. Validation requires prospective testing in a biomarker-enriched cohort — which requires Brenus to collect the right data, in the right patients, with the right assays. CrisPRO is a hypothesis-generation and analysis platform, not a substitute for clinical validation.

**What IS needed:** (1) A pre-specified biomarker analysis plan embedded in the Phase IIa protocol; (2) standardized assay platforms for the candidate biomarkers; (3) a prospective biomarker-enriched cohort in Phase IIa (or a biomarker-stratified randomized design); (4) sufficient sample size to power biomarker subgroup analyses.

**Risk to Brenus:** Without a validated predictive biomarker, the program cannot obtain a biomarker-driven regulatory approval, cannot design a Phase III trial with a defined patient population, and cannot differentiate STC-1010 from the long list of IO agents that have failed in unselected MSS CRC.

---

### Gap 6: Manufacturing/CMC Scalability

**Gap description:** Brenus claims "100 patients treatable per batch" and a "standardized, ready-to-use production process" [VERIFIED — Agent 1], but no independent manufacturing validation, CMC data, or batch-to-batch consistency data beyond preclinical multi-omics analysis has been publicly disclosed [VERIFIED — Agent 1 Section 6.1]. The human cell line identity is undisclosed, making independent CMC assessment impossible.

**Why CrisPRO cannot close it:** Manufacturing and CMC scalability is a wet-lab, regulatory, and engineering problem. CrisPRO has no capability in this domain. This is entirely outside the scope of computational precision oncology.

**What IS needed:** Independent CMC audit; GMP manufacturing validation; batch-to-batch consistency data for the human product (not just the preclinical murine product); regulatory CMC package for FDA/EMA review.

**Risk to Brenus:** If the "100 patients per batch" claim cannot be validated at commercial scale, the off-the-shelf positioning of STC-1010 — a key commercial differentiator — collapses. This is a critical diligence item for any partnership or licensing discussion.

---

### Gap 7: Absence of Peer-Reviewed Clinical Data

**Gap description:** As of April 2026, all clinical data for STC-1010 is from press releases only. No peer-reviewed clinical publication exists [VERIFIED — Agent 1 Section 6.2]. The AACR 2026 poster (CT051) has not been published in a peer-reviewed journal.

**Why CrisPRO cannot close it:** CrisPRO cannot peer-review or independently validate data that has not been published. The absence of peer-reviewed data means that the quality, completeness, and accuracy of the reported clinical findings cannot be independently assessed.

**What IS needed:** Submission of the Phase Ia safety and exploratory efficacy data to a peer-reviewed journal (e.g., Journal of Clinical Oncology, Nature Medicine, Lancet Oncology) as soon as the Phase Ia dataset is complete (expected Q2 2026 [VERIFIED — Agent 1]).

**Risk to Brenus:** Sophisticated partners, investors, and regulators will discount press-release-only data. The credibility gap between the CEO's superlative claims ("stronger than anything previously reported") and the absence of peer-reviewed evidence is a reputational risk that could undermine partnership discussions.

---

### Gap 8: KRAS Mutation Subtype Heterogeneity (Additional Gap Identified)

**Gap description:** The BreAK CRC-001 protocol requires KRAS-mutated disease but does not specify which KRAS mutation subtypes are required or excluded [NOT FOUND IN PUBLIC SOURCES — Agent 2]. Agent 4 identifies that KRAS G12D (~29% of KRAS-mutant CRC) drives the most potent MDSC recruitment via the KRAS-IRF2-CXCL3-CXCR2 axis [MECHANISTIC HYPOTHESIS — Agent 4], while KRAS G12C (~6%) is now targetable by sotorasib/adagrasib, meaning these patients may increasingly opt for KRAS G12C inhibitor combinations rather than STC-1010.

**Why CrisPRO cannot close it:** CrisPRO can model the expected immune microenvironment by KRAS subtype and generate subgroup analysis plans, but cannot retroactively collect KRAS subtype data that was not recorded, and cannot prevent KRAS G12C patients from choosing alternative therapies.

**What IS needed:** Protocol amendment to record KRAS mutation subtype (G12C, G12D, G12V, G13D, etc.) for all enrolled patients; pre-specified subgroup analysis by KRAS subtype; competitive enrollment strategy for KRAS G12C patients.

**Risk to Brenus:** If the trial enrolls predominantly KRAS G12D patients (the most immunosuppressive subtype), the vaccine signal may be further diluted. Conversely, if KRAS G12C patients are underrepresented due to competing therapies, the trial population may not reflect the intended target population.

---

## SECTION 4: PRIORITY ENGAGEMENT MATRIX

| Rank | Engagement Opportunity | Scientific Urgency | CrisPRO Differentiation | Brenus Readiness | Combined Priority |
|------|----------------------|-------------------|------------------------|-----------------|-------------------|
| 1 | **Phase IIa Adaptive Enrichment Design** — Redesign Phase IIa with biomarker-driven adaptive enrichment, pre-specified historical control benchmark, and ctDNA co-primary endpoint | **HIGH** — Phase Ia data expected Q2 2026; Phase IIa design decisions imminent; without redesign, trial will almost certainly fail in unselected MSS CRC (GRANITE precedent) | **HIGH** — Adaptive enrichment design for biomarker-defined subgroups in IO is a core CrisPRO differentiator; no off-the-shelf solution exists | **MEDIUM** — Brenus has the trial infrastructure and SAB expertise (Ghiringhelli, Eggermont) but may lack the computational biostatistics capacity for adaptive design | **HIGH** |
| 2 | **Liver Metastasis Stratification & Non-Liver-Metastatic Subgroup Analysis** — Immediate analysis of liver metastasis status in enrolled patients; protocol amendment for Phase IIa stratification | **HIGH** — Liver metastasis is the single strongest predictor of IO failure in MSS CRC; if not addressed before Phase IIa, the trial will enroll the wrong patients | **HIGH** — CrisPRO can integrate the published liver metastasis IO resistance literature (Yu et al. 2021, REGONIVO, RIN) into a quantitative enrichment model | **HIGH** — Liver metastasis status is standard staging data (CT/MRI); Brenus already has this for enrolled patients | **HIGH** |
| 3 | **Exploratory Biomarker Analysis Plan for Phase I Data** — Standardize assay platforms, pre-specify response thresholds, and generate a biomarker hypothesis from Phase I data | **HIGH** — Phase I exploratory data is being collected now; without a pre-specified analysis plan, the data will be analyzed post-hoc and will not be credible to regulators | **HIGH** — CrisPRO's biomarker stratification engine is purpose-built for this analysis; integration of multi-omic data streams (cytokines, immunophenotyping, ctDNA, TLS) is a core capability | **MEDIUM** — Brenus is collecting the data but has not disclosed the assay platforms or analysis plan; engagement requires NDA/CDA | **HIGH** |
| 4 | **Combination Timing Optimization** — Model optimal STC-1010 timing relative to mFOLFOX6 cycles and bevacizumab to avoid lymphopenic nadir and exploit vascular normalization window | **MEDIUM** — Timing decisions affect current patients but can be addressed through protocol amendment; less urgent than Phase IIa design | **MEDIUM** — CrisPRO can model pharmacodynamic interactions, but the absence of published clinical dose data for STC-1010 limits model precision | **MEDIUM** — Brenus has the preclinical data (Alzeeb et al. 2024) and is collecting clinical PK/PD data; engagement requires data sharing | **MEDIUM** |
| 5 | **Regulatory Biomarker Qualification Roadmap** — Map FDA/EMA biomarker qualification pathway for top 3 candidate biomarkers (liver metastasis status, Immunoscore-IC, TGF-β exclusion signature) | **MEDIUM** — Regulatory strategy is needed before Phase III, not immediately; but early engagement with FDA on biomarker qualification is advisable | **MEDIUM** — CrisPRO's regulatory intelligence is a differentiator, but Brenus will also need regulatory counsel; CrisPRO provides the scientific framework, not the regulatory filing | **LOW** — Brenus does not yet have validated biomarker data to submit for qualification; premature engagement with FDA is not advisable | **MEDIUM** |

---

## SECTION 5: CRITICAL GUARDRAILS FOR ENGAGEMENT

### Guardrail 1: Do Not Present 100% DCR as Evidence of Vaccine Efficacy

**Prohibited claim/framing:** "STC-1010 achieves 100% disease control rate in MSS CRC" or "STC-1010 demonstrates efficacy in first-line mCRC."

**Why it is prohibited:** The 100% DCR is from n=6 patients with median follow-up of 6 months, with no control arm [PRELIMINARY — n=6 only; VERIFIED — Agent 1, Agent 2]. mFOLFOX6 ± bevacizumab alone achieves ~80–90% DCR in first-line mCRC [PROVEN EFFICACY — Agent 3]. With n=6 and no control arm, the 100% DCR cannot be statistically distinguished from SOC effect. This is explicitly flagged as a guardrail in Agent 2 Section 8.

**Accurate alternative framing:** "STC-1010 has demonstrated a favorable safety profile with no dose-limiting toxicities in 6 patients [PRELIMINARY — n=6 only]. A 100% disease control rate was observed, consistent with the expected activity of the mFOLFOX6 backbone; the contribution of STC-1010 to this rate cannot be determined from the current single-arm data. DTH responses suggest immune activation, which requires validation in larger cohorts."

---

### Guardrail 2: Do Not Claim STC-1010 Has "Broken" MSS CRC IO Resistance

**Prohibited claim/framing:** "STC-1010 overcomes the immunosuppressive MSS CRC microenvironment" or "STC-1010 is the first IO agent to show activity in MSS CRC."

**Why it is prohibited:** No clinical evidence supports this claim. The DTH responses observed are a surrogate marker of peripheral immune activation, not evidence of tumor-directed immunity or TME reprogramming [VERIFIED — Agent 1, Agent 2]. The entire history of MSS CRC IO (CheckMate 142 MSS cohort ORR 0%, GVAX + pembrolizumab ORR 0%, AdCEA + avelumab PFS HR 1.061 (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility ⚠️ [CORRECTED 2026-04-29], CheckMate 9X8 nivolumab+mFOLFOX6+bev HR 0.81 p=0.30 — primary endpoint not met ⚠️ [ADDED 2026-04-29 — Weaponization Agent EQ-01]) demonstrates that peripheral immune activation consistently fails to translate to clinical benefit [PROVEN EFFICACY — Agent 3].

**Accurate alternative framing:** "STC-1010 generates peripheral immune activation (DTH responses) in MSS CRC patients, which is a necessary but not sufficient condition for clinical benefit. Whether this immune activation translates to tumor-directed immunity and clinical benefit in the MSS CRC TME — which has defeated every prior IO approach in unselected populations — remains to be demonstrated in larger, biomarker-stratified cohorts."

---

### Guardrail 3: Do Not Extrapolate Murine Preclinical Data to Human Efficacy

**Prohibited claim/framing:** "STC-1010 extends survival by 40% in CRC" (without specifying murine model) or presenting the CT26 syngeneic model data as predictive of human outcomes.

**Why it is prohibited:** The 40% survival extension is from a murine CT26 syngeneic model [VERIFIED — Agent 1]. The CT26 model is MSS but has a much higher mutational burden than human MSS CRC and does not recapitulate the human MSS CRC TME (particularly liver metastasis-induced immune tolerance, TGF-β-driven exclusion, and KRAS-IRF2-MDSC axis) [MECHANISTIC HYPOTHESIS — Agent 4]. The IMblaze370 trial is the paradigmatic example of a mechanistically rational preclinical hypothesis (MEK inhibition) that failed completely in human MSS CRC [PROVEN EFFICACY — Agent 3].

**Accurate alternative framing:** "In murine syngeneic CRC models, the STC platform extends survival by 40% and induces coordinated CD4+/CD8+ T cell and humoral responses [VERIFIED — Agent 1]. These preclinical findings provide mechanistic rationale for the clinical program, but the translation from murine models to human MSS CRC is uncertain given the known limitations of murine models in recapitulating the human MSS CRC TME."

---

### Guardrail 4: Do Not Claim Antigen Breadth as a Validated Efficacy Advantage

**Prohibited claim/framing:** "STC-1010's broad antigen coverage of >200 tumor antigens ensures comprehensive immune targeting" or presenting antigen breadth as a validated predictor of clinical benefit.

**Why it is prohibited:** The >200 antigen claim is from company press releases and the Brenus website and has not been independently validated [COMPANY_CLAIM — ⚠️ CORRECTED from prior [VERIFIED] tag — PhD Verification Agent 2026-04-28]. More critically, antigen breadth is not the limiting factor in MSS CRC IO — the bottleneck is T-cell trafficking and effector function within the TME, not antigen priming [MECHANISTIC HYPOTHESIS — Agent 3 Synthesis Memo Lesson 3c]. GVAX, PANVAC, BN-CV301, and PolyPEPI1018 all generated robust multi-antigen T-cell responses with zero or near-zero clinical benefit [PHARMACODYNAMIC ACTIVITY — Agent 3].

**Accurate alternative framing:** "STC-1010's whole-cell approach generates immune responses against a broad panel of tumor antigens, which may reduce the risk of antigen escape. However, the primary challenge in MSS CRC is not antigen priming but T-cell trafficking and effector function within the immunosuppressive TME — a challenge that antigen breadth alone does not address."

---

### Guardrail 5: Do Not Present the CEO's "Stronger Than Anything Previously Reported" Quote as a Scientific Claim

**Prohibited claim/framing:** Citing or amplifying the CEO's January 2026 statement that "we are observing trends in efficacy that are stronger than anything that has been previously reported in hard-to-treat solid tumors" [VERIFIED — Agent 1] as a scientific finding.

**Why it is prohibited:** This is promotional language from a company press release with no comparator data, no peer review, and no statistical analysis [VERIFIED — Agent 1 Section 5, Claim #2]. It is explicitly flagged as a guardrail in Agent 2 Section 8. Using this quote in CrisPRO materials would associate CrisPRO with an unsubstantiated superlative claim.

**Accurate alternative framing:** "Brenus Pharma has reported preliminary clinical signals from the first dose cohorts of BreAK CRC-001, including no dose-limiting toxicities and disease control in all 6 evaluable patients [PRELIMINARY — n=6 only]. These early signals are encouraging but require validation in larger, controlled cohorts before conclusions about comparative efficacy can be drawn."

---

### Guardrail 6: Do Not Conflate MSI-H and MSS CRC IO Data

**Prohibited claim/framing:** Citing KEYNOTE-177 (pembrolizumab in MSI-H CRC, PFS HR 0.60) or CheckMate 142 (nivolumab in MSI-H CRC, ORR 31–55%) as evidence that IO works in CRC broadly, or as a benchmark for STC-1010's target population.

**Why it is prohibited:** STC-1010's primary target population is MSS/pMMR CRC, which constitutes ~95% of mCRC and is biologically distinct from MSI-H CRC. CheckMate 142 explicitly showed ORR 0% with nivolumab monotherapy in the MSS cohort (n=74) [PROVEN EFFICACY — Agent 3]. The BreAK CRC-001 protocol correctly separates MSS (Arm 2A-1) and MSI-H (Arm 2A-2) into distinct arms [VERIFIED — Agent 2].

**Accurate alternative framing:** "Checkpoint immunotherapy has demonstrated durable benefit in MSI-H/dMMR CRC (~5% of mCRC), establishing proof-of-concept for IO in CRC. However, MSS/pMMR CRC (~95% of mCRC) — STC-1010's primary target — has been uniformly resistant to checkpoint blockade, with ORR 0% in the MSS cohort of CheckMate 142. STC-1010's mechanism is designed to address the specific immunosuppressive architecture of MSS CRC, not to replicate the MSI-H IO success."

---

### Guardrail 7: Do Not Represent Manufacturing Scalability as Validated

**Prohibited claim/framing:** "STC-1010 can treat 100 patients per batch" as a validated manufacturing fact, or presenting the off-the-shelf scalability as a confirmed commercial advantage.

**Why it is prohibited:** The "100 patients per batch" claim originates from the company website and has not been independently validated [VERIFIED — Agent 1 Section 5, Claim #22]. No CMC data, GMP manufacturing validation, or independent batch-to-batch consistency data for the human product has been publicly disclosed [VERIFIED — Agent 1 Section 6.1].

**Accurate alternative framing:** "Brenus Pharma reports that STC-1010's allogeneic, off-the-shelf design is intended to enable treatment of approximately 100 patients per batch. This manufacturing claim has not been independently validated and requires CMC verification before it can be represented as a confirmed commercial advantage."

---

## SECTION 6: RECOMMENDED ENGAGEMENT NARRATIVE

**Paragraph 1 — Acknowledging the Scientific Challenge:**
MSS colorectal cancer represents one of the most formidable challenges in immuno-oncology. Comprising approximately 95% of metastatic CRC, MSS tumors have resisted every checkpoint immunotherapy approach tested to date — from pembrolizumab monotherapy (ORR 0% in CheckMate 142's MSS cohort) to complex combinations of MEK inhibitors, anti-VEGF agents, and dual checkpoint blockade. The accumulated evidence from over a decade of trials teaches a consistent lesson: the MSS CRC tumor microenvironment is not merely "cold" — it is actively and redundantly immunosuppressive, with TGF-β-driven T-cell exclusion, liver metastasis-induced systemic immune tolerance, KRAS-driven MDSC recruitment, and MHC-I downregulation operating simultaneously. Broad enrollment of unselected MSS CRC patients has consistently diluted any biological signal to statistical noise. The field's most promising recent signals — in non-liver-metastatic patients, in Immunoscore-IC-high tumors, in pTMB-high subgroups — all point to the same conclusion: the path forward in MSS CRC IO requires precision patient selection, not broader treatment.

**Paragraph 2 — Positioning CrisPRO's Value for BreAK CRC-001:**
CrisPRO's computational platform is designed precisely for the challenge Brenus faces at this inflection point in the BreAK CRC-001 program. As Phase Ia data matures and Phase IIa design decisions approach, the program faces three critical computational needs that CrisPRO can address. First, the exploratory biomarker data being collected from Phase I patients — cytokine profiles, immunophenotyping, ctDNA dynamics, TLS evolution, HLA expression — requires a pre-specified, multi-omic analysis framework to generate credible biomarker hypotheses before Phase IIa opens. CrisPRO's biomarker stratification engine can integrate these data streams with the published MSS CRC biomarker literature to identify the patient subgroup most likely to benefit from STC-1010. Second, the Phase IIa design requires adaptive enrichment architecture — a single-arm trial comparing against historical FOLFOX benchmarks in unselected MSS CRC patients is unlikely to detect a vaccine-attributable signal, as the GRANITE trial demonstrated. CrisPRO's trial design intelligence can provide power calculations, adaptive enrichment designs, and ctDNA-based early stopping rules that give the Phase IIa trial a realistic chance of detecting a true signal. Third, the combination timing questions — when to administer STC-1010 relative to mFOLFOX6 cycles and bevacizumab to exploit the vascular normalization window and avoid the lymphopenic nadir — are addressable through CrisPRO's combination therapy optimization module, using the preclinical data from Alzeeb et al. 2024 and published analogues from other vaccine trials.

**Paragraph 3 — Honest About What CrisPRO Cannot Do:**
CrisPRO is a computational platform, and there are critical gaps in the BreAK CRC-001 program that computation alone cannot close. The attribution problem — separating STC-1010's contribution from FOLFOX's contribution to the observed 100% DCR in 6 patients — requires a randomized control arm, not a model. The liver metastasis stratification gap requires a protocol amendment and systematic data collection, not retrospective analysis. The absence of a validated predictive biomarker requires prospective clinical validation in a biomarker-enriched cohort, not hypothesis generation alone. And the manufacturing scalability question requires independent CMC validation, which is entirely outside CrisPRO's scope. CrisPRO's value to Brenus is in maximizing the scientific return on the clinical data that Brenus collects — by ensuring that the right biomarkers are measured, the right patients are enrolled, and the right endpoints are powered to detect a real signal. The clinical data itself must come from Brenus's trial.

---

## SECTION 7: OPEN QUESTIONS FOR BRENUS DUE DILIGENCE

The following 10 questions cannot be answered from public sources and would be required in a first meeting with Brenus leadership to properly scope a CrisPRO engagement:

1. **What are the identities of the human CRC cell lines used in STC-1010, and what is the full antigen characterization (mass spectrometry dataset) of the human product?** This is the foundational question for any computational antigen mapping or biomarker stratification work.

2. **What is the liver metastasis status (number of lesions, % liver involvement, presence of extrahepatic disease) of each of the 6 patients reported at AACR 2026, and what proportion of Phase I patients enrolled to date have active liver metastases?** This is the single most important clinical variable for interpreting the early efficacy signal.

3. **What assay platforms are being used for the exploratory biomarker endpoints (cytokine profiles, immunophenotyping, PBMC markers, ctDNA, HLA expression, TLS evolution), and is there a pre-specified analysis plan for these endpoints?** Without knowing the assay platforms, CrisPRO cannot design a compatible analysis framework.

4. **What is the exact clinical dose, route, and timing of STC-1010 relative to mFOLFOX6 cycles and bevacizumab?** This is essential for combination timing optimization and for interpreting any pharmacodynamic data.

5. **What KRAS mutation subtypes (G12C, G12D, G12V, G13D, etc.) are represented in the enrolled patients, and is KRAS subtype being recorded as a covariate?** KRAS subtype heterogeneity is a significant dilution risk that requires subgroup analysis.

6. **Is bevacizumab use being tracked as a covariate in efficacy analyses, and what proportion of enrolled patients are receiving bevacizumab?** The optional nature of bevacizumab creates immunological heterogeneity that must be accounted for in any analysis.

7. **What are the DTH response data (quantitative scores at 1, 24, 48, 72 hours post-injection) for the 6 patients reported at AACR 2026, and is there a correlation between DTH magnitude and any clinical or biomarker endpoint?** DTH is the only immune activation endpoint reported publicly; quantitative data is needed to assess its predictive value.

8. **What is the Phase IIa design currently planned — specifically, what is the pre-specified historical control benchmark for the 12-month PFS rate primary endpoint, and is there any consideration of a randomized control arm or adaptive enrichment design?** This determines whether CrisPRO's trial design intelligence is needed for a redesign or an optimization.

9. **What is the SMAD4 status of enrolled patients, and is SMAD4 IHC being performed on screening biopsies?** SMAD4 loss (~25–30% of CRC) is a clinically accessible biomarker that predicts immune exclusion and liver metastasis propensity; its absence from the public protocol is a gap.

10. **What is the company's current thinking on a companion diagnostic strategy — specifically, is there a candidate biomarker or biomarker panel under consideration for Phase IIa patient enrichment, and has there been any pre-IND or pre-Phase II meeting with FDA or EMA on biomarker qualification?** This determines the regulatory intelligence engagement scope and whether CrisPRO's regulatory module would be additive or redundant.

---

## APPENDIX: EVIDENCE TRACEABILITY SUMMARY

| Section | Primary Evidence Sources | Evidence Level Tags Used |
|---------|------------------------|--------------------------|
| Section 1 | Agent 1 (Sections 2.2, 3, 4.1), Agent 2 (Sections 1, 8), Agent 3 (Synthesis Memo), Agent 4 (Domains 1–6) | [VERIFIED], [PRELIMINARY — n=6 only] |
| Section 2.1 | Agent 4 (Section 5), Agent 3 (Synthesis Memo Section 2), Agent 2 (Section 6.5) | [MECHANISTIC HYPOTHESIS], [PROVEN EFFICACY], [PHARMACODYNAMIC ACTIVITY] |
| Section 2.2 | Agent 4 (Domains 1–6), Agent 2 (Section 7.1), Agent 3 (Tier 4 AtezoTRIBE) | [MECHANISTIC HYPOTHESIS], [PHARMACODYNAMIC ACTIVITY] |
| Section 2.3 | Agent 2 (Sections 7.1, 7.2), Agent 4 (Domains 3, 6), Agent 3 (Synthesis Memo Section 4) | [ANALYTICAL INTERPRETATION], [MECHANISTIC HYPOTHESIS], [PHARMACODYNAMIC ACTIVITY] |
| Section 2.4 | Agent 2 (Sections 6.2, 7.4), Agent 3 (Synthesis Memo Section 5, Tier 3 GRANITE) | [ANALYTICAL INTERPRETATION], [PROVEN EFFICACY] |
| Section 2.5 | Agent 4 (Appendix), Agent 2 (Section 6.5), Agent 3 (Tier 1 CheckMate 142) | [MECHANISTIC HYPOTHESIS], [PROVEN EFFICACY] |
| Section 2.6 | Agent 4 (Section 4), Agent 3 (Tier 4 CO.26 pTMB) | [MECHANISTIC HYPOTHESIS], [PHARMACODYNAMIC ACTIVITY] |
| Section 3 | Agent 1 (Section 6), Agent 2 (Sections 7, 9), Agent 3 (Synthesis Memo), Agent 4 (Sections 1–5) | [VERIFIED], [NOT FOUND IN PUBLIC SOURCES], [PROVEN EFFICACY], [VALIDATED CLINICAL OBSERVATION] |
| Sections 4–7 | All four agents | All tags |

---

*Document prepared by Agent 5: CrisPRO Fit-Gap Architecture Mapper*
*Evidence base: Agents 1–4 (April 2026)*
*All claims traceable to the four Agent evidence streams*
*No CrisPRO capabilities beyond those described in the mission brief are asserted*
*No claims about STC-1010 efficacy beyond what is in the evidence wall*
