/**
 * Vendored ranker types — CRC PATH A ranker v1.
 *
 * Source of truth: fjkiani/Brenus @ c2d90b6, path `data/ranker_results/`.
 * Do not hand-edit these fields — they mirror `crc_ranker_summary_v1.json`
 * verbatim so `manifest.frozen.json` drift detection works.
 */

export interface CrcRankerMeta {
  run_date: string; // e.g. "2026-07-05"
  formula: string; // "PATH A (locked 2026-04-28): fit = clip((p·t) / ‖t‖₂, 0, 1)"
  vector_version: string; // "8D.v1"
  cohort: string;
  trial_set: string;
  eligibility_score: number;
  alpha: number;
  beta: number;
}

export interface CrcRankerSubgroup {
  n: number;
  stc1010_mean_fit: number;
  stc1010_median_fit?: number;
  best_comparator?: string;
  best_comp_mean_fit?: number;
  delta_mean: number;
  delta_median?: number;
  recall_at_3: number;
  mrr: number;
  rank_1_rate: number;
  rank_distribution?: Record<string, number>;
  threshold?: string; // present on TMB subgroups
}

export interface CrcRankerAxisContribution {
  mean_contribution: number;
  pct_of_dot_product: number;
}

export interface CrcRankerHrdSubgroup {
  n: number;
  stc1010_mean_fit: number;
  delta_mean: number;
  recall_at_3: number;
  interpretation?: string;
}

export interface CrcRankerSummary {
  meta: CrcRankerMeta;
  unselected_mss: CrcRankerSubgroup;
  high_tmb_subgroup: CrcRankerSubgroup;
  tmb_ge10_subgroup: CrcRankerSubgroup;
  axis_contributions_unselected: Record<
    'ddr' | 'mapk' | 'pi3k' | 'vegf' | 'her2' | 'io' | 'efflux' | 'rss',
    CrcRankerAxisContribution
  >;
  hrd_subgroups: {
    'HRD-Low': CrcRankerHrdSubgroup;
    'HRD-Intermediate': CrcRankerHrdSubgroup;
    'HRD-High': CrcRankerHrdSubgroup;
  };
  interpretation?: Record<string, string>;
  governance_note?: string | Record<string, unknown>;
}

/** Single row of the per-patient CSV. */
export interface CrcRankerRow {
  patient_id: string;
  tmb: number;
  hrd_proxy: number;
  aneuploidy_score: number;
  stc1010_fit: number;
  stc1010_combined: number;
  stc1010_rank: number;
  best_comparator: string;
  best_comp_fit: number;
  fit_STC_1010: number;
  fit_MOSAIC: number;
  fit_N0147: number;
  fit_PRIME: number;
  fit_PEAK_FOLFIRI: number;
  fit_PACCE: number;
  fit_HORIZON_III: number;
  fit_VELOUR: number;
  rank_STC_1010: number;
  rank_MOSAIC: number;
  rank_N0147: number;
  rank_PRIME: number;
  rank_PEAK_FOLFIRI: number;
  rank_PACCE: number;
  rank_HORIZON_III: number;
  rank_VELOUR: number;
  best_comp_fit_actual: number;
  best_comp_name: string;
}

/** Static receipt metadata surfaced next to any rendered stat. */
export const crcRankerReceipt = {
  sourceRepo: 'fjkiani/Brenus',
  commit: 'c2d90b6',
  commitMessage: 'Governance reconciliation v2 — retire 0.7375, resolve Berzosertib, exclude NCT02264678',
  sourcePath: 'data/ranker_results/',
  runDate: '2026-07-05',
  formula: 'PATH A (locked 2026-04-28): fit = clip((p·t) / ‖t‖₂, 0, 1)',
  vectorVersion: '8D.v1',
  cohort: 'TCGA COADREAD MSS (n=485)',
  trialSet: 'STC-1010 + 7 PDS escape-class comparators',
  alpha: 0.7,
  beta: 0.3,
  eligibilityScore: 0.75,
} as const;
