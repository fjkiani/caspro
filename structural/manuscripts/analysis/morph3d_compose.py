#!/usr/bin/env python3
"""
morph3d_compose.py — GENERALIZED narration compositor for real-AF2/Boltz 3D morphs.

Reusable version of the A1 compositor. A per-scenario wrapper (b5_*.py / a5_*.py / b2_*.py)
supplies:
  * frame_dir  : dir with f###.png + manifest.json from morph3d_pymol.py
  * out_gif    : output path under /mnt/results/manuscript_animations/
  * banner     : evidence-status string (e.g. "AF2 MODELING CONFIDENCE - RUO")
  * scenes     : dict scene_name -> {ch, ch_total, title, caps:[l0,l1], stats:[(val,lab,color)]}
  * footer     : citation/RUO line

Produces the GIF + a last-still PNG. Same visual grammar as A1 (media-check-passed):
top banner, chapter label+title, pLDDT colorbar legend, rolling 2-line caption (switches at
scene phase 0.5), right-column stat callouts, italic RUO footer. All text pre-wrapped so it
never overflows its box.

Illustrative morph between predicted states -- NOT molecular dynamics. RUO.
"""
from pathlib import Path
import json, textwrap
import matplotlib
matplotlib.use("Agg")
matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from matplotlib import colors as mcolors
import matplotlib.colorbar
import imageio.v2 as imageio
from PIL import Image

INK = "#111111"; PAPER = "#FAF9F3"; GREY = "#8a8a8a"; LIGHTGREY = "#d3d0c8"
CB_BLUE = "#0279EE"; CB_ORANGE = "#FF9400"; CB_GREEN = "#75A025"; CB_RED = "#d62728"; CB_PURPLE = "#7a3fa0"
FIG_W, FIG_H, DPI = 12.0, 8.0, 110


def _plddt_colorbar(ax):
    cax = ax.inset_axes([0.845, 0.135, 0.13, 0.028])
    cmap = mcolors.LinearSegmentedColormap.from_list("plddt", [CB_RED, "#ffffff", CB_BLUE])
    cb = matplotlib.colorbar.ColorbarBase(cax, cmap=cmap, norm=mcolors.Normalize(0, 100), orientation="horizontal")
    cb.set_ticks([0, 50, 100]); cb.ax.tick_params(labelsize=6.5, length=2)
    cax.set_title("pLDDT (AF2 confidence)", fontsize=6.8, color=INK, pad=2)


def _compose(raw_path, scene_def, phase, banner, footer):
    img = Image.open(raw_path).convert("RGB")
    fig = plt.figure(figsize=(FIG_W, FIG_H), dpi=DPI)
    ax = fig.add_axes([0, 0, 1, 1]); ax.axis("off")
    ax.add_patch(plt.Rectangle((0, 0), 1, 1, facecolor=PAPER, zorder=-10, transform=ax.transAxes))
    iax = fig.add_axes([0.03, 0.20, 0.80, 0.68]); iax.axis("off"); iax.imshow(img)

    sc = scene_def
    ax.add_patch(FancyBboxPatch((0.012, 0.945), 0.976, 0.045, boxstyle="round,pad=0.002,rounding_size=0.01",
                                facecolor=CB_BLUE, edgecolor="none", transform=ax.transAxes, zorder=6))
    ax.text(0.5, 0.967, f"EVIDENCE STATUS:  {banner}   (illustrative morph, not molecular dynamics)",
            ha="center", va="center", fontsize=10.5, color="white", fontweight="bold", transform=ax.transAxes, zorder=7)
    ax.text(0.5, 0.912, f"CHAPTER {sc['ch']} of {sc['ch_total']}", ha="center", fontsize=10, color=GREY,
            fontweight="bold", transform=ax.transAxes)
    ax.text(0.5, 0.886, sc["title"], ha="center", fontsize=13.5, color=INK, fontweight="bold", transform=ax.transAxes)
    _plddt_colorbar(ax)

    for i, (val, lab, col) in enumerate(sc["stats"]):
        y = 0.78 - i * 0.11
        ax.add_patch(FancyBboxPatch((0.845, y - 0.075), 0.14, 0.09, boxstyle="round,pad=0.004,rounding_size=0.01",
                                    facecolor="white", edgecolor=col, lw=2.0, transform=ax.transAxes, zorder=5))
        ax.text(0.915, y - 0.012, val, ha="center", fontsize=11.0, color=col, fontweight="bold",
                transform=ax.transAxes, zorder=6)
        ax.text(0.915, y - 0.052, "\n".join(textwrap.wrap(lab, 22)), ha="center", fontsize=7.0, color=INK,
                transform=ax.transAxes, zorder=6, va="top")

    caps = sc["caps"]; idx = min(0 if phase < 0.5 else 1, len(caps) - 1)
    wrapped = "\n".join(textwrap.wrap(caps[idx], width=104))
    ax.add_patch(FancyBboxPatch((0.03, 0.045), 0.94, 0.115, boxstyle="round,pad=0.006,rounding_size=0.008",
                                facecolor="white", edgecolor=LIGHTGREY, lw=1.0, transform=ax.transAxes, zorder=5))
    ax.text(0.5, 0.1025, wrapped, ha="center", va="center", fontsize=9.8, color=INK, transform=ax.transAxes,
            zorder=6, linespacing=1.25)
    ax.text(0.5, 0.018, footer, ha="center", fontsize=7.4, color=GREY, style="italic", transform=ax.transAxes)
    return fig


def render(frame_dir, out_gif, banner, scenes, footer, duration=0.11, still_path=None):
    frame_dir = Path(frame_dir); out_gif = Path(out_gif)
    out_gif.parent.mkdir(parents=True, exist_ok=True)
    comp_dir = frame_dir.parent / (frame_dir.name + "_comp"); comp_dir.mkdir(exist_ok=True)
    manifest = json.load(open(frame_dir / "manifest.json"))

    scene_frames = {}
    for m in manifest:
        scene_frames.setdefault(m["scene"], []).append(m["frame"])

    paths = []
    for m in manifest:
        frames = scene_frames[m["scene"]]
        phase = frames.index(m["frame"]) / max(len(frames) - 1, 1)
        raw = frame_dir / f"f{m['frame']:03d}.png"
        fig = _compose(raw, scenes[m["scene"]], phase, banner, footer)
        p = comp_dir / f"c{m['frame']:03d}.png"
        fig.savefig(p, dpi=DPI, facecolor=PAPER); plt.close(fig); paths.append(p)

    imgs = [imageio.imread(p) for p in paths]
    imageio.mimsave(out_gif, imgs, duration=duration, loop=0)
    if still_path:
        last = manifest[-1]
        fig = _compose(frame_dir / f"f{last['frame']:03d}.png", scenes[last["scene"]], 1.0, banner, footer)
        fig.savefig(still_path, dpi=DPI, facecolor=PAPER); plt.close(fig)
    print(f"{out_gif.name}: {out_gif.stat().st_size/1e6:.2f} MB, {len(imgs)} frames")
    return out_gif
