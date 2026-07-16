// ==============================================================================
// /products/interception/ — CrisPRO Interception (Target-and-guide development
// workspace for metastasis programs). Truth-contract-driven; RUO.
//
// Generated 2026-07-16 from W1_interception/INTERCEPTION_PRODUCT_TRUTH.json
// + W2_buyer_map/INTERCEPTION_DELIVERY_PACKAGES.json. Every claim on this page
// is grade A/B in the PUBLIC_PRODUCT_CLAIM_LEDGER; nothing shippable-forbidden.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const INTERCEPTION_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · Interception · RUO',
  title: 'Turn a metastasis hypothesis into a target-and-experiment package.',
  subtitle:
    'Interception moves your program from "which biological driver may matter in this metastatic step?" to "which target and CRISPR perturbation should enter the next validation experiment, with a traceable rationale and pre-synthesis design-risk receipt."',
  sections: [
    {
      id: 'decision',
      label: 'The decision',
      eyebrow: 'Block 1 · Decision',
      headline: 'What we test next — before synthesis capacity is committed.',
      iconKey: 'target',
      body: [
        'Metastasis R&D teams face a target universe that is broad, uneven, and expensive to explore. The question that gates every wet-lab quarter is not "what is possible" but "what is best supported for the specific metastatic step we care about, and what perturbation design gets us the cleanest read?"',
        'Interception is the surface that answers that question. It turns a stated metastasis-step biology question into a ranked target report, a pre-synthesis guide set, an off-target risk record, an AlphaFold3 pre-synthesis structural receipt, and a mission-fit shortlist. The customer decides what to synthesize. Interception makes that decision defensible.',
      ],
      bullets: [
        'For translational oncology, target-discovery, functional-genomics, comp-bio, program leads, and external wet-lab partners.',
        'Delivered as three commercial packages: Target Mission Assessment, Target-to-Perturbation Package, Validation Design Package.',
        'Every stage tagged with method version — publication-pipeline (POC uniform mismatch) vs brain-met evo2-e2e (Doench 2016 CFD).',
      ],
      cta: { label: 'See the workflow', href: '#workflow' },
    },
    {
      id: 'problem',
      label: 'The problem',
      eyebrow: 'Block 2 · Problem',
      headline: 'The current workflow burns wet-lab capacity on guides that were triable pre-synthesis.',
      iconKey: 'clipboard-list',
      body: [
        'Target-discovery calls happen at committee, on inconsistent signal weightings, without step-specific cascade context. Guide-design portals score on-target features but rarely fold the guide-DNA complex in advance. Off-target scoring runs on a mix of methods — some old, some validated, rarely reconciled inside one program.',
        'The result: guides get synthesized that gross-fold, that clash at the interface, that hit obvious off-target sites — burning synthesis and transfection capacity that could have been triaged out on a laptop.',
        'The industry backdrop reinforces the stakes. Only 3.4% of oncology assets reach FDA approval starting from Phase I (Wong, Siah & Lo 2018, 406,000+ trial entries), and 20.9% of Phase III oncology trials are terminated for accrual, efficacy, or business reasons (ClinicalTrials.gov May 2026, n=6,018 trials; 164 efficacy-driven terminations). Interception targets the design stage upstream of trials — the realized effect on trial attrition has not been measured in a controlled study.',
      ],
      bullets: [
        'Committee-noise on target prioritization; no reproducible decomposition.',
        'Guide portals rank on-target features but skip pre-synthesis structural triage.',
        'Off-target scoring inconsistent across programs — POC estimators still in use in some services.',
        'AF3 exists but must be run with RNA-DNA-calibrated gates, not protein-standard thresholds — most teams do not do this.',
      ],
    },
    {
      id: 'input',
      label: 'What you bring',
      eyebrow: 'Block 3 · Input',
      headline: 'A metastatic step, a cancer type, and (optionally) a candidate universe.',
      iconKey: 'clipboard-check',
      body: [
        'You bring the biological question. Interception does the rest — but only after you have named what the question is.',
      ],
      bullets: [
        'Cancer type + metastatic step (invasion, intravasation, dormancy, colonization).',
        'Intent — basic-biology probe or perturbation-ready screen.',
        'Optional: your own candidate gene list.',
        'Otherwise: Interception uses the version-tagged universe (publication-38 or brain-met evo2-e2e) matched to the step.',
      ],
    },
    {
      id: 'workflow',
      label: 'What CrisPRO does',
      eyebrow: 'Block 4 · Workflow',
      headline: 'Ten stages, each with method version tags.',
      iconKey: 'git-branch',
      body: [
        '1. Metastasis-step hypothesis — cascade context brief, canonical pathways, unknowns.',
        '2. Target universe selection — version-stamped (publication-38 vs brain-met evo2-e2e); no silent mixing.',
        '3. Target prioritization (Target Lock) — ranked, decomposed report with cited signal contributions.',
        '4. Sequence/variant signal (Evo2) — sequence-context trace per target region.',
        '5. Guide generation — ranked spacers with on-target features + design rationale.',
        '6. Off-target safety scoring — Doench 2016 CFD on brain-met path (validated AUC 0.81); POC estimator on publication path (CFD port pending). Method version tagged per guide.',
        '7. Mission-fit scoring — integrates target rank + guide quality + off-target + mission alignment.',
        '8. AlphaFold3 structural receipt — RNA-DNA-calibrated gates (pLDDT ≥ 50, iPTM ≥ 0.30, disorder < 0.5, no clash) declared by CrisPRO. Model 0 reported. Not a claim of activity.',
        '9. Experiment handoff — full traceable bundle for the wet-lab queue.',
        '10. Validation design roadmap — recommended screen, controls, readouts, open questions.',
      ],
      cta: { label: 'Open the full workflow map', href: '/products/interception/workflow-map' },
    },
    {
      id: 'output',
      label: 'What you receive',
      eyebrow: 'Block 5 · Output',
      headline: 'Three commercial packages.',
      iconKey: 'layers',
      body: [
        'Interception ships in three shapes. Buy one; combine two; sequence all three.',
      ],
      caseStudies: [
        { slug: 'target-mission-assessment', title: 'Target Mission Assessment', summary: 'Which metastasis vulnerability should be investigated first? Delivers: Cascade-context brief (canonical biology, published anchors, unknowns).; Ranked target report with signal decomposition.; Open-questions log..' },
        { slug: 'target-to-perturbation', title: 'Target-to-Perturbation Package', summary: 'Which target and guide designs should enter the next experiment? Delivers: Ranked spacer set per target with method-version tags.; Off-target risk profile (CFD-Doench-2016 where available).; AF3 pre-synthesis structural receipt (RNA-DNA-calibrated, model 0).; Mission-fit score per guide.; Handoff bundle ready for the wet-lab queue..' },
      ],
      bullets: [
        'Validation Design Package: Which experiments must be run to de-risk the hypothesis?',
        'Every output artifact tagged with method version and evidence tier.',
        'Handoff bundle enters the wet-lab queue with a full provenance trace.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Block 6 · Proof & limits',
      headline: 'Receipts we can show, boundaries we do not cross.',
      iconKey: 'shield',
      body: [
        'AlphaFold3 pre-synthesis structural receipts have been generated for the 15-guide POC cohort. Under RNA-DNA-calibrated gates (declared by the manuscript authors, not AlphaFold authors) 15 of 15 guides pass structural triage; under protein-standard iPTM ≥ 0.5 none pass. That distinction is the receipt — RNA-DNA folds do not carry the same iPTM ceiling as protein complexes, and the manuscript declares its calibration explicitly.',
        'Off-target scoring on the brain-met pipeline uses Doench 2016 CFD with per-position mismatch weighting and PAM-specific penalties. Doench 2016 reports CFD AUC 0.81 vs MIT 0.73 vs simple 0.64 in the paper Figure 2. The publication pipeline currently uses a POC uniform-mismatch estimator — the CFD port is pending. Every guide receipt names which method scored it.',
      ],
      bullets: [
        'Not a wet-lab result. AF3 does not validate cutting activity.',
        'Not validated target discovery. Target rank is a starting point.',
        'Not comprehensive genomic safety certification. Off-target scoring is context, not proof of clinical safety.',
        'Not a variant diagnostic. Evo2 signal is sequence context, not pathogenicity.',
        'Not clinical decision support.',
        'External clinical-cohort validation of the Interception pipeline has not been done.',
        'RUO — research use only.',
      ],
    },
    {
      id: 'engagement',
      label: 'How to engage',
      eyebrow: 'Block 7 · Engagement',
      headline: 'Bring a mission. Receive a package.',
      iconKey: 'handshake',
      body: [
        'A first engagement starts with a mission brief — cancer type, metastatic step, biological question. Interception returns a package (assessment, perturbation-ready set, or validation design) scoped in the engagement letter. Turnaround is method-bound: AF3 receipts are AF3-turnaround-limited; off-target scoring is real-time on the brain-met path; universe/target ranking is delivered within the scoping window.',
        'For programs already at design stage: bring your candidate list and skip stages 1–3.',
      ],
      cta: { label: 'Contact CrisPRO', href: '/contact/' },
    },
  ],
};
