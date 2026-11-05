# Brenus Risk Register
**Authority:** Brenus Adjudication Agent
**Version:** 1.0
**Date:** 2026-04-28
**Evidence basis:** repo_census.md, brenus_capability_ownership_matrix.md, brenus_final_blockers_registry.md (v1.1-FINAL), brenus_canon_v2_freeze.md (v2.1-FREEZE), receipts_and_guardrails_gap_report.md, formula_decision_onepager.md, crispro_fitgap_brenus_verified_only.md, crispro_blocked_inputs_registry.md
**Hard rule:** Risks are derived from source files only. No speculation. If a risk is not grounded in a specific source finding, it is not in this register.

---

## RISK RATING SCALE

| Likelihood | Meaning |
|------------|---------|
| high | Will occur without active intervention |
| medium | May occur; requires monitoring |
| low | Unlikely given current controls |

| Impact | Meaning |
|--------|---------|
| high | Materially affects Brenus engagement, publication, or partner credibility |
| medium | Requires rework; does not materially affect engagement |
| low | Minor; easily corrected |

---

## CATEGORY 1: TECHNICAL RISKS

---

### TR-001 — Formula Conflict (CT-01/CT-02) Blocks Production Ranking Output

| Field | Value |
|-------|-------|
| **risk_id** | TR-001 |
| **category** | Technical |
| **description** | Two formula implementations coexist in the codebase: PATH A (MechanismFitRanker, `mechanism_fit_ranker.py`, fit = clip((p·t)/‖t‖₂, 0, 1), ceiling 0.8898 for p_ref) and PATH B (HolisticScoreService, `holistic_score/mechanism_fit.py`, cosine similarity, ceiling 1.0). The manager formula decision (BLOCKER-02) has not been recorded. Until it is, all mechanism_fit scores in user-visible output must carry a quarantine qualifier. The Figure 2 DDR mean (0.983) is mathematically impossible under PATH A — this is a separate publication-blocking discrepancy that must be resolved regardless of PATH A/B decision. |
| **likelihood** | high |
| **impact** | high |
| **current_mitigation** | CT-01/CT-02 documented in 8d_contradictions_and_missing_artifacts.md; formula_decision_onepager.md prepared for manager; quarantine labels applied to formula-dependent claims; PATH A confirmed as recommended formula |
| **residual_risk** | Until manager records decision: all mechanism_fit scores in user-visible output carry quarantine qualifier; Figure 2 cannot be finalized; manuscript cannot be submitted; holistic score cannot be activated for Brenus |
| **owner** | code |
| **resolution_path** | Manager records PATH A/B decision; engineering identifies script used to generate Figure 2; Figure 2 recomputed under authoritative formula |

---

### TR-002 — Production Ranker Path Boundary (crispro-backend-v3 vs oncology-coPilot)

| Field | Value |
|-------|-------|
| **risk_id** | TR-002 |
| **category** | Technical |
| **description** | The production MechanismFitRanker is INFERRED_PRESENT at `oncology-coPilot/oncology-backend-minimal/api/services/mechanism_fit_ranker.py` (from receipt_preflight.py imports) but was NOT directly read in the prior session. The confirmed code is at `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py`. These may be different versions. If the production instance uses a different formula version, axis set, or bug-fix state than the confirmed code, ranking outputs will differ from what the confirmed code predicts. |
| **likelihood** | medium |
| **impact** | high |
| **current_mitigation** | Repo boundary preserved in repo_census.md; INFERRED_PRESENT status documented; receipt_preflight.json confirms production run (2026-04-15, 609 trials) |
| **residual_risk** | Cannot confirm production formula version without direct read of oncology-coPilot path. Any Brenus ranking output must note: "Production instance INFERRED_PRESENT — formula version not directly confirmed; may differ from crispro-backend-v3 confirmed code." |
| **owner** | code |
| **resolution_path** | Direct read of `oncology-coPilot/oncology-backend-minimal/api/services/mechanism_fit_ranker.py` to confirm formula version and axis set match crispro-backend-v3 |

---

### TR-003 — Trade Secret Access Required for Core Ranking Capability

| Field | Value |
|-------|-------|
| **risk_id** | TR-003 |
| **category** | Technical |
| **description** | `trial_moa_vectors.json` (609-trial NCT-keyed MoA registry) and `TAG_VECTORS` (MoA tag → axis weight mapping) are classified as trade secrets (VC-13). Both are required for MechanismFitRanker to run against the full registry. Internal authorization is required for access. If authorization is not granted or is delayed, the core trial ranking capability (ISG-001) cannot ship. |
| **likelihood** | low |
| **impact** | high |
| **current_mitigation** | receipt_preflight.json confirms trade-secret data was accessible for the 2026-04-15 run (sha256 confirmed in RECEIPT_MANIFEST.json); internal authorization process exists |
| **residual_risk** | Authorization must be re-confirmed for each Brenus-specific run. Any output using trade-secret data must carry TRADE_SECRET provenance tag in receipt. External exposure of trial_moa_vectors.json or TAG_VECTORS would be a trade secret breach. |
| **owner** | code |
| **resolution_path** | Confirm internal authorization for Brenus-specific run; ensure receipt_brenus.py records TRADE_SECRET provenance tag |

---

### TR-004 — retroactive_prediction_run.py Absent from Repos

| Field | Value |
|-------|-------|
| **risk_id** | TR-004 |
| **category** | Technical |
| **description** | `retroactive_prediction_run.py` is CONFIRMED_ABSENT from both crispro-backend-v3 and crispro repos (VC-14). A reconstructed copy exists at `/mnt/results/8D_audit/retroactive_prediction_run.py` but uses approximate trial vectors (trade secret not available). This means the 8D patent validation deltas cannot be reproduced from the repos as they stand. This is not directly Brenus-relevant but affects the patent filing timeline. |
| **likelihood** | high |
| **impact** | medium |
| **current_mitigation** | Reconstructed copy exists; CONFIRMED_ABSENT status documented in repo_census.md; patent validation is separate from Brenus engagement |
| **residual_risk** | Patent validation deltas (LATIFY_DELTA, NCT02264678_DELTA) cannot be reproduced without trade-secret trial vectors. This is a patent filing blocker, not a Brenus engagement blocker. |
| **owner** | code |
| **resolution_path** | Commit reconstructed script to repo; obtain trade-secret access for delta reproduction; resolve BLOCKER-07 |

---

### TR-005 — Missing Brenus-Specific Receipt Infrastructure (SLICE-003 Not Built)

| Field | Value |
|-------|-------|
| **risk_id** | TR-005 |
| **category** | Technical |
| **description** | receipt_brenus.py (SLICE-003) does not exist. The current receipt_preflight.py lacks all Brenus-specific fields: blocker flags (B-003, B-004, SC-001), formula version, guardrail compliance markers, VERIFIED/BLOCKED claim provenance tags. Without SLICE-003, no Brenus-facing output is provenance-safe. All provenance is currently human-mediated. |
| **likelihood** | high |
| **impact** | high |
| **current_mitigation** | receipts_and_guardrails_gap_report.md documents all missing fields; SLICE-003 defined in vertical slice queue; receipt_preflight.py pattern available as base |
| **residual_risk** | Until SLICE-003 ships, blocked inputs (n=6, DCR, DTH data) can enter the engine through human error. SC-001 conflict may not be flagged in outputs. Formula version may not be recorded. |
| **owner** | code |
| **resolution_path** | Build receipt_brenus.py following receipt_preflight.py pattern; add all fields documented in receipts_and_guardrails_gap_report.md §2; deploy before any Brenus-facing output |

---

### TR-006 — pgx_safety and resistance_risk Input Sources Undefined for Brenus

| Field | Value |
|-------|-------|
| **risk_id** | TR-006 |
| **category** | Technical |
| **description** | The holistic score 4-component blend (mechanism_fit 0.4, eligibility 0.3, pgx_safety 0.15, resistance_risk 0.15) is confirmed in models.py (VC-15). However, the upstream data sources for pgx_safety and resistance_risk inputs for a Brenus patient are not documented in any VC or CT. These components are confirmed in code but their input sources are INFERRED. Without defined input sources, the holistic score cannot be computed for a Brenus patient. |
| **likelihood** | medium |
| **impact** | medium |
| **current_mitigation** | Holistic score is HOLD (DEF-001) until formula decision and input sources are defined; CT-06 documents the 2-component vs 4-component conflict |
| **residual_risk** | Holistic score cannot be activated for Brenus until pgx_safety and resistance_risk input sources are defined and verified |
| **owner** | code |
| **resolution_path** | Define pgx_safety and resistance_risk input sources for Brenus patient (mFOLFOX6 toxicity profile, KRAS-driven resistance mechanisms); document in canon; re-evaluate holistic score activation |

---

## CATEGORY 2: SCIENTIFIC RISKS

---

### SR-001 — SC-001 HT29/BRAF V600E Active Scientific Conflict

| Field | Value |
|-------|-------|
| **risk_id** | SR-001 |
| **category** | Scientific |
| **description** | HT29 carries BRAF V600E (established cell line biology). HT29 is confirmed as one of three human cell lines in the clinical STC-1010 vaccine (ASCO 2023 e14661 VERIFIED). BreAK CRC-001 Exclusion Criterion #7 requires BRAF wild-type patients (NCT06934538 VERIFIED). The vaccine contains a BRAF V600E-mutant cell line while the trial exclusively enrolls BRAF wild-type patients. The scientific rationale for this design choice is not disclosed in any retrieved source. This is an ACTIVE SCIENTIFIC CONFLICT with no runtime enforcement currently. |
| **likelihood** | high |
| **impact** | high |
| **current_mitigation** | SC-001 documented in brenus_canon_v2_freeze.md Hard Stop #10 and brenus_final_blockers_registry.md; HT29 antigen modeling excluded from all outputs (SLICE-005 explicitly excludes HT29); SC-001 qualification text defined |
| **residual_risk** | No runtime enforcement of SC-001 flag. If any output includes HT29 antigen data without the SC-001 flag, the conflict may be presented to Brenus as resolved when it is not. This could damage scientific credibility and misrepresent the vaccine's antigen composition. |
| **owner** | science |
| **resolution_path** | (1) Build runtime SC-001 enforcement in receipt_brenus.py (SLICE-003); (2) Obtain additional data from Brenus addressing HT29 BRAF V600E design rationale (B-006); (3) OQ-01 resolution required before HT29 antigen modeling can proceed |

---

### SR-002 — Murine-to-Human Translation Gap

| Field | Value |
|-------|-------|
| **risk_id** | SR-002 |
| **category** | Scientific |
| **description** | The only published preclinical data for the STC platform (Alzeeb 2024) uses a murine surrogate vaccine in syngeneic mouse models. The authors explicitly state human translation is unvalidated. CT26 has higher mutational burden than human MSS CRC. MC38 is an MSI-H analog in mice — not MSS. Neither model recapitulates liver metastasis-induced systemic immune tolerance, TGF-β-driven T-cell exclusion in human stroma, or KRAS-IRF2-MDSC axis in human tumors. The history of MSS CRC IO is replete with mechanistically rational preclinical hypotheses that failed completely in human trials (MEK inhibition in IMblaze370; TGF-β inhibition in multiple trials). |
| **likelihood** | high |
| **impact** | high |
| **current_mitigation** | Murine surrogate caveat documented in brenus_canon_v2_freeze.md Part III §3.1; authors' caveat preserved verbatim; Guardrail 3 (no murine data as human efficacy evidence) defined; all Alzeeb 2024 outputs tagged as murine scope only |
| **residual_risk** | If murine data is presented without the scope limitation, Brenus or external stakeholders may overestimate the translational evidence base. The gap between murine syngeneic models and human MSS CRC is a biological problem that cannot be closed computationally. |
| **owner** | science |
| **resolution_path** | Enforce murine_surrogate_caveat gate in all outputs; require authors' caveat verbatim in every output using Alzeeb 2024 data; do not present murine data as human efficacy evidence |

---

### SR-003 — No Human Efficacy Data for STC-1010

| Field | Value |
|-------|-------|
| **risk_id** | SR-003 |
| **category** | Scientific |
| **description** | All human clinical efficacy and safety data for STC-1010 is BLOCKED (B-003). BreAK CRC-001 started 2025-06-17; hasResults=false. No peer-reviewed clinical publication exists. All press-release/abstract sources (BusinessWire, BioSpace, AACR 2026 CT051) failed retrieval. CrisPRO cannot validate any mechanistic hypothesis against human clinical outcomes. All biomarker frameworks, combination timing hypotheses, and antigen mapping outputs are mechanistic hypotheses only — none are validated in STC-1010-treated patients. |
| **likelihood** | high |
| **impact** | high |
| **current_mitigation** | B-003 documented as hard gate in brenus_final_blockers_registry.md; Guardrail 2 (no human clinical data as inputs) defined; all outputs carry "no human clinical data available" qualification |
| **residual_risk** | CrisPRO's Brenus outputs are entirely hypothesis-generating until B-003 resolves. If Brenus or external stakeholders interpret CrisPRO outputs as validated against human data, this is a scientific misrepresentation. |
| **owner** | science |
| **resolution_path** | B-003 resolution (AACR 2026 CT051 direct retrieval; or Brenus data room under NDA/CDA; or peer-reviewed publication). Until then, all outputs must carry explicit "no human clinical data available" qualification. |

---

### SR-004 — Non-Randomized Trial Design Limits Attribution

| Field | Value |
|-------|-------|
| **risk_id** | SR-004 |
| **category** | Scientific |
| **description** | BreAK CRC-001 is non-randomized (single-arm per cohort). Without a concurrent randomized control arm, any observed clinical benefit cannot be causally attributed to STC-1010 vs. mFOLFOX6 ± bevacizumab. mFOLFOX6 ± bevacizumab achieves ~80–90% DCR and ~50–55% 12-month PFS in 1L MSS mCRC (QUILT-2.004 Arm A: PFS 8.8m). CrisPRO can build historical control benchmarks but cannot substitute for randomization. |
| **likelihood** | high |
| **impact** | medium |
| **current_mitigation** | Attribution gap documented in crispro_fitgap_brenus_verified_only.md §7.1; historical control benchmark (IS-001) framed as hypothesis-generating only; causal attribution permanently out of scope (POOS-002) |
| **residual_risk** | If CrisPRO benchmark outputs are presented as causal evidence of STC-1010 activity, this is a scientific misrepresentation. The benchmark comparison is not a randomized comparison. |
| **owner** | science |
| **resolution_path** | Enforce "hypothesis-generating only" framing in all benchmark outputs; do not present historical control comparison as causal attribution |

---

### SR-005 — QUILT-2.004 Negative Result as Cautionary Precedent

| Field | Value |
|-------|-------|
| **risk_id** | SR-005 |
| **category** | Scientific |
| **description** | QUILT-2.004 (NCT03050814) was terminated for futility at interim analysis (HR 1.061, p=0.91, n=30). It used Ad-CEA + avelumab (CPI) + mFOLFOX6 + bevacizumab in 1L MSS mCRC — the most directly analogous trial to BreAK CRC-001. The negative result is a cautionary precedent for vaccine + SOC combinations in unselected MSS mCRC. Prior agent canon (Agent 3) incorrectly framed this as a positive design precedent — this error has been corrected in Canon v2 (C-006). |
| **likelihood** | medium |
| **impact** | high |
| **current_mitigation** | C-006 correction documented in brenus_canon_v2_freeze.md Part V; Guardrail 6 (no QUILT-2.004 as positive efficacy precedent) defined; QUILT-2004-FRAMING gate in guardrail policy |
| **residual_risk** | If QUILT-2.004 is cited without disclosing the negative efficacy outcome, Brenus or external stakeholders may incorrectly interpret it as positive precedent. This would misrepresent the competitive landscape. |
| **owner** | science |
| **resolution_path** | Enforce QUILT-2004-FRAMING gate in all outputs; require negative framing disclosure whenever QUILT-2.004 is cited |

---

## CATEGORY 3: PROVENANCE RISKS

---

### PR-001 — Blocked-Source Leakage (B-003 Human Clinical Data)

| Field | Value |
|-------|-------|
| **risk_id** | PR-001 |
| **category** | Provenance |
| **description** | n=6, 100% DCR, and DTH response data originate exclusively from blocked sources (BusinessWire, BioSpace, AACR 2026 CT051). No runtime enforcement exists to prevent these data points from entering the engine through human error. If a user constructs a patient vector or validation benchmark using these blocked data points, the engine will process them without flagging their blocked status. The output will appear to be validated against human clinical data when it is not. |
| **likelihood** | medium |
| **impact** | high |
| **current_mitigation** | B-003 documented as hard gate in brenus_final_blockers_registry.md; Guardrail 2 defined; B-003 gate defined in guardrail policy; receipts_and_guardrails_gap_report.md §3.1 documents the leak scenario |
| **residual_risk** | No runtime enforcement. Protection is documentation-only until receipt_brenus.py (SLICE-003) and blocker registry enforcement module (Capability 4) are built. Human error can introduce blocked data. |
| **owner** | provenance |
| **resolution_path** | (1) Build receipt_brenus.py with B-003 runtime gate (SLICE-003); (2) Build blocker registry enforcement module (Capability 4); (3) Reject any input tagged as B-003 source with explicit error |

---

### PR-002 — SC-001 Conflict Not Flagged in Outputs (No Runtime Enforcement)

| Field | Value |
|-------|-------|
| **risk_id** | PR-002 |
| **category** | Provenance |
| **description** | SC-001 (HT29 BRAF V600E conflict) is documented in canon but no code enforces the conflict flag at runtime. Any antigen analysis module that includes HT29 data without flagging SC-001 implies the conflict is resolved when it is not. This could mislead Brenus about the vaccine's antigen composition and the scientific basis for the BRAF WT eligibility requirement. |
| **likelihood** | medium |
| **impact** | high |
| **current_mitigation** | SC-001 documented in brenus_canon_v2_freeze.md Hard Stop #10; SC-001 gate defined in guardrail policy; SLICE-005 explicitly excludes HT29; SC-001 qualification text defined |
| **residual_risk** | No runtime enforcement. If HT29 data is accidentally included in an antigen analysis, the SC-001 conflict may not be flagged. |
| **owner** | provenance |
| **resolution_path** | Build SC-001 runtime enforcement in receipt_brenus.py (SLICE-003); any antigen analysis module must check for HT29 data and inject SC-001 flag |

---

### PR-003 — Formula Version Not Recorded in Receipts

| Field | Value |
|-------|-------|
| **risk_id** | PR-003 |
| **category** | Provenance |
| **description** | The current receipt_preflight.py captures ranker constants (alpha=0.7, beta=0.3) but does NOT record which formula was used (PATH A vs PATH B). Given CT-01/CT-02, any mechanism_fit score in a receipt could have been computed under either formula. If a Brenus patient vector is scored under PATH A and the output is compared to Figure 2 DDR mean (0.983, computed under PATH B), the comparison is invalid. This comparison error cannot be detected from the current receipt format. |
| **likelihood** | high |
| **impact** | high |
| **current_mitigation** | CT-01/CT-02 documented; formula_decision_onepager.md prepared; formula_conflict gate defined in guardrail policy; quarantine labels applied to formula-dependent claims |
| **residual_risk** | Until receipt_brenus.py adds formula version field, every receipt is ambiguous about which formula was used. Invalid PATH A vs PATH B comparisons cannot be detected from receipt alone. |
| **owner** | provenance |
| **resolution_path** | Build receipt_brenus.py with formula_version field (SLICE-003); record "QUARANTINED — CT-01/CT-02 pending manager decision" until formula decision is recorded; then record authoritative formula |

---

### PR-004 — Receipt Infrastructure Lacks Guardrail Compliance Record

| Field | Value |
|-------|-------|
| **risk_id** | PR-004 |
| **category** | Provenance |
| **description** | The current receipt_preflight.py does not record which guardrails were checked and whether they passed. A Brenus-facing receipt must include a guardrail compliance block (G1–G7 from crispro_fitgap_brenus_verified_only.md §8). Without this record, there is no machine-readable evidence that guardrails were applied to any given output. |
| **likelihood** | high |
| **impact** | medium |
| **current_mitigation** | 7 guardrails defined in crispro_fitgap_brenus_verified_only.md §8; guardrail compliance block defined in receipts_and_guardrails_gap_report.md §2.4 |
| **residual_risk** | Until receipt_brenus.py adds guardrail compliance block, guardrail application is human-mediated and not machine-verifiable. |
| **owner** | provenance |
| **resolution_path** | Build receipt_brenus.py with guardrail_compliance block (SLICE-003); record pass/fail for each of G1–G7 in every Brenus receipt |

---

### PR-005 — receipt_preflight.py Ran on 609 Trials Without Brenus-Specific Fields

| Field | Value |
|-------|-------|
| **risk_id** | PR-005 |
| **category** | Provenance |
| **description** | receipt_preflight.py ran 2026-04-15 on 609 trials and generated receipt_preflight.json and RECEIPT_MANIFEST.json. These receipts lack all Brenus-specific fields (blocker flags, SC-001 flag, formula version, guardrail compliance). If these receipts are used as provenance for Brenus-facing outputs, they will appear to be complete provenance records when they are not. |
| **likelihood** | medium |
| **impact** | medium |
| **current_mitigation** | receipts_and_guardrails_gap_report.md §1 documents what the current receipt captures; §2 documents what is missing; SLICE-003 defined to address the gap |
| **residual_risk** | Existing receipts (receipt_preflight.json, RECEIPT_MANIFEST.json) must not be used as complete provenance for Brenus-facing outputs. They are valid for the 8D patent validation context only. |
| **owner** | provenance |
| **resolution_path** | Build receipt_brenus.py (SLICE-003); generate new Brenus-specific receipts for all Brenus-facing outputs; do not reuse existing receipt_preflight.json for Brenus provenance |

---

## CATEGORY 4: PARTNER-CREDIBILITY RISKS

---

### PCR-001 — Overstating Brenus Data Maturity

| Field | Value |
|-------|-------|
| **risk_id** | PCR-001 |
| **category** | Partner-credibility |
| **description** | CrisPRO's Brenus outputs are entirely hypothesis-generating until B-003 resolves. If outputs are presented to Brenus as validated analyses rather than mechanistic hypotheses, Brenus may make clinical or regulatory decisions based on unvalidated computational outputs. This would damage CrisPRO's credibility as a scientific partner and potentially harm the trial. The risk is highest for biomarker framework outputs (IS-004) and antigen mapping outputs (ISG-002), which are based on published literature and public proteomics — not on STC-1010-specific data. |
| **likelihood** | medium |
| **impact** | high |
| **current_mitigation** | All outputs carry "no human clinical data available" qualification; B-003 gate defined; crispro_fitgap_brenus_verified_only.md §7 documents gaps CrisPRO cannot close; "hypothesis-generating only" framing required |
| **residual_risk** | If qualification text is omitted from any output, Brenus may overestimate the evidence base. The risk is highest in informal communications (emails, presentations) where qualification text may be dropped. |
| **owner** | partner |
| **resolution_path** | Enforce qualification text in all Brenus-facing outputs; require receipt_brenus.py provenance record for all outputs; train CrisPRO team on distinction between hypothesis-generating and validated outputs |

---

### PCR-002 — CPI Misattribution to BreAK CRC-001 Regimen

| Field | Value |
|-------|-------|
| **risk_id** | PCR-002 |
| **category** | Partner-credibility |
| **description** | BreAK CRC-001 contains NO checkpoint inhibitor in the treatment regimen (ASCO 2024 TPS3635 VERIFIED). If any CrisPRO output describes the regimen as including a CPI, or implies STC-1010 has CPI-like activity based on IO axis scoring, this is factually incorrect. Presenting this to Brenus would demonstrate a fundamental misunderstanding of the trial design and damage credibility. The risk is elevated because QUILT-2.004 (the primary comparator) used avelumab (anti-PD-L1), and the IO axis in the patient vector could be misinterpreted as CPI activity. |
| **likelihood** | medium |
| **impact** | high |
| **current_mitigation** | DIFF-012 correction documented in brenus_canon_v2_freeze.md; Guardrail 1 (no CPI attribution) defined; no_cpi_constraint gate defined in guardrail policy; IO axis clarification required in all outputs using IO axis |
| **residual_risk** | If no_cpi_constraint gate is not enforced, CPI misattribution can occur in any output using the IO axis or citing QUILT-2.004. |
| **owner** | partner |
| **resolution_path** | Enforce no_cpi_constraint gate in all outputs; require IO axis clarification in every output using IO axis; require QUILT-2.004 negative framing in every citation |

---

### PCR-003 — DCR Overstatement (100% DCR from Blocked Source)

| Field | Value |
|-------|-------|
| **risk_id** | PCR-003 |
| **category** | Partner-credibility |
| **description** | The "100% DCR" figure for STC-1010 originates from blocked sources (BusinessWire, AACR 2026 CT051 — not retrieved). If this figure is presented to Brenus as a verified fact, it is a misrepresentation. mFOLFOX6 ± bevacizumab achieves ~80–90% DCR in 1L MSS mCRC (QUILT-2.004 Arm A). If the 100% DCR figure is from n=6 patients on mFOLFOX6 + STC-1010, it is not distinguishable from SOC activity at that sample size. Presenting it as evidence of STC-1010 activity would be scientifically misleading. |
| **likelihood** | medium |
| **impact** | high |
| **current_mitigation** | B-003 documented as hard gate; DIFF-010 correction in brenus_canon_v2_freeze.md explicitly names n=6/DCR/DTH as blocked-source data; Guardrail 2 defined; B-003 gate in guardrail policy |
| **residual_risk** | If B-003 gate is not enforced, the 100% DCR figure can enter outputs as a factual claim. Even if B-003 resolves, n=6 data has insufficient statistical power to distinguish STC-1010 activity from SOC activity. |
| **owner** | partner |
| **resolution_path** | Enforce B-003 gate in all outputs; require BLOCKED tag for any mention of 100% DCR; if B-003 resolves, frame n=6 DCR data with appropriate statistical caveats (insufficient power to distinguish from SOC) |

---

### PCR-004 — HT29/BRAF Conflict Presented as Resolved to Brenus

| Field | Value |
|-------|-------|
| **risk_id** | PCR-004 |
| **category** | Partner-credibility |
| **description** | SC-001 (HT29 BRAF V600E vs. BRAF WT eligibility) is an ACTIVE SCIENTIFIC CONFLICT. If any CrisPRO output presents this conflict as resolved, benign, or inconsequential without Brenus's own scientific rationale, it would misrepresent the state of knowledge and potentially embarrass CrisPRO in a scientific discussion with Brenus. Brenus may have a scientific rationale for including HT29 that is not publicly disclosed — but CrisPRO cannot assert that rationale without evidence. |
| **likelihood** | medium |
| **impact** | high |
| **current_mitigation** | SC-001 documented as ACTIVE CONFLICT; Guardrail 5 (no HT29 BRAF conflict as resolved) defined; SC-001 gate in guardrail policy; hard rule: do not speculate about resolution |
| **residual_risk** | If SC-001 gate is not enforced, any output discussing vaccine composition may present the conflict as resolved. This is the highest-credibility risk in the Brenus engagement. |
| **owner** | partner |
| **resolution_path** | Enforce SC-001 gate in all outputs; require SC-001 qualification text in every output discussing vaccine composition; obtain B-006 resolution from Brenus before any HT29-specific analysis |

---

### PCR-005 — "200+ Antigens" Presented as Verified Scientific Fact

| Field | Value |
|-------|-------|
| **risk_id** | PCR-005 |
| **category** | Partner-credibility |
| **description** | The "over 200 cancer-related proteins" claim appears only on the Brenus company website. It was incorrectly tagged as [VERIFIED] in prior Agent 5 canon (C-004, corrected in Canon v2). If this claim is presented to Brenus as an independently verified scientific finding, it would demonstrate that CrisPRO is repeating company marketing claims as scientific facts — damaging credibility as an independent scientific partner. |
| **likelihood** | low |
| **impact** | medium |
| **current_mitigation** | C-004 correction documented in brenus_canon_v2_freeze.md; Guardrail 4 (no "200+ antigens" as verified) defined; NO-200-ANTIGENS-VERIFIED rule in guardrail policy |
| **residual_risk** | Low — correction is well-documented. Risk is primarily in informal communications where the COMPANY_CLAIM tag may be dropped. |
| **owner** | partner |
| **resolution_path** | Enforce NO-200-ANTIGENS-VERIFIED rule in all outputs; require COMPANY_CLAIM tag for any mention of "200+ proteins" |

---

## RISK SUMMARY TABLE

| risk_id | category | likelihood | impact | owner | primary_blocker |
|---------|----------|------------|--------|-------|-----------------|
| TR-001 | Technical | high | high | code | CT-01/CT-02 (BLOCKER-02) |
| TR-002 | Technical | medium | high | code | INFERRED_PRESENT status |
| TR-003 | Technical | low | high | code | BLOCKER-07 (trade secret) |
| TR-004 | Technical | high | medium | code | VC-14 (CONFIRMED_ABSENT) |
| TR-005 | Technical | high | high | code | SLICE-003 not built |
| TR-006 | Technical | medium | medium | code | pgx_safety/resistance_risk undefined |
| SR-001 | Scientific | high | high | science | SC-001 (B-006) |
| SR-002 | Scientific | high | high | science | murine-to-human gap |
| SR-003 | Scientific | high | high | science | B-003 (hard gate) |
| SR-004 | Scientific | high | medium | science | non-randomized design |
| SR-005 | Scientific | medium | high | science | QUILT-2.004 negative result |
| PR-001 | Provenance | medium | high | provenance | B-003 no runtime enforcement |
| PR-002 | Provenance | medium | high | provenance | SC-001 no runtime enforcement |
| PR-003 | Provenance | high | high | provenance | formula version not in receipt |
| PR-004 | Provenance | high | medium | provenance | guardrail compliance not in receipt |
| PR-005 | Provenance | medium | medium | provenance | existing receipts lack Brenus fields |
| PCR-001 | Partner-credibility | medium | high | partner | data maturity overstated |
| PCR-002 | Partner-credibility | medium | high | partner | CPI misattribution |
| PCR-003 | Partner-credibility | medium | high | partner | DCR overstatement (B-003) |
| PCR-004 | Partner-credibility | medium | high | partner | SC-001 presented as resolved |
| PCR-005 | Partner-credibility | low | medium | partner | "200+ antigens" as verified |

---

## TOP 5 RISKS REQUIRING IMMEDIATE ACTION

1. **TR-001 / PR-003** — Formula conflict (CT-01/CT-02): manager must record PATH A/B decision; Figure 2 must be recomputed. Blocks manuscript, patent, and holistic score activation.

2. **TR-005 / PR-001 / PR-002 / PR-003 / PR-004** — SLICE-003 (receipt_brenus.py) not built: no Brenus-facing output is provenance-safe until this ships. Highest-priority engineering action.

3. **SR-001 / PCR-004** — SC-001 HT29/BRAF V600E: active scientific conflict with no runtime enforcement. Any output discussing vaccine composition must carry SC-001 flag. Obtain B-006 resolution from Brenus.

4. **SR-003 / PR-001 / PCR-003** — B-003 human clinical data: hard gate with no runtime enforcement. n=6/DCR/DTH data must not enter the engine. Build B-003 runtime gate in SLICE-003.

5. **PCR-002** — No-CPI constraint: BreAK CRC-001 has no CPI in treatment regimen. Any output using IO axis must carry clarification. Enforce no_cpi_constraint gate.

---

*End of brenus_risk_register.md — 2026-04-28*
*Brenus Adjudication Agent*
