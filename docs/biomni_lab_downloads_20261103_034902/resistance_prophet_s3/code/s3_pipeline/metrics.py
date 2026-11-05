#!/usr/bin/env python3
"""
metrics.py -- discrimination, calibration, threshold operating characteristics,
uncertainty, and decision-curve net benefit.

Design rules enforced here (they are the difference between a defensible
biomarker report and an oversold one):

1. A ranking score with no fitted parameters (raw s3_diag) has identical
   apparent and out-of-fold AUROC. Cross-validating it adds nothing. This module
   therefore separates `auroc_ranking` (no CV needed) from OOF metrics of fitted
   models.
2. Fold-to-fold dispersion is NOT sampling uncertainty. `fold_band` and
   `bootstrap_ci` are reported side by side and never interchanged.
3. AUROC is never converted into a probability or a "confidence".
4. AUPRC is always reported against the prevalence null.
"""
from __future__ import annotations

import numpy as np
from scipy import stats
from sklearn.metrics import (average_precision_score, brier_score_loss,
                             roc_auc_score, roc_curve)

RNG_SEED = 42


def auroc_ranking(y: np.ndarray, score: np.ndarray) -> float:
    """AUROC of a fixed ranking score. No fitting, so no CV is required."""
    return float(roc_auc_score(y, score))


def protective_auroc(auroc_raw: float) -> float:
    """A protective feature scores <0.5 against the event label; 1-AUROC is the
    discrimination of the reversed (resistance) axis. This is an arithmetic
    identity, not an additional result."""
    return float(1.0 - auroc_raw)


def bootstrap_ci(y, score, stat="auroc", n_boot=2000, seed=RNG_SEED, stratified=True):
    """Stratified bootstrap CI. Returns point estimate, CI, and the draws."""
    y = np.asarray(y).astype(int)
    score = np.asarray(score, float)
    rng = np.random.default_rng(seed)
    idx_pos = np.where(y == 1)[0]
    idx_neg = np.where(y == 0)[0]

    def _stat(yy, ss):
        if len(np.unique(yy)) < 2:
            return np.nan
        if stat == "auroc":
            return roc_auc_score(yy, ss)
        if stat == "auprc":
            return average_precision_score(yy, ss)
        if stat == "brier":
            return brier_score_loss(yy, np.clip(ss, 0, 1))
        raise ValueError(stat)

    draws = np.empty(n_boot)
    for b in range(n_boot):
        if stratified:
            take = np.concatenate([rng.choice(idx_pos, len(idx_pos), replace=True),
                                   rng.choice(idx_neg, len(idx_neg), replace=True)])
        else:
            take = rng.choice(len(y), len(y), replace=True)
        draws[b] = _stat(y[take], score[take])
    draws = draws[~np.isnan(draws)]
    return {
        "point": float(_stat(y, score)),
        "ci_lo": float(np.percentile(draws, 2.5)),
        "ci_hi": float(np.percentile(draws, 97.5)),
        "n_boot_used": int(len(draws)),
        "draws": draws,
    }


def permutation_test(y, score, n_perm=10000, seed=RNG_SEED, stat="auroc"):
    """Two-sided label-permutation test on |stat - 0.5| for AUROC."""
    y = np.asarray(y).astype(int)
    score = np.asarray(score, float)
    rng = np.random.default_rng(seed)
    fn = roc_auc_score if stat == "auroc" else average_precision_score
    obs = float(fn(y, score))
    null = np.empty(n_perm)
    yp = y.copy()
    for i in range(n_perm):
        rng.shuffle(yp)
        null[i] = fn(yp, score)
    if stat == "auroc":
        centre = 0.5
        extreme = np.abs(null - centre) >= abs(obs - centre)
    else:
        centre = float(y.mean())
        extreme = np.abs(null - centre) >= abs(obs - centre)
    p = (extreme.sum() + 1) / (n_perm + 1)
    return {
        "observed": obs,
        "n_perm": int(n_perm),
        "null_mean": float(null.mean()),
        "null_sd": float(null.std(ddof=1)),
        "empirical_p_two_sided": float(p),
        "note": "add-one-smoothed; p cannot be reported as 0",
    }


def calibration(y, p):
    """Calibration intercept and slope from a logistic recalibration of the
    linear predictor. Slope 1 / intercept 0 = calibrated. At small event counts
    these are themselves imprecise; the CI is what matters."""
    y = np.asarray(y).astype(float)
    p = np.clip(np.asarray(p, float), 1e-6, 1 - 1e-6)
    lp = np.log(p / (1 - p))
    import statsmodels.api as sm
    try:
        slope_fit = sm.GLM(y, sm.add_constant(lp), family=sm.families.Binomial()).fit()
        ci = slope_fit.conf_int()
        cal = {
            "calibration_intercept": float(slope_fit.params[0]),
            "calibration_slope": float(slope_fit.params[1]),
            "slope_ci_lo": float(ci[1][0]),
            "slope_ci_hi": float(ci[1][1]),
            "intercept_ci_lo": float(ci[0][0]),
            "intercept_ci_hi": float(ci[0][1]),
        }
    except Exception as exc:  # separation / convergence
        cal = {"calibration_intercept": None, "calibration_slope": None,
               "error": f"{type(exc).__name__}: {exc}"}
    prev = float(y.mean())
    cal["brier"] = float(brier_score_loss(y, p))
    cal["brier_prevalence_only"] = float(brier_score_loss(y, np.full_like(y, prev)))
    cal["brier_skill_vs_prevalence"] = float(
        1 - cal["brier"] / cal["brier_prevalence_only"]) if cal["brier_prevalence_only"] else np.nan
    cal["prevalence"] = prev
    return cal


def _wilson(k, n):
    if n == 0:
        return (np.nan, np.nan, np.nan)
    lo, hi = stats.binomtest(int(k), int(n)).proportion_ci(method="wilson")
    return (k / n, float(lo), float(hi))


def threshold_ops(y, score, thresholds, direction="low_is_event"):
    """Sens/Spec/PPV/NPV with Wilson CIs at each candidate threshold.

    direction='low_is_event': predict event when score <= threshold (s3 is
    protective, so LOW s3 predicts resistance). This is stated explicitly rather
    than folded into a sign flip, because a silent sign convention is exactly how
    a direction-reversal bug ships.
    """
    y = np.asarray(y).astype(int)
    score = np.asarray(score, float)
    rows = []
    for t in thresholds:
        pred = (score <= t).astype(int) if direction == "low_is_event" else (score >= t).astype(int)
        tp = int(((pred == 1) & (y == 1)).sum())
        fp = int(((pred == 1) & (y == 0)).sum())
        tn = int(((pred == 0) & (y == 0)).sum())
        fn = int(((pred == 0) & (y == 1)).sum())
        sens, sl, sh = _wilson(tp, tp + fn)
        spec, pl, ph = _wilson(tn, tn + fp)
        ppv, vl, vh = _wilson(tp, tp + fp) if (tp + fp) else (np.nan, np.nan, np.nan)
        npv, nl, nh = _wilson(tn, tn + fn) if (tn + fn) else (np.nan, np.nan, np.nan)
        rows.append({
            "threshold": float(t), "direction": direction,
            "tp": tp, "fp": fp, "tn": tn, "fn": fn,
            "n_flagged": tp + fp,
            "sensitivity": sens, "sens_ci_lo": sl, "sens_ci_hi": sh,
            "specificity": spec, "spec_ci_lo": pl, "spec_ci_hi": ph,
            "ppv": ppv, "ppv_ci_lo": vl, "ppv_ci_hi": vh,
            "npv": npv, "npv_ci_lo": nl, "npv_ci_hi": nh,
            "youden_j": (sens + spec - 1) if not (np.isnan(sens) or np.isnan(spec)) else np.nan,
        })
    return rows


def youden_cutpoint(y, score, direction="low_is_event"):
    """Empirical Youden-optimal cutpoint on the given data (in-fold use only)."""
    y = np.asarray(y).astype(int)
    s = np.asarray(score, float)
    sgn = -1.0 if direction == "low_is_event" else 1.0
    fpr, tpr, thr = roc_curve(y, sgn * s)
    j = tpr - fpr
    k = int(np.argmax(j))
    return float(sgn * thr[k]), float(j[k])


def net_benefit(y, p, thresholds):
    """Decision-curve net benefit for a probability-scale score, vs treat-all and
    treat-none. Only meaningful if `p` is on a probability scale."""
    y = np.asarray(y).astype(int)
    p = np.asarray(p, float)
    n = len(y)
    prev = y.mean()
    rows = []
    for pt in thresholds:
        pred = (p >= pt).astype(int)
        tp = ((pred == 1) & (y == 1)).sum()
        fp = ((pred == 1) & (y == 0)).sum()
        w = pt / (1 - pt)
        rows.append({
            "threshold_probability": float(pt),
            "net_benefit_model": float(tp / n - (fp / n) * w),
            "net_benefit_treat_all": float(prev - (1 - prev) * w),
            "net_benefit_treat_none": 0.0,
        })
    return rows


def paired_bootstrap_delta(y, score_a, score_b, stat="auroc", n_boot=2000, seed=RNG_SEED):
    """Delta of a metric between two scores using the SAME bootstrap resamples.

    Independent bootstraps of two correlated scores overstate the uncertainty of
    their difference; pairing is required.
    """
    y = np.asarray(y).astype(int)
    a = np.asarray(score_a, float)
    b = np.asarray(score_b, float)
    rng = np.random.default_rng(seed)
    ip, ineg = np.where(y == 1)[0], np.where(y == 0)[0]

    def _stat(yy, ss):
        if len(np.unique(yy)) < 2:
            return np.nan
        if stat == "auroc":
            return roc_auc_score(yy, ss)
        if stat == "auprc":
            return average_precision_score(yy, ss)
        if stat == "brier":
            return brier_score_loss(yy, np.clip(ss, 0, 1))
        raise ValueError(stat)

    d = np.empty(n_boot)
    for i in range(n_boot):
        take = np.concatenate([rng.choice(ip, len(ip), replace=True),
                               rng.choice(ineg, len(ineg), replace=True)])
        d[i] = _stat(y[take], b[take]) - _stat(y[take], a[take])
    d = d[~np.isnan(d)]
    obs = _stat(y, b) - _stat(y, a)
    return {
        "delta_point": float(obs),
        "delta_ci_lo": float(np.percentile(d, 2.5)),
        "delta_ci_hi": float(np.percentile(d, 97.5)),
        "p_delta_le_0": float((d <= 0).mean()),
        "n_boot_used": int(len(d)),
    }


def fold_band(values):
    """Fold-resampling dispersion. Explicitly labelled so it is never mistaken
    for a confidence interval on the population parameter."""
    v = np.asarray(values, float)
    v = v[~np.isnan(v)]
    return {
        "mean": float(v.mean()),
        "sd": float(v.std(ddof=1)) if len(v) > 1 else 0.0,
        "pctile_2p5": float(np.percentile(v, 2.5)),
        "pctile_97p5": float(np.percentile(v, 97.5)),
        "n_folds": int(len(v)),
        "interpretation": ("dispersion across resampled training folds of the SAME "
                           "patients; NOT a confidence interval for the population AUROC"),
    }
