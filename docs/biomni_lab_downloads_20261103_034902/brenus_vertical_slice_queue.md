# Brenus Vertical Slice Queue — First 5 Implementation Slices
**Prepared by:** CrisPRO Capability Cartographer
**Date:** 2026-04-28
**Evidence basis:** crispro_module_requirements_brenus.csv (available_now column); crispro_fitgap_brenus_verified_only.md (§3 executable now); brenus_canon_v2_freeze.md (verified inputs); brenus_final_blockers_registry.md (blocker status); VC-01 through VC-15; CT-01 through CT-06; receipt_preflight.py source
**Ordering principle:** Slices are ordered by (1) data availability (verified inputs only), (2) code touchpoints that exist in evidence, (3) absence of hard blockers, (4) scientific value for Brenus. No slice is ordered based on what would be ideal — only on what is actually available in code and data.

---

## SLICE 1 — Brenus Patient Vector Construction + MoA Ranking

**slice_id:** SLICE-001

**user_story:**
As a CrisPRO analyst supporting Brenus, I want to construct a patient vector for the BreAK CRC-001 eligible population (KRAS-mutated, BRAF wild-type, MSS/pMMR, IO-naive) and run it through MechanismFitRanker against the 609-trial registry, so that I can identify which trials in the registry are mechanistically most similar to BreAK CRC-001 and generate a ranked comparator list.

**code_touchpoints:**
- `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py` — CONFIRMED_CODE_PRESENT (VC-01, VC-02); MechanismFitRanker.rank_trials(), PATHWAYS_8D axis list
- `oncology-coPilot/oncology-backend-minimal/api/services/mechanism_fit_ranker.py` — INFERRED_PRESENT (receipt_preflight.py import); production instance
- `oncology-coPilot/oncology-backend-minimal/api/resources/trial_moa_vectors.json` — TRADE_SECRET (VC-13); required input
- `publications/02-trial-matching/scripts/receipt_preflight.py` — CONFIRMED_CODE_PRESENT (direct read); receipt generation pattern to follow

**test_path:**
- `publications/02-trial-matching/artifacts/receipt_preflight.json` — CONFIRMED_CODE_PRESENT; execution receipt from 2026-04-15 run (609 trials, DDR mean 0.8210, non-DDR mean 0.0355) — use as baseline for comparison
- `publications/02-trial-matching/artifacts/RECEIPT_MANIFEST.json` — CONFIRMED_CODE_PRESENT; sha256 provenance chain

**blocker_status:**
- PARTIAL BLOCKER: `trial_moa_vectors.json` is TRADE_SECRET (VC-13) — required for full-registry run; internal authorization required
- NO BLOCKER on code: MechanismFitRanker code is confirmed present; receipt pattern is confirmed
- FORMULA NOTE: PATH A formula (VC-02) is confirmed in crispro-backend-v3; production receipt uses oncology-coPilot path — confirm these are the same version before running
- FORMULA CONFLICT: CT-01/CT-02 formula conflict is unresolved; PATH A ceiling is 0.8898 for p_ref; Brenus patient vector will have a different ceiling depending on axis weights

**rollback_risk:** LOW
- MechanismFitRanker code is confirmed present and has run successfully (receipt 2026-04-15)
- Patient vector construction is additive — does not modify any existing code
- Receipt output is a new file; does not overwrite existing artifacts
- Rollback = delete the new receipt file

**rationale for ordering:**
This is the foundational capability. All other Brenus slices depend on knowing which trials in the registry are mechanistically similar to BreAK CRC-001. The code exists (VC-01, VC-02), the receipt pattern exists (receipt_preflight.py), and the only blocker is internal authorization for trial_moa_vectors.json. This slice has the lowest rollback risk and the highest downstream leverage.

---

## SLICE 2 — Historical Control Benchmark for Phase IIA Primary Endpoint

**slice_id:** SLICE-002

**user_story:**
As a CrisPRO analyst supporting Brenus, I want to build a historical control benchmark for the BreAK CRC-001 Phase IIA primary endpoint (12-month PFS rate, RECIST 1.1) using verified comparator trial data (NCT03050814 QUILT-2.004: Arm A PFS 8.8m, HR 1.061, p=0.91, n=30, MSS/pMMR), so that Brenus can frame what 12-month PFS rate BreAK CRC-001 must achieve to be interpretable as exceeding SOC activity.

**code_touchpoints:**
- No existing code module — this is a build-from-scratch analysis using verified data inputs
- Data inputs are CONFIRMED_VERIFIED in brenus_canon_v2_freeze.md Part II:
  - NCT03050814 Arm A PFS: 8.8m (95% CI 3.3–17.0m)
  - NCT03050814 HR: 1.061 (95% CI 0.380–2.966), p=0.91
  - NCT03050814 n=30 enrolled (10 Arm A, 16 Arm B)
  - BreAK CRC-001 Phase IIA: PFS rate at 12 months, RECIST 1.1, ~57–60 patients
- ABSENT: no existing comparator_analysis module in any VC or CT

**test_path:** ABSENT — no existing test file; new receipt file to be created following receipt_preflight.py pattern

**blocker_status:**
- NO BLOCKER on data: all NCT03050814 inputs are VERIFIED (brenus_canon_v2_freeze.md Part II)
- NO BLOCKER on BreAK CRC-001 endpoint: VERIFIED (NCT06934538)
- CAVEAT: QUILT-2.004 was terminated at n=30 vs. target n=70; wide CI (0.380–2.966) means benchmark has high uncertainty; must be disclosed
- CAVEAT: QUILT-2.004 used Ad-CEA + avelumab (ICI) — mechanistically different from STC-1010; SOC arm (Arm A) is the relevant comparator, not the experimental arm
- CAVEAT: Power calculations require an assumed effect size for STC-1010 — this cannot be derived from verified inputs alone (B-003 blocks STC-1010 clinical data)

**rollback_risk:** LOW
- Analysis is additive (new output file); does not modify any existing code or data
- All inputs are verified; no trade-secret data required
- Rollback = delete the output file

**rationale for ordering:**
This slice uses only verified data (no trade secrets, no blocked inputs) and produces the most immediately actionable output for Brenus: the minimum PFS rate BreAK CRC-001 must achieve. It is ordered second because it requires no code dependencies from SLICE-001 and can run in parallel. The data is fully available now.

---

## SLICE 3 — Brenus-Specific Receipt Extension (Blocker Flags + SC-001 + Guardrails)

**slice_id:** SLICE-003

**user_story:**
As a CrisPRO engineer, I want to extend the existing receipt_preflight.py provenance infrastructure to add Brenus-specific fields — blocker flags (B-003, B-004, SC-001), VERIFIED/BLOCKED claim provenance tags, formula version (PATH A vs PATH B), and guardrail compliance markers — so that every Brenus-facing output carries a machine-readable provenance record that prevents blocked inputs from leaking into user-visible output.

**code_touchpoints:**
- `publications/02-trial-matching/scripts/receipt_preflight.py` — CONFIRMED_CODE_PRESENT (direct read); base receipt pattern to extend
- `publications/02-trial-matching/artifacts/RECEIPT_MANIFEST.json` — CONFIRMED_CODE_PRESENT; manifest pattern to extend
- New file to create: `publications/02-trial-matching/scripts/receipt_brenus.py` — ABSENT (does not exist; build from receipt_preflight.py pattern)
- brenus_final_blockers_registry.md — source of blocker definitions (B-001 through B-006, SC-001)
- brenus_canon_v2_freeze.md Part VII — source of engine_routable claim table (44 claims)

**test_path:** ABSENT — no existing test file; new receipt file to be created

**blocker_status:**
- NO BLOCKER: receipt_preflight.py pattern is confirmed; extension is additive
- FORMULA CONFLICT NOTE: receipt must record which formula version (PATH A or PATH B) was used; CT-01/CT-02 formula conflict means this field cannot be auto-populated until manager decision (BLOCKER-02); receipt should record "FORMULA_VERSION: QUARANTINED — CT-01/CT-02 pending manager decision" until resolved
- SC-001 NOTE: receipt must include `"sc_001_ht29_braf_conflict": "ACTIVE — HT29 BRAF V600E vs BRAF WT eligibility; not resolved"` in every Brenus receipt

**rollback_risk:** LOW
- Extension is additive; does not modify existing receipt_preflight.py
- New file receipt_brenus.py; rollback = delete new file
- Existing receipt infrastructure is unaffected

**rationale for ordering:**
This slice is ordered third because it is a prerequisite for all subsequent Brenus outputs to be provenance-safe. Without Brenus-specific receipt fields, SLICE-001 and SLICE-002 outputs lack the blocker flags and SC-001 markers required for safe Brenus engagement. It is ordered after SLICE-001 and SLICE-002 because those slices establish what fields the receipt needs to capture.

---

## SLICE 4 — KRAS/BRAF Molecular Context + MSI-H vs MSS Arm Differentiation

**slice_id:** SLICE-004

**user_story:**
As a CrisPRO analyst supporting Brenus, I want to characterize the expected immunological landscape of the BreAK CRC-001 eligible population (KRAS-mutated, BRAF wild-type, MSS/pMMR) and produce an arm-specific differentiation report (Arm 2A-1 MSS vs Arm 2A-2 MSI-H post-ICI), so that Brenus can understand the distinct immunological contexts of each arm and design arm-specific biomarker hypotheses.

**code_touchpoints:**
- No existing code module — build-from-scratch analysis using verified data inputs
- Data inputs CONFIRMED_VERIFIED in brenus_canon_v2_freeze.md:
  - BreAK CRC-001 three-arm structure (Part I §1.2)
  - KRAS mutated + BRAF WT eligibility (Part I §1.5)
  - Prior IO exclusion for Arm 2A-1; allowed for Arm 2A-2 (Part I §1.5)
  - No CPI in treatment regimen (DIFF-012, ASCO 2024 TPS3635)
  - QUILT-2.004 MSI-H exclusion (Part II §2.4)
- crispro_module_requirements_brenus.csv: `msi_h_vs_mss_arm_differentiation, available_now: yes, confidence_of_output: high`
- crispro_module_requirements_brenus.csv: `kras_braf_molecular_context_modeling, available_now: yes, confidence_of_output: medium`

**test_path:** ABSENT — no existing test file; output to be receipted following SLICE-003 pattern

**blocker_status:**
- NO BLOCKER on data: all arm structure and eligibility inputs are VERIFIED
- SC-001 PARTIAL BLOCKER: HT29 antigen modeling is blocked (OQ-01); but arm differentiation analysis does not require HT29 antigen data — it uses trial structure and published literature
- B-003 NOTE: no human clinical data for STC-1010 in either arm; all mechanistic claims are from published literature and murine data (Alzeeb 2024)
- GUARDRAIL: must not conflate MSI-H and MSS IO data (Guardrail 7 in crispro_fitgap_brenus_verified_only.md §8)

**rollback_risk:** LOW
- Analysis is additive; no existing code modified
- All inputs are verified; no trade-secret data required
- Rollback = delete output file

**rationale for ordering:**
This slice is ordered fourth because it uses only verified data and produces high-confidence output (crispro_module_requirements_brenus.csv: confidence_of_output: high for MSI-H vs MSS differentiation). It is a prerequisite for SLICE-005 (biomarker framework), which requires the arm-specific context established here.

---

## SLICE 5 — HCT116 + LoVo Antigen Mapping (SC-001-Safe, OQ-01-Gated for HT29)

**slice_id:** SLICE-005

**user_story:**
As a CrisPRO analyst supporting Brenus, I want to map the antigen repertoire of the two SC-001-safe STC-1010 human cell lines (HCT116 and LoVo) using public proteomics datasets (TCGA/CPTAC), assess KRAS mutation concordance between vaccine lines and trial eligibility, and produce a patient-tumor antigen overlap analysis for BRAF WT/KRAS mutated MSS mCRC — explicitly excluding HT29 until OQ-01 resolves — so that Brenus has a foundational CDx biomarker analysis for two of three confirmed vaccine lines.

**code_touchpoints:**
- No existing code module — build-from-scratch analysis using verified data inputs
- Data inputs CONFIRMED_VERIFIED:
  - HCT116 confirmed in STC-1010 (ASCO 2023 e14661, brenus_canon_v2_freeze.md X-001)
  - LoVo confirmed in STC-1010 (ASCO 2023 e14661, brenus_canon_v2_freeze.md X-001)
  - HCT116 KRAS G13D (published cell line biology)
  - LoVo KRAS G13D (published cell line biology)
  - TCGA/CPTAC public proteomics datasets (external, publicly available)
- crispro_module_requirements_brenus.csv: `hct116_lovo_antigen_mapping, available_now: yes, confidence_of_output: medium`
- HT29 antigen mapping: `ht29_antigen_mapping, available_now: no, blocked_by: OQ-01` — EXCLUDED from this slice

**test_path:** ABSENT — no existing test file; output to be receipted following SLICE-003 pattern with explicit SC-001 flag

**blocker_status:**
- NO BLOCKER for HCT116 + LoVo: both confirmed in STC-1010 (VERIFIED); both KRAS G13D (consistent with trial eligibility); public proteomics available
- SC-001 HARD GATE: HT29 is explicitly excluded from this slice; any output must carry `"ht29_excluded": true, "reason": "SC-001 active — OQ-01 not resolved"` in receipt
- B-003 NOTE: no human clinical data to validate antigen overlap against clinical response; output is mechanistic hypothesis only
- CAVEAT: public proteomics (TCGA/CPTAC) may not match actual STC-1010 antigen repertoire; Brenus mass spectrometry data would be required for definitive characterization

**rollback_risk:** MEDIUM
- Requires external data access (TCGA/CPTAC APIs); network dependency
- HT29 exclusion must be enforced in code — if HT29 data is accidentally included, SC-001 conflict is violated
- Rollback = delete output file; no existing code modified

**rationale for ordering:**
This slice is ordered fifth because it requires SLICE-003 (receipt extension with SC-001 flag) to be in place before it can produce a provenance-safe output. It is the first slice that touches the vaccine biology directly. HCT116 and LoVo are SC-001-safe (both KRAS G13D, consistent with BRAF WT trial eligibility). HT29 is explicitly excluded. This ordering ensures the SC-001 guardrail is enforced before any antigen analysis runs.

---

## SLICES NOT IN QUEUE (BLOCKED OR ABSENT)

| Capability | Reason not in queue |
|------------|---------------------|
| DTH response modeling | B-003 (human clinical data blocked); no code exists |
| Bevacizumab arm-specific combination model | B-004 (arm assignment provisional); no code exists |
| Full vaccine antigen concordance (all 3 lines) | OQ-01 (HT29 BRAF conflict unresolved); blocked |
| Human clinical signal analysis | B-003 (hard gate — all human STC-1010 data blocked) |
| Sponsor Q&A generation | No code exists; requires SLICE-003 receipt extension first |
| Blocker registry enforcement (runtime) | No code exists; requires architecture decision |
| Engine-safe routing layer | No code exists; requires architecture decision |

---

*End of brenus_vertical_slice_queue.md — 2026-04-28*
*CrisPRO Capability Cartographer*
*Evidence basis: crispro_module_requirements_brenus.csv, crispro_fitgap_brenus_verified_only.md, VC-01 through VC-15, receipt_preflight.py, brenus_canon_v2_freeze.md, brenus_final_blockers_registry.md*
