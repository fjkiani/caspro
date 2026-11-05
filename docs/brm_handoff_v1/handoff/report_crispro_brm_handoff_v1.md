# CrisPRO / Brain-Metastasis Work: Audited Handoff

**Prepared for:** Fahad Kiani  
**Package version:** 1  
**Assembly timestamp (UTC):** 2026-11-03T02:28:00+00:00  
**Scope:** All available CrisPRO/BrM research outputs and the recent Evo2/nanocarrier infrastructure work. Unrelated project assets are excluded.

## 1. Read this first

This package preserves the available work and separates observations, earlier reported results, proposals, missing assets, and unperformed validation. It is **not a claim that the production system is online**, that the therapeutic protocol has been demonstrated, or that every source dataset is included.

There are **162 original artifacts**, totaling **25.71 MiB uncompressed**, before new handoff documentation. These include **12 CSV tables**, **19 PNGs and 19 SVGs**, **2 source workbooks**, and the preserved five-target structural modeling outputs. Seven historical report/blog/manuscript files are retained. The dataset inventory contains **28 records** spanning actual datasets, reference sources, generated model outputs, and conceptual design inputs; these are **not 28 newly analyzed independent cohorts**.

**Major omissions:** The actual source checkouts of `crispro-backend-v3` and `evo2-e2e`, primary assay matrices, sample-level TCGA exports, GTEx API response/cache, and original model inference responses are unavailable. Previously recorded GitHub commits are listed as recovery pointers, not included source snapshots. The available archive can support review of saved outputs, but cannot rebuild and redeploy the full original SaaS application.

No new biological analysis, literature review, model inference, external data acquisition, database persistence, queue execution, or deployment was performed during packaging.

### Evidence labels

| Label | Meaning |
|---|---|
| Artifact-supported prior result | A retained table, JSON, coordinate file, or other output supports the recorded result; this does not prove the upstream analysis was valid. |
| Previously reported / source missing | A report or prior delivery states the result, but supporting data or executable source is absent. |
| Reported implemented / not production-validated | Software was previously described or locally tested, but retained source or real-service evidence is insufficient. |
| Not performed / not demonstrated | No documented execution or validation supports the proposed capability. |
| Audited in this handoff | Files, schemas, metadata, internal consistency, archive integrity, and credential patterns were checked; scientific results were not regenerated. |

## 2. What the archive contains

| Directory/file | Contents |
|---|---|
| `handoff/README.md` | Navigation, scope, and limitations. |
| `handoff/report_crispro_brm_handoff_v1.md` | This report. |
| `handoff/dataset_inventory.csv` | 28 source records: measurement, cohort/comparison, release/build, available files, analysis status, and caveats. |
| `handoff/analysis_status.csv` | 26 workstreams classified by evidence and unperformed work. |
| `handoff/findings_ledger.csv` | 26 grouped findings with source artifacts and interpretation limits. |
| `handoff/missing_assets.csv` | 26 missing files/data/validation items and their consequences. |
| `handoff/artifact_inventory.json` | Every original artifact, size, SHA-256, archive location, and parsed metadata; CSV dimensions, missing values and numeric ranges; workbook sheets and previews. |
| `handoff/excluded_assets.csv` | Duplicate fold archives and unrelated assets intentionally left out. |
| `originals/historical_reports/` | Preserved scientific reports, three blog versions, and manuscript. |
| `originals/tables_and_summaries/` | Evidence matrices, RNA summaries, revised ranking, correction ledger, and score JSONs. |
| `originals/figures/` | Existing data figures and historical mechanism illustrations; PNG/SVG originals preserved. |
| `originals/structural_inputs/` | Structural job specifications and corrected guide manifest. |
| `originals/structural_predictions/af3_structural_validation/` | Models, per-model confidence/PAE data, saved job requests, summaries, figures, and terms. |
| `originals/supplementary_workbooks/` | Two supplied XLSX reference/processed-data workbooks. |
| `tools/` | New packaging/document-generation utilities and packaging unit tests only; **not the missing application source**. |
| `MANIFEST_SHA256.csv` | Every payload file's byte size and hash; the manifest does not hash itself. |

The six supplied fold ZIP filenames were checked against extracted structural artifacts. Every regular-file payload was already preserved byte-for-byte in the extracted outputs, so redundant archive containers are excluded. Model outputs and their terms remain included.

## 3. Findings supported by retained target tables

### 3.1 NSCLC RNA evidence is mixed, not uniformly validating the payload

The primary GSE223499 results are sample-level pseudobulk comparisons across cell compartments. The retained export has 40 target-compartment rows, not the full transcriptome. The reported tumor-like analysis includes 28 BrM and 11 primary samples. The CNV-confirmed tumor subset reportedly has only two primary samples. The saved GSE131907 table has 10 targets from epithelial pseudobulks (10 BrM and 11 primary) and explicitly warns of **10-gene size-factor estimation**. Treat its normalization and inference as provisional rather than a full-transcriptome replication. [1–4]

| Gene | GSE223499 tumor-like LFC / padj | GSE131907 epithelial LFC / padj | Defensible interpretation |
|---|---|---|---|
| NOM1 | +0.515 / 0.003428 | +0.443 / 0.40225 | Significant RNA increase in one cohort; not independently significant in the second. |
| BACE1 | +1.069 / 0.070807 | +0.358 / 0.57396 | Nominal/trending in the first; not significant in the second. Earlier padj=0.017 claim is superseded. |
| FAM72A | +1.054 / 0.060477 | +1.273 / 0.19324 | Directionally positive but not FDR-significant replication. GSE131907 raw p=0.03865. |
| ATP10D | -0.132 / 0.879135 | +0.771 / 0.39151 | Neither comparison is significant; signs differ. No demonstrated NSCLC RNA enrichment. |
| SENP8 | -0.470 / 0.146855 | +0.074 / 0.84156 | Non-significant tumor-like signal; positive spatial result is a different compartment. |
| SLC45A4 | +1.062 / 0.182784 | -0.085 / 0.84156 | Non-significant and direction-discordant. |
| ROPN1L | +0.184 / 0.824010 | -1.182 / 0.40225 | Does not support older claims of consistent RNA upregulation across these cohorts. |
| SLC25A32 | +0.031 / 0.948657 | +0.066 / 0.84156 | No significant RNA difference in these comparisons; non-significance is not proof of equivalence. |
| TFEB | -0.337 / 0.515696 | +0.045 / 0.84156 | No significant tumor-intrinsic RNA difference; other compartments are separate questions. |

PTPRC has GSE131907 epithelial LFC **-2.24424**, padj **0.0020747**. This is a retained statistical result, **not a direct measurement of immune depletion**. Cell identity, contamination, immune-cell proportions, and patient-level covariates must be checked before interpreting it as an “immune desert.” PTPRC results in other files come from different compartments and should not be mixed. [2–4]

### 3.2 Spatial and tumor-like comparisons disagree

The saved GSE200563 table reports 23 paired LB/L observations and adjusted paired-Wilcoxon results. SENP8 shows spatial log2FC **+0.27592**, padj **0.03487**, opposite the negative tumor-like GSE223499 direction. This is a compartment/composition conflict, not proof that either assay is wrong. BACE1 spatial padj is **0.269**; NOM1 is **0.731**. FAM72A is marked **NOT_IN_MATRIX**, not a zero-expression measurement. Pairing metadata and the raw ROI matrix are missing. [5]

### 3.3 Dependency evidence was revised

The revised ranking table reports NOM1 mean Chronos **-0.725** with **82.5%** dependent lines, while SLC25A32 (**+0.019**, **0.6%**) and TFEB (**+0.004**, **0.2%**) are classified **NON_ESSENTIAL**. These are extracted summaries, not a newly audited DepMap release. Older v6 evidence-table narratives still describe SLC25A32 as strongly selective and should not override the revised dependency table. [3,4,6]

The separate BACE1 report describes **95 NSCLC lines from 23Q4**, median Chronos **-0.019**, with **3/95** below **-0.2**. Those values cannot be pooled with the reported pan-cancer 24Q4 means. Non-essentiality in a 2D proliferation assay does not establish a metastasis-specific function. [7]

## 4. Findings recorded in reports but not reproducible from included raw data

### 4.1 Blueprint targets versus the proposed alternative payload

The nanocarrier report gives these CRISPRa brain-vs-lung LFCs: TWIST1 **-2.35**, SNAI1 **-1.98**, MMP9 **-6.00**, ATP10D **+11.88**, BACE1 **+7.37**, FAM72A **+7.07**, and BIN1 **+12.52**. The screen matrix and metadata are absent. [8]

**Critical provenance conflict:** The earlier RNA report and revised rank table call the CRISPRa screen breast-derived/MDA-MB-231; the later nanocarrier report and parts of the manuscript attribute it to an NSCLC/Chafe screen. The accession-to-paper-to-model mapping has not been resolved. Do not promote these values as confirmed NSCLC driver evidence until it is reconciled. Even with correct provenance, an activation enrichment screen is not a knockout-efficacy assay, and a negative relative LFC does not prove a gene has no causal role in brain metastasis. [1,3,8,9]

The retained ATAC summaries are likewise not a reprocessable peak dataset. Cancer lineage, reference build, peak-to-gene mapping and covariate design remain to be checked; “MBM vs ECM” labels should not be silently converted into NSCLC evidence. [8,9]

### 4.2 TCGA tumor expression and exploratory stratification

The earlier report describes 510 TCGA-LUAD tumors. It reports **117/510** tumors with at least two of four targets above their own cohort's upper quartile, **17/510** additionally EGFR-mutant, and **31/510** BACE1-high plus EGFR-mutant. These are exploratory cross-sections, not prospective eligibility criteria or evidence of treatment response. Selecting the upper quartile guarantees approximately one quarter of the cohort is “high” for each gene; it does not establish an externally meaningful threshold. [8]

The reported receptor fractions above z=0 are LRP1 **51.4%**, TFRC **42.2%**, SLC2A1 **21.8%**, and INSR **35.7%**. These mean **above the expression profile's reference z-score**, not “expressed,” receptor protein-positive, BBB-localized, or capable of transcytosis. Tumor mRNA and brain-endothelial receptor availability are different measurements. A nonsignificant EGFR-group comparison or weak LRP1/BACE1 correlation cannot establish delivery efficacy or statistical independence. [8]

The source study/profile IDs, expression/mutation exports, joining code and mutation-missingness policy are missing. The report's EGFR denominator also drifts: it states 66/510 mutant tumors elsewhere but uses a 13.7% baseline in one section; those are not the same fraction. No patient identifiers or sample-level expression table have been reconstructed.

### 4.3 GTEx: static safety context versus later dynamic retrieval

The older nanocarrier report states that receptor GTEx data were unavailable at that time and used literature context; its receptor figure primarily reflects TCGA tumor expression. The subsequent infrastructure delivery reported live GTEx v2 retrieval for LRP1, TFRC, SLC2A1 and INSR. Do not retroactively label the older figure as a live-GTEx result. [8]

The later reported mean brain TPM values were **46.49**, **15.93**, **53.44**, and **10.46**, respectively. The source response and cache are not present in this package. The stated endpoint was `expression/medianGeneExpression` with dataset `gtex_v8`: these are **per-tissue median TPM**, not donor-level raw TPM. An arithmetic mean of tissue medians is not a donor-weighted mean across the brain. The previously reported 13-tissue set included spinal cord, so tissue inclusion must be explicit on reuse.

The older target-safety table gives ATP10D **2.37**, FAM72A **0.28**, BACE1 **37.09**, and BIN1 **140.29** TPM. These values are inherited report summaries, not newly verified tissue estimates. **Low bulk expression does not establish editing safety, and high expression does not by itself quantify toxicity.** [8]

### 4.4 Evo2 benchmark and generation claims

The manuscript reports **composite AUROC 0.689** on a 29-gene panel, **0.748** on a 24-gene observed-only panel, **Evo2-only 0.578**, and **Enformer-only 0.411**. These are not interchangeable. The 0.689 number must not be called Evo2-alone performance. The panel, labels, feature matrix and evaluation code are absent; the manuscript itself notes easy tissue-origin negatives and imputation. No held-out prospective clinical validation is demonstrated. [9]

The earlier capability report labels 11 capabilities as 1 “VALIDATED,” 5 “PARTIAL” and 5 “GAP.” These are its author-assigned maturity labels, not independently replicated benchmark outcomes. A model parameter-count ratio does not by itself establish accuracy or prove which upgrade closes a capability gap. [8]

Four 256bp FAM72A candidates from a 501bp prompt are reported with GC/motif summaries. Candidate FASTA, seed, inference response and motif definitions are missing. **Generation does not demonstrate repression**, and no reporter assay is provided. The report simultaneously claims a targeted SAE feature and states that the 1B model lacks relevant SAE support; that inconsistency remains unresolved. [8]

### 4.5 BACE1 repurposing is a proposal, not a demonstrated safety solution

The BACE1 report discusses published mechanisms and previous inhibitor trials and proposes tumor targeting or short-course prevention dosing. This archive contains that synthesis and its figures, not individual trial data or a new clinical analysis. The claim that an 8–12-week regimen avoids neuronal toxicity is not demonstrated here; no dosing recommendation, prevention benefit, or therapeutic window is established. [7]

## 5. Structural predictions and guide identity

The archive contains **25 CIF files**, **25 per-model full-data JSON files**, **25 confidence JSON files**, five saved job requests, five target-level summaries, an aggregate summary, and terms files. The targets are ATP10D, BACE1, BIN1, FAM72A and SLC25A32. The models contain RNA and two DNA strands; **Cas9 is absent**. [10]

The saved aggregate summary reports mean global ipTM values of ATP10D **0.378**, BACE1 **0.350**, BIN1 **0.362**, FAM72A **0.314**, and SLC25A32 **0.348**. Its “25/25 PASS” label means only that an ad hoc saved threshold of 0.30 was met. These low-confidence structural predictions are not evidence of validated binding, R-loop biology, editing efficiency, specificity, or phenotype reversal. The shared RNA scaffold also limits the discriminatory meaning of global metrics. Per-model PAE files are included for future review, but no new PAE analysis was run here. [9,10]

The manuscript calls the five outputs per guide independent seeds; **each saved server job request actually lists one seed**, with five model outputs. These are neither five independent biological replicates nor evidence of five independent experimental validations.

### Guide-set drift that must be reconciled

| Target | Corrected structural manifest spacer | Later nanocarrier report spacer |
|---|---|---|
| ATP10D | TTGTAAGGGCTCTGGGTCAC | AGCCTGGCGGAGACGGGAGG |
| BACE1 | TCTTCCCATGGCAGGCAATC | GCGAGCCGCGAGCTGGATTA |
| BIN1 | AGATGTGGAGATGTCCCGGA | TCTGTCCCCGCGTCGCTCGC |
| FAM72A | GGAACAAGACAGGGAGCAGA | Report says no guide in its payload set |

There is a real preserved FAM72A structural-job input, despite its omission from the later payload table. These are **different guide sets**: AF3 scores cannot be transferred to later payload spacers. The corrected manifest says earlier DNA targets were synthetic palindromes, then replaced with claimed hg38 genomic targets from TSS-proximal PAM scanning. `_real` is a historical filename, not a new independent genome alignment. No complete off-target analysis or coding-exon knockout validation is retained. [8,11]

## 6. Infrastructure: implemented claims versus demonstrated execution

The original delivery reported source creation, local tests, and GitHub pushes:

| Component | Recorded implementation | What is missing now |
|---|---|---|
| GTEx ingestion | Async HTTP, Pydantic schemas, retries, cache, SQLAlchemy upsert | Source/cache and successful Postgres persistence evidence. |
| Modal Evo2 | A100 class, image, model cache, scoring/generation/health endpoints | Source, successful image build/deploy, endpoint URL, live health and model inference response. |
| FastAPI design API | Design/status/specs/GTEx refresh routes and router mount | Source and required versioned-route verification. |
| Celery/Redis | Queue configuration and task mapping the eight protocol steps | Source and demonstrated durable broker/worker/result execution. |
| Tests | Earlier delivery reported 21 infrastructure tests; full suite 721 passed, 9 skipped, 8 xfailed | Original test files and fresh rerun. Earlier scientific report separately states 723 passes; scopes/versions differ and are not reconciled here. |

Recovery pointers: backend `fjkiani/crispro-backend-v3`, recorded commit **c85eb33**; deployment repo `fjkiani/evo2-e2e`, recorded commit **53191c4**; earlier scientific modules recorded at **4dd376c**. These are historical identifiers, not verified repository snapshots within the ZIP. No credentials are included.

**Unresolved contract mismatch:** The user requested `POST /v1/brm/nanocarrier/design`; the delivery described `POST /brm/nanocarrier/design`. The required `/v1` contract is not established by the retained evidence.

**Queue semantics:** A synchronous fallback after Redis failure is not equivalent to accepted, durable queued work. The earlier sandbox execution reported using fallback; it does not demonstrate production Celery/Redis behavior.

**Scientific semantics:** Software “execution” of eight labels is a design-workflow computation, not physical nanocarrier transit, cleavage, or phenotype reversal.

## 7. All source families and what was not analyzed

The full source register is `dataset_inventory.csv`. It includes:

- GEO cohorts and screens: GSE223499, GSE131907, GSE200563, GSE237446, GSE205033, retired GSE186344 with GSM5645895, GSE161116, and superseded breast-derived RNA source GSE184869.
- TCGA-LUAD tumor expression/mutation summaries and exploratory patient subsets.
- Separately labeled DepMap 23Q2, 23Q4 and 24Q4 summaries; CPTAC LUAD, Human Protein Atlas and UALCAN reference records.
- GTEx v8 therapeutic-target summaries and later GTEx Portal receptor ETL claims.
- The two supplied workbooks, which are **processed DEG lists and assay annotations**, not raw patient expression.
- AF3 predictions, hg38 guide-design input claims, the reported 29/24-gene benchmark, Enformer summaries and reported FAM72A candidates.
- Evo2 paper benchmark tasks/training-corpus context, BACE1 publications and proposed nanocarrier engineering parameters.

**Not newly analyzed in this packaging pass:** any assay cohort, model benchmark, clinical trial, off-target search, guide cut site, or generated DNA. Only existing outputs and their schemas/metadata were audited.

**Not demonstrated by the underlying work:** prospective prediction, independent clinical validation, donor-level GTEx ingestion, endothelial-specific receptor protein abundance, receptor-mediated BBB flux, pharmacokinetics, formulation/release/encapsulation performance, endosomal escape, guide-specific Cas9 editing, off-target safety, therapeutic response, phenotype reversal, or a safe prevention regimen.

**Reference-only tasks, not local replications:** ClinVar, BRCA1 mutagenesis, DART-eval and genome-scale generation benchmarks mentioned by the earlier Evo2 audit; OpenGenome2 training-corpus context. Their inclusion in a literature discussion is not analysis of their raw datasets.

## 8. Correction and version guide

Preserved originals are deliberately unchanged. This audit is an interpretation overlay, **not silent data repair**.

1. `gse131907_deseq2_results.csv` is the saved corrected target-level result, including BACE1 padj 0.574, not the older 0.017. Its targeted-normalization caveat still applies.
2. `BrM_Assassin_Scored_v4_rna_adjusted.csv` contains later dependency corrections for SLC25A32/TFEB. Its column `assassin_score_v4` contains integer priority values and is not the same normalized 0–1 score described in the later nanocarrier report.
3. `brm_master_evidence_table_v6.csv` is the latest numbered master-evidence table present, but **not universally authoritative**: stale dependency narratives and meta-analysis values remain. The older v3 JSON retains superseded BACE1 and GSE186344 claims.
4. `blog_crispro_brm_hunt_v3.md` and `manuscript_brm_interception_v1.md` contain important corrections but still overinterpret some findings and contain cancer-model/seed inconsistencies. Later filenames are not guarantees of validity.
5. `report_evo2_nanocarrier_audit.md` and its three figures are preserved as a historical synthesis, not certified current truth. They predate the later reported GTEx ETL and overstate driver, receptor, safety, generation and clinical eligibility conclusions.
6. GSE186344 is retired as a BrM-vs-primary comparison; any p-values or meta-analyses using that invalid contrast need reanalysis rather than selective reuse.
7. Earlier guide sets and structural input versions are historical designs, not interchangeable with the final payload set.
8. Existing source metadata conflict in other places: RNA pipeline versions are 0.5.2 versus 0.4.1 in separate reports; cited cohort author names differ; reported cell totals do not consistently equal the listed BrM/primary subtotals; DepMap releases and denominators vary. None were resolved by inventing metadata.
9. Expression, dependency, structural confidence, in vivo enrichment, and clinical efficacy answer different questions. No single composite score collapses those distinctions into a validated therapeutic conclusion.

## 9. Methods and integrity checks for this handoff

Selection was limited to the relevant available BrM outputs and two identified supplementary workbooks. Original files were retained byte-for-byte. Original fold-container membership was compared by SHA-256 against extracted outputs to avoid losing unique payloads. CSV headers, row counts, missing values, numeric ranges and sample rows were inspected. JSON top-level schemas and structural job requests were inspected. Workbook sheet names, dimensions and opening rows were inspected via their XML records; no new differential-expression analysis was performed.

Packaging filters, unsafe-path detection and nested-container credential scanning have **15 passing local unit tests**. The archive builder blocks credential-like content instead of printing it. It does not include credentials, unrelated project assets or private execution records.

The final archive is reopened after copying to the delivery location; CRCs, member-path safety/uniqueness, nonzero sizes and every manifest SHA-256 are checked. The manifest covers all payload files except itself. An external archive digest is printed by the verification utility; it is not embedded self-referentially. Use:

```bash
python tools/build_brm_handoff.py --verify crispro_brm_full_handoff_v1.zip
```

The packaging tools do not recreate unavailable source repositories or raw studies. Rebuilding the biological results requires recovering the assets in `missing_assets.csv`, fixing provenance conflicts, then rerunning methods with explicit cohort/build/release contracts.

## 10. Recommended handoff order

1. Recover exact source snapshots and the per-study sample/feature manifests; do not develop from report descriptions.
2. Resolve the CRISPRa accession/paper/cancer-model mismatch and guide-set drift before using driver labels or structural metrics.
3. Re-run RNA comparisons from full counts with appropriate normalization/covariates, retire invalid contrasts, and establish an external validation design.
4. Recover TCGA/GTEx/DepMap exports with release/profile IDs and missingness rules; recompute exploratory thresholds without clinical eligibility language.
5. Demonstrate Postgres persistence, real Redis/Celery asynchronous execution, versioned API contract, and authenticated live Modal inference.
6. Validate guide identity, genome-wide off-targets and editing experimentally; separately test delivery, target engagement, phenotype effects and safety. Keep computational predictions distinct from those experiments.

## References

These references identify **preserved source artifacts**, not a new verification of every external paper cited inside them. Original documents retain their own reference numbering.

1. `report_brm_rnaseq_validation.md` — historical GSE223499 methods/results and cross-cancer caveat.
2. `gse131907_deseq2_results.csv` — saved 10-target epithelial pseudobulk results and normalization caveat.
3. `BrM_Assassin_Scored_v4_rna_adjusted.csv` — revised target ranking, RNA and dependency summaries.
4. `master_verification_table.csv` and `rnaseq_gene_scores_v3.json` — correction records.
5. `brm_rnaseq_GSE200563_results.csv` and `brm_rnaseq_multidataset_evidence.csv` — spatial and cross-dataset summaries.
6. `brm_master_evidence_table_v6.csv` and `brm_master_evidence_v3.json` — historical integrated evidence, including residual stale claims.
7. `report_BACE1_novelty_derisk.md` — historical TCGA/DepMap/literature synthesis.
8. `report_evo2_nanocarrier_audit.md` — prior capability, receptor, stratification and payload synthesis.
9. `manuscript_brm_interception_v1.md` — prior benchmark/methods/structural descriptions and correction history.
10. `af3_master_results.json` and saved AF3 per-model/job-request files — structural predictions and provenance.
11. `af3_job_manifest_v2.json` and `af3_job_*_real.json` — corrected structural guide/design inputs.
12. `41467_2022_33365_MOESM6_ESM.xlsx` and `a2f1293b8766f86ca8c59ad3babc3261.xlsx` — supplied processed DEG and panel annotation workbooks.
