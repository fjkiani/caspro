import { MetricGroup } from './types';

// Core discriminative AI metrics
export const discriminativeMetrics: MetricGroup[] = [
  {
    id: 'clinvar-coverage',
    title: 'ClinVar Comprehensive Coverage',
    description: 'AUROC performance across all variant classes in ClinVar validation dataset',
    category: 'discriminative',
    benchmarks: [
      {
        slug: 'coding-snv',
        title: 'Coding SNVs',
        value: { value: 95.7, format: 'percentage', precision: 1 },
        description: 'AUROC on coding single nucleotide variants',
        dataset: 'ClinVar',
        sampleSize: 14319,
        source: 'ClinVar validation dataset',
        category: 'discriminative'
      },
      {
        slug: 'non-coding-snv',
        title: 'Non-coding SNVs',
        value: { value: 95.8, format: 'percentage', precision: 1 },
        description: 'AUROC on non-coding single nucleotide variants - SOTA',
        dataset: 'ClinVar',
        sampleSize: 34761,
        isStateOfTheArt: true,
        source: 'ClinVar non-coding',
        category: 'discriminative'
      },
      {
        slug: 'coding-non-snv',
        title: 'Coding Non-SNVs',
        value: { value: 93.9, format: 'percentage', precision: 1 },
        description: 'AUROC on coding indels and complex variants - SOTA',
        dataset: 'ClinVar',
        sampleSize: 1236,
        isStateOfTheArt: true,
        source: 'ClinVar coding non-SNVs',
        category: 'discriminative'
      },
      {
        slug: 'non-coding-non-snv',
        title: 'Non-coding Non-SNVs',
        value: { value: 91.8, format: 'percentage', precision: 1 },
        description: 'AUROC on non-coding indels and complex variants',
        dataset: 'ClinVar',
        sampleSize: 3894,
        source: 'ClinVar non-coding non-SNVs',
        category: 'discriminative'
      }
    ],
    businessImpact: 'Comprehensive variant coverage enables reliable interpretation across all genomic regions',
    methodology: 'CrisPRO.ai zero-shot ΔLL scoring with 8,192 bp context and reverse-complement averaging'
  },
  {
    id: 'oncology-specific',
    title: 'Oncology-Specific Accuracy',
    description: 'Performance on key oncology targets with supervised and zero-shot approaches',
    category: 'discriminative',
    benchmarks: [
      {
        slug: 'brca1-supervised-coding',
        title: 'BRCA1 Supervised (Coding SNV)',
        value: { value: 94.0, format: 'percentage', precision: 1 },
        description: 'AUROC with lightweight classifier on CrisPRO.ai 40B embeddings',
        dataset: 'BRCA1/2',
        sampleSize: 3893,
        source: 'BRCA1/2 validation',
        category: 'discriminative'
      },
      {
        slug: 'brca1-supervised-all',
        title: 'BRCA1 Supervised (All SNVs)',
        value: { value: 95.0, format: 'percentage', precision: 1 },
        description: 'AUROC on all SNVs with AUPRC of 86.0%',
        dataset: 'BRCA1/2',
        sampleSize: 3893,
        source: 'BRCA1/2 validation',
        category: 'discriminative'
      },
      {
        slug: 'brca1-zero-shot',
        title: 'BRCA1 Zero-shot',
        value: { value: 89.1, format: 'percentage', precision: 1 },
        description: 'AUROC improvement from 79.3% baseline',
        dataset: 'BRCA1/2',
        sampleSize: 3893,
        source: 'BRCA1/2 validation',
        category: 'discriminative'
      },
      {
        slug: 'brca2-zero-shot',
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
  },
  {
    id: 'splice-prediction',
    title: 'Splice Variant Prediction',
    description: 'Performance on splice-altering variants using SpliceVarDB',
    category: 'discriminative',
    benchmarks: [
      {
        slug: 'splice-exonic',
        title: 'Exonic Splice Variants',
        value: { value: 82.6, format: 'percentage', precision: 1 },
        description: 'AUROC on exonic splice-altering variants',
        dataset: 'SpliceVarDB',
        sampleSize: 1181,
        source: 'SpliceVarDB validation',
        category: 'discriminative'
      },
      {
        slug: 'splice-intronic',
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
    methodology: 'CrisPRO.ai 7B/40B zero-shot classification on splice-altering variants'
  }
];

// Core generative AI metrics
export const generativeMetrics: MetricGroup[] = [
  {
    id: 'genome-generation',
    title: 'High-Fidelity Genome Generation',
    description: 'Performance on generating biologically plausible genomic sequences',
    category: 'generative',
    benchmarks: [
      {
        slug: 'mito-genomes',
        title: 'Mitochondrial Genomes',
        value: { value: 100, format: 'percentage', precision: 0 },
        description: 'Correct feature counts with diverse homology and AF3 multimers',
        dataset: 'Mitochondrial',
        sampleSize: 16,
        source: 'Fig. 5C-F, 4.5.2',
        category: 'generative'
      },
      {
        slug: 'prokaryote-pfam',
        title: 'Minimal Prokaryote Pfam Hits',
        value: { value: 70, format: 'percentage', precision: 0 },
        description: 'Pfam-hit rate vs 18% for previous models',
        dataset: 'Minimal Prokaryote',
        sampleSize: 580,
        source: 'Fig. 5H, 4.5.3',
        category: 'generative'
      },
      {
        slug: 'context-window',
        title: 'Context Window',
        value: { value: 1000000, format: 'integer' },
        description: 'Single-nucleotide resolution context window',
        dataset: 'CrisPRO.ai',
        sampleSize: 1,
        source: 'CrisPRO.ai specification',
        category: 'generative'
      }
    ],
    businessImpact: 'Generate therapeutic candidates 36x faster than traditional R&D',
    methodology: 'CrisPRO.ai sequence proposals with functional steering via Enformer/Borzoi'
  },
  {
    id: 'epigenomic-design',
    title: 'Predictable Epigenomic Design',
    description: 'Controlled generation of regulatory DNA with quality scaling',
    category: 'generative',
    benchmarks: [
      {
        slug: 'quality-scaling',
        title: 'Quality Scaling',
        value: { value: 100, format: 'percentage', precision: 0 },
        description: 'Predictable log-linear relationship between beam width and AUROC',
        dataset: 'Epigenomic',
        sampleSize: 1000,
        source: 'Fig. 6C, 4.6',
        category: 'generative'
      }
    ],
    businessImpact: 'Enable precision therapeutic design with predictable quality scaling',
    methodology: 'Beam-searched CrisPRO.ai proposals scored by Enformer+Borzoi'
  }
];

// Business impact metrics
export const businessMetrics: MetricGroup[] = [
  {
    id: 'vus-resolution',
    title: 'VUS Resolution Impact',
    description: 'Reduction in Variants of Uncertain Significance',
    category: 'business',
    benchmarks: [
      {
        slug: 'vus-resolution-rate',
        title: 'VUS Resolution Rate',
        value: { value: 73, format: 'percentage', precision: 0 },
        description: 'Variants of Uncertain Significance resolved',
        dataset: 'Clinical Validation',
        sampleSize: 1000,
        source: 'Clinical validation studies',
        category: 'business'
      },
      {
        slug: 'vus-rate-reduction',
        title: 'VUS Rate Reduction',
        value: { value: 40, format: 'percentage', precision: 0 },
        description: 'Target reduction from 40% to 15% VUS rate',
        dataset: 'Clinical Validation',
        sampleSize: 1000,
        source: 'Clinical validation studies',
        category: 'business'
      },
      {
        slug: 'cost-savings',
        title: 'Cost Savings per Program',
        value: { value: 2100000, format: 'integer' },
        description: 'Estimated savings per program through focused wet-lab validation',
        dataset: 'Business Impact',
        sampleSize: 10,
        source: 'Program cost analysis',
        category: 'business'
      }
    ],
    businessImpact: 'Reduce experimental costs by $2.1M per program',
    methodology: 'Validated predictions reduce exploratory experiments and focus wet-lab validation'
  }
];
