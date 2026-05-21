'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BookOpen, FileText } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import BlogPageClient from '@/app/blog/BlogPageClient';
import type { PostNode } from '@/types/blog';
import type { CmsUseCase } from '@/lib/docs/hygraph/use-case-types';
import Link from 'next/link';

type Tab = 'articles' | 'manuscripts';

interface ResearchClientProps {
  posts: PostNode[];
  categories: { name: string; slug: string }[];
  manuscripts: CmsUseCase[];
}

export default function ResearchClient({ posts, categories, manuscripts }: ResearchClientProps) {
  const { isDarkMode } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams?.get('tab');
  const [activeTab, setActiveTab] = useState<Tab>(
    tabParam === 'manuscripts' ? 'manuscripts' : 'articles'
  );

  // Sync tab to URL so links are shareable
  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    if (tab === 'manuscripts') {
      params.set('tab', 'manuscripts');
    } else {
      params.delete('tab');
    }
    router.replace(`/research?${params.toString()}`, { scroll: false });
  };

  // Sync if URL changes externally
  useEffect(() => {
    setActiveTab(tabParam === 'manuscripts' ? 'manuscripts' : 'articles');
  }, [tabParam]);

  const withSlug = manuscripts.filter((u) => u.slug);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'}`}>
      {/* Page header */}
      <div className={`sticky top-14 z-40 border-b backdrop-blur-md ${isDarkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/95 border-slate-200'}`}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              CRISPRO · KNOWLEDGE BASE
            </p>
            <h1 className={`text-xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              RESEARCH
            </h1>
          </div>

          {/* Tab pills */}
          <div className={`inline-flex rounded-lg p-1 gap-1 border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100 border-slate-200'}`}>
            <button
              type="button"
              onClick={() => switchTab('articles')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'articles'
                  ? isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-white text-indigo-700 border border-indigo-200 shadow-sm'
                  : isDarkMode
                    ? 'text-zinc-400 hover:text-zinc-200'
                    : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Articles
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                activeTab === 'articles'
                  ? isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-indigo-100 text-indigo-600'
                  : isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-200 text-slate-500'
              }`}>
                {posts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => switchTab('manuscripts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'manuscripts'
                  ? isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-white text-indigo-700 border border-indigo-200 shadow-sm'
                  : isDarkMode
                    ? 'text-zinc-400 hover:text-zinc-200'
                    : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Manuscripts
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                activeTab === 'manuscripts'
                  ? isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-indigo-100 text-indigo-600'
                  : isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-200 text-slate-500'
              }`}>
                {withSlug.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'articles' && (
        <BlogPageClient
          key="research-articles"
          posts={posts}
          categories={categories}
          initialCategory=""
        />
      )}

      {activeTab === 'manuscripts' && (
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
                    href={`/manuscripts/${encodeURIComponent(uc.slug!)}/`}
                    className={`block rounded-xl border p-5 shadow-sm transition-all ${
                      isDarkMode
                        ? 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                      {uc.title}
                    </h2>
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
      )}
    </div>
  );
}
