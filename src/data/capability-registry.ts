// ==============================================================================
// CAPABILITY REGISTRY — Single source of truth for the CrisPRO capability spine.
// Vague-scrubbed against caspro-lint/README.md (no retired numerics, no client-linked
// terminology). Source: ceacam5 vague-framing template layer_1_platform_capabilities.
// ==============================================================================

export interface CapabilityRoiHook {
  scenario_slug: string;
  title: string;
  value_at_stake: string;
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export interface CapabilityEntry {
  id: string;               // CAP-1 .. CAP-5
  slug: string;             // route-safe slug (used inside /engine and /pipeline tabs)
  name: string;
  oneLiner: string;
  description: string;
  demoOutput: string;       // vague-safe illustrative line
  clinicalValue: string;
  primarySurface: string;   // where in the app this capability is embodied
  proofCaseSlug: string;    // links into the trial-case-file receipts we ship
}

export const CAPABILITY_REGISTRY: CapabilityEntry[] = [
  {
    id: 'CAP-1',
    slug: 'gate-tier-scoring',
    name: 'Gate Tier Scoring',
    oneLiner: 'Ranks candidate patient-selection gates by expected mechanism alignment.',
    description:
      'For any candidate biomarker gate (target expression threshold, pathway signature, subgroup rule), CrisPRO quantifies how much the gate improves mechanism alignment between the drug and the selected population — and flags gates that are counterproductive (i.e., the unselected population aligns better than the gate-positive one).',
    demoOutput:
      'GATE-FAIL: a lenient target-expression gate is counterproductive vs. the unselected population. Under 30 seconds.',
    clinicalValue:
      'Prevents Phase III repeats of gate-selection failures by testing candidate gates in silico before protocol design.',
    primarySurface: '/engine (Gate Tier Scoring tab)',
    proofCaseSlug: 'ceacam5',
  },
  {
    id: 'CAP-2',
    slug: 'multi-asset-scoring',
    name: 'Multi-Asset Simultaneous Scoring',
    oneLiner: 'Scores every asset in a franchise against every patient subgroup — in one pass.',
    description:
      'For a franchise with multiple candidates (e.g., two ADC formats against the same target, or an ADC + a bispecific), CrisPRO scores each asset against each candidate patient subgroup and returns a mechanism-alignment matrix. Reveals when two assets nominally targeting the same disease are actually addressing structurally different patient populations.',
    demoOutput:
      'ASSET-SPLIT: two franchise assets show meaningfully different IO-context alignment against the same target.',
    clinicalValue:
      'Prevents mis-allocation of asset development across a franchise; supports parallel-track vs. staged-track decisions.',
    primarySurface: '/engine (Multi-Asset tab)',
    proofCaseSlug: 'ceacam5',
  },
  {
    id: 'CAP-3',
    slug: 'biomarker-failure-prediction',
    name: 'Prospective Biomarker Failure Prediction',
    oneLiner: 'Predicts which biomarker will fail — and which will succeed — before the trial reads out.',
    description:
      'CrisPRO ranks candidate biomarkers by predicted mechanism-alignment weight for the drug and disease context. Distinguishes local-tissue biomarkers from systemic biomarkers, and flags when the more accessible biomarker is likely to be less predictive than a harder-to-measure alternative.',
    demoOutput:
      'TMB-DECODE: peripheral TMB is meaningfully more predictive than tissue TMB in an IO-context indication.',
    clinicalValue:
      'Prevents adoption of the wrong biomarker as a companion diagnostic; corrects biomarker strategy pre-trial.',
    primarySurface: '/engine (Biomarker Prediction tab)',
    proofCaseSlug: 'ceacam5',
  },
  {
    id: 'CAP-4',
    slug: 'population-funnel',
    name: 'Population Funnel Optimization',
    oneLiner: 'Turns a disease-wide addressable market into a mechanism-aligned enrollment target.',
    description:
      'For any indication, CrisPRO projects the funnel from disease prevalence → gate-eligible → mechanism-aligned. Returns the size of the mechanism-aligned population, the ORR/HR delta between all-comers and the aligned population, and the resulting cost-per-responder change.',
    demoOutput:
      'CEA-GATE (illustrative): funnel drops from tens of thousands to low-thousands of patients per year with a two-gate framework; ORR improves several-fold; cost-per-responder drops meaningfully.',
    clinicalValue:
      'Aligns commercial forecasts and enrollment plans with the biology-defined addressable population, not the disease-defined one.',
    primarySurface: '/engine (Population Funnel tab)',
    proofCaseSlug: 'ceacam5',
  },
  {
    id: 'CAP-5',
    slug: 'mechanism-divergence',
    name: 'Mechanism Divergence Explanation',
    oneLiner: 'Explains why two trials in nominally the same indication produced opposite results.',
    description:
      "When two trials in the same indication contradict each other (e.g., positive vs. negative in a subgroup, or an interaction p-value that flips signal direction), CrisPRO decomposes the contradiction into mechanism-alignment axes and identifies which axis (IO context, VEGF context, DDR, etc.) is doing the work. Turns 'unexplained heterogeneity' into a named mechanism split.",
    demoOutput:
      'LIVER-SPLIT: an interaction p-value in one trial reflects a VEGF-context divergence not visible at the primary-endpoint level.',
    clinicalValue:
      "Turns 'trial failure was unlucky' into 'trial failure was mechanistically named' — supports program-level go/no-go with attribution.",
    primarySurface: '/engine (Mechanism Divergence tab)',
    proofCaseSlug: 'ceacam5',
  },
];

export interface Comparator {
  slug: string;
  name: string;
  exampleOfClass: string;
  whatTheyDo: string;
  whatTheyCannotDo: string;
  crisproPosition: string;
  relationship: string;
}

export const COMPARATORS: Comparator[] = [
  {
    slug: 'tissue-histology',
    name: 'Tissue histology platforms',
    exampleOfClass: 'Owkin AI, spatial transcriptomics vendors',
    whatTheyDo: 'Tissue biopsy analysis: IHC density, spatial patterns, H&E morphology.',
    whatTheyCannotDo:
      'Do not compute mechanism alignment between patient biology and drug MOA. Cannot flag counterproductive gates, cross-asset structural contradictions, or biomarker-modality failures.',
    crisproPosition:
      'CrisPRO operates one layer above tissue morphology and one layer below clinical outcome. The signals CrisPRO detects are structurally invisible to histology platforms.',
    relationship:
      "COMPLEMENTARY — they answer 'what does the tumor look like?', CrisPRO answers 'how well does this drug engage this tumor?'",
  },
  {
    slug: 'comprehensive-genomic-profiling',
    name: 'Comprehensive genomic profiling',
    exampleOfClass: 'Foundation Medicine / FoundationOne CDx',
    whatTheyDo: 'Tumor genomic profiling: TMB, MSI, SNVs, CNVs, fusions from tissue biopsy.',
    whatTheyCannotDo:
      'Do not distinguish tissue-level biomarkers from systemic biomarkers as a function of mechanism context, and do not predict which genomic feature will be predictive for a given drug mechanism.',
    crisproPosition:
      'CrisPRO can predict — pre-trial — which biomarker modality will fail for a given mechanism and disease context. Prospective, not post-hoc.',
    relationship:
      'COMPLEMENTARY — genomic platforms provide the data; CrisPRO determines which features are mechanistically relevant.',
  },
  {
    slug: 'real-world-evidence',
    name: 'Multimodal real-world evidence platforms',
    exampleOfClass: 'Tempus AI and similar',
    whatTheyDo:
      'Multimodal integration of genomics, clinical records, imaging, pathology. Real-world evidence generation.',
    whatTheyCannotDo:
      'Real-world evidence identifies correlations — it does not deliver mechanistic causality. Cannot run prospective gate optimization for a specific drug mechanism.',
    crisproPosition:
      'CrisPRO provides mechanistic causality grounded in drug MOA, not correlation observed in aggregate real-world data.',
    relationship:
      'COMPLEMENTARY — real-world platforms provide the evidence base; CrisPRO provides the mechanistic framework to interpret it.',
  },
];

export const UNIQUE_POSITION =
  'CrisPRO occupies the mechanism alignment layer — the gap between tissue biology (histology / genomics / RWE) and clinical outcome (trial data).';

export interface RoiScenario {
  slug: string;
  title: string;
  investment: string;
  valueAtStake: string;
  riskOfInaction: string;
  valueProtected: string;
  urgency: string;
  claimType: string;
}

export const ROI_SCENARIOS: RoiScenario[] = [
  {
    slug: 'gate-definition-pre-phase-1',
    title: 'Gate Definition Before Phase 1 Enrollment',
    investment: 'Single CrisPRO analysis session',
    valueAtStake: 'Phase 1 signal integrity for a franchise asset',
    riskOfInaction:
      'Phase 1 enrolls a mix of aligned and misaligned patients. Signal is diluted. Phase 2 repeats a prior gate-selection failure.',
    valueProtected:
      'Order of 18–24 months of Phase 2 development time and mid-nine-figure Phase 2 cost avoidance if the gate is defined correctly in Phase 1.',
    urgency: 'Time-boxed — expires when Phase 1 enrollment opens.',
    claimType: 'OPEN_ASSUMPTION — Phase 2 cost avoided based on industry benchmarks.',
  },
  {
    slug: 'retrospective-co-stratification',
    title: 'Retrospective Sub-Gate Co-Stratification',
    investment: 'Standard clinical lab test on existing biobank samples',
    valueAtStake: 'Salvage path for an asset whose registrational trial failed',
    riskOfInaction:
      'The failed trial stands as unexplained. The responder subgroup remains statistically post-hoc and cannot anchor a prospective Phase 2.',
    valueProtected:
      'If the sub-gate confirms a meaningful ORR delta in the retained subgroup, the program has a prospective Phase 2 path in a defined population. NPV of a successful Phase 2 in a defined sub-population: single-digit to low-double-digit millions [OA].',
    urgency: 'HIGH — biobank samples from failed trials have a finite storage window.',
    claimType: 'OPEN_ASSUMPTION [OA] — NPV range from prior CrisPRO analysis.',
  },
  {
    slug: 'prospective-co-stratification',
    title: 'Prospective Biomarker Co-Stratification in Ongoing Phase 1',
    investment: 'Protocol amendment adding a systemic biomarker as a co-stratification variable',
    valueAtStake: 'Phase 1 biomarker strategy for a franchise asset',
    riskOfInaction:
      'Phase 1 cannot distinguish aligned from misaligned patients. The systemic biomarker signal is never prospectively validated. Phase 2 biomarker strategy remains undefined.',
    valueProtected:
      'Co-stratification cost is a rounding error against Phase 2 biomarker-failure cost. Eliminates one Phase 2 biomarker-failure cycle in the estimated tens-of-millions range.',
    urgency: 'HIGH — trial is ongoing.',
    claimType: 'OPEN_ASSUMPTION — Phase 2 biomarker failure cost based on industry benchmarks.',
  },
];

export const SUMMARY_VALUE_STATEMENT =
  'Three CrisPRO analysis modes — gate definition, retrospective sub-gate, prospective co-stratification — jointly protect the majority of Phase 2 downside risk for a mechanism-defined asset.';

export const getCapability = (slug: string): CapabilityEntry | undefined =>
  CAPABILITY_REGISTRY.find((c) => c.slug === slug);

export const getComparator = (slug: string): Comparator | undefined =>
  COMPARATORS.find((c) => c.slug === slug);

export const getRoiScenario = (slug: string): RoiScenario | undefined =>
  ROI_SCENARIOS.find((r) => r.slug === slug);
