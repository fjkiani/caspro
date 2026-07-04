/**
 * Deep-dive content for the 7 platform capability pages.
 *
 * Every entry in `outcomes` has `illustrative: true`, meaning the numbers
 * shown are TARGETS or DIRECTIONAL descriptors — not measured, published,
 * peer-reviewed results. The /platform/{slug} page renders an amber badge
 * and disclosure paragraph making that explicit, and links out to
 * /evidence + /metrics for the numbers that ARE measured.
 *
 * Do NOT quietly flip an `illustrative` flag from true to false without
 * pointing at a published measurement in unifiedEvidenceData or a linked
 * evidence page.
 */

export interface CapabilityDeepDiveContent {
  slug: string;
  title: string;
  tagline: string;
  audience: string;
  intro: string;
  howItWorks: { heading: string; body: string }[];
  outcomes: {
    metric: string;
    value: string;
    note?: string;
    illustrative?: boolean;
  }[];
  useCases: { headline: string; body: string }[];
  faq: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string; blurb: string }[];
  ctaLabel: string;
  ctaHref: string;
  featureList: string[];
}

export const CAPABILITY_DEEP_DIVES: CapabilityDeepDiveContent[] = [
  {
    slug: 'agentic-emr',
    title: 'AgenticEMR: intelligent clinical data ingestion',
    tagline:
      'Convert unstructured EMR content into a structured, decision-ready oncology briefing.',
    audience: 'Clinical oncologists, tumor board coordinators, precision-medicine leads',
    intro:
      'AgenticEMR is the CrisPRO Co-Pilot component that turns messy EMR content — clinical notes, pathology PDFs, imaging reports, sequencing summaries — into a structured, queryable case profile. It is designed to be the last hop between the chart and the tumor board: reviewers see the same picture the algorithms see.',
    howItWorks: [
      {
        heading: 'Ingest',
        body:
          'Pull PDFs, notes, pathology reports, and structured sequencing outputs from the EMR. All content is normalized to a per-patient profile with source pointers.',
      },
      {
        heading: 'Extract',
        body:
          'Named-entity extraction pulls diagnoses, drugs, dose histories, adverse events, biomarkers, and dates. Every extracted field carries a citation back to the source line.',
      },
      {
        heading: 'Reconcile',
        body:
          'Cross-source reconciliation flags contradictions (e.g. a pathology note that disagrees with the sequencing report) and surfaces them for reviewer arbitration.',
      },
      {
        heading: 'Publish',
        body:
          'Push a structured patient profile downstream to Oracle, Forge, and Scribe. Every downstream call carries the profile version + run_id.',
      },
    ],
    outcomes: [
      {
        metric: 'Chart-to-briefing turnaround',
        value: '6 hrs → 12 min',
        note: 'target for new-patient work-up',
        illustrative: true,
      },
      {
        metric: 'Trial-eligibility matches surfaced',
        value: '3.4×',
        note: 'target uplift versus keyword-based matching',
        illustrative: true,
      },
      {
        metric: 'Structured-field coverage',
        value: '92%',
        note: 'target coverage of the standard oncology briefing schema',
        illustrative: true,
      },
    ],
    useCases: [
      {
        headline: 'New-patient work-up',
        body:
          'On intake, AgenticEMR normalizes the referral packet, sequencing report, and prior chart notes into a single briefing so the reviewing oncologist walks in already knowing the case.',
      },
      {
        headline: 'Tumor board prep',
        body:
          'Coordinators generate a tumor-board dossier per patient in minutes rather than hours — the dossier is the same object Oracle and Forge use for their downstream calls, so the board reviews one artifact.',
      },
      {
        headline: 'Trial screening at scale',
        body:
          'Trial teams run the structured profile against active protocols, driving trial matches by biology instead of keyword search.',
      },
    ],
    faq: [
      {
        question: 'Does AgenticEMR replace my EMR?',
        answer:
          'No. It sits alongside the EMR as a normalization + briefing layer. The EMR remains the system of record for orders and documentation.',
      },
      {
        question: 'Is patient data used to train models?',
        answer:
          'No. AgenticEMR ingests per-tenant data and does not send PHI to any shared training loop. Oracle, Forge, and Scribe are used in inference-only mode.',
      },
      {
        question: 'How are extraction errors caught?',
        answer:
          'Every extracted field carries a source pointer. The reviewer UI shows the raw excerpt next to the extracted value, so mismatches are surfaced during dossier review, not after.',
      },
    ],
    relatedLinks: [
      { label: 'Oracle: variant interpretation', href: '/platform/oracle-intelligence', blurb: 'What AgenticEMR feeds when the case has a sequencing report.' },
      { label: 'Scribe: clinical narrative', href: '/platform/scribe-intelligence', blurb: 'How the structured briefing becomes a note the physician can sign.' },
      { label: 'Evidence tiers', href: '/evidence', blurb: 'How Supported / Consider / Insufficient tiers work across the Co-Pilot.' },
    ],
    ctaLabel: 'See AgenticEMR in a live demo',
    ctaHref: '/contact',
    featureList: [
      'Multi-source EMR ingestion (notes, pathology, imaging, sequencing)',
      'Named-entity extraction with source citations',
      'Cross-source contradiction detection',
      'Structured briefing schema shared with Oracle / Forge / Scribe',
      'Per-tenant, PHI-safe: inference-only, no shared training',
    ],
  },

  {
    slug: 'chemo',
    title: 'Chemo Co-Pilot: in-silico chemotherapy guidance',
    tagline:
      'Mechanism-aligned chemotherapy recommendations with an auditable evidence tier per option.',
    audience: 'Medical oncologists, tumor board leads',
    intro:
      'Chemo Co-Pilot ranks chemotherapy regimen options by mechanism alignment against the patient profile — not by keyword match to a guideline. Every option comes with an evidence tier, badges, and source citations so the reviewing oncologist can defend the choice at the board.',
    howItWorks: [
      {
        heading: 'Profile',
        body:
          'Pull the structured oncology briefing from AgenticEMR: tumor type, staging, biomarker panel, prior therapy, comorbidities, PGx.',
      },
      {
        heading: 'Rank',
        body:
          'Score candidate regimens against the profile using mechanism alignment (target ↔ variant / pathway state) and prior-line context.',
      },
      {
        heading: 'Tier',
        body:
          'Assign every candidate a Supported / Consider / Insufficient tier with badges (ClinVar-Strong, RCT, Guideline, Pathway-Aligned, Validated) and inline citations.',
      },
      {
        heading: 'Return',
        body:
          'Emit the ranked list as a dossier the reviewing oncologist can drop directly into the tumor-board packet.',
      },
    ],
    outcomes: [
      {
        metric: 'Confidence coverage per case',
        value: '70-85%',
        note: 'target confidence coverage across recommended regimens',
        illustrative: true,
      },
      {
        metric: 'Board-prep turnaround',
        value: '3 hrs → 20 min',
        note: 'target per patient',
        illustrative: true,
      },
      {
        metric: 'NCCN alignment on top recommendation',
        value: '91%',
        note: 'target NCCN alignment rate',
        illustrative: true,
      },
    ],
    useCases: [
      {
        headline: 'Second-line decision',
        body:
          'For a patient who progressed on first-line therapy, Chemo Co-Pilot ranks second-line regimens by residual mechanism vulnerabilities and prior-line context, not just line-of-therapy label.',
      },
      {
        headline: 'Rare tumor',
        body:
          'In rare tumors where guidelines are thin, mechanism alignment fills the gap: the recommendation is grounded in the target ↔ variant map, not in an absent RCT.',
      },
      {
        headline: 'Tumor board prep',
        body:
          'The Consider / Supported tiers give the presenter an explicit ranking that survives cross-examination — every claim has a citation and a run_id.',
      },
    ],
    faq: [
      {
        question: 'Does this replace NCCN?',
        answer:
          'No. Chemo Co-Pilot uses guidelines as an evidence badge, not as the ranking mechanism. NCCN-aligned regimens are labeled; non-guideline options carry a mechanism-alignment rationale.',
      },
      {
        question: 'How are contraindications handled?',
        answer:
          'Comorbidities and PGx from the AgenticEMR briefing are hard filters — a regimen that is contraindicated is not surfaced as a Supported option.',
      },
      {
        question: 'Is this a medical device?',
        answer:
          'No. Chemo Co-Pilot is research-use decision support. The reviewing oncologist owns the treatment decision.',
      },
    ],
    relatedLinks: [
      { label: 'Toxicity risk', href: '/platform/toxicity-risk', blurb: 'How PGx + comorbidity risk scoring interacts with the ranking.' },
      { label: 'Therapy fit', href: '/platform/therapy-fit', blurb: 'The regimen-fit engine that Chemo Co-Pilot delegates to.' },
      { label: 'Evidence tiers', href: '/evidence', blurb: 'What Supported / Consider / Insufficient actually mean.' },
    ],
    ctaLabel: 'Book a live Chemo Co-Pilot walkthrough',
    ctaHref: '/contact',
    featureList: [
      'Mechanism-aligned regimen ranking',
      'Evidence tier per option (Supported / Consider / Insufficient)',
      'Badges: Guideline, RCT, ClinVar-Strong, Pathway-Aligned, Validated',
      'PGx + comorbidity as hard filters',
      'Board-ready dossier export',
    ],
  },

  {
    slug: 'clinical-trials',
    title: 'Clinical trials matching: mechanism-first eligibility',
    tagline:
      'Match patients to trials by biology, not by keyword — including trial protocols the EMR would never surface.',
    audience: 'Trial coordinators, PIs, precision-medicine programs',
    intro:
      'Trial matching drops when the eligibility engine only sees the diagnosis code. CrisPRO reads the full patient profile — variant call, mechanism state, prior therapy, biomarker panel — against the active protocol library, so matches are grounded in the biology the trial actually cares about.',
    howItWorks: [
      {
        heading: 'Profile',
        body:
          'Pull the structured profile from AgenticEMR: variant calls, mechanism state (from Oracle), staging, prior therapy.',
      },
      {
        heading: 'Index',
        body:
          'Index the active trial library with structured eligibility criteria (targets, biomarker cutoffs, prior-line rules), not free-text keywords.',
      },
      {
        heading: 'Match',
        body:
          'Match profile against index using mechanism alignment plus hard eligibility filters. Rank by biological fit + trial accessibility.',
      },
      {
        heading: 'Return',
        body:
          'Emit a ranked shortlist with the specific eligibility criteria the patient matches — and the ones they miss — so the coordinator can screen faster.',
      },
    ],
    outcomes: [
      {
        metric: 'Trial matches surfaced per patient',
        value: '3.4×',
        note: 'target uplift versus a keyword-based matching pipeline',
        illustrative: true,
      },
      {
        metric: 'Time-to-shortlist',
        value: '2 wks → 3 days',
        note: 'target turnaround from referral to shortlist',
        illustrative: true,
      },
      {
        metric: 'Screen-fail rate',
        value: '−41%',
        note: 'target reduction in downstream screen-fail rate',
        illustrative: true,
      },
    ],
    useCases: [
      {
        headline: 'Community-oncology referral',
        body:
          'Community sites without a trial team get a structured shortlist for referral, so the patient reaches the trial site with a match already justified.',
      },
      {
        headline: 'Rare-mutation carrier',
        body:
          'Patients with rare drivers get matched to targeted trials by mechanism, even when the diagnosis code alone would not surface them.',
      },
      {
        headline: 'Post-progression rescue',
        body:
          'After progression on a targeted therapy, the residual mechanism state is used to re-rank trials by biological rationale for the next line.',
      },
    ],
    faq: [
      {
        question: 'Which trial database do you use?',
        answer:
          'ClinicalTrials.gov as the base index, plus per-tenant private feeds where partners run their own protocols.',
      },
      {
        question: 'How current is the index?',
        answer:
          'Refreshed nightly from the public ClinicalTrials.gov feed; per-tenant private feeds refresh on the partner’s cadence.',
      },
      {
        question: 'Do you contact patients?',
        answer:
          'No — CrisPRO produces a shortlist for the coordinator. Patient outreach is a human step owned by the site.',
      },
    ],
    relatedLinks: [
      { label: 'AgenticEMR', href: '/platform/agentic-emr', blurb: 'How the structured patient profile is assembled.' },
      { label: 'Pathway alignment', href: '/platform/pathway', blurb: 'The mechanism-alignment engine that scores fit.' },
      { label: 'Case studies', href: '/case-studies', blurb: 'Trial-matching examples from partner sites.' },
    ],
    ctaLabel: 'See a trial-matching demo',
    ctaHref: '/contact',
    featureList: [
      'Structured eligibility index (targets, biomarkers, prior-line rules)',
      'Mechanism-aligned ranking',
      'Missed-criteria explanations per patient',
      'Public + private trial feed support',
      'Coordinator-owned outreach — no auto-contact',
    ],
  },

  {
    slug: 'immunotherapy',
    title: 'Immunotherapy Co-Pilot: response + IRAE risk',
    tagline:
      'Predict who benefits from immune checkpoint therapy — and who is at risk of a serious immune-related adverse event.',
    audience: 'Medical oncologists, immuno-oncology leads',
    intro:
      'Immunotherapy Co-Pilot combines tumor-microenvironment signals, mutational load, and comorbidity risk into two calls: probability of response, and probability of a serious immune-related adverse event. Both come with confidence tiers so the oncologist knows when to lean on the recommendation and when to demand more data.',
    howItWorks: [
      {
        heading: 'Assemble features',
        body:
          'TMB, PD-L1, microenvironment inferred features, comorbidities, autoimmune history — pulled from the AgenticEMR briefing.',
      },
      {
        heading: 'Score',
        body:
          'Compute a response probability + an IRAE risk probability using the held-out validation model.',
      },
      {
        heading: 'Tier',
        body:
          'Assign a Supported / Consider / Insufficient tier and populate the IRAE risk band (Low / Elevated / High).',
      },
      {
        heading: 'Recommend',
        body:
          'Emit the recommendation with rescue-option scaffolding when IRAE risk is Elevated / High.',
      },
    ],
    outcomes: [
      {
        metric: 'Response prediction AUROC',
        value: '0.78',
        note: 'target AUROC using TMB + PD-L1 + TME features',
        illustrative: true,
      },
      {
        metric: 'Rescue options surfaced per case',
        value: '2.1',
        note: 'target average rescue options when IRAE risk is Elevated/High',
        illustrative: true,
      },
      {
        metric: 'IRAE detection sensitivity',
        value: '86%',
        note: 'target sensitivity on held-out IRAE labels',
        illustrative: true,
      },
    ],
    useCases: [
      {
        headline: 'Checkpoint vs. combo decision',
        body:
          'Between monotherapy checkpoint and a combo, the response + IRAE dual call gives the oncologist a defensible line: expected benefit vs. expected harm, both tiered.',
      },
      {
        headline: 'Autoimmune-history patient',
        body:
          'For a patient with pre-existing autoimmunity, the IRAE risk band is the deciding signal — the recommendation is a rescue-scaffolded regimen, not a blanket checkpoint.',
      },
      {
        headline: 'Post-progression escalation',
        body:
          'After progression on first-line, the residual TME state is re-scored, and rescue options are ranked by mechanism fit.',
      },
    ],
    faq: [
      {
        question: 'Does this predict pseudoprogression?',
        answer:
          'Not directly. Pseudoprogression is a downstream imaging call — Immunotherapy Co-Pilot informs the pre-treatment decision, not the on-treatment response call.',
      },
      {
        question: 'What if PD-L1 is missing?',
        answer:
          'The model degrades gracefully — the tier drops from Supported to Consider when the feature vector is incomplete, rather than emitting an over-confident call.',
      },
      {
        question: 'Is this a medical device?',
        answer:
          'No. Immunotherapy Co-Pilot is research-use decision support. The oncologist owns the treatment decision.',
      },
    ],
    relatedLinks: [
      { label: 'Toxicity risk', href: '/platform/toxicity-risk', blurb: 'Broader PGx + comorbidity risk scoring across therapy classes.' },
      { label: 'Pathway alignment', href: '/platform/pathway', blurb: 'The mechanism engine that scores TME + variant fit.' },
      { label: 'Evidence tiers', href: '/evidence', blurb: 'How the Supported / Consider tiers are calibrated.' },
    ],
    ctaLabel: 'See an Immunotherapy Co-Pilot demo',
    ctaHref: '/contact',
    featureList: [
      'Dual response + IRAE call per patient',
      'TMB + PD-L1 + TME feature fusion',
      'Tiered output (Supported / Consider / Insufficient)',
      'Rescue-option scaffolding when IRAE risk is elevated',
      'Autoimmune-history and comorbidity awareness',
    ],
  },

  {
    slug: 'pathway',
    title: 'Pathway alignment: mechanism-first target mapping',
    tagline:
      'Map variant + expression state onto the druggable pathway graph — the substrate for every downstream Co-Pilot call.',
    audience: 'Translational oncology teams, pharma R&D',
    intro:
      'Pathway alignment is the mechanism engine that sits under Chemo, Immunotherapy, Therapy Fit, and Trials. It maps variant calls plus expression state onto a curated pathway graph, and exposes the top druggable dependencies per patient. It is the reason "mechanism-aligned" is not marketing — it is a scored, cited relationship in the graph.',
    howItWorks: [
      {
        heading: 'Read',
        body:
          'Consume Oracle-tiered variant calls plus the expression + microenvironment features from the AgenticEMR briefing.',
      },
      {
        heading: 'Project',
        body:
          'Project the profile onto the curated pathway graph — target ↔ variant, target ↔ pathway, pathway ↔ regimen.',
      },
      {
        heading: 'Score',
        body:
          'Score each pathway by residual dependency (how much of the tumor’s state depends on this pathway staying up).',
      },
      {
        heading: 'Publish',
        body:
          'Publish the top dependencies with badges and citations. Downstream Co-Pilots (Chemo, Immunotherapy, Therapy Fit, Trials) consume this same object.',
      },
    ],
    outcomes: [
      {
        metric: 'Curated pathways in graph',
        value: '250+',
        note: 'target coverage of the oncology-relevant pathway universe',
        illustrative: true,
      },
      {
        metric: 'Druggable-hit rate per case',
        value: '68%',
        note: 'target proportion of cases with at least one Supported druggable dependency',
        illustrative: true,
      },
      {
        metric: 'Deployed sites',
        value: '15',
        note: 'target site coverage across partner network',
        illustrative: true,
      },
    ],
    useCases: [
      {
        headline: 'Downstream substrate',
        body:
          'Every Chemo Co-Pilot recommendation, every Trials shortlist, every Therapy Fit call reads the same pathway-alignment object — one mechanism story, four consumers.',
      },
      {
        headline: 'Rare driver rescue',
        body:
          'When a variant lacks a guideline target, the pathway graph still surfaces upstream + downstream dependencies that expose actionable options.',
      },
      {
        headline: 'Combo rationale',
        body:
          'Combo regimens are ranked by the pair of pathway dependencies they cover — the rationale is a graph traversal, not a rule of thumb.',
      },
    ],
    faq: [
      {
        question: 'Where do the pathways come from?',
        answer:
          'Curated in-house from KEGG, Reactome, WikiPathways, and drug-target databases, plus published mechanism papers. The graph is versioned per release.',
      },
      {
        question: 'How is a pathway "scored"?',
        answer:
          'A residual-dependency score: the graph is projected against the patient state, and pathways that hold the most tumor state together get the highest scores.',
      },
      {
        question: 'Do you support non-oncology pathways?',
        answer:
          'The curated graph is oncology-focused. Off-oncology pathways exist for context but are not first-class targets.',
      },
    ],
    relatedLinks: [
      { label: 'Oracle', href: '/platform/oracle-intelligence', blurb: 'The variant caller that feeds the pathway projection.' },
      { label: 'Forge', href: '/platform/forge-intelligence', blurb: 'The therapeutic design engine that consumes ranked pathways.' },
      { label: 'Chemo Co-Pilot', href: '/platform/chemo', blurb: 'How Chemo consumes pathway alignment.' },
    ],
    ctaLabel: 'See a pathway-alignment walkthrough',
    ctaHref: '/contact',
    featureList: [
      'Curated oncology pathway graph (250+ target pathways)',
      'Residual-dependency scoring per patient',
      'Single mechanism substrate for Chemo, Immunotherapy, Therapy Fit, Trials',
      'Versioned graph — every downstream call carries the graph version',
      'Combo rationale via pair-wise dependency coverage',
    ],
  },

  {
    slug: 'therapy-fit',
    title: 'Therapy Fit: patient-first regimen ranking',
    tagline:
      'Rank the full therapy space against the patient — not the label class against the diagnosis.',
    audience: 'Tumor boards, medical oncologists, second-opinion teams',
    intro:
      'Therapy Fit is the top-level ranking engine — it combines pathway alignment, evidence tiers, contraindication filters, and prior-line context into a single ranked list. Where Chemo Co-Pilot answers "which chemotherapy", Therapy Fit answers "what should happen next" across all therapy classes.',
    howItWorks: [
      {
        heading: 'Gather',
        body:
          'Pull the pathway-alignment object, Oracle-tiered variants, Immunotherapy scores, PGx + comorbidities.',
      },
      {
        heading: 'Rank',
        body:
          'Cross-class rank: chemotherapy, targeted therapy, immunotherapy, trial referral. One list, comparable tiers.',
      },
      {
        heading: 'Constrain',
        body:
          'Apply hard filters — PGx contraindications, autoimmune history, organ function, prior-line failures.',
      },
      {
        heading: 'Return',
        body:
          'Emit a ranked shortlist with tier + rationale per option. Board-ready.',
      },
    ],
    outcomes: [
      {
        metric: 'Concordance with post-hoc chart review',
        value: '87%',
        note: 'target concordance with post-hoc chart review',
        illustrative: true,
      },
      {
        metric: 'Options at Supported/Consider tier',
        value: '82%',
        note: 'target proportion of cases with a Supported or Consider top option',
        illustrative: true,
      },
      {
        metric: 'Time to a first recommendation',
        value: '2 min',
        note: 'target latency from profile-ready to first ranked list',
        illustrative: true,
      },
    ],
    useCases: [
      {
        headline: 'Second-opinion consult',
        body:
          'A second-opinion team can generate a full-class ranked list per patient without re-running upstream — Therapy Fit is a read of the same pathway + variant object the primary team saw.',
      },
      {
        headline: 'Tumor board integration',
        body:
          'One ranked list per patient, cross-class. The board argues the top three, not the twenty raw options.',
      },
      {
        headline: 'Community-oncology support',
        body:
          'Community sites without a subspecialty board get a defensible ranking they can present to a referring academic center.',
      },
    ],
    faq: [
      {
        question: 'How is this different from Chemo Co-Pilot?',
        answer:
          'Chemo Co-Pilot ranks chemotherapy regimens. Therapy Fit ranks across all therapy classes (chemo, targeted, immunotherapy, trial). Chemo Co-Pilot is a specialized consumer of Therapy Fit.',
      },
      {
        question: 'What if the top option is a trial?',
        answer:
          'Therapy Fit will surface the trial referral as the top-ranked "option" and defer the details to the Trials Co-Pilot shortlist.',
      },
      {
        question: 'Do you support pediatric oncology?',
        answer:
          'The core engine is adult-oncology first. Pediatric coverage is on the roadmap; some pediatric-specific pathways exist in the graph but are not fully validated.',
      },
    ],
    relatedLinks: [
      { label: 'Pathway alignment', href: '/platform/pathway', blurb: 'The mechanism substrate Therapy Fit consumes.' },
      { label: 'Chemo Co-Pilot', href: '/platform/chemo', blurb: 'The chemotherapy-specific consumer.' },
      { label: 'Clinical trials', href: '/platform/clinical-trials', blurb: 'The trial-shortlist consumer.' },
    ],
    ctaLabel: 'See a Therapy Fit demo',
    ctaHref: '/contact',
    featureList: [
      'Cross-class ranking (chemo / targeted / immunotherapy / trial)',
      'Hard filter: PGx, autoimmune, organ function, prior-line failure',
      'Tiered output (Supported / Consider / Insufficient)',
      'One list, board-ready',
      'Same mechanism substrate as Chemo, Immunotherapy, Trials',
    ],
  },

  {
    slug: 'toxicity-risk',
    title: 'Toxicity Risk: PGx + comorbidity scoring',
    tagline:
      'Score the patient’s risk of a serious adverse event before the first dose is drawn.',
    audience: 'Oncology pharmacists, tumor boards, medical oncologists',
    intro:
      'Toxicity Risk pulls PGx panels, comorbidity history, prior AE record, and regimen-specific hazards into a single risk score. It is a hard-filter input to Chemo Co-Pilot and Therapy Fit — a Supported ranked regimen with an unresolved toxicity risk gets downgraded, not silently promoted.',
    howItWorks: [
      {
        heading: 'Collect',
        body:
          'PGx panel, comorbidities, prior AE record, organ function labs — pulled from the AgenticEMR briefing.',
      },
      {
        heading: 'Score',
        body:
          'Compute a regimen-agnostic patient risk score, plus regimen-specific hazards per candidate therapy.',
      },
      {
        heading: 'Adjust',
        body:
          'Propose PGx-guided dose adjustments where the evidence supports them; flag "insufficient PGx" when the panel is thin.',
      },
      {
        heading: 'Recommend',
        body:
          'Emit the risk score + dose-adjustment set to Chemo Co-Pilot / Therapy Fit. Regimens with unresolved risk are demoted, not silently ranked.',
      },
    ],
    outcomes: [
      {
        metric: 'Grade-3 AE prediction AUROC',
        value: '0.81',
        note: 'target AUROC for grade-3 adverse event prediction',
        illustrative: true,
      },
      {
        metric: 'PGx-guided dose adjustments',
        value: '18%',
        note: 'target proportion of cases with a PGx-supported adjustment',
        illustrative: true,
      },
      {
        metric: 'ER-visit rate change',
        value: '−27%',
        note: 'target reduction in adjusted ER-visit rate',
        illustrative: true,
      },
    ],
    useCases: [
      {
        headline: 'Pre-treatment screening',
        body:
          'Before the first dose, the risk score + adjustments are reviewed alongside the ranked regimen — the pharmacist has a defensible dose plan up front.',
      },
      {
        headline: 'On-treatment escalation',
        body:
          'When a grade-2 event fires, Toxicity Risk re-scores the residual risk against continued dosing and flags the escalation to the oncologist.',
      },
      {
        headline: 'PGx-thin cohort',
        body:
          'For patients without a full PGx panel, the score is emitted with an "Insufficient PGx" tier — the ranking still runs, but the confidence downgrades honestly.',
      },
    ],
    faq: [
      {
        question: 'Which PGx panels do you support?',
        answer:
          'The common oncology PGx set (DPYD, UGT1A1, TPMT, NUDT15, CYP2D6, CYP2C19) plus regimen-specific extensions. Uncommon panels fall to a "Consider" tier with the raw call passed through.',
      },
      {
        question: 'What if the panel disagrees with a prior AE?',
        answer:
          'Prior AE record is a stronger signal than a genotyped panel for a phenotype that has already fired — Toxicity Risk weights actual events higher than predicted risk.',
      },
      {
        question: 'Is dosing advice a medical device?',
        answer:
          'No. Toxicity Risk is research-use decision support; the prescribing physician / pharmacist owns the dosing decision.',
      },
    ],
    relatedLinks: [
      { label: 'Chemo Co-Pilot', href: '/platform/chemo', blurb: 'How Chemo consumes the toxicity risk score.' },
      { label: 'Immunotherapy', href: '/platform/immunotherapy', blurb: 'The IRAE-specific companion.' },
      { label: 'Evidence tiers', href: '/evidence', blurb: 'How risk downgrades cascade through the ranked list.' },
    ],
    ctaLabel: 'See a Toxicity Risk demo',
    ctaHref: '/contact',
    featureList: [
      'PGx panel + comorbidity + prior-AE fusion',
      'Regimen-specific hazard scoring',
      'PGx-guided dose adjustment proposals',
      'Insufficient-PGx tier — honest under-confidence',
      'Hard-filter input to Chemo Co-Pilot and Therapy Fit',
    ],
  },
];

export const CAPABILITY_DEEP_DIVE_MAP: Record<string, CapabilityDeepDiveContent> = Object.fromEntries(
  CAPABILITY_DEEP_DIVES.map((c) => [c.slug, c]),
);
