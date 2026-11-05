# AK Case — Structural + Interaction Synthesis

Real protein-structure predictions and a data-grounded synthetic-lethality (SL) figure for the three variants in the CrisPRO AK tumor-board case (ovarian, MSS, PD-L1+).

**Variants:** MBD4 p.K431Nfs*54 (frameshift, BER loss) · PDGFRA p.S755P (VUS) · TP53 p.R175H (hotspot, checkpoint).

**SL logic:** BER (MBD4) + CHECKPOINT (TP53) broken -> tumor leans on backup dependencies ATR + WEE1 (computational hypotheses).

## Contents
- `manifest.json` — machine-readable case + SL data (CrisPRO-grounded).
- `METHODS_AND_LIMITS.md` — engines, frameshift modeling, numbering, claim-integrity limits (READ FIRST).
- `sequences/` — WT + mutant monomer FASTAs (folding inputs).
- `specs/` — Boltz-2 complex YAMLs + validated ligand SMILES.
- `structures/` — folded PDB/CIF (added as GPU jobs complete).
- `receipts/` — per-structure confidence JSON.
- `figures/` — `SL_network.png/.svg`; per-protein mutation-impact panels (added after folds).

## Key disclosures
- **AlphaFold3 is unavailable** on the compute cluster; structures use **AlphaFold2** (monomers) and **Boltz-2** (complexes), labeled per output. These are AF3-*equivalent*, not AF3.
- MBD4 frameshift modeled as **WT vs truncated product** (derived from RefSeq c.1293delA); ablates the DNA-glycosylase catalytic domain.
- **ATR/WEE1 are computational hypotheses** (legacy v2 engine); v3 does not support them for MBD4. Research use only.
