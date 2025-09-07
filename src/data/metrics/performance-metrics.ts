import { PerformanceMetric } from './types';

// Core Performance Metrics
export const performanceMetrics: PerformanceMetric[] = [
  // Discriminative AI - Variant Interpretation
  {
    label: "Coding SNVs",
    value: "95.7% AUROC",
    dataset: "ClinVar",
    samples: 14319,
    description: "Single nucleotide variants in coding regions",
    category: "discriminative"
  },
  {
    label: "Non-coding SNVs",
    value: "95.8% AUROC",
    dataset: "ClinVar",
    samples: 34761,
    description: "Single nucleotide variants in non-coding regions",
    category: "discriminative",
    isStateOfArt: true
  },
  {
    label: "Coding non-SNVs",
    value: "93.9% AUROC",
    dataset: "ClinVar",
    samples: 1236,
    description: "Non-single nucleotide variants in coding regions",
    category: "discriminative",
    isStateOfArt: true
  },
  {
    label: "Non-coding non-SNVs",
    value: "91.8% AUROC",
    dataset: "ClinVar",
    samples: 3894,
    description: "Non-single nucleotide variants in non-coding regions",
    category: "discriminative"
  },
  {
    label: "Total ClinVar Validation",
    value: "95.7% AUROC",
    dataset: "ClinVar",
    samples: 53210,
    description: "Comprehensive variant interpretation across all types",
    category: "discriminative"
  },
  
  // Oncology-Specific Accuracy
  {
    label: "BRCA1 Supervised (coding SNV)",
    value: "94.0% AUROC, 84.0% AUPRC",
    dataset: "BRCA1 Supervised",
    samples: 0,
    description: "Supervised learning on BRCA1 coding variants",
    category: "discriminative"
  },
  {
    label: "BRCA1 Supervised (all SNVs)",
    value: "95.0% AUROC, 86.0% AUPRC",
    dataset: "BRCA1 Supervised",
    samples: 0,
    description: "Supervised learning on all BRCA1 variants",
    category: "discriminative"
  },
  {
    label: "BRCA1 Zero-shot",
    value: "89.1% AUROC",
    dataset: "BRCA1 Zero-shot",
    samples: 0,
    description: "Zero-shot performance (improved from 79.3%)",
    category: "discriminative"
  },
  {
    label: "BRCA2 Zero-shot",
    value: "90.1% AUROC",
    dataset: "BRCA2 Zero-shot",
    samples: 0,
    description: "Combined coding/noncoding performance",
    category: "discriminative"
  },
  {
    label: "Total BRCA1/2 Samples",
    value: "Combined Performance",
    dataset: "BRCA1/2",
    samples: 3893,
    description: "Total variants across BRCA1 and BRCA2",
    category: "discriminative"
  },
  
  // Splice Variant Prediction
  {
    label: "Exonic Splice Variants",
    value: "82.6% AUROC",
    dataset: "SpliceVarDB",
    samples: 1181,
    description: "Splice variants in exonic regions",
    category: "discriminative"
  },
  {
    label: "Intronic Splice Variants",
    value: "82.5% AUROC",
    dataset: "SpliceVarDB",
    samples: 3769,
    description: "Splice variants in intronic regions",
    category: "discriminative"
  },
  {
    label: "Total SpliceVarDB",
    value: "82.5% AUROC",
    dataset: "SpliceVarDB",
    samples: 4950,
    description: "Comprehensive splice variant prediction",
    category: "discriminative"
  },
  
  // Generative AI Capabilities
  {
    label: "Context Window",
    value: "1M tokens",
    dataset: "CrisPRO Generation",
    samples: 0,
    description: "Single-nucleotide resolution generation",
    category: "generative"
  },
  {
    label: "Mitochondrial Genome Generation",
    value: "High-Fidelity",
    dataset: "CrisPRO Generation",
    samples: 0,
    description: "Correct feature counts, diverse homology, AF3 multimers fold plausibly",
    category: "generative"
  },
  {
    label: "Minimal Prokaryote Generation",
    value: "~70% Pfam-hit rate",
    dataset: "CrisPRO Generation",
    samples: 0,
    description: "vs ~18% for previous models",
    category: "generative"
  },
  {
    label: "Yeast Chromosome Generation",
    value: "Eukaryote-like",
    dataset: "CrisPRO Generation",
    samples: 0,
    description: "Genes, introns, tRNAs, promoters",
    category: "generative"
  },
  
  // Cross-Species Validation
  {
    label: "Cross-Species Range",
    value: "0.82-0.99 AUROC",
    dataset: "8 Species",
    samples: 0,
    description: "Performance across multiple species",
    category: "validation"
  }
];

// Helper functions for filtering metrics
export const getMetricsByCategory = (category: PerformanceMetric['category']) => 
  performanceMetrics.filter(metric => metric.category === category);

export const getStateOfArtMetrics = () => 
  performanceMetrics.filter(metric => metric.isStateOfArt);

export const getMetricsByDataset = (dataset: string) => 
  performanceMetrics.filter(metric => metric.dataset === dataset);
