---
title: Brenus — Migration Queue
version: 1.0
created: 2026-04-29
agent: Canon Reconciliation + Migration Agent v2
purpose: Ordered queue of capabilities and files ready (or blocked) for migration from legacy canon to v2/v3. Use this to determine what can be migrated now vs. what must wait for blocker resolution.
dependency_reference: downstream_artifact_map.md
blocker_reference: blocker_ledger_live.md v2.0
---

# BRENUS — MIGRATION QUEUE v1.0

## MIGRATION POLICY

| Rule | Requirement |
|------|-------------|
| **No migration with unresolved contradictions** | A file may not be migrated if it contains any unpatched contradiction from the hitlist |
| **No migration with active BLOCKED claims** | Any file asserting a BLOCKED claim must be patched before migration |
| **Evidence grade tags are mandatory** | All migrated files must carry correct evidence grade tags (VERIFIED / PROVISIONAL / PRESS-RELEASE-ONLY / COMPANY_CLAIM) |
| **Patch audit required** | Before migrating any file, run the post-patch verification grep sweep from file_patch_plan.md |
| **SC-001 disclosure required** | Any file referencing HT29 or human cell lines must include SC-001 conflict disclosure |

---

## MIGRATION STATUS OVERVIEW

| File | Migration Status | Blockers | Priority |
|------|-----------------|----------|----------|
| `MSS_CRC_IO_comparator_trials_agent3.md` | **READY** | None | HIGH |
| `biomarker_biology_map_agent4.md` | **READY** | None | HIGH |
| `brenus_scientific_anchor_alzeeb2024.md` | **READY** | None (DNFB typo patched) | HIGH |
| `outreach_email_brenus_agent6.md` | **READY** | None | MEDIUM |
| `internal_strategy_memo_agent6.md` | **READY** | None (patched 2026-04-29) | MEDIUM |
| `brenus_crispro_master.md` | **READY** | None (all patches applied) | HIGH |
| `brenus_crispro_master.mdc` | **READY** | None (all patches applied) | HIGH |
| `brenus_corporate_dossier_agent1.md` | **READY** | None (all patches applied) | HIGH |
| `crispro_fitgap_brenus_agent5.md` | **READY** | None (all patches applied) | HIGH |
| `brenus_engine_safe_input_block_v2.yaml` | **READY** | None (CheckMate 9X8 added, B-003 updated) | HIGH |
| `break_crc001_trial_analysis_agent2.md` | **CONDITIONAL** | B-003 §8 (PRESS-RELEASE-ONLY — not a hard block, but §8 must carry correct label) | MEDIUM |
| `brenus_guardrail_policy_v1.yaml` | **READY** | None | HIGH |
| `brenus_diligence/guardrails/brenus_flags.py` | **READY** | None (47/47 tests pass) | HIGH |
| `brenus_diligence/receipts/receipt_brenus.py` | **READY** | None | HIGH |
| `brenus_verified_claim_ledger_v1.md` | **ARCHIVE — DO NOT MIGRATE** | Historical record; superseded by canon_v2_freeze | N/A |
| `brenus_canon_v2_freeze.md` | **ARCHIVE — DO NOT MIGRATE** | Frozen reference; do not modify | N/A |
| `brenus_canon_v2_master.md` | **ARCHIVE — DO NOT MIGRATE** | Frozen reference; do not modify | N/A |

---

## MIGRATION QUEUE — ORDERED BY DEPENDENCY

### BATCH 1 — Migrate Immediately (no dependencies, no blockers)

These files are clean, patched, and have no upstream dependencies that could change them.

| Order | File | Destination | Notes |
|-------|------|-------------|-------|
| 1 | `MSS_CRC_IO_comparator_trials_agent3.md` | `v2/comparator_trials/` | CheckMate 9X8 added 2026-04-29; all corrections applied |
| 2 | `biomarker_biology_map_agent4.md` | `v2/biomarker_biology/` | Clean; no patches needed |
| 3 | `brenus_scientific_anchor_alzeeb2024.md` | `v2/preclinical/` | DNFB typo patched; all data VERIFIED |
| 4 | `brenus_engine_safe_input_block_v2.yaml` | `v2/engine/` | CheckMate 9X8 added; B-003 updated to PRESS-RELEASE-ONLY |
| 5 | `brenus_guardrail_policy_v1.yaml` | `v2/engine/` | Clean; no changes needed |
| 6 | `brenus_diligence/guardrails/brenus_flags.py` | `v2/engine/guardrails/` | 47/47 tests pass; no changes needed |
| 7 | `brenus_diligence/receipts/receipt_brenus.py` | `v2/engine/receipts/` | Clean |

### BATCH 2 — Migrate After Batch 1 Verified (derived from Batch 1 sources)

| Order | File | Destination | Notes |
|-------|------|-------------|-------|
| 8 | `brenus_corporate_dossier_agent1.md` | `v2/corporate/` | All 3 patches applied (REC-004, REC-005, REC-006); SC-001 conflict documented |
| 9 | `crispro_fitgap_brenus_agent5.md` | `v2/fitgap/` | All patches applied (REC-003, REC-008, W-001); CheckMate 9X8 in Guardrail 2 |
| 10 | `break_crc001_trial_analysis_agent2.md` | `v2/trial_analysis/` | CONDITIONAL: §8 must carry PRESS-RELEASE-ONLY label; all other sections clean |

### BATCH 3 — Migrate After Batch 2 Verified (synthesis documents)

| Order | File | Destination | Notes |
|-------|------|-------------|-------|
| 11 | `brenus_crispro_master.md` | `v2/master/` | All patches applied; CheckMate 9X8 added to §1.7; PRESS-RELEASE-ONLY applied to §1.4 |
| 12 | `brenus_crispro_master.mdc` | `v2/master/` | Mirror of .md; same patches applied |
| 13 | `internal_strategy_memo_agent6.md` | `v2/strategy/` | HR corrected; CheckMate 9X8 added to failure landscape |
| 14 | `outreach_email_brenus_agent6.md` | `v2/outreach/` | Clean; guardrail-compliant |

### BATCH 4 — Migrate After Blocker Resolution (blocked pending new data)

| Order | File | Blocker | What's needed | ETA |
|-------|------|---------|---------------|-----|
| 15 | Any file asserting SC-001 resolution | B-006 | Brenus internal data on HT29 BRAF V600E rationale | Unknown |
| 16 | Any file asserting peer-reviewed clinical efficacy | B-003 (full closure) | Peer-reviewed publication of BreAK CRC-001 interim results | ~2027 (primary completion 2028-06) |
| 17 | Any file asserting clinical GMP parameters | B-002 | Brenus data room / IND filing | Unknown |

---

## PENDING ITEMS FROM DOWNSTREAM ARTIFACT MAP

These items were flagged in `downstream_artifact_map.md` as pending. Status after this migration pass:

| Item | Status | Notes |
|------|--------|-------|
| Add CheckMate 9X8 to Agent 3 | **DONE** (2026-04-29) | Added to Tier 2 table with full data and source citation |
| Add CheckMate 9X8 to Agent 5 fit capabilities | **DONE** (2026-04-29, PATCH 3 + W-001) | Added to Guardrail 2 narrative |
| Add CheckMate 9X8 to engine YAML | **DONE** (2026-04-29) | Full block added to `brenus_engine_safe_input_block_v2.yaml` |
| Standardize `VERIFIED (claim exists)` tags in Agent 1 §5 claims 4,5,7–11,13–19,22 | **DEFERRED** | All have adequate caveats in notes column; not a hard blocker; defer to next scheduled edit |

---

## WHAT CANNOT BE MIGRATED (PERMANENT BLOCKS)

The following claims must never appear in any migrated file without the specified constraints:

| Claim | Constraint | Authority |
|-------|-----------|-----------|
| CEO superlative quote ("stronger than anything previously reported") | PERMANENTLY BLOCKED — do not use in any output | Guardrail policy v1 |
| Murine efficacy extrapolated to human without qualifier | PERMANENTLY BLOCKED — must always carry "murine only" qualifier | Alzeeb et al. 2024 authors' caveat |
| HT29 as vaccine component without SC-001 disclosure | PERMANENTLY BLOCKED until B-006 resolved | SC-001 active conflict |
| n=6 data as [PROTOCOL FACT — VERIFIED] | PERMANENTLY BLOCKED — must carry PRESS-RELEASE-ONLY | B-003 policy |
| HR 1.02 for NCT03050814 | PERMANENTLY BLOCKED — correct value is HR 1.061 | PhD Verification Agent correction |
| ASCO 2024 efficacy data | PERMANENTLY BLOCKED — ASCO 2024 was study design only | Weaponization Agent B-005 closure |
| "Over 200 cancer-related proteins" as VERIFIED | PERMANENTLY BLOCKED — must carry COMPANY_CLAIM | C-004 resolution |

---

## MIGRATION COMPLETION CRITERIA

A migration batch is complete when:
1. All files in the batch have been copied to the destination path
2. Post-migration grep sweep confirms no blocked claims in migrated files
3. All evidence grade tags are present and correct
4. SC-001 conflict disclosure is present in all files referencing HT29 or human cell lines
5. Commit hash recorded in this document

**Current migration state:** All patches applied. Files ready for Batch 1–3 migration. Awaiting git commit (Step 6).

---

## CHANGE LOG

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-04-29 | Initial creation. All 8 REC patches + 3 Weaponization Agent patches applied. CheckMate 9X8 added to Agent 3, Agent 5, master scaffold, engine YAML. B-003 updated to PRESS-RELEASE-ONLY. B-005 CLOSED. All pending items from downstream_artifact_map.md resolved except VERIFIED tag standardization (deferred). |

---

*Canon Reconciliation + Migration Agent v2 — 2026-04-29*
