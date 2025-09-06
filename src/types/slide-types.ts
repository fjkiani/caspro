export interface SlideConfig {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  type: 'title' | 'process' | 'intelligence' | 'prediction' | 'therapeutic' | 'desci-hero' | 'desci-pipeline' | 'desci-principles' | 'desci-advantages' | 'desci-flywheel' | 'desci-challenge';
  content: SlideContent;
  cardConfig?: {
    tag: string;
    priority: number;
    category: string;
    metrics?: {
      impact: string;
      timeframe: string;
      confidence: string;
    };
  };
  desciConfig?: DesciSectionConfig;
}

export interface SlideContent {
  mainHeading?: string;
  subHeading?: string;
  callout?: string;
  steps?: ProcessStep[];
  scores?: ScoreData[];
  predictions?: Prediction[];
  therapeutics?: string[];
  features?: string[];
  principles?: string[];
  advantages?: string[];
  challenges?: string[];
  heroContent?: {
    mainTitle: string;
    subtitle: string;
    description: string;
    ctaText: string;
  };
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ScoreData {
  label: string;
  score: number;
  maxScore: number;
  color: string;
  description: string;
}

export interface Prediction {
  text: string;
  confidence: number;
  type: 'high' | 'medium' | 'low';
}

export interface SlideElement {
  type: string;
  content: any;
  position?: {
    x: number;
    y: number;
  };
  animation?: {
    type: string;
    duration: number;
    delay?: number;
  };
}

export interface HeroSlideConfig extends SlideConfig {
  type: 'title';
  cardConfig: {
    tag: string;
    priority: number;
    category: string;
    metrics: {
      impact: string;
      timeframe: string;
      confidence: string;
    };
  };
}

export interface DesciSectionConfig {
  layout: 'hero' | 'pipeline' | 'principles' | 'advantages' | 'flywheel' | 'challenge';
  theme: 'dark' | 'light';
  heroContent?: {
    mainTitle: string;
    subtitle: string;
    description: string;
    ctaText: string;
  };
  pipelineSteps?: ProcessStep[];
  principles?: string[];
  advantages?: string[];
  challenges?: string[];
  flywheelNodes?: {
    title: string;
    description: string;
    connections: string[];
  }[];
} 