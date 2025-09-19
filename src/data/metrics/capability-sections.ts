import { performanceMetrics } from './performance-metrics';
import { businessImpacts } from './business-impacts';

interface CapabilitySection {
  title: string;
  subtitle: string;
  description: string;
  metrics: any[];
  businessImpacts: any[];
}

// Capability Sections
export const capabilitySections: CapabilitySection[] = [
  {
    title: "Discriminative AI: The Oracle Engine",
    subtitle: "Variant interpretation validated against gold-standard datasets",
    description: "Our system's ability to interpret genetic variants is validated against multiple gold-standard datasets, delivering real business impact.",
    metrics: performanceMetrics.filter(m => m.category === 'discriminative'),
    businessImpacts: [
      businessImpacts[0], // VUS Rate Reduction
      businessImpacts[1], // Experimental Cost Reduction
      businessImpacts[5]  // VUS Resolution Rate
    ]
  },
  {
    title: "Generative AI: The Weapons Factory",
    subtitle: "Novel biological construct design with unprecedented R&D acceleration",
    description: "Our platform's ability to design novel biological constructs delivers unprecedented R&D acceleration.",
    metrics: performanceMetrics.filter(m => m.category === 'generative'),
    businessImpacts: [
      businessImpacts[2], // R&D Timeline Compression
      businessImpacts[3], // Discovery Acceleration
      businessImpacts[6]  // Experimental Cost Reduction
    ]
  },
  {
    title: "The Fusion Approach: Why We Win",
    subtitle: "Combining generalist and specialist models for SOTA performance",
    description: "The competitive advantage of CrisPRO.ai lies in our fusion approach. We combine the generalist genome foundation model with specialist models to achieve SOTA across the entire R&D continuum.",
    metrics: performanceMetrics.filter(m => m.category === 'validation'),
    businessImpacts: [
      businessImpacts[4], // Drug Failure Rate
      businessImpacts[2], // R&D Timeline Compression
      businessImpacts[1]  // Experimental Cost Reduction
    ]
  }
];

// Helper functions for capability sections
export const getCapabilityByTitle = (title: string) => 
  capabilitySections.find(section => section.title === title);

export const getCapabilitiesByCategory = (category: 'discriminative' | 'generative' | 'validation') => 
  capabilitySections.filter(section => 
    section.metrics.some(metric => metric.category === category)
  );

