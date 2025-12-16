/**
 * Navigation Helper Functions
 * Utilities for navigating the product → capability → co-pilot hierarchy
 */

import {
  CoPilotMapping,
  ProductSlug,
  CapabilitySlug,
  getCoPilotMapping,
  getCapabilityCoPilots,
  getProductCapabilities,
  getProductCoPilots,
  getCoPilotPath,
  getCapabilityPath,
} from './co-pilot-mappings';
import {
  getCapabilityDefinition,
  getProductCapabilityDefinitions,
} from './product-capabilities';

/**
 * Check if a co-pilot exists in mappings
 */
export function coPilotExists(coPilotSlug: string): boolean {
  return getCoPilotMapping(coPilotSlug) !== undefined;
}

/**
 * Check if a capability exists for a product
 */
export function capabilityExists(productSlug: ProductSlug, capabilitySlug: CapabilitySlug): boolean {
  return getCapabilityCoPilots(productSlug, capabilitySlug).length > 0;
}

/**
 * Get breadcrumb path for a co-pilot
 */
export function getCoPilotBreadcrumbs(coPilotSlug: string): Array<{ label: string; href: string }> | null {
  const mapping = getCoPilotMapping(coPilotSlug);
  if (!mapping) return null;
  
  const capabilityDef = getCapabilityDefinition(mapping.productSlug, mapping.capabilitySlug);
  
  return [
    { label: 'Products', href: '/products' },
    { 
      label: mapping.productSlug === 'oncology' ? 'Oncology' : mapping.productSlug === 'r-d' ? 'R&D' : 'Research',
      href: `/products/${mapping.productSlug}`
    },
    {
      label: capabilityDef?.title || mapping.capabilityTitle,
      href: getCapabilityPath(mapping.productSlug, mapping.capabilitySlug)
    },
    {
      label: mapping.coPilotSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      href: getCoPilotPath(coPilotSlug) || '#'
    }
  ];
}

/**
 * Get related co-pilots (same capability)
 */
export function getRelatedCoPilots(coPilotSlug: string): CoPilotMapping[] {
  const mapping = getCoPilotMapping(coPilotSlug);
  if (!mapping) return [];
  
  return getCapabilityCoPilots(mapping.productSlug, mapping.capabilitySlug)
    .filter(m => m.coPilotSlug !== coPilotSlug);
}

/**
 * Get sibling capabilities (same product)
 */
export function getSiblingCapabilities(productSlug: ProductSlug, currentCapabilitySlug: CapabilitySlug): CapabilitySlug[] {
  return getProductCapabilities(productSlug)
    .filter(slug => slug !== currentCapabilitySlug);
}

/**
 * Validate route parameters
 */
export function validateRouteParams(
  productSlug: string,
  capabilitySlug: string,
  coPilotSlug?: string
): { valid: boolean; error?: string } {
  // Validate product slug
  const validProducts: ProductSlug[] = ['oncology', 'r-d', 'research'];
  if (!validProducts.includes(productSlug as ProductSlug)) {
    return { valid: false, error: `Invalid product slug: ${productSlug}` };
  }
  
  // Validate capability slug
  const validCapabilities = getProductCapabilities(productSlug as ProductSlug);
  if (!validCapabilities.includes(capabilitySlug as CapabilitySlug)) {
    return { valid: false, error: `Invalid capability slug: ${capabilitySlug} for product: ${productSlug}` };
  }
  
  // Validate co-pilot slug if provided
  if (coPilotSlug) {
    const mapping = getCoPilotMapping(coPilotSlug);
    if (!mapping) {
      return { valid: false, error: `Invalid co-pilot slug: ${coPilotSlug}` };
    }
    if (mapping.productSlug !== productSlug || mapping.capabilitySlug !== capabilitySlug) {
      return { 
        valid: false, 
        error: `Co-pilot ${coPilotSlug} does not belong to ${productSlug}/${capabilitySlug}` 
      };
    }
  }
  
  return { valid: true };
}

/**
 * Generate static params for capability pages
 */
export function generateCapabilityStaticParams(): Array<{ productSlug: string; capabilitySlug: string }> {
  const params: Array<{ productSlug: string; capabilitySlug: string }> = [];
  const products: ProductSlug[] = ['oncology', 'r-d', 'research'];
  
  products.forEach(productSlug => {
    const capabilities = getProductCapabilities(productSlug);
    capabilities.forEach(capabilitySlug => {
      params.push({ productSlug, capabilitySlug });
    });
  });
  
  return params;
}

/**
 * Generate static params for co-pilot pages
 */
export function generateCoPilotStaticParams(): Array<{ productSlug: string; capabilitySlug: string; coPilotSlug: string }> {
  // Import CO_PILOT_MAPPINGS dynamically to avoid circular dependency
  const mappings = require('./co-pilot-mappings').CO_PILOT_MAPPINGS;
  
  return mappings.map((mapping: CoPilotMapping) => ({
    productSlug: mapping.productSlug,
    capabilitySlug: mapping.capabilitySlug,
    coPilotSlug: mapping.coPilotSlug,
  }));
}

