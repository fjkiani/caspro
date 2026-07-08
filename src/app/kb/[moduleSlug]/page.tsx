import type { Metadata } from 'next';
import KBModuleDetail from '@/components/kb/KBModuleDetail';
import { getModule } from '@/data/kb-index';
import { getChapter } from '@/data/kb-chapters';

type Params = { moduleSlug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { moduleSlug } = await params;
  const mod = getModule(moduleSlug);
  const ch = getChapter(moduleSlug);
  const title = mod?.name ?? ch?.title ?? 'Not found';
  return {
    title: `${title} — CrisPRO knowledge base`,
    description: mod?.oneLiner ?? ch?.body?.[0] ?? '',
  };
}

export default async function KBModulePage({ params }: { params: Promise<Params> }) {
  const { moduleSlug } = await params;
  return <KBModuleDetail slug={moduleSlug} />;
}
