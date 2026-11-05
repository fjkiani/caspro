# 8D-Readiness Audit — BreAK CRC-001 Package
Generated: 2026-04-30
Auditor: Biomni / CrisPRO
Scope: Design Intelligence Brief (brenus_outreach_brief.md) + all prior canon
Verified ledger: contradiction_ledger_v2.md + upgraded_source_closure_audit.md
Purpose: Prepare a clean substrate for 8D vector decoding. Classify every claim.
8D must not use BLOCKED claims. PROVISIONAL claims require caveat tags in vector output.

---

## SECTION 1 — VERIFIED CLAIMS SAFE FOR 8D USE

These claims are sourced from peer-reviewed publications or primary registry records,
have been confirmed against the verified ledger, and carry no outstanding contradictions.
8D may use these without caveat tags.

| ID | Claim text | Confidence | Source type | Source ID | Why it matters for 8D | 8D can proceed without sponsor data? |
|----|-----------|-----------|------------|-----------|----------------------|--------------------------------------|
| V-001 | CheckMate 9X8: HR 0.81 (95%CI 0.53–1.23), p=0.30; mPFS 11.86 vs 11.93 months; Phase 3 not triggered | HIGH | PEER-REVIEWED | PMID 38485190 | Null benchmark for PD-1 + mFOLFOX6 + bev in 1L MSS mCRC; sets the floor that STC-1010 must clear | YES |
| V-002 | CheckMate 9X8: n=196, 1L, all-comer mCRC (95% MSS/pMMR), NCT03414983 | HIGH | PEER-REVIEWED + REGISTRY | PMID 38485190; ClinicalTrials.gov | Trial identity and population for comparator positioning | YES |
| V-003 | QUILT-2.004: HR 1.061 (95%CI 0.380–2.966), p=0.91; mPFS 8.8 vs 10.1 months | HIGH | PEER-REVIEWED | PMID 35274710 | Primary negative benchmark; identical backbone to BreAK CRC-001 | YES |
| V-004 | QUILT-2.004: multifunctional CD4+/CD8+ T-cell responses in 8/11 IO patients vs 1/8 SOC (p=0.020) | HIGH | PEER-REVIEWED | PMID 35274710 | Confirms priming-without-trafficking failure mode; directly relevant to STC-1010 mechanism claim | YES |
| V-005 | QUILT-2.004: n=30, 1L, terminated early; NCT03050814 | HIGH | PEER-REVIEWED + REGISTRY | PMID 35274710 | Trial identity; underpowered caveat | YES |
| V-006 | BOT/BAL Phase 1: ORR 17% (95%CI 10–26%), DCR 61%, n=101 response-evaluable MSS mCRC (no liver mets); NCT03860272 | HIGH | PEER-REVIEWED | PMID 38871975 | Strongest validated IO signal in MSS mCRC; liver-met exclusion is the defining design feature | YES |
| V-007 | BOT/BAL Phase 1: active liver metastases explicitly excluded from MSS mCRC cohort (eligibility criterion) | HIGH | PEER-REVIEWED | PMID 38871975 | Source of the no-liver-met enrichment hypothesis | YES |
| V-008 | BOT/BAL Phase 2: cORR 19% (n=62, BOT 75mg+BAL); Phase 3 BATTMAN initiated | MEDIUM | CONFERENCE DATA (ASCO GI 2025) — not yet peer-reviewed | Conference presentation | Confirms Phase 1 signal at Phase 2 scale; use with caveat that not yet peer-reviewed | YES — with caveat: not yet peer-reviewed |
| V-009 | RIN NLM subgroup: ORR 36.4%, mPFS 5.0 months, mOS 27.5 months, 3-year PFS 19.3%; n=22; NCT04362839 | MEDIUM | PEER-REVIEWED | PMID 39504677 | Highest reported IO ORR in MSS mCRC; confirms liver-met stratification; n=22 is small | YES — with caveat: n=22 |
| V-010 | RIN NLM: three patients disease-free >18 months after treatment completion | MEDIUM | PEER-REVIEWED | PMID 39504677 | Durable remissions possible in MSS mCRC with IO; supports OS endpoint rationale | YES — with caveat: n=3 |
| V-011 | AtezoTRIBE liver-met secondary analysis: liver mets prognostic (PFS p=0.002, OS p=0.011) but NOT predictive of atezolizumab resistance (Pint PFS=0.990, OS=0.800) in pMMR mCRC (n=202, 151 with liver mets) | MEDIUM | PEER-REVIEWED | PMID 39908699 (ESMO Open 2025) | Nuances liver-met framing; Pint values confirmed from PubMed abstract | YES — with mandatory caveat: exploratory secondary analysis; pMMR not MSS-restricted |
| V-012 | AtezoTRIBE: Immunoscore-IC interaction within liver-met subgroup: Pint PFS=0.166, OS=0.473 (non-significant) | MEDIUM | PEER-REVIEWED | PMID 39908699 | Directional finding only; does not validate Immunoscore-IC as a stratification variable | YES — with mandatory caveat: non-significant, exploratory |
| V-013 | CO.26 pTMB: pTMB ≥28 mut/Mb (GuardantOMNI) predictive of D+T benefit in refractory MSS mCRC; HR 0.34 (95%CI 0.13–0.85), p=0.022, Pint=0.070 | MEDIUM | PEER-REVIEWED | PMID 38727700 (Clin Cancer Res 2024) | Strongest available plasma biomarker hypothesis for MSS mCRC IO; Pint=0.070 is borderline | YES — with mandatory caveat: data-driven threshold, GuardantOMNI-specific, 2L+ population, Pint=0.070 |
| V-014 | CO.26 pTMB: tissue TMB ≥10 mut/Mb NOT predictive (HR 0.71, p=0.47, Pint=0.62) | HIGH | PEER-REVIEWED | PMID 38727700 | Closes the tissue TMB hypothesis; 8D should not use tissue TMB as a predictive biomarker claim | YES |
| V-015 | CO.26 pTMB: threshold is data-driven (minimal P-value approach), NOT pre-specified in CO.26 protocol; GuardantOMNI-specific | HIGH | PEER-REVIEWED | PMID 38727700 (full text) | Critical caveat for any pTMB claim; threshold requires prospective validation | YES |
| V-016 | NCT06934538: biopsy is CONDITIONAL ("only if not representing an unacceptable clinical risk and/or if technically feasible") — Inclusion Criterion #6 | HIGH | PRIMARY REGISTRY | ClinicalTrials.gov API v2 | Limits biomarker data quality; prior canon stated "biopsy required" — that was wrong | YES |
| V-017 | NCT06934538: bevacizumab is OPTIONAL ("mFOLFOX6 with or without bevacizumab") | HIGH | PRIMARY REGISTRY | ClinicalTrials.gov API v2 | Creates immunological heterogeneity; not captured as stratification variable | YES |
| V-018 | NCT06934538: liver metastasis status is NOT an eligibility criterion, stratification variable, or pre-specified covariate | HIGH | PRIMARY REGISTRY | ClinicalTrials.gov API v2 | Confirmed gap; symptomatic ascites excluded but liver met burden not addressed | YES |
| V-019 | NCT06934538: Phase IIa primary endpoint is PFS rate at 12 months (Arm 2A-1, MSS mCRC) | HIGH | PRIMARY REGISTRY | ClinicalTrials.gov API v2 | Defines the interpretability standard for Phase IIa | YES |
| V-020 | NCT06934538: exploratory biomarker timepoints listed as T0, 1m, 2m, 6m, 12m, Tprogression; ctDNA not explicitly named | HIGH | PRIMARY REGISTRY | ClinicalTrials.gov API v2 | "Molecular biomarkers" is the registry language; ctDNA status unconfirmed | YES |
| V-021 | HT29 carries BRAF V600E — established cell line biology (ATCC HTB-38, CCLE, COSMIC) | HIGH | ESTABLISHED CELL LINE BIOLOGY | ATCC/CCLE/COSMIC | Foundational fact for SC-001 conflict; not in dispute | YES |
| V-022 | NCT06934538 Inclusion Criterion #4 requires BRAF wild-type status | HIGH | PRIMARY REGISTRY | ClinicalTrials.gov API v2 | Closes the SC-001 logical chain with V-021 | YES |
| V-023 | EACR 2025 EACR25-1044: haptenated epitopes detected on primed mDCs; CD8+ T cells induced apoptosis in HCT116, HT29, SW620 vs controls | MEDIUM | CONFERENCE ABSTRACT (sponsor-affiliated) | EACR25-1044 | First public mechanistic confirmation of haptenation at antigen presentation level | YES — with caveat: sponsor-affiliated conference abstract |
| V-024 | EACR 2025 EACR25-1044: SW620 used in 3D spheroid model only — NOT a vaccine component | HIGH | CONFERENCE ABSTRACT (sponsor-affiliated) | EACR25-1044 | Prevents misattribution of SW620 as vaccine cell line | YES |
| V-025 | REGONIVO multiomic: CMS4 subtype associated with IO response (p=0.035); CD8+ TIL + M2 macrophage density higher in responders | MEDIUM | PEER-REVIEWED | PMID 38336371 | Hypothesis-generating biomarker finding; BreAK CRC-001 does not capture CMS subtype | YES — with caveat: retrospective, n=25 |

---

## SECTION 2 — PROVISIONAL CLAIMS REQUIRING CAVEAT TAGS IN 8D OUTPUT

These claims are directionally supported but carry residual uncertainty that 8D must tag explicitly.
8D may use these only with the specified caveat language attached.

| ID | Claim text | Confidence | Source type | Caveat required | Why it matters for 8D | 8D can proceed without sponsor data? |
|----|-----------|-----------|------------|----------------|----------------------|--------------------------------------|
| P-001 | STC-1010 is produced from HCT116, HT29, and LoVo cell lines | MEDIUM | 2× CONFERENCE ABSTRACT (sponsor-affiliated) | Must append: "as reported in two sponsor-affiliated conference abstracts (ASCO 2023 e14661; EACR 2025 EACR25-1044); no independent third-party verification" | Cell line identity is foundational to SC-001 conflict and antigen architecture claims | YES — with caveat |
| P-002 | AACR 2026 CT051: n=6, 0 DLTs, 100% DCR, DTH responses observed in all patients | LOW | PRESS RELEASE ONLY (CheckOrphan summary) | Must append: "press-release summary only; quantitative DTH values, per-patient RECIST assessments, and immune biomarker data not publicly available" | Only available first-in-human data; 8D cannot use quantitative values from this source | YES — but only qualitative framing; no quantitative values |
| P-003 | GRANITE GO-010: all-comer HR 0.73; ctDNA-low subgroup HR 0.50 | LOW | PRESS RELEASE ONLY (company, bankrupt) | Must append: "press-release-only; company bankrupt; ctDNA threshold undefined; wide CIs; not peer-reviewed; do not cite externally as evidence of efficacy" | Strongest available enrichment hypothesis; 8D may use as design hypothesis only | YES — as design hypothesis only, not efficacy evidence |
| P-004 | BOT/BAL Phase 2: cORR 19% (n=62); Phase 3 BATTMAN initiated | MEDIUM | CONFERENCE DATA (ASCO GI 2025) — not peer-reviewed | Must append: "conference presentation only; not yet peer-reviewed" | Confirms Phase 1 signal; use with peer-review caveat | YES — with caveat |
| P-005 | Liver mets + Immunoscore-IC-low = IO non-permissive (nuanced framing) | MEDIUM | PEER-REVIEWED secondary analysis (PMID 39908699) | Must append: "exploratory secondary analysis of Phase 2 trial; pMMR not MSS-restricted; interaction tests non-significant (Pint PFS=0.166, OS=0.473); directional observation only" | Replaces prior overstated canon; 8D must use nuanced framing, not the old binary | YES — with caveat |
| P-006 | pTMB ≥28 mut/Mb (GuardantOMNI) predictive of IO benefit in MSS mCRC | MEDIUM | PEER-REVIEWED (PMID 38727700) | Must append: "data-driven threshold (not pre-specified); Pint=0.070 (borderline); GuardantOMNI-specific; derived from 2L+ refractory population; not validated in 1L; requires prospective validation" | Biomarker hypothesis for Phase IIa enrichment; 8D must not present as validated biomarker | YES — with caveat |
| P-007 | AACR 2024 multi-omics analysis confirmed batch-to-batch reproducibility of STC-1010 | LOW | PRESS RELEASE (BioSpace, company-controlled) | Must append: "press-release only; data package not in public record" | Supports manufacturing consistency claim; 8D cannot use specific data values | YES — qualitative only |
| P-008 | MEDITREME: neoantigen-specific T-cell responses associated with better PFS | MEDIUM | PEER-REVIEWED (PMID 37563240) | Must append: "single-arm Phase 1b/2; 3-month PFS primary endpoint is a weak surrogate; no randomized control" | Supports DTH/T-cell response as pharmacodynamic endpoint; validates BreAK CRC-001 DTH rationale | YES — with caveat |

---

## SECTION 3 — BLOCKED CLAIMS — 8D MUST NOT USE

These claims are either unsupported, contradicted by the verified ledger, or carry source-integrity
failures that make them unsafe for any 8D vector. Using these would introduce errors into the
vector space that cannot be corrected without re-running the full pipeline.

| ID | Claim text | Block reason | Ledger reference | Corrective action before unblocking |
|----|-----------|-------------|-----------------|-------------------------------------|
| B-001 | "Biopsy required" (prior canon) | CONTRADICTED by registry. NCT06934538 Inclusion #6 states conditional biopsy only. | C-007 CONTRADICTED | Replace with V-016: "biopsy is conditional" |
| B-002 | "Liver metastases are the single strongest predictor of IO failure in MSS mCRC" (prior canon, unqualified) | OVERSTATED. AtezoTRIBE 2025 (PMID 39908699) shows liver mets are prognostic but not predictive of IO resistance when Immunoscore-IC is high. The binary framing is no longer defensible. | C-003 NUANCED | Replace with P-005 nuanced framing |
| B-003 | "ctDNA mentioned as exploratory biomarker" in BreAK CRC-001 (prior canon) | NOT-FOUND. ctDNA is not explicitly named in NCT06934538 registry. "Molecular biomarkers" is the registry language. The claim that ctDNA is included is unverified. | C-005 NOT-FOUND | Replace with V-020: "molecular biomarkers listed; ctDNA not explicitly named" |
| B-004 | pTMB ≥28 mut/Mb finding attributed to MEDITREME | TRIAL ATTRIBUTION ERROR. The finding is from CO.26 (PMID 38727700), not MEDITREME. MEDITREME has no pTMB analysis in the public record. | AUDIT-04 CORRECTION-01 | Replace with V-013: CO.26 (PMID 38727700) |
| B-005 | GRANITE GO-010 HR values cited without press-release-only tag | SOURCE INTEGRITY FAILURE. These values are press-release-only, company bankrupt, threshold undefined. Citing without explicit tag is a source integrity violation. | C-013 PRESS-RELEASE-ONLY | Attach P-003 caveat before any use |
| B-006 | AACR 2026 CT051 quantitative DTH values (any specific numbers beyond "DTH responses observed") | NOT IN PUBLIC RECORD. No full poster text available. CheckOrphan summary does not contain quantitative DTH data. | C-014 PRESS-RELEASE-ONLY | Blocked until NDA-02 data package received |
| B-007 | "The only MSS CRC IO program with a validated clinical signal" (re: BOT/BAL) | FACTUALLY INCORRECT. RIN NLM ORR 36.4% (PMID 39504677) is also a validated clinical signal in MSS mCRC. | V-009 | Replace with: "BOT/BAL and RIN are the two programs with validated IO signals in no-liver-met MSS mCRC" |
| B-008 | "ORR 36.4% in non-liver-metastatic MSS mCRC is the highest validated IO response rate in this indication" (re: RIN) | OVERSTATED. RIN NLM n=22 is a small subgroup. "Highest validated" overstates certainty. | C-012 MEDIUM confidence | Replace with: "ORR 36.4% in the RIN NLM subgroup (n=22) is among the highest reported IO response rates in MSS mCRC" |
| B-009 | "Six-layer immunosuppressive architecture of MSS CRC — TGF-β-driven exclusion, VEGF-mediated myeloid suppression, MHC-I downregulation, Treg enrichment, M2 macrophage polarization, and liver-mediated immune tolerance" | INFERRED SYNTHESIS. This framing is not sourced to a single peer-reviewed publication. It is a reasonable scientific summary but is not a citable claim. | NOT IN VERIFIED LEDGER | Tag as "mechanistic synthesis" or source each layer to a specific publication before 8D use |
| B-010 | "This is a design failure, not a biology failure" (re: GRANITE GO-010) | INTERPRETIVE CLAIM. The distinction is an editorial interpretation, not a finding from the data. | NOT IN VERIFIED LEDGER | Remove or tag as "editorial interpretation" |
| B-011 | "Bevacizumab has well-characterized immunomodulatory effects — VEGF blockade reduces immunosuppressive myeloid cell recruitment, normalizes tumor vasculature to improve T-cell trafficking" (as a BreAK CRC-001 confounding claim) | INFERRED MECHANISM. Biologically plausible but the specific confounding claim for BreAK CRC-001 is an inference, not a finding from the trial. | NOT IN VERIFIED LEDGER | Tag as "biologically plausible mechanism; not directly tested in BreAK CRC-001" |
| B-012 | "This data package presumably includes antigen characterization per cell line" (re: AACR 2024 multi-omics) | SPECULATION. "Presumably includes" is not a supported claim. The press release confirms multi-omics analysis exists; it does not confirm antigen characterization per cell line is included. | NOT IN VERIFIED LEDGER | Remove "presumably includes antigen characterization per cell line" — replace with "the data package is not in the public record" |

---

## SECTION 4 — CONTRADICTIONS AND DRIFT BETWEEN CURRENT DRAFTS AND VERIFIED LEDGER

Redline-style adjudication of the Design Intelligence Brief (brenus_outreach_brief.md).
Format: Brief location | Brief text (verbatim or paraphrased) | Ledger verdict | Disposition

| # | Brief location | Brief text (verbatim or paraphrased) | Ledger verdict | Disposition |
|---|---------------|--------------------------------------|---------------|-------------|
| D-001 | §2.2, BOT/BAL paragraph | "The only MSS CRC IO program with a validated clinical signal." | CONTRADICTED — RIN NLM ORR 36.4% (PMID 39504677) is also a validated signal. | REPLACE with: "One of two programs with validated IO signals in no-liver-met MSS mCRC (BOT/BAL and RIN)." |
| D-002 | §2.2, RIN paragraph | "ORR 36.4% in non-liver-metastatic MSS mCRC is the highest validated IO response rate in this indication." | OVERSTATED — n=22 NLM subgroup; "highest validated" overstates certainty. | REPLACE with: "ORR 36.4% in the RIN NLM subgroup (n=22) is among the highest reported IO response rates in MSS mCRC." |
| D-003 | §2.3, GRANITE paragraph | "This is a design failure, not a biology failure." | NOT IN VERIFIED LEDGER — interpretive claim not supported by data. | REMOVE or tag as "editorial interpretation." |
| D-004 | §2.1, CheckMate 9X8 lesson | "PD-1 blockade alone cannot overcome the six-layer immunosuppressive architecture of MSS CRC — TGF-β-driven exclusion, VEGF-mediated myeloid suppression, MHC-I downregulation, Treg enrichment, M2 macrophage polarization, and liver-mediated immune tolerance." | NOT IN VERIFIED LEDGER — mechanistic synthesis not sourced to a single peer-reviewed publication. | TAG as "mechanistic synthesis" or source each layer individually before 8D use. |
| D-005 | §3, Constraint 3 | "Bevacizumab has well-characterized immunomodulatory effects — VEGF blockade reduces immunosuppressive myeloid cell recruitment, normalizes tumor vasculature to improve T-cell trafficking, and modulates the tumor immune microenvironment." | NOT IN VERIFIED LEDGER — biologically plausible but not sourced in the ledger. | TAG as "biologically plausible mechanism; not directly tested in BreAK CRC-001" or add specific citations. |
| D-006 | §4, antigen architecture | "This data package presumably includes antigen characterization per cell line." | SPECULATION — "presumably includes" is not supported by the press release text. | REMOVE. Replace with: "the data package is not in the public record." |
| D-007 | §5, Question 1 | "The AACR 2026 CT051 press release reports DTH responses in all 6 Phase Ia patients." | CORRECT but source is press-release-only (CheckOrphan summary). This passage does not label it as press-release-only. | ADD source label: "per press-release summary (CheckOrphan); quantitative DTH data not publicly available." |
| D-008 | §6, Enrichment hypothesis testing | "Using the existing Phase Ia data (n=6, DTH responses, 100% DCR) to generate a prospective enrichment hypothesis for Phase IIa." | PARTIALLY CORRECT — n=6 and 100% DCR are from press-release-only source (C-014). No caveat in this passage. | ADD: "based on press-release summary only; quantitative data not publicly available." |
| D-009 | §6, Translational data interpretation | "The EACR 2025 3D spheroid data (HCT116, HT29, SW620, LoVo co-aggregated with CCD-18Co fibroblasts; CD8+ T-cell killing; IFN-γ production)" | ATTRIBUTION RISK — IFN-γ production is from ASCO 2023 e14661 (CAM model), not EACR 2025 spheroid data. EACR 2025 reports cytokine secretion but does not specifically name IFN-γ in the spheroid model. | VERIFY IFN-γ attribution. If from ASCO 2023 CAM model, label accordingly. Do not conflate CAM and spheroid model readouts. |
| D-010 | §8, Evidence base | "CONFERENCE ABSTRACT: ASCO 2023 e14661 (STC-1010 cell lines, Alzeeb et al.), EACR 2025 EACR25-1044 (STC-1010 3D spheroids, Zbinden et al.)" | CORRECT but incomplete — closure audit established that both are sponsor-affiliated. | ADD: "both are sponsor-affiliated; no independent third-party verification of cell line identity." |
| D-011 | §2.3, Architecture failures | "Sintilimab + bev + XELOX (NCT04194359): ORR 84%, n=25, single-arm, single-center, Chinese population. Uninterpretable." | CORRECT — but no PMID cited. This is a peer-reviewed publication (PMID 37554125). | ADD PMID 37554125 as source. |
| D-012 | §3, Constraint 4 | "A secondary analysis of CO.26 (Loree et al., Clin Cancer Res 2024, PMID 38727700) found that plasma TMB ≥28 mut/Mb (GuardantOMNI) was predictive of benefit from durvalumab + tremelimumab in refractory MSS mCRC (HR 0.34, Pint=0.070)." | CORRECT — trial attribution is correct (CO.26, not MEDITREME). This is the corrected version. | ACCEPT — no change needed. |

---

## SECTION 5 — MISSING SPONSOR DATA REQUIRED BEFORE FULL VECTOR ASSIGNMENT

| ID | Missing data | Affected 8D dimensions | Current 8D status | Sponsor data request | Can 8D proceed with degraded vector? |
|----|-------------|----------------------|------------------|---------------------|--------------------------------------|
| M-001 | CT051 full poster: quantitative DTH values, per-patient RECIST, immune biomarker data, translational correlation (n=6) | Pharmacodynamic signal strength; immune engagement vector; clinical proof-of-concept | DEGRADED — only qualitative "DTH responses observed" available | NDA-02 (Priority 1) | YES — but pharmacodynamic vector will be LOW confidence; no quantitative values |
| M-002 | Antigen overlap data: HT29-derived antigens (BRAF V600E) vs HCT116/LoVo antigens (BRAF WT) vs patient tumor proteomes | Antigen mismatch risk vector; SC-001 conflict resolution | BLOCKED — SC-001 conflict is confirmed; clinical consequence unknown | NDA-01 (Priority 1) | NO — antigen architecture vector cannot be assigned without this data |
| M-003 | Liver met stratification plan: is liver-met status captured as stratification variable or pre-specified covariate in Phase IIa? | Patient selection vector; Phase IIa interpretability score | DEGRADED — registry confirms gap; sponsor intent unknown | NDA-03 (Priority 1) | YES — but patient selection vector will be flagged as UNRESOLVED |
| M-004 | ctDNA platform and threshold specification: is ctDNA included in molecular biomarker panel? What platform? What threshold? | Molecular biomarker vector; enrichment hypothesis testability | BLOCKED — ctDNA not explicitly named in registry | NDA-04 (Priority 2) | NO — molecular biomarker vector cannot be assigned without platform and threshold |
| M-005 | Bevacizumab stratification plan: is bev use captured as stratification variable or pre-specified covariate? | Backbone heterogeneity vector; immune biomarker confounding risk | DEGRADED — registry confirms optional bev; sponsor intent unknown | NDA-05 (Priority 2) | YES — but backbone heterogeneity vector will be flagged as HIGH CONFOUNDING RISK |
| M-006 | KRAS subtype (G12C, G12D, G12V, G13D) and SMAD4 status capture in eCRF | Molecular subgroup vector; liver-met tropism risk | DEGRADED — KRAS mutation required but subtype not specified in registry | NDA-06 (Priority 2) | YES — but molecular subgroup vector will be LOW resolution |
| M-007 | Biopsy compliance rate from Phase Ia experience; biomarker panel specification (IHC, RNA-seq, proteomics) | Tissue biomarker vector; Immunoscore-IC and CMS subtype capture | DEGRADED — conditional biopsy confirmed; compliance rate unknown | NDA-07 (Priority 2) | YES — but tissue biomarker vector will be flagged as MISSING DATA RISK |
| M-008 | Full multi-omics antigen characterization package: proteomics per cell line, batch reproducibility data | Antigen breadth vector; manufacturing consistency | DEGRADED — press release confirms data exists internally; not in public record | NDA-10 (Priority 3) | YES — but antigen breadth vector will be LOW confidence |

---

## SUMMARY — 8D READINESS SCORECARD

| Category | Count | 8D status |
|----------|-------|-----------|
| VERIFIED — safe for 8D use | 25 claims | PROCEED |
| PROVISIONAL — require caveat tags | 8 claims | PROCEED WITH TAGS |
| BLOCKED — 8D must not use | 12 claims | DO NOT USE |
| CONTRADICTIONS/DRIFT in brief | 12 items | REPAIR BEFORE USE |
| MISSING SPONSOR DATA (vector-blocking) | 2 dimensions (M-002, M-004) | BLOCKED |
| MISSING SPONSOR DATA (vector-degraded) | 6 dimensions (M-001, M-003, M-005, M-006, M-007, M-008) | DEGRADED |

**Overall 8D readiness: PARTIAL.**
The comparator failure landscape (V-001 through V-015) and the BreAK CRC-001 registry gap
analysis (V-016 through V-022) are clean and ready for vector assignment. The antigen
architecture vector (M-002) and molecular biomarker vector (M-004) are blocked pending
sponsor data. The first-in-human pharmacodynamic vector (M-001) is degraded to
qualitative-only. Twelve items in the Design Intelligence Brief require repair before the
brief can be used as an 8D input document.
