'use client';

// ============================================================================
// <ChaptersIndex/> — list of the 9 research chapters at /research/chapters/.
// Long-form list layout, not a no-scroll surface.
// ============================================================================

import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { CHAPTERS } from '@/data/chapters-index';

export default function ChaptersIndex() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const surface = isDark ? 'bg-black text-white' : 'bg-[#FAF9F3] text-black';
  const muted = isDark ? 'text-white/70' : 'text-black/70';
  const border = isDark ? 'border-white/10' : 'border-black/10';
  const chip = isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-black/5 border-black/10 text-black/70';

  return (
    <div className={`min-h-screen ${surface}`}>
      <ZetaNavbar />
      <header className={`border-b ${border}`}>
        <div className="mx-auto max-w-4xl px-6 pt-10 pb-8">
          <Link
            href="/research/"
            className={`inline-flex items-center gap-1 text-xs uppercase tracking-widest ${muted} hover:opacity-100 opacity-80`}
          >
            <ChevronLeft className="h-3 w-3" /> Research hub
          </Link>
          <div className={`mt-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest ${chip}`}>
            <BookOpen className="h-3 w-3" /> Research chapters
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-normal leading-tight tracking-tight">
            The mechanism-alignment layer, in nine chapters.
          </h1>
          <p className={`mt-3 text-lg ${muted}`}>
            Public science: BRCA/PARP, DepMap, CIViC, ClinicalTrials.gov, PMID-cited evidence. No caspro client trials, no asset names, no partner names.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <ol className="space-y-4">
          {CHAPTERS.map((ch) => (
            <li key={ch.slug}>
              <Link
                href={`/research/chapters/${ch.slug}/`}
                className={`group block rounded-xl border ${border} p-6 hover:opacity-95 transition`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Chapter {ch.order} · {ch.readMinutes} min read</div>
                    <h2 className="mt-2 text-2xl font-normal tracking-tight">{ch.title}</h2>
                    <p className={`mt-2 text-sm ${muted}`}>{ch.subtitle}</p>
                    {ch.publicAnchors.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {ch.publicAnchors.slice(0, 3).map((a) => (
                          <span key={a} className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${chip}`}>
                            {a}
                          </span>
                        ))}
                        {ch.publicAnchors.length > 3 && (
                          <span className={`text-[10px] uppercase tracking-widest ${muted}`}>
                            + {ch.publicAnchors.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <ArrowRight className={`h-5 w-5 flex-none mt-2 ${muted} group-hover:translate-x-0.5 transition`} />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
