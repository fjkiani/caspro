// ==============================================================================
// SAFETY & DOSING ENGINE DATA REGISTRY
// Source: PGx Publication Audit (05-pgx-dosing-guidance), CPIC Guidelines
// Every number is from audited receipts. Zero hallucinations.
// ==============================================================================

// ─── Typewriter Phrases ──────────────────────────────────────────────────────

export const SAFETY_TYPEWRITER_PHRASES = [
  'DPYD c.2846A>T detected → REDUCE 50%. CPIC-grounded. No override.',
  '83.1% relative risk reduction. 563 patients. PREPARE trial (PMID 39641926).',
  'CYP2C19 PM/IM: 4.28× ischemic event risk. p = 6.7×10⁻⁴. n=210.',
  'Tier 2 heuristic: 100% sensitivity. 0 false negatives. 6/6 true positives.',
  '87.5% toxicity prevention projection — 7/8 events caught before enrollment.',
  'RNF144A: p = 0.53. Field was wrong. PARP1 upregulation is transcriptional.',
  'IO Risk-Benefit Gate: deterministic veto. Net benefit < 0 = no treatment.',
  '100% CPIC concordance. 10/10 exact matches. DPYD + TPMT validated.',
];

// ─── PGx Dosing Guidance (CPIC-backed) ───────────────────────────────────────

export interface PGxGene {
  gene: string;
  variant?: string;
  phenotype: string;
  adjustment: string;
  cpicLevel: string;
  slug: string;
}

export const PGX_GENES: PGxGene[] = [
  { gene: 'DPYD', variant: 'c.2846A>T', phenotype: 'Intermediate Metabolizer', adjustment: 'REDUCE 50%', cpicLevel: '1A', slug: 'DPYD_TOX' },
  { gene: 'DPYD', variant: 'c.1903A>G', phenotype: 'Intermediate Metabolizer', adjustment: 'REDUCE 50%', cpicLevel: '1A', slug: 'DPYD_VAR2' },
  { gene: 'DPYD', variant: 'Wild-Type', phenotype: 'Normal Metabolizer', adjustment: 'FULL DOSE', cpicLevel: '1A', slug: 'DPYD_WT' },
  { gene: 'TPMT', variant: '*3A', phenotype: 'Intermediate Metabolizer', adjustment: 'REDUCE 30-70%', cpicLevel: '1A', slug: 'TPMT_ADJ' },
  { gene: 'UGT1A1', variant: '*28/*28', phenotype: 'Poor Metabolizer', adjustment: 'REDUCE 20%', cpicLevel: '1A', slug: 'UGT1A1_PM' },
  { gene: 'CYP2C19', variant: 'PM/IM', phenotype: 'Poor/Intermediate', adjustment: 'AVOID CLOPIDOGREL', cpicLevel: '1A', slug: 'CYP2C19_PM' },
];

// ─── CPIC Concordance ────────────────────────────────────────────────────────

export const CPIC_CONCORDANCE = {
  totalCases: 59,
  casesWithMatch: 10,
  concordanceRate: '100%',
  exactMatches: 10,
  moreConservative: 0,
  lessConservative: 0,
  unknownNoCpic: 49,
  genes: [
    { gene: 'DPYD', total: 9, concordant: 9, rate: '100%' },
    { gene: 'TPMT', total: 1, concordant: 1, rate: '100%' },
  ],
};

// ─── PREPARE Cohort (PMID 39641926) ──────────────────────────────────────────

export const PREPARE_DATA = {
  pmid: '39641926',
  totalPatients: 563,
  actionableCarriers: 40,
  nonActionable: 523,
  rrrActionable: '83.1%',
  rrrNonActionable: '4.1%',
  fisherP: '0.020',
  toxicityPreventionRate: '87.5%',
  toxicitiesPrevented: '7/8',
};

// ─── CYP2C19 Cohort (PMID 40944685) ─────────────────────────────────────────

export const CYP2C19_DATA = {
  pmid: '40944685',
  riskRatio: '4.28×',
  fisherP: '6.7×10⁻⁴',
  clopidogrelSubset: 210,
  extensiveMetabolizer: 106,
  poorIntermediate: 104,
};

// ─── Tier 2 Heuristic Validation ─────────────────────────────────────────────

export const TIER2_VALIDATION = {
  sensitivity: '100%',
  falseNegatives: 0,
  truePositives: '6/6',
  scorableCases: 16,
};

// ─── Safety Provenance Slugs ─────────────────────────────────────────────────

export interface ProvenanceItem {
  slug: string;
  description: string;
  meta: string;
}

export const SAFETY_PROVENANCE: ProvenanceItem[] = [
  { slug: 'CPIC_CONCORDANCE', description: '100% concordance on DPYD + TPMT dosing', meta: 'v1.4 API' },
  { slug: 'PREPARE_RRR', description: '83.1% relative risk reduction, n=563', meta: 'PMID 39641926' },
  { slug: 'CYP2C19_RISK', description: '4.28× ischemic event risk in PM/IM', meta: 'PMID 40944685' },
  { slug: 'TIER2_SENS', description: '100% sensitivity, 0 false negatives', meta: '6/6 TP' },
  { slug: 'VETO_LOGIC', description: 'Deterministic: high toxicity → veto treatment', meta: 'Net Benefit' },
];

// ─── Sidebar Tabs ─────────────────────────────────────────────────────────────

export const SAFETY_TABS = [
  { key: 'pgx', label: 'PGx Dosing', slug: 'CPIC_1A' },
  { key: 'prepare', label: 'PREPARE Trial', slug: 'RRR_83.1%' },
  { key: 'cyp2c19', label: 'CYP2C19 Risk', slug: '4.28×' },
  { key: 'provenance', label: 'Safety Provenance', slug: 'AUDIT_100%' },
] as const;

export type SafetyTabKey = typeof SAFETY_TABS[number]['key'];
