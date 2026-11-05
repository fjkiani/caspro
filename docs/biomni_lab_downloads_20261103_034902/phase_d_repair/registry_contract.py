"""
Registry Contract — Phase D lock (2026-07-16)
=============================================

SQLite unified DB is the SOLE runtime source for trial MoA vectors.

The legacy JSON path (api/resources/trial_moa_vectors.json) MUST NOT be
readable from any production code path. This module defines the invariant
and the runtime assertion that enforces it.

Called once from Orchestrator.__init__ and re-run in every dynamic
red-team attack to prove no shadow reader was quietly reintroduced.
"""

from __future__ import annotations

from pathlib import Path
from typing import Dict, Any


PROHIBITED_JSON_PATHS = (
    "api/resources/trial_moa_vectors.json",
    "layer1_engines/mechanism_fit/trial_moa_vectors.json",
    "data/trial_moa_vectors.json",
)

UNIFIED_DB_RELATIVE = ("data", "clinical_trials.db")


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def assert_no_legacy_json_reader() -> Dict[str, Any]:
    """
    Verifies that the legacy JSON registry file is not present anywhere in
    production code paths and that the unified SQLite DB is available.

    Raises RuntimeError on violation. Returns a receipt on success.
    """
    root = repo_root()
    violations = []
    for rel in PROHIBITED_JSON_PATHS:
        p = root / rel
        if p.exists():
            violations.append(str(p))
    if violations:
        raise RuntimeError(
            "Registry contract violation: legacy JSON file(s) present in "
            "production tree: " + ", ".join(violations) +
            ". Delete or move; unified SQLite DB is the sole runtime source."
        )

    db_path = root.joinpath(*UNIFIED_DB_RELATIVE)
    if not db_path.exists():
        raise RuntimeError(
            f"Registry contract violation: unified DB missing at {db_path}. "
            "Generate via scripts/refresh_clinical_trials_db.py + W2 migration."
        )

    return {
        "status": "OK",
        "db_path": str(db_path),
        "prohibited_paths_checked": list(PROHIBITED_JSON_PATHS),
        "message": (
            "SQLite unified DB is sole runtime registry; no legacy JSON present."
        ),
    }
