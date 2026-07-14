// ============================================================================
// ch06-trial-target-library.ts — Chapter 6: The trial-target library
//
// Public-safe abstract of the trial-vector library concept.
// ============================================================================

import type { ResearchChapter } from '../chapters-index';

export const CH_06_TRIAL_TARGET_LIBRARY: ResearchChapter = {
  slug: 'trial-target-library',
  order: 6,
  title: 'The trial-target library',
  subtitle: 'How every therapy is described by the mechanism features it requires',
  readMinutes: 6,
  publicAnchors: [
    'Olaparib target profile: HRD + selective PARP dependency',
    'Sotorasib target profile: KRAS G12C + MAPK dependency',
    'Trastuzumab-deruxtecan target profile: HER2 expression + intact ADC handling',
    'Pembrolizumab target profile: intact IO axis + inflamed microenvironment',
  ],
  sections: [
    {
      heading: 'What a target profile is',
      body: [
        'For every candidate therapy — approved, in-trial, or in-preclinical — the platform maintains a mechanistic target profile. The profile describes, on the same axes as a patient biology profile, what mechanism features the therapy requires for a plausible response and what features predict escape or non-response.',
        'A therapy’s profile is not the same as its indication. Olaparib’s indication is BRCA-mutant / HRD-positive breast, ovarian, prostate, and pancreatic cancer. Its target profile is: intact selective dependence on PARP-mediated repair given HRD elsewhere in the tumour — a description that can be evaluated on any tumour biology, not only the four approved indications.',
      ],
    },
    {
      heading: 'Why a library, not a lookup',
      body: [
        'A single-therapy lookup would tell a partner what one drug does. A target-library holds a whole class or franchise on the same axes, so a partner can compare its own asset to the field on identical criteria. Two ATR inhibitors from two different companies can be described on the same axes and directly compared without translating between company-specific data-story formats.',
      ],
    },
    {
      heading: 'What sits in the profile',
      body: [
        '**Required features.** The mechanism features the therapy needs the tumour to carry — the alignment features from Chapter 4.',
        '**Neutral features.** Features that the therapy is agnostic to; useful because they narrow the population without narrowing the mechanism.',
        '**Escape features.** Features that predict non-response even when the required features are present. Drug-efflux status is a canonical escape feature for oral small molecules; PD-L1-cold microenvironment is an escape feature for IO combinations.',
      ],
    },
    {
      heading: 'How the library is populated',
      body: [
        'Every target profile is built from public evidence — the modalities from Chapter 3 — with a tier label from Chapter 2 attached to each feature. A profile that names HER2 amplification as a required feature carries a clinical-modality receipt (KEYNOTE-811, DESTINY-Breast04). A profile that names ABC-transporter status as an escape feature carries an in-vitro-functional receipt.',
        'Nothing sits in the library without a tier-labelled receipt. Profiles built on expression-association alone are labelled MECHANISTIC — they can be used for hypothesis generation, not for a first-line ranker recommendation.',
      ],
    },
  ],
  keyInsight:
    'A therapy’s mechanistic profile is separable from its indication. The library makes that separation explicit so a therapy can be evaluated against any tumour biology on identical axes.',
  linksIntoDepth: {
    axes: ['ddr', 'mapk', 'her2', 'io'],
    modalities: ['clinical', 'in-vitro-functional', 'pharmacologic-prism', 'pharmacologic-gdsc'],
    tiers: ['validated', 'strong'],
    capabilities: ['multi-asset-scoring', 'gate-tier-scoring'],
  },
};
