import { ComponentType } from 'react';

// Import topic components
import BiologyOfCancerSection from '@/components/learn/topics/BiologyOfCancerSection';
import EnhancedBiologySection from '@/components/learn/topics/EnhancedBiologySection';
import EnhancedGeneticsSection from '@/components/learn/topics/EnhancedGeneticsSection';
import EnhancedHallmarksSection from '@/components/learn/topics/EnhancedHallmarksSection';
import MetastasisSection from '@/components/learn/topics/MetastasisSection';
import StagingSection from '@/components/learn/topics/StagingSection';
import QuizSection from '@/components/learn/topics/QuizSection';

export interface Topic {
  slug: string;
  title: string;
  description: string;
  component: ComponentType;
}

export interface Module {
  slug: string;
  title: string;
  description: string;
  topics: Topic[];
}

export const modules: Module[] = [
  {
    slug: 'oncology-101',
    title: 'Oncology 101: The Fundamentals of Cancer',
    description: 'A comprehensive overview of the basic principles of oncology, from the biology of cancer to treatment modalities.',
    topics: [
      {
        slug: 'biology-of-cancer',
        title: 'Part 1: Defining the Enemy - The Biology of Cancer',
        description: 'An introduction to the core concepts of cancer, its classification, and the path to malignancy.',
        component: EnhancedBiologySection,
      },
      {
        slug: 'genetics-of-cancer',
        title: 'Part 2: The Genetic Blueprint of Cancer',
        description: 'Understanding how genetic changes drive cancer development, including oncogenes, tumor suppressors, and the two-hit hypothesis.',
        component: EnhancedGeneticsSection,
      },
      {
        slug: 'hallmarks-of-cancer',
        title: 'Part 3: The Hallmarks of Cancer',
        description: 'The ten acquired capabilities that govern the transformation of normal cells into malignant ones.',
        component: EnhancedHallmarksSection,
      },
      {
        slug: 'metastasis',
        title: 'Part 4: Understanding Cancer Metastasis',
        description: 'The real killer - how cancer spreads throughout the body and why it\'s so deadly.',
        component: MetastasisSection,
      },
      {
        slug: 'staging-and-ecology',
        title: 'Part 5: Cancer Staging & Ecology',
        description: 'The TNM staging system and understanding cancer as a complex ecosystem.',
        component: StagingSection,
      },
      {
        slug: 'knowledge-check',
        title: 'Part 12: Knowledge Check',
        description: 'Test your understanding of oncology fundamentals with an interactive quiz.',
        component: QuizSection,
      },
      // ... other topics will be added here as we create them
    ],
  },
  // ... future modules will be added here
]; 