// ============================================================================
// /kb/[moduleSlug]/ — redirect table.
//
// The KB is now a 3-tab router (/kb/) — no page body lives at a sub-URL.
// Legacy chapter slugs redirect into /research/chapters/<slug>/.
// Capability slugs redirect into /engine/#<slug>.
// Governance / ledger / roadmap slugs redirect to their new surfaces.
// Everything else 404s.
// ============================================================================

import { redirect, notFound } from 'next/navigation';
import { KB_CHAPTER_REDIRECTS, KB_HARDCODED_REDIRECTS } from '@/data/kb-redirects';
import { CAPABILITY_REGISTRY } from '@/data/capability-registry';

type Params = { moduleSlug: string };

export const dynamic = 'force-static';

export function generateStaticParams(): Params[] {
  const chapterSlugs = Object.keys(KB_CHAPTER_REDIRECTS);
  const hardcodedSlugs = Object.keys(KB_HARDCODED_REDIRECTS);
  const capSlugs = CAPABILITY_REGISTRY.map((c) => c.slug);
  const all = new Set<string>([...chapterSlugs, ...hardcodedSlugs, ...capSlugs]);
  return Array.from(all).map((moduleSlug) => ({ moduleSlug }));
}

export default async function KBModuleRedirect({ params }: { params: Promise<Params> }) {
  const { moduleSlug } = await params;

  // 1) Hard-coded old slugs (governance-guardrails, public-ledger, roadmap)
  if (moduleSlug in KB_HARDCODED_REDIRECTS) {
    redirect(KB_HARDCODED_REDIRECTS[moduleSlug]);
  }

  // 2) Legacy chapter slugs → new /research/chapters/<slug>/
  const chapterTarget = KB_CHAPTER_REDIRECTS[moduleSlug];
  if (chapterTarget) {
    redirect(`/research/chapters/${chapterTarget}/`);
  }

  // 3) Capability slugs → /engine/#<slug>
  const cap = CAPABILITY_REGISTRY.find((c) => c.slug === moduleSlug);
  if (cap) {
    redirect(`/engine/#${cap.slug}`);
  }

  notFound();
}
