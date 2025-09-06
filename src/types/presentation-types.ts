import { LucideIcon } from 'lucide-react';

// Base slide configuration
export interface BaseSlideConfig {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  className?: string;
  backgroundType?: 'standard' | 'enhanced' | 'gradient';
  gradientColors?: string[];
}

// Slide types
export type SlideType = 
  | 'title' 
  | 'stats' 
  | 'problem' 
  | 'solution' 
  | 'comparison' 
  | 'process' 
  | 'features'
  | 'custom';

// Content configurations for different slide types
export interface TitleSlideConfig extends BaseSlideConfig {
  type: 'title';
  content: {
    mainTitle: string;
    subtitle: string;
    presenter?: {
      name: string;
      title: string;
      company: string;
    };
    titleGradient: string;
    subtitleGradient?: string;
  };
}

export interface StatsSlideConfig extends BaseSlideConfig {
  type: 'stats';
  content: {
    description?: string;
    stats: Array<{
      value: string;
      label: string;
      color?: string;
    }>;
    titleGradient: string;
  };
}

export interface ProblemSlideConfig extends BaseSlideConfig {
  type: 'problem';
  content: {
    description: string;
    highlight: {
      icon: string;
      value: string;
      description: string;
      color: string;
    };
    titleGradient: string;
  };
}

export interface SolutionSlideConfig extends BaseSlideConfig {
  type: 'solution';
  content: {
    description?: string;
    comparison?: {
      traditional: {
        label: string;
        value: string;
        description: string;
        color: string;
      };
      crispro: {
        label: string;
        value: string;
        description: string;
        color: string;
      };
    };
    zetaScore?: {
      label: string;
      value: string;
      color: string;
    };
    titleGradient: string;
  };
}

export interface ComparisonSlideConfig extends BaseSlideConfig {
  type: 'comparison';
  content: {
    description?: string;
    items: Array<{
      title: string;
      advantage: string;
      limitation: string;
    }>;
    titleGradient: string;
  };
}

export interface ProcessSlideConfig extends BaseSlideConfig {
  type: 'process';
  content: {
    description?: string;
    steps: Array<{
      icon: string;
      title: string;
      description: string;
      color: string;
    }>;
    titleGradient: string;
  };
}

export interface FeaturesSlideConfig extends BaseSlideConfig {
  type: 'features';
  content: {
    description?: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
      color: string;
    }>;
    titleGradient: string;
  };
}

export interface CustomSlideConfig extends BaseSlideConfig {
  type: 'custom';
  content: {
    component: React.ComponentType<any>;
    props?: Record<string, any>;
  };
}

// Union type for all slide configurations
export type SlideConfig = 
  | TitleSlideConfig 
  | StatsSlideConfig 
  | ProblemSlideConfig 
  | SolutionSlideConfig 
  | ComparisonSlideConfig
  | ProcessSlideConfig 
  | FeaturesSlideConfig
  | CustomSlideConfig;

// Presentation configuration
export interface PresentationConfig {
  id: string;
  title: string;
  description?: string;
  brand: {
    name: string;
    emoji?: string;
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  slides: SlideConfig[];
  navigation?: {
    showProgress?: boolean;
    showSlideNumbers?: boolean;
    keyboardEnabled?: boolean;
  };
}

// Navigation state
export interface NavigationState {
  currentSlide: number;
  totalSlides: number;
}

// Animation variants
export interface AnimationVariants {
  container: any;
  item: any;
} 