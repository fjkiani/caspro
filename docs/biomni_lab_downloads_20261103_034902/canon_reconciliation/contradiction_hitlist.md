---
title: Brenus Canon Reconciliation — Contradiction Hitlist
version: 1.0
created: 2026-04-28
agent: Canon Reconciliation Agent
ground_truth: brenus_verified_claim_ledger_v1.md + brenus_canon_v2_freeze.md (v2.1-FREEZE)
scope: All Brenus-related files in fjkiani/Brenus repo and /mnt/results/ prior-session outputs
---

# BRENUS CANON RECONCILIATION — CONTRADICTION HITLIST

> **Ground truth:** `brenus_verified_claim_ledger_v1.md` (49 claims, 6 contradictions C-001–C-006, 5 blockers B-001–B-005) and `brenus_canon_v2_freeze.md` (v2.1-FREEZE, 2026-04-28).
> **Policy:** No claim from a blocked or unverified source is inherited as VERIFIED. Every contradiction below must be resolved before the affected file is used in any external-facing output.

---

## CONTRADICTION REGISTRY

| ID | Severity | File | Section / Line | Issue Class |
|----|----------|------|----------------|-------------|
| REC-001 | HIGH | `brenus_crispro_master.md` | §1.7 table, row 8 | STALE VALUE |
| REC-002 | HIGH | `brenus_crispro_master.md` | §1.9 table, "Primary endpoint result" row | STALE VALUE |
| REC-003 | MEDIUM | `crispro_fitgap_brenus_agent5.md` | §5 Guardrail 2, line 241 | STALE VALUE |
| REC-004 | MEDIUM | `brenus_corporate_dossier_agent1.md` | §2.2 table, "Cell lines (human product STC-1010)" row | OUTDATED ENTRY |
| REC-005 | LOW | `brenus_corporate_dossier_agent1.md` | §5 Claim #21 | AMBIGUOUS EVIDENCE TAG |
| REC-006 | LOW | `brenus_corporate_dossier_agent1.md` | §6.1 missing-data table | OUTDATED ENTRY |
| REC-007 | MINOR | `brenus_scientific_anchor_alzeeb2024.md` | §2 Manufacturing table, Haptenation row | TYPOGRAPHIC ERROR |
| REC-008 | MINOR | `crispro_fitgap_brenus_agent5.md` | §3 Gap 3 intro paragraph | FRAMING IMPRECISION |

---

## DETAILED ENTRIES

---

### REC-001 — HIGH | `brenus_crispro_master.md` §1.7

**Offending text (exact):**
```
| AdCEA+avelumab+mFOLFOX6+bev | NCT03050814 | 1L MSS mCRC | PFS |
  PFS HR 1.02 (95% CI 0.65–1.60); CEA-T cells in >80% vaccinated |
  CLINICAL EVIDENCE | `agent3.md line 61`
```

**Conflict reason:** HR 1.02 (95% CI 0.65–1.60) is the pre-correction stale value. The PhD Verification Agent (2026-04-28) corrected this to HR 1.061 (95% CI 0.380–2.966), p=0.91, from the ClinicalTrials.gov registry results module for NCT03050814. Agent 3 has already been patched with the correct value and a `⚠️ [CORRECTED]` marker. The master scaffold §1.7 was not updated.

**Correct value:** `PFS HR 1.061 (95% CI 0.380–2.966), p=0.91`

**Corrected row:**
```
| AdCEA+avelumab+mFOLFOX6+bev | NCT03050814 | 1L MSS mCRC | PFS |
  PFS HR 1.061 (95% CI 0.380–2.966), p=0.91 ⚠️ [CORRECTED 2026-04-28];
  CEA-T cells in >80% vaccinated | CLINICAL EVIDENCE | `agent3.md line 61`
```

**Downstream risk:** Any output citing §1.7 of the master scaffold will propagate the stale HR. The stale CI (0.65–1.60) is also misleading — it implies a tighter, more powered estimate than the actual n=26 trial produced.

---

### REC-002 — HIGH | `brenus_crispro_master.md` §1.9

**Offending text (exact):**
```
| Primary endpoint result | PFS HR 1.02 (95% CI 0.65–1.60) — no benefit |
  Redman et al. (Oncologist 2022, DOI: 10.1093/oncolo/oyab046) |
```

**Conflict reason:** Same stale HR as REC-001. §1.9 is the dedicated NCT03050814 design-precedent table and is the most likely section to be cited in partner-facing materials. The stale CI (0.65–1.60) implies n≈70 power (the original target enrollment); the actual trial terminated at n=26 treated, producing the wide CI (0.380–2.966) that correctly reflects the underpowered termination.

**Correct value:** `PFS HR 1.061 (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility (n=26 treated, far short of 70-subject target)`

**Corrected row:**
```
| Primary endpoint result | PFS HR 1.061 (95% CI 0.380–2.966), p=0.91 —
  TERMINATED for futility at unplanned interim (n=26 treated) ⚠️ [CORRECTED 2026-04-28] |
  NCT03050814 registry results module; Redman et al. Oncologist 2022
  (DOI: 10.1093/oncolo/oyab046) |
```

**Downstream risk:** Highest-risk entry in the master scaffold. The stale CI could be used to argue the trial was adequately powered; the correct CI makes clear it was not.

---

### REC-003 — MEDIUM | `crispro_fitgap_brenus_agent5.md` §5 Guardrail 2 (line 241)

**Offending text (exact):**
```
The entire history of MSS CRC IO (CheckMate 142 MSS cohort ORR 0%,
GVAX + pembrolizumab ORR 0%, AdCEA + avelumab PFS HR 1.02) demonstrates
that peripheral immune activation consistently fails to translate to
clinical benefit [PROVEN EFFICACY — Agent 3].
```

**Conflict reason:** `HR 1.02` is the stale pre-correction value. Agent 3 has been patched to HR 1.061. Agent 5 Guardrail 2 was not updated.

**Corrected text:**
```
The entire history of MSS CRC IO (CheckMate 142 MSS cohort ORR 0%,
GVAX + pembrolizumab ORR 0%, AdCEA + avelumab PFS HR 1.061
(95% CI 0.380–2.966), p=0.91 — TERMINATED for futility ⚠️ [CORRECTED 2026-04-28])
demonstrates that peripheral immune activation consistently fails to translate
to clinical benefit [PROVEN EFFICACY — Agent 3].
```

**Downstream risk:** Medium. Guardrail 2 is an internal prohibition, not a partner-facing claim. However, if the guardrail text is quoted in training materials or internal reviews, the stale HR propagates.

---

### REC-004 — MEDIUM | `brenus_corporate_dossier_agent1.md` §2.2

**Offending text (exact):**
```
| Cell lines (human product STC-1010) | UNDISCLOSED — described only as
  "established CRC cell lines" | ASCO 2024 abstract (JCO TPS3635) |
```

**Conflict reason:** B-001 (human cell line identity) was resolved in the PhD Verification session (2026-04-28). The canon now records HCT116, HT29, and LoVo as PROVISIONAL (high-confidence) based on ASCO 2023 abstract e14661, EACR25 abstract, and Brenus platform page [37]. The UNDISCLOSED entry is outdated and will cause downstream agents to treat this as an open gap when it has been substantially narrowed.

**Corrected entry:**
```
| Cell lines (human product STC-1010) | HCT116, HT29, LoVo
  [PROVISIONAL — high confidence; ASCO 2023 e14661 (user-cited),
  EACR25 abstract (user-cited), Brenus platform page [37];
  B-001 RESOLVED 2026-04-28; full confirmation requires ASCO abstract
  database access or Brenus NDA data room] | ASCO 2023 e14661;
  EACR25 abstract; Brenus platform page [37] |
```

**Downstream risk:** Medium. Agent 1 is the corporate dossier used as the primary reference for partner-facing materials. An UNDISCLOSED entry here will cause any downstream agent or analyst to treat cell line identity as a live gap, potentially triggering unnecessary data requests or incorrect gap framing.

---

### REC-005 — LOW | `brenus_corporate_dossier_agent1.md` §5 Claim #21

**Offending text (exact):**
```
| 21 | STC-1010 targets >200 tumor antigens | Multiple press releases |
  2023–2026 | Press releases | "educate the patient's immune system to detect
  and destroy them, thanks to the widest panel of therapeutic targets currently
  available (over 200 tumor antigens)" | VERIFIED (claim exists) |
  Claim repeated across multiple press releases from same company;
  no independent validation |
```

**Conflict reason:** The tag `VERIFIED (claim exists)` is ambiguous. It correctly notes the claim exists in press releases, but the parenthetical `(claim exists)` is non-standard and could be read as verifying the scientific finding rather than merely the existence of the press release claim. The master scaffold §2.2 and Agent 5 Guardrail 4 both correctly tag this as `[COMPANY CLAIM — not peer-reviewed enumeration]`. Agent 1 §5 is inconsistent with those files.

**Corrected tag:**
```
| COMPANY CLAIM — claim exists in multiple press releases; not independently
  validated; not peer-reviewed enumeration; do not promote to VERIFIED |
```

**Downstream risk:** Low. The note "no independent validation" partially mitigates the risk, but the non-standard tag creates inconsistency across files.

---

### REC-006 — LOW | `brenus_corporate_dossier_agent1.md` §6.1

**Offending text (exact):**
```
| Identity of human CRC cell lines used in STC-1010 | The preclinical paper
  (Alzeeb et al. 2024) uses CT26, CMT-93, LTPA (murine). The human product
  uses "established CRC cell lines" — never disclosed publicly. This is likely
  a core IP asset. | HIGH — Cell line identity determines antigen coverage,
  IP defensibility, and comparability to competitors |
```

**Conflict reason:** "Never disclosed publicly" is outdated. B-001 was resolved (PROVISIONAL) on 2026-04-28. The missing-data table should reflect the current status: substantially narrowed gap, not an open unknown.

**Corrected entry:**
```
| Identity of human CRC cell lines used in STC-1010 | B-001 RESOLVED
  (PROVISIONAL) 2026-04-28. ASCO 2023 e14661, EACR25 abstract, and Brenus
  platform page [37] converge on HCT116, HT29, LoVo. Full confirmation
  requires ASCO abstract database access or Brenus NDA data room.
  NOTE: HT29 carries BRAF V600E / KRAS-WT — creates SC-001 active conflict
  with trial's BRAF-exclusion criterion. | MEDIUM (substantially narrowed;
  confirmation path clear) |
```

**Downstream risk:** Low. §6.1 is a missing-data inventory, not a claim surface. However, an outdated entry here will cause any analyst using Agent 1 as a reference to mischaracterize the gap status.

---

### REC-007 — MINOR | `brenus_scientific_anchor_alzeeb2024.md` §2

**Offending text (exact):**
```
| Haptenation | DFNB (dinitrofluorobenzene, Sigma) 12.7 µg/mL for 30 min |
```

**Conflict reason:** Typographic error. The correct abbreviation for dinitrofluorobenzene is **DNFB**, not DFNB. All other Brenus files (master scaffold §1.5, Agent 2, Agent 5, canon freeze) use DNFB consistently. The anchor file is the only file with the transposed abbreviation.

**Corrected text:**
```
| Haptenation | DNFB (dinitrofluorobenzene, Sigma) 12.7 µg/mL for 30 min |
```

**Downstream risk:** Minor. The full chemical name is present, so the scientific meaning is unambiguous. However, DFNB is a different compound (difluorobenzene derivatives), and the typo could cause confusion in any automated text parsing or cross-reference search.

---

### REC-008 — MINOR | `crispro_fitgap_brenus_agent5.md` §3 Gap 3

**Offending text (exact):**
```
Gap description: All clinical efficacy data for STC-1010 as of April 2026
derives from 6 patients with a median follow-up of 6 months
[PRELIMINARY — n=6 only; VERIFIED — Agent 1, Agent 2].
```

**Conflict reason:** The tag `[VERIFIED — Agent 1, Agent 2]` on n=6 data is technically correct (the existence of n=6 data is verified), but the compound tag `[PRELIMINARY — n=6 only; VERIFIED — Agent 1, Agent 2]` implies that Agent 1 and Agent 2 independently verified the clinical finding, when in fact both agents sourced from the same Brenus press release (BusinessWire Jan 2026). The source chain is: Brenus PR → Agent 1 → Agent 2 → Agent 5. This is a single-source chain, not independent verification.

**Corrected tag:**
```
[PRELIMINARY — n=6 only; SOURCE: Brenus PR Jan 2026 (BusinessWire);
not independently verified; single-source chain through Agent 1 and Agent 2]
```

**Downstream risk:** Minor. The PRELIMINARY label is present and correct. The risk is that a reader interprets "VERIFIED — Agent 1, Agent 2" as two independent sources when both trace to the same press release.

---

## SUMMARY TABLE

| ID | Severity | File | Stale/Wrong Value | Correct Value | Patch Required |
|----|----------|------|-------------------|---------------|----------------|
| REC-001 | HIGH | `brenus_crispro_master.md` §1.7 | HR 1.02 (0.65–1.60) | HR 1.061 (0.380–2.966), p=0.91 | YES — before any external use |
| REC-002 | HIGH | `brenus_crispro_master.md` §1.9 | HR 1.02 (0.65–1.60) | HR 1.061 (0.380–2.966), p=0.91; TERMINATED n=26 | YES — before any external use |
| REC-003 | MEDIUM | `crispro_fitgap_brenus_agent5.md` §5 G2 | HR 1.02 | HR 1.061 (0.380–2.966), p=0.91 | YES — before internal review distribution |
| REC-004 | MEDIUM | `brenus_corporate_dossier_agent1.md` §2.2 | UNDISCLOSED | HCT116/HT29/LoVo [PROVISIONAL] | YES — before internal review distribution |
| REC-005 | LOW | `brenus_corporate_dossier_agent1.md` §5 Claim #21 | VERIFIED (claim exists) | COMPANY CLAIM | YES — before next agent run |
| REC-006 | LOW | `brenus_corporate_dossier_agent1.md` §6.1 | "never disclosed publicly" | B-001 RESOLVED (PROVISIONAL) | YES — before next agent run |
| REC-007 | MINOR | `brenus_scientific_anchor_alzeeb2024.md` §2 | DFNB | DNFB | YES — low urgency |
| REC-008 | MINOR | `crispro_fitgap_brenus_agent5.md` §3 Gap 3 | VERIFIED — Agent 1, Agent 2 | single-source chain from Brenus PR | YES — low urgency |

---

*Canon Reconciliation Agent — 2026-04-28*
*Ground truth: brenus_verified_claim_ledger_v1.md + brenus_canon_v2_freeze.md v2.1-FREEZE*
