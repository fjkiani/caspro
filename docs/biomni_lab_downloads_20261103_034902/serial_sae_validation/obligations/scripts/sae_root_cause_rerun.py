#!/usr/bin/env python3
"""
SAE root-cause isolation: rerun ORIGINAL vs FROZEN(W1) post-DDR scoring on the
SAME raw GSE165897 data and the SAME PFI vectors, changing ONE variable at a time.

Goal: determine whether the DDR gene-set difference (original 8 genes vs W1 14 genes)
is the single change that moves post_ddr-vs-PFI Spearman from -0.209 toward -0.711.
"""
import gzip, json
import numpy as np
import pandas as pd
from scipy import stats

RAW = "/workspace/gse165897"

# ---- gene sets, verbatim from the two scripts ----
# ORIGINAL: pathway_kinetics_gse165897.py  DDR_GENES
DDR_ORIG = ["BRCA1","BRCA2","ATM","ATR","CHEK1","CHEK2","RAD51","PARP1"]           # 8
# FROZEN / W1: w1_discovery.py DDR set
DDR_W1   = ["BRCA1","BRCA2","PALB2","RAD51","ATM","ATR","CHEK1","CHEK2",
            "TP53","XRCC1","PARP1","FANCA","FANCC","FANCD2"]                        # 14

# ---- PFI vectors ----
canon = json.load(open(f"{RAW}/../shared/serial_sae_validation/gse165897/resistance_labels.json")) \
        if False else None  # placeholder; real load below

def load_pfi():
    import os
    # canonical corrected labels live in shared workspace
    p = "/mnt/shared-workspace/shared/serial_sae_validation/gse165897/resistance_labels.json"
    d = json.load(open(p))
    pfi_new = {k: v["pfi_days"] for k, v in d.items() if not k.startswith("_")}
    pfi_old = dict(pfi_new)
    pfi_old["EOC87"]   = 274   # documented correction 274 -> 30 (also flipped class)
    pfi_old["EOC1005"] = 126   # 126 -> 65 (both resistant)
    pfi_old["EOC136"]  = 210   # 210 -> 520 (both sensitive)
    return pfi_old, pfi_new

# ---- build shared pseudobulk: sum UMI per patient x phase -> CPM -> log2(CPM+1) ----
def build_pseudobulk():
    print("loading cellInfo...")
    ci = pd.read_csv(f"{RAW}/GSE165897_cellInfo_HGSOC.tsv.gz", sep="\t")
    # phase -> we only need post-NACT here, but compute all for completeness
    cell2pat = dict(zip(ci["cell"], ci["patient_id"]))
    cell2ph  = dict(zip(ci["cell"], ci["treatment_phase"]))

    print("streaming UMI matrix (genes x cells)...")
    # We only need the union of genes in either DDR set -> stream just those rows.
    want = set(DDR_ORIG) | set(DDR_W1)
    # accumulate per-(patient,phase) gene sums AND per-group total counts (for CPM denom)
    # CPM denominator needs TOTAL counts per group over ALL genes -> must sum every row.
    import collections
    genesum = collections.defaultdict(lambda: collections.defaultdict(float))  # group -> gene -> sum
    totals  = collections.defaultdict(float)                                    # group -> total UMI
    groups_of_cell = {}

    with gzip.open(f"{RAW}/GSE165897_UMIcounts_HGSOC.tsv.gz", "rt") as f:
        header = f.readline().rstrip("\n").split("\t")
        cells = header[1:]  # first col is gene id
        # precompute group index per cell column
        grp = []
        for c in cells:
            cc = c.strip().strip('"')
            pat = cell2pat.get(cc); ph = cell2ph.get(cc)
            grp.append((pat, ph) if (pat is not None and ph is not None) else None)
        n = 0
        for line in f:
            parts = line.rstrip("\n").split("\t")
            g = parts[0].strip().strip('"')
            vals = np.array(parts[1:], dtype=np.float64)
            # add to group totals (all genes)
            # vectorized accumulation by group
            # build once: map each unique group to summed value
            # (do it with pandas groupby-like via np.add.at on integer codes)
            n += 1
            # totals: sum per group
            # to keep it simple/fast enough for 32847 rows, use dict accumulation on nonzero groups
            # Precompute integer codes for groups
            if n == 1:
                uniq = {}
                codes = np.empty(len(grp), dtype=np.int64)
                for i, gp in enumerate(grp):
                    if gp is None:
                        codes[i] = -1
                    else:
                        if gp not in uniq:
                            uniq[gp] = len(uniq)
                        codes[i] = uniq[gp]
                code2grp = {v: k for k, v in uniq.items()}
                ngrp = len(uniq)
                tot_arr = np.zeros(ngrp)
                keep_mask = codes >= 0
                codes_keep = codes[keep_mask]
            v_keep = vals[keep_mask]
            np.add.at(tot_arr, codes_keep, v_keep)
            if g in want:
                # per-group sum for this gene
                gs = np.zeros(ngrp)
                np.add.at(gs, codes_keep, v_keep)
                for ci_ in range(ngrp):
                    if gs[ci_] != 0:
                        genesum[code2grp[ci_]][g] += gs[ci_]
            if n % 5000 == 0:
                print(f"  {n} genes processed")
    print(f"done: {n} genes, {ngrp} groups")

    # group totals
    totals = {code2grp[i]: tot_arr[i] for i in range(ngrp)}

    # build log2(CPM+1) for the wanted genes, per group
    rows = {}
    for grp_key, gdict in genesum.items():
        tot = totals[grp_key]
        row = {}
        for g in want:
            raw = gdict.get(g, 0.0)
            cpm = (raw / tot) * 1e6 if tot > 0 else 0.0
            row[g] = np.log2(cpm + 1.0)
        rows[grp_key] = row
    return rows  # {(patient, phase): {gene: log2cpm}}

def ddr_score_mean(row, geneset):
    """W1 style: plain mean of log2(CPM+1) over gene set."""
    vals = [row[g] for g in geneset if g in row]
    return float(np.mean(vals)) if vals else np.nan

def ddr_score_orig(row, geneset):
    """ORIGINAL style: mean(log2(CPM+1)) then /15 clipped to [0,1]."""
    m = ddr_score_mean(row, geneset)
    if np.isnan(m):
        return np.nan
    return min(1.0, max(0.0, m / 15.0))

def main():
    pb = build_pseudobulk()
    pfi_old, pfi_new = load_pfi()
    patients = sorted(pfi_new.keys())

    # post-NACT rows per patient
    def post_row(pat):
        # phase string in cellInfo is "post-NACT"
        return pb.get((pat, "post-NACT"))

    # assemble post_ddr under each definition
    recs = []
    for pat in patients:
        r = post_row(pat)
        if r is None:
            recs.append((pat, np.nan, np.nan, np.nan, np.nan))
            continue
        recs.append((
            pat,
            ddr_score_mean(r, DDR_ORIG),   # orig geneset, MEAN (no rescale)
            ddr_score_orig(r, DDR_ORIG),   # orig geneset, orig rescale /15
            ddr_score_mean(r, DDR_W1),     # W1 geneset, MEAN (=frozen pipeline)
            ddr_score_orig(r, DDR_W1),     # W1 geneset, orig rescale /15
        ))
    F = pd.DataFrame(recs, columns=["eoc","ddr_orig8_mean","ddr_orig8_resc","ddr_w1_14_mean","ddr_w1_14_resc"]).set_index("eoc")
    order = list(F.index)

    def spear(col, pfi_map):
        x = F[col].values.astype(float)
        y = np.array([pfi_map[e] for e in order], float)
        ok = ~np.isnan(x)
        rho, p = stats.spearmanr(x[ok], y[ok])
        return rho, p, int(ok.sum())

    print("\n================= SHARED PSEUDOBULK, post-DDR under 4 definitions x 2 PFI =================")
    print("patients:", order, "n =", len(order))
    print("\nper-patient post_ddr values:")
    print(F.round(4).to_string())

    combos = [
        ("ORIG 8-gene, /15 rescale", "ddr_orig8_resc"),
        ("ORIG 8-gene, plain mean",  "ddr_orig8_mean"),
        ("W1 14-gene, plain mean (FROZEN)", "ddr_w1_14_mean"),
        ("W1 14-gene, /15 rescale",  "ddr_w1_14_resc"),
    ]
    print("\n--- Spearman(post_ddr, PFI) ---")
    print(f"{'definition':<34}{'rho_OLDpfi':>12}{'p_OLD':>9}{'rho_NEWpfi':>12}{'p_NEW':>9}")
    out = {}
    for label, col in combos:
        ro, po, no = spear(col, pfi_old)
        rn, pn, nn = spear(col, pfi_new)
        print(f"{label:<34}{ro:>12.4f}{po:>9.4f}{rn:>12.4f}{pn:>9.4f}")
        out[label] = {"rho_old": ro, "p_old": po, "rho_new": rn, "p_new": pn, "n": nn}

    # confirm rescale is monotonic -> identical Spearman to mean within each geneset
    print("\nSanity: rescale must not change Spearman vs mean (monotonic):")
    for gs, mcol, rcol in [("ORIG8","ddr_orig8_mean","ddr_orig8_resc"),
                           ("W1_14","ddr_w1_14_mean","ddr_w1_14_resc")]:
        rm,_,_ = spear(mcol, pfi_new); rr,_,_ = spear(rcol, pfi_new)
        print(f"  {gs}: mean rho={rm:.4f}  rescaled rho={rr:.4f}  identical={np.isclose(rm,rr)}")

    json.dump({"per_patient": F.round(6).reset_index().to_dict(orient="records"),
               "spearman": out,
               "ddr_orig_genes": DDR_ORIG, "ddr_w1_genes": DDR_W1,
               "pfi_old": pfi_old, "pfi_new": pfi_new},
              open(f"{RAW}/sae_root_cause_rerun.json","w"), indent=2)
    print(f"\nsaved {RAW}/sae_root_cause_rerun.json")

if __name__ == "__main__":
    main()
