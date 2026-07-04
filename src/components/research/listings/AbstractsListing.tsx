'use client';

import Link from 'next/link';
import { FileText, ExternalLink, ArrowRight, Presentation } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import type { ResearchAbstract } from '@/lib/docs/hygraph/research-abstract-types';
import { abstractHasDeck } from '@/lib/docs/hygraph/research-abstract-deck';
import { researchAbstractHref } from '@/lib/research/paths';

export default function AbstractsListing({
  abstracts,
  source,
}: {
  abstracts: ResearchAbstract[];
  source?: 'hygraph' | 'local';
}) {
  const { isDarkMode } = useTheme();

  if (abstracts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <FileText className={`w-12 h-12 mx-auto mb-3 opacity-40 ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`} />
        <p className={`text-lg ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>No conference abstracts yet.</p>
      </div>
    );
  }

  const cardClass = isDarkMode
    ? 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-600'
    : 'border-slate-200 bg-white hover:border-slate-300';

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <p className={`text-base ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
          AACR and conference abstracts — open slides on-site or the published citation.
        </p>
        {source && (
          <span
            className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
              source === 'hygraph'
                ? isDarkMode
                  ? 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10'
                  : 'border-cyan-600/30 text-cyan-800 bg-cyan-50'
                : isDarkMode
                  ? 'border-amber-500/40 text-amber-200 bg-amber-500/10'
                  : 'border-amber-600/30 text-amber-900 bg-amber-50'
            }`}
          >
            {source === 'hygraph' ? 'Hygraph CMS' : 'Local seed'}
          </span>
        )}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {abstracts.map((ab) => {
          const hasDeck = abstractHasDeck(ab.deck);
          const publishedUrl = ab.link?.trim() || null;
          const cardHref = researchAbstractHref(ab.slug, publishedUrl, hasDeck);
          const imageHref = ab.aacrImageUrl;
          const imgSrc = ab.imageUrl || 'https://www.aacr.org/wp-content/uploads/2019/01/AACR-Logo-4C.png';
          const summary = ab.bodyText || [ab.authorLine, ab.venue].filter(Boolean).join(' · ');
          const yearLabel = ab.year ? String(ab.year) : null;
          const conferenceId = ab.conferenceId;

          return (
            <li key={ab.id} id={ab.slug} className="scroll-mt-24">
              <article
                className={`rounded-xl border overflow-hidden shadow-sm transition-all hover:shadow-md ${cardClass}`}
              >
                <div className={`relative h-36 ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`}>
                  <a
                    href={imageHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full w-full"
                    aria-label="View abstract on AACR journals"
                  >
                    <img src={imgSrc} alt="" className="w-full h-full object-contain p-4" />
                  </a>
                  {conferenceId && (
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded pointer-events-none ${
                        isDarkMode ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-cyan-600 text-white'
                      }`}
                    >
                      {conferenceId}
                    </span>
                  )}
                  {yearLabel && (
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded pointer-events-none ${
                        isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-900 text-white'
                      }`}
                    >
                      {yearLabel}
                    </span>
                  )}
                  {hasDeck && (
                    <span
                      className={`absolute left-3 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-indigo-600 text-white pointer-events-none ${
                        conferenceId ? 'top-11' : 'top-3'
                      }`}
                    >
                      <Presentation className="w-3 h-3" />
                      Slides
                    </span>
                  )}
                </div>
                <Link href={cardHref} className="block p-5 flex flex-col gap-3">
                  <h2 className={`text-base font-semibold leading-snug ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                    {ab.title}
                  </h2>
                  {summary && (
                    <p className={`text-sm line-clamp-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{summary}</p>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                        isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                      }`}
                    >
                      {hasDeck ? 'View slides' : 'Read abstract'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    {publishedUrl && (
                      <a
                        href={publishedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? 'text-zinc-400 hover:text-cyan-300' : 'text-slate-500 hover:text-indigo-600'
                        }`}
                      >
                        Published
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
