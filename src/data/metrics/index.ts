// Metrics and use case exports
export * from './types';
export * from './core-metrics';

// Use cases
export { multipleMyelomaUseCase, multipleMyelomaCapabilities } from '../use-cases/multiple-myeloma';

// Utility functions for metrics
export const formatMetricValue = (value: any, format?: string, precision?: number): string => {
  if (typeof value !== 'number') return String(value);
  
  switch (format) {
    case 'percentage':
      return `${value.toFixed(precision || 1)}%`;
    case 'decimal':
      return value.toFixed(precision || 2);
    case 'integer':
      return value.toLocaleString();
    case 'ratio':
      return `${value.toFixed(precision || 2)}:1`;
    default:
      return value.toString();
  }
};

export const getMetricColor = (category: string): string => {
  switch (category) {
    case 'discriminative': return 'blue';
    case 'generative': return 'purple';
    case 'business': return 'green';
    case 'validation': return 'orange';
    default: return 'gray';
  }
};

export const getMetricIcon = (category: string): string => {
  switch (category) {
    case 'discriminative': return 'Target';
    case 'generative': return 'Dna';
    case 'business': return 'TrendingUp';
    case 'validation': return 'CheckCircle';
    default: return 'Activity';
  }
};