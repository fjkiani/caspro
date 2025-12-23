/**
 * TypeScript interfaces for Educational Capability Pages
 * These types define the structure for transforming capability pages
 * from card dumps into educational, narrative-driven experiences.
 */

import { CoPilotDetailContent } from './copilot-types';

// ============================================
// NARRATIVE STRUCTURE
// ============================================

export interface HeroQuestionSectionData {
  question: string;              // "What can I do to help myself during treatment?"
  genericAnswer: string;         // "Eat healthy. Stay hydrated."
  ourAnswer: string;             // "Your carboplatin + BRCA1 = DNA repair stress. NAC helps."
  visualComparison?: {
    before: string;
    after: string;
  };
}

export interface ProblemNarrativeSectionData {
  title: string;                 // "The Problem: Fragmented Care"
  narrative: string;             // Full narrative text from MOAT doc
  visualMetaphor?: string;       // "Like navigating a maze blindfolded"
  painPoints: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface SolutionNarrativeSectionData {
  title: string;                 // "The Solution: A Connected System"
  narrative: string;             // Full narrative text from MOAT doc
  keyFeatures: {
    title: string;
    description: string;
    icon: string;
    status: 'implemented' | 'planned';
  }[];
  visualFlow?: ProcessStepData[];
}

export interface HowItWorksSectionData {
  title: string;                 // "How Toxicity Detection Works"
  steps: ProcessStepData[];
  interactive?: boolean;         // Allow step-by-step reveal
}

export interface ProcessStepData {
  number: number;
  title: string;
  description: string;
  visual?: React.ReactNode;
  details?: {
    label: string;
    value: string;
  }[];
  icon?: string;              // Icon name (e.g., "Activity", "Target")
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'indigo'; // Step color
  metrics?: {                 // Key metrics for this step
    label: string;
    value: string;
  }[];
}

export interface ValuePropositionSectionData {
  title: string;                 // "THE MOAT: What No Competitor Has"
  question: string;              // "What should I eat during carboplatin?"
  genericResponse: string;       // Generic AI response
  ourResponse: string;           // Our system's response
  comparison: {
    feature: string;
    generic: string;
    ourSystem: string;
  }[];
  infographic?: ComparisonTableData;
}

export interface ComparisonTableData {
  headers: string[];
  rows: {
    [key: string]: string;
  }[];
}

export interface IntegrationSectionData {
  title: string;                 // "How This Fits Into Complete Care"
  connections: {
    from: string;                // "Toxicity Detection"
    to: string;                  // "Food Validation"
    relationship: string;        // "Connects toxicity pathways to protective foods"
    visual?: React.ReactNode;
  }[];
  carePlanContext: {
    step: number;
    component: string;
    howThisHelps: string;
  }[];
}

// ============================================
// EDUCATIONAL COMPONENTS
// ============================================

export interface ConceptData {
  term: string;
  definition: string;
  example?: string;
  visual?: React.ReactNode;
  related?: string[];          // Related concepts
}

export interface ConceptExplainerData {
  concepts: ConceptData[];
  layout: 'grid' | 'accordion' | 'timeline';
  interactive?: boolean;         // Flip cards or expand
}

export interface ProcessVisualizerData {
  title: string;
  steps: ProcessStepData[];
  layout: 'horizontal' | 'vertical' | 'cascade' | 'timeline';
  interactive?: boolean;         // Click to reveal details
}

export interface ExampleShowcaseData {
  title: string;                 // "A Real Patient Story"
  patient: {
    name: string;
    profile: string[];
    question: string;
  };
  solution: {
    step: number;
    title: string;
    description: string;
    result: string;
  }[];
  outcome: {
    metric: string;
    value: string;
    impact: string;
  }[];
}

export interface InfographicSectionData {
  title: string;
  type: 'table' | 'comparison' | 'metrics' | 'flow';
  data: any;                     // Structured data
  visual?: React.ReactNode;      // Custom visualization
}

// ============================================
// LAYOUT COMPONENTS
// ============================================

export interface EducationalPageLayoutData {
  sidebar: {
    sections: {
      id: string;
      title: string;
      subsections?: string[];
    }[];
  };
  progress?: {
    current: number;
    total: number;
    readingTime?: number;
  };
}

export interface ProgressiveDisclosureSectionData {
  title: string;
  summary: string;               // Always visible
  details: React.ReactNode;      // Collapsed by default
  defaultExpanded?: boolean;
}

// ============================================
// COMPLETE EDUCATIONAL PAGE STRUCTURE
// ============================================

export interface EducationalCapabilityPageData {
  // Narrative Structure
  hero: HeroQuestionSectionData;
  problem: ProblemNarrativeSectionData;
  solution: SolutionNarrativeSectionData;
  howItWorks: HowItWorksSectionData;
  value: ValuePropositionSectionData;
  integration: IntegrationSectionData;
  
  // Educational Components
  concepts: ConceptExplainerData;
  process: ProcessVisualizerData;
  example: ExampleShowcaseData;
  infographic?: InfographicSectionData;
  
  // Layout
  layout: EducationalPageLayoutData;
  
  // Source Data (for reference)
  sourceData: CoPilotDetailContent;
  moatDocPath?: string;          // Path to MOAT markdown file
}

// ============================================
// MOAT DOCUMENT STRUCTURE (for parsing)
// ============================================

export interface MOATDocumentStructure {
  heroQuestion?: {
    question: string;
    genericAnswer: string;
    ourAnswer: string;
  };
  problem?: {
    title: string;
    narrative: string;
    visualMetaphor?: string;
  };
  solution?: {
    title: string;
    narrative: string;
  };
  howItWorks?: {
    title: string;
    steps: {
      number: number;
      title: string;
      description: string;
      details?: { label: string; value: string }[];
    }[];
  };
  valueProposition?: {
    title: string;
    question: string;
    genericResponse: string;
    ourResponse: string;
    comparison?: { feature: string; generic: string; ourSystem: string }[];
  };
  example?: {
    patient: {
      name: string;
      profile: string[];
      question: string;
    };
    solution: {
      step: number;
      title: string;
      description: string;
      result: string;
    }[];
    outcome: {
      metric: string;
      value: string;
      impact: string;
    }[];
  };
  integration?: {
    connections: {
      from: string;
      to: string;
      relationship: string;
    }[];
    carePlanContext: {
      step: number;
      component: string;
      howThisHelps: string;
    }[];
  };
}

