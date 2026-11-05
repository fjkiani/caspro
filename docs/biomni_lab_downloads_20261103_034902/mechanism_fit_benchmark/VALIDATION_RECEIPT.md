# Objective B Outcome-Prediction Benchmark - VALIDATION RECEIPT

Generated: 2026-07-18 04:25 UTC
Runtime status: SHADOW_ONLY / NOT RELEASED (unchanged)
Scope: EXTRACTION-ONLY. No engine scoring performed. No model executed.

## 1. Data-Quality Gate

| Cohort | Rows (patients) | Gate | Endpoint | Events | Result |
|---|---|---|---|---|---|
| GSE30161 | 58 | >=58 | PFI (days) + chemoresponse | 48 relapse | PASS |
| TCGA-OV | 507 | >=400 | Overall Survival (days) | 294 deaths | PASS |
| GSE25203 | 30 | >=30 | TTR (end-of-therapy, days) | - | PASS |

Total unified patients: 595
Provenance completeness: source_url missing=0, anchor_type missing=0 (require 0/0)

DATA-QUALITY GATE: PASS

## 2. Model Gate

BLOCKED: model_artifact=null; AUROC_gate=NOT_MET

- No frozen RP/KC outcome-prediction model exists in the workspace.
- The only engine present (sl_agent_v4.x) is a synthetic-lethality / drug-recommendation engine; it does NOT map molecular features -> platinum-sensitivity / PFS / OS class.
- Per approved decision (Q1 = extraction-only): no fresh classifier was trained here (training on PFI-derived labels from the same cohort would be circular and is out of scope).

## 3. AUROC Gate

DEFERRED - depends on Model Gate. No AUROC value emitted.
Step 3 (run model) and Step 4 (compute AUROC) are DEFERRED, not executed.

## 4. Artifact Decision

Data quality: benchmark_ready_no_model_run
Model/AUROC: DEFERRED (documented blocker: model_artifact=null)

This dataset is the frozen harness to score a future frozen outcome model under the locked
leakage-safe protocol (predict from molecular features only; ground truth = clinical label).

### Locked scoring protocol for future model run (Q2 decision)
- Model input: molecular features ONLY (expression / miRNA / mutation burden / CN signature). No survival-derived inputs.
- GSE30161 PRIMARY ground truth = chemoresponse (CR/PR/SD/PD) - collected pre-follow-up, zero leakage.
- GSE30161 SECONDARY (confirmatory) = PFI-derived platinum_sensitivity (resistant PFI<180d).
- TCGA-OV = OS-anchored (days_to_death / vital_status); PFI NOT computable (GDC structural null).
- GSE25203 = TTR end-of-therapy anchor; do NOT apply diagnosis-PFI thresholds.

## 5. SHA-256 Manifest

- `dataset1_gse30161.csv`: 6fcfed132dca5717eea86442275fdae3e375aa6e9d191d386d370f0293b6acf5
- `dataset2_tcga_ov.csv`: 14ec289355781d4d1e71324db2ebc4370035f3dce3b10893ddd9f48b04fb18dc
- `dataset3_gse25203.csv`: 9c0c5b82babba4a9f1be0f8a0342318aa013324b688c70256b31285dad2e780d
- `mechanism_fit_benchmark_master.csv`: bc2690d095185e0e3da5b96b378308f2ff72755959c3d2a384f25544b3bd0db1
- `provenance_log.csv`: 3c3ccc433d6841be9f55f82b83b703a3facb891c3f81687c6e9089014e56781e

## 6. Integrity Statement

- All records are real, patient-level, from public sources (GEO HTML, NCI GDC open API). No auth required; no controlled-access data used.
- One row = one real patient/case. No synthetic fills. No sample-count-as-patient-count substitution.
- No engine output used as ground truth. No engine scoring executed. Frozen formula fit=clip((p.t)/||t||2,0,1) NOT invoked.
- Time-to-event anchors kept distinct: surgery_date (GSE30161), diagnosis_offset (TCGA-OV), end_of_therapy (GSE25203).
