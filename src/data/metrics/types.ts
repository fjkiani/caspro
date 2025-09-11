// Core metric types for evidence and validation

export interface MetricValue {
  value: number;
  unit?: string;
  format?: 'percentage' | 'decimal' | 'integer' | 'ratio';
  precision?: number;
}

export interface MetricBenchmark {
  title: string;
  value: MetricValue;
  description: string;
  dataset: string;
  sampleSize: number;
  isStateOfTheArt?: boolean;
  source: string;
  category: 'discriminative' | 'generative' | 'business' | 'validation' | 'technical' | 'estimated';
}

export interface MetricGroup {
  id: string;
  title: string;
  description: string;
  category: 'discriminative' | 'generative' | 'business' | 'validation' | 'technical' | 'estimated';
  benchmarks: MetricBenchmark[];
  businessImpact?: string;
  methodology?: string;
}

export interface UseCaseMetrics {
  useCaseId: string;
  title: string;
  description: string;
  whyItMatters?: string[];
  delivered?: string[];
  howToRead?: string[];
  metrics: {
    discriminative: MetricGroup[];
    generative: MetricGroup[];
    business: MetricGroup[];
    validation: MetricBenchmark[];
  };
  specificFindings?: {
    title: string;
    description: string;
    metrics: MetricBenchmark[];
  }[];
}