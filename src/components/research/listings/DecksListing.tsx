'use client';

import Link from 'next/link';
import { Presentation, ExternalLink, Download } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { researchBlogPostPath } from '@/lib/research/paths';

export type DeckMediaItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  deckSlug?: string | null;
  deckId?: string | null;
  pdfFile?: { url: string; fileName?: string | null; mimeType?: string | null } | null;
  thumbnail?: { url: string } | null;
  featuredImage?: { url: string } | null;
  isPublished: boolean;
  type: string;
};

export default function DecksListing({ deckPosts }: { deckPosts: DeckMediaItem[] }) {
  const { isDarkMode } = useTheme();

  if (deckPosts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Presentation className={`w-12 h-12 mx-auto mb-3 opacity-40 ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`} />
        <p className={`text-lg ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>No decks published yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <p className={`text-base mb-8 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
        Slide decks and programmatic posters from the research team.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deckPosts.map((deck) => {
          const fileUrl = deck.pdfFile?.url || null;
          const mimeType = deck.pdfFile?.mimeType || '';
          const isImage = mimeType.startsWith('image/');
          const isPdf = mimeType === 'application/pdf';
          const thumbUrl = deck.thumbnail?.url || deck.featuredImage?.url || (isImage ? fileUrl : null);
          const badgeLabel = deck.deckSlug ? 'Slides' : isPdf ? 'PDF' : isImage ? 'Preview' : 'Deck';
          const badgeColor = deck.deckSlug ? 'bg-indigo-600' : isPdf ? 'bg-cyan-600' : 'bg-slate-600';

          return (
            <div
              key={deck.id}
              className={`group rounded-xl border overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all ${
                isDarkMode
                  ? 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-600'
                  : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <Link href={researchBlogPostPath(deck.slug)} prefetch className="block">
                <div className={`relative overflow-hidden ${thumbUrl ? 'h-48' : 'h-32'} bg-slate-100 dark:bg-zinc-900`}>
                  {thumbUrl ? (
                    <img
                      src={thumbUrl}
                      alt={deck.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <Presentation className={`w-10 h-10 opacity-30 ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded text-white ${badgeColor}`}>
                      {badgeLabel}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex flex-col flex-grow p-4">
                <h3 className={`text-sm font-bold leading-snug mb-2 ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                  <Link href={researchBlogPostPath(deck.slug)} prefetch className="hover:underline">
                    {deck.title}
                  </Link>
                </h3>
                {deck.excerpt && (
                  <p className={`text-xs line-clamp-2 mb-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{deck.excerpt}</p>
                )}
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <Link
                    href={researchBlogPostPath(deck.slug)}
                    prefetch
                    className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-2 rounded-lg border ${
                      isDarkMode ? 'border-zinc-700 text-zinc-200' : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    View deck
                  </Link>
                  {fileUrl && (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-2 rounded-lg border ${
                        isDarkMode ? 'border-zinc-700 text-zinc-200' : 'border-slate-300 text-slate-700'
                      }`}
                    >
                      {isPdf ? <Download className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                      {isPdf ? 'PDF' : 'Open'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
