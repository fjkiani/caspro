/**
 * Shared notebook grounding context for Ask (RAG-lite).
 * Built from the same normalizeNotebookBundle fields the book shell already has.
 */

import {
  parseCsvTable,
  parseFaqItems,
  type NotebookBundleData,
} from '@/lib/blog/notebooklm-adapters';
import { extractReportSections } from '@/lib/blog/pair-slides-with-captions';

const MAX_CONTEXT_CHARS = 12_000;

export interface NotebookAskContextInput {
  bundle: NotebookBundleData | null | undefined;
  /** Post/report body — markdown preferred */
  reportMarkdown?: string | null;
  reportText?: string | null;
  reportRaw?: unknown;
  /** Optional caption bodies already paired for the deck */
  captions?: { title?: string; body: string }[] | null;
}

/** Compact grounding string stuffed into the Ask system prompt. */
export function buildNotebookAskContext(input: NotebookAskContextInput): string {
  const { bundle } = input;
  const parts: string[] = [];

  const title = bundle?.title || 'Untitled notebook';
  parts.push(`# Notebook: ${title}`);
  if (bundle?.notebookId) parts.push(`Notebook ID: ${bundle.notebookId}`);

  const reportSections = extractReportSections(
    input.reportMarkdown,
    input.reportText,
    input.reportRaw,
  );
  if (reportSections.length) {
    parts.push('\n## Report');
    for (const s of reportSections.slice(0, 12)) {
      const head = s.title ? `### ${s.title}\n` : '';
      parts.push(`${head}${s.body}`.slice(0, 1200));
    }
  }

  if (input.captions?.length) {
    parts.push('\n## Slide captions');
    input.captions.slice(0, 16).forEach((c, i) => {
      const head = c.title ? `${c.title}: ` : '';
      parts.push(`Slide ${i + 1}: ${head}${c.body}`.slice(0, 400));
    });
  }

  const faqs = parseFaqItems(bundle?.faqJson);
  if (faqs.length) {
    parts.push('\n## FAQ');
    for (const f of faqs.slice(0, 12)) {
      parts.push(`Q: ${f.question}\nA: ${f.answer}`.slice(0, 600));
    }
  }

  const table = parseCsvTable(bundle?.dataTableCsv);
  if (table) {
    parts.push('\n## Metrics table');
    parts.push(table.headers.join(' | '));
    for (const row of table.rows.slice(0, 20)) {
      parts.push(row.join(' | '));
    }
  }

  if (bundle?.mindMapJson) {
    const mm = bundle.mindMapJson;
    parts.push('\n## Mind map');
    parts.push(`Root: ${mm.root || mm.title || 'Root'}`);
    for (const n of (mm.nodes || []).slice(0, 40)) {
      parts.push(`- ${n.label}${n.parent ? ` (parent: ${n.parent})` : ''}`);
    }
  }

  if (bundle?.flashcardsJson?.cards?.length) {
    parts.push('\n## Flashcards');
    for (const c of bundle.flashcardsJson.cards.slice(0, 12)) {
      parts.push(`Front: ${c.front}\nBack: ${c.back}`.slice(0, 400));
    }
  }

  let out = parts.join('\n').trim();
  if (out.length > MAX_CONTEXT_CHARS) {
    out = `${out.slice(0, MAX_CONTEXT_CHARS)}\n\n[Context truncated]`;
  }
  return out;
}

export function notebookAskSuggestionQuestions(
  bundle: NotebookBundleData | null | undefined,
): string[] {
  const faqs = parseFaqItems(bundle?.faqJson);
  const fromFaq = faqs.slice(0, 3).map((f) => f.question);
  if (fromFaq.length >= 2) return fromFaq;

  const root = bundle?.mindMapJson?.root;
  const title = bundle?.title || 'this lesson';
  const defaults = [
    `What are the main ideas in ${title}?`,
    root ? `How does ${root} break down?` : `Summarize the key concepts.`,
    'Give me a short study checklist from this notebook.',
  ];
  return [...fromFaq, ...defaults].slice(0, 4);
}
