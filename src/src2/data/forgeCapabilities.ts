

export const forgeCapabilities = {
  multiModalGeneration: [
    {
      id: 'guide_rna_design',
      icon: '🧬',
      title: 'Guide RNA Design',
      description: 'Generate CRISPR guide RNAs with minimal off-targets and maximum on-target efficiency using Evo2\'s genomic understanding.',
      metrics: [
        { value: '92%', label: 'On-target efficiency', color: 'green' },
        { value: '<0.1', label: 'Off-target score', color: 'blue' },
        { value: '~30s', label: 'Design time', color: 'purple' }
      ],
      keyFeatures: [
        'Multi-objective optimization',
        'Off-target minimization',
        'PAM compatibility',
        'Multiplex design'
      ]
    },
    {
      id: 'repair_templates',
      icon: '🔧',
      title: 'HDR Repair Templates',
      description: 'Design optimized repair templates with ultra-long homology arms for precise genome editing and therapeutic corrections.',
      metrics: [
        { value: '78%', label: 'HDR efficiency', color: 'green' },
        { value: '4.2kb', label: 'Avg arm length', color: 'blue' },
        { value: '94%', label: 'Success rate', color: 'purple' }
      ],
      keyFeatures: [
        'Ultra-long homology arms (4kb+)',
        'Mutation correction',
        'Insert optimization',
        'Recombination efficiency'
      ]
    },
    {
      id: 'therapeutic_proteins',
      icon: '🧪',
      title: 'Therapeutic Proteins',
      description: 'Generate optimized protein sequences for enhanced therapeutic properties, including improved stability, binding affinity, and reduced immunogenicity.',
      metrics: [
        { value: '+67%', label: 'Binding affinity', color: 'green' },
        { value: '+43%', label: 'Stability improvement', color: 'blue' },
        { value: '+89%', label: 'Expression yield', color: 'purple' }
      ],
      keyFeatures: [
        'Antibody optimization',
        'Enzyme engineering',
        'Stability enhancement',
        'Immunogenicity reduction'
      ]
    },
    {
      id: 'regulatory_elements',
      icon: '⚡',
      title: 'Regulatory Elements',
      description: 'Design tissue-specific promoters and enhancers for controlled gene expression with minimal off-target activation.',
      metrics: [
        { value: '96%', label: 'Specificity', color: 'green' },
        { value: '15.3x', label: 'Expression fold', color: 'blue' },
        { value: '<2%', label: 'Leakage', color: 'purple' }
      ],
      keyFeatures: [
        'Tissue specificity',
        'Expression level tuning',
        'Inducible systems',
        'Minimal leakage'
      ]
    },
    {
      id: 'epigenome_optimization',
      icon: '🎯',
      title: 'Epigenome Engineering',
      description: 'Optimize sequences for enhanced chromatin accessibility and favorable epigenetic landscapes.',
      metrics: [
        { value: '+72%', label: 'Accessibility', color: 'green' },
        { value: '+56%', label: 'H3K27ac signal', color: 'blue' },
        { value: '-84%', label: 'Methylation reduction', color: 'purple' }
      ],
      keyFeatures: [
        'Chromatin accessibility',
        'Histone modification',
        'DNA methylation patterns',
        'Nucleosome positioning'
      ]
    }
  ]
};

// Forge-specific demo data for DemoFactory
export const forgeAPIDemos = [
  {
    id: 'generate_optimized_guide_rna',
    name: 'Guide RNA Generation',
    endpoint: '/generate_optimized_guide_rna',
    description: 'Generate highly efficient CRISPR guide RNAs with minimal off-target effects',
    icon: "🧬",
    color: 'purple',
    capabilities: [
      'Multi-objective optimization',
      'Off-target minimization',
      'Efficiency prediction',
      'PAM compatibility'
    ],
    useCases: [
      {
        title: 'Gene Knockout',
        description: 'Design guides for precise gene knockout experiments',
        examples: ['BRCA1 knockout', 'Tumor suppressor disruption', 'Essential gene analysis']
      },
      {
        title: 'Therapeutic Editing',
        description: 'Generate guides for therapeutic genome editing',
        examples: ['Sickle cell correction', 'Duchenne MD therapy', 'Hemophilia treatment']
      }
    ],
    simulation: {
      input: {
        target_sequence: 'chr17:43044295-43044395',
        pam_type: 'NGG',
        num_guides: 5,
        avoid_off_targets: true
      },
      steps: [
        {
          title: 'Target Analysis',
          description: 'Analyzing genomic locus for optimal guide placement',
          duration: 2000
        },
        {
          title: 'Guide Generation',
          description: 'Generating candidate guide RNAs with Evo2',
          duration: 3000
        },
        {
          title: 'Off-target Screening',
          description: 'Screening for potential off-target sites',
          duration: 2500
        },
        {
          title: 'Efficiency Prediction',
          description: 'Predicting on-target cutting efficiency',
          duration: 1500
        }
      ],
      finalOutput: {
        guides: [
          { sequence: 'GTTCCAGAACCTGAAAGCTG', efficiency: 0.92, off_targets: 0 },
          { sequence: 'CTGAAAGCTGACCCTGAAGT', efficiency: 0.87, off_targets: 1 },
          { sequence: 'AGCTGACCCTGAAGTCAGAT', efficiency: 0.84, off_targets: 0 }
        ]
      }
    }
  },
  {
    id: 'generate_repair_template',
    name: 'HDR Template Design',
    endpoint: '/generate_repair_template',
    description: 'Design optimized homology-directed repair templates with ultra-long arms',
    icon: "🔧",
    color: 'blue',
    capabilities: [
      'Ultra-long homology arms',
      'High HDR efficiency',
      'Minimal indel formation',
      'Optimized recombination'
    ],
    useCases: [
      {
        title: 'Pathogenic Variant Correction',
        description: 'Correct disease-causing mutations with HDR',
        examples: ['BRCA1 variant correction', 'CFTR mutation repair', 'Huntingtin correction']
      },
      {
        title: 'Safe Harbor Integration',
        description: 'Insert therapeutic sequences at safe sites',
        examples: ['AAVS1 integration', 'CCR5 locus targeting', 'ROSA26 insertion']
      }
    ],
    simulation: {
      input: {
        target_locus: 'chr17:43044295',
        correction_type: 'point_mutation',
        homology_arm_length: 4000,
        insert_sequence: 'ATCGATCG'
      },
      steps: [
        {
          title: 'Locus Analysis',
          description: 'Analyzing target genomic region',
          duration: 2000
        },
        {
          title: 'Homology Arm Design',
          description: 'Designing optimal homology arms',
          duration: 4000
        },
        {
          title: 'Template Optimization',
          description: 'Optimizing template for HDR efficiency',
          duration: 3000
        }
      ],
      finalOutput: {
        template: {
          left_arm: 'ATCGATCG...4kb',
          insert: 'CORRECTED_SEQUENCE',
          right_arm: 'GCTAGCTA...4kb',
          predicted_efficiency: 0.78
        }
      }
    }
  }
]; 