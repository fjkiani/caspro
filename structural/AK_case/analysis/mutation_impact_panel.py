#!/usr/bin/env python3
"""
mutation_impact_panel.py — WT vs mutant structural comparison for AK-case folds.

For a point-mutation pair (e.g. TP53 WT vs R175H) of EQUAL length:
  * parse both best-ranked PDBs (Bio.PDB)
  * superpose on shared CA atoms (Kabsch via Bio.PDB.Superimposer)
  * global CA-RMSD, per-residue CA displacement after superposition
  * per-residue pLDDT (from B-factor) for WT and mutant + delta
  * render a 2-panel figure: (top) per-residue CA displacement with the mutated
    site marked; (bottom) per-residue pLDDT WT vs mutant.

For a truncation pair (e.g. MBD4 WT 580 vs trunc 489):
  * align on the shared N-terminal residues only (1..divergence)
  * report retained vs lost region (catalytic-domain loss)

Modeling confidence only (pLDDT/pTM). RUO. Not experimental/functional/clinical.
"""
from __future__ import annotations
import numpy as np
import matplotlib
matplotlib.use("Agg")
matplotlib.rcParams["font.family"] = ["Liberation Sans", "Arimo", "DejaVu Sans"]
matplotlib.rcParams["svg.fonttype"] = "none"
import matplotlib.pyplot as plt
from Bio.PDB import PDBParser, Superimposer

CB_BLUE, CB_ORANGE, CB_GREEN, CB_RED = "#0279EE", "#FF9400", "#75A025", "#d62728"


def _ca_atoms(pdb_path):
    """Return ordered dict-like lists: resids, CA atoms, per-residue pLDDT (B-factor)."""
    s = PDBParser(QUIET=True).get_structure("x", pdb_path)
    model = next(s.get_models())
    resids, cas, plddt = [], [], []
    for chain in model:
        for res in chain:
            if "CA" in res:
                resids.append(res.id[1])
                cas.append(res["CA"])
                plddt.append(res["CA"].get_bfactor())
    return resids, cas, np.array(plddt)


def compare_point_mutation(wt_pdb, mut_pdb, mut_resid, gene, variant, out_png):
    wt_ids, wt_ca, wt_pl = _ca_atoms(wt_pdb)
    mt_ids, mt_ca, mt_pl = _ca_atoms(mut_pdb)
    if wt_ids != mt_ids:
        # keep only shared residue numbers, ordered
        shared = sorted(set(wt_ids) & set(mt_ids))
        wmap = {r: (a, p) for r, a, p in zip(wt_ids, wt_ca, wt_pl)}
        mmap = {r: (a, p) for r, a, p in zip(mt_ids, mt_ca, mt_pl)}
        wt_ca = [wmap[r][0] for r in shared]; wt_pl = np.array([wmap[r][1] for r in shared])
        mt_ca = [mmap[r][0] for r in shared]; mt_pl = np.array([mmap[r][1] for r in shared])
        ids = shared
    else:
        ids = wt_ids

    # Superpose mutant onto WT on all shared CA
    sup = Superimposer()
    sup.set_atoms(wt_ca, mt_ca)          # (fixed, moving)
    sup.apply(mt_ca)                      # transforms mutant CA in place
    global_rmsd = float(sup.rms)

    wt_xyz = np.array([a.get_coord() for a in wt_ca])
    mt_xyz = np.array([a.get_coord() for a in mt_ca])
    disp = np.linalg.norm(wt_xyz - mt_xyz, axis=1)   # per-residue CA displacement (A)
    dplddt = mt_pl - wt_pl

    ids = np.array(ids)
    # --- figure ---
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(11, 6.5), sharex=True)
    ax1.plot(ids, disp, color=CB_BLUE, lw=1.1)
    ax1.axvline(mut_resid, color=CB_RED, ls="--", lw=1.4, label=f"{variant} site (res {mut_resid})")
    ax1.axhline(global_rmsd, color="grey", ls=":", lw=1.0, label=f"global CA-RMSD = {global_rmsd:.2f} A")
    ax1.set_ylabel("CA displacement (A)\nWT vs mutant, superposed")
    ax1.set_title(f"{gene} {variant} - structural mutation-impact panel (AF2 monomer_ptm, RUO)")
    ax1.set_ylim(0, max(float(disp.max()) * 1.15, 0.1))  # headroom so spikes don't clip
    ax1.legend(fontsize=8, loc="upper right"); ax1.grid(alpha=0.25)

    # WT: thicker, semi-transparent underneath; mutant: thin solid on top so both
    # remain visible even where they overlap (near-identical over most residues).
    ax2.plot(ids, wt_pl, color=CB_GREEN, lw=3.0, alpha=0.45, label="WT pLDDT", solid_capstyle="round")
    ax2.plot(ids, mt_pl, color=CB_ORANGE, lw=1.1, label="mutant pLDDT")
    ax2.axvline(mut_resid, color=CB_RED, ls="--", lw=1.4)
    ax2.axhline(70, color="grey", ls=":", lw=0.8)
    ax2.set_ylabel("per-residue pLDDT"); ax2.set_xlabel("residue number")
    ax2.legend(fontsize=8, loc="lower right"); ax2.grid(alpha=0.25); ax2.set_ylim(0, 100)
    fig.tight_layout()
    fig.savefig(out_png, dpi=150)
    fig.savefig(out_png.replace(".png", ".svg"))
    plt.close(fig)

    # local window around the mutation (+/-10 residues)
    win = (ids >= mut_resid - 10) & (ids <= mut_resid + 10)
    return {
        "gene": gene, "variant": variant, "mode": "point_mutation",
        "n_shared_residues": int(len(ids)),
        "global_ca_rmsd": round(global_rmsd, 3),
        "max_ca_displacement": round(float(disp.max()), 3),
        "max_disp_residue": int(ids[int(disp.argmax())]),
        "mean_ca_displacement": round(float(disp.mean()), 3),
        "local_mean_ca_disp_pm10": round(float(disp[win].mean()), 3),
        "mut_site_ca_disp": round(float(disp[ids == mut_resid][0]), 3) if (ids == mut_resid).any() else None,
        "wt_mean_plddt": round(float(wt_pl.mean()), 2),
        "mut_mean_plddt": round(float(mt_pl.mean()), 2),
        "mean_delta_plddt": round(float(dplddt.mean()), 3),
        "figure": out_png,
        "caveat": "Modeling confidence only (pLDDT/pTM); NOT experimental/functional/clinical validation. RUO.",
    }


def compare_truncation(wt_pdb, trunc_pdb, diverge_after, gene, variant,
                       lost_domain, out_png):
    """Truncation comparison (e.g. MBD4 WT 580 vs K431Nfs*54 489).

    Superpose on the shared, sequence-identical N-terminal residues (1..diverge_after),
    report CA-RMSD over that retained region, and visualize which region is LOST.
    The frameshifted tail (>diverge_after in the mutant) is a different sequence, so
    it is NOT superposed or RMSD'd against WT — it is shown as 'novel fs tail'.
    """
    wt_ids, wt_ca, wt_pl = _ca_atoms(wt_pdb)
    tr_ids, tr_ca, tr_pl = _ca_atoms(trunc_pdb)
    wmap = {r: (a, p) for r, a, p in zip(wt_ids, wt_ca, wt_pl)}
    tmap = {r: (a, p) for r, a, p in zip(tr_ids, tr_ca, tr_pl)}

    # Superpose on WELL-FOLDED shared N-terminal residues only. Intrinsically
    # disordered residues (low pLDDT) are placed in arbitrary conformations by two
    # independent folds and do NOT superpose - including them inflates RMSD into
    # meaninglessness (e.g. ~40 A). The structured shared domain is the rigid body
    # whose conservation we actually want to measure.
    PLDDT_MIN = 70.0
    shared_all = [r for r in range(1, diverge_after + 1) if r in wmap and r in tmap]
    shared = [r for r in shared_all
              if wmap[r][1] >= PLDDT_MIN and tmap[r][1] >= PLDDT_MIN]
    if len(shared) < 5:  # fallback: not enough confident residues, use all shared
        shared = shared_all
        superpose_basis = "all shared N-terminal residues (few high-confidence residues)"
    else:
        superpose_basis = f"shared N-terminal residues with pLDDT>={PLDDT_MIN:.0f} in both"
    wt_sh = [wmap[r][0] for r in shared]
    tr_sh = [tmap[r][0] for r in shared]
    sup = Superimposer(); sup.set_atoms(wt_sh, tr_sh); sup.apply(tr_sh)
    retained_rmsd = float(sup.rms)

    wt_last = max(wt_ids); tr_last = max(tr_ids)
    lost_lo, lost_hi = lost_domain
    wt_ids_a, wt_pl_a = np.array(wt_ids), np.array(wt_pl)
    lost_mask = (wt_ids_a >= lost_lo) & (wt_ids_a <= lost_hi)

    # --- figure: WT vs truncated pLDDT tracks with lost region shaded ---
    # Colorblind-safe: WT = blue, truncated = orange; lost-domain shaded grey+hatch.
    fig, ax = plt.subplots(figsize=(12, 4.8))
    ax.axvspan(lost_lo, min(lost_hi, wt_last), color="0.6", alpha=0.18, hatch="///",
               edgecolor="0.4", lw=0.0, label=f"lost catalytic domain ({lost_lo}-{lost_hi})")
    ax.plot(wt_ids, wt_pl, color=CB_BLUE, lw=2.6, alpha=0.55,
            label=f"WT pLDDT (1-{wt_last})", solid_capstyle="round")
    ax.plot(tr_ids, tr_pl, color=CB_ORANGE, lw=1.2,
            label=f"truncated pLDDT (1-{tr_last})")
    ax.axvline(diverge_after, color="k", ls="--", lw=1.3,
               label=f"frameshift after res {diverge_after}")
    ax.axvline(tr_last, color=CB_RED, ls="--", lw=1.3,
               label=f"truncation stop (res {tr_last})")
    ax.axhline(70, color="grey", ls=":", lw=0.8)
    ax.set_xlabel("residue number"); ax.set_ylabel("per-residue pLDDT")
    ax.set_ylim(0, 100); ax.set_xlim(0, wt_last + 5)
    ax.set_title(f"{gene} {variant} - truncation impact panel\n"
                 f"(retained folded N-term CA-RMSD {retained_rmsd:.2f} A over {len(shared)} res; "
                 f"AF2 monomer_ptm, RUO)")
    # legend OUTSIDE the plot (right side) so it never covers the WT catalytic-domain curve
    ax.legend(fontsize=8, loc="center left", bbox_to_anchor=(1.01, 0.5), frameon=True)
    ax.grid(alpha=0.25)
    fig.tight_layout(); fig.savefig(out_png, dpi=150, bbox_inches="tight")
    fig.savefig(out_png.replace(".png", ".svg"), bbox_inches="tight"); plt.close(fig)

    return {
        "gene": gene, "variant": variant, "mode": "truncation",
        "wt_length": int(wt_last), "trunc_length": int(tr_last),
        "diverge_after_residue": diverge_after,
        "n_shared_nterm_residues_total": int(len(shared_all)),
        "n_residues_used_for_superposition": int(len(shared)),
        "superposition_basis": superpose_basis,
        "retained_region_ca_rmsd": round(retained_rmsd, 3),
        "retained_rmsd_note": ("RMSD computed over well-folded shared residues only; disordered "
                               "linker excluded because independent folds place it arbitrarily "
                               "(including it inflates RMSD to ~40 A, a superposition artifact)."),
        "lost_domain": {"name": "HhH-GPD DNA-glycosylase (catalytic)",
                        "range": [lost_lo, lost_hi],
                        "wt_mean_plddt_in_domain": round(float(wt_pl_a[lost_mask].mean()), 1),
                        "residues_lost": int(max(0, lost_hi - max(lost_lo, tr_last)))},
        "wt_mean_plddt": round(float(np.mean(wt_pl)), 2),
        "trunc_mean_plddt": round(float(np.mean(tr_pl)), 2),
        "figure": out_png,
        "interpretation": (f"{variant} truncates MBD4 after residue {diverge_after}; the product stops at "
                           f"{tr_last} aa. The WT HhH-GPD DNA-glycosylase catalytic domain ({lost_lo}-{lost_hi}), "
                           f"which folds at high confidence in WT, is physically ABSENT in the truncated product "
                           f"-> structural basis for BER loss."),
        "caveat": "Modeling confidence only (pLDDT/pTM); NOT experimental/functional/clinical validation. RUO.",
    }


if __name__ == "__main__":
    # SELF-TEST: compare TP53_WT to itself -> RMSD ~0, displacement ~0 everywhere.
    wt = "/workspace/caspro/structural/AK_case/structures/TP53_WT_ranked_0.pdb"
    r = compare_point_mutation(wt, wt, 175, "TP53", "self-test", "/tmp/selftest_panel.png")
    print("SELF-TEST (WT vs WT):")
    for k, v in r.items():
        print(f"  {k}: {v}")
    assert r["global_ca_rmsd"] < 1e-6, "self-superposition RMSD must be ~0"
    assert r["max_ca_displacement"] < 1e-6, "self displacement must be ~0"
    print("\nSELF-TEST PASSED: parsing + superposition + displacement logic correct.")
