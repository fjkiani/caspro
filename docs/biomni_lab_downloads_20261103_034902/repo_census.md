# CrisPRO Repo Census — Brenus-Relevant Services, Endpoints, and Modules
**Prepared by:** CrisPRO Capability Cartographer
**Date:** 2026-04-28
**Evidence basis:** Prior-session code extractions (worker-0, terminated 2026-04-28); verified claims VC-01 through VC-15; contradictions CT-01 through CT-06; receipt_preflight.py source; HONEST_AUDIT.md; Brenus canon v2.1-FREEZE
**Hard rule:** Paths not in evidence are marked INFERRED or ABSENT. No architecture hallucination.

---

## NOTATION

| Status | Meaning |
|--------|---------|
| `CONFIRMED_CODE_PRESENT` | Path and code content verified by direct read in prior session (VC evidence) |
| `CONFIRMED_ABSENT` | Searched in prior session; file not found (VC-14) |
| `INFERRED_PRESENT` | Logical inference from imports, receipts, or indirect evidence — not directly read |
| `TRADE_SECRET` | Classified as trade secret; intentionally absent from repos (VC-13) |
| `DOC_ONLY` | Exists only in .mdc/.md documentation files; no executable code confirmed |

---

## REPO 1: `crispro-backend-v3`

### 1.1 MechanismFitRanker — Production Trial Ranker

| Field | Value |
|-------|-------|
| **name** | MechanismFitRanker |
| **repo** | crispro-backend-v3 |
| **exact_path** | `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py` |
| **status** | CONFIRMED_CODE_PRESENT |
| **evidence_trace** | VC-01 (PATHWAYS_7D/8D axis list, L50–51); VC-02 (PATH A formula header L9, rank_trials method); VC-05 (RSS axis addition L22–31, VECTOR_VERSION_8D='8D.v1', L55); VC-06 (Dict→List bug fix, L9 header, L19) |
| **key_code_quotes** | `"PATHWAYS_7D = ['ddr', 'mapk', 'pi3k', 'vegf', 'her2', 'io', 'efflux']"` (L50); `"PATHWAYS_8D = ['ddr', 'mapk', 'pi3k', 'vegf', 'her2', 'io', 'efflux', 'rss']"` (L51); `"Magnitude-weighted similarity: (p·t)/||t|| (not cosine)"` (L9 header); `"VECTOR_VERSION_8D = '8D.v1'"` (L55) |
| **formula** | PATH A: `fit = clip((p·t)/‖t‖₂, 0, 1)` — NOT cosine similarity |
| **ceiling** | ‖p‖₂ = 0.8898 for p_ref (VC-04) |
| **brenus_relevant** | YES — core trial ranking engine |

---

### 1.2 HolisticScoreService — Holistic Score (PATH B)

| Field | Value |
|-------|-------|
| **name** | HolisticScoreService (compute_mechanism_fit function) |
| **repo** | crispro-backend-v3 |
| **exact_path** | `crispro-backend-v3/layer1_engines/holistic_score/mechanism_fit.py` |
| **status** | CONFIRMED_CODE_PRESENT |
| **evidence_trace** | VC-03 (PATH B formula, cosine similarity); CT-01 (coexists with PATH A); CT-02 (Figure 2 DDR mean 0.983 consistent with PATH B, not PATH A) |
| **key_code_quotes** | `"cosine(p, t) = (p · t) / (||p||₂ × ||t||₂)"` (repo_verification.path_b.formula); `"Uses cosine similarity for alignment"` (repo_verification.path_b.provenance_string_in_code) |
| **formula** | PATH B: `fit = clip((p·t)/(‖p‖₂×‖t‖₂), 0, 1)` — true cosine similarity |
| **ceiling** | 1.0 (for any patient vector) |
| **brenus_relevant** | YES — used in holistic score blend; ceiling allows values >0.8898 |

---

### 1.3 Holistic Score Models — 4-Component Blend

| Field | Value |
|-------|-------|
| **name** | Holistic score weight constants |
| **repo** | crispro-backend-v3 |
| **exact_path** | `crispro-backend-v3/layer1_engines/holistic_score/models.py` |
| **status** | CONFIRMED_CODE_PRESENT |
| **evidence_trace** | VC-15 (4-component blend constants); CT-06 (conflicts with manuscript 2-component formula) |
| **key_code_quotes** | `"mechanism_fit: 0.4, eligibility: 0.3, pgx_safety: 0.15, resistance_risk: 0.15"` (repo_verification.holistic_score_formula_note.holistic_weights) |
| **formula** | `holistic = 0.4×mechanism_fit + 0.3×eligibility + 0.15×pgx_safety + 0.15×resistance_risk` |
| **brenus_relevant** | YES — defines how mechanism_fit score is blended into final trial score |

---

### 1.4 RSS Axis Extension

| Field | Value |
|-------|-------|
| **name** | RSS (Replication Stress Score) 8th axis |
| **repo** | crispro-backend-v3 |
| **exact_path** | `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py` (L22–31, L55) |
| **status** | CONFIRMED_CODE_PRESENT |
| **evidence_trace** | VC-05 (RSS axis addition date 2026-02-22, VECTOR_VERSION_8D, ValueError on mixed-dimension comparison) |
| **key_code_quotes** | `"8D EXTENSION (Feb 22 2026): Adds optional 'rss' axis (Replication Stress Score, PMID 34552099) as the 8th dimension."` (L22–31); `"Mixed-dimension comparison (7D patient vs 8D trial) raises ValueError — never silently"` |
| **brenus_relevant** | PARTIAL — RSS axis not directly relevant to Brenus CRC biology; KRAS/IO/VEGF axes are primary |

---

## REPO 2: `crispro` (`.cursor/ayesha/debrief/` tree)

### 2.1 Patent Draft — 8D Provisional Filing

| Field | Value |
|-------|-------|
| **name** | 8D MoA Vector Provisional Patent Draft |
| **repo** | crispro |
| **exact_path** | `crispro/.cursor/ayesha/debrief/14-provisional-patent-8d-vector.mdc` |
| **status** | DOC_ONLY |
| **evidence_trace** | VC-07 (reduction to practice date 2026-02-22); VC-08 (§4.4 validation deltas); VC-10 (prior art §3.2); VC-11 (filing status — all checklist items unchecked); CT-03 (LATIFY delta conflict); CT-04 (NCT02264678 delta missing); CT-05 (filing status contradiction) |
| **key_code_quotes** | `"Date of First Reduction to Practice: 2026-02-22"` (header); `"STK11-loss (IO=0.75) ranks trial #1; STK11-intact drops (Δ=0.366)"` (§4.4) |
| **brenus_relevant** | NO — patent document; not executable code |

---

### 2.2 RSS Backfill Documentation

| Field | Value |
|-------|-------|
| **name** | RSS backfill proof-of-concept documentation |
| **repo** | crispro |
| **exact_path** | `crispro/.cursor/ayesha/debrief/02-proof-of-concept.mdc` |
| **status** | DOC_ONLY |
| **evidence_trace** | VC-09 (backfill_rss_tags.py ran live; 4 trials tagged: NCT02595892, NCT02627443, NCT04491942, NCT04616534) |
| **key_code_quotes** | `"scripts/backfill_rss_tags.py — ran live (4/4 trials tagged: NCT02595892, NCT02627443, NCT04491942, NCT04616534)"` |
| **brenus_relevant** | NO — RSS backfill for 8D patent; not Brenus CRC trials |

---

### 2.3 Filing Pack — Submission Checklist

| Field | Value |
|-------|-------|
| **name** | 8D Provisional Filing Pack — Submission Checklist |
| **repo** | crispro |
| **exact_path** | `crispro/.cursor/ayesha/debrief/8d_provisional_filing_pack/06_Submission_Checklist.md` |
| **status** | DOC_ONLY |
| **evidence_trace** | VC-11 (all items unchecked); CT-05 (contradicts "Provisional filed" label) |
| **key_code_quotes** | `"- [ ] Title"`, `"- [ ] Filing Fee check (authorized and funded)"` (all items unchecked) |
| **brenus_relevant** | NO — patent filing document |

---

### 2.4 Filing Pack — Redaction Audit

| Field | Value |
|-------|-------|
| **name** | 8D Provisional Filing Pack — Redaction Audit |
| **repo** | crispro |
| **exact_path** | `crispro/.cursor/ayesha/debrief/8d_provisional_filing_pack/05_Redaction_Audit.md` |
| **status** | DOC_ONLY |
| **evidence_trace** | VC-13 (TAG_VECTORS and trial_moa_vectors.json classified as trade secrets) |
| **key_code_quotes** | `"TAG_VECTORS exact values | Must redact | Trade secret."` ; `"trial_moa_vectors.json contents | Must redact | Trade secret. 609-trial database is a proprietary commercial asset"` |
| **brenus_relevant** | NO — trade secret classification document |

---

### 2.5 Patent Scrap — Pre-Filing Gaps

| Field | Value |
|-------|-------|
| **name** | Patent pre-filing gaps document |
| **repo** | crispro |
| **exact_path** | `crispro/.cursor/ayesha/debrief/patent-scrap.mdc` |
| **status** | DOC_ONLY |
| **evidence_trace** | VC-12 (7 open gaps G1–G7, none resolved) |
| **key_code_quotes** | `"G1 | LATIFY validation sources conflate."` ; `"G5 | No claim covers the MoA TAG → axis mapping algorithm itself."` |
| **brenus_relevant** | NO — patent gap document |

---

## REPO 3: `oncology-coPilot/oncology-backend-minimal` (INFERRED from receipt_preflight.py imports)

> **NOTE:** This repo path is distinct from `crispro-backend-v3`. It is referenced by `receipt_preflight.py` imports but was NOT directly read in the prior session. All entries below are INFERRED from import statements and receipt artifacts.

### 3.1 Production MechanismFitRanker (oncology-coPilot path)

| Field | Value |
|-------|-------|
| **name** | MechanismFitRanker (production instance) |
| **repo** | oncology-coPilot (separate repo) |
| **exact_path** | `oncology-coPilot/oncology-backend-minimal/api/services/mechanism_fit_ranker.py` |
| **status** | INFERRED_PRESENT |
| **evidence_trace** | receipt_preflight.py import: `from api.services.mechanism_fit_ranker import MechanismFitRanker, VECTOR_VERSION_7D`; BACKEND_ROOT set to `REPO_ROOT / "oncology-coPilot" / "oncology-backend-minimal"` |
| **key_code_quotes** | `"BACKEND_ROOT = REPO_ROOT / 'oncology-coPilot' / 'oncology-backend-minimal'"` (receipt_preflight.py); `"from api.services.mechanism_fit_ranker import (MechanismFitRanker, VECTOR_VERSION_7D,)"` |
| **note** | May be same code as crispro-backend-v3 path; may be a different version. Cannot confirm without direct read. Repo boundary must be preserved. |
| **brenus_relevant** | YES — this is the path actually invoked by receipt_preflight.py |

---

### 3.2 Trial MoA Vector Registry

| Field | Value |
|-------|-------|
| **name** | trial_moa_vectors.json — 609-trial NCT-keyed MoA registry |
| **repo** | oncology-coPilot (separate repo) |
| **exact_path** | `oncology-coPilot/oncology-backend-minimal/api/resources/trial_moa_vectors.json` |
| **status** | TRADE_SECRET |
| **evidence_trace** | VC-13 (classified as trade secret; intentionally absent from repos); receipt_preflight.json (nct_count: 609, ranked_count: 609); RECEIPT_MANIFEST.json (sha256: e9b959a0027132dbb6753251fb6ef1b63098dfd16484c5affef5de4e804b4aa5) |
| **key_code_quotes** | `"trial_moa_vectors.json contents | Must redact | Trade secret. 609-trial database is a proprietary commercial asset"` (05_Redaction_Audit.md) |
| **note** | File exists (receipt ran successfully 2026-04-15); classified as trade secret; not in any mounted repo path |
| **brenus_relevant** | YES — contains MoA vectors for all 609 trials; BLOCKED for external use |

---

### 3.3 TAG_VECTORS

| Field | Value |
|-------|-------|
| **name** | TAG_VECTORS — MoA tag → axis weight mapping |
| **repo** | ABSENT from all repos |
| **exact_path** | ABSENT |
| **status** | TRADE_SECRET |
| **evidence_trace** | VC-13: `"TAG_VECTORS exact values | Must redact | Trade secret. Numerical weights form the proprietary core that competitors cannot easily duplicate independently"` |
| **brenus_relevant** | YES — required to compute MoA vectors for new trials; BLOCKED |

---

## MODAL ENDPOINTS

### 4.1 Evo2 Variant Scoring Service

| Field | Value |
|-------|-------|
| **name** | crispro-evo2-v9 |
| **repo** | Modal (external deployment) |
| **exact_path** | Modal service name: `crispro-evo2-v9` |
| **status** | CONFIRMED_CODE_PRESENT (endpoint confirmed active; scored variants 2026-04-13) |
| **evidence_trace** | HONEST_AUDIT.md: `"All 4 variants scored via Modal Evo2 service (crispro-evo2-v9), ref verified against GRCh38."` ; composite AUROC 0.6889 |
| **key_code_quotes** | Adversarial negatives scored: PTPN11 E76K delta_ll=+0.005231; NF1 R1276Gln delta_ll=+0.314221; FAT1 Q3044* delta_ll=-0.308479; PTPRT R1040H delta_ll=-0.012990 |
| **brenus_relevant** | PARTIAL — Evo2 scores sequence disruption (loss-of-function); not directly applicable to STC-1010 vaccine biology; potentially relevant for KRAS/BRAF variant scoring in BreAK CRC-001 patient stratification |

---

### 4.2 Enformer Accessibility Endpoint

| Field | Value |
|-------|-------|
| **name** | crispro-test--enformer-accessibility.modal.run |
| **repo** | Modal (external deployment) |
| **exact_path** | `https://crispro-test--enformer-accessibility.modal.run` |
| **status** | CONFIRMED_CODE_PRESENT (endpoint active but non-discriminative) |
| **evidence_trace** | HONEST_AUDIT.md: `"Endpoint: https://crispro-test--enformer-accessibility.modal.run"` ; `"Conclusion: Endpoint returns near-constant values regardless of sequence content"` ; `"Action: Excluded from composite"` |
| **key_code_quotes** | `"poly-N score: 0.0218 > ACTB: 0.0170 > TP53: 0.0162 > random intergenic: 0.0185"` |
| **brenus_relevant** | NO — EXCLUDED from composite; non-discriminative; not applicable to Brenus CRC biology |

---

## RECEIPT / PROVENANCE INFRASTRUCTURE

### 5.1 receipt_preflight.py

| Field | Value |
|-------|-------|
| **name** | receipt_preflight.py — mechanism-fit discrimination receipt generator |
| **repo** | publications/02-trial-matching/scripts/ (relative to REPO_ROOT) |
| **exact_path** | `publications/02-trial-matching/scripts/receipt_preflight.py` (REPO_ROOT-relative); imports from `oncology-coPilot/oncology-backend-minimal/api/services/mechanism_fit_ranker` |
| **status** | CONFIRMED_CODE_PRESENT (source read directly) |
| **evidence_trace** | receipt_preflight.py source (direct read); receipt_preflight.json (execution output 2026-04-15); RECEIPT_MANIFEST.json (sha256 of trial_moa_vectors.json) |
| **key_code_quotes** | `"BACKEND_ROOT = REPO_ROOT / 'oncology-coPilot' / 'oncology-backend-minimal'"` ; `"MOA_JSON = BACKEND_ROOT / 'api' / 'resources' / 'trial_moa_vectors.json'"` ; `"ranker_constants: {alpha: 0.7, beta: 0.3}"` |
| **brenus_relevant** | YES — provenance infrastructure for trial ranking; alpha=0.7/beta=0.3 constants govern ranking |

---

### 5.2 retroactive_prediction_run.py

| Field | Value |
|-------|-------|
| **name** | retroactive_prediction_run.py — 8D validation script |
| **repo** | ABSENT from crispro-backend-v3 and crispro as of 2026-04-28 |
| **exact_path** | ABSENT (reconstructed copy at `/mnt/results/8D_audit/retroactive_prediction_run.py`) |
| **status** | CONFIRMED_ABSENT (from repos); reconstructed copy exists in audit artifacts |
| **evidence_trace** | VC-14: `"find /workspace/crispro-backend-v3 /workspace/crispro -name 'retroactive_prediction_run.py' → no output"` |
| **key_code_quotes** | `"This script was reconstructed 2026-04-28 from audit extractions. The original script did not exist in crispro-backend-v3 or crispro as of 2026-04-28 (VC-14)."` (reconstructed script header) |
| **brenus_relevant** | NO — 8D patent validation script; not Brenus-specific |

---

### 5.3 RECEIPT_MANIFEST.json

| Field | Value |
|-------|-------|
| **name** | RECEIPT_MANIFEST.json — execution provenance manifest |
| **repo** | publications/02-trial-matching/artifacts/ |
| **exact_path** | `publications/02-trial-matching/artifacts/RECEIPT_MANIFEST.json` |
| **status** | CONFIRMED_CODE_PRESENT (artifact read directly) |
| **evidence_trace** | RECEIPT_MANIFEST.json direct read; generated_at: 2026-04-15T20:27:22.572631+00:00; sha256 of trial_moa_vectors.json confirmed |
| **brenus_relevant** | YES — provenance chain for trial ranking outputs |

---

### 5.4 backfill_rss_tags.py

| Field | Value |
|-------|-------|
| **name** | backfill_rss_tags.py — RSS axis backfill script |
| **repo** | crispro-backend-v3 (inferred from VC-09 reference) |
| **exact_path** | INFERRED — referenced as `scripts/backfill_rss_tags.py` in 02-proof-of-concept.mdc |
| **status** | INFERRED_PRESENT |
| **evidence_trace** | VC-09: `"scripts/backfill_rss_tags.py — ran live (4/4 trials tagged)"` |
| **brenus_relevant** | NO — RSS backfill for 8D patent; not Brenus CRC trials |

---

## WHAT DOES NOT EXIST IN ANY REPO (CONFIRMED ABSENT OR TRADE SECRET)

| Item | Status | Evidence |
|------|--------|---------|
| `retroactive_prediction_run.py` in either repo | CONFIRMED_ABSENT | VC-14 |
| `trial_moa_vectors.json` in any mounted path | TRADE_SECRET | VC-13 |
| `TAG_VECTORS` in any mounted path | TRADE_SECRET | VC-13 |
| Claim ledger ingestion module (as code) | ABSENT — no evidence | Not referenced in any VC, CT, or receipt |
| Blocker registry enforcement module (as code) | ABSENT — no evidence | Not referenced in any VC, CT, or receipt |
| Sponsor Q&A generation module | ABSENT — no evidence | Not referenced in any VC, CT, or receipt |
| Comparator evidence packet generator | ABSENT — no evidence | Not referenced in any VC, CT, or receipt |
| DTH response modeling module | ABSENT — no evidence | Not referenced in any VC, CT, or receipt |
| Biomarker stratification module (as code) | ABSENT — no evidence | Not referenced in any VC, CT, or receipt |
| Engine-safe routing layer (as code) | ABSENT — no evidence | Not referenced in any VC, CT, or receipt |
| Manuscript/patent quarantine logic (as code) | ABSENT — no evidence | Quarantine is a documentation process, not a code module |
| Trial subset locking module (as code) | ABSENT — no evidence | trial_subset_abstract.json referenced but no locking code confirmed |

---

*End of repo_census.md — 2026-04-28*
*CrisPRO Capability Cartographer*
*Evidence basis: VC-01 through VC-15, CT-01 through CT-06, receipt_preflight.py, HONEST_AUDIT.md, Brenus canon v2.1-FREEZE*
