import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ChapterSurface from '@/components/research/ChapterSurface';
import { CHAPTERS, getChapter, getAdjacentChapters } from '@/data/chapters-index';

export function generateStaticParams() {
  return CHAPTERS.map((ch) => ({ chapterSlug: ch.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ chapterSlug: string }> },
): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getChapter(chapterSlug);
  if (!chapter) return { title: 'Chapter not found — CrisPRO' };
  return {
    title: `${chapter.title} — CrisPRO research`,
    description: chapter.subtitle,
  };
}

export default async function ChapterPage(
  { params }: { params: Promise<{ chapterSlug: string }> },
) {
  const { chapterSlug } = await params;
  const chapter = getChapter(chapterSlug);
  if (!chapter) notFound();
  const { prev, next } = getAdjacentChapters(chapterSlug);
  return <ChapterSurface chapter={chapter} prev={prev} next={next} />;
}
