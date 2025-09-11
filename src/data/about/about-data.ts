// About page data structure - DRY and reusable
import { 
  extractAboutHero, 
  extractStorySection, 
  extractDiscriminativeSection, 
  extractGenerativeSection, 
  extractFusionSection, 
  extractBusinessValueSection,
  extractAboutCapabilities
} from './about-extractor';

export interface AboutSection {
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

export interface AboutData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    keyMetrics: {
      label: string;
      value: string;
      description: string;
    }[];
  };
  story: AboutSection;
  evidence: {
    discriminative: AboutSection;
    generative: AboutSection;
  };
  fusion: AboutSection;
  businessValue: AboutSection;
  capabilities: any[];
}

// Use extractor functions to get data from existing structures
export const aboutData: AboutData = {
  hero: extractAboutHero(),
  story: extractStorySection(),
  evidence: {
    discriminative: extractDiscriminativeSection(),
    generative: extractGenerativeSection()
  },
  fusion: extractFusionSection(),
  businessValue: extractBusinessValueSection(),
  capabilities: extractAboutCapabilities()
};
