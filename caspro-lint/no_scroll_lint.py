#!/usr/bin/env python3
"""
caspro-lint / no_scroll_lint.py
Structural lint for the no-scroll doctrine on primary surfaces.

We can't fully assert "no vertical scroll" without a browser, but we can
flag the most common offenders that cause the problem:

- primary surface files using `min-h-screen` on multiple stacked children
- primary surface files without any tabbed / slider container
  (`<Tabs>`, `<Slider>`, `<Stepper>`, or the shared <SurfaceTabs> component)

Primary surfaces (route roots) come from PRIMARY_SURFACES below.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path
import sys

PRIMARY_SURFACES = [
    "src/app/page.tsx",
    "src/app/pipeline/page.tsx",
    "src/app/engine/page.tsx",
    "src/app/engine/[engineSlug]/page.tsx",
    "src/app/engine/target-lock/page.tsx",
    "src/app/ledger/page.tsx",
    "src/app/ledger/[trialSlug]/page.tsx",
    "src/app/research/page.tsx",
    "src/app/about/page.tsx",
    "src/app/investors/page.tsx",
    "src/app/patients/page.tsx",
    "src/app/products/oncology/page.tsx",
    # Also lint the client-file backing when the route file just wraps a client:
    "src/components/home/HomeAudienceRouter.tsx",
    "src/components/pipeline/PipelineClient.tsx",
    "src/components/engine/EngineIndexClient.tsx",
    "src/components/ledger/LedgerMainPage.tsx",
    "src/components/research/ResearchHub.tsx",
    "src/components/about/AboutClient.tsx",
    "src/components/investors/InvestorsDeck.tsx",
    "src/components/patients/PatientsHubClient.tsx",
    "src/components/audience/AudienceSurface.tsx",
]

TABBED_MARKERS = re.compile(
    r"<(Tabs|SurfaceTabs|Slider|SurfaceSlider|Stepper|SurfaceStepper|SplitPane|SurfaceSplitPane)\b"
)


def lint_file(root: Path, rel: str) -> list[str]:
    p = root / rel
    if not p.exists():
        # Missing file is OK during rebuild; we only warn on strict mode.
        return []
    txt = p.read_text(encoding="utf-8", errors="replace")
    issues: list[str] = []

    # Too many min-h-screen inside primary surface = stacked full-height blocks.
    min_h_count = txt.count("min-h-screen")
    if min_h_count > 1:
        issues.append(f"{rel}: {min_h_count}× min-h-screen — primary surfaces should be single-viewport tabbed")

    # No tabbed / slider container present at all.
    if not TABBED_MARKERS.search(txt):
        issues.append(f"{rel}: missing tabbed / slider / stepper container — primary surfaces must not stack vertically")

    return issues


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("root", nargs="?", default=".")
    ap.add_argument("--strict", action="store_true", help="Fail on any issue, including missing primary files.")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    all_issues: list[str] = []
    for rel in PRIMARY_SURFACES:
        p = root / rel
        if not p.exists():
            if args.strict:
                all_issues.append(f"{rel}: MISSING primary surface")
            continue
        all_issues.extend(lint_file(root, rel))

    if not all_issues:
        print(f"caspro-lint (no-scroll): clean.")
        return 0
    print(f"caspro-lint (no-scroll): {len(all_issues)} issue(s):")
    for i in all_issues:
        print(f"  {i}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
