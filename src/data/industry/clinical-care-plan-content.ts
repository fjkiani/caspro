// Clinical Care Plan Content - Aligned with MOAT Capabilities
// Based on ADVANCED_CARE_PLAN_UNIVERSAL.md and MOAT documentation

export interface MOATCapability {
  id: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  demo: string;
  metrics: {
    [key: string]: number | string;
  };
  apis?: string[];
}

export interface CarePlanContent {
  hero: {
    title: string;
    subtitle: string;
    metrics: Array<{
      value: string;
      label: string;
      subtitle: string;
    }>;
  };
  completeCarePlanVision: {
    title: string;
    description: string;
    components: string[];
  };
  moatCapabilities: MOATCapability[];
  universalPlatform: {
    title: string;
    description: string;
    cancerTypes: string[];
    biomarkers: string[];
  };
  honestFraming: {
    title: string;
    validated: string[];
    notValidated: string[];
  };
}

export const clinicalCarePlanContent: CarePlanContent = {
  hero: {
    title: 'From VUS Uncertainty to Complete Care Plans',
    subtitle: 'One system that handles everything: variant interpretation, drug ranking, resistance prediction, toxicity prevention, and trial matching',
    metrics: [
      { value: '73%', label: 'VUS Resolution', subtitle: 'Uncertain → Actionable' },
      { value: '100%', label: 'Top-5 Drug Accuracy', subtitle: 'Validated on 17 patients' },
      { value: '6 months', label: 'Early Resistance Detection', subtitle: 'Before imaging' },
      { value: 'Universal', label: 'Any Cancer Type', subtitle: 'Not just ovarian' },
    ],
  },
  
  completeCarePlanVision: {
    title: 'The Complete Care Plan Vision',
    description: "We're building a GPS navigation system for cancer treatment - it doesn't just tell you where to go, it predicts traffic (resistance), suggests alternate routes (combinations), warns about road hazards (toxicity), and recalculates when you take a wrong turn (progression).",
    components: [
      'Anticipates resistance',
      'Recommends combinations',
      'Monitors continuously',
      'Prevents toxicity',
      'Adapts to progression',
    ],
  },
  
  moatCapabilities: [
    {
      id: 'resolve-genetic-uncertainty',
      title: 'Resolve Genetic Uncertainty',
      problem: '40% VUS rate paralyzes clinical decisions',
      solution: '73% VUS resolution with zero-shot prediction',
      outcome: 'Same-day clinical decisions vs 6 weeks',
      demo: 'VUSResolutionDemo',
      metrics: { auroc: 0.957, vusResolution: 0.73 },
      apis: ['/predict_variant_impact'],
    },
    {
      id: 'match-patients-to-therapies',
      title: 'Match Patients to Therapies',
      problem: 'No guidelines for rare genetic combinations',
      solution: 'S/P/E Framework (100% Top-5 accuracy)',
      outcome: 'Pathway-based drug ranking',
      demo: 'SPEFusionPlayground',
      metrics: { top5Accuracy: 1.0, validatedPatients: 17 },
      apis: ['/api/will_it_work_for_me'],
    },
    {
      id: 'predict-resistance',
      title: 'Predict Resistance Before It Happens',
      problem: 'React to resistance after it develops',
      solution: 'MAPK/NF1 = 2x resistance risk (validated)',
      outcome: '6 months early detection',
      demo: 'ResistanceDetectionDemo',
      metrics: { relativeRisk: 1.97, validatedPatients: 469 },
      apis: ['/api/agents/resistance_prediction'],
    },
    {
      id: 'prevent-toxicity',
      title: 'Prevent Toxicity Before It Happens',
      problem: 'Life-threatening drug reactions',
      solution: 'Toxicity-aware nutrition (THE PATIENT MOAT)',
      outcome: 'Your carboplatin + BRCA1 = NAC helps',
      demo: 'ToxicityPredictionDemo',
      metrics: { pgxCoverage: 1.0 },
      apis: ['/api/agents/toxicity_prediction'],
    },
    {
      id: 'match-trials',
      title: 'Match Patients to Clinical Trials',
      problem: 'Generic trial search returns 50-100 trials',
      solution: 'Mechanism-based trial matching',
      outcome: 'Your DDR burden (0.88) + these PARP+ATR trials (0.92 fit)',
      demo: 'ClinicalTrialsMatcher',
      metrics: { matchAccuracy: 0.966 },
      apis: ['/api/trials/advanced-query'],
    },
    {
      id: 'synthetic-lethality',
      title: 'Identify Synthetic Lethality Vulnerabilities',
      problem: "Don't know which drugs target vulnerabilities",
      solution: 'Identify double-hit vulnerabilities',
      outcome: 'HR pathway loss → depends on PARP → PARP inhibitors',
      demo: 'SyntheticLethalityDemo',
      metrics: { drugMatchAccuracy: 0.50 },
      apis: ['/api/agents/synthetic_lethality'],
    },
  ],
  
  universalPlatform: {
    title: 'The Universal Platform',
    description: 'Works for ANY cancer type, not just ovarian',
    cancerTypes: ['Ovarian', 'Breast', 'Colorectal', 'Melanoma', 'Multiple Myeloma'],
    biomarkers: ['CA-125', 'PSA', 'CEA', 'AFP', 'hCG'],
  },
  
  honestFraming: {
    title: 'Honest Framing: What We Can and Cannot Do',
    validated: [
      'Drug ranking accuracy: 100% Top-5 (validated)',
      'Resistance prediction: 2x risk (validated on 469 patients)',
      'VUS resolution: 73% (validated)',
    ],
    notValidated: [
      'Outcome prediction: NOT VALIDATED (r=0.037 with PFS)',
      'Response rate prediction: Mechanism alignment ≠ clinical response',
    ],
  },
};

// Synthetic Lethality specific content
export const syntheticLethalityContent = {
  title: 'Identify Synthetic Lethality Vulnerabilities',
  description: 'Find double-hit vulnerabilities where cancer depends on backup pathways. When HR pathway is lost, cancer depends on PARP - we identify these dependencies and recommend precision drugs.',
  problem: {
    title: "Don't Know Which Drugs Target Vulnerabilities",
    description: 'Traditional approaches rely on standard biomarkers. We identify pathway dependencies that create therapeutic vulnerabilities.',
  },
  solution: {
    title: 'Double-Hit Vulnerability Detection',
    description: 'When one pathway is broken (e.g., HR), cancer becomes dependent on backup pathways (e.g., PARP). We identify these dependencies and recommend drugs that target the essential backup.',
    process: [
      'Score gene essentiality with Evo2',
      'Map broken pathways (HR, BER, MMR, etc.)',
      'Identify essential backup pathways',
      'Recommend drugs targeting essential pathways',
    ],
  },
  example: {
    scenario: 'BRCA1 mutation (HR pathway loss)',
    analysis: 'HR pathway loss → depends on PARP → PARP inhibitors',
    drugs: ['Olaparib', 'Rucaparib', 'Niraparib'],
    rationale: 'BRCA1 loss creates HR deficiency. Cancer becomes dependent on PARP-mediated repair. PARP inhibitors trap PARP, creating lethal DNA damage in HR-deficient cells.',
  },
  validation: {
    drugMatchAccuracy: 0.50, // 50% drug match accuracy (pilot benchmark)
    evo2Usage: 1.0, // 100% Evo2 usage
    pathways: ['HR', 'BER', 'MMR', 'Checkpoint', 'MAPK', 'PARP'],
  },
  knownRelationships: [
    { broken: 'HR pathway', dependsOn: 'PARP', drugs: ['PARP inhibitors'] },
    { broken: 'BER pathway', dependsOn: 'HR', drugs: ['PARP inhibitors'] },
    { broken: 'Checkpoint', dependsOn: 'ATR/CHK1', drugs: ['ATR inhibitors', 'CHK1 inhibitors'] },
    { broken: 'MMR pathway', dependsOn: 'Immune checkpoint', drugs: ['PD-1/PD-L1 inhibitors'] },
  ],
};

// Resistance Prediction specific content (aligned with ADVANCED_CARE_PLAN_RESISTANCE_PREDICTION.md)
export const resistancePredictionContent = {
  title: 'Predict Resistance Before It Happens',
  description: 'MAPK/NF1 mutations = 2x platinum resistance risk. Validated on 469 TCGA ovarian cancer patients. Detect resistance 6 months before imaging confirmation.',
  validated: {
    relativeRisk: 1.97, // 2x resistance risk
    validatedPatients: 469,
    dataset: 'TCGA ovarian cancer',
    resistanceRates: {
      mutated: 0.286, // 28.6%
      wildtype: 0.145, // 14.5%
    },
  },
  mapkGenes: ['KRAS', 'NRAS', 'BRAF', 'NF1', 'MAP2K1', 'MAP2K2'],
  earlyDetection: {
    timeframe: '6 months',
    method: 'CA-125 kinetics + pathway analysis',
    benefit: 'Early intervention before treatment failure',
  },
};


