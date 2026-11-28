'use client';

import {
  normalizeMindMapPayload,
  type NlmMindMapPayload,
} from '@/lib/blog/notebooklm-adapters';

interface BlogNotebookMindMapProps {
  mindMap: NlmMindMapPayload;
}

function childrenOf(nodes: NonNullable<NlmMindMapPayload['nodes']>, parentId?: string) {
  return nodes.filter((n) => (parentId ? n.parent === parentId : !n.parent));
}

function TreeNode({
  label,
  nodes,
  nodeId,
  depth,
}: {
  label: string;
  nodes: NonNullable<NlmMindMapPayload['nodes']>;
  nodeId?: string;
  depth: number;
}) {
  const kids = childrenOf(nodes, nodeId);
  return (
    <li className={depth === 0 ? 'list-none' : ''}>
      <div
        className={`rounded-lg border px-3 py-2 text-sm ${
          depth === 0
            ? 'border-sky-300 bg-sky-50 font-semibold text-sky-900 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-100'
            : 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'
        }`}
      >
        {label}
      </div>
      {kids.length ? (
        <ul className="mt-2 space-y-2 border-l border-slate-200 pl-4 dark:border-slate-700">
          {kids.map((k) => (
            <TreeNode
              key={k.id}
              label={k.label}
              nodes={nodes}
              nodeId={k.id}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function BlogNotebookMindMap({ mindMap }: BlogNotebookMindMapProps) {
  const normalized = normalizeMindMapPayload(mindMap) || mindMap;
  const nodes = normalized.nodes || [];
  if (!nodes.length && !normalized.root && !normalized.name) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        {normalized.title || normalized.name || 'Mind map'}
      </h3>
      <ul className="space-y-2">
        <TreeNode
          label={normalized.root || normalized.name || 'Root'}
          nodes={nodes}
          depth={0}
        />
      </ul>
    </div>
  );
}
