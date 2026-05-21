import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, ChevronLeft } from 'lucide-react';
import { getResearchAbstractBySlug } from '@/lib/docs/hygraph/research-abstract-queries';
import { abstractHasDeck } from '@/lib/docs/hygraph/research-abstract-deck';
import {
  abstractScholarlyArticleJsonLd,
  abstractSeoToNextMetadata,
  extractAbstractSeoMeta,
} from '@/lib/research/abstract-seo';
import { RESEARCH_SECTIONS } from '@/lib/research/paths';
import { JsonLd } from '@/components/SEO/JsonLd';
import ResearchSectionShell from '@/components/research/ResearchSectionShell';
import AbstractDeckMedia from '@/components/research/AbstractDeckMedia';

export const dynamic = 'force-dynamic';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await getResearchAbstractBySlug(params.slug);
  if (!resolved) {
    return { title: 'Abstract not found | CrisPRO Research' };
  }
  return abstractSeoToNextMetadata(extractAbstractSeoMeta(resolved.item));
}

export default async function ResearchAbstractDetailPage({ params }: Props) {
  const resolved = await getResearchAbstractBySlug(params.slug);
  if (!resolved) notFound();

  const { item } = resolved;
  const seo = extractAbstractSeoMeta(item);
  const imgSrc = item.imageUrl || seo.imageUrl;
  const showDeck = abstractHasDeck(item.deck);

  return (
    <ResearchSectionShell
      chrome={{
        section: 'abstracts',
        backHref: RESEARCH_SECTIONS.abstracts,
        backLabel: 'All abstracts',
      }}
    >
      <JsonLd data={abstractScholarlyArticleJsonLd(seo)} />
      <article className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">
          {seo.abstractId && <span className="text-cyan-600 dark:text-cyan-400">{seo.abstractId}</span>}
          {seo.year && <span>{seo.year}</span>}
          {seo.venue && <span className="normal-case font-medium tracking-normal">{seo.venue}</span>}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-slate-900 dark:text-zinc-50 mb-4">
          {item.title}
        </h1>

        {seo.authors.length > 0 && (
          <p className="text-base text-slate-600 dark:text-zinc-400 mb-6">{seo.authors.join(', ')}</p>
        )}

        {showDeck && item.deck ? (
          <div className="mb-10">
            <AbstractDeckMedia title={item.title} deck={item.deck} />
          </div>
        ) : (
          <a
            href={item.aacrImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mb-8 block rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden bg-slate-50 dark:bg-zinc-900 h-40"
            aria-label="Open on AACR"
          >
            <img src={imgSrc} alt="" className="w-full h-full object-contain p-6" />
          </a>
        )}

        {item.bodyHtml ? (
          <div
            className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-zinc-300 mb-8"
            dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
          />
        ) : item.bodyText ? (
          <p className="text-slate-700 dark:text-zinc-300 mb-8 leading-relaxed">{item.bodyText}</p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              View published abstract
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : null}
          <Link
            href={RESEARCH_SECTIONS.abstracts}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-zinc-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to abstracts
          </Link>
        </div>
      </article>
    </ResearchSectionShell>
  );
}
