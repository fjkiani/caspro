---
title: Brenus Canon Reconciliation — Release Routing & Patch Notes
version: 1.0
created: 2026-04-28
agent: Canon Reconciliation Agent
references: contradiction_hitlist.md, file_patch_plan.md, safe_claim_surface.md, blocked_claim_surface.md
---

# BRENUS CANON RECONCILIATION — RELEASE ROUTING & PATCH NOTES

> This document defines the routing decision for each Brenus file: whether it is cleared for external use, internal use only, or blocked pending patch. It also records the patch notes for any file that has been corrected in this reconciliation pass.

---

## ROUTING DECISIONS

| File | Internal Use | External Use | Routing Decision | Patches Required |
|------|-------------|-------------|-----------------|-----------------|
| `brenus_crispro_master.md` | CONDITIONAL | BLOCKED | Patch REC-001, REC-002 first | PATCH 1, PATCH 2 |
| `brenus_corporate_dossier_agent1.md` | CONDITIONAL | BLOCKED | Patch REC-004, REC-005, REC-006 first | PATCH 4, PATCH 5, PATCH 6 |
| `break_crc001_trial_analysis_agent2.md` | CONDITIONAL | BLOCKED | B-003 pre-existing blocker on §8; all other sections cleared | B-003 resolution path |
| `MSS_CRC_IO_comparator_trials_agent3.md` | CLEARED | CLEARED | No contradictions; all prior corrections applied | None |
| `crispro_fitgap_brenus_agent5.md` | CONDITIONAL | BLOCKED | Patch REC-003, REC-008 first | PATCH 3, PATCH 8 |
| `biomarker_biology_map_agent4.md` | CLEARED | CLEARED | No contradictions | None |
| `internal_strategy_memo_agent6.md` | CLEARED | N/A (internal only by classification) | Internal use cleared | None |
| `outreach_email_brenus_agent6.md` | CLEARED | CLEARED (subject to CSO review) | Guardrail-compliant; all 7 guardrails pass | None |
| `brenus_scientific_anchor_alzeeb2024.md` | CLEARED | CLEARED | Patch DFNB typo (REC-007) — low urgency | PATCH 7 |
| `brenus_engine_safe_input_block_v2.yaml` | CLEARED | N/A | v2.1 reviewed in prior session; no new issues | None |
| `brenus_guardrail_policy_v1.yaml` | CLEARED | N/A | v1 reviewed in prior session; no new issues | None |
| `brenus_diligence/guardrails/brenus_flags.py` | CLEARED | N/A | 47/47 tests pass; SLICE-003 complete | None |
| `brenus_diligence/receipts/receipt_brenus.py` | CLEARED | N/A | SLICE-003 complete | None |

**Routing key:**
- CLEARED: No contradictions; safe for stated use
- CONDITIONAL: Safe for stated use except for the specific sections/claims noted in contradiction_hitlist.md
- BLOCKED: Must not be used for stated purpose until patches are applied
- N/A: Not applicable for that use category

---

## PATCH NOTES — Changes Applied in This Reconciliation Pass

> The following patches are RECOMMENDED by this reconciliation pass but have NOT yet been applied to the source files. Apply using the exact instructions in `file_patch_plan.md`.

### Patch Note 1 — `brenus_crispro_master.md` §1.7 (REC-001)
**Change:** HR 1.02 (95% CI 0.65–1.60) → HR 1.061 (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility (n=26 treated)
**Reason:** PhD Verification Agent correction 2026-04-28; NCT03050814 registry results module
**Urgency:** HIGH — apply before any external use of master scaffold

### Patch Note 2 — `brenus_crispro_master.md` §1.9 (REC-002)
**Change:** HR 1.02 (95% CI 0.65–1.60) → HR 1.061 (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility (n=26 treated)
**Reason:** Same as Patch Note 1; §1.9 is the dedicated NCT03050814 design-precedent table
**Urgency:** HIGH — apply before any external use of master scaffold

### Patch Note 3 — `crispro_fitgap_brenus_agent5.md` §5 Guardrail 2 (REC-003)
**Change:** "AdCEA + avelumab PFS HR 1.02" → "AdCEA + avelumab PFS HR 1.061 (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility ⚠️ [CORRECTED 2026-04-28]"
**Reason:** Guardrail 2 was not updated when Agent 3 was patched
**Urgency:** MEDIUM — apply before internal review distribution

### Patch Note 4 — `brenus_corporate_dossier_agent1.md` §2.2 (REC-004)
**Change:** "UNDISCLOSED — described only as 'established CRC cell lines'" → "HCT116, HT29, LoVo [PROVISIONAL — B-001 RESOLVED 2026-04-28; SC-001 conflict noted]"
**Reason:** B-001 resolved in PhD Verification session; UNDISCLOSED entry is outdated
**Urgency:** MEDIUM — apply before internal review distribution

### Patch Note 5 — `brenus_corporate_dossier_agent1.md` §5 Claim #21 (REC-005)
**Change:** "VERIFIED (claim exists)" → "COMPANY CLAIM ⚠️ [CORRECTED 2026-04-28]"
**Reason:** Non-standard tag inconsistent with master scaffold §2.2 and Agent 5 Guardrail 4
**Urgency:** LOW — apply before next agent run

### Patch Note 6 — `brenus_corporate_dossier_agent1.md` §6.1 (REC-006)
**Change:** "never disclosed publicly" → "B-001 RESOLVED (PROVISIONAL) 2026-04-28"
**Reason:** B-001 resolved; missing-data entry is outdated
**Urgency:** LOW — apply before next agent run

### Patch Note 7 — `brenus_scientific_anchor_alzeeb2024.md` §2 (REC-007)
**Change:** "DFNB" → "DNFB"
**Reason:** Typographic error; DNFB is the correct abbreviation for dinitrofluorobenzene
**Urgency:** MINOR — apply at next scheduled edit

### Patch Note 8 — `crispro_fitgap_brenus_agent5.md` §3 Gap 3 (REC-008)
**Change:** "[PRELIMINARY — n=6 only; VERIFIED — Agent 1, Agent 2]" → "[PRELIMINARY — n=6 only; SOURCE: Brenus PR Jan 2026 (BusinessWire); single-source chain through Agent 1 and Agent 2 — not independently verified]"
**Reason:** Framing imprecision; Agent 1 and Agent 2 both trace to the same Brenus press release
**Urgency:** MINOR — apply at next scheduled edit

---

## PRE-EXISTING BLOCKERS (Not New — Ledger-Documented)

These blockers were identified in prior sessions and are documented in `brenus_final_blockers_registry.md`. They are not new findings from this reconciliation pass. They are listed here for completeness.

| Blocker | File | Section | Status | Resolution Path |
|---------|------|---------|--------|-----------------|
| B-003: n=6 data sourced from press releases that failed retrieval | `break_crc001_trial_analysis_agent2.md` | §8 | OPEN | Direct retrieval of BusinessWire PR or AACR 2026 Poster CT051, OR Brenus NDA data room |
| SC-001: HT29 BRAF V600E conflict with trial BRAF-exclusion | All files referencing HT29 | Various | ACTIVE CONFLICT — must disclose | Scientific explanation required before external disclosure |
| B-004: Bevacizumab assignment provisional | `brenus_engine_safe_input_block_v2.yaml` | bev_assignment | PROVISIONAL | Phase I patient-level data under NDA |

---

## DOWNSTREAM AGENT ROUTING

### What downstream agents MAY use immediately (no patches required):
- All claims in `safe_claim_surface.md`
- `MSS_CRC_IO_comparator_trials_agent3.md` (all sections)
- `biomarker_biology_map_agent4.md` (all sections)
- `internal_strategy_memo_agent6.md` (all sections — internal only)
- `outreach_email_brenus_agent6.md` (subject to CSO review)
- `brenus_engine_safe_input_block_v2.yaml` v2.1
- `brenus_guardrail_policy_v1.yaml` v1

### What downstream agents MUST NOT use until patches applied:
- HR 1.02 for NCT03050814 (any file, any section)
- "UNDISCLOSED" cell line entry from Agent 1 §2.2
- "VERIFIED (claim exists)" tag on >200 antigen claim
- "never disclosed publicly" language from Agent 1 §6.1
- DFNB abbreviation from anchor file §2

### What downstream agents MUST NEVER use (permanently blocked):
- CEO superlative quote ("stronger than anything previously reported")
- Murine efficacy extrapolated to human without murine-only qualifier
- HT29 as vaccine component without SC-001 conflict disclosure
- n=6 data as [PROTOCOL FACT — VERIFIED] (B-003)

---

## RECONCILIATION PASS METADATA

| Field | Value |
|-------|-------|
| Pass date | 2026-04-28 |
| Agent | Canon Reconciliation Agent |
| Files reviewed | 9 priority files + 4 engine/config files |
| Contradictions found | 8 (REC-001 through REC-008) |
| New contradictions (not in prior ledger) | 3 (REC-001, REC-002, REC-007) |
| Contradictions already in ledger (C1–C5) | 5 (REC-003=C3, REC-004=C1, REC-005=C3, REC-006=C1, REC-008=new framing) |
| Files with 0 contradictions | 4 (Agent 3, Agent 4, Agent 6 memo, Agent 6 email) |
| Files requiring patches | 3 (master scaffold, Agent 1, Agent 5) |
| Patches applied in this pass | 0 (all patches are RECOMMENDED; apply via file_patch_plan.md) |
| Next reconciliation recommended | After all 8 patches applied; or after any new agent run |

---

*Canon Reconciliation Agent — 2026-04-28*
