#!/usr/bin/env python3
"""
Shared narration + rendering helpers for manuscript mechanistic animations.

Uniform grammar (matches the MBD4 reference GIF discipline):
  - persistent evidence-status banner (top), color-coded to the claim's strength
  - chapter title cards
  - rolling explanatory caption (bottom)
  - stat callouts (verbatim numbers from the paper) + citation tags
  - colorblind-safe / Phylo palette, Liberation Sans, RUO footer

These build 2D matplotlib frames -> GIF via imageio. NOT molecular dynamics; the 3D
morphs (separate scripts) use PyMOL. Every number rendered here is quoted from the
source manuscript and must be passed in by the caller (no invented values).
RUO throughout.
"""
from __future__ import annotations
import matplotlib
matplotlib.use("Agg")
matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
matplotlib.rcParams["svg.fonttype"] = "none"
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import imageio.v2 as imageio
import numpy as np

# ---- palette ----
INK = "#111111"
PAPER = "#FAF9F3"
CB_BLUE = "#0279EE"
CB_ORANGE = "#FF9400"
CB_GREEN = "#75A025"
CB_RED = "#d62728"
CB_PURPLE = "#7a3fa0"
CB_YELLOW = "#E9ED4C"
GREY = "#8a8a8a"
LIGHTGREY = "#d3d0c8"
# light tints for boxes that must carry dark text (readability / WCAG AA)
TINT_GREEN = "#e3efce"
TINT_BLUE = "#d6e9fb"
TINT_ORANGE = "#ffe6c2"
TINT_RED = "#f7d6d6"

# ---- evidence-status -> color (faithful to each paper's stated strength) ----
STATUS_COLOR = {
    "VALIDATED": CB_GREEN,
    "STRONG": CB_BLUE,
    "EMERGING": CB_ORANGE,
    "FALSIFIED": CB_RED,
    "HYPOTHESIS REMOVED": CB_RED,
    "EVOLUTIONARY PREDICTION": CB_PURPLE,
    "FUNCTIONAL EVIDENCE": CB_BLUE,
    "AF2 MODELING CONFIDENCE — RUO": CB_BLUE,
    "MODELING CONFIDENCE — RUO": CB_BLUE,
    "CONFOUNDER-HARDENED (STRONG)": CB_BLUE,
}

FIG_W, FIG_H = 12.0, 7.6
DPI = 130


def new_axes():
    fig, ax = plt.subplots(figsize=(FIG_W, FIG_H), dpi=DPI)
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 8.4)
    ax.axis("off")
    ax.add_patch(plt.Rectangle((0, 0), 12, 8.4, facecolor=PAPER, edgecolor="none", zorder=-10))
    return fig, ax


def draw_banner(ax, status, subtitle=None):
    """Persistent evidence-status banner across the top."""
    color = STATUS_COLOR.get(status, GREY)
    ax.add_patch(FancyBboxPatch((0.15, 7.62), 11.7, 0.62,
                                boxstyle="round,pad=0.01,rounding_size=0.05",
                                facecolor=color, edgecolor="none", zorder=6))
    ax.text(6.0, 7.93, f"EVIDENCE STATUS:  {status}", ha="center", va="center",
            fontsize=11.5, color="white", fontweight="bold", zorder=7)
    if subtitle:
        ax.text(6.0, 7.44, subtitle, ha="center", va="center", fontsize=8.6,
                color=color, style="italic", zorder=7)


def draw_caption(ax, text, y=0.62):
    """Rolling explanatory caption near the bottom (2 lines max recommended)."""
    ax.add_patch(FancyBboxPatch((0.4, y - 0.34), 11.2, 0.62,
                                boxstyle="round,pad=0.02,rounding_size=0.04",
                                facecolor="white", edgecolor=LIGHTGREY, lw=1.0, zorder=5))
    ax.text(6.0, y - 0.03, text, ha="center", va="center", fontsize=10.2,
            color=INK, zorder=6, wrap=True, linespacing=1.15)


def draw_footer(ax, cite=None):
    foot = "Research use only (RUO). Not clinical decision support. Numbers quoted verbatim from the manuscript."
    if cite:
        foot = f"{cite}   |   " + foot
    ax.text(6.0, 0.12, foot, ha="center", va="center", fontsize=7.6,
            color=GREY, style="italic")


def draw_chapter_title(ax, chapter_no, chapter_total, title, subtitle=None):
    """Big centered chapter title card element."""
    ax.text(6.0, 5.4, f"CHAPTER {chapter_no} of {chapter_total}", ha="center",
            fontsize=13, color=GREY, fontweight="bold")
    ax.text(6.0, 4.4, title, ha="center", fontsize=22, color=INK, fontweight="bold",
            wrap=True)
    if subtitle:
        ax.text(6.0, 3.4, subtitle, ha="center", fontsize=12.5, color=CB_BLUE,
                style="italic", wrap=True)


def stat_callout(ax, xy, value, label, color=CB_BLUE, w=2.7, h=1.05, value_fs=17, label_fs=8.8, alpha=1.0):
    """A boxed statistic (verbatim paper number) with a label under it."""
    x, y = xy
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.03,rounding_size=0.06",
                                facecolor="white", edgecolor=color, lw=2.2, zorder=4, alpha=alpha))
    ax.text(x + w / 2, y + h * 0.62, value, ha="center", va="center", fontsize=value_fs,
            color=color, fontweight="bold", zorder=5, alpha=alpha)
    ax.text(x + w / 2, y + h * 0.22, label, ha="center", va="center", fontsize=label_fs,
            color=INK, zorder=5, linespacing=1.05, alpha=alpha)


def _lum(hexcolor):
    h = hexcolor.lstrip("#")
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255.0


def auto_text_color(facecolor):
    """Dark ink on light fills (green/orange/yellow), white on dark fills (blue/red/purple)."""
    try:
        return INK if _lum(facecolor) > 0.55 else "white"
    except Exception:
        return "white"


def rbox(ax, xy, w, h, text, facecolor, edgecolor=None, textcolor=None, alpha=1.0,
         fontsize=10.5, lw=2.0, ls="solid", fontweight="bold"):
    x, y = xy
    edgecolor = edgecolor or facecolor
    if textcolor is None:
        textcolor = auto_text_color(facecolor)
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.07",
                                facecolor=facecolor, edgecolor=edgecolor, alpha=alpha,
                                lw=lw, linestyle=ls, zorder=3))
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=fontsize,
            color=textcolor, alpha=min(alpha + 0.15, 1.0), zorder=4, fontweight=fontweight,
            linespacing=1.15)
    return (x + w / 2, y + h / 2)


def arrow(ax, p0, p1, color, alpha=1.0, ls="solid", lw=2.2, label=None, label_dy=0.14,
          rad=0.0, fs=8.5):
    a = FancyArrowPatch(p0, p1, arrowstyle="-|>", mutation_scale=18, color=color,
                        alpha=alpha, linewidth=lw, linestyle=ls,
                        connectionstyle=f"arc3,rad={rad}", zorder=2)
    ax.add_patch(a)
    if label:
        mx, my = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
        ax.text(mx, my + label_dy, label, ha="center", va="bottom", fontsize=fs,
                color=color, alpha=alpha, zorder=5, style="italic")


def fade(target, stage_f, start, span=1.0, floor=0.0):
    """Alpha for an element that fades in from `start` over `span` stages."""
    return min(max((stage_f - start) / span, floor), 1.0) if stage_f > start else floor


def assemble_gif(frame_paths, out_gif, duration=0.09):
    imgs = [imageio.imread(p) for p in frame_paths]
    imageio.mimsave(out_gif, imgs, duration=duration, loop=0)
    return out_gif, len(imgs), out_gif.stat().st_size / 1e6


def render_sequence(draw_fn, schedule, frames_dir, out_gif, still_path=None, duration=0.09):
    """
    draw_fn(t)->fig for each t in schedule; save frames; assemble GIF; optional last still.
    schedule is a list of floats (stage values, with holds/fades baked in by caller).
    """
    frames_dir.mkdir(parents=True, exist_ok=True)
    paths = []
    for i, t in enumerate(schedule):
        fig = draw_fn(t)
        p = frames_dir / f"f{i:04d}.png"
        fig.savefig(p, dpi=DPI, facecolor=PAPER)
        plt.close(fig)
        paths.append(p)
    gif, n, mb = assemble_gif(paths, out_gif, duration=duration)
    if still_path is not None:
        fig = draw_fn(schedule[-1])
        fig.savefig(still_path, dpi=DPI, facecolor=PAPER)
        plt.close(fig)
    return gif, n, mb
