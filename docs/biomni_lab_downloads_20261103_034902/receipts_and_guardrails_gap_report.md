# Receipts and Guardrails Gap Report — Brenus Provenance Safety
**Prepared by:** CrisPRO Capability Cartographer
**Date:** 2026-04-28
**Evidence basis:** receipt_preflight.py (direct read); RECEIPT_MANIFEST.json (direct read); receipt_preflight.json (direct read); crispro_fitgap_brenus_verified_only.md §8 (7 guardrails); brenus_canon_v2_freeze.md (Hard Stops 1–10); brenus_final_blockers_registry.md (B-001 through B-006, SC-001); VC-01 through VC-15; CT-01 through CT-06
**Purpose:** Identify every gap between the current receipt/provenance infrastructure and what is required for Brenus-facing outputs to be provenance-safe and blocker-aware.

---

## SECTION 1 — WHAT RECEIPT INFRASTRUCTURE EXISTS

### 1.1 receipt_preflight.py (CONFIRMED_CODE_PRESENT)

**Path:** `publications/02-trial-matching/scripts/receipt_preflight.py`
**Evidence:** Direct source read; execution confirmed 2026-04-15

**What it captures:**
| Field | Value in current receipt | Evidence |
|-------|--------------------------|---------|
| `generated_at` | ISO 8601 UTC timestamp | receipt_preflight.json: `"2026-04-15T20:27:22.572631+00:00"` |
| `python` | Python version | `"3.9.6"` |
| `patient_reference_7d` | Patient vector dict (7 axes) | `{ddr: 0.88, mapk: 0.12, pi3k: 0.05, vegf: 0.02, her2: 0.0, io: 0.0, efflux: 0.0}` |
| `registry.path` | Path to trial_moa_vectors.json | `"oncology-coPilot/oncology-backend-minimal/api/resources/trial_moa_vectors.json"` |
| `registry.nct_count` | Total trials in registry | `609` |
| `registry.ranked_count` | Trials successfully ranked | `609` |
| `ddr_split_rule` | Classification rule | `"trial moa_vector ddr > 0.5 after string sanitization"` |
| `discrimination_full_registry` | DDR/non-DDR means and counts | DDR n=75 mean=0.8210; non-DDR n=534 mean=0.0355 |
| `abstract_note` | Human-readable caveat | References trial_subset_abstract.json pending_lock status |
| `ranker_constants` | alpha and beta | `{alpha: 0.7, beta: 0.3}` |

### 1.2 RECEIPT_MANIFEST.json (CONFIRMED_CODE_PRESENT)

**Path:** `publications/02-trial-matching/artifacts/RECEIPT_MANIFEST.json`
**Evidence:** Direct artifact read

**What it captures:**
| Field | Value | Evidence |
|-------|-------|---------|
| `generated_at` | ISO 8601 UTC timestamp | `"2026-04-15T20:27:22.572631+00:00"` |
| `inputs[0].path` | Path to trial_moa_vectors.json | `"oncology-coPilot/oncology-backend-minimal/api/resources/trial_moa_vectors.json"` |
| `inputs[0].sha256` | SHA-256 of trial_moa_vectors.json | `"e9b959a0027132dbb6753251fb6ef1b63098dfd16484c5affef5de4e804b4aa5"` |
| `outputs[0].path` | Path to receipt_preflight.json | `"publications/02-trial-matching/artifacts/receipt_preflight.json"` |
| `generator` | Script that generated the receipt | `"publications/02-trial-matching/scripts/receipt_preflight.py"` |

### 1.3 What the Current Infrastructure Does Well

- **Timestamp provenance:** Every receipt is timestamped in UTC ISO 8601 — reproducibility anchor
- **Input integrity:** SHA-256 of trial_moa_vectors.json in RECEIPT_MANIFEST.json — detects registry tampering
- **Ranker constants:** alpha=0.7, beta=0.3 captured — formula parameterization is recorded
- **Patient vector:** Full 7D patient vector captured — reproducibility anchor for ranking
- **Registry stats:** nct_count and ranked_count captured — confirms full registry was processed
- **Discrimination stats:** DDR/non-DDR means and counts captured — core scientific output

---

## SECTION 2 — WHAT IS MISSING FOR BRENUS-SPECIFIC PROVENANCE

### 2.1 Missing: Blocker Status Fields

**Gap:** The current receipt has no fields for blocker status. A Brenus-facing receipt must include the status of every active blocker that could affect the output.

**Required fields (not present in current receipt):**
```json
{
  "brenus_blockers": {
    "B-003_human_clinical_data": "BLOCKED — no human STC-1010 efficacy/safety data retrieved; n=6/DCR/DTH data from AACR 2026 CT051 not retrieved",
    "B-004_bevacizumab_arm_assignment": "PROVISIONAL — arm-level assignment not specified in public registry",
    "B-006_ht29_braf_conflict_resolution": "BLOCKED — scientific rationale for HT29 BRAF V600E in BRAF WT trial not disclosed in any retrieved source",
    "SC-001_ht29_braf_active_conflict": "ACTIVE CONFLICT — HT29 BRAF V600E confirmed in vaccine (ASCO 2023 e14661); trial excludes BRAF-mutant patients (Exclusion #7); conflict not resolved"
  }
}
```

**Evidence:** brenus_final_blockers_registry.md B-003, B-004, B-006, SC-001

---

### 2.2 Missing: Formula Version Field

**Gap:** The current receipt captures `ranker_constants` (alpha=0.7, beta=0.3) but does NOT record which formula was used (PATH A vs PATH B). This is a critical gap given CT-01/CT-02.

**Required field (not present in current receipt):**
```json
{
  "formula_version": {
    "path_a_mechanism_fit_ranker": "fit = clip((p·t)/‖t‖₂, 0, 1) — NOT cosine similarity",
    "path_b_holistic_score_service": "fit = clip((p·t)/(‖p‖₂×‖t‖₂), 0, 1) — cosine similarity",
    "formula_conflict_status": "QUARANTINED — CT-01/CT-02 unresolved; manager formula decision pending (BLOCKER-02)",
    "formula_used_in_this_receipt": "PATH_A — MechanismFitRanker.rank_trials()"
  }
}
```

**Evidence:** VC-02 (PATH A); VC-03 (PATH B); CT-01/CT-02 (formula conflict); 8d_formula_decision_memo.md

---

### 2.3 Missing: VERIFIED/BLOCKED Claim Provenance Tags

**Gap:** The current receipt does not tag individual output values with their provenance confidence (VERIFIED/BLOCKED/PROVISIONAL/COMPANY_CLAIM). A Brenus-facing receipt must tag every claim.

**Required pattern (not present in current receipt):**
```json
{
  "output_claims": {
    "ddr_mean_mechanism_fit": {
      "value": 0.8210,
      "confidence": "VERIFIED — computed from confirmed code (VC-02) against trade-secret registry",
      "formula": "PATH_A",
      "ceiling_note": "PATH A ceiling for p_ref = 0.8898 (VC-04); value 0.8210 < ceiling — consistent"
    },
    "nct_count": {
      "value": 609,
      "confidence": "VERIFIED — registry sha256 confirmed in RECEIPT_MANIFEST.json"
    }
  }
}
```

**Evidence:** brenus_canon_v2_freeze.md Part VII (engine_routable claim table); crispro_fitgap_brenus_verified_only.md §8 (guardrails)

---

### 2.4 Missing: Guardrail Compliance Record

**Gap:** The current receipt does not record which guardrails were checked and whether they passed. A Brenus-facing receipt must include a guardrail compliance block.

**Required fields (not present in current receipt):**
```json
{
  "guardrail_compliance": {
    "G1_no_cpi_attribution": "PASS — no checkpoint inhibitor in BreAK CRC-001 treatment regimen (ASCO 2024 TPS3635 VERIFIED)",
    "G2_no_human_clinical_data_as_inputs": "PASS — no n=6/DCR/DTH data used as inputs",
    "G3_no_murine_data_as_human_efficacy": "PASS — Alzeeb 2024 data tagged as murine scope only",
    "G4_no_200_antigens_as_verified": "PASS — '200+ proteins' not used as VERIFIED fact",
    "G5_no_ht29_braf_conflict_as_resolved": "PASS — SC-001 flagged as ACTIVE CONFLICT; HT29 antigen modeling excluded",
    "G6_no_quilt2004_as_positive_precedent": "PASS — NCT03050814 framed as terminated for futility (HR 1.061 p=0.91)",
    "G7_no_msi_h_mss_conflation": "PASS — MSS and MSI-H arms treated as distinct immunological contexts"
  }
}
```

**Evidence:** crispro_fitgap_brenus_verified_only.md §8 (7 guardrails)

---

### 2.5 Missing: Brenus-Specific Patient Vector Fields

**Gap:** The current receipt captures a generic 7D patient vector (p_ref for 8D patent validation). A Brenus-facing receipt must capture the Brenus-specific patient vector with its clinical rationale.

**Required fields (not present in current receipt):**
```json
{
  "brenus_patient_vector": {
    "vector": {"ddr": "TBD", "mapk": "TBD", "pi3k": "TBD", "vegf": "TBD", "her2": "TBD", "io": "TBD", "efflux": "TBD"},
    "clinical_rationale": "KRAS-mutated BRAF-WT MSS/pMMR IO-naive 1L mCRC — BreAK CRC-001 eligible population",
    "vector_version": "PENDING — Brenus patient vector not yet defined",
    "vector_source": "PENDING — requires clinical input from Brenus or published KRAS-mutated MSS mCRC immune profiling data"
  }
}
```

**Evidence:** crispro_fitgap_brenus_verified_only.md §3.1 (patient vector construction for Brenus)

---

## SECTION 3 — WHERE BLOCKED/PROVISIONAL/CONFLICT STATES COULD LEAK

### 3.1 Leak Point: Human Clinical Data (B-003)

**Risk:** n=6, 100% DCR, DTH response data from AACR 2026 CT051 / BusinessWire / BioSpace are blocked sources. If any downstream agent or user inputs these values as patient vector components or as validation benchmarks, the engine will process them without flagging their blocked status.

**Current protection:** NONE — no runtime enforcement exists. Protection is documentation-only (brenus_final_blockers_registry.md B-003 Hard Stop #9).

**Leak scenario:** User constructs a patient vector using "DTH response = 0.8" derived from a press release. Engine accepts it without flagging the blocked source. Output appears to be validated against human clinical data when it is not.

**Required fix:** Runtime blocker check in receipt_brenus.py: if any input value is tagged as derived from B-003 sources, reject with explicit error: `"INPUT_BLOCKED: B-003 — human clinical data for STC-1010 not retrieved from primary source"`.

---

### 3.2 Leak Point: SC-001 HT29/BRAF Conflict

**Risk:** HT29 is confirmed in STC-1010 (ASCO 2023 e14661). HT29 carries BRAF V600E. Trial excludes BRAF-mutant patients. If any antigen analysis includes HT29 without flagging SC-001, the output implies the conflict is resolved when it is not.

**Current protection:** NONE as code — SC-001 is documented in brenus_canon_v2_freeze.md Hard Stop #10 and brenus_final_blockers_registry.md SC-001. No runtime enforcement.

**Leak scenario:** Antigen mapping module includes HT29 proteomics data. Output shows "STC-1010 antigen coverage includes BRAF V600E-associated peptides." User presents this to Brenus without flagging the BRAF WT eligibility conflict. Brenus is not informed of the active scientific conflict.

**Required fix:** Any antigen analysis module must check: if HT29 data is included, inject `"sc_001_ht29_braf_conflict": "ACTIVE — HT29 BRAF V600E in vaccine vs BRAF WT trial eligibility; not resolved; see brenus_final_blockers_registry.md SC-001"` into receipt. SLICE-005 explicitly excludes HT29 until OQ-01 resolves.

---

### 3.3 Leak Point: B-004 Bevacizumab Assignment (PROVISIONAL)

**Risk:** Bevacizumab arm assignment is PROVISIONAL (B-004). If any combination timing model assumes bevacizumab is present in all arms, the output will be incorrect for arms that do not receive bevacizumab.

**Current protection:** NONE as code — B-004 is documented in brenus_final_blockers_registry.md. No runtime enforcement.

**Leak scenario:** Combination timing model assumes bevacizumab in all arms. Output recommends vaccine timing relative to VEGF-A/vascular normalization window. If bevacizumab is not present in a given arm, this recommendation is scientifically incorrect.

**Required fix:** Any combination timing model must check: if bevacizumab arm assignment is PROVISIONAL, inject `"b_004_bevacizumab_assignment": "PROVISIONAL — arm-level assignment not specified in public registry; combination timing model assumes 'with or without' optionality"` into receipt. Do not assert arm-specific bevacizumab presence.

---

### 3.4 Leak Point: Formula Conflict (CT-01/CT-02)

**Risk:** PATH A ceiling is 0.8898 for p_ref. PATH B ceiling is 1.0. If a Brenus patient vector is scored under PATH A and the output is compared to Figure 2 DDR mean (0.983, which was generated under PATH B), the comparison is invalid.

**Current protection:** NONE as code — CT-01/CT-02 are documented in 8d_contradictions_and_missing_artifacts.md. No runtime enforcement.

**Leak scenario:** Brenus patient vector is scored under PATH A. Output shows mechanism_fit = 0.82. User compares this to "DDR mean = 0.983" from Figure 2. Concludes the Brenus patient vector is below the DDR mean. This comparison is invalid because 0.983 was generated under PATH B (cosine), not PATH A.

**Required fix:** Receipt must record formula version for every output value. Any comparison between PATH A and PATH B outputs must be flagged as invalid. Until manager formula decision (BLOCKER-02), all formula-dependent comparisons must carry `"QUARANTINED — CT-01/CT-02 formula conflict unresolved"`.

---

### 3.5 Leak Point: No-CPI Constraint

**Risk:** BreAK CRC-001 contains NO checkpoint inhibitor in the treatment regimen (confirmed ASCO 2024 TPS3635). If any output describes the regimen as including a CPI, it is factually incorrect.

**Current protection:** Guardrail 1 in crispro_fitgap_brenus_verified_only.md §8 prohibits CPI attribution. No runtime enforcement.

**Leak scenario:** Mechanism modeling module includes IO axis weight in patient vector. Output narrative describes "IO-targeting mechanism" and implies CPI activity. User presents this to Brenus as evidence that STC-1010 has CPI-like activity. This is incorrect — STC-1010 is not a CPI.

**Required fix:** Receipt must include `"no_cpi_constraint": "VERIFIED — no checkpoint inhibitor in BreAK CRC-001 treatment regimen (ASCO 2024 TPS3635); IO axis in patient vector reflects tumor immune microenvironment, not CPI treatment"`. Any output that uses the IO axis must carry this clarification.

---

## SECTION 4 — SPECIFIC GAPS BY BLOCKER

### 4.1 SC-001 HT29/BRAF Conflict

| Gap | Current state | Required state |
|-----|--------------|----------------|
| Runtime SC-001 flag | ABSENT — documentation only | Runtime check: if HT29 data included → inject SC-001 flag into receipt |
| HT29 exclusion enforcement | ABSENT — no code gate | Code gate: HT29 antigen data excluded from all outputs until OQ-01 resolves |
| SC-001 disclosure in user-visible output | ABSENT — no template | Every Brenus output discussing vaccine composition must include SC-001 disclosure |
| OQ-01 resolution tracking | ABSENT — no code | Track OQ-01 status in receipt; gate HT29 analysis on OQ-01=RESOLVED |

---

### 4.2 B-003 No Human Efficacy Data

| Gap | Current state | Required state |
|-----|--------------|----------------|
| Runtime B-003 gate | ABSENT — documentation only | Runtime check: if any input tagged as B-003 source → reject with explicit error |
| n=6/DCR/DTH data exclusion | ABSENT — no code gate | Code gate: n=6, 100% DCR, DTH response data from AACR 2026 CT051 / BusinessWire / BioSpace rejected as inputs |
| B-003 disclosure in user-visible output | ABSENT — no template | Every Brenus output must include: "No human clinical efficacy data for STC-1010 is available from directly retrieved sources" |
| Preliminary signal framing | ABSENT — no template | If user asks about preliminary signals: "Preliminary signals referenced in press coverage; sources not directly retrieved [BLOCKED — source not retrieved]" |

---

### 4.3 B-004 Bevacizumab Assignment

| Gap | Current state | Required state |
|-----|--------------|----------------|
| B-004 PROVISIONAL flag in receipt | ABSENT | Receipt field: `"b_004_bevacizumab_assignment": "PROVISIONAL"` |
| Arm-specific bevacizumab assumption | ABSENT — no guard | Any combination timing model must not assume arm-specific bevacizumab presence |
| B-004 disclosure in user-visible output | ABSENT — no template | "Bevacizumab is optional ('with or without') in BreAK CRC-001; arm-level assignment not specified in public registry [PROVISIONAL — B-004]" |

---

### 4.4 No-CPI Constraint

| Gap | Current state | Required state |
|-----|--------------|----------------|
| CPI attribution guard | ABSENT as code; Guardrail 1 in documentation | Runtime check: if output narrative includes "checkpoint inhibitor" or "CPI" or "ICI" as treatment component → flag as Guardrail 1 violation |
| IO axis clarification | ABSENT — no template | Any output using IO axis must clarify: IO axis reflects tumor immune microenvironment, not CPI treatment |
| QUILT-2.004 CPI disclosure | ABSENT — no template | Any citation of QUILT-2.004 must disclose: (1) terminated for futility; (2) used avelumab (CPI) — mechanistically different from STC-1010 |

---

## SECTION 5 — PRIORITY ORDER FOR RECEIPT/GUARDRAIL FIXES

| Priority | Fix | Rationale |
|----------|-----|-----------|
| 1 (Highest) | Add SC-001 flag to receipt (SLICE-003) | SC-001 is an ACTIVE CONFLICT; any output without this flag could mislead Brenus about vaccine composition |
| 2 | Add B-003 runtime gate (SLICE-003) | B-003 is a hard gate; blocked human clinical data must not enter the engine |
| 3 | Add formula version field to receipt (SLICE-003) | CT-01/CT-02 formula conflict means every output value must be tagged with its formula version |
| 4 | Add guardrail compliance block to receipt (SLICE-003) | 7 guardrails must be checked and recorded for every Brenus output |
| 5 | Add B-004 PROVISIONAL flag to receipt | Bevacizumab arm assignment is provisional; combination timing models must not assume arm-specific presence |
| 6 | Add no-CPI constraint field to receipt | BreAK CRC-001 has no CPI; IO axis usage must be clarified |
| 7 | Add Brenus-specific patient vector fields | Patient vector for Brenus population is not yet defined; receipt must record "PENDING" status |

---

## SECTION 6 — SUMMARY: WHAT IS SAFE TO OUTPUT TODAY vs WHAT REQUIRES FIXES

### Safe to output today (with manual guardrail application):
- Historical control benchmark using NCT03050814 verified data (SLICE-002) — all inputs VERIFIED; no blocked data
- MSI-H vs MSS arm differentiation analysis (SLICE-004) — all inputs VERIFIED; no blocked data
- KRAS/BRAF molecular context characterization — all inputs VERIFIED; no blocked data
- HCT116 + LoVo antigen mapping (SLICE-005) — inputs VERIFIED; HT29 excluded; SC-001 flag applied manually

### Requires SLICE-003 receipt extension before output:
- Any output from MechanismFitRanker (SLICE-001) — needs formula version field and blocker flags in receipt
- Any antigen analysis — needs SC-001 flag enforcement
- Any combination timing model — needs B-004 PROVISIONAL flag
- Any output discussing preliminary clinical signals — needs B-003 gate

### Cannot output until external blockers resolve:
- DTH response modeling — requires B-003 resolution (human clinical data)
- Full vaccine antigen concordance (all 3 lines) — requires OQ-01 resolution (SC-001)
- Bevacizumab arm-specific combination model — requires B-004 resolution
- Any analysis using n=6/DCR/DTH data — hard gate; B-003 must resolve first

---

*End of receipts_and_guardrails_gap_report.md — 2026-04-28*
*CrisPRO Capability Cartographer*
*Evidence basis: receipt_preflight.py (direct read), RECEIPT_MANIFEST.json (direct read), receipt_preflight.json (direct read), crispro_fitgap_brenus_verified_only.md §8, brenus_canon_v2_freeze.md, brenus_final_blockers_registry.md, VC-01 through VC-15, CT-01 through CT-06*
