import type { VerticalPageData } from '@/components/audience/VerticalSurface';

// ==============================================================================
// /products/interception — page data (Worker 5, from W1 + W2 truth contracts)
// Source of truth: product_truth/INTERCEPTION_PRODUCT_TRUTH.json,
//   INTERCEPTION_WORKFLOW_MAP.csv, INTERCEPTION_DELIVERY_PACKAGES.json,
//   INTERCEPTION_INDUSTRY_BENCHMARKS.csv, PUBLIC_PRODUCT_CLAIM_LEDGER.csv
// Framing: evidence-loud + per-claim scope. RUO is a per-claim qualifier + footer,
//   never the headline voice. "Validated" only where a receipt earns it.
// Anchors below are ALL receipt-backed and ledger-approved. No blocked/quarantined
//   values appear (no MSK-MET 0.689, no AF3-pass-as-validation, no guaranteed-cut).
// ==============================================================================

export const INTERCEPTION_PAGE_DATA: VerticalPageData = {
  eyebrow: 'CrisPRO · Interception · Research Use Only',
  title: 'Interception: turn a metastasis hypothesis into a prioritized target-and-experiment package',
  subtitle:
    'Bring a metastatic biology question and a target universe. CrisPRO prioritizes targets for the relevant step of spread, generates CRISPR perturbation candidates, and delivers a traceable experimental package with a method-version tag on every stage.',
  sections: [
    {
      id: 'decision',
      label: 'Decision',
      eyebrow: 'Block 1 · The decision that changes',
      headline: 'What should we test first, for which metastatic step, with what perturbation?',
      iconKey: 'target',
      body: [
        'Metastasis programs start with a broad, ambiguous target universe. A team has to decide what to test first, for which metastatic step, with what perturbation design, and with which biological evidence — usually before any wet-lab capacity is committed.',
        'Interception changes that decision. It moves a team from "which biological driver may matter in this metastatic step?" to "which target and CRISPR perturbation should enter the next validation experiment, with a traceable rationale and a design-risk review."',
      ],
      bullets: [
        'Scopes the biology question to a specific metastatic step, not "cancer" in the abstract.',
        'Produces a ranked, decomposed rationale a reviewer can interrogate — not a black-box score.',
        'Ends at a wet-lab handoff bundle, not a claim that the experiment will succeed.',
      ],
    },
    {
      id: 'problem',
      label: 'Problem',
      eyebrow: 'Block 2 · Why the current workflow fails',
      headline: 'Weak preclinical target rationale is expensive downstream',
      iconKey: 'trending-up',
      body: [
        'Design-stage decisions are made with fragmented evidence, and the cost of a weak target rationale surfaces years later, in the clinic. The industry benchmarks below frame the pain — Interception intervenes upstream, at the target-and-perturbation design stage.',
        'These are sourced industry statistics, not CrisPRO outcomes. Interception\u2019s realized effect on any of them has not been measured in a controlled study.',
      ],
      metrics: [
        {
          label: 'Phase III oncology failure',
          value: '62.5% fail statistical significance',
          footnote: 'Gan et al. 2012, 253 Phase III RCTs. Industry benchmark; not a CrisPRO outcome.',
        },
        {
          label: 'Phase I \u2192 approval',
          value: '3.4% reach FDA approval',
          footnote: 'Wong, Siah & Lo 2018, 406,000+ trial entries. Interception\u2019s contribution is indirect and unmeasured.',
        },
        {
          label: 'Phase III terminations',
          value: '20.9% terminated (164 efficacy-driven)',
          footnote: 'ClinicalTrials.gov analysis May 2026, n=6,018. Causal link to design-stage rigor not measured.',
        },
      ],
    },
    {
      id: 'input',
      label: 'Input',
      eyebrow: 'Block 3 · What the customer brings',
      headline: 'A metastatic biology question and a target universe',
      iconKey: 'clipboard-list',
      body: [
        'Interception intake is a cancer type, a metastatic step of interest, and an optional candidate target list. From there the shared intelligence layer builds the cascade context and the ranked target space.',
      ],
      bullets: [
        'Cancer type and the specific metastatic step (e.g. extravasation, colonization).',
        'Optional candidate target list, or let the target-universe curation propose one.',
        'A prioritized target set (from a prior Target Mission Assessment) when entering at the perturbation-design stage.',
      ],
    },
    {
      id: 'workflow',
      label: 'Workflow',
      eyebrow: 'Block 4 · What CrisPRO does',
      headline: 'Ten traceable stages from hypothesis to wet-lab handoff',
      iconKey: 'git-branch',
      body: [
        'The workflow runs ten stages: metastasis-step hypothesis, target-universe selection, target prioritization (Target Lock), sequence-context signals, guide generation, guide efficacy and off-target assessment, mission fit, structural receipt, experiment handoff, and a wet-lab validation roadmap.',
        'Two non-interchangeable pipelines exist and are never silently merged. The publication pipeline and the brain-met evo2-e2e pipeline differ in target-universe counts, cascade steps, scoring weights, off-target method, and structural scoring. Every off-target claim carries a method-version tag so you always know which pipeline produced it.',
      ],
      bullets: [
        'Target prioritization returns a ranked report with signal decomposition and cited anchors \u2014 the human decides advancement; rank is not validated target discovery.',
        'Sequence-context signal per target region is derived via Evo2 \u2014 a research signal, not a clinical pathogenicity diagnosis.',
        'Off-target: Doench-2016 CFD (validated AUC 0.81, Doench 2016 Fig 2) on the brain-met path; POC uniform-mismatch estimator on the publication path until CFD is ported \u2014 method-version tag mandatory.',
      ],
    },
    {
      id: 'output',
      label: 'Output',
      eyebrow: 'Block 5 · What the customer receives',
      headline: 'A ranked target-and-guide package with receipts on every stage',
      iconKey: 'clipboard-check',
      body: [
        'The deliverable is a traceable experiment handoff bundle: ranked targets with signal decomposition, ranked spacer sets with on-target features, an off-target risk profile, an AlphaFold3 pre-synthesis structural receipt, and a mission-fit score \u2014 each stage method-version tagged.',
      ],
      metrics: [
        {
          label: 'Off-target (brain-met path)',
          value: 'Doench-2016 CFD, AUC 0.81',
          footnote: 'off_target_cfd.py; validated per Doench 2016 Fig 2. Not comprehensive genomic safety certification.',
        },
        {
          label: 'Structural receipt',
          value: 'AF3 RNA-DNA-calibrated, model 0',
          footnote: 'parse_results.py; Abramson 2024 nucleic-acid iPTM ranges. Pre-synthesis receipt \u2014 not experimental validation, not activity prediction.',
        },
        {
          label: 'Mission fit',
          value: 'Integrated rank + guide + off-target',
          footnote: 'W1 stage 7. A design-confidence score, not a wet-lab success prediction.',
        },
      ],
      bullets: [
        'Ranked spacer set per target with on-target features and rationale \u2014 not a guarantee any guide cuts in the wet lab.',
        'Full traceable handoff package with a method-version tag on every stage \u2014 the handoff is the design; the wet-lab result is separate.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Block 6 · Receipts and scope',
      headline: 'What is proven, and what remains wet-lab work',
      iconKey: 'shield',
      body: [
        'Every capability above traces to committed code and a public claim-ledger row. The boundaries are explicit and non-negotiable: the AF3 gate is a pre-synthesis structural receipt, not experimental validation; the off-target score is a design-risk review, not genomic safety certification; the target rank is a mission-prioritized hypothesis, not validated target discovery.',
        'Research Use Only. Enformer is gated off in production, only AF3 model 0 is reported, several stress tests remain incomplete, and external clinical-cohort validation has not been done.',
      ],
      caseStudies: [
        {
          href: '/ledger',
          title: 'Public claim ledger',
          summary: 'Every Interception claim, its evidence receipt, grade, and required qualifier.',
          keyMetric: 'Grades A\u2013B \u00b7 receipt per row',
        },
        {
          href: '/metastasis-interception',
          title: 'Interception capability detail',
          summary: 'The underlying metastasis-interception capability surface and cascade mapping.',
          keyMetric: '10-stage workflow',
        },
      ],
    },
    {
      id: 'engagement',
      label: 'Engagement',
      eyebrow: 'Block 7 · A first partner engagement',
      headline: 'Three delivery packages, scoped by decision',
      iconKey: 'handshake',
      body: [
        'A first engagement picks the package that matches the decision on the table. Each package carries its own explicit prohibited-scope statement.',
      ],
      bullets: [
        'Target Mission Assessment \u2014 which metastasis vulnerability should be investigated first? Cascade brief + ranked target report + open-questions log. Weeks. Wet-lab and trial strategy excluded.',
        'Target-to-Perturbation Package \u2014 which target and guide designs enter the next experiment? Ranked spacers + off-target profile + AF3 receipt + mission-fit + handoff bundle. Days per target set (AF3 turnaround-bound). Not a cut guarantee; not structural validation.',
        'Validation Design Package \u2014 which experiments de-risk the hypothesis? Screen design + powering sketches + unknowns log. Weeks. CrisPRO does not run the experiment.',
      ],
      cta: {
        label: 'Read the public ledger',
        href: '/ledger',
        helper: 'Every claim on this page is backed by a ledger row with a receipt.',
      },
    },
  ],
};
