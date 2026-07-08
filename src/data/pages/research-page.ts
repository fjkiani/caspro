// ==============================================================================
// /research/ — placeholder used by W3 to unblock lint. W4 replaces this with the
// full ResearchHub client + Hygraph-anchored blog surface. Content here is
// vague-safe and points at the ledger.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { Microscope, FileText, Book, ClipboardCheck } from 'lucide-react';

export const RESEARCH_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Research',
  title: 'Public sources, public ledger, cited receipts.',
  subtitle:
    'The CrisPRO research surface is a rolling snapshot of the public corpus that anchors every mechanism-alignment claim. Programs decoded, evidence tiers, and open assumptions — all publicly readable.',
  sections: [
    {
      id: 'corpus',
      label: 'Corpus',
      eyebrow: 'Chapter 1 · The public corpus',
      headline: 'Every claim traces to a public source.',
      Icon: Microscope,
      body: [
        'Every mechanism-alignment claim in CrisPRO traces to a public source and an evidence tier. The research surface is the rolling snapshot of that corpus — decoded programs, comparator classes, and open-assumption reports, all publicly readable.',
      ],
    },
    {
      id: 'manuscripts',
      label: 'Manuscripts',
      eyebrow: 'Chapter 2 · Manuscript work',
      headline: 'Retrospective co-stratification and mechanism briefs.',
      Icon: FileText,
      body: [
        'CrisPRO collaborates with academic groups on retrospective co-stratification of published trials, mechanism-alignment briefs for manuscript submission, and open-assumption reports. Every such collaboration lands in the public ledger.',
      ],
      cta: { label: 'See the academic host partner', href: '/partners/uc-berkeley/' },
    },
    {
      id: 'blog',
      label: 'Field notes',
      eyebrow: 'Chapter 3 · Field notes',
      headline: 'Working notes from the mechanism-alignment layer.',
      Icon: Book,
      body: [
        'Rolling field notes from the CrisPRO team on new decoded programs, new comparator classes, and new mechanism-alignment axes. Every note traces to a public source and links into the ledger.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 4 · Proof',
      headline: 'Public ledger of decoded programs.',
      Icon: ClipboardCheck,
      body: [
        'Programs decoded span target-directed antibody-drug conjugates, replication-stress-response inhibitors, DNA-damage-response axes, and biomarker-driven checkpoint combinations.',
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
  ],
};
