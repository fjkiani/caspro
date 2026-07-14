// ==============================================================================
// /products/oncology/ — Mechanism-alignment for oncology programs.. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
export const ONCOLOGY_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · Oncology',
  title: 'Mechanism-alignment for oncology programs.',
  subtitle: 'The anchor CrisPRO product. Every offering starts here — decode a trial, name the split, cross-link the comparator, hand back the receipt.',
  sections: [
    {
      id: 'audience',
      label: 'For whom',
      eyebrow: 'Chapter 1 · Who this is for',
      headline: 'Oncology BD, translational, and clinical program leads.',
      iconKey: 'target',
      body: [
        'The Oncology surface is CrisPRO\'s anchor product. It is used by BD leads deciding which asset to advance, translational leads picking the mechanism-alignment axis for the next trial, and clinical program leads defending an enrollment strategy under scrutiny.',
        'Every conversation that starts on this surface routes into one of the five offerings — Trial Failure Decode, Patient Selection Package, IST Design Support, BD Intelligence Package, or IP Valuation.',
      ],
    },
    {
      id: 'what',
      label: 'What it returns',
      eyebrow: 'Chapter 2 · What it returns',
      headline: 'A mechanism-alignment audit with named split, comparator, next steps.',
      iconKey: 'clipboard-check',
      body: [
        'For every oncology program submitted, the surface returns: the mechanism the drug operates on, the patient subgroups the mechanism is aligned to, the subgroups it is misaligned to, a comparator against the existing histology / genomics / RWE layers, and a next-step offering.',
      ],
      bullets: [
        'Mechanism-alignment split named at defined evidence tier',
        'Comparator against tissue biology / CGP / RWE',
        'Cross-link to the relevant ledger case study',
        'Next-step offering scoped and priced',
      ],
      cta: { label: 'See the 5-capability spine', href: '/engine/' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 3 · Proof',
      headline: 'Public ledger of decoded programs.',
      iconKey: 'git-branch',
      body: [
        'Programs decoded on this surface span target-directed antibody-drug conjugates, replication-stress-response inhibitors, DNA-damage-response axes, and biomarker-driven checkpoint combinations.',
      ],
      caseStudies: [
        { slug: 'ceacam5', title: 'Target-directed ADC program', summary: 'A stricter target-expression threshold names a responder subgroup the pivotal trial missed at the lenient threshold.' },
        { slug: 'berzosertib', title: 'RSR inhibitor program', summary: 'RS-defined subset shows durable response where the all-comer population did not.' },
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Chapter 4 · How to engage',
      headline: 'Send a program. Receive a brief.',
      iconKey: 'sparkles',
      body: [
        'Engagement starts with a program brief — drug, mechanism, target population. CrisPRO returns a mechanism-alignment audit at defined evidence tier, with a next-step offering scoped and priced. Turnaround is scoped in the engagement letter.',
      ],
      cta: { label: 'See the pipeline', href: '/pipeline/' },
    },
  ],
};
