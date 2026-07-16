import type { VerticalPageData } from '@/components/audience/VerticalSurface';

// ==============================================================================
// /products/insilico-trials — page data (Worker 5, from W3 truth contract)
// Source of truth: product_truth/INSILICO_TRIALS_PRODUCT_TRUTH.json,
//   INSILICO_TRIALS_WORKFLOW_MAP.csv, INSILICO_TRIALS_DELIVERABLES.csv,
//   PUBLIC_PRODUCT_CLAIM_LEDGER.csv
// Framing: evidence-loud + per-claim scope. Trial-fit is a mechanism-alignment
//   score, NEVER responder/enrollment/outcome prediction (mandatory qualifier).
// BreAK CRC-001 = 0.6944 (0.7375 is RETIRED and BLOCKED). No MSK-MET 0.689.
//   No LATIFY deltas. No DL-07 0.983. No PATH B. "Validated" only where a receipt
//   earns it (BRIEF-1/-4 CRISPR-validated with FDR receipts).
// ==============================================================================

export const INSILICO_TRIALS_PAGE_DATA: VerticalPageData = {
  eyebrow: 'CrisPRO · In-Silico Trials · Research Use Only',
  title: 'In-Silico Trials: pressure-test a clinical-development hypothesis before protocol lock',
  subtitle:
    'Bring an asset, an intended population, and a development question. CrisPRO combines mechanism fit, biomarker logic, trial and comparator evidence, resistance liabilities, and unresolved gaps into a structured program decision package.',
  sections: [
    {
      id: 'decision',
      label: 'Decision',
      eyebrow: 'Block 1 · The decision that changes',
      headline: 'Which population, mechanism, comparator, and protocol strategy fit this asset?',
      iconKey: 'target',
      body: [
        'A team can understand a drug\u2019s target and still lack a defensible answer to: which molecular population fits the mechanism, what resistance context undermines it, what historical trial lessons matter, and what must be proven before protocol lock.',
        'In-Silico Trials changes the protocol-strategy decision. It turns an asset-and-population hypothesis into a trial-readiness package that a program team can pressure-test before committing a protocol.',
      ],
      bullets: [
        'Aligns the asset to a mechanism representation the team can interrogate axis by axis.',
        'Surfaces the failure modes that sink programs: mechanism mismatch, population mismatch, resistance context, comparator issue.',
        'Ends at an evidence-tiered decision package \u2014 the Go/No-Go stays with the team.',
      ],
    },
    {
      id: 'problem',
      label: 'Problem',
      eyebrow: 'Block 2 · Why the current workflow fails',
      headline: 'Trial strategy is decided without a mechanism-aligned evidence base',
      iconKey: 'trending-up',
      body: [
        'Population selection, comparator choice, and resistance planning are often made from siloed evidence and institutional memory. Historical trials that carry the relevant lesson are not decoded into a comparable representation, so the same mechanism/population mismatches recur.',
        'In-Silico Trials assembles that evidence base into one comparable space \u2014 decoded historical trials, mechanism alignment, biomarker gates, resistance routes, comparator context, and named gaps.',
      ],
      metrics: [
        {
          label: 'Trial evidence decoded',
          value: '42 trials across 7 programs',
          footnote: 'crispro_master_pipeline.json meta.total_trials_decoded. Decoded historical evidence, not prospective prediction.',
        },
        {
          label: 'Mechanism representation',
          value: '8D vector, PATH A locked',
          footnote: 'canonical_vectors.py; PATH A fit = clip((p\u00b7t)/\u2016t\u2016\u2082, 0, 1), locked 2026-04-28. Not a validated causal model.',
        },
        {
          label: 'Program dossiers',
          value: 'BRIEF assets, evidence-tiered',
          footnote: 'BRIEF-1..4 with committed deltas + FDR receipts. Not deal-readiness certification.',
        },
      ],
    },
    {
      id: 'input',
      label: 'Input',
      eyebrow: 'Block 3 · What the customer brings',
      headline: 'An asset, an intended population, and a development question',
      iconKey: 'clipboard-list',
      body: [
        'Intake is the asset (mechanism, target, chemistry or biologic), the intended disease and population hypothesis, and the development question \u2014 Go/No-Go, population refinement, comparator selection, or cohort logic.',
      ],
      bullets: [
        'Asset mechanism / target / modality.',
        'Intended disease + population hypothesis.',
        'The specific development question the package must answer.',
      ],
    },
    {
      id: 'workflow',
      label: 'Workflow',
      eyebrow: 'Block 4 · What CrisPRO does',
      headline: 'Seven stages from asset intake to program decision package',
      iconKey: 'git-branch',
      body: [
        'The workflow runs seven stages: asset intake, mechanism and vulnerability map, trial and comparator decode, cohort and biomarker logic, resistance/escape mapping, PGx/exposure review, and the assembled program decision package.',
        'The trial and comparator decode ranks decoded trials by mechanism alignment using the locked PATH A formula. This is a mechanism-alignment score \u2014 it is not a probability of trial success, and it is not responder, enrollment, or outcome prediction.',
      ],
      bullets: [
        'Mechanism map: 8D axes (DDR/MAPK/PI3K/VEGF/HER2/IO/EFFLUX/RSS) with weights, SL candidate list with evidence tiers, pathway anchors \u2014 SL hits are hypotheses, not proven therapeutic facts.',
        'Cohort logic: a two-gate framework (molecular gate + biological-alignment gate) proposed as strategy \u2014 not a validated companion diagnostic.',
        'Resistance: EscapeMap-style routes with per-route evidence tier and a test plan \u2014 not individual-patient escape prediction.',
      ],
    },
    {
      id: 'output',
      label: 'Output',
      eyebrow: 'Block 5 · What the customer receives',
      headline: 'Evidence-tiered deliverables with receipts and named quarantines',
      iconKey: 'clipboard-check',
      body: [
        'Outputs package existing work into five customer deliverables: Trial Failure Decode, Cohort Strategy Package, Trial Landscape Compass, Program Asset Brief (BRIEF), and PGx / Exposure Review. Every claim carries an evidence tier; substrate under governance hold is named as quarantined.',
        'Two BRIEF programs carry receipt-specific validation: BRIEF-1 (ZEB1 \u2192 ITGAV) and BRIEF-4 (SPP1 \u2192 NRF2) are CRISPR-validated with FDR receipts. That is a specific receipt \u2014 not a platform-level validation claim.',
      ],
      metrics: [
        {
          label: 'BRIEF-1 (CRISPR-validated)',
          value: 'delta \u22120.7184, FDR 0.001203',
          footnote: 'Trial ledger. Receipt-specific validation for this program only; DEAL_READY status is a hypothesis grade, not certification.',
        },
        {
          label: 'BRIEF-4 (CRISPR-validated)',
          value: 'delta \u22120.7326, FDR 8\u00d710\u207b\u2076',
          footnote: 'Trial ledger. CRISPR-validated but DRUG_GAP \u2014 a computational lead, no matched drug.',
        },
        {
          label: 'CO.26 external anchor',
          value: 'pTMB\u226528 OS HR 0.34',
          footnote: 'Loree, Clin Cancer Res 2024 (PMID 38727700), 90% CI 0.18\u20130.63, p=0.022. Published external stat; liver-met PFS HR 1.39 (harmful) is the paired caveat.',
        },
      ],
      bullets: [
        'Trial Landscape Compass: ranked mechanism-relevant trials + comparator dossier + failure-mode decode. Fit is a mechanism-alignment score, not a probability of trial success.',
        'Cohort Strategy Package: e.g. SAR445953 Gate 1 = CEACAM5 IHC \u226580% (~28% of MSS mCRC, ~3,700 pts/yr US) + IO-permissiveness gate \u2014 a proposal to validate, not a companion diagnostic.',
        'PGx / Exposure Review: CPIC-aligned evidence with confidence tiers and explicit no-rule gaps \u2014 clinical prescribing authority stays with the team.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Block 6 · Receipts and scope',
      headline: 'What is proven, and what stays outside the promise',
      iconKey: 'shield',
      body: [
        'Anchors trace to committed code, canonical KB, or a receipt-locked JSON. The BreAK CRC-001 mechanism-fit is 0.6944 (MODERATE-HIGH band) \u2014 an earlier interim value was retired under governance 2026-07-05 and is not shipped anywhere.',
        'Research Use Only. In-Silico Trials does not establish validated responder prediction, trial-success prediction, clinical treatment selection, or causal efficacy prediction. Trial decoding is offered as a mechanistic hypothesis and evidence synthesis \u2014 not proven responder identification.',
      ],
      metrics: [
        {
          label: 'BreAK CRC-001 mechanism-fit',
          value: '0.6944 (MODERATE-HIGH)',
          footnote: 'canonical_vectors.py: dot=0.6250, norm=0.9000. The earlier interim value is retired and blocked.',
        },
        {
          label: 'Practical 8D ceiling',
          value: '0.8898',
          footnote: '\u2016p_ref\u2016\u2082 constraint. No fit above this is claimed without recomputing the reference norm.',
        },
      ],
      caseStudies: [
        {
          href: '/ledger',
          title: 'Public claim ledger',
          summary: 'Every In-Silico Trials claim with its receipt, grade, and mandatory qualifier.',
          keyMetric: 'Grades B\u2013C \u00b7 receipt per row',
        },
        {
          href: '/insilico',
          title: 'In-Silico capability detail',
          summary: 'The underlying mechanism-alignment and trial-decode capability surface.',
          keyMetric: '10 shippable CAPs',
        },
      ],
    },
    {
      id: 'engagement',
      label: 'Engagement',
      eyebrow: 'Block 7 · A first partner engagement',
      headline: 'Five deliverables, scoped to the development question',
      iconKey: 'handshake',
      body: [
        'A first engagement selects the deliverable that matches the decision. Each ships with its framing and required qualifier.',
      ],
      bullets: [
        'Trial Failure Decode \u2014 why a prior program may have mismatched mechanism, population, resistance state, or comparator. A hypothesized failure axis, not a proven causal explanation.',
        'Cohort Strategy Package \u2014 proposed biomarker/cohort logic + validation plan. A strategy proposal, not a companion diagnostic.',
        'Trial Landscape Compass \u2014 ranked mechanism-relevant trials + comparators. Mechanism-alignment ranking, not enrollment or outcome prediction.',
        'Program Asset Brief (BRIEF) \u2014 evidence-tiered dossier for BD, translational, and clinical-development review. Not deal-readiness certification.',
        'PGx / Exposure Review \u2014 evidence-based exposure/safety constraints where validated rules exist. Evidence surfacing, not prescribing authority.',
      ],
      cta: {
        label: 'Read the public ledger',
        href: '/ledger',
        helper: 'Trial-fit is a mechanism-alignment score \u2014 not an outcome or enrollment probability.',
      },
    },
  ],
};
