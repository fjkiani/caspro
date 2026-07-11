/**
 * brm_pipeline.ts — typed accessor for the evo2-e2e brain-met pipeline JSON.
 *
 * Source of truth: `./brm_pipeline_20260328T070235Z.json`
 *   Produced by a real GPU run on Modal (crispro-evo2-v9 · A100), seed 42,
 *   fast_mode=true, use_enformer=true. Committed as-is; no live Modal call.
 *
 * This file:
 *   - Imports the JSON via `resolveJsonModule: true` (build-time inclusion, ~87 KB)
 *   - Narrows the shape into typed accessors
 *   - Provides step ordering to match `brain-met-cascade-data.BRM_STEPS`
 *   - Provides BM01's patient-variant overlay (delta-LL scored on Modal)
 *
 * If the pipeline JSON changes, re-copy from
 *   /mnt/shared-workspace/anchor_audit/anchor_repos/evo2-e2e/data/brain_met/pipeline_results_*.json
 * and update the STEP_ORDER slug list if step names shift.
 */

import raw from './brm_pipeline_20260328T070235Z.json';

// ============================================================================
// Types
// ============================================================================

export type BrmStepSlug =
  | 'primary_tumor_escape'
  | 'intravasation'
  | 'circulation_survival'
  | 'bbb_transit'
  | 'cns_colonization'
  | 'brain_niche_adaptation'
  | 'brm_angiogenesis';

export type BrmRunInfo = {
  timestamp: string;
  seed: number;
  disease: string;
  fastMode: boolean;
  useEnformer: boolean;
  nGenes: number;
  nPositives: number;
  nNegatives: number;
  nSteps: number;
  elapsedS: number;
};

export type BrmStepMetrics = {
  slug: BrmStepSlug;
  auroc: number;
  auprc: number;
  precisionAt3: number;
  nPos: number;
  nTotal: number;
};

export type BrmGeneScore = {
  gene: string;
  step: BrmStepSlug;
  calibratedScore: number;
  targetLockScore: number;
  label: boolean;
  bbbRelevant: boolean;
  flags: string[];
};

export type BrmPatientVariant = {
  gene: string;
  hgvsP: string;
  deltaLL: number;
  interpretation: string;
  relatedSteps: BrmStepSlug[];
  patientMatch: boolean;
};

// ============================================================================
// Canonical step order (matches BRM_STEPS in brain-met-cascade-data.ts)
// ============================================================================

export const BRM_STEP_ORDER: BrmStepSlug[] = [
  'primary_tumor_escape',
  'intravasation',
  'circulation_survival',
  'bbb_transit',
  'cns_colonization',
  'brain_niche_adaptation',
  'brm_angiogenesis',
];

export const BRM_STEP_LABEL: Record<BrmStepSlug, string> = {
  primary_tumor_escape: 'Primary tumor escape',
  intravasation: 'Intravasation',
  circulation_survival: 'Circulation survival',
  bbb_transit: 'BBB transit',
  cns_colonization: 'CNS colonization',
  brain_niche_adaptation: 'Brain niche adaptation',
  brm_angiogenesis: 'BrM angiogenesis',
};

// ============================================================================
// Raw JSON narrowing
// ============================================================================

type RawRunInfo = {
  timestamp: string;
  seed: number;
  disease: string;
  fast_mode: boolean;
  use_enformer: boolean;
  n_genes: number;
  n_positives: number;
  n_negatives: number;
  n_steps: number;
  elapsed_s: number;
};

type RawStepMetric = {
  auroc: number;
  auprc: number;
  precision_at_3: number;
  n_pos: number;
  n_total: number;
};

type RawGeneScore = {
  gene: string;
  step: string;
  calibrated_score: number;
  target_lock_score: number;
  label: boolean;
  bbb_relevant: boolean;
  flags: string[];
};

type RawPipeline = {
  run_info: RawRunInfo;
  validation_metrics: Record<string, RawStepMetric>;
  gene_scores: Record<string, RawGeneScore[]>;
};

const PIPELINE = raw as unknown as RawPipeline;

// ============================================================================
// Accessors
// ============================================================================

export function getRunInfo(): BrmRunInfo {
  const r = PIPELINE.run_info;
  return {
    timestamp: r.timestamp,
    seed: r.seed,
    disease: r.disease,
    fastMode: r.fast_mode,
    useEnformer: r.use_enformer,
    nGenes: r.n_genes,
    nPositives: r.n_positives,
    nNegatives: r.n_negatives,
    nSteps: r.n_steps,
    elapsedS: r.elapsed_s,
  };
}

export function getStepMetrics(slug: BrmStepSlug): BrmStepMetrics | null {
  const raw = PIPELINE.validation_metrics[slug];
  if (!raw) return null;
  return {
    slug,
    auroc: raw.auroc,
    auprc: raw.auprc,
    precisionAt3: raw.precision_at_3,
    nPos: raw.n_pos,
    nTotal: raw.n_total,
  };
}

export function getAllStepMetrics(): BrmStepMetrics[] {
  return BRM_STEP_ORDER.map((slug) => getStepMetrics(slug)).filter(
    (m): m is BrmStepMetrics => m !== null,
  );
}

export function getStepScores(slug: BrmStepSlug): BrmGeneScore[] {
  const rows = PIPELINE.gene_scores[slug] ?? [];
  return rows.map((r) => ({
    gene: r.gene,
    step: r.step as BrmStepSlug,
    calibratedScore: r.calibrated_score,
    targetLockScore: r.target_lock_score,
    label: r.label,
    bbbRelevant: r.bbb_relevant,
    flags: r.flags,
  }));
}

/**
 * Sort a step's scores by target_lock_score DESC (drivers first).
 */
export function getStepScoresSorted(slug: BrmStepSlug): BrmGeneScore[] {
  return [...getStepScores(slug)].sort(
    (a, b) => b.targetLockScore - a.targetLockScore,
  );
}

/**
 * Return the multi-step footprint for a gene:
 *   for each step, {slug, targetLockScore, label, bbbRelevant}.
 * Used when the workspace user hovers/pins a gene from the table.
 */
export function getGeneMultiStepFootprint(gene: string): Array<{
  slug: BrmStepSlug;
  targetLockScore: number;
  calibratedScore: number;
  label: boolean;
  bbbRelevant: boolean;
}> {
  return BRM_STEP_ORDER.map((slug) => {
    const row = getStepScores(slug).find((r) => r.gene === gene);
    if (!row) return null;
    return {
      slug,
      targetLockScore: row.targetLockScore,
      calibratedScore: row.calibratedScore,
      label: row.label,
      bbbRelevant: row.bbbRelevant,
    };
  }).filter((x): x is NonNullable<typeof x> => x !== null);
}

// ============================================================================
// BM01 patient variants
// Source: same anchor extraction as bm01_evo2.ts (delta-LL scored on Modal).
// These are the 4 canonical patient variants used in the BM01 anchor panel.
// ============================================================================

export const BM01_PATIENT_VARIANTS: BrmPatientVariant[] = [
  {
    gene: 'PIK3CA',
    hgvsP: 'p.H1047R',
    deltaLL: -0.615,
    interpretation: 'Top penalized — PI3K kinase domain',
    relatedSteps: ['primary_tumor_escape', 'cns_colonization'],
    patientMatch: true,
  },
  {
    gene: 'TP53',
    hgvsP: 'p.R175H',
    deltaLL: -0.418,
    interpretation: 'BrM hotspot, 2× enriched (MSK-MET)',
    relatedSteps: [
      'primary_tumor_escape',
      'cns_colonization',
      'brain_niche_adaptation',
    ],
    patientMatch: true,
  },
  {
    gene: 'ESR1',
    hgvsP: 'p.D538G',
    deltaLL: -0.402,
    interpretation: 'Ligand-independent ER activation',
    relatedSteps: ['cns_colonization', 'brain_niche_adaptation'],
    patientMatch: false,
  },
  {
    gene: 'BACE1',
    hgvsP: 'p.D289N',
    deltaLL: 0.002,
    interpretation: 'Near-neutral hard negative — ACMG PVS1 context needed',
    relatedSteps: [
      'circulation_survival',
      'cns_colonization',
      'brain_niche_adaptation',
    ],
    patientMatch: false,
  },
];

export function getBm01VariantsForStep(slug: BrmStepSlug): BrmPatientVariant[] {
  return BM01_PATIENT_VARIANTS.filter((v) => v.relatedSteps.includes(slug));
}
