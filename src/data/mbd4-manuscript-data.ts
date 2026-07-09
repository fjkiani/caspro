// ============================================================================
// mbd4-manuscript-data.ts — frozen typed data for the /engine/synthetic-lethality
// scroll + tab surfaces.
//
// Every number below is copied verbatim from the audit ground-truth file at
// /mnt/results/audits/w7a_numeric_ground_truth.json (mbd4_manuscript section)
// which itself was extracted from the actual manuscript receipts in
// crispro/publications/00-mbd4-manuscript/mbd4_parp_response/rxiv/ and the
// canonical reruns in artifacts/canonical_atr_wee1_rerun_20260405/.
//
// DO NOT edit numbers here without re-running the reconciliation table.
// ============================================================================

// -- Axis A: Cytidine analogs (Chabot 2022) — VALIDATED --------------------

export const AXIS_A_CYTIDINE = {
  short: 'AXIS A · CYTIDINE ANALOGS',
  status: 'validated',
  statusLabel: 'Gold-standard synthetic lethality',
  paper: 'Chabot et al. 2022',
  model: 'HAP1 MBD4-knockout (isogenic)',
  drug: 'gemcitabine',
  ic50Lof: '2.3 nM',
  ic50Wt: '20.1 nM',
  fold: '~10×',
  pValue: '2.82 × 10⁻³',
  companion: 'cytarabine same axis',
  evidence: [
    'isogenic HAP1 knockout vs parental',
    'rescue by MBD4 re-expression',
    'PDX in vivo confirmation',
    'clinical case report response',
  ],
  role: 'Sets the evidence bar for MBD4-directed therapeutic vulnerability.',
} as const;

// -- Axis B: Immunotherapy (case-level) ------------------------------------

export const AXIS_B_IO = {
  short: 'AXIS B · IMMUNOTHERAPY',
  status: 'emerging',
  statusLabel: 'Case-level',
  mechanism: 'CpG → TpG hypermutator phenotype',
  cases: [
    {
      ref: 'Rodrigues et al. 2018',
      finding: 'Exceptional anti-PD1 response · metastatic uveal melanoma · germline MBD4',
    },
    {
      ref: 'Saint-Ghislain et al. 2022',
      finding: 'Retrospective mUM cohort · MBD4 mutation predicts ICI response + survival benefit',
    },
  ],
  role: 'Convergent mutational-signature evidence for immune-neoantigen axis.',
} as const;

// -- Axis C: ATRi (ceralasertib) — PRIMARY PHARMACOGENOMIC ------------------

export const AXIS_C_ATR = {
  short: 'AXIS C · ATR INHIBITION',
  status: 'strong',
  statusLabel: 'Novel primary pharmacogenomic association',
  compound: 'ceralasertib (AZD6738)',
  database: 'GDSC2 · DepMap',
  receipt: 'artifacts/canonical_atr_wee1_rerun_20260405/canonical_atr_wee1_rerun.csv',
  wtRule: 'Methods_no_somatic_MBD4',

  // Primary endpoint — LN_IC50
  primaryLnIc50: {
    nLof: 14,
    nWt: 914,
    delta: -0.7325,      // -0.7324529879649893 rounded 4dp
    deltaMs: -0.74,
    pValue: 0.02148,     // 0.021484496737088882
    pValueMs: 0.021,
    cohensD: -0.5033,    // -0.5032867186922607
    cohensDMs: -0.5,
    test: 'one-sided Mann–Whitney U (LOF < WT)',
  },

  // AUC endpoint
  primaryAuc: {
    nLof: 14,
    nWt: 914,
    delta: -0.0556,
    pValue: 0.01294,
    cohensD: -0.5569,
  },

  // Z-score endpoint
  primaryZ: {
    nLof: 14,
    nWt: 914,
    delta: -0.5015,
    pValue: 0.02148,
    cohensD: -0.5033,
  },

  stressTests: [
    {
      id: 1,
      name: 'MSI-purge',
      definition: 'Exclude ModelSubtypeFeatures containing MSI from both arms',
      nLof: 10,
      nWt: 906,
      delta: -0.9095,
      pValue: 0.01533,
      cohensD: -0.6227,
      verdict: 'STRENGTHENED — signal is not an MSI-H proxy',
    },
    {
      id: 2,
      name: 'TP53-stratified',
      definition: 'MBD4-LOF & TP53-mut (n=11) vs MBD4-WT(Methods) & TP53-mut (n=619)',
      nLof: 11,
      nWt: 619,
      delta: -1.0692,
      pValue: 0.003003,
      cohensD: -0.7405,
      verdict: 'MBD4-LOF adds >1 log-unit sensitivity beyond TP53 status',
    },
    {
      id: 3,
      name: 'Leave-one-out (LOO)',
      definition: 'Remove each of the 14 LOF cosmids · recompute one-sided MWU · 14 iterations',
      maxP: 0.04517,
      minP: 0.008176,
      allLtPointOhFive: true,
      verdict: 'No single cell line carries the effect',
    },
    {
      id: 4,
      name: 'Lineage (non-bowel)',
      definition: 'Bowel n=5/41 (underpowered) vs non-bowel n=9/873',
      nLof: 9,
      nWt: 873,
      delta: -0.8707,
      pValue: 0.02533,
      cohensD: -0.5988,
      verdict: 'Signal is not a single-tissue artifact',
    },
  ],

  companion: {
    name: 'adavosertib (WEE1i · MK-1775)',
    nLof: 15,
    nWt: 920,
    delta: -0.5080,
    pValue: 0.07446,
    cohensD: -0.3594,
    verdict: 'Directionally concordant trend at edge of significance',
  },
} as const;

// -- PARPi falsification ----------------------------------------------------

export const PARPI_FALSIFIED = {
  short: 'PARP-INHIBITOR AXIS · FALSIFIED',
  hypothesis: 'MBD4 loss → compensatory PARP1 upregulation → PARPi sensitivity',
  receipt: 'artifacts/axis_c_preclinical/parp_axis_expression_MANUSCRIPT_RECEIPT.json',
  parp1Expression: {
    nLof: 19,
    nWtExpressionPool: 1498,          // NOTE: NOT same as pharmacology WT (see gap-5)
    medianLof: 6.7703,
    medianWt: 6.6561,
    delta: 0.1142,
    test: 'two-sided Mann–Whitney U',
    pValue: 0.6048,
    pValueMs: 0.605,
    verdict: 'NOT SIGNIFICANT · hypothesis falsified at first premise',
  },
  rnf144aAlternate: {
    nLof: 19,
    nWtExpressionPool: 1498,
    medianLof: 2.1506,
    medianWt: 1.7049,
    delta: 0.4457,
    pValue: 0.4758,
    verdict: 'DEAD — RNF144A alternate bridge also fails',
  },
  parp1ParpiSpearman: {
    receipt: 'artifacts/axis_c_preclinical/parp1_parpi_spearman_MANUSCRIPT_RECEIPT.json',
    n: 481,
    rho: -0.4164,
    rhoMs: -0.416,
    pValue: '1.36 × 10⁻²¹',
    verdict: 'Strong pan-cancer association exists — but MBD4-LOF does not selectively produce that state.',
  },
} as const;

// -- Convergence model ------------------------------------------------------

export const CONVERGENCE = {
  short: 'CONVERGENCE MODEL',
  body: 'Axes A and C converge on replication-fork failure: cytidine analogs saturate substrate accumulation, ATRi collapses the replication-stress checkpoint. MBD4-LOF creates BOTH stresses.',
  translational: 'Priority: cytidine analog + ATRi combination cohort in MBD4-deficient tumors (HGSOC prioritized).',
} as const;

// -- v3 SL engine architecture (from audit) --------------------------------

export const V3_ENGINE = {
  short: 'v3 SL ENGINE',
  primaryTest: 'Wilcoxon rank-sum one-sided (mutant < WT dependency)',
  effectSize: 'Pooled Cohen\'s d (rounded to 4dp)',
  deltaDep: 'float(mut_vals.mean() - wt_vals.mean()) rounded to 4dp',
  multipleTesting: 'Benjamini–Hochberg FDR (padj)',
  panEssentialRule: 'genes dependent (Chronos < −0.5) in ≥90% of lines → auto-excluded',
  panEssentialBlacklist: [
    'RPL5', 'RPL11', 'RPS14', 'RPS19', 'POLR2A', 'POLR2B', 'CDC42', 'RAC1',
    'ACTB', 'GAPDH', 'PCNA', 'MCM2', 'MCM7', 'SF3B1', 'SRSF1', 'U2AF1',
    'CDK1', 'CDK2', 'CDK4', 'KPNB1', 'XPO1', 'VCP', 'HSP90AA1', 'RB1',
  ],
  minGroup: 5,
  fallbackRule: 'If mutant OR WT count < 5 in cancer-specific mode → fallback to pan-cancer + record note',
  codeSource: 'layer1_engines/synthetic_lethality/core/sl_engine.py',
  api: {
    prefix: '/pharma/sl-bridge',
    auth: 'Bearer PHARMA_API_KEY',
    endpoints: ['POST /analyze', 'GET /genes', 'GET /cancer_types', 'GET /health', 'GET /result/{job_id}'],
  },
} as const;

// -- Ovarian precomputed hits (from v3 outputs) ----------------------------

export const OVARIAN_HITS = {
  lineageSelective: [
    { gene: 'PAX8',   d: -1.25,  padj: 6.54e-6, note: 'Mullerian lineage TF · master regulator ovarian/fallopian identity' },
    { gene: 'PARD3',  d: -1.08,  padj: 7.49e-6, note: 'Polarity complex scaffold · epithelial organization' },
    { gene: 'EIF1AX', d: -0.966, padj: 4.61e-12, note: 'X-linked translation initiation factor' },
    { gene: 'PARD6B', d: -0.852, padj: 8.66e-4 },
    { gene: 'SOX17',  d: -0.848, padj: 2.43e-3, note: 'Endodermal TF' },
    { gene: 'CCNE1',  d: -0.682, padj: 1.49e-2, note: 'Cyclin E1 · amplified ~20% HGSOC' },
    { gene: 'DDX3X',  d: -0.664, padj: 8.91e-5, note: 'X-linked RNA helicase' },
  ],
  brca12Mutant: [
    { gene: 'LUC7L2',   d: -1.331, p: 3.75e-3, note: 'RNA splicing factor' },
    { gene: 'LARP1',    d: -1.274, p: 1.93e-3 },
    { gene: 'PRPF38B',  d: -1.203, p: 2.16e-3, note: 'Pre-mRNA splicing' },
    { gene: 'METTL5',   d: -1.165, p: 4.12e-3 },
    { gene: 'PSMA7',    d: -1.148, p: 6.74e-4 },
    { gene: 'FANCC',    d: -1.13,  p: 1.51e-2, note: 'Fanconi C' },
    { gene: 'FANCM',    d: -1.127, p: 2.6e-2,  note: 'Fanconi M · SL with BRCA1/2' },
    { gene: 'H2AX',     d: -1.123, p: 1.69e-3, note: 'H2AX · DDR' },
  ],
  tp53Mutant: [
    { gene: 'POLR2K', d: -1.245, p: 0.145, note: 'RNA Pol II subunit' },
    { gene: 'FCGR1A', d: -1.212, p: 0.433 },
    { gene: 'WTAP',   d: -1.083, p: 0.202, note: 'mRNA m6A' },
    { gene: 'GTF2B',  d: -1.025, p: 0.204 },
  ],
  ccne1Amp: [
    { gene: 'SCRT1', d: -1.419, p: 2.29e-4 },
    { gene: 'GPS1',  d: -1.374, p: 4.79e-3 },
    { gene: 'INTS4', d: -1.315, p: 1.4e-2 },
    { gene: 'EIF3F', d: -1.212, p: 3.82e-3 },
  ],
} as const;

// -- Reconciliation --------------------------------------------------------

export const RECONCILIATION = {
  path: 'artifacts/canonical_atr_wee1_rerun_20260405/RECONCILIATION_TABLE.md',
  summary: 'Every manuscript rounded number matches the canonical rerun exactly at print precision.',
  denominators: '914 / 920 / 906 / 619 / 41 / 873 all match Methods_no_somatic_MBD4 WT rule.',
} as const;

// -- Disclosure gaps (subset relevant to SL surface) -----------------------

export const SL_GAPS = [
  {
    id: 'GAP-2',
    severity: 'medium',
    title: 'MBD4 n_LOF = 14 (or 19 for expression) is small',
    detail: 'Zygosity inferred from mutation calls rather than direct sequencing. Effect size is large but variance in a small cohort must be interpreted cautiously.',
  },
  {
    id: 'GAP-3',
    severity: 'medium',
    title: 'Immunotherapy axis is case-level',
    detail: 'Rodrigues 2018 and Saint-Ghislain 2022 are supportive; no isogenic ICI trial in MBD4-LOF.',
  },
  {
    id: 'GAP-5',
    severity: 'high',
    title: 'PARP1 expression cohort ≠ pharmacology WT',
    detail: 'PARP1 MWU uses n_WT=1498 (expression pool) while ceralasertib MWU uses n_WT=914 (pharmacology WT with somatic MBD4 excluded). Not directly comparable — but the falsification stands: PARP1 expression is not up.',
  },
] as const;

export const MANUSCRIPT = {
  title: 'MBD4 LOF defines a synthetic-lethal therapeutic state targetable by ATR inhibition rather than PARP in high-grade serous ovarian cancer',
  short: 'MBD4-LOF Dual Therapeutic Vulnerability',
  target: 'bioRxiv',
  ruo: true,
  path: 'crispro/publications/00-mbd4-manuscript/mbd4_parp_response/rxiv/manuscript.md',
  author: 'Fahad Kiani (CrisPRO.org)',
} as const;
