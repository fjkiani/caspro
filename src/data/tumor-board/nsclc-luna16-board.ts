/**
 * NSCLC LUNA16 board twin — view model from frozen E2E receipts (e2aa31a).
 * Numbers come from JSON on disk. Do not invent scores.
 */
import monai from '@/data/tumor-board/frontend-spec/nsclc_luna16/receipts/01_monai_bundle_card.json';
import detections from '@/data/tumor-board/frontend-spec/nsclc_luna16/receipts/02_detections.json';
import heuristic from '@/data/tumor-board/frontend-spec/nsclc_luna16/receipts/03_lung_heuristic.json';
import nccn from '@/data/tumor-board/frontend-spec/nsclc_luna16/receipts/04_nccn_lite_rules.json';
import elo from '@/data/tumor-board/frontend-spec/nsclc_luna16/receipts/05_elo_transcript.json';
import summary from '@/data/tumor-board/frontend-spec/nsclc_luna16/receipts/99_transcript_summary.json';

export const NSCLC_BOARD_ROUTE = '/tumor-board/nsclc/' as const;
export const NSCLC_RECEIPTS_ROUTE = '/tumor-board/receipts/nsclc_luna16/' as const;

const det0 = detections.detections[0];

export const nsclcBoard = {
  caseId: summary.case_id,
  caseType: summary.case_type,
  caseRole: summary.case_role,
  headline: 'NSCLC · CT scan',
  oneLiner: 'Chest CT in → Elo-ranked workup out. Detector score is honest and low on this OOD mass.',
  layers: [
    {
      id: 'L1',
      label: 'CT ingest',
      chip: 'template',
      chipTone: 'neutral' as const,
      detail: `${summary.case_id} · synthetic phantom · not a real patient`,
    },
    {
      id: 'L2',
      label: 'MONAI RetinaNet',
      chip: monai.invocation.model_state,
      chipTone: 'loaded' as const,
      detail: `${monai.bundle_id}@${monai.bundle_version} · top_score=${monai.invocation.top_score.toFixed(3)} · ${monai.invocation.inference_seconds.toFixed(1)}s`,
      hero: monai.invocation.top_score,
      heroLabel: 'top_score',
    },
    {
      id: 'L3',
      label: 'Lung heuristic',
      chip: heuristic.model_state_before_upgrade,
      chipTone: 'proxy' as const,
      detail: `${heuristic.driving_feature}=${heuristic.max_diameter_mm.toFixed(2)} mm → ${heuristic.risk_bucket} (risk ${heuristic.risk_score.toFixed(3)})`,
      hero: heuristic.risk_score,
      heroLabel: 'risk_score',
    },
    {
      id: 'L4',
      label: 'NCCN-lite',
      chip: nccn.model_state,
      chipTone: 'proxy' as const,
      detail: nccn.rules_source,
    },
    {
      id: 'L5',
      label: 'Co-scientist + Elo',
      chip: elo.model_state,
      chipTone: 'proxy' as const,
      detail: `seed=${elo.seed} · k=${elo.k_factor} · enriched re-rank`,
    },
  ],
  detection: {
    score: det0.score,
    diameterMm: det0.diameter_mm,
    centerMm: [det0.center_x_mm, det0.center_y_mm, det0.center_z_mm] as const,
    inLung: det0.in_lung_parenchyma,
    inDistribution: det0.in_distribution,
    note: detections.note,
    trainingNote: monai.preprocessing.note,
  },
  recommended: nccn.recommended_options,
  notRecommended: nccn.not_recommended,
  warnings: nccn.warnings_verbatim,
  elo: {
    baseline: elo.baseline_ranking,
    enriched: elo.enriched_ranking,
    modifiers: elo.applied_modifiers,
    matches: elo.matches,
  },
  /** Named gaps — RED / missing clinical inputs this rules-lite path does not have. */
  gaps: [
    {
      id: 'histology',
      label: 'Histology / tissue diagnosis',
      why: 'NCCN-lite does not reason about histology. Tissue is still required before therapy selection.',
    },
    {
      id: 'pd_l1',
      label: 'PD-L1 status',
      why: 'Not in this CT→rules path. IO fitness is unknown until assayed.',
    },
    {
      id: 'drivers',
      label: 'Actionable driver mutations',
      why: 'No molecular panel on this door. EGFR/ALK/KRAS etc. are Gaps, not invented.',
    },
    {
      id: 'staging',
      label: 'Staging beyond diameter proxy',
      why: 'Risk bucket is diameter-driven. Full TNM / PET-complete staging is still open.',
    },
    {
      id: 'ood_detector',
      label: 'Detector OOD honesty',
      why: `top_score=${det0.score.toFixed(3)} on ${det0.diameter_mm.toFixed(1)} mm mass — outside 3–30 mm training range. Surfaced inline, not buried.`,
    },
  ],
  summaryCalls: summary.calls,
} as const;

export type NsclcBoard = typeof nsclcBoard;
