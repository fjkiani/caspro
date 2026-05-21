'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import type { CmsUseCase } from '@/lib/docs/hygraph/use-case-types';
import { researchManuscriptPath } from '@/lib/research/paths';

export default function ManuscriptsListing({ manuscripts }: { manuscripts: CmsUseCase[] }) {
  const { isDarkMode } = useTheme();
  const withSlug = manuscripts.filter((u) => u.slug);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 font-mono">
   
      {withSlug.length === 0 ? (
        <div className={`rounded-xl border p-8 text-center ${isDarkMode ? 'border-zinc-800 bg-zinc-950/60 text-zinc-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>No manuscripts published yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {withSlug.map((uc) => (
            <li key={uc.id}>
              <Link
                href={researchManuscriptPath(uc.slug!)}
                prefetch
                className={`block rounded-xl border p-5 shadow-sm transition-all ${
                  isDarkMode
                    ? 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>{uc.title}</h2>
                {(uc.resultsHeadline || uc.description) && (
                  <p className={`mt-1 text-sm line-clamp-2 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                    {uc.resultsHeadline || uc.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
