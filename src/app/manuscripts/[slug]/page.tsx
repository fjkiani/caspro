import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUseCaseBySlugCms } from '@/lib/docs/hygraph/use-case-queries';
import UseCaseViewer from '@/components/use-case/UseCaseViewer';

interface ManuscriptPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ManuscriptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = await getUseCaseBySlugCms(slug);

  if (!useCase) {
    return { title: 'Manuscript not found | CrisPRO.ai' };
  }

  const description =
    useCase.resultsHeadline ||
    useCase.description ||
    'How we solved a real problem with AI and engineering.';

  return {
    title: `${useCase.title} | CrisPRO.ai Manuscript`,
    description,
  };
}

export default async function ManuscriptDetailPage({ params }: ManuscriptPageProps) {
  const { slug } = await params;
  const useCase = await getUseCaseBySlugCms(slug);

  if (!useCase) {
    notFound();
  }

  return <UseCaseViewer useCase={useCase} />;
}
