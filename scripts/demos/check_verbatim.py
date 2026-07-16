#!/usr/bin/env python3
"""
scripts/demos/check_verbatim.py

Python port of scripts/demos/check-verbatim.mjs so the discipline gate runs
locally in environments without node (like the current dev sandbox). Same
inputs, same rules, same exit code.

Usage:
    python3 scripts/demos/check_verbatim.py
    python3 scripts/demos/check_verbatim.py --json
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

JSON_TARGETS = [
    'src/data/demos/demo_index.json',
    'src/data/demos/demo_patient_spec.json',
    'src/data/demos/demo_pharma_spec.json',
    'src/data/demos/demo_tumor_board_spec.json',
]
MANIFEST_PATH = 'src/data/demos/manifest.frozen.json'

SCAN_DIRS = [
    'src/components/demos',
    'src/app/demo',
]

# Explicit allowlist of files under src/components/demos/ that the demo
# landing shell ships. Legacy factory-demo components (TherapyRankingCard,
# FactoryDemoShowcase, OracleExplainTrack, VariantDetailCard, ProteinDeltaCard,
# EssentialityChart, EnhancedComparison, AccessibilityTrack, index.ts,
# biotech-demo-factory.ts) live in the same folder but are NOT part of the
# demo landing shell — they render their own factory routes. Scoping here
# keeps the gate strict for our shell without repurposing the legacy files.
SCAN_ALLOWLIST_COMPONENTS = {
    'DemoWalker.tsx',
    'DemoStageRail.tsx',
    'DemoStageBody.tsx',
    'DemoRoadmapSection.tsx',
    'DemoChooserCard.tsx',
    'GovernanceStatusPill.tsx',
    'labels.ts',
}

# Prop values that are TypeScript union-member literals bound to our own
# component APIs (GovernanceStatus etc.). These are code, not user-visible
# prose — tolerate them.
LITERAL_PROP_VALUES = {
    'validated',
    'in_development',
    'mechanistic_hypothesis',
    'VERIFIED',
    'PEER-REVIEWED',
    'MECHANISTIC HYPOTHESIS',
    'oncologist',
    'patient',
    'pharma',
    'hospital',
    'stat_callout',
    'mechanism_profile',
    'ranking_overview',
    'subgroup_comparison',
    'axis_contribution',
    'trial_decode_summary',
    'strategic_recommendation',
    'case_overview',
    'data_readiness',
    'drug_ranking',
    'resistance_forecast',
    'synthetic_lethality',
    'evidence_vault',
    'strategic_priorities',
    'patient_profile_summary',
    'biomarker_intelligence',
    'trial_matching',
    'therapy_fit',
    'care_plan_summary',
}

LABELS_PATH = 'src/components/demos/labels.ts'

IGNORED_ATTR_PREFIXES = {
    'aria-', 'data-', 'href', 'src', 'key', 'alt', 'role', 'id',
    'className', 'class', 'name', 'type',
}

TW_LINE = re.compile(r'^[a-z0-9\s:\-_/\[\]\.,#%]+$')
STOPWORDS = re.compile(r'\b(the|and|is|of|to|with|for)\b', re.IGNORECASE)


def sha256_file(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def check_manifest():
    manifest_p = ROOT / MANIFEST_PATH
    if not manifest_p.exists():
        return [{'file': MANIFEST_PATH, 'kind': 'missing', 'msg': 'manifest.frozen.json missing'}]
    manifest = json.loads(manifest_p.read_text())
    errs = []
    for rel in JSON_TARGETS:
        full = ROOT / rel
        if not full.exists():
            errs.append({'file': rel, 'kind': 'missing', 'msg': 'vendored JSON missing'})
            continue
        actual = sha256_file(full)
        expected = manifest.get('files', {}).get(rel, {}).get('sha256')
        if not expected:
            errs.append({'file': rel, 'kind': 'unpinned', 'msg': 'no entry in manifest.frozen.json'})
        elif expected != actual:
            errs.append({
                'file': rel, 'kind': 'hash_mismatch',
                'msg': f'SHA-256 changed (frozen={expected} actual={actual})',
            })
    return errs


LABELS_BODY_RE = re.compile(r"export const (\w+)\s*=\s*\{([\s\S]*?)\}\s*as const")
ENTRY_RE = re.compile(r":\s*(['\"`])([\s\S]*?)\1\s*,")


def load_allowed_labels():
    src = (ROOT / LABELS_PATH).read_text()
    values: set[str] = set()
    for m in LABELS_BODY_RE.finditer(src):
        block = m.group(2)
        for em in ENTRY_RE.finditer(block):
            values.add(em.group(2))
    return values


def load_spec_vocab():
    vocab: set[str] = set()

    def walk(node):
        if isinstance(node, str):
            if len(node) >= 3:
                vocab.add(node)
        elif isinstance(node, list):
            for it in node:
                walk(it)
        elif isinstance(node, dict):
            for v in node.values():
                walk(v)

    for rel in JSON_TARGETS:
        p = ROOT / rel
        if not p.exists():
            continue
        walk(json.loads(p.read_text()))
    return vocab


def is_tailwind_like(s: str) -> bool:
    if len(s) < 3:
        return True
    if any(c.isupper() for c in s):
        return False
    if not TW_LINE.match(s):
        return False
    if not any(c.isspace() for c in s):
        return False
    if STOPWORDS.search(s):
        return False
    return True


# Attribute regex: an attribute value must be preceded by whitespace, be a
# valid TSX identifier (starts with a letter, followed by letters/digits/-),
# be preceded by `=` with no spaces (JSX attrs) OR one space (rare), and be
# a genuine JSX attribute — not a TypeScript comparison / assignment inside
# an expression. Requires: preceded by whitespace or `<`, and the identifier
# is not a JS keyword.
ATTR_RE = re.compile(r'(?:^|[\s<])([A-Za-z][\w-]*)(?<![><!=])=(?![>=])\s*"([^"\n]{9,})"')

# JSX text: preceded by a `>` that is NOT part of `>=`, `<=`, `>>`, `!=`, or
# `= >` (arrow), and followed by `<` that is NOT `<=`, `<<`, or `</`-negated.
# The inner text must contain at least one letter and NOT contain `=`, `&&`,
# `||`, or common TS operators (a plain sentence never has these).
TEXT_RE = re.compile(r'(?<![=!<>])>([^<>{}\n]{9,}?)<(?![=!<])')

# Blocklist of "identifiers" that ATTR_RE can pick up but which are actually
# TypeScript syntax (e.g. `activeIndex >= 0`, `count = 0`). If the regex fires
# on one of these on the LHS, ignore the match.
NON_ATTR_LHS = {
    'activeIndex', 'activeStageId', 'stageCount', 'idx', 'i', 'j', 'k',
    'count', 'index', 'value', 'val', 'const', 'let', 'var', 'if', 'while',
    'for', 'return', 'yield',
}


def scan_file(fp: Path, labels: set[str], vocab: set[str]):
    src = fp.read_text()
    rel = fp.relative_to(ROOT).as_posix()
    violations = []
    for idx, line in enumerate(src.splitlines(), start=1):
        if re.match(r'^\s*(import|export\s+(?:type|\*|\{))', line):
            continue
        if re.match(r'^\s*(//|\*|/\*)', line):
            continue
        for m in ATTR_RE.finditer(line):
            attr, val = m.group(1), m.group(2)
            if attr in NON_ATTR_LHS:
                continue
            if any(attr == p or attr.startswith(p) for p in IGNORED_ATTR_PREFIXES):
                continue
            if val in LITERAL_PROP_VALUES:
                continue
            if val in labels or val in vocab or is_tailwind_like(val):
                continue
            violations.append({'file': rel, 'line': idx, 'kind': 'attr', 'attr': attr, 'value': val})
        for m in TEXT_RE.finditer(line):
            val = m.group(1).strip()
            if len(val) < 9:
                continue
            if val in labels or val in vocab or is_tailwind_like(val):
                continue
            if not re.search(r'[A-Za-z]', val):
                continue
            # Reject TS-expression false positives: real JSX text doesn't
            # contain these operators.
            if any(tok in val for tok in ('&&', '||', '=>', '===', '!==')):
                continue
            violations.append({'file': rel, 'line': idx, 'kind': 'jsx-text', 'value': val})
    return violations


def walk_tsx(dirp: Path):
    out = []
    if not dirp.exists():
        return out
    for root, _, files in os.walk(dirp):
        for name in files:
            if not (name.endswith('.tsx') or name.endswith('.ts')):
                continue
            full = Path(root) / name
            # Legacy factory-demo files under src/components/demos/ live
            # alongside our shell. Restrict scanning to the shell files
            # we actually own; renderers under renderers/ are always included.
            if 'components/demos' in full.as_posix() and 'renderers' not in full.as_posix():
                if name not in SCAN_ALLOWLIST_COMPONENTS:
                    continue
            out.append(full)
    return out


def main():
    as_json = '--json' in sys.argv

    manifest_errors = check_manifest()
    labels = load_allowed_labels()
    vocab = load_spec_vocab()

    files: list[Path] = []
    for d in SCAN_DIRS:
        files.extend(walk_tsx(ROOT / d))

    violations = []
    for f in files:
        violations.extend(scan_file(f, labels, vocab))

    if as_json:
        print(json.dumps({'manifest_errors': manifest_errors, 'prose_violations': violations}, indent=2))
    else:
        if manifest_errors:
            print('\n[demos] MANIFEST DRIFT:', file=sys.stderr)
            for e in manifest_errors:
                print(f"  {e['file']}: {e['kind']} — {e['msg']}", file=sys.stderr)
        if violations:
            print('\n[demos] PROSE / STRING VIOLATIONS:', file=sys.stderr)
            for v in violations:
                label = f"{v['attr']}=" if v['kind'] == 'attr' else ''
                print(f"  {v['file']}:{v['line']}  {label}\"{v['value']}\"", file=sys.stderr)
        if not manifest_errors and not violations:
            print('[demos] check-verbatim: clean')

    if manifest_errors or violations:
        sys.exit(1)


if __name__ == '__main__':
    main()
