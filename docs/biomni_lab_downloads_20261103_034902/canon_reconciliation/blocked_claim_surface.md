---
title: Brenus Canon Reconciliation — Blocked Claim Surface
version: 1.0
created: 2026-04-28
agent: Canon Reconciliation Agent
ground_truth: brenus_verified_claim_ledger_v1.md + brenus_canon_v2_freeze.md (v2.1-FREEZE)
usage: Claims in this file MUST NOT appear in any CrisPRO output — internal or external —
       until the resolution path is completed. Each entry states the resolution path.
---

# BRENUS CANON RECONCILIATION — BLOCKED CLAIM SURFACE

> **Policy:** Every claim below is either (a) sourced from a blocked/unverified source, (b) a stale value superseded by verified correction, (c) an overreach beyond what the evidence supports, or (d) an active conflict with trial eligibility criteria. Using any of these claims in CrisPRO outputs creates credibility risk or scientific error.

---

## BLOCK-A: STALE VALUES — Do Not Use Until Patched

### BLOCK-A1: HR 1.02 for NCT03050814 (QUILT-2.004)

**Blocked claim (any form):**
- "AdCEA + avelumab PFS HR 1.02"
- "PFS HR 1.02 (95% CI 0.65–1.60)"
- Any citation of HR 1.02 for NCT03050814

**Why blocked:** Superseded by PhD Verification Agent correction (2026-04-28). Correct value: HR 1.061 (95% CI 0.380–2.966), p=0.91. The stale CI (0.65–1.60) implies a powered n≈70 trial; the actual trial terminated at n=26 treated.

**Appears in (pre-patch):**
- `brenus_crispro_master.md` §1.7 row 8 — REC-001
- `brenus_crispro_master.md` §1.9 "Primary endpoint result" row — REC-002
- `crispro_fitgap_brenus_agent5.md` §5 Guardrail 2 line 241 — REC-003

**Resolution path:** Apply PATCH 1, PATCH 2, PATCH 3 from `file_patch_plan.md`. After patching, verify with `grep "HR 1.02" *.md` returns 0 results.

**Correct replacement:** "PFS HR 1.061 (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility (n=26 treated) ⚠️ [CORRECTED 2026-04-28]"

---

### BLOCK-A2: DFNB Abbreviation for Dinitrofluorobenzene

**Blocked claim:**
- "DFNB (dinitrofluorobenzene)"

**Why blocked:** Typographic error. DFNB is not the correct abbreviation for dinitrofluorobenzene. Correct abbreviation: DNFB.

**Appears in (pre-patch):**
- `brenus_scientific_anchor_alzeeb2024.md` §2 Manufacturing table — REC-007

**Resolution path:** Apply PATCH 7 from `file_patch_plan.md`.

**Correct replacement:** "DNFB (dinitrofluorobenzene)"

---

## BLOCK-B: OUTDATED ENTRIES — Do Not Use Until Patched

### BLOCK-B1: "UNDISCLOSED" Human Cell Line Entry

**Blocked claim (any form):**
- "Cell lines (human product STC-1010): UNDISCLOSED"
- "The human product uses 'established CRC cell lines' — never disclosed publicly"
- "Identity of human CRC cell lines used in STC-1010 has never been publicly disclosed"

**Why blocked:** B-001 was resolved (PROVISIONAL) on 2026-04-28. ASCO 2023 e14661, EACR25 abstract, and Brenus platform page [37] converge on HCT116, HT29, LoVo. Using the UNDISCLOSED framing misrepresents the current state of knowledge and will cause downstream agents to treat a substantially-narrowed gap as fully open.

**Appears in (pre-patch):**
- `brenus_corporate_dossier_agent1.md` §2.2 cell line row — REC-004
- `brenus_corporate_dossier_agent1.md` §6.1 missing-data entry — REC-006

**Note:** `crispro_fitgap_brenus_agent5.md` Gap 1 was already rewritten by the PhD Verification Agent (2026-04-28) and is NOT blocked.

**Resolution path:** Apply PATCH 4 and PATCH 6 from `file_patch_plan.md`.

**Correct replacement:** "HCT116, HT29, LoVo [PROVISIONAL — high confidence; B-001 RESOLVED 2026-04-28]"

---

## BLOCK-C: INCORRECT EVIDENCE TAGS — Do Not Use Until Patched

### BLOCK-C1: "VERIFIED (claim exists)" Tag on >200 Antigen Claim

**Blocked claim (any form):**
- ">200 tumor antigens [VERIFIED]"
- ">200 tumor antigens [VERIFIED — Agent 1]"
- ">200 tumor antigens [VERIFIED (claim exists)]"

**Why blocked:** The >200 antigen figure is a company marketing claim from press releases. It is not a peer-reviewed enumeration. Alzeeb et al. 2024 reports 1,196+ proteins by MS but does not enumerate 200+ validated targets. The VERIFIED tag — even with the parenthetical "(claim exists)" — is non-standard and inconsistent with the master scaffold §2.2 and Agent 5 Guardrail 4, both of which correctly tag this as COMPANY CLAIM.

**Appears in (pre-patch):**
- `brenus_corporate_dossier_agent1.md` §5 Claim #21 — REC-005

**Resolution path:** Apply PATCH 5 from `file_patch_plan.md`.

**Correct replacement:** ">200 tumor antigens [COMPANY CLAIM — not peer-reviewed enumeration; do not promote to VERIFIED]"

---

## BLOCK-D: SOURCE-BLOCKED CLAIMS — Do Not Use (B-003)

### BLOCK-D1: n=6 Efficacy Data Tagged as [PROTOCOL FACT — VERIFIED]

**Blocked claim (any form):**
- "100% DCR [PROTOCOL FACT — VERIFIED]" (when sourced from BusinessWire press releases)
- "DTH responses [PROTOCOL FACT — VERIFIED]" (when sourced from BusinessWire press releases)
- Any n=6 efficacy claim tagged as VERIFIED without the PRELIMINARY qualifier

**Why blocked:** B-003 (ledger-documented). The BusinessWire press releases that are the sole source for n=6 efficacy data failed retrieval in the PhD verification session. Per ledger policy, no claim from a blocked source is inherited as VERIFIED. The correct tag is PRELIMINARY with explicit source attribution.

**Appears in:**
- `break_crc001_trial_analysis_agent2.md` §8 (pre-existing B-003 blocker; not a new finding)

**Resolution path:** B-003 is a pre-existing ledger blocker. Resolution requires either (a) direct retrieval of the BusinessWire press release or AACR 2026 Poster CT051 from a verified source, or (b) Brenus NDA data room access providing the underlying patient-level data.

**Correct replacement:** "100% DCR [PRELIMINARY — n=6 only; SOURCE: Brenus PR Jan 2026 (BusinessWire); not independently retrieved in PhD verification session]"

---

## BLOCK-E: ACTIVE CONFLICTS — Do Not Assert Without Conflict Disclosure

### BLOCK-E1: HT29 as Unqualified Vaccine Component

**Blocked claim (any form):**
- Asserting HT29 as a vaccine component without disclosing the SC-001 conflict
- "STC-1010 uses HCT116, HT29, and LoVo" without the BRAF V600E / KRAS-WT conflict note

**Why blocked:** SC-001 (active conflict). HT29 carries BRAF V600E / KRAS-WT. The trial (NCT06934538) excludes BRAF-mutant patients (Exclusion Criterion #7). Asserting HT29 as a vaccine component without disclosing this conflict creates a scientific inconsistency that could be raised by regulators, reviewers, or sophisticated partners.

**Correct framing:** "STC-1010 uses HCT116, HT29, and LoVo [PROVISIONAL — B-001 RESOLVED 2026-04-28]. NOTE: HT29 carries BRAF V600E / KRAS-WT — SC-001 active conflict with trial BRAF-exclusion criterion (NCT06934538 Exclusion Criterion #7). This conflict requires scientific explanation before any external disclosure."

---

### BLOCK-E2: CEO Superlative Quote

**Blocked claim (any form):**
- "trends in efficacy that are stronger than anything that has been previously reported in hard-to-treat solid tumors"
- Any paraphrase of the CEO's January 2026 superlative statement

**Why blocked:** Guardrail G5 (master scaffold §4). Promotional language with no comparator data, no peer review, no statistical analysis. Using this quote in CrisPRO materials associates CrisPRO with an unsubstantiated superlative claim.

**Resolution path:** Do not use. No resolution path — this claim is permanently blocked for CrisPRO use.

---

### BLOCK-E3: Murine Efficacy Extrapolated to Human

**Blocked claim (any form):**
- "STC-1010 extends survival by 40% in CRC" (without murine-only qualifier)
- "STC-1010 has demonstrated efficacy in CRC" (citing Alzeeb et al. 2024)
- Any extrapolation of CT26/CMT-93/LTPA murine data to human MSS CRC efficacy

**Why blocked:** Guardrail G3 (master scaffold §4). CT26 model has higher TMB than human MSS CRC and does not recapitulate liver metastasis-induced tolerance, TGF-β-driven exclusion, or KRAS-IRF2-MDSC axis.

**Correct framing:** "In murine syngeneic CRC models, the STC platform extends survival by 40% and induces coordinated CD4+/CD8+ T cell and humoral responses [VERIFIED — Alzeeb et al. 2024]. Human translation is uncertain given the known limitations of murine models in recapitulating the human MSS CRC TME."

---

## BLOCK SUMMARY TABLE

| Block ID | Severity | Claim | Resolution |
|----------|----------|-------|------------|
| BLOCK-A1 | HIGH | HR 1.02 for NCT03050814 | PATCH 1, 2, 3 |
| BLOCK-A2 | MINOR | DFNB abbreviation | PATCH 7 |
| BLOCK-B1 | MEDIUM | "UNDISCLOSED" cell lines | PATCH 4, 6 |
| BLOCK-C1 | LOW | "VERIFIED (claim exists)" on >200 antigens | PATCH 5 |
| BLOCK-D1 | MEDIUM | n=6 data as [PROTOCOL FACT — VERIFIED] | B-003 resolution path |
| BLOCK-E1 | MEDIUM | HT29 without SC-001 conflict disclosure | Always disclose SC-001 |
| BLOCK-E2 | HIGH | CEO superlative quote | Permanently blocked |
| BLOCK-E3 | HIGH | Murine efficacy extrapolated to human | Always use murine-only qualifier |

---

*Canon Reconciliation Agent — 2026-04-28*
*No claim in this file may appear in any CrisPRO output until the resolution path is completed.*
