#!/usr/bin/env python3
"""
pdb3d_compose.py — light, structure-forward compositor for experimental-PDB 3D renders.

Wraps each PyMOL frame (from pdb3d_render.py) with MINIMAL chrome so the structure carries the
story (user called heavy 2D narration "slop"):
  - slim top title bar: gene + biology (e.g. "KRAS G12C  -  drug bound in the pocket")
  - top-right experimental-evidence tag: "EXPERIMENTAL X-ray  |  PDB 6OIM  |  1.65 A"
  - a small fixed legend chip for what the colors mean (drug / mutation / pocket / DNA)
  - ONE short caption line at the bottom (the single biological point)
  - optional fixed corner callout (e.g. an Evo2 delta-ll or fold-change stat) with a leader dot
  - italic footer: source + RUO
All text is fixed-position and pre-wrapped (textwrap) -> always legible, never collides with the
rotating structure (unlike on-atom PyMOL labels). Liberation Sans, colorblind-safe palette, PNG.

render(frame_dir, out_gif, title, evidence, caption, legend, footer,
       stat=None, duration=0.11, still_path=None)
"""
import os, json, glob, textwrap
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Rectangle
import matplotlib.image as mpimg

matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
matplotlib.rcParams["svg.fonttype"] = "none"

INK = "#1a1a1a"; PAPER = "#ffffff"; GREY = "#5c5c5c"; LIGHTGREY = "#e9e9e9"
CB_BLUE = "#0279EE"; CB_ORANGE = "#FF9400"; CB_GREEN = "#75A025"
CB_RED = "#d62728"; CB_PINK = "#e6399b"; CB_CYAN = "#17a2b8"


def _load_manifest(frame_dir):
    mf = os.path.join(frame_dir, "manifest.json")
    if os.path.exists(mf):
        return json.load(open(mf))
    frames = sorted(glob.glob(os.path.join(frame_dir, "f*.png")))
    return [{"frame": i, "scene": "orbit"} for i in range(len(frames))]


def _compose_frame(img_path, title, evidence, caption, legend, footer, stat):
    fig = plt.figure(figsize=(12.2, 8.6), dpi=110)
    fig.patch.set_facecolor(PAPER)

    # ---- structure image panel (center) ----
    ax = fig.add_axes([0.035, 0.115, 0.93, 0.775])
    ax.imshow(mpimg.imread(img_path)); ax.axis("off")

    # ---- top title bar ----
    bar = fig.add_axes([0, 0.905, 1, 0.095]); bar.axis("off")
    bar.add_patch(Rectangle((0, 0), 1, 1, transform=bar.transAxes,
                            facecolor=CB_BLUE, edgecolor="none"))
    bar.text(0.02, 0.5, title, transform=bar.transAxes, fontsize=17, fontweight="bold",
             color="white", va="center", ha="left")
    # experimental-evidence tag (right)
    bar.text(0.985, 0.5, evidence, transform=bar.transAxes, fontsize=11.5, color="white",
             va="center", ha="right", family="monospace")

    # ---- legend chips (top-left, inside structure panel) ----
    lx, ly = 0.045, 0.858
    for label, color in legend:
        fig.patches.append(plt.matplotlib.patches.Circle((lx, ly), 0.008,
                           transform=fig.transFigure, facecolor=color, edgecolor="none"))
        fig.text(lx + 0.016, ly, label, fontsize=10.5, color=INK, va="center", ha="left")
        ly -= 0.032

    # ---- fixed stat callout (top-right corner, optional) ----
    if stat is not None:
        val, lab, color = stat
        sx, sy = 0.955, 0.845
        box = FancyBboxPatch((sx - 0.145, sy - 0.052), 0.145, 0.088,
                             boxstyle="round,pad=0.006,rounding_size=0.012",
                             transform=fig.transFigure, facecolor="white",
                             edgecolor=color, linewidth=1.6)
        fig.patches.append(box)
        fig.text(sx - 0.072, sy + 0.012, val, fontsize=15, fontweight="bold",
                 color=color, ha="center", va="center")
        fig.text(sx - 0.072, sy - 0.026, lab, fontsize=8.5, color=GREY,
                 ha="center", va="center")

    # ---- bottom caption (single biological point) ----
    cap = fig.add_axes([0, 0.032, 1, 0.075]); cap.axis("off")
    cap.add_patch(FancyBboxPatch((0.03, 0.05), 0.94, 0.9,
                  boxstyle="round,pad=0.01,rounding_size=0.02",
                  transform=cap.transAxes, facecolor="#f5f7fa",
                  edgecolor=LIGHTGREY, linewidth=1))
    wrapped = "\n".join(textwrap.wrap(caption, width=118))
    cap.text(0.5, 0.5, wrapped, transform=cap.transAxes, fontsize=11.5, color=INK,
             va="center", ha="center", linespacing=1.2)

    # ---- footer ----
    fig.text(0.5, 0.006, footer, fontsize=8, color=GREY, style="italic",
             ha="center", va="bottom")

    fig.canvas.draw()
    buf = np.frombuffer(fig.canvas.buffer_rgba(), dtype=np.uint8)
    buf = buf.reshape(fig.canvas.get_width_height()[::-1] + (4,))[:, :, :3].copy()
    plt.close(fig)
    return buf


def render(frame_dir, out_gif, title, evidence, caption, legend, footer,
           stat=None, duration=0.14, still_path=None, colors=64,
           frame_step=2, scale=0.82):
    """Compose frames + encode a compact GIF.

    Size control (semi-transparent ray-traced cartoons are high-entropy -> naive GIFs hit 25 MB):
      - GLOBAL palette + dither=NONE (built from a montage of sampled frames so static chrome maps
        to identical indices frame-to-frame -> strong inter-frame compression, no visible loss).
      - frame_step: keep every Nth rendered frame (orbit stays smooth at duration=0.14).
      - scale: downsample composed frames (0.82 -> ~1100px wide, still crisp text).
    Net: ~25 MB -> ~5 MB with media-check-verified quality. All levers verified on PARP1 (worst case)."""
    from PIL import Image
    manifest = _load_manifest(frame_dir)[::max(1, frame_step)]
    rgb_frames = []
    for entry in manifest:
        img_path = os.path.join(frame_dir, f"f{entry['frame']:03d}.png")
        if not os.path.exists(img_path):
            continue
        rgb_frames.append(_compose_frame(img_path, title, evidence, caption, legend, footer, stat))
    if not rgb_frames:
        raise RuntimeError(f"no frames composed from {frame_dir}")

    pil = [Image.fromarray(f) for f in rgb_frames]
    if scale and scale < 1.0:
        w, h = pil[0].size
        nw, nh = int(w * scale), int(h * scale)
        pil = [im.resize((nw, nh), Image.LANCZOS) for im in pil]
    # global palette from a montage of sampled frames
    montage = Image.fromarray(np.vstack([np.array(pil[i]) for i in range(0, len(pil), 6)]))
    gpal = montage.quantize(colors=colors, method=Image.MEDIANCUT, dither=Image.NONE)
    q = [im.quantize(colors=colors, palette=gpal, dither=Image.NONE) for im in pil]
    q[0].save(out_gif, save_all=True, append_images=q[1:], loop=0,
              duration=int(duration * 1000), optimize=True, disposal=2)
    if still_path:
        pil[len(pil) // 2].save(still_path)
    size_mb = os.path.getsize(out_gif) / 1e6
    print(f"[compose] {out_gif}  {len(q)} frames  {size_mb:.2f} MB")
    return out_gif
