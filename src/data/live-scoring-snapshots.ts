import crcSummary from '@/data/pharma/crc-ranker-v1/crc_ranker_summary_v2_gated.json';
import { clinicalCaseByIdFromReceipts, loadCrcReceiptMeters } from '@/data/clinical-evidence-from-receipts';
import type { ClinicalCaseId } from '@/data/clinical-case-ui-types';
import { AK_BUNDLE_META } from '@/data/tumor-board/ak-l1-bundle';
import {
  THERAPY_FIT_AK_SNAPSHOT,
  THERAPY_FIT_GATE5_META,
  type TherapyFitAkScenario,
} from '@/data/ayesha/therapy-fit-bundle-fixtures';
import pillarDoor2 from '@/data/ayesha/pillar_e_door2_11_oof_receipt.json';
import { loadAlwaysNavitoclaxObserved, loadMyelomaReceiptMeters } from '@/data/clinical-evidence-from-receipts';
import { RANKER_8D_AK_OVARIAN } from '@/data/live-ranker-8d-fixtures';
import { SAE_BRCA1_VARIANT_REQUEST } from '@/data/live-sae-fixtures';

const DEMO_PATIENT: Record<ClinicalCaseId, string> = {
  ovarian: 'AK',
  myeloma: 'MM_DEMO',
  crc: 'CRC01',
  lung: 'NSCLC',
};

export function therapyFitSnapshot(
  caseId: ClinicalCaseId,
  akScenario: TherapyFitAkScenario = 'day0',
) {
  const card = clinicalCaseByIdFromReceipts(caseId);

  if (caseId === 'ovarian') {
    const gate = THERAPY_FIT_AK_SNAPSHOT[akScenario];
    return {
      contract: 'verified_snapshot',
      scenario: akScenario,
      patientId: DEMO_PATIENT.ovarian,
      receipt: 'src/data/ayesha/therapy_fit_bundle_gate5_receipt.json',
      gate5Meta: THERAPY_FIT_GATE5_META,
      door_state: gate.door_state,
      ranked_drugs: gate.ranked_drugs,
      contraindicated_blacklist: gate.contraindicated_blacklist,
      bundleMeta: AK_BUNDLE_META,
      prioritize:
        akScenario === 'door2' ? card.prioritize : (card.prioritizeDay0 ?? card.prioritize),
      block: akScenario === 'door2' ? card.block : (card.blockDay0 ?? card.block),
      evidenceRef: card.evidenceTitle,
      evidenceLines:
        akScenario === 'door2'
          ? card.evidenceLines
          : (card.evidenceLinesDay0 ?? card.evidenceLines),
    };
  }

  return {
    contract: 'verified_snapshot',
    patientId: DEMO_PATIENT[caseId],
    prioritize: card.prioritize,
    block: card.block,
    evidenceRef: card.evidenceTitle,
    evidenceLines: card.evidenceLines,
  };
}

export function ranker8dSnapshot(caseId: ClinicalCaseId) {
  if (caseId === 'crc') {
    const crc = loadCrcReceiptMeters();
    return {
      contract: 'verified_snapshot',
      cohort: crcSummary.meta?.cohort,
      vector_version: crcSummary.meta?.vector_version,
      sha256: crcSummary.meta?.sha256?.['crc_ranker_results_v2_gated.csv'],
      meters: crc,
    };
  }
  if (caseId === 'ovarian') {
    const navi = loadAlwaysNavitoclaxObserved();
    return {
      contract: 'verified_snapshot',
      default_upstream_body: RANKER_8D_AK_OVARIAN,
      always_navitoclax_observed: navi,
      pillar_e_door2_meta: pillarDoor2.meta,
    };
  }
  if (caseId === 'myeloma') {
    return {
      contract: 'verified_snapshot',
      myeloma_tier3: loadMyelomaReceiptMeters(),
    };
  }
  const card = clinicalCaseByIdFromReceipts(caseId);
  return {
    contract: 'verified_snapshot',
    caseId,
    prioritize: card.prioritize,
    block: card.block,
  };
}

export function saeSnapshot(caseId: ClinicalCaseId) {
  return {
    contract: 'verified_snapshot',
    caseId,
    patientId: DEMO_PATIENT[caseId],
    default_upstream_body: SAE_BRCA1_VARIANT_REQUEST,
    note: 'POST via BACKEND_API_URL (/api/sae/extract_features) or SAE_SERVICE_URL/extract_features when live.',
  };
}