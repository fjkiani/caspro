// Type definitions for metrics and capabilities data

export interface PerformanceMetric {
  label: string;
  value: string;
  dataset: string;
  samples: number;
  description: string;
  category: 'discriminative' | 'generative' | 'validation' | 'business';
  isStateOfArt?: boolean;
}

export interface BusinessImpact {
  metric: string;
  value: string;
  description: string;
  category: 'cost' | 'timeline' | 'accuracy' | 'efficiency';
}

export interface CapabilitySection {
  title: string;
  subtitle: string;
  metrics: PerformanceMetric[];
  businessImpacts: BusinessImpact[];
  description: string;
}

export interface UseCase {
  title: string;
  problem: string;
  solution: string;
  businessImpact: string;
  metrics: PerformanceMetric[];
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  capability: string;
  businessValue: string;
}

export interface SafetyMeasure {
  title: string;
  description: string;
  category: 'Safety' | 'Transparency' | 'Compliance';
}

export interface KeyStats {
  totalVariants: number;
  aurocScore: number;
  vusResolution: number;
  contextWindow: string;
  timelineCompression: string;
  costReduction: string;
  crossSpeciesRange: string;
  speciesCount: number;
}
