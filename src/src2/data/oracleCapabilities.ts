import React from 'react';
import { EssentialityChart, ProteinDeltaCard, AccessibilityTrack } from '../components/site/blocks';

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
      ],
      demoComponent: React.createElement(EssentialityChart, {
        series: [
          { context: { cellLine: 'A549 Cancer', mutations: ['TP53', 'KEAP1'] }, score: 0.82 },
          { context: { cellLine: 'Normal Lung', mutations: [] }, score: 0.15 }
        ]
      })
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
      ],
      demoComponent: React.createElement(ProteinDeltaCard, {
        function: -0.89,
        stability: -0.45,
        foldingImpact: 0.76,
        notes: 'Severe loss of DNA repair function predicted'
      })
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
      ],
      demoComponent: React.createElement(AccessibilityTrack, {
        tracks: [{
          context: 'BRCA1 Locus',
          points: Array.from({ length: 50 }, (_, i) => ({ 
            pos: i, 
            score: 0.4 + 0.4 * Math.sin(i / 8) + (i === 25 ? 0.3 : 0)
          }))
        }]
      })
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