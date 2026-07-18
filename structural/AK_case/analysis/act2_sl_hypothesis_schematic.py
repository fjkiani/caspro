#!/usr/bin/env python3
"""
ACT 2 — SL / ATR-backup HYPOTHESIS schematic animation (2D, matplotlib).

WALLED OFF from Act 1 (real structural evidence). This file produces a SEPARATE
GIF that is a *schematic hypothesis diagram*, NOT a structural/MD animation and
NOT a therapeutic claim.

Persistent on-frame banner (every frame):
    "UNVALIDATED HYPOTHESIS — v3 evidence drops ATR_WEE1 (0 positive modalities
     for MBD4); Computational tier only; not a therapeutic claim"

All numbers are read from the committed manifest.json synthetic_lethality block
(disruption scores, depmap_boost, engine caveat). Nothing is invented.

The animation "lights up" the SL wiring in stages:
  stage 0: two broken repair pathways (MBD4/BER, TP53/CHECKPOINT) — REAL calls
  stage 1: double-hit annotation (BER-pathway loss)
  stage 2: hypothesized backup dependencies (ATR, WEE1) appear DASHED + "?"
  stage 3: investigational probes (ceralasertib/adavosertib) appear, greyed,
           stamped "Computational / legacy v2 / v3 drops it"

Renderer: matplotlib (Agg). Output: GIF via imageio. RUO.
"""
import json
import os
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
matplotlib.rcParams["svg.fonttype"] = "none"
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import imageio.v2 as imageio
import numpy as np

HERE = Path(__file__).resolve().parent
AKROOT = HERE.parent
MANIFEST = AKROOT / "manifest.json"
OUT_GIF = Path("/mnt/results/AK_case_animations/ACT2_SL_hypothesis_schematic.gif")
FRAMES_DIR = Path("/workspace/afwork/frames/act2_sl")
FRAMES_DIR.mkdir(parents=True, exist_ok=True)
OUT_GIF.parent.mkdir(parents=True, exist_ok=True)

# ---- colorblind-friendly palette (matches Act-1 / Phylo) ----
CB_BLUE = "#0279EE"
CB_ORANGE = "#FF9400"
CB_GREEN = "#75A025"
CB_RED = "#d62728"
GREY = "#8a8a8a"
LIGHTGREY = "#c8c8c8"
INK = "#111111"
HYP_PURPLE = "#7a3fa0"   # hypothesis color, visually distinct from "real" boxes

# ---- load grounded numbers ----
with open(MANIFEST) as f:
    manifest = json.load(f)
sl = manifest["synthetic_lethality"]
broken = {b["gene"]: b for b in sl["broken_pathways"]}
deps = {d["pathway"]: d for d in sl["essential_dependencies"]}
CAVEAT = sl["engine_caveat"]

MBD4_DIS = broken["MBD4"]["disruption"]     # 0.654
TP53_DIS = broken["TP53"]["disruption"]     # 0.55
ATR_BOOST = deps["ATR"]["depmap_boost"]     # 0.15
WEE1_BOOST = deps["WEE1"]["depmap_boost"]   # 0.15

BANNER = ("UNVALIDATED HYPOTHESIS  —  v3 evidence matrix drops ATR_WEE1 "
          "(0 positive modalities for MBD4);  Computational tier only;  not a therapeutic claim")
CAPTION = ("Schematic hypothesis diagram — not a molecular structure, not molecular dynamics, "
           "not clinical decision support. RUO.")


def rounded_box(ax, xy, w, h, text, facecolor, edgecolor, alpha=1.0, fontsize=11,
                textcolor="white", lw=2.0, ls="solid", fontweight="bold"):
    x, y = xy
    box = FancyBboxPatch(
        (x, y), w, h,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        linewidth=lw, edgecolor=edgecolor, facecolor=facecolor,
        alpha=alpha, linestyle=ls, mutation_aspect=1.0, zorder=3,
    )
    ax.add_patch(box)
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center",
            fontsize=fontsize, color=textcolor, zorder=4, fontweight=fontweight,
            linespacing=1.15)
    return (x + w / 2, y + h / 2)


def arrow(ax, p0, p1, color, alpha=1.0, ls="solid", lw=2.2, label=None,
          label_dy=0.12, connectionstyle="arc3,rad=0.0"):
    a = FancyArrowPatch(
        p0, p1, arrowstyle="-|>", mutation_scale=18,
        color=color, alpha=alpha, linewidth=lw, linestyle=ls,
        connectionstyle=connectionstyle, zorder=2,
    )
    ax.add_patch(a)
    if label:
        mx, my = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
        ax.text(mx, my + label_dy, label, ha="center", va="bottom",
                fontsize=8.5, color=color, alpha=alpha, zorder=5, style="italic")


def draw_frame(stage_f):
    """stage_f is a float 0..3 allowing fade-in between integer stages."""
    fig, ax = plt.subplots(figsize=(11.6, 7.4), dpi=130)
    ax.set_xlim(-0.2, 12.2)
    ax.set_ylim(0, 8.3)
    ax.axis("off")

    # ---------- persistent HYPOTHESIS banner (red) ----------
    # Split onto two lines so the full string always fits inside the canvas margins.
    ax.add_patch(FancyBboxPatch((0.15, 7.35), 11.7, 0.78,
                                boxstyle="round,pad=0.01,rounding_size=0.05",
                                facecolor=CB_RED, edgecolor="none", zorder=6))
    ax.text(6.0, 7.90, "UNVALIDATED HYPOTHESIS", ha="center", va="center",
            fontsize=11.5, color="white", fontweight="bold", zorder=7)
    ax.text(6.0, 7.56,
            "v3 evidence matrix drops ATR_WEE1 (0 positive modalities for MBD4)  |  Computational tier only  |  not a therapeutic claim",
            ha="center", va="center", fontsize=8.6, color="white", fontweight="bold", zorder=7)
    ax.text(6.0, 7.16, "ACT 2 of 2 — synthetic-lethality dependency HYPOTHESIS  (walled off from Act 1 structural evidence)",
            ha="center", va="center", fontsize=8.2, color=CB_RED, style="italic", zorder=7)

    # ---------- Layer 1: REAL broken repair calls (always visible) ----------
    ax.text(3.0, 6.75, "OBSERVED (real CrisPRO calls)", ha="center", fontsize=9.5,
            color=INK, fontweight="bold")
    c_mbd4 = rounded_box(ax, (0.7, 5.6), 3.0, 0.95,
                         f"MBD4  p.K431Nfs*54\nBER  →  NON-FUNCTIONAL\ndisruption {MBD4_DIS:.3f}",
                         facecolor=CB_RED, edgecolor="#7a1414", fontsize=10)
    c_tp53 = rounded_box(ax, (0.7, 4.35), 3.0, 0.95,
                         f"TP53  p.R175H\nCHECKPOINT  →  COMPROMISED\ndisruption {TP53_DIS:.3f}",
                         facecolor=CB_ORANGE, edgecolor="#8a5200", fontsize=10)

    # ---------- Layer 2: double-hit node ----------
    a1 = min(max(stage_f - 0.0, 0.0), 1.0)  # stage>=1 reveals double-hit
    c_double = rounded_box(ax, (4.55, 4.95), 2.7, 1.0,
                           "DOUBLE HIT\nBase-Excision-Repair\npathway loss",
                           facecolor=CB_BLUE, edgecolor="#014a90", fontsize=10,
                           alpha=a1)
    if a1 > 0.05:
        arrow(ax, (3.7, 6.05), (4.55, 5.65), CB_RED, alpha=a1)
        arrow(ax, (3.7, 4.85), (4.55, 5.25), CB_ORANGE, alpha=a1)

    # ---------- Layer 3: hypothesized backup dependencies (DASHED + ?) ----------
    a2 = min(max(stage_f - 1.0, 0.0), 1.0)
    ax.text(9.05, 6.75, "HYPOTHESIZED backup dependency", ha="center", fontsize=9.5,
            color=HYP_PURPLE, fontweight="bold", alpha=max(a2, 0.15))
    c_atr = rounded_box(ax, (8.0, 5.55), 2.9, 0.95,
                        f"ATR  (kinase)  ?\nreplication-stress backup\nDepMap boost +{ATR_BOOST:.2f}",
                        facecolor="white", edgecolor=HYP_PURPLE, textcolor=HYP_PURPLE,
                        alpha=max(a2, 0.06), ls="dashed", fontsize=9.5)
    c_wee1 = rounded_box(ax, (8.0, 4.35), 2.9, 0.95,
                         f"WEE1  (kinase)  ?\nG2/M brake w/o p53\nDepMap boost +{WEE1_BOOST:.2f}",
                         facecolor="white", edgecolor=HYP_PURPLE, textcolor=HYP_PURPLE,
                         alpha=max(a2, 0.06), ls="dashed", fontsize=9.5)
    if a2 > 0.05:
        arrow(ax, (7.25, 5.55), (8.0, 6.0), HYP_PURPLE, alpha=a2, ls="dashed")
        arrow(ax, (7.25, 5.15), (8.0, 4.85), HYP_PURPLE, alpha=a2, ls="dashed")
        # label placed in open space between the double-hit node and the dashed boxes
        ax.text(7.62, 5.68, "hypothesis", ha="center", va="bottom", fontsize=8.5,
                color=HYP_PURPLE, alpha=a2, style="italic", zorder=5, rotation=32)

    # ---------- Layer 4: investigational probes (greyed, stamped) ----------
    a3 = min(max(stage_f - 2.0, 0.0), 1.0)
    c_cera = rounded_box(ax, (8.35, 2.95), 2.55, 0.7,
                         "ceralasertib\n(ATR inhibitor)",
                         facecolor=LIGHTGREY, edgecolor=GREY, textcolor=INK,
                         alpha=max(a3, 0.05), fontsize=9, fontweight="normal")
    c_adav = rounded_box(ax, (8.35, 2.05), 2.55, 0.7,
                         "adavosertib\n(WEE1 inhibitor)",
                         facecolor=LIGHTGREY, edgecolor=GREY, textcolor=INK,
                         alpha=max(a3, 0.05), fontsize=9, fontweight="normal")
    if a3 > 0.05:
        arrow(ax, (9.45, 5.55), (9.62, 3.65), GREY, alpha=a3, ls="dotted", lw=1.8)
        arrow(ax, (9.45, 4.35), (9.62, 2.75), GREY, alpha=a3, ls="dotted", lw=1.8)
        ax.text(9.62, 1.7, "INVESTIGATIONAL — not prescribed",
                ha="center", fontsize=8.2, color=GREY, style="italic", alpha=a3)

    # ---------- provenance / engine caveat panel (bottom-left, from manifest) ----------
    ax.add_patch(FancyBboxPatch((0.55, 1.05), 6.9, 2.35,
                                boxstyle="round,pad=0.03,rounding_size=0.05",
                                facecolor="#f4f0e8", edgecolor=GREY, lw=1.2, zorder=1))
    ax.text(0.85, 3.18, "Why this is a HYPOTHESIS, not a lever:", fontsize=9.6,
            color=INK, fontweight="bold", zorder=2)
    wrapped = [
        f"\u2022  ATR/WEE1 dependency comes from the LEGACY v2 SL engine.",
        f"\u2022  v3 evidence matrix DROPS the ATR_WEE1 axis: 0 positive",
        f"    evidence modalities for MBD4 in this case.",
        f"\u2022  DepMap boosts (+{ATR_BOOST:.2f} each) are model priors, not",
        f"    measured essentiality in this tumor.",
        f"\u2022  Drugs shown are Computational-tier probes only.",
    ]
    for i, line in enumerate(wrapped):
        ax.text(0.85, 2.85 - i * 0.31, line, fontsize=8.9, color=INK, zorder=2)

    # ---------- bottom caption (persistent) ----------
    ax.text(6.0, 0.35, CAPTION, ha="center", va="center", fontsize=8.6,
            color=INK, style="italic")

    fig.tight_layout(rect=(0, 0, 1, 1))
    return fig


def main():
    # frame schedule: hold each integer stage, with brief fades between.
    # stage 0 hold, 0->1 fade, 1 hold, 1->2 fade, 2 hold, 2->3 fade, 3 hold (long).
    seq = []
    seq += [0.0] * 12                          # observed calls
    seq += list(np.linspace(0.0, 1.0, 8))      # reveal double-hit
    seq += [1.0] * 10
    seq += list(np.linspace(1.0, 2.0, 8))      # reveal hypothesis deps
    seq += [2.0] * 10
    seq += list(np.linspace(2.0, 3.0, 8))      # reveal probes
    seq += [3.0] * 22                          # final hold (longest — full diagram + caveat)

    paths = []
    for i, s in enumerate(seq):
        fig = draw_frame(s)
        p = FRAMES_DIR / f"f{i:03d}.png"
        fig.savefig(p, dpi=130, facecolor="white")
        plt.close(fig)
        paths.append(p)
    print(f"rendered {len(paths)} frames -> {FRAMES_DIR}")

    # assemble GIF (~12.5 fps => 0.08s/frame); final hold gives a readable pause
    imgs = [imageio.imread(p) for p in paths]
    imageio.mimsave(OUT_GIF, imgs, duration=0.08, loop=0)
    size_mb = OUT_GIF.stat().st_size / 1e6
    print(f"GIF written: {OUT_GIF}  ({size_mb:.2f} MB, {len(imgs)} frames)")

    # save last still for media check
    last_still = Path("/workspace/afwork/act2_sl_laststill.png")
    fig = draw_frame(3.0)
    fig.savefig(last_still, dpi=130, facecolor="white")
    plt.close(fig)
    print(f"last still: {last_still}")


if __name__ == "__main__":
    main()
