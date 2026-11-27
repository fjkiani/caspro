/**
 * Derive a one-pager infographic model from existing NotebookLM pack fields.
 *
 * Choice (documented): derive client-side — no Hygraph `infographicJson` /
 * Asset upload required. NotebookLM `generate infographic` (image) remains an
 * optional future Asset path; this synthesizer is the DRY default.
 */

import {
  parseCsvTable,
  parseFaqItems,
  type FaqItem,
  type NotebookBundleData,
  type NlmMindMapPayload,
} from '@/lib/blog/notebooklm-adapters';

export interface InfographicBranch {
  id: string;
  label: string;
  children: string[];
}

export interface InfographicMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface NotebookInfographicModel {
  title: string;
  subtitle: string;
  root: string;
  branches: InfographicBranch[];
  metrics: InfographicMetric[];
  process: string[];
  keyFacts: FaqItem[];
  /** Always 'derived' today; reserved if we later hydrate from Asset URL */
  source: 'derived';
}

function mindBranches(mindMap: NlmMindMapPayload | null | undefined): {
  root: string;
  branches: InfographicBranch[];
} {
  const nodes = mindMap?.nodes || [];
  const root = mindMap?.root || mindMap?.title || 'Overview';
  if (!nodes.length) return { root, branches: [] };

  const top = nodes.filter((n) => !n.parent);
  const branches: InfographicBranch[] = top.map((n) => ({
    id: n.id,
    label: n.label || n.id,
    children: nodes
      .filter((c) => c.parent === n.id)
      .map((c) => c.label || c.id)
      .slice(0, 6),
  }));

  // Flat mind maps (every node parented to implicit root): treat each as a leaf branch
  if (!branches.length) {
    return {
      root,
      branches: nodes.slice(0, 8).map((n) => ({
        id: n.id,
        label: n.label || n.id,
        children: [],
      })),
    };
  }

  return { root, branches: branches.slice(0, 6) };
}

function metricsFromCsv(csv: string | null | undefined): InfographicMetric[] {
  const table = parseCsvTable(csv);
  if (!table || !table.rows.length) return [];

  const { headers, rows } = table;
  // Prefer Concept/Type style (first col label, second col value) when present
  const out: InfographicMetric[] = [];
  for (const row of rows.slice(0, 8)) {
    const label = (row[0] || '').trim();
    if (!label) continue;
    const value = (row[1] || headers[1] || '').trim() || '—';
    const detailParts = row
      .slice(2)
      .map((c, i) => {
        const h = headers[i + 2];
        const v = (c || '').trim();
        if (!v) return '';
        return h ? `${h}: ${v}` : v;
      })
      .filter(Boolean);
    out.push({
      label,
      value,
      detail: detailParts.length ? detailParts.join(' · ') : undefined,
    });
  }
  return out;
}

function processFromFlashcards(bundle: NotebookBundleData): string[] {
  const cards = bundle.flashcardsJson?.cards || [];
  // Prefer short "definition" style backs that look like steps or types
  const steps: string[] = [];
  for (const c of cards) {
    const front = (c.front || '').trim();
    const back = (c.back || '').trim();
    if (!front || !back) continue;
    // Heuristic: process-like cards mention → or workflow keywords
    if (/→|->|workflow|process|step|input|output/i.test(`${front} ${back}`)) {
      const cleaned = back.replace(/\$\\rightarrow\$/g, '→').replace(/\s+/g, ' ').trim();
      if (cleaned.length <= 80) steps.push(cleaned);
      else steps.push(front.length <= 60 ? front : cleaned.slice(0, 72));
    }
    if (steps.length >= 5) break;
  }
  if (steps.length >= 2) return steps;

  // Fallback: first N flashcard fronts as concept trail
  return cards
    .slice(0, 5)
    .map((c) => (c.front || '').replace(/\?$/, '').trim())
    .filter((s) => s.length > 0 && s.length <= 64);
}

/**
 * Build a renderable one-pager model from an already-normalized notebook bundle.
 * Returns null when there is nothing visual to show.
 */
export function synthesizeNotebookInfographic(
  bundle: NotebookBundleData | null | undefined,
): NotebookInfographicModel | null {
  if (!bundle) return null;

  const { root, branches } = mindBranches(bundle.mindMapJson);
  const metrics = metricsFromCsv(bundle.dataTableCsv);
  const faqs = parseFaqItems(bundle.faqJson);
  const keyFacts = faqs.slice(0, 4);
  const process = processFromFlashcards(bundle);

  if (!branches.length && !metrics.length && !keyFacts.length && !process.length) {
    return null;
  }

  const subtitleParts: string[] = [];
  if (branches.length) subtitleParts.push(`${branches.length} themes`);
  if (metrics.length) subtitleParts.push(`${metrics.length} metrics`);
  if (keyFacts.length) subtitleParts.push(`${keyFacts.length} key Q&As`);

  return {
    title: bundle.title || bundle.mindMapJson?.title || 'Study at a glance',
    subtitle: subtitleParts.join(' · ') || 'Derived from this notebook pack',
    root,
    branches,
    metrics,
    process,
    keyFacts,
    source: 'derived',
  };
}
