/**
 * useAuditGraph.ts
 * ----------------
 * Submits a LangGraph SEO audit job and polls its status until terminal.
 *
 * Stolen pattern: open-seo `useRankRunPolling` + `AuditDetail` statusQuery.
 * Stack: TanStack Query v5 `refetchInterval` — no SSE needed for status.
 *
 * Flow:
 *   1. submit(domain, keywords) → POST /api/seo/audit-graph → { run_id }
 *   2. Poll GET /api/seo/audit-graph/{run_id}/status every 2s while running
 *   3. Stop polling on "completed" | "failed"
 *   4. Expose routing_path array for progress bar rendering
 */

import { useState, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AuditStatus =
  | 'idle'
  | 'submitting'
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed';

export interface AuditStatusResponse {
  status: AuditStatus;
  routing_path: string[];   // e.g. ["supervisor:spa_critical", "crawlability_fix", "strategy", "synthesis"]
  loop_counter: number;
  client_report: string | null;
  error_message: string | null;
}

export interface UseAuditGraphReturn {
  /** Current run_id — null until first submit */
  runId: string | null;
  /** Aggregated status across submit + poll lifecycle */
  status: AuditStatus;
  /** routing_path array from DB — drives progress bar */
  routingPath: string[];
  /** loop_counter from DB */
  loopCounter: number;
  /** Final markdown report — non-null only when status === "completed" */
  clientReport: string | null;
  /** Error string — non-null when status === "failed" */
  error: string | null;
  /** True while any network activity is in flight */
  isLoading: boolean;
  /** Submit a new audit. Resets all state. */
  submit: (domain: string, keywords: string[]) => Promise<void>;
  /** Reset back to idle so the user can start a new audit */
  reset: () => void;
}

// ---------------------------------------------------------------------------
// API helpers — call Next.js API routes (which proxy to Railway FastAPI)
// ---------------------------------------------------------------------------

async function postAuditGraph(
  domain: string,
  keywords: string[],
): Promise<{ run_id: string }> {
  const res = await fetch('/api/seo/audit-graph', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, keywords }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? `Submit failed: ${res.status}`);
  }
  return res.json();
}

async function fetchAuditStatus(runId: string): Promise<AuditStatusResponse> {
  const res = await fetch(`/api/seo/audit-graph/${runId}/status`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? `Status fetch failed: ${res.status}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAuditGraph(): UseAuditGraphReturn {
  const queryClient = useQueryClient();
  const [runId, setRunId] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const prevStatusRef = useRef<AuditStatus | undefined>(undefined);

  // ── Status polling ────────────────────────────────────────────────────────
  // Mirrors open-seo's AuditDetail statusQuery exactly:
  //   refetchInterval returns 2000 while running, false when terminal.
  const statusQuery = useQuery<AuditStatusResponse>({
    queryKey: ['audit-graph-status', runId],
    queryFn: () => fetchAuditStatus(runId!),
    enabled: runId !== null && submitStatus !== 'submitting',
    refetchInterval: (query) => {
      const data = query.state.data;
      const prev = prevStatusRef.current;
      prevStatusRef.current = data?.status;

      // When transitioning to terminal, invalidate any dependent queries
      const isTerminal =
        data?.status === 'completed' || data?.status === 'failed';
      const wasActive =
        prev === 'running' || prev === 'pending';
      if (wasActive && isTerminal) {
        void queryClient.invalidateQueries({
          queryKey: ['audit-graph-history'],
        });
      }

      if (data?.status === 'pending' || data?.status === 'running') {
        return 2000;
      }
      return false; // stop polling
    },
    // Don't throw on 404 — the row may not exist yet on first poll
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('404')) {
        return failureCount < 3;
      }
      return failureCount < 2;
    },
  });

  // ── Derived state ─────────────────────────────────────────────────────────
  const polledStatus = statusQuery.data?.status ?? null;

  let status: AuditStatus = 'idle';
  if (submitStatus === 'submitting') {
    status = 'submitting';
  } else if (runId && !polledStatus) {
    status = 'pending'; // run_id exists but first poll hasn't returned yet
  } else if (polledStatus) {
    status = polledStatus;
  }

  const error =
    submitError ??
    statusQuery.data?.error_message ??
    (statusQuery.isError
      ? (statusQuery.error as Error)?.message ?? 'Unknown error'
      : null);

  // ── Actions ───────────────────────────────────────────────────────────────
  async function submit(domain: string, keywords: string[]) {
    // Reset all state before new submission
    setSubmitError(null);
    setRunId(null);
    prevStatusRef.current = undefined;
    void queryClient.removeQueries({ queryKey: ['audit-graph-status'] });

    setSubmitStatus('submitting');
    try {
      const { run_id } = await postAuditGraph(domain, keywords);
      setRunId(run_id);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Failed to start audit',
      );
    } finally {
      setSubmitStatus('idle');
    }
  }

  function reset() {
    setRunId(null);
    setSubmitStatus('idle');
    setSubmitError(null);
    prevStatusRef.current = undefined;
    void queryClient.removeQueries({ queryKey: ['audit-graph-status'] });
  }

  return {
    runId,
    status,
    routingPath: statusQuery.data?.routing_path ?? [],
    loopCounter: statusQuery.data?.loop_counter ?? 0,
    clientReport: statusQuery.data?.client_report ?? null,
    error,
    isLoading:
      submitStatus === 'submitting' ||
      (statusQuery.isFetching && status !== 'completed' && status !== 'failed'),
    submit,
    reset,
  };
}
