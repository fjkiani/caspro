// Forge Use Cases - Comprehensive generative AI scenarios
export const forgeUseCases = {
  crisprTherapy: {
    title: 'CRISPR Therapy Design',
    description: 'End-to-end CRISPR therapeutic design from target validation to clinical-ready candidates',
    icon: '🧬',
    color: 'purple',
    workflow: [
      'Oracle validates target and identifies optimal cutting sites',
      'Forge designs high-efficiency guide RNAs with minimal off-targets',
      'Forge generates HDR repair templates for precise corrections',
      'Boltz validates 3D structural integrity of designed components',
      'Command Center orchestrates complete therapeutic pipeline'
    ],
    endpoints: ['generate_crispr_payload', 'generate_repair_template', 'predict_protein_functionality_change'],
    metrics: {
      guideEfficiency: '92%',
      hdrSuccess: '78%',
      offTargetRisk: '<0.1',
      timeToCandidate: '2 weeks'
    },
    examples: [
      {
        title: 'Sickle Cell Disease Correction',
        description: 'Design CRISPR therapy to correct HBB gene mutation',
        target: 'HBB:c.20A>T',
        guides: ['GTTCCAGAACCTGAAAGCTG', 'CTGAAAGCTGACCCTGAAGT'],
        hdrTemplate: '5kb homology arms with corrected sequence',
        expectedOutcome: '85% correction efficiency, minimal off-targets'
      },
      {
        title: 'Duchenne Muscular Dystrophy',
        description: 'Exon skipping therapy for DMD gene',
        target: 'DMD exon 51',
        guides: ['AGCTGACCCTGAAGTCAGAT'],
        hdrTemplate: 'Exon deletion with frame restoration',
        expectedOutcome: 'Restored dystrophin expression'
      }
    ]
  },

  proteinTherapy: {
    title: 'Therapeutic Protein Engineering',
    description: 'De novo design of therapeutic proteins with enhanced properties',
    icon: '🧪',
    color: 'green',
    workflow: [
      'Oracle identifies target protein and binding requirements',
      'Forge generates novel protein sequences with desired properties',
      'Forge optimizes for binding affinity, stability, and expression',
      'Boltz validates 3D structure and binding interactions',
      'Command Center prepares for manufacturing and testing'
    ],
    endpoints: ['generate_therapeutic_protein', 'predict_protein_functionality_change'],
    metrics: {
      bindingAffinity: '+67%',
      stability: '+43%',
      expression: '+89%',
      immunogenicity: '-95%'
    },
    examples: [
      {
        title: 'Anti-PD-L1 Nanobody',
        description: 'High-affinity nanobody for cancer immunotherapy',
        target: 'PD-L1 protein',
        properties: ['52 pM binding affinity', '95°C melting temperature', 'Undetectable immunogenicity'],
        expectedOutcome: 'Superior to existing monoclonal antibodies'
      },
      {
        title: 'Lysosomal Enzyme Replacement',
        description: 'Enhanced enzyme for lysosomal storage disorders',
        target: 'GBA1 enzyme',
        properties: ['Increased stability', 'Improved activity', 'Reduced immunogenicity'],
        expectedOutcome: 'Better therapeutic efficacy and safety'
      }
    ]
  },

  geneTherapy: {
    title: 'Gene Therapy Vector Design',
    description: 'Design optimized gene therapy vectors with tissue-specific expression',
    icon: '⚡',
    color: 'orange',
    workflow: [
      'Oracle identifies target tissue and expression requirements',
      'Forge designs tissue-specific regulatory elements',
      'Forge optimizes vector sequences for delivery and expression',
      'Boltz validates regulatory element specificity',
      'Command Center prepares for preclinical testing'
    ],
    endpoints: ['generate_regulatory_element', 'generate_genomic_sequence'],
    metrics: {
      tissueSpecificity: '96%',
      expressionLevel: '15.3x',
      leakage: '<2%',
      deliveryEfficiency: '85%'
    },
    examples: [
      {
        title: 'Tumor-Specific Promoter',
        description: 'Promoter active only in hypoxic tumor microenvironment',
        target: 'Tumor cells',
        specificity: '99% (1% activation in normal tissue)',
        activation: '200x vs baseline',
        expectedOutcome: 'Targeted gene therapy with minimal side effects'
      },
      {
        title: 'Neuron-Specific Enhancer',
        description: 'Enhancer for neuronal gene expression',
        target: 'Neurons',
        specificity: '95% neuronal activation',
        expression: '50x increase in neurons',
        expectedOutcome: 'Precise neuronal gene therapy'
      }
    ]
  },

  syntheticBiology: {
    title: 'Synthetic Biology Applications',
    description: 'Design complete synthetic biological systems and circuits',
    icon: '📜',
    color: 'blue',
    workflow: [
      'Oracle analyzes biological context and requirements',
      'Forge generates synthetic sequences and circuits',
      'Forge optimizes for biological function and stability',
      'Boltz validates structural integrity and interactions',
      'Command Center prepares for experimental validation'
    ],
    endpoints: ['generate_genomic_sequence', 'generate_regulatory_element'],
    metrics: {
      functionalCoherence: '70%',
      syntenyScore: '0.99',
      geneCount: '482',
      pfamHits: '475'
    },
    examples: [
      {
        title: 'Minimal Bacterial Chassis',
        description: 'Streamlined bacterial genome for synthetic biology',
        size: '580kb',
        genes: '482 predicted genes',
        functionality: '70% Pfam hit rate',
        expectedOutcome: 'Stable platform for synthetic biology'
      },
      {
        title: 'Custom Mitochondrial Genome',
        description: 'Optimized mitochondrial genome for enhanced function',
        size: '16kb',
        genes: '37 genes',
        efficiency: 'Enhanced ATP production',
        expectedOutcome: 'Improved cellular energy metabolism'
      }
    ]
  },

  immunotherapy: {
    title: 'Cancer Immunotherapy Design',
    description: 'Design personalized cancer immunotherapies and immune modulators',
    icon: '🎯',
    color: 'red',
    workflow: [
      'Oracle identifies tumor antigens and immune targets',
      'Forge designs neoantigens and immune modulators',
      'Forge optimizes for MHC binding and immunogenicity',
      'Boltz validates immune receptor interactions',
      'Command Center prepares for clinical trials'
    ],
    endpoints: ['generate_therapeutic_protein', 'generate_regulatory_element'],
    metrics: {
      mhcBinding: '95%',
      immunogenicity: 'High',
      tumorSpecificity: '99%',
      safetyProfile: 'Excellent'
    },
    examples: [
      {
        title: 'Personalized Neoantigen',
        description: 'Patient-specific tumor antigen for vaccine therapy',
        target: 'Patient tumor mutations',
        mhcBinding: 'HLA-A*02:01',
        immunogenicity: 'High T-cell response',
        expectedOutcome: 'Personalized cancer vaccine'
      },
      {
        title: 'CAR-T Cell Receptor',
        description: 'Chimeric antigen receptor for T-cell therapy',
        target: 'CD19+ B-cells',
        specificity: '99% target binding',
        safety: 'Minimal off-target effects',
        expectedOutcome: 'Effective B-cell lymphoma treatment'
      }
    ]
  }
};
