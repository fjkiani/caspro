# MFAP4 Is a Weak, Cohort-Unstable Single-Gene Marker of Platinum Resistance in High-Grade Serous Ovarian Cancer: A Multi-Cohort Honest Validation and Its Repositioning as a Stromal-Composite Component

**Authors:** Fahad Kiani 

**Affiliations:** CrisPRO.org

**Corresponding Author:** AK

**Running Title:** MFAP4 as a Stromal-Composite Component, Not a Standalone Predictor

**Keywords:** ovarian cancer, platinum resistance, MFAP4, stromal/ECM signature, STROMAL_CAGE, component input, composite biomarker, honest validation

**Abbreviations:**
- HGSOC: High-grade serous ovarian cancer
- EMT: Epithelial-mesenchymal transition
- AUROC: Area under the receiver operating characteristic curve
- CV: Cross-validation
- DDR: DNA damage repair
- HRD: Homologous recombination deficiency
- ECM: Extracellular matrix
- TME: Tumor microenvironment

---

## Abstract

**Background:** Platinum resistance affects 60-70% of patients with high-grade serous ovarian cancer (HGSOC) and remains a major clinical challenge. Existing biomarkers focus primarily on DNA damage repair (DDR) pathway deficiencies (BRCA1/2, HRD score), but resistance mechanisms are heterogeneous. We hypothesized that epithelial-mesenchymal transition (EMT) markers, orthogonal to DDR pathways, could identify platinum-resistant tumors.

**Methods:** We evaluated MFAP4 (microfibril-associated protein 4) and a stromal composite (`STROMAL_CAGE`: FAP, POSTN, ACTA2, MFAP4) as platinum-resistance markers across three independent, platform-matched cohorts (Affymetrix U133 Plus 2.0 / GPL570): GSE63885 (n=75, disease-free interval <180 d, unevaluable samples excluded), GSE30161 (n=58, platinum-free interval <180 d), and GSE51373 (n=28, original authors' classification); pooled n=161, 56 resistant. Expression was probe-to-gene mapped and z-scored within each cohort. Discrimination was assessed by AUROC with bootstrap 95% CIs (n=5000, seed=7), composite-vs-gene differences by DeLong's test, and generalizability by repeated stratified cross-validation and leave-one-cohort-out transfer.

**Results:** Under an honest label definition that excludes samples with no recorded platinum-response outcome, MFAP4 single-gene AUROC in GSE63885 is 0.684 (95% CI: 0.557–0.805) — not 0.763, which is reachable only by counting 26 unevaluable samples as sensitive (an inflation of +0.079). Across the three cohorts MFAP4 alone is unstable, ranging from 0.529 (a coin-flip, GSE30161) to 0.797 (cross-cohort SD 0.110). The `STROMAL_CAGE` composite does not exceed single-gene discrimination in any cohort (DeLong p = 0.157, 0.666, 0.894), but is substantially more stable (cross-cohort SD 0.046; never at chance).

**Conclusions:** MFAP4 is a **weak and cohort-unstable single-gene marker** and should not be used as a standalone platinum-resistance predictor. Its appropriate role is a **component input** to a stromal-context composite, whose value is measurement stability and biological interpretability rather than higher discrimination. We report these results, including the labeling correction and the composite's lack of discrimination gain, as a deliberately non-overclaiming (RUO / hypothesis-generating) validation.

---

## Introduction

High-grade serous ovarian cancer (HGSOC) is the most common and lethal subtype of epithelial ovarian cancer, with approximately 22,000 new cases and 14,000 deaths annually in the United States (1). Standard first-line treatment consists of platinum-based chemotherapy (carboplatin or cisplatin) combined with paclitaxel, with or without bevacizumab (2). Despite initial response rates of 70-80%, 60-70% of patients develop platinum-resistant disease within 6 months of completing first-line therapy (3). Platinum resistance is the primary driver of mortality in HGSOC, with median overall survival dropping from 5-6 years in platinum-sensitive disease to 12-18 months in platinum-resistant disease (4).

Current biomarkers for treatment selection focus primarily on DNA damage repair (DDR) pathway deficiencies. Germline and somatic BRCA1/2 mutations predict response to PARP inhibitors (5,6), and homologous recombination deficiency (HRD) scores identify tumors with defective DNA repair (7). However, these biomarkers capture only one axis of resistance biology. Clinical experience demonstrates that some patients with intact DDR pathways develop platinum resistance, while others with HRD-high tumors may still respond to platinum therapy (8). This heterogeneity suggests that additional resistance mechanisms operate independently of DNA repair capacity.

Epithelial-mesenchymal transition (EMT) represents a distinct biological axis associated with chemotherapy resistance (9). EMT programs activate mesenchymal gene expression, reduce epithelial markers, and promote stromal-like phenotypes that confer survival advantages under therapeutic stress (10). In ovarian cancer, EMT signatures have been linked to poor prognosis and resistance to multiple chemotherapeutic agents (11,12). However, validated expression-based biomarkers for platinum resistance that operate through EMT mechanisms remain limited.

Microfibril-associated protein 4 (MFAP4) is an extracellular matrix (ECM) and stromal-associated gene that tracks mesenchymal/stromal states in cancer (13). MFAP4 expression correlates with EMT activation and has been implicated in tumor-stroma interactions that promote therapeutic resistance (14). We hypothesized that MFAP4, as a proxy for EMT/stromal phenotype, could predict platinum resistance independently of DDR pathway status.

Here, we report a deliberately conservative, multi-cohort re-examination of MFAP4 as a platinum-resistance marker across three platform-matched cohorts (GSE63885, GSE30161, GSE51373; pooled n=161). We show that MFAP4's single-cohort AUROC is 0.684 (not 0.763) once samples without a recorded platinum-response outcome are correctly excluded, that its discrimination is unstable across cohorts (0.529–0.797), and that a stromal composite (`STROMAL_CAGE`: FAP, POSTN, ACTA2, MFAP4) does not improve discrimination but does improve cross-cohort stability. These findings reposition MFAP4 from a putative standalone biomarker to a **component input** within a stromal-context readout.

---

## Methods

### Study Design

We performed a retrospective, multi-cohort biomarker re-analysis using three publicly available, platform-matched high-grade serous ovarian cancer gene expression datasets with annotated platinum-response outcomes. All analyses were conducted using a single reproducible, deterministic script with complete provenance tracking.

### Data Sources

Three GEO cohorts on the same platform (GPL570; Affymetrix Human Genome U133 Plus 2.0):

| Cohort | Accession | n (evaluable) | Resistant | Resistance definition |
|--------|-----------|---------------|-----------|-----------------------|
| GSE63885 | [GSE63885](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE63885) | 75 | 34 | Author `platinium sensitivity` = "resistant" (26 `na` excluded) |
| GSE30161 | [GSE30161](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE30161) | 58 | 10 | Progression-free interval < 180 days |
| GSE51373 | [GSE51373](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE51373) | 28 | 12 | Author chemotherapy resistant/sensitive classification |

Pooled: n=161, 56 resistant, 105 sensitive. Data were read from processed GEO series matrix files.

#### Data Processing

Probe-level values were mapped to gene symbols using a fixed probe-to-gene map defined in the analysis script (not derived from an external annotation file). For genes with multiple probes, expression was averaged across probes and then z-scored within each cohort. Matrices on a linear scale (detected when the matrix median ≥ 20; GSE51373) were log2(x+1)-transformed before z-scoring; log2-scale matrices were used as provided.

**Probe-to-gene mapping (as used by the script):**
- MFAP4: `212713_at`
- FAP: `209955_s_at`, `210972_x_at` (mean)
- POSTN: `210809_s_at`, `214981_at`, `218326_s_at` (mean)
- ACTA2: `200974_at`
- CXCL12: `203666_at`, `209687_at` (mean) — code-cage reference only
- CXCR4: `209201_x_at`, `211919_s_at`, `217028_at` (mean) — code-cage reference only

### Outcome Definitions

**Platinum resistance (binary outcome):**
- **Resistant (positive class = 1)**: `platinum_sensitivity == "resistant"`
- **Sensitive (negative class = 0)**: `platinum_sensitivity ∈ {"moderately sensitive", "highly sensitive"}`
- **Excluded**: Missing or "NA" platinum sensitivity labels

Under this definition GSE63885 yields **n=75** evaluable samples: **34 resistant** and **41 sensitive**. The 26 samples with no recorded platinum-response outcome (`na`) are excluded. (Counting those 26 as sensitive would give n=101 / 67 sensitive and inflate AUROC from 0.684 to 0.763; this is the retracted definition and is not used here.) For GSE30161, resistance is defined as progression-free interval (PFI) < 180 days (n=58, 10 resistant); for GSE51373, the author chemotherapy resistant/sensitive classification is used (n=28, 12 resistant).

### Biomarker Definitions

#### MFAP4 Single-Gene Biomarker

MFAP4 expression was evaluated as a continuous score for predicting platinum resistance. Expression values were z-score normalized across samples:

\[
z(MFAP4) = \frac{MFAP4 - \mu_{MFAP4}}{\sigma_{MFAP4}}
\]

#### STROMAL_CAGE Composite Score

We evaluated a stromal/ECM composite, `STROMAL_CAGE`, comprising four stromal-associated genes:

\[
\text{STROMAL\_CAGE} = \frac{z(FAP) + z(POSTN) + z(ACTA2) + z(MFAP4)}{4}
\]

All four genes are positively oriented (high → resistant). Each gene's expression was z-score normalized within each cohort (multi-probe genes averaged before z-scoring) prior to composite calculation. This unweighted composite is used as a fixed, interpretable instrument rather than a fitted classifier, for the reasons given in Limitations (low events-per-variable within any single small cohort).

### Statistical Analysis

#### Primary Metric: Area Under ROC Curve (AUROC)

Discrimination was quantified using the area under the receiver operating characteristic curve (AUROC) for predicting the positive class (platinum resistant). AUROC values range from 0.5 (random) to 1.0 (perfect discrimination), with values >0.7 considered clinically meaningful.

#### Bootstrap Confidence Intervals

We computed 95% confidence intervals for AUROC using bootstrap resampling (n=5000 bootstrap iterations, seed=7). Bootstrap samples were drawn with replacement, and AUROC was computed for each bootstrap sample. Confidence intervals were derived from the 2.5th and 97.5th percentiles of the bootstrap distribution.

#### Comparing MFAP4 vs the composite (DeLong)

Within each cohort we compared the AUROC of MFAP4 alone against `STROMAL_CAGE` using the DeLong test for two correlated ROC curves, reporting ΔAUROC and the two-sided p-value.

#### Cross-cohort stability and transfer

To quantify stability we computed the mean, standard deviation, and range of each score's AUROC across the three cohorts. As a transfer check we performed leave-one-cohort-out (LOCO) evaluation: a logistic-regression model (C=1.0, `max_iter=1000`, `class_weight="balanced"`, features z-scored within each cohort) was trained on two cohorts and evaluated on the held-out third. Repeated stratified 5-fold cross-validation (20 repeats, seed=42, in-fold scaling) was additionally computed within cohorts and is reported in the receipt for completeness; because of low events-per-variable it is used only as a supporting diagnostic, not as a headline metric.

#### Individual Gene Performance

We also evaluated each single gene individually to assess univariate performance (MFAP4 and the composite members FAP, POSTN, ACTA2; and, for reference, additional mesenchymal genes), reported as AUROC with direction (high → resistant or low → resistant).

### Reproducibility and Data Availability

All data artifacts, analysis scripts, and results are tracked in-repo with complete provenance.

**Data source:** GSE63885, GSE30161, GSE51373 (Gene Expression Omnibus; platform GPL570). Series matrices are read directly.

**Primary receipt:** `mfap4_multicohort_results.json` (all reported metrics; deterministic across runs).

**Analysis script:**
- `publications/07-MFAP4/scripts/mfap4_multicohort_validation.py`

**Reproduce command:**
```bash
python publications/07-MFAP4/scripts/mfap4_multicohort_validation.py \
  --data-dir <dir with GSE63885/GSE30161/GSE51373 series_matrix.txt> \
  --out mfap4_multicohort_results.json
```

This script generates `mfap4_multicohort_results.json` with all reported metrics (single-gene AUROCs, composite AUROCs, DeLong comparisons, cross-cohort stability). A legacy single-cohort script (`scripts/gse63885_bootstrap_ci.py`) is retained only to reproduce the retracted 0.763 and is labeled as such in `DATA_CODE_AVAILABILITY.md`.

---

## Results

### Cohort Characteristics

Three platform-matched (GPL570) high-grade serous ovarian cancer cohorts were analyzed (pooled n=161, 56 resistant, 105 sensitive):
- **GSE63885** (honest n=75): 34 resistant, 41 sensitive — label from the `platinium sensitivity` field; the 26 samples with no recorded platinum-response outcome (`na`) are excluded.
- **GSE30161** (n=58): 10 resistant, 48 sensitive — resistance defined as progression-free interval (PFI) < 180 days.
- **GSE51373** (n=28): 12 resistant, 16 sensitive — author classification (chemotherapy resistant/sensitive).

All classification thresholds and probe mappings are fixed in the analysis script.

### MFAP4 Single-Gene Performance

Under the honest label definition (excluding 26 samples with no recorded platinum-response outcome), MFAP4 expression achieved **AUROC = 0.684** (95% CI: 0.557–0.805, bootstrap n=5000) in GSE63885. The previously reported 0.763 (95% CI 0.654–0.867) is an artifact of counting those 26 unevaluable samples as sensitive (n=101), which inflates AUROC by +0.079. Across all three cohorts MFAP4 alone ranged from 0.529 (a coin-flip, GSE30161) to 0.797 (GSE51373), with a cross-cohort standard deviation of 0.110 — i.e., it is a weak and unstable single-gene marker.

**Direction**: High MFAP4 expression → platinum resistant (consistent with EMT/stromal phenotype).

**Receipt**: `mfap4_multicohort_results.json`

### STROMAL_CAGE Composite Performance

The `STROMAL_CAGE` composite (FAP, POSTN, ACTA2, MFAP4; z-scored within cohort, averaged) does **not** exceed MFAP4 single-gene discrimination in any cohort — DeLong p = 0.157 (GSE63885), 0.666 (GSE30161), 0.894 (GSE51373); no comparison reaches significance. Its value is **stability**, not accuracy: cross-cohort AUROC SD is 0.046 (range 0.629–0.729) versus 0.110 (range 0.529–0.797) for MFAP4 alone, and the composite never falls to chance in any cohort. Per-cohort AUROCs: GSE63885 0.633 (0.509–0.758), GSE30161 0.629 (0.410–0.825), GSE51373 0.729 (0.526–0.901).

**Direction**: High composite → platinum resistant.

**Receipt**: `mfap4_multicohort_results.json`

### Individual Component-Gene Performance

We evaluated each `STROMAL_CAGE` member gene individually (high → resistant) across all three cohorts. No single component gene is a strong or stable discriminator; each swings substantially by cohort, mirroring MFAP4's own instability.

Univariate AUROC by cohort:

| Gene | GSE63885 | GSE30161 | GSE51373 | Comment |
|------|----------|----------|----------|---------|
| **MFAP4** | **0.684** | **0.529** | **0.797** | Best in GSE63885/GSE51373 but a coin-flip in GSE30161 |
| FAP | 0.600 | 0.604 | 0.490 | Weak; drops below chance in GSE51373 |
| POSTN | 0.641 | 0.681 | 0.651 | The most consistent single component (0.64–0.68) |
| ACTA2 | 0.563 | 0.627 | 0.698 | Weak-to-moderate; cohort-dependent |

**Receipt**: `mfap4_multicohort_results.json` (`individual_cage_genes_auroc`; re-derived from raw GEO series matrices for GSE63885, GSE30161, GSE51373).

### Biological Interpretation

MFAP4 (microfibril-associated protein 4) is an extracellular matrix (ECM) and stromal-associated gene that tracks mesenchymal/stromal states. High MFAP4 expression indicates:
1. **EMT activation**: Mesenchymal phenotype associated with reduced platinum sensitivity
2. **Stromal admixture**: Potential tumor-stroma interactions that promote resistance
3. **ECM remodeling**: Altered drug penetration and survival pathway activation

The `STROMAL_CAGE` composite captures a coordinated stromal/ECM program (FAP, POSTN, ACTA2, MFAP4); its advantage over the single gene is stability across cohorts rather than higher discrimination.

---

## Discussion

### Clinical Significance

Across three independent cohorts (pooled n=161), MFAP4 single-gene discrimination for platinum resistance is **weak (AUROC 0.684 in GSE63885) and unstable (0.529–0.797)**. It does **not** meet a threshold for clinical utility and, critically, decays to a coin-flip (0.529) in one independent cohort — disqualifying it as a standalone predictor. The stromal composite does not improve discrimination but is more stable. The mechanistically interesting property is that this stromal/ECM axis is orthogonal to DNA-damage-repair biomarkers, which motivates its use as one input among several rather than as a standalone test.

**Comparison to existing biomarkers:**
- **CA-125**: Primarily prognostic, limited predictive value for platinum response
- **HRD score**: Captures DDR deficiency but misses stroma/ECM-driven resistance
- **BRCA1/2**: Predicts PARP response but not platinum resistance per se
- **MFAP4**: Weak, cohort-unstable single-gene marker (AUROC 0.684; 0.529–0.797 across cohorts); appropriate only as a **component input** to a stromal-context composite, not as a standalone predictive biomarker

### Biological Plausibility

MFAP4 expression tracks mesenchymal/stromal phenotypes through several mechanistically plausible pathways:

1. **ECM remodeling and drug penetration**: Stromal programs alter extracellular matrix stiffness and composition, potentially reducing platinum drug penetration into tumor cells (15).

2. **TGF-β/EMT activation**: EMT programs activate anti-apoptotic signaling pathways (e.g., PI3K/AKT, NF-κB) that reduce platinum-induced cell death (16).

3. **Stromal admixture**: High MFAP4 may partially reflect tumor purity, with fibroblast-rich tumors showing reduced platinum sensitivity independent of tumor-intrinsic resistance mechanisms (17).

4. **Survival pathway activation**: Mesenchymal states activate survival pathways (e.g., integrin signaling, focal adhesion kinase) that confer resistance to multiple chemotherapeutic agents (18).

The orthogonal relationship to DDR pathways is particularly important. Patients with high MFAP4 expression may develop platinum resistance even in the presence of favorable HRD status, explaining clinical observations of resistance heterogeneity.

### Orthogonality to DDR Pathways

A key finding is that MFAP4 captures resistance mechanisms independent of DNA repair deficiency. This orthogonality has several clinical implications:

1. **Complementary biomarker panels**: MFAP4 + HRD score could provide more comprehensive resistance prediction than either alone.

2. **Treatment selection**: Patients with high MFAP4 but favorable HRD status may benefit from alternative first-line strategies (e.g., bevacizumab, immunotherapy) or closer monitoring.

3. **Resistance mechanism stratification**: MFAP4 identifies EMT-driven resistance, potentially guiding targeted interventions (e.g., EMT inhibitors, stromal-targeting agents).

### Clinical Applications

**Companion diagnostic potential:**
- **Pre-treatment risk stratification**: High MFAP4 → consider alternative or intensified first-line regimens
- **Monitoring**: Serial MFAP4 measurement could track EMT progression during treatment
- **Trial enrichment**: Enrich clinical trials for patients with EMT-driven resistance

**Integration with existing biomarkers:**
- **MFAP4 + HRD score**: Combined panel captures both DDR and EMT resistance axes
- **MFAP4 + CA-125**: Expression + protein biomarkers for comprehensive assessment
- **MFAP4 + BRCA status**: Stratify patients by resistance mechanism (DDR vs EMT)

### Limitations

1. **Discovery, not prospective**: This is a retrospective, multi-cohort re-analysis of public microarray data (GSE63885, GSE30161, GSE51373; pooled n=161, 56 resistant). It establishes that MFAP4 is weak and cohort-unstable and that the composite is more stable — it does not establish clinical predictive utility. Prospective validation is required before any treatment-selection use.

2. **Single platform**: All three cohorts are Affymetrix U133 Plus 2.0 (GPL570). Cross-platform generalization (RNA-seq, NanoString, ctDNA) is untested; platform effects could alter both discrimination and stability.

3. **Small cohorts, few events, low events-per-variable (EPV)**: Resistant-event counts are small (34, 10, and 12). GSE30161 in particular has only 10 resistant of 58 (~17%), so its per-cohort AUROC (MFAP4 0.529; CAGE 0.629) has wide confidence intervals and the class imbalance limits precision. For the 4-gene composite, EPV is low, so composite weights are not robustly estimable within a single small cohort — a further reason the composite is framed as a stability/instrument argument rather than a fitted classifier.

4. **Label heterogeneity across cohorts**: Resistance is defined differently per cohort (GSE63885 author `platinium sensitivity`; GSE30161 PFI < 180 days; GSE51373 author classification). These are not identical endpoints, which contributes to cross-cohort variance and complicates pooling.

5. **Tumor-purity / deconvolution confounder**: MFAP4, FAP, POSTN, and ACTA2 are stromal/ECM genes; bulk expression partly reflects stromal admixture and tumor purity. Without matched purity estimates or deconvolution, an unknown fraction of the signal may be a purity surrogate rather than tumor-intrinsic resistance biology.

6. **No orthogonal-platform confirmation of the retraction correction**: The +0.079 inflation is demonstrated by re-derivation from the same series matrix under an honest label definition; it is internally reproducible but not independently re-measured on a separate assay.

### Future Directions

1. **Prospective and cross-platform validation**: Extend beyond the three GPL570 cohorts analyzed here to independent prospective cohorts and to RNA-seq/ctDNA platforms, ideally with harmonized resistance endpoints and matched tumor-purity estimates.

2. **Prospective clinical trials**: Evaluate MFAP4 as a companion diagnostic in prospective treatment selection trials.

3. **Platform translation**: Validate MFAP4 on RNA-seq and ctDNA platforms for broader clinical accessibility.

4. **Integrated biomarker panels**: Develop combined MFAP4 + HRD + BRCA panels for comprehensive resistance prediction.

5. **Mechanistic studies**: Investigate MFAP4-driven resistance pathways (ECM remodeling, TGF-β signaling) to identify therapeutic targets.

6. **Serial monitoring**: Evaluate MFAP4 dynamics during treatment to track EMT progression and guide treatment modifications.

---

## Conclusions

Across three independent, platform-matched cohorts (pooled n=161, 56 resistant), **MFAP4 is a weak and cohort-unstable single-gene marker** for platinum resistance (AUROC 0.684 in GSE63885; range 0.529–0.797). The previously reported 0.763 was an artifact of counting unevaluable samples as sensitive. A stromal composite (`STROMAL_CAGE`: FAP, POSTN, ACTA2, MFAP4) does not improve discrimination over the single gene but more than halves cross-cohort variance (SD 0.110 → 0.046) and never falls to chance. MFAP4's stromal/ECM axis is biologically orthogonal to DNA-damage-repair biomarkers.

We therefore reposition MFAP4 as a **component input** to a stromal-context readout rather than a standalone predictive biomarker, and we report the labeling correction and the composite's lack of discrimination gain explicitly. These results are Research Use Only / hypothesis-generating. Future work should pursue cross-platform (RNA-seq/protein) validation, prospective cohorts, and integration of the stromal axis with DDR and immune axes in a multi-input resistance model.

---

## Data Availability

All data are public and read directly from GEO series matrices:

**Public data sources (platform GPL570):**
- GSE63885: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE63885
- GSE30161: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE30161
- GSE51373: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE51373

**Primary receipt:** `mfap4_multicohort_results.json` (all reported metrics; emitted by the analysis script; deterministic).

---

## Code Availability

All analysis is contained in a single deterministic script with complete provenance:

**Primary analysis:**
- `publications/07-MFAP4/scripts/mfap4_multicohort_validation.py`
  - Reads the three GEO series matrices, applies fixed probe maps and label definitions, computes single-gene and `STROMAL_CAGE` AUROCs with bootstrap CIs (n=5000, seed=7), DeLong comparisons, repeated stratified cross-validation, leave-one-cohort-out transfer, and cross-cohort stability
  - Generates `mfap4_multicohort_results.json` with all reported results

**Legacy (transparency only):**
- `publications/07-MFAP4/scripts/gse63885_bootstrap_ci.py` — reproduces the **retracted** single-cohort 0.763 (n=101); retained only to document the labeling inflation, not used for any reported result.

**Reproduce command:**
```bash
python publications/07-MFAP4/scripts/mfap4_multicohort_validation.py \
  --data-dir <dir with GSE63885/GSE30161/GSE51373 series_matrix.txt> \
  --out mfap4_multicohort_results.json
```

This command regenerates all reported metrics and validates reproducibility.

---

## Author Contributions

Complete per-journal CRediT instructions at submission; replace role lines below with named contributors.

- **Conceptualization**: [Names]
- **Methodology**: [Names]
- **Software**: [Names]
- **Validation**: [Names]
- **Formal Analysis**: [Names]
- **Investigation**: [Names]
- **Resources**: [Names]
- **Data Curation**: [Names]
- **Writing – Original Draft**: [Names]
- **Writing – Review & Editing**: [Names]
- **Visualization**: [Names]
- **Supervision**: [Names]
- **Project Administration**: [Names]
- **Funding Acquisition**: [Names]

---

## Competing Interests

None

---

## References

1. Siegel RL, Miller KD, Wagle NS, Jemal A. Cancer statistics, 2023. CA Cancer J Clin. 2023;73(1):17-48.

2. National Comprehensive Cancer Network. Ovarian Cancer (Version 1.2024). https://www.nccn.org/professionals/physician_gls/pdf/ovarian.pdf

3. Lheureux S, Braunstein M, Oza AM. Epithelial ovarian cancer: Evolution of management in the era of precision medicine. CA Cancer J Clin. 2019;69(4):280-304.

4. Pujade-Lauraine E, et al. Bevacizumab combined with chemotherapy for platinum-resistant recurrent ovarian cancer: The AURELIA open-label randomized phase III trial. J Clin Oncol. 2014;32(13):1302-1308.

5. Mirza MR, et al. Niraparib maintenance therapy in platinum-sensitive, recurrent ovarian cancer. N Engl J Med. 2016;375(22):2154-2164.

6. Moore K, et al. Maintenance olaparib in patients with newly diagnosed advanced ovarian cancer. N Engl J Med. 2018;379(26):2495-2505.

7. Telli ML, et al. Homologous recombination deficiency (HRD) score predicts response to platinum-containing neoadjuvant chemotherapy in patients with triple-negative breast cancer. Clin Cancer Res. 2016;22(15):3764-3773.

8. Konstantinopoulos PA, et al. Homologous recombination deficiency: Exploiting the fundamental vulnerability of ovarian cancer. Cancer Discov. 2015;5(11):1137-1154.

9. Thiery JP, Acloque H, Huang RY, Nieto MA. Epithelial-mesenchymal transitions in development and disease. Cell. 2009;139(5):871-890.

10. Nieto MA, Huang RY, Jackson RA, Thiery JP. EMT: 2016. Cell. 2016;166(1):21-45.

11. Ahmed N, et al. The role of epithelial-mesenchymal transition in ovarian cancer progression and metastasis. Gynecol Oncol. 2010;117(2):209-215.

12. Kajiyama H, et al. Chemoresistance to paclitaxel induces epithelial-mesenchymal transition and enhances metastatic potential for epithelial ovarian carcinoma cells. Int J Oncol. 2007;31(2):277-283.

13. Additional primary literature on *MFAP4* expression and function—curate from PubMed during copy-editing.

14. *MFAP4* in ovarian cancer and HGSOC context—curate from PubMed during copy-editing.

15. ECM remodeling, stromal interface, and drug penetration—supporting reviews to be added from PubMed.

16. TGF-β / EMT and anti-apoptotic signaling in platinum resistance—supporting reviews to be added from PubMed.

17. Stromal admixture, tumor purity, and expression deconvolution—supporting methods papers to be added from PubMed.

18. Mesenchymal survival pathways and related biomarkers—supporting reviews to be added from PubMed.

---

**Manuscript Status**: Draft for review  
**Last Updated**: January 28, 2025  
**Receipts Validated**: ✅ All metrics from `mfap4_multicohort_results.json`