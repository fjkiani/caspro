'use client';

/**
 * SynthesisReport.tsx
 * -------------------
 * Renders the final Llama 3.3 70B client report from the LangGraph synthesis node.
 *
 * Stolen from open-seo:
 *   - MarkdownAnswer component — full MARKDOWN_COMPONENTS override map
 *   - extractThinkingBlocks() — strips <think>...</think> from Nemotron output
 *   - normalizeLlmMarkdown() — fixes malformed list markers from LLM output
 *   - ThinkingBlock — collapsible reasoning display
 *   - SafeAnchor — sanitizes href to http(s) only
 *   - Collapse/expand with gradient fade for long reports
 *
 * Adapted to:
 *   - caspro's black/gray-900 design system
 *   - Shows routing_path + loop_counter as audit metadata header
 *   - Download as markdown button
 */

import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  CheckCircle,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
  report: string;
  domain: string;
  routingPath: string[];
  loopCounter: number;
}

// ---------------------------------------------------------------------------
// Stolen verbatim from open-seo MarkdownAnswer
// ---------------------------------------------------------------------------

function extractThinkingBlocks(text: string): {
  thinking: string[];
  body: string;
} {
  const thinking: string[] = [];
  let body = text;

  body = body.replace(/<think>([\s\S]*?)<\/think>/gi, (_, inner: string) => {
    thinking.push(inner.trim());
    return '';
  });

  body = body.replace(/<think>([\s\S]*)$/i, (_, inner: string) => {
    thinking.push(inner.trim());
    return '';
  });

  return { thinking, body };
}

function normalizeLlmMarkdown(text: string): string {
  return text.replace(
    /^([ \t]*)([-*+]|\d+\.)[ \t]*\r?\n[ \t]*\r?\n(?=\S)(?![ \t]*(?:[-*+]|\d+\.)[ \t])/gm,
    '$1$2 ',
  );
}

function isHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    if (url.username || url.password) return false;
    return true;
  } catch {
    return false;
  }
}

function SafeAnchor({ href, children, ...rest }: ComponentPropsWithoutRef<'a'>) {
  const safeHref = isHttpUrl(href) ? href : undefined;
  if (!safeHref) {
    return <span className="underline decoration-dotted">{children}</span>;
  }
  return (
    <a
      {...rest}
      href={safeHref}
      target="_blank"
      rel="noreferrer"
      className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2"
    >
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Markdown component overrides — adapted to caspro dark theme
// ---------------------------------------------------------------------------

const MARKDOWN_COMPONENTS = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="mt-6 mb-3 text-xl font-bold text-white first:mt-0 border-b border-gray-800 pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mt-5 mb-2 text-base font-semibold text-white first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-4 mb-1.5 text-sm font-semibold text-gray-200 first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: ReactNode }) => (
    <h4 className="mt-3 mb-1 text-sm font-semibold text-gray-300 first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="my-2 text-gray-300 leading-relaxed first:mt-0 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-2 ml-5 list-disc space-y-1 text-gray-300">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-2 ml-5 list-decimal space-y-1 text-gray-300">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  a: SafeAnchor,
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="italic text-gray-300">{children}</em>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-3 border-l-2 border-yellow-500/50 pl-4 text-gray-400 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-4 border-gray-800" />,
  code: ({ children, className }: ComponentPropsWithoutRef<'code'>) => {
    if (typeof className === 'string' && className.startsWith('language-')) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-xs font-mono text-yellow-300">
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="my-3 overflow-x-auto rounded-lg bg-gray-950 border border-gray-800 p-4 text-xs font-mono text-gray-300">
      {children}
    </pre>
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="bg-gray-800/60">{children}</thead>
  ),
  tbody: ({ children }: { children?: ReactNode }) => (
    <tbody className="divide-y divide-gray-800">{children}</tbody>
  ),
  tr: ({ children }: { children?: ReactNode }) => (
    <tr className="hover:bg-gray-800/30 transition-colors">{children}</tr>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="px-4 py-2.5 text-gray-300 align-top">{children}</td>
  ),
};

// ---------------------------------------------------------------------------
// Routing path display
// ---------------------------------------------------------------------------

const NODE_LABELS: Record<string, string> = {
  'supervisor:spa_critical':  'SPA Critical',
  'supervisor:low_authority': 'Authority Gap',
  'supervisor:content_gap':   'Content Gap',
  'supervisor:synthesize':    'Direct Synthesis',
  'crawlability_fix':         'Crawlability Fix',
  'authority_gap':            'Authority Plan',
  'content_gap':              'Content Plan',
  'strategy':                 'Strategy',
  'synthesis':                'Synthesis',
};

function RoutingPathBadges({ path }: { path: string[] }) {
  if (path.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {path.map((node, i) => (
        <span
          key={`${node}-${i}`}
          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-gray-400"
        >
          {i > 0 && <span className="text-gray-600">→</span>}
          {NODE_LABELS[node] ?? node}
        </span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const COLLAPSED_MAX_PX = 600;

export function SynthesisReport({ report, domain, routingPath, loopCounter }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [needsCollapse, setNeedsCollapse] = useState(false);

  const { thinking, body } = extractThinkingBlocks(report);
  const normalized = normalizeLlmMarkdown(body);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setNeedsCollapse(el.scrollHeight > COLLAPSED_MAX_PX + 8);
  }, [normalized]);

  function handleDownload() {
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-report-${domain}-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const isCollapsed = needsCollapse && !expanded;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">

      {/* ── Report Header ─────────────────────────────────────────────── */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-400" />
              <h2 className="text-white font-semibold">SEO Intelligence Report</h2>
            </div>
            <p className="text-gray-500 text-xs">
              {domain} · {new Date().toLocaleDateString()} · {loopCounter} supervisor loop{loopCounter !== 1 ? 's' : ''}
            </p>
            <RoutingPathBadges path={routingPath} />
          </div>
          <button
            onClick={handleDownload}
            className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Download className="size-3.5" />
            Download .md
          </button>
        </div>
      </div>

      {/* ── Thinking blocks (if Nemotron emitted <think> tags) ────────── */}
      {thinking.length > 0 && (
        <div className="px-6 pt-4 space-y-2">
          {thinking.map((block, i) => (
            <details
              key={i}
              className="group rounded-lg border border-gray-800 bg-gray-950/40"
            >
              <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-300">
                <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
                Model Thinking
              </summary>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words border-t border-gray-800 bg-gray-950/60 px-3 py-2.5 text-xs font-mono text-gray-500">
                {block}
              </pre>
            </details>
          ))}
        </div>
      )}

      {/* ── Report Body ───────────────────────────────────────────────── */}
      <div className="px-6 py-5">
        {normalized.trim().length > 0 ? (
          <div className="relative">
            <div
              ref={contentRef}
              style={isCollapsed ? { maxHeight: `${COLLAPSED_MAX_PX}px` } : undefined}
              className={isCollapsed ? 'overflow-hidden' : undefined}
            >
              <div className="text-sm leading-relaxed">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={MARKDOWN_COMPONENTS}
                >
                  {normalized}
                </Markdown>
              </div>
            </div>

            {isCollapsed && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"
              />
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FileText className="size-4" />
            Report is empty.
          </div>
        )}

        {needsCollapse && (
          <button
            type="button"
            onClick={() => setExpanded(prev => !prev)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? (
              <><ChevronUp className="size-3.5" /> Show less</>
            ) : (
              <><ChevronDown className="size-3.5" /> Read full report</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
