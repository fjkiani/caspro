// ============================================================================
// kb-chapters.ts — deprecated. Chapter data moved to src/data/chapters/*.ts.
// The /kb/[moduleSlug]/ route redirects to /research/chapters/<slug>/.
// This shim keeps a minimal export surface for any straggling imports.
// ============================================================================

export const KB_CHAPTERS: never[] = [];

// Kept-but-empty accessor. Callers should use CHAPTERS from '@/data/chapters-index'.
export function getChapter(_slug: string): undefined {
  return undefined;
}
