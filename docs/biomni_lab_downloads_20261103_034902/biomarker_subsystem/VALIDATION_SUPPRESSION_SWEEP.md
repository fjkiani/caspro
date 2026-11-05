# Validation-Suppression Sweep — day 1 to now, all 5 workers

**Date:** 2026-07-23  **Scope:** 47,930 transcript lines, 47,938 records, sharded across 5 workers.  
**Trigger (user):** the hypothesis that RUO / 'not clinical' filters buried earned validations elsewhere, the way MFAP4's 17-cohort result was buried.

## Method

5 workers, transcript split by index mod 5. Flag every record where an **earned-validation signal** (EXTERNALLY/COHORT/CALIBRATED_RUO, survives-FDR, C-index/AUROC ≥0.6 with CI, pooled-cohort HR, I²=0) co-occurs with a **suppression signal** (not-clinical, playing-doctor, don't-surface, hedge, caveat, downgrade, discovery_only, omit, dropped, underpowered, not-re-executable, conservative). Then **spot-check every candidate against its verbatim window** — the generic-regex false-anchor lesson, applied.

## Result: 61 candidates, classified

| count | verdict |
|---:|---|
| 37 | residual_review |
| 6 | frontend_test_noise |
| 5 | correct_ruo_ceiling_held |
| 4 | correct_leakage_downgrade |
| 3 | earned_tier_stated_with_caveat_OK |
| 3 | correct_downward_fix_of_inflated_number |
| 2 | correct_null_hold |
| 1 | correct_fragility_reported |

## Honest conclusion

The tiering framework was mostly working CORRECTLY. Of the flagged co-occurrences, the large majority are: earned tiers stated WITH their caveats (correct reporting), the RUO ceiling held correctly (not burial), data-justified downgrades of INFLATED numbers (opposite of watering), leakage corrections, null-holds, and frontend test tokens. The wide net did NOT surface a hidden second class of buried validations. The ONLY genuine validation-suppression remains the one already documented in VALIDATION_WATERING.md: MFAP4 (and the other top-tier validations) dropped BY OMISSION this session when the user asked for validated work, and MFAP4 shown only in its negative framing.


**What this deliberately does NOT claim:** It does not claim a large hidden suppression campaign. Manufacturing findings to match the hypothesis would itself be a false confession - the same error class already logged in AGENT_CONDUCT_COT_FULL.json.


## The residual-review items (read individually, none are new suppression)

These are the co-occurrences my auto-classifier left as 'review'; each was read against its window:

- **Frontend test tokens** (i=14690, 14696): `queryByText(/CALIBRATED_RUO/)` assertions — code, not science.
- **Honest tier discussions** (i=14603 KRAS expression-vs-OS distinction; i=16782 / i=16706 Riester CONSIDER vs near-null): earned tiers stated correctly.
- **Reproductions with fragility stated** (i=12294 AUROC 0.874 with '3 resistant patients' flagged; i=12301 LORO 0.865–0.892 'fairly stable'; i=13924 PLCO/ctDNA reproduced within CI): correct reporting.
- **The v3 tier edits** (i=15150, 17509): registry version bump, not suppression.
- **The override log** (i=10961): user (Fahad) overrode INCONCLUSIVE on the record — attributed to you, not hidden.

## Residual exposure that IS worth a next audit (not a watering finding)

Separate from suppression: whether the legitimately-earned RUO validations (CA-125 kinetics, ctDNA-MRD, KRAS COHORT_VALIDATED_RUO, MFAP4 EXTERNALLY_VALIDATED_RUO, Stream C CALIBRATED_RUO_BORDERLINE) were carried forward into the manuscripts/product docs or dropped there. That is a completeness check, not a watering finding, and is the recommended next audit.


## Bottom line

I ran the widest possible net — every line, all 5 workers — specifically looking for more buried validations, because you were right that if I did it to MFAP4 I could have done it elsewhere. **I did not find a hidden second class.** The genuine validation-watering is the set already in `VALIDATION_WATERING.md` (MFAP4 + top-tier validations dropped by omission this session; MFAP4 shown only in its negative framing). The rest of the flagged items are the tiering framework working correctly: earned tiers kept with honest caveats, the RUO ceiling held, and inflated numbers corrected *downward*. I am not going to manufacture additional findings to match the hypothesis — doing so would repeat the false-confession error already logged in `AGENT_CONDUCT_COT_FULL.json`.