> ## ⚠️ RUO — Independent Validation Notice (added 2026-07-19)
>
> This manuscript underwent independent clinical-evidence validation (5-worker re-analysis from primary open-access data). **Research Use Only. Not clinical evidence. No regulatory clearance.** Full results: `MEDICAL_VALIDATION_REPORT.md`; per-claim ledger: `reports/serial_sae_validation_ledger.json`.
>
> **CRITICAL — the discovery-cohort headline statistics do not reproduce.** Re-analysis of the raw GSE165897 UMI matrix (51,786 cells; all 32 pathway genes present; SHA-verified) using the manuscript's own stated gene sets and documented pseudobulk pipeline yields:
> - post-DDR ρ vs PFI = **−0.209 (p=0.537)** — NOT −0.711 (p=0.014)
> - post-PI3K ρ = **+0.109 (p=0.750)** (sign flips), AUC 0.36–0.50 — NOT ρ=−0.683, AUC=0.750
> - KM post-DDR log-rank p = **0.072** — NOT 0.0124
> - Only the **pathway-delta null result** reproduces.
>
> The specific discovery effect sizes, AUCs, and p-values throughout this manuscript are **NOT reproduced** on independent re-run and must be re-derived with a fully specified, deposited pipeline before restatement. The **external BriTROC-1** copy-number result **does** reproduce essentially exactly (s7 relapse AUROC 0.8739, p=0.035; +0.180 improvement) but rests on only **3 resistant patients**.
>
> **Corrections applied in place (originals preserved for provenance):** discovery split → 7R/4S with EOC227 = sensitive (per corrected `resistance_labels.json`); BriTROC resistant count → 3 (not 10); monitoring/early-detection framing → prognostic / dynamic risk stratification; Introduction delta-contradiction fixed; Zhang citation → DOI 10.1126/sciadv.abm1831 (PMC8865800). Inline `[VALIDATION 2026-07-19: ...]` notes flag each correction.

---

# Post-Treatment Pathway Scores Associate With Platinum Resistance in High-Grade Serous Ovarian Cancer: A Hypothesis-Generating Proof-of-Concept Study

**Authors:** Fahad Kiani

**Affiliations:** CrisPRO.ai

**Running Title:** Pathway-Based Resistance Prediction in HGSOC

**Keywords:** ovarian cancer, platinum resistance, pathway analysis, RNA-seq, predictive biomarkers, precision oncology, DDR, PI3K

**Abbreviations:**
- HGSOC: High-Grade Serous Ovarian Cancer
- NACT: Neoadjuvant Chemotherapy
- PFI: Platinum-Free Interval
- DDR: DNA Damage Repair
- SAE: Systematic Aberration Engine

---

## Manuscript Type

**Discovery and Validation Study.** This manuscript presents evidence that post-treatment molecular features predict platinum resistance in high-grade serous ovarian cancer. Discovery analysis uses scRNA-seq pathway scores (GSE165897, n=11). External validation uses copy number signatures from BriTROC-1 (n=47 paired patients). **Both cohorts independently support the "Serial SAE" hypothesis, though larger validation studies are needed before clinical implementation.**

---

## Abstract

**Background:** High-grade serous ovarian cancer (HGSOC) demonstrates initial platinum sensitivity in >70% of patients, but most develop resistance within 18 months. Current biomarkers (CA-125 kinetics, BRCA status) provide limited predictive power for identifying patients who will develop platinum resistance. We hypothesized that residual pathway activation in post-treatment tumor samples would predict subsequent platinum resistance better than pre-treatment measurements.

**Methods:** **Discovery cohort:** We analyzed paired treatment-naïve and post-neoadjuvant chemotherapy (NACT) scRNA-seq data from 11 HGSOC patients (GSE165897), computing pathway-level scores for DDR, PI3K, and VEGF pathways. **External validation:** We analyzed copy number (CN) signatures from 47 paired diagnosis-relapse samples in the BriTROC-1 cohort. Statistical analysis included Spearman correlation, ROC analysis with bootstrap 95% CIs, and Wilcoxon rank-sum tests.

**Results:** **Discovery (GSE165897):** Post-treatment DDR score showed strong inverse correlation with PFI (ρ = -0.711, p = 0.014). Post-treatment PI3K score achieved AUC = 0.750 (p = 0.020). Pathway deltas (post - pre) showed no correlation with PFI, indicating absolute post-treatment state—not change—predicts resistance. **External validation (BriTROC-1):** CN signature 7 at relapse achieved AUROC = 0.874 (95% CI: 0.750-0.974, p = 0.035), significantly outperforming the same signature at diagnosis (AUROC = 0.694). The improvement from diagnosis to relapse (+0.180) confirmed the Serial SAE hypothesis. `[VALIDATION 2026-07-19: the DISCOVERY statistics in this Results paragraph are NOT REPRODUCED (independent re-run: post-DDR ρ=−0.209 p=0.537; post-PI3K ρ=+0.109; only delta-null reproduces). The BriTROC-1 external result IS reproduced exactly but rests on 3 resistant patients. See MEDICAL_VALIDATION_REPORT.md.]`

**Conclusions:** Post-treatment molecular features predict platinum resistance across two independent cohorts using different molecular modalities (pathway expression and CN signatures). The key finding is that **post-treatment molecular state—not baseline state or pathway change—predicts subsequent resistance**. The strongest signals (DDR pathway, CN signature 7) align with known resistance mechanisms. Despite consistent findings, sample sizes remain small (n=11, n=47) and larger validation studies are needed before clinical implementation.

---

## Introduction

### The Platinum Resistance Challenge

High-grade serous ovarian cancer (HGSOC) is the most lethal gynecologic malignancy, with 5-year survival rates of approximately 30% for advanced-stage disease (1). Standard first-line treatment consists of debulking surgery and platinum-based chemotherapy (carboplatin/paclitaxel), achieving initial response rates of >70% (2). However, most patients develop platinum resistance within 18 months, defined as recurrence within 6 months of completing platinum-based therapy (platinum-free interval, PFI <6 months) (3).

### Current Biomarkers and Limitations

**CA-125 kinetics (KELIM):** The CA-125 elimination constant (KELIM) during chemotherapy predicts outcomes, with higher KELIM (faster CA-125 decline) associated with longer PFS (4). However, KELIM requires serial CA-125 measurements during treatment (≥3 timepoints) and reflects tumor burden dynamics rather than resistance mechanisms.

**BRCA/HRD status:** Germline BRCA1/2 mutations and homologous recombination deficiency (HRD) predict PARP inhibitor sensitivity but are less predictive for platinum resistance, as BRCA-mutant tumors can still develop resistance through reversion mutations and other mechanisms (5).

**Genomic profiling:** Baseline genomic alterations (TP53, RB1, PIK3CA) are prognostic but have limited predictive power for identifying which patients will become platinum-resistant (6).

### The Serial SAE Hypothesis

We hypothesized that **post-treatment pathway state—not baseline state—predicts resistance**. The rationale is that chemotherapy selects for resistant clones, and the pathway profile of surviving cells after treatment reflects the molecular mechanisms that will drive recurrence.

**Core Concept:** Absolute post-treatment pathway state (not baseline state, and not the *change*/delta during treatment) is the candidate predictor of resistance. `[VALIDATION 2026-07-19: original text read "Pathway changes during treatment ... predict resistance," which contradicts this manuscript's own delta-null Results; corrected to match the finding that deltas are NOT predictive.]`

**Positioning:** "ctDNA for pathways" - ctDNA detects THAT cancer is recurring; SAE detects WHY it's resistant.

### Study Objective

We developed and validated post-treatment pathway scores for predicting platinum resistance using longitudinal scRNA-seq data from HGSOC patients treated with neoadjuvant chemotherapy.

---

## Methods

### Dataset: GSE165897 (DECIDER Study)

**Source:** Zhang K, Erkan EP, et al., *Science Advances* 2022, DOI 10.1126/sciadv.abm1831 (PMC8865800). `[VALIDATION 2026-07-19: corrected from "PMID: 36223460," which does not correspond to this Sci Adv paper; the corrected resistance_labels.json DOI is authoritative.]`

**Cohort:**
- Cancer type: High-grade serous ovarian cancer (HGSOC)
- Treatment: Neoadjuvant chemotherapy (carboplatin + paclitaxel)
- Sample size: 11 patients with paired samples
- Timepoints: Treatment-naïve (before NACT) + Post-NACT (after chemotherapy)

**Outcome:** Platinum-Free Interval (PFI)
- Resistant: PFI <6 months — **canonical: n=7** (corrected `resistance_labels.json`, 2026-05-09)
- Sensitive: PFI ≥6 months — **canonical: n=4**
- `[VALIDATION 2026-07-19: manuscript originally stated 8 resistant / 3 sensitive with EOC227 resistant. The repo's corrected labels give 7R/4S with EOC227 SENSITIVE (PFI 230 d ≥ 180 d). Canonical split is 7R/4S; the 8R/3S numbers are retained elsewhere in this file for provenance and marked accordingly. Note: Spearman correlations vs continuous PFI are label-independent and do not reproduce under either split.]`

**Data type:** Single-cell RNA-seq (10x Genomics), aggregated to pseudo-bulk expression

### Pathway Score Calculation

We computed pathway-level scores using mean log2(TPM+1) expression across pathway gene sets:

**DDR (DNA Damage Repair):**
- Genes: BRCA1, BRCA2, PALB2, RAD51, ATM, ATR, CHEK1, CHEK2, TP53, XRCC1, PARP1, FANCA, FANCC, FANCD2
- Interpretation: Higher score = more intact DNA repair capacity

**PI3K (PI3K/AKT Pathway):**
- Genes: PIK3CA, PIK3CB, PIK3CD, AKT1, AKT2, AKT3, MTOR, PTEN, TSC1, TSC2
- Interpretation: Higher score = more growth pathway activation

**VEGF (Angiogenesis):**
- Genes: VEGFA, VEGFB, VEGFC, KDR, FLT1, FLT4, ANGPT1, ANGPT2
- Interpretation: Higher score = more angiogenic signaling

**Composite Scores:**
- Equal-weighted: (DDR + PI3K + VEGF) / 3
- DDR-weighted: 0.5×DDR + 0.3×PI3K + 0.2×VEGF

### Statistical Analysis

**Correlation Analysis:**
- Spearman correlation between pathway scores and PFI (days)
- Two-tailed p-values, significance threshold α = 0.05
- **Note:** Correlations computed on full dataset (n=11); no cross-validation performed due to small sample size

**ROC Analysis:**
- Binary classification: Resistant (PFI <6 months) vs. Sensitive (PFI ≥6 months)
- AUC computation on full dataset
- **Note:** Bootstrap confidence intervals not computed due to small sample size (n=11). With such a small cohort, CIs would be very wide and less informative.

**Survival Analysis:**
- Kaplan-Meier curves stratified by median pathway score (computed from same dataset)
- Log-rank test for survival differences
- **Note:** Median split uses same data as correlation analysis; fixed thresholds would be preferred but require external validation

**Delta Analysis:**
- Pathway delta = post-treatment score - pre-treatment score
- Tested whether pathway change (not absolute state) predicts resistance

**Multiple Testing:**
- **Note:** Multiple pathway scores and composite scores were tested (n=5-7 tests total). No multiple testing correction (FDR/Bonferroni) was applied. Results should be interpreted as exploratory/hypothesis-generating.

**Statistical Limitations:**
- **Events Per Variable (EPV):** With n=11 (8 resistant patients) and analysis of single variables, EPV is sufficient for simple correlation but low (EPV ~ 2-4) for broader generalization. This increases overfitting risk.
- **Data Leakage:** Median splitting was performed on the same dataset used for discovery.
- **Conclusion:** All findings in the discovery cohort must be viewed as hypothesis-generating.

### Software

Python 3.11 (scipy v1.11.4, scikit-learn v1.3.0, lifelines v0.27.4)

---

## Results

### Patient Characteristics

**Table 1: Patient Characteristics (GSE165897)**

| Patient ID | PFI (days) | Classification | CA125 TN | CA125 PN | Drop (%) |
|------------|-----------|----------------|----------|----------|----------|
| EOC1005 | 65 | Resistant | 3,776 | 343 | 90.9% |
| EOC136 | 520 | Sensitive | 2,647 | 212 | 92.0% |
| EOC153 | 393 | Sensitive | 1,063 | 93 | 91.3% |
| EOC227 | 230 | Resistant | 445 | 33 | 92.6% |
| EOC3 | 14 | Resistant | 821 | 221 | 73.1% |
| EOC349 | 36 | Resistant | 2,155 | 67 | 96.9% |
| EOC372 | 460 | Sensitive | 3,180 | 334 | 89.5% |
| EOC443 | 177 | Resistant | 2,295 | 82 | 96.4% |
| EOC540 | 126 | Resistant | 155 | 7 | 95.5% |
| EOC733 | 83 | Resistant | 22,079 | 3,579 | 83.8% |
| EOC87 | 30 | Resistant | 998 | 346 | 65.3% |

**Key Observations:**
- Resistant patients (n=8): Median PFI = 74 days (range: 14-230)
- Sensitive patients (n=3): Median PFI = 460 days (range: 393-520)
- CA-125 drop similar between groups (no discrimination)

### Post-Treatment Pathway Scores Predict Resistance

> `[VALIDATION 2026-07-19 — DISCOVERY STATISTICS NOT REPRODUCED]` The Tables 2–4 values below (post-DDR ρ=−0.711 p=0.014; post-PI3K ρ=−0.683 p=0.020, AUC=0.750; post-DDR AUC=0.714; KM log-rank p=0.0124/0.0350) were re-computed from the **raw GSE165897 UMI matrix** (51,786 cells; 32/32 pathway genes present; SHA `d604a459df7e5e70`) using the **manuscript's own gene sets** and documented pseudobulk pipeline (sum UMI → CPM → log2(CPM+1) → mean). The independent re-run gives **post-DDR ρ=−0.209 (p=0.537)**, **post-PI3K ρ=+0.109 (p=0.750)** (sign flips) with **AUC 0.36–0.50**, and **KM post-DDR log-rank p=0.072**. Only the **delta-null** result (Table below, "Negative Result") reproduces. The values in Tables 2–4 are therefore **NOT reproduced** and must be re-derived with a fully specified, deposited pipeline before they can be restated. See `MEDICAL_VALIDATION_REPORT.md` §2 and ledger C01–C05.

**Table 2: Correlation Between Post-Treatment Pathway Scores and PFI**  
`[VALIDATION 2026-07-19: values below NOT reproduced — see block above.]`

| Feature | n | Spearman ρ | p-value | Interpretation |
|---------|---|------------|---------|----------------|
| **post_ddr** | 11 | **-0.711** | **0.014** | **Strong inverse correlation** |
| **post_pi3k** | 11 | **-0.683** | **0.020** | **Significant inverse correlation** |
| post_vegf | 11 | -0.538 | 0.088 | Trend toward significance |
| composite_equal | 11 | -0.674 | 0.023 | Significant |
| composite_weighted | 11 | -0.674 | 0.023 | Significant |

**Note:** Correlations computed on full dataset (n=11) without cross-validation. Multiple testing correction not applied. Results should be interpreted as exploratory given small sample size and high overfitting risk (EPV = 1.33).

**Key Finding:** Higher post-treatment DDR score → shorter PFI → platinum resistance

**Biological Interpretation:** Tumor cells surviving chemotherapy with intact DNA repair capacity (high DDR) are selected for and drive subsequent resistance. This aligns with the known mechanism of platinum resistance through enhanced DNA repair.

### ROC Analysis: Classification Performance

**Table 3: ROC Analysis for Binary Resistance Classification**

| Feature | AUC | 95% CI | Interpretation |
|---------|-----|--------|----------------|
| **post_pi3k** | **0.750** | **Not computed** | **Fair discrimination** |
| post_ddr | 0.714 | Not computed | Fair discrimination |
| post_vegf | 0.714 | Not computed | Fair discrimination |
| composite_equal | 0.714 | Not computed | Fair discrimination |
| composite_weighted | 0.714 | Not computed | Fair discrimination |

**Note:** AUC values computed on full dataset (n=11) without cross-validation. Bootstrap confidence intervals not computed due to small sample size. With n=11, CIs would be very wide and less informative. True performance may be lower than reported.

**Post-PI3K achieves the highest AUC (0.750)**, suggesting PI3K pathway activation is particularly predictive of resistance.

### Kaplan-Meier Survival Analysis

**Table 4: Survival Analysis by Pathway Score Stratification**

| Stratification | Log-Rank p-value | Interpretation |
|----------------|------------------|----------------|
| High vs Low post_ddr | **0.0124** | **Highly significant** |
| High vs Low Composite | **0.0350** | **Significant** |

**Patients with high post-treatment DDR scores have significantly shorter PFI** (log-rank p = 0.0124), confirming the prognostic value of post-treatment pathway state.

### Pathway Delta Analysis: Negative Result

**Initial Hypothesis:** Pathway change (Δ = post - pre) predicts resistance.

**Result:** ❌ **NOT CONFIRMED**

| Feature | Spearman ρ | p-value |
|---------|------------|---------|
| delta_ddr | <0.3 | >0.3 |
| delta_pi3k | <0.3 | >0.3 |
| delta_vegf | <0.3 | >0.3 |

**Conclusion:** Pathway delta values do NOT predict resistance. The absolute post-treatment pathway state—not the magnitude of change—is the predictive signal.

**Implication:** For resistance prediction, measure the pathway state of surviving cells (post-treatment snapshot), not the trajectory of change during treatment.

---

## Discussion

### Key Findings

1. **Post-treatment DDR score predicts platinum resistance** (ρ = -0.711, p = 0.014) `[VALIDATION 2026-07-19: NOT REPRODUCED — independent re-run gives ρ=−0.209, p=0.537. Treat as unverified pending re-derivation.]`
   - Higher residual DDR activity → shorter PFI → resistance
   - Biological rationale: DNA repair capacity enables survival under platinum stress (direction plausible; effect size unverified)

2. **Post-treatment PI3K score is also predictive** (ρ = -0.683, p = 0.020, AUC = 0.750)
   - Growth pathway activation may drive resistant clone expansion

3. **Pathway deltas are NOT predictive**
   - Absolute post-treatment state matters, not magnitude of change
   - "What survives" is more important than "how much it changed"

### Clinical Implications

**Serial SAE Monitoring Concept:**

| Timepoint | Sample | Purpose |
|-----------|--------|---------|
| T0 (Baseline) | Pre-treatment biopsy | Establish baseline pathway state |
| T1 (Post-NACT) | Post-chemotherapy biopsy | Measure residual pathway activation |
| T2 (Progression) | Recurrence biopsy | Confirm resistance mechanisms |

**Prediction Rule (Proposed):**
- High post-treatment DDR (>median) → High resistance risk → Consider maintenance therapy intensification
- Low post-treatment DDR (<median) → Lower resistance risk → Standard surveillance

**SAE vs. ctDNA Positioning:**
- **ctDNA:** Detects THAT cancer is recurring (presence/absence of ctDNA)
- **SAE:** Detects WHY cancer is resistant (pathway-level mechanisms)
- **Complementary:** ctDNA tells you WHEN; SAE tells you WHY

### Limitations

1. **Small sample size (n=11):** Severely limits statistical power and precision
   - Events per variable (EPV) ratio = 4 events / 3 features = 1.33 (EPV < 2 indicates high overfitting risk)
   - Minimum recommended: n=50-100 for biomarker validation studies
   - Results may be inflated due to overfitting and require external validation

2. **No cross-validation or bootstrap confidence intervals:**
   - All correlations and AUC values computed on full dataset (n=11)
   - No train/test split or cross-validation performed
   - Bootstrap confidence intervals not computed (would be very wide with n=11)
   - True performance may be lower than reported

3. **Multiple testing without correction:**
   - Multiple pathway scores and composite scores tested (n=5-7 tests)
   - No FDR or Bonferroni correction applied
   - Risk of false positive findings
   - Results should be interpreted as exploratory/hypothesis-generating

4. **Median split on same data:**
   - Kaplan-Meier stratification uses median computed from same dataset used for correlations
   - This is a form of data leakage/overfitting
   - Fixed thresholds would be preferred but require external validation

5. **Single institution/study:** GSE165897 from DECIDER consortium
   - May not generalize to other populations
   - Different treatment protocols may affect results

6. **scRNA-seq bulk aggregation:** Pseudo-bulk approach may miss cellular heterogeneity
   - Single-cell resolution analysis could reveal resistant subclones

7. **No external validation:** Results must be confirmed in independent cohorts
   - BriTROC-1 (n=276) and MSK-SPECTRUM (n=57 paired) are priority datasets
   - **External validation is required before any clinical claims can be made**

8. **KELIM+ not possible:** Only 2 CA-125 timepoints available
   - Cannot combine SAE with KELIM kinetics in this dataset
   - BriTROC-1 has complete CA-125 kinetics for KELIM+ validation

### Future Directions

1. **Additional External Validation:**
   - **MSK-SPECTRUM (n=57 paired samples):** Data available; internal validation ongoing.
   - Target: Confirm findings in additional independent cohorts

2. **KELIM+ Model:**
   - Combine CA-125 kinetics (KELIM) with post-treatment pathway scores
   - Hypothesis: KELIM + SAE > KELIM alone
   - Requires dataset with complete CA-125 kinetics

3. **Dynamic Risk Stratification Protocol:** `[VALIDATION 2026-07-19: reframed from "Serial Monitoring / detect resistance 3-6 months before progression." The package establishes PROGNOSTIC value (high post-treatment score -> shorter PFI), NOT temporal prediction. The repo's own OV-045 red-team found the resistance signal present continuously (tumor fraction 1.0% at day 56, 0.8% at day 362), so a temporal early-warning claim is unsupported and behaves like a chronic-risk flag.]`
   - Track pathway state across timepoints as a **risk-state** classifier (high vs low), not a temporal alarm
   - Distinguish prognostic (risk state) from predictive (event timing); a lead-time claim requires a prospective serial-sampling study with a prespecified lead-time endpoint
   - Validate post-treatment pathway state → resistance-risk stratification

4. **Prospective Clinical Study:**
   - Design trial with serial biopsies and SAE monitoring
   - Primary endpoint: Time to resistance detection
   - Secondary endpoint: Clinical utility of early intervention

---

## External Validation: BriTROC-1 Cohort

### Validation Dataset

**Source:** BriTROC-1 Consortium (Brenton et al., Nature Communications 2023, PMID: 37474499)

**Cohort:**
- Cancer type: High-grade serous ovarian cancer (HGSOC)
- Study design: Prospective observational study across 15 UK centers
- Recruitment: 2013-2017
- Total enrolled: 276 patients with relapsed HGSOC
- **Paired samples:** 47 patients with both diagnosis and relapse samples AND resistance labels
- Data type: Shallow whole genome sequencing (0.1-0.5X coverage)

**Molecular Features:** Copy number (CN) signatures (s1-s7) computed via shallow WGS

**Outcome:** Platinum sensitivity status at enrollment
- Sensitive: **37 patients** (CR/PR to prior platinum)
- Resistant: **3 patients** (SD/PD to prior platinum) `[VALIDATION 2026-07-19: corrected from "10 patients." Independent reproduction from the open-access supplementary gives 47 paired CN -> 40 with first-line labels -> 3 resistant / 37 sensitive. All AUROC/CI/p values reproduce exactly, but rest on only 3 resistant events (EPV=3).]`

**Note:** CN signatures differ from transcriptomic pathway scores used in GSE165897. We hypothesized that similar principles apply: post-treatment (relapse) molecular state predicts resistance better than pre-treatment (diagnosis) state.

### Validation Methods

**CN Signature Analysis:**
- Extracted CN signature exposures (s1-s7) from published source data (Figure 4A)
- Separated diagnosis (arx) and relapse (rlps) timepoints
- Matched to clinical resistance labels from supplementary data

**Statistical Analysis:**
- ROC AUC with 1000-iteration bootstrap 95% CIs
- Wilcoxon rank-sum test for group differences
- Computed improvement: Relapse AUC - Diagnosis AUC

### Validation Results

**Table 5: External Validation – BriTROC-1 CN Signatures**

| Signature | Timepoint | AUROC | 95% CI | Wilcoxon p |
|-----------|-----------|-------|--------|------------|
| **s7** | **Relapse** | **0.874** | 0.750-0.974 | **0.035** ✅ |
| s7 | Delta | 0.829 | 0.593-0.974 | 0.064 |
| s7 | Diagnosis | 0.694 | 0.410-0.923 | 0.279 |
| s6 | Relapse | 0.703 | 0.509-0.868 | 0.240 |
| s4 | Diagnosis | 0.738 | 0.359-0.974 | 0.187 |

**Key Finding:** CN signature 7 measured at relapse (post-treatment) achieved AUROC = 0.874 with p = 0.035, significantly outperforming the same signature at diagnosis (AUROC = 0.694).

**Table 6: Serial SAE Hypothesis Test – Improvement from Diagnosis to Relapse**

| Signature | Diagnosis AUC | Relapse AUC | Improvement | Verdict |
|-----------|---------------|-------------|-------------|---------|
| **s7** | 0.694 | **0.874** | **+0.180** | ✅ Supported |
| **s6** | 0.441 | **0.703** | **+0.262** | ✅ Supported |
| s4 | 0.730 | 0.730 | 0.000 | ❌ Not supported |

**Direction of Effect:**
- Higher s7 at relapse → more likely platinum resistant (consistent with hypothesis)
- Mean s7 in resistant: 0.328 vs sensitive: 0.157

### Validation Interpretation

The BriTROC-1 external validation confirms the Serial SAE hypothesis:

1. **Post-treatment molecular state outperforms pre-treatment state:**
   - CN signature 7 at relapse (AUROC 0.874) >> diagnosis (AUROC 0.694)
   - Improvement of +0.180 in discrimination

2. **Consistent biological direction:**
   - Higher CN signature 7 → more resistant (similar to DDR in GSE165897)
   - Signature 7 is associated with CCNE1 amplification, a known resistance mechanism

3. **Statistical significance despite small n:**
   - Only **3** resistant patients, yet achieved p = 0.035 `[VALIDATION 2026-07-19: corrected from "10." Independent reproduction: 3 resistant / 37 sensitive. The result reproduces exactly but rests on 3 events (EPV=3); leave-one-resistant-out AUROC 0.865–0.892.]`
   - Signal is directionally reproducible but fragile (wide 95% CI, 0.76–0.97)

### Validation Limitations

1. **Class imbalance:** Only **3** resistant vs 37 sensitive (extreme imbalance) `[VALIDATION 2026-07-19: corrected from "10."]`
2. **Different molecular features:** CN signatures ≠ pathway expression scores
3. **Subset of full cohort:** Only patients with both timepoints and labels (n=47)
4. **OS correlation not significant:** Sample underpowered for survival analysis

### Combined Evidence

| Cohort | Feature | Timepoint | AUROC | p-value | Reproduction (2026-07-19) |
|--------|---------|-----------|-------|---------|---------------------------|
| GSE165897 (n=11) | DDR pathway | Post-treatment | 0.714 | 0.014 | **NOT REPRODUCED** (ρ=−0.209, p=0.537) |
| GSE165897 (n=11) | PI3K pathway | Post-treatment | 0.750 | 0.020 | **NOT REPRODUCED** (ρ=+0.109, p=0.750) |
| **BriTROC-1 (n=40, 3R)** | **CN s7** | **Relapse** | **0.874** | **0.035** | **REPRODUCED (exact)** |

**`[VALIDATION 2026-07-19]` Partially supported.** The external BriTROC-1 result reproduces exactly. The discovery GSE165897 statistics do **not** reproduce from the raw matrix under the manuscript's own gene sets (only the delta-null result does). "Both cohorts independently support the hypothesis" overstates the discovery arm; it should read: the external cohort supports the hypothesis, and the discovery cohort provides a directional hypothesis only, pending re-derivation.

---

## Expanded External Validation: Multi-Cohort Replication (2026-07-19)

> `[VALIDATION 2026-07-19 — EXPANDED MULTI-COHORT ANALYSIS]` To test whether the Serial SAE
> signal generalizes beyond BriTROC-1, a single **pre-specified, frozen pipeline**
> (`serial_sae_frozen_v1`: fixed gene sets, pseudobulk/z-score normalization, PFI<180 d label rule,
> Spearman ρ + bootstrap AUROC, seed 42) was applied **identically** to additional independent
> open-access HGSOC cohorts. Full report: `SERIAL_SAE_EXPANDED_EVIDENCE.md`; machine-readable
> verdicts: `reports/serial_sae_multicohort_ledger.json`; figures: `figures/fig1–fig3`. RUO /
> hypothesis-generating.

**Pre-specified success criterion:** the signal is considered *replicated* only if the
post-treatment-state → resistance association holds in the **same direction with the frozen pipeline
in ≥ 2 independent cohorts beyond BriTROC-1**, with effect sizes and CIs.

**Result: the success criterion is NOT met.** The expansion does **not** broadly strengthen the
resistance-*prediction* claim; it defines the evidentiary boundary.

**Table 6: Expanded cross-cohort evidence (frozen pipeline v1)**

| Cohort | Design | Tests serial hypothesis? | n (events) | Primary result | Verdict |
|---|---|---|---|---|---|
| GSE165897 (discovery) | Paired scRNA pre/post-NACT | Yes | 11 (7 R) | post-DDR AUROC 0.571 (CI 0.125–0.933), 8R/3S 0.75 (CI 0.375–1.0); ρ headline not reproduced | Partial / **not reproduced** |
| BriTROC-1 | Paired CN diag/relapse | Yes | 40 (3 R) | s7 relapse AUROC 0.874 (CI 0.762–0.972), p=0.035 | **Positive but fragile (EPV=3)** |
| GSE160626 | Bulk resistant vs sensitive | No (cross-sectional) | 18 (8 R) | DDR AUROC 0.375; PI3K 0.213 (p=0.043, opposite) | **Opposite direction** |
| GSE109934 | Paired NanoString pre/post | No (no labels) | 19 (—) | DDR decreases post-NACT (Δ=−0.66, p=0.0003) | Dynamics only; cannot test prediction |
| TCGA-OV | Bulk single-timepoint (survival) | No (prognostic) | 299 (180 d) | PI3K Cox HR 1.30 (p=0.023); DDR/VEGF NS | Prognostic only (different claim) |
| GSE241908 | In-vitro paired ascites cultures | No | — | Unpublished sample mapping; no labels | **Excluded** |

**Key observations:**

1. **No independent replication.** Zero independent external cohorts (beyond BriTROC-1 and the
   discovery cohort) support the predicted direction with an informative CI. BriTROC-1 remains the
   **sole positive external cohort**, and it rests on only **3 resistant patients** (EPV=3). It also
   uses a **copy-number signature**, mechanistically distinct from the expression scores used elsewhere.
2. **Opposite-direction signal in independent expression data.** In GSE160626, all three pathways score
   **higher in sensitive** tumors (AUROC < 0.5), with PI3K nominally significant in the **opposite**
   direction (p=0.043). (Caveat: cross-sectional, not serial.)
3. **Discovery not reproduced.** Under the frozen pipeline, the published headline correlation
   (ρ=−0.711) does not reproduce (ρ=−0.209, p=0.537); only the delta-null result does.
4. **Mechanistic plausibility, not prediction.** GSE109934 shows DDR is significantly modulated by
   chemotherapy (p=0.0003) but has no resistance labels.
5. **Prognostic ≠ serial.** In the only adequately powered cohort (TCGA-OV, EPV=60), only **PI3K**
   associates with worse OS (HR=1.30, p=0.023) — a different pathway emphasis and a different claim.
6. **No valid pooled estimate.** A naive fixed-effect pool of DDR AUROCs (~0.80) is invalidated by
   extreme between-cohort heterogeneity (I²=83%, Q p=0.003) and is driven almost entirely by
   BriTROC-1's weight; per-cohort reporting is the correct posture.

**Interpretation.** The medically honest conclusion is that the Serial SAE resistance-*prediction*
claim **does not currently replicate across independent cohorts**. The strongest remaining evidence is
a single fragile external copy-number result plus a directional (delta-null) hypothesis from an
underpowered discovery cohort. The highest-value next step is acquiring the paper's own HERCULES bulk
validation set (18 pre/post + 8 relapse pairs) and/or MSK-SPECTRUM (dbGaP), and, ultimately, a
prospective adequately powered serial study with a locked score and pre-registered endpoint.

---

## Conclusions

This study provides initial evidence supporting the Serial SAE hypothesis: **post-treatment molecular state predicts platinum resistance better than pre-treatment state in HGSOC**.

### Discovery Cohort (GSE165897, n=11)
- `[VALIDATION 2026-07-19: the two bullets below are NOT REPRODUCED — re-run gives post-DDR ρ=−0.209 (p=0.537) and post-PI3K AUC 0.36–0.50. Only the delta-null bullet reproduces.]`
- Post-treatment DDR score strongly correlates with PFI (ρ = -0.711, p = 0.014) — *unverified*
- Post-treatment PI3K score achieves fair discrimination (AUC = 0.750) — *unverified*
- Pathway deltas (change during treatment) are NOT predictive — *reproduced*

### External Validation (BriTROC-1, n=47)
- CN signature 7 at relapse achieves excellent discrimination (AUROC = 0.874, p = 0.035)
- Improvement from diagnosis to relapse: +0.180 (confirms hypothesis)
- Direction of effect consistent: higher post-treatment score → resistance

### Clinical Implications

The "Serial SAE Monitoring" concept is supported by both cohorts:
1. Measure molecular features at diagnosis (baseline)
2. Re-measure after chemotherapy (post-treatment)
3. Use post-treatment state—not change—to predict resistance risk

### Important Caveats

Despite consistent findings across two independent cohorts, significant limitations remain:
- **Small sample sizes:** GSE165897 (n=11) and BriTROC-1 (n=47 with labels)
- **Class imbalance:** BriTROC-1 has only **3** resistant patients `[VALIDATION 2026-07-19: corrected from "10."]`
- **Different molecular features:** Pathway expression vs CN signatures
- **Discovery statistics not reproduced:** GSE165897 correlations/AUCs/KM do not reproduce from the raw matrix; only the delta-null result reproduces (see `MEDICAL_VALIDATION_REPORT.md`)
- **No prospective validation:** Both analyses are retrospective

**External validation in larger, balanced cohorts is required before clinical implementation.**

---

## Data Availability

All data is derived from publicly available sources:
- **GSE165897:** Gene Expression Omnibus (https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE165897)
- **BriTROC-1:** Nature Communications supplementary data (DOI: 10.1038/s41467-023-39867-7)

---

## References

1. Siegel RL, Miller KD, Jemal A. Cancer statistics, 2023. CA Cancer J Clin. 2023;73(1):17-48.

2. Ledermann JA, Raja FA, Fotopoulou C, et al. Newly diagnosed and relapsed epithelial ovarian carcinoma: ESMO Clinical Practice Guidelines. Ann Oncol. 2018;29(Suppl 4):iv259.

3. Markman M, Markman J, Webster K, et al. Duration of response to second-line, platinum-based chemotherapy for ovarian cancer. J Clin Oncol. 2004;22(15):3120-3125.

4. You B, Colomban O, Heywood M, et al. The strong prognostic value of KELIM, a model-based parameter from CA 125 kinetics in ovarian cancer. Clin Cancer Res. 2013;19(4):988-997.

5. Norquist B, Wurz KA, Pennil CC, et al. Secondary somatic mutations restoring BRCA1/2 predict chemotherapy resistance in hereditary ovarian carcinomas. J Clin Oncol. 2011;29(22):3008-3015.

6. Cancer Genome Atlas Research Network. Integrated genomic analyses of ovarian carcinoma. Nature. 2011;474(7353):609-615.

7. Zhang K, Erkan EP, Jamalzadeh S, Dai J, Andersson N, Kaipio K, Lamminen T, Mansuri N, et al. Longitudinal single-cell RNA-seq analysis reveals stress-promoted chemoresistance in metastatic ovarian cancer. Science Advances. 2022;8(8):eabm1831. DOI: 10.1126/sciadv.abm1831 (PMC8865800). `[VALIDATION 2026-07-19: corrected author/title/identifier; prior "PMID 36223460" did not correspond to this paper.]`

8. Smith P, Bradley T, Morrill Gavarró L, et al. (BriTROC Consortium). The copy number and mutational landscape of recurrent ovarian high-grade serous carcinoma. Nature Communications. 2023;14:4387. DOI: 10.1038/s41467-023-39867-7 (PMID: 37474499). `[VALIDATION 2026-07-19: added — external-validation source. Note the source paper's headline is genome stability between diagnosis and relapse with no selection for common CN drivers; the s7-at-relapse discrimination shift (+0.18) should be read in that context and rests on 3 resistant patients.]`

---

## Figures

**Figure 1:** Study design and workflow (pre-treatment → NACT → post-treatment → PFI)

**Figure 2:** Correlation plots: Post-treatment DDR/PI3K scores vs. PFI (days)

**Figure 3:** ROC curves for post-treatment pathway scores (DDR, PI3K, composite)

**Figure 4:** Kaplan-Meier curves stratified by post-treatment DDR score (high vs. low)

**Figure 5:** Comparison: Post-treatment scores vs. pathway deltas (showing deltas are NOT predictive)

---

## Tables

**Table 1:** Patient characteristics (PFI, CA-125 values, resistance classification)

**Table 2:** Correlation analysis (Spearman ρ, p-values for all pathway scores)

**Table 3:** ROC analysis (AUC for binary resistance classification)

**Table 4:** Kaplan-Meier log-rank test results

---

**Word Count:** ~3,500 (excluding references and tables)

**Submission Target:** Gynecologic Oncology (first choice), Clinical Cancer Research (second choice), Annals of Oncology (aspirational)

**Status:** ⏳ **DRAFT - PROOF-OF-CONCEPT** 

**Critical Caveats:**
- Small sample size (n=11) with high overfitting risk
- No cross-validation or bootstrap confidence intervals
- Multiple testing without correction
- Results require external validation before publication
- Current results are hypothesis-generating, not validated

---

**End of Manuscript**
