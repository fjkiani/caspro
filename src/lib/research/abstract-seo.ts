import type { Metadata } from 'next';
import { resolvePublishedAbstractUrl } from '@/data/abstract-published-urls';
import type { ResearchAbstract } from '@/lib/docs/hygraph/research-abstract-types';
import { researchAbstractDetailPath } from '@/lib/research/paths';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://crispro.ai').replace(/\/$/, '');

/** Parsed conference metadata for SEO + JSON-LD. */
export type AbstractSeoMeta = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  authors: string[];
  venue: string | null;
  year: number | null;
  publishedAt: string | null;
  abstractId: string | null;
  canonicalUrl: string;
  externalUrl: string | null;
  imageUrl: string;
};

function parseAuthors(authorLine: string | null): string[] {
  if (!authorLine?.trim()) return ['F Kiani'];
  return authorLine
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean);
}

function parseAbstractId(title: string): string | null {
  const m = title.match(/Abstract\s+([A-Z]{1,3}-?[A-Z]?\d+)/i);
  return m ? m[1].toUpperCase() : null;
}

function buildKeywords(abstract: ResearchAbstract, abstractId: string | null): string[] {
  const base = [
    'CrisPRO',
    'conference abstract',
    'AACR',
    'cancer research',
    'precision oncology',
    'CRISPR',
  ];
  if (abstractId) base.push(abstractId);
  if (abstract.year) base.push(String(abstract.year));
  parseAuthors(abstract.authorLine).forEach((a) => base.push(a));
  if (abstract.venue) {
    base.push(abstract.venue.split(',')[0]?.trim() || abstract.venue);
  }
  const titleTokens = abstract.title
    .toLowerCase()
    .replace(/abstract\s+[a-z0-9-]+:?\s*/i, '')
    .split(/\W+/)
    .filter((w) => w.length > 4)
    .slice(0, 6);
  return [...new Set([...base, ...titleTokens])];
}

/** Extract SEO fields from a conference abstract (Hygraph or local). */
export function extractAbstractSeoMeta(abstract: ResearchAbstract): AbstractSeoMeta {
  const abstractId = parseAbstractId(abstract.title);
  const authors = parseAuthors(abstract.authorLine);
  const venue = abstract.venue?.trim() || null;
  const description =
    abstract.bodyText?.trim() ||
    [abstract.authorLine, venue, abstract.year ? String(abstract.year) : null].filter(Boolean).join(' · ') ||
    abstract.title;

  const canonicalUrl = `${SITE_URL}${researchAbstractDetailPath(abstract.slug)}`;
  const imageUrl =
    abstract.imageUrl || 'https://www.aacr.org/wp-content/uploads/2019/01/AACR-Logo-4C.png';

  return {
    slug: abstract.slug,
    title: abstract.title,
    description: description.slice(0, 320),
    keywords: buildKeywords(abstract, abstractId),
    authors,
    venue,
    year: abstract.year,
    publishedAt: abstract.publishedAt,
    abstractId,
    canonicalUrl,
    externalUrl:
      abstract.link?.trim() ||
      resolvePublishedAbstractUrl({ slug: abstract.slug, title: abstract.title }) ||
      null,
    imageUrl,
  };
}

export function abstractSeoToNextMetadata(meta: AbstractSeoMeta): Metadata {
  const pageTitle = meta.abstractId
    ? `${meta.abstractId}: ${meta.title.replace(/^Abstract\s+[A-Z0-9-]+:?\s*/i, '').slice(0, 72)} | CrisPRO`
    : `${meta.title.slice(0, 80)} | CrisPRO Research`;

  return {
    title: pageTitle,
    description: meta.description,
    keywords: meta.keywords,
    authors: meta.authors.map((name) => ({ name })),
    openGraph: {
      title: pageTitle,
      description: meta.description,
      url: meta.canonicalUrl,
      siteName: 'CrisPRO',
      type: 'article',
      publishedTime: meta.publishedAt || undefined,
      authors: meta.authors,
      images: [{ url: meta.imageUrl, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: meta.description,
      images: [meta.imageUrl],
    },
    alternates: {
      canonical: meta.canonicalUrl,
    },
  };
}

export function abstractScholarlyArticleJsonLd(meta: AbstractSeoMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: meta.title,
    description: meta.description,
    url: meta.canonicalUrl,
    image: meta.imageUrl,
    datePublished: meta.publishedAt || (meta.year ? `${meta.year}-01-01` : undefined),
    author: meta.authors.map((name) => ({ '@type': 'Person', name })),
    isPartOf: meta.venue
      ? { '@type': 'PublicationIssue', name: meta.venue }
      : undefined,
    identifier: meta.abstractId || undefined,
    sameAs: meta.externalUrl || undefined,
    keywords: meta.keywords.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'CrisPRO',
      url: SITE_URL,
    },
  };
}

export function abstractsIndexJsonLd(items: AbstractSeoMeta[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CrisPRO Conference Abstracts',
    description: 'AACR and cancer research conference abstracts from the CrisPRO team.',
    numberOfItems: items.length,
    itemListElement: items.map((meta, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: meta.canonicalUrl,
      name: meta.title,
    })),
  };
}

export function abstractsIndexMetadata(items: AbstractSeoMeta[]): Metadata {
  const count = items.length;
  const description =
    count > 0
      ? `${count} AACR and cancer research conference abstracts — ${items
          .slice(0, 3)
          .map((m) => m.abstractId || m.title.slice(0, 40))
          .join('; ')}.`
      : 'Conference abstracts from AACR and related venues.';

  return {
    title: 'Conference Abstracts | CrisPRO Research',
    description: description.slice(0, 320),
    openGraph: {
      title: 'Conference Abstracts | CrisPRO Research',
      description,
      url: `${SITE_URL}/research/abstracts/`,
      siteName: 'CrisPRO',
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/research/abstracts/`,
    },
  };
}
