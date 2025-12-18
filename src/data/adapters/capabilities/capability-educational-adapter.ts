/**
 * Educational Adapter
 * Transforms CoPilotDetailContent + MOAT document into EducationalCapabilityPageData
 * 
 * This adapter combines:
 * - Structured data from copilot data files (toxicity-data.ts, etc.)
 * - Narrative content from MOAT markdown documents
 * - Creates the complete educational page structure
 */

import { 
  EducationalCapabilityPageData,
  HeroQuestionSectionData,
  ProblemNarrativeSectionData,
  SolutionNarrativeSectionData,
  HowItWorksSectionData,
  ValuePropositionSectionData,
  IntegrationSectionData,
  ConceptExplainerData,
  ProcessVisualizerData,
  ExampleShowcaseData,
  EducationalPageLayoutData,
} from '@/types/educational-capability';
import { CoPilotDetailContent } from '@/types/copilot-types';
import { MOATDocumentStructure } from '@/types/educational-capability';

/**
 * Transform copilot data and MOAT doc into educational page data
 */
export function transformToEducational(
  copilotData: CoPilotDetailContent,
  moatDoc: MOATDocumentStructure
): EducationalCapabilityPageData {
  return {
    // Hero Section
    hero: transformHero(copilotData, moatDoc),
    
    // Problem Section
    problem: transformProblem(copilotData, moatDoc),
    
    // Solution Section
    solution: transformSolution(copilotData, moatDoc),
    
    // How It Works Section
    howItWorks: transformHowItWorks(copilotData, moatDoc),
    
    // Value Proposition Section
    value: transformValue(copilotData, moatDoc),
    
    // Integration Section
    integration: transformIntegration(copilotData, moatDoc),
    
    // Concepts
    concepts: transformConcepts(copilotData),
    
    // Process
    process: transformProcess(copilotData, moatDoc),
    
    // Example
    example: transformExample(copilotData, moatDoc),
    
    // Layout
    layout: transformLayout(copilotData),
    
    // Source data
    sourceData: copilotData,
  };
}

function transformHero(
  copilotData: CoPilotDetailContent,
  moatDoc: MOATDocumentStructure
): HeroQuestionSectionData {
  return {
    question: moatDoc.heroQuestion?.question || copilotData.heroSubtitle || 'How can I help myself?',
    genericAnswer: moatDoc.heroQuestion?.genericAnswer || 'Generic advice without personalization.',
    ourAnswer: moatDoc.heroQuestion?.ourAnswer || copilotData.vision || 'Personalized, evidence-based recommendations.',
    visualComparison: {
      before: moatDoc.heroQuestion?.genericAnswer || 'Generic answer',
      after: moatDoc.heroQuestion?.ourAnswer || 'Our answer',
    },
  };
}

function transformProblem(
  copilotData: CoPilotDetailContent,
  moatDoc: MOATDocumentStructure
): ProblemNarrativeSectionData {
  return {
    title: moatDoc.problem?.title || 'The Problem',
    narrative: moatDoc.problem?.narrative || copilotData.coreProblemIntro || '',
    visualMetaphor: moatDoc.problem?.visualMetaphor,
    painPoints: copilotData.coreProblemPoints?.map((point, idx) => ({
      title: `Pain Point ${idx + 1}`,
      description: point.replace(/\*\*/g, ''),
      icon: 'AlertTriangle',
    })) || [],
  };
}

function transformSolution(
  copilotData: CoPilotDetailContent,
  moatDoc: MOATDocumentStructure
): SolutionNarrativeSectionData {
  return {
    title: moatDoc.solution?.title || 'The Solution',
    narrative: moatDoc.solution?.narrative || copilotData.vision || '',
    keyFeatures: copilotData.keyCapabilities?.map(cap => ({
      title: cap.title,
      description: cap.business?.description || cap.technical?.description || '',
      icon: cap.technical?.icon || 'CheckCircle',
      status: 'implemented' as const,
    })) || [],
    visualFlow: moatDoc.howItWorks?.steps.map(step => ({
      number: step.number,
      title: step.title,
      description: step.description,
    })) || [],
  };
}

function transformHowItWorks(
  copilotData: CoPilotDetailContent,
  moatDoc: MOATDocumentStructure
): HowItWorksSectionData {
  // Use MOAT doc steps if available, otherwise create from keyCapabilities
  const steps = moatDoc.howItWorks?.steps || copilotData.keyCapabilities?.map((cap, idx) => ({
    number: idx + 1,
    title: cap.title,
    description: cap.technical?.description || cap.scientific?.description || '',
    details: [
      { label: 'Technical', value: cap.technical?.keyMetric || '' },
      { label: 'Scientific', value: cap.scientific?.keyMetric || '' },
      { label: 'Business', value: cap.business?.keyMetric || '' },
    ].filter(d => d.value),
  })) || [];

  return {
    title: moatDoc.howItWorks?.title || 'How It Works',
    steps,
    interactive: true,
  };
}

function transformValue(
  copilotData: CoPilotDetailContent,
  moatDoc: MOATDocumentStructure
): ValuePropositionSectionData {
  return {
    title: moatDoc.valueProposition?.title || 'THE MOAT: What No Competitor Has',
    question: moatDoc.valueProposition?.question || 'What makes this different?',
    genericResponse: moatDoc.valueProposition?.genericResponse || 'Generic AI response',
    ourResponse: moatDoc.valueProposition?.ourResponse || 'Our system\'s personalized response',
    comparison: moatDoc.valueProposition?.comparison || [
      {
        feature: 'Personalization',
        generic: 'Generic',
        ourSystem: 'Drug + Germline specific',
      },
      {
        feature: 'Mechanism Explanation',
        generic: 'None',
        ourSystem: 'Full pathway explanation',
      },
    ],
  };
}

function transformIntegration(
  copilotData: CoPilotDetailContent,
  moatDoc: MOATDocumentStructure
): IntegrationSectionData {
  return {
    title: 'How This Fits Into Complete Care Plan',
    connections: moatDoc.integration?.connections || [],
    carePlanContext: moatDoc.integration?.carePlanContext || [],
  };
}

function transformConcepts(copilotData: CoPilotDetailContent): ConceptExplainerData {
  const concepts = copilotData.keyCapabilities?.map(cap => ({
    term: cap.title,
    definition: cap.technical?.description || cap.scientific?.description || '',
    example: cap.business?.description,
    related: copilotData.keyCapabilities
      ?.filter(c => c.title !== cap.title)
      .map(c => c.title) || [],
  })) || [];

  return {
    concepts,
    layout: 'grid',
    interactive: true,
  };
}

function transformProcess(
  copilotData: CoPilotDetailContent,
  moatDoc: MOATDocumentStructure
): ProcessVisualizerData {
  const steps = moatDoc.howItWorks?.steps || copilotData.keyCapabilities?.map((cap, idx) => ({
    number: idx + 1,
    title: cap.title,
    description: cap.technical?.description || '',
  })) || [];

  return {
    title: 'The Complete Process Flow',
    steps,
    layout: 'horizontal',
    interactive: true,
  };
}

function transformExample(
  copilotData: CoPilotDetailContent,
  moatDoc: MOATDocumentStructure
): ExampleShowcaseData {
  if (moatDoc.example) {
    return {
      title: 'A Real Patient Story',
      patient: moatDoc.example.patient,
      solution: moatDoc.example.solution,
      outcome: moatDoc.example.outcome,
    };
  }

  // Fallback example structure
  return {
    title: 'Example Use Case',
    patient: {
      name: 'Example Patient',
      profile: ['Patient profile information'],
      question: 'How can this capability help me?',
    },
    solution: copilotData.keyCapabilities?.map((cap, idx) => ({
      step: idx + 1,
      title: cap.title,
      description: cap.technical?.description || '',
      result: cap.business?.keyMetric || 'Improved outcome',
    })) || [],
    outcome: copilotData.kpis?.map(kpi => ({
      metric: kpi.label,
      value: kpi.value,
      impact: 'Positive impact on patient care',
    })) || [],
  };
}

function transformLayout(copilotData: CoPilotDetailContent): EducationalPageLayoutData {
  const sections = [
    { id: 'hero', title: 'The Question' },
    { id: 'problem', title: 'The Problem' },
    { id: 'solution', title: 'The Solution' },
    { id: 'how-it-works', title: 'How It Works' },
    { id: 'concepts', title: 'Key Concepts' },
    { id: 'process', title: 'Process Flow' },
    { id: 'value', title: 'The MOAT' },
    { id: 'example', title: 'Real Example' },
    { id: 'integration', title: 'Integration' },
  ];

  return {
    sidebar: {
      sections,
    },
    progress: {
      current: 1,
      total: sections.length,
      readingTime: 15, // Estimated reading time in minutes
    },
  };
}

