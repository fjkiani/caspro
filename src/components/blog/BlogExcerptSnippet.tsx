'use client';

import BlogMarkdown from '@/components/blog/BlogMarkdown';
import { looksLikeMarkdown } from '@/lib/blog/markdown-heuristics';

interface BlogExcerptSnippetProps {
  text?: string | null;
  /** Approximate visual lines before clipping (overflow hidden). */
  maxLines?: 3 | 4;
  /** Featured card uses slightly larger type than grid cards. */
  size?: 'sm' | 'md';
  className?: string;
}

const maxHeightClass: Record<'sm' | 'md', Record<3 | 4, string>> = {
  sm: { 3: 'max-h-[4.85rem]', 4: 'max-h-[6.35rem]' },
  md: { 3: 'max-h-[5.75rem]', 4: 'max-h-[6.75rem]' },
};

/**
 * Card/list excerpt: render Markdown when the CMS stores `**bold**`, lists, etc.;
 * otherwise plain text with line-clamp.
 */
export default function BlogExcerptSnippet({
  text,
  maxLines = 3,
  size = 'sm',
  className = '',
}: BlogExcerptSnippetProps) {
  const t = typeof text === 'string' ? text.trim() : '';
  if (!t) return null;

  const sizeClass = size === 'md' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed';
  const mh = maxHeightClass[size][maxLines];
  const clamp = maxLines === 4 ? 'line-clamp-4' : 'line-clamp-3';

  if (looksLikeMarkdown(t)) {
    return (
      <div
        className={`not-prose min-w-0 overflow-hidden text-slate-600 dark:text-slate-300 ${mh} ${sizeClass} ${className}`.trim()}
      >
        <BlogMarkdown
          source={t}
          className={`[&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0 ${sizeClass}`}
        />
      </div>
    );
  }

  return (
    <p className={`text-slate-600 dark:text-slate-300 ${sizeClass} ${clamp} ${className}`.trim()}>{t}</p>
  );
}
