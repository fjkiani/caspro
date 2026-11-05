# Federated, integrity-gated re-analysis of controlled-access shallow whole-genome sequencing reproduces published copy-number segmentation in high-grade serous ovarian cancer: a platform-validation study

**Manuscript — Version 1.0 (methods / validation report)**

**Author:** Fahad Kiani, CrisPRO (Phylo)
**Date:** 25 July 2026
**Classification:** Research-Use-Only (RUO) / hypothesis-generating throughout. Not medical advice; not a diagnostic or regulatory submission. No clinical decision-making claim is made.
**Data snapshot:** frozen 2026-07-25T04:32Z — 94 verified copy-number profiles (86 resistance-labeled; 8 complete diagnosis–relapse pairs). Acquisition was ongoing at freeze; all quantities below refer to this immutable snapshot.

---

## Abstract

**Background.** A recurring obstacle in computational precision oncology is demonstrating that a platform can acquire and correctly analyze *real, access-restricted, patient-level* sequencing data — not just curated summary tables. We report a validation of a federated data-acquisition and copy-number (CN) analysis pipeline against a controlled-access shallow whole-genome sequencing (sWGS) cohort of high-grade serous ovarian carcinoma (HGSC), the BriTROC-1 relapse cohort (EGA dataset EGAD00001011049).

**Methods.** Raw BAM byte streams were acquired server-side under an integrity-gated protocol (plaintext-checksum fetch → strict MD5 verification → retry → `samtools quickcheck` → QDNAseq sanity bounds), with no local handling of controlled-access credentials by the analyst. Each BAM was independently re-binned and segmented with QDNAseq (30 kb bins, hg19), and a genomic-instability summary (breakpoint count = intra-chromosomal segment transitions; segment-value dispersion; fraction of genome aberrant) was derived per sample. Independently re-derived breakpoint counts were compared to the published BriTROC-1 absolute-CN values (Spearman). A pre-specified secondary hypothesis — that higher CN instability associates with primary platinum resistance — was tested cross-sectionally (AUROC with 2000-iteration stratified bootstrap 95% CI, seed 42; Mann–Whitney U; Benjamini–Hochberg FDR) and longitudinally on matched diagnosis–relapse pairs (Wilcoxon signed-rank), with events-per-variable (EPV) reported.

**Results.** Across 86 samples with published comparators, independently re-derived breakpoint counts reproduced the published segmentation with **Spearman ρ = 0.830 (p = 5.8 × 10⁻²³)**. On 8 complete diagnosis–relapse pairs, the change in breakpoint count was not significant (**Wilcoxon W = 14, p = 0.641**), consistent with the published finding of remarkable CN stability between diagnosis and relapse in HGSC. The pre-specified resistance hypothesis was **not supported and the observed direction was opposite** to that hypothesized: resistant samples trended toward *fewer* breakpoints and *lower* instability (breakpoint AUROC = 0.278, 95% CI [0.124, 0.450], BH q = 0.046; segment-SD AUROC = 0.234, 95% CI [0.084, 0.416], q = 0.028; fraction-aberrant AUROC = 0.378, 95% CI [0.144, 0.636], q = 0.236). The analysis was **underpowered (EPV = 9, < 10)** and is reported as discovery-only.

**Conclusions.** The pipeline acquires and correctly re-analyzes real, controlled-access, patient-level genomic data end to end, reproducing published CN segmentation with high concordance. The transparently reported null (paired delta) and opposite-direction, underpowered exploratory result illustrate the governance standard the platform holds itself to: strong positive evidence for the capability under validation, and full disclosure of exploratory findings that do not confirm a pre-specified hypothesis.

---

## 1. Introduction

Computational oncology platforms routinely claim to "analyze patient data," but most such claims rest on curated, pre-processed summary matrices distributed for open access. The harder and more decision-relevant question is whether a platform can operate on **controlled-access, patient-level primary data** — sequencing reads behind a data-access committee — and reproduce a published result without introducing artifacts. This is a prerequisite for any downstream claim that a platform can stratify patients, profile a tumor microenvironment, or model resistance from real evidence rather than from illustrative examples.

We chose the BriTROC-1 relapse cohort as the validation target because it is (i) controlled-access, forcing a realistic acquisition path; (ii) shallow WGS, so CN is the natural, well-characterized readout; and (iii) accompanied by a rigorous, peer-reviewed CN analysis with published per-sample values, providing an external ground truth [1]. HGSC is defined by near-ubiquitous *TP53* mutation and pervasive copy-number change, and a central published observation is that the HGSC genome is **remarkably stable between diagnosis and relapse**, with no significant difference in purity, ploidy, or focal somatic CN alterations even when stratified by platinum sensitivity [1]. That published stability provides a strong, specific prediction against which to test both our pipeline (concordance) and a pre-specified instability→resistance hypothesis (which, if the genome is stable, should be hard to support longitudinally).

This report is deliberately a **platform-validation** study, not a therapeutic or biomarker-discovery claim. All framing is RUO / hypothesis-generating.

---

## 2. Methods

### 2.1 Cohort and data source
BriTROC-1 relapse cohort, EGA dataset **EGAD00001011049** (study EGAS00001007292; DAC EGAC00001000388): shallow WGS of HGSC, hg19/GRCh37 (hs37d5), archival (diagnosis) and relapse tumor samples. The published sample manifest provided an explicit per-sample `time_point` field keyed by sample identifier; timepoints were assigned **only** from this explicit field (never inferred from identifier prefixes). Primary platinum-resistance labels were taken from the published BriTROC-1 clinical table (categorical primary-resistance flag).

### 2.2 Federated, integrity-gated acquisition
Raw BAM byte streams were retrieved through a federated broker that authenticates to the controlled-access archive server-side; the analyst never handled dataset credentials locally. Each file passed a strict integrity gate before any analysis:
1. fetch the archive's plaintext (unencrypted) MD5 for the file;
2. stream the BAM and compute its MD5; **reject on mismatch** (no partial/corrupt stream is admitted);
3. up to 3 retries on transient failure;
4. `samtools quickcheck` for structural validity;
5. QDNAseq sanity bounds (reject if median segment value ∉ (0.3, 3.0) or segment-value SD > 5.0).

Files failing the gate after retries were recorded as explicit per-file failures and **excluded**; no imputation or substitution was performed. During acquisition the broker exhibited a period of degraded delivery producing truncated streams; every such stream failed the MD5 check and was rejected, so no corrupt bytes entered the analysis.

### 2.3 Copy-number feature derivation
Each verified BAM was processed with **QDNAseq** (30 kb bins, hg19). Reads were binned and filtered (`applyFilters`: residual and blacklist filters on), corrected, normalized, and segmented (`segmentBins`, `transformFun = "sqrt"`). From the segmented profile we derived, per sample:
- **breakpoint count** — the number of **intra-chromosomal** segment transitions (adjacent bins with |Δ segmented value| > 1 × 10⁻⁴ within the same chromosome; chromosome boundaries were **not** counted as breakpoints);
- **segment-value SD** — dispersion of segmented log2-like values (an instability proxy);
- **fraction of genome aberrant** — fraction of bins deviating from the neutral state.

### 2.4 Statistical analysis (pre-specified)
- **Pipeline concordance:** Spearman rank correlation between independently re-derived breakpoint counts and published BriTROC-1 breakpoint values, over all samples with a published comparator.
- **Longitudinal (paired) analysis:** for patients with both a diagnosis and a relapse profile, the per-patient change in breakpoint count (relapse − diagnosis) was tested against zero with the **Wilcoxon signed-rank test**. Where a patient contributed multiple samples at a timepoint, the timepoint value was the mean.
- **Cross-sectional resistance association:** for each CN feature, discrimination of primary platinum resistance was summarized by **AUROC**, with a **2000-iteration stratified bootstrap 95% CI** (fixed seed 42), a **Mann–Whitney U** test, and **Benjamini–Hochberg FDR** across the three features (`scipy.stats.false_discovery_control`, method="bh").
- **Pre-specified direction & criterion:** the hypothesis was *higher CN instability → resistant*; it would be considered supported only if AUROC > 0.5 with a bootstrap CI excluding 0.5 in that direction. **Events-per-variable (EPV)** was reported; EPV < 10 was pre-designated as underpowered.
- **Sensitivity/orthogonal checks:** the published 30 kb absolute-CN segment table and per-sample purity/ploidy fits were retained as orthogonal references.

### 2.5 Reproducibility
All statistics were computed by a single scripted routine over the machine-readable feature outputs; figures were generated from the same frozen snapshot. Frozen inputs (`real_bam_features.csv`, `paired_delta.csv`, `resistance_association.json`) and snapshot metadata accompany this report.

---

## 3. Results

### 3.1 The pipeline reproduces published CN segmentation from raw reads
Across **86** samples with a published comparator, independently re-derived breakpoint counts were strongly concordant with the published BriTROC-1 values: **Spearman ρ = 0.830, p = 5.8 × 10⁻²³** (Figure 1). Concordance held across the full range of genomic instability, from near-flat profiles to highly rearranged genomes. This is the primary result: the federated acquisition + QDNAseq pipeline reproduces an external, peer-reviewed CN analysis directly from controlled-access primary reads.

A mild systematic tendency for re-derived counts to exceed published counts is expected and attributable to methodological differences (binning/segmentation parameters and the exact breakpoint definition) between the two pipelines; it does not affect rank concordance.

### 3.2 Copy-number is stable between diagnosis and relapse
On **8** patients with complete diagnosis and relapse profiles, the change in breakpoint count (relapse − diagnosis) was not significantly different from zero (**Wilcoxon signed-rank W = 14, p = 0.641**; mean Δ = −190.9, median Δ = +4.75) (Figure 2). Two sensitive patients showed large decreases (BRITROC-74, BRITROC-5) while most patients showed small changes in either direction, with no consistent shift. This is **consistent with the published BriTROC-1 finding** of remarkable CN stability between diagnosis and relapse in HGSC [1].

### 3.3 The pre-specified resistance hypothesis is not supported (and the direction is opposite)
Across **86** resistance-labeled samples (77 sensitive, 9 primary-resistant), all three instability features pointed **opposite** to the pre-specified direction (Figure 3):

| Feature | AUROC | 95% CI (bootstrap) | Mann–Whitney p | BH q | CI excludes 0.5? |
|---|---|---|---|---|---|
| Breakpoint count | 0.278 | [0.124, 0.450] | 0.030 | 0.046 | Yes (opposite direction) |
| Segment-value SD | 0.234 | [0.084, 0.416] | 0.0094 | 0.028 | Yes (opposite direction) |
| Fraction aberrant | 0.378 | [0.144, 0.636] | 0.236 | 0.236 | No |

An AUROC below 0.5 means resistant samples tended to have *fewer* breakpoints and *lower* instability — the reverse of the "higher instability → resistant" hypothesis. Although two features' CIs exclude 0.5, they do so in the **wrong direction**, so the pre-specified criterion (AUROC > 0.5 with CI excluding 0.5 in the hypothesized direction) is **not met**. Critically, the analysis is **underpowered: EPV = 9 (< 10)**, with only 9 resistant events; the point estimates and CIs are unstable and must be treated as discovery-only.

---

## 4. Discussion

The central, positive result is unambiguous and is the point of this study: a federated, integrity-gated pipeline acquired **controlled-access, patient-level** sWGS reads and reproduced a published CN segmentation with **ρ = 0.83**. This validates the capability that matters for a computational precision-oncology platform — operating correctly on real, access-restricted primary data rather than on curated summaries.

The two secondary analyses are, scientifically, exactly what the published biology predicts. HGSC genomes are **remarkably stable diagnosis→relapse**, and acquired platinum resistance in BriTROC-1 was not associated with common focal CN drivers when stratified by sensitivity; where a signal existed, it was in specific alterations (e.g., *CCNE1*/*KRAS* amplification and CN-signature exposure in samples with primary resistance), not in a global increase in instability [1]. Our null paired delta (p = 0.64) and opposite-direction cross-sectional trend are therefore **consistent with, not contradictory to,** the published record: a coarse global-instability summary should not be expected to separate resistant from sensitive HGSC, and it does not.

We deliberately report these nulls in full. A platform that only surfaces confirmatory findings cannot be trusted on the confirmatory findings it does surface. The combination here — a strong positive on the validated capability and a transparent null/negative on an exploratory hypothesis — is the intended standard of evidence.

## 5. Limitations

- **Underpowered exploratory arm (EPV = 9).** With 9 resistant events, the cross-sectional AUROCs and CIs are unstable; no resistance-classification claim is made. This is discovery-only.
- **Single cohort.** The resistance analysis is BriTROC-1 only; the pre-specified plan required consistency across ≥2 independent cohorts before any association would be considered supported. That bar is not met.
- **Coarse feature set.** Global instability summaries (breakpoint count, segment SD, fraction aberrant) do not capture the specific alterations (e.g., *CCNE1* amplification, CN signatures) implicated in HGSC resistance; absence of a global signal does not exclude locus- or signature-level signals.
- **Snapshot in motion.** Numbers are frozen at 94 profiles (86 labeled); acquisition was ongoing. A later refresh may add power to the paired and cross-sectional arms but is not expected to change the concordance conclusion.
- **Methodological offset.** A small systematic difference between re-derived and published breakpoint counts reflects pipeline parameter/definition differences; rank concordance is unaffected.
- **RUO.** Nothing here is validated for clinical use.

## 6. Data and code availability

Underlying primary data are controlled-access via the European Genome-phenome Archive (dataset EGAD00001011049; study EGAS00001007292; access via DAC EGAC00001000388) and are not redistributed. The frozen analysis snapshot accompanying this report comprises `real_bam_features.csv` (per-sample re-derived CN features with published comparators), `paired_delta.csv` (per-patient diagnosis–relapse deltas), `resistance_association.json` (frozen cross-sectional statistics), and `SNAPSHOT_META.json` (snapshot provenance). Figures 1–3 (`fig1_concordance_scatter`, `fig2_paired_slopegraph`, `fig3_auroc_forest`) are provided as PNG and SVG. The QDNAseq recipe and integrity-gate parameters are specified in Methods.

## 7. References

1. Smith P, Bradley T, et al. Copy number signature analyses in high-grade serous ovarian carcinoma at diagnosis and relapse (BriTROC-1). *Nature Communications* 2023;14:4387. doi:10.1038/s41467-023-39867-7.

---

*Figures*
- **Figure 1.** Pipeline concordance: independently re-derived vs published breakpoints (Spearman ρ = 0.830, p = 5.8 × 10⁻²³, n = 86), identity line shown.
- **Figure 2.** Diagnosis→relapse breakpoint trajectories for 8 patients (Wilcoxon W = 14, p = 0.641); platinum-sensitive vs primary-resistant colored.
- **Figure 3.** Cross-sectional resistance association: AUROC with bootstrap 95% CI for three CN features vs the 0.5 reference; all point opposite to the pre-specified direction; EPV = 9 (underpowered, discovery-only).
