# Contradiction Ledger v2 — BreAK CRC-001 / STC-1010 Evidence Audit
Generated: 2026-04-30
Scope: All claims in prior Agent 1–4 canon vs. evidence retrieved in this session.
Evidence hierarchy: PEER-REVIEWED > CONFERENCE-ABSTRACT > PRESS-RELEASE > REGISTRY-ONLY > INFERRED

---

## LEGEND
- STATUS: CONFIRMED | NUANCED | CONTRADICTED | NEW-FINDING | NOT-FOUND | QUARANTINED
- CONFIDENCE: HIGH (peer-reviewed, n>100) | MEDIUM (peer-reviewed, n<100 or conference) | LOW (press-release or single-arm) | UNVERIFIABLE (no public source)
- ACTION: ACCEPT | ACCEPT-WITH-CAVEAT | REPLACE | FLAG-FOR-NDA | QUARANTINE

---

## SECTION 1: CELL LINE IDENTITY (B-001)

### C-001 — STC-1010 cell line identity
- PRIOR CANON: "HCT116, HT29, LoVo" (stated in Agent 4 dossier, source: company website)
- NEW EVIDENCE: ASCO 2023 e14661 [11]: "three CRC human cell lines (HCT116, HT29 and Lovo)" — PEER-REVIEWED-ADJACENT (ASCO abstract)
- NEW EVIDENCE: EACR 2025 EACR25-1044 [12]: "HCT116, HT-29, and LoVo cell lines" — CONFERENCE ABSTRACT
- NEW EVIDENCE: AACR 2024 press release [13]: "three human colorectal cancer cell lines: HCT116, HT29, and LoVo" — PRESS RELEASE
- STATUS: CONFIRMED — three independent sources, two conference-abstract level
- CONFIDENCE: HIGH (three concordant sources, two conference-abstract level)
- ACTION: ACCEPT — B-001 CLOSED. Remove PROVISIONAL tag from all outputs.

### C-002 — SC-001 conflict: HT29 BRAF V600E vs BreAK CRC-001 BRAF WT eligibility
- PRIOR CANON: "SC-001 conflict flagged as PROVISIONAL pending B-001 resolution"
- NEW EVIDENCE: B-001 now CONFIRMED. HT29 is confirmed as a vaccine component. HT29 carries BRAF V600E (established cell line biology, not in dispute). BreAK CRC-001 Inclusion #4 requires "BRAF WT" (registry NCT06934538).
- STATUS: CONFIRMED CONFLICT — SC-001 is now a real, documented scientific conflict.
- CONFIDENCE: HIGH — cell line biology is established; eligibility criterion is in registry
- SCIENTIFIC IMPLICATION: Patients treated with STC-1010 will be BRAF WT, but the vaccine contains antigens derived from a BRAF V600E cell line (HT29). The BRAF V600E mutation drives a distinct transcriptional program (MAPK pathway hyperactivation, altered antigen expression). Antigens overexpressed in BRAF V600E HT29 may not be expressed in BRAF WT patient tumors. This is a potential antigen mismatch.
- COUNTERARGUMENT: Haptenization is designed to broaden antigen coverage beyond mutation-specific antigens. The stress conditions (irradiation, heat shock, chemotherapy) may expose shared tumor antigens not dependent on BRAF status. This is a testable hypothesis but not yet tested in public data.
- ACTION: FLAG-FOR-NDA — this is a Priority 1 NDA ask. Brenus must provide antigen overlap data between HT29-derived antigens and BRAF WT patient tumor proteomes.

---

## SECTION 2: LIVER METASTASIS FRAMING

### C-003 — "Liver mets = IO non-permissive" (prior canon)
- PRIOR CANON: "Liver metastases are the single strongest predictor of IO failure in MSS mCRC" (Agent 3/4 canon)
- NEW EVIDENCE: AtezoTRIBE 2025 secondary analysis (PMID 39908699): In pMMR patients (n=202), liver mets associated with worse prognosis (PFS p=0.002, OS p=0.011) but do NOT predict resistance to atezolizumab (Pint PFS=0.990, OS=0.800). Immunoscore-IC retains predictive impact in liver-met subgroup.
- SUPPORTING EVIDENCE (unchanged): BOT/BAL Phase 1 (PMID 38871975): ORR 17% in no-liver-met MSS mCRC. RIN (PMID 39504677): ORR 36.4% in NLM vs near-zero in liver-met. REGONIVO (PMID 32343640): liver met status not stratified but NLM signal consistent.
- STATUS: NUANCED — prior canon is partially correct but overstated. The correct framing is:
  - "Liver mets + Immunoscore-IC-low = IO non-permissive" (AtezoTRIBE 2025)
  - "Liver mets alone = worse prognosis but not necessarily IO-resistant" (AtezoTRIBE 2025)
  - "No-liver-met restriction is the best validated patient selection strategy for IO in MSS mCRC" (BOT/BAL, RIN — unchanged)
- CONFIDENCE: MEDIUM — AtezoTRIBE 2025 is peer-reviewed but exploratory secondary analysis; BOT/BAL and RIN are peer-reviewed but refractory-line
- ACTION: ACCEPT-WITH-CAVEAT — update all outputs to use nuanced framing. Do not use "liver mets alone = IO failure" as a standalone claim.

### C-004 — BreAK CRC-001 liver met handling
- PRIOR CANON: "No liver met restriction in BreAK CRC-001" (registry-derived)
- NEW EVIDENCE: Confirmed from NCT06934538 registry — no liver met restriction, no stratification, no covariate. Symptomatic ascites excluded (Exclusion #1) but liver met burden not addressed.
- STATUS: CONFIRMED GAP — BreAK CRC-001 does not capture liver met status as a stratification variable or covariate.
- CONFIDENCE: HIGH — registry is definitive
- ACTION: FLAG-FOR-NDA — Priority 1 NDA ask. Liver met status should be captured as a stratification variable or at minimum as a covariate in Phase IIa analysis.

---

## SECTION 3: CTDNA AND BIOMARKER ENDPOINTS

### C-005 — ctDNA use in BreAK CRC-001
- PRIOR CANON: "ctDNA mentioned as exploratory biomarker" (Agent 4 dossier)
- NEW EVIDENCE: Registry NCT06934538: "immune and molecular biomarkers" listed as exploratory outcomes. ctDNA not explicitly named. Timepoints listed: T0, 1m, 2m, 6m, 12m, Tprogression.
- STATUS: NOT-FOUND — ctDNA is not explicitly named in the registry. "Molecular biomarkers" may include ctDNA but this is not confirmed.
- CONFIDENCE: UNVERIFIABLE — requires NDA data package
- ACTION: FLAG-FOR-NDA — Priority 2 NDA ask. Confirm whether ctDNA is included in the molecular biomarker panel and what platform is used.

### C-006 — pTMB as predictive biomarker (new finding)
- PRIOR CANON: "TMB not predictive in MSS mCRC" (Agent 3 canon, based on tissue TMB data)
- NEW EVIDENCE: MEDITREME/CO.26 biomarker analysis (PMID 38727700): pTMB (plasma) ≥28 mut/Mb predictive of benefit (HR 0.34, p=0.022). Tissue TMB NOT predictive (confirmed).
- STATUS: NEW-FINDING — plasma TMB (pTMB) is predictive; tissue TMB is not. This distinction was not in prior canon.
- CONFIDENCE: MEDIUM — peer-reviewed but single-arm Phase 1b/2, n=57, exploratory threshold
- ACTION: ACCEPT-WITH-CAVEAT — update biomarker hypothesis list. pTMB ≥28 mut/Mb is a hypothesis-generating finding, not a validated biomarker. BreAK CRC-001 does not capture pTMB.

### C-007 — Biopsy schedule in BreAK CRC-001
- PRIOR CANON: "Biopsy required" (Agent 4 dossier)
- NEW EVIDENCE: Registry NCT06934538 Inclusion #6: "only if not representing an unacceptable clinical risk and/or if technically feasible"
- STATUS: CONTRADICTED — biopsy is CONDITIONAL, not mandatory. Prior canon overstated.
- CONFIDENCE: HIGH — registry is definitive
- ACTION: REPLACE — update all outputs to "conditional biopsy" not "required biopsy". This limits biomarker data quality for Phase IIa.

---

## SECTION 4: BEVACIZUMAB STRUCTURE

### C-008 — Bevacizumab optionality in BreAK CRC-001
- PRIOR CANON: "mFOLFOX6 ± bevacizumab" (registry-derived, correctly stated)
- NEW EVIDENCE: Confirmed from NCT06934538 registry. Bevacizumab is optional.
- STATUS: CONFIRMED — prior canon correct.
- CONFIDENCE: HIGH — registry is definitive
- SCIENTIFIC IMPLICATION: Bevacizumab has immunomodulatory effects (VEGF blockade reduces immunosuppressive myeloid cells, normalizes tumor vasculature). Optional use creates immunological heterogeneity within the trial. Patients with vs without bevacizumab may have different immune microenvironments. This is not captured as a stratification variable.
- ACTION: FLAG-FOR-NDA — Priority 2 NDA ask. Confirm whether bevacizumab use will be captured as a stratification variable or covariate in Phase IIa analysis.

---

## SECTION 5: COMPARATOR TRIAL EFFICACY DATA

### C-009 — QUILT-2.004 PFS values
- PRIOR CANON: "HR 1.061, mPFS 8.8 vs 10.1 months" (Agent 3 canon)
- NEW EVIDENCE: PMID 35274710 confirmed: HR 1.061 (95%CI 0.380–2.966), p=0.91; mPFS 8.8 vs 10.1 months.
- STATUS: CONFIRMED — prior canon correct.
- CONFIDENCE: HIGH — peer-reviewed
- ACTION: ACCEPT

### C-010 — CheckMate 9X8 PFS values
- PRIOR CANON: "HR 0.81, p=0.30, mPFS 11.9 vs 11.9 months" (Agent 3 canon)
- NEW EVIDENCE: PMID 38485190 confirmed: HR 0.81 (95%CI 0.53–1.23), p=0.30; mPFS 11.86 vs 11.93 months.
- STATUS: CONFIRMED — prior canon correct.
- CONFIDENCE: HIGH — peer-reviewed
- ACTION: ACCEPT

### C-011 — BOT/BAL Phase 1 ORR
- PRIOR CANON: "ORR 17% in no-liver-met MSS mCRC" (Agent 3 canon)
- NEW EVIDENCE: PMID 38871975 confirmed: ORR 17% (95%CI 10–26%), DCR 61%, n=101 response-evaluable MSS mCRC (no liver mets).
- STATUS: CONFIRMED — prior canon correct.
- CONFIDENCE: HIGH — peer-reviewed
- ACTION: ACCEPT

### C-012 — RIN NLM subgroup ORR
- PRIOR CANON: "ORR 36.4% in NLM subgroup" (Agent 3 canon)
- NEW EVIDENCE: PMID 39504677 confirmed: NLM n=22, ORR 36.4%, mPFS 5.0 months, mOS 27.5 months, 3-year PFS 19.3%.
- STATUS: CONFIRMED — prior canon correct.
- CONFIDENCE: MEDIUM — peer-reviewed but n=22 NLM subgroup
- ACTION: ACCEPT

### C-013 — GRANITE GO-010 HR values
- PRIOR CANON: "HR 0.73 all-comers, HR 0.50 ctDNA-low" (Agent 3 canon)
- NEW EVIDENCE: Press release only — no peer-reviewed publication found. Company bankrupt.
- STATUS: CONFIRMED AS PRESS-RELEASE-ONLY — prior canon correctly flagged this.
- CONFIDENCE: LOW — press-release only
- ACTION: ACCEPT-WITH-CAVEAT — maintain press-release-only tag. Do not cite externally.

---

## SECTION 6: FIRST-IN-HUMAN DATA (B-003)

### C-014 — AACR 2026 CT051 first-in-human data
- PRIOR CANON: "n=6, 0 DLTs, 100% DCR, DTH responses observed" (CheckOrphan summary [9])
- NEW EVIDENCE: No full poster text found in public sources. CheckOrphan summary is the only public source.
- STATUS: PRESS-RELEASE-ONLY — quantitative DTH data, per-patient biomarker data, and actual RECIST assessments not publicly available.
- CONFIDENCE: LOW — press-release summary only
- ACTION: FLAG-FOR-NDA — Priority 1 NDA ask. Full CT051 poster data package required.

---

## SECTION 7: NEW FINDINGS NOT IN PRIOR CANON

### N-001 — CMS4 subtype associated with IO response in MSS mCRC (REGONIVO)
- SOURCE: PMID 38336371 (REGONIVO multiomic analysis)
- FINDING: CMS4 (mesenchymal) subtype associated with IO response (p=0.035). CD8+ TIL + M2 macrophage density higher in responders.
- IMPLICATION: CMS4 is paradoxically associated with IO response despite being "cold" by conventional metrics. BreAK CRC-001 does not capture CMS subtype.
- ACTION: ADD to biomarker hypothesis list. FLAG-FOR-NDA — CMS subtype capture in Phase IIa.

### N-002 — pTMB ≥28 mut/Mb predictive in MSS mCRC (MEDITREME)
- SOURCE: PMID 38727700
- FINDING: pTMB ≥28 mut/Mb: HR 0.34 (p=0.022). Tissue TMB not predictive.
- IMPLICATION: Plasma-based TMB may be a better predictive biomarker than tissue TMB. BreAK CRC-001 does not capture pTMB.
- ACTION: ADD to biomarker hypothesis list. FLAG-FOR-NDA.

### N-003 — Neoantigen-specific T-cell responses associated with PFS (MEDITREME)
- SOURCE: PMID 38727700
- FINDING: Blood neoantigen and NY-ESO1/TERT T-cell responses associated with better PFS.
- IMPLICATION: Supports DTH/T-cell response as a pharmacodynamic endpoint. Validates BreAK CRC-001's DTH readout as scientifically grounded.
- ACTION: ACCEPT — strengthens BreAK CRC-001 DTH endpoint rationale.

### N-004 — EACR 2025: SW620 added as 3D spheroid model cell line
- SOURCE: EACR25-1044 [12]
- FINDING: 3D spheroid models use HCT116, HT29, SW620, and LoVo cells co-aggregated with colorectal fibroblasts (CCD-18Co). SW620 is used in the 3D model but NOT in the vaccine formulation.
- IMPLICATION: SW620 is a KRAS G12V, TP53 null, liver-met-derived cell line. Its use in the 3D model (not the vaccine) suggests Brenus is testing cross-reactivity of STC-1010 against a liver-met-derived cell line. This is scientifically interesting but does not change the vaccine composition.
- ACTION: ACCEPT — clarify in all outputs that SW620 is a 3D model cell line, not a vaccine component.

### N-005 — EACR 2025: Haptenated epitopes detected on primed mDCs
- SOURCE: EACR25-1044 [12]
- FINDING: "Primed CD8+ T cells induced higher apoptosis in HCT116, HT-29, and SW620 cells compared to controls. Haptenated epitopes detected."
- IMPLICATION: Haptenated epitopes are detectable on mDCs — this is the first public confirmation that the haptenation mechanism is working at the antigen presentation level. This is a meaningful mechanistic data point.
- ACTION: ACCEPT — add to mechanistic evidence register.

---

## SUMMARY TABLE

| ID | Claim | Status | Confidence | Action |
|----|-------|--------|------------|--------|
| C-001 | Cell lines HCT116/HT29/LoVo | CONFIRMED | HIGH | ACCEPT |
| C-002 | SC-001 HT29 BRAF V600E conflict | CONFIRMED CONFLICT | HIGH | FLAG-FOR-NDA |
| C-003 | Liver mets = IO non-permissive | NUANCED | MEDIUM | ACCEPT-WITH-CAVEAT |
| C-004 | BreAK CRC-001 liver met gap | CONFIRMED GAP | HIGH | FLAG-FOR-NDA |
| C-005 | ctDNA in BreAK CRC-001 | NOT-FOUND | UNVERIFIABLE | FLAG-FOR-NDA |
| C-006 | pTMB predictive (new) | NEW-FINDING | MEDIUM | ACCEPT-WITH-CAVEAT |
| C-007 | Biopsy mandatory | CONTRADICTED | HIGH | REPLACE |
| C-008 | Bevacizumab optional | CONFIRMED | HIGH | FLAG-FOR-NDA |
| C-009 | QUILT-2.004 HR 1.061 | CONFIRMED | HIGH | ACCEPT |
| C-010 | CheckMate 9X8 HR 0.81 | CONFIRMED | HIGH | ACCEPT |
| C-011 | BOT/BAL ORR 17% | CONFIRMED | HIGH | ACCEPT |
| C-012 | RIN NLM ORR 36.4% | CONFIRMED | MEDIUM | ACCEPT |
| C-013 | GRANITE HR 0.73/0.50 | PRESS-RELEASE-ONLY | LOW | ACCEPT-WITH-CAVEAT |
| C-014 | AACR 2026 CT051 FIH data | PRESS-RELEASE-ONLY | LOW | FLAG-FOR-NDA |
| N-001 | CMS4 associated with IO response | NEW-FINDING | MEDIUM | FLAG-FOR-NDA |
| N-002 | pTMB ≥28 predictive | NEW-FINDING | MEDIUM | FLAG-FOR-NDA |
| N-003 | Neoantigen T-cell → PFS | NEW-FINDING | MEDIUM | ACCEPT |
| N-004 | SW620 in 3D model (not vaccine) | NEW-FINDING | HIGH | ACCEPT |
| N-005 | Haptenated epitopes on mDCs | NEW-FINDING | MEDIUM | ACCEPT |
