#!/usr/bin/env python3
"""
caspro-lint / forbidden_values.py
Enforces the vague-framing doctrine from
`ceacam5_sanofi_intelligence_v2.json` § crispro_value and the Brenus
governance quarantine list.

Any commit that contains a forbidden token in .ts / .tsx / .md / .mdc / .json /
.astro / .html under the target path fails.

Whitelist:
- files under caspro-lint/ (this scanner)
- files under docs/ that document what the scanner blocks
- files under __tests__/ that test the scanner
- files under .git/, node_modules/, .next/, dist/, build/

Usage:
    python3 caspro-lint/forbidden_values.py            # scan the whole repo
    python3 caspro-lint/forbidden_values.py src/       # scan a subtree
    python3 caspro-lint/forbidden_values.py --staged   # scan git-staged files

Exit code 0 = clean, 1 = violations found.
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

# --- forbidden token catalog -------------------------------------------------

# Retired / quarantined numeric values (word-boundary matched to avoid
# collision with unrelated content like "0.7375%").  Each pattern is grep-safe.
RETIRED_NUMBERS: list[tuple[str, str]] = [
    (r"\b0\.7375\b", "retired BreAK CRC-001 fit score (KG v2 → gated per Brenus v2 2026-07-05)"),
    (r"\b0\.8839\b", "retired responder fit (Brenus canon)"),
    (r"\b0\.9852\b", "quarantined LATIFY responder fit (Q-004 lineage)"),
    (r"\b0\.6194\b", "quarantined LATIFY ITT diluted fit (Q-004 lineage)"),
    (r"\+0\.3658\b", "quarantined LATIFY delta magnitude"),
    (r"\+0\.2641\b", "quarantined LATIFY delta variant"),
    (r"\+0\.366\b", "quarantined LATIFY delta variant"),
    (r"\bDDR 0\.983\b", "DL-07 quarantined DDR loading (publication-blocking)"),
    (r"\b37\.4\s*[×x]\b", "DL-07 quarantined DDR magnification"),
    (r"\bRS-Low fit 0\.955\b", "Berzosertib approximate delta (DOCUMENTED_NOT_REPRODUCED)"),
    (r"\bRS-High 0\.817\b", "Berzosertib approximate delta (DOCUMENTED_NOT_REPRODUCED)"),
    (r"Δ\s*\+0\.138\b", "Berzosertib approximate delta magnitude"),
    (r"Δ\s*\+0\.307\b", "Adavosertib approximate delta magnitude"),
    (r"Δ\s*\+0\.108\b", "AZD1775 approximate delta magnitude"),
    (r"MODERATE-HIGH", "retired fit label for BreAK CRC-001 (canonical: MODERATE / gated)"),
]

# Prohibited terminology (formula, dimensionality, PATH A/B, backbone names).
FORBIDDEN_TERMS: list[tuple[str, str]] = [
    (r"\bPATH\s+A\b", "PATH A math is not disclosed externally"),
    (r"\bPATH\s+B\b", "PATH B is prohibited from all outputs"),
    (r"\b8D\s+[Vv]ector\b", "no 8D vector language externally"),
    (r"\b8-dimensional\b", "no dimensionality disclosure"),
    (r"\b7D\s+[Vv]ector\b", "no 7D vector language externally"),
    (r"\bp\s*·\s*t\b", "no dot-product notation externally"),
    (r"‖t‖", "no norm notation externally"),
    (r"\|\|\s*t\s*\|\|", "no norm notation externally"),
    (r"\bclip\s*\(\s*\(?\s*p\s*[·\*]\s*t\)?\s*/", "no formula disclosure externally"),
    (r"\bcosine\s+similarity\b", "avoid cosine-similarity disclosure on capability pages"),
    (r"\bPERMANENTLY_QUARANTINED\b", "internal governance status; use 'gated' externally"),
    (r"\bDOCUMENTED_NOT_REPRODUCED\b", "internal governance status"),
    (r"\bBLOCKED_ENGINEERING\b", "internal governance status"),
    (r"\bDNFB\b", "haptenation chemistry is a client trade secret"),
    (r"\bhaptenation\b", "trade secret language; discuss vaguely as 'proprietary immunogenicity'"),
    # Client engagement gating
    (r"\bSTC[- ]?1010\b", "client program name — keep engagement vague"),
    (r"\bNCT06934538\b", "client NCT — keep engagement vague"),
    (r"\bBreAK\s+CRC[- ]?001\b", "client trial handle — keep engagement vague"),
    # Retired label/status pairs
    (r"fit_score\s*[:=]\s*0\.7375", "retired numeric on-page"),
]

# Regexes that flag suspicious file structure (primary-surface no-scroll rule).
# These run in scan-dist mode only — see no_scroll_lint.py.

ALL_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(pat), reason) for pat, reason in RETIRED_NUMBERS + FORBIDDEN_TERMS
]

# --- scanner ---------------------------------------------------------------

EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".md", ".mdc", ".json", ".astro", ".html", ".mjs"}

WHITELIST_PATH_PARTS = {
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    "caspro-lint",       # this scanner and its docs
    "__tests__",
    "coverage",
    "public",            # static assets, images, sitemap
}

# Filenames that document the forbidden list (whitelisted from scanning).
DOC_WHITELIST_FILENAMES = {
    "FORBIDDEN_VALUES.md",
    "GOVERNANCE_LEXICON.md",
    "PLAN.md",
}


def _is_whitelisted(path: Path) -> bool:
    parts = set(path.parts)
    if parts & WHITELIST_PATH_PARTS:
        return True
    if path.name in DOC_WHITELIST_FILENAMES:
        return True
    return False


def scan_file(path: Path) -> list[tuple[int, str, str]]:
    """Return list of (line_no, matched_text, reason) tuples."""
    findings: list[tuple[int, str, str]] = []
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except (OSError, UnicodeDecodeError):
        return findings
    for i, line in enumerate(text.splitlines(), start=1):
        for pattern, reason in ALL_PATTERNS:
            m = pattern.search(line)
            if m:
                findings.append((i, m.group(0), reason))
    return findings


def walk_repo(root: Path) -> list[Path]:
    files: list[Path] = []
    for p in root.rglob("*"):
        if not p.is_file():
            continue
        if _is_whitelisted(p.relative_to(root) if p.is_absolute() else p):
            continue
        if p.suffix.lower() not in EXTENSIONS:
            continue
        files.append(p)
    return files


def staged_files(root: Path) -> list[Path]:
    try:
        out = subprocess.check_output(
            ["git", "diff", "--cached", "--name-only", "--diff-filter=ACMR"],
            cwd=str(root),
            text=True,
        )
    except subprocess.CalledProcessError:
        return []
    files: list[Path] = []
    for line in out.splitlines():
        p = root / line.strip()
        if not p.is_file() or _is_whitelisted(p.relative_to(root)):
            continue
        if p.suffix.lower() not in EXTENSIONS:
            continue
        files.append(p)
    return files


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("target", nargs="?", default=".", help="Path to scan.")
    ap.add_argument("--staged", action="store_true", help="Scan only git-staged files.")
    ap.add_argument("--json", action="store_true", help="Emit JSON output.")
    args = ap.parse_args()

    root = Path(args.target).resolve()
    if not root.exists():
        print(f"caspro-lint: target does not exist: {root}", file=sys.stderr)
        return 2

    files = staged_files(root) if args.staged else walk_repo(root)

    violations: list[dict[str, object]] = []
    for path in files:
        for line_no, match, reason in scan_file(path):
            rel = path.relative_to(root) if root in path.parents or path == root else path
            violations.append(
                {
                    "file": str(rel),
                    "line": line_no,
                    "match": match,
                    "reason": reason,
                }
            )

    if args.json:
        import json as _json

        print(_json.dumps({"violations": violations, "count": len(violations)}, indent=2))
    else:
        if not violations:
            print(f"caspro-lint: clean ({len(files)} files scanned).")
        else:
            print(f"caspro-lint: {len(violations)} violation(s) across {len({v['file'] for v in violations})} file(s).")
            for v in violations:
                print(f"  {v['file']}:{v['line']}  {v['match']!r}  — {v['reason']}")

    return 1 if violations else 0


if __name__ == "__main__":
    sys.exit(main())
