# Repaired Brief v2 — Change Log
## Source-Integrity Adjudication Applied Against Verified Claim Ledger v1.0
**Date:** 2026-04-30 | **Authority:** brenus_verified_claim_ledger_v1.md (2026-04-27)
**Policy:** Every Table C item is accounted for. Disposition = RESOLVED / REMOVED / CAVEATED.

---

| C-item | Severity | Original text (abbreviated) | Disposition | Action taken |
|--------|----------|-----------------------------|-------------|--------------|
| **C-01 / C-14** | CRITICAL | "EACR25-1044 and ASCO 2023 e14661 **both confirm** that STC-1010 is produced from three human CRC cell lines: HCT116, HT29, and LoVo." | RESOLVED | Removed "both confirm." Replaced with: "EACR25-1044 **reports** that STC-1010 is produced from HCT116, HT-29, and LoVo cell lines. This is a sponsor-affiliated conference abstract. The specific human cell line composition of clinical STC-1010 has not been confirmed by an independent third party." ASCO e14661 removed from the body of §4 as a co-confirming source. |
| **C-02** | HIGH | "This is consistent with the AACR 2024 press release." | REMOVED | Sentence deleted entirely. AACR 2024 press release was not retrieved (Ledger Blocker B-005: Akamai block). |
| **C-03** | HIGH | "The AACR 2024 press release mentions multi-omics analysis…this data package **presumably includes** antigen characterization per cell line." | RESOLVED | Replaced with: "Brenus has stated publicly that multi-omics analysis of STC-1010 batches has been conducted to assess batch-to-batch reproducibility. The data package is not in the public record. Whether it includes antigen characterization per cell line is unknown." |
| **C-04** | HIGH | "**The only** MSS CRC IO program with a validated clinical signal." (re: BOT/BAL) | RESOLVED | Replaced with: "**One of two** programs with validated IO signals in no-liver-met MSS mCRC. BOT/BAL (ORR 17%, PMID 38871975) and RIN (ORR 36.4% in the NLM subgroup, n=22, PMID 39504677) are the two programs with peer-reviewed evidence of IO activity in this population." |
| **C-05** | MEDIUM | "ORR 36.4%…is **the highest validated IO response rate** in this indication." (re: RIN) | RESOLVED | Replaced with: "ORR 36.4% in the RIN NLM subgroup (n=22, PMID 39504677) is **among the highest reported** IO response rates in MSS mCRC. The small subgroup size (n=22) limits the certainty of this ranking." |
| **C-06** | MEDIUM | "This is a **design failure, not a biology failure**." (re: GRANITE GO-010) | RESOLVED | Replaced with: "The trial was not designed to test the enrichment hypothesis it retrospectively identified. Whether the underlying biology is capable of generating a clinical signal in a prospectively enriched population remains unknown." |
| **C-07** | MEDIUM | "PD-1 blockade alone cannot overcome the **six-layer immunosuppressive architecture** of MSS CRC — TGF-β-driven exclusion, VEGF-mediated myeloid suppression, MHC-I downregulation, Treg enrichment, M2 macrophage polarization, and liver-mediated immune tolerance." | RESOLVED | Replaced with: "PD-1 blockade alone was insufficient to improve PFS in 1L MSS mCRC (PMID 38485190). The mechanisms underlying IO resistance in MSS CRC are multifactorial and include, among others, T-cell exclusion, myeloid immunosuppression, and liver-mediated immune tolerance — though the relative contribution of each mechanism in the clinical setting has not been established in a single peer-reviewed source." |
| **C-08** | MEDIUM | "Bevacizumab has **well-characterized immunomodulatory effects** — VEGF blockade reduces immunosuppressive myeloid cell recruitment, normalizes tumor vasculature to improve T-cell trafficking, and modulates the tumor immune microenvironment." | RESOLVED | Replaced with: "Bevacizumab's anti-VEGF mechanism has been associated with immunomodulatory effects in preclinical and translational studies, including effects on myeloid cell recruitment and tumor vasculature. Whether these effects materially confound immune biomarker interpretation in BreAK CRC-001 has not been directly tested." |
| **C-09** | HIGH | "The EACR 2025 3D spheroid data (…; CD8+ T-cell killing; **IFN-γ production**)" — IFN-γ attributed to EACR 2025 spheroid data | RESOLVED | Separated: "EACR25-1044 reports CD8+ T-cell-mediated apoptosis…and cytokine secretion." IFN-γ attribution moved to ASCO 2023 e14661 (CAM model) with explicit note that abstract was not independently retrieved. |
| **C-10** | HIGH | §8 evidence base: "CONFERENCE ABSTRACT: ASCO 2023 e14661 (STC-1010 cell lines, Alzeeb et al.)" listed without retrieval caveat | RESOLVED | Retagged in §8 as: "CONFERENCE ABSTRACT — **not independently retrieved**: ASCO 2023 e14661 (Alzeeb et al.) — access was not achieved in the primary source session due to paywall restrictions. Claims dependent on this abstract are PROVISIONAL." |
| **C-11** | MEDIUM | "The AACR 2026 CT051 press release reports DTH responses in all 6 Phase Ia patients — this is the right readout." (no press-release caveat) | CAVEATED | Rewritten as: "A **press-release summary** (CheckOrphan, AACR 2026 CT051) reports that DTH responses were observed in all 6 Phase Ia patients; **quantitative DTH values, per-patient RECIST assessments, and immune biomarker data are not publicly available.**" |
| **C-12** | MEDIUM | "Using the existing Phase Ia data (n=6, DTH responses, 100% DCR)…" (no press-release caveat) | CAVEATED | Rewritten as: "Using the available Phase Ia summary data (n=6, DTH responses observed in all patients, 100% DCR — **per press-release summary only; quantitative data not publicly available**)…" |
| **C-13** | HIGH | "the AACR 2024 multi-omics batch consistency data represent a **substantial preclinical evidence base**" | RESOLVED | Replaced with: "Brenus has reported multi-omics batch consistency data for STC-1010 (AACR 2024); the data package is not in the public record and was not retrieved in our primary source session." |
| **C-15** | LOW | "stress-response proteins (**HSPs, calreticulin, HMGB1**), damage-associated molecular patterns…that are not mutation-specific" | RESOLVED | Replaced with: "broadly shared tumor antigens, including stress-response proteins and damage-associated molecular patterns. The specific immunogenic payload of clinical STC-1010 — including which proteins are dominant and whether they are mutation-specific — has not been characterized in any retrieved peer-reviewed source." |
| **C-16** | MEDIUM | "Phase 2 cORR 19% (n=62). Phase 3 BATTMAN initiated." (no peer-review caveat) | CAVEATED | Rewritten as: "Phase 2 cORR 19% (n=62, BOT 75mg+BAL; **conference presentation, ASCO GI 2025, not yet peer-reviewed**). Phase 3 BATTMAN initiated." |

---

## Manager Instructions — Compliance Checklist

| Instruction | Status |
|-------------|--------|
| Apply every Table D rewrite exactly | COMPLETE — all 16 C-items addressed above |
| Remove all blocked-source inheritance | COMPLETE — AACR 2024 press release removed from §4 and §6; no claims derived from it remain |
| Do not cite ASCO e14661 as retrieved | COMPLETE — e14661 appears only with "not independently retrieved" tag in §6 and §8 |
| Do not use "confirm" for HCT116/HT29/LoVo | COMPLETE — "confirm" removed; replaced with "reports" + sponsor-affiliation caveat |
| Preserve press-release caveats wherever human Phase Ia signal appears | COMPLETE — C-11 and C-12 both caveated; §5 Q1 and §6 enrichment passage both carry explicit press-release tags |
| Retag "200 antigens/proteins" as COMPANY_CLAIM if mentioned | COMPLETE — added to §8 Source Integrity Note 4: "[COMPANY_CLAIM — not sourced to any retrieved peer-reviewed publication. Do not elevate to VERIFIED.]" |

---

*Change log covers all 16 Table C items from Source-Integrity Adjudication (2026-04-30). No items outstanding.*
