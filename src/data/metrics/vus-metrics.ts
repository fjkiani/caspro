import { MetricGroup } from './types';

export const vusMetrics: MetricGroup = {
  id: 'vus-resolution',
  title: 'VUS Resolution Impact',
  description: 'Reduction in Variants of Uncertain Significance',
  category: 'business',
  benchmarks: [
    {
      title: 'VUS Resolution Rate',
      value: { value: 73, format: 'percentage', precision: 0 },
      description: 'Variants of Uncertain Significance resolved',
      dataset: 'Clinical Validation',
      sampleSize: 1000,
      source: 'Clinical validation studies',
      category: 'business'
    },
    {
      title: 'VUS Rate Reduction',
      value: { value: 40, format: 'percentage', precision: 0 },
      description: 'Target reduction from 40% to 15% VUS rate',
      dataset: 'Clinical Validation',
      sampleSize: 1000,
      source: 'Clinical validation studies',
      category: 'business'
    },
    {
      title: 'Cost Savings per Program',
      value: { value: 2100000, format: 'integer' },
      description: 'Estimated savings per program through focused wet-lab validation',
      dataset: 'Business Impact',
      sampleSize: 10,
      source: 'Program cost analysis',
      category: 'business'
    }
  ],
  businessImpact: 'Transform 40% VUS rate to 15% with validated predictions, accelerating target selection',
  methodology: 'Validated predictions reduce exploratory experiments and focus wet-lab validation'
};

export const vusOverview = {
  title: 'VUS Resolution',
  subtitle: 'Transforming Variants of Uncertain Significance into actionable insights',
  description: 'Variants of Uncertain Significance (VUS) are genetic changes where the clinical impact is unclear. These variants represent a major challenge in precision medicine, often leading to delayed or uncertain clinical decisions. Our AI models help resolve VUS by providing evidence-based predictions of variant pathogenicity.',
  keyConcepts: [
    'Genetic variants with unclear clinical significance',
    'Major bottleneck in precision medicine',
    'Requires evidence-based classification',
    'Impacts clinical decision-making'
  ],
  clinicalSignificance: 'VUS resolution is critical for precision medicine implementation. Reducing VUS rates from 40% to 15% enables more confident clinical decisions and accelerates therapeutic development.',
  methodology: 'Our validated predictions combine multiple lines of evidence to classify VUS, reducing uncertainty and enabling more confident clinical decisions.'
};
