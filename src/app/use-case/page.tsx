import { Metadata } from 'next';
import Link from 'next/link';
import { getAllUseCasesCms } from '@/lib/docs/hygraph/use-case-queries';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Use cases | CrisPRO.ai',
  description: 'How we solve real problems: scientific and engineering use cases',
};

export default async function UseCaseListPage() {
  const useCases = await getAllUseCasesCms();
  const withSlug = useCases.filter((u) => u.slug);

  return (
    <div className="min-h-screen font-mono bg-gradient-to-br from-white via-slate-50 to-white dark:bg-[#020408] dark:bg-none dark:text-zinc-100 relative">
      <div className="absolute inset-0 pointer-events-none dark:bg-[linear-gradient(to_right,#00E5FF06_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF06_1px,transparent_1px)] dark:bg-[size:48px_48px]" />
      <header className="bg-white/95 dark:bg-zinc-950/80 border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-40 shadow-sm backdrop-blur-md relative">
        <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <span className="text-sm text-slate-500 dark:text-zinc-500">Use cases</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 relative">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-zinc-100 mb-2">Use cases</h1>
        <p className="text-slate-600 dark:text-zinc-400 mb-10">
          How we solved real problems: scientific and engineering narratives from the field.
        </p>

        {withSlug.length === 0 ? (
          <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/60 p-8 text-center text-slate-600 dark:text-zinc-400">
            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-400 dark:text-zinc-600" />
            <p>No use cases published yet.</p>
            <p className="mt-1 text-sm">Add content in Hygraph (UseCase model) to see them here.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {withSlug.map((uc) => (
              <li key={uc.id}>
                <Link
                  href={`/use-case/${uc.slug}`}
                  className="block rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 p-5 shadow-sm hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md transition-all"
                >
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">{uc.title}</h2>
                  {(uc.resultsHeadline || uc.description) && (
                    <p className="mt-1 text-slate-600 dark:text-zinc-400 text-sm line-clamp-2">
                      {uc.resultsHeadline || uc.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
