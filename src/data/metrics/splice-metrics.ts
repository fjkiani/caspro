import { MetricGroup } from './types';

export const spliceMetrics: MetricGroup = {
  id: 'splice-prediction',
  title: 'Splice Variant Prediction',
  description: 'Performance on splice-altering variants using SpliceVarDB',
  category: 'discriminative',
  benchmarks: [
    {
      title: 'Exonic Splice Variants',
      value: { value: 82.6, format: 'percentage', precision: 1 },
      description: 'AUROC on exonic splice-altering variants',
      dataset: 'SpliceVarDB',
      sampleSize: 1181,
      source: 'SpliceVarDB validation',
      category: 'discriminative'
    },
    {
      title: 'Intronic Splice Variants',
      value: { value: 82.5, format: 'percentage', precision: 1 },
      description: 'AUROC on intronic splice-altering variants',
      dataset: 'SpliceVarDB',
      sampleSize: 3769,
      source: 'SpliceVarDB validation',
      category: 'discriminative'
    }
  ],
  businessImpact: 'Enables identification of functional variants affecting RNA processing and drug response',
  methodology: 'Evo2 7B/40B zero-shot classification on splice-altering variants'
};

export const spliceOverview = {
  title: 'Splice Variant Prediction',
  subtitle: 'Identifying variants that affect RNA splicing and processing',
  description: 'Splice variants are genetic changes that affect how genes are processed into functional proteins. These variants can disrupt normal RNA splicing, leading to altered protein function or disease. Our models predict the functional impact of variants on splicing with high accuracy.',
  keyConcepts: [
    'Variants affecting RNA splicing machinery',
    'Exonic variants disrupting splice sites',
    'Intronic variants creating new splice sites',
    'Impact on protein function and disease'
  ],
  clinicalSignificance: 'Splice variants are a major cause of genetic disease and can significantly impact therapeutic response. Accurate prediction enables better understanding of variant pathogenicity.',
  methodology: 'Our models use Evo2 7B/40B zero-shot classification to predict splice-altering variants with high accuracy across both exonic and intronic regions.'
};
