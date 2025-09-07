// Central export file for all metrics and capabilities data
// This provides a clean, modular architecture for easy expansion

// Export types
export * from './types';

// Export data modules
export * from './performance-metrics';
export * from './business-impacts';
export * from './capability-sections';
export * from './use-cases';
export * from './workflow-steps';
export * from './safety-measures';
export * from './key-stats';

// Re-export everything for convenience
import { performanceMetrics } from './performance-metrics';
import { businessImpacts } from './business-impacts';
import { capabilitySections } from './capability-sections';
import { useCases } from './use-cases';
import { workflowSteps } from './workflow-steps';
import { safetyMeasures } from './safety-measures';
import { keyStats } from './key-stats';

// Main export object for easy access
export const metricsAndCapabilities = {
  performanceMetrics,
  businessImpacts,
  capabilitySections,
  useCases,
  workflowSteps,
  safetyMeasures,
  keyStats
};

// Default export
export default metricsAndCapabilities;
