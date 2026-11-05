#!/usr/bin/env python3
"""
W2 — Same-cohort cross-pipeline SENSITIVITY CHECK for the PI3K/mTOR pathway score.

NOTE ON SCOPE: This is NOT independent replication. cBioPortal's ov_tcga /
ov_tcga_pub studies are the SAME TCGA ovarian patients as W1
(ov_tcga_pan_can_atlas_2018), reprocessed by a different pipeline
(normalization / z-scoring / sample inclusion). W2 therefore tests whether the
W1 prognostic null is STABLE to reprocessing, not whether it replicates in an
external non-TCGA cohort (none with mRNA + OS was available). Genuinely
independent cohorts are used for the PREDICTIVE analysis (W3: GSE63885 /
GSE30161 / GSE51373).

W1 (TCGA-OV, n=299) found NO significant prognostic effect (directional HR/SD
1.01 p=0.88; unsigned 1.16 p=0.065). W2 re-derives the same directional +
unsigned scores on the reprocessed rendering (n=303) with the same pre-registered
panel and the same CoxPH + Schoenfeld pipeline.
"""
import json, urllib.request
import numpy as np, pandas as pd

BASE = "https://www.cbioportal.org/api"
PANEL_PATH = "/mnt/shared-workspace/shared/pi3k_validation/pi3k_mtor_gene_panel.json"
OUT = "/mnt/shared-workspace/shared/pi3k_validation/w2_replication_results.json"

# Alternate cBioPortal renderings of the SAME TCGA-OV patients (reprocessed);
# NOT independent cohorts. Pick first that works.
CANDIDATES = [
    ("ov_tcga", "ov_tcga_rna_seq_v2_mrna_median_Zscores", "ov_tcga_all"),
    ("ov_tcga_pub", "ov_tcga_pub_rna_seq_mrna_median_Zscores", "ov_tcga_pub_all"),
]

def _req(method, url, payload=None):
    data=None; headers={"Accept":"application/json"}
    if payload is not None:
        data=json.dumps(payload).encode(); headers["Content-Type"]="application/json"
    return json.load(urllib.request.urlopen(
        urllib.request.Request(url, data=data, headers=headers, method=method), timeout=120))

def try_cohort(study, zprofile, sample_list, genes, core, negreg):
    # verify profile exists
    profs = _req("GET", f"{BASE}/studies/{study}/molecular-profiles")
    pids = {p["molecularProfileId"] for p in profs}
    if zprofile not in pids:
        z_alt = [p for p in pids if "mrna" in p.lower() and "zscore" in p.lower()]
        if not z_alt:
            return None, f"no mrna zscore profile in {study}"
        zprofile = sorted(z_alt)[0]
    gmeta = _req("POST", f"{BASE}/genes/fetch?geneIdType=HUGO_GENE_SYMBOL", payload=genes)
    h2e = {g["hugoGeneSymbol"]: g["entrezGeneId"] for g in gmeta}
    zdata = _req("POST",
        f"{BASE}/molecular-profiles/{zprofile}/molecular-data/fetch?projection=SUMMARY",
        payload={"entrezGeneIds": list(h2e.values()), "sampleListId": sample_list})
    if not zdata:
        return None, f"no z data for {study}"
    e2h = {v:k for k,v in h2e.items()}
    zdf = pd.DataFrame([{"sampleId":d["sampleId"],"hugo":e2h.get(d["entrezGeneId"]),
                         "z":d.get("value")} for d in zdata])
    zmat = zdf.pivot_table(index="sampleId", columns="hugo", values="z", aggfunc="mean")
    clin = _req("POST",
        f"{BASE}/studies/{study}/clinical-data/fetch?clinicalDataType=PATIENT&projection=SUMMARY",
        payload={"attributeIds":["OS_STATUS","OS_MONTHS"]})
    cdf = pd.DataFrame([{"patientId":d["patientId"],"attr":d["clinicalAttributeId"],
                        "val":d["value"]} for d in clin])
    if cdf.empty:
        return None, f"no OS clinical for {study}"
    cwide = cdf.pivot_table(index="patientId", columns="attr", values="val", aggfunc="first")
    zmat = zmat.copy(); zmat["patientId"]=[s.rsplit("-",1)[0] for s in zmat.index]
    act=[g for g in zmat.columns if g in core]; neg=[g for g in zmat.columns if g in negreg]
    allc=[g for g in zmat.columns if g in set(genes)]
    zmat["dir"]=zmat[act].mean(axis=1)-zmat[neg].mean(axis=1)
    zmat["uns"]=zmat[allc].mean(axis=1)
    pscore=zmat.groupby("patientId")[["dir","uns"]].mean()
    df=pscore.join(cwide, how="inner")
    df["event"]=df["OS_STATUS"].astype(str).str.startswith("1").astype(float)
    df["time"]=pd.to_numeric(df["OS_MONTHS"], errors="coerce")
    df=df.dropna(subset=["time","event","dir"]); df=df[df["time"]>0]
    if len(df)<40:
        return None, f"{study} usable n={len(df)} too small"
    from lifelines import CoxPHFitter
    from lifelines.statistics import proportional_hazard_test
    out={"study":study,"zprofile":zprofile,"n":int(len(df)),"events":int(df["event"].sum())}
    for name in ["dir","uns"]:
        d=df[["time","event",name]].copy()
        d[name]=(d[name]-d[name].mean())/d[name].std()
        c=CoxPHFitter().fit(d, duration_col="time", event_col="event")
        s=c.summary.loc[name]
        blk={"HR_per_1SD":float(np.exp(s["coef"])),
             "ci95_low":float(np.exp(s["coef lower 95%"])),
             "ci95_high":float(np.exp(s["coef upper 95%"])),
             "p":float(s["p"])}
        try:
            zph=proportional_hazard_test(c,d,time_transform="rank")
            blk["ph_test_p"]=float(zph.summary["p"].iloc[0])
        except Exception: blk["ph_test_p"]=None
        out[f"score_{name}"]=blk
    return out, None

def main():
    panel=json.load(open(PANEL_PATH))
    genes=panel["hugo_symbols"]; core=set(panel["core_activating_axis"])
    negreg=set(panel["negative_regulators_tumor_suppressors"])
    results={"receipt_type":"w2_independent_replication_cox","attempts":[]}
    picked=None
    for study,zp,sl in CANDIDATES:
        try:
            res,err=try_cohort(study,zp,sl,genes,core,negreg)
            if res:
                picked=res
                results["attempts"].append({"study":study,"ok":True})
                print(f"[W2] cohort {study}: n={res['n']} events={res['events']} "
                      f"dir HR/SD={res['score_dir']['HR_per_1SD']:.3f} p={res['score_dir']['p']:.4f} | "
                      f"uns HR/SD={res['score_uns']['HR_per_1SD']:.3f} p={res['score_uns']['p']:.4f}", flush=True)
                break
            else:
                results["attempts"].append({"study":study,"ok":False,"reason":err})
                print(f"[W2] {study} skipped: {err}", flush=True)
        except Exception as e:
            results["attempts"].append({"study":study,"ok":False,"reason":str(e)[:150]})
            print(f"[W2] {study} error: {str(e)[:150]}", flush=True)
    if picked:
        results["replication_cohort"]=picked
        # W1 was null; replication verdict = does 2nd cohort also show no sig effect?
        results["verdict"]={
            "dir_significant_p05":bool(picked["score_dir"]["p"]<0.05),
            "uns_significant_p05":bool(picked["score_uns"]["p"]<0.05),
            "concordant_with_w1_null":bool(picked["score_dir"]["p"]>=0.05),
        }
    else:
        results["replication_cohort"]=None
        results["verdict"]={"note":"no independent OV cohort with mRNA+OS retrievable; "
                            "W1 remains discovery-only, single-cohort null."}
    json.dump(results, open(OUT,"w"), indent=2)
    print(f"[W2] DONE -> {OUT}", flush=True)

if __name__=="__main__":
    main()
