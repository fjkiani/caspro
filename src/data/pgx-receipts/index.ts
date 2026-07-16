/**
 * pgx-receipts — typed façade over the CrisPRO PGx receipt JSONs.
 *
 * SOURCE OF TRUTH:
 *   /workspace/audit/crispro/publications/05-pgx-dosing-guidance/reports/*.json
 *   /workspace/audit/crispro/publications/05-pgx-dosing-guidance/receipts/nguyen_dpyd_validation.json
 * MIRRORED AT: src/data/pgx-receipts/*.json
 * PROVENANCE: cmp verified — every mirrored JSON is byte-identical to the
 * audit source (2026-07-10).
 *
 * All numeric values (RRR, p-values, cohort n, ratios) come straight from the
 * upstream receipts, NOT recomputed here. Any recompute must happen in the
 * source publication tree and get re-copied.
 *
 * SOURCE: Fahad Kiani directive 2026-07-10 — "PGx dosing page is still slop:
 * core work exists at github.com/fjkiani/crispro/tree/main/publications/
 * 05-pgx-dosing-guidance". This module surfaces those receipts.
 */

import prepareJson from './prepare_outcome_validation.json';
import cyp2c19Json from './cyp2c19_clopidogrel_efficacy_validation.json';
import nguyenJson from './nguyen_dpyd_validation.json';
import cpicJson from './cpic_concordance_report.json';
import tier2Json from './tier2_heuristic_validation_results.json';

// ─── shapes ────────────────────────────────────────────────────────────────

export interface PgxCohortRates {
  toxic_events: number;
  total: number;
  rate: number;
}

export interface PrepareReceipt {
  receipt_type: string;
  source_pmid: string;
  source_pmc: string;
  extraction_method: string;
  study_metadata?: {
    trial_name?: string;
    study_type?: string;
    journal?: string;
    year?: number;
    doi?: string;
  };
  cohort_summary: {
    total_patients: number;
    control_arm: number;
    intervention_arm: number;
    actionable_carriers: number;
    nonactionable_patients: number;
  };
  calculated_metrics: {
    actionable_carriers: {
      control_rate: number;
      intervention_rate: number;
      relative_risk_reduction: number;
      absolute_risk_reduction: number;
      fisher_exact_p: number;
      interpretation?: string;
    };
    nonactionable: {
      control_rate: number;
      intervention_rate: number;
      relative_risk_reduction: number;
      absolute_risk_reduction: number;
      fisher_exact_p: number;
      interpretation?: string;
    };
    overall: {
      control_rate: number;
      intervention_rate: number;
      relative_risk_reduction: number;
      absolute_risk_reduction: number;
      fisher_exact_p: number;
      interpretation?: string;
    };
    signal_localization?: {
      value: number;
      interpretation?: string;
    };
  };
  validation_status: string;
}

export interface Cyp2c19Receipt {
  receipt_type: string;
  source_pmid: string;
  source_pmc: string;
  cohort_summary: {
    clopidogrel_treated_subset: number;
    extensive_metabolizer: number;
    poor_intermediate_metabolizer: number;
    endpoint: string;
  };
  raw_table_data: {
    Table_2_clopidogrel_by_genotype: {
      extensive_metabolizer: PgxCohortRates;
      poor_intermediate_metabolizer: PgxCohortRates;
    };
  };
  calculated_metrics: {
    risk_ratio: {
      pm_im_vs_em: number;
      calculation: string;
      interpretation: string;
    };
    statistical_significance: {
      fisher_exact_p: number;
      scientific_notation: string;
      interpretation: string;
    };
    reported_multivariate_hr: {
      hazard_ratio: number;
      confidence_interval: string;
      source: string;
    };
  };
  validation_status: string;
}

export interface NguyenReceipt {
  study_metadata: {
    pmid: string;
    pmc?: string;
    doi?: string;
    first_author?: string;
    title?: string;
    journal: string;
    year: number;
    volume?: number;
    article_id?: string;
    study_type?: string;
    setting?: string;
    study_period?: string;
  };
  cohort_characteristics: {
    total_genotyped?: number;
    outcomes_cohort?: number;
    median_age?: number;
    gi_malignancies_pct?: number;
    colorectal_cancer_pct?: number;
    stage_iv_pct?: number;
  };
  outcomes_data: {
    wild_type: {
      n: number;
      grade3_toxicity_n: number;
      grade3_toxicity_pct: number;
      hospitalization_n: number;
      hospitalization_pct: number;
    };
    pretreatment_screening: {
      n: number;
      grade3_toxicity_n: number;
      grade3_toxicity_pct: number;
      hospitalization_n: number;
      hospitalization_pct: number;
      upfront_dose_reduction_pct?: number;
      mean_rdi_first_cycle?: number;
    };
    reactive_testing: {
      n: number;
      grade3_toxicity_n: number;
      grade3_toxicity_pct: number;
      hospitalization_n: number;
      hospitalization_pct: number;
      started_full_dose_pct?: number;
    };
  };
  statistical_results?: Record<string, unknown>;
}

export interface CpicConcordanceReport {
  total_cases: number;
  cases_with_cpic_match: number;
  concordance_rate: number;
  strict_concordance_rate: number;
  exact_matches: number;
  conservative_matches: number;
  less_conservative: number;
  by_gene: Record<string, { total: number; concordant: number; concordance_rate: number }>;
  concordance_results: Array<{
    case_id: string;
    gene: string;
    variant: string;
    drug: string;
    cpic_phenotype: string;
    cpic_recommendation: string;
    our_recommendation: string;
    concordant: boolean;
    match_type: string;
    cpic_source?: string;
    cpic_pmid?: string;
  }>;
}

// A CI is expressed in the receipt as {value, 95_ci_lower, 95_ci_upper, formula}.
// TS keys starting with a digit require quoting.
export interface Tier2CiMetric {
  value: number;
  '95_ci_lower': number;
  '95_ci_upper': number;
  formula: string;
}

export interface Tier2Validation {
  validation_date?: string;
  rules_version?: string;
  total_cases: number;
  performance_metrics: {
    total_cases: number;
    scorable_cases: number;
    indeterminate_cases: number;
    tp: number;
    tn: number;
    fp: number;
    fn: number;
    sensitivity: Tier2CiMetric;
    specificity: Tier2CiMetric;
    ppv: Tier2CiMetric;
    npv: Tier2CiMetric;
    accuracy: Tier2CiMetric;
  };
}

// ─── exported receipts ────────────────────────────────────────────────────

export const PREPARE_RECEIPT: PrepareReceipt = prepareJson as unknown as PrepareReceipt;
export const CYP2C19_RECEIPT: Cyp2c19Receipt = cyp2c19Json as unknown as Cyp2c19Receipt;
export const NGUYEN_RECEIPT: NguyenReceipt = nguyenJson as unknown as NguyenReceipt;
export const CPIC_CONCORDANCE: CpicConcordanceReport = cpicJson as unknown as CpicConcordanceReport;
export const TIER2_VALIDATION: Tier2Validation = tier2Json as unknown as Tier2Validation;

// ─── CI helper — turns {95_ci_lower, 95_ci_upper} into "X.XX–X.XX" strings ──

export function formatTier2Ci(metric: Tier2CiMetric): string {
  const lo = metric['95_ci_lower'].toFixed(3);
  const hi = metric['95_ci_upper'].toFixed(3);
  return `${lo}–${hi}`;
}

// ─── grep-friendly headline snapshot ─────────────────────────────────────

export const PGX_HEADLINE_METRICS = {
  prepare: {
    total_patients: PREPARE_RECEIPT.cohort_summary.total_patients, // 563
    actionable_rrr: PREPARE_RECEIPT.calculated_metrics.actionable_carriers.relative_risk_reduction, // 0.831
    actionable_p: PREPARE_RECEIPT.calculated_metrics.actionable_carriers.fisher_exact_p, // 0.054
    nonactionable_rrr: PREPARE_RECEIPT.calculated_metrics.nonactionable.relative_risk_reduction,
    nonactionable_p: PREPARE_RECEIPT.calculated_metrics.nonactionable.fisher_exact_p,
    source_pmid: PREPARE_RECEIPT.source_pmid, // 39641926
  },
  cyp2c19: {
    total: CYP2C19_RECEIPT.cohort_summary.clopidogrel_treated_subset, // 210
    pm_im_n: CYP2C19_RECEIPT.cohort_summary.poor_intermediate_metabolizer, // 104
    em_n: CYP2C19_RECEIPT.cohort_summary.extensive_metabolizer, // 106
    risk_ratio: CYP2C19_RECEIPT.calculated_metrics.risk_ratio.pm_im_vs_em, // 4.28
    p_value: CYP2C19_RECEIPT.calculated_metrics.statistical_significance.fisher_exact_p, // 0.00067
    p_value_scientific: CYP2C19_RECEIPT.calculated_metrics.statistical_significance.scientific_notation, // "6.7×10⁻⁴"
    hazard_ratio: CYP2C19_RECEIPT.calculated_metrics.reported_multivariate_hr.hazard_ratio, // 5.26
    hr_ci: CYP2C19_RECEIPT.calculated_metrics.reported_multivariate_hr.confidence_interval, // 1.87-14.56
    source_pmid: CYP2C19_RECEIPT.source_pmid, // 40944685
  },
  nguyen: {
    outcomes_cohort: NGUYEN_RECEIPT.cohort_characteristics.outcomes_cohort ?? 442, // 442
    wt_n: NGUYEN_RECEIPT.outcomes_data.wild_type.n, // 415
    wt_g3: NGUYEN_RECEIPT.outcomes_data.wild_type.grade3_toxicity_pct, // 30.4
    wt_hosp: NGUYEN_RECEIPT.outcomes_data.wild_type.hospitalization_pct, // 12.8
    pre_n: NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.n, // 16
    pre_g3: NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.grade3_toxicity_pct, // 31.3
    pre_hosp: NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.hospitalization_pct, // 25
    react_n: NGUYEN_RECEIPT.outcomes_data.reactive_testing.n, // 11
    react_g3: NGUYEN_RECEIPT.outcomes_data.reactive_testing.grade3_toxicity_pct, // 63.6
    react_hosp: NGUYEN_RECEIPT.outcomes_data.reactive_testing.hospitalization_pct, // 63.6
    source_pmid: NGUYEN_RECEIPT.study_metadata.pmid, // 38935897
  },
  cpic: {
    matched: CPIC_CONCORDANCE.cases_with_cpic_match, // 10
    concordance_rate: CPIC_CONCORDANCE.concordance_rate, // 1.0
    strict_concordance_rate: CPIC_CONCORDANCE.strict_concordance_rate, // 1.0
    exact_matches: CPIC_CONCORDANCE.exact_matches, // 10
  },
  tier2: {
    scorable: TIER2_VALIDATION.performance_metrics.scorable_cases, // 16
    tp: TIER2_VALIDATION.performance_metrics.tp, // 6
    fn: TIER2_VALIDATION.performance_metrics.fn, // 0
    sensitivity: TIER2_VALIDATION.performance_metrics.sensitivity.value, // 1.0
    specificity: TIER2_VALIDATION.performance_metrics.specificity.value, // 0.1
    sensitivity_ci: formatTier2Ci(TIER2_VALIDATION.performance_metrics.sensitivity), // "0.541–1.000"
    specificity_ci: formatTier2Ci(TIER2_VALIDATION.performance_metrics.specificity), // "0.003–0.445"
  },
} as const;
