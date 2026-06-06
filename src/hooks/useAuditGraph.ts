/**
 * useAuditGraph.ts
 * ----------------
 * Submits a LangGraph SEO audit job and polls its status until terminal.
 *
 * Stack: plain React useState + useEffect + setInterval — no external deps.
 *
 * Flow:
 *   1. submit(domain, keywords) → POST /api/seo/audit-graph → { run_id }
 *   2. Poll GET /api/seo/audit-graph/{run_id}/status every 2s while running
 *   3. Stop polling on "completed" | "failed"
 *   4. Expose routing_path array for progress bar rendering
 */

import { useState, useEffect, useRef, useCallback } from 'react';

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
  routing_path: string[];
  loop_counter: number;
  client_report: string | null;
  error_message: string | null;
}

export interface UseAuditGraphReturn {
  runId: string | null;
  status: AuditStatus;
  routingPath: string[];
  loopCounter: number;
  clientReport: string | null;
  error: string | null;
  isLoading: boolean;
  submit: (domain: string, keywords: string[]) => Promise<void>;
  reset: () => void;
}

// ---------------------------------------------------------------------------
// API helpers
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
    throw new Error((body as { error?: string })?.error ?? `Submit failed: ${res.status}`);
  }
  return res.json() as Promise<{ run_id: string }>;
}

async function fetchAuditStatus(runId: string): Promise<AuditStatusResponse> {
  const res = await fetch(`/api/seo/audit-graph/${runId}/status`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string })?.error ?? `Status fetch failed: ${res.status}`);
  }
  return res.json() as Promise<AuditStatusResponse>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAuditGraph(): UseAuditGraphReturn {
  const [runId, setRunId] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pollData, setPollData] = useState<AuditStatusResponse | null>(null);
  const [pollError, setPollError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Polling ───────────────────────────────────────────────────────────────
  const stopPolling = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const poll = useCallback(async (id: string) => {
    setIsFetching(true);
    try {
      const data = await fetchAuditStatus(id);
      setPollData(data);
      if (data.status === 'completed' || data.status === 'failed') {
        stopPolling();
      }
    } catch (err) {
      // 404 on first poll is expected — row may not exist yet
      const msg = err instanceof Error ? err.message : 'Poll error';
      if (!msg.includes('404')) {
        setPollError(msg);
        stopPolling();
      }
    } finally {
      setIsFetching(false);
    }
  }, [stopPolling]);

  useEffect(() => {
    if (!runId || submitStatus === 'submitting') return;

    // Immediate first poll
    void poll(runId);

    // Then every 2s
    intervalRef.current = setInterval(() => {
      void poll(runId);
    }, 2000);

    return () => stopPolling();
  }, [runId, submitStatus, poll, stopPolling]);

  // ── Derived state ─────────────────────────────────────────────────────────
  let status: AuditStatus = 'idle';
  if (submitStatus === 'submitting') {
    status = 'submitting';
  } else if (runId && !pollData) {
    status = 'pending';
  } else if (pollData) {
    status = pollData.status;
  }

  const error =
    submitError ??
    pollData?.error_message ??
    pollError ??
    null;

  // ── Actions ───────────────────────────────────────────────────────────────
  const submit = useCallback(async (domain: string, keywords: string[]) => {
    stopPolling();
    setSubmitError(null);
    setPollData(null);
    setPollError(null);
    setRunId(null);
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
  }, [stopPolling]);

  const reset = useCallback(() => {
    stopPolling();
    setRunId(null);
    setSubmitStatus('idle');
    setSubmitError(null);
    setPollData(null);
    setPollError(null);
  }, [stopPolling]);

  return {
    runId,
    status,
    routingPath: pollData?.routing_path ?? [],
    loopCounter: pollData?.loop_counter ?? 0,
    clientReport: pollData?.client_report ?? null,
    error,
    isLoading:
      submitStatus === 'submitting' ||
      (isFetching && status !== 'completed' && status !== 'failed'),
    submit,
    reset,
  };
}
