# Resistance Prophet — executable architecture map

**Scope.** Every ref (local and `origin/*`) of 16 on-disk clones spanning 4 distinct remotes
(`fjkiani/Brenus`, `fjkiani/crispro`, `fjkiani/zetabridge`, `fjkiani/crispro-backend-v2`) was searched
for the constructs named in the directive. Paths below were located by that sweep, not guessed.
Machine-readable form: `architecture_map.json`.

---

## 1. The flow, as it actually executes

```
  RAW ASSAY                    FEATURE GENERATION            MODEL / VALIDATION            SCORING            SERVED API
  ---------                    ------------------            ------------------            -------            ----------

  shallow WGS BAMs
  EGAD00001011049  ──X──▶  (QDNAseq + CNsignatures)   ── outside this repository ──▶  s1..s7 exposures
  [not in workspace]              │
                                  ▼
  Nature Comms MOESM10  ────▶ obl3_build_patient_table.py ──▶ obl3_patient_master.csv ──▶ obl3_s3_quantification.py ──▶ obl3_report.json
  sha256 2f7f1541…  (verified)     │  (reproduced: 0 mismatched cells)                        │  (reproduced exactly)
                                  │                                                          │
                                  └──▶ s3_pipeline/ (this audit) ─────────────────────────────┘
                                                                                             │
                                             s3_diag_cv_validation.json  ◀── ??? ────────────┘   producing script ABSENT
                                                       │
                                                       ▼
                                        score_cn_resistance.py  (4 pinned floats)
                                        sigmoid(β0 + β1·z(s3))
                                                       │
                                                       ╳  NO EDGE  ──────────────────────────────────────────────┐
                                                                                                                 │
  ── the served API, entirely separately ─────────────────────────────────────────────────────────────────────────┤
                                                                                                                 │
  patient_data dict ──▶ prognosis.py:74                ──▶ prognosis.py:43  sig7 ≥ 0.25          ──▶ engine.py:173 ──▶ shim.py:118
                        molecular_profile.signatures        ⇒ PrognosisState.POOR                    prognosis=        "prognosis": asdict(...)
                        .cosmic_cn_signatures.Sig7          ⇒ action = INTENSIFY_SURVEILLANCE                             │
                        (missing ⇒ None, silently)          (constants.py:29, "Draft Heuristic")                          ▼
                                                                                                          7 routers / services
```

The two halves of that diagram never meet. `git grep -i s3_diag` over **every ref** of
`crispro-backend-v2` returns **0 lines**. The S3 axis — the only component in this organisation with a
reproducible, FDR-surviving association to platinum resistance — is not wired to anything. The component
that *is* wired to the API is the s7 rule, whose own supporting statistic this repository's claim ledger
classifies as a label artifact.

---

## 2. Layer-by-layer, with file:line

| Layer | Node | Path | Status |
|---|---|---|---|
| Raw assay | shallow WGS | EGA `EGAD00001011049` | **EXTERNAL / CONTROLLED** — the only place Gate A analytical reproducibility of s3 could be tested; absent here |
| Raw-assay surrogate | published source data | MOESM10 zip, sha256 `2f7f15417e3a5076…`, 10,603,503 B | **LIVE, VERIFIED** — exposures are pre-computed; s3 is *not* recomputable from these files |
| Feature generation | `obl3_build_patient_table.py` | `serial_sae_validation/obligations/scripts/` | LIVE; independently reproduced (0 mismatched cells) |
| Feature generation | `s3_pipeline/` | `resistance_prophet_s3/code/s3_pipeline/` | **NEW** (this audit) |
| Model fitting / validation | `obl3_s3_quantification.py` | same dir | LIVE; reproduced **exactly** (AUROC 0.2715; MLE OR/SD 0.0252 p 0.0141; Firth 0.0825 p 0.0095; Cox OS HR/SD 0.6869 p 0.043; Schoenfeld 0.2251) |
| Validation receipt | `s3_diag_cv_validation.json` | `Brenus/clinical_validation/trackA/` | **LIVE RECEIPT, BROKEN PROVENANCE** — present on `main` and 20+ `origin/*` refs; no producing script, no fold record, no OOF predictions |
| Scoring candidate | `score_cn_resistance.py` | `Brenus/clinical_validation/pipeline/` | **LIVE BUT UNWIRED**; `score_from_cn_features()` raises `NotImplementedError` by design |
| Validation | `03_resistance_association.py` | `crispro/publications/14-hgsoc-biomarker-subsystem/04-serial-sae/scripts/` | **DEAD** — tests breakpoint-delta not S3, needs a `subject_ledger_FILLED.csv` that exists nowhere, self-gates at n≥40/events≥15 ⇒ `discovery_only` |
| API scoring | `engine.py` | backend `api/services/resistance_prophet/` | LIVE, **not a fitted model** — no `.fit()`, `predict_proba`, `coef_`, joblib or pickle anywhere in the package |
| API scoring | `prognosis.py:43-51` | backend | **LIVE, UNSAFE** — see §4 |
| API response | `shim.py:118` | backend | LIVE — `"prognosis": asdict(prediction.prognosis)` puts the care-influencing state on the wire |
| Routing | 7 consumers | `resistance_prophet_service.py:12` → `complete_care_universal.py:49,1287`; `ayesha.py:143,189`; `ayesha_therapy_fit.py:1501-1503`; `resistance_predict.py:22,146`; `ayesha_care_plan/resistance_service.py:15-18,140,198,261`; `holistic_score/service.py:72-73` | LIVE |
| Unrelated subsystem | ERBB2 bridge, Zeta-Core scoring | `holistic_score/utils.py`, `ayesha_fit/expected_mechanism.py`, `rss_service.py`, `canine/tcc_*.py` | **LIVE, DISCONNECTED** — 783 ERBB2 and 455 zeta-core references, none reads a CN-signature exposure |

Sweep counts, deduplicated by `repo|path`: resistance-prophet naming 1,937 · `s3_diag`/`cn_signature_3` **15** ·
HRD/BRCA keys 7,235 · platinum/resistance/refractory/PFI/progression 730 · `03_resistance_association` 10 ·
`s3_diag_cv_validation` 4 · **`synthetic_lethality/ovarian` 0** · ERBB2 783 · zeta-core 455 ·
threshold/calibration/recommendation/refusal 15,097.

---

## 3. Duplicated calculations

**Three implementations of one monotone function.** The raw-exposure AUROC, the CV'd logistic in the
receipt, and the pinned production sigmoid are the same ranking. Within-fold, the fitted model's AUROC
equals `1 − AUROC(raw s3)` to **1.1 × 10⁻¹⁶** across 1,000 test folds. They differ only in scale and in
whether a probability is emitted — and emitting a probability is the part that fails (Brier 0.1484 vs
0.1163 for predicting prevalence).

**Two sources for one label.** `figure_1B_layer_1.tsv` labels all 273 patients;
`figure_2.tsv` labels 134. Where both exist the labels agree **134/134**.
`britroc_master_published.csv` joins the label only from `figure_2`, so it carries `NaN` for 64 patients
and **loses 19 resistance labels** that `figure_1B` supplies. That is a join loss, not a labelling conflict —
but it silently shrinks the usable cohort.

---

## 4. Contradictions between code, tests and receipts

Full register with severity and evidence: `contradiction_register.csv`. The consequential one:

> `constants.py:29` sets `SIG7_RISK_THRESHOLD = 0.25` with the inline comment
> *"BriTROC Midpoint (Res=0.333, Sens=0.166). Draft Heuristic."*
> `prognosis.py:43-51` turns that draft heuristic into `PrognosisState.POOR` and
> `action_recommendation = "INTENSIFY_SURVEILLANCE"`. `engine.py:173` attaches it;
> `shim.py:118` serialises it; seven routers consume it.
>
> Its evidentiary basis is the s7 AUROC 0.8739 that `CLAIM_LEDGER.md` row 3 classifies as
> **an artifact of label definition** (0.8739 → 0.3136 on the same 40-patient feature matrix when only the
> outcome label changes), and that `sig7_cv_falsification.json` collapses to **0.421** at n=67/15 events.
> Measured on identical folds in this audit, the shipped rule scores OOF AUROC **0.6446** with Brier
> **0.2090** — worse than predicting the cohort prevalence (0.1163).
>
> The value is read from `molecular_profile.signatures.cosmic_cn_signatures.Sig7` (`prognosis.py:74`) —
> **COSMIC CN7, not Macintyre s7**. Different framework, different definition. A missing key returns
> `None` silently. The QC gate (`prognosis.py:86-101`) returns `True` when no QC metrics are found
> ("lenient for MVP") and a bare `except` also returns `True`: **fail-open**.

Direction is also inverted relative to the source literature: in Macintyre 2018, s7 is a *good-outcome*
signature; the canonical resistance axis is s1 (RAS/MAPK, anti-correlated with s3).

---

## 5. What the map establishes

1. **The signal and the product are in different repositories and never touch.** S3 has zero
   occurrences in the backend on every branch.
2. **The shipped Resistance Prophet is not a model.** It is a deterministic rule engine;
   `compute_probability()` is a hand-weighted `confidence × baseline_reliability` mean.
3. **The one live S3 artifact with pinned parameters is honest about itself** — `RUO`,
   "NOT clinically proven", "MISCALIBRATED … use rank/threshold not probability",
   "RE-DERIVES a known HRD/platinum-sensitivity axis". Those labels are correct and this audit confirms them.
4. **The validator that should test resistance association is disconnected**, and the CV receipt that
   carries the strongest-looking number has no producing script.
5. **The only care-influencing path that exists is the one with the weakest evidence.** That is the
   inversion this program has to fix, and it is why the fail-closed guard in `backend_patch/` is part of
   this deliverable rather than a later ticket.
