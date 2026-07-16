#!/usr/bin/env python3
"""
Worker 5 red-team: scan the three product page-data files for prohibited /
quarantined claims before shipping.

Source of truth for prohibitions: product_truth/PUBLIC_PRODUCT_CLAIM_LEDGER.csv
(rows graded D=BLOCKED, Q=QUARANTINED) plus the CHARTER prohibited-claims list.

Policy:
  - Scan only USER-VISIBLE strings (single-quoted TS string literals inside the
    page-data arrays). Code comments (//...) are allow-listed: honest governance
    notes that name a retired value in a comment are not a shipped claim.
  - Any prohibited numeral or phrase in visible copy => FAIL.
  - Emits release-a/receipts/products_claim_scan.json and exits non-zero on FAIL.

Run: python3 scripts/release-a/verify_products_claims.py
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
PAGES = [
    REPO / "src/data/pages/products-interception-page.ts",
    REPO / "src/data/pages/products-insilico-trials-page.ts",
    REPO / "src/data/pages/products-tumor-board-page.ts",
]
OUT = REPO / "release-a/receipts/products_claim_scan.json"

# (label, compiled regex, why). Matched against VISIBLE copy only.
PROHIBITED = [
    ("BreAK fit 0.7375 (retired)", re.compile(r"0\.7375"),
     "Retired 2026-07-05; ship 0.6944 only."),
    ("MSK-MET AUROC 0.689 (fabricated)", re.compile(r"\b0\.689\b"),
     "Fabricated stat; no source in transcript."),
    ("Extension AUROC 1.000 as generalization", re.compile(r"AUROC\s*1\.0{2,}|1\.000\s*AUROC"),
     "Trivial separation on saturated data; never a headline."),
    ("Internal per-step AUROC 0.97x as clinical discrimination",
     re.compile(r"AUROC\s*0\.9[6-9]\d"),
     "Consistency/QC metric; not independent clinical discrimination."),
    ("Internal AUPRC 0.9xx as clinical discrimination",
     re.compile(r"AUPRC\s*0\.9[5-9]\d"),
     "Consistency/QC metric."),
    ("PATH B ranker", re.compile(r"PATH[\s_-]?B", re.I),
     "Permanently prohibited; PATH A signed 2026-04-28."),
    ("DL-07 DDR 0.983", re.compile(r"0\.983"),
     "Quarantined, implausibly high, publication-blocking."),
    ("LATIFY delta +0.366", re.compile(r"\+?0\.366\b"),
     "Quarantined vector-version conflict."),
    ("LATIFY delta +0.2641", re.compile(r"\+?0\.2641\b"),
     "Quarantined vector-version conflict."),
    ("Blanket 'clinically validated'", re.compile(r"clinically\s+validated", re.I),
     "Prohibited platform-level claim; RUO."),
    ("'FDA-cleared / FDA-approved diagnostic'",
     re.compile(r"FDA[\s-]?(cleared|approved)", re.I),
     "what_crispro_never_does #4."),
    ("Fit above practical ceiling 0.8898", re.compile(r"0\.9[0-9]{2,}\s*(fit|alignment)", re.I),
     "Exceeds ‖p_ref‖ ceiling without recompute."),
    ("Guaranteed guide cut", re.compile(r"guarantee[sd]?\s+(to\s+)?(cut|work)", re.I),
     "Never guarantee wet-lab cutting."),
]

# Prohibited FRAMING: these phrases are only a violation when asserted
# affirmatively. They are allowed inside a negation ("not ... responder
# prediction", "does not ... clinical decision support"). We flag a phrase only
# if it occurs in a string that has NO negation cue anywhere before it.
FRAMING_PHRASES = [
    ("responder prediction", re.compile(r"responder prediction", re.I)),
    ("outcome prediction", re.compile(r"outcome prediction", re.I)),
    ("enrollment prediction", re.compile(r"enrollment prediction", re.I)),
    ("clinical decision support", re.compile(r"clinical decision support", re.I)),
    ("treatment recommendation", re.compile(r"treatment recommendation", re.I)),
    ("prescribing authority", re.compile(r"prescribing authority", re.I)),
]
NEGATION_CUE = re.compile(r"\b(not|never|no|without|isn['\u2019]?t|doesn['\u2019]?t|"
                          r"remains with|stays with|out of scope)\b", re.I)

COMMENT = re.compile(r"^\s*//")
# extract single-quoted TS string literals (visible copy lives in '...').
STRING_LIT = re.compile(r"'((?:[^'\\]|\\.)*)'")


def visible_strings(path: Path):
    """Yield (lineno, text) for visible string literals, skipping comment lines."""
    for i, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if COMMENT.match(line):
            continue
        # strip trailing // comment on a code line (rare here)
        for m in STRING_LIT.finditer(line):
            yield i, m.group(1)


def scan():
    findings = []
    scanned_files = []
    for path in PAGES:
        if not path.exists():
            findings.append({"file": str(path.name), "rule": "MISSING FILE",
                             "line": 0, "text": "", "why": "page-data file not found"})
            continue
        scanned_files.append(path.name)
        for lineno, text in visible_strings(path):
            for label, rx, why in PROHIBITED:
                if rx.search(text):
                    findings.append({"file": path.name, "rule": label,
                                     "line": lineno, "text": text[:160], "why": why})
            for label, rx in FRAMING_PHRASES:
                m = rx.search(text)
                if not m:
                    continue
                # allowed if a negation cue appears anywhere before the phrase
                # in the same string literal
                if NEGATION_CUE.search(text[:m.start()]):
                    continue
                findings.append({"file": path.name, "rule": f"{label} (affirmative)",
                                 "line": lineno, "text": text[:160],
                                 "why": "prohibited framing asserted without negation"})
    return scanned_files, findings


def main():
    scanned, findings = scan()
    status = "PASS" if not findings else "FAIL"
    report = {
        "worker": "W5-red-team",
        "policy": "visible copy only; code comments allow-listed",
        "files_scanned": scanned,
        "rules_checked": len(PROHIBITED) + len(FRAMING_PHRASES),
        "status": status,
        "findings": findings,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))
    print(f"\n[{status}] {len(findings)} finding(s). Report: {OUT.relative_to(REPO)}")
    sys.exit(0 if status == "PASS" else 1)


if __name__ == "__main__":
    main()
