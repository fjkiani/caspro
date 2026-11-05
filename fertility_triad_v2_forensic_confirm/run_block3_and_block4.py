import os, gzip, json, pickle, warnings
import numpy as np
import pandas as pd
from scipy.stats import mannwhitneyu, spearmanr
from statsmodels.stats.multitest import multipletests
from sklearn.metrics import roc_auc_score
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.model_selection import RepeatedStratifiedKFold
from sklearn.preprocessing import StandardScaler

warnings.filterwarnings("ignore")
V1_DIR = "/Users/fahadkiani/Desktop/development/caspro/caspro/fertility_triad_v1_discovery"
V1_DATA = f"{V1_DIR}/data"
V2_DIR = "/Users/fahadkiani/Desktop/development/caspro/caspro/fertility_triad_v2_forensic_confirm"

import sys
sys.path.insert(0, V1_DIR)
from execute_all_gates import maps, parse_series_matrix, get_gene_z, compute_module_score, eval_binary, perm_pvalue, nested_cv_oof
from execute_all_gates import G2_ACT_POS, G2_CHROM_POS, G2_MOT_POS, G2_MOT_NEG, G2_ALL_GENES
from execute_all_gates import G3_RECEP_POS, G3_DOOR1_POS, G3_DOOR1_NEG, G3_DOOR1_EXT_POS, G3_DOOR1_EXT_NEG, G3_DOOR2_POS, G3_DOOR2_NEG, G3_ALL_GENES

print("=================================================================")
print("BLOCK 3: GATE 2 FORENSIC CONFIRMATION (GSE281732, TRANSFER, GSE262969)")
print("=================================================================")

# Load Gate 2 matrices
df_281 = pd.read_csv(f"{V1_DATA}/GSE281732_log2_norm_count_collapsed.csv.gz", index_col=0)
df_281["sym"] = [maps["ens"].get(str(x).split(".")[0].strip(), "") for x in df_281.index]
df_281 = df_281[df_281["sym"] != ""].groupby("sym").mean(numeric_only=True)
y_281 = np.array([0 if str(c).endswith("L") else 1 for c in df_281.columns]) # 1 = Proven-Fertile (n=14), 0 = Infertile (n=53)

meta_6872, df_6872 = parse_series_matrix(f"{V1_DATA}/GSE6872_series_matrix.txt.gz", maps["GPL570"], log_transform=True)
y_6872 = np.array([1 if "Fertile" in c and "Infertile" not in c else 0 for c in meta_6872["char"][0]])

meta_4797, df_4797 = parse_series_matrix(f"{V1_DATA}/GSE4797_series_matrix.txt.gz", maps["GPL2891"])
y_4797 = np.array([1 if "full testicular spermatogenesis" in c else 0 for c in meta_4797["char"][0]])

# 3A: Signed gene direction table for GSE281732, GSE6872, GSE4797
def signed_g2_genes(df, y, cid):
    means = df.mean(axis=1)
    stds = df.std(axis=1, ddof=1).replace(0, np.nan)
    df_z = df.sub(means, axis=0).div(stds, axis=0)
    rows = []
    for g in G2_ALL_GENES:
        s, matched = get_gene_z(df_z, g)
        if s is not None and not s.isna().all():
            eb = eval_binary(y, s, n_boot=500)
            exp_sign = -1 if g in G2_MOT_NEG else +1
            obs_sign = +1 if eb["delta_z"] > 0 else -1
            rows.append({
                "cohort_id": cid, "gene": g, "matched": matched,
                "expected_sign": exp_sign,
                "mean_fertile_z": eb["mean_pos"], "mean_infertile_z": eb["mean_neg"],
                "signed_delta_z": eb["delta_z"], "signed_auroc": eb["auroc"],
                "ci95": eb["ci95"], "p_mwu": eb["p_mwu"],
                "flag": "MATCHES_FORMULA" if exp_sign == obs_sign else "CONTRADICTS_FORMULA (Negative-Feedback / Arrest-Compensatory Up)"
            })
    _, q, _, _ = multipletests([r["p_mwu"] for r in rows], method="fdr_bh")
    for i, r in enumerate(rows): r["bh_q"] = float(q[i])
    rows.sort(key=lambda x: x["p_mwu"])
    return rows

g2_signed_281 = signed_g2_genes(df_281, y_281, "GSE281732")
g2_signed_6872 = signed_g2_genes(df_6872, y_6872, "GSE6872")
g2_signed_4797 = signed_g2_genes(df_4797, y_4797, "GSE4797")

print("GSE281732 Top Signed Genes:")
for r in g2_signed_281[:10]:
    print(f"  {r['gene']:10s} | mean_pos={r['mean_fertile_z']:+.3f} | mean_neg={r['mean_infertile_z']:+.3f} | dz={r['signed_delta_z']:+.4f} | signed_AUROC={r['signed_auroc']:.4f} | P={r['p_mwu']:.2e} | q={r['bh_q']:.2e} | {r['flag']}")

# 3B: Zero-Retraining Cross-Cohort Transfer: Train on GSE281732 -> Test on GSE6872 and GSE4797
def get_g2_module_matrix(df):
    s_act, _, _ = compute_module_score(df, G2_ACT_POS)
    s_chrom, _, _ = compute_module_score(df, G2_CHROM_POS, special_mode="sperm_chrom")
    s_mot, _, _ = compute_module_score(df, G2_MOT_POS, G2_MOT_NEG)
    return pd.DataFrame({"S_sperm_act": s_act, "S_sperm_chrom": s_chrom, "S_sperm_mot": s_mot})

X_mod_281 = get_g2_module_matrix(df_281)
X_mod_6872 = get_g2_module_matrix(df_6872)
X_mod_4797 = get_g2_module_matrix(df_4797)

scaler_mod = StandardScaler()
Xtr_m = scaler_mod.fit_transform(X_mod_281.values)
clf_mod = LogisticRegression(C=0.5, penalty="l2", solver="lbfgs").fit(Xtr_m, y_281)

p_6872_from_281 = clf_mod.predict_proba(scaler_mod.transform(X_mod_6872.values))[:, 1]
p_4797_from_281 = clf_mod.predict_proba(scaler_mod.transform(X_mod_4797.values))[:, 1]

# Also gene-level zero-retraining transfer using shared core chromatin + oocyte-activation genes (PLCZ1, CRISP2, HSPA2, PRKACA, TNP1, TNP2)
shared_g2_core = ["PLCZ1", "CRISP2", "HSPA2", "PRKACA", "TNP1", "TNP2"]
def get_z_sub(df, genes):
    means = df.mean(axis=1)
    stds = df.std(axis=1, ddof=1).replace(0, np.nan)
    df_z = df.sub(means, axis=0).div(stds, axis=0)
    out = {}
    for g in genes:
        s, _ = get_gene_z(df_z, g)
        out[g] = s
    return pd.DataFrame(out)

Xg_281 = get_z_sub(df_281, shared_g2_core)
Xg_6872 = get_z_sub(df_6872, shared_g2_core)
Xg_4797 = get_z_sub(df_4797, shared_g2_core)
clf_g = LogisticRegression(C=0.2, penalty="l2", solver="lbfgs").fit(Xg_281.values, y_281)
pg_6872 = clf_g.predict_proba(Xg_6872.values)[:, 1]
pg_4797 = clf_g.predict_proba(Xg_4797.values)[:, 1]

# Also 6-gene PRM1/PRM2/TNP1/TNP2/PLCZ1/KCNU1 transfer from GSE281732 -> GSE6872
core6_sperm = ["PRM1", "PRM2", "TNP1", "TNP2", "PLCZ1", "KCNU1"]
X6_281 = get_z_sub(df_281, core6_sperm)
X6_6872 = get_z_sub(df_6872, core6_sperm)
clf_6 = LogisticRegression(C=0.2, penalty="l2", solver="lbfgs").fit(X6_281.values, y_281)
p6_6872 = clf_6.predict_proba(X6_6872.values)[:, 1]

transfer_g2 = {
    "train_GSE281732_to_GSE6872_3modules": eval_binary(y_6872, p_6872_from_281),
    "train_GSE281732_to_GSE4797_3modules": eval_binary(y_4797, p_4797_from_281),
    "train_GSE281732_to_GSE6872_6genes_shared": eval_binary(y_6872, pg_6872),
    "train_GSE281732_to_GSE4797_6genes_shared": eval_binary(y_4797, pg_4797),
    "train_GSE281732_to_GSE6872_PRM_TNP_PLCZ1_KCNU1": eval_binary(y_6872, p6_6872),
    "model_weights_3modules": dict(zip(X_mod_281.columns, [round(float(w), 4) for w in clf_mod.coef_[0]]))
}
print("Zero-Retraining Transfer Results:")
for k, v in transfer_g2.items():
    print(" ", k, "->", v)

# 3C: GSE262969 (n=44 ART Spermatozoa RNA-seq) Full Clinical Outcomes Audit
df_262_raw = pd.read_csv(f"{V1_DATA}/GSE262969_total_RPKMgenomic_gencode.txt.gz", sep="\t")
ann_262 = pd.read_csv(f"{V1_DATA}/GSE262969_sample_annotations.txt.gz", sep="\t")
lib_cols = [c for c in ann_262["Library Name"] if c in df_262_raw.columns]
df_262 = df_262_raw.set_index("gene_symbol")[lib_cols].apply(pd.to_numeric, errors="coerce")
df_262.index = [str(i).upper() for i in df_262.index]
df_262 = np.log2(np.clip(df_262.groupby(df_262.index).mean(), 0, None) + 1.0)
ann_sub = ann_262.set_index("Library Name").loc[lib_cols]

X_mod_262 = get_g2_module_matrix(df_262)
# Compute fertilization rate = 2PN# / MII#
mii_cnt = pd.to_numeric(ann_sub["MII#"], errors="coerce")
pn2_cnt = pd.to_numeric(ann_sub["2PN#"], errors="coerce")
fert_rate = (pn2_cnt / mii_cnt.replace(0, np.nan)).values
blast_rate = pd.to_numeric(ann_sub["PercentBlast"], errors="coerce").values
conc_val = pd.to_numeric(ann_sub["SpermConcentration_mil.ml"], errors="coerce").values
mot_val = pd.to_numeric(ann_sub["EjaculateMotility"], errors="coerce").values
morph_val = pd.to_numeric(ann_sub["MorphologyNormal"], errors="coerce").values

# Binary clinical outcomes in GSE262969:
# 1. LiveBirth: DELIVERED (1) vs NO LB (0)
lb_raw = ann_sub["LiveBirth"].astype(str).str.strip().values
mask_lb = np.isin(lb_raw, ["DELIVERED", "NO LB"])
y_lb = (lb_raw[mask_lb] == "DELIVERED").astype(int)

# 2. PregnancyOutcome_numeric: 1 vs 0
preg_num = pd.to_numeric(ann_sub["PregnancyOutcome_numeric"], errors="coerce").values
mask_preg = ~np.isnan(preg_num) & np.isin(preg_num, [0, 1])
y_preg = preg_num[mask_preg].astype(int)

# 3. High Fertilization Rate (>=0.75 vs <0.75)
mask_fert = ~np.isnan(fert_rate)
y_fert = (fert_rate[mask_fert] >= np.nanmedian(fert_rate)).astype(int)

gse262969_audit = {"n_libraries": len(lib_cols), "binary_endpoints": {}, "continuous_correlations": {}}
for ep_name, mask_ep, y_ep in [
    ("LiveBirth_Delivered_vs_NoLB", mask_lb, y_lb),
    ("PregnancyOutcome_Pos_vs_Neg", mask_preg, y_preg),
    ("FertilizationRate_AboveMedian", mask_fert, y_fert)
]:
    gse262969_audit["binary_endpoints"][ep_name] = {}
    for col in X_mod_262.columns:
        gse262969_audit["binary_endpoints"][ep_name][col] = eval_binary(y_ep, X_mod_262[col].values[mask_ep])
    # Also check top individual Gate 2 genes for this endpoint
    gse262969_audit["binary_endpoints"][ep_name]["top_genes"] = signed_g2_genes(df_262.iloc[:, mask_ep], y_ep, f"GSE262969_{ep_name}")[:5]

for c_name, c_vec in [
    ("FertilizationRate_2PN_per_MII", fert_rate),
    ("PercentBlast", blast_rate),
    ("SpermConcentration_mil_ml", conc_val),
    ("EjaculateMotility", mot_val),
    ("MorphologyNormal", morph_val)
]:
    gse262969_audit["continuous_correlations"][c_name] = {}
    for col in X_mod_262.columns:
        s = X_mod_262[col].values
        m = (~np.isnan(s)) & (~np.isnan(c_vec))
        if np.sum(m) >= 5:
            rho, p = spearmanr(c_vec[m], s[m])
            gse262969_audit["continuous_correlations"][c_name][col] = {"n": int(np.sum(m)), "rho": round(float(rho), 4), "p": float(p)}

print("GSE262969 Clinical Audit Summary:")
for ep, d in gse262969_audit["binary_endpoints"].items():
    print(f"  {ep}: n_pos={d['S_sperm_act'].get('n_pos')}, n_neg={d['S_sperm_act'].get('n_neg')} | act_AUC={d['S_sperm_act'].get('auroc')} | chrom_AUC={d['S_sperm_chrom'].get('auroc')} | mot_AUC={d['S_sperm_mot'].get('auroc')}")
    print("    top genes:", [(g["gene"], g["signed_auroc"], g["signed_delta_z"], f"p={g['p_mwu']:.3f}") for g in d["top_genes"][:3]])

print("\n=================================================================")
print("BLOCK 4: GATE 3 FORENSIC CONFIRMATION (GSE180485 + CROSS-COHORT RIF/UIF/RPL DISCOVERY)")
print("=================================================================")

# 4A: GSE180485 (Warwick EndoTime, 36 patients / 108 runs)
xl_180 = pd.ExcelFile(f"{V1_DATA}/GSE180485_EndoTime_RNA_counts_TPM.xlsx")
tpm_180 = xl_180.parse("Transcripts per million")
tpm_180["sym"] = [str(x).strip().upper() for x in tpm_180["Associated.Gene.Name"]]
tpm_cols = [c for c in tpm_180.columns if c.endswith("_TPM")]
df_180 = np.log2(np.clip(tpm_180[tpm_180["sym"] != "NAN"].groupby("sym")[tpm_cols].mean(), 0, None) + 1.0)

meta_180, _ = parse_series_matrix(f"{V1_DATA}/GSE180485_series_matrix.txt.gz")
p_meta = {}
for i, t in enumerate(meta_180["title"]):
    pid = t.split()[0]
    if pid not in p_meta:
        age_str = meta_180["char"][0][i].split(":")[-1].strip()
        lh_str = meta_180["char"][1][i].split(":")[-1].strip()
        nk_str = meta_180["char"][2][i].split(":")[-1].strip()
        loss_str = meta_180["char"][3][i].split(":")[-1].strip()
        plb_str = meta_180["char"][4][i].split(":")[-1].strip()
        out_str = meta_180["char"][5][i].split(":")[-1].strip()
        p_meta[pid] = {
            "age": float(age_str) if age_str != "NA" else np.nan,
            "lh": float(lh_str) if lh_str != "NA" else np.nan,
            "nk": float(nk_str) if nk_str != "NA" else np.nan,
            "losses": float(loss_str) if loss_str != "NA" else np.nan,
            "prev_lb": float(plb_str) if plb_str != "NA" else np.nan,
            "outcome": out_str
        }

pids_180 = ["_".join(c.split("_")[:2]) for c in tpm_cols]
lh_180 = np.array([p_meta[p]["lh"] for p in pids_180])
nk_180 = np.array([p_meta[p]["nk"] for p in pids_180])
losses_180 = np.array([p_meta[p]["losses"] for p in pids_180])
prev_lb_180 = np.array([p_meta[p]["prev_lb"] for p in pids_180])
outcome_180 = np.array([p_meta[p]["outcome"] for p in pids_180])

s_rec_180, _, _ = compute_module_score(df_180, G3_RECEP_POS)
s_d1_180, _, _ = compute_module_score(df_180, G3_DOOR1_POS, G3_DOOR1_NEG)
s_d1ext_180, _, _ = compute_module_score(df_180, G3_DOOR1_EXT_POS, G3_DOOR1_EXT_NEG)
s_d2_180, _, _ = compute_module_score(df_180, G3_DOOR2_POS, G3_DOOR2_NEG)

# Residualize scores against luteal LH+ day (on the 35 samples with non-NA LH+)
def residualize_lh(score_vec, lh_vec):
    res = np.full_like(score_vec, np.nan, dtype=float)
    m = (~np.isnan(score_vec)) & (~np.isnan(lh_vec))
    X_lh = lh_vec[m].reshape(-1, 1)
    reg = LinearRegression().fit(X_lh, score_vec[m])
    res[m] = score_vec[m] - reg.predict(X_lh)
    return res

d1_resid = residualize_lh(s_d1_180.values, lh_180)
d1ext_resid = residualize_lh(s_d1ext_180.values, lh_180)
rec_resid = residualize_lh(s_rec_180.values, lh_180)
d2_resid = residualize_lh(s_d2_180.values, lh_180)

# Test in GSE180485:
# 1) Outcome after biopsy: Miscarriage (1, n=12) vs Live birth (0, n=19) [excluding 5 Ongoing]
mask_mc_lb = np.isin(outcome_180, ["Miscarriage", "Live birth"])
y_mc_lb = (outcome_180[mask_mc_lb] == "Miscarriage").astype(int)
# 2) Recurrent Pregnancy Loss severity: >=3 previous losses (1) vs <3 previous losses (0), and >=5 losses vs <5
y_rpl3 = (losses_180 >= 3).astype(int)
y_rpl5 = (losses_180 >= 5).astype(int)
# 3) High uNK % (>median or >=5%):
y_unk_hi = (nk_180 >= np.nanmedian(nk_180)).astype(int)

gse180485_clinical = {
    "n_unique_patients": len(pids_180),
    "outcome_counts": pd.Series(outcome_180).value_counts().to_dict(),
    "miscarriage_vs_livebirth": {
        "S_senescent_decidua_raw": eval_binary(y_mc_lb, s_d1_180.values[mask_mc_lb]),
        "S_senescent_decidua_LH_residualized": eval_binary(y_mc_lb, d1_resid[mask_mc_lb]),
        "S_senescent_ext_LH_residualized": eval_binary(y_mc_lb, d1ext_resid[mask_mc_lb]),
        "S_receptivity_LH_residualized": eval_binary(y_mc_lb, rec_resid[mask_mc_lb]),
        "S_p4_resist_LH_residualized": eval_binary(y_mc_lb, d2_resid[mask_mc_lb]),
        "uNK_percent": eval_binary(y_mc_lb, nk_180[mask_mc_lb]),
        "previous_losses": eval_binary(y_mc_lb, losses_180[mask_mc_lb]),
    },
    "rpl_ge3_losses_vs_lt3": {
        "S_senescent_decidua_raw": eval_binary(y_rpl3, s_d1_180.values),
        "S_senescent_decidua_LH_residualized": eval_binary(y_rpl3, d1_resid),
        "S_p4_resist_LH_residualized": eval_binary(y_rpl3, d2_resid),
        "uNK_percent": eval_binary(y_rpl3, nk_180),
    },
    "rpl_ge5_losses_vs_lt5": {
        "S_senescent_decidua_raw": eval_binary(y_rpl5, s_d1_180.values),
        "S_senescent_decidua_LH_residualized": eval_binary(y_rpl5, d1_resid),
        "S_p4_resist_LH_residualized": eval_binary(y_rpl5, d2_resid),
        "uNK_percent": eval_binary(y_rpl5, nk_180),
    },
    "spearman_correlations": {}
}
for cname, cvec in [("LH_day", lh_180), ("uNK_percent", nk_180), ("previous_losses", losses_180)]:
    gse180485_clinical["spearman_correlations"][cname] = {}
    for sname, svec in [
        ("DIO2_minus_SCARA5_raw", s_d1_180.values),
        ("DIO2_minus_SCARA5_LH_resid", d1_resid),
        ("S_senescent_ext_LH_resid", d1ext_resid),
        ("S_receptivity_raw", s_rec_180.values),
        ("S_receptivity_LH_resid", rec_resid),
        ("S_p4_resist_LH_resid", d2_resid),
        ("uNK_percent", nk_180)
    ]:
        m = (~np.isnan(cvec)) & (~np.isnan(svec))
        if np.sum(m) >= 5:
            rho, p = spearmanr(cvec[m], svec[m])
            gse180485_clinical["spearman_correlations"][cname][sname] = {"n": int(np.sum(m)), "rho": round(float(rho), 4), "p": float(p)}

# Also find top transcriptome-wide genes in GSE180485 predicting Subsequent Miscarriage vs Live Birth!
means_180 = df_180.iloc[:, mask_mc_lb].mean(axis=1)
stds_180 = df_180.iloc[:, mask_mc_lb].std(axis=1, ddof=1).replace(0, np.nan)
z_180_mc = df_180.iloc[:, mask_mc_lb].sub(means_180, axis=0).div(stds_180, axis=0)
dz_180_mc = z_180_mc.iloc[:, y_mc_lb == 1].mean(axis=1) - z_180_mc.iloc[:, y_mc_lb == 0].mean(axis=1)
top_mc_genes = []
for g in dz_180_mc.abs().nlargest(50).index:
    eb = eval_binary(y_mc_lb, z_180_mc.loc[g].values, n_boot=300)
    top_mc_genes.append({"gene": g, "signed_delta_z": eb["delta_z"], "signed_auroc": eb["auroc"], "p_mwu": eb["p_mwu"]})
top_mc_genes.sort(key=lambda x: x["p_mwu"])
gse180485_clinical["top_genes_miscarriage_vs_livebirth"] = top_mc_genes[:10]

print("GSE180485 EndoTime Clinical Audit:")
print("  Outcome counts:", gse180485_clinical["outcome_counts"])
print("  Miscarriage vs LiveBirth:", {k: (v.get("auroc"), v.get("delta_z"), round(v.get("p_mwu", 1), 4)) for k, v in gse180485_clinical["miscarriage_vs_livebirth"].items()})
print("  Top Miscarriage vs LiveBirth genes:", [(x["gene"], x["signed_auroc"], x["signed_delta_z"], round(x["p_mwu"], 4)) for x in top_mc_genes[:5]])

# 4B: Cross-Cohort Same-Phase Mid-Secretory RIF / Infertility Biomarker Discovery across GSE58144 (n=115), GSE111974 (n=48), GSE165004 (n=72)
print("\nLoading GSE58144, GSE111974, and GSE165004 full matrices for Cross-Cohort Discovery...")
meta_581, df_581 = parse_series_matrix(f"{V1_DATA}/GSE58144_series_matrix.txt.gz", maps["GPL15789"])
y_581 = np.array([1 if "recurrent implantation failure" in c else 0 for c in meta_581["char"][1]])
lh_581 = np.array([float(c.split(":")[1].strip().split()[0]) if "days" in c else 7.0 for c in meta_581["char"][3]])

meta_111, df_111 = parse_series_matrix(f"{V1_DATA}/GSE111974_series_matrix.txt.gz", maps["GPL17077"])
y_111 = np.array([1 if "RIF" in t else 0 for t in meta_111["title"]])

meta_165, df_165 = parse_series_matrix(f"{V1_DATA}/GSE165004_series_matrix.txt.gz", maps["GPL16699"])
grp_165 = np.array([c.split(":")[-1].strip() for c in meta_165["char"][0]])
y_165_all = (grp_165 != "Control").astype(int)
mask_uif = np.isin(grp_165, ["Control", "patient with UIF"])
df_165_uif = df_165.iloc[:, mask_uif]
y_165_uif = (grp_165[mask_uif] == "patient with UIF").astype(int)
mask_rpl = np.isin(grp_165, ["Control", "patient with RPL"])
df_165_rpl = df_165.iloc[:, mask_rpl]
y_165_rpl = (grp_165[mask_rpl] == "patient with RPL").astype(int)

# Residualize GSE58144 expression matrix against LH day (5,6,7,8) so WOI timing confound is removed
X_lh581 = np.column_stack([np.ones(len(lh_581)), lh_581])
beta_581 = np.linalg.lstsq(X_lh581, df_581.fillna(0.0).T.values, rcond=None)[0]
resid_581 = df_581.fillna(0.0).T.values - X_lh581[:, 1:2] @ beta_581[1:2, :]
df_581_adj = pd.DataFrame(resid_581.T, index=df_581.index, columns=df_581.columns)

shared_genes_g3 = sorted(list(set(df_581_adj.index) & set(df_111.index) & set(df_165.index)))
print(f"Shared annotated HGNC genes across GSE58144, GSE111974, and GSE165004: {len(shared_genes_g3)}")

def fast_cohort_stats(df, y, genes):
    sub = df.loc[genes]
    m = sub.mean(axis=1)
    s = sub.std(axis=1, ddof=1).replace(0, np.nan)
    z = sub.sub(m, axis=0).div(s, axis=0)
    pos = z.iloc[:, y == 1]
    neg = z.iloc[:, y == 0]
    dz = (pos.mean(axis=1) - neg.mean(axis=1)).values
    # Mann-Whitney / Welch t
    v_pos = pos.var(axis=1, ddof=1).values / max(pos.shape[1], 1)
    v_neg = neg.var(axis=1, ddof=1).values / max(neg.shape[1], 1)
    t_stat = dz / np.sqrt(v_pos + v_neg + 1e-8)
    return z, dz, t_stat

z_581, dz_581, t_581 = fast_cohort_stats(df_581_adj, y_581, shared_genes_g3)
z_111, dz_111, t_111 = fast_cohort_stats(df_111, y_111, shared_genes_g3)
z_165a, dz_165a, t_165a = fast_cohort_stats(df_165, y_165_all, shared_genes_g3)
z_165u, dz_165u, t_165u = fast_cohort_stats(df_165_uif, y_165_uif, shared_genes_g3)
z_165r, dz_165r, t_165r = fast_cohort_stats(df_165_rpl, y_165_rpl, shared_genes_g3)

# Find genes with concordant direction across GSE111974 (RIF) + GSE165004 (UIF/All) and across all 3 cohorts (GSE58144 + GSE111974 + GSE165004)
same_sign_all3 = (np.sign(dz_581) == np.sign(dz_111)) & (np.sign(dz_111) == np.sign(dz_165u)) & (np.abs(dz_581) > 0.15) & (np.abs(dz_111) > 0.35) & (np.abs(dz_165u) > 0.35)
meta_t_all3 = np.where(same_sign_all3, np.abs(t_581) + np.abs(t_111) + np.abs(t_165u), 0.0)
top_all3_idx = np.argsort(meta_t_all3)[::-1][:25]

same_sign_111_165 = (np.sign(dz_111) == np.sign(dz_165u)) & (np.abs(dz_111) > 0.5) & (np.abs(dz_165u) > 0.5)
meta_t_111_165 = np.where(same_sign_111_165, np.abs(t_111) + np.abs(t_165u), 0.0)
top_111_165_idx = np.argsort(meta_t_111_165)[::-1][:25]

concordant_3cohort_genes = []
for idx in top_all3_idx:
    if meta_t_all3[idx] == 0: continue
    g = shared_genes_g3[idx]
    eb_581 = eval_binary(y_581, z_581.loc[g].values, n_boot=200)
    eb_111 = eval_binary(y_111, z_111.loc[g].values, n_boot=200)
    eb_165u = eval_binary(y_165_uif, z_165u.loc[g].values, n_boot=200)
    eb_165r = eval_binary(y_165_rpl, z_165r.loc[g].values, n_boot=200)
    concordant_3cohort_genes.append({
        "gene": g,
        "concordant_sign_in_failure": "+1 (Up in RIF/UIF)" if dz_111[idx] > 0 else "-1 (Down in RIF/UIF)",
        "GSE58144_dz": eb_581["delta_z"], "GSE58144_signed_auroc": eb_581["auroc"], "GSE58144_p": eb_581["p_mwu"],
        "GSE111974_dz": eb_111["delta_z"], "GSE111974_signed_auroc": eb_111["auroc"], "GSE111974_p": eb_111["p_mwu"],
        "GSE165004_UIF_dz": eb_165u["delta_z"], "GSE165004_UIF_signed_auroc": eb_165u["auroc"], "GSE165004_UIF_p": eb_165u["p_mwu"],
        "GSE165004_RPL_dz": eb_165r["delta_z"], "GSE165004_RPL_signed_auroc": eb_165r["auroc"], "GSE165004_RPL_p": eb_165r["p_mwu"],
    })

print("Top Concordant Same-Phase Mid-Secretory Genes Across All 3 Cohorts (GSE58144 + GSE111974 + GSE165004):")
for r in concordant_3cohort_genes[:12]:
    print(f"  {r['gene']:12s} ({r['concordant_sign_in_failure'][:3]}) | GSE58144: dz={r['GSE58144_dz']:+.2f} AUC={r['GSE58144_signed_auroc']:.3f} (p={r['GSE58144_p']:.2e}) | GSE111974: dz={r['GSE111974_dz']:+.2f} AUC={r['GSE111974_signed_auroc']:.3f} (p={r['GSE111974_p']:.2e}) | GSE165004_UIF: dz={r['GSE165004_UIF_dz']:+.2f} AUC={r['GSE165004_UIF_signed_auroc']:.3f} (p={r['GSE165004_UIF_p']:.2e})")

# Zero-leakage 10x5 nested-CV OOF within each cohort + Leave-One-Cohort-Out external transfer!
from run_block1_and_block2 import full_matrix_nested_cv_discovery

oof_581 = full_matrix_nested_cv_discovery(df_581_adj.loc[shared_genes_g3], y_581, top_k_grid=(20, 50))
oof_111 = full_matrix_nested_cv_discovery(df_111.loc[shared_genes_g3], y_111, top_k_grid=(15, 30))
oof_165_all = full_matrix_nested_cv_discovery(df_165.loc[shared_genes_g3], y_165_all, top_k_grid=(15, 30))
oof_165_uif = full_matrix_nested_cv_discovery(df_165_uif.loc[shared_genes_g3], y_165_uif, top_k_grid=(15, 30))
oof_165_rpl = full_matrix_nested_cv_discovery(df_165_rpl.loc[shared_genes_g3], y_165_rpl, top_k_grid=(15, 30))

print("Same-Phase Mid-Secretory 10x5 Nested-CV OOF Results:")
print(f"  GSE58144 (n=115 RIF vs Ctrl): OOF AUROC = {oof_581['oof_signed_auroc']} CI={oof_581['oof_ci95']} P={oof_581['oof_p_mwu']:.2e}")
print(f"  GSE111974 (n=48 RIF vs Ctrl): OOF AUROC = {oof_111['oof_signed_auroc']} CI={oof_111['oof_ci95']} P={oof_111['oof_p_mwu']:.2e}")
print(f"  GSE165004_All (n=72 RPL+UIF): OOF AUROC = {oof_165_all['oof_signed_auroc']} CI={oof_165_all['oof_ci95']} P={oof_165_all['oof_p_mwu']:.2e}")
print(f"  GSE165004_UIF (n=48 UIF)    : OOF AUROC = {oof_165_uif['oof_signed_auroc']} CI={oof_165_uif['oof_ci95']} P={oof_165_uif['oof_p_mwu']:.2e}")
print(f"  GSE165004_RPL (n=48 RPL)    : OOF AUROC = {oof_165_rpl['oof_signed_auroc']} CI={oof_165_rpl['oof_ci95']} P={oof_165_rpl['oof_p_mwu']:.2e}")

# Strict Leave-One-Cohort-Out External Transfer (selecting features on 2 training cohorts only, testing on held-out 3rd cohort!)
def loco_transfer(z_tr1, y_tr1, z_tr2, y_tr2, z_te, y_te, top_k=25):
    # Compute dz & t-stat strictly on training cohorts 1 and 2
    dz1 = z_tr1.iloc[:, y_tr1 == 1].mean(axis=1) - z_tr1.iloc[:, y_tr1 == 0].mean(axis=1)
    dz2 = z_tr2.iloc[:, y_tr2 == 1].mean(axis=1) - z_tr2.iloc[:, y_tr2 == 0].mean(axis=1)
    concord = (np.sign(dz1) == np.sign(dz2)) & (np.abs(dz1) > 0.2) & (np.abs(dz2) > 0.2)
    score_rank = np.where(concord, np.abs(dz1) + np.abs(dz2), 0.0)
    sel_genes = [z_tr1.index[i] for i in np.argsort(score_rank)[::-1][:top_k] if score_rank[i] > 0]
    # Signed composite z-score on held-out cohort using training sign only!
    signs = np.sign(dz1.loc[sel_genes].values + dz2.loc[sel_genes].values)
    te_score = (z_te.loc[sel_genes].T.values @ signs) / max(len(sel_genes), 1)
    eb = eval_binary(y_te, te_score, n_boot=1000)
    eb["n_genes_locked_in_train"] = len(sel_genes)
    eb["locked_genes_sample"] = sel_genes[:10]
    return eb

# Also pairwise external transfer between GSE111974 and GSE165004
def pairwise_transfer(z_tr, y_tr, z_te, y_te, top_k=30):
    dz_tr = z_tr.iloc[:, y_tr == 1].mean(axis=1) - z_tr.iloc[:, y_tr == 0].mean(axis=1)
    sel_genes = dz_tr.abs().nlargest(top_k).index.tolist()
    signs = np.sign(dz_tr.loc[sel_genes].values)
    te_score = (z_te.loc[sel_genes].T.values @ signs) / len(sel_genes)
    eb = eval_binary(y_te, te_score, n_boot=1000)
    eb["n_genes_locked_in_train"] = len(sel_genes)
    eb["locked_genes_sample"] = sel_genes[:10]
    return eb

ext_transfer_g3 = {
    "LOCO_train_58144_111974_test_GSE165004_UIF": loco_transfer(z_581, y_581, z_111, y_111, z_165u, y_165_uif, top_k=20),
    "LOCO_train_58144_111974_test_GSE165004_All": loco_transfer(z_581, y_581, z_111, y_111, z_165a, y_165_all, top_k=20),
    "LOCO_train_58144_165004UIF_test_GSE111974": loco_transfer(z_581, y_581, z_165u, y_165_uif, z_111, y_111, top_k=20),
    "LOCO_train_111974_165004UIF_test_GSE58144": loco_transfer(z_111, y_111, z_165u, y_165_uif, z_581, y_581, top_k=20),
    "Pairwise_train_GSE111974_test_GSE165004_UIF": pairwise_transfer(z_111, y_111, z_165u, y_165_uif, top_k=30),
    "Pairwise_train_GSE165004_UIF_test_GSE111974": pairwise_transfer(z_165u, y_165_uif, z_111, y_111, top_k=30),
}
print("Zero-Retraining Cross-Cohort External Transfer (Gate 3 Mid-Secretory RIF/UIF):")
for k, v in ext_transfer_g3.items():
    print(f"  {k:45s} -> Signed AUROC={v['auroc']} CI={v['ci95']} dz={v['delta_z']:+.4f} P={v['p_mwu']:.2e}")

out_b3_b4 = {
    "block3_gate2": {
        "GSE281732_protocol_uniformity": {
            "n_sequencing_runs": 70,
            "n_unique_subjects": 67,
            "n_proven_fertile": 14,
            "n_infertility_cohort": 53,
            "sperm_isolation_protocol": "Washing and somatic cell lysis followed by miRvana kit isolation (Bianchi et al. 2018, doi:10.1111/andr.12471) — uniform across 70/70 samples",
            "library_prep_protocol": "NEBNext Ultra II RNA Library Prep Kit (oligo-dT polyA selection, 15 min 94C fragmentation) — uniform across 70/70 samples",
            "sequencing_instrument": "Illumina HiSeq 4000 (GPL20301) — uniform across 70/70 samples",
            "bioinformatic_pipeline": "bcl2fastq 2.20 -> Trimmomatic v0.36 -> STAR v2.5.2b (GRCh38) -> Subread featureCounts v1.5.2 -> 3 infertility technical duplicates collapsed -> median normalization -> log2(count+1)"
        },
        "signed_gene_tables": {
            "GSE281732": g2_signed_281,
            "GSE6872": g2_signed_6872,
            "GSE4797": g2_signed_4797
        },
        "zero_retraining_cross_cohort_transfer": transfer_g2,
        "GSE262969_clinical_audit": gse262969_audit
    },
    "block4_gate3": {
        "GSE180485_endotime_clinical": gse180485_clinical,
        "concordant_3cohort_genes": concordant_3cohort_genes,
        "same_phase_full_matrix_10x5_oof": {
            "GSE58144_RIF_vs_Ctrl": oof_581,
            "GSE111974_RIF_vs_Ctrl": oof_111,
            "GSE165004_All_vs_Ctrl": oof_165_all,
            "GSE165004_UIF_vs_Ctrl": oof_165_uif,
            "GSE165004_RPL_vs_Ctrl": oof_165_rpl
        },
        "zero_retraining_external_transfer": ext_transfer_g3
    }
}

with open(f"{V2_DIR}/block3_and_block4_results.json", "w") as f:
    json.dump(out_b3_b4, f, indent=2)
print("Saved block3_and_block4_results.json successfully.")
