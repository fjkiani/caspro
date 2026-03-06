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
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <span className="text-sm text-slate-500">Use cases</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Use cases</h1>
        <p className="text-slate-600 mb-10">
          How we solved real problems: scientific and engineering narratives from the field.
        </p>

        {withSlug.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <p>No use cases published yet.</p>
            <p className="mt-1 text-sm">Add content in Hygraph (UseCase model) to see them here.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {withSlug.map((uc) => (
              <li key={uc.id}>
                <Link
                  href={`/use-case/${uc.slug}`}
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
                >
                  <h2 className="text-lg font-semibold text-slate-900">{uc.title}</h2>
                  {(uc.resultsHeadline || uc.description) && (
                    <p className="mt-1 text-slate-600 text-sm line-clamp-2">
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
