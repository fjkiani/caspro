#!/usr/bin/env python3
"""W5 figures for the Resistance Prophet / S3 audit. PNG output (user preference)."""
import json

import matplotlib
matplotlib.use("Agg")
matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.metrics import roc_curve, roc_auc_score

OUT = "/mnt/results/resistance_prophet_s3"
FIG = f"{OUT}/figures"
CB = {"sens": "#0279EE", "res": "#FF9400", "grey": "#6E6E6E", "k": "#000000",
      "g": "#75A025", "p": "#FD9BED", "y": "#E9ED4C"}
w3 = json.load(open(f"{OUT}/w3_analysis.json"))
master = pd.read_csv(f"{OUT}/tables/rebuilt_patient_master.csv")
oof = pd.read_csv(f"{OUT}/oof_predictions.csv")

d98 = master[master["s3_diag"].notna() & master["resistant"].notna()].copy()
d98["y"] = d98["resistant"].astype(int)
d67 = oof.copy()


# ----------------------------------------------------------------- figure 1
def fig1():
    fig, ax = plt.subplots(1, 2, figsize=(10.2, 4.4))
    a = ax[0]
    groups = [("Platinum sensitive", d98.loc[d98.y == 0, "s3_diag"].values, CB["sens"]),
              ("Platinum resistant", d98.loc[d98.y == 1, "s3_diag"].values, CB["res"])]
    bp = a.boxplot([g[1] for g in groups], positions=[0, 1], widths=0.5,
                   showfliers=False, patch_artist=True, medianprops=dict(color=CB["k"], lw=1.6))
    for patch, g in zip(bp["boxes"], groups):
        patch.set_facecolor(g[2]); patch.set_alpha(0.30); patch.set_edgecolor(CB["k"])
    rng = np.random.default_rng(7)
    for i, (lab, v, c) in enumerate(groups):
        a.scatter(i + rng.uniform(-0.16, 0.16, len(v)), v, s=26, color=c,
                  edgecolor=CB["k"], linewidth=0.4, alpha=0.85, zorder=3)
    a.axhline(0.10, color=CB["grey"], ls="--", lw=1.2)
    a.text(1.48, 0.104, "candidate cut 0.10", ha="right", va="bottom",
           fontsize=8.5, color=CB["grey"])
    a.set_xticks([0, 1])
    a.set_xticklabels([f"Sensitive\nn={len(groups[0][1])}", f"Resistant\nn={len(groups[1][1])}"])
    a.set_ylabel("s3 exposure at diagnosis")
    a.set_title("A  s3 exposure by platinum status (n=98)", loc="left", fontsize=11)
    a.spines[["top", "right"]].set_visible(False)

    b = ax[1]
    for lab, dd, ycol, xcol, c, ls in [
            ("Full analysis set, n=98, 20 events", d98, "y", "s3_diag", CB["sens"], "-"),
            ("Covariate-complete subset, n=67, 9 events", d67, "y", "s3_diag", CB["res"], "--")]:
        y = dd[ycol].values.astype(int)
        x = -dd[xcol].values.astype(float)          # protective orientation
        fpr, tpr, _ = roc_curve(y, x)
        auc = roc_auc_score(y, x)
        b.plot(fpr, tpr, color=c, lw=2.0, ls=ls, label=f"{lab}   AUROC {auc:.3f}")
    b.plot([0, 1], [0, 1], color=CB["grey"], lw=1.0, ls=":")
    b.set_xlabel("1 - specificity"); b.set_ylabel("Sensitivity")
    b.set_title("B  ROC, low s3 as the resistance axis", loc="left", fontsize=11)
    b.legend(loc="lower right", frameon=False, fontsize=8.5)
    b.spines[["top", "right"]].set_visible(False)
    fig.tight_layout(); fig.savefig(f"{FIG}/fig1_s3_discrimination.png", dpi=200); plt.close(fig)


# ----------------------------------------------------------------- figure 2
def fig2():
    pb = w3["part_b_monotone_invariance"]
    cal = w3["part_b_frozen_scorer_calibration"]
    fig, ax = plt.subplots(1, 2, figsize=(10.2, 4.4))
    a = ax[0]
    rows = [
        ("Bootstrap CI\n(patient resampling)", pb["honest_bootstrap_ci_protective"][0],
         pb["honest_bootstrap_ci_protective"][1], 1 - pb["raw_auroc_s3_vs_resistance"], CB["sens"]),
        ("Reproduced fold band\n(5x200 resamples, same 67)", pb["fold_band"]["pctile_2p5"],
         pb["fold_band"]["pctile_97p5"], pb["cv_auroc_mean_reproduced"], CB["res"]),
        ("Published band in\ns3_diag_cv_validation.json", pb["documented_cv_pctile"][0],
         pb["documented_cv_pctile"][1], pb["documented_cv_auroc_mean"], CB["grey"]),
    ]
    for i, (lab, lo, hi, pt, c) in enumerate(rows):
        a.plot([lo, hi], [i, i], color=c, lw=3.5, solid_capstyle="butt")
        a.plot([pt], [i], "o", color=CB["k"], ms=6, zorder=4)
        a.text((lo + hi) / 2, i + 0.22, f"width {hi - lo:.4f}", ha="center",
               va="bottom", fontsize=8.5, color=CB["k"])
    a.set_yticks(range(len(rows))); a.set_yticklabels([r[0] for r in rows], fontsize=9)
    a.set_xlabel("AUROC (protective orientation)")
    a.set_xlim(0.775, 0.985); a.set_ylim(-0.6, len(rows) - 0.15)
    a.tick_params(axis="y", length=0)
    a.set_title("A  Interval width: sampling vs fold dispersion", loc="left", fontsize=11)
    a.spines[["top", "right", "left"]].set_visible(False)

    b = ax[1]
    p = d67["oof_M2c_frozen_s3_scorer"].values.astype(float)
    y = d67["y"].values.astype(int)
    qs = np.quantile(p, [0, 1 / 3, 2 / 3, 1.0]); qs[-1] += 1e-9
    xs, ys, ns = [], [], []
    for lo, hi in zip(qs[:-1], qs[1:]):
        m = (p >= lo) & (p < hi)
        if m.sum() == 0:
            continue
        xs.append(p[m].mean()); ys.append(y[m].mean()); ns.append(int(m.sum()))
    b.plot([0, 1], [0, 1], color=CB["grey"], ls=":", lw=1.0, label="perfect calibration")
    b.plot(xs, ys, "o-", color=CB["sens"], lw=1.8, ms=8,
           label=f"observed, tertiles of predicted (n={ns})")
    b.axhline(cal["prevalence"], color=CB["res"], ls="--", lw=1.3,
              label=f"cohort prevalence {cal['prevalence']:.3f}")
    for x0, y0, n0 in zip(xs, ys, ns):
        b.annotate(f"n={n0}", (x0, y0), textcoords="offset points", xytext=(7, -11), fontsize=8.5)
    b.set_xlabel("Predicted probability of platinum resistance")
    b.set_ylabel("Observed event fraction")
    b.set_xlim(-0.02, 1.0); b.set_ylim(-0.02, 1.0)
    b.set_title(f"B  Frozen scorer calibration, n=67, 9 events\n"
                f"slope {cal['calibration_slope']:.2f} "
                f"[{cal['slope_ci_lo']:.2f}, {cal['slope_ci_hi']:.2f}]; "
                f"Brier {cal['brier']:.4f} vs {cal['brier_prevalence_only']:.4f} prevalence-only",
                loc="left", fontsize=10)
    b.legend(loc="upper left", frameon=False, fontsize=8.5)
    b.spines[["top", "right"]].set_visible(False)
    fig.tight_layout(); fig.savefig(f"{FIG}/fig2_uncertainty_and_calibration.png", dpi=200); plt.close(fig)


# ----------------------------------------------------------------- figure 3
def fig3():
    dl = pd.read_csv(f"{OUT}/tables/incremental_value_deltas.csv")
    order = [("M4a_hrd_only", "M4b_hrd_plus_s3", "BRCA/HR mut  ->  + s3"),
             ("M4a_hrd_only", "M1_s3_only", "BRCA/HR mut  ->  s3 alone"),
             ("M2b_s7_continuous", "M3b_s7_plus_s3", "s7 exposure  ->  + s3"),
             ("M0_clinical", "M3a_clinical_plus_s3", "clinical  ->  + s3"),
             ("M0_clinical", "M1_s3_only", "clinical  ->  s3 alone"),
             ("M2a_shipped_s7_rule", "M1_s3_only", "shipped s7>=0.25 rule  ->  s3 alone"),
             ("M2c_frozen_s3_scorer", "M1_s3_only", "frozen s3 scorer  ->  s3 refit in fold")]
    fig, ax = plt.subplots(1, 2, figsize=(11.4, 4.6), sharey=True)
    for k, (metric, a) in enumerate(zip(["auroc", "auprc"], ax)):
        for i, (b0, b1, lab) in enumerate(order):
            r = dl[(dl.baseline == b0) & (dl.augmented == b1) & (dl.metric == metric)].iloc[0]
            c = CB["sens"] if r["ci_excludes_zero"] else CB["grey"]
            a.plot([r["delta_ci_lo"], r["delta_ci_hi"]], [i, i], color=c, lw=3.0,
                   solid_capstyle="butt")
            a.plot([r["delta"]], [i], "o", color=c, ms=7,
                   markeredgecolor=CB["k"], markeredgewidth=0.5)
            a.text(r["delta_ci_hi"] + 0.02, i, f"{r['delta']:+.3f}", va="center", fontsize=8.5)
        a.axvline(0, color=CB["k"], lw=1.0)
        mlab = "AUROC" if metric == "auroc" else "AUPRC"
        a.set_xlabel("paired-bootstrap delta " + mlab)
        a.set_xlim(-0.25, 1.16); a.tick_params(axis="y", length=0)
        a.set_title(f"{'A' if k == 0 else 'B'}  {metric.upper()}", loc="left", fontsize=11)
        a.spines[["top", "right", "left"]].set_visible(False)
    ax[0].set_yticks(range(len(order)))
    ax[0].set_yticklabels([o[2] for o in order], fontsize=9)
    ax[0].set_ylim(-0.6, len(order) - 0.4)
    fig.tight_layout(); fig.savefig(f"{FIG}/fig3_incremental_value.png", dpi=200); plt.close(fig)


# ----------------------------------------------------------------- figure 4
def fig4():
    st = pd.read_csv(f"{OUT}/threshold_stability.csv")
    env = w3["part_c_thresholds"]["stability_envelope"]
    fig, ax = plt.subplots(1, 2, figsize=(10.6, 4.4))
    a = ax[0]
    a.hist(st["in_fold_cutpoint"].values, bins=14, color=CB["sens"], alpha=0.85,
           edgecolor=CB["k"], linewidth=0.5)
    lo, hi = env["cutpoint_bootstrap_ci"]
    a.axvspan(lo, hi, color=CB["y"], alpha=0.35, label=f"bootstrap CI [{lo:.4f}, {hi:.4f}]")
    a.axvline(env["cutpoint_median"], color=CB["k"], lw=1.6,
              label=f"fold median {env['cutpoint_median']:.4f}")
    a.axvline(0.10, color=CB["res"], lw=2.0, ls="--", label="candidate 0.10")
    a.set_xlabel("In-fold Youden-optimal s3 cutpoint")
    a.set_ylabel("Training folds (of 100)")
    a.set_ylim(0, 52)
    a.set_title("A  Fold-optimal cutpoint distribution", loc="left", fontsize=11)
    a.legend(loc="upper right", frameon=False, fontsize=8.5)
    a.spines[["top", "right"]].set_visible(False)

    b = ax[1]
    dc = pd.read_csv(f"{OUT}/tables/decision_curve_net_benefit.csv")
    for mdl, c, ls in [("M1_s3_only", CB["sens"], "-"),
                       ("M3a_clinical_plus_s3", CB["g"], "-"),
                       ("M0_clinical", CB["res"], "--")]:
        s = dc[dc.model == mdl]
        if len(s):
            b.plot(s.threshold_probability, s.net_benefit_model, color=c, lw=1.9, ls=ls, label=mdl)
    s = dc[dc.model == dc.model.iloc[0]]
    b.plot(s.threshold_probability, s.net_benefit_treat_all, color=CB["grey"], lw=1.3,
           ls=":", label="flag all")
    b.axhline(0, color=CB["k"], lw=1.0, label="flag none")
    b.set_xlabel("Threshold probability")
    b.set_ylabel("Net benefit")
    b.set_title("B  Decision curve, out-of-fold predictions (n=67)", loc="left", fontsize=11)
    b.legend(loc="lower right", frameon=False, fontsize=8.0, ncol=2)
    b.spines[["top", "right"]].set_visible(False)
    fig.tight_layout(); fig.savefig(f"{FIG}/fig4_threshold_and_net_benefit.png", dpi=200); plt.close(fig)


if __name__ == "__main__":
    import os
    os.makedirs(FIG, exist_ok=True)
    fig1(); fig2(); fig3(); fig4()
    for f in sorted(os.listdir(FIG)):
        print(f, os.path.getsize(os.path.join(FIG, f)), "bytes")
