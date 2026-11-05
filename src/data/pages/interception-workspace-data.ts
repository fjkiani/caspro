/**
 * Interception workspace — copy + constants from committed receipts only.
 *
 * Sources:
 *   src/data/brain-met-cascade-data.ts
 *   src/data/structure-manifest.json
 *   src/data/af3-guide-manifest.json
 *   pub12 mskmet_brm_evo2_summary.json (n_brm_samples=1879, 23 mutated genes; BACE1 absent)
 *
 * No AUROC in mission stages 01–06. AUROC only in HANDOFF_LIMITS footnote.
 */

import {
  AUROC,
  BACE1,
  BRM_STEPS,
  FORMULAS,
  GAPS,
  LIVE_VARIANTS,
  type BrmStep,
} from '@/data/brain-met-cascade-data';
import { TARGET_LOCK_INTRO_PATH, TARGET_LOCK_WORKSPACE_PATH } from '@/lib/engine/paths';
import structureManifest from '@/data/structure-manifest.json';
import guideManifest from '@/data/af3-guide-manifest.json';

export type MissionStageId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface MissionStage {
  id: MissionStageId;
  name: string;
  plain: string;
}

export const INTERCEPTION_HERO = {
  brand: 'CrisPRO · Interception',
  title: 'Discover the next metastasis target worth testing.',
  subtitle:
    '7-step BrM cascade · multi-modal rank · CRISPR design · structural receipt. Research use only.',
} as const;

/** Pub12 summary metadata — BACE1 not in the 23 mutated genes scored. */
export const MSKMET_BRM = {
  nBrmSamples: 1879,
  nGenesWithScoredSnvs: 23,
  nVariantsScored: 1150,
  source: 'mskmet_brm_evo2_summary.json · metadata',
} as const;

export const MISSION_STAGES: MissionStage[] = [
  {
    id: 1,
    name: 'The blind spot',
    plain:
      'Mutation panels miss expression-driven BrM genes. BACE1 is absent from the 23 mutated genes scored across 1,879 MSK-MET brain-metastasis samples — yet CRISPRa LFC and brain enrichment put it on the cascade.',
  },
  {
    id: 2,
    name: 'Scope the step',
    plain:
      'Metastasis is not one biology. Pick the BrM step. Primary genes and hard negatives come from metastasis_rules.json v1.1.0-brain_met — the same freeze Target Lock uses.',
  },
  {
    id: 3,
    name: 'Three independent signals',
    plain:
      'Class-aware composite: signed directional CRISPRa LFC (max(0, LFC) for ONC), ATAC LFC, Evo2 score. TSG and ONC use different weights. Enformer is gated off in the production composite.',
  },
  {
    id: 4,
    name: 'Ranked target',
    plain:
      'Click a primary gene for this step. The fold on the right is the local AlphaFold DB (or PDB) model we keep under /public/models/ — no CDN at render time.',
  },
  {
    id: 5,
    name: 'DNA → guide',
    plain:
      'Once a target is chosen: genomic window → PAM-aware SpCas9 spacer → Assassin (efficacy · safety · mission). Guide:DNA folds exist for a subset of cascade genes from the AF3 structural cohort.',
  },
  {
    id: 6,
    name: 'Structural receipt',
    plain:
      'Cohort B is RNA–DNA doctrine (pLDDT ≥ 50, iPTM ≥ 0.30) — not the protein monomer cut. Applying the protein cut rejects all 15 real guides. AF3 is a pre-synthesis receipt, not wet-lab cleavage.',
  },
  {
    id: 7,
    name: 'Handoff',
    plain:
      'Open the live Target Lock engine for the audited pipeline workspace. Wet-lab validation remains outside the box. Research use only.',
  },
];

export const SIGNAL_CARDS = [
  {
    id: 'crispr',
    label: 'CRISPRa signed LFC',
    formula: 'TSG w=0.60 · ONC w=0.25 (max(0, LFC))',
    body: `Signed directional CRISPRa log-fold from GSE237446 (Chafe 2025; max(0, LFC) for oncogenic drivers). BACE1 canonical LFC ${BACE1.canonicalLfc}.`,
  },
  {
    id: 'atac',
    label: 'ATAC LFC',
    formula: 'ONC w=0.35 · TSG w=0.20',
    body: 'Open chromatin from GSE205033 MBM vs ECM (Biermann 2022). Some genes mean-imputed when missing the 50 kb window.',
  },
  {
    id: 'evo2',
    label: 'Evo2 Δll',
    formula: FORMULAS.functionality,
    body: 'Zero-shot evolutionary constraint on the substitution — mechanism boundary, not a standalone classifier. Orthogonal to CRISPRa in the BrM panel.',
  },
] as const;

export const HANDOFF_CTAS = {
  primary: { label: 'Open Target Lock', href: TARGET_LOCK_INTRO_PATH },
  workspace: { label: 'Pipeline workspace', href: TARGET_LOCK_WORKSPACE_PATH },
  contact: { label: 'Talk to us', href: '/contact/' },
} as const;

/** Stage 07 limits — AUROC only here. */
export const HANDOFF_LIMITS: string[] = [
  `Panel diagnostic AUROC ${AUROC.primary} (${AUROC.primaryLabel}) — not a product headline; GAP-1: hard negatives too easy.`,
  'Enformer excluded from production composite (near-constant / non-discriminative).',
  'Publication composite weights and evo2-e2e Target-Lock TL weights differ — never silently merged.',
  'AF3 guide:DNA confidence ≠ wet-lab cleavage proof.',
  'Research use only. Not FDA-cleared. Not CE-marked. Not intended for clinical use.',
  `${GAPS[0].id}: ${GAPS[0].detail}`,
  `${GAPS[1].id}: ${GAPS[1].detail}`,
];

export function getStructureRecord(gene: string) {
  const structures = (structureManifest as { structures: Record<string, StructureRow> }).structures;
  return structures[gene] ?? null;
}

export interface StructureRow {
  gene: string;
  uniprot: string;
  aa: number | string;
  plddt: number | null;
  source: string;
  entryId: string;
  modelPath: string;
  paeImageUrl?: string;
  name: string;
  note?: string;
}

export interface GuideRow {
  guide_id: string;
  gene: string;
  step: string;
  plddt: number;
  iptm: number;
  structural_confidence: number;
  rna_dna_verdict: string;
  cif_path: string;
}

export function getBestGuideForGene(gene: string): GuideRow | null {
  const guides = (guideManifest as { guides: Record<string, GuideRow> }).guides;
  const hits = Object.values(guides).filter((g) => g.gene === gene);
  if (!hits.length) return null;
  return hits.sort((a, b) => b.structural_confidence - a.structural_confidence)[0];
}

export function liveVariantsForGene(gene: string) {
  return LIVE_VARIANTS.filter((v) => v.gene === gene);
}

export function cascadeStepsForGene(gene: string): BrmStep[] {
  return BRM_STEPS.filter((s) => s.primaryGenes.includes(gene));
}

/** Prefer BACE1 when on its cascade steps; else first primary gene. */
export function defaultGeneForStep(step: BrmStep): string {
  if (step.primaryGenes.includes('BACE1')) return 'BACE1';
  return step.primaryGenes[0] ?? 'TP53';
}

export { BRM_STEPS, BACE1, FORMULAS };
