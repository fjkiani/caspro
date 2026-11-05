#!/usr/bin/env python3
"""
Closes the geneset loop for the root-cause audit: tests the THIRD DDR gene-set
definition found in git history (crispro-backend-v2 ovarian_pathway_model.py,
OVARIAN_PATHWAYS['DDR'], 26 genes) on the SAME verified raw GSE165897 data, to
check whether that set reaches the published rho=-0.711.

Reuses the exact pseudobulk logic validated in sae_root_cause_rerun.py
(sum UMI per patient x phase -> CPM -> log2(CPM+1) -> mean over gene set,
post-NACT phase, same 11 patients, corrected + old PFI).
"""
import gzip, json, collections
import numpy as np, pandas as pd
from scipy import stats

RAW = "/workspace/gse165897"

# ---- the three DDR gene-set definitions found across the codebase ----
DDR_ORIG = ["BRCA1","BRCA2","ATM","ATR","CHEK1","CHEK2","RAD51","PARP1"]                       # 8 (pathway_kinetics)
DDR_W1   = ["BRCA1","BRCA2","PALB2","RAD51","ATM","ATR","CHEK1","CHEK2",
            "TP53","XRCC1","PARP1","FANCA","FANCC","FANCD2"]                                    # 14 (w1_discovery frozen)
DDR_V2   = ["BRCA1","BRCA2","PALB2","RAD51C","RAD51D","BRIP1","BARD1","ATM","ATR","CHEK1",
            "CHEK2","RAD51","RAD52","RAD54L","FANCA","FANCB","FANCC","FANCD2","FANCE","FANCF",
            "FANCG","MRE11A","RAD50","NBN","XRCC2","XRCC3"]                                     # 26 (v2 ovarian_pathway_model)

def load_pfi():
    d = json.load(open("/mnt/shared-workspace/shared/serial_sae_validation/gse165897/resistance_labels.json"))
    pfi_new = {k: v["pfi_days"] for k, v in d.items() if not k.startswith("_")}
    pfi_old = dict(pfi_new); pfi_old["EOC87"]=274; pfi_old["EOC1005"]=126; pfi_old["EOC136"]=210
    return pfi_old, pfi_new

def build_pseudobulk(want):
    ci = pd.read_csv(f"{RAW}/GSE165897_cellInfo_HGSOC.tsv.gz", sep="\t")
    cell2pat = dict(zip(ci["cell"], ci["patient_id"]))
    cell2ph  = dict(zip(ci["cell"], ci["treatment_phase"]))
    genesum = collections.defaultdict(lambda: collections.defaultdict(float))
    with gzip.open(f"{RAW}/GSE165897_UMIcounts_HGSOC.tsv.gz","rt") as f:
        header = f.readline().rstrip("\n").split("\t")
        cells = header[1:]
        grp=[]
        for c in cells:
            cc=c.strip().strip('"'); pat=cell2pat.get(cc); ph=cell2ph.get(cc)
            grp.append((pat,ph) if (pat is not None and ph is not None) else None)
        n=0
        for line in f:
            parts=line.rstrip("\n").split("\t"); g=parts[0].strip().strip('"')
            vals=np.array(parts[1:],dtype=np.float64); n+=1
            if n==1:
                uniq={}; codes=np.empty(len(grp),dtype=np.int64)
                for i,gp in enumerate(grp):
                    if gp is None: codes[i]=-1
                    else:
                        if gp not in uniq: uniq[gp]=len(uniq)
                        codes[i]=uniq[gp]
                code2grp={v:k for k,v in uniq.items()}; ngrp=len(uniq)
                tot_arr=np.zeros(ngrp); keep=codes>=0; codes_keep=codes[keep]
            v_keep=vals[keep]; np.add.at(tot_arr,codes_keep,v_keep)
            if g in want:
                gs=np.zeros(ngrp); np.add.at(gs,codes_keep,v_keep)
                for ci_ in range(ngrp):
                    if gs[ci_]!=0: genesum[code2grp[ci_]][g]+=gs[ci_]
    totals={code2grp[i]:tot_arr[i] for i in range(ngrp)}
    rows={}
    for gk,gd in genesum.items():
        tot=totals[gk]; rows[gk]={g:np.log2((gd.get(g,0.0)/tot*1e6 if tot>0 else 0.0)+1.0) for g in want}
    return rows

def post_ddr_score(rows, geneset):
    out={}
    for (pat,ph),row in rows.items():
        if ph!="post-NACT": continue
        present=[g for g in geneset if g in row]
        out[pat]=float(np.mean([row[g] for g in present]))
    return out

def main():
    pfi_old,pfi_new=load_pfi()
    want=set(DDR_ORIG)|set(DDR_W1)|set(DDR_V2)
    rows=build_pseudobulk(want)
    print("=== post-DDR vs PFI Spearman across ALL THREE historical DDR gene sets ===")
    print(f"{'gene set':22s} {'n':>3s} {'rho_OLDpfi':>11s} {'p_OLD':>8s} {'rho_NEWpfi':>11s} {'p_NEW':>8s}")
    results={}
    for name,gs in [("ORIG 8-gene",DDR_ORIG),("W1 14-gene (frozen)",DDR_W1),("v2 26-gene",DDR_V2)]:
        sc=post_ddr_score(rows,gs)
        pats=sorted(p for p in sc if p in pfi_new)
        x=[sc[p] for p in pats]
        r_old,p_old=stats.spearmanr(x,[pfi_old[p] for p in pats])
        r_new,p_new=stats.spearmanr(x,[pfi_new[p] for p in pats])
        results[name]={"n":len(pats),"rho_old":r_old,"p_old":p_old,"rho_new":r_new,"p_new":p_new,
                       "n_genes_present":len([g for g in gs if any(g in rows[k] for k in rows)])}
        print(f"{name:22s} {len(pats):3d} {r_old:11.4f} {p_old:8.4f} {r_new:11.4f} {p_new:8.4f}")
    reaches=any(abs(v["rho_new"]+0.711)<0.05 or abs(v["rho_old"]+0.711)<0.05 for v in results.values())
    print(f"\nAny DDR gene set reaches rho=-0.711 (+/-0.05)? {reaches}")
    most_neg=min(min(v['rho_new'],v['rho_old']) for v in results.values())
    print(f"Most negative post_ddr across all three gene sets x both PFI = {most_neg:.4f}")
    out={"results":results,"any_reaches_-0.711":bool(reaches),"most_negative":float(most_neg),
         "note":"v2 26-gene DDR set (crispro-backend-v2 ovarian_pathway_model.py) tested on same raw data; validation script read the deleted pathway_scores.csv, not raw."}
    json.dump(out,open(f"{RAW}/sae_v2_geneset_test.json","w"),indent=2)
    print(f"\nsaved {RAW}/sae_v2_geneset_test.json")

if __name__=="__main__":
    main()
