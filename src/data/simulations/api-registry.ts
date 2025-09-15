// API Registry - All simulation endpoints and configurations
// Based on Homepage Simulation Transformation Doctrine

export interface APIEndpoint {
  id: string;
  name: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  category: 'discriminative' | 'generative' | 'structural' | 'orchestration';
  color: string;
  icon: string;
  capabilities: string[];
  inputSchema: Record<string, any>;
  outputSchema: Record<string, any>;
  simulationDefaults: {
    duration: number;
    steps: string[];
    sampleInput: Record<string, any>;
    expectedOutput: Record<string, any>;
  };
}

// Core API Endpoints for Homepage Simulations
export const API_ENDPOINTS: Record<string, APIEndpoint> = {
  // Discriminative APIs (Oracle)
  predict_variant_impact: {
    id: 'predict_variant_impact',
    name: 'Predict Variant Impact',
    endpoint: '/predict_variant_impact',
    method: 'POST',
    description: 'Zero-shot pathogenicity prediction for coding and non-coding variants',
    category: 'discriminative',
    color: 'blue',
    icon: '🎯',
    capabilities: ['Zero-shot prediction', 'Multi-modal scoring', 'Delta likelihood'],
    inputSchema: {
      variant: 'string',
      gene: 'string',
      assembly: 'string?',
      context: 'string?'
    },
    outputSchema: {
      pathogenicity: 'number',
      confidence: 'number',
      classification: 'string',
      deltaLikelihood: 'number'
    },
    simulationDefaults: {
      duration: 2000,
      steps: ['Sequence Context Loading', 'Multi-modal Analysis', 'Pathogenicity Scoring'],
      sampleInput: { variant: 'chr17:43044295:A>T', gene: 'BRCA1' },
      expectedOutput: { pathogenicity: 0.89, confidence: 0.94, classification: 'Likely Pathogenic', deltaLikelihood: -2.34 }
    }
  },

  predict_gene_essentiality: {
    id: 'predict_gene_essentiality',
    name: 'Predict Gene Essentiality',
    endpoint: '/predict_gene_essentiality',
    method: 'POST',
    description: 'Context-aware prediction of gene importance for cell survival',
    category: 'discriminative',
    color: 'green',
    icon: '🧬',
    capabilities: ['Cell-type specific', 'Tissue context', 'Dependency analysis'],
    inputSchema: {
      gene: 'string',
      cellType: 'string?',
      context: 'string?',
      mutations: 'string[]?'
    },
    outputSchema: {
      essentialityScore: 'number',
      contextSpecificity: 'number',
      confidence: 'number',
      dependency: 'string'
    },
    simulationDefaults: {
      duration: 2200,
      steps: ['Context Loading', 'Essentiality Scoring', 'Dependency Analysis'],
      sampleInput: { gene: 'BRCA1', cellType: 'MCF7', context: 'breast-cancer' },
      expectedOutput: { essentialityScore: 0.76, contextSpecificity: 0.82, confidence: 0.91, dependency: 'high' }
    }
  },

  predict_protein_functionality_change: {
    id: 'predict_protein_functionality_change',
    name: 'Predict Protein Functional Change',
    endpoint: '/predict_protein_functionality_change',
    method: 'POST',
    description: 'Predict functional impact of protein sequence changes',
    category: 'discriminative',
    color: 'red',
    icon: '🔬',
    capabilities: ['Structure-function', 'Evolutionary context', 'Binding analysis'],
    inputSchema: {
      protein: 'string',
      mutation: 'string',
      position: 'number?',
      context: 'string?'
    },
    outputSchema: {
      functionalImpact: 'number',
      structuralDisruption: 'number',
      likelihood: 'number',
      stabilityChange: 'number'
    },
    simulationDefaults: {
      duration: 2500,
      steps: ['Structure Analysis', 'Function Prediction', 'Impact Assessment'],
      sampleInput: { protein: 'BRCA1', mutation: 'L1407P', position: 1407 },
      expectedOutput: { functionalImpact: 0.82, structuralDisruption: 0.76, likelihood: 0.91, stabilityChange: -0.45 }
    }
  },

  // Generative APIs (Forge)
  generate_optimized_guide_rna: {
    id: 'generate_optimized_guide_rna',
    name: 'Generate Optimized Guide RNA',
    endpoint: '/generate_optimized_guide_rna',
    method: 'POST',
    description: 'Forge precision CRISPR therapeutic with predicted efficacy',
    category: 'generative',
    color: 'purple',
    icon: '✂️',
    capabilities: ['Guide optimization', 'Off-target analysis', 'Efficacy prediction'],
    inputSchema: {
      target: 'string',
      gene: 'string',
      strategy: 'string',
      constraints: 'string[]?'
    },
    outputSchema: {
      guides: 'string[]',
      efficiency: 'number',
      specificity: 'number',
      offTargetSites: 'number'
    },
    simulationDefaults: {
      duration: 3000,
      steps: ['Target Analysis', 'Guide Generation', 'Optimization', 'Validation'],
      sampleInput: { target: 'BRCA1', gene: 'BRCA1', strategy: 'knockout' },
      expectedOutput: { guides: ['GTTCCAGAACCTGAAAGCTG'], efficiency: 0.87, specificity: 0.94, offTargetSites: 2 }
    }
  },

  generate_therapeutic_protein: {
    id: 'generate_therapeutic_protein',
    name: 'Generate Therapeutic Protein',
    endpoint: '/generate_therapeutic_protein',
    method: 'POST',
    description: 'Engineer novel, patent-worthy biologic with superior binding',
    category: 'generative',
    color: 'indigo',
    icon: '🧪',
    capabilities: ['Protein design', 'Binding optimization', 'Stability analysis'],
    inputSchema: {
      targetProtein: 'string',
      function: 'string',
      constraints: 'string[]?',
      optimization: 'string[]?'
    },
    outputSchema: {
      sequence: 'string',
      bindingAffinity: 'number',
      stability: 'number',
      immunogenicity: 'number'
    },
    simulationDefaults: {
      duration: 4000,
      steps: ['Target Analysis', 'Sequence Generation', 'Optimization', 'Validation'],
      sampleInput: { targetProtein: 'PD-L1', function: 'antagonist', constraints: ['low-immunogenicity'] },
      expectedOutput: { sequence: 'MKVLWAALLVTFLAGCQAKVEQAVETEPEPELRQTDNQVSLTCLVKGFYPSDIAVEWESNGQPENNYKTTPPVLDSDGSFFLYSKLTVDKSRWQQGNVFSCSVMHEALHNHYTQKSLSLSPGK', bindingAffinity: 0.92, stability: 0.88, immunogenicity: 0.15 }
    }
  }
};

// API Categories for Organization
export const API_CATEGORIES = {
  discriminative: {
    name: 'Oracle (Discriminative AI)',
    description: 'Variant impact prediction and pathogenicity classification',
    color: 'blue',
    icon: '🔍'
  },
  generative: {
    name: 'Forge (Generative AI)',
    description: 'Therapeutic asset generation and optimization',
    color: 'purple', 
    icon: '⚡'
  },
  structural: {
    name: 'Boltz (Structural AI)',
    description: '3D structural validation and binding analysis',
    color: 'green',
    icon: '🏗️'
  },
  orchestration: {
    name: 'Command Center',
    description: 'Workflow orchestration and evidence aggregation',
    color: 'orange',
    icon: '🎛️'
  }
} as const;

// Helper Functions
export const getAPIEndpoint = (id: string): APIEndpoint | undefined => {
  return API_ENDPOINTS[id];
};

export const getAPIsByCategory = (category: string): APIEndpoint[] => {
  return Object.values(API_ENDPOINTS).filter(api => api.category === category);
};

export const getAllAPIs = (): APIEndpoint[] => {
  return Object.values(API_ENDPOINTS);
};
