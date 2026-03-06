// Extract about data from existing structures - DRY approach
import { discriminativeMetrics, generativeMetrics, businessMetrics } from '@/data/metrics/core-metrics';
import { performanceMetrics } from '@/data/metrics/performance-metrics';
import { inSilicoCapabilities } from '@/data/insilico/capabilities';
import { formatMetricValue } from '@/data/metrics';

export interface AboutHeroData {
  title: string;
  subtitle: string;
  description: string;
  keyMetrics: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface AboutSectionData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  keyPoints?: string[];
  metrics?: {
    label: string;
    value: string;
    description: string;
  }[];
  businessImpact?: string;
}

// Extract hero data from existing metrics
export const extractAboutHero = (): AboutHeroData => {
  const clinvarMetric = performanceMetrics.find(m => m.label === "Total ClinVar Validation");
  const vusMetric = businessMetrics.find(m => m.id === 'vus-resolution');
  const accelerationMetric = generativeMetrics.find(m => m.id === 'genome-generation');

  return {
    title: "CrisPRO.ai: In-Silico Research Framework",
    subtitle: "Accelerating drug discovery through AI fusion",
    description: "An in-silico research-use-only (RUO) framework designed to accelerate drug discovery by fusing the capabilities of discriminative and generative Artificial Intelligence. Our platform orchestrates a generalist genome foundation model with a suite of specialist predictors and structural oracles to achieve state-of-the-art performance across multiple benchmarks.",
    keyMetrics: [



    ]
  };
};

// Extract story section from existing data
export const extractStorySection = (): AboutSectionData => {
  return {
    id: "story",
    title: "From Genetic Chaos to Therapeutic Clarity",
    description: "The promise of precision medicine is fundamentally limited by our ability to interpret the functional consequences of genetic variation. CrisPRO.ai was conceived to address this challenge by creating an orchestration layer that combines a genome-scale foundation model with specialist predictors (e.g., AlphaMissense) and structure/epigenome oracles (e.g., AlphaFold 3, Enformer). The result is a system that can not only interpret the full spectrum of genetic variation but can also generatively design novel therapeutic constructs.",
    keyPoints: [
      "Traditional drug development is a $2.6 billion, 15-year gamble with 90% failure rates",
      "Biotech companies spend months analyzing genetic data, only to discover their targets are invalid",
      "Clinical trials fail because we can't predict which patients will respond to which treatments",
      "We transform this chaos into clarity with definitive answers where others offer question marks"
    ],
    businessImpact: "Transform genetic uncertainty into actionable intelligence and therapeutic blueprints"
  };
};

// Extract discriminative AI section from existing metrics
export const extractDiscriminativeSection = (): AboutSectionData => {
  const clinvarGroup = discriminativeMetrics.find(m => m.id === 'clinvar-coverage');
  const oncologyGroup = discriminativeMetrics.find(m => m.id === 'oncology-specific');
  const spliceGroup = discriminativeMetrics.find(m => m.id === 'splice-prediction');

  const metrics = [
    ...(clinvarGroup?.benchmarks?.slice(0, 3) || []).map(b => ({
      label: b.title,
      value: formatMetricValue(b.value.value, b.value.format, b.value.precision),
      description: `${b.dataset} (${b.sampleSize?.toLocaleString()} samples)`
    })),
    ...(oncologyGroup?.benchmarks?.slice(0, 2) || []).map(b => ({
      label: b.title,
      value: formatMetricValue(b.value.value, b.value.format, b.value.precision),
      description: b.description
    })),
    ...(spliceGroup?.benchmarks?.slice(0, 1) || []).map(b => ({
      label: b.title,
      value: formatMetricValue(b.value.value, b.value.format, b.value.precision),
      description: `${b.dataset} (${b.sampleSize?.toLocaleString()} samples)`
    }))
  ];

  return {
    id: "discriminative",
    title: "Discriminative AI: The Intelligence Analyst",
    subtitle: "Validated performance that delivers real business impact",
    description: "Our system's ability to interpret genetic variants is validated against multiple gold-standard datasets, delivering real business impact.",
    metrics,
    businessImpact: clinvarGroup?.businessImpact || "Transform 40% VUS rate to 15% with validated predictions, accelerating target selection and reducing experimental costs by $2.1M per program."
  };
};

// Extract generative AI section from existing metrics
export const extractGenerativeSection = (): AboutSectionData => {
  const genomeGroup = generativeMetrics.find(m => m.id === 'genome-generation');
  const epigenomicGroup = generativeMetrics.find(m => m.id === 'epigenomic-design');

  const metrics = [
    ...(genomeGroup?.benchmarks || []).map(b => ({
      label: b.title,
      value: formatMetricValue(b.value.value, b.value.format, b.value.precision),
      description: b.description
    })),
    ...(epigenomicGroup?.benchmarks || []).map(b => ({
      label: b.title,
      value: formatMetricValue(b.value.value, b.value.format, b.value.precision),
      description: b.description
    }))
  ];

  return {
    id: "generative",
    title: "Generative AI: The Weapons Factory",
    subtitle: "Unprecedented R&D acceleration through novel biological design",
    description: "Our platform's ability to design novel biological constructs delivers unprecedented R&D acceleration.",
    metrics,
    businessImpact: genomeGroup?.businessImpact || "Generate therapeutic candidates 36x faster than traditional R&D, compressing development timelines from years to weeks."
  };
};

// Extract fusion section
export const extractFusionSection = (): AboutSectionData => {
  return {
    id: "fusion",
    title: "The Fusion Approach: Why We Win",
    description: "The competitive advantage of CrisPRO.ai lies in our fusion approach. We combine the generalist genome foundation model with specialist models to achieve SOTA across the entire R&D continuum.",

  };
};

// Extract business value section
export const extractBusinessValueSection = (): AboutSectionData => {
  const vusGroup = businessMetrics.find(m => m.id === 'vus-resolution');

  return {
    id: "business-value",
    title: "Business Value: From Research to Revenue",
    description: "Our results demonstrate that this fusion approach achieves 95.7% AUROC ClinVar validation on 53,210 samples, resolves 73% of Variants of Uncertain Significance (VUS), and provides a comprehensive, transparent, and controllable system for in-silico drug discovery.",
    keyPoints: [
      "Accelerate R&D from years to weeks",
      "Reduce experimental costs by $2.1M per program",
      "Transform 40% VUS rate to 15% with validated predictions",
      "Enable precision therapeutic design with predictable quality scaling",
      "Provide comprehensive, transparent, and controllable system"
    ],
    businessImpact: vusGroup?.businessImpact || "Transform 40% VUS rate to 15% with validated predictions, accelerating target selection and reducing experimental costs by $2.1M per program."
  };
};

// Extract capabilities for about page
export const extractAboutCapabilities = () => {
  return inSilicoCapabilities.slice(0, 6).map(capability => ({
    title: capability.title,
    subtitle: capability.description,
    icon: capability.icon,
    color: capability.color,
    kpis: [
      {
        label: "Performance",
        value: "High",
        unit: ""
      }
    ],
    actions: [
      {
        label: "Explore",
        href: `/platform/${capability.slug}`,
        variant: "primary" as const
      }
    ]
  }));
};
