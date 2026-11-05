"""
Reproduce PLCO CA-125 kinetics validation.

Runs the log-linear slope + velocity estimator over the PLCO ovarian screening
cohort and validates against incident ovarian cancer (ovar_cancer) with AUROC +
bootstrap 95% CIs and a Mann-Whitney rank test.

Method faithful to the published PLCO/ROCA-family CA-125 kinetics approach:
  - Xu JL et al. 2011, Gynecologic Oncology (CA-125 velocity in PLCO)
  - Blyuss O et al. 2018 CCR; Menon U et al. 2015 JCO (ROCA); Skates 2012.

Usage:
  python3 reproduce_plco_kinetics.py --csv /path/to/ovar_data_t20241011.csv \
      --out /path/to/plco_kinetics_validation.json

Requires: pandas, numpy, scikit-learn, scipy.
This script writes NOTHING to Supabase. Deployment SQL is generated separately.
"""
from __future__ import annotations
import argparse, json, sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from kinetics.plco_ca125_kinetics import compute_ca125_kinetics, points_from_plco_row


def auc_ci(y, score, n_boot=2000, seed=7):
    from sklearn.metrics import roc_auc_score
    score = np.asarray(score, float)
    m = np.isfinite(score)
    y2, s2 = np.asarray(y)[m], score[m]
    auc = roc_auc_score(y2, s2)
    rng = np.random.default_rng(seed)
    pos = np.where(y2 == 1)[0]; neg = np.where(y2 == 0)[0]
    boots = []
    for _ in range(n_boot):
        bi = np.concatenate([rng.choice(pos, len(pos), replace=True),
                             rng.choice(neg, len(neg), replace=True)])
        try:
            boots.append(roc_auc_score(y2[bi], s2[bi]))
        except ValueError:
            pass
    lo, hi = np.percentile(boots, [2.5, 97.5])
    return float(auc), float(lo), float(hi), int(len(s2))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--seed", type=int, default=7)
    args = ap.parse_args()

    cols = ["plco_id", "ovar_cancer", "ovar_cancer_diagdays"]
    for i in range(6):
        cols += [f"ca125_level{i}", f"ca125_days{i}", f"ca125_result{i}"]
    df = pd.read_csv(args.csv, usecols=lambda c: c in cols, low_memory=False)

    recs = []
    for row in df.to_dict("records"):
        pts = points_from_plco_row(row)
        diag = row.get("ovar_cancer_diagdays")
        diag = float(diag) if (diag is not None and pd.notna(diag)) else None
        is_case = int(row.get("ovar_cancer", 0)) == 1
        res = compute_ca125_kinetics(pts, diagnosis_day=diag if is_case else None)
        recs.append({"plco_id": row["plco_id"],
                     "ovar_cancer": int(row.get("ovar_cancer", 0)),
                     "n_tp": res.n_timepoints,
                     "log_slope_per_year": res.log_slope_per_year,
                     "velocity": res.velocity,
                     "baseline": res.baseline_level,
                     "peak": res.peak_level})
    K = pd.DataFrame(recs)
    elig = K[(K["n_tp"] >= 2) & K["log_slope_per_year"].notna()].copy()
    y = elig["ovar_cancer"].values.astype(int)

    from scipy import stats
    feats = {}
    for feat in ["log_slope_per_year", "velocity", "peak", "baseline"]:
        auc, lo, hi, n = auc_ci(y, elig[feat].values, seed=args.seed)
        a = elig.loc[elig.ovar_cancer == 1, feat].dropna()
        b = elig.loc[elig.ovar_cancer == 0, feat].dropna()
        _, p = stats.mannwhitneyu(a, b, alternative="greater")
        feats[feat] = {"auroc": round(auc, 4), "ci95": [round(lo, 4), round(hi, 4)],
                       "n": n, "mwu_p": float(f"{p:.3e}")}

    out = {"component": "plco_ca125_kinetics", "tier": "externally_validated_RUO",
           "n_slope_eligible": int(len(elig)),
           "n_cases": int((elig.ovar_cancer == 1).sum()),
           "n_controls": int((elig.ovar_cancer == 0).sum()),
           "features": feats, "seed": args.seed,
           "generated_at": datetime.now(timezone.utc).isoformat()}
    Path(args.out).write_text(json.dumps(out, indent=2))
    print(json.dumps(feats, indent=2))
    print("wrote", args.out)


if __name__ == "__main__":
    main()
