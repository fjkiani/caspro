"""
A1 (deep re-narration) — MBD4 catalytic-domain-loss morph, PyMOL frame generator.

This mirrors the ORIGINAL proven recipe (which media-check-passed) exactly in its
rendering/orientation choices, but emits MORE frames per scene and a scene manifest so a
matplotlib overlay pass can attach chaptered narration. Do NOT do per-residue isolation
surgery here (the disordered linker topology makes that clip/sprawl) -- use the same
transparency-based focus the original used.

Two REAL AlphaFold2 states (illustrative morph, NOT molecular dynamics):
  * MBD4 WT (580 aa)          — HhH-GPD glycosylase catalytic domain 426-580 intact
  * MBD4 K431Nfs*54 (489 aa)  — frameshift physically deletes 426-580
pLDDT coloring = AlphaFold convention (red_white_blue, low->red, high->blue, fixed 0-100).

Headless: micromamba run -p /workspace/.conda/pymol pymol -cq a1_mbd4_morph_pymol.py
"""
from pymol import cmd
import os, json

BASE = "/workspace/caspro/structural/AK_case"
WT_PDB = f"{BASE}/structures/MBD4_WT_ranked_0.pdb"
TRUNC_PDB = f"{BASE}/structures/MBD4_K431Nfs_trunc_ranked_0.pdb"
FRAME_DIR = "/workspace/afwork/frames/manuscripts/a1_pymol"
os.makedirs(FRAME_DIR, exist_ok=True)

CAT0, CAT1 = 426, 580
FOCUS = "resi 68-147 or resi 426-580"     # SAME focus as the proven original
W, H = 900, 675
DPI = 100

manifest = []
frame = 0


def _setup():
    cmd.bg_color("white")
    cmd.set("ray_opaque_background", 1)
    cmd.set("ray_trace_mode", 0)
    cmd.set("antialias", 1)
    cmd.set("cartoon_fancy_helices", 1)
    cmd.set("cartoon_loop_radius", 0.15)
    cmd.set("cartoon_transparency", 0.0)


def _plddt(obj):
    cmd.spectrum("b", "red_white_blue", obj, minimum=0, maximum=100)


def _save(scene):
    global frame
    cmd.ray(W, H)
    cmd.png(f"{FRAME_DIR}/f{frame:03d}.png", dpi=DPI)
    manifest.append({"frame": frame, "scene": scene})
    frame += 1


def render():
    _setup()
    cmd.load(WT_PDB, "wt")
    cmd.load(TRUNC_PDB, "trunc")
    cmd.hide("everything")

    # Superpose truncated onto WT over confident shared N-terminal core (pLDDT>70).
    cmd.align("trunc and resi 60-147 and b > 70", "wt and resi 60-147 and b > 70")

    cmd.show("cartoon", "wt")
    _plddt("wt")
    # Orient on the functional-domain focus, but zoom to ENCOMPASS THE WHOLE MOLECULE
    # (disordered linker 150-425 sprawls well outside the focus box; a tight 6A buffer on
    # the focus clips those loops at the frame edge in the smaller composited panel).
    # Zooming on the complete WT object with a generous buffer guarantees clear margins on
    # every side while keeping the functional domains centered via the orient above.
    cmd.orient(f"wt and ({FOCUS})")
    cmd.zoom("wt", 8)

    # ---- SCENE intro: WT intact, catalytic domain full opacity, rest dimmed; rotate ----
    # (identical framing to the proven original Scene 1, just more frames)
    cmd.set("cartoon_transparency", 0.55, "wt")
    cmd.set("cartoon_transparency", 0.0, f"wt and resi {CAT0}-{CAT1}")
    for _ in range(34):
        cmd.turn("y", 360.0 / 34)
        _save("intro")

    # ---- SCENE hold: steady view of the intact catalytic domain (for narration text) ----
    for _ in range(16):
        cmd.turn("y", 360.0 / 60)   # slow drift
        _save("hold")

    # ---- SCENE dissolve: dissolve the catalytic domain to show physical loss ----
    ndis = 22
    for i in range(ndis):
        t = (i + 1) / ndis
        cmd.set("cartoon_transparency", 0.55 + 0.45 * t, f"wt and resi {CAT0}-{CAT1}")
        _save("dissolve")

    # switch to truncated product (same as proven original Scene 3 setup)
    cmd.hide("cartoon", f"wt and resi {CAT0}-{CAT1}")
    cmd.show("cartoon", "trunc")
    _plddt("trunc")
    cmd.set("cartoon_transparency", 0.0, "trunc")
    cmd.set("cartoon_transparency", 0.6, "wt")

    # ---- SCENE truncated: truncated product rotates; catalytic region visibly absent ----
    for _ in range(34):
        cmd.turn("y", 360.0 / 34)
        _save("truncated")

    # ---- SCENE compare: hold on truncated with WT ghost for the "what's missing" beat ----
    for _ in range(18):
        cmd.turn("y", 360.0 / 60)
        _save("compare")

    with open(f"{FRAME_DIR}/manifest.json", "w") as fh:
        json.dump(manifest, fh)
    print(f"RENDERED {frame} frames; scenes={[ (s, sum(1 for m in manifest if m['scene']==s)) for s in ['intro','hold','dissolve','truncated','compare'] ]}")


render()
