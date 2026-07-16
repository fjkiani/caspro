// ==============================================================================
// AUDIENCE REGISTRY — Single source of truth for the 3-audience home router
// and the shared <AudienceSurface data=…/> component used across /industry/*,
// /patients/, and /products/*.
//
// Vague-scrubbed against caspro-lint/README.md. Anchors:
//   - crispro_master_pipeline.json § landing_page_copy (VP-1..3, case_studies)
//   - ceacam5_sanofi_intelligence_v2.json § unique_position
//   - capability-registry.ts § CAPABILITY_REGISTRY (proof-point cross-refs)
//   - offerings-registry.ts § OFFERINGS_REGISTRY (offering CTAs)
//
// Framing: the platform is the *key to the lock*. Every audience gets the same
// answer to a different question: "how does precision oncology stop paying for
// the wrong patients?"
// ==============================================================================

export interface AudienceOutcome {
  headline: string;      // one line — what changes when this audience works with us
  body: string;          // the mechanism-alignment story in the audience's language
}

export interface AudienceProofPoint {
  label: string;         // short badge label
  detail: string;        // one-line explanation
  sourceHint: string;    // "master pipeline / VP-1" style anchor
}

export interface AudienceCaseStudy {
  slug: string;          // links to /ledger/<slug>/
  title: string;
  summary: string;
  keyMetric: string;     // vague-safe illustrative metric
}

export interface AudienceNextStep {
  offeringSlug: string;  // matches offerings-registry.ts slug
  cta: string;
  helper: string;
}

export interface AudienceEntry {
  id: string;                        // AUD-1..AUD-3
  slug: 'pharma-bd' | 'oncologists' | 'investors';
  name: string;                      // "Pharma & BD"
  question: string;                  // "You're deciding which asset to advance."
  outcome: AudienceOutcome;
  journey: string[];                 // ordered 3-step journey — what a session looks like
  proofPoints: AudienceProofPoint[]; // 3-4 items
  caseStudies: AudienceCaseStudy[];  // 2 items
  nextStep: AudienceNextStep;
}

// -----------------------------------------------------------------------------
// Cure-forward framing shared across all audiences
// -----------------------------------------------------------------------------

export const CURE_FRAMING = {
  eyebrow: 'Precision oncology · Mechanism-alignment layer',
  headline: 'Every failed oncology trial is hiding a responder.',
  subhead:
    'CrisPRO is the key to that lock — a multi-modal computational-biology engine that names the mechanism-alignment split between a drug and its patients before a Phase III burns another $300M.',
  positioning:
    'CrisPRO occupies the mechanism-alignment layer — the gap between tissue biology (histology / genomics / RWE) and clinical outcome (trial data).',
} as const;

// -----------------------------------------------------------------------------
// AUDIENCE 1 — Pharma & BD (portfolio and licensing decision makers)
// -----------------------------------------------------------------------------

const audiencePharma: AudienceEntry = {
  id: 'AUD-1',
  slug: 'pharma-bd',
  name: 'Pharma & BD',
  question: "You're deciding which asset to advance — and which one is quietly failing.",
  outcome: {
    headline: 'Know which of your assets is in the wrong patients — before Phase 2 opens.',
    body: "CrisPRO applies a multi-domain failure framework to any asset in your franchise. We name the primary failure domain, extract the responder subpopulation that exists inside the failure, and hand you the biomarker gate that would salvage a Phase 3.",
  },
  journey: [
    'Bring one candidate program or one recent counterparty failure.',
    'CrisPRO returns the failure-domain vector, the responder gate, and the transfer lessons — in the language your protocol team will accept.',
    'Take the gate into protocol design (or into the licensing conversation) with a mechanism-anchored rationale, not a correlation.',
  ],
  proofPoints: [
    {
      label: '42 trials · 7 programs',
      detail: 'Public failure corpus decoded end-to-end across CEACAM5, ATR/DDR, IO in MSS CRC and adjacent indications.',
      sourceHint: 'crispro_master_pipeline.json § landing_page_copy VP-1',
    },
    {
      label: 'Two-layer decode',
      detail:
        'Layer 1: is the target real? Layer 2: are the right patients enrolled? Most expensive failures are Layer 2 — the target holds, the population cannot respond.',
      sourceHint: 'crispro_master_pipeline.json § VP-3',
    },
    {
      label: 'Mechanism, not correlation',
      detail:
        'Real-world evidence platforms find correlations. CrisPRO returns mechanism-alignment causality grounded in drug MOA.',
      sourceHint: 'ceacam5_sanofi_intelligence_v2.json § layer_2 unique_position',
    },
  ],
  caseStudies: [
    {
      slug: 'ceacam5',
      title: 'CEACAM5 — From Phase III failure to a two-gate patient-selection solution',
      summary:
        'A large ADC Phase III failed at a lenient target-expression threshold. CrisPRO named the stricter threshold as the candidate predictive gate and built a two-gate framework (target IHC + IO permissiveness) that redraws the addressable population.',
      keyMetric: 'Directional OS benefit at the stricter threshold vs. failed primary at the lenient one.',
    },
    {
      slug: 'berzosertib',
      title: 'ATR/DDR — a corpus of failures that share one missing gate',
      summary:
        'Four ATR/DDR trials representing roughly $1.95B in decoded program investment. In each case the target was real; the patient gate was missing. Three named gates (RS-High, PTEN-intact, PARPi-naive) each carry a meaningful share of that value.',
      keyMetric: 'RS-High ORR ~40% vs. RS-Low ORR ~5% at the same dose and indication.',
    },
  ],
  nextStep: {
    offeringSlug: 'bd-intelligence-package',
    cta: 'Request a counterparty trial decode',
    helper: 'Walk into every pharma meeting knowing more about their trial than they do.',
  },
};

// -----------------------------------------------------------------------------
// AUDIENCE 2 — Oncologists & KOLs (clinical investigators, tumor board leads)
// -----------------------------------------------------------------------------

const audienceOncologists: AudienceEntry = {
  id: 'AUD-2',
  slug: 'oncologists',
  name: 'Oncologists & KOLs',
  question: "You're asking why last year's negative Phase III still had responders — and whether the next protocol can find them.",
  outcome: {
    headline: 'Read a failed trial and see who was going to respond.',
    body: "CrisPRO decomposes each trial's failure into a mechanism-alignment vector and returns the responder subgroup as a named biomarker gate — a stratification variable your next protocol can actually enroll on.",
  },
  journey: [
    'Pick a trial that failed in your indication (or is failing now).',
    'CrisPRO returns the responder subgroup, the biomarker gate that defines it, and the mechanism-alignment axes that split the population.',
    'Use the gate as a stratification variable, an eligibility criterion, or a co-primary hypothesis in the next protocol.',
  ],
  proofPoints: [
    {
      label: 'Responder gates, not p-values',
      detail:
        'Each decoded trial ships with a biomarker gate (ORR, PFS HR, subgroup CI) that separates the responders from the noise.',
      sourceHint: 'trial-case-files (ledger)',
    },
    {
      label: 'Multi-domain suppression map',
      detail:
        'Failure is decomposed across Biology, Selection, Architecture, Timing, Combination, Resistance, Translational, and Systemic domains — with primary and secondary domain weights.',
      sourceHint: 'offerings-registry § OFFER-1',
    },
    {
      label: 'IST design-ready',
      detail:
        'Gap-and-risk inventory (CRITICAL / HIGH / MEDIUM), enrollment-criteria recommendation, and comparator-trial context land as a protocol-ready document.',
      sourceHint: 'offerings-registry § OFFER-3',
    },
  ],
  caseStudies: [
    {
      slug: 'adavosertib',
      title: 'Adavosertib — a PTEN-defined split hiding inside a negative Phase II',
      summary:
        'A negative WEE1 inhibitor Phase II produced a clean PTEN-defined responder split. CrisPRO names PTEN-intact vs. PTEN-loss as the mechanism-alignment axis and shows how prospectively stratifying on it changes the go/no-go call.',
      keyMetric: 'PTEN-intact ORR ~23% (PFS HR 0.55) vs. PTEN-loss ORR 0% (PFS HR 1.82).',
    },
    {
      slug: 'capri',
      title: 'CAPRI — the PARPi-exposure window that decides who responds',
      summary:
        'A PARPi Phase II shows a large PARPi-exposure split — PARPi-naive patients respond meaningfully; post-PARPi patients do not. CrisPRO reads the split as a resistance-window mechanism and returns the eligibility window as a gate.',
      keyMetric: 'PARPi-naive ORR ~36% (PFS HR 0.42) vs. post-PARPi ORR ~4% (PFS HR 1.31).',
    },
  ],
  nextStep: {
    offeringSlug: 'ist-design-support',
    cta: 'Design an IST with a named responder gate',
    helper: 'Investigator-sponsored trials designed to succeed on a mechanism-anchored gate, not a p-value.',
  },
};

// -----------------------------------------------------------------------------
// AUDIENCE 3 — Investors (venture, corporate, non-dilutive)
// -----------------------------------------------------------------------------

const audienceInvestors: AudienceEntry = {
  id: 'AUD-3',
  slug: 'investors',
  name: 'Investors',
  question: "You're pricing an asset — and you want to know how much of the risk is patient selection, not biology.",
  outcome: {
    headline: 'Price mechanism-alignment risk separately from target risk.',
    body: 'CrisPRO returns an IP-valuation memo grounded in a decoded corpus of failed trials — separating the value of the target from the value of the missing gate. Under-priced assets fail at the gate, not the mechanism.',
  },
  journey: [
    'Pick a failure corpus (indication, drug class, or franchise).',
    'CrisPRO decodes every trial, names the responder subgroup, and estimates the decoded intelligence value relative to the failed program investment.',
    'Use the memo in diligence, in licensing negotiation, or in a portfolio-level go/no-go with attribution.',
  ],
  proofPoints: [
    {
      label: '~$1.95B decoded in one corpus',
      detail:
        'Four ATR/DDR trials, three named biomarker gates (RS-High, PTEN-intact, PARPi-naive). Each gate carries a meaningful share of the failed program investment.',
      sourceHint: 'crispro_master_pipeline.json § case_studies[2]',
    },
    {
      label: 'Named mechanism split, not correlation',
      detail:
        'CrisPRO returns a decoded mechanism, not a statistical association — durable for licensing and durable to counterparty scrutiny.',
      sourceHint: 'ceacam5_sanofi_intelligence_v2.json § layer_2 unique_position',
    },
    {
      label: '3-scenario ROI framework',
      detail:
        'Gate definition pre-Phase 1, retrospective sub-gate co-stratification, and prospective co-stratification jointly protect the majority of Phase 2 downside risk.',
      sourceHint: 'ceacam5_sanofi_intelligence_v2.json § layer_3 roi_scenarios',
    },
  ],
  caseStudies: [
    {
      slug: 'berzosertib',
      title: 'Berzosertib — one gate, one salvaged Phase 2',
      summary:
        'A negative ATR-inhibitor Phase II carries a large RS-High vs. RS-Low split. The intelligence to define RS-High prospectively is worth a meaningful share of the program investment that was written off.',
      keyMetric: 'RS-Low PFS HR 0.34 vs. RS-High PFS HR 1.11 — inverted signal, one gate.',
    },
    {
      slug: 'latify',
      title: 'Ceralasertib + durvalumab — under continued analysis',
      summary:
        'A large ATR-inhibitor + IO Phase III with a challenging primary endpoint. CrisPRO holds the delta call for continued canon review; the trial ships as a mechanism-alignment case with the numeric receipt gated.',
      keyMetric: 'Continued canon review — see the ledger for the vague-safe framing.',
    },
  ],
  nextStep: {
    offeringSlug: 'ip-valuation-trial-failure-corpus',
    cta: 'Commission an IP-valuation memo',
    helper: 'Quantify what a decoded failure corpus is worth to a licensing counterparty.',
  },
};

export const AUDIENCE_REGISTRY: AudienceEntry[] = [
  audiencePharma,
  audienceOncologists,
  audienceInvestors,
];

export const getAudience = (slug: AudienceEntry['slug']) =>
  AUDIENCE_REGISTRY.find((a) => a.slug === slug);
