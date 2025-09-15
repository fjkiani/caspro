// Sample Variant Data for Homepage Simulations
// Based on Homepage Simulation Transformation Doctrine

export interface VariantExample {
  id: string;
  name: string;
  description: string;
  variant: string;
  gene: string;
  region: 'coding' | 'noncoding' | 'regulatory';
  assembly?: string;
  context?: string;
  expectedResults: {
    pathogenicity: number;
    confidence: number;
    classification: 'Pathogenic' | 'Likely Pathogenic' | 'Benign' | 'Likely Benign' | 'VUS';
    deltaLikelihood: number;
  };
  clinicalRelevance: string;
  useCases: string[];
}

// BRCA1/BRCA2 Examples - Hereditary Breast Cancer
export const BRCA_VARIANTS: VariantExample[] = [
  {
    id: 'brca1-pathogenic',
    name: 'BRCA1 Pathogenic Mutation',
    description: 'Classic pathogenic BRCA1 variant associated with hereditary breast cancer',
    variant: 'chr17:43044295:A>T',
    gene: 'BRCA1',
    region: 'coding',
    assembly: 'GRCh38',
    context: 'breast-cancer',
    expectedResults: {
      pathogenicity: 0.89,
      confidence: 0.94,
      classification: 'Likely Pathogenic',
      deltaLikelihood: -2.34
    },
    clinicalRelevance: 'High-risk for breast and ovarian cancer. Indicates need for enhanced screening and risk-reducing interventions.',
    useCases: ['Hereditary cancer screening', 'Risk assessment', 'Treatment selection', 'Family counseling']
  },
  {
    id: 'brca2-pathogenic',
    name: 'BRCA2 Pathogenic Mutation',
    description: 'Pathogenic BRCA2 variant with high penetrance for breast cancer',
    variant: 'chr13:32315086:G>A',
    gene: 'BRCA2',
    region: 'coding',
    assembly: 'GRCh38',
    context: 'breast-cancer',
    expectedResults: {
      pathogenicity: 0.92,
      confidence: 0.96,
      classification: 'Pathogenic',
      deltaLikelihood: -3.12
    },
    clinicalRelevance: 'Established pathogenic variant with high penetrance for breast cancer in both males and females.',
    useCases: ['Hereditary cancer screening', 'Male breast cancer risk', 'Pancreatic cancer risk', 'Treatment planning']
  },
  {
    id: 'brca1-vus',
    name: 'BRCA1 VUS Resolution',
    description: 'Variant of Uncertain Significance resolved to Likely Benign',
    variant: 'chr17:43045677:C>T',
    gene: 'BRCA1',
    region: 'coding',
    assembly: 'GRCh38',
    context: 'breast-cancer',
    expectedResults: {
      pathogenicity: 0.23,
      confidence: 0.87,
      classification: 'Likely Benign',
      deltaLikelihood: 0.45
    },
    clinicalRelevance: 'VUS resolved to Likely Benign, reducing patient anxiety and avoiding unnecessary interventions.',
    useCases: ['VUS resolution', 'Clinical decision support', 'Genetic counseling', 'Risk stratification']
  }
];

// Oncogene Examples - Targeted Therapy Selection
export const ONCOGENE_VARIANTS: VariantExample[] = [
  {
    id: 'kras-g12c',
    name: 'KRAS G12C Mutation',
    description: 'Actionable KRAS mutation targetable with specific inhibitors',
    variant: 'chr12:25245350:C>A',
    gene: 'KRAS',
    region: 'coding',
    assembly: 'GRCh38',
    context: 'lung-cancer',
    expectedResults: {
      pathogenicity: 0.95,
      confidence: 0.98,
      classification: 'Pathogenic',
      deltaLikelihood: -4.23
    },
    clinicalRelevance: 'Targetable with KRAS G12C inhibitors (sotorasib, adagrasib). Predicts response to specific therapies.',
    useCases: ['Targeted therapy selection', 'Treatment response prediction', 'Resistance monitoring', 'Clinical trial matching']
  },
  {
    id: 'egfr-l858r',
    name: 'EGFR L858R Mutation',
    description: 'Common EGFR mutation sensitive to tyrosine kinase inhibitors',
    variant: 'chr7:55181378:T>G',
    gene: 'EGFR',
    region: 'coding',
    assembly: 'GRCh38',
    context: 'lung-cancer',
    expectedResults: {
      pathogenicity: 0.93,
      confidence: 0.97,
      classification: 'Pathogenic',
      deltaLikelihood: -3.87
    },
    clinicalRelevance: 'Highly sensitive to EGFR TKIs. First-line treatment with erlotinib, gefitinib, or osimertinib.',
    useCases: ['TKI sensitivity prediction', 'First-line treatment selection', 'Resistance monitoring', 'Precision oncology']
  }
];

// Tumor Suppressor Examples - Loss of Function Analysis
export const TUMOR_SUPPRESSOR_VARIANTS: VariantExample[] = [
  {
    id: 'tp53-r273h',
    name: 'TP53 R273H Mutation',
    description: 'Hotspot TP53 mutation with dominant-negative effects',
    variant: 'chr17:7673803:C>T',
    gene: 'TP53',
    region: 'coding',
    assembly: 'GRCh38',
    context: 'pan-cancer',
    expectedResults: {
      pathogenicity: 0.97,
      confidence: 0.99,
      classification: 'Pathogenic',
      deltaLikelihood: -5.12
    },
    clinicalRelevance: 'Dominant-negative TP53 mutation. Poor prognosis marker. May predict resistance to DNA-damaging agents.',
    useCases: ['Prognosis prediction', 'Treatment selection', 'DNA damage response assessment', 'Li-Fraumeni syndrome']
  },
  {
    id: 'rb1-nonsense',
    name: 'RB1 Nonsense Mutation',
    description: 'Loss-of-function RB1 mutation causing protein truncation',
    variant: 'chr13:48367227:C>T',
    gene: 'RB1',
    region: 'coding',
    assembly: 'GRCh38',
    context: 'retinoblastoma',
    expectedResults: {
      pathogenicity: 0.98,
      confidence: 0.99,
      classification: 'Pathogenic',
      deltaLikelihood: -6.45
    },
    clinicalRelevance: 'Complete loss of RB1 function. High penetrance for retinoblastoma. Requires aggressive treatment.',
    useCases: ['Retinoblastoma diagnosis', 'Hereditary cancer screening', 'Treatment planning', 'Family counseling']
  }
];

// Regulatory Variants - Non-coding Impact
export const REGULATORY_VARIANTS: VariantExample[] = [
  {
    id: 'tert-promoter',
    name: 'TERT Promoter Mutation',
    description: 'Non-coding variant affecting telomerase expression',
    variant: 'chr5:1295228:G>A',
    gene: 'TERT',
    region: 'regulatory',
    assembly: 'GRCh38',
    context: 'melanoma',
    expectedResults: {
      pathogenicity: 0.88,
      confidence: 0.92,
      classification: 'Likely Pathogenic',
      deltaLikelihood: -2.67
    },
    clinicalRelevance: 'Creates new transcription factor binding site, increasing TERT expression. Common in melanoma.',
    useCases: ['Melanoma diagnosis', 'Prognosis prediction', 'Non-coding variant analysis', 'Regulatory impact assessment']
  }
];

// Combined Examples for Different Use Cases
export const VARIANT_EXAMPLES = {
  brca: BRCA_VARIANTS,
  oncogenes: ONCOGENE_VARIANTS,
  tumorSuppressors: TUMOR_SUPPRESSOR_VARIANTS,
  regulatory: REGULATORY_VARIANTS,
  all: [...BRCA_VARIANTS, ...ONCOGENE_VARIANTS, ...TUMOR_SUPPRESSOR_VARIANTS, ...REGULATORY_VARIANTS]
};

// Helper Functions
export const getVariantExample = (id: string): VariantExample | undefined => {
  return VARIANT_EXAMPLES.all.find(variant => variant.id === id);
};

export const getVariantsByGene = (gene: string): VariantExample[] => {
  return VARIANT_EXAMPLES.all.filter(variant => variant.gene === gene);
};

export const getVariantsByClassification = (classification: string): VariantExample[] => {
  return VARIANT_EXAMPLES.all.filter(variant => variant.expectedResults.classification === classification);
};

export const getRandomVariant = (category?: keyof typeof VARIANT_EXAMPLES): VariantExample => {
  const variants = category ? VARIANT_EXAMPLES[category] : VARIANT_EXAMPLES.all;
  return variants[Math.floor(Math.random() * variants.length)];
};
