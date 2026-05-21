/**
 * 8-step metastatic cascade — Interception manuscript (Target-Lock + AF3 triage).
 * AF3 cohort: top-2 guides/step, n=15; gates pLDDT ≥50, iPTM ≥0.30 (RNA–DNA calibrated).
 */

export type CascadeImpact = 'Moderate' | 'High' | 'Critical' | 'Extreme';

export type CascadeModelPath =
  | '/models/3nmm-haemoglobin.glb'
  | '/models/dna.glb'
  | '/models/dna_rna.glb';

/** Per-step 3D viewer — rotates through available GLBs with distinct pose/tint */
export interface CascadeViewPreset {
  modelUrl: CascadeModelPath;
  rotationX: number;
  rotationY: number;
  scaleMul?: number;
  /** Mesh tint (hex) so same GLB reads differently per target */
  tint?: string;
}

export interface CascadeStep {
  step: number;
  label: string;
  /** Primary lock gene for this Hallmarks step */
  gene: string;
  /** AF3-validated guide ID from structural cohort (Table S4) */
  af3Guide: string;
  plddt: number;
  iptm: number;
  pathway: string;
  /** One-line intercept rationale */
  intercept: string;
  /** Example Target-Lock score on 38-gene panel where reported */
  targetLock?: number;
  impact: CascadeImpact;
  /** SVG hybrid layout variant — distinct silhouette per step */
  hybridVariant: 'open' | 'tight' | 'compact' | 'extended';
  view: CascadeViewPreset;
}

export const AF3_RNA_DNA_GATES = {
  plddtMin: 50,
  iptmMin: 0.3,
  cohortMeanPlddt: 65.6,
  cohortMeanIptm: 0.36,
  cohortPassRate: '15/15',
} as const;

export const METASTATIC_CASCADE_STEPS: CascadeStep[] = [
  {
    step: 1,
    label: 'Local Invasion',
    gene: 'TWIST1',
    af3Guide: 'TWIST1_10',
    plddt: 67.9,
    iptm: 0.38,
    pathway: 'EMT · ECM breach',
    intercept: 'Lock invasion drivers before basement membrane exit (MMP2/MMP9 axis).',
    targetLock: undefined,
    impact: 'High',
    hybridVariant: 'extended',
    view: {
      modelUrl: '/models/3nmm-haemoglobin.glb',
      rotationX: 0.12,
      rotationY: 0.2,
      tint: '#22d3ee',
    },
  },
  {
    step: 2,
    label: 'Intravasation',
    gene: 'MMP2',
    af3Guide: 'MMP2_07',
    plddt: 65.8,
    iptm: 0.36,
    pathway: 'Intravasation · matrix axis',
    intercept: 'Silence entry enzymes before systemic spread.',
    impact: 'Critical',
    hybridVariant: 'tight',
    view: {
      modelUrl: '/models/dna_rna.glb',
      rotationX: 0.18,
      rotationY: 0.42,
      scaleMul: 0.95,
      tint: '#f472b6',
    },
  },
  {
    step: 3,
    label: 'Circulation',
    gene: 'BCL2',
    af3Guide: 'BCL2_12',
    plddt: 65.2,
    iptm: 0.35,
    pathway: 'CTC survival · anti-apoptosis',
    intercept: 'Break circulation survival before distant arrest.',
    impact: 'Moderate',
    hybridVariant: 'open',
    view: {
      modelUrl: '/models/dna.glb',
      rotationX: 0.08,
      rotationY: 0.55,
      tint: '#a78bfa',
    },
  },
  {
    step: 4,
    label: 'Arrest at Site',
    gene: 'ITGB1',
    af3Guide: 'L1_PRIOR',
    plddt: 65.6,
    iptm: 0.36,
    pathway: 'Integrin · vascular arrest',
    intercept: 'β1 integrin docking at distant capillary beds (L1-ranked; outside n=15 AF3 cohort).',
    impact: 'Critical',
    hybridVariant: 'compact',
    view: {
      modelUrl: '/models/dna_rna.glb',
      rotationX: 0.32,
      rotationY: 0.12,
      scaleMul: 1.05,
      tint: '#94a3b8',
    },
  },
  {
    step: 5,
    label: 'Extravasation',
    gene: 'ICAM1',
    af3Guide: 'ICAM1_01',
    plddt: 66.1,
    iptm: 0.37,
    pathway: 'Endothelial exit',
    intercept: 'Close the endothelial gate before parenchymal seeding.',
    impact: 'High',
    hybridVariant: 'tight',
    view: {
      modelUrl: '/models/3nmm-haemoglobin.glb',
      rotationX: 0.48,
      rotationY: 0.68,
      tint: '#34d399',
    },
  },
  {
    step: 6,
    label: 'Micrometastasis',
    gene: 'CXCR4',
    af3Guide: 'CXCR4_06',
    plddt: 69.0,
    iptm: 0.38,
    pathway: 'Chemokine niche · seeding',
    intercept: 'Highest AF3 confidence in cohort — hold dormancy escape.',
    targetLock: 0.491,
    impact: 'High',
    hybridVariant: 'extended',
    view: {
      modelUrl: '/models/dna_rna.glb',
      rotationX: 0.22,
      rotationY: 0.88,
      tint: '#38bdf8',
    },
  },
  {
    step: 7,
    label: 'Colonization',
    gene: 'MET',
    af3Guide: 'MET_09',
    plddt: 65.4,
    iptm: 0.36,
    pathway: 'Secondary growth · MET axis',
    intercept: 'Terminal colonization lock — MET-driven overt metastasis.',
    impact: 'Extreme',
    hybridVariant: 'compact',
    view: {
      modelUrl: '/models/3nmm-haemoglobin.glb',
      rotationX: 0.52,
      rotationY: 1.05,
      scaleMul: 1.08,
      tint: '#fb923c',
    },
  },
  {
    step: 8,
    label: 'Angiogenesis',
    gene: 'VEGFA',
    af3Guide: 'VEGFA_02',
    plddt: 66.8,
    iptm: 0.37,
    pathway: 'VEGF–VEGFR2 neovascularization',
    intercept: 'Starve secondary lesions — VEGFA neovessel recruitment.',
    targetLock: 0.723,
    impact: 'Extreme',
    hybridVariant: 'open',
    view: {
      modelUrl: '/models/dna.glb',
      rotationX: 0.58,
      rotationY: 1.25,
      tint: '#f43f5e',
    },
  },
];
