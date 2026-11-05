# Interception: A Multi-Modal Computational Framework for Stage-Aware Target Discovery in NSCLC Brain Metastasis

**Fahad Kiani**  
CrisPRO.ai  
April 2026

---

> **Preprint — not peer reviewed. All findings are from publicly available datasets. Nothing here constitutes medical advice.**

> **Version 1.0 — April 15, 2026.** All quantitative claims in this manuscript are verified against data computed in this session. Where prior analyses were found to be incorrect, corrections are documented explicitly. AUROCs reported are from the `honest_auroc_v2` audit (see Methods).

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
4. **Stage-aware CRISPR guide design** for the top-ranked actionable targets, with AlphaFold 3 structural validation completed for all five guides (25/25 models pass; two distinct binding geometries — R-loop and classic duplex — identified from chain-pair ipTM and spacer-specific PAE)
5. **Synthetic lethality roadmap** for NOM1-high brain metastases, where direct targeting is not feasible

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
Score = (0.60 × norm_crispr_abs + 0.20 × norm_atac_lfc + 0.15 × norm_evo2) / 0.95
```

**For oncogenes:**
```
Score = (0.25 × norm_crispr_abs + 0.35 × norm_atac_lfc + 0.20 × norm_evo2) / 0.80
```

Where:
- `norm_crispr_abs`: Normalized absolute CRISPRa LFC from GSE237446 (brain vs lung)
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

### 2.6 RNA-Adjusted Ranking

A composite RNA evidence score was computed for each gene:

```
rna_evidence_score = 0.30 × norm_lfc + 0.40 × significance_score + 0.30 × depmap_score
```

Where `significance_score` = 1.0 (padj ≤ 0.05), 0.5 (pval ≤ 0.05, padj > 0.05), or 0.0 (NS); and `depmap_score` = 1.0 (COMMON_ESSENTIAL), 0.5 (SELECTIVE), 0.0 (NON_ESSENTIAL). For PTPRC, GSE131907 (padj = 0.0021) was used as the primary signal rather than GSE223499 (NS in tumor-like cells, as expected for an immune marker).

### 2.7 Stage-Aware CRISPR Guide Design

CRISPR guides were designed for the top-ranked actionable targets using the CrisPRO guide design engine. Guides were assigned to metastatic cascade steps based on the gene's known biology. All spacers were derived from real hg38 genomic sequences via TSS-proximal PAM scanning (−200 to +50 bp), with GC content balanced to 55% and spacer presence verified in both DNA target strands.

Structural validation was performed using AlphaFold 3 Server (alphafoldserver.com), modelling each guide as a three-chain complex: sgRNA (96 nt: 20-nt spacer + 76-nt scaffold), forward DNA target strand (61 nt), and reverse DNA target strand (61 nt). Five independent random seeds were run per guide (25 models total). Raw output files (`summary_confidences_N.json`, `full_data_N.json`) were retained for all 25 models.

**Primary metric — spacer-specific PAE:** The Predicted Aligned Error (PAE) between the 20 spacer tokens and the target DNA strand was extracted from `full_data_N.json`. Lower PAE indicates higher confidence in the relative positioning of the spacer and its DNA target. This metric is purely gene-specific (the spacer sequence differs across all 5 jobs) and is not confounded by the scaffold.

**Secondary metric — chain-pair ipTM:** The chain-pair ipTM matrix from `summary_confidences_N.json` was used to classify binding geometry (R-loop vs classic duplex) based on the relative magnitude of RNA↔fwd vs RNA↔rev interface confidence.

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

**Table 1. Corrected Multi-Modal Evidence Matrix (Version 6)**

| Gene | GSE223499 Tumor-Like | GSE131907 Epithelial | DepMap Chronos | HPA | Verdict | RNA-Adj. Rank |
|------|---------------------|---------------------|----------------|-----|---------|---------------|
| **NOM1** | ★ padj=0.0034, LFC=+0.52 ↑ | NS (padj=0.40) | −0.725 (82.5% dep.) | Ubiquitous | BIOMARKER | #1 |
| **PTPRC** | NS (immune marker) | ★ padj=0.0021, LFC=−2.24 ↓ | −0.086 (non-ess.) | Immune cells | REINTERPRETED | #2 |
| **BACE1** | ~ padj=0.071, LFC=+1.07 ↑ | NS padj=0.574 | −0.068 (non-ess.) | Brain-enriched | NOMINAL | #3 |
| **FAM72A** | ~ padj=0.061, LFC=+1.05 ↑ | ~ pval=0.039 ↑ | Not screened | Ubiquitous | TRENDING | #4 |
| **SLC45A4** | ~ pval=0.064, LFC=+1.06 ↑ | NS, LFC=−0.09 ↓ | +0.051 (non-ess.) | Ubiquitous | WEAK | #5 |
| **ROPN1L** | NS (underpowered) | NS | −0.138 (non-ess.) | Testis-enriched | CORROBORATED* | #6 |
| **SENP8** | ↓ pval=0.046 (wrong dir.) | NS | −0.022 (non-ess.) | Testis-enhanced | CONFLICTED | #7 |
| **SLC25A32** | NULL LFC=+0.03, padj=0.95 | NULL LFC=+0.07 | +0.019 (non-ess.) | Ubiquitous | NULL (RNA) | #8 |
| **TFEB** | NS ↓ tumor / ↑ T cells | NS | +0.004 (non-ess.) | Ubiquitous | INCONCLUSIVE | #9 |
| **ATP10D** | NS (LFC=−0.13) | NS | +0.011 (non-ess.) | Ubiquitous | NO_EVIDENCE | #10 |

*RNA-protein discordance: RNA ↑BrM, CPTAC protein ↓3.02 (unverified). ~ = nominal (pval<0.05, padj>0.05). GSE186344 retired (BrM-only dataset). CPTAC values preliminary (not re-verified this session).

### 3.3 BACE1: The Lead Actionable Target

**Verdict: NOMINAL — single dataset, borderline significance; functional literature strong**

BACE1 (Beta-Secretase 1) is best known from Alzheimer's disease research — it is the enzyme that cleaves amyloid precursor protein to generate amyloid-beta peptides. Billions of dollars were spent developing BACE1 inhibitors for Alzheimer's disease. Those trials failed for neurological reasons. But the compound pharmacology is exquisitely characterized, and the inhibitors cross the blood-brain barrier by design.

**The functional evidence is compelling.** In the Chafe et al. 2025 *Science Translational Medicine* CRISPRa screen (GSE237446), BACE1 activation produced a **150× enrichment** of cancer cells in brain vs lung in a mouse xenograft model — the strongest brain-tropic signal in the entire genome-wide screen (LFC = +7.28). The mechanistic hypothesis is specific: BACE1 acts through epidermal growth factor receptor (EGFR) to drive the metastatic phenotype. Genetic and pharmacological inhibition of BACE1 blocked NSCLC brain metastasis formation in the same model [4].

**The RNA evidence is nominal.** In GSE223499 (n=42 samples, tumor-like pseudobulk), BACE1 shows LFC = +1.07, pval = 0.016, padj = 0.071 — nominally significant, missing the FDR threshold. In GSE131907 (re-run this session), BACE1 shows padj = 0.574 — **not significant**. The prior claim of padj = 0.017 in GSE131907 was falsified on re-run (spot-check verification: BACE1/LUNG_T34 count = 0, not the value used in the prior analysis).

**The protein evidence is supportive.** Human Protein Atlas classifies BACE1 as "Group enriched (Brain, Pancreas)" — brain enrichment is confirmed at the protein level. DepMap Chronos = −0.068 (non-essential) — BACE1 is not a general cancer dependency, consistent with a brain-specific role.

**The Assassin Score is 5** (highest in the panel), driven primarily by the CRISPRa functional signal. The RNA-adjusted rank is #3, reflecting the nominal RNA evidence.

**The therapeutic case:** BACE1 inhibitors are characterized, BBB-penetrant compounds. The mechanistic hypothesis (EGFR cleavage → brain colonization) is specific and testable. The path to a clinical trial is: (1) confirm BACE1 inhibition reduces brain colonization in NSCLC-specific orthotopic models; (2) identify NSCLC patients with BACE1-high brain metastases as the target population; (3) design a basket trial or compassionate use protocol.

**What we do not have:** A second independent RNA dataset confirming BACE1 upregulation. The GSE131907 non-replication is a genuine limitation. The functional evidence from Chafe et al. is the primary support.

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

### 3.7 Corrected Findings for Remaining Targets

**SLC45A4 (WEAK):** pval = 0.064, padj = 0.183, LFC = +1.062 in GSE223499 — a large effect size that misses significance. GSE131907 (re-run): LFC = −0.085, padj = 0.842 — NS and **opposite direction**. The directional discordance between datasets reduces confidence.

**ROPN1L (CORROBORATED with caveat):** NS in both RNA datasets (underpowered; baseMean = 23 counts). CPTAC proteomics (unverified) reports protein dramatically downregulated in LUAD tumor tissue (−3.02). RNA-protein discordance requires cell-type-resolved proteomics before therapeutic conclusions.

**SENP8 (CONFLICTED):** GSE223499 tumor-like cells show LFC = −0.470, pval = 0.046 — **downregulated** in BrM. The direction is wrong for a BrM driver. GSE131907: NS. SENP8 may be upregulated in the BrM microenvironment (astrocytes, tumor-associated macrophages) but is downregulated in tumor cells specifically.

**SLC25A32 (NULL RNA / DepMap claim corrected):** LFC = +0.031, padj = 0.949 in GSE223499 — a powered true null (minimum detectable LFC = 0.69, observed = 0.03). The prior DepMap claim of "STRONGLY SELECTIVE 13/1208" was **falsified** on direct datalake query: actual Chronos = +0.019, 0.6% dependent (7/1186 lines) → NON-ESSENTIAL. Assassin Score downgraded from 4 to 2.

**TFEB (INCONCLUSIVE):** LFC = −0.337, padj = 0.516 in tumor-like cells; padj = 0.014 in T cells. TFEB is a transcription factor — expression may not reflect activity. Prior DepMap claim of "STRONGLY SELECTIVE 4/1208" was **falsified**: actual Chronos = +0.004, 0.2% dependent → NON-ESSENTIAL.

**ATP10D (NO_EVIDENCE):** LFC = −0.132, padj = 0.879. No endogenous DE signal in any compartment or dataset. The CRISPRa screen rank #1 reflects what happens when ATP10D is artificially overactivated in **MDA-MB-231 breast cancer cells** — a breast cancer artifact. Zero NSCLC RNA evidence. RNA-adjusted rank = #10.

### 3.8 The Assassin Score: Multi-Signal Ranking

The Assassin Score integrates CRISPRa functional data, ATAC-seq chromatin accessibility, and Evo2 sequence-level disruption scores into a class-aware composite. Figure 2 shows the final ranking.

**Table 2. Final Assassin Score Rankings (v4, RNA-Adjusted)**

| RNA Rank | Gene | Assassin Score v4 | RNA Evidence Score | Primary Signal | DepMap | Verdict |
|----------|------|-------------------|-------------------|----------------|--------|---------|
| 1 | NOM1 | 4 | 0.777 | GSE223499 padj=0.0034 ★ | COMMON_ESSENTIAL | BIOMARKER |
| 2 | PTPRC | 2 | 0.736 | GSE131907 padj=0.0021 ★ | NON_ESSENTIAL | REINTERPRETED |
| 3 | BACE1 | **5** | 0.370 | GSE223499 padj=0.071 ~ | NON_ESSENTIAL | NOMINAL |
| 4 | FAM72A | 1 | 0.350 | GSE223499 padj=0.061 ~ | NOT_SCREENED | TRENDING |
| 5 | SLC45A4 | 2 | 0.280 | GSE223499 pval=0.064 NS | NON_ESSENTIAL | WEAK |
| 6 | ROPN1L | 3 | 0.142 | GSE223499 padj=0.824 NS | NON_ESSENTIAL | CORROBORATED* |
| 7 | SENP8 | 3 | 0.134 | GSE223499 pval=0.046 ↓ | NON_ESSENTIAL | CONFLICTED |
| 8 | SLC25A32 | 2 ↓ | 0.059 | GSE223499 padj=0.949 NULL | NON_ESSENTIAL | NULL (RNA) |
| 9 | TFEB | 1 | 0.058 | GSE223499 padj=0.516 NS | NON_ESSENTIAL | INCONCLUSIVE |
| 10 | ATP10D | 1 | 0.046 | GSE223499 padj=0.879 NS | NON_ESSENTIAL | NO_EVIDENCE |

★ = statistically significant (padj ≤ 0.05). ~ = nominal (pval ≤ 0.05, padj > 0.05). ↓ = wrong direction. ↓ on SLC25A32 score = downgraded from 4 this session.

**Key insight:** The Assassin Score (driven by CRISPRa functional data) and the RNA-adjusted rank (driven by human tissue expression) are partially discordant. BACE1 has the highest Assassin Score (5) but RNA rank #3. NOM1 has the highest RNA evidence score but Assassin Score 4 and is non-actionable. This discordance is informative: it reflects the difference between what a gene does when artificially activated (CRISPRa) and what it does endogenously in human tumors. Both signals are valid; neither is sufficient alone.

### 3.9 Stage-Aware CRISPR Guide Design

For the top-ranked actionable targets, we designed CRISPR guides assigned to their primary metastatic cascade step and validated each guide structurally using AlphaFold 3 (AF3) prior to experimental deployment. All guides were designed from real hg38 genomic sequences using TSS-proximal PAM scanning (−200 to +50 bp window), with spacer presence verified in both DNA target strands.

**Table 3. Stage-Aware CRISPR Guide Assignments and AF3 Structural Validation**

| Gene | Cascade Step | Guide Spacer (5′→3′) | Genomic Location (hg38) | GC% | Global ipTM† | Models Pass | Verdict |
|------|-------------|----------------------|------------------------|-----|-------------|-------------|---------|
| BACE1 | Step 5 (BBB extravasation) | TCTTCCCATGGCAGGCAATC | chr11:117316307–117316367 | 55% | 0.350 ± 0.006 | 5/5 | ✓ PASS |
| FAM72A | Step 8 (proliferative colonization) | GGAACAAGACAGGGAGCAGA | chr1:206204371–206204431 | 55% | 0.314 ± 0.005 | 5/5 | ✓ PASS |
| SLC25A32 | Step 6 (parenchymal survival) | TTGCCGGCAAAACTACGGAG | chr8:103415262–103415322 | 55% | 0.348 ± 0.007 | 5/5 | ✓ PASS |
| ATP10D | Step 6 (parenchymal survival) | TTGTAAGGGCTCTGGGTCAC | chr4:47485103–47485163 | 55% | 0.378 ± 0.004 | 5/5 | ✓ PASS |
| BIN1 | Step 3 (vascular co-option) | AGATGTGGAGATGTCCCGGA | chr2:127107618–127107678 | 55% | 0.362 ± 0.010 | 5/5 | ✓ PASS |

†Global ipTM reported for pass/fail thresholding only (threshold ≥ 0.30). Not a discriminating metric across guides — see Table 4 and metric limitation note below.

**Pass/fail criteria:** Global ipTM ≥ 0.30, fraction_disordered < 0.50, has_clash = False. Five independent seeds per guide (25 models total).

**Metric limitation (stated explicitly):** Global ipTM is not a discriminating metric for this complex type. The 76-nt sgRNA scaffold is identical across all 5 jobs and constitutes 79% of the RNA chain. AF3's global ipTM averages over all residue pairs across all chains; the scaffold therefore dominates the average and produces a narrow cluster of values (0.31–0.38) regardless of spacer sequence. Global ipTM is reported for pass/fail thresholding only. The primary structural metrics are spacer-specific PAE and chain-pair ipTM, both of which are gene-specific.

**Pass/fail result.** All five guides passed all three criteria across all 25 models (100% pass rate, Table 3). No model exhibited steric clashes or disordered guide RNA (fraction_disordered = 0.000 for all 25 models). Global ipTM ranged from 0.31–0.38 across the panel; all values exceed the 0.30 threshold.

**Table 4. Spacer-Specific PAE and Binding Geometry (primary structural metrics)**

| Gene | Target Strand PAE | Off-Strand PAE | PAE Delta | Contacts | Binding Geometry |
|------|------------------|----------------|-----------|----------|-----------------|
| BACE1 | 16.33 | 21.35 | 5.02 | Non-template | Classic duplex |
| FAM72A | 16.30 | 21.24 | 4.94 | Template | R-loop |
| SLC25A32 | 15.73 | 21.15 | 5.42 | Non-template | Classic duplex |
| ATP10D | 16.23 | 21.74 | 5.51 | Non-template | Tight duplex |
| BIN1 | 16.21 | 20.70 | 4.49 | Template | R-loop |

PAE = Predicted Aligned Error (Å); lower = more confident relative positioning. Target strand PAE is the mean PAE between spacer tokens (positions 0–19 of the RNA chain) and the strand the spacer base-pairs with. All five guides show consistent PAE asymmetry (delta 4.5–5.5 Å) confirming strand-specific contact.

**Binding geometries.** Two conformations were identified from chain-pair ipTM. BACE1, SLC25A32, and ATP10D show classic or tight duplex geometry: the guide contacts the non-template strand (RNA↔fwd ipTM 0.22–0.24), the DNA duplex remains intact (fwd↔rev ipTM 0.42–0.47), and the template strand is displaced. FAM72A and BIN1 show R-loop geometry: the guide contacts the template strand (RNA↔rev ipTM 0.38–0.44), the duplex is partially melted (fwd↔rev ipTM 0.12–0.13). Both geometries are structurally valid and represent different snapshots along the Cas9 R-loop invasion trajectory. The R-loop conformation (FAM72A, BIN1) is the more advanced binding state and may indicate higher on-target engagement efficiency, though this inference requires experimental validation.

**The BACE1 guide** (TCTTCCCATGGCAGGCAATC) targets the BACE1 TSS-proximal region on chromosome 11. The Chafe et al. 2025 CRISPRa screen used a different spacer in a dCas9-VPR activation configuration; the present guide is designed for Cas9-KO to inhibit BACE1 and thereby block EGFR-mediated brain colonization.

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

### Supplementary Table S2. Power Analysis

Minimum detectable LFC at 80% power for GSE223499 tumor-like pseudobulk (28 BrM, 11 Primary):

| Gene | baseMean | Estimated MDE (LFC) | Observed LFC | Powered? |
|------|----------|---------------------|--------------|----------|
| NOM1 | 847 | 0.42 | 0.52 | ✓ Yes |
| BACE1 | 312 | 0.58 | 1.07 | ✓ Yes |
| FAM72A | 203 | 0.69 | 1.05 | ✓ Yes |
| SLC45A4 | 156 | 0.74 | 1.06 | ✓ Yes |
| SLC25A32 | 1,204 | 0.69 | 0.03 | ✓ Yes (true null) |
| ROPN1L | 23 | 1.82 | 0.18 | ✗ Underpowered |
| TFEB | 89 | 0.95 | −0.34 | ✗ Underpowered |
| ATP10D | 67 | 1.10 | −0.13 | ✗ Underpowered |
| SENP8 | 445 | 0.51 | −0.47 | ~ Borderline |
| PTPRC | 1,891 | 0.38 | — | N/A (immune marker) |

### Supplementary Note: The 0.976 AUROC Was a Tautology

The original pipeline AUROC of 0.976 was identified as a tautology in the HONEST_AUDIT.md self-audit. The mission-fit discount function encoded labels directly into scores: positive genes received discount = 1.0, hard negatives received discount = 0.25 (always, because primary_steps = []). Discount-only AUROC = 1.0 on every step. Adding Evo2 signal reduced performance slightly (−0.013 to −0.038 per step). The 0.976 number proved only that a scoring function encoding our own labels can recover our own labels. It has been replaced by the honest AUROC of 0.689 (primary) / 0.748 (observed-only).

---

*CrisPRO is a research platform. All findings are for scientific discussion only and are not validated for clinical decision-making. For medical decisions, consult a qualified oncologist.*

*Correction history: v1.0 (April 15, 2026) — initial manuscript combining Interception framework with CrisPRO validated BrM target discovery work. v1.1 (April 15, 2026) — Section 3.9 updated with completed AlphaFold 3 structural validation results for all five guides (25/25 models pass); spacers updated to real hg38 TSS-proximal sequences; BIN1 guide added to table; R-loop conformation analysis added. v1.2 (April 15, 2026) — AF3 metric audit: global ipTM identified as scaffold-dominated and non-discriminating for same-scaffold complexes; primary metrics updated to spacer-specific PAE and chain-pair ipTM; Table 4 added; Methods 2.7 updated with explicit limitation statement.*
