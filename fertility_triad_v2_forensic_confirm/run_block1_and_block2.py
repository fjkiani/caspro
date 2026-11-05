import os, gzip, json, pickle, warnings
import numpy as np
import pandas as pd
from scipy.stats import mannwhitneyu, spearmanr
from statsmodels.stats.multitest import multipletests
from sklearn.metrics import roc_auc_score
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import RepeatedStratifiedKFold, StratifiedGroupKFold, GroupKFold
from sklearn.preprocessing import StandardScaler

warnings.filterwarnings("ignore")
V1_DIR = "/Users/fahadkiani/Desktop/development/caspro/caspro/fertility_triad_v1_discovery"
V1_DATA = f"{V1_DIR}/data"
V2_DIR = "/Users/fahadkiani/Desktop/development/caspro/caspro/fertility_triad_v2_forensic_confirm"
V2_DATA = f"{V2_DIR}/data"

import sys
sys.path.insert(0, V1_DIR)
from execute_all_gates import maps, parse_series_matrix, get_gene_z, compute_module_score, eval_binary, perm_pvalue, nested_cv_oof
from execute_all_gates import G1_COMP_POS, G1_MITO_POS, G1_MITO_NEG, G1_FERRO_POS, G1_FERRO_NEG, G1_ALL_GENES
from execute_all_gates import G2_ACT_POS, G2_CHROM_POS, G2_MOT_POS, G2_MOT_NEG, G2_ALL_GENES
from execute_all_gates import G3_RECEP_POS, G3_DOOR1_POS, G3_DOOR1_NEG, G3_DOOR1_EXT_POS, G3_DOOR1_EXT_NEG, G3_DOOR2_POS, G3_DOOR2_NEG, G3_ALL_GENES

# Define formula expected sign for every gene (+1 if protective/competence in Gate 1&2 or risk in Gate 3 Door1/2; let's explicitly record the formula role)
FORMULA_ROLE = {}
for g in G1_COMP_POS: FORMULA_ROLE[("G1", g)] = ("+1 (S_egg_comp numerator)", +1)
for g in G1_MITO_POS: FORMULA_ROLE[("G1", g)] = ("+1 (S_egg_mito numerator)", +1)
for g in G1_MITO_NEG: FORMULA_ROLE[("G1", g)] = ("-1 (S_egg_mito denominator -z(CD38))", -1)
for g in G1_FERRO_POS: FORMULA_ROLE[("G1", g)] = ("+1 (S_egg_ferro shield numerator)", +1)
for g in G1_FERRO_NEG:
    if ("G1", g) in FORMULA_ROLE:
        FORMULA_ROLE[("G1", g)] = ("DUAL (+1 S_egg_comp / -1 S_egg_ferro)", 0)
    else:
        FORMULA_ROLE[("G1", g)] = ("-1 (S_egg_ferro pro-ferroptotic denominator)", -1)

for g in G2_ACT_POS: FORMULA_ROLE[("G2", g)] = ("+1 (S_sperm_act numerator)", +1)
for g in G2_CHROM_POS: FORMULA_ROLE[("G2", g)] = ("+1 (S_sperm_chrom numerator)", +1)
for g in G2_MOT_POS: FORMULA_ROLE[("G2", g)] = ("+1 (S_sperm_mot numerator)", +1)
for g in G2_MOT_NEG: FORMULA_ROLE[("G2", g)] = ("-1 (S_sperm_mot apoptotic denominator)", -1)

# In Gate 3, y=1 is Uterine Failure (RIF/RPL/UIF/Pre-receptive), y=0 is Receptive Control.
# Thus S_receptivity genes are expected to be LOWER in failure (expected delta_z < 0, sign = -1),
# whereas Door 1 Pos (DIO2, CLU, ABI3BP) and Door 2 Pos (BCL6, SIRT1, KRAS, IL6, IL1B, TNF) are expected HIGHER in failure (+1),
# and Door 1 Neg (SCARA5, NCAM1, GNLY, GZMB) and Door 2 Neg (PGR, HAND2, HOXA10, FOXO1) are expected LOWER in failure (-1).
for g in G3_RECEP_POS: FORMULA_ROLE[("G3", g)] = ("-1 in Failure / +1 in Receptive (S_receptivity)", -1)
for g in G3_DOOR1_EXT_POS: FORMULA_ROLE[("G3", g)] = ("+1 in Failure (Door 1 Senescence numerator)", +1)
for g in G3_DOOR1_EXT_NEG: FORMULA_ROLE[("G3", g)] = ("-1 in Failure (Door 1 Decidual/uNK denominator)", -1)
for g in G3_DOOR2_POS: FORMULA_ROLE[("G3", g)] = ("+1 in Failure (Door 2 P4-Resist numerator)", +1)
for g in G3_DOOR2_NEG: FORMULA_ROLE[("G3", g)] = ("-1 in Failure (Door 2 PGR/Decidual denominator)", -1)

def full_signed_gene_audit(df, y_binary, gate_tag, gene_list, cohort_id):
    means = df.mean(axis=1)
    stds = df.std(axis=1, ddof=1).replace(0, np.nan)
    df_z = df.sub(means, axis=0).div(stds, axis=0)
    rows = []
    for g in gene_list:
        s, matched = get_gene_z(df_z, g)
        if s is not None and not s.isna().all():
            eb = eval_binary(y_binary, s, n_boot=500)
            if not np.isnan(eb["auroc"]):
                role_str, exp_sign = FORMULA_ROLE.get((gate_tag, g), ("unspecified", 0))
                dz = eb["delta_z"]
                obs_sign = +1 if dz > 0 else (-1 if dz < 0 else 0)
                if exp_sign == 0:
                    flag = "DUAL_ROLE_GENE"
                elif obs_sign == exp_sign:
                    flag = "MATCHES_FORMULA"
                else:
                    flag = "CONTRADICTS_FORMULA"
                rows.append({
                    "cohort_id": cohort_id,
                    "gene": g,
                    "matched_symbol": matched,
                    "formula_role": role_str,
                    "expected_sign_for_y1": exp_sign,
                    "mean_pos_z": eb["mean_pos"],
                    "mean_neg_z": eb["mean_neg"],
                    "signed_delta_z": eb["delta_z"],
                    "signed_auroc": eb["auroc"],
                    "ci95": eb["ci95"],
                    "p_mwu": eb["p_mwu"],
                    "direction_flag": flag
                })
    if rows:
        _, qvals, _, _ = multipletests([r["p_mwu"] for r in rows], method="fdr_bh")
        for i, r in enumerate(rows):
            r["bh_q"] = float(qvals[i])
    rows.sort(key=lambda x: x["p_mwu"])
    return rows

# Group-aware CV helper for paired donor samples
def group_cv_oof(X_df, y_arr, groups, seed=42):
    X_clean = X_df.dropna(axis=1, how="all")
    mask = (~X_clean.isna().any(axis=1)) & (~pd.isna(y_arr))
    X = X_clean.loc[mask].values
    y = np.asarray(y_arr[mask], dtype=int)
    grp = np.asarray(groups)[mask]
    uniq_g = np.unique(grp)
    if len(uniq_g) < 4:
        return {"oof_auroc": np.nan, "oof_ci95": [np.nan, np.nan], "oof_p_mwu": np.nan}
    # Leave-One-Group-Out (or 5-fold StratifiedGroupKFold)
    oof_preds = np.zeros(len(y))
    for g_val in uniq_g:
        te = np.where(grp == g_val)[0]
        tr = np.where(grp != g_val)[0]
        if len(np.unique(y[tr])) < 2: continue
        scaler = StandardScaler()
        Xtr = scaler.fit_transform(X[tr])
        Xte = scaler.transform(X[te])
        clf = LogisticRegression(C=1.0, penalty="l2", solver="lbfgs", max_iter=500)
        clf.fit(Xtr, y[tr])
        oof_preds[te] = clf.predict_proba(Xte)[:, 1]
    res = eval_binary(y, oof_preds, n_boot=1000, seed=seed)
    return {
        "cv_scheme": f"Leave-One-Donor-Out (n_donors={len(uniq_g)}, n_samples={len(y)})",
        "signed_oof_auroc": res["auroc"],
        "oof_ci95": res["ci95"],
        "oof_p_mwu": res["p_mwu"]
    }

# Full-transcriptome zero-leakage 10x5 nested-CV screen
def full_matrix_nested_cv_discovery(df, y_arr, top_k_grid=(15, 30, 50), n_splits=5, n_repeats=10, seed=42):
    # Filter genes with zero variance or >20% NaN
    valid_rows = (df.isna().mean(axis=1) < 0.2) & (df.std(axis=1) > 1e-6)
    df_sub = df.loc[valid_rows].fillna(0.0)
    X_all = df_sub.T.values # samples x genes
    genes = np.array(df_sub.index)
    y = np.asarray(y_arr, dtype=int)
    
    # 1. Full-cohort univariate screen for reporting top discovery genes
    pos_idx = np.where(y == 1)[0]
    neg_idx = np.where(y == 0)[0]
    means = X_all.mean(axis=0)
    stds = X_all.std(axis=0, ddof=1)
    stds[stds == 0] = 1.0
    Z_all = (X_all - means) / stds
    dz_all = Z_all[pos_idx].mean(axis=0) - Z_all[neg_idx].mean(axis=0)
    
    # Fast vectorized rank-sum / Mann-Whitney + AUROC for top 200 abs(dz) candidates
    cand_idx = np.argsort(np.abs(dz_all))[::-1][:300]
    disc_rows = []
    for idx in cand_idx:
        s = Z_all[:, idx]
        auc = roc_auc_score(y, s)
        _, p_mwu = mannwhitneyu(s[pos_idx], s[neg_idx], alternative="two-sided")
        disc_rows.append({
            "gene": str(genes[idx]),
            "signed_delta_z": round(float(dz_all[idx]), 4),
            "signed_auroc": round(float(auc), 4),
            "p_mwu": float(p_mwu)
        })
    disc_rows.sort(key=lambda x: x["p_mwu"])
    _, q_all, _, _ = multipletests([r["p_mwu"] for r in disc_rows], method="fdr_bh")
    for i, r in enumerate(disc_rows):
        r["bh_q"] = float(q_all[i])
    
    # 2. Zero-leakage 10x5 Nested CV (feature selection strictly inside each training fold!)
    k = min(n_splits, int(min(np.sum(y == 1), np.sum(y == 0))))
    rskf = RepeatedStratifiedKFold(n_splits=k, n_repeats=n_repeats, random_state=seed)
    oof_preds = np.zeros((len(y), n_repeats))
    for split_idx, (tr, te) in enumerate(rskf.split(X_all, y)):
        rep = split_idx // k
        Xtr_raw, ytr = X_all[tr], y[tr]
        Xte_raw = X_all[te]
        # Standardize inside training fold only
        m_tr = Xtr_raw.mean(axis=0)
        s_tr = Xtr_raw.std(axis=0, ddof=1)
        s_tr[s_tr == 0] = 1.0
        Ztr = (Xtr_raw - m_tr) / s_tr
        Zte = (Xte_raw - m_tr) / s_tr
        # Rank genes strictly inside training fold by |mean_pos - mean_neg| / Welch t-stat
        p_tr = np.where(ytr == 1)[0]
        n_tr = np.where(ytr == 0)[0]
        v_pos = Ztr[p_tr].var(axis=0, ddof=1) / max(len(p_tr), 1)
        v_neg = Ztr[n_tr].var(axis=0, ddof=1) / max(len(n_tr), 1)
        t_stat = np.abs(Ztr[p_tr].mean(axis=0) - Ztr[n_tr].mean(axis=0)) / np.sqrt(v_pos + v_neg + 1e-8)
        top_feat_order = np.argsort(t_stat)[::-1]
        
        # Inner 3-fold CV to pick (top_k, C)
        best_auc, best_k, best_c = -1.0, 30, 0.2
        inner_k = min(3, int(min(len(p_tr), len(n_tr))))
        if inner_k >= 2:
            icv = RepeatedStratifiedKFold(n_splits=inner_k, n_repeats=1, random_state=seed + split_idx)
            for tk in top_k_grid:
                for c_val in [0.05, 0.2, 1.0]:
                    aucs = []
                    for itr, ite in icv.split(Ztr, ytr):
                        # Re-compute feature ranking inside inner fold!
                        ip = np.where(ytr[itr] == 1)[0]
                        in_ = np.where(ytr[itr] == 0)[0]
                        vp = Ztr[itr][ip].var(axis=0, ddof=1) / max(len(ip), 1)
                        vn = Ztr[itr][in_].var(axis=0, ddof=1) / max(len(in_), 1)
                        it_stat = np.abs(Ztr[itr][ip].mean(axis=0) - Ztr[itr][in_].mean(axis=0)) / np.sqrt(vp + vn + 1e-8)
                        if_idx = np.argsort(it_stat)[::-1][:tk]
                        clf_i = LogisticRegression(C=c_val, penalty="l2", solver="lbfgs", max_iter=500)
                        clf_i.fit(Ztr[itr][:, if_idx], ytr[itr])
                        pi = clf_i.predict_proba(Ztr[ite][:, if_idx])[:, 1]
                        if len(np.unique(ytr[ite])) == 2:
                            aucs.append(roc_auc_score(ytr[ite], pi))
                    if aucs and np.mean(aucs) > best_auc:
                        best_auc = np.mean(aucs)
                        best_k, best_c = tk, c_val
        sel_idx = top_feat_order[:best_k]
        clf = LogisticRegression(C=best_c, penalty="l2", solver="lbfgs", max_iter=500)
        clf.fit(Ztr[:, sel_idx], ytr)
        oof_preds[te, rep] = clf.predict_proba(Zte[:, sel_idx])[:, 1]
    mean_oof = oof_preds.mean(axis=1)
    eb = eval_binary(y, mean_oof, n_boot=1000, seed=seed)
    return {
        "n_genes_screened": int(df_sub.shape[0]),
        "oof_signed_auroc": eb["auroc"],
        "oof_ci95": eb["ci95"],
        "oof_p_mwu": eb["p_mwu"],
        "top_discovery_genes": disc_rows[:15]
    }

print("=== RUNNING BLOCK 2: GATE 1 SAME-STAGE CLINICAL COMPETENCE CONTRASTS ===")
gate1_v2 = []

# 2a. GSE37277 strictly Mature MII Cumulus cells: Blastocyst (B, n=35) vs Arrested Poor Embryo (E, n=33)
meta_37277, df_37277 = parse_series_matrix(f"{V1_DATA}/GSE37277_series_matrix.txt.gz", maps["GPL4133"])
comp_labels = np.array([c.split(":")[-1].strip() for c in meta_37277["char"][1]])
mask_be = np.isin(comp_labels, ["B", "E"])
df_37277_be = df_37277.iloc[:, mask_be]
y_37277_be = (comp_labels[mask_be] == "B").astype(int) # 1 = Blastocyst (n=35), 0 = Arrested Poor Embryo (n=33)

def eval_gate1_v2(df, y, cid, desc, groups=None, run_full_screen=False):
    s_comp, f_comp, _ = compute_module_score(df, G1_COMP_POS)
    s_mito, f_mpos, f_mneg = compute_module_score(df, G1_MITO_POS, G1_MITO_NEG)
    s_ferro, f_fpos, f_fneg = compute_module_score(df, G1_FERRO_POS, G1_FERRO_NEG)
    axes = {}
    for k, s in [("S_egg_comp", s_comp), ("S_egg_mito", s_mito), ("S_egg_ferro", s_ferro)]:
        eb = eval_binary(y, s)
        axes[k] = {
            "n_pos": eb.get("n_pos"), "n_neg": eb.get("n_neg"),
            "mean_pos": eb.get("mean_pos"), "mean_neg": eb.get("mean_neg"),
            "signed_delta_z": eb.get("delta_z"), "signed_auroc": eb.get("auroc"),
            "ci95": eb.get("ci95"), "p_mwu": eb.get("p_mwu")
        }
    X_comb = pd.DataFrame({"comp": s_comp, "mito": s_mito, "ferro": s_ferro})
    ncv = nested_cv_oof(X_comb, y)
    gcv = group_cv_oof(X_comb, y, groups) if groups is not None else None
    genes = full_signed_gene_audit(df, y, "G1", G1_ALL_GENES, cid)
    screen = full_matrix_nested_cv_discovery(df, y) if run_full_screen else None
    return {
        "cohort_id": cid, "comparison": desc, "axes": axes,
        "panel_10x5_oof": ncv, "donor_grouped_oof": gcv,
        "signed_panel_genes": genes, "full_matrix_discovery_10x5": screen
    }

gate1_v2.append(eval_gate1_v2(df_37277_be, y_37277_be, "GSE37277_MII_Blastocyst_vs_Arrest", "Same-Stage MII Cumulus Cells (n=68): Blastocyst-Forming B (n=35) vs Arrested Poor Embryo E (n=33)", run_full_screen=True))

# 2b-1. GSE144516 (n=20 transferred Cumulus cells from 10 donors: Pregnancy Test Pos n=10 vs Neg n=10, and Ongoing Pregnancy Pos n=6 vs Neg n=14)
meta_144, df_144 = parse_series_matrix(f"{V1_DATA}/GSE144516_series_matrix.txt.gz", maps["GPL10558"])
donors_144 = np.array([c.split(":")[-1].strip() for c in meta_144["char"][2]])
cont_preg = np.array([c.split(":")[-1].strip() for c in meta_144["char"][4]])
preg_test = np.array([c.split(":")[-1].strip() for c in meta_144["char"][5]])
mask_used = preg_test != "NotUsed"
df_144_u = df_144.iloc[:, mask_used]
donors_144_u = donors_144[mask_used]
y_144_ptest = (preg_test[mask_used] == "Pos").astype(int)
y_144_cpreg = (cont_preg[mask_used] == "Pos").astype(int)
gate1_v2.append(eval_gate1_v2(df_144_u, y_144_ptest, "GSE144516_Cumulus_PregTest", "Same-Stage MII Cumulus Cells (n=20, 10 women): Pregnancy Test Pos (n=10) vs Neg (n=10)", groups=donors_144_u, run_full_screen=True))
gate1_v2.append(eval_gate1_v2(df_144_u, y_144_cpreg, "GSE144516_Cumulus_OngoingPreg", "Same-Stage MII Cumulus Cells (n=20, 10 women): Ongoing Pregnancy Pos (n=6) vs Biochemical/Failed Neg (n=14)", groups=donors_144_u, run_full_screen=True))

# 2b-2. GSE95477 Donor-Grouped GV vs MII + Same-Stage Young vs AMA within MII (n=10) and within GV (n=10)
df_954 = pd.read_csv(f"{V1_DATA}/GSE95477_Total_Gene_Reads_-_All_Genes.csv.gz", index_col=0)
df_954.index = [str(i).upper() for i in df_954.index]
df_954 = np.log2(np.clip(df_954.groupby(df_954.index).mean(), 0, None) + 1.0)
# Donor IDs: e.g. 'AMA GV - 1.rpkm' -> 'AMA_1', 'YNG MII - 3.rpkm' -> 'YNG_3'
donors_954 = np.array([c.split()[0] + "_" + c.split("-")[1].split(".")[0].strip() for c in df_954.columns])
y_954_mii = np.array([1 if "MII" in c else 0 for c in df_954.columns])
gate1_v2.append(eval_gate1_v2(df_954, y_954_mii, "GSE95477_DonorGrouped_MII_vs_GV", "Paired Human Oocytes (n=20, 10 women): MII (n=10) vs GV (n=10) with Donor-Grouped CV", groups=donors_954))
# Same-stage MII Young (n=5) vs MII AMA (n=5)
mii_mask_954 = np.array(["MII" in c for c in df_954.columns])
df_954_mii = df_954.iloc[:, mii_mask_954]
y_954_mii_yng = np.array([1 if "YNG" in c else 0 for c in df_954_mii.columns])
gate1_v2.append(eval_gate1_v2(df_954_mii, y_954_mii_yng, "GSE95477_SameStage_MII_Young_vs_AMA", "Same-Stage MII Oocytes Only (n=10): Young <30y (n=5) vs AMA >=40y (n=5)"))
# Same-stage GV Young (n=5) vs GV AMA (n=5)
gv_mask_954 = np.array(["GV" in c for c in df_954.columns])
df_954_gv = df_954.iloc[:, gv_mask_954]
y_954_gv_yng = np.array([1 if "YNG" in c else 0 for c in df_954_gv.columns])
gate1_v2.append(eval_gate1_v2(df_954_gv, y_954_gv_yng, "GSE95477_SameStage_GV_Young_vs_AMA", "Same-Stage GV Oocytes Only (n=10): Young <30y (n=5) vs AMA >=40y (n=5)"))

# 2b-3. GSE164371 Same-Stage MII Young (n=5) vs MII AMA (n=5) and GV Young (n=5) vs GV AMA (n=6)
df_164 = pd.read_excel(f"{V1_DATA}/GSE164371_GEO_reads2sym_counts_submission.xlsx")
df_164["geneID"] = [str(x).upper().strip() for x in df_164["geneID"]]
df_164 = np.log2(np.clip(df_164.groupby("geneID").mean(numeric_only=True), 0, None) + 1.0)
mii_mask_164 = np.array(["MII" in c for c in df_164.columns])
df_164_mii = df_164.iloc[:, mii_mask_164]
gate1_v2.append(eval_gate1_v2(df_164_mii, np.array([1 if "YMA" in c else 0 for c in df_164_mii.columns]), "GSE164371_SameStage_MII_Young_vs_AMA", "Same-Stage Euploid MII Oocytes Only (n=10): Young <30y (n=5) vs AMA >=40y (n=5)"))
gv_mask_164 = np.array(["GV" in c for c in df_164.columns])
df_164_gv = df_164.iloc[:, gv_mask_164]
gate1_v2.append(eval_gate1_v2(df_164_gv, np.array([1 if "YMA" in c else 0 for c in df_164_gv.columns]), "GSE164371_SameStage_GV_Young_vs_AMA", "Same-Stage Euploid GV Oocytes Only (n=11): Young <30y (n=5) vs AMA >=40y (n=6)"))

# 2b-4. GSE155489 Cumulus Granulosa (n=8: 4 Control vs 4 PCOS) and GV Oocytes (n=12: 6 Control vs 6 PCOS)
df_155_gc = pd.read_csv(f"{V1_DATA}/GSE155489_gc_pcos_counts.csv.gz", index_col=0)
df_155_gc.index = [str(i).upper() for i in df_155_gc.index]
df_155_gc = np.log2(np.clip(df_155_gc.groupby(df_155_gc.index).mean(), 0, None) + 1.0)
# From GSE155489_series_matrix: GC_B13, GC_B14, GC_B2, GC_B30 are Control; GC_B7, GC_B8, GC_B15, GC_B16 are PCOS
y_155_gc = np.array([1 if c in ("GC_B13", "GC_B14", "GC_B2", "GC_B30") else 0 for c in df_155_gc.columns])
gate1_v2.append(eval_gate1_v2(df_155_gc, y_155_gc, "GSE155489_Cumulus_Control_vs_PCOS", "Same-Stage Cumulus Granulosa Cells (n=8): Control (n=4) vs PCOS (n=4)"))

df_155_gv = pd.read_csv(f"{V1_DATA}/GSE155489_gv_pcos_counts.csv.gz", index_col=0)
df_155_gv.index = [str(i).upper() for i in df_155_gv.index]
df_155_gv = np.log2(np.clip(df_155_gv.groupby(df_155_gv.index).mean(), 0, None) + 1.0)
y_155_gv = np.array([1 if c in ("GV_A2", "GV_A3", "GV_A40", "GV_A41", "GV_A27", "GV_A28") else 0 for c in df_155_gv.columns])
gate1_v2.append(eval_gate1_v2(df_155_gv, y_155_gv, "GSE155489_Oocyte_Control_vs_PCOS", "Same-Stage GV Oocytes (n=12): Control (n=6) vs PCOS (n=6)"))

# 2b-5. GSE277906 (n=40 Cumulus Control vs PCOS) + Full Matrix Screen
df_277_raw = pd.read_csv(f"{V1_DATA}/GSE277906_FPKM_anno.txt.gz", sep="\t", index_col=0)
sc_277 = [c for c in df_277_raw.columns if c.startswith("Control") or c.startswith("PCOS")]
df_277 = df_277_raw[sc_277].apply(pd.to_numeric, errors="coerce")
df_277.index = [str(i).upper() for i in df_277.index]
df_277 = np.log2(np.clip(df_277.groupby(df_277.index).mean(), 0, None) + 1.0)
y_277 = np.array([1 if c.startswith("Control") else 0 for c in df_277.columns])
gate1_v2.append(eval_gate1_v2(df_277, y_277, "GSE277906_Cumulus_Control_vs_PCOS", "Same-Stage Cumulus Cells (n=40): Normo-Ovulatory Control (n=17) vs PCOS (n=23)", run_full_screen=True))

# 2b-6. GSE168404 (n=10 Mural Granulosa mRNA: Control C1..C5 vs PCOS P1..P5)
with gzip.open(f"{V2_DATA}/GSE168404_mRNA_C-vs-P.all.txt.gz", "rb") as f:
    txt_168 = f.read().decode("utf-16", errors="ignore")
from io import StringIO
df_168_raw = pd.read_csv(StringIO(txt_168), sep="\t")
sym_col_168 = df_168_raw.columns[1]
val_cols_168 = ["C1", "C2", "C3", "C4", "C5", "P1", "P2", "P3", "P4", "P5"]
df_168 = df_168_raw.set_index(sym_col_168)[val_cols_168].apply(pd.to_numeric, errors="coerce")
df_168.index = [str(i).upper().strip() for i in df_168.index]
df_168 = np.log2(np.clip(df_168[df_168.index != "NAN"].groupby(df_168.index[df_168.index != "NAN"]).mean(), 0, None) + 1.0)
y_168 = np.array([1 if c.startswith("C") else 0 for c in df_168.columns])
gate1_v2.append(eval_gate1_v2(df_168, y_168, "GSE168404_Granulosa_Control_vs_PCOS", "Same-Stage Mural Granulosa Cells (n=10): Control (n=5) vs PCOS (n=5)", run_full_screen=True))

# 2c. GSE286918 (n=116 Mural Granulosa: Normal Ovarian Reserve NOR n=56 vs Diminished Ovarian Reserve DOR n=60) + Full-Matrix 10x5 Discovery Screen
df_286 = pd.read_excel(f"{V1_DATA}/GSE286918_count.xlsx")
df_286["sym"] = [maps["ens"].get(str(x).split(".")[0].strip(), "") for x in df_286["gene_id"]]
df_286 = df_286[df_286["sym"] != ""].drop(columns=["gene_id"]).groupby("sym").mean()
df_286 = np.log2(np.clip(df_286, 0, None) + 1.0)
y_286_nor = np.array([1 if c.startswith("NOR") else 0 for c in df_286.columns])
gate1_v2.append(eval_gate1_v2(df_286, y_286_nor, "GSE286918_Granulosa_NOR_vs_DOR", "Same-Stage Mural Granulosa Cells (n=116): Normal Ovarian Reserve NOR (n=56) vs Diminished Ovarian Reserve DOR (n=60)", run_full_screen=True))

for r in gate1_v2:
    sc_auc = r["full_matrix_discovery_10x5"]["oof_signed_auroc"] if r["full_matrix_discovery_10x5"] else None
    g_auc = r["donor_grouped_oof"]["signed_oof_auroc"] if r["donor_grouped_oof"] else None
    print(f"  {r['cohort_id']:36s} | comp={r['axes']['S_egg_comp']['signed_auroc']} | mito={r['axes']['S_egg_mito']['signed_auroc']} | ferro={r['axes']['S_egg_ferro']['signed_auroc']} | panel_OOF={r['panel_10x5_oof']['oof_auroc']} | group_OOF={g_auc} | full_matrix_OOF={sc_auc}")
    if r["full_matrix_discovery_10x5"]:
        top3 = r["full_matrix_discovery_10x5"]["top_discovery_genes"][:5]
        print("    Full-matrix top genes:", [(g["gene"], g["signed_auroc"], g["signed_delta_z"], f"p={g['p_mwu']:.2e}") for g in top3])

with open(f"{V2_DIR}/block2_gate1_results.json", "w") as f:
    json.dump(gate1_v2, f, indent=2)
