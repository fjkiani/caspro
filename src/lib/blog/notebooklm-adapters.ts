/**
 * Adapters: NotebookLM artifact JSON → Caspro UI props.
 */

import type { QuizQuestion } from '@/data/learn/oncology-101/quiz-data';
import type { UniversalCard } from '@/types/universal-content';
import type { GraphNode, GraphEdge } from '@/components/visualization/KnowledgeGraph';

export interface NlmQuizOption {
  text: string;
  isCorrect?: boolean;
  rationale?: string;
}

export interface NlmQuizQuestion {
  question: string;
  answerOptions?: NlmQuizOption[];
  hint?: string;
}

export interface NlmQuizPayload {
  title?: string;
  questions?: NlmQuizQuestion[];
}

export interface NlmFlashcard {
  front: string;
  back: string;
}

export interface NlmFlashcardsPayload {
  title?: string;
  cards?: NlmFlashcard[];
}

export interface NlmMindMapNode {
  id: string;
  label: string;
  parent?: string;
}

/** Nested NotebookLM / Hygraph mind-map shape (name + children). */
export interface NlmMindMapNestedNode {
  name?: string;
  label?: string;
  children?: NlmMindMapNestedNode[];
}

export interface NlmMindMapPayload {
  title?: string;
  root?: string;
  /** Flat parent-pointer nodes (portal sample packs) */
  nodes?: NlmMindMapNode[];
  /** Nested tree (live Hygraph E2E pack) */
  name?: string;
  children?: NlmMindMapNestedNode[];
}

/** Normalize flat or nested mind-map JSON into { title, root, nodes }. */
export function normalizeMindMapPayload(
  raw: NlmMindMapPayload | null | undefined,
): NlmMindMapPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  if (Array.isArray(raw.nodes) && raw.nodes.length) {
    return {
      title: raw.title,
      root: raw.root || raw.title || raw.name,
      nodes: raw.nodes,
    };
  }
  // Nested: { name, children: [{ name, children }] }
  if (Array.isArray(raw.children) && (raw.name || raw.title || raw.root)) {
    const rootLabel = raw.root || raw.name || raw.title || 'Root';
    const nodes: NlmMindMapNode[] = [];
    let seq = 0;
    const walk = (list: NlmMindMapNestedNode[], parentId?: string) => {
      for (const child of list) {
        if (!child || typeof child !== 'object') continue;
        const label = (child.name || child.label || '').trim();
        if (!label) continue;
        seq += 1;
        const id = `n${seq}`;
        nodes.push({ id, label, parent: parentId });
        if (Array.isArray(child.children) && child.children.length) {
          walk(child.children, id);
        }
      }
    };
    walk(raw.children);
    return { title: raw.title || raw.name, root: rootLabel, nodes };
  }
  if (raw.root || raw.title || raw.name) {
    return { title: raw.title || raw.name, root: raw.root || raw.name || raw.title, nodes: [] };
  }
  return null;
}

export type NotebookAssetRef = {
  id?: string;
  url: string;
  fileName?: string | null;
  mimeType?: string | null;
} | null;

export interface NotebookBundleData {
  id?: string;
  title?: string | null;
  slug?: string | null;
  notebookId?: string | null;
  audioUrl?: string | null;
  quizJson?: NlmQuizPayload | null;
  flashcardsJson?: NlmFlashcardsPayload | null;
  mindMapJson?: NlmMindMapPayload | null;
  dataTableCsv?: string | null;
  faqJson?: unknown;
  slidePdf?: NotebookAssetRef;
  /** NotebookLM Studio infographic Asset (PNG/SVG/PDF) — preferred. */
  infographic?: NotebookAssetRef;
  /** Fallback public HTTPS URL when Asset relation is unset. */
  infographicUrl?: string | null;
}

function parseMaybeJson<T>(value: unknown): T | null {
  if (value == null) return null;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
  if (typeof value === 'object') return value as T;
  return null;
}

/** Normalize Hygraph JSON fields that may arrive as strings. */
export function normalizeNotebookBundle(raw: Record<string, unknown> | null | undefined): NotebookBundleData | null {
  if (!raw || typeof raw !== 'object') return null;
  return {
    id: typeof raw.id === 'string' ? raw.id : undefined,
    title: (raw.title as string) ?? null,
    slug: (raw.slug as string) ?? null,
    notebookId: (raw.notebookId as string) ?? null,
    audioUrl: (raw.audioUrl as string) ?? null,
    quizJson: parseMaybeJson<NlmQuizPayload>(raw.quizJson),
    flashcardsJson: parseMaybeJson<NlmFlashcardsPayload>(raw.flashcardsJson),
    mindMapJson: normalizeMindMapPayload(parseMaybeJson<NlmMindMapPayload>(raw.mindMapJson)),
    dataTableCsv: typeof raw.dataTableCsv === 'string' ? raw.dataTableCsv : null,
    faqJson: raw.faqJson ?? null,
    slidePdf: (raw.slidePdf as NotebookBundleData['slidePdf']) ?? null,
    infographic: (raw.infographic as NotebookBundleData['infographic']) ?? null,
    infographicUrl:
      typeof raw.infographicUrl === 'string' ? raw.infographicUrl : null,
  };
}

export function notebookBundleHasInfographic(
  bundle: NotebookBundleData | null | undefined,
): boolean {
  if (!bundle) return false;
  return Boolean(bundle.infographic?.url?.trim() || bundle.infographicUrl?.trim());
}

export function notebookBundleHasStudyContent(bundle: NotebookBundleData | null | undefined): boolean {
  if (!bundle) return false;
  return Boolean(
    bundle.audioUrl ||
      bundle.quizJson?.questions?.length ||
      bundle.flashcardsJson?.cards?.length ||
      bundle.mindMapJson?.nodes?.length ||
      (bundle.dataTableCsv && bundle.dataTableCsv.trim()) ||
      bundle.slidePdf?.url ||
      notebookBundleHasInfographic(bundle) ||
      bundle.faqJson,
  );
}

/** Map NotebookLM quiz.json → QuizSection question shape. */
export function nlmQuizToQuestions(payload: NlmQuizPayload | null | undefined): QuizQuestion[] {
  const questions = payload?.questions;
  if (!Array.isArray(questions)) return [];
  return questions.map((q, index) => {
    const options = (q.answerOptions || []).map((o) => o.text);
    const correct = (q.answerOptions || []).filter((o) => o.isCorrect).map((o) => o.text);
    return {
      id: `nlm-q-${index + 1}`,
      question: q.question,
      options,
      correctAnswer: correct.length <= 1 ? correct[0] || '' : correct,
      type: correct.length > 1 ? 'multiple' : 'single',
      hint: q.hint || '',
      category: payload?.title || 'Study',
    } satisfies QuizQuestion;
  });
}

function flashcardSideText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    if (typeof o.text === 'string') return o.text;
    if (typeof o.content === 'string') return o.content;
    if (typeof o.markdown === 'string') return o.markdown;
  }
  return '';
}

/** Map flashcards.json → UniversalCard flip cards. */
export function nlmFlashcardsToCards(payload: NlmFlashcardsPayload | null | undefined): UniversalCard[] {
  const cards = payload?.cards;
  if (!Array.isArray(cards)) return [];
  return cards
    .map((c, index) => {
      const front = flashcardSideText(c?.front);
      const back = flashcardSideText(c?.back);
      if (!front && !back) return null;
      return {
        id: `nlm-fc-${index + 1}`,
        title: `Card ${index + 1}`,
        type: 'flip' as const,
        color: 'blue',
        content: { front, back },
      } satisfies UniversalCard;
    })
    .filter((c): c is UniversalCard => Boolean(c));
}

/** Map mindMap.json → KnowledgeGraph nodes/edges. */
export function nlmMindMapToGraph(payload: NlmMindMapPayload | null | undefined): {
  nodes: GraphNode[];
  edges: GraphEdge[];
  title?: string;
} {
  const nodesIn = payload?.nodes || [];
  const rootLabel = payload?.root || 'Root';
  const nodes: GraphNode[] = [
    {
      id: 'root',
      label: rootLabel,
      type: 'pathway',
      size: 28,
    },
  ];
  const edges: GraphEdge[] = [];
  const idSet = new Set(['root']);

  for (const n of nodesIn) {
    if (!n?.id) continue;
    idSet.add(n.id);
    nodes.push({
      id: n.id,
      label: n.label || n.id,
      type: n.parent ? 'biological_process' : 'pathway',
      size: n.parent ? 16 : 22,
    });
  }

  for (const n of nodesIn) {
    if (!n?.id) continue;
    const parentId = n.parent && idSet.has(n.parent) ? n.parent : 'root';
    edges.push({
      id: `e-${parentId}-${n.id}`,
      source: parentId,
      target: n.id,
      type: 'related',
    });
  }

  return { nodes, edges, title: payload?.title };
}

export interface CsvTable {
  headers: string[];
  rows: string[][];
}

export function parseCsvTable(csv: string | null | undefined): CsvTable | null {
  if (!csv || !csv.trim()) return null;
  const lines = csv
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter((l) => l.length > 0);
  if (!lines.length) return null;

  const splitLine = (line: string): string[] => {
    const out: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        out.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    out.push(cur);
    return out;
  };

  const headers = splitLine(lines[0]);
  const rows = lines.slice(1).map(splitLine);
  return { headers, rows };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function parseFaqItems(faqJson: unknown): FaqItem[] {
  const parsed = parseMaybeJson<{ items?: FaqItem[]; faqs?: FaqItem[] } | FaqItem[]>(faqJson);
  if (!parsed) return [];
  if (Array.isArray(parsed)) {
    return parsed.filter((i) => i && typeof i.question === 'string' && typeof i.answer === 'string');
  }
  const list = parsed.items || parsed.faqs || [];
  return list.filter((i) => i && typeof i.question === 'string' && typeof i.answer === 'string');
}
