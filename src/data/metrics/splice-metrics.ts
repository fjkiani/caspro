import { MetricGroup } from './types';
import { UseCaseMetrics } from './types';

export const spliceMetricsData: UseCaseMetrics = {
  useCaseId: 'splice',
  title: 'Splice Variant Prediction',
  description: 'Evaluating our model\'s ability to identify variants that disrupt RNA splicing, a critical mechanism in many genetic diseases.',
  metrics: {
    discriminative: [
      {
        id: 'splice-prediction-auroc',
        title: 'Splice Variant Prediction Performance',
        description: 'AUROC scores demonstrating the accuracy of our zero-shot classification on splice-altering variants from the SpliceVarDB dataset.',
        category: 'discriminative',
        benchmarks: [
          {
            title: 'Exonic Splice Variants AUROC',
            value: { value: 0.826, format: 'decimal', precision: 3 },
            description: 'Model accuracy in identifying splice-altering variants located within exons.',
            dataset: 'SpliceVarDB',
            sampleSize: 1181,
            isStateOfTheArt: false,
            source: 'Internal validation on SpliceVarDB dataset.',
            category: 'discriminative'
          },
          {
            title: 'Intronic Splice Variants AUROC',
            value: { value: 0.825, format: 'decimal', precision: 3 },
            description: 'Model accuracy in identifying splice-altering variants located within introns.',
            dataset: 'SpliceVarDB',
            sampleSize: 3769,
            isStateOfTheArt: false,
            source: 'Internal validation on SpliceVarDB dataset.',
            category: 'discriminative'
          }
        ],
      }
    ],
    generative: [],
    business: [],
    validation: [],
  },
  whyItMatters: [
    'Splice variants are a major cause of genetic diseases, including many cancers, but are often overlooked by standard analysis pipelines.',
    'Identifying these variants is critical for accurate diagnosis, predicting disease progression, and developing targeted therapies.',
    'Misinterpretation of splice variants can lead to incorrect diagnoses and ineffective treatment strategies.'
  ],
  delivered: [
    'High-accuracy prediction of both exonic and intronic splice variants without the need for specialized assays.',
    'Provides a deeper, more comprehensive understanding of the genetic drivers of a disease.',
    'Enables the identification of novel therapeutic targets and biomarkers related to RNA processing.'
  ],
  howToRead: [
    'AUROC (Area Under the Receiver Operating Characteristic curve) measures the model\'s ability to distinguish between pathogenic and benign variants.',
    'An AUROC of 1.0 represents a perfect classifier, while 0.5 represents a random guess.',
    'Our scores (0.826 and 0.825) indicate a high degree of accuracy in identifying splice-altering variants.'
  ]
};
