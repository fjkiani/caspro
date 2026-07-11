/** 8-axis mechanism vector — the core genomic fingerprint */
export type VectorAxes = {
  ddr: number;
  mapk: number;
  pi3k: number;
  io: number;
  vegf: number;
  her2: number;
  efflux: number;
  rss: number;
};

/** Axis metadata for display */
export type VectorAxisMeta = {
  key: keyof VectorAxes;
  label: string;
  fullName: string;
};

/** Two-layer prediction row */
export type TwoLayerPrediction = {
  layer1: 'HIGH' | 'LOW';
  layer2: 'HIGH' | 'LOW';
  prediction: string;
  isTarget: boolean;
};

/** Gate result */
export type GateResult = {
  id: number;
  label: string;
  condition: string;
  result: string;
  pass: boolean;
};

/** Diagnostic log entry */
export type DiagnosticEntry = {
  time: string;
  message: string;
  level: 'info' | 'warn' | 'success' | 'system' | 'error';
};

/** Artifact chain of custody entry */
export type ArtifactEntry = {
  doc: string;
  path: string;
  /** Public artifact URL — omit when receipt is metadata-only (no file link) */
  slug?: string;
  type: 'json' | 'py' | 'mdc' | 'md';
  status: 'LOCKED' | 'VERIFIED' | 'PENDING';
  /** Inline receipt body when the file is local-only or not linked */
  summary?: string;
};

/** Playbook protocol step */
export type PlaybookStep = {
  title: string;
  desc: string;
};

/** Score metric card */
export type ScoreMetric = {
  label: string;
  value: string;
  subtext: string;
  color: 'cyan' | 'rose';
};

/** Root cause failure thesis */
export type RootCause = {
  summary: string;
  failureKeyword: string;
  statusQuo: string;
  statusQuoLabel: string;
  intercept: string;
  interceptLabel: string;
};

/**
 * Ranked-glyph MoA row — data-driven substitute for numeric cosine deltas.
 * One row per active axis. `magnitude` maps to a bar length bucket; no raw
 * numbers are ever surfaced to the UI (governance: vague-safe canon).
 */
export type MoaGlyphRow = {
  axis: keyof VectorAxes;
  /** 'responder' = axis engaged toward responder archetype; 'non-responder' = away from it. */
  direction: 'responder' | 'non-responder';
  magnitude: 'strongest' | 'strong' | 'moderate' | 'minimal' | 'trace';
  /** Optional one-line explanation surfaced in a tooltip / caption */
  note?: string;
};

/**
 * Published trial readout — replaces the LATIFY-hardcoded "HR 0.90 / P 0.287" strip.
 * Every case file MUST supply this so the shared template is fully data-driven.
 */
export type PublishedReadout = {
  /** Short banner label, e.g. "The Futility:" or "The Subgroup:" or "The Positive Control:" */
  headlineLabel: string;
  /** Bold statistic, e.g. "HR 0.90 / P 0.287" or "ORR 40% RS-Low" */
  headlineValue: string;
  /** Tone of the headline value */
  tone: 'negative' | 'positive' | 'mixed' | 'gated';
  /** Small label for the observed-endpoint chip (e.g. "Observed HR", "Observed ORR") */
  endpointLabel: string;
  /** Value shown in the chip (e.g. "0.90", "40%"). Free-text: no numeric parsing done. */
  endpointValue: string;
};

/**
 * Verdict displayed in the mechanism-fit panel. Replaces the hardcoded
 * "FAILURE_PREDICTED" and drives its color band from `tone`.
 */
export type TrialVerdict = {
  label: string;
  tone: 'negative' | 'positive' | 'mixed' | 'gated';
  caption?: string;
};

/** Commercial impact math */
export type CommercialImpact = {
  targetPopulation: string;
  populationUnit: string;
  annualSavings: string;
  savingsUnit: string;
  closingStatement: string;
};

export interface TrialCaseFile {
  id: string;
  caseNumber: string;
  trialId: string;
  sponsor: string;
  phase: string;
  cancer: string;
  drug: string;
  comparator: string;
  enrolled: number;
  primaryEndpoint: string;
  title: string;
  drugLine: string;
  sources: string[];
  rootCause: RootCause;
  responderLabel: string;
  nonResponderLabel: string;
  responderVector: VectorAxes;
  nonResponderVector: VectorAxes;
  trialVector: VectorAxes;
  cosineResponder: number;
  cosineITT: number;
  deltaImpact: string;
  vectorFlags: string[];
  scores: ScoreMetric[];
  engineRun: {
    trialsScored: number;
    responderScore: number;
    responderRank: number;
    nonResponderScore: number;
    nonResponderRank: number;
    delta: number;
    receiptFile: string;
    receiptDate: string;
  };
  gates: GateResult[];
  gatesSummary: string;
  biologySummary: string;
  biologyCascade: string[];
  playbook: PlaybookStep[];
  artifacts: ArtifactEntry[];
  commercial: CommercialImpact;
  diagnosticLog: DiagnosticEntry[];
  oneLiner: string;
  validationTier: string;
  validationStrength: string;
  /**
   * Ranked-glyph MoA rows — governance-safe substitute for numeric cosine
   * fits. Optional so older records that predate the field still compile;
   * the template treats absence as "hide the MoA strip".
   */
  moaGlyphs?: MoaGlyphRow[];
  /**
   * Published readout headline (replaces the LATIFY-hardcoded HR strings).
   * Optional so older records still compile; the template falls back to
   * `primaryEndpoint` when this is absent.
   */
  publishedReadout?: PublishedReadout;
  /**
   * Verdict badge shown in the mechanism-fit panel. Optional; template
   * falls back to a gated placeholder when absent.
   */
  verdict?: TrialVerdict;
  /**
   * Brenus registry v2 8D decode overlay — pulled by NCT match from
   * src/data/brenus/trial-decode-registry.ts. Optional so hand-authored
   * files that predate the overlay still compile; consumers should render
   * "NOT_DECODED" when this is absent.
   * SOURCE: Fahad Kiani directive 2026-07-10.
   */
  brenusDecode?: import('../brenus/trial-decode-registry').BrenusTrialDecoded;
}
