# CLAIM_LEDGER.md — Serial-SAE / HGSOC Platinum-Resistance Manuscript

**Purpose.** Binding final deliverable. One row per claim. Nothing enters the manuscript that is not in
this ledger. Every claim traces to a **script**, a **table/figure**, and either an **external citation**
or an explicit **"internal artifact"** flag. Language is sized exactly to what was tested — not softer,
not stronger.

**Author:** Fahad Kiani / CrisPRO. **Date:** 2026-07-27.

> **Research use only (RUO).** Not for clinical decision-making. All quantitative results are
> derivation-cohort observations. No claim of clinical validity or independent replication is made.

**External data sources cited in this ledger**
- **BriTROC-1:** Smith P., Bradley T., Gavarró L.M. et al. *Nat Commun* 14, 4387 (2023). DOI
  10.1038/s41467-023-39867-7. PMID 37474499. (CN signature exposures: Source Data `figure_4A.tsv`;
  clinical response `MOESM4_ESM.txt`; survival/confounders `figure_1B_*`, `figure_2.tsv`.)
- **CN-signature identity:** Macintyre G., Goranova T.E., De Silva D. et al. *Nat Genet* 50, 1262–1270
  (2018). DOI 10.1038/s41588-018-0179-8.
- **Single-cell NACT cohort:** Zhang et al. *Sci Adv* 8:eabm1831 (2022). DOI 10.1126/sciadv.abm1831
  (GSE165897).

**Internal artifacts referenced**
- Scripts: `scripts/w2_britroc.py`, `scripts/obl2_label_swap_audit.py`, `scripts/obl3_build_patient_table.py`,
  `scripts/obl3_s3_quantification.py`, `scripts/firth.py`, `scripts/obl4_single_cell_mechanism.py`.
- Receipts / docs: `S7_PROVENANCE_RECEIPT.md`, `OBL3_SIGNATURE_IDENTITY.md`,
  `FRAMING_INTRINSIC_VS_ACQUIRED.md`, `OBL4_MECHANISM.md`.

---

## A. Ledger table (claim | tested? | scope actually proven | permitted language | source / flag)

| # | Claim | Tested? | Scope actually proven | Permitted language (verbatim-usable) | Source citation OR internal flag |
|---|---|---|---|---|---|
| 1 | Signature-7 exposure at relapse discriminates platinum resistance (AUROC 0.874) | **Yes — reproduced** | Internal metric on published exposures; n=40, **3 resistant events**; sklearn `roc_auc_score(y_rclass, s7_rel)` = **0.8739**, boot 95% CI **0.757–0.973**, MWU **p=0.035**. Not reported in any external paper. | "From the published BriTROC-1 CN-signature exposures, signature-7 exposure at relapse discriminates our internally-defined RECIST resistance label with AUROC 0.874 (n=40, 3 events); this metric is not reported in the source study." | Exposures: BriTROC-1 *Nat Commun* 2023, `figure_4A.tsv`. AUROC = **INTERNAL** (`scripts/w2_britroc.py`; `S7_PROVENANCE_RECEIPT.md`; `tables/obl2_auroc_summary.csv`). |
| 2 | The s7 result is a *correction of the external literature* (or otherwise externally sourced) | **RESOLVED 2026-07-27 — no external citation exists; row does NOT flip** | **Provenance deadline check.** Exhaustive verification of the source (BriTROC-1 *Nat Commun* 2023, DOI 10.1038/s41467-023-39867-7, incl. Fig 4A source data `figure_4A.tsv`, `MOESM4_ESM.txt`) confirms it reports **no s7-at-relapse platinum-resistance AUROC** — no table/column/row/outcome field carries the 0.874 value. The AUROC = **0.8739** (boot 95% CI 0.7622–0.9717, Wilcoxon p=0.035) is a **CrisPRO construction on published exposures**; the resistance label `rclass` is CrisPRO-derived (`w2_britroc.py::classify()`, maps published `overall_response` PD/SD→resistant, CR/PR→sensitive). It is **internal QA / internal derivation**, not an external correction. **Claim is NOT deleted** — it is locatable and reproducible — but it is **INTERNAL**. Row 2 flips only on arrival of a real external citation; none exists → it stays. | "This is an internal label-definition sensitivity / QA analysis of CrisPRO's own derived metric computed from published BriTROC-1 exposures, not a correction of any published AUROC." | **INTERNAL flag — VERIFIED, no external source.** `S7_PROVENANCE_RECEIPT.md` (Case (2) verdict); computation `scripts/w2_britroc.py` (`classify()` + `roc_auc_score`); receipt `w2_britroc.json` (check W2-01, AUROC 0.8739). |
| 3 | The label-artifact effect is real, not an artifact of also changing sample selection / scoring direction / bootstrap | **Yes — proven** | On a **fixed 40-patient** feature matrix (feature `s7_rel`, positive=resistant, no direction flip, same 1000-iter bootstrap rng=42): RECIST `rclass` (3R) → **0.8739**; registration `pt_status` (9R), **same 40 patients, only label column changed** → **0.3136** (MWU p=0.095). Confound (40-vs-47 sample selection) decomposed; `rclass_on_47` correctly flagged **UNDEFINED** (label absent for 7 patients = data limitation). | "Holding the feature matrix and cohort fixed and changing only the outcome-label definition moves AUROC from 0.874 (RECIST label, 3 events) to 0.314 (registration label, 9 events) — the discrimination is an artifact of the label definition, not of sample selection, scoring direction, or bootstrap methodology." | **INTERNAL artifact** (`scripts/obl2_label_swap_audit.py`; `tables/LABEL_SWAP_AUDIT.csv` — 47 patients, both labels, both outcome vectors, patient/sample linkage; `tables/obl2_auroc_summary.csv`; `tables/obl2_invariants.json`). |
| 4 | s3 (BRCA1/2-related HRD axis) at diagnosis is associated with platinum resistance at patient level | **Yes — proven, multiply corrected** | BriTROC-1 diagnosis cohort n=98, **20 resistant / 78 sensitive**. s3_diag AUROC **0.2715** (95% CI 0.153–0.406), MWU **p=0.0017**; protective direction (**1−AUROC = 0.7285**, the literal "0.729" reported without a direction flag). **Only signature surviving BH-FDR** across all 7 (**q=0.0118**). LOEO on 20 events stable (range 0.235–0.283, width 0.048). | "We provide the first patient-level, multiply-corrected, survival-linked quantification of the diagnosis-stage HRD-axis (signature 3) association with platinum resistance in BriTROC-1, extending a cohort-level observation into a testable predictive signal. Higher s3 is **protective** (associated with sensitivity)." | Cohort + identity: BriTROC-1 *Nat Commun* 2023 (`figure_4A.tsv`, `MOESM4`, `figure_2.tsv`); Macintyre *Nat Genet* 2018. Quantification = **INTERNAL** (`scripts/obl3_s3_quantification.py`; `tables/obl3_report.json`; `tables/obl3_all7_signatures_bh.csv`; `OBL3_SIGNATURE_IDENTITY.md`). |
| 5 | s3 protective association is not a sparse-data / separation artifact | **Yes — Firth companion** | Adjusted logistic (s3_z + age_z + stage_adv + brca + nlines): **OR 0.0252/SD, p=0.0141**. Firth-penalized companion **OR 0.0825/SD, Wald p=0.0095** — shrinks toward null, **same protective direction**. Model runs on **67 patients / 9 events** (EPV 1.8, flagged UNDERPOWERED). | "The protective s3 estimate is directionally and roughly magnitude-concordant between maximum-likelihood and Firth-penalized logistic regression, so it is not an artifact of sparse-data separation bias. The adjusted model is explicitly underpowered (9 events, 5 covariates)." | **INTERNAL** (`scripts/obl3_s3_quantification.py`, self-contained `scripts/firth.py`; `tables/obl3_report.json` → `adjusted_logistic`). |
| 6 | s3 diagnosis exposure is associated with overall survival | **Yes — Cox + PH check** | Cox OS (n=67, 39 events): **HR 0.6869/SD, p=0.043** (95% CI 0.478–0.988). Schoenfeld global **p=0.2251**, **no PH violation**. Residual plot QC-passed. | "Higher diagnosis-stage s3 exposure is associated with longer overall survival (Cox HR 0.69 per SD, p=0.043); the proportional-hazards assumption is not violated (Schoenfeld global p=0.23)." | **INTERNAL** (`scripts/obl3_s3_quantification.py`; `tables/obl3_report.json` → `cox_os`; `figures/obl3_schoenfeld_s3.png`). |
| 7 | s3 association is robust to BRCA status | **Yes — stratified** | Protective in **both** strata: BRCA-mutant AUROC 0.021 (n=19, 3R); BRCA-wt AUROC 0.329 (n=79, 17R). | "The protective s3 direction holds in both BRCA-mutant and BRCA-wild-type strata." | **INTERNAL** (`tables/obl3_report.json` → `sensitivity`). |
| 8 | s3 association is robust to purity / ploidy / immune infiltration | **No — NOT TESTABLE with open data** | Per-patient purity/ploidy/immune-infiltration values are **not present** in the released source-data tables (`figure_4A/1B/2`). Reported as **not testable**, not as passed. | "Per-patient purity, ploidy, and immune-infiltration confounder sensitivity could not be tested because those values are not released in the open BriTROC-1 source-data tables used here — this is an acknowledged limitation." | **INTERNAL flag — DATA LIMITATION** (`tables/obl3_report.json` → `sensitivity.purity_ploidy_immune_note`). |
| 9 | s3 is a "durable, independent biomarker" | **No — prohibited** | Durability requires replication **outside** BriTROC-1. None performed. Result is derivation-cohort only. | *(Not permitted.)* Instead: "This is a derivation-cohort signal in BriTROC-1; independent replication is required before any biomarker claim." | **PROHIBITED** (scope guard; no external replication artifact exists). |
| 10 | Post-NACT malignant compartment shows reduced clonal diversity and increased dispersion | **Yes — rarefied, per-patient** | Independent malignant call (Leiden HVG/PCA + epithelial scoring) vs authors' EOC: **Jaccard 0.9975** (8,796 shared). Rarefied n=11: Shannon **mean −13.6% / median −21.0%**; dispersion **mean +14.3% / median +12.4%**. Per-patient values shown (incl. small-n outliers EOC136 +193%, EOC540 n=18 flagged). | "In this paired single-cell cohort, the post-NACT malignant compartment shows reduced transcriptional clonal diversity (Shannon mean −13.6% / median −21.0% after rarefaction) and increased cell-to-cell dispersion (+14.3%), reproduced with an independent malignant-cell call (Jaccard 0.9975 vs the authors' annotation)." | Data: Zhang *Sci Adv* 2022 (GSE165897). Analysis = **INTERNAL** (`scripts/obl4_single_cell_mechanism.py`; `tables/obl4_report.json`; `tables/obl4_clonal_diversity_perpatient.csv`; `figures/obl4_clonal_diversity.png`). |
| 11 | Apparent post-NACT collapse of HR/cell-cycle **mean-expression scores** is explained by proliferative arrest, not a change in DNA-repair status | **Yes — non-circular cross-scored + HR-only + LOPO** | **Primary (non-circular, predictor/outcome share NO genes):** cross-scored composite (G2/M scored ~ S-phase set, and vice versa) shifts (Wilcoxon **p=0.0068 / 0.0322**), tracks proliferation at **ρ=0.90** both directions, **residual shift NS after adjustment** (p=0.10 / 0.56); **pure HR score does not shift before adjustment (p=0.1475)**. **Transparency-only (circular, composite = prolif_A∪prolif_B regressed on its own component):** ρ=0.99/0.93 — inflated by shared genes, NOT counted as evidence. All base gene sets disjoint. LOPO (n=11) non-circular β 0.66–1.03, residuals mostly NS. | "In this paired single-cell cohort, apparent post-treatment collapse of HR and cell-cycle pathway **mean-expression scores** is substantially explained by proliferative arrest rather than a change in DNA-repair status — a mechanism not tested in the source study. Using proliferation gene sets sharing **no genes** with the scored composite, the shift still tracks proliferation at ρ≈0.90 with no significant residual after adjustment. Notably the pure DNA-repair gene score does not shift significantly; the movement is in the proliferation/cell-cycle program." | **INTERNAL** (`scripts/obl4_single_cell_mechanism.py`; `tables/obl4_report.json` → `proliferation_arrest_regression` [non-circular keys `ccG2M_vs_prolifB_Sphase`, `ccSphase_vs_prolifA_G2M`, `hr_vs_prolifA/B`; circular keys flagged], `circularity_note`, `leave_one_patient_out`; `tables/obl4_perpatient_scores.csv`; `figures/obl4_proliferation_confound.png`); `OBL4_MECHANISM.md`. |
| 12 | "Acquired resistance is an illusion" / "RNA records damage not cause" (general law) / "post-treatment RNA cannot support a biomarker" | **No — prohibited category errors** | Only **mean-expression pathway scores** in **11 patients** from a NACT cohort **distinct** from the resistance cohort were tested. No general RNA-biomarker claim is licensed. | *(Not permitted.)* Instead: "Mean-expression HR/cell-cycle scores in this NACT single-cell dataset are proliferation-confounded." | **PROHIBITED** (scope guard; `OBL4_MECHANISM.md` §5). |
| 13 | CrisPRO "refutes" Nature's DNA copy-number stability conclusion | **No — refuted as framing** | Stable CN drivers from diagnosis→relapse are **compatible** with intrinsic/pre-existing resistance. CrisPRO and Nature **agree at the DNA layer**; the novel contribution is at the RNA-interpretation layer only. | "We agree with the source study at the DNA/copy-number layer (drivers are largely stable diagnosis-to-relapse); our contribution is confined to the RNA-interpretation layer." | **INTERNAL flag** (`FRAMING_INTRINSIC_VS_ACQUIRED.md`); Nature's stability conclusion = BriTROC-1 *Nat Commun* 2023. |
| 14 | A CrisPRO bottleneck-selection test found no enrichment of resistance amplifications in survivors | **No — NOT a CrisPRO test** | No such test was run on-disk. The "no selection for common CN drivers" statement is **Nature's own conclusion**, not a CrisPRO result. | "The source study reports its copy-number drivers do not select under treatment; we do not add an independent selection test." | **INTERNAL flag — attribute to source** (`FRAMING_INTRINSIC_VS_ACQUIRED.md`; `w5_references.json`). Do **not** present as a CrisPRO test. |
| 15 | "s7 = CCNE1 amplification" (manuscript annotation) | **No — refuted, must correct** | Per Macintyre 2018, signature 7 is HR-associated but **not** BRCA1/2-enriched ("alternative HRD mechanisms"); it is **not** CCNE1. The manuscript annotation is wrong. | "Signature 7 is an HR-associated, non-BRCA copy-number signature (alternative HRD mechanisms), not CCNE1 amplification." | Macintyre *Nat Genet* 2018; `OBL3_SIGNATURE_IDENTITY.md` (correction). |
| 16 | Manuscript line "confirmed the Serial-SAE hypothesis" and reproduced discovery stat post-DDR-vs-PFI Spearman **ρ = −0.711, p = 0.014** | **Yes — forensically audited; original value NOT reproducible under any tested pipeline** | **Side-by-side.** Original emitter `composite_roc_analysis_gse165897.py` line 399 (`ρ = -0.71, p = 0.014`) is a **hardcoded narrative string**, loaded **precomputed** `results/pathway_scores.csv` + `pfi_data_complete.json` (lines 34–35). Reproduction `w1_discovery.py` (+ independent `discovery_rederivation.json`, `reproduces_W1: true`) recomputes from raw UMI: **ρ = −0.2091, p = 0.5372**. **Same 11 patients, same N=11, same Spearman(score, continuous PFI) test** — so NOT a subset change, and label-independent (ρ=−0.2091 identical under 8R/3S and 7R/4S). **−0.209 is NOT distinguishable from zero:** Fisher-z 95% CI **[−0.7287, 0.4633]**, permutation p **0.5388** (20k), bootstrap 95% CI **[−0.7536, 0.5794]** (spans 0). **Partial feature diff isolated (insufficient):** the one feature-construction difference is the DDR gene set; recomputing on raw data across **all three historical DDR sets** (orig 8-gene, W1 14-gene frozen, v2 26-gene) gives ρ_NEW = **−0.3545 / −0.2091 / −0.1455** (ceiling −0.3545, all p>0.28) — directionally correct but **none reaches −0.711** (`sae_v2_geneset_test.json`; sweep `sae_exhaustive_sweep_summary.json` — no feature×test×PFI×geneset combination reaches −0.711, all 5 Table-2 p-values recompute p>0.2). Rescale (÷15, clip[0,1]) is monotonic → cannot change Spearman. **PFI error is NOT a cause of the −0.711 magnitude:** holding the reproducible feature matrix fixed and swapping ONLY PFI (NEW→OLD), post_ddr moves *toward zero* (ρ = **−0.0091** 14-gene / **−0.0957** 8-gene under the OLD/erroneous PFI), never toward −0.711 — the PFI mistake is disproven as a magnitude driver. **Git-history + manual-path checks (both negative):** `pathway_kinetics_gse165897.py` and `pathway_scores.csv` have **no history in any of the three repos** (crispro-backend-v2 `d5ed8c3`, Synthetic-Lethality `d2538e8`, crispro-backend-v3 `b2b2df2`); −0.711 exists in the codebase ONLY as **hardcoded constants** (validation script `validate_ovarian_pathway_model.py`, commit `e69324c`, stores `"post_ddr":{"rho":-0.711}` and **read the since-deleted `pathway_scores.csv`**, did not recompute from raw; `ovarian_pathway_gates.py`/`ovarian_pathway_model.py` carry it only in docstrings). Zero `.ipynb`/`.R`/`.Rmd`/`.xlsx` analysis path anywhere (only unrelated 3rd-party paper supplements). The −0.711 traces only to the now-**deleted** original `pathway_scores.csv` (different feature values); it cannot be reproduced, historically located, or manually reconstructed. **Category: `NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`** (= `ORIGINAL_FIGURE_NOT_REPRODUCIBLE_UNDER_ANY_TESTED_PIPELINE`; NOT SENSITIVE_TO_SUBSET; ORIGINAL_ERROR deliberately NOT used — no computation was shown to have run and produced −0.711 via an identified mechanism). *(Separately note the distinct n=11 power problem: post_ddr AUROC CIs span [0.125–0.933]/[0.375–1.0], post_pi3k [0–0.767] — a power issue, not a substitute for the reproducibility answer.)* | *(Not permitted as "confirmed"; −0.711 must NOT be presented as reproduced, nor as "not yet confirmed".)* Instead: "The discovery correlation does not reproduce: recomputation from raw data yields ρ = −0.21 (p = 0.54), statistically indistinguishable from zero at n = 11. The originally reported ρ = −0.71 cannot be traced to any reproducible, historical (version-control), or manual source; the surviving pipeline on verified raw data does not produce it under any tested configuration (three DDR gene sets, both PFI vectors, full feature×test sweep). It is classified `NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`." | **INTERNAL flag — `NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`** (= `ORIGINAL_FIGURE_NOT_REPRODUCIBLE_UNDER_ANY_TESTED_PIPELINE`; ORIGINAL_ERROR NOT used). Reproduction: `scripts/w1_discovery.py`; `w1_discovery.json` (W1-01); `expansion_results/discovery_rederivation.json`. Isolation + CI + gene-set/sweep/v2 tests: `worker-0.ipynb` cells `cell-f412325fd78f`, `cell-cf87e6400cba`, `cell-5f818f0ba7a8`, `cell-80e82c714ea8`, `cell-614ff87439ee`. Full forensic: `ITEM1_REPRODUCIBILITY_FORENSIC.md`; root-cause audit: `SAE_ROOT_CAUSE_AUDIT.md`. Git hit (hardcoded only): `validate_ovarian_pathway_model.py` (commit `e69324c`). Original inputs `results/pathway_scores.csv` + `pfi_data_complete.json` = **DELETED / unrecoverable, absent from all three repo histories**. |

---

## B. What the manuscript IS entitled to say (the two real contributions)

1. **Forensic label-audit method (internal QA).** Demonstrated on a fixed feature matrix: changing only
   the outcome-label definition swings s7-relapse AUROC 0.874→0.314 (rows 1–3). Framed as internal
   label-definition sensitivity, **not** a correction of external literature (row 2).

2. **Patient-level extension of Nature's diagnosis-stage observation + single-cell mechanism.**
   - The **first** patient-level, multiply-corrected (BH q=0.0118), survival-linked (Cox HR 0.69,
     p=0.043) quantification of the diagnosis-stage HRD-axis (s3) association with platinum resistance
     in BriTROC-1 (rows 4–7), explicitly **derivation-cohort only** (row 9), with purity/ploidy/immune
     flagged **not testable** on open data (row 8).
   - A **novel single-cell mechanism**: post-NACT HR/cell-cycle mean-expression score "collapse" is
     proliferation-confounded (rows 10–11), stated only at the tested resolution (mean-expression scores,
     11-patient NACT cohort), with universal RNA-biomarker claims **prohibited** (row 12).

## C. Framing invariants (must hold in every manuscript sentence)

- Agree with the source study at the **DNA layer**; novel contribution is at the **RNA-interpretation
  layer** only (row 13). No "refutes / overturns" language.
- s7 AUROC is **internal QA on published exposures**, never an external correction (rows 1–2).
- s3 is **protective** (higher s3 → sensitive); the "0.729" is `1 − AUROC` reported without a direction
  flag (row 4). Never state "higher s3 → resistant."
- s3 is **derivation-cohort**, never "durable/independent biomarker" (row 9).
- Single-cell finding is about **mean-expression pathway scores in 11 NACT patients**, never a universal
  RNA law (row 12).
- Correct s7≠CCNE1 (row 15); remove "confirmed the hypothesis" overreach (row 16); do not present a
  CrisPRO bottleneck-selection test that was not run (row 14).
- The discovery correlation post-DDR-vs-PFI **does not reproduce**: report ρ = **−0.21 (p = 0.54)**,
  indistinguishable from zero at n = 11 — never the original ρ = −0.711, which is
  **`NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`**: it cannot be traced to any reproducible,
  historical (version-control), or manual source, and the surviving pipeline on verified raw data
  does not produce it under any tested configuration (row 16; `SAE_ROOT_CAUSE_AUDIT.md`,
  `ITEM1_REPRODUCIBILITY_FORENSIC.md`). Do **not** call it ORIGINAL_ERROR (no wrong computation was
  shown to have run) and do **not** attribute its magnitude to the PFI error (disproven — OLD PFI
  gives ρ ≈ −0.009). The PFI EOC87 error is a separate, confirmed data-quality issue.

## D. Traceability index (every claim → script + table/figure + citation-or-flag)

| Claim rows | Script(s) | Table(s)/Figure(s) | External citation / internal flag |
|---|---|---|---|
| 1, 2 | `w2_britroc.py` | `S7_PROVENANCE_RECEIPT.md`, `obl2_auroc_summary.csv` | BriTROC-1 2023 (exposures) + INTERNAL (AUROC) |
| 3 | `obl2_label_swap_audit.py` | `LABEL_SWAP_AUDIT.csv`, `obl2_auroc_summary.csv`, `obl2_invariants.json` | INTERNAL artifact |
| 4–8 | `obl3_build_patient_table.py`, `obl3_s3_quantification.py`, `firth.py` | `obl3_report.json`, `obl3_all7_signatures_bh.csv`, `obl3_patient_master.csv`, `obl3_schoenfeld_s3.png` | BriTROC-1 2023 + Macintyre 2018 + INTERNAL (quantification) |
| 9 | — | — | PROHIBITED (no replication artifact) |
| 10, 11 | `obl4_single_cell_mechanism.py` | `obl4_report.json`, `obl4_clonal_diversity_perpatient.csv`, `obl4_perpatient_scores.csv`, `obl4_clonal_diversity.png`, `obl4_proliferation_confound.png` | Zhang 2022 (GSE165897) + INTERNAL (analysis) |
| 12 | — | `OBL4_MECHANISM.md` §5 | PROHIBITED (scope guard) |
| 13, 14 | — | `FRAMING_INTRINSIC_VS_ACQUIRED.md`, `w5_references.json` | INTERNAL flag; source conclusion |
| 15 | — | `OBL3_SIGNATURE_IDENTITY.md` | Macintyre 2018 (correction) |
| 16 | `w1_discovery.py`, `composite_roc_analysis_gse165897.py` (orig emitter line 399 = hardcoded string, inputs deleted), `pathway_kinetics_gse165897.py` (orig 8-gene generator), `sae_v2_geneset_test.py` (3 DDR gene sets), `validate_ovarian_pathway_model.py` (commit `e69324c`, hardcoded −0.711, read deleted CSV) | `w1_discovery.json` (W1-01), `discovery_rederivation.json`, `ITEM1_REPRODUCIBILITY_FORENSIC.md` (+§8/§8f addenda), **`SAE_ROOT_CAUSE_AUDIT.md`** (+§3a/§6b/§6c), `sae_root_cause_rerun.json`, `sae_exhaustive_sweep_summary.json`, `sae_v2_geneset_test.json`, `worker-0.ipynb` cells `cell-f412325fd78f` / `cell-cf87e6400cba` / `cell-5f818f0ba7a8` / `cell-80e82c714ea8` / `cell-614ff87439ee` | INTERNAL flag — **`NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`** (= `ORIGINAL_FIGURE_NOT_REPRODUCIBLE_UNDER_ANY_TESTED_PIPELINE`; ORIGINAL_ERROR NOT used). Partial feature diff = DDR gene set; 3 sets tested (8→14→26-gene), ceiling ρ_NEW −0.3545, insufficient; rescale monotonic/irrelevant; no feature×test×PFI×geneset combination reaches −0.711; all 5 Table-2 p-values recompute p>0.2. Git history: no history for the two files in any repo; −0.711 present only as hardcoded constants (commit `e69324c`). Manual path: zero `.ipynb`/`.R`/`.Rmd`/`.xlsx` analysis anywhere. PFI error disproven as magnitude cause (OLD PFI ρ ≈ −0.009), kept as separate data-quality issue. |

---

**Gate status: OBLIGATION #6 SATISFIED.** Every claim is sized to what was tested and traces to a
script, a table/figure, and an external citation or an explicit internal flag. Prohibited claims (rows
9, 12) and refuted framings (rows 2, 13, 14, 15, 16) are recorded so they cannot silently re-enter the
manuscript.

---

## E. Forensic-item resolutions (2026-07-27)

**ITEM 1 — Serial-SAE discovery-correlation collapse (ρ −0.711 → −0.209): RESOLVED (row 16).**
Side-by-side re-derivation shows the original ρ = −0.711 (emitter `composite_roc_analysis_gse165897.py`
line 399 = hardcoded string) is **not reproducible under any tested pipeline**, not "not yet confirmed."
Same 11 patients / same N / same Spearman test / label-independent, so **not** a subset effect.
Recomputation from raw UMI (`w1_discovery.py`, `discovery_rederivation.json`) gives ρ = **−0.2091, p =
0.5372** — **statistically indistinguishable from zero** (Fisher-z CI [−0.7287, 0.4633]; permutation p
0.5388; bootstrap CI [−0.7536, 0.5794] spans 0). **What was ruled in/out:** the one feature-construction
difference is the DDR gene set; recomputing across all three historical DDR sets (8/14/26-gene) gives
ρ_NEW −0.3545 / −0.2091 / −0.1455 (ceiling −0.3545, insufficient); no feature×test×PFI×geneset
combination reaches −0.711 (`sae_v2_geneset_test.json`, `sae_exhaustive_sweep_summary.json`); rescale is
monotonic (cannot change Spearman). **The PFI error is NOT a cause of the magnitude:** swapping only PFI
(NEW→OLD) on the fixed feature matrix moves post_ddr *toward zero* (ρ = −0.0091 14-gene / −0.0957
8-gene), disproving the PFI vector as a magnitude driver; it is kept as a separate, confirmed
data-quality issue (EOC87 274d→30d, wrong resistance class). **Git-history + manual-path checks (both
negative):** the two files have no history in any of the three repos; −0.711 appears only as hardcoded
constants (`validate_ovarian_pathway_model.py`, commit `e69324c`, which read the since-deleted
`pathway_scores.csv` and did not recompute from raw); zero `.ipynb`/`.R`/`.Rmd`/`.xlsx` analysis path
anywhere. **Category: `NO_COMPUTATIONAL_OR_MANUAL_SOURCE_ESTABLISHED`** (= `ORIGINAL_FIGURE_NOT_
REPRODUCIBLE_UNDER_ANY_TESTED_PIPELINE`; not SENSITIVE_TO_SUBSET; ORIGINAL_ERROR deliberately NOT used —
no wrong computation was shown to have run via an identified mechanism). Distinct issue, stated
separately: n=11 gives uselessly wide AUROC CIs (post_ddr [0.125–0.933]/[0.375–1.0], post_pi3k
[0–0.767]) — a power problem, not the reproducibility answer. Full record: `SAE_ROOT_CAUSE_AUDIT.md`,
`ITEM1_REPRODUCIBILITY_FORENSIC.md`.

**ITEM 2 — s7 AUROC 0.874 provenance: RESOLVED (row 2).** No external citation exists — BriTROC-1
*Nat Commun* 2023 (incl. `figure_4A.tsv`, `MOESM4_ESM.txt`) reports no s7-resistance AUROC in any
table/column/row/outcome field. The metric is an **INTERNAL** CrisPRO derivation
(`scripts/w2_britroc.py` `classify()` + `roc_auc_score`; `w2_britroc.json` W2-01, AUROC 0.8739).
**Row 2 does NOT flip** (it flips only on a real external citation). Claim **retained** as internal QA /
internal derivation, **not deleted**, **not** an external correction. Full record:
`S7_PROVENANCE_RECEIPT.md` §5.
