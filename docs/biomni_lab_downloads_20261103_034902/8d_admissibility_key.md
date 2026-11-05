# 8D Admissibility Key — BreAK CRC-001
**Authority:** Verified Claim Ledger v1.0 (2026-04-27)
**Applies to:** All 8D vector assignment for BreAK CRC-001 / STC-1010
**Date:** 2026-04-30

---

## TIER 1 — VERIFIED / CROSS_REFERENCED
**Status: ADMISSIBLE. Use without caveat tag.**

| Claim ID | Claim (abbreviated) | Ledger class | Source |
|----------|---------------------|-------------|--------|
| A-001–A-019 | All BreAK CRC-001 registry facts (NCT, arms, eligibility, endpoints, DTH schedule, biopsy conditionality, bev optionality, biomarker timepoints) | VERIFIED | NCT06934538 API [54] |
| B-001–B-009 | All QUILT-2.004 registry facts (NCT, termination, n=30, HR 1.061, p=0.91, mPFS 8.8 vs 10.1m, MSI-H exclusion, SAE rates) | VERIFIED | NCT03050814 [55] |
| C-001 | Alzeeb et al. 2024 uses MURINE cell lines only (CT26, CMT-93, LTPA, MC38) — NOT human lines | VERIFIED | PMID 37554125 / Frontiers Oncology [61] |
| C-003 | Hapten = DNFB (dinitrofluorobenzene) | CROSS_REFERENCED | [58] + [61] |
| C-004–C-012 | All Alzeeb 2024 preclinical results (stressors, IS doses, tumor volumes, survival p-values, proteomics, safety) | VERIFIED | [61] |
| C-011 | Authors' own caveat: murine surrogate ≠ clinical product | VERIFIED | [61] |
| V-021 | HT29 carries BRAF V600E — established cell line biology | VERIFIED | ATCC/CCLE/COSMIC |
| V-022 | NCT06934538 Exclusion #7: BRAF mutation excluded | VERIFIED | NCT06934538 [54] |
| CheckMate 9X8 | HR 0.81 (0.53–1.23), p=0.30, mPFS 11.9 vs 11.9m, n=196, 1L | VERIFIED | PMID 38485190 |
| BOT/BAL Ph1 | ORR 17% (10–26%), DCR 61%, n=101 MSS mCRC, no liver mets | VERIFIED | PMID 38871975 |
| RIN NLM | ORR 36.4%, mPFS 5.0m, mOS 27.5m, 3-yr PFS 19.3%, n=22 | VERIFIED | PMID 39504677 |
| CO.26 pTMB | pTMB ≥28 mut/Mb: HR 0.34 (0.13–0.85), p=0.022, Pint=0.070; tissue TMB HR 0.71, p=0.47 | VERIFIED | PMID 38727700 |
| AtezoTRIBE | Liver mets prognostic (PFS p=0.002) but not predictive of atezo resistance (Pint PFS=0.990, OS=0.800); Immunoscore-IC Pint PFS=0.166, OS=0.473 | VERIFIED | PMID 39908699 |
| REGONIVO | CMS4 associated with IO response (p=0.035) | VERIFIED | PMID 38336371 |
| EACR25-1044 | CD8+ T-cell-mediated apoptosis in HCT116/HT29/SW620; haptenated epitopes on mDCs; SW620 = 3D model only, not vaccine | VERIFIED | EACR25-1044 (retrieved) |

---

## TIER 2 — COMPANY_CLAIM / PRESS-RELEASE / CONFERENCE (NOT PEER-REVIEWED)
**Status: ADMISSIBLE ONLY WITH EXPLICIT CAVEAT TAG.**
**8D must attach the specified caveat string to every vector that uses these claims.**

| Claim ID | Claim (abbreviated) | Ledger class | Required caveat tag |
|----------|---------------------|-------------|---------------------|
| D-001 | Human cell lines used in clinical STC-1010 (company states) | COMPANY_CLAIM | `[COMPANY_CLAIM: Brenus website [58]; no independent verification]` |
| D-002 | "Over 200 cancer-related proteins" | COMPANY_CLAIM | `[COMPANY_CLAIM: Brenus website [58]; not in any retrieved peer-reviewed source; do not elevate to VERIFIED]` |
| D-004 | GMP ready; scalable; worldwide patented | COMPANY_CLAIM | `[COMPANY_CLAIM: Brenus website [58]; no independent confirmation retrieved]` |
| D-005 | Pipeline: CRC, PDAC, HCC (STC-1010); ovarian (STC-1020) | COMPANY_CLAIM | `[COMPANY_CLAIM: Brenus website [58]; only CRC has a registered trial]` |
| P-001 | STC-1010 produced from HCT116, HT29, LoVo (EACR25-1044 only) | PROVISIONAL | `[PROVISIONAL: sponsor-affiliated conference abstract only (EACR25-1044); ASCO e14661 not retrieved in Ledger v1.0; no independent third-party verification]` |
| P-002 | CT051: n=6, 0 DLTs, 100% DCR, DTH responses observed | PRESS-RELEASE-ONLY | `[PRESS-RELEASE-ONLY: CheckOrphan summary, AACR 2026 CT051; quantitative DTH values, per-patient RECIST, and immune biomarker data not publicly available; no peer-reviewed source]` |
| P-003 | GRANITE GO-010: HR 0.73 all-comer; HR 0.50 ctDNA-low | PRESS-RELEASE-ONLY | `[PRESS-RELEASE-ONLY: company bankrupt; ctDNA threshold undefined; wide CIs; not peer-reviewed; design hypothesis only — not admissible as efficacy evidence]` |
| P-004 | BOT/BAL Ph2: cORR 19% (n=62); BATTMAN initiated | CONFERENCE (not peer-reviewed) | `[CONFERENCE-ONLY: ASCO GI 2025 presentation; not yet peer-reviewed]` |
| P-007 | AACR 2024 multi-omics batch reproducibility (company stated) | PRESS-RELEASE-ONLY | `[PRESS-RELEASE-ONLY: AACR 2024; data package not in public record; not retrieved in Ledger v1.0 session]` |
| P-008 | MEDITREME: neoantigen T-cell responses associated with PFS | PEER-REVIEWED (single-arm, weak surrogate) | `[MEDIUM confidence: single-arm Phase 1b/2; 3-month PFS is a weak surrogate; no randomized control]` |
| C-007 (6-layer) | Mechanistic synthesis of MSS CRC IO resistance | EDITORIAL SYNTHESIS | `[EDITORIAL INTERPRETATION: mechanistic synthesis; not sourced to a single peer-reviewed publication]` |
| C-008 (bev) | Bevacizumab immunomodulatory confounding in BreAK CRC-001 | INFERRED MECHANISM | `[INFERRED MECHANISM: biologically plausible; not directly tested in BreAK CRC-001]` |
| C-006 (GRANITE) | "Design failure, not biology failure" | EDITORIAL INTERPRETATION | `[EDITORIAL INTERPRETATION: not established from retrieved data]` |
| AtezoTRIBE nuance | Liver mets + Immunoscore-IC-low = non-permissive framing | PEER-REVIEWED (exploratory) | `[EXPLORATORY: secondary analysis; pMMR not MSS-restricted; interaction tests non-significant]` |
| CO.26 pTMB threshold | pTMB ≥28 mut/Mb as biomarker hypothesis | PEER-REVIEWED (data-driven threshold) | `[HYPOTHESIS-GENERATING: data-driven threshold; Pint=0.070; GuardantOMNI-specific; 2L+ population; not validated in 1L]` |

---

## TIER 3 — BLOCKED / NOT RETRIEVED / CONTRADICTED
**Status: NOT ADMISSIBLE. 8D must not use these for vector assignment.**
**Using any Tier 3 item introduces an unresolvable error into the vector space.**

| Block ID | Claim | Block reason | Corrective action |
|----------|-------|-------------|-------------------|
| BLOCK-01 | "HCT116/HT29/LoVo confirmed" — use of word "confirm" | ASCO e14661 NOT RETRIEVED in Ledger v1.0 (Blocker B-001); "confirm" not warranted | Use P-001 with caveat tag instead |
| BLOCK-02 | AACR 2024 press release — any claim derived from it | NOT RETRIEVED (Ledger Blocker B-005: Akamai block) | Remove; do not cite |
| BLOCK-03 | "Presumably includes antigen characterization per cell line" | SPECULATION; no retrieved source | Remove entirely |
| BLOCK-04 | "The only MSS CRC IO program with a validated clinical signal" (re: BOT/BAL) | FACTUALLY INCORRECT — RIN NLM ORR 36.4% (PMID 39504677) is also validated | Replace with Tier 1 corrected framing |
| BLOCK-05 | "Highest validated IO response rate in this indication" (re: RIN) | OVERSTATED — n=22 subgroup | Replace with "among the highest reported" |
| BLOCK-06 | CT051 quantitative DTH values (any specific numbers) | NOT IN PUBLIC RECORD — no full poster retrieved | Blocked until NDA-02 data package received |
| BLOCK-07 | "Biopsy required" (prior canon) | CONTRADICTED by registry (conditional only, Inclusion #6) | Replace with VERIFIED A-013 / V-016 |
| BLOCK-08 | "ctDNA mentioned as exploratory biomarker" in BreAK CRC-001 | NOT-FOUND — ctDNA not explicitly named in registry | Replace with VERIFIED V-020 |
| BLOCK-09 | pTMB finding attributed to MEDITREME | TRIAL ATTRIBUTION ERROR — finding is from CO.26 (PMID 38727700) | Replace with VERIFIED CO.26 attribution |
| BLOCK-10 | IFN-γ production attributed to EACR 2025 spheroid data | ATTRIBUTION ERROR — IFN-γ is from ASCO e14661 (BLOCKED); EACR 2025 reports cytokine secretion but does not name IFN-γ in spheroid model | Remove IFN-γ attribution or source to ASCO e14661 with BLOCKED tag |
| BLOCK-11 | ASCO e14661 listed as a retrieved source | NOT RETRIEVED in Ledger v1.0 | Remove from source list or tag as NOT RETRIEVED / PROVISIONAL |
| BLOCK-12 | AACR 2024 multi-omics as "substantial preclinical evidence base" | NOT RETRIEVED; cannot characterize | Remove |
| BLOCK-13 | HSP/calreticulin/HMGB1 as specific immunogenic payload of STC-1010 | NOT IN LEDGER v1.0; not in Alzeeb 2024 for human product | Remove or replace with generic "stress-response proteins and DAMPs" without naming specific proteins |
| BLOCK-14 | Any human clinical efficacy claim for STC-1010 beyond press-release summary | Ledger Blocker B-003: no results posted; trial started 2025-06-17 | All human efficacy claims require P-002 caveat tag; quantitative values not admissible |
| BLOCK-15 | "Liver metastases are the single strongest predictor of IO failure" (unqualified) | OVERSTATED — AtezoTRIBE 2025 nuances this; liver mets alone ≠ IO failure | Replace with nuanced framing (Tier 2 AtezoTRIBE entry) |

---

## VECTOR ASSIGNMENT DECISION TREE

```
Claim to be vectorized
        │
        ▼
Is it in Ledger v1.0 as VERIFIED or CROSS_REFERENCED?
        │
       YES ──────────────────────────────► TIER 1: Assign vector. No tag required.
        │
        NO
        │
        ▼
Is it in Ledger v1.0 as COMPANY_CLAIM, PROVISIONAL,
or sourced from press-release / conference (not peer-reviewed)?
        │
       YES ──────────────────────────────► TIER 2: Assign vector WITH caveat tag.
        │                                           Tag must be attached in output.
        NO
        │
        ▼
Is it BLOCKED, NOT RETRIEVED, CONTRADICTED,
or not present in Ledger v1.0 at all?
        │
       YES ──────────────────────────────► TIER 3: DO NOT ASSIGN VECTOR.
                                                    Flag for NDA or source retrieval.
```

---

## SPECIAL RULES — PERMANENT

1. **HCT116/HT29/LoVo cell line identity:** Never use "confirmed." Always use P-001 caveat tag. ASCO e14661 is NOT a retrieved source in Ledger v1.0.
2. **"200 antigens/proteins":** Always COMPANY_CLAIM (D-002). Never elevate to VERIFIED. Ledger v1.0 Contradiction C-004 explicitly corrects this error.
3. **Human clinical efficacy for STC-1010:** No peer-reviewed or conference-abstract source exists. All values (n=6, 100% DCR, DTH responses) are press-release summary only. Attach P-002 caveat. Quantitative values are not admissible.
4. **MEDITREME vs CO.26:** pTMB ≥28 mut/Mb finding belongs to CO.26 (PMID 38727700). MEDITREME has no pTMB analysis in the public record. Any vector attributing this finding to MEDITREME is BLOCKED.
5. **AACR 2024 press release:** Not retrieved. Not admissible. Do not cite.
6. **BOT/BAL "only program":** Factually incorrect. Always pair with RIN NLM (PMID 39504677).

---

*Authority: Verified Claim Ledger v1.0 (2026-04-27). This key supersedes all prior admissibility guidance for BreAK CRC-001 8D vector assignment.*
