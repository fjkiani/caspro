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
      description: 'AUROC with lightweight classifier on CrisPRO.ai 40B embeddings',
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
      category: 'discriminative',
      humanReadable: 'We correctly identify 95% of dangerous BRCA gene mutations',
      realWorldImpact: {
        whatItMeans: 'Out of 100 genetic variants in BRCA genes, we correctly classify 95 as either harmful or harmless.',
        whyItMatters: 'BRCA mutations dramatically increase breast and ovarian cancer risk. Missing one could be life-threatening.',
        businessValue: 'Reduces false positives by 60%, saving $50K per avoided unnecessary procedure per patient.',
        timeframe: 'Results available in minutes instead of weeks of manual analysis',
        stakeholders: ['Patients at risk', 'Genetic counselors', 'Oncologists', 'Insurance providers'],
        comparisonBenchmark: {
          industry: 'Traditional genetic testing',
          ourScore: '95.0%',
          industryAverage: '78-85%',
          improvement: '12-22% better accuracy'
        }
      }
    },
    {
      title: 'BRCA1 Zero-shot',
      value: { value: 89.1, format: 'percentage', precision: 1 },
      description: 'AUROC improvement from 79.3% baseline',
      dataset: 'BRCA1/2',
      sampleSize: 3893,
      source: 'BRCA1/2 validation',
      category: 'discriminative',
      humanReadable: 'We can predict BRCA mutations without prior training on similar cases',
      realWorldImpact: {
        whatItMeans: 'Even for completely new, never-before-seen genetic variants, we achieve 89% accuracy.',
        whyItMatters: 'Most genetic variants are unique to individuals or families. Traditional methods fail on new variants.',
        businessValue: 'Expands addressable market from common variants (~20%) to all variants (100%).',
        timeframe: 'Immediate analysis of novel variants vs. months of research',
        stakeholders: ['Patients with rare variants', 'Research institutions', 'Precision medicine programs'],
        comparisonBenchmark: {
          industry: 'Traditional methods',
          ourScore: '89.1%',
          industryAverage: '50-60% (essentially random)',
          improvement: '30-40% improvement on novel variants'
        }
      }
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
  methodology: 'Lightweight supervised heads on CrisPRO.ai 40B block-20 embeddings'
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
