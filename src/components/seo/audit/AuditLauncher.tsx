'use client';

/**
 * AuditLauncher.tsx
 * -----------------
 * Full submit + live progress UI for the LangGraph SEO audit.
 *
 * Stolen from open-seo:
 *   - LaunchFormCard  → domain input + submit button pattern
 *   - ProgressCard    → progress bar + live routing_path feed
 *   - StatusBadge     → running/completed/failed badge
 *   - useRankRunPolling → refetchInterval pattern (now in useAuditGraph)
 *
 * Adapted to:
 *   - caspro's black/gray-900 design system (not DaisyUI)
 *   - routing_path array from LangGraph state (not crawl phases)
 *   - Nemotron thinking stream via <AuditStream /> (rendered below progress)
 */

import { useState, type FormEvent } from 'react';
import { Loader2, ScanSearch, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { useAuditGraph, type AuditStatus } from '@/hooks/useAuditGraph';
import { AuditStream } from '@/components/seo/audit/AuditStream';
import { SynthesisReport } from '@/components/seo/audit/SynthesisReport';

// ---------------------------------------------------------------------------
// Routing path → human-readable labels + progress percentage
// ---------------------------------------------------------------------------

const NODE_LABELS: Record<string, string> = {
  'supervisor:spa_critical':  'Supervisor → SPA Critical',
  'supervisor:low_authority': 'Supervisor → Authority Gap',
  'supervisor:content_gap':   'Supervisor → Content Gap',
  'supervisor:synthesize':    'Supervisor → Synthesize',
  'crawlability_fix':         'Crawlability Fix Plan',
  'authority_gap':            'Authority Gap Plan',
  'content_gap':              'Content Gap Plan',
  'strategy':                 'Strategy Merge',
  'synthesis':                'Writing Client Report',
};

// Ordered node sequence for progress bar calculation
const NODE_ORDER = [
  'gather',
  'technical',
  'supervisor',
  'fix',       // any fix node
  'strategy',
  'synthesis',
];

function routingPathToProgress(path: string[]): number {
  if (path.length === 0) return 5;
  const last = path[path.length - 1];
  if (last.startsWith('supervisor')) return 40;
  if (last === 'crawlability_fix' || last === 'authority_gap' || last === 'content_gap') return 65;
  if (last === 'strategy') return 80;
  if (last === 'synthesis') return 95;
  return Math.min(5 + path.length * 12, 90);
}

function labelForNode(node: string): string {
  return NODE_LABELS[node] ?? node.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: AuditStatus }) {
  if (status === 'submitting' || status === 'pending' || status === 'running') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-400">
        <Loader2 className="size-3 animate-spin" />
        {status === 'submitting' ? 'Submitting…' : status === 'pending' ? 'Queued' : 'Running'}
      </span>
    );
  }
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-green-900/20 border border-green-700/30 text-green-400">
        <CheckCircle className="size-3" />
        Complete
      </span>
    );
  }
  if (status === 'failed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-red-900/20 border border-red-700/30 text-red-400">
        <AlertCircle className="size-3" />
        Failed
      </span>
    );
  }
  return null;
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
      <div
        className="h-1.5 rounded-full bg-yellow-400 transition-all duration-700 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function RoutingPathFeed({ path }: { path: string[] }) {
  if (path.length === 0) return null;
  return (
    <div className="space-y-1 mt-3">
      {path.map((node, i) => (
        <div
          key={`${node}-${i}`}
          className={`flex items-center gap-2 text-xs px-2 py-1.5 rounded transition-all ${
            i === path.length - 1
              ? 'bg-yellow-900/20 border border-yellow-700/20 text-yellow-300 animate-in fade-in slide-in-from-top-1 duration-300'
              : 'text-gray-500'
          }`}
        >
          <span className={`size-1.5 rounded-full shrink-0 ${
            i === path.length - 1 ? 'bg-yellow-400' : 'bg-gray-700'
          }`} />
          {labelForNode(node)}
          {i === path.length - 1 && (
            <Loader2 className="size-3 animate-spin ml-auto text-yellow-500" />
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function AuditLauncher({ defaultDomain = '' }: { defaultDomain?: string }) {
  const [domain, setDomain] = useState(defaultDomain);
  const [keywordsRaw, setKeywordsRaw] = useState('');
  const audit = useAuditGraph();

  const isActive =
    audit.status === 'submitting' ||
    audit.status === 'pending' ||
    audit.status === 'running';

  const progress = audit.status === 'completed'
    ? 100
    : audit.status === 'failed'
    ? 0
    : routingPathToProgress(audit.routingPath);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!domain.trim()) return;
    const keywords = keywordsRaw
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);
    void audit.submit(domain.trim(), keywords);
  }

  return (
    <div className="space-y-4">

      {/* ── Launch Form ─────────────────────────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <Zap className="size-4 text-yellow-400" />
            LangGraph Audit
          </h2>
          {audit.status !== 'idle' && <StatusBadge status={audit.status} />}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            <input
              type="text"
              placeholder="jedilabs.org"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              disabled={isActive}
              className="lg:col-span-5 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-500 disabled:opacity-50"
            />
            <input
              type="text"
              placeholder="Keywords (comma-separated, optional)"
              value={keywordsRaw}
              onChange={e => setKeywordsRaw(e.target.value)}
              disabled={isActive}
              className="lg:col-span-5 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isActive || !domain.trim()}
              className="lg:col-span-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-700 disabled:text-gray-500 text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isActive ? (
                <><Loader2 className="size-4 animate-spin" /> Running</>
              ) : (
                <><ScanSearch className="size-4" /> Run Audit</>
              )}
            </button>
          </div>
        </form>

        {/* Error */}
        {audit.status === 'failed' && audit.error && (
          <div className="mt-3 flex items-start gap-2 bg-red-950/30 border border-red-800/40 rounded-lg px-4 py-3">
            <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{audit.error}</p>
          </div>
        )}

        {/* Reset link after terminal state */}
        {(audit.status === 'completed' || audit.status === 'failed') && (
          <button
            onClick={audit.reset}
            className="mt-3 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Run another audit
          </button>
        )}
      </div>

      {/* ── Progress Card (visible while running) ───────────────────────── */}
      {(isActive || audit.status === 'completed') && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-sm font-medium flex items-center gap-2">
              {isActive && <Loader2 className="size-4 animate-spin text-yellow-400" />}
              {isActive ? 'Audit in progress' : 'Audit complete'}
            </h3>
            <span className="text-gray-500 text-xs">
              {audit.loopCounter > 0 && `Loop ${audit.loopCounter}/2`}
            </span>
          </div>

          <ProgressBar value={progress} />

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{progress}%</span>
            {audit.runId && (
              <span className="font-mono text-gray-600 truncate max-w-[200px]">
                {audit.runId}
              </span>
            )}
          </div>

          {/* Live routing path feed — stolen from open-seo ProgressCard crawledUrls */}
          <RoutingPathFeed path={audit.routingPath} />
        </div>
      )}

      {/* ── Nemotron Thinking Stream ─────────────────────────────────────── */}
      {audit.runId && isActive && (
        <AuditStream runId={audit.runId} />
      )}

      {/* ── Final Synthesis Report ───────────────────────────────────────── */}
      {audit.status === 'completed' && audit.clientReport && (
        <SynthesisReport
          report={audit.clientReport}
          domain={domain}
          routingPath={audit.routingPath}
          loopCounter={audit.loopCounter}
        />
      )}
    </div>
  );
}
