'use client';

import { FileText, ExternalLink } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import type { ResearchAbstract } from '@/lib/docs/hygraph/research-abstract-types';

export default function AbstractsListing({ abstracts }: { abstracts: ResearchAbstract[] }) {
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
    ? 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
    : 'border-slate-200 bg-white hover:border-slate-300';

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <p className={`text-base mb-8 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
        AACR and conference abstracts with links to full text and citations.
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {abstracts.map((ab) => {
          const imgSrc = ab.imageUrl || 'https://www.aacr.org/wp-content/uploads/2019/01/AACR-Logo-4C.png';
          const summary = ab.bodyText || [ab.authorLine, ab.venue].filter(Boolean).join(' · ');
          const yearLabel = ab.year ? String(ab.year) : null;

          return (
            <li key={ab.id} className={`rounded-xl border overflow-hidden shadow-sm transition-all hover:shadow-md ${cardClass}`}>
              <div className={`relative h-36 ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`}>
                <img src={imgSrc} alt="" className="w-full h-full object-contain p-4" />
                {yearLabel && (
                  <span
                    className={`absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                      isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-900 text-white'
                    }`}
                  >
                    {yearLabel}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h2 className={`text-base font-semibold leading-snug ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                  {ab.title}
                </h2>
                {summary && (
                  <p className={`text-sm line-clamp-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{summary}</p>
                )}
                {ab.link && (
                  <a
                    href={ab.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-auto"
                  >
                    View abstract
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
