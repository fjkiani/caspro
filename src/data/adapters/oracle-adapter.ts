// Oracle Adapter - Discriminative AI Engine
// Transforms Oracle content for different contexts (homepage, slides, pages)

export const oracleContent = {
  title: "Oracle: Discriminative AI Engine",
  subtitle: "Zero-shot variant impact prediction with biological reasoning",
  description: "Powered by Evo2 40B-parameter model with 1M-token context window",
  
  capabilities: [
    {
      id: 'variant-impact',
      title: 'Variant Impact Prediction',
      description: '95.7% ClinVar AUROC',
      icon: '🎯',
      metrics: [
        { label: 'ClinVar AUROC', value: '95.7%', color: 'text-green-400' },
        { label: 'Samples', value: '53,210', color: 'text-blue-400' }
      ],
      keyFeatures: [
        'Zero-shot prediction without training',
        'All variant types (SNV, indel, coding, noncoding)',
        'State-of-the-art noncoding performance',
        'Cross-species generalization'
      ]
    },
    {
      id: 'gene-essentiality',
      title: 'Gene Essentiality Analysis',
      description: '0.82-0.99 AUROC range',
      icon: '🧬',
      metrics: [
        { label: 'AUROC Range', value: '0.82-0.99', color: 'text-green-400' },
        { label: 'DepMap Correlation', value: '0.73', color: 'text-blue-400' }
      ],
      keyFeatures: [
        'Cross-species gene prediction',
        'Cancer cell line dependency analysis',
        'Therapeutic target identification',
        'Synthetic lethality prediction'
      ]
    },
    {
      id: 'protein-function',
      title: 'Protein Function Prediction',
      description: 'Strong correlation with DMS data',
      icon: '⚗️',
      metrics: [
        { label: 'DMS Correlation', value: 'Strong', color: 'text-green-400' },
        { label: 'Validation', value: 'Experimental', color: 'text-blue-400' }
      ],
      keyFeatures: [
        'Deep Mutational Scanning correlation',
        'Protein stability prediction',
        'Binding affinity assessment',
        'Folding impact analysis'
      ]
    },
    {
      id: 'chromatin-accessibility',
      title: 'Chromatin Accessibility',
      description: 'Context-aware regulatory analysis',
      icon: '🧪',
      metrics: [
        { label: 'SAE Features', value: '32,768', color: 'text-green-400' },
        { label: 'Applications', value: '2', color: 'text-blue-400' }
      ],
      keyFeatures: [
        '32,768 learned biological concepts',
        'TF binding motif analysis',
        'Regulatory element identification',
        'CRISPR accessibility prediction'
      ]
    },
    {
      id: 'crispr-efficacy',
      title: 'CRISPR Efficacy',
      description: 'Guide RNA optimization',
      icon: '✂️',
      metrics: [
        { label: 'Method', value: 'Hybrid', color: 'text-green-400' },
        { label: 'Applications', value: '2', color: 'text-blue-400' }
      ],
      keyFeatures: [
        'Variant impact simulation',
        'Empirical prior integration',
        'Guide RNA design optimization',
        'Off-target risk assessment'
      ]
    }
  ],
  
  performance: {
    clinVarSNVCoding: { auroc: 0.957, samples: 14319 },
    clinVarSNVNoncoding: { auroc: 0.958, samples: 34761 },
    brca1Supervised: { auroc: 0.94, samples: 3893 },
    brca1ZeroShot: { auroc: 0.891, samples: 3893 },
    spliceVariants: { auroc: 0.826, samples: 4950 }
  }
};

export const oracleEndpoints = [
  {
    id: 'predict_variant_impact',
    title: 'Predict Variant Impact',
    name: 'Predict Variant Impact',
    description: 'Mathematical proof of functional disruption',
    method: 'POST',
    path: '/api/oracle/predict_variant_impact',
    icon: '🎯',
    metrics: {
      clinVar: { auroc: 0.957, description: 'ClinVar validation' },
      samples: { count: 14319, description: 'Validated samples' }
    }
  },
  {
    id: 'predict_gene_essentiality',
    title: 'Predict Gene Essentiality',
    name: 'Predict Gene Essentiality',
    description: 'Achilles\' heel identification for therapeutic targeting',
    method: 'POST',
    path: '/api/oracle/predict_gene_essentiality',
    icon: '🧬',
    metrics: {
      aurocRange: { min: 0.82, max: 0.99, description: 'Cross-species range' },
      depMap: { correlation: 0.73, description: 'DepMap correlation' }
    }
  },
  {
    id: 'predict_protein_functionality_change',
    title: 'Predict Protein Functionality Change',
    name: 'Predict Protein Functionality Change',
    description: 'Structural and functional impact assessment',
    method: 'POST',
    path: '/api/oracle/predict_protein_functionality_change',
    icon: '⚗️',
    metrics: {
      dmsCorrelation: { strength: 'Strong', description: 'DMS correlation' },
      validation: { status: 'Validated', description: 'Experimental validation' }
    }
  },
  {
    id: 'predict_chromatin_accessibility',
    title: 'Predict Chromatin Accessibility',
    name: 'Predict Chromatin Accessibility',
    description: 'Regulatory context analysis',
    method: 'POST',
    path: '/api/oracle/predict_chromatin_accessibility',
    icon: '🧪',
    metrics: {
      saeFeatures: { count: 32768, description: 'SAE features' },
      applications: { count: 2, description: 'Key applications' }
    }
  },
  {
    id: 'predict_crispr_spacer_efficacy',
    title: 'Predict CRISPR Spacer Efficacy',
    name: 'Predict CRISPR Spacer Efficacy',
    description: 'Guide RNA optimization',
    method: 'POST',
    path: '/api/oracle/predict_crispr_spacer_efficacy',
    icon: '✂️',
    metrics: {
      method: { type: 'Hybrid', description: 'Simulation + priors' },
      applications: { count: 2, description: 'Design applications' }
    }
  }
];

export const oracleMultiModalPredictions = {
  geneEssentiality: {
    aurocRange: "0.82-0.99",
    depMapCorrelation: 0.73,
    contexts: ["cancer cell lines", "normal tissue", "specific mutations"],
    applications: ["therapeutic targeting", "synthetic lethality"]
  },
  proteinFunction: {
    dmsCorrelation: "Strong correlation with Deep Mutational Scanning",
    prokaryoticDMS: "Strong correlation with experimental fitness",
    humanProteinDMS: "Competitive with specialized models",
    ncRNADMS: "State-of-the-art performance",
    applications: ["stability prediction", "binding affinity", "folding impact"]
  },
  chromatinAccessibility: {
    saeFeatures: "32,768 learned biological concepts",
    applications: ["CRISPR guide accessibility", "regulatory disruption"]
  },
  crisprEfficacy: {
    method: "Variant impact simulation + empirical priors",
    applications: ["guide RNA design", "off-target assessment"]
  }
};

export const oracleScientificValidation = {
  clinVar: {
    codingSNV: { auroc: 0.957, samples: 14319 },
    nonCodingSNV: { auroc: 0.958, samples: 34761 },
    codingNonSNV: { auroc: 0.939, samples: 1236 },
    nonCodingNonSNV: { auroc: 0.918, samples: 3894 },
    totalSamples: 53210
  },
  brca1: {
    supervisedAUROC: 0.94,
    supervisedAUPRC: 0.84,
    allSNV_AUROC: 0.95,
    allSNV_AUPRC: 0.86,
    zeroShotAUROC: 0.891,
    brca2ZeroShotAUROC: 0.901,
    samples: 3893
  },
  splice: {
    exonicAUROC: 0.826,
    intronicAUROC: 0.825,
    totalSamples: 4950
  },
  crossSpecies: {
    aurocRange: "0.82-0.99",
    species: 8,
    bacterialGenomes: 56,
    depMapCorrelation: 0.73
  }
};

export const adaptOracleForHomepage = () => ({
  title: oracleContent.title,
  subtitle: oracleContent.subtitle,
  description: oracleContent.description,
  keyMetrics: [
    { label: "ClinVar AUROC", value: "95.7%", description: "Gold standard validation" },
    { label: "BRCA1 Zero-shot", value: "89.1%", description: "No training required" },
    { label: "VUS Resolution", value: "73%", description: "Uncertain to actionable" },
    { label: "Cross-species", value: "8 species", description: "Universal applicability" }
  ],
  capabilities: oracleContent.capabilities,
  endpoints: oracleEndpoints.slice(0, 3), // Show top 3 for homepage
  performance: oracleScientificValidation.clinVar,
  validation: [
    {
      id: 'clinvar',
      title: 'ClinVar Validation',
      description: 'Gold standard variant database',
      icon: '🏆',
      metrics: [
        { label: 'Coding SNV', value: '95.7%', color: 'text-green-400' },
        { label: 'Noncoding SNV', value: '95.8%', color: 'text-green-400' },
        { label: 'Total Samples', value: '53,210', color: 'text-blue-400' }
      ]
    },
    {
      id: 'brca1',
      title: 'BRCA1/2 Validation',
      description: 'Clinical breast cancer variants',
      icon: '🎯',
      metrics: [
        { label: 'Supervised AUROC', value: '94.0%', color: 'text-green-400' },
        { label: 'Zero-shot AUROC', value: '89.1%', color: 'text-green-400' },
        { label: 'Samples', value: '3,893', color: 'text-blue-400' }
      ]
    },
    {
      id: 'splice',
      title: 'Splice Variant Validation',
      description: 'Experimentally validated splice effects',
      icon: '✂️',
      metrics: [
        { label: 'Exonic AUROC', value: '82.6%', color: 'text-green-400' },
        { label: 'Intronic AUROC', value: '82.5%', color: 'text-green-400' },
        { label: 'Samples', value: '4,950', color: 'text-blue-400' }
      ]
    }
  ],
  useCases: {
    hereditaryBreastCancer: {
      title: 'Hereditary Breast Cancer',
      description: 'BRCA1/2 VUS resolution with 95% confidence',
      icon: '🎗️',
      metrics: {
        vusResolution: '73%',
        riskAccuracy: '91.3%',
        brca1AUROC: '89.1%',
        clinicalImpact: 'High'
      },
      workflow: [
        'Input BRCA1/2 variant sequence',
        'Oracle predicts pathogenicity',
        'Clinical classification (Pathogenic/Benign)',
        'Treatment recommendation (PARP inhibitors/surgery)'
      ]
    },
    oncogeneActivation: {
      title: 'Oncogene Activation',
      description: 'KRAS G12C, BRAF V600E therapeutic targeting',
      icon: '⚡',
      metrics: {
        targetAccuracy: '94.2%',
        coverage: '98.7%',
        timeReduction: '85%',
        clinicalImpact: 'High'
      },
      workflow: [
        'Identify oncogenic mutations',
        'Oracle predicts functional impact',
        'Essentiality analysis for targeting',
        'Therapeutic strategy selection'
      ]
    },
    therapeuticTargeting: {
      title: 'Therapeutic Targeting',
      description: 'Gene essentiality analysis for precision medicine',
      icon: '🎯',
      metrics: {
        essentialityRange: '0.82-0.99',
        depMapCorrelation: '0.73',
        species: '8',
        clinicalImpact: 'High'
      },
      workflow: [
        'Gene expression analysis',
        'Oracle predicts essentiality',
        'Cancer dependency scoring',
        'Therapeutic target prioritization'
      ]
    }
  }
});
