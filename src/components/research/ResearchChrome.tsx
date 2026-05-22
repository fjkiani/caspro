'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  RESEARCH_HUB,
  RESEARCH_SECTION_LABELS,
  RESEARCH_SECTIONS,
  type ResearchSectionId,
} from '@/lib/research/paths';

export type ResearchChromeProps = {
  /** Current section (omit on hub). */
  section?: ResearchSectionId;
  /** Optional leaf label (e.g. post title on detail pages). */
  leafLabel?: string;
  backHref?: string;
  backLabel?: string;
  /** Hub uses a larger title block; sections use compact header. */
  variant?: 'hub' | 'section';
  /** Section index page title (e.g. CrisPRO Blog). */
  sectionTitle?: string;
  sectionDescription?: string;
};

export default function ResearchChrome({
  section,
  leafLabel,
  backHref,
  backLabel,
  variant = section ? 'section' : 'hub',
  sectionTitle,
  sectionDescription,
}: ResearchChromeProps) {
  const { isDarkMode } = useTheme();
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-400';
  const text = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const link = isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-indigo-600 hover:text-indigo-800';

  return (
    <header
      className={`border-b backdrop-blur-md sticky top-14 z-30 ${
        isDarkMode ? 'bg-zinc-950/95 border-zinc-800' : 'bg-white/95 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
        <p className={`text-[9px] font-black uppercase tracking-[0.4em] mb-2 ${muted}`}>
          CRISPRO · KNOWLEDGE BASE
        </p>

        <nav aria-label="Research" className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-black uppercase tracking-widest ${muted}`}>
          <Link href={RESEARCH_HUB} className={`${link} transition-colors`}>
            Research
          </Link>
          {section ? (
            <>
              <span aria-hidden className="opacity-50">
                /
              </span>
              {leafLabel ? (
                <>
                  <Link href={RESEARCH_SECTIONS[section]} className={`${link} transition-colors`}>
                    {RESEARCH_SECTION_LABELS[section]}
                  </Link>
                  <span aria-hidden className="opacity-50">
                    /
                  </span>
                  <span className={`truncate max-w-[min(100%,20rem)] ${text}`} title={leafLabel}>
                    {leafLabel}
                  </span>
                </>
              ) : (
                <span className={text}>{RESEARCH_SECTION_LABELS[section]}</span>
              )}
            </>
          ) : null}
        </nav>

        {variant === 'hub' ? (
          <h1 className={`mt-3 text-2xl md:text-3xl font-black uppercase tracking-tight ${text}`}>Research</h1>
        ) : null}

        {sectionTitle && !leafLabel ? (
          <div className="mt-3 md:mt-4">
            <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-tight ${text}`}>{sectionTitle}</h1>
            {sectionDescription ? (
              <p className={`mt-2 text-sm md:text-base max-w-3xl ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                {sectionDescription}
              </p>
            ) : null}
          </div>
        ) : null}

        {backHref && backLabel ? (
          <Link
            href={backHref}
            className={`mt-4 inline-flex items-center text-sm font-semibold ${link} transition-colors group`}
          >
            <ChevronLeft className="mr-1.5 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            {backLabel}
          </Link>
        ) : null}
      </div>
    </header>
  );
}
