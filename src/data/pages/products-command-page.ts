// ==============================================================================
// /products/command-center/ — The BD operator\'s workbench.. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { Target, Layers, GitBranch, ClipboardCheck, Users, Terminal, Zap, Hammer, Eye, Sparkles } from 'lucide-react';

export const COMMAND_CENTER_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · Command Center',
  title: 'The BD operator\'s workbench.',
  subtitle: 'Franchise-scope diligence, multi-asset scoring, comparator overlays, and next-step routing into an offering.',
  sections: [
    {
      id: 'audience',
      label: 'For whom',
      eyebrow: 'Chapter 1 · Who this is for',
      headline: 'BD operators running diligence at franchise scope.',
      Icon: Terminal,
      body: [
        'The Command Center is the BD operator\'s workbench — a single surface for franchise-scope diligence, multi-asset scoring, comparator overlays, and next-step routing into an offering.',
      ],
    },
    {
      id: 'what',
      label: 'What it returns',
      eyebrow: 'Chapter 2 · What it returns',
      headline: 'Franchise-scope diligence in a single workbench.',
      Icon: ClipboardCheck,
      body: [
        'For a licensing or acquisition target, the surface returns a multi-asset mechanism-alignment map, a comparator overlay against the three existing stratification layers, and a scoped next-step for each asset.',
      ],
      bullets: [
        'Multi-asset mechanism-alignment map',
        'Comparator overlay (histology / CGP / RWE)',
        'Per-asset next-step routing into an offering',
      ],
      cta: { label: 'See BD Intelligence', href: '/pipeline/?offer=bd-intelligence-package' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 3 · Proof',
      headline: 'Public ledger of decoded programs.',
      Icon: GitBranch,
      body: [
        'The Command Center has been used against franchise-scope diligence engagements across target-directed antibody-drug conjugates and DNA-damage-response programs.',
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Chapter 4 · How to engage',
      headline: 'Send a target. Receive a diligence pack.',
      Icon: Sparkles,
      body: [
        'BD Intelligence engagements start with the target company and its asset list. CrisPRO returns a franchise-scope diligence pack, scoped and priced.',
      ],
      cta: { label: 'See the pipeline', href: '/pipeline/' },
    },
  ],
};
