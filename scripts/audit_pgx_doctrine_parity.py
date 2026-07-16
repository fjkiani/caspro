#!/usr/bin/env python3
"""
W9 parity gate — asserts that canonical PGx doctrine phrases live ONLY in
src/data/pgx-doctrine-decks.ts, not duplicated in surface files.

Rationale
---------
Before W9, the three /engine/safety-dosing surfaces (intro / scroll / tabs) each
authored their own version of the same doctrine claims. A canonical-phrase
drift audit found `deterministic` appearing 3/3/4 times, `regulatory-grade`
0/1/1, `Bayesian read` 0/1/1, etc. The refactor moved the doctrine framing
sentences into src/data/pgx-doctrine-decks.ts as a `PGX_DOCTRINE` record keyed
by receipt id. Each surface pulls them via `usePersonaContent(PGX_DOCTRINE[id])`.

This script re-checks that (a) the module still contains the phrases, and
(b) NO surface file still authors any of them inline.

Exit code 0 if all canonical phrases are single-sourced; non-zero otherwise.
"""
from __future__ import annotations
from pathlib import Path
import sys

# Canonical doctrine phrases that must be single-sourced in the module.
# Adding a new phrase here promotes it to "governed".
CANONICAL: list[str] = [
    'outcome-linked de-risking step no CDSS competitor validates end-to-end',
    'auditable line-by-line against guideline PMID',
    'Bayesian read: strong RRR + directional consistency + null non-actionable',
    'null-effect non-actionable arm confirms actionable-only mechanism',
    'policy-choice comparisons (test upfront vs test after harm)',
    'screening layer, not a decision layer',
    'regulatory-grade filter, not probabilistic recommender',
    'POPular Genetics',
    'never miss a preventable harm',
]

REPO_ROOT = Path(__file__).resolve().parent.parent

SURFACES: list[Path] = [
    REPO_ROOT / 'src/components/engine/SafetyDosingIntroPage.tsx',
    REPO_ROOT / 'src/components/engine/SafetyDosingScrollSurface.tsx',
    REPO_ROOT / 'src/components/engine/SafetyDosingTabsSurface.tsx',
]
DOCTRINE_MODULE: Path = REPO_ROOT / 'src/data/pgx-doctrine-decks.ts'


def main() -> int:
    if not DOCTRINE_MODULE.exists():
        print(f'ERROR: doctrine module missing: {DOCTRINE_MODULE}', file=sys.stderr)
        return 2

    module_text = DOCTRINE_MODULE.read_text()

    print('W9 PGx doctrine parity gate')
    print('=' * 72)
    print(f'module: {DOCTRINE_MODULE.relative_to(REPO_ROOT)}')
    for sf in SURFACES:
        print(f'surface: {sf.relative_to(REPO_ROOT)}')
    print('-' * 72)

    all_pass = True
    for phrase in CANONICAL:
        module_count = module_text.count(phrase)
        surface_counts = {sf.name: sf.read_text().count(phrase) for sf in SURFACES}
        surface_total = sum(surface_counts.values())

        # Two ways to fail: (a) not in module, (b) inline in a surface.
        if module_count == 0:
            all_pass = False
            print(f'FAIL  {phrase[:64]!r} — NOT in module')
            continue
        if surface_total > 0:
            all_pass = False
            print(f'FAIL  {phrase[:64]!r} — inline in surfaces')
            for name, cnt in surface_counts.items():
                if cnt > 0:
                    print(f'        {name}: {cnt}')
            continue
        print(f'PASS  {phrase[:64]!r}  (module {module_count})')

    # Structural checks: import + rendering.
    print('-' * 72)
    print('Structural checks:')
    for sf in SURFACES:
        text = sf.read_text()
        has_import = "from '@/data/pgx-doctrine-decks'" in text
        has_claim = 'Doctrine:' in text and '.claim' in text
        marker = 'OK' if has_import and has_claim else 'FAIL'
        if marker == 'FAIL':
            all_pass = False
        print(f'  {marker}  {sf.name}  import={"y" if has_import else "n"}  renders={"y" if has_claim else "n"}')

    print('=' * 72)
    if all_pass:
        print('OVERALL: PASS — doctrine phrases are single-sourced.')
        return 0
    print('OVERALL: FAIL — doctrine phrases are still duplicated or missing.')
    return 1


if __name__ == '__main__':
    sys.exit(main())
