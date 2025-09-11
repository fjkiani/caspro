import { MetricGroup } from './types';

export const brcaMetrics: MetricGroup = {
  id: 'brca-oncology',
  title: 'BRCA1/2 Oncology-Specific Accuracy',
  description: 'Performance on key oncology targets with supervised and zero-shot approaches',
  category: 'discriminative',
  benchmarks: [
    {
      title: 'BRCA1 Supervised (Coding SNV)',
      value: { value: 94.0, format: 'percentage', precision: 1 },
      description: 'AUROC with lightweight classifier on Evo2 40B embeddings',
      dataset: 'BRCA1/2',
      sampleSize: 3893,
      source: 'BRCA1/2 validation',
      category: 'discriminative'
    },
    {
      title: 'BRCA1 Supervised (All SNVs)',
      value: { value: 95.0, format: 'percentage', precision: 1 },
      description: 'AUROC on all SNVs with AUPRC of 86.0%',
      dataset: 'BRCA1/2',
      sampleSize: 3893,
      source: 'BRCA1/2 validation',
      category: 'discriminative'
    },
    {
      title: 'BRCA1 Zero-shot',
      value: { value: 89.1, format: 'percentage', precision: 1 },
      description: 'AUROC improvement from 79.3% baseline',
      dataset: 'BRCA1/2',
      sampleSize: 3893,
      source: 'BRCA1/2 validation',
      category: 'discriminative'
    },
    {
      title: 'BRCA2 Zero-shot',
      value: { value: 90.1, format: 'percentage', precision: 1 },
      description: 'AUROC on combined coding/noncoding variants',
      dataset: 'BRCA1/2',
      sampleSize: 3893,
      source: 'BRCA1/2 validation',
      category: 'discriminative'
    }
  ],
  businessImpact: 'High accuracy on key oncology targets enables reliable therapeutic guidance',
  methodology: 'Lightweight supervised heads on Evo2 40B block-20 embeddings'
};

export const brcaOverview = {
  title: 'BRCA1/2 Variant Prediction',
  subtitle: 'Oncology-specific accuracy for hereditary cancer risk assessment',
  description: 'BRCA1 and BRCA2 are tumor suppressor genes that play critical roles in DNA repair. Mutations in these genes significantly increase the risk of breast, ovarian, and other cancers. Our AI models provide high-accuracy predictions for variant pathogenicity in these key oncology targets.',
  keyConcepts: [
    'Tumor suppressor genes involved in DNA repair',
    'Hereditary breast and ovarian cancer syndrome',
    'High-penetrance cancer predisposition',
    'Therapeutic targeting with PARP inhibitors'
  ],
  clinicalSignificance: 'BRCA1/2 mutations are among the most well-characterized cancer predisposition variants, with clear clinical guidelines for risk management and therapeutic intervention.',
  methodology: 'Our models use both supervised learning on curated datasets and zero-shot prediction capabilities, achieving state-of-the-art performance on these critical oncology targets.'
};
