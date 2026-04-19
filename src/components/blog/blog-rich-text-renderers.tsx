import type { ReactNode } from 'react';
import type { NodeRendererType } from '@graphcms/rich-text-react-renderer';

const wrap =
  'min-w-0 max-w-full break-words [overflow-wrap:anywhere] [word-break:break-word]';

/**
 * Overrides Hygraph defaults (notably `code_block` uses `white-space: pre` + `overflow-x: auto`).
 */
export const blogRichTextRenderers: Partial<NodeRendererType> = {
  p: ({ children }: { children?: ReactNode }) => (
    <p className={`my-4 leading-relaxed text-slate-700 dark:text-slate-300 ${wrap}`}>{children}</p>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote
      className={`my-6 border-l-4 border-cyan-500/80 bg-cyan-50/40 px-4 py-2 italic text-slate-800 dark:bg-cyan-950/20 dark:text-slate-200 ${wrap}`}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className={`my-4 list-disc pl-6 text-slate-700 dark:text-slate-300 ${wrap}`}>{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className={`my-4 list-decimal pl-6 text-slate-700 dark:text-slate-300 ${wrap}`}>{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className={`my-1 leading-relaxed ${wrap}`}>{children}</li>
  ),
  code_block: ({ children }: { children?: ReactNode }) => (
    <pre
      className={`my-6 overflow-x-hidden whitespace-pre-wrap rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-100 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 ${wrap}`}
    >
      {children}
    </pre>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded bg-slate-200/80 px-1 py-0.5 font-mono text-[0.9em] text-slate-900 dark:bg-zinc-800 dark:text-slate-100">
      {children}
    </code>
  ),
};
