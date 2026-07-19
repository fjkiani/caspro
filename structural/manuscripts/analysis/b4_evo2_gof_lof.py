#!/usr/bin/env python3
"""
B4 — Evo2 zero-shot GOF/LOF variant separation (Manuscript 12).

Deep chaptered 2D animation. Evo2 (evolutionary genomic language model) scores variants
zero-shot by delta-log-likelihood (Delta-ll): how much a variant disrupts the learned
evolutionary sequence constraint. Disruptive (LOF-like) << 0; sequence-tolerated ~ 0;
benign-like > 0. KEY nuance the paper makes: oncogenic GOF hotspots (KRAS G12C, EGFR L858R)
are sequence-TOLERATED (Delta-ll near 0) because they exploit a conserved switch, whereas
TSG-disrupting variants (TP53 R175H, PIK3CA H1047R) and nonsense variants score strongly
negative. So Evo2 is a LOF/disruption detector, not a GOF detector -- and the paper corrects
for this.

Chapters:
  1. Title (EVOLUTIONARY PREDICTION banner)
  2. What Evo2 measures (zero-shot Delta-ll, 8,192 bp context, 1,150 variants)
  3. The separation: threshold bands (disruptive <-0.5 7.7%; uncertain 88.7%; benign-like 3.6%)
  4. Animated variant panel: variants slide to their Delta-ll positions
  5. The GOF nuance: G12C tolerated vs R175H disruptive -> Evo2 detects LOF, not GOF
  6. Correction + orthogonality: signed CRISPRa AUROC 0.39 -> |LFC| 0.656; Evo2 vs CRISPRa r=0.016
All numbers verbatim.
"""
from pathlib import Path
import sys
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import anim_common as ac
import numpy as np

OUT = Path("/mnt/results/manuscript_animations/M12_B4_Evo2_GOF_LOF_panel.gif")
FRAMES = Path("/workspace/afwork/frames/manuscripts/b4")
STILL = Path("/workspace/afwork/b4_laststill.png")
TOTAL_CH = 6

# (label, delta_ll, class)  verbatim from manuscript
VARS = [
    ("CCND1 E279*", -1.264, "nonsense"),
    ("BRCA1 E1526*", -1.258, "nonsense"),
    ("TP53 G245D", -0.626, "LOF"),
    ("TP53 R175H", -0.622, "LOF"),
    ("PIK3CA H1047R", -0.615, "LOF-like"),
    ("KRAS G12C", -0.148, "GOF (tolerated)"),
    ("EGFR L858R", 0.088, "GOF (tolerated)"),
    ("TP53 R248W", 0.099, "DNA-contact (tol.)"),
    ("KRAS G12D", 0.152, "GOF (tolerated)"),
    ("KRAS G12V", 0.259, "GOF (tolerated)"),
]


def dll_axis(ax, y=3.4, x_left=1.4, x_right=10.8, show_band_labels=True):
    """Horizontal Delta-ll axis from -1.4 to +0.5 with threshold bands."""
    lo, hi = -1.4, 0.5
    def X(v):
        return x_left + (v - lo) / (hi - lo) * (x_right - x_left)
    # bands
    ax.add_patch(ac.plt.Rectangle((X(lo), y - 0.5), X(-0.5) - X(lo), 1.0, facecolor=ac.CB_RED, alpha=0.10, zorder=1))
    ax.add_patch(ac.plt.Rectangle((X(-0.5), y - 0.5), X(0.5) - X(-0.5), 1.0, facecolor=ac.GREY, alpha=0.10, zorder=1))
    ax.add_patch(ac.plt.Rectangle((X(0.5), y - 0.5), X(hi) - X(0.5), 1.0, facecolor=ac.CB_GREEN, alpha=0.12, zorder=1))
    ax.plot([X(lo), X(hi)], [y, y], color=ac.INK, lw=1.5, zorder=2)
    for v in [-1.0, -0.5, 0.0, 0.5]:
        ax.plot([X(v), X(v)], [y - 0.08, y + 0.08], color=ac.INK, lw=1.2, zorder=2)
        ax.text(X(v), y - 0.66, f"{v:+.1f}", ha="center", fontsize=8, color=ac.INK)
    if show_band_labels:
        ax.text((X(lo) + X(-0.5)) / 2, y + 0.72, "disruptive (LOF-like)\n\u0394ll < \u22120.5", ha="center", fontsize=8, color=ac.CB_RED)
        ax.text(X(0.0), y + 0.78, "uncertain / sequence-tolerated", ha="center", fontsize=8, color=ac.GREY)
        ax.text((X(0.5) + X(hi)) / 2, y + 0.72, "benign-like\n> +0.5", ha="center", fontsize=8, color=ac.CB_GREEN)
    ax.text((x_left + x_right) / 2, y - 1.0, "Evo2 zero-shot \u0394 log-likelihood (evolutionary sequence constraint)",
            ha="center", fontsize=9.5, color=ac.INK)
    return X


def draw(t):
    fig, ax = ac.new_axes()
    ch = int(t)

    if ch == 1:
        ac.draw_banner(ax, "EVOLUTIONARY PREDICTION", "Manuscript 12 \u2014 Evo2 zero-shot variant scoring (not functional/clinical validation)")
        ac.draw_chapter_title(ax, 1, TOTAL_CH,
                              "What evolution 'expects'",
                              "Evo2 scores variants zero-shot by how much they break learned sequence constraint")
        ac.draw_footer(ax, cite="CrisPRO BRM manuscript \u2014 Evo2 (Arc Institute) zero-shot")
        return fig

    sub = {2: "What Evo2 measures", 3: "The threshold bands (1,150 variants)",
           4: "The variant panel", 5: "The GOF nuance (why some hotspots look 'tolerated')",
           6: "Correction & orthogonality"}.get(ch, "")
    ac.draw_banner(ax, "EVOLUTIONARY PREDICTION", sub)

    if ch == 2:
        ac.rbox(ax, (0.8, 5.6), 3.0, 1.0, "Reference DNA\n(8,192 bp context)", ac.CB_BLUE)
        ac.arrow(ax, (3.8, 6.1), (4.7, 6.1), ac.INK, label="Evo2 gLM")
        ac.rbox(ax, (4.8, 5.6), 3.0, 1.0, "log-likelihood\nof sequence", ac.CB_PURPLE)
        ac.arrow(ax, (7.8, 6.1), (8.7, 6.1), ac.INK)
        ac.rbox(ax, (8.8, 5.6), 2.7, 1.0, "\u0394ll = variant\n\u2212 reference", ac.CB_ORANGE)
        a = ac.fade(2, t, 2.0, 0.5)
        ac.stat_callout(ax, (2.2, 3.4), "1,150", "variants scored", ac.CB_BLUE, w=2.4, value_fs=16, alpha=max(a,0.05))
        ac.stat_callout(ax, (5.0, 3.4), "8,192 bp", "genomic context", ac.CB_BLUE, w=2.4, value_fs=15, alpha=max(a,0.05))
        ac.stat_callout(ax, (7.8, 3.4), "zero-shot", "no task training", ac.CB_GREEN, w=2.4, value_fs=15, alpha=max(a,0.05))
        ac.draw_caption(ax, "Evo2 is an evolutionary genomic language model. For each variant it computes \u0394-log-"
                             "likelihood in 8,192 bp context: strongly negative = evolution 'forbids' it (disruptive).")
        ac.draw_footer(ax, cite="this study \u2014 1,150 variants, 8,192 bp context")
        return fig

    if ch == 3:
        dll_axis(ax, y=4.2)
        a = ac.fade(3, t, 3.0, 0.5)
        ac.stat_callout(ax, (1.5, 5.9), "7.7%", "disruptive\n(n=89, \u0394ll<\u22120.5)", ac.CB_RED, w=2.4, value_fs=15, alpha=max(a,0.05))
        ac.stat_callout(ax, (4.8, 5.9), "88.7%", "uncertain\n(n=1,020)", ac.GREY, w=2.4, value_fs=15, alpha=max(a,0.05))
        ac.stat_callout(ax, (8.1, 5.9), "3.6%", "benign-like\n(n=41)", ac.CB_GREEN, w=2.4, value_fs=15, alpha=max(a,0.05))
        ac.draw_caption(ax, "Most variants fall in the 'uncertain' middle band (88.7%). Only 7.7% score as clearly "
                             "disruptive and 3.6% as benign-like \u2014 zero-shot evolutionary constraint is conservative.")
        ac.draw_footer(ax, cite="this study \u2014 thresholds \u0394ll<\u22120.5 / \u22120.5..+0.5 / >+0.5")
        return fig

    if ch == 4:
        AX_Y = 3.15
        X = dll_axis(ax, y=AX_Y, show_band_labels=False)
        # dots sit ON the axis at their delta-ll x-position; labels stack in tidy rows
        # above (rows at 4.0,4.5,5.0,5.5,6.0) and below (2.55,2.15) with short leaders.
        prog = min(max((t - 4.0) / 0.8, 0.0), 1.0)
        # assign label rows: alternate up-rows for the 8 leftmost, 2 down-rows for the 2 rightmost
        up_rows = [6.35, 5.95, 6.35, 5.95, 6.35, 5.95, 6.35, 5.95]
        # sort by dll so adjacent x-values don't collide; give each an up slot except last two go down
        order = sorted(range(len(VARS)), key=lambda k: VARS[k][1])
        placed = 0
        for rank, i in enumerate(order):
            lab, dll, cls = VARS[i]
            x = X(dll)
            col = ac.CB_RED if dll < -0.5 else (ac.CB_GREEN if dll > 0.5 else ac.CB_PURPLE)
            # dot ON axis (fades/pops in by rank progress)
            pr = min(max((prog * len(VARS) - rank), 0.0), 1.0)
            if pr <= 0:
                continue
            ax.scatter([x], [AX_Y], s=70, color=col, edgecolor=ac.INK, lw=0.6, zorder=6, alpha=pr)
            # label row: stagger vertically to avoid collisions; all ABOVE axis title (which is at AX_Y-1.0)
            row_y = 4.15 + (rank % 4) * 0.62
            ax.plot([x, x], [AX_Y + 0.12, row_y - 0.12], color=col, lw=0.6, alpha=0.6 * pr, zorder=4)
            ax.text(x, row_y, f"{lab}\n{dll:+.2f}", ha="center", va="center", fontsize=7.2, color=col,
                    alpha=pr, zorder=7, fontweight="bold", linespacing=1.0)
        ac.draw_caption(ax, "The panel scored: nonsense variants (CCND1 E279* \u22121.264, BRCA1 E1526* \u22121.258) sit "
                             "farthest left; TP53 R175H (\u22120.622) and PIK3CA H1047R (\u22120.615) are disruptive.")
        ac.draw_footer(ax, cite="this study \u2014 hotspot variant \u0394ll")
        return fig

    if ch == 5:
        X = dll_axis(ax, y=3.0)
        # highlight the contrast: GOF hotspots near 0, TSG/LOF far left
        pairs = [("TP53 R175H", -0.622, ac.CB_RED, 1), ("PIK3CA H1047R", -0.615, ac.CB_RED, 1),
                 ("KRAS G12C", -0.148, ac.CB_ORANGE, -1), ("KRAS G12D", 0.152, ac.CB_ORANGE, -1),
                 ("EGFR L858R", 0.088, ac.CB_ORANGE, -1)]
        for lab, dll, col, side in pairs:
            x = X(dll)
            yv = 3.0 + side * 0.75
            ax.scatter([x], [yv], s=95, color=col, edgecolor=ac.INK, lw=0.7, zorder=5)
            ax.annotate(lab, (x, yv), xytext=(x, yv + side * 0.42), ha="center", fontsize=8, color=col,
                        arrowprops=dict(arrowstyle="-", color=col, lw=0.7))
        a = ac.fade(5, t, 5.3, 0.5)
        ac.rbox(ax, (2.0, 6.2), 8.0, 0.95, "Evo2 detects LOF / DISRUPTION \u2014 not GOF. Oncogenic gain-of-function "
                "hotspots exploit a conserved switch, so they look sequence-'tolerated' (\u0394ll near 0).",
                ac.CB_PURPLE, alpha=max(a,0.05), fontsize=9.6)
        ac.draw_caption(ax, "Key nuance: KRAS G12C/G12D and EGFR L858R (activating GOF) sit near \u0394ll\u22480 \u2014 evolution "
                             "tolerates them at sequence level \u2014 while LOF hits (TP53 R175H, PIK3CA H1047R) score negative.")
        ac.draw_footer(ax, cite="this study \u2014 GOF vs LOF interpretation")
        return fig

    if ch == 6:
        ac.draw_chapter_title(ax, 6, TOTAL_CH, "Correction & orthogonality",
                              "Handling the GOF blind spot, and combining with CRISPRa")
        pts = [
            "\u2022  Signed CRISPRa LFC AUROC = 0.39  \u2192  fixed by using |LFC| = 0.656",
            "\u2022  Evo2 (\u0394ll) captures LOF/disruption; CRISPRa captures functional dependency",
            "\u2022  Evo2 vs CRISPRa are orthogonal:  Pearson r = 0.016  (n=189 genes)",
            "\u2022  \u2192 combine them: complementary, not redundant, evidence streams",
        ]
        for i, p in enumerate(pts):
            ax.text(1.5, 3.0 - i * 0.46, p, fontsize=10.0, color=ac.INK)
        ax.text(6.0, 0.88, "EVOLUTIONARY PREDICTION \u2014 zero-shot sequence constraint, not functional or clinical validation.",
                ha="center", fontsize=8.6, color=ac.CB_PURPLE, style="italic")
        ac.draw_footer(ax, cite="this study \u2014 orthogonality & GOF correction")
        return fig

    ac.draw_chapter_title(ax, ch, TOTAL_CH, "Evo2 GOF/LOF")
    return fig


def main():
    schedule = []
    holds = {1: 16, 2: 30, 3: 30, 4: 40, 5: 36, 6: 32}
    for ch in range(1, TOTAL_CH + 1):
        schedule += list(np.linspace(ch, ch + 0.99, holds[ch]))
    gif, n, mb = ac.render_sequence(draw, schedule, FRAMES, OUT, still_path=STILL, duration=0.085)
    print(f"B4 GIF: {gif} ({mb:.2f} MB, {n} frames)")


if __name__ == "__main__":
    main()
