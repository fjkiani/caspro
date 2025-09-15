// Component Registry for Slide Rendering
// Maps content kinds and component names to our branded components

import {
  OracleExplainTrack,
  VariantDetailCard,
  VEPMetrics,
  ForgeAssets,
  QCBadges,
  DesignResultSummary,
  SequencePeaksViewer,
  RunLogPanel,
  ProvenancePanel,
  KPIStrip,
  ProcessStepper,
  TherapyRankingCard,
  ClinicalTrialsMatcher,
  EssentialityChart,
  AccessibilityTrack,
  ProteinDeltaCard,
  PipelineGraph,
  GuidedDesignPanel,
  BusinessTransformation,
  ClinicalWorkflow,
  DossierSummary,
  EnhancedDossierSummary,
  DemoFactory,
  InteractiveAnalysisPipeline,
  EnhancedComparison,
  CrisprEfficacyCard,
  VariantImpactLandscape,
  DiscriminativeAIShowcase,
  InteractiveDemoShowcase,
  FactoryDemoShowcase,
  VUSResolutionDemo,
  DynamicOracleExplain,
  VisualCapabilityGrid,
  IndustryProblemShowcase,
  APIEnhancedValueProp,
  OracleScore,
  BoltzConfidence,
  DigitalSynapseBackground
} from '../site/blocks';

import ZetaOracleInAction from '../deck/slides/ZetaOracleInAction';
import ZetaForgeTwoColumn from '../deck/slides/ZetaForgeTwoColumn';
import StructuralGauntlet from '../deck/slides/StructuralGauntlet';

// Site Blocks Registry - maps content.kind to components
export const SITE_BLOCKS = {
  'oracle-explain': OracleExplainTrack,
  'variant-detail': VariantDetailCard,
  'vep-metrics': VEPMetrics,
  'forge-assets': ForgeAssets,
  'qc-badges': QCBadges,
  'design-result': DesignResultSummary,
  'sequence-peaks': SequencePeaksViewer,
  'run-log': RunLogPanel,
  'provenance': ProvenancePanel,
  'kpi-strip': KPIStrip,
  'therapy-ranking': TherapyRankingCard,
  'clinical-trials': ClinicalTrialsMatcher,
  'essentiality-chart': EssentialityChart,
  'accessibility-track': AccessibilityTrack,
  'protein-delta': ProteinDeltaCard,
  'pipeline-graph': PipelineGraph,
  'guided-design': GuidedDesignPanel,
  'business-transformation': BusinessTransformation,
  'clinical-workflow': ClinicalWorkflow,
  'dossier-summary': DossierSummary,
  'enhanced-dossier': EnhancedDossierSummary,
  'demo-factory': DemoFactory,
  'interactive-pipeline': InteractiveAnalysisPipeline,
  'enhanced-comparison': EnhancedComparison,
  'crispr-efficacy': CrisprEfficacyCard,
  'variant-landscape': VariantImpactLandscape,
  'discriminative-showcase': DiscriminativeAIShowcase,
  'interactive-demo': InteractiveDemoShowcase,
  'factory-demo': FactoryDemoShowcase,
  'vus-resolution': VUSResolutionDemo,
  'dynamic-oracle': DynamicOracleExplain,
  'visual-capability': VisualCapabilityGrid,
  'industry-problem': IndustryProblemShowcase,
  'api-value-prop': APIEnhancedValueProp,
  'oracle-score': OracleScore,
  'boltz-confidence': BoltzConfidence,
  'digital-synapse': DigitalSynapseBackground
} as const;

// Deck Components Registry - maps content.component to components
export const DECK_COMPONENTS = {
  ZetaOracleInAction,
  ZetaForgeTwoColumn,
  StructuralGauntlet,
} as const;

// Process Steps Registry - for process-steps content type
export const PROCESS_STEPPER = ProcessStepper;

// Helper function to get component by kind
export const getSiteBlock = (kind: string) => {
  return SITE_BLOCKS[kind as keyof typeof SITE_BLOCKS];
};

// Helper function to get deck component by name
export const getDeckComponent = (componentName: string) => {
  return DECK_COMPONENTS[componentName as keyof typeof DECK_COMPONENTS];
};
