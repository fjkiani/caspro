# BrM & GBM Two-Door Discovery Engine — Strike 1, Strike 2 & Strike 3 (`U6`) Excavation Ledger

**Date:** 2026-11-04  
**Scope:** 100% real on-disk data across `GSE223499`, `Zhang et al. 2022` (`MOESM6_ESM.xlsx` + `GSE200563`), `GSE131907`, `GSE186344`, `GSE174554`, `GLASS` (`syn17038081`), `DepMap 24Q4` (`CRISPRGeneEffect.csv`, `OmicsExpression.parquet`, `Model.csv`), and `GDSC1` / `GDSC2` (`gdsc1.parquet`, `gdsc2.parquet`). Zero synthetic values (`UNCLEAR != ASSUMED`).

---

## 1. Artifact Inventory in `brm_gbm_two_door_complete_excavation/`

1. `strike1_gse223499_all_compartments.json` & `.csv` — All 40 on-disk `GSE223499` PyDESeq2 rows (`10` target genes × `4` compartments: `confirmed_tumor`, `tumor_like`, `immune_aggregate`, `t_cells`) with exact `padj < 0.05` and `baseMean >= 50` counts, plus the Table S2 `baseMean` forensic reconciliation.
2. `strike1_zhang2022_all_sheets_and_receptors.json` & `.csv` — Complete 765-row extraction across all 4 sheets of `41467_2022_33365_MOESM6_ESM.xlsx` (`TBME vs. BC` [251], `TIME-B vs. LB` [193], `TIME-L vs.L` [222], `F(h) vs. F(-)` [99]), complete negative `Log2FC` tails (`LB > TIME-B`, `BC > TBME`, `L > TIME-L`, `F(-) > F(h)`), `TIME-B vs. TIME-L` & `LB vs. L` compartment crosswalk, `GSE200563` paired `LB vs. L` spatial Wilcoxon results, and 88-gene receptor/target/immune query table.
3. `strike2_brm_two_door_and_immune_laws.json` & `.csv` — Two-Door (`Door 1` vs `Door 2`) and Immunotherapy v12 (`E_effector`, `S_triad`, `PTPRC` vs peritumoral `CD163 / MRC1 / LRP1 / APOE / VSIG4 / BACE1` myeloid suppression) scored across on-disk BrM/GBM cohorts (`GSE223499`, `GSE131907`, `GSE186344`, `Zhang 2022`, `GSE174554`, `GLASS n=123`, and `DepMap 24Q4 n=12` human brain-metastasis-derived solid tumor cell lines).
4. `strike3_depmap_gdsc_prism_cns_prep.json`, `strike3_depmap_u6_crispr_correlations.csv`, & `strike3_gdsc_cns_drug_sensitivity.csv` — Complete `U6` closure across `CNS_Glioblastoma` (`n=45`), `CNS_Diffuse_Glioma` (`n=62`), `CNS_Brain_All` (`n=80`), `NSCLC` (`n=95`), `Breast` (`n=47`), `Melanoma` (`n=66`), and `BrM_Derived_Models` (`n=8`), plus `GDSC1`/`GDSC2` drug sensitivity across `36` CNS-penetrant, Door-1, Door-2, and integrin-effector (`FAK1`/`SRC`) compounds.
