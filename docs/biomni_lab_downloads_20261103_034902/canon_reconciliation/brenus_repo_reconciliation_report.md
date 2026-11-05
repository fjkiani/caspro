---
title: Brenus Repo Reconciliation Report
version: 1.0
created: 2026-04-28
agent: Canon Reconciliation Agent
ground_truth: brenus_verified_claim_ledger_v1.md + brenus_canon_v2_freeze.md (v2.1-FREEZE)
---

# BRENUS REPO RECONCILIATION REPORT

## Executive Summary

All 8 priority Brenus files were read in full and reconciled against the verified clean-room ledger (`brenus_verified_claim_ledger_v1.md`, 49 claims) and the v2.1-FREEZE canon (`brenus_canon_v2_freeze.md`). **8 contradictions or imprecisions were identified across 4 files.** No file is clean enough for unrestricted external use without the patches documented in `file_patch_plan.md`. The guardrail engine (`brenus_diligence/guardrails/brenus_flags.py`) correctly blocks the highest-risk output types; the contradictions identified here are in the source documents that feed the engine, not in the engine itself.

**Overall verdict:** The repo is in a CONDITIONAL PASS state. The two HIGH-severity contradictions (REC-001, REC-002) in the master scaffold must be patched before any external-facing output is generated from that file. All other files are safe for internal use with the caveats documented below.

---

## File-by-File Reconciliation Status

### 1. `brenus_crispro_master.md` — CONDITIONAL PASS (2 HIGH contradictions)

**Status:** Contains the most authoritative consolidated view of the engagement, but carries two HIGH-severity stale values in §1.7 and §1.9 (HR 1.02 → correct: HR 1.061). These sections are the most likely to be cited in partner-facing materials. The master scaffold's §5 Contradictions table (C1–C5) is accurate and well-structured. §2 PROVISIONAL and §3 HYPOTHESIS sections are correctly labeled. §4 ACTIVE GUARDRAILS are complete and accurate.

**Contradictions:** REC-001 (§1.7), REC-002 (§1.9)
**Safe sections:** §0 Scope, §1.1–1.6, §1.8, §1.10–1.12, §2, §3, §4, §5, §6, §7, §8, §9
**Blocked sections (until patched):** §1.7 row 8, §1.9 "Primary endpoint result" row

---

### 2. `brenus_corporate_dossier_agent1.md` — CONDITIONAL PASS (2 MEDIUM/LOW contradictions)

**Status:** The corporate dossier is the primary reference for company identity, funding, leadership, and pipeline facts. All corporate facts (SIREN, funding, CEO, CSO, SAB, trial NCT, sites) are VERIFIED-aligned from primary sources. Three entries require updating to reflect B-001 resolution: §2.2 cell line row (UNDISCLOSED → HCT116/HT29/LoVo PROVISIONAL), §5 Claim #21 tag (VERIFIED → COMPANY CLAIM), §6.1 missing-data entry (open gap → B-001 RESOLVED).

**Contradictions:** REC-004 (§2.2), REC-005 (§5 Claim #21), REC-006 (§6.1)
**Safe sections:** §1 (all company identity), §2 (all except cell line row), §3 (early clinical data — correctly labeled PRELIMINARY), §4 (preclinical — correctly labeled VERIFIED from Alzeeb 2024), §5 (all claims except #21 tag), §6 (all except cell line missing-data entry)
**Blocked sections (until patched):** §2.2 cell line row, §5 Claim #21 evidence tag, §6.1 cell line missing-data entry

---

### 3. `break_crc001_trial_analysis_agent2.md` — CONDITIONAL PASS (0 new contradictions; 1 pre-existing blocker)

**Status:** All protocol facts (NCT, phase, design, enrollment, sites, eligibility, backbone regimen) are VERIFIED-aligned from ClinicalTrials.gov. All analytical interpretations are correctly labeled `[ANALYTICAL INTERPRETATION]`. The pre-existing blocker (B-003: Section 8 n=6 efficacy data sourced from BusinessWire press releases that failed retrieval in PhD verification session) is already documented in the ledger and is not a new finding. No new contradictions identified in this reconciliation pass.

**Pre-existing blocker:** B-003 — Section 8 n=6 data (100% DCR, DTH responses) tagged `[PROTOCOL FACT — VERIFIED]` but sourced from press releases that failed retrieval. Should be `[PRELIMINARY — source: Brenus PR Jan 2026; not independently retrieved]`. This is a ledger-documented blocker, not a new contradiction.
**Safe sections:** §1–7, §9–10 (all protocol facts, eligibility, backbone, analytical interpretations)
**Blocked sections:** §8 (n=6 efficacy data — B-003 pre-existing)

---

### 4. `MSS_CRC_IO_comparator_trials_agent3.md` — PASS (0 contradictions; all prior corrections applied)

**Status:** The cleanest file in the repo. The NCT03050814 correction (from NCT02853604) and HR correction (from 1.02 to 1.061) were both applied by the PhD Verification Agent on 2026-04-28 with explicit `⚠️ [CORRECTED]` markers. All Tier 1–4 comparator trial data is from published literature and correctly labeled. The QUILT-2.004 entry correctly frames the trial as TERMINATED for futility. No new contradictions identified.

**Safe sections:** All sections
**Blocked sections:** None

---

### 5. `crispro_fitgap_brenus_agent5.md` — CONDITIONAL PASS (1 MEDIUM + 1 MINOR contradiction)

**Status:** Gap 1 was rewritten by the PhD Verification Agent (2026-04-28) with explicit `⚠️ [REWRITTEN]` marker. Guardrail 4 was corrected from `[VERIFIED]` to `[COMPANY_CLAIM]`. Two residual issues: Guardrail 2 still cites stale HR 1.02 (REC-003), and Gap 3 intro carries a single-source-chain framing imprecision (REC-008). All other gaps (Gap 2, Gap 4, Gap 5, Gap 6) are correctly labeled. All six fit capabilities (§2) are correctly labeled with evidence levels.

**Contradictions:** REC-003 (§5 Guardrail 2), REC-008 (§3 Gap 3)
**Safe sections:** §1 (intro — with REC-008 caveat), §2 (all fit capabilities), §3 (Gap 1 rewritten, Gap 2, Gap 4, Gap 5, Gap 6), §4 (all signal dilution risks), §5 (Guardrails 1, 3, 4, 5, 6, 7), §6 (all open questions), §7 (all engagement conditions)
**Blocked sections (until patched):** §5 Guardrail 2 (stale HR), §3 Gap 3 intro (framing imprecision)

---

### 6. `biomarker_biology_map_agent4.md` — PASS (0 contradictions)

**Status:** All six biomarker domains (KRAS/BRAF/RAS, SMAD4, TGF-β, liver metastasis, MHC-I/antigen presentation, TLS) are correctly labeled with evidence levels (VALIDATED CLINICAL BIOMARKER, MECHANISTIC HYPOTHESIS, EXPLORATORY SIGNAL). The BRAF V600E context flag is correctly applied to the Morris Cancer Cell 2025 data (refractory population, not 1L). No contradictions with the canon ledger identified.

**Safe sections:** All sections
**Blocked sections:** None

---

### 7. `internal_strategy_memo_agent6.md` — PASS (0 contradictions)

**Status:** All factual claims in the memo trace to Agent 1–5 evidence streams with correct evidence-level tags. The CONDITIONAL GO recommendation is correctly framed with non-negotiable conditions. Risk 4 (n=6 data overinterpretation) correctly flags the single-source chain issue. No contradictions with the canon ledger identified.

**Safe sections:** All sections
**Blocked sections:** None

---

### 8. `outreach_email_brenus_agent6.md` — PASS (0 contradictions)

**Status:** The email body is guardrail-compliant (all 7 guardrails checked in the drafting notes). The email references only DLTs and DTH responses from the n=6 data — not DCR — which is the correct conservative framing. No contradictions with the canon ledger identified.

**Safe sections:** All sections (email body + drafting notes)
**Blocked sections:** None

---

### 9. `brenus_scientific_anchor_alzeeb2024.md` — PASS with MINOR correction (1 typographic error)

**Status:** All preclinical data (cell lines, manufacturing protocol, TAAs, study results) is correctly extracted from Alzeeb et al. 2024. One typographic error: DFNB should be DNFB (REC-007). No substantive contradictions.

**Safe sections:** All sections (with DNFB correction applied)
**Blocked sections:** None

---

## Cross-File Consistency Check

| Claim | Master Scaffold | Agent 1 | Agent 2 | Agent 3 | Agent 5 | Verdict |
|-------|----------------|---------|---------|---------|---------|---------|
| NCT03050814 HR | 1.02 ❌ | — | — | 1.061 ✓ | 1.02 ❌ | INCONSISTENT — patch master + A5 |
| NCT03050814 NCT# | 03050814 ✓ | — | — | 03050814 ✓ | — | CONSISTENT |
| Human cell lines | HCT116/HT29/LoVo PROVISIONAL ✓ | UNDISCLOSED ❌ | — | — | PROVISIONAL ✓ | INCONSISTENT — patch A1 |
| >200 antigens tag | COMPANY CLAIM ✓ | VERIFIED (claim exists) ❌ | — | — | COMPANY CLAIM ✓ | INCONSISTENT — patch A1 |
| DNFB hapten | DNFB ✓ | DNFB ✓ | DNFB ✓ | — | DNFB ✓ | CONSISTENT (anchor typo only) |
| n=6 DCR source | PRELIMINARY ✓ | PRELIMINARY ✓ | PRELIMINARY ✓ | — | PRELIMINARY ✓ | CONSISTENT |
| BRAF exclusion | EXCLUDED ✓ | EXCLUDED ✓ | EXCLUDED ✓ | — | EXCLUDED ✓ | CONSISTENT |
| SC-001 HT29 conflict | DOCUMENTED ✓ | — | — | — | DOCUMENTED ✓ | CONSISTENT |

---

## Files Not Reviewed in This Pass

The following files exist in the repo or results directory but were not in scope for this reconciliation pass (either non-Brenus workstream or guardrail/engine files reviewed in prior sessions):

- `brenus_diligence/guardrails/brenus_flags.py` — reviewed and tested in SLICE-003 session; 47/47 tests pass
- `brenus_diligence/receipts/receipt_brenus.py` — reviewed in SLICE-003 session
- `brenus_engine_safe_input_block_v2.yaml` — reviewed in prior session; v2.1 is current
- `brenus_guardrail_policy_v1.yaml` — reviewed in prior session; v1 is current
- `brenus_activation_decisions.md` — reviewed in prior session
- `brenus_risk_register.md` — reviewed in prior session
- `formula_decision_onepager.md` — PATH A signed 2026-04-28; not in scope for this pass
- `crispro_fitgap_brenus_verified_only.md` — derived from Agent 5; inherits Agent 5 corrections

---

*Canon Reconciliation Agent — 2026-04-28*
*Ground truth: brenus_verified_claim_ledger_v1.md + brenus_canon_v2_freeze.md v2.1-FREEZE*
