#!/usr/bin/env python3
"""
check_drift.py — fail on known-stale marketing numbers and on demo-spec
numbers that don't ground anywhere in the vendored receipts / AK bundle.

Two gates:

Gate A — stale marketing constants (regex must not appear anywhere in src/):
  * AUROC 0\.9[7-9]\d       (retired: 0.976; corrected value is 0.6889)
  * AUPRC 0\.9[5-9]\d       (retired: 0.962; unlikely to be a legitimate
                             fresh number given the same context)

Any exception must be added to the ALLOW list below with a rationale.

Gate B — floating-point orphans in demo specs:
  For every spec, extract every 4+-digit decimal float. Assert each also
  appears in at least one grounding source (AK bundle TS, vendored ranker
  summary JSON + CSV + provenance). This is stricter than
  check_adapter_integrity.py — it doesn't cherry-pick anchors; it takes
  every decimal float in the spec.

Exit non-zero on any hit.
"""

from __future__ import annotations
import re
import sys
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# Gate A ----------------------------------------------------------------
STALE_PATTERNS: list[tuple[str, str]] = [
    (r"AUROC\s*0\.9[7-9]\d", "AUROC 0.976 retired 2026-06 — corrected value 0.6889 in persona-hero-content.ts:23"),
    (r"AUPRC\s*0\.9[5-9]\d", "AUPRC 0.962 retired 2026-06 — same drift as AUROC 0.976"),
]

# Files where these patterns are legitimately mentioned in a
# discussion/audit context, not as user-facing claims. Grep-suppressed.
GATE_A_ALLOW = {
    "scripts/demos/check_drift.py",
    "scripts/demos/check_adapter_integrity.py",
    "docs/",  # audit + governance notes
}

# Gate B ----------------------------------------------------------------
SPECS = [
    ROOT / "src/data/demos/demo_patient_spec.json",
    ROOT / "src/data/demos/demo_pharma_spec.json",
    ROOT / "src/data/demos/demo_tumor_board_spec.json",
]

GROUNDING_SOURCES = [
    ROOT / "src/data/tumor-board/ak-l1-bundle.ts",
    ROOT / "src/data/pharma/crc-ranker-v1/crc_ranker_summary_v1.json",
    ROOT / "src/data/pharma/crc-ranker-v1/crc_ranker_results_v1.csv",
    ROOT / "src/data/pharma/crc-ranker-v1/provenance.md",
    # Trial + registry + benchmark sources referenced by the specs:
    ROOT / "src/data/pipeline-master.ts",
    ROOT / "src/data/ledger-programs.ts",
    ROOT / "src/data/knowledge-graph/trial_decode_registry_v2.json",
    ROOT / "src/data/patients/registry.ts",
]

# Floats that appear in the specs but are legitimately derivative — a
# ratio, a rounded percentage, etc. Add with justification.
ORPHAN_ALLOW: dict[str, str] = {
    # Per-comparator aggregate means from the 485-row CSV. The summary JSON
    # only records the *best* per-subgroup comparator; individual
    # comparator means (e.g. N0147 unselected) are computed at spec-author
    # time. Recomputable from crc_ranker_results_v1.csv fit_N0147 column.
    "0.2656": "computed: mean(fit_N0147) over 485 rows in crc_ranker_results_v1.csv",
    # 5-drug axis proportions the spec author computed off
    # axis_contributions_unselected:
    "0.4144": "derived: axis_contributions_unselected.mapk (0.21) / sum-of-all-axes",
    "0.3629": "derived: axis_contributions_unselected.io (0.1877) / sum-of-all-axes",
    "0.0987": "derived: axis_contributions_unselected.vegf (0.05) / sum-of-all-axes",
    "0.0316": "derived: axis_contributions_unselected.ddr (0.0161) / sum-of-all-axes",
    # p=0.021 anchor — appears in ak-l1-bundle.ts as pValue: 0.0214845, so
    # the spec's rounded form 0.021 grounds correctly by substring check.
}


def gate_a() -> list[str]:
    hits: list[str] = []
    src_dir = ROOT / "src"
    for path in src_dir.rglob("*"):
        if path.is_dir():
            continue
        rel = path.relative_to(ROOT).as_posix()
        if any(rel.startswith(a) for a in GATE_A_ALLOW):
            continue
        if not path.suffix in {".ts", ".tsx", ".json", ".md", ".mjs", ".js"}:
            continue
        try:
            txt = path.read_text(errors="replace")
        except Exception:
            continue
        for pat, reason in STALE_PATTERNS:
            for m in re.finditer(pat, txt):
                line_no = txt[: m.start()].count("\n") + 1
                hits.append(f"{rel}:{line_no}  matches /{pat}/  ({reason})  — text: {m.group(0)!r}")
    return hits


def _load_grounding_blob() -> str:
    parts: list[str] = []
    for src in GROUNDING_SOURCES:
        if src.exists():
            parts.append(src.read_text(errors="replace"))
    return "\n".join(parts)


def gate_b() -> list[str]:
    hits: list[str] = []
    grounding = _load_grounding_blob()
    # Extract every 4+-significant-digit decimal float in the specs.
    float_re = re.compile(r"\b\d{1,4}\.\d{3,}\b")
    for spec_path in SPECS:
        if not spec_path.exists():
            continue
        spec_txt = spec_path.read_text()
        for m in float_re.finditer(spec_txt):
            val = m.group(0)
            if val in grounding:
                continue
            if val in ORPHAN_ALLOW:
                continue
            line_no = spec_txt[: m.start()].count("\n") + 1
            hits.append(f"{spec_path.name}:{line_no}  orphan float {val}  (not in any grounding source)")
    return hits


def main() -> int:
    a = gate_a()
    b = gate_b()
    if a or b:
        print("[demos] drift-check: FAIL")
        if a:
            print("  Gate A — stale marketing constants:")
            for h in a:
                print(f"    - {h}")
        if b:
            print("  Gate B — orphan floats in demo specs:")
            for h in b:
                print(f"    - {h}")
        return 1
    print("[demos] drift-check: clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
