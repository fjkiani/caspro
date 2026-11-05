#!/usr/bin/env python3
"""Finalise the KELIM-proxy overall-survival validation: append the secondary /
robustness analyses to the receipt, set the honest verdict, and draw the
2-panel figure (KM by elimination-rate split + specification forest)."""
import hashlib
import json
import warnings

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from lifelines import CoxPHFitter, KaplanMeierFitter
from lifelines.statistics import logrank_test, multivariate_logrank_test
from scipy import stats

warnings.filterwarnings("ignore")
matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
matplotlib.rcParams["svg.fonttype"] = "none"

R = "/mnt/results/resistance_remediation/receipts"
F = "/mnt/results/resistance_remediation/figures"
REC = f"{R}/kelim_os_cox.json"
BLUE, GREEN, ORANGE, SAND = "#0279EE", "#75A025", "#FF9400", "#ECE9E2"

d = pd.read_csv(f"{R}/kelim_os_cox_analysis_cohort.csv")
RSEc = "V1_mono2_plateau0_OLS__rse"
# derived rate scalings (recomputed here so the cohort CSV stays minimal)
d["k_sd"] = (d["k"] - d["k"].mean()) / d["k"].std(ddof=1)
d["log_k"] = np.log(d["k"])
d["log_k_sd"] = (d["log_k"] - d["log_k"].mean()) / d["log_k"].std(ddof=1)
if "k_pct" not in d:
    d["k_pct"] = stats.rankdata(d["k"]) / len(d)
d["k_z"] = (d["k_pct"] - d["k_pct"].mean()) / d["k_pct"].std(ddof=1)
out = json.load(open(REC))


def cox(df, term, covs, tcol="os_weeks"):
    c = CoxPHFitter().fit(df[[tcol, "event"] + covs], tcol, "event")
    r = c.summary.loc[term]
    return dict(HR=float(r["exp(coef)"]), lo=float(r["exp(coef) lower 95%"]),
                hi=float(r["exp(coef) upper 95%"]), p=float(r["p"]),
                c_index=float(c.concordance_index_), n=int(len(df)),
                events=int(df["event"].sum()))


# ---------------- secondary + robustness ----------------
sec = {}
sec["quartile_medians_wk"] = {}
for q in [1, 2, 3, 4]:
    s = d[d["kq"] == q]
    km = KaplanMeierFitter().fit(s["os_weeks"], s["event"])
    sec["quartile_medians_wk"][f"Q{q}"] = dict(
        n=int(len(s)), events=int(s["event"].sum()),
        k_median=round(float(s["k"].median()), 6),
        median_os_wk=float(km.median_survival_time_))
mlr = multivariate_logrank_test(d["os_weeks"], d["kq"], d["event"])
sec["quartile_logrank_p"] = float(mlr.p_value)
sec["quartile_ordinal_trend"] = cox(d, "kq", ["kq", "age_c", "ecog"])

sec["rank_normalised_k"] = cox(d, "k_z", ["k_z", "age_c", "ecog"])

dl = d[d["os_weeks"] > 15].copy()
dl["os_lm"] = dl["os_weeks"] - 15.0
sec["landmark_wk15"] = {k: cox(dl, k, [k, "age_c", "ecog"], tcol="os_lm")
                        for k in ["k_sd", "k_fav"]}
sec["landmark_wk15"]["n_excluded"] = int(len(d) - len(dl))

cut = []
for pct in range(20, 81, 5):
    thr = float(d["k"].quantile(pct / 100))
    g = (d["k"] >= thr).astype(int)
    if g.sum() < 25 or (1 - g).sum() < 25:
        continue
    df2 = pd.DataFrame({"t": d["os_weeks"], "e": d["event"], "g": g,
                        "a": d["age_c"], "p": d["ecog"]})
    c = CoxPHFitter().fit(df2, "t", "e")
    r = c.summary.loc["g"]
    cut.append(dict(percentile=pct, threshold=round(thr, 6),
                    HR=round(float(r["exp(coef)"]), 4), p=float(r["p"])))
sec["cutpoint_stability"] = dict(
    scanned=cut, n_scanned=len(cut),
    n_significant=int(sum(1 for c in cut if c["p"] < 0.05)),
    significant_window="45th-60th percentile (contiguous)")
sec["bonferroni_across_6_specs"] = round(min(1.0, out["models"]["M3"]["terms"]["k_fav"]["p"] * 6), 4)

ev = int(d["event"].sum())
za, zb = stats.norm.ppf(0.975), stats.norm.ppf(0.80)
sec["power"] = dict(
    events=ev,
    detectable_HR_binary_50_50_at_80pct_power=round(float(np.exp(-np.sqrt((za + zb) ** 2 / (ev * 0.25)))), 3),
    detectable_HR_per_SD_at_80pct_power=round(float(np.exp(-(za + zb) / np.sqrt(ev))), 3),
    note="Observed primary per-SD CI [0.744,1.389] excludes HR<=0.72; "
         "HRs between ~0.75 and 1.0 remain compatible. Underpowered null.")

sp = stats.spearmanr(d["k"], d["psars"], nan_policy="omit")
sec["psars_anchor_circularity"] = dict(
    spearman_rho=round(float(sp.statistic), 4), p=float(sp.pvalue),
    note="PSARS is defined as a >=50% confirmed PSA decline; k is the rate of PSA "
         "decline fitted on the same values over the same 0-15 week window. The "
         "PSA-response anchor is therefore within-modality and not independent of "
         "the estimator. Overall survival is the independent anchor, and it is null.")
out["secondary_and_robustness"] = sec

# ---------------- honest verdict ----------------
prim = out["models"]["M1"]["terms"]["k_sd"]
out["verdict"] = "OS_ANCHOR_NOT_VALIDATED_UNDERPOWERED_NULL"
out["label"] = ("NOT PROMOTED. Pre-specified multivariate Cox (k + age + ECOG) on overall "
                "survival is null: HR 1.017 per SD [0.744, 1.389], p=0.917. The promotion "
                "condition (p<0.05 on the primary model) is NOT met.")
out["interpretation"] = [
    "The raw per-SD specification is unreliable on its own: k has skewness 7.28 and an SD "
    "(0.0165) larger than its median (0.00995), so a one-SD contrast is dominated by a few "
    "extreme values. The null must be read from the better-specified forms, not from M1 alone.",
    "Better-specified continuous forms all point the hypothesised way but stay above 0.05: "
    "log-rate HR 0.870 (p=0.207), rank-normalised HR 0.825 (p=0.096), ordinal quartile trend "
    "HR 0.846 per quartile (p=0.105).",
    "Only the median dichotomisation reaches significance (HR 0.595 [0.377,0.940], p=0.026; "
    "log-rank p=0.012; 16.6 vs 20.9 months). This is post-hoc, survives only a narrow "
    "contiguous cutpoint window (4 of 13 cutpoints scanned, 45th-60th percentile), and does "
    "not survive Bonferroni correction across the six specifications run (p_adj=0.156).",
    "Immortal-time bias is excluded as an explanation: a week-15 landmark analysis removes "
    "only 1 patient and leaves every estimate essentially unchanged.",
    "The cohort is a 15-week survivor population (KM median OS 19.8 months vs 14.9 months "
    "arm-wide), because a rate estimate requires >=3 PSA values in the first 15 weeks. This "
    "limits generalisability, though it biases all comparison groups equally.",
    "This is an underpowered null, not a demonstration of absence: 78 events give 80% power "
    "only down to HR 0.53 (binary) or 0.73 (per SD). A true modest effect of HR ~0.80-0.85 "
    "would very likely have been missed.",
    "The earlier PSA-response (PSARS) anchor must be downgraded: PSARS is defined as a >=50% "
    "PSA decline and k is the PSA decline rate over the same window, so that anchor is "
    "within-modality and cannot establish clinical validity on its own.",
]
out["consequences"] = dict(
    kelim_proxy_label="PROXY_TECHNICALLY_FUNCTIONAL_CLINICALLY_UNVALIDATED",
    prior_label_superseded="PROXY_PARTIALLY_VALIDATED (PSA-response anchor)",
    ovarian_ca125_kelim="UNCALIBRATED - unchanged. A prostate PSA analysis cannot supply "
                        "ovarian CA-125 constants, and this one is null in any case.",
    a1_rse_gate="FAILED (66.5% < 80%) - unchanged",
    promotion_to_algorithm_validated="DENIED")

json.dump(out, open(REC, "w"), indent=2)
h = hashlib.sha256(open(REC, "rb").read()).hexdigest()
open(REC + ".sha256", "w").write(f"{h}  kelim_os_cox.json\n")
print("receipt updated:", REC)
print("sha256:", h)
print("VERDICT:", out["verdict"])

# ---------------- figure ----------------
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13.2, 5.6))

lo = d[d["k_fav"] == 0]
hi = d[d["k_fav"] == 1]
kl = KaplanMeierFitter().fit(lo["os_weeks"], lo["event"], label="Slow elimination (k < median)")
kh = KaplanMeierFitter().fit(hi["os_weeks"], hi["event"], label="Fast elimination (k \u2265 median)")
kl.plot_survival_function(ax=ax1, color=ORANGE, ci_alpha=0.15, linewidth=2)
kh.plot_survival_function(ax=ax1, color=BLUE, ci_alpha=0.15, linewidth=2)
lr = logrank_test(lo["os_weeks"], hi["os_weeks"], lo["event"], hi["event"])
ax1.set_xlabel("Weeks from randomisation")
ax1.set_ylabel("Overall survival probability")
ax1.set_xlim(0, 150)
ax1.set_ylim(0, 1.02)
ax1.axhline(0.5, color="0.75", lw=0.8, ls=":")
ax1.legend(loc="upper right", frameon=False, fontsize=9)
ax1.text(0.03, 0.06, f"log-rank p = {lr.p_value:.3f}", transform=ax1.transAxes, fontsize=9)
ax1.set_title("A  Overall survival by PSA elimination rate", loc="left", fontsize=11, fontweight="bold")
for s in ["top", "right"]:
    ax1.spines[s].set_visible(False)
ticks = [0, 26, 52, 78, 104, 130]
ax1.set_xticks(ticks)
for i, (grp, col) in enumerate([(lo, ORANGE), (hi, BLUE)]):
    nr = [int(((grp["os_weeks"] >= t)).sum()) for t in ticks]
    for t, n in zip(ticks, nr):
        ax1.text(t, -0.135 - 0.075 * i, str(n), ha="center", va="top", fontsize=8, color=col)
ax1.text(-0.5, -0.115, "At risk", ha="left", va="top", fontsize=8, color="0.35")

rows = [
    ("Raw rate, per SD  (PRIMARY)", out["models"]["M1"]["terms"]["k_sd"]["HR"],
     out["models"]["M1"]["terms"]["k_sd"]["ci_low"], out["models"]["M1"]["terms"]["k_sd"]["ci_high"],
     out["models"]["M1"]["terms"]["k_sd"]["p"], True),
    ("log rate, per SD", out["models"]["M2"]["terms"]["log_k_sd"]["HR"],
     out["models"]["M2"]["terms"]["log_k_sd"]["ci_low"], out["models"]["M2"]["terms"]["log_k_sd"]["ci_high"],
     out["models"]["M2"]["terms"]["log_k_sd"]["p"], False),
    ("Rank-normalised, per SD", sec["rank_normalised_k"]["HR"], sec["rank_normalised_k"]["lo"],
     sec["rank_normalised_k"]["hi"], sec["rank_normalised_k"]["p"], False),
    ("Quartile trend, per quartile", sec["quartile_ordinal_trend"]["HR"],
     sec["quartile_ordinal_trend"]["lo"], sec["quartile_ordinal_trend"]["hi"],
     sec["quartile_ordinal_trend"]["p"], False),
    ("Median split (post-hoc)", out["models"]["M3"]["terms"]["k_fav"]["HR"],
     out["models"]["M3"]["terms"]["k_fav"]["ci_low"], out["models"]["M3"]["terms"]["k_fav"]["ci_high"],
     out["models"]["M3"]["terms"]["k_fav"]["p"], False),
    ("Median split, wk-15 landmark", sec["landmark_wk15"]["k_fav"]["HR"],
     sec["landmark_wk15"]["k_fav"]["lo"], sec["landmark_wk15"]["k_fav"]["hi"],
     sec["landmark_wk15"]["k_fav"]["p"], False),
    ("Per SD, RSE<0.5 subset", out["models"]["M5"]["terms"]["k_sd"]["HR"],
     out["models"]["M5"]["terms"]["k_sd"]["ci_low"], out["models"]["M5"]["terms"]["k_sd"]["ci_high"],
     out["models"]["M5"]["terms"]["k_sd"]["p"], False),
]
ys = np.arange(len(rows))[::-1]
for y, (lab, hr, l, hgh, p, prime) in zip(ys, rows):
    col = BLUE if p < 0.05 else "0.35"
    ax2.plot([l, hgh], [y, y], color=col, lw=1.6, solid_capstyle="butt")
    ax2.plot([l, l], [y - .12, y + .12], color=col, lw=1.6)
    ax2.plot([hgh, hgh], [y - .12, y + .12], color=col, lw=1.6)
    ax2.plot(hr, y, "o", color=col, ms=7 if prime else 5.5,
             mfc=col if not prime else "white", mew=1.8, zorder=5)
    ax2.text(3.5, y, f"{hr:.2f} [{l:.2f}, {hgh:.2f}]   p={p:.3f}",
             va="center", ha="left", fontsize=8.5, color=col)
ax2.axvline(1.0, color="0.3", lw=1.0)
ax2.axvline(sec["power"]["detectable_HR_per_SD_at_80pct_power"], color=GREEN, lw=1.2, ls="--")
ax2.text(sec["power"]["detectable_HR_per_SD_at_80pct_power"] * 0.94, len(rows) - 0.35,
         "80% power limit\n(HR 0.73/SD)", color=GREEN, fontsize=8, va="top", ha="right")
ax2.set_yticks(ys)
ax2.set_yticklabels([r[0] for r in rows], fontsize=9)
ax2.set_xscale("log")
ax2.set_xlim(0.30, 12.0)
ax2.set_xticks([0.4, 0.6, 0.8, 1.0, 1.5, 2.0])
ax2.set_xticklabels(["0.4", "0.6", "0.8", "1.0", "1.5", "2.0"])
ax2.set_xlabel("Hazard ratio for death (95% CI)")
ax2.set_ylim(-0.7, len(rows) - 0.15)
ax2.set_title("B  Effect of elimination rate across model specifications",
              loc="left", fontsize=11, fontweight="bold")
for s in ["top", "right", "left"]:
    ax2.spines[s].set_visible(False)
ax2.tick_params(axis="y", length=0)

fig.tight_layout()
fig.subplots_adjust(bottom=0.20)
for ext in ["png", "svg"]:
    fig.savefig(f"{F}/kelim_os_cox_validation.{ext}", dpi=200, bbox_inches="tight")
print("figure:", f"{F}/kelim_os_cox_validation.png")
