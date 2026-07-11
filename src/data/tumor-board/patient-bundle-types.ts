/**
 * Generic PatientBundle types.
 *
 * Extracted from ak-l1-bundle.ts so multiple demo patients can render through
 * the same tumor-board surface. Every patient JSON in src/data/patients/
 * conforms to PatientBundle. Field names mirror the AK bundle exactly — this
 * is a schema extraction, not a redesign.
 *
 * DEMO ONLY — every patient bundle must set meta.demoDisclaimer clarifying
 * this is rehearsal substrate, not a real clinical case.
 */

export type ConfidenceLevel = 'high' | 'moderate' | 'discovery-only';

export type Mutation = {
  gene: string;
  hgvs: string;
  chrom: string | null;
  pos: number | null;
  ref: string | null;
  alt: string | null;
  consequence: string;
  assembly: string | null;
  scoredByEvo2: boolean;
  normalizationNote?: string;
  path: string;
};

export type TumorContext = {
  cancerType: string;
  subtype?: string;
  msiStatus?: string;
  tmbStatus?: string;
  tmbMutMb?: number | null;
  pdL1Status?: string;
  pdL1Cps?: number | null;
  erStatus?: string;
  erPercent?: number | null;
  prStatus?: string;
  her2Status?: string;
  brcaGermline?: string;
  priorLines?: string[];
  completenessScore: number;
  path: string;
};

export type Completeness = {
  completenessScore: number;
  confidenceCap: number;
  missing: readonly string[];
  path: string;
};

export type BrokenPathway = {
  pathwayId: string;
  status: 'non_functional' | 'compromised' | 'functional';
  genesAffected: string[];
  disruptionScore: number;
  path: string;
};

export type EssentialPathway = {
  pathwayId: string;
  disruptionScore: number;
  description: string;
  path: string;
};

export type RecommendedDrug = {
  drugName: string;
  targetPathway: string;
  confidence: number;
  falsified: boolean;
  falsifiedReason?: string;
  path: string;
};

export type SuggestedTherapy = {
  value: string;
  path: string;
};

export type SLAxisRow = {
  axis: string;
  prodTier: string;
  simTier: string;
  manuscriptClaimType?: string;
  divergenceIntended: boolean;
  divergenceExplanation?: string;
};

export type EvidenceAnchor = {
  claim: string;
  canonicalPath: string;
  canonicalValue: string;
  scriptValue?: string;
  match: 'exact' | 'rounded' | 'positive_control';
};

export type TestNeeded = {
  test: string;
  unlocks: string;
  why: string;
};

export type SLProvenance = {
  agent: string;
  version: string;
  status: 'ok' | 'degraded' | 'error';
  syntheticLethalityDetected: boolean;
  detectionMethod: string;
  signalsUsed: readonly string[];
  trueScoringRequired: boolean;
  deltaRole: string;
  evo2CacheHits: number;
  hgvsResolutionNote?: string;
  path: string;
};

export type DoubleHit = {
  description: string;
  path: string;
};

export type PARPFalsification = {
  prodShipsToday: {
    drugName: string;
    matrixAxis: string;
    tier: string;
    bridgePolicy: string;
    behavior: string;
  };
  manuscriptSays: {
    finding: string;
    stat: string;
    conclusion: string;
    positiveControl?: {
      finding: string;
      stat: string;
      point: string;
    };
  };
  pr11Fix: {
    field: string;
    value: string;
    effect: string;
    rowKept: string;
  };
};

export type PatientMeta = {
  patientId: string;
  displayName?: string;
  contractVersion: string;
  generatedAt: string;
  requestedLevels: readonly string[];
  endpoint: string;
  demoDisclaimer: string;
};

// ---------- assembled patient bundle ----------

// Optional anchor-repo panels wired for CRC01 (Brenus) and BM01 (evo2-e2e).
// See anchor-panel-types.ts for the full type. Kept as a duck-typed record here
// to avoid a cyclic import; runtime shape validated by the extraction scripts.
export type PatientAnchorPanels = {
  crc?: unknown;
  brm?: unknown;
};

export type PatientBundle = {
  meta: PatientMeta;
  tumorContext: TumorContext;
  mutations: Mutation[];
  completeness: Completeness;
  brokenPathways: BrokenPathway[];
  essentialPathways: EssentialPathway[];
  slMatrix: SLAxisRow[];
  recommendedDrugs: RecommendedDrug[];
  suggestedTherapy: SuggestedTherapy;
  evidenceAnchors: EvidenceAnchor[];
  testsNeeded: TestNeeded[];
  slProvenance: SLProvenance;
  doubleHit: DoubleHit | null;
  parpFalsification: PARPFalsification | null;
  discoveryOnly?: boolean;
  discoveryOnlyReason?: string;
  anchorPanels?: PatientAnchorPanels;
};
