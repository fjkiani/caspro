// ==============================================================================
// HOME AUDIENCE REGISTRY — Release A (evidence-led). Three tabs:
//   • Pharma & biotech R&D
//   • Oncologists & tumor boards
//   • Patients & caregivers
//
// Investor content stays at /investors (existing route). It is not one of the
// three primary audiences the homepage router surfaces in Release A.
// ==============================================================================

export interface HomeAudienceEntry {
  id: string;
  slug: 'pharma' | 'oncologists' | 'patients';
  name: string;
  question: string;
  headline: string;
  body: string;
  bullets: string[];
  productHref: string;
  productLabel: string;
  personaHref: string;
  personaLabel: string;
  demoHref: string;
  demoLabel: string;
}

export const HOME_FRAMING = {
  eyebrow: 'Precision oncology · Mechanism-alignment research substrate',
  headline: 'Cancer biology is complex. The next decision does not have to be.',
  subhead:
    'CrisPRO turns tumor biology into a mechanism map, a mechanism-and-trial-relevance research view, a resistance research context, and an evidence trail behind every finding. One research substrate. Three product experiences.',
} as const;

export const HOME_AUDIENCE_REGISTRY: HomeAudienceEntry[] = [
  {
    id: 'HOME-1',
    slug: 'pharma',
    name: 'Pharma & biotech',
    question: "Which target, cohort, or asset earns the next investment?",
    headline: 'Build the program that survives contact with real tumor biology.',
    body:
      "For pharma target-discovery, translational, and program teams. A structured mechanism map, dependency research view, resistance-context research view, and mechanism-and-trial-relevance research context — with every finding traced to a public source and evidence tier.",
    bullets: [
      'Target Mission and Perturbation Package research substrate',
      'Mechanism-alignment research context for cohorts and combinations',
      'Trial-relevance research context — not a trial outcome predictor',
      'Every claim links to a receipt row on the public ledger',
    ],
    productHref: '/drug-development/',
    productLabel: 'Explore Drug Development',
    personaHref: '/for/pharma/',
    personaLabel: 'See the pharma journey',
    demoHref: '/demo/pharma/',
    demoLabel: 'Explore an evidence-led case walkthrough',
  },
  {
    id: 'HOME-2',
    slug: 'oncologists',
    name: 'Oncologists & tumor boards',
    question: 'What is worth discussing at the next tumor board?',
    headline: 'Turn an impossible molecular case into a structured next discussion.',
    body:
      "For oncologists, molecular tumor boards, and translational teams. A case-resolution research workspace that organizes pathology, genomics, prior therapy, biomarkers, and disease history into seven discussable questions — every finding traced to a source. The clinical team remains the decision owner.",
    bullets: [
      'Biology map, mechanism hypotheses, resistance research context',
      'Mechanism-and-trial-relevance research context — not a trial recommendation',
      'Safety and PGx research context',
      'Four demo patient bundles with coverage badges',
    ],
    productHref: '/tumor-board/',
    productLabel: 'Explore Tumor Board',
    personaHref: '/for/oncologists/',
    personaLabel: 'See the oncologist journey',
    demoHref: '/demo/tumor-board/',
    demoLabel: 'Explore an evidence-led case walkthrough',
  },
  {
    id: 'HOME-3',
    slug: 'patients',
    name: 'Patients & caregivers',
    question: 'What does this molecular result mean, and what should I ask?',
    headline: 'Understand your cancer biology. Ask better questions.',
    body:
      "For patients and caregivers. An educational research substrate that shows how CrisPRO reads molecular information — so you can walk into your next oncology appointment with clearer vocabulary, better questions, and explicit awareness of what is uncertain. Your oncology team remains the decision owner.",
    bullets: [
      'What does this result mean, and what may matter?',
      'What remains uncertain, and what information is missing?',
      'What to ask your oncology team',
      'Six-stage evidence-led walkthrough over a hash-pinned spec',
    ],
    productHref: '/for/patients/',
    productLabel: 'Explore Patient Clarity',
    personaHref: '/for/patients/',
    personaLabel: 'See the patient journey',
    demoHref: '/demo/patient/',
    demoLabel: 'Explore an evidence-led walkthrough',
  },
];
