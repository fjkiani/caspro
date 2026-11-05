#!/usr/bin/env python3
"""
A1 compositor — overlay deep chaptered narration onto the MBD4 PyMOL morph frames.

Reads /workspace/afwork/frames/manuscripts/a1_pymol/{f###.png, manifest.json}, and for
each raw structural frame composites:
  - evidence-status banner (AF2 MODELING CONFIDENCE - RUO)
  - chapter label + scene title
  - a pLDDT colorbar legend (red=low, blue=high; AlphaFold convention)
  - rolling explanatory caption (scene-specific, deep narration)
  - stat callouts (verbatim from Manuscript 00 / AK-case receipts)
  - "illustrative morph between two predicted states, not molecular dynamics" + RUO footer

Output GIF -> /mnt/results/manuscript_animations/M00_A1_MBD4_catalytic_loss_narrated.gif
"""
from pathlib import Path
import json
import textwrap
import matplotlib
matplotlib.use("Agg")
matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from matplotlib import cm, colors as mcolors
import imageio.v2 as imageio
import numpy as np
from PIL import Image

PYMOL_DIR = Path("/workspace/afwork/frames/manuscripts/a1_pymol")
OUT = Path("/mnt/results/manuscript_animations/M00_A1_MBD4_catalytic_loss_narrated.gif")
COMP_DIR = Path("/workspace/afwork/frames/manuscripts/a1_comp")
COMP_DIR.mkdir(parents=True, exist_ok=True)
STILL = Path("/workspace/afwork/a1_laststill.png")

INK = "#111111"; PAPER = "#FAF9F3"; GREY = "#8a8a8a"; LIGHTGREY = "#d3d0c8"
CB_BLUE = "#0279EE"; CB_ORANGE = "#FF9400"; CB_GREEN = "#75A025"; CB_RED = "#d62728"
BANNER = CB_BLUE  # AF2 modeling confidence

# scene -> (chapter no, chapter title, [caption lines rotating], [stat callouts])
SCENES = {
    "intro": dict(ch=1, title="MBD4 wild-type: an intact base-excision-repair enzyme",
                  caps=["MBD4 is a DNA glycosylase. Its C-terminal HhH-GPD catalytic domain (residues 426\u2013580, "
                        "shown solid) excises mismatched bases at methylated CpG sites.",
                        "This is a real AlphaFold2 model of the 580-residue wild-type protein, colored by per-residue "
                        "pLDDT confidence (blue = high, red = low). The folded domains are high-confidence."],
                  stats=[("580 aa", "WT length", CB_BLUE), ("426\u2013580", "catalytic domain", CB_GREEN)]),
    "hold": dict(ch=2, title="The patient variant: p.K431Nfs*54 frameshift",
                 caps=["The germline variant c.1293delA causes a frameshift at codon 431 and a premature stop after "
                       "54 novel residues \u2014 a truncated 489-residue protein.",
                       "Codon 431 sits just N-terminal to the catalytic domain. Everything from 426\u2013580 that the "
                       "wild-type enzyme needs for catalysis is downstream of the frameshift."],
                 stats=[("p.K431Nfs*54", "frameshift variant", CB_ORANGE), ("489 aa", "truncated length", CB_ORANGE)]),
    "dissolve": dict(ch=3, title="Physical loss of the catalytic domain",
                     caps=["Watch the catalytic domain (426\u2013580) dissolve: the frameshift physically deletes it. "
                           "This is the structural event \u2014 not a point mutation, an entire functional module removed.",
                           "With no HhH-GPD glycosylase domain, MBD4 base-excision-repair activity is lost. "
                           "This is a genuine structural consequence, which is why it is shown in 3D."],
                     stats=[("\u2212154 aa", "catalytic residues lost", CB_RED), ("BER", "activity abolished", CB_RED)]),
    "truncated": dict(ch=4, title="The truncated product \u2014 catalytic region absent",
                      caps=["The truncated protein (solid, pLDDT-colored) retains the methyl-CpG-binding domain but "
                            "ends before the catalytic domain (wild-type shown as a faint ghost for contrast).",
                            "Functional consequence: loss of MBD4 BER creates the CpG>TpG hypermutator phenotype \u2014 "
                            "and, per this study, an ATR-checkpoint dependency and validated cytidine-analog sensitivity."],
                      stats=[("gemcitabine", "~10\u00d7 sensitization (isogenic)", CB_GREEN),
                             ("ceralasertib", "p=0.021, d=\u22120.50 (ATR)", CB_BLUE)]),
    "compare": dict(ch=5, title="Structure \u2192 therapy: why the domain loss matters",
                    caps=["The missing catalytic domain is the mechanistic root of the dual-axis reframe: cytidine-"
                          "analog synthetic lethality (VALIDATED) and ATR-inhibitor dependency (STRONG).",
                          "Illustrative morph between two AlphaFold2-predicted states \u2014 NOT molecular dynamics. "
                          "Structural confidence (pLDDT) reflects modeling certainty only. Research use only."],
                    stats=[("dual axis", "cytidine SL + ATR dep.", CB_GREEN), ("PARP", "falsified / removed", CB_RED)]),
}

FIG_W, FIG_H = 12.0, 8.0
DPI = 110


def plddt_colorbar(ax):
    """Small pLDDT legend bar (red->white->blue, AlphaFold convention)."""
    cax = ax.inset_axes([0.845, 0.135, 0.13, 0.028])
    cmap = mcolors.LinearSegmentedColormap.from_list("plddt", [CB_RED, "#ffffff", CB_BLUE])
    norm = mcolors.Normalize(0, 100)
    cb = matplotlib.colorbar.ColorbarBase(cax, cmap=cmap, norm=norm, orientation="horizontal")
    cb.set_ticks([0, 50, 100]); cb.ax.tick_params(labelsize=6.5, length=2)
    cax.set_title("pLDDT (AF2 confidence)", fontsize=6.8, color=INK, pad=2)


def compose(raw_path, scene, phase):
    """phase in [0,1] within the scene -> pick which caption line to show."""
    img = Image.open(raw_path).convert("RGB")
    fig = plt.figure(figsize=(FIG_W, FIG_H), dpi=DPI)
    ax = fig.add_axes([0, 0, 1, 1]); ax.axis("off")
    ax.add_patch(plt.Rectangle((0, 0), 1, 1, facecolor=PAPER, zorder=-10, transform=ax.transAxes))
    # place structure image in a centered panel
    iax = fig.add_axes([0.03, 0.20, 0.80, 0.68]); iax.axis("off")
    iax.imshow(img)

    sc = SCENES[scene]
    # banner
    ax.add_patch(FancyBboxPatch((0.012, 0.945), 0.976, 0.045, boxstyle="round,pad=0.002,rounding_size=0.01",
                                facecolor=BANNER, edgecolor="none", transform=ax.transAxes, zorder=6))
    ax.text(0.5, 0.967, "EVIDENCE STATUS:  AF2 MODELING CONFIDENCE \u2014 RUO   (illustrative morph, not molecular dynamics)",
            ha="center", va="center", fontsize=10.5, color="white", fontweight="bold", transform=ax.transAxes, zorder=7)
    # chapter + title
    ax.text(0.5, 0.912, f"CHAPTER {sc['ch']} of 5", ha="center", fontsize=10, color=GREY,
            fontweight="bold", transform=ax.transAxes)
    ax.text(0.5, 0.886, sc["title"], ha="center", fontsize=13.5, color=INK, fontweight="bold", transform=ax.transAxes)

    # pLDDT colorbar
    plddt_colorbar(ax)

    # stat callouts (right column)
    for i, (val, lab, col) in enumerate(sc["stats"]):
        y = 0.78 - i * 0.11
        ax.add_patch(FancyBboxPatch((0.845, y - 0.075), 0.14, 0.09, boxstyle="round,pad=0.004,rounding_size=0.01",
                                    facecolor="white", edgecolor=col, lw=2.0, transform=ax.transAxes, zorder=5))
        ax.text(0.915, y - 0.012, val, ha="center", fontsize=11.5, color=col, fontweight="bold",
                transform=ax.transAxes, zorder=6)
        ax.text(0.915, y - 0.052, lab, ha="center", fontsize=7.2, color=INK, transform=ax.transAxes, zorder=6,
                wrap=True)

    # rolling caption: choose line by phase. Pre-wrap to a fixed character width so text
    # never touches the box borders (matplotlib wrap=True wraps to FIGURE width, not box
    # width, which caused overflow) -- manual wrap keeps a clear horizontal margin.
    caps = sc["caps"]
    idx = 0 if phase < 0.5 else 1
    idx = min(idx, len(caps) - 1)
    wrapped = "\n".join(textwrap.wrap(caps[idx], width=104))
    ax.add_patch(FancyBboxPatch((0.03, 0.045), 0.94, 0.115, boxstyle="round,pad=0.006,rounding_size=0.008",
                                facecolor="white", edgecolor=LIGHTGREY, lw=1.0, transform=ax.transAxes, zorder=5))
    ax.text(0.5, 0.1025, wrapped, ha="center", va="center", fontsize=9.8, color=INK, transform=ax.transAxes,
            zorder=6, linespacing=1.25)

    ax.text(0.5, 0.018, "Real AlphaFold2 models (MBD4 WT 580 aa; K431Nfs*54 489 aa). Research use only \u2014 not clinical "
            "decision support.   |   Source: CrisPRO AK-case receipts; Manuscript 00 (MBD4\u2192ATR reframe).",
            ha="center", fontsize=7.4, color=GREY, style="italic", transform=ax.transAxes)
    return fig


def main():
    manifest = json.load(open(PYMOL_DIR / "manifest.json"))
    # compute per-scene phase (0->1) for caption switching
    scene_frames = {}
    for m in manifest:
        scene_frames.setdefault(m["scene"], []).append(m["frame"])
    order = []
    for m in manifest:
        frames = scene_frames[m["scene"]]
        phase = frames.index(m["frame"]) / max(len(frames) - 1, 1)
        order.append((m["frame"], m["scene"], phase))

    paths = []
    for fno, scene, phase in order:
        raw = PYMOL_DIR / f"f{fno:03d}.png"
        fig = compose(raw, scene, phase)
        p = COMP_DIR / f"c{fno:03d}.png"
        fig.savefig(p, dpi=DPI, facecolor=PAPER)
        plt.close(fig)
        paths.append(p)

    imgs = [imageio.imread(p) for p in paths]
    imageio.mimsave(OUT, imgs, duration=0.11, loop=0)
    # last still
    fig = compose(PYMOL_DIR / f"f{order[-1][0]:03d}.png", order[-1][1], 1.0)
    fig.savefig(STILL, dpi=DPI, facecolor=PAPER); plt.close(fig)
    print(f"A1 narrated GIF: {OUT} ({OUT.stat().st_size/1e6:.2f} MB, {len(imgs)} frames)")


if __name__ == "__main__":
    main()
