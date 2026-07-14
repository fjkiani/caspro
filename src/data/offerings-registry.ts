// ==============================================================================
// OFFERINGS REGISTRY — Single source of truth for the five CrisPRO offerings.
// Vague-scrubbed against caspro-lint/README.md. Source: crispro_master_pipeline.json
// what_we_offer[0..4], with retired numerics, program identifiers, and terminology
// removed at the copy layer.
// ==============================================================================

export interface OfferingEntry {
  id: string;             // OFFER-1..OFFER-5
  slug: string;           // used inside /pipeline (?tab=…)
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  example: string;        // vague-safe illustrative case
  turnaround: string;
  validatedOn: string[];  // reference cases only — no client-linked program names
}

export const OFFERINGS_REGISTRY: OfferingEntry[] = [
  {
    id: 'OFFER-1',
    slug: 'trial-failure-decode',
    name: 'Trial Failure Decode',
    tagline: 'Understand why a trial failed — before you repeat the mistake.',
    description:
      'CrisPRO applies its multi-domain failure framework to any completed or ongoing oncology trial. We identify the primary failure domain (Biology, Selection, Architecture, Timing, Combination, Resistance, Translational, or Systemic), extract the responder subpopulation that existed within the failure, and produce a transfer-lesson set for your program.',
    deliverables: [
      'Failure-domain report with primary/secondary classification',
      'Responder subpopulation identification (biomarker gate, ORR, PFS HR)',
      'Transfer-lesson set for your program design',
      'Competitive intelligence — which competitors are repeating the same mistake',
    ],
    example:
      'A large ADC Phase III at a lenient target-expression threshold: primary failure domain = Selection; a stricter subgroup shows directional benefit. Transfer lesson: adopt the stricter threshold as the enrollment gate for next-generation programs.',
    turnaround: '5–10 business days per trial',
    validatedOn: [
      'CEACAM5 ADC',
      'Berzosertib',
      'Adavosertib',
      'CAPRI',
      'QUILT-2.004',
      'GVAX',
      'IMblaze370',
      'CO.26',
    ],
  },
  {
    id: 'OFFER-2',
    slug: 'patient-selection-package',
    name: 'Patient Selection Package',
    tagline: "Find the patients who will respond — before you enroll the ones who won't.",
    description:
      'CrisPRO builds a two-gate patient selection framework for any oncology program. Gate 1 defines target expression (IHC, genomic, or liquid biopsy). Gate 2 defines the IO permissiveness or pathway context required for response. Output is an ENRICH / CONSIDER / EXCLUDE stratification table ready for protocol integration.',
    deliverables: [
      'Two-gate patient selection framework',
      'ENRICH / CONSIDER / EXCLUDE stratification table with biomarker thresholds',
      'Population-size estimate under each gate',
      'Liquid-biopsy proxy identification when applicable',
      'Protocol language for enrollment criteria',
    ],
    example:
      'For a next-generation CEACAM5 ADC: Gate 1 = a stricter target-expression threshold; Gate 2 = IO permissiveness. Addressable MSS mCRC population narrows to the low thousands per year in the US.',
    turnaround: '7–14 business days',
    validatedOn: [
      'CEACAM5 franchise engagement',
      'ATR/DDR (RS-High gate)',
      'MSS CRC IO',
    ],
  },
  {
    id: 'OFFER-3',
    slug: 'ist-design-support',
    name: 'IST Design Support',
    tagline: 'Design investigator-sponsored trials that are built to succeed.',
    description:
      "CrisPRO provides biomarker-driven IST protocol design support. We map the multi-domain suppression landscape for your indication, identify the biomarker gates that prior trials missed, and produce a fit-gap assessment comparing your drug's mechanism to the target population's biology. Output is a protocol-ready biomarker strategy and enrollment-criteria recommendation.",
    deliverables: [
      'Multi-domain biomarker biology map for your indication',
      'Mechanism-alignment fit assessment for the asset in that indication',
      'Gap-and-risk inventory with severity ratings',
      'Enrollment-criteria recommendation with biomarker thresholds',
      'Comparator-trial context — trials your design must differentiate from',
    ],
    example:
      'For an active 1L MSS mCRC vaccine engagement: mechanism-alignment fit assessed against the multi-domain biology map. Highest-severity design gaps flagged (e.g., stratification variables missing from protocol). Recommendations: add stratification and systemic-biomarker collection prospectively.',
    turnaround: '10–21 business days',
    validatedOn: [
      'Active 1L MSS mCRC vaccine engagement',
      'Ceralasertib + durvalumab program',
    ],
  },
  {
    id: 'OFFER-4',
    slug: 'bd-intelligence-package',
    name: 'BD Intelligence Package',
    tagline: 'Walk into every pharma meeting knowing more about their trial than they do.',
    description:
      'CrisPRO produces pharma-ready business-development packages anchored in decoded trial intelligence. We identify the specific failure mode in the counterparty program, show how the asset addresses it, and produce a pitch deck plus anchor document that positions the platform as the solution to their patient-selection problem.',
    deliverables: [
      'Counterparty trial decode: failure-domain vector for their most recent failure',
      'Patient-selection gap analysis — the gate they missed',
      'Asset differentiation — how the counterparty asset addresses that failure mode',
      'Indication-level escape map (where patients fall, where trials fail)',
      'Pitch deck (~12 slides, pharma-ready format)',
      'Anchor document for governance and reproducibility',
    ],
    example:
      'A recent CEACAM5 ADC Phase III Selection failure decoded → a two-gate solution (stricter target-expression threshold + IO permissiveness) → a franchise-adjacent asset positioned around the same gate before it reads out.',
    turnaround: '14–21 business days',
    validatedOn: [
      'CEACAM5 franchise engagement',
      'Active 1L MSS mCRC vaccine engagement',
    ],
  },
  {
    id: 'OFFER-5',
    slug: 'ip-valuation-trial-failure-corpus',
    name: 'IP Valuation — Trial Failure Corpus',
    tagline: "Quantify the value of what you've decoded.",
    description:
      'CrisPRO produces an IP-valuation memo for a decoded trial corpus. We apply the failure-domain framework to a set of trials, identify the responder subpopulations that existed within each failure, and estimate the value of the patient-selection intelligence relative to the total program investment that failed. Output is a corpus analysis and valuation memo suitable for investor presentations and licensing discussions.',
    deliverables: [
      'Multi-trial corpus with full failure-domain decodes',
      'Responder subpopulation identification across all trials',
      'IP-valuation memo — decoded intelligence value vs. failed program investment',
      'Licensing-discussion framework — what the intelligence is worth to a pharma counterparty',
    ],
    example:
      'An ATR/DDR failure corpus: multiple trials, ~$1.95B in failed program investment decoded. Three biomarker gates identified (RS-High, PTEN-intact, PARPi-naive) that would each have salvaged a meaningful share of that investment if applied prospectively.',
    turnaround: '21–30 business days',
    validatedOn: [
      'ATR/DDR failure corpus (multi-trial, ~$1.95B decoded)',
    ],
  },
];

export const getOffering = (slug: string): OfferingEntry | undefined =>
  OFFERINGS_REGISTRY.find((o) => o.slug === slug);
