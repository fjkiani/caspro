import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUseCaseBySlugCms } from '@/lib/docs/hygraph/use-case-queries';
import UseCaseViewer from '@/components/use-case/UseCaseViewer';

interface ManuscriptPageProps {
  params: Promise<{ slug: string }>;
}

// ---------------------------------------------------------------------------
// generateMetadata — full Twitter card + LinkedIn (OpenGraph) with Hygraph image
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: ManuscriptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = await getUseCaseBySlugCms(slug);

  if (!useCase) {
    return { title: 'Manuscript not found | CrisPRO.ai' };
  }

  const title = `${useCase.title} | CrisPRO.ai Manuscript`;
  const description =
    useCase.resultsHeadline?.trim() ||
    useCase.description?.trim() ||
    'How we solved a real problem with AI and engineering.';

  const pageUrl = `https://crispro.ai/manuscripts/${slug}/`;

  // Prefer heroImage, then thumbnail, then site-wide fallback
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

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function ManuscriptDetailPage({ params }: ManuscriptPageProps) {
  const { slug } = await params;
  const useCase = await getUseCaseBySlugCms(slug);

  if (!useCase) {
    notFound();
  }

  return <UseCaseViewer useCase={useCase} />;
}
