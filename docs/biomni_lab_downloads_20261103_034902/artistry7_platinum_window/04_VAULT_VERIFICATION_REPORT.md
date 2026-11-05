# Vault Verification Report — ARTISTRY-7 Proxy Pipeline

**Date:** 2026-07-18
**Status change:** Data-room access was granted (working PAT). The previously QUARANTINED numbers are now **VERIFIED by independent re-execution** on the patient-level table. This report supersedes the quarantine in `00_PROVENANCE_AND_VERIFICATION_LEDGER.md` §vault-access.

**Source (verified real, cloned):** `fjkiani/data-room` @ `datasets/artistry7-platinum-window/`
- `scripts/artistry7_proxy/run_artistry7_proxy_pipeline.py` (63,569 bytes) — the exact script referenced.
- `data/artistry7_proxy/crispro_lazarus_output.csv` — **427 rows, one per TCGA-OV sample**, 38 columns.
- `data/artistry7_proxy/stats_manifest.json`, `scripts/artistry7_proxy/RUN_AUDIT.md` — pipeline's own receipts.

**Verification method:** I loaded the patient-level CSV and recomputed the survival statistics independently with `lifelines` (deriving `OS_EVENT` from `OS_STATUS` text exactly as the manifest documents: `1:DECEASED`→1). No values were taken on faith from the manifest.

---

## 1. What reproduces EXACTLY (pipeline is real and reproducible)

| Claim | Manifest value | My independent recompute | Match |
|---|---|---|---|
| KM/log-rank cohort N | 426 (of 427; 1 missing OS) | 426 | ✅ |
| Tier counts | 107 / 107 / 213 | 107 / 107 / 213 | ✅ |
| **3-tier log-rank p** | **0.0038192344280** | **0.0038192344** | ✅ (10 dp) |
| KM median OS by tier | 36.33 / 42.02 / 48.75 mo | 36.33 / 42.02 / 48.75 mo | ✅ |
| TIER_1A / TIER_1B counts | 54 / 53 | 54 / 53 | ✅ |
| PLATINUM_WINDOW count | 9 | 9 | ✅ |
| PLATINUM_WINDOW all sensitive | yes (9/9) | yes (9/9) | ✅ |
| PLATINUM_WINDOW KM median / events | 84.13 mo / 5 events | 84.13 mo / 5 events | ✅ |
| PLATINUM_WINDOW rule = (1A ∧ sensitive) | — | 9/9 exactly matches | ✅ |

**Conclusion:** `p=0.0038` is a genuine, reproducible result on a genuine 427-patient TCGA-OV proxy cohort. It is not fabricated. The prior quarantine (imposed because the repo was inaccessible) is lifted.

---

## 2. What the number actually MEANS (three critical qualifications)

Re-running the pipeline confirms the caveats raised earlier — now with data, not from the outside.

### 2.1 p=0.0038 is a 3-TIER test, NOT the 1A/1B split
The significant p-value compares **TIER_1_TRIPLE vs TIER_2_DUAL vs TIER_3_NONE** — a coarse "how many bad-biology flags" stratification (triple/dual/none). It is **not** the accessible-vs-caged (1A/1B) contrast that the entire ARTISTRY-7 rescue narrative depends on.

### 2.2 The 1A/1B split is NOT statistically significant
The manifest reports 1A/1B **counts** (54/53) but **no p-value** for the split. I computed it:
- **1A-vs-1B log-rank p = 0.126** (not significant).
- 1A (accessible) KM median OS = 38.04 mo (31 events / 54); 1B (caged) = 34.36 mo (41 events / 53).
- The direction is as hypothesized (accessible > caged) but the difference does not reach significance in this cohort.

**This is the single most important finding of the verification.** The specific stratification the narrative needs (1A vs 1B) is directionally consistent but underpowered/non-significant; the significant result (p=0.0038) is a different, coarser split.

### 2.3 The result is PROGNOSTIC, not PREDICTIVE
KM medians are **monotone in flag count**: TIER_1_TRIPLE (most flags) = 36.3 mo = **worst**; TIER_3_NONE (no flags) = 48.8 mo = **best**. This is a **bad-biology prognostic gradient in an untreated TCGA cohort** — worse tumor biology tracks worse survival. It contains **no** information about whether nemvaleukin (or any therapy) *helps* any tier, because no one in TCGA-OV received nemvaleukin. Prognostic ≠ predictive — now empirically confirmed, not just argued.

---

## 3. Secondary integrity findings (from reading the repo's own files)

- **PLATINUM_WINDOW is severely underpowered.** n=9, 5 events, KM median 84.1 mo but **CI upper not estimable**. Window-vs-rest log-rank p=0.31. The manifest itself flags this and says to never use the naive RAW mean/median in external comms. A 9-patient subgroup cannot support a clinical claim.
- **IMMUNE_ACCESS threshold 0.40 is a design constant, not data-derived.** The repo's own `immune_access_score_construction.json` states: *"Hardcoded narrative gate… No in-repository Kaplan–Meier or percentile optimization was found tying 0.40 to survival."* Univariate Cox on the >0.40 split: **HR 0.56, CI 0.30–1.02, p=0.057 (not significant).** Only 27/427 patients exceed it.
- **The IMMUNE_ACCESS weights are VERIFIED as spec'd.** Code confirms `0.40·TCELL_GPS − 0.35·MYELOID_FLOOD − 0.25·STROMAL_CAGE`, with z-scored signature components (TCELL_GPS = CXCL9/10/11/CXCR3; MYELOID_FLOOD = CCL2/5/7/CCR2; STROMAL_CAGE = CXCL12/CXCR4/FAP/ACTA2/POSTN). The gene sets map cleanly onto the Desbois excluded-axis biology.
- **`platinum_window_negative_arm_stats.json` (n=1850, p=1.7e-5) does NOT belong to this cohort.** The 427-run has only 417 window-negative patients. n=1850 is a different pooled/pan-cohort denominator and must not be attributed to the TCGA-OV 427 stratifier.
- **The pipeline's own RUN_AUDIT is candid.** It states the result "does **not** make the result clinically validated," is "RUO… hypothesis-generating," and documents that significance only appeared after switching cohorts and swapping boolean gates for continuous composites (a researcher-degrees-of-freedom trail worth noting). The p=0.0038 was **not** obtained under a prespecified analysis plan.

---

## 4. Net verdict

| Question | Verified answer |
|---|---|
| Is the 427-patient pipeline real & reproducible? | **Yes** — reproduces to 10 dp. |
| Is p=0.0038 real? | **Yes** — but it is a 3-tier prognostic log-rank. |
| Does p=0.0038 validate the 1A/1B split? | **No** — 1A/1B is a different contrast; its own log-rank p=0.126 (NS). |
| Does it validate the PLATINUM_WINDOW subgroup? | **No** — n=9, underpowered, CI not estimable. |
| Does it "supersede" the GSE30161 external-transfer result? | **No** — prognostic (internal, untreated) vs predictive out-of-distribution transfer are different questions. Both retained. |
| Does it prove ARTISTRY-7 failed on selection, not drug? | **No** — prognostic-only, unselected TCGA, no nemvaleukin exposure, non-prespecified. |
| Is the underlying biology sound? | **Yes** — weights/gene-sets map onto the validated Desbois/ICON7 stromal T-cell-exclusion axis. |

**Bottom line:** The vault work is honest, real, and reproducible, and its own audit files agree with this assessment. But the statistically-significant result is a **prognostic bad-biology gradient**, not the predictive 1A/1B / PLATINUM_WINDOW signal the ARTISTRY-7 narrative requires. The correct status remains **RUO, hypothesis-generating** — now upgraded from "unverifiable" to "verified-and-reproducible, with the significance attached to the coarse tier split rather than the accessible/caged refinement."
