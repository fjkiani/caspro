# Subject 191 Copy-Number Signal Audit

**Scope:** Re-audit of the 5 computed BriTROC-1 serial copy-number pairs using ONLY
derived artifacts surviving on disk. No new EGA connection, no new credentials, no
new BAM downloads. Every number below is tagged with its source.

**Key limitation:** The raw BAMs and the per-bin/segment CN matrices
(`pilot_bin_relative_cn.csv`, `pilot_segmented_cn.csv`) were written to ephemeral
`/workspace/cn_out` on 2026-07-20 and no longer exist. Therefore breakpoints cannot
be re-derived from sequence or copy-number values; this audit recomputes and cross-
checks the *derived summary layer* only.

---

## 1. Provenance of source files (printed in-run)

| file | size | rows | md5 (first 12) | mtime |
|---|---|---|---|---|
| breakpoint_architecture_with_subj260.csv | 563 B | 6 | 6ad5d3ff52cb | 2026-07-21 06:28:09 |
| breakpoint_architecture_pilot.csv | 489 B | 5 | 1a9f0e980f7d | 2026-07-21 05:31:56 |
| breakpoint_delta_by_chrom.csv | 660 B | 75 | 06d08ea6aa70 | 2026-07-21 05:31:57 |
| subject_ledger.csv | 31,843 B | 183 | 52d139ac0286 | 2026-07-21 06:28:13 |

---

## 2. Recomputed breakpoint deltas and signal ranking

Delta recomputed as `relapse_breakpoints - dx_breakpoints` from
`breakpoint_architecture_with_subj260.csv`.

| rank | subject | dx → relapse | dx_bp | relapse_bp | delta | signature |
|---|---|---|---|---|---|---|
| 1 | 191 | IM_280 → JBLAB-4944 | 127 | 380 | **253** | dispersed_stochastic_CIN |
| 2 | 6 | IM_274 → JBLAB-4110 | 17 | 118 | 101 | dispersed_stochastic_CIN |
| 3 | 260 | IM_426 → JBLAB-19323 | 75 | 135 | 60 | dispersed_stochastic_CIN |
| 4 | 119 | IM_249 → JBLAB-4232 | 148 | 166 | 18 | intermediate_rearrangement |
| 5 | 109 | IM_373 → JBLAB-4225 | 59 | 52 | −7 | modest_gain |

**Cross-check:** recomputed delta equals stored delta for all 5 pairs.
`architecture_with_subj260.csv` and `subject_ledger.csv` agree on delta and signature
for all 5 pairs.

---

## 3. Subject 191 vs Subject 109: per-chromosome dispersion (recomputed)

From `breakpoint_delta_by_chrom.csv`.

### Subject 191 (strongest signal)
- Total new breakpoints: **253** [recomputed-from: breakpoint_delta_by_chrom.csv]
- Chromosomes with net breakpoint gain: **21 of 22** [recomputed-from: breakpoint_delta_by_chrom.csv]
- Top chromosome: **chr1**, +29 breakpoints = **11.5%** of total new breakpoints [recomputed-from: breakpoint_delta_by_chrom.csv]
- Interpretation: the gain is **genome-wide / dispersed**, not a focal catastrophe. No single chromosome dominates.

### Subject 109 (near-clonal/stable)
- Total breakpoint delta: **−7** [recomputed-from: breakpoint_delta_by_chrom.csv]
- Chromosomes with net gain: **3** (chr9, chr14, chr20) [recomputed-from: breakpoint_delta_by_chrom.csv]
- Chromosomes with net loss: **9** [recomputed-from: breakpoint_delta_by_chrom.csv]
- Top chromosome: **chr14**, +4 breakpoints [recomputed-from: breakpoint_delta_by_chrom.csv]
- Interpretation: near-neutral, balanced small gains/losses; no CIN burst.

**Sum-to-total check:** per-chromosome sums equal the architecture-file deltas for
both 191 (253 = 253) and 109 (−7 = −7).

---

## 4. Architecture-signature cutoffs (verified)

Provisional cutoffs (n=5, under-determined):
- delta ≥ 50 → dispersed_stochastic_CIN
- 10 ≤ delta ≤ 49 → intermediate_rearrangement
- delta < 10 → modest_gain

All 5 stored labels follow these cutoffs.

---

## 5. Transcript-only values (NOT recomputable from surviving files)

These values come from the 2026-07-20 execution transcript and are quarantined here
because the inputs needed to recompute them (per-bin CN matrix, raw BAMs) are gone.

| quantity | value | source |
|---|---|---|
| Subject 191 frac_genome_altered_gt0.3log2 | 0.5858 (58.6%) | transcript i:15523 |
| Subject 109 frac_genome_altered_gt0.3log2 | 0.1210 (12.1%) | transcript i:15523 |
| Subject 191 net_log2_shift | +0.2780 | transcript i:15523 |
| Subject 109 net_log2_shift | −0.0003 | transcript i:15523 |
| Subject 191 max_gain_log2 | 2.142 | transcript i:15523 |
| Subject 109 max_gain_log2 | 1.319 | transcript i:15523 |
| Subject 191 max_loss_log2 | −1.006 | transcript i:15523 |
| Subject 109 max_loss_log2 | −1.310 | transcript i:15523 |

### Known dual-definition discrepancy (also transcript-only vs derived-file)
| sample | Sig7 bin-level n_breakpoints | Ledger architecture breakpoints | difference |
|---|---|---|---|
| IM_280 (191 dx) | 120 [transcript i:15525] | 127 [breakpoint_architecture_with_subj260.csv] | −7 |
| JBLAB-4944 (191 relapse) | 386 [transcript i:15525] | 380 [breakpoint_architecture_with_subj260.csv] | +6 |

These are two different segment-boundary definitions. The headline "127 → 380, +253"
uses the ledger architecture definition.

---

## 6. Bottom line

- The strongest signal is **Subject 191**, with **+253 new breakpoints** spanning
  **21 of 22 autosomes**, top chromosome contributing only **11.5%**.
- This pattern is **dispersed stochastic CIN**, not a focal "master switch"
  catastrophe.
- **Subject 109** is the contrast: near-clonal/stable, delta **−7**, small
  gains/losses balanced across 12 chromosomes.
- The 58.6% genome-altered figure for 191 and 12.1% for 109 are receipt-cited from
  the transcript, not recomputable now; the breakpoint-dispersion conclusion is
  recomputable from the surviving derived files.
- n=5; architecture-signature cutoffs are provisional and under-determined.
