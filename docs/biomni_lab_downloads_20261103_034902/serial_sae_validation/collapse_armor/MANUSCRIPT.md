# Platinum Resistance in High-Grade Serous Ovarian Cancer Is Written in Pre-Treatment Copy-Number Structure, Not in Post-Treatment Transcriptional State

Fahad Kiani, CrisPRO.ai

---

## Abstract

Efforts to predict platinum resistance in high-grade serous ovarian carcinoma (HGSOC) from post-treatment transcriptional state have not produced a durable biomarker. We show why, and where the signal actually is.

Reanalysing the BriTROC-1 copy-number signature cohort (159 patients, 265 samples), we find that a previously reported association between copy-number signature 7 at relapse and platinum resistance is an artefact of outcome labelling. The original analysis derived resistance from a sparsely populated RECIST response field, yielding three resistant patients. Substituting the cohort's platinum-sensitivity field — which is 98/98 concordant with the BriTROC-1 clinical master record — abolishes the association and inverts its direction. Signature 7 is null in every framing: at relapse (AUROC 0.429, 95% CI 0.307–0.563, n=108), in paired relapse samples (0.355, n=47), at diagnosis (0.493, p=0.93, n=98), and in adjusted logistic regression (OR 0.75 per SD, p=0.35).

The discriminating feature is signature 3, the homologous-recombination-deficiency (HRD) axis, measured **at diagnosis**. Resistant tumours carry less than half the s3 exposure of sensitive tumours (0.081 vs 0.183; AUROC 0.729; q_BH = 0.012, the only signature of seven surviving false-discovery correction). The association is independent of age, stage and prior therapy (OR 0.36 per SD, 95% CI 0.17–0.80, p=0.011) and holds on overall survival (adjusted HR 0.70, 95% CI 0.49–0.99, p=0.043; proportional-hazards assumptions satisfied). Patients in the lowest s3 tertile have a median overall survival of 1,482 days versus 2,794 days in the highest (log-rank p=0.025). CCNE1 amplification, which marks the HR-proficient state, independently predicts resistance (OR 4.35, p=0.023).

We then asked why post-treatment RNA fails. In paired pre- and post-neoadjuvant single-cell transcriptomes from 11 HGSOC patients (51,786 cells), chemotherapy imposes a clonal bottleneck: malignant clonal diversity falls 27.8% (Shannon; p=0.049) while the surviving cells scatter *further apart* transcriptionally (dispersion +14.3%, p=0.027). Per-cell transcriptome entropy and gene detection are unchanged, excluding a technical artefact. Survivors additionally arrest, with proliferation falling in 10 of 11 patients (p=0.019), and this arrest fully accounts for the apparent collapse of HR and cell-cycle pathway scores (residual shift after adjustment, p=0.70). A population that is simultaneously clonally depleted, transcriptionally dispersed and proliferatively arrested cannot support a stable mean-expression biomarker.

Finally, we tested directly whether the bottleneck selects for the resistance-associated structural state. Per-cell copy-number inference recovers the expected HGSOC landscape (8q gain in 68% of malignant cells, CCNE1/19q12 amplification in 22%), confirming the instrument, and shows no enrichment of any resistance locus in survivors (all p > 0.14). The determinants of platinum resistance are present before treatment and are structural; the post-treatment transcriptome records the damage, not the cause.

---

## Introduction

Platinum-based chemotherapy remains the backbone of HGSOC treatment, and the interval to relapse after platinum is the strongest available prognostic variable. A biomarker that identified resistant disease before or during first-line therapy would change management. The dominant strategy has been to profile tumours after treatment and look for transcriptional programmes that distinguish those that will relapse quickly.

This strategy rests on an assumption that has not been tested: that the post-treatment transcriptome is a stable enough measurement surface to carry a predictive signal. We show that it is not, and that the assumption fails for a specific, measurable reason — chemotherapy restructures the malignant population in a way that degrades exactly the quantity such biomarkers measure.

We also address a specific published-adjacent claim. Copy-number signature 7 exposure at relapse has been reported to discriminate platinum resistance with high accuracy. We show this result does not survive correct outcome labelling, and we identify what does.

---

## Results

### A label-sourcing artefact accounts for the reported signature 7 association

The original analysis assigned platinum resistance by parsing a RECIST overall-response field: progressive or stable disease was coded resistant, complete or partial response sensitive. That field is sparsely populated, and the resulting cohort contained 3 resistant and 37 sensitive patients. On this labelling, signature 7 exposure at relapse discriminates resistance with AUROC 0.874 (95% CI 0.757–0.973, p=0.035), rising from 0.694 at diagnosis. We reproduced this result exactly to four decimal places before altering anything.

BriTROC-1 carries a separate field, platinum sensitivity at registration, which encodes the standard definition of platinum resistance (relapse within six months of platinum). Across the 98 diagnosis-stage patients analysable here, this field is **98/98 concordant** with the platinum status published alongside the signature exposures, and its cohort-wide split (66 resistant of 273) matches the published BriTROC-1 composition. It is the correct label.

Holding the copy-number data completely fixed and changing only the label source collapses the result (**Figure 1**). On the same 40 patients, the resistant count rises from 3 to 9 and signature 7 AUROC falls from 0.874 to 0.314. Extending to all patients with published exposures, signature 7 is null everywhere:

| Cohort | n | Resistant | s7 AUROC | 95% CI | p |
|---|---|---|---|---|---|
| Original, RECIST label | 40 | 3 | 0.874 | 0.757–0.973 | 0.035 |
| Same 40, platinum label | 40 | 9 | 0.314 | 0.108–0.545 | 0.095 |
| Paired cohort, relapse | 47 | 10 | 0.355 | 0.146–0.590 | 0.168 |
| All relapse samples | 108 | 28 | 0.429 | 0.307–0.563 | 0.269 |
| All diagnosis samples | 98 | 20 | 0.493 | 0.340–0.645 | 0.926 |

Every confidence interval contains 0.5. The point estimates sit consistently below it, meaning that to the extent signature 7 carries any information, higher exposure trends with platinum *sensitivity* — the opposite of the original claim. Signature 7 change between diagnosis and relapse is likewise null (AUROC 0.345, p=0.138).

Three events cannot support a diagnostic claim, and the direction reversal on correction shows that the original estimate was not merely imprecise but pointed the wrong way.

### The HRD axis at diagnosis discriminates platinum resistance

Testing all seven signatures at diagnosis under Benjamini-Hochberg correction, exactly one survives (**Figure 2A**). Signature 3 — the copy-number axis associated with BRCA1/2-driven homologous-recombination deficiency — separates resistant from sensitive disease with AUROC 0.729 (p=0.0017, q_BH=0.012). Resistant tumours carry less than half the exposure of sensitive tumours (mean 0.081 vs 0.183; **Figure 2B**). Signature 4 is nominally significant (AUROC 0.649, p=0.040) but does not survive correction (q=0.139). Signature 7 is the least informative feature in the panel (AUROC 0.493, p=0.926).

The direction is mechanistically expected and is the point of the finding: low s3 denotes an intact, HR-*proficient* genome. Such tumours repair platinum-induced interstrand crosslinks competently and are therefore intrinsically less platinum-sensitive. The signal is not a marker of acquired resistance; it is a marker of a repair capacity the tumour possessed before treatment.

In logistic regression adjusted for age, stage at diagnosis and prior chemotherapy lines, each standard deviation of s3 reduces the odds of platinum resistance by 64% (OR 0.36, 95% CI 0.17–0.80, p=0.011). Signature 7 in the same model is null (OR 0.75, 95% CI 0.42–1.36, p=0.35).

### Low HRD-axis exposure predicts shorter overall survival

The resistance label and survival are different endpoints, and the finding holds on both. In Cox proportional-hazards models across 98 patients with 50 deaths, s3 exposure at diagnosis is protective (adjusted HR 0.70 per SD, 95% CI 0.49–0.99, p=0.043), while stage behaves as expected (HR 1.83, p=0.010) and signature 7 does not reach significance (HR 0.76, p=0.071). Schoenfeld residual tests show no proportional-hazards violation for any covariate (all p > 0.32).

Stratified by s3 tertile, median overall survival is 1,482 days in the lowest tertile, 2,350 days in the middle, and 2,794 days in the highest — a monotonic gradient spanning 3.6 years, log-rank p=0.025 between extremes (**Figure 3**).

### CCNE1 amplification marks the same HR-proficient resistant state

CCNE1 amplification is the canonical HR-proficient, BRCA-wild-type HGSOC state and is mutually exclusive with HRD. In the 98 diagnosis-stage patients with CCNE1 annotation, amplification predicts platinum resistance: 6 of 13 amplified tumours (46%) were resistant versus 14 of 85 neutral (16%), odds ratio 4.35, Fisher p=0.023 (**Figure 2C**). CCNE1-amplified tumours carry lower s3 exposure (0.099 vs 0.172), directionally consistent with mutual exclusivity, though this comparison is underpowered at 13 amplified cases (p=0.071; s3 vs continuous CCNE1 copy number, Spearman rho = −0.17, p=0.095).

Two independent structural readouts — one signature-based, one locus-based — therefore converge on the same pre-treatment configuration.

### Chemotherapy imposes a clonal bottleneck and destabilises the survivors

We analysed 8,806 malignant cells from paired pre- and post-neoadjuvant chemotherapy (NACT) samples in 11 HGSOC patients, using the 34,935 immune and 8,045 stromal cells in the same dataset as internal controls. Because clonal-diversity statistics are sensitive to the number of cells sampled and the cell counts were badly unbalanced (from 189 → 2,159 in one patient to 1,017 → 99 in another), every paired comparison was recomputed after subsampling both timepoints of each patient to the pair minimum, averaged over 500 resamples.

Chemotherapy produces two opposite effects simultaneously (**Figure 4**):

| Metric | Pre-NACT | Post-NACT | Change | p |
|---|---|---|---|---|
| Clonal diversity (Shannon) | 1.699 | 1.226 | **−27.8%** | 0.049 |
| Clonal diversity (Simpson) | 0.741 | 0.551 | **−25.7%** | 0.049 |
| Transcriptional dispersion | 12.01 | 13.73 | **+14.3%** | 0.027 |
| Total transcriptional variance | 180.2 | 251.2 | +39.4% | 0.106 |
| Per-cell transcriptome entropy | 6.571 | 6.611 | +0.6% | 0.375 |

Clonal diversity collapses in 8 of 10 evaluable patients, while transcriptional dispersion increases in 7 of 10. In several patients the collapse is severe: one tumour falls from 1.82 to 0.44 Shannon diversity, another from 1.80 to 0.50, in each case a single subclone coming to dominate the residual population.

Critically, per-cell transcriptome entropy and gene detection are unchanged. Individual cells are not becoming transcriptionally flatter or shallower; the population is being restructured. This excludes sequencing depth, capture efficiency and cell quality as explanations, and it distinguishes the effect from a global degradation of RNA content.

Survivors also arrest. The proliferation score falls in 10 of 11 patients (p=0.019, q=0.043) and the cycling fraction drops from 27.5% to 17.2%. This arrest is not incidental: it fully explains two features that initially appeared to be independent biology. Apparent post-NACT collapse of HR-pathway expression (p=0.014) and of CCNE1/cell-cycle expression (p=0.019) are both tightly coupled to the proliferation change (r = +0.76 and +0.85; p=0.006 and 0.001), and after regressing out proliferation neither retains any residual shift (p=0.70 and 0.97). Reporting either as an HR-status change would have been an error.

### The bottleneck does not select for the resistance-associated amplifications

The natural synthesis — that chemotherapy selects for the HR-proficient, CCNE1-amplified state identified in BriTROC-1 — makes a testable prediction: survivors should be enriched for those amplifications. We tested it directly by inferring copy number per cell from expression, using immune and stromal cells as the diploid reference.

The instrument validates. It recovers 8q gain in 68% of malignant cells, MYC/8q24 amplification in 55%, and CCNE1/19q12 amplification in 22% — the expected frequencies for HGSOC (**Figure 5B**). These are real copy-number calls, not noise.

The prediction fails (**Figure 5A**). No resistance locus is enriched in post-NACT survivors:

| Locus | Δ inferred CN | Patients increased | p |
|---|---|---|---|
| CCNE1 / 19q12 | +0.001 | 3/11 | 0.365 |
| MYC / 8q24 | +0.009 | 7/11 | 0.240 |
| chr8q arm | −0.0001 | 5/11 | 0.966 |
| chr19q arm | −0.002 | 2/11 | 0.175 |

Amplified-cell fractions give the same answer (all p > 0.14), and independent expression-based amplicon proxies agree (CCNE1 19q12 score, p=0.765). No single-cell feature — structural or transcriptional — separates the 7 resistant from the 4 sensitive patients in this cohort (all q = 1.0). The only suggestion of outcome linkage is that patients whose transcriptional dispersion increased most had shorter platinum-free intervals (Spearman rho = −0.59, p=0.074), which we report as a hypothesis, not a result.

We therefore do not claim that the bottleneck builds or selects the structural armour. Two findings stand: resistance is predicted by pre-treatment copy-number structure, and chemotherapy degrades the transcriptome as a measurement surface. The causal link between them is not demonstrated here and, given that the two cohorts comprise different patients, cannot be demonstrated by this design.

---

## Discussion

The practical consequence is a negative recommendation with a positive alternative.

Post-treatment mean pathway expression should not be used as a platinum-resistance biomarker in HGSOC. This is not a statement about any particular gene set. It follows from what chemotherapy does to the population being measured: it removes most clones, disperses the survivors transcriptionally, and drives them into proliferative arrest. A mean computed over such a population is less representative and less stable than the same mean computed before treatment, and the arrest imposes a large correlated shift across every proliferation-linked pathway — which is most of them. That is a sufficient mechanistic explanation for why post-treatment transcriptional biomarkers in this disease have repeatedly failed to replicate, including in the discovery analysis that motivated this work.

Copy-number structure at diagnosis behaves in the opposite way. It is fixed, it is measurable before the first cycle of platinum, and it carries the signal: the HRD axis discriminates resistance (q=0.012) and predicts survival (adjusted HR 0.70), and CCNE1 amplification independently marks the same HR-proficient state (OR 4.35). Neither requires a post-treatment sample.

The evolutionary reading is constrained by our negative bridge result. The data are consistent with resistance being an intrinsic, pre-existing property of the tumour genome rather than something constructed under treatment pressure — the HRD axis measured at diagnosis, before any selection has occurred, is what predicts outcome, and signature exposures at relapse predict nothing. But we could not detect selection for the corresponding amplifications through the bottleneck, and an intrinsic-property model and a selection model are not distinguished by the evidence presented here. Distinguishing them requires paired single-cell DNA and RNA from the same patients across treatment, which neither cohort provides.

The signature 7 result is worth stating plainly as a methodological point. It was not a marginal finding that failed to replicate; it was a well-powered-looking result (AUROC 0.874, p=0.035, CI excluding 0.5) generated from three events read through a sparsely populated label field, and it reversed direction when the correct field was used. The cohort contained the right label all along. Where two outcome fields exist, concordance with the cohort's published composition should be checked before either is used.

---

## Limitations

The BriTROC-1 analysis covers the 159 patients with published copy-number signature exposures, not the full 273-patient cohort, and the diagnosis-stage models rest on 98 patients with 20 resistance events; the adjusted logistic model carries five covariates against those 20 events, which is below conventional events-per-variable guidance and means the adjusted odds ratio should be read as supportive of the unadjusted result rather than as an independent estimate. Signature exposures are reanalysed from published values rather than recomputed from raw sequencing, so pipeline-level errors would propagate. The single-cell cohort comprises 11 patients and 8,806 malignant cells, and while the bottleneck effects are directionally consistent and survive rarefaction, their FDR-adjusted q-values sit near 0.10; they warrant replication in an independent paired cohort. Clonal identity is taken from the original authors' subclustering, which was not derived independently of the expression data used to measure dispersion. Copy number in the single-cell data is inferred from expression, which resolves arm-level and large focal events reliably — as the recovery of expected HGSOC frequencies confirms — but is insensitive to small amplicons and cannot exclude enrichment below its detection limit. Finally, the two cohorts are different patients, so the relationship between the pre-treatment structural findings and the post-treatment population dynamics is inferential.

---

## Methods

**Copy-number signature cohort.** Signature exposures, platinum status, CCNE1 status and prior treatment lines for BriTROC-1 were obtained from the open-access source data of Nature Communications 2023 (DOI 10.1038/s41467-023-39867-7, Supplementary Data 10), comprising 1,855 exposure measurements across 7 signatures, 265 samples and 159 patients. Clinical covariates and survival were joined from the BriTROC-1 clinical master record on patient identifier. Where a patient contributed multiple samples at a timepoint, exposures were averaged within patient and timepoint. Platinum resistance was defined by the cohort's platinum-sensitivity-at-registration field; concordance with the published per-sample platinum status was 98/98.

**Discrimination and inference.** Discrimination was quantified by AUROC with 2,000-resample bootstrap percentile confidence intervals. Group differences used the Mann-Whitney U test. Signature 3 was not pre-specified; all seven signatures were tested in parallel and Benjamini-Hochberg false-discovery correction was applied within each timepoint, with q_BH reported alongside nominal p. Multivariable models were logistic regression for resistance and Cox proportional hazards for overall survival, both adjusted for age, stage at diagnosis and prior chemotherapy lines, with continuous signature exposures standardised. Proportional hazards were checked by Schoenfeld residual tests with rank time transform.

**Single-cell data.** GSE165897 UMI counts and cell annotations were downloaded from GEO (51,786 cells, 32,847 genes, 11 patients; SHA-256 recorded). Analysis was restricted to the 8,806 cells annotated as malignant. Because Shannon entropy is depth-dependent, per-cell transcriptome entropy was computed after multinomial downsampling of every cell to a common budget of 7,849 UMI (the 10th percentile of malignant-cell depth), retaining 7,925 of 8,806 cells. Population structure was measured on log-normalised counts restricted to 2,000 highly variable genes, scaled, and reduced to 30 principal components; transcriptional dispersion is the mean Euclidean distance to the patient-timepoint centroid. Clonal diversity is Shannon and Simpson diversity over the annotated malignant subclusters.

**Rarefaction.** All diversity and dispersion comparisons were recomputed after subsampling both timepoints of each patient to the pair minimum without replacement, averaged over 500 resamples. One patient with 18 post-NACT malignant cells was excluded from rarefied analyses (threshold 20 cells), leaving 10 paired patients. Paired comparisons used the Wilcoxon signed-rank test with Benjamini-Hochberg correction across metrics.

**Proliferation control.** S-phase and G2/M scores were assigned with standard cell-cycle gene sets and a combined proliferation score computed. Pathway-score changes were regressed on the per-patient proliferation change by ordinary least squares, and residual shifts tested by Wilcoxon signed-rank.

**Copy-number inference.** Per-cell copy number was inferred with infercnvpy using all 8,806 malignant cells and 8,000 randomly sampled immune and stromal cells as the diploid reference, with gene coordinates from GENCODE v44 (21,738 autosomal and X-linked genes with coordinates; 100-gene window, step 10). Locus scores were the mean inferred value over genomic bins spanning CCNE1/19q12 (chr19:29–32 Mb), MYC/8q24 (chr8:126–130 Mb), and the chr8q and chr19q arms. Per-cell amplification was called at the reference mean plus two standard deviations.

**Reproducibility.** The original 40-patient signature 7 result was reproduced to four decimal places as a regression gate before any modification. All derived tables, per-cell features, per-patient matrices and provenance records are provided alongside the figures.

---

## Data availability

BriTROC-1 copy-number signature exposures, platinum status and CCNE1 annotation: open-access source data of DOI 10.1038/s41467-023-39867-7. Controlled-access BriTROC-1 sequencing: EGA study EGAS00001007292, dataset EGAD00001011049. Single-cell transcriptomes: GEO GSE165897. Platinum-free-interval annotations for GSE165897 derive from Zhang et al., Science Advances 2022, DOI 10.1126/sciadv.abm1831, Table 1.

## Figures

- **Figure 1** — Signature 7 does not survive correct outcome labelling.
- **Figure 2** — Structural predictors at diagnosis: HRD axis and CCNE1 amplification.
- **Figure 3** — Overall survival by signature 3 tertile.
- **Figure 4** — Chemotherapy collapses clonal diversity while survivors scatter and arrest.
- **Figure 5** — No enrichment of resistance loci in survivors, with instrument validation.
