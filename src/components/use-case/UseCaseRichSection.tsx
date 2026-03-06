'use client';

import type { UseCaseRichText } from '@/lib/docs/hygraph/use-case-types';

interface UseCaseRichSectionProps {
  title: string;
  content?: UseCaseRichText | null;
  className?: string;
}

export default function UseCaseRichSection({ title, content, className = '' }: UseCaseRichSectionProps) {
  const html = content?.html?.trim();
  const text = content?.text?.trim();
  if (!html && !text) return null;

  return (
    <section className={className}>
      <h2 className="text-xl font-semibold text-slate-900 mb-3">{title}</h2>
      {html ? (
        <div
          className="prose prose-slate max-w-none prose-p:text-slate-700 prose-headings:text-slate-900 prose-a:text-blue-600 prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : text ? (
        <p className="text-slate-700 whitespace-pre-wrap">{text}</p>
      ) : null}
    </section>
  );
}
