# Experimental PDB provenance — 3D structural animation wave

All structures are **real experimental depositions** downloaded from the RCSB PDB
(https://www.rcsb.org). No AI-generated images or predicted models are used in this
wave. Each animation banner labels the source honestly as
`EXPERIMENTAL X-ray | PDB <id> | <res> Å`.

Residue identities were verified by direct ATOM-record parse before rendering
(titles are not trusted). Two candidate structures were **rejected** during
verification because they did not contain the claimed mutation (see below).

| Scenario GIF | PDB | Method / Res | Verified content | Manuscript |
|---|---|---|---|---|
| M12_S1_KRAS_G12C_sotorasib | 6OIM | X-ray 1.65 Å | residue 12 = CYS (G12C); ligand MOV = sotorasib/AMG510; GDP + Mg | M12 |
| M00_S2_PARP1_olaparib | 7KK4 | X-ray 1.96 Å | ligand 09L = olaparib (2 copies) in NAD+ catalytic site | M00 |
| M12_S3_BACE1_inhibitor | 4B05 | X-ray 1.8 Å | ligand 32D = AZD3839; catalytic Asp32 | M12 |
| M12_S4_EGFR_L858R_drug | 4LQM | X-ray 2.5 Å | residue 858 = ARG (L858R); ligand DJK = covalent quinazoline | M12 |
| M12_S5_PIK3CA_H1047R | 3HHM | X-ray 2.8 Å | residue 1047 = ARG (true H1047R) | M12 |
| M12_S6_TP53_DNA_contact | 1TSR | X-ray 2.2 Å | Arg248 + Arg273 DNA contacts; DNA chains E/F; Zn ion; 3 p53 copies A/B/C | M00/M12 |

## Rejected candidates (data-integrity checks)
- **4QO1** — labeled context suggested R175H, but ATOM parse shows **ARG175 (wild-type + nanobody)**. REJECTED; not used and never labeled as R175H.
- **4JPS** — candidate for H1047R, but ATOM parse shows **HIS1047 (wild-type)**. REJECTED.
- No true **R175H** experimental structure was found (4LOF/4LOE/3D08/5AB9/5O1F/5O1E/2X0V/2X0W/4IJT/4HJE/6SL6/2FEJ all carry ARG175). The R175H scenario was therefore **dropped from the experimental reel** rather than mislabel any wild-type structure.

## Rendering
- PyMOL 3.1.0 headless, `ray_trace_mode=0`, single stable camera per render, no on-atom labels (all text via matplotlib compositor).
- Engines: `analysis/pdb3d_render.py` (drug-in-pocket / mutation-at-site / protein-DNA), `analysis/pdb3d_compose.py` (compositor + GIF quantization).
- Full per-animation parameters and on-frame captions/stats: `receipts/experimental_pdb_3D_receipts.json`.

Illustrative renders of deposited structures. Research use only — not for clinical decision-making.

## MOA morph/reveal upgrade — additional apo/inactive endpoints (2026-07-19)

All apo/inactive endpoints are real RCSB depositions, residues verified by ATOM/HETATM parse.
Morphs interpolate between two deposited endpoints (banner names both PDBs; caption states
intermediate frames are computed interpolation, not observed states). Go/no-go for morph vs
guided reveal: moving-element Cα RMSD ≥ ~2.0 Å after core superposition.

| Target | apo/inactive PDB | Verified content | Paired holo | Moving-element Cα RMSD | Decision |
|---|---|---|---|---|---|
| KRAS G12C | 4OBE | WT Gly12, GDP+Mg, no inhibitor | 6OIM | switch loops 2.71 Å | MORPH |
| PIK3CA H1047R | 4OVU | WT His1047 p110α, drug-free | 3HHM | activation loop 8.02 Å | MORPH |
| PARP1 | 4PJT | CAT 662–1010 (+2YQ, open ref) | 7KK4 | helical domain 2.15 Å | MORPH |
| BACE1 | 1W50 | apo, drug-free | 4B05 | flap 1.58 Å | GUIDED REVEAL |
| EGFR L858R | 2ITY | WT Leu858, gefitinib-bound inactive | 4LQM | actloop+αC 0.40 Å | GUIDED REVEAL |

EGFR morph was **rejected** (0.40 Å — no honest inactive→active transition between the best
available endpoints; a morph would fabricate motion). BACE1 flap (1.58 Å) below threshold →
reveal. Both are shown as mechanism-guided reveals (establish→dolly→engage→hold), not spins.
