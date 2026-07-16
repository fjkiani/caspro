import type { VerticalPageData } from '@/components/audience/VerticalSurface';

// ==============================================================================
// /products/tumor-board — page data (Worker 5, from W4 truth contract)
// Source of truth: product_truth/TUMOR_BOARD_PRODUCT_TRUTH.json,
//   TUMOR_BOARD_CASE_RESOLUTION_CONTRACT.json, TUMOR_BOARD_SECTION_INVENTORY.csv,
//   TUMOR_BOARD_SHARED_LAYER_MATRIX.csv, PUBLIC_PRODUCT_CLAIM_LEDGER.csv
// Framing: research case-resolution workspace. NOT clinical decision support,
//   NOT a treatment directive, NOT "four demo patients". Demo cards are labeled
//   demo fixtures, explicitly not the product. RUO throughout.
// ==============================================================================

export const TUMOR_BOARD_PAGE_DATA: VerticalPageData = {
  eyebrow: 'CrisPRO · Tumor Board · Research Use Only',
  title: 'Tumor Board: turn molecular complexity into a traceable research case resolution',
  subtitle:
    'Bring a patient\u2019s available clinical and molecular context. CrisPRO organizes the biology, vulnerabilities, mechanism-aligned options, trial landscape, evidence, missing data, and caveats into one reviewable research workspace.',
  sections: [
    {
      id: 'decision',
      label: 'Decision',
      eyebrow: 'Block 1 · The decision that changes',
      headline: 'What does this biology mean for this case, right now?',
      iconKey: 'microscope',
      body: [
        'A clinician or translational team has a molecular profile but needs the relevant biology, options, trial context, risks, missing information, and evidence boundaries assembled into one interpretable case output.',
        'Tumor Board is the human decision surface of the platform \u2014 the research case-resolution workspace, not a separate biology engine and not a set of demo patients. It presents what the molecular profile supports, which mechanism-aligned options and trials should be investigated, what evidence applies, and what remains uncertain.',
      ],
      bullets: [
        'Organizes a molecular profile into a reviewable case, section by section.',
        'Ties every output claim to a source and an evidence tier.',
        'States explicitly what the profile does NOT tell you and where confidence is low.',
      ],
    },
    {
      id: 'problem',
      label: 'Problem',
      eyebrow: 'Block 2 · Why the current workflow fails',
      headline: 'Molecular profiles arrive without assembled, traceable context',
      iconKey: 'search',
      body: [
        'A profile lands as a list of variants and signals. The relevant pathway biology, candidate vulnerabilities, mechanism-aligned options, trial landscape, resistance risks, and evidence provenance are scattered across tools and literature and must be reassembled by hand for every case.',
        'Tumor Board assembles them from the same shared intelligence layer that drives Interception and In-Silico Trials \u2014 so a vulnerability found in one product surfaces the same way here.',
      ],
    },
    {
      id: 'input',
      label: 'Input',
      eyebrow: 'Block 3 · What the customer brings',
      headline: 'A molecular profile, plus clinical context where available',
      iconKey: 'clipboard-list',
      body: [
        'The required input is a molecular profile: variants, structural events, and expression signature where available. Clinical context (histology, stage, prior lines) and available specimens/assays are recommended.',
      ],
      bullets: [
        'Required: molecular profile.',
        'Recommended: clinical context + available specimens/assays.',
        'PHI handling is out of scope for the public surface; enterprise deployments include the governance layer.',
      ],
    },
    {
      id: 'workflow',
      label: 'Workflow',
      eyebrow: 'Block 4 · What CrisPRO does',
      headline: 'One shared intelligence layer, assembled into a case',
      iconKey: 'layers',
      body: [
        'The same shared layer feeds all three products. In Tumor Board it is scoped to the individual profile: MoA/pathway map for patient vulnerability context, synthetic lethality for candidate dependency exploration, trial decoding for mechanism-aligned trial exploration, resistance logic for patient-level hypothesis and risk, Target Lock as optional research annotation, PGx as a research safety flag, and governance for case-output bounds.',
        'The invariant: a vulnerability, mechanism, escape route, or trial that surfaces in one product surfaces in the others the same way, because it is pulled from the same layer. The products differ only in the customer decision they scope.',
      ],
      bullets: [
        'Biology map \u2014 named pathways/MoA active in the profile (live). Not a definitive mechanistic diagnosis.',
        'Vulnerability hypotheses \u2014 SL / dependency candidates with evidence tiers (scope-limited). Not a proven patient-specific vulnerability.',
        'Trial exploration \u2014 mechanism-aligned trials from the 42-trial / 7-program ledger (live). Not enrollment or responder prediction.',
      ],
    },
    {
      id: 'output',
      label: 'Output',
      eyebrow: 'Block 5 · What the customer receives',
      headline: 'A traceable case package: seven sections, every claim sourced',
      iconKey: 'clipboard-check',
      body: [
        'The case output has seven sections: biology map, vulnerability hypotheses, mechanism-aligned options, trial exploration, evidence trace, missing-data + confidence, and caveats/governance flags. Every claim links to its source and evidence tier.',
        'Demo patient cards illustrate the workspace UI on synthetic profiles. They are demo fixtures \u2014 explicitly not real case resolutions and not clinical guidance.',
      ],
      metrics: [
        {
          label: 'Evidence trace',
          value: 'Source + tier on every claim',
          footnote: 'Shared provenance layer (live). Provenance is not clinical validation.',
        },
        {
          label: 'Missing-data + confidence',
          value: 'What the profile does NOT support',
          footnote: 'Confidence-tier layer (live). Not a diagnostic confidence interval.',
        },
        {
          label: 'Governance / RUO',
          value: 'Quarantines relevant to the case',
          footnote: 'Governance ledger (live). Research use only; work remaining is named.',
        },
      ],
      bullets: [
        'Mechanism-aligned options are enumerated with evidence tags \u2014 research exploration, not a treatment recommendation.',
        'Escape/resistance risks are enumerated with evidence tier \u2014 not individual-patient escape prediction.',
        'PGx/safety flags surface where validated data exists \u2014 not prescribing authority.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Block 6 · Receipts and scope',
      headline: 'A research workspace, bounded by governance',
      iconKey: 'shield',
      body: [
        'Each output section is inventoried by execution status: executable and live, scope-limited, data-backed but manual, or demo fixture. The section inventory is part of the product truth, so the surface never overstates what is live.',
        'Research Use Only. Tumor Board is not clinical decision support, not a treatment directive, not a diagnostic system, and not a prognosis or individual-responder predictor. It remains RUO unless and until validated for clinical deployment.',
      ],
      caseStudies: [
        {
          href: '/ledger',
          title: 'Public claim ledger',
          summary: 'Every Tumor Board section claim with its receipt, grade, and qualifier.',
          keyMetric: 'Grades A\u2013B \u00b7 receipt per row',
        },
        {
          href: '/tumor-board',
          title: 'Case workspace',
          summary: 'The existing live case-resolution surface and section layout.',
          keyMetric: '7 sourced sections',
        },
      ],
    },
    {
      id: 'engagement',
      label: 'Engagement',
      eyebrow: 'Block 7 · A first partner engagement',
      headline: 'A reviewable case package on your profiles',
      iconKey: 'handshake',
      body: [
        'A first engagement runs the workspace on real molecular profiles from your program, producing traceable case packages with evidence trace, missing-data display, and governance flags \u2014 reviewed as research, with the clinical decision remaining entirely with the treating team.',
      ],
      bullets: [
        'Case packages assembled from your profiles, every claim sourced and tiered.',
        'An optional handoff routes a candidate into the Interception target-and-perturbation workflow \u2014 the handoff is a design, not an experimental result.',
        'RUO throughout; the human clinical decision is never delegated to the workspace.',
      ],
      cta: {
        label: 'Read the public ledger',
        href: '/ledger',
        helper: 'Tumor Board is a research case-resolution workspace \u2014 not clinical decision support.',
      },
    },
  ],
};
