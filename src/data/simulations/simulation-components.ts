// Simulation Components Registry
// Maps simulation types to their corresponding React components
// Based on Homepage Simulation Transformation Doctrine

export interface SimulationComponentConfig {
  id: string;
  name: string;
  componentPath: string;
  description: string;
  category: 'visualization' | 'result' | 'control' | 'orchestration';
  props: Record<string, any>;
  dependencies?: string[];
  responsive: boolean;
  accessibility: boolean;
}

// Component Registry - Maps component IDs to their configurations
export const SIMULATION_COMPONENTS: Record<string, SimulationComponentConfig> = {
  // Visualization Components (Extracted from src2)
  'sae-visualization': {
    id: 'sae-visualization',
    name: 'SAE Feature Visualization',
    componentPath: 'src/components/simulations/visualizations/SAEVisualization.tsx',
    description: 'SAE feature visualization and delta likelihood scoring',
    category: 'visualization',
    props: {
      sequence: 'string',
      variant: 'object',
      saeFeatures: 'array',
      deltaLLSeries: 'array'
    },
    responsive: true,
    accessibility: true
  },

  'pipeline-visualization': {
    id: 'pipeline-visualization',
    name: 'Pipeline Visualization',
    componentPath: 'src/components/simulations/visualizations/PipelineVisualization.tsx',
    description: '3-stage visual pipeline with progress indicators',
    category: 'visualization',
    props: {
      stages: 'array',
      currentStage: 'number',
      results: 'object'
    },
    responsive: true,
    accessibility: true
  },

  'comparison-visualization': {
    id: 'comparison-visualization',
    name: 'Comparison Visualization',
    componentPath: 'src/components/simulations/visualizations/ComparisonVisualization.tsx',
    description: 'Side-by-side race visualization for Discovery vs Engineering',
    category: 'visualization',
    props: {
      leftTrack: 'object',
      rightTrack: 'object',
      progress: 'object'
    },
    responsive: true,
    accessibility: true
  },

  // Result Components (Adapted from src2)
  'variant-classification': {
    id: 'variant-classification',
    name: 'Variant Classification',
    componentPath: 'src/components/simulations/results/VariantClassification.tsx',
    description: 'Real-time variant classification results',
    category: 'result',
    props: {
      id: 'string',
      region: 'string',
      zeroShot: 'number',
      supervised: 'number',
      verdict: 'string',
      notes: 'string'
    },
    responsive: true,
    accessibility: true
  },

  'protein-impact-analysis': {
    id: 'protein-impact-analysis',
    name: 'Protein Impact Analysis',
    componentPath: 'src/components/simulations/results/ProteinImpactAnalysis.tsx',
    description: 'Protein functional impact analysis display',
    category: 'result',
    props: {
      function: 'number',
      stability: 'number',
      foldingImpact: 'number',
      notes: 'string'
    },
    responsive: true,
    accessibility: true
  },

  'essentiality-analysis': {
    id: 'essentiality-analysis',
    name: 'Essentiality Analysis',
    componentPath: 'src/components/simulations/results/EssentialityAnalysis.tsx',
    description: 'Context-dependent gene essentiality scoring',
    category: 'result',
    props: {
      series: 'array'
    },
    responsive: true,
    accessibility: true
  },

  'roi-impact-display': {
    id: 'roi-impact-display',
    name: 'ROI Impact Display',
    componentPath: 'src/components/simulations/results/ROIImpactDisplay.tsx',
    description: 'ROI calculation results with metrics',
    category: 'result',
    props: {
      costSavings: 'number',
      timeAcceleration: 'number',
      successRateImprovement: 'number',
      annualROI: 'number'
    },
    responsive: true,
    accessibility: true
  },

  // Control Components
  'api-simulation-engine': {
    id: 'api-simulation-engine',
    name: 'API Simulation Engine',
    componentPath: 'src/components/simulations/core/APISimulationEngine.tsx',
    description: 'Core API simulation orchestration engine',
    category: 'control',
    props: {
      apiEndpoints: 'array',
      timingConfig: 'object',
      onResults: 'function'
    },
    dependencies: ['api-registry', 'simulation-timing'],
    responsive: true,
    accessibility: true
  },

  'workflow-simulator': {
    id: 'workflow-simulator',
    name: 'Workflow Simulator',
    componentPath: 'src/components/simulations/core/WorkflowSimulator.tsx',
    description: 'End-to-end workflow demonstrations',
    category: 'control',
    props: {
      workflow: 'object',
      showThinking: 'boolean',
      autoPlay: 'boolean'
    },
    responsive: true,
    accessibility: true
  },

  'demo-orchestrator': {
    id: 'demo-orchestrator',
    name: 'Demo Orchestrator',
    componentPath: 'src/components/simulations/core/DemoOrchestrator.tsx',
    description: 'Demo selection and execution interface',
    category: 'control',
    props: {
      demos: 'array',
      selectedDemo: 'string',
      onDemoSelect: 'function'
    },
    responsive: true,
    accessibility: true
  },

  // Orchestration Components
  'simulation-orchestrator': {
    id: 'simulation-orchestrator',
    name: 'Simulation Orchestrator',
    componentPath: 'src/components/simulations/core/SimulationOrchestrator.tsx',
    description: 'Master simulation controller for homepage',
    category: 'orchestration',
    props: {
      sections: 'array',
      sequence: 'boolean',
      parallel: 'boolean',
      userTriggered: 'boolean'
    },
    dependencies: ['api-simulation-engine', 'workflow-simulator', 'demo-orchestrator'],
    responsive: true,
    accessibility: true
  }
};

// Component Categories
export const COMPONENT_CATEGORIES = {
  visualization: {
    name: 'Visualization Components',
    description: 'Interactive visualizations and charts',
    color: 'blue'
  },
  result: {
    name: 'Result Components',
    description: 'Display simulation results and analysis',
    color: 'green'
  },
  control: {
    name: 'Control Components',
    description: 'Simulation control and orchestration',
    color: 'purple'
  },
  orchestration: {
    name: 'Orchestration Components',
    description: 'Master controllers and coordinators',
    color: 'orange'
  }
} as const;

// Simulation Type to Component Mappings
export const SIMULATION_MAPPINGS = {
  // Homepage Section Simulations
  'bridging-valley-simulation': {
    controller: 'workflow-simulator',
    visualizations: ['pipeline-visualization'],
    results: ['variant-classification', 'protein-impact-analysis', 'essentiality-analysis'],
    timing: 'pipeline'
  },
  
  'discovery-race-simulation': {
    controller: 'demo-orchestrator', 
    visualizations: ['comparison-visualization'],
    results: ['roi-impact-display'],
    timing: 'race'
  },

  'live-roi-calculator': {
    controller: 'api-simulation-engine',
    visualizations: ['roi-impact-display'],
    results: ['roi-impact-display'],
    timing: 'standard'
  },

  'evidence-protocol-demo': {
    controller: 'workflow-simulator',
    visualizations: ['sae-visualization'],
    results: ['variant-classification'],
    timing: 'detailed'
  },

  'protein-binding-simulation': {
    controller: 'api-simulation-engine',
    visualizations: ['protein-impact-analysis'],
    results: ['protein-impact-analysis'],
    timing: 'standard'
  }
} as const;

// Helper Functions
export const getSimulationComponent = (id: string): SimulationComponentConfig | undefined => {
  return SIMULATION_COMPONENTS[id];
};

export const getComponentsByCategory = (category: string): SimulationComponentConfig[] => {
  return Object.values(SIMULATION_COMPONENTS).filter(comp => comp.category === category);
};

export const getSimulationMapping = (simulationType: string) => {
  return SIMULATION_MAPPINGS[simulationType as keyof typeof SIMULATION_MAPPINGS];
};

export const validateComponentDependencies = (componentId: string): boolean => {
  const component = SIMULATION_COMPONENTS[componentId];
  if (!component || !component.dependencies) return true;

  return component.dependencies.every(depId => 
    SIMULATION_COMPONENTS[depId] !== undefined
  );
};

export const getComponentLoadOrder = (componentIds: string[]): string[] => {
  // Simple dependency resolution - components without dependencies first
  const withoutDeps = componentIds.filter(id => !SIMULATION_COMPONENTS[id]?.dependencies);
  const withDeps = componentIds.filter(id => SIMULATION_COMPONENTS[id]?.dependencies);
  
  return [...withoutDeps, ...withDeps];
};
