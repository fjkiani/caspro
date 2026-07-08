// ==============================================================================
// /industry/research/ — Academic PIs, translational research groups.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { Microscope, GitBranch, ClipboardList, ClipboardCheck } from 'lucide-react';

export const INDUSTRY_RESEARCH_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Industry · Academic research',
  title: 'For the lab writing the responder-subgroup manuscript.',
  subtitle:
    'CrisPRO is built on public data, open citation, and a public ledger. Translational research groups can query the mechanism-alignment layer, request an audit, and cite the receipt.',
  sections: [
    {
      id: 'ethos',
      label: 'Open by default',
      eyebrow: 'Chapter 1 · Open by default',
      headline: 'Public ledger. Public sources. Cited receipts.',
      Icon: Microscope,
      body: [
        'Every claim in CrisPRO traces to a public source and an evidence tier. There are no black-box scores, no proprietary databases behind a paywall, no unsourced numbers in a report. Academic groups can cite CrisPRO the same way they would cite any public database.',
      ],
      bullets: [
        'Every program in the ledger is publicly readable',
        'Every claim links to a public source + evidence tier',
        'Every audit surfaces the mechanism-alignment split with a citable receipt',
      ],
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      eyebrow: 'Chapter 2 · Collaboration model',
      headline: 'IST design, retrospective co-stratification, mechanism briefs.',
      Icon: GitBranch,
      body: [
        'CrisPRO collaborates with translational groups on three primary tracks: prospective IST gate definition, retrospective co-stratification of published trial data, and mechanism-alignment briefs for manuscript submission.',
      ],
      cta: { label: 'See offerings for research groups', href: '/pipeline/' },
    },
    {
      id: 'engage',
      label: 'How to engage',
      eyebrow: 'Chapter 3 · How to engage',
      headline: 'Send a program. Receive a brief.',
      Icon: ClipboardList,
      body: [
        'Academic groups engage the same way sponsors do: send a program (drug + mechanism + population), CrisPRO returns a mechanism-alignment audit with named split, comparator, and next steps. Turnaround is scoped in the engagement letter; pro-bono windows exist for advocacy-adjacent projects.',
      ],
      cta: { label: 'Talk to the team', href: '/contact/' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 4 · Proof',
      headline: 'The public ledger is the front door.',
      Icon: ClipboardCheck,
      body: [
        'Programs decoded span target-directed antibody-drug conjugates, replication-stress-response inhibitors, DNA-damage-response axes, and biomarker-driven checkpoint combinations.',
      ],
      metrics: [
        { label: 'Programs in the ledger', value: '7' },
        { label: 'Trials decoded across those', value: '42' },
        { label: 'Comparator classes named', value: '3' },
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
  ],
};
