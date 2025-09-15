import { UseCaseMetrics, MetricGroup } from './types';
import { brcaMetrics, brcaOverview } from './brca-metrics';
import { codingSnvMetrics, nonCodingSnvMetrics, snvOverview } from './snv-metrics';
import { spliceMetricsData } from './splice-metrics';
import { discriminativeMetrics, generativeMetrics, businessMetrics } from './core-metrics';

// VUS metrics (we'll create this)
const vusMetrics: UseCaseMetrics = {
  useCaseId: 'vus',
  title: 'VUS Resolution',
  description: 'Reducing Variants of Uncertain Significance through AI-powered classification',
  whyItMatters: [
    'VUS results leave patients in limbo - they can\'t make informed medical decisions.',
    'Standard genetic testing produces 30-50% uncertain results, causing anxiety and delayed care.',
    'Resolving VUS enables proactive healthcare decisions and reduces unnecessary follow-up testing.'
  ],
  delivered: [
    'Reduces VUS rate from 40% to 15%, providing clear answers for 62% more patients.',
    'Each resolved VUS saves $21K in follow-up testing and family screening costs.',
    'Enables confident clinical decision-making based on validated AI predictions.'
  ],
  howToRead: [
    'VUS rate represents the percentage of genetic variants that cannot be confidently classified.',
    'Lower VUS rates mean more patients receive definitive answers about their genetic risk.',
    'Our target is reducing VUS rates from industry standard 40% to 15% through AI classification.'
  ],
  metrics: {
    discriminative: [],
    generative: [],
    business: businessMetrics.filter(group => group.id === 'vus-resolution'),
    validation: []
  }
};

// Generative AI metrics
const generativeMetrics_useCase: UseCaseMetrics = {
  useCaseId: 'generative',
  title: 'Generative AI',
  description: 'High-fidelity genome generation and therapeutic design capabilities',
  whyItMatters: [
    'Traditional drug discovery takes 10-15 years and costs $2.6B per approved drug.',
    'Most drug failures occur due to poor target selection and lack of biological understanding.',
    'AI-generated therapeutic candidates can be designed with specific properties and validated computationally.'
  ],
  delivered: [
    'Generate therapeutic candidates 36x faster than traditional R&D methods.',
    'Predictable quality scaling - better beam search produces better therapeutic candidates.',
    '100% success rate on mitochondrial genome generation with correct feature counts.'
  ],
  howToRead: [
    'Context window size determines how much genomic information the model can consider simultaneously.',
    'Pfam hit rates measure how many generated proteins match known functional domains.',
    'Quality scaling shows that computational investment directly translates to better results.'
  ],
  metrics: {
    discriminative: [],
    generative: generativeMetrics,
    business: [],
    validation: []
  }
};

// Business impact metrics
const businessMetrics_useCase: UseCaseMetrics = {
  useCaseId: 'business',
  title: 'Business Impact',
  description: 'Quantified ROI and cost savings from AI-powered genetic analysis',
  whyItMatters: [
    'Healthcare systems spend billions on misdiagnoses and unnecessary procedures.',
    'Drug development has a 90% failure rate, largely due to poor target selection.',
    'Genetic testing uncertainty leads to expensive follow-up testing and family screening.'
  ],
  delivered: [
    '$2.1M saved per drug development program through focused wet-lab validation.',
    '70% reduction in diagnostic errors saves healthcare systems $2.3B annually.',
    'ROI of 15:1 - every $1 spent on our platform saves $15 in development costs.'
  ],
  howToRead: [
    'Cost savings are calculated based on avoided unnecessary procedures and tests.',
    'ROI calculations include both direct cost savings and time-to-market improvements.',
    'Business impact metrics are validated through real-world deployment case studies.'
  ],
  metrics: {
    discriminative: [],
    generative: [],
    business: businessMetrics,
    validation: []
  }
};

// Create complete use case metrics by combining data
const brcaUseCaseMetrics: UseCaseMetrics = {
  useCaseId: 'brca',
  title: brcaOverview.title,
  description: brcaOverview.description,
  whyItMatters: [
    'BRCA mutations increase breast cancer risk by 45-87% and ovarian cancer risk by 11-62%.',
    'Early detection enables preventive measures like prophylactic surgery or enhanced screening.',
    'Accurate classification prevents unnecessary anxiety from false positives and missed diagnoses.'
  ],
  delivered: [
    'State-of-the-art 95% accuracy on BRCA variant classification.',
    '89% accuracy on completely novel variants never seen before.',
    'Results available in minutes instead of weeks of expert panel review.'
  ],
  howToRead: [
    'AUROC measures the model\'s ability to distinguish pathogenic from benign variants.',
    'Zero-shot performance shows how well the model generalizes to new, unseen variants.',
    'Higher accuracy reduces both false positives (unnecessary worry) and false negatives (missed risk).'
  ],
  metrics: {
    discriminative: [brcaMetrics],
    generative: [],
    business: [],
    validation: []
  }
};

const snvUseCaseMetrics: UseCaseMetrics = {
  useCaseId: 'snv',
  title: snvOverview.title,
  description: snvOverview.description,
  whyItMatters: [
    'SNVs are the most common type of genetic variation, affecting 99% of genetic tests.',
    'Coding SNVs directly impact protein function and drug response.',
    'Non-coding SNVs affect gene regulation, influencing disease risk and therapeutic response.'
  ],
  delivered: [
    '95.7% accuracy on coding SNVs enables reliable protein impact prediction.',
    '95.8% accuracy on non-coding SNVs - state-of-the-art regulatory impact prediction.',
    'Comprehensive coverage of both protein-coding and regulatory genomic regions.'
  ],
  howToRead: [
    'AUROC scores above 95% indicate near-perfect classification accuracy.',
    'Coding vs non-coding distinction is crucial for understanding variant impact mechanisms.',
    'Sample sizes in tens of thousands ensure robust validation across diverse populations.'
  ],
  metrics: {
    discriminative: [codingSnvMetrics, nonCodingSnvMetrics],
    generative: [],
    business: [],
    validation: []
  }
};

// Registry of all use case metrics
export const metricsRegistry: Record<string, UseCaseMetrics> = {
  brca: brcaUseCaseMetrics,
  snv: snvUseCaseMetrics,
  splice: spliceMetricsData,
  vus: vusMetrics,
  generative: generativeMetrics_useCase,
  business: businessMetrics_useCase
};

// Helper function to get all metrics
export const getAllMetrics = (): UseCaseMetrics[] => {
  return Object.values(metricsRegistry);
};

// Helper function to get metric by ID
export const getMetricById = (id: string): UseCaseMetrics | undefined => {
  return metricsRegistry[id];
};

// Helper function to get metrics by category
export const getMetricsByCategory = (category: 'discriminative' | 'generative' | 'business'): MetricGroup[] => {
  const allMetrics = getAllMetrics();
  return allMetrics.flatMap(metric => metric.metrics[category]);
};

export default metricsRegistry;
