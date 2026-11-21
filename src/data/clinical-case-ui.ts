/**
 * Public clinical UI — copy budgets + progressive disclosure.
 * Numbers: src/data/clinical-evidence-from-receipts.ts (receipt JSON only).
 */
export type { ClinicalCaseId, MetricTile, ClinicalCaseCard } from '@/data/clinical-case-ui-types';

import {
  buildClinicalCases,
  clinicalCaseByIdFromReceipts,
  crosswalkEvidenceLines,
  loadMetricTilesFromReceipts,
} from '@/data/clinical-evidence-from-receipts';

/** Homepage hero — 8-word cap / 20-word subhead */
export const HOME_HERO = {
  headline: 'The right cancer drug. The first time.',
  subhead: 'Open a case. Rank options and rule-outs before the drug debate.',
} as const;

/** Tumor Board product hero */
export const TB_SURFACE_HERO = {
  headline: 'Rank the patient before the drug list.',
  subhead: 'Cases, treatment calls, proof, and live runner on one surface.',
} as const;

export const CLINICAL_METRIC_TILES = loadMetricTilesFromReceipts();
export const CLINICAL_CASES = buildClinicalCases();
export const CLINICAL_PROOF_CROSSWALK = crosswalkEvidenceLines();

export function clinicalCaseById(
  id: import('@/data/clinical-case-ui-types').ClinicalCaseId,
) {
  return clinicalCaseByIdFromReceipts(id);
}