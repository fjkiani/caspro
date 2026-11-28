'use client';

/**
 * One Ask client: chat grounded in this notebook's report / FAQ / captions / table.
 * Calls /api/notebook/ask (RAG-lite). Degrades to FAQ-only when LLM keys missing.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import {
  parseFaqItems,
  type NotebookBundleData,
} from '@/lib/blog/notebooklm-adapters';
import {
  buildNotebookAskContext,
  notebookAskSuggestionQuestions,
} from '@/lib/blog/notebook-ask-context';

export interface BlogNotebookAskProps {
  bundle: NotebookBundleData;
  reportMarkdown?: string | null;
  reportText?: string | null;
  reportRaw?: unknown;
  captions?: { title?: string; body: string }[] | null;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: 'llm' | 'faq' | 'empty' | 'error';
}

export default function BlogNotebookAsk({
  bundle,
  reportMarkdown,
  reportText,
  reportRaw,
  captions,
}: BlogNotebookAskProps) {
  const faqs = useMemo(() => parseFaqItems(bundle.faqJson), [bundle.faqJson]);
  const suggestions = useMemo(
    () => notebookAskSuggestionQuestions(bundle),
    [bundle],
  );
  const grounding = useMemo(
    () =>
      buildNotebookAskContext({
        bundle,
        reportMarkdown,
        reportText,
        reportRaw,
        captions,
      }),
    [bundle, reportMarkdown, reportText, reportRaw, captions],
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Ask anything about this notebook — answers are grounded in the report, FAQ, captions, and metrics for this post.',
      mode: 'llm',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, loading]);

  const send = async (text: string) => {
    const query = text.trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: query,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/notebook/ask/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          context: grounding,
          title: bundle.title,
          faq: faqs,
          conversationHistory: history,
        }),
      });

      const data = await res.json().catch(() => ({}));
      const answer =
        (typeof data.answer === 'string' && data.answer) ||
        (typeof data.message === 'string' && data.message) ||
        'I could not generate a response.';

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: answer,
          mode: data.mode || (res.ok ? 'llm' : 'error'),
        },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          content: `Ask failed: ${msg}`,
          mode: 'error',
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col px-4 py-3 sm:px-6">
      <div className="mb-3 shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
          Ask
        </p>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
          Questions about this notebook
        </h3>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pb-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[95%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
              m.role === 'user'
                ? 'ml-auto bg-sky-600 text-white'
                : 'mr-auto border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'
            }`}
          >
            {m.content}
            {m.role === 'assistant' && m.mode && m.mode !== 'llm' ? (
              <p className="mt-1 text-[10px] uppercase tracking-wide opacity-60">
                {m.mode === 'faq'
                  ? 'Matched FAQ'
                  : m.mode === 'empty'
                    ? 'LLM not configured'
                    : m.mode}
              </p>
            ) : null}
          </div>
        ))}
        {loading ? (
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
            <Loader2 className="h-4 w-4 animate-spin" />
            Thinking…
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      {suggestions.length ? (
        <div className="mb-2 flex shrink-0 flex-wrap gap-1.5">
          {suggestions.map((q) => (
            <button
              key={q}
              type="button"
              disabled={loading}
              onClick={() => send(q)}
              className="max-w-full truncate rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700 hover:border-sky-400 hover:bg-sky-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-600 dark:hover:bg-sky-950/40"
            >
              {q}
            </button>
          ))}
        </div>
      ) : null}

      <form
        className="flex shrink-0 gap-2 border-t border-slate-200 pt-2 dark:border-slate-700"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          rows={2}
          placeholder="Ask about this lesson…"
          className="min-h-[2.75rem] flex-1 resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-md bg-sky-600 text-white hover:bg-sky-500 disabled:opacity-40"
          aria-label="Send question"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
