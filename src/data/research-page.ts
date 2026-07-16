// Research hub — links into /research/chapters/, /engine/, /governance/, /ledger/.
// Public science only: no trial identifiers, no asset names, no partner names.
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { BookOpen, Layers, ClipboardCheck, ShieldCheck } from 'lucide-react';

export const RESEARCH_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Research',
  title: 'The mechanism-alignment layer, in the open',
  subtitle: 'Chapters, capabilities, receipts. What we know, and how we know it.',
  sections: [
    {
      id: 'why',
      label: 'Why research',
      eyebrow: 'Section 1 · Framing',
      headline: 'The mechanism-alignment layer is a research question, not a marketing claim.',
      Icon: BookOpen,
      body: [
        'CrisPRO exists because the same failure keeps happening: pivotal oncology trials run against unstratified populations, wash out on average, and hide their responders inside the negative arm.',
        'The research layer of the site is where we work in the open — chapters, capabilities, receipts.',
      ],
      cta: {
        label: 'Read the chapters',
        href: '/research/chapters/',
        helper: 'Nine chapters covering the layer end-to-end. Public science only.',
      },
    },
    {
      id: 'chapters',
      label: 'Chapters',
      eyebrow: 'Section 2 · Chapters',
      headline: 'Nine chapters covering the layer end-to-end.',
      Icon: Layers,
      body: [
        'The chapters cover: synthetic-lethality first principles, the four-tier evidence hierarchy, the seven evidence modalities, the mechanism-alignment layer, the patient biology axes, the trial-target library, target-lock, the therapy bridge, and why trials still fail on responders.',
        'Every chapter is grounded in public science — BRCA/PARP, DepMap, CIViC, ClinicalTrials.gov, PMID-cited evidence. No chapter names a specific caspro client trial or asset.',
      ],
      cta: {
        label: 'Open the chapters',
        href: '/research/chapters/',
      },
    },
    {
      id: 'capabilities',
      label: 'Capabilities',
      eyebrow: 'Section 3 · Product capabilities',
      headline: 'The chapters underwrite five product capabilities.',
      Icon: ClipboardCheck,
      body: [
        'Every capability on the platform ties back to the substrate in the chapters — the axes, modalities, tiers, and guardrails that make the capability admissible.',
        'The engine surface is where each capability is described alongside the substrate that backs it.',
      ],
      cta: {
        label: 'Open the engine',
        href: '/engine/',
      },
    },
    {
      id: 'ledger',
      label: 'Ledger',
      eyebrow: 'Section 4 · Public ledger',
      headline: 'The public ledger is what the layer produces when it runs.',
      Icon: ShieldCheck,
      body: [
        'Chapters and capabilities are how we work. The public ledger is what falls out — the record of decoded programs.',
        'Every case in the ledger cites its own source. Every case can be reproduced from the same substrate.',
      ],
      cta: {
        label: 'Open the ledger',
        href: '/ledger/',
      },
    },
  ],
};
