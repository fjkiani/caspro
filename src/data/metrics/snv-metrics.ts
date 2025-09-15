import { MetricGroup } from './types';

export const codingSnvMetrics: MetricGroup = {
  id: 'coding-snv',
  title: 'Coding SNV Prediction',
  description: 'AUROC performance on coding single nucleotide variants',
  category: 'discriminative',
  benchmarks: [
    {
      title: 'Coding SNVs',
      value: { value: 95.7, format: 'percentage', precision: 1 },
      description: 'AUROC on coding single nucleotide variants',
      dataset: 'ClinVar',
      sampleSize: 14319,
      source: 'ClinVar validation dataset',
      category: 'discriminative'
    }
  ],
  businessImpact: 'High accuracy on coding variants enables reliable protein impact prediction',
  methodology: 'CrisPRO.ai zero-shot ΔLL scoring with 8,192 bp context and reverse-complement averaging'
};

export const nonCodingSnvMetrics: MetricGroup = {
  id: 'non-coding-snv',
  title: 'Non-coding SNV Prediction',
  description: 'AUROC performance on non-coding single nucleotide variants - State of the Art',
  category: 'discriminative',
  benchmarks: [
    {
      title: 'Non-coding SNVs',
      value: { value: 95.8, format: 'percentage', precision: 1 },
      description: 'AUROC on non-coding single nucleotide variants - SOTA',
      dataset: 'ClinVar',
      sampleSize: 34761,
      isStateOfTheArt: true,
      source: 'ClinVar non-coding',
      category: 'discriminative'
    }
  ],
  businessImpact: 'State-of-the-art performance on non-coding variants enables regulatory impact prediction',
  methodology: 'CrisPRO.ai zero-shot ΔLL scoring with 8,192 bp context and reverse-complement averaging'
};

export const snvOverview = {
  title: 'Single Nucleotide Variant (SNV) Prediction',
  subtitle: 'Comprehensive coverage of coding and non-coding SNVs',
  description: 'Single nucleotide variants (SNVs) are the most common type of genetic variation, affecting both protein-coding and regulatory regions. Our models provide high-accuracy predictions for both coding SNVs (affecting protein sequence) and non-coding SNVs (affecting gene regulation).',
  keyConcepts: [
    'Most common type of genetic variation',
    'Coding SNVs affect protein sequence and function',
    'Non-coding SNVs affect gene regulation and expression',
    'Critical for understanding disease mechanisms'
  ],
  clinicalSignificance: 'SNVs are the foundation of precision medicine, with coding variants directly affecting drug targets and non-coding variants influencing gene expression and therapeutic response.',
  methodology: 'Our models achieve state-of-the-art performance on both coding and non-coding SNVs using CrisPRO.ai zero-shot scoring with comprehensive genomic context.'
};
