// ============================================================================
// kb-redirects.ts — the legacy /kb/[slug]/ URL space maps into the current
// architecture. Old KB chapter slugs redirect to /research/chapters/;
// capability slugs redirect to /engine/#capability. Everything else 404s.
// ============================================================================

// Legacy KB chapter slug → new research-chapter slug
export const KB_CHAPTER_REDIRECTS: Record<string, string> = {
  'why-trials-fail': 'why-trials-fail-on-responders',
  'mechanism-alignment-layer': 'mechanism-alignment',
  'eight-dimensional-vector': 'patient-biology-axes',
  'trial-vector-library': 'trial-target-library',
  'mechanism-fit-engine': 'mechanism-alignment',
  'target-lock': 'target-lock',
  'sl-therapy-bridge': 'therapy-bridge',
  'biomarker-taxonomy': 'evidence-hierarchy',
  'escape-map': 'why-trials-fail-on-responders',
  'two-gate-selection': 'therapy-bridge',
  'holistic-score': 'mechanism-alignment',
  'governance-guardrails': null as unknown as string, // → /governance/ (handled below)
  'public-ledger': null as unknown as string,          // → /ledger/
  'roadmap': null as unknown as string,                // → /about/
  // First-principles chapter added in the rebuild — direct slug match already
  'sl-first-principles': 'sl-first-principles',
  'seven-evidence-modalities': 'seven-evidence-modalities',
  'evidence-hierarchy': 'evidence-hierarchy',
  'mechanism-alignment': 'mechanism-alignment',
  'patient-biology-axes': 'patient-biology-axes',
  'trial-target-library': 'trial-target-library',
  'therapy-bridge': 'therapy-bridge',
  'why-trials-fail-on-responders': 'why-trials-fail-on-responders',
};

// Legacy KB non-chapter routes → external destinations
export const KB_HARDCODED_REDIRECTS: Record<string, string> = {
  'governance-guardrails': '/governance/',
  'public-ledger': '/ledger/',
  'roadmap': '/about/',
};

// Capability slugs go into /engine/#<slug> — matches CAPABILITY_REGISTRY.slug
// This is imported dynamically so tests can also route capability slugs cleanly.
export function resolveKBSlug(slug: string): { kind: 'chapter' | 'capability' | 'hardcoded' | 'unknown'; href: string } {
  if (slug in KB_HARDCODED_REDIRECTS) {
    return { kind: 'hardcoded', href: KB_HARDCODED_REDIRECTS[slug] };
  }
  if (slug in KB_CHAPTER_REDIRECTS && KB_CHAPTER_REDIRECTS[slug]) {
    return { kind: 'chapter', href: `/research/chapters/${KB_CHAPTER_REDIRECTS[slug]}/` };
  }
  // Capability lookup deferred to caller (needs CAPABILITY_REGISTRY at runtime)
  return { kind: 'unknown', href: '' };
}
