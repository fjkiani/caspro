"""
MBD4 catalytic-domain-loss morph (Act 1 — real structural evidence, RUO).

Illustrative morph between TWO REAL AlphaFold2-predicted states:
  * MBD4 WT (580 aa) — HhH-GPD glycosylase catalytic domain (426-580) intact.
  * MBD4 K431Nfs*54 (489 aa) — frameshift truncation physically deletes it.

NOT molecular dynamics: a scripted transition between two static predicted
structures. Colored by per-residue pLDDT using the AlphaFold convention
(high=blue, low=red/orange) on a fixed 0-100 scale.

Headless: micromamba run -p /workspace/.conda/pymol pymol -cq mbd4_morph_pymol.py
"""

from pymol import cmd
import os

BASE = "/workspace/caspro/structural/AK_case"
WT_PDB = f"{BASE}/structures/MBD4_WT_ranked_0.pdb"
TRUNC_PDB = f"{BASE}/structures/MBD4_K431Nfs_trunc_ranked_0.pdb"
FRAME_DIR = "/workspace/afwork/frames/mbd4_morph"
os.makedirs(FRAME_DIR, exist_ok=True)

CATALYTIC_START = 426
CATALYTIC_END = 580
FOCUS = "resi 68-147 or resi 426-580"   # MBD + glycosylase functional domains

W, H = 900, 675
DPI = 100


def _setup():
    cmd.bg_color("white")
    cmd.set("ray_opaque_background", 1)
    cmd.set("ray_trace_mode", 0)     # fast, still ray-traced (~0.3 s/frame)
    cmd.set("antialias", 1)
    cmd.set("cartoon_fancy_helices", 1)
    cmd.set("cartoon_loop_radius", 0.15)   # thin disordered loops so domains dominate
    cmd.set("cartoon_transparency", 0.0)


def _plddt(obj):
    # AlphaFold convention: low pLDDT -> red, high -> blue (fixed 0-100 scale).
    cmd.spectrum("b", "red_white_blue", obj, minimum=0, maximum=100)


def _save(frame):
    cmd.ray(W, H)
    cmd.png(f"{FRAME_DIR}/f{frame:03d}.png", dpi=DPI)
    return frame + 1


def render():
    _setup()
    cmd.load(WT_PDB, "wt")
    cmd.load(TRUNC_PDB, "trunc")
    cmd.hide("everything")

    # Superpose truncated onto WT over confident shared N-terminal core.
    cmd.align("trunc and resi 60-147 and b > 70", "wt and resi 60-147 and b > 70")

    cmd.show("cartoon", "wt")
    _plddt("wt")
    cmd.orient(f"wt and ({FOCUS})")
    cmd.zoom(f"wt and ({FOCUS})", 6)

    frame = 0

    # Scene 1: WT intact, catalytic domain full opacity, rest dimmed; rotate.
    cmd.set("cartoon_transparency", 0.55, "wt")
    cmd.set("cartoon_transparency", 0.0, f"wt and resi {CATALYTIC_START}-{CATALYTIC_END}")
    n1 = 24
    for _ in range(n1):
        cmd.turn("y", 360.0 / n1)
        frame = _save(frame)

    # Scene 2: dissolve the catalytic domain to show physical loss.
    n2 = 14
    for i in range(n2):
        t = (i + 1) / n2
        cmd.set("cartoon_transparency", 0.55 + 0.45 * t,
                f"wt and resi {CATALYTIC_START}-{CATALYTIC_END}")
        frame = _save(frame)

    cmd.hide("cartoon", f"wt and resi {CATALYTIC_START}-{CATALYTIC_END}")
    cmd.show("cartoon", "trunc")
    _plddt("trunc")
    cmd.set("cartoon_transparency", 0.0, "trunc")
    cmd.set("cartoon_transparency", 0.6, "wt")

    # Scene 3: truncated product rotates; catalytic region visibly absent.
    n3 = 24
    for _ in range(n3):
        cmd.turn("y", 360.0 / n3)
        frame = _save(frame)

    print(f"RENDERED {frame} frames to {FRAME_DIR}")


render()
