// ============================================================================
// src/components/demos/labels.ts
//
// Every user-visible string in the demo pages is either (a) a value from the
// vendored JSON specs under src/data/demos/*.json, or (b) one of the static
// UI labels in this file. Anything else fails scripts/demos/check-verbatim.mjs
// at build time.
//
// This file is the allowlist. Add here only if the string is chrome (nav,
// section headings, aria labels, dead-simple UX affordances).
// ============================================================================

export const UI_LABELS = {
  // Chooser
  demos_eyebrow: 'CrisPRO demos',
  demos_title: 'Persona-specific landing demos',
  demos_subtitle:
    'Three demo landing pages showing what CrisPRO actually does for each audience. Every stage is driven by a frozen spec — the text you read is the spec.',
  stages_count: 'stages',
  governance_mode_chip: 'clean_plus_roadmap',
  read_the_demo: 'Read the demo',

  // Walker chrome
  demo_walker_stage_rail_aria: 'Demo stages',
  demo_walker_stage_of: 'Stage',
  demo_walker_of: 'of',
  next_stage: 'Next stage',
  previous_stage: 'Previous stage',

  // Roadmap section
  where_crispro_is_heading: 'Where CrisPRO is heading',
  governance_legend: 'Governance labels',

  // Section headings on stage body
  data_shown_heading: 'What CrisPRO shows',
  evidence_grade_heading: 'Evidence grade',
  status_heading: 'Status',

  // Renderer sub-headings
  completeness_score_label: 'Completeness',
  completeness_explanation_label: 'What this means',
  what_it_means_label: 'What this means',
  source_label: 'Source',
  value_label: 'Value',
  marker_label: 'Marker',
  result_label: 'Result',
  treatments_connected_label: 'Treatments connected',
  questions_to_ask_label: 'Questions to ask',
  how_it_works_label: 'How it works',
  what_you_see_label: 'What you see',
  example_matches_label: 'Example matches',
  trial_type_label: 'Trial type',
  why_it_matches_label: 'Why it matches',
  eligibility_label: 'Eligibility',
  status_label: 'Status',
  note_label: 'Note',
  category_label: 'Category',
  examples_label: 'Examples',
  fit_for_this_patient_label: 'Fit for this patient',
  next_steps_label: 'Next steps',
  treatment_label: 'Treatment',
  likely_resistance_mechanisms_label: 'Likely resistance mechanisms',
  mechanism_label: 'Mechanism',
  probability_label: 'Probability',
  backup_plan_label: 'Backup plan',
  strategic_implication_label: 'Strategic implication',
  section_label: 'Section',
  content_label: 'Content',
  what_you_can_do_label: 'What you can do',

  // Pharma
  cohort_label: 'Cohort',
  n_patients_label: 'n',
  n_treatments_label: 'Treatments compared',
  treatment_name_label: 'Treatment',
  mean_fit_label: 'Mean fit',
  overall_result_label: 'Overall result',
  rank_distribution_label: 'Rank distribution',
  subgroup_label: 'Subgroup',
  n_label: 'n',
  stc1010_mean_fit_label: 'STC-1010 mean fit',
  stc1010_ranks_first_label: 'STC-1010 ranks 1st',
  recall_at_3_label: 'recall@3',
  mean_rank_label: 'Mean rank',
  delta_vs_best_label: 'Δ vs best',
  interpretation_label: 'Interpretation',
  key_metric_label: 'Key metric',
  clinical_anchor_label: 'Clinical anchor',
  drug_label: 'Drug',
  mechanism_summary_label: 'Mechanism',
  primary_pathway_label: 'Primary pathway',
  secondary_pathways_label: 'Secondary pathways',
  crossover_point_label: 'Crossover point',
  pathway_comparison_label: 'Pathway comparison',
  total_trials_decoded_label: 'Total trials decoded',
  programs_label: 'Programs',
  program_name_label: 'Program',
  trials_count_label: 'Trials',
  program_status_label: 'Status',
  domain_label: 'Domain',
  trial_label: 'Trial',
  finding_label: 'Finding',
  key_finding_label: 'Key finding',
  ceacam5_failure_modes_heading: 'CEACAM5 failure modes',
  priority_label: 'Priority',
  action_label: 'Action',
  rationale_label: 'Rationale',
  explanation_label: 'Explanation',
  context_label: 'Context',

  // Tumor board
  age_label: 'Age',
  sex_label: 'Sex',
  diagnosis_label: 'Diagnosis',
  stage_label: 'Stage',
  prior_treatment_label: 'Prior treatment',
  disease_burden_label: 'Disease burden',
  key_biomarkers_label: 'Key biomarkers',
  germline_label: 'Germline',
  missing_data_label: 'Missing data',
  run_metadata_label: 'Run metadata',
  analysis_levels_label: 'Analysis levels',
  current_level_label: 'Current level',
  efficacy_mode_label: 'Efficacy mode',
  confidence_cap_label: 'Confidence cap',
  missing_tests_label: 'Missing tests',
  test_label: 'Test',
  unlocks_label: 'Unlocks',
  clinical_impact_label: 'Clinical impact',
  recommendation_label: 'Recommendation',
  tier_label: 'Tier',
  drugs_label: 'Drugs',
  fit_rationale_label: 'Fit rationale',
  blocking_factor_label: 'Blocking factor',
  estimated_fit_label: 'Estimated fit',
  ranking_note_label: 'Note',
  resistance_forecast_label: 'Resistance forecast',
  resistance_mechanisms_label: 'Resistance mechanisms',
  likelihood_label: 'Likelihood',
  biology_label: 'Biology',
  monitoring_label: 'Monitoring',
  backup_strategy_label: 'Backup strategy',
  current_status_label: 'Current status',
  potential_pairs_label: 'Potential SL pairs',
  tumor_mutation_label: 'Tumor mutation',
  potential_vulnerability_label: 'Potential vulnerability',
  drug_class_label: 'Drug class',
  evidence_level_label: 'Evidence level',
  requires_label: 'Requires',
  what_unlocks_it_label: 'What unlocks it',
  what_it_contains_label: 'What it contains',
  traceability_label: 'Traceability',
  export_options_label: 'Export options',
  bottom_line_label: 'Bottom line',
  actions_label: 'Actions',

  // Roadmap card
  capability_label: 'Capability',
  description_label: 'Description',
  roadmap_status_label: 'Status',

  // Chooser eyebrows
  chooser_eyebrow_patient: 'For patients',
  chooser_eyebrow_pharma: 'For pharma',
  chooser_eyebrow_tumor_board: 'For tumor boards',
  chooser_footer_insilico: 'In-silico trial',
  chooser_footer_sl: 'Synthetic lethality engine',
  chooser_footer_tumor_board: 'Tumor board surface',

  // Sibling links (footer/header on demo pages)
  sibling_patient: 'Patient demo',
  sibling_pharma: 'Pharma demo',
  sibling_tumor_board: 'Tumor board demo',

  // Brand chip
  brand_chip: 'CrisPRO · Demos',
  brand_back_home: '← Home',

  // Route labels (shown in walker header)
  route_label_patient: '/demo/patient',
  route_label_pharma: '/demo/pharma',
  route_label_tumor_board: '/demo/tumor-board',

  // Nav
  demos_nav_link: 'Demos',
} as const;

export type UiLabelKey = keyof typeof UI_LABELS;

// ── governance-status pill colors ─────────────────────────────────────────
// Cyan/emerald = validated, amber = in_development, indigo = mechanistic.
// Matches the tumor-board and SL page palette conventions.

export const GOVERNANCE_STATUS_LABELS = {
  validated: 'Validated',
  in_development: 'In development',
  mechanistic_hypothesis: 'Mechanistic hypothesis',
} as const;

export const EVIDENCE_GRADE_LABELS = {
  VERIFIED: 'Verified',
  'PEER-REVIEWED': 'Peer-reviewed',
  'MECHANISTIC HYPOTHESIS': 'Mechanistic hypothesis',
} as const;
