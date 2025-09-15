// Simulation Timing Configuration
// Based on Homepage Simulation Transformation Doctrine

export interface TimingConfig {
  id: string;
  name: string;
  description: string;
  durations: {
    loading: number;
    processing: number;
    results: number;
    total: number;
  };
  steps: {
    name: string;
    duration: number;
    description: string;
  }[];
  animations: {
    fadeIn: number;
    slideIn: number;
    progressBar: number;
    typewriter: number;
  };
}

// Predefined Timing Configurations
export const TIMING_CONFIGS: Record<string, TimingConfig> = {
  // Fast Demo - For quick homepage interactions
  fast: {
    id: 'fast',
    name: 'Fast Demo',
    description: 'Quick demonstration for homepage interactions',
    durations: {
      loading: 500,
      processing: 1000,
      results: 800,
      total: 2300
    },
    steps: [
      { name: 'Initialize', duration: 500, description: 'Setting up simulation' },
      { name: 'Process', duration: 1000, description: 'Running AI analysis' },
      { name: 'Results', duration: 800, description: 'Displaying results' }
    ],
    animations: {
      fadeIn: 300,
      slideIn: 400,
      progressBar: 100,
      typewriter: 50
    }
  },

  // Standard Demo - For detailed API demonstrations
  standard: {
    id: 'standard',
    name: 'Standard Demo',
    description: 'Standard timing for detailed API demonstrations',
    durations: {
      loading: 800,
      processing: 2000,
      results: 1200,
      total: 4000
    },
    steps: [
      { name: 'Context Loading', duration: 800, description: 'Loading genomic context' },
      { name: 'AI Analysis', duration: 2000, description: 'Multi-modal AI analysis' },
      { name: 'Result Generation', duration: 1200, description: 'Generating detailed results' }
    ],
    animations: {
      fadeIn: 400,
      slideIn: 500,
      progressBar: 150,
      typewriter: 75
    }
  },

  // Detailed Demo - For comprehensive workflow simulations
  detailed: {
    id: 'detailed',
    name: 'Detailed Demo',
    description: 'Comprehensive timing for full workflow demonstrations',
    durations: {
      loading: 1000,
      processing: 3000,
      results: 2000,
      total: 6000
    },
    steps: [
      { name: 'Data Ingestion', duration: 1000, description: 'Ingesting and validating input data' },
      { name: 'Multi-Stage Analysis', duration: 3000, description: 'Running comprehensive AI analysis' },
      { name: 'Evidence Compilation', duration: 2000, description: 'Compiling evidence and generating dossier' }
    ],
    animations: {
      fadeIn: 500,
      slideIn: 600,
      progressBar: 200,
      typewriter: 100
    }
  },

  // Pipeline Demo - For multi-stage API orchestration
  pipeline: {
    id: 'pipeline',
    name: 'Pipeline Demo',
    description: 'Multi-stage pipeline with sequential API calls',
    durations: {
      loading: 1200,
      processing: 4500,
      results: 1800,
      total: 7500
    },
    steps: [
      { name: 'Stage 1: Target Validation', duration: 2000, description: 'Predicting variant impact' },
      { name: 'Stage 2: Lead Engineering', duration: 3000, description: 'Generating optimized therapeutics' },
      { name: 'Stage 3: Pre-Clinical Confirmation', duration: 2500, description: 'Validating functional impact' }
    ],
    animations: {
      fadeIn: 600,
      slideIn: 800,
      progressBar: 250,
      typewriter: 120
    }
  },

  // Race Demo - For comparison simulations
  race: {
    id: 'race',
    name: 'Race Demo',
    description: 'Side-by-side comparison with different pacing',
    durations: {
      loading: 500,
      processing: 10000, // Traditional approach metaphor
      results: 1000,
      total: 11500
    },
    steps: [
      { name: 'Traditional Screening', duration: 10000, description: 'Slow, linear progress (18 months metaphor)' },
      { name: 'AI Generation', duration: 1000, description: 'Fast, exponential progress (1 week metaphor)' }
    ],
    animations: {
      fadeIn: 300,
      slideIn: 400,
      progressBar: 50, // Faster updates for race effect
      typewriter: 30
    }
  }
};

// Simulation Speed Multipliers
export const SPEED_MULTIPLIERS = {
  slow: 2.0,      // 2x slower for detailed viewing
  normal: 1.0,    // Standard speed
  fast: 0.5,      // 2x faster for quick demos
  instant: 0.1    // Nearly instant for testing
} as const;

// Helper Functions
export const getTimingConfig = (id: string): TimingConfig | undefined => {
  return TIMING_CONFIGS[id];
};

export const applySpeedMultiplier = (
  config: TimingConfig, 
  multiplier: keyof typeof SPEED_MULTIPLIERS
): TimingConfig => {
  const factor = SPEED_MULTIPLIERS[multiplier];
  
  return {
    ...config,
    durations: {
      loading: Math.round(config.durations.loading * factor),
      processing: Math.round(config.durations.processing * factor),
      results: Math.round(config.durations.results * factor),
      total: Math.round(config.durations.total * factor)
    },
    steps: config.steps.map(step => ({
      ...step,
      duration: Math.round(step.duration * factor)
    })),
    animations: {
      fadeIn: Math.round(config.animations.fadeIn * factor),
      slideIn: Math.round(config.animations.slideIn * factor),
      progressBar: Math.round(config.animations.progressBar * factor),
      typewriter: Math.round(config.animations.typewriter * factor)
    }
  };
};

export const createCustomTiming = (
  id: string,
  name: string,
  stepDurations: number[]
): TimingConfig => {
  const total = stepDurations.reduce((sum, duration) => sum + duration, 0);
  
  return {
    id,
    name,
    description: `Custom timing configuration for ${name}`,
    durations: {
      loading: stepDurations[0] || 1000,
      processing: stepDurations.slice(1, -1).reduce((sum, d) => sum + d, 0) || 2000,
      results: stepDurations[stepDurations.length - 1] || 1000,
      total
    },
    steps: stepDurations.map((duration, index) => ({
      name: `Step ${index + 1}`,
      duration,
      description: `Custom step ${index + 1}`
    })),
    animations: {
      fadeIn: 400,
      slideIn: 500,
      progressBar: 150,
      typewriter: 75
    }
  };
};
