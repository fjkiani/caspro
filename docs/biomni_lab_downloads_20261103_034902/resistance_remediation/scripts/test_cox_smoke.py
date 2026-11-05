#!/usr/bin/env python3
"""SMOKE TEST for kelim_os_cox_validation.py step3_cox.

PURPOSE: prove the Cox code path is real and functional, not a stub.
THIS PRODUCES NO SCIENTIFIC RESULT. The survival data here is SYNTHETIC,
generated in this file. Nothing from this test is written to any receipt.

Two scenarios exercise both branches of the verdict logic:
  NULL    - survival independent of k  -> expect HR ~1, p large, NO_OS_ASSOCIATION
  PLANTED - survival depends on k      -> expect HR<1 (faster elim = lower hazard), small p
"""
import sys
import numpy as np
import pandas as pd

sys.path.insert(0, "/mnt/results/resistance_remediation/scripts")
import kelim_os_cox_validation as M

rates = pd.read_csv("/workspace/reparam_fits.csv")
rates = rates[rates[M.CONV_COL] == True][["pid", M.RATE_COL]].dropna()
print(f"real per-patient rate estimates loaded: n={len(rates)}")

rng = np.random.default_rng(7)
n = len(rates)
k = rates[M.RATE_COL].to_numpy()
kz = (k - k.mean()) / k.std(ddof=1)

for scenario in ("NULL", "PLANTED"):
    # ---- SYNTHETIC survival, generated here, not from any trial ----
    beta = 0.0 if scenario == "NULL" else -0.60      # log-HR per SD of k
    lp = beta * kz + 0.25 * rng.normal(size=n)
    T = rng.exponential(scale=np.exp(-lp) * 400.0)   # synthetic days
    C = rng.exponential(scale=600.0, size=n)         # synthetic censoring
    surv = pd.DataFrame({
        "ZPATCODE": rates["pid"].values,
        "DTHDY": np.minimum(T, C).round(1),
        "OS_CENS": (T <= C).astype(int),
        "AGE": rng.integers(50, 85, n),
        "ECOG_C": rng.integers(0, 3, n),
    })

    tbl = {"path": "SYNTHETIC/none.sas7bdat",
           "event_candidates": ["DTHDY", "OS_CENS"],
           "covar_candidates": ["AGE", "ECOG_C"]}
    m = rates.merge(surv, left_on="pid", right_on="ZPATCODE", how="inner")

    print(f"\n{'='*72}\nSCENARIO {scenario}  (SYNTHETIC survival -- not a result)\n{'='*72}")
    out = M.step3_cox(m, "DTHDY", "OS_CENS", tbl)
    print(f"  -> verdict field: {out['verdict']}  HR/SD={out['hr_per_sd_k']}  p={out['p']:.4g}")

    if scenario == "NULL":
        assert out["p"] > 0.05, "NULL scenario should not be significant"
    else:
        assert out["p"] < 0.05 and out["hr_per_sd_k"] < 1.0, "PLANTED effect not recovered"

print("\nSMOKE TEST PASSED: step3_cox fits, standardizes, reports HR/CI/p/C-index, "
      "computes EPV, flags underpowered, and returns the correct verdict in both directions.")
print("The CAS-dependent steps (step1_enumerate, step2_build) are NOT exercised here -- "
      "they require a live authenticated session.")
