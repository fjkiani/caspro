// ==============================================================================
// /partners/uc-berkeley/ — academic host. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { GraduationCap, Book, GitBranch, ClipboardCheck } from 'lucide-react';

export const PARTNERS_BERKELEY_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Partners · Academic host',
  title: 'Public-university hosting for the research corpus.',
  subtitle:
    'The CrisPRO research corpus is hosted through an academic partnership that anchors the public ledger to a public-university institutional commitment. Academic hosting is not incidental — it is the reason every claim in CrisPRO must trace to a public source.',
  sections: [
    {
      id: 'why',
      label: 'Why academic',
      eyebrow: 'Chapter 1 · Why academic hosting matters',
      headline: 'A public-university commitment to the public ledger.',
      Icon: GraduationCap,
      body: [
        'When the ledger is hosted through a public-university relationship, the institutional commitment matches the discipline of the ledger itself: every claim traces to a public source, every citation is open, every receipt is reproducible.',
        'This is not decoration. It is the reason CrisPRO can promise a permanent public ledger.',
      ],
    },
    {
      id: 'scope',
      label: 'Scope',
      eyebrow: 'Chapter 2 · Scope of hosting',
      headline: 'Research corpus, evidence-tier taxonomy, ledger snapshots.',
      Icon: Book,
      body: [
        'The academic hosting relationship covers the CrisPRO research corpus, the evidence-tier taxonomy, and periodic ledger snapshots archived through the public-university institutional repository.',
      ],
      cta: { label: 'See the research hub', href: '/research/' },
    },
    {
      id: 'reciprocity',
      label: 'Reciprocity',
      eyebrow: 'Chapter 3 · Reciprocity',
      headline: 'Academic groups engage on a pro-bono basis.',
      Icon: GitBranch,
      body: [
        'The academic hosting relationship goes both ways. Academic groups engaging CrisPRO for retrospective co-stratification, IST design support, or manuscript-oriented mechanism briefs work on a pro-bono basis when the ledger already contains the relevant program.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 4 · Proof',
      headline: 'Public ledger, permanent commitment.',
      Icon: ClipboardCheck,
      body: [
        'The commitment to a permanent public ledger is anchored to the academic hosting relationship. Every decoded program stays in the ledger, permanently, on the public-university institutional side.',
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
  ],
};
