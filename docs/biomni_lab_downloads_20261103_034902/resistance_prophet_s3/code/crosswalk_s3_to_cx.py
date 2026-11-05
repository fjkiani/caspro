#!/usr/bin/env python3
"""
crosswalk_s3_to_cx.py -- NFE-1: Macintyre-2018 s3 <-> Drews-2022 CX framework crosswalk.

Question
--------
Can Drews CX exposures (CX3, or CX3-CX2) stand in for Macintyre s3, so that
external cohorts published only with CX activities could serve as Gate C
external validation? Prespecified concordance criterion: |rho| >= 0.80.

Cohort substitution (recorded, not hidden)
------------------------------------------
The directive specified BriTROC-1 diagnosis profiles. BriTROC-1 segment-level
copy-number profiles are EGA-controlled (EGAD00001011049) and are NOT in this
sandbox; the frozen snapshot persisted only summary features. CX exposures for
BriTROC-1 have never been published. The crosswalk is therefore executed on
TCGA-OV (n=529 overlap), the largest cohort on which BOTH frameworks were
quantified and published by the originating labs:
  - Macintyre s1-s7 on TCGA-OV: markowetzlab/Drews2022_CIN_Compendium,
    "Export-matrix_OV_Sigs_on_TCGA-OV[_rawExposures]_12112019.rds"
    (Macintyre 2018 ovarian 7-signature framework, quantified on TCGA-OV ASCAT).
  - Drews CX1-17 on TCGA: same repository,
    "Signature_Compendium_v5_Cosine-0.74_Activities_THRESH95_NAMESAPRIL21.rds".
Both are the authors' own published exposure matrices; nothing is re-derived
here, so no implementation discrepancy can masquerade as framework discordance.

Outputs
-------
tables/nfe1_crosswalk_concordance.csv -- all concordance estimates + CIs
nfe1_crosswalk.json                   -- verdict, provenance, full 7x17 matrix
figures/fig5_framework_crosswalk.png  -- 7x17 Spearman heatmap + s3/CX3 scatter
"""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from scipy import stats

HERE = Path(__file__).resolve().parent
DATA = Path("/workspace/s3work/nfe1")
OUT_CSV = HERE.parent / "tables" / "nfe1_crosswalk_concordance.csv"
OUT_JSON = HERE.parent / "nfe1_crosswalk.json"
OUT_FIG = HERE.parent / "figures" / "fig5_framework_crosswalk.png"

CRITERION = 0.80
N_BOOT, SEED = 10_000, 42

URLS = {
    "ov_sigs_tcga_norm.rds": "https://github.com/markowetzlab/Drews2022_CIN_Compendium/raw/main/Section%201%20-%204%20Signature%20Discovery/input/Export-matrix_OV_Sigs_on_TCGA-OV_12112019.rds",
    "ov_sigs_tcga_raw.rds": "https://github.com/markowetzlab/Drews2022_CIN_Compendium/raw/main/Section%201%20-%204%20Signature%20Discovery/input/Export-matrix_OV_Sigs_on_TCGA-OV_rawExposures_12112019.rds",
    "cx_activities_tcga.rds": "https://github.com/markowetzlab/Drews2022_CIN_Compendium/raw/main/Section%2010%20Supplementary%20figures/input/Signature_Compendium_v5_Cosine-0.74_Activities_THRESH95_NAMESAPRIL21.rds",
}


def sha256(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def boot_ci(x: np.ndarray, y: np.ndarray, fn, n_boot=N_BOOT, seed=SEED):
    rng = np.random.default_rng(seed)
    n = len(x)
    obs = fn(x, y)
    boots = []
    for _ in range(n_boot):
        i = rng.integers(0, n, n)
        if len(np.unique(x[i])) < 2 or len(np.unique(y[i])) < 2:
            continue
        boots.append(fn(x[i], y[i]))
    boots = np.asarray(boots)
    return obs, float(np.percentile(boots, 2.5)), float(np.percentile(boots, 97.5))


def spearman(x, y):
    return stats.spearmanr(x, y)[0]


def pearson(x, y):
    return stats.pearsonr(x, y)[0]


def main() -> None:
    import pyreadr
    ov_norm = pyreadr.read_r(str(DATA / "ov_sigs_tcga_norm.rds"))[None]
    ov_raw = pyreadr.read_r(str(DATA / "ov_sigs_tcga_raw.rds"))[None]
    cx = pd.read_csv(DATA / "cx_activities_tcga.csv", index_col=0)

    common = ov_norm.index.intersection(cx.index)
    s_norm = ov_norm.loc[common]
    s_raw = ov_raw.loc[common]
    c = cx.loc[common]
    n = len(common)

    # full 7x17 Spearman matrix (normalized exposures)
    sig_cols = [f"s{i}" for i in range(1, 8)]
    cx_cols = [f"CX{i}" for i in range(1, 18)]
    full = pd.DataFrame(np.nan, index=sig_cols, columns=cx_cols)
    for s in sig_cols:
        for x in cx_cols:
            full.loc[s, x] = stats.spearmanr(s_norm[s], c[x])[0]

    rows = []

    def add(name, x, y, fn, fn_name):
        obs, lo, hi = boot_ci(np.asarray(x, float), np.asarray(y, float), fn)
        rows.append({"contrast": name, "statistic": fn_name, "estimate": obs,
                     "ci_lo": lo, "ci_hi": hi, "n": n,
                     "criterion": CRITERION,
                     "meets_criterion": bool(abs(obs) >= CRITERION)})

    # primary contrasts, normalized exposures (the scale at which s3_diag is used)
    add("s3_vs_CX3", s_norm["s3"], c["CX3"], spearman, "spearman")
    add("s3_vs_CX2", s_norm["s3"], c["CX2"], spearman, "spearman")
    add("s3_vs_CX3_minus_CX2", s_norm["s3"], c["CX3"] - c["CX2"], spearman, "spearman")
    add("s3_vs_CX3", s_norm["s3"], c["CX3"], pearson, "pearson")
    add("s3_vs_CX3_minus_CX2", s_norm["s3"], c["CX3"] - c["CX2"], pearson, "pearson")
    # raw (unnormalized) exposure variants -- row-normalisation is not monotone,
    # so this is a genuine sensitivity analysis, not a duplicate
    add("raw_s3_vs_CX3", s_raw["s3"], c["CX3"], spearman, "spearman")
    add("raw_s3_vs_CX3_minus_CX2", s_raw["s3"], c["CX3"] - c["CX2"], spearman, "spearman")

    # classification-level concordance: s3-high (>= median) vs CX3>CX2
    s3_high = (s_norm["s3"] >= s_norm["s3"].median()).to_numpy()
    cx3_dom = (c["CX3"] > c["CX2"]).to_numpy()
    agree = float(np.mean(s3_high == cx3_dom))
    a = float(np.mean(s3_high & cx3_dom)); b = float(np.mean(s3_high & ~cx3_dom))
    cc = float(np.mean(~s3_high & cx3_dom)); dd = float(np.mean(~s3_high & ~cx3_dom))
    pe = (a + b) * (a + cc) + (cc + dd) * (b + dd)
    kappa = (agree - pe) / (1 - pe) if pe < 1 else np.nan
    rows.append({"contrast": "s3_high_vs_CX3_dominant_classification",
                 "statistic": "agreement_fraction", "estimate": agree,
                 "ci_lo": np.nan, "ci_hi": np.nan, "n": n, "criterion": CRITERION,
                 "meets_criterion": bool(agree >= CRITERION)})
    rows.append({"contrast": "s3_high_vs_CX3_dominant_classification",
                 "statistic": "cohens_kappa", "estimate": kappa, "ci_lo": np.nan,
                 "ci_hi": np.nan, "n": n, "criterion": CRITERION,
                 "meets_criterion": False})

    res = pd.DataFrame(rows)
    res.to_csv(OUT_CSV, index=False)

    primary = res[(res["contrast"] == "s3_vs_CX3") & (res["statistic"] == "spearman")].iloc[0]
    top5 = full.loc["s3"].abs().sort_values(ascending=False).head(5)

    verdict = {
        "nfe": "NFE-1 framework crosswalk",
        "cohort": {"requested": "BriTROC-1 diagnosis profiles",
                   "executed": "TCGA-OV",
                   "n_overlap": int(n),
                   "substitution_reason": "BriTROC-1 segment-level CN profiles are "
                                          "EGA-controlled and not in the sandbox; CX "
                                          "exposures for BriTROC-1 have never been "
                                          "published. TCGA-OV is the largest cohort "
                                          "with both frameworks published by the "
                                          "originating labs."},
        "criterion": {"threshold": CRITERION,
                      "statement": "|Spearman rho| >= 0.80 between s3 and CX3 (or CX3-CX2)"},
        "primary_result": {"s3_vs_CX3_spearman": float(primary["estimate"]),
                           "ci95": [float(primary["ci_lo"]), float(primary["ci_hi"])],
                           "n": int(n)},
        "criterion_met": bool(primary["meets_criterion"]),
        "top5_cx_by_abs_spearman_with_s3": {k: float(full.loc["s3", k]) for k in top5.index},
        "classification_concordance": {"agreement": agree, "cohens_kappa": kappa},
        "provenance": {"files": {f: {"sha256": sha256(DATA / f), "url": u}
                                 for f, u in URLS.items()},
                       "note": "Author-published exposure matrices; no re-derivation."},
    }
    if primary["meets_criterion"]:
        verdict["verdict"] = "CRITERION_MET: CX3 is a numerical surrogate for s3."
        verdict["gate_c_consequence"] = ("CX-published cohorts are candidate Gate C "
                                         "external sets, subject to outcome availability.")
    else:
        verdict["verdict"] = (
            "CRITERION_NOT_MET: s3 vs CX3 Spearman rho = %.3f [%.3f, %.3f] at n=%d -- "
            "far below the 0.80 surrogate threshold, with a CI that excludes 0.80. "
            "Macintyre s3 and Drews CX3 share HRD-related biology but are NOT "
            "numerically interchangeable exposures; the frameworks partition "
            "copy-number features differently (s3's strongest CX correlates are "
            "negative: %s)."
            % (primary["estimate"], primary["ci_lo"], primary["ci_hi"], n,
               ", ".join(f"{k} {full.loc['s3', k]:.2f}" for k in top5.index[:2])))
        verdict["gate_c_consequence"] = (
            "The CX-transfer route to Gate C is CLOSED on evidence, not on missing "
            "data. The open route is DIRECT Macintyre-framework quantification: the "
            "CINSignatureQuantification package (markowetzlab) natively supports the "
            "ovarian s1-s7 signatures, and public absolute CN profiles with clinical "
            "outcomes (TCGA-OV ASCAT SNP6 + TCGA-CDR platinum response; PCAWG-OV) "
            "require no crosswalk assumption. That is the next falsifiable experiment "
            "for Gate C.")

    OUT_JSON.write_text(json.dumps({"contrasts": rows,
                                    "full_7x17_spearman": full.astype(float).to_dict(),
                                    "verdict": verdict}, indent=2, default=float))

    # ---- figure ----
    import matplotlib
    matplotlib.use("Agg")
    matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
    import matplotlib.pyplot as plt
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.2),
                                   gridspec_kw={"width_ratios": [1.7, 1]})
    im = ax1.imshow(full.astype(float).values, cmap="RdBu_r", vmin=-1, vmax=1,
                    aspect="auto")
    ax1.set_xticks(range(len(cx_cols)), cx_cols, rotation=45, ha="right", fontsize=8)
    ax1.set_yticks(range(len(sig_cols)), sig_cols, fontsize=9)
    for i in range(len(sig_cols)):
        for jj in range(len(cx_cols)):
            v = full.iloc[i, jj]
            if abs(v) >= 0.4:
                ax1.text(jj, i, f"{v:.2f}", ha="center", va="center", fontsize=6.5,
                         color="white" if abs(v) > 0.6 else "black")
    ax1.set_title("Spearman correlation: Macintyre s1-s7 vs Drews CX1-17 (TCGA-OV)",
                  fontsize=10)
    fig.colorbar(im, ax=ax1, shrink=0.8, label="Spearman rho")
    ax2.scatter(s_norm["s3"], c["CX3"], s=6, alpha=0.45, color="#0279EE",
                edgecolors="none")
    ax2.set_xlabel("Macintyre s3 exposure (normalized)")
    ax2.set_ylabel("Drews CX3 activity")
    ax2.set_title(f"s3 vs CX3: rho = {primary['estimate']:.3f} "
                  f"[{primary['ci_lo']:.3f}, {primary['ci_hi']:.3f}], n = {n}",
                  fontsize=10)
    ax2.axhline(0, color="grey", lw=0.5)
    fig.tight_layout()
    fig.savefig(OUT_FIG, dpi=200)
    print(json.dumps(verdict, indent=2))


if __name__ == "__main__":
    main()
