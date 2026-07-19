#!/usr/bin/env python3
"""
B1 — The mutation-centric diagnostic blind spot (Manuscript 12, BRM interception).

Deep chaptered 2D animation. Core: primary functional drivers of brain metastasis are
epigenetic/expression-level and INVISIBLE to mutation-centric panels. 13 of 36 genes have
zero somatic mutations despite strong functional evidence; BACE1 is the apex example.

Chapters:
  1. Title
  2. The clinical problem: brain mets, mutation panels come back "quiet"
  3. The panel: 36 genes, 5 evidence streams (MSK-MET n=1,879 brain-met patients)
  4. The blind spot: 13 / 36 genes have ZERO somatic mutations
  5. Apex example BACE1: CRISPRa LFC +7.28, 156-fold up, 0 mutations
  6. Implication: functional (CRISPRa/expression) axis sees what mutation panels miss
All numbers verbatim.
"""
from pathlib import Path
import sys
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import anim_common as ac
import numpy as np

OUT = Path("/mnt/results/manuscript_animations/M12_B1_mutation_blind_spot.gif")
FRAMES = Path("/workspace/afwork/frames/manuscripts/b1")
STILL = Path("/workspace/afwork/b1_laststill.png")
TOTAL_CH = 6

# 36-gene grid; 13 zero-mutation genes flagged
ZERO_MUT = ["BACE1", "NOM1", "MMP9", "MMP2", "CLDN5", "CCL2", "TWIST1", "ICAM1",
            "FAM72A", "VEGFB", "ATP10D", "SLC25A32", "BACE2"]


def gene_grid(ax, reveal_zero=False, highlight_bace1=False, alpha=1.0):
    """6x6 grid of gene tiles; zero-mutation ones flip red when reveal_zero."""
    genes = [f"g{i}" for i in range(36)]
    # place 13 zero-mut at known spots deterministically
    zero_idx = [0, 3, 5, 8, 11, 14, 17, 19, 22, 25, 28, 31, 34]
    x0, y0 = 2.2, 5.7; dx, dy = 1.25, 0.72
    for i in range(36):
        r, c = divmod(i, 6)
        x = x0 + c * dx; y = y0 - r * dy
        is_zero = i in zero_idx
        is_bace1 = (i == 0)
        if is_zero and reveal_zero:
            fc = ac.TINT_RED; ec = ac.CB_RED; tc = ac.CB_RED
        else:
            fc = "white"; ec = ac.LIGHTGREY; tc = ac.INK
        lw = 2.6 if (is_bace1 and highlight_bace1) else 1.2
        if is_bace1 and highlight_bace1:
            ec = ac.CB_ORANGE
        ax.add_patch(ac.FancyBboxPatch((x, y), 1.12, 0.6, boxstyle="round,pad=0.01,rounding_size=0.05",
                                       facecolor=fc, edgecolor=ec, lw=lw, alpha=alpha, zorder=3))
        if is_bace1 and reveal_zero:
            lbl = "BACE1\n0-mut"; fs = 6.6
        elif is_bace1:
            lbl = "BACE1"; fs = 7.4
        elif is_zero and reveal_zero:
            lbl = "0-mut"; fs = 6.8
        else:
            lbl = "gene"; fs = 6.8
        ax.text(x + 0.56, y + 0.30, lbl, ha="center", va="center", fontsize=fs,
                color=tc, alpha=alpha, fontweight="bold" if is_bace1 else "normal", zorder=4, linespacing=0.95)


def draw(t):
    fig, ax = ac.new_axes()
    ch = int(t)

    if ch == 1:
        ac.draw_banner(ax, "FUNCTIONAL EVIDENCE", "Manuscript 12 \u2014 the brain-metastasis diagnostic blind spot")
        ac.draw_chapter_title(ax, 1, TOTAL_CH,
                              "The drivers your panel can't see",
                              "Brain-met drivers are epigenetic / expression-level \u2014 invisible to mutation panels")
        ac.draw_footer(ax, cite="CrisPRO BRM interception manuscript")
        return fig

    status = {2: "FUNCTIONAL EVIDENCE", 3: "FUNCTIONAL EVIDENCE", 4: "FUNCTIONAL EVIDENCE",
              5: "FUNCTIONAL EVIDENCE", 6: "FUNCTIONAL EVIDENCE"}.get(ch, "FUNCTIONAL EVIDENCE")
    sub = {2: "The clinical problem", 3: "The 36-gene interception panel",
           4: "The blind spot, quantified", 5: "Apex driver: BACE1",
           6: "What a functional axis recovers"}.get(ch, "")
    ac.draw_banner(ax, status, sub)

    if ch == 2:
        ac.rbox(ax, (1.0, 5.6), 3.2, 1.0, "Patient with\nbrain metastasis", ac.CB_PURPLE)
        ac.arrow(ax, (4.2, 6.1), (5.2, 6.1), ac.INK, label="sequence tumor")
        ac.rbox(ax, (5.3, 5.6), 3.2, 1.0, "Mutation panel\n(DNA variants)", ac.CB_BLUE)
        a = ac.fade(2, t, 2.0, 0.5)
        ac.arrow(ax, (6.9, 5.6), (6.9, 4.6), ac.CB_BLUE, alpha=a)
        ac.rbox(ax, (4.9, 3.5), 4.0, 1.0, "\"No actionable\ndriver found\"", ac.GREY, alpha=max(a,0.05), ls="dashed")
        ac.draw_caption(ax, "The clinical problem: brain-metastasis biopsies run through mutation-centric panels "
                             "often come back 'quiet' \u2014 no actionable DNA driver \u2014 while the tumor keeps spreading.")
        ac.draw_footer(ax, cite="MSK-MET cohort context")
        return fig

    if ch == 3:
        gene_grid(ax, reveal_zero=False)
        ac.stat_callout(ax, (9.9, 5.2), "36 genes", "interception panel", ac.CB_BLUE, w=1.9, value_fs=13, h=0.8)
        ac.stat_callout(ax, (9.9, 4.1), "5 streams", "evidence integration", ac.CB_GREEN, w=1.9, value_fs=13, h=0.8)
        ac.stat_callout(ax, (9.9, 3.0), "n=1,879", "brain-met patients\n(MSK-MET)", ac.CB_PURPLE, w=1.9, value_fs=12, h=0.9)
        ac.draw_caption(ax, "The panel: 36 candidate brain-met drivers, nominated by integrating five orthogonal "
                             "evidence streams and benchmarked against 1,879 brain-metastasis patients (MSK-MET).")
        ac.draw_footer(ax, cite="this study \u2014 36-gene panel, MSK-MET n=1,879")
        return fig

    if ch == 4:
        rz = t > 4.25
        gene_grid(ax, reveal_zero=rz)
        a = ac.fade(4, t, 4.4, 0.5)
        # high-contrast solid callout (dark-red text on red tint), fully opaque once revealed
        ax.add_patch(ac.FancyBboxPatch((9.78, 4.5), 2.05, 1.15, boxstyle="round,pad=0.03,rounding_size=0.06",
                                       facecolor=ac.TINT_RED, edgecolor=ac.CB_RED, lw=2.6, zorder=6, alpha=max(a, 0.05)))
        ax.text(10.80, 5.28, "13 / 36", ha="center", va="center", fontsize=17, color="#8a1414",
                fontweight="bold", zorder=7, alpha=max(a, 0.05))
        ax.text(10.80, 4.78, "ZERO somatic\nmutations", ha="center", va="center", fontsize=8.6,
                color="#8a1414", zorder=7, alpha=max(a, 0.05), linespacing=1.05)
        ac.draw_caption(ax, "The blind spot, quantified: 13 of the 36 functionally-nominated drivers carry ZERO "
                             "somatic mutations across the cohort \u2014 a mutation panel would never flag them.")
        ac.draw_footer(ax, cite="this study \u2014 13 zero-mutation genes")
        return fig

    if ch == 5:
        gene_grid(ax, reveal_zero=True, highlight_bace1=True)
        a = ac.fade(5, t, 5.0, 0.5)
        ac.stat_callout(ax, (9.7, 5.4), "LFC +7.28", "CRISPRa\n(brain vs lung)", ac.CB_ORANGE, w=2.1, value_fs=13, h=0.9, alpha=max(a,0.05))
        ac.stat_callout(ax, (9.7, 4.3), "156-fold", "685 vs 4.4 RPM\n(MBM vs ECM)", ac.CB_ORANGE, w=2.1, value_fs=13, h=0.9, alpha=max(a,0.05))
        ac.stat_callout(ax, (9.7, 3.2), "0 mutations", "somatic", ac.CB_RED, w=2.1, value_fs=13, h=0.8, alpha=max(a,0.05))
        ac.draw_caption(ax, "Apex driver BACE1: enormous functional signal (CRISPRa LFC +7.28; 156-fold higher "
                             "expression in brain vs extracranial mets) \u2014 and exactly zero somatic mutations.")
        ac.draw_footer(ax, cite="this study \u2014 GSE237446, GSE205033")
        return fig

    if ch == 6:
        ac.rbox(ax, (0.7, 5.5), 3.1, 1.1, "Mutation panel\n(DNA only)\n\u2192 misses 13 drivers", ac.GREY, ls="dashed",
                fontsize=9.5)
        ac.arrow(ax, (3.9, 6.05), (4.9, 6.05), ac.INK, label="add")
        ac.rbox(ax, (5.0, 5.5), 3.4, 1.1, "Functional axis\n(CRISPRa + expression)", ac.CB_GREEN, fontsize=9.8)
        a = ac.fade(6, t, 6.0, 0.5)
        ac.arrow(ax, (6.7, 5.5), (6.7, 4.6), ac.CB_GREEN, alpha=a)
        ac.rbox(ax, (4.3, 3.4), 4.8, 1.1, "Recovers BACE1 + 12 other\nzero-mutation drivers\n\u2192 druggable (e.g. BACE1 inhibitors)",
                ac.TINT_GREEN, edgecolor=ac.CB_GREEN, textcolor=ac.INK, alpha=max(a,0.05), fontsize=9.8)
        ac.draw_caption(ax, "The fix: a functional interception axis (CRISPRa + expression) recovers BACE1 and the "
                             "other zero-mutation drivers a DNA panel misses \u2014 several already have repurposable drugs.")
        ac.draw_footer(ax, cite="this study \u2014 functional interception rationale")
        return fig

    ac.draw_chapter_title(ax, ch, TOTAL_CH, "Diagnostic blind spot")
    return fig


def main():
    schedule = []
    holds = {1: 16, 2: 28, 3: 30, 4: 34, 5: 34, 6: 32}
    for ch in range(1, TOTAL_CH + 1):
        schedule += list(np.linspace(ch, ch + 0.99, holds[ch]))
    gif, n, mb = ac.render_sequence(draw, schedule, FRAMES, OUT, still_path=STILL, duration=0.085)
    print(f"B1 GIF: {gif} ({mb:.2f} MB, {n} frames)")


if __name__ == "__main__":
    main()
