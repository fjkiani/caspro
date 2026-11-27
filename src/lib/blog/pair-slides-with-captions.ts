/**
 * Pair PDF slide indices with explanatory captions from NotebookLM artifacts.
 *
 * Priority for candidate pools (first non-empty wins as the primary pool):
 *   1. Report sections (markdown headings / Slate blocks / paragraph chunks)
 *   2. FAQ Q&A items
 *   3. Flashcard front→back pairs
 *   4. Mind-map node labels (root children first, then remaining)
 *
 * Mapping:
 *   - If candidate count === pageCount → 1:1 by index
 *   - If fewer candidates → pad remaining pages with the last caption (or empty)
 *   - If more candidates → merge contiguous extras into page buckets (even slice)
 */

import { slateTrivialDocumentToPlainText } from '@/lib/blog/slate-trivial-plain';
import type { FaqItem, NlmFlashcardsPayload, NlmMindMapPayload } from '@/lib/blog/notebooklm-adapters';

export type CaptionSource = 'report' | 'faq' | 'flashcard' | 'mindmap' | 'empty';

export interface CaptionSection {
  title?: string;
  body: string;
  source: CaptionSource;
}

export interface SlideCaption {
  /** 1-based page index */
  page: number;
  title?: string;
  body: string;
  source: CaptionSource;
}

export interface PairSlidesInput {
  pageCount: number;
  /** Prefer markdown string from Post.content.markdown / report.md */
  reportMarkdown?: string | null;
  reportText?: string | null;
  /** Hygraph Slate raw — used when markdown/text missing */
  reportRaw?: unknown;
  faqs?: FaqItem[] | null;
  flashcards?: NlmFlashcardsPayload | null;
  mindMap?: NlmMindMapPayload | null;
}

function cleanBlock(text: string): string {
  return text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

/** Split markdown-ish report into sections by ATX headings, else by blank lines. */
export function extractReportSections(
  markdown?: string | null,
  text?: string | null,
  raw?: unknown,
): CaptionSection[] {
  const fromMd = (markdown && markdown.trim()) || '';
  const fromText = (text && text.trim()) || '';
  let source = fromMd || fromText;

  if (!source && raw != null) {
    if (typeof raw === 'string' && raw.trim()) {
      source = raw.trim();
    } else {
      source = slateTrivialDocumentToPlainText(raw);
      // Non-trivial Slate: flatten heading/paragraph text roughly
      if (!source && raw && typeof raw === 'object') {
        const children = (raw as { children?: unknown[] }).children;
        if (Array.isArray(children)) {
          const blocks: string[] = [];
          for (const node of children) {
            if (!node || typeof node !== 'object') continue;
            const n = node as { type?: string; children?: { text?: string }[] };
            const line = (n.children || [])
              .map((c) => (typeof c?.text === 'string' ? c.text : ''))
              .join('')
              .trim();
            if (!line) continue;
            if (n.type && /^heading/i.test(n.type)) {
              blocks.push(`## ${line}`);
            } else {
              blocks.push(line);
            }
          }
          source = blocks.join('\n\n');
        }
      }
    }
  }

  source = cleanBlock(source);
  if (!source) return [];

  // Prefer ## / # heading splits (NotebookLM report.md style)
  if (/^#{1,6}\s+\S/m.test(source)) {
    const parts = source.split(/(?=^#{1,6}\s+)/m).map((p) => p.trim()).filter(Boolean);
    return parts.map((part) => {
      const lines = part.split('\n');
      const head = lines[0]?.match(/^#{1,6}\s+(.*)$/);
      const title = head?.[1]?.trim();
      const body = (head ? lines.slice(1).join('\n') : part).trim();
      return {
        title: title || undefined,
        body: body || title || '',
        source: 'report' as const,
      };
    }).filter((s) => s.body || s.title);
  }

  // Fallback: paragraph chunks (blank-line separated), merge tiny scraps
  const paras = source.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paras.length <= 1) {
    return [{ body: source, source: 'report' }];
  }
  return paras.map((body) => ({ body, source: 'report' as const }));
}

export function extractFaqSections(faqs?: FaqItem[] | null): CaptionSection[] {
  if (!faqs?.length) return [];
  return faqs
    .filter((f) => f?.question && f?.answer)
    .map((f) => ({
      title: f.question.trim(),
      body: f.answer.trim(),
      source: 'faq' as const,
    }));
}

export function extractFlashcardSections(
  flashcards?: NlmFlashcardsPayload | null,
): CaptionSection[] {
  const cards = flashcards?.cards;
  if (!Array.isArray(cards) || !cards.length) return [];
  return cards
    .filter((c) => c?.front || c?.back)
    .map((c) => ({
      title: (c.front || '').trim() || undefined,
      body: (c.back || c.front || '').trim(),
      source: 'flashcard' as const,
    }));
}

export function extractMindMapSections(mindMap?: NlmMindMapPayload | null): CaptionSection[] {
  if (!mindMap) return [];
  const nodes = mindMap.nodes || [];
  const rootLabel = mindMap.root?.trim();
  const out: CaptionSection[] = [];
  if (rootLabel) {
    out.push({ title: mindMap.title || 'Overview', body: rootLabel, source: 'mindmap' });
  }
  const top = nodes.filter((n) => !n.parent);
  const rest = nodes.filter((n) => n.parent);
  for (const n of [...top, ...rest]) {
    if (!n?.label?.trim()) continue;
    out.push({
      title: n.label.trim(),
      body: n.label.trim(),
      source: 'mindmap',
    });
  }
  // Dedupe identical body/title pairs from root+nodes overlap
  const seen = new Set<string>();
  return out.filter((s) => {
    const key = `${s.title || ''}|${s.body}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Pick the best non-empty candidate pool in priority order. */
export function pickCaptionPool(input: Omit<PairSlidesInput, 'pageCount'>): CaptionSection[] {
  const report = extractReportSections(input.reportMarkdown, input.reportText, input.reportRaw);
  if (report.length) return report;
  const faqs = extractFaqSections(input.faqs);
  if (faqs.length) return faqs;
  const cards = extractFlashcardSections(input.flashcards);
  if (cards.length) return cards;
  return extractMindMapSections(input.mindMap);
}

/**
 * Distribute `sections` across `pageCount` slides.
 * Even slice when more sections than pages; pad with last when fewer.
 */
export function distributeSections(
  pageCount: number,
  sections: CaptionSection[],
): SlideCaption[] {
  const n = Math.max(0, Math.floor(pageCount));
  if (n <= 0) return [];

  if (!sections.length) {
    return Array.from({ length: n }, (_, i) => ({
      page: i + 1,
      body: '',
      source: 'empty' as const,
    }));
  }

  if (sections.length === n) {
    return sections.map((s, i) => ({
      page: i + 1,
      title: s.title,
      body: s.body,
      source: s.source,
    }));
  }

  if (sections.length < n) {
    return Array.from({ length: n }, (_, i) => {
      const s = sections[Math.min(i, sections.length - 1)];
      return {
        page: i + 1,
        title: s.title,
        body: s.body,
        source: i < sections.length ? s.source : s.source,
      };
    });
  }

  // More sections than pages: merge contiguous buckets
  return Array.from({ length: n }, (_, i) => {
    const start = Math.floor((i * sections.length) / n);
    const end = Math.floor(((i + 1) * sections.length) / n);
    const slice = sections.slice(start, Math.max(start + 1, end));
    const title = slice[0]?.title;
    const body = slice
      .map((s) => {
        if (s.title && s.body && s.title !== s.body) {
          return `${s.title}\n\n${s.body}`;
        }
        return s.body || s.title || '';
      })
      .filter(Boolean)
      .join('\n\n');
    return {
      page: i + 1,
      title,
      body,
      source: slice[0]?.source || 'empty',
    };
  });
}

/** Single entry used by the study UI. */
export function pairSlidesWithCaptions(input: PairSlidesInput): SlideCaption[] {
  const pool = pickCaptionPool(input);
  return distributeSections(input.pageCount, pool);
}

/** Format a caption for display under a slide. */
export function formatSlideCaption(caption: SlideCaption | undefined | null): string {
  if (!caption) return '';
  if (caption.title && caption.body && caption.title !== caption.body) {
    return `${caption.title}\n\n${caption.body}`;
  }
  return caption.body || caption.title || '';
}
