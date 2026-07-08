// ==============================================================================
// ENGINE REGISTRY — Single Source of Truth for all platform engines
// Serializable data only (no Lucide icons — use getEngineIcon(slug) on the client).
// ==============================================================================

import { normalizeEngineSlug } from '@/data/engine-slug';

export interface EngineEntry {
  id: string;
  layer: string;
  label: string;
  shortLabel: string;
  slug: string;
  route: string;
  desc: string;
  heroTagline: string;
  typewriterPhrases: string[];
  status: 'ACTIVE' | 'OPTIMIZED' | 'STANDBY' | 'DEVELOPMENT';
  version: string;
  keyMetric: string;
  active: boolean;
  showInEnginesNav?: boolean;
  zetaHeadline?: string;
}

export const ENGINE_REGISTRY: EngineEntry[] = [
  {
    id: '01',
    layer: 'L1',
    label: 'Target-Lock',
    shortLabel: 'Target Lock',
    slug: 'target-lock',
    route: '/engine/target-lock/',
    desc: 'Automated target vulnerability profiling using 3D structural simulation.',
    heroTagline: '9/9 FDA concordance. The only AI that locks real targets before enrollment opens.',
    typewriterPhrases: [
      'KRAS G12C → covalent pocket confirmed. 9/9 FDA matches.█',
      'CDK4/6 wildtype → enrichment signal absent. Target rejected.█',
      'BRAF V600E → structural activation loop locked at 3.1Å.█',
      'AKT1 E17K → allosteric druggability: confirmed HIGH.█',
      'MET exon 14 skip → kinase domain overexposed. Lock acquired.█',
    ],
    status: 'OPTIMIZED',
    version: '4.2.1',
    keyMetric: 'AUC 0.68',
    active: true,
  },
  {
    id: '02',
    layer: 'L2',
    label: 'Mechanism Alignment',
    shortLabel: 'MoA Align',
    slug: 'mechanism-alignment',
    route: '/engine/mechanism-alignment/',
    desc: 'Mechanism alignment manifold synchronization for clinical trial failure analysis.',
    heroTagline: 'Most cancer trials fail for a simple reason. Nobody checks Layer 2.',
    typewriterPhrases: [
      'LATIFY (NCT05450692): cold TME + missing STK11/KEAP1 gate vs ATRi hypothesis.█',
      'Mechanism alignment divergence at Dimension 3: target selectivity failure.█',
      'MEK escape via NRAS Q61K amplification — confound unmasked.█',
      'Encorafenib + Cetuximab: vector alignment score 0.91/1.0. Pass.█',
      'NCT02928224 failure root-caused: D3 + D5 misalignment detected.█',
    ],
    status: 'ACTIVE',
    version: '3.1.0',
    keyMetric: 'Mechanism alignment',
    active: true,
  },
  {
    id: '05',
    layer: 'L5',
    label: 'Synthetic Lethality',
    shortLabel: 'SL Engine',
    slug: 'synthetic-lethality',
    route: '/engine/synthetic-lethality/',
    desc: 'Multi-modal evidence fuser for MBD4-LOF vulnerability discovery across 7 orthogonal modalities.',
    heroTagline: 'MBD4 loss → BER collapse → dual therapeutic axis. Ceralasertib p=0.034, 4/4 confound stress tests pass.',
    typewriterPhrases: [
      'MBD4 loss-of-function → BER glycosylase gone → CpG>TpG hypermutation.█',
      'ATR dependency exposed → replication fork stalls without repair.█',
      'Ceralasertib SL confirmed: p=0.034, isogenic HAP1 validated.█',
      '4/4 confound stress tests passed — MSI, TP53, BRCA controls clean.█',
      'GDSC2 Δ LN_IC50 = −0.88, AUC shift p<0.001. Receipt locked.█',
    ],
    status: 'ACTIVE',
    version: '4.0.0',
    keyMetric: 'd = −0.88',
    active: true,
  },
  {
    id: '06',
    layer: 'L6',
    label: 'Safety & Dosing',
    shortLabel: 'PGx',
    slug: 'safety-dosing',
    route: '/engine/safety-dosing/',
    desc: 'PGx dosing guidance and IO risk-benefit gate — 100% CPIC concordance, 83.1% RRR (PREPARE), deterministic veto logic.',
    heroTagline: '100% CPIC concordance. 83.1% relative risk reduction. The gate that prevents the toxicity that kills your trial.',
    typewriterPhrases: [
      'CYP2C19 poor metabolizer → clopidogrel veto. Switch: ticagrelor.█',
      'DPYD*2A carrier → 5-FU dose reduced 50%. Fatal toxicity averted.█',
      '100% CPIC concordance across 23 pharmacogenomic drug pairs.█',
      'PREPARE trial: 83.1% relative risk reduction in adverse events.█',
      'Warfarin INR instability → VKORC1 + CYP2C9 interaction caught.█',
    ],
    status: 'ACTIVE',
    version: '6.2.9',
    keyMetric: '100% CPIC',
    active: true,
  },
  {
    id: '07',
    layer: 'L7',
    label: 'Safety',
    shortLabel: 'Safety',
    slug: 'safety',
    route: '/engine/safety/',
    desc: 'Evidence ledger: 7-axis SL matrix, PubMed receipts, CRISPR vs GDSC2 concordance, calibration rigor bar.',
    heroTagline: 'Every claim has a receipt. 5 PubMed anchors, isogenic validation, PDX confirmation. No hallucinations.',
    zetaHeadline: 'Receipts, validated.',
    typewriterPhrases: [
      'Cytidine analogs: isogenic + PDX + patient response. 5 receipts.█',
      'PARP inhibitors: CRISPR Δ=+0.03, GDSC2 Δ=−0.02 → both flat. Rejected.█',
      'WRN inhibitors: MSI dependency absent in MBD4-LOF. Rejected.█',
      'PubMed 36323843: MBD4 KO → cytidine SL confirmed (HAP1 + PDX).█',
      'PARP meets 1 of 5 gold-standard criteria. Calibration bar: failed.█',
    ],
    status: 'ACTIVE',
    version: '1.0.0',
    keyMetric: '5 PubMed',
    active: true,
    showInEnginesNav: false,
  },
];

export const getActiveEngines = () => ENGINE_REGISTRY.filter((e) => e.active);

export const getEnginesForNav = () => getActiveEngines().filter((e) => e.showInEnginesNav !== false);

export const getEngineBySlug = (slug: string | undefined | null) => {
  const key = normalizeEngineSlug(slug);
  return ENGINE_REGISTRY.find((e) => e.slug === key);
};

export const getEngineById = (id: string) => ENGINE_REGISTRY.find((e) => e.id === id);
