// ==============================================================================
// /for/patients — Patient & caregiver persona journey (Release A, educational).
// LOCKED primary destination: /demo/patient (DemoWalker, SHA-256-pinned spec).
// The clinical team remains the decision owner. Nothing here directs care.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const FOR_PATIENTS_PAGE_DATA: VerticalPageData = {
  eyebrow: 'For patients and caregivers',
  title: 'Understand your cancer biology. Ask better questions.',
  subtitle:
    'CrisPRO helps patients and caregivers explore how molecular information can inform questions for their oncology team. This page and its walkthrough are educational research substrate — they do not direct care, do not authorize prescribing, and are not clinical decision support. Your oncology team remains the decision owner.',
  sections: [
    {
      id: 'welcome',
      label: 'Where you can start',
      eyebrow: 'Section 1 · Where you can start',
      headline: 'This is a place to learn what your results mean.',
      iconKey: 'heart-pulse',
      body: [
        'Molecular test results, pathology reports, and treatment timelines are hard to read even for clinicians. Patients and caregivers routinely have to ask questions they were not given the vocabulary to ask.',
        'This page is not a clinical tool. It is an educational research substrate: a way to see how CrisPRO reads molecular information, so you can walk into your oncology appointments with better questions and clearer evidence of what remains uncertain.',
      ],
      bullets: [
        'Explore how molecular information can inform questions for your oncology team',
        'See what CrisPRO reads, and what it explicitly cannot tell you',
        'Prepare questions and evidence for your next discussion',
      ],
    },
    {
      id: 'walkthrough',
      label: 'Evidence-led walkthrough',
      eyebrow: 'Section 2 · Evidence-led walkthrough',
      headline: 'Six stages, hash-pinned spec, provenance visible per step.',
      iconKey: 'sparkles',
      body: [
        'The walkthrough is a research substrate — a fixed, hash-pinned educational case. It is not your case. It is designed to show how CrisPRO organizes molecular information into six discussable questions.',
        'The walkthrough does not tell you what treatment to take. It shows you how a discussable next question is structured.',
      ],
      cta: { label: 'Explore an evidence-led walkthrough', href: '/demo/patient' },
      caseStudies: [
        {
          href: '/demo/patient',
          title: 'Patient walkthrough (6 stages)',
          summary: 'Substrate spec is hash-pinned. Every rendered string traces to the spec or to the UI label registry. Educational research substrate.',
          keyMetric: 'Educational walkthrough',
        },
      ],
    },
    {
      id: 'what-you-see',
      label: 'What the walkthrough shows',
      eyebrow: 'Section 3 · What the walkthrough shows',
      headline: 'Six discussable questions.',
      iconKey: 'search',
      body: [
        'The walkthrough is organized around six questions patients and caregivers ask their oncology team every day. It shows how CrisPRO structures the answers — with sources, evidence tiers, and explicit unknowns.',
      ],
      bullets: [
        'What does this result mean?',
        'What may matter?',
        'What remains uncertain?',
        'What information is missing?',
        'What should I ask my oncology team?',
        'Where can I explore an educational research demo safely?',
      ],
    },
    {
      id: 'questions',
      label: 'Questions to bring',
      eyebrow: 'Section 4 · Questions to bring to your care team',
      headline: 'Prepare questions and evidence for your next discussion.',
      iconKey: 'messages-square',
      body: [
        'The point of the walkthrough is not to replace your oncology team. It is to give you a structured vocabulary to prepare for the next conversation. These are the kinds of questions the walkthrough will help you organize:',
      ],
      bullets: [
        'What is driving the disease based on the molecular findings I have?',
        'Are there mechanism-aligned research options that fit my biology?',
        'Are there resistance or escape research signals I should know about?',
        'Are there clinical trials or studies to discuss with my care team?',
        'Are there safety or drug-metabolism (PGx) considerations that apply to me?',
        'What information would improve the answer, and what tests could produce it?',
      ],
    },
    {
      id: 'boundary',
      label: 'What this is not',
      eyebrow: 'Section 5 · What this is not',
      headline: 'Boundary, in plain language.',
      iconKey: 'shield',
      body: [
        'CrisPRO is educational research substrate. Nothing on this page is a substitute for medical advice from your oncology team. It does not authorize prescribing, does not direct care, and is not a validated companion diagnostic. Every claim on the CrisPRO site links back to a public source or an internal receipt — you can inspect them on the public ledger.',
      ],
      bullets: [
        'Not a substitute for your oncology team',
        'Does not authorize prescribing',
        'Does not direct care',
        'Not a validated companion diagnostic',
        'Not a treatment directive',
        'Every claim links back to a public source or internal receipt',
      ],
      cta: { label: 'Read the public claim ledger', href: '/ledger' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Section 6 · Engage',
      headline: 'Where to go from here.',
      iconKey: 'handshake',
      body: [
        'Walk the evidence-led educational research demo, or request access to talk with the CrisPRO team about how this substrate might help your case-preparation workflow.',
      ],
      cta: { label: 'Explore an evidence-led walkthrough', href: '/demo/patient' },
    },
  ],
};
