// ==============================================================================
// /patients/ — Family & advocate landing. Vague-safe. Precision-oncology framing.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { HeartPulse, Search, MessagesSquare, ClipboardCheck } from 'lucide-react';

export const PATIENTS_PAGE_DATA: VerticalPageData = {
  eyebrow: 'For patients & advocates',
  title: 'Precision oncology, in language you can actually use.',
  subtitle:
    'CrisPRO reads the mechanism-alignment layer — the split between what a drug does and what a patient\'s biology needs. This page explains what that means for the patients and families reading receipts, not just the sponsors writing them.',
  sections: [
    {
      id: 'why',
      label: 'Why we exist',
      eyebrow: 'Chapter 1 · Why we exist',
      headline: 'Every failed trial still had responders.',
      Icon: HeartPulse,
      body: [
        'When a Phase III oncology trial misses its primary endpoint, the drug is usually shelved. But almost every one of those failed trials still had patients who responded — sometimes dramatically. The problem was never that the drug did not work. The problem was that the trial enrolled everyone equally.',
        'CrisPRO exists to name the responder subgroup before capital is committed — so future trials enrich for the patients most likely to benefit, and shelved drugs get a defensible repositioning path.',
      ],
      metrics: [
        { label: 'Programs decoded', value: '7 in the public ledger' },
        { label: 'Trials analyzed', value: '42 across those programs' },
        { label: 'Every claim traces to', value: 'A public source + tier' },
      ],
      cta: { label: 'See the public ledger', href: '/ledger/' },
    },
    {
      id: 'how',
      label: 'How it works',
      eyebrow: 'Chapter 2 · How it works',
      headline: 'A mechanism-alignment layer between biology and outcome.',
      Icon: Search,
      body: [
        'CrisPRO sits between the tissue biology you already know (histology, genomics, real-world evidence) and the clinical outcome the trial measured. It integrates mechanistic pathway logic, functional dependency screens, pharmacologic profiling, and clinical readouts into a single alignment score — with a full audit trail.',
        'Every finding is traceable to a public source and an evidence tier. No black-box recommendations. No unsourced numbers. If a family asks how CrisPRO reached a conclusion, we can show them.',
      ],
      bullets: [
        'Reads mechanism-alignment, not just target expression',
        'Every claim linked to a public source and evidence tier',
        'Comparators to histology / genomics / RWE are treated as complementary layers',
      ],
    },
    {
      id: 'what',
      label: 'What we return',
      eyebrow: 'Chapter 3 · What we return',
      headline: 'A decision-grade brief — not a black-box score.',
      Icon: ClipboardCheck,
      body: [
        'For patients and advocates, the CrisPRO output is a plain-language brief: which mechanism the drug operates on, which patient subgroups the mechanism is aligned to, and which subgroups it is not. When a mechanism-alignment split is named, the brief also includes the receipt — the public evidence chain that supports it.',
        'Advocates use these briefs to challenge trial designs, argue for stratified enrollment, and hold sponsors accountable when responder subgroups are ignored post-hoc.',
      ],
      caseStudies: [
        {
          slug: 'ceacam5',
          title: 'A target-directed antibody-drug conjugate program',
          summary: 'Post-hoc, the trial had a defensible responder subgroup at a stricter target-expression threshold. The alignment split was called before the next-generation asset entered the clinic.',
          keyMetric: 'Responder subgroup preserved · repositioning window intact',
        },
        {
          slug: 'berzosertib',
          title: 'A replication-stress-response inhibitor program',
          summary: 'All-comer enrollment missed the endpoint. A replication-stress-defined subset showed durable response.',
          keyMetric: 'RS-defined subset · durable response preserved',
        },
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
    {
      id: 'contact',
      label: 'Talk to us',
      eyebrow: 'Chapter 4 · Talk to us',
      headline: 'Advocacy is a first-class use case.',
      Icon: MessagesSquare,
      body: [
        'CrisPRO does not treat patients or advocacy groups as an afterthought. If you are working on a trial-design challenge, a responder-subgroup argument, or a repositioning case, we will run the analysis pro bono when the ledger already contains the relevant program.',
      ],
      cta: { label: 'Reach the team', href: '/contact/' },
    },
  ],
};
