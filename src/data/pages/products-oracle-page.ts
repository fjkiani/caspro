// ==============================================================================
// /products/oracle/ — Predictive mechanism-alignment scoring at the Phase-I gate.. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { Target, Layers, GitBranch, ClipboardCheck, Users, Terminal, Zap, Hammer, Eye, Sparkles } from 'lucide-react';

export const ORACLE_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · Oracle',
  title: 'Predictive mechanism-alignment scoring at the Phase-I gate.',
  subtitle: 'Oracle scores a mechanism-alignment hypothesis before capital enters the clinic. Used at the Phase-I gate for asset-advance decisions.',
  sections: [
    {
      id: 'audience',
      label: 'For whom',
      eyebrow: 'Chapter 1 · Who this is for',
      headline: 'Phase-I gate reviewers and asset-advance decisions.',
      Icon: Eye,
      body: [
        'Oracle scores a mechanism-alignment hypothesis before capital enters the clinic. Used at the Phase-I gate to decide whether an asset\'s mechanism-alignment hypothesis is defensible enough to advance.',
      ],
    },
    {
      id: 'what',
      label: 'What it returns',
      eyebrow: 'Chapter 2 · What it returns',
      headline: 'Pre-Phase-I mechanism-alignment score at defined tier.',
      Icon: ClipboardCheck,
      body: [
        'For a pre-clinical asset, Oracle returns a mechanism-alignment score with tier justification, a named comparator, and a set of open assumptions. Every open assumption is flagged as an OPEN_ASSUMPTION with a suggested test to close it.',
      ],
      bullets: [
        'Pre-Phase-I mechanism-alignment score',
        'Named comparator overlay',
        'OPEN_ASSUMPTION flags with closable tests',
      ],
      cta: { label: 'See the gate-tier-scoring capability', href: '/engine/' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 3 · Proof',
      headline: 'Public ledger of decoded programs.',
      Icon: GitBranch,
      body: [
        'Oracle has been used at the pre-Phase-I gate for DNA-damage-response inhibitor programs and replication-stress-response inhibitor programs.',
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Chapter 4 · How to engage',
      headline: 'Send a Phase-I gate question.',
      Icon: Sparkles,
      body: [
        'Oracle engagements are scoped as a gate-tier-scoring exercise inside a Trial Failure Decode or BD Intelligence offering.',
      ],
      cta: { label: 'See the pipeline', href: '/pipeline/' },
    },
  ],
};
