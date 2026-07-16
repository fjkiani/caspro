#!/usr/bin/env python3
"""
w7b-light-mode-patcher.py — deterministic light-mode retrofit for tumor-board tree.

Approach:
  * Add useTheme() hook (does not require prop threading)
  * Rewrite outermost container className to be theme-aware
  * Rewrite common leaf classes (border-white/5, text-white, bg-black/*) to be
    theme-aware
  * Idempotent: safe to re-run

Files patched:
  * 5 engines under tumor-board/engines/
  * DNAHero.tsx (0 refs, dark-only)
  * ScrollBoardSurface.tsx, TumorBoardSurface.tsx (0 refs)
  * MultiAssetEngine.tsx, GateTierEngine.tsx already imported above (0 refs)

Does NOT touch shared/EvidenceHeatmap, shared/LogStream, shared/MechanismFitRadar
— they already accept isDarkMode prop; we thread it from parent surfaces.
"""

import re
from pathlib import Path

ROOT = Path("/workspace/caspro/src/components/tumor-board")

# Files we own end-to-end for the light-mode retrofit.
TARGETS = [
    ROOT / "engines" / "BiomarkerFailureEngine.tsx",
    ROOT / "engines" / "GateTierEngine.tsx",
    ROOT / "engines" / "MechanismDivergenceEngine.tsx",
    ROOT / "engines" / "MultiAssetEngine.tsx",
    ROOT / "engines" / "PopulationFunnelEngine.tsx",
    ROOT / "shared" / "DNAHero.tsx",
    ROOT / "ScrollBoardSurface.tsx",
    ROOT / "TumorBoardSurface.tsx",
]

# Two-way class rewrite table. Each rule maps a legacy dark-only class to the
# theme-aware equivalent using a ternary against isDarkMode. Ordering matters —
# longer strings first so we don't clobber sub-strings.
CLASS_REWRITES: list[tuple[str, str]] = [
    # Outer container variants
    (
        'className="relative w-full min-h-[720px] bg-[#020408] text-zinc-400 font-mono p-8 rounded border border-zinc-900 overflow-hidden"',
        'className={`relative w-full min-h-[720px] font-mono p-8 rounded border overflow-hidden ${isDarkMode ? \'bg-[#020408] text-zinc-400 border-zinc-900\' : \'bg-white text-zinc-700 border-zinc-200 shadow-sm\'}`}',
    ),
    # DNAHero root
    (
        'className="relative w-full h-screen bg-[#020408] overflow-hidden font-mono select-none"',
        'className={`relative w-full h-screen overflow-hidden font-mono select-none ${isDarkMode ? \'bg-[#020408]\' : \'bg-white\'}`}',
    ),
    # TumorBoardSurface root
    (
        'className="min-h-screen bg-[#020408] text-zinc-400 font-mono"',
        'className={`min-h-screen font-mono ${isDarkMode ? \'bg-[#020408] text-zinc-400\' : \'bg-white text-zinc-700\'}`}',
    ),
    # Sticky header on TumorBoardSurface
    (
        'className="border-b border-white/5 bg-black/40 backdrop-blur-sm sticky top-0 z-40"',
        'className={`border-b backdrop-blur-sm sticky top-0 z-40 ${isDarkMode ? \'border-white/5 bg-black/40\' : \'border-zinc-200 bg-white/80\'}`}',
    ),
    # Inner header rule used across 5 engines
    (
        'className="relative z-10 flex items-center justify-between border-b border-white/5 pb-6 mb-8"',
        'className={`relative z-10 flex items-center justify-between border-b pb-6 mb-8 ${isDarkMode ? \'border-white/5\' : \'border-zinc-200\'}`}',
    ),
    # Logo tile
    (
        'className="w-12 h-12 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center"',
        'className={`w-12 h-12 rounded border flex items-center justify-center ${isDarkMode ? \'border-zinc-800 bg-zinc-950\' : \'border-zinc-200 bg-zinc-100\'}`}',
    ),
    # Engine title
    (
        'className="text-lg font-black tracking-[0.3em] uppercase text-white"',
        'className={`text-lg font-black tracking-[0.3em] uppercase ${isDarkMode ? \'text-white\' : \'text-zinc-900\'}`}',
    ),
    # Header divider dot
    (
        'className="h-3 w-px bg-zinc-800"',
        'className={`h-3 w-px ${isDarkMode ? \'bg-zinc-800\' : \'bg-zinc-300\'}`}',
    ),
    # ScrollBoard section spec: header border-t
    (
        'className="max-w-[1600px] mx-auto px-8 py-16 border-t border-white/5"',
        'className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${isDarkMode ? \'border-white/5\' : \'border-zinc-200\'}`}',
    ),
    # ScrollBoard heading text-white
    (
        'className="text-3xl font-black uppercase tracking-[0.15em] text-white mb-3"',
        'className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${isDarkMode ? \'text-white\' : \'text-zinc-900\'}`}',
    ),
    (
        'className="text-[14px] leading-relaxed text-zinc-300 mb-6 max-w-3xl"',
        'className={`text-[14px] leading-relaxed mb-6 max-w-3xl ${isDarkMode ? \'text-zinc-300\' : \'text-zinc-600\'}`}',
    ),
    # ScrollBoard logo container variant
    (
        'className="w-16 h-16 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center"',
        'className={`w-16 h-16 rounded border flex items-center justify-center ${isDarkMode ? \'border-zinc-800 bg-zinc-950\' : \'border-zinc-200 bg-zinc-100\'}`}',
    ),
    (
        'className="mt-2 text-center text-[10px] font-black tracking-widest text-zinc-600"',
        'className={`mt-2 text-center text-[10px] font-black tracking-widest ${isDarkMode ? \'text-zinc-600\' : \'text-zinc-500\'}`}',
    ),
]


def ensure_import(source: str) -> tuple[str, bool]:
    """Idempotently add `import { useTheme } from '@/context/ThemeContext'`."""
    if "from '@/context/ThemeContext'" in source or 'from "@/context/ThemeContext"' in source:
        return source, False

    # Insert after the last import line to avoid landing in a JSX block.
    lines = source.splitlines(keepends=True)
    last_import_idx = -1
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("import ") and stripped.endswith(";"):
            last_import_idx = i
    if last_import_idx == -1:
        # No imports; drop it at the top after use client if present, else at top
        insertion = "import { useTheme } from '@/context/ThemeContext';\n"
        for i, line in enumerate(lines):
            if line.strip() == "'use client';" or line.strip() == '"use client";':
                lines.insert(i + 1, "\n" + insertion)
                return "".join(lines), True
        lines.insert(0, insertion)
        return "".join(lines), True

    lines.insert(last_import_idx + 1, "import { useTheme } from '@/context/ThemeContext';\n")
    return "".join(lines), True


def ensure_hook(source: str) -> tuple[str, bool]:
    """Idempotently add `const { isDarkMode } = useTheme();` to every function
    component that renders and doesn't already have it."""
    if "const { isDarkMode } = useTheme()" in source:
        return source, False

    # Add hook immediately after the default-exported component's opening brace.
    # Strategy: match "export default function XXX(...) {" then inject a hook
    # line right after the brace. Handles both named and arrow default exports
    # in a light-touch way — the engines and surfaces are all
    # "export default function".
    pattern = re.compile(
        r"(export\s+default\s+function\s+[A-Za-z_]\w*\s*\([^)]*\)\s*\{)",
        re.MULTILINE,
    )

    def repl(m: re.Match[str]) -> str:
        return f"{m.group(1)}\n  const {{ isDarkMode }} = useTheme();"

    new_source, count = pattern.subn(repl, source, count=1)
    if count == 0:
        # Try `export default function` on its own line + named function elsewhere
        return source, False
    return new_source, True


def apply_rewrites(source: str) -> tuple[str, int]:
    changed = 0
    for old, new in CLASS_REWRITES:
        if old in source:
            source = source.replace(old, new)
            changed += 1
    return source, changed


def patch_file(path: Path) -> dict:
    source = path.read_text()
    original = source

    source, added_import = ensure_import(source)
    source, added_hook = ensure_hook(source)
    source, rewrite_count = apply_rewrites(source)

    if source != original:
        path.write_text(source)

    return {
        "path": str(path.relative_to(Path("/workspace/caspro"))),
        "added_import": added_import,
        "added_hook": added_hook,
        "rewrites_applied": rewrite_count,
        "wrote": source != original,
    }


def main() -> None:
    results = [patch_file(p) for p in TARGETS if p.exists()]
    missing = [str(p) for p in TARGETS if not p.exists()]

    print("=== w7b light-mode patcher ===")
    for r in results:
        flags = []
        if r["added_import"]:
            flags.append("+import")
        if r["added_hook"]:
            flags.append("+hook")
        if r["rewrites_applied"]:
            flags.append(f"{r['rewrites_applied']}xrw")
        flag_str = " ".join(flags) if flags else "no-change"
        print(f"  {r['path']:60s} {flag_str}")
    if missing:
        print("MISSING:", missing)


if __name__ == "__main__":
    main()
