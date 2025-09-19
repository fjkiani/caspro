export interface Dossier {
  header: DossierHeader;
  executiveSummary: ExecutiveSummary;
  saeIntelligence: SAEIntelligence;
  speFusion: SPEFusion;
  cohortContext: CohortContext;
  dataLab: DataLab;
  clinicalTrials: ClinicalTrialMatch;
}

export interface DossierHeader {
  variant: string;
  gene: string;
  runId: string;
  engines: string[];
  precision: number;
}

export interface ExecutiveSummary {
  catastrophicError: {
    verdict: string;
    confidence: number;
    deltaLogLikelihood: number;
    api: string;
    evidence: string;
  };
  criticalDependency: {
    geneEssentiality: string;
    syntheticLethality: boolean;
    depMapCorrelation: number;
    api: string;
    evidence: string;
  };
  conclusion: {
    title: string;
    details: string;
  };
}

export interface SAEIntelligence {
  title: string;
  subtitle: string;
  totalFeatures: number;
  activeFeatures: SAEFeature[];
  disruptionAnalysis: {
    cumulativeScore: number;
  };
  methodology: {
    layer: number;
    concepts: string[];
    metric: string;
  };
}

export interface SAEFeature {
  id: string;
  label: string;
  type: 'exon' | 'tfbs' | 'structure' | 'motif';
  position: number;
  strength: number;
  description: string;
  deltaLL: number;
  biologicalImpact: string;
}

export interface SPEFusion {
  title: string;
  subtitle: string;
  sequence: {
    deltaThreshold: number;
    contextWindow: number;
    consistency: number;
    hotspotAware: boolean;
  };
  pathway: {
    topPathways: { name: string; weight: number; moa: string }[];
    coverage: number;
    cooperation: number;
    accuracy: number;
  };
  evidence: {
    clinvarAUROC: number;
    splicevardbAUROC: number;
    tierPromotions: string;
    evidenceTier: string;
  };
  integratedResult: {
    sequenceConfidence: number;
    pathwayAlignments: number;
    evidenceLevel: string;
  };
}

export interface CohortContext {
  title: string;
  subtitle: string;
  cohorts: CohortData[];
}

export interface CohortData {
  id: string;
  name: string;
  population: string;
  size: number;
  riskStratification: 'high' | 'moderate' | 'low';
  // Add other fields as needed from the hardcoded data
}

export interface DataLab {
  title: string;
  subtitle: string;
  browserTitle: string;
  browserSubtitle: string;
}

export interface ClinicalTrialMatch {
  title: string;
  subtitle: string;
  eligibility: { criterion: string; status: string; confidence?: number }[];
  recommendations: { trial: string; likelihood: string; details: string }[];
  conclusion: {
    title: string;
    points: string[];
    finalVerdict: string;
  };
  actions: { label: string; link?: string; }[];
  researchUseNotice: string;
}

