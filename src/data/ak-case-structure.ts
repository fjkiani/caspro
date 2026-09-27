/**
 * AK case structural kit — derived from src/data/ak-case/manifest.json + receipts
 * (structural/AK_case, agent/ak-case-structural @ 46a79e5 for MBD4 pair).
 */

import structureManifest from '@/data/structure-manifest.json';
import akManifest from '@/data/ak-case/manifest.json';
import mbd4WtReceipt from '@/data/ak-case/receipts/MBD4_WT_confidence.json';
import mbd4TruncReceipt from '@/data/ak-case/receipts/MBD4_K431Nfs_trunc_confidence.json';
import mbd4Impact from '@/data/ak-case/receipts/MBD4_truncation_impact.json';
import tp53WtReceipt from '@/data/ak-case/receipts/TP53_WT_confidence.json';

/** Matches StructureViewer record shape — kept here to avoid UI↔data circular imports. */
export type AkFoldRecord = {
  gene: string;
  uniprot: string;
  aa: number | string;
  plddt: number | null;
  source: string;
  entryId: string;
  modelPath: string;
  name: string;
  note?: string;
};

export const AK_CASE_ID = akManifest.case;

export const AK_MEDIA = {
  slNetworkPng: '/media/ak-case/figures/SL_network.png',
  slNetworkSvg: '/media/ak-case/figures/SL_network.svg',
  mbd4ImpactPng: '/media/ak-case/figures/MBD4_truncation_impact.png',
  mbd4ImpactSvg: '/media/ak-case/figures/MBD4_truncation_impact.svg',
} as const;

export const AK_PUBLIC_MODELS = {
  MBD4_WT: '/models/ak-case/MBD4_WT_ranked_0.pdb',
  MBD4_trunc: '/models/ak-case/MBD4_K431Nfs_trunc_ranked_0.pdb',
  TP53_WT: '/models/ak-case/TP53_WT_ranked_0.pdb',
} as const;

export const STRUCTURE_VIEWER_HEIGHT = 320;
export const STRUCTURE_VIEWER_HEIGHT_PAIR = 280;
export const GENE_CONTEXT_SENTINEL = 'context';
export const FALLBACK_STRUCTURE_GENE = 'TP53';
export const MBD4_GENE = 'MBD4';

const MANIFEST_STRUCTURES = (structureManifest as { structures: Record<string, unknown> })
  .structures;

export const STRUCTURE_GENE_SET = new Set(Object.keys(MANIFEST_STRUCTURES ?? {}));

export type AkManifestVariant = (typeof akManifest.variants)[number];

type AkVariantView = {
  gene: string;
  uniprot: string;
  variant: string;
  type: string;
  pathway: string;
  pathwayState: string;
  caption: string;
  viewerGene: string;
  pendingMutantFold: boolean;
  /** When set, CASE/SL uses the WT+trunc (or WT+mut) pair pane instead of AFDB alone. */
  pairPane: 'mbd4_truncation' | null;
};

const AF2_SOURCE = 'AF2 monomer_ptm · AK case';

function foldRecord(args: {
  gene: string;
  uniprot: string;
  aa: number;
  plddt: number;
  modelPath: string;
  entryId: string;
  name: string;
  note: string;
}): AkFoldRecord {
  return {
    gene: args.gene,
    uniprot: args.uniprot,
    aa: args.aa,
    plddt: args.plddt,
    source: AF2_SOURCE,
    entryId: args.entryId,
    modelPath: args.modelPath,
    name: args.name,
    note: args.note,
  };
}

export const AK_CASE_FOLDS = {
  MBD4_WT: foldRecord({
    gene: 'MBD4',
    uniprot: mbd4WtReceipt.uniprot,
    aa: mbd4WtReceipt.n_residues,
    plddt: Number(mbd4WtReceipt.best_model_metrics.mean_plddt.toFixed(1)),
    modelPath: AK_PUBLIC_MODELS.MBD4_WT,
    entryId: mbd4WtReceipt.structure_id,
    name: 'MBD4 wild-type (full-length)',
    note: mbd4WtReceipt.role,
  }),
  MBD4_trunc: foldRecord({
    gene: 'MBD4',
    uniprot: mbd4TruncReceipt.uniprot,
    aa: mbd4TruncReceipt.n_residues,
    plddt: Number(mbd4TruncReceipt.best_model_metrics.mean_plddt.toFixed(1)),
    modelPath: AK_PUBLIC_MODELS.MBD4_trunc,
    entryId: mbd4TruncReceipt.structure_id,
    name: 'MBD4 p.K431Nfs*54 truncated product',
    note: mbd4TruncReceipt.role,
  }),
  TP53_WT: foldRecord({
    gene: 'TP53',
    uniprot: tp53WtReceipt.uniprot,
    aa: tp53WtReceipt.n_residues,
    plddt: Number(tp53WtReceipt.best_model_metrics.mean_plddt.toFixed(1)),
    modelPath: AK_PUBLIC_MODELS.TP53_WT,
    entryId: tp53WtReceipt.structure_id,
    name: 'TP53 wild-type',
    note: tp53WtReceipt.role,
  }),
} as const;

export const MBD4_TRUNCATION_IMPACT = {
  gene: mbd4Impact.gene,
  variant: mbd4Impact.variant,
  wtLength: mbd4Impact.wt_length,
  truncLength: mbd4Impact.trunc_length,
  divergeAfter: mbd4Impact.diverge_after_residue,
  retainedCaRmsd: mbd4Impact.retained_region_ca_rmsd,
  nSuperposed: mbd4Impact.n_residues_used_for_superposition,
  lostDomainName: mbd4Impact.lost_domain.name,
  lostDomainStart: mbd4Impact.lost_domain.range[0] as number,
  lostDomainEnd: mbd4Impact.lost_domain.range[1] as number,
  lostDomainRange: `${mbd4Impact.lost_domain.range[0]}–${mbd4Impact.lost_domain.range[1]}`,
  lostDomainPlddt: mbd4Impact.lost_domain.wt_mean_plddt_in_domain,
  residuesLost: mbd4Impact.lost_domain.residues_lost,
  wtMeanPlddt: mbd4Impact.wt_mean_plddt,
  truncMeanPlddt: mbd4Impact.trunc_mean_plddt,
  interpretation: mbd4Impact.interpretation,
  caveat: mbd4Impact.caveat,
  retainedNote: mbd4Impact.retained_rmsd_note,
  figurePng: AK_MEDIA.mbd4ImpactPng,
  figureAlt: `MBD4 truncation impact: WT vs p.K431Nfs*54; catalytic domain ${mbd4Impact.lost_domain.range[0]}–${mbd4Impact.lost_domain.range[1]} lost; retained N-term CA-RMSD ${mbd4Impact.retained_region_ca_rmsd} Å`,
} as const;

/** Viewer defaults: zoom the catalytic domain, not the disordered whole-chain mean. */
export const MBD4_WT_DOMAIN_FOCUS = {
  start: MBD4_TRUNCATION_IMPACT.lostDomainStart,
  end: MBD4_TRUNCATION_IMPACT.lostDomainEnd,
  mode: 'isolate' as const,
  leadPlddt: MBD4_TRUNCATION_IMPACT.lostDomainPlddt,
  leadPlddtLabel: `domain ${MBD4_TRUNCATION_IMPACT.lostDomainRange}`,
};

function captionForVariant(v: AkManifestVariant): string {
  if (v.gene === MBD4_GENE) {
    return `AF2 case folds complete. WT ${MBD4_TRUNCATION_IMPACT.wtLength} aa (glycosylase domain ${MBD4_TRUNCATION_IMPACT.lostDomainRange} @ pLDDT ${MBD4_TRUNCATION_IMPACT.lostDomainPlddt}). Trunc ${MBD4_TRUNCATION_IMPACT.truncLength} aa — catalytic domain absent (${MBD4_TRUNCATION_IMPACT.residuesLost} residues lost). Retained N-term CA-RMSD ${MBD4_TRUNCATION_IMPACT.retainedCaRmsd} Å. Structural basis for BER → non-functional.`;
  }
  if (v.gene === 'PDGFRA' && 'kinase_domain' in v) {
    return `AFDB WT fallback. ${v.variant} in kinase domain (${v.kinase_domain}). Case AF2 WT/mut folds in progress on GPU.`;
  }
  if (v.gene === 'TP53' && 'dbd_core' in v) {
    return `AF2 WT case fold available. ${v.variant} (mut fold pending GPU). DNA-binding core ${v.dbd_core}.`;
  }
  return `Structure for ${v.gene} (${v.uniprot}).`;
}

function typeLabel(v: AkManifestVariant): string {
  switch (v.type) {
    case 'frameshift_truncation':
      return 'frameshift → truncation';
    case 'missense':
      return v.classification === 'VUS' ? 'missense VUS' : 'missense';
    case 'missense_hotspot':
      return 'missense hotspot';
    default:
      return v.type;
  }
}

function variantLabel(v: AkManifestVariant): string {
  return 'cdna' in v && v.cdna ? `${v.variant} (${v.cdna})` : v.variant;
}

function pairPaneFor(gene: string): AkVariantView['pairPane'] {
  if (gene === MBD4_GENE) return 'mbd4_truncation';
  return null;
}

const VARIANT_VIEWS: AkVariantView[] = akManifest.variants.map((v) => ({
  gene: v.gene,
  uniprot: v.uniprot,
  variant: variantLabel(v),
  type: typeLabel(v),
  pathway: v.pathway,
  pathwayState: v.pathway_state,
  caption: captionForVariant(v),
  viewerGene: v.gene,
  pendingMutantFold: v.gene !== MBD4_GENE,
  pairPane: pairPaneFor(v.gene),
}));

const WEE1_UNIPROT = 'P30291';
const WEE1_DEP = akManifest.synthetic_lethality.essential_dependencies.find(
  (d) => d.pathway === 'WEE1',
);

const WEE1_VIEW: AkVariantView = {
  gene: 'WEE1',
  uniprot: WEE1_UNIPROT,
  variant: 'kinase probe · adavosertib',
  type: 'SL dependency probe',
  pathway: 'WEE1',
  pathwayState: WEE1_DEP?.status.toLowerCase() ?? 'computational hypothesis',
  caption:
    'AFDB WT kinase context. Boltz-2 WEE1–adavosertib spec ready as an SL-hypothesis probe. Case fold pending GPU.',
  viewerGene: 'WEE1',
  pendingMutantFold: true,
  pairPane: null,
};

export const AK_VARIANT_STRUCTURE: Record<string, AkVariantView> = Object.fromEntries(
  [...VARIANT_VIEWS, WEE1_VIEW].map((row) => [row.gene, row]),
);

export const AK_PRIMARY_STRUCTURE_GENE = akManifest.variants[0]?.gene ?? FALLBACK_STRUCTURE_GENE;

export const AK_SL_NETWORK = {
  png: AK_MEDIA.slNetworkPng,
  svg: AK_MEDIA.slNetworkSvg,
  title: 'Broken pathways → backup dependencies',
  eyebrow: 'SL network · AK case',
  alt: `AK case synthetic lethality network: ${akManifest.synthetic_lethality.broken_pathways
    .map((p) => p.pathway)
    .join(' + ')} broken; ${akManifest.synthetic_lethality.essential_dependencies
    .map((d) => d.pathway)
    .join(' + ')} as backup dependencies`,
  caption: (() => {
    const broken = akManifest.synthetic_lethality.broken_pathways
      .map((p) => `${p.pathway} (${p.gene})`)
      .join(' + ');
    const deps = akManifest.synthetic_lethality.essential_dependencies
      .map((d) => d.pathway)
      .join(' + ');
    return `${broken} broken → tumor leans on ${deps} backup dependencies. Plotted from CrisPRO case numbers.`;
  })(),
} as const;

export const STRUCTURE_PANE_LABELS = {
  akAfdbWt: 'AK case · AFDB WT',
  akCaseAf2: 'AK case · AF2 fold',
  cohortA: 'Cohort A · protein fold',
  noFold: 'No local fold',
  slDefaultCaption: 'Structural context beside the SL map.',
} as const;

export function isAkCasePatient(patientId: string): boolean {
  return patientId === AK_CASE_ID;
}

export function akStructureForGene(gene: string): AkVariantView | null {
  return AK_VARIANT_STRUCTURE[gene] ?? null;
}

export function hasMbd4PairPane(gene: string): boolean {
  return akStructureForGene(gene)?.pairPane === 'mbd4_truncation';
}

export function hasStructureFold(gene: string): boolean {
  return STRUCTURE_GENE_SET.has(gene) || gene in AK_CASE_FOLDS || gene === MBD4_GENE;
}

export function resolveViewerGene(args: {
  selectedGene: string;
  patientId: string;
  mutationGenes: string[];
}): string {
  const { selectedGene, patientId, mutationGenes } = args;
  if (selectedGene !== GENE_CONTEXT_SENTINEL && hasStructureFold(selectedGene)) {
    return selectedGene;
  }
  if (isAkCasePatient(patientId) && hasStructureFold(AK_PRIMARY_STRUCTURE_GENE)) {
    return AK_PRIMARY_STRUCTURE_GENE;
  }
  const fromMutations = mutationGenes.find((g) => hasStructureFold(g));
  if (fromMutations) return fromMutations;
  if (hasStructureFold(FALLBACK_STRUCTURE_GENE)) return FALLBACK_STRUCTURE_GENE;
  return selectedGene;
}

export function resolveSlViewerGene(args: {
  patientId: string;
  mutationGenes: string[];
}): string {
  const fromMutations = args.mutationGenes.find((g) => hasStructureFold(g));
  if (fromMutations) return fromMutations;
  if (isAkCasePatient(args.patientId) && hasStructureFold(AK_PRIMARY_STRUCTURE_GENE)) {
    return AK_PRIMARY_STRUCTURE_GENE;
  }
  return FALLBACK_STRUCTURE_GENE;
}

export function resolveViewerCaption(args: {
  selectedGene: string;
  resolvedGene: string;
}): string {
  const ak = akStructureForGene(args.selectedGene) ?? akStructureForGene(args.resolvedGene);
  if (ak) return ak.caption;
  if (hasStructureFold(args.selectedGene)) {
    return `Local fold for ${args.selectedGene}.`;
  }
  if (args.selectedGene !== args.resolvedGene) {
    return `No fold for ${args.selectedGene} — showing ${args.resolvedGene}.`;
  }
  return STRUCTURE_PANE_LABELS.slDefaultCaption;
}

/** Prefer case AF2 fold for TP53 WT when available; else AFDB gene key. */
export function resolveStructureRecordForGene(gene: string): AkFoldRecord | null {
  if (gene === MBD4_GENE) return AK_CASE_FOLDS.MBD4_WT;
  if (gene === 'TP53') return AK_CASE_FOLDS.TP53_WT;
  return null;
}
