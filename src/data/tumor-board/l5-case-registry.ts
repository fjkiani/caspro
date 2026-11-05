/**
 * Oncology Arbiter E2E cases — scientist-monai-moat @ e2aa31a
 * (feat/tumor-board-frontend-spec).
 *
 * These are live pipeline transcripts + UI, not apologetic placeholders.
 * NSCLC: CT → MONAI RetinaNet → heuristic → NCCN-lite → co-scientist → Elo.
 * AK: manuscript-anchored TumorBoardBundle validate + honesty gate + Elo audit sort.
 */

import akSummary from '@/data/tumor-board/frontend-spec/ak_mbd4_lof/receipts/99_transcript_summary.json';
import nsclcSummary from '@/data/tumor-board/frontend-spec/nsclc_luna16/receipts/99_transcript_summary.json';

export const L5_CONTRACT_VERSION = '2.0.0-two-case' as const;
export const L5_SOURCE_COMMIT = 'e2aa31a' as const;
export const L5_SOURCE_BRANCH = 'feat/tumor-board-frontend-spec' as const;
export const L5_SOURCE_REPO = 'https://github.com/fjkiani/scientist-monai-moat' as const;

export type L5CaseId = 'ak_mbd4_lof' | 'nsclc_luna16';

export type L5CaseEntry = {
  id: L5CaseId;
  href: string;
  pipelineHref: string;
  /** Track-B patient walker twin when the same biology has a board shell. */
  boardHref?: string;
  label: string;
  cancerType: string;
  headline: string;
  pipeline: string;
  modelState: string;
  role: string;
  summary: typeof akSummary | typeof nsclcSummary;
};

export const L5_WIRED_CASES: Record<L5CaseId, L5CaseEntry> = {
  nsclc_luna16: {
    id: 'nsclc_luna16',
    href: '/tumor-board/receipts/nsclc_luna16/',
    pipelineHref: '/tumor-board/frontend-spec/nsclc_luna16/mockup.html',
    boardHref: '/tumor-board/nsclc/',
    label: 'NSCLC · LUNA16 E2E',
    cancerType: 'NSCLC',
    headline: 'CT bytes → ranked workup in one pipeline run',
    pipeline:
      'L1 ingest → L2 MONAI lung_nodule_ct_detection → L3 lung heuristic → L4 NCCN-lite → L5 co-scientist + Elo',
    modelState: 'loaded_luna16_retinanet',
    role: 'end_to_end_reasoning',
    summary: nsclcSummary,
  },
  ak_mbd4_lof: {
    id: 'ak_mbd4_lof',
    href: '/tumor-board/receipts/ak_mbd4_lof/',
    pipelineHref: '/tumor-board/frontend-spec/ak_mbd4_lof/mockup.html',
    boardHref: '/tumor-board/AK/',
    label: 'AK · MBD4-LOF',
    cancerType: 'Ampullary / HGSOC-like · MBD4-LOF',
    headline: 'Manuscript-locked evidence matrix → contract validate → Elo audit sort',
    pipeline:
      'GET sample → POST /v1/tumor_board/bundle (loaded_ak_bundle) → POST /v1/elo/rank with manuscript weights',
    modelState: 'loaded_ak_bundle',
    role: 'manuscript_anchored_ingestion',
    summary: akSummary,
  },
};

export function getL5Case(caseId: string): L5CaseEntry | null {
  if (caseId in L5_WIRED_CASES) {
    return L5_WIRED_CASES[caseId as L5CaseId];
  }
  return null;
}

export function listWiredL5Cases() {
  return Object.values(L5_WIRED_CASES);
}

/** PatientId → E2E case twin (Track B shell ↔ pipeline receipt). */
const PATIENT_TO_L5: Partial<Record<string, L5CaseId>> = {
  AK: 'ak_mbd4_lof',
  AK01: 'ak_mbd4_lof',
};

export function getL5TwinForPatient(patientId: string): L5CaseEntry | null {
  const id = PATIENT_TO_L5[patientId];
  return id ? L5_WIRED_CASES[id] : null;
}
