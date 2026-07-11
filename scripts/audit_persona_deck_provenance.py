#!/usr/bin/env python3
"""
W10 — Persona-deck provenance audit.

Purpose
-------
Every persona-content deck (PersonaCopyDeck<T>) contains strings that mix
narrative text with numeric claims (percentages, p-values, cohort sizes,
PMIDs, ratios). Those numeric claims should trace back to a canonical source
file: either an audit receipt in /mnt/results/audits/, or a receipt JSON in
src/data/pgx-receipts/*.json. If a numeric appears inline in a deck string
with no import (${RECEIPT.foo.bar} template expression) and no cross-reference
to an audit source, its provenance is UNKNOWN and the string is a drift risk.

What this audits
----------------
1. Structural: which files export PersonaCopyDeck<T> and which use them.
2. Provenance: for every numeric literal that appears in a string that lives
   inside a PersonaCopyDeck, classify it as:
     * TEMPLATE  — inside a ${...} expression referencing an imported const
                   (well-governed, single-sourced)
     * GOVERNED  — hard-coded value that also appears in a canonical source
                   file (/mnt/results/audits/*.json or src/data/pgx-receipts/*.json)
     * UNKNOWN   — hard-coded value with no matching source file
3. Cross-persona leak: identical body/caveat text across ≥2 personas of the
   same deck field. That means the persona toggle does not actually change
   what the user sees, which defeats W1-W5 intent.

Output
------
Writes reports/persona_deck_provenance.md with:
  - Deck inventory
  - Numeric-literal classification counts per file
  - UNKNOWN literals (numeric + surrounding phrase, per file:line)
  - CROSS_PERSONA_LEAK offenders

Exit code
---------
Non-zero if any UNKNOWN literals found OR any CROSS_PERSONA_LEAK found.
Zero when both are empty.

Scope
-----
- Reads only src/**/*.tsx that Grep tagged as containing PersonaCopyDeck<
- Sources: /mnt/results/audits/*.{md,json} + src/data/pgx-receipts/*.json
- Deliberately does not try to parse TypeScript AST; regex-based scan is
  sufficient because deck values are always string literals or template
  literals inside a plain object.
"""

from __future__ import annotations
import json
import re
import sys
from collections import defaultdict
from pathlib import Path
from typing import Iterable

REPO_ROOT = Path(__file__).resolve().parent.parent

# Grep-tagged deck files. Regenerate with:
#   rg -l 'PersonaCopyDeck<' src
DECK_FILES: list[Path] = [
    REPO_ROOT / 'src/context/persona-content.tsx',
    REPO_ROOT / 'src/components/engine/MechanismAlignmentIntroPage.tsx',
    REPO_ROOT / 'src/components/tumor-board/SyntheticLethalityTabSurface.tsx',
    REPO_ROOT / 'src/components/engine/TargetLockIntroPage.tsx',
    REPO_ROOT / 'src/components/ledger/BrenusDecodeWallPage.tsx',
    REPO_ROOT / 'src/components/engine/SyntheticLethalityIntroPage.tsx',
    REPO_ROOT / 'src/components/engine/SafetyDosingTabsSurface.tsx',
    REPO_ROOT / 'src/components/tumor-board/SyntheticLethalityScrollSurface.tsx',
    REPO_ROOT / 'src/components/ledger/BrenusVectorWallTab.tsx',
    REPO_ROOT / 'src/components/engine/SafetyDosingScrollSurface.tsx',
    REPO_ROOT / 'src/components/engine/SafetyDosingIntroPage.tsx',
    REPO_ROOT / 'src/components/tumor-board/MechanismAlignmentScrollSurface.tsx',
    REPO_ROOT / 'src/data/pgx-doctrine-decks.ts',
]

AUDIT_DIR = Path('/mnt/results/audits')
PGX_RECEIPT_DIR = REPO_ROOT / 'src/data/pgx-receipts'
REPORT_PATH = REPO_ROOT / 'reports/persona_deck_provenance.md'

# Numeric literal regex.
# Captures: integers ≥3 digits (PMIDs, cohort ids, years), decimals,
# percentages, unit-suffixed integers, n=/p=/HR=/RR= inline values, ratios.
# Skips obvious noise: single-digit integers appearing as counter values.
NUMERIC_RE = re.compile(
    r'''(?x)
    (?<![\w\.])                          # not preceded by word char or dot
    (?:
        \d{3,}                           # 3+ digit numbers (PMIDs, years, cohort ids)
      | \d+\.\d+                         # decimals
      | \d+(?:\.\d+)?\s*(?:%|pp|kb|kD|mg|nM|mM|days?|hours?|weeks?|months?|years?)  # units
      | \d+/\d+                          # fractions like 8/23
      | \d+×                             # x-fold (unicode ×)
    )
    (?!\w)
    '''
)

# Template expression detector: ${...}
TEMPLATE_RE = re.compile(r'\$\{[^}]+\}')

# Which string field names inside a PersonaCopyDeck<T> should be scanned.
# T can be any shape; we look at fields commonly used in the codebase.
DECK_STRING_FIELDS = {
    'title', 'headline', 'body', 'caveat', 'action', 'summary',
    'blurb', 'label', 'claim', 'description',
}

# Personas from src/context/persona-content.tsx.
PERSONAS = ['oncologist', 'patient', 'pharma']


def load_sources() -> tuple[str, dict[str, str]]:
    """Concatenate all audit + pgx-receipt source text into one blob for substring lookup.
    Also return a per-file map so we can attribute matches."""
    parts: list[str] = []
    per_file: dict[str, str] = {}
    for src_dir in (AUDIT_DIR, PGX_RECEIPT_DIR):
        if not src_dir.exists():
            continue
        for path in sorted(src_dir.iterdir()):
            if path.suffix not in {'.json', '.md', '.txt'}:
                continue
            try:
                text = path.read_text()
            except (UnicodeDecodeError, PermissionError):
                continue
            parts.append(text)
            per_file[str(path)] = text
    return '\n\n'.join(parts), per_file


def extract_string_literals(text: str) -> list[tuple[int, str, str]]:
    """Extract (line_no, field_name, string_body) for every string that lives
    inside what looks like a persona deck. Approach:

      * Scan line by line.
      * When a line contains 'title:' / 'body:' / 'caveat:' / etc.,
        pull the following string or template-string literal (across lines
        if the string uses backticks).
    """
    lines = text.split('\n')
    hits: list[tuple[int, str, str]] = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # match e.g. `    body:` or `body:` at start of trimmed line
        m = re.match(r'^\s*(\w+)\s*:\s*(.*)$', line)
        if m and m.group(1) in DECK_STRING_FIELDS:
            field = m.group(1)
            remainder = m.group(2)
            body, consumed = extract_string_from(remainder, lines, i)
            if body is not None:
                hits.append((i + 1, field, body))
            i += max(1, consumed)
            continue
        i += 1
    return hits


def extract_string_from(remainder: str, lines: list[str], start_idx: int) -> tuple[str | None, int]:
    """Pull a string literal starting from `remainder`, spanning lines if needed.
    Returns (string_body_or_None, num_lines_consumed).
    Handles single quotes, double quotes, and backticks. Ignores complex expressions.

    If `remainder` is empty (i.e. the field name was `body:` with the value
    on the following line), look ahead up to 3 lines for the opening quote."""
    remainder = remainder.lstrip()
    quote_line_offset = 0  # how many lines past `start_idx` the opening quote is on
    while not remainder and quote_line_offset < 3:
        quote_line_offset += 1
        if start_idx + quote_line_offset >= len(lines):
            return None, 1
        remainder = lines[start_idx + quote_line_offset].lstrip()
    if not remainder:
        return None, 1
    first = remainder[0]
    if first not in {"'", '"', '`'}:
        return None, 1

    if first != '`':
        # Single-line-scoped string; may still span the next line if it uses
        # a multi-line concatenated string via `\n` etc., but for our purposes
        # we assume the closing quote is on the same line as the opening quote.
        end = 1
        while end < len(remainder):
            if remainder[end] == '\\':
                end += 2
                continue
            if remainder[end] == first:
                return remainder[1:end], 1 + quote_line_offset
            end += 1
        # If we didn't find a close on this line, look at continuation lines
        # for a bare closing quote — common in codebase for long string literals
        # concatenated across lines with `+` or bare wrapping.
        body_parts = [remainder[1:]]
        for j in range(start_idx + quote_line_offset + 1, len(lines)):
            line = lines[j]
            # find the closing quote if any
            idx = -1
            k = 0
            while k < len(line):
                if line[k] == '\\':
                    k += 2
                    continue
                if line[k] == first:
                    idx = k
                    break
                k += 1
            if idx == -1:
                body_parts.append(line)
            else:
                body_parts.append(line[:idx])
                return '\n'.join(body_parts), (j - start_idx) + 1
        return None, 1

    # backtick template — may span lines
    body_parts = [remainder[1:]]
    for j in range(start_idx + quote_line_offset + 1, len(lines)):
        line = lines[j]
        # look for a bare closing backtick that isn't escaped
        # (approximate: find the last unescaped backtick on the line)
        close_idx = -1
        k = 0
        while k < len(line):
            if line[k] == '\\':
                k += 2
                continue
            if line[k] == '`':
                close_idx = k
                break
            k += 1
        if close_idx == -1:
            body_parts.append(line)
        else:
            body_parts.append(line[:close_idx])
            return '\n'.join(body_parts), (j - start_idx) + 1
    # unterminated template — bail
    return None, 1


def classify_literals(
    file_path: Path,
    line_no: int,
    field: str,
    body: str,
    source_blob: str,
) -> list[dict]:
    """Emit a classification record for every numeric literal in `body`."""
    out: list[dict] = []
    # blank out template expressions so their numeric contents don't count
    body_masked = TEMPLATE_RE.sub(' ', body)
    for m in NUMERIC_RE.finditer(body_masked):
        literal = m.group(0)
        # find surrounding phrase (60 char window)
        s = max(0, m.start() - 40)
        e = min(len(body_masked), m.end() + 40)
        context = body_masked[s:e].replace('\n', ' ').strip()

        # classify: does the literal appear anywhere in the concatenated source blob?
        if literal in source_blob:
            status = 'GOVERNED'
        else:
            status = 'UNKNOWN'
        out.append({
            'file': str(file_path.relative_to(REPO_ROOT)),
            'line': line_no,
            'field': field,
            'literal': literal,
            'context': context,
            'status': status,
        })

    # If body had ${...} expressions, count those as TEMPLATE (well-governed).
    for m in TEMPLATE_RE.finditer(body):
        # only count the ones that contain a numeric-looking access — i.e.
        # ${SOME.RECEIPT.metric} that produces a number. Heuristic:
        # anything referencing *_RECEIPT or _metrics counts.
        expr = m.group(0)
        if re.search(r'RECEIPT|_metrics|calculated_metrics|cohort_summary|outcomes_data', expr):
            out.append({
                'file': str(file_path.relative_to(REPO_ROOT)),
                'line': line_no,
                'field': field,
                'literal': expr,
                'context': '',
                'status': 'TEMPLATE',
            })
    return out


def detect_cross_persona_leak(file_path: Path, hits: list[tuple[int, str, str]]) -> list[dict]:
    """A cross-persona leak = the identical string body appearing in multiple
    persona blocks of the same field. Detection is approximate: we group
    string bodies that appear ≥2× in the same file with the same field name.

    False positives can arise for very short strings, so we require
    length ≥ 40 chars for a hit."""
    seen: dict[tuple[str, str], list[int]] = defaultdict(list)
    for line_no, field, body in hits:
        norm = body.strip()
        if len(norm) < 40:
            continue
        seen[(field, norm)].append(line_no)
    leaks = []
    for (field, body), line_nos in seen.items():
        if len(line_nos) >= 2:
            leaks.append({
                'file': str(file_path.relative_to(REPO_ROOT)),
                'field': field,
                'lines': line_nos,
                'body_preview': body[:80] + ('…' if len(body) > 80 else ''),
            })
    return leaks


def main() -> int:
    if not AUDIT_DIR.exists():
        print(f'WARN: audit dir missing: {AUDIT_DIR}', file=sys.stderr)

    source_blob, per_source = load_sources()

    file_results: list[dict] = []
    all_leaks: list[dict] = []
    all_records: list[dict] = []

    for deck_path in DECK_FILES:
        if not deck_path.exists():
            # File isn't on this branch. e.g. pgx-doctrine-decks.ts lives on
            # agent/w9-pgx-doctrine-parity but not on this audit branch.
            file_results.append({'file': str(deck_path.relative_to(REPO_ROOT)),
                                 'status': 'NOT_ON_BRANCH'})
            continue
        text = deck_path.read_text()
        hits = extract_string_literals(text)
        records = []
        for (line_no, field, body) in hits:
            records.extend(classify_literals(deck_path, line_no, field, body, source_blob))
        counts = {'TEMPLATE': 0, 'GOVERNED': 0, 'UNKNOWN': 0}
        for r in records:
            counts[r['status']] += 1

        leaks = detect_cross_persona_leak(deck_path, hits)
        all_leaks.extend(leaks)

        file_results.append({
            'file': str(deck_path.relative_to(REPO_ROOT)),
            'strings_scanned': len(hits),
            'counts': counts,
            'unknown_records': [r for r in records if r['status'] == 'UNKNOWN'],
        })
        all_records.extend(records)

    # summarise
    total = {'TEMPLATE': 0, 'GOVERNED': 0, 'UNKNOWN': 0}
    for fr in file_results:
        if 'counts' in fr:
            for k, v in fr['counts'].items():
                total[k] += v

    # render report
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    lines: list[str] = []
    lines.append('# W10 — Persona-deck provenance audit')
    lines.append('')
    lines.append(f'- Deck files scanned: **{len(DECK_FILES)}**')
    lines.append(f'- Total numeric-bearing string literals: **{sum(fr.get("strings_scanned", 0) for fr in file_results)}**')
    lines.append(f'- Classification totals: **TEMPLATE {total["TEMPLATE"]} · GOVERNED {total["GOVERNED"]} · UNKNOWN {total["UNKNOWN"]}**')
    lines.append(f'- Cross-persona leaks: **{len(all_leaks)}**')
    lines.append('')
    lines.append('## Legend')
    lines.append('')
    lines.append('- **TEMPLATE** — inside a `${...}` expression referencing an imported `_RECEIPT` const; well-governed, single-sourced.')
    lines.append('- **GOVERNED** — hard-coded literal but also present in an audit / pgx-receipt source file.')
    lines.append('- **UNKNOWN** — hard-coded literal not found in any audit / pgx-receipt source file. Drift risk.')
    lines.append('- **CROSS_PERSONA_LEAK** — identical body/caveat text appearing in ≥ 2 persona blocks of the same deck field; persona toggle does nothing for that string.')
    lines.append('')

    lines.append('## Per-file counts')
    lines.append('')
    lines.append('`Strings` = deck-string literals scanned. `TEMPLATE / GOVERNED / UNKNOWN` = classification *events* (one string can contribute multiple template expressions and multiple hard-coded literals).')
    lines.append('')
    lines.append('| File | Strings | TEMPLATE | GOVERNED | UNKNOWN |')
    lines.append('|------|---------|----------|----------|---------|')
    not_on_branch = []
    for fr in file_results:
        if 'counts' not in fr:
            not_on_branch.append(fr)
            continue
        c = fr['counts']
        lines.append(f'| `{fr["file"]}` | {fr["strings_scanned"]} | {c["TEMPLATE"]} | {c["GOVERNED"]} | {c["UNKNOWN"]} |')
    if not_on_branch:
        lines.append('')
        lines.append('_Files not on this audit branch (they exist on other worker branches, e.g. W9\'s `agent/w9-pgx-doctrine-parity`):_')
        for fr in not_on_branch:
            lines.append(f'- `{fr["file"]}`')
    lines.append('')

    lines.append('## UNKNOWN literals')
    lines.append('')
    unknown_count = sum(len(fr.get('unknown_records', [])) for fr in file_results)
    if unknown_count == 0:
        lines.append('_None — all hard-coded numeric literals traced back to an audit or pgx-receipt source file._')
    else:
        lines.append('These are literals that appear inline in a deck string but were not found in `/mnt/results/audits/` or `src/data/pgx-receipts/*.json`. Each is a candidate for either (a) being wired through a receipt import, or (b) being deleted / clarified.')
        lines.append('')
        for fr in file_results:
            urs = fr.get('unknown_records', [])
            if not urs:
                continue
            lines.append(f'### `{fr["file"]}`')
            lines.append('')
            lines.append('| Line | Field | Literal | Context |')
            lines.append('|------|-------|---------|---------|')
            for r in urs:
                ctx = r['context'].replace('|', '\\|').replace('`', '\'')[:80]
                lit = r['literal'].replace('|', '\\|')
                lines.append(f'| {r["line"]} | {r["field"]} | `{lit}` | {ctx} |')
            lines.append('')

    lines.append('## Cross-persona leaks')
    lines.append('')
    if not all_leaks:
        lines.append('_None — no identical persona-deck body/caveat strings detected._')
    else:
        lines.append('These strings appear identically in ≥ 2 places within the same file and field name. Persona toggling will not change what the user sees for these strings — that defeats the persona-content primitive contract established in W1.')
        lines.append('')
        lines.append('| File | Field | Lines | Preview |')
        lines.append('|------|-------|-------|---------|')
        for lk in all_leaks:
            lines.append(f'| `{lk["file"]}` | {lk["field"]} | {lk["lines"]} | {lk["body_preview"]} |')
        lines.append('')

    lines.append('## Source files consulted')
    lines.append('')
    for src_path in sorted(per_source.keys()):
        rel = src_path.replace(str(REPO_ROOT) + '/', '')
        lines.append(f'- `{rel}` ({len(per_source[src_path])} bytes)')
    lines.append('')

    REPORT_PATH.write_text('\n'.join(lines))
    print(f'Wrote {REPORT_PATH.relative_to(REPO_ROOT)}')
    print(f'  strings_scanned={sum(fr.get("strings_scanned", 0) for fr in file_results)}')
    print(f'  totals: TEMPLATE={total["TEMPLATE"]}  GOVERNED={total["GOVERNED"]}  UNKNOWN={total["UNKNOWN"]}')
    print(f'  cross_persona_leaks={len(all_leaks)}')

    # exit code
    if total['UNKNOWN'] > 0 or all_leaks:
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
