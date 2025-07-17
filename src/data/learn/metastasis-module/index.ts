// Module 2: Understanding Cancer Metastasis - Data Index

export interface MetastasisTopic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  clinicalRelevance: string;
}

export interface TherapeuticApproach {
  id: string;
  name: string;
  mechanism: string;
  targets: string[];
  clinicalStatus: string;
  effectiveness: string;
  limitations: string[];
}

export interface MetastasisStatistic {
  category: string;
  value: string;
  description: string;
  source: string;
}

// Core metastasis topics for Module 2
export const metastasisTopics: MetastasisTopic[] = [
  {
    id: 'introduction',
    title: 'Introduction to Metastasis',
    description: 'Understanding the fundamental concepts and clinical significance of cancer metastasis',
    keyPoints: [
      'Metastasis accounts for 90% of cancer deaths',
      'It is a multi-step process requiring multiple cellular capabilities',
      'Only a small fraction of cancer cells successfully metastasize',
      'Understanding metastasis is key to preventing cancer deaths'
    ],
    clinicalRelevance: 'Early detection and prevention of metastasis can dramatically improve patient outcomes'
  },
  {
    id: 'cascade',
    title: 'The Metastatic Cascade',
    description: 'A detailed exploration of the 8-step process of metastatic progression',
    keyPoints: [
      'Each step represents a potential therapeutic target',
      'The process is highly inefficient with high attrition',
      'Different cancer types favor different pathways',
      'Understanding each step enables precision intervention'
    ],
    clinicalRelevance: 'Targeting specific steps can prevent or delay metastatic progression'
  },
  {
    id: 'mechanisms',
    title: 'Molecular Mechanisms',
    description: 'The key biological processes that enable metastatic spread',
    keyPoints: [
      'EMT enables cell mobility and invasion',
      'Angiogenesis provides vascular access',
      'Immune evasion allows survival in circulation',
      'Dormancy can lead to late recurrences'
    ],
    clinicalRelevance: 'Understanding mechanisms guides therapeutic target selection'
  },
  {
    id: 'organ-tropism',
    title: 'Organ-Specific Metastasis',
    description: 'Why certain cancers preferentially metastasize to specific organs',
    keyPoints: [
      'Seed and soil hypothesis explains organ preference',
      'Molecular signatures determine tropism',
      'Vascular anatomy influences distribution',
      'Microenvironment compatibility is crucial'
    ],
    clinicalRelevance: 'Predicting metastatic sites enables targeted surveillance and prevention'
  },
  {
    id: 'clinical-cases',
    title: 'Clinical Case Studies',
    description: 'Real-world examples of metastatic progression and management',
    keyPoints: [
      'Case studies illustrate key concepts',
      'Different cancers have distinct patterns',
      'Treatment approaches vary by site',
      'Early intervention improves outcomes'
    ],
    clinicalRelevance: 'Clinical experience guides evidence-based treatment decisions'
  },
  {
    id: 'therapeutics',
    title: 'Therapeutic Strategies',
    description: 'Current and emerging approaches to prevent and treat metastasis',
    keyPoints: [
      'Prevention is more effective than treatment',
      'Combination approaches target multiple steps',
      'Personalized therapy based on tumor genetics',
      'Emerging technologies offer new hope'
    ],
    clinicalRelevance: 'Comprehensive therapeutic strategies can prevent metastatic progression'
  }
];

// Therapeutic approaches for metastasis
export const therapeuticApproaches: TherapeuticApproach[] = [
  {
    id: 'anti-angiogenic',
    name: 'Anti-Angiogenic Therapy',
    mechanism: 'Inhibits blood vessel formation to starve tumors',
    targets: ['VEGF', 'VEGFR', 'Angiopoietins'],
    clinicalStatus: 'FDA approved for multiple cancers',
    effectiveness: 'Moderate - extends progression-free survival',
    limitations: ['Resistance development', 'Limited overall survival benefit', 'Toxicity concerns']
  },
  {
    id: 'emt-inhibitors',
    name: 'EMT Inhibitors',
    mechanism: 'Prevents epithelial-mesenchymal transition',
    targets: ['TGF-β', 'Snail/Slug', 'Wnt signaling'],
    clinicalStatus: 'Preclinical and early clinical trials',
    effectiveness: 'Promising in preclinical models',
    limitations: ['Limited clinical data', 'Potential for normal tissue toxicity', 'Complex pathway targeting']
  },
  {
    id: 'immunotherapy',
    name: 'Immune Checkpoint Inhibitors',
    mechanism: 'Enhances immune system recognition of cancer cells',
    targets: ['PD-1/PD-L1', 'CTLA-4', 'LAG-3'],
    clinicalStatus: 'FDA approved for multiple cancers',
    effectiveness: 'High - durable responses in subset of patients',
    limitations: ['Response limited to subset of patients', 'Immune-related adverse events', 'Primary and acquired resistance']
  },
  {
    id: 'bone-targeting',
    name: 'Bone-Targeting Agents',
    mechanism: 'Prevents bone destruction and cancer cell growth in bone',
    targets: ['Osteoclasts', 'RANKL', 'Bone matrix'],
    clinicalStatus: 'FDA approved for bone metastases',
    effectiveness: 'High - reduces skeletal events',
    limitations: ['Site-specific efficacy', 'Osteonecrosis risk', 'Limited effect on survival']
  },
  {
    id: 'ctc-targeting',
    name: 'Circulating Tumor Cell Targeting',
    mechanism: 'Eliminates cancer cells in circulation',
    targets: ['CTCs', 'CTC clusters', 'Metastatic stem cells'],
    clinicalStatus: 'Experimental - early clinical trials',
    effectiveness: 'Unknown - early stage development',
    limitations: ['Technical challenges', 'Limited clinical data', 'Heterogeneity of CTCs']
  }
];

// Key statistics about metastasis
export const metastasisStatistics: MetastasisStatistic[] = [
  {
    category: 'Mortality',
    value: '90%',
    description: 'Percentage of cancer deaths caused by metastasis',
    source: 'Chaffer & Weinberg, Science 2011'
  },
  {
    category: 'Efficiency',
    value: '<0.01%',
    description: 'Percentage of circulating tumor cells that successfully metastasize',
    source: 'Fidler, Nature Reviews Cancer 2003'
  },
  {
    category: 'Timeline',
    value: '5-20 years',
    description: 'Potential dormancy period before metastatic reactivation',
    source: 'Aguirre-Ghiso, Nature Reviews Cancer 2007'
  },
  {
    category: 'Survival Impact',
    value: '5-fold decrease',
    description: 'Reduction in 5-year survival rates with metastatic disease',
    source: 'SEER Cancer Statistics Review'
  },
  {
    category: 'Economic Burden',
    value: '$200 billion',
    description: 'Annual cost of metastatic cancer care in the US',
    source: 'National Cancer Institute 2020'
  }
];

// Learning objectives for Module 2
export const learningObjectives = [
  'Understand the multi-step process of metastatic progression',
  'Identify key molecular mechanisms enabling metastasis',
  'Recognize organ-specific metastatic patterns and their clinical implications',
  'Analyze real clinical cases of metastatic disease',
  'Evaluate current and emerging therapeutic strategies',
  'Apply knowledge to predict and prevent metastatic progression'
];

// Module 2 prerequisites
export const prerequisites = [
  'Basic understanding of cell biology',
  'Familiarity with cancer hallmarks',
  'Knowledge of tumor microenvironment',
  'Understanding of cancer genetics'
]; 