'use client';

import Link from 'next/link';
import moment from 'moment';
import { ChevronRight, Layers } from 'lucide-react';
import type { PostNode } from '@/types/blog';
import { seriesPartIndex } from '@/lib/blog/series-grouping';
import { researchBlogPostPath } from '@/lib/research/paths';

export type BlogSeriesBlockProps = {
  displayName: string;
  posts: PostNode[];
};

export default function BlogSeriesBlock({ displayName, posts }: BlogSeriesBlockProps) {
  if (posts.length < 2) return null;

  return (
    <section className="mb-14 not-prose">
      <div className="rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/[0.06] via-slate-50 to-white dark:from-cyan-500/10 dark:via-slate-900/80 dark:to-slate-900/40 dark:border-cyan-500/20 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
              <Layers className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-400 mb-1">
                Series · {posts.length} parts
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {displayName}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                Read in order — each part builds on the last.
              </p>
            </div>
          </div>
        </div>

        <ol className="space-y-0 border border-slate-200/80 dark:border-slate-700/80 rounded-xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-700 bg-white/80 dark:bg-slate-950/50">
          {posts.map((post) => {
            const part = seriesPartIndex(post);
            return (
              <li key={post.slug}>
                <Link
                  href={researchBlogPostPath(post.slug)}
                  className="group flex flex-col sm:flex-row sm:items-stretch gap-4 p-4 sm:p-5 hover:bg-cyan-500/[0.07] dark:hover:bg-cyan-500/10 transition-colors"
                >
                  <div className="flex shrink-0 items-center gap-3 sm:w-44">
                    <span className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-md bg-slate-900 text-xs font-black text-white dark:bg-cyan-500/20 dark:text-cyan-200 border border-slate-700 dark:border-cyan-500/30">
                      Part {part}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {moment(post.createdAt).format('MMM D, YYYY')}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 gap-4">
                    <div className="hidden sm:block w-28 sm:w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
                      {post.featuredImage?.url ? (
                        <img
                          src={post.featuredImage.url}
                          alt=""
                          className="h-full w-full object-cover aspect-[4/3] max-h-20 sm:max-h-24 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex h-20 items-center justify-center bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-400 px-1 text-center">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="mt-2 inline-flex items-center text-sm font-semibold text-cyan-700 dark:text-cyan-400">
                        Read part {part}
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
