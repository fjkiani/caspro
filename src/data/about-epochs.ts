// ==============================================================================
// ABOUT · Epoch stepper source of truth
//
// Four chapters told as a stepper — the "why" of CrisPRO. Every claim here is
// vague-safe: no client identifiers, no quarantined deltas, no specific dollar
// totals. Numbers are only the retained-safe aggregates already shipped in the
// public ledger (7 programs, 5 capabilities, 3 comparator classes).
// ==============================================================================

export interface AboutEpoch {
  id: string;
  slug: 'problem' | 'thesis' | 'proof' | 'roadmap';
  label: string;
  eyebrow: string;
  headline: string;
  body: string[];
  callouts: { label: string; value: string }[];
  cta?: { label: string; href: string };
}

export const ABOUT_EPOCHS: AboutEpoch[] = [
  {
    id: 'EPOCH-1',
    slug: 'problem',
    label: 'The problem',
    eyebrow: 'The lock',
    headline: 'Every failed oncology Phase III still had responders.',
    body: [
      "Tissue biology tells us who has the target. Genomic profiling tells us who has the mutation. Real-world evidence tells us who took the drug. None of those layers answer the question that actually determines outcome — is this drug's mechanism aligned with this patient's biology, or misaligned?",
      "That misalignment is the layer between target expression and clinical outcome — the mechanism-alignment layer. It's why an antibody-drug conjugate can miss its endpoint at a lenient expression threshold and hit it at a stricter one. It's why a checkpoint inhibitor can fail in one tumor mutational burden bucket and succeed in another. It's the reason a franchise-adjacent asset can be repositioned instead of shelved.",
      "For most of oncology's history, the mechanism-alignment layer has been read after the trial. CrisPRO reads it before.",
    ],
    callouts: [
      { label: 'Trials decoded', value: '42 across 7 programs' },
      { label: 'What every audit surfaces', value: 'A misalignment split' },
      { label: 'What still burns capital', value: 'Phase III on unstratified populations' },
    ],
    cta: { label: 'See the ledger of decoded programs', href: '/ledger/' },
  },
  {
    id: 'EPOCH-2',
    slug: 'thesis',
    label: 'The thesis',
    eyebrow: 'The key',
    headline: 'Precision oncology using multi-modal computational biology.',
    body: [
      "CrisPRO is a mechanism-alignment engine. It sits between tissue biology (histology, genomics, real-world evidence) and clinical outcome (trial data) and names the split before capital is committed — which patients the drug's mechanism is aligned to, which patients it is misaligned to, and why.",
      "The engine is multi-modal by design. It integrates the same evidence a scientific reviewer would weigh — mechanistic pathway logic, functional dependency screens, pharmacologic profiling, and clinical readouts — into a single alignment score with a full audit trail. Every number in the CrisPRO ledger traces back to a public source and an evidence tier.",
      "The output is not a black-box recommendation. It is a decision-grade brief that a pharma BD lead, an oncologist, or an investment committee can defend under scrutiny.",
    ],
    callouts: [
      { label: 'What CrisPRO occupies', value: 'The mechanism-alignment layer' },
      { label: 'What CrisPRO does not replace', value: 'Genomics · histology · RWE' },
      { label: 'Every claim traces to', value: 'A public source + tier' },
    ],
    cta: { label: 'See the 5-capability spine', href: '/engine/' },
  },
  {
    id: 'EPOCH-3',
    slug: 'proof',
    label: 'The proof',
    eyebrow: 'What is already shipped',
    headline: 'A public ledger of decoded programs, before you engage.',
    body: [
      "CrisPRO does not open with a sales deck. It opens with the ledger — every program the engine has decoded, with the alignment split named, the mechanism cited, and the receipt open for inspection. Programs span antibody-drug conjugates, replication-stress-response inhibitors, biomarker-driven checkpoint combinations, and DNA-damage-response axes.",
      "Every decoded program includes a mechanism-alignment split, a comparator against tissue biology / genomics / real-world evidence, and a next-step offering that operationalizes the finding — retrospective co-stratification, prospective gate definition, IST design, or IP valuation.",
      "The ledger is the front door because that is the honest way to earn trust in a market that has been over-promised and under-delivered for a decade.",
    ],
    callouts: [
      { label: 'Programs decoded', value: '7 in the public ledger' },
      { label: 'Trials analyzed', value: '42 across those programs' },
      { label: 'Every decoded program includes', value: 'Mechanism · split · next step' },
    ],
    cta: { label: 'Open the public ledger', href: '/ledger/' },
  },
  {
    id: 'EPOCH-4',
    slug: 'roadmap',
    label: 'The roadmap',
    eyebrow: 'What comes next',
    headline: 'From decoded programs to a mechanism-alignment layer everyone can call.',
    body: [
      "The current ledger is the seed. Each new program adds a decoded trial, a validated mechanism-alignment axis, and a comparator against the existing tissue-biology / genomics / RWE layers. As the ledger grows, the mechanism-alignment layer becomes the fourth stratification signal any sponsor, investor, or clinician can reach for — alongside the three that already exist.",
      "The near-term roadmap: expand the decoded corpus across MSS colorectal, DNA-damage-response, replication-stress-response, and target-directed antibody-drug conjugate programs. The medium-term roadmap: an API surface for BD teams, an alignment gate for prospective trial design, and a mechanism-alignment reader for the oncology community.",
      "The long-term commitment: every decoded program stays in the public ledger. Precision oncology is a public good.",
    ],
    callouts: [
      { label: 'Near-term expansion', value: 'MSS CRC · DDR · RSR · ADC' },
      { label: 'Medium-term surface', value: 'BD API · alignment gate · reader' },
      { label: 'Long-term commitment', value: 'Public ledger, forever' },
    ],
    cta: { label: 'Talk to the team', href: '/contact/' },
  },
];

export function getEpoch(slug: AboutEpoch['slug']): AboutEpoch | undefined {
  return ABOUT_EPOCHS.find((e) => e.slug === slug);
}
