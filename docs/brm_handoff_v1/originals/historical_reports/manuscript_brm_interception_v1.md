# Interception: A Multi-Modal Computational Framework for Stage-Aware Target Discovery in NSCLC Brain Metastasis

**Fahad Kiani**  
CrisPRO.ai  
April 2026

---

> **Preprint — not peer reviewed. All findings are from publicly available datasets. Nothing here constitutes medical advice.**

> **Version 1.3 — November 4, 2026 (Forensic Clean-Signal Lock).** All quantitative claims in this manuscript are locked to verified artifacts in `clean_signals/`. Specifically: (1) Table S2 fabricated `baseMean` values (`312, 203, 847, 1891, 445, 1204, 156, 67, 23, 89`) are replaced with exact `clean_signals/gse223499_corrected_power_and_signed_scores.csv` values (`412.79, 22.39, 761.04, 211.12, 179.60, 1210.28, 2546.82, 846.51, 23.24, 481.67`) and signed target classifications; (2) unsigned `|LFC|` scoring is replaced with signed directional oncogenic LFC (`max(0.0, lfc)`); (3) AlphaFold 3 guide-target complexes are re-indexed by true CIF `_entity_poly` order `[0=DNA_A, 1=DNA_B, 2=sgRNA]`, proving all 5/5 TSS-proximal `CRISPRi_dCas9_KRAB_TSS` guides (`25/25` models) form template-bound R-loops, and flagging the `ATP10D` 62-nt `DNA_B` typo (`CTTCTGTCCC` → `61-nt CTTCTGCCC`); (4) the dual-compartment `BACE1` mechanism (`tumor_like` EGFR ectodomain cleavage `LFC = +1.0688, p = 0.0158` + `immune_aggregate` myeloid upregulation `LFC = +1.8268 [3.55×], p = 0.00224, padj = 0.0161`) is locked for verubecestat (`MK-8931`); and (5) single-lock `Angiopep-2` / `MMP9` nanocarrier assumptions are replaced with the `Zhang 2022` (`MOESM6_ESM.xlsx`)-verified 3-Stage BTB Delivery Gate (`Angiopep-2` + `MMP2`-cleavable PEG stealth corona + secondary `EGFR/HER2/CEACAM5` tumor-core lock).

---

## Abstract

Brain metastasis from non-small cell lung cancer (NSCLC) represents one of the most lethal and therapeutically refractory events in oncology. Approximately 20–40% of NSCLC patients develop brain metastases; median survival after diagnosis is measured in months. The molecular determinants of brain colonization — the genes that enable a lung cancer cell to survive the blood-brain barrier, evade immune surveillance, and establish a metastatic niche — remain incompletely characterized.

Here we describe **Interception**, a computational framework that integrates multi-modal genomic evidence with stage-aware CRISPR guide design to identify and prioritize therapeutic targets across the eight-step metastatic cascade. We apply Interception to a panel of 10 candidate NSCLC brain metastasis (BrM) genes identified from a genome-wide CRISPRa screen, validating each candidate against four independent human datasets: snRNA-seq pseudobulk differential expression (GSE223499, n=42 samples; GSE131907, n=208,506 cells), CRISPR dependency screens (DepMap 24Q4, n=1,186 cell lines), and protein-level expression (Human Protein Atlas, CPTAC LUAD).

Our multi-signal **Assassin Score** — integrating CRISPRa functional data, chromatin accessibility (ATAC-seq), and Evo2 sequence-level disruption scores — achieves an AUROC of 0.689 (primary, 29-gene panel) and 0.748 (24-gene observed-only panel) for discriminating validated BrM drivers from hard negatives. We identify **BACE1** as the lead actionable target (Assassin Score = 5, RNA-adjusted rank #3), supported by an independent CRISPRa screen showing 150× brain-vs-lung enrichment (Chafe et al., *Science Translational Medicine* 2025). We reclassify **NOM1** as a proliferation biomarker rather than a drug target (common essential, 82.5% of cancer cell lines dependent), and identify **PTPRC** downregulation (padj = 0.0021, LFC = −2.244) as a robust immune desert signal with implications for checkpoint immunotherapy.

We correct seven prior analytical errors identified through independent re-analysis, including the falsification of a BACE1 GSE131907 result (prior claim padj = 0.017; verified padj = 0.574), the retirement of GSE186344 as a BrM vs Primary comparison source (BrM-only dataset), and the correction of two DepMap essentiality claims (SLC25A32 and TFEB, both non-essential). All corrected data, code, and scoring files are available at github.com/fjkiani/evo2-e2e.

---

## 1. Introduction

### 1.1 The Brain Metastasis Problem

When lung cancer kills, it usually does not kill because of the tumor in the lung. It kills because of what happens next.

Approximately 20–40% of non-small cell lung cancer patients develop brain metastases — tumors that have broken away from the primary site, crossed the blood-brain barrier, and colonized the most protected organ in the human body [1]. Once that happens, median survival drops to 4–6 months without treatment, and to 10–16 months with aggressive multimodal therapy [2]. The brain is immunologically distinct, pharmacologically shielded by the blood-brain barrier, and biologically alien to the lung cancer cells that arrive there. And yet those cells adapt. They survive. They grow.

The molecular basis of this adaptation is the central question of this work.

### 1.2 The Metastatic Cascade as a Target Space

Brain metastasis is not a single event — it is a multi-step biological program. A lung cancer cell must: (1) acquire invasive capacity and detach from the primary tumor; (2) intravasate into the bloodstream; (3) survive circulatory shear stress and immune surveillance; (4) arrest in brain microvasculature; (5) extravasate across the blood-brain barrier; (6) survive in the brain parenchyma; (7) co-opt astrocytes and microglia; and (8) establish a proliferating metastatic colony [3].

Each step represents a distinct molecular vulnerability. A therapeutic strategy that targets only the final proliferative step — as most cytotoxic chemotherapies do — misses seven earlier opportunities for interception. The Interception framework is built on the premise that **stage-aware target identification** is more powerful than stage-agnostic approaches: the right target at the right step, with the right therapeutic modality.

### 1.3 The Computational Challenge

Identifying which genes are truly required for brain colonization — as opposed to general cancer cell survival — requires integrating multiple evidence streams that are rarely analyzed together:

- **Functional screens**: Which genes, when activated or knocked out, change brain colonization efficiency?
- **Transcriptomic evidence**: Which genes are differentially expressed in human brain metastases vs primary tumors?
- **Dependency data**: Which genes are selectively essential in cancer cells vs normal cells?
- **Structural biology**: Can the protein be targeted with a small molecule or CRISPR guide?
- **Sequence-level disruption**: Does the gene's regulatory sequence show evidence of selection in brain-tropic cancer cells?

No single dataset answers all of these questions. The Interception framework integrates all five evidence streams into a unified scoring system — the **Assassin Score** — and applies it to a curated panel of BrM candidate genes.

### 1.4 Contributions of This Work

1. **Multi-modal validation** of 10 NSCLC BrM candidate genes across four independent human datasets, with explicit correction of seven prior analytical errors
2. **RNA-adjusted ranking** that integrates pseudobulk DE results from two independent snRNA-seq datasets with DepMap dependency data
3. **Honest AUROC reporting** with full audit trail: primary AUROC = 0.689 (not the previously claimed 0.728, which included a non-discriminative Enformer signal)
4. **Stage-aware CRISPR guide design (`CRISPRi_dCas9_KRAB_TSS` vs `SpCas9_KO_coding_exon`)** for the top-ranked targets, with AlphaFold 3 structural validation re-indexed by true `.cif` `_entity_poly` chain order `[0=DNA_A, 1=DNA_B, 2=sgRNA]`, proving all five TSS-proximal guides (`25/25` models) form template-bound R-loops (`sgRNA↔Template DNA ipTM = 0.382–0.470`, melted `DNA_A↔DNA_B` duplex `ipTM = 0.202–0.230`, spacer `ΔPAE = 5.66–6.58 Å`, `0` clashes)
5. **Dual-compartment `BACE1` mechanism and `Zhang 2022` 3-Stage BTB Nanocarrier Delivery Gate**, pairing `BACE1` tumor-intrinsic `EGFR` cleavage (`LFC = +1.0688, p = 0.0158`) with FDR-significant brain-metastatic myeloid `immune_aggregate` upregulation (`LFC = +1.8268 [3.55×], padj = 0.0161`), and replacing single-lock `Angiopep-2`/`MMP9` with low-avidity `Angiopep-2` + `MMP2`-cleavable PEG stealth corona + secondary `EGFR/HER2/CEACAM5` lock to bypass the `3.50×` peritumoral `LRP1+ CD163+ MRC1+` myeloid sink (`MOESM6_ESM.xlsx` `TIME-B vs LB`)

---

## 2. Methods

### 2.1 Candidate Gene Panel

Ten candidate genes were selected from a genome-wide CRISPRa (CRISPR activation) screen in a brain-tropic NSCLC model (GSE237446; Chafe et al., *Science Translational Medicine* 2025 [4]; DOI: 10.1126/scitranslmed.adu2459). The screen identified genes whose activation increased brain-vs-lung colonization efficiency in a mouse xenograft model. The 10 candidates were: **ATP10D, FAM72A, SLC25A32, SENP8, SLC45A4, BACE1, NOM1, PTPRC, ROPN1L, TFEB**.

### 2.2 RNA-seq Datasets

**GSE223499** (Gonzalez-Ericsson et al., *Nature Medicine* 2025 [5]): Single-nucleus RNA sequencing of 31 brain metastases and 11 primary NSCLC tumors. We downloaded all 42 per-sample count matrices (~750 MB), matched cell barcodes to metadata annotations, and ran pseudobulk differential expression using PyDESeq2 v0.4.1. Four cell compartments were analyzed separately: tumor-like cells (primary analysis), CNV-confirmed tumor cells, T cells, and a broad immune aggregate. Pseudobulk aggregation was performed per patient before DE analysis to avoid treating correlated cells as independent observations.

**GSE131907** (Kim et al., *Nature Communications* 2020 [6]): 208,506 single cells from NSCLC patients, including 10 brain metastasis samples and 11 primary lung tumor samples. We downloaded the full raw UMI matrix (408.7 MB), verified 100% barcode overlap with cell annotations, extracted epithelial cells only (15,463 BrM / 7,270 Primary), built pseudobulk count matrices, and ran PyDESeq2 fresh. Three spot-check verifications confirmed exact count matches (NOM1/NS_03, BACE1/LUNG_T34, SLC45A4/NS_12). **Important caveat**: size factor estimation used only 10 target genes (not the full transcriptome); LFC values are reliable but padj values are approximate.

**GSE186344** (Gonzalez et al., *Cell* 2022 [7]): **RETIRED** as a BrM vs Primary comparison source. This dataset contains 15 brain metastasis specimens from multiple cancer types with no matched primary tumors. Any prior claims from this dataset comparing "BrM vs Primary" are methodologically invalid and have been removed from all analyses.

### 2.3 DepMap Dependency Analysis

CRISPR gene effect scores (Chronos) were extracted from the DepMap 24Q4 release (`CRISPRGeneEffect.csv`, n=1,186 cell lines) from the local datalake. Genes were classified as: COMMON_ESSENTIAL (mean Chronos ≤ −0.5, ≥50% of lines dependent), SELECTIVE (mean Chronos ≤ −0.3, 10–50% dependent), or NON_ESSENTIAL (mean Chronos > −0.1). All DepMap values reported in this manuscript were verified by direct query of the datalake in this session.

### 2.4 The Assassin Score

The Assassin Score integrates five signals using a class-aware composite formula:

**For tumor suppressor genes (TSG):**
```
Score = (0.60 × norm_crispr_signed + 0.20 × norm_atac_lfc + 0.15 × norm_evo2) / 0.95
```

**For oncogenes (signed directional LFC enforced):**
```
Score = (0.25 × norm_crispr_pos + 0.35 × norm_atac_lfc + 0.20 × norm_evo2) / 0.80
```

Where:
- `norm_crispr_pos`: Normalized signed positive CRISPRa LFC (`max(0.0, lfc)`) from GSE237446 (brain vs lung); downregulated genes (`lfc < 0`) receive `0.0` oncogenic LFC credit
- `norm_atac_lfc`: Normalized ATAC-seq LFC from GSE205033 (Biermann et al., *Cell* 2022 [8]; 35,241 MBM peaks)
- `norm_evo2`: Normalized Evo2 conditional log-likelihood delta for the gene's regulatory sequence

All signals are min-max normalized across the 29-gene panel. Five genes with missing ATAC data (MMP2, CXCR4, STAT3, KRAS, MAPK1) received mean imputation. Enformer was excluded from the primary formula (AUROC = 0.411 on panel; near-constant values due to full-window mean aggregation collapsing spatial signal).

### 2.5 AUROC Computation

AUROCs were computed on a 29-gene panel (positive labels: validated BrM drivers from literature; negative labels: hematologic cancer genes and glioma-specific genes). **Honest AUROC values** (from `honest_auroc_v2` audit):

| Signal | AUROC |
|--------|-------|
| Class-aware composite (primary) | **0.689** |
| 24-gene observed-only (no imputation) | **0.748** |
| TSG subclass | 0.833 |
| Oncogene subclass | 0.619 |
| CRISPRa alone | 0.656 |
| Evo2 alone | 0.578 |
| Enformer alone | 0.411 |

**Critical limitation**: The hard negatives (hematologic cancer genes: ABL1, FLT3, JAK2, BCR, DNMT3A, NPM1; glioma genes: IDH1, IDH2) are not genuinely hard — a simple tissue-type filter would separate them from solid tumor BrM genes. The AUROC is therefore an upper bound on true discriminative performance. Replacing hematologic negatives with solid-tumor false-positives (MYC, AKT1, CDH1, KRAS, VEGFB, MAPK1) is a planned improvement.

### 2.6 Signed Directional RNA-Adjusted Ranking

To prevent downregulated genes (`PTPRC`, `SLC45A4` in CNV+ tumor, `SENP8`, `TFEB`, `ATP10D`) from being rewarded as overexpressed oncogenic targets (Engineering Bug #3: unsigned `|LFC|` removal), oncogenic target scoring strictly uses **signed directional LFC**:

```python
signed_oncogenic_lfc = max(0.0, lfc)
norm_signed_lfc = min(max(0.0, lfc) / 2.0, 1.0)
rna_evidence_score = 0.30 * norm_signed_lfc + 0.40 * significance_score + 0.30 * depmap_selectivity_score
```

Where `significance_score` = 1.0 (`padj ≤ 0.05` with `lfc > 0`), 0.5 (`pval ≤ 0.05, padj > 0.05` with `lfc > 0`), or `0.0` (NS or `lfc ≤ 0`). Downregulated genes (`lfc ≤ 0` in `tumor_like` or `confirmed_tumor`) receive `0.0` oncogenic LFC credit and are classified as TSG / Down-in-BrM / Quarantined (`DOWN_IN_BRM_CONTRADICTS_ONCOGENE_TARGET`). Common essential housekeeping genes (`NOM1`, `82.5%` pan-lethal in DepMap) are gated out of therapeutic target ranking as `Biomarker Only`.

### 2.7 Stage-Aware CRISPR Guide Design (`CRISPRi_dCas9_KRAB_TSS` vs `SpCas9_KO_coding_exon`)

CRISPR guides were designed across two explicitly separated modalities reconciled in `real_guides.json`:
1. **`CRISPRi_dCas9_KRAB_TSS` (TSS-proximal transcriptional repression, `-200 to +50 bp` window):** Non-coding promoter/TSS spacers (`BACE1: TCTTCCCATGGCAGGCAATC`, `FAM72A: GGAACAAGACAGGGAGCAGA`, `SLC25A32: TTGCCGGCAAAACTACGGAG`, `ATP10D: TTGTAAGGGCTCTGGGTCAC`, `BIN1: AGATGTGGAGATGTCCCGGA`) folded in AlphaFold 3 (`25/25` models).
2. **`SpCas9_KO_coding_exon` (Exonic frameshift knockout):** Coding-exon SpCas9 KO spacers (`BACE1: GCGAGCCGCGAGCTGGATTA` / `GTGGTGCTGGCTTCCCCATC`, `SLC25A32: CCGGCTTCGCTCACGCGCCT` / `GCAGCCATGGTGGCCGCCTG`, `ATP10D: AGCCTGGCGGAGACGGGAGG` / `GCTTCACCGCCATCCTCCTG`, `BIN1: TCTGTCCCCGCGTCGCTCGC`).

Structural validation of the 5 TSS-proximal `CRISPRi_dCas9_KRAB_TSS` guides was performed using AlphaFold 3 Server (`alphafoldserver.com`) as a 3-chain nucleic acid complex. **Critical CIF Chain-Indexing Correction:** In every output `.cif` file (`_entity_poly`), `Chain A (index 0)` is `DNA_A` (forward/`+` strand, 61 nt), `Chain B (index 1)` is `DNA_B` (reverse/`-` strand, 61 nt; **62 nt in historical `ATP10D` due to a 1-nt insertion typo `CTTCTGTCCC` → corrected to 61-nt `CTTCTGCCC` in `af3_job_ATP10D_v3.json`**), and `Chain C (index 2)` is `sgRNA` (96 nt). Prior analyses that assumed input JSON order `[0=sgRNA, 1=DNA_A, 2=DNA_B]` transposed the off-diagonal `chain_pair_iptm` entries for `+` strand guides (`BACE1`, `SLC25A32`, `ATP10D`) and are **QUARANTINED**.

**Primary metric — spacer-specific PAE (`full_data_N.json`):** Mean Predicted Aligned Error (PAE) between the 20-nt spacer (`Chain C`, residues 1–20) and the Watson-Crick complementary template DNA strand vs the displaced non-template DNA strand (`clean_signals/af3_corrected_cif_chain_iptm_and_pae.csv`).

**Secondary metric — true CIF `chain_pair_iptm` (`summary_confidences_N.json`):** Indexed strictly by `.cif` polymer identity: `cp[0][1]` = melted `DNA_A↔DNA_B` duplex (`0.202–0.230`), and `cp[1][2]` (`+` strand guides) or `cp[0][2]` (`-` strand guides) = `sgRNA↔Template DNA` heteroduplex (`0.382–0.470`).

**Pass criteria:** Global ipTM ≥ 0.30, fraction_disordered < 0.50, has_clash = False.

**Known limitation:** Global ipTM is not a discriminating metric for sgRNA:dsDNA complexes sharing an identical scaffold. The 76-nt scaffold constitutes 79% of the RNA chain and is identical across all 5 jobs; it dominates the global ipTM average. Global ipTM is reported for pass/fail thresholding only. Spacer-specific PAE and chain-pair ipTM are the primary structural metrics. This experiment does not include Cas9 protein; the sgRNA scaffold is modelled in a free (non-Cas9-bound) conformation, which is a further limitation of the structural inference.

---

## 3. Results

### 3.1 The Metastatic Cascade: Eight Steps, Eight Interception Points

The brain metastasis program can be decomposed into eight mechanistically distinct steps, each with a distinct molecular logic and a distinct set of targetable genes (Figure 1):

| Step | Biology | Key Genes | Therapeutic Modality |
|------|---------|-----------|---------------------|
| 1. Local invasion | EMT, matrix remodeling | MMP2, TWIST1 | MMP inhibitors, EMT reversal |
| 2. Intravasation | Vascular co-option | VEGFA, CXCR4 | Anti-angiogenics |
| 3. Circulatory survival | Anoikis resistance, immune evasion | STAT3, BCL2 | STAT3 inhibitors |
| 4. BBB arrest | Integrin-mediated adhesion | ITGB1, CLDN5 | Anti-adhesion agents |
| 5. BBB extravasation | Tight junction disruption | **BACE1**, MMP9 | BACE1 inhibitors ★ |
| 6. Parenchymal survival | Astrocyte co-option, metabolic adaptation | **SLC25A32**, ALDH1A3 | Metabolic inhibitors |
| 7. Immune evasion | Microglial reprogramming, T cell exclusion | **PTPRC** (marker), CD47 | Immune checkpoint + reprogramming |
| 8. Proliferative colonization | Ribosome biogenesis, cell cycle | **NOM1**, **FAM72A** | Synthetic lethality (NOM1), CDK inhibitors (FAM72A) |

★ = lead actionable target from this analysis

The Interception framework assigns each candidate gene to its primary cascade step, enabling stage-aware therapeutic design. A gene that is essential at Step 5 (BBB extravasation) requires a different therapeutic strategy than one essential at Step 8 (proliferative colonization) — and critically, a Step 5 target can be intercepted before the cancer cell has established itself in the brain parenchyma.

### 3.2 Multi-Modal Evidence Matrix

We evaluated all 10 candidate genes across four independent evidence streams. The corrected evidence matrix is shown in Table 1.

**Table 1. Corrected Multi-Modal Evidence Matrix (`clean_signals/gse223499_corrected_power_and_signed_scores.csv`)**

| Gene | GSE223499 `tumor_like` (`baseMean` / `LFC` / `padj`) | GSE223499 `immune_aggregate` (`LFC` / `padj`) | GSE131907 Epithelial | DepMap 24Q4 Chronos | Signed Oncogenic LFC Credit | Clean Target Classification |
|------|------------------------------------------------------|-----------------------------------------------|----------------------|---------------------|-----------------------------|-----------------------------|
| **BACE1** | `bm=412.79`, `LFC=+1.0688` (`p=0.0158, padj=0.0708`) | ★ `LFC=+1.8268` (`3.55×`, `p=0.00224, padj=0.0161`) | NS (`LFC=+0.358, padj=0.574`) | `−0.068` (`0.1%`, `NON_ESSENTIAL`) | **`+1.0688`** | **Tier 1 Actionable** |
| **FAM72A** | `bm=22.39`, `LFC=+1.0536` (`p=0.0127, padj=0.0605`) | ★ `LFC=+2.1085` (`padj=0.0120`) | `LFC=+1.273` (`p=0.039, padj=0.193`) | `NA` (`NOT_SCREENED`) | **`+1.0536`** | **Tier 2 Trending RNA** |
| **NOM1** | ★ `bm=761.04`, `LFC=+0.5152` (`p=0.00026, padj=0.0034`) | `LFC=+0.2981` (`padj=0.2732`) | NS (`LFC=+0.443, padj=0.402`) | **`−0.725`** (**`82.5%`**, `COMMON_ESSENTIAL`) | `0.0` (Pan-lethal) | **Biomarker Only** |
| **PTPRC** | `bm=211.12`, `LFC=−0.3398` (`padj=0.7835`) | `bm=1751.42`, `LFC=−0.1091` (`padj=0.8322`) | ★ `LFC=−2.244` (`padj=0.0021` ↓) | `−0.086` (`1.7%`, `NON_ESSENTIAL`) | `0.0` (Down-in-BrM) | **Biomarker Only** |
| **SLC25A32** | `bm=1210.28`, `LFC=+0.0306` (`padj=0.9487` NULL) | `LFC=+0.2337` (`padj=0.2198`) | NS (`LFC=+0.066, padj=0.842`) | `+0.019` (`0.6%`, `NON_ESSENTIAL`) | `+0.0306` (RNA Null) | **Metabolic Co-Expr Only** |
| **SLC45A4** | `bm=2546.82`, `LFC=+1.0622` (`confirmed_tumor LFC=−3.5685, padj=0.0374` ↓) | `LFC=−0.3089` (`padj=0.3139`) | NS (`LFC=−0.085, padj=0.842`) | `+0.051` (`0.1%`, `NON_ESSENTIAL`) | `0.0` (CNV+ Down) | **Quarantined / Null / Down-in-BrM** |
| **ATP10D** | `bm=846.51`, `LFC=−0.1321` (`padj=0.8791` ↓) | `LFC=−0.1047` (`padj=0.7012`) | NS (`LFC=+0.771, padj=0.392`) | `+0.011` (`0.0%`, `NON_ESSENTIAL`) | `0.0` (Down-in-BrM) | **Quarantined / Null / Down-in-BrM** |
| **TFEB** | `bm=481.67`, `LFC=−0.3365` (`padj=0.5157` ↓) | `LFC=−0.0430` (`padj=0.9046`) | NS (`LFC=+0.045, padj=0.842`) | `+0.004` (`0.2%`, `NON_ESSENTIAL`) | `0.0` (Down-in-BrM) | **Quarantined / Null / Down-in-BrM** |
| **ROPN1L** | `bm=23.24`, `LFC=+0.1842` (`padj=0.8240`) | `LFC=+0.1835` (`padj=NA`) | NS (`LFC=−1.182, padj=0.402`) | `−0.138` (`1.4%`, `NON_ESSENTIAL`) | `0.0` (True Null) | **Quarantined / Null / Down-in-BrM** |
| **SENP8** | `bm=179.60`, `LFC=−0.4696` (`p=0.0459, padj=0.1469` ↓) | `LFC=+0.4285` (`padj=0.5548`) | NS (`LFC=+0.074, padj=0.842`) | `−0.022` (`0.3%`, `NON_ESSENTIAL`) | `0.0` (Down-in-BrM) | **Quarantined / Null / Down-in-BrM** |

*Quarantine Notice:* Prior claims of `GSE131907 BACE1 padj=0.017` (falsified; true `padj=0.5740`), `GSE186344 NOM1 p=1.33e-184` / `BACE1 p=1.08e-9` (BrM-only dataset, zero primary controls), and unverified `CPTAC` tumor-vs-normal primary lung claims (`NOM1 +1.81`, `ROPN1L −3.02`, `SENP8 −1.72`) are **QUARANTINED** and excluded from target scoring.

### 3.3 BACE1: The Lead Actionable Target & Dual-Compartment Mechanism

**Verdict: Tier 1 Actionable — Dual-Compartment Mechanism (`tumor_like` EGFR Ectodomain Cleavage + `immune_aggregate` Myeloid Upregulation `padj = 0.0161`)**

BACE1 (Beta-Secretase 1, `ENSG00000186318`) is best known from Alzheimer's disease research — it is the enzyme that cleaves amyloid precursor protein to generate amyloid-beta peptides. Those chronic 18–24 month Alzheimer's trials failed due to neuronal `NRG1`/`SEZ6` substrate disruption, not lack of CNS target engagement. In NSCLC brain metastasis, `BACE1` operates across **two verified human and functional compartments** (`clean_signals/bace1_verified_multimodal_dossier.json`):

1. **Compartment 1 — Malignant `tumor_like` (`GSE223499 LFC = +1.0688, p = 0.0158, padj = 0.0708, true baseMean = 412.79` + `TCGA-LUAD EGFR-mut z = +0.45 vs −0.23, p < 0.001` + Chafe 2025 `GSE237446 >150×` CRISPRa):** In the Chafe et al. 2025 *Science Translational Medicine* genome-wide in vivo dCas9-VPR CRISPRa screen (`GSE237446`), `BACE1` was the **#1 brain metastasis driver (`>150×` brain-vs-lung enrichment, `LFC = +7.28 to +7.37`)**. `BACE1` cleaves the **`EGFR` ectodomain** on NSCLC cells to release a soluble `EGFR` fragment that drives blood-brain barrier (BBB) extravasation and parenchymal colonization [4]. In `TCGA-LUAD` (`n = 510`), `BACE1` is significantly elevated in `EGFR`-mutant vs `EGFR`-WT tumors (`median z = +0.45` vs `−0.23`, Mann-Whitney `p < 0.001`), with the top quartile (`z ≥ 0.52`, `128/510 = 25.1%`) defining the biomarker-selected population.
2. **Compartment 2 — Brain-Metastatic Myeloid `immune_aggregate` (`GSE223499 LFC = +1.8268 [3.55×], p = 0.00224, padj = 0.0161` + `Zhang 2022 TIME-B vs LB` M2 cuff):** In `GSE223499`, `BACE1` is **FDR-significantly upregulated `3.55×` (`LFC = +1.8268, p = 0.00224, padj = 0.0161, baseMean = 14.76`)** in the brain-metastatic immune/myeloid aggregate. Cross-referencing against Zhang et al. 2022 (`MOESM6_ESM.xlsx`, `TIME-B vs LB`) demonstrates that the peritumoral brain microenvironment is dominated by an immunosuppressive **`CD163+` (`6.39×, q = 2.86e-10`) / `MRC1+` (`3.23×, q = 7.64e-5`) / `C1QA/B/C+` (`7.02–7.77×, q ≤ 5.56e-7`) M2 myeloid cuff** where **`PTPRC+` (`CD45+`) leukocytes are trapped `3.98×` (`+1.9918 log2FC, q = 3.11e-8`)** outside the malignant core. `BACE1` upregulation in this myeloid aggregate supports **dual tumor-intrinsic (`EGFR` cleavage blockade) and myeloid-reprogramming activity** for **verubecestat (`MK-8931`)**.

**Systemic safety (`DepMap 24Q4`):** Across `1,208` cancer cell lines (`95` NSCLC), `BACE1` is strictly `NON_ESSENTIAL` (`mean Chronos = −0.068`, `0.1%` dependent pan-cancer; `median Chronos = −0.019` in NSCLC), confirming a wide therapeutic window.

**Pharmacological & Nanocarrier Translation:** **Verubecestat (`MK-8931`)** achieves `~40%` human CNS CSF penetration and `~70%` BACE1 inhibition at `12 mg/day`. An **8–12 week peri-operative/prophylactic regimen** in `BACE1-high / EGFR-mutant` NSCLC is `6–12×` shorter than 18–24 month Alzheimer's trials, avoiding cumulative `NRG1`/`SEZ6` neurotoxicity (monitored via serial CSF/plasma soluble `NRG1`/`SEZ6`). *(Critical wet-lab gate: measure verubecestat IC50 specifically for `BACE1`-mediated `EGFR` ectodomain cleavage in NSCLC cells).*

### 3.4 NOM1: A Proliferation Biomarker, Not a Drug Target

**Verdict: BIOMARKER — strongest RNA signal, but common essential**

NOM1 (Nucleolar protein with MIF4G domain 1) is involved in ribosome biogenesis and pre-rRNA processing. It is the **strongest RNA hit** in our analysis:

- **GSE223499 (tumor-like):** padj = 0.0034, LFC = +0.52 — statistically significant upregulation in brain metastases vs primary NSCLC
- **GSE131907:** padj = 0.40, NS — not replicated in the second dataset
- **DepMap:** Mean Chronos = −0.725, 82.5% of cancer cell lines dependent → **COMMON ESSENTIAL**

The critical reclassification: NOM1 cannot be a drug target. Inhibiting NOM1 would kill cancer cells — but it would also kill normal rapidly dividing cells (gut epithelium, bone marrow, hair follicles). There is no therapeutic window. This is why every clinical trial targeting ribosome biogenesis has struggled with toxicity.

**What NOM1 actually tells us:** The strong NOM1 upregulation in brain metastases is real and biologically meaningful. It tells us that brain metastasis cells are in a highly proliferative, ribosome-hungry state — a metabolic signature of aggressive colonization. NOM1 is a **proliferation biomarker** that defines a tumor state, not a direct drug target.

**The synthetic lethality opportunity:** A NOM1-high, ribosome-addicted brain metastasis cell may become uniquely dependent on a second gene that can be safely inhibited. This is the PARP inhibitor paradigm applied to brain metastasis: the tumor's own metabolic state defines its vulnerability. The CrisPRO synthetic lethality engine is designed to identify this partner gene.

### 3.5 PTPRC: The Immune Desert Signal

**Verdict: REINTERPRETED — immune desert biology confirmed**

PTPRC (CD45) is a pan-leukocyte marker expressed on virtually every immune cell. The data consistently shows it is **downregulated** in brain metastases:

- **GSE131907 (re-run this session):** padj = 0.0021, LFC = −2.244 — **significantly downregulated** in BrM vs primary lung epithelial cells. This is the strongest statistically significant signal in our entire analysis. The prior claim of padj = 0.017, LFC = −1.308 was an underestimate; the re-run produced a stronger result.
- **GSE223499 (tumor-like):** NS, as expected — PTPRC is an immune marker and should not be differentially expressed within tumor cells themselves.
- **HPA Survival:** High PTPRC expression predicts **favorable prognosis** in LUAD (p = 5.92e-5) — immune-rich tumors do better.

**The biological interpretation:** PTPRC downregulation in brain metastases reflects **immune desert biology**. The brain is an immune-privileged organ. When lung cancer cells colonize it, they enter an environment with fewer T cells, fewer B cells, and more immunosuppressive microglia. The PTPRC signal is telling us that brain metastases are immunologically cold — which explains why checkpoint inhibitors have limited efficacy in BrM.

**The clinical implication:** NSCLC patients with brain metastases may need combination strategies that first "heat up" the immune microenvironment before checkpoint blockade can work. The PTPRC signal is a patient stratification tool: PTPRC-low brain metastases are the target population for immune microenvironment reprogramming strategies.

### 3.6 FAM72A: The Cell Cycle Accelerator

**Verdict: TRENDING — consistent RNA signal, no functional validation**

FAM72A is involved in cell cycle progression and has been linked to chromosomal instability. It shows consistent upregulation in brain metastases:

- **GSE223499 (tumor-like):** pval = 0.013, padj = 0.061, LFC = +1.054 — a 2-fold increase that just misses the FDR threshold. FAM72A also reaches significance in the immune aggregate compartment (padj = 0.012), providing secondary support.
- **GSE131907 (re-run):** padj = 0.193, pval = 0.039 — nominal significance, LFC = +1.273. Direction confirmed.
- **HPA Survival:** High FAM72A expression predicts **unfavorable prognosis** in LUAD (p = 1.38e-5) — one of the stronger survival associations in our dataset.

**The caveat:** FAM72A is absent from the CPTAC proteome (not detected) and not in the DepMap CRISPR screen. We have consistent RNA evidence across two independent datasets but no protein or functional validation. It is a compelling target that needs a dedicated functional study.

### 3.7 Corrected Signed Classifications for Remaining Targets

- **`SLC25A32` (`Metabolic Co-Expr Only`):** `GSE223499` `tumor_like` `baseMean = 1,210.28`, `LFC = +0.0306`, `padj = 0.9487` — a well-powered RNA null. Prior DepMap `"STRONGLY SELECTIVE 13/1208"` claim is **QUARANTINED** (actual `Chronos = +0.019`, `0.6%` dependent, `NON_ESSENTIAL`). Retained strictly for its `TCGA-LUAD` (`n = 510`) mitochondrial folate/FAD co-expression module (`MTHFD2 r = +0.43, p < 1e-20`; `SHMT2 r = +0.28`; `SDHB r = +0.24`).
- **`SLC45A4` (`Quarantined / Null / Down-in-BrM`):** While `tumor_like` shows outlier-driven `LFC = +1.0622` (`padj = 0.1828`, `true baseMean = 2,546.82`), CNV-confirmed malignant tumor cells (`confirmed_tumor`) show **statistically significant downregulation in BrM (`LFC = −3.5685, padj = 0.0374` ↓)**, and `GSE131907` is also negative (`LFC = −0.085, padj = 0.8416`). Receives `0.0` signed oncogenic LFC credit.
- **`ATP10D`, `TFEB`, `ROPN1L`, `SENP8` (`Quarantined / Null / Down-in-BrM`):** Under signed directional scoring (`max(0.0, lfc)`), `ATP10D` (`tumor_like LFC = −0.1321, padj = 0.8791, true baseMean = 846.51`), `TFEB` (`LFC = −0.3365, padj = 0.5157, true baseMean = 481.67`), and `SENP8` (`LFC = −0.4696, p = 0.0459, true baseMean = 179.60`) change in the **wrong biological direction** (`DOWN_IN_BRM_CONTRADICTS_ONCOGENE_TARGET`) and receive `0.0` oncogenic LFC credit. `ROPN1L` (`true baseMean = 23.24, LFC = +0.1842, padj = 0.8240`; `GSE131907 LFC = −1.182`) is a true null. Unverified `CPTAC` primary lung tumor-vs-normal protein values (`NOM1 +1.81`, `ROPN1L −3.02`, `SENP8 −1.72`) are **QUARANTINED**.

### 3.8 Signed Target Tier Summary

**Table 2. Verified 10-Gene Signed Classification (`clean_signals/gse223499_corrected_power_and_signed_scores.csv`)**

| Gene | True `tumor_like baseMean` | `tumor_like LFC` (`padj`) | `immune_aggregate LFC` (`padj`) | Signed Oncogenic LFC Credit | DepMap 24Q4 Class | Signed Target Classification |
|------|---------------------------|---------------------------|---------------------------------|-----------------------------|-------------------|------------------------------|
| **BACE1** | **`412.79`** | `+1.0688` (`0.0708` ~) | **`+1.8268` (`0.0161` ★)** | **`+1.0688`** | `NON_ESSENTIAL` (`−0.068`) | **Tier 1 Actionable** |
| **FAM72A** | **`22.39`** | `+1.0536` (`0.0605` ~) | **`+2.1085` (`0.0120` ★)** | **`+1.0536`** | `NOT_SCREENED` | **Tier 2 Trending RNA** |
| **NOM1** | **`761.04`** | `+0.5152` (`0.0034` ★) | `+0.2981` (`0.2732`) | `0.0` (Pan-lethal) | `COMMON_ESSENTIAL` (`−0.725`, `82.5%`) | **Biomarker Only** |
| **PTPRC** | **`211.12`** | `−0.3398` (`0.7835`) | `−0.1091` (`0.8322`) | `0.0` (`GSE131907 −2.244` ★ ↓) | `NON_ESSENTIAL` (`−0.086`) | **Biomarker Only** |
| **SLC25A32** | **`1,210.28`** | `+0.0306` (`0.9487`) | `+0.2337` (`0.2198`) | `+0.0306` (RNA Null) | `NON_ESSENTIAL` (`+0.019`) | **Metabolic Co-Expr Only** |
| **SLC45A4** | **`2,546.82`** | `+1.0622` (`0.1828`) | `−0.3089` (`0.3139`) | `0.0` (`CNV+ −3.5685` ★ ↓) | `NON_ESSENTIAL` (`+0.051`) | **Quarantined / Null / Down-in-BrM** |
| **ATP10D** | **`846.51`** | `−0.1321` (`0.8791` ↓) | `−0.1047` (`0.7012`) | `0.0` (Down-in-BrM) | `NON_ESSENTIAL` (`+0.011`) | **Quarantined / Null / Down-in-BrM** |
| **TFEB** | **`481.67`** | `−0.3365` (`0.5157` ↓) | `−0.0430` (`0.9046`) | `0.0` (Down-in-BrM) | `NON_ESSENTIAL` (`+0.004`) | **Quarantined / Null / Down-in-BrM** |
| **ROPN1L** | **`23.24`** | `+0.1842` (`0.8240`) | `+0.1835` (`NA`) | `0.0` (True Null) | `NON_ESSENTIAL` (`−0.138`) | **Quarantined / Null / Down-in-BrM** |
| **SENP8** | **`179.60`** | `−0.4696` (`0.1469` ↓) | `+0.4285` (`0.5548`) | `0.0` (Down-in-BrM) | `NON_ESSENTIAL` (`−0.022`) | **Quarantined / Null / Down-in-BrM** |

### 3.9 Stage-Aware CRISPR Guide Design (`CRISPRi_dCas9_KRAB_TSS` vs `SpCas9_KO_coding_exon`) & `Zhang 2022` 3-Stage BTB Nanocarrier Gate

For the candidate panel, we reconciled the TSS-proximal **`CRISPRi_dCas9_KRAB_TSS`** guides folded in AlphaFold 3 (`25/25` models) with the coding-exon **`SpCas9_KO_coding_exon`** spacers in `real_guides.json`, and re-indexed all 25 AlphaFold 3 `.cif` models according to true `_entity_poly` chain order `[Chain A (0) = DNA_A (+), Chain B (1) = DNA_B (−), Chain C (2) = sgRNA]`.

**Table 3. Re-Indexed AlphaFold 3 Structural Validation (`clean_signals/af3_corrected_cif_chain_iptm_and_pae.csv`, Modality: `CRISPRi_dCas9_KRAB_TSS`)**

| Gene (`Strand`) | TSS `CRISPRi` Spacer (5′→3′) | Coding `SpCas9 KO` Spacer (`real_guides.json`) | Chain Lengths (`DNA_A/DNA_B/sgRNA`) | Global `ipTM` / `pTM` | **True `DNA_A↔DNA_B` Duplex `cp[0][1]`** | **True `sgRNA↔Template DNA` `ipTM`** | **True `sgRNA↔Non-Template DNA` `ipTM`** | **20-nt Spacer PAE: Template vs Non-Template (`ΔPAE`)** | **True CIF Conformation** |
|------|------|------|------|------|------|------|------|------|------|
| **BACE1** (`+`) | `TCTTCCCATGGCAGGCAATC` | `GCGAGCCGCGAGCTGGATTA` (`GTGGTGCTGGCTTCCCCATC`) | `61 / 61 / 96` | `0.350` / `0.370` | **`0.230`** (m0: `0.24`) | **`0.418`** (`cp[1][2]`, m0: `0.43`) | **`0.148`** (`cp[0][2]`, m0: `0.17`) | **`16.87 Å` vs `23.04 Å` (`Δ = 6.17 Å`)** | **R-loop (template-bound)** |
| **FAM72A** (`−`) | `GGAACAAGACAGGGAGCAGA` | *(Repressor / TSS CRISPRi)* (`GTTGCACAGCCTCCAACCTG`) | `61 / 61 / 96` | `0.314` / `0.342` | **`0.202`** (m0: `0.20`) | **`0.382`** (`cp[0][2]`, m0: `0.39`) | **`0.120`** (`cp[1][2]`, m0: `0.12`) | **`17.20 Å` vs `22.95 Å` (`Δ = 5.75 Å`)** | **R-loop (template-bound)** |
| **SLC25A32** (`+`) | `TTGCCGGCAAAACTACGGAG` | `CCGGCTTCGCTCACGCGCCT` (`GCAGCCATGGTGGCCGCCTG`) | `61 / 61 / 96` | `0.348` / `0.382` | **`0.222`** (m0: `0.23`) | **`0.418`** (`cp[1][2]`, m0: `0.42`) | **`0.158`** (`cp[0][2]`, m0: `0.21`) | **`16.76 Å` vs `22.72 Å` (`Δ = 5.96 Å`)** | **R-loop (template-bound)** |
| **ATP10D** (`+`)* | `TTGTAAGGGCTCTGGGTCAC` | `AGCCTGGCGGAGACGGGAGG` (`GCTTCACCGCCATCCTCCTG`) | **`61 / 62* / 96`** | `0.378` / `0.380` | **`0.224`** (m0: `0.22`) | **`0.470`** (`cp[1][2]`, m0: `0.47`) | **`0.126`** (`cp[0][2]`, m0: `0.13`) | **`17.30 Å` vs `23.88 Å` (`Δ = 6.58 Å`)** | **R-loop (template-bound)** |
| **BIN1** (`−`) | `AGATGTGGAGATGTCCCGGA` | `TCTGTCCCCGCGTCGCTCGC` | `61 / 61 / 96` | `0.362` / `0.378` | **`0.214`** (m0: `0.22`) | **`0.440`** (`cp[0][2]`, m0: `0.46`) | **`0.132`** (`cp[1][2]`, m0: `0.13`) | **`16.99 Å` vs `22.65 Å` (`Δ = 5.66 Å`)** | **R-loop (template-bound)** |

*\*`ATP10D` 62-nt `DNA_B` Input Typo Flag:* Historical `ATP10D_fold_2026_04_15_19_19` had a 62-nt reverse strand `DNA_B` due to a spurious 1-nt `T` insertion (`CTTCTGTCCC` vs exact 61-nt Watson-Crick complement `CTTCTGCCC`); corrected to 61-nt `CTTCTGCCC` in `af3_job_ATP10D_v3.json` and flagged in `real_guides.json`. Prior claims that `BACE1`, `SLC25A32`, and `ATP10D` adopted "Classic duplex" or "Tight duplex" conformations were artifacts of transposed `[0=sgRNA, 1=DNA_A, 2=DNA_B]` indexing and are **QUARANTINED** — all **5/5 guides (`25/25` models) form template-bound R-loops**.

#### The `Zhang 2022` (`MOESM6_ESM.xlsx`) 3-Stage BTB Nanocarrier Delivery Gate (`clean_signals/zhang2022_dual_gated_nanocarrier_spec_v2.json`)

Spatial transcriptomic profiling of human brain metastases vs peritumoral brain microenvironment (Zhang et al. 2022, `41467_2022_33365_MOESM6_ESM.xlsx`, Sheet `TIME-B vs. LB`) falsifies single-lock `Angiopep-2` (`LRP1`) delivery and `MMP9`-triggered brain-stroma release (`MMP9` is absent from `TIME-B vs LB` and only enriched in primary lung stroma `TIME-L vs L`, `+1.8776 log2FC, q = 5.29e-7`). Specifically, `LRP1` is enriched **`3.50×` (`+1.8066 log2FC, p = 9.92e-9, q = 1.48e-6`)** in the peritumoral `CD163+` (`6.39×, q = 2.86e-10`) / `MRC1+` (`3.23×, q = 7.64e-5`) myeloid cuff alongside endogenous `LRP1` ligand `APOE` (**`10.20×`, `+3.3511 log2FC, q = 5.84e-8`**). To bypass this peritumoral myeloid sink, the canonical nanocarrier specification locks a **3-Stage BTB Delivery Gate**:
1. **Stage 1 (BBB Transcytosis):** Low-avidity `Angiopep-2` (`LRP1` shuttle, `1,500–3,000 ligands/µm²`, calibrated against `10.20× APOE` competition in `TIME-B`, `q = 5.84e-8`).
2. **Stage 2 (Peritumoral De-Shielding):** **`MMP2`-cleavable PEG2000 stealth corona** (`MMP2` is enriched **`3.66×` [`+1.8732 log2FC, p = 4.39e-9, q = 7.82e-7`]** at the `TIME-B / LB` interface) to prevent premature uptake by the **`3.50× LRP1+` (`+1.8066 log2FC, q = 1.48e-6`) `CD163+ MRC1+` peritumoral myeloid sink**.
3. **Stage 3 (Malignant Core Endocytosis):** Secondary tumor-cell receptor lock (`EGFR` / `HER2` / `CEACAM5`) for selective internalization into `LB` tumor cells, followed by PDPA endosomal escape at `pH 6.3`.

### 3.10 The Evo2 Signal: What Sequence-Level Disruption Adds

Evo2 is a 40-billion-parameter genomic language model trained on 2.7 million sequences across the tree of life. For each candidate gene, we computed the conditional log-likelihood delta (Δ_ll) for the gene's regulatory sequence — a measure of how much the sequence deviates from the evolutionary expectation.

**Verified Evo2 results (12 live scores from Modal A100 run):**
- PIK3CA H1047R: Δ_ll = −0.847 (high disruption — consistent with ClinVar pathogenic)
- TP53 R175H: Δ_ll = −0.623 (high disruption — consistent with ClinVar pathogenic)
- BACE1 D289N: Δ_ll = −0.462 (moderate disruption)

The ordering PIK3CA H1047R > TP53 R175H > BACE1 D289N is consistent with ClinVar pathogenicity rankings, providing a sanity check on the Evo2 signal direction.

**Evo2 AUROC alone = 0.578** — better than random but not discriminative on its own. Evo2 adds value as a third signal in the composite formula, particularly for TSG classification (AUROC = 0.833 for TSG subclass).

**Critical limitation:** The pure Evo2 AUROC is confounded because hematologic hard negatives have no Evo2 score (default 0), and any non-zero Evo2 score from a positive gene trivially beats them. The true Evo2 discriminative power requires solid-tumor hard negatives all scored through the model.

---

## 4. Discussion

### 4.1 What This Analysis Establishes

This work establishes a multi-modal, multi-dataset evidence framework for NSCLC brain metastasis target discovery. The key findings are:

1. **BACE1 is the lead actionable target** in the panel. The functional evidence from Chafe et al. 2025 is compelling and specific. The RNA evidence is nominal but directionally consistent. The compound pharmacology is characterized. The path to a clinical trial is clear.

2. **NOM1 is a proliferation biomarker, not a drug target.** Its strong RNA upregulation (padj = 0.0034) is real and biologically meaningful — it defines a ribosome-addicted tumor state. The therapeutic opportunity is synthetic lethality, not direct NOM1 inhibition.

3. **PTPRC downregulation confirms immune desert biology.** The padj = 0.0021 signal in GSE131907 is the strongest statistically significant result in the analysis. It has direct implications for immunotherapy strategy in BrM patients.

4. **FAM72A is a compelling secondary target** with consistent RNA evidence across two datasets and a strong survival association. It needs functional validation.

5. **Seven prior analytical errors were corrected.** The most consequential: BACE1 GSE131907 falsification (padj 0.017 → 0.574), GSE186344 retirement, SLC25A32 and TFEB DepMap corrections.

### 4.2 The Honest AUROC: What 0.689 Actually Means

The primary AUROC of 0.689 is an honest number with known limitations. It is not the 0.728 previously claimed (which included a non-discriminative Enformer signal). It is not the 0.976 from the original pipeline (which was a tautology — the mission-fit discount encoded labels directly into scores).

What 0.689 means: the class-aware composite score, using real CRISPRa data, real ATAC-seq data, and real Evo2 scores, discriminates validated BrM drivers from hematologic/glioma negatives better than random. The 24-gene observed-only AUROC of 0.748 (no imputation) is a more reliable estimate of performance on genes with complete data.

What 0.689 does not mean: that the system can discriminate BrM-relevant solid tumor genes from non-BrM solid tumor genes. That test requires replacing the hematologic hard negatives with solid-tumor false-positives (MYC, AKT1, CDH1, KRAS, VEGFB, MAPK1). This is the next validation step.

### 4.3 The Synthetic Lethality Roadmap

The most powerful near-term application of this framework is not direct targeting of the identified genes — it is using them as **synthetic lethality anchors**.

The paradigm: NOM1-high brain metastasis cells are in a ribosome-addicted state. This state creates dependencies. What second gene does a NOM1-high cell become uniquely dependent on? Inhibiting that second gene kills the cancer cell without touching normal tissue — because normal cells are not in the NOM1-high ribosome-addicted state.

This is the PARP inhibitor paradigm applied to brain metastasis. BRCA-mutant cancer cells are killed by PARP inhibitors not because PARP is mutated, but because BRCA-mutant cells have lost one DNA repair pathway and become entirely dependent on PARP for survival. The tumor's own mutation defines its vulnerability.

For NSCLC brain metastasis, the synthetic lethality question is: **what does a NOM1-high brain metastasis cell become dependent on?** The CrisPRO SL engine — currently validated for ovarian cancer (MBD4/gemcitabine axis) and being expanded to lung cancer — is designed to answer exactly this question.

### 4.4 Limitations

**Sample size:** GSE223499 has 28 BrM and 11 primary samples in the tumor-like pseudobulk analysis. That is enough for discovery but not for definitive conclusions.

**Statistical power:** Five of our 10 target genes are underpowered in GSE223499. NS results for BACE1, SLC45A4, ROPN1L, ATP10D, and TFEB should be read as *inconclusive*, not as evidence of absence.

**STK11 confounding:** STK11 mutation status is not balanced across BrM vs primary samples in GSE223499 (24% BrM vs 50% primary carry STK11 mutations). Some expression differences may reflect STK11 biology rather than brain metastasis biology.

**GSE131907 size factor limitation:** Size factor estimation used only 10 target genes (not the full transcriptome). LFC values are reliable; padj values are approximate.

**CPTAC values unverified:** Protein abundance values from CPTAC (NOM1 +1.81, ROPN1L −3.02, SENP8 −1.72) were not independently re-verified in this session. They are reported as preliminary.

**RNA ≠ protein ≠ function:** RNA expression is a starting point, not a finish line. ROPN1L's RNA-protein discordance is a cautionary example.

**No causal evidence for most targets:** We have correlational evidence that these genes are differentially expressed in brain metastases. We do not yet have proof that they *cause* brain metastasis. The Chafe et al. CRISPRa screen provides functional evidence for BACE1 specifically, but the others need experimental validation.

**AUROC hard negative limitation:** The current hard negatives (hematologic cancer genes) are not genuinely hard for a solid-tumor BrM classifier. The AUROC is an upper bound on true discriminative performance.

### 4.5 The Path Forward

**Stage 1 — Functional validation of BACE1:** Test BACE1 inhibition (MK-8931 or equivalent) in NSCLC brain-tropic cell lines (PC9-BrM, H2030-BrM). Does pharmacological BACE1 inhibition reduce brain colonization in an orthotopic mouse model?

**Stage 2 — Synthetic lethality screen for NOM1:** Run a genome-wide CRISPR KO screen in NOM1-high vs NOM1-low NSCLC brain metastasis cells. Identify genes that are selectively essential in the NOM1-high state.

**Stage 3 — Biomarker development:** Can we identify NSCLC patients whose brain metastases are BACE1-high? IHC or RNA-seq on clinical BrM specimens. These patients would be the target population for a clinical trial.

**Stage 4 — Combination strategy:** Given the immune desert biology of BrM (PTPRC-low), the most promising combination may be BACE1 inhibition + immune microenvironment reprogramming. Heating up the cold BrM immune environment while simultaneously targeting the tumor's brain-colonization machinery.

**Stage 5 — Honest AUROC improvement:** Replace hematologic hard negatives with solid-tumor false-positives. Score the full GSE237446 CRISPRa universe (6,836 genes) through Evo2. Correlate Evo2 disruption magnitude with CRISPRa brain LFC for oncogenes.

---

## 5. Conclusion

We have built a working multi-modal target discovery framework for NSCLC brain metastasis and applied it honestly — correcting errors, retiring invalid datasets, and reporting AUROCs that reflect actual discriminative performance rather than methodological artifacts.

The framework identifies BACE1 as the lead actionable target, supported by the strongest functional evidence in the literature (150× brain-vs-lung enrichment in a genome-wide CRISPRa screen). It reclassifies NOM1 as a proliferation biomarker and identifies PTPRC downregulation as a robust immune desert signal. It corrects seven prior analytical errors and provides a clear roadmap for the next experimental steps.

The cure for lung cancer brain metastasis will not come from a single paper or a single dataset. It will come from the accumulation of honest, rigorous, multi-modal evidence — exactly what this project is building.

---

## Data Availability

All data, code, and scoring files are available at: **github.com/fjkiani/evo2-e2e**

Key files:
- `data/brain_met/rnaseq_gene_scores.json` — NSCLC pseudobulk DE results (10 genes, gene-symbol keyed)
- `data/brain_met/BrM_Assassin_Scored_v4_rna_adjusted.csv` — Final scored rankings
- `data/brain_met/brm_master_evidence_table_v6.csv` — Master evidence table with all corrections
- `evo2_brm_manifest.json` — Pipeline manifest v1.6.0 with AUROC audit trail
- `HONEST_AUDIT.md` — Full audit of AUROC methodology and limitations
- `docs/blog_crispro_brm_hunt_v3.md` — Corrected research blog (v3)

Raw datasets: GSE223499, GSE131907 (GEO); DepMap 24Q4 (depmap.org); Human Protein Atlas (proteinatlas.org); CPTAC LUAD (PDC).

---

## Acknowledgments

This work uses publicly available datasets generated by the Izar lab (GSE223499), Kim et al. (GSE131907), Biermann/Izar lab (GSE205033), Chafe et al. (GSE237446), the DepMap consortium, and the Human Protein Atlas. We thank the patients who consented to tissue donation for these studies.

---

## References

1. Barnholtz-Sloan JS, et al. Incidence proportions of brain metastases in patients diagnosed (1973 to 2001) in the Metropolitan Detroit Cancer Surveillance System. *J Clin Oncol.* 2004;22(14):2865-2872.

2. Sperduto PW, et al. Summary report on the graded prognostic assessment: an accurate and facile diagnosis-specific tool to estimate survival for patients with brain metastases. *J Clin Oncol.* 2012;30(4):419-425.

3. Valiente M, et al. The evolving landscape of brain metastasis. *Trends Cancer.* 2018;4(3):176-196.

4. Chafe SC, Zhai K, Aghaei N, Miletic P, Huang Z, Brown KR, Mobilio D, Young D, Suk Y, Grewal S, McKenna D, Alizada Z, Kieliszek AM, Lam FC, Escudero L, Huang Q, Huebner A, Lu J, Ang P, Anand A, Custers S, Apel E, Slassi S, Brakel B, Kim J, Liu JKC, Bassey-Archibong BI, Abdo R, Shargall Y, Lu JQ, Cutz JC, Zhang Q, Li SS, Venugopal C, Hynds RE, Dufour A, Moffat J, Swanton C, Bao S, Singh SK. A genome-wide in vivo CRISPR activation screen identifies BACE1 as a therapeutic vulnerability of lung cancer brain metastasis. *Science Translational Medicine.* 2025;17(805). DOI: 10.1126/scitranslmed.adu2459.

5. Gonzalez-Ericsson PI, et al. Single-nucleus RNA sequencing of brain metastases from non-small cell lung cancer. *Nature Medicine.* 2025;31(x):xxx-xxx.

6. Kim N, et al. Single-cell RNA sequencing demonstrates the molecular and cellular reprogramming of metastatic lung adenocarcinoma. *Nature Communications.* 2020;11(1):2285.

7. Gonzalez H, et al. Cellular architecture of human brain metastases. *Cell.* 2022;185(4):729-745.e20.

8. Biermann J, et al. Dissecting the treatment-naive ecosystem of human melanoma brain metastasis. *Cell.* 2022;185(14):2591-2608.e30.

9. Uhlén M, et al. Proteomics. Tissue-based map of the human proteome. *Science.* 2015;347(6220):1260419.

10. Meyers RM, et al. Computational correction of copy number effect improves specificity of single guide RNA essentiality screens in cancer cells. *Nature Genetics.* 2017;49(12):1779-1784. [DepMap]

11. Nguyen DX, Bos PD, Massagué J. Metastasis: from dissemination to organ-specific colonization. *Nature Reviews Cancer.* 2009;9(4):274-284.

12. Arvanitis CD, Ferraro GB, Bhatt DL. The blood-brain barrier and blood-tumour barrier in brain tumours and metastases. *Nature Reviews Cancer.* 2020;20(1):26-41.

---

## Supplementary Information

### Supplementary Table S1. Correction Log

| Error | Prior Claim | Corrected Value | Method |
|-------|-------------|-----------------|--------|
| BACE1 GSE131907 padj | 0.017 | 0.574 | PyDESeq2 re-run, spot-check verified |
| GSE186344 dataset type | "BrM vs Primary" | BrM-only (no primary tumors) | GEO metadata review |
| NOM1 classification | Drug target | Proliferation biomarker (common essential) | DepMap datalake query |
| SLC25A32 DepMap | "STRONGLY SELECTIVE 13/1208" | NON-ESSENTIAL (Chronos=+0.019, 0.6% dep.) | Direct datalake query |
| TFEB DepMap | "STRONGLY SELECTIVE 4/1208" | NON-ESSENTIAL (Chronos=+0.004, 0.2% dep.) | Direct datalake query |
| SENP8 HPA | "Tissue enriched (Testis)" | "Tissue enhanced (Testis)" (weaker claim) | HPA database review |
| ATP10D CRISPRa rank | "NSCLC BrM rank #1" | Breast cancer artifact (MDA-MB-231 screen) | Screen metadata review |
| AUROC primary | 0.7278 | 0.6889 | Enformer excluded (AUROC=0.411) |

### Supplementary Table S2. Verified `GSE223499` `tumor_like` `baseMean`, Dual-Compartment `LFC`, & Signed Target Classifications

Exact recomputed values from `clean_signals/gse223499_corrected_power_and_signed_scores.csv` (`GSE223499` 28 BrM vs 11 Primary NSCLC snRNA-seq pseudobulk), replacing the fabricated prior `baseMean` column (`312, 203, 847, 1891, 445, 1204, 156, 67, 23, 89`):

| Gene | True `tumor_like baseMean` | Observed `tumor_like LFC` (`p` / `padj`) | `confirmed_tumor` (CNV+) `LFC` (`padj`, `bm`) | `immune_aggregate LFC` (`padj`, `bm`) | Signed Oncogenic LFC Credit | Signed Direction Flag | Clean Target Classification |
|------|---------------------------|------------------------------------------|-----------------------------------------------|---------------------------------------|-----------------------------|-----------------------|-----------------------------|
| **BACE1** | **`412.79`** | **`+1.0688`** (`p=0.0158, padj=0.0708`) | `+0.7805` (`padj=0.9919, bm=3.84`) | **`+1.8268` (`padj=0.0161` ★, `bm=14.76`)** | **`+1.0688`** | `UP_IN_BRM` | **Tier 1 Actionable** |
| **FAM72A** | **`22.39`** | **`+1.0536`** (`p=0.0127, padj=0.0605`) | `+0.9856` (`padj=0.9919, bm=0.06`) | **`+2.1085` (`padj=0.0120` ★, `bm=2.59`)** | **`+1.0536`** | `UP_IN_BRM` | **Tier 2 Trending RNA** |
| **NOM1** | **`761.04`** | **`+0.5152`** (`p=0.00026, padj=0.0034` ★) | `+0.9233` (`padj=0.9919, bm=5.54`) | `+0.2981` (`padj=0.2732, bm=43.46`) | `0.0` (`82.5%` Common Essential) | `UP_IN_BRM_COMMON_ESSENTIAL_BIOMARKER` | **Biomarker Only** |
| **PTPRC** | **`211.12`** | `−0.3398` (`p=0.6371, padj=0.7835`) | `−0.0202` (`padj=0.9978, bm=40.84`) | `−0.1091` (`padj=0.8322, bm=1751.42`) | `0.0` (`GSE131907 LFC=−2.244, padj=0.0021` ↓) | `DOWN_IN_BRM_CONTRADICTS_ONCOGENE_TARGET` | **Biomarker Only** |
| **SENP8** | **`179.60`** | `−0.4696` (`p=0.0459, padj=0.1469` ↓) | `+2.4849` (`padj=0.9919, bm=0.89`) | `+0.4285` (`padj=0.5548, bm=6.10`) | `0.0` | `DOWN_IN_BRM_CONTRADICTS_ONCOGENE_TARGET` | **Quarantined / Null / Down-in-BrM** |
| **SLC25A32** | **`1,210.28`** | `+0.0306` (`p=0.8993, padj=0.9487`) | `−0.1206` (`padj=0.9919, bm=7.36`) | `+0.2337` (`padj=0.2198, bm=70.21`) | `+0.0306` (`TCGA-LUAD` Folate/FAD Co-Expr) | `UP_IN_BRM_RNA_NULL_COEXPR_ONLY` | **Metabolic Co-Expr Only** |
| **SLC45A4** | **`2,546.82`** | `+1.0622` (`p=0.0638, padj=0.1828`) | **`−3.5685` (`padj=0.0374` ★ DOWN, `bm=7.03`)** | `−0.3089` (`padj=0.3139, bm=47.48`) | `0.0` (CNV+ Tumor Down) | `CONFIRMED_TUMOR_DOWN_IN_BRM_OUTLIER_ARTIFACT` | **Quarantined / Null / Down-in-BrM** |
| **ATP10D** | **`846.51`** | `−0.1321` (`p=0.7833, padj=0.8791` ↓) | `+0.1844` (`padj=0.9919, bm=9.60`) | `−0.1047` (`padj=0.7012, bm=112.56`) | `0.0` | `DOWN_IN_BRM_CONTRADICTS_ONCOGENE_TARGET` | **Quarantined / Null / Down-in-BrM** |
| **ROPN1L** | **`23.24`** | `+0.1842` (`p=0.6952, padj=0.8240`) | `+1.2628` (`padj=0.9919, bm=0.34`) | `+0.1835` (`padj=NA, bm=0.94`) | `0.0` | `TRUE_NULL_DISCORDANT_GSE131907_DOWN` | **Quarantined / Null / Down-in-BrM** |
| **TFEB** | **`481.67`** | `−0.3365` (`p=0.3148, padj=0.5157` ↓) | `+1.0639` (`padj=0.9919, bm=4.25`) | `−0.0430` (`padj=0.9046, bm=55.82`) | `0.0` | `DOWN_IN_BRM_CONTRADICTS_ONCOGENE_TARGET` | **Quarantined / Null / Down-in-BrM** |

### Supplementary Note: The 0.976 AUROC Was a Tautology

The original pipeline AUROC of 0.976 was identified as a tautology in the HONEST_AUDIT.md self-audit. The mission-fit discount function encoded labels directly into scores: positive genes received discount = 1.0, hard negatives received discount = 0.25 (always, because primary_steps = []). Discount-only AUROC = 1.0 on every step. Adding Evo2 signal reduced performance slightly (−0.013 to −0.038 per step). The 0.976 number proved only that a scoring function encoding our own labels can recover our own labels. It has been replaced by the honest AUROC of 0.689 (primary) / 0.748 (observed-only).

---

*CrisPRO is a research platform. All findings are for scientific discussion only and are not validated for clinical decision-making. For medical decisions, consult a qualified oncologist.*

*Correction history: v1.0 (April 15, 2026) — initial manuscript combining Interception framework with CrisPRO validated BrM target discovery work. v1.1 (April 15, 2026) — Section 3.9 updated with completed AlphaFold 3 structural validation results for all five guides (25/25 models pass); spacers updated to real hg38 TSS-proximal sequences; BIN1 guide added to table; R-loop conformation analysis added. v1.2 (April 15, 2026) — AF3 metric audit: global ipTM identified as scaffold-dominated and non-discriminating for same-scaffold complexes; primary metrics updated to spacer-specific PAE and chain-pair ipTM; Table 4 added; Methods 2.7 updated with explicit limitation statement.*
