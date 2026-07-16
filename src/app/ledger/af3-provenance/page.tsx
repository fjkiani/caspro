import { Metadata } from 'next';
import Af3ProvenanceSurface from '@/components/ledger/Af3ProvenanceSurface';

/**
 * /ledger/af3-provenance/ — persona-aware AF3 audit surface.
 *
 * Three cohort panels:
 *   1. BRM 7-step evo2 pipeline (real Modal run, 20260328T070235Z)
 *   2. AFDB Cohort A (28 protein monomers, protein-monomer doctrine, pLDDT ≥70)
 *   3. AF3 Cohort B (15 RNA-DNA guide-target complexes, RNA-DNA doctrine, pLDDT ≥50 + iPTM ≥0.30)
 *
 * Governance:
 *   - PATH A locked (fit = clip((p·t)/‖t‖₂, 0, 1)); no PATH B references.
 *   - DL-07 (DDR 0.983) quarantined; not shown.
 *   - LATIFY delta values (+0.366 / +0.2641) quarantined; not shown.
 *   - PC-02 permanently downgraded; script-reproducibility claim explicitly downgraded.
 *
 * Data on disk:
 *   src/data/af3/af3_15_guide_canonical.json  (15-guide RNA-DNA)
 *   src/data/af3/afdb_28_protein_canonical.json  (28 AFDB protein monomers)
 *   src/data/evo2/brm_pipeline_20260328T070235Z.json  (7-step evo2 pipeline)
 */

export const metadata: Metadata = {
  title: 'AF3 Provenance | CrisPRO.ai',
  description:
    'AlphaFold structural audit provenance. 7-step evo2 brain-met pipeline · 28 AFDB protein monomers (protein doctrine) · 15 AF3 RNA-DNA guide complexes (RNA-DNA doctrine). Persona-aware.',
};

export default function Af3ProvenancePage() {
  return <Af3ProvenanceSurface />;
}
