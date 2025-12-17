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
    title: 'Match Patients to Therapies',
    subtitle: 'Mechanism-Based Drug Ranking',
    description: 'S/P/E fusion (Sequence/Pathway/Evidence) matches patients to therapies with 96.6% trial match accuracy. Mechanism-based matching, not just standard of care.',
    icon: 'Target',
    color: 'from-green-500 to-emerald-600',
    badge: 'AI Engineering',
    metrics: '96.6% Trial Match Accuracy',
    time: '45 seconds',
    businessImpact: 'Same-day actionable drug recommendations with transparent reasoning',
    apis: ['predict_variant_impact', 'predict_gene_essentiality', 'generate_therapeutic_protein']
  },
  'prevent-toxicity': {
    slug: 'prevent-toxicity',
    title: 'Prevent Toxicity Before It Happens',
    subtitle: '100% PGx Coverage',
    description: '100% toxicity prevention coverage for DPYD/TPMT/UGT1A1/CYP2D6. Life-threatening prevention with drug interaction checking and protective nutrition recommendations.',
    icon: 'Shield',
    color: 'from-red-500 to-pink-600',
    badge: 'Clinical Proof',
    metrics: '100% Coverage',
    time: '30 seconds',
    businessImpact: 'Prevent life-threatening adverse events before they happen',
    apis: ['predict_variant_impact', 'predict_protein_functionality_change']
  },
  'resolve-genetic-uncertainty': {
    slug: 'resolve-genetic-uncertainty',
    title: 'Resolve Genetic Uncertainty',
    subtitle: 'Zero-Shot Variant Interpretation',
    description: 'Zero-shot variant interpretation with Evo2 foundation model. Instantly resolves variants of unknown significance with 95.7% AUROC accuracy and transparent biological reasoning.',
    icon: 'Search',
    color: 'from-blue-500 to-cyan-600',
    badge: 'Mathematical Proof',
    metrics: '95.7% AUROC, 73% VUS Resolution',
    time: '30 seconds',
    businessImpact: 'Same-day clinical decisions with transparent variant classification',
    apis: ['predict_variant_impact', 'predict_protein_functionality_change', 'predict_chromatin_accessibility']
  },
  'predict-resistance': {
    slug: 'predict-resistance',
    title: 'Predict Resistance Before It Happens',
    subtitle: '3-6 Weeks Early Detection',
    description: 'Proactive resistance detection 3-6 weeks faster than imaging. CA-125 intelligence with kinetics forecasting enables early intervention before treatment failure.',
    icon: 'Activity',
    color: 'from-orange-500 to-red-600',
    badge: 'Predictive Intelligence',
    metrics: '3-6 Weeks Earlier',
    time: '60 seconds',
    businessImpact: 'Early intervention prevents treatment failures and preserves therapeutic windows',
    apis: ['predict_gene_essentiality', 'predict_chromatin_accessibility', 'predict_protein_functionality_change']
  },
  'clinical-trials': {
    slug: 'clinical-trials',
    title: 'Clinical Trial Matching',
    subtitle: '96.6% Match Accuracy',
    description: 'Transparent eligibility reasoning with green/yellow/red flags per criterion. Same-day trial site calls with action-ready packets.',
    icon: 'Users',
    color: 'from-purple-500 to-violet-600',
    badge: 'Clinical Intelligence',
    metrics: '96.6% Accuracy',
    time: '45 seconds',
    businessImpact: 'Same-day actionable trial matches with transparent eligibility reasoning',
    apis: ['predict_variant_impact', 'predict_gene_essentiality']
  },
  'clinical-data-management': {
    slug: 'clinical-data-management',
    title: 'Clinical Data Management',
    subtitle: 'Intelligent EMR Integration',
    description: 'Autonomous AI agents convert unstructured EMR data into actionable clinical insights. Unified, queryable intelligence platform for clinical and research operations.',
    icon: 'Database',
    color: 'from-indigo-500 to-blue-600',
    badge: 'AI Agents',
    metrics: 'Real-time Processing',
    time: 'Seconds',
    businessImpact: 'Unified patient view in seconds, accelerated trial recruitment, streamlined workflows',
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
    description: 'Design precision CRISPR therapeutics and novel biologics with structural validation. Guide RNA optimization, HDR template generation, and protein engineering.',
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
    description: 'Validate therapeutic targets through pathway analysis and gene essentiality scoring. Identify synthetic lethality opportunities and validate target druggability.',
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
    description: 'Ask questions naturally, get evidence-backed answers. Progressive disclosure with audience-appropriate explanations. Natural language access to all CrisPRO capabilities.',
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

