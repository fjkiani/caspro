/**
 * Product Capability Definitions
 * Defines capabilities for each product with metadata
 */

import { ProductSlug, CapabilitySlug } from './co-pilot-mappings';

export interface CapabilityDefinition {
  slug: CapabilitySlug;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
  metrics: string;
  time: string;
  businessImpact: string;
  apis: string[];
}

/**
 * Capability definitions for Oncology product
 */
export const ONCOLOGY_CAPABILITY_DEFINITIONS: Partial<Record<CapabilitySlug, CapabilityDefinition>> = {
  'match-patients-to-therapies': {
    slug: 'match-patients-to-therapies',
    title: 'Therapies & Trials: Level 2 of CSI Journey',
    subtitle: 'Drug Recommendations Powered by CSI',
    description: 'Once you have CSI score, unlock drug recommendations and clinical trial matching. S/P/E framework (validated AUROC 0.70, n=149) ranks therapies by…',
    icon: 'Target',
    color: 'from-green-500 to-emerald-600',
    badge: 'CSI Level 2',
    metrics: 'AUROC 0.70 (Validated)',
    time: '45 seconds',
    businessImpact: 'Rank drugs by mechanism fit for DDR-targeted therapy using validated S/P/E methodology',
    apis: ['predict_variant_impact', 'predict_gene_essentiality']
  },
  'prevent-toxicity': {
    slug: 'prevent-toxicity',
    title: 'Safety & Dosing: Level 4 of CSI Journey',
    subtitle: 'Prevent Dangerous Side Effects Before They Happen',
    description: 'Once you have CSI score and genetic safety screening, unlock personalized dosing. PGx-guided therapy selection (validated 83.1% toxicity reduction,…',
    icon: 'Shield',
    color: 'from-red-500 to-pink-600',
    badge: 'CSI Level 4',
    metrics: '83.1% Toxicity Reduction',
    time: '30 seconds',
    businessImpact: 'Prevent life-threatening adverse events before they happen. PGx screening (DPYD/TPMT/UGT1A1/CYP2D6) with drug interaction checking.',
    apis: ['predict_variant_impact', 'predict_protein_functionality_change']
  },
  'resolve-genetic-uncertainty': {
    slug: 'resolve-genetic-uncertainty',
    title: 'Resolve Genetic Uncertainty',
    subtitle: 'Zero-Shot Variant Interpretation',
    description: 'Zero-shot variant interpretation with Evo2 foundation model. Instantly resolves variants of unknown significance with transparent biological reasoning.',
    icon: 'Search',
    color: 'from-blue-500 to-cyan-600',
    badge: 'Zero-Shot',
    metrics: 'Biological Reasoning',
    time: '30 seconds',
    businessImpact: 'Same-day clinical decisions with transparent variant classification',
    apis: ['predict_variant_impact', 'predict_protein_functionality_change', 'predict_chromatin_accessibility']
  },
  'predict-resistance': {
    slug: 'predict-resistance',
    title: 'Resistance Prediction: Level 3 of CSI Journey',
    subtitle: 'Predict When Chemo Might Stop Working',
    description: 'Once you have CSI score and treatment history, unlock resistance prediction. Post-treatment pathway profiling (validated AUROC 0.714-0.750, n=11)…',
    icon: 'Activity',
    color: 'from-orange-500 to-red-600',
    badge: 'CSI Level 3',
    metrics: 'AUROC 0.714-0.750',
    time: '60 seconds',
    businessImpact: 'Early intervention prevents treatment failures and preserves therapeutic windows. Predict resistance 3-6 weeks before imaging confirms it.',
    apis: ['predict_gene_essentiality', 'predict_chromatin_accessibility', 'predict_protein_functionality_change']
  },
  'clinical-trials': {
    slug: 'clinical-trials',
    title: 'Clinical Trial Matching',
    subtitle: 'Mechanism-Based Matching',
    description: 'Transparent eligibility reasoning with green/yellow/red flags per criterion. Mechanism-based matching connects patient pathways to trial drug mechanisms.',
    icon: 'Users',
    color: 'from-purple-500 to-violet-600',
    badge: 'Clinical Intelligence',
    metrics: 'Mechanism-Based Matching',
    time: '45 seconds',
    businessImpact: 'Same-day actionable trial matches with transparent eligibility reasoning',
    apis: ['predict_variant_impact', 'predict_gene_essentiality']
  },
  'clinical-data-management': {
    slug: 'clinical-data-management',
    title: 'Clinical Data Management',
    subtitle: 'Intelligent EMR Integration',
    description: 'Autonomous AI agents convert unstructured EMR data into actionable clinical insights. Unified, queryable intelligence platform for clinical and…',
    icon: 'Database',
    color: 'from-indigo-500 to-blue-600',
    badge: 'AI Agents',
    metrics: 'Real-time Processing',
    time: 'Seconds',
    businessImpact: 'Unified patient view, trial recruitment support, streamlined workflows',
    apis: ['predict_variant_impact', 'predict_gene_essentiality']
  }
};

/**
 * Capability definitions for R&D product
 */
export const RD_CAPABILITY_DEFINITIONS: Partial<Record<CapabilitySlug, CapabilityDefinition>> = {
  'therapeutic-design': {
    slug: 'therapeutic-design',
    title: 'Therapeutic Design',
    subtitle: 'CRISPR & Protein Engineering',
    description: 'Design precision CRISPR therapeutics and novel biologics with structural validation. Guide RNA optimization, HDR template generation, and protein…',
    icon: 'Dna',
    color: 'from-purple-500 to-violet-600',
    badge: 'Generative AI',
    metrics: '70% Pfam-hit Rate',
    time: '2-5 minutes',
    businessImpact: 'Design undruggable targets with validated structural confirmation',
    apis: ['generate_optimized_guide_rna', 'generate_therapeutic_protein', 'generate_repair_template']
  },
  'target-validation': {
    slug: 'target-validation',
    title: 'Target Validation',
    subtitle: 'Pathway Analysis',
    description: 'Validate therapeutic targets through pathway analysis and gene essentiality scoring. Identify synthetic lethality opportunities and validate target…',
    icon: 'Target',
    color: 'from-teal-500 to-cyan-600',
    badge: 'Discriminative AI',
    metrics: '95.7% AUROC',
    time: '30 seconds',
    businessImpact: 'Validate targets before expensive wet-lab experiments',
    apis: ['predict_variant_impact', 'predict_gene_essentiality']
  }
};

/**
 * Capability definitions for Research product
 */
export const RESEARCH_CAPABILITY_DEFINITIONS: Partial<Record<CapabilitySlug, CapabilityDefinition>> = {
  'variant-analysis': {
    slug: 'variant-analysis',
    title: 'Variant Analysis',
    subtitle: 'Zero-Shot Interpretation',
    description: 'Universal variant impact prediction across all species and variant types. Zero-shot capability with 95.7% AUROC on ClinVar benchmark.',
    icon: 'Search',
    color: 'from-blue-500 to-indigo-600',
    badge: 'Foundation Model',
    metrics: '95.7% AUROC',
    time: '30 seconds',
    businessImpact: 'Accelerate discovery from years to hours with validated predictions',
    apis: ['predict_variant_impact', 'predict_protein_functionality_change']
  },
  'therapeutic-design': {
    slug: 'therapeutic-design',
    title: 'Therapeutic Design',
    subtitle: 'Generative Biology',
    description: 'Generate novel therapeutic proteins and biologics with structural validation. Research-grade design tools for hypothesis testing.',
    icon: 'Dna',
    color: 'from-purple-500 to-pink-600',
    badge: 'Generative AI',
    metrics: '70% Pfam-hit Rate',
    time: '2-5 minutes',
    businessImpact: 'Test hypotheses faster with validated generative design',
    apis: ['generate_therapeutic_protein', 'generate_optimized_guide_rna']
  },
  'conversational-ai': {
    slug: 'conversational-ai',
    title: 'Conversational AI',
    subtitle: 'Natural Language Interface',
    description: 'Ask questions naturally, get evidence-backed answers. Progressive disclosure with audience-appropriate explanations. Natural language access to all…',
    icon: 'MessageSquare',
    color: 'from-teal-500 to-cyan-600',
    badge: 'Conversational',
    metrics: 'Multi-Intent Handling',
    time: 'Real-time',
    businessImpact: 'Eliminate technical barriers - access all capabilities through natural conversation',
    apis: ['predict_variant_impact', 'predict_gene_essentiality', 'generate_therapeutic_protein']
  }
};

/**
 * Get capability definition for a product and capability
 */
export function getCapabilityDefinition(
  productSlug: ProductSlug,
  capabilitySlug: CapabilitySlug
): CapabilityDefinition | undefined {
  switch (productSlug) {
    case 'oncology':
      return ONCOLOGY_CAPABILITY_DEFINITIONS[capabilitySlug];
    case 'r-d':
      return RD_CAPABILITY_DEFINITIONS[capabilitySlug];
    case 'research':
      return RESEARCH_CAPABILITY_DEFINITIONS[capabilitySlug];
    default:
      return undefined;
  }
}

/**
 * Get all capability definitions for a product
 */
export function getProductCapabilityDefinitions(productSlug: ProductSlug): CapabilityDefinition[] {
  let definitions: Partial<Record<CapabilitySlug, CapabilityDefinition>>;
  
  switch (productSlug) {
    case 'oncology':
      definitions = ONCOLOGY_CAPABILITY_DEFINITIONS;
      break;
    case 'r-d':
      definitions = RD_CAPABILITY_DEFINITIONS;
      break;
    case 'research':
      definitions = RESEARCH_CAPABILITY_DEFINITIONS;
      break;
    default:
      return [];
  }
  
  return Object.values(definitions).filter((def): def is CapabilityDefinition => def !== undefined);
}

