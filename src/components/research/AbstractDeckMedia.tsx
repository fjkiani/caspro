'use client';

import BlogPostMedia from '@/components/blog/BlogPostMedia';
import type { ResearchAbstractDeck } from '@/lib/docs/hygraph/research-abstract-types';

/** Conference abstract slide deck / PDF — same viewer as blog posts. */
export default function AbstractDeckMedia({
  title,
  deck,
}: {
  title: string;
  deck: ResearchAbstractDeck;
}) {
  return (
    <BlogPostMedia
      postTitle={title}
      pdfDeck={deck.pdfDeck ?? null}
      pdfDeckUrl={deck.pdfDeckUrl ?? null}
      slideDeckSlug={deck.slideDeckSlug ?? null}
    />
  );
}
