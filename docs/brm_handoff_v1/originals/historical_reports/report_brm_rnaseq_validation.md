# BrM RNA Validation Report
## GSE223499 NSCLC snRNA-seq — Pseudobulk DESeq2
**Date:** 2026-04-13  
**Pipeline:** CrisPRO BrM v4 — RNA validation layer  
**Status:** COMPLETE — replaces breast-cancer-derived RNA scores (GSE184869)

---

## 1. Objective

Confirm that the top 10 Assassin Score targets are differentially expressed in human NSCLC brain metastases (BrM) vs. primary lung tumors at the RNA level, using the best available open-access NSCLC BrM single-nucleus RNA-seq dataset.

**Targets:** ATP10D, FAM72A, SLC25A32, SENP8, SLC45A4, BACE1, NOM1, PTPRC, ROPN1L, TFEB

---

## 2. Dataset

| Field | Value |
|-------|-------|
| **Accession** | GSE223499 |
| **Citation** | Tagore, Caprio, Amin et al. (Izar lab). *Nature Medicine* 2025. doi:10.1038/s41591-025-03530-z |
| **Cancer type** | NSCLC (mixed LUAD/LUSC) |
| **Design** | 31 BrM + 11 Primary NSCLC patients, snRNA-seq |
| **Cells** | 276,310 total (193,358 BrM / 78,086 Primary) |
| **Cell annotation** | URBAN algorithm (CNV-based) + transcriptional clustering |

---

## 3. Methods

**Pseudobulk construction:** For each sample × cell compartment combination, raw counts were summed across all cells in that compartment. Sample × compartment combinations with < 10 cells were excluded.

**Differential expression:** PyDESeq2 v0.5.2 (Python port of DESeq2). Design: `~ site` (BRAIN_METS vs PRIMARY, reference = PRIMARY). Positive LFC = upregulated in BrM. BH-FDR correction applied genome-wide.

**Cell compartments analyzed:**

| Compartment | Cell types | BrM samples | Primary samples |
|-------------|-----------|-------------|-----------------|
| `tumor_like` | Tumor (Not Tumor) | 28 | 11 |
| `confirmed_tumor` | Tumor (CNV-confirmed) | 26 | **2** ⚠ |
| `t_cells` | T_cells | 28 | 11 |
| `immune_aggregate` | T_cells + B_cells + MDMs + Myeloid | 29 | 11 |

**Primary compartment per gene:** `tumor_like` for 9 tumor-intrinsic targets; `immune_aggregate` for PTPRC.

**Significance thresholds:** Primary: padj < 0.05, |LFC| > 0.5. Secondary: padj < 0.10.

---

## 4. Results

### 4.1 Primary Compartment Results (tumor_like for 9 targets; immune_aggregate for PTPRC)

| Gene | LFC | pvalue | padj | baseMean | Evidence Tier |
|------|-----|--------|------|----------|---------------|
| **NOM1** | **+0.52** | **2.6e-04** | **0.003** | 761 | **CONFIRMED** |
| FAM72A | +1.05 | 1.3e-02 | 0.061 | 22 | TRENDING |
| BACE1 | +1.07 | 1.6e-02 | 0.071 | 413 | TRENDING |
| SLC45A4 | +1.06 | 6.4e-02 | 0.183 | 2547 | ⚠ UNRELIABLE |
| ROPN1L | +0.18 | 6.9e-01 | 0.824 | 23 | NOT_ENRICHED |
| SLC25A32 | +0.03 | 9.0e-01 | 0.949 | 1210 | NOT_ENRICHED |
| ATP10D | −0.13 | 7.8e-01 | 0.879 | 847 | NOT_ENRICHED |
| TFEB | −0.34 | 3.2e-01 | 0.516 | 482 | NOT_ENRICHED |
| SENP8 | −0.47 | 4.6e-02 | 0.147 | 180 | NOT_ENRICHED |
| PTPRC | −0.11 | 7.2e-01 | 0.832 | 1751 | NOT_INTERPRETABLE |

### 4.2 Evidence Tier Definitions

| Tier | Criteria |
|------|----------|
| **CONFIRMED** | padj < 0.05, \|LFC\| > 0.5, consistent across samples, no outlier artifacts |
| **TRENDING** | padj < 0.10, consistent direction across samples |
| **UNRELIABLE** | Result driven by extreme outlier samples; median direction contradicts mean |
| **NOT_ENRICHED** | No consistent BrM enrichment |
| **NOT_INTERPRETABLE** | Biologically inappropriate compartment for the question |

### 4.3 Key Findings

**NOM1 (CONFIRMED):** LFC +0.52, padj = 0.003. Expressed in all 39 samples (28 BrM + 11 Primary). No outlier artifacts. Median BrM CPM (45.1) consistently exceeds Primary (28.9). This is the only target with robust FDR-significant upregulation in NSCLC BrM tumor-like cells.

**FAM72A (TRENDING):** LFC +1.05, padj = 0.061 in tumor-like cells. BrM median CPM 1.30 vs Primary median 0.40 (excluding one Primary outlier: 3.77 CPM). Also significant in immune_aggregate (LFC +2.11, padj = 0.012). Consistent directional signal across compartments. Supported by prior literature (poor prognosis biomarker in LUAD).

**BACE1 (TRENDING):** LFC +1.07, padj = 0.071 in tumor-like cells. BrM median CPM 17.4 vs Primary 10.6. One high outlier (107 CPM) but shift is consistent across the cohort. Supported by mechanistic evidence (BACE1→EGFR→MEK→ERK axis in BrM).

**SLC45A4 (UNRELIABLE):** LFC +1.06, padj = 0.183. Driven by 4 extreme BrM outlier samples (PA080: 1292 CPM, PA072: 921 CPM, STK_14: 461 CPM, PA056: 437 CPM). BrM *median* CPM (46.3) is actually **lower** than Primary median (65.6). Do not cite as evidence of BrM upregulation.

**PTPRC (NOT_INTERPRETABLE):** PTPRC/CD45 is a pan-leukocyte marker expressed at near-constant levels within immune cells regardless of tissue site (baseMean = 1751 CPM). Per-cell DE within the immune compartment is the wrong test. BrM enrichment of PTPRC requires cell *proportion* analysis (fraction of immune cells in BrM vs Primary). See UNRESOLVED-006.

**ATP10D, SLC25A32, SENP8, ROPN1L, TFEB:** No consistent BrM enrichment in tumor-like cells. These targets' Assassin Score is supported by CRISPRa functional enrichment (GSE237446) and/or chromatin accessibility (GSE205033), not by RNA upregulation in this NSCLC dataset.

### 4.4 Cross-Compartment Summary

| Gene | tumor_like | confirmed_tumor* | t_cells | immune_aggregate |
|------|-----------|-----------------|---------|-----------------|
| NOM1 | **+0.52★** | +0.92 | +0.28 | +0.30 |
| FAM72A | +1.05 | +0.99 | +2.66 | **+2.11★** |
| BACE1 | +1.07 | +0.78 | +1.93 | **+1.83★** |
| SLC45A4 | +1.06⚠ | −3.57↓ | −0.30 | −0.31 |
| ATP10D | −0.13 | +0.18 | −0.23 | −0.11 |
| SLC25A32 | +0.03 | −0.12 | +0.36 | +0.23 |
| SENP8 | −0.47 | +2.49 | +0.23 | +0.43 |
| ROPN1L | +0.18 | +1.26 | −0.16 | +0.18 |
| TFEB | −0.34 | +1.06 | **+0.67★** | −0.04 |
| PTPRC | −0.34 | −0.02 | −0.18 | −0.11 |

★ = padj < 0.05, LFC > 0.5 | ↓ = padj < 0.05, LFC < −0.5 | ⚠ = outlier-driven  
\* confirmed_tumor: n=2 Primary samples — UNDERPOWERED, directional only

---

## 5. Figures

- `brm_rnaseq_validation_dotplot.png/.svg` — Dot plot: 10 targets × 4 compartments; dot size = −log₁₀(padj); color = LFC direction
- `brm_rnaseq_lfc_barplot.png/.svg` — LFC bar chart: tumor_like compartment; color = evidence tier; error bars = ±1 SE
- `brm_rnaseq_validation_table.csv` — Full DE results (40 rows: 10 genes × 4 compartments)

---

## 6. Files Updated

| File | Change |
|------|--------|
| `data/brain_met/rnaseq_gene_scores.json` | Replaced breast-cancer GSE184869 scores with NSCLC GSE223499 pseudobulk results |
| `data/brain_met/rnaseq_gene_scores_breast_archive.json` | Archived old breast-cancer scores |
| `data/brain_met/BrM_Assassin_Scored_v3_realdata.csv` | Added `rnaseq_lfc_nsclc`, `rnaseq_padj_nsclc`, `rnaseq_evidence` columns; RNA★/RNA~ badges |
| `evo2_brm_manifest.json` | rnaseq dataset entry updated to GSE223499; UNRESOLVED-006 added |
| `PHD_HANDOFF.md` | RNA Validation section appended |

---

## 7. Critical Caveats

1. **`Tumor (Not Tumor)` ≠ confirmed malignant.** The primary compartment used (151,285 cells) is transcriptionally tumor-like but NOT CNV-confirmed by the URBAN algorithm. Only 2,731 cells across the full dataset are CNV-confirmed malignant, and the confirmed_tumor compartment has only 2 Primary samples — statistically unreliable.

2. **STK11 covariate omitted.** STK11-MUT status is enriched in this cohort but is confounded with BrM/Primary split. Results may be partially confounded by STK11 genotype.

3. **Cross-cancer-type limitation.** GSE223499 = NSCLC; CRISPRa screen (GSE237446) = breast cancer cell line. Functional enrichment in a breast BrM screen does not guarantee RNA upregulation in NSCLC BrM.

4. **PTPRC open item (UNRESOLVED-006).** BrM immune enrichment of PTPRC requires cell proportion analysis, not per-cell DE.

5. **SLC45A4 flagged unreliable.** Do not cite LFC +1.06 as evidence of BrM upregulation.

6. **Best available dataset.** GSE223499 is the best open-access NSCLC BrM snRNA-seq dataset. Bulk RNA-seq (HRA004247, Genome Medicine 2024, n=56 matched pairs) remains inaccessible (NGDC gated). Pseudobulk from snRNA-seq is a valid but imperfect substitute for bulk RNA-seq.

---

## 8. Recommended Next Steps

1. **PTPRC proportion analysis:** Compute fraction of PTPRC+ immune cells in BrM vs Primary using GSE223499 metadata (simple proportion test or MiloR).
2. **SLC45A4 outlier investigation:** Characterize PA080 and PA072 — are these samples with specific histological subtypes or STK11 status driving the extreme SLC45A4 expression?
3. **Access HRA004247:** Request access to Genome Medicine 2024 bulk RNA-seq (n=56 NSCLC matched pairs) for a higher-powered, bulk-level validation.
4. **FAM72A/BACE1 follow-up:** Both are trending (padj 0.06–0.07) with consistent direction. A larger cohort or meta-analysis across BrM datasets would likely confirm these.
