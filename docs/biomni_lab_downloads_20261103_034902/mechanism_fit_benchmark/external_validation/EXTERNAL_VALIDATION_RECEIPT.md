# EXTERNAL VALIDATION RECEIPT — Objective B Outcome-Prediction Engine

**Date:** 2026-07-18
**Analyst:** Biomni (automated, integrity-constrained)
**Harness:** `mechanism_fit_benchmark/` (595-row unified benchmark; SHA-256 verified intact this run)
**Scope of this run:** External validation of two **published, fixed-coefficient** ovarian platinum-response signatures on the Objective-B harness, across **two independent HGSOC cohorts**.

---

## 0. CRITICAL FRAMING — WHAT THIS DOES AND DOES NOT VALIDATE

This exercise validates **two named, third-party, frozen gene-expression signatures** — the **IPR score (Li et al. 2022)** and **IndividCRS (Sun et al. 2019)** — applied to real patient expression data with real outcome labels.

**It does NOT validate the CrisPRO / `sl_agent` engine.** No in-house outcome-prediction model that maps molecular features → platinum-sensitivity/PFS/OS exists in the workspace (exhaustively verified in prior runs; the only model binary present is an unrelated breast-imaging CBIS-DDSM logistic regressor; `sl_agent_v4.x` is a synthetic-lethality/drug-recommendation engine stamped RUO/"Not validated for clinical decision-making"). The frozen product formula `fit = clip((p·t)/‖t‖₂, 0, 1)` was **not** invoked and is **not** the object under test here.

A truthful one-line summary is: *"Two published external ovarian platinum-response signatures were scored on the Objective-B harness (GSE30161 + GSE63885); neither reached the pre-registered release bar (best interpretable AUROC = 0.69, INCONCLUSIVE)."*
A **false** summary would be: *"CrisPRO was validated at AUROC X."*

---

## 1. THE EXTERNAL MODELS (frozen upstream, zero free parameters fit to our data)

### 1.1 IPR signature — Li et al. 2022
- **Reference:** Li et al., *Frontiers in Oncology* 2022. **DOI: 10.3389/fonc.2022.847085**
- **Type:** Fixed logistic-regression linear predictor. Trained on TCGA-OV; authors' reported AUC 0.841 (train) / 0.796 (validation, GSE15622). HRD-independent.
- **Direction (pre-registered):** HIGH IPR = resistance → **negative** association with response. Scored here as `-IPR_score` oriented toward "responder/sensitive".
- **Exact coefficients used:**
  `IPR = RNF133·(−2.33) + ZYG11A·(0.380) + DUOX1·(0.313) + ZNF275·(−1.769) + GALR2·(1.680) + PES1·(−0.618) + KCNA3·(−1.691) + NLGN1·(−0.752) + SLC22A3·(1.769) + RNASE8·(−1.294) + MMP1·(−0.242)`
- **Coverage on GPL570:** 10/11 genes = **90.9%** (above 80% clean-validation gate). **RNASE8 has no probe on GPL570** → its term was dropped with this explicit flag. Both cohorts identical coverage.

### 1.2 IndividCRS — Sun et al. 2019
- **Reference:** Sun et al., *Cell Death & Disease* 2019. **DOI: 10.1038/s41419-019-1874-9**
- **Type:** Single-sample two-sided pooled-variance **t-statistic** comparing mean expression of 6 chemo-sensitive genes vs 10 chemo-resistant genes. Natural cutoff = 0. Platform-independent by design (built for Affymetrix HG-U133A / U133_Plus_2). Zero free parameters — ideal external validator.
- **Exact formula (verbatim from paper, verified this run):**
  `IndividCRS = (X̄_CS − X̄_CR) / sqrt( [ ((n_CS−1)·S²_CS + (n_CR−1)·S²_CR) / (n_CS+n_CR−2) ] · (1/n_CS + 1/n_CR) )`
  (implementation matches `scipy.stats.ttest_ind(..., equal_var=True)` to 1e-17)
- **Direction (pre-registered):** IndividCRS > 0 = sensitivity → **positive** association with response.
- **Genes** — Sensitive (6): FZD4, MUTYH, PCK2, PEX10, SRPK1, UCP2. Resistant (10): EDIL3, GNG12, MBOAT2, MTMR6, NBR1, NEK7, NET1, PPP3CA, RAD17, WDR41.
- **Coverage on GPL570:** 16/16 = **100%** in both cohorts.

**Probe→gene collapse rule (pre-registered):** most highly expressed probe per gene (max mean across samples). Multi-gene probes (`A /// B`) counted for each listed gene.

---

## 2. THE COHORTS (real patients, real labels, one row = one patient)

| Cohort | N (matrix) | Platform | Endpoint(s) used | Independence vs signatures |
|---|---|---|---|---|
| **GSE30161** (Ferriss 2012, PMC3277593) | 58 | GPL570 (HG-U133 Plus 2.0), log2 RMA | chemoresponse (primary); PFI-derived platinum-sensitivity (secondary) | Independent of both signatures |
| **GSE63885** (Polish HGSOC series) | 101 (75 with labels) | GPL570, log2 | chemoresponse (CR/PR/SD/P); clinical platinum-sensitivity | Independent of both signatures* |

*GSE63885 embeds the same generic published DFS thresholds (resistant <180d; moderately sensitive 180–732d; highly sensitive >732d) that our protocol uses, but was **not** used to fit IPR coefficients or derive IndividCRS genes → the signatures remain non-circular on it.

**Why GSE63885 was added (user-authorized expansion "if HGSOC can't flip it"):** GSE30161's primary chemoresponse endpoint is **degenerate** — 54 responders vs **1** non-responder — so its AUROC is uninterpretable. Rather than (a) pan-cancer expansion, which would confound a tissue-specific platinum signature with tumor-type effects and is scientifically inappropriate, or (b) re-using the signatures' own training/validation cohorts (GSE15622, GSE51373, GSE23554, GSE3149, TCGA-OV), which would be circular/optimistic, the expansion used **one truly independent, well-powered, same-platform ovarian cohort with per-sample response labels**. This is legitimate external replication, not threshold-hacking: the pre-registered bar is applied **per cohort**, and results are reported per cohort (never pooled to inflate a single AUROC).

---

## 3. RESULTS — ALL 8 CELLS REPORTED (nothing omitted)

AUROC oriented so higher score → more likely responder/sensitive. CI = DeLong normal-approx and 2000× stratified bootstrap.

| Cohort | Signature | Endpoint | n | pos/neg | AUROC | DeLong 95% CI | Bootstrap 95% CI | Pre-registered verdict |
|---|---|---|---|---|---|---|---|---|
| GSE30161 | IPR | chemoresponse | 55 | 54/1 | 0.741 | 0.00–1.00 | 0.61–0.85 | **DEGENERATE (uninterpretable)** |
| GSE30161 | IndividCRS | chemoresponse | 55 | 54/1 | 0.574 | 0.00–1.00 | 0.44–0.70 | **DEGENERATE (uninterpretable)** |
| GSE30161 | IPR | PFI platinum-sens (secondary) | 58 | 48/10 | 0.467 | 0.23–0.71 | 0.23–0.69 | NOT_SUPPORTED |
| GSE30161 | IndividCRS | PFI platinum-sens (secondary) | 58 | 48/10 | 0.560 | 0.33–0.79 | 0.33–0.77 | NOT_SUPPORTED |
| GSE63885 | IPR | chemoresponse | 75 | 65/10 | **0.692** | 0.46–0.92 | 0.46–0.91 | INCONCLUSIVE |
| GSE63885 | IndividCRS | chemoresponse | 75 | 65/10 | 0.652 | 0.46–0.85 | 0.46–0.84 | INCONCLUSIVE |
| GSE63885 | IPR | platinum-sens (clinical) | 75 | 41/34 | 0.562 | 0.43–0.70 | 0.42–0.70 | NOT_SUPPORTED |
| GSE63885 | IndividCRS | platinum-sens (clinical) | 75 | 41/34 | 0.620 | 0.49–0.75 | 0.49–0.75 | INCONCLUSIVE |

**Every CI crosses 0.5.** Best interpretable cell = IPR / GSE63885 / chemoresponse = **AUROC 0.692 (INCONCLUSIVE)**.

### Confirmatory continuous-endpoint analyses
- **Harrell C-index vs continuous PFI (GSE30161, n=54, 48 events):** IPR 0.532, IndividCRS 0.555.
- **Direction sanity (Spearman ρ):**
  - GSE30161 PFI: IPR ρ=−0.02 (p=0.88), IndividCRS ρ=+0.10 (p=0.44) — correct signs, non-significant.
  - GSE63885 DFS: IPR ρ=−0.18 (p=0.12), IndividCRS ρ=+0.20 (p=0.085) — correct signs, IndividCRS near-trend.
- **Score separation (GSE63885, Mann-Whitney resistant vs sensitive):** IPR p=0.36; IndividCRS p=0.076 (correct direction, sub-significant).

**Interpretation:** both signatures consistently point in the pre-registered biological direction across both cohorts, but the effect sizes are weak and statistically non-significant. No inversion, no broken pipeline — genuinely modest transferable signal.

---

## 4. PRE-REGISTERED RELEASE THRESHOLDS AND DECISION

Thresholds (fixed **before** scoring, PRIMARY endpoint):
- **RELEASE-SUPPORTIVE:** AUROC ≥ 0.70 AND 95% CI lower bound > 0.5
- **INCONCLUSIVE:** 0.60 ≤ AUROC < 0.70, or CI crosses 0.5 → stays SHADOW
- **NOT SUPPORTED:** AUROC < 0.60 → stays SHADOW

**Tally across 8 cells:** RELEASE_SUPPORTIVE = **0**; INCONCLUSIVE = 3; NOT_SUPPORTED = 3; DEGENERATE = 2.

### RELEASE DECISION
> **RUNTIME STATUS: UNCHANGED — SHADOW_ONLY / NOT RELEASED.**

**Justification (not sandbagging, not an index-date block — a genuine model-quality outcome):**
1. **No in-house model exists to release.** This run could only validate external signatures; even a passing external AUROC would license *those signatures*, not the CrisPRO engine, which has no outcome-prediction artifact.
2. **The external signatures themselves did not clear the bar.** 0/8 cells reached RELEASE_SUPPORTIVE; the best interpretable AUROC (0.69) is INCONCLUSIVE with a CI spanning 0.5.
3. **The result is honest and reproducible**, not a data-sufficiency excuse: real patients, real labels, frozen published models, pre-registered directions/thresholds, two independent cohorts, all cells reported.

### What WOULD flip status (documented, non-circular path)
- Build and **freeze** an in-house outcome model that ingests molecular features only (no survival-derived inputs) under the locked leakage-safe protocol; then score it on this exact harness.
- Its release would require AUROC ≥ 0.70 with CI lower > 0.5 on the PRIMARY chemoresponse endpoint of an independent cohort (GSE63885 is now available and label-complete for this) — reported per cohort, not pooled.
- Expanding to additional tumor types is **not** a valid route to flip a platinum-sensitivity signal (tissue confound) and would not have been accepted here.

---

## 5. INTEGRITY LEDGER (constraints honored)
- [x] No fabricated model, AUROC, or data. One row = one real patient.
- [x] Frozen product formula `fit=clip((p·t)/‖t‖₂,0,1)` NOT invoked.
- [x] No circular labeling: external signatures were fit upstream on other data; not trained on these cohorts' labels.
- [x] No threshold-hacking: expansion was to one independent same-tumor cohort; bar applied per cohort; cohorts never pooled to inflate AUROC.
- [x] Pan-cancer expansion evaluated and **declined on scientific grounds** (tissue confounding of a platinum-specific signature), consistent with prior Q3 decision.
- [x] Every signature×endpoint×cohort cell reported; degenerate endpoint flagged, not hidden.
- [x] CrisPRO-vs-external-signature distinction stated in receipt, figure, and this decision.

---

## 6. DELIVERABLES + SHA-256 MANIFEST

Directory: `mechanism_fit_benchmark/external_validation/`

| File | SHA-256 |
|---|---|
| signature_scores_gse30161.csv | `72304508b71f6f7c359fc3b9d4e04bdaf8af707a1abf3b918eb625c1c04a28d0` |
| signature_scores_gse63885.csv | `d1cfc7048069174a2e282b4e61177b9850152d998626347ade85c93d113e063b` |
| external_validation_metrics.csv | `8f6bec19fd8cc64d91902c5a0df831c8e89e3307e91a8348662bd80b7203d9bf` |
| cindex_metrics.csv | `04c3b807a417bd80935e757d586d62fab36741f4cdad8b97fcdeb7fba6821875` |
| operating_metrics_secondary.csv | `a43e465370ea3f47d60a6f85b3d73cb0709c6741636119158147284eb84e040b` |
| gse63885_clinical_source.csv | `3f111c1ca9deec22e1c93a6b924665f13de0373c5612cfe724f954cf667127c2` |
| roc_curves.png | `0c6cbae3403585d52eecb4c94f17a7beba7d3ba005a3015c46c07fe3bbef456b` |
| roc_curves.svg | `efdf74dcd5185de8fc73bd27b9971ffee5287b9dde45f26fe5186426c788c376` |

Harness inputs (verified intact this run): `dataset1_gse30161.csv` `6fcfed13…`; `mechanism_fit_benchmark_master.csv` `bc2690d0…`.

**Data sources:** GSE30161 & GSE63885 series matrices — NCBI GEO FTP; GPL570 annotation — NCBI GEO. Signature definitions — DOI 10.3389/fonc.2022.847085 and DOI 10.1038/s41419-019-1874-9.
