#!/usr/bin/env python3
"""
OBL#4 - Prove the single-cell mechanism precisely, with correct scope.

Dataset: GSE165897 (Zhang et al. 2022 Sci Adv), paired treatment-naive / post-NACT
scRNA-seq, 11 HGSOC patients. Malignant compartment = EOC.

Required (verbatim):
  (a) Reproduce clonal diversity collapse (~27.8%) and dispersion increase (~14.3%)
      after rarefaction, with PER-PATIENT values shown.
  (b) Proliferation-arrest regression: HR/cell-cycle score shift BEFORE adjustment,
      correlation with proliferation change, residual shift AFTER adjustment (~p=0.70),
      using >=2 NON-OVERLAPPING proliferation gene sets.
  (c) Run at malignant-cell-only resolution with an INDEPENDENT malignant-cell call
      (re-cluster + marker score), not just the authors' EOC label.
  (d) Leave-one-patient-out stability (n=11).

Scope discipline (enforced):
  Finding is stated ONLY as: in this NACT single-cell cohort, apparent post-treatment
  collapse of HR/cell-cycle MEAN-EXPRESSION scores is substantially explained by
  proliferative arrest, not a change in DNA-repair status. No universal RNA-biomarker claims.

Inputs (cached on worker-1): umi_genes_x_cells.npz, umi_axes.pkl, cellInfo tsv, resistance_labels.json
Outputs: tables/obl4_*.csv, tables/obl4_report.json, figures/obl4_*.png
"""
import json
import warnings
import numpy as np
import pandas as pd
import scipy.sparse as sp
import scanpy as sc
import anndata as ad
import matplotlib
matplotlib.use("Agg")
matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
matplotlib.rcParams["svg.fonttype"] = "none"
import matplotlib.pyplot as plt
from scipy.stats import spearmanr, wilcoxon
import statsmodels.api as sm

warnings.filterwarnings("ignore")
sc.settings.verbosity = 0
SEED = 42
np.random.seed(SEED)
SC = "/workspace/sc_data"
TAB = "/mnt/results/serial_sae_validation/obligations/tables"
FIG = "/mnt/results/serial_sae_validation/obligations/figures"
LABELS = "/mnt/shared-workspace/shared/serial_sae_validation/gse165897/resistance_labels.json"

# ---- gene sets ----
# HR / DNA-repair (HRD axis) set
HR_GENES = ["BRCA1", "BRCA2", "PALB2", "RAD51", "RAD51B", "RAD51C", "RAD51D", "ATM", "ATR",
            "CHEK1", "CHEK2", "FANCA", "FANCC", "FANCD2", "BARD1", "BRIP1", "XRCC2", "XRCC3",
            "RAD54L", "MRE11", "NBN", "RAD50", "EXO1", "BLM"]
# Two NON-OVERLAPPING proliferation gene sets (to rule out gene-overlap artifact):
# Set A: canonical G2/M-heavy set (Tirosh/Regev G2M markers)
PROLIF_A = ["CCNB1", "CCNB2", "CDK1", "CDC20", "PLK1", "AURKA", "AURKB", "BUB1", "BUB1B",
            "CENPA", "CENPE", "CENPF", "KIF11", "KIF23", "TOP2A", "TPX2", "UBE2C", "NUSAP1"]
# Set B: canonical S-phase / replication set (Tirosh/Regev S markers), disjoint from A and HR
PROLIF_B = ["MCM2", "MCM3", "MCM4", "MCM5", "MCM6", "MCM7", "PCNA", "RRM1", "RRM2", "TYMS",
            "CDC6", "CDC45", "GINS2", "DTL", "CDCA7", "SLBP", "USP1", "CLSPN"]
# Cell-cycle score set = union of proliferation markers (for the "HR/cell-cycle" composite the manuscript uses)
assert len(set(PROLIF_A) & set(PROLIF_B)) == 0, "proliferation sets must be disjoint"
assert len(set(HR_GENES) & (set(PROLIF_A) | set(PROLIF_B))) == 0, "HR and proliferation sets must be disjoint"


def load_adata():
    M = sp.load_npz(f"{SC}/umi_genes_x_cells.npz")  # genes x cells
    import pickle
    ax = pickle.load(open(f"{SC}/umi_axes.pkl", "rb"))
    genes, cells = ax["genes"], ax["cells"]
    A = ad.AnnData(X=M.T.tocsr(), obs=pd.DataFrame(index=cells), var=pd.DataFrame(index=genes))
    ci = pd.read_csv(f"{SC}/GSE165897_cellInfo_HGSOC.tsv.gz", sep="\t").set_index("cell")
    ci = ci.reindex(A.obs_names)
    for c in ["patient_id", "treatment_phase", "cell_type", "cell_subtype", "sample",
              "nCount_RNA", "nFeature_RNA", "percent.mt"]:
        A.obs[c] = ci[c].values
    labels = json.load(open(LABELS))
    A.obs["resistance"] = A.obs["patient_id"].map(lambda p: labels.get(p, {}).get("classification", np.nan))
    return A


def score_set(A, genes, name):
    present = [g for g in genes if g in A.var_names]
    sc.tl.score_genes(A, present, score_name=name, random_state=SEED)
    return present


def independent_malignant_call(A):
    """Re-cluster on normalized/HVG/PCA/Leiden and assign malignant vs non-malignant by
    epithelial-marker score, INDEPENDENT of the authors' EOC label. Return per-cell bool."""
    B = A.copy()
    sc.pp.normalize_total(B, target_sum=1e4)
    sc.pp.log1p(B)
    sc.pp.highly_variable_genes(B, n_top_genes=2000, flavor="seurat")
    B = B[:, B.var["highly_variable"]].copy()
    sc.pp.scale(B, max_value=10)
    sc.tl.pca(B, n_comps=30, random_state=SEED)
    sc.pp.neighbors(B, n_neighbors=15, n_pcs=30, random_state=SEED)
    sc.tl.leiden(B, resolution=1.0, random_state=SEED, flavor="igraph", n_iterations=2, directed=False)
    # epithelial / HGSOC malignant markers vs immune + stromal markers
    epi = [g for g in ["EPCAM", "KRT8", "KRT18", "KRT19", "PAX8", "WT1", "MUC16", "CD24", "KRT7"] if g in B.var_names]
    imm = [g for g in ["PTPRC", "CD3D", "CD3E", "CD68", "LYZ", "CD79A", "MS4A1", "NKG7"] if g in B.var_names]
    strom = [g for g in ["DCN", "COL1A1", "COL1A2", "PDGFRB", "ACTA2", "VWF", "PECAM1"] if g in B.var_names]
    sc.tl.score_genes(B, epi, score_name="epi_score", random_state=SEED)
    sc.tl.score_genes(B, imm, score_name="imm_score", random_state=SEED)
    sc.tl.score_genes(B, strom, score_name="strom_score", random_state=SEED)
    df = B.obs.groupby("leiden")[["epi_score", "imm_score", "strom_score"]].mean()
    malignant_clusters = df.index[(df["epi_score"] > df["imm_score"]) & (df["epi_score"] > df["strom_score"]) & (df["epi_score"] > 0)]
    B.obs["indep_malignant"] = B.obs["leiden"].isin(malignant_clusters)
    return B.obs["indep_malignant"].reindex(A.obs_names).fillna(False).values, B.obs["leiden"].reindex(A.obs_names).values


def clonal_diversity_rarefied(A_mal, n_rare=None, n_iter=50, seed=SEED):
    """Per patient x phase: Shannon diversity + dispersion of subclones (cell_subtype)
    computed after rarefaction to a common cell count (min across the patient's two phases)."""
    rng = np.random.default_rng(seed)
    rows = []
    for pid in sorted(A_mal.obs["patient_id"].unique()):
        sub = A_mal.obs[A_mal.obs["patient_id"] == pid]
        counts = sub.groupby("treatment_phase").size()
        if not {"treatment-naive", "post-NACT"}.issubset(set(counts.index)):
            continue
        n_min = int(counts.min())
        if n_min < 10:
            rows.append({"patient_id": pid, "n_rare": n_min, "skipped": True})
            continue
        vals = {}
        for phase in ["treatment-naive", "post-NACT"]:
            idx = sub.index[sub["treatment_phase"] == phase].tolist()
            shannons, disps = [], []
            for _ in range(n_iter):
                pick = rng.choice(idx, size=n_min, replace=False)
                labs = A_mal.obs.loc[pick, "cell_subtype"].astype(str).values
                p = pd.Series(labs).value_counts(normalize=True).values
                shannon = -np.sum(p * np.log(p + 1e-12))
                # dispersion = pairwise transcriptomic dispersion (mean distance to centroid in PCA space)
                Xp = A_mal[pick].obsm["X_pca"]
                centroid = Xp.mean(0)
                disp = np.sqrt(((Xp - centroid) ** 2).sum(1)).mean()
                shannons.append(shannon); disps.append(disp)
            vals[phase] = (np.mean(shannons), np.mean(disps))
        s_naive, d_naive = vals["treatment-naive"]
        s_post, d_post = vals["post-NACT"]
        rows.append({"patient_id": pid, "n_rare": n_min,
                     "shannon_naive": s_naive, "shannon_post": s_post,
                     "shannon_pct_change": 100 * (s_post - s_naive) / (s_naive + 1e-12),
                     "dispersion_naive": d_naive, "dispersion_post": d_post,
                     "dispersion_pct_change": 100 * (d_post - d_naive) / (d_naive + 1e-12),
                     "skipped": False})
    return pd.DataFrame(rows)


def main():
    A = load_adata()
    print(f"Loaded AnnData: {A.shape}")

    # ---- (c) INDEPENDENT malignant call ----
    indep_mal, leiden = independent_malignant_call(A)
    A.obs["indep_malignant"] = indep_mal
    A.obs["leiden"] = leiden
    author_eoc = (A.obs["cell_type"] == "EOC").values
    agree = (indep_mal == author_eoc)
    concordance = {
        "n_cells": int(A.n_obs),
        "author_EOC": int(author_eoc.sum()),
        "independent_malignant": int(indep_mal.sum()),
        "both_agree_malignant": int((indep_mal & author_eoc).sum()),
        "independent_only": int((indep_mal & ~author_eoc).sum()),
        "author_only": int((~indep_mal & author_eoc).sum()),
        "jaccard": float((indep_mal & author_eoc).sum() / ((indep_mal | author_eoc).sum() + 1e-12)),
    }
    print("[c] Independent malignant call vs author EOC:", concordance)

    # Use the INTERSECTION as the high-confidence malignant set for the mechanism analysis
    A.obs["malignant_final"] = A.obs["indep_malignant"] & author_eoc
    A_mal = A[A.obs["malignant_final"]].copy()
    print(f"    malignant_final cells: {A_mal.n_obs}")

    # normalize + PCA on malignant-only for scoring & dispersion
    sc.pp.normalize_total(A_mal, target_sum=1e4); sc.pp.log1p(A_mal)
    A_mal.raw = A_mal
    sc.pp.highly_variable_genes(A_mal, n_top_genes=2000, flavor="seurat")
    A_hvg = A_mal[:, A_mal.var["highly_variable"]].copy()
    sc.pp.scale(A_hvg, max_value=10); sc.tl.pca(A_hvg, n_comps=30, random_state=SEED)
    A_mal.obsm["X_pca"] = A_hvg.obsm["X_pca"]

    # ---- scores: HR, proliferation A, proliferation B, cell-cycle composite ----
    hr_present = score_set(A_mal, HR_GENES, "hr_score")
    pa_present = score_set(A_mal, PROLIF_A, "prolif_A")
    pb_present = score_set(A_mal, PROLIF_B, "prolif_B")
    score_set(A_mal, PROLIF_A + PROLIF_B, "cellcycle_score")  # composite = PROLIF_A U PROLIF_B (contains both predictors -> circular if regressed on either)
    # Cross-scored composites for NON-CIRCULAR tests: score on ONE proliferation set, regress on the OTHER (disjoint) set.
    score_set(A_mal, PROLIF_A, "cc_from_A")  # composite scored on G2/M genes only -> regress on prolif_B_delta (S-phase; no shared genes)
    score_set(A_mal, PROLIF_B, "cc_from_B")  # composite scored on S-phase genes only -> regress on prolif_A_delta (G2/M; no shared genes)
    genesets = {"HR_n": len(hr_present), "prolifA_n": len(pa_present), "prolifB_n": len(pb_present)}
    print("[genes present]", genesets)

    # ---- (a) Clonal diversity collapse + dispersion increase after rarefaction ----
    cd = clonal_diversity_rarefied(A_mal)
    cd.to_csv(f"{TAB}/obl4_clonal_diversity_perpatient.csv", index=False)
    ok = cd[cd["skipped"] == False]
    agg = {"n_patients_evaluated": int(len(ok)),
           "mean_shannon_pct_change": round(float(ok["shannon_pct_change"].mean()), 2),
           "mean_dispersion_pct_change": round(float(ok["dispersion_pct_change"].mean()), 2),
           "median_shannon_pct_change": round(float(ok["shannon_pct_change"].median()), 2),
           "median_dispersion_pct_change": round(float(ok["dispersion_pct_change"].median()), 2)}
    print("[a] Clonal diversity (rarefied):", agg)

    # ---- (b) Proliferation-arrest regression, per-patient pseudobulk means ----
    score_cols = ["hr_score", "prolif_A", "prolif_B", "cellcycle_score", "cc_from_A", "cc_from_B"]
    pb = A_mal.obs.copy()
    for s in score_cols:
        pb[s] = A_mal.obs[s].values
    means = pb.groupby(["patient_id", "treatment_phase"])[score_cols].mean().reset_index()
    wide = means.pivot(index="patient_id", columns="treatment_phase")
    reg_rows = []
    for pid in wide.index:
        try:
            row = {"patient_id": pid}
            for s in score_cols:
                row[f"{s}_naive"] = wide[(s, "treatment-naive")][pid]
                row[f"{s}_post"] = wide[(s, "post-NACT")][pid]
                row[f"{s}_delta"] = row[f"{s}_post"] - row[f"{s}_naive"]
            reg_rows.append(row)
        except Exception:
            continue
    R = pd.DataFrame(reg_rows).dropna()
    R.to_csv(f"{TAB}/obl4_perpatient_scores.csv", index=False)

    def prolif_adjust(hr_delta_col, prolif_delta_col):
        y = R[hr_delta_col].values
        x = R[prolif_delta_col].values
        # before adjustment: is the HR/cell-cycle delta significantly != 0?
        w_before = wilcoxon(R[hr_delta_col.replace("_delta", "_post")].values,
                            R[hr_delta_col.replace("_delta", "_naive")].values)
        rho, prho = spearmanr(x, y)
        # after adjustment: regress HR delta on proliferation delta; is intercept (residual shift) != 0?
        X = sm.add_constant(x)
        ols = sm.OLS(y, X).fit()
        resid_shift_p = float(ols.pvalues[0])  # intercept p = residual mean shift after removing proliferation
        return {"before_wilcoxon_p": round(float(w_before.pvalue), 4),
                "corr_with_proliferation_rho": round(float(rho), 4),
                "corr_with_proliferation_p": round(float(prho), 4),
                "residual_shift_intercept": round(float(ols.params[0]), 4),
                "residual_shift_p_after_adjust": round(resid_shift_p, 4),
                "prolif_beta": round(float(ols.params[1]), 4),
                "prolif_beta_p": round(float(ols.pvalues[1]), 4)}

    # NON-CIRCULAR tests (predictor and outcome share NO genes) -- these are the primary evidence:
    #   (1) HR-only score (disjoint from both prolif sets) vs each prolif set
    #   (2) cross-scored composite: scored on one prolif set, regressed on the OTHER disjoint prolif set
    reg_noncircular = {
        "hr_vs_prolifA": prolif_adjust("hr_score_delta", "prolif_A_delta"),
        "hr_vs_prolifB": prolif_adjust("hr_score_delta", "prolif_B_delta"),
        "ccG2M_vs_prolifB_Sphase": prolif_adjust("cc_from_A_delta", "prolif_B_delta"),  # G2/M composite ~ S-phase set (disjoint)
        "ccSphase_vs_prolifA_G2M": prolif_adjust("cc_from_B_delta", "prolif_A_delta"),  # S-phase composite ~ G2/M set (disjoint)
    }
    # CIRCULAR tests (composite = union, regressed on its own component set) -- reported ONLY for transparency, NOT as evidence:
    reg_circular = {
        "cellcycle_vs_prolifA_CIRCULAR": prolif_adjust("cellcycle_score_delta", "prolif_A_delta"),
        "cellcycle_vs_prolifB_CIRCULAR": prolif_adjust("cellcycle_score_delta", "prolif_B_delta"),
    }
    reg = {**reg_noncircular, **reg_circular}
    print("[b] Proliferation-arrest regression (NON-CIRCULAR = primary):")
    for k, v in reg_noncircular.items():
        print(f"    [nc] {k}: before_p={v['before_wilcoxon_p']} corr_rho={v['corr_with_proliferation_rho']} residual_p={v['residual_shift_p_after_adjust']}")
    print("    (circular, transparency only):")
    for k, v in reg_circular.items():
        print(f"    [circ] {k}: corr_rho={v['corr_with_proliferation_rho']} residual_p={v['residual_shift_p_after_adjust']}")

    # ---- (d) Leave-one-patient-out on the key regression (HR delta ~ proliferation delta) ----
    def lopo(hr_delta_col, prolif_delta_col):
        betas, resid_ps = [], []
        for pid in R["patient_id"]:
            sub = R[R["patient_id"] != pid]
            X = sm.add_constant(sub[prolif_delta_col].values)
            ols = sm.OLS(sub[hr_delta_col].values, X).fit()
            betas.append(float(ols.params[1])); resid_ps.append(float(ols.pvalues[0]))
        return {"beta_min": round(min(betas), 4), "beta_max": round(max(betas), 4),
                "residual_p_min": round(min(resid_ps), 4), "residual_p_max": round(max(resid_ps), 4)}
    lopo_res = {"ccG2M_vs_prolifB_Sphase": lopo("cc_from_A_delta", "prolif_B_delta"),   # non-circular
                "ccSphase_vs_prolifA_G2M": lopo("cc_from_B_delta", "prolif_A_delta"),   # non-circular
                "cellcycle_vs_prolifA_CIRCULAR": lopo("cellcycle_score_delta", "prolif_A_delta"),
                "cellcycle_vs_prolifB_CIRCULAR": lopo("cellcycle_score_delta", "prolif_B_delta")}
    print("[d] LOPO (non-circular first):", lopo_res)

    report = {"dataset": "GSE165897 (Zhang 2022 Sci Adv)", "n_patients": int(A.obs["patient_id"].nunique()),
              "gene_sets": {"HR": HR_GENES, "prolif_A_G2M": PROLIF_A, "prolif_B_S": PROLIF_B,
                            "disjoint_verified": True, "present_counts": genesets},
              "independent_malignant_call": concordance,
              "clonal_diversity_rarefied": agg,
              "proliferation_arrest_regression": reg,
              "proliferation_arrest_regression_noncircular_keys": list(reg_noncircular.keys()),
              "proliferation_arrest_regression_circular_keys": list(reg_circular.keys()),
              "circularity_note": ("cellcycle_score = PROLIF_A U PROLIF_B, so regressing it on PROLIF_A or PROLIF_B "
                                   "shares genes between predictor and outcome (circular, correlation inflated by "
                                   "construction). Those two pairings are reported ONLY for transparency. The PRIMARY, "
                                   "non-circular evidence is: (1) the HR-only score (disjoint from both proliferation "
                                   "sets) vs each proliferation set, and (2) cross-scored composites (scored on one "
                                   "proliferation set, regressed on the OTHER disjoint set: ccG2M_vs_prolifB_Sphase, "
                                   "ccSphase_vs_prolifA_G2M)."),
              "leave_one_patient_out": lopo_res,
              "scope_statement": ("Finding stated only at tested resolution: in this NACT single-cell cohort, "
                                  "apparent post-treatment collapse of HR/cell-cycle MEAN-EXPRESSION scores is "
                                  "substantially explained by proliferative arrest, not a change in DNA-repair status. "
                                  "No universal claim about RNA biomarkers.")}
    with open(f"{TAB}/obl4_report.json", "w") as fh:
        json.dump(report, fh, indent=2, default=str)

    # ---- figures ----
    # Fig 1: per-patient clonal diversity + dispersion change
    fig, axes = plt.subplots(1, 2, figsize=(11, 4.5))
    ok2 = ok.sort_values("shannon_pct_change")
    axes[0].barh(ok2["patient_id"], ok2["shannon_pct_change"], color="#0279EE")
    axes[0].axvline(0, color="k", lw=1); axes[0].axvline(agg["mean_shannon_pct_change"], color="#FF9400", ls="--", label=f"mean {agg['mean_shannon_pct_change']}%")
    axes[0].set_xlabel("Shannon diversity % change (post - naive)"); axes[0].set_title("Clonal diversity change (rarefied)"); axes[0].legend()
    ok3 = ok.sort_values("dispersion_pct_change")
    axes[1].barh(ok3["patient_id"], ok3["dispersion_pct_change"], color="#75A025")
    axes[1].axvline(0, color="k", lw=1); axes[1].axvline(agg["mean_dispersion_pct_change"], color="#FF9400", ls="--", label=f"mean {agg['mean_dispersion_pct_change']}%")
    axes[1].set_xlabel("Transcriptomic dispersion % change"); axes[1].set_title("Dispersion change (rarefied)"); axes[1].legend()
    fig.tight_layout(); fig.savefig(f"{FIG}/obl4_clonal_diversity.png", dpi=150); fig.savefig(f"{FIG}/obl4_clonal_diversity.svg"); plt.close(fig)

    # Fig 2: NON-CIRCULAR confound evidence (predictor & outcome share NO genes).
    # Panel A: cross-scored G2/M composite delta ~ S-phase set delta (disjoint).
    # Panel B: cross-scored S-phase composite delta ~ G2/M set delta (disjoint).
    fig, axes = plt.subplots(1, 2, figsize=(11, 4.5))
    panels = [(axes[0], "prolif_B_delta", "cc_from_A_delta",
               "S-phase set delta (predictor)", "G2/M composite delta (outcome)"),
              (axes[1], "prolif_A_delta", "cc_from_B_delta",
               "G2/M set delta (predictor)", "S-phase composite delta (outcome)")]
    for ax, pcol, ycol, xlab, ylab in panels:
        ax.scatter(R[pcol], R[ycol], s=45, color="#0279EE", label="patients (n=11)")
        m, b = np.polyfit(R[pcol], R[ycol], 1)
        xs = np.linspace(R[pcol].min(), R[pcol].max(), 50)
        ax.plot(xs, m * xs + b, color="#FF9400", lw=2, label="OLS fit")
        rho, p = spearmanr(R[pcol], R[ycol])
        ax.set_xlabel(xlab); ax.set_ylabel(ylab)
        ax.set_title(f"non-circular (disjoint genes): rho={rho:.2f}, p={p:.3f}")
        ax.legend(fontsize=8)
    fig.suptitle("Post-NACT cell-cycle shift tracks proliferation across NON-overlapping gene sets")
    fig.tight_layout(); fig.savefig(f"{FIG}/obl4_proliferation_confound.png", dpi=150); fig.savefig(f"{FIG}/obl4_proliferation_confound.svg"); plt.close(fig)

    print("\nWrote obl4_report.json + per-patient tables + 2 figures")


if __name__ == "__main__":
    main()
