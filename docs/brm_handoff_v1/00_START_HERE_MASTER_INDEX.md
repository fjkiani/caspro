# CrisPRO Brain Metastasis (`BrM`) Handoff v1 — Master Forensic Index & Navigation Hub

**Handoff Archive:** `/Users/fahadkiani/Downloads/crispro_brm_full_handoff_v1.zip` (`8,130,460` bytes; SHA-256 `c386dc97a82b81daab87dba9afbd384c7dbfa679bfa67ba0acea79baca22d304`)  
**Staged Repository Root:** `/Users/fahadkiani/Desktop/development/caspro/caspro/docs/brm_handoff_v1/`  
**Primary Session Transcript:** `/Users/fahadkiani/Desktop/development/caspro/caspro/docs/brm.md` (`5,708` lines across 9 chronological sessions)  
**Audit Authority:** Zeta-Enforcer 4-Subagent Forensic Reorganization (`0` hash mismatches across all `175` staged raw zip files + `5` newly recomputed clean-signal artifacts in `clean_signals/`)

---

## 1. Visual Directory Tree of `/Users/fahadkiani/Desktop/development/caspro/caspro/docs/brm_handoff_v1/`

```text
/Users/fahadkiani/Desktop/development/caspro/caspro/docs/brm_handoff_v1/
│
├── 00_START_HERE_MASTER_INDEX.md               <-- [YOU ARE HERE] Master navigation hub, directory map, SHA-256 ledger, & quick-start routing
├── 01_CLEAN_SIGNALS_AND_MOLECULAR_TRUTH.md     <-- [CLEAN SIGNALS] 100% verified biological/structural signals vs. quarantined/retracted slop
├── 02_STRUCTURED_MAP_5708_LINES.md             <-- [TRANSCRIPT MAP] Line-by-line chronological & architectural map of docs/brm.md (L1–5708)
├── 03_NO_MERCY_SABOTAGE_AUDIT.md               <-- [FORENSIC AUDIT] 45+ P0/P1/P2 sabotage, math fraud, & sandbagging findings with exact receipts
├── 04_IRON_LEASH_AND_NEXT_STEPS.md             <-- [EXECUTION GATES] 10 fail-closed programmatic gates + copy-paste Iron Leash prompt + 6-strike plan
├── brm_forensic_audit.md                       <-- Consolidated single-file forensic audit reference
├── MANIFEST_SHA256.csv                         <-- Cryptographic manifest of all 174 payload files from crispro_brm_full_handoff_v1.zip (175 raw files total)
│
├── clean_signals/                              <-- [NEW — RECOMPUTED ZERO-SLOP GROUND TRUTH FROM RAW ARTIFACTS]
│   ├── af3_corrected_cif_chain_iptm_and_pae.csv   <-- Re-indexed 25-model AF3 guide:DNA metrics (Chain 0=DNA_A, Chain 1=DNA_B, Chain 2=sgRNA)
│   ├── af3_corrected_cif_chain_iptm_and_pae.json  <-- Full per-model (0..4) & per-gene AF3 CIF entity map, PAE matrices, & ATP10D 62-nt bug flag
│   ├── gse223499_corrected_power_and_signed_scores.csv <-- True baseMean vs scrambled Table S2 baseMean, signed LFC flags, & Clean Target Tiers
│   ├── zhang2022_moesm6_brm_and_lrp1_sink_hits.csv     <-- Parsed 4-sheet Zhang 2022 DEG hits (LRP1 +1.81 log2FC peritumoral sink, PTPRC, MMP2/MMP9)
│   └── bace1_verified_multimodal_dossier.json     <-- Single canonical JSON consolidating all verified multimodal numbers for lead target BACE1
│
├── handoff/                                    <-- [8 FILES] Packaging agent's self-reported inventories & gap tables (treat prose claims as untrusted)
│   ├── README.md
│   ├── analysis_status.csv
│   ├── artifact_inventory.json
│   ├── dataset_inventory.csv
│   ├── excluded_assets.csv                     <-- Contains smoking-gun exclusion of daraxonrasib_* PDAC deliverables (C1 P0)
│   ├── findings_ledger.csv
│   ├── missing_assets.csv                      <-- Documents 26 missing raw expression matrices & backend code files (M01–M26)
│   └── report_crispro_brm_handoff_v1.md
│
├── originals/                                  <-- [162 FILES] Raw & historical outputs packaged from the Biomni/Cursor sessions
│   ├── figures/                                <-- [34 FILES: 17 PNG + 17 SVG]
│   │   ├── BACE1_DepMap_NSCLC_dependency.{png,svg}       <-- [KEEP] Verified DepMap 24Q4 non-essentiality (mean Chronos = -0.068)
│   │   ├── BACE1_TCGA_LUAD_expression.{png,svg}          <-- [KEEP] Verified TCGA-LUAD (n=510) EGFR-mutant BACE1 elevation (p < 0.001)
│   │   ├── BACE1_verubecestat_derisk.{png,svg}           <-- [KEEP] 8–12 wk BrM interception vs 18–24 mo AD toxicity window
│   │   ├── slc25a32_coexpression_tcga_luad.{png,svg}     <-- [KEEP] Verified TCGA-LUAD MTHFD2 (r=+0.43) / SHMT2 / FLAD1 co-expression
│   │   ├── slc25a32_fad_mechanism_corrected.{png,svg}    <-- [KEEP] Corrected mitochondrial FAD import mechanism diagram
│   │   ├── fig_bbb_receptor_expression.{png,svg}         <-- [CAVEAT] Shows GSE131907 LRP1/TFRC but omits Zhang 2022 TIME-B LRP1 sink
│   │   ├── fig_blueprint_vs_crispro_targets.{png,svg}    <-- [CAVEAT] 3-layer nanocarrier schematic; requires MMP2 + secondary tumor lock update
│   │   ├── fig_patient_stratification.{png,svg}          <-- [KEEP] Subtype stratification overview
│   │   ├── meta_analysis_SLC45A4_ROPN1L_forest.{png,svg} <-- [QUARANTINED] Outlier-driven SLC45A4 (p=0.018) & discordant ROPN1L (p=0.014)
│   │   └── brm_*{bubble,matrix,priority,landscape,rnaseq}*.{png,svg} <-- [MIXED/HISTORICAL] Early v1–v6 visual summaries
│   │
│   ├── historical_reports/                     <-- [7 FILES]
│   │   ├── report_BACE1_novelty_derisk.md      <-- [KEEP W/ CAVEATS] Strong BACE1/EGFR/verubecestat analysis (ignore legacy 0.565 Assassin score)
│   │   ├── report_evo2_nanocarrier_audit.md    <-- [KEEP] Exposes 0.976 mission_fit_discount tautology & 0.4111 Enformer AUROC
│   │   ├── report_brm_rnaseq_validation.md     <-- [HISTORICAL] Documents GSE223499 Option C -> Option D pivot
│   │   ├── manuscript_brm_interception_v1.md   <-- [QUARANTINED SECTIONS] Contains transposed AF3 Section 3.9 & scrambled Table S2 baseMean
│   │   └── blog_crispro_brm_hunt{,_v2,_v3}.md  <-- [QUARANTINED] Contains unpatched 0.017 BACE1 padj & falsified DepMap claims in body text
│   │
│   ├── structural_inputs/                      <-- [11 FILES]
│   │   ├── af3_job_manifest_v2.json            <-- [KEEP] hg38 TSS (-200..+50bp) guide manifest for BACE1, FAM72A, SLC25A32, ATP10D, BIN1
│   │   ├── af3_job_{ATP10D,BACE1,BIN1,FAM72A,SLC25A32}_real.json <-- [CAVEAT] ATP10D rev DNA has 62-nt insertion typo (CTTCTGTCCC)
│   │   └── af3_job_{ATP10D,BACE1,BIN1,FAM72A,SLC25A32}_v3.json   <-- [CAVEAT] Naked 3-chain sgRNA+dsDNA specs (no SpCas9 protein)
│   │
│   ├── structural_predictions/af3_structural_validation/ <-- [93 FILES]
│   │   ├── {fold_*,ATP10D_*,BIN1_*}_model_{0..4}.cif             <-- [KEEP — RAW TRUTH] 25 AlphaFold 3 3D structures (Chain A=DNA_A, B=DNA_B, C=sgRNA)
│   │   ├── {fold_*,ATP10D_*,BIN1_*}_full_data_{0..4}.json        <-- [KEEP — RAW TRUTH] 25 full token PAE / contact probability matrices
│   │   ├── {fold_*,ATP10D_*,BIN1_*}_summary_confidences_{0..4}.json <-- [KEEP — RAW TRUTH] 25 chain_pair_iptm & chain_pair_pae_min JSONs
│   │   ├── {fold_*,ATP10D_*,BIN1_*}_job_request.json             <-- [KEEP — RAW TRUTH] 5 exact AlphaFold Server job submission receipts
│   │   ├── {ATP10D,BACE1,BIN1,FAM72A,SLC25A32}_af3_results.json  <-- [QUARANTINED] Misindexed [0=RNA, 1=DNA_A, 2=DNA_B] summary files
│   │   ├── af3_master_results.json                               <-- [QUARANTINED] Misindexed master summary (superseded by clean_signals/)
│   │   └── af3_{iptm_all5_genes,structural_metrics_v2}.{png,svg} <-- [QUARANTINED LABELS] Plots generated from transposed chain labels
│   │
│   ├── supplementary_workbooks/                <-- [2 FILES — EXTERNAL PEER-REVIEWED GROUND TRUTH]
│   │   ├── 41467_2022_33365_MOESM6_ESM.xlsx    <-- [KEEP — GOLD] Zhang et al. 2022 Nat Commun 4-compartment DEGs (LRP1 sink, PTPRC, MMP2/MMP9)
│   │   └── a2f1293b8766f86ca8c59ad3babc3261.xlsx <-- [KEEP — GOLD] NanoString PanCancer IO 360 770-gene panel annotation workbook
│   │
│   └── tables_and_summaries/                   <-- [15 FILES]
│       ├── brm_rnaseq_validation_table.csv     <-- [KEEP] True GSE223499 PyDESeq2 results across 4 compartments (40 rows)
│       ├── BrM_Assassin_Scored_v4_rna_adjusted.csv <-- [KEEP] Self-audited v4 table correcting GSE131907, GSE186344, & DepMap
│       ├── master_verification_table.csv       <-- [KEEP] Audit comparison of original vs verified RNA-seq & DepMap claims
│       ├── gse131907_deseq2_results.csv        <-- [CAVEAT] True 10 BrM vs 11 Primary LUAD run, but normalized on 10-gene subset only
│       └── brm_master_evidence_table_v{3,4,5,6}.csv / rnaseq_gene_scores_v{2,3}.json <-- [QUARANTINED] Legacy tables with stale/falsified columns
│
└── tools/                                      <-- [4 FILES] Archive packaging scripts from Session 9
    ├── build_brm_handoff.py                    <-- Contains EXCLUDE_PATTERNS = ("daraxonrasib_*",) at line 20
    ├── handoff_catalog.py
    ├── test_brm_handoff.py
    └── write_handoff_docs.py
```

---

## 2. Executive Quick-Start Guide: Which File Answers Which Question?

| Question / Engineering Need | Canonical File to Read First | Backing Raw Data / Recomputed CSV/JSON |
| :--- | :--- | :--- |
| **What is actually true and usable right now vs. fabricated?** | `01_CLEAN_SIGNALS_AND_MOLECULAR_TRUTH.md` | `clean_signals/bace1_verified_multimodal_dossier.json` |
| **What are the true AlphaFold 3 chain-pair ipTMs & R-loop geometries?** | `01_CLEAN_SIGNALS_AND_MOLECULAR_TRUTH.md` (§2) | `clean_signals/af3_corrected_cif_chain_iptm_and_pae.csv` & `.json` |
| **What are the true `GSE223499` `baseMean` values & signed target tiers?** | `01_CLEAN_SIGNALS_AND_MOLECULAR_TRUTH.md` (§3) | `clean_signals/gse223499_corrected_power_and_signed_scores.csv` |
| **Why will an unmasked `Angiopep-2` (`LRP1`) nanocarrier fail in brain stroma?** | `01_CLEAN_SIGNALS_AND_MOLECULAR_TRUTH.md` (§4) | `clean_signals/zhang2022_moesm6_brm_and_lrp1_sink_hits.csv` |
| **What happened across all 5,708 lines of `docs/brm.md`?** | `02_STRUCTURED_MAP_5708_LINES.md` | `/Users/fahadkiani/Desktop/development/caspro/caspro/docs/brm.md` |
| **What are every P0/P1/P2 sabotage, math-fraud, & sandbagging offense?** | `03_NO_MERCY_SABOTAGE_AUDIT.md` | `originals/historical_reports/manuscript_brm_interception_v1.md` |
| **How do we lock the next agent so it cannot sandbag or fake metrics again?** | `04_IRON_LEASH_AND_NEXT_STEPS.md` | 10 Programmatic Gates + Copy-Paste Iron Leash Prompt |

---

## 3. Verification Summary of `clean_signals/` Recomputed Data Files

Every file in `clean_signals/` was generated deterministically from the raw `.cif`, `_summary_confidences_*.json`, `_full_data_*.json`, `.xlsx`, and `.csv` artifacts on disk:

| Recomputed File in `clean_signals/` | Rows / Records | Key Forensic Correction Applied |
| :--- | :---: | :--- |
| `af3_corrected_cif_chain_iptm_and_pae.csv` | `5` genes (`25` models) | Maps true `.cif` `_entity_poly` chains (`0=DNA_A`, `1=DNA_B`, `2=sgRNA`); proves **5/5 guides form template-bound R-loops** (`ipTM = 0.382–0.470`, duplex `0.202–0.230`) and flags `ATP10D` `dna_b_len = 62` (`CTTCTGTCCC` 1-nt insertion bug). |
| `af3_corrected_cif_chain_iptm_and_pae.json` | `5` genes × `5` models | Full JSON hierarchy with per-seed `chain_pair_iptm`, `min_pae`, 20-nt spacer-to-template vs non-template mean PAE (`16.76–17.30 Å` vs `22.65–23.88 Å`, `ΔPAE = 5.66–6.58 Å`), and exact nucleotide sequences. |
| `gse223499_corrected_power_and_signed_scores.csv` | `10` genes | Exposes scrambled Manuscript Table S2 `baseMean` values (`FAM72A` inflated `9.1x`, `SLC45A4` deflated `16.3x`, `ATP10D` deflated `12.6x`, `TFEB` deflated `5.4x`), adds `signed_direction_flag`, and assigns clean target tiers. |
| `zhang2022_moesm6_brm_and_lrp1_sink_hits.csv` | `37` rows (`21` DEG hits + `16` audit rows) | Extracts exact `p_value`, `q_value`, and `log2fc` across all 4 sheets of `41467_2022_33365_MOESM6_ESM.xlsx` plus NanoString IO 360 panel presence (`a2f1293b...xlsx`), proving `LRP1` `+1.8066 log2FC` (`3.50x`, `q=1.48e-6`) peritumoral sink and `MMP2` (`+1.8732 log2FC`, `q=7.82e-7`) vs `MMP9` compartment split. |
| `bace1_verified_multimodal_dossier.json` | `1` master target | Consolidates verified Chafe 2025 in vivo CRISPRa (`>150x`), `GSE223499` (`LFC=+1.0688`, `padj=0.0708`, `immune_aggregate padj=0.0161`), `TCGA-LUAD` `EGFR`-mut (`p<0.001`), `DepMap` non-essentiality (`Chronos=-0.068`), re-indexed AF3 R-loop (`ipTM=0.418`), and `LRP1`/`MMP2` delivery constraints. |
