// ==============================================================================
// ENGINE REGISTRY — Legacy layered-engine metadata for the /engine/[slug] deep-dives
// and the product navbar. Vague-scrubbed against caspro-lint/README.md. This file is
// no longer the primary source of truth for the capability spine — see
// `capability-registry.ts` for the shipped 5-capability CrisPRO surface.
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
  subroutes?: Array<{ label: string; route: string; description?: string }>;
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
    desc: 'Structural target-vulnerability profiling for oncology drug design and pre-clinical decision support.',
    heroTagline: 'Lock the target before enrollment opens.',
    typewriterPhrases: [
      'KRAS G12C → covalent pocket confirmed.█',
      'CDK4/6 wildtype → enrichment signal absent. Target rejected.█',
      'BRAF V600E → activation loop structurally accessible.█',
      'AKT1 E17K → allosteric druggability confirmed.█',
      'MET exon 14 skip → kinase domain overexposed. Lock acquired.█',
    ],
    status: 'OPTIMIZED',
    version: '4.2.1',
    keyMetric: 'Structural fit',
    active: true,
    subroutes: [
      { label: 'Brain-Met · Scroll', route: '/engine/target-lock/scroll',   description: '7-step BrM cascade — Evo2 delta_ll variants — AUROC 0.6889 on 29-gene panel.' },
      { label: 'Brain-Met · Tabs',   route: '/engine/target-lock/tabs',    description: 'Per-step tab strip covering primary_tumor_escape → brm_angiogenesis.' },
    ],
  },
  {
    id: '02',
    layer: 'L2',
    label: 'Mechanism Alignment',
    shortLabel: 'MoA Align',
    slug: 'mechanism-alignment',
    route: '/engine/mechanism-alignment/',
    desc: 'Mechanism alignment surface for interpreting trial failure through drug-MOA vs. patient-biology divergence.',
    heroTagline: 'Most cancer trials fail for a simple reason. Nobody checks the mechanism layer.',
    typewriterPhrases: [
      'Trial decode: primary failure domain flagged in under a session.█',
      'Cold TME + missing DDR gate vs. ATRi hypothesis — divergence named.█',
      'MEK escape via NRAS Q61K amplification — confound unmasked.█',
      'Encorafenib + Cetuximab: vector alignment strong. Pass.█',
      'Selection-domain failure root-caused before repeat trial.█',
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
    desc: 'Multi-modal evidence fuser for synthetic-lethal vulnerability discovery across orthogonal modalities.',
    heroTagline: 'Loss-of-function → repair collapse → dual therapeutic axis — with confound stress tests.',
    typewriterPhrases: [
      'Loss-of-function nominated → repair-collapse hypothesis staged.█',
      'ATR-axis dependency exposed under replication stress.█',
      'SL confirmed against isogenic control panel.█',
      'Confound stress tests passed — MSI, TP53, BRCA controls clean.█',
      'Public cell-line panel supports the axis. Receipt locked.█',
    ],
    status: 'ACTIVE',
    version: '4.0.0',
    keyMetric: 'SL axis',
    active: true,
    subroutes: [
      { label: 'MBD4 · Scroll', route: '/engine/synthetic-lethality/scroll', description: '4-axis manuscript: cytidine (validated) → immunotherapy → ATRi (novel primary) → PARPi FALSIFIED → convergence.' },
      { label: 'MBD4 · Tabs',   route: '/engine/synthetic-lethality/tabs',  description: 'Per-axis tab strip + reconciliation + gap disclosure + ovarian precomputed hits.' },
    ],
  },
  {
    id: '06',
    layer: 'L6',
    label: 'Safety & Dosing',
    shortLabel: 'PGx',
    slug: 'safety-dosing',
    route: '/engine/safety-dosing/',
    desc: 'PGx dosing guidance and IO risk-benefit gate — CPIC-aligned, deterministic veto logic.',
    heroTagline: 'CPIC-aligned dosing gate. The check that prevents the toxicity that kills your trial.',
    typewriterPhrases: [
      'CYP2C19 poor metabolizer → clopidogrel veto. Switch: ticagrelor.█',
      'DPYD*2A carrier → 5-FU dose reduced. Fatal toxicity averted.█',
      'CPIC concordance across pharmacogenomic drug pairs.█',
      'Prospective pre-emptive PGx testing reduces adverse events.█',
      'Warfarin INR instability → VKORC1 + CYP2C9 interaction caught.█',
    ],
    status: 'ACTIVE',
    version: '6.2.9',
    keyMetric: 'CPIC-aligned',
    active: true,
  },
  {
    id: '07',
    layer: 'L7',
    label: 'Safety',
    shortLabel: 'Safety',
    slug: 'safety',
    route: '/engine/safety/',
    desc: 'Evidence ledger: SL matrix, PubMed receipts, isogenic and PDX concordance, calibration bar.',
    heroTagline: 'Every claim has a receipt. Isogenic and PDX validation. No hallucinations.',
    zetaHeadline: 'Receipts, validated.',
    typewriterPhrases: [
      'Cytidine-analog axis: isogenic + PDX + patient response receipts.█',
      'Off-axis inhibitors: dependency signal absent → rejected.█',
      'Non-target dependency absent in the LOF context. Rejected.█',
      'PubMed anchors listed for each supported axis.█',
      'Off-axis candidates fail calibration bar and are excluded.█',
    ],
    status: 'ACTIVE',
    version: '1.0.0',
    keyMetric: 'Evidence ledger',
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
