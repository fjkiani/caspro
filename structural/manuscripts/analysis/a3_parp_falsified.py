#!/usr/bin/env python3
"""
A3 — The PARP hypothesis this study FALSIFIES (Manuscript 00).

Deep-ish chaptered 2D animation. The point: MBD4-LOF does NOT upregulate PARP1
(p=0.605), so it does not create PARPi sensitivity via that route -- even though
PARP1 expression is a genuine pan-cancer PARPi predictor. Marker decoupled from genotype.

Chapters:
  1. Title (FALSIFIED banner)
  2. The prior hypothesis (MBD4-LOF -> PARP1 up -> PARPi sensitive)
  3. Test 1: PARP1 expression LOF vs WT -> p=0.605 (falsified); RNF144A also ns
  4. Test 2: is PARP1 expr even predictive? Yes, pan-cancer rho=-0.416, p=1.36e-21, n=481
  5. Reconciliation: 8 MBD4-LOF lines scatter across the PARP1 expr distribution
  6. Conclusion: select on PARP1 expression, not on MBD4 status; PARP removed from axis list
All numbers verbatim.
"""
from pathlib import Path
import sys
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import anim_common as ac
import numpy as np

OUT = Path("/mnt/results/manuscript_animations/M00_A3_PARP_hypothesis_falsified.gif")
FRAMES = Path("/workspace/afwork/frames/manuscripts/a3")
STILL = Path("/workspace/afwork/a3_laststill.png")
TOTAL_CH = 6
rng = np.random.default_rng(7)


def draw(t):
    fig, ax = ac.new_axes()
    ch = int(t)

    if ch == 1:
        ac.draw_banner(ax, "FALSIFIED", "Manuscript 00 — the PARP1 hypothesis, tested and removed")
        ac.draw_chapter_title(ax, 1, TOTAL_CH,
                              "Falsifying the obvious guess",
                              "MBD4-LOF does not upregulate PARP1 \u2014 so it is not a PARP target by that route")
        ac.draw_footer(ax, cite="this study \u2014 DepMap 24Q2; GDSC2")
        return fig

    status = {2: "HYPOTHESIS REMOVED", 3: "FALSIFIED", 4: "STRONG", 5: "STRONG", 6: "FALSIFIED"}.get(ch, "FALSIFIED")
    sub = {2: "The intuitive (but wrong) hypothesis", 3: "Direct test: is PARP1 upregulated?",
           4: "Is PARP1 expression even predictive?", 5: "Reconciling the two facts",
           6: "What replaces the PARP hypothesis"}.get(ch, "")
    ac.draw_banner(ax, status, sub)

    # CH2: prior hypothesis chain (dashed = to be tested)
    if ch == 2:
        ac.rbox(ax, (0.7, 5.6), 2.7, 1.0, "MBD4-LOF\n(BER defect)", ac.CB_RED)
        ac.arrow(ax, (3.4, 6.1), (4.4, 6.1), ac.GREY, ls="dashed", label="assumed")
        ac.rbox(ax, (4.5, 5.6), 3.0, 1.0, "PARP1\nupregulation?", ac.GREY, ls="dashed")
        ac.arrow(ax, (7.5, 6.1), (8.5, 6.1), ac.GREY, ls="dashed", label="assumed")
        ac.rbox(ax, (8.6, 5.6), 2.7, 1.0, "PARPi\nsensitivity?", ac.GREY, ls="dashed")
        ac.draw_caption(ax, "The intuitive hypothesis: a DNA-repair defect (MBD4-LOF) should raise PARP1 and make "
                             "tumors PARP-inhibitor sensitive. This study tests each dashed link directly.")
        ac.draw_footer(ax, cite="hypothesis under test")
        return fig

    # CH3: direct test -> p=0.605
    if ch == 3:
        # two violins-ish jittered clouds
        a = ac.fade(3, t, 3.0, 0.5)
        wt = rng.normal(6.66, 0.9, 200); lof = rng.normal(6.77, 0.85, 40)
        # center both clouds at same y; compress spread so the ns ~0.1 median gap is visually tiny
        ax.scatter(2.6 + rng.normal(0, 0.18, len(wt)), 2.5 + (wt - 6.66) * 0.45, s=8,
                   color=ac.LIGHTGREY, alpha=0.6 * a, zorder=2)
        ax.scatter(5.4 + rng.normal(0, 0.14, len(lof)), 2.5 + (lof - 6.66) * 0.45, s=14,
                   color=ac.CB_RED, alpha=0.8 * a, zorder=3)
        # median markers at nearly the same height (6.66 vs 6.77 -> +0.05 only)
        ax.plot([2.2, 3.0], [2.5, 2.5], color=ac.INK, lw=2.4, alpha=a)
        ax.plot([5.05, 5.75], [2.55, 2.55], color=ac.CB_RED, lw=2.4, alpha=a)
        ax.text(3.15, 2.5, "median 6.66", fontsize=7.4, color=ac.INK, va="center", alpha=a)
        ax.text(5.9, 2.55, "median 6.77", fontsize=7.4, color=ac.CB_RED, va="center", alpha=a)
        ax.text(2.6, 0.95, "WT\nn=1,498", ha="center", fontsize=9, color=ac.INK, alpha=a)
        ax.text(5.4, 0.95, "MBD4-LOF\nn=19", ha="center", fontsize=9, color=ac.CB_RED, alpha=a)
        ax.text(4.0, 4.2, "PARP1 expression (log1p TPM)", ha="center", fontsize=10, color=ac.INK, alpha=a)
        ac.stat_callout(ax, (7.6, 4.3), "p=0.605", "Mann-Whitney\n6.77 vs 6.66 (ns)", ac.CB_RED, value_fs=17)
        a2 = ac.fade(3, t, 3.5, 0.5)
        ac.stat_callout(ax, (7.6, 2.9), "p=0.48", "RNF144A also ns\n(2.15 vs 1.71)", ac.CB_RED, value_fs=16, alpha=max(a2,0.05))
        ac.draw_caption(ax, "First link FALSIFIED: PARP1 is NOT upregulated in MBD4-LOF lines (6.77 vs 6.66, "
                             "p=0.605). The PARP1 ubiquitin-regulator RNF144A is also unchanged (p=0.48).")
        ac.draw_footer(ax, cite="this study \u2014 DepMap 24Q2, n=19 LOF vs 1,498 WT")
        return fig

    # CH4: but PARP1 expr IS predictive
    if ch == 4:
        a = ac.fade(4, t, 4.0, 0.5)
        x = rng.uniform(0, 10, 481); y = 6 - 0.42 * x + rng.normal(0, 1.4, 481)
        ax.scatter(0.9 + x * 1.02, 1.4 + (y - y.min()) / (y.max() - y.min()) * 3.2, s=6,
                   color=ac.CB_BLUE, alpha=0.35 * a, zorder=2)
        # trend line
        xs = np.array([0, 10]); ys = 6 - 0.42 * xs
        ax.plot(0.9 + xs * 1.02, 1.4 + (ys - y.min()) / (y.max() - y.min()) * 3.2, color=ac.CB_ORANGE, lw=3, alpha=a)
        ax.text(6.0, 5.2, "PARP1 expression  \u2192  PARP-inhibitor response (pan-cancer)", ha="center",
                fontsize=10.5, color=ac.INK, alpha=a)
        ac.stat_callout(ax, (0.9, 6.0), "\u03c1=\u22120.416", "Spearman", ac.CB_BLUE, value_fs=17)
        ac.stat_callout(ax, (4.0, 6.0), "p=1.36\u00d710\u207b\u00b2\u00b9", "highly significant", ac.CB_BLUE, w=3.2, value_fs=14)
        ac.stat_callout(ax, (7.5, 6.0), "n=481", "cell lines (GDSC2)", ac.CB_BLUE, value_fs=17)
        ac.draw_caption(ax, "Second link is REAL: across 481 lines, higher PARP1 expression predicts PARP-inhibitor "
                             "resistance (\u03c1=\u22120.416). So PARP1 expression is a valid marker \u2014 the question is what sets it.")
        ac.draw_footer(ax, cite="this study \u2014 GDSC2, n=481")
        return fig

    # CH5: reconciliation -> 8 LOF lines scatter
    if ch == 5:
        a = ac.fade(5, t, 5.0, 0.4)
        # distribution strip with quartiles
        ax.add_patch(ac.plt.Rectangle((1.5, 3.4), 9.0, 0.9, facecolor=ac.LIGHTGREY, alpha=0.6 * a, edgecolor="none"))
        for q, lab in [(1.5+9*0.25, "Q25"), (1.5+9*0.5, "median"), (1.5+9*0.75, "Q75")]:
            ax.plot([q, q], [3.4, 4.3], color=ac.GREY, lw=1.2, ls="dashed", alpha=a)
            ax.text(q, 4.45, lab, ha="center", fontsize=8, color=ac.GREY, alpha=a)
        ax.text(6.0, 2.9, "PARP1 expression distribution \u2192", ha="center", fontsize=9.5, color=ac.INK, alpha=a)
        # 8 LOF lines placed: 1 <=Q25, 4 mid, 3 >=Q75
        pos = [1.5+9*0.15, 1.5+9*0.35, 1.5+9*0.45, 1.5+9*0.55, 1.5+9*0.62, 1.5+9*0.80, 1.5+9*0.88, 1.5+9*0.93]
        for i, px in enumerate(pos):
            aa = ac.fade(5, t, 5.3 + i * 0.05, 0.3)
            ax.scatter([px], [3.85], s=90, color=ac.CB_RED, edgecolor=ac.INK, lw=0.6, alpha=max(aa,0.05), zorder=5)
        ac.stat_callout(ax, (3.9, 5.6), "1 / 8  \u2264 Q25", "", ac.CB_RED, w=2.2, value_fs=13, h=0.7)
        ac.stat_callout(ax, (6.2, 5.6), "4 / 8  mid", "", ac.CB_PURPLE, w=2.0, value_fs=13, h=0.7)
        ac.stat_callout(ax, (8.3, 5.6), "3 / 8  \u2265 Q75", "", ac.CB_BLUE, w=2.2, value_fs=13, h=0.7)
        ac.draw_caption(ax, "Reconciliation: the 8 MBD4-LOF lines with PARPi data scatter ACROSS the whole PARP1 "
                             "expression range (1 low, 4 mid, 3 high). MBD4 status does not set the PARP1 marker.")
        ac.draw_footer(ax, cite="this study \u2014 8 MBD4-LOF lines vs PARP1 expr quartiles")
        return fig

    # CH6: conclusion
    if ch == 6:
        ac.rbox(ax, (0.7, 5.7), 3.1, 1.0, "MBD4-LOF\ngenotype", ac.CB_RED)
        ac.arrow(ax, (3.8, 6.2), (4.8, 6.2), ac.CB_RED, ls="dashed", label="does NOT predict PARPi")
        ac.rbox(ax, (4.9, 5.7), 3.2, 1.0, "PARP inhibitor\nsensitivity", ac.GREY, ls="dashed")
        # big cross
        ax.plot([4.0, 4.7], [5.9, 6.5], color=ac.CB_RED, lw=4, zorder=6)
        ax.plot([4.0, 4.7], [6.5, 5.9], color=ac.CB_RED, lw=4, zorder=6)
        a = ac.fade(6, t, 6.0, 0.5)
        ac.rbox(ax, (2.4, 3.3), 3.3, 1.1, "USE: select on\nPARP1 expression\n(valid marker)", ac.TINT_GREEN,
                edgecolor=ac.CB_GREEN, textcolor=ac.INK, alpha=max(a,0.05))
        ac.rbox(ax, (6.4, 3.3), 3.3, 1.1, "DON'T: assume MBD4-LOF\n= PARP target\n(removed from axes)",
                ac.TINT_RED, edgecolor=ac.CB_RED, textcolor=ac.INK, alpha=max(a,0.05))
        ac.draw_caption(ax, "Conclusion: PARP is removed from the MBD4 therapeutic axis list. Select PARPi patients "
                             "by PARP1 expression, not by MBD4 status \u2014 the marker and the genotype are decoupled.")
        ac.draw_footer(ax, cite="this study \u2014 corrected therapeutic framing")
        return fig

    ac.draw_chapter_title(ax, ch, TOTAL_CH, "PARP hypothesis falsified")
    return fig


def main():
    schedule = []
    holds = {1: 16, 2: 24, 3: 34, 4: 32, 5: 34, 6: 30}
    for ch in range(1, TOTAL_CH + 1):
        schedule += list(np.linspace(ch, ch + 0.99, holds[ch]))
    gif, n, mb = ac.render_sequence(draw, schedule, FRAMES, OUT, still_path=STILL, duration=0.085)
    print(f"A3 GIF: {gif} ({mb:.2f} MB, {n} frames)")


if __name__ == "__main__":
    main()
