"""
S3 research scorer — RESEARCH USE ONLY. RANKING ONLY. NOT A CLINICAL PRODUCT.

Copy-number signature 3 exposure at diagnosis (`s3_diag`) as a *ranking* variable for
platinum-sensitivity enrichment in high-grade serous ovarian carcinoma.

Governing specification
-----------------------
  spec            RESISTANCE_PROPHET_S3_CANDIDATE v0.1.0  (candidate_spec_v0.1.0.json)
  endpoint        ENDPOINT_CONTRACT v1.0.0                (ENDPOINT_CONTRACT_v1.md)
  model card      MODEL_CARD.md
  evidence        s3_reproduction_report.md, w3_analysis.json, w3f_reconciliation.json

What the evidence supports (measured, reproduced from public source data)
------------------------------------------------------------------------
  * n=98, 20 events : AUROC(raw s3 vs resistance) = 0.2715 [0.1532, 0.4058]
                      protective orientation      = 0.7285 [0.5942, 0.8468]
                      permutation p (10,000)      = 0.0014
  * n=67,  9 events : protective AUROC            = 0.887  [0.8017, 0.9579]
  * incremental OOF AUROC over a clinical baseline  +0.3525 [0.1494, 0.5480]
  * incremental OOF AUROC over BRCA/HR mutation     +0.6571 [0.4713, 0.8257]

What the evidence does NOT support — enforced by this module
-----------------------------------------------------------
  * No per-patient probability. Calibration slope 1.537, 95% CI [0.3394, 2.7345];
    Brier 0.1484 vs prevalence-only 0.1163 => skill -0.2762. Absolute risk is worse
    than quoting the base rate. This module therefore emits a *rank score only* and
    deliberately does not apply a sigmoid.
  * No AUROC -> "confidence" conversion. 0.8807 is not "88% confidence".
  * No locked decision threshold. The candidate 0.10 is REJECTED_AS_LOCK: it lies
    outside the in-fold cutpoint envelope [0.0502, 0.0798] over 100 training folds,
    and its provenance is UNSOURCED_IN_REPOSITORY.
  * No action_recommendation, no treatment_recommendation, no risk_level.
  * No external validity. Gate C is BLOCKED — no independent cohort has been tested.

Deployment contract
-------------------
  Flag ZETA_S3_RESEARCH_ENABLED, default OFF.
    OFF -> score_for_research() returns None. No S3-derived value reaches any field.
    ON  -> every output carries research_only=True and intended_use="RANKING_ONLY".

Failure mode policy: fail CLOSED and LOUD. A wrong-namespace signature field, a
reversed direction declaration, a missing provenance manifest or a substituted
threshold all raise. None of them silently degrade to None or to a default.
"""

from __future__ import annotations

import math
import os
from dataclasses import dataclass, field
from typing import Any, Dict, Iterable, Mapping, Optional

# ---------------------------------------------------------------------------
# Identity and contract constants
# ---------------------------------------------------------------------------

SPEC_ID = "RESISTANCE_PROPHET_S3_CANDIDATE"
SPEC_VERSION = "0.2.0"
ENDPOINT_CONTRACT_ID = "ENDPOINT_CONTRACT"
ENDPOINT_CONTRACT_VERSION = "1.0.0"

INTENDED_USE = "RANKING_ONLY"
REGULATORY_STATUS = "Research Use Only. Not for diagnostic procedures."

RESEARCH_FLAG_ENV = "ZETA_S3_RESEARCH_ENABLED"
_TRUTHY = frozenset({"1", "true", "yes", "on"})

# The direction constant. Higher s3 exposure at diagnosis == more platinum SENSITIVE.
# Source: Macintyre 2018 Nat Genet 50:1262 (s3 = BRCA1/2-related HRD axis, positively
# prognostic); Smith 2023 Nat Commun 14:4387 ("s3 ... significantly lower ... in the
# primary resistant population at diagnosis"). Verified in both denominators here.
DIRECTION_CONSTANT = "HIGHER_S3_IS_PLATINUM_SENSITIVE"

# ---------------------------------------------------------------------------
# Feature namespace contract
# ---------------------------------------------------------------------------

FEATURE_NAME = "s3_diag"
FEATURE_FRAMEWORK = "MACINTYRE_2018_7_SIGNATURE"
FEATURE_FRAMEWORK_CITATION = (
    "Macintyre G, Goranova TE, De Silva D, et al. Nat Genet 50, 1262-1270 (2018). "
    "DOI 10.1038/s41588-018-0179-8"
)

# The ONLY accepted nested path, plus a flattened alias for already-extracted features.
ACCEPTED_NESTED_PATH = ("molecular_profile", "signatures", "macintyre_cn_signatures", "s3_diag")
ACCEPTED_FLAT_KEYS = ("s3_diag",)

# Namespaces that are a DIFFERENT framework. Reading one of these as a Macintyre
# exposure is an error, not a fallback. This is the live defect recorded as C02:
# prognosis.py derives a threshold from Macintyre/BriTROC s7 but reads
# molecular_profile.signatures.cosmic_cn_signatures.Sig7.
FORBIDDEN_SIGNATURE_NAMESPACES = ("cosmic_cn_signatures", "cosmic_sbs_signatures", "sbs_signatures")
FORBIDDEN_FEATURE_ALIASES = frozenset(
    {"Sig3", "Sig7", "SBS3", "SBS7", "cosmic_cn_sig3", "cosmic_sig3", "s3", "s7"}
)

# ---------------------------------------------------------------------------
# Pinned numeric constants (rank use only)
# ---------------------------------------------------------------------------
# Standardisation and linear predictor pinned from the frozen scorer receipt
# (Brenus clinical_validation/trackA/cn_resistance_scorer_frozen_model.json).
# BETA1 < 0 encodes the protective direction. The sigmoid is intentionally NOT applied.
PINNED_MU = 0.1767425892802721
PINNED_SD = 0.13804070487798628
PINNED_BETA0 = -1.5244530417837185
PINNED_BETA1 = -2.349692574868657

# Scaling denominator used by the pinned adjusted-analysis contract (n=98 modeling set).
ADJUSTED_ANALYSIS_SD_N98 = 0.133721

FEATURE_MIN = 0.0
FEATURE_MAX = 1.0

# ---------------------------------------------------------------------------
# Threshold record
# ---------------------------------------------------------------------------
CANDIDATE_THRESHOLD = 0.10  # historical record only; never admissible
CANDIDATE_THRESHOLD_PROVENANCE = "UNSOURCED_IN_REPOSITORY"
CANDIDATE_THRESHOLD_VERDICT = "REJECTED_AS_LOCK"
CUTPOINT_FOLD_ENVELOPE = (0.0502, 0.0798)
CUTPOINT_BOOTSTRAP_CI = (0.0467, 0.2084)

# Locked in v0.2.0: the Youden-J grid optimum on the n=98 primary analysis set.
# 0.075 lies inside the 100-fold in-fold cutpoint envelope and the bootstrap CI;
# the directive's 0.10 is rejected (unsourced, outside the envelope, and grid-
# optimal only on the n=67 subset via a zero false-negative cell).
LOCKED_THRESHOLD: Optional[float] = 0.075
LOCKED_THRESHOLD_PROVENANCE = {
    "value": 0.075,
    "spec_version": "0.2.0",
    "dataset": ("BriTROC-1 diagnosis primary analysis set "
                "(n=98, 20 resistant events, prevalence 0.2041)"),
    "analysis": ("Youden-J optimum over the prespecified grid [0.025..0.150] on "
                 "out-of-fold predictions (J=0.4564); inside the 100-fold in-fold "
                 "cutpoint envelope [0.0502, 0.0798] and the bootstrap cutpoint CI "
                 "[0.0467, 0.2084]"),
    "oof_sensitivity": 0.70,
    "oof_specificity": 0.7564,
}

# Gate E designated clinical decision (the decision the clinical-utility gate
# will evaluate; a research-use screening hypothesis, not a live recommendation).
GATE_E_DESIGNATED_DECISION = (
    "Prioritize s3_diag <= 0.075 patients for non-platinum clinical-trial screening."
)

_REQUIRED_THRESHOLD_PROVENANCE_KEYS = frozenset(
    {"value", "spec_version", "dataset", "analysis", "oof_sensitivity", "oof_specificity"}
)

# ---------------------------------------------------------------------------
# Provenance pins (source data)
# ---------------------------------------------------------------------------
SOURCE_ARCHIVE_SHA256 = "2f7f15417e3a5076633dd75abbad75a26285d94ec1e26f8f22ebf10d337a0a3f"
SOURCE_ARCHIVE_BYTES = 10603503
SOURCE_MEMBER_SHA256 = {
    "figure_4A.tsv": "0441d719edea4377c2ad1cc4f9e922a44edbc7481729194dce3bfbb2069a0187",
    "figure_1B_layer_1.tsv": "3c65ef5921b6d9a2a311fab4070f2f2af99c90b5e14a8e0629eae2b62f3b9b1d",
    "figure_2.tsv": "9e653d2b10b25c668bc508da9b1a667d94a7f99bd0500ba53aaeb53d51a9a3eb",
}

# ---------------------------------------------------------------------------
# Care-influencing field names this module must never populate
# ---------------------------------------------------------------------------
CARE_INFLUENCING_FIELDS = frozenset(
    {
        "probability",
        "risk_level",
        "urgency",
        "action_recommendation",
        "recommended_actions",
        "treatment_recommendation",
        "next_line_options",
        "prognosis",
        "confidence",
        "confidence_cap",
        "state",
    }
)


# ---------------------------------------------------------------------------
# Exceptions — all fail closed
# ---------------------------------------------------------------------------
class S3ResearchError(RuntimeError):
    """Base class. Every failure in this module is loud."""


class SignatureNamespaceError(S3ResearchError):
    """A signature field from a different framework was offered as a Macintyre exposure."""


class DirectionContractViolation(S3ResearchError):
    """A caller declared a direction that contradicts the locked direction constant."""


class ThresholdSubstitutionError(S3ResearchError):
    """A threshold was supplied without a version bump and a complete provenance record."""


class ProvenanceMismatchError(S3ResearchError):
    """Source-data checksums or spec version do not match the pinned values."""


class FeatureRangeError(S3ResearchError):
    """The offered exposure value is not a finite number inside the declared range."""


class CareInfluenceViolation(S3ResearchError):
    """An S3-derived value was about to be written into a care-influencing field."""


# ---------------------------------------------------------------------------
# Flag
# ---------------------------------------------------------------------------
def research_enabled(env: Optional[Mapping[str, str]] = None) -> bool:
    """True only when ZETA_S3_RESEARCH_ENABLED is explicitly truthy."""
    src = os.environ if env is None else env
    return str(src.get(RESEARCH_FLAG_ENV, "")).strip().lower() in _TRUTHY


# ---------------------------------------------------------------------------
# Provenance enforcement
# ---------------------------------------------------------------------------
def assert_provenance(manifest: Optional[Mapping[str, Any]]) -> None:
    """
    Refuse to score unless the caller presents a manifest matching the pinned
    source-data checksums and spec version. A missing manifest is a failure, not
    a permission to proceed.
    """
    if manifest is None:
        raise ProvenanceMismatchError(
            "no provenance manifest supplied; scoring refused (fail-closed). "
            f"required: archive_sha256={SOURCE_ARCHIVE_SHA256}, spec_version={SPEC_VERSION}"
        )
    if manifest.get("spec_version") != SPEC_VERSION:
        raise ProvenanceMismatchError(
            f"spec_version mismatch: got {manifest.get('spec_version')!r}, pinned {SPEC_VERSION!r}"
        )
    if manifest.get("archive_sha256") != SOURCE_ARCHIVE_SHA256:
        raise ProvenanceMismatchError(
            f"source archive SHA256 mismatch: got {manifest.get('archive_sha256')!r}, "
            f"pinned {SOURCE_ARCHIVE_SHA256!r}"
        )
    members = manifest.get("member_sha256") or {}
    for name, digest in SOURCE_MEMBER_SHA256.items():
        if members.get(name) != digest:
            raise ProvenanceMismatchError(
                f"source member SHA256 mismatch for {name}: got {members.get(name)!r}, pinned {digest!r}"
            )


# ---------------------------------------------------------------------------
# Direction enforcement
# ---------------------------------------------------------------------------
def assert_direction(declared_direction: str) -> None:
    """A declared direction contradicting the locked constant must refuse."""
    if declared_direction != DIRECTION_CONSTANT:
        raise DirectionContractViolation(
            f"declared direction {declared_direction!r} contradicts locked constant "
            f"{DIRECTION_CONSTANT!r}; scoring refused"
        )


# ---------------------------------------------------------------------------
# Threshold enforcement
# ---------------------------------------------------------------------------
def assert_threshold_admissible(
    threshold: Optional[float],
    threshold_provenance: Optional[Mapping[str, Any]] = None,
) -> None:
    """
    v0.2.0 locks 0.075. The only admissible threshold is the lock itself, presented
    with its complete provenance record. Any other value -- including the rejected
    candidate 0.10 -- refuses, no matter how complete its provenance.
    """
    if threshold is None:
        return
    if LOCKED_THRESHOLD is None:
        # Pre-lock governance (v0.1.0 behaviour, retained for provenance): any
        # threshold must arrive with a version BUMP and a complete provenance record.
        if threshold_provenance is None:
            raise ThresholdSubstitutionError(
                f"threshold {threshold!r} supplied without a provenance record; rejected. "
                f"candidate {CANDIDATE_THRESHOLD} is {CANDIDATE_THRESHOLD_VERDICT} "
                f"(provenance {CANDIDATE_THRESHOLD_PROVENANCE}; outside fold envelope "
                f"{CUTPOINT_FOLD_ENVELOPE})"
            )
        missing = _REQUIRED_THRESHOLD_PROVENANCE_KEYS - set(threshold_provenance)
        if missing:
            raise ThresholdSubstitutionError(
                f"threshold provenance incomplete; missing {sorted(missing)}"
            )
        if threshold_provenance.get("value") != threshold:
            raise ThresholdSubstitutionError(
                f"threshold provenance value {threshold_provenance.get('value')!r} does not match "
                f"the supplied threshold {threshold!r}"
            )
        if threshold_provenance.get("spec_version") == SPEC_VERSION:
            raise ThresholdSubstitutionError(
                f"locking a threshold requires a spec version bump; got {SPEC_VERSION!r} unchanged"
            )
        return
    if threshold != LOCKED_THRESHOLD:
        raise ThresholdSubstitutionError(
            f"threshold {threshold!r} is not the locked threshold {LOCKED_THRESHOLD!r}; "
            f"substitution requires a spec version bump and a new provenance record. "
            f"candidate {CANDIDATE_THRESHOLD} remains {CANDIDATE_THRESHOLD_VERDICT} "
            f"(provenance {CANDIDATE_THRESHOLD_PROVENANCE})"
        )
    if threshold_provenance is None:
        raise ThresholdSubstitutionError(
            f"the locked threshold {LOCKED_THRESHOLD!r} must be accompanied by its "
            f"provenance record"
        )
    missing = _REQUIRED_THRESHOLD_PROVENANCE_KEYS - set(threshold_provenance)
    if missing:
        raise ThresholdSubstitutionError(
            f"threshold provenance incomplete; missing {sorted(missing)}"
        )
    if threshold_provenance.get("value") != LOCKED_THRESHOLD:
        raise ThresholdSubstitutionError(
            f"threshold provenance value {threshold_provenance.get('value')!r} does not match "
            f"the locked threshold {LOCKED_THRESHOLD!r}"
        )
    if threshold_provenance.get("spec_version") != SPEC_VERSION:
        raise ThresholdSubstitutionError(
            f"threshold provenance spec_version {threshold_provenance.get('spec_version')!r} "
            f"does not match the locked spec version {SPEC_VERSION!r}"
        )


# ---------------------------------------------------------------------------
# Feature extraction — namespace-strict
# ---------------------------------------------------------------------------
def _iter_signature_blocks(payload: Mapping[str, Any]) -> Iterable[str]:
    sig = (payload.get("molecular_profile") or {}).get("signatures") or {}
    if isinstance(sig, Mapping):
        for key in sig:
            yield str(key)


def extract_s3_diag(payload: Mapping[str, Any]) -> Optional[float]:
    """
    Return the Macintyre s3 diagnosis-stage exposure, or None when it is genuinely absent.

    Raises SignatureNamespaceError when a DIFFERENT signature framework is offered in
    place of the Macintyre exposure. Silently returning None in that case is the C02
    defect; this function refuses to reproduce it.
    """
    if not isinstance(payload, Mapping):
        raise FeatureRangeError(f"payload must be a mapping, got {type(payload).__name__}")

    node: Any = payload
    for part in ACCEPTED_NESTED_PATH[:-1]:
        node = (node or {}).get(part) if isinstance(node, Mapping) else None
    accepted_block = node if isinstance(node, Mapping) else {}
    raw = accepted_block.get(ACCEPTED_NESTED_PATH[-1])

    if raw is None:
        for key in ACCEPTED_FLAT_KEYS:
            if key in payload:
                raw = payload[key]
                break

    if raw is None:
        # Nothing on the accepted path. If a forbidden namespace is present, this is a
        # framework mismatch and must be loud.
        present_blocks = set(_iter_signature_blocks(payload))
        offending = [b for b in FORBIDDEN_SIGNATURE_NAMESPACES if b in present_blocks]
        if offending:
            raise SignatureNamespaceError(
                f"signature block(s) {offending} present but the required "
                f"{FEATURE_FRAMEWORK} path {'.'.join(ACCEPTED_NESTED_PATH)} is absent. "
                "COSMIC CN/SBS signatures are a different framework with different "
                "definitions and must not be substituted for a Macintyre exposure. "
                f"Framework citation: {FEATURE_FRAMEWORK_CITATION}"
            )
        forbidden_flat = FORBIDDEN_FEATURE_ALIASES & set(map(str, payload.keys()))
        if forbidden_flat:
            raise SignatureNamespaceError(
                f"flattened key(s) {sorted(forbidden_flat)} present but ambiguous; "
                f"{FEATURE_NAME} must be supplied explicitly under {FEATURE_FRAMEWORK}"
            )
        return None

    try:
        value = float(raw)
    except (TypeError, ValueError) as exc:
        raise FeatureRangeError(f"{FEATURE_NAME} is not numeric: {raw!r}") from exc
    if not math.isfinite(value):
        raise FeatureRangeError(f"{FEATURE_NAME} is not finite: {value!r}")
    if not (FEATURE_MIN <= value <= FEATURE_MAX):
        raise FeatureRangeError(
            f"{FEATURE_NAME}={value!r} outside declared range [{FEATURE_MIN}, {FEATURE_MAX}]"
        )
    return value


# ---------------------------------------------------------------------------
# Rank score
# ---------------------------------------------------------------------------
def rank_score(s3_diag: float) -> float:
    """
    Monotone-DECREASING rank score in s3_diag (higher score == relatively more likely
    platinum-resistant *within the scored set*).

    This is a linear predictor on the logit scale. It is NOT a probability and no
    sigmoid is applied, because calibration fails (slope CI [0.3394, 2.7345], Brier
    skill -0.2762). Only the ordering it induces is supported.
    """
    if not isinstance(s3_diag, (int, float)) or isinstance(s3_diag, bool):
        raise FeatureRangeError(f"s3_diag must be a real number, got {type(s3_diag).__name__}")
    value = float(s3_diag)
    if not math.isfinite(value):
        raise FeatureRangeError(f"s3_diag is not finite: {value!r}")
    z = (value - PINNED_MU) / PINNED_SD
    return PINNED_BETA0 + PINNED_BETA1 * z


# ---------------------------------------------------------------------------
# Output record
# ---------------------------------------------------------------------------
@dataclass(frozen=True)
class S3ResearchOutput:
    """Research-only S3 output. Carries no probability and no action."""

    research_only: bool = True
    intended_use: str = INTENDED_USE
    regulatory_status: str = REGULATORY_STATUS
    spec_id: str = SPEC_ID
    spec_version: str = SPEC_VERSION
    endpoint_contract: str = f"{ENDPOINT_CONTRACT_ID} v{ENDPOINT_CONTRACT_VERSION}"
    feature_name: str = FEATURE_NAME
    feature_framework: str = FEATURE_FRAMEWORK
    feature_value: float = float("nan")
    direction: str = DIRECTION_CONSTANT
    rank_score: float = float("nan")
    rank_score_scale: str = "logit-scale linear predictor; monotone decreasing in s3_diag; NOT a probability"
    threshold_applied: Optional[float] = None
    below_locked_threshold: Optional[bool] = None
    gate_e_designated_decision: str = GATE_E_DESIGNATED_DECISION
    threshold_status: str = (f"LOCKED at {LOCKED_THRESHOLD} in v{SPEC_VERSION} "
                             f"(Youden-optimal on n=98, in-fold envelope "
                             f"{CUTPOINT_FOLD_ENVELOPE}); candidate "
                             f"{CANDIDATE_THRESHOLD} {CANDIDATE_THRESHOLD_VERDICT}")
    evidence_denominators: str = "n=98/20 events (primary); n=67/9 events (covariate-complete, outcome-depleted, Fisher p=0.0162)"
    calibration_status: str = "FAILS - slope 1.537 CI [0.3394, 2.7345]; Brier skill -0.2762 vs prevalence"
    external_validity: str = "NONE - Gate C BLOCKED, no independent cohort tested"
    prohibitions: tuple = (
        "no probability",
        "no AUROC-to-confidence conversion",
        "no action_recommendation",
        "no treatment_recommendation",
        "no threshold substitution without a spec version bump and provenance record",
        "no durable or independent biomarker language",
    )

    def to_dict(self) -> Dict[str, Any]:
        out = {
            "research_only": self.research_only,
            "intended_use": self.intended_use,
            "regulatory_status": self.regulatory_status,
            "spec_id": self.spec_id,
            "spec_version": self.spec_version,
            "endpoint_contract": self.endpoint_contract,
            "feature_name": self.feature_name,
            "feature_framework": self.feature_framework,
            "feature_value": self.feature_value,
            "direction": self.direction,
            "rank_score": self.rank_score,
            "rank_score_scale": self.rank_score_scale,
            "threshold_applied": self.threshold_applied,
            "below_locked_threshold": self.below_locked_threshold,
            "gate_e_designated_decision": self.gate_e_designated_decision,
            "threshold_status": self.threshold_status,
            "evidence_denominators": self.evidence_denominators,
            "calibration_status": self.calibration_status,
            "external_validity": self.external_validity,
            "prohibitions": list(self.prohibitions),
        }
        # Structural guarantee: no care-influencing key can appear in an S3 payload.
        leaked = CARE_INFLUENCING_FIELDS & set(out)
        if leaked:
            raise CareInfluenceViolation(f"S3 output must not contain {sorted(leaked)}")
        return out


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------
def score_for_research(
    payload: Mapping[str, Any],
    *,
    declared_direction: str = DIRECTION_CONSTANT,
    provenance_manifest: Optional[Mapping[str, Any]] = None,
    threshold: Optional[float] = None,
    threshold_provenance: Optional[Mapping[str, Any]] = None,
    env: Optional[Mapping[str, str]] = None,
) -> Optional[Dict[str, Any]]:
    """
    Research-only S3 ranking. Returns None when the research flag is off, or when the
    feature is genuinely absent. Raises on any contract violation.
    """
    if not research_enabled(env):
        return None

    assert_direction(declared_direction)
    # A locked threshold is part of the spec: it is applied by default. A caller
    # may pass it explicitly (with its provenance record); any other value refuses.
    effective_threshold = threshold
    effective_provenance = threshold_provenance
    if effective_threshold is None and LOCKED_THRESHOLD is not None:
        effective_threshold = LOCKED_THRESHOLD
        effective_provenance = LOCKED_THRESHOLD_PROVENANCE
    assert_threshold_admissible(effective_threshold, effective_provenance)
    assert_provenance(provenance_manifest)

    value = extract_s3_diag(payload)
    if value is None:
        return None

    out = S3ResearchOutput(
        feature_value=value,
        rank_score=rank_score(value),
        threshold_applied=effective_threshold,
        below_locked_threshold=(
            bool(value <= effective_threshold) if effective_threshold is not None else None
        ),
    )
    return out.to_dict()


def verify_no_care_influence(response: Mapping[str, Any]) -> None:
    """
    Assert that no S3-derived value has reached a care-influencing field.

    Called by the adversarial suite with the flag both off and on. Detection is by
    exact identity against the S3 rank score / feature value present in the response's
    own `s3_research` block, so it does not depend on guessing field names beyond
    CARE_INFLUENCING_FIELDS.
    """
    block = response.get("s3_research")
    if not block:
        return
    tainted = {block.get("rank_score"), block.get("feature_value")}
    tainted.discard(None)

    def _walk(node: Any, path: str = "") -> None:
        if isinstance(node, Mapping):
            for key, val in node.items():
                if str(key) == "s3_research":
                    continue
                child = f"{path}.{key}" if path else str(key)
                if str(key) in CARE_INFLUENCING_FIELDS and _contains(val, tainted):
                    raise CareInfluenceViolation(
                        f"S3-derived value reached care-influencing field {child!r}"
                    )
                _walk(val, child)
        elif isinstance(node, (list, tuple)):
            for i, val in enumerate(node):
                _walk(val, f"{path}[{i}]")

    def _contains(node: Any, needles: set) -> bool:
        if isinstance(node, (int, float)) and not isinstance(node, bool):
            return float(node) in {float(n) for n in needles if isinstance(n, (int, float))}
        if isinstance(node, Mapping):
            return any(_contains(v, needles) for v in node.values())
        if isinstance(node, (list, tuple)):
            return any(_contains(v, needles) for v in node)
        return False

    _walk(response)


def module_provenance() -> Dict[str, Any]:
    """Machine-readable identity for receipts and logs."""
    return {
        "spec_id": SPEC_ID,
        "spec_version": SPEC_VERSION,
        "endpoint_contract_version": ENDPOINT_CONTRACT_VERSION,
        "direction_constant": DIRECTION_CONSTANT,
        "intended_use": INTENDED_USE,
        "regulatory_status": REGULATORY_STATUS,
        "research_flag_env": RESEARCH_FLAG_ENV,
        "research_enabled": research_enabled(),
        "feature_framework": FEATURE_FRAMEWORK,
        "source_archive_sha256": SOURCE_ARCHIVE_SHA256,
        "source_archive_bytes": SOURCE_ARCHIVE_BYTES,
        "source_member_sha256": dict(SOURCE_MEMBER_SHA256),
        "locked_threshold": LOCKED_THRESHOLD,
        "locked_threshold_provenance": dict(LOCKED_THRESHOLD_PROVENANCE) if LOCKED_THRESHOLD is not None else None,
        "gate_e_designated_decision": GATE_E_DESIGNATED_DECISION if LOCKED_THRESHOLD is not None else None,
        "candidate_threshold": CANDIDATE_THRESHOLD,
        "candidate_threshold_verdict": CANDIDATE_THRESHOLD_VERDICT,
        "pinned_mu": PINNED_MU,
        "pinned_sd": PINNED_SD,
        "pinned_beta0": PINNED_BETA0,
        "pinned_beta1": PINNED_BETA1,
        "adjusted_analysis_sd_n98": ADJUSTED_ANALYSIS_SD_N98,
    }
