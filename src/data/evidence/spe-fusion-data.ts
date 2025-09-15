export interface SPECapability {
  title: string;
  status: 'live' | 'roadmap';
  technical: string;
  scientific: string;
  business: string;
  genomicUseCases: string;
  icon: string;
  color: string;
}

export interface SPEValueProp {
  audience: string;
  icon: string;
  points: string[];
}

export interface SPEData {
  id: string;
  hero: {
    title: string;
    subtitle: string;
    vision: string;
    description?: string;
    badges?: Array<{
      text: string;
      color: string;
    }>;
  };
  interactiveDemo?: {
    component: string;
    title: string;
    description: string;
    features: string[];
    instructions?: string[];
  };
  valueProps: SPEValueProp[];
  capabilities: SPECapability[];
  whyItMatters?: string[];
  whatWeDeliver?: string[];
  callToAction?: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
  conclusion: string;
}

export const speFusionData: SPEData = {
  id: 'spe-fusion',
  hero: {
    title: "S/P/E Fusion: Unified Variant Interpretation",
    subtitle: "Integrate Structure, Phenotype, and Expression data for a comprehensive, multi-dimensional view of variant impact. Go beyond single-metric scores to a unified, biologically-grounded conclusion.",
    vision: "To transform disparate data points into a single, coherent evidence story. We fuse structural, phenotypic, and expression data to deliver a clear, confident, and complete picture of variant function (RUO).",
    description: "Go beyond single-metric scores to a unified, biologically-grounded conclusion. Transform disparate data points into a single, coherent evidence story.",
    badges: [
      { text: '95.0% BRCA AUROC', color: 'bg-green-100 text-green-700' },
      { text: '95.7% ClinVar validation', color: 'bg-blue-100 text-blue-700' },
      { text: 'Multi-dimensional analysis', color: 'bg-purple-100 text-purple-700' }
    ]
  },

  interactiveDemo: {
    component: 'SPEFusionPlayground',
    title: 'Try S/P/E Fusion Live',
    description: 'Select real genetic variants and watch our AI analyze Structure + Phenotype + Expression in real-time',
    features: [
      'Live variant analysis',
      'Multi-dimensional scoring', 
      'Clinical recommendations'
    ],
    instructions: [
      'Pick a variant from the dropdown',
      'Watch the analysis run in real-time',
      'Explore the results across different tabs',
      'See clinical recommendations and confidence scores'
    ]
  },

  whyItMatters: [
    'Get a single, unified view of variant impact across multiple biological dimensions.',
    'Transform ambiguous data points into a clear, confident, and coherent evidence story.',
    'Move beyond single-metric scores to a holistic, biologically-grounded conclusion.'
  ],

  whatWeDeliver: [
    'Integrated analysis of Structure, Phenotype, and Expression data.',
    'Clear, auditable evidence trail for every prediction.',
    'Actionable insights for therapeutic consideration (RUO).'
  ],
  valueProps: [
    {
      audience: 'For Scientists',
      icon: 'Lightbulb',
      points: [
        '**Holistic View:** See how structural changes, phenotypic outcomes, and expression levels connect.',
        '**Confidence, Not Confusion:** Get a single, clear hypothesis with supporting evidence from all three data modalities.',
        '**Biologically Grounded:** Understand the *why* behind a variant\'s impact, not just the score.'
      ]
    },
    {
      audience: 'For Clinicians (RUO)',
      icon: 'Shield',
      points: [
        '**Actionable Insights:** Translate complex data into a clear starting point for therapeutic consideration.',
        '**Auditable Evidence:** Every conclusion is backed by a clear trail of evidence from each data source.',
        '**Reduce Uncertainty:** Move VUS-level ambiguity toward a clear, defensible position.'
      ]
    }
  ],
  capabilities: [
    {
      title: "Structural Analysis (S)",
      status: "live",
      technical: "Leverages AlphaFold 3 for protein structure prediction and analyzes variant impact on 3D conformation, stability, and binding sites.",
      scientific: "Connects genetic variation to concrete changes in protein machinery, explaining functional impact.",
      business: "De-risk targets early by identifying variants that fundamentally break protein function.",
      genomicUseCases: "1. **Predict** protein folding changes.\n2. **Analyze** impacts on ligand binding.\n3. **Identify** disruptions to protein-protein interactions.",
      icon: "Database",
      color: "text-blue-400"
    },
    {
      title: "Phenotypic Correlation (P)",
      status: "live",
      technical: "Integrates data from ClinVar, preclinical studies, and real-world evidence to correlate variants with observed phenotypic outcomes.",
      scientific: "Grounds in-silico predictions in real-world biological and clinical consequences.",
      business: "Increase confidence in therapeutic hypotheses by linking them to validated outcomes.",
      genomicUseCases: "1. **Correlate** variants with clinical outcomes.\n2. **Integrate** with cohort data for population-level insights.\n3. **Tier** evidence based on study strength.",
      icon: "Users",
      color: "text-teal-400"
    },
    {
      title: "Expression & Splicing (E)",
      status: "live",
      technical: "Utilizes Enformer and SpliceAI to predict how non-coding and splice-site variants affect gene expression and RNA processing.",
      scientific: "Reveals the functional impact of variants outside of coding regions, a traditional blind spot.",
      business: "Unlock new therapeutic targets by understanding the full regulatory landscape.",
      genomicUseCases: "1. **Predict** impact on gene expression levels.\n2. **Identify** cryptic splice sites.\n3. **Analyze** effects on regulatory element binding.",
      icon: "BarChart3",
      color: "text-purple-400"
    }
  ],

  callToAction: {
    title: 'Ready to See S/P/E Fusion in Action?',
    description: 'Experience a unified, multi-dimensional approach to variant interpretation.',
    primaryButton: 'Explore Data Lab',
    secondaryButton: 'View SAE Intelligence'
  },

  conclusion: "S/P/E Fusion delivers a clear, confident, and complete picture of variant function by integrating structural, phenotypic, and expression data into a single, auditable evidence story (RUO)."
};
