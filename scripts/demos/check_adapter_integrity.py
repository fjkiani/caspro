#!/usr/bin/env python3
"""
scripts/demos/check_adapter_integrity.py

Adapter-integrity gate for the /demo/* landing pages.

The demos are supposed to be THIN adapters over real bundle facts and
receipts, not a parallel narrative layer. This script enforces two rules:

  1. FABRICATION CHECK — the specs must not contain strings we have
     previously seen used to invent fields on AK01. Any hit fails.

  2. GROUNDING CHECK — every numeric anchor named in the spec must be
     traceable to at least one authoritative source in the repo:

        - src/data/tumor-board/ak-l1-bundle.ts   (AK01 bundle)
        - src/data/pharma/crc-ranker-v1/         (vendored ranker receipt)
        - src/data/brenus/trial_decode_registry_v2.json
        - src/data/pipeline-master.ts
        - src/data/ledger-programs.ts

Usage:
    python3 scripts/demos/check_adapter_integrity.py
    python3 scripts/demos/check_adapter_integrity.py --json

Exit codes:
    0   all checks pass
    1   at least one check failed
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

SPECS = [
    'src/data/demos/demo_patient_spec.json',
    'src/data/demos/demo_pharma_spec.json',
    'src/data/demos/demo_tumor_board_spec.json',
]

SOURCES = [
    'src/data/tumor-board/ak-l1-bundle.ts',
    'src/data/pharma/crc-ranker-v1/crc_ranker_summary_v1.json',
    'src/data/pharma/crc-ranker-v1/crc_ranker_results_v1.csv',
    'src/data/pharma/crc-ranker-v1/provenance.md',
    'src/data/brenus/trial_decode_registry_v2.json',
    'src/data/pipeline-master.ts',
    'src/data/ledger-programs.ts',
]

# Strings we have previously seen invented on AK01 in the demo specs.
# All must be absent from all specs.
FABRICATION_PATTERNS = [
    (r'\bFR[- ]?α\b|\bFR[- ]?alpha\b|\bfolate receptor\b', 'FR-alpha / folate receptor invention'),
    (r'\bELAHERE\b|\bmirvetuximab\b', 'ELAHERE / mirvetuximab reference'),
    # Direct contradiction of AK bundle: any string implying PARP inhibitors are
    # a "strong match" or "recommended" for AK.
    (r'PARP\s+inhibitors?[^.]{0,80}strong(ly)?\s+(recommended|match|fit)',
     'PARP-inhibitor "strong match / recommended" contradiction'),
    (r'olaparib[^.]{0,60}(strong|recommended)\s+(match|fit)',
     'Olaparib "strong / recommended fit" contradiction'),
    (r'niraparib[^.]{0,60}(strong|recommended)\s+(match|fit)',
     'Niraparib "strong / recommended fit" contradiction'),
    # Old wording removed from the HRD test copy.
    (r'PARP-inhibitor eligibility gate', 'stale HRD copy — PR#11 removed'),
]

# Numeric anchors that appear in the demo specs and MUST be grounded
# in one or more of the SOURCES files. Format: (label, regex_in_specs).
# If the pattern is present in any spec, it must also grep-match in at
# least one source file.
NUMERIC_ANCHORS = [
    ('p=0.605 falsification arm',                 r'p\s*=\s*0\.6(05|047879)|0\.605'),
    ('p=0.021 primary anchor',                    r'p\s*=\s*0\.021|0\.0214845'),
    ('rho=-0.42 pan-cancer control',              r'ρ\s*=?\s*-?0\.42|rho\s*=?\s*-?0\.42|-0\.4164'),
    ('n=19 vs 1498 falsification sample',         r'n\s*=?\s*19\s*(vs|vs\.|×|,)?\s*1498'),
    ('n_lof=14 vs n_wt=914 primary sample',       r'n[_ ]lof\s*=?\s*14|n\s*=?\s*14\s*(vs|vs\.)\s*914'),
    ('n=481 positive control',                    r'n\s*=?\s*481'),
    ('MBD4 c.1293delA variant',                   r'MBD4\s*c\.1293delA|MBD4:c\.1293delA'),
    ('PDGFRA c.2263T>C variant',                  r'PDGFRA\s*c\.2263T>C|PDGFRA:c\.2263T>C'),
    ('TP53 R175H variant',                        r'TP53\s+R175H|TP53:R175H'),
    ('AK01 completeness 55%',                     r'\b0\.55\b|55%|55 %'),
    ('PD-L1 CPS 10',                              r'\bCPS\s+10\b|pdL1Cps:\s*10'),
    ('MSS status',                                r"'MSS'|MSS\b"),
    ('CRC ranker broad mean 0.5605',              r'0\.5605|0\.560522'),
    ('CRC ranker TMB≥25 mean 0.8644',             r'0\.8644|0\.864422'),
    ('CRC ranker n=485',                          r'n\s*=?\s*485|485 (patient|row|MSS)'),
    ('CRC ranker TMB≥25 count 9',                 r'"1"\s*:\s*9|TMB\s*[≥>]=?\s*25.*n\s*=?\s*9'),
    ('CRC ranker delta +0.143',                   r'0\.1430|\+0\.143'),
    ('BreAK PATH A 0.6944',                       r'0\.6944'),
    ('BreAK NCT06934538',                         r'NCT06934538'),
    ('CO.26 NCT02870920',                         r'NCT02870920|CO\.26'),
    ('CO.26 pTMB≥28 OS HR 0.34',                  r'HR\s*=?\s*0\.34|OS HR 0\.34'),
    ('CARMEN-LC03 trial',                         r'CARMEN-LC03'),
    ('PROCEADE-CRC-01 trial',                     r'PROCEADE-?CRC-?01'),
    ('CEACAM5 5-failure corpus mention',          r'CEACAM5'),
    ('GAP-01..04 BreAK gaps',                     r'GAP-0[1-4]'),
    ('Ceralasertib recommended',                  r'[Cc]eralasertib'),
    ('Adavosertib recommended',                   r'[Aa]davosertib'),
]


def load_text(paths):
    joined = {}
    for p in paths:
        f = ROOT / p
        if not f.exists():
            joined[p] = ''
            continue
        joined[p] = f.read_text(errors='replace')
    return joined


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--json', action='store_true')
    args = ap.parse_args()

    spec_text = load_text(SPECS)
    source_text = load_text(SOURCES)
    all_specs = '\n'.join(spec_text.values())
    all_sources = '\n'.join(source_text.values())

    fabrications = []
    for pat, label in FABRICATION_PATTERNS:
        hits = []
        for spec, txt in spec_text.items():
            m = re.findall(pat, txt, re.IGNORECASE)
            if m:
                hits.append((spec, len(m)))
        if hits:
            fabrications.append({'pattern': label, 'hits': hits})

    ungrounded = []
    for label, pat in NUMERIC_ANCHORS:
        in_specs = bool(re.search(pat, all_specs))
        in_sources = bool(re.search(pat, all_sources))
        if in_specs and not in_sources:
            ungrounded.append({'anchor': label, 'pattern': pat})

    result = {
        'fabrications': fabrications,
        'ungrounded_anchors': ungrounded,
        'specs_scanned': SPECS,
        'sources_scanned': SOURCES,
    }

    if args.json:
        print(json.dumps(result, indent=2))
    else:
        if fabrications:
            print('[demos] adapter-integrity: FAIL — fabrications present:')
            for f in fabrications:
                print(f"  ✗ {f['pattern']}")
                for s, n in f['hits']:
                    print(f"     - {s}: {n} hit(s)")
        if ungrounded:
            print('[demos] adapter-integrity: FAIL — anchors used in specs but not found in any source:')
            for u in ungrounded:
                print(f"  ✗ {u['anchor']}  (/{u['pattern']}/)")
        if not fabrications and not ungrounded:
            print('[demos] adapter-integrity: clean')

    return 0 if not fabrications and not ungrounded else 1


if __name__ == '__main__':
    sys.exit(main())
