// ============================================================================
// src/data/demos/types.ts
//
// Narrow TS types matching the shape of the three demo spec JSONs vendored
// under this directory. Types are the ONLY layer that reshapes the JSON;
// everything else in the demo pipeline treats these fields as verbatim.
//
// SOURCE OF TRUTH:
//   /mnt/user-uploads/demo_index.json         (mirrored here as demo_index.json)
//   /mnt/user-uploads/demo_patient_spec.json  (mirrored here as demo_patient_spec.json)
//   /mnt/user-uploads/demo_pharma_spec.json   (mirrored here as demo_pharma_spec.json)
//   /mnt/user-uploads/demo_tumor_board_spec.json (mirrored here as demo_tumor_board_spec.json)
//
// Byte-identical vendoring is enforced by scripts/demos/freeze-manifest.mjs
// against manifest.frozen.json.
// ============================================================================

// ── shared primitives ──────────────────────────────────────────────────────

export type GovernanceStatus =
  | 'validated'
  | 'in_development'
  | 'mechanistic_hypothesis';

export type EvidenceGrade =
  | 'VERIFIED'
  | 'PEER-REVIEWED'
  | 'MECHANISTIC HYPOTHESIS';

export type DemoPersona = 'patient' | 'pharma' | 'hospital';

export interface RoadmapItem {
  capability: string;
  description: string;
  status: GovernanceStatus;
  note: string;
}

export interface GovernanceLabels {
  validated: string;
  in_development: string;
  mechanistic_hypothesis: string;
}

// ── stage-level data payloads ──────────────────────────────────────────────
// One interface per `data_shown.type`. Every stage renders through one of
// these; unknown types render as a generic fallback (which must NOT ship).

export interface PatientProfileItem {
  label: string;
  value: string;
  source: string;
  what_it_means?: string;
}

export interface PatientProfileSummary {
  type: 'patient_profile_summary';
  items: PatientProfileItem[];
  completeness_score: number;
  completeness_explanation: string;
}

export interface BiomarkerIntelligenceEntry {
  marker: string;
  result: string;
  what_it_means: string;
  treatments_connected: string;
  questions_to_ask: string;
}

export interface BiomarkerIntelligence {
  type: 'biomarker_intelligence';
  biomarkers: BiomarkerIntelligenceEntry[];
}

export interface TrialMatchExample {
  trial_type: string;
  why_it_matches: string;
  eligibility: string;
  status: string;
}

export interface TrialMatching {
  type: 'trial_matching';
  how_it_works: string;
  what_you_see: string[];
  example_matches: TrialMatchExample[];
  note: string;
}

export interface TherapyFitCategory {
  category: string;
  examples: string;
  fit_for_this_patient: string;
  next_steps: string;
}

export interface TherapyFit {
  type: 'therapy_fit';
  how_it_works: string;
  categories: TherapyFitCategory[];
}

export interface ResistanceMechanismPatient {
  mechanism: string;
  probability: string;
  what_it_means: string;
  backup_plan: string;
}

export interface ResistanceForecastPatient {
  type: 'resistance_forecast';
  how_it_works: string;
  example: {
    treatment: string;
    likely_resistance_mechanisms: ResistanceMechanismPatient[];
    strategic_implication: string;
  };
  note: string;
}

export interface CarePlanSection {
  section: string;
  content: string;
}

export interface CarePlanSummary {
  type: 'care_plan_summary';
  sections: CarePlanSection[];
  what_you_can_do: string[];
}

// ── pharma-specific payloads ──────────────────────────────────────────────

export interface StatCalloutItem {
  label: string;
  value: string;
  context: string;
}

export interface StatCallout {
  type: 'stat_callout';
  items: StatCalloutItem[];
}

export interface MechanismProfile {
  type: 'mechanism_profile';
  drug: string;
  mechanism_summary: string;
  primary_pathway: string;
  secondary_pathways: string[];
}

export interface RankingTreatment {
  name: string;
  type: string;
  mean_fit: number;
}

export interface RankingOverview {
  type: 'ranking_overview';
  cohort: string;
  n_patients: number;
  n_treatments_compared: number;
  treatments: RankingTreatment[];
  overall_result: string;
  rank_distribution: Record<string, number>;
}

export interface SubgroupComparisonRow {
  name: string;
  n: number;
  stc1010_mean_fit: number;
  stc1010_ranks_first: string;
  recall_at_3: number;
  mean_rank: string;
  delta_vs_best: number;
  interpretation: string;
}

export interface SubgroupComparison {
  type: 'subgroup_comparison';
  subgroups: SubgroupComparisonRow[];
  key_metric: string;
  clinical_anchor: string;
}

export interface AxisContribution {
  type: 'axis_contribution';
  explanation: string;
  crossover_point: string;
  pathway_comparison: Record<string, string>;
}

export interface TrialDecodeProgram {
  name: string;
  trials: number;
  status: 'validated' | 'roadmap';
}

export interface Ceacam5FailureMode {
  domain: string;
  trial: string;
  finding: string;
  source: string;
}

export interface TrialDecodeSummary {
  type: 'trial_decode_summary';
  total_trials_decoded: number;
  programs: TrialDecodeProgram[];
  ceacam5_failure_modes: Ceacam5FailureMode[];
  ceacam5_key_finding: string;
}

export interface StrategicRecommendationEntry {
  priority: number;
  action: string;
  rationale: string;
  status: GovernanceStatus | 'validated';
}

export interface StrategicRecommendation {
  type: 'strategic_recommendation';
  recommendations: StrategicRecommendationEntry[];
  clinical_anchor: string;
}

// ── tumor-board-specific payloads ─────────────────────────────────────────

export interface CaseOverviewPatientSummary {
  age: number;
  sex: string;
  diagnosis: string;
  stage: string;
  prior_treatment: string;
  disease_burden: string;
  key_biomarkers: Record<string, string>;
  germline: string;
  missing_data: string[];
}

export interface CaseOverview {
  type: 'case_overview';
  patient_summary: CaseOverviewPatientSummary;
  run_metadata: {
    analysis_levels_available: string[];
    current_level: string;
    efficacy_mode: string;
  };
}

export interface DataReadinessTest {
  test: string;
  unlocks: string;
  priority: string;
  clinical_impact: string;
}

export interface DataReadiness {
  type: 'data_readiness';
  completeness_score: number;
  confidence_cap: string;
  missing_tests: DataReadinessTest[];
  recommendation: string;
}

export interface DrugRankingDrug {
  name: string;
  fit_rationale: string;
  blocking_factor: string;
  estimated_fit: string;
}

export interface DrugRankingTier {
  tier: string;
  drugs: DrugRankingDrug[];
}

export interface DrugRanking {
  type: 'drug_ranking';
  how_it_works: string;
  ranking_categories: DrugRankingTier[];
  ranking_note: string;
}

export interface ResistanceMechanismTumorBoard {
  mechanism: string;
  likelihood: string;
  biology: string;
  monitoring: string;
  backup_strategy: string;
}

export interface ResistanceForecastEntryTumorBoard {
  drug: string;
  resistance_mechanisms: ResistanceMechanismTumorBoard[];
  strategic_implication: string;
}

export interface ResistanceForecastTumorBoard {
  type: 'resistance_forecast';
  forecasts: ResistanceForecastEntryTumorBoard[];
}

export interface SyntheticLethalityPair {
  tumor_mutation: string;
  potential_vulnerability: string;
  drug_class: string;
  evidence_level: string;
  requires: string;
}

export interface SyntheticLethality {
  type: 'synthetic_lethality';
  how_it_works: string;
  current_status: string;
  potential_pairs: SyntheticLethalityPair[];
  what_unlocks_it: string;
}

export interface EvidenceVaultItem {
  category: string;
  items: string;
}

export interface EvidenceVault {
  type: 'evidence_vault';
  what_it_contains: EvidenceVaultItem[];
  traceability: string;
  export_options: string;
}

export interface StrategicPriorityCategory {
  priority: number;
  category: string;
  actions: string[];
}

export interface StrategicPriorities {
  type: 'strategic_priorities';
  priorities: StrategicPriorityCategory[];
  bottom_line: string;
}

// ── union + stage ─────────────────────────────────────────────────────────

export type DemoStageData =
  | PatientProfileSummary
  | BiomarkerIntelligence
  | TrialMatching
  | TherapyFit
  | ResistanceForecastPatient
  | ResistanceForecastTumorBoard
  | CarePlanSummary
  | StatCallout
  | MechanismProfile
  | RankingOverview
  | SubgroupComparison
  | AxisContribution
  | TrialDecodeSummary
  | StrategicRecommendation
  | CaseOverview
  | DataReadiness
  | DrugRanking
  | SyntheticLethality
  | EvidenceVault
  | StrategicPriorities;

export interface DemoStage {
  stage_id: number;
  name: string;
  plain_language: string;
  data_shown: DemoStageData;
  status: GovernanceStatus;
  evidence_grade: EvidenceGrade;
}

// ── demo-level ────────────────────────────────────────────────────────────

interface DemoSpecBase {
  demo_id: string;
  persona: DemoPersona;
  title: string;
  subtitle: string;
  governance_mode: 'clean_plus_roadmap';
  stages: DemoStage[];
  roadmap_items: RoadmapItem[];
  governance_labels: GovernanceLabels;
}

export interface PatientDemoSpec extends DemoSpecBase {
  persona: 'patient';
  patient_context: {
    display_name: string;
    cancer_type: string;
    stage: string;
    key_biomarkers: Record<string, string>;
    treatment_history: string[];
    data_sources: string;
  };
}

export interface PharmaDemoSpec extends DemoSpecBase {
  persona: 'pharma';
  data_sources: {
    primary: string;
    formula: string;
    trial_decode_registry: string;
    ceacam5_corpus: string;
  };
}

export interface TumorBoardDemoSpec extends DemoSpecBase {
  persona: 'hospital';
  case_context: {
    patient: string;
    cancer: string;
    situation: string;
    key_question: string;
    data_completeness: string;
  };
}

export type DemoSpec = PatientDemoSpec | PharmaDemoSpec | TumorBoardDemoSpec;

// ── demo index ────────────────────────────────────────────────────────────

export interface DemoIndexEntry {
  file: string;
  title: string;
  stages: number;
  roadmap_items: number;
  key_data: string;
}

export interface DemoIndex {
  description: string;
  governance_mode: 'clean_plus_roadmap';
  language: string;
  demos: {
    pharma: DemoIndexEntry;
    patient: DemoIndexEntry;
    tumor_board: DemoIndexEntry;
  };
}
