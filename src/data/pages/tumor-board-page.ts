// ==============================================================================
// /tumor-board — Tumor Board product landing (Release A, evidence-led).
// Replaces the old patient-picker slop shell. The interactive case workspace
// remains at /tumor-board/[patientId] and is not modified here.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const TUMOR_BOARD_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Tumor board · Case-resolution research workspace',
  title: 'Turn an impossible molecular case into a structured next discussion.',
  subtitle:
    'CrisPRO is a case-resolution research workspace for oncologists, molecular tumor boards, and translational teams. It reads a molecular case and returns a transparent mechanism map, resistance-context research view, and mechanism-and-trial-relevance research context — with every finding traced to a source. Educational research substrate — not a clinical decision support tool.',
  sections: [
    {
      id: 'decision',
      label: 'The decision',
      eyebrow: 'Section 1 · The decision it supports',
      headline: 'What does the biology of this case actually favor discussing next?',
      iconKey: 'users',
      body: [
        'Complex molecular cases arrive at tumor boards with too much data and not enough structure. Genomics, pathology, prior therapy, biomarkers, and disease history do not compose themselves into a discussable next step. Meanwhile the review clock is running.',
        'The Tumor Board research workspace gives an oncologist, molecular pathologist, or translational lead a structured case-resolution research view in advance of multidisciplinary review — so the discussion focuses on the biology, not on assembling it.',
      ],
      bullets: [
        'For oncologists: mechanism and resistance-context research view for a complex case',
        'For molecular tumor boards: shared research substrate every reviewer can see',
        'For translational teams: mechanism-alignment research context and evidence gaps',
      ],
      cta: { label: 'Explore an evidence-led case walkthrough', href: '/demo/tumor-board' },
    },
    {
      id: 'input',
      label: 'What you bring',
      eyebrow: 'Section 2 · What you bring in',
      headline: 'Pathology, genomics, prior therapy, biomarkers, disease history, available labs.',
      iconKey: 'clipboard-check',
      body: [
        'Inputs are the artifacts a case already produces. Pathology and genomics reports, prior treatment history, biomarker status, disease history, and any available labs.',
        'The workspace does not ask for a proprietary data feed. It reads what is present, names what is missing, and structures the discussion.',
      ],
    },
    {
      id: 'workflow',
      label: 'Case-resolution workflow',
      eyebrow: 'Section 3 · Case-resolution research workflow',
      headline: 'Seven questions, one research view.',
      iconKey: 'git-branch',
      body: [
        'The workspace organizes the case around seven questions. Each has its own mechanism-linked research view. The point is not to answer them for the clinical team — the point is to structure the answers the clinical team is trying to reach.',
      ],
      bullets: [
        'What is driving the disease? — mechanism map',
        'What mechanisms fit this biology? — mechanism-alignment research view',
        'What may be resisting now or emerge next? — resistance research context',
        'What treatment and trial questions deserve review? — mechanism-alignment research context',
        'What safety or exposure signals matter? — PGx research context',
        'What must be tested next? — evidence gaps and missing-data research view',
        'Why does CrisPRO believe this? — receipt trail per finding',
      ],
    },
    {
      id: 'output',
      label: 'What you receive',
      eyebrow: 'Section 4 · What you receive',
      headline: 'A discussion-ready case-resolution research view — with the receipts inline.',
      iconKey: 'clipboard-check',
      body: [
        'The workspace returns a case-resolution research view every part of which is traceable to a source and an evidence tier. It is designed to be read in preparation for multidisciplinary review, not to substitute for it.',
        "The patient's oncology team remains the decision owner. CrisPRO does not authorize prescribing, does not direct care, and is not a validated companion diagnostic.",
      ],
      bullets: [
        'Biology map — what is driving the disease',
        'Vulnerability hypotheses — dependency and mechanism-alignment research view',
        'Mechanism-aligned therapy research context (not therapy directive)',
        'Trial exploration research context (not trial recommendation)',
        'Resistance and escape research view',
        'Safety and PGx research context',
        'Missing-data research view and evidence gaps',
        'Governance and provenance chip on every finding',
      ],
      caseStudies: [
        {
          href: '/tumor-board/AK',
          title: 'AK bundle — case workspace',
          summary: 'Existing 4-bundle case workspace with per-bundle coverage badges. Educational research substrate. Numbers are grounded either in the pan-cancer sweep or in per-bundle cited sources.',
          keyMetric: 'Evidence-linked · Educational',
        },
        {
          href: '/demo/tumor-board',
          title: 'Tumor Board walkthrough',
          summary: '6-stage evidence-led case walkthrough. Substrate spec is hash-pinned. Provenance visible per stage.',
          keyMetric: 'Educational walkthrough',
        },
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Section 5 · Proof and limits',
      headline: 'Every finding names its evidence tier, cohort, and scope.',
      iconKey: 'shield',
      body: [
        'The workspace is a research substrate. Every finding carries an evidence tier chip: Rule-based, Artifact-backed, Evidence-linked, or Needs data. Every numeric claim has a receipt row on the public ledger.',
        "What is quarantined or retired does not appear. What is not yet verified inside the engine stays behind engineering repair, not marketing. The patient's oncologist remains the decision owner.",
      ],
      bullets: [
        'Educational research substrate — not clinical decision support',
        'Not a validated companion diagnostic',
        'Does not authorize prescribing',
        'Every claim traces to a receipt row',
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
        'Walk an evidence-led case at your own pace, open one of four demo patient bundles, or open a workspace conversation with the CrisPRO team.',
      ],
      bullets: [
        'Explore an evidence-led case walkthrough — /demo/tumor-board',
        'Open a demo patient bundle — /tumor-board/AK, BR01, CRC01, or BM01',
        'Read the shared intelligence layer — /platform',
        'Request a workspace review — Contact form with tumor-board context',
      ],
      cta: { label: 'Explore an evidence-led case walkthrough', href: '/demo/tumor-board' },
    },
  ],
};
