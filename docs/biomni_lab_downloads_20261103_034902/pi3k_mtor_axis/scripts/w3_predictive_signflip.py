#!/usr/bin/env python3
"""
W3 — PI3K/mTOR predictive (platinum-response) + sign-flip test.

Tests the request's claim of a "predictive sign-flip (GSE160626 p=0.043) toward
platinum sensitivity under replication stress."

GSE160626 is NOT in the repo. We instead use the three GROUNDED HGSOC platinum-
response cohorts already validated in prior work (GSE63885, GSE30161, GSE51373;
all GPL570) to ask, honestly: does a PI3K/mTOR pathway score predict platinum
resistance vs sensitivity? And is the DIRECTION consistent across cohorts, or does
it flip (a real 'sign-flip' would be higher score -> resistant in one cohort but
-> sensitive in another)?

Per-cohort: AUROC (score vs resistant label) + bootstrap 95% CI, plus point-
biserial direction. Sign-flip = AUROCs straddling 0.5 across cohorts.
"""
import json, gzip, re
import numpy as np, pandas as pd

DATA_DIR = "/mnt/shared-workspace/shared/pi3k_validation/gse_data"
PANEL_PATH = "/mnt/shared-workspace/shared/pi3k_validation/pi3k_mtor_gene_panel.json"
OUT = "/mnt/shared-workspace/shared/pi3k_validation/w3_predictive_results.json"
rng = np.random.default_rng(7)

# GPL570 probe sets for PI3K/mTOR panel genes (Affymetrix HG-U133 Plus 2.0).
# Multi-probe -> mean, then z within cohort. Curated canonical probes.
PROBES = {
    "PIK3CA": ["204369_at", "235980_at"],
    "PIK3CB": ["207089_at", "212688_at"],
    "PIK3R1": ["212239_at", "217620_s_at"],
    "AKT1":   ["207163_s_at"],
    "AKT2":   ["203552_at", "225471_s_at"],
    "AKT3":   ["212607_at", "219393_s_at"],
    "MTOR":   ["215413_at", "234285_at"],
    "RPTOR":  ["225551_at", "227507_at"],
    "RICTOR": ["224727_at", "225605_at"],
    "PTEN":   ["204053_x_at", "211711_s_at"],
    "TSC1":   ["209390_at"],
    "TSC2":   ["215735_at"],
    "STK11":  ["204292_x_at"],
}
CORE = {"PIK3CA","AKT1","AKT2","AKT3","MTOR","RPTOR","RICTOR"}
NEG  = {"PTEN","TSC1","TSC2","STK11","PIK3R1"}

def read_series_matrix(path):
    op = gzip.open if path.endswith(".gz") else open
    meta_lines=[]; data_start=None; rows=[]
    with op(path, "rt", errors="replace") as f:
        in_tab=False
        for line in f:
            if line.startswith("!series_matrix_table_begin"):
                in_tab=True; continue
            if line.startswith("!series_matrix_table_end"):
                break
            if in_tab:
                rows.append(line.rstrip("\n").split("\t"))
            elif line.startswith("!Sample"):
                meta_lines.append(line.rstrip("\n"))
    header=[c.strip('"') for c in rows[0]]
    dat=pd.DataFrame(rows[1:], columns=header)
    dat=dat.rename(columns={header[0]:"probe"})
    dat["probe"]=dat["probe"].str.strip('"')
    for c in dat.columns[1:]:
        dat[c]=pd.to_numeric(dat[c], errors="coerce")
    return meta_lines, dat

def get_meta_row(meta_lines, key):
    for l in meta_lines:
        if l.lower().startswith(key.lower()):
            return [c.strip('"') for c in l.split("\t")[1:]]
    return None

def build_score(dat):
    dat=dat.set_index("probe")
    gene_vals={}
    for g,probes in PROBES.items():
        present=[p for p in probes if p in dat.index]
        if not present: continue
        v=dat.loc[present].mean(axis=0)
        gene_vals[g]=v
    G=pd.DataFrame(gene_vals)  # samples x genes
    # log2 if linear-scale (median >=20)
    if np.nanmedian(G.values) >= 20:
        G=np.log2(G+1)
    Z=(G-G.mean())/G.std()
    act=[g for g in Z.columns if g in CORE]; neg=[g for g in Z.columns if g in NEG]
    score_dir=Z[act].mean(axis=1)-Z[neg].mean(axis=1)
    score_uns=Z.mean(axis=1)
    return score_dir, score_uns, list(Z.columns)

def auroc(y, s):
    # y: 1=resistant; AUROC of score predicting resistant
    from sklearn.metrics import roc_auc_score
    return float(roc_auc_score(y, s))

def boot_ci(y, s, n=5000):
    y=np.asarray(y); s=np.asarray(s)
    idx0=np.where(y==0)[0]; idx1=np.where(y==1)[0]
    from sklearn.metrics import roc_auc_score
    vals=[]
    for _ in range(n):
        b0=rng.choice(idx0, len(idx0), replace=True)
        b1=rng.choice(idx1, len(idx1), replace=True)
        bi=np.concatenate([b0,b1])
        try: vals.append(roc_auc_score(y[bi], s[bi]))
        except Exception: pass
    return float(np.percentile(vals,2.5)), float(np.percentile(vals,97.5))

def label_gse63885(meta):
    # 'platinium sensitivity' after last colon; resistant->1, moderately/highly->0, na drop
    row=None
    for key in ["!Sample_characteristics_ch1"]:
        pass
    # scan all characteristics rows for 'platinium'
    return None

def main():
    panel=json.load(open(PANEL_PATH))
    results={"receipt_type":"w3_predictive_platinum_response",
             "claim_under_test":"GSE160626 sign-flip p=0.043 toward platinum sensitivity",
             "note_dataset":"GSE160626 not in repo; using grounded GPL570 platinum cohorts "
                            "GSE63885/GSE30161/GSE51373 to test predictive direction + sign-flip",
             "cohorts":{}}
    import os
    # cohort label builders reuse logic from prior validated MFAP4 work
    def characteristics(meta_lines):
        chars=[l for l in meta_lines if l.lower().startswith("!sample_characteristics")]
        cols=None
        parsed=[]
        for l in chars:
            parts=[c.strip('"') for c in l.split("\t")[1:]]
            parsed.append(parts)
        return parsed  # list of rows, each len=n_samples

    cohorts={
        "GSE63885": f"{DATA_DIR}/GSE63885_series_matrix.txt.gz",
        "GSE30161": f"{DATA_DIR}/GSE30161_series_matrix.txt.gz",
        "GSE51373": f"{DATA_DIR}/GSE51373_series_matrix.txt.gz",
    }
    for name, path in cohorts.items():
        if not os.path.exists(path):
            results["cohorts"][name]={"error":"file missing"}; continue
        meta, dat = read_series_matrix(path)
        score_dir, score_uns, genes_used = build_score(dat)
        char_rows = characteristics(meta)
        n = dat.shape[1]-1
        y = np.full(n, np.nan)
        samples = list(dat.columns[1:])
        # --- label parsing per cohort ---
        if name=="GSE63885":
            for parts in char_rows:
                joined=" ".join(parts).lower()
                if "platinium" in joined or "platinum sensitivity" in joined:
                    for i,val in enumerate(parts):
                        txt=val.split(":")[-1].strip().lower()
                        if "resistant" in txt: y[i]=1
                        elif "sensitive" in txt: y[i]=0
                    break
        elif name=="GSE30161":
            # Field is literally 'pfi days' (platinum-free interval, days).
            # Standard def: platinum-resistant = PFI < 180 days.
            pfi=None
            for parts in char_rows:
                j=parts[0].split(":")[0].lower() if parts else ""
                if "pfi" in j and "day" in j:
                    pfi=[]
                    for val in parts:
                        m=re.search(r"([\d.]+)", val.split(":")[-1])
                        pfi.append(float(m.group(1)) if m else np.nan)
                    break
            if pfi is not None:
                pfi=np.array(pfi)
                y = np.where(pfi < 180.0, 1.0, 0.0)
                y[np.isnan(pfi)] = np.nan
        elif name=="GSE51373":
            for parts in char_rows:
                joined=" ".join(parts).lower()
                if "resistant" in joined or "sensitive" in joined:
                    for i,val in enumerate(parts):
                        txt=val.lower()
                        if "resistant" in txt: y[i]=1
                        elif "sensitive" in txt: y[i]=0
                    break
        # align + drop na
        sd = pd.Series(score_dir.values, index=score_dir.index)
        # score index are sample columns; ensure alignment to samples order
        s_dir = np.array([score_dir.get(s, np.nan) for s in samples])
        s_uns = np.array([score_uns.get(s, np.nan) for s in samples])
        mask = ~np.isnan(y) & ~np.isnan(s_dir)
        yy=y[mask].astype(int); sdir=s_dir[mask]; suns=s_uns[mask]
        n_res=int(yy.sum()); n_sens=int((yy==0).sum())
        block={"n":int(mask.sum()),"n_resistant":n_res,"n_sensitive":n_sens,
               "genes_used":genes_used}
        if n_res>=3 and n_sens>=3:
            a_dir=auroc(yy,sdir); lo,hi=boot_ci(yy,sdir)
            a_uns=auroc(yy,suns); lo2,hi2=boot_ci(yy,suns)
            block.update({
                "auroc_dir":round(a_dir,3),"auroc_dir_ci":[round(lo,3),round(hi,3)],
                "auroc_uns":round(a_uns,3),"auroc_uns_ci":[round(lo2,3),round(hi2,3)],
                "direction_dir":"higher_score_more_resistant" if a_dir>0.5 else "higher_score_more_sensitive",
            })
            print(f"[W3] {name}: n={block['n']} res={n_res}/sens={n_sens} "
                  f"AUROC_dir={a_dir:.3f} CI[{lo:.3f},{hi:.3f}] ({block['direction_dir']})", flush=True)
        else:
            block["error"]=f"insufficient labels res={n_res} sens={n_sens}"
            print(f"[W3] {name}: LABELING FAILED res={n_res} sens={n_sens}", flush=True)
        results["cohorts"][name]=block

    # sign-flip verdict: do directional AUROCs straddle 0.5 across cohorts?
    aurocs={k:v.get("auroc_dir") for k,v in results["cohorts"].items() if v.get("auroc_dir") is not None}
    if len(aurocs)>=2:
        above=[k for k,a in aurocs.items() if a>0.55]
        below=[k for k,a in aurocs.items() if a<0.45]
        results["signflip_verdict"]={
            "auroc_by_cohort":aurocs,
            "cohorts_score_predicts_resistance":above,
            "cohorts_score_predicts_sensitivity":below,
            "sign_flip_observed":bool(above and below),
            "note":"A real sign-flip requires the SAME score to predict resistance in one "
                   "cohort and sensitivity in another (AUROC on opposite sides of 0.5). "
                   "If all near 0.5, the honest conclusion is 'no reliable predictive signal'.",
        }
        print(f"[W3] sign-flip observed: {results['signflip_verdict']['sign_flip_observed']} | AUROCs={aurocs}", flush=True)
    else:
        results["signflip_verdict"]={"note":"insufficient cohorts with valid labels to assess sign-flip"}
    json.dump(results, open(OUT,"w"), indent=2)
    print(f"[W3] DONE -> {OUT}", flush=True)

if __name__=="__main__":
    main()
