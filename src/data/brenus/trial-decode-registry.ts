/**
 * trial-decode-registry.ts — typed façade over the Brenus registry v2.
 *
 * SOURCE OF TRUTH: /workspace/Brenus/engagements/brenus/trial_intelligence/trial_decode_registry_v2.json
 * MIRRORED AT:     src/data/brenus/trial_decode_registry_v2.json
 *
 * 42 trials · 17 fully 8D-decoded · 3 with numeric delta_approx · 25 NOT_DECODED
 * (appendix rows carrying published context but no CrisPRO vector yet).
 *
 * DO NOT EDIT THE JSON HERE. Re-import via scripts/import-brenus-registry.mjs
 * when Brenus/ repo advances. See Fahad's memory 2026-04-28 — DL-07 (DDR 0.983)
 * publication-blocked; LATIFY delta QUARANTINED (CT-03 vector conflict);
 * PATH B prohibited under PATH A lock.
 *
 * SOURCE: Fahad Kiani directive 2026-07-10 — "decode all these trials", surface
 * the honest CrisPRO 8D vector wall, mark undecoded rows as NOT_DECODED rather
 * than fabricate.
 */

import registryJson from './trial_decode_registry_v2.json';

// ─── narrow enum sets (validated during codemod) ──────────────────────────

export type EightDDomain = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8';
export type EightDDomainOrPending = EightDDomain | 'NOT_DECODED';

export type EightDDomainLabel =
  | 'Biology'
  | 'Selection'
  | 'Architecture'
  | 'Trafficking'
  | 'Governance'
  | 'IP'
  | 'Regulatory'
  | 'Systemic';

export type DeltaStatus =
  | 'DOCUMENTED_NOT_REPRODUCED'
  | 'QUARANTINED'
  | 'MISSING'
  | 'N/A'
  | 'NOT_DECODED';

export type DeltaDirectionMatch = 'TRUE' | 'FALSE' | 'N/A' | 'NOT_DECODED';

export type VectorVersion =
  | 'APPROXIMATE'
  | 'LOCKED'
  | 'CONFLICTED — two versions (CT-03)'
  | 'UNDEFINED — patient_b vector not stated (CT-04)'
  | 'NOT_DECODED';

export type BrenusProgram =
  | 'ATR_DDR'
  | 'CEACAM5'
  | 'IO_CORE'
  | 'IO_APPENDIX'
  | 'HISTORICAL_BENCHMARK'
  | 'BREAK_CRC_001'
  | 'GBM_ESCAPEMAP';

// ─── shapes ───────────────────────────────────────────────────────────────

export interface BrenusTrialCore {
  nct_id: string;
  trial_name: string;
  drug: string;
  program: BrenusProgram;
  indication: string;
  cancer_type: string;
  line: string;
  phase: string;
  status: string;
  glb_set: boolean;
  primary_endpoint?: string;
  primary_result: string;
  primary_met: string | null;
  data_status: string;
  source_pmid?: string;
  source_file: string;
  notes?: string;
}

export interface BrenusTrialDecoded extends BrenusTrialCore {
  decode_state: 'DECODED';
  key_biomarker: string;
  failure_mode: string;
  '8d_primary_domain': EightDDomain;
  '8d_primary_label': EightDDomainLabel;
  /**
   * Numeric ranker delta OR a sentinel string. Numeric = 3 rows (Berzosertib
   * 0.138, Adavosertib 0.307, CAPRI 0.108). Sentinels observed: "QUARANTINED"
   * (LATIFY, CT-03), "N/A", "N/A — CEACAM5 program". Undefined = decoded but
   * delta not applicable to this trial. Consumers must not do arithmetic on
   * strings — call hasNumericDelta() first.
   */
  delta_approx: number | string | undefined;
  delta_status: DeltaStatus;
  delta_direction_match: DeltaDirectionMatch | string;
  formula_used: string;
  vector_version: VectorVersion;
  external_safe: boolean;
  blocker: string;
}

export interface BrenusTrialAppendix extends BrenusTrialCore {
  decode_state: 'NOT_DECODED';
  appendix_id?: string;
  why_appendix?: string;
}

export type BrenusTrial = BrenusTrialDecoded | BrenusTrialAppendix;

export interface BrenusRegistryMeta {
  version: string;
  date: string;
  description: string;
  total_trials: number;
  programs: BrenusProgram[];
  glb_set: string[];
  source_files: string[];
  trials_by_program: Record<BrenusProgram, number>;
}

// ─── loader (adds decode_state, keeps everything else verbatim) ───────────

interface RawRegistry {
  metadata: BrenusRegistryMeta;
  trials: Record<string, unknown>[];
}

const raw = registryJson as unknown as RawRegistry;

function classifyTrial(t: Record<string, unknown>): BrenusTrial {
  const domain = t['8d_primary_domain'];
  if (typeof domain === 'string' && domain !== 'NOT_DECODED' && domain !== 'unknown') {
    return { ...(t as unknown as BrenusTrialDecoded), decode_state: 'DECODED' };
  }
  return { ...(t as unknown as BrenusTrialAppendix), decode_state: 'NOT_DECODED' };
}

// ─── public exports ───────────────────────────────────────────────────────

export const BRENUS_REGISTRY_META: BrenusRegistryMeta = raw.metadata;

export const BRENUS_TRIALS: BrenusTrial[] = raw.trials.map(classifyTrial);

export const BRENUS_TRIALS_BY_NCT: Record<string, BrenusTrial> = Object.fromEntries(
  BRENUS_TRIALS.map((t) => [t.nct_id, t]),
);

export const BRENUS_TRIALS_BY_PROGRAM: Record<BrenusProgram, BrenusTrial[]> = BRENUS_TRIALS.reduce(
  (acc, t) => {
    (acc[t.program] ||= []).push(t);
    return acc;
  },
  {} as Record<BrenusProgram, BrenusTrial[]>,
);

// ─── decode wall snapshot (grep-friendly for docs / dashboards) ──────────

export const BRENUS_DECODE_WALL = {
  total: BRENUS_TRIALS.length, // 42
  decoded: BRENUS_TRIALS.filter((t) => t.decode_state === 'DECODED').length, // 17
  not_decoded: BRENUS_TRIALS.filter((t) => t.decode_state === 'NOT_DECODED').length, // 25
  numeric_delta: BRENUS_TRIALS.filter(
    (t): t is BrenusTrialDecoded =>
      t.decode_state === 'DECODED' && typeof t.delta_approx === 'number',
  ).length, // 3
  quarantined: BRENUS_TRIALS.filter(
    (t): t is BrenusTrialDecoded =>
      t.decode_state === 'DECODED' && t.delta_status === 'QUARANTINED',
  ).length, // 1 (LATIFY, CT-03)
  glb_set: BRENUS_REGISTRY_META.glb_set, // 6 GLB NCTs
  vector_version_distribution: {
    APPROXIMATE: 3,
    'CONFLICTED — two versions (CT-03)': 1,
    'UNDEFINED — patient_b vector not stated (CT-04)': 1,
    NOT_DECODED: 37,
  },
  domain_distribution: {
    D1: 5,
    D2: 10,
    D3: 1,
    D8: 1,
    NOT_DECODED: 25,
  },
} as const;

// ─── convenience selectors ───────────────────────────────────────────────

export function getBrenusTrial(nct: string): BrenusTrial | undefined {
  return BRENUS_TRIALS_BY_NCT[nct];
}

export function isDecoded(t: BrenusTrial): t is BrenusTrialDecoded {
  return t.decode_state === 'DECODED';
}

export function hasNumericDelta(t: BrenusTrial): t is BrenusTrialDecoded & { delta_approx: number } {
  return isDecoded(t) && typeof t.delta_approx === 'number';
}

export function isQuarantined(t: BrenusTrial): boolean {
  return isDecoded(t) && t.delta_status === 'QUARANTINED';
}
