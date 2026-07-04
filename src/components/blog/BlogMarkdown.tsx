'use client';

import type { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { normalizeBlogMarkdownSource } from '@/lib/blog/normalize-blog-markdown';

function tryPrettifyJson(raw: string): string {
  const t = raw.trim();
  if (!t.startsWith('{') && !t.startsWith('[')) return raw;
  try {
    return JSON.stringify(JSON.parse(t), null, 2);
  } catch {
    return raw;
  }
}

const mdComponents = {
  // Downgrade markdown `#` to <h2> — the page already renders <h1>{post.title}</h1>,
  // so allowing markdown to emit another <h1> creates a double-H1 (flagged by audit).
  h1: (props: ComponentProps<'h2'>) => (
    <h2 className="mt-2 mb-6 text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2
      className="scroll-mt-24 mt-10 mb-4 border-b border-slate-200 pb-2 text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100 dark:border-zinc-700"
      {...props}
    />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="scroll-mt-24 mt-8 mb-3 text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100" {...props} />
  ),
  h4: (props: ComponentProps<'h4'>) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p
      className="my-4 min-w-0 max-w-full break-words leading-relaxed text-slate-700 [overflow-wrap:anywhere] [word-break:break-word] dark:text-slate-300"
      {...props}
    />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="my-4 list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="my-4 list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li className="leading-relaxed [&>p]:my-1" {...props} />
  ),
  a: (props: ComponentProps<'a'>) => (
    <a
      className="text-cyan-700 underline-offset-4 hover:underline dark:text-cyan-400"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-4 border-cyan-500/80 bg-cyan-50/40 px-4 py-2 italic text-slate-800 dark:bg-cyan-950/20 dark:text-slate-200"
      {...props}
    />
  ),
  code: ({ className, children, ...rest }: ComponentProps<'code'>) => {
    const raw = Array.isArray(children) ? children.join('') : String(children);
    const isLangBlock = typeof className === 'string' && className.startsWith('language-');
    const denseLine = raw.length > 180 && (raw.match(/\s/g) || []).length < 8;
    const treatAsBlock = isLangBlock || raw.includes('\n') || denseLine;
    if (treatAsBlock) {
      const body = raw.replace(/\n$/, '');
      const lang = (className ?? '').startsWith('language-')
        ? (className ?? '').slice('language-'.length).toLowerCase()
        : '';
      const display = lang === 'json' ? tryPrettifyJson(body) : body;
      return (
        <code
          className={`${className ?? ''} block min-w-0 max-w-full whitespace-pre-wrap break-words bg-transparent p-0 text-left font-mono text-inherit [overflow-wrap:anywhere] [word-break:break-word]`.trim()}
          {...rest}
        >
          {display}
        </code>
      );
    }
    return (
      <code
        className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.92em] text-slate-800 dark:bg-zinc-800 dark:text-slate-100"
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: (props: ComponentProps<'pre'>) => (
    <pre
      className="my-6 min-w-0 max-w-full overflow-x-hidden whitespace-pre-wrap break-words rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-100 shadow-sm dark:bg-zinc-950 [overflow-wrap:anywhere] [word-break:break-word]"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-slate-300 dark:border-zinc-700" />,
  table: (props: ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-zinc-700">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th className="bg-slate-50 px-3 py-2 font-semibold text-slate-900 dark:bg-zinc-900 dark:text-slate-100" {...props} />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border-t border-slate-200 px-3 py-2 text-slate-700 dark:border-zinc-800 dark:text-slate-300" {...props} />
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="font-semibold text-slate-900 dark:text-slate-100" {...props} />
  ),
};

interface BlogMarkdownProps {
  source: string;
  className?: string;
}

/**
 * Renders a Markdown string with article styling. Used for blog bodies that come
 * out of Hygraph as Markdown (or contain Markdown syntax inside `raw` / `text`).
 *
 * NOTE: This is intentionally separate from the Slate `RichText` renderer used
 * for non-Markdown posts so each path can keep its own styling guarantees.
 */
export default function BlogMarkdown({ source, className = '' }: BlogMarkdownProps) {
  const t = normalizeBlogMarkdownSource(source ?? '');
  if (!t) return null;
  return (
    <div
      className={`min-w-0 max-w-full font-sans text-base text-slate-700 dark:text-slate-300 ${className}`.trim()}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {t}
      </ReactMarkdown>
    </div>
  );
}
