/**
 * Co-Pilot → Product → Capability Mapping
 * Maps all co-pilots to their parent products and capabilities
 */

export type ProductSlug = 'oncology' | 'r-d' | 'research';
export type CapabilitySlug = 
  | 'match-patients-to-therapies'
  | 'prevent-toxicity'
  | 'resolve-genetic-uncertainty'
  | 'predict-resistance'
  | 'clinical-trials'
  | 'clinical-data-management'
  | 'therapeutic-design'
  | 'target-validation'
  | 'variant-analysis'
  | 'conversational-ai';

export interface CoPilotMapping {
  coPilotSlug: string;
  productSlug: ProductSlug;
  capabilitySlug: CapabilitySlug;
  capabilityTitle: string;
  priority: 'primary' | 'secondary';
  description?: string;
}

/**
 * Complete mapping of all co-pilots to products and capabilities
 */
export const CO_PILOT_MAPPINGS: CoPilotMapping[] = [
  // ============================================
  // ONCOLOGY PRODUCT
  // ============================================
  
  // Match Patients to Therapies Capability (Multi-co-pilot - uses tabs)
  {
    coPilotSlug: 'chemo',
    productSlug: 'oncology',
    capabilitySlug: 'match-patients-to-therapies',
    capabilityTitle: 'Match Patients to Therapies',
    priority: 'primary',
    description: 'Mechanism-based drug ranking with S/P/E fusion'
  },
  {
    coPilotSlug: 'therapy-fit',
    productSlug: 'oncology',
    capabilitySlug: 'match-patients-to-therapies',
    capabilityTitle: 'Match Patients to Therapies',
    priority: 'primary',
    description: 'Personalized drug ranking with 70-85% confidence'
  },
  {
    coPilotSlug: 'immunotherapy',
    productSlug: 'oncology',
    capabilitySlug: 'match-patients-to-therapies',
    capabilityTitle: 'Match Patients to Therapies',
    priority: 'primary',
    description: 'Immunotherapy eligibility and response prediction'
  },
  
  // Clinical Trials - Standalone Capability
  {
    coPilotSlug: 'clinical-trials',
    productSlug: 'oncology',
    capabilitySlug: 'clinical-trials',
    capabilityTitle: 'Clinical Trial Matching',
    priority: 'primary',
    description: '96.6% trial match accuracy with transparent eligibility reasoning'
  },
  
  // Prevent Toxicity Capability
  {
    coPilotSlug: 'toxicity-risk',
    productSlug: 'oncology',
    capabilitySlug: 'prevent-toxicity',
    capabilityTitle: 'Prevent Toxicity Before It Happens',
    priority: 'primary',
    description: '100% PGx coverage for DPYD/TPMT/UGT1A1/CYP2D6'
  },
  
  // Resolve Genetic Uncertainty Capability
  {
    coPilotSlug: 'vus-resolution', // Note: This co-pilot may need to be created
    productSlug: 'oncology',
    capabilitySlug: 'resolve-genetic-uncertainty',
    capabilityTitle: 'Resolve Genetic Uncertainty',
    priority: 'primary',
    description: 'Zero-shot variant interpretation with 95.7% AUROC'
  },
  
  // Predict Resistance Capability
  {
    coPilotSlug: 'resistance-detection', // Note: This co-pilot may need to be created
    productSlug: 'oncology',
    capabilitySlug: 'predict-resistance',
    capabilityTitle: 'Predict Resistance Before It Happens',
    priority: 'primary',
    description: '3-6 weeks early detection with CA-125 intelligence'
  },
  
  // Clinical Data Management - Standalone Capability
  {
    coPilotSlug: 'agentic-emr',
    productSlug: 'oncology',
    capabilitySlug: 'clinical-data-management',
    capabilityTitle: 'Clinical Data Management',
    priority: 'primary',
    description: 'Autonomous AI agents for EMR data integration and clinical intelligence'
  },
  
  // ============================================
  // R&D PRODUCT
  // ============================================
  
  // Therapeutic Design Capability
  {
    coPilotSlug: 'crispr-intelligence',
    productSlug: 'r-d',
    capabilitySlug: 'therapeutic-design',
    capabilityTitle: 'Therapeutic Design',
    priority: 'primary',
    description: 'CRISPR therapeutic design with guide RNA optimization'
  },
  
  // Target Validation Capability
  {
    coPilotSlug: 'pathway',
    productSlug: 'r-d',
    capabilitySlug: 'target-validation',
    capabilityTitle: 'Target Validation',
    priority: 'secondary',
    description: 'Pathway analysis for target identification'
  },
  
  // ============================================
  // RESEARCH PRODUCT
  // ============================================
  
  // Variant Analysis Capability
  {
    coPilotSlug: 'oracle-intelligence',
    productSlug: 'research',
    capabilitySlug: 'variant-analysis',
    capabilityTitle: 'Variant Analysis',
    priority: 'primary',
    description: 'Zero-shot variant impact prediction with Evo2'
  },
  
  // Therapeutic Design Capability (Research)
  {
    coPilotSlug: 'forge-intelligence',
    productSlug: 'research',
    capabilitySlug: 'therapeutic-design',
    capabilityTitle: 'Therapeutic Design',
    priority: 'primary',
    description: 'Generative therapeutic design with structural validation'
  },
  
  // Conversational AI - Standalone Capability (Research)
  {
    coPilotSlug: 'scribe-intelligence',
    productSlug: 'research',
    capabilitySlug: 'conversational-ai',
    capabilityTitle: 'Conversational AI',
    priority: 'primary',
    description: 'Natural language access to all CrisPRO capabilities with progressive disclosure'
  },
];

/**
 * Get mapping for a specific co-pilot
 */
export function getCoPilotMapping(coPilotSlug: string): CoPilotMapping | undefined {
  return CO_PILOT_MAPPINGS.find(m => m.coPilotSlug === coPilotSlug);
}

/**
 * Get all co-pilots for a specific capability
 */
export function getCapabilityCoPilots(
  productSlug: ProductSlug,
  capabilitySlug: CapabilitySlug
): CoPilotMapping[] {
  return CO_PILOT_MAPPINGS.filter(
    m => m.productSlug === productSlug && m.capabilitySlug === capabilitySlug
  );
}

/**
 * Get all capabilities for a product
 */
export function getProductCapabilities(productSlug: ProductSlug): CapabilitySlug[] {
  const capabilities = new Set<CapabilitySlug>();
  CO_PILOT_MAPPINGS
    .filter(m => m.productSlug === productSlug)
    .forEach(m => capabilities.add(m.capabilitySlug));
  return Array.from(capabilities);
}

/**
 * Get all co-pilots for a product
 */
export function getProductCoPilots(productSlug: ProductSlug): CoPilotMapping[] {
  return CO_PILOT_MAPPINGS.filter(m => m.productSlug === productSlug);
}

/**
 * Generate URL path for a co-pilot
 */
export function getCoPilotPath(coPilotSlug: string): string | null {
  const mapping = getCoPilotMapping(coPilotSlug);
  if (!mapping) return null;
  
  return `/products/${mapping.productSlug}/${mapping.capabilitySlug}/${coPilotSlug}`;
}

/**
 * Generate URL path for a capability
 */
export function getCapabilityPath(productSlug: ProductSlug, capabilitySlug: CapabilitySlug): string {
  return `/products/${productSlug}/${capabilitySlug}`;
}

