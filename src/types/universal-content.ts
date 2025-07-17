// Content metadata interface
export interface ContentMeta {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  estimatedDuration?: number;
  estimatedTime?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  color?: string;
  author?: string;
  lastUpdated?: string;
  tags?: string[];
}

// Media content types
export interface MediaContent {
  type: 'image' | 'video' | '3d_model' | 'audio';
  src: string;
  alt?: string;
  caption?: string;
  controls?: boolean;
}

// Highlight box types
export interface HighlightBox {
  type: 'info' | 'warning' | 'success' | 'danger';
  title: string;
  content: string;
}

// Card content types
export interface CardContent {
  front?: string;
  back?: string;
  expanded?: string;
  media?: MediaContent;
}

export interface ExpandedCardContent {
  details: string[];
  statistics?: string;
}

// Universal card interface
export interface UniversalCard {
  id?: string;
  title: string;
  icon?: string;
  content: string | CardContent;
  type?: 'basic' | 'flip' | 'expand' | 'interactive' | 'media';
  color?: string;
  metadata?: Record<string, string>;
  actions?: Array<{
    type: 'link' | 'download' | 'action';
    label: string;
    url?: string;
    handler?: string;
  }>;
  expandedContent?: ExpandedCardContent;
}

// Introduction section data
export interface IntroductionData {
  content: string;
  keyPoints?: string[];
  highlights?: HighlightBox[];
  learningObjectives?: string[];
  media?: MediaContent;
}

// Card grid data
export interface CardGridData {
  title?: string;
  subtitle?: string;
  description?: string;
  cards: UniversalCard[];
  layout?: 'grid' | 'masonry' | 'carousel';
  columns?: number;
  filterable?: boolean;
  searchable?: boolean;
}

// Process step interface
export interface ProcessStep {
  id?: string;
  number?: string | number;
  title: string;
  description: string;
  details?: string[];
  mechanism?: string;
  duration?: string;
  location?: string;
  icon?: string;
  color?: string;
}

// Process steps data
export interface ProcessStepsData {
  title?: string;
  subtitle?: string;
  description?: string;
  steps: ProcessStep[];
  layout?: 'vertical' | 'horizontal' | 'circular';
  interactive?: boolean;
}

// Process data alias
export type ProcessData = ProcessStepsData;

// Comparison item interface
export interface ComparisonItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  advantages?: string[];
  disadvantages?: string[];
  pros?: string[];
  cons?: string[];
  metadata?: Record<string, any>;
  color?: string;
  role?: string;
}

// Comparison data
export interface ComparisonData {
  title?: string;
  subtitle?: string;
  description?: string;
  items: ComparisonItem[];
  layout?: 'side_by_side' | 'grid' | 'table' | 'cards';
}

// Timeline event interface
export interface TimelineEvent {
  id: string;
  date?: string;
  time?: string;
  title: string;
  scientist?: string;
  contribution?: string;
  description: string;
  details?: string[];
  significance?: string;
  color?: string;
}

// Timeline data
export interface TimelineData {
  title?: string;
  subtitle?: string;
  description?: string;
  interactive?: boolean;
  events: TimelineEvent[];
}

// Statistics item interface
export interface Statistic {
  id: string;
  value: string;
  label: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable' | 'baseline';
  color?: string;
  context?: string;
}

// Statistics data
export interface StatisticsData {
  title?: string;
  subtitle?: string;
  description?: string;
  statistics: Statistic[];
  layout?: 'vertical' | 'horizontal' | 'grid';
}

// Quiz data
export interface QuizData {
  title?: string;
  description?: string;
  questions: Array<{
    id: string;
    question: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string | string[];
    explanation?: string;
    points?: number;
  }>;
}

// Summary data
export interface SummaryData {
  title?: string;
  keyTakeaways: string[];
  clinicalRelevance?: string;
  nextSteps?: string[];
  relatedTopics?: string[];
  assessmentQuestions?: string[];
  resources?: Array<{
    title: string;
    type: 'link' | 'download' | 'reference';
    url?: string;
  }>;
  clinicalPearls?: string[];
}

export interface InteractiveData {
  interactiveType: 'quiz';
  questions: Array<{
    id: string;
    question: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string | string[] | number | boolean;
    explanation?: string;
    points?: number;
  }>;
}

// Section data union type
export type SectionData =
  | IntroductionData
  | CardGridData
  | ProcessStepsData
  | ComparisonData
  | TimelineData
  | StatisticsData
  | QuizData
  | SummaryData
  | InteractiveData;

// Content section interface
export interface ContentSection {
  id: string;
  type: 'introduction' | 'cards' | 'process' | 'comparison' | 'timeline' | 'statistics' | 'quiz' | 'summary' | 'tabs' | 'visualization' | 'case_study' | 'insights' | 'mechanisms' | 'clinical_relevance' | 'interactive';
  title?: string;
  data: SectionData;
  conditional?: {
    condition: string;
    value: any;
  };
  animation?: {
    type: string;
    duration: number;
    delay?: number;
    stagger?: number;
  };
}

// Main UniversalContent interface
export interface UniversalContent {
  meta: ContentMeta;
  sections: ContentSection[];
} 