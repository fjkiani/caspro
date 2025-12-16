import { CapabilityCardData } from '@/components/products/shared/CapabilityShowcase';
import { Target, Zap, Shield, FileText, Award } from 'lucide-react';
import { VUSResolutionDemo } from '@/components/sae';
import { DataLabExplorer } from '@/components/evidence/interactive';
import EnhancedDossierSummary from '@/components/landing/EnhancedDossierSummary';
import StructuralValidationViz from '@/components/kill-chain-visualizations/StructuralValidationViz';
import ForgeDesignChallengesDemo from '@/components/products/r-d/ForgeDesignChallengesDemo';
import IPMonetizationDemo from '@/components/products/r-d/IPMonetizationDemo';

// Target Discovery & Validation
export const TARGET_DISCOVERY_CAPABILITY: CapabilityCardData = {
  id: 'target-discovery',
  title: 'Target Discovery & Validation',
  subtitle: 'Zero-Shot Variant Impact',
  description: '',
  icon: Target,
  color: 'from-blue-500 to-cyan-600',
  badge: 'Mathematical Proof',
  metrics: '95.7% AUROC',
  time: '60 seconds',
  businessImpact: 'De-risk target selection before spending millions on experiments',
  apis: ['predict_variant_impact', 'predict_gene_essentiality', 'predict_protein_functionality_change'],
  component: VUSResolutionDemo,
  seedData: {}
};

// Therapeutic Design & Generation
export const THERAPEUTIC_DESIGN_CAPABILITY: CapabilityCardData = {
  id: 'therapeutic-design',
  title: 'Therapeutic Design & Generation',
  subtitle: '70% Functional Coherence',
  description: '',
  icon: Zap,
  color: 'from-green-500 to-emerald-600',
  badge: 'Generative AI',
  metrics: '70% Functional',
  time: '45 seconds',
  businessImpact: 'Generate patent-worthy therapeutic candidates from first principles',
  apis: ['generate_optimized_guide_rna', 'generate_therapeutic_protein', 'generate_repair_template'],
  component: ForgeDesignChallengesDemo,
  seedData: {}
};

// Structural Validation
export const STRUCTURAL_VALIDATION_CAPABILITY: CapabilityCardData = {
  id: 'structural-validation',
  title: 'Structural Validation',
  subtitle: '95.8% Confidence',
  description: '',
  icon: Shield,
  color: 'from-orange-500 to-red-600',
  badge: '3D Validation',
  metrics: '95.8% Confidence',
  time: '30 seconds',
  businessImpact: 'Validate structural integrity before wet lab investment',
  apis: ['predict_protein_functionality_change'],
  component: StructuralValidationViz,
  seedData: {}
};

// IND Package Generation
export const IND_PACKAGE_CAPABILITY: CapabilityCardData = {
  id: 'ind-package',
  title: 'IND Package Generation',
  subtitle: 'Complete Evidence Dossier',
  description: '',
  icon: FileText,
  color: 'from-purple-500 to-indigo-600',
  badge: 'Regulatory Ready',
  metrics: 'Complete Dossier',
  time: '90 seconds',
  businessImpact: 'IND-ready documentation with complete audit trail',
  apis: [],
  component: EnhancedDossierSummary,
  seedData: {}
};

// IP Monetization
export const IP_MONETIZATION_CAPABILITY: CapabilityCardData = {
  id: 'ip-monetization',
  title: 'IP Monetization',
  subtitle: 'Patent Strategy',
  description: '',
  icon: Award,
  color: 'from-teal-500 to-cyan-600',
  badge: 'IP Strategy',
  metrics: 'Patent-Ready',
  time: '60 seconds',
  businessImpact: 'Transform designs into monetizable IP assets',
  apis: [],
  component: IPMonetizationDemo,
  seedData: {}
};

export const RD_CAPABILITIES: CapabilityCardData[] = [
  TARGET_DISCOVERY_CAPABILITY,
  THERAPEUTIC_DESIGN_CAPABILITY,
  STRUCTURAL_VALIDATION_CAPABILITY,
  IND_PACKAGE_CAPABILITY,
  IP_MONETIZATION_CAPABILITY
];



