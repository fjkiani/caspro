// ============================================================================
// capability-depth-wiring.ts — side-table that links each canonical capability
// (from capability-registry.ts) to the substrate axes / modalities / tiers /
// guardrails that back it.
//
// Wired to survive a growing spine: if capability-registry.ts adds a CAP-6,
// this file MUST add a matching wiring entry, or capability_depth_lint.py
// blocks the commit.
//
// D15 PERSONA OVERLAY
//   The two user-visible headline sentences (substrate + governance) carry
//   an optional `personaCopy` overlay. The base fields are the oncologist
//   English root. `patient` and `pharma` variants live under `personaCopy`
//   and are surfaced by consumers via getWiring(...) → personaField helper.
// ============================================================================

import type { Persona } from '@/context/PersonaContext';
import type { PersonaOverlay } from '@/lib/persona-copy-guards';

/**
 * Copy fields on a wiring entry that are user-visible and therefore
 * subject to persona-specific voice. Structural fields (axes / modalities /
 * tiers / guardrails / slug) are invariant across personas.
 */
export interface CapabilityDepthWiringCopyFields {
  headlineSubstrateSentence: string;
  headlineGovernanceSentence: string;
}

export interface CapabilityDepthWiring extends CapabilityDepthWiringCopyFields {
  capabilitySlug: string;             // matches CAPABILITY_REGISTRY.slug
  substrateAxes: string[];            // subset of PATIENT_VECTOR_AXES.axis
  substrateModalities: string[];      // subset of EVIDENCE_MODALITIES_7.modality
  substrateTiers: string[];           // subset of EVIDENCE_TIERS_4.tier (tiers this cap emits)
  governanceGuardrails: string[];     // subset of GOVERNANCE_GUARDRAILS.slug
  personaCopy?: PersonaOverlay<CapabilityDepthWiringCopyFields>;
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
    personaCopy: {
      patient: {
        headlineSubstrateSentence:
          'When we score a candidate patient-picking rule for a trial, we do not rely on a single kind of evidence. Each rule is checked against five different biological pathways, using three separate lines of evidence: gene-knockout experiments, published clinical results, and the tumor’s own gene-expression pattern. If any one of those three does not agree, the rule is not admissible.',
        headlineGovernanceSentence:
          'If we score the same patient-picking rule tomorrow on the same tumor biology, we get the same score. Nothing about the score is opinion or drift — it is anchored to a fixed, released version of the ranking model.',
      },
      pharma: {
        headlineSubstrateSentence:
          'Every candidate gate is scored against a five-axis mechanism substrate under a locked ranker version, with CRISPR-dependency, clinical, and expression-association modalities co-required. Single-modality signals are non-admissible on the audit trail.',
        headlineGovernanceSentence:
          'Gate scoring is reproducibility-locked at the release-version level. A gate score recorded today reproduces on the same substrate tomorrow — the franchise-audit receipt is deterministic and re-runnable.',
      },
    },
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
    personaCopy: {
      patient: {
        headlineSubstrateSentence:
          'When a company has more than one drug in the same family, we can rank all of them against the same set of possible patient groups. We use two large drug-screen datasets and controlled lab experiments so the ranking is fair. That way a patient group that suits Drug A but NOT Drug B is caught before the trial is designed around the wrong drug.',
        headlineGovernanceSentence:
          'The rankings across drugs are directly comparable because every drug is scored against the same library of target populations, using the same fixed version of the ranking model.',
      },
      pharma: {
        headlineSubstrateSentence:
          'Franchise-level ranker output — every asset scored against every candidate subgroup on the same substrate library, using PRISM + GDSC pharmacologic-screen and isogenic in-vitro modality convergence. Asset-differentiated subgroups flagged pre-trial-design on the franchise-audit trail.',
        headlineGovernanceSentence:
          'Cross-asset admissibility on the franchise-fit matrix. Scores are franchise-comparable because every asset runs against the same trial-target library under the same locked ranker version — the substrate call is directly franchise-comparable.',
      },
    },
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
    personaCopy: {
      patient: {
        headlineSubstrateSentence:
          'A biomarker is a signal on the tumor that predicts whether a drug will work. When we grade one, we check three lines of evidence: what happened in clinical trials, what happened in gene-knockout lab experiments, and what happened in animal models. We then place the biomarker on a four-step scale from "insufficient evidence" to "validated." If the biomarker sits at the bottom of that scale, it is NOT shown as a recommendation.',
        headlineGovernanceSentence:
          'When a biomarker is called "validated" on our site, a real human curator has signed off on the source evidence. It is never an automatic promotion.',
      },
      pharma: {
        headlineSubstrateSentence:
          'Biomarker franchise-fit graded against a clinical + CRISPR + in-vivo modality substrate and placed on the four-tier admissibility ladder (validated / strong / mechanistic / insufficient). INSUFFICIENT-tier biomarker calls are non-admissible — the franchise-audit trail suppresses them at the surface.',
        headlineGovernanceSentence:
          'Every biomarker admissibility call carries a curator-signed tier receipt on the franchise-audit trail. Promotion to VALIDATED is a signed event, not an automatic score.',
      },
    },
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
    personaCopy: {
      patient: {
        headlineSubstrateSentence:
          'When we say "this trial can enroll roughly X patients," we do not guess. We start from the size of the disease, and then step it down using published clinical numbers and gene-expression evidence on the specific biology the drug is trying to hit. What is left is a realistic enrollment target for the trial, not a wishful marketing number.',
        headlineGovernanceSentence:
          'Every number in the funnel is traced back to its source. Any figure without a source is labeled clearly on the page as an "open assumption" — we do not hide it.',
      },
      pharma: {
        headlineSubstrateSentence:
          'Franchise-fit addressable-population funnel — the disease-wide pool is stepped down through the mechanism axes the specific asset touches, using clinical and expression-association modality evidence. The bottom of the funnel is the mechanism-aligned enrolment substrate, not a top-down TAM number.',
        headlineGovernanceSentence:
          'Every franchise-audit funnel figure carries a source receipt. Un-sourced figures render as OPEN_ASSUMPTION on the surface — no unlabeled prevalence numbers on the franchise-audit trail.',
      },
    },
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
    personaCopy: {
      patient: {
        headlineSubstrateSentence:
          'Two clinical trials in the same disease sometimes give opposite answers. When that happens, we break the difference down onto the underlying biological pathways instead of averaging the two trials. Whichever pathway shows the biggest gap between the two trials is the real biological reason the results diverged — not a statistical mirage.',
        headlineGovernanceSentence:
          'If we point at a specific reason two trials diverged today, and then re-run the analysis tomorrow, we get the same reason. The result is deterministic under a fixed model version, not something that can drift over time.',
      },
      pharma: {
        headlineSubstrateSentence:
          'Franchise-audit-grade trial-divergence decomposition — when two trials in the same indication produce opposite reads, the divergence is decomposed onto the mechanism substrate. The axis carrying the largest signed contribution difference is the mechanistic substrate call, not an ITT-averaging artifact.',
        headlineGovernanceSentence:
          'Divergence decomposition is reproducibility-locked at the release-version level. The franchise-audit receipt on today’s divergence call reproduces on tomorrow’s re-run against the same substrate.',
      },
    },
  },
];

export const getWiring = (slug: string) =>
  CAPABILITY_DEPTH_WIRING.find((w) => w.capabilitySlug === slug);

/**
 * Persona-aware selector for the two user-visible headline sentences on a
 * wiring entry. Falls back to the English root (oncologist baseline) when
 * no overlay is present for the requested persona.
 */
export function getWiringCopy(
  slug: string,
  persona: Persona,
): CapabilityDepthWiringCopyFields | undefined {
  const w = getWiring(slug);
  if (!w) return undefined;
  const overlay = w.personaCopy?.[persona];
  return {
    headlineSubstrateSentence:
      overlay?.headlineSubstrateSentence ?? w.headlineSubstrateSentence,
    headlineGovernanceSentence:
      overlay?.headlineGovernanceSentence ?? w.headlineGovernanceSentence,
  };
}
