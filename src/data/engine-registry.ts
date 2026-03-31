// ==============================================================================
// ENGINE REGISTRY — Single Source of Truth for all platform engines
// Consumed by: ZetaNavbar (dropdown), EngineStack (homepage), engine pages
// ZERO hardcoding — add/remove engines here and every UI updates automatically
// ==============================================================================

import { Target, Fingerprint, Cpu, ShieldCheck, Beaker, FlaskConical, ClipboardList, type LucideIcon } from 'lucide-react';

export interface EngineEntry {
  id: string;                   // sidebar key: '01', '02', etc.
  layer: string;                // L1, L2, L3, L4
  label: string;                // display name
  shortLabel: string;           // navbar dropdown compact
  slug: string;                 // route slug
  route: string;                // full route path
  desc: string;                 // short description
  heroTagline: string;          // dynamic subtitle for hero overlay
  typewriterPhrases: string[];  // glitch typewriter shown above engine panel
  status: 'ACTIVE' | 'OPTIMIZED' | 'STANDBY' | 'DEVELOPMENT';
  icon: LucideIcon;             // lucide icon component
  version: string;
  keyMetric: string;            // headline stat
  active: boolean;              // show in UI?
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
    icon: Target,
    version: '4.2.1',
    keyMetric: 'AUC 0.822',
    active: true,
  },
  {
    id: '02',
    layer: 'L2',
    label: 'Mechanism Alignment',
    shortLabel: 'MoA Align',
    slug: 'mechanism-alignment',
    route: '/engine/mechanism-alignment/',
    desc: '8D vector manifold synchronization for clinical trial failure analysis.',
    heroTagline: 'Most cancer trials fail for a simple reason. Nobody checks Layer 2.',
    typewriterPhrases: [
      'LATIFY trial: BRAF V600E + MEK off-target → pathway reactivation.█',
      '8D vector divergence at Dimension 3: target selectivity failure.█',
      'MEK escape via NRAS Q61K amplification — confound unmasked.█',
      'Encorafenib + Cetuximab: vector alignment score 0.91/1.0. Pass.█',
      'NCT02928224 failure root-caused: D3 + D5 misalignment detected.█',
    ],
    status: 'ACTIVE',
    icon: Fingerprint,
    version: '3.1.0',
    keyMetric: '8D Vector',
    active: true,
  },
  {
    id: '03',
    layer: 'L3',
    label: 'Kill Chain',
    shortLabel: 'Kill Chain',
    slug: 'kill-chain',
    route: '/engine/kill-chain/',
    desc: 'Resistance detection via 12-class taxonomy, 8-signal channels, 7D strike vector.',
    heroTagline: 'Tumors evolve. So should your protocol. Intercept resistance before it intercepts your trial.',
    typewriterPhrases: [
      'CCNE1 amplification → CDK2 bypass → PARP resistance class 7.█',
      'ctDNA signal rising → BRCA reversion detected at day 112.█',
      'Lineage plasticity score 0.78 → phenotypic switch imminent.█',
      'WEE1 upregulation → G2/M checkpoint re-armed. Pivot required.█',
      'Intercept window: 23 days before clinical resistance manifests.█',
    ],
    status: 'ACTIVE',
    icon: Cpu,
    version: '6.2.9',
    keyMetric: 'AUROC 0.783',
    active: true,
  },
  {
    id: '04',
    layer: 'L4',
    label: 'IO Risk-Benefit Gate',
    shortLabel: 'IO Gate',
    slug: 'io-risk-benefit',
    route: '/engine/io-risk-benefit/',
    desc: 'Dynamic harm prevention gate for IO therapeutic selection.',
    heroTagline: 'Immunotherapy can cure — or kill. This gate ensures only the right patients get through.',
    typewriterPhrases: [
      'TMB-H + PD-L1 >50% → IO eligible. Gate: OPEN.█',
      'Colitis risk 34% → irAE veto flagged before first infusion.█',
      'MSI-H → pembrolizumab NCB score +0.76. Cleared to proceed.█',
      'Low TMI + autoimmune history → gate CLOSED. Pivot to TKI.█',
      'Net Clinical Benefit: benefit 0.82, harm 0.18. Patient cleared.█',
    ],
    status: 'ACTIVE',
    icon: ShieldCheck,
    version: '2.4.0',
    keyMetric: 'NCB Active',
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
    icon: Beaker,
    version: '4.0.0',
    keyMetric: 'd = −0.88',
    active: true,
  },
  {
    id: '06',
    layer: 'L6',
    label: 'Safety & Dosing',
    shortLabel: 'Safety Gate',
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
    icon: FlaskConical,
    version: '6.2.9',
    keyMetric: '100% CPIC',
    active: true,
  },
  {
    id: '07',
    layer: 'L7',
    label: 'Evidence Ledger',
    shortLabel: 'Evidence',
    slug: 'evidence-matrix',
    route: '/engine/evidence-matrix/',
    desc: 'Multi-modal evidence fuser: 7-axis SL matrix, PubMed receipts, CRISPR vs GDSC2 concordance, calibration rigor bar.',
    heroTagline: 'Every claim has a receipt. 5 PubMed anchors, isogenic validation, PDX confirmation. No hallucinations.',
    typewriterPhrases: [
      'Cytidine analogs: isogenic + PDX + patient response. 5 receipts.█',
      'PARP inhibitors: CRISPR Δ=+0.03, GDSC2 Δ=−0.02 → both flat. Rejected.█',
      'WRN inhibitors: MSI dependency absent in MBD4-LOF. Rejected.█',
      'PubMed 36323843: MBD4 KO → cytidine SL confirmed (HAP1 + PDX).█',
      'PARP meets 1 of 5 gold-standard criteria. Calibration bar: failed.█',
    ],
    status: 'ACTIVE',
    icon: ClipboardList,
    version: '1.0.0',
    keyMetric: '5 PubMed',
    active: true,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Get only active engines (for UI rendering) */
export const getActiveEngines = () => ENGINE_REGISTRY.filter(e => e.active);

/** Normalize dynamic segment (handles trailing slashes, encoding) */
export function normalizeEngineSlug(raw: string | undefined | null): string {
  if (raw == null) return '';
  let s = String(raw).trim();
  try {
    s = decodeURIComponent(s);
  } catch {
    /* ignore */
  }
  return s.replace(/^\/+|\/+$/g, '');
}

/** Find engine by route slug */
export const getEngineBySlug = (slug: string | undefined | null) => {
  const key = normalizeEngineSlug(slug);
  return ENGINE_REGISTRY.find(e => e.slug === key);
};

/** Find engine by sidebar ID */
export const getEngineById = (id: string) => ENGINE_REGISTRY.find(e => e.id === id);

/** Convert to EngineItem shape for EngineSidebar compatibility */
export const toSidebarItems = () =>
  getActiveEngines().map(e => ({
    id: e.id,
    label: e.label,
    icon: e.icon,
    desc: e.desc,
    status: e.status,
    color: 'bg-cyan-500/10 border-cyan-500/50',
    border: 'border-cyan-400/30',
  }));
