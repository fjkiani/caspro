import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getMediaBySlug, getAllMedia } from '@/lib/docs/hygraph/media-queries';
import { getUseCaseBySlugCms } from '@/lib/docs/hygraph/use-case-queries';
import MultiContentMediaViewer from '@/components/media/MultiContentMediaViewer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = await getUseCaseBySlugCms(slug);
  if (useCase) {
    return {
      title: `${useCase.title} | CrisPRO.ai Use case`,
      description: useCase.resultsHeadline || useCase.description || 'Use case from CrisPRO.ai',
    };
  }
  const media = await getMediaBySlug(slug);
  if (!media) return { title: 'Not Found | CrisPRO.ai' };
  return {
    title: `${media.title} | CrisPRO.ai Media`,
    description: media.excerpt || media.description?.text || 'View media content from CrisPRO.ai',
  };
}

export default async function MediaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Prefer Use Case (CMS): redirect to use-case section for a single-page narrative (no tabs)
  const useCase = await getUseCaseBySlugCms(slug);
  if (useCase) {
    redirect(`/use-case/${slug}`);
  }

  const media = await getMediaBySlug(slug);
  if (!media) notFound();

  return <MultiContentMediaViewer media={media} />;
}
