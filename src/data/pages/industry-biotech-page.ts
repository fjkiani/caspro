// ==============================================================================
// /industry/biotech/ — Biotech & pharma R&D landing. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { Layers, Target, TrendingUp, ClipboardCheck } from 'lucide-react';

export const INDUSTRY_BIOTECH_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Industry · Biotech & pharma R&D',
  title: 'Stop paying for the wrong patients.',
  subtitle:
    'Phase III attrition in oncology is a mechanism-alignment problem, not a target problem. CrisPRO names the responder subgroup before the pivotal trial locks its enrollment strategy.',
  sections: [
    {
      id: 'problem',
      label: 'The problem',
      eyebrow: 'Chapter 1 · The problem',
      headline: 'Unstratified populations burn capital.',
      Icon: TrendingUp,
      body: [
        'Antibody-drug conjugate programs miss endpoints at a lenient target-expression threshold and hit them at a stricter one. Checkpoint combinations show responder subgroups only after post-hoc analysis. Replication-stress-response inhibitors fail on all-comer populations and succeed on a stratified subset.',
        'Every one of those failures preserves a repositioning window — if the mechanism-alignment split is named before the next-generation asset enters the clinic.',
      ],
    },
    {
      id: 'wedge',
      label: 'The wedge',
      eyebrow: 'Chapter 2 · The wedge',
      headline: 'CrisPRO occupies the mechanism-alignment layer.',
      Icon: Target,
      body: [
        'The market already has strong players in tissue biology, comprehensive genomic profiling, and real-world evidence. None of them answer the mechanism-alignment question. CrisPRO does — and treats those three layers as complementary inputs, not competitors.',
      ],
      bullets: [
        'Tissue biology / histology — reads what the tissue looks like',
        'Comprehensive genomic profiling — reads which mutations are present',
        'Real-world evidence — reads what happened after the drug was given',
        'CrisPRO — reads the mechanism-alignment split before capital is committed',
      ],
      cta: { label: 'See the 5-capability spine', href: '/engine/' },
    },
    {
      id: 'offerings',
      label: 'Offerings',
      eyebrow: 'Chapter 3 · Offerings for biotech',
      headline: 'Five offerings, structured around when you call us.',
      Icon: Layers,
      body: [
        'CrisPRO monetizes at the four inflection points where mechanism-alignment analysis materially changes an oncology decision: BD diligence, patient selection, IST design, and IP valuation. Each offering has a defined scope, a defined turnaround, and a defined proof case in the ledger.',
      ],
      metrics: [
        { label: 'Offerings', value: '5 · each with a proof case' },
        { label: 'Anchor product', value: 'Trial Failure Decode' },
        { label: 'Every offering traces to', value: 'A decoded program' },
      ],
      cta: { label: 'See the pipeline', href: '/pipeline/' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 4 · Proof',
      headline: 'A public ledger, before we open the sales conversation.',
      Icon: ClipboardCheck,
      body: [
        'CrisPRO does not open with a pitch. It opens with the ledger — every program the engine has decoded, with the mechanism-alignment split named and the receipt open for inspection.',
      ],
      caseStudies: [
        {
          slug: 'ceacam5',
          title: 'Target-directed antibody-drug conjugate program',
          summary: 'Stricter target-expression threshold defines a responder subgroup the pivotal trial missed at the lenient threshold.',
        },
        {
          slug: 'berzosertib',
          title: 'Replication-stress-response inhibitor program',
          summary: 'RS-defined subset shows durable response where the all-comer population did not.',
        },
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
  ],
};
