// ==============================================================================
// /industry/healthcare/ — Health systems, oncology programs, academic centers.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { Hospital, Users, ClipboardList, ClipboardCheck } from 'lucide-react';

export const INDUSTRY_HEALTHCARE_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Industry · Health systems & oncology programs',
  title: 'For the tumor board asking why the last trial had responders.',
  subtitle:
    'CrisPRO is a mechanism-alignment reader for the questions clinicians actually ask post-Phase-III: which subgroup responded, why, and what should the next trial enrich for?',
  sections: [
    {
      id: 'audience',
      label: 'For clinicians',
      eyebrow: 'Chapter 1 · For clinicians',
      headline: 'The layer between the biomarker and the outcome.',
      Icon: Hospital,
      body: [
        'When a tumor board reviews a negative Phase III readout, the honest question is: were there responders, and if so, what defined them? Standard analysis surfaces post-hoc subgroups. CrisPRO surfaces the mechanism-alignment axis those subgroups sit on — and links it to the underlying pathway biology.',
      ],
    },
    {
      id: 'ist',
      label: 'IST design',
      eyebrow: 'Chapter 2 · IST design support',
      headline: 'Prospective gate definition, not retrospective apology.',
      Icon: ClipboardList,
      body: [
        'For investigator-sponsored trials, CrisPRO defines the mechanism-alignment gate before enrollment opens — so the trial is enriched for the responder subgroup by design, not after the fact.',
      ],
      cta: { label: 'See the IST offering', href: '/pipeline/?offer=ist-design-support' },
    },
    {
      id: 'patient',
      label: 'For patients',
      eyebrow: 'Chapter 3 · For the patients you see',
      headline: 'Family-facing briefs, in language they can use.',
      Icon: Users,
      body: [
        'CrisPRO briefs are written to be handed to a family. They explain which mechanism the drug operates on, which patient subgroups the mechanism is aligned to, and how confident the evidence is. Every claim traces to a public source.',
      ],
      cta: { label: 'See the patients hub', href: '/patients/' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 4 · Proof',
      headline: 'Public ledger of decoded programs.',
      Icon: ClipboardCheck,
      body: [
        'The CrisPRO ledger is public. Every program decoded, every mechanism-alignment split named, every receipt open for inspection.',
      ],
      caseStudies: [
        {
          slug: 'adavosertib',
          title: 'A WEE1 inhibitor program',
          summary: 'The subgroup analysis names a mechanism-alignment axis the pivotal trial missed at enrollment.',
        },
        {
          slug: 'latify',
          title: 'A biomarker-driven checkpoint combination',
          summary: 'Continued canon review — decoded brief and comparator ready when the readout finalizes.',
        },
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
  ],
};
