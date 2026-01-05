'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import UseCaseDemoClient from '@/components/use-cases/UseCaseDemoClient';

// Import use cases directly to avoid potential circular dependency issues
import { discriminativeUseCases } from '@/data/use-cases/discriminative';
import { generativeUseCases } from '@/data/use-cases/generative';

const allUseCases = [...discriminativeUseCases, ...generativeUseCases];

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export default function UseCaseDetailPage({ params }: PageProps) {
  // Handle both Promise and plain object cases for Next.js compatibility
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const { id } = resolvedParams;
  const useCase = allUseCases.find(uc => uc.id === id);

  if (!useCase) {
    notFound();
  }

  return <UseCaseDemoClient useCase={useCase} />;
}

