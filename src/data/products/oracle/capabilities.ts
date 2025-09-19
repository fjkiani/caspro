// Oracle Capabilities - Pure data without component dependencies

export const oracleCapabilities = {
  multiModalPredictions: [
    {
      id: 'gene-essentiality',
      icon: '🧬',
      title: 'Gene Essentiality by Context',
      description: 'Context-dependent gene essentiality predictions across different cell lines and mutation backgrounds',
      metrics: [
        { value: '0.82-0.99', label: 'AUROC Range', color: 'text-green-400' },
        { value: '8 Species', label: 'Cross-Species', color: 'text-blue-400' }
      ],
      keyFeatures: [
        'Context-specific essentiality scoring',
        'Cancer vs normal tissue selectivity',
        'Therapeutic window assessment',
        'Synthetic lethal relationship discovery',
        'Cell line dependency mapping'
      ]
    },
    {
      id: 'protein-function',
      icon: '🔬',
      title: 'Protein Functional Change',
      description: 'Quantitative predictions of how variants affect protein function, stability, and folding',
      metrics: [
        { value: 'Strong', label: 'DMS Correlation', color: 'text-red-400' },
        { value: 'Competitive', label: 'vs Specialists', color: 'text-orange-400' }
      ],
      keyFeatures: [
        'Deep Mutational Scanning correlation',
        'Protein stability predictions',
        'Folding impact assessment',
        'Binding affinity changes',
        'Loss-of-function severity scoring'
      ]
    },
    {
      id: 'chromatin-accessibility',
      icon: '🧭',
      title: 'Chromatin Accessibility',
      description: 'Epigenomic predictions showing how variants affect chromatin structure and accessibility',
      metrics: [
        { value: 'SAE TF', label: 'Motif Features', color: 'text-orange-400' },
        { value: 'DART-Eval', label: 'Validated', color: 'text-purple-400' }
      ],
      keyFeatures: [
        'TF binding motif recognition',
        'Regulatory element identification',
        'Tissue-specific accessibility',
        'Enhancer/silencer disruption',
        'CRISPR guide accessibility'
      ]
    }
  ],

  scientificValidation: [
    {
      id: 'clinvar-performance',
      icon: '🎯',
      title: 'ClinVar Pathogenicity',
      description: 'State-of-the-art performance on the gold standard clinical variant database',
      metrics: [
        { value: '95.7%', label: 'SNV AUROC', color: 'text-cyan-400' },
        { value: '93.9%', label: 'Non-SNV AUROC', color: 'text-blue-400' }
      ],
      keyFeatures: [
        'Zero-shot pathogenicity prediction',
        'Coding and noncoding variants',
        'SNV and indel support',
        'No task-specific training',
        'Expert-curated validation'
      ]
    },
    {
      id: 'brca-variants',
      icon: '🧬',
      title: 'BRCA1/2 Variants',
      description: 'Superior performance on breast cancer variant functional assessment',
      metrics: [
        { value: '94%', label: 'Supervised AUROC', color: 'text-green-400' },
        { value: '89.1%', label: 'Zero-shot AUROC', color: 'text-purple-400' }
      ],
      keyFeatures: [
        'Loss-of-function classification',
        'DNA repair capacity assessment',
        'VUS resolution capability',
        'Clinical-grade accuracy',
        'Hereditary cancer focus'
      ]
    },
    {
      id: 'splice-variants',
      icon: '✂️',
      title: 'Splice Variants',
      description: 'Experimentally validated splice variant effect prediction',
      metrics: [
        { value: '82.6%', label: 'SpliceVarDB AUROC', color: 'text-orange-400' },
        { value: 'Exonic/Intronic', label: 'Both Supported', color: 'text-red-400' }
      ],
      keyFeatures: [
        'Aberrant splicing prediction',
        'Exonic and intronic variants',
        'Experimental validation',
        'Splice site disruption',
        'Alternative splicing effects'
      ]
    }
  ]
};

export type OracleCapability = typeof oracleCapabilities.multiModalPredictions[0]; 