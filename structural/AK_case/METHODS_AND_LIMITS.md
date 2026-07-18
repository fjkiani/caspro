# Methods & Limits — AK Case Structural Synthesis

**Scope.** Real protein-structure predictions and a data-grounded synthetic-lethality (SL) figure for the three variants in the CrisPRO AK tumor-board case (ovarian, MSS, PD-L1+). Research use only (RUO). No AI-generated/decorative images — structures come from folding engines; the SL diagram is plotted directly from CrisPRO backend numbers.

## Variants (verified against UniProt)

| # | Gene | Variant | Type | Zygosity / origin | Class | CrisPRO disruption | Pathway |
|---|------|---------|------|-------------------|-------|--------------------|---------|
| 01 | MBD4 | p.K431Nfs\*54 (c.1293delA) | frameshift → truncation | homozygous germline | pathogenic | 0.654 | BER → non-functional |
| 02 | PDGFRA | p.S755P (c.2263T>C) | missense | heterozygous germline | VUS | 0.350 | UNKNOWN / functional |
| 03 | TP53 | p.R175H (c.524G>A, chr17:7577120 GRCh38) | missense hotspot | somatic | pathogenic | 0.550 | CHECKPOINT → compromised |

Sequences: UniProt O95243 (MBD4), P16234 (PDGFRA), P04637 (TP53). Missense edits confirmed programmatically at the exact residue (PDGFRA S755→P, TP53 R175→H).

## Frameshift handling (MBD4)

`p.K431Nfs*54` is a truncating frameshift — it cannot be modeled as a point substitution. The mutant protein was derived directly from the RefSeq coding sequence (NM_003925 / NP_003916) by applying the actual **c.1293delA** deletion and translating the −1 frameshift:

- Mutant is **identical to WT through residue 431**, then runs through **58 novel frameshifted residues → premature stop** (489-aa truncated product).
- This **ablates the C-terminal HhH-GPD DNA-glycosylase catalytic domain (~residues 426–580)** — the concrete structural basis for the CrisPRO call `BER → non-functional`.
- Modeling choice: **fold full-length WT (580 aa) and the truncated product (489 aa) side-by-side** to visualize catalytic-domain loss.

**Numbering note.** The HGVS `p.K431...` label in the source record uses a transcript/annotation whose residue 431 differs from RefSeq NP_003916 (which has R at 431); UniProt canonical also has R at 431. This is a benign annotation/numbering offset — the frameshift **mechanism and position (~431)** are unambiguous and consistent across sources.

## Structure engines (AlphaFold3 substitution — disclosed)

**AlphaFold3 is not available on the compute cluster.** The CrisPRO "AF3 structural receipt" nominally uses AF3 (Abramson 2024); it cannot be reproduced exactly here. Substitutes, each output labeled with the actual engine + version:

- **AlphaFold2** (monomer, `monomer_ptm`, reduced_dbs) — the six monomer folds (WT + mutant × 3). Confidence: pLDDT, pTM, PAE.
- **Boltz-2** (AF3-generation diffusion model) — physical complexes / ligand docking with interface confidence (ipTM). Chai-1 as fallback.

These are **AF2 / Boltz-2 predictions, not AlphaFold3**, and not the exact CrisPRO AF3 receipt.

## Complexes

- **TP53 DNA-binding core (94–312) + dsDNA** (WT vs R175H) — R175H is a structural/DNA-contact–destabilizing hotspot.
- **PDGFRA kinase domain (593–954) + imatinib** (WT vs S755P) — S755P lies inside the kinase domain; imatinib is a known PDGFRA type-II inhibitor (docked as a structural probe, not a therapy claim). SMILES RDKit-validated (C29H31N7O).
- **WEE1 kinase domain (291–575) + adavosertib** — SL-hypothesis probe. SMILES RDKit-validated (C27H32N8O2).
- **ATR full complex is infeasible (2644 aa)** → represented in the SL network diagram only (optional kinase-domain fold if GPU budget allows).

## Claim-integrity limits (non-negotiable)

- **ATR / WEE1 are computational dependency HYPOTHESES**, not validated levers. The ATR/WEE1 → ceralasertib/adavosertib chain comes from the **legacy v2** SL engine; the **v3** evidence matrix drops it (ATR_WEE1 axis has 0 positive evidence modalities for MBD4). Any drug shown is investigational / "Computational" tier.
- **Structure confidence (pLDDT/pTM/ipTM) is modeling confidence, not experimental, functional, or clinical validation.**
- Evo2 deltas in the CrisPRO record are diagnostic-only (per provenance), not causal SL triggers — not reinterpreted here.
- Engine substitution (AF2/Boltz-2 for AF3) stated plainly.
- **Research use only. Not a diagnostic, therapeutic, or prescribing recommendation.**

## Reproducibility

- `sequences/` — WT + mutant monomer FASTAs (folding inputs).
- `specs/` — Boltz-2 YAML complex specs + `ligand_smiles.json` (validated).
- `structures/` — folded PDB/CIF (added as each GPU job completes).
- `receipts/` — per-structure confidence JSON (pLDDT/pTM/ipTM/PAE).
- `figures/` — SL network (`SL_network.png/.svg`) + per-protein mutation-impact panels (added after folds).
