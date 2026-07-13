# CRC ranker v1 — provenance

**Source:** `fjkiani/Brenus @ c2d90b6` — "Governance reconciliation v2 — retire 0.7375, resolve Berzosertib, exclude NCT02264678"
**Source path:** `data/ranker_results/`
**Vendored:** 2026-07-13 onto caspro `agent/demos-adapter-rebuild`.

## Files

- `crc_ranker_results_v1.csv` — 485 rows × 27 cols. Per-patient fit/rank per trial. TCGA COADREAD MSS cohort.
- `crc_ranker_summary_v1.json` — aggregated receipts (broad / TMB / HRD subgroups + axis contributions + governance note).
- `crc_ranker_figure_v1.png` — axis crossover visualization.

## Formula (locked)

    PATH A (locked 2026-04-28): fit = clip((p·t) / ‖t‖₂, 0, 1)
    vector_version = 8D.v1
    alpha = 0.7, beta = 0.3, eligibility_score = 0.75

**PATH B is prohibited in all outputs.**

## Verified numeric anchors

Cross-checked directly from `crc_ranker_results_v1.csv` on 2026-07-13:

- 485 unique `patient_id` (TCGA COADREAD).
- Broad `mean(stc1010_fit) = 0.560522` → summary reports `0.5605`.
- TMB ≥ 25 count = **9 patients** (real TCGA IDs: TCGA-AA-3510, TCGA-AG-A002, TCGA-CA-6717, TCGA-AA-3977, TCGA-AA-3984, TCGA-AZ-4315, TCGA-CA-6718, TCGA-EI-6917, TCGA-F5-6814).
- TMB ≥ 25 `mean(stc1010_fit) = 0.864422` → summary reports `0.8644`.
- TMB ≥ 25 `stc1010_rank = 1` for **all 9** patients → `recall@3 = 1.0`.
- TMB ≥ 25 delta vs mean(best_comparator) = **+0.1430** → summary reports `0.143`.

## Refresh policy

The vendor is frozen by `manifest.frozen.json`. To refresh:

1. Pull the target commit on fjkiani/Brenus.
2. `sha256sum data/ranker_results/*` — compare to `manifest.frozen.json`.
3. If drift is intentional, copy the three files, update `sha256`, `bytes`, `source_commit`, and the anchors in this file.
