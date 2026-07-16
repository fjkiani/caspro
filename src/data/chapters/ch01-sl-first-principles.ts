// ============================================================================
// ch01-sl-first-principles.ts — Chapter 1: Synthetic Lethality — First Principles
//
// Public-safe rewrite of PhD KB Ch.1.1 (Definition and Conceptual Foundation).
// Source: internal roadmap Ch.1; public science preserved (BRCA/PARP, STAG1/2,
// paralog buffering, pathway redundancy).
// ============================================================================

import type { ResearchChapter } from '../chapters-index';

export const CH_01_SL_FIRST_PRINCIPLES: ResearchChapter = {
  slug: 'sl-first-principles',
  order: 1,
  title: 'Synthetic lethality — first principles',
  subtitle: 'The genetic-interaction insight that makes selective cancer therapy possible',
  readMinutes: 6,
  publicAnchors: [
    'BRCA1/2 loss + PARP inhibitor',
    'STAG2 loss + STAG1 dependency',
    'Paralog buffering',
    'Pathway redundancy',
  ],
  sections: [
    {
      heading: 'The definition',
      body: [
        'Synthetic lethality is a genetic interaction in which the simultaneous perturbation of two genes results in cell death, whereas perturbation of either gene alone is tolerated. The concept was first described in Drosophila genetics by Calvin Bridges in 1922 and formalised by Theodore Dobzhansky in 1946.',
        'The modern therapeutic application rests on a deceptively simple insight: if a tumour has already acquired a loss-of-function mutation in Gene A (the "first hit"), then pharmacological inhibition of Gene B (the "second hit") selectively kills cancer cells while sparing normal tissue that retains both functional copies.',
      ],
    },
    {
      heading: 'Why it produces a therapeutic window',
      body: [
        'This selectivity is the foundational advantage of SL-based therapy over conventional cytotoxic chemotherapy. Rather than exploiting differential proliferation rates — which causes collateral damage to all dividing cells — SL exploits a qualitative genetic difference between the tumour and the host.',
        'The tumour is uniquely vulnerable because it has already lost one arm of a redundant survival mechanism. Normal cells tolerate the drug because they retain the function the tumour has lost.',
      ],
    },
    {
      heading: 'The two-gene model',
      body: [
        'In the classical model, two genes (A and B) are synthetic lethal if: single knockout is tolerated (loss of A alone → viable; loss of B alone → viable) but double knockout is lethal (loss of A AND B simultaneously → cell death). The therapeutic window opens when tumour cells carry a somatic loss-of-function in A while normal cells retain functional A.',
      ],
    },
    {
      heading: 'The mechanistic categories',
      body: [
        '**Paralog buffering.** Many genes have paralogs — evolutionarily related copies that perform overlapping functions. When the primary gene is lost, its paralog compensates. The paralog then becomes an essential gene specifically in the context of the primary loss. Example: STAG1/STAG2 in the cohesin complex. STAG2 loss is common in urothelial carcinoma; STAG1 becomes essential in STAG2-null cells.',
        '**Pathway redundancy.** Two distinct pathways may converge on the same essential cellular output. Loss of one pathway forces total dependency on the other. The canonical example is BRCA1/2 loss (homologous-recombination deficiency) creating dependency on PARP-mediated base excision repair and alternative repair pathways.',
        '**The "second hit" concept.** The therapeutic paradigm is that the tumour has already acquired the first hit through somatic mutation, deletion, epigenetic silencing, or copy-number loss. The drug delivers the second hit by inhibiting the synthetic-lethal partner. This is fundamentally different from oncogene addiction (where the driver itself is inhibited) — in SL, we inhibit a gene that is not itself mutated but has become essential because of the tumour’s existing mutations.',
      ],
    },
    {
      heading: 'The canonical example',
      body: [
        'PARP inhibitors work in BRCA1/2-mutant cancers but not in BRCA-wildtype tumours. BRCA1/2 loss impairs homologous recombination; PARP inhibition then removes the remaining base-excision-repair backstop, and the double DNA-repair deficit is what kills the tumour cell. Normal cells retain BRCA1/2 and tolerate PARP inhibition.',
        'This is the shape of every SL-based therapy: the tumour’s own mutation defines its vulnerability.',
      ],
    },
  ],
  keyInsight:
    'SL-based therapy is selective by design. The tumour’s own mutation defines its vulnerability. Normal cells tolerate the drug because they retain the function the tumour has lost.',
  linksIntoDepth: {
    axes: ['ddr'],
    modalities: ['clinical', 'in-vitro-functional'],
    tiers: ['validated'],
    capabilities: ['gate-tier-scoring', 'biomarker-failure-prediction'],
  },
};
