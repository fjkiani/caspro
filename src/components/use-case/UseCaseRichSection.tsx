'use client';

import type { UseCaseRichText } from '@/lib/docs/hygraph/use-case-types';
import { useTheme } from '@/context/ThemeContext';

interface UseCaseRichSectionProps {
  title: string;
  content?: UseCaseRichText | null;
  className?: string;
}

export default function UseCaseRichSection({ title, content, className = '' }: UseCaseRichSectionProps) {
  const { isDarkMode } = useTheme();
  const html = content?.html?.trim();
  const text = content?.text?.trim();
  if (!html && !text) return null;

  return (
    <section className={`rounded border p-5 ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200'} ${className}`}>
      <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>{title}</h2>
      {html ? (
        <div
          className={`prose max-w-none prose-img:rounded-lg ${isDarkMode ? 'prose-invert prose-a:text-cyan-400' : 'prose-slate prose-a:text-indigo-600'}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : text ? (
        <p className={`${isDarkMode ? 'text-zinc-300' : 'text-slate-700'} whitespace-pre-wrap`}>{text}</p>
      ) : null}
    </section>
  );
}
