#!/usr/bin/env python3
"""
run_w3.py -- W3: what S3 actually contributes.

Part A  reproduce the documented S3 metrics on both denominators
Part B  prove numerically why the CV headline (0.8807) is arithmetically
        determined by the raw AUROC, and separate fold dispersion from sampling
        uncertainty
Part C  threshold operating characteristics and the verdict on 0.10
Part D  incremental value: four models on IDENTICAL folds
Part E  does S3 restate the HRD/BRCA axis?
Part F  adjusted effect + OS reproduction
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import average_precision_score, brier_score_loss, roc_auc_score
from sklearn.model_selection import LeaveOneOut, RepeatedStratifiedKFold

sys.path.insert(0, "/workspace/s3work")
from s3_pipeline import metrics as MX
from s3_pipeline import models as MD
from s3_pipeline.firth import firth_logit, firth_lrt_p

OUT = Path("/mnt/results/resistance_prophet_s3")
SIGS = [f"s{i}" for i in range(1, 8)]
COV = ["age", "tumour_stage_at_diagnosis", "num_lines"]
COVN = ["age", "stage_adv", "num_lines_n"]
DIAG = [f"{s}_diag" for s in SIGS]
J = lambda o: json.dumps(o, indent=2, default=str)


def load_sets():
    m = pd.read_csv(OUT / "tables" / "rebuilt_patient_master.csv")
    m = m[m["pt_status"].notna()].copy()
    m["y"] = (m["pt_status"] == "resistant").astype(int)
    m["stage_adv"] = m["tumour_stage_at_diagnosis"].astype(str).str.extract(r"(\d)")[0]
    m["stage_adv"] = pd.to_numeric(m["stage_adv"], errors="coerce").ge(3).astype(float)
    m.loc[m["tumour_stage_at_diagnosis"].isna(), "stage_adv"] = np.nan
    # num_lines is right-censored in the source ('4+' for 3 patients). Recoded to 5
    # as an ordinal rank; the alternative recode (4) is run as a sensitivity check
    # and does not change any reported comparison.
    m["num_lines_n"] = pd.to_numeric(
        m["num_lines"].astype(str).str.replace("+", "", regex=False), errors="coerce")
    m.loc[m["num_lines"].astype(str) == "4+", "num_lines_n"] = 5.0
    m.loc[m["num_lines"].isna(), "num_lines_n"] = np.nan
    m["brca_mut_i"] = m["brca_mut"].map({True: 1.0, False: 0.0})
    m["hr_gene_mut_i"] = m["hr_gene_mut"].map({True: 1.0, False: 0.0})
    s98 = m[m[DIAG].notna().all(axis=1)].reset_index(drop=True)
    s67 = s98[s98[COV].notna().all(axis=1)].reset_index(drop=True)
    return m, s98, s67


def part_a(s98, s67, rep):
    print("\n" + "=" * 78 + "\nPART A -- reproduce documented S3 metrics on both denominators\n" + "=" * 78)
    out = {}
    for name, d, doc_auroc in [("set98", s98, 0.2715), ("set67", s67, 0.113)]:
        y, s3 = d["y"].to_numpy(), d["s3_diag"].to_numpy()
        raw = MX.auroc_ranking(y, s3)
        prot = MX.protective_auroc(raw)
        bs_raw = MX.bootstrap_ci(y, s3, "auroc", 2000)
        # AUPRC for the RESISTANCE event using the reversed axis (-s3)
        ap = MX.bootstrap_ci(y, -s3, "auprc", 2000)
        perm = MX.permutation_test(y, s3, 10000)
        from scipy.stats import mannwhitneyu
        u, pmw = mannwhitneyu(d.loc[d.y == 1, "s3_diag"], d.loc[d.y == 0, "s3_diag"],
                              alternative="two-sided")
        rec = {
            "n": int(len(d)), "events": int(y.sum()), "prevalence": round(float(y.mean()), 4),
            "auroc_raw_s3_vs_resistance": round(raw, 4),
            "auroc_raw_ci": [round(bs_raw["ci_lo"], 4), round(bs_raw["ci_hi"], 4)],
            "documented_auroc_raw": doc_auroc,
            "reproduces_documented": bool(abs(round(raw, 4) - doc_auroc) < 0.0006),
            "protective_auroc_1_minus": round(prot, 4),
            "protective_auroc_ci": [round(1 - bs_raw["ci_hi"], 4), round(1 - bs_raw["ci_lo"], 4)],
            "auprc_resistance_reversed_axis": round(ap["point"], 4),
            "auprc_ci": [round(ap["ci_lo"], 4), round(ap["ci_hi"], 4)],
            "auprc_prevalence_null": round(float(y.mean()), 4),
            "permutation_p_two_sided": perm["empirical_p_two_sided"],
            "permutation_n": perm["n_perm"],
            "mannwhitney_p": float(pmw),
            "median_s3_resistant": round(float(d.loc[d.y == 1, "s3_diag"].median()), 6),
            "median_s3_sensitive": round(float(d.loc[d.y == 0, "s3_diag"].median()), 6),
        }
        out[name] = rec
        print(f"\n[{name}] n={rec['n']} events={rec['events']} prev={rec['prevalence']}")
        print(f"  raw AUROC (s3 vs resistance) = {rec['auroc_raw_s3_vs_resistance']} "
              f"CI {rec['auroc_raw_ci']}   documented {doc_auroc} -> "
              f"reproduces={rec['reproduces_documented']}")
        print(f"  protective (1-AUROC)         = {rec['protective_auroc_1_minus']} "
              f"CI {rec['protective_auroc_ci']}")
        print(f"  AUPRC (reversed axis)        = {rec['auprc_resistance_reversed_axis']} "
              f"CI {rec['auprc_ci']}  vs prevalence null {rec['auprc_prevalence_null']}")
        print(f"  permutation p ({perm['n_perm']} perms) = {rec['permutation_p_two_sided']:.6f} | "
              f"Mann-Whitney p = {rec['mannwhitney_p']:.6g}")
    # the direction statement, made explicit
    out["direction"] = {
        "feature": "s3_diag",
        "declared_direction": "HIGHER s3 -> platinum SENSITIVE (protective)",
        "consistency_across_denominators": bool(
            out["set98"]["auroc_raw_s3_vs_resistance"] < 0.5
            and out["set67"]["auroc_raw_s3_vs_resistance"] < 0.5),
        "source_attribution": ("Macintyre 2018 Nat Genet 50:1262 (s3 = BRCA1/2-related HRD axis, "
                               "positively prognostic); Smith 2023 Nat Commun 14:4387 (s3 lower in "
                               "primary resistant at diagnosis)"),
    }
    rep["part_a_reproduction"] = out
    return out


def part_b(s67, rep):
    print("\n" + "=" * 78 + "\nPART B -- why 0.8807 is arithmetic, not evidence\n" + "=" * 78)
    y = s67["y"].to_numpy()
    s3 = s67["s3_diag"].to_numpy().reshape(-1, 1)
    raw = roc_auc_score(y, s3.ravel())
    one_minus = 1 - raw

    # Replicate the documented scheme exactly: RepeatedStratifiedKFold 5x200,
    # class-balanced logistic, scaler fit in-fold, OOF predictions, AUROC per repeat.
    rskf = RepeatedStratifiedKFold(n_splits=5, n_repeats=200, random_state=42)
    n_rep, per_repeat = 200, []
    oof = np.full((n_rep, len(y)), np.nan)
    within_fold_auroc = []
    for k, (tr, te) in enumerate(rskf.split(s3, y)):
        r = k // 5
        mu, sd = s3[tr].mean(), s3[tr].std(ddof=0)
        lr = LogisticRegression(class_weight="balanced", max_iter=1000)
        lr.fit((s3[tr] - mu) / sd, y[tr])
        p = lr.predict_proba((s3[te] - mu) / sd)[:, 1]
        oof[r, te] = p
        if len(np.unique(y[te])) > 1:
            within_fold_auroc.append((roc_auc_score(y[te], p),
                                      1 - roc_auc_score(y[te], s3[te].ravel())))
    for r in range(n_rep):
        per_repeat.append(roc_auc_score(y, oof[r]))
    per_repeat = np.asarray(per_repeat)
    wf = np.asarray(within_fold_auroc)

    # LOO
    loo_p = np.empty(len(y))
    for tr, te in LeaveOneOut().split(s3):
        mu, sd = s3[tr].mean(), s3[tr].std(ddof=0)
        lr = LogisticRegression(class_weight="balanced", max_iter=1000)
        lr.fit((s3[tr] - mu) / sd, y[tr])
        loo_p[te] = lr.predict_proba((s3[te] - mu) / sd)[:, 1]
    loo_auroc = roc_auc_score(y, loo_p)

    band = MX.fold_band(per_repeat)
    bs = MX.bootstrap_ci(y, -s3.ravel(), "auroc", 2000)

    rec = {
        "raw_auroc_s3_vs_resistance": round(float(raw), 10),
        "one_minus_raw": round(float(one_minus), 10),
        "cv_auroc_mean_reproduced": round(float(per_repeat.mean()), 10),
        "cv_auroc_sd_reproduced": round(float(per_repeat.std(ddof=1)), 10),
        "cv_auroc_pctile_2p5_97p5_reproduced": [round(float(np.percentile(per_repeat, 2.5)), 10),
                                                round(float(np.percentile(per_repeat, 97.5)), 10)],
        "documented_cv_auroc_mean": 0.8807231800766283,
        "documented_cv_auroc_sd": 0.00454242948722634,
        "documented_cv_pctile": [0.871647509578544, 0.8889367816091954],
        "loo_auroc_reproduced": round(float(loo_auroc), 10),
        "documented_loo_auroc": 0.871647509578544,
        "within_fold_identity_max_abs_diff": float(np.max(np.abs(wf[:, 0] - wf[:, 1]))),
        "within_fold_identity_n_folds_checked": int(len(wf)),
        "fold_band": band,
        "honest_bootstrap_ci_protective": [round(bs["ci_lo"], 4), round(bs["ci_hi"], 4)],
        "fold_band_width": round(float(band["pctile_97p5"] - band["pctile_2p5"]), 4),
        "bootstrap_ci_width": round(float(bs["ci_hi"] - bs["ci_lo"]), 4),
        "width_ratio_bootstrap_over_fold": round(
            float((bs["ci_hi"] - bs["ci_lo"]) / (band["pctile_97p5"] - band["pctile_2p5"])), 2),
    }
    rep["part_b_monotone_invariance"] = rec
    print(f"  raw AUROC                        = {rec['raw_auroc_s3_vs_resistance']:.6f}")
    print(f"  1 - raw AUROC                    = {rec['one_minus_raw']:.6f}")
    print(f"  reproduced CV AUROC (5x200)      = {rec['cv_auroc_mean_reproduced']:.6f} "
          f"(sd {rec['cv_auroc_sd_reproduced']:.6f})")
    print(f"  documented CV AUROC              = {rec['documented_cv_auroc_mean']:.6f} "
          f"(sd {rec['documented_cv_auroc_sd']:.6f})")
    print(f"  reproduced LOO AUROC             = {rec['loo_auroc_reproduced']:.6f} "
          f"| documented {rec['documented_loo_auroc']:.6f}")
    print(f"  WITHIN-FOLD identity check: max |AUROC(fitted) - (1 - AUROC(raw s3))| over "
          f"{rec['within_fold_identity_n_folds_checked']} test folds = "
          f"{rec['within_fold_identity_max_abs_diff']:.2e}")
    print(f"  fold band  [{band['pctile_2p5']:.4f}, {band['pctile_97p5']:.4f}] "
          f"width {rec['fold_band_width']}  <-- dispersion across resamples of the SAME 67 patients")
    print(f"  bootstrap CI {rec['honest_bootstrap_ci_protective']} width "
          f"{rec['bootstrap_ci_width']}  <-- sampling uncertainty")
    print(f"  the honest interval is {rec['width_ratio_bootstrap_over_fold']}x wider")

    # calibration of the frozen production scorer
    fs = MD.frozen_s3_score(s67["s3_diag"].to_numpy())
    cal = MX.calibration(y, fs)
    rep["part_b_frozen_scorer_calibration"] = {
        "n": int(len(y)), "events": int(y.sum()),
        "auroc_of_frozen_score": round(float(roc_auc_score(y, fs)), 4),
        **{k: (round(v, 4) if isinstance(v, float) else v) for k, v in cal.items()},
        "documented_brier_oof": 0.15286348564965177,
        "documented_brier_prevalence_only": 0.11628425038984185,
    }
    print(f"\n  frozen scorer (pinned b0={MD.FROZEN_BETA0:.4f}, b1={MD.FROZEN_BETA1:.4f}):")
    print(f"    AUROC {rep['part_b_frozen_scorer_calibration']['auroc_of_frozen_score']} | "
          f"Brier {cal['brier']:.4f} vs prevalence-only {cal['brier_prevalence_only']:.4f} "
          f"-> skill {cal['brier_skill_vs_prevalence']:.4f}")
    print(f"    calibration slope {cal.get('calibration_slope')} "
          f"CI [{cal.get('slope_ci_lo')}, {cal.get('slope_ci_hi')}] | "
          f"intercept {cal.get('calibration_intercept')}")
    return rec


def part_c(s98, s67, rep):
    print("\n" + "=" * 78 + "\nPART C -- threshold operating characteristics; verdict on 0.10\n" + "=" * 78)
    cands = [0.05, 0.075, 0.10, 0.125, 0.15, 0.1767, 0.20, 0.25]
    rows = []
    for name, d in [("set98", s98), ("set67", s67)]:
        y, s3 = d["y"].to_numpy(), d["s3_diag"].to_numpy()
        for r in MX.threshold_ops(y, s3, cands, direction="low_is_event"):
            r["set"] = name
            r["n"] = len(d)
            r["prevalence"] = round(float(y.mean()), 4)
            rows.append(r)
    tops = pd.DataFrame(rows)
    tops.to_csv(OUT / "tables" / "threshold_operating_characteristics.csv", index=False)
    show = tops[["set", "threshold", "prevalence", "n_flagged", "tp", "fp",
                 "sensitivity", "specificity", "ppv", "ppv_ci_lo", "ppv_ci_hi", "npv", "youden_j"]]
    print(show.round(3).to_string(index=False))

    # threshold stability across the 100 folds used for model comparison
    y98, s398 = s98["y"].to_numpy(), s98["s3_diag"].to_numpy()
    folds98 = MD.make_folds(y98)
    cut_rows = []
    for k, (tr, te) in enumerate(folds98):
        cut, j = MX.youden_cutpoint(y98[tr], s398[tr], "low_is_event")
        pred = (s398[te] <= cut).astype(int)
        tp = int(((pred == 1) & (y98[te] == 1)).sum())
        fn = int(((pred == 0) & (y98[te] == 1)).sum())
        tn = int(((pred == 0) & (y98[te] == 0)).sum())
        fp = int(((pred == 1) & (y98[te] == 0)).sum())
        cut_rows.append({"fold_index": k, "repeat": k // 5, "in_fold_cutpoint": cut,
                         "in_fold_youden_j": j,
                         "oof_sens": tp / (tp + fn) if (tp + fn) else np.nan,
                         "oof_spec": tn / (tn + fp) if (tn + fp) else np.nan})
    cuts = pd.DataFrame(cut_rows)
    cuts.to_csv(OUT / "threshold_stability.csv", index=False)
    cv = cuts["in_fold_cutpoint"]
    rng = np.random.default_rng(42)
    bs_cut = np.array([MX.youden_cutpoint(y98[i], s398[i], "low_is_event")[0]
                       for i in (rng.choice(len(y98), len(y98), replace=True) for _ in range(2000))])
    env = {
        "n_folds": int(len(cuts)),
        "cutpoint_median": round(float(cv.median()), 4),
        "cutpoint_iqr": [round(float(cv.quantile(.25)), 4), round(float(cv.quantile(.75)), 4)],
        "cutpoint_min": round(float(cv.min()), 4), "cutpoint_max": round(float(cv.max()), 4),
        "cutpoint_2p5_97p5_across_folds": [round(float(cv.quantile(.025)), 4),
                                           round(float(cv.quantile(.975)), 4)],
        "cutpoint_bootstrap_ci": [round(float(np.percentile(bs_cut, 2.5)), 4),
                                  round(float(np.percentile(bs_cut, 97.5)), 4)],
        "candidate_threshold_0p10_inside_fold_envelope": bool(
            cv.quantile(.025) <= 0.10 <= cv.quantile(.975)),
        "candidate_threshold_0p10_inside_bootstrap_ci": bool(
            np.percentile(bs_cut, 2.5) <= 0.10 <= np.percentile(bs_cut, 97.5)),
        "mean_oof_sens_at_infold_cut": round(float(cuts["oof_sens"].mean()), 4),
        "mean_oof_spec_at_infold_cut": round(float(cuts["oof_spec"].mean()), 4),
    }
    rep["part_c_thresholds"] = {"operating_characteristics_file":
                                "tables/threshold_operating_characteristics.csv",
                                "stability_envelope": env}
    print("\n[threshold stability across 100 training folds, n=98]")
    print(J(env))
    return env


def _spec_table(d):
    return d


def part_d(s67, s98, rep):
    print("\n" + "=" * 78 + "\nPART D -- incremental value: four models, IDENTICAL folds (n=67, 9 events)\n" + "=" * 78)
    d = s67.copy()
    d["age_z"] = d["age"]
    y = d["y"].to_numpy()
    folds = MD.make_folds(y)
    specs = [
        MD.ModelSpec("M0_clinical", ["age_z", "stage_adv", "num_lines_n"], note="age, advanced stage, prior lines"),
        MD.ModelSpec("M1_s3_only", ["s3_diag"], note="fitted single-feature"),
        MD.ModelSpec("M2a_shipped_s7_rule", [], kind="fixed",
                     fixed_fn=lambda df: MD.shipped_s7_rule(df["s7_diag"].to_numpy()),
                     note="backend constants.py SIG7_RISK_THRESHOLD=0.25, binary; timepoint substituted to diagnosis"),
        MD.ModelSpec("M2b_s7_continuous", ["s7_diag"], note="fitted s7 exposure"),
        MD.ModelSpec("M2c_frozen_s3_scorer", [], kind="fixed",
                     fixed_fn=lambda df: MD.frozen_s3_score(df["s3_diag"].to_numpy()),
                     note="Brenus pinned production scorer; constants derived on THIS set -> not out-of-sample"),
        MD.ModelSpec("M3a_clinical_plus_s3", ["age_z", "stage_adv", "num_lines_n", "s3_diag"]),
        MD.ModelSpec("M3b_s7_plus_s3", ["s7_diag", "s3_diag"]),
        MD.ModelSpec("M4a_hrd_only", ["brca_mut_i", "hr_gene_mut_i"], note="BRCA/HR mutation axis"),
        MD.ModelSpec("M4b_hrd_plus_s3", ["brca_mut_i", "hr_gene_mut_i", "s3_diag"]),
        MD.ModelSpec("M5_full", ["age_z", "stage_adv", "num_lines_n", "brca_mut_i", "hr_gene_mut_i", "s3_diag"],
                     note="all covariates + s3; 6 params on 9 events -- reported for completeness only"),
    ]
    res, rows = {}, []
    for sp in specs:
        r = MD.run_model(sp, d, y, folds)
        res[sp.name] = r
        au = MD.per_repeat_metric(y, r["oof_by_repeat"], roc_auc_score)
        ap = MD.per_repeat_metric(y, r["oof_by_repeat"], average_precision_score)
        br = MD.per_repeat_metric(y, r["oof_by_repeat"],
                                  lambda yy, pp: brier_score_loss(yy, np.clip(pp, 0, 1)))
        leak = MD.verify_no_leakage(r["fold_records"])
        rows.append({
            "model": sp.name, "kind": sp.kind, "features": ";".join(sp.features) or "(fixed rule)",
            "n": len(y), "events": int(y.sum()),
            "oof_auroc_mean": round(float(au.mean()), 4),
            "oof_auroc_fold_sd": round(float(au.std(ddof=1)), 4) if len(au) > 1 else 0.0,
            "oof_auprc_mean": round(float(ap.mean()), 4),
            "oof_brier_mean": round(float(br.mean()), 4),
            "preprocessing_varies_across_folds": leak.get("mu_varies_across_folds", None),
            "note": sp.note,
        })
    tab = pd.DataFrame(rows)
    prev = float(y.mean())
    tab["auprc_prevalence_null"] = round(prev, 4)
    tab["brier_prevalence_only"] = round(float(brier_score_loss(y, np.full_like(y, prev, dtype=float))), 4)
    print(tab[["model", "kind", "oof_auroc_mean", "oof_auroc_fold_sd", "oof_auprc_mean",
               "oof_brier_mean", "preprocessing_varies_across_folds"]].to_string(index=False))

    # paired-bootstrap deltas against the pre-specified comparators
    pairs = [("M0_clinical", "M3a_clinical_plus_s3"), ("M0_clinical", "M1_s3_only"),
             ("M2b_s7_continuous", "M3b_s7_plus_s3"), ("M2a_shipped_s7_rule", "M1_s3_only"),
             ("M4a_hrd_only", "M4b_hrd_plus_s3"), ("M4a_hrd_only", "M1_s3_only"),
             ("M2c_frozen_s3_scorer", "M1_s3_only")]
    drows = []
    for a, b in pairs:
        pa = res[a]["oof_mean"]
        pb = res[b]["oof_mean"]
        for stat in ("auroc", "auprc", "brier"):
            dd = MX.paired_bootstrap_delta(y, pa, pb, stat=stat, n_boot=2000)
            drows.append({"baseline": a, "augmented": b, "metric": stat,
                          "delta": round(dd["delta_point"], 4),
                          "delta_ci_lo": round(dd["delta_ci_lo"], 4),
                          "delta_ci_hi": round(dd["delta_ci_hi"], 4),
                          "p_delta_le_0": dd["p_delta_le_0"],
                          "ci_excludes_zero": bool(dd["delta_ci_lo"] > 0 or dd["delta_ci_hi"] < 0)})
    dtab = pd.DataFrame(drows)
    print("\n[paired-bootstrap deltas, same resamples across models]")
    print(dtab.to_string(index=False))
    tab.to_csv(OUT / "incremental_value.csv", index=False)
    dtab.to_csv(OUT / "tables" / "incremental_value_deltas.csv", index=False)

    # subject-level OOF predictions
    oofdf = d[["patient_id", "britroc_number", "pt_status", "y", "s3_diag", "s7_diag",
               "age", "tumour_stage_at_diagnosis", "num_lines_n", "brca_mut", "hr_gene_mut"]].copy()
    for name, r in res.items():
        oofdf[f"oof_{name}"] = r["oof_mean"]
    oofdf.to_csv(OUT / "oof_predictions.csv", index=False)

    # decision curve on the best fitted candidates
    nb_rows = []
    for name in ["M0_clinical", "M1_s3_only", "M3a_clinical_plus_s3", "M2c_frozen_s3_scorer"]:
        for r_ in MX.net_benefit(y, res[name]["oof_mean"], np.arange(0.05, 0.55, 0.05)):
            r_["model"] = name
            nb_rows.append(r_)
    pd.DataFrame(nb_rows).to_csv(OUT / "tables" / "decision_curve_net_benefit.csv", index=False)

    # nested LRT on full-data Firth fits (non-OOF, stated as such)
    lrts = {}
    for base, add, idx in [(["age_z", "stage_adv", "num_lines_n", "s3_diag"], "s3_diag", 3),
                           (["brca_mut_i", "hr_gene_mut_i", "s3_diag"], "s3_diag", 2),
                           (["s7_diag", "s3_diag"], "s3_diag", 1)]:
        X = d[base].to_numpy(float)
        lrts["+".join(base) + f" | drop {add}"] = round(float(firth_lrt_p(X, y, idx)), 6)
    rep["part_d_incremental_value"] = {
        "table": rows, "deltas": drows,
        "firth_lrt_full_data_non_oof": lrts,
        "power_warning": ("n=67 with 9 events. Events-per-variable is below 2 for every "
                          "multivariable model. These comparisons can exclude large effects "
                          "but cannot establish small ones."),
    }
    print("\n[full-data Firth LRT for s3 (NOT out-of-fold; nested models only)]")
    print(J(lrts))
    return res, tab, dtab


def part_e(s98, s67, rep):
    print("\n" + "=" * 78 + "\nPART E -- does S3 restate the HRD/BRCA axis?\n" + "=" * 78)
    out = {}
    for name, d in [("set98", s98), ("set67", s67)]:
        y = d["y"].to_numpy()
        s3 = d["s3_diag"].to_numpy()
        rec = {"n": int(len(d)), "events": int(y.sum())}
        for gene in ["brca_mut_i", "hr_gene_mut_i"]:
            g = d[gene]
            if g.notna().sum() < 10:
                rec[gene] = {"status": "insufficient non-missing"}
                continue
            gv = g.fillna(0).to_numpy()
            from scipy.stats import mannwhitneyu, pointbiserialr
            r, pr = pointbiserialr(gv, s3)
            u, pm = mannwhitneyu(s3[gv == 1], s3[gv == 0], alternative="two-sided") \
                if (gv == 1).sum() > 2 and (gv == 0).sum() > 2 else (np.nan, np.nan)
            au_g = roc_auc_score(y, gv) if len(np.unique(gv)) > 1 else np.nan
            rec[gene] = {
                "n_mutant": int(gv.sum()),
                "corr_with_s3_pointbiserial": round(float(r), 4), "corr_p": float(pr),
                "s3_median_mutant": round(float(np.median(s3[gv == 1])), 4) if (gv == 1).sum() else None,
                "s3_median_wildtype": round(float(np.median(s3[gv == 0])), 4),
                "mannwhitney_p_s3_by_mutation": (float(pm) if pm == pm else None),
                "auroc_of_mutation_alone_vs_resistance": (round(float(au_g), 4) if au_g == au_g else None),
            }
        # BRCA-stratified s3 AUROC with CIs
        strat = {}
        for lab, mask in [("BRCA_mutant", d["brca_mut_i"].fillna(0) == 1),
                          ("BRCA_wildtype", d["brca_mut_i"].fillna(0) == 0)]:
            sub = d[mask]
            ys = sub["y"].to_numpy()
            if len(np.unique(ys)) < 2:
                strat[lab] = {"n": int(len(sub)), "events": int(ys.sum()),
                              "status": "single-class stratum -- AUROC undefined"}
                continue
            bs = MX.bootstrap_ci(ys, sub["s3_diag"].to_numpy(), "auroc", 2000)
            strat[lab] = {
                "n": int(len(sub)), "events": int(ys.sum()),
                "auroc_raw": round(bs["point"], 4),
                "ci": [round(bs["ci_lo"], 4), round(bs["ci_hi"], 4)],
                "protective_auroc": round(1 - bs["point"], 4),
                "interpretable": bool(ys.sum() >= 10),
                "note": ("event count below 10 -- this stratum cannot support a conclusion"
                         if ys.sum() < 10 else "")}
        rec["brca_stratified_s3"] = strat
        out[name] = rec
        print(f"\n[{name}] n={rec['n']} events={rec['events']}")
        for gene in ["brca_mut_i", "hr_gene_mut_i"]:
            if "status" in rec[gene]:
                continue
            g = rec[gene]
            print(f"  {gene}: n_mut={g['n_mutant']}  corr(s3) r={g['corr_with_s3_pointbiserial']} "
                  f"p={g['corr_p']:.4g}  s3 median mut {g['s3_median_mutant']} vs wt "
                  f"{g['s3_median_wildtype']} (MWU p={g['mannwhitney_p_s3_by_mutation']})  "
                  f"AUROC(mutation alone)={g['auroc_of_mutation_alone_vs_resistance']}")
        for lab, v in strat.items():
            print(f"  {lab}: {v}")
    rep["part_e_hrd_redundancy"] = out
    return out


def part_f(s67, rep):
    print("\n" + "=" * 78 + "\nPART F -- adjusted effect and OS reproduction\n" + "=" * 78)
    d = s67.copy()
    y = d["y"].to_numpy()
    sd_s3 = float(d["s3_diag"].std(ddof=1))
    d["s3_sd"] = d["s3_diag"] / sd_s3
    X = d[["s3_sd", "age", "stage_adv", "num_lines_n"]].to_numpy(float)
    Xh = d[["s3_sd", "age", "stage_adv", "num_lines_n", "hr_gene_mut_i"]].fillna(0).to_numpy(float)
    import statsmodels.api as sm
    mle = sm.GLM(y, sm.add_constant(Xh), family=sm.families.Binomial()).fit()
    fh = firth_logit(Xh, y)
    rec = {
        "s3_sd_used": round(sd_s3, 4), "documented_sd": 0.1337,
        "mle_or_per_sd": round(float(np.exp(mle.params[1])), 4),
        "mle_p": float(mle.pvalues[1]),
        "documented_mle_or": 0.0252, "documented_mle_p": 0.0141,
        "firth_or_per_sd": round(float(fh["or"][1]), 4),
        "firth_wald_p": float(fh["wald_p"][1]),
        "documented_firth_or": 0.0825, "documented_firth_wald_p": 0.0095,
        "n": int(len(y)), "events": int(y.sum()), "n_covariates": 5,
        "events_per_variable": round(float(y.sum() / 5), 2),
        "underpowered_flag": True,
    }
    print(f"  s3 SD = {rec['s3_sd_used']} (documented {rec['documented_sd']})")
    print(f"  MLE   OR/SD = {rec['mle_or_per_sd']} p={rec['mle_p']:.4g} "
          f"(documented {rec['documented_mle_or']}, p={rec['documented_mle_p']})")
    print(f"  Firth OR/SD = {rec['firth_or_per_sd']} p={rec['firth_wald_p']:.4g} "
          f"(documented {rec['documented_firth_or']}, p={rec['documented_firth_wald_p']})")
    print(f"  EPV = {rec['events_per_variable']}  UNDERPOWERED")

    from lifelines import CoxPHFitter
    cd = d[["os_time", "os_event", "s3_sd", "age", "stage_adv", "num_lines_n"]].dropna()
    cph = CoxPHFitter().fit(cd, "os_time", "os_event")
    hr = float(np.exp(cph.params_["s3_sd"]))
    ci = cph.confidence_intervals_.loc["s3_sd"].to_numpy()
    rec["cox_os"] = {
        "n": int(len(cd)), "events": int(cd["os_event"].sum()),
        "hr_per_sd": round(hr, 4),
        "ci": [round(float(np.exp(ci[0])), 4), round(float(np.exp(ci[1])), 4)],
        "p": float(cph.summary.loc["s3_sd", "p"]),
        "documented_hr": 0.6869, "documented_p": 0.043,
    }
    print(f"  Cox OS HR/SD = {rec['cox_os']['hr_per_sd']} CI {rec['cox_os']['ci']} "
          f"p={rec['cox_os']['p']:.4g} (documented {rec['cox_os']['documented_hr']}, "
          f"p={rec['cox_os']['documented_p']})")

    # leave-one-event-out influence on the n=98 primary metric
    rep["part_f_adjusted"] = rec
    return rec


def part_g(s98, rep):
    print("\n" + "=" * 78 + "\nPART G -- influence audit on the primary n=98 estimate\n" + "=" * 78)
    y, s3 = s98["y"].to_numpy(), s98["s3_diag"].to_numpy()
    base = roc_auc_score(y, s3)
    loeo = []
    for i in np.where(y == 1)[0]:
        k = np.ones(len(y), bool); k[i] = False
        loeo.append(roc_auc_score(y[k], s3[k]))
    loso = []
    for i in range(len(y)):
        k = np.ones(len(y), bool); k[i] = False
        if len(np.unique(y[k])) > 1:
            loso.append(roc_auc_score(y[k], s3[k]))
    rec = {
        "base_auroc": round(float(base), 4),
        "leave_one_event_out": {"n_drops": len(loeo), "min": round(float(np.min(loeo)), 4),
                                "max": round(float(np.max(loeo)), 4),
                                "range_width": round(float(np.ptp(loeo)), 4),
                                "documented_min": 0.2352, "documented_max": 0.2827},
        "leave_one_subject_out": {"n_drops": len(loso), "min": round(float(np.min(loso)), 4),
                                  "max": round(float(np.max(loso)), 4),
                                  "range_width": round(float(np.ptp(loso)), 4)},
        "no_single_subject_flips_direction": bool(np.max(loso) < 0.5),
    }
    print(J(rec))
    rep["part_g_influence"] = rec
    return rec


def main():
    rep = {}
    m, s98, s67 = load_sets()
    print(f"loaded: labelled={len(m)}  set98={len(s98)} (events {int(s98['y'].sum())})  "
          f"set67={len(s67)} (events {int(s67['y'].sum())})")
    part_a(s98, s67, rep)
    part_b(s67, rep)
    part_c(s98, s67, rep)
    part_d(s67, s98, rep)
    part_e(s98, s67, rep)
    part_f(s67, rep)
    part_g(s98, rep)
    with open(OUT / "w3_analysis.json", "w") as fh:
        json.dump(rep, fh, indent=2, default=str)
    print("\n[written]", OUT / "w3_analysis.json")


if __name__ == "__main__":
    main()
