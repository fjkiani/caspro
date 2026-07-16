#!/usr/bin/env python3
"""
resolve_receipt_tokens.py — expand ${...} tokens in pre-freeze demo spec
templates into literal values from the vendored ranker summary JSON and
the AK bundle, then write the frozen spec JSON that ships to prod.

Design decision (see PLAN.md §2 "Adapter depth: Hybrid"):
  * NUMBERS and IDs are tokenized so a receipt update triggers a spec
    regeneration and any freeze-hash drift is caught by CI.
  * PROSE is NOT tokenized. The three specs have persona-scoped voice
    (family / MD / BD) that is the whole point of the split. Templating
    it away would force one shared substring across three audiences.

Token syntax:
  ${ranker.<dotted.path>}                → from crc_ranker_summary_v1.json
  ${ranker.<path>|format=<spec>}         → format the value (e.g. .4f, .2f)
  ${ak.<dotted.path>}                    → from ak-l1-bundle.ts (parsed AST-lite)

Usage:
  # Materialize the pharma spec from its template:
  python3 scripts/demos/resolve_receipt_tokens.py --spec pharma
  # Verify all shipped specs have zero surviving tokens:
  python3 scripts/demos/resolve_receipt_tokens.py --check
"""

from __future__ import annotations
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TEMPLATES = ROOT / "src/data/demos/_templates"
FROZEN_DIR = ROOT / "src/data/demos"
RANKER_JSON = ROOT / "src/data/pharma/crc-ranker-v1/crc_ranker_summary_v1.json"
AK_BUNDLE = ROOT / "src/data/tumor-board/ak-l1-bundle.ts"


def load_ranker() -> dict:
    return json.loads(RANKER_JSON.read_text())


def resolve_ranker_path(ranker: dict, path: str):
    """Resolve `foo.bar.baz` against the ranker dict; raise on miss."""
    node = ranker
    for part in path.split("."):
        if isinstance(node, dict):
            if part not in node:
                raise KeyError(f"ranker.{path}: missing segment '{part}'")
            node = node[part]
        else:
            raise KeyError(f"ranker.{path}: cannot descend into non-dict at '{part}'")
    return node


# AK bundle is TS. We don't need a full parser — just grab flat top-level
# values. For AK01, the important stable tokens are the p-value pieces and
# the falsifiedReason string. Add support here as tokens are needed.
def load_ak_flat() -> dict[str, object]:
    src = AK_BUNDLE.read_text()
    flat: dict[str, object] = {}
    # Patterns:
    #   pValue: 0.0214845  (numeric literal)
    #   dCliff: -0.5033
    #   correlation: -0.4164
    #   pValue: 1.36e-21
    for key in (
        "pValue", "dCliff", "correlation", "sampleSize", "positiveN",
    ):
        m = re.search(rf"{key}:\s*([+\-\d\.eE]+)", src)
        if m:
            try:
                flat[key] = float(m.group(1))
            except ValueError:
                pass
    return flat


# Path chars: alphanumerics, underscore, dot, brackets, hyphen (HRD-Low),
# forward slash if we ever key by path. Deliberately excludes whitespace,
# braces, backticks so no runaway matches.
TOKEN_RE = re.compile(r"\$\{(ranker|ak)\.([A-Za-z0-9_.\[\]/-]+)(\|format=([^}]+))?\}")


def render_value(val, fmt: str | None) -> str:
    """Format val per fmt spec (a Python format-string body). Default: repr()."""
    if fmt is None:
        if isinstance(val, float):
            # Default to shortest round-trip string.
            return repr(val)
        return str(val)
    try:
        return format(val, fmt)
    except (ValueError, TypeError) as e:
        raise ValueError(f"format({val!r}, {fmt!r}) failed: {e}")


def resolve_tokens(text: str, ranker: dict, ak_flat: dict) -> tuple[str, list[str]]:
    """Return (materialized_text, list_of_resolved_tokens)."""
    resolved: list[str] = []
    def repl(m: re.Match) -> str:
        scope = m.group(1)
        path = m.group(2)
        fmt = m.group(4)
        if scope == "ranker":
            val = resolve_ranker_path(ranker, path)
        elif scope == "ak":
            if path not in ak_flat:
                raise KeyError(f"ak.{path}: not in flat map (add to load_ak_flat)")
            val = ak_flat[path]
        else:
            raise KeyError(f"unknown scope {scope!r}")
        resolved.append(f"${{{scope}.{path}{'|format='+fmt if fmt else ''}}} → {val!r}")
        rendered = render_value(val, fmt)
        # If the token is inside a JSON string, we want the *raw string*
        # not JSON-quoted; the surrounding quotes are already in the
        # template. If the value is a number and the template wrote it
        # without quotes, we must emit it without quotes too — that's
        # already the case because rendered is str(val).
        return rendered
    materialized = TOKEN_RE.sub(repl, text)
    return materialized, resolved


def materialize(spec_slug: str) -> int:
    template = TEMPLATES / f"demo_{spec_slug}_spec.template.json"
    frozen = FROZEN_DIR / f"demo_{spec_slug}_spec.json"
    if not template.exists():
        print(f"[resolve] no template for {spec_slug} at {template}", file=sys.stderr)
        return 2
    ranker = load_ranker()
    ak_flat = load_ak_flat()
    text = template.read_text()
    try:
        materialized, resolved = resolve_tokens(text, ranker, ak_flat)
    except KeyError as e:
        print(f"[resolve] FAIL: {e}", file=sys.stderr)
        return 1
    # Verify materialized is valid JSON
    try:
        parsed = json.loads(materialized)
    except json.JSONDecodeError as e:
        print(f"[resolve] materialized template not valid JSON: {e}", file=sys.stderr)
        # Save the broken output for debugging
        (ROOT / f".materialize_debug_{spec_slug}.json").write_text(materialized)
        return 1
    # Verify no surviving tokens
    survivors = TOKEN_RE.findall(materialized)
    if survivors:
        print(f"[resolve] FAIL: {len(survivors)} tokens survived expansion:", file=sys.stderr)
        for s in survivors[:10]:
            print(f"  - {s}", file=sys.stderr)
        return 1
    # ensure_ascii=True to match the byte-freeze convention used by the
    # existing frozen spec (\u2014 for em-dash, etc.). Any change here
    # would trip check_verbatim.py.
    frozen.write_text(json.dumps(parsed, indent=2, ensure_ascii=True) + "\n")
    print(f"[resolve] {spec_slug}: {len(resolved)} tokens expanded → {frozen.relative_to(ROOT)}")
    for r in resolved:
        print(f"  {r}")
    return 0


def check_no_survivors() -> int:
    """Fail if any frozen spec still contains a ${...} token."""
    issues: list[str] = []
    for spec in FROZEN_DIR.glob("demo_*_spec.json"):
        txt = spec.read_text()
        survivors = TOKEN_RE.findall(txt)
        if survivors:
            issues.append(f"{spec.name}: {len(survivors)} unresolved tokens")
    if issues:
        print("[resolve] check: FAIL")
        for i in issues:
            print(f"  - {i}")
        return 1
    print("[resolve] check: clean (no ${...} tokens in shipped specs)")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    grp = ap.add_mutually_exclusive_group(required=True)
    grp.add_argument("--spec", choices=["patient", "pharma", "tumor_board"],
                     help="regenerate this spec from its template")
    grp.add_argument("--check", action="store_true",
                     help="fail if any frozen spec still contains ${...} tokens")
    args = ap.parse_args()
    if args.check:
        return check_no_survivors()
    return materialize(args.spec)


if __name__ == "__main__":
    sys.exit(main())
