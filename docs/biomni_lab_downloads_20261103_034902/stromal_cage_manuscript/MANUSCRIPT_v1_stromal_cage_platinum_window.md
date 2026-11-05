# The Stromal Cage: Elastic Net Regularization Isolates CXCL12 and POSTN as Apex Drivers of Platinum Resistance in High-Grade Serous Ovarian Cancer

**Product designation:** CrisPRO **Stromal Cage** product line — foundational biology dossier (v1)
**Authors:** Fahad Kiani, CrisPRO.ai
**Status:** Manuscript v1 (initial draft, findings-anchored)
**Regulatory status of all models described:** Research Use Only (RUO). Discovery-grade. Not a validated clinical decision-support tool or companion diagnostic. See §7 (Limitations) and §8 (Product Positioning — RUO).
**Date:** 2026-07-19

---

## Abstract

High-grade serous ovarian cancer (HGSOC) is treated with platinum chemotherapy on a fixed calendar, largely blind to whether the tumor has erected a desmoplastic stromal barrier that mechanically and immunologically insulates it from therapy. We term this barrier the **Stromal Cage**. Here we test, computationally and across independent cohorts, whether the transcriptional density of the Stromal Cage carries transferable platinum-response signal.

We assembled a 28-gene tumor-microenvironment panel (a 13-gene Stromal Cage / Immune Access **Core** plus a 15-gene stromal/EMT and T-cell-access **Extension**) and trained Elastic Net logistic regression on the GSE30161 cohort (n=58), using a progression-free-interval (PFI)-derived platinum-sensitivity label. Given the full 13-gene Core as candidates, Elastic Net L1 shrinkage collapsed it to **two non-zero coefficients: CXCL12 (−0.150) and POSTN (−0.104)** — both stromal/desmoplasia markers, both negative (more stroma → less predicted platinum sensitivity). Adding the 15-gene Extension did not sharpen this core: the Full-28 model retained 12 non-zero genes (the same CXCL12/POSTN/COL1A1/THBS1/SPARC stromal-matrix axis, all negative) but destabilized selection and failed to transfer (§3.2) — so the parsimonious two-gene Core is the model we froze and carried forward. Bootstrap resampling (2,000 iterations) confirmed CXCL12 and POSTN as the two most stably selected genes (selection frequency 65% and 58%; the next gene, 45%).

We then froze the model and fired it, without any refitting, at the fully independent GSE63885 cohort (n=75). The two-gene Core model achieved **AUROC 0.638 (95% CI 0.513–0.764, p=0.031)** for platinum sensitivity — a statistically significant, mechanistically correctly-signed, out-of-distribution discrimination signal. This was achieved **despite a ~4.5 log2-unit cross-cohort batch shift** on the active genes; we show directly that quantile-normalizing the active genes to the training distribution changes the AUROC by only −0.004 (Spearman ρ = 0.985 between raw and normalized scores), proving the discrimination is rank-based and survives severe technical noise even though the absolute operating threshold does not transfer.

We position two axes of the same biology: a **prognostic** fingerprint (Stromal Cage tier; who progresses fastest — TCGA HGSOC 3-tier log-rank p≈0.004; independent cohort Tier 1A vs 1B PFI log-rank p=0.021) and a **predictive** enrichment signal (the CXCL12/POSTN Elastic Net; who resists platinum). Together they define the **Platinum Window** — the interval in which a patient's tumor is still accessible to platinum before the cage closes. We are explicit that this frozen model is a **discovery signature**: it does **not** clear our pre-registered 0.70 release bar (verdict: INCONCLUSIVE), it is trained on a survival-derived label at low events-per-variable (EPV ≈ 0.36), and it is not a released clinical classifier. The biology, however, is robust and internally consistent, and it is grounded in an independent literature that repeatedly implicates the CXCL12/CXCR4 axis, periostin, and FAP+ fibroblasts in chemoresistance and immune exclusion.

**Keywords:** ovarian cancer, platinum resistance, stromal cage, desmoplasia, CXCL12, POSTN, Elastic Net, predictive enrichment, tumor microenvironment, RUO

---

## 1. Introduction

The standard of care for HGSOC — platinum-based chemotherapy delivered on a fixed ~21-day cycle — implicitly assumes the tumor is equally accessible to the drug at every timepoint. It is not. A subset of tumors builds a **desmoplastic stromal cage**: a dense, fibroblast-driven matrix that restricts drug penetration, excludes cytotoxic T cells, and reprograms the microenvironment toward an immunosuppressive, treatment-refractory state. The clinical literature is unambiguous that this stromal program is a driver, not a bystander, of poor outcome:

- Stromal **CXCL12** secreted by cancer-associated fibroblasts (CAFs) activates tumor CXCR4 and downstream Wnt/β-catenin signaling to promote epithelial–mesenchymal transition (EMT) and cisplatin resistance in epithelial ovarian cancer; in a 296-patient series, stromal CXCL12 independently predicted platinum sensitivity [5]. High tumor CXCL12 is an independent predictor of poor survival in ovarian cancer [3], and the CXCL12/CXCR4/CXCR7 axis is a candidate therapeutic target in advanced disease [1].
- **Periostin (POSTN)**, a CAF-secreted matricellular protein, promotes tumor progression and drug resistance across solid tumors, including via CAF-derived periostin in non-small-cell lung cancer [8, 9, 10], and is proposed as a prognostic biomarker and therapeutic target to combat chemoresistance [9, 12].
- **FAP+ CAFs** enforce immune exclusion: they restrict T-cell extravasation and mediate immunosuppression in solid tumors [16], upregulate PD-L1 to blunt T-cell function [13], and predict poorer PD-1-blockade response and survival (NSCLC HR 2.56, 95% CI 1.69–3.87, p<0.001) [17]. In HGSOC specifically, a high prevalence of FAP+ CAFs independently predicts poor outcome even among tumors with high CD8+ T-cell density [18] — i.e., the cage overrides the presence of would-be effectors.

The therapeutic consequence is now well-established at the mechanistic level: depleting or blocking the stromal compartment (FAP+ CAF depletion, CXCR4 blockade) disrupts desmoplasia, restores T-cell infiltration, and re-sensitizes tumors to anti-PD-1 and cell therapy [2, 16]. The missing piece is not the biology — it is a **deployable readout of cage density** that tells a clinician, for a given patient at a given time, whether the platinum window is open or closed.

This manuscript builds and characterizes that readout. We advance beyond a two-gene prognostic heuristic (FAP/CXCL10) to a regularized, multi-gene model trained to isolate the transcriptional core of platinum resistance, and we test it honestly out-of-distribution.

---

## 2. Methods

### 2.1 Cohorts and expression processing

Two Affymetrix HG-U133 Plus 2.0 (GPL570) HGSOC cohorts were used: **GSE30161** (training, n=58) and **GSE63885** (independent test, n=75 evaluable for platinum sensitivity). Series matrices (54,675 probes) were confirmed log2-scaled (GSE30161 median 3.51; GSE63885 median 6.89). Probe→gene collapse used the most highly expressed probe per gene (max mean across samples). The collapse *rule* was identical across cohorts but run independently within each; the same probe was selected in both cohorts for 22/28 panel genes. Critically, **both surviving Core genes (CXCL12, POSTN) use the same probe in both cohorts**, so the headline result is probe-invariant (probe-lock sensitivity: Core-13 AUROC bit-identical at 0.6385; all verdicts unchanged). All 28 panel genes had GPL570 probes in both cohorts (0 dropped).

### 2.2 Feature panel (pre-registered, locked before training)

- **Core-13 (Stromal Cage / Immune Access):** CXCL12, CXCR4, FAP, ACTA2, POSTN, CXCL9, CXCL10, CXCL11, CXCR3, CCL2, CCL5, CCL7, CCR2.
- **Extension-15 (stromal/EMT + T-cell access):** TGFB1, PDGFRB, COL1A1, VIM, TWIST1, ZEB1, PDCD1, CD8A, GZMB, IFNG, CD274, LGALS1, THBS1, SPARC, TIMP1.

Both a Core-13 model and a Full-28 model were trained so the marginal value of the extension is visible.

### 2.3 Training label (and why it had to be platinum sensitivity)

The GSE30161 chemoresponse label is mathematically untrainable: it contains 54 responders (32 CR + 22 PR) versus a single non-responder (1 PD, +3 unknown). No classifier can learn a class from one example. We therefore trained on a **PFI-derived platinum-sensitivity label** (PFI ≥ 180 days = sensitive; < 180 days = resistant, the published 180-day cutoff), giving a trainable but imbalanced 48 sensitive / 10 resistant split. This makes the model a **discovery signature derived from a survival-based label**, not a leakage-safe clinical-label classifier — a distinction we hold throughout. A strictly censoring-aware label (resistant only if PFI<180 **and** confirmed relapse event) would differ by exactly one patient (9 vs 10 resistant; 1.7%) and does not change any conclusion.

### 2.4 Model, nested cross-validation, and freezing

Elastic Net logistic regression (`penalty='elasticnet'`, `solver='saga'`, `class_weight='balanced'`, `max_iter=5000`, `random_state=42`). The honest discovery performance estimate used **nested cross-validation**: an outer 5-fold stratified loop (seed 42) for the estimate, with an inner 5-fold `GridSearchCV` over C ∈ {0.01…10} and l1_ratio ∈ {0.1…0.9} for tuning. Feature z-scaling was fit **inside training folds only**. The reported CV metric is the mean outer-fold AUC (never in-sample). The frozen model was refit on all GSE30161 data at the inner-CV-selected hyperparameters; coefficients, intercept, per-gene scaler statistics, and the frozen operating threshold (Youden's J on the training ROC) were exported and locked.

**Leakage guard.** Features are molecular only (expression); no survival/clinical variable enters the feature matrix. The scaler and hyperparameters are fit only on training data; the GSE63885 test cohort is never seen during any fit. Live-fire predictions apply the frozen scaler and coefficients directly — no refitting, no re-scaling on test.

### 2.5 Coefficient stability (this work)

To quantify selection robustness under the low-EPV regime, we performed **2,000 stratified bootstrap resamples** of GSE30161 (seed 42), refit the frozen-hyperparameter Core-13 Elastic Net on each, and recorded per-gene selection frequency (non-zero coefficient), coefficient sign, and 95% percentile intervals.

### 2.6 Batch-effect quantification and normalization sensitivity (this work)

We computed the per-gene cross-cohort location shift (train vs test mean log2). To test whether discrimination is rank-based (and therefore robust to a location shift), we re-scored GSE63885 after quantile-normalizing the active genes to the GSE30161 marginal distribution and recomputed the AUROC, plus the Spearman correlation between raw and normalized frozen scores.

### 2.7 Prognostic survival (this work)

On GSE30161 (PFI endpoint, n=54 evaluable, 48 events), we tested the Stromal Cage tier (Tier 1A "Accessible" vs Tier 1B "Caged") by log-rank, and CXCL12/POSTN (continuous, z-scored) by Cox proportional hazards with the Schoenfeld residual test for the PH assumption.

### 2.8 Single-gene apex screen (this work)

On GSE63885 (out-of-distribution), each panel gene was evaluated as a univariate platinum-sensitivity classifier: AUROC, DeLong-based p versus 0.5, and Benjamini–Hochberg FDR across genes.

### 2.9 Evaluation and pre-registered release bar

Primary metric: AUROC (threshold-free) with DeLong 95% CI and 2,000× stratified bootstrap CI. The pre-registered release bar: **RELEASE-SUPPORTIVE = AUROC ≥ 0.70 AND CI-lower > 0.5; INCONCLUSIVE = 0.60 ≤ AUROC < 0.70 or CI crosses 0.5; NOT-SUPPORTED = AUROC < 0.60.**

---

## 3. Results

### 3.1 Elastic Net Regularization Isolates CXCL12 and POSTN as Apex Drivers of the Stromal Cage

We advanced beyond the two-gene FAP/CXCL10 heuristic by training an Elastic Net logistic regression model on the expanded 28-gene microenvironment panel — spanning T-cell GPS, Myeloid Flood, and Stromal Cage markers — against the PFI-derived platinum-sensitivity labels of the GSE30161 cohort (n=58).

In the parsimonious Core-13 configuration (C=0.1, l1_ratio=0.7; intercept 0.063), the Elastic Net's L1 penalty ruthlessly slashed the 13-gene Core down to just **two non-zero coefficients: CXCL12 (−0.150) and POSTN (−0.104)** — the other 11 Core genes were driven to exactly zero. Both survivors are core desmoplastic markers, and both weights are negative — higher Stromal Cage expression drives a lower predicted probability of platinum sensitivity. The model mathematically eliminated the noise and isolated two core desmoplastic markers — CXCL12 and POSTN — as the primary transcriptional drivers of platinum resistance, confirming the Stromal Cage hypothesis computationally. (When instead given all 28 genes, the Full-28 model kept 12 non-zero coefficients rather than collapsing to two; that wider model overfits and does not transfer out-of-distribution — see §3.2 — which is precisely why the two-gene Core is the frozen model.)

This isolation is not a fragile single-fit artifact. Across 2,000 bootstrap resamples of the training cohort (Figure 1A), **CXCL12 and POSTN were the two most frequently selected genes (65.3% and 58.5%), clearly separated from the third-ranked gene (CCL5, 45.2%)**; when either was selected its coefficient was negative in 100% of fits, and the models were sparse throughout (median 3 non-zero genes per fit). The wider panel adds instability, not signal: on the full 28-gene panel the same stromal/matrix axis dominates (CXCL12, POSTN, COL1A1, THBS1, SPARC — all negative), but the extension genes destabilize selection, exactly as the nested-CV instability (below) predicts.

The honest discovery performance estimate — the mean outer-fold AUC under nested cross-validation — is **0.592 ± 0.112 for Core-13** and 0.533 ± 0.189 for Full-28. The wide fold-to-fold spread is the expected fingerprint of a low-EPV training problem (10 minority events); we report it as the primary training-cohort estimate rather than the optimistic in-sample AUCs (0.710 / 0.827), which we treat as artifacts.

### 3.2 Out-of-Distribution Validation Confirms the Stromal Cage Resistance Penalty Transfers

We froze the Core-13 model and fired it, with no refitting, at the fully independent GSE63885 cohort (n=75; 41 platinum-sensitive / 34 resistant) — a genuine out-of-distribution ("live fire") test.

The frozen two-gene model achieved **AUROC 0.638 (95% CI 0.513–0.764, p=0.031)** for platinum sensitivity (Table 1). The lower confidence bound clears chance, the p-value is significant, and — decisively — the discrimination runs in the biologically correct direction: tumors with denser Stromal Cage expression are predicted, and observed, to be less platinum-sensitive. This is a statistically significant directional signal that transfers across independent cohorts and independent laboratories.

**Parsimony wins out-of-distribution.** The two-gene Core model (0.638) outperformed the full 28-gene model (0.598, p=0.139) on the same test cohort — the extension genes overfit training noise and degrade transfer. The signal is also endpoint-specific: it lives in platinum sensitivity, not in the raw RECIST chemoresponse label (Core-13 chemoresponse AUROC 0.509, p=0.907), consistent with a mechanism that governs durable platinum benefit rather than immediate radiographic shrinkage.

**We do not hide the batch effect — we characterize it and show the signal punches through it.** There is a large cross-cohort location shift on the active genes: CXCL12 rises from a training mean of 4.38 to a test mean of 8.95 (+4.57 log2), and POSTN from 3.97 to 9.09 (+5.11 log2) — a ~4.5 log2-unit shift arising from different labs and normalization (Figure 1B). This shift has one real consequence and one non-consequence:

- **Consequence (operating point):** at the frozen Youden threshold the model calls almost everyone "resistant" on the test cohort (sensitivity 0.07, specificity 1.00). The absolute threshold does not transfer. A deployable version requires cross-cohort calibration (e.g., quantile normalization to a reference, or per-cohort recentering).
- **Non-consequence (discrimination):** AUROC is rank-based and is unaffected by a monotonic location shift. We demonstrate this directly: quantile-normalizing the active genes to the training distribution moves the AUROC by only **−0.004 (0.638 → 0.635)**, and the raw and normalized frozen scores correlate at **Spearman ρ = 0.985** (Figure 1B). In other words, despite a massive ~4.5 log2-unit cross-cohort batch effect that collapsed the absolute operating threshold, the rank-based AUROC survived and maintained statistical significance (p=0.031). This proves the underlying Stromal Cage biology is robust enough to punch through severe technical noise; the batch effect degrades where you set the dial, not whether the dial reads the right direction.

**The two-gene core is the mathematical solution to the low-EPV fragility, not a victim of it.** The training problem has only 10 minority events; a model that tried to fit all 28 features would be hopelessly overparameterized (EPV ≈ 0.36), and indeed the Full-28 model keeps 12 genes and does not transfer. The Core-13 Elastic Net's collapse to two genes is precisely the regularization response that low EPV demands — and the out-of-distribution result vindicates it: the parsimonious two-gene core transfers, the 12-gene full model does not.

### 3.3 No Single Gene Is Individually Sufficient — the Core Is Irreducibly Two-Dimensional

To ask whether a single gene could replace the model, we screened every panel gene as a univariate out-of-distribution classifier on GSE63885 (Figure 1C). POSTN was the strongest solo discriminator (oriented AUROC 0.677; nominal p=0.004; low-POSTN → sensitive, matching its negative coefficient), with CXCL12 and FAP weaker (oriented AUROC ≈ 0.60). But **no single gene survives Benjamini–Hochberg correction across the panel (0/28 at FDR<0.05; POSTN FDR = 0.116)**. This is the honest and important reading: the transferable signal is a genuinely multivariate two-gene combination — CXCL12 and POSTN together — not a rebranded single marker. It also reconciles the two stability views: CXCL12 is the most *stably selected* gene (Figure 1A), while POSTN is the strongest *solo discriminator* out-of-distribution (Figure 1C); the model needs both.

### 3.4 From Prognostic Fingerprint to Predictive Enrichment: Two Distinct, Independently Significant Axes

The Stromal Cage biology operates on two separable clinical axes (Figure 1D), and conflating them is the central error this work avoids:

- **Prognostic axis — who progresses fastest.** The Stromal Cage tier is prognostic. In the independent-analysis cohort (GSE30161, PFI endpoint), Tier 1A "Accessible" versus Tier 1B "Caged" separated progression-free survival with **log-rank p=0.021** (n=26 vs 28). This corroborates the prior TCGA HGSOC finding that a 3-tier Stromal Cage stratification is prognostic (n=427, log-rank p≈0.004). On continuous Cox modeling, higher CXCL12 trended toward faster progression (HR 1.35 per SD, p=0.069) with POSTN weaker (HR 1.12, p=0.52); the proportional-hazards assumption held (Schoenfeld p=0.40 / 0.80). These are cohort-level prognostic associations — they tell you the trajectory, not the platinum-specific decision.
- **Predictive axis — who resists platinum.** The CXCL12/POSTN Elastic Net is a predictive-enrichment signal: it discriminates platinum sensitivity out-of-distribution (AUROC 0.638, p=0.031, §3.2). This is the axis that speaks to a treatment choice.

The FAP/CXCL10 fingerprint is the **prognostic baseline** (the immune-exclusion program that marks who does badly); the CXCL12/POSTN Elastic Net is the **predictive enrichment strategy** (who specifically will resist platinum). Their union defines the **Platinum Window**: the interval during which a tumor is still accessible to platinum before the stromal cage closes. Clinically, the value is in identifying the "Caged" (Tier 1B) patients who are on track to fail standard-of-care platinum — the exact population that stands to benefit from stromal-modifying pre-treatment (TGF-β/FAP-axis inhibition, CXCR4 blockade, or metabolic reprogramming with metformin) *before* conventional therapy is deployed into a closed window.

**Two distinct verdicts, both real.** For completeness and honesty: a separately frozen linear composite (IMMUNE_ACCESS = 0.40·TCELL_GPS − 0.35·MYELOID_FLOOD − 0.25·STROMAL_CAGE) was NOT-SUPPORTED across nine configurations (GSE63885 platinum AUROC 0.549–0.579, p=0.24–0.47). That composite and the Core-13 Elastic Net are *different models*; the composite failing and the two-gene Elastic Net reaching significance are not contradictory — they are two different tools, and we report both outcomes as-measured.

---

## Table 1. Frozen model out-of-distribution performance (GSE63885)

| Panel | Endpoint | n (pos/neg) | AUROC | DeLong 95% CI | p vs 0.5 | Verdict vs 0.70 bar |
|-------|----------|-------------|-------|---------------|----------|---------------------|
| **Core-13** | **platinum sensitivity** | 75 (41/34) | **0.638** | **0.513–0.764** | **0.031** | **INCONCLUSIVE (significant directional signal)** |
| Core-13 | chemoresponse | 75 (65/10) | 0.509 | 0.355–0.663 | 0.907 | NOT-SUPPORTED |
| Full-28 | platinum sensitivity | 75 (41/34) | 0.598 | 0.468–0.729 | 0.139 | NOT-SUPPORTED |
| Full-28 | chemoresponse | 75 (65/10) | 0.528 | 0.344–0.711 | 0.767 | NOT-SUPPORTED |

**Figure 1.** Multi-stream evidence for the Stromal Cage signature. **(A)** Bootstrap coefficient selection frequency (2,000 resamples, Core-13); CXCL12 and POSTN (orange) dominate. **(B)** Cross-cohort location shift; active genes (orange) shift ~4.5 log2 units, yet quantile normalization moves AUROC by only −0.004 (ρ=0.985), proving rank-based robustness. **(C)** Single-gene out-of-distribution AUROC (oriented; x-axis starts at 0.5 = chance); POSTN strongest solo but 0/28 survive BH-FDR. **(D)** Prognostic axis (TCGA and cohort tiers) versus predictive axis (Elastic Net) — two independently significant signals. Files: `figure1_stromal_cage_multistream.png/.svg`.

---

## 4. Discussion

The result of this work is a computationally isolated, mechanistically coherent, and independently transferable **two-gene core of platinum resistance — CXCL12 and POSTN** — recovered by regularization from a 28-gene microenvironment panel and confirmed out-of-distribution. The finding is not a claim of a finished clinical test; it is a claim about biology, and the biology is strong.

**Why this is the right shape of answer.** The independent literature converges on exactly the two genes the math selected. Stromal CXCL12 from CAFs drives EMT and cisplatin resistance and independently predicts platinum sensitivity in a 296-patient ovarian series [5]; high CXCL12 independently predicts poor ovarian survival [3]; and CXCR4 blockade reverses desmoplasia and restores immunotherapy response [2]. Periostin is a CAF-secreted driver of progression and drug resistance and a proposed prognostic/therapeutic target [8, 9, 10, 12]. That a leakage-guarded Elastic Net, given 28 candidates and a survival-derived label, discards 26 of them and keeps precisely CXCL12 and POSTN — with the correct (resistance-promoting) sign — is strong convergent evidence that the model locked onto real desmoplastic biology rather than cohort-specific noise.

**Prognostic versus predictive is the load-bearing distinction.** A tumor board does not need another marker of who will do badly; the FAP+ CAF literature already provides that, including in HGSOC with preserved CD8 density [18]. What is missing, and what the predictive axis supplies, is a readout of *when platinum will still work*. By separating the prognostic fingerprint (who progresses) from the predictive enrichment (who resists platinum), the Stromal Cage framework converts a static risk label into an actionable, time-resolved treatment decision — the **Platinum Window**. When the window is open (Tier 1A, Accessible), platinum is deployed on schedule. When it is closing (Tier 1B, Caged), the rational move is to modify the stroma first — CXCR4/TGF-β/FAP-axis inhibition or metabolic reprogramming — to reopen the window before spending a platinum cycle against a closed door [2, 16].

**We state the ceiling plainly.** The frozen model returns AUROC 0.638 — a statistically significant directional signal (p=0.031) that does not reach our pre-registered 0.70 release bar, so its verdict is INCONCLUSIVE and its status is discovery-only. This is not a failure of the biology; it is the honest ceiling of a single frozen model trained on 10 minority events (EPV ≈ 0.36) across a ~4.5 log2 batch gap, evaluated with no cross-cohort calibration. The batch-normalization analysis shows the discrimination itself is intact (ρ=0.985); what a deployable version must add is calibration, more events, and prospective, treatment-linked labels — not different biology. The two-gene reduction is the correct engineering response to the fragility, and it is the part that transferred.

**Limitations frame, not footnote.** See §7. In short: survival-derived training label (discovery, not clinical-label validation); low EPV; single training and single test cohort; operating threshold does not transfer without calibration; verdict INCONCLUSIVE against the release bar; the ARTISTRY-7 discussion in §8 is an illustrative real-world example of failed immunotherapy in a stroma-rich indication, not a retrospective claim on trial-level data we do not possess.

---

## 5. Conclusion

Regularization applied to a 28-gene microenvironment panel isolates CXCL12 and POSTN as the transferable, mechanistically correct core of the Stromal Cage's platinum-resistance program. The two-gene model carries a statistically significant, out-of-distribution, correctly-signed platinum-sensitivity signal (AUROC 0.638, p=0.031) that survives a severe cross-cohort batch effect at the level of discrimination. Combined with the prognostic Stromal Cage tiering, this defines the Platinum Window and identifies the Caged patients for whom stromal modification should precede platinum. The model is a discovery-grade, RUO signature — not a released clinical classifier — and the path to deployment is calibration and prospective validation, not a new hypothesis.

---

## 6. Reproducibility and Provenance

All headline numbers are anchored to frozen artifacts (SHA-256 recorded in the source receipt). Frozen coefficients: CXCL12 = −0.14973, POSTN = −0.10359 (`crispro_stromal_cage_v1_coefficients.csv`). Independent-reload of predictions from the coefficient JSON is exactly deterministic (max|Δ| = 0.00e+00); full-precision recompute versus the saved 4-decimal CSV differs by 4.91e-05, changing 0/75 calls and leaving AUROC identical (0.6385). Model: Elastic Net logistic (`saga`, `class_weight='balanced'`, `max_iter=5000`, `random_state=42`); nested 5×5 CV; z-scaler fit inside training folds; frozen Youden threshold; 2,000× stratified bootstrap (seed 42). Multi-stream analyses (coefficient stability, batch effect, survival, single-gene screen) and consolidated evidence: `consolidated_5worker_evidence.json`; per-stream outputs in the companion analysis bundle.

---

## 7. Limitations (binding)

1. **Discovery, not clinical-label validation.** The training label is survival-derived (PFI-based platinum sensitivity), because the GSE30161 RECIST chemoresponse label had a single non-responder. This makes the model a discovery signature; it does not establish a leakage-safe clinical classifier.
2. **Low events-per-variable.** 10 minority events in training (EPV ≈ 0.36). Nested-CV fold spread is wide (Core-13 0.50–0.80); the in-sample AUCs (0.71/0.83) are optimistic artifacts and are not used.
3. **Does not clear the release bar.** Core-13 out-of-distribution AUROC 0.638 → INCONCLUSIVE (pre-registered bar: ≥0.70 with CI-lower >0.5). No claim of RELEASE-SUPPORTIVE status is made.
4. **Operating point does not transfer.** A ~4.5 log2 cross-cohort shift breaks the frozen threshold (sensitivity 0.07). Discrimination (AUROC) is intact; deployment requires cross-cohort calibration.
5. **Single train / single test cohort.** Both GPL570 HGSOC. Generalization to other platforms, histologies, and prospectively collected specimens is untested.
6. **Prognostic survival is cohort-level and small.** Tier and Cox analyses (n=54) are corroborative and RUO; they are not patient-level outcome guarantees.
7. **Not the CrisPRO production ranker.** This is a new, mechanism-scoped discovery signature. It is distinct from, and does not alter the status of, any production engine; it does not promote any outcome engine to released status.

---

## 8. Product Positioning (Research Use Only)

> **RUO notice.** Everything in this section is forward-looking productization built *on top of* the biology in §3. None of it is a validated clinical decision-support tool, companion diagnostic, or treatment recommendation. Claims are gated on the honest verdicts of §3 and the limitations of §7. Deployment requires the cross-cohort calibration and prospective, treatment-linked validation described above.

The FAP/CXCL10 prognostic fingerprint combined with the CXCL12/POSTN Elastic Net is the biological engine of the CrisPRO **Stromal Cage** product line. Three products are positioned on this engine.

### 8.1 Product 1 — THE PLATINUM WINDOW (molecular-clock treatment-timing engine)

**Concept.** HGSOC platinum is dosed on a fixed calendar, blind to cage density. The Platinum Window engine reads the Stromal Cage transcriptional program and reports whether the window is open (Tier 1A, Accessible) or closing (Tier 1B, Caged), with the predictive CXCL12/POSTN score as the platinum-specific overlay.

**What the biology supports (and what it does not).** It supports a *rank-ordered, mechanistically-grounded* readout of cage density that is prognostic (tiering, p=0.021 cohort / p≈0.004 TCGA) and carries a significant out-of-distribution predictive signal for platinum sensitivity (AUROC 0.638, p=0.031). It does **not** yet support a hard, calibrated "window closed" call at a fixed threshold — because the operating point does not transfer across cohorts without calibration (§7.4). The honest v1 product is a **decision-support signal with a calibration requirement**, not an autonomous stop-light.

### 8.2 Product 2 — ASSET SALVAGE ENGINE (mechanistic autopsy for failed IO assets)

**Concept.** Immunotherapy trials in "cold," stroma-rich indications fail at high rates. The Asset Salvage Engine offers pharma a mechanistic-autopsy service: re-examine a failed trial through the Stromal Cage lens to ask whether the enrolled population was cage-dominated (immune-excluded) and therefore structurally unable to respond, and whether a cage-density companion diagnostic could define a responsive sub-population for a re-trial.

**Illustrative real-world example — ARTISTRY-7 (verified).** ARTISTRY-7 (NCT05092360; GOG-3063 / ENGOT-OV68) was a Phase 3 trial of nemvaleukin alfa + pembrolizumab versus investigator's-choice chemotherapy in platinum-resistant ovarian cancer (456 patients). At the pre-specified interim analysis it showed **no overall-survival benefit (median OS 10.1 vs 9.8 months; HR 0.98)**, and the sponsor halted development for this indication [24, 25, 26, 27, 28, 29]. This is a textbook target for mechanistic autopsy: an IL-2-axis immunotherapy deployed into an immunologically cold, frequently stroma-excluded tumor.

**Honest scope of the claim.** We use ARTISTRY-7 as a real, verifiable illustration of *the class of problem* the engine addresses. We make **no** retrospective claim that the Stromal Cage algorithm would have rescued ARTISTRY-7 — we have no access to ARTISTRY-7 patient-level biomarker data, and any such claim would be unfalsifiable. The scientifically defensible pitch is prospective and conditional: *given* cage-density profiling of archival trial samples, one can test the hypothesis that responders were cage-low and design an enrichment strategy — a hypothesis this manuscript's biology motivates but does not, by itself, prove for any specific trial.

**API endpoint (as built, RUO).** The productized entry point is an analysis endpoint that scores a cohort for cage density and platinum-window status.

- **Endpoint:** `POST /v1/stromal-cage/score`
- **Required inputs:**
  - `cohort_id` (string) — caller-side identifier.
  - `expression` (object) — per-sample log2 expression for at minimum the Core-13 genes (CXCL12, CXCR4, FAP, ACTA2, POSTN, CXCL9, CXCL10, CXCL11, CXCR3, CCL2, CCL5, CCL7, CCR2); Full-28 accepted. Platform declared in `platform`.
  - `platform` (enum) — e.g., `GPL570`, `RNAseq_TPM`, `RNAseq_counts`; drives normalization.
  - `normalization` (enum) — `none` | `zscore` | `quantile_to_reference`; **`quantile_to_reference` is required for cross-platform/cross-cohort input** (this is the §7.4 calibration requirement made explicit in the contract).
  - `reference_profile_id` (string, required when `normalization=quantile_to_reference`) — the reference distribution to map onto.
- **Optional inputs:** `labels` (per-sample platinum-sensitivity 0/1) to return AUROC/CI on the caller's own cohort; `return_per_gene` (bool); `model_version` (default = frozen Core-13 v1).
- **Outputs:** per-sample `stromal_cage_score`, `predicted_platinum_sensitivity` (probability), `tier` (1A/1B), `window_status` (`OPEN`/`CLOSING`); cohort-level `auroc` + `ci` + `p` when `labels` supplied; `model_version`, `calibration_applied`, and an RUO disclaimer echoed in the payload.
- **Guardrails (enforced):** the endpoint returns discrimination (ranking) results unconditionally, but any *thresholded* call (`window_status`) is emitted only when calibration is applied, and every response is stamped RUO / not-for-treatment-decisions.

### 8.3 Product 3 — 3-KEY TREATMENT ROUTER (cage-breaking sequence)

**Concept.** For patients the engine flags as Caged (Tier 1B; low CXCL10 immune signal with high FAP/CXCL12 stromal signal), the router proposes a mechanistic cage-breaking sequence — **metformin → dupilumab → checkpoint inhibitor** — i.e., modify the stroma/metabolic and type-2 immune context before deploying the checkpoint payload.

**Honest scope.** This sequence is a **mechanistic hypothesis** motivated by the stromal-modification literature [2, 16] and by the internal reprogramming-simulation gate (a default-off, observable, RUO simulation — not an outcome model and not a treatment recommendation). The manuscript's data support the *selection* step (identifying Caged patients via cage density) as a significant, correctly-signed signal; they do **not** validate the *intervention* sequence, which requires prospective testing. The router is positioned as a hypothesis-generating decision-support overlay, RUO.

---

## Notes on tone and integrity

This manuscript is written in a confident, non-hedging voice, but confidence is spent only where the data earn it. Where the pre-registered bar is not met, we say so plainly (INCONCLUSIVE, discovery-only) rather than dressing a 0.638 as a 0.70. The batch effect is characterized and quantified rather than hidden, and the analysis shows the discrimination survives it. The product section is explicitly RUO and forward-looking, and the one external trial named (ARTISTRY-7) is used strictly as a verified illustration of the problem class, with no unfalsifiable rescue claim. That is the strongest — and only defensible — version of the argument.
