#!/usr/bin/env python3
"""
run_nfe3_imputation.py -- NFE-3: selection-bias imputation for Gate B5.

Question
--------
The covariate-complete subset (n=67, 9 events) is outcome-selected relative to
the primary analysis set (n=98, 20 events): prevalence 0.134 in vs 0.355 out
(Fisher OR 0.2821, p 0.0162). The M0 -> M3a incremental-value claim therefore
rests on a biased denominator. The 31 dropped patients are missing ALL five
covariates jointly (block missingness). This script re-runs M0 vs M3a on the
full n=98 with the missing covariates multiply imputed.

Design choices (each chosen to be defensible, not convenient)
-------------------------------------------------------------
1. IMPUTATION INSIDE THE FOLDS. The imputation model is fitted on each
   training fold only and applied to the held-out fold via transform(). The
   outcome is a predictor in the imputation model (required for a valid
   prognostic imputation), but held-out rows have their outcome set to NaN so
   no test outcome ever enters an imputation or a fit. Imputing once on the
   full data and then cross-validating would leak test outcomes through the
   imputation model and is NOT done.
2. MULTIPLE IMPUTATION, m=10 per fold. IterativeImputer with
   sample_posterior=True (proper MICE draws, not point estimates). Per-
   imputation OOF metrics are pooled across imputations with Rubin's rules
   (within + between-imputation variance). Pooled-prediction metrics
   (averaging each subject's OOF probability across imputations) are reported
   as a secondary estimate.
3. IDENTICAL FOLDS. The same RepeatedStratifiedKFold object (5x20, seed 42)
   is reused for every imputation and both models, so all comparisons are
   paired.
4. ESTIMATOR UNCHANGED. Firth-penalized logistic with in-fold
   standardisation, via s3_pipeline.models._fit_predict_fitted -- the exact
   estimator used for the complete-case comparison.
5. SENSITIVITY. KNNImputer(k=5) single imputation, same folds, same models.
6. RECODE. num_lines '4+' -> 5.0 (the pipeline's num_lines_n convention).
   Binary covariates are imputed as continuous draws then rounded/clipped to
   {0,1}; stage is rounded/clipped to {1,2,3,4} before the >=3 threshold;
   num_lines_n clipped to [1,5]; age clipped to the observed range.

Outputs
-------
tables/nfe3_imputation_incremental_value.csv  -- pooled metrics + deltas
nfe3_imputation.json                          -- verdict + diagnostics + config
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from scipy import stats
from sklearn.experimental import enable_iterative_imputer  # noqa: F401
from sklearn.impute import IterativeImputer, KNNImputer
from sklearn.metrics import average_precision_score, brier_score_loss, roc_auc_score

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from s3_pipeline.models import _fit_predict_fitted, infer_fold_geometry, make_folds  # noqa: E402

TABLE = HERE.parent / "tables" / "rebuilt_patient_master.csv"
OUT_CSV = HERE.parent / "tables" / "nfe3_imputation_incremental_value.csv"
OUT_JSON = HERE.parent / "nfe3_imputation.json"

M_IMPUTATIONS = 10
N_SPLITS, N_REPEATS, SEED = 5, 20, 42

# imputation-model columns: covariates to impute + observed predictors
COV = ["age", "stage", "nlines", "brca", "hr"]
PRED = ["s3_diag", "y"]          # observed for all; y is NaN in held-out rows
IMP_COLS = COV + PRED
# clip bounds for imputed columns (order = IMP_COLS)
MIN_V = [42.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0]
MAX_V = [85.0, 4.0, 5.0, 1.0, 1.0, 1.0, 1.0]


def load_n98() -> pd.DataFrame:
    m = pd.read_csv(TABLE)
    d = m[m["s3_diag"].notna() & m["resistant"].notna()].copy().reset_index(drop=True)
    d["y"] = d["resistant"].astype(float)
    d["stage"] = pd.to_numeric(d["tumour_stage_at_diagnosis"], errors="coerce")
    nl = d["num_lines"].astype("object").map(
        lambda v: np.nan if pd.isna(v) else (5.0 if str(v).strip() == "4+" else float(v)))
    d["nlines"] = nl
    for c, src in [("brca", "brca_mut"), ("hr", "hr_gene_mut")]:
        d[c] = d[src].astype("object").map(lambda v: np.nan if pd.isna(v) else float(bool(v)))
    d["age"] = pd.to_numeric(d["age"], errors="coerce")
    return d


def postprocess(frame: pd.DataFrame) -> pd.DataFrame:
    """Round/clip imputed values back to their measurement scale."""
    out = frame.copy()
    for c in ["brca", "hr"]:
        out[c] = np.clip(np.rint(out[c]), 0.0, 1.0)
    out["stage"] = np.clip(np.rint(out["stage"]), 1.0, 4.0)
    out["nlines"] = np.clip(out["nlines"], 1.0, 5.0)
    out["age"] = np.clip(out["age"], 42.0, 85.0)
    return out


def design_matrix(frame: pd.DataFrame, features: list) -> np.ndarray:
    X = np.column_stack([
        frame["age"].to_numpy(float) if f == "age_z" else
        (frame["stage"].to_numpy(float) >= 3).astype(float) if f == "stage_adv" else
        frame["nlines"].to_numpy(float) if f == "num_lines_n" else
        frame["s3_diag"].to_numpy(float) if f == "s3_diag" else None
        for f in features])
    return X


M0_FEATS = ["age_z", "stage_adv", "num_lines_n"]
M3A_FEATS = ["age_z", "stage_adv", "num_lines_n", "s3_diag"]


def run_imputed_cv(d: pd.DataFrame, folds, m_imputations: int, method: str) -> dict:
    """Within-fold imputation + firth fits. Returns OOF matrices per imputation
    and pooled across imputations, for M0 and M3a."""
    n = len(d)
    n_splits, n_repeats = infer_fold_geometry(folds, n)
    models = {"M0_clinical": M0_FEATS, "M3a_clinical_plus_s3": M3A_FEATS}
    oof = {name: np.full((m_imputations, n_repeats, n), np.nan) for name in models}

    imp_diag = {c: [] for c in COV}

    for k, (tr, te) in enumerate(folds):
        r = k // n_splits
        train = d.iloc[tr][IMP_COLS].copy()
        test = d.iloc[te][IMP_COLS].copy()
        test["y"] = np.nan  # held-out outcomes must not enter imputation
        for m in range(m_imputations):
            if method == "mice":
                imp = IterativeImputer(sample_posterior=True, max_iter=15,
                                       random_state=10_000 * m + k,
                                       min_value=MIN_V, max_value=MAX_V)
            else:
                imp = KNNImputer(n_neighbors=5)
            imp.fit(train)
            tr_imp = postprocess(pd.DataFrame(imp.transform(train), columns=IMP_COLS))
            te_imp = postprocess(pd.DataFrame(imp.transform(test), columns=IMP_COLS))
            if k == 0:  # diagnostics from the first fold only, per imputation
                miss_rows = d.iloc[tr][COV].isna().any(axis=1)
                for c in COV:
                    imp_diag[c].append(tr_imp.loc[miss_rows.to_numpy(), c].mean())
            ytr = d["y"].to_numpy(float)[tr]
            for name, feats in models.items():
                p, _ = _fit_predict_fitted(design_matrix(tr_imp, feats), ytr,
                                           design_matrix(te_imp, feats), "firth")
                oof[name][m, r, te] = p
    return {"oof": oof, "n_repeats": n_repeats, "imp_diag": imp_diag}


def per_repeat_metrics(y: np.ndarray, oof_mat: np.ndarray) -> dict:
    """oof_mat: (n_repeats, n) -> per-repeat metric arrays."""
    out = {"auroc": [], "auprc": [], "brier": []}
    for r in range(oof_mat.shape[0]):
        p = oof_mat[r]
        if np.isnan(p).any():
            continue
        out["auroc"].append(roc_auc_score(y, p))
        out["auprc"].append(average_precision_score(y, p))
        out["brier"].append(brier_score_loss(y, p))
    return {k: np.asarray(v, float) for k, v in out.items()}


def rubin_pool(per_imp_est: np.ndarray, per_imp_var: np.ndarray) -> dict:
    """Rubin's rules over m imputations."""
    m = len(per_imp_est)
    qbar = float(np.mean(per_imp_est))
    w = float(np.mean(per_imp_var))
    b = float(np.var(per_imp_est, ddof=1)) if m > 1 else 0.0
    t = w + (1.0 + 1.0 / m) * b
    se = float(np.sqrt(t))
    df = (m - 1) * (1.0 + w / ((1.0 + 1.0 / m) * b)) ** 2 if b > 0 else np.inf
    tcrit = stats.t.ppf(0.975, df) if np.isfinite(df) else 1.96
    return {"estimate": qbar, "se": se, "ci_lo": qbar - tcrit * se,
            "ci_hi": qbar + tcrit * se, "within_var": w, "between_var": b,
            "df": float(df) if np.isfinite(df) else None}


def main() -> None:
    d = load_n98()
    y = d["y"].to_numpy(float)
    n, events = len(y), int(y.sum())
    folds = make_folds(y, n_splits=N_SPLITS, n_repeats=N_REPEATS, seed=SEED)

    results = {"config": {"n": n, "events": events, "prevalence": float(y.mean()),
                          "m_imputations": M_IMPUTATIONS,
                          "folds": f"{N_SPLITS}x{N_REPEATS} seed={SEED}",
                          "imputation": "IterativeImputer(sample_posterior=True) "
                                        "fitted INSIDE each training fold; held-out "
                                        "outcomes set to NaN; estimator firth; "
                                        "num_lines '4+'->5.0",
                          "sensitivity": "KNNImputer(k=5) single imputation, same folds"},
               "missingness": {}, "mice": {}, "knn_sensitivity": {}, "verdict": {}}

    cov_full = ["age", "stage", "nlines", "brca", "hr"]
    miss = d[cov_full].isna()
    results["missingness"] = {
        "n_missing_all_five_jointly": int(miss.all(axis=1).sum()),
        "n_sporadic": int((miss.any(axis=1) & ~miss.all(axis=1)).sum()),
        "pattern": "block monotone: every incomplete subject is missing ALL five "
                   "covariates; no sporadic cells",
        "resistant_rate_complete": float(d.loc[~miss.any(axis=1), "y"].mean()),
        "resistant_rate_incomplete": float(d.loc[miss.any(axis=1), "y"].mean()),
        "mechanism_note": "MCAR rejected (outcome-selective). MAR plausible given "
                          "outcome + s3 are imputation predictors; MNAR not excludable "
                          "-- stated as a limitation, not resolved by imputation."}

    # ---- primary: MICE ----
    mice = run_imputed_cv(d, folds, M_IMPUTATIONS, "mice")
    # ---- sensitivity: KNN ----
    knn = run_imputed_cv(d, folds, 1, "knn")

    rows = []
    for label, res, m_imp in [("mice", mice, M_IMPUTATIONS), ("knn", knn, 1)]:
        sink = results["mice"] if label == "mice" else results["knn_sensitivity"]
        per_imp_summary = {name: {} for name in res["oof"]}
        pooled_pred_summary = {}
        for name, mat in res["oof"].items():           # mat: (m, repeats, n)
            per_imp = [per_repeat_metrics(y, mat[m]) for m in range(mat.shape[0])]
            for metric in ["auroc", "auprc", "brier"]:
                est = np.array([pi[metric].mean() for pi in per_imp])
                var = np.array([pi[metric].var(ddof=1) / len(pi[metric])
                                if len(pi[metric]) > 1 else 0.0 for pi in per_imp])
                per_imp_summary[name][metric] = rubin_pool(est, var)
            pooled = np.nanmean(mat, axis=0)           # average predictions over m
            pm = per_repeat_metrics(y, pooled)
            pooled_pred_summary[name] = {
                mt: {"mean": float(pm[mt].mean()),
                     "sd": float(pm[mt].std(ddof=1))} for mt in pm}
        sink["per_imputation_rubin"] = per_imp_summary
        sink["pooled_prediction"] = pooled_pred_summary
        # paired delta M3a - M0, per imputation, per repeat
        deltas = {}
        for metric in ["auroc", "auprc", "brier"]:
            est, var = [], []
            for m in range(res["oof"]["M0_clinical"].shape[0]):
                d_m = (per_repeat_metrics(y, res["oof"]["M3a_clinical_plus_s3"][m])[metric]
                       - per_repeat_metrics(y, res["oof"]["M0_clinical"][m])[metric])
                est.append(d_m.mean())
                var.append(d_m.var(ddof=1) / len(d_m) if len(d_m) > 1 else 0.0)
            deltas[metric] = rubin_pool(np.asarray(est), np.asarray(var))
            deltas[metric]["excludes_zero"] = bool(
                deltas[metric]["ci_lo"] > 0 or deltas[metric]["ci_hi"] < 0)
            rows.append({"method": label, "comparison": "M3a - M0", "metric": metric,
                         "estimate": deltas[metric]["estimate"], "se": deltas[metric]["se"],
                         "ci_lo": deltas[metric]["ci_lo"], "ci_hi": deltas[metric]["ci_hi"],
                         "excludes_zero": deltas[metric]["excludes_zero"]})
        sink["delta_M3a_minus_M0"] = deltas
        if label == "mice":
            results["mice"]["imputation_diagnostics_fold0"] = {
                c: {"mean_of_imputed_means": float(np.nanmean(v)),
                    "sd_of_imputed_means": float(np.nanstd(v))}
                for c, v in mice["imp_diag"].items()}
            obs = d.loc[~miss.any(axis=1)]
            results["mice"]["observed_complete_case_distribution"] = {
                c: {"mean": float(obs[c].mean()), "sd": float(obs[c].std())}
                for c in cov_full}

    # ---- verdict ----
    a = results["mice"]["delta_M3a_minus_M0"]["auroc"]
    results["verdict"] = {
        "complete_case_reference": {"n": 67, "events": 9,
                                    "delta_auroc": 0.3525, "ci": [0.1494, 0.5480]},
        "imputed_full_set": {"n": n, "events": events,
                             "delta_auroc": a["estimate"],
                             "ci": [a["ci_lo"], a["ci_hi"]],
                             "excludes_zero": a["excludes_zero"]},
        "gate_b5_statement": None}
    if a["excludes_zero"] and a["estimate"] > 0:
        results["verdict"]["gate_b5_statement"] = (
            "PASS_WITH_CAVEATS: the M0 -> M3a incremental signal survives multiple "
            "imputation on the full n=98 (delta AUROC %.3f [%.3f, %.3f]). The "
            "complete-case delta (0.3525) was not an artifact of outcome-selective "
            "covariate missingness. Caveats: MNAR not excludable; 20 events; "
            "imputation model uncertainty included via Rubin pooling."
            % (a["estimate"], a["ci_lo"], a["ci_hi"]))
    else:
        results["verdict"]["gate_b5_statement"] = (
            "NOT_RESOLVED: under multiple imputation the M0 -> M3a delta AUROC is "
            "%.3f [%.3f, %.3f], which does not exclude zero. The complete-case "
            "incremental value does not transport to the full n=98; Gate B5 remains "
            "failed and the parsimonious M1 candidate remains the primary."
            % (a["estimate"], a["ci_lo"], a["ci_hi"]))

    pd.DataFrame(rows).to_csv(OUT_CSV, index=False)
    OUT_JSON.write_text(json.dumps(results, indent=2, default=float))
    print(json.dumps(results["verdict"], indent=2))
    print("\nMICE per-imputation Rubin summaries:")
    for name, mets in results["mice"]["per_imputation_rubin"].items():
        for mt, s in mets.items():
            print(f"  {name:26s} {mt:6s} {s['estimate']:.4f} [{s['ci_lo']:.4f}, {s['ci_hi']:.4f}]")
    print("\nKNN sensitivity deltas:")
    for mt, s in results["knn_sensitivity"]["delta_M3a_minus_M0"].items():
        print(f"  {mt:6s} {s['estimate']:.4f} [{s['ci_lo']:.4f}, {s['ci_hi']:.4f}]")


if __name__ == "__main__":
    main()
