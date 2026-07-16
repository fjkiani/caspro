// ==============================================================================
// /for/pharma — Pharma & biotech R&D persona journey (Release A, evidence-led).
// Persona routes into the Drug Development product surface + pharma demo.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const FOR_PHARMA_PAGE_DATA: VerticalPageData = {
  eyebrow: 'For pharma and biotech R&D teams',
  title: 'Build the program that survives contact with real tumor biology.',
  subtitle:
    'Pharma target-discovery, translational, and program teams use CrisPRO to read the biology behind a target, asset, or trial — as a mechanism-alignment research substrate — before wet-lab weeks or a Phase III burn commits the program. Educational research substrate only.',
  sections: [
    {
      id: 'decision',
      label: 'The decision',
      eyebrow: 'Section 1 · The decision it supports',
      headline: 'Which experiment, cohort, or protocol change earns the next investment?',
      iconKey: 'target',
      body: [
        'The most expensive way to learn a program is misaligned is to run the trial. The second most expensive is to run the perturbation series. CrisPRO exists to compress that loop into a structured mechanism brief a translational or program lead can defend in review.',
        'It is not a scorer that gives you a go / no-go. It is a research substrate that names the mechanism, the dependency, the resistance context, and the missing evidence — so the next investment is placed with a full audit trail.',
      ],
    },
    {
      id: 'workflow',
      label: 'How a session runs',
      eyebrow: 'Section 2 · How a session runs',
      headline: 'From target hypothesis to structured mechanism brief.',
      iconKey: 'git-branch',
      body: [
        'A typical session is bounded: bring a target, asset, trial, or failed hypothesis, walk it through the mechanism-alignment research substrate, and leave with a brief every claim of which is linked to a public source.',
      ],
      bullets: [
        'Start with a target hypothesis, asset, trial, or failed hypothesis',
        'Decode mechanism fit and disease context',
        'Surface dependency, resistance, cohort, and combination research context',
        'Return a structured mechanism brief — every claim traced',
      ],
    },
    {
      id: 'modules',
      label: 'Modules you can walk',
      eyebrow: 'Section 3 · Modules',
      headline: 'The eight research modules that back the Drug Development surface.',
      iconKey: 'layers',
      body: [
        'The Drug Development surface composes eight underlying research modules. Each has its own capability page for teams who want to walk the substrate directly.',
      ],
      bullets: [
        'Target Mission — target and dependency research substrate',
        'Mechanism Fit — MoA and pathway-alignment research view',
        'Synthetic Lethality and BRIEF — vulnerability discovery substrate',
        'Resistance and Escape research view — Kill Chain surface',
        'Cohort Strategy research view — mechanism split candidates',
        'In-Silico Trial Decode — mechanism-alignment trial context',
        'PGx and Exposure research context — pharmacogenetic scoping (data-backed, scope-limited)',
        'Program Ledger — every claim receipt-anchored',
      ],
      caseStudies: [
        {
          href: '/engine/synthetic-lethality',
          title: 'Synthetic Lethality research surface',
          summary: 'Existing capability page. Cross-link into dependency discovery research substrate.',
          keyMetric: 'Evidence-linked · Educational',
        },
        {
          href: '/kill-chain',
          title: 'Kill Chain resistance research surface',
          summary: 'Existing capability page. Cross-link into resistance-context research view.',
          keyMetric: 'Mechanism-led · Educational',
        },
      ],
    },
    {
      id: 'output',
      label: 'What you leave with',
      eyebrow: 'Section 4 · What you leave with',
      headline: 'A defensible mechanism brief, not a black-box score.',
      iconKey: 'clipboard-check',
      body: [
        'Every finding in the brief is traceable to a public source and an evidence tier. The brief is a research artifact that supports a program conversation — it is not a clinical decision support tool.',
      ],
      bullets: [
        'Mechanism-alignment research view',
        'Dependency and resistance research context',
        'Cohort mechanism split candidates and their missing evidence',
        'Trial-relevance research context, not trial outcome prediction',
        'Full receipt trail — every claim linked to a source and tier',
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Section 5 · Proof and limits',
      headline: 'Read the evidence state before you build a program on top of it.',
      iconKey: 'shield',
      body: [
        'CrisPRO is a research substrate. Certain propagation paths inside the engine are still under engineering repair and cannot be marketed as operational scoring yet. That is disclosed here, not hidden.',
        'On the public claim ledger, every numeric statement carries a receipt row with cohort, analysis method, evidence tier, and scope limitation. No exceptions.',
      ],
      bullets: [
        'Educational research substrate — not a clinical decision support tool',
        'Not a validated companion diagnostic',
        'Every quantitative statement traces to a receipt row',
        'Retired and quarantined numeric claims do not appear on this site',
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
        'Walk an evidence-led pharma case, or open a program conversation with the CrisPRO team.',
      ],
      cta: { label: 'Explore an evidence-led case walkthrough', href: '/demo/pharma' },
    },
  ],
};
