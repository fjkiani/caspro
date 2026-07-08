// ============================================================================
// ch07-target-lock.ts — Chapter 7: Target lock — single-target vs multi-target
//
// Public-safe abstract of target-lock capability description.
// ============================================================================

import type { ResearchChapter } from '../chapters-index';

export const CH_07_TARGET_LOCK: ResearchChapter = {
  slug: 'target-lock',
  order: 7,
  title: 'Target lock',
  subtitle: 'The decision of what to build against — one target or many',
  readMinutes: 5,
  publicAnchors: [
    'PARP as a single-target lock (BRCA1/2 / HRD)',
    'BRAF+MEK as a two-target lock (BRAF-V600E)',
    'ATR + PARP synthetic-lethal combinations',
    'HER2 antibody-drug conjugates as multi-mechanism single-agents',
  ],
  sections: [
    {
      heading: 'Why the decision matters',
      body: [
        'Every drug-discovery program has to decide what it is building against: one target, a fixed combination, or a broader multi-target strategy. That decision constrains everything downstream — the biology it can access, the trial designs available, and the resistance mechanisms it will face.',
        'Target lock is the platform-level view of that decision: given a tumour biology profile, which target set produces the best mechanistic fit, and which target set exhausts the biology fastest under expected resistance?',
      ],
    },
    {
      heading: 'Single-target locks',
      body: [
        'A single-target lock produces the cleanest development path when the target is genuinely non-redundant in the driver context. The canonical case is PARP inhibition in BRCA1/2-mutant / HRD-positive tumours: BRCA loss makes PARP-mediated repair non-redundant, and single-agent PARP inhibition is durable enough to open its own line of therapy.',
        'Single-target locks fail when the target has parallel pathways that can compensate — the reason single-agent MEK inhibition has limited durability in KRAS-mutant CRC despite mechanistic alignment, and why RAF-monotherapy in BRAF-V600E is inferior to combined BRAF+MEK.',
      ],
    },
    {
      heading: 'Multi-target locks',
      body: [
        'A multi-target lock — a fixed combination or a multi-specific single agent — addresses the redundancy problem head-on. BRAF+MEK, ATR+PARP synthetic-lethal combinations, and HER2 antibody-drug conjugates (payload + receptor) are all examples where the mechanistic reason for the combination is written into the drug design.',
        'Multi-target locks come with their own cost: overlapping toxicity, more restrictive combination-tolerability windows, and higher trial-design complexity. The platform evaluates whether the tumour biology genuinely requires the combination or whether the second agent is producing an efficacy signal that a single-target design would also have captured.',
      ],
    },
    {
      heading: 'What the platform outputs',
      body: [
        'For a given tumour biology profile and a candidate target set, the platform emits a target-lock recommendation: single-target, fixed combination, or broader multi-target — with an explicit rationale for the choice grounded in the tumour’s specific mechanism axes.',
        'The output is not a prediction of clinical outcome. It is the mechanistic argument for why one target-lock structure is better matched to this biology than another. A program team then combines that argument with pharmacology, tolerability, and competitive-landscape context to make the actual decision.',
      ],
    },
  ],
  keyInsight:
    'Single-target locks win when the target is truly non-redundant. Multi-target locks are needed when the tumour has a parallel pathway that will otherwise compensate. The distinction is a property of the biology, not a matter of taste.',
  linksIntoDepth: {
    axes: ['ddr', 'mapk', 'her2', 'rss'],
    modalities: ['clinical', 'in-vitro-functional', 'in-vivo'],
    tiers: ['validated', 'strong'],
    capabilities: ['multi-asset-scoring', 'mechanism-divergence'],
  },
};
