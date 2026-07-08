// ============================================================================
// kb-index.ts — deprecated. Module concept retired.
// The /kb/ tab surfaces CAPABILITY_REGISTRY, GOVERNANCE_GUARDRAILS, and CHAPTERS
// directly. This shim keeps a minimal export surface for any straggling imports.
// ============================================================================

export const KB_MODULES: never[] = [];
export const KB_CAPABILITIES: never[] = [];

// Kept-but-empty accessor. Callers should use CAPABILITY_REGISTRY from
// '@/data/capability-registry' or GOVERNANCE_GUARDRAILS from '@/data/depth-layer'.
export function getModule(_slug: string): undefined {
  return undefined;
}
