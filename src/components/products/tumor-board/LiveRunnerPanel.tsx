'use client';

import { useState } from 'react';
import { Loader2, Zap } from 'lucide-react';
import type { ClinicalCaseId } from '@/data/clinical-case-ui';
import { RANKER_8D_AK_OVARIAN, RANKER_8D_CRC_GATE2_HOT } from '@/data/live-ranker-8d-fixtures';
import { useTbProductChrome } from './useTbProductChrome';

type LiveEnvelope = {
  live: boolean;
  badge: string;
  data?: unknown;
  snapshot?: unknown;
  reason?: string;
};

export function LiveRunnerPanel({ caseId }: { caseId: ClinicalCaseId }) {
  const chrome = useTbProductChrome();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LiveEnvelope | null>(null);
  const [endpoint, setEndpoint] = useState<'therapy-fit' | 'ranker-8d'>('therapy-fit');
  const [akScenario, setAkScenario] = useState<'day0' | 'door2'>('day0');

  function rankerBody(): Record<string, unknown> {
    if (caseId === 'ovarian') {
      return { caseId, ...RANKER_8D_AK_OVARIAN };
    }
    if (caseId === 'crc') {
      return { caseId, ...RANKER_8D_CRC_GATE2_HOT };
    }
    return { caseId };
  }

  async function run() {
    setLoading(true);
    setResult(null);
    try {
      const path =
        endpoint === 'therapy-fit' ? '/api/live/therapy-fit/' : '/api/live/ranker-8d/';
      const body: Record<string, unknown> =
        endpoint === 'ranker-8d'
          ? rankerBody()
          : {
              caseId,
              ...(caseId === 'ovarian' ? { scenario: akScenario } : {}),
            };
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as LiveEnvelope;
      setResult(json);
    } catch {
      setResult({
        live: false,
        badge: 'VERIFIED SNAPSHOT (Backend offline)',
        reason: 'client_error',
        snapshot: { caseId },
      });
    } finally {
      setLoading(false);
    }
  }

  const badgeLive = result?.live;
  const badgeCls = badgeLive
    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
    : 'border-amber-500/40 bg-amber-500/10 text-amber-200';

  return (
    <div className={`max-w-3xl rounded border p-4 ${chrome.rail}`}>
      <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${chrome.accent}`}>
        Live runner
      </p>
      <p className={`mt-2 text-[13px] leading-snug ${chrome.body}`}>
        Hit the API when backends are up. Otherwise you get a verified snapshot — never labeled
        live.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value as 'therapy-fit' | 'ranker-8d')}
          className={`rounded border px-2 py-1 text-[11px] ${chrome.muted}`}
        >
          <option value="therapy-fit">Therapy fit bundle</option>
          <option value="ranker-8d">8D bilinear ranker (MOAT)</option>
        </select>
        {endpoint === 'therapy-fit' && caseId === 'ovarian' ? (
          <select
            value={akScenario}
            onChange={(e) => setAkScenario(e.target.value as 'day0' | 'door2')}
            className={`rounded border px-2 py-1 text-[11px] ${chrome.muted}`}
          >
            <option value="day0">AK Day-0 (empty L1)</option>
            <option value="door2">AK post-NACT Door 2</option>
          </select>
        ) : null}
        <button
          type="button"
          disabled={loading}
          onClick={run}
          className={`inline-flex items-center gap-2 rounded border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${chrome.accent}`}
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
          Run live scoring
        </button>
      </div>
      {result ? (
        <div className="mt-4 space-y-2">
          <span
            className={`inline-block rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${badgeCls}`}
          >
            {result.badge}
          </span>
          <pre
            className={`max-h-64 overflow-auto rounded border p-2 text-[10px] leading-snug ${chrome.muted}`}
          >
            {JSON.stringify(result.live ? result.data : result.snapshot ?? result, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}