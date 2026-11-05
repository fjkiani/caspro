#!/usr/bin/env python3
"""Multicohort OS validation for the prostate PSA-rate (KELIM-proxy).

Primary analysis
----------------
* V1 rate: two-parameter first-order decline, plateau fixed at zero, OLS on
  log(PSA), 0--15 weeks, at least three distinct time points.
* True inverse-normal midrank transform within trial.
* Week-15 landmark Cox model: z_rank(k) + age_ge65 + ECOG, with trial-specific
  baseline hazards when more than one trial is pooled.

The script never assumes access to unreleased randomized arms. CAS credentials,
when schema enumeration is requested, are accepted only through CAS_URL,
CAS_USER, and CAS_PASSWORD environment variables.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
from pathlib import Path
from typing import Any, Iterable

import numpy as np
import pandas as pd
from scipy import stats

RATE_NAME = "V1_mono2_plateau0_OLS__k"
FLOOR = 0.01
PRIMARY_TERMS = ["z_rank", "age_ge65", "ecog"]


def read_table(path: str | Path) -> pd.DataFrame:
    path = Path(path)
    if path.suffix.lower() == ".parquet":
        return pd.read_parquet(path)
    return pd.read_csv(path, low_memory=False)


def fit_v1_rates(
    long_df: pd.DataFrame,
    patient_col: str,
    value_col: str,
    time_col: str,
    *,
    time_scale_to_days: float = 1.0,
    min_observations: int = 3,
    window_start_days: float = 0.0,
    window_end_days: float = 105.0,
    floor: float = FLOOR,
) -> pd.DataFrame:
    """Fit the frozen V1 log-linear elimination rate by patient.

    Duplicate times are collapsed with the median marker value. Non-declining
    trajectories have no positive elimination rate and are marked ineligible.
    """
    d = long_df[[patient_col, value_col, time_col]].copy()
    d["value"] = pd.to_numeric(d[value_col], errors="coerce")
    d["time_days"] = pd.to_numeric(d[time_col], errors="coerce") * time_scale_to_days
    d = d.dropna(subset=[patient_col, "value", "time_days"])
    d = d[d["time_days"].between(window_start_days, window_end_days)]
    d = (d.groupby([patient_col, "time_days"], as_index=False, dropna=False)["value"]
           .median().sort_values([patient_col, "time_days"]))
    rows: list[dict[str, Any]] = []
    for patient, g in d.groupby(patient_col, sort=False):
        n = int(len(g))
        rec: dict[str, Any] = {"patient_id": str(patient), "n_psa": n,
                               "eligible_rate": False, "k": np.nan,
                               "rse": np.nan, "r2": np.nan}
        if n >= min_observations and g["time_days"].nunique() >= min_observations:
            t = g["time_days"].to_numpy(float)
            y = np.log(np.clip(g["value"].to_numpy(float), floor, None))
            lr = stats.linregress(t, y)
            k = -float(lr.slope)
            if np.isfinite(k) and k > 0:
                yhat = float(lr.intercept) + float(lr.slope) * t
                ss_res = float(np.sum((y - yhat) ** 2))
                ss_tot = float(np.sum((y - y.mean()) ** 2))
                rec.update(eligible_rate=True, k=k,
                           rse=(float(lr.stderr) / k if np.isfinite(lr.stderr) else np.nan),
                           r2=(1.0 - ss_res / ss_tot if ss_tot > 0 else np.nan))
        rows.append(rec)
    return pd.DataFrame(rows)


def inverse_normal_midrank(values: Iterable[float]) -> np.ndarray:
    x = pd.Series(values, dtype=float)
    if x.isna().any() or len(x) < 2:
        raise ValueError("rank normalization requires at least two finite values")
    ranks = x.rank(method="average").to_numpy(float)
    p = (ranks - 0.5) / len(x)
    return stats.norm.ppf(p)


def resolve_rate_feature(name: str, allow_exploratory_biexponential: bool = False) -> str:
    if name == "k_fast" and not allow_exploratory_biexponential:
        raise ValueError("k_fast is a deprecated weakly identified bi-exponential feature; use V1 k")
    if name in {"k", RATE_NAME}:
        return "k"
    if name == "k_fast":
        return "k_fast"
    raise ValueError(f"unsupported rate feature: {name}")


def validate_standardized_cohort(df: pd.DataFrame) -> None:
    required = {"trial", "patient_id", "k", "os_weeks", "event", "age_ge65", "ecog"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"standardized cohort is missing columns: {sorted(missing)}")
    if df.duplicated(["trial", "patient_id"]).any():
        raise ValueError("patient identifiers must be unique within trial")
    events = set(pd.to_numeric(df["event"], errors="coerce").dropna().unique())
    if events - {0, 1}:
        raise ValueError(f"event must be coded 0/1; observed {sorted(events)}")
    if (pd.to_numeric(df["os_weeks"], errors="coerce") < 0).any():
        raise ValueError("OS times must be nonnegative")


def prepare_landmark(df: pd.DataFrame, landmark_weeks: float = 15.0) -> tuple[pd.DataFrame, dict[str, Any]]:
    validate_standardized_cohort(df)
    d = df.copy()
    for col in ["k", "os_weeks", "event", "age_ge65", "ecog"]:
        d[col] = pd.to_numeric(d[col], errors="coerce")
    before = d.groupby("trial").size().to_dict()
    missing = d[["k", "os_weeks", "event", "age_ge65", "ecog"]].isna().groupby(d["trial"]).sum()
    d = d.dropna(subset=["k", "os_weeks", "event", "age_ge65", "ecog"])
    d = d[d["os_weeks"] > landmark_weeks].copy()
    d["duration"] = d["os_weeks"] - landmark_weeks
    d["z_rank"] = d.groupby("trial", group_keys=False)["k"].transform(inverse_normal_midrank)
    after = d.groupby("trial").size().to_dict()
    flow = {trial: {"n_before_complete_case": int(before.get(trial, 0)),
                    "n_after_landmark_complete_case": int(after.get(trial, 0)),
                    "missing_by_field": {k: int(v) for k, v in missing.loc[trial].to_dict().items()}}
            for trial in before}
    return d, flow


def _term_record(summary: pd.DataFrame, term: str) -> dict[str, float]:
    r = summary.loc[term]
    return {"HR": float(r["exp(coef)"]),
            "ci_low": float(r["exp(coef) lower 95%"]),
            "ci_high": float(r["exp(coef) upper 95%"]),
            "coef": float(r["coef"]), "se": float(r["se(coef)"]),
            "z": float(r["z"]), "p": float(r["p"])}


def fit_cox(df: pd.DataFrame, label: str, stratify_trial: bool = False) -> dict[str, Any]:
    from lifelines import CoxPHFitter
    from lifelines.statistics import proportional_hazard_test

    cols = ["duration", "event", *PRIMARY_TERMS]
    strata = None
    if stratify_trial and df["trial"].nunique() > 1:
        cols.append("trial")
        strata = ["trial"]
    sub = df[cols].copy()
    cph = CoxPHFitter()
    cph.fit(sub, duration_col="duration", event_col="event", strata=strata)
    events = int(sub["event"].sum())
    result: dict[str, Any] = {
        "label": label, "n": int(len(sub)), "events": events,
        "n_trials": int(df["trial"].nunique()), "trials": sorted(df["trial"].unique().tolist()),
        "epv": float(events / len(PRIMARY_TERMS)),
        "c_index": float(cph.concordance_index_),
        "log_likelihood": float(cph.log_likelihood_),
        "stratified_by_trial": bool(strata),
        "terms": {term: _term_record(cph.summary, term) for term in PRIMARY_TERMS},
    }
    try:
        ph = proportional_hazard_test(cph, sub, time_transform="rank")
        result["ph_test_p"] = {str(k): float(v) for k, v in ph.summary["p"].items()}
    except Exception as exc:
        result["ph_test_p"] = {}
        result["ph_test_error"] = type(exc).__name__
    try:
        db = cph.compute_residuals(sub, kind="delta_beta")
        max_abs = db.abs().max(axis=1)
        threshold = 2.0 / math.sqrt(len(sub))
        result["influence"] = {"threshold": threshold,
                               "n_over_threshold": int((max_abs > threshold).sum()),
                               "max_abs_delta_beta": float(max_abs.max())}
    except Exception as exc:
        result["influence"] = {"error": type(exc).__name__}
    return result


def fixed_effect_meta(models: dict[str, dict[str, Any]], term: str = "z_rank") -> dict[str, Any]:
    trials = []
    betas = []
    variances = []
    for trial, model in models.items():
        r = model["terms"][term]
        trials.append(trial); betas.append(r["coef"]); variances.append(r["se"] ** 2)
    b = np.asarray(betas, float); v = np.asarray(variances, float)
    w = 1.0 / v
    pooled = float(np.sum(w * b) / np.sum(w))
    se = float(math.sqrt(1.0 / np.sum(w)))
    z = pooled / se
    q = float(np.sum(w * (b - pooled) ** 2))
    df = max(0, len(b) - 1)
    q_p = float(stats.chi2.sf(q, df)) if df > 0 else 1.0
    i2 = max(0.0, (q - df) / q * 100.0) if q > 0 and df > 0 else 0.0
    return {"trials": trials, "HR": math.exp(pooled),
            "ci_low": math.exp(pooled - 1.96 * se), "ci_high": math.exp(pooled + 1.96 * se),
            "coef": pooled, "se": se, "z": z, "p": float(2 * stats.norm.sf(abs(z))),
            "Q": q, "Q_df": df, "Q_p": q_p, "I2_pct": i2}


def promotion_decision(external: dict[str, Any], all_cohort: dict[str, Any],
                       external_trials: dict[str, dict[str, Any]], meta: dict[str, Any],
                       os_sanity_passed: bool = False) -> dict[str, Any]:
    er = external["terms"]["z_rank"]; ar = all_cohort["terms"]["z_rank"]
    ext_direction = bool(external_trials) and all(
        m["terms"]["z_rank"]["HR"] < 1 for m in external_trials.values())
    external_ph = external.get("ph_test_p", {}).get("z_rank")
    all_ph = all_cohort.get("ph_test_p", {}).get("z_rank")
    ph_ok = external_ph is not None and all_ph is not None and external_ph >= 0.05 and all_ph >= 0.05

    def influence_passes(model: dict[str, Any]) -> bool:
        influence = model.get("influence", {})
        return "error" not in influence and influence.get("n_over_threshold") == 0

    influence_ok = influence_passes(external) and influence_passes(all_cohort) and all(
        influence_passes(model) for model in external_trials.values())
    i2 = meta.get("I2_pct")
    q_p = meta.get("Q_p")
    heterogeneity_ok = i2 is not None and (
        i2 < 50.0 or (q_p is not None and q_p >= 0.05 and ext_direction))
    checks = {
        "external_hr_lt_1_p_lt_0p05": bool(er["HR"] < 1 and er["p"] < 0.05),
        "all_cohort_hr_lt_1_p_lt_0p05": bool(ar["HR"] < 1 and ar["p"] < 0.05),
        "epv_ge_10": bool(external["epv"] >= 10 and all_cohort["epv"] >= 10),
        "os_sanity_passed": bool(os_sanity_passed), "rank_ph_ok": bool(ph_ok),
        "external_direction_consistent": bool(ext_direction),
        "influence_diagnostics_passed": bool(influence_ok),
        "heterogeneity_acceptable": bool(heterogeneity_ok),
    }
    passed = all(checks.values())
    if passed:
        verdict = "ALGORITHM_VALIDATED_PROSTATE_PSA_PROXY_OS_ANCHORED_EARLY_DECLINE"
        label = "ALGORITHM-VALIDATED (prostate PSA proxy, OS-anchored, early-decline population)"
    elif checks["all_cohort_hr_lt_1_p_lt_0p05"] and not checks["external_hr_lt_1_p_lt_0p05"]:
        verdict = "MULTICOHORT_OS_SIGNAL_NOT_EXTERNALLY_REPLICATED"
        label = "NOT PROMOTED: pooled signal does not independently replicate"
    else:
        verdict = "PROXY_TECHNICALLY_FUNCTIONAL_CLINICALLY_UNVALIDATED"
        label = "NOT PROMOTED: confirmatory external OS association not established"
    return {"checks": checks, "passed": passed, "verdict": verdict, "label": label}


def run_analysis(df: pd.DataFrame, discovery_trial: str = "TAX327",
                 landmark_weeks: float = 15.0, os_sanity_passed: bool = False) -> tuple[dict[str, Any], pd.DataFrame]:
    d, flow = prepare_landmark(df, landmark_weeks)
    trial_models = {trial: fit_cox(g, f"{trial} trial-specific", False)
                    for trial, g in d.groupby("trial", sort=True)}
    external_df = d[d["trial"] != discovery_trial]
    if external_df.empty:
        raise ValueError("no qualifying external cohort remains")
    external = fit_cox(external_df, "External-only confirmatory", True)
    all_model = fit_cox(d, "All-cohort supportive", True)
    meta = fixed_effect_meta(trial_models)
    external_trials = {k: v for k, v in trial_models.items() if k != discovery_trial}
    decision = promotion_decision(external, all_model, external_trials, meta, os_sanity_passed)
    receipt = {
        "analysis": "multicohort_rank_normalized_psa_rate_os_cox",
        "rate_feature": RATE_NAME, "rate_units": "days^-1",
        "rank_transform": "within-trial inverse-normal midrank: Phi^-1((rank-0.5)/n)",
        "landmark_weeks": landmark_weeks,
        "model": "OS_landmark ~ z_rank(k) + age_ge65 + ECOG; baseline hazard stratified by trial",
        "flow": flow, "trial_specific": trial_models,
        "external_only": external, "all_cohort": all_model,
        "fixed_effect_meta": meta, "promotion": decision,
        "boundaries": {"ovarian_ca125_kelim": "UNCALIBRATED",
                       "k_fast": "deprecated; exploratory sensitivity only",
                       "a1_rse": "FAILED at 66.5% with RSE<0.5; unchanged"},
    }
    return receipt, d


def write_json_with_hash(receipt: dict[str, Any], path: str | Path) -> str:
    path = Path(path); path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(receipt, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    path.with_suffix(path.suffix + ".sha256").write_text(f"{digest}  {path.name}\n", encoding="utf-8")
    return digest


def plot_validation(receipt: dict[str, Any], flow: pd.DataFrame,
                    png_path: str | Path, svg_path: str | Path) -> None:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
    matplotlib.rcParams["svg.fonttype"] = "none"
    blue, orange, green, grey = "#0279EE", "#FF9400", "#75A025", "#777777"
    rows = []
    for trial, model in receipt["trial_specific"].items():
        rows.append((trial, model["terms"]["z_rank"], False))
    rows += [("External-only", receipt["external_only"]["terms"]["z_rank"], True),
             ("All-cohort", receipt["all_cohort"]["terms"]["z_rank"], True)]

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12.8, 5.4), gridspec_kw={"width_ratios": [1.45, 1]})
    ys = np.arange(len(rows))[::-1]
    for y, (label, r, pooled) in zip(ys, rows):
        color = green if r["p"] < 0.05 else blue
        ax1.plot([r["ci_low"], r["ci_high"]], [y, y], color=color, lw=1.8)
        ax1.plot(r["HR"], y, "s" if pooled else "o", color=color, ms=7 if pooled else 6)
        ax1.text(1.65, y, f'{r["HR"]:.2f} [{r["ci_low"]:.2f}, {r["ci_high"]:.2f}]  p={r["p"]:.3g}',
                 va="center", fontsize=8.5)
    ax1.axvline(1.0, color="0.35", lw=1)
    ax1.set_xscale("log"); ax1.set_xlim(0.55, 2.8)
    ax1.set_xticks([0.6, 0.8, 1.0, 1.5, 2.0]); ax1.set_xticklabels(["0.6", "0.8", "1.0", "1.5", "2.0"])
    ax1.set_yticks(ys); ax1.set_yticklabels([r[0] for r in rows])
    ax1.set_xlabel("Hazard ratio for death per inverse-normal rank SD")
    ax1.set_title("A  Rank-normalized PSA rate and overall survival", loc="left", fontsize=11, fontweight="bold")
    ax1.tick_params(axis="y", length=0)
    for spine in ["top", "right", "left"]: ax1.spines[spine].set_visible(False)

    order = flow["trial"].tolist(); x = np.arange(len(order))
    n_rate = flow["n_positive_rate"].to_numpy(float)
    n_model = flow["n_model"].to_numpy(float)
    ax2.bar(x - 0.18, n_rate, width=0.36, color=orange, label="Positive V1 rate")
    ax2.bar(x + 0.18, n_model, width=0.36, color=blue, label="Confirmatory model")
    for xi, a, b in zip(x, n_rate, n_model):
        ax2.text(xi - 0.18, a + max(n_rate.max(), 1)*0.02, f"{int(a)}", ha="center", fontsize=8)
        ax2.text(xi + 0.18, b + max(n_rate.max(), 1)*0.02, f"{int(b)}", ha="center", fontsize=8)
    ax2.set_xticks(x); ax2.set_xticklabels(order)
    ax2.set_ylabel("Patients")
    ax2.set_title("B  Cohort eligibility flow", loc="left", fontsize=11, fontweight="bold")
    ax2.legend(frameon=False, fontsize=8, loc="upper right")
    for spine in ["top", "right"]: ax2.spines[spine].set_visible(False)
    fig.tight_layout()
    for path in [Path(png_path), Path(svg_path)]:
        path.parent.mkdir(parents=True, exist_ok=True)
        fig.savefig(path, dpi=220, bbox_inches="tight")
    plt.close(fig)


def enumerate_cas(config: dict[str, Any]) -> dict[str, Any]:
    import swat
    url, user, password = (os.environ.get("CAS_URL"), os.environ.get("CAS_USER"), os.environ.get("CAS_PASSWORD"))
    if not all([url, user, password]):
        raise RuntimeError("CAS_URL, CAS_USER, and CAS_PASSWORD must be provided through the environment")
    conn = swat.CAS(url, username=user, password=password)
    out = {"endpoint": url, "credential_values_persisted": False, "cohorts": []}
    try:
        for cohort in config["cohorts"]:
            caslib = cohort["caslib"]
            root = conn.table.fileInfo(caslib=caslib)["FileInfo"]
            out["cohorts"].append({"trial": cohort["trial"], "caslib": caslib,
                                    "root_entries": root["Name"].astype(str).tolist()})
    finally:
        conn.close()
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--cohort-config")
    ap.add_argument("--analysis-cohort", help="standardized CSV/Parquet with trial, patient_id, k, OS, event, age_ge65, ECOG")
    ap.add_argument("--enumerate-only", action="store_true")
    ap.add_argument("--landmark-weeks", type=float, default=15.0)
    ap.add_argument("--min-psa", type=int, default=3)
    ap.add_argument("--rank-method", default="inverse_normal", choices=["inverse_normal"])
    ap.add_argument("--os-sanity-passed", action="store_true",
                    help="explicitly confirm that prespecified cohort OS sanity checks passed")
    ap.add_argument("--output-dir", required=True)
    args = ap.parse_args()
    outdir = Path(args.output_dir); outdir.mkdir(parents=True, exist_ok=True)
    if args.enumerate_only:
        if not args.cohort_config: raise SystemExit("--cohort-config is required with --enumerate-only")
        config = json.loads(Path(args.cohort_config).read_text())
        result = enumerate_cas(config)
        write_json_with_hash(result, outdir / "kelim_multicohort_schema.json")
        return
    if not args.analysis_cohort:
        raise SystemExit("--analysis-cohort is required for fitting")
    receipt, cohort = run_analysis(
        read_table(args.analysis_cohort), landmark_weeks=args.landmark_weeks,
        os_sanity_passed=args.os_sanity_passed)
    write_json_with_hash(receipt, outdir / "kelim_multicohort_rank_cox.json")
    counts = cohort.groupby("trial").agg(n_model=("patient_id", "size")).reset_index()
    counts["n_positive_rate"] = counts["trial"].map(
        {k: v["n_before_complete_case"] for k, v in receipt["flow"].items()})
    plot_validation(receipt, counts, outdir / "kelim_multicohort_rank_cox.png",
                    outdir / "kelim_multicohort_rank_cox.svg")
    print(receipt["promotion"]["verdict"])


if __name__ == "__main__":
    main()
