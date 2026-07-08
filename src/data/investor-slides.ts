// ==============================================================================
// INVESTORS · Deck-in-page slides.
// Same discipline as the audience registry — no client identifiers, no
// quarantined deltas, no dollar totals without source. Numbers are only the
// retained-safe aggregates already shipped in the public ledger.
// ==============================================================================

export interface InvestorSlide {
  id: string;
  slug: 'problem' | 'wedge' | 'proof' | 'model' | 'ask';
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
  metrics: { label: string; value: string; footnote?: string }[];
  cta?: { label: string; href: string };
}

export const INVESTOR_SLIDES: InvestorSlide[] = [
  {
    id: 'IS-1',
    slug: 'problem',
    eyebrow: 'Slide 1 · The problem',
    title: 'Oncology R&D still burns capital on unstratified populations.',
    subtitle:
      'Phase III attrition in oncology remains the single largest source of capital destruction in biotech. The dominant failure mode is not target choice — it is mechanism-population misalignment named after the trial reads out.',
    bullets: [
      'Antibody-drug conjugate programs miss endpoints at a lenient target-expression threshold and hit them at a stricter one.',
      'Checkpoint combinations show responder subgroups after post-hoc analysis that the enrollment strategy could have front-loaded.',
      'DNA-damage-response inhibitors fail on all-comer populations and succeed on a replication-stress-defined subset.',
      'Every one of those failures preserved a repositioning window — if it was named before the next-generation asset entered the clinic.',
    ],
    metrics: [
      { label: 'Where the layer sits', value: 'Between tissue biology and clinical outcome' },
      { label: 'What every audit surfaces', value: 'A misalignment split' },
      { label: 'What remains uncalled', value: 'The mechanism-alignment layer' },
    ],
    cta: { label: 'See a decoded program in the ledger', href: '/ledger/' },
  },
  {
    id: 'IS-2',
    slug: 'wedge',
    eyebrow: 'Slide 2 · The wedge',
    title: 'CrisPRO occupies the mechanism-alignment layer.',
    subtitle:
      'The market already has strong players in tissue biology, comprehensive genomic profiling, and real-world evidence. None of them answer the mechanism-alignment question. CrisPRO does — and treats those three layers as complementary inputs, not competitors.',
    bullets: [
      'Tissue biology / histology (Owkin-class): reads what the tissue looks like. Cannot forecast mechanism alignment.',
      'Comprehensive genomic profiling (Foundation Medicine-class): reads what mutations are present. Cannot forecast mechanism alignment.',
      'Real-world evidence (Tempus-class): reads what happened after the drug was given. Cannot forecast mechanism alignment.',
      'CrisPRO reads the mechanism-alignment split before capital is committed, with a full evidence trail to a public source and evidence tier.',
    ],
    metrics: [
      { label: 'Comparator classes', value: '3 named · all complementary' },
      { label: 'Layer occupied', value: 'Mechanism alignment' },
      { label: 'What we do not replace', value: 'Histology · genomics · RWE' },
    ],
    cta: { label: 'See the 5-capability spine', href: '/engine/' },
  },
  {
    id: 'IS-3',
    slug: 'proof',
    eyebrow: 'Slide 3 · The proof',
    title: 'A public ledger of decoded programs, before we open a sales conversation.',
    subtitle:
      'CrisPRO does not open with a pitch. It opens with the ledger — every program the engine has decoded, with the mechanism-alignment split named and the receipt open for inspection. That is the honest way to earn trust in a market that has been over-promised for a decade.',
    bullets: [
      'Programs decoded span antibody-drug conjugates, replication-stress-response inhibitors, DNA-damage-response axes, and biomarker-driven checkpoint combinations.',
      'Every decoded program includes a mechanism-alignment split, a comparator against the three existing stratification layers, and a next-step offering.',
      'Every claim in the ledger traces back to a public source and an evidence tier — no black-box scores, no unauditable recommendations.',
    ],
    metrics: [
      { label: 'Programs in the ledger', value: '7' },
      { label: 'Trials decoded across those programs', value: '42' },
      { label: 'Comparator classes named', value: '3 (all complementary)' },
    ],
    cta: { label: 'Open the public ledger', href: '/ledger/' },
  },
  {
    id: 'IS-4',
    slug: 'model',
    eyebrow: 'Slide 4 · The business model',
    title: 'Five offerings, structured around when a sponsor calls us.',
    subtitle:
      'CrisPRO monetizes at the four inflection points where mechanism-alignment analysis materially changes an oncology decision: BD diligence, patient selection, IST design, and IP valuation. Each offering has a defined scope, a defined turnaround, and a defined proof case in the ledger.',
    bullets: [
      'Trial Failure Decode — the anchor offering. Sponsors send a program, receive a mechanism-alignment audit with named split, comparator, and next steps.',
      'Patient Selection Package — retrospective co-stratification of a completed trial to name the responder subgroup before a next-generation asset enters the clinic.',
      'IST Design Support — prospective gate definition for an investigator-sponsored trial.',
      'BD Intelligence Package — franchise-scope diligence for an inbound licensing or acquisition target.',
      'IP Valuation — Trial Failure Corpus — asset repositioning valuation grounded in the decoded corpus.',
    ],
    metrics: [
      { label: 'Offerings', value: '5 · each with a proof case' },
      { label: 'Anchor product', value: 'Trial Failure Decode' },
      { label: 'Every offering traces to', value: 'A decoded program in the ledger' },
    ],
    cta: { label: 'See the pipeline', href: '/pipeline/' },
  },
  {
    id: 'IS-5',
    slug: 'ask',
    eyebrow: 'Slide 5 · The ask',
    title: 'What we are raising, and what it unlocks.',
    subtitle:
      'The current CrisPRO product surface is live and shipping. The ask is the runway to expand the decoded corpus across the four highest-signal oncology domains and to build the API surface that puts the mechanism-alignment layer in the hands of BD teams, oncologists, and clinical trial designers.',
    bullets: [
      'Near-term deployment: expand the decoded corpus across MSS colorectal, DNA-damage-response, replication-stress-response, and target-directed antibody-drug conjugate programs.',
      'Medium-term surface: API access for BD counterparties, a mechanism-alignment gate for prospective trial design, and a reader for the oncology community.',
      'Long-term commitment: every decoded program stays in the public ledger. Precision oncology is a public good, and the ledger is how we prove that in production.',
    ],
    metrics: [
      { label: 'Runway target', value: 'Series-defined · under term sheet' },
      { label: 'Near-term corpus expansion', value: 'MSS CRC · DDR · RSR · ADC' },
      { label: 'Public ledger commitment', value: 'Permanent' },
    ],
    cta: { label: 'Contact the team', href: '/contact/' },
  },
];

export function getSlide(slug: InvestorSlide['slug']): InvestorSlide | undefined {
  return INVESTOR_SLIDES.find((s) => s.slug === slug);
}
