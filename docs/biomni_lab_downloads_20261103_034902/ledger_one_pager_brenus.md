# Verified Claim Ledger v1.0 — One-Page Summary for Brenus Pharma
## BreAK CRC-001 / STC-1010 | CrisPRO Source-Integrity Framework
**Ledger date:** 2026-04-27 | **Summary prepared:** 2026-04-30

---

## What the Ledger Is

The Verified Claim Ledger v1.0 is a clean-room audit of every factual claim used in the CrisPRO analysis of BreAK CRC-001. Each claim is assigned a confidence label based solely on what was directly retrieved from primary sources in a single controlled session. No claim inherits a label from prior analysis or secondary summaries.

**Sources directly retrieved:** ClinicalTrials.gov API v2 (NCT06934538, NCT03050814 + results), Alzeeb et al. 2024 Frontiers Oncology full text, Brenus Science & Innovation website.
**Sources blocked (not retrieved):** AACR 2024 BusinessWire press release (Akamai block), ASCO 2023 abstract e14661 (paywall).

---

## Confidence Labels — What They Mean

| Label | Meaning | External use |
|-------|---------|-------------|
| **VERIFIED** | Directly retrieved from a primary source (registry API, peer-reviewed full text, established cell line database). Verbatim text captured. | Use without caveat |
| **CROSS_REFERENCED** | Consistent across two independent retrieved sources. | Use without caveat |
| **COMPANY_CLAIM** | Appears on Brenus website or in company-controlled materials only. Not independently verified. | Use only with explicit label |
| **PROVISIONAL** | Directionally supported but dependent on a source not yet retrieved (e.g., ASCO e14661). | Use only with explicit caveat |
| **BLOCKED** | Source not retrieved, contradicted by a VERIFIED claim, or speculative. | Do not use |

---

## What Is VERIFIED (safe to use without caveat)

**Trial identity and design (NCT06934538):** NCT, sponsor, Phase I/IIa structure, three arms (Phase 1 / Arm 2A-1 MSS / Arm 2A-2 MSI-H), BRAF WT + KRAS mutated eligibility, BRAF mutation as exclusion criterion, STC-1010 + cyclophosphamide + GM-CSF + mFOLFOX6 ± bevacizumab, Phase IIa primary endpoint (PFS rate at 12 months, RECIST 1.1), DTH schedule (1/24/48/72h post-injection), conditional biopsy (Inclusion #6), biomarker timepoints (T0/1m/2m/6m/12m/Tprogression), recruiting status as of 2025-12-19.

**Comparator efficacy (peer-reviewed):** CheckMate 9X8 HR 0.81 (PMID 38485190); QUILT-2.004 HR 1.061, terminated (NCT03050814 results + PMID 35274710); BOT/BAL Phase 1 ORR 17% no-liver-met (PMID 38871975); RIN NLM ORR 36.4%, n=22 (PMID 39504677); CO.26 pTMB ≥28 mut/Mb HR 0.34, Pint=0.070, GuardantOMNI (PMID 38727700); AtezoTRIBE liver-met Pint PFS=0.990 (PMID 39908699).

**Preclinical biology (Alzeeb et al. 2024, peer-reviewed):** Murine surrogate vaccine uses CT26, CMT-93, LTPA, MC38 — NOT human lines. Hapten = DNFB. IS = cyclophosphamide + GM-CSF. Efficacy in CT26 and MC38 anti-PD-1-resistant models. Authors' own caveat: murine surrogate ≠ clinical product.

**Cell line biology:** HT29 carries BRAF V600E (ATCC/CCLE/COSMIC — established, not in dispute).

---

## What Is PROVISIONAL or COMPANY_CLAIM (use with explicit label)

| Claim | Label | Required caveat |
|-------|-------|-----------------|
| STC-1010 produced from HCT116, HT29, LoVo | PROVISIONAL | "Reported in sponsor-affiliated conference abstract (EACR25-1044); not independently verified" |
| "Over 200 cancer-related proteins" | COMPANY_CLAIM | "Brenus website only; not in any retrieved peer-reviewed source" |
| GMP ready; scalable; worldwide patented | COMPANY_CLAIM | "Brenus website only; no independent confirmation" |
| CT051: n=6, 0 DLTs, 100% DCR, DTH responses | PRESS-RELEASE-ONLY | "CheckOrphan summary only; quantitative data not publicly available" |
| GRANITE GO-010 HR 0.73 / HR 0.50 | PRESS-RELEASE-ONLY | "Company press release; bankrupt; ctDNA threshold undefined; design hypothesis only" |
| BOT/BAL Phase 2 cORR 19% | CONFERENCE (not peer-reviewed) | "ASCO GI 2025 presentation; not yet peer-reviewed" |

---

## What Is BLOCKED (do not use)

- Any claim derived from the AACR 2024 press release (not retrieved)
- "Confirmed" cell line identity for HCT116/HT29/LoVo (ASCO e14661 not retrieved)
- Quantitative DTH values from CT051 (not in public record)
- pTMB finding attributed to MEDITREME (attribution error — finding is from CO.26, PMID 38727700)
- "Biopsy required" (contradicted by registry — biopsy is conditional, Inclusion #6)
- "ctDNA included as exploratory biomarker" in BreAK CRC-001 (not explicitly named in registry)

---

## Three Contradictions Corrected by the Ledger

1. **MSI-H arm exists.** Prior analysis described BreAK CRC-001 as MSS-only. The registry registers three arms: Phase 1, Arm 2A-1 (MSS), and Arm 2A-2 (MSI-H). All MSS-specific claims must be scoped to Arms Phase 1 and 2A-1.
2. **QUILT-2.004 NCT number.** Prior analysis cited NCT02853604. The correct number is NCT03050814. The trial was terminated for futility at interim analysis — it is a negative comparator, not a positive precedent.
3. **pTMB attribution.** The pTMB ≥28 mut/Mb finding (HR 0.34, Pint=0.070) is from CO.26 (PMID 38727700). MEDITREME has no pTMB analysis in the public record.

---

## What the Ledger Cannot Resolve (Requires Brenus Data)

| Gap | What is needed |
|-----|---------------|
| Human cell line identity (independent confirmation) | Third-party proteomics or IND filing |
| Clinical GMP manufacturing parameters | Brenus data room |
| Quantitative Phase Ia efficacy and safety data | CT051 full poster |
| ctDNA platform and threshold in BreAK CRC-001 | Protocol or eCRF specification |
| Antigen overlap: HT29 (BRAF V600E) vs BRAF WT patient proteomes | Internal multi-omics data package |

---

*The Verified Claim Ledger v1.0 is the source of truth for all CrisPRO outputs on BreAK CRC-001. Claims not in the ledger, or assigned BLOCKED status, are not admissible for vector assignment or external communication without sponsor data to resolve them.*
