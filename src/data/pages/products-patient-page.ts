// ==============================================================================
// /products/patient/ — Family-facing briefs, plain language.. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { Target, Layers, GitBranch, ClipboardCheck, Users, Terminal, Zap, Hammer, Eye, Sparkles } from 'lucide-react';

export const PATIENT_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · Patient',
  title: 'Family-facing briefs, plain language.',
  subtitle: 'The plain-language translation layer for CrisPRO briefs. Built for families and advocates, with citable evidence chains.',
  sections: [
    {
      id: 'audience',
      label: 'For whom',
      eyebrow: 'Chapter 1 · Who this is for',
      headline: 'Patients, families, advocates.',
      Icon: Users,
      body: [
        'The Patient surface is the plain-language translation layer for CrisPRO briefs. It is built to be read by families and used by advocates — every mechanism, every alignment call, every evidence tier explained without jargon.',
      ],
    },
    {
      id: 'what',
      label: 'What it returns',
      eyebrow: 'Chapter 2 · What it returns',
      headline: 'A brief you can share, with a citable evidence chain.',
      Icon: ClipboardCheck,
      body: [
        'For each program, the surface returns a plain-language brief with the mechanism-alignment split named, a comparator against the existing stratification layers, and a link into the public ledger receipt.',
      ],
      bullets: [
        'Written for a family, not a review committee',
        'Every claim links to a public source + evidence tier',
        'Advocacy-facing — used to challenge trial designs and stratification decisions',
      ],
      cta: { label: 'Open the patients hub', href: '/patients/' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 3 · Proof',
      headline: 'Public ledger of decoded programs.',
      Icon: GitBranch,
      body: [
        'Every family-facing brief traces to a public ledger entry. Programs decoded span target-directed antibody-drug conjugates, replication-stress-response inhibitors, and biomarker-driven checkpoint combinations.',
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Chapter 4 · How to engage',
      headline: 'Send a case. Receive a brief.',
      Icon: Sparkles,
      body: [
        'Advocacy and patient engagements are structured to be low-friction. If the ledger already contains the relevant program, CrisPRO returns a brief on a pro-bono basis. Turnaround is typically scoped inside a two-week window.',
      ],
      cta: { label: 'Talk to the team', href: '/contact/' },
    },
  ],
};
