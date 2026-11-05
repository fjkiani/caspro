# MFAP4 Verification Report — Anti-Fraud Model Card

**Analyte:** MFAP4 (microfibril-associated protein 4), an extracellular-matrix / stromal glycoprotein
**Intended context:** Platinum-resistance risk stratification in high-grade serous ovarian cancer (HGSOC)
**Classification decision:** **Component Input** (downgraded from "Standalone Predictor")
**Status:** Research Use Only (RUO) / hypothesis-generating. Not a validated clinical diagnostic.
**Evidence base:** 3 independent GPL570 ovarian cancer cohorts, 161 patients, 56 platinum-resistant
**Reproducibility:** all metrics re-derived from raw GEO data by a single committed script
(`scripts/mfap4_multicohort_validation.py`); deterministic across runs (bootstrap seed=7, CV seed=42)

---

## TL;DR (the honest headline)

Most diagnostic platforms will tell you MFAP4 is a "strong biomarker." When we pulled the raw data
and re-derived the number under an honest label definition, MFAP4 alone scores **AUROC 0.684
(95% CI 0.557–0.805)** for platinum resistance — a lower confidence bound that sits only ~0.06 above
pure chance. Worse, across three independent cohorts the single gene is **unstable**: it ranges from
**0.529 (a coin-flip) to 0.797**. A marker that decays to chance in an independent cohort cannot be a
standalone predictor.

We therefore do three things, and we publish all of them:

1. **Gag order on the single gene.** MFAP4 is reclassified from *Standalone Predictor* to
   *Component Input.* It is never surfaced alone as a resistance call.
2. **Fuse it into the stromal readout.** MFAP4 joins `STROMAL_CAGE` (`FAP, POSTN, ACTA2, MFAP4`) to
   measure the physical/desmoplastic wall as a context score — not as a peak-accuracy classifier.
3. **Publish this model card.** We disclose exactly what the composite does and does not do, including
   the finding that it does **not** beat the single gene on raw discrimination in our cohorts — its
   value is **stability and interpretability.**

---

## 1. What was claimed vs. what the data support

The committed manuscript framed MFAP4 as "the strongest single-gene predictor" with
**AUROC = 0.763 (95% CI 0.654–0.867)** on GSE63885 (reported n=101, 34 resistant / 67 sensitive).

On re-derivation directly from the GEO series matrix, the platinum-sensitivity field in GSE63885 has
four states: **resistant (34), moderately sensitive (28), highly sensitive (13), and `na` (26)**. The
26 `na` samples have **no recorded platinum-response outcome**. The published n=101 / 67-sensitive
figure is only reachable by counting those 26 unevaluable samples as "sensitive."

| Label definition | n | Resistant | Sensitive | MFAP4 AUROC | 95% CI |
|---|---|---|---|---|---|
| **Honest** (drop `na`) | 75 | 34 | 41 | **0.684** | 0.557–0.805 |
| Published (`na`→sensitive) | 101 | 34 | 67 | 0.763 | 0.654–0.867 |

**The labeling artifact inflates AUROC by +0.079.** The honest number is **0.684** — the same value
independent readers have flagged. This report treats 0.684 as the correct single-cohort estimate.

---

## 2. Multi-cohort evidence base

To avoid resting a clinical claim on one cohort, we assembled three **platform-matched** cohorts
(all Affymetrix HG-U133 Plus 2.0 / GPL570, so probe IDs are identical), each with platinum-response
labels:

| Cohort | Platform | n | Resistant | Sensitive | Resistance definition |
|---|---|---|---|---|---|
| GSE63885 | GPL570 | 75 | 34 | 41 | author `platinium sensitivity` = "resistant" (`na` excluded) |
| GSE30161 | GPL570 | 58 | 10 | 48 | progression-free interval < 180 d |
| GSE51373 | GPL570 | 28 | 12 | 16 | original authors' resistant/sensitive call |
| **Pooled** | — | **161** | **56** | **105** | — |

This roughly **doubles** the original evidence base (75 → 161 patients; 34 → 56 events).
Probe set: MFAP4 `212713_at`; FAP `209955_s_at`,`210972_x_at`; POSTN `210809_s_at`,`214981_at`,`218326_s_at`;
ACTA2 `200974_at` (multi-probe → mean; expression z-scored within each cohort). GSE51373 is
distributed on a linear intensity scale and is log2-transformed before scoring; the detection and
transform are automatic and logged by the reproducibility script.

---

## 3. Head-to-head: single gene vs. STROMAL_CAGE

`STROMAL_CAGE` scored as the unweighted mean of z-scored `FAP, POSTN, ACTA2, MFAP4` (all oriented
high → resistant). AUROC with bootstrap 95% CI (n=5000); composite-vs-gene difference by DeLong's test.

| Cohort | n | Resistant | MFAP4 AUROC (95% CI) | STROMAL_CAGE AUROC (95% CI) | Δ | DeLong p |
|---|---|---|---|---|---|---|
| GSE63885 | 75 | 34 | 0.684 (0.557–0.805) | 0.633 (0.509–0.758) | −0.051 | 0.157 |
| GSE30161 | 58 | 10 | 0.529 (0.333–0.729) | 0.629 (0.410–0.825) | +0.100 | 0.666 |
| GSE51373 | 28 | 12 | 0.797 (0.594–0.969) | 0.729 (0.526–0.901) | −0.068 | 0.894 |

**Finding (stated plainly): the composite does not beat the single gene on discrimination in any
cohort** (no significant DeLong difference; direction inconsistent). A cross-validated *fitted*
logistic composite (class-balanced, scaling inside folds, 20× repeated stratified 5-fold) gives the
same verdict, and the existing canonical cage `[CXCL12, CXCR4, FAP, ACTA2, POSTN]` is not better on a
fitted basis (cross-validated AUROC 0.52 in GSE63885, 0.56 in GSE51373).

We report this rather than hide it. Overselling the composite would repeat exactly the error we are
correcting in the single gene.

### The composite's real advantage: stability

| Metric (per-cohort AUROC) | MFAP4 alone | STROMAL_CAGE |
|---|---|---|
| Mean | 0.670 | 0.664 |
| Range | 0.529 – 0.797 | 0.629 – 0.729 |
| **Std. dev. (cross-cohort)** | **0.110** | **0.046** |
| Ever at/below chance? | **Yes (0.529)** | No |

The composite's cross-cohort standard deviation is **less than half** that of the single gene, and it
**never collapses to chance**. In leave-one-cohort-out external transfer (train a class-balanced
logistic model on two cohorts, test on the held-out third), MFAP4-alone swings from 0.529 to 0.797
(mean 0.670); the stromal readout stays in a tighter, always-above-chance band (0.585–0.740,
mean 0.651). **The composite buys reproducibility, not peak accuracy** — which is exactly what you
want from a *context score* that feeds a larger model.

---

## 4. Biological grounding (why a stromal readout is defensible)

The stromal/desmoplastic wall is a real platinum-resistance axis in ovarian cancer, independent of the
weak transcriptomic discrimination of any one gene:

- **POSTN** (periostin) marks reactive stroma; high tumor POSTN is associated with **primary
  chemoresistance and shorter PFS**, and recombinant POSTN promotes carboplatin/paclitaxel resistance
  in vitro [8].
- **FAP** (fibroblast activation protein) stromal expression **predicts platinum resistance
  (p=0.0154)** and shorter time to recurrence [10].
- **Cancer-associated fibroblasts** are established drivers of ovarian drug resistance, and CAF gene
  signatures stratify risk across multi-center cohorts [5, 6, 7].
- **MFAP4** is a tissue-remodeling / ECM glycoprotein with integrin-signaling roles [2, 4]. Critically,
  its prognostic direction is **context-dependent** — a tumor suppressor in triple-negative breast
  cancer [1] but overexpressed and poor-prognosis in glioma [3]. This directional inconsistency across
  tumor types is a mechanistic reason **not** to trust MFAP4 as a standalone readout, and a reason to
  interpret it only inside a stromal-context panel.

So the biology supports *measuring the wall*; our data caution against claiming any single gene, or
even this small composite, is a high-performance resistance classifier on transcriptome alone.

---

## 5. Answers to the three strategic questions

### (a) What is our moat?

Not a higher AUROC — anyone can quote 0.76 by mislabeling unevaluable samples. **Our moat is
verifiable honesty and calibration:**

1. **Provenance + reproducibility.** Every number in this card is emitted by one committed script from
   raw GEO matrices with fixed seeds, and is byte-for-byte reproducible across runs; we caught and
   corrected a +0.079 labeling inflation that a "0.763" platform ships as a headline.
2. **Multi-cohort stress-testing.** We report the number that makes our own marker look weak (0.529 in
   GSE30161) instead of cohort-cherry-picking. Competitors quoting a single-cohort AUROC cannot show
   you the cross-cohort decay; we can, and we did.
3. **Correct role assignment.** We ship MFAP4 as a *component input* to a stromal-context score, with
   an explicit statement of what it does not do. That is defensible to a clinical partner, an FDA
   reviewer, and a skeptical KOL — a raw single-gene AUROC is not.

The product is not the biomarker; the product is the **model card and the pipeline that produced it.**

### (b) How does the composite separate from / improve on the stromal cage?

In these three cohorts, on raw discrimination, **it does not** — and we say so. The separation is on a
different axis:

- **Stability:** cross-cohort SD 0.046 vs 0.110; never at chance. The stromal readout is a
  *reproducible* measurement of the desmoplastic wall, whereas single-gene MFAP4 is a coin-flip in one
  of three cohorts.
- **Interpretability:** the composite reads out a coherent biological construct (reactive stroma /
  CAF activation) supported by orthogonal literature [5–10], rather than a single noisy probe.
- **Composability:** as a bounded, always-above-chance context score, it can be safely fed into a
  larger multi-axis model (DDR/HRD × immune × stroma) without dragging that model to chance — which
  the raw gene would risk.

The honest separation statement: **the composite is not a better classifier; it is a better
instrument** — reproducible, interpretable, and safe to compose.

### (c) What second product would we build with this?

A **Stromal-Context Layer** for a multi-axis resistance model. MFAP4/`STROMAL_CAGE` is one of three
orthogonal axes:

1. **DDR/HRD axis** — the platinum-sensitivity driver (BRCA/HRD).
2. **Immune-exclusion axis** — T-cell/myeloid balance.
3. **Stromal/ECM axis** — `STROMAL_CAGE` (this work): the physical/desmoplastic wall.

The second product is the **integrated three-axis platinum-resistance model with per-axis attribution**,
where the stromal layer's job is to explain *why* a DDR-proficient-looking tumor still resists
(stromal drug-penetration barrier), and to flag candidates for **stromal-targeting combinations**
(e.g., anti-FAP / anti-CAF strategies) [5, 6]. The stromal layer earns its place by adding
**explanatory orthogonality and stability**, not by inflating a single AUROC.

---

## 6. Limitations (stated up front)

- **Single-platform.** All three cohorts are GPL570 microarray; no RNA-seq or protein/IHC validation
  yet. Cross-platform portability is untested.
- **Modest events per variable.** 56 pooled resistant events; the smallest cohorts carry 10 (GSE30161)
  and 12 (GSE51373) events. Fitted multi-gene composites are at the edge of statistical adequacy
  (EPV < 10 in the smaller cohorts); the unweighted composite is used specifically to avoid
  overfitting, and confidence intervals are correspondingly wide.
- **Class imbalance in GSE30161.** With only 10 resistant of 58, single-cohort AUROC estimates there
  are noisy; this is precisely why cross-cohort stability, not any one cohort, drives the conclusion.
- **Label heterogeneity.** Resistance is defined by disease-free / platinum-free interval < 180 d in
  two cohorts and by the original authors' classification in the third; these are related but not
  identical constructs.
- **Discovery/validation-in-one-family.** These are three retrospective cohorts of the same disease and
  platform; this is a strengthened discovery study, **not** prospective clinical validation.
- **Transcriptome only.** Bulk expression cannot separate tumor-intrinsic from stromal-admixture
  signal; tumor purity is a plausible confounder for all stromal genes.

None of these are disqualifying for an RUO context score; all are disqualifying for a "standalone
predictor" claim — which is why the downgrade stands.

---

## 7. Decision record

- MFAP4 role: **Standalone Predictor → Component Input** (permanent, data-justified).
- `STROMAL_CAGE = [FAP, POSTN, ACTA2, MFAP4]` is registered as a **stromal-context score (RUO)**, with
  the explicit caveat that it does not exceed single-gene discrimination in the current evidence base
  and is retained for stability/interpretability/composability.
- All single-gene "strong biomarker" framing is retracted in the accompanying manuscript.

## 8. Reproducibility & artifacts

- Data: GSE63885, GSE30161, GSE51373 (GEO; GPL570), downloaded fresh from GEO.
- One-command reproduction: `python scripts/mfap4_multicohort_validation.py --data-dir <geo_dir> --out mfap4_multicohort_results.json`
- Results table: `mfap4_multicohort_results.json` (emitted by the script above; every AUROC, CI, DeLong
  p, CV score, and cross-cohort SD in this card is taken from it).
- Figures: `fig1_forest_mfap4_vs_cage.png`, `fig2_stability_solo_vs_cage.png`, `fig3_roc_per_cohort.png`
- Methods: bootstrap CI n=5000 (stratified within class), seed=7; DeLong test for paired AUROC;
  repeated stratified 5-fold CV (20 repeats, class-balanced logistic regression, feature scaling
  performed inside folds); leave-one-cohort-out external transfer (logistic model trained on two
  cohorts, tested on the held-out third).
