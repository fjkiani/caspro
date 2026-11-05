#!/usr/bin/env python3
"""
OBL#2 - Prove the label-artifact result is real, not constructed.

Goal (verbatim from the obligation):
  Prove the two AUROCs differ ONLY because the label column changed, and NOT
  because sample selection, scoring direction, or bootstrap methodology also
  changed when the label was switched.

Design:
  * ONE feature source of record: BriTROC-1 Nat Commun 2023 published source data
    (MOESM10 -> figure_4A.tsv), pivoted to patient x signature exposure.
  * TWO label sources, both on disk:
      - rclass    (RECIST-derived: PD/SD->resistant, CR/PR->sensitive)  -> 3 resistant / 37 sensitive (n=40)
      - pt_status (platinum-sensitivity at registration)                -> 10 resistant / 37 sensitive (n=47)
  * The 40-patient rclass cohort is an EXACT feature-subset of the 47-patient
    pt_status cohort (verified by feature fingerprint). The 7 dropped patients
    are 6 sensitive + 1 resistant (BRITROC-96).
  * Therefore label-swap and sample-selection are CONFOUNDED in the raw files.
    We decompose the 2x2 (label x cohort) so the confound is explicit, and we
    report the clean, apples-to-apples swap: SAME 40 patients, SAME feature
    vector (s7_rel), SAME scoring direction, SAME bootstrap -> change ONLY the label.

Everything held fixed across every AUROC in this script:
  - feature vector = s7_rel (relapse exposure of CN signature 7)
  - scoring direction: higher s7_rel -> more "resistant" (positive class = resistant)
  - roc_auc_score(y_resistant, s7_rel)  [sklearn, no direction flipping]
  - bootstrap: 1000 iterations, np.random.default_rng(42), stratified resample

Outputs:
  LABEL_SWAP_AUDIT.csv  - one row per patient (all 47), both labels, both cohorts,
                          the fixed feature vector, patient/sample linkage.
  obl2_auroc_summary.csv - the 2x2 AUROC table with CIs and the controlled swap.
"""
import json
import numpy as np
import pandas as pd
from sklearn.metrics import roc_auc_score
from scipy.stats import mannwhitneyu

SEED = 42
N_BOOT = 1000
DATA = "/workspace/obl_work/data/moesm10/source_data/figure_4A.tsv"
COHORT40 = "/mnt/shared-workspace/shared/serial_sae_validation/w2_britroc_cohort.csv"
PAIRED47 = "/mnt/shared-workspace/shared/serial_sae_validation/britroc/paired_exposures_full.csv"
OUT = "/mnt/results/serial_sae_validation/obligations"


def bootstrap_auroc(y, x, n_boot=N_BOOT, seed=SEED):
    """Stratified bootstrap CI for AUROC. Fixed method used for EVERY cell."""
    y = np.asarray(y, int)
    x = np.asarray(x, float)
    point = roc_auc_score(y, x)
    rng = np.random.default_rng(seed)
    pos = np.where(y == 1)[0]
    neg = np.where(y == 0)[0]
    boots = []
    for _ in range(n_boot):
        bp = rng.choice(pos, size=len(pos), replace=True)
        bn = rng.choice(neg, size=len(neg), replace=True)
        idx = np.concatenate([bp, bn])
        yb, xb = y[idx], x[idx]
        if len(np.unique(yb)) < 2:
            continue
        boots.append(roc_auc_score(yb, xb))
    lo, hi = np.percentile(boots, [2.5, 97.5])
    return point, lo, hi, len(boots)


def mwu_p(y, x):
    y = np.asarray(y, int)
    x = np.asarray(x, float)
    a = x[y == 1]
    b = x[y == 0]
    if len(a) == 0 or len(b) == 0:
        return np.nan
    return mannwhitneyu(a, b, alternative="two-sided").pvalue


def main():
    # ---- 1. Feature source of record: published exposures, pivot to patient x signature ----
    f = pd.read_csv(DATA, sep="\t")
    f["value"] = pd.to_numeric(f["value"], errors="coerce")
    rel = f[f["group"] == "rlps"].pivot_table(index="PATIENT_ID", columns="signature", values="value", aggfunc="mean")
    diag = f[f["group"] == "arx"].pivot_table(index="PATIENT_ID", columns="signature", values="value", aggfunc="mean")
    # sample-id linkage (one relapse + one diagnosis sample id per patient, for the receipt)
    rel_sid = f[f["group"] == "rlps"].groupby("PATIENT_ID")["SAMPLE_ID"].apply(lambda s: ";".join(sorted(set(s))))
    diag_sid = f[f["group"] == "arx"].groupby("PATIENT_ID")["SAMPLE_ID"].apply(lambda s: ";".join(sorted(set(s))))
    paired = sorted(rel.index.intersection(diag.index))  # 47 paired patients

    # ---- 2. Two label sources ----
    paired47 = pd.read_csv(PAIRED47, index_col=0)  # BRITROC-id -> pt_status (10R)
    cohort40 = pd.read_csv(COHORT40)               # integer index -> rclass (3R)

    # map cohort40 integer rows to BRITROC-ids by exact feature fingerprint
    featcols = [c for c in paired47.columns if c != "pt_status"]
    pf = paired47[featcols].apply(pd.to_numeric, errors="coerce")
    cohort40[featcols] = cohort40[featcols].apply(pd.to_numeric, errors="coerce")
    mapping = {}
    for _, crow in cohort40.iterrows():
        cvals = crow[featcols].values.astype(float)
        for pid, prow in pf.iterrows():
            if np.allclose(prow.values.astype(float), cvals, atol=1e-6, equal_nan=True):
                mapping[int(crow["index"])] = pid
                break
    rclass_by_pid = {mapping[int(r["index"])]: r["rclass"] for _, r in cohort40.iterrows() if int(r["index"]) in mapping}

    # ---- 3. Build the per-patient audit table (all 47 paired patients) ----
    rows = []
    for pid in paired:
        rows.append({
            "patient_id": pid,
            "diag_sample_id": diag_sid.get(pid, ""),
            "rel_sample_id": rel_sid.get(pid, ""),
            # the FIXED feature vector used for every AUROC
            "s7_rel": rel.loc[pid, "s7"],
            "s7_diag": diag.loc[pid, "s7"],
            # label source A: RECIST-derived rclass (only defined for the 40-subset)
            "label_rclass": rclass_by_pid.get(pid, "NOT_IN_RCLASS_COHORT"),
            # label source B: platinum-sensitivity at registration
            "label_pt_status": paired47.loc[pid, "pt_status"],
            "in_rclass40_cohort": pid in rclass_by_pid,
            "in_ptstatus47_cohort": True,
        })
    audit = pd.DataFrame(rows).sort_values("patient_id").reset_index(drop=True)
    # binary outcome vectors (positive class = resistant)
    audit["y_rclass"] = (audit["label_rclass"] == "resistant").astype("Int64")
    audit.loc[~audit["in_rclass40_cohort"], "y_rclass"] = pd.NA
    audit["y_pt_status"] = (audit["label_pt_status"] == "resistant").astype(int)
    audit.to_csv(f"{OUT}/tables/LABEL_SWAP_AUDIT.csv", index=False)

    # ---- 4. The 2x2 AUROC table: label {rclass, pt_status} x cohort {40, 47} ----
    results = []

    def add(name, sub, ycol, note):
        y = sub[ycol].astype(int).values
        x = sub["s7_rel"].values
        nR = int(y.sum())
        nS = int((y == 0).sum())
        if nR == 0 or nS == 0:
            results.append({"analysis": name, "n": len(sub), "n_resistant": nR, "n_sensitive": nS,
                            "auroc": np.nan, "ci_lo": np.nan, "ci_hi": np.nan, "mwu_p": np.nan,
                            "n_boot_valid": 0, "note": note + " [degenerate: one class empty]"})
            return
        auroc, lo, hi, nb = bootstrap_auroc(y, x)
        p = mwu_p(y, x)
        results.append({"analysis": name, "n": len(sub), "n_resistant": nR, "n_sensitive": nS,
                        "auroc": round(auroc, 4), "ci_lo": round(lo, 4), "ci_hi": round(hi, 4),
                        "mwu_p": round(p, 4), "n_boot_valid": nb, "note": note})

    # 40-patient cohort
    c40 = audit[audit["in_rclass40_cohort"]].copy()
    add("rclass_on_40", c40, "y_rclass", "RECIST label, 40-pt subset (headline setup)")
    add("pt_status_on_40", c40, "y_pt_status", "registration label, SAME 40 pts, SAME feature -> ONLY label changed")
    # 47-patient cohort
    add("pt_status_on_47", audit, "y_pt_status", "registration label, full 47-pt paired cohort")
    # rclass cannot be evaluated on 47 (undefined for the 7 extra patients) -> report explicitly
    results.append({"analysis": "rclass_on_47", "n": 47, "n_resistant": np.nan, "n_sensitive": np.nan,
                    "auroc": np.nan, "ci_lo": np.nan, "ci_hi": np.nan, "mwu_p": np.nan, "n_boot_valid": 0,
                    "note": "UNDEFINED: rclass label does not exist for the 7 extra patients (data limitation, not a choice)"})

    res = pd.DataFrame(results)
    res.to_csv(f"{OUT}/tables/obl2_auroc_summary.csv", index=False)

    # ---- 5. Provenance / invariants receipt ----
    dropped = sorted(set(paired) - set(c40["patient_id"]))
    invariants = {
        "feature_vector": "s7_rel (relapse exposure, CN signature 7)",
        "feature_source": "BriTROC-1 Nat Commun 2023 MOESM10 figure_4A.tsv (published)",
        "scoring_direction": "higher s7_rel => resistant (positive class = resistant); identical for both labels; no direction flip",
        "auroc_fn": "sklearn.metrics.roc_auc_score(y_resistant, s7_rel)",
        "bootstrap": f"{N_BOOT} iters, np.random.default_rng({SEED}), stratified by class",
        "label_A_rclass": "RECIST-derived (PD/SD->resistant, CR/PR->sensitive); 3R/37S; defined for 40 pts",
        "label_B_pt_status": "platinum-sensitivity at registration; 10R/37S; defined for 47 pts",
        "cohort_relationship": "the 40-pt rclass cohort is an EXACT feature-subset of the 47-pt pt_status cohort",
        "patients_dropped_from_47_to_40": dropped,
        "dropped_status_breakdown": paired47.loc[dropped, "pt_status"].value_counts().to_dict(),
        "confound_note": ("In the raw on-disk files the label swap is CONFOUNDED with sample selection "
                          "(40 vs 47). The controlled swap 'rclass_on_40' vs 'pt_status_on_40' isolates "
                          "the label effect on a FIXED 40-patient feature matrix."),
    }
    with open(f"{OUT}/tables/obl2_invariants.json", "w") as fh:
        json.dump(invariants, fh, indent=2)

    print("=== LABEL_SWAP_AUDIT.csv (head) ===")
    print(audit.head(8).to_string(index=False))
    print("\n=== 2x2 AUROC table (label x cohort) ===")
    print(res.to_string(index=False))
    print("\n=== dropped 40->? no; 47->40 dropped 7 ===")
    print(paired47.loc[dropped, "pt_status"])
    print("\nWrote LABEL_SWAP_AUDIT.csv, obl2_auroc_summary.csv, obl2_invariants.json")


if __name__ == "__main__":
    main()
