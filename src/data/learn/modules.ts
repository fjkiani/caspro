export interface LearnTopic {
  slug: string;
  title: string;
  description: string;
  component: string;
}

export interface LearnModule {
  slug: string;
  title: string;
  description: string;
  topics: LearnTopic[];
}

// Example structure - this will be populated as we build the components
export const learnModules: LearnModule[] = [
  {
    slug: 'oncology-101',
    title: 'Oncology 101',
    description: 'A foundational overview of cancer biology, genetics, and treatment.',
    topics: [
      {
        slug: 'biology-of-cancer',
        title: 'The Biology of Cancer',
        description: 'Understanding the fundamental principles of what makes a cancer cell.',
        component: 'BiologyOfCancerSection',
      },
      // ... other topics will be added here as they are created
    ],
  },
];
