// Biotech Discriminative Capabilities
// Extracted from src2/data/biotechDiscriminativeContent.ts

export type BiotechCapability = {
  id: string;
  icon: string;
  title: string;
  description: string;
  metrics: Array<{ value: string; label: string; color: string }>;
  keyFeatures: string[];
  demoComponent?: React.ReactNode;
};

export const biotechDiscriminativeCapabilities: BiotechCapability[] = [
  {
    id: 'variant-impact-biotech',
    icon: '🎯',
    title: 'Variant Impact for Target Validation',
    description: 'Zero-shot pathogenicity prediction for oncogene/tumor suppressor validation in therapeutic development',
    metrics: [
      { value: '95.7%', label: 'ClinVar AUROC', color: 'text-cyan-400' },
      { value: '94%', label: 'BRCA1 AUROC', color: 'text-blue-400' }
    ],
    keyFeatures: [
      'Oncogene activation prediction (BRAF V600E, KRAS G12C)',
      'Tumor suppressor inactivation analysis (TP53, RB1)', 
      'DNA repair pathway disruption (BRCA1/2, MMR genes)',
      'Immune evasion mutation assessment (MHC, PD-L1)',
      'TERT promoter mutation evaluation'
    ]
  },
  
  {
    id: 'gene-essentiality-biotech',
    icon: '🧬',
    title: 'Gene Essentiality for Target Prioritization',
    description: 'Context-dependent essentiality scoring to identify targets with optimal therapeutic windows',
    metrics: [
      { value: '0.82-0.99', label: 'AUROC Range', color: 'text-green-400' },
      { value: '20x', label: 'Therapeutic Window', color: 'text-blue-400' }
    ],
    keyFeatures: [
      'Cancer vs normal tissue selectivity analysis',
      'Synthetic lethal relationship discovery',
      'Cell line dependency mapping (DepMap integration)',
      'Therapeutic window assessment',
      'Target prioritization scoring'
    ]
  },

  {
    id: 'protein-function-biotech',
    icon: '🔬',
    title: 'Protein Function for Drug Design',
    description: 'Predict how variants affect protein stability, binding, and function for structure-based drug design',
    metrics: [
      { value: 'Strong', label: 'DMS Correlation', color: 'text-red-400' },
      { value: 'Competitive', label: 'vs AlphaFold2', color: 'text-orange-400' }
    ],
    keyFeatures: [
      'Protein stability change prediction',
      'Binding affinity impact assessment',
      'Allosteric effect prediction',
      'Drug resistance mutation analysis',
      'Structure-activity relationship mapping'
    ]
  },

  {
    id: 'crispr-efficacy-biotech',
    icon: '✂️',
    title: 'CRISPR Efficacy for Therapeutic Design',
    description: 'Predict guide RNA cutting efficiency and specificity for precision gene editing therapeutics',
    metrics: [
      { value: 'Frameshift', label: 'Efficacy Proxy', color: 'text-purple-400' },
      { value: 'Empirical', label: 'Indel Priors', color: 'text-pink-400' }
    ],
    keyFeatures: [
      'On-target cutting efficiency prediction',
      'Allele-specific guide design (KRAS G12C)',
      'Frameshift probability assessment',
      'HDR template optimization',
      'Base editing outcome prediction'
    ]
  },

  {
    id: 'chromatin-access-biotech',
    icon: '🧭',
    title: 'Chromatin Accessibility for Enhancer Design',
    description: 'Predict regulatory element accessibility and TF binding for enhancer-based therapeutics',
    metrics: [
      { value: 'SAE TF', label: 'Motif Features', color: 'text-orange-400' },
      { value: 'DART-Eval', label: 'Validated', color: 'text-purple-400' }
    ],
    keyFeatures: [
      'Enhancer/silencer identification',
      'Tissue-specific accessibility prediction',
      'TF binding motif disruption analysis',
      'Epigenetic therapy target discovery',
      'CAR-T enhancer optimization'
    ]
  }
];


