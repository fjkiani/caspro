---
title: Brenus — Downstream Artifact Map
version: 1.0
created: 2026-04-29
agent: Canon Reconciliation + Migration Agent v2
purpose: Maps which files depend on which claims, so future patches can be applied in dependency order. Use this before editing any source file to identify all downstream files that must also be updated.
---

# BRENUS — DOWNSTREAM ARTIFACT MAP v1.0

> **How to use:** When a claim changes (new evidence, blocker resolution, correction), look up the claim in the CLAIM INDEX below to find all files that depend on it. Patch in the order shown (source → derived → engine).

---

## CLAIM INDEX

### CLAIM: NCT03050814 PFS HR (correct: 1.061, 95% CI 0.380–2.966, p=0.91)

| File | Section | Dependency type | Patch status |
|------|---------|-----------------|--------------|
| `MSS_CRC_IO_comparator_trials_agent3.md` | Line 61 | PRIMARY — directly retrieved | PATCHED (2026-04-28, PhD Verification Agent) |
| `brenus_crispro_master.md` | §1.7 row 8 | DERIVED from Agent 3 | PATCHED (2026-04-29, REC-001) |
| `brenus_crispro_master.md` | §1.9 "Primary endpoint result" | DERIVED from Agent 3 | PATCHED (2026-04-29, REC-002) |
| `brenus_crispro_master.mdc` | §1.7 + §1.9 | MIRROR of .md | PATCHED (2026-04-29) |
| `crispro_fitgap_brenus_agent5.md` | §5 Guardrail 2 | DERIVED from Agent 3 | PATCHED (2026-04-29, REC-003) |
| `internal_strategy_memo_agent6.md` | §4 Risk 3 narrative | DERIVED from Agent 3 | PATCHED (2026-04-29) |
| `brenus_canon_v2_master.md` | DIFF-002 table | HISTORICAL RECORD — documents correction | No patch needed (documents old→new) |
| `brenus_canon_v2_freeze.md` | DIFF-002 table | HISTORICAL RECORD | No patch needed |
| `brenus_engine_safe_input_block_v2.yaml` | quilt_2004 block | ALREADY CORRECT (v2.1) | No patch needed |

**Residual risk:** `brenus_verified_claim_ledger_v1.md` documents the correction in the conflicts_with field of CLAIM B-005 — this is a historical record, not an assertion of the stale value. No patch needed.

---

### CLAIM: Human cell lines in STC-1010 (HCT116, HT29, LoVo — PROVISIONAL)

| File | Section | Dependency type | Patch status |
|------|---------|-----------------|--------------|
| `brenus_final_blockers_registry.md` | B-001 entry | PRIMARY — resolution record | ALREADY CORRECT (v1.1-FINAL, 2026-04-28) |
| `brenus_corporate_dossier_agent1.md` | §2.2 cell line row | DERIVED | PATCHED (2026-04-29, REC-004) |
| `brenus_corporate_dossier_agent1.md` | §6.1 missing-data row | DERIVED | PATCHED (2026-04-29, REC-006) |
| `crispro_fitgap_brenus_agent5.md` | §3 Gap 1 | ALREADY REWRITTEN (2026-04-28, PhD Verification Agent) | No patch needed |
| `brenus_crispro_master.md` | §2 PROVISIONAL table | ALREADY CORRECT | No patch needed |
| `brenus_engine_safe_input_block_v2.yaml` | cell_lines block | ALREADY CORRECT (v2.1) | No patch needed |
| `canon_reconciliation/safe_claim_surface.md` | Category 5 | ALREADY CORRECT | No patch needed |

---

### CLAIM: >200 tumor antigens (COMPANY_CLAIM — not peer-reviewed)

| File | Section | Dependency type | Patch status |
|------|---------|-----------------|--------------|
| `brenus_crispro_master.md` | §2.2 PROVISIONAL table | ALREADY CORRECT (COMPANY_CLAIM) | No patch needed |
| `crispro_fitgap_brenus_agent5.md` | §5 Guardrail 4 | ALREADY CORRECT (COMPANY_CLAIM, patched 2026-04-28) | No patch needed |
| `brenus_corporate_dossier_agent1.md` | §5 Claim #21 | PATCHED (2026-04-29, REC-005) | PATCHED |
| `brenus_engine_safe_input_block_v2.yaml` | antigen_count block | ALREADY CORRECT (COMPANY_CLAIM) | No patch needed |

---

### CLAIM: DNFB hapten abbreviation (correct: DNFB, not DFNB)

| File | Section | Dependency type | Patch status |
|------|---------|-----------------|--------------|
| `brenus_scientific_anchor_alzeeb2024.md` | §2 Manufacturing table | PRIMARY | PATCHED (2026-04-29, REC-007) |
| All other files | Various | Use DNFB consistently | ALREADY CORRECT in all other files |
| `brenus_verified_claim_ledger_v1.md` | CLAIM C-003 verbatim | HISTORICAL — quotes paper's "DFNB" as verbatim | No patch needed (verbatim quote) |

---

### CLAIM: n=6 clinical data evidence grade (PRESS-RELEASE-ONLY)

| File | Section | Dependency type | Patch status |
|------|---------|-----------------|--------------|
| `brenus_crispro_master.md` | §1.4 Early Clinical Data | DERIVED | PATCHED (2026-04-29, W-003) |
| `brenus_crispro_master.mdc` | §1.4 | MIRROR | PATCHED (2026-04-29, W-003) |
| `break_crc001_trial_analysis_agent2.md` | §8 | PRE-EXISTING BLOCKER (B-003) — already labeled PRELIMINARY | No new patch needed; B-003 now PARTIALLY CLOSED |
| `brenus_corporate_dossier_agent1.md` | §3 early clinical data | ALREADY LABELED PRELIMINARY | No patch needed |
| `crispro_fitgap_brenus_agent5.md` | §3 Gap 3 | PATCHED (2026-04-29, REC-008) | PATCHED |
| `internal_strategy_memo_agent6.md` | §3 Risk 4 | ALREADY CORRECTLY LABELED | No patch needed |
| `outreach_email_brenus_agent6.md` | Email body | ALREADY CORRECTLY FRAMED (DLTs + DTH only, not DCR) | No patch needed |
| `brenus_engine_safe_input_block_v2.yaml` | clinical_data block | ALREADY BLOCKED | No patch needed |

---

### CLAIM: CheckMate 9X8 as primary null comparator (NCT03414983, HR 0.81, p=0.30)

| File | Section | Dependency type | Patch status |
|------|---------|-----------------|--------------|
| `weaponization_agent/exploitation_queue.md` | EQ-01 | PRIMARY — Weaponization Agent retrieval | SOURCE (2026-04-29) |
| `weaponization_agent/blocker_closure_report.md` | B-003 section | PRIMARY | SOURCE (2026-04-29) |
| `brenus_crispro_master.md` | §1.7 comparator table | DERIVED | PATCHED (2026-04-29, W-001) |
| `brenus_crispro_master.mdc` | §1.7 | MIRROR | PATCHED (2026-04-29, W-001) |
| `crispro_fitgap_brenus_agent5.md` | §5 Guardrail 2 | DERIVED | PATCHED (2026-04-29, PATCH 3 + W-001) |
| `internal_strategy_memo_agent6.md` | §4 Risk 3 | DERIVED | PATCHED (2026-04-29) |
| `MSS_CRC_IO_comparator_trials_agent3.md` | — | NOT YET ADDED | **PENDING** — CheckMate 9X8 should be added to Agent 3 as a new Tier entry |
| `crispro_fitgap_brenus_agent5.md` | §2 Fit capabilities | NOT YET ADDED | **PENDING** — CheckMate 9X8 strengthens the "mechanistic differentiation" fit argument |

---

### CLAIM: ASCO 2024 = study design only, no patient data (B-005 INVALIDATED)

| File | Section | Dependency type | Patch status |
|------|---------|-----------------|--------------|
| `weaponization_agent/blocker_closure_report.md` | B-005 section | PRIMARY — Weaponization Agent finding | SOURCE (2026-04-29) |
| `brenus_final_blockers_registry.md` | B-005 entry | UPDATED in blocker_ledger_live.md v2.0 | See blocker_ledger_live.md |
| All Brenus canon files | Various | SWEEP RESULT: no active ASCO 2024 efficacy claims found | No patches needed |

---

### CLAIM: SC-001 / HT29 BRAF V600E conflict (ACTIVE CONFLICT — unresolved)

| File | Section | Dependency type | Patch status |
|------|---------|-----------------|--------------|
| `brenus_final_blockers_registry.md` | SC-001 + B-006 | PRIMARY | ALREADY CORRECT (v1.1-FINAL) |
| `brenus_corporate_dossier_agent1.md` | §2.2 cell line row | DERIVED — SC-001 conflict noted | PATCHED (2026-04-29, REC-004) |
| `brenus_corporate_dossier_agent1.md` | §6.1 missing-data row | DERIVED — SC-001 conflict noted | PATCHED (2026-04-29, REC-006) |
| `crispro_fitgap_brenus_agent5.md` | §3 Gap 1 | ALREADY DOCUMENTS SC-001 | No patch needed |
| `brenus_crispro_master.md` | §3 HYPOTHESIS table | ALREADY DOCUMENTS SC-001 | No patch needed |
| `brenus_engine_safe_input_block_v2.yaml` | sc001_conflict block | ALREADY BLOCKED | No patch needed |

---

## PENDING ITEMS (not yet patched — flagged for next agent run)

| Item | File | Section | Priority | Notes |
|------|------|---------|----------|-------|
| Add CheckMate 9X8 to Agent 3 comparator table | `MSS_CRC_IO_comparator_trials_agent3.md` | New Tier entry | HIGH | Weaponization Agent EQ-01; peer-reviewed source (Lenz et al. J Immunother Cancer 2024, PMID 38485190) |
| Add CheckMate 9X8 to Agent 5 fit capabilities | `crispro_fitgap_brenus_agent5.md` | §2 Fit capabilities | MEDIUM | Strengthens mechanistic differentiation argument |
| Standardize `VERIFIED (claim exists)` tags in Agent 1 | `brenus_corporate_dossier_agent1.md` | §5 Claims 4,5,7–11,13–19,22 | LOW | All have adequate caveats in notes column; not a hard blocker |
| Update `brenus_engine_safe_input_block_v2.yaml` | `brenus_engine_safe_input_block_v2.yaml` | CheckMate 9X8 block | MEDIUM | Add CheckMate 9X8 as verified comparator input |

---

## FILE DEPENDENCY GRAPH (simplified)

```
PRIMARY SOURCES (highest authority)
├── brenus_verified_claim_ledger_v1.md  [PhD Verification Agent 2026-04-27]
├── brenus_final_blockers_registry.md v1.1-FINAL  [PhD Verification Agent 2026-04-28]
├── brenus_canon_v2_freeze.md  [PhD Verification Agent 2026-04-28]
└── weaponization_agent/*.md  [Weaponization Agent 2026-04-29]

AGENT OUTPUTS (derived from primary sources)
├── MSS_CRC_IO_comparator_trials_agent3.md  [Agent 3 — CLEAN]
├── biomarker_biology_map_agent4.md  [Agent 4 — CLEAN]
├── break_crc001_trial_analysis_agent2.md  [Agent 2 — CONDITIONAL (B-003 §8)]
├── brenus_corporate_dossier_agent1.md  [Agent 1 — PATCHED 2026-04-29]
└── crispro_fitgap_brenus_agent5.md  [Agent 5 — PATCHED 2026-04-29]

SYNTHESIS DOCUMENTS (derived from agent outputs)
├── brenus_crispro_master.md  [PATCHED 2026-04-29]
├── brenus_crispro_master.mdc  [PATCHED 2026-04-29]
├── internal_strategy_memo_agent6.md  [PATCHED 2026-04-29]
└── outreach_email_brenus_agent6.md  [CLEAN]

ENGINE INPUTS (derived from synthesis)
├── brenus_engine_safe_input_block_v2.yaml  [v2.1 — CLEAN; CheckMate 9X8 pending]
└── brenus_guardrail_policy_v1.yaml  [v1 — CLEAN]

ENGINE CODE (not claim-dependent)
├── brenus_diligence/guardrails/brenus_flags.py  [47/47 tests pass — CLEAN]
└── brenus_diligence/receipts/receipt_brenus.py  [CLEAN]
```

---

*Canon Reconciliation + Migration Agent v2 — 2026-04-29*
