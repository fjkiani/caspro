import { permanentRedirect } from 'next/navigation';
import { researchManuscriptPath } from '@/lib/research/paths';
import { normalizeManuscriptSlugParam } from '@/lib/research/manuscript-slug';

type Props = { params: { slug: string } };

/** Legacy / mistaken path → canonical `/manuscripts/[slug]/`. */
export default function ResearchManuscriptSlugRedirect({ params }: Props) {
  const slug = normalizeManuscriptSlugParam(params.slug);
  permanentRedirect(researchManuscriptPath(slug));
}
