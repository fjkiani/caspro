import os, gzip, json, hashlib, re, warnings
import numpy as np
import pandas as pd
from scipy.stats import mannwhitneyu, spearmanr
from sklearn.metrics import roc_auc_score
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import RepeatedStratifiedKFold, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

warnings.filterwarnings("ignore")
DATA_DIR = "/Users/fahadkiani/Desktop/development/caspro/caspro/fertility_triad_v1_discovery/data"
OUT_DIR = "/Users/fahadkiani/Desktop/development/caspro/caspro/fertility_triad_v1_discovery"

# 1. Build Ensembl -> Gene Symbol and RefSeq -> Gene Symbol dictionaries
ens_to_sym = {}
refseq_to_sym = {}

print("[1/5] Building Ensembl & Platform Probe -> HGNC Gene Symbol dictionaries...")
endo_xl = pd.ExcelFile(f"{DATA_DIR}/GSE180485_EndoTime_RNA_counts_TPM.xlsx")
endo_tpm_raw = endo_xl.parse("Transcripts per million")
for _, r in endo_tpm_raw[["Ensembl.Gene.ID", "Associated.Gene.Name"]].dropna().iterrows():
    eid = str(r["Ensembl.Gene.ID"]).split(".")[0].strip()
    sym = str(r["Associated.Gene.Name"]).strip().upper()
    if eid and sym and sym != "NAN":
        ens_to_sym[eid] = sym

def load_gpl_map(gpl_file, id_col="ID", sym_col="Gene symbol", gb_col=None):
    mapping = {}
    opener = gzip.open if gpl_file.endswith(".gz") else open
    with opener(gpl_file, "rt", errors="ignore") as f:
        in_table = False
        hdr = []
        id_idx, sym_idx, gb_idx = 0, -1, -1
        for line in f:
            line = line.rstrip("\n\r")
            if line.startswith("!platform_table_begin"):
                in_table = True
                hdr = f.readline().rstrip("\n\r").split("\t")
                for i, h in enumerate(hdr):
                    if h == id_col: id_idx = i
                    if h.upper() == sym_col.upper(): sym_idx = i
                    if gb_col and h.upper() == gb_col.upper(): gb_idx = i
                continue
            elif line.startswith("!platform_table_end"):
                break
            elif in_table:
                parts = line.split("\t")
                if len(parts) <= max(id_idx, sym_idx): continue
                pid = parts[id_idx].strip()
                sym = parts[sym_idx].strip() if sym_idx >= 0 else ""
                if "///" in sym:
                    sym = sym.split("///")[0].strip()
                sym = sym.upper()
                if pid and sym and sym not in ("", "NA", "---", "CONTROL", "POS", "NEG"):
                    mapping[pid] = sym
                    if gb_idx >= 0 and len(parts) > gb_idx:
                        gb = parts[gb_idx].split(".")[0].strip()
                        if gb: refseq_to_sym[gb] = sym
    return mapping

gpl570_map = load_gpl_map(f"{DATA_DIR}/GPL570.annot.gz", "ID", "Gene symbol", "GenBank Accession")
gpl4133_map = load_gpl_map(f"{DATA_DIR}/GPL4133.annot.gz", "ID", "Gene symbol", "GenBank Accession")
gpl10558_map = load_gpl_map(f"{DATA_DIR}/GPL10558.annot.gz", "ID", "Gene symbol", "GenBank Accession")
gpl6244_map = load_gpl_map(f"{DATA_DIR}/GPL6244.annot.gz", "ID", "Gene symbol", "GenBank Accession")
gpl15789_map = load_gpl_map(f"{DATA_DIR}/GPL15789_family.soft", "ID", "GENE_SYMBOL")
gpl16699_map = load_gpl_map(f"{DATA_DIR}/GPL16699_family.soft", "ID", "GENE_SYMBOL", "REFSEQ")
gpl17077_map = load_gpl_map(f"{DATA_DIR}/GPL17077_family.soft", "ID", "GENE_SYMBOL", "REFSEQ")

# Also parse GPL16699 GB_ACC into refseq_to_sym
with open(f"{DATA_DIR}/GPL16699_family.soft", "rt", errors="ignore") as f:
    in_t = False
    for line in f:
        if line.startswith("!platform_table_begin"):
            in_t = True; f.readline(); continue
        elif line.startswith("!platform_table_end"): break
        elif in_t:
            p = line.rstrip("\n\r").split("\t")
            if len(p) > 9 and p[9].strip():
                sym = p[9].strip().upper()
                for col in [6, 7]:
                    acc = p[col].split(".")[0].strip()
                    if acc: refseq_to_sym[acc] = sym

# Build GPL2891 map using GB_ACC -> refseq_to_sym
gpl2891_map = {}
with open(f"{DATA_DIR}/GPL2891_family.soft", "rt", errors="ignore") as f:
    in_t = False
    for line in f:
        if line.startswith("!platform_table_begin"):
            in_t = True; f.readline(); continue
        elif line.startswith("!platform_table_end"): break
        elif in_t:
            p = line.rstrip("\n\r").split("\t")
            if len(p) > 7:
                pid = p[0].strip()
                gb = p[7].split(".")[0].strip()
                if gb in refseq_to_sym:
                    gpl2891_map[pid] = refseq_to_sym[gb]

print(f"  Mapped symbols: Ensembl={len(ens_to_sym)}, GPL570={len(gpl570_map)}, GPL4133={len(gpl4133_map)}, GPL6244={len(gpl6244_map)}, GPL15789={len(gpl15789_map)}, GPL16699={len(gpl16699_map)}, GPL17077={len(gpl17077_map)}, GPL2891={len(gpl2891_map)}")

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
    # Collapse duplicate gene symbols by mean
    df = df.groupby(df.index).mean()
    return meta, df

# Alias expansion for common HGNC synonyms
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

def get_gene_z(df_z, gene):
    candidates = GENE_ALIASES.get(gene.upper(), [gene.upper()])
    for c in candidates:
        if c in df_z.index:
            return df_z.loc[c], c
    return None, None

def compute_module_score(df, pos_genes, neg_genes=None, special_mode=None):
    # Outcome-blind within-cohort z-score per gene across samples (columns)
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
        # mean(z(PRM1, PRM2, TNP1, TNP2, HILS1)) - abs(z(PRM1) - z(PRM2))
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

def eval_binary(y_true, scores, n_boot=2000, seed=42):
    mask = (~pd.isna(scores)) & (~pd.isna(y_true))
    y = np.asarray(y_true[mask], dtype=int)
    s = np.asarray(scores[mask], dtype=float)
    if len(np.unique(y)) < 2 or len(y) < 4:
        return {"auroc": np.nan, "ci95": [np.nan, np.nan], "p_mwu": np.nan, "direction_auroc": np.nan}
    auc = float(roc_auc_score(y, s))
    # Also compute directional / discriminative magnitude max(auc, 1-auc) and signed delta
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

print("Helper functions initialized successfully.")
