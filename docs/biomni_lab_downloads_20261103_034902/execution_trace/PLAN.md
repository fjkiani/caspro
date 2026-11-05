# PLAN — Resistance Prophet / S3: repository audit, evidence reconstruction, and staged clinical-proof program

**Author:** Biomni for Fahad Kiani · **Date:** 2026-08-19 · **Mode:** plan proposal, awaiting approval
**Governing instruction:** treat S3 as a serious Resistance Prophet candidate, not a clinical product; identify exactly what evidence closes the gap. Execute; do not dismiss and do not clinically overstate.

---

## 0. What Phase-1 reconnaissance changed

Read-only reconnaissance is complete. Three of the directive's named anchors do not exist as stated, and one
of its headline numbers does not exist at all. The plan below is built on what is actually on disk.

### 0.1 Grounded facts (each verified this session)

| # | Fact | Evidence |
|---|---|---|
| F1 | **S3 documented result is AUROC 0.2715** (95% CI 0.1532–0.4058), MWU p=0.0017, reported protective as 1−AUROC = **0.7285**; only signature surviving BH-FDR across all 7 (**q=0.0118**) | `serial_sae_validation/obligations/tables/obl3_report.json`; `obl3_all7_signatures_bh.csv`; `OBL3_SIGNATURE_IDENTITY.md`; `CLAIM_LEDGER.md` row 4 |
| F2 | ~~**AUROC 0.8807 exists nowhere**~~ — **SUPERSEDED / RETRACTED during execution.** The number is at `Brenus/clinical_validation/trackA/s3_diag_cv_validation.json` (`cv_auroc_mean_for_resistance` = 0.8807231800766283, n=67, 9 events). It is `1 − AUROC(raw s3)` to 1.1e-16 within folds. See `unsourced_numbers_forensic.md` §1–2 | superseded by all-refs sweep, this session |
| F3 | Nearest number is **0.8739** = `roc_auc_score(y_rclass, s7_rel)`, n=40, **3 events** — *s7 at relapse, not S3* | `obl2_auroc_summary.csv`; `CLAIM_LEDGER.md` row 1 |
| F4 | That 0.8739 **reverses to 0.3136** when only the outcome label is swapped to registration platinum status on the *same fixed 40-patient feature matrix* | `obl2_auroc_summary.csv`; `obl2_invariants.json`; `CLAIM_LEDGER.md` row 3 |
| F5 | Primary S3 cohort is **n=98, 20 resistant / 78 sensitive**. **Nine events** is the *covariate-adjusted* subset only: n=67, 9 events, 5 covariates, EPV 1.8, `UNDERPOWERED_FLAG: true` | `obl3_report.json` → `covariate_completeness`, `adjusted_logistic` |
| F6 | Adjusted effect: MLE OR **0.0252**/SD (p=0.0141); Firth companion OR **0.0825**/SD (Wald p=0.0095) — same protective direction, so not a separation artifact. Cox OS HR **0.6869**/SD (p=0.043), Schoenfeld global p=0.2251 | `obl3_report.json`; `CLAIM_LEDGER.md` rows 5–6 |
| F7 | ~~**`s3_diag_cv_validation.json` does not exist on disk.**~~ — **SUPERSEDED / RETRACTED during execution.** The file exists on `main` and 20+ `origin/*` refs of `fjkiani/Brenus`. What genuinely does not exist is the *script that produced it*, the fold assignments and the OOF predictions — a receipt without provenance (register row C04) | superseded by all-refs sweep, this session |
| F8 | **`03_resistance_association.py` exists** (`biomarker_subsystem/serial_sae_pipeline/`) but tests **breakpoint-delta, not S3**; requires a `subject_ledger_FILLED.csv` that does not exist; self-gates at n≥40 / ≥15 events per arm → would return `discovery_only` | file read, this session |
| F9 | **`api/services/synthetic_lethality/ovarian.py` does not exist** in any commit. Real paths: `api/services/resistance_prophet/signals/ovarian.py` (backend) and `biomarker_subsystem/code/resistance_prophet/ovarian.py` (47 KB) | `git log --all --diff-filter=A`; `ls` |
| F10 | **S3 appears in 0 lines of the backend repo on every branch** (`git grep -i s3_diag` over all refs = 0). No code path from S3 to the served API | this session |
| F11 | **The shipped Resistance Prophet is not a fitted model** — no `.fit()`, `predict_proba`, `coef_`, joblib or pickle anywhere in `api/services/resistance_prophet/`. `compute_probability` is a hand-weighted confidence×reliability mean | `aggregation.py`, `engine.py`, `baseline.py` |
| F12 | **Live code-vs-ledger contradiction.** `constants.py: SIG7_RISK_THRESHOLD = 0.25` ("BriTROC Midpoint … Draft Heuristic") → `prognosis.py`: `sig7 >= 0.25` ⇒ `PrognosisState.POOR` ⇒ `action_recommendation = "INTENSIFY_SURVEILLANCE"`. Its only evidentiary basis is the 0.8739 that `CLAIM_LEDGER.md` row 3 classifies as a **label artifact** | `constants.py:29`; `prognosis.py:43–51`; `engine.py:150–173` |
| F13 | **Signature-namespace mismatch on the same path**: threshold derived from Macintyre/BriTROC 7-signature s7, but read from `molecular_profile.signatures.cosmic_cn_signatures.Sig7` — a different framework (COSMIC CN7 ≠ Macintyre s7) | `prognosis.py:70–80` |
| F14 | **QC gate is fail-open**: "Pass if no specific QC metrics found (lenient for MVP)"; MAPD>0.3 is a placeholder | `prognosis.py:_check_qc` |
| F15 | **The `0.10` threshold has no provenance** — no `s3_diag < 0.10` rule in any file. (s3_diag SD = 0.1337 per `obl3_report.json`; 0.10 is inside the exposure range but is not a repository constant) | grep, this session |
| F16 | **Source data is publicly re-downloadable and checksummed.** Nature Comms MOESM10, HTTP 200, 10,603,503 B, SHA256 `2f7f15417e3a5076633dd75abbad75a26285d94ec1e26f8f22ebf10d337a0a3f`, contains `figure_4A.tsv`, `figure_1B_layer_1.tsv`, `figure_2.tsv` — the exact three inputs of `obl3_build_patient_table.py`. Prior working copy `/workspace/obl_work` was lost to machine recreation | downloaded + `unzip -l` + `sha256sum`, this session |
| F17 | **No PFI/PFS field exists in the open data.** `figure_1B_layer_1.tsv` `event` ∈ {`diag`, `os`} only. Sole platinum-response field is binary `pt_sensitivity_at_reg` ∈ {resistant, sensitive} | column enumeration, this session |
| F18 | Full BriTROC-1 clinical cohort in `figure_1B` = **273 patients (66 resistant / 207 sensitive, 24.2%)**; S3 analysis set = **98 (20 resistant, 20.4%)** → 64% attrition requiring an evaluable diagnosis-stage CN sample | row counts, this session |
| F19 | Per-patient purity / ploidy / immune are **not released** in these tables → that confounder sensitivity is *not testable*, and is already recorded as such | `obl3_report.json` → `sensitivity`; `CLAIM_LEDGER.md` row 8 |
| F20 | `CLAIM_LEDGER.md` row 9 already **prohibits** "durable, independent biomarker"; row 15 corrects s7≠CCNE1; row 16 records ρ=−0.711 as `NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED` | `CLAIM_LEDGER.md` §A, §C |

### 0.2 The single most consequential finding

F12 + F13 + F14 together: **production code emits a care-influencing recommendation (`INTENSIFY_SURVEILLANCE`)
from a threshold whose supporting statistic this repository's own binding claim ledger classifies as an
artifact of label definition, reading a field from the wrong signature framework, behind a fail-open QC gate.**
Writing a Gate A–F proof program while leaving that live would be internally incoherent. It is therefore in scope.

---

## 1. Decisions taken (delegated by user) and material assumptions

| Decision | Choice | Rationale |
|---|---|---|
| **D1 — unsourced numbers** | Proceed on the documented **0.2715 / 0.7285** at 98 pts / 20 events. Record `0.8807` and `0.10` as `UNSOURCED_IN_REPOSITORY` with the near-miss candidates (0.8739 s7-RECIST; s3 SD 0.1337) documented as explicit non-matches. A bounded all-branch forensic sweep runs anyway as part of W1, since W1 already walks every ref. | Nothing will be reconstructed to fit an unsourced number. If the sweep finds a source, it is reported; if not, that null is reported. |
| **D2 — s7 remediation scope** | **Fail-closed guard + full documentation.** Neutralise only the care-influencing output (`action_recommendation`, `POOR`/`FAVORABLE` state) behind an explicit research flag; document F13 (namespace) and F14 (fail-open QC) with evidence and a proposed patch, deferring those code changes. | Repo baseline is RED (226 failing/erroring nodes on `main`). Minimum blast radius that still closes the active safety hole. |
| **D3 — endpoint** | `ENDPOINT_v1` = binary `pt_sensitivity_at_reg` as **primary** (it is what 0.2715 was computed on and what the source study uses for "primary platinum resistant"). The five-class contract is written as a versioned specification with each unavailable class marked `NOT_DERIVABLE_FROM_OPEN_DATA` and the exact missing field named. PFI reconstruction is **proven impossible** (F17), not assumed. | Evidence-settled, not a preference. |
| **D4 — push target** | Push to **`fjkiani/Brenus`** using the PAT held in user memory (the designated evidence repository). Backend service integration additionally lands as a **complete applyable patch series + local review branch + verified git bundle** for `crispro-backend-v2`. | No usable credential for `crispro-backend-v2` remains on disk; MCP GitHub 404s on that private repo. This delivers a real PR now and a reviewable, apply-ready integration for the backend. |

**Assumptions recorded:** (A1) the memory PAT for `fjkiani/Brenus` is current and authorised for this use;
(A2) the previously chat-exposed `crispro-backend-v2` PAT is treated as compromised and is **not** used;
(A3) `pt_sensitivity_at_reg` in the open tables is the GCIG-convention primary platinum classification at
registration, per the source study's own usage — this is stated as a source-attributed definition, not an
independent adjudication.

---

## 2. Workstreams

Compute is trivial (n=98; largest job ≈ 10⁴ permutations and 2×10³ bootstraps on ≤98 rows). Single core on
`genie` is sufficient; **no machine reservation requested**. Estimated total wall time ≈ 25–40 min.

### W1 — Executable architecture map and contradiction register (§1)
- Walk **every ref** in all 16 on-disk repos (`crispro-backend-v2`, `Brenus`, `crispro`, `zetabridge`, `clean_clone`, and the zc4/pr build clones) plus `fjkiani/Brenus` remote refs, searching for: `Resistance Prophet` / `resistance_prophet` / `predict_resistance`; `s3_diag` / `cn_signature_3` / `s3@diagnosis`; HRD/BRCA feature keys; platinum-response / resistance / refractory / PFI / progression endpoints; `03_resistance_association.py`; `s3_diag_cv_validation.json`; `synthetic_lethality/ovarian.py`; ERBB2 bridge; Zeta-Core scoring; and every threshold / calibration / recommendation / refusal construct.
- Emit `architecture_map.md` + machine-readable `architecture_map.json`: nodes = raw assay inputs → feature generation → model fitting → validation → API scoring → router → response field; edges annotated with the file:line that implements them, and **`DEAD`** where no caller exists.
- Emit `contradiction_register.csv`: one row per contradiction with severity, the code artifact, the contradicting test/receipt/ledger row, and the required resolution. F12/F13/F14 seed it; W1 completes it.
- Also emit the D1 forensic result for `0.8807` / `0.10`.

### W2 — From-source reproduction of S3 (§2, first half)
- Re-download MOESM10, assert SHA256 `2f7f154…7a0a3f`, record per-file SHA256 for the three inputs. Pin package versions; fix seeds.
- Re-run the equivalent of `obl3_build_patient_table.py` from source and **diff the rebuilt patient table against the archived `obl3_patient_master.csv`** cell-by-cell. Report exact concordance or the discrepancy. This is the reproduction claim; it is only made if the diff is clean.
- **Denominator reconciliation** (F18): 273 clinical → 98 with complete diagnosis exposures → 67 with complete covariates → 9 adjusted events. Report attrition at each step with the reason, plus a **selection test**: is `pt_sensitivity_at_reg` associated with inclusion in the 98 (Fisher exact)? Non-random selection is a stated threat to validity either way.
- Verify and report: outcome definition and time origin; subject-level exclusions and missingness pattern; protective direction and the resistance-axis reversal arithmetic (AUROC 0.2715 ↔ 0.7285); AUROC/AUPRC with bootstrap CI; **permutation test ≥10,000 label permutations**; prevalence baseline (AUPRC null = 20/98 = 0.204); Brier and calibration; threshold-specific Sens/Spec/PPV/NPV with CIs.
- **Explicit methodological note that will be stated, not hidden:** raw `s3_diag` used as a ranking score has *no fitted parameters*, so its AUROC needs no cross-validation — OOF and apparent AUROC coincide. Cross-validation becomes necessary the moment a threshold is chosen, a model is fitted, or calibration is applied. Conflating these is the most common way a signal like this is oversold.

### W3 — Incremental value over the existing HRD/BRCA axis (§2, second half)
Four models, **identical fold indices**, repeated stratified CV (5-fold × 20 repeats = 100 fits/model), all preprocessing/selection/threshold/calibration **inside training folds**, Firth-penalized logistic primary (reusing `firth.py`), ridge as sensitivity:

| Model | Features | Notes |
|---|---|---|
| **M0** clinical baseline | age_z, stage_adv, num_lines | 3 params on 9 events → penalization mandatory |
| **M1** S3 only | s3_diag | |
| **M2** existing Prophet | shipped s7 rule (`s7 ≥ 0.25` ⇒ resistant) as fixed binary **and** s7 exposure as continuous score | Faithful instantiation of production code (F11/F12); it is the only shipped component computable from BriTROC inputs. Directly tests the live production rule. |
| **M3** existing + S3 | M0 + s3_diag; and s7 + s3_diag | |

- **Denominator honesty:** the four-model comparison requires a common complete-case set, which is **n=67 / 9 events** (this is where the directive's "nine events" genuinely lives). It runs there as primary, flagged severely underpowered, with within-fold imputation on n=98 as a prespecified sensitivity analysis. M1-vs-prevalence runs on the full n=98 / 20 events.
- Report ΔOOF AUROC / ΔAUPRC / ΔBrier with **paired bootstrap** (same resamples across models), calibration intercept & slope with CI, **decision-curve net benefit** across threshold probabilities, and LRT **only** for genuinely nested full-data fits (stated as non-OOF evidence).
- **The crux question — does S3 merely restate HRD/BRCA?** Direct tests: s3 vs `brca_mut` vs `hr_gene_mut` as competing predictors; ΔAUROC of (brca+hr) → (brca+hr+s3); adjusted s3 effect given both; and the existing BRCA-stratified AUROCs (mut 0.021 n=19/3R; wt 0.329 n=79/17R) re-derived with CIs. A stratum with 3 events supports no conclusion and will be labelled as such.
- Influence: LOEO (prior range 0.235–0.283), leave-one-subject-out, dfbeta on the Firth fit.

### W4 — Endpoint contract (§3)
`ENDPOINT_CONTRACT_v1.md` + `.json`: primary = binary registration classification; five requested classes enumerated with status —
`primary_refractory` / `censored_before_assessable` / `indeterminate` = **`NOT_DERIVABLE_FROM_OPEN_DATA`**, with the exact missing fields named (date of last platinum dose; date of RECIST/GCIG-CA125 documented progression; per-visit assessability status; treatment-completion date). Alternative definitions (RECIST-derived `rclass`; any future PFI-in-months rule) preserved as prespecified sensitivity arms with the F4 label-swap result attached as a standing warning about label choice.

### W5 — Locked candidate specification (§4)
`MODEL_CARD.md` + `candidate_spec_v0.1.0.json`: prespecified S3 feature, penalization, nested-CV protocol, direction constant, and versioned threshold record. **0.10 treated as a candidate only** — fold-specific optimal cutpoints across the 100 folds, stability envelope, bootstrap CI of the cutpoint, and an explicit accept/reject verdict on 0.10 based on whether it sits inside that envelope. Prohibitions encoded in the artifact: no AUROC→"confidence" conversion; no calibrated-probability claim unless calibration slope CI supports it; no threshold lock without a version bump.

### W6 — Research-only service integration (§4/§6)
- `resistance_prophet/s3_research.py` (new): S3 feature contract, direction constant, versioned candidate scorer, provenance/checksum enforcement at load.
- Gated on `ZETA_S3_RESEARCH_ENABLED=1`. Flag off ⇒ **no S3-derived value reaches any response field**. Flag on ⇒ every S3 output carries `research_only: true`, `intended_use: RANKING_ONLY`, no `probability`, no `action_recommendation`, no `treatment_recommendation`.
- **D2 guard:** wrap the s7 prognosis care-action so `action_recommendation` and the `POOR`/`FAVORABLE` state are not emitted unless explicitly enabled; default becomes `UNCERTAIN` + no action. Document F13/F14 with a proposed patch, not applied here.

### W7 — Adversarial test suite (§6)
1. **Leakage** — outcome-derived feature injection must raise; assert scaler/imputer params differ across folds; a deliberately-leaked pipeline must be detected.
2. **Direction reversal** — sign flip of s3 must flip the score; a declared direction contradicting the locked constant must refuse.
3. **Schema drift** — `cosmic_cn_signatures.Sig7` vs Macintyre `s7` namespace must **raise**, not silently return `None` (this is the shipped F13 bug).
4. **Threshold substitution** — substituting any threshold without a version bump + provenance record must be rejected.
5. **Clinical-route influence** — with the flag unset, assert no S3 value appears in any care-influencing field; with it set, assert `research_only` is present on every S3 output.

Every new test is run against the **RED baseline** (226 pre-existing failing/erroring nodes on `main`). New tests passing will **not** be presented as a green repository.

### W8 — Gate A–F evidence program (§5) and publication (§6)
`CLINICAL_PROOF_PROGRAM.md` — per gate: required data, owner, analysis, acceptance criterion, current status (see §3 below). Plus `PROSPECTIVE_PROTOCOL_SKELETON.md`.
Publish to `/mnt/results/resistance_prophet_s3/` with `SHA256SUMS`, verify `sha256sum -c` rc 0, commit to review branch `review/resistance-prophet-s3-candidate`, push to `fjkiani/Brenus`, open **draft** PR; emit backend patch series + bundle.

---

## 3. Gate A–F status as currently assessable (to be finalised in W8)

| Gate | Reachable with data on hand? | Blocking gap (exact) |
|---|---|---|
| **A** analytical validity | **Partial pass achievable.** Checksummed public source, pinned versions, deterministic seeds, byte-identical rerun, provenance enforcement | Run-to-run reproducibility on *published exposures* only. Cross-site/batch/specimen reproducibility **not assessable**: needs raw shallow-WGS BAMs per sample + QDNAseq/`CNsignatures` pipeline version + per-sample MAPD. Not in open data |
| **B** internal clinical validity | **Conditional pass, ranking only.** Frozen SAP, OOF performance with uncertainty, leakage/optimism/influence audits all achievable | Calibration is not credibly estimable at 9–20 events; claim must be explicitly limited to ranking. Subgroup analysis at 3 events (BRCA-mut) is uninformative |
| **C** external retrospective | **BLOCKED** | Needs an independent HGSOC cohort with diagnosis-stage CN signature exposures + registration platinum classification from different sites/periods. Candidate leads on disk to be assessed in W1: `argo_resistance_audit/`, `britroc1_cn_validation/frozen_snapshot/`, EGA `EGAD00001011049`. Sizing must be driven by **event count and CI width**, not total n |
| **D** prospective silent | **BLOCKED** | Registered protocol, prospective assay + scoring pipeline, drift/turnaround instrumentation. None exists |
| **E** clinical utility | **BLOCKED** | Requires a named decision the score changes and a prospective interventional comparison. No such decision is currently specified |
| **F** governance | **Partial.** Model card, intended-use statement, versioning, change control, checksum/provenance and monitoring hooks delivered in W5–W8 | IRB / clinical / quality / regulatory review not obtained; must precede any care-changing use |

---

## 4. What will NOT be claimed

- No conversion of any AUROC into a "confidence" or per-patient probability.
- No calibrated-prognosis claim unless the calibration-slope CI supports it (it is not expected to at these event counts).
- No "durable" or "independent" biomarker language — `CLAIM_LEDGER.md` row 9 already prohibits it and this work does not lift that.
- No reconstruction of `0.8807` or `0.10` to make the directive's numbers appear supported.
- No presentation of new passing tests as a green repository (baseline is RED, 226 nodes).
- No claim of reproduction unless the rebuilt patient table diffs clean against the archived table.

## 5. Stop conditions

- If the rebuilt patient table does not reconcile with `obl3_patient_master.csv`, W3 halts and the discrepancy becomes the deliverable.
- If the `fjkiani/Brenus` PAT fails, W1–W7 complete regardless and W8 degrades to local branch + verified bundle + patch series (D4 fallback), reported explicitly.

## 6. Deliverables (all under `resistance_prophet_s3/`)

`architecture_map.md` · `architecture_map.json` · `contradiction_register.csv` · `unsourced_numbers_forensic.md` ·
`s3_reproduction_report.md` · `denominator_reconciliation.csv` · `ENDPOINT_CONTRACT_v1.md`/`.json` ·
`incremental_value.csv` · `oof_predictions.csv` (subject-level) · `threshold_stability.csv` ·
`MODEL_CARD.md` · `candidate_spec_v0.1.0.json` · `CLINICAL_PROOF_PROGRAM.md` ·
`PROSPECTIVE_PROTOCOL_SKELETON.md` · `figures/*.png` · `SHA256SUMS` ·
code: `s3_pipeline/*.py`, `tests/test_adversarial_*.py`, backend patch series + bundle.

Final response answers §7 directly: reproducible signal (yes/no), incremental value over clinical/HRD (yes/no),
supportable intended use now, missing evidence per stronger claim, next falsifiable experiment.
