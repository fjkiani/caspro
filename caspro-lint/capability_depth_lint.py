#!/usr/bin/env python3
"""
caspro-lint / capability_depth_lint.py

Every capability in src/data/capability-registry.ts MUST have a wiring entry in
src/data/capability-depth-wiring.ts, and every substrate/governance slug that
wiring references MUST resolve to a real entry in src/data/depth-layer.ts.

Fails the commit if:
  - A capability has no wiring entry
  - A wiring entry has substrateAxes / substrateModalities / substrateTiers /
    governanceGuardrails slugs that don't resolve
  - A wiring entry has any of the four arrays empty (every cap must be backed)

Usage:
    python3 caspro-lint/capability_depth_lint.py
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REG   = ROOT / "src/data/capability-registry.ts"
WIRE  = ROOT / "src/data/capability-depth-wiring.ts"
DEPTH = ROOT / "src/data/depth-layer.ts"


def extract_string_list(text: str, key: str) -> list[str]:
    """Extract every string literal that appears as `<key>: '...' | "..."`."""
    pattern = re.compile(rf"{key}\s*:\s*['\"]([^'\"]+)['\"]")
    return pattern.findall(text)


def extract_array_of_strings_field(text: str, field: str) -> list[list[str]]:
    """Return one string-list per occurrence of `<field>: [...]`."""
    pattern = re.compile(rf"{field}\s*:\s*\[([^\]]*)\]", re.DOTALL)
    result: list[list[str]] = []
    for arr in pattern.findall(text):
        entries = re.findall(r"['\"]([^'\"]+)['\"]", arr)
        result.append(entries)
    return result


def main() -> int:
    if not REG.exists():
        print(f"MISS: {REG}", file=sys.stderr); return 2
    if not WIRE.exists():
        print(f"MISS: {WIRE}", file=sys.stderr); return 2
    if not DEPTH.exists():
        print(f"MISS: {DEPTH}", file=sys.stderr); return 2

    reg_text   = REG.read_text(encoding="utf-8")
    wire_text  = WIRE.read_text(encoding="utf-8")
    depth_text = DEPTH.read_text(encoding="utf-8")

    # Capability slugs come from CAPABILITY_REGISTRY entries in capability-registry.ts
    reg_start = reg_text.find("export const CAPABILITY_REGISTRY")
    reg_end   = reg_text.find("];", reg_start)
    if reg_start == -1 or reg_end == -1:
        print("Could not locate CAPABILITY_REGISTRY array boundaries", file=sys.stderr)
        return 2
    reg_slice = reg_text[reg_start:reg_end]
    cap_slugs = extract_string_list(reg_slice, "slug")

    # Wiring
    wiring_slugs = extract_string_list(wire_text, "capabilitySlug")

    # Depth-layer valid slugs
    valid_axes       = set(extract_string_list(depth_text, "axis"))
    valid_modalities = set(extract_string_list(depth_text, "modality"))
    valid_tiers      = set(extract_string_list(depth_text, "tier"))
    # Guardrail slugs live under GOVERNANCE_GUARDRAILS entries → each object has `slug: '...'`
    gg_start = depth_text.find("export const GOVERNANCE_GUARDRAILS")
    gg_end   = depth_text.find("];", gg_start)
    valid_guardrails = set(extract_string_list(depth_text[gg_start:gg_end], "slug")) if gg_start != -1 else set()

    errors: list[str] = []

    # Every capability must have a wiring entry, and vice-versa
    caps_set  = set(cap_slugs)
    wires_set = set(wiring_slugs)
    for missing in caps_set - wires_set:
        errors.append(f"MISSING WIRING: capability '{missing}' has no entry in capability-depth-wiring.ts")
    for orphan in wires_set - caps_set:
        errors.append(f"ORPHAN WIRING: '{orphan}' is wired but not present in CAPABILITY_REGISTRY")

    # Every wiring array must be non-empty AND every entry must resolve
    axes_lists      = extract_array_of_strings_field(wire_text, "substrateAxes")
    modality_lists  = extract_array_of_strings_field(wire_text, "substrateModalities")
    tier_lists      = extract_array_of_strings_field(wire_text, "substrateTiers")
    guardrail_lists = extract_array_of_strings_field(wire_text, "governanceGuardrails")

    n = len(wiring_slugs)
    if not (len(axes_lists) == len(modality_lists) == len(tier_lists) == len(guardrail_lists) == n):
        errors.append(
            f"WIRING SHAPE: expected {n} entries in every array field, got "
            f"axes={len(axes_lists)} mods={len(modality_lists)} tiers={len(tier_lists)} guards={len(guardrail_lists)}"
        )
    else:
        for i, cap in enumerate(wiring_slugs):
            if not axes_lists[i]:
                errors.append(f"EMPTY substrateAxes for capability '{cap}'")
            if not modality_lists[i]:
                errors.append(f"EMPTY substrateModalities for capability '{cap}'")
            if not tier_lists[i]:
                errors.append(f"EMPTY substrateTiers for capability '{cap}'")
            if not guardrail_lists[i]:
                errors.append(f"EMPTY governanceGuardrails for capability '{cap}'")
            for slug in axes_lists[i]:
                if slug not in valid_axes:
                    errors.append(f"UNRESOLVED axis '{slug}' in wiring for '{cap}'")
            for slug in modality_lists[i]:
                if slug not in valid_modalities:
                    errors.append(f"UNRESOLVED modality '{slug}' in wiring for '{cap}'")
            for slug in tier_lists[i]:
                if slug not in valid_tiers:
                    errors.append(f"UNRESOLVED tier '{slug}' in wiring for '{cap}'")
            for slug in guardrail_lists[i]:
                if slug not in valid_guardrails:
                    errors.append(f"UNRESOLVED guardrail '{slug}' in wiring for '{cap}'")

    if errors:
        print("caspro-lint (capability-depth):", len(errors), "issue(s):")
        for e in errors:
            print("  " + e)
        return 1

    print(f"caspro-lint (capability-depth): clean ({len(cap_slugs)} capabilities × 4 substrate fields resolved).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
