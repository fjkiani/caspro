# Brenus Activation Decisions
**Authority:** Brenus Adjudication Agent
**Version:** 1.0
**Date:** 2026-04-28
**Evidence basis:** repo_census.md, brenus_capability_ownership_matrix.md, brenus_vertical_slice_queue.md, brenus_wrapper_vs_rebuild_table.csv, receipts_and_guardrails_gap_report.md, brenus_canon_v2_freeze.md (v2.1-FREEZE), brenus_final_blockers_registry.md (v1.1-FINAL), brenus_engine_safe_input_block_v2.yaml (v2.1), crispro_fitgap_brenus_verified_only.md, crispro_module_requirements_brenus.csv, crispro_blocked_inputs_registry.md, formula_decision_onepager.md, formula_affected_claims_table.csv
**Hard rule:** Decisions are final for this release cycle. Do not re-derive from source repos. Do not speculate beyond source files.

---

## DECISION LEGEND

| Decision | Meaning |
|----------|---------|
| **ACTIVATE NOW** | Verified inputs available, no hard blockers, code confirmed or inferred present |
| **ACTIVATE WITH GUARDRAILS** | Can run but output must carry explicit qualification text |
| **HOLD** | Blocked by a specific resolvable blocker; named blocker and resolution path stated |
| **BLOCK** | Hard gate; must not run until external confirmation; reason stated |

---

## CAPABILITY 1 — Trial MoA Vector Matching (MechanismFitRanker)

| Field | Value |
|-------|-------|
| **capability_name** | Trial MoA vector matching (MechanismFitRanker) |
| **decision** | **ACTIVATE WITH GUARDRAILS** |
| **evidence_basis** | Code CONFIRMED_CODE_PRESENT (VC-01, VC-02) at `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py`; production instance INFERRED_PRESENT at oncology-coPilot path; receipt_preflight.json confirms 609 trials ranked 2026-04-15; PATH A formula confirmed (VC-02); trial_moa_vectors.json TRADE_SECRET but internally accessible (VC-13); formula conflict CT-01/CT-02 unresolved — manager decision pending |
| **code_owner** | `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py` (CONFIRMED_CODE_PRESENT); production: `oncology-coPilot/oncology-backend-minimal/api/services/mechanism_fit_ranker.py` (INFERRED_PRESENT) |
| **blocker_linkage** | CT-01/CT-02 (formula conflict — manager decision pending); BLOCKER-07 (trial_moa_vectors.json trade secret — internal authorization required) |
| **output_qualification** | "[FORMULA VERSION QUARANTINED — CT-01/CT-02 unresolved; mechanism_fit scores computed under PATH A (fit = clip((p·t)/‖t‖₂, 0, 1)); ceiling for p_ref = 0.8898; do not compare to Figure 2 DDR mean (0.983) which was computed under PATH B; formula decision is manager-held]" |
| **activation_conditions** | (1) Internal authorization for trial_moa_vectors.json access confirmed; (2) Brenus patient vector constructed from verified inputs (KRAS-mutated, BRAF-WT, MSS/pMMR, IO-naive); (3) Receipt extension (SLICE-003) in place before any user-visible output |
| **special_attention** | Formula conflict (CT-01/CT-02): any mechanism_fit score in user-visible output must carry formula-version qualifier. No-CPI constraint: IO axis in patient vector reflects tumor immune microenvironment, NOT CPI treatment — must be clarified in every output. |

---

## CAPABILITY 2 — Holistic Score Computation (HolisticScoreService)

| Field | Value |
|-------|-------|
| **capability_name** | Holistic score computation (HolisticScoreService, PATH B) |
| **decision** | **HOLD** |
| **evidence_basis** | Code CONFIRMED_CODE_PRESENT (VC-03) at `crispro-backend-v3/layer1_engines/holistic_score/mechanism_fit.py`; weight constants CONFIRMED_CODE_PRESENT (VC-15) at `crispro-backend-v3/layer1_engines/holistic_score/models.py`; PATH B formula (cosine similarity) coexists with PATH A (CT-01); pgx_safety and resistance_risk input sources for Brenus patient not documented in any VC or CT; formula conflict CT-01/CT-02 unresolved |
| **code_owner** | `crispro-backend-v3/layer1_engines/holistic_score/mechanism_fit.py` (CONFIRMED_CODE_PRESENT); `crispro-backend-v3/layer1_engines/holistic_score/models.py` (CONFIRMED_CODE_PRESENT) |
| **blocker_linkage** | CT-01/CT-02 (PATH A vs PATH B formula conflict — manager decision pending; BLOCKER-02); CT-06 (2-component vs 4-component manuscript conflict) |
| **output_qualification** | N/A — HOLD; no output until blocker resolves |
| **resolution_path** | Manager records PATH A/B formula decision (BLOCKER-02). Once decision recorded: (1) confirm which formula holistic score uses; (2) define pgx_safety and resistance_risk input sources for Brenus patient; (3) re-evaluate activation. |
| **special_attention** | CT-06: 4-component blend (mechanism_fit 0.4, eligibility 0.3, pgx_safety 0.15, resistance_risk 0.15) confirmed in models.py but conflicts with manuscript 2-component formula. Do not expose holistic score to users until both CT-01/CT-02 and CT-06 are resolved. |

---

## CAPABILITY 3 — Claim Ledger Ingestion

| Field | Value |
|-------|-------|
| **capability_name** | Claim ledger ingestion (brenus_canon_v2_freeze.md → engine) |
| **decision** | **ACTIVATE WITH GUARDRAILS** |
| **evidence_basis** | No code exists (ABSENT — repo_census.md); brenus_canon_v2_freeze.md Part VII engine_routable table (44 claims) exists as document; crispro_module_requirements_brenus.csv identifies this as a build-from-scratch item; all required input data is VERIFIED; no hard blockers on the build itself |
| **code_owner** | ABSENT — build from scratch; no existing path |
| **blocker_linkage** | none (no blocker on the build; architecture decision required) |
| **output_qualification** | "[CLAIM LEDGER INGESTION — build-from-scratch module; reads brenus_canon_v2_freeze.md Part VII engine_routable table; enforces VERIFIED/BLOCKED/PROVISIONAL tags at runtime; not yet implemented — human-mediated process until code ships]" |
| **activation_conditions** | Engineering builds ingestion module reading engine_routable column from canon v2.1-FREEZE; module must enforce BLOCKED=false gate before passing any claim to engine |
| **special_attention** | Until this module ships, all claim routing is human-mediated. This is the foundational guardrail for all Brenus outputs. Priority: build before any Brenus-facing user output is enabled. |

---

## CAPABILITY 4 — Blocker Registry Enforcement (Runtime)

| Field | Value |
|-------|-------|
| **capability_name** | Blocker registry enforcement (runtime gate) |
| **decision** | **ACTIVATE WITH GUARDRAILS** |
| **evidence_basis** | No code exists (ABSENT — repo_census.md); brenus_final_blockers_registry.md (v1.1-FINAL) documents B-001 through B-006 and SC-001; receipts_and_guardrails_gap_report.md §4 confirms no runtime enforcement exists; build-from-scratch required |
| **code_owner** | ABSENT — build from scratch; no existing path |
| **blocker_linkage** | B-003 (human clinical data — hard gate); B-004 (bevacizumab — provisional gate); SC-001 (HT29/BRAF — active conflict gate) |
| **output_qualification** | "[BLOCKER ENFORCEMENT — runtime gate not yet implemented; all blocker checks are currently human-mediated; B-003 (human clinical data), B-004 (bevacizumab arm assignment), SC-001 (HT29/BRAF V600E) must be manually verified before any Brenus output is released]" |
| **activation_conditions** | Engineering builds runtime enforcement layer reading blocker status from brenus_final_blockers_registry.md; must reject any input tagged as B-003 source with explicit error; must inject SC-001 flag for any HT29-related input |
| **special_attention** | Highest-priority gap for Brenus-safe output. Without runtime enforcement, blocked inputs (n=6, DCR, DTH data) can enter the engine through human error. |

---

## CAPABILITY 5 — Scientific Conflict Handling (SC-001 HT29/BRAF V600E)

| Field | Value |
|-------|-------|
| **capability_name** | Scientific conflict handling (SC-001 HT29/BRAF V600E) |
| **decision** | **ACTIVATE WITH GUARDRAILS** |
| **evidence_basis** | No code exists (ABSENT — repo_census.md); SC-001 documented in brenus_canon_v2_freeze.md Hard Stop #10 and brenus_final_blockers_registry.md SC-001; conflict is ACTIVE — HT29 BRAF V600E confirmed in vaccine (ASCO 2023 e14661 VERIFIED), trial excludes BRAF-mutant patients (NCT06934538 VERIFIED); no runtime enforcement currently |
| **code_owner** | ABSENT — build from scratch; no existing path |
| **blocker_linkage** | SC-001 (ACTIVE CONFLICT); B-006 (resolution blocked pending additional Brenus data) |
| **output_qualification** | "[ACTIVE SCIENTIFIC CONFLICT SC-001 — HT29 carries BRAF V600E mutation (established cell line biology). BreAK CRC-001 Exclusion Criterion #7 requires BRAF wild-type patients. The vaccine contains a BRAF V600E-mutant cell line while the trial exclusively enrolls BRAF wild-type patients. The scientific rationale for this design choice is not disclosed in any retrieved source. This conflict is documented but not resolved. Do not assert it is benign or problematic.]" |
| **activation_conditions** | Any output discussing STC-1010 vaccine composition, HT29, or trial eligibility must carry the SC-001 qualification text. HT29-specific antigen modeling is BLOCKED until OQ-01 resolves. |
| **special_attention** | SC-001 is an ACTIVE CONFLICT with no runtime enforcement. Any capability that touches vaccine cell line composition must carry this flag. HCT116 and LoVo antigen modeling is SC-001-safe (both KRAS G13D, BRAF WT). |

---

## CAPABILITY 6 — Comparator Evidence Packet Generation (Historical Control Benchmark)

| Field | Value |
|-------|-------|
| **capability_name** | Comparator evidence packet generation / historical control benchmark construction |
| **decision** | **ACTIVATE NOW** |
| **evidence_basis** | No code exists (ABSENT — repo_census.md); all data inputs VERIFIED: NCT03050814 HR 1.061 (0.380–2.966), p=0.91, Arm A PFS 8.8m, n=30, MSS/pMMR (brenus_canon_v2_freeze.md Part II); BreAK CRC-001 Phase IIA primary endpoint VERIFIED (NCT06934538); crispro_module_requirements_brenus.csv: `historical_control_benchmark, available_now: yes, blocked_by: none`; SLICE-002 in vertical slice queue |
| **code_owner** | ABSENT — build from scratch; data inputs fully verified |
| **blocker_linkage** | none |
| **output_qualification** | "QUILT-2.004 (NCT03050814) was TERMINATED for futility at interim analysis (HR 1.061, 95% CI 0.380–2.966, p=0.91; n=30 enrolled vs. target n=70). This benchmark is from a small, underpowered trial with wide confidence intervals. QUILT-2.004 used Ad-CEA + avelumab (checkpoint inhibitor) — mechanistically different from STC-1010; the SOC arm (Arm A, PFS 8.8m) is the relevant comparator, not the experimental arm. This benchmark is hypothesis-generating, not causal attribution." |
| **special_attention** | Guardrail 6 (no QUILT-2.004 as positive efficacy precedent) must be enforced in all outputs. QUILT-2.004 used avelumab (CPI) — must not be conflated with BreAK CRC-001 regimen (no CPI). |

---

## CAPABILITY 7 — Sponsor Q&A Generation with Provenance Locks

| Field | Value |
|-------|-------|
| **capability_name** | Sponsor Q&A generation with provenance locks |
| **decision** | **HOLD** |
| **evidence_basis** | No code exists (ABSENT — repo_census.md); guardrail framework defined in crispro_fitgap_brenus_verified_only.md §8 (7 guardrails); depends on SLICE-003 receipt extension; B-003 blocks most likely Q&A topics (human clinical data); B-004 blocks arm-specific bevacizumab Q&A |
| **code_owner** | ABSENT — build from scratch; no existing path |
| **blocker_linkage** | B-003 (human clinical data — hard gate); B-004 (bevacizumab arm assignment — provisional); SC-001 (HT29/BRAF — must be flagged in any vaccine composition Q&A) |
| **output_qualification** | N/A — HOLD |
| **resolution_path** | (1) SLICE-003 receipt extension must ship first; (2) B-003 must resolve before any Q&A about clinical signals; (3) SC-001 flag must be enforced in any Q&A about vaccine composition. |
| **special_attention** | Any Q&A about preliminary clinical signals must carry: "No human clinical efficacy data for STC-1010 is available from directly retrieved sources [BLOCKED — B-003]." Any Q&A about vaccine composition must carry SC-001 flag. |

---

## CAPABILITY 8 — Manuscript/Patent Quarantine Logic

| Field | Value |
|-------|-------|
| **capability_name** | Manuscript/patent quarantine logic |
| **decision** | **HOLD** |
| **evidence_basis** | No code exists (ABSENT as code — repo_census.md); quarantine labels exist in documentation (8d_remediation_log.md); CT-01/CT-02 formula quarantine — manager decision pending (BLOCKER-02); formula_decision_onepager.md confirms all formula-dependent claims remain QUARANTINED |
| **code_owner** | ABSENT as code; DOC_ONLY in `crispro/.cursor/ayesha/debrief/` tree |
| **blocker_linkage** | CT-01/CT-02 (formula quarantine — manager decision pending); BLOCKER-02 (manager formula decision) |
| **output_qualification** | N/A — HOLD |
| **resolution_path** | Manager records PATH A/B formula decision (BLOCKER-02). Once decision recorded, quarantine labels on formula-dependent claims (DDR_MEAN_874, DDR_MEAN_983, DISC_RATIO_23X, DISC_RATIO_37X, LATIFY_DELTA) can be resolved per formula_decision_onepager.md Section 6 decision gate. |
| **special_attention** | 0.983 figure is a SEPARATE publication-blocking discrepancy (impossible under PATH A). Must be resolved independently regardless of PATH A/B decision. |

---

## CAPABILITY 9 — Engine-Safe Routing (Verified vs Blocked Inputs)

| Field | Value |
|-------|-------|
| **capability_name** | Engine-safe routing (verified vs blocked inputs) |
| **decision** | **ACTIVATE WITH GUARDRAILS** |
| **evidence_basis** | No code exists (ABSENT — repo_census.md); engine_routable column exists in brenus_canon_v2_freeze.md Part VII (44 claims tagged yes/no); crispro_fitgap_brenus_verified_only.md §6 defines hard gates; receipts_and_guardrails_gap_report.md §3 identifies all leak points |
| **code_owner** | ABSENT — build from scratch; no existing path |
| **blocker_linkage** | B-003 (human clinical data — hard gate); B-004 (bevacizumab — provisional gate); SC-001 (HT29/BRAF — active conflict gate); CT-01/CT-02 (formula quarantine) |
| **output_qualification** | "[ENGINE-SAFE ROUTING — not yet implemented as code; routing is human-mediated; engine_routable classification from brenus_canon_v2_freeze.md Part VII must be manually verified before any claim enters the engine; BLOCKED claims (X-002, X-003, X-004, X-005) must not drive computation]" |
| **activation_conditions** | Engineering builds routing layer reading engine_routable flag from canon v2.1-FREEZE YAML before passing any claim to engine. Depends on Capability 3 (claim ledger ingestion). |
| **special_attention** | Critical gap: without runtime enforcement, blocked inputs can enter the engine through human error. Leak points documented in receipts_and_guardrails_gap_report.md §3: B-003 (human clinical data), SC-001 (HT29/BRAF), B-004 (bevacizumab), formula conflict (CT-01/CT-02), no-CPI constraint. |

---

## CAPABILITY 10 — Evo2 Variant Scoring

| Field | Value |
|-------|-------|
| **capability_name** | Evo2 variant scoring (crispro-evo2-v9) |
| **decision** | **ACTIVATE WITH GUARDRAILS** |
| **evidence_basis** | CONFIRMED_CODE_PRESENT (HONEST_AUDIT.md); endpoint active; scored 4 adversarial negatives 2026-04-13; composite AUROC 0.6889; not Brenus-relevant for KRAS GOF variant scoring (KRAS G12D/G12V/G13D/G12C are gain-of-function — Evo2 scores loss-of-function disruption); potentially relevant for confirming BRAF WT status |
| **code_owner** | Modal service: `crispro-evo2-v9` (CONFIRMED_CODE_PRESENT) |
| **blocker_linkage** | none (endpoint functional); UNRESOLVED-003 (ATAC missing for 5 genes — mean imputation applied) |
| **output_qualification** | "[Evo2 scores sequence disruption (loss-of-function). KRAS mutations in BreAK CRC-001 (G12D, G12V, G13D, G12C) are gain-of-function — Evo2 will correctly score these as benign-like (low pathogenicity). Evo2 is NOT the appropriate tool for KRAS GOF variant scoring. Evo2 may be used to confirm BRAF wild-type status (loss-of-function BRAF variants score pathogenic-like). Composite AUROC 0.6889 (honest estimate). ATAC data missing for 5 genes — mean imputation applied.]" |
| **special_attention** | Do not use Evo2 to score KRAS GOF variants as pathogenic. Evo2 is useful for BRAF WT confirmation only in the Brenus context. |

---

## CAPABILITY 11 — Enformer Accessibility Scoring

| Field | Value |
|-------|-------|
| **capability_name** | Enformer accessibility scoring |
| **decision** | **BLOCK** |
| **evidence_basis** | CONFIRMED_CODE_PRESENT but non-discriminative (HONEST_AUDIT.md); endpoint returns near-constant values regardless of sequence content (poly-N 0.0218 > ACTB 0.0170 > TP53 0.0162); already excluded from composite; not applicable to Brenus CRC biology |
| **code_owner** | Modal endpoint: `https://crispro-test--enformer-accessibility.modal.run` |
| **blocker_linkage** | UNRESOLVED-002 (non-discriminative — documented; excluded from composite) |
| **output_qualification** | N/A — BLOCK; must not appear in any Brenus output |
| **resolution_path** | Endpoint must be fixed (underlying model corrected) before any use. Do not include in any Brenus pipeline configuration. |
| **special_attention** | Endpoint is scientifically non-functional. Hard block for all Brenus outputs. |

---

## CAPABILITY 12 — Receipt/Provenance Generation

| Field | Value |
|-------|-------|
| **capability_name** | Receipt/provenance generation (receipt_preflight.py + Brenus extension) |
| **decision** | **ACTIVATE WITH GUARDRAILS** |
| **evidence_basis** | CONFIRMED_CODE_PRESENT (direct read); ran successfully 2026-04-15 (609 trials); receipts_and_guardrails_gap_report.md §2 identifies all missing Brenus-specific fields; SLICE-003 in vertical slice queue defines the extension |
| **code_owner** | `publications/02-trial-matching/scripts/receipt_preflight.py` (CONFIRMED_CODE_PRESENT); new file to build: `publications/02-trial-matching/scripts/receipt_brenus.py` (ABSENT) |
| **blocker_linkage** | BLOCKER-07 (trial_moa_vectors.json trade secret — required for full-registry receipt); CT-01/CT-02 (formula version field cannot be auto-populated until manager decision) |
| **output_qualification** | "[RECEIPT EXTENSION REQUIRED — current receipt_preflight.py lacks Brenus-specific fields: blocker flags (B-003, B-004, SC-001), VERIFIED/BLOCKED claim provenance tags, formula version (PATH A vs PATH B — QUARANTINED CT-01/CT-02), guardrail compliance markers. All Brenus-facing outputs must use receipt_brenus.py (SLICE-003) once built. Until then, all provenance is human-mediated.]" |
| **activation_conditions** | SLICE-003 (receipt_brenus.py) must be built and deployed before any Brenus-facing output is released. |
| **special_attention** | Priority 1 fix per receipts_and_guardrails_gap_report.md §5. SC-001 flag must appear in every Brenus receipt. Formula version must be recorded as "QUARANTINED — CT-01/CT-02 pending manager decision" until resolved. |

---

## CAPABILITY 13 — Trial Subset Locking

| Field | Value |
|-------|-------|
| **capability_name** | Trial subset locking (trial_subset_abstract.json) |
| **decision** | **HOLD** |
| **evidence_basis** | INFERRED at `publications/02-trial-matching/artifacts/trial_subset_abstract.json`; trial_moa_entries is empty array (LOG-06); receipt_subset.py ABSENT (MA-09); formula decision pending (BLOCKER-02); trial_moa_vectors.json TRADE_SECRET (BLOCKER-07) |
| **code_owner** | INFERRED at `publications/02-trial-matching/artifacts/trial_subset_abstract.json`; `receipt_subset.py` ABSENT |
| **blocker_linkage** | BLOCKER-02 (manager formula decision); BLOCKER-07 (trial_moa_vectors.json trade secret); MA-09 (receipt_subset.py not written) |
| **output_qualification** | N/A — HOLD |
| **resolution_path** | (1) Manager records formula decision (BLOCKER-02); (2) Internal authorization for trial_moa_vectors.json access; (3) Engineering writes receipt_subset.py (MA-09); (4) Populate trial_moa_entries with Brenus-relevant trial subset. |
| **special_attention** | Cannot lock any subset until all three blockers resolve. |

---

## CAPABILITY 14 — Biomarker Stratification

| Field | Value |
|-------|-------|
| **capability_name** | Biomarker stratification (HCT116 + LoVo antigen mapping; MSI-H vs MSS arm differentiation; KRAS/BRAF molecular context) |
| **decision** | **ACTIVATE WITH GUARDRAILS** |
| **evidence_basis** | No code exists (ABSENT — repo_census.md); HCT116 and LoVo confirmed in STC-1010 (ASCO 2023 e14661 VERIFIED); HCT116 KRAS G13D (published); LoVo KRAS G13D (published); crispro_module_requirements_brenus.csv: `hct116_lovo_antigen_mapping, available_now: yes`; `msi_h_vs_mss_arm_differentiation, available_now: yes, confidence_of_output: high`; `kras_braf_molecular_context_modeling, available_now: yes`; HT29 antigen mapping BLOCKED (OQ-01/SC-001) |
| **code_owner** | ABSENT — build from scratch; data inputs verified |
| **blocker_linkage** | SC-001 (HT29/BRAF conflict blocks HT29-specific antigen modeling — OQ-01); B-003 (no human clinical data for biomarker validation) |
| **output_qualification** | "[HT29 EXCLUDED — SC-001 ACTIVE: HT29 carries BRAF V600E; trial excludes BRAF-mutant patients (Exclusion #7); HT29-specific antigen modeling excluded until OQ-01 resolves. HCT116 and LoVo antigen mapping uses public proteomics (TCGA/CPTAC) — may not match actual STC-1010 antigen repertoire; Brenus mass spectrometry data required for definitive characterization. No human clinical data available to validate antigen overlap against clinical response (B-003). All outputs are mechanistic hypotheses only.]" |
| **activation_conditions** | SLICE-003 receipt extension must be in place; SC-001 flag must be enforced in receipt; HT29 data must be explicitly excluded from all outputs. |
| **special_attention** | SC-001 is the primary constraint. HCT116 and LoVo are SC-001-safe (both KRAS G13D, consistent with BRAF WT trial eligibility). Any output must carry `"ht29_excluded": true, "reason": "SC-001 active — OQ-01 not resolved"` in receipt. |

---

## CAPABILITY 15 — DTH Response Modeling

| Field | Value |
|-------|-------|
| **capability_name** | DTH (delayed-type hypersensitivity) response modeling |
| **decision** | **BLOCK** |
| **evidence_basis** | No code exists (ABSENT — repo_census.md); DTH monitoring protocol VERIFIED (BreAK CRC-001 Phase I: DTH at 1/24/48/72h post-injection — NCT06934538); human clinical DTH data BLOCKED (B-003 — n=6/DTH response data from AACR 2026 CT051 not retrieved); cannot produce meaningful output without human DTH response data |
| **code_owner** | ABSENT — no code path |
| **blocker_linkage** | B-003 (human clinical DTH data — hard gate); B-005 (ASCO 2024 abstract blocked) |
| **output_qualification** | N/A — BLOCK |
| **resolution_path** | B-003 must resolve (direct retrieval of AACR 2026 CT051; or Brenus data room under NDA/CDA; or peer-reviewed publication). Then build code module. |
| **special_attention** | DTH monitoring protocol is verified and can be used for framework design (Capability 14 biomarker framework). DTH response data is hard-gated. Do not use n=6/DTH response data from press releases as inputs under any circumstances. |

---

## CAPABILITY 16 — Historical Control Benchmark Construction

*(See Capability 6 — same capability, listed separately in ownership matrix as Capability 16)*

| Field | Value |
|-------|-------|
| **capability_name** | Historical control benchmark construction |
| **decision** | **ACTIVATE NOW** |
| **evidence_basis** | crispro_module_requirements_brenus.csv: `historical_control_benchmark, available_now: yes, blocked_by: none`; all NCT03050814 inputs VERIFIED; BreAK CRC-001 Phase IIA endpoint VERIFIED; SLICE-002 in vertical slice queue |
| **code_owner** | ABSENT — build from scratch; all data inputs verified |
| **blocker_linkage** | none |
| **output_qualification** | "QUILT-2.004 (NCT03050814) was TERMINATED for futility (HR 1.061, p=0.91, n=30). Benchmark has high uncertainty (wide CI: 0.380–2.966). SOC arm (Arm A, PFS 8.8m) is the relevant comparator. QUILT-2.004 used avelumab (CPI) — mechanistically different from STC-1010. Benchmark is hypothesis-generating only." |
| **special_attention** | Guardrail 6 (no QUILT-2.004 as positive efficacy precedent) must be enforced. |

---

## CAPABILITY 17 — MSI-H vs MSS Arm Differentiation

| Field | Value |
|-------|-------|
| **capability_name** | MSI-H vs MSS arm differentiation analysis |
| **decision** | **ACTIVATE NOW** |
| **evidence_basis** | crispro_module_requirements_brenus.csv: `msi_h_vs_mss_arm_differentiation, available_now: yes, blocked_by: none, confidence_of_output: high`; BreAK CRC-001 three-arm structure VERIFIED; QUILT-2.004 MSI-H exclusion VERIFIED; no CPI in treatment regimen VERIFIED (ASCO 2024 TPS3635) |
| **code_owner** | ABSENT — build from scratch; all data inputs verified |
| **blocker_linkage** | none |
| **output_qualification** | "MSS/pMMR CRC (~95% of mCRC) is biologically distinct from MSI-H CRC. Checkpoint immunotherapy has demonstrated benefit in MSI-H/dMMR CRC only. MSS CRC has been uniformly resistant to checkpoint blockade (ORR 0% in CheckMate 142 MSS cohort). BreAK CRC-001 correctly separates MSS (Arm 2A-1) and MSI-H (Arm 2A-2) into distinct arms. Do not conflate MSS and MSI-H IO data. No human clinical data for STC-1010 in either arm is available (B-003)." |
| **special_attention** | Guardrail 7 (no conflation of MSI-H and MSS IO data) must be enforced. No-CPI constraint: BreAK CRC-001 has no CPI in treatment regimen — IO axis in patient vector reflects tumor immune microenvironment only. |

---

## SPECIAL ATTENTION SUMMARY

### SC-001 HT29/BRAF V600E
Any capability touching vaccine cell line composition (Capabilities 5, 14) must carry the SC-001 qualification text. HT29-specific antigen modeling is BLOCKED. HCT116 and LoVo are SC-001-safe. No capability may assert the conflict is resolved or inconsequential.

### B-003 Human Clinical Data
Any capability that would use n=6/DCR/DTH as inputs is BLOCKED (Capabilities 15, 7 partially). No press-release or unverified abstract data may enter the engine. Hard gate — no workaround.

### B-004 Bevacizumab Arm Assignment
Any capability requiring arm-level bevacizumab assignment (Capability 7 partially) must carry PROVISIONAL flag. "With or without" framing is verified; arm-level assignment is not.

### No-CPI Constraint
Any capability using the IO axis must clarify: IO axis reflects tumor immune microenvironment, NOT CPI treatment. BreAK CRC-001 has no checkpoint inhibitor in the treatment regimen (ASCO 2024 TPS3635 VERIFIED). QUILT-2.004 used avelumab — must not be conflated with BreAK CRC-001 regimen.

### Murine Surrogate Caveat
Any capability using Alzeeb 2024 data (Capabilities 14, 16, 17) must carry: "Alzeeb 2024 uses a murine surrogate vaccine, not the clinical STC-1010 product. Authors explicitly state human translation is unvalidated." This caveat must be preserved verbatim.

### Formula Conflict (CT-01/CT-02)
Any capability using mechanism_fit scores in user-visible output (Capability 1, 2) must carry formula-version qualifier until PATH A/B decision is recorded. Do not compare PATH A scores to Figure 2 DDR mean (0.983) — that value was computed under PATH B and is impossible under PATH A.

---

*End of brenus_activation_decisions.md — 2026-04-28*
*Brenus Adjudication Agent*
