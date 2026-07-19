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
from pymol.cgo import CYLINDER, CONE
import os, json

W, H, DPI = 1100, 825, 100
CB_ORANGE = "orange"; CB_YELLOW = "yellow"; CB_CYAN = "cyan"; CB_PINK = "hotpink"


def _sel_centroid(sel):
    """Cα centroid (numpy 3-vector) of a selection, or None if empty."""
    import numpy as np
    try:
        atoms = cmd.get_model(f"({sel}) and name CA").atom
    except Exception:
        atoms = []
    if not atoms:
        try:
            atoms = cmd.get_model(sel).atom
        except Exception:
            atoms = []
    if not atoms:
        return None
    return np.mean(np.array([a.coord for a in atoms]), axis=0)


def _make_arrow_cgo(A, B, radius=0.55, rgb=(0.84, 0.15, 0.16), head_frac=0.30, head_scale=2.2):
    """Build a 3D CGO arrow (cylinder shaft + cone head) from world point A to B.
    Lives in the scene frame -> orbits correctly, no 2D projection needed."""
    import numpy as np
    A = np.asarray(A, float); B = np.asarray(B, float)
    d = B - A; L = float(np.linalg.norm(d))
    if L < 1e-3:
        return None
    shaft_end = A + (d / L) * (L * (1.0 - head_frac))
    r = list(rgb)
    return [
        CYLINDER, *A.tolist(), *shaft_end.tolist(), radius, *r, *r,
        CONE, *shaft_end.tolist(), *B.tolist(), radius * head_scale, 0.0, *r, *r, 1.0, 1.0,
    ]


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
    cmd.set("auto_zoom", 0)                # CRITICAL: loading a new object (e.g. CGO motion arrow)
                                          # must NOT reset the locked camera mid-morph


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


def build_guided_reveal(pdb_path, gene, frame_dir, drug_resn=None, drug_label=None,
                        mut_resid=None, mut_label=None, contact_resids=None, chain=None,
                        n_establish=14, n_dolly=14, n_engage=14, n_hold=20, focus_sel=None):
    """MECHANISM-GUIDED reveal for targets with NO honest apo->holo conformational change (motion
    below the morph threshold, e.g. EGFR 0.40 A / BACE1 1.58 A) -- a narrative arc instead of a
    uniform spin:
      1. ESTABLISH  : whole fold, slow rotation (context)  [drug hidden]
      2. DOLLY-IN   : camera pulls from the fold into the pocket over several frames
      3. ENGAGE     : drug FADES IN in the pocket; mutation/contact residues emphasized
      4. HOLD       : slow contemplative orbit on the engaged pocket
    Single real experimental structure (banner stays single-PDB). Tells the drug/mutation story
    without implying a conformational transition that the data does not support.
    """
    _clean_frames(frame_dir)
    manifest = []; frame = 0
    _setup()
    cmd.load(pdb_path, "src")
    keep = "polymer"
    if drug_resn: keep += f" or resn {drug_resn}"
    if chain:
        cmd.create("m", f"src and chain {chain} and ({keep})")
    else:
        cmd.create("m", f"src and ({keep})")
    cmd.delete("src")
    cmd.hide("everything")
    cmd.show("cartoon", "m and polymer")
    cmd.color("grey80", "m and polymer")
    cmd.set("cartoon_transparency", 0.45, "m and polymer")

    # drug object (fades in later)
    have_drug = bool(drug_resn) and cmd.count_atoms(f"m and resn {drug_resn}") > 0
    if have_drug:
        cmd.select("drug", f"m and resn {drug_resn}")
        cmd.show("sticks", "drug")
        # explicit deterministic GOLD drug coloring (matches the morph renders; util.cbay tinted scene)
        cmd.color("gold", "drug")
        cmd.color("gold", "drug and elem C")
        cmd.color("blue", "drug and elem N")
        cmd.color("red", "drug and elem O")
        cmd.color("yellow", "drug and elem S")
        cmd.set("stick_radius", 0.33, "drug")
        # pocket context side chains
        cmd.select("pocket_sc", "byres (m and polymer within 4.0 of drug) and sidechain")
        cmd.show("sticks", "pocket_sc")
        cmd.color("palecyan", "pocket_sc and elem C")
        cmd.set("stick_radius", 0.10, "pocket_sc")
        focus = "drug"
    elif mut_resid is not None:
        focus = f"m and resi {mut_resid}"
    elif contact_resids:
        focus = "m and (" + " or ".join(f"resi {r}" for r in contact_resids) + ")"
    else:
        focus = "m"

    # explicit focus override (e.g. frame BOTH the ATP-pocket drug AND a distant mutation)
    if focus_sel is not None:
        focus = f"m and ({focus_sel})"

    # mutation residue (emphasis grows during ENGAGE)
    if mut_resid is not None:
        cmd.select("mut", f"m and resi {mut_resid}")
        cmd.show("sticks", "mut and not (name C+N+O)")
        cmd.color("hotpink", "mut and elem C")
        cmd.set("stick_radius", 0.36, "mut")
        cmd.show("spheres", "mut and name CA")
        cmd.set("sphere_scale", 0.50, "mut and name CA")
        cmd.color("red", "mut and name CA")
    # contact residues (protein-DNA style), if given
    if contact_resids:
        sel = " or ".join(f"resi {r}" for r in contact_resids)
        cmd.select("contacts", f"m and polymer and ({sel})")
        cmd.show("sticks", "contacts and not (name C+N+O)")
        cmd.color("hotpink", "contacts and elem C")
        cmd.set("stick_radius", 0.30, "contacts")

    total = n_establish + n_dolly + n_engage + n_hold
    turn = 300.0 / total  # gentle, not a full fast spin

    # 1) ESTABLISH: whole fold, drug hidden
    cmd.orient("m and polymer")
    cmd.zoom("m and polymer", 3)
    if have_drug:
        cmd.set("stick_transparency", 1.0, "drug")
    for i in range(n_establish):
        cmd.turn("y", turn); frame = _save(frame_dir, frame, "establish", manifest)

    # 2) DOLLY-IN: interpolate camera view from whole fold -> pocket over n_dolly steps
    view_wide = cmd.get_view()
    cmd.orient(f"({focus}) expand 10")
    cmd.zoom(f"({focus}) expand 8", 3)
    view_close = cmd.get_view()
    for i in range(n_dolly):
        t = (i + 1) / n_dolly
        te = _smoothstep(t)
        v = tuple((1 - te) * a + te * b for a, b in zip(view_wide, view_close))
        cmd.set_view(v)
        cmd.turn("y", turn); frame = _save(frame_dir, frame, "dolly", manifest)

    # 3) ENGAGE: drug fades in
    for i in range(n_engage):
        if have_drug:
            tr = 1.0 - (i + 1) / n_engage
            cmd.set("stick_transparency", max(0.0, tr), "drug")
        cmd.turn("y", turn); frame = _save(frame_dir, frame, "engage", manifest)

    # 4) HOLD: slow contemplative orbit on the engaged pocket
    if have_drug:
        cmd.set("stick_transparency", 0.0, "drug")
    for i in range(n_hold):
        cmd.turn("y", turn); frame = _save(frame_dir, frame, "hold", manifest)

    json.dump(manifest, open(f"{frame_dir}/manifest.json", "w"))
    print(f"[guided_reveal] {gene}: {frame} frames (establish->dolly->engage->hold) -> {frame_dir}")
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


def _smoothstep(t):
    """Eased 0->1 interpolation parameter (smoothstep): slow-fast-slow, no MD, pure geometry."""
    return t * t * (3.0 - 2.0 * t)


def _matched_atom_index(obj_a, obj_b):
    """Return two equal-length numpy index arrays into obj_a / obj_b atom order for atoms that
    share (resi, name). Robust to different residue ranges and WT-vs-mutant identity (we match on
    residue NUMBER + atom NAME, not resn, so a mutated side chain still matches its backbone +
    common atoms). Used to interpolate coordinates between two aligned experimental states."""
    import numpy as np
    a_atoms = cmd.get_model(obj_a).atom
    b_atoms = cmd.get_model(obj_b).atom
    b_lookup = {}
    for j, at in enumerate(b_atoms):
        b_lookup[(at.chain, at.resi, at.name)] = j
    ia, ib = [], []
    for i, at in enumerate(a_atoms):
        key = (at.chain, at.resi, at.name)
        j = b_lookup.get(key)
        if j is not None:
            ia.append(i); ib.append(j)
    return np.array(ia, dtype=int), np.array(ib, dtype=int)


def build_morph(apo_pdb, holo_pdb, gene, moving_sel, frame_dir,
                apo_chain="A", holo_chain="A",
                drug_resn=None, drug_label=None, mut_resid=None, mut_label=None,
                n_intro=10, n_morph=26, n_drug=12, n_hold=12, orbit_deg=32.0,
                zoom_sel=None, zoom_buffer=8,
                mechanism_forward=True, ghost_transp=0.72, bulk_transp=0.55,
                arrow_radius=0.55, arrow_min_rmsd=1.5):
    """TRUE mechanism-of-action morph between two REAL experimental endpoints.

    Open-source substitute for Incentive PyMOL `morph` (which is unavailable here):
      1. Isolate one protein chain from each of apo (inactive) and holo (drug-bound) structures.
      2. Superpose holo onto apo on the shared structural core (cealign; fallback align).
      3. Match atoms by (chain,resi,name) and INTERPOLATE coordinates apo->holo with smoothstep
         easing, pushing each intermediate into a single morph object via load_coords (ray-traced).
      4. The moving element (`moving_sel`, e.g. the activation loop / switch loops / flap) is
         emphasized (color + sticks); the rest is semi-transparent cartoon.
      5. During the final segment the holo drug FADES IN (as sticks) as the pocket closes, and the
         mutation residue is highlighted at the holo endpoint.
    Intermediate frames are computed interpolation between two deposited crystal structures, NOT
    observed states -- labeled as such by the compositor.

    Returns manifest AND writes frame_dir/morph_meta.json with the measured moving-element Cα RMSD
    (the acceptance signal for 'is there real motion here?').
    """
    import numpy as np
    _clean_frames(frame_dir)
    manifest = []; frame = 0
    _setup()
    # ---- load + isolate single chains ----
    cmd.load(apo_pdb, "apo_src")
    cmd.load(holo_pdb, "holo_src")
    # apo: protein only (drug, if any, dropped -- apo is the inactive reference)
    cmd.create("apo", f"apo_src and chain {apo_chain} and polymer.protein")
    # holo: protein + its drug (drug kept for the fade-in)
    if drug_resn:
        cmd.create("holo", f"holo_src and chain {holo_chain} and (polymer.protein or resn {drug_resn})")
    else:
        cmd.create("holo", f"holo_src and chain {holo_chain} and polymer.protein")
    cmd.delete("apo_src"); cmd.delete("holo_src")

    # ---- superpose holo onto apo on the structural core ----
    try:
        r = cmd.cealign("apo and polymer.protein", "holo and polymer.protein")
        core_rmsd = float(r["RMSD"]); core_n = int(r["alignment_length"]); method = "cealign"
    except Exception:
        r = cmd.align("holo and polymer.protein and name CA", "apo and polymer.protein and name CA")
        core_rmsd = float(r[0]); core_n = int(r[1]); method = "align"

    # ---- matched atoms for interpolation (protein only) ----
    # match on FULL get_model order for both objects (indices from _matched_atom_index are into
    # get_model(...).atom order, which corresponds 1:1 with get_coords(...) row order)
    ia, ib = _matched_atom_index("apo", "holo")
    apo_full = cmd.get_coords("apo")
    holo_full = cmd.get_coords("holo")
    start = apo_full[ia]
    end = holo_full[ib]

    # measure moving-element motion (Cα RMSD of the named moving_sel between endpoints)
    try:
        mv_a = cmd.get_model(f"apo and ({moving_sel}) and name CA").atom
        # map moving CA atoms via same key to holo
        b_atoms = cmd.get_model("holo and name CA").atom
        blk = {(at.chain, at.resi, at.name): np.array([at.coord]) for at in b_atoms}
        diffs = []
        for at in mv_a:
            key = (at.chain, at.resi, at.name)
            if key in blk:
                diffs.append(np.linalg.norm(np.array(at.coord) - blk[key][0]))
        moving_rmsd = float(np.sqrt(np.mean(np.square(diffs)))) if diffs else 0.0
        moving_n = len(diffs)
    except Exception:
        moving_rmsd = 0.0; moving_n = 0

    # ---- mechanism-forward GHOST: static apo moving-element left in place as a translucent
    # reference so the solid colored loop is seen to physically depart its START position
    # (before->after spatial anchor). The ghost is the REAL apo crystal geometry, never moved. ----
    if mechanism_forward:
        cmd.create("ghost", f"apo and ({moving_sel})")
        cmd.hide("everything", "ghost")
        cmd.show("cartoon", "ghost")
        cmd.set("cartoon_transparency", ghost_transp, "ghost")
        cmd.color("grey60", "ghost")
        # thin tube so the ghost reads as a faint echo, not a competing solid
        cmd.set("cartoon_loop_radius", 0.10, "ghost")

    # ---- build the morph object from apo geometry ----
    cmd.create("m", "apo")
    # hide the source apo/holo objects (kept only for centroid/RMSD measurement) so their DEFAULT
    # element coloring (cyan / green carbons) does NOT bleed over the grey morph object
    cmd.hide("everything", "apo")
    cmd.hide("everything", "holo")
    cmd.hide("everything", "m")
    cmd.show("cartoon", "m")
    cmd.color("grey80", "m")                                  # lighter bulk so mechanism pops
    cmd.set("cartoon_transparency", bulk_transp if mechanism_forward else 0.25, "m")
    # emphasize the moving element on the morph object -- bold, opaque, saturated.
    # mechanism_forward: rely on a FAT opaque cartoon tube for the loop (clean, legible) and DROP
    # the per-residue side-chain sticks that previously sprayed "orange spaghetti" across the frame
    # and obscured the motion. Legacy mode keeps the thin side-chain sticks.
    cmd.select("move", f"m and ({moving_sel})")
    cmd.color("orange", "move")
    cmd.set("cartoon_transparency", 0.0, "move")
    if mechanism_forward:
        cmd.set("cartoon_loop_radius", 0.35, "move")   # fat, unmistakable moving tube
    else:
        cmd.set("cartoon_loop_radius", 0.15, "move")
        cmd.show("sticks", "move and sidechain")
        cmd.color("orange", "move and sidechain and elem C")
        cmd.set("stick_radius", 0.14, "move and sidechain")
    # mutation residue highlight (persistent, but only meaningful at holo end) -- unmistakable
    if mut_resid is not None:
        cmd.select("mut", f"m and resi {mut_resid}")
        cmd.show("sticks", "mut and not (name C+N+O)")
        cmd.color("red", "mut and elem C")                   # match the sphere: one red hotspot
        cmd.set("stick_radius", 0.40, "mut")
        cmd.show("spheres", "mut and name CA")
        cmd.set("sphere_scale", 0.70 if mechanism_forward else 0.45, "mut and name CA")
        cmd.color("red", "mut and name CA")

    # ---- drug object (from holo, already in the aligned frame), hidden initially ----
    have_drug = False
    if drug_resn and cmd.count_atoms(f"holo and resn {drug_resn}") > 0:
        cmd.create("drugobj", f"holo and resn {drug_resn}")
        cmd.hide("everything", "drugobj")
        cmd.show("sticks", "drugobj")
        # explicit deterministic drug coloring: GOLD carbons + element colors on N/O/S/etc.
        # (util.cbay/element auto-coloring previously tinted the scene; make it unambiguous)
        cmd.color("gold", "drugobj")
        cmd.color("gold", "drugobj and elem C")
        cmd.color("blue", "drugobj and elem N")
        cmd.color("red", "drugobj and elem O")
        cmd.color("yellow", "drugobj and elem S")
        cmd.set("stick_radius", 0.33, "drugobj")
        have_drug = True

    # ---- mechanism-forward MOTION ARROW: 3D CGO from apo moving-element centroid -> holo
    # moving-element centroid (both in the aligned frame). Lives in the scene so it orbits with the
    # structure and always points START -> END. Only drawn when motion is above a threshold so we
    # never fabricate a direction for a non-moving element. Loaded during the morph (not intro). ----
    # The arrow depicts a NET TRANSLATION of the moving element. It is only honest when the
    # centroid actually shifts by a meaningful amount -- a "collapse"/reorganization motion can have
    # high per-atom RMSD but a near-stationary centroid, for which a tiny arrow would misrepresent
    # the mechanism (the ghost overlay already conveys reorganization). Gate on centroid shift.
    arrow_cgo = None; arrow_start = None; arrow_end = None; arrow_shift = None
    if mechanism_forward:
        import numpy as np
        cs = _sel_centroid(f"apo and ({moving_sel})")
        ce = _sel_centroid(f"holo and ({moving_sel})")
        if cs is not None and ce is not None:
            arrow_start, arrow_end = cs, ce
            arrow_shift = float(np.linalg.norm(np.asarray(ce) - np.asarray(cs)))
            if arrow_shift >= arrow_min_rmsd:
                arrow_cgo = _make_arrow_cgo(arrow_start, arrow_end, radius=arrow_radius)

    # ---- single stable camera: frame apo+holo extent so nothing clips across the morph+orbit ----
    # For large proteins, orienting on the whole chain makes the moving element a speck. zoom_sel
    # lets the camera focus on the mechanism region (moving element +/- drug) with a buffer, while
    # still showing local context. Falls back to whole-object framing.
    # include ghost in framing so the moving loop AND its start-position echo both stay on-screen
    ghost_bit = " or ghost" if mechanism_forward else ""
    if zoom_sel:
        focus = f"(m and ({zoom_sel}))"
        if have_drug:
            focus = f"(m and ({zoom_sel})) or drugobj"
        focus = f"({focus}{ghost_bit})"
        cmd.orient(f"({focus}) expand {zoom_buffer}")
        cmd.zoom(f"({focus}) expand {zoom_buffer}", 3)
    else:
        # default: frame the moving element (+ ghost + drug) tightly so the mechanism fills the panel
        base = f"(m and ({moving_sel}))"
        if have_drug:
            base = f"{base} or drugobj"
        base = f"({base}{ghost_bit})"
        cmd.orient(f"({base}) expand {zoom_buffer}")
        cmd.zoom(f"({base}) expand {zoom_buffer}", 3)

    def set_state(tt):
        """place morph object atoms at eased interpolation tt in [0,1]."""
        cur = apo_full.copy()
        te = _smoothstep(tt)
        cur[ia] = (1.0 - te) * start + te * end
        cmd.load_coords(cur, "m")

    # ---- 1) intro hold on apo ----
    set_state(0.0)
    if have_drug: cmd.set("stick_transparency", 1.0, "drugobj")
    for i in range(n_intro):
        cmd.turn("y", orbit_deg / max(1, (n_intro + n_morph + n_drug + n_hold)))
        frame = _save(frame_dir, frame, "intro", manifest)

    # ---- 2) morph apo -> holo (draw the motion arrow as the loop begins to move) ----
    for i in range(n_morph):
        tt = (i + 1) / n_morph
        set_state(tt)
        if arrow_cgo is not None and i == 0:
            cmd.load_cgo(arrow_cgo, "motion_arrow")   # appears exactly when motion starts
        cmd.turn("y", orbit_deg / max(1, (n_intro + n_morph + n_drug + n_hold)))
        frame = _save(frame_dir, frame, "morph", manifest)

    # ---- 3) drug fade-in at holo endpoint (pocket closed) ----
    set_state(1.0)
    for i in range(n_drug):
        if have_drug:
            tr = 1.0 - (i + 1) / n_drug   # transparency 1->0
            cmd.set("stick_transparency", max(0.0, tr), "drugobj")
        cmd.turn("y", orbit_deg / max(1, (n_intro + n_morph + n_drug + n_hold)))
        frame = _save(frame_dir, frame, "drug", manifest)

    # ---- 4) annotated hold on closed/active + drug ----
    if have_drug: cmd.set("stick_transparency", 0.0, "drugobj")
    for i in range(n_hold):
        cmd.turn("y", orbit_deg / max(1, (n_intro + n_morph + n_drug + n_hold)))
        frame = _save(frame_dir, frame, "hold", manifest)

    json.dump(manifest, open(f"{frame_dir}/manifest.json", "w"))
    meta = {"gene": gene, "apo_pdb": os.path.basename(apo_pdb), "holo_pdb": os.path.basename(holo_pdb),
            "core_align_method": method, "core_rmsd": round(core_rmsd, 2), "core_n": core_n,
            "moving_sel": moving_sel, "moving_ca_rmsd": round(moving_rmsd, 2), "moving_n": moving_n,
            "matched_atoms": int(len(ia)), "drug": drug_label, "mut": mut_label, "frames": frame,
            "mechanism_forward": bool(mechanism_forward),
            "ghost_overlay": bool(mechanism_forward),
            "motion_arrow_drawn": bool(arrow_cgo is not None),
            "motion_arrow_centroid_shift_A": round(arrow_shift, 2) if arrow_shift is not None else None,
            "arrow_centroid_shift_threshold_A": arrow_min_rmsd,
            "arrow_suppressed_reason": (None if arrow_cgo is not None else
                ("centroid shift %.2f A < %.2f A threshold (reorganization, not translation)" % (arrow_shift, arrow_min_rmsd)
                 if arrow_shift is not None else "no centroid")) }
    json.dump(meta, open(f"{frame_dir}/morph_meta.json", "w"))
    print(f"[morph] {gene}: {frame} frames | core RMSD {core_rmsd:.2f}A/{core_n} ({method}) | "
          f"moving '{moving_sel}' Cα RMSD {moving_rmsd:.2f}A/{moving_n} | matched {len(ia)} atoms -> {frame_dir}")
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
