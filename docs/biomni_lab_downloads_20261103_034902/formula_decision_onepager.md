# Formula Decision Onepager — PATH A vs PATH B
**Classification:** DECISION SUPPORT ONLY — manager action required before any recomputation
**Date:** 2026-04-28 (final clean version)
**Owner:** Manager (formula decision is manager-held per B-07)
**Status:** DECISION PENDING — all formula-dependent external claims remain QUARANTINED
**Source memos:** `8d_formula_decision_memo.md`, `formula_affected_claims_table.csv`, `previous_trials_closure_report.md`, `previous_trials_remaining_blockers.md`, `verified_8d_claims.md`, `provisional_8d_claims.md`, `8d_remediation_log.md`

---

## SECTION 1: Exact Formula Definitions

### PATH A — Magnitude-Weighted Similarity

```
fit(p, t) = clip( (p · t) / ‖t‖₂ , 0, 1 )
```

| Property | Value |
|---|---|
| **p** | Patient pathway vector (e.g., [DDR=0.88, MAPK=0.12, PI3K=0.05, VEGF=0.02, HER2=0, IO=0, efflux=0]) |
| **t** | Trial MoA vector |
| **·** | Dot product |
| **‖t‖₂** | L2 norm of the trial vector ONLY |
| **Patient norm in denominator** | **NO** |
| **Codebase component** | `MechanismFitRanker.rank_trials()` in `mechanism_fit_ranker.py` (verified VC-02) |
| **Manuscript section** | §2.4 — explicitly described; §2.4 states "This is NOT cosine similarity" |
| **Patent section** | §4.3 — PATH A formula disclosed |
| **Mathematical ceiling for p_ref** | **0.8898** (= ‖p_ref‖₂; proven by Cauchy-Schwarz; verified VC-04) |

**Ceiling proof (Cauchy-Schwarz):** For any trial vector t in R^7:

```
(p · t) / ‖t‖₂  ≤  ‖p‖₂ · ‖t‖₂ / ‖t‖₂  =  ‖p‖₂
```

For p_ref = [0.88, 0.12, 0.05, 0.02, 0, 0, 0]:

```
‖p_ref‖₂ = sqrt(0.88² + 0.12² + 0.05² + 0.02²) = sqrt(0.7917) = 0.8898
```

No trial vector, regardless of normalization or pathway composition, can produce a PATH A score exceeding **0.8898** for p_ref. This ceiling is scale-invariant in t.

---

### PATH B — Cosine Similarity

```
fit(p, t) = clip( (p · t) / (‖p‖₂ · ‖t‖₂) , 0, 1 )
```

| Property | Value |
|---|---|
| **‖p‖₂** | L2 norm of the patient vector |
| **‖t‖₂** | L2 norm of the trial vector |
| **Patient norm in denominator** | **YES** |
| **Codebase component** | `HolisticScoreService` in `holistic_score/mechanism_fit.py` (verified VC-03) |
| **Manuscript section** | **NOT described** — §2.4 explicitly disavows cosine similarity |
| **Patent section** | Claim 6 (cosine formula disclosed) |
| **Mathematical ceiling for p_ref** | **1.0** (for any patient vector) |

---

### Key Difference Summary

| Property | PATH A | PATH B |
|---|---|---|
| Denominator | ‖t‖₂ only | ‖p‖₂ · ‖t‖₂ |
| Patient norm in denominator | No | Yes |
| Score ceiling (for p_ref) | **0.8898** | **1.0** |
| Can produce 0.983 for p_ref? | **No — mathematically impossible** | **Yes — verified ~0.977 for representative set** |
| Manuscript §2.4 describes it | **Yes** | **No — explicitly disavowed** |
| Patent §4.3 discloses it | **Yes** | Partial (Claim 6 only) |

**The single operative difference:** PATH A retains the patient vector's magnitude as a scaling factor; PATH B removes it. For p_ref, this produces a hard ceiling of 0.8898 under PATH A and no ceiling below 1.0 under PATH B.

---

## SECTION 2: What Changes Under Each Path

The following table covers every formula-dependent claim currently quarantined. Values are taken directly from `formula_affected_claims_table.csv`. PATH B results marked `REQUIRES_RECOMPUTATION` mean engineering must rerun the model under PATH B before any value can be stated.

| Claim ID | Artifact / Section | Current Value | PATH A Result | PATH B Result | Changes? |
|---|---|---|---|---|---|
| DDR_MEAN_874 | Manuscript §2.4 | 0.874 (QUARANTINED) | ~0.874 (consistent with PATH A ceiling of 0.8898; plausible) | REQUIRES_RECOMPUTATION (will be higher than 0.874) | Yes — PATH B will produce a higher value |
| DDR_MEAN_983 | Figure 2 caption | 0.983 (QUARANTINED) | **IMPOSSIBLE** — 0.983 > PATH A ceiling of 0.8898; Figure 2 must be recomputed | REQUIRES_RECOMPUTATION | Yes — Figure 2 must be recomputed regardless of path chosen |
| DISC_RATIO_23X | Manuscript §2.4 / abstract | 23× (QUARANTINED) | ~23× (consistent with DDR mean ~0.874 under PATH A) | REQUIRES_RECOMPUTATION | Yes — PATH B ratio will differ |
| DISC_RATIO_37X | Figure 2 caption | 37.4× (QUARANTINED) | **IMPOSSIBLE** — derived from 0.983 which exceeds PATH A ceiling; must be recomputed | REQUIRES_RECOMPUTATION | Yes — Figure 2 ratio must be recomputed regardless |
| LATIFY_DELTA | Patent §4.4 / Manuscript §2.4 | +0.366 or +0.2641 (two conflicting values; QUARANTINED) | REQUIRES_RECOMPUTATION (also blocked by B-03 vector version conflict, independently of formula decision) | REQUIRES_RECOMPUTATION (also blocked by B-03) | Yes — AND separately blocked by vector version conflict B-03 |
| Manuscript §2.4 formula description | Manuscript §2.4 | "NOT cosine similarity" | **Keep as-is — accurate under PATH A** | **Must be rewritten — currently false under PATH B** | Yes under PATH B |
| Patent §4.3 formula disclosure | Patent §4.3 | PATH A disclosed | Keep as-is | Must add PATH B disclosure | Yes under PATH B |

**Summary:** Under PATH A, the manuscript formula description is already correct; Figure 2 must be recomputed. Under PATH B, Figure 2 is already correct; the manuscript formula description must be rewritten and the patent must be amended.

---

## SECTION 3: What Remains Valid Under Both Paths

The following claims are formula-independent and are external-safe regardless of which path the manager selects. No recomputation is required for these items.

| # | Claim | Evidence | External-safe? |
|---|---|---|---|
| 1 | **Axis set and ordering** — Seven canonical pathway axes (DDR, MAPK, PI3K, VEGF, HER2, IO, efflux) in fixed order; RSS eighth axis added 2026-02-22 | VC-01, VC-05 | YES |
| 2 | **PATH A formula definition** — `fit = clip((p · t) / ‖t‖₂, 0, 1)` is the verified implementation of `MechanismFitRanker`; safe regardless of what formula HolisticScoreService uses | VC-02 | YES |
| 3 | **PATH A mathematical ceiling 0.8898** — For p_ref, ceiling = ‖p_ref‖₂ = 0.8898; mathematical fact about PATH A, not a claim about which formula is authoritative | VC-04 | YES |
| 4 | **Dict→List bug fix date** — 2025-01-13; all scores computed before this date are invalid | VC-06 | YES |
| 5 | **RSS axis addition date** — 2026-02-22; version string "8D.v1" | VC-05 | YES |
| 6 | **Trial count scoping (3 + 1 + 1)** — 3 fully-published + 1 ASCO abstract (LATIFY) + 1 missing delta (NCT02264678) = 5 datasets | DL-04 rewrite | YES |
| 7 | **LATIFY source qualification** — ASCO 2025 abstract (PMID 40645185); preliminary data; full publication not confirmed | PC-03 | YES |
| 8 | **CT-06 §2.4 addendum** — Distinction between MechanismFitRanker (2-component combined score) and HolisticScoreService (4-component blend: mechanism_fit 0.4, eligibility 0.3, pgx_safety 0.15, resistance_risk 0.15) is applied to MANUSCRIPT_DRAFT.md and is formula-independent | CT-06 (APPLIED) | YES |
| 9 | **Filing package document set** — 8-document provisional patent package exists as a draft; filing status is DRAFT; no USPTO receipt obtained | VC-11 | YES (as DRAFT) |
| 10 | **Submission checklist status** — All items unchecked as of 2026-04-28 | VC-11 | YES |
| 11 | **Trade secret classification** — TAG_VECTORS and trial_moa_vectors.json are classified as trade secrets; intentionally absent from both repos | VC-13 | YES |
| 12 | **Reduction-to-practice date (internal)** — 2026-02-22 is the claimed internal date; legal priority date is PENDING USPTO receipt | VC-07 | YES (as internal date only) |

---

## SECTION 4: Recommendation

> **This recommendation is advisory only. The manager must confirm before any recomputation is committed. No quarantined claim has been resolved in the preparation of this document.**

### Recommendation: PATH A

**PATH A is recommended as the authoritative formula.** The recommendation is based solely on code evidence and artifact consistency, not on scientific preference.

#### Evidence for PATH A

**1. PATH A is the verified production implementation of the trial ranker.**
`MechanismFitRanker.rank_trials()` in `mechanism_fit_ranker.py` uses the magnitude-weighted formula. This is the formula the system actually uses for trial ranking. (VC-02)

**2. The manuscript already describes PATH A correctly.**
§2.4 states the formula explicitly and includes the sentence "This is NOT cosine similarity." Selecting PATH A requires no rewrite of the Methods section. Selecting PATH B requires rewriting §2.4 and removing that sentence.

**3. The patent already discloses PATH A.**
§4.3 of the provisional patent describes the magnitude-weighted formula. Selecting PATH A requires no patent amendment for the formula claim. Selecting PATH B requires adding PATH B disclosure to §4.3.

**4. The discrimination ratio 23× is consistent with PATH A.**
The abstract narrative of 23× aligns with the PATH A DDR mean of ~0.874. The Figure 2 value of 37.4× (derived from 0.983) is the anomaly, not the 23× value. Under PATH A, the 23× ratio is plausible; under PATH B, the 23× ratio would need to be recomputed and may not be reproduced.

**5. The 0.874 DDR mean is consistent with PATH A.**
The PATH A ceiling for p_ref is 0.8898. A DDR mean of 0.874 is below this ceiling and is therefore mathematically plausible under PATH A. A DDR mean of 0.983 exceeds the ceiling and is mathematically impossible under PATH A.

---

#### The 0.983 Figure — SEPARATE PUBLICATION-BLOCKING DISCREPANCY

> **WARNING: THIS IS A SEPARATE ISSUE FROM THE PATH A/B DECISION. IT MUST BE RESOLVED INDEPENDENTLY REGARDLESS OF WHICH PATH IS CHOSEN.**

- **PATH A mathematical ceiling for p_ref:** 0.8898 (proven; VC-04)
- **Figure 2 DDR mean value:** 0.983
- **0.983 > 0.8898** — this value is **mathematically impossible** under PATH A for p_ref

Figure 2 was not generated using PATH A. The evidence indicates Figure 2 was generated using PATH B (cosine similarity). This is a formula substitution error: the manuscript Methods section describes PATH A, but Figure 2 was computed under PATH B.

**Why this is publication-blocking regardless of the PATH A/B decision:**
- **If manager selects PATH A:** Figure 2 must be entirely recomputed under PATH A. The DDR mean will be approximately 0.874 (not 0.983). The discrimination ratio will be approximately 23× (not 37.4×). All figure captions and abstract statistics derived from Figure 2 must be updated.
- **If manager selects PATH B:** The manuscript Methods section (§2.4) must be rewritten to describe cosine similarity and remove the sentence "This is NOT cosine similarity."
- **Under either path:** The current state — where the manuscript describes PATH A but Figure 2 shows PATH B values — cannot be submitted for publication. One of the two must change.

**The origin of the 0.983 value in Figure 2 is not confirmed in any directly retrieved artifact.** Engineering must identify the script and input data used to generate Figure 2 before recomputation begins.

---

#### What PATH B Would Require (for completeness)

If the manager selects PATH B instead:
1. **Rewrite manuscript §2.4** — remove "This is NOT cosine similarity"; replace formula block with cosine formula; add note distinguishing PATH A (ranker) from PATH B (holistic score)
2. **Patent amendment** — add PATH B disclosure to §4.3; if PATH A is retained for MechanismFitRanker, both formulas must be disclosed with their respective service contexts
3. **Recompute all PATH A-based statistics** — DDR mean 0.874, discrimination ratio 23×, and all trial-level deltas (Delta=0.138, Delta=0.307, Delta=0.108) were computed under PATH A; all values will change under PATH B
4. **Explain the two-formula architecture** — manuscript and patent must explicitly describe both formulas and their respective contexts

---

## SECTION 5: Cost of Delay

Every day the PATH A/B decision remains unmade, the following items remain blocked:

### Manuscript (publication-blocking)

| Blocked item | Why blocked |
|---|---|
| §2.4 formula statistics (DDR mean, non-DDR mean, discrimination ratio) | Cannot be stated; formula not confirmed |
| Figure 2 | Cannot be finalized; current Figure 2 is internally inconsistent with Methods section regardless of path |
| Abstract statistics | Any abstract derived from the manuscript cannot be submitted to a conference or journal |
| Full manuscript submission | Cannot be submitted for peer review |

### Patent (filing-blocking)

| Blocked item | Why blocked |
|---|---|
| §4.3 formula disclosure | Cannot be finalized until authoritative formula is confirmed |
| §4.4 validation statistics (DDR mean, discrimination ratio) | Cannot be finalized |
| Claims DL-03, DL-07, PC-05 | Remain QUARANTINED |

### External communications (all blocked — do not state externally)

| Blocked claim | Reason |
|---|---|
| DDR mean fit (0.874 or 0.983) | Formula not confirmed |
| Discrimination ratio (23× or 37.4×) | Formula not confirmed |
| Any statistic derived from Figure 2 | Figure 2 is internally inconsistent |
| Full-registry DDR mean = 0.821 | Formula not confirmed |

### Engineering work that cannot start

| Blocked work | Why blocked |
|---|---|
| Figure 2 recomputation | Cannot begin until authoritative formula is confirmed |
| `receipt_subset.py` run | Blocked on formula decision AND trial_moa_entries population |
| Manuscript §2.4 formula block update | Blocked on formula decision |

### Blocker reference

**B-07** (BLOCKED_MANAGER) — affects CT-01, CT-02, DL-03, DL-07, PC-05, and Change 1.2 (manuscript §2.4 PATH B acknowledgment). Per the closure report, B-07 is the **highest-priority blocker** and should be resolved before B-02 (USPTO receipt), B-03 (LATIFY vector), or B-01 (repo access), because the formula decision determines what the repo patches must say.

---

## SECTION 6: Decision Gate

**Single action required to unblock:**

> **Manager reviews this memo and `8d_formula_decision_memo.md`, selects PATH A or PATH B (or both, reported separately), and records the decision in writing.**

Once the decision is recorded:

```
Manager records decision (PATH A / PATH B / both)
    |
    v
Engineering identifies script used to generate Figure 2
(separate required action — must happen regardless of path chosen)
    |
    v
Engineering recomputes Figure 2 under authoritative formula
    |
    v
Update abstract statistics (DDR mean, non-DDR mean, ratio, n counts)
    |
    v
Resolve D1-D5 discrepancies in trial_subset_abstract.json
    |
    v
Populate trial_moa_entries (59 rows) → run receipt_subset.py
    |
    v
Manuscript is external-safe for formula claims
    |
    v
Patent §4.3 and §4.4 can be finalized
```

**If PATH A is selected:** Apply Change 1.2 PATH A option to MANUSCRIPT_DRAFT.md §2.4; lift QUARANTINED labels on formula-dependent statistics after recomputation confirms values.

**If PATH B is selected:** Rewrite §2.4 formula block; remove "This is NOT cosine similarity"; add PATH A context note; amend patent §4.3 to add PATH B disclosure.

**If both, reported separately:** Two-panel Figure 2; two sets of statistics; both formulas disclosed in manuscript and patent; most engineering work but most complete disclosure.

---

*Prepared by: 8D formula decision preparation agent, 2026-04-28 (final clean version)*
*This is a decision support document only. No quarantined claim has been resolved or modified in the preparation of this document. Do not modify this file.*
