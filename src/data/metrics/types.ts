// Core metric types for evidence and validation

export interface PerformanceMetric {
  label: string;
  value: string;
  dataset: string;
  samples: number;
  description: string;
  category: 'discriminative' | 'generative' | 'business' | 'validation' | 'technical' | 'estimated';
  isStateOfTheArt?: boolean;
  source?: string;
}

export interface SafetyMeasure {
  id?: string;
  title: string;
  description: string;
  category: 'data' | 'model' | 'deployment' | 'governance' | 'safety';
  implementation?: string;
  validation?: string;
  compliance?: string[];
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

export interface MetricValue {
  value: number;
  unit?: string;
  format?: 'percentage' | 'decimal' | 'integer' | 'ratio';
  precision?: number;
}

export interface MetricBenchmark {
  slug?: string;
  title: string;
  value: MetricValue;
  description: string;
  dataset: string;
  sampleSize: number;
  isStateOfTheArt?: boolean;
  source: string;
  category: 'discriminative' | 'generative' | 'business' | 'validation' | 'technical' | 'estimated';
  humanReadable?: string;
  realWorldImpact?: {
    whatItMeans: string;
    whyItMatters: string;
    businessValue: string;
    timeframe: string;
    stakeholders: string[];
    comparisonBenchmark?: {
      industry: string;
      ourScore: string;
      industryAverage: string;
      improvement: string;
    };
  };
}

export interface MetricGroup {
  id: string;
  title: string;
  description: string;
  category: 'discriminative' | 'generative' | 'business' | 'validation' | 'technical' | 'estimated';
  benchmarks: MetricBenchmark[];
  businessImpact?: string;
  methodology?: string;
  realWorldImpact?: {
    whatItMeans: string;
    whyItMatters: string;
    businessValue: string;
    timeframe: string;
    stakeholders: string[];
  };
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