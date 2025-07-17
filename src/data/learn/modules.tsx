'use client';

import { ComponentType } from 'react';
import React from 'react';
import { UniversalContent } from '@/types/universal-content';

// Import topic components
import BiologyOfCancerSection from '@/components/learn/topics/BiologyOfCancerSection';
import EnhancedBiologySection from '@/components/learn/topics/EnhancedBiologySection';
import EnhancedGeneticsSection from '@/components/learn/topics/EnhancedGeneticsSection';
import EnhancedHallmarksSection from '@/components/learn/topics/EnhancedHallmarksSection';
import MetastasisSection from '@/components/learn/topics/MetastasisSection';
import StagingSection from '@/components/learn/topics/StagingSection';
import QuizSection from '@/components/learn/topics/QuizSection';

// Import Module 2 components
import MetastasisIntroductionSection from '@/components/learn/topics/MetastasisIntroductionSection';
import MetastasisMechanismsSection from '@/components/learn/topics/MetastasisMechanismsSection';
import NeoangiogenesisSection from '@/components/learn/topics/NeoangiogenesisSection';
import TumorMicroenvironmentSection from '@/components/learn/topics/TumorMicroenvironmentSection';
import EmtInvasionSection from '@/components/learn/topics/EmtInvasionSection';
import CirculationExtravasationSection from '@/components/learn/topics/CirculationExtravasationSection';
import OrganTropismSection from '@/components/learn/topics/OrganTropismSection';
import DormancySecondaryGrowthSection from '@/components/learn/topics/DormancySecondaryGrowthSection';
import MorbidityMortalitySection from '@/components/learn/topics/MorbidityMortalitySection';
import ClinicalCasesSection from '@/components/learn/topics/ClinicalCasesSection';
import TherapeuticStrategiesSection from '@/components/learn/topics/TherapeuticStrategiesSection';
import MetastasisQuizSection from '@/components/learn/topics/MetastasisQuizSection';

// Import Universal Content Components for Prostate Cancer Module
import UniversalContentRenderer from '@/components/universal/UniversalContentRenderer';

// Prostate Cancer Universal Content Wrapper Components
const ProstateAnatomySection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/prostate-anatomy').then(module => {
      setContent(module.prostateAnatomyContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

const CancerFundamentalsSection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/cancer-fundamentals').then(module => {
      setContent(module.cancerFundamentalsContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

const ProstateEpidemiologySection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/prostate-epidemiology').then(module => {
      setContent(module.prostateEpidemiologyContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

const ProstateRiskFactorsSection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/prostate-risk-factors').then(module => {
      setContent(module.prostateRiskFactorsContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

const ProstateScreeningSection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/prostate-screening').then(module => {
      setContent(module.prostateScreeningContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

const AdvancedScreeningSection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/advanced-screening').then(module => {
      setContent(module.advancedScreeningContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

const GradingStagingSection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/grading-staging').then(module => {
      setContent(module.gradingStagingContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

const LocalizedTreatmentSection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/localized-treatment').then(module => {
      setContent(module.localizedTreatmentContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

const AdvancedTreatmentSection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/advanced-treatment').then(module => {
      setContent(module.advancedTreatmentContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

const ProstateQuizSection = () => {
  const [content, setContent] = React.useState<UniversalContent | null>(null);
  React.useEffect(() => {
    import('@/data/learn/universal/prostate-quiz').then(module => {
      setContent(module.prostateQuizContent);
    });
  }, []);
  return content ? <UniversalContentRenderer content={content} showProgress={true} /> : <div>Loading...</div>;
};

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
  {
    slug: 'understanding-metastasis',
    title: 'Module 2: Understanding Cancer Metastasis',
    description: 'A deep dive into the complex process of cancer metastasis, from molecular mechanisms to clinical applications and therapeutic strategies.',
    topics: [
      {
        slug: 'introduction-to-metastasis',
        title: 'Introduction to Metastasis',
        description: 'Understanding the fundamental concepts, clinical significance, and devastating impact of cancer metastasis on patient outcomes.',
        component: MetastasisIntroductionSection,
      },
      {
        slug: 'metastatic-cascade',
        title: 'The Metastatic Cascade',
        description: 'A detailed exploration of the 8-step process that cancer cells must complete to successfully metastasize.',
        component: MetastasisSection, // Reusing the enhanced cascade component
      },
      {
        slug: 'molecular-mechanisms',
        title: 'Molecular Mechanisms of Metastasis',
        description: 'Understanding the key biological processes that enable cancer spread: EMT, angiogenesis, immune evasion, and dormancy.',
        component: MetastasisMechanismsSection,
      },
      {
        slug: 'neoangiogenesis',
        title: 'Neoangiogenesis: Fueling Tumor Growth',
        description: 'How tumors build their blood supply through new vessel formation and the implications for growth and metastasis.',
        component: NeoangiogenesisSection,
      },
      {
        slug: 'tumor-microenvironment',
        title: 'The Tumor Microenvironment',
        description: 'Exploring the complex cellular ecosystem surrounding tumors and how different cell types influence cancer progression.',
        component: TumorMicroenvironmentSection,
      },
      {
        slug: 'emt-and-invasion',
        title: 'EMT, Invasion & Intravasation',
        description: 'How cancer cells transition from epithelial to mesenchymal states, invade surrounding tissues, and enter blood/lymphatic vessels.',
        component: EmtInvasionSection,
      },
      {
        slug: 'circulation-and-extravasation',
        title: 'Circulation Survival & Extravasation',
        description: 'How CTCs survive the hostile circulation environment and successfully exit to establish metastases through homing mechanisms.',
        component: CirculationExtravasationSection,
      },
      {
        slug: 'organ-tropism',
        title: 'Organ-Specific Metastasis',
        description: 'Exploring why different cancers preferentially metastasize to specific organs and the "seed and soil" hypothesis.',
        component: OrganTropismSection,
      },
      {
        slug: 'dormancy-secondary-growth',
        title: 'Dormancy & Secondary Tumor Growth',
        description: 'Understanding cancer dormancy, why patients relapse years after treatment, and the mechanisms of metastatic reactivation.',
        component: DormancySecondaryGrowthSection,
      },
      {
        slug: 'morbidity-mortality',
        title: 'Morbidity & Mortality',
        description: 'How cancer hurts and kills patients through organ-specific effects and systemic cancer poison syndromes.',
        component: MorbidityMortalitySection,
      },
      {
        slug: 'clinical-cases',
        title: 'Clinical Case Studies',
        description: 'Real-world examples of metastatic progression, illustrating key concepts through patient stories and outcomes.',
        component: ClinicalCasesSection,
      },
      {
        slug: 'therapeutic-strategies',
        title: 'Therapeutic Strategies',
        description: 'Current and emerging approaches to prevent and treat metastasis, from early detection to targeted interventions.',
        component: TherapeuticStrategiesSection,
      },
      {
        slug: 'metastasis-knowledge-check',
        title: 'Module 2 Knowledge Check',
        description: 'Test your comprehensive understanding of cancer metastasis concepts, mechanisms, and clinical applications.',
        component: MetastasisQuizSection,
      },
    ],
  },
  {
    slug: 'prostate-cancer',
    title: 'Prostate Cancer: Understanding and Screening',
    description: 'A comprehensive guide to prostate cancer, from anatomy and epidemiology to screening and risk factors.',
    topics: [
      {
        slug: 'prostate-anatomy',
        title: 'Prostate Anatomy',
        description: 'An overview of the prostate gland, its location, and its role in the male reproductive system.',
        component: ProstateAnatomySection,
      },
      {
        slug: 'cancer-fundamentals',
        title: 'Cancer Fundamentals',
        description: 'Understanding the basic biology of prostate cancer, including its growth and spread.',
        component: CancerFundamentalsSection,
      },
      {
        slug: 'prostate-epidemiology',
        title: 'Prostate Epidemiology',
        description: 'The prevalence, incidence, and risk factors for prostate cancer worldwide.',
        component: ProstateEpidemiologySection,
      },
      {
        slug: 'prostate-risk-factors',
        title: 'Prostate Risk Factors',
        description: 'Factors that increase the likelihood of developing prostate cancer.',
        component: ProstateRiskFactorsSection,
      },
      {
        slug: 'prostate-screening',
        title: 'Prostate Screening',
        description: 'Current screening methods for prostate cancer, including PSA testing and DRE.',
        component: ProstateScreeningSection,
      },
      {
        slug: 'advanced-screening',
        title: 'Advanced Screening',
        description: 'More advanced screening techniques and their potential benefits and limitations.',
        component: AdvancedScreeningSection,
      },
      {
        slug: 'grading-staging',
        title: 'Finding, Grading & Staging Cancer',
        description: 'Diagnostic tests, TNM staging system, and Gleason grading for prostate cancer.',
        component: GradingStagingSection,
      },
      {
        slug: 'localized-treatment',
        title: 'Treatment of Localized Prostate Cancer',
        description: 'Surgery, radiation, active surveillance, and risk-based treatment strategies.',
        component: LocalizedTreatmentSection,
      },
      {
        slug: 'advanced-treatment',
        title: 'Treatment of Advanced Prostate Cancer',
        description: 'Hormonal therapy, chemotherapy, immunotherapy, and precision medicine for metastatic disease.',
        component: AdvancedTreatmentSection,
      },
      {
        slug: 'prostate-quiz',
        title: 'Prostate Cancer Knowledge Assessment',
        description: 'Comprehensive quiz covering all aspects of prostate cancer from biology to treatment.',
        component: ProstateQuizSection,
      },
    ],
  },
  // ... future modules will be added here
]; 