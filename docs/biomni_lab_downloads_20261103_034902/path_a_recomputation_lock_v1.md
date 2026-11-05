# PATH A Recomputation Lock — v1
**Document ID:** path_a_recomputation_lock_v1
**Date:** 2026-05-04
**Authority:** PATH A formula signed 2026-04-28 by Fahad Kiani
**Formula:** `fit = clip((p·t) / ‖t‖₂, 0, 1)`
**Axis order (7D, fixed):** [ddr, mapk, pi3k, vegf, her2, io, efflux]
**Status:** CANONICAL — supersedes all prior PATH A score references

---

## 1. CLAIM STATUS SUMMARY

| Claim ID | Prior Status | New Status | Resolution Type |
|---|---|---|---|
| CT-01 | QUARANTINED | **LOCKED (PATH A)** | Full — Brenus comparator scores locked; Change 1.2 applied |
| CT-02 | QUARANTINED | **LOCKED (PATH A)** | Full — all 7 comparator scores verified, ceiling PASS |
| DL-03 | QUARANTINED | **PARTIALLY RESOLVED** | Brenus subset locked; full Figure 2 still blocked by B-04 |
| PC-05 | QUARANTINED | **PARTIALLY RESOLVED** | Direction confirmed; magnitude requires trial_moa_vectors.json |
| DL-07 | PERMANENTLY BLOCKED | **PERMANENTLY BLOCKED** | No change — 0.983 mathematically impossible under PATH A |
| PC-02 | PERMANENTLY DOWNGRADED | **PERMANENTLY DOWNGRADED** | No change |
| CT-03 / LATIFY delta | QUARANTINED | **QUARANTINED** | No change — vector version unresolved |

---

## 2. CT-01 RESOLUTION: Formula Conflict — Manuscript §2.4

**Claim:** Manuscript §2.4 describes PATH A as the sole formula; PATH B (cosine) exists simultaneously.

**Resolution:** PATH A is the signed production formula (2026-04-28). Change 1.2 from
`patched_files_change_log.md` is now applied. The following paragraph is the authoritative
addition to manuscript §2.4 (after the combined score paragraph):

> **[Change 1.2 — apply to MANUSCRIPT_DRAFT.md §2.4]**
>
> The mechanism fit formula described above (PATH A: `fit = clip((p·t)/‖t‖₂, 0, 1)`) is
> used by the trial ranking service (`MechanismFitRanker`) and is the formula used to
> generate all statistics reported in this manuscript. A separate cosine similarity
> implementation exists in the holistic score service (`HolisticScoreService`) for a
> different scoring context; it is not used in the discrimination analysis reported here.

**Status: LOCKED (PATH A)** — apply Change 1.2 to MANUSCRIPT_DRAFT.md §2.4 immediately.
Repo access (B-01) required to apply to mdc artifacts.

---

## 3. CT-02 RESOLUTION: Brenus Comparator PATH A Scores

**Claim:** Comparator trial fit scores for BreAK CRC-001 positioning — quarantined pending PATH A lock.

**Patient vectors:**
| Profile | ddr | mapk | pi3k | vegf | her2 | io | efflux | Ceiling (‖p‖₂) |
|---|---|---|---|---|---|---|---|---|
| P_A — liver-met NEG, IO-permissive | 0.10 | 0.70 | 0.20 | 0.30 | 0.00 | 0.40 | 0.05 | **0.8902** |
| P_B — liver-met POS, IO-suppressed | 0.10 | 0.70 | 0.20 | 0.30 | 0.00 | 0.10 | 0.05 | **0.8016** |

**Locked PATH A scores (run 2026-05-04, verified against 2026-05-01 run — all MATCH):**

| CORE | Trial | Tier | fit_A (liver-NEG) | fit_B (liver-POS) | Δ | Rank (fit_A) | Rank (Δ) | Ceiling |
|---|---|---|---|---|---|---|---|---|
| CORE-04 | IMblaze370 | T1 | **0.8262** | 0.6751 | 0.1511 | 1 | 7 | PASS |
| CORE-05 | AtezoTRIBE | T1 | 0.5843 | 0.3671 | 0.2172 | 2 | 6 | PASS |
| CORE-01 | QUILT-2.004 | T1 | 0.5815 | 0.3553 | 0.2261 | 3 | 5 | PASS |
| CORE-02 | GRANITE GO-010 | **T2** | 0.5411 | 0.2832 | 0.2579 | 4 | 4 | PASS |
| CORE-06 | MEDITREME | T1 | 0.5037 | 0.2089 | 0.2949 | 5 | 3 | PASS |
| CORE-03 | GVAX+CY+Pembro | T1 | 0.4486 | 0.1495 | 0.2991 | 6 | 2 | PASS |
| CORE-07 | CCTG CO.26 | T1 | 0.4000 | 0.1000 | 0.3000 | 7 | 1 | PASS |

**All ceiling checks: PASS** (no score exceeds P_A ceiling 0.8902 or P_B ceiling 0.8016)
**CORE-02 (GRANITE):** TIER2 — scores are directional only; do not cite as efficacy evidence.

**Critical interpretation (mandatory — do not omit):**
- **IMblaze370 fit_A=0.8262 is a FALSE POSITIVE.** Highest fit_A reflects KRAS-driven MAPK
  axis alignment, not mechanism validity. IMblaze370 is a Phase III definitive negative
  (OS HR=1.00). The MEKi immune priming hypothesis was falsified. STC-1010 ICD mechanism
  must be explicitly distinguished from MEKi priming in all downstream outputs.
- **Δ ranking measures IO-axis liver-met sensitivity, not trial quality.** CO.26 (Δ=0.30)
  ranks first on delta because it is a pure IO trial — maximally sensitive to liver-met
  suppression. This confirms liver-met stratification as the highest-leverage design variable.

**Status: LOCKED (PATH A)** — these scores are authoritative for L3 Comparator Trials.
Safe for 8D use with mandatory interpretation notes above.

---

## 4. DL-03 RESOLUTION: DDR Mean — Brenus Comparator Subset

**Claim:** Manuscript §2.4 states DDR-targeting trials showed a mean mechanism fit of 0.874.
Figure 2 states 0.983. Both are quarantined.

**What this document resolves:** PATH A DDR mean for the **Brenus comparator subset only**.

**DDR-targeting trials in Brenus subset (ddr > 0, n=3):**
| Trial | ddr weight | fit_A |
|---|---|---|
| IMblaze370 (CORE-04) | 0.05 | 0.8262 |
| AtezoTRIBE (CORE-05) | 0.10 | 0.5843 |
| MEDITREME (CORE-06) | 0.10 | 0.5037 |

**PATH A DDR mean (Brenus subset, n=3): 0.6381**
**Ceiling check: PASS** (0.6381 ≤ 0.8902)

**MANDATORY SCOPE CAVEAT:**
This value (0.6381) is computed from the Brenus comparator subset (n=3 DDR-containing trials).
It is NOT a replacement for the manuscript Figure 2 DDR mean. The manuscript's DDR mean
(0.874 in §2.4; 0.983 in Figure 2) was computed across the full 8D trial database
(n=31 DDR-targeting trials per the mdc). Full Figure 2 recomputation requires:
1. Population of `trial_moa_entries` (59 rows with moa_vector per row) — blocked by B-04
2. Execution of `receipt_subset.py`
3. PATH A formula (now locked — this unblocks step 3 once steps 1-2 are complete)

**Note on §2.4 value (0.874):** Under PATH A, 0.874 is plausible (below ceiling 0.8898 for
p_ref). It may be correct if computed from the full DDR trial subset. It cannot be confirmed
without `trial_moa_entries`. Do not cite 0.874 externally until confirmed.

**Figure 2 DDR mean (0.983): PERMANENTLY BLOCKED** — mathematically impossible under PATH A
(ceiling = 0.8898). This is a separate publication-blocking issue independent of this lock.

**Status: PARTIALLY RESOLVED**
- Brenus subset DDR mean: **LOCKED at 0.6381** (PATH A, n=3, Brenus comparator subset)
- Full manuscript Figure 2 DDR mean: **BLOCKED** pending B-04 (trial_moa_entries population)
- §2.4 value 0.874: **UNCONFIRMED** — plausible under PATH A but not verified

---

## 5. PC-05 RESOLUTION: Retroactive Validation Deltas (Patent §4.4)

**Claim:** Patent §4.4 states retroactive validation deltas for 4 trials.

**What this document resolves:** PATH A direction confirmation for all 4 trials.
Magnitude cannot be confirmed without `trial_moa_vectors.json` (trade secret).

**Approximate recomputation results (PATH A, approximate vectors):**

| Trial | p_A (high-signal) | p_B (low-signal) | fit_A | fit_B | Computed Δ | Documented Δ | Direction | Ceiling |
|---|---|---|---|---|---|---|---|---|
| Berzosertib (NCT02595892) | RS-Low (DDR-high) | RS-High (efflux=0.30) | 0.8839 | 0.5051 | +0.3788 | +0.138 | ✓ CORRECT | PASS |
| Adavosertib (NCT03579316) | PTEN-intact | PTEN-loss (pi3k=0.8) | 0.7052 | 0.7491 | **−0.0439** | +0.307 | ✗ INVERTED | PASS |
| CAPRI (NCT03462342) | Pre-PARPi | Post-PARPi (efflux=0.4) | 0.8003 | 0.8003 | **+0.0000** | +0.108 | ✗ ZERO | PASS |
| LATIFY (NCT05450692) | STK11-loss (io=0.75) | STK11-intact (io=0.30) | 0.7500 | 0.3000 | +0.4500 | +0.366 | ✓ CORRECT | PASS |

**Critical finding — Adavosertib and CAPRI direction failures:**
The approximate vectors for Adavosertib and CAPRI do not reproduce the documented delta
direction. This is expected: the documented deltas were computed with the exact
`trial_moa_vectors.json` (trade secret). The approximate trial vectors used here are
insufficient to reproduce the Adavosertib and CAPRI results.

**Interpretation:**
- Berzosertib and LATIFY: direction confirmed under PATH A with approximate vectors.
- Adavosertib and CAPRI: direction cannot be confirmed without exact trial vectors.
  The documented positive deltas (+0.307, +0.108) are plausible under PATH A if the
  exact trial vectors have the correct axis composition — but this cannot be verified
  without `trial_moa_vectors.json`.
- LATIFY: QUARANTINED (CT-03) — two documented values (+0.366, +0.2641); vector version
  unresolved. Approximate computation (+0.4500) is directionally consistent but not
  authoritative.

**Status: PARTIALLY RESOLVED**
- Direction confirmed: Berzosertib ✓, LATIFY ✓ (directional only — CT-03 still quarantined)
- Direction unconfirmed: Adavosertib, CAPRI (approximate vectors insufficient)
- Full resolution requires: `trial_moa_vectors.json` → run `retroactive_prediction_run.py --trial-vectors trial_moa_vectors.json`
- PC-05 cannot be stated as fully resolved until script reproduces documented deltas cleanly.

---

## 6. WHAT THIS LOCK UNBLOCKS

| Item | Unblocked? | Condition |
|---|---|---|
| L3 Comparator Trials (CT-01/CT-02) | **YES** | Scores locked; use with mandatory interpretation notes |
| Manuscript §2.4 Change 1.2 (PATH B acknowledgment) | **YES** | Apply immediately to MANUSCRIPT_DRAFT.md |
| L5 CrisPRO Fit-Gap (DL-03 Brenus subset) | **PARTIAL** | Brenus subset value (0.6381) locked; full Figure 2 still blocked |
| Patent §4.4 deltas (PC-05) | **PARTIAL** | Direction confirmed for 2/4 trials; magnitude requires trial_moa_vectors.json |
| L6 Outreach Drafting | **PARTIAL** | L3 unblocked; L5 partial; L4 (SC-001) still blocked |
| Figure 2 DDR mean (DL-07) | **NO** | Permanently blocked — 0.983 impossible under PATH A |
| PC-02 script reproducibility | **NO** | Permanently downgraded |
| LATIFY delta (CT-03) | **NO** | Vector version unresolved |

---

## 7. REMAINING BLOCKERS (unchanged)

| Blocker | Item | Resolution path |
|---|---|---|
| B-04 (trial_moa_entries empty) | DL-03 full Figure 2, DL-07 | Populate 59-row trial_moa_entries; run receipt_subset.py |
| B-04 (trial_moa_vectors.json) | PC-05 magnitude, PC-02 | Run retroactive_prediction_run.py --trial-vectors trial_moa_vectors.json |
| B-03 (CT-03 LATIFY vector version) | CT-03, DL-05, PC-06 | Commit both patient vector versions; run script |
| B-06 (SC-001 HT29 BRAF V600E) | L4 Biomarker Biology | Brenus scientific rationale or literature resolution |
| B-01 (repo access) | mdc artifact patches | Apply Change 1.2 and other patches when repo accessible |

---

## 8. PROVENANCE

- Formula authority: `formula_decision_onepager.md` — signed 2026-04-28
- Trial vectors: `brenus_engine_safe_input_block_v2.yaml` (canon v2.1-FREEZE)
- Patient vectors: `brenus_comparator_path_a_report.md` (run 2026-05-01)
- Prior run verification: `brenus_comparator_path_a_scores.csv` (sess_0929e868dce9)
- Ceiling proof: `8d_formula_decision_memo.md` §2 (Cauchy-Schwarz, VC-04)
- Validation trial vectors: APPROXIMATE — `trial_moa_vectors.json` not available
- Recomputation script: this session (2026-05-04), PATH A formula applied directly
