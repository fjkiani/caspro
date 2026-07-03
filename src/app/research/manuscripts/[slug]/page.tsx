import { permanentRedirect } from 'next/navigation';
import { researchManuscriptPath } from '@/lib/research/paths';
import { normalizeManuscriptSlugParam } from '@/lib/research/manuscript-slug';
import type { Metadata } from 'next';

// Legacy redirect page; minimal metadata, noindex.
export const metadata: Metadata = {
  title: "Manuscript Redirect",
  description: "Legacy redirect to canonical manuscript URL on the CrisPRO.ai platform.",
  robots: { index: false, follow: true },
};

type Props = { params: { slug: string } };

/** Legacy / mistaken path → canonical `/manuscripts/[slug]/`. */
export default function ResearchManuscriptSlugRedirect({ params }: Props) {
  const slug = normalizeManuscriptSlugParam(params.slug);
  permanentRedirect(researchManuscriptPath(slug));
}
