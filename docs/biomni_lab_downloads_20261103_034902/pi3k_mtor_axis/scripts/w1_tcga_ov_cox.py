#!/usr/bin/env python3
"""
W1 — TCGA-OV PI3K/mTOR prognostic Cox validation.

Tests the request's claim: "PI3K/mTOR is the only statistically significant
prognostic killer (HR=1.30, p=0.023) in a 299-patient TCGA-OV cohort."

Pulls REAL mRNA z-scores + clinical survival from cBioPortal
(ov_tcga_pan_can_atlas_2018), builds a PI3K/mTOR pathway score from the
pre-registered gene panel, runs CoxPH on overall survival, tests the PH
assumption (Schoenfeld), and runs per-gene univariate Cox with BH-FDR.

Writes a machine-readable receipt. All numbers destined for the axis
interpretation must come from this receipt (or W2/W3), never hardcoded.
"""
import json, sys, urllib.request, urllib.parse, io
import numpy as np
import pandas as pd

BASE = "https://www.cbioportal.org/api"
STUDY = "ov_tcga_pan_can_atlas_2018"
ZPROFILE = f"{STUDY}_rna_seq_v2_mrna_median_Zscores"
SAMPLE_LIST = f"{STUDY}_all"
PANEL_PATH = "/mnt/shared-workspace/shared/pi3k_validation/pi3k_mtor_gene_panel.json"
OUT = "/mnt/shared-workspace/shared/pi3k_validation/w1_tcga_ov_cox_results.json"

def _req(method, url, payload=None):
    data = None
    headers = {"Accept": "application/json"}
    if payload is not None:
        data = json.dumps(payload).encode()
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    return json.load(urllib.request.urlopen(req, timeout=120))

def get(url):
    return _req("GET", url)

def main():
    panel = json.load(open(PANEL_PATH))
    genes = panel["hugo_symbols"]
    core = set(panel["core_activating_axis"])
    negreg = set(panel["negative_regulators_tumor_suppressors"])

    # 1) map hugo -> entrez
    genes_meta = _req("POST", f"{BASE}/genes/fetch?geneIdType=HUGO_GENE_SYMBOL",
                      payload=genes)
    hugo2entrez = {g["hugoGeneSymbol"]: g["entrezGeneId"] for g in genes_meta}
    entrez_ids = list(hugo2entrez.values())
    print(f"[W1] mapped {len(hugo2entrez)}/{len(genes)} genes -> entrez", flush=True)

    # 2) fetch z-scores for these genes across the sample list
    zdata = _req("POST",
        f"{BASE}/molecular-profiles/{ZPROFILE}/molecular-data/fetch?projection=SUMMARY",
        payload={"entrezGeneIds": entrez_ids, "sampleListId": SAMPLE_LIST})
    zdf = pd.DataFrame([{"sampleId": d["sampleId"],
                         "entrez": d["entrezGeneId"],
                         "z": d.get("value")} for d in zdata])
    entrez2hugo = {v: k for k, v in hugo2entrez.items()}
    zdf["hugo"] = zdf["entrez"].map(entrez2hugo)
    zmat = zdf.pivot_table(index="sampleId", columns="hugo", values="z", aggfunc="mean")
    print(f"[W1] z-score matrix: {zmat.shape[0]} samples x {zmat.shape[1]} genes", flush=True)

    # 3) clinical (patient-level OS)
    clin = _req("POST",
        f"{BASE}/studies/{STUDY}/clinical-data/fetch?clinicalDataType=PATIENT&projection=SUMMARY",
        payload={"attributeIds": ["OS_STATUS", "OS_MONTHS", "AGE",
                                  "AJCC_PATHOLOGIC_TUMOR_STAGE",
                                  "CLINICAL_STAGE"]})
    cdf = pd.DataFrame([{"patientId": d["patientId"],
                         "attr": d["clinicalAttributeId"],
                         "val": d["value"]} for d in clin])
    cwide = cdf.pivot_table(index="patientId", columns="attr", values="val", aggfunc="first")

    # map sampleId -> patientId (strip -01 suffix; TCGA sample->patient)
    zmat = zmat.copy()
    zmat["patientId"] = [s.rsplit("-", 1)[0] for s in zmat.index]

    # 4) build directional pathway score (activators up, neg regulators down)
    act_cols = [g for g in zmat.columns if g in core]
    neg_cols = [g for g in zmat.columns if g in negreg]
    all_cols = [g for g in zmat.columns if g in set(genes)]
    zmat["pi3k_score_dir"] = zmat[act_cols].mean(axis=1) - zmat[neg_cols].mean(axis=1)
    zmat["pi3k_score_unsigned"] = zmat[all_cols].mean(axis=1)

    # aggregate to patient (mean across samples if multiple)
    pscore = zmat.groupby("patientId")[["pi3k_score_dir", "pi3k_score_unsigned"]].mean()

    df = pscore.join(cwide, how="inner")
    # OS parsing
    df["event"] = df["OS_STATUS"].astype(str).str.startswith("1").astype(float)
    df["time"] = pd.to_numeric(df["OS_MONTHS"], errors="coerce")
    df["age"] = pd.to_numeric(df["AGE"], errors="coerce")
    df = df.dropna(subset=["time", "event", "pi3k_score_dir"])
    df = df[df["time"] > 0]
    n = len(df); events = int(df["event"].sum())
    print(f"[W1] analysis cohort n={n}, events(deaths)={events}", flush=True)

    from lifelines import CoxPHFitter
    from lifelines.statistics import proportional_hazard_test

    results = {
        "receipt_type": "w1_tcga_ov_prognostic_cox",
        "data_source": f"cBioPortal {STUDY}",
        "expression_profile": ZPROFILE,
        "gene_panel": genes,
        "n_samples_expr": int(zmat.shape[0]),
        "n_analysis_cohort": n,
        "events_deaths": events,
        "epv_note": f"events/covariate must be >=10; events={events}",
        "claim_under_test": "HR=1.30, p=0.023, n=299 (PI3K/mTOR prognostic in TCGA-OV)",
    }

    # 5a) univariate Cox on directional score (per 1 SD)
    for score_name in ["pi3k_score_dir", "pi3k_score_unsigned"]:
        d = df[[ "time", "event", score_name]].copy()
        d[score_name] = (d[score_name] - d[score_name].mean()) / d[score_name].std()
        cph = CoxPHFitter().fit(d, duration_col="time", event_col="event")
        s = cph.summary.loc[score_name]
        block = {
            "HR_per_1SD": float(np.exp(s["coef"])),
            "coef": float(s["coef"]),
            "ci95_low": float(np.exp(s["coef lower 95%"])),
            "ci95_high": float(np.exp(s["coef upper 95%"])),
            "p": float(s["p"]),
            "n": n, "events": events,
        }
        # PH test
        try:
            zph = proportional_hazard_test(cph, d, time_transform="rank")
            block["ph_test_p"] = float(zph.summary["p"].iloc[0])
            block["ph_violated"] = bool(zph.summary["p"].iloc[0] < 0.05)
        except Exception as e:
            block["ph_test_p"] = None; block["ph_note"] = str(e)[:150]
        results[f"univariate_{score_name}"] = block
        print(f"[W1] {score_name}: HR/SD={block['HR_per_1SD']:.3f} "
              f"CI[{block['ci95_low']:.3f},{block['ci95_high']:.3f}] p={block['p']:.4f} "
              f"PHp={block.get('ph_test_p')}", flush=True)

    # 5b) adjusted model (age + stage) — disciplined covariate count for EPV
    dadj = df[["time", "event", "pi3k_score_dir", "age"]].copy()
    dadj["pi3k_score_dir"] = (dadj["pi3k_score_dir"] - dadj["pi3k_score_dir"].mean()) / dadj["pi3k_score_dir"].std()
    dadj = dadj.dropna()
    try:
        cph2 = CoxPHFitter().fit(dadj, duration_col="time", event_col="event")
        s2 = cph2.summary.loc["pi3k_score_dir"]
        results["adjusted_age"] = {
            "HR_per_1SD": float(np.exp(s2["coef"])),
            "ci95_low": float(np.exp(s2["coef lower 95%"])),
            "ci95_high": float(np.exp(s2["coef upper 95%"])),
            "p": float(s2["p"]), "n": int(len(dadj)),
            "covariates": ["pi3k_score_dir", "age"],
        }
        print(f"[W1] adjusted(age): HR/SD={results['adjusted_age']['HR_per_1SD']:.3f} "
              f"p={results['adjusted_age']['p']:.4f}", flush=True)
    except Exception as e:
        results["adjusted_age"] = {"error": str(e)[:150]}

    # 6) per-gene univariate Cox + BH-FDR
    from statsmodels.stats.multitest import multipletests
    pergene = {}
    pvals = []; gkeys = []
    zmat_p = zmat.groupby("patientId")[all_cols].mean()
    gj = zmat_p.join(df[["time", "event"]], how="inner").dropna(subset=["time", "event"])
    for g in all_cols:
        dd = gj[["time", "event", g]].dropna().copy()
        if dd[g].std() == 0 or len(dd) < 20:
            continue
        dd[g] = (dd[g] - dd[g].mean()) / dd[g].std()
        try:
            c = CoxPHFitter().fit(dd, duration_col="time", event_col="event")
            row = c.summary.loc[g]
            pergene[g] = {"HR_per_1SD": float(np.exp(row["coef"])), "p": float(row["p"])}
            pvals.append(float(row["p"])); gkeys.append(g)
        except Exception:
            continue
    if pvals:
        rej, q, _, _ = multipletests(pvals, method="fdr_bh")
        for i, g in enumerate(gkeys):
            pergene[g]["q_bh"] = float(q[i]); pergene[g]["sig_fdr05"] = bool(rej[i])
    results["per_gene_univariate_cox"] = pergene
    n_sig = sum(1 for g in pergene.values() if g.get("sig_fdr05"))
    print(f"[W1] per-gene: {n_sig}/{len(pergene)} genes sig at FDR<0.05", flush=True)

    # 7) verdict vs claim
    main_p = results["univariate_pi3k_score_dir"]["p"]
    main_hr = results["univariate_pi3k_score_dir"]["HR_per_1SD"]
    results["verdict"] = {
        "significant_prognostic_p05": bool(main_p < 0.05),
        "direction_higher_score_worse": bool(main_hr > 1.0),
        "reproduces_claim_hr130_p023": bool(abs(main_hr - 1.30) < 0.10 and main_p < 0.05),
        "note": "Claim HR expressed 'per 1.30'; we report HR per 1 SD of pathway score. "
                "Not directly comparable unless claim's scaling matches; verdict flags "
                "significance+direction, and whether magnitude coincidentally matches.",
    }
    json.dump(results, open(OUT, "w"), indent=2)
    print(f"[W1] DONE -> {OUT}", flush=True)
    print(f"[W1] VERDICT: sig={results['verdict']['significant_prognostic_p05']} "
          f"HR/SD={main_hr:.3f} p={main_p:.4f}", flush=True)

if __name__ == "__main__":
    main()
