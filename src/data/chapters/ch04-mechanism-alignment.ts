// ============================================================================
// ch04-mechanism-alignment.ts — Chapter 4: The mechanism-alignment layer
//
// Public-safe abstract: how patient biology is aligned to a therapy's target
// requirements without disclosing the ranker math or dimensionality.
// ============================================================================

import type { ResearchChapter } from '../chapters-index';

export const CH_04_MECHANISM_ALIGNMENT: ResearchChapter = {
  slug: 'mechanism-alignment',
  order: 4,
  title: 'The mechanism-alignment layer',
  subtitle: 'How a patient biology profile is aligned to a therapy target set',
  readMinutes: 6,
  publicAnchors: [
    'Trastuzumab requires HER2 amplification, not just breast-cancer histology',
    'Sotorasib requires KRAS G12C, not just KRAS-mutant',
    'Olaparib requires HRD, not just BRCA-associated cancer',
  ],
  sections: [
    {
      heading: 'What alignment means',
      body: [
        'Every approved targeted therapy is aligned to a set of mechanistic requirements. The therapy works when those requirements are met and does not work when they are not — regardless of the patient’s histology, disease stage, or line of therapy.',
        'The mechanism-alignment layer is the platform component that decides, for a given patient biology profile and a given therapy target set, whether the mechanism actually aligns.',
      ],
    },
    {
      heading: 'The problem it solves',
      body: [
        'Standard clinical trial designs enrol patients by disease and stage. This produces populations that are mechanistically heterogeneous: a "KRAS-mutant colorectal cancer" cohort contains G12C, G12D, G12V, G12A, and G13D patients whose response to any single KRAS-directed therapy is very different.',
        'The consequence is that a therapy with a real mechanistic response in a subgroup can be reported as failed in the overall cohort. This is the pattern the mechanism-alignment layer is built to catch before a trial is opened, not after it has read out.',
      ],
    },
    {
      heading: 'What gets aligned',
      body: [
        'A patient is described by a set of measurable biology features: DNA-repair status, MAPK-pathway subtype, PI3K-axis state, angiogenesis signalling, HER-family receptor state, immune / IO signal, drug-efflux capacity, and replication-stress signature.',
        'A therapy is described by the biology features it requires and the biology features it is neutral to. Alignment is high when the patient carries the features the therapy requires and does not carry features that predict escape or non-response.',
      ],
    },
    {
      heading: 'What good alignment looks like in public data',
      body: [
        '**Trastuzumab.** HER2 amplification is the alignment feature. HER2-amp breast cancer aligns; HER2-normal breast cancer does not. The alignment holds across metastatic breast, HER2-positive gastric, and HER2-mutant contexts (with different receptor thresholds).',
        '**Sotorasib.** KRAS-G12C is the alignment feature. Not "KRAS-mutant" as a whole. G12C-negative KRAS-mutants do not align, and this is why single-arm response rates across "KRAS-mutant NSCLC" are misleading if the G12C subgroup is not separated.',
        '**Olaparib.** Homologous-recombination deficiency is the alignment feature. BRCA1/2 mutations, ATM loss, PALB2 loss, and HRD-signature-positive tumours align; BRCA-wildtype / HRD-signature-negative tumours do not.',
      ],
    },
    {
      heading: 'What alignment does not do',
      body: [
        'Alignment does not predict individual patient outcomes. It scores whether the mechanism the therapy needs is present in the biology profile — the actual clinical response depends on penetration, dose, adherence, immune status, prior therapy, and factors outside the mechanism space.',
        'Alignment is a filter, not a prognosis: it tells a trial designer or partner where the therapy has a plausible mechanistic case, and where it does not.',
      ],
    },
  ],
  keyInsight:
    'A trial designed on disease + stage enrols mechanistic heterogeneity. Alignment turns that heterogeneity into a labelled subgroup that either does or does not meet the therapy’s mechanistic requirements — before the trial reads out.',
  linksIntoDepth: {
    axes: ['ddr', 'mapk', 'pi3k', 'her2', 'io'],
    modalities: ['clinical', 'in-vitro-functional'],
    tiers: ['strong', 'mechanistic'],
    capabilities: ['gate-tier-scoring', 'mechanism-divergence'],
  },
};
