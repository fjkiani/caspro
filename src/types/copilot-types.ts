// Type definitions for co-pilot data structures

export interface CapabilityComponent {
  title: string;
  subtitle?: string;
  iconName: string;
  color: 'blue' | 'teal' | 'indigo';
  features?: string[];
}

export interface CapabilityAspect {
  title: string;
  keyMetric: string;
  description: string;
  icon: any; // LucideIcon, but string name for now
  color: 'blue' | 'teal' | 'indigo';
  // Optional structured, data-driven rendering fields
  components?: CapabilityComponent[];
  features?: string[];
  bullets?: { title: string; description: string }[];
}

export interface KeyCapability {
  title: string;
  technical: CapabilityAspect | string;
  scientific: CapabilityAspect | string;
  business: CapabilityAspect | string;
  genomicUseCasesParagraph?: string;
}

export interface ValuePropositionSection {
  audience: string;
  points: string[];
}

export interface GenomicUseCaseGridItem {
  label: string;
  iconName: string;
  color: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
  iconName: string;
}

export interface InSilicoWorkflow {
  title: string;
  steps: WorkflowStep[];
}

export interface KPI {
  label: string;
  value: string;
}

export interface KPINarrative {
  title: string;        // Short metric title
  value: string;        // The metric value or change
  meaning: string;      // What it means
  whyCare: string;      // Why it matters
  iconName?: string;    // Optional icon name
  color?: 'blue' | 'teal' | 'indigo'; // Limited to supported safe colors
}

export interface ObservedOutcome {
  title: string;
  keyMetric: string;
  description: string;
  icon: string;
  color: string;
}

export interface OverviewConcept {
  icon: string;
  title: string;
  description: string;
  color: 'blue' | 'teal' | 'indigo' | 'purple';
}

export interface OverviewValueProp {
  icon: string;
  title: string;
  description: string;
  metric: string;
  color: 'blue' | 'teal' | 'indigo' | 'purple';
}

export interface OverviewDeliverable {
  icon: string;
  title: string;
  description: string;
}

export interface InSilicoOverviewConfig {
  coreConcepts?: OverviewConcept[];
  valuePropositions?: OverviewValueProp[];
  deliverables?: OverviewDeliverable[];
}

export interface CoPilotDetailContent {
  slug: string;
  pageTitle: string; 
  heroSubtitle?: string; 
  vision: string;
  valueProps: { audience: string; points: string[], icon: string }[];
  buildsOn: string;
  genomicInsightsOverview?: string;
  coreProblemIntro?: string;
  coreProblemPoints?: string[];
  buildsOnStackIntro?: string;
  buildsOnStackPoints?: string[];
  genomicUseCasesGrid?: GenomicUseCaseGridItem[];
  keyCapabilities: KeyCapability[];
  valuePropositionIntro?: string;
  valuePropositionSections: ValuePropositionSection[];
  inSilicoWorkflow?: InSilicoWorkflow;
  kpis?: KPI[];
  kpiNarratives?: KPINarrative[];
  observedOutcomes?: ObservedOutcome[];
  inSilicoOverview?: InSilicoOverviewConfig;
  conclusion: string;
}
