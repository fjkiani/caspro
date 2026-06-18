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
}
