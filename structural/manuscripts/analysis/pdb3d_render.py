#!/usr/bin/env python3
"""
pdb3d_render.py — structure-forward 3D frame generator for REAL EXPERIMENTAL PDB structures.

User feedback: heavy 2D narration is "slop"; show direct biology in 3D. AF2/Boltz are GPU-gated,
so this renders ground-truth deposited crystal/cryo-EM structures (from RCSB) in PyMOL. The
structure carries the story: drug in its pocket / mutation at its site / protein gripping DNA,
labeled directly on the molecule, orbiting. Minimal chrome (short title + experimental-evidence
tag), added by the light compositor pdb3d_compose.py.

Three modes:
  drug_in_pocket(pdb_path, gene, drug_resn, ...) : cartoon + pocket surface + drug as sticks,
      orbit; drug and gene labeled on-structure. Optional mutation residue also shown.
  mutation_at_site(pdb_path, gene, resid, ...)   : cartoon + mutated residue as sticks in
      context, orbit; residue labeled.
  protein_dna(pdb_path, gene, contact_resids, ...) : protein cartoon + DNA (distinct rep) +
      contact residues as sticks, orbit; DNA and contacts labeled.

Rendering: ray_trace_mode=0 (~0.3 s/frame), white opaque bg, antialias, thin loops. Coloring is
EXPERIMENTAL-appropriate (by chain / by domain / by element for ligands) -- NOT pLDDT (these are
real B-factors, not model confidence). Illustrative render of a deposited structure. RUO.

Headless: micromamba run -p /workspace/.conda/pymol pymol -cq <wrapper>.py
(normally driven by per-scenario wrappers that import build_*)
"""
from pymol import cmd
import os, json

W, H, DPI = 1100, 825, 100
CB_ORANGE = "orange"; CB_YELLOW = "yellow"; CB_CYAN = "cyan"; CB_PINK = "hotpink"


def _setup():
    cmd.reinitialize()                    # CRITICAL: wipe all objects + per-object settings so
                                          # state does NOT leak between structures in a batch run
                                          # (leaked cartoon_transparency/orient broke the DNA render)
    cmd.bg_color("white")
    cmd.set("ray_opaque_background", 1)
    cmd.set("ray_trace_mode", 0)          # MANDATORY (mode=1 ~78s/frame)
    cmd.set("antialias", 1)
    cmd.set("cartoon_fancy_helices", 1)
    cmd.set("cartoon_loop_radius", 0.15)
    cmd.set("cartoon_transparency", 0.0)
    cmd.set("surface_quality", 1)
    cmd.set("transparency", 0.5)          # pocket surface transparency
    cmd.set("label_size", 18)
    cmd.set("label_color", "black")
    cmd.set("label_outline_color", "white")
    cmd.set("ray_trace_fog", 0)
    cmd.set("depth_cue", 0)


def _save(frame_dir, frame, scene, manifest):
    cmd.ray(W, H)
    cmd.png(f"{frame_dir}/f{frame:03d}.png", dpi=DPI)
    manifest.append({"frame": frame, "scene": scene})
    return frame + 1


def _clean_frames(frame_dir):
    os.makedirs(frame_dir, exist_ok=True)
    for f in os.listdir(frame_dir):
        if f.endswith(".png"):
            os.remove(os.path.join(frame_dir, f))


def build_drug_in_pocket(pdb_path, gene, drug_resn, drug_label, frame_dir,
                         mut_resid=None, mut_label=None, chain=None,
                         n_intro=28, n_zoom=16, n_orbit=40, n_hold=14):
    """Protein cartoon (grey), pocket surface, drug as element-colored sticks; single stable orbit.
    chain restricts to ONE copy so a multi-copy AU (e.g. 7KK4 has 2 PARP1+2 olaparib) shows one
    protein filling the frame with one clearly-visible drug (media check flagged tiny/occluded drug)."""
    _clean_frames(frame_dir)
    manifest = []; frame = 0
    _setup()
    cmd.load(pdb_path, "src")
    # isolate a single chain's protein + its bound drug into a clean object
    if chain:
        cmd.create("m", f"src and chain {chain} and (polymer or resn {drug_resn})")
    else:
        cmd.create("m", "src")
    cmd.delete("src")
    cmd.hide("everything")
    cmd.show("cartoon", "m and polymer")
    cmd.color("grey80", "m and polymer")
    # semi-transparent cartoon so a drug buried in the pocket stays visible from every orbit angle
    cmd.set("cartoon_transparency", 0.55, "m and polymer")
    # drug -- fat sticks, drawn last, element-colored (carbons yellow), NOT hidden by surface
    cmd.select("drug", f"m and resn {drug_resn}")
    cmd.show("sticks", "drug")
    cmd.util.cbay("drug")
    cmd.set("stick_radius", 0.30, "drug")
    # NOTE: transparent pocket SURFACE removed on purpose -- it produced high-entropy dithered
    # frames that blew GIF size to 20-25 MB with little interpretive value. The semi-transparent
    # cartoon already conveys the pocket/fold and keeps the drug prominent. Show the closest few
    # contact side chains as thin sticks for pocket context instead (cheap, compresses well).
    cmd.select("pocket", "byres (m and polymer within 4.0 of drug)")
    cmd.select("pocket_sc", "pocket and sidechain")
    cmd.show("sticks", "pocket_sc")
    cmd.color("palecyan", "pocket_sc and elem C")
    cmd.set("stick_radius", 0.10, "pocket_sc")
    # optional mutation residue (thick, unmistakable)
    if mut_resid is not None:
        cmd.select("mut", f"m and resi {mut_resid}")
        cmd.show("sticks", "mut and not (name C+N+O)")
        cmd.color("hotpink", "mut and elem C")
        cmd.set("stick_radius", 0.30, "mut")
        cmd.show("spheres", "mut and name CA")
        cmd.set("sphere_scale", 0.30, "mut and name CA")
        cmd.color("red", "mut and name CA")

    # NOTE: NO cmd.label on 3D atoms -- labels collide/clip in orbit. All text is added by the
    # matplotlib compositor (pdb3d_compose.py) at fixed positions with leader lines (A1 recipe).
    # SINGLE stable camera: orient + wide zoom on the WHOLE molecule, never re-zoom tighter during
    # the orbit (re-zooming to the pocket caused corner-clipping as the molecule rotates).
    # POCKET-CENTERED stable camera: orient on the drug + its shell, zoom on the drug with a
    # moderate buffer so the drug is prominent. Single compact chain -> pocket zoom won't clip the
    # frame edges across the orbit (the earlier clipping was from a whole multi-copy assembly).
    cmd.orient("drug expand 12")
    cmd.zoom("drug", 9)

    total = n_intro + n_zoom + n_orbit + n_hold
    for i in range(total):
        scene = "intro" if i < n_intro else ("orbit" if i < n_intro + n_zoom + n_orbit else "hold")
        cmd.turn("y", 360.0 / total); frame = _save(frame_dir, frame, scene, manifest)

    json.dump(manifest, open(f"{frame_dir}/manifest.json", "w"))
    print(f"[drug_in_pocket] {gene}+{drug_label}: {frame} frames -> {frame_dir}")
    return manifest


def build_mutation_at_site(pdb_path, gene, resid, mut_label, frame_dir,
                           domain_sel=None, n_intro=28, n_zoom=16, n_orbit=40, n_hold=14):
    """Protein cartoon (domain-colored), mutated residue as sticks; orbit + label."""
    _clean_frames(frame_dir)
    manifest = []; frame = 0
    _setup()
    cmd.load(pdb_path, "m")
    cmd.hide("everything")
    cmd.show("cartoon", "m and polymer")
    cmd.color("grey80", "m and polymer")
    # semi-transparent cartoon so the mutation site (which may be partly buried) stays visible
    cmd.set("cartoon_transparency", 0.35, "m and polymer")
    # neighborhood side chains for local structural context around the hotspot
    cmd.select("nbhd", f"byres (m and polymer within 6 of (m and resi {resid})) and sidechain")
    cmd.show("sticks", "nbhd")
    cmd.color("palecyan", "nbhd and elem C")
    cmd.set("stick_radius", 0.09, "nbhd")
    # highlight the mutated residue -- thick sticks + a prominent sphere so it is unmistakable
    cmd.select("mut", f"m and resi {resid}")
    cmd.show("sticks", "mut and not (name C+N+O)")
    cmd.color("hotpink", "mut and elem C")
    cmd.set("stick_radius", 0.38, "mut")
    cmd.show("spheres", "mut and name CA")
    cmd.set("sphere_scale", 0.60, "mut and name CA")
    cmd.color("red", "mut and name CA")

    # RESIDUE-CENTERED stable camera: zoom on the hotspot + its local environment so the mutation
    # fills the frame (whole-protein zoom made the residue a speck on large multi-domain proteins).
    cmd.orient(f"(m and resi {resid}) expand 16")
    cmd.zoom(f"(m and resi {resid}) expand 11", 3)
    total = n_intro + n_zoom + n_orbit + n_hold
    for i in range(total):
        scene = "intro" if i < n_intro else ("orbit" if i < n_intro + n_zoom + n_orbit else "hold")
        cmd.turn("y", 360.0 / total); frame = _save(frame_dir, frame, scene, manifest)

    json.dump(manifest, open(f"{frame_dir}/manifest.json", "w"))
    print(f"[mutation_at_site] {gene} {mut_label}: {frame} frames -> {frame_dir}")
    return manifest


def build_protein_dna(pdb_path, gene, contact_resids, frame_dir, protein_chain=None,
                      n_intro=28, n_zoom=16, n_orbit=40, n_hold=14):
    """One protein monomer cartoon + DNA (orange cartoon + filled base rings + backbone sticks),
    DNA-contact residues as sticks; single stable orbit. protein_chain restricts to one copy so a
    multi-copy asymmetric unit (e.g. 1TSR has 3 p53 + DNA duplex) shows a clean 'gripping DNA' view."""
    _clean_frames(frame_dir)
    manifest = []; frame = 0
    _setup()
    cmd.load(pdb_path, "m")
    cmd.hide("everything")
    # restrict protein to one monomer if requested (declutter multi-copy AU)
    if protein_chain:
        prot_sel = f"m and polymer.protein and chain {protein_chain}"
    else:
        prot_sel = "m and polymer.protein"
    cmd.create("prot", prot_sel)
    cmd.create("dna", "m and polymer.nucleic")
    cmd.delete("m")
    # protein
    cmd.show("cartoon", "prot")
    cmd.color("skyblue", "prot")
    # DNA: cartoon + filled rings + backbone sticks + orange carbons (robust display)
    cmd.show("cartoon", "dna")
    cmd.set("cartoon_ring_mode", 3, "dna")
    cmd.set("cartoon_ring_finder", 1)
    cmd.set("cartoon_nucleic_acid_mode", 4, "dna")
    cmd.show("sticks", "dna")
    cmd.set("stick_radius", 0.14, "dna")
    cmd.color("orange", "dna")
    cmd.util.cnc("dna")                       # keep N/O/P colored, carbons orange
    cmd.color("orange", "dna and elem C")
    # contact residues on the protein copy
    sel = " or ".join([f"resi {r}" for r in contact_resids])
    cmd.select("contacts", f"prot and ({sel})")
    cmd.show("sticks", "contacts and not (name C+N+O)")
    cmd.color("hotpink", "contacts and elem C")
    cmd.set("stick_radius", 0.28, "contacts")

    # SINGLE stable camera: orient on protein+DNA together, wide zoom, no re-zoom.
    cmd.orient("prot or dna")
    cmd.zoom("prot or dna", 6)
    total = n_intro + n_zoom + n_orbit + n_hold
    for i in range(total):
        scene = "intro" if i < n_intro else ("orbit" if i < n_intro + n_zoom + n_orbit else "hold")
        cmd.turn("y", 360.0 / total); frame = _save(frame_dir, frame, scene, manifest)

    json.dump(manifest, open(f"{frame_dir}/manifest.json", "w"))
    print(f"[protein_dna] {gene}: {frame} frames -> {frame_dir}")
    return manifest
