/**
 * MOA mechanism pack — experimental PDB endpoints + morph/reveal companions.
 *
 * Source of truth compared against:
 *   structural/manuscripts/receipts/moa_animation_receipts.json  (fcbcd16 / 65a8fe0)
 *   structural/manuscripts/receipts/experimental_pdb_3D_receipts.json
 *
 * 3D primary = deposited RCSB crystals under /public/models/moa/
 * Morph/reveal media = mechanism timeline under /public/media/moa/ (secondary)
 *
 * Cache policy: modelPath / media URLs carry ?v= so browsers + Molstar re-fetch
 * after reel updates. No invented WRN/PD-1 worker reel.
 */

export type MoaEndpoint = {
  pdb: string;
  /** Local path with cache-bust query — Molstar downloads this URL. */
  modelPath: string;
  state: string;
  resolution_A?: number;
};

export type MoaMechanismEntry = {
  id: string;
  gene: string;
  manuscript: 'M00' | 'M12';
  type: 'morph' | 'guided_reveal' | 'contact';
  biology: string;
  mutation: string | null;
  drug: string | null;
  statCallout: string | null;
  /** Shown when present — never frame as MBD4→PARP therapy. */
  integrityGuard: string | null;
  whyRevealNotMorph: string | null;
  /** Primary interactive view (holo / drug-bound / contact). */
  primary: MoaEndpoint;
  /** Apo / inactive — only for morphs with a verified second endpoint. */
  apo: MoaEndpoint | null;
  motionArrow: {
    drawn: boolean;
    centroidShiftA: number | null;
    reason: string | null;
  } | null;
  media: {
    gif: string;
    mp4: string;
    still: string | null;
  };
};

const V = 'moa-20260719';

function pdbPath(id: string): string {
  return `/models/moa/${id}.pdb?v=${V}`;
}

function mediaPaths(stem: string): MoaMechanismEntry['media'] {
  return {
    gif: `/media/moa/gifs/${stem}.gif?v=${V}`,
    mp4: `/media/moa/mp4/${stem}.mp4?v=${V}`,
    still: `/media/moa/stills/${stem}.png?v=${V}`,
  };
}

/**
 * Six receipt-backed mechanism entries — the compared reel, not the full M00_A pack.
 * Order: morphs first, then reveals, then TP53 contact.
 */
export const MOA_MECHANISM_ENTRIES: MoaMechanismEntry[] = [
  {
    id: 'M12_S1_KRAS_G12C_switch_collapse_MOA',
    gene: 'KRAS',
    manuscript: 'M12',
    type: 'morph',
    biology:
      'Switch-I/II loops collapse over the pocket as sotorasib locks mutant Cys12 (4OBE→6OIM).',
    mutation: 'G12C',
    drug: 'sotorasib (AMG 510)',
    statCallout: '−0.148 Evo2 Δll (tolerated)',
    integrityGuard: null,
    whyRevealNotMorph: null,
    primary: {
      pdb: '6OIM',
      modelPath: pdbPath('6OIM'),
      state: 'G12C + sotorasib (MOV) + GDP + Mg',
      resolution_A: 1.65,
    },
    apo: {
      pdb: '4OBE',
      modelPath: pdbPath('4OBE'),
      state: 'GDP-bound, WT Gly12, inactive',
    },
    motionArrow: {
      drawn: false,
      centroidShiftA: 0.24,
      reason:
        'Collapse/reorganization — centroid barely moves (0.24 Å); arrow honestly suppressed.',
    },
    media: mediaPaths('M12_S1_KRAS_G12C_switch_collapse_MOA'),
  },
  {
    id: 'M12_S5_PIK3CA_H1047R_activation_MOA',
    gene: 'PIK3CA',
    manuscript: 'M12',
    type: 'morph',
    biology:
      'Activation loop translates ~5 Å on H1047R, priming p110α (4OVU→3HHM).',
    mutation: 'H1047R',
    drug: null,
    statCallout: '−0.615 Evo2 Δll (disruptive)',
    integrityGuard: null,
    whyRevealNotMorph: null,
    primary: {
      pdb: '3HHM',
      modelPath: pdbPath('3HHM'),
      state: 'H1047R (Arg1047)',
      resolution_A: 2.8,
    },
    apo: {
      pdb: '4OVU',
      modelPath: pdbPath('4OVU'),
      state: 'WT p110α (His1047), drug-free',
    },
    motionArrow: {
      drawn: true,
      centroidShiftA: 5.38,
      reason: 'Genuine translation (5.38 Å) — blue motion arrow drawn in the shipping morph.',
    },
    media: mediaPaths('M12_S5_PIK3CA_H1047R_activation_MOA'),
  },
  {
    id: 'M00_S2_PARP1_HD_clamp_MOA',
    gene: 'PARP1',
    manuscript: 'M00',
    type: 'morph',
    biology:
      'Autoinhibitory helical domain clamps over the active site as olaparib engages (4PJT→7KK4). Drug–enzyme engagement only.',
    mutation: null,
    drug: 'olaparib',
    statCallout: 'p=0.605 MBD4→PARP: falsified',
    integrityGuard:
      'The MBD4-LOF → PARP-therapy hypothesis was FALSIFIED (p=0.605, DepMap 24Q2). This view is NEVER framed as MBD4-LOF PARP therapy.',
    whyRevealNotMorph: null,
    primary: {
      pdb: '7KK4',
      modelPath: pdbPath('7KK4'),
      state: 'olaparib (09L) in catalytic site',
      resolution_A: 1.96,
    },
    apo: {
      pdb: '4PJT',
      modelPath: pdbPath('4PJT'),
      state: 'PARP1 CAT 662–1010 open/reference',
    },
    motionArrow: {
      drawn: false,
      centroidShiftA: 1.24,
      reason: 'Clamp/hinge (1.24 Å) below 1.5 Å gate — arrow suppressed.',
    },
    media: mediaPaths('M00_S2_PARP1_HD_clamp_MOA'),
  },
  {
    id: 'M12_S4_EGFR_L858R_reveal_MOA',
    gene: 'EGFR',
    manuscript: 'M12',
    type: 'guided_reveal',
    biology:
      'Arg858 in the activation loop + covalent quinazoline in the ATP pocket (PDB 4LQM).',
    mutation: 'L858R',
    drug: 'covalent quinazoline (DJK)',
    statCallout: '+0.088 Evo2 Δll (tolerated)',
    integrityGuard: null,
    whyRevealNotMorph:
      'Inactive→active endpoints differ by only ~0.4 Å — a morph would fabricate motion.',
    primary: {
      pdb: '4LQM',
      modelPath: pdbPath('4LQM'),
      state: 'L858R (Arg858) + covalent quinazoline (DJK)',
      resolution_A: 2.5,
    },
    apo: null,
    motionArrow: null,
    media: mediaPaths('M12_S4_EGFR_L858R_reveal_MOA'),
  },
  {
    id: 'M12_S3_BACE1_reveal_MOA',
    gene: 'BACE1',
    manuscript: 'M12',
    type: 'guided_reveal',
    biology:
      'Catalytic Asp32/Asp228 dyad + AZD3839 (PDB 4B05). Apex BrM driver — mutation-invisible.',
    mutation: null,
    drug: 'AZD3839',
    statCallout: '0 somatic mutations',
    integrityGuard: null,
    whyRevealNotMorph:
      'Apo→holo flap motion is only 1.58 Å (below morph threshold) — guided reveal, not morph.',
    primary: {
      pdb: '4B05',
      modelPath: pdbPath('4B05'),
      state: 'AZD3839 (32D), catalytic Asp32',
      resolution_A: 1.8,
    },
    apo: null,
    motionArrow: null,
    media: mediaPaths('M12_S3_BACE1_reveal_MOA'),
  },
  {
    id: 'M12_S6_TP53_DNA_contact',
    gene: 'TP53',
    manuscript: 'M12',
    type: 'contact',
    biology:
      'p53 DBD gripping DNA response element (PDB 1TSR) — contact story, not a spin.',
    mutation: null,
    drug: null,
    statCallout: null,
    integrityGuard: null,
    whyRevealNotMorph: null,
    primary: {
      pdb: '1TSR',
      modelPath: pdbPath('1TSR'),
      state: 'p53 DBD + DNA response element',
    },
    apo: null,
    motionArrow: null,
    media: mediaPaths('M12_S6_TP53_DNA_contact'),
  },
];

export const MOA_BY_GENE: Record<string, MoaMechanismEntry> = Object.fromEntries(
  MOA_MECHANISM_ENTRIES.map((e) => [e.gene, e]),
);

export const MOA_HONESTY =
  'Morph intermediates are geometric interpolation between two deposited crystals — not observed states. All endpoints are RCSB experimental PDBs.';

export function moaStructureRecord(
  entry: MoaMechanismEntry,
  endpoint: 'primary' | 'apo' = 'primary',
): {
  gene: string;
  uniprot: string;
  aa: string;
  plddt: null;
  source: string;
  entryId: string;
  modelPath: string;
  name: string;
  note: string;
} {
  const ep = endpoint === 'apo' && entry.apo ? entry.apo : entry.primary;
  const res =
    ep.resolution_A != null ? ` · ${ep.resolution_A} Å X-ray` : ' · experimental PDB';
  return {
    gene: entry.gene,
    uniprot: '—',
    aa: '—',
    plddt: null,
    source: `PDB ${ep.pdb}${res}`,
    entryId: ep.pdb,
    modelPath: ep.modelPath,
    name: `${entry.gene} mechanism`,
    note: ep.state,
  };
}
