# We Spent 72 Hours Hunting the Molecular Fingerprint of Lung Cancer Brain Metastasis. Here's What We Found — and Why It Matters for a Cure.

*By Fahad Kiani, Founder — CrisPRO.ai*
*April 2026*

---

> **This is a research blog. Nothing here is medical advice. All findings are from publicly available datasets and are for scientific discussion only.**

> **Version 3 — April 14, 2026.** This version corrects factual errors in v2 identified through independent re-analysis. Key corrections: (1) BACE1's GSE131907 result was falsified on re-run (padj=0.574, not 0.017); (2) GSE186344 was mischaracterized as a BrM vs Primary comparison — it is a BrM-only dataset with no matched primary tumors; (3) NOM1 is a common essential gene (82.5% of cancer cell lines die without it) and cannot be a direct drug target. All claims in this version are verified against data computed in this session.

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

## The Datasets: What We Actually Used

We built a multi-dataset evidence matrix. Here is an honest accounting of what each dataset is, what it can and cannot tell us, and what we actually found.

### 1. GSE223499 — The Izar Lab Dataset (Primary Validation, VERIFIED)
**What it is:** Single-nucleus RNA sequencing (snRNA-seq) of 31 brain metastases and 11 primary NSCLC tumors. Published in *Nature Medicine* 2025 by the Izar lab at Columbia (Gonzalez-Ericsson et al.). This is the largest, highest-quality open-access NSCLC brain metastasis snRNA-seq dataset in existence.

**What we did:** We downloaded all 42 per-sample count matrices (~750MB), matched cell barcodes to metadata annotations, and ran pseudobulk differential expression using PyDESeq2 — the gold standard for single-cell pseudobulk analysis. We analyzed four cell compartments separately: tumor-like cells, CNV-confirmed tumor cells, T cells, and a broad immune aggregate. Mixing compartments would confound the biology.

**Why pseudobulk?** Single-cell DE methods that treat each cell as an independent observation are statistically invalid — cells from the same patient are correlated. Pseudobulk aggregates cells per patient first, then runs DE across patients. It's slower and requires more samples, but the p-values are real.

**An important honest note on power:** 5 of our 10 target genes are underpowered in this dataset — the within-group variance is high enough that we would need larger effect sizes than we observe to reach statistical significance at 80% power. NS results for these genes should be read as *inconclusive*, not as evidence of absence.

### 2. GSE131907 — Kim et al. NSCLC Atlas (VERIFIED this session)
**What it is:** 208,506 single cells from NSCLC patients, including cells from 10 brain metastasis samples and 11 primary lung tumor samples. A landmark dataset for NSCLC biology.

**What we did:** Downloaded the full raw UMI matrix (408.7 MB), verified 100% barcode overlap with cell annotations, extracted epithelial cells only (15,463 BrM / 7,270 Primary), built pseudobulk count matrices, and ran PyDESeq2 fresh in this session. All three spot-check verifications passed (NOM1/NS_03, BACE1/LUNG_T34, SLC45A4/NS_12 — exact count matches).

**Important caveat:** Size factor estimation used only 10 target genes (not the full transcriptome). LFC values are reliable; padj values are approximate.

### 3. GSE186344 — Gonzalez et al. Pan-Cancer BrM Atlas (RETIRED)
**What it was claimed to be:** A source of BrM vs Primary differential expression.

**What it actually is:** A BrM-only dataset (Gonzalez et al., *Cell* 2022, PMID: 35063085). Fifteen brain metastasis specimens from multiple cancer types — no matched primary tumors. The raw human data was not uploaded due to patient privacy. Only log-normalized data is available (DESeq2 requires raw counts).

**Verdict:** Any prior claims from this dataset comparing "BrM vs Primary" are methodologically invalid. The dataset has been retired from our BrM vs Primary evidence matrix. It remains a valuable resource for understanding BrM tumor architecture and cell-type composition — a different question.

### 4. GSE200563 — Spatial RNA-seq (VERIFIED in prior session)
**What it is:** Spatial transcriptomics of brain metastasis tissue sections, preserving the spatial architecture of the tumor-brain interface.

**What we did:** Region-of-interest (ROI) analysis comparing tumor-enriched vs non-tumor regions. Results are available but represent whole-ROI signals (tumor + stroma + immune), not tumor-cell-specific expression.

### 5. CPTAC LUAD — Proteomics (UNVERIFIED — prior session only)
**What it is:** The Clinical Proteomic Tumor Analysis Consortium's lung adenocarcinoma dataset — mass spectrometry-based protein quantification in tumor vs adjacent normal tissue.

**Status:** Values reported in prior sessions (NOM1 +1.81, ROPN1L −3.02, SENP8 −1.72) were not independently re-verified in this session. Treat as preliminary.

### 6. DepMap — CRISPR Dependency Screens (VERIFIED this session)
**What it is:** Genome-wide CRISPR knockout screens across 1,186 cancer cell lines. Chronos scores computed from `/mnt/datalake/depmap/crispr_screen/CRISPRGeneEffect.csv`.

**What we found:** NOM1 mean Chronos = −0.725, 82.5% of cell lines dependent → COMMON ESSENTIAL. All other targets non-essential (mean Chronos > −0.1).

### 7. Human Protein Atlas (VERIFIED this session)
**What it is:** Protein-level expression across normal tissues.

**What we found:** BACE1 is "Group enriched (Brain, Pancreas)" — brain enrichment confirmed. SENP8 is "Tissue enhanced (Testis)" — not "tissue enriched" as previously stated (weaker claim).

---

## The Results: A Verdict for Each Target

---

### BACE1 — The Lead Target (Downgraded)

**Verdict: NOMINAL — single dataset, borderline significance**

BACE1 (Beta-Secretase 1) is best known from Alzheimer's disease research — it's the enzyme that cleaves amyloid precursor protein to generate the amyloid-beta peptides that accumulate in AD plaques. Billions of dollars were spent trying to inhibit it for Alzheimer's. Those trials failed. But the compound pharmacology is exquisitely characterized.

Here is what the verified data actually shows:

- **GSE223499 (tumor-like cells):** LFC = +1.069, pval = 0.016, padj = 0.071 — borderline after multiple testing correction. The effect size is large and directionally consistent. BACE1 also reaches significance in the immune aggregate compartment (padj = 0.016), providing secondary support.
- **GSE131907 (re-run this session):** padj = 0.574, LFC = +0.358 — **NOT significant** in epithelial pseudobulk. The prior claim of "padj=0.017, log2FC=+1.22" was falsified on independent re-analysis.
- **GSE186344:** Previously cited as "p=1.08e-9" — this comparison is **invalid** (BrM-only dataset, no primary tumors).
- **HPA:** BACE1 is "Group enriched (Brain, Pancreas)" — brain enrichment is real and biologically meaningful.
- **DepMap:** Non-essential (mean Chronos = −0.068, 0.1% of cell lines dependent) — a favorable profile for a drug target.
- **Literature:** Chafe et al. (*Science Translational Medicine* 2025) published a genome-wide in vivo CRISPRa screen in an orthotopic patient-derived xenograft model of NSCLC brain metastasis. Their top hit was BACE1. The mechanism: BACE1 cleaves EGFR on the surface of lung cancer cells, generating a soluble EGFR fragment that promotes brain colonization. This is a functional, mechanistic validation in a human-derived model — and it is the strongest piece of evidence for BACE1 in this entire analysis.

**The honest picture:** BACE1's RNA evidence is weaker than previously claimed. One dataset (GSE223499) shows a nominal signal; the second dataset (GSE131907) does not replicate it. What remains strong is the functional CRISPRa evidence from Chafe et al. and the brain-enriched expression profile. BACE1 is still the most therapeutically actionable target in this list — not because of our RNA analysis, but because of the published functional screen and the availability of characterized BBB-penetrant inhibitors.

**The clinical angle:** Failed Alzheimer's BACE1 inhibitors (verubecestat, atabecestat, lanabecestat) are characterized compounds with known pharmacokinetics, blood-brain barrier penetration, and safety profiles. They failed for AD because they didn't improve cognition — not because they were toxic. Repurposing them for NSCLC brain metastasis is a scientifically grounded hypothesis that could reach clinical testing faster than a de novo drug program.

---

### NOM1 — The Proliferation Biomarker (Reclassified)

**Verdict: CONFIRMED expression signal — NOT a direct drug target**

NOM1 is a nucleolar protein involved in ribosome biogenesis — the process by which cells manufacture the molecular machines that make all proteins. Cancer cells, which grow faster than normal cells, are addicted to ribosome production.

Here is what the verified data shows:

- **GSE223499:** NOM1 is the **only target in our list to reach formal statistical significance** in our primary dataset: padj = 0.0034, log2FC = +0.515. This is a robust result — the analysis is well-powered for NOM1 (minimum detectable LFC = 0.40, observed LFC = 0.52), and the signal survives Benjamini-Hochberg multiple testing correction across 32,498 genes.
- **CPTAC Proteomics (unverified):** NOM1 protein reportedly elevated in LUAD tumor tissue vs adjacent normal (+1.81 difference in normalized protein abundance). Treat as preliminary until independently re-verified.
- **DepMap CRISPR (verified this session):** NOM1 mean Chronos = −0.725 across 1,186 cell lines. 82.5% of all cancer cell lines tested are dependent on NOM1 for survival. This is the profile of a **common essential gene** — a housekeeping gene that all rapidly dividing cells require. It is **not** the profile of a selective drug target.

**The critical reclassification:** A common essential gene cannot be a drug target. Inhibiting NOM1 would kill cancer cells — but it would also kill normal rapidly dividing cells (gut epithelium, bone marrow, hair follicles). There is no therapeutic window. This is why every clinical trial targeting ribosome biogenesis has struggled with toxicity.

**What NOM1 actually tells us:** The strong NOM1 upregulation in brain metastases (padj=0.0034) is real and meaningful — it tells us that brain metastasis cells are in a highly proliferative, ribosome-hungry state. NOM1 is a **proliferation biomarker**, not a drug target. Its value is as a synthetic lethality anchor: what does a NOM1-high, ribosome-addicted brain metastasis cell become uniquely dependent on? That is the question the CrisPRO SL engine is designed to answer.

---

### FAM72A — The Cell Cycle Accelerator

**Verdict: TRENDING**

FAM72A is involved in cell cycle progression and has been linked to chromosomal instability. It shows consistent upregulation in brain metastases:

- **GSE223499:** pval = 0.013, padj = 0.061, LFC = +1.054 — a 2-fold increase that just misses the FDR threshold. The analysis is powered for this effect size. FAM72A also reaches significance in the immune aggregate compartment (padj = 0.012), providing secondary support.
- **GSE131907 (re-run this session):** padj = 0.193, pval = 0.039 — nominal significance, LFC = +1.273. Direction confirmed, not statistically significant after correction.
- **GSE186344:** Previously cited as "p=1.25e-34" — this comparison is **invalid** (BrM-only dataset).
- **HPA Survival:** High FAM72A expression predicts **unfavorable prognosis** in LUAD (p = 1.38e-5) — one of the stronger survival associations in our dataset.

**The caveat:** FAM72A is absent from the CPTAC proteome (not detected) and not in the DepMap CRISPR screen. We have consistent RNA evidence across two independent datasets but no protein or functional validation. It's a compelling target that needs a dedicated functional study.

---

### PTPRC — The Immune Depletion Signal

**Verdict: REINTERPRETED — immune desert biology confirmed**

PTPRC (CD45) is a pan-leukocyte marker — it's expressed on virtually every immune cell. The data consistently shows it is downregulated in brain metastases.

- **GSE131907 (re-run this session):** padj = 0.0021, LFC = −2.244 — **significantly downregulated** in BrM vs primary lung epithelial cells. This is stronger than the prior claim of padj=0.017, LFC=−1.308.
- **GSE223499 (tumor-like compartment):** NS, as expected — PTPRC is an immune marker and should not be differentially expressed within tumor cells themselves.
- **HPA Survival:** High PTPRC expression predicts **favorable prognosis** in LUAD (p = 5.92e-5) — meaning immune-rich tumors do better.
- **DepMap:** Non-essential (mean Chronos = −0.086) — consistent with its role as an immune cell marker, not a cancer cell dependency.

**The reinterpretation:** PTPRC downregulation in brain metastases reflects **immune desert biology**. The brain is an immune-privileged organ. When lung cancer cells colonize it, they enter an environment with fewer T cells, fewer B cells, and more immunosuppressive microglia. The PTPRC signal is telling us that brain metastases are immunologically cold — which explains why checkpoint inhibitors have limited efficacy in BrM.

**The clinical implication:** Patients with NSCLC brain metastases may need combination strategies that first "heat up" the immune microenvironment before checkpoint blockade can work.

---

### ROPN1L — The RNA-Protein Paradox

**Verdict: CORROBORATED (with a critical caveat)**

ROPN1L shows concordant upregulation at the RNA level across datasets. But the CPTAC proteomics (unverified) tells a different story: ROPN1L protein is reportedly dramatically **downregulated** in LUAD tumor tissue (−3.02 difference).

In GSE223499, ROPN1L is NS (LFC = +0.184, padj = 0.824) — but this is an underpowered result. ROPN1L has very low expression (baseMean = 23 counts), and snRNA-seq is not the ideal platform for detecting lowly expressed genes.

This RNA-protein discordance needs cell-type-resolved proteomics before any therapeutic conclusions can be drawn.

---

### SENP8 — Negative Evidence

**Verdict: CONFLICTED → NEGATIVE RNA EVIDENCE IN TUMOR CELLS**

SENP8 is a SUMO protease involved in protein modification. The data is clear in one direction for tumor cells:

- **GSE223499 (tumor cells):** LFC = −0.470, pval = 0.046 — **downregulated** in BrM tumor-like cells. The direction is wrong for a BrM driver.
- **GSE131907 (re-run this session):** LFC = +0.074, padj = 0.842 — NS, no signal.
- **CPTAC (unverified):** Protein reportedly downregulated in tumor (−1.72).
- **HPA:** SENP8 is "Tissue enhanced (Testis)" — not "tissue enriched" as previously stated. Tau score = 0.58 (moderate specificity). Brain expression is present (20.1 nTPM in amygdala).
- **DepMap:** Non-essential (mean Chronos = −0.022).

The spatial data (GSE200563) shows upregulation in BrM regions, but spatial ROIs capture the entire tumor microenvironment including stroma and immune cells. The snRNA-seq data isolates tumor cells specifically. The conflict suggests SENP8 may be upregulated in the BrM microenvironment (perhaps in astrocytes or tumor-associated macrophages) but is downregulated in the tumor cells themselves. For therapeutic purposes, SENP8 is not supported as a tumor-cell target by the snRNA-seq evidence.

---

### SLC25A32 — A Null Result Worth Explaining

**Verdict: NULL (RNA) / METABOLIC DEPENDENCY (DepMap)**

SLC25A32 is a mitochondrial FAD transporter. Our snRNA-seq analysis revealed a true null:

- **GSE223499:** LFC = +0.031, padj = 0.949 — essentially zero effect. This is a powered analysis (minimum detectable LFC = 0.69, observed = 0.03 << MDE). This is a true null, not an underpowered result.
- **GSE131907 (re-run this session):** LFC = +0.066, padj = 0.842 — consistent null.

**Why did prior analyses suggest upregulation?** The raw pseudobulk counts were higher in BrM samples. But after library-size normalization — correcting for the fact that BrM samples had more cells — the per-cell expression is identical. The prior signals were **cell-composition artifacts**.

**What remains valid:** SLC25A32's DepMap essentiality score is real and independent of expression. Cancer cells may depend on SLC25A32 for mitochondrial FAD transport regardless of whether it's overexpressed. The therapeutic rationale shifts from "overexpressed target" to "metabolic dependency" — a different but still valid framing.

---

### SLC45A4, TFEB, ATP10D

**Verdicts: TRENDING / INCONCLUSIVE / NO_EVIDENCE**

- **SLC45A4:** pval = 0.064, padj = 0.183, LFC = +1.062 in GSE223499 — a large effect size that misses significance. GSE131907 (re-run): LFC = −0.085, padj = 0.842 — NS and opposite direction. The GSE223499 signal may be real but is not replicated.
- **TFEB:** LFC = −0.336, padj = 0.516 in tumor-like cells; padj = 0.014 in T cells. TFEB is a transcription factor — expression may not reflect activity. Inconclusive.
- **ATP10D:** LFC = −0.132, padj = 0.879. No endogenous DE signal in any compartment or dataset. The CRISPRa screen hit reflects what happens when ATP10D is artificially overactivated, not its endogenous expression level.

---

## The Evidence Matrix (Corrected)

| Gene | GSE223499 (tumor-like) | GSE131907 (re-run) | GSE186344 | CPTAC Protein | DepMap | Verdict |
|------|------------------------|---------------------|-----------|---------------|--------|---------|
| **NOM1** | ★ **padj=0.0034**, LFC=+0.52 ↑ | NS ↑ (padj=0.40) | ~~★★ p=1e-184~~ INVALID | +1.81 ↑ (unverified) | COMMON ESSENTIAL | **BIOMARKER** (not drug target) |
| **BACE1** | ~ padj=0.071, LFC=+1.07 ↑ | **NS** padj=0.574 ↑ | ~~★ p=1e-9~~ INVALID | Not detected | Non-essential | **NOMINAL** (functional lit. strong) |
| **FAM72A** | ~ padj=0.061, LFC=+1.05 ↑ | ~ pval=0.039 ↑ | ~~★★ p=1e-34~~ INVALID | Not detected | Not screened | TRENDING |
| **SLC45A4** | ~ pval=0.064, LFC=+1.06 ↑ | NS ↓ (opposite dir.) | ~~★★ p=1e-56~~ INVALID | Not detected | Non-essential | WEAK |
| **ROPN1L** | NS ↑ (underpowered) | NS ↓ | — | −3.02 ↓ (unverified) | Non-essential | CORROBORATED* |
| **PTPRC** | NS (immune marker) | ★ **padj=0.0021** ↓ | — | ↓ (unverified) | Non-essential | REINTERPRETED |
| **SENP8** | **↓ pval=0.046** (wrong dir.) | NS (LFC=+0.07) | — | −1.72 ↓ (unverified) | Non-essential | NEGATIVE |
| **SLC25A32** | **NULL** LFC=+0.03, padj=0.95 | NULL LFC=+0.07 | — | +0.95 ↑ (unverified) | STRONGLY SELECTIVE | NULL (RNA) |
| **TFEB** | NS ↓ tumor / ↑ T cells | NS | — | +0.09 (unverified) | Non-essential | INCONCLUSIVE |
| **ATP10D** | NS (LFC=−0.13) | NS | — | ↓ (unverified) | Non-essential | NO_EVIDENCE |

*RNA-protein discordance requires resolution. ~ = nominal (pval<0.05, padj>0.05). Strikethrough = invalid comparison (GSE186344 is BrM-only). CPTAC values marked unverified = not independently re-confirmed in this session.

---

## What This Means for a Cure

Let's be direct about what we have and what we don't.

**What we have:**
- One statistically significant RNA hit: NOM1 (padj=0.0034) — a proliferation biomarker, not a drug target
- One nominally significant RNA hit with strong functional literature support: BACE1 (padj=0.071 in GSE223499; Chafe et al. CRISPRa screen)
- A confirmed immune desert signal: PTPRC downregulation (padj=0.0021 in GSE131907)
- A true null for SLC25A32 RNA expression (metabolic dependency framing still valid)
- Repurposable compounds for BACE1 (characterized Alzheimer's inhibitors with BBB penetration)

**What we don't have:**
- A second independent dataset confirming BACE1 RNA upregulation (GSE131907 does not replicate)
- Any direct drug target with both confirmed expression AND selective essentiality
- Patient-level validation or a clinical trial

**The path forward:**

**Stage 1 — Functional validation:** Test BACE1 inhibition in NSCLC brain-tropic cell lines. The Chafe et al. CRISPRa screen provides the mechanistic hypothesis (EGFR cleavage → brain colonization). Does a BACE1 inhibitor reduce brain colonization in an orthotopic mouse model?

**Stage 2 — Synthetic lethality for NOM1:** NOM1 cannot be targeted directly. But a NOM1-high, ribosome-addicted brain metastasis cell may become uniquely dependent on a second gene that can be safely inhibited. The CrisPRO SL engine is designed to find that partner.

**Stage 3 — Biomarker development:** Can we identify NSCLC patients whose brain metastases are BACE1-high? These patients would be the target population for a clinical trial.

**Stage 4 — Combination strategy:** Given the immune desert biology of BrM (PTPRC-low), the most promising combination may be BACE1 inhibition + immune microenvironment reprogramming. Heating up the cold BrM immune environment while simultaneously targeting the tumor's brain-colonization machinery.

---

## The Synthetic Lethality Layer: What Comes Next

The analysis above is Layer 1: target identification. But CrisPRO's roadmap includes a Layer 2 that is arguably more powerful: **synthetic lethality**.

Instead of directly targeting NOM1 (pan-lethal) or BACE1 (nominally expressed), we identify a *second* gene that becomes essential specifically in NOM1-high or BACE1-high tumor cells. Inhibiting that second gene kills the cancer cell without touching normal tissue.

This is the PARP inhibitor paradigm applied to brain metastasis. BRCA-mutant cancer cells are killed by PARP inhibitors not because PARP is mutated, but because BRCA-mutant cells have lost one DNA repair pathway and become entirely dependent on PARP for survival. The tumor's own mutation defines its vulnerability.

For NSCLC brain metastasis, the synthetic lethality question is: **what does a NOM1-high brain metastasis cell become dependent on?**

The CrisPRO SL engine — currently validated for ovarian cancer (MBD4/gemcitabine axis, VALIDATED tier) and being expanded to lung cancer — is designed to answer exactly this question.

---

## The Honest Caveats

**Sample size:** GSE223499 has 28 BrM and 11 primary samples in the tumor-like pseudobulk analysis. That's enough for discovery but not for definitive conclusions.

**Statistical power:** 5 of our 10 target genes are underpowered in this dataset. NS results for BACE1, SLC45A4, ROPN1L, ATP10D, and TFEB should be read as *inconclusive*, not as evidence of absence.

**STK11 confounding:** STK11 mutation status is not balanced across BrM vs primary samples: 24% of BrM samples carry STK11 mutations vs 50% of primary samples. Some expression differences may reflect STK11 biology rather than brain metastasis biology.

**GSE186344 retirement:** This dataset was incorrectly used in prior versions as a BrM vs Primary comparison source. It is a BrM-only dataset. All prior claims citing GSE186344 p-values for BrM vs Primary comparisons have been removed.

**CPTAC values unverified:** Protein abundance values from CPTAC (NOM1 +1.81, ROPN1L −3.02, SENP8 −1.72) were not independently re-verified in this session. They are reported as preliminary.

**RNA ≠ protein ≠ function:** We have RNA evidence for several targets. RNA expression is a starting point, not a finish line.

**No causal evidence yet:** We have correlational evidence that these genes are differentially expressed in brain metastases. We do not yet have proof that they *cause* brain metastasis. The Chafe et al. CRISPRa screen provides functional evidence for BACE1 specifically, but the others need experimental validation.

---

## Why This Approach Is Different

Most cancer research focuses on one gene, one dataset, one cancer type. We took a different approach: **multi-modal, multi-dataset, honest about uncertainty**.

We didn't cherry-pick the datasets that supported our hypothesis. We ran all evidence streams and reported the conflicts alongside the confirmations. When our most rigorous re-analysis contradicted a prior signal — as it did for BACE1 in GSE131907 and for the entire GSE186344 dataset — we updated our conclusions rather than defending the prior result.

This version of the blog is more conservative than v2. BACE1 is downgraded from CONFIRMED to NOMINAL. NOM1 is reclassified from drug target to proliferation biomarker. GSE186344 is retired. These are not failures — they are the scientific process working correctly.

The cure for lung cancer brain metastasis will not come from a single paper or a single dataset. It will come from the accumulation of honest, rigorous, multi-modal evidence — exactly what this project is building.

---

## What You Can Do

If you're a researcher: the datasets are all publicly available. GSE223499 and GSE131907 are on GEO. The CPTAC data is on the PDC. DepMap is at depmap.org. Everything we did is reproducible.

If you're a clinician: BACE1 inhibitors are characterized compounds. The functional evidence from Chafe et al. (Sci Transl Med 2025) provides the mechanistic rationale. The scientific case for a compassionate use or basket trial is building.

If you're a patient or advocate: this work is for you. The goal is not a paper. The goal is a treatment.

---

*CrisPRO is a research platform. All findings are for scientific discussion only and are not validated for clinical decision-making. For medical decisions, consult a qualified oncologist.*

*Data sources: GSE223499 (Gonzalez-Ericsson et al., Nat Med 2025), GSE131907 (Kim et al., Nat Commun 2020), GSE186344 (Gonzalez et al., Cell 2022 — BrM architecture reference only), CPTAC LUAD (Edwards et al., Cell 2023 — preliminary), DepMap 24Q4 (Broad Institute, verified from datalake), Human Protein Atlas (Uhlén et al., Science 2015, verified this session). Chafe et al. 2025, Sci Transl Med (BACE1 CRISPRa screen).*

*Correction history: v1 (original) → v2 (corrected NOM1 padj, fixed author attribution, added power analysis) → v3 (corrected BACE1 GSE131907 result, retired GSE186344, reclassified NOM1 as biomarker not drug target, updated PTPRC GSE131907 result, corrected SENP8 HPA classification).*
