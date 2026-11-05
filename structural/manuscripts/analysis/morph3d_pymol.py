#!/usr/bin/env python3
"""
morph3d_pymol.py — GENERALIZED narrated 3D morph frame generator (real AF2/Boltz folds).

Reusable engine for the structural-wave animations (B5 variant panel, A5/B2 drug complexes),
built on the SAME proven recipe that media-check-passed for A1 (MBD4):
  * pLDDT spectrum red_white_blue (AlphaFold convention, low->red high->blue), fixed 0-100
  * ray_trace_mode=0 (~0.3 s/frame), thin loops, white opaque bg, antialias
  * superpose on shared well-folded core (pLDDT>=70) only
  * whole-molecule zoom buffer so disordered loops never clip
  * transparency-based focus (functional region solid, context dimmed) -- NO per-residue
    isolation surgery (that sprawls/clips)

TWO morph modes:
  point_mutation(wt_pdb, mut_pdb, resid, ...) : WT<->mutant. Rotate WT with the mutated
      side chain shown as sticks; cross-fade to the mutant; rotate mutant. The residue-level
      side-chain swap is the honest structural event for a folded-domain point mutation.
  apo_holo(apo_pdb, holo_pdb, ...)           : apo protein -> ligand docks in (Boltz pose).
      Rotate apo; fade the ligand in at its predicted pose; rotate holo with pocket highlighted.

Illustrative morph between predicted states -- NOT molecular dynamics. Modeling confidence
(pLDDT/pTM/ipTM) only. RUO.

Headless: micromamba run -p /workspace/.conda/pymol pymol -cq morph3d_pymol.py -- <mode> <args...>
(but normally driven by the per-scenario wrapper scripts b5_*.py / a5_*.py which import build_* )
"""
from pymol import cmd
import os, json

W, H, DPI = 900, 675, 100


def _setup():
    cmd.bg_color("white")
    cmd.set("ray_opaque_background", 1)
    cmd.set("ray_trace_mode", 0)          # MANDATORY: mode=1 is ~78s/frame
    cmd.set("antialias", 1)
    cmd.set("cartoon_fancy_helices", 1)
    cmd.set("cartoon_loop_radius", 0.15)
    cmd.set("cartoon_transparency", 0.0)


def _plddt(obj):
    # AlphaFold convention: low pLDDT -> red, high -> blue. (blue_white_red is INVERTED.)
    cmd.spectrum("b", "red_white_blue", obj, minimum=0, maximum=100)


def _save(frame_dir, frame, scene, manifest):
    cmd.ray(W, H)
    cmd.png(f"{frame_dir}/f{frame:03d}.png", dpi=DPI)
    manifest.append({"frame": frame, "scene": scene})
    return frame + 1


def build_point_mutation(wt_pdb, mut_pdb, resid, gene, variant, frame_dir,
                         focus_lo=None, focus_hi=None,
                         n_intro=30, n_hold=14, n_morph=20, n_mut=30, n_compare=16):
    """Render a WT<->mutant point-mutation morph. Returns manifest (list of {frame,scene})."""
    os.makedirs(frame_dir, exist_ok=True)
    for f in os.listdir(frame_dir):
        if f.endswith(".png"):
            os.remove(os.path.join(frame_dir, f))
    manifest = []; frame = 0
    _setup()
    cmd.load(wt_pdb, "wt")
    cmd.load(mut_pdb, "mut")
    cmd.hide("everything")

    # Superpose mutant onto WT over confident shared core (pLDDT>70). For equal-length
    # point mutants this is the whole well-folded protein; align gives a faithful overlay.
    try:
        cmd.align("mut and b > 70", "wt and b > 70")
    except Exception:
        cmd.align("mut", "wt")

    # Focus window: default = the whole protein, but if a domain window is given, keep the
    # domain solid and dim the rest (transparency framing, proven on MBD4). Always ZOOM on
    # the whole object so nothing clips.
    cmd.show("cartoon", "wt")
    _plddt("wt")
    if focus_lo is not None:
        cmd.orient(f"wt and resi {focus_lo}-{focus_hi}")
    else:
        cmd.orient("wt")
    cmd.zoom("wt", 8)

    # mutated side chain as sticks (the honest residue-level event)
    cmd.show("sticks", f"wt and resi {resid} and not name N+C+O")
    cmd.color("orange", f"wt and resi {resid} and elem C")
    if focus_lo is not None:
        cmd.set("cartoon_transparency", 0.55, "wt")
        cmd.set("cartoon_transparency", 0.0, f"wt and resi {focus_lo}-{focus_hi}")

    # ---- intro: rotate WT, side chain highlighted ----
    for _ in range(n_intro):
        cmd.turn("y", 360.0 / n_intro); frame = _save(frame_dir, frame, "intro", manifest)
    # ---- hold: steady on the residue ----
    for _ in range(n_hold):
        cmd.turn("y", 360.0 / 60); frame = _save(frame_dir, frame, "hold", manifest)

    # ---- morph: cross-fade WT -> mutant (transparency swap) ----
    cmd.show("cartoon", "mut"); _plddt("mut")
    cmd.show("sticks", f"mut and resi {resid} and not name N+C+O")
    cmd.color("hotpink", f"mut and resi {resid} and elem C")
    cmd.set("cartoon_transparency", 1.0, "mut")
    cmd.set("stick_transparency", 1.0, "mut")
    for i in range(n_morph):
        t = (i + 1) / n_morph
        cmd.set("cartoon_transparency", (0.55 if focus_lo else 0.0) + (1 - (0.55 if focus_lo else 0.0)) * t, "wt")
        cmd.set("cartoon_transparency", 1.0 - t, "mut")
        cmd.set("stick_transparency", 1.0 - t, "mut")
        frame = _save(frame_dir, frame, "morph", manifest)

    cmd.hide("everything", "wt")
    if focus_lo is not None:
        cmd.set("cartoon_transparency", 0.55, "mut")
        cmd.set("cartoon_transparency", 0.0, f"mut and resi {focus_lo}-{focus_hi}")
    else:
        cmd.set("cartoon_transparency", 0.0, "mut")
    # ---- mut: rotate mutant ----
    for _ in range(n_mut):
        cmd.turn("y", 360.0 / n_mut); frame = _save(frame_dir, frame, "mut", manifest)
    # ---- compare: slow hold on mutant residue ----
    for _ in range(n_compare):
        cmd.turn("y", 360.0 / 60); frame = _save(frame_dir, frame, "compare", manifest)

    json.dump(manifest, open(f"{frame_dir}/manifest.json", "w"))
    print(f"[point_mutation] {gene} {variant}: {frame} frames -> {frame_dir}")
    return manifest


def build_apo_holo(holo_pdb, gene, ligand, frame_dir,
                   n_apo=30, n_dock=20, n_holo=34, n_compare=16):
    """Render apo -> ligand-bound morph from a Boltz complex prediction.

    Boltz outputs the COMPLEX (protein + ligand together). We derive 'apo' by hiding the
    ligand, then fade the ligand in at its predicted pose -> holo. Pocket residues (within
    5 A of the ligand) are highlighted on binding.
    """
    os.makedirs(frame_dir, exist_ok=True)
    for f in os.listdir(frame_dir):
        if f.endswith(".png"):
            os.remove(os.path.join(frame_dir, f))
    manifest = []; frame = 0
    _setup()
    cmd.load(holo_pdb, "cplx")
    cmd.hide("everything")
    # protein = polymer; ligand = organic small molecule (not polymer)
    cmd.select("prot", "cplx and polymer")
    cmd.select("lig", "cplx and (organic or hetatm) and not solvent")
    cmd.show("cartoon", "prot"); _plddt("prot")
    cmd.orient("prot"); cmd.zoom("cplx", 8)
    cmd.show("sticks", "lig"); cmd.color("yellow", "lig and elem C")
    cmd.set("stick_transparency", 1.0, "lig")   # start hidden (apo)

    # pocket residues within 5A of ligand
    cmd.select("pocket", "byres (prot within 5 of lig)")

    # ---- apo: rotate protein, no ligand ----
    for _ in range(n_apo):
        cmd.turn("y", 360.0 / n_apo); frame = _save(frame_dir, frame, "apo", manifest)
    # ---- dock: fade ligand in at predicted pose ----
    for i in range(n_dock):
        t = (i + 1) / n_dock
        cmd.set("stick_transparency", 1.0 - t, "lig")
        frame = _save(frame_dir, frame, "dock", manifest)
    # highlight pocket
    cmd.show("sticks", "pocket and not name N+C+O")
    cmd.color("cyan", "pocket and elem C")
    # ---- holo: rotate bound complex, pocket shown ----
    for _ in range(n_holo):
        cmd.turn("y", 360.0 / n_holo); frame = _save(frame_dir, frame, "holo", manifest)
    # ---- compare: slow hold ----
    for _ in range(n_compare):
        cmd.turn("y", 360.0 / 60); frame = _save(frame_dir, frame, "compare", manifest)

    json.dump(manifest, open(f"{frame_dir}/manifest.json", "w"))
    print(f"[apo_holo] {gene} + {ligand}: {frame} frames -> {frame_dir}")
    return manifest


def build_truncation(wt_pdb, trunc_pdb, cat_lo, cat_hi, diverge_after, gene, variant, frame_dir,
                     n_intro=30, n_hold=14, n_dissolve=22, n_trunc=30, n_compare=16):
    """Truncation morph (CCND1 E279*, like MBD4 A1): WT -> dissolve lost region -> product."""
    os.makedirs(frame_dir, exist_ok=True)
    for f in os.listdir(frame_dir):
        if f.endswith(".png"):
            os.remove(os.path.join(frame_dir, f))
    manifest = []; frame = 0
    _setup()
    cmd.load(wt_pdb, "wt"); cmd.load(trunc_pdb, "trunc"); cmd.hide("everything")
    try:
        cmd.align(f"trunc and resi 1-{diverge_after} and b > 70", f"wt and resi 1-{diverge_after} and b > 70")
    except Exception:
        cmd.align("trunc", "wt")
    cmd.show("cartoon", "wt"); _plddt("wt")
    cmd.orient("wt"); cmd.zoom("wt", 8)
    cmd.set("cartoon_transparency", 0.55, "wt")
    cmd.set("cartoon_transparency", 0.0, f"wt and resi {cat_lo}-{cat_hi}")
    for _ in range(n_intro):
        cmd.turn("y", 360.0 / n_intro); frame = _save(frame_dir, frame, "intro", manifest)
    for _ in range(n_hold):
        cmd.turn("y", 360.0 / 60); frame = _save(frame_dir, frame, "hold", manifest)
    for i in range(n_dissolve):
        t = (i + 1) / n_dissolve
        cmd.set("cartoon_transparency", 0.55 + 0.45 * t, f"wt and resi {cat_lo}-{cat_hi}")
        frame = _save(frame_dir, frame, "dissolve", manifest)
    cmd.hide("cartoon", f"wt and resi {cat_lo}-{cat_hi}")
    cmd.show("cartoon", "trunc"); _plddt("trunc")
    cmd.set("cartoon_transparency", 0.0, "trunc"); cmd.set("cartoon_transparency", 0.6, "wt")
    for _ in range(n_trunc):
        cmd.turn("y", 360.0 / n_trunc); frame = _save(frame_dir, frame, "truncated", manifest)
    for _ in range(n_compare):
        cmd.turn("y", 360.0 / 60); frame = _save(frame_dir, frame, "compare", manifest)
    json.dump(manifest, open(f"{frame_dir}/manifest.json", "w"))
    print(f"[truncation] {gene} {variant}: {frame} frames -> {frame_dir}")
    return manifest
