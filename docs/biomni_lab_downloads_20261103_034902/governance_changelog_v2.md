# Governance Changelog v2
**Date:** 2026-07-05  
**Authority:** Fahad Kiani — tie-break rule: committed code wins over static document  
**Scope:** Governance reconciliation of `brenus_vector_master_v1.json` → `brenus_vector_master_v2.json`  
**Status:** COMPLETE — ZERO LOCKED-vs-LOCKED CONFLICTS REMAINING

---

## Summary of Changes

| # | Conflict | Resolution | Old Value | New Value |
|---|----------|------------|-----------|-----------|
| 1 | STC-1010 PATH A fit score | canonical_vectors.py wins tie-break | 0.7375 (KG v2 JSON) | **0.6944** (canonical_vectors.py) |
| 2 | LATIFY delta | QUARANTINED unchanged | 0.366 / 0.2641 (static docs) | **QUARANTINED** (BLOCKER-07) |
| 3 | Berzosertib patient_A | retroactive_prediction_run.py wins tie-break | fit_A=0.8839 (lock file §5) | **fit_A=0.2030** (committed code) |
| 4 | NCT02264678 patient_B | EXCLUDED | silently dropped | **EXCLUDED_PENDING_PATIENT_B_DEFINITION** |

---

## Conflict 1 — STC-1010 PATH A Fit Score

### Decision
`canonical_vectors.py` (committed code) wins tie-break over KG v2 JSON (static document).

### Retired Value
- **Source:** KG v2 JSON (`trial_decode_registry_v1/v2.json`, `program_asset_break_crc_001.json`)
- **Value:** fit=0.7375, dot=0.685, norm=0.9288
- **Vectors:** p_kg={ddr:0.20, mapk:0.70, pi3k:0.30, vegf:0.20, her2:0.10, io:0.40, efflux:0.20, rss:0.20}, t_kg={ddr:0.10, mapk:0.30, pi3k:0.10, vegf:0.30, her2:0.05, io:0.80, efflux:0.10, rss:0.10}
- **Note:** 0.7375 is arithmetically reproducible from KG v2 vectors (dot=0.685, norm=0.9288 → fit=0.7375 ✓). This is NOT a transcription error — it is a distinct vector pair. The KG v2 vectors differ from canonical_vectors.py vectors in pi3k (0.30 vs 0.15), vegf (0.30 vs 0.20), her2 (0.10 vs 0.05), efflux (0.20 vs 0.10), rss (0.20 vs 0.10).
- **Retirement date:** 2026-07-05

### Canonical Value (authoritative)
- **Source:** `canonical_vectors.py` (`crispro-backend-v3-push/layer0_contracts/`)
- **Value:** fit=0.6944, dot=0.6250, norm=0.9000
- **Vectors:** p={ddr:0.10, mapk:0.70, pi3k:0.15, vegf:0.25, her2:0.05, io:0.40, efflux:0.10, rss:0.10}, t={ddr:0.10, mapk:0.30, pi3k:0.10, vegf:0.20, her2:0.00, io:0.80, efflux:0.10, rss:0.10}
- **Fit label:** MODERATE (downgraded from MODERATE-HIGH)
- **Axis breakdown:** io=51.2%, mapk=33.6%, vegf=8.0%, pi3k=2.4%, ddr=1.6%, efflux=1.6%, rss=1.6%

### Downstream Files Updated
1. `engagements/brenus/trial_intelligence/program_assets/program_asset_break_crc_001.json` — fit_score, fit_label, fit_governance, fit_axis_breakdown, narrative strings
2. `engagements/brenus/trial_intelligence/trial_decode_registry_v1.json` — path_a_score, notes (2 occurrences)
3. `engagements/brenus/trial_intelligence/trial_decode_registry_v2.json` — path_a_score, notes (2 occurrences)
4. `engagements/brenus/trial_intelligence/trial_decode_registry_v1.md` — PATH A score row, retirement note added
5. `engagements/brenus/trial_intelligence/trial_decode_registry_v2.md` — PATH A score row, retirement note added
6. `data/ranker_results/crc_ranker_summary_v1.json` — governance_note updated
7. `crispro-backend-v3-push/layer0_contracts/canonical_vectors.py` — BREAK_CRC_CANONICAL_FIT, BREAK_CRC_CANONICAL_DOT, BREAK_CRC_CANONICAL_NORM, BREAK_CRC_FIT_LABEL, docstring, axis percentages, driver labels
8. `data/synthesis/brenus_vector_master_v2.json` — all STC-1010 entries updated

---

## Conflict 2 — LATIFY Delta

### Decision
QUARANTINED — unchanged. Neither documented delta is reproducible without `trial_moa_vectors.json` (BLOCKER-07).

### Analysis
- Approximate trial vector (t_io=0.50) → delta=0.4143
- Documented delta=0.366 requires t_io≈0.412 (not in any committed file)
- Documented delta=0.2641 requires t_io≈0.269 (not in any committed file)
- No committed code or document provides the exact trial vector

### Safe Citation
Cite responder fit=0.8936 vs non-responder fit=0.6295 only. Do not cite any delta value.

### Resolution Path
Requires BLOCKER-07 resolution: locate or reconstruct `trial_moa_vectors.json`.

---

## Conflict 3 — Berzosertib Patient_A Vector

### Decision
`retroactive_prediction_run.py` (committed code) wins tie-break over `path_a_recomputation_lock_v1.md §5` (static document).

### Retired Value
- **Source:** `path_a_recomputation_lock_v1.md §5`
- **Value:** p_A labeled "RS-Low (DDR-high)", ddr=0.88, fit_A=0.8839
- **Error:** Biologically inverted — RS-Low = low replication stress = low DDR. ddr=0.88 is RS-High, not RS-Low. The lock file mislabeled p_ref (the high-DDR reference patient) as the RS-Low patient.
- **Retirement date:** 2026-07-05

### Canonical Values (authoritative)
- **Source:** `retroactive_prediction_run.py` (committed code)
- **patient_A (RS-Low):** ddr=0.20 → fit_A=0.2030
- **patient_B (RS-High):** ddr=0.55 → fit_B=0.5559
- **delta_canonical:** +0.3529 (fit_B − fit_A)
- **Direction:** CORRECT — RS-High scores higher than RS-Low ✓
- **Documented delta:** 0.138 (patent, approximate vectors — magnitude differs, direction confirmed)
- **Status:** DOCUMENTED_NOT_REPRODUCED / direction CORRECT (approximate vectors)

---

## Conflict 4 — NCT02264678 Patient_B

### Decision
EXCLUDED_PENDING_PATIENT_B_DEFINITION — no longer silently dropped from aggregate stats.

### Rationale
patient_B is undefined for NCT02264678. A trial with an undefined patient profile cannot be scored and must be explicitly excluded rather than silently omitted.

### Aggregate Count Correction
- **Before:** "4 retroactive validation trials" (NCT02264678 silently dropped)
- **After:** "3 scoreable retroactive validation trials + 1 excluded (NCT02264678)"

### Resolution Path
Requires patient_B vector definition for NCT02264678.

---

## Files Modified in This Reconciliation

| File | Change |
|------|--------|
| `engagements/brenus/trial_intelligence/program_assets/program_asset_break_crc_001.json` | fit 0.7375→0.6944, label MODERATE-HIGH→MODERATE, axis breakdown updated |
| `engagements/brenus/trial_intelligence/trial_decode_registry_v1.json` | path_a_score 0.7375→0.6944 (2 entries) |
| `engagements/brenus/trial_intelligence/trial_decode_registry_v2.json` | path_a_score 0.7375→0.6944 (2 entries) |
| `engagements/brenus/trial_intelligence/trial_decode_registry_v1.md` | PATH A score row updated, retirement note added |
| `engagements/brenus/trial_intelligence/trial_decode_registry_v2.md` | PATH A score row updated, retirement note added |
| `data/ranker_results/crc_ranker_summary_v1.json` | governance_note updated |
| `crispro-backend-v3-push/layer0_contracts/canonical_vectors.py` | 3 constants updated, docstring updated, label/axis/driver strings updated |
| `data/synthesis/brenus_vector_master_v2.json` | New file — supersedes v1, zero LOCKED-vs-LOCKED conflicts |

---

## Governance Flags Added

```python
BLOCKED_CLAIMS = {
    # ... existing flags ...
    "STC1010_FIT_0_7375": "RETIRED 2026-07-05 — canonical_vectors.py wins tie-break; use 0.6944",
    "BERZOSERTIB_LOCK_FIT_A_0_8839": "RETIRED 2026-07-05 — lock file §5 mislabeled p_ref as RS-Low; use retroactive_prediction_run.py (fit_A=0.2030)",
    "NCT02264678": "EXCLUDED_PENDING_PATIENT_B_DEFINITION",
}
```

---

## Unchanged Items

| Item | Status | Reason |
|------|--------|--------|
| IO CORE locked scores (7 trials) | UNCHANGED | No conflict — locked 2026-05-04 |
| 7 PDS comparator MoA vectors | UNCHANGED | No conflict |
| Biomarker-to-8D mapping rules | UNCHANGED | No conflict |
| PATH A formula | UNCHANGED | Locked 2026-04-28 |
| LATIFY responder/non-responder fits | UNCHANGED | 0.8936 / 0.6295 — no conflict |
| DDR_0983 quarantine | UNCHANGED | DL-07 publication-blocking — engineering must resolve |
| SC-001 BRAF conflict | UNCHANGED | Active conflict — Brenus must provide HT29 rationale |
| PC-02 permanent downgrade | UNCHANGED | retroactive_prediction_run.py --trial-vectors not yet verified |

---

*Changelog generated 2026-07-05. Authority: Fahad Kiani. Next review: upon BLOCKER-07 resolution or NCT02264678 patient_B definition.*
