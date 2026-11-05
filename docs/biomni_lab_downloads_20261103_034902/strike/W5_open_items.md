# W5 — Open Items

Generated: 2026-07-16T03:42:58.625069+00:00
Release-gate verdict: **NO_GO** (5/7 rules passing)

## Genuinely blocked items

### 1. Missing P0 causality routes

The following patient inputs do not currently reach their expected downstream engine anywhere in the repo:

- **PD-L1_IO** — PD-L1/CPS must reach IO pathway
  - expected engine dir: `io_engine`
  - status: `FAIL_SILENT_DROP`  consumed_in: []
  - remediation: wire input into the expected engine, or add an explicit adapter in `layer3_orchestrator/pipeline.py`.
- **MSI_TMB_IO** — MSI/TMB must feed IO boost
  - expected engine dir: `io_engine`
  - status: `FAIL_SILENT_DROP`  consumed_in: []
  - remediation: wire input into the expected engine, or add an explicit adapter in `layer3_orchestrator/pipeline.py`.
- **KRAS_BRAF_MAPK** — KRAS/BRAF must reach MAPK pathway
  - expected engine dir: `mechanism_fit`
  - status: `FAIL_SILENT_DROP`  consumed_in: []
  - remediation: wire input into the expected engine, or add an explicit adapter in `layer3_orchestrator/pipeline.py`.
- **PTEN_PI3K** — PTEN must reach PI3K pathway
  - expected engine dir: `mechanism_fit`
  - status: `FAIL_SILENT_DROP`  consumed_in: []
  - remediation: wire input into the expected engine, or add an explicit adapter in `layer3_orchestrator/pipeline.py`.

### 2. Silent input drops

- `cnv` → expected `mechanism_fit` (no consumption anywhere)
- `cnv` → expected `kill_chain` (no consumption anywhere)

### 3. Static red-team failures

- **A4_pdl1_silent_drop_io_boost** (HIGH) — Populate PD-L1 CPS=50; verify it reaches IO score (P0 causality)
  - io_engine appears not to reference PD-L1

### 4. Registry coverage limits

- Vector coverage: only ~9.5% of clinical_trials rows have moa_vectors after cleaning.
- The JSON substrate remains the tagging build-input; runtime should point at moa_vectors table in this DB.

### 5. Phase 1 stub disclosure (documented, not a defect)

- `layer1_engines/therapy_fit/scoring.py` deliberately returns `impact_score=0.5`, `safety=1.0`, `access_bonus=0.0` in Phase 1.
- Final therapy_fit rankings will tie until `impact_score` (WIWFM) is wired to real data.
- Adversarial suite currently PASSes because ties do not violate causality; when wiring lands, W1/W3 regression must be re-run.

## Not blocked (already resolved this strike)

- **PATH A locked** in runtime (`mechanism_fit_ranker.py:335,341`). PATH B math absent.
- **Registry unified** at `clinical_trials_unified.db` (sha `ac96437f9bb0fe28`).
- **BLOCKED_CLAIMS leak audit**: 14 occurrences, all classified `REFERENCE_ONLY` (guarded disclosures of quarantine).
- **Adversarial defenses**: empty-vector → 0.0 fits; zero-dominant axis demotes top-1.
- **Regression tests** installed at `W1/regression_tests/` (4 files, pytest-runnable).

