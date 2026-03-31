// ==============================================================================
// TARGET LOCK DATA — Receipt-Backed Repurposing Arsenal
// Source: KI repurposing_arsenal.md (verified March 4, 2026)
// Pipeline: IC50-to-free-Cmax ratio → deterministic feasibility gate
// ==============================================================================

export interface ArtifactRef {
  label: string;          // e.g. "NCT01579812", "PMC7308054", "PMID 40851910"
  type: 'nct' | 'pmc' | 'pmid' | 'ki' | 'script' | 'manuscript';
  url?: string;           // Optional link (PubMed, ClinicalTrials.gov)
}

export interface DrugCandidate {
  drug: string;
  tier: string;
  verdict: 'PASS' | 'CONDITIONAL' | 'FAIL';
  action: string;
  gapRatio: number | null;  // IC50-to-free-Cmax ratio
  gapDisplay: string;
  artifacts: ArtifactRef[];  // Chain of custody — every claim backed
  note: string;
}

export const REPURPOSING_ARSENAL: DrugCandidate[] = [
  {
    drug: 'Metformin',
    tier: 'Phase II',
    verdict: 'PASS',
    action: 'WATCH',
    gapRatio: 0.1,
    gapDisplay: '0.1×',
    artifacts: [
      { label: 'NCT01579812', type: 'nct', url: 'https://clinicaltrials.gov/study/NCT01579812' },
      { label: 'PMC7308054', type: 'pmc', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7308054/' },
    ],
    note: 'Only drug to pass with human Phase II evidence at feasible dosing.',
  },
  {
    drug: 'Mebendazole',
    tier: 'Phase I+',
    verdict: 'CONDITIONAL',
    action: 'WATCH',
    gapRatio: 6.7,
    gapDisplay: '6.7×',
    artifacts: [
      { label: 'PMC11763501', type: 'pmc', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11763501/' },
    ],
    note: 'IC50 source locked to PMC11763501 (OVCAR3, 0.1 µM).',
  },
  {
    drug: 'Disulfiram',
    tier: 'Preclinical',
    verdict: 'CONDITIONAL',
    action: 'WATCH',
    gapRatio: 8.3,
    gapDisplay: '8.3×',
    artifacts: [
      { label: 'KI:repurposing_arsenal', type: 'ki' },
    ],
    note: 'Active species is Cu(DDC)2 complex. Copper availability at tumor is primary variable.',
  },
  {
    drug: 'Artesunate',
    tier: 'Preclinical',
    verdict: 'CONDITIONAL',
    action: 'WATCH',
    gapRatio: 8.3,
    gapDisplay: '8.3×',
    artifacts: [
      { label: 'WHO Essential Medicines List', type: 'manuscript' },
    ],
    note: 'WHO Essential Medicine safety profile.',
  },
  {
    drug: 'Hydroxychloroquine',
    tier: 'Preclinical',
    verdict: 'CONDITIONAL',
    action: 'WATCH',
    gapRatio: 13.3,
    gapDisplay: '13.3×',
    artifacts: [
      { label: 'NCT03081702', type: 'nct', url: 'https://clinicaltrials.gov/study/NCT03081702' },
    ],
    note: 'Autophagy inhibitor. Lysosomal pH shift mechanism.',
  },
  {
    drug: 'Itraconazole',
    tier: 'Ph I Failure',
    verdict: 'FAIL',
    action: 'WATCH_HISTORICAL',
    gapRatio: 150,
    gapDisplay: '150×',
    artifacts: [
      { label: 'NCT03081702', type: 'nct', url: 'https://clinicaltrials.gov/study/NCT03081702' },
    ],
    note: '0 ORR — pharmacodynamic hit insufficient. score_floor=0.',
  },
  {
    drug: 'Ivermectin',
    tier: 'Insufficient',
    verdict: 'FAIL',
    action: 'QUARANTINE',
    gapRatio: 250,
    gapDisplay: '250×',
    artifacts: [
      { label: 'PMID 40851910', type: 'pmid', url: 'https://pubmed.ncbi.nlm.nih.gov/40851910/' },
      { label: 'PMID 35334396', type: 'pmid', url: 'https://pubmed.ncbi.nlm.nih.gov/35334396/' },
    ],
    note: 'Debunked. No achievable therapeutic concentration in humans.',
  },
  {
    drug: 'Niclosamide',
    tier: 'Formulation',
    verdict: 'FAIL',
    action: 'WATCH',
    gapRatio: 286,
    gapDisplay: '286×',
    artifacts: [
      { label: 'KI:repurposing_arsenal', type: 'ki' },
    ],
    note: 'Parent compound fails. Nanoencapsulated (NEN) IND needed.',
  },
  {
    drug: 'Simvastatin',
    tier: 'Epidemiol',
    verdict: 'FAIL',
    action: 'QUARANTINE',
    gapRatio: 5882,
    gapDisplay: '5,882×',
    artifacts: [
      { label: 'Mendelian Randomization 2024', type: 'manuscript' },
    ],
    note: '5882× gap computationally invalidates statin-cancer hypothesis at standard dosing.',
  },
  {
    drug: 'Salinomycin',
    tier: 'Insufficient',
    verdict: 'FAIL',
    action: 'QUARANTINE',
    gapRatio: null,
    gapDisplay: 'N/A',
    artifacts: [
      { label: 'KI:repurposing_arsenal', type: 'ki' },
    ],
    note: 'No human PK data available. Cannot compute feasibility.',
  },
];

// Derived stats — no hardcoding
export const ARSENAL_STATS = {
  total: REPURPOSING_ARSENAL.length,
  pass: REPURPOSING_ARSENAL.filter(d => d.verdict === 'PASS').length,
  conditional: REPURPOSING_ARSENAL.filter(d => d.verdict === 'CONDITIONAL').length,
  fail: REPURPOSING_ARSENAL.filter(d => d.verdict === 'FAIL').length,
  quarantined: REPURPOSING_ARSENAL.filter(d => d.action === 'QUARANTINE').length,
};

// Source provenance for the entire arsenal
export const ARSENAL_PROVENANCE = {
  verifiedDate: '2026-03-04',
  sourceKI: 'repurposing_arsenal.md',
  pipeline: 'IC50/Cmax Feasibility Gate',
  publishableReceipt: 'Computational feasibility gate deterministically stratifies repurposed drug candidates into actionable tiers.',
  sourceFiles: [
    'KI:repurposing_arsenal.md',
    'test_repurposing_arsenal.py',
    'prospective_validation_target_lock_scores.csv',
  ],
};

// ==============================================================================
// SIDEBAR DATA — all text artifact-backed from debrief
// Source: 11-fda-prediction-archive-debrief.mdc (lines 30-45)
// ==============================================================================
export const TARGET_LOCK_EXPLAINER = [
  { label: 'L1 — Target-Lock', text: 'Is this a real metastasis driver?', source: 'debrief:11-fda-prediction-archive, line 32' },
  { label: 'L2 — Mechanism Fit', text: 'Are the right patients being enrolled?', source: 'debrief:11-fda-prediction-archive, line 33' },
  { label: 'Key Insight', text: 'Both layers required. Target is almost never the failure mode.', source: 'debrief:11-fda-prediction-archive, line 36' },
  { label: 'The $300M Mistake', text: 'RIGHT target, WRONG enrollment.', source: 'debrief:11-fda-prediction-archive, line 45' },
];
