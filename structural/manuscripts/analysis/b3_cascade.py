#!/usr/bin/env python3
"""
B3 — The brain-metastasis interception cascade (Manuscript 12).

Moderate chaptered 2D animation. The metastatic cascade is a sequence of steps; panel genes
map onto specific steps, and the cascade "lights up" as the animation walks through it. BACE1
acts at the BBB extravasation step (cleaving adhesion molecules). Emphasis: these are
functional/expression drivers (mostly zero somatic mutations), so interception is at the
pathway level, step by step.

Chapters:
  1. Title
  2. The cascade overview (steps 1-8), all dim
  3-. Walk the cascade, lighting each step with its panel gene(s); highlight BACE1 at extravasation
  last. Interception summary: druggable nodes (BACE1 inhibitors, MMP inhibitors, etc.)
Gene->step mapping from manuscript (cascade steps 2-8 for zero-mutation genes; BACE1 at step 5).
"""
from pathlib import Path
import sys
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import anim_common as ac
import numpy as np

OUT = Path("/mnt/results/manuscript_animations/M12_B3_interception_cascade.gif")
FRAMES = Path("/workspace/afwork/frames/manuscripts/b3")
STILL = Path("/workspace/afwork/b3_laststill.png")

# 8-step cascade: (step label, gene(s), is_bace1_step)
STEPS = [
    ("1. Primary tumor\ninvasion", "TWIST1 (EMT)", False),
    ("2. Local ECM\nremodeling", "MMP2 / MMP9", False),
    ("3. Intravasation", "VEGFB / ICAM1", False),
    ("4. Circulation\nsurvival", "CCL2", False),
    ("5. BBB\nextravasation", "BACE1 (apex)", True),
    ("6. CNS\ncolonization", "CLDN5 / ATP10D", False),
    ("7. Proliferation", "FAM72A / NOM1", False),
    ("8. Immune\nrecruitment", "CCL2 / ICAM1", False),
]
TOTAL_CH = 4  # title, overview, walk (multi), summary


def cascade_row(ax, lit_upto, bace1_focus=False, y=4.4):
    """8 step boxes left->right, lit up to `lit_upto` (0..8)."""
    x0 = 0.55; bw = 1.28; gap = 0.14
    for i, (lab, gene, isb) in enumerate(STEPS):
        x = x0 + i * (bw + gap)
        lit = i < lit_upto
        if isb and bace1_focus and lit:
            fc, ec, tc = ac.CB_ORANGE, ac.INK, "white"
        elif lit:
            fc, ec, tc = ac.CB_BLUE, ac.INK, "white"
        else:
            fc, ec, tc = "white", ac.LIGHTGREY, ac.GREY
        ax.add_patch(ac.FancyBboxPatch((x, y), bw, 1.0, boxstyle="round,pad=0.02,rounding_size=0.06",
                                       facecolor=fc, edgecolor=ec, lw=2.2 if (isb and lit) else 1.2, zorder=3))
        ax.text(x + bw / 2, y + 0.62, lab, ha="center", va="center", fontsize=7.2, color=tc, fontweight="bold", zorder=4)
        # gene tag under box, appears when lit
        if lit:
            ax.text(x + bw / 2, y - 0.28, gene, ha="center", va="center", fontsize=6.8,
                    color=(ac.CB_ORANGE if isb else ac.CB_GREEN), fontweight="bold", zorder=4)
        if i < len(STEPS) - 1:
            ac.arrow(ax, (x + bw, y + 0.5), (x + bw + gap, y + 0.5), ac.INK if lit else ac.LIGHTGREY, lw=1.6)


def draw(t):
    fig, ax = ac.new_axes()
    ch = int(t)

    if ch == 1:
        ac.draw_banner(ax, "FUNCTIONAL EVIDENCE", "Manuscript 12 \u2014 the metastatic cascade as an interception map")
        ac.draw_chapter_title(ax, 1, TOTAL_CH,
                              "Intercepting the cascade,\nnot the mutation",
                              "Panel genes act at specific steps \u2014 mostly via expression, not DNA mutation")
        ac.draw_footer(ax, cite="CrisPRO BRM interception manuscript")
        return fig

    if ch == 2:
        ac.draw_banner(ax, "FUNCTIONAL EVIDENCE", "The 8-step brain-metastasis cascade")
        cascade_row(ax, lit_upto=0)
        ac.draw_caption(ax, "The brain-metastasis cascade runs in eight steps, from primary-tumor invasion to "
                             "CNS colonization and immune recruitment. Each step is a potential interception node.")
        ac.draw_footer(ax, cite="this study \u2014 cascade model")
        return fig

    if ch == 3:
        # walk: lit_upto grows 0->8 across the chapter; bace1 focus when we reach step 5
        frac = min(max((t - 3.0) / 0.95, 0.0), 1.0)
        lit = int(round(frac * 8))
        bace1_focus = lit >= 5
        ac.draw_banner(ax, "FUNCTIONAL EVIDENCE",
                       "BBB extravasation \u2014 BACE1 apex node" if bace1_focus else "Walking the cascade")
        cascade_row(ax, lit_upto=lit, bace1_focus=bace1_focus)
        if bace1_focus:
            a = ac.fade(3, t, 3.0, 0.3)
            ac.rbox(ax, (2.4, 1.7), 7.2, 1.15, "BACE1 (\u03b2-secretase, transmembrane aspartyl protease)\ncleaves "
                    "adhesion molecules at the blood-brain barrier \u2192 tumor-cell extravasation\nCRISPRa LFC +7.28  |  156-fold up  |  0 somatic mutations",
                    ac.CB_ORANGE, alpha=max(a,0.05), fontsize=9.0)
            ac.draw_caption(ax, "At step 5 (BBB extravasation), BACE1 \u2014 the apex driver \u2014 cleaves endothelial "
                                 "adhesion molecules, letting tumor cells cross the blood-brain barrier into the CNS.")
        else:
            ac.draw_caption(ax, "Each step lights up with its functionally-nominated driver(s): TWIST1 (EMT), MMP2/9 "
                                 "(ECM), VEGFB/ICAM1 (intravasation), CCL2 (survival) \u2014 mostly expression drivers.")
        ac.draw_footer(ax, cite="this study \u2014 gene\u2192cascade-step mapping")
        return fig

    if ch == 4:
        ac.draw_banner(ax, "FUNCTIONAL EVIDENCE", "Interception summary \u2014 druggable nodes")
        cascade_row(ax, lit_upto=8, bace1_focus=True, y=5.0)
        a = ac.fade(4, t, 4.0, 0.4)
        nodes = [
            ("BACE1 inhibitors", "step 5 \u2014 BBB extravasation (repurposed from Alzheimer's trials)"),
            ("MMP2 / MMP9 inhibitors", "step 2 \u2014 ECM remodeling"),
            ("CCL2 / ICAM1 axis", "steps 4 & 8 \u2014 survival + immune recruitment"),
        ]
        for i, (drug, where) in enumerate(nodes):
            aa = ac.fade(4, t, 4.0 + i * 0.15, 0.3)
            ac.rbox(ax, (1.3, 3.3 - i * 0.72), 3.4, 0.6, drug, ac.TINT_GREEN, edgecolor=ac.CB_GREEN,
                    textcolor=ac.INK, alpha=max(aa,0.05), fontsize=9.0)
            ax.text(4.95, 3.6 - i * 0.72, where, va="center", fontsize=8.6, color=ac.INK, alpha=max(aa,0.05))
        ac.draw_caption(ax, "Because the drivers act at defined cascade steps, interception is node-by-node and "
                             "often druggable today \u2014 e.g. BACE1 inhibitors repurposed from Alzheimer's programs.")
        ac.draw_footer(ax, cite="this study \u2014 drug-repurposing rationale")
        return fig

    ac.draw_chapter_title(ax, ch, TOTAL_CH, "Interception cascade")
    return fig


def main():
    schedule = []
    holds = {1: 16, 2: 26, 3: 48, 4: 36}
    for ch in range(1, TOTAL_CH + 1):
        schedule += list(np.linspace(ch, ch + 0.99, holds[ch]))
    gif, n, mb = ac.render_sequence(draw, schedule, FRAMES, OUT, still_path=STILL, duration=0.085)
    print(f"B3 GIF: {gif} ({mb:.2f} MB, {n} frames)")


if __name__ == "__main__":
    main()
