// ==============================================================================
// /products/tumor-board/ — CrisPRO Tumor Board (Research case-resolution
// workspace). Truth-contract-driven; RUO — NOT clinical decision support.
//
// Generated 2026-07-16 from W4_tumor_board/TUMOR_BOARD_PRODUCT_TRUTH.json.
// Every claim grade B or better; no prohibited clinical/treatment framing ships.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const TUMOR_BOARD_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · Tumor Board · RUO',
  title: 'Molecular complexity, resolved as a traceable research case.',
  subtitle:
    'Tumor Board translates CrisPRO\'s research intelligence into a traceable case-resolution workspace. It presents what a molecular profile supports, which mechanism-aligned options and trials should be investigated, what evidence applies, and what remains uncertain — for research review, not clinical directive.',
  sections: [
    {
      id: 'decision',
      label: 'The decision',
      eyebrow: 'Block 1 · Decision',
      headline: 'A traceable research case package — from molecular profile to a reviewable workspace.',
      iconKey: 'heart-pulse',
      body: [
        'Translational and research teams have molecular profiles. What they need is a traceable case-resolution workspace that assembles the relevant biology, vulnerabilities, mechanism-aligned options, trial context, missing data, and caveats — in one interpretable output.',
        'Tumor Board is that workspace. It is a research case-resolution surface, not clinical decision support and not a treatment directive.',
      ],
      bullets: [
        'For research and translational teams reviewing complex molecular profiles.',
        'Delivered as a case workspace: biology map, vulnerability hypotheses, mechanism-aligned options, trial exploration, evidence trace, missing-data + confidence, caveats.',
        'Shares one intelligence layer with Interception and In-Silico Trials — the same MoA, SL, resistance, trial, PGx, and governance components surface across all three products.',
      ],
    },
    {
      id: 'problem',
      label: 'The problem',
      eyebrow: 'Block 2 · Problem',
      headline: 'Case reviews summarize molecular reports; they do not resolve them.',
      iconKey: 'clipboard-list',
      body: [
        'A molecular tumor board case today looks like: a genomic report, an IHC report, an RNA signature (sometimes), a clinical vignette, and a room of experts triangulating on what the profile means, what options exist, and what evidence supports each.',
        'The room does its job well — but the record is thin. Which pathway is active? Which vulnerability is best supported? Which trial matches the mechanism? What does the profile not tell us? Those answers exist in the biology intelligence layer already; they just do not show up in the case notes.',
        'Tumor Board is the surface that shows them up — every claim tagged with source and evidence tier, every missing-data flag explicit, every quarantine visible.',
      ],
    },
    {
      id: 'input',
      label: 'What you bring',
      eyebrow: 'Block 3 · Input',
      headline: 'A molecular profile. Clinical context where available.',
      iconKey: 'clipboard-check',
      body: [
        'The input contract is straightforward: bring the profile, get the workspace.',
      ],
      bullets: [
        'Required: molecular profile (variants, structural events, expression signature where available).',
        'Recommended: clinical context (histology, stage, prior lines), available specimens / assays.',
        'Governance: PHI handling is scoped to enterprise deployments; the public surface is RUO on de-identified inputs.',
      ],
    },
    {
      id: 'workflow',
      label: 'What CrisPRO does',
      eyebrow: 'Block 4 · Workflow',
      headline: 'Assemble the case from the shared intelligence layer.',
      iconKey: 'git-branch',
      body: [
        'The workspace pulls from the same components used by Interception and In-Silico Trials — MoA / pathway map, synthetic lethality, trial decoding, resistance / escape logic, Target Lock (as optional annotation), PGx, governance.',
        'The differentiator is the case-resolution framing: every component surfaces as a section of the workspace, with evidence tier, missing-data flag, and RUO reminder. The output is not a recommendation — it is a research case package for review.',
      ],
      bullets: [
        'Biology map — named pathways / MoA active in the profile.',
        'Vulnerability hypotheses — SL candidates + dependency signals + evidence tiers.',
        'Mechanism-aligned options — research exploration; not a treatment recommendation.',
        'Trial exploration — mechanism-relevant trials with fit rationale.',
        'Escape / resistance risks — plausible routes with evidence tier.',
        'Evidence trace — every claim linked to source and tier.',
        'Missing-data + confidence — what the profile does NOT tell us.',
        'PGx / safety flags — evidence surfacing; no prescribing authority.',
        'Governance / RUO reminder — quarantines relevant to the case, human-work-remaining note.',
      ],
    },
    {
      id: 'output',
      label: 'What you receive',
      eyebrow: 'Block 5 · Output',
      headline: 'One traceable case package. Ten sections.',
      iconKey: 'layers',
      body: [
        'The workspace is one artifact — a reviewable case package, not a set of dashboards. It renders the same shared-layer components arranged for case review.',
      ],
      caseStudies: [
        { slug: 'shared-layer', title: 'Same intelligence, three products', summary: 'A vulnerability found by SL in Tumor Board is the same vulnerability that surfaces in Interception target selection and In-Silico Trials cohort strategy — one layer, three surfaces.' },
      ],
      bullets: [
        'Every claim tagged with evidence tier.',
        'Every missing-data flag explicit.',
        'Every quarantine relevant to the case surfaced by name.',
        'Demo bundles are labeled as illustrative synthetic profiles — not real case outputs.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Block 6 · Proof & limits',
      headline: 'A research workspace, bounded honestly.',
      iconKey: 'shield',
      body: [
        'Tumor Board is not a separate biology engine. It is the research decision surface of the shared CrisPRO intelligence layer — the same layer that powers Interception and In-Silico Trials. That is a feature, not a limitation: findings are consistent across the three surfaces.',
        'It is not clinical decision support and not a treatment directive. Clinical deployment requires validation that has not been completed.',
      ],
      bullets: [
        'Not clinical decision support.',
        'Not a treatment recommendation.',
        'Not a prognosis predictor.',
        'Not a companion-diagnostic-grade biomarker call.',
        'Not a prescribing directive.',
        'Not real cases where the demo bundles are used — those are illustrative synthetic profiles.',
        'RUO — research use only.',
      ],
    },
    {
      id: 'engagement',
      label: 'How to engage',
      eyebrow: 'Block 7 · Engagement',
      headline: 'Bring a profile. Receive a case package.',
      iconKey: 'handshake',
      body: [
        'A first engagement is a research collaboration — the team brings a de-identified profile, CrisPRO returns a case package for review. Enterprise deployments with PHI handling are scoped separately with the governance layer included.',
      ],
      cta: { label: 'Contact CrisPRO', href: '/contact/' },
    },
  ],
};
