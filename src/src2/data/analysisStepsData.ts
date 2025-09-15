import { Target, Activity, Zap } from 'lucide-react';

export const sampleAnalysisSteps = [
  {
    id: 'variant_impact',
    name: 'Variant Impact Prediction',
    endpoint: 'predict_variant_impact',
    icon: Target,
    status: 'completed' as const,
    color: 'blue',
    duration: '2.3s',
    inputData: {
      variant: 'BRCA1:c.123A>T',
      genomic_position: 'chr17:43044295',
      reference: 'A',
      alternate: 'T',
      gene: 'BRCA1'
    },
    processingSteps: [
      {
        name: 'Sequence Context Analysis',
        description: 'Analyzing 1024bp genomic window around variant',
        duration: 1200,
        details: [
          'Extracted genomic sequence from chr17:43043271-43045319',
          'Identified exon boundaries and splice sites',
          'Computed nucleotide composition and GC content',
          'Mapped to transcript BRCA1-201 (ENST00000357654)'
        ]
      },
      {
        name: 'Evo2 Feature Extraction',
        description: 'Computing 32,768 learned biological features',
        duration: 1800,
        details: [
          'Loaded Evo2 foundation model weights',
          'Forward pass through 7-layer transformer architecture',
          'Extracted attention patterns from 16 heads per layer',
          'Generated feature embeddings for variant position',
          'Computed conservation scores across 100 vertebrate species'
        ]
      },
      {
        name: 'Pathogenicity Classification',
        description: 'Zero-shot prediction with confidence calibration',
        duration: 300,
        details: [
          'Applied logistic regression head to Evo2 features',
          'Computed delta likelihood score: -2.34',
          'Calibrated confidence using temperature scaling',
          'Cross-referenced with ClinVar training distribution'
        ]
      }
    ],
    outputData: {
      delta_likelihood_score: -2.34,
      pathogenicity_prediction: 'Pathogenic',
      evo2_confidence: 0.94,
      predicted_consequence: 'missense_variant',
      feature_disruption_scores: {
        splice_site: 0.12,
        protein_coding: 0.89,
        regulatory: 0.23
      }
    },
    insights: [
      'High-confidence pathogenic classification based on protein disruption',
      'Variant affects critical DNA-binding domain of BRCA1',
      'Strong evolutionary conservation at this position (PhyloP: 5.2)',
      'Consistent with known loss-of-function mutations in this region'
    ]
  },
  {
    id: 'protein_function',
    name: 'Protein Function Analysis',
    endpoint: 'predict_protein_functionality_change',
    icon: Activity,
    status: 'completed' as const,
    color: 'red',
    duration: '1.8s',
    inputData: {
      protein: 'BRCA1',
      variant: 'A123T',
      amino_acid_change: 'Ala123Thr',
      domain: 'DNA_binding_domain'
    },
    processingSteps: [
      {
        name: 'Protein Structure Analysis',
        description: 'Analyzing protein structure and domain organization',
        duration: 800,
        details: [
          'Loaded AlphaFold2 structure for BRCA1 (AF-P38398-F1)',
          'Identified variant position in DNA-binding domain',
          'Computed local structural environment',
          'Analyzed hydrogen bonding patterns'
        ]
      },
      {
        name: 'Stability Prediction',
        description: 'Computing thermodynamic stability changes',
        duration: 600,
        details: [
          'Applied FoldX energy function',
          'Computed ΔΔG = -1.8 kcal/mol (destabilizing)',
          'Analyzed side chain interactions',
          'Predicted local unfolding probability: 0.23'
        ]
      },
      {
        name: 'Functional Impact Assessment',
        description: 'Evaluating effects on protein function',
        duration: 400,
        details: [
          'Mapped to known functional sites',
          'Computed binding affinity changes',
          'Analyzed allosteric effects',
          'Cross-referenced with deep mutational scanning data'
        ]
      }
    ],
    outputData: {
      stability_change: -1.8,
      functional_score: 0.34,
      domain_impact: 'DNA_binding_domain',
      predicted_effect: 'Moderate_loss_of_function',
      confidence: 0.87,
      dms_correlation: 0.82
    },
    insights: [
      'Moderate disruption of tumor suppressor function detected through learned biological features',
      'Protein destabilization may affect DNA binding affinity',
      'Strong correlation with experimental deep mutational scanning',
      'Variant likely reduces but does not eliminate BRCA1 function'
    ]
  },
  {
    id: 'chromatin_context',
    name: 'Chromatin Context',
    endpoint: 'predict_chromatin_accessibility',
    icon: Zap,
    status: 'completed' as const,
    color: 'orange',
    duration: '1.5s',
    inputData: {
      locus: 'chr17:43044295',
      context: 'breast_tissue'
    },
    processingSteps: [
      {
        name: 'Chromatin State Analysis',
        description: 'Analyzing chromatin state and histone modifications',
        duration: 700,
        details: [
          'Loaded Enformer predictions for 128kb window',
          'Computed accessibility scores across cell types',
          'Identified active chromatin marks (H3K4me3, H3K27ac)',
          'Mapped to ChromHMM states'
        ]
      },
      {
        name: 'TF Binding Prediction',
        description: 'Identifying transcription factor binding sites',
        duration: 500,
        details: [
          'Scanned for known TF motifs using JASPAR database',
          'Computed binding affinity scores',
          'Identified CTCF binding site (score: 0.91)',
          'Predicted tissue-specific TF occupancy'
        ]
      },
      {
        name: 'Regulatory Impact Assessment',
        description: 'Computing regulatory element disruption',
        duration: 300,
        details: [
          'Analyzed enhancer-promoter interactions',
          'Computed chromatin loop disruption probability',
          'Assessed impact on gene expression',
          'Cross-referenced with eQTL data'
        ]
      }
    ],
    outputData: {
      accessibility_score: 0.82,
      chromatin_state: 'Open_Chromatin',
      tf_binding_sites: [
        { tf: 'CTCF', position: 43044290, score: 0.91 },
        { tf: 'YY1', position: 43044310, score: 0.76 }
      ],
      regulatory_elements: [
        { type: 'enhancer', start: 43044200, end: 43044400, strength: 0.85 }
      ],
      tissue_specificity: 0.91
    },
    insights: [
      'Variant in accessible chromatin region, high tissue relevance',
      'Strong CTCF binding site may be disrupted by variant',
      'Located within active enhancer element',
      'High tissue specificity suggests important regulatory role'
    ]
  }
];

export const getCurrentStepData = (stepIndex: number) => {
  if (stepIndex >= 0 && stepIndex < sampleAnalysisSteps.length) {
    return sampleAnalysisSteps[stepIndex];
  }
  return null;
}; 