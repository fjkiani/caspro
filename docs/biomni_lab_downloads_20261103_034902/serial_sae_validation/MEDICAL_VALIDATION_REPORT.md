# Medical / Clinical-Evidence Validation Report — Serial SAE (HGSOC Platinum Resistance)

**Artifact validated:** `publications/04-technical-deep-dives/serial-sae/` (Post-Treatment Molecular Features Predict Platinum Resistance in HGSOC — discovery + external validation proof-of-concept)
**Validation date:** 2026-07-19
**Validation mode:** Independent re-analysis from primary open-access sources, 5 parallel worker streams
**Classification:** Research Use Only (RUO). No regulatory clearance implied. Nothing here constitutes a clinical claim.

---

## §0 — What "clinically validated" means here (and what it does not)

"Clinically validated" in this report does **not** mean clinically proven, cleared, or fit for patient care. It means the quantitative and biological claims in the artifact were subjected to **independent evidentiary rigor**:

1. **Reproduction** — headline numbers were re-derived from the primary data (raw GEO scRNA-seq matrix; BriTROC-1 open-access supplementary copy-number signatures), not copied from the manuscript.
2. **Honest evidence tiering** — each claim is graded SUPPORTED / OVERSTATED / DISCREPANT / CONTEXT / NOT REPRODUCED / UNVERIFIABLE.
3. **Clinical-utility framing** — the artifact is placed on an evidence-tier ladder with an explicit roadmap to what real clinical validation would require.

No data were fabricated or simulated. Where a claim could not be reproduced, that is stated plainly. Original files are preserved; corrections are applied in place with provenance annotations.

**Bottom line:** This is a **hypothesis-generating, discovery-grade** artifact. The external copy-number finding reproduces essentially exactly and is the strongest element. The single-cell discovery cohort's headline correlations **do not reproduce** from the raw data and require correction. Neither cohort establishes clinical utility.

---

## §1 — Executive summary and pivotal findings

The artifact is honest about several of its own limitations (it discloses low EPV, no cross-validation, no FDR correction, median-split leakage, and states "external validation is required before any clinical claims"). Validation confirmed those disclosures and surfaced additional material issues.

### Pivotal finding 1 (NEW, most consequential) — the discovery-cohort headline statistics do not reproduce

Re-analyzing GSE165897 from the **raw GEO UMI matrix** (51,786 cells, 11 patients, all 32 pathway genes present, SHA-verified) using the **manuscript's own stated gene sets** and its documented pseudobulk pipeline (sum UMI → CPM → log2(CPM+1) → mean over pathway genes):

| Discovery claim | Manuscript | Independent reproduction | Verdict |
|---|---|---|---|
| post-DDR ρ vs PFI | **−0.711, p=0.014** | **−0.209, p=0.537** | **NOT REPRODUCED** |
| post-PI3K ρ vs PFI | **−0.683, p=0.020** | **+0.109, p=0.750** (sign flips) | **NOT REPRODUCED** |
| post-PI3K AUC | **0.750** | 0.357 (corrected labels) / 0.500 (manuscript labels) | **NOT REPRODUCED** |
| post-DDR AUC | 0.714 | 0.571 (corrected) / 0.750 (manuscript labels) | Partially reproduced only under 8R/3S |
| KM post-DDR log-rank | **p=0.0124** | p=0.072 | **NOT REPRODUCED** |
| Pathway deltas non-predictive | null | null (all |ρ|<0.3, p>0.3) | **REPRODUCED** |

The provenance is airtight (0 missing genes, correct 30,025 post-NACT / 21,761 treatment-naïve cell split, 22 pseudobulk groups, 11 paired patients). The discovery correlations and survival result — the artifact's strongest-stated discovery signals — are **not recoverable from the primary data under the documented methodology**. Only the delta-null result reproduces, and (under the manuscript's own 8R/3S labels only) the post-DDR AUC of 0.75.

> This does not mean the underlying hypothesis is wrong; it means the specific discovery numbers as published are not supported by an independent re-run and must be corrected or re-derived with a fully specified, deposited pipeline.

### Pivotal finding 2 (STRONG POSITIVE) — the external BriTROC-1 result reproduces almost exactly

Independently rebuilding the BriTROC-1 cohort from the open-access Nature Communications supplementary files (CN-signature exposures + clinical response), the external validation reproduces to 3 decimal places:

| BriTROC claim | Manuscript | Independent reproduction | Verdict |
|---|---|---|---|
| CN s7 relapse AUROC | 0.874 | **0.8739** | SUPPORTED (exact) |
| 95% CI | 0.750–0.974 | 0.762–0.972 | SUPPORTED |
| Wilcoxon p | 0.035 | **0.035** | SUPPORTED (exact) |
| s7 diagnosis AUROC | 0.694 | **0.6937** | SUPPORTED (exact) |
| s7 improvement (relapse − diagnosis) | +0.180 | **+0.1802** | SUPPORTED (exact) |
| s6 improvement | +0.262 | **+0.2613** | SUPPORTED |
| s4 improvement | 0.000 | **0.000** | SUPPORTED |
| cohort 47 paired → 40 labeled → resistant | resistant count | 47 → 40 → **3 resistant** | SUPPORTED (see finding 3) |
| mean s7 resistant vs sensitive | 0.328 / 0.157 | **0.328 / 0.157** | SUPPORTED (exact) |

This is a genuinely reproducible external analysis. Its interpretation, however, is bounded by only **3 resistant patients** (findings 3–4).

### Pivotal finding 3 (MATERIAL DISCREPANCY) — resistant-count and label inconsistencies

- **Discovery label split:** The manuscript states **8 resistant / 3 sensitive** (EOC227 = resistant). The repository's own corrected `resistance_labels.json` (revised 2026-05-09 from the source Table 1) says **7 resistant / 4 sensitive**, with **EOC227 = sensitive** (PFI 230 d ≥ 180 d). The package is internally inconsistent with its own corrected source of truth. The corrected 7R/4S split is canonical; the manuscript's 8R/3S is retained side-by-side for provenance.
- **External resistant count:** Some manuscript tables state BriTROC has **10 resistant** patients; the validation-results file and the independent reproduction both give **3 resistant** (of 40 labeled). The "10" is stale. Correct value: **3 resistant / 37 sensitive**.

### Pivotal finding 4 (OVERSTATED) — n=3 fragility and clinical-utility framing

- With only 3 resistant patients, EPV for the external cohort is 3.0; for discovery it is 1.0–1.33. **Every model is far below the EPV ≥ 10 convention.**
- Leave-one-resistant-out on the s7-relapse AUROC gives a range of **0.865–0.892** — the *central estimate is stable*, but the confidence interval remains wide (0.76–0.97) and rests on 3 events. Frame precisely: **stable point estimate, wide uncertainty**, not "excellent discrimination."
- AUROC is a discrimination metric, not clinical utility. There is no calibration, no decision-curve / net-benefit analysis, no prespecified locked threshold. **Prognostic association ≠ predictive clinical utility.**

### Pivotal finding 5 (OVERSTATED / DISCREPANT) — prognostic vs predictive vs monitoring; internal contradictions

- The artifact's own audit (`AUDIT_REPORT_JAN29.md`) shows the package establishes **prognostic** value (high post-treatment score → shorter PFI) but **not temporal prediction**. The OV-045 red-team (MSK-Spectrum) found the resistance signal present continuously (tumor fraction 1.0% at day 56, 0.8% at day 362), so "detect resistance 3–6 months before progression" is unsupported and behaves like a chronic-risk flag. Downgrade "serial monitoring / early detection" to **dynamic risk stratification**.
- **Introduction/Results contradiction:** the Introduction states "pathway *changes* during treatment predict resistance," but the Results show deltas are null — the opposite. The core thesis is that absolute post-treatment *state* predicts. Introduction wording must be corrected.
- **Stale data-status text:** MSK-Spectrum is described as "dbGaP pending" but the audit states it is possessed locally. Low impact (MSK-Spectrum is controlled-access and not used in this validation), but should be reconciled.

---

## §2 — Discovery reproduction (GSE165897), both label splits

**Source:** Zhang et al., *Science Advances* 2022, DOI 10.1126/sciadv.abm1831 (PMC8865800); GEO GSE165897.
**Method (as documented):** pseudobulk = sum UMI per patient × timepoint → CPM → log2(CPM+1); pathway score = mean over the manuscript's gene sets (DDR 14 genes, PI3K 10, VEGF 8); Spearman ρ vs PFI (days); ROC for resistant (PFI<180 d) vs sensitive; KM by median split; seed 42.

**Provenance checks (all pass):** 51,786 cells; 11 patients; 32,847 genes in matrix; 32/32 pathway genes found (0 missing); phase split post-NACT 30,025 / treatment-naïve 21,761; 22 pseudobulk groups; 11 paired patients matched; UMI SHA-16 `d604a459df7e5e70`.

**Result:** Under **both** the corrected 7R/4S and the manuscript 8R/3S label maps, the discovery correlations are weak and non-significant (post-DDR ρ = −0.209, p = 0.537; post-PI3K ρ = +0.109, p = 0.750; post-VEGF ρ = −0.155, p = 0.650; composites ρ ≈ −0.16 to −0.25, p ≥ 0.45). KM post-DDR log-rank p = 0.072 (not 0.0124). The only reproduced positive is the **delta-null** result. Note the correlation values are label-independent (Spearman ρ vs continuous PFI does not depend on the binary split); the AUCs are label-dependent, and post-DDR AUC reaches 0.75 only under the manuscript's 8R/3S split.

**Interpretation:** The published discovery statistics are not reproducible from the primary data using the documented methodology and the manuscript's own stated gene sets (DDR=14, PI3K=10, VEGF=8). A confirmatory sensitivity analysis using the *committed script's* smaller/non-standard gene sets (DDR=8, PI3K=5, VEGF=4, with the `mTOR`/`VEGFR1/2` alias issues those sets carry) was planned as a secondary check but was **not completed** (the worker did not finish), so this report does not claim a result for it. Note, however, that the committed script applies only a monotonic rescale (÷15) on top of the same mean-over-genes summary, which cannot change Spearman ρ or AUC rank-order; the smaller sets are therefore not expected to recover the published values, but this was not independently confirmed here and remains an open item for re-derivation. The correct honest posture is that the discovery cohort demonstrates a *directional hypothesis* (deltas do not predict; absolute post-treatment state is the candidate signal) but **the specific effect sizes and p-values as published are not supported** by the completed re-analysis (W1) using the manuscript's gene sets.

---

## §3 — External reproduction (BriTROC-1), exact

**Source:** BriTROC Consortium (Smith, Bradley, Morrill Gavarró, et al.), *Nature Communications* 2023, DOI 10.1038/s41467-023-39867-7 (PMID 37474499). Open-access supplementary: figure_4A CN-signature exposures (1,855 rows) + clinical response (MOESM4).
**Method:** separate diagnosis (arx) / relapse (rlps) timepoints; ROC AUC with 1000-iteration bootstrap 95% CI; Wilcoxon rank-sum; improvement = relapse AUC − diagnosis AUC; seed 42.
**Cohort:** 47 paired CN samples → 40 with first-line clinical labels → **3 resistant / 37 sensitive** (overall first-line labels: 212 sensitive, 35 resistant).

All headline BriTROC numbers reproduce to 3 decimals (table in §1, finding 2). The s7-at-relapse improvement over diagnosis (+0.180) and the s6 improvement (+0.262) reproduce; s4 improvement is 0.000, as claimed. Direction of effect (higher s7 at relapse → resistant) reproduces (mean 0.328 vs 0.157).

**Caveat surfaced by reference verification:** The BriTROC-1 paper's own headline conclusion is that the HGSOC genome remains **largely stable between diagnosis and relapse** and that acquired resistance does **not** select for common CN drivers. This is not strictly contradictory with a signature being *more discriminative* at relapse (s7 is exposure/dosage, not a discrete driver event), but the tension should be stated: the +0.18 AUROC shift rests on 3 resistant patients and is a discrimination shift, not evidence of resistance-driven genomic remodeling.

---

## §4 — ML / statistical rigor

| Topic | Finding | Verdict |
|---|---|---|
| EPV | Discovery 3-feature EPV 1.0 (8R3S) / 1.33 (7R4S); single-feature 4.0; BriTROC single-feature 3.0. All ≪ 10. | SUPPORTED (disclosed; quantified) |
| Class imbalance / fragility | 3 resistant in BriTROC; leave-one-resistant-out AUROC 0.865–0.892 (stable center) but CI 0.76–0.97 (wide). | OVERSTATED (fragility under-emphasized) |
| No cross-validation on discovery | Discovery AUCs/correlations are apparent (full-sample, n=11); optimistic. | SUPPORTED (disclosed) |
| Multiple testing | BH-FDR across the 7 *as-published* discovery tests: 6/7 survive FDR<0.05 (only post-VEGF fails). **Note:** this applies to the manuscript's reported p-values; the independent reproduction (§2) does not reproduce those p-values in the first place. | OVERSTATED (no correction applied by manuscript) |
| KM median-split leakage | Median computed on the same n=11 used for discovery → optimistic log-rank. | SUPPORTED (disclosed) |
| Effect-size framing | AUROC is discrimination, not utility; no calibration / decision curve / locked threshold. | CONTEXT |

---

## §5 — Claim consistency, biology, and internal contradictions

- **Label split (7R/4S vs 8R/3S; EOC227):** DISCREPANT — corrected file canonical.
- **BriTROC cohort sizes (47 → 40 → 3):** reconcilable; state explicitly; correct the stray "10 resistant."
- **Prognostic vs predictive vs monitoring:** OVERSTATED — downgrade monitoring/early-detection to dynamic risk stratification.
- **MSK-Spectrum status text:** DISCREPANT (stale) — low impact; not used here.
- **Introduction vs Results on delta:** DISCREPANT — Introduction contradicts the delta-null finding.
- **Biological coherence:** SUPPORTED (direction only). Post-DDR-high → resistant is consistent with platinum killing via DNA crosslinks and selection of repair-proficient cells. CN signature 7 is associated with CCNE1 amplification, a recognized platinum-resistance / HR-proficiency mechanism (mutually exclusive with BRCA loss). PI3K is plausible but weaker and gene-set-sensitive. Direction plausible ≠ substitute for power/validation.

---

## §6 — Clinical-utility framing (RUO)

- **Evidence tier:** Tier 3 — discovery / internal-only, hypothesis-generating (RUO).
- **Intended use (RUO):** exploratory research-use-only prognostic biomarker concept — post-treatment (residual) molecular state associated with platinum resistance in HGSOC. **Not** for clinical decision-making.
- **What is shown:** (1) an independently reproducible external signal that CN signature 7 at relapse discriminates platinum resistance better than at diagnosis (+0.18 AUROC, n=40, 3 resistant); (2) a directional discovery hypothesis (deltas non-predictive) — but the discovery cohort's specific effect sizes **do not reproduce** and are not usable as stated.
- **What is NOT shown:** clinical utility, calibration, prespecified thresholds, net benefit, temporal early-warning, generalizability, or adequate power; no cross-validation on discovery; extreme class imbalance externally; discovery statistics unreproduced.
- **Comparators:** CA-125 kinetics (KELIM), BRCA/HRD status, baseline genomic profiling.
- **Roadmap to true validation:** (i) re-derive discovery statistics with a fully specified, deposited pipeline and confirm they reproduce before any further claim; (ii) prespecify a single locked score + threshold; (iii) external cohort with balanced classes and adequate events (EPV ≥ 10; ≥ 30–50 resistant events); (iv) nested cross-validation / independent test set, report outer-fold metrics; (v) calibration (calibration curve, Brier) and decision-curve/net-benefit; (vi) head-to-head vs KELIM and BRCA/HRD, test incremental value; (vii) distinguish prognostic from predictive; if monitoring is claimed, a prospective serial-sampling study with a prespecified lead-time endpoint; (viii) prospective/interventional confirmation before any clinical-utility claim.

---

## §7 — Severity-ranked claim ledger (summary; machine-readable in `reports/serial_sae_validation_ledger.json`)

| # | Claim | Verdict | Severity |
|---|---|---|---|
| 1 | post-DDR ρ=−0.711, p=0.014 (discovery) | NOT REPRODUCED (ρ=−0.209, p=0.537) | Critical |
| 2 | post-PI3K ρ=−0.683, p=0.020; AUC=0.750 | NOT REPRODUCED (ρ=+0.109; AUC 0.36–0.50) | Critical |
| 3 | KM post-DDR log-rank p=0.0124 | NOT REPRODUCED (p=0.072) | Critical |
| 4 | Pathway deltas non-predictive | REPRODUCED | — |
| 5 | CN s7 relapse AUROC 0.874, p=0.035 | SUPPORTED (0.8739, p=0.035) | — |
| 6 | s7 improvement +0.180 (relapse>diagnosis) | SUPPORTED (+0.1802) | — |
| 7 | Discovery split 8R/3S, EOC227 resistant | DISCREPANT (corrected 7R/4S, EOC227 sensitive) | High |
| 8 | BriTROC "10 resistant" | DISCREPANT (3 resistant / 37 sensitive) | High |
| 9 | n=3 fragility / "excellent discrimination" | OVERSTATED (LORO 0.865–0.892, wide CI) | High |
| 10 | "Detect resistance 3–6 months before progression" | OVERSTATED (prognostic, not temporal) | High |
| 11 | Intro: "pathway changes predict resistance" | DISCREPANT (contradicts delta-null result) | Medium |
| 12 | No multiple-testing correction | OVERSTATED (disclosed by manuscript) | Medium |
| 13 | MSK-Spectrum "dbGaP pending" | DISCREPANT (stale; possessed locally; unused here) | Low |
| 14 | Zhang citation PMID 36223460 | DISCREPANT (correct: DOI 10.1126/sciadv.abm1831, PMC8865800) | Low |
| 15 | BriTROC genome-stable vs s7-at-relapse | CONTEXT (interpretive tension; note in text) | Medium |
| 16 | Biological direction (DDR, s7/CCNE1) | SUPPORTED (direction only) | — |

---

## §8 — Provenance and reproducibility

- **Discovery data:** raw GEO `GSE165897_UMIcounts_HGSOC.tsv.gz` (110 MB, SHA-16 `d604a459df7e5e70`) + `GSE165897_cellInfo_HGSOC.tsv.gz` (SHA-16 `7366ec57d7de3613`), downloaded from NCBI GEO FTP. Labels from the repository's corrected `resistance_labels.json`.
- **External data:** BriTROC-1 open-access Nature Communications supplementary (figure_4A CN signatures; MOESM4 clinical response). No controlled-access data (dbGaP/EGA BriTROC BAMs, MSK-Spectrum) were used.
- **Methodology note:** the committed script `scripts/serial_sae/pathway_kinetics_gse165897.py` uses smaller, partly non-standard gene sets (DDR 8 genes; symbols like mTOR/VEGFR1/VEGFR2 that require alias mapping) and a monotonic 0–1 rescale (divide by 15) that does not affect Spearman ρ or AUC ranking. Validation used the **manuscript's** stated gene sets (the claim under test). Neither gene-set choice reproduces the published discovery numbers.
- **Reproducibility of this validation:** worker scripts and per-worker JSON outputs (`w1_discovery.json`, `w2_britroc.json`, `w3_rigor.json`, `w4_consistency.json`, `w5_references.json`) are retained. The planned confirmatory gene-set-sensitivity check (`w1b`) did not complete and produced no output, so no `w1b` artifact exists; the non-reproduction conclusion rests on the completed W1 re-analysis using the manuscript's own gene sets. Seed 42; bootstrap 1000 iterations throughout.

*This report is Research Use Only. It does not assert clinical validity, regulatory clearance, or fitness for patient care.*
