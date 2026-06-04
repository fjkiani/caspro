'use client';

/**
 * AuditStream.tsx
 * ---------------
 * Subscribes to the SSE stream endpoint and renders Nemotron-49B's
 * supervisor_notes live — exactly like a ChatGPT/Claude thinking interface.
 *
 * Stolen from open-seo:
 *   - MarkdownAnswer's ThinkingBlock → collapsible <details> with pre-wrap text
 *   - extractThinkingBlocks() → strips <think>...</think> tags from Nemotron output
 *   - The "Model Thinking" label + ChevronDown rotate pattern
 *
 * SSE event contract (from FastAPI /api/v1/audit-graph/{run_id}/stream):
 *   event: node_start    data: { node: string, timestamp: string }
 *   event: thinking      data: { node: string, text: string }       ← Nemotron stream
 *   event: node_complete data: { node: string, timestamp: string }
 *   event: done          data: { client_report: string }
 *   event: error         data: { message: string }
 *
 * Uses native browser EventSource — no library needed.
 * Cleans up the EventSource on unmount or when runId changes.
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Brain, Zap, CheckCircle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StreamEvent {
  type: 'node_start' | 'thinking' | 'node_complete' | 'done' | 'error';
  node?: string;
  text?: string;       // incremental thinking text from Nemotron
  timestamp?: string;
  message?: string;
}

interface NodeThinkingState {
  node: string;
  text: string;
  complete: boolean;
}

// ---------------------------------------------------------------------------
// Node display names
// ---------------------------------------------------------------------------

const NODE_DISPLAY: Record<string, string> = {
  gather_node:            'Gathering Data',
  technical_node:         'Technical Analysis',
  supervisor_node:        'Supervisor Routing',
  crawlability_fix_node:  'Nemotron: Crawlability Fix',
  authority_gap_node:     'Nemotron: Authority Gap',
  content_gap_node:       'Nemotron: Content Gap',
  strategy_node:          'Strategy Merge',
  synthesis_node:         'Writing Report',
  flywheel_persist_node:  'ZIE Flywheel',
};

function displayName(node: string): string {
  return NODE_DISPLAY[node] ?? node.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function isNemotronNode(node: string): boolean {
  return (
    node === 'crawlability_fix_node' ||
    node === 'authority_gap_node' ||
    node === 'content_gap_node' ||
    node === 'supervisor_node' ||
    node === 'synthesis_node'
  );
}

// ---------------------------------------------------------------------------
// ThinkingBlock — stolen directly from open-seo MarkdownAnswer
// ---------------------------------------------------------------------------

function ThinkingBlock({
  node,
  text,
  complete,
}: {
  node: string;
  text: string;
  complete: boolean;
}) {
  const [open, setOpen] = useState(true);
  const textRef = useRef<HTMLPreElement>(null);

  // Auto-scroll to bottom as text streams in
  useEffect(() => {
    if (open && textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [text, open]);

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors"
      >
        {complete ? (
          <CheckCircle className="size-3.5 text-green-500 shrink-0" />
        ) : (
          <Brain className="size-3.5 text-yellow-400 shrink-0 animate-pulse" />
        )}
        <span className="flex-1 text-left">
          {displayName(node)}
          {!complete && (
            <span className="ml-2 text-yellow-500/70">thinking…</span>
          )}
        </span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <pre
          ref={textRef}
          className="overflow-y-auto max-h-64 whitespace-pre-wrap break-words border-t border-gray-800 bg-gray-950/60 px-3 py-2.5 text-xs font-mono text-gray-400 leading-relaxed"
        >
          {text || <span className="text-gray-600 italic">Waiting for output…</span>}
          {!complete && (
            <span className="inline-block w-1.5 h-3.5 bg-yellow-400 ml-0.5 animate-pulse align-middle" />
          )}
        </pre>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// AuditStream
// ---------------------------------------------------------------------------

export function AuditStream({ runId }: { runId: string }) {
  const [nodes, setNodes] = useState<NodeThinkingState[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!runId) return;

    // Clean up any existing connection
    if (esRef.current) {
      esRef.current.close();
    }

    setNodes([]);
    setActiveNode(null);
    setConnectionError(null);
    setIsDone(false);

    // Connect to SSE stream — proxied through Next.js API route to avoid CORS
    const es = new EventSource(`/api/seo/audit-graph/${runId}/stream`);
    esRef.current = es;

    es.addEventListener('node_start', (e: MessageEvent) => {
      const data: StreamEvent = JSON.parse(e.data);
      if (!data.node) return;
      setActiveNode(data.node);
      // Only create a thinking block for LLM nodes
      if (isNemotronNode(data.node)) {
        setNodes(prev => [
          ...prev,
          { node: data.node!, text: '', complete: false },
        ]);
      }
    });

    es.addEventListener('thinking', (e: MessageEvent) => {
      const data: StreamEvent = JSON.parse(e.data);
      if (!data.node || !data.text) return;
      setNodes(prev =>
        prev.map(n =>
          n.node === data.node && !n.complete
            ? { ...n, text: n.text + data.text }
            : n,
        ),
      );
    });

    es.addEventListener('node_complete', (e: MessageEvent) => {
      const data: StreamEvent = JSON.parse(e.data);
      if (!data.node) return;
      setActiveNode(null);
      setNodes(prev =>
        prev.map(n =>
          n.node === data.node ? { ...n, complete: true } : n,
        ),
      );
    });

    es.addEventListener('done', () => {
      setIsDone(true);
      setActiveNode(null);
      es.close();
    });

    es.addEventListener('error', (e: MessageEvent) => {
      try {
        const data: StreamEvent = JSON.parse(e.data);
        setConnectionError(data.message ?? 'Stream error');
      } catch {
        // EventSource connection error (not a data error)
        if (es.readyState === EventSource.CLOSED) {
          setConnectionError('Stream connection closed unexpectedly');
        }
      }
      es.close();
    });

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [runId]);

  // Don't render anything if no LLM nodes have started yet
  if (nodes.length === 0 && !connectionError) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Zap className="size-4 text-yellow-400/50 animate-pulse" />
          Waiting for LLM nodes to start…
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-sm font-medium flex items-center gap-2">
          <Brain className="size-4 text-yellow-400" />
          Model Reasoning
        </h3>
        {activeNode && (
          <span className="text-xs text-yellow-400/70 animate-pulse">
            {displayName(activeNode)}
          </span>
        )}
        {isDone && (
          <span className="text-xs text-green-400 flex items-center gap-1">
            <CheckCircle className="size-3" /> Complete
          </span>
        )}
      </div>

      {connectionError && (
        <div className="text-xs text-red-400 bg-red-950/20 border border-red-800/30 rounded-lg px-3 py-2">
          Stream error: {connectionError}
        </div>
      )}

      <div className="space-y-2">
        {nodes.map((n, i) => (
          <ThinkingBlock
            key={`${n.node}-${i}`}
            node={n.node}
            text={n.text}
            complete={n.complete}
          />
        ))}
      </div>
    </div>
  );
}
