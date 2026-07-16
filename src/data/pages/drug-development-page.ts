// ==============================================================================
// /drug-development — Drug Development product landing (Release A, evidence-led).
// Consolidates Interception + In-Silico Trials + MoA + Synthetic Lethality +
// Target Lock + Kill Chain storytelling. NO working-demo claims. Every metric
// is anchored to a public claim ledger row.
// Route: /drug-development (rewrite in place)
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const DRUG_DEVELOPMENT_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Drug development · Evidence-led research substrate',
  title: 'From target hypothesis to a program that survives tumor biology.',
  subtitle:
    'CrisPRO is a mechanism-alignment research substrate for pharma and biotech target-discovery, translational, and program teams. It reads the biology behind an asset, cohort, or trial and returns a structured research view of mechanism fit, dependency, resistance, and evidence gaps. Educational research substrate only — not a clinical decision support tool.',
  sections: [
    {
      id: 'decision',
      label: 'The decision',
      eyebrow: 'Section 1 · The decision it supports',
      headline: 'Which target, cohort, or asset earns the next investment?',
      iconKey: 'target',
      body: [
        'Programs die because they enter tumor biology they were never aligned to. A target may be druggable but the dependency is not there. A cohort may hit the enrollment number but the mechanism split is invisible. A comparator may look adjacent but map to a different axis.',
        'The Drug Development research surface exists to give a translational, target-discovery, or program lead a structured mechanism map they can defend inside a program review — before wet-lab weeks or Phase III capital is committed.',
      ],
      bullets: [
        'For target-discovery leads: mechanism fit and dependency substrate for a candidate target',
        'For translational leads: cohort mechanism split and resistance-context research view',
        'For program leads: comparator landscape as a mechanism-alignment matrix rather than a label match',
      ],
      cta: { label: 'Read the evidence ledger', href: '/evidence' },
    },
    {
      id: 'input',
      label: 'What you bring',
      eyebrow: 'Section 2 · What you bring in',
      headline: 'A target, an asset, a trial, or a failed hypothesis.',
      iconKey: 'clipboard-check',
      body: [
        'Inputs are pragmatic: a target gene or gene set, an asset with a known mechanism, a trial with a comparator, or a hypothesis you want stress-tested against mechanism fit.',
        'CrisPRO does not require a proprietary dataset. Every claim in the substrate traces back to a public source — a paper, a functional-genomics resource, a trial registry, or an internal receipt row that is enumerable on the evidence ledger.',
      ],
      bullets: [
        'Target hypothesis (single gene / short list)',
        'Asset + declared mechanism',
        'Trial + comparator to decode',
        'Failed hypothesis to stress-test',
      ],
    },
    {
      id: 'workflow',
      label: 'How it moves',
      eyebrow: 'Section 3 · Six research pathways',
      headline: 'One mechanism map, six angles you can walk into.',
      iconKey: 'git-branch',
      body: [
        'The Drug Development surface exposes six research pathways over the same shared intelligence layer. Each links out to an existing capability page — cross-linked rather than duplicated — so the same research substrate feeds every angle.',
      ],
      bullets: [
        'Explore mechanism fit — MoA and pathway-alignment research surface',
        'Explore dependency and synthetic lethality — vulnerability discovery research substrate',
        'Explore Target Lock — Target-Lock brain-met research surface',
        'Explore resistance and Kill Chain — resistance-context research view',
        'Explore cohort and trial-relevance research context — in-silico trials substrate',
        'Explore Interception — metastasis-interception research surface',
      ],
      caseStudies: [
        {
          href: '/engine/synthetic-lethality',
          title: 'Synthetic Lethality research surface',
          summary: 'Cross-link into the dependency and vulnerability research surface. Educational substrate only — provenance chips visible per finding.',
          keyMetric: 'Evidence-linked · Educational',
        },
        {
          href: '/insilico',
          title: 'In-Silico Trials research context',
          summary: 'Cross-link into the mechanism-alignment trial-context substrate. Not a trial outcome predictor. Not a responder classifier.',
          keyMetric: 'Mechanism-alignment · Educational',
        },
      ],
    },
    {
      id: 'output',
      label: 'What you receive',
      eyebrow: 'Section 4 · What you receive',
      headline: 'A structured mechanism brief with every claim traced.',
      iconKey: 'clipboard-check',
      body: [
        'CrisPRO returns a structured mechanism brief. Each finding carries an evidence tier chip and links to a receipt row on the public claim ledger. Nothing appears in the brief without a source you can inspect.',
        'The brief is a research artifact — a starting point for a target review, a wet-lab handoff conversation, or a program committee. It is not a clinical decision support tool. It does not authorize prescribing. It is not a validated companion diagnostic.',
      ],
      bullets: [
        'Target Mission — mechanism, dependency, and known scoping limits',
        'Perturbation Package — candidate perturbation logic + off-target research context',
        'Validation Design — wet-lab handoff research brief with explicit unknowns',
        'Trial Failure Decode — mechanism-alignment stress test over a comparator landscape',
        'Cohort Strategy research view — mechanism split candidates and the missing evidence',
        'Program BRIEF — one-page executive research artifact with every claim linked',
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Section 5 · Proof and limits — read both',
      headline: 'What is scoreable now, what is missing, what is quarantined.',
      iconKey: 'shield',
      body: [
        'CrisPRO does not surface a numeric metric on the public site without a receipt row on the public claim ledger. That is a structural rule. Every metric has to name its cohort, its analysis method, its evidence tier, and its scope limitation before it can appear here.',
        'What is quarantined or retired stays off the public site. What is educational stays labeled educational. What is not yet verified stays behind engineering repair, not marketing.',
      ],
      bullets: [
        'Evidence chip legend on every surface: Rule-based · Artifact-backed · Evidence-linked · Needs data',
        'Public claim ledger enumerates every quantitative statement + its scope',
        'PATH A ranker formula is the locked substrate — internal governance receipt',
        'Retired and quarantined numeric claims do not appear on this site (see the ledger)',
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
        'Two ways forward. Walk an evidence-led case at your own pace, or open a program conversation with the CrisPRO team.',
      ],
      bullets: [
        'Explore an evidence-led case walkthrough — Pharma demo (6 stages, hash-pinned spec)',
        'Read the shared intelligence layer — Platform page',
        'Request a program review — Contact form with pharma context',
      ],
      cta: { label: 'Explore an evidence-led case walkthrough', href: '/demo/pharma' },
    },
  ],
};
