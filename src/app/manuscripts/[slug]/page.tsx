import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { resolveManuscriptBySlugParam } from '@/lib/docs/hygraph/use-case-queries';
import { researchManuscriptPath } from '@/lib/research/paths';
import { normalizeManuscriptSlugParam } from '@/lib/research/manuscript-slug';
import UseCaseViewer from '@/components/use-case/UseCaseViewer';

type ManuscriptPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ManuscriptPageProps): Promise<Metadata> {
  const slug = normalizeManuscriptSlugParam(params.slug);
  const useCase = await resolveManuscriptBySlugParam(slug);

  if (!useCase) {
    return { title: 'Manuscript not found | CrisPRO.ai' };
  }

  const canonicalSlug = useCase.slug || slug;
  const title = `${useCase.title} | CrisPRO.ai Manuscript`;
  const description =
    useCase.resultsHeadline?.trim() ||
    useCase.description?.trim() ||
    'How we solved a real problem with AI and engineering.';

  const pageUrl = `https://crispro.ai${researchManuscriptPath(canonicalSlug)}`;

  const ogImageUrl =
    useCase.heroImage?.url ??
    useCase.thumbnail?.url ??
    'https://crispro.ai/og-image.png';

  const ogImageWidth =
    (useCase.heroImage as { url: string; width?: number } | null | undefined)?.width ??
    (useCase.thumbnail as { url: string; width?: number } | null | undefined)?.width ??
    1200;

  const ogImageHeight =
    (useCase.heroImage as { url: string; height?: number } | null | undefined)?.height ??
    (useCase.thumbnail as { url: string; height?: number } | null | undefined)?.height ??
    630;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'CrisPRO',
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: useCase.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@crispro_ai',
      site: '@crispro_ai',
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ManuscriptDetailPage({ params }: ManuscriptPageProps) {
  const paramSlug = normalizeManuscriptSlugParam(params.slug);
  const useCase = await resolveManuscriptBySlugParam(paramSlug);

  if (!useCase) {
    notFound();
  }

  const canonicalSlug = useCase.slug?.trim();
  if (canonicalSlug && canonicalSlug !== paramSlug) {
    permanentRedirect(researchManuscriptPath(canonicalSlug));
  }

  return <UseCaseViewer useCase={useCase} />;
}
