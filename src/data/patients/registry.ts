/**
 * Patient registry — the single source of truth for which demo patient
 * bundles the tumor-board surface can render, and the summary metadata the
 * picker page displays.
 *
 * Bench numbers come from /mnt/results/spe_audit/w4_pancancer_grid.json.
 * Any coverage change re-derives from that file, not from memory.
 */
import type { PatientBundle } from '../tumor-board/patient-bundle-types';

import { AK01 } from './AK01';
import { OV01 } from './OV01';
import { BR01 } from './BR01';
import { CRC01 } from './CRC01';
import { BM01 } from './BM01';

export const PATIENT_REGISTRY: Record<string, PatientBundle> = {
  AK01,
  OV01,
  BR01,
  CRC01,
  BM01,
};

export const PATIENT_IDS = Object.keys(PATIENT_REGISTRY) as readonly string[];

export function loadPatient(id: string): PatientBundle | null {
  return PATIENT_REGISTRY[id] ?? null;
}

/**
 * Per-tumor bench snapshot — anchored to w4_pancancer_grid.json.
 * Numbers verified 2026-07-10 against the sweep JSON:
 *   ovarian_cancer     n=6 top1=0.167 recall@3=0.583
 *   breast_cancer      n=2 top1=0.500 recall@3=0.500
 *   prostate_cancer    n=2 top1=0.500 recall@3=1.000
 *   melanoma           n=2 top1=0.500 recall@3=0.500
 *   multiple_myeloma   n=1 top1=1.000 recall@3=1.000
 * Colorectal + brain_metastasis + glioblastoma have n=0 in v1.
 */
export type PatientCard = {
  patientId: string;
  displayName: string;
  tumorSubtype: string;
  drivers: string[];
  primarySL: string;
  discoveryOnly: boolean;
  nArchetypes: number;
  top1: number;
  recallAt3: number;
};

export function listPatientCards(): PatientCard[] {
  return PATIENT_IDS.map((id) => {
    const p = PATIENT_REGISTRY[id];
    const c = p.tumorContext;
    const drivers = p.mutations.map((m) => m.gene).slice(0, 3);
    const primarySL = p.recommendedDrugs[0]?.drugName ?? 'not scored';
    // Bench coverage table, hand-verified from pan-cancer grid JSON.
    const bench = perTumorBench(c.cancerType);
    return {
      patientId: p.meta.patientId,
      displayName: p.meta.displayName ?? p.meta.patientId,
      tumorSubtype: c.subtype ?? c.cancerType,
      drivers,
      primarySL,
      discoveryOnly: p.discoveryOnly === true,
      nArchetypes: bench.n,
      top1: bench.top1,
      recallAt3: bench.recallAt3,
    };
  });
}

export function perTumorBench(cancerType: string): {
  n: number;
  top1: number;
  recallAt3: number;
} {
  switch (cancerType) {
    case 'ovarian_cancer':
      return { n: 6, top1: 0.167, recallAt3: 0.583 };
    case 'breast_cancer':
      return { n: 2, top1: 0.5, recallAt3: 0.5 };
    case 'prostate_cancer':
      return { n: 2, top1: 0.5, recallAt3: 1.0 };
    case 'melanoma':
      return { n: 2, top1: 0.5, recallAt3: 0.5 };
    case 'multiple_myeloma':
      return { n: 1, top1: 1.0, recallAt3: 1.0 };
    case 'colorectal_cancer':
    case 'brain_metastasis':
    case 'glioblastoma':
    default:
      return { n: 0, top1: 0, recallAt3: 0 };
  }
}

/**
 * Aggregate for the "pan-cancer overall" caption on cards.
 * v1 sweep: 13 archetypes, but only 11 had expected leaders defined,
 * so top-1 hit rate is 5/11 = 45.5%, not 5/13.
 * Recall@3 is averaged over the 11 with expected leaders.
 */
export const PAN_CANCER_AGGREGATE = {
  nArchetypes: 13,
  nWithExpected: 11,
  top1: 0.4545,
  recallAt3: 0.6667,
  source: '/mnt/results/spe_audit/w4_pancancer_grid.json',
};
