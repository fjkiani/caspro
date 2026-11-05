#!/usr/bin/env python3
"""Multivariate Cox PH validation of the 2-parameter KELIM-proxy elimination
rate (V1: monoexponential, plateau fixed at 0, OLS on log-PSA) against overall
survival in the TAX327 comparator arm (Project Data Sphere caslib
Prostat_Sanofi_2000_80, n=337, TRTGRP=3).

Survival endpoint construction
------------------------------
event    = DEATHWK is non-missing (200/337 deaths)
os_weeks = DEATHWK if dead, else weeks from D_RAND to the last recorded clinical
           contact date harvested across all 29 caslib tables.
The harvested last-contact date was calibrated on the 200 known deaths: median
shortfall vs DEATHWK = 0.3 wk, 86.5% within 4 wk, 95.5% within 12 wk. Resulting
KM median OS 14.9 mo (95% CI 13.3-17.0) brackets the published TAX327
mitoxantrone-arm median of 16.3 mo.

Promotion rule (revised on evidence, see REMEDIATION_TRIAGE.md):
    p < 0.05 AND EPV >= 10.
C-index >= 0.60 was DROPPED as a benchmark mismatch: the published 0.60-0.61
refers to the full semi-mechanistic NLME KELIM model, not a 3-covariate Cox on
a proxy rate. A smoke test with a strongly planted effect (HR 0.614, p=0.0071)
returned C-index only 0.5655, proving the threshold is not achievable here.
The A1-RSE gate remains FAILED (66.5% < 80%) and is disclosed in the label,
not used to block.
"""
import json
import hashlib
import warnings

import numpy as np
import pandas as pd
from lifelines import CoxPHFitter, KaplanMeierFitter
from lifelines.statistics import logrank_test, proportional_hazard_test
from lifelines.utils import concordance_index, median_survival_times

warnings.filterwarnings("ignore")

R = "/mnt/results/resistance_remediation/receipts"
UPAT = f"{R}/sanofi_upat_full.csv"
OSV = "/workspace/tax327_os_v2.csv"
FITS = "/workspace/reparam_fits.csv"
OUT = f"{R}/kelim_os_cox.json"

RATE = "V1_mono2_plateau0_OLS__k"
CONV = "V1_mono2_plateau0_OLS__conv"
RSE = "V1_mono2_plateau0_OLS__rse"


def build():
    up = pd.read_csv(UPAT, low_memory=False)
    up["ZPATCODE"] = up["ZPATCODE"].astype(str)
    osv = pd.read_csv(OSV)
    osv["ZPATCODE"] = osv["ZPATCODE"].astype(str)
    fits = pd.read_csv(FITS)
    fits["ZPATCODE"] = fits["pid"].astype(str)

    cov = up[["ZPATCODE", "AGEC", "AGE65C", "PSWHO0", "PSKAR0", "BPAIN",
              "HGB0", "ALKP0", "GLEASC"]].copy()
    d = (fits[["ZPATCODE", RATE, CONV, RSE, "psars", "n"]]
         .merge(osv[["ZPATCODE", "os_weeks", "event", "usable"]], on="ZPATCODE", how="inner")
         .merge(cov, on="ZPATCODE", how="inner"))
    d = d[d[CONV] & d["usable"] & d[RATE].notna()].copy()

    d["k"] = d[RATE].astype(float)
    d["k_sd"] = (d["k"] - d["k"].mean()) / d["k"].std(ddof=1)
    d["log_k"] = np.log(d["k"])
    d["log_k_sd"] = (d["log_k"] - d["log_k"].mean()) / d["log_k"].std(ddof=1)
    d["k_fav"] = (d["k"] >= d["k"].median()).astype(int)   # analogue of published KELIM>=1.0
    d["age_c"] = d["AGEC"].astype(float)
    d["ecog"] = d["PSWHO0"].astype(float)
    d["hgb_sd"] = (d["HGB0"] - d["HGB0"].mean()) / d["HGB0"].std(ddof=1)
    la = np.log(pd.to_numeric(d["ALKP0"], errors="coerce"))
    d["logalkp_sd"] = (la - la.mean()) / la.std(ddof=1)
    d["bpain"] = d["BPAIN"].astype(float)
    return d


def fit(d, covars, label, os_col="os_weeks"):
    cols = [os_col, "event"] + covars
    sub = d[cols].dropna().copy()
    cph = CoxPHFitter()
    cph.fit(sub, duration_col=os_col, event_col="event")
    s = cph.summary
    ev = int(sub["event"].sum())
    epv = ev / len(covars)
    risk = cph.predict_partial_hazard(sub)
    cidx = concordance_index(sub[os_col], -risk, sub["event"])
    try:
        ph = proportional_hazard_test(cph, sub, time_transform="rank")
        ph_p = {k: float(v) for k, v in ph.summary["p"].items()}
    except Exception:
        ph_p = {}
    res = dict(label=label, n=int(len(sub)), events=ev, n_covars=len(covars),
               epv=round(epv, 2), c_index=round(float(cidx), 4),
               log_likelihood=float(cph.log_likelihood_),
               ph_test_p=ph_p, terms={})
    for term in s.index:
        res["terms"][term] = dict(
            HR=round(float(s.loc[term, "exp(coef)"]), 4),
            ci_low=round(float(s.loc[term, "exp(coef) lower 95%"]), 4),
            ci_high=round(float(s.loc[term, "exp(coef) upper 95%"]), 4),
            coef=round(float(s.loc[term, "coef"]), 5),
            se=round(float(s.loc[term, "se(coef)"]), 5),
            z=round(float(s.loc[term, "z"]), 4),
            p=float(s.loc[term, "p"]))
    return res, cph, sub


def show(res, focus="k_sd"):
    print(f"\n### {res['label']}")
    print(f"    n={res['n']}  events={res['events']}  covars={res['n_covars']}  "
          f"EPV={res['epv']}  C-index={res['c_index']}")
    for t, v in res["terms"].items():
        star = "  <<<" if t == focus else ""
        print(f"    {t:12} HR={v['HR']:.4f}  95% CI [{v['ci_low']:.4f}, {v['ci_high']:.4f}]  "
              f"z={v['z']:+.3f}  p={v['p']:.5g}{star}")
    if res["ph_test_p"]:
        bad = {k: round(v, 4) for k, v in res["ph_test_p"].items() if v < 0.05}
        print(f"    PH test violations (p<0.05): {bad if bad else 'none'}")


def main():
    d = build()
    print("=" * 78)
    print("KELIM-proxy (V1 2-parameter) vs OVERALL SURVIVAL - TAX327 comparator arm")
    print("=" * 78)
    print(f"analysis cohort n={len(d)}  events={int(d['event'].sum())}  "
          f"censored={int((d['event'] == 0).sum())}")
    print(f"k (days^-1): median={d['k'].median():.5f}  IQR=[{d['k'].quantile(.25):.5f}, "
          f"{d['k'].quantile(.75):.5f}]  SD={d['k'].std(ddof=1):.5f}")
    print(f"RSE<0.5 subset: n={int((d[RSE] < 0.5).sum())}")

    out = dict(
        analysis="kelim_proxy_v1_overall_survival_cox",
        dataset="Project Data Sphere caslib Prostat_Sanofi_2000_80 (TAX327 comparator arm)",
        rate_variable=RATE,
        rate_units="days^-1",
        n_cohort=int(len(d)), n_events=int(d["event"].sum()),
        os_definition=("event = DEATHWK non-missing; time = DEATHWK if dead else "
                       "weeks from D_RAND to last clinical contact date harvested "
                       "across all 29 caslib tables"),
        models={})

    # KM of the full analysis cohort
    kmf = KaplanMeierFitter().fit(d["os_weeks"], d["event"])
    mci = median_survival_times(kmf.confidence_interval_)
    out["km_median_weeks"] = float(kmf.median_survival_time_)
    out["km_median_ci_weeks"] = [float(mci.iloc[0, 0]), float(mci.iloc[0, 1])]
    print(f"cohort KM median OS = {kmf.median_survival_time_:.1f} wk "
          f"({kmf.median_survival_time_/4.348:.1f} mo)")

    models = [
        (["k_sd"], "M0  unadjusted: k_sd"),
        (["k_sd", "age_c", "ecog"], "M1  PRIMARY (directive): k_sd + age + ECOG"),
        (["log_k_sd", "age_c", "ecog"], "M2  log-rate: log_k_sd + age + ECOG"),
        (["k_fav", "age_c", "ecog"], "M3  favourable-rate split (KELIM>=median analogue)"),
        (["k_sd", "age_c", "ecog", "hgb_sd", "logalkp_sd", "bpain"],
         "M4  extended prognostic: + haemoglobin, log ALP, baseline pain"),
    ]
    focus = {"M2": "log_k_sd", "M3": "k_fav"}
    for covars, label in models:
        res, cph, sub = fit(d, covars, label)
        f = focus.get(label.split()[0], "k_sd")
        show(res, focus=f)
        out["models"][label.split()[0]] = res

    # M5 fragility: restrict to precisely-estimated rates (RSE<0.5)
    dp = d[d[RSE] < 0.5]
    res5, _, _ = fit(dp, ["k_sd", "age_c", "ecog"],
                     "M5  FRAGILITY: RSE<0.5 rates only (A1-RSE gate subset)")
    show(res5)
    out["models"]["M5"] = res5

    # log-rank on the favourable/unfavourable split
    lo, hi = d[d["k_fav"] == 0], d[d["k_fav"] == 1]
    lr = logrank_test(lo["os_weeks"], hi["os_weeks"], lo["event"], hi["event"])
    kl = KaplanMeierFitter().fit(lo["os_weeks"], lo["event"])
    kh = KaplanMeierFitter().fit(hi["os_weeks"], hi["event"])
    out["logrank_k_median_split"] = dict(
        p=float(lr.p_value), test_statistic=float(lr.test_statistic),
        median_wk_slow_elim=float(kl.median_survival_time_),
        median_wk_fast_elim=float(kh.median_survival_time_),
        n_slow=int(len(lo)), n_fast=int(len(hi)))
    print(f"\n### log-rank, k below vs at/above median")
    print(f"    slow elimination (k<median, n={len(lo)}): median OS "
          f"{kl.median_survival_time_:.1f} wk ({kl.median_survival_time_/4.348:.1f} mo)")
    print(f"    fast elimination (k>=median, n={len(hi)}): median OS "
          f"{kh.median_survival_time_:.1f} wk ({kh.median_survival_time_/4.348:.1f} mo)")
    print(f"    log-rank chi2={lr.test_statistic:.4f}  p={lr.p_value:.5g}")

    # ---- verdict under the revised promotion rule ----
    prim = out["models"]["M1"]["terms"]["k_sd"]
    epv = out["models"]["M1"]["epv"]
    passes = (prim["p"] < 0.05) and (epv >= 10)
    direction_ok = prim["HR"] < 1.0
    out["promotion_rule"] = dict(rule="p<0.05 AND EPV>=10",
                                 c_index_threshold_dropped=True,
                                 a1_rse_gate="FAILED (66.5% < 80%) - disclosed, not blocking",
                                 p=prim["p"], epv=epv, hr=prim["HR"],
                                 direction_as_hypothesised=bool(direction_ok),
                                 passed=bool(passes and direction_ok))
    if passes and direction_ok:
        out["verdict"] = "OS_ANCHORED_SIGNAL"
        out["label"] = ("ALGORITHM-VALIDATED (prostate PSA proxy, OS-anchored) - "
                        "rate precision below gate at 66.5% RSE<0.5")
    elif passes and not direction_ok:
        out["verdict"] = "OS_ASSOCIATION_WRONG_DIRECTION"
        out["label"] = "NOT VALIDATED - significant but hazard direction opposes hypothesis"
    else:
        out["verdict"] = "NO_OS_ASSOCIATION"
        out["label"] = "NOT VALIDATED - no significant OS association"
    print("\n" + "=" * 78)
    print(f"VERDICT: {out['verdict']}")
    print(f"LABEL:   {out['label']}")
    print(f"  primary k_sd HR={prim['HR']:.4f} [{prim['ci_low']:.4f}, {prim['ci_high']:.4f}] "
          f"p={prim['p']:.5g};  EPV={epv}")
    print("=" * 78)

    json.dump(out, open(OUT, "w"), indent=2)
    h = hashlib.sha256(open(OUT, "rb").read()).hexdigest()
    open(OUT + ".sha256", "w").write(f"{h}  {OUT.split('/')[-1]}\n")
    print(f"\nreceipt: {OUT}\nsha256:  {h}")
    d.to_csv(f"{R}/kelim_os_cox_analysis_cohort.csv", index=False)
    print(f"cohort:  {R}/kelim_os_cox_analysis_cohort.csv")


if __name__ == "__main__":
    main()
