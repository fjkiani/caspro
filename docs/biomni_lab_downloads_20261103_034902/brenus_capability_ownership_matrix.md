# Brenus Capability Ownership Matrix
**Prepared by:** CrisPRO Capability Cartographer
**Date:** 2026-04-28
**Evidence basis:** VC-01 through VC-15; CT-01 through CT-06; receipt_preflight.py; crispro_fitgap_brenus_verified_only.md; crispro_module_requirements_brenus.csv; brenus_canon_v2_freeze.md; brenus_final_blockers_registry.md; HONEST_AUDIT.md
**Hard rule:** current_status reflects what code actually exists, not what would be ideal. ABSENT means no code evidence found.

---

## CAPABILITY 1 — Trial MoA Vector Matching (mechanism_fit_ranker)

| Field | Value |
|-------|-------|
| **capability_name** | Trial MoA vector matching |
| **owning_repo_path** | `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py` (CONFIRMED_CODE_PRESENT, VC-01/VC-02); production instance at `oncology-coPilot/oncology-backend-minimal/api/services/mechanism_fit_ranker.py` (INFERRED_PRESENT, receipt_preflight.py import) |
| **current_status** | **partial** — code exists and runs (receipt_preflight.json confirms 609 trials ranked 2026-04-15); formula conflict unresolved (CT-01/CT-02); trial vectors are TRADE_SECRET (VC-13) |
| **dependencies** | `trial_moa_vectors.json` (TRADE_SECRET); `TAG_VECTORS` (TRADE_SECRET); patient vector input; PATHWAYS_8D axis list (VC-01) |
| **blocker_linkage** | B-003 (no human efficacy data — cannot validate ranking against clinical outcomes); CT-01/CT-02 (formula conflict — PATH A ceiling 0.8898 vs PATH B ceiling 1.0); BLOCKER-07 (trial_moa_vectors.json trade secret) |
| **brenus_relevant** | YES — core capability for ranking BreAK CRC-001 against comparator trials |
| **evidence_trace** | VC-01: `"PATHWAYS_8D = ['ddr', 'mapk', 'pi3k', 'vegf', 'her2', 'io', 'efflux', 'rss']"` (L50–51); VC-02: `"Magnitude-weighted similarity: (p·t)/||t|| (not cosine)"` (L9); receipt_preflight.json: `"ranked_count: 609"` |
| **notes** | PATH A formula is confirmed in crispro-backend-v3; production receipt uses oncology-coPilot path. Repo boundary must be preserved — these may differ. For Brenus: patient vector would encode KRAS-mutated/BRAF-WT/IO-naive MSS CRC profile. |

---

## CAPABILITY 2 — Holistic Score Computation (HolisticScoreService)

| Field | Value |
|-------|-------|
| **capability_name** | Holistic score computation |
| **owning_repo_path** | `crispro-backend-v3/layer1_engines/holistic_score/mechanism_fit.py` (PATH B formula, CONFIRMED_CODE_PRESENT, VC-03); `crispro-backend-v3/layer1_engines/holistic_score/models.py` (weight constants, CONFIRMED_CODE_PRESENT, VC-15) |
| **current_status** | **partial** — code exists; formula conflict with PATH A unresolved (CT-01); 4-component blend confirmed (VC-15) but pgx_safety and resistance_risk inputs for Brenus patient not defined |
| **dependencies** | mechanism_fit score (from PATH B); eligibility score; pgx_safety score; resistance_risk score; all 4 components required for blend |
| **blocker_linkage** | CT-01 (PATH A vs PATH B formula conflict — manager decision pending); CT-06 (2-component vs 4-component manuscript conflict); B-003 (no human data to validate holistic score against clinical outcomes) |
| **brenus_relevant** | YES — holistic score is the final ranking output; pgx_safety and resistance_risk components are relevant to BreAK CRC-001 (mFOLFOX6 toxicity, KRAS-driven resistance) |
| **evidence_trace** | VC-03: `"cosine(p, t) = (p · t) / (||p||₂ × ||t||₂)"` (PATH B); VC-15: `"mechanism_fit: 0.4, eligibility: 0.3, pgx_safety: 0.15, resistance_risk: 0.15"` |
| **notes** | pgx_safety and resistance_risk input sources for Brenus are not documented in any VC or CT. These components are confirmed in models.py but their upstream data sources are INFERRED. |

---

## CAPABILITY 3 — Claim Ledger Ingestion

| Field | Value |
|-------|-------|
| **capability_name** | Claim ledger ingestion |
| **owning_repo_path** | ABSENT — no code path found in any VC, CT, or receipt |
| **current_status** | **absent** |
| **dependencies** | ABSENT |
| **blocker_linkage** | None (capability does not exist) |
| **brenus_relevant** | YES — would be needed to ingest Brenus canon v2.1-FREEZE verified claims as engine inputs |
| **evidence_trace** | No VC, CT, or receipt references any claim ledger ingestion module. Brenus canon v2.1-FREEZE and brenus_final_blockers_registry.md exist as documents but no code module reads them. |
| **notes** | The claim ledger (brenus_canon_v2_freeze.md, brenus_final_blockers_registry.md) exists as documentation. No code module ingests it. This is a gap — currently a human-mediated process. |

---

## CAPABILITY 4 — Blocker Registry Enforcement

| Field | Value |
|-------|-------|
| **capability_name** | Blocker registry enforcement |
| **owning_repo_path** | ABSENT — no code path found in any VC, CT, or receipt |
| **current_status** | **absent** |
| **dependencies** | ABSENT |
| **blocker_linkage** | B-003 (human clinical data blocked); B-004 (bevacizumab assignment provisional); SC-001 (HT29/BRAF conflict active) |
| **brenus_relevant** | YES — critical for preventing blocked/provisional claims from leaking into user-visible output |
| **evidence_trace** | brenus_final_blockers_registry.md documents B-001 through B-006 and SC-001 as a document. No code module enforces these blockers at runtime. |
| **notes** | Blocker enforcement is currently a documentation-only process. No runtime gate exists. This is the highest-priority gap for Brenus-safe output. |

---

## CAPABILITY 5 — Scientific Conflict Handling (SC-001 HT29/BRAF)

| Field | Value |
|-------|-------|
| **capability_name** | Scientific conflict handling (SC-001 HT29/BRAF V600E) |
| **owning_repo_path** | ABSENT — no code path found in any VC, CT, or receipt |
| **current_status** | **absent** |
| **dependencies** | ABSENT |
| **blocker_linkage** | SC-001 (ACTIVE CONFLICT: HT29 BRAF V600E in vaccine vs. BRAF WT trial eligibility); B-006 (resolution blocked pending additional Brenus data) |
| **brenus_relevant** | YES — SC-001 is an active scientific conflict that must be flagged in any output discussing STC-1010 vaccine composition or trial eligibility |
| **evidence_trace** | brenus_canon_v2_freeze.md Hard Stop #10: `"HT29 carries the BRAF V600E mutation (established cell line biology — not in dispute). BreAK CRC-001 Exclusion Criterion #7 requires BRAF wild-type patients."` ; brenus_final_blockers_registry.md SC-001 |
| **notes** | SC-001 is documented in canon but no code enforces the conflict flag. Any CrisPRO output discussing HT29 or vaccine composition must carry the SC-001 flag manually until a code enforcement layer exists. |

---

## CAPABILITY 6 — Comparator Evidence Packet Generation

| Field | Value |
|-------|-------|
| **capability_name** | Comparator evidence packet generation |
| **owning_repo_path** | ABSENT — no code path found in any VC, CT, or receipt |
| **current_status** | **absent** |
| **dependencies** | ABSENT (no code); verified comparator data exists in brenus_canon_v2_freeze.md (NCT03050814 HR 1.061, p=0.91, PFS 8.8m/10.1m) |
| **blocker_linkage** | None blocking the data; B-003 blocks STC-1010 clinical data as comparator input |
| **brenus_relevant** | YES — crispro_fitgap_brenus_verified_only.md §3.1 identifies historical control benchmark construction as executable now using NCT03050814 verified data |
| **evidence_trace** | crispro_module_requirements_brenus.csv: `historical_control_benchmark` module listed as `available_now: yes`; crispro_fitgap_brenus_verified_only.md §3.1 |
| **notes** | The data for this capability is verified and available. The code module does not exist. This is a build-from-scratch item using verified inputs from canon v2. |

---

## CAPABILITY 7 — Sponsor Q&A Generation with Provenance Locks

| Field | Value |
|-------|-------|
| **capability_name** | Sponsor Q&A generation with provenance locks |
| **owning_repo_path** | ABSENT — no code path found in any VC, CT, or receipt |
| **current_status** | **absent** |
| **dependencies** | ABSENT |
| **blocker_linkage** | B-003 (human clinical data blocked — most likely Q&A topics); B-004 (bevacizumab assignment provisional); SC-001 (HT29/BRAF conflict must be flagged) |
| **brenus_relevant** | YES — Brenus sponsor engagement requires provenance-locked Q&A that distinguishes VERIFIED from BLOCKED claims |
| **evidence_trace** | No VC, CT, or receipt references a Q&A generation module. The guardrails in crispro_fitgap_brenus_verified_only.md §8 define the required behavior but no code implements it. |
| **notes** | The guardrail framework (7 guardrails in §8 of fit-gap doc) defines what a Q&A generator must enforce. No code exists. |

---

## CAPABILITY 8 — Manuscript/Patent Quarantine Logic

| Field | Value |
|-------|-------|
| **capability_name** | Manuscript/patent quarantine logic |
| **owning_repo_path** | ABSENT as code; DOC_ONLY in `crispro/.cursor/ayesha/debrief/` tree |
| **current_status** | **absent** (as code); quarantine labels exist in documentation (8d_remediation_log.md, 8d_contradictions_and_missing_artifacts.md) |
| **dependencies** | ABSENT |
| **blocker_linkage** | CT-01/CT-02 (formula quarantine — manager decision pending); CT-03 (LATIFY delta quarantine); BLOCKER-02 (manager formula decision) |
| **brenus_relevant** | PARTIAL — quarantine logic for 8D patent claims is not directly Brenus-relevant; but the pattern (blocking provisional claims from output) is directly applicable to Brenus |
| **evidence_trace** | 8d_remediation_log.md: quarantine labels applied to CT-01, CT-02, CT-03, DL-03, DL-07, PC-05, PC-06 as documentation. No code enforces these labels at runtime. |
| **notes** | Quarantine is currently a documentation-only process. The pattern is well-defined in the remediation log but not implemented as code. |

---

## CAPABILITY 9 — Engine-Safe Routing (Verified vs Blocked Inputs)

| Field | Value |
|-------|-------|
| **capability_name** | Engine-safe routing (verified vs blocked inputs) |
| **owning_repo_path** | ABSENT — no code path found in any VC, CT, or receipt |
| **current_status** | **absent** |
| **dependencies** | ABSENT |
| **blocker_linkage** | B-003 (human clinical data blocked); B-004 (bevacizumab provisional); SC-001 (HT29/BRAF active conflict); CT-01/CT-02 (formula quarantine) |
| **brenus_relevant** | YES — critical for preventing blocked inputs (n=6, DCR, DTH data) from entering the engine |
| **evidence_trace** | brenus_canon_v2_freeze.md Part VII engine_routable column: 44 claims tagged yes/no for engine routing. No code enforces this routing. crispro_fitgap_brenus_verified_only.md §6 defines hard gates. |
| **notes** | The engine_routable classification exists in the canon YAML/table. No code reads it. This is a critical gap — without runtime enforcement, blocked inputs can enter the engine through human error. |

---

## CAPABILITY 10 — Evo2 Variant Scoring

| Field | Value |
|-------|-------|
| **capability_name** | Evo2 variant scoring |
| **owning_repo_path** | Modal service: `crispro-evo2-v9` (CONFIRMED_CODE_PRESENT, HONEST_AUDIT.md) |
| **current_status** | **available** — endpoint active; scored 4 adversarial negatives 2026-04-13; composite AUROC 0.6889 |
| **dependencies** | GRCh38 reference genome; variant HGVS coordinates; Modal API access |
| **blocker_linkage** | None blocking the endpoint itself; UNRESOLVED-003 (ATAC missing for 5 genes — mean imputation applied) |
| **brenus_relevant** | PARTIAL — Evo2 scores sequence disruption (loss-of-function); not directly applicable to STC-1010 vaccine biology; potentially relevant for KRAS/BRAF variant scoring in BreAK CRC-001 patient stratification (KRAS G12D/G12V/G13D/G12C subtype scoring) |
| **evidence_trace** | HONEST_AUDIT.md: `"All 4 variants scored via Modal Evo2 service (crispro-evo2-v9), ref verified against GRCh38."` ; `"Honest composite AUROC: 0.6889"` |
| **notes** | Evo2 scores loss-of-function disruption. KRAS mutations in BreAK CRC-001 are gain-of-function (G12D, G12V, etc.) — Evo2 correctly identifies these as benign-like (as seen with EGFR L858R delta_ll=+0.088 in HONEST_AUDIT). Evo2 is not the right tool for KRAS GOF variant scoring. |

---

## CAPABILITY 11 — Enformer Accessibility Scoring

| Field | Value |
|-------|-------|
| **capability_name** | Enformer accessibility scoring |
| **owning_repo_path** | Modal endpoint: `https://crispro-test--enformer-accessibility.modal.run` (CONFIRMED_CODE_PRESENT but non-discriminative) |
| **current_status** | **dead** — endpoint active but excluded from composite; returns near-constant values regardless of sequence content |
| **dependencies** | Modal API access; sequence input |
| **blocker_linkage** | UNRESOLVED-002 (Enformer endpoint non-discriminative — documented; excluded from composite) |
| **brenus_relevant** | NO — excluded from composite; non-discriminative; not applicable to Brenus CRC biology |
| **evidence_trace** | HONEST_AUDIT.md: `"poly-N score: 0.0218 > ACTB: 0.0170 > TP53: 0.0162"` ; `"Conclusion: Endpoint returns near-constant values regardless of sequence content"` ; `"Action: Excluded from composite"` |
| **notes** | Endpoint exists but is scientifically non-functional. Do not use for any Brenus output. |

---

## CAPABILITY 12 — Receipt/Provenance Generation

| Field | Value |
|-------|-------|
| **capability_name** | Receipt/provenance generation |
| **owning_repo_path** | `publications/02-trial-matching/scripts/receipt_preflight.py` (CONFIRMED_CODE_PRESENT, direct read) |
| **current_status** | **partial** — receipt infrastructure exists and ran successfully (2026-04-15); generates receipt_preflight.json and RECEIPT_MANIFEST.json; but Brenus-specific provenance fields are absent (no blocker flags, no SC-001 flag, no VERIFIED/BLOCKED claim tags in receipt output) |
| **dependencies** | `trial_moa_vectors.json` (TRADE_SECRET — required for full-registry receipt); `MechanismFitRanker` (INFERRED_PRESENT at oncology-coPilot path) |
| **blocker_linkage** | BLOCKER-07 (trial_moa_vectors.json trade secret — receipt cannot run without it); B-003 (no human clinical data to validate receipt outputs against) |
| **brenus_relevant** | YES — provenance generation is required for all Brenus-facing outputs; current receipt format lacks Brenus-specific fields |
| **evidence_trace** | receipt_preflight.py source (direct read); receipt_preflight.json: `"generated_at": "2026-04-15T20:27:22.572631+00:00"` ; `"ranked_count: 609"` ; `"ranker_constants: {alpha: 0.7, beta: 0.3}"` |
| **notes** | Current receipt captures: timestamp, patient vector, registry stats, discrimination stats, ranker constants. Missing for Brenus: blocker flags, SC-001 flag, VERIFIED/BLOCKED claim provenance, formula version (PATH A vs PATH B), Brenus-specific guardrail compliance. |

---

## CAPABILITY 13 — Trial Subset Locking (trial_subset_abstract.json)

| Field | Value |
|-------|-------|
| **capability_name** | Trial subset locking |
| **owning_repo_path** | INFERRED — `publications/02-trial-matching/artifacts/trial_subset_abstract.json` (referenced in receipt_preflight.py abstract_note; not directly read) |
| **current_status** | **stub** — file referenced in receipt_preflight.py abstract_note; `trial_moa_entries: []` (empty array per LOG-06); status: `pending_lock` |
| **dependencies** | trial_moa_entries population (59 rows with moa_vector per row); receipt_subset.py (ABSENT — MA-09); formula decision (PATH A vs PATH B) |
| **blocker_linkage** | BLOCKER-02 (manager formula decision); BLOCKER-07 (trial_moa_vectors.json for populating entries); MA-09 (receipt_subset.py not written) |
| **brenus_relevant** | PARTIAL — trial subset locking is relevant if a Brenus-specific trial subset needs to be frozen for analysis |
| **evidence_trace** | receipt_preflight.py abstract_note: `"Lock list in publications/02-trial-matching/artifacts/trial_subset_abstract.json (populate trial_moa_entries; status pending_lock until filled)."` ; LOG-06: `"trial_subset_abstract.json: 'trial_moa_entries: []' (empty)"` |
| **notes** | The locking mechanism is a stub. trial_moa_entries is empty. receipt_subset.py does not exist (MA-09). Cannot lock any subset until these are resolved. |

---

## CAPABILITY 14 — Biomarker Stratification

| Field | Value |
|-------|-------|
| **capability_name** | Biomarker stratification |
| **owning_repo_path** | ABSENT as code — no code path found in any VC, CT, or receipt |
| **current_status** | **absent** (as code); framework defined in crispro_fitgap_brenus_verified_only.md §3.6 and crispro_module_requirements_brenus.csv |
| **dependencies** | ABSENT (code); verified inputs available: BreAK CRC-001 exploratory endpoint schedule (T0/1m/2m/6m/12m/Tprogression), DTH monitoring protocol, KRAS/BRAF eligibility criteria |
| **blocker_linkage** | SC-001 (HT29/BRAF conflict blocks HT29-specific antigen modeling); B-003 (no human clinical data for biomarker validation); OQ-01 (HT29 conflict resolution required for full antigen mapping) |
| **brenus_relevant** | YES — crispro_module_requirements_brenus.csv lists: exploratory_biomarker_framework_design, msi_h_vs_mss_arm_differentiation, kras_braf_molecular_context_modeling, hct116_lovo_antigen_mapping — all available_now=yes |
| **evidence_trace** | crispro_module_requirements_brenus.csv: `exploratory_biomarker_framework_design, available_now: yes`; `hct116_lovo_antigen_mapping, available_now: yes`; `ht29_antigen_mapping, available_now: no, blocked_by: OQ-01` |
| **notes** | The data framework is defined. No code module exists. HCT116 and LoVo antigen mapping is executable now (KRAS G13D, consistent with trial eligibility). HT29 antigen mapping is blocked by OQ-01 (SC-001). |

---

## CAPABILITY 15 — DTH Response Modeling

| Field | Value |
|-------|-------|
| **capability_name** | DTH (delayed-type hypersensitivity) response modeling |
| **owning_repo_path** | ABSENT — no code path found in any VC, CT, or receipt |
| **current_status** | **absent** |
| **dependencies** | ABSENT (code); human clinical DTH data (BLOCKED — B-003); DTH monitoring protocol (VERIFIED — BreAK CRC-001 Phase I: DTH at 1/24/48/72h post-injection) |
| **blocker_linkage** | B-003 (human clinical DTH data blocked — n=6/DTH response data from AACR 2026 CT051 not retrieved); B-005 (ASCO 2024 abstract blocked) |
| **brenus_relevant** | YES — DTH is the Phase I immune monitoring endpoint for BreAK CRC-001; critical for pharmacodynamic modeling |
| **evidence_trace** | brenus_canon_v2_freeze.md §1.4: `"Phase I immune monitoring endpoint: DTH score assessed at 1, 24, 48, 72h post-first injection; then after 4th, 8th, and every boost"` [VERIFIED]; brenus_final_blockers_registry.md B-003: DTH response data BLOCKED |
| **notes** | DTH monitoring protocol is verified. DTH response data is blocked (B-003). No code module exists for DTH modeling. This capability requires both code development AND B-003 resolution before it can produce any output. |

---

## ADDITIONAL CAPABILITIES (from crispro_module_requirements_brenus.csv evidence)

### Capability 16 — Historical Control Benchmark Construction

| Field | Value |
|-------|-------|
| **capability_name** | Historical control benchmark construction |
| **owning_repo_path** | ABSENT as code; data available in brenus_canon_v2_freeze.md |
| **current_status** | **absent** (code); data inputs available_now=yes |
| **dependencies** | NCT03050814 verified data (HR 1.061, PFS 8.8m/10.1m, n=30) — VERIFIED; BreAK CRC-001 Phase IIA primary endpoint — VERIFIED |
| **blocker_linkage** | None blocking data inputs; B-003 blocks STC-1010 clinical data as numerator |
| **brenus_relevant** | YES — highest-confidence executable capability per crispro_module_requirements_brenus.csv (confidence: medium; scientific_value: high) |
| **evidence_trace** | crispro_module_requirements_brenus.csv: `historical_control_benchmark, available_now: yes, blocked_by: none` |

---

### Capability 17 — MSI-H vs MSS Arm Differentiation

| Field | Value |
|-------|-------|
| **capability_name** | MSI-H vs MSS arm differentiation analysis |
| **owning_repo_path** | ABSENT as code; data available in brenus_canon_v2_freeze.md |
| **current_status** | **absent** (code); data inputs available_now=yes |
| **dependencies** | BreAK CRC-001 three-arm structure (VERIFIED); QUILT-2.004 MSI-H exclusion (VERIFIED); published CheckMate 142 data |
| **blocker_linkage** | None blocking data inputs |
| **brenus_relevant** | YES — confidence: high per crispro_module_requirements_brenus.csv |
| **evidence_trace** | crispro_module_requirements_brenus.csv: `msi_h_vs_mss_arm_differentiation, available_now: yes, blocked_by: none, confidence_of_output: high` |

---

*End of brenus_capability_ownership_matrix.md — 2026-04-28*
*CrisPRO Capability Cartographer*
*Evidence basis: VC-01 through VC-15, CT-01 through CT-06, crispro_fitgap_brenus_verified_only.md, crispro_module_requirements_brenus.csv, brenus_canon_v2_freeze.md, brenus_final_blockers_registry.md, HONEST_AUDIT.md*
