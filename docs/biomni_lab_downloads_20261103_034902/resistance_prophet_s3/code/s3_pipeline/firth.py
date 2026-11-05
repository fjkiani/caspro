#!/usr/bin/env python3
"""
Self-contained Firth-penalized logistic regression (Firth 1993 bias reduction
via Jeffreys-prior penalty). Used because the pip `firthlogist` package is
incompatible with sklearn 1.7.1 (removed `_validate_data`). This implementation
depends only on numpy/scipy and is deterministic.

Penalized score:  U*(beta) = X'(y - p) + X' (h/2) (1 - 2p)  ... implemented via
the standard IRLS-with-Jeffreys update using the hat matrix diagonal h.
Penalized log-likelihood adds (1/2) log|I(beta)|.
Profile-penalized-likelihood p-values via LRT (drop one covariate, refit).
"""
import numpy as np
from scipy import stats


def _neg_pen_loglik(beta, X, y):
    eta = X @ beta
    p = 1.0 / (1.0 + np.exp(-eta))
    p = np.clip(p, 1e-10, 1 - 1e-10)
    W = p * (1 - p)
    XtWX = (X * W[:, None]).T @ X
    sign, logdet = np.linalg.slogdet(XtWX)
    ll = np.sum(y * np.log(p) + (1 - y) * np.log(1 - p)) + 0.5 * logdet
    return -ll


def firth_logit(X, y, max_iter=200, tol=1e-8):
    """
    X: (n, k) design matrix WITHOUT intercept column (intercept added internally).
    y: (n,) 0/1.
    Returns dict with beta (incl. intercept at index 0), se, or, p (Wald), and n/events.
    """
    X = np.asarray(X, float)
    y = np.asarray(y, float)
    n, k = X.shape
    Xd = np.column_stack([np.ones(n), X])  # intercept first
    beta = np.zeros(k + 1)
    for _ in range(max_iter):
        eta = Xd @ beta
        p = 1.0 / (1.0 + np.exp(-eta))
        p = np.clip(p, 1e-10, 1 - 1e-10)
        W = p * (1 - p)
        XtWX = (Xd * W[:, None]).T @ Xd
        XtWX_inv = np.linalg.pinv(XtWX)
        # hat diagonal
        WX = Xd * np.sqrt(W)[:, None]
        H = WX @ XtWX_inv @ WX.T
        h = np.clip(np.diag(H), 0, 1)
        # Firth-modified score
        U = Xd.T @ (y - p + h * (0.5 - p))
        step = XtWX_inv @ U
        beta_new = beta + step
        if np.max(np.abs(step)) < tol:
            beta = beta_new
            break
        beta = beta_new
    # covariance = inverse penalized information (use final XtWX_inv)
    se = np.sqrt(np.clip(np.diag(XtWX_inv), 0, None))
    z = beta / se
    pval = 2 * (1 - stats.norm.cdf(np.abs(z)))
    return {"beta": beta, "se": se, "or": np.exp(beta), "wald_p": pval,
            "n": n, "events": int(y.sum()), "names": ["intercept"] + [f"x{i}" for i in range(k)]}


def firth_lrt_p(X, y, idx):
    """Profile-penalized LRT p-value for covariate at column idx (0-based in X, no intercept)."""
    full = -_neg_pen_loglik(firth_logit(X, y)["beta"], np.column_stack([np.ones(len(y)), X]), y)
    Xr = np.delete(np.asarray(X, float), idx, axis=1)
    red_fit = firth_logit(Xr, y)
    red = -_neg_pen_loglik(red_fit["beta"], np.column_stack([np.ones(len(y)), Xr]), y)
    lr = 2 * (full - red)
    return float(1 - stats.chi2.cdf(lr, df=1))


if __name__ == "__main__":
    rng = np.random.default_rng(0)
    n = 100
    X = rng.normal(size=(n, 2))
    y = (rng.uniform(size=n) < 1 / (1 + np.exp(-(0.5 * X[:, 0] - 0.3 * X[:, 1])))).astype(int)
    fit = firth_logit(X, y)
    print("beta", fit["beta"], "OR", fit["or"], "wald_p", fit["wald_p"])
    print("LRT p x0", firth_lrt_p(X, y, 0))
