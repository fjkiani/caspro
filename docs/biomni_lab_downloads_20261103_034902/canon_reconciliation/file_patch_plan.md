---
title: Brenus Canon Reconciliation — File Patch Plan
version: 1.0
created: 2026-04-28
agent: Canon Reconciliation Agent
references: contradiction_hitlist.md (REC-001 through REC-008)
---

# BRENUS CANON RECONCILIATION — FILE PATCH PLAN

> Each patch below is keyed to a contradiction ID in `contradiction_hitlist.md`.
> Patches are ordered by severity (HIGH → MEDIUM → LOW → MINOR).
> Apply patches in order. After each patch, verify the corrected value appears in the file before proceeding.

---

## PATCH 1 — REC-001 | HIGH | `brenus_crispro_master.md` §1.7

**File:** `/mnt/results/brenus_crispro_master.md`
**Section:** §1.7 Key Comparator Trial Results, row 8 (AdCEA+avelumab+mFOLFOX6+bev)

**Find (exact):**
```
| AdCEA+avelumab+mFOLFOX6+bev | NCT03050814 | 1L MSS mCRC | PFS | PFS HR 1.02 (95% CI 0.65–1.60); CEA-T cells in >80% vaccinated | CLINICAL EVIDENCE | `agent3.md line 61` |
```

**Replace with:**
```
| AdCEA+avelumab+mFOLFOX6+bev | NCT03050814 | 1L MSS mCRC | PFS | PFS HR 1.061 (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility (n=26 treated) ⚠️ [CORRECTED 2026-04-28 — prior canon cited HR 1.02 (0.65–1.60); correct values from NCT03050814 registry results module]; CEA-T cells in >80% vaccinated | CLINICAL EVIDENCE | `agent3.md line 61` |
```

**Verification:** After patch, `grep "HR 1.02" brenus_crispro_master.md` should return 0 results in §1.7.

---

## PATCH 2 — REC-002 | HIGH | `brenus_crispro_master.md` §1.9

**File:** `/mnt/results/brenus_crispro_master.md`
**Section:** §1.9 NCT03050814 — Direct Design Precedent for BreAK CRC-001, "Primary endpoint result" row

**Find (exact):**
```
| Primary endpoint result | PFS HR 1.02 (95% CI 0.65–1.60) — no benefit | Redman et al. (Oncologist 2022, DOI: 10.1093/oncolo/oyab046) |
```

**Replace with:**
```
| Primary endpoint result | PFS HR 1.061 (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility at unplanned interim analysis (n=26 treated, far short of 70-subject target) ⚠️ [CORRECTED 2026-04-28 — prior canon cited HR 1.02 (0.65–1.60); correct values from NCT03050814 registry results module] | NCT03050814 registry results module; Redman et al. Oncologist 2022 (DOI: 10.1093/oncolo/oyab046) |
```

**Verification:** After patch, `grep "HR 1.02" brenus_crispro_master.md` should return 0 results anywhere in the file.

---

## PATCH 3 — REC-003 | MEDIUM | `crispro_fitgap_brenus_agent5.md` §5 Guardrail 2

**File:** `/mnt/results/crispro_fitgap_brenus_agent5.md`
**Section:** §5 Active Guardrails, Guardrail 2 body text (approximately line 241)

**Find (exact):**
```
The entire history of MSS CRC IO (CheckMate 142 MSS cohort ORR 0%, GVAX + pembrolizumab ORR 0%, AdCEA + avelumab PFS HR 1.02) demonstrates that peripheral immune activation consistently fails to translate to clinical benefit [PROVEN EFFICACY — Agent 3].
```

**Replace with:**
```
The entire history of MSS CRC IO (CheckMate 142 MSS cohort ORR 0%, GVAX + pembrolizumab ORR 0%, AdCEA + avelumab PFS HR 1.061 (95% CI 0.380–2.966), p=0.91 — TERMINATED for futility ⚠️ [CORRECTED 2026-04-28]) demonstrates that peripheral immune activation consistently fails to translate to clinical benefit [PROVEN EFFICACY — Agent 3].
```

**Verification:** After patch, `grep "HR 1.02" crispro_fitgap_brenus_agent5.md` should return 0 results.

---

## PATCH 4 — REC-004 | MEDIUM | `brenus_corporate_dossier_agent1.md` §2.2

**File:** `/mnt/results/brenus_corporate_dossier_agent1.md`
**Section:** §2.2 STC-1010 Product Characteristics table, "Cell lines (human product STC-1010)" row

**Find (exact):**
```
| Cell lines (human product STC-1010) | **UNDISCLOSED** — described only as "established CRC cell lines" | ASCO 2024 abstract (JCO TPS3635) |
```

**Replace with:**
```
| Cell lines (human product STC-1010) | **HCT116, HT29, LoVo** [PROVISIONAL — high confidence; B-001 RESOLVED 2026-04-28; sources: ASCO 2023 abstract e14661 (user-cited), EACR25 abstract (user-cited), Brenus platform page [37]; full confirmation requires ASCO abstract database access or Brenus NDA data room. NOTE: HT29 carries BRAF V600E / KRAS-WT — SC-001 active conflict with trial BRAF-exclusion criterion (NCT06934538 Exclusion Criterion #7)] | ASCO 2023 e14661; EACR25 abstract; Brenus platform page [37] |
```

**Verification:** After patch, `grep "UNDISCLOSED" brenus_corporate_dossier_agent1.md` should return 0 results in §2.2.

---

## PATCH 5 — REC-005 | LOW | `brenus_corporate_dossier_agent1.md` §5 Claim #21

**File:** `/mnt/results/brenus_corporate_dossier_agent1.md`
**Section:** §5 Verified Claims Table, Claim #21

**Find (exact):**
```
| 21 | STC-1010 targets >200 tumor antigens | Multiple press releases | 2023–2026 | Press releases | "educate the patient's immune system to detect and destroy them, thanks to the widest panel of therapeutic targets currently available (over 200 tumor antigens)" | VERIFIED (claim exists) | Claim repeated across multiple press releases from same company; no independent validation |
```

**Replace with:**
```
| 21 | STC-1010 targets >200 tumor antigens | Multiple press releases | 2023–2026 | Press releases | "educate the patient's immune system to detect and destroy them, thanks to the widest panel of therapeutic targets currently available (over 200 tumor antigens)" | COMPANY CLAIM ⚠️ [CORRECTED 2026-04-28 — prior tag was ambiguous "VERIFIED (claim exists)"; correct tag is COMPANY CLAIM — claim exists in press releases only; not peer-reviewed enumeration; do not promote to VERIFIED] | Claim repeated across multiple press releases from same company; no independent validation; Alzeeb et al. 2024 reports 1,196+ proteins by MS but does not enumerate 200+ validated targets |
```

**Verification:** After patch, `grep "VERIFIED (claim exists)" brenus_corporate_dossier_agent1.md` should return 0 results.

---

## PATCH 6 — REC-006 | LOW | `brenus_corporate_dossier_agent1.md` §6.1

**File:** `/mnt/results/brenus_corporate_dossier_agent1.md`
**Section:** §6.1 Missing Data / Open Questions table, "Identity of human CRC cell lines" row

**Find (exact):**
```
| **Identity of human CRC cell lines used in STC-1010** | The preclinical paper (Alzeeb et al. 2024) uses CT26, CMT-93, LTPA (murine). The human product uses "established CRC cell lines" — never disclosed publicly. This is likely a core IP asset. | HIGH — Cell line identity determines antigen coverage, IP defensibility, and comparability to competitors |
```

**Replace with:**
```
| **Identity of human CRC cell lines used in STC-1010** | B-001 RESOLVED (PROVISIONAL) 2026-04-28. ASCO 2023 e14661, EACR25 abstract, and Brenus platform page [37] converge on HCT116, HT29, LoVo. Full confirmation requires ASCO abstract database access or Brenus NDA data room. NOTE: HT29 carries BRAF V600E / KRAS-WT — creates SC-001 active conflict with trial BRAF-exclusion criterion. ⚠️ [CORRECTED 2026-04-28 — prior entry stated "never disclosed publicly"; B-001 now RESOLVED at PROVISIONAL confidence] | MEDIUM — substantially narrowed; confirmation path clear; SC-001 conflict documented |
```

**Verification:** After patch, `grep "never disclosed publicly" brenus_corporate_dossier_agent1.md` should return 0 results.

---

## PATCH 7 — REC-007 | MINOR | `brenus_scientific_anchor_alzeeb2024.md` §2

**File:** `/mnt/results/brenus_scientific_anchor_alzeeb2024.md`
**Section:** §2 Manufacturing Protocol table, Haptenation row

**Find (exact):**
```
| Haptenation | DFNB (dinitrofluorobenzene, Sigma) 12.7 µg/mL for 30 min |
```

**Replace with:**
```
| Haptenation | DNFB (dinitrofluorobenzene, Sigma) 12.7 µg/mL for 30 min ⚠️ [CORRECTED 2026-04-28 — prior entry had typographic error DFNB; correct abbreviation is DNFB] |
```

**Verification:** After patch, `grep "DFNB" brenus_scientific_anchor_alzeeb2024.md` should return 0 results.

---

## PATCH 8 — REC-008 | MINOR | `crispro_fitgap_brenus_agent5.md` §3 Gap 3

**File:** `/mnt/results/crispro_fitgap_brenus_agent5.md`
**Section:** §3 Gap 3 intro paragraph (approximately line 143)

**Find (exact):**
```
[PRELIMINARY — n=6 only; VERIFIED — Agent 1, Agent 2]
```
*(in the Gap 3 description context only — do not replace other instances of this tag)*

**Replace with:**
```
[PRELIMINARY — n=6 only; SOURCE: Brenus PR Jan 2026 (BusinessWire); single-source chain through Agent 1 and Agent 2 — not independently verified ⚠️ [CLARIFIED 2026-04-28]]
```

**Verification:** After patch, confirm the Gap 3 paragraph no longer implies independent verification from two sources.

---

## Patch Application Order and Dependencies

```
PATCH 1 → PATCH 2  (both in brenus_crispro_master.md; apply sequentially)
PATCH 3            (crispro_fitgap_brenus_agent5.md; independent)
PATCH 4 → PATCH 5 → PATCH 6  (all in brenus_corporate_dossier_agent1.md; apply sequentially)
PATCH 7            (brenus_scientific_anchor_alzeeb2024.md; independent)
PATCH 8            (crispro_fitgap_brenus_agent5.md; independent of PATCH 3)
```

**Post-patch verification sweep:**
```bash
grep -rn "HR 1.02" /mnt/results/*.md          # should return 0 results
grep -rn "DFNB" /mnt/results/*.md             # should return 0 results
grep -rn "UNDISCLOSED" /mnt/results/*.md      # should return 0 results in §2.2 context
grep -rn "never disclosed publicly" /mnt/results/*.md  # should return 0 results
grep -rn "VERIFIED (claim exists)" /mnt/results/*.md   # should return 0 results
```

---

*Canon Reconciliation Agent — 2026-04-28*
*Apply all patches before any external-facing output is generated from affected files.*
