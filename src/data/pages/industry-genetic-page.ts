// ==============================================================================
// /industry/genetic-testing/ — CGP / diagnostic labs. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { Dna, Layers, GitBranch, ClipboardCheck } from 'lucide-react';

export const INDUSTRY_GENETIC_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Industry · Genetic testing & CGP',
  title: 'The layer above the variant call.',
  subtitle:
    'Comprehensive genomic profiling names the mutation. CrisPRO names what the mutation means for a specific drug\'s mechanism — the alignment layer that sits above the variant call.',
  sections: [
    {
      id: 'gap',
      label: 'The gap',
      eyebrow: 'Chapter 1 · The gap',
      headline: 'A variant call is not a mechanism call.',
      Icon: Dna,
      body: [
        'A CGP report tells an oncology team which mutations a tumor carries. It does not tell them which drug\'s mechanism is aligned to those mutations — or, more importantly, which drugs\' mechanisms are misaligned. That misalignment is the layer between the variant and the outcome.',
        'CrisPRO reads that layer. Same source data, one level up.',
      ],
    },
    {
      id: 'complementary',
      label: 'Complementary',
      eyebrow: 'Chapter 2 · Complementary, not competitive',
      headline: 'We do not replace the CGP report — we sit above it.',
      Icon: Layers,
      body: [
        'CrisPRO treats comprehensive genomic profiling as a first-class input. The mechanism-alignment layer takes variant calls (from any accredited CGP provider) as input, integrates them with pathway logic, functional screens, and clinical readouts, and returns a decision-grade brief.',
      ],
      bullets: [
        'Any accredited CGP variant call is a supported input',
        'CrisPRO output includes the CGP evidence chain, not a rewrite of it',
        'Every finding traces to a public source + evidence tier',
      ],
      cta: { label: 'See the 5-capability spine', href: '/engine/' },
    },
    {
      id: 'partnership',
      label: 'Partnership',
      eyebrow: 'Chapter 3 · Partnership model',
      headline: 'A mechanism-alignment reader for CGP-first workflows.',
      Icon: GitBranch,
      body: [
        'For diagnostic labs and CGP providers, CrisPRO is a downstream reader. The alignment layer can attach to existing CGP report deliverables, adding mechanism-alignment context without duplicating the variant call.',
        'Partnerships are structured around either bulk-license reads or a co-delivered report bundle, depending on the diagnostic lab\'s existing workflow.',
      ],
      cta: { label: 'Talk to the team', href: '/contact/' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 4 · Proof',
      headline: 'Programs decoded in the public ledger.',
      Icon: ClipboardCheck,
      body: [
        'Every claim in the CrisPRO ledger traces back to a public source. Programs decoded so far span target-directed antibody-drug conjugates, replication-stress-response inhibitors, DNA-damage-response axes, and biomarker-driven checkpoint combinations.',
      ],
      metrics: [
        { label: 'Programs decoded', value: '7' },
        { label: 'Trials decoded across those', value: '42' },
        { label: 'Comparator classes named', value: '3 · all complementary' },
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
  ],
};
