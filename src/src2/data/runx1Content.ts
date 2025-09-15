export type TwoHitStep = {
  titleHTML: string;
  subtextHTML: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
  icon?: string;
  animated?: 'pulse' | 'spin' | 'none';
};

export type RiskPrediction = { name: string; risk: string; level: 'high' | 'medium' | 'low' };

export const runx1Content = {
  hero: {
    title: 'The RUNX1 Conquest',
    subtitle: 'How Our Agentic Platform Solved a Multi-Year Leukemia Grant In Silico',
  },
  twoHit: {
    steps: [
      { titleHTML: 'Healthy<br/>Cell', subtextHTML: 'Normal RUNX1', color: 'green' },
      { titleHTML: 'First<br/>Hit', subtextHTML: 'Inherited RUNX1<br/>Mutation', color: 'yellow', icon: '🧬' },
      { titleHTML: 'Second<br/>Hit', subtextHTML: 'Acquired Somatic<br/>Mutation', color: 'orange', icon: '💥', animated: 'spin' },
      { titleHTML: 'Leukemic<br/>Cell', subtextHTML: 'Full-Blown<br/>Leukemia', color: 'red', animated: 'pulse' },
    ] as TwoHitStep[],
    caption: "The 'two-hit' model explains disease progression; our approach starts with first-principles understanding of this pathway.",
  },
  riskMap: {
    knownThreat: { title: 'Known Genetic Risk', subtext: 'RUNX1 (First Hit)' },
    aiCore: { title: 'Zeta Oracle Analysis' },
    predictions: [
      { name: 'ASXL1', risk: '(-15k Risk)', level: 'high' },
      { name: 'TET2', risk: '(-12k Risk)', level: 'high' },
      { name: 'DNMT3A', risk: '(-9k Risk)', level: 'medium' },
    ] as RiskPrediction[],
    caption: 'We simulate likely evolutionary paths to design therapies that remain effective under resistance.',
  },
  arsenal: {
    input: 'Input: Disease Map',
    processTitle: 'Zeta Forge Engine',
    outputs: ['Gene Correction', 'Clone Elimination', 'Novel Biologics'],
    caption: 'Forge moves from analysis to creation: multi-pronged strategy generated entirely in silico.',
  },
  geneCorrection: {
    problem: { title: 'The Problem', subtext: 'RUNX1 Mutation (First Hit)' },
    outcome: { title: 'The Outcome', subtext: 'Corrected RUNX1 Gene' },
    advantages: [
      { title: 'The CrisPRO Advantage', text: 'Massive-context homology arms enable surgical precision and high efficiency.' },
      { title: 'The Industry Limitation', text: 'Short, context-unaware arms lead to low efficiency and off-target risks.' },
    ],
  },
  approval: {
    dossier: [
      { title: 'The Zeta Score', subtitle: '(Quantified Damage)' },
      { title: 'Therapeutic Blueprints', subtitle: '(AI-Designed Solutions)' },
      { title: 'In Silico Validation', subtitle: '(Predicted Efficacy & Safety)' },
    ],
    tiers: [
      { title: 'Tier 3: Case Reports' },
      { title: 'Tier 2: Cohort Studies' },
      { title: 'Tier 1: Randomized Controlled Trials (RCTs)' },
    ],
    text: 'Our Digital Dossier provides the evidence to accelerate through FDA tiers.',
  },
  commandCenter: {
    inputs: ['Genomic Data', 'Clinical Uncertainty (40% VUS)'],
    outputs: ['Validated Therapeutics', 'De-Risked Pipelines'],
    info: [
      { title: 'The Zeta Oracle (Prediction)', text: 'Understands biology to resolve uncertainty.' },
      { title: 'The Zeta Forge (Generation)', text: 'Generates in-silico candidates.' },
      { title: 'The Command Center (Orchestration)', text: 'Coordinates a complete therapeutic plan.' },
    ],
  },
} as const;

export type Runx1Content = typeof runx1Content; 