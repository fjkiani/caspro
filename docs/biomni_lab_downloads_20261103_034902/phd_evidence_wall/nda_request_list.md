# NDA Request List — BreAK CRC-001 / STC-1010
Generated: 2026-04-30
Purpose: Prioritized data requests for Brenus Pharma NDA/partnership due diligence package.
Basis: Residual blockers after full public-source evidence retrieval.

---

## PRIORITY 1 — PUBLICATION-BLOCKING / SCIENTIFIC INTEGRITY

### NDA-01: SC-001 Antigen Overlap Data (CRITICAL)
- BLOCKER: HT29 (BRAF V600E) is a confirmed vaccine component. BreAK CRC-001 enrolls BRAF WT patients only.
- REQUEST: Provide proteomics/mass spectrometry data comparing antigen profiles of:
  (a) HT29-derived STC-1010 antigens (BRAF V600E background)
  (b) HCT116-derived STC-1010 antigens (KRAS G13D, BRAF WT)
  (c) LoVo-derived STC-1010 antigens (KRAS G13D, BRAF WT)
  (d) BRAF WT patient tumor proteomes (if available from BreAK CRC-001 biopsies)
- SCIENTIFIC QUESTION: What fraction of HT29-derived antigens are shared with BRAF WT patient tumors? Are BRAF V600E-specific antigens (e.g., MAPK pathway targets) overrepresented in the vaccine?
- EVIDENCE BASE: AACR 2024 press release [13] mentions "multi-omics analysis of STC-1010 batches confirmed consistent quality" — this data package must exist internally.
- URGENCY: HIGH — this is a potential antigen mismatch that could explain partial efficacy in BRAF WT patients.

### NDA-02: AACR 2026 CT051 Full Poster Data Package
- BLOCKER: B-003 — first-in-human data is press-release-only. Quantitative DTH values, per-patient biomarker data, RECIST assessments, and translational data not publicly available.
- REQUEST: Full CT051 poster PDF including:
  (a) Per-patient RECIST assessments (n=6, Dose Cohort 1)
  (b) Quantitative DTH response data (induration size, timing, responder definition)
  (c) Immune biomarker data (CD4+, CD8+, NK cell counts, cytokine profiles)
  (d) Translational data: correlation between preclinical immune signatures and clinical immune engagement
  (e) ctDNA data if collected
- URGENCY: HIGH — required for any external scientific communication.

### NDA-03: Liver Metastasis Status Capture Plan
- BLOCKER: C-004 — BreAK CRC-001 does not capture liver met status as a stratification variable or covariate.
- REQUEST: Confirm whether liver met status (presence/absence, burden) is:
  (a) Captured in the eCRF as a baseline variable
  (b) Planned as a stratification variable for Phase IIa randomization
  (c) Planned as a pre-specified covariate in Phase IIa primary analysis
- SCIENTIFIC RATIONALE: BOT/BAL (PMID 38871975) and RIN (PMID 39504677) demonstrate that liver met status is the strongest validated patient selection variable for IO in MSS mCRC. Without capturing this, Phase IIa results will be uninterpretable in the context of the field.
- URGENCY: HIGH — if not currently captured, protocol amendment required before Phase IIa enrollment.

---

## PRIORITY 2 — ANALYSIS-BLOCKING / INTERPRETATION-LIMITING

### NDA-04: ctDNA Platform and Threshold Specification
- BLOCKER: C-005 — ctDNA not explicitly named in registry. "Molecular biomarkers" may include ctDNA but unconfirmed.
- REQUEST: Confirm:
  (a) Is ctDNA included in the molecular biomarker panel?
  (b) What platform is used (e.g., Guardant360, FoundationOne Liquid, custom panel)?
  (c) What timepoints are collected (T0, 1m, 2m, 6m, 12m, Tprogression)?
  (d) Is a molecular response threshold pre-specified (e.g., ≥30% decrease as in GRANITE GO-010)?
- SCIENTIFIC RATIONALE: GRANITE GO-010 ctDNA-low subgroup (HR 0.50) is the strongest available enrichment hypothesis for vaccine IO in MSS mCRC. BreAK CRC-001 should be positioned to test this hypothesis.
- URGENCY: MEDIUM — can be added as exploratory endpoint without protocol amendment if not already included.

### NDA-05: Bevacizumab Stratification Plan
- BLOCKER: C-008 — bevacizumab is optional in BreAK CRC-001. Creates immunological heterogeneity.
- REQUEST: Confirm:
  (a) Is bevacizumab use captured as a stratification variable for Phase IIa?
  (b) Is bevacizumab use planned as a pre-specified covariate in Phase IIa primary analysis?
  (c) What is the expected proportion of patients receiving bevacizumab?
- SCIENTIFIC RATIONALE: Bevacizumab has immunomodulatory effects (VEGF blockade reduces immunosuppressive myeloid cells). Optional use without stratification will confound immune biomarker interpretation.
- URGENCY: MEDIUM — stratification variable should be added before Phase IIa enrollment.

### NDA-06: KRAS Subtype Capture
- BLOCKER: KRAS mutation required (Inclusion #4) but subtype not specified in registry.
- REQUEST: Confirm:
  (a) Is KRAS subtype (G12C, G12D, G12V, G13D, etc.) captured in the eCRF?
  (b) Is KRAS G12C subgroup planned as a pre-specified subgroup analysis (given KRAS G12C inhibitor combinations as emerging SOC)?
  (c) Is SMAD4 status captured?
- SCIENTIFIC RATIONALE: KRAS G12C is now targetable (sotorasib, adagrasib). SMAD4 loss is associated with liver-met tropism and IO resistance. Both are critical for Phase IIa subgroup interpretation.
- URGENCY: MEDIUM — can be added as exploratory biomarker without protocol amendment.

### NDA-07: Biopsy Schedule and Biomarker Panel Specification
- BLOCKER: C-007 — biopsy is conditional, not mandatory. Limits biomarker data quality.
- REQUEST: Confirm:
  (a) What is the expected biopsy compliance rate based on Phase Ia experience?
  (b) What biomarkers are analyzed from biopsies (IHC panel, RNA-seq, proteomics)?
  (c) Is Immunoscore-IC planned as a biomarker (given AtezoTRIBE 2025 data)?
  (d) Is CMS subtype planned as a biomarker (given REGONIVO multiomic data)?
- SCIENTIFIC RATIONALE: Conditional biopsy will result in missing data. Pre-specifying the biomarker panel and expected compliance rate is required for Phase IIa power calculations.
- URGENCY: MEDIUM — should be addressed before Phase IIa enrollment.

---

## PRIORITY 3 — HYPOTHESIS-GENERATING / FUTURE POSITIONING

### NDA-08: pTMB Capture Plan
- BASIS: N-002 — pTMB ≥28 mut/Mb predictive in MEDITREME (PMID 38727700). Tissue TMB not predictive.
- REQUEST: Confirm whether plasma ctDNA sequencing panel includes TMB calculation. If not, consider adding pTMB as an exploratory endpoint.
- URGENCY: LOW — hypothesis-generating; no validated threshold yet.

### NDA-09: CMS Subtype Capture Plan
- BASIS: N-001 — CMS4 associated with IO response in REGONIVO (PMID 38336371).
- REQUEST: Confirm whether CMS subtype (CMS1–4) is planned as a biomarker from tumor biopsies.
- URGENCY: LOW — hypothesis-generating; requires biopsy compliance.

### NDA-10: Antigen Characterization Data (Full Multi-Omics Package)
- BASIS: AACR 2024 press release [13] mentions "multi-omics analysis of STC-1010 batches confirmed consistent quality and batch-to-batch reproducibility."
- REQUEST: Full multi-omics data package including:
  (a) Proteomics: antigen catalog per cell line (HCT116, HT29, LoVo)
  (b) Transcriptomics: gene expression changes induced by stress conditions
  (c) Batch-to-batch reproducibility data (n=3 batches per press release)
  (d) Haptenation efficiency data
- URGENCY: LOW for external communication; HIGH for internal scientific positioning.

---

## SUMMARY TABLE

| ID | Topic | Priority | Urgency | Protocol Amendment Required? |
|----|-------|----------|---------|------------------------------|
| NDA-01 | SC-001 antigen overlap (HT29 BRAF V600E) | 1 | HIGH | NO — internal data request |
| NDA-02 | CT051 full poster data | 1 | HIGH | NO — internal data request |
| NDA-03 | Liver met stratification plan | 1 | HIGH | YES — if not currently captured |
| NDA-04 | ctDNA platform + threshold | 2 | MEDIUM | NO — exploratory endpoint |
| NDA-05 | Bevacizumab stratification | 2 | MEDIUM | YES — if not currently stratified |
| NDA-06 | KRAS subtype + SMAD4 capture | 2 | MEDIUM | NO — exploratory biomarker |
| NDA-07 | Biopsy schedule + biomarker panel | 2 | MEDIUM | NO — clarification only |
| NDA-08 | pTMB capture | 3 | LOW | NO — exploratory endpoint |
| NDA-09 | CMS subtype capture | 3 | LOW | NO — exploratory biomarker |
| NDA-10 | Full multi-omics antigen package | 3 | LOW | NO — internal data request |
