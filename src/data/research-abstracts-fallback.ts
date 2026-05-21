/**
 * Local conference abstracts (scraped from Google Scholar).
 * Used when Hygraph `researchAbstracts` is empty or unavailable.
 * Regenerate seed: `node tools/scrape-google-scholar-abstracts.mjs`
 */

import seed from './research-abstracts-seed.json';
import type { ResearchAbstract } from '@/lib/docs/hygraph/research-abstract-types';

function toAbstract(item: (typeof seed.items)[number], index: number): ResearchAbstract {
  return {
    id: `local-${item.slug}`,
    slug: item.slug,
    title: item.title,
    bodyHtml: item.bodyHtml,
    bodyText: item.bodyText,
    link: item.link,
    imageUrl: item.imageUrl,
    authorLine: item.authorLine,
    venue: item.venue,
    year: item.year,
    order: item.order ?? index + 1,
    publishedAt: item.publishedAt,
  };
}

export const RESEARCH_ABSTRACTS_FALLBACK: ResearchAbstract[] = seed.items.map(toAbstract);
