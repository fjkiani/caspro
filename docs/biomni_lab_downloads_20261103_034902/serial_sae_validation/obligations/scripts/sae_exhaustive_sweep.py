#!/usr/bin/env python3
"""
Exhaustive sweep: can ANY feature x test x PFI x geneset reproduce the manuscript
Table-2 discovery values (post_ddr rho with p=0.014; post_pi3k p=0.020; post_vegf p=0.088;
composites p=0.023) from the raw GSE165897 data?

Original gene sets (pathway_kinetics_gse165897.py), with alias resolution to matrix symbols.
"""
import gzip, json, collections
import numpy as np, pandas as pd
from scipy import stats

RAW = "/workspace/gse165897"

# ORIGINAL gene sets, resolved to symbols present in the matrix.
# (MEK1/2, ERK1/2, VEGFR1/2 do NOT exist in matrix -> original scores silently used the subset that matched.
#  We reproduce that faithfully: only matched genes contribute.)
ORIG = {
  "ddr":  ["BRCA1","BRCA2","ATM","ATR","CHEK1","CHEK2","RAD51","PARP1"],
  "pi3k": ["PIK3CA","AKT1","AKT2","PTEN","MTOR"],          # mTOR->MTOR
  "vegf": ["VEGFA","HIF1A"],                                # VEGFR1/2 absent -> only VEGFA,HIF1A matched
}
# also try VEGF with common aliases resolved, in case original env had them
VEGF_ALIitems = {"KDR":"VEGFR2 alias","FLT1":"VEGFR1 alias"}

def build_pb(want):
    ci = pd.read_csv(f"{RAW}/GSE165897_cellInfo_HGSOC.tsv.gz", sep="\t")
    cell2pat = dict(zip(ci["cell"], ci["patient_id"]))
    cell2ph  = dict(zip(ci["cell"], ci["treatment_phase"]))
    with gzip.open(f"{RAW}/GSE165897_UMIcounts_HGSOC.tsv.gz","rt") as f:
        header=f.readline().rstrip("\n").split("\t"); cells=header[1:]
        grp=[]
        for c in cells:
            cc=c.strip().strip('"'); pat=cell2pat.get(cc); ph=cell2ph.get(cc)
            grp.append((pat,ph) if pat is not None and ph is not None else None)
        uniq={}; codes=np.empty(len(grp),dtype=np.int64)
        for i,gp in enumerate(grp):
            codes[i]=-1 if gp is None else uniq.setdefault(gp,len(uniq))
        code2grp={v:k for k,v in uniq.items()}; ngrp=len(uniq)
        keep=codes>=0; codes_keep=codes[keep]; tot=np.zeros(ngrp)
        genesum=collections.defaultdict(lambda: np.zeros(ngrp))
        n=0
        for line in f:
            parts=line.rstrip("\n").split("\t"); g=parts[0].strip().strip('"')
            vals=np.array(parts[1:],dtype=np.float64)[keep]
            np.add.at(tot,codes_keep,vals); n+=1
            if g in want:
                np.add.at(genesum[g],codes_keep,vals)
    rows={}
    for gi in range(ngrp):
        key=code2grp[gi]; t=tot[gi]; row={}
        for g in want:
            raw=genesum[g][gi]; cpm=(raw/t)*1e6 if t>0 else 0.0; row[g]=np.log2(cpm+1)
        rows[key]=row
    return rows

def load_pfi():
    d=json.load(open("/mnt/shared-workspace/shared/serial_sae_validation/gse165897/resistance_labels.json"))
    new={k:v["pfi_days"] for k,v in d.items() if not k.startswith("_")}
    old=dict(new); old["EOC87"]=274; old["EOC1005"]=126; old["EOC136"]=210
    return old,new

def mean_score(row,gs): 
    v=[row[g] for g in gs if g in row and not np.isnan(row[g])]
    return float(np.mean(v)) if v else np.nan

def main():
    want=set(ORIG["ddr"])|set(ORIG["pi3k"])|set(ORIG["vegf"])|{"KDR","FLT1","FLT4","VEGFB","VEGFC"}
    pb=build_pb(want)
    old,new=load_pfi(); pats=sorted(new)
    def row(pat,ph): return pb.get((pat,ph))
    # build pre/post/delta for ddr,pi3k,vegf(orig) + composites
    rec={}
    for pat in pats:
        pre=row(pat,"treatment-naive"); post=row(pat,"post-NACT")
        if pre is None or post is None: continue
        d={}
        for pw,gs in ORIG.items():
            d[f"post_{pw}"]=mean_score(post,gs); d[f"pre_{pw}"]=mean_score(pre,gs)
            d[f"delta_{pw}"]=d[f"post_{pw}"]-d[f"pre_{pw}"]
        d["post_composite_equal"]=(d["post_ddr"]+d["post_pi3k"]+d["post_vegf"])/3
        d["post_composite_weighted"]=0.4*d["post_ddr"]+0.3*d["post_pi3k"]+0.3*d["post_vegf"]  # per composite_roc script
        rec[pat]=d
    F=pd.DataFrame(rec).T
    order=list(F.index)
    print("n patients:",len(order)); print(F.round(3).to_string())

    feats=[c for c in F.columns]
    print(f"\n{'feature':<26}{'test':<9}{'PFI':<5}{'r':>9}{'p':>9}")
    hits=[]
    for feat in feats:
        x=F[feat].values.astype(float); ok=~np.isnan(x)
        for pfi_name,pfi in [("OLD",old),("NEW",new)]:
            y=np.array([pfi[e] for e in order],float)
            for test in ["spearman","pearson"]:
                if test=="spearman":
                    r,p=stats.spearmanr(x[ok],y[ok])
                else:
                    r,p=stats.pearsonr(x[ok],y[ok])
                tag=""
                if abs(abs(r)-0.711)<0.05 or (p<0.02 and abs(r)>0.6): tag=" <== near -0.711/p=0.014"
                if tag: hits.append((feat,test,pfi_name,round(r,4),round(p,4)))
                print(f"{feat:<26}{test:<9}{pfi_name:<5}{r:>9.4f}{p:>9.4f}{tag}")
    print("\n=== combinations matching manuscript headline (|r|~0.711 or p<0.02 & |r|>0.6) ===")
    if hits:
        for h in hits: print("  ",h)
    else:
        print("  NONE. No feature/test/PFI/geneset combination reproduces rho=-0.711 p=0.014 from raw data.")

    # also print the specific Table-2 targets side by side
    print("\n=== manuscript Table-2 targets vs best raw recomputation (NEW pfi, spearman) ===")
    tgt={"post_ddr":(-0.711,0.014),"post_pi3k":(None,0.020),"post_vegf":(None,0.088),
         "post_composite_equal":(None,0.023),"post_composite_weighted":(None,0.023)}
    for feat,(tr,tp) in tgt.items():
        x=F[feat].values.astype(float); ok=~np.isnan(x); y=np.array([new[e] for e in order],float)
        r,p=stats.spearmanr(x[ok],y[ok])
        print(f"  {feat:<26} manuscript p={tp}  ->  recomputed rho={r:.4f} p={p:.4f}")

if __name__=="__main__": main()
