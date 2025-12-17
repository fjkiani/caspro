import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allUseCases } from '@/data/use-cases';
import UseCaseDemoClient from '@/components/use-cases/UseCaseDemoClient';

type PageProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  return allUseCases.map((uc) => ({
    id: uc.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const useCase = allUseCases.find(uc => uc.id === params.id);
  
  if (!useCase) {
    return { title: 'Use Case Not Found | CrisPRO' };
  }

  return {
    title: `${useCase.name} | CrisPRO Use Cases`,
    description: useCase.summary,
  };
}

export default function UseCaseDetailPage({ params }: PageProps) {
  const useCase = allUseCases.find(uc => uc.id === params.id);

  if (!useCase) {
    notFound();
  }

  return <UseCaseDemoClient useCase={useCase} />;
}

