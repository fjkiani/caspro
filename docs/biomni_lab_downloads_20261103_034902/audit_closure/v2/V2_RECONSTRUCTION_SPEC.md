# v2 Reconstruction Spec — Resistance Framework Audit Closure

**Status of this document:** RECOVERED-FROM-RECORD, NOT RE-EXECUTED THIS TURN.

**Why:** An out-of-memory sandbox restart wiped the local working copy of
`crispro-backend-v2`. The prior-turn edits were staged-only (never committed,
per the review-first decision), so they were lost with the working tree. The
repository cannot be re-cloned in this session: the available token is scoped to
a different repository (`fjkiani/Brenus`) and GitHub rejects it for
`crispro-backend-v2`; the repo is not public; and S3-backed storage cannot host
a git working tree (symref writes fail). Therefore the v2 edits below are
reconstructed from the recorded execution trace — the exact edits, code bodies,
line locations, and the test results **from the prior turn** are reproduced
faithfully, but **no v2 test was re-run this turn**. Every number attributed to
v2 below is a prior-turn result, explicitly labeled as such. Nothing here is
fabricated; nothing here is a fresh claim.

**To apply:** clone `crispro-backend-v2`, check out branch
`feature/biomarker-subsystem`, and apply the edits in section "EDIT MANIFEST"
against the current code, then run the validation commands in section
"VERIFICATION (PRIOR-TURN RESULTS)" to confirm.

---

## AUDIT VERDICT (code-grounded, not rubber-stamped)

The audit's "Production Readiness Report" was checked against the actual code
and the pre-existing `docs/audits/ISSUE_REGISTER.yaml`. Three of its five
technical premises are **factually wrong**, and its single largest demand
(logit calibration from Subject 191) is **scientifically invalid**. This is not
diplomatic softening — it is what the code says.

| Audit claim | Reality (from code + register) | Verdict |
|---|---|---|
| **#3 RES-OV-P0-009 KELIM "dead code", `.kelim` not renamed to `.k`** | Register shows `status: CLOSED_VERIFIED`, **PATCH 8 applied 2026-05-10**. `ovarian.py` `detect_kelim_genotype_convergence()` already reads `kelim_obj.k`. E2E chain proof exists (real `numpy.polyfit`, no mocks): `KelimCa125(k=0.01365) -> detected=True, provenance.kelim_k=0.01365`. | **Audit STALE — fixed ~2 months before the audit** |
| **#2 RES-OV-P0-006 "Prophet has NO ctDNA parameter"** | `predict_resistance` **has** a `ctdna_context` parameter. It is wired as `WIRED_PROGNOSTIC_ONLY_V1` **by explicit design** — surfaced to the clinician, structurally excluded from the probability/routing calc. The register's `next_pr` states promotion "requires a new PR with clinical validation" against a ctDNA cohort that does not yet exist. | **Audit WRONG on "no parameter"; the lock is intentional, not a bug** |
| **#5 TF2-SLOP-004 CCNE1 "Prophet only checks somatic mutations, blind to CNA"** | The narrow real gap was a hardcoded `ccne1_amp=False` in one SPE-enrichment path. The SPE scorer already accepted `ccne1_amp: bool`. This was genuinely actionable and **was wired** (see EDIT MANIFEST). | **Partially right — real but narrow gap; now closed** |
| **#1 "Calibrate the 6-coef KELIM logit from Subject 191's breakpoint delta today"** | **Declined on scientific grounds.** (a) n=1 cannot identify 6 coefficients; (b) the pilot produced **copy-number** data, NOT CA-125/KELIM kinetics or resistance outcomes — it is not the input this logit consumes; (c) doing so would fabricate a calibration and falsely flip `PENDING_REAL_DATA -> VALIDATED`. | **DECLINED — would be fabrication** |
| **#4 Gene universe: move all 5 LITERATURE_ONLY genes to VALIDATED** | Honest per-gene verdict from real pilot CNA: 3/5 candidate-with-evidence, 2/5 genuinely cannot move, **0/5 reach full VALIDATED from n=4**. sWGS at ~0.1x cannot call the point mutations that drive KEAP1/SLC31A1. | **Cannot force-flip — honest tiering applied** |

**Biological correction the audit got wrong:** Subject 191 (IM_280 dx / JBLAB-4944
relapse) is **CCNE1-NEUTRAL**. Its signal is the breakpoint-delta jump
(+253: 127->380), which is a **Serial-SAE structural-evolution** signal, not
CCNE1. The **CCNE1 amplification is in Subject 109** (IM_373 dx = broad
19q gain, CCNE1 3.5x; JBLAB-4225 relapse = genuinely focal CCNE1 amp 1.8x).
Each was wired to the correct subject.

---

## EDIT MANIFEST (9 files; additive, no renames)

All edits verified syntactically valid at edit time (`ast.parse`) and behavior
proven with the real pilot data (probe outputs in VERIFICATION section).

### 1. `api/services/ayesha_fit/builder.py` (+14)
In `_add_profile_aliases(profile)`, add a canonical `profile['cna']` alias sourced
from `tumor_context['cna']` (None if absent), mirroring the existing
`expression_data` alias pattern (mandate #6 — extend, don't restart):

```python
    # CNA alias (canonical key for SPE/CCNE1 consumers) — TF2-SLOP-004
    if "cna" not in profile:
        tc = profile.get("tumor_context") or {}
        profile["cna"] = tc.get("cna")  # None if no CNA assay
```

### 2. `api/routers/ayesha_therapy_fit.py` (+59)
(a) Add helper before `_compute_io_harm_prevention`:

```python
def _derive_ccne1_amp_from_cna(cna: Optional[Dict[str, Any]]):
    """
    TF2-SLOP-004: derive CCNE1 amplification boolean from a CNA assay dict.
    Returns (ccne1_amp: bool, source: str, detail: str).
    When cna is None/absent, source='no_cna_assay' and amp=False — this is an
    honest UNKNOWN (not a false negative): the assay was not run.
    """
    if not cna:
        return False, "no_cna_assay", "CCNE1 CNA not assayed"
    entry = cna.get("CCNE1") or cna.get("ccne1")
    if entry is None:
        return False, "cna_assay_no_ccne1", "CNA assay present but CCNE1 not reported"
    call = (entry.get("cna_call") or entry.get("call") or "").upper()
    amp = call in {"AMP", "HIGH_AMP", "GAIN"}
    return amp, "cna_assay", f"CCNE1 {call or 'reported'}"
```

(b) Replace the hardcoded `ccne1_amp = False` with a real read from
`profile.get("cna")` via the helper; initialize `ccne1_cna_source` /
`ccne1_cna_detail` **before** the try block so they are always in scope.

(c) Surface into `decision_dict` a `ccne1_cna_status` of
`AMPLIFIED` / `NOT_AMPLIFIED` / `NOT_ASSAYED` (so consumers can distinguish
"not amplified" from "not assayed"), plus `ccne1_cna_source`.

### 3. `api/services/resistance_prophet/schemas.py` (+3)
Add an additive enum member to `ResistanceSignal`:

```python
    SERIAL_SAE_STRUCTURAL = "SERIAL_SAE_STRUCTURAL"   # Signal 8 — structural evolution (breakpoint delta)
```

### 4. `api/services/resistance_prophet/signals/ovarian.py` (+89)
Append `async def detect_serial_sae_divergence(serial_sae)` after
`detect_genomic_resistance`. Consumes a `serial_sae` dict carrying
`breakpoint_delta` (dx->relapse). Data-anchored threshold
`BP_DELTA_DIVERGENCE_THR = 50.0` (from the n=4 pilot distribution, NOT a fitted
model). Bounded monotone probability mapping (0.50 -> 0.88), `confidence = 0.40`.
Provenance stamped:
`calibration_status = "PILOT_DEMONSTRATION_N4_NOT_CLINICAL"`,
`probability_semantics = "bounded_monotone_heuristic_not_fitted_model"`.
Returns a `ResistanceSignalData(signal_type=SERIAL_SAE_STRUCTURAL, ...)`.

### 5. `docs/audits/ISSUE_REGISTER.yaml` (24 issues; schema extended, not restarted)
- `TF2-SLOP-004` -> `CLOSED_VERIFIED` (real CCNE1 CNA path wired).
- New `RES-OV-P0-010` (Serial-SAE Signal 8) -> `CLOSED_VERIFIED`.
- `RES-OV-P0-009` remains `CLOSED_VERIFIED` (was already closed at PATCH 8);
  added an `audit_correction` note pointing to the audit's stale claim.
- `RES-OV-P0-006` remains `OPEN` with an `audit_correction` note documenting it
  is wired prognostic-only by design (`WIRED_PROGNOSTIC_ONLY_V1`) with the exact
  gate required for promotion to probability.
- `RES-OV-P0-005` `calibration_note` updated `PENDING_REAL_DATA -> DISCOVERY_ONLY_NOT_CALIBRATED`
  with an explicit `calibration_cannot_be_faked_from_pilot` note declining the
  audit's logit-calibration demand on scientific grounds.
- Added a `stale_tests_corrected_2026_07_20` note.

### 6. `tests/audit/test_resistance_prophet_production.py` (4 stale/fragile tests fixed)
All 4 proven **pre-existing** (they fail on pristine code via git-stash), not
regressions:
- `test_harness_e_ctdna_mrd_prophet_gap` — flipped stale `len(ctdna_params)==0`
  assertion to `>=1` (the ctDNA param **is** present, refuting the audit).
- `test_res_ov_p0_006_ctdna_stub` — `NOT_WIRED_INTO_PROPHET -> WIRED_PROGNOSTIC_ONLY_V1`.
- `test_res_ov_p0_009_kelim_e2e_chain` — `PENDING_REAL_DATA -> DISCOVERY_ONLY_NOT_CALIBRATED`.
- `test_res_ov_p0_009_kelim_convergence_reads_k` — genuine bug fix:
  `asyncio.get_event_loop() -> asyncio.new_event_loop()` with try/finally
  (the deprecated call raised `RuntimeError: no current event loop` when async
  tests ran earlier in the sweep and closed the loop).

### 7. NEW `tests/audit/test_ccne1_cna_integration_pilot.py` (5 tests)
Real integration test: feeds actual pilot CNA (IM_373 CCNE1 HIGH_AMP 3.5x;
JBLAB-4225 CCNE1 AMP 1.8x; IM_280 neutral; None) through the
profile->SPE path and asserts the amplification now flows
(`spe_result.ccne1_amp=True`, `spe_composite` strictly above the no-CNA baseline).

### 8. NEW `tests/audit/test_serial_sae_signal_pilot.py` (7 tests, async)
Real integration test: feeds the 4 real pilot breakpoint-deltas through
`detect_serial_sae_divergence` and asserts divergent vs stable separation with
the negative control passing (see VERIFICATION).

### 9. `docs/resistance_biomarker/PRODUCTION_READINESS_REPORT.md` (Section 11 appended)
New Section 11 (audit-closure): 11.1 audit right/wrong table + Subject 191 vs
109 correction; 11.2 TF2-SLOP-004; 11.3 Serial-SAE Signal 8; 11.4 gene verdicts;
11.5 test deltas; 11.6 v3; 11.7 honest eligibility table (supersedes the audit's
Section 8).

---

## VERIFICATION (PRIOR-TURN RESULTS — not re-run this turn)

**CCNE1 CNA path (real pilot data, end-to-end probe):**
```
IM_373     : CCNE1_amp=True  (HIGH_AMP, ratio 3.505) | spe_composite 0.2000 vs old hardcoded-False 0.0000 | delta +0.20
JBLAB-4225 : CCNE1_amp=True  (AMP, ratio 1.823)      | spe_composite 0.2000 vs 0.0000 | delta +0.20
IM_280     : CCNE1_amp=False (NEUTRAL, ratio 0.961)  | spe_composite 0.0000 (correct)
no_cna_assay: amp=False, source=no_cna_assay (correct UNKNOWN, not a false negative)
```

**Serial-SAE signal (real pilot breakpoint-deltas):**
```
subj 191: delta +253 -> detected=True  prob 0.760 conf 0.40   (the "smoking gun")
subj   6: delta +101 -> detected=True  prob 0.601 conf 0.40
subj 109: delta   -7 -> detected=False prob 0.050 conf 0.00   (negative control — PASSES)
subj 119: delta  +18 -> detected=False prob 0.108 conf 0.00
```

**Pilot Serial-SAE calibration (n=4, descriptive only):**
```
breakpoint-delta: values [-7, 18, 101, 253], median 59.5, IQR [11.8, 139.0]
fraction |delta|>=50: 0.50 (2/4)
HONEST SCOPE: n=4 supports a DEMONSTRATION threshold (+50), NOT a probability model.
```

**Test results (prior turn):**
- New integration tests: `12 passed` (5 CCNE1 + 7 Serial-SAE).
- Production suite after fixing 4 stale tests: `17 passed / 0 failed` (was 13/4).
- Full `tests/audit/`: `65 passed / 1 failed`.
- The 1 remaining failure — `test_therapy_fit_v2_high_risk_behaviors::test_extract_biomarkers_ovarian_adds_platinum_resistant_tag` — is **pre-existing and out of scope** (asserts every ovarian patient is auto-tagged platinum-resistant by disease alone; unrelated to any mandate; not touched; fails on pristine code).

**Validation commands to reproduce after applying edits:**
```
python -m pytest -q tests/audit/test_ccne1_cna_integration_pilot.py tests/audit/test_serial_sae_signal_pilot.py
python -m pytest -q tests/audit/test_resistance_prophet_production.py
python -m pytest -q tests/audit/
```

---

## GENE UNIVERSE VERDICT (mandate #5, honest)

| Gene | CN-mediated? | Pilot focal CNA | Verdict |
|---|---|---|---|
| PTEN | yes (TSG loss) | 1 focal DEL (IM_280) | CANDIDATE upgrade — needs cohort |
| PALB2 | partial (mostly truncating SNV) | 1 focal DEL (JBLAB-4110) | CANDIDATE — SNV caveat |
| CUL3 | partial (NRF2 axis) | 1 focal DEL (IM_280) | CANDIDATE — partial |
| KEAP1 | weak (resistance = SNV LoF) | 2 amp events, wrong direction | STAYS LITERATURE_ONLY |
| SLC31A1 | yes (CTR1 influx) but not assessable at sWGS | 0 | STAYS LITERATURE_ONLY |

3/5 candidate-with-evidence, 2/5 unchanged, **0/5 full VALIDATED from n=4**. None
of these point-mutation mechanisms are callable at ~0.1x sWGS.

---

## HONESTY BOUNDARY (explicit)

- No component is labeled "clinically validated" (a regulatory term of art).
- The Serial-SAE threshold is a pilot demonstration (n=4, wide CI), stamped
  `PILOT_DEMONSTRATION_N4_NOT_CLINICAL`, confidence capped at 0.40. It is not a
  fitted model and cannot be mistaken for one.
- The KELIM logit stays `DISCOVERY_ONLY_NOT_CALIBRATED`. Re-fitting requires a
  real serial CA-125 cohort with outcomes (ARIEL2/3, GOG-0218), which remains
  access-gated.
- ctDNA stays `WIRED_PROGNOSTIC_ONLY_V1` by design.
- **No git commit was made.** All changes are for review first, per governance.
