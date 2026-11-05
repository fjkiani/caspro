#!/usr/bin/env python3
"""W3-F reconciliation: resolve the adjusted-effect / Cox-OS reproduction gap.

The W3 Part F run used covariate set (s3_sd, age, stage_adv, num_lines_n, hr_gene_mut)
and an s3 SD computed on n=67. The archived obl3_s3_quantification.py used
covs = [s3_diag_z, age_z, stage_adv, brca, nlines] with:
  * s3 SD and age mean/sd computed on the FULL n=98 set (before dropna to 67)
  * nlines = pd.to_numeric(num_lines, errors="coerce") -> '4+' becomes NaN -> median fill
  * Cox covariates = [s3_diag_z, age_z, stage_adv, brca]  (NO nlines)

This script re-runs the EXACT archived specification on our independently rebuilt
patient table, then isolates which single choice moves which number.
"""
import json
import warnings

import numpy as np
import pandas as pd
import statsmodels.api as sm
from lifelines import CoxPHFitter
from lifelines.statistics import proportional_hazard_test

import sys
sys.path.insert(0, "/workspace/s3work")
from s3_pipeline.firth import firth_logit, firth_lrt_p  # noqa: E402

warnings.filterwarnings("ignore")
OUT = "/mnt/results/resistance_prophet_s3"
REBUILT = f"{OUT}/tables/rebuilt_patient_master.csv"
DOC = {"mle_or": 0.0252, "mle_p": 0.0141, "firth_or": 0.0825, "firth_p": 0.0095,
       "cox_hr": 0.6869, "cox_p": 0.043, "cox_ci": [0.4775, 0.9883],
       "schoenfeld_global_p": 0.2251, "s3_sd": 0.1337}


def prep(df):
    """Reproduce the archived preprocessing exactly."""
    d = df[df["s3_diag"].notna() & df["resistant"].notna()].copy()
    d["resistant"] = d["resistant"].astype(int)
    d["s3_diag"] = pd.to_numeric(d["s3_diag"], errors="coerce")
    d["stage_adv"] = (pd.to_numeric(d["tumour_stage_at_diagnosis"], errors="coerce") >= 3).astype(float)
    d["brca"] = d["brca_mut"].fillna(False).astype(float)
    d["hr"] = d["hr_gene_mut"].fillna(False).astype(float)
    age = pd.to_numeric(d["age"], errors="coerce")
    d["age_z"] = (age - age.mean()) / age.std()
    nl_coerced = pd.to_numeric(d["num_lines"], errors="coerce")      # '4+' -> NaN (archived behaviour)
    d["nlines"] = nl_coerced.fillna(nl_coerced.median())
    nl_recode = (d["num_lines"].astype("string").str.replace("+", "", regex=False)
                 .astype("Float64").astype(float))
    d["nlines_recode5"] = np.where(
        d["num_lines"].astype("string").str.contains(r"\+", na=False), 5.0, nl_recode)
    d["nlines_recode5"] = pd.Series(d["nlines_recode5"], index=d.index).fillna(
        pd.Series(d["nlines_recode5"], index=d.index).median())
    s3sd_98 = float(d["s3_diag"].std())                              # SD on the n=98 set
    d["s3_diag_z"] = (d["s3_diag"] - d["s3_diag"].mean()) / s3sd_98
    return d, s3sd_98


def fit_logit(dd, covs):
    X = sm.add_constant(dd[covs].astype(float))
    y = dd["resistant"].astype(int)
    m = sm.Logit(y, X).fit(disp=0, method="bfgs")
    key = covs[0]
    ci = m.conf_int().loc[key]
    f = firth_logit(dd[covs].astype(float).values, y.values.astype(float))
    bi = 1  # intercept at 0, first covariate at 1
    return {
        "n": int(len(dd)), "events": int(y.sum()), "n_covariates": len(covs), "covariates": covs,
        "mle_or_per_sd": round(float(np.exp(m.params[key])), 4),
        "mle_beta": round(float(m.params[key]), 4),
        "mle_p": round(float(m.pvalues[key]), 4),
        "mle_ci_or": [round(float(np.exp(ci.iloc[0])), 4), round(float(np.exp(ci.iloc[1])), 4)],
        "firth_or_per_sd": round(float(f["or"][bi]), 4),
        "firth_beta": round(float(f["beta"][bi]), 4),
        "firth_wald_p": round(float(f["wald_p"][bi]), 4),
        "firth_lrt_p": round(float(firth_lrt_p(dd[covs].astype(float).values,
                                               y.values.astype(float), 0)), 6),
    }


def fit_cox(d, covs):
    cd = d.dropna(subset=["os_time", "os_event", "s3_diag_z"]).copy()
    cd = cd[cd["os_time"] > 0]
    df = cd[["os_time", "os_event"] + covs].dropna().astype(float)
    cph = CoxPHFitter().fit(df, duration_col="os_time", event_col="os_event")
    zph = proportional_hazard_test(cph, df, time_transform="rank")
    ci = cph.confidence_intervals_.loc[covs[0]]
    return {
        "n": int(len(df)), "events": int(df["os_event"].sum()), "covariates": covs,
        "hr_per_sd": round(float(np.exp(cph.params_[covs[0]])), 4),
        "p": round(float(cph.summary.loc[covs[0], "p"]), 4),
        "ci_hr": [round(float(np.exp(ci.iloc[0])), 4), round(float(np.exp(ci.iloc[1])), 4)],
        "schoenfeld_global_p": round(float(zph.summary["p"].min()), 4),
        "ph_violation": bool((zph.summary["p"] < 0.05).any()),
    }


def main():
    raw = pd.read_csv(REBUILT)
    d, s3sd_98 = prep(raw)
    res = {"rebuilt_table": REBUILT, "n_modeling_set": int(len(d)),
           "events_modeling_set": int(d["resistant"].sum()),
           "s3_sd_on_n98": round(s3sd_98, 6), "documented_s3_sd": DOC["s3_sd"],
           "s3_sd_on_n67_for_contrast": None, "documented": DOC, "variants": {}}

    # --- exact archived specification ---
    covs_exact = ["s3_diag_z", "age_z", "stage_adv", "brca", "nlines"]
    dd = d.dropna(subset=covs_exact + ["resistant"]).copy()
    res["s3_sd_on_n67_for_contrast"] = round(float(dd["s3_diag"].std()), 6)
    res["variants"]["V0_exact_archived_spec"] = fit_logit(dd, covs_exact)
    res["variants"]["V0_exact_archived_spec"]["cox"] = fit_cox(
        d, ["s3_diag_z", "age_z", "stage_adv", "brca"])

    # --- one-at-a-time deviations from the archived spec ---
    covs_hr = ["s3_diag_z", "age_z", "stage_adv", "hr", "nlines"]
    res["variants"]["V1_hr_gene_instead_of_brca"] = fit_logit(
        d.dropna(subset=covs_hr + ["resistant"]), covs_hr)
    covs_rec = ["s3_diag_z", "age_z", "stage_adv", "brca", "nlines_recode5"]
    res["variants"]["V2_num_lines_4plus_as_5"] = fit_logit(
        d.dropna(subset=covs_rec + ["resistant"]), covs_rec)
    # SD computed on the 67-row complete-case set instead of the 98-row modeling set
    d67 = d.dropna(subset=covs_exact + ["resistant"]).copy()
    d67["s3_sd67"] = d67["s3_diag"] / float(d67["s3_diag"].std())
    covs_sd67 = ["s3_sd67", "age_z", "stage_adv", "brca", "nlines"]
    res["variants"]["V3_sd_from_n67"] = fit_logit(d67, covs_sd67)
    # the W3 Part F specification, for the record
    d["s3_sd_partf"] = d["s3_diag"] / float(d67["s3_diag"].std())
    covs_partf = ["s3_sd_partf", "age_z", "stage_adv", "nlines_recode5", "hr"]
    res["variants"]["V4_w3_partF_spec"] = fit_logit(
        d.dropna(subset=covs_partf + ["resistant"]), covs_partf)
    res["variants"]["V4_w3_partF_spec"]["cox"] = fit_cox(
        d, ["s3_diag_z", "age_z", "stage_adv", "hr", "nlines"])

    v0 = res["variants"]["V0_exact_archived_spec"]
    res["verdict"] = {
        "mle_or_matches_documented": abs(v0["mle_or_per_sd"] - DOC["mle_or"]) <= 0.0002,
        "mle_p_matches_documented": abs(v0["mle_p"] - DOC["mle_p"]) <= 0.0002,
        "firth_or_matches_documented": abs(v0["firth_or_per_sd"] - DOC["firth_or"]) <= 0.0002,
        "firth_p_matches_documented": abs(v0["firth_wald_p"] - DOC["firth_p"]) <= 0.0002,
        "cox_hr_matches_documented": abs(v0["cox"]["hr_per_sd"] - DOC["cox_hr"]) <= 0.0002,
        "cox_p_matches_documented": abs(v0["cox"]["p"] - DOC["cox_p"]) <= 0.0002,
        "s3_sd_matches_documented": abs(res["s3_sd_on_n98"] - DOC["s3_sd"]) <= 0.0002,
    }
    res["verdict"]["all_match"] = all(res["verdict"].values())
    res["interpretation"] = (
        "The W3 Part F gap was a specification difference, not a data difference. "
        "The archived spec scales s3 by the SD of the n=98 modeling set (not the n=67 "
        "complete-case set), adjusts for BRCA (not any-HR-gene), drops '4+' lines to NaN "
        "then median-fills, and omits num_lines from the Cox model. Re-running that exact "
        "specification on the independently rebuilt table reproduces the documented "
        "adjusted OR, Firth OR and Cox HR."
        if res["verdict"]["all_match"] else
        "Exact archived specification re-run; residual differences listed per variant.")

    with open(f"{OUT}/w3f_reconciliation.json", "w") as fh:
        json.dump(res, fh, indent=2, default=str)
    print(json.dumps(res, indent=2, default=str))


if __name__ == "__main__":
    main()
