// ==============================================================================
// /products/insilico-trials/ — CrisPRO In-Silico Trials (Program and trial-
// strategy workspace). Truth-contract-driven; RUO.
//
// Generated 2026-07-16 from W3_insilico_trials/INSILICO_TRIALS_PRODUCT_TRUTH.json.
// Every claim grade C or better; no prohibited claim ships.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const INSILICO_TRIALS_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · In-Silico Trials · RUO',
  title: 'Pressure-test a clinical-development hypothesis before protocol lock.',
  subtitle:
    'In-Silico Trials turns an asset-and-population hypothesis into a trial-readiness package. It combines decoded trial evidence, mechanism alignment, biomarker gates, resistance/escape analysis, comparator context, and known gaps — so your team can pressure-test a development strategy before it enrolls the first patient.',
  sections: [
    {
      id: 'decision',
      label: 'The decision',
      eyebrow: 'Block 1 · Decision',
      headline: 'Go / No-Go, population refinement, comparator choice — with a defensible mechanism-alignment argument.',
      iconKey: 'clipboard-check',
      body: [
        'Development teams can understand a drug\'s target and still lack a defensible answer to: which molecular population fits the mechanism, what resistance context undermines it, what historical trial lessons apply, and what needs to be proven before protocol lock. In-Silico Trials is the surface that assembles those answers into a program decision package.',
        'The team keeps the decision. In-Silico Trials makes the argument reviewable.',
      ],
      bullets: [
        'For BD, translational, and clinical-development leads on assets approaching Phase I / IIa / III design lock.',
        'Ships five deliverables — Trial Failure Decode, Cohort Strategy Package, Trial Landscape Compass, Program Asset Brief (BRIEF), PGx / Exposure Review.',
        'Every claim carries an evidence tier; every quarantine is named.',
      ],
      cta: { label: 'See the deliverables', href: '#output' },
    },
    {
      id: 'problem',
      label: 'The problem',
      eyebrow: 'Block 2 · Problem',
      headline: 'The industry evidence for design-stage pain is unambiguous.',
      iconKey: 'clipboard-list',
      body: [
        'The design-stage failure modes for oncology programs are well documented. Gan et al. 2012 analyzed 253 Phase III oncology RCTs and found 62.5% did not meet primary endpoint. Wong, Siah & Lo 2018, working across 406,000+ trial entries, put Phase I → FDA approval probability at 3.4%. A May 2026 ClinicalTrials.gov analysis (n=6,018) found 20.9% of Phase III oncology trials terminate — 164 for efficacy, 239 for accrual, 104 for business reasons.',
        'The root cause named across the literature is mechanism / population mismatch — a drug operates on a target present in a subset of enrolled patients, and the ITT response rate collapses regardless of the drug\'s actual activity in the aligned subgroup.',
        'In-Silico Trials assembles the argument to catch that mismatch before protocol lock. It does not predict trial outcomes, and its realized impact on trial-success rates has not been measured in a controlled study.',
      ],
      bullets: [
        '62.5% Phase III oncology RCTs miss endpoint (Gan et al. 2012, n=253).',
        '3.4% Phase I → FDA approval probability (Wong, Siah & Lo 2018, 406,000+ trial entries).',
        '20.9% Phase III oncology terminated; 164 for efficacy alone (ClinicalTrials.gov May 2026, n=6,018).',
      ],
    },
    {
      id: 'input',
      label: 'What you bring',
      eyebrow: 'Block 3 · Input',
      headline: 'An asset, an intended population, and a development question.',
      iconKey: 'target',
      body: [
        'You bring the asset. In-Silico Trials builds the mechanism vector, decodes the trial landscape, and pressure-tests the population strategy.',
      ],
      bullets: [
        'Asset: mechanism, target, chemistry / biologic modality.',
        'Intended disease + population hypothesis (biomarker, histology, prior-line strategy).',
        'Development question: Go/No-Go, cohort refinement, comparator choice, biomarker validation plan.',
      ],
    },
    {
      id: 'workflow',
      label: 'What CrisPRO does',
      eyebrow: 'Block 4 · Workflow',
      headline: 'Seven stages, from asset intake to program decision package.',
      iconKey: 'git-branch',
      body: [
        '1. Asset + intended disease/population intake — canonical dossier with mechanism vector.',
        '2. Mechanism and vulnerability map — 8D mechanism representation (DDR/MAPK/PI3K/VEGF/HER2/IO/EFFLUX/RSS) + SL candidates + pathway anchors.',
        '3. Trial and comparator decode — mechanism-alignment ranking via PATH A fit; failure-mode decomposition (mechanism / population / resistance / comparator).',
        '4. Cohort strategy and biomarker logic — proposed two-gate framework (molecular + biological alignment).',
        '5. Resistance / escape mapping — plausible escape routes with evidence tier and test-plan proposal.',
        '6. PGx / exposure / safety review — evidence surfacing where validated data exists; explicit no-rule gaps. Not prescribing authority.',
        '7. Program decision package (BRIEF) — evidence-tiered dossier for BD / translational / clinical-development review.',
      ],
    },
    {
      id: 'output',
      label: 'What you receive',
      eyebrow: 'Block 5 · Output',
      headline: 'Five customer deliverables.',
      iconKey: 'layers',
      body: [
        'Each deliverable ships as a versioned artifact with an evidence tier tagged on every claim.',
      ],
      caseStudies: [
        { slug: 'trial-failure-decode', title: 'Trial Failure Decode', summary: 'Why a prior program may have mismatched mechanism, population, resistance state, or comparator. Delivered as a hypothesized failure axis, not a proven causal explanation.' },
        { slug: 'brief-dossier', title: 'Program Asset Brief (BRIEF)', summary: 'Evidence-tiered hypothesis dossier for BD, translational, and clinical-development review. Every claim tagged; every quarantine named.' },
      ],
      bullets: [
        'Cohort Strategy Package — proposed biomarker/cohort logic and what must be validated. Not a validated companion diagnostic.',
        'Trial Landscape Compass — ranked mechanism-relevant trial and comparator landscape. Fit is a mechanism-alignment score; not an enrollment prediction and not an outcome prediction.',
        'PGx / Exposure Review — evidence surfacing on exposure and safety. Not prescribing authority; that stays with the clinical team.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof & limits',
      eyebrow: 'Block 6 · Proof & limits',
      headline: 'The receipts we can show, and the framing we do not cross.',
      iconKey: 'shield',
      body: [
        'The ranker uses the PATH A canonical formula fit = clip((p·t) / ‖t‖₂, 0, 1), signed and locked 2026-04-28. The competing formula path is permanently prohibited.',
        'The trial ledger currently spans 7 programs and 42 decoded trials with vectorized outcomes and design context. The BRIEF assets have committed deltas and FDR receipts across the anchor set.',
        'What we do not claim: this is not a responder prediction service, not an enrollment prediction, not an outcome prediction, not a validated companion diagnostic, not deal-readiness certification, not prescribing authority.',
      ],
      bullets: [
        'Trial Failure Decode is a hypothesized failure axis, not a proven causal explanation.',
        'Trial-fit is a mechanism-alignment score. It is not a probability of trial success.',
        'Cohort strategy is a proposal. Companion-diagnostic validation is a separate program.',
        'PGx surface is evidence surfacing. Not prescribing authority; that stays with the clinical team.',
        'Quarantines currently governing this product: DL-07 DDR 0.983 (implausibly high; publication-blocking), LATIFY delta (vector-version conflict), PC-02 retroactive prediction (permanently downgraded).',
        'RUO — research use only.',
      ],
    },
    {
      id: 'engagement',
      label: 'How to engage',
      eyebrow: 'Block 7 · Engagement',
      headline: 'Send an asset. Receive a program decision package.',
      iconKey: 'handshake',
      body: [
        'A first engagement starts with an asset dossier — mechanism, target, intended disease, development question. In-Silico Trials returns a deliverable scoped in the engagement letter. Turnaround is scoped by depth: Trial Failure Decode ships within the scoping window; the full BRIEF is scoped as a multi-week program.',
      ],
      cta: { label: 'Contact CrisPRO', href: '/contact/' },
    },
  ],
};
