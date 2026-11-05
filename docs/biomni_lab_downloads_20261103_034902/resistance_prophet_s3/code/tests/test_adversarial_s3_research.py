"""
Adversarial test suite for the S3 research scorer and the Sig7 prognosis guard.

These are REFUSAL tests. Each one asserts that a specific way of overselling or
mis-wiring the S3 signal is blocked by the code, not merely discouraged by a docstring.

Five families, mandated by the review directive:

  1. LEAKAGE                 outcome-derived features must not be scoreable; the pinned
                             scoring constants must not be re-derived from the payload
  2. DIRECTION REVERSAL      the protective direction is a locked constant; a contradicting
                             declaration must refuse, and the induced ordering must flip
                             when the feature is flipped
  3. SCHEMA DRIFT            a COSMIC signature namespace offered as a Macintyre exposure
                             must RAISE, not silently return None (the live C02 defect)
  4. THRESHOLD SUBSTITUTION  v0.2.0 locks 0.075 (Youden-optimal on n=98, inside the
                             fold envelope); the only admissible threshold is the lock
                             with its provenance record; 0.10 is permanently refused
  5. CLINICAL-ROUTE INFLUENCE flag off -> nothing; flag on -> research_only on every output
                             and no S3-derived value in any care-influencing field

Baseline note: the repository baseline on `main` is RED (231 failing/erroring collected
nodes, measured 2026-08-19 over 1,873 nodes; supersedes the earlier unverifiable 226).
These tests passing does NOT mean the repository is green.

Run: PYTHONPATH=. pytest api/services/resistance_prophet/test_adversarial_s3_research.py -q
"""

from __future__ import annotations

import math

import pytest

from api.services.resistance_prophet import s3_research as S
from api.services.resistance_prophet.prognosis import (
    SIG7_PROGNOSIS_ACTIONS_ENV,
    PrognosisEngine,
)
from api.services.resistance_prophet.schemas import PrognosisState

# ---------------------------------------------------------------------------
# Fixtures / helpers
# ---------------------------------------------------------------------------

VALID_MANIFEST = {
    "spec_version": S.SPEC_VERSION,
    "archive_sha256": S.SOURCE_ARCHIVE_SHA256,
    "member_sha256": dict(S.SOURCE_MEMBER_SHA256),
}

FLAG_ON = {S.RESEARCH_FLAG_ENV: "1"}
FLAG_OFF: dict = {}


def macintyre(value):
    """A payload on the one accepted path."""
    return {
        "molecular_profile": {
            "signatures": {"macintyre_cn_signatures": {"s3_diag": value}}
        }
    }


def cosmic(value, key="Sig7"):
    """A payload using the wrong signature framework (the live C02 shape)."""
    return {"molecular_profile": {"signatures": {"cosmic_cn_signatures": {key: value}}}}


# ===========================================================================
# FAMILY 1 — LEAKAGE
# ===========================================================================
class TestLeakage:
    def test_outcome_field_in_payload_is_never_read_as_the_feature(self):
        """
        The outcome itself, offered under the accepted signatures block, must not be
        picked up. Only the declared feature name is read.
        """
        payload = {
            "molecular_profile": {
                "signatures": {
                    "macintyre_cn_signatures": {
                        "pt_sensitivity_at_reg": 1.0,
                        "resistant": 1,
                        "platinum_resistant": True,
                    }
                }
            }
        }
        assert S.extract_s3_diag(payload) is None

    def test_outcome_labels_at_top_level_are_not_flat_aliases(self):
        for key in ("resistant", "pt_status", "pt_sensitivity_at_reg", "y", "label"):
            assert S.extract_s3_diag({key: 0.9}) is None, key

    def test_score_depends_on_the_feature_and_nothing_else(self):
        """
        Scoring constants are pinned, not fitted at call time. Adding outcome information
        to the payload must not move the score by a single float.
        """
        clean = macintyre(0.20)
        contaminated = macintyre(0.20)
        contaminated["outcome"] = {"resistant": 1, "os_event": 1, "os_time": 40.0}
        contaminated["molecular_profile"]["signatures"]["macintyre_cn_signatures"][
            "resistant"
        ] = 1

        a = S.score_for_research(
            clean, provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        b = S.score_for_research(
            contaminated, provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        assert a["rank_score"] == b["rank_score"]

    def test_pinned_constants_match_the_frozen_receipt(self):
        """
        Guards against silent refitting. These four values are the frozen scorer receipt
        (Brenus clinical_validation/trackA/cn_resistance_scorer_frozen_model.json).
        """
        assert S.PINNED_MU == pytest.approx(0.1767425892802721, abs=1e-15)
        assert S.PINNED_SD == pytest.approx(0.13804070487798628, abs=1e-15)
        assert S.PINNED_BETA0 == pytest.approx(-1.5244530417837185, abs=1e-15)
        assert S.PINNED_BETA1 == pytest.approx(-2.349692574868657, abs=1e-15)
        assert S.PINNED_BETA1 < 0, "negative slope encodes the protective direction"

    def test_missing_provenance_manifest_refuses(self):
        with pytest.raises(S.ProvenanceMismatchError):
            S.score_for_research(macintyre(0.20), provenance_manifest=None, env=FLAG_ON)

    def test_altered_source_checksum_refuses(self):
        bad = dict(VALID_MANIFEST, archive_sha256="0" * 64)
        with pytest.raises(S.ProvenanceMismatchError):
            S.score_for_research(macintyre(0.20), provenance_manifest=bad, env=FLAG_ON)

    def test_altered_member_checksum_refuses(self):
        members = dict(S.SOURCE_MEMBER_SHA256)
        members["figure_2.tsv"] = "f" * 64
        bad = dict(VALID_MANIFEST, member_sha256=members)
        with pytest.raises(S.ProvenanceMismatchError):
            S.score_for_research(macintyre(0.20), provenance_manifest=bad, env=FLAG_ON)

    def test_omitted_member_checksums_refuse(self):
        bad = {k: v for k, v in VALID_MANIFEST.items() if k != "member_sha256"}
        with pytest.raises(S.ProvenanceMismatchError):
            S.score_for_research(macintyre(0.20), provenance_manifest=bad, env=FLAG_ON)


# ===========================================================================
# FAMILY 2 — DIRECTION REVERSAL
# ===========================================================================
class TestDirectionReversal:
    def test_locked_direction_constant(self):
        assert S.DIRECTION_CONSTANT == "HIGHER_S3_IS_PLATINUM_SENSITIVE"

    def test_contradicting_declaration_refuses(self):
        with pytest.raises(S.DirectionContractViolation):
            S.score_for_research(
                macintyre(0.20),
                declared_direction="HIGHER_S3_IS_PLATINUM_RESISTANT",
                provenance_manifest=VALID_MANIFEST,
                env=FLAG_ON,
            )

    @pytest.mark.parametrize(
        "declared",
        ["", "higher_s3_is_platinum_sensitive", "PROTECTIVE", None, "HIGHER_S3_IS_SENSITIVE"],
    )
    def test_any_non_identical_declaration_refuses(self, declared):
        with pytest.raises(S.DirectionContractViolation):
            S.assert_direction(declared)

    def test_rank_score_is_monotone_decreasing_in_s3(self):
        xs = [0.0, 0.02, 0.05, 0.10, 0.18, 0.35, 0.60, 1.0]
        scores = [S.rank_score(x) for x in xs]
        assert all(b < a for a, b in zip(scores, scores[1:])), scores

    def test_flipping_the_feature_flips_the_induced_ordering(self):
        """A sign flip of the feature must reverse the rank ordering, not preserve it."""
        low, high = 0.02, 0.40
        assert S.rank_score(low) > S.rank_score(high)
        # flipped feature: emulate by exchanging the two values
        assert S.rank_score(high) < S.rank_score(low)
        # and the ordering is strict, not a tie
        assert S.rank_score(low) != S.rank_score(high)

    def test_no_sigmoid_is_applied(self):
        """
        Calibration fails (slope 1.537 CI [0.3394, 2.7345]; Brier skill -0.2762), so the
        output must be an unbounded linear predictor, never a 0-1 probability.
        """
        assert S.rank_score(0.0) > 1.0, "score at s3=0 must escape the probability range"
        assert S.rank_score(1.0) < 0.0
        out = S.score_for_research(
            macintyre(0.02), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        assert out["rank_score"] > 1.0
        assert "NOT a probability" in out["rank_score_scale"]


# ===========================================================================
# FAMILY 3 — SCHEMA DRIFT (the live C02 defect)
# ===========================================================================
class TestSchemaDrift:
    def test_cosmic_namespace_raises_and_does_not_return_none(self):
        with pytest.raises(S.SignatureNamespaceError):
            S.extract_s3_diag(cosmic(0.40, key="Sig3"))

    @pytest.mark.parametrize(
        "block", ["cosmic_cn_signatures", "cosmic_sbs_signatures", "sbs_signatures"]
    )
    def test_every_forbidden_namespace_raises(self, block):
        payload = {"molecular_profile": {"signatures": {block: {"Sig3": 0.4}}}}
        with pytest.raises(S.SignatureNamespaceError):
            S.extract_s3_diag(payload)

    @pytest.mark.parametrize("alias", ["Sig3", "SBS3", "cosmic_cn_sig3", "s3", "s7"])
    def test_flattened_framework_ambiguous_aliases_raise(self, alias):
        with pytest.raises(S.SignatureNamespaceError):
            S.extract_s3_diag({alias: 0.4})

    def test_genuine_absence_returns_none(self):
        assert S.extract_s3_diag({}) is None
        assert S.extract_s3_diag({"molecular_profile": {}}) is None
        assert S.extract_s3_diag({"molecular_profile": {"signatures": {}}}) is None

    def test_accepted_path_is_read(self):
        assert S.extract_s3_diag(macintyre(0.1767)) == pytest.approx(0.1767)

    def test_explicit_flat_feature_name_is_accepted(self):
        assert S.extract_s3_diag({"s3_diag": 0.25}) == pytest.approx(0.25)

    @pytest.mark.parametrize("bad", [-0.01, 1.01, 42.0])
    def test_out_of_range_raises(self, bad):
        with pytest.raises(S.FeatureRangeError):
            S.extract_s3_diag(macintyre(bad))

    @pytest.mark.parametrize("bad", ["high", None, [0.2], {"v": 0.2}])
    def test_non_numeric_raises_or_is_absent(self, bad):
        payload = macintyre(bad)
        if bad is None:
            # None on the accepted path is indistinguishable from absent
            assert S.extract_s3_diag(payload) is None
        else:
            with pytest.raises(S.FeatureRangeError):
                S.extract_s3_diag(payload)

    def test_nan_and_inf_raise(self):
        for bad in (float("nan"), float("inf"), float("-inf")):
            with pytest.raises(S.FeatureRangeError):
                S.extract_s3_diag(macintyre(bad))

    def test_non_mapping_payload_raises(self):
        with pytest.raises(S.FeatureRangeError):
            S.extract_s3_diag([("s3_diag", 0.2)])  # type: ignore[arg-type]

    def test_cosmic_block_present_alongside_accepted_path_is_ignored(self):
        """
        If the Macintyre path IS present, a stray COSMIC block must not change the value.
        Precedence is explicit, not incidental.
        """
        payload = macintyre(0.30)
        payload["molecular_profile"]["signatures"]["cosmic_cn_signatures"] = {"Sig3": 0.99}
        assert S.extract_s3_diag(payload) == pytest.approx(0.30)


# ===========================================================================
# FAMILY 4 — THRESHOLD SUBSTITUTION
# ===========================================================================
class TestThresholdSubstitution:
    def test_threshold_is_locked_in_this_version(self):
        assert S.LOCKED_THRESHOLD == 0.075
        prov = S.LOCKED_THRESHOLD_PROVENANCE
        assert prov["value"] == S.LOCKED_THRESHOLD
        assert prov["spec_version"] == S.SPEC_VERSION
        assert {"value", "spec_version", "dataset", "analysis",
                "oof_sensitivity", "oof_specificity"} <= set(prov)
        assert S.CANDIDATE_THRESHOLD == 0.10
        assert S.CANDIDATE_THRESHOLD_VERDICT == "REJECTED_AS_LOCK"
        assert S.CANDIDATE_THRESHOLD_PROVENANCE == "UNSOURCED_IN_REPOSITORY"

    def test_locked_threshold_lies_inside_the_measured_fold_envelope(self):
        lo, hi = S.CUTPOINT_FOLD_ENVELOPE
        assert lo <= S.LOCKED_THRESHOLD <= hi, (
            f"the locked threshold {S.LOCKED_THRESHOLD} must lie inside the in-fold "
            f"cutpoint envelope [{lo}, {hi}] measured over 100 training folds"
        )
        blo, bhi = S.CUTPOINT_BOOTSTRAP_CI
        assert blo <= S.LOCKED_THRESHOLD <= bhi

    def test_candidate_threshold_lies_outside_the_measured_fold_envelope(self):
        lo, hi = S.CUTPOINT_FOLD_ENVELOPE
        assert not (lo <= S.CANDIDATE_THRESHOLD <= hi), (
            "0.10 must remain recorded as outside the in-fold cutpoint envelope "
            f"[{lo}, {hi}] measured over 100 training folds"
        )

    def test_locked_threshold_without_provenance_is_rejected(self):
        with pytest.raises(S.ThresholdSubstitutionError):
            S.assert_threshold_admissible(S.LOCKED_THRESHOLD, None)

    def test_incomplete_provenance_is_rejected(self):
        partial = {"value": 0.075, "spec_version": S.SPEC_VERSION, "dataset": "BriTROC-1"}
        with pytest.raises(S.ThresholdSubstitutionError):
            S.assert_threshold_admissible(S.LOCKED_THRESHOLD, partial)

    def test_provenance_value_must_match_the_locked_threshold(self):
        prov = dict(S.LOCKED_THRESHOLD_PROVENANCE, value=0.10)
        with pytest.raises(S.ThresholdSubstitutionError):
            S.assert_threshold_admissible(S.LOCKED_THRESHOLD, prov)

    def test_provenance_spec_version_must_match_the_lock(self):
        prov = dict(S.LOCKED_THRESHOLD_PROVENANCE, spec_version="0.1.0")
        with pytest.raises(S.ThresholdSubstitutionError):
            S.assert_threshold_admissible(S.LOCKED_THRESHOLD, prov)

    def test_substituting_a_non_locked_threshold_is_rejected(self):
        # 0.10 with a complete provenance record and a version bump is STILL refused:
        # it is not the lock.
        prov = {
            "value": 0.10,
            "spec_version": "9.9.9",
            "dataset": "BriTROC-1 n=67",
            "analysis": "OOF Youden over 100 folds",
            "oof_sensitivity": 1.0,
            "oof_specificity": 0.7069,
        }
        with pytest.raises(S.ThresholdSubstitutionError):
            S.assert_threshold_admissible(0.10, prov)

    def test_the_locked_threshold_with_its_record_is_admissible(self):
        S.assert_threshold_admissible(S.LOCKED_THRESHOLD, S.LOCKED_THRESHOLD_PROVENANCE)

    def test_scoring_path_enforces_the_same_rule(self):
        with pytest.raises(S.ThresholdSubstitutionError):
            S.score_for_research(
                macintyre(0.05),
                provenance_manifest=VALID_MANIFEST,
                threshold=0.10,
                env=FLAG_ON,
            )

    def test_the_locked_threshold_is_applied_by_default(self):
        out = S.score_for_research(
            macintyre(0.05), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        assert out["threshold_applied"] == 0.075
        assert out["below_locked_threshold"] is True
        assert "LOCKED" in out["threshold_status"]
        assert "REJECTED_AS_LOCK" in out["threshold_status"]

    def test_above_threshold_payload_flags_false(self):
        out = S.score_for_research(
            macintyre(0.30), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        assert out["below_locked_threshold"] is False

    def test_gate_e_designated_decision_is_hardcoded(self):
        assert S.GATE_E_DESIGNATED_DECISION == (
            "Prioritize s3_diag <= 0.075 patients for non-platinum "
            "clinical-trial screening."
        )
        out = S.score_for_research(
            macintyre(0.05), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        assert out["gate_e_designated_decision"] == S.GATE_E_DESIGNATED_DECISION


# ===========================================================================
# FAMILY 5 — CLINICAL-ROUTE INFLUENCE
# ===========================================================================
class TestClinicalRouteInfluence:
    def test_flag_off_returns_nothing(self, monkeypatch):
        monkeypatch.delenv(S.RESEARCH_FLAG_ENV, raising=False)
        assert S.research_enabled() is False
        assert (
            S.score_for_research(macintyre(0.20), provenance_manifest=VALID_MANIFEST)
            is None
        )

    @pytest.mark.parametrize("val", ["0", "false", "no", "off", "", "maybe", "2"])
    def test_only_explicit_truthy_values_enable(self, val):
        assert S.research_enabled({S.RESEARCH_FLAG_ENV: val}) is False

    @pytest.mark.parametrize("val", ["1", "true", "TRUE", "Yes", "on"])
    def test_truthy_values_enable(self, val):
        assert S.research_enabled({S.RESEARCH_FLAG_ENV: val}) is True

    def test_flag_off_refuses_before_any_contract_check(self, monkeypatch):
        """
        With the flag off the function must return None even for a payload that would
        otherwise raise, so a disabled feature cannot become a denial-of-service surface.
        """
        monkeypatch.delenv(S.RESEARCH_FLAG_ENV, raising=False)
        assert S.score_for_research(cosmic(0.4, key="Sig3")) is None

    def test_every_output_is_labelled_research_only(self):
        out = S.score_for_research(
            macintyre(0.20), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        assert out["research_only"] is True
        assert out["intended_use"] == "RANKING_ONLY"
        assert out["regulatory_status"].startswith("Research Use Only")
        assert out["external_validity"].startswith("NONE")
        assert "FAILS" in out["calibration_status"]

    def test_output_contains_no_care_influencing_key(self):
        out = S.score_for_research(
            macintyre(0.20), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        assert not (S.CARE_INFLUENCING_FIELDS & set(out)), sorted(
            S.CARE_INFLUENCING_FIELDS & set(out)
        )
        for banned in ("probability", "risk_level", "action_recommendation", "confidence"):
            assert banned not in out

    def test_prohibitions_are_carried_on_the_payload(self):
        out = S.score_for_research(
            macintyre(0.20), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        assert "no probability" in out["prohibitions"]
        assert "no AUROC-to-confidence conversion" in out["prohibitions"]
        assert ("no threshold substitution without a spec version bump and "
                "provenance record") in out["prohibitions"]

    def test_care_influence_detector_catches_a_deliberate_leak(self):
        out = S.score_for_research(
            macintyre(0.20), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        response = {
            "s3_research": out,
            "prediction": {"probability": out["rank_score"]},  # deliberate violation
        }
        with pytest.raises(S.CareInfluenceViolation):
            S.verify_no_care_influence(response)

    def test_care_influence_detector_catches_a_nested_leak(self):
        out = S.score_for_research(
            macintyre(0.20), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        response = {
            "s3_research": out,
            "plan": {"steps": [{"recommended_actions": [out["feature_value"]]}]},
        }
        with pytest.raises(S.CareInfluenceViolation):
            S.verify_no_care_influence(response)

    def test_clean_response_passes_the_detector(self):
        out = S.score_for_research(
            macintyre(0.20), provenance_manifest=VALID_MANIFEST, env=FLAG_ON
        )
        response = {
            "s3_research": out,
            "prediction": {"probability": 0.42, "risk_level": "MEDIUM"},
            "prognosis": {"state": "UNCERTAIN", "action_recommendation": "ROUTINE_SURVEILLANCE"},
        }
        S.verify_no_care_influence(response)  # must not raise

    def test_module_provenance_is_self_describing(self):
        p = S.module_provenance()
        assert p["intended_use"] == "RANKING_ONLY"
        assert p["locked_threshold"] == 0.075
        assert p["locked_threshold_provenance"]["value"] == 0.075
        assert p["gate_e_designated_decision"] == S.GATE_E_DESIGNATED_DECISION
        assert p["candidate_threshold_verdict"] == "REJECTED_AS_LOCK"
        assert p["source_archive_sha256"] == S.SOURCE_ARCHIVE_SHA256
        assert p["source_archive_bytes"] == 10603503


# ===========================================================================
# FAMILY 5b — the Sig7 prognosis guard (C01/C13), same family: care influence
# ===========================================================================
class TestSig7PrognosisGuard:
    HIGH = {"molecular_profile": {"signatures": {"cosmic_cn_signatures": {"Sig7": 0.90}}}}
    LOW = {"molecular_profile": {"signatures": {"cosmic_cn_signatures": {"Sig7": 0.01}}}}

    def _assess(self, payload):
        return PrognosisEngine().assess_risk(payload, is_post_treatment=True)

    def test_flag_unset_never_returns_poor(self, monkeypatch):
        monkeypatch.delenv(SIG7_PROGNOSIS_ACTIONS_ENV, raising=False)
        for payload in (self.HIGH, self.LOW):
            r = self._assess(payload)
            assert r.state == PrognosisState.UNCERTAIN
            assert r.action_recommendation == "ROUTINE_SURVEILLANCE"
            assert r.confidence == "LOW"

    def test_flag_unset_never_intensifies_surveillance(self, monkeypatch):
        monkeypatch.delenv(SIG7_PROGNOSIS_ACTIONS_ENV, raising=False)
        for exposure in [0.0, 0.24, 0.25, 0.26, 0.5, 0.99, 1.0]:
            payload = {
                "molecular_profile": {
                    "signatures": {"cosmic_cn_signatures": {"Sig7": exposure}}
                }
            }
            r = self._assess(payload)
            assert r.action_recommendation != "INTENSIFY_SURVEILLANCE", exposure
            assert r.state != PrognosisState.POOR, exposure

    def test_suppression_rationale_states_the_falsification_evidence(self, monkeypatch):
        monkeypatch.delenv(SIG7_PROGNOSIS_ACTIONS_ENV, raising=False)
        text = " ".join(self._assess(self.HIGH).rationale)
        assert "0.8739" in text or "0.874" in text
        assert "0.3136" in text
        assert "0.421" in text
        assert "0.6446" in text
        assert "C02" in text  # namespace caveat is disclosed on every output

    def test_observed_value_is_reported_without_interpretation(self, monkeypatch):
        monkeypatch.delenv(SIG7_PROGNOSIS_ACTIONS_ENV, raising=False)
        text = " ".join(self._assess(self.HIGH).rationale)
        assert "0.900" in text
        assert "High Sig7 Exposure" not in text

    def test_research_flag_restores_legacy_behaviour_with_a_disclaimer(self, monkeypatch):
        monkeypatch.setenv(SIG7_PROGNOSIS_ACTIONS_ENV, "1")
        hi = self._assess(self.HIGH)
        assert hi.state == PrognosisState.POOR
        assert hi.action_recommendation == "INTENSIFY_SURVEILLANCE"
        assert any("NOT clinically validated" in r for r in hi.rationale)
        lo = self._assess(self.LOW)
        assert lo.state == PrognosisState.FAVORABLE
        assert any("NOT clinically validated" in r for r in lo.rationale)

    def test_absent_signature_is_uncertain_under_both_flag_states(self, monkeypatch):
        for value in ("1", None):
            if value is None:
                monkeypatch.delenv(SIG7_PROGNOSIS_ACTIONS_ENV, raising=False)
            else:
                monkeypatch.setenv(SIG7_PROGNOSIS_ACTIONS_ENV, value)
            r = self._assess({"molecular_profile": {"signatures": {}}})
            assert r.state == PrognosisState.UNCERTAIN
            assert r.action_recommendation == "ROUTINE_SURVEILLANCE"

    def test_pre_treatment_gate_is_unchanged(self, monkeypatch):
        monkeypatch.setenv(SIG7_PROGNOSIS_ACTIONS_ENV, "1")
        r = PrognosisEngine().assess_risk(self.HIGH, is_post_treatment=False)
        assert r.state == PrognosisState.UNCERTAIN
        assert r.action_recommendation == "ROUTINE_SURVEILLANCE"

    def test_dataclass_schema_is_unchanged(self):
        """The guard must not have altered the wire contract."""
        r = self._assess(self.HIGH)
        assert set(r.__dataclass_fields__) == {
            "state",
            "confidence",
            "rationale",
            "action_recommendation",
        }

    def test_no_s3_value_reaches_prognosis(self, monkeypatch):
        """
        S3 and the Sig7 prognosis branch are disjoint. Supplying an s3 exposure must not
        change the prognosis result in any way.
        """
        monkeypatch.delenv(SIG7_PROGNOSIS_ACTIONS_ENV, raising=False)
        payload = {
            "molecular_profile": {
                "signatures": {
                    "cosmic_cn_signatures": {"Sig7": 0.90},
                    "macintyre_cn_signatures": {"s3_diag": 0.02},
                }
            }
        }
        with_s3 = self._assess(payload)
        without_s3 = self._assess(self.HIGH)
        assert with_s3.state == without_s3.state
        assert with_s3.action_recommendation == without_s3.action_recommendation
        assert "0.02" not in " ".join(with_s3.rationale)


# ===========================================================================
# Numeric sanity of the pinned linear predictor
# ===========================================================================
def test_rank_score_matches_hand_computation():
    x = 0.05
    z = (x - S.PINNED_MU) / S.PINNED_SD
    expected = S.PINNED_BETA0 + S.PINNED_BETA1 * z
    assert S.rank_score(x) == pytest.approx(expected, abs=1e-12)
    assert math.isfinite(S.rank_score(x))


def test_rank_score_rejects_non_numeric():
    for bad in ("0.2", None, True, [0.2]):
        with pytest.raises(S.FeatureRangeError):
            S.rank_score(bad)  # type: ignore[arg-type]
