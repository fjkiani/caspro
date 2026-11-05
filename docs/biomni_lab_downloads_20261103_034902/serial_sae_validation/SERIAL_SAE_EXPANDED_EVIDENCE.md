# Serial SAE — Expanded External Evidence (Multi-Cohort Replication Study)

> **[VALIDATION 2026-07-19] — Research Use Only (RUO), hypothesis-generating.**
> This document reports an honest, independent multi-cohort replication study of the Serial SAE
> platinum-resistance hypothesis in high-grade serous ovarian cancer (HGSOC). It does **not**
> make any clinical, diagnostic, or regulatory claim. No data were fabricated, imputed, or
> simulated; only open-access data were used in the quantitative analysis. Controlled-access
> cohorts are documented as recommended next steps, not analyzed.

## 1. Purpose and honest framing

A prior validation established a **dual result**:

- The external **BriTROC-1** copy-number cohort reproduces the published serial signature result **exactly**
  (copy-number signature 7 at relapse discriminates resistance, AUROC 0.874).
- The **GSE165897 discovery headline statistics do NOT reproduce** from the raw matrix under the
  manuscript's own gene sets (only the delta-null result reproduces).

Given that starting point, "expand the dataset and make it medically stronger" was executed as an
**honest multi-cohort replication study** — not an attempt to prop up numbers that did not reproduce.
The medically defensible meaning of "stronger" here is **independent cross-cohort replication under a
single, pre-specified, frozen pipeline**, plus a reproducible re-derivation of the discovery signal.
Where the signal holds, we say so; where it fails, we report that honestly. Defining the true
evidentiary boundary is itself a strengthening of the record.

**Bottom line up front:** the expansion **does not broadly strengthen the resistance-*prediction*
claim.** Across independent cohorts the signal **does not replicate**. BriTROC-1 remains the **sole
positive external cohort and it is fragile** (only 3 resistant patients). One independent bulk
expression cohort points in the **opposite** direction. The discovery headline statistics are **not
reproducible**. This is the scientifically correct outcome to report.

## 2. Frozen analysis pipeline (`serial_sae_frozen_v1`)

To avoid the exact failure that broke the original discovery numbers (ambiguous gene sets /
undocumented transforms), the pipeline was fully specified and version-stamped **before** any cohort
was scored, then applied identically everywhere. Full specification in `frozen_pipeline.json`.

- **Gene sets (manuscript canonical):** DDR (14): BRCA1, BRCA2, PALB2, RAD51, ATM, ATR, CHEK1, CHEK2,
  TP53, XRCC1, PARP1, FANCA, FANCC, FANCD2. PI3K (10): PIK3CA, PIK3CB, PIK3CD, AKT1, AKT2, AKT3, MTOR,
  PTEN, TSC1, TSC2. VEGF (8): VEGFA, VEGFB, VEGFC, KDR, FLT1, FLT4, ANGPT1, ANGPT2. Aliases resolved
  explicitly (MTOR/FRAP1, KDR/VEGFR2, FLT1/VEGFR1, FLT4/VEGFR3, CHEK1/CHK1, CHEK2/CHK2); missing genes
  logged per cohort.
- **Expression handling:** scRNA → pseudobulk sum UMI per patient×phase → CPM → log2(CPM+1) → mean over
  pathway genes. Bulk → log2(x+1) → gene-wise z-score **within cohort** → mean over pathway genes. No
  cross-cohort raw merging; each cohort analyzed independently, then meta-summarized.
- **Resistance label rule:** PFI < 180 days = resistant (primary). Categorical fallback where PFI is
  absent (GSE160626). Discovery uses the repo's corrected labels (7R/4S, EOC227 sensitive) as canonical,
  with manuscript 8R/3S shown side-by-side.
- **Statistics (identical across cohorts):** Spearman ρ (continuous, primary, label-independent);
  AUROC + 95% CI via 2000-iteration bootstrap (seed 42); Wilcoxon rank-sum; paired delta-vs-absolute;
  KM median-split + log-rank (disclosed in-sample exploratory); BH-FDR per test family; report EPV,
  flag EPV < 10; **no cross-validated multivariate ML** (insufficient events in every serial cohort).
- **Success criterion:** the signal is *replicated* if the post-treatment-state → resistance association
  holds in the **same direction with the frozen pipeline in ≥ 2 independent cohorts beyond BriTROC-1**,
  with effect sizes and CIs. Otherwise, non-replication is reported honestly.

## 3. Cohorts analyzed

| Cohort | Design | Tests serial hypothesis? | n | Events | Role |
|---|---|---|---|---|---|
| **GSE165897** (DECIDER) | Paired scRNA pre/post-NACT | Yes (post-state) | 11 | 7 R | Discovery re-derivation |
| **BriTROC-1** | Paired CN diag/relapse | Yes (relapse-state) | 40 | 3 R | External anchor (carried forward) |
| **GSE160626** | Bulk resistant vs sensitive | No (cross-sectional) | 18 | 8 R | External discrimination |
| **GSE109934** | Paired NanoString pre/post-NACT | No (no labels) | 19 | — | Pathway dynamics |
| **TCGA-OV** | Bulk single-timepoint (survival) | No (prognostic) | 299 | 180 deaths | Prognostic context |
| **GSE241908** | In-vitro paired ascites cultures | No | — | — | **Excluded** (see §4.6) |

Documented but **not analyzed** (access constraints, recommended next steps): **HERCULES** (the paper's own
bulk validation of 18 pre/post + 8 relapse pairs — highest scientific value if recoverable; portal
returns HTTP 410, request via authors/EGA); **MSK-SPECTRUM** (dbGaP phs002857, controlled-access);
**GSE318490** (raw scRNA only, 6 patients, heavy extraction — deprioritized).

## 4. Per-cohort results

### 4.1 GSE165897 — discovery re-derivation (reproduces the prior validation exactly)

Under the frozen pipeline, the discovery numbers re-derive to the **same values as the prior
re-analysis**, and they **do not match the published headline**:

| Metric | Published headline | Re-derived (frozen v1) |
|---|---|---|
| post-DDR Spearman ρ vs PFI | −0.711 (p = 0.014) | **−0.209 (p = 0.537)** |
| post-PI3K Spearman ρ vs PFI | — | **+0.109 (sign not negative)** |
| delta-DDR Spearman ρ vs PFI | ~null | −0.109 (p = 0.750) — reproduces |
| post-DDR AUROC (8R/3S manuscript labels) | 0.75 | 0.75 (95% CI 0.375–1.00) |
| post-DDR AUROC (7R/4S corrected labels) | — | 0.571 (95% CI 0.125–0.933) |
| post-PI3K AUROC (7R/4S) | — | 0.357 |

**Verdict:** partial / non-reproduction. Only the **delta-null** result reproduces. The published
correlation and p-value do **not** reproduce. The post-DDR AUROC of 0.75 reproduces **only** under the
manuscript's 8R/3S labels, and its CI (0.375–1.00) spans chance — **n = 11 is uninformative for
discrimination**. See **Figure 2**.

### 4.2 BriTROC-1 — external anchor (positive, but fragile)

Copy-number signature 7 (s7) at relapse discriminates resistance:

- s7 relapse AUROC = **0.874** (95% CI 0.762–0.972), Wilcoxon p = **0.035**.
- s7 diagnosis AUROC = 0.694; serial improvement (diagnosis → relapse) = **+0.180**.
- Mean s7: resistant 0.328 vs sensitive 0.157 (predicted direction).

**Verdict:** positive and reproduces the published values exactly — **but rests on only 3 resistant
patients** (EPV = 3). It is the **sole positive external cohort** and must be read as fragile /
hypothesis-generating. Note this is a **copy-number signature**, mechanistically distinct from the
expression-score readout used in the other cohorts.

### 4.3 GSE160626 — independent bulk discrimination (does NOT replicate; opposite direction)

Cross-sectional bulk RNA-seq, 8 resistant vs 10 sensitive tumors (7 normal samples excluded), **full
gene coverage (32/32)**:

| Pathway | AUROC | 95% CI | Wilcoxon p | Direction |
|---|---|---|---|---|
| DDR | 0.375 | 0.117–0.677 | 0.408 | higher in **sensitive** |
| PI3K | **0.213** | 0.025–0.475 | **0.043** | higher in **sensitive** |
| VEGF | 0.350 | 0.086–0.611 | 0.315 | higher in **sensitive** |

**Verdict:** does **not** replicate. All three pathways score **higher in sensitive** tumors
(AUROC < 0.5), the **opposite** of the prediction, with PI3K nominally significant in the opposite
direction. **Caveat:** single-timepoint cross-sectional design — it tests the direction of the
post-treatment-state analogue, not the serial (post-vs-baseline) hypothesis directly. See **Figure 1**.

### 4.4 GSE109934 — pathway dynamics (mechanistic plausibility; cannot test prediction)

19 paired pre/post-NACT patients (NanoString PanCancer 770-gene panel; partial coverage: DDR 10/14,
PI3K 9/10, VEGF 4/8). No resistance labels.

- DDR **significantly decreases** post-NACT (mean Δ = −0.658, signed-rank p = **0.0003**).
- PI3K increases, NS (Δ = +0.210, p = 0.134); VEGF NS (Δ = +0.051, p = 0.860).

**Verdict:** cannot test the predictive claim (no labels). It does show that DDR is **dynamically
modulated by chemotherapy**, which is consistent with the biological premise that treatment reshapes
these pathways — mechanistic plausibility only, not evidence for prediction. See **Figure 3a**.

### 4.5 TCGA-OV — prognostic context (the only adequately powered cohort; different claim)

Baseline bulk expression, 299 patients, 180 deaths, EPV = 60 (**the only cohort with adequate events**),
full gene coverage. Cox PH per pathway z-score (overall survival):

| Pathway | Cox HR (per z) | p | Direction |
|---|---|---|---|
| DDR | 0.941 | 0.651 | NS |
| PI3K | **1.298** | **0.023** | higher → **worse OS** |
| VEGF | 1.126 | 0.477 | NS |

**Verdict:** prognostic only — **not** a test of the serial hypothesis. Only **PI3K** associates with
worse survival, a **different pathway emphasis** than the discovery cohort's DDR focus, and a different
(prognostic, not serial-resistance) claim. See **Figure 3b**.

### 4.6 GSE241908 — excluded

Excluded from quantitative analysis: the processed TPM matrix uses internal `ShV-*` sample IDs (13
columns) with **no published mapping** to the 14 GEO GSM accessions (13 vs 14 mismatch); the samples are
**in-vitro primary ascites cultures** (passage 2–4), not tumor tissue; and there are no resistance
labels. Forcing an order-based ShV→GSM mapping would inject an unverifiable assumption of exactly the
kind that produced the non-reproducible discovery numbers. Revisit only if the authors publish the key.

## 5. Cross-cohort synthesis

**Direction-of-effect (label-bearing discrimination tests only):**

| Test | AUROC | 95% CI | p | Direction |
|---|---|---|---|---|
| BriTROC-1 s7 relapse | 0.874 | 0.762–0.972 | 0.035 | **predicted** (CI excludes 0.5) |
| GSE165897 post-DDR (7R/4S) | 0.571 | 0.125–0.933 | 0.788 | predicted but CI spans 0.5 |
| GSE165897 post-DDR (8R/3S) | 0.750 | 0.375–1.000 | 0.279 | predicted but CI spans 0.5 |
| GSE165897 post-PI3K (7R/4S) | 0.357 | 0.000–0.767 | 0.527 | opposite, NS |
| GSE160626 DDR | 0.375 | 0.117–0.677 | 0.408 | opposite, NS |
| GSE160626 PI3K | 0.213 | 0.025–0.475 | 0.043 | **opposite** (CI excludes 0.5) |
| GSE160626 VEGF | 0.350 | 0.086–0.611 | 0.315 | opposite, NS |

**Independent external cohorts (beyond BriTROC-1 and the discovery cohort) supporting the predicted
direction with an informative CI: 0.** The success criterion (≥ 2 such cohorts) is **NOT met.**

**Descriptive DDR-AUROC meta-summary (reported with a strong caveat):** a naive fixed-effect pool of the
DDR-discrimination AUROCs gives ~0.80, but this is **driven almost entirely by BriTROC-1's large weight**
(a tight-CI copy-number signature), while the two expression cohorts straddle or oppose 0.5. Between-cohort
heterogeneity is extreme (**I² = 83%, Q p = 0.003**), which means the cohorts are **not estimating one
common effect** and a single pooled number is **statistically inappropriate and must not be headlined.**
Per-cohort reporting is the correct posture.

## 6. What this does and does not support

**Supported (directional / mechanistic, RUO):**
- A directional hypothesis in the discovery cohort: absolute post-treatment pathway state (not deltas) is
  the candidate signal; the delta-null reproduces.
- Chemotherapy dynamically remodels DDR pathway expression (GSE109934), consistent with the biological
  premise.
- One external cohort (BriTROC-1) shows a positive, in-direction relapse-state signal for a copy-number
  signature.

**Not supported:**
- The **published discovery effect sizes and p-values** (not reproducible from raw data).
- **Broad cross-cohort replication** of the resistance-prediction claim (fails; one independent expression
  cohort is opposite).
- Any **pooled positive** estimate (invalidated by extreme heterogeneity).
- Any **clinical / diagnostic / prognostic-utility** claim.

## 7. Limitations

- **Severe power limits in every serial cohort:** discovery n = 11 (EPV ≤ 8); BriTROC-1 has only 3
  resistant patients (EPV = 3). Wide bootstrap CIs dominate — these cohorts cannot establish or refute
  discrimination on their own.
- **Design heterogeneity:** the only adequately powered cohorts (GSE160626 cross-sectional; TCGA-OV
  prognostic) are **not serial**, and BriTROC-1 uses a **copy-number signature** rather than an expression
  score. Cross-cohort comparison mixes readouts and designs; the meta-summary is descriptive only.
- **Missing high-value data:** the paper's own bulk validation set (HERCULES) and MSK-SPECTRUM are not
  openly accessible; obtaining them is the single highest-value next step.
- **Partial gene coverage** in the targeted NanoString cohort (GSE109934) and the absence of resistance
  labels there and in GSE241908.
- **In-sample exploratory survival analysis** (median split, no external survival validation).

## 8. Recommended next steps (to genuinely strengthen the evidence)

1. **Acquire HERCULES bulk validation** (18 pre/post + 8 relapse pairs) — the paper's own external set;
   run the frozen pipeline on it. Highest scientific value.
2. **Apply for MSK-SPECTRUM** (dbGaP phs002857) for an independent, adequately sized serial scRNA cohort.
3. **Prospective, adequately powered serial sampling** with a locked pathway score and a pre-registered
   PFI < 180 d endpoint — the only design that can move this beyond hypothesis-generating.
4. If pursuing expression scores, **reconcile the copy-number (BriTROC s7) vs expression (discovery)
   readouts** — they are not interchangeable and currently disagree.

## 9. Artifacts

- `frozen_pipeline.json` — locked pipeline specification (`serial_sae_frozen_v1`).
- `cohort_acquisition.json` — data provenance, SHAs, access notes.
- Per-cohort results: `discovery_rederivation.json`, `GSE160626.json`, `GSE109934.json`
  (+ `GSE109934_patient_scores.csv`), `TCGA_OV.json` (+ `TCGA_OV_merged.csv`), `GSE241908_EXCLUDED.json`.
- Synthesis: `cross_cohort_synthesis.json`, `reproducibility_matrix.csv`, `direction_of_effect_vote.csv`,
  `meta_ddr_auroc.csv`.
- Machine-readable verdicts: `serial_sae_multicohort_ledger.json`.
- Figures: `fig1_crosscohort_auroc_forest.(png|svg)`, `fig2_discovery_rederivation.(png|svg)`,
  `fig3_dynamics_and_prognostic.(png|svg)`.

*Provenance: analysis performed 2026-07-19 under `serial_sae_frozen_v1`; seed 42; 2000-iteration
bootstrap. Open-access data only. RUO / hypothesis-generating.*
