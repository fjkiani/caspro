// ==============================================================================
// KILL CHAIN (L4) — Resistance Intelligence Data Layer
// Source: RESISTANCE_DETECTION_ENGINE.mdc (verified 2026-03-24, 56/56 tests passed)
// Manuscripts: SAE_RESISTANCE, MFAP4, Serial-SAE, KELIM, Timing-Engine
// ZERO hardcoded claims — every value traced to a source artifact
// ==============================================================================

// ─── Resistance Class (12 classes from models.py L25-37) ─────────────────────

export interface ResistanceClass {
  id: string;
  label: string;
  triggerGenes: string[];
  pivotVector: Record<string, number>;     // 7D replacement vector
  pmid: string;                            // evidence receipt
  severity: number;                        // priority rank (1=highest)
  source: string;                          // code receipt
}

export const RESISTANCE_CLASSES: ResistanceClass[] = [
  {
    id: 'BRCA_REVERSION',
    label: 'BRCA Reversion',
    triggerGenes: ['BRCA1', 'BRCA2', 'RAD51C', 'RAD51D', 'PALB2'],
    pivotVector: { ddr: 0.3, mapk: 0.1, pi3k: 0.5, vegf: 0.0, her2: 0.0, io: 0.5, efflux: 0.0 },
    pmid: '30425037',
    severity: 1,
    source: 'vectors.py L47-51',
  },
  {
    id: 'CDK12_TDP',
    label: 'CDK12 Tandem Duplication',
    triggerGenes: ['CDK12'],
    pivotVector: { ddr: 0.1, mapk: 0.1, pi3k: 0.1, vegf: 0.0, her2: 0.0, io: 0.5, efflux: 0.0 },
    pmid: '29906450',
    severity: 2,
    source: 'vectors.py L62-68',
  },
  {
    id: 'CCNE1_AMPLIFICATION',
    label: 'CCNE1 Amplification',
    triggerGenes: ['CCNE1', 'CDK2'],
    pivotVector: { ddr: 0.2, mapk: 0.4, pi3k: 0.1, vegf: 0.3, her2: 0.0, io: 0.0, efflux: 0.0 },
    pmid: '',
    severity: 3,
    source: 'vectors.py L52-56',
  },
  {
    id: 'HR_RESTORATION_NON_REVERSION',
    label: 'HR Restoration (Non-Reversion)',
    triggerGenes: ['TP53BP1', 'SHLD1', 'SHLD2', 'MAD2L2'],
    pivotVector: { ddr: 0.3, mapk: 0.1, pi3k: 0.5, vegf: 0.0, her2: 0.0, io: 0.5, efflux: 0.0 },
    pmid: '23103855',
    severity: 4,
    source: 'vectors.py L81-89',
  },
  {
    id: 'PTEN_LOSS_BYPASS',
    label: 'PTEN Loss Bypass',
    triggerGenes: ['PTEN', 'AKT1', 'PIK3CA'],
    pivotVector: { ddr: 0.1, mapk: 0.1, pi3k: 0.8, vegf: 0.0, her2: 0.0, io: 0.0, efflux: 0.0 },
    pmid: '',
    severity: 5,
    source: 'vectors.py L57-61',
  },
  {
    id: 'LINEAGE_PLASTICITY',
    label: 'Lineage Plasticity',
    triggerGenes: ['RB1', 'TP53'],
    pivotVector: { ddr: 0.1, mapk: 0.1, pi3k: 0.1, vegf: 0.0, her2: 0.0, io: 0.7, efflux: 0.0 },
    pmid: '28059767',
    severity: 6,
    source: 'vectors.py L90-98',
  },
  {
    id: 'NRF2_ACTIVATION',
    label: 'NRF2 Activation',
    triggerGenes: ['KEAP1', 'CUL3', 'RBX1'],
    pivotVector: { ddr: 0.1, mapk: 0.4, pi3k: 0.4, vegf: 0.0, her2: 0.0, io: 0.0, efflux: 0.0 },
    pmid: '25114896',
    severity: 7,
    source: 'vectors.py L69-74',
  },
  {
    id: 'DRUG_UPTAKE_LOSS',
    label: 'Drug Uptake Loss (CTR1)',
    triggerGenes: ['SLC31A1'],
    pivotVector: { ddr: 0.05, mapk: 0.0, pi3k: 0.0, vegf: 0.4, her2: 0.0, io: 0.0, efflux: 0.5 },
    pmid: '32816860',
    severity: 8,
    source: 'vectors.py L75-80',
  },
  {
    id: 'DRUG_EFFLUX',
    label: 'Drug Efflux (MDR1)',
    triggerGenes: ['ABCB1'],
    pivotVector: { ddr: 0.1, mapk: 0.0, pi3k: 0.0, vegf: 0.0, her2: 0.0, io: 0.0, efflux: 0.8 },
    pmid: 'Patch2015',
    severity: 9,
    source: 'vectors.py L99-107',
  },
  {
    id: 'ANTIGEN_PRESENTATION_LOSS',
    label: 'Antigen Presentation Loss',
    triggerGenes: ['B2M', 'HLA-A', 'HLA-B', 'TAP1'],
    pivotVector: { ddr: 0.0, mapk: 0.0, pi3k: 0.0, vegf: 0.0, her2: 0.0, io: 0.8, efflux: 0.0 },
    pmid: 'SadeFeldman2017',
    severity: 10,
    source: 'vectors.py L108-115',
  },
  {
    id: 'SLFN11_SILENCING',
    label: 'SLFN11 Silencing',
    triggerGenes: ['SLFN11'],
    pivotVector: { ddr: 0.1, mapk: 0.0, pi3k: 0.4, vegf: 0.4, her2: 0.0, io: 0.0, efflux: 0.0 },
    pmid: 'Murai2016',
    severity: 11,
    source: 'vectors.py L116-123',
  },
  {
    id: 'UNKNOWN',
    label: 'Unknown Mechanism',
    triggerGenes: [],
    pivotVector: { ddr: 0.4, mapk: 0.1, pi3k: 0.1, vegf: 0.1, her2: 0.0, io: 0.1, efflux: 0.1 },
    pmid: '',
    severity: 12,
    source: 'vectors.py L124-128',
  },
];

// ─── 8 Signal Channels (from models.py L55-101) ─────────────────────────────

export interface SignalChannel {
  id: string;
  label: string;
  shortLabel: string;
  threshold: string;
  classification: 'ACTIVE' | 'BASELINE';
  backendMethod: string;          // policy.py method
  backendLine: string;            // line number receipt
  frontendEvaluator: string;      // signalStateEngine.js function
  testRequired: string;           // what clinical test is needed
  states: string[];               // possible return states
}

export const SIGNAL_CHANNELS: SignalChannel[] = [
  {
    id: 'SIGNAL_CA125_RISING',
    label: 'CA-125 Rising',
    shortLabel: 'CA125',
    threshold: '3 consecutive strictly-rising values',
    classification: 'ACTIVE',
    backendMethod: 'add_ca125(value, date)',
    backendLine: 'policy.py L119',
    frontendEvaluator: 'evaluateCA125()',
    testRequired: 'Serial CA-125 labs',
    states: ['FIRED', 'CLEAR', 'MONITORING', 'NO_DATA'],
  },
  {
    id: 'SIGNAL_HRD_SHIFT',
    label: 'HRD Score Shift',
    shortLabel: 'HRD_Δ',
    threshold: 'Score drop >10 pts from baseline',
    classification: 'ACTIVE',
    backendMethod: 'add_hrd_event(hrd_score, repair_capacity, date)',
    backendLine: 'policy.py L167',
    frontendEvaluator: 'evaluateHRDShift()',
    testRequired: 'HRD assay (Myriad/Foundation)',
    states: ['FIRED', 'MONITORING', 'NO_DATA'],
  },
  {
    id: 'SIGNAL_REPAIR_SHIFT',
    label: 'Repair Capacity Shift',
    shortLabel: 'REPAIR_Δ',
    threshold: 'HR repair capacity change >0.2',
    classification: 'ACTIVE',
    backendMethod: 'add_repair_shift(repair_capacity, date)',
    backendLine: 'policy.py L226',
    frontendEvaluator: 'evaluateRepairShift()',
    testRequired: 'RAD51 foci / functional HR assay',
    states: ['NO_DATA'],
  },
  {
    id: 'SIGNAL_CTDNA_MRD',
    label: 'ctDNA / MRD',
    shortLabel: 'ctDNA',
    threshold: 'Detected/rising or HIGH tier',
    classification: 'ACTIVE',
    backendMethod: 'add_ctdna_signal(detected, tier, trend)',
    backendLine: 'policy.py L138',
    frontendEvaluator: 'evaluateCTDNA()',
    testRequired: 'Liquid biopsy',
    states: ['FIRED', 'CLEAR', 'NO_DATA'],
  },
  {
    id: 'SIGNAL_NRF2_ACTIVATION',
    label: 'NRF2 Activation',
    shortLabel: 'NRF2',
    threshold: 'KEAP1/CUL3/RBX1 LOF mutation',
    classification: 'ACTIVE',
    backendMethod: 'add_nrf2_signal(triggered)',
    backendLine: 'policy.py L429',
    frontendEvaluator: 'evaluateNRF2()',
    testRequired: 'Somatic mutation panel',
    states: ['FIRED', 'CLEAR', 'NO_DATA'],
  },
  {
    id: 'SIGNAL_SLC31A1_LOSS',
    label: 'SLC31A1 Loss (CTR1)',
    shortLabel: 'SLC31A1',
    threshold: 'log2FC < -1.5',
    classification: 'ACTIVE',
    backendMethod: 'add_slc31a1_signal(log2fc)',
    backendLine: 'policy.py L448',
    frontendEvaluator: 'evaluateSLC31A1()',
    testRequired: 'RNA-seq transcriptomics',
    states: ['FIRED', 'CLEAR', 'NO_DATA'],
  },
  {
    id: 'SIGNAL_HRD_BASELINE',
    label: 'HRD Baseline',
    shortLabel: 'HRD_BL',
    threshold: 'HRD_sum < 42 at intake',
    classification: 'BASELINE',
    backendMethod: 'set_hrd_baseline(hrd_sum)',
    backendLine: 'policy.py L279',
    frontendEvaluator: 'evaluateHRDBaseline()',
    testRequired: 'HRD assay at diagnosis',
    states: ['BASELINE_NOTED', 'CLEAR', 'NO_DATA'],
  },
  {
    id: 'SIGNAL_SLFN11_PRIOR',
    label: 'SLFN11 Silencing Prior',
    shortLabel: 'SLFN11',
    threshold: 'Methylation β > 0.5 or population prior',
    classification: 'BASELINE',
    backendMethod: 'set_slfn11_prior(methylation_beta, use_population_prior)',
    backendLine: 'policy.py L322',
    frontendEvaluator: 'evaluateSLFN11()',
    testRequired: 'HM450K/EPIC methylation array',
    states: ['BASELINE_NOTED', 'CLEAR', 'NO_DATA'],
  },
];

// ─── 7D Strike Vector (from vectors.py L37-40) ──────────────────────────────

export const STRIKE_VECTOR_AXES = ['ddr', 'mapk', 'pi3k', 'vegf', 'her2', 'io', 'efflux'] as const;

export const BASE_STRIKE_VECTOR: Record<string, number> = {
  ddr: 0.8, mapk: 0.1, pi3k: 0.1, vegf: 0.0, her2: 0.0, io: 0.3, efflux: 0.0,
};

// ─── 2-of-N Detection State Machine (from policy.py L574-633) ───────────────

export interface DetectionRule {
  condition: string;
  result: string;
  severity: string;
  source: string;
}

export const DETECTION_RULES: DetectionRule[] = [
  { condition: '≥2 signals AND ≥1 ACTIVE', result: 'RESISTANCE_DETECTED', severity: 'HIGH', source: 'policy.py L574-585' },
  { condition: '≥2 signals BUT all BASELINE', result: 'MONITORING + intake_risk_flag', severity: 'INTAKE_RISK', source: 'policy.py L587-598' },
  { condition: '1 signal only', result: 'MONITORING', severity: 'WATCH', source: 'policy.py L600-610' },
  { condition: '0 signals', result: 'No action', severity: 'CLEAR', source: 'policy.py L612-615' },
];

// ─── SAE Interpretability (from SAE_RESISTANCE manuscript) ───────────────────

export interface SAEFeature {
  featureId: number;
  label: string;
  score: number;          // Cohen's d
  pValue: number;
  topGene: string;
  topGeneCount: number;   // out of 30 top-activating variants
  slug: string;           // source registry key
  source: string;
}

export const SAE_DIAMOND_FEATURES: SAEFeature[] = [
  { featureId: 27607, label: 'TP53 Exon Disruption',      score: 0.635, pValue: 0.0146, topGene: 'TP53', topGeneCount: 28, slug: 'EVO2_F27607', source: 'SAE_RESISTANCE Table 1' },
  { featureId: 16337, label: 'TP53 Hotspot Mutation',      score: 0.634, pValue: 0.0247, topGene: 'TP53', topGeneCount: 25, slug: 'EVO2_F16337', source: 'SAE_RESISTANCE Table 1' },
  { featureId: 26220, label: 'TP53 Structural Signal',     score: 0.609, pValue: 0.0215, topGene: 'TP53', topGeneCount: 28, slug: 'EVO2_F26220', source: 'SAE_RESISTANCE Table 1' },
  { featureId: 12893, label: 'DDR Pathway Disruption',     score: 0.597, pValue: 0.0246, topGene: 'TP53', topGeneCount: 24, slug: 'EVO2_F12893', source: 'SAE_RESISTANCE Table 1' },
  { featureId: 6020,  label: 'BRCA1 Repair Capacity',      score: 0.573, pValue: 0.0324, topGene: 'TP53', topGeneCount: 21, slug: 'EVO2_F6020',  source: 'SAE_RESISTANCE Table 1' },
  { featureId: 22868, label: 'ATM Checkpoint Signal',      score: 0.544, pValue: 0.0355, topGene: 'TP53', topGeneCount: 22, slug: 'EVO2_F22868', source: 'SAE_RESISTANCE Table 1' },
  { featureId: 1407,  label: 'MBD4 Essentiality',          score: 0.537, pValue: 0.0414, topGene: 'TP53', topGeneCount: 48, slug: 'EVO2_F1407',  source: 'SAE_RESISTANCE Table 1' },
  { featureId: 9738,  label: 'CHEK2 Repair Path',          score: 0.530, pValue: 0.0495, topGene: 'TP53', topGeneCount: 16, slug: 'EVO2_F9738',  source: 'SAE_RESISTANCE Table 1' },
  { featureId: 31362, label: 'RAD51 Recombination Signal', score: 0.517, pValue: 0.0466, topGene: 'TP53', topGeneCount: 19, slug: 'EVO2_F31362', source: 'SAE_RESISTANCE Table 1' },
];

// ─── Manuscript Validation Metrics ───────────────────────────────────────────

export interface ValidationMetric {
  label: string;
  value: string;
  numeric: number;
  unit: string;
  dataset: string;
  n: number;
  pValue: number | null;
  ci95: string;
  manuscript: string;
  source: string;
}

export const VALIDATION_METRICS: ValidationMetric[] = [
  // SAE Resistance
  { label: 'TRUE SAE AUROC', value: '0.783', numeric: 0.783, unit: 'AUROC', dataset: 'TCGA-OV', n: 149, pValue: null, ci95: '±0.100 (5-fold CV)', manuscript: 'SAE_RESISTANCE', source: 'MANUSCRIPT_DRAFT.md Results' },
  { label: 'PROXY SAE AUROC', value: '0.628', numeric: 0.628, unit: 'AUROC', dataset: 'TCGA-OV', n: 149, pValue: null, ci95: '±0.119', manuscript: 'SAE_RESISTANCE', source: 'MANUSCRIPT_DRAFT.md Results' },
  { label: 'Δ AUROC (SAE)', value: '+0.155', numeric: 0.155, unit: 'AUROC pts', dataset: 'TCGA-OV', n: 149, pValue: null, ci95: '', manuscript: 'SAE_RESISTANCE', source: 'MANUSCRIPT_DRAFT.md Results' },
  { label: 'DDR_bin p-value', value: '0.0020', numeric: 0.002, unit: 'p', dataset: 'TCGA-OV', n: 149, pValue: 0.002, ci95: '', manuscript: 'SAE_RESISTANCE', source: 'MANUSCRIPT_DRAFT.md Results' },
  { label: 'DDR_bin Cohen\'s d', value: '0.642', numeric: 0.642, unit: 'd', dataset: 'TCGA-OV', n: 149, pValue: 0.002, ci95: '', manuscript: 'SAE_RESISTANCE', source: 'MANUSCRIPT_DRAFT.md Results' },

  // MFAP4
  { label: 'MFAP4 AUROC', value: '0.763', numeric: 0.763, unit: 'AUROC', dataset: 'GSE63885', n: 101, pValue: 0.001, ci95: '0.668–0.858', manuscript: 'MFAP4', source: 'TABLES.md Table 1' },
  { label: 'MFAP4 Resistance OR', value: '8.93×', numeric: 8.93, unit: 'OR', dataset: 'GSE63885', n: 101, pValue: 0.0001, ci95: '', manuscript: 'MFAP4', source: 'TABLES.md Table 2' },
  { label: 'EMT CV-AUROC', value: '0.715', numeric: 0.715, unit: 'AUROC', dataset: 'GSE63885', n: 101, pValue: null, ci95: '±0.179 (5-fold CV)', manuscript: 'MFAP4', source: 'TABLES.md Table 3' },

  // Serial SAE
  { label: 'Post-Tx DDR ρ', value: '-0.711', numeric: -0.711, unit: 'ρ', dataset: 'GSE165897', n: 11, pValue: 0.014, ci95: '', manuscript: 'Serial-SAE', source: 'ABSTRACT.md Results' },
  { label: 'CN sig7 Relapse AUROC', value: '0.874', numeric: 0.874, unit: 'AUROC', dataset: 'BriTROC-1', n: 47, pValue: 0.035, ci95: '0.750–0.974', manuscript: 'Serial-SAE', source: 'ABSTRACT.md Results' },
  { label: 'CN sig7 Diagnosis AUROC', value: '0.694', numeric: 0.694, unit: 'AUROC', dataset: 'BriTROC-1', n: 47, pValue: null, ci95: '', manuscript: 'Serial-SAE', source: 'ABSTRACT.md Results' },
  { label: 'KM Log-Rank', value: '0.012', numeric: 0.012, unit: 'p', dataset: 'GSE165897', n: 11, pValue: 0.012, ci95: '', manuscript: 'Serial-SAE', source: 'ABSTRACT.md Results' },

  // Timing Engine
  { label: 'PFI Exact-Day Match', value: '95.6%', numeric: 0.956, unit: '%', dataset: 'TCGA-OV (Villalobos)', n: 274, pValue: null, ci95: '92.5–97.5%', manuscript: 'Timing-Engine', source: 'MANUSCRIPT_DRAFT.md Table 1' },
  { label: 'PFI External Validation', value: 'p=0.12', numeric: 0.12, unit: 'χ² p', dataset: 'ARIEL3', n: 375, pValue: 0.12, ci95: '', manuscript: 'Timing-Engine', source: 'MANUSCRIPT_DRAFT.md Table 3' },
];

// ─── PMID Evidence Registry (from vectors.py L22-28) ────────────────────────

export interface PMIDReceipt {
  pmid: string;
  mechanism: string;
  evidence: string;
  source: string;
}

export const PMID_RECEIPTS: PMIDReceipt[] = [
  { pmid: '29906450', mechanism: 'CDK12 TDP', evidence: 'Wu et al. Cell 2018, modal span ~1.7 Mb', source: 'vectors.py L22' },
  { pmid: '30017478', mechanism: 'CDK12 TDP', evidence: 'Secondary CDK12 reference', source: 'vectors.py L22' },
  { pmid: '23103855', mechanism: '53BP1/Shieldin HR Restoration', evidence: 'Jaspers et al. Cancer Discov 2013', source: 'vectors.py L23' },
  { pmid: '28059767', mechanism: 'RB1+TP53 Lineage Plasticity', evidence: 'Mu et al. Science 2017', source: 'vectors.py L24' },
  { pmid: '30425037', mechanism: 'PFI Reversion Curve', evidence: 'ARIEL2 (Lin KK 2019), 5 confirmed reverts', source: 'vectors.py L28' },
  { pmid: '25114896', mechanism: 'NRF2 Activation', evidence: 'Disruption in ~90% of HGSOC', source: 'vectors.py L26' },
  { pmid: '32816860', mechanism: 'SLC31A1 Drug Uptake Loss', evidence: 'CTR1 downregulation → cisplatin resist', source: 'vectors.py L27' },
];

// ─── EMT Biomarker (from MFAP4 manuscript) ──────────────────────────────────

export interface EMTBiomarker {
  name: string;
  auroc: number;
  ci95: string;
  dataset: string;
  n: number;
  pValue: number;
  resistanceOR: number;
  source: string;
}

export const EMT_BIOMARKER: EMTBiomarker = {
  name: 'MFAP4',
  auroc: 0.763,
  ci95: '0.668–0.858',
  dataset: 'GSE63885',
  n: 101,
  pValue: 0.001,
  resistanceOR: 8.93,
  source: 'publications/07-MFAP4/TABLES.md',
};

// ─── Kinetics Manifold (from Serial-SAE manuscript) ─────────────────────────

export interface KineticsMetric {
  label: string;
  biomarker: string;
  timepoint: string;
  value: number;
  unit: string;
  pValue: number;
  dataset: string;
  n: number;
  source: string;
}

export const KINETICS_METRICS: KineticsMetric[] = [
  { label: 'Post-Treatment DDR', biomarker: 'DDR pathway score', timepoint: 'Post-NACT', value: -0.711, unit: 'ρ (Spearman)', pValue: 0.014, dataset: 'GSE165897', n: 11, source: 'Serial-SAE ABSTRACT.md' },
  { label: 'Pre-Treatment DDR', biomarker: 'DDR pathway score', timepoint: 'Pre-treatment', value: -0.182, unit: 'ρ (Spearman)', pValue: 0.592, dataset: 'GSE165897', n: 11, source: 'Serial-SAE ABSTRACT.md' },
  { label: 'Post-Treatment PI3K', biomarker: 'PI3K pathway score', timepoint: 'Post-NACT', value: 0.750, unit: 'AUC', pValue: 0.020, dataset: 'GSE165897', n: 11, source: 'Serial-SAE ABSTRACT.md' },
  { label: 'CN Signature 7 (Relapse)', biomarker: 'CN signature 7', timepoint: 'Relapse', value: 0.874, unit: 'AUROC', pValue: 0.035, dataset: 'BriTROC-1', n: 47, source: 'Serial-SAE BriTROC1_VALIDATION_RESULTS.md' },
  { label: 'CN Signature 7 (Diagnosis)', biomarker: 'CN signature 7', timepoint: 'Diagnosis', value: 0.694, unit: 'AUROC', pValue: null, dataset: 'BriTROC-1', n: 47, source: 'Serial-SAE BriTROC1_VALIDATION_RESULTS.md' },
];

// ─── Test Suite Status (from doctrine header) ───────────────────────────────

export const TEST_SUITE = {
  totalTests: 56,
  passed: 56,
  failed: 0,
  time: '0.47s',
  lastRun: '2026-03-24',
  files: [
    { file: 'test_kill_chain_policy.py', tests: 15, lines: 427, time: '0.28s' },
    { file: 'test_kill_chain_2of3.py', tests: 15, lines: 187, time: '(included)' },
    { file: 'test_signal_plumbing.py', tests: 26, lines: null, time: '0.19s' },
  ],
};

// ─── Source Artifacts with Public Slugs ──────────────────────────────────────

export interface KillChainArtifact {
  label: string;
  slug: string;
  type: 'mdc' | 'md' | 'json' | 'py' | 'csv' | 'png';
  category: 'doctrine' | 'manuscript' | 'data' | 'script' | 'figure';
  status: 'VERIFIED' | 'LOCKED' | 'PENDING';
}

export const KILL_CHAIN_ARTIFACTS: KillChainArtifact[] = [
  // Doctrine
  { label: 'RESISTANCE_DETECTION_ENGINE.mdc', slug: '/artifacts/resistance/RESISTANCE_DETECTION_ENGINE.mdc', type: 'mdc', category: 'doctrine', status: 'VERIFIED' },

  // SAE Resistance
  { label: 'SAE Resistance Manuscript', slug: '/artifacts/resistance/sae-resistance/MANUSCRIPT_DRAFT.md', type: 'md', category: 'manuscript', status: 'VERIFIED' },
  { label: 'SAE Diamond Features JSON', slug: '/artifacts/resistance/sae-resistance/data/sae_feature_mapping.true_sae_diamonds.v1.json', type: 'json', category: 'data', status: 'VERIFIED' },
  { label: 'SAE Diamonds Baseline JSON', slug: '/artifacts/resistance/sae-resistance/data/true_sae_diamonds_baseline.v1.json', type: 'json', category: 'data', status: 'VERIFIED' },
  { label: 'Head-to-Head AUROC Script', slug: '/artifacts/resistance/sae-resistance/scripts/head_to_head_proxy_vs_true.py', type: 'py', category: 'script', status: 'VERIFIED' },
  { label: 'ROC Curve Generator', slug: '/artifacts/resistance/sae-resistance/scripts/generate_roc_curves.py', type: 'py', category: 'script', status: 'VERIFIED' },
  { label: 'DDR_bin Distribution Script', slug: '/artifacts/resistance/sae-resistance/scripts/generate_ddr_bin_distribution.py', type: 'py', category: 'script', status: 'VERIFIED' },
  { label: 'Feature Pathway Mapping', slug: '/artifacts/resistance/sae-resistance/scripts/generate_feature_pathway_mapping.py', type: 'py', category: 'script', status: 'VERIFIED' },
  { label: 'ROC Curves (Figure 2)', slug: '/artifacts/resistance/sae-resistance/figures/figure2_roc_curves.png', type: 'png', category: 'figure', status: 'VERIFIED' },
  { label: 'DDR_bin Distribution (Figure 3)', slug: '/artifacts/resistance/sae-resistance/figures/figure3_ddr_bin_distribution.png', type: 'png', category: 'figure', status: 'VERIFIED' },
  { label: 'Feature Pathway Map (Figure 4)', slug: '/artifacts/resistance/sae-resistance/figures/figure4_feature_pathway_mapping.png', type: 'png', category: 'figure', status: 'VERIFIED' },

  // MFAP4
  { label: 'MFAP4 README', slug: '/artifacts/resistance/mfap4/README.md', type: 'md', category: 'manuscript', status: 'VERIFIED' },
  { label: 'MFAP4 Tables', slug: '/artifacts/resistance/mfap4/TABLES.md', type: 'md', category: 'data', status: 'VERIFIED' },
  { label: 'MFAP4 ROC Curve', slug: '/artifacts/resistance/mfap4/figures/fig_gse63885_roc_mfap4.png', type: 'png', category: 'figure', status: 'VERIFIED' },
  { label: 'MFAP4 Box Plot', slug: '/artifacts/resistance/mfap4/figures/fig_gse63885_box_mfap4_by_platinum.png', type: 'png', category: 'figure', status: 'VERIFIED' },
  { label: 'EMT Score ROC', slug: '/artifacts/resistance/mfap4/figures/fig_gse63885_roc_emt_score.png', type: 'png', category: 'figure', status: 'VERIFIED' },
  { label: 'Bootstrap CI Script', slug: '/artifacts/resistance/mfap4/scripts/gse63885_bootstrap_ci.py', type: 'py', category: 'script', status: 'VERIFIED' },

  // Serial SAE
  { label: 'Serial SAE Manuscript', slug: '/artifacts/resistance/serial-sae/MANUSCRIPT_DRAFT.md', type: 'md', category: 'manuscript', status: 'VERIFIED' },
  { label: 'BriTROC-1 Validation', slug: '/artifacts/resistance/serial-sae/BriTROC1_VALIDATION_RESULTS.md', type: 'md', category: 'data', status: 'VERIFIED' },
  { label: 'Serial SAE Audit Report', slug: '/artifacts/resistance/serial-sae/AUDIT_REPORT_JAN29.md', type: 'md', category: 'manuscript', status: 'VERIFIED' },

  // KELIM
  { label: 'KELIM Feature Matrix', slug: '/artifacts/resistance/kelim/SAE_KELIM_Deliverable_1_FeatureMatrix.csv', type: 'csv', category: 'data', status: 'VERIFIED' },
  { label: 'KELIM Convergence Methods', slug: '/artifacts/resistance/kelim/METHODS_DRAFT.md', type: 'md', category: 'manuscript', status: 'VERIFIED' },

  // Timing Engine
  { label: 'Timing Engine Manuscript', slug: '/artifacts/resistance/timing-engine/MANUSCRIPT_DRAFT.md', type: 'md', category: 'manuscript', status: 'VERIFIED' },
  { label: 'Reproduce All Script', slug: '/artifacts/resistance/timing-engine/reproduce_all.py', type: 'py', category: 'script', status: 'VERIFIED' },
];

// ─── File Registry (from doctrine Section 6) ────────────────────────────────

export interface CodeFile {
  path: string;
  lines: number | null;
  purpose: string;
  layer: 'backend' | 'frontend' | 'test';
}

export const CODE_REGISTRY: CodeFile[] = [
  // Backend
  { path: 'api/services/kill_chain/__init__.py', lines: 69, purpose: 'Public API surface', layer: 'backend' },
  { path: 'api/services/kill_chain/models.py', lines: 155, purpose: 'Enums, signals, thresholds, constants', layer: 'backend' },
  { path: 'api/services/kill_chain/vectors.py', lines: 175, purpose: 'BASE_STRIKE_VECTOR, 12 deltas, 26-gene map', layer: 'backend' },
  { path: 'api/services/kill_chain/policy.py', lines: 767, purpose: 'KillChainPolicy state machine + scoring', layer: 'backend' },
  { path: 'api/services/kill_chain/factory.py', lines: 154, purpose: 'Profile → hydrated KillChainPolicy', layer: 'backend' },
  { path: 'api/services/kill_chain/vcf_parser.py', lines: 150, purpose: 'VCF variant parsing', layer: 'backend' },
  { path: 'api/resources/trial_moa_vectors.json', lines: 15012, purpose: 'Trial MoA vector database', layer: 'backend' },
  // Frontend
  { path: 'src/constants/kill-chain/signalDefinitions.js', lines: 132, purpose: '8 signal metadata', layer: 'frontend' },
  { path: 'src/constants/kill-chain/geneCoverageMap.js', lines: 67, purpose: '26-gene → resistance class map', layer: 'frontend' },
  { path: 'src/constants/signalStateEngine.js', lines: 284, purpose: '8 deterministic evaluators + summary', layer: 'frontend' },
  // Tests
  { path: 'tests/test_kill_chain_policy.py', lines: 427, purpose: '15 policy tests', layer: 'test' },
  { path: 'tests/test_kill_chain_2of3.py', lines: 187, purpose: '15 detection logic tests', layer: 'test' },
  { path: 'tests/test_signal_plumbing.py', lines: null, purpose: '26 end-to-end plumbing tests', layer: 'test' },
];

// ─── Engine Configuration ───────────────────────────────────────────────────

export const KILL_CHAIN_ENGINE = {
  engineId: 'L4',
  version: '6.2.9',
  receiptFile: 'resistance_detection_service.py',
  doctrineFile: 'RESISTANCE_DETECTION_ENGINE.mdc',
  status: 'ACTIVE' as const,

  // Architecture counts
  resistanceClasses: 12,
  signalChannels: 8,
  strikeVectorAxes: 7,
  genesCovered: 26,
  trialMoaVectors: 15012,
  totalTestsPassed: 56,
  backendCodeLines: 1470,  // sum of backend files
  frontendCodeLines: 483,  // sum of frontend files

  // Diagnostic channels (structural)
  channels: [
    { label: 'ctDNA Kinetics', slug: 'CTDNA_L4', icon: 'LineChart' },
    { label: 'HR Restoration', slug: 'HR_RES', icon: 'RefreshCcw' },
    { label: 'EMT Manifold', slug: 'EMT_V6', icon: 'Microscope' },
    { label: 'SAE Profiler', slug: 'SAE_INT', icon: 'Binary' },
  ],
};
