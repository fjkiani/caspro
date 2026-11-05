# Platinum selection favours dispersed stochastic chromosomal instability over focal catastrophe in relapsed high-grade serous ovarian carcinoma

**Fahad Kiani¹** [ORCID TBD], [co-authors TBD]

¹ Brenus Pharma / CrisPRO platform. Correspondence: Fahad Kiani ([email TBD]).

**Significance.** In five matched diagnosis→relapse high-grade serous ovarian carcinoma (HGSOC) pairs profiled by shallow whole-genome sequencing (sWGS), platinum-exposed relapse was accompanied by a **genome-wide, dispersed pattern of copy-number instability** rather than a single-chromosome catastrophe. We argue this architecture is most parsimoniously read as **Darwinian selection of a pre-existing chromosomally unstable clone** under platinum pressure, and we illustrate — in one subject — how such a genome can simultaneously acquire an actionable lesion (PTEN loss) that nominates a rational second-line strategy.

---

## Abstract

**Background.** Acquired platinum resistance is the central obstacle in HGSOC. Two structural models are often invoked: a focal, single-event *chromothripsis*-like catastrophe, versus a distributed, genome-wide *chromosomal instability* (CIN) process. Which mode dominates the transition from primary disease to platinum-treated relapse — and how it should be interpreted causally — remains incompletely resolved at the level of matched within-patient samples.

**Approach.** We analysed five matched diagnosis→relapse tumour pairs from the BriTROC-1 cohort using QDNAseq relative copy number (hg19, 30 kb bins, ~0.1× sWGS). For each subject we counted breakpoints (segmented relative-CN level shifts) at diagnosis and at relapse, characterised the dx→relapse architecture with a transparent signature heuristic, and read out relative copy number at six candidate resistance genes. The relapse sample of the lead subject (Subject 260) was retrieved under authorised access, verified byte-for-byte against the cohort manifest checksum, and processed through the identical pipeline in this study.

**Results.** Three of five subjects gained breakpoints through a **dispersed stochastic CIN** signature — new breakpoints spread across many chromosomes with no single chromosome dominating. Subject 260 gained a net of 66 breakpoints (relapse − diagnosis raw delta +60) distributed across **16 chromosomes**, with the top chromosome (chr1) carrying only **21.2%** of the change; the signature classifier returned *dispersed stochastic CIN*, not *focal catastrophe*. This makes Subject 260 the **third independent replication** of the pattern seen in Subjects 191 (+253 breakpoints, 21 chromosomes, top-chromosome fraction 11.5%) and 6 (+101, 20 chromosomes, 11.9%). In parallel, Subject 260 **acquired a PTEN copy-number loss at relapse** (relative CN 0.967→0.692), nominating the PI3K/AKT/mTOR axis as a candidate second-line vulnerability.

**Interpretation.** The data are consistent with platinum acting as a **selective sweep** that favours a genomically plastic, CIN-high clone, rather than with a discrete catastrophe on a single chromosome. Because sWGS reports the surviving clone's architecture, it cannot by itself distinguish selection of a pre-existing clone from chemotherapy-driven induction of new breakage; we treat selection as the primary interpretation and induction as an alternative that cannot be excluded. All findings are from a five-subject pilot and are hypothesis-generating; the shallow-WGS resolution ceiling and the single-sample nature of the PTEN call are stated throughout.

**Keywords.** high-grade serous ovarian carcinoma; platinum resistance; chromosomal instability; chromothripsis; copy-number architecture; shallow whole-genome sequencing; tumour evolution; clonal selection; PTEN; PI3K/AKT/mTOR.

---

## 1. Introduction

High-grade serous ovarian carcinoma is defined by near-universal *TP53* mutation, profound copy-number complexity, and a clinical course dominated by initial platinum sensitivity followed by relapse and acquired resistance [1]. Understanding *how the genome changes* between the platinum-naïve primary tumour and the platinum-exposed relapse is therefore central to understanding resistance itself.

Two structural narratives compete. The first is **focal catastrophe** — a chromothripsis-like event in which one chromosome (or a small number of chromosomes) is shattered and stitched back together in a single cataclysm, producing oscillating copy-number states confined to a narrow genomic territory [2]. The second is **dispersed chromosomal instability (CIN)** — an ongoing, genome-wide inability to faithfully segregate and repair DNA, producing many independent copy-number changes scattered across the karyotype [3]. These are not merely descriptive labels: they imply different underlying biology (one broken repair event versus a persistently unstable genome) and, potentially, different therapeutic logic.

Layered on top of the structural question is a **causal** one that is easy to state loosely and hard to prove. It is tempting to say that platinum chemotherapy "shatters" the genome. But a relapse biopsy shows only the clone that *survived* treatment. A dispersed-CIN architecture at relapse is equally compatible with two mechanisms: (i) platinum **selected** a pre-existing, chromosomally unstable subclone that was present — perhaps rare — at diagnosis; or (ii) platinum-induced damage and repair **generated** the instability during or after treatment. Distinguishing these requires evidence that a single relapse snapshot cannot supply. We therefore adopt an explicitly **Darwinian framing**: the platinum cycle is a selective pressure acting on a heterogeneous tumour-cell population, and the relapse genome is the fittest survivor of that pressure. Under this lens, dispersed CIN is not a wound inflicted on cue but a **phenotype that was selected for** — genomic plasticity as a survival strategy. This framing is both more faithful to what the data can support and, we argue, more useful: it reframes resistance as an evolutionary outcome that can be anticipated and, where a resistant clone reveals an actionable lesion, exploited.

Most sequencing studies of HGSOC resistance analyse cohorts cross-sectionally or rely on bulk primary tumours. Matched, within-patient diagnosis→relapse comparisons on real paired samples — where the *change* in architecture is the unit of analysis — are comparatively scarce. Here we use five such pairs to ask a focused question: **when these HGSOC tumours relapse after platinum, do they do so through focal catastrophe or through dispersed genome-wide instability, and how should that be interpreted?** We use Subject 260 as the lead example — a relapse genome retrieved and verified specifically for this study — and the surrounding four subjects as the cohort context that determines whether Subject 260 is a replication or an anomaly.

---

## 2. Methods

### 2.1 Cohort and data provenance
Tumour samples derive from the BriTROC-1 study (European Genome-phenome Archive dataset `EGAD00001011049`, study `EGAS00001007292`), comprising matched diagnosis and relapse specimens per subject. Five subjects with a diagnosis→relapse pair were analysed: 191, 6, 260, 119 and 109 (ten BAM files total). Aligned reads for Subject 260 (diagnosis sample `IM_426`, EGA file `EGAF00008095344`; relapse sample `JBLAB-19323`, EGA file `EGAF00008095415`) were retrieved under authorised access and **verified byte-for-byte against the cohort manifest MD5 checksum** prior to analysis (relapse checksum confirmed; the download client's internal checksum verification and an independent `samtools quickcheck` both passed; the relapse BAM contained 13,859,231 total reads).

### 2.2 Copy-number profiling
Relative copy number was estimated with QDNAseq against the hg19 reference at 30 kb bin resolution (approximately 0.1× shallow WGS), using a square-root count transform, GC-content and mappability correction, median bin normalisation, outlier smoothing, and circular-binary segmentation with segment renormalisation. Per-sample quality was recorded as usable reads, bin count, median copy number and median absolute deviation (MAD). For Subject 260, diagnosis (IM_426) yielded 7,766,083 usable reads (median CN 0.979, MAD 0.198) and relapse (JBLAB-19323) 7,745,920 usable reads (median CN 0.940, MAD 0.224) over 103,199 bins — quality comparable to the other four subjects.

### 2.3 Breakpoint definition and architecture signature
A **breakpoint** was defined operationally as a segmented relative-CN level shift of ≥ 0.10 units between adjacent 30 kb bins (threshold `BP_THR = 0.10`), applied identically to every sample. We use "breakpoint" in this restricted, copy-number sense throughout; it is **not** equivalent to a validated structural-variant junction (see §2.5). For each subject we computed the diagnosis and relapse breakpoint counts, the raw relapse − diagnosis delta, the net gained count (summing only chromosomes that gained breakpoints), the number of chromosomes gaining breakpoints, and the fraction of new breakpoints falling on the single most-affected chromosome ("top-chromosome fraction").

A transparent, threshold-based heuristic assigned each dx→relapse transition to one of four descriptive signatures:
- **focal catastrophe (chromothripsis-like):** ≥ 50 net-gained breakpoints AND top-chromosome fraction ≥ 0.40 AND ≥ 3 oscillating CN levels on that chromosome;
- **dispersed stochastic CIN:** ≥ 50 net-gained breakpoints across ≥ 8 chromosomes AND top-chromosome fraction < 0.30;
- **intermediate rearrangement:** ≥ 20 net-gained breakpoints;
- **modest gain:** any positive net gain below the above thresholds.

These signatures are **descriptive pattern labels on segmented copy number**, not molecular diagnoses.

### 2.4 Candidate-gene copy-number readout
Relative copy number was extracted at six candidate resistance/loss genes using hg19 loci: *CCNE1* (chr19:30,302,805–30,315,215), *PALB2* (chr16:23,614,482–23,652,631), *PTEN* (chr10:89,623,195–89,728,532), *KEAP1* (chr19:10,596,796–10,614,417), *CUL3* (chr2:225,334,867–225,454,945) and *SLC31A1* (chr9:116,256,717–116,289,938). Calls used relative-CN bands: high-level amplification ≥ 2.5, gain ≥ 1.5, loss ≤ 0.8, deep loss ≤ 0.5, neutral otherwise. A gene was flagged as "changed" when its call differed between diagnosis and relapse.

### 2.5 Resolution ceiling (applies to all results)
Shallow WGS at 30 kb bins resolves **large copy-number alterations only** — broad or focal amplifications and losses spanning at least the bin scale. It does **not** detect single-nucleotide variants or indels, copy-number-neutral loss of heterozygosity, or sub-bin focal events, and it does **not** resolve structural-variant breakpoint junctions. Consequently, the "dispersed versus focal" distinction is a **pattern label on copy-number segments**, and no result here constitutes a chromothripsis *diagnosis*, which would require whole-genome junction-level resolution. Five matched pairs constitute a **pilot**, not a validation cohort; no finding is assigned a clinically validated tier.

---

## 3. Results

### 3.1 Dispersed CIN, not focal catastrophe, dominates relapse across the cohort
Across the five subjects, the dx→relapse architecture was overwhelmingly **dispersed** rather than focal (Table 1; Figure 1). Three of five subjects (191, 6, 260) met the dispersed stochastic CIN criteria: large net breakpoint gains distributed across many chromosomes (16–21 chromosomes) with low top-chromosome concentration (11.5–21.2%). **No subject met the focal-catastrophe criteria.** The remaining two subjects diverged in the opposite direction — Subject 119 showed an intermediate rearrangement pattern, and Subject 109, notably, *lost* breakpoints at relapse (−7) and simplified toward a modest-gain architecture concentrated on few chromosomes.

**Table 1. Diagnosis→relapse breakpoint architecture in five matched HGSOC pairs (QDNAseq, hg19, 30 kb sWGS).**

| Subject | dx → relapse breakpoints | Δ (raw) | Net gained | Chromosomes gained | Top-chrom fraction | Architecture signature |
|---|---|---|---|---|---|---|
| **191** | 127 → 380 | **+253** | 253 | 21 | 0.115 | **dispersed stochastic CIN** |
| **6** | 17 → 118 | **+101** | 101 | 20 | 0.119 | **dispersed stochastic CIN** |
| **260** (lead) | 75 → 135 | **+60** | 66 | 16 | 0.212 | **dispersed stochastic CIN** |
| 119 | 148 → 166 | +18 | 48 | 11 | 0.250 | intermediate rearrangement |
| 109 | 59 → 52 | −7 | 7 | 3 | 0.571 | modest gain |

The single most-affected chromosome never carried a majority of the new breakpoints in any dispersed-CIN subject (maximum 21.2% in Subject 260; as low as 11.5% in Subject 191). This is the defining feature of the dispersed signature: the change is *everywhere*, not concentrated in one broken territory.

### 3.2 Subject 260: a real, verified third replication of the dispersed pattern
Subject 260 — whose relapse genome we retrieved and checksum-verified for this study — gained a **net of 66 breakpoints** at relapse (raw relapse − diagnosis delta **+60**; 75→135), distributed across **16 chromosomes** (Figure 1B–C). The per-chromosome distribution was broad: chr1 +14, chr7 +10, chr6 +6, chr9 +5, chr2/chr10/chr12/chr19 +4 each, with smaller gains on chr3/4/5/8/13/16/17/21 and net losses on chr11 (−4) and chr14 (−2). The top chromosome (chr1) accounted for only **21.2%** of the new breakpoints. The signature classifier returned **dispersed stochastic CIN**.

This result is worth stating plainly against its origin. The analysis was prompted by a prior assertion of "+58 breakpoints" at relapse for this subject — a figure that, at the time, had no computed source. Computed on the actual reads with the same threshold applied to every subject, the real raw delta is **+60** (net +66). The original figure was therefore **essentially corroborated by measurement** (within two to three breakpoints of the real value), which is why Subject 260 anchors this paper: its structural premise survived direct computation rather than being asserted.

Placed beside Subjects 191 (+253 across 21 chromosomes, top-fraction 11.5%) and 6 (+101 across 20 chromosomes, top-fraction 11.9%), Subject 260 is the **third independent subject** to relapse through the identical dispersed architecture. A pattern seen once is an anecdote; seen in three of five matched pairs, with two clear counter-examples that behave differently, it is a reproducible mode of relapse within this pilot.

### 3.3 A Darwinian reading of the selection pressure
The architecture invites an evolutionary interpretation. Between the platinum-naïve diagnosis and the platinum-exposed relapse, the surviving clone in Subjects 191, 6 and 260 carries breakpoint gains scattered across 16–21 chromosomes. Under a Darwinian model, the platinum cycle is a **selective pressure** acting on a heterogeneous population of tumour cells; the relapse genome is the fittest survivor of that pressure. The dispersed, genome-wide character of the surviving architecture is consistent with selection having favoured **broad genomic plasticity** — a generally unstable, adaptable genome — rather than one specific structural lesion. In this reading, resistance is not a single mutation to be found but an **evolved phenotype**: the tumour that relapses is the one that could reshape its genome most freely under stress.

We are deliberate about what this does and does not assert. The data show the *outcome* of selection (the surviving clone's architecture); they do not directly observe the *process* (the clonal dynamics that produced it), which would require serial sampling and higher resolution. The selective-sweep interpretation is the most parsimonious account of a genome-wide, non-focal architecture appearing after a genome-wide stressor — but it remains an interpretation of a snapshot (see §3.4 and §4).

### 3.4 The focal "master-switch" hypothesis is not supported for Subject 260
A focal-catastrophe or "master-switch" model predicts that relapse is driven by a single dominant event — one chromosome shattered, one amplicon, oscillating states confined to a narrow territory. Subject 260 fails this test on its own data: the top-chromosome fraction is 0.212, far below the 0.40 focal threshold, and the change is spread over 16 chromosomes. The classifier returns *dispersed stochastic CIN*, not *focal catastrophe*. For this subject, the data therefore **refute a single-lesion master-switch** and support a distributed-instability account — the same conclusion reached across the dispersed-CIN subjects.

Two honest boundaries bound this claim. First, "dispersed versus focal" is a pattern label on 30 kb copy-number segments, not an SV-junction diagnosis; excluding a single-catastrophe *origin* with certainty requires whole-genome junction resolution (§2.5). Second, the magnitude of Subject 260's change (net +66) exceeds the descriptive divergence threshold we use elsewhere (a net breakpoint gain > 50), so the subject is correctly flagged as a high-structural-divergence relapse — but that flag is a **qualitative pattern call in a five-subject pilot, not a calibrated risk score**, and no clinical probability is attached to it.

### 3.5 An acquired, actionable lesion: PTEN loss at relapse
Reading relative copy number at the six candidate genes revealed one **acquired, directionally interpretable** change in Subject 260 (Table 2). *PTEN* moved from neutral at diagnosis to a **copy-number loss at relapse** (relative CN 0.967→0.692; Δ −0.275). PTEN loss de-represses the PI3K/AKT/mTOR signalling axis, and its acquisition specifically in the resistant clone nominates that axis as a **candidate second-line vulnerability** for this subject — a lesion the resistant genome revealed under selection.

**Table 2. Subject 260 candidate-gene relative copy number, diagnosis → relapse.**

| Gene | dx relative CN | relapse relative CN | Δ | Call (dx → relapse) | Note |
|---|---|---|---|---|---|
| **PTEN** | 0.967 | **0.692** | −0.275 | neutral → **loss** | *Acquired* loss; nominates PI3K/AKT/mTOR axis |
| *KEAP1* | 0.982 | 1.645 | +0.663 | neutral → gain | Structural gain — see caveat below |
| *CCNE1* | 1.036 | 0.875 | −0.162 | neutral → neutral | No amplification (contrast Subject 109) |
| *PALB2* | 0.950 | 0.979 | +0.029 | neutral → neutral | No change |
| *CUL3* | 0.999 | 0.977 | −0.022 | neutral → neutral | No change |
| *SLC31A1* | 0.719 | 0.699 | −0.020 | loss → loss | Stable low-level loss (platinum-import gene) |

Two caveats are integral to this result. The PTEN call is a **single relative-CN measurement from ~0.1× sWGS with no matched RNA or protein confirmation** — it is a hypothesis-generating flag, not a validated PTEN-loss determination and not a treatment recommendation. Separately, the observed *KEAP1* copy-number **gain** points in the *wrong direction* for the KEAP1 resistance mechanism, which operates through loss-of-function point mutation rather than copy gain; a CN gain does not create that phenotype and is explicitly not interpreted as resistance here. *SLC31A1*, a copper/platinum-import gene whose loss is mechanistically plausible for platinum resistance, was already at low-level loss at diagnosis and did not change — an example of a lesion that sWGS can see at the copy-number level but cannot, on its own, elevate to a validated resistance call.

---

## 4. Discussion

Across five matched HGSOC diagnosis→relapse pairs, the dominant structural mode of platinum-treated relapse was **dispersed, genome-wide copy-number instability**, not focal catastrophe. Three of five subjects — including Subject 260, whose relapse genome was retrieved and checksum-verified specifically for this study — relapsed through the same dispersed architecture, spreading new breakpoints across 16–21 chromosomes with no single chromosome carrying more than a fifth of the change. Two subjects behaved differently (one intermediate, one simplifying), which is itself informative: the dispersed signature is a reproducible but not universal outcome within this pilot.

**Selection versus induction.** The most important interpretive point is also the one most easily overstated. It is natural to describe platinum as "shattering" the genome, and the dispersed architecture at relapse is superficially consistent with such a picture. But a relapse biopsy reports only the surviving clone. The same architecture is equally consistent with platinum having **selected** a pre-existing chromosomally unstable subclone. We favour the selection interpretation on parsimony and evolutionary grounds — a genome-wide phenotype appearing after a genome-wide selective pressure is most simply explained as the survival of the most plastic clone — but we cannot exclude chemotherapy-driven **induction** of new instability, and we do not claim to. Resolving this is a concrete experimental question, not a rhetorical one: it requires serial sampling across treatment and junction-level resolution to date and phase the structural changes. Framing resistance as a Darwinian selective sweep is thus both the more defensible reading of these data and a more actionable one — it predicts that the resistant clone is an *evolved* entity whose vulnerabilities may be anticipated.

**Refining the chromothripsis narrative.** Chromothripsis is a compelling and well-documented phenomenon, but our data caution against defaulting to a focal-catastrophe explanation for HGSOC relapse. When the change is measured at the level of the whole karyotype in matched pairs, it is distributed, not concentrated. This does not exclude focal events in individual tumours or at resolutions we cannot access; it argues that the *typical* relapse architecture in this pilot is one of pervasive instability.

**Therapeutic implication of acquired PTEN loss.** The value of an evolutionary framing is that it converts resistance from a dead end into a target search. In Subject 260, the resistant clone acquired a PTEN copy-number loss — and PTEN loss activates the PI3K/AKT/mTOR pathway, a druggable axis. This nominates PI3K/mTOR-directed agents as a **candidate**, hypothesis-grade second-line strategy for this specific relapsed genome, and it illustrates a general principle: rather than treating dispersed CIN as an undruggable state of chaos, one can look within the resistant genome for the specific, acquired lesions that instability throws up, and match them to pathway-directed therapy. We emphasise the limits: this is one subject, one copy-number call, without orthogonal confirmation, and no outcome data — it motivates a targeted follow-up (confirming PTEN status by an orthogonal assay and testing PI3K/mTOR-axis association in a larger, outcome-annotated cohort), not a clinical decision.

**Relation to a platform view of resistance.** Read together, these results support an evolutionary-therapy posture: characterise the *change* between diagnosis and relapse per patient, recognise dispersed CIN as a common resistant architecture, and mine the resistant genome for acquired, actionable lesions such as PTEN loss that can be mapped to pathway-directed panels. The unit of analysis is the within-patient trajectory, and the goal is to anticipate and exploit the evolutionary outcome rather than to be surprised by it.

**Relation to prior resistance-prediction work.** This copy-number architecture analysis is complementary to, and methodologically distinct from, expression- and variant-level efforts to predict HGSOC platinum resistance. In particular, mesenchymal/EMT-axis expression markers have shown external-cohort predictive value for platinum resistance (for example, an EMT-associated marker reaching an area under the ROC curve of ~0.76 in an independent expression cohort), operating through a biology orthogonal to copy-number architecture. We note also a cautionary counterpoint from the same programme: a sparse-autoencoder, variant-level feature model initially appeared predictive but did not survive nested cross-validation, underscoring why the present work makes only within-subject descriptive claims and assigns no cross-validated performance metric to the copy-number signature. The dispersed-CIN architecture described here is intended to sit alongside such expression and variant readouts as an additional, mechanistically distinct layer of a resistance-characterisation panel — not to supersede them.

---

## 5. Limitations

This is a **five-subject pilot**, not a validation cohort; every finding is hypothesis-generating and none is assigned a clinically validated tier. Copy number was measured by **~0.1× shallow WGS at 30 kb bins**, which resolves large CNAs only and cannot detect SNVs/indels, copy-number-neutral LOH, sub-bin focal events, or structural-variant junctions; the "dispersed versus focal" signature is therefore a **descriptive pattern label**, not a molecular chromothripsis diagnosis. Because sWGS reports the surviving clone, **selection and induction cannot be distinguished** from these snapshots. There are **no outcome or survival data** in this analysis, so no prognostic or predictive claim is made. The **PTEN loss is a single copy-number call without matched RNA/protein**, and the *KEAP1* gain is directionally inconsistent with its known loss-of-function mechanism and is not interpreted as resistance. Finally, one cohort metadata field for these subjects carried an apparent column-shift artefact (a sex value appearing where histology was expected); we treat the samples as **high-grade serous ovarian carcinoma**, the histology of record for the cohort, and flag the field rather than propagate the artefactual value.

---

## 6. Future work

The central causal question — selection versus induction — is directly testable with (i) **serial sampling** across treatment to observe clonal dynamics rather than a single relapse snapshot, and (ii) **whole-genome, junction-level sequencing** to date structural events and formally test single-catastrophe origins against distributed accrual. The dispersed-CIN signature should be evaluated in a **larger, outcome-annotated cohort** to establish prevalence and any association with progression-free survival. The Subject 260 PTEN finding should be confirmed by an **orthogonal assay** (targeted sequencing or IHC/protein) and tested for **PI3K/mTOR-axis therapeutic association** prospectively. Together these would move the present hypotheses toward validated, decision-supporting evidence.

---

## Ethics and data access
Human tumour sequencing data derive from the BriTROC-1 study and are held under controlled access at the European Genome-phenome Archive. All data used here were obtained under authorised access governed by the archive's data-access committee, and were analysed in de-identified form; no attempt was made to re-identify participants. This secondary computational analysis introduced no new patient contact or intervention. Ethical approval for the original sample collection is covered by the primary BriTROC-1 study governance. [Institutional review / data-use-agreement reference numbers TBD.]

## Data and code availability
Sequence data derive from the BriTROC-1 study under controlled access at the European Genome-phenome Archive (dataset `EGAD00001011049`, study `EGAS00001007292`); access is governed by the archive's data-access committee. Derived, non-identifying analysis outputs supporting every quantitative statement in this manuscript are provided as receipt files: the five-subject architecture table (`breakpoint_architecture_with_subj260.csv`), the Subject 260 analysis record and QC (`subj260_analysis_meta.json`, `subj260_cn_qc.csv`), the Subject 260 per-chromosome breakpoint distribution (`subj260_breakpoint_delta_by_chrom.csv`), and the Subject 260 candidate-gene copy-number table (`subj260_gene_cn_dx_vs_relapse.csv`). Figure 1 is provided as `fig_ranked_signals_and_breakpoints.png`.

## Author contributions
F.K. conceived the study, directed the analysis, and wrote the manuscript. [Additional contributions TBD.]

## Competing interests
F.K. is affiliated with Brenus Pharma / CrisPRO. [Full competing-interest statement TBD.]

## Funding
[TBD.]

## References
1. The Cancer Genome Atlas Research Network. Integrated genomic analyses of ovarian carcinoma. *Nature* 2011;474:609–615. doi:10.1038/nature10166.
2. Stephens PJ, Greenman CD, Fu B, et al. Massive genomic rearrangement acquired in a single catastrophic event during cancer development. *Cell* 2011;144:27–40. doi:10.1016/j.cell.2010.11.055.
3. Bakhoum SF, Cantley LC. The multifaceted role of chromosomal instability in cancer and its microenvironment. *Cell* 2018;174:1347–1360. doi:10.1016/j.cell.2018.08.027.

---

*Figure 1. Real-data validation across the BriTROC-1 sWGS pilot (five matched diagnosis→relapse pairs). (A) Ranked candidate biomarker signals by best external-cohort concordance (context panel). (B) Breakpoint burden at diagnosis versus relapse for all five subjects, with the dx→relapse delta annotated; Subject 260 highlighted. (C) Rearrangement geometry — chromosomes gaining breakpoints versus top-chromosome focus fraction — separating the dispersed-CIN subjects (low focus, many chromosomes) from the focal zone; point size proportional to net breakpoints gained. Panels reflect the values in Table 1. File: `fig_ranked_signals_and_breakpoints.png`.*
