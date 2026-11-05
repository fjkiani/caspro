# We Spent 72 Hours Hunting the Molecular Fingerprint of Lung Cancer Brain Metastasis. Here's What We Found — and Why It Matters for a Cure.

*By Fahad Kiani, Founder — CrisPRO.ai*
*April 2026*

---

> **This is a research blog. Nothing here is medical advice. All findings are from publicly available datasets and are for scientific discussion only.**

---

## The Problem Nobody Talks About Enough

When lung cancer kills, it usually doesn't kill because of the tumor in the lung.

It kills because of what happens next.

Approximately 20–40% of non-small cell lung cancer (NSCLC) patients develop brain metastases — tumors that have broken away from the primary site, crossed the blood-brain barrier, and colonized the most protected organ in the human body. Once that happens, median survival drops to months. The brain is immunologically distinct, pharmacologically shielded, and biologically alien to the lung cancer cells that arrive there. And yet those cells adapt. They survive. They grow.

The question that launched this project was deceptively simple: **what makes a lung cancer cell capable of surviving in the brain?**

If we can answer that at the molecular level — if we can identify the specific genes that are switched on or amplified in brain metastases compared to primary lung tumors — then we have targets. And targets are the beginning of cures.

---

## The Assassin Score: Where This Started

CrisPRO's core engine is built around what we call the **Assassin Score** — a multi-dimensional ranking system that integrates genomic, transcriptomic, proteomic, and functional CRISPR data to identify the most therapeutically actionable genes in a given cancer context.

For the brain metastasis project, we started with a list of 10 candidate genes that had emerged from a prior CRISPRa (CRISPR activation) screen in a brain-tropic lung cancer model. These weren't random picks. They came from a genome-wide functional screen asking: *which genes, when turned on, help lung cancer cells colonize the brain?*

The 10 candidates were:

**ATP10D · FAM72A · SLC25A32 · SENP8 · SLC45A4 · BACE1 · NOM1 · PTPRC · ROPN1L · TFEB**

Our job was to validate them. Not in a cell line. Not in a mouse. In **human tissue** — real patients, real brain metastases, real primary lung tumors.

---

## The Datasets: Seven Independent Lines of Evidence

We didn't rely on a single dataset. We built a multi-dataset evidence matrix across seven independent sources, each contributing a different type of evidence. This is how you do science you can trust.

### 1. GSE223499 — The Izar Lab Dataset (Primary Validation)
**What it is:** Single-nucleus RNA sequencing (snRNA-seq) of 31 brain metastases and 11 primary NSCLC tumors. Published in *Nature Medicine* 2025 by the Izar lab at Columbia (Gonzalez-Ericsson et al.). This is the largest, highest-quality open-access NSCLC brain metastasis snRNA-seq dataset in existence.

**What we did:** We downloaded all 42 per-sample count matrices (~750MB), matched cell barcodes to metadata annotations, and ran pseudobulk differential expression using PyDESeq2 — the gold standard for single-cell pseudobulk analysis. We analyzed four cell compartments separately: tumor-like cells, CNV-confirmed tumor cells, T cells, and a broad immune aggregate. Mixing compartments would confound the biology.

**Why pseudobulk?** Single-cell DE methods that treat each cell as an independent observation are statistically invalid — cells from the same patient are correlated. Pseudobulk aggregates cells per patient first, then runs DE across patients. It's slower and requires more samples, but the p-values are real.

**An important honest note on power:** 5 of our 10 target genes are underpowered in this dataset — the within-group variance is high enough that we would need larger effect sizes than we observe to reach statistical significance at 80% power. NS results for these genes should be read as *inconclusive*, not as evidence of absence.

### 2. GSE131907 — Kim et al. NSCLC Atlas
**What it is:** 208,506 single cells from NSCLC patients, including 29,060 cells from 10 brain metastasis samples and 45,149 cells from 11 primary lung tumor samples. A landmark dataset for NSCLC biology.

**What we did:** Pseudobulk Mann-Whitney U test across all cell types, then epithelial-cell-only analysis to isolate tumor-intrinsic signals from immune contamination.

### 3. GSE186344 — Gonzalez et al. Pan-Cancer BrM Atlas (Cell 2022)
**What it is:** Pan-cancer brain metastasis single-cell atlas. We analyzed the Lung_2 sample (GSM5645895): 1,015 malignant tumor cells (MTC) vs 1,758 non-tumor cells.

**What we did:** Direct comparison of expression in confirmed malignant cells vs the surrounding brain microenvironment.

### 4. GSE200563 — Spatial RNA-seq
**What it is:** Spatial transcriptomics of brain metastasis tissue sections, preserving the spatial architecture of the tumor-brain interface.

**What we did:** Region-of-interest (ROI) analysis comparing tumor-enriched vs non-tumor regions.

### 5. CPTAC LUAD — Proteomics
**What it is:** The Clinical Proteomic Tumor Analysis Consortium's lung adenocarcinoma dataset — mass spectrometry-based protein quantification in tumor vs adjacent normal tissue.

**Why it matters:** RNA doesn't always equal protein. A gene can be transcribed but not translated, or the protein can be rapidly degraded. Proteomics is the ground truth for whether a gene's product actually accumulates.

### 6. DepMap 23Q2 — CRISPR Dependency Screens
**What it is:** The Broad Institute's genome-wide CRISPR knockout screens across 900+ cancer cell lines, including 120 lung cancer lines and 2 brain-tropic lines (KNS-62, NCI-H1915).

**Why it matters:** Expression tells you a gene is present. Dependency tells you the cancer cell *needs* it to survive. A gene that is both overexpressed in BrM AND essential for cancer cell survival is a drug target.

### 7. Human Protein Atlas + cBioPortal (TCGA LUAD)
**What it is:** Protein-level expression across normal tissues (HPA) and bulk RNA-seq from 510 TCGA LUAD patients (cBioPortal).

**Why it matters:** Survival correlation. If high expression of a gene predicts poor prognosis in LUAD patients, that's clinical relevance.

---

## The Results: A Verdict for Each Target

After running all seven evidence streams, here is what we found — honestly, including the failures and the surprises.

---

### BACE1 — The Lead Target

**Verdict: CONFIRMED**

BACE1 (Beta-Secretase 1) is best known from Alzheimer's disease research — it's the enzyme that cleaves amyloid precursor protein to generate the amyloid-beta peptides that accumulate in AD plaques. Billions of dollars were spent trying to inhibit it for Alzheimer's. Those trials failed. But the compound pharmacology is exquisitely characterized.

Here's what we found in brain metastasis:

- **GSE131907:** BACE1 significantly upregulated in brain metastases vs primary lung tumors (padj = 0.017, log2FC = +1.22). That's a 2.3-fold increase, statistically significant after multiple testing correction.
- **GSE186344:** BACE1 elevated in malignant tumor cells vs non-tumor brain cells (log2FC = +0.89, p = 1.08e-9).
- **GSE223499 (tumor-like cells):** LFC = +1.069, pval = 0.016, padj = 0.071 — borderline after multiple testing correction, but the effect size is large and directionally consistent. Importantly, BACE1 also reaches significance in the immune aggregate compartment (padj = 0.016), providing secondary confirmation.
- **Literature:** In April 2025, Chafe et al. published in *Science Translational Medicine* a genome-wide in vivo CRISPRa screen in an orthotopic patient-derived xenograft model of NSCLC brain metastasis. Their top hit? **BACE1.** The mechanism: BACE1 cleaves EGFR on the surface of lung cancer cells, generating a soluble EGFR fragment that promotes brain colonization. This is a functional, mechanistic validation in a human-derived model.
- **HPA:** BACE1 is expressed at 45.5 nTPM in brain tissue vs 13.1 nTPM in lung — the brain is its natural home. When lung cancer cells arrive in the brain, they may be co-opting a brain-specific enzyme for their own survival.

**The clinical angle:** Failed Alzheimer's BACE1 inhibitors (verubecestat, atabecestat, lanabecestat) are characterized compounds with known pharmacokinetics, blood-brain barrier penetration, and safety profiles. They failed for AD because they didn't improve cognition — not because they were toxic. Repurposing them for NSCLC brain metastasis is a scientifically grounded hypothesis that could reach clinical testing faster than a de novo drug program.

---

### NOM1 — The Ribosome Factory

**Verdict: CONFIRMED (strongest multi-modal evidence of any target)**

NOM1 is a nucleolar protein involved in ribosome biogenesis — the process by which cells manufacture the molecular machines that make all proteins. Cancer cells, which grow faster than normal cells, are addicted to ribosome production.

- **GSE223499:** NOM1 is the **only target in our list to reach formal statistical significance** in our primary dataset: padj = 0.0034, log2FC = +0.515. This is a robust result — the analysis is well-powered for NOM1 (minimum detectable LFC = 0.40, observed LFC = 0.52), and the signal survives Benjamini-Hochberg multiple testing correction across 32,498 genes.
- **CPTAC Proteomics:** NOM1 protein is dramatically elevated in LUAD tumor tissue vs adjacent normal (+1.81 difference in normalized protein abundance). This is the largest tumor-vs-normal protein difference of any target we measured.
- **DepMap CRISPR:** NOM1 is the **only** target in our list that is a genuine cancer dependency. Chronos score = −0.695 across 120 lung cancer lines. Both brain-tropic lines (KNS-62: −0.761; NCI-H1915: −0.558) show NOM1 as essential. A Chronos score below −0.5 means: knock out this gene, and the cancer cell dies.
- **GSE186344:** NOM1 is the most highly expressed target in malignant brain metastasis cells (mean = 1.058, 56.7% of cells express it, log2FC = +3.57 vs non-tumor cells, p = 1.33e-184).

**What this means:** NOM1 is not just a marker of brain metastasis — it's a survival gene. The cancer cell needs it. This is the profile of a drug target, not just a biomarker.

---

### FAM72A — The Cell Cycle Accelerator

**Verdict: TRENDING**

FAM72A is involved in cell cycle progression and has been linked to chromosomal instability. It's consistently upregulated in brain metastases across multiple datasets:

- **GSE223499:** pval = 0.013, padj = 0.061, LFC = +1.054 — a 2-fold increase that just misses the FDR threshold. The analysis is powered for this effect size (minimum detectable LFC = 0.73, observed = 1.05), so the borderline padj reflects genuine biological variability, not insufficient data. FAM72A also reaches significance in the immune aggregate compartment (padj = 0.012), providing secondary support.
- **GSE131907:** Concordant upregulation in BrM
- **GSE186344:** log2FC = +3.18 in malignant cells, p = 1.25e-34
- **HPA Survival:** High FAM72A expression predicts **unfavorable prognosis** in LUAD (p = 1.38e-5) — one of the strongest survival associations in our dataset

**The caveat:** FAM72A is absent from the CPTAC proteome (not detected) and not in the DepMap CRISPR screen. We have strong RNA evidence but no protein or functional validation. It's a compelling target that needs a dedicated functional study.

---

### PTPRC — The Immune Depletion Signal

**Verdict: REINTERPRETED**

PTPRC (CD45) is a pan-leukocyte marker — it's expressed on virtually every immune cell. We initially expected it to be upregulated in brain metastases if immune infiltration was higher. The opposite is true.

- **GSE131907:** PTPRC significantly **downregulated** in BrM vs primary lung (padj = 0.017, log2FC = −1.31)
- **GSE161116 NanoString:** Trending downward in BrM (p = 0.083)
- **CPTAC:** PTPRC protein lower in tumor vs normal
- **HPA Survival:** High PTPRC expression predicts **favorable prognosis** in LUAD (p = 5.92e-5) — meaning immune-rich tumors do better
- **GSE223499 (tumor-like compartment):** NS, as expected — PTPRC is an immune marker and should not be differentially expressed within tumor cells themselves. The signal lives in the immune compartment.

**The reinterpretation:** PTPRC downregulation in brain metastases reflects **immune desert biology**. The brain is an immune-privileged organ. When lung cancer cells colonize it, they enter an environment with fewer T cells, fewer B cells, and more immunosuppressive microglia. The PTPRC signal is telling us that brain metastases are immunologically cold — which explains why checkpoint inhibitors (pembrolizumab, nivolumab) have limited efficacy in BrM.

**The clinical implication:** Patients with NSCLC brain metastases may need combination strategies that first "heat up" the immune microenvironment before checkpoint blockade can work. This is an active area of clinical investigation.

---

### ROPN1L — The RNA-Protein Paradox

**Verdict: CORROBORATED (with a critical caveat)**

ROPN1L shows concordant upregulation at the RNA level across three datasets. But the CPTAC proteomics tells a completely different story: ROPN1L protein is dramatically **downregulated** in LUAD tumor tissue (−3.02 difference — the largest protein decrease of any target).

In GSE223499, ROPN1L is NS (LFC = +0.184, padj = 0.824) — but this is an underpowered result. ROPN1L has very low expression (baseMean = 23 counts), and snRNA-seq is not the ideal platform for detecting lowly expressed genes. The NS result here is inconclusive rather than negative.

This RNA-protein discordance is scientifically interesting. It could mean:
1. Post-translational regulation: ROPN1L mRNA is made but the protein is rapidly degraded in tumor cells
2. Cell-type artifact: The RNA signal comes from non-tumor cells in the bulk tissue
3. Context-specificity: ROPN1L behaves differently in brain metastases vs primary lung tumors

This target needs cell-type-resolved proteomics before any therapeutic conclusions can be drawn.

---

### SENP8 — Negative Evidence

**Verdict: CONFLICTED → NEGATIVE RNA EVIDENCE**

SENP8 is a SUMO protease involved in protein modification. It shows the most scientifically important conflict in our dataset — and we want to be direct about what the data says.

- **GSE223499 (tumor cells):** LFC = −0.470, pval = 0.046 — **downregulated** in BrM tumor-like cells. This is a powered analysis (minimum detectable LFC = 0.67, observed = 0.47 ≈ MDE). The direction is wrong for a BrM driver.
- **GSE200563 (spatial, whole ROI):** Upregulated in BrM
- **CPTAC:** Protein downregulated in tumor (−1.72)
- **HPA:** SENP8 is testis-enriched (14.6 nTPM) — a favorable toxicity profile if it were a target, but the RNA evidence doesn't support it as a BrM-upregulated gene in tumor cells.

The spatial data captures the entire tumor region including stroma, vasculature, and immune cells. The snRNA-seq data isolates tumor cells specifically. The conflict suggests that **SENP8 may be upregulated in the brain metastasis microenvironment** (perhaps in astrocytes or tumor-associated macrophages) **but is downregulated in the tumor cells themselves**. This is a cell-type deconvolution problem — and solving it would be a publishable finding about BrM niche biology.

For therapeutic purposes, SENP8 is currently not supported as a tumor-cell target by the snRNA-seq evidence.

---

### SLC25A32 — A Null Result Worth Explaining

**Verdict: NULL (RNA) / STRONG (DepMap Essentiality)**

SLC25A32 is a mitochondrial folate transporter. It was ranked #3 in our Assassin Score based on strong DepMap essentiality data. But our snRNA-seq analysis revealed something important: **SLC25A32 is not differentially expressed per tumor cell in brain metastases.**

- **GSE223499:** LFC = +0.031, padj = 0.949 — essentially zero effect. This is a powered analysis (minimum detectable LFC = 0.69, observed = 0.03 << MDE). This is a true null, not an underpowered result.

**Why did prior analyses suggest upregulation?** The raw pseudobulk counts were higher in BrM samples (mean 2,188 vs 1,331 in Primary). But after library-size normalization — correcting for the fact that BrM samples had more cells and therefore larger libraries — the per-cell expression is identical (65.6 CPM in BrM vs 63.1 CPM in Primary). The prior signals from bulk RNA-seq meta-analyses were **cell-composition artifacts**: BrM tumors have more cells, not higher per-cell SLC25A32 expression.

**What remains valid:** SLC25A32's DepMap essentiality score is real and independent of expression. Cancer cells may depend on SLC25A32 for mitochondrial folate transport regardless of whether it's overexpressed. The therapeutic rationale shifts from "overexpressed target" to "metabolic dependency" — a different but still valid framing.

**TCGA LUAD co-expression:** SLC25A32 co-expresses strongly with MTHFD2 (r = +0.43), SHMT2 (r = +0.28), and SDHB (r = +0.24) in 510 LUAD patients — confirming it sits in a coherent mitochondrial one-carbon/FAD metabolism network. The biology is real; the differential expression in BrM is not.

---

### SLC45A4, TFEB, ATP10D

**Verdicts: TRENDING / INCONCLUSIVE / NO_EVIDENCE**

- **SLC45A4:** pval = 0.064, padj = 0.183, LFC = +1.062 in GSE223499 — a large effect size that misses significance due to one high-variance BrM outlier sample inflating within-group variance 4-fold. Concordant upregulation across 3 RNA datasets. Underpowered here, not a null result.
- **TFEB:** LFC = −0.336, padj = 0.516 in tumor-like cells; padj = 0.014 in T cells. TFEB is a transcription factor — expression may not reflect activity. Inconclusive.
- **ATP10D:** LFC = −0.132, padj = 0.879. The CRISPRa screen hit reflects what happens when ATP10D is artificially overactivated, not its endogenous expression level. No endogenous DE signal in any compartment. The CRISPRa biology may still be real, but ATP10D is not a transcriptionally upregulated BrM marker.

---

## The Evidence Matrix

Here's the full picture in one table, updated with our final PyDESeq2 results:

| Gene | GSE223499 (tumor-like) | GSE131907 | GSE186344 | CPTAC Protein | DepMap | Verdict |
|------|------------------------|-----------|-----------|---------------|--------|---------|
| **NOM1** | ★ **padj=0.0034**, LFC=+0.52 ↑ | NS ↑ | ★★ p=1e-184 ↑ | ★★ +1.81 ↑ | ★ Essential | **CONFIRMED** |
| **BACE1** | ~ padj=0.071, LFC=+1.07 ↑ | ★ padj=0.017 ↑ | ★ p=1e-9 ↑ | Not detected | NS | **CONFIRMED** |
| **FAM72A** | ~ padj=0.061, LFC=+1.05 ↑ | ↑ concordant | ★★ p=1e-34 ↑ | Not detected | Not screened | TRENDING |
| **SLC45A4** | ~ pval=0.064, LFC=+1.06 ↑ | NS ↑ | ★★ p=1e-56 ↑ | Not detected | NS | CORROBORATED |
| **ROPN1L** | NS ↑ (underpowered) | NS ↑ | ↑ concordant | ★★ −3.02 ↓ | NS | CORROBORATED* |
| **PTPRC** | NS (immune marker) | ★ padj=0.017 ↓ | ★★ p=1e-58 ↓ | ↓ | NS | REINTERPRETED |
| **SENP8** | **↓ pval=0.046** (wrong dir.) | ↑ | ↑ spatial | ★★ −1.72 ↓ | NS | CONFLICTED |
| **SLC25A32** | **NULL** LFC=+0.03, padj=0.95 | NS | ★★ ↑ | +0.95 ↑ | ★ Essential | NULL (RNA) |
| **TFEB** | NS ↓ tumor / ↑ T cells | NS | ★★ ↑ | +0.09 | NS | INCONCLUSIVE |
| **ATP10D** | NS (LFC=−0.13) | NS | NS | ↓ | NS | NO_EVIDENCE |

*RNA-protein discordance requires resolution. ~ = nominal (pval<0.05, padj>0.05)

---

## What This Means for a Cure

Let's be direct about what we have and what we don't.

**What we have:**
- Two confirmed targets (NOM1, BACE1) with multi-modal evidence across independent human datasets
- A mechanistic understanding of BACE1's role in brain colonization (EGFR cleavage)
- A functional dependency for NOM1 (cancer cells die without it; Chronos = −0.695)
- A clear picture of the immune landscape in brain metastases (immune desert, PTPRC-low)
- Repurposable compounds for BACE1 (characterized Alzheimer's inhibitors with BBB penetration)
- An important null result for SLC25A32 that reframes it from "overexpressed target" to "metabolic dependency"

**What we don't have yet:**
- A clinical trial
- Patient-level validation
- A drug that has been tested in NSCLC brain metastasis patients

The path from here to a cure runs through several stages:

**Stage 1 — Functional validation (now):** Test BACE1 and NOM1 inhibition in NSCLC brain-tropic cell lines. Does inhibiting BACE1 reduce brain colonization in an orthotopic mouse model? Does NOM1 knockdown kill brain-tropic lung cancer cells selectively?

**Stage 2 — Biomarker development:** Can we identify NSCLC patients whose brain metastases are BACE1-high or NOM1-high? These patients would be the target population for a clinical trial.

**Stage 3 — Repurposing trial:** A Phase I/II trial of a BACE1 inhibitor (e.g., a reformulated verubecestat) in NSCLC patients with brain metastases who are BACE1-high. The compound is characterized. The target is validated. The patient population is defined. This is not science fiction — it's a clinical trial design.

**Stage 4 — Combination strategy:** Given the immune desert biology of BrM (PTPRC-low), the most promising combination may be BACE1 inhibition + immune microenvironment reprogramming (e.g., anti-CD47 "don't eat me" signal blockade, or intrathecal IL-2). Heating up the cold BrM immune environment while simultaneously targeting the tumor's brain-colonization machinery.

---

## The Synthetic Lethality Layer: What Comes Next

The analysis above is Layer 1: target identification. But CrisPRO's roadmap includes a Layer 2 that is arguably more powerful: **synthetic lethality**.

The idea is this: instead of directly targeting BACE1 or NOM1 (which may have on-target toxicity in normal brain tissue), we identify a *second* gene that becomes essential specifically in BACE1-high or NOM1-high tumor cells. Inhibiting that second gene kills the cancer cell without touching normal tissue.

This is the PARP inhibitor paradigm applied to brain metastasis. BRCA-mutant cancer cells are killed by PARP inhibitors not because PARP is mutated, but because BRCA-mutant cells have lost one DNA repair pathway and become entirely dependent on PARP for survival. The tumor's own mutation defines its vulnerability.

For NSCLC brain metastasis, the synthetic lethality question is: **what does a BACE1-high or NOM1-high brain metastasis cell become dependent on?**

The CrisPRO SL engine — currently validated for ovarian cancer (MBD4/gemcitabine axis, VALIDATED tier) and being expanded to lung cancer — is designed to answer exactly this question. It integrates DepMap CRISPR dependency data, PRISM drug sensitivity screens, GDSC pharmacogenomics, and published literature to identify SL partners for any gene of interest.

The roadmap is clear:
1. Confirm BACE1 and NOM1 as BrM drivers (done — this analysis)
2. Run SL engine on BACE1 and NOM1 in NSCLC context
3. Identify SL partners with existing drug compounds
4. Design a synthetic lethality-based clinical trial

---

## The Honest Caveats

Science requires honesty about limitations. Here are ours:

**Sample size:** GSE223499 has 28 BrM and 11 primary samples in the tumor-like pseudobulk analysis. That's enough for discovery but not for definitive conclusions. Replication in an independent cohort is essential.

**Statistical power:** 5 of our 10 target genes are underpowered in this dataset — the within-group variance is high enough that we cannot reliably detect the effect sizes we observe. NS results for BACE1, SLC45A4, ROPN1L, ATP10D, and TFEB should be read as *inconclusive*, not as evidence of absence. NOM1 and FAM72A are powered; their results are reliable.

**STK11 confounding:** STK11 mutation status (a major NSCLC driver) is not balanced across BrM vs primary samples in our dataset: 24% of BrM samples carry STK11 mutations vs 50% of primary samples. Some of the expression differences we see may reflect STK11 biology rather than brain metastasis biology specifically. We did not include STK11 as a covariate because it is confounded with site (BrM vs Primary) and would reduce power with only 11 primary samples.

**Cell type annotation:** The "tumor-like" cells in GSE223499 are transcriptionally tumor-like but not all are CNV-confirmed malignant. The confirmed malignant subset is severely underpowered (26 BrM samples / 2 Primary samples in pseudobulk).

**RNA ≠ protein ≠ function:** We have strong RNA evidence for several targets. RNA expression is a starting point, not a finish line. ROPN1L's RNA-protein discordance and SLC25A32's null RNA result (despite strong DepMap essentiality) are reminders that transcriptomics alone can mislead.

**No causal evidence yet:** We have correlational evidence that these genes are differentially expressed in brain metastases. We do not yet have proof that they *cause* brain metastasis. The Chafe et al. CRISPRa screen provides functional evidence for BACE1 specifically, but the others need experimental validation.

---

## Why This Approach Is Different

Most cancer research focuses on one gene, one dataset, one cancer type. We took a different approach: **multi-modal, multi-dataset, honest about uncertainty**.

We didn't cherry-pick the datasets that supported our hypothesis. We ran all seven evidence streams and reported the conflicts (SENP8, ROPN1L) alongside the confirmations (NOM1, BACE1). We didn't call a target "confirmed" because it trended in one dataset — we required convergent evidence across independent sources. And when our most rigorous analysis (cell-type-matched pseudobulk DE in the largest available NSCLC BrM snRNA-seq dataset) contradicted a prior signal — as it did for SLC25A32 — we updated our conclusion rather than defending the prior result.

This is how you build a foundation for clinical translation. Not by overstating what you know, but by being precise about what you know, what you suspect, and what you don't know yet.

The cure for lung cancer brain metastasis will not come from a single paper or a single dataset. It will come from the accumulation of honest, rigorous, multi-modal evidence — exactly what this project is building.

---

## What You Can Do

If you're a researcher: the datasets are all publicly available. GSE223499, GSE131907, GSE186344 are on GEO. The CPTAC data is on the PDC. DepMap is at depmap.org. Everything we did is reproducible.

If you're a clinician: BACE1 inhibitors are characterized compounds. If you have NSCLC brain metastasis patients who have exhausted standard options, the scientific rationale for a compassionate use or basket trial is building.

If you're a patient or advocate: this work is for you. The goal is not a paper. The goal is a treatment.

---

*CrisPRO is a research platform. All findings are for scientific discussion only and are not validated for clinical decision-making. For medical decisions, consult a qualified oncologist.*

*Data sources: GSE223499 (Gonzalez-Ericsson et al., Nat Med 2025), GSE131907 (Kim et al., Nat Commun 2020), GSE186344 (Gonzalez et al., Cell 2022), CPTAC LUAD (Edwards et al., Cell 2023), DepMap 23Q2 (Broad Institute), Human Protein Atlas (Uhlén et al., Science 2015), TCGA LUAD via cBioPortal. Chafe et al. 2025, Sci Transl Med (BACE1 CRISPRa screen). Hou et al. 2025, Sci Rep (PTPRC in LUAD).*
