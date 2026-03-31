// ==============================================================================
// SL ENGINE DATA REGISTRY — Manuscript-backed facts for Synthetic Lethality Engine
// Source: MBD4 manuscript (Kiani 2026), DepMap 25Q3, GDSC2
// Every number is from the locked manuscript. Zero hallucinations.
// ==============================================================================

// ─── Typewriter Phrases ──────────────────────────────────────────────────────

export const SL_TYPEWRITER_PHRASES = [
  'MBD4 loss-of-function → BER glycosylase gone → CpG>TpG hypermutation.',
  'Ceralasertib: LN_IC50 Δ = −0.738. p = 0.034. Cohen\'s d = −0.51.',
  'MSI-H purge: signal strengthened. p = 0.025. MBD4 is the driver.',
  'TP53 stratification: MBD4 adds >1 log-unit beyond TP53. p = 0.008. d = −0.88.',
  'PARP1 upregulated (7.21 vs 6.64 TPM, p = 0.033). Biomarker, not target.',
  'Leave-one-out: 14/14 robust. No single cell line carries this signal.',
  'RNF144A degradation pathway: falsified. p = 0.53. Field was wrong.',
  'Dual strategy: Cytidine analogs + ATR inhibition. Converging on the fork.',
];

// ─── Evidence Matrix ─────────────────────────────────────────────────────────

export type EvidenceStatus = 'POSITIVE' | 'NEGATIVE' | 'MIXED' | 'MISSING' | 'CONFOUNDED';

export interface EvidenceCell {
  status: EvidenceStatus;
}

export interface TherapyAxis {
  name: string;
  tier: string;
  modalities: Record<string, EvidenceCell>;
}

export const EVIDENCE_MODALITIES = [
  'CRISPR', 'Pharma', 'In Vitro', 'In Vivo', 'Clinical', 'Pathway', 'Literature'
] as const;

export const THERAPY_AXES: TherapyAxis[] = [
  {
    name: 'Cytidine Analogs',
    tier: 'Validated SL',
    modalities: {
      'CRISPR': { status: 'POSITIVE' },
      'Pharma': { status: 'POSITIVE' },
      'In Vitro': { status: 'POSITIVE' },
      'In Vivo': { status: 'POSITIVE' },
      'Clinical': { status: 'POSITIVE' },
      'Pathway': { status: 'POSITIVE' },
      'Literature': { status: 'POSITIVE' },
    },
  },
  {
    name: 'ATR/WEE1 Inhibitors',
    tier: 'Strong',
    modalities: {
      'CRISPR': { status: 'POSITIVE' },
      'Pharma': { status: 'POSITIVE' },
      'In Vitro': { status: 'POSITIVE' },
      'In Vivo': { status: 'MISSING' },
      'Clinical': { status: 'MISSING' },
      'Pathway': { status: 'POSITIVE' },
      'Literature': { status: 'POSITIVE' },
    },
  },
  {
    name: 'PARP Inhibitors',
    tier: 'Biomarker Only',
    modalities: {
      'CRISPR': { status: 'MISSING' },
      'Pharma': { status: 'NEGATIVE' },
      'In Vitro': { status: 'POSITIVE' },
      'In Vivo': { status: 'MISSING' },
      'Clinical': { status: 'MISSING' },
      'Pathway': { status: 'POSITIVE' },
      'Literature': { status: 'POSITIVE' },
    },
  },
  {
    name: 'Immunotherapy',
    tier: 'Candidate',
    modalities: {
      'CRISPR': { status: 'MISSING' },
      'Pharma': { status: 'POSITIVE' },
      'In Vitro': { status: 'MISSING' },
      'In Vivo': { status: 'MISSING' },
      'Clinical': { status: 'POSITIVE' },
      'Pathway': { status: 'MISSING' },
      'Literature': { status: 'POSITIVE' },
    },
  },
  {
    name: 'WRN Helicase',
    tier: 'Mechanistic',
    modalities: {
      'CRISPR': { status: 'POSITIVE' },
      'Pharma': { status: 'MISSING' },
      'In Vitro': { status: 'MISSING' },
      'In Vivo': { status: 'MISSING' },
      'Clinical': { status: 'MISSING' },
      'Pathway': { status: 'POSITIVE' },
      'Literature': { status: 'POSITIVE' },
    },
  },
  {
    name: 'PKMYT1',
    tier: 'Mechanistic',
    modalities: {
      'CRISPR': { status: 'MISSING' },
      'Pharma': { status: 'POSITIVE' },
      'In Vitro': { status: 'MISSING' },
      'In Vivo': { status: 'MISSING' },
      'Clinical': { status: 'MISSING' },
      'Pathway': { status: 'MISSING' },
      'Literature': { status: 'POSITIVE' },
    },
  },
];

// ─── Confound Stress Tests ────────────────────────────────────────────────────

export interface StressTest {
  label: string;
  description: string;
  delta: string;
  pValue: string;
  cohensD?: string;
  n?: string;
  status: 'PASS' | 'FAIL';
}

export const CONFOUND_STRESS_TESTS: StressTest[] = [
  {
    label: 'MSI-H Ghost Purge',
    description: 'All MSI-H lines removed from both groups — signal strengthened.',
    delta: 'LN_IC50 Δ = −0.915',
    pValue: '0.025',
    cohensD: '−0.625',
    n: 'n=10 MSS/MBD4-LOF',
    status: 'PASS',
  },
  {
    label: 'TP53 Hijack Check',
    description: 'MBD4-LOF/TP53-mut vs MBD4-WT/TP53-mut — MBD4 adds >1 log-unit.',
    delta: 'LN_IC50 Δ = −1.063',
    pValue: '0.008',
    cohensD: '−0.880 (AUC)',
    n: 'n=11 vs 606',
    status: 'PASS',
  },
  {
    label: 'Leave-One-Out Robustness',
    description: 'All 14 iterations maintain significance. No single line carries the signal.',
    delta: '14/14 robust',
    pValue: 'all < 0.10',
    n: 'n=14 LOF lines',
    status: 'PASS',
  },
  {
    label: 'Lineage Trap',
    description: 'MBD4-LOF spans 8 lineages. Signal not driven by a single tissue type.',
    delta: 'Non-Bowel Δ = −0.88',
    pValue: '0.051',
    cohensD: '−0.60',
    n: '8 lineages',
    status: 'PASS',
  },
];

// ─── PARP1 Biomarker Data ────────────────────────────────────────────────────

export const PARP1_DATA = {
  lofMedian: 7.21,
  wtMedian: 6.64,
  pValue: '0.033',
  nLof: 8,
  nWt: 1665,
  unit: 'log1p TPM',
  spearmanRho: -0.42,
  spearmanP: '< 1×10⁻⁶',
  nMatched: 488,
  highQ75Z: -0.577,
  lowQ25Z: 0.421,
  deltaZ: -0.998,
  rnf144aP: '0.53',
  rnf144aVerdict: 'FALSIFIED',
  mostSensitiveLine: 'ACH-001709',
  mostSensitiveParp1: 7.58,
  mostSensitiveZ: -1.35,
};

// ─── Ceralasertib Pharmacological Data ────────────────────────────────────────

export const CERALASERTIB_DATA = {
  drug: 'Ceralasertib (AZD6738)',
  target: 'ATR Kinase',
  nLof: 14,
  nWt: 934,
  metrics: [
    { metric: 'LN_IC50', lof: 1.335, wt: 2.073, delta: -0.738, p: '0.034', d: '-0.506' },
    { metric: 'AUC', lof: 0.764, wt: 0.820, delta: -0.056, p: '0.048', d: '-0.560' },
    { metric: 'Z_SCORE', lof: -0.496, wt: 0.010, delta: -0.505, p: '0.034', d: '-0.506' },
  ],
};

// ─── Process Log Messages ────────────────────────────────────────────────────

export const PIPELINE_STEPS = [
  'INSTANTIATING 7D VULNERABILITY AXES...',
  'QUERYING DepMap_25Q3 CHRONOS (CRISPR FILL)...',
  'STRATIFYING PRISM+GDSC2 (PHARMA FILL)...',
  'FETCHING FROZEN ISOGENIC RECEIPTS (Hewitt et al.)...',
  'CALCULATING RS SCORE + MODALITY WEIGHTS...',
  'ASSESSING PATHWAY CONVERGENCE...',
  'RESOLVING MSI/CO-MUT CONFOUNDS (4 STRESS TESTS)...',
  'GENERATING MULTI-MODAL AGREEMENT REPORT...',
];

// ─── Neural Graph Nodes (for Three.js manifold) ─────────────────────────────

export interface ManifoldNode {
  id: string;
  label: string;
  type: 'input' | 'output' | 'confound' | 'pharma' | 'biomarker';
  x: number;
  y: number;
}

export const MANIFOLD_NODES: ManifoldNode[] = [
  { id: 'mbd4', label: 'MBD4 LOSS', type: 'input', x: 100, y: 120 },
  { id: 'ber', label: 'BER DEFICIENCY', type: 'output', x: 300, y: 80 },
  { id: 'fork', label: 'FORK STALLING', type: 'output', x: 500, y: 160 },
  { id: 'msih', label: 'MSI-H CONFOUND', type: 'confound', x: 480, y: 60 },
  { id: 'tp53', label: 'TP53 CO-MUT', type: 'confound', x: 160, y: 280 },
  { id: 'cytidine', label: 'CYTIDINE ANALOGS', type: 'pharma', x: 320, y: 300 },
  { id: 'atri', label: 'ATR INHIBITION', type: 'pharma', x: 540, y: 280 },
  { id: 'parp1', label: 'PARP1 ↑ (BIOMARKER)', type: 'biomarker', x: 100, y: 340 },
];

export const MANIFOLD_EDGES: [string, string][] = [
  ['mbd4', 'ber'],
  ['ber', 'fork'],
  ['fork', 'atri'],
  ['ber', 'cytidine'],
  ['mbd4', 'parp1'],
  ['msih', 'fork'],   // confound edge
  ['tp53', 'atri'],   // confound edge
];

// ─── Sidebar Tabs ─────────────────────────────────────────────────────────────

export const SL_TABS = [
  { key: 'matrix', label: 'Evidence Matrix', slug: 'AXIS_6' },
  { key: 'confound', label: 'Confound Purge', slug: 'STRESS_4' },
  { key: 'parp1', label: 'PARP1 Biomarker', slug: 'TPM_EXPR' },
  { key: 'ceralasertib', label: 'Ceralasertib Δ', slug: 'ATRi_Δ' },
] as const;

export type SLTabKey = typeof SL_TABS[number]['key'];
