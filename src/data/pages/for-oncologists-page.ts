// ==============================================================================
// /for/oncologists — Oncologist & molecular tumor board persona journey (Release A).
// Routes into /tumor-board (product landing) and /demo/tumor-board (walkthrough).
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const FOR_ONCOLOGISTS_PAGE_DATA: VerticalPageData = {
  eyebrow: 'For oncologists and molecular tumor boards',
  title: 'Turn an impossible molecular case into a structured next discussion.',
  subtitle:
    'Oncologists, molecular tumor boards, and translational teams use CrisPRO to prepare complex molecular cases for review. It gives the room a shared mechanism map, resistance research context, and mechanism-and-trial-relevance research context — every finding traced to a source. Educational research substrate — the clinical team remains the decision owner.',
  sections: [
    {
      id: 'decision',
      label: 'The decision',
      eyebrow: 'Section 1 · The decision it supports',
      headline: 'What is worth discussing at the next tumor board?',
      iconKey: 'users',
      body: [
        'Tumor boards are memory-limited. A case comes in with dozens of biomarkers, prior treatments, imaging updates, and pathology fragments — and the room has an hour. Most reviews spend that hour assembling context rather than reasoning through it.',
        'CrisPRO exists to hand the room an assembled context — a case-resolution research view — so the discussion can go directly to biology and next questions.',
      ],
    },
    {
      id: 'session',
      label: 'How a case moves',
      eyebrow: 'Section 2 · How a case moves',
      headline: 'From artifacts to a discussion-ready research view.',
      iconKey: 'git-branch',
      body: [
        'A typical session runs on the artifacts you already have — pathology, genomics, biomarkers, prior treatment history, available labs.',
      ],
      bullets: [
        'Load pathology, genomics, prior treatment history, biomarkers, disease history, and available labs',
        'Receive a transparent case-resolution research view',
        'See mechanism hypotheses, resistance research context, mechanism-and-trial-relevance research context, and PGx research context',
        'Use it to prepare for multidisciplinary review and the patient discussion that follows',
      ],
    },
    {
      id: 'output',
      label: 'What the workspace shows',
      eyebrow: 'Section 3 · What the workspace shows',
      headline: 'Seven questions, structured for discussion.',
      iconKey: 'clipboard-check',
      body: [
        'The workspace is organized around the seven questions a tumor board is trying to answer, with every finding traced to a source and an evidence tier.',
      ],
      bullets: [
        'What is driving the disease?',
        'What mechanisms fit this biology?',
        'What may resist now or emerge next?',
        'What treatment and trial questions deserve review?',
        'What safety or exposure signals matter?',
        'What must be tested next?',
        'Why does CrisPRO believe this? — receipt trail per finding',
      ],
      caseStudies: [
        {
          href: '/tumor-board',
          title: 'Tumor Board landing',
          summary: 'Product landing with the full case-resolution research view and links to four demo bundles.',
          keyMetric: 'Evidence-linked',
        },
        {
          href: '/demo/tumor-board',
          title: 'Evidence-led case walkthrough',
          summary: '6-stage walkthrough over a hash-pinned spec. Provenance visible per stage.',
          keyMetric: 'Educational walkthrough',
        },
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Section 4 · Proof and limits',
      headline: 'The clinical team remains the decision owner.',
      iconKey: 'shield',
      body: [
        'CrisPRO is a research substrate. It does not authorize prescribing, does not direct care, is not a validated companion diagnostic, and is not clinical decision support.',
        'Every quantitative statement traces to a receipt row on the public ledger with cohort, analysis method, evidence tier, and scope limitation. Retired and quarantined values do not appear here.',
      ],
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Section 5 · Engage',
      headline: 'Where to go from here.',
      iconKey: 'handshake',
      body: [
        'Walk a case-resolution research view, open a demo bundle, or open a workspace conversation with the CrisPRO team.',
      ],
      cta: { label: 'Explore a case-resolution walkthrough', href: '/demo/tumor-board' },
    },
  ],
};
