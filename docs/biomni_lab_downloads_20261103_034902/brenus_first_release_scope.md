# Brenus First Release Scope
**Authority:** Brenus Adjudication Agent
**Version:** 1.0
**Date:** 2026-04-28
**Evidence basis:** brenus_capability_ownership_matrix.md, brenus_vertical_slice_queue.md, brenus_wrapper_vs_rebuild_table.csv, crispro_module_requirements_brenus.csv, crispro_fitgap_brenus_verified_only.md, brenus_canon_v2_freeze.md (v2.1-FREEZE), brenus_final_blockers_registry.md (v1.1-FINAL), receipts_and_guardrails_gap_report.md, formula_decision_onepager.md
**Hard rule:** Every row is binary — IN SCOPE or OUT OF SCOPE. No "maybe" rows. No "pending further review" rows. If something is not pinned, it is deferred or blocked.

---

## PREREQUISITE FOR ALL IN-SCOPE CAPABILITIES

**SLICE-003 (receipt_brenus.py) must ship before any Brenus-facing user output is released.**

SLICE-003 adds Brenus-specific provenance fields to the receipt infrastructure: blocker flags (B-003, B-004, SC-001), formula version (QUARANTINED — CT-01/CT-02), guardrail compliance markers (G1–G7), and VERIFIED/BLOCKED claim provenance tags. Without SLICE-003, all provenance is human-mediated and no Brenus-facing output is provenance-safe.

**Code path:** New file `publications/02-trial-matching/scripts/receipt_brenus.py` (ABSENT — build from scratch following receipt_preflight.py pattern).

---

## IN SCOPE NOW
*Capabilities that can ship with current code and verified inputs. No hard blockers. SLICE-003 prerequisite applies.*

---

### IS-001 — Historical Control Benchmark Construction

| Field | Value |
|-------|-------|
| **capability** | Historical control benchmark for BreAK CRC-001 Phase IIA primary endpoint (12-month PFS rate) |
| **rationale** | All data inputs VERIFIED: NCT03050814 HR 1.061 (0.380–2.966), p=0.91, Arm A PFS 8.8m, n=30, MSS/pMMR (brenus_canon_v2_freeze.md Part II); BreAK CRC-001 Phase IIA primary endpoint VERIFIED (NCT06934538); crispro_module_requirements_brenus.csv: `available_now: yes, blocked_by: none`; SLICE-002 in vertical slice queue |
| **code_path** | ABSENT — build from scratch; all data inputs verified; no trade-secret data required; rollback risk LOW |
| **blocker_or_none** | none |
| **mandatory_output_qualification** | "QUILT-2.004 (NCT03050814) was TERMINATED for futility (HR 1.061, p=0.91, n=30). Wide CI (0.380–2.966) reflects small sample. SOC arm (Arm A, PFS 8.8m) is the relevant comparator — not the experimental arm (which used avelumab, a CPI not present in BreAK CRC-001). Benchmark is hypothesis-generating only, not causal attribution." |

---

### IS-002 — MSI-H vs MSS Arm Differentiation Analysis

| Field | Value |
|-------|-------|
| **capability** | Arm-specific immunological context modeling (Arm 2A-1 MSS vs Arm 2A-2 MSI-H) |
| **rationale** | All data inputs VERIFIED: BreAK CRC-001 three-arm structure (NCT06934538); QUILT-2.004 MSI-H exclusion (NCT03050814); no CPI in treatment regimen (ASCO 2024 TPS3635); crispro_module_requirements_brenus.csv: `available_now: yes, confidence_of_output: high`; SLICE-004 in vertical slice queue |
| **code_path** | ABSENT — build from scratch; all data inputs verified; no trade-secret data required; rollback risk LOW |
| **blocker_or_none** | none |
| **mandatory_output_qualification** | "MSS/pMMR CRC (~95% of mCRC) is biologically distinct from MSI-H CRC. Checkpoint immunotherapy has demonstrated benefit in MSI-H/dMMR CRC only (ORR 0% in CheckMate 142 MSS cohort). No human clinical data for STC-1010 in either arm is available (B-003). All mechanistic claims are from published literature and murine data (Alzeeb 2024 — murine scope only)." |

---

### IS-003 — KRAS/BRAF Molecular Context Modeling

| Field | Value |
|-------|-------|
| **capability** | Molecular eligibility population immune landscape characterization (KRAS-mutated, BRAF wild-type, MSS/pMMR) |
| **rationale** | All data inputs VERIFIED: KRAS mutated + BRAF WT eligibility (NCT06934538); Alzeeb 2024 KRAS-IRF2-CXCL3-MDSC axis data (murine, VERIFIED); published KRAS subtype distribution in CRC; crispro_module_requirements_brenus.csv: `available_now: yes`; SLICE-004 in vertical slice queue |
| **code_path** | ABSENT — build from scratch; all data inputs verified; rollback risk LOW |
| **blocker_or_none** | none |
| **mandatory_output_qualification** | "All KRAS immune microenvironment data is from published literature (mechanistic hypotheses) and murine models (Alzeeb 2024 — murine scope only). No human clinical data for STC-1010 in KRAS-mutated patients is available (B-003). KRAS subtype distribution in BreAK CRC-001 enrolled patients is unknown." |

---

### IS-004 — Exploratory Biomarker Framework Design

| Field | Value |
|-------|-------|
| **capability** | Pre-specified biomarker analysis plan architecture for BreAK CRC-001 |
| **rationale** | All data inputs VERIFIED: exploratory endpoint schedule T0/1m/2m/6m/12m/Tprogression (NCT06934538); DTH monitoring protocol 1/24/48/72h (NCT06934538); KRAS mutated + BRAF WT eligibility (NCT06934538); Alzeeb 2024 CD8+ and M1 macrophage endpoints (murine, VERIFIED); crispro_module_requirements_brenus.csv: `available_now: yes` |
| **code_path** | ABSENT — build from scratch; all data inputs verified; rollback risk LOW |
| **blocker_or_none** | none |
| **mandatory_output_qualification** | "Biomarker framework is based on published literature and verified trial structure. No human clinical data for STC-1010 is available to validate biomarker hypotheses (B-003). Assay platforms for BreAK CRC-001 exploratory endpoints are not specified in the public protocol — framework must be compatible with Brenus's actual assay choices. On-treatment biopsy collection is conditional — missing data will limit the dataset." |

---

### IS-005 — Trial Design Structural Analysis

| Field | Value |
|-------|-------|
| **capability** | Phase IIA design weakness identification and power modeling |
| **rationale** | All data inputs VERIFIED: BreAK CRC-001 three-arm structure, Phase IIA primary endpoint, estimated enrollment ~57–60 Phase IIA patients, exploratory biomarker timepoints (NCT06934538); QUILT-2.004 design elements (NCT03050814); crispro_module_requirements_brenus.csv: `available_now: yes, confidence_of_output: high`; SLICE-002 in vertical slice queue |
| **code_path** | ABSENT — build from scratch; all data inputs verified; rollback risk LOW |
| **blocker_or_none** | none |
| **mandatory_output_qualification** | "Power calculations require an assumed effect size (expected 12-month PFS rate with STC-1010). This cannot be derived from verified inputs alone — it requires clinical judgment or the blocked human clinical data (B-003). CrisPRO models a range of effect sizes but cannot select the clinically appropriate assumption without Brenus input. QUILT-2.004 design precedent is structural only — its negative efficacy outcome must be disclosed whenever it is cited as a design reference." |

---

## IN SCOPE WITH GUARDRAILS
*Capabilities that can ship if output qualification is enforced. Code exists or is inferred present. Specific guardrail text required in every user-visible output.*

---

### ISG-001 — Trial MoA Vector Matching (MechanismFitRanker)

| Field | Value |
|-------|-------|
| **capability** | Brenus patient vector construction + MoA ranking against 609-trial registry |
| **rationale** | Code CONFIRMED_CODE_PRESENT (VC-01, VC-02); production instance INFERRED_PRESENT; receipt_preflight.json confirms 609 trials ranked 2026-04-15; PATH A formula confirmed; trial_moa_vectors.json TRADE_SECRET but internally accessible; formula conflict CT-01/CT-02 unresolved — output must carry formula-version qualifier; SLICE-001 in vertical slice queue |
| **code_path** | `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py` (CONFIRMED_CODE_PRESENT); production: `oncology-coPilot/oncology-backend-minimal/api/services/mechanism_fit_ranker.py` (INFERRED_PRESENT) |
| **blocker_or_none** | CT-01/CT-02 (formula conflict — output qualification required); BLOCKER-07 (trial_moa_vectors.json — internal authorization required) |
| **mandatory_output_qualification** | "[FORMULA VERSION QUARANTINED — CT-01/CT-02 unresolved; scores computed under PATH A (fit = clip((p·t)/‖t‖₂, 0, 1)); ceiling for p_ref = 0.8898; do not compare to Figure 2 DDR mean (0.983) which was computed under PATH B; formula decision is manager-held (BLOCKER-02). IO axis reflects tumor immune microenvironment — NOT CPI treatment. trial_moa_vectors.json is a trade secret — internal use only.]" |
| **ship_condition** | (1) Internal authorization for trial_moa_vectors.json confirmed; (2) Brenus patient vector constructed from verified inputs; (3) SLICE-003 receipt extension deployed |

---

### ISG-002 — HCT116 + LoVo Antigen Mapping (SC-001-Safe)

| Field | Value |
|-------|-------|
| **capability** | Antigen repertoire modeling for HCT116 and LoVo components of STC-1010 (HT29 explicitly excluded) |
| **rationale** | HCT116 and LoVo confirmed in STC-1010 (ASCO 2023 e14661 VERIFIED); HCT116 KRAS G13D (published); LoVo KRAS G13D (published); both SC-001-safe (KRAS G13D, consistent with BRAF WT trial eligibility); crispro_module_requirements_brenus.csv: `hct116_lovo_antigen_mapping, available_now: yes`; SLICE-005 in vertical slice queue |
| **code_path** | ABSENT — build from scratch; data inputs verified; public proteomics (TCGA/CPTAC) required; rollback risk MEDIUM (network dependency) |
| **blocker_or_none** | SC-001 (HT29 excluded — must be enforced in code); B-003 (no human clinical data to validate antigen overlap against clinical response) |
| **mandatory_output_qualification** | "[HT29 EXCLUDED — SC-001 ACTIVE: HT29 carries BRAF V600E; trial excludes BRAF-mutant patients (Exclusion #7); HT29-specific antigen modeling excluded until OQ-01 resolves. Antigen mapping uses public proteomics (TCGA/CPTAC) — may not match actual STC-1010 antigen repertoire; Brenus mass spectrometry data required for definitive characterization. No human clinical data available to validate antigen overlap against clinical response (B-003). All outputs are mechanistic hypotheses only.]" |
| **ship_condition** | (1) SLICE-003 receipt extension deployed with SC-001 flag; (2) HT29 exclusion enforced in code (`"ht29_excluded": true` in receipt); (3) TCGA/CPTAC API access confirmed |

---

### ISG-003 — Murine Preclinical Mechanism Anchoring

| Field | Value |
|-------|-------|
| **capability** | Mechanistic hypothesis generation from Alzeeb 2024 murine data (combination timing, proteome overlap, anti-PD-1 resistance model) |
| **rationale** | Alzeeb 2024 full dataset VERIFIED; all inputs available; crispro_module_requirements_brenus.csv: `murine_preclinical_mechanism_anchoring, available_now: yes`; SLICE-004 in vertical slice queue; mandatory murine scope limitation applies |
| **code_path** | ABSENT — build from scratch; all data inputs verified; rollback risk LOW |
| **blocker_or_none** | murine_surrogate_caveat (mandatory scope limitation on all outputs) |
| **mandatory_output_qualification** | "[MURINE DATA ONLY — Alzeeb et al. 2024 uses a murine surrogate vaccine, not the clinical STC-1010 product. Authors' caveat: 'Human vaccines based on STC technology should be tested in alternative models, such as ex vivo immune response activation tests, to better assess biological and clinical responses.' CT26 has higher mutational burden than human MSS CRC. MC38 is an MSI-H analog in mice. These findings provide mechanistic rationale only — not human efficacy evidence.]" |
| **ship_condition** | SLICE-003 receipt extension deployed; murine_surrogate_caveat field present in every receipt |

---

## DEFERRED — SPECIFIC BLOCKER
*Capabilities that cannot ship until a named blocker resolves. Binary: in scope once blocker resolves, out of scope until then.*

---

### DEF-001 — Holistic Score Computation (HolisticScoreService)

| Field | Value |
|-------|-------|
| **capability** | Holistic score computation (4-component blend: mechanism_fit 0.4, eligibility 0.3, pgx_safety 0.15, resistance_risk 0.15) |
| **blocker** | CT-01/CT-02 (PATH A vs PATH B formula conflict — manager decision pending; BLOCKER-02) |
| **what_resolves_it** | Manager records PATH A/B formula decision. Once decision recorded: (1) confirm which formula holistic score uses; (2) define pgx_safety and resistance_risk input sources for Brenus patient; (3) re-evaluate activation. |
| **when_in_scope** | Immediately after manager records formula decision AND pgx_safety/resistance_risk input sources are defined |
| **code_path** | `crispro-backend-v3/layer1_engines/holistic_score/mechanism_fit.py` (CONFIRMED_CODE_PRESENT); `crispro-backend-v3/layer1_engines/holistic_score/models.py` (CONFIRMED_CODE_PRESENT) |

---

### DEF-002 — Sponsor Q&A Generation with Provenance Locks

| Field | Value |
|-------|-------|
| **capability** | Sponsor Q&A generation with provenance locks (7 guardrails enforced) |
| **blocker** | SLICE-003 receipt extension must ship first; B-003 blocks most likely Q&A topics (human clinical data); SC-001 must be flagged in any vaccine composition Q&A |
| **what_resolves_it** | (1) SLICE-003 ships; (2) B-003 resolves (AACR 2026 CT051 direct retrieval or Brenus data room); (3) SC-001 flag enforcement in code |
| **when_in_scope** | After SLICE-003 ships AND B-003 resolves. Q&A about trial design, comparator data, and molecular context can ship after SLICE-003 alone. Q&A about clinical signals requires B-003 resolution. |
| **code_path** | ABSENT — build from scratch |

---

### DEF-003 — Trial Subset Locking

| Field | Value |
|-------|-------|
| **capability** | Trial subset locking (trial_subset_abstract.json population for Brenus-relevant trial subset) |
| **blocker** | BLOCKER-02 (manager formula decision); BLOCKER-07 (trial_moa_vectors.json internal authorization); MA-09 (receipt_subset.py not written) |
| **what_resolves_it** | (1) Manager records formula decision; (2) Internal authorization for trial_moa_vectors.json; (3) Engineering writes receipt_subset.py |
| **when_in_scope** | After all three blockers resolve |
| **code_path** | INFERRED at `publications/02-trial-matching/artifacts/trial_subset_abstract.json`; `receipt_subset.py` ABSENT |

---

### DEF-004 — Full Vaccine Antigen Concordance (All 3 Lines)

| Field | Value |
|-------|-------|
| **capability** | Complete vaccine-tumor antigen concordance analysis (HCT116 + HT29 + LoVo) |
| **blocker** | OQ-01 (HT29 BRAF V600E conflict — SC-001 active; B-006 resolution required) |
| **what_resolves_it** | OQ-01 resolves: either (a) Brenus confirms HT29 BRAF V600E is scientifically acceptable in BRAF WT patient context, or (b) Brenus confirms HT29 has been/will be substituted with BRAF WT cell line |
| **when_in_scope** | After OQ-01 resolves. If resolved as "HT29 acceptable": full three-line mapping with explicit BRAF V600E caveat. If resolved as "HT29 is a problem": two-line mapping (HCT116 + LoVo) is already in scope (ISG-002); substitute cell line mapping in scope once substitute identified. |
| **code_path** | ABSENT — build from scratch |

---

### DEF-005 — Bevacizumab Arm-Specific Combination Model

| Field | Value |
|-------|-------|
| **capability** | Arm-specific pharmacodynamic model for bevacizumab vs. non-bevacizumab arms; optimal vaccine timing relative to vascular normalization window |
| **blocker** | B-004 (bevacizumab arm assignment PROVISIONAL — protocol document not publicly available) |
| **what_resolves_it** | Protocol document from Brenus confirming arm-level bevacizumab assignment rule |
| **when_in_scope** | After B-004 resolves. Generic bevacizumab combination modeling (not arm-specific) is already in scope (IS-003, IS-004). |
| **code_path** | ABSENT — build from scratch |

---

### DEF-006 — Manuscript/Patent Quarantine Resolution

| Field | Value |
|-------|-------|
| **capability** | Resolving quarantined formula-dependent claims (DDR_MEAN_874, DDR_MEAN_983, DISC_RATIO_23X, DISC_RATIO_37X, LATIFY_DELTA) for manuscript and patent |
| **blocker** | BLOCKER-02 (manager formula decision); 0.983 figure is a SEPARATE publication-blocking discrepancy requiring Figure 2 recomputation regardless of PATH A/B decision |
| **what_resolves_it** | (1) Manager records PATH A/B formula decision; (2) Engineering identifies script used to generate Figure 2; (3) Figure 2 recomputed under authoritative formula; (4) Abstract statistics updated |
| **when_in_scope** | After manager records formula decision AND Figure 2 is recomputed |
| **code_path** | `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py` (CONFIRMED_CODE_PRESENT) for PATH A recomputation |

---

## PERMANENTLY OUT OF SCOPE
*Capabilities that require data CrisPRO will never have, or that are structurally impossible without external actions that are not CrisPRO's to take.*

---

### POOS-001 — Human Clinical Efficacy Analysis for STC-1010

| Field | Value |
|-------|-------|
| **capability** | Any analysis using human clinical efficacy or safety data for STC-1010 as verified inputs |
| **rationale** | BreAK CRC-001 (NCT06934538) started 2025-06-17; hasResults=false; no peer-reviewed clinical publication exists; all press-release/abstract sources (BusinessWire, BioSpace, AACR 2026 CT051) failed retrieval. This is not a temporary blocker — it is a structural gap that will only resolve when the trial reports results (estimated primary completion June 2028) or Brenus provides data under NDA/CDA. CrisPRO cannot generate human clinical efficacy data. |
| **code_path** | N/A |
| **blocker_or_none** | B-003 (hard gate — permanent until trial reports or Brenus provides data) |
| **note** | This capability becomes IN SCOPE WITH GUARDRAILS once B-003 resolves. It is permanently out of scope only for the current release cycle (pre-trial-results). |

---

### POOS-002 — Causal Attribution of Clinical Benefit to STC-1010

| Field | Value |
|-------|-------|
| **capability** | Causal attribution of observed clinical benefit (PFS, DCR, ORR) to STC-1010 vs. mFOLFOX6 ± bevacizumab |
| **rationale** | BreAK CRC-001 is non-randomized (single-arm per cohort). Without a concurrent randomized control arm, causal attribution is structurally impossible. mFOLFOX6 ± bevacizumab achieves ~80–90% DCR and ~50–55% 12-month PFS in 1L MSS mCRC (QUILT-2.004 Arm A: PFS 8.8m). Any observed clinical benefit in BreAK CRC-001 cannot be causally attributed to STC-1010 without randomization. This is a trial design problem — not a computational problem. CrisPRO can build historical control benchmarks (IS-001) but cannot substitute for randomization. |
| **code_path** | N/A |
| **blocker_or_none** | structural_gap — non-randomized design; no computational workaround |

---

### POOS-003 — Liver Metastasis Stratification Analysis

| Field | Value |
|-------|-------|
| **capability** | Pre-specified liver metastasis subgroup analysis for BreAK CRC-001 |
| **rationale** | BreAK CRC-001 does not specify liver metastasis burden limits, does not stratify by liver metastasis status, and does not pre-specify a subgroup analysis for liver-metastatic vs. non-liver-metastatic patients. Active liver metastases are the single strongest predictor of IO failure in MSS CRC. Without liver metastasis as a pre-specified stratification factor in the protocol, a post-hoc subgroup analysis will not be accepted by regulators as primary evidence. The solution is a protocol amendment — a clinical and regulatory action, not a computational one. |
| **code_path** | N/A |
| **blocker_or_none** | structural_gap — protocol amendment required; not a CrisPRO-solvable problem |

---

### POOS-004 — Clinical GMP Manufacturing Modeling

| Field | Value |
|-------|-------|
| **capability** | Clinical dose-response modeling, batch-to-batch consistency analysis, manufacturing scalability assessment for STC-1010 |
| **rationale** | Clinical GMP manufacturing parameters are not disclosed in any retrieved source (B-002). Murine surrogate parameters (Alzeeb 2024) cannot be assumed to equal clinical parameters. This capability requires Brenus IND filing (CMC section) — data CrisPRO does not have and cannot generate. |
| **code_path** | N/A |
| **blocker_or_none** | B-002 (hard gate — Brenus data room / IND filing required) |
| **note** | This capability becomes IN SCOPE WITH GUARDRAILS once B-002 resolves. It is permanently out of scope only for the current release cycle. |

---

### POOS-005 — Enformer Accessibility Scoring (Any Context)

| Field | Value |
|-------|-------|
| **capability** | Enformer accessibility scoring for any Brenus-related analysis |
| **rationale** | Enformer endpoint returns near-constant values regardless of sequence content (poly-N 0.0218 > ACTB 0.0170 > TP53 0.0162). Already excluded from composite in HONEST_AUDIT.md. Scientifically non-functional. Not applicable to Brenus CRC biology. |
| **code_path** | Modal endpoint: `https://crispro-test--enformer-accessibility.modal.run` (CONFIRMED_CODE_PRESENT but non-discriminative) |
| **blocker_or_none** | UNRESOLVED-002 (non-discriminative — endpoint must be fixed before any use) |

---

## RELEASE READINESS CHECKLIST

Before shipping any IN SCOPE or IN SCOPE WITH GUARDRAILS capability:

- [ ] SLICE-003 (receipt_brenus.py) built and deployed
- [ ] SC-001 flag present in every Brenus receipt
- [ ] Formula version field present in every Brenus receipt (value: "QUARANTINED — CT-01/CT-02 pending manager decision")
- [ ] Guardrail compliance block (G1–G7) present in every Brenus receipt
- [ ] B-003 gate enforced: no n=6/DCR/DTH data in any input
- [ ] No-CPI constraint enforced: IO axis clarification present in any output using IO axis
- [ ] QUILT-2.004 negative framing enforced: terminated for futility disclosed in every citation
- [ ] Murine surrogate caveat present in every output using Alzeeb 2024 data
- [ ] HT29 excluded from all antigen outputs (SC-001 active)
- [ ] Internal authorization for trial_moa_vectors.json confirmed (for ISG-001 only)

---

*End of brenus_first_release_scope.md — 2026-04-28*
*Brenus Adjudication Agent*
