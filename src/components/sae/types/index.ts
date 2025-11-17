import React from 'react';

// VUS Variant Types
export interface VUSVariant {
  id: string;
  gene: string;
  position: string;
  change: string;
  initialStatus: 'VUS';
  finalStatus: 'Pathogenic' | 'Benign' | 'Likely Pathogenic';
  confidence: number;
  deltaLikelihood: number;
  clinicalAction: string;
  timeToResolve: number; // seconds
}

// API Demo Types
export interface APIDemo {
  id: string;
  name: string;
  endpoint: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  capabilities: string[];
  useCases: Array<{
    title: string;
    description: string;
    examples: string[];
  }>;
  simulation: {
    input: any;
    steps: Array<{
      title: string;
      description: string;
      duration: number;
    }>;
    finalOutput: any;
  };
}

// Thinking Step Types
export interface ThinkingStep {
  title: string;
  description: string;
  detail: string;
  component: string;
  icon: string;
  color: string;
  paperRef: string;
  ruoDisclaimer?: string;
}

// Analysis Step Types
export interface AnalysisStep {
  title: string;
  icon: string;
  color: string;
}

// SAE Feature Types
export interface SAEFeature {
  name: string;
  start: number;
  end: number;
  score?: number;
}

// Color Classes Type
export interface ColorClasses {
  bg: string;
  text: string;
  border: string;
}



