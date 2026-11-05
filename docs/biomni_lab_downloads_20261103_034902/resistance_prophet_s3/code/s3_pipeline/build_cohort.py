#!/usr/bin/env python3
"""
build_cohort.py -- rebuild the BriTROC-1 S3 patient-level table from verified source.

Faithfully replicates the join performed by the archived
`obl3_build_patient_table.py` so the rebuilt table can be diffed cell-by-cell
against the archived `obl3_patient_master.csv`. Divergences from that script are
NOT silently corrected; `build()` reproduces it exactly and the known
questionable behaviours are recorded in `REPLICATION_NOTES` and re-tested by
`build(strict_missing=True)`.

Endpoint: pt_sensitivity_at_reg -- platinum classification at trial registration,
the field the source study uses for "primary platinum resistant". See
ENDPOINT_CONTRACT_v1 for what this field can and cannot support.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import numpy as np
import pandas as pd

HR_GENES = ["BRCA1", "BRCA2", "BARD1", "BRIP1", "PALB2",
            "RAD51B", "RAD51C", "RAD51D", "CDK12"]
BRCA_GENES = ["BRCA1", "BRCA2"]
SIGS = [f"s{i}" for i in range(1, 8)]

REPLICATION_NOTES = {
    "label_source_precedence": (
        "archived script takes pt_sensitivity_at_reg from figure_1B_layer_1 first and "
        "falls back to figure_2; replicated exactly"
    ),
    "resistant_encoding": (
        "archived script computes resistant = (pt_status == 'resistant').astype(Int64), "
        "which silently encodes a MISSING platinum label as resistant=0 rather than NA. "
        "Replicated for the diff; strict_missing=True sets those rows to NA and the "
        "difference in downstream denominators is reported."
    ),
    "exposure_aggregation": (
        "multiple samples per patient/timepoint are averaged (pivot_table aggfunc='mean'); "
        "no sample-level QC filter is applied because per-sample QC is not in the open data"
    ),
}


def _patient_num(pid: str) -> int:
    return int(str(pid).split("-")[-1])


def _norm_status(x):
    if pd.isna(x):
        return np.nan
    x = str(x).lower()
    if "resist" in x:
        return "resistant"
    if "sensit" in x:
        return "sensitive"
    return np.nan


@dataclass
class CohortBuild:
    master: pd.DataFrame
    reconciliation: pd.DataFrame
    notes: dict = field(default_factory=dict)


def build(source_dir: str | Path, strict_missing: bool = False) -> CohortBuild:
    src = Path(source_dir)

    # ---- CN signature exposures: diagnosis ('arx') and relapse ('rlps') ----
    f = pd.read_csv(src / "figure_4A.tsv", sep="\t")
    f["value"] = pd.to_numeric(f["value"], errors="coerce")
    diag = f[f["group"] == "arx"].pivot_table(
        index="PATIENT_ID", columns="signature", values="value", aggfunc="mean")
    rel = f[f["group"] == "rlps"].pivot_table(
        index="PATIENT_ID", columns="signature", values="value", aggfunc="mean")
    diag.columns = [f"{c}_diag" for c in diag.columns]
    rel.columns = [f"{c}_rel" for c in rel.columns]
    expo = diag.join(rel, how="outer")
    expo["britroc_number"] = [_patient_num(p) for p in expo.index]
    expo = expo.reset_index().rename(columns={"PATIENT_ID": "patient_id"})

    # ---- survival + the platinum endpoint ----
    s = pd.read_csv(src / "figure_1B_layer_1.tsv", sep="\t")
    os_rows = s[s["event"] == "os"].copy()
    os_rows["os_time"] = pd.to_numeric(os_rows["time"], errors="coerce")
    os_rows["os_event"] = (os_rows["status"] == "deceased").astype(int)
    surv = (os_rows[["britroc_number", "pt_sensitivity_at_reg", "os_time", "os_event"]]
            .drop_duplicates("britroc_number"))

    # ---- confounders ----
    c = pd.read_csv(src / "figure_2.tsv", sep="\t")
    vt = c["variant_type"].astype(str)
    c["is_mut"] = (vt.str.contains("mutation", case=False)
                   & ~vt.str.contains("no mutation", case=False))
    brca_status = (c[c["gene_list"].isin(BRCA_GENES)]
                   .groupby("britroc_number")["is_mut"].any().rename("brca_mut"))
    hr_status = (c[c["gene_list"].isin(HR_GENES)]
                 .groupby("britroc_number")["is_mut"].any().rename("hr_gene_mut"))
    demo = (c.drop_duplicates("britroc_number")
            .set_index("britroc_number")[["age", "histological_type",
                                          "tumour_stage_at_diagnosis", "num_lines",
                                          "pt_sensitivity_at_reg"]])
    conf = demo.join(brca_status).join(hr_status).reset_index()

    # ---- assemble (archived precedence: figure_1B label first, figure_2 fallback) ----
    m = expo.merge(surv, on="britroc_number", how="left", suffixes=("", "_surv"))
    m = m.merge(conf, on="britroc_number", how="left", suffixes=("", "_conf"))
    m["pt_status"] = m["pt_sensitivity_at_reg"].map(_norm_status)
    m.loc[m["pt_status"].isna(), "pt_status"] = m["pt_sensitivity_at_reg_conf"].map(_norm_status)
    m["resistant"] = (m["pt_status"] == "resistant").astype("Int64")
    if strict_missing:
        m.loc[m["pt_status"].isna(), "resistant"] = pd.NA

    cols = (["patient_id", "britroc_number", "pt_status", "resistant"]
            + [f"{x}_diag" for x in SIGS] + [f"{x}_rel" for x in SIGS]
            + ["os_time", "os_event", "age", "histological_type",
               "tumour_stage_at_diagnosis", "num_lines", "brca_mut", "hr_gene_mut"])
    cols = [c_ for c_ in cols if c_ in m.columns]
    master = m[cols].drop_duplicates("britroc_number").reset_index(drop=True)

    recon = reconcile(s, master)
    notes = {
        "endpoint_field": "pt_sensitivity_at_reg",
        "endpoint_origin": "platinum classification recorded at trial registration (source study field)",
        "time_origin": ("registration; a status at registration, not a time-to-event "
                        "derived in this analysis -- no PFI field exists in the open data"),
        "n_source_clinical_patients": int(s["britroc_number"].nunique()),
        "n_rows_built": int(len(master)),
        "strict_missing": bool(strict_missing),
        "replication_notes": REPLICATION_NOTES,
    }
    return CohortBuild(master=master, reconciliation=recon, notes=notes)


def reconcile(clinical: pd.DataFrame, m: pd.DataFrame) -> pd.DataFrame:
    """Explicit attrition ladder from the full clinical cohort to each analysis set."""
    diag_cols = [f"{x}_diag" for x in SIGS]
    cov_cols = ["age", "tumour_stage_at_diagnosis", "num_lines"]
    clin = clinical.drop_duplicates("britroc_number")
    steps = []

    def _row(label, lab_series, n_total, reason):
        n_res = int((lab_series == "resistant").sum())
        n_sen = int((lab_series == "sensitive").sum())
        return {
            "step": label,
            "n_patients": int(n_total),
            "n_resistant": n_res,
            "n_sensitive": n_sen,
            "n_unlabelled": int(n_total - n_res - n_sen),
            "prevalence_among_labelled": round(n_res / (n_res + n_sen), 4) if (n_res + n_sen) else np.nan,
            "reason_for_attrition": reason,
        }

    steps.append(_row("A_source_clinical_cohort", clin["pt_sensitivity_at_reg"],
                      len(clin), "-- all patients in figure_1B_layer_1"))
    lab = clin[clin["pt_sensitivity_at_reg"].notna()]
    steps.append(_row("B_with_platinum_label", lab["pt_sensitivity_at_reg"], len(lab),
                      "platinum status at registration recorded"))
    hd = m[m[diag_cols].notna().all(axis=1)]
    steps.append(_row("C_complete_diagnosis_exposures", hd["pt_status"], len(hd),
                      "evaluable diagnosis-stage CN sample for all 7 signatures"))
    lb = hd[hd["pt_status"].notna()]
    steps.append(_row("D_analysis_set_98_equivalent", lb["pt_status"], len(lb),
                      "+ platinum label present (OBL#3 primary analysis set)"))
    cc = lb[lb[cov_cols].notna().all(axis=1)]
    steps.append(_row("E_analysis_set_67_equivalent", cc["pt_status"], len(cc),
                      "+ age/stage/num_lines complete (Brenus trackA + OBL#3 adjusted set)"))
    return pd.DataFrame(steps)


def selection_test(master: pd.DataFrame) -> dict:
    """Is inclusion in each analysis set associated with the outcome or with s3 itself?

    If retained patients differ in resistance prevalence or in s3 exposure, the
    smaller set's effect estimate is a selected estimate, not a cohort estimate.
    """
    from scipy.stats import fisher_exact, mannwhitneyu

    diag_cols = [f"{x}_diag" for x in SIGS]
    cov_cols = ["age", "tumour_stage_at_diagnosis", "num_lines"]

    lab = master[master["pt_status"].notna()].copy()
    lab["res"] = (lab["pt_status"] == "resistant").astype(int)
    lab["in98"] = lab[diag_cols].notna().all(axis=1)
    out = {}

    t1 = pd.crosstab(lab["in98"], lab["res"])
    if t1.shape == (2, 2):
        orr, p = fisher_exact(t1.to_numpy())
        out["labelled_cohort_vs_set98"] = {
            "table_rows_in98_False_True_cols_sens_res": t1.to_numpy().tolist(),
            "odds_ratio": float(orr), "fisher_p": float(p),
            "prevalence_in": round(float(lab.loc[lab["in98"], "res"].mean()), 4),
            "prevalence_out": round(float(lab.loc[~lab["in98"], "res"].mean()), 4),
        }

    s98 = lab[lab["in98"]].copy()
    s98["in67"] = s98[cov_cols].notna().all(axis=1)
    t2 = pd.crosstab(s98["in67"], s98["res"])
    if t2.shape == (2, 2):
        orr, p = fisher_exact(t2.to_numpy())
        out["set98_vs_set67"] = {
            "table_rows_in67_False_True_cols_sens_res": t2.to_numpy().tolist(),
            "odds_ratio": float(orr), "fisher_p": float(p),
            "prevalence_in": round(float(s98.loc[s98["in67"], "res"].mean()), 4),
            "prevalence_out": round(float(s98.loc[~s98["in67"], "res"].mean()), 4),
        }

    a = s98.loc[s98["in67"], "s3_diag"].dropna()
    b = s98.loc[~s98["in67"], "s3_diag"].dropna()
    if len(a) > 2 and len(b) > 2:
        u, p = mannwhitneyu(a, b, alternative="two-sided")
        out["s3_diag_retained_vs_dropped_in67"] = {
            "n_retained": int(len(a)), "n_dropped": int(len(b)),
            "median_retained": round(float(a.median()), 4),
            "median_dropped": round(float(b.median()), 4),
            "mannwhitney_p": float(p),
        }
    return out


def diff_tables(rebuilt: pd.DataFrame, archived: pd.DataFrame, key: str = "britroc_number") -> dict:
    """Cell-by-cell diff. Reproduction is only claimed if this comes back clean."""
    r = rebuilt.set_index(key).sort_index()
    a = archived.set_index(key).sort_index()
    shared_cols = [c for c in r.columns if c in a.columns]
    out = {
        "n_rows_rebuilt": int(len(r)),
        "n_rows_archived": int(len(a)),
        "keys_only_in_rebuilt": sorted(set(r.index) - set(a.index)),
        "keys_only_in_archived": sorted(set(a.index) - set(r.index)),
        "cols_only_in_rebuilt": [c for c in r.columns if c not in a.columns],
        "cols_only_in_archived": [c for c in a.columns if c not in r.columns],
        "per_column": {},
    }
    common = sorted(set(r.index) & set(a.index))
    total_mismatch = 0
    for c in shared_cols:
        rv, av = r.loc[common, c], a.loc[common, c]
        rn = pd.to_numeric(rv, errors="coerce")
        an = pd.to_numeric(av, errors="coerce")
        numeric = rn.notna().any() and an.notna().any()
        if numeric:
            both_nan = rn.isna() & an.isna()
            close = np.isclose(rn.astype(float), an.astype(float),
                               rtol=0, atol=1e-9, equal_nan=True)
            bad = ~(close | both_nan)
            maxabs = float(np.nanmax(np.abs(rn.astype(float) - an.astype(float)))) if len(common) else 0.0
        else:
            rs = rv.astype(str).where(rv.notna(), "<NA>")
            as_ = av.astype(str).where(av.notna(), "<NA>")
            bad = rs != as_
            maxabs = np.nan
        nbad = int(bad.sum())
        total_mismatch += nbad
        out["per_column"][c] = {
            "n_mismatch": nbad,
            "max_abs_diff": (None if (isinstance(maxabs, float) and np.isnan(maxabs)) else maxabs),
            "example_keys": [int(k) for k in np.asarray(common)[np.asarray(bad)][:5]],
        }
    out["total_mismatched_cells"] = total_mismatch
    out["clean"] = bool(total_mismatch == 0
                        and not out["keys_only_in_rebuilt"]
                        and not out["keys_only_in_archived"])
    return out
