# Source-Integrity Adjudication
## BreAK CRC-001 Design Intelligence Brief vs. Verified Claim Ledger v1.0
**Adjudication date:** 2026-04-30
**Brief audited:** brenus_outreach_brief.md (brenus_outreach_mdc.md)
**Ledger authority:** brenus_verified_claim_ledger_v1.md (2026-04-27)
**Policy:** Ledger v1.0 is the source of truth. A statement is SUPPORTED only if the ledger
assigns it VERIFIED or CROSS_REFERENCED status from a directly retrieved primary source.
COMPANY_CLAIM, PROVISIONAL, and BLOCKED ledger entries do not support external assertions.

---

## TABLE A — STATEMENTS FULLY SUPPORTED BY RETRIEVED PRIMARY SOURCES

Statements where every factual element maps to a VERIFIED or CROSS_REFERENCED ledger claim
sourced from a directly retrieved primary document (ClinicalTrials.gov API v2, Alzeeb et al.
2024 full text [61], NCT03050814 results [55]).

| # | Brief location | Statement (verbatim or paraphrased) | Ledger claim(s) | Primary source(s) | Verdict |
|---|---------------|-------------------------------------|----------------|-------------------|---------|
| A-01 | §1 | "BreAK CRC-001 (NCT06934538)" | A-001, A-002 | NCT06934538 API [54] | SUPPORTED |
| A-02 | §2.1 | "CheckMate 9X8 (NCT03414983, nivolumab + mFOLFOX6 + bevacizumab, n=196, 1L) HR 0.81 (95%CI 0.53–1.23), p=0.30. mPFS 11.9 vs 11.9 months. Phase 3 not triggered." | V-001, V-002 (from 8D audit; PMID 38485190 retrieved in Session 5) | PMID 38485190 | SUPPORTED |
| A-03 | §2.1 | "QUILT-2.004 (NCT03050814, …, n=30, 1L, terminated) HR 1.061 (95%CI 0.380–2.966), p=0.91. mPFS 8.8 vs 10.1 months." | B-003, B-004, B-005 | NCT03050814 results [55] | SUPPORTED |
| A-04 | §2.1 | QUILT-2.004 "generated multifunctional CD4+/CD8+ T-cell responses in 8/11 IO patients vs 1/8 SOC (p=0.020)" | V-004 (PMID 35274710 retrieved Session 5) | PMID 35274710 | SUPPORTED |
| A-05 | §2.1 | QUILT-2.004 "n=30, terminated early" | B-003, B-004 | NCT03050814 [55] | SUPPORTED |
| A-06 | §3, Constraint 1 | "NCT06934538 does not include liver metastasis status as an eligibility criterion, stratification variable, or pre-specified covariate. Symptomatic ascites is excluded (Exclusion #1), but liver metastasis burden is not addressed." | A-014 (exclusion criteria), V-018 | NCT06934538 API [54] | SUPPORTED |
| A-07 | §3, Constraint 2 | "NCT06934538 Inclusion Criterion #6 states that tumor biopsy is required 'only if not representing an unacceptable clinical risk and/or if technically feasible.'" | A-013, V-016 | NCT06934538 API [54] | SUPPORTED |
| A-08 | §3, Constraint 3 | "NCT06934538 specifies 'mFOLFOX6 with or without bevacizumab.'" | A-009, V-017 | NCT06934538 API [54] | SUPPORTED |
| A-09 | §3, Constraint 4 | "NCT06934538 lists 'immune and molecular biomarkers' as exploratory outcomes with timepoints at T0, 1m, 2m, 6m, 12m, and Tprogression. ctDNA is not explicitly named." | A-013, V-020 | NCT06934538 API [54] | SUPPORTED |
| A-10 | §3, Constraint 4 | "CO.26 (Loree et al., Clin Cancer Res 2024, PMID 38727700) found that plasma TMB ≥28 mut/Mb (GuardantOMNI) was predictive of benefit from durvalumab + tremelimumab in refractory MSS mCRC (HR 0.34, Pint=0.070)." | V-013, V-015 | PMID 38727700 (retrieved Session 5) | SUPPORTED |
| A-11 | §3, Constraint 4 | "tissue TMB cannot [stratify MSS mCRC IO response]" | V-014 | PMID 38727700 | SUPPORTED |
| A-12 | §4 | "HT29 carries BRAF V600E (established cell line biology, ATCC HTB-38, CCLE, COSMIC)." | A-008, V-021 | ATCC/CCLE/COSMIC (established cell line biology) | SUPPORTED |
| A-13 | §4 | "BreAK CRC-001 requires BRAF wild-type status at enrollment." | A-007, A-008, V-022 | NCT06934538 API [54] | SUPPORTED |
| A-14 | §5 | "The Phase IIa primary endpoint is PFS rate at 12 months in MSS mCRC patients (Arm 2A-1)." | A-011, V-019 | NCT06934538 API [54] | SUPPORTED |
| A-15 | §5, Q1 | "Phase I immune monitoring endpoint: DTH score assessed after first vaccination (at 1, 24, 48, 72 hours post-injection) and after 4th, 8th, and every boost." | A-019 | NCT06934538 API [54] | SUPPORTED |
| A-16 | §8 | "QUILT-2.004 (PMID 35274710)" — source attribution | B-005 | NCT03050814 [55]; PMID 35274710 | SUPPORTED |
| A-17 | §8 | "PRIMARY REGISTRY: NCT06934538 (ClinicalTrials.gov API v2)" | All A-series claims | NCT06934538 API [54] | SUPPORTED |
| A-18 | §8 | "pTMB ≥28 mut/Mb finding is from CO.26 (PMID 38727700), not MEDITREME." | V-013 | PMID 38727700 | SUPPORTED |
| A-19 | §3, Constraint 4 | "ctDNA must be pre-specified with a defined platform, threshold, and response definition to generate interpretable evidence" — framing derived from GRANITE GO-010 press-release-only data used as a design lesson, not an efficacy claim | P-003 (design hypothesis use only) | Press release (design lesson framing only) | SUPPORTED — as design lesson only; see Table B for the HR values themselves |
| A-20 | §2.3 | "QUILT-2.004: n=30, terminated early. Underpowered to detect any signal even if present." | B-003, B-004 | NCT03050814 [55] | SUPPORTED |

---

## TABLE B — STATEMENTS SUPPORTED ONLY BY COMPANY-CONTROLLED OR PRESS-RELEASE SOURCES

Statements where the only available support is a company website, press release, BusinessWire,
CheckOrphan summary, or conference abstract from a Brenus-affiliated author. These are
COMPANY_CLAIM or LOW-confidence entries in the ledger. They may be directionally correct but
cannot be asserted as verified facts in an external document.

| # | Brief location | Statement (verbatim or paraphrased) | Ledger entry | Source type | Required caveat |
|---|---------------|-------------------------------------|-------------|-------------|-----------------|
| B-01 | §4 | "The EACR 2025 abstract (EACR25-1044, Zbinden et al., Insphero + Brenus Pharma) and ASCO 2023 abstract e14661 (Alzeeb et al.) both confirm that STC-1010 is produced from three human CRC cell lines: HCT116, HT29, and LoVo." | PARTIAL — EACR25-1044 was retrieved (Session 5); ASCO 2023 e14661 was NOT retrieved in Ledger v1.0 (Blocker B-001: paywall/resolver failure). Both are sponsor-affiliated. | CONFERENCE ABSTRACT (sponsor-affiliated) × 2; ASCO e14661 = BLOCKED in Ledger v1.0 | Must append: "as reported in two sponsor-affiliated conference abstracts; ASCO 2023 e14661 was not independently retrieved in the primary ledger session; no third-party verification of cell line identity" |
| B-02 | §4 | "This is consistent with the AACR 2024 press release." (re: HCT116/HT29/LoVo) | AACR 2024 press release = BLOCKED in Ledger v1.0 (Blocker B-005: Akamai block) | PRESS RELEASE (company-controlled; not retrieved) | Must remove or tag: "AACR 2024 press release was not successfully retrieved in the primary ledger session" |
| B-03 | §4 | "The AACR 2024 press release mentions multi-omics analysis of STC-1010 batches confirming batch-to-batch reproducibility" | AACR 2024 press release = BLOCKED in Ledger v1.0 | PRESS RELEASE (not retrieved) | Must remove or tag as BLOCKED |
| B-04 | §5, Q1 | "The AACR 2026 CT051 press release reports DTH responses in all 6 Phase Ia patients" | C-014 / P-002: press-release summary only (CheckOrphan); quantitative data not available | PRESS RELEASE ONLY (CheckOrphan summary) | Must append: "per press-release summary only; quantitative DTH values, per-patient RECIST, and immune biomarker data not publicly available" |
| B-05 | §6 | "Using the existing Phase Ia data (n=6, DTH responses, 100% DCR)" | C-014 / P-002: press-release summary only | PRESS RELEASE ONLY | Must append: "based on press-release summary only; no peer-reviewed or conference-abstract source for these values" |
| B-06 | §6 | "The EACR 2025 3D spheroid data (HCT116, HT29, SW620, LoVo co-aggregated with CCD-18Co fibroblasts; CD8+ T-cell killing; IFN-γ production)" | EACR25-1044 retrieved (Session 5) — CD8+ T-cell killing confirmed; IFN-γ attribution is from ASCO 2023 e14661 (CAM model, not spheroid model) — ASCO e14661 BLOCKED in Ledger v1.0 | CONFERENCE ABSTRACT (sponsor-affiliated); IFN-γ = BLOCKED source | Must separate: CD8+ T-cell killing is from EACR 2025 (retrieved); IFN-γ production is from ASCO 2023 CAM model (not retrieved in Ledger v1.0 session) — do not conflate |
| B-07 | §6 | "the AACR 2024 multi-omics batch consistency data represent a substantial preclinical evidence base" | AACR 2024 press release = BLOCKED in Ledger v1.0 | PRESS RELEASE (not retrieved) | Must remove or tag as BLOCKED |
| B-08 | §2.2 | "BOT/BAL Phase 2 cORR 19% (n=62). Phase 3 BATTMAN initiated." | P-004: conference data (ASCO GI 2025), not yet peer-reviewed; not in Ledger v1.0 | CONFERENCE DATA (not peer-reviewed) | Must append: "conference presentation only; not yet peer-reviewed" |
| B-09 | §2.2 | "GRANITE GO-010 (NCT05141721, …) All-comer HR 0.73; ctDNA-low subgroup HR 0.50." | P-003: press-release only, company bankrupt, threshold undefined | PRESS RELEASE ONLY (company bankrupt) | Must append: "press-release-only; company bankrupt; ctDNA threshold undefined; not peer-reviewed; do not cite as evidence of efficacy" |
| B-10 | §2.2 | "RIN (NCT04362839, …) NLM ORR 36.4%, mPFS 5.0 months, mOS 27.5 months, 3-year PFS 19.3%. Three patients disease-free >18 months after treatment completion." | V-009, V-010: PEER-REVIEWED (PMID 39504677) — SUPPORTED but n=22 NLM subgroup caveat required | PEER-REVIEWED (n=22 subgroup) | Append: "n=22 NLM subgroup" — see Table A for full support; listed here because "highest validated IO response rate" framing is overstated (see Table C) |
| B-11 | §3, Constraint 1 | "A 2025 secondary analysis of AtezoTRIBE (PMID 39908699, ESMO Open) found that liver mets were prognostic but not predictive of atezolizumab resistance in pMMR mCRC (Pint PFS=0.990, OS=0.800), with Immunoscore-IC retaining directional predictive impact in the liver-met subgroup." | V-011, V-012: PEER-REVIEWED but exploratory secondary analysis; pMMR not MSS-restricted; Pint for Immunoscore-IC non-significant | PEER-REVIEWED (exploratory secondary analysis) | Must append: "exploratory secondary analysis; pMMR not MSS-restricted; Immunoscore-IC interaction non-significant (Pint PFS=0.166, OS=0.473)" |

---

## TABLE C — STATEMENTS BLOCKED, UNVERIFIED, OR CONTRADICTED BY THE LEDGER

Statements that are directly contradicted by a VERIFIED ledger entry, depend on a BLOCKED
source, assert something the ledger explicitly marks as COMPANY_CLAIM or PROVISIONAL, or
make an inference the ledger does not support.

| # | Brief location | Statement (verbatim or paraphrased) | Ledger verdict | Block reason | Severity |
|---|---------------|-------------------------------------|---------------|-------------|----------|
| C-01 | §4 | "The EACR 2025 abstract (EACR25-1044, Zbinden et al., Insphero + Brenus Pharma) and ASCO 2023 abstract e14661 (Alzeeb et al.) both confirm that STC-1010 is produced from three human CRC cell lines: HCT116, HT29, and LoVo." | ASCO 2023 e14661 = BLOCKED (Ledger Blocker B-001: paywall/resolver failure — not retrieved). The word "confirm" is not warranted when one of the two cited sources was not retrieved. | ASCO e14661 NOT RETRIEVED in Ledger v1.0 session | CRITICAL |
| C-02 | §4 | "This is consistent with the AACR 2024 press release." | AACR 2024 press release = BLOCKED (Ledger Blocker B-005: Akamai block — not retrieved) | AACR 2024 NOT RETRIEVED | HIGH |
| C-03 | §4 | "The AACR 2024 press release mentions multi-omics analysis of STC-1010 batches confirming batch-to-batch reproducibility — this data package presumably includes antigen characterization per cell line." | AACR 2024 NOT RETRIEVED; "presumably includes" = speculation not supported by any retrieved source | BLOCKED + SPECULATION | HIGH |
| C-04 | §2.2 | "The only MSS CRC IO program with a validated clinical signal." (re: BOT/BAL) | CONTRADICTED — RIN NLM ORR 36.4% (PMID 39504677, V-009) is also a validated clinical signal in MSS mCRC. The claim is factually incorrect. | FACTUALLY INCORRECT | HIGH |
| C-05 | §2.2 | "ORR 36.4% in non-liver-metastatic MSS mCRC is the highest validated IO response rate in this indication." (re: RIN) | OVERSTATED — n=22 NLM subgroup. "Highest validated" overstates certainty for a subgroup of 22. Ledger assigns MEDIUM confidence (V-009). | OVERSTATED | MEDIUM |
| C-06 | §2.3 | "This is a design failure, not a biology failure." (re: GRANITE GO-010) | NOT IN LEDGER — interpretive editorial claim. The trial failed; the reason is not established from any retrieved source. | UNSOURCED INTERPRETATION | MEDIUM |
| C-07 | §2.1 | "PD-1 blockade alone cannot overcome the six-layer immunosuppressive architecture of MSS CRC — TGF-β-driven exclusion, VEGF-mediated myeloid suppression, MHC-I downregulation, Treg enrichment, M2 macrophage polarization, and liver-mediated immune tolerance." | NOT IN LEDGER — mechanistic synthesis. No single retrieved source supports this six-layer enumeration as a citable claim. | UNSOURCED SYNTHESIS | MEDIUM |
| C-08 | §3, Constraint 3 | "Bevacizumab has well-characterized immunomodulatory effects — VEGF blockade reduces immunosuppressive myeloid cell recruitment, normalizes tumor vasculature to improve T-cell trafficking, and modulates the tumor immune microenvironment." | NOT IN LEDGER — biologically plausible but no retrieved source in Ledger v1.0 supports this specific claim. The confounding inference for BreAK CRC-001 is an extrapolation. | UNSOURCED MECHANISM | MEDIUM |
| C-09 | §6 | "IFN-γ production" attributed to EACR 2025 3D spheroid data | ATTRIBUTION ERROR — IFN-γ production is from ASCO 2023 e14661 (CAM model). ASCO e14661 is BLOCKED in Ledger v1.0. EACR 2025 reports cytokine secretion but does not specifically name IFN-γ in the spheroid model in the retrieved text. | BLOCKED SOURCE + ATTRIBUTION RISK | HIGH |
| C-10 | §8 | "CONFERENCE ABSTRACT: ASCO 2023 e14661 (STC-1010 cell lines, Alzeeb et al.)" listed as a source in the evidence base | ASCO 2023 e14661 = BLOCKED in Ledger v1.0 (not retrieved). Listing it as a source in the evidence base without noting it was not retrieved is a source integrity failure. | BLOCKED SOURCE LISTED AS RETRIEVED | HIGH |
| C-11 | §5, Q1 | "The AACR 2026 CT051 press release reports DTH responses in all 6 Phase Ia patients — this is the right readout." | PARTIALLY BLOCKED — source is press-release summary only (CheckOrphan). The passage does not label it as press-release-only. Presenting it without caveat implies a higher evidence tier than the ledger assigns (LOW confidence, P-002). | MISSING CAVEAT ON BLOCKED SOURCE | MEDIUM |
| C-12 | §6 | "Using the existing Phase Ia data (n=6, DTH responses, 100% DCR) to generate a prospective enrichment hypothesis" | PARTIALLY BLOCKED — n=6, 100% DCR are from press-release summary only (C-014/P-002). No caveat in this passage. | MISSING CAVEAT ON BLOCKED SOURCE | MEDIUM |
| C-13 | §6 | "the AACR 2024 multi-omics batch consistency data represent a substantial preclinical evidence base" | BLOCKED — AACR 2024 press release not retrieved (Ledger Blocker B-005). Cannot characterize as "substantial preclinical evidence base." | BLOCKED SOURCE | HIGH |
| C-14 | §4 | Implicit claim that HCT116, HT29, LoVo are "confirmed" components of clinical STC-1010 | PROVISIONAL in Ledger v1.0 (Blocker B-001). Ledger v1.0 explicitly states: "HCT116/HT29/LoVo attribution is NOT confirmed in any source retrieved in this session." The word "confirm" in the brief is not warranted. | PROVISIONAL — NOT CONFIRMED IN LEDGER v1.0 | CRITICAL |
| C-15 | §4 | "The haptenization mechanism is designed to expose shared tumor antigens — stress-response proteins (HSPs, calreticulin, HMGB1), damage-associated molecular patterns, and broadly expressed tumor-associated antigens" | PARTIALLY SUPPORTED — DNFB haptenation is CROSS_REFERENCED (D-003). HSP/calreticulin/HMGB1 as the specific immunogenic payload is NOT in Ledger v1.0. Alzeeb et al. 2024 [61] does not name these specific proteins as the dominant payload in the human product. | PARTIALLY UNSOURCED | LOW |
| C-16 | §2.2 | "BOT/BAL Phase 2 cORR 19% (n=62). Phase 3 BATTMAN initiated." presented without peer-review caveat | NOT IN LEDGER v1.0 — conference data (ASCO GI 2025), not peer-reviewed, not retrieved in Ledger v1.0 session | NOT IN LEDGER v1.0 | MEDIUM |

---

## TABLE D — EXACT REWRITE LANGUAGE FOR EVERY UNSAFE STATEMENT

For each item in Table C, the exact replacement text that is safe for external use.
Format: [C-##] → UNSAFE TEXT → SAFE REWRITE

---

**[C-01 / C-14] — CRITICAL: HCT116/HT29/LoVo "confirmed" cell line claim**

UNSAFE:
> "The EACR 2025 abstract (EACR25-1044, Zbinden et al., Insphero + Brenus Pharma) and ASCO 2023 abstract e14661 (Alzeeb et al.) both confirm that STC-1010 is produced from three human CRC cell lines: HCT116, HT29, and LoVo."

SAFE REWRITE:
> "The EACR 2025 abstract (EACR25-1044, Zbinden et al., Insphero + Brenus Pharma) reports that STC-1010 is produced from HCT116, HT-29, and LoVo cell lines. ASCO 2023 abstract e14661 (Alzeeb et al.) is cited as a second source for this claim; however, that abstract was not independently retrieved in our primary source session due to access limitations. Both sources are sponsor-affiliated. The specific human cell line composition of clinical STC-1010 has not been confirmed by an independent third party."

---

**[C-02] — AACR 2024 press release cited as corroborating source**

UNSAFE:
> "This is consistent with the AACR 2024 press release."

SAFE REWRITE:
> [Remove sentence entirely. The AACR 2024 press release was not successfully retrieved in the primary source session and cannot be cited as corroborating evidence.]

---

**[C-03] — AACR 2024 multi-omics / "presumably includes" speculation**

UNSAFE:
> "The AACR 2024 press release mentions multi-omics analysis of STC-1010 batches confirming batch-to-batch reproducibility — this data package presumably includes antigen characterization per cell line."

SAFE REWRITE:
> "Brenus has stated publicly that multi-omics analysis of STC-1010 batches has been conducted to assess batch-to-batch reproducibility. The data package is not in the public record. Whether it includes antigen characterization per cell line is unknown."

---

**[C-04] — BOT/BAL "only program with a validated clinical signal"**

UNSAFE:
> "The only MSS CRC IO program with a validated clinical signal."

SAFE REWRITE:
> "One of two programs with validated IO signals in no-liver-met MSS mCRC. BOT/BAL (ORR 17%, PMID 38871975) and RIN (ORR 36.4% in the NLM subgroup, n=22, PMID 39504677) are the two programs with peer-reviewed evidence of IO activity in this population."

---

**[C-05] — RIN "highest validated IO response rate"**

UNSAFE:
> "ORR 36.4% in non-liver-metastatic MSS mCRC is the highest validated IO response rate in this indication."

SAFE REWRITE:
> "ORR 36.4% in the RIN NLM subgroup (n=22, PMID 39504677) is among the highest reported IO response rates in MSS mCRC. The small subgroup size (n=22) limits the certainty of this ranking."

---

**[C-06] — GRANITE "design failure, not biology failure"**

UNSAFE:
> "This is a design failure, not a biology failure."

SAFE REWRITE:
> "The trial was not designed to test the enrichment hypothesis it retrospectively identified. Whether the underlying biology is capable of generating a clinical signal in a prospectively enriched population remains unknown."

---

**[C-07] — Six-layer immunosuppressive architecture**

UNSAFE:
> "PD-1 blockade alone cannot overcome the six-layer immunosuppressive architecture of MSS CRC — TGF-β-driven exclusion, VEGF-mediated myeloid suppression, MHC-I downregulation, Treg enrichment, M2 macrophage polarization, and liver-mediated immune tolerance."

SAFE REWRITE:
> "PD-1 blockade alone was insufficient to improve PFS in 1L MSS mCRC (CheckMate 9X8: HR 0.81, p=0.30, PMID 38485190). The mechanisms underlying IO resistance in MSS CRC are multifactorial and include, among others, T-cell exclusion, myeloid immunosuppression, and liver-mediated immune tolerance — though the relative contribution of each mechanism in the clinical setting has not been established in a single peer-reviewed source."

---

**[C-08] — Bevacizumab immunomodulatory effects as BreAK CRC-001 confounding claim**

UNSAFE:
> "Bevacizumab has well-characterized immunomodulatory effects — VEGF blockade reduces immunosuppressive myeloid cell recruitment, normalizes tumor vasculature to improve T-cell trafficking, and modulates the tumor immune microenvironment."

SAFE REWRITE:
> "Bevacizumab's anti-VEGF mechanism has been associated with immunomodulatory effects in preclinical and translational studies, including effects on myeloid cell recruitment and tumor vasculature. Whether these effects materially confound immune biomarker interpretation in BreAK CRC-001 has not been directly tested. Capturing bevacizumab use as a pre-specified covariate would allow this question to be addressed in the Phase IIa analysis."

---

**[C-09] — IFN-γ attributed to EACR 2025 spheroid data**

UNSAFE:
> "The EACR 2025 3D spheroid data (HCT116, HT29, SW620, LoVo co-aggregated with CCD-18Co fibroblasts; CD8+ T-cell killing; IFN-γ production)"

SAFE REWRITE:
> "The EACR 2025 3D spheroid data (EACR25-1044, Zbinden et al.) reports CD8+ T-cell-mediated apoptosis in HCT116, HT29, and SW620 cells and cytokine secretion in co-culture with CCD-18Co fibroblasts. IFN-γ production was reported in a separate CAM model study (ASCO 2023 e14661, Alzeeb et al.); that abstract was not independently retrieved in our primary source session."

---

**[C-10] — ASCO 2023 e14661 listed as retrieved source in evidence base**

UNSAFE:
> "CONFERENCE ABSTRACT: ASCO 2023 e14661 (STC-1010 cell lines, Alzeeb et al.)"

SAFE REWRITE:
> "CONFERENCE ABSTRACT (NOT INDEPENDENTLY RETRIEVED): ASCO 2023 e14661 (Alzeeb et al.) — cited in secondary sources; access was not achieved in the primary source session due to paywall restrictions. Claims dependent on this abstract are PROVISIONAL."

---

**[C-11] — CT051 DTH claim without press-release caveat**

UNSAFE:
> "The AACR 2026 CT051 press release reports DTH responses in all 6 Phase Ia patients — this is the right readout."

SAFE REWRITE:
> "A press-release summary (CheckOrphan, AACR 2026 CT051) reports that DTH responses were observed in all 6 Phase Ia patients. Quantitative DTH values, per-patient RECIST assessments, and immune biomarker data are not publicly available. The DTH readout is the appropriate pharmacodynamic endpoint for a hapten-mediated vaccine mechanism."

---

**[C-12] — Phase Ia data used without press-release caveat**

UNSAFE:
> "Using the existing Phase Ia data (n=6, DTH responses, 100% DCR) to generate a prospective enrichment hypothesis for Phase IIa."

SAFE REWRITE:
> "Using the available Phase Ia summary data (n=6, DTH responses observed in all patients, 100% DCR — per press-release summary only; quantitative data not publicly available) as a starting point for generating a prospective enrichment hypothesis for Phase IIa."

---

**[C-13] — AACR 2024 multi-omics as "substantial preclinical evidence base"**

UNSAFE:
> "the AACR 2024 multi-omics batch consistency data represent a substantial preclinical evidence base"

SAFE REWRITE:
> "Brenus has reported multi-omics batch consistency data for STC-1010 (AACR 2024). The data package is not in the public record and was not retrieved in our primary source session. The characterization of this dataset as a 'substantial preclinical evidence base' cannot be independently verified."

---

**[C-15] — HSP/calreticulin/HMGB1 as specific immunogenic payload**

UNSAFE:
> "stress-response proteins (HSPs, calreticulin, HMGB1), damage-associated molecular patterns, and broadly expressed tumor-associated antigens — that are not mutation-specific"

SAFE REWRITE:
> "The haptenization mechanism is designed to expose broadly shared tumor antigens, including stress-response proteins and damage-associated molecular patterns. The specific immunogenic payload of clinical STC-1010 — including which proteins are dominant and whether they are mutation-specific — has not been characterized in any retrieved peer-reviewed source."

---

**[C-16] — BOT/BAL Phase 2 data without peer-review caveat**

UNSAFE:
> "Phase 2 cORR 19% (n=62). Phase 3 BATTMAN initiated." (presented without caveat)

SAFE REWRITE:
> "Phase 2 cORR 19% (n=62, BOT 75mg+BAL; conference presentation, ASCO GI 2025, not yet peer-reviewed). Phase 3 BATTMAN initiated."

---

## SPECIAL FOCUS ADJUDICATIONS

### SF-1: HCT116/HT29/LoVo as "confirmed" clinical STC-1010 components

**Ledger v1.0 verdict (Contradiction C-005, Blocker B-001):**
The Verified Claim Ledger v1.0 explicitly states: *"HCT116/HT29/LoVo attribution is NOT confirmed in any source retrieved in this session."* The only peer-reviewed source retrieved (Alzeeb et al. 2024, [61]) uses exclusively MURINE cell lines. The Brenus website [58] states human cell lines are used but does not name them. ASCO 2023 e14661 — the primary source for the human cell line claim — was NOT retrieved (paywall/resolver failure, Blocker B-001).

**Brief statement:** §4 states these abstracts "both confirm" the cell lines. This is BLOCKED.

**Disposition:** CRITICAL BLOCK. The word "confirm" must be removed. The claim is PROVISIONAL at best, dependent on a source not retrieved in the Ledger v1.0 session. See rewrite [C-01/C-14].

**Note on Session 5 vs. Ledger v1.0:** ASCO 2023 e14661 was successfully retrieved in Session 5 (after Ledger v1.0 was generated). The 8D audit (Session 6) therefore assigns P-001 (PROVISIONAL with caveat) rather than BLOCKED. However, the Ledger v1.0 — the designated source of truth for this adjudication — does not contain that retrieval. The brief must be adjudicated against Ledger v1.0 as instructed. The brief's §8 evidence base lists ASCO e14661 as a source without noting it was not retrieved in the ledger session — this is a source integrity failure regardless of Session 5 retrieval.

---

### SF-2: "200 antigens/proteins" claim

**Ledger v1.0 verdict (Contradiction C-004, Claim D-002):**
*"'Over 200 cancer-related proteins' appears only on Brenus company website [58]. No peer-reviewed source uses this figure. Agent 5 incorrectly elevated a company marketing claim to VERIFIED status."* Ledger assigns: COMPANY_CLAIM.

**Brief statement:** The brief does not use the "200 antigens" figure directly. It references "stress-response proteins (HSPs, calreticulin, HMGB1)" as the immunogenic payload — a related but distinct claim that is also not in the ledger (see C-15).

**Disposition:** The "200 antigens" claim does not appear verbatim in the brief. However, any downstream document that inherits from the brief must not elevate this figure above COMPANY_CLAIM. If the brief is used to generate 8D vectors, the antigen count claim must carry the COMPANY_CLAIM tag.

---

### SF-3: Human clinical efficacy claims beyond what is publicly retrieved

**Ledger v1.0 verdict (Blocker B-003):**
*"No clinical efficacy or safety data for STC-1010 in humans has been retrieved. BreAK CRC-001 has no results posted (hasResults=false in registry [54]). Trial started 2025-06-17."*

**Brief statements implying human clinical efficacy:**
- §5, Q1: "DTH responses in all 6 Phase Ia patients" — PRESS RELEASE ONLY (C-11)
- §5, Q1: "100% DCR" — PRESS RELEASE ONLY (C-12)
- §6: "Phase Ia data (n=6, DTH responses, 100% DCR)" — PRESS RELEASE ONLY (C-12)

**Disposition:** All three passages imply human clinical efficacy. All three depend on a press-release summary (CheckOrphan, AACR 2026 CT051) that is not a retrieved primary source. None can be presented as verified clinical evidence. See rewrites [C-11] and [C-12].

---

### SF-4: Comparators framed as positive precedent when ledger classifies as negative or terminated

**QUILT-2.004 (NCT03050814):**
- Ledger v1.0 Contradiction C-006: *"Prior agent framing emphasized design similarity without surfacing the negative efficacy outcome and early termination."*
- Brief §2.1 correctly states HR 1.061, p=0.91, terminated — this is accurate.
- Brief §2.1 frames QUILT-2.004 as "the closest structural comparator" and draws a mechanistic lesson ("priming-without-trafficking"). This framing is editorially reasonable but the mechanistic lesson is an inference not in the ledger.
- **Disposition:** QUILT-2.004 efficacy data is correctly presented as negative. The mechanistic inference ("priming-without-trafficking failure mode") is not in the ledger — tag as editorial interpretation.

**GRANITE GO-010:**
- Ledger v1.0: press-release-only, company bankrupt.
- Brief §2.2 correctly labels it as press-release-only with caveat. The "design failure, not biology failure" framing is an unsourced interpretation (C-06).
- **Disposition:** HR values require press-release tag (already present in brief). "Design failure" framing requires removal or editorial tag (C-06 rewrite).

**Sintilimab + bev + XELOX (NCT04194359):**
- Brief §2.3: "ORR 84%, n=25, single-arm, single-center, Chinese population. Uninterpretable."
- Not in Ledger v1.0 (no PMID cited in brief; PMID 37554125 exists but not retrieved in ledger session).
- **Disposition:** The "uninterpretable" characterization is correct. Add PMID 37554125 as source.

---

## SUMMARY SCORECARD

| Category | Count | Severity distribution |
|----------|-------|----------------------|
| Table A — Fully supported | 20 statements | — |
| Table B — Company/press-release only | 11 statements | Require caveat tags |
| Table C — Blocked/contradicted/unverified | 16 statements | 3 CRITICAL, 7 HIGH, 6 MEDIUM |
| Table D — Rewrites provided | 16 rewrites | All unsafe statements addressed |

**Most critical failures:**
1. **C-01/C-14 (CRITICAL):** "Confirm" language for HCT116/HT29/LoVo cell lines — ASCO e14661 not retrieved in Ledger v1.0; both sources sponsor-affiliated
2. **C-02/C-03/C-13 (HIGH):** AACR 2024 press release cited three times — not retrieved in Ledger v1.0 (Akamai block)
3. **C-04 (HIGH):** BOT/BAL "only program" claim — factually incorrect; RIN is also validated
4. **C-09/C-10 (HIGH):** IFN-γ attributed to EACR 2025 spheroid data; ASCO e14661 listed as retrieved source in evidence base — both incorrect
5. **C-11/C-12 (MEDIUM):** CT051 press-release data presented without caveat in two passages

**The brief's §8 evidence base is the most structurally problematic section:** it lists ASCO 2023 e14661 as a source without noting it was not retrieved in the Ledger v1.0 session, and it does not note that the AACR 2024 press release was blocked. This creates a false impression of source completeness.
