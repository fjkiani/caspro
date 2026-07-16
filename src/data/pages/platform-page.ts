// ==============================================================================
// /platform — Shared intelligence layer explainer (Release A, evidence-led).
// Presents the engine chain as a static educational node map, not a live scorer.
// Certain propagation paths remain under engineering repair — disclosed here.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const PLATFORM_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Platform · One intelligence layer, three experiences',
  title: 'One mechanism-alignment research substrate. Three product surfaces.',
  subtitle:
    'CrisPRO is one research engine expressed through three product experiences: Drug Development, Tumor Board, and Patient Clarity. This page explains the shared components — mechanism map, dependency, resistance, mechanism-and-trial-relevance research context, PGx, and evidence — and how each product surface reads them.',
  sections: [
    {
      id: 'shape',
      label: 'The shape',
      eyebrow: 'Section 1 · The shape of the platform',
      headline: 'One layer, three experiences, all cross-linked.',
      iconKey: 'layers',
      body: [
        'CrisPRO is not three separate tools. It is one mechanism-alignment research substrate that Drug Development, Tumor Board, and Patient Clarity each read from a different angle.',
        'That is why the platform page exists — to show which components feed which surface, and to keep the story coherent as you move between them.',
      ],
      bullets: [
        'Drug Development reads the substrate for target, cohort, and program decisions',
        'Tumor Board reads it for case-resolution research and multidisciplinary preparation',
        'Patient Clarity reads it for patient- and caregiver-facing education',
      ],
    },
    {
      id: 'engine-chain',
      label: 'Engine chain',
      eyebrow: 'Section 2 · Engine chain',
      headline: 'From molecular input to case-resolution research view.',
      iconKey: 'git-branch',
      body: [
        'The shared substrate composes seven research components. Each has its own capability page and its own evidence trail. Together they form the mechanism-alignment research view every product surface reads.',
      ],
      bullets: [
        'Mechanism map (MoA) — pathway-alignment research view',
        'Synthetic Lethality — dependency and vulnerability discovery',
        'Target Lock — target-specific mechanism-alignment substrate',
        'Kill Chain — resistance and escape research context',
        'Mechanism-and-trial-relevance research context — in-silico trials substrate',
        'PGx and safety research context — pharmacogenetic scoping (scope-limited, data-backed)',
        'Governance and evidence — public claim ledger + receipt trail',
      ],
    },
    {
      id: 'matrix',
      label: 'Shared-layer matrix',
      eyebrow: 'Section 3 · Shared-layer matrix',
      headline: 'Same components, three surfaces.',
      iconKey: 'sparkles',
      body: [
        'The same seven components feed all three product surfaces. What changes is the framing and the audience, not the underlying research substrate.',
      ],
      bullets: [
        'MoA and pathway map → mechanism fit in Drug Development, biology map in Tumor Board, plain-language biology in Patient Clarity',
        'Synthetic Lethality → dependency research in Drug Development, vulnerability hypotheses in Tumor Board, discussable options in Patient Clarity',
        'Target Lock → target-specific mechanism-alignment in Drug Development, cross-linked to Tumor Board case bundles',
        'Kill Chain / resistance → resistance research context across all three surfaces',
        'Mechanism-and-trial-relevance research context → cohort logic in Drug Development, trial exploration in Tumor Board and Patient Clarity',
        'PGx research context → exposure risk research view across all three surfaces',
        'Evidence and governance → public claim ledger backing every surface',
      ],
      caseStudies: [
        {
          href: '/engine',
          title: 'Engines and capabilities',
          summary: 'Existing capability inventory. Each engine has its own scope and evidence trail.',
          keyMetric: 'Evidence-linked',
        },
        {
          href: '/evidence',
          title: 'Evidence surface',
          summary: 'Every claim on this site links back to a receipt row here.',
          keyMetric: 'Governance-anchored',
        },
      ],
    },
    {
      id: 'engine-status',
      label: 'Engine status',
      eyebrow: 'Section 4 · Engine status',
      headline: 'What is live, what is under engineering repair, what is not marketed.',
      iconKey: 'shield',
      body: [
        'CrisPRO is a research substrate. Not every propagation path inside the engine is currently green. That is disclosed here rather than hidden inside marketing.',
        'Release A ships the evidence-led website — homepage, product landings, personas, and educational walkthroughs over hash-pinned specs. It does not surface operational-scoring language over any propagation path that is under engineering repair. When the engine gate turns green, Release B updates the language.',
      ],
      bullets: [
        'Live and receipt-anchored: PATH A ranker formula (locked 2026-04-28), unified registry, evidence ledger, retired-value blocklist',
        'Educational research substrate: mechanism maps, dependency and target-lock research surfaces, resistance and Kill Chain research view, in-silico mechanism-alignment research context',
        'Under engineering repair (not marketed as operational scoring): specific engine propagation paths under active review',
        'Retired and quarantined: do not appear on this site',
      ],
      cta: { label: 'Read the public claim ledger', href: '/ledger' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Section 5 · Engage',
      headline: 'Enter through a product surface.',
      iconKey: 'handshake',
      body: [
        'The platform page is a map. To use CrisPRO, pick a product surface: Drug Development, Tumor Board, or Patient Clarity.',
      ],
      bullets: [
        'Drug Development — /drug-development',
        'Tumor Board — /tumor-board',
        'Patient Clarity — /for/patients',
        'Read the evidence ledger — /ledger',
        'See the engines — /engine',
      ],
      cta: { label: 'Read the evidence ledger', href: '/evidence' },
    },
  ],
};
