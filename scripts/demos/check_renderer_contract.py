#!/usr/bin/env python3
"""
check_renderer_contract.py — verify every demo spec stage's data_shown block
consumes the exact contract declared in src/data/demos/types.ts.

Rationale: check_adapter_integrity.py checks content (fabrication regexes +
numeric anchor grounding). It does NOT check that the renderer can actually
render the payload. A stage can emit a payload with the wrong or missing
fields, pass the content lint, and either crash the renderer at runtime or
be silently dropped.

This lint:
  1. Parses type declarations from src/data/demos/types.ts.
  2. Maps each `type: '...'` literal to its interface name.
  3. For every stage in every spec, verifies that data_shown keys are a
     subset of the interface's declared fields AND contains every required
     (non-`?`) field.
  4. Emits one issue per mismatch (missing required OR extra ignored field).

Exit non-zero on any issue.
"""

from __future__ import annotations
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TYPES_TS = ROOT / "src/data/demos/types.ts"
SPECS = [
    ROOT / "src/data/demos/demo_patient_spec.json",
    ROOT / "src/data/demos/demo_pharma_spec.json",
    ROOT / "src/data/demos/demo_tumor_board_spec.json",
]


def parse_interfaces(ts_src: str) -> dict[str, dict[str, bool]]:
    """
    Return {interface_name: {field_name: is_required}}.

    Handles single-line optional markers (`foo?:`) and skips comments.
    We do NOT try to resolve nested types — this lint only cares whether
    top-level fields are present, not whether their subtypes are correct.
    """
    ifaces: dict[str, dict[str, bool]] = {}
    # Match export interface X { ... }, up to the matching closing brace at
    # column 0. TS is not brace-balanced in comments but this is enough for
    # our own types file.
    pattern = re.compile(
        r"export interface (\w+)\s*\{([\s\S]*?)^\}",
        re.MULTILINE,
    )
    for m in pattern.finditer(ts_src):
        name = m.group(1)
        body = m.group(2)
        fields: dict[str, bool] = {}
        # Track nesting depth so inline `foo: { bar: string }` types don't
        # get their inner keys picked up as top-level fields.
        depth = 0
        for raw in body.splitlines():
            # Update depth from THIS raw line first, but only count
            # fields declared while depth==0 at line start.
            line_start_depth = depth
            depth += raw.count("{") - raw.count("}")
            line = raw.strip()
            if not line:
                continue
            if line.startswith("//") or line.startswith("*") or line.startswith("/*"):
                continue
            if line in ("}", "{", "};", "},"):
                continue
            if line_start_depth != 0:
                # We're inside a nested inline object type; skip.
                continue
            fm = re.match(r"(?:readonly\s+)?([A-Za-z_][A-Za-z0-9_]*)(\??):", line)
            if fm:
                fields[fm.group(1)] = fm.group(2) != "?"
        if fields:
            ifaces[name] = fields
    return ifaces


def parse_type_to_iface(ts_src: str) -> dict[str, str]:
    """
    For every interface that declares `type: 'X'`, return {X: interface_name}.
    """
    mapping: dict[str, str] = {}
    pattern = re.compile(
        r"export interface (\w+)\s*\{([\s\S]*?)^\}",
        re.MULTILINE,
    )
    for m in pattern.finditer(ts_src):
        iface_name = m.group(1)
        body = m.group(2)
        # Look for `type: 'literal'` inside the interface body.
        tm = re.search(r"type:\s*'([a-z_]+)'", body)
        if tm:
            mapping[tm.group(1)] = iface_name
    return mapping


def main() -> int:
    if not TYPES_TS.exists():
        print(f"[demos] renderer-contract: types file missing: {TYPES_TS}", file=sys.stderr)
        return 2
    ts_src = TYPES_TS.read_text()
    ifaces = parse_interfaces(ts_src)
    type_to_iface = parse_type_to_iface(ts_src)

    if not type_to_iface:
        print("[demos] renderer-contract: no `type: 'X'` literals found in types.ts", file=sys.stderr)
        return 2

    issues: list[str] = []
    for spec_path in SPECS:
        if not spec_path.exists():
            issues.append(f"MISSING SPEC: {spec_path}")
            continue
        spec = json.loads(spec_path.read_text())
        spec_label = spec_path.name
        for stage in spec.get("stages", []):
            data = stage.get("data_shown") or {}
            t = data.get("type")
            sid = stage.get("stage_id")
            if not t:
                issues.append(f"{spec_label} stage {sid}: no data_shown.type")
                continue
            iface_name = type_to_iface.get(t)
            if not iface_name:
                issues.append(f"{spec_label} stage {sid}: no interface declares type='{t}'")
                continue
            expect = ifaces.get(iface_name)
            if not expect:
                issues.append(f"{spec_label} stage {sid}: interface {iface_name} not parsed")
                continue
            actual_keys = set(data.keys())
            required = {name for name, req in expect.items() if req}
            all_declared = set(expect.keys())
            missing_req = required - actual_keys
            extra = actual_keys - all_declared
            if missing_req:
                issues.append(
                    f"{spec_label} stage {sid} type={t}: MISSING required {sorted(missing_req)}"
                )
            if extra:
                issues.append(
                    f"{spec_label} stage {sid} type={t}: EXTRA ignored {sorted(extra)}"
                )

    if issues:
        print("[demos] renderer-contract: FAIL")
        for i in issues:
            print(f"  - {i}")
        return 1
    print("[demos] renderer-contract: clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
