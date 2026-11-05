import os, gzip, json, hashlib, pickle, warnings
import numpy as np
import pandas as pd
from scipy.stats import mannwhitneyu, spearmanr
from statsmodels.stats.multitest import multipletests
from sklearn.metrics import roc_auc_score
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import RepeatedStratifiedKFold
from sklearn.preprocessing import StandardScaler

warnings.filterwarnings("ignore")
DATA_DIR = "/Users/fahadkiani/Desktop/development/caspro/caspro/fertility_triad_v1_discovery/data"
OUT_DIR = "/Users/fahadkiani/Desktop/development/caspro/caspro/fertility_triad_v1_discovery"
CACHE_PKL = f"{DATA_DIR}/symbol_maps.pkl"

with open(CACHE_PKL, "rb") as f:
    maps = pickle.load(f)

GENE_ALIASES = {
    "ATP5F1A": ["ATP5F1A", "ATP5A1"],
    "KCNU1": ["KCNU1", "SLO3", "KCNMC1"],
    "ADCY10": ["ADCY10", "SAC"],
    "HILS1": ["HILS1", "H1-9", "HIST1H1T"],
    "SPACA3": ["SPACA3", "LYZL3", "SLLP1"],
    "PAEP": ["PAEP", "GD", "PP14"],
    "NFE2L2": ["NFE2L2", "NRF2"],
    "PPARGC1A": ["PPARGC1A", "PGC1A"],
    "PTGS2_OXIDATIVE": ["PTGS2"],
}

def parse_series_matrix(gse_file, probe_map=None, log_transform=False):
    meta = {"title": [], "gsm": [], "source": [], "char": [], "desc": []}
    rows = []
    in_table = False
    header = []
    with gzip.open(gse_file, "rt", errors="ignore") as f:
        for line in f:
            line = line.rstrip("\n\r")
            if line.startswith("!Sample_title"):
                meta["title"] = [x.strip('"') for x in line.split("\t")[1:]]
            elif line.startswith("!Sample_geo_accession"):
                meta["gsm"] = [x.strip('"') for x in line.split("\t")[1:]]
            elif line.startswith("!Sample_source_name_ch1"):
                meta["source"] = [x.strip('"') for x in line.split("\t")[1:]]
            elif line.startswith("!Sample_description"):
                meta["desc"].append([x.strip('"') for x in line.split("\t")[1:]])
            elif line.startswith("!Sample_characteristics_ch1"):
                meta["char"].append([x.strip('"') for x in line.split("\t")[1:]])
            elif line.startswith("!series_matrix_table_begin"):
                in_table = True
                header = [x.strip('"') for x in f.readline().rstrip("\n\r").split("\t")]
            elif line.startswith("!series_matrix_table_end"):
                in_table = False
            elif in_table:
                parts = line.split("\t")
                pid = parts[0].strip('"')
                if probe_map is not None:
                    sym = probe_map.get(pid)
                    if not sym: continue
                else:
                    sym = pid.upper()
                vals = []
                for x in parts[1:]:
                    x = x.strip('"')
                    try:
                        vals.append(float(x))
                    except:
                        vals.append(np.nan)
                rows.append((sym, vals))
    if not rows:
        return meta, pd.DataFrame()
    df = pd.DataFrame([r[1] for r in rows], index=[r[0] for r in rows], columns=header[1:])
    if log_transform or df.max().max() > 100:
        df = np.log2(np.clip(df, 0, None) + 1.0)
    df = df.groupby(df.index).mean()
    return meta, df

def get_gene_z(df_z, gene):
    candidates = GENE_ALIASES.get(gene.upper(), [gene.upper()])
    for c in candidates:
        if c in df_z.index:
            return df_z.loc[c], c
    return None, None

def compute_module_score(df, pos_genes, neg_genes=None, special_mode=None):
    means = df.mean(axis=1)
    stds = df.std(axis=1, ddof=1).replace(0, np.nan)
    df_z = df.sub(means, axis=0).div(stds, axis=0)
    
    pos_series, found_pos = [], []
    for g in pos_genes:
        s, matched = get_gene_z(df_z, g)
        if s is not None and not s.isna().all():
            pos_series.append(s)
            found_pos.append(matched)
    if not pos_series:
        return pd.Series(np.nan, index=df.columns), [], []
    pos_score = pd.concat(pos_series, axis=1).mean(axis=1)
    
    found_neg = []
    if special_mode == "sperm_chrom":
        s1, _ = get_gene_z(df_z, "PRM1")
        s2, _ = get_gene_z(df_z, "PRM2")
        if s1 is not None and s2 is not None:
            imbalance = (s1 - s2).abs()
            return pos_score - imbalance, found_pos, ["abs(z(PRM1)-z(PRM2))"]
        return pos_score, found_pos, []
    
    if neg_genes:
        neg_series = []
        for g in neg_genes:
            s, matched = get_gene_z(df_z, g)
            if s is not None and not s.isna().all():
                neg_series.append(s)
                found_neg.append(matched)
        if neg_series:
            neg_score = pd.concat(neg_series, axis=1).mean(axis=1)
            return pos_score - neg_score, found_pos, found_neg
    return pos_score, found_pos, found_neg

def eval_binary(y_true, scores, n_boot=1000, seed=42):
    mask = (~pd.isna(scores)) & (~pd.isna(y_true))
    y = np.asarray(y_true[mask], dtype=int)
    s = np.asarray(scores[mask], dtype=float)
    if len(np.unique(y)) < 2 or len(y) < 4:
        return {"auroc": np.nan, "discriminative_auroc": np.nan, "ci95": [np.nan, np.nan], "p_mwu": np.nan, "delta_z": np.nan}
    auc = float(roc_auc_score(y, s))
    pos_vals = s[y == 1]
    neg_vals = s[y == 0]
    _, p_mwu = mannwhitneyu(pos_vals, neg_vals, alternative="two-sided")
    rng = np.random.default_rng(seed)
    boots = []
    for _ in range(n_boot):
        idx = rng.integers(0, len(y), len(y))
        if len(np.unique(y[idx])) < 2: continue
        boots.append(roc_auc_score(y[idx], s[idx]))
    ci = [float(np.percentile(boots, 2.5)), float(np.percentile(boots, 97.5))] if boots else [np.nan, np.nan]
    return {
        "n_total": int(len(y)),
        "n_pos": int(np.sum(y == 1)),
        "n_neg": int(np.sum(y == 0)),
        "auroc": round(auc, 4),
        "discriminative_auroc": round(max(auc, 1.0 - auc), 4),
        "ci95": [round(ci[0], 4), round(ci[1], 4)],
        "mean_pos": round(float(np.mean(pos_vals)), 4),
        "mean_neg": round(float(np.mean(neg_vals)), 4),
        "delta_z": round(float(np.mean(pos_vals) - np.mean(neg_vals)), 4),
        "p_mwu": float(p_mwu)
    }

def perm_pvalue(y_true, scores, n_perm=5000, seed=42):
    mask = (~pd.isna(scores)) & (~pd.isna(y_true))
    y = np.asarray(y_true[mask], dtype=int)
    s = np.asarray(scores[mask], dtype=float)
    if len(np.unique(y)) < 2: return np.nan
    obs = abs(np.mean(s[y == 1]) - np.mean(s[y == 0]))
    rng = np.random.default_rng(seed)
    cnt = 0
    for _ in range(n_perm):
        yp = rng.permutation(y)
        if abs(np.mean(s[yp == 1]) - np.mean(s[yp == 0])) >= obs - 1e-12:
            cnt += 1
    return float((cnt + 1) / (n_perm + 1))

def nested_cv_oof(X_df, y_arr, n_splits=5, n_repeats=10, seed=42):
    # Drop any columns that are all-NaN
    X_clean = X_df.dropna(axis=1, how="all")
    mask = (~X_clean.isna().any(axis=1)) & (~pd.isna(y_arr))
    X = X_clean.loc[mask].values
    y = np.asarray(y_arr[mask], dtype=int)
    min_class = int(min(np.sum(y == 1), np.sum(y == 0)))
    if min_class < 3 or X.shape[1] == 0:
        return {"oof_auroc": np.nan, "oof_ci95": [np.nan, np.nan], "oof_p_mwu": np.nan}
    k = min(n_splits, min_class)
    rskf = RepeatedStratifiedKFold(n_splits=k, n_repeats=n_repeats, random_state=seed)
    oof_preds = np.zeros((len(y), n_repeats))
    for split_idx, (tr, te) in enumerate(rskf.split(X, y)):
        rep = split_idx // k
        scaler = StandardScaler()
        Xtr = scaler.fit_transform(X[tr])
        Xte = scaler.transform(X[te])
        best_c, best_auc = 1.0, -1.0
        inner_k = min(3, int(min(np.sum(y[tr] == 1), np.sum(y[tr] == 0))))
        if inner_k >= 2:
            inner_cv = RepeatedStratifiedKFold(n_splits=inner_k, n_repeats=1, random_state=seed + split_idx)
            for c_val in [0.05, 0.2, 1.0, 5.0]:
                aucs = []
                for itr, ite in inner_cv.split(Xtr, y[tr]):
                    clf_i = LogisticRegression(C=c_val, penalty="l2", solver="lbfgs", max_iter=500)
                    clf_i.fit(Xtr[itr], y[tr][itr])
                    p_i = clf_i.predict_proba(Xtr[ite])[:, 1]
                    if len(np.unique(y[tr][ite])) == 2:
                        aucs.append(roc_auc_score(y[tr][ite], p_i))
                if aucs and np.mean(aucs) > best_auc:
                    best_auc = np.mean(aucs)
                    best_c = c_val
        clf = LogisticRegression(C=best_c, penalty="l2", solver="lbfgs", max_iter=500)
        clf.fit(Xtr, y[tr])
        oof_preds[te, rep] = clf.predict_proba(Xte)[:, 1]
    mean_oof = oof_preds.mean(axis=1)
    res = eval_binary(y, mean_oof, n_boot=1000, seed=seed)
    return {
        "oof_auroc": res["auroc"],
        "oof_discriminative_auroc": res["discriminative_auroc"],
        "oof_ci95": res["ci95"],
        "oof_p_mwu": res["p_mwu"],
        "oof_perm_p": perm_pvalue(y, mean_oof)
    }

def rank_single_genes(df, y_binary, gene_list):
    means = df.mean(axis=1)
    stds = df.std(axis=1, ddof=1).replace(0, np.nan)
    df_z = df.sub(means, axis=0).div(stds, axis=0)
    rows = []
    for g in gene_list:
        s, matched = get_gene_z(df_z, g)
        if s is not None and not s.isna().all():
            eb = eval_binary(y_binary, s, n_boot=500)
            if not np.isnan(eb["auroc"]):
                rows.append({
                    "gene": matched,
                    "auroc": eb["auroc"],
                    "discriminative_auroc": eb["discriminative_auroc"],
                    "delta_z": eb["delta_z"],
                    "p_mwu": eb["p_mwu"]
                })
    rows.sort(key=lambda x: x["p_mwu"])
    return rows[:8]

# ==============================================================================
# GATE 1 — OOCYTE & CUMULUS/GRANULOSA COMPETENCE & OVARIAN AGING ENGINE
# ==============================================================================
G1_COMP_POS = ["GREM1", "HAS2", "PTGS2", "VCAN", "CAMK1D", "STC1", "AREG", "EREG", "GJA1", "GJA4", "BMP15", "GDF9"]
G1_MITO_POS = ["NAMPT", "SIRT1", "SIRT3", "TFAM", "PPARGC1A", "SOD2", "OPA1", "SMC1B", "REC8"]
G1_MITO_NEG = ["CD38"]
G1_FERRO_POS = ["GPX4", "SLC7A11", "FTH1", "GCLC", "NFE2L2"]
G1_FERRO_NEG = ["ACSL4", "ALOX15", "PTGS2", "TFRC"]
G1_ALL_GENES = list(dict.fromkeys(G1_COMP_POS + G1_MITO_POS + G1_MITO_NEG + G1_FERRO_POS + G1_FERRO_NEG))

def eval_gate1_cohort(df, y_binary, cont_vec=None, cohort_id="", label_desc=""):
    s_comp, f_comp, _ = compute_module_score(df, G1_COMP_POS)
    s_mito, f_mpos, f_mneg = compute_module_score(df, G1_MITO_POS, G1_MITO_NEG)
    s_ferro, f_fpos, f_fneg = compute_module_score(df, G1_FERRO_POS, G1_FERRO_NEG)
    
    out = {"cohort_id": cohort_id, "comparison": label_desc, "axes": {}}
    for ax_name, s, fpos, fneg in [
        ("S_egg_comp", s_comp, f_comp, []),
        ("S_egg_mito", s_mito, f_mpos, f_mneg),
        ("S_egg_ferro", s_ferro, f_fpos, f_fneg)
    ]:
        eb = eval_binary(y_binary, s)
        eb["perm_p"] = perm_pvalue(y_binary, s)
        eb["genes_pos_found"] = fpos
        eb["genes_neg_found"] = fneg
        if cont_vec is not None:
            m = (~pd.isna(s)) & (~pd.isna(cont_vec))
            if np.sum(m) >= 5:
                rho, p_rho = spearmanr(cont_vec[m], s[m])
                eb["spearman_rho"] = round(float(rho), 4)
                eb["spearman_p"] = float(p_rho)
        out["axes"][ax_name] = eb
    X_comb = pd.DataFrame({"comp": s_comp, "mito": s_mito, "ferro": s_ferro})
    out["nested_cv_10x5"] = nested_cv_oof(X_comb, y_binary)
    out["top_genes"] = rank_single_genes(df, y_binary, G1_ALL_GENES)
    return out

print("=== GATE 1 EXECUTION ===")
gate1_results = []

# 1A & 1B: GSE107746
df_107 = pd.read_csv(f"{DATA_DIR}/GSE107746_Folliculogenesis_FPKM.log2.txt.gz", sep="\t", index_col=0)
df_107.index = [str(i).upper() for i in df_107.index]
df_107 = df_107.groupby(df_107.index).mean()
stage_map = {"Primordial": 1, "Primary": 2, "Secondary": 3, "Antral": 4, "Preovulatory": 5}
gc_cols = [c for c in df_107.columns if c.endswith("G")]
oo_cols = [c for c in df_107.columns if c.endswith("O")]
def parse_stage(col):
    for k, v in stage_map.items():
        if col.startswith(k): return v
    return np.nan
gc_stages = np.array([parse_stage(c) for c in gc_cols], dtype=float)
gate1_results.append(eval_gate1_cohort(df_107[gc_cols], (gc_stages >= 4).astype(int), gc_stages, "GSE107746_Granulosa", "Human Granulosa Cells (n=71): Antral/Preovulatory Competent (n=32) vs Pre-Antral Early Stages (n=39)"))
oo_stages = np.array([parse_stage(c) for c in oo_cols], dtype=float)
gate1_results.append(eval_gate1_cohort(df_107[oo_cols], (oo_stages >= 4).astype(int), oo_stages, "GSE107746_Oocyte", "Human Single Oocytes (n=77): Antral/Preovulatory Matured (n=32) vs Pre-Antral Stages (n=45)"))

# 1C: GSE37277
meta_37277, df_37277 = parse_series_matrix(f"{DATA_DIR}/GSE37277_series_matrix.txt.gz", maps["GPL4133"])
comp_labels = [c.split(":")[-1].strip() for c in meta_37277["char"][1]]
y_37277_mii = np.array([1 if l in ("B", "E") else 0 for l in comp_labels])
ord_37277 = np.array([2 if l == "B" else (1 if l == "E" else 0) for l in comp_labels], dtype=float)
gate1_results.append(eval_gate1_cohort(df_37277, y_37277_mii, ord_37277, "GSE37277_Cumulus_MII", "Human Cumulus Cells (n=92): Matured MII Competence (n=68) vs Immature GV Oocytes (n=24)"))
mask_b_vg = np.array([l in ("B", "VG") for l in comp_labels])
y_b_vg = np.array([1 if l == "B" else 0 for l in np.array(comp_labels)[mask_b_vg]])
gate1_results.append(eval_gate1_cohort(df_37277.iloc[:, mask_b_vg], y_b_vg, None, "GSE37277_Blastocyst_vs_GV", "Human Cumulus Cells (n=59): Blastocyst-Forming Oocytes (n=35) vs Immature GV Oocytes (n=24)"))

# 1D: GSE286918 (n=116 Granulosa Cells DOR vs NOR)
df_286 = pd.read_excel(f"{DATA_DIR}/GSE286918_count.xlsx")
df_286["sym"] = [maps["ens"].get(str(x).split(".")[0].strip(), "") for x in df_286["gene_id"]]
df_286 = df_286[df_286["sym"] != ""].drop(columns=["gene_id"]).groupby("sym").mean()
df_286 = np.log2(np.clip(df_286, 0, None) + 1.0)
y_286_nor = np.array([1 if c.startswith("NOR") else 0 for c in df_286.columns])
ord_286 = np.array([3 if c.startswith("NORL") else (2 if c.startswith("NORH") else (1 if c.startswith("DORL") else 0)) for c in df_286.columns], dtype=float)
gate1_results.append(eval_gate1_cohort(df_286, y_286_nor, ord_286, "GSE286918_DOR_vs_NOR", "Human Mural Granulosa Cells (n=116): Normal Ovarian Reserve (n=56) vs Diminished Ovarian Reserve DOR (n=60)"))

# 1E: GSE95477 (n=20 Oocytes: MII vs GV & Young vs AMA)
df_954 = pd.read_csv(f"{DATA_DIR}/GSE95477_Total_Gene_Reads_-_All_Genes.csv.gz", index_col=0)
df_954.index = [str(i).upper() for i in df_954.index]
df_954 = np.log2(np.clip(df_954.groupby(df_954.index).mean(), 0, None) + 1.0)
gate1_results.append(eval_gate1_cohort(df_954, np.array([1 if "MII" in c else 0 for c in df_954.columns]), None, "GSE95477_Oocyte_MII", "Human Single Oocytes (n=20): Metaphase II Matured (n=10) vs Germinal Vesicle Immature (n=10)"))
gate1_results.append(eval_gate1_cohort(df_954, np.array([1 if "YNG" in c else 0 for c in df_954.columns]), None, "GSE95477_Young_vs_AMA", "Human Single Oocytes (n=20): Young Maternal Age <30y (n=10) vs Advanced Maternal Age >=40y (n=10)"))

# 1F: GSE164371 (n=21 Euploid Oocytes: In Vivo MII vs GV)
df_164 = pd.read_excel(f"{DATA_DIR}/GSE164371_GEO_reads2sym_counts_submission.xlsx")
df_164["geneID"] = [str(x).upper().strip() for x in df_164["geneID"]]
df_164 = np.log2(np.clip(df_164.groupby("geneID").mean(numeric_only=True), 0, None) + 1.0)
gate1_results.append(eval_gate1_cohort(df_164, np.array([1 if "MII" in c else 0 for c in df_164.columns]), None, "GSE164371_Euploid_MII", "Euploid Human Oocytes (n=21): In Vivo Matured MII (n=10) vs GV Oocytes (n=11)"))

# 1G: GSE277906 (n=40 Cumulus Cells: Control vs PCOS)
df_277_raw = pd.read_csv(f"{DATA_DIR}/GSE277906_FPKM_anno.txt.gz", sep="\t", index_col=0)
sample_cols_277 = [c for c in df_277_raw.columns if c.startswith("Control") or c.startswith("PCOS")]
df_277 = df_277_raw[sample_cols_277].apply(pd.to_numeric, errors="coerce")
df_277.index = [str(i).upper() for i in df_277.index]
df_277 = np.log2(np.clip(df_277.groupby(df_277.index).mean(), 0, None) + 1.0)
gate1_results.append(eval_gate1_cohort(df_277, np.array([1 if c.startswith("Control") else 0 for c in df_277.columns]), None, "GSE277906_PCOS", "Human Cumulus Cells (n=40): Normo-Ovulatory Controls (n=17) vs PCOS (n=23)"))

# BH FDR across Gate 1
g1_pvals = []
for r in gate1_results:
    for ax in ["S_egg_comp", "S_egg_mito", "S_egg_ferro"]:
        g1_pvals.append(r["axes"][ax]["p_mwu"])
_, g1_qvals, _, _ = multipletests(g1_pvals, method="fdr_bh")
idx = 0
for r in gate1_results:
    for ax in ["S_egg_comp", "S_egg_mito", "S_egg_ferro"]:
        r["axes"][ax]["bh_q"] = float(g1_qvals[idx])
        idx += 1
    print(f"  {r['cohort_id']:25s} | comp={r['axes']['S_egg_comp']['auroc']} (q={r['axes']['S_egg_comp']['bh_q']:.2e}) | mito={r['axes']['S_egg_mito']['auroc']} (q={r['axes']['S_egg_mito']['bh_q']:.2e}) | ferro={r['axes']['S_egg_ferro']['auroc']} (q={r['axes']['S_egg_ferro']['bh_q']:.2e}) | OOF={r['nested_cv_10x5']['oof_auroc']}")

# ==============================================================================
# GATE 2 — SPERMATOZOA CHROMATIN PACKAGING & OOCYTE-ACTIVATION ENGINE
# ==============================================================================
G2_ACT_POS = ["PLCZ1", "IZUMO1", "CRISP2", "HSPA2", "PRKACA", "SPACA3"]
G2_CHROM_POS = ["PRM1", "PRM2", "TNP1", "TNP2", "HILS1"]
G2_MOT_POS = ["CATSPER1", "CATSPER2", "CATSPER3", "CATSPER4", "KCNU1", "ADCY10", "COX5B", "ATP5F1A"]
G2_MOT_NEG = ["CASP3", "BAX", "CYCS"]
G2_ALL_GENES = list(dict.fromkeys(G2_ACT_POS + G2_CHROM_POS + G2_MOT_POS + G2_MOT_NEG))

def eval_gate2_cohort(df, y_binary, cont_vec=None, cohort_id="", label_desc=""):
    s_act, f_act, _ = compute_module_score(df, G2_ACT_POS)
    s_chrom, f_cpos, f_cneg = compute_module_score(df, G2_CHROM_POS, special_mode="sperm_chrom")
    s_mot, f_mpos, f_mneg = compute_module_score(df, G2_MOT_POS, G2_MOT_NEG)
    
    out = {"cohort_id": cohort_id, "comparison": label_desc, "axes": {}}
    for ax_name, s, fpos, fneg in [
        ("S_sperm_act", s_act, f_act, []),
        ("S_sperm_chrom", s_chrom, f_cpos, f_cneg),
        ("S_sperm_mot", s_mot, f_mpos, f_mneg)
    ]:
        eb = eval_binary(y_binary, s)
        eb["perm_p"] = perm_pvalue(y_binary, s)
        eb["genes_pos_found"] = fpos
        eb["genes_neg_found"] = fneg
        if cont_vec is not None:
            m = (~pd.isna(s)) & (~pd.isna(cont_vec))
            if np.sum(m) >= 5:
                rho, p_rho = spearmanr(cont_vec[m], s[m])
                eb["spearman_rho"] = round(float(rho), 4)
                eb["spearman_p"] = float(p_rho)
        out["axes"][ax_name] = eb
    X_comb = pd.DataFrame({"act": s_act, "chrom": s_chrom, "mot": s_mot})
    out["nested_cv_10x5"] = nested_cv_oof(X_comb, y_binary)
    out["top_genes"] = rank_single_genes(df, y_binary, G2_ALL_GENES)
    return out

print("=== GATE 2 EXECUTION ===")
gate2_results = []

# 2A: GSE6872 (Platts / Krawetz 2007: 13 Normospermic Fertile vs 8 Teratozoospermic Infertile)
meta_6872, df_6872 = parse_series_matrix(f"{DATA_DIR}/GSE6872_series_matrix.txt.gz", maps["GPL570"], log_transform=True)
y_6872 = np.array([1 if "Fertile" in c and "Infertile" not in c else 0 for c in meta_6872["char"][0]])
gate2_results.append(eval_gate2_cohort(df_6872, y_6872, None, "GSE6872", "Human Spermatozoa (n=21, Platts/Krawetz): Normozoospermic Proven-Fertile (n=13) vs Teratozoospermic Infertile (n=8)"))

# 2B: GSE26982-GPL6244 (Pacheco / Houseman 2011: 18 Human Sperm Profiles with Motility %, Count, Morphology %)
meta_26982, df_26982 = parse_series_matrix(f"{DATA_DIR}/GSE26982-GPL6244_series_matrix.txt.gz", maps["GPL6244"])
mot_26982 = np.array([float(c.split(":")[-1].strip()) for c in meta_26982["char"][1]])
y_26982 = (mot_26982 >= 50.0).astype(int) # WHO normomotile >=50% (n=11) vs low motility asthenozoospermic <50% (n=7)
gate2_results.append(eval_gate2_cohort(df_26982, y_26982, mot_26982, "GSE26982", "Human Spermatozoa (n=18, Pacheco): High-Motility Normozoospermic >=50% (n=11) vs Low-Motility Asthenozoospermic <50% (n=7)"))

# 2C: GSE4797 (Feig / Schulze 2007: 28 Human Testicular Spermatogenesis Biopsies)
meta_4797, df_4797 = parse_series_matrix(f"{DATA_DIR}/GSE4797_series_matrix.txt.gz", maps["GPL2891"])
y_4797 = np.array([1 if "full testicular spermatogenesis" in c else 0 for c in meta_4797["char"][0]])
ord_4797 = np.array([3 if "full" in c else (2 if "hypo" in c else (1 if "aspermato" in c else 0)) for c in meta_4797["char"][0]], dtype=float)
gate2_results.append(eval_gate2_cohort(df_4797, y_4797, ord_4797, "GSE4797", "Human Testicular Biopsies (n=28, Feig): Full Testicular Spermatogenesis (n=9) vs Impaired/Arrest/SCOS (n=19)"))

# 2D: GSE281732 (n=67 Human Spermatozoa RNA-seq: Proven-Fertile vs Infertility Study Participants)
df_281 = pd.read_csv(f"{DATA_DIR}/GSE281732_log2_norm_count_collapsed.csv.gz", index_col=0)
df_281["sym"] = [maps["ens"].get(str(x).split(".")[0].strip(), "") for x in df_281.index]
df_281 = df_281[df_281["sym"] != ""].groupby("sym").mean(numeric_only=True)
y_281 = np.array([0 if str(c).endswith("L") else 1 for c in df_281.columns]) # 1 = proven-fertile (n=14), 0 = infertility (n=53)
gate2_results.append(eval_gate2_cohort(df_281, y_281, None, "GSE281732", "Human Spermatozoa RNA-seq (n=67): Proven-Fertile Men (n=14) vs Infertility Cohort (n=53)"))

# 2E: GSE262969 (n=44 Human Spermatozoa RNA-seq in ART cycles: High/Average vs Low Blastocyst / Sperm Concentration)
df_262_raw = pd.read_csv(f"{DATA_DIR}/GSE262969_total_RPKMgenomic_gencode.txt.gz", sep="\t")
ann_262 = pd.read_csv(f"{DATA_DIR}/GSE262969_sample_annotations.txt.gz", sep="\t")
lib_cols = [c for c in ann_262["Library Name"] if c in df_262_raw.columns]
df_262 = df_262_raw.set_index("gene_symbol")[lib_cols].apply(pd.to_numeric, errors="coerce")
df_262.index = [str(i).upper() for i in df_262.index]
df_262 = np.log2(np.clip(df_262.groupby(df_262.index).mean(), 0, None) + 1.0)
ann_sub = ann_262.set_index("Library Name").loc[lib_cols]
# Compare normozoospermic >=15 M/mL & >=40% motility vs oligo/asthenozoospermic, plus continuous concentration
conc_vec = pd.to_numeric(ann_sub["SpermConcentration_mil.ml"], errors="coerce").values
y_262 = np.array([1 if c.startswith("H") else (0 if c.startswith("L") else np.nan) for c in lib_cols])
mask_hl = ~np.isnan(y_262)
gate2_results.append(eval_gate2_cohort(df_262.iloc[:, mask_hl], y_262[mask_hl].astype(int), pd.to_numeric(ann_sub["PercentBlast"], errors="coerce").values[mask_hl], "GSE262969", "Human Spermatozoa RNA-seq in ART (n=31): High Blastocyst Development Group (n=17) vs Low Blastocyst Group (n=14)"))

g2_pvals = []
for r in gate2_results:
    for ax in ["S_sperm_act", "S_sperm_chrom", "S_sperm_mot"]:
        p = r["axes"][ax]["p_mwu"]
        g2_pvals.append(p if not np.isnan(p) else 1.0)
_, g2_qvals, _, _ = multipletests(g2_pvals, method="fdr_bh")
idx = 0
for r in gate2_results:
    for ax in ["S_sperm_act", "S_sperm_chrom", "S_sperm_mot"]:
        r["axes"][ax]["bh_q"] = float(g2_qvals[idx])
        idx += 1
    print(f"  {r['cohort_id']:25s} | act={r['axes']['S_sperm_act']['auroc']} (q={r['axes']['S_sperm_act']['bh_q']:.2e}) | chrom={r['axes']['S_sperm_chrom']['auroc']} (q={r['axes']['S_sperm_chrom']['bh_q']:.2e}) | mot={r['axes']['S_sperm_mot']['auroc']} (q={r['axes']['S_sperm_mot']['bh_q']:.2e}) | OOF={r['nested_cv_10x5']['oof_auroc']}")

# ==============================================================================
# GATE 3 — ENDOMETRIAL WOI, DECIDUAL SENESCENCE & PROGESTERONE-RESISTANCE ENGINE
# ==============================================================================
G3_RECEP_POS = ["PAEP", "SPP1", "LIF", "GPX3", "IGFBP1", "PRL", "FOXO1", "HOXA10", "HAND2", "IL15"]
G3_DOOR1_POS = ["DIO2"]
G3_DOOR1_NEG = ["SCARA5"]
G3_DOOR1_EXT_POS = ["DIO2", "CLU", "ABI3BP"]
G3_DOOR1_EXT_NEG = ["SCARA5", "NCAM1", "GNLY", "GZMB"]
G3_DOOR2_POS = ["BCL6", "SIRT1", "KRAS", "IL6", "IL1B", "TNF"]
G3_DOOR2_NEG = ["PGR", "HAND2", "HOXA10", "FOXO1"]
G3_ALL_GENES = list(dict.fromkeys(G3_RECEP_POS + G3_DOOR1_EXT_POS + G3_DOOR1_EXT_NEG + G3_DOOR2_POS + G3_DOOR2_NEG))

def eval_gate3_cohort(df, y_binary, cont_vec=None, cohort_id="", label_desc=""):
    # Note: y_binary = 1 for RIF/RPL/Infertility/Pre-receptive (Uterine Failure) OR let's standardize:
    # Let y_binary = 1 for Uterine Failure (RIF/RPL/UIF/Pre-receptive) so Door 1 (Senescence) and Door 2 (P4 resistance) are positive risk scores and S_receptivity is protective (<0.5 in failure, >0.5 in receptive)!
    s_rec, f_rec, _ = compute_module_score(df, G3_RECEP_POS)
    s_d1, f_d1p, f_d1n = compute_module_score(df, G3_DOOR1_POS, G3_DOOR1_NEG)
    s_d1_ext, f_d1ep, f_d1en = compute_module_score(df, G3_DOOR1_EXT_POS, G3_DOOR1_EXT_NEG)
    s_d2, f_d2p, f_d2n = compute_module_score(df, G3_DOOR2_POS, G3_DOOR2_NEG)
    
    out = {"cohort_id": cohort_id, "comparison": label_desc, "axes": {}}
    for ax_name, s, fpos, fneg in [
        ("S_receptivity", s_rec, f_rec, []),
        ("S_senescent_decidua", s_d1, f_d1p, f_d1n),
        ("S_senescent_ext", s_d1_ext, f_d1ep, f_d1en),
        ("S_p4_resist", s_d2, f_d2p, f_d2n)
    ]:
        eb = eval_binary(y_binary, s)
        eb["perm_p"] = perm_pvalue(y_binary, s)
        eb["genes_pos_found"] = fpos
        eb["genes_neg_found"] = fneg
        if cont_vec is not None:
            m = (~pd.isna(s)) & (~pd.isna(cont_vec))
            if np.sum(m) >= 5:
                rho, p_rho = spearmanr(cont_vec[m], s[m])
                eb["spearman_rho"] = round(float(rho), 4)
                eb["spearman_p"] = float(p_rho)
        out["axes"][ax_name] = eb
    X_comb = pd.DataFrame({"rec": s_rec, "d1": s_d1, "d1_ext": s_d1_ext, "d2": s_d2})
    out["nested_cv_10x5"] = nested_cv_oof(X_comb, y_binary)
    out["top_genes"] = rank_single_genes(df, y_binary, G3_ALL_GENES)
    return out

print("=== GATE 3 EXECUTION ===")
gate3_results = []

# 3A: GSE165004 (n=72: 24 RPL + 24 UIF vs 24 Fertile Controls)
meta_165, df_165 = parse_series_matrix(f"{DATA_DIR}/GSE165004_series_matrix.txt.gz", maps["GPL16699"])
grp_165 = [c.split(":")[-1].strip() for c in meta_165["char"][0]]
# y=1 for Fertile Receptive Control vs y=0 for RPL/UIF (and we also report discriminative_auroc & signed delta_z!)
y_165_all = np.array([0 if g == "Control" else 1 for g in grp_165]) # 1 = RPL/UIF (n=48), 0 = Fertile Control (n=24)
gate3_results.append(eval_gate3_cohort(df_165, y_165_all, None, "GSE165004_All", "Human Mid-Secretory Endometrium (n=72): RPL + Unexplained Infertility (n=48) vs Fertile Controls (n=24)"))
mask_uif = np.array([g in ("Control", "patient with UIF") for g in grp_165])
y_165_uif = np.array([1 if g == "patient with UIF" else 0 for g in np.array(grp_165)[mask_uif]])
gate3_results.append(eval_gate3_cohort(df_165.iloc[:, mask_uif], y_165_uif, None, "GSE165004_UIF_vs_Ctrl", "Human Mid-Secretory Endometrium (n=48): Unexplained Infertility (n=24) vs Fertile Controls (n=24)"))
mask_rpl = np.array([g in ("Control", "patient with RPL") for g in grp_165])
y_165_rpl = np.array([1 if g == "patient with RPL" else 0 for g in np.array(grp_165)[mask_rpl]])
gate3_results.append(eval_gate3_cohort(df_165.iloc[:, mask_rpl], y_165_rpl, None, "GSE165004_RPL_vs_Ctrl", "Human Mid-Secretory Endometrium (n=48): Recurrent Pregnancy Loss (n=24) vs Fertile Controls (n=24)"))

# 3B: GSE111974 (n=48: 24 RIF vs 24 Fertile Controls)
meta_111, df_111 = parse_series_matrix(f"{DATA_DIR}/GSE111974_series_matrix.txt.gz", maps["GPL17077"])
y_111 = np.array([1 if "RIF" in t else 0 for t in meta_111["title"]]) # 1 = RIF (n=24), 0 = Fertile Control (n=24)
gate3_results.append(eval_gate3_cohort(df_111, y_111, None, "GSE111974", "Human Mid-Secretory Endometrium (n=48, Bastu): Recurrent Implantation Failure RIF (n=24) vs Fertile Controls (n=24)"))

# 3C: GSE58144 (n=115: 43 RIF vs 72 Fertile Controls)
meta_581, df_581 = parse_series_matrix(f"{DATA_DIR}/GSE58144_series_matrix.txt.gz", maps["GPL15789"])
y_581 = np.array([1 if "recurrent implantation failure" in c else 0 for c in meta_581["char"][1]]) # 1 = RIF (n=43), 0 = Control (n=72)
gate3_results.append(eval_gate3_cohort(df_581, y_581, None, "GSE58144", "Human Mid-Luteal Endometrium (n=115, Koot/Macklon): Recurrent Implantation Failure RIF (n=43) vs Fertile Controls (n=72)"))

# 3D: GSE98386 (n=40 Paired Endometrial RNA-seq: Pre-Receptive LH+2 vs Receptive WOI LH+8)
df_983 = pd.read_csv(f"{DATA_DIR}/GSE98386_edgeR_CPM_matrix.csv.gz", index_col=0)
df_983["sym"] = [maps["ens"].get(str(x).split(".")[0].strip(), "") for x in df_983.index]
df_983 = np.log2(np.clip(df_983[df_983["sym"] != ""].groupby("sym").mean(numeric_only=True), 0, None) + 1.0)
y_983 = np.array([1 if "LH2" in c else 0 for c in df_983.columns]) # 1 = Pre-receptive displaced WOI (LH+2, n=20), 0 = Receptive WOI (LH+8, n=20)
gate3_results.append(eval_gate3_cohort(df_983, y_983, None, "GSE98386_WOI_Displacement", "Paired Human Endometrium RNA-seq (n=40, Altmäe): Pre-Receptive Displaced LH+2 (n=20) vs Receptive WOI LH+8 (n=20)"))

# 3E: GSE4888 (n=27 Talbi/Giudice: Non-Receptive Phases vs Mid-Secretory Receptive WOI)
meta_4888, df_4888 = parse_series_matrix(f"{DATA_DIR}/GSE4888_series_matrix.txt.gz", maps["GPL570"], log_transform=True)
phase_4888 = meta_4888["char"][0]
mask_4888 = np.array(["Ambiguous" not in p for p in phase_4888])
y_4888 = np.array([0 if "Mid secretory" in p else 1 for p in np.array(phase_4888)[mask_4888]]) # 1 = Non-receptive phase (n=18), 0 = Mid-secretory Receptive WOI (n=8)
gate3_results.append(eval_gate3_cohort(df_4888.iloc[:, mask_4888], y_4888, None, "GSE4888_Cycle_WOI", "Human Endometrium across Cycle (n=26, Talbi/Giudice): Non-Receptive Phases (n=18) vs Mid-Secretory Receptive WOI (n=8)"))

# 3F: GSE180485 (n=36 unique patients in Warwick EndoTime Lucas/Brosens TPM matrix)
xl_180 = pd.ExcelFile(f"{DATA_DIR}/GSE180485_EndoTime_RNA_counts_TPM.xlsx")
tpm_180 = xl_180.parse("Transcripts per million")
tpm_180["sym"] = [str(x).strip().upper() for x in tpm_180["Associated.Gene.Name"]]
tpm_cols = [c for c in tpm_180.columns if c.endswith("_TPM")]
df_180 = np.log2(np.clip(tpm_180[tpm_180["sym"] != "NAN"].groupby("sym")[tpm_cols].mean(), 0, None) + 1.0)
# Extract patient metadata from GSE180485_series_matrix.txt.gz (Run1 entries = 36 unique patients in exact P1..P36 order)
meta_180, _ = parse_series_matrix(f"{DATA_DIR}/GSE180485_series_matrix.txt.gz")
p_meta = {}
for i, t in enumerate(meta_180["title"]):
    pid = t.split()[0] # e.g. P1_13063
    if pid not in p_meta:
        lh_str = meta_180["char"][1][i].split(":")[-1].strip()
        nk_str = meta_180["char"][2][i].split(":")[-1].strip()
        loss_str = meta_180["char"][3][i].split(":")[-1].strip()
        out_str = meta_180["char"][5][i].split(":")[-1].strip()
        p_meta[pid] = {
            "lh": float(lh_str) if lh_str != "NA" else np.nan,
            "nk": float(nk_str) if nk_str != "NA" else np.nan,
            "losses": float(loss_str) if loss_str != "NA" else np.nan,
            "outcome": out_str
        }
pids_180 = ["_".join(c.split("_")[:2]) for c in tpm_cols]
lh_180 = np.array([p_meta[p]["lh"] for p in pids_180])
losses_180 = np.array([p_meta[p]["losses"] for p in pids_180])
outcomes_180 = [p_meta[p]["outcome"] for p in pids_180]
# Compare Early Luteal (LH+6/7) vs Late Mid-Luteal (LH+8/9) AND Miscarriage vs Live birth
mask_lh = ~np.isnan(lh_180)
y_180_lh = (lh_180[mask_lh] <= 7).astype(int)
gate3_results.append(eval_gate3_cohort(df_180.iloc[:, mask_lh], y_180_lh, lh_180[mask_lh], "GSE180485_EndoTime", "Warwick EndoTime Luteal Cohort (n=35, Lucas/Brosens): Early Secretory Transition LH+6/7 (n=16) vs Late Secretory Differentiation LH+8/9 (n=19)"))

# 3G: GSE26787 (n=15 Lédée: 5 RIF + 5 RPL vs 5 Fertile Controls)
meta_267, df_267 = parse_series_matrix(f"{DATA_DIR}/GSE26787_series_matrix.txt.gz", maps["GPL570"], log_transform=True)
y_267 = np.array([0 if s == "fertile" else 1 for s in meta_267["source"]])
gate3_results.append(eval_gate3_cohort(df_267, y_267, None, "GSE26787", "Human Mid-Luteal Endometrium (n=15, Lédée): RIF + RPL (n=10) vs Fertile Controls (n=5)"))

g3_pvals = []
for r in gate3_results:
    for ax in ["S_receptivity", "S_senescent_decidua", "S_senescent_ext", "S_p4_resist"]:
        p = r["axes"][ax]["p_mwu"]
        g3_pvals.append(p if not np.isnan(p) else 1.0)
_, g3_qvals, _, _ = multipletests(g3_pvals, method="fdr_bh")
idx = 0
for r in gate3_results:
    for ax in ["S_receptivity", "S_senescent_decidua", "S_senescent_ext", "S_p4_resist"]:
        r["axes"][ax]["bh_q"] = float(g3_qvals[idx])
        idx += 1
    print(f"  {r['cohort_id']:25s} | rec={r['axes']['S_receptivity']['auroc']} (q={r['axes']['S_receptivity']['bh_q']:.2e}) | D1_sen={r['axes']['S_senescent_decidua']['auroc']} (q={r['axes']['S_senescent_decidua']['bh_q']:.2e}) | D2_p4={r['axes']['S_p4_resist']['auroc']} (q={r['axes']['S_p4_resist']['bh_q']:.2e}) | OOF={r['nested_cv_10x5']['oof_auroc']}")

# Save full results JSON
summary_out = {
    "gate1": gate1_results,
    "gate2": gate2_results,
    "gate3": gate3_results
}
with open(f"{OUT_DIR}/raw_gate_results.json", "w") as f:
    json.dump(summary_out, f, indent=2)
print("Saved raw_gate_results.json successfully.")
