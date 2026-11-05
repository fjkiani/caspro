# Ovarian HGSOC Resistance & Biomarker Framework — v3 Spine (Integrated)

**Status: RESEARCH USE ONLY (RUO). No component is labeled "clinically validated."**
**Cancer template shipped: ovarian high-grade serous (HGSOC). Breast / CRC: scaffolded for follow-up.**

> **Scope of this report.** Sections 1–9 document the prognostic + diagnostic **biomarker
> subsystem** (4 discovery_only models). Sections A–H document the **resistance-engine
> components**. **Section R (new)** documents the **real-data validation pass** run on the acquired
> BriTROC-1 sWGS pilot BAMs (targeted gene copy-number readout, structural-evolution / breakpoint
> architecture, and the Subject-260 deep-dive) plus the **"flip the switches" reconciliation ledger**
> that maps every remediation demand to its true, code-grounded status. The consolidated acceptance
> receipt is `validation_receipts.json`; the real-data artifacts are in `real_data_validation/`.

> **Honesty boundary (non-negotiable).** "Clinical validation" requires locked protocols plus
> prospective / analytically-validated outcome cohorts that we do not have. Each component carries
> its **strongest honest tier**, not a clinical stamp. This report was explicitly asked to "flip
> discovery_only → validated" and to "flip DEGRADED → VALIDATED across all tracks." **Those flips
> were declined where they would require fabricating a passing validation receipt, disabling a
> code-enforced honesty gate, or reporting end-to-end results for code that cannot be executed this
> session.** What was done instead — a real-data evidence pass on the pilot BAMs, an honest per-gene
> tiering, a ranked signal table, and a full reconciliation ledger — is documented below with every
> number traced to a receipt. See Section R.5 for the explicit decline rationale, and Section R.4 for
> the Subject 260 real-CN deep-dive.

---

## 0. Ranked signal table (production view across the three categories)

**Ranking key (locked):** (1) replication consistency `PASS_GATE > REPLICATES_1of2 > NEAR_NULL/NULL`;
(2) best independent external C-index (then |HR−1|); (3) earned tier. This orders and presents the
existing honest results for a production reader — **it changes no status.** All four subsystem
models remain `discovery_only`. Source: `real_data_validation/ranked_signal_table.csv`.

| Rank | Signal | Category | Status | Replication | Best ext. C-index (cohort) | Note |
|---|---|---|---|---|---|---|
| 1 | Riester 3-gene risk score | Prognostic | discovery_only | replicates 1-of-2 | **0.625** (GSE9891) | Signal in 1 of 2 independent cohorts; PH violated in both. Fails ≥2-cohort gate. |
| 2 | PI3K/mTOR panel (own) | Prognostic (scan) | discovery_only | near-null | 0.56 (best of 4) | Unsupervised mean-z scan; C-indices cluster near 0.5 across 4 cohorts. |
| 3 | DDR panel (own) | Prognostic (scan) | discovery_only | near-null | 0.53 (best of 4) | Unsupervised mean-z scan; C-indices cluster near 0.5 across 4 cohorts. |
| 4 | consensusOV molecular subtype | Diagnostic | discovery_only | descriptive | n/a (distributional) | Reproducible subtype *mixture*, composition-confounded (MES↔low purity p=6.3e-6). Not a per-patient validated call. |

**Reading this table honestly:** the ranking says *"Riester is the strongest of the four"* — it is
the only one that shows a real prognostic signal in any independent cohort. It does **not** say
Riester is validated. Rank #1 among four `discovery_only` models is still `discovery_only`.

## 1. What was built

The first prognostic + diagnostic biomarker subsystem for the Synthetic-Lethality (SL) multimodal
engine, built by **reproducing published, externally-validated methods** (no new marker invention)
and wiring them into the v3 spine behind three hard honesty gates. The subsystem is **advisory**: a
biomarker result attaches to the multimodal evidence surface as context and **never overrides**
SL drug routing.

Methods reused (run unchanged, in R / Bioconductor):
- **Prognostic** — Riester et al. ovarian survival signature (PMID 24700968, DOI 10.1093/jnci/dju048),
  reproduced as an elastic-net Cox risk score.
- **Diagnostic** — consensusOV HGSOC molecular-subtype classifier (Chen et al. 2018, PMID 30084834,
  DOI 10.1158/1078-0432.ccr-18-0784): random-forest consensus of the Helland / Bentink / Verhaak /
  Konecny classifiers.

## 2. Headline result (honest)

**Zero markers reach "validated" status. All four models ship `discovery_only`.** This is the
correct, non-overstated outcome under the external-replication bar the subsystem enforces.

| Model | Type | Status | Basis |
|---|---|---|---|
| Riester 3-gene risk score | Prognostic | discovery_only | Replicates in 1 of 2 independent GEO cohorts; PH violated in both |
| consensusOV subtype | Diagnostic | discovery_only | Reproducible mixture, but descriptive & composition-confounded |
| PI3K/mTOR panel (ours) | Prognostic (scan) | discovery_only | Near-null across 4 cohorts |
| DDR panel (ours) | Prognostic (scan) | discovery_only | Near-null across 4 cohorts |

## 3. Prognostic detail — external replication is inconsistent (verdict retained: discovery_only)

> **This section was explicitly asked to be "flipped."** It is not flipped, because the verdict is
> the correct output of a code-enforced honesty gate, not an editorial choice. The rationale and the
> data that force `discovery_only` are laid out below in full so the reader can audit the call. The
> only legitimate way to change this verdict is a **new** independent multi-cohort replication that
> passes the gate — not a wording change. See Section R.5 (reconciliation ledger).

Training: MetaGxOvarian **TCGAOVARIAN**, n=521, 281 events. Elastic-net Cox (alpha=0.5) retained
**3 of 18** signature genes: NUAK1, TGFBR2, LOX. 5-fold out-of-fold C-index = **0.539**
(95% CI 0.500–0.579) — near-null even in cross-validation.

The **frozen** 3-gene coefficients were then applied UNCHANGED to two **genuinely independent** GEO
cohorts (0 patient overlap with training):

| Cohort | n (events) | C-index (95% CI) | HR per 1 SD (95% CI) | PH test p | Verdict |
|---|---|---|---|---|---|
| **GSE9891** | 268 (113) | **0.625** (0.569–0.681) | 1.361 (1.133–1.634), p=9.8e-4 | 0.045 | signal present |
| **GSE32062** | 257 (120) | **0.509** (0.451–0.567) | 0.971 (0.803–1.173), p=0.76 | 0.025 | null |

A same-cohort reprocessing of the training data (TCGAOVARIAN via a second rendering) gives
C-index 0.572 — recorded as a **sensitivity check only, never external replication**, because it is
the same patients reprocessed, not an independent cohort.

**Verdict: discovery_only (retained).** The signature carries real prognostic signal in one
independent cohort but not the other, and the proportional-hazards assumption is violated in both —
so it is not a validated prognostic classifier. **Why the gate blocks a "validated" flip:** the
status gate requires the C-index CI to exclude 0.5 **AND** the HR CI to exclude 1, in the **same
direction**, in **≥2 independent non-overlapping cohorts**. Riester clears this in GSE9891 only;
GSE32062 is a measured null (HR 0.971, p=0.76). Marking it validated would require either fabricating
a second passing receipt (rejected by the grounding guard) or disabling the gate (`registry.register()`
raises). See `figures/fig1_prognostic_cindex_forest.png`.

## 4. Diagnostic detail — reproducible but composition-confounded

consensusOV was run unchanged on TCGAOVARIAN (n=536) and GSE9891 (n=276). Subtype **mixtures are
highly reproducible** across the two independent cohorts (cross-cohort total-variation distance =
**0.025**):

| Subtype | TCGAOVARIAN | GSE9891 |
|---|---|---|
| IMR (immunoreactive) | 27.6% | 27.9% |
| DIF (differentiated) | 29.9% | 27.9% |
| PRO (proliferative) | 19.4% | 18.8% |
| MES (mesenchymal) | 23.1% | 25.4% |

Calibration: mean RF assignment margin ~0.56; **~18% of samples are low-confidence** (margin < 0.2)
in both cohorts — meaningful classifier uncertainty, surfaced rather than hidden.

**Documented limitation (confirmed in our own run):** HGSOC transcriptomic subtypes are partly
driven by tumor cellular composition / TME rather than intrinsic epithelial state. In TCGA, the
**MES** call tracks with **lower tumor purity** (76% vs ~82%, Kruskal–Wallis p=6.3e-6) and **higher
stromal content** (18.4% vs ~10%, p=2.5e-7). The subtype call is therefore a **composition-aware
label, not an intrinsic epithelial subtype** (cf. Geistlinger et al. 2020, DOI
10.1158/0008-5472.can-20-0521). Because patients are not shared across the two studies, cross-cohort
concordance is **distributional, not per-patient**. Shipped `discovery_only`.
See `figures/fig2_diagnostic_subtypes_composition.png`.

## 5. Own-panel baseline scan (W4)

Our in-repo PI3K/mTOR (13 genes) and DDR (13 genes) panels were scored as unsupervised mean-z
prognostic signatures across four independent cohorts (TCGAOVARIAN, GSE9891, GSE32062, GSE49997).
C-indices cluster near 0.5 (PI3K/mTOR 0.51–0.56; DDR 0.45–0.53) — weak-to-null prognostic signal.
Both `discovery_only`.
**Caveat:** panel gene lists were loaded from canonical inline fallbacks, not the repo's own panel
JSON files (repo paths did not resolve on the worker). The scan validates the method wiring and uses
canonical genes, but not the exact repo panel definitions.

## 6. The three honesty gates (enforced in code + tests)

1. **Status gate** — a model is `validated` only if it reproduces (C-index CI excludes 0.5 AND HR CI
   excludes 1, same direction) in ≥2 **independent, non-overlapping** cohorts. One-of-two or any
   same-cohort-only evidence → `discovery_only`. `registry.register()` raises if a model is marked
   VALIDATED without a passing independent external receipt.
2. **Non-overlap guard** — raises when a claimed "independent" cohort shares the same study ID or
   overlapping TCGA patient barcodes with training (patient-level normalization).
3. **Grounding guard** — every number in a shipped interpretation string must trace to a written
   validation receipt; fabricated statistics are rejected. Run on every model before registration.

`get(cancer, type)` returns validated models only by default; discovery models require an explicit
`include_discovery=True`. All models carry the label **"RESEARCH USE ONLY. Not validated for
clinical decision-making."**

## 7. Verification (biomarker subsystem)

- Biomarker subsystem tests: **11/11 pass** (honesty gates, non-overlap guard, grounding guard, the
  advisory-only integration, and the explicit `discovery_only` outcome for the OV prognostic).
- Existing multimodal suite: **177/179 pass**. The 2 failures are pre-existing and unrelated to this
  work (a stale hardcoded axis-count expectation from earlier PI3K/mTOR axis work); confirmed by
  reproducing the identical failures with the new field reverted. The additive advisory
  `biomarker_context` field introduces **no regression**.
- Registry persisted and round-trips cleanly: 4 models, all `discovery_only`, none validated.

## 8. Files (biomarker subsystem)

- `biomarker_registry.json` — assembled registry (4 models, honest statuses).
- `receipts/` — W1–W4 machine-readable receipts (every reported number originates here).
- `r_scripts/` — reproducible R for the four analyses.
- `code/biomarkers/` — the Python subsystem (models, registry, grounding guard, assembler, tests).
- `real_data_validation/` — **(new)** pilot-CN gene readout, breakpoint architecture, Subject-260
  deep-dive, the switch-reconciliation ledger, the ranked signal table, and figures.

## 9. Next (biomarker subsystem)

- Reproduce a marker with **consistent** multi-cohort external replication to earn a first
  `validated` label under the same bar.
- Extend the template to breast and CRC (scaffolding in place).
- Wire the repo's actual panel JSON definitions into W4 (replace inline fallbacks).

---

# Part II — Resistance-engine components & integration (this build)

## A. Evidence tiers (locked, two-tier-per-component)

| Component | Method source | Real data used | Honest tier | Prophet wiring |
|---|---|---|---|---|
| PLCO CA-125 kinetics | KELIM-style log-linear slope + ROCA-family velocity | **PLCO 78,209-patient CSV, real incident-cancer outcome** | **externally validated (RUO)** — reproduce-within-CI on real outcomes | replaces crude peak−trough delta in kinetics MV |
| ctDNA / MRD | Paracchini et al., ESMO Open 2026;11(3):106087 (MITO16a/MaNGO-OV2a, HGSOC n=173) | paper supplement (reproduced exactly); no live sWGS | **reproduced-from-published (RUO)** | **wired prognostic-only (V1)** — never changes routing |
| KELIM-genotype convergence (Signal 6) | Colomban 2023 (ARIEL2, C-index 0.84) | simulation-anchored (no in-hand serial CA-125) | **simulation-anchored prior (RUO)** | fixed dead code; fires again; confidence cap 0.70 |
| Biomarker registry (4 models) | Riester / consensusOV / own panels | GEO + TCGA-OV | **discovery_only** (Part I) | advisory `biomarker_context`, never changes routing |

## B. PLCO CA-125 kinetics — real-data validated (RUO)

Built a longitudinal kinetics module from the local **78,209-patient PLCO Ovarian CSV**. Anchor
rule (locked): a timepoint counts only if CA-125 **level AND days** are present; not-done codes 8/9
are excluded; ≥2 completed points required; for cases, points on/after diagnosis are dropped
(leakage guard — 201/203 cases had all CA-125 strictly pre-diagnosis).

Validated as a predictor of **incident ovarian cancer** (`ovar_cancer`) on **202 cases / 28,573
controls** (28,775 slope-eligible patients), seed=7, bootstrap n=2000 CIs:

| Feature | AUROC | 95% CI | MWU p |
|---|---|---|---|
| **log-slope / year (primary)** | **0.652** | 0.605–0.695 | 4.6e-14 |
| velocity (secondary) | 0.654 | 0.605–0.699 | 2.1e-14 |
| peak CA-125 | 0.671 | 0.626–0.716 | 1.9e-17 |
| baseline CA-125 | 0.542 | 0.500–0.583 | 0.02 |
| combined slope+velocity (5-fold OOF) | 0.643 | 0.595–0.687 | — |

Cases have **~11× higher** mean log-slope (0.320 vs 0.028 ln/yr). Kinetics beat the single baseline
value; all CIs exclude 0.5. Consistent with published PLCO/ROCA CA-125 screening performance
(AUROC ~0.6–0.7). **Gate: PASS.** See `fig_plco_ca125_kinetics.png`.

Method provenance: log-slope + velocity faithfully reproduce the PLCO/ROCA-family CA-125 kinetics
approach (Xu et al. 2011, Gyn Oncol, DOI 10.1016/j.ygyno.2011.12.440; Blyuss 2018; Menon 2015;
Skates 2012; Pinsky 2012). **Boundary (retained, RUO):** validates a **screening** early-signal for
**incident** cancer only — NOT treatment resistance. v3 tested transfer to treatment context on 202
joined PLCO ovarian cases and found a **measured null** (`OUTCOME_CONTEXT_NULL_RUO`); the kinetics
method is therefore *not* repurposed as a resistance/outcome signal. This RUO boundary is
evidence-based and is **not** "flipped" — doing so would contradict the measured null.

Deploy artifacts produced (NOT executed against live Supabase — user deploys with their key):
`002_add_ca125_kinetics_columns.sql` rebuilds `plco_cancer_kinetics` adding `ca125_logslope`,
`ca125_velocity`, `ca125_baseline`, `ca125_peak`, `ca125_n_timepoints` (keeps legacy
`ca125_rise_delta`). `reproduce_plco_kinetics.py` reproduces every number from the CSV.

## C. ctDNA / MRD — reproduced-from-published, wired prognostic-only (RES-OV-P0-006)

Reproduced the Paracchini et al. 2026 tumor-agnostic sWGS MRD method (ichorCNA Tumor Fraction +
fragmentomics Proportion of Fragments) from the paper supplement (ESMO Open 2026;11(3):106087. DOI
10.1016/j.esmoop.2026.106087; 393 plasma samples / 173 patients, phase IV). B1 (post-surgery) n=167:

| Quantity | Reproduced | Paper |
|---|---|---|
| TF mean / median / range | 9.06 / 6.06 / 2.1–59.7 | 9.06 / 6.06 / 2.1–59.7 |
| PF mean / median / range | 0.137 / 0.128 / 0.032–0.297 | identical |
| Group sizes (Low/Disc/High) | 124 / 27 / 16 | 124 / 27 / 16 |
| Median PFS by group (mo) | 21.9 / 16.3 / 14.6 | 21.9 / 16.3 / 14.6 |
| TF~PFS Spearman rho (p) | −0.241 (0.0017) | −0.241 (0.0017) |
| 3-group log-rank PFS p | 0.0004 | ~0.0004 |

**Gate: PASS — all headline numbers reproduce exactly.** See `fig_ctdna_mrd_survival.png`.

**Wiring (honest ladder, retained prognostic-only):** `predict_resistance` gained an additive
`ctdna_context` param; `detect_ctdna_mrd_signal` bridges the reproduced classifier into Prophet and
emits a **prognostic-only** signal with `detected=False`. `compute_probability()` only consumes
signals where `detected and confidence>0`, so the ctDNA tier is **structurally excluded** from the
resistance probability and drug-routing count while still surfacing to the clinician. Provenance:
`ctdna_status: NOT_WIRED_INTO_PROPHET → WIRED_PROGNOSTIC_ONLY_V1`. A routing-invariance test proves
probability + risk level are identical with vs without ctDNA HIGH.

> **On the "hard-wire ctDNA into the probability model now" demand (RES-OV-P0-006):** the parameter
> already exists; the *probability-wiring* is intentionally gated off, not missing. Promotion to a
> decision-triggering ctDNA tier requires paired **live** sWGS reads (insert sizes) for real TF+PF
> and a calibration replay first. That live-plasma calibration cohort does not yet exist, so the
> gate stays closed by design. Reclassifying it as "wired into probability" without that calibration
> would be the same fabrication the honesty boundary forbids. Status: `WIRED_PROGNOSTIC_ONLY_V1`.

## D. KELIM Signal 6 — dead code fixed (RES-OV-P0-009)

`detect_kelim_genotype_convergence` read `kelim_obj.kelim`, which is always `None` after the P0-005
rename (the log-linear shim populates `kelim_obj.k`). Fix: read `.k` as primary with `.kelim` as
fallback. **This one-line fix was applied 2026-05-10 (PATCH 8), ~2 months before the remediation
audit that lists it as open — the audit line is stale.** The signal fires on unfavorable KELIM;
provenance records `kelim_field_used`. E2E proof with real `numpy.polyfit` (no mocks):
`KelimCa125(k=0.01365) → detected=True, provenance.kelim_k=0.01365`. Coefficients remain
**simulation-anchored priors** (Colomban 2023; confidence cap 0.70). The signal's calibration status
was separately downgraded to `DISCOVERY_ONLY_NOT_CALIBRATED` — the code runs; the model is not
fitted to in-hand outcomes.

## E. Integration — non-siloed, advisory, routing-safe

All new signals route through the **existing** contracts (no new orchestrator). The biomarker
registry projects into an advisory `BiomarkerContext` and attaches to the multimodal evidence
surface (`advisory_only=True`). An integration test proves a **single patient call** surfaces the
full ovarian signal family (restoration, escape, genomic, CA-125 kinetics, KELIM convergence,
ctDNA/MRD) **plus** the 4-model biomarker advisory context, and that **neither** the ctDNA prognostic
layer **nor** the biomarker context changes the resistance probability or risk level.

## F. Acceptance gate (this build)

- **Reproduce-within-CI:** PLCO kinetics AUROC CIs exclude 0.5 (PASS); ctDNA headline numbers exact
  (PASS); KELIM coefficients reproduce documented directional values (PASS).
- **Tests:** biomarker **11/11**; pre-existing resistance **23/23**; new wiring **9/9** = **43/43
  green**; **0 regressions introduced**.
- **Grounding guard:** passes on all biomarker interpretations.

## G. New files (this build)

- `validation_receipts.json` — consolidated per-component acceptance receipt (exact numbers).
- `fig_plco_ca125_kinetics.png`, `fig_ctdna_mrd_survival.png`.
- `real_data_validation/` — the new real-data pass (Section R).

## H. What would move a component to a higher tier (honest gates, not wording)

- **Riester prognostic → validated:** a **new** independent cohort in which the C-index CI excludes
  0.5 AND the HR CI excludes 1 in the same direction (with PH satisfied), giving ≥2 concordant
  independent cohorts. No such cohort was added this session; verdict retained.
- **PLCO kinetics → resistance validation:** requires a treatment cohort with during-chemo serial
  CA-125 + platinum-outcome labels (ARIEL2/3, GOG-0218). PLCO cannot supply this.
- **ctDNA → decision-triggering (V2/V3):** requires paired live sWGS reads (insert sizes) for real
  TF+PF, then a calibration replay before any decision-triggering.
- **KELIM Signal 6 → calibrated:** re-fit the coefficients on real serial CA-125 outcome data
  (replace the simulation priors) — the *code* is already operational; the *model* is not calibrated.

---

# Part R — Real-data validation pass on the acquired BriTROC-1 sWGS pilot

**Data:** BriTROC-1 (EGA dataset EGAD00001011049, study EGAS00001007292), acquired via authorized
pyega3 pull. Initial pilot = 8 BAMs / 4 subjects (191, 6, 119, 109); **Subject 260 (dx IM_426 /
relapse JBLAB-19323) was pulled and processed this session**, bringing the processed set to **10
BAMs / 5 subjects**, each a diagnosis→relapse pair.
**Method:** QDNAseq relative copy number, hg19, 30 kb bins, ~0.1× shallow WGS (sWGS).
**Resolution ceiling (applies to all of Part R):** sWGS at 30 kb bins detects **large CNA only**
(broad/focal amplification & loss spanning ≥ ~bin size). It does **not** detect SNV/indel, LOH
without CN change, or sub-bin focal events. **n=5 is a pilot, not a validation cohort.** No result in
Part R confers a clinical `VALIDATED` tier; the pass **upgrades evidence provenance** (literature-only
→ real pilot CN metric present) and produces structural-evolution intelligence, within the honesty
boundary.

## R.1 Gene-universe upgrade — targeted CN readout on the 5 LITERATURE_ONLY genes

Ran a targeted relative-CN readout at 6 hg19 loci (the 5 LITERATURE_ONLY genes + CCNE1) from the
real pilot segmented CN. **A CN metric now exists for every gene** (files:
`real_data_validation/gene_cn_per_sample.csv`, `gene_cn_dx_vs_relapse.csv`,
`gene_universe_pilot_evidence.csv`, `gene_universe_verdict.csv`).

| Gene | Resistance mechanism | CN-mediated? | Directional pilot CN events | Honest verdict |
|---|---|---|---|---|
| **PTEN** | TSG loss | yes | Subj191 dx+relapse loss (rel_cn 0.61→0.74) | **CANDIDATE_WITH_PILOT_CN** — needs cohort |
| **PALB2** | mostly truncating SNV; CN loss possible | partial | Subj109 dx loss, Subj6 relapse loss | **CANDIDATE_WITH_PILOT_CN** — SNV caveat |
| **CUL3** | NRF2/KEAP1 axis | partial | Subj191 dx+relapse loss | **CANDIDATE_WITH_PILOT_CN** — partial |
| **SLC31A1** | CTR1 platinum influx (loss) | yes, but low-copy | Subj109 dx loss, Subj119 relapse loss | **CANDIDATE_WITH_PILOT_CN** — low-copy, unreliable at 0.1× sWGS |
| **KEAP1** | SNV LoF → NRF2 activation | no (not CN) | 1 loss event (Subj119), plus amp events (wrong direction) | **STAYS_LITERATURE_ONLY** — mechanism not sWGS-callable |

**Verdict: 4/5 → CANDIDATE_WITH_PILOT_CN, 1/5 stays LITERATURE_ONLY, 0/5 reach VALIDATED.** This is
the direct, data-grounded answer to *"move them to VALIDATED or explain exactly why the raw sequence
didn't provide the metric."* The raw sequence **did** provide a CN metric for all five; it **did
not** provide the point-mutation metric that KEAP1/SLC31A1/PALB2 resistance actually depends on,
because ~0.1× sWGS cannot call SNV/indel. A single-digit pilot (n=4 here, n=5 with Subject 260)
cannot deliver cohort-level validation regardless of
assay.

## R.2 CCNE1 CNA — the real "unblind the Prophet" evidence (TF2-SLOP-004)

The pilot CN independently reproduces the CCNE1 amplification signal used to wire the CNA input path:

| Sample | Subject / TP | CCNE1 rel_cn | Call | Prior-turn value |
|---|---|---|---|---|
| IM_373 | 109 / dx | **3.508** | high_amp | 3.505 |
| JBLAB-4225 | 109 / relapse | **1.780** | gain (focal) | 1.823 |
| IM_280 | 191 / dx | 0.911 | neutral | neutral |
| JBLAB-4944 | 191 / relapse | 0.881 | neutral | neutral |

This confirms (a) the CCNE1 amplification is in **Subject 109**, not Subject 191 (a correction the
remediation audit got backwards), and (b) the CNA input path wired in the prior turn
(`_derive_ccne1_amp_from_cna` + `profile['cna']` alias, 5 integration tests passing) operates on
**real** values, not simulation. **Caveat:** the end-to-end "CNA gain triggers the Kill Chain"
assertion cannot be **re-executed** this session because the v2 repo is unreachable (Section R.4); it
is verified from prior-turn integration-test results plus this session's reproduction of the input
CNA values.

## R.3 Structural evolution / breakpoint architecture — 5 processed subjects

Detected breakpoints as segmented-CN level shifts (≥0.10 relative-CN units between adjacent 30 kb
bins) per sample, then characterized the dx→relapse architecture (files:
`real_data_validation/breakpoint_architecture_with_subj260.csv`,
`breakpoint_architecture_pilot.csv`, `subj260_breakpoint_delta_by_chrom.csv`;
figure `real_data_validation/fig_ranked_signals_and_breakpoints.png`).

| Subject | dx → relapse BPs | Δ | Chromosomes gained | Top-chrom fraction | Architecture signature |
|---|---|---|---|---|---|
| **191** | 127 → 380 | **+253** | 21 | 0.115 | **dispersed_stochastic_CIN** |
| **6** | 17 → 118 | **+101** | 20 | 0.119 | **dispersed_stochastic_CIN** |
| **260** | 75 → 135 | **+60** (net +66) | 16 | 0.212 | **dispersed_stochastic_CIN** (see R.4) |
| 119 | 148 → 166 | +18 (net +48) | 11 | 0.250 | intermediate_rearrangement |
| 109 | 59 → 52 | −7 | 3 | 0.571 | modest_gain (CCNE1-amp subject; simplifies) |

**Key architectural finding — this refines the prior "smoking gun" framing.** Subject 191's +253
breakpoints are **dispersed across 21 chromosomes** with no single chromosome carrying more than
~11.5% of the new breakpoints. That is a **genome-wide stochastic chromosomal-instability (CIN)**
signature under platinum selection — **not** a focal single-chromosome catastrophe (chromothripsis).
Subjects 6 (+101 across 20 chromosomes) and **260 (+60 across 16 chromosomes, top-frac 0.212;
computed on real reads pulled this session — see R.4)** show the **same dispersed pattern**, making
this **3 of 5 subjects** with the identical dispersed-CIN architecture. This matters: it means the
platinum selection pressure in these subjects rewarded *broad genomic plasticity*, not one targeted
structural lesion. (Ceiling: "chromothripsis-like vs stochastic" is a **pattern label on sWGS**, not
an SV-junction diagnosis — WGS junction resolution would be required to prove single-catastrophe
origin.)

## R.4 Subject 260 deep-dive — structural intelligence (REAL CN, computed this session)

> **STATUS: COMPUTED ON REAL READS.** Subject 260's two BAMs were pulled live from EGA
> (dx **IM_426** = EGAF00008095344; relapse **JBLAB-19323** = EGAF00008095415,
> **13,859,231 total reads** by `samtools view -c`), **MD5-verified byte-for-byte against the cohort manifest** (relapse md5
> `b7adee255578e960ead7777fd290b855`, dx md5 `b44ee2de9cbbda3feb44ba38609934ac` — both match; pyega3's
> own checksum verification passed and `samtools quickcheck` is OK), then processed through the
> **identical** QDNAseq pipeline (hg19, 30 kb bins, sqrt transform, GC/mappability correction,
> segmentation) as the four pilot subjects. Every number below traces to
> `real_data_validation/subj260_analysis_meta.json`, `subj260_gene_cn_dx_vs_relapse.csv`,
> `subj260_breakpoint_delta_by_chrom.csv`, and the merged
> `breakpoint_architecture_with_subj260.csv`. QC: dx 7,766,083 usable reads (median CN 0.979, MAD
> 0.198); relapse 7,745,920 usable reads (median CN 0.940, MAD 0.224) — comparable to the pilot.

**The asserted "+58" is essentially corroborated by real computation.** The request carried a premise
of "+58 breakpoints" at relapse with **no computed source**. Computed on the actual reads, at the same
`BP_THR = 0.10` used for all subjects:

| Subject 260 | dx (IM_426) | relapse (JBLAB-19323) | Δ (raw) | net gained | chroms gained | top-chrom frac | signature |
|---|---|---|---|---|---|---|---|
| Breakpoints | **75** | **135** | **+60** | **+66** | 16 | 0.212 (chr1) | **dispersed_stochastic_CIN** |

The user's "+58" lands within ~2–3 breakpoints of the real raw delta (**+60**), and the net-gained
count (**+66**, summing only chromosomes that gained) is the same order. This is a rare case where the
asserted figure is **confirmed, not fabricated** — so the deep-dive below rests on measured data. The
five requested analyses follow, each with its evidentiary ceiling stated.

**(1) Selection-pressure analysis.** Subject 260 gains 60 net breakpoints between diagnosis and
platinum-exposed relapse, distributed across **16 chromosomes** (chr1 +14, chr7 +10, chr6 +6, chr9 +5,
chr2/10/12/19 +4 each, plus losses on chr11 −4 and chr14 −2 — see `subj260_breakpoint_delta_by_chrom.csv`).
No single chromosome carries more than **21.2%** of the new breakpoints. The interpretation is the same
selection logic seen in Subjects 191 and 6: platinum pressure rewarded **broad genomic plasticity**
(genome-wide CIN) rather than one targeted structural lesion. *Ceiling:* this is a within-subject
dx→relapse contrast on sWGS; it describes the surviving clone's architecture, not the per-cell clonal
dynamics that produced it.

**(2) "Master-switch" hypothesis — tested and NOT supported.** A master-switch model predicts that a
single focal event (one chromosome, one amplicon, oscillating copy-number states) drives relapse. Subject
260 fails that test on its own data: the architecture is **dispersed** (top-chromosome fraction 0.212,
well below the ≥0.40 focal threshold), spread over 16 chromosomes. The signature classifier returns
`dispersed_stochastic_CIN`, **not** `chromothripsis_like_focal_catastrophe`. So for Subject 260 the
data **refute** a single master-switch and support a distributed-instability model — the same conclusion
the four pilot subjects reached. *Ceiling:* "dispersed vs focal" is a **pattern label on 30 kb sWGS
segments**, not an SV-junction diagnosis; proving/excluding a single-catastrophe origin requires WGS
junction resolution.

**(3) Engine-falsification test.** The Serial-SAE engine's structural-divergence feature fires when the
dx→relapse breakpoint delta exceeds `BP_DELTA_DIVERGENCE_THR = 50.0`. Subject 260's real delta (+60,
net +66) **crosses** that threshold — so the engine correctly flags Subject 260 as a
high-structural-divergence relapse, consistent with Subjects 191 (+253) and 6 (+101) and distinct from
119 (+18) and 109 (−7). This is a genuine falsification *opportunity that the engine passed*: had the
real delta come back below 50, the flag would have been a false positive against the user's premise;
instead the measured value confirms the flag. **Crucially, the engine's confidence remains capped at
≤0.40 (`PILOT_DEMONSTRATION_N4→N5_NOT_CLINICAL`)** — five sWGS pairs demonstrate the mechanism works;
they do **not** calibrate a clinical probability. The threshold-crossing is a correct qualitative flag,
not a validated risk score.

**(4) Therapeutic-vulnerability readout (real gene CN, dx→relapse).** On the same six-gene panel used
for the gene-universe upgrade (`subj260_gene_cn_dx_vs_relapse.csv`):

| Gene | dx rel-CN | relapse rel-CN | Δ | dx call → relapse call | Interpretation |
|---|---|---|---|---|---|
| **PTEN** | 0.967 | **0.692** | −0.275 | neutral → **loss** | *Acquired* PTEN loss at relapse — candidate PI3K/AKT-axis vulnerability |
| **KEAP1** | 0.982 | 1.645 | +0.663 | neutral → **gain** | Structural gain (opposite direction to the SNV loss-of-function resistance mechanism — see caveat) |
| CCNE1 | 1.036 | 0.875 | −0.162 | neutral → neutral | No amplification (contrast with Subject 109) |
| PALB2 | 0.950 | 0.979 | +0.029 | neutral → neutral | No CN change |
| CUL3 | 0.999 | 0.977 | −0.022 | neutral → neutral | No CN change |
| SLC31A1 | 0.719 | 0.699 | −0.020 | loss → loss | Stable low-level loss (platinum-import gene; loss present at both timepoints) |

The one actionable, *acquired* signal is **PTEN loss appearing at relapse** (0.967→0.692). In HGSOC this
nominates the **PI3K/AKT/mTOR axis** as a candidate second-line vulnerability in this subject. *Ceiling:*
this is a single relative-CN call from ~0.1× sWGS with no matched RNA/protein — it is a **hypothesis-
generating flag, not a validated PTEN-loss call or a treatment recommendation**. The KEAP1 *gain* is a
real structural change but points the *wrong way* for the documented KEAP1 mechanism (which is SNV-level
LoF, why KEAP1 stayed LITERATURE_ONLY in R.1); a CN gain does not create that resistance phenotype and
should not be read as one.

**(5) Biological-innovation summary.** The genuinely new biology Subject 260 adds to the pilot is **not**
a novel mechanism class — it is a **third independent replication of the dispersed-CIN relapse
architecture** (now 3 of 5 subjects: 191, 6, 260), which *strengthens* the cohort-level finding that
platinum-selected relapse in these BriTROC-1 pairs proceeds via genome-wide instability rather than focal
catastrophe. Its subject-specific innovation is the **acquired PTEN loss** — a per-patient trajectory
where the resistant clone converges on PI3K-axis dysregulation while remaining CCNE1-neutral (unlike
Subject 109, whose relapse simplifies around a CCNE1 amplification). *Ceiling:* "innovation" here means
*new to this 5-subject readout*, not new to the ovarian-cancer literature; n=5 sWGS pairs cannot
establish population prevalence or clinical significance.

**Net for Subject 260.** The user's structural premise was real (+60 vs asserted +58), but the
*mechanistic* framing ("Master Switch," focal catastrophe) is **refuted by the subject's own data** —
it is dispersed CIN, the cohort's dominant mode. The engine flags it correctly at capped confidence, and
the one novel actionable readout is an acquired PTEN loss (hypothesis-grade). No number in this section is
asserted beyond what the reads support.

## R.5 "Flip the switches" reconciliation ledger

Every remediation demand mapped to its true, code-grounded status (file:
`real_data_validation/switch_reconciliation_ledger.csv`). Legend: `ALREADY_CLOSED_PRIOR_TURN` (fix
predates the audit), `AUDIT_FACTUALLY_WRONG` (premise false per code), `DECLINED_FABRICATION` (would
fabricate data/tiers), `DONE_THIS_SESSION` (newly executed on real data), `CANNOT_VERIFY_NO_REPO`
(legitimate but unrunnable this session — repo unreachable).

| # | Demand | Actual status |
|---|---|---|
| 1 | Calibrate logit coefficients from Subject 191 delta | **DECLINED_FABRICATION** — n=1 cannot identify a multi-coef logit; pilot is CN, not CA-125/KELIM outcomes. Documented as a Serial-SAE *feature* instead. |
| 2 | Hard-wire ctDNA into `predict_resistance` (RES-OV-P0-006) | **AUDIT_FACTUALLY_WRONG** — the `ctdna_context` param already exists; probability-wiring intentionally gated pending a live-plasma calibration cohort. |
| 3 | Fix `.kelim`→`.k` dead code (RES-OV-P0-009) | **ALREADY_CLOSED_PRIOR_TURN** — PATCH 8, 2026-05-10 (~2 months before the audit). Audit line stale. |
| 4 | Unblind Prophet to CCNE1 CNA (TF2-SLOP-004) | **DONE (prior turn) + REPRODUCED_THIS_SESSION** — CNA path wired; pilot CCNE1 values reproduced (R.2). |
| 5 | Move 5 LITERATURE_ONLY genes to VALIDATED | **DONE_THIS_SESSION + HONEST_PARTIAL** — real CN metric extracted; 4 CANDIDATE, 1 stays, 0 VALIDATED (R.1). |
| 6 | Schema lockdown (no new schema) | **DONE_THIS_SESSION** — indexed under existing structure, keyed by manifest IDs (`schema_map.json`). |
| — | Flip report `discovery_only`→validated | **DECLINED_FABRICATION (flip) + HONEST_UPGRADE (docs)** — gate-enforced; upgraded as documentation with statuses intact. |
| — | Replace all Harness Tests w/ Real Integration Tests in v2+v3; flip DEGRADED→VALIDATED all tracks | **CANNOT_VERIFY_NO_REPO (v2) + PARTIAL_PRIOR_TURN (v3) + DECLINED (blanket flip)** — v2/v3 repos unreachable this session; cannot truthfully report an end-to-end flip. Prior-turn verified: v2 12 integration tests pass, production suite 17/0; v3 T-series 10/0. |

**Why two items are declined as fabrication.** (1) Flipping Riester `discovery_only`→validated would
require a passing external receipt that does not exist (the grounding guard rejects fabricated stats;
`registry.register()` raises). (2) Calibrating the logit from n=1 is overfitting to a single point,
not calibration, and the pilot produced copy-number data — not the CA-125/KELIM kinetics or
resistance-outcome labels that logit consumes. Both are the same class as the previously-declined
"calibrate logit from n=1." The honest, high-value work that *could* be done on the real data — the
gene-universe CN readout, the CCNE1 reproduction, the breakpoint architecture across 5 subjects, and
the **Subject-260 deep-dive on live-pulled, MD5-verified reads (R.4)** — was done and is documented
above.

## R.6 Schema & provenance

No new schema was introduced. All outputs are indexed under the existing `data_acq/w3` structure and
keyed by the cohort manifest's existing identifiers (`subject_id`, `EGAN`/`EGAF` accession, sample
alias, dataset `EGAD00001011049`). The `biomarker_registry.json` and `earned_tier_registry.json`
keys are **extended, not replaced**. Master index: `real_data_validation/subject_ledger.csv`
(182-subject cohort, **5 processed with real CN**: 191, 6, 260, 119, 109 — Subject 260 added this
session, `cn_status=COMPUTED_QDNAseq_hg19_30kb`) and `real_data_validation/schema_map.json`.
