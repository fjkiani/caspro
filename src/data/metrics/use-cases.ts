import { UseCase } from './types';
import { performanceMetrics } from './performance-metrics';
import { businessImpacts } from './business-impacts';

// Use Cases
export const useCases: UseCase[] = [
  {
    title: "Biotech R&D Transformation",
    problem: "90% drug failure rate, $2.6B cost per drug, 15-year development cycles",
    solution: "Target validation with 95.7% AUROC ClinVar validation, therapeutic design with 1M token context window, comprehensive candidate generation",
    businessImpact: "Transform R&D from high-risk gamble to predictable engineering discipline",
    metrics: [
      performanceMetrics[4], // Total ClinVar Validation
      performanceMetrics[13], // Context Window
      performanceMetrics[2] // R&D Timeline Compression
    ]
  },
  {
    title: "Clinical Oncology Revolution",
    problem: "40% VUS rate, limited pharmacogenomic guidance, trial-and-error treatment",
    solution: "VUS resolution with 73% rate, drug ranking with MoA-aligned recommendations, personalized medicine with patient-specific insights",
    businessImpact: "Enable precision oncology with validated genetic insights and transparent methodology",
    metrics: [
      performanceMetrics[5], // BRCA1 Supervised
      performanceMetrics[6] // BRCA1 Supervised all SNVs
    ]
  },
  {
    title: "Academic Research Acceleration",
    problem: "Limited in-silico validation, expensive wet-lab experiments, fragmented tools",
    solution: "High-throughput screening with 1M token context, publication-quality results, reproducible research with audit trails",
    businessImpact: "Accelerate research with validated AI engines and transparent methodology",
    metrics: [
      performanceMetrics[13], // Context Window
      performanceMetrics[18] // Cross-Species Range
    ]
  }
];

// Helper functions for use cases
export const getUseCaseByTitle = (title: string) => 
  useCases.find(useCase => useCase.title === title);

export const getUseCasesByProblem = (problemKeyword: string) => 
  useCases.filter(useCase => 
    useCase.problem.toLowerCase().includes(problemKeyword.toLowerCase())
  );

export const getUseCasesBySolution = (solutionKeyword: string) => 
  useCases.filter(useCase => 
    useCase.solution.toLowerCase().includes(solutionKeyword.toLowerCase())
  );
