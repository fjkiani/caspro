#!/usr/bin/env python3
"""
models.py -- the four-model incremental-value comparison on IDENTICAL folds.

Every model sees the same fold indices, so differences cannot be an artifact of
different partitions. All preprocessing (standardisation, imputation) and any
threshold selection happen INSIDE the training fold.

Two model classes are handled deliberately differently:

  FITTED models      -- coefficients are estimated in the training fold; the
                        out-of-fold prediction is genuinely out-of-sample.
  FIXED-RULE models  -- the shipped s7>=0.25 rule and the Brenus frozen S3
                        scorer have pinned constants. Nothing is estimated, so
                        their OOF prediction equals their apparent prediction.
                        This is stated, not hidden: cross-validating a fixed rule
                        does not make it out-of-sample with respect to the data
                        its constants were originally derived from.
"""
from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import RepeatedStratifiedKFold

from .firth import firth_logit

# Brenus frozen production scorer, pinned constants
# (clinical_validation/pipeline/score_cn_resistance.py)
FROZEN_MU = 0.1767425892802721
FROZEN_SD = 0.13804070487798628
FROZEN_BETA0 = -1.5244530417837185
FROZEN_BETA1 = -2.349692574868657

# Shipped backend constant (api/services/resistance_prophet/constants.py:29)
SHIPPED_SIG7_RISK_THRESHOLD = 0.25

N_SPLITS = 5
N_REPEATS = 20
SEED = 42


def frozen_s3_score(s3: np.ndarray) -> np.ndarray:
    """The shipped Brenus scorer: sigmoid(b0 + b1 * z(s3)) with pinned constants."""
    z = (np.asarray(s3, float) - FROZEN_MU) / FROZEN_SD
    return 1.0 / (1.0 + np.exp(-(FROZEN_BETA0 + FROZEN_BETA1 * z)))


def shipped_s7_rule(s7: np.ndarray) -> np.ndarray:
    """The shipped backend prognosis rule as a binary risk score."""
    return (np.asarray(s7, float) >= SHIPPED_SIG7_RISK_THRESHOLD).astype(float)


@dataclass
class ModelSpec:
    name: str
    features: list
    kind: str = "fitted"          # 'fitted' | 'fixed'
    fixed_fn: object = None       # callable(df) -> score, for kind='fixed'
    estimator: str = "firth"      # 'firth' | 'ridge'
    note: str = ""


def make_folds(y, n_splits=N_SPLITS, n_repeats=N_REPEATS, seed=SEED):
    """One fold object reused by every model -- this is what makes the comparison paired."""
    rskf = RepeatedStratifiedKFold(n_splits=n_splits, n_repeats=n_repeats, random_state=seed)
    return [(tr, te) for tr, te in rskf.split(np.zeros(len(y)), y)]


def _fit_predict_fitted(Xtr, ytr, Xte, estimator):
    mu = Xtr.mean(axis=0)
    sd = Xtr.std(axis=0, ddof=0)
    sd = np.where(sd < 1e-12, 1.0, sd)
    Ztr = (Xtr - mu) / sd
    Zte = (Xte - mu) / sd
    if estimator == "firth":
        fit = firth_logit(Ztr, ytr)
        beta = fit["beta"]
        eta = beta[0] + Zte @ beta[1:]
        return 1.0 / (1.0 + np.exp(-eta)), {"mu": mu.tolist(), "sd": sd.tolist(),
                                            "beta": beta.tolist()}
    lr = LogisticRegression(penalty="l2", C=1.0, class_weight="balanced",
                            max_iter=5000, solver="lbfgs")
    lr.fit(Ztr, ytr)
    return lr.predict_proba(Zte)[:, 1], {"mu": mu.tolist(), "sd": sd.tolist(),
                                         "beta": [float(lr.intercept_[0])] + lr.coef_[0].tolist()}


def infer_fold_geometry(folds, n) -> tuple:
    """Recover (n_splits, n_repeats) FROM THE FOLDS, not from module defaults.

    The number of folds per repeat is the number of consecutive folds consumed before
    every subject has appeared in a test set exactly once. Guessing it from a hard-coded
    N_REPEATS silently mis-shapes the OOF matrix for any configuration other than the
    canonical 5 x 20, which makes per-repeat metrics either empty or wrong. Derive it.
    """
    seen = set()
    n_splits = 0
    for _, te in folds:
        seen.update(int(i) for i in np.asarray(te).ravel())
        n_splits += 1
        if len(seen) >= n:
            break
    if n_splits == 0:
        raise ValueError("empty fold list")
    if len(folds) % n_splits != 0:
        raise ValueError(
            f"fold list of length {len(folds)} is not an integer number of repeats of "
            f"{n_splits} splits; refusing to guess the geometry"
        )
    return n_splits, len(folds) // n_splits


def run_model(spec: ModelSpec, df: pd.DataFrame, y: np.ndarray, folds) -> dict:
    """Return per-repeat OOF prediction matrices and the fold-level fit records."""
    n = len(y)
    n_splits, n_repeats = infer_fold_geometry(folds, n)
    oof = np.full((n_repeats, n), np.nan)
    fold_records = []

    if spec.kind == "fixed":
        s = np.asarray(spec.fixed_fn(df), float)
        for r in range(n_repeats):
            oof[r, :] = s
        return {"spec": spec, "oof_by_repeat": oof, "oof_mean": s,
                "fold_records": [], "is_fixed": True}

    X = df[spec.features].to_numpy(float)
    for k, (tr, te) in enumerate(folds):
        r = k // n_splits
        p, rec = _fit_predict_fitted(X[tr], y[tr], X[te], spec.estimator)
        oof[r, te] = p
        rec.update({"repeat": r, "fold": k % n_splits, "n_train": int(len(tr)),
                    "n_test": int(len(te)), "events_train": int(y[tr].sum())})
        fold_records.append(rec)
    return {"spec": spec, "oof_by_repeat": oof, "oof_mean": np.nanmean(oof, axis=0),
            "fold_records": fold_records, "is_fixed": False}


def per_repeat_metric(y, oof_by_repeat, fn):
    """Metric computed within each repeat's complete OOF vector, then summarised.

    This is the correct order of operations: averaging predictions across repeats
    first and then computing one metric produces an optimistically smoothed score.
    """
    vals = []
    for r in range(oof_by_repeat.shape[0]):
        p = oof_by_repeat[r]
        m = ~np.isnan(p)
        if m.sum() == len(y) and len(np.unique(y)) > 1:
            vals.append(fn(y, p))
    return np.asarray(vals, float)


def verify_no_leakage(fold_records) -> dict:
    """Standardisation parameters must differ across folds. If they are identical,
    the scaler was fitted outside the fold and the OOF claim is void."""
    if not fold_records:
        return {"applicable": False, "reason": "fixed-rule model has no fitted preprocessing"}
    mus = np.array([r["mu"] for r in fold_records])
    sds = np.array([r["sd"] for r in fold_records])
    return {
        "applicable": True,
        "n_folds": len(fold_records),
        "n_unique_mu_rows": int(len(np.unique(np.round(mus, 12), axis=0))),
        "n_unique_sd_rows": int(len(np.unique(np.round(sds, 12), axis=0))),
        "mu_varies_across_folds": bool(len(np.unique(np.round(mus, 12), axis=0)) > 1),
        "sd_varies_across_folds": bool(len(np.unique(np.round(sds, 12), axis=0)) > 1),
    }
