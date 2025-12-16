// Careers Data Structure
// Aligned with product.mdc capabilities and CrisPRO.ai mission

export interface JobRequirement {
  text: string;
  required?: boolean; // If false, it's a "nice to have"
}

export interface JobResponsibility {
  text: string;
  category?: 'technical' | 'strategic' | 'collaboration' | 'leadership';
}

export interface JobListing {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'co-founder';
  level: 'founding' | 'senior' | 'mid' | 'junior';
  description: string;
  responsibilities: JobResponsibility[];
  requirements: JobRequirement[];
  niceToHave?: JobRequirement[];
  benefits?: string[];
  applicationLink?: string; // If different from contact page
  applicationEmail?: string; // Email address for applications (defaults to careers@crispro.ai)
  postedDate: string; // ISO date string
  active: boolean;
  tags: string[]; // For filtering/searching
}

export const CAREER_JOBS: JobListing[] = [
  {
    id: 'head-ai-oncology-cofounder',
    slug: 'head-ai-oncology-cofounder',
    title: 'Head of AI Oncology (Co-Founder)',
    department: 'Engineering & Product',
    location: 'Remote / San Francisco Bay Area',
    type: 'co-founder',
    level: 'founding',
    description: 'Lead the development of our AI-powered precision medicine platform, focusing on clinical decision support for oncologists. As a co-founder, you\'ll shape the strategic direction of our oncology AI initiatives, ensuring alignment with our S/P/E framework for multi-modal validation.',
    responsibilities: [
      {
        text: 'Define and execute the AI oncology roadmap, integrating Evo2 foundation model with pathway and evidence synthesis.',
        category: 'strategic'
      },
      {
        text: 'Lead cross-functional teams to build capabilities like Will It Work For Me (WIWFM), synthetic lethality analysis, and unified care plans.',
        category: 'leadership'
      },
      {
        text: 'Collaborate with clinical partners to validate predictions (70-85% accuracy) and ensure regulatory compliance.',
        category: 'collaboration'
      },
      {
        text: 'Drive product strategy for clinical decision support, targeting 85% sporadic cancer coverage.',
        category: 'strategic'
      },
      {
        text: 'Architect multi-modal AI validation systems combining sequence, pathway, and evidence signals.',
        category: 'technical'
      }
    ],
    requirements: [
      {
        text: 'PhD in AI/ML, Computational Biology, or related field with 5+ years in oncology AI.',
        required: true
      },
      {
        text: 'Experience with genomic AI models (e.g., Evo2, AlphaFold) and multi-modal frameworks.',
        required: true
      },
      {
        text: 'Proven track record in leading AI product development for healthcare.',
        required: true
      },
      {
        text: 'Strong understanding of clinical workflows and precision oncology challenges.',
        required: true
      }
    ],
    niceToHave: [
      {
        text: 'Experience with FDA regulatory processes for AI/ML in healthcare.',
        required: false
      },
      {
        text: 'Published research in computational oncology or precision medicine.',
        required: false
      },
      {
        text: 'Experience building clinical decision support systems.',
        required: false
      }
    ],
    benefits: [
      'Equity stake as co-founder',
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      'Opportunity to shape company direction'
    ],
    postedDate: '2024-12-19',
    active: true,
    tags: ['AI', 'Oncology', 'Co-Founder', 'Leadership', 'Evo2', 'Clinical Decision Support', 'S/P/E Framework']
  },
  {
    id: 'founding-mobile-engineer',
    slug: 'founding-mobile-engineer',
    title: 'Founding Mobile Engineer',
    department: 'Engineering',
    location: 'Remote / San Francisco Bay Area',
    type: 'full-time',
    level: 'founding',
    description: 'Build the mobile foundation for our conversational AI co-pilot, enabling oncologists and patients to access unified care plans on-the-go. Focus on seamless integration with our S/P/E platform for real-time predictions and evidence-backed recommendations.',
    responsibilities: [
      {
        text: 'Develop cross-platform mobile apps (iOS/Android) using React Native or Flutter.',
        category: 'technical'
      },
      {
        text: 'Integrate with backend APIs for features like WIWFM predictions, trial matching, and toxicity prevention.',
        category: 'technical'
      },
      {
        text: 'Implement secure, HIPAA-compliant data handling for patient genomic data.',
        category: 'technical'
      },
      {
        text: 'Optimize for performance to deliver real-time AI insights (e.g., synthetic lethality analysis) in clinical settings.',
        category: 'technical'
      },
      {
        text: 'Collaborate with design and product teams to create intuitive user experiences for clinicians and patients.',
        category: 'collaboration'
      }
    ],
    requirements: [
      {
        text: '3+ years experience in mobile development, preferably in healthcare apps.',
        required: true
      },
      {
        text: 'Proficiency in React Native, Swift, or Kotlin with knowledge of API integrations.',
        required: true
      },
      {
        text: 'Understanding of healthcare regulations (HIPAA, GDPR) and secure data practices.',
        required: true
      },
      {
        text: 'Passion for building tools that impact patient outcomes in oncology.',
        required: true
      }
    ],
    niceToHave: [
      {
        text: 'Experience with healthcare APIs and FHIR standards.',
        required: false
      },
      {
        text: 'Background in bioinformatics or computational biology.',
        required: false
      },
      {
        text: 'Experience with real-time data visualization in mobile apps.',
        required: false
      }
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      'Professional development budget',
      'Impact on patient care outcomes'
    ],
    postedDate: '2024-12-19',
    active: true,
    tags: ['Mobile', 'React Native', 'iOS', 'Android', 'Healthcare', 'HIPAA', 'Founding Engineer']
  },
  {
    id: 'founding-genomics-ml-engineer',
    slug: 'founding-genomics-ml-engineer',
    title: 'Founding Genomics Machine Learning Engineer',
    department: 'Engineering & Research',
    location: 'Remote / San Francisco Bay Area',
    type: 'full-time',
    level: 'founding',
    description: 'Engineer the core ML infrastructure for our genomics platform, powering the Evo2 integration and S/P/E framework. Contribute to capabilities like gene essentiality scoring, VUS resolution, and multi-modal AI validation for precision oncology.',
    responsibilities: [
      {
        text: 'Implement and optimize Evo2-based models for variant impact prediction (95.7% ClinVar AUROC).',
        category: 'technical'
      },
      {
        text: 'Develop the S/P/E fusion engine combining sequence, pathway, and evidence signals.',
        category: 'technical'
      },
      {
        text: 'Build scalable ML pipelines for features like synthetic lethality analysis and resistance prediction.',
        category: 'technical'
      },
      {
        text: 'Collaborate on validation benchmarks for oncology use cases (e.g., BRCA1/2, multiple myeloma).',
        category: 'collaboration'
      },
      {
        text: 'Optimize model inference for real-time clinical decision support.',
        category: 'technical'
      }
    ],
    requirements: [
      {
        text: 'MS/PhD in ML, Bioinformatics, or related field with 3+ years in genomics AI.',
        required: true
      },
      {
        text: 'Experience with large language models (e.g., Evo2, transformers) and genomic datasets (ClinVar, TCGA).',
        required: true
      },
      {
        text: 'Proficiency in PyTorch/TensorFlow and scalable ML infrastructure (e.g., AWS SageMaker).',
        required: true
      },
      {
        text: 'Strong publication record in computational biology or AI for healthcare.',
        required: true
      }
    ],
    niceToHave: [
      {
        text: 'Experience with AlphaFold, ESMFold, or other structural biology models.',
        required: false
      },
      {
        text: 'Knowledge of pathway databases (KEGG, Reactome) and evidence synthesis.',
        required: false
      },
      {
        text: 'Experience with production ML systems serving healthcare applications.',
        required: false
      }
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      'Research publication support',
      'Access to cutting-edge AI models and datasets'
    ],
    postedDate: '2024-12-19',
    active: true,
    tags: ['Machine Learning', 'Genomics', 'Evo2', 'Bioinformatics', 'PyTorch', 'Founding Engineer', 'S/P/E Framework']
  }
];

// Helper functions
export function getActiveJobs(): JobListing[] {
  return CAREER_JOBS.filter(job => job.active);
}

export function getJobBySlug(slug: string): JobListing | undefined {
  return CAREER_JOBS.find(job => job.slug === slug && job.active);
}

export function getJobsByDepartment(department: string): JobListing[] {
  return CAREER_JOBS.filter(job => job.department === department && job.active);
}

export function getJobsByTag(tag: string): JobListing[] {
  return CAREER_JOBS.filter(job => job.tags.includes(tag) && job.active);
}

