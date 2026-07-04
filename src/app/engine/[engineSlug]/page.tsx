import EngineSlugClient from './EngineSlugClient';
import { normalizeEngineSlug } from '@/data/engine-slug';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { engineSlug: string };
}): Promise<Metadata> {
  const slug = normalizeEngineSlug(params.engineSlug);
  const humanized = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${humanized} Engine`,
    description: `${humanized}: a CrisPRO.ai engine for oncology decision support and AI-driven metastasis prevention.`,
    alternates: { canonical: `/engine/${slug}` },
  };
}

type Props = {
  params: { engineSlug: string };
};

export default function EngineSlugRoutePage({ params }: Props) {
  const slug = normalizeEngineSlug(params.engineSlug);
  return <EngineSlugClient slug={slug} />;
}
