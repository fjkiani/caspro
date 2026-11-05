"""
Adversarial test suite for the S3 reproduction pipeline.

These tests attack the ANALYSIS, not the service. Each asserts that a specific way of
manufacturing an optimistic result is either impossible or detected.

Five families, mandated by the review directive:

  1. LEAKAGE                  a scaler fitted outside the fold must be DETECTED; an
                              outcome-derived feature must produce a detectable leak
                              signature; folds must be identical across models
  2. DIRECTION REVERSAL       AUROC(-s) == 1 - AUROC(s); the protective reversal is exact
                              arithmetic, and a FITTED model cannot detect a direction flip
                              (only the raw ranking can) — asserted explicitly
  3. SCHEMA DRIFT             a missing label column must raise; the NaN-label-encodes-as-
                              sensitive hazard in the archived builder must stay closed;
                              a renamed feature must not silently produce a model
  4. THRESHOLD SUBSTITUTION   0.10 must remain outside the in-fold cutpoint envelope and
                              must reproduce its documented operating characteristics exactly
  5. OVERSELLING GUARDS       the frozen scorer's Brier must remain WORSE than prevalence-only;
                              AUROC must never be presentable as a probability

Run:  pytest code/tests/test_adversarial_pipeline.py -q
Data: tables/rebuilt_patient_master.csv (verified byte-equivalent to the archived
      obl3_patient_master.csv: 0 mismatched cells, max numeric diff <= 9.71e-17)
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd
import pytest

from s3_pipeline import metrics as MT
from s3_pipeline import models as MD
from s3_pipeline.firth import firth_logit

# ---------------------------------------------------------------------------
# Cohort construction — identical to run_w3.load_sets()
# ---------------------------------------------------------------------------
SIGS = [f"s{i}" for i in range(1, 8)]
DIAG = [f"{s}_diag" for s in SIGS]
COV = ["age", "tumour_stage_at_diagnosis", "num_lines"]

_ROOT = Path(__file__).resolve().parent.parent.parent  # resistance_prophet_s3/
_TABLE = _ROOT / "tables" / "rebuilt_patient_master.csv"


def _load():
    if not _TABLE.exists():  # pragma: no cover
        pytest.skip(f"cohort table not found at {_TABLE}")
    m = pd.read_csv(_TABLE)
    m = m[m["pt_status"].notna()].copy()
    m["y"] = (m["pt_status"] == "resistant").astype(int)
    m["stage_adv"] = m["tumour_stage_at_diagnosis"].astype(str).str.extract(r"(\d)")[0]
    m["stage_adv"] = pd.to_numeric(m["stage_adv"], errors="coerce").ge(3).astype(float)
    m.loc[m["tumour_stage_at_diagnosis"].isna(), "stage_adv"] = np.nan
    m["num_lines_n"] = pd.to_numeric(
        m["num_lines"].astype(str).str.replace("+", "", regex=False), errors="coerce"
    )
    m.loc[m["num_lines"].astype(str) == "4+", "num_lines_n"] = 5.0
    m.loc[m["num_lines"].isna(), "num_lines_n"] = np.nan
    m["brca_mut_i"] = m["brca_mut"].map({True: 1.0, False: 0.0})
    m["hr_gene_mut_i"] = m["hr_gene_mut"].map({True: 1.0, False: 0.0})
    s98 = m[m[DIAG].notna().all(axis=1)].reset_index(drop=True)
    s67 = s98[s98[COV].notna().all(axis=1)].reset_index(drop=True)
    return m, s98, s67


@pytest.fixture(scope="module")
def sets():
    return _load()


@pytest.fixture(scope="module")
def s98(sets):
    return sets[1]


@pytest.fixture(scope="module")
def s67(sets):
    return sets[2]


# ===========================================================================
# Denominator sanity — everything below depends on these being right
# ===========================================================================
class TestDenominators:
    def test_labelled_cohort(self, sets):
        m = sets[0]
        assert len(m) == 159
        assert int(m["y"].sum()) == 38

    def test_set98(self, s98):
        assert len(s98) == 98
        assert int(s98["y"].sum()) == 20
        assert s98["y"].mean() == pytest.approx(20 / 98, abs=1e-12)

    def test_set67(self, s67):
        assert len(s67) == 67
        assert int(s67["y"].sum()) == 9
        assert s67["y"].mean() == pytest.approx(9 / 67, abs=1e-12)

    def test_set67_is_outcome_depleted_relative_to_set98(self, s98, s67):
        """
        The covariate-complete subset is NOT a random subsample: prevalence falls from
        0.2041 to 0.1343 and the 31 dropped patients are 0.3548 resistant. Any n=67
        result must be reported with this selection stated.
        """
        keep = set(s67["britroc_number"])
        dropped = s98[~s98["britroc_number"].isin(keep)]
        assert len(dropped) == 31
        assert int(dropped["y"].sum()) == 11
        assert dropped["y"].mean() == pytest.approx(11 / 31, abs=1e-12)
        assert s67["y"].mean() < s98["y"].mean()


# ===========================================================================
# FAMILY 1 — LEAKAGE
# ===========================================================================
class TestLeakage:
    def test_in_fold_standardisation_is_detected_as_clean(self, s67):
        y = s67["y"].to_numpy(int)
        folds = MD.make_folds(y, n_splits=5, n_repeats=4, seed=42)
        spec = MD.ModelSpec("s3_only", ["s3_diag"])
        res = MD.run_model(spec, s67, y, folds)
        chk = MD.verify_no_leakage(res["fold_records"])
        assert chk["applicable"] is True
        assert chk["mu_varies_across_folds"] is True
        assert chk["sd_varies_across_folds"] is True
        assert chk["n_unique_mu_rows"] > 1

    def test_a_deliberately_leaked_scaler_is_detected(self, s67):
        """
        Fit the scaler on the FULL cohort and reuse it in every fold — the classic
        preprocessing leak. verify_no_leakage must flag it.
        """
        X = s67[["s3_diag"]].to_numpy(float)
        mu_all = X.mean(axis=0).tolist()
        sd_all = X.std(axis=0, ddof=0).tolist()
        leaked_records = [{"mu": mu_all, "sd": sd_all} for _ in range(20)]
        chk = MD.verify_no_leakage(leaked_records)
        assert chk["applicable"] is True
        assert chk["mu_varies_across_folds"] is False
        assert chk["sd_varies_across_folds"] is False
        assert chk["n_unique_mu_rows"] == 1

    def test_fixed_rule_models_declare_leakage_check_inapplicable(self):
        chk = MD.verify_no_leakage([])
        assert chk["applicable"] is False
        assert "fixed-rule" in chk["reason"]

    def test_outcome_injection_produces_a_detectable_leak_signature(self, s67):
        """
        Inject the outcome itself as a feature. With 9 events the OOF AUROC must jump to
        ~1.0 — far outside anything a real feature achieves. This is the signature a
        reviewer must look for; the test pins it so it cannot be mistaken for skill.
        """
        y = s67["y"].to_numpy(int)
        folds = MD.make_folds(y, n_splits=5, n_repeats=4, seed=42)

        honest = MD.run_model(MD.ModelSpec("s3", ["s3_diag"]), s67, y, folds)
        a_honest = MT.auroc_ranking(y, honest["oof_mean"])

        leaked_df = s67.copy()
        leaked_df["y_leak"] = y.astype(float)
        leaked = MD.run_model(MD.ModelSpec("leak", ["s3_diag", "y_leak"]), leaked_df, y, folds)
        a_leak = MT.auroc_ranking(y, leaked["oof_mean"])

        assert a_leak > 0.99, a_leak
        assert a_leak - a_honest > 0.10
        assert a_honest < 0.95, "honest s3-only OOF AUROC must not be near-perfect"

    def test_folds_are_identical_across_models(self, s67):
        """Paired comparison validity: every model must see the same fold indices."""
        y = s67["y"].to_numpy(int)
        f1 = MD.make_folds(y, n_splits=5, n_repeats=4, seed=42)
        f2 = MD.make_folds(y, n_splits=5, n_repeats=4, seed=42)
        assert len(f1) == len(f2) == 20
        for (a_tr, a_te), (b_tr, b_te) in zip(f1, f2):
            assert np.array_equal(a_tr, b_tr)
            assert np.array_equal(a_te, b_te)

    def test_a_different_seed_gives_different_folds(self, s67):
        y = s67["y"].to_numpy(int)
        f1 = MD.make_folds(y, n_splits=5, n_repeats=2, seed=42)
        f2 = MD.make_folds(y, n_splits=5, n_repeats=2, seed=43)
        assert not all(np.array_equal(a[1], b[1]) for a, b in zip(f1, f2))

    def test_each_repeat_partitions_the_cohort_exactly_once(self, s67):
        y = s67["y"].to_numpy(int)
        folds = MD.make_folds(y, n_splits=5, n_repeats=4, seed=42)
        n = len(y)
        for r in range(4):
            test_idx = np.concatenate([folds[r * 5 + k][1] for k in range(5)])
            assert len(test_idx) == n
            assert len(np.unique(test_idx)) == n

    def test_train_and_test_never_overlap(self, s67):
        y = s67["y"].to_numpy(int)
        for tr, te in MD.make_folds(y, n_splits=5, n_repeats=2, seed=42):
            assert len(np.intersect1d(tr, te)) == 0

    def test_per_repeat_metric_is_not_averaged_predictions(self, s67):
        """
        Two different statistics can be called "the OOF AUROC": (a) the mean of the
        per-repeat AUROCs, (b) one AUROC computed on predictions first averaged across
        repeats. They are not equal, so which one is reported must be pinned down.

        Measured on this cohort the averaged-prediction version is LOWER, not higher
        (M0: 0.5517 vs 0.6033; M1: 0.8678 vs 0.8747) — averaging across repeats blurs
        the per-subject ranking here rather than flattering it. The test therefore does
        NOT assert a direction. It asserts the two differ materially and that the
        published number is the per-repeat statistic.
        """
        y = s67["y"].to_numpy(int)
        folds8 = MD.make_folds(y, n_splits=5, n_repeats=8, seed=42)
        res = MD.run_model(
            MD.ModelSpec("m0", ["age", "stage_adv", "num_lines_n"]), s67, y, folds8
        )
        per_repeat = MD.per_repeat_metric(y, res["oof_by_repeat"], MT.auroc_ranking)
        assert len(per_repeat) == 8, "one metric per repeat, not one metric overall"
        assert per_repeat.std() > 0.0, "per-repeat spread must be reported, not hidden"
        smoothed = MT.auroc_ranking(y, res["oof_mean"])
        assert abs(smoothed - per_repeat.mean()) > 0.01, (
            "the two definitions must be shown to differ; if they coincided the "
            "distinction would be cosmetic"
        )

        # The published incremental-value table must be the per-repeat statistic.
        folds20 = MD.make_folds(y, n_splits=5, n_repeats=20, seed=42)
        m1 = MD.run_model(MD.ModelSpec("m1", ["s3_diag"]), s67, y, folds20)
        pr20 = MD.per_repeat_metric(y, m1["oof_by_repeat"], MT.auroc_ranking)
        sm20 = MT.auroc_ranking(y, m1["oof_mean"])
        assert pr20.mean() == pytest.approx(0.8747, abs=5e-4), pr20.mean()
        assert sm20 == pytest.approx(0.8678, abs=5e-4), sm20
        assert abs(sm20 - 0.8747) > 5e-4, "published 0.8747 is NOT the smoothed variant"

    def test_fold_geometry_is_derived_from_the_folds_not_guessed(self, s67):
        """
        Regression test for a latent defect found during this review: run_model
        previously inferred splits-per-repeat from a module-level N_REPEATS constant, so
        any configuration other than 5x20 was silently mis-shaped (per-repeat metrics came
        back empty). Geometry must be recovered from the fold list itself.
        """
        y = s67["y"].to_numpy(int)
        n = len(y)
        for n_splits, n_repeats in [(5, 20), (5, 8), (5, 4), (10, 3), (4, 6)]:
            folds = MD.make_folds(y, n_splits=n_splits, n_repeats=n_repeats, seed=42)
            assert MD.infer_fold_geometry(folds, n) == (n_splits, n_repeats)

    def test_ragged_fold_list_refuses_to_guess(self, s67):
        y = s67["y"].to_numpy(int)
        folds = MD.make_folds(y, n_splits=5, n_repeats=4, seed=42)[:7]
        with pytest.raises(ValueError):
            MD.infer_fold_geometry(folds, len(y))


# ===========================================================================
# FAMILY 2 — DIRECTION REVERSAL
# ===========================================================================
class TestDirectionReversal:
    def test_sign_flip_reflects_auroc_about_one_half(self, s98):
        y = s98["y"].to_numpy(int)
        s = s98["s3_diag"].to_numpy(float)
        a = MT.auroc_ranking(y, s)
        b = MT.auroc_ranking(y, -s)
        assert a + b == pytest.approx(1.0, abs=1e-12)

    def test_label_swap_reflects_auroc_about_one_half(self, s98):
        y = s98["y"].to_numpy(int)
        s = s98["s3_diag"].to_numpy(float)
        assert MT.auroc_ranking(y, s) + MT.auroc_ranking(1 - y, s) == pytest.approx(
            1.0, abs=1e-12
        )

    def test_documented_reversal_arithmetic_is_exact(self, s98, s67):
        raw98 = MT.auroc_ranking(s98["y"].to_numpy(int), s98["s3_diag"].to_numpy(float))
        raw67 = MT.auroc_ranking(s67["y"].to_numpy(int), s67["s3_diag"].to_numpy(float))
        assert raw98 == pytest.approx(0.2715, abs=5e-5)
        assert raw67 == pytest.approx(0.1130, abs=5e-5)
        assert MT.protective_auroc(raw98) == pytest.approx(1.0 - raw98, abs=1e-15)
        assert MT.protective_auroc(raw98) == pytest.approx(0.7285, abs=5e-5)
        assert MT.protective_auroc(raw67) == pytest.approx(0.8870, abs=5e-5)

    def test_direction_is_the_same_in_both_denominators(self, s98, s67):
        for d in (s98, s67):
            y = d["y"].to_numpy(int)
            s = d["s3_diag"].to_numpy(float)
            assert MT.auroc_ranking(y, s) < 0.5, "higher s3 must be protective in both sets"
            assert np.median(s[y == 1]) < np.median(s[y == 0])

    def test_a_fitted_model_CANNOT_detect_a_direction_flip(self, s67):
        """
        This is the trap. A fitted logistic absorbs the sign into its coefficient, so
        flipping the feature leaves OOF AUROC unchanged. Direction can therefore only be
        audited on the RAW ranking, never on a fitted model's discrimination. If a
        pipeline claims to have validated direction by cross-validating a fitted model,
        it has validated nothing.
        """
        y = s67["y"].to_numpy(int)
        folds = MD.make_folds(y, n_splits=5, n_repeats=4, seed=42)
        d = s67.copy()
        d["s3_flip"] = -d["s3_diag"]
        a = MT.auroc_ranking(
            y, MD.run_model(MD.ModelSpec("a", ["s3_diag"]), d, y, folds)["oof_mean"]
        )
        b = MT.auroc_ranking(
            y, MD.run_model(MD.ModelSpec("b", ["s3_flip"]), d, y, folds)["oof_mean"]
        )
        assert a == pytest.approx(b, abs=1e-9)
        # and the raw ranking DOES detect it
        raw_a = MT.auroc_ranking(y, d["s3_diag"].to_numpy(float))
        raw_b = MT.auroc_ranking(y, d["s3_flip"].to_numpy(float))
        assert abs(raw_a - raw_b) > 0.5

    def test_frozen_scorer_slope_encodes_the_protective_direction(self):
        assert MD.FROZEN_BETA1 < 0
        lo = MD.frozen_s3_score(np.array([0.02]))[0]
        hi = MD.frozen_s3_score(np.array([0.40]))[0]
        assert lo > hi, "resistance score must DECREASE as s3 increases"

    def test_cross_validation_of_a_single_unfitted_feature_adds_nothing(self, s67):
        """
        The 0.8807 arithmetic. For a one-parameter model the within-fold fitted AUROC is
        identically 1 - AUROC(raw s3): cross-validation cannot add information to a
        ranking that has no fitted parameters. Verified fold-by-fold.
        """
        y = s67["y"].to_numpy(int)
        s = s67["s3_diag"].to_numpy(float)
        n_splits, n_repeats = 5, 8
        folds = MD.make_folds(y, n_splits=n_splits, n_repeats=n_repeats, seed=42)
        res = MD.run_model(MD.ModelSpec("s3", ["s3_diag"]), s67, y, folds)
        oof = res["oof_by_repeat"]
        worst, checked = 0.0, 0
        for k, (_, te) in enumerate(folds):
            if len(np.unique(y[te])) < 2:
                continue
            a_fitted = MT.auroc_ranking(y[te], oof[k // n_splits, te])
            a_raw = MT.auroc_ranking(y[te], s[te])
            worst = max(worst, abs(a_fitted - (1.0 - a_raw)))
            checked += 1
        assert checked >= 30, checked
        assert worst < 1e-9, worst


# ===========================================================================
# FAMILY 3 — SCHEMA DRIFT
# ===========================================================================
class TestSchemaDrift:
    def test_missing_label_column_raises(self, s98):
        d = s98.drop(columns=["pt_status"])
        with pytest.raises(KeyError):
            _ = d["pt_status"]

    def test_nan_label_would_encode_as_sensitive_without_the_notna_filter(self):
        """
        The latent hazard in the archived builder: `(pt_status == 'resistant').astype(int)`
        maps a MISSING label to 0 (sensitive), silently inflating the denominator with
        unlabelled patients. ENDPOINT_CONTRACT_v1 pins `pt_status.notna()` as the filter.
        This test pins the hazard so the filter cannot be dropped unnoticed.
        """
        raw = pd.DataFrame({"pt_status": ["resistant", "sensitive", None, np.nan]})
        unguarded = (raw["pt_status"] == "resistant").astype(int)
        assert unguarded.tolist() == [1, 0, 0, 0]  # two phantom 'sensitive' patients
        guarded = raw[raw["pt_status"].notna()]
        assert len(guarded) == 2
        assert int((guarded["pt_status"] == "resistant").sum()) == 1

    def test_published_csv_label_column_loses_19_resistant_patients(self):
        """
        C10. britroc_master_published.csv takes the label from figure_2.tsv only, which
        covers 95/159 patients, so 64 labels are NaN there — 45 sensitive and 19 resistant
        in the full rebuild. Using that column as the denominator silently drops half the
        events. Guarded by asserting the rebuild retains all 38.
        """
        m, _, _ = _load()
        assert len(m) == 159
        assert int(m["y"].sum()) == 38

    def test_renamed_feature_column_raises_rather_than_defaulting(self, s67):
        y = s67["y"].to_numpy(int)
        folds = MD.make_folds(y, n_splits=5, n_repeats=1, seed=42)
        d = s67.rename(columns={"s3_diag": "s3"})
        with pytest.raises(KeyError):
            MD.run_model(MD.ModelSpec("drift", ["s3_diag"]), d, y, folds)

    def test_string_coded_covariate_raises_rather_than_coercing(self, s67):
        """`num_lines` contains '4+'. Feeding the raw column to a float model must fail."""
        y = s67["y"].to_numpy(int)
        folds = MD.make_folds(y, n_splits=5, n_repeats=1, seed=42)
        d = s67.copy()
        d["num_lines"] = d["num_lines"].astype(str)
        with pytest.raises(ValueError):
            MD.run_model(MD.ModelSpec("raw_lines", ["num_lines"]), d, y, folds)

    def test_right_censored_recode_is_declared_and_bounded(self, s67):
        """'4+' -> 5 is a declared ordinal recode. The alternative (4) must not change
        the sign of any incremental comparison; assert both give the same direction."""
        y = s67["y"].to_numpy(int)
        folds = MD.make_folds(y, n_splits=5, n_repeats=4, seed=42)
        d5 = s67.copy()
        d4 = s67.copy()
        d4.loc[d4["num_lines"].astype(str) == "4+", "num_lines_n"] = 4.0
        feats = ["age", "stage_adv", "num_lines_n"]
        a5 = MT.auroc_ranking(
            y, MD.run_model(MD.ModelSpec("c5", feats), d5, y, folds)["oof_mean"]
        )
        a4 = MT.auroc_ranking(
            y, MD.run_model(MD.ModelSpec("c4", feats), d4, y, folds)["oof_mean"]
        )
        assert abs(a5 - a4) < 0.05
        assert (a5 < 0.75) and (a4 < 0.75), "clinical baseline stays weak under both recodes"

    def test_signature_exposures_sum_to_one_per_patient(self, s98):
        """Structural check on the feature framework: 7 Macintyre exposures are a
        composition. Drift in the fitting step would break this."""
        tot = s98[DIAG].sum(axis=1)
        assert tot.min() > 0.95 and tot.max() < 1.05, (tot.min(), tot.max())


# ===========================================================================
# FAMILY 4 — THRESHOLD SUBSTITUTION
# ===========================================================================
class TestThresholdSubstitution:
    def test_documented_operating_characteristics_at_0_10_reproduce_exactly(self, s98, s67):
        ops98 = MT.threshold_ops(
            s98["y"].to_numpy(int), s98["s3_diag"].to_numpy(float), [0.10]
        )[0]
        assert ops98["direction"] == "low_is_event"
        assert (ops98["tp"], ops98["fp"], ops98["tn"], ops98["fn"]) == (15, 25, 53, 5)
        assert ops98["sensitivity"] == pytest.approx(0.750, abs=5e-4)
        assert ops98["specificity"] == pytest.approx(0.6795, abs=5e-4)
        assert ops98["ppv"] == pytest.approx(0.375, abs=5e-4)
        assert ops98["npv"] == pytest.approx(0.9138, abs=5e-4)

        ops67 = MT.threshold_ops(
            s67["y"].to_numpy(int), s67["s3_diag"].to_numpy(float), [0.10]
        )[0]
        assert (ops67["tp"], ops67["fp"], ops67["tn"], ops67["fn"]) == (9, 17, 41, 0)
        assert ops67["sensitivity"] == pytest.approx(1.0, abs=1e-12)
        assert ops67["specificity"] == pytest.approx(0.7069, abs=5e-4)
        assert ops67["ppv"] == pytest.approx(0.3462, abs=5e-4)

    def test_perfect_sensitivity_at_n67_is_a_zero_cell_artifact(self, s67):
        """
        Sens = 1.000 at t=0.10 on n=67 rests on fn = 0 with only 9 events. Its lower
        confidence bound is 0.7009, and the same threshold gives Sens 0.750 on the larger
        n=98 denominator. Assert both facts so 'catches every resistant patient' cannot
        be quoted.
        """
        ops = MT.threshold_ops(
            s67["y"].to_numpy(int), s67["s3_diag"].to_numpy(float), [0.10]
        )[0]
        assert ops["fn"] == 0
        assert ops["sensitivity"] == pytest.approx(1.0, abs=1e-12)
        assert ops["sens_ci_lo"] == pytest.approx(0.7009, abs=5e-4), ops["sens_ci_lo"]
        assert ops["sens_ci_lo"] < 0.71
        assert int(s67["y"].sum()) == 9

    def test_in_fold_cutpoint_envelope_excludes_0_10(self, s98):
        """
        Recompute the Youden cutpoint inside each of the 100 training folds on the
        PRIMARY n=98 denominator (the denominator the published envelope was built on).
        0.10 lies outside the envelope; the data-driven cut is 0.050-0.080.
        """
        y = s98["y"].to_numpy(int)
        s = s98["s3_diag"].to_numpy(float)
        folds = MD.make_folds(y, n_splits=5, n_repeats=20, seed=42)
        cuts = np.array(
            [MT.youden_cutpoint(y[tr], s[tr], "low_is_event")[0] for tr, _ in folds]
        )
        assert len(cuts) == 100
        assert cuts.min() == pytest.approx(0.0502, abs=5e-4)
        assert cuts.max() == pytest.approx(0.0798, abs=5e-4)
        assert np.median(cuts) == pytest.approx(0.0646, abs=5e-4)
        assert not (cuts.min() <= 0.10 <= cuts.max()), (cuts.min(), cuts.max())

    def test_substituting_0_10_for_the_in_fold_cut_buys_sensitivity_with_specificity(
        self, s98
    ):
        """
        Honest out-of-fold operating point vs the substituted fixed threshold, on the
        SAME n=98 denominator.

        Measured: OOF at the in-fold data-driven cut = Sens 0.6525 / Spec 0.7510
        (Youden J 0.4035). Substituting 0.10 and quoting its full-data characteristics
        gives Sens 0.750 / Spec 0.6795 (J 0.4295). So the apparent sensitivity gain of
        +0.0975 is paid for with -0.0715 specificity, plus 0.026 of pure resubstitution
        optimism in J. It is a move along the ROC curve, not added performance.
        """
        y = s98["y"].to_numpy(int)
        s = s98["s3_diag"].to_numpy(float)
        folds = MD.make_folds(y, n_splits=5, n_repeats=20, seed=42)
        sens_oof, spec_oof = [], []
        for tr, te in folds:
            cut, _ = MT.youden_cutpoint(y[tr], s[tr], "low_is_event")
            flag = s[te] <= cut
            ev, nev = y[te] == 1, y[te] == 0
            if ev.sum():
                sens_oof.append(flag[ev].mean())
            if nev.sum():
                spec_oof.append((~flag[nev]).mean())
        mean_sens = float(np.mean(sens_oof))
        mean_spec = float(np.mean(spec_oof))
        assert mean_sens == pytest.approx(0.6525, abs=0.01)
        assert mean_spec == pytest.approx(0.7510, abs=0.01)

        ops = MT.threshold_ops(y, s, [0.10])[0]
        assert ops["sensitivity"] == pytest.approx(0.750, abs=1e-12)
        assert ops["specificity"] == pytest.approx(0.6795, abs=5e-4)
        # sensitivity up, specificity down: a threshold shift, not new information
        assert ops["sensitivity"] - mean_sens > 0.09, (ops["sensitivity"], mean_sens)
        assert ops["specificity"] < mean_spec
        # and the resubstituted J is optimistic relative to the honest OOF J
        assert ops["youden_j"] > (mean_sens + mean_spec - 1.0)

    def test_grid_optimal_threshold_is_denominator_dependent(self, s98, s67):
        """
        On the primary n=98 / 20-event denominator the grid-optimal Youden threshold is
        0.075, not 0.10. On the reduced n=67 / 9-event complete-covariate subset 0.10
        does win — but only because it drives false negatives to exactly zero, which is
        the zero-cell artifact, not a better threshold.

        Asserting both is the point: a threshold that changes when 31 patients are
        dropped for covariate completeness is not a locked threshold.
        """
        grid = [0.025, 0.050, 0.075, 0.100, 0.125, 0.150]

        ops98 = MT.threshold_ops(
            s98["y"].to_numpy(int), s98["s3_diag"].to_numpy(float), grid
        )
        best98 = max(ops98, key=lambda r: r["youden_j"])
        assert best98["threshold"] == pytest.approx(0.075, abs=1e-12)
        assert best98["youden_j"] == pytest.approx(0.4564, abs=5e-4)
        assert best98["fn"] > 0, "the n=98 optimum does not rest on a zero cell"

        ops67 = MT.threshold_ops(
            s67["y"].to_numpy(int), s67["s3_diag"].to_numpy(float), grid
        )
        best67 = max(ops67, key=lambda r: r["youden_j"])
        assert best67["threshold"] == pytest.approx(0.100, abs=1e-12)
        assert best67["fn"] == 0, "n=67 optimum is exactly the zero-false-negative cell"
        assert best98["threshold"] != best67["threshold"]

    def test_shipped_sig7_threshold_is_recorded_unchanged(self):
        """0.25 must not drift silently; it is documented as a draft heuristic."""
        assert MD.SHIPPED_SIG7_RISK_THRESHOLD == 0.25


# ===========================================================================
# FAMILY 5 — OVERSELLING GUARDS
# ===========================================================================
class TestOversellingGuards:
    def test_frozen_scorer_is_worse_than_quoting_the_base_rate(self, s67):
        y = s67["y"].to_numpy(int)
        p = MD.frozen_s3_score(s67["s3_diag"].to_numpy(float))
        brier = float(np.mean((p - y) ** 2))
        prev = float(y.mean())
        brier_prev = float(np.mean((prev - y) ** 2))
        assert brier == pytest.approx(0.1484, abs=5e-4)
        assert brier_prev == pytest.approx(0.1163, abs=5e-4)
        assert brier > brier_prev, "absolute-risk output must remain declared miscalibrated"
        skill = 1.0 - brier / brier_prev
        assert skill < 0.0
        assert skill == pytest.approx(-0.2762, abs=5e-3)

    def test_calibration_intercept_ci_excludes_zero(self, s67):
        y = s67["y"].to_numpy(int)
        p = MD.frozen_s3_score(s67["s3_diag"].to_numpy(float))
        cal = MT.calibration(y, p)
        lo, hi = cal["intercept_ci_lo"], cal["intercept_ci_hi"]
        assert cal["calibration_intercept"] == pytest.approx(-2.1174, abs=5e-4)
        assert hi < 0.0, (lo, hi)  # systematic over-prediction, not noise
        assert hi == pytest.approx(-0.8204, abs=5e-4)

    def test_discrimination_is_high_while_calibration_fails(self, s67):
        """Both facts must hold simultaneously; reporting only the first is the oversell."""
        y = s67["y"].to_numpy(int)
        p = MD.frozen_s3_score(s67["s3_diag"].to_numpy(float))
        assert MT.auroc_ranking(y, p) == pytest.approx(0.8870, abs=5e-4)
        assert float(np.mean((p - y) ** 2)) > float(np.mean((y.mean() - y) ** 2))

    def test_auroc_is_not_a_probability(self, s67):
        """
        0.8807 is a ranking statistic on the cohort, not a per-patient confidence. Assert
        no patient's predicted probability equals it, so the identification is impossible
        to make by coincidence.
        """
        p = MD.frozen_s3_score(s67["s3_diag"].to_numpy(float))
        assert not np.any(np.isclose(p, 0.8807, atol=1e-4))

    def test_bootstrap_ci_is_far_wider_than_the_fold_band(self, s67):
        """
        The reported cv_auroc_sd 0.0045 describes fold-to-fold stability, not sampling
        uncertainty. The bootstrap CI is ~8x wider. Quoting the fold band as uncertainty
        understates it by an order of magnitude.
        """
        y = s67["y"].to_numpy(int)
        s = s67["s3_diag"].to_numpy(float)
        ci = MT.bootstrap_ci(y, -s, stat="auroc", n_boot=400, seed=42)
        width = ci["ci_hi"] - ci["ci_lo"]
        fold_band_width = 0.8908045977 - 0.8716235632
        assert width > 4 * fold_band_width, (width, fold_band_width)
        assert width / fold_band_width > 7.0, width / fold_band_width

    def test_permutation_p_is_reported_from_a_real_null(self, s67):
        y = s67["y"].to_numpy(int)
        s = s67["s3_diag"].to_numpy(float)
        res = MT.permutation_test(y, s, n_perm=2000, seed=42)
        assert res["empirical_p_two_sided"] < 0.01
        assert res["empirical_p_two_sided"] > 0.0, "add-one smoothing: p is never 0"
        assert 0.45 < res["null_mean"] < 0.55, res["null_mean"]
        assert res["n_perm"] == 2000

    def test_events_per_variable_bars_multivariable_claims(self, s67):
        """
        9 events. The conventional floor for an unpenalised multivariable logistic fit is
        ~10 events per variable. Every model in the comparison is far below it, so
        penalisation is mandatory and no unpenalised multivariable claim is admissible.
        """
        events = int(s67["y"].sum())
        assert events == 9
        epv = {n: events / n for n in (3, 4, 6)}
        assert epv[3] == pytest.approx(3.0)
        assert epv[4] == pytest.approx(2.25)
        assert epv[6] == pytest.approx(1.5)
        for n_params, v in epv.items():
            assert v < 10.0, (n_params, v)  # below the conventional EPV floor
        # the largest model in the comparison (M5, 6 params) is below EPV 2
        assert epv[6] < 2.0

    def test_firth_is_used_where_mle_would_be_unstable(self, s67):
        """Firth penalisation must move the estimate materially at these event counts —
        evidence that plain MLE is not trustworthy here."""
        y = s67["y"].to_numpy(int)
        z = (
            s67["s3_diag"].to_numpy(float) - s67["s3_diag"].mean()
        ) / s67["s3_diag"].std(ddof=0)
        fit = firth_logit(np.column_stack([z]), y)
        # index 0 is the intercept; index 1 is s3_diag
        assert fit["names"] == ["intercept", "x0"]
        assert fit["beta"][1] < 0
        assert fit["wald_p"][1] < 0.05
        assert fit["events"] == 9
        assert fit["n"] == 67
        # Firth must shrink the slope relative to plain MLE, and materially so
        import statsmodels.api as sm

        mle = sm.Logit(y, sm.add_constant(z)).fit(disp=0)
        assert abs(fit["beta"][1]) < abs(mle.params[1]), (fit["beta"][1], mle.params[1])
        assert mle.params[1] == pytest.approx(-3.6114, abs=5e-4)
        assert fit["beta"][1] == pytest.approx(-3.0025, abs=5e-4)
        assert abs(mle.params[1] - fit["beta"][1]) > 0.5
