/**
 * Frontend-spec v2 (e2aa31a) — component_spec.json is the authority.
 * Old contract_snapshot.json / 5-state L5 JSON fixtures were removed upstream.
 */

import componentSpec from '@/data/tumor-board/frontend-spec/component_spec.json';

export type L5UiState = 'happy' | 'empty' | 'loading' | 'degraded' | 'quarantined';

export const L5_UI_STATES: L5UiState[] = [
  'happy',
  'empty',
  'loading',
  'degraded',
  'quarantined',
];

export const L5_COMPONENT_SPEC = componentSpec;
export const L5_CONTRACT_VERSION = componentSpec.meta.contract_version;

/** NSCLC L1→L5 reasoning layers (from component_spec case claim). */
export const NSCLC_REASONING_LAYERS = [
  { layer: 'L1', name: 'CT ingestion', function: 'Series / phantom CT bytes in' },
  { layer: 'L2', name: 'MONAI RetinaNet', function: 'lung_nodule_ct_detection detection' },
  { layer: 'L3', name: 'Lung heuristic', function: 'Nodule / mass risk bucket' },
  { layer: 'L4', name: 'NCCN-lite', function: 'Rules-lite therapy / workup map' },
  { layer: 'L5', name: 'Co-scientist + Elo', function: 'Reflect + tournament audit sort' },
] as const;

export const AK_ARBITER_CONTRIBUTION = [
  'TumorBoardBundle contract validation',
  'URL honesty gate on co_scientist reflect',
  'bundle_sha256 audit-of-record',
  'Deterministic Elo audit sort with labeled manuscript weights',
] as const;
