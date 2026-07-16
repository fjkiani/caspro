// ============================================================================
// brain-met-cascade-data.ts — audited numeric ground truth for the
// Target-Lock brain-met surface. Every number here is anchored to
// /mnt/results/audits/w7a_numeric_ground_truth.json which in turn is
// anchored to on-disk receipts under /workspace/audit/evo2-e2e/.
//
// If you change any value, update w7a_numeric_ground_truth.json first.
// ============================================================================

export type BrmStep = {
  n: number; // 1..7
  slug:
    | 'primary_tumor_escape'
    | 'intravasation'
    | 'circulation_survival'
    | 'bbb_transit'
    | 'cns_colonization'
    | 'brain_niche_adaptation'
    | 'brm_angiogenesis';
  label: string;
  narrative: string;
  primaryGenes: string[];
  negativeControls: string[];
  bbbNote?: string;
};

// Source: evo2-e2e/shared/ground_truth/metastasis_rules.json v1.1.0-brain_met
export const BRM_STEPS: BrmStep[] = [
  {
    n: 1,
    slug: 'primary_tumor_escape',
    label: 'Primary tumor escape',
    narrative:
      'Escape from primary tumor site (breast, lung, melanoma). Framework must discriminate degradation-and-invasion drivers from hematologic drivers.',
    primaryGenes: ['MMP2', 'MMP9', 'EGFR', 'KMT2C', 'TP53'],
    negativeControls: ['ABL1', 'BCR', 'FLT3'],
  },
  {
    n: 2,
    slug: 'intravasation',
    label: 'Intravasation',
    narrative:
      'Entry into blood or lymphatic vessels. EMT and matrix remodeling drivers dominate.',
    primaryGenes: ['TWIST1', 'KMT2C', 'MMP2', 'MMP9'],
    negativeControls: ['IDH1', 'IDH2'],
  },
  {
    n: 3,
    slug: 'circulation_survival',
    label: 'Circulation survival',
    narrative:
      'Survival as circulating tumor cell — anoikis resistance. BACE1 first appears here.',
    primaryGenes: ['BCL2', 'BACE1'],
    negativeControls: ['DNMT3A', 'NPM1'],
  },
  {
    n: 4,
    slug: 'bbb_transit',
    label: 'BBB transit',
    narrative:
      'Cross the blood-brain barrier — BBB-specific step. Endothelial tight-junction and chemokine axis.',
    primaryGenes: ['CXCR4', 'ICAM1', 'CLDN5', 'CCL2', 'MMP2', 'MMP9'],
    negativeControls: ['IDH1', 'IDH2', 'FLT3', 'JAK2', 'TERT'],
    bbbNote:
      'Genes must have brain-extravasation-specific evidence (not general metastasis).',
  },
  {
    n: 5,
    slug: 'cns_colonization',
    label: 'CNS colonization',
    narrative:
      'Establish micrometastases in brain parenchyma. BACE1 present at three steps (3, 5, 6) — multi-step footprint drives the rank.',
    primaryGenes: ['BACE1', 'CXCR4', 'PTEN', 'TP53', 'PIK3CA', 'CDKN2A', 'BRCA1'],
    negativeControls: ['IDH1', 'IDH2', 'ABL1'],
  },
  {
    n: 6,
    slug: 'brain_niche_adaptation',
    label: 'Brain niche adaptation',
    narrative:
      'Adapt to brain microenvironment — astrocytes, neurons, ECM.',
    primaryGenes: ['SMARCA4', 'STAT3', 'ESR1', 'BACE1', 'CCL2'],
    negativeControls: ['FLT3', 'JAK2', 'TERT'],
  },
  {
    n: 7,
    slug: 'brm_angiogenesis',
    label: 'BrM angiogenesis',
    narrative:
      'Angiogenic adaptation specific to brain metastatic niche.',
    primaryGenes: ['VEGFA', 'PIK3CA'],
    negativeControls: ['ABL1', 'BCR'],
  },
];

// ── Live variant scores (evo2_1b_base, conditional_ll, A100, 8192bp context) ──
// Source: evo2-e2e/data/validation/live_variant_scores.json (2026-03-28)
export type LiveVariant = {
  gene: string;
  hgvs: string;
  deltaLl: number;
  cohortSource: string;
  note?: string;
};

export const LIVE_VARIANTS: LiveVariant[] = [
  {
    gene: 'PIK3CA',
    hgvs: 'p.H1047R',
    deltaLl: -0.6149,
    cohortSource: 'MSK-MET',
    note: 'PI3K activation; common in ER+ BrM',
  },
  {
    gene: 'TP53',
    hgvs: 'p.R175H',
    deltaLl: -0.4177,
    cohortSource: 'AURORA',
    note: 'Most common TP53 hotspot; 2x enriched in brain mets',
  },
  {
    gene: 'ESR1',
    hgvs: 'p.D538G',
    deltaLl: -0.4023,
    cohortSource: 'MSK-MET',
    note: 'Ligand-independent ER activation',
  },
  {
    gene: 'TP53',
    hgvs: 'p.R248W',
    deltaLl: -0.2968,
    cohortSource: 'AURORA',
    note: 'Gain-of-function; BrM invasion',
  },
  {
    gene: 'SMARCA4',
    hgvs: 'p.R1192C',
    deltaLl: -0.1487,
    cohortSource: 'MSK-MET',
    note: 'Chromatin remodeling loss',
  },
  {
    gene: 'PIK3CA',
    hgvs: 'p.E545K',
    deltaLl: -0.1328,
    cohortSource: 'MSK-MET',
    note: 'Second PI3K hotspot',
  },
  {
    gene: 'BRCA1',
    hgvs: 'p.T1685A',
    deltaLl: -0.0948,
    cohortSource: 'AURORA',
    note: 'Mild BRCT-domain change',
  },
  {
    gene: 'ESR1',
    hgvs: 'p.Y537S',
    deltaLl: -0.0537,
    cohortSource: 'MSK-MET',
    note: 'Ligand-independent ER activation (softer)',
  },
  {
    gene: 'BACE1',
    hgvs: 'p.D289N',
    deltaLl: 0.0017,
    cohortSource: 'MSK-MET',
    note:
      'Near-neutral Evo2 signal — this variant is NOT the mechanism. BACE1 rank driven by CRISPRa + 150x brain enrichment.',
  },
  {
    gene: 'EGFR',
    hgvs: 'p.L858R',
    deltaLl: 0.0878,
    cohortSource: 'AURORA',
    note: 'Positive delta — activator, not damage',
  },
  {
    gene: 'PTEN',
    hgvs: 'p.R130Q',
    deltaLl: 0.2058,
    cohortSource: 'AURORA',
    note:
      'Positive delta for a canonical LoF hotspot — example of why single-signal Evo2 needs the 3-signal composite',
  },
  {
    gene: 'KMT2C',
    hgvs: 'p.R4854*',
    deltaLl: 0.3854,
    cohortSource: 'MSK-MET',
    note:
      'Nonsense truncation — essentiality is set to 1.0 by formula rule, delta_ll is not the primary signal',
  },
];

// ── Scoring formulas (verbatim from evo2-e2e/core/target_lock/scorer.py) ──
export const WEIGHTS = {
  DEFAULT: { functionality: 0.35, essentiality: 0.35, regulatory: 0.2, chromatin: 0.1 },
  BRAIN_MET: { functionality: 0.33, essentiality: 0.33, regulatory: 0.24, chromatin: 0.1 },
} as const;

export const FORMULAS = {
  targetLock:
    'TL = w_F · F(delta_ll) + w_E · E(variant, type) + w_R · R(min_delta) + w_C · C',
  functionality: 'F = 1 / (1 + exp(delta_ll / 0.5))',
  essentiality:
    'E = 1.0 (frameshift / nonsense) · E = min(1.0, |delta_ll| / 1.5) (missense)',
  regulatory: 'R = |min_delta| / (|min_delta| + 1)',
  chromatin: 'C ∈ [0, 1] Enformer accessibility · 0.5 default when Enformer unavailable',
  assassin:
    'A = 0.37 · Efficacy(TL_v2) + 0.30 · Safety(GTEx_inv) + 0.30 · Mission + 0.03 · Structure',
  compositeTsg: 'TSG = (0.60 · |CRISPR_LFC| + 0.20 · ATAC_LFC + 0.15 · Evo2_score) / 0.95',
  compositeOnc: 'ONC = (0.25 · |CRISPR_LFC| + 0.35 · ATAC_LFC + 0.20 · Evo2_score) / 0.80',
} as const;

// ── AUROC panel diagnostics (from class_aware_composite_final.json:metadata) ──
export const AUROC = {
  primary: 0.6889,
  primaryLabel: '29-gene panel · mean imputation for 5 missing ATAC genes',
  observedOnly: 0.7479,
  observedOnlyLabel: '24-gene observed-only · no imputation · upper bound',
  tsgOnly: 0.8333,
  oncOnly: 0.619,
  auprc: 0.8306,
  precisionAt3: 1.0,
  precisionAt5: 0.8,
  precisionAt10: 0.9,
  evo2BaselineAlone: 0.5778,
  crisprAlone: 0.6556,
} as const;

// ── Retracted / excluded numbers (surfaced for transparency, never as headline) ──
export const RETRACTED = {
  tautology: { value: 0.98, reason: 'Mission-fit discount encoded labels · discount-only AUROC = 1.0' },
  enformerExcluded: {
    value: 0.4111,
    reason:
      'Enformer endpoint returns near-constant values regardless of sequence (poly-N > ACTB > TP53). Excluded from composite; weight renormalized across the remaining 3 signals.',
  },
  handoffUnverifiable: {
    value: 0.7278,
    posterRounding: 0.72,
    reason:
      'Older 4-signal formula. class_aware_composite_final.json marks it "UNVERIFIABLE — requires real Enformer signal". Do not cite externally.',
  },
} as const;

// ── BACE1 CRISPRa disclosure (three sources) ──
export const BACE1 = {
  canonicalLfc: 7.28,
  canonicalSource: 'HONEST_AUDIT.md (published audit)',
  altSources: [
    { file: 'gse237446_real_lfc.json (top_genes)', value: 7.07 },
    { file: 'crispr_gene_scores.json (BACE1)', value: 7.37 },
    { file: 'MANIFEST_NOTES.md (v2 real-data run)', value: 7.07 },
  ],
  brainVsLungFold: 150,
  citation: 'Chafe et al. Sci Transl Med 2025',
  cascadeSteps: ['circulation_survival', 'cns_colonization', 'brain_niche_adaptation'],
} as const;

// ── Datasets ──
export const DATASETS = [
  {
    accession: 'GSE237446',
    reference: 'Chafe et al. Sci Transl Med 2025',
    role: 'CRISPRa breast-to-brain-met screen',
    detail: '56,160 guides · 12 brain + 11 lung samples · 6,836 genes recovered',
  },
  {
    accession: 'GSE205033',
    reference: 'Biermann et al. Cell 2022 (PMID 36113464)',
    role: 'Multi-sample MBM ATAC-seq',
    detail: '261,222 peaks · 24 samples · 14,269 gene-mapped',
  },
  {
    accession: 'Zenodo 5801902',
    reference: 'Nguyen et al. Nat Genet 2022 (MSK-MET; PMID 35681060)',
    role: 'Metastatic mutation landscape',
    detail: '24,755 samples · 230,419 mutations · 2,921 brain-met samples',
  },
  {
    accession: 'GTEx v8',
    reference: 'GTEx Consortium',
    role: 'Normal-tissue safety filter',
    detail: 'Applied to top 50 candidate targets',
  },
] as const;

// ── Gap disclosures (surface transparency) ──
export const GAPS = [
  {
    id: 'GAP-1',
    severity: 'high' as const,
    label: 'Hard negatives too easy',
    detail:
      'FLT3, IDH1/2, TERT are separable from BrM positives by tissue-of-origin. AUROC 0.6889 does not fully test solid-tumor vs solid-tumor discrimination.',
    fix: 'Swap for MYC, AKT1, CDH1, KRAS, VEGFB, ERBB2, MAPK1 in the next validation round.',
  },
  {
    id: 'GAP-4',
    severity: 'low' as const,
    label: 'BACE1 CRISPRa LFC range',
    detail:
      'HONEST_AUDIT canonical is +7.28. Underlying receipts range +7.07 to +7.37 across pipeline revisions.',
    fix: 'Freeze single canonical number, stamp pipeline version.',
  },
] as const;
