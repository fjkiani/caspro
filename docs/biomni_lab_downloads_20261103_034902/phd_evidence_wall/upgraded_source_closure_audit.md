# Upgraded-Source Closure Audit
Generated: 2026-04-30
Scope: Four claims whose status changed from PROVISIONAL/NOT-IN-CANON to CONFIRMED/NEW-FINDING.
Standard: Each entry must attach the exact primary source, archive the key extracted text,
record source tier, and state residual uncertainty explicitly.
Format: Three columns — (1) Claim upgraded, (2) Exact source that cleared it, (3) Residual uncertainty.

---

## AUDIT-01: C-001 — Cell line identity (HCT116, HT29, LoVo)
**Prior status:** PROVISIONAL (company website only)
**New status:** CONFIRMED

### Column 1 — Claim upgraded
STC-1010 is produced from three allogeneic human CRC cell lines: HCT116, HT29, and LoVo.

### Column 2 — Exact sources that cleared it

**Source A — ASCO 2023 Abstract e14661**
- URL: https://ascopubs.org/doi/10.1200/JCO.2023.41.16_suppl.e14661
- Source tier: CONFERENCE ABSTRACT (ASCO Annual Meeting 2023, peer-reviewed abstract selection process)
- Exact extracted text: "We confirmed these proof-of-concept efficacy with the human STC-1010 using
  three CRC human cell lines (HCT116, HT29 and Lovo)."
- Authors: Brenus Pharma authors (Alzeeb et al.)
- Retrieval method: Direct WebFetch of ascopubs.org DOI — full abstract text retrieved successfully
- Archive status: Full abstract text captured in session; not paywalled at abstract level

**Source B — EACR 2025 Abstract EACR25-1044**
- URL: https://storage.unitedwebnetwork.com/files/991/abstract/EACR25-1044.htm
- Source tier: CONFERENCE ABSTRACT (EACR 2025, abstract selection process)
- Exact extracted text: "STC-1010, a therapeutic colorectal cancer (CRC) vaccine, developed by exposing
  HCT116, HT-29, and LoVo cell lines to stress conditions — serum deprivation, irradiation,
  heat shock, and chemotherapy — mimicking standard CRC treatments and relapse conditions."
- Authors: Zbinden M, Richert I, Gamma T, Rudnik M, Chalus L, Pinteur B, Agarkova I,
  Bravetti P, Ligeon L, Alzeeb G (Insphero + Brenus Pharma)
- Retrieval method: Direct WebFetch — full abstract text retrieved successfully
- Archive status: Full abstract text captured in session

**Source C — AACR 2024 Press Release (BioSpace)**
- URL: https://www.biospace.com/aacr-2024-brenus-pharma-unveils-promising-and-robust-pre-clinical-efficacy-extrapolating-human-conditions-with-stc-1010
- Source tier: PRESS RELEASE (company-controlled)
- Exact extracted text: "The study used three human colorectal cancer cell lines: HCT116, HT29, and LoVo,
  to create the STC-1010 vaccine."
- Retrieval method: Direct WebFetch — full press release text retrieved successfully
- Archive status: Full text captured in session

### Column 3 — Residual uncertainty
- **Source A and B are both Brenus-affiliated outputs** (Brenus authors on both). They are
  independent in venue (ASCO vs EACR) but not independent in data origin — both report
  Brenus's own characterization of their own product. There is no independent third-party
  confirmation of cell line identity.
- **No regulatory filing (IND, CTA) or independent laboratory confirmation** of cell line
  identity is in the public record.
- **Consequence:** The claim is confirmed to the standard of "two concordant conference
  abstracts from the sponsor." It is NOT confirmed to the standard of "independently verified
  by a third party." For external scientific assertions, this distinction matters.
- **Recommended language:** "STC-1010 is reported to be produced from HCT116, HT29, and LoVo
  cell lines, as stated in two conference abstracts (ASCO 2023 e14661; EACR 2025 EACR25-1044)."
  Do not write "confirmed" without the source qualifier.

---

## AUDIT-02: C-002 — SC-001 conflict (HT29 BRAF V600E vs BreAK CRC-001 BRAF WT eligibility)
**Prior status:** PROVISIONAL (pending B-001 resolution)
**New status:** CONFIRMED CONFLICT — real inconsistency, unknown clinical consequence

### Column 1 — Claim upgraded
HT29 carries BRAF V600E. BreAK CRC-001 requires BRAF WT at enrollment. This creates a
documented antigen mismatch between one vaccine component and the enrolled patient population.

### Column 2 — Exact sources that cleared it

**Source A — HT29 BRAF V600E status**
- This is established cell line biology, not a new finding. HT29 BRAF V600E is documented in:
  ATCC product sheet (HTB-38), CCLE (Broad Institute), COSMIC Cell Lines database, and
  multiple published papers. It is not in dispute.
- Source tier: ESTABLISHED CELL LINE BIOLOGY — no citation needed; universally accepted.

**Source B — BreAK CRC-001 BRAF WT eligibility**
- Source: NCT06934538 registry, Inclusion Criterion #4
- Exact extracted text (from prior session registry retrieval): "BRAF wild-type (WT) status
  confirmed by local laboratory testing" [paraphrased from registry — exact wording requires
  NDA data package for verbatim text; registry summary confirms BRAF WT requirement]
- Source tier: PRIMARY REGISTRY (ClinicalTrials.gov API v2)
- Retrieval method: ClinicalTrials.gov API v2 query in prior session

**Source C — Cell line identity confirmation (closes the logical chain)**
- ASCO 2023 e14661 and EACR 2025 EACR25-1044 (see AUDIT-01) confirm HT29 is a vaccine component.
- The conflict is therefore: HT29 (BRAF V600E, vaccine component) + BRAF WT eligibility
  (registry) = antigen mismatch.

### Column 3 — Residual uncertainty
- **The conflict is real. The clinical consequence is unknown.**
- The haptenization mechanism is designed to expose shared tumor antigens (stress-response
  proteins, calreticulin, HMGB1, HSPs) that are not mutation-specific. If the dominant
  immunogenic antigens in STC-1010 are stress-response antigens rather than BRAF V600E-specific
  neoantigens, the mismatch may be clinically irrelevant.
- **No public data exists** comparing the antigen profile of HT29-derived STC-1010 components
  vs HCT116/LoVo-derived components, or vs BRAF WT patient tumor proteomes.
- The AACR 2024 press release mentions "multi-omics analysis of STC-1010 batches" — this data
  package exists internally at Brenus but is not in the public record.
- **Recommended language:** "STC-1010 contains antigens derived from HT29 (BRAF V600E), while
  BreAK CRC-001 enrolls only BRAF WT patients. The clinical significance of this antigen
  mismatch is unknown and requires sponsor disclosure of antigen overlap data (NDA-01)."
- **Do not write:** "SC-001 is a definitive efficacy concern." It is an open scientific
  question, not a proven problem.

---

## AUDIT-03: C-003 — AtezoTRIBE liver-met nuance
**Prior status:** CANON ("liver mets = IO non-permissive")
**New status:** NUANCED — prior canon overstated; correct framing is more conditional

### Column 1 — Claim upgraded
Liver metastases alone do not predict resistance to atezolizumab in pMMR mCRC. Immunoscore-IC
retains predictive impact even in the liver-met subgroup. The correct framing is
"liver mets + Immunoscore-IC-low = non-permissive," not "liver mets alone = non-permissive."

### Column 2 — Exact source that cleared it

**Source — PMID 39908699**
- Full citation: Antoniotti C et al. "Liver metastases do not predict resistance to the addition
  of atezolizumab to first-line FOLFOXIRI plus bevacizumab in proficient MMR metastatic
  colorectal cancer: a secondary analysis of the AtezoTRIBE study." ESMO Open. 2025 Feb 4;
  10(2):104135. doi: 10.1016/j.esmoop.2025.104135
- Source tier: PEER-REVIEWED (ESMO Open, open access, published 2025-02-04)
- URL: https://pubmed.ncbi.nlm.nih.gov/39908699/
- Exact extracted text from abstract:
  "Out of 202 pMMR patients, 151 (75%) had LMs. No differences in immune-related features
  were observed according to the presence or not of LMs, except for a lower prevalence of
  tumour-infiltrating lymphocytes-high tumours in the LMs group (33% versus 52%, P = 0.03).
  Worse outcomes were observed among patients with LMs [PFS, P = 0.002; OS, P = 0.011],
  also in multivariable models. The effect of adding atezolizumab to FOLFOXIRI/bevacizumab
  was independent from LMs in terms of PFS (Pint = 0.990) and OS (Pint = 0.800). Among
  patients with pMMR mCRC and LMs, those with immunoscore-IC-high but not those with
  immunoscore-IC-low tumours achieved benefit from atezolizumab, though in the absence of
  a statistically significant interaction effect (Pint for PFS and OS = 0.166 and 0.473,
  respectively)."
  Conclusion: "LMs are associated with poor prognosis in pMMR mCRC and do not predict
  resistance to the addition of atezolizumab to FOLFOXIRI/bevacizumab. Immunoscore-IC seems
  to retain its predictive impact also among patients with LMs."
- Retrieval method: Direct WebFetch of PubMed abstract — full abstract text retrieved
- Archive status: Full abstract text captured in session

### Column 3 — Residual uncertainty
- **This is a secondary analysis of a Phase 2 trial (n=202 pMMR), not a pre-specified
  primary endpoint.** The interaction tests (Pint = 0.990 for PFS, 0.800 for OS) are
  exploratory. A non-significant interaction test does NOT prove that liver mets are
  irrelevant — it means the study was underpowered to detect a differential effect.
- **The Immunoscore-IC interaction in the liver-met subgroup is also non-significant**
  (Pint = 0.166 for PFS, 0.473 for OS). The authors' conclusion that "Immunoscore-IC seems
  to retain its predictive impact" is a directional observation, not a statistically
  validated finding.
- **The BOT/BAL and RIN no-liver-met signals are unchanged** and remain the strongest
  clinical evidence for liver-met stratification in MSS mCRC IO. AtezoTRIBE 2025 does not
  contradict those findings — it addresses a different drug (atezolizumab), a different
  backbone (FOLFOXIRI), and a different patient population (pMMR, not MSS-restricted).
- **Critical distinction:** AtezoTRIBE enrolled pMMR patients (not MSS-restricted). The
  BOT/BAL and RIN liver-met findings are in MSS-restricted populations. These are not
  directly comparable.
- **Recommended language:** "A secondary analysis of AtezoTRIBE (PMID 39908699) found that
  liver metastases were prognostic but not predictive of atezolizumab resistance in pMMR
  mCRC (Pint PFS=0.990, OS=0.800), with Immunoscore-IC retaining directional predictive
  impact in the liver-met subgroup. These are exploratory findings from a Phase 2 secondary
  analysis and do not supersede the validated no-liver-met enrichment strategy demonstrated
  in MSS-restricted populations (BOT/BAL, RIN)."
- **Do not use AtezoTRIBE 2025 to argue that liver-met patients should be enrolled in
  BreAK CRC-001 without stratification.** The populations are not equivalent.

---

## AUDIT-04: N-002 — pTMB ≥28 mut/Mb as predictive biomarker
**Prior status:** NOT IN CANON
**New status:** NEW FINDING — peer-reviewed, but with critical caveats on threshold derivation

### Column 1 — Claim upgraded
Plasma TMB (pTMB) ≥28 mut/Mb is predictive of benefit from durvalumab + tremelimumab in
MSS mCRC (HR 0.34, 95%CI 0.13–0.85, p=0.022, Pint=0.070). Tissue TMB ≥10 mut/Mb is NOT
predictive (HR 0.71, p=0.47, Pint=0.62).

### Column 2 — Exact source that cleared it

**Source — PMID 38727700**
- Full citation: Loree JM et al. "Plasma versus Tissue Tumor Mutational Burden as Biomarkers
  of Durvalumab plus Tremelimumab Response in Patients with Metastatic Colorectal Cancer in
  the CO.26 Trial." Clin Cancer Res. 2024 Aug 1;30(15):3189–3199.
  doi: 10.1158/1078-0432.CCR-24-0268
- Source tier: PEER-REVIEWED (Clinical Cancer Research, AACR journal, open access)
- URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC11292199/
- Trial: CO.26 (NCT02870920) — NOT MEDITREME. This is the Canadian Cancer Trials Group
  randomized Phase 2 trial of durvalumab + tremelimumab vs BSC in refractory mCRC (n=180).
  MEDITREME is a separate trial (NCT03202758, Nature Medicine 2023). The pTMB finding is
  from CO.26, not MEDITREME.
- Exact extracted text:
  "pTMB ≥28 mutations/Mb was predictive of benefit from D+T [HR, 0.34 (95% CI, 0.13–0.85);
  P=0.022], as was clonal pTMB ≥10.6 mutations/Mb [HR, 0.10 (95% CI, 0.014–0.79); P=0.029]
  and subclonal pTMB ≥25.9/Mb [HR, 0.20 (95% CI, 0.061–0.69); P=0.010]."
  "Tissue TMB ≥10 mutations/Mb was not predictive of benefit from D+T compared with BSC in
  microsatellite stable (MSS) metastatic CRC [HR, 0.71 (95% CI, 0.28–1.80); P=0.47]."
  "No tissue TMB threshold could identify a high TMB group that benefited from ICI."
- Platform: GuardantOMNI (500-gene panel, Guardant Health) — platform-specific threshold
- Threshold derivation: "Cases were classified as TMB high by plasma if TMB was ≥28
  mutations/Mb based on our prior work and lack of other available cut points suggestive of
  the appropriate threshold." — i.e., DATA-DRIVEN from prior exploratory analysis, NOT
  pre-specified in the CO.26 protocol.
- Retrieval method: Direct WebFetch of PMC full text — complete paper retrieved successfully
- Archive status: Full paper text captured in session

### Column 3 — Residual uncertainty — FOUR CRITICAL CAVEATS
1. **TRIAL ATTRIBUTION ERROR IN PRIOR CANON:** The pTMB finding was attributed to MEDITREME
   in the biomarker matrix. This is WRONG. The pTMB ≥28 mut/Mb finding is from CO.26
   (PMID 38727700), not MEDITREME. MEDITREME (PMID 37563240) is a separate trial with
   different biomarker findings. The biomarker_timing_matrix.csv row for "MEDITREME / CO.26"
   conflated these two trials. This must be corrected in the matrix.

2. **THRESHOLD IS DATA-DRIVEN, NOT PRE-SPECIFIED.** The ≥28 mut/Mb threshold was derived
   from a minimal P-value approach in a prior exploratory analysis and carried forward. The
   interaction P-value is 0.070 — borderline, not significant at conventional alpha. This
   threshold requires prospective validation before clinical use.

3. **PLATFORM-SPECIFIC.** The threshold applies to GuardantOMNI pTMB specifically. The
   authors explicitly state: "Our threshold of pTMB may not be directly applicable to pTMB
   derived from other assays." Different ctDNA platforms will produce different pTMB values
   for the same sample.

4. **POPULATION MISMATCH.** CO.26 enrolled refractory mCRC (≥2L), not 1L. BreAK CRC-001
   is 1L. Prior therapy (especially anti-EGFR exposure) significantly increases pTMB in
   CO.26 (P=2.44×10⁻⁶). In a 1L population with less prior therapy, pTMB distributions
   will be lower and the ≥28 mut/Mb threshold may select a different (smaller) fraction
   of patients.

- **Recommended language:** "A secondary analysis of CO.26 (PMID 38727700) found that
  pTMB ≥28 mut/Mb (GuardantOMNI) was predictive of benefit from durvalumab + tremelimumab
  in refractory MSS mCRC (HR 0.34, Pint=0.070). The threshold was data-driven, is
  platform-specific, and requires prospective validation. It is not directly applicable to
  a 1L population or to other ctDNA platforms."
- **Do not write:** "pTMB ≥28 mut/Mb is a validated predictive biomarker." It is a
  hypothesis-generating finding from a single exploratory analysis.

---

## SUMMARY TABLE

| Audit ID | Claim | Old status | New status | Source tier | Trial attribution correct? | Residual uncertainty level |
|----------|-------|-----------|-----------|-------------|---------------------------|---------------------------|
| AUDIT-01 | Cell lines HCT116/HT29/LoVo | PROVISIONAL | CONFIRMED (sponsor-reported) | 2× CONFERENCE ABSTRACT | YES | LOW — two concordant sources; no independent third-party verification |
| AUDIT-02 | SC-001 HT29 BRAF V600E conflict | PROVISIONAL | CONFIRMED CONFLICT | ESTABLISHED BIOLOGY + REGISTRY | YES | MEDIUM — conflict is real; clinical consequence unknown |
| AUDIT-03 | Liver mets nuance (AtezoTRIBE) | CANON (overstated) | NUANCED | PEER-REVIEWED (ESMO Open 2025) | YES | HIGH — exploratory secondary analysis; pMMR not MSS-restricted; non-significant interactions |
| AUDIT-04 | pTMB ≥28 mut/Mb (CO.26) | NOT IN CANON | NEW FINDING (provisional) | PEER-REVIEWED (Clin Cancer Res 2024) | PARTIALLY — prior canon misattributed to MEDITREME; correct trial is CO.26 | HIGH — data-driven threshold, Pint=0.070, platform-specific, 2L+ population |

---

## CORRECTIONS REQUIRED IN BIOMARKER_TIMING_MATRIX.CSV

### CORRECTION-01: Trial attribution for pTMB finding
- AFFECTED ROW: "MEDITREME / CO.26 (MSS subgroup)"
- ERROR: pTMB ≥28 mut/Mb finding attributed to MEDITREME in the key_biomarker_finding field
- CORRECT: pTMB ≥28 mut/Mb is from CO.26 (PMID 38727700), not MEDITREME
- MEDITREME (PMID 37563240) is a separate trial with different biomarker findings
  (immune signature, EMT signature — not pTMB)
- ACTION: Split into two separate rows: "CO.26" and "MEDITREME" with correct biomarker
  findings per trial

### CORRECTION-02: Pint values for AtezoTRIBE liver-met interaction
- AFFECTED ROW: "AtezoTRIBE (pMMR subgroup)"
- PRIOR ENTRY: "Pint PFS=0.990, OS=0.800" (for liver met vs no liver met interaction with
  atezolizumab arm) — CORRECT
- ADDITIONAL DATA NOW CONFIRMED: Immunoscore-IC interaction within liver-met subgroup:
  Pint PFS=0.166, OS=0.473 — these were stated in prior canon but now confirmed from
  PubMed abstract text
- ACTION: Add Immunoscore-IC Pint values to the immunoscore_capture field

### CORRECTION-03: CO.26 pTMB platform specification
- AFFECTED ROW: "MEDITREME / CO.26 (MSS subgroup)"
- PRIOR ENTRY: "Plasma ctDNA sequencing (platform not specified in abstract)"
- CORRECT: GuardantOMNI (500-gene panel, Guardant Health) — confirmed from full paper text
- ACTION: Update ctdna_platform field to "GuardantOMNI (500-gene, Guardant Health)"
