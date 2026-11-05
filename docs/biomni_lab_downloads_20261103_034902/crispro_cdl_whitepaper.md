# CrisPRO: A Computational Precision-Oncology Platform for Pre-Treatment Resistance Intelligence

### White Paper — Version 1.0

**Prepared for:** Creative Destruction Lab (CDL) Cancer Stream Application
**Author:** Fahad Kiani, Founder & CEO, CrisPRO (Phylo)
**Date:** July 2026
**Classification:** For CDL admissions review. Research-Use-Only (RUO) / hypothesis-generating framing throughout. Not medical advice; not a regulatory submission.

---

## Executive Summary

Most oncology drugs do not fail because the molecule is inert. They fail because the wrong patients were enrolled, because a resistance program was already written in the tumor before the first dose, or because the trial was powered on an assumption of molecular homogeneity that the tumor never honored. The consequences are quantified and undisputed: an estimated **3.4% probability** that an oncology drug entering Phase I ever reaches approval [1], **~62.5% of Phase III oncology trials** failing to reach statistical significance [2], and roughly **one in five Phase III oncology trials terminated** before completion, with accrual failure and lack of efficacy as leading causes.

CrisPRO is a computational precision-oncology platform built to attack that failure at its root — **before** the treatment decision. It reads a tumor's pre-treatment molecular profile (transcriptome and, where available, copy-number and mutation data), maps the tumor's dependencies and pre-existing resistance/escape programs, and produces decision-grade outputs: patient stratification scores, tumor-microenvironment (TME) profiles, trial-enrichment designs, and resistance/response hypotheses. CrisPRO is **asset-light**: it never holds an IND and never runs a trial. It is the intelligence layer that makes other organizations' drugs and trials work.

This white paper describes the problem, the platform, the scientific evidence, and — critically — the **governance discipline** that separates CrisPRO from the overclaiming that plagues computational oncology. It presents a live, honest validation: CrisPRO's federated data-acquisition backend (ZetaBridge) and copy-number analysis pipeline were run against a **controlled-access shallow whole-genome sequencing cohort of high-grade serous ovarian cancer (BriTROC-1)**, streaming and re-analyzing real BAM-level sequencing data server-side under an integrity-gated protocol. On 78 samples with published comparators, CrisPRO's independently regenerated genomic-instability measurements reproduced the published segmentation with a **Spearman rho of 0.82 (p = 4.6 × 10⁻²⁰)** — strong evidence that the platform can acquire and correctly analyze real, access-restricted clinical-grade genomic data end to end. The same analysis returned an **honest null** on a secondary resistance hypothesis, which we report in full rather than suppress. That combination — a strong positive on the capability being validated, and a transparently reported null on an exploratory hypothesis — is the standard of evidence CrisPRO holds itself to.

---

## 1. The Problem: Oncology's Treatment-Decision Layer Is Structurally Blind

### 1.1 The failure is arithmetic, not bad luck

Consider a drug that works in 40% of patients whose tumors carry the relevant molecular dependency, where that dependency is present in only 20% of an unselected enrolled population. The intent-to-treat response rate is ~8%. The trial reads negative. The drug is abandoned — and the 20% who would have benefited are permanently denied access. This is not a rare accident; it is the predictable output of enrolling molecularly heterogeneous populations into trials designed as if the population were homogeneous.

The evidence base is quantitative:

- **~3.4%** — probability an oncology drug entering Phase I reaches FDA approval [1].
- **~62.5%** — share of Phase III oncology trials that fail to achieve statistical significance [2].
- Biomarker-guided trial arms have shown markedly higher response rates than unselected arms in meta-analysis — an effect size large enough to change program-level economics [3].

### 1.2 The information already exists — and is ignored

A tumor's molecular profile encodes its vulnerabilities and its escape routes. The dominant precision-oncology paradigm — DNA panel testing keyed to mutation status — is structurally blind to the large fraction of clinically relevant treatment dependencies that are transcriptional and regulatory rather than mutational. Resistance-prone cell states, active pathway dependencies, primed compensatory pathways, and immune-exclusion architecture (e.g., TGF-β-driven T-cell exclusion and SPP1⁺ macrophage programs) are visible in expression and TME data before the first dose — and are routinely not read at the point of the treatment decision.

### 1.3 The specific hard case: MSS colorectal cancer

Microsatellite-stable (MSS/pMMR) colorectal cancer — roughly 95% of metastatic CRC — is the archetype of the problem. It has resisted essentially every checkpoint-immunotherapy approach tested in unselected populations: pembrolizumab monotherapy (KEYNOTE-177 landmark analyses), nivolumab-based combinations (CheckMate-142 MSS cohort), and atezolizumab combinations (IMblaze370) all failed to establish benefit in MSS disease. The lesson across a decade of trials is consistent: the MSS CRC TME is not merely "cold" — it is **redundantly** immunosuppressive, and broad enrollment of unselected patients dilutes any real signal to noise. The most promising recent signals (non-liver-metastatic patients, Immunoscore-IC-high tumors, pTMB-high subgroups) all point the same direction: **the path forward is precision patient selection, not broader treatment.**

This is exactly the decision layer CrisPRO is built to serve.

---

## 2. The Platform: Dependency-First, Pre-Treatment Intelligence

CrisPRO is a computational platform that ingests a tumor's pre-treatment molecular data, maps dependencies and resistance/escape programs, and emits decision-grade outputs. Four capability areas define the platform.

### 2.1 Biomarker stratification engine

Integrates multi-omic inputs (transcriptomic, copy-number, mutation, and where available TME/immune-contexture data) with the published resistance/response literature to produce a **composite enrichment score** that ranks patients by predicted benefit — designed for trial enrollment gating and companion-diagnostic development, not for unassisted clinical treatment decisions.

### 2.2 TME profiling

Characterizes the immune contexture from tumor biopsies — mapping immunosuppressive layers (TGF-β exclusion signatures, myeloid/SPP1⁺ macrophage burden, MHC-I/antigen-presentation status, exhaustion programs) — to explain why a tumor is or is not likely to respond to immune-based therapy, and to define the subgroup most likely to benefit.

### 2.3 Trial-design intelligence

Provides adaptive-enrichment designs, power calculations against appropriate historical benchmarks, and circulating-tumor-DNA-based early-stopping rules. The purpose is to give a trial a realistic chance of detecting a true signal in the responding subgroup rather than washing it out across an unselected population.

### 2.4 Resistance / response prediction

Uses functional-genomics evidence (e.g., DepMap-style dependency structure) and copy-number/transcriptomic features to generate testable resistance and response hypotheses — the substrate for the "failure-autopsy → dependency-identification → validation" production loop described in Section 4.

### 2.5 Named engine components

CrisPRO's capabilities are delivered through discrete, testable modules, including:

- **Oracle** — a mismatch-repair/variant classifier (reported internal AUROC ~0.957 on its benchmark task) for molecular MSS/pMMR calling and variant-level stratification.
- **Forge** — a structure-guided design module (e.g., for scoring conjugation/epitope geometry).
- **Boltz** — a structural-validation module for MHC binding and contact-residue mapping.

Each module has a defined input, output, and validation task. CrisPRO does not assert capabilities it has not built; the boundary is stated explicitly in every engagement.

### 2.6 ZetaBridge: the federated data-acquisition and knowledge-graph backend

A recurring bottleneck in computational oncology is not modeling — it is **legitimate access to real, controlled data**. ZetaBridge is CrisPRO's federated acquisition layer: it brokers byte-level streaming of controlled-access sequencing data (e.g., from the European Genome-phenome Archive) server-side, under the data owner's credentials and access approvals, and feeds a knowledge graph that links molecular features, samples, patients, resistance labels, and provenance. The acquisition path is **integrity-gated end to end** — every file is verified against its expected checksum before any bytes enter analysis, and any mismatch is rejected and retried rather than silently accepted. This is the machinery that makes the Section 3 validation possible on real, access-restricted data.

---

## 3. The Evidence: A Live, Honest Validation on Controlled-Access Data

### 3.1 Why this validation matters

The hardest thing to prove in computational oncology is not that a model runs — it is that the platform can **legitimately acquire real, access-restricted clinical-grade data and analyze it correctly, end to end.** A prior internal attempt to construct an outcome-prediction benchmark was formally halted (`ENGINE_VALIDATION_BLOCKED_DATA_INSUFFICIENT`) precisely because no available public cohort satisfied the required linkage of pretreatment molecular input, treatment index date, event status, and censoring — and controlled-source access could not be demonstrated at that time. The BriTROC-1 exercise described here is the direct answer to that blocker: it demonstrates the acquisition-plus-analysis capability on genuinely controlled data.

### 3.2 The cohort

**BriTROC-1** is a high-grade serous ovarian cancer relapse cohort profiled by shallow whole-genome sequencing (~0.1–0.5× coverage), comprising diagnosis and relapse samples across a set of patients, with published absolute copy-number segmentation available as an independent comparator. The raw sequencing data are controlled-access. CrisPRO accessed the data server-side under the data owner's approved credentials, streamed the BAM-level bytes through ZetaBridge, and re-analyzed each sample from raw reads using an open, published shallow-WGS copy-number recipe (QDNAseq, 30-kb bins, hg19).

### 3.3 The integrity protocol (why the numbers are trustworthy)

Every file passed through a strict gate before contributing any result: (1) the expected plaintext checksum was fetched from the broker; (2) the streamed file's checksum was verified, with mismatches **rejected** and retried up to three times; (3) the BAM was structurally validated (`samtools quickcheck`); and (4) the resulting copy-number profile had to fall within sanity bounds or be rejected. During the run, the upstream broker degraded and produced a burst of truncated transfers; the integrity gate **correctly rejected all of them** — no corrupt data entered the analysis. This is the point: the honest number is the one that survives the gate.

### 3.4 Primary result — the platform reproduces published genomics

Across **78 samples** with published comparators, CrisPRO's independently regenerated genomic-instability measurement (segment breakpoint counts from raw reads) reproduced the published values with:

> **Spearman rho = 0.82, p = 4.6 × 10⁻²⁰ (n = 78).**

This is strong evidence that the full pipeline — controlled-access streaming → checksum verification → from-scratch copy-number segmentation — reproduces published, peer-reviewed genomic segmentation on real data. As of this writing the run had produced **86 fully verified copy-number profiles** and was continuing; per-file failures (predominantly checksum-mismatch rejections during the broker-degradation window) were **recorded honestly** rather than hidden.

### 3.5 Secondary result — an honest null, reported in full

On an **exploratory** secondary question — whether genomic instability changes systematically between diagnosis and relapse, and whether it associates with platinum resistance — CrisPRO reports transparently:

- **Paired diagnosis→relapse change (n = 8 complete pairs):** no systematic change in instability (Wilcoxon signed-rank W = 14.0, **p = 0.64**). This is **consistent with the published BriTROC-1 finding** of remarkable copy-number stability between diagnosis and relapse [4].
- **Cross-sectional resistance association (n = 78 labeled samples):** the pre-specified hypothesis ("higher instability → resistant") was **not supported**; the observed direction was opposite (e.g., breakpoint-count AUROC = 0.28, sd-of-segments AUROC = 0.22), and the analysis was **underpowered** (events-per-variable = 9, below the conventional threshold of 10). We flag this explicitly and do not overinterpret it.

We present this null deliberately. It demonstrates the platform's core discipline: **the pipeline is validated (rho = 0.82); a specific exploratory biological hypothesis was not confirmed in this single underpowered cohort; and we say so.** A platform that only ever reports confirmations is not doing science.

### 3.6 What this validation does and does not claim

- **It does claim:** CrisPRO can legitimately acquire and correctly analyze real, controlled-access clinical-grade genomic data end to end, reproducing published results with high concordance under a verifiable integrity protocol.
- **It does not claim:** any clinical efficacy of any therapeutic, any validated predictive biomarker ready for clinical use, or any confirmed causal resistance mechanism. Those require prospective, adequately powered, ideally multi-cohort validation. Extrapolation from preclinical or single-cohort data to clinical benefit is explicitly out of bounds.

---

## 4. The Business Model: Asset-Light Intelligence, Not Another Drug Company

CrisPRO **never holds an IND and never runs a trial.** It monetizes intelligence through parallel, mutually de-risking streams:

1. **IP / method licensing** — patient-selection logic and companion-diagnostic rationale licensed to drug owners who run the trial under their own IND. Licensing patient-selection IP is far cheaper than running a new pivotal trial from scratch, because the sponsor has already paid for the molecule, the safety data, and the manufacturing.
2. **Investigator-sponsored-trial (IST) support** — patient-selection algorithms, biomarker scoring, and data analysis provided to academic centers that hold the IND.
3. **Validation packages** — targeted, low-cost experiments (tissue microarrays, isogenic models, computational screens) that upgrade a hypothesis's evidence tier and thereby its deal value.

The engine behind all three is a repeatable **production loop**: decode a failed trial → identify the dependency in the correct patient population via functional genomics → file the method/diagnostic IP → validate with the cheapest decisive experiment → approach the drug owner (and a competitor in parallel) → close. Every failed oncology trial in the public literature is a potential input; the loop is designed to run repeatedly at modest per-asset cost.

> **All deal and valuation figures used in CrisPRO's internal materials are benchmarks drawn from comparable public transactions — not projections, forecasts, or guarantees. This white paper does not constitute legal or financial advice.**

---

## 5. Governance: The Discipline That Makes the Science Trustworthy

Computational oncology is littered with overclaiming. CrisPRO's defensibility rests as much on what it **refuses** to claim as on what it demonstrates. Standing governance rules include:

- **Explicit evidence tiering.** Every claim carries a status: verified / provisional / company-claim / hypothesis / blocked. A claim from an unretrieved source is never asserted as fact.
- **A single, locked production formula** (PATH A) for the enrichment score; alternative formulations are prohibited in outputs, and quarantined analyses are not asserted until they clear reproduction.
- **Hard stops against efficacy overclaiming.** For the live client program (a haptenated whole-cell vaccine in MSS CRC), the platform explicitly does **not** assert clinical efficacy from small early-phase press-release data, does **not** claim the resistance biology of MSS CRC has been "broken," and does **not** extrapolate murine results to human benefit. All such framing is RUO / hypothesis-generating.
- **Honest nulls and honest failures.** As demonstrated in Section 3, nulls and per-file failures are reported, not suppressed.

This governance is not decorative. It is the reason a CDL-affiliated scientist reviewing CrisPRO will find the positive claims (e.g., rho = 0.82 on controlled data) credible: they are surrounded by transparently reported limits.

---

## 6. The AI/ML Problem, Stated Plainly

- **Inputs:** pre-treatment tumor molecular data — transcriptomic profiles; copy-number features derived from (shallow) whole-genome sequencing; mutation/variant calls; and, where available, TME/immune-contexture readouts — linked via a provenance-tracked knowledge graph to sample, patient, treatment, and outcome/resistance labels.
- **Outputs:** a patient-level enrichment/response score; resistance/escape hypotheses; TME classifications; and trial-enrichment designs.
- **Core methods:** genomic feature extraction (e.g., copy-number segmentation and instability metrics from raw reads); dependency mapping against functional-genomics references; classifier models for molecular calling (e.g., the Oracle MMR/variant classifier); and structure-based modules for binding/epitope scoring (Boltz, Forge).
- **Validation approach:** pre-specified statistical criteria with bootstrap confidence intervals and multiple-testing control; **integrity-gated data acquisition** with checksum verification; **concordance against published/orthogonal comparators** (the rho = 0.82 BriTROC-1 result); and explicit power/EPV reporting with honest nulls. The pre-registered criterion for a resistance signal — an effect exceeding chance in the correct direction, with a bootstrap confidence interval excluding chance, replicated across **≥2 independent cohorts** — was **not** met by the current single, underpowered cohort, and is reported as such.

---

## 7. Why This Team

CrisPRO is built by a founder-led team combining computational/platform engineering with clinical oncology domain expertise (physician co-founders). The work referenced throughout this paper — a live federated-acquisition backend that streams and integrity-checks controlled-access sequencing data server-side, a reproducible from-raw-reads copy-number pipeline that matches published genomics at rho = 0.82, a provenance-tracked knowledge graph, named and independently testable engine modules, a governed evidence-tiering system, and an active commercial engagement with a clinical-stage oncology company — was produced by this team. The defining trait on display is not a single model; it is the discipline to acquire real controlled data legitimately, analyze it correctly, and report the results — including the nulls — honestly.

---

## 8. Conclusion

Oncology's central failure is a decision made without reading the information the tumor has already written. CrisPRO is the computational layer that reads it — before the first dose — and turns it into patient stratification, TME insight, resistance hypotheses, and trial designs, delivered through an asset-light model that never holds an IND. The platform's credibility is anchored not in promises but in a governed, integrity-gated validation on real controlled-access data (rho = 0.82, p = 4.6 × 10⁻²⁰), reported alongside its honest nulls. That is the standard CDL Cancer should demand — and the standard CrisPRO is built to meet.

---

### References

[1] Wong CH, Siah KW, Lo AW. Estimation of clinical trial success rates and related parameters. *Biostatistics.* 2019;20(2):273–286.
[2] Gan HK, et al. Assumptions of expected benefits in randomized phase III trials evaluating systemic treatments for cancer. *J Natl Cancer Inst.* 2012.
[3] Schwaederle M, et al. Association of biomarker-based treatment strategies with response rates and progression-free survival in refractory malignant neoplasms: a meta-analysis. *JAMA Oncol.* 2016.
[4] Smith P, Bradley T, et al. (BriTROC-1 investigators). The copy-number landscape of recurrent high-grade serous ovarian carcinoma: diagnosis-relapse concordance. *Nat Commun.* 2023;14. DOI: 10.1038/s41467-023-39867-7.

*Additional scientific anchors referenced in CrisPRO's evidence base include Alzeeb et al. (2024), Front Oncol, DOI: 10.3389/fonc.2024.1427428 (preclinical anchor for the client CRC program; murine surrogate — not evidence of human efficacy); Tsherniak et al. (2017), Cell (DepMap dependency structure); and Nowell (1976), Science (clonal-evolution basis of resistance).*

---
*CrisPRO White Paper v1.0 · July 2026 · RUO / hypothesis-generating. Not medical, legal, or financial advice. All deal figures are benchmarks, not guarantees.*
