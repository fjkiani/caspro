// ============================================================================
// capability-depth-wiring.ts — side-table that links each canonical capability
// (from capability-registry.ts) to the substrate axes / modalities / tiers /
// guardrails that back it.
//
// Wired to survive a growing spine: if capability-registry.ts adds a CAP-6,
// this file MUST add a matching wiring entry, or capability_depth_lint.py
// blocks the commit.
// ============================================================================

export interface CapabilityDepthWiring {
  capabilitySlug: string;             // matches CAPABILITY_REGISTRY.slug
  substrateAxes: string[];            // subset of PATIENT_VECTOR_AXES.axis
  substrateModalities: string[];      // subset of EVIDENCE_MODALITIES_7.modality
  substrateTiers: string[];           // subset of EVIDENCE_TIERS_4.tier (tiers this cap emits)
  governanceGuardrails: string[];     // subset of GOVERNANCE_GUARDRAILS.slug
  headlineSubstrateSentence: string;  // one sentence: "what powers this"
  headlineGovernanceSentence: string; // one sentence: "how governance validates this"
}

export const CAPABILITY_DEPTH_WIRING: CapabilityDepthWiring[] = [
  {
    capabilitySlug: 'gate-tier-scoring',
    substrateAxes: ['ddr', 'mapk', 'pi3k', 'io', 'efflux'],
    substrateModalities: ['crispr-dependency', 'clinical', 'expression-association'],
    substrateTiers: ['strong', 'mechanistic'],
    governanceGuardrails: [
      'ranker-version-lock',
      'ranker-variant-prohibition',
      'admissibility-policy',
      'reproducibility-lock',
    ],
    headlineSubstrateSentence:
      'Every candidate patient-selection gate is scored against 5 mechanism axes using CRISPR-dependency, clinical, and expression evidence — no gate is admissible on a single-modality signal.',
    headlineGovernanceSentence:
      'Every gate score is reproducible from the same released ranker version on the same patient biology, so a gate we recommend today produces the same score tomorrow.',
  },
  {
    capabilitySlug: 'multi-asset-scoring',
    substrateAxes: ['mapk', 'pi3k', 'her2', 'io'],
    substrateModalities: ['pharmacologic-prism', 'pharmacologic-gdsc', 'in-vitro-functional'],
    substrateTiers: ['validated', 'strong'],
    governanceGuardrails: [
      'ranker-version-lock',
      'ranker-variant-prohibition',
      'admissibility-policy',
      'reproducibility-lock',
    ],
    headlineSubstrateSentence:
      'A franchise-level comparison ranks every asset against every candidate subgroup using pharmacologic-screen and isogenic in-vitro convergence, so a subgroup that fits Asset A structurally differently from Asset B is flagged before it enters the trial.',
    headlineGovernanceSentence:
      'Cross-asset scores are directly comparable because every asset is scored against the same trial-target library under the same released ranker version.',
  },
  {
    capabilitySlug: 'biomarker-failure-prediction',
    substrateAxes: ['ddr', 'her2', 'io', 'rss'],
    substrateModalities: ['clinical', 'crispr-dependency', 'in-vivo'],
    substrateTiers: ['validated', 'strong', 'mechanistic'],
    governanceGuardrails: [
      'ranker-version-lock',
      'admissibility-policy',
      'forbidden-string-audit',
    ],
    headlineSubstrateSentence:
      'A candidate biomarker is graded against clinical + CRISPR + in-vivo evidence and mapped to a 4-tier hierarchy; the site never surfaces a biomarker recommendation whose supporting tier is INSUFFICIENT.',
    headlineGovernanceSentence:
      'Every biomarker call carries the source of its tier assignment — no biomarker is elevated to VALIDATED without a curator-signed receipt.',
  },
  {
    capabilitySlug: 'population-funnel',
    substrateAxes: ['vegf', 'efflux', 'io'],
    substrateModalities: ['clinical', 'expression-association'],
    substrateTiers: ['strong', 'mechanistic'],
    governanceGuardrails: [
      'ranker-version-lock',
      'admissibility-policy',
      'reproducibility-lock',
    ],
    headlineSubstrateSentence:
      'Addressable-population estimates are derived from clinical + expression-association evidence on the axes that drive the specific therapy — so a funnel narrows a disease-wide pool to a mechanism-aligned enrolment target the trial can actually run against.',
    headlineGovernanceSentence:
      'Funnel numbers are traced to source receipts, and any figure without a source is labelled OPEN_ASSUMPTION on the site itself.',
  },
  {
    capabilitySlug: 'mechanism-divergence',
    substrateAxes: ['ddr', 'mapk', 'vegf', 'io', 'rss'],
    substrateModalities: ['clinical', 'in-vivo', 'expression-association'],
    substrateTiers: ['strong', 'mechanistic'],
    governanceGuardrails: [
      'ranker-version-lock',
      'admissibility-policy',
      'forbidden-string-audit',
    ],
    headlineSubstrateSentence:
      'When two trials in the same indication produce opposite results, the divergence is decomposed onto the mechanism axes — the axis that carries the largest signed contribution difference is the mechanistic explanation, not an averaging artifact.',
    headlineGovernanceSentence:
      'Divergence decomposition is deterministic under the released ranker version, so a divergence we point at today does not shift when the model is re-run.',
  },
];

export const getWiring = (slug: string) =>
  CAPABILITY_DEPTH_WIRING.find((w) => w.capabilitySlug === slug);
