/**
 * Capability computation for patient-driven surfaces.
 *
 * A surface's tabs / panels appear iff the corresponding bundle field is
 * populated. This lets Tumor Board, Synthetic Lethality, Mechanism Alignment,
 * and Target Lock render only what the patient actually has — no stubs, no
 * "not available for this patient" placeholder cards.
 *
 * Every capability is a pure function of the PatientBundle. Nothing is
 * inferred, nothing is heuristic — presence in the bundle is truth.
 */

import type { PatientBundle } from '@/data/tumor-board/patient-bundle-types';

// ---------------------------------------------------------------------------
// Public capability shape
// ---------------------------------------------------------------------------

export type SurfaceCapabilities = {
  /** patient has any driver mutations recorded */
  hasMutations: boolean;
  /** patient has broken-machinery pathway rows */
  hasBrokenPathways: boolean;
  /** patient has essential-pathway rows */
  hasEssentialPathways: boolean;
  /** patient has an SL matrix with at least one row */
  hasSlMatrix: boolean;
  /** patient has any recommended-drug rows */
  hasRecommendedDrugs: boolean;
  /** patient has a suggested-therapy first-line entry */
  hasSuggestedTherapy: boolean;
  /** patient has literature receipt anchors */
  hasEvidenceAnchors: boolean;
  /** patient has any tests-needed gaps declared */
  hasTestsNeeded: boolean;
  /** patient has an SL provenance block */
  hasProvenance: boolean;
  /** patient has a double-hit summary */
  hasDoubleHit: boolean;
  /** patient has a PARP falsification arc — currently AK01 only */
  hasParpFalsification: boolean;
  /** patient has a completeness ceiling declared */
  hasCompleteness: boolean;
  /** patient carries a CRC anchor panel (Brenus) — currently CRC01 only */
  hasCrcAnchor: boolean;
  /** patient carries a BrM anchor panel (evo2-e2e) — currently BM01 only */
  hasBrmAnchor: boolean;
  /** patient's SL matrix has at least one row flagged divergenceIntended */
  hasIntendedDivergence: boolean;
  /** patient's recommendedDrugs has at least one falsified=true row */
  hasFalsifiedDrug: boolean;
  /** patient has any SL axis at "Validated SL therapeutic lever" tier */
  hasValidatedSlAxis: boolean;
  /** patient is flagged as discovery-only (top-of-page banner) */
  isDiscoveryOnly: boolean;
};

// ---------------------------------------------------------------------------
// Compute
// ---------------------------------------------------------------------------

export function getCapabilities(p: PatientBundle): SurfaceCapabilities {
  const mutations = p.mutations ?? [];
  const brokenPathways = p.brokenPathways ?? [];
  const essentialPathways = p.essentialPathways ?? [];
  const slMatrix = p.slMatrix ?? [];
  const recommendedDrugs = p.recommendedDrugs ?? [];
  const evidenceAnchors = p.evidenceAnchors ?? [];
  const testsNeeded = p.testsNeeded ?? [];

  return {
    hasMutations: mutations.length > 0,
    hasBrokenPathways: brokenPathways.length > 0,
    hasEssentialPathways: essentialPathways.length > 0,
    hasSlMatrix: slMatrix.length > 0,
    hasRecommendedDrugs: recommendedDrugs.length > 0,
    hasSuggestedTherapy: Boolean(p.suggestedTherapy?.value),
    hasEvidenceAnchors: evidenceAnchors.length > 0,
    hasTestsNeeded: testsNeeded.length > 0,
    hasProvenance: Boolean(p.slProvenance),
    hasDoubleHit: p.doubleHit !== null && p.doubleHit !== undefined,
    hasParpFalsification: p.parpFalsification !== null && p.parpFalsification !== undefined,
    hasCompleteness: Boolean(p.completeness),
    hasCrcAnchor: Boolean(p.anchorPanels?.crc),
    hasBrmAnchor: Boolean(p.anchorPanels?.brm),
    hasIntendedDivergence: slMatrix.some((row) => row.divergenceIntended === true),
    hasFalsifiedDrug: recommendedDrugs.some((d) => d.falsified === true),
    hasValidatedSlAxis: slMatrix.some(
      (row) => row.prodTier === 'Validated SL therapeutic lever'
    ),
    isDiscoveryOnly: p.discoveryOnly === true,
  };
}

// ---------------------------------------------------------------------------
// Convenience — return only the boolean names of capabilities the patient has.
// Useful when a surface needs to enumerate present features (e.g. for a
// "capabilities strip" that shows what's live for this patient).
// ---------------------------------------------------------------------------

export function presentCapabilities(caps: SurfaceCapabilities): string[] {
  return Object.entries(caps)
    .filter(([, present]) => present === true)
    .map(([name]) => name);
}
