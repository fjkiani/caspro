import { NextResponse } from 'next/server';

/** Fail-closed live proxy: 200 + live:false + snapshot when backend is down (UI never throws). */
export const LIVE_PROXY_TIMEOUT_MS = 12_000;

export type LiveProxyJson = {
  live: boolean;
  badge: string;
  data?: unknown;
  snapshot?: unknown;
  reason?: string;
  upstreamStatus?: number;
};

function offline(reason: string, snapshot: unknown): LiveProxyJson {
  return {
    live: false,
    badge: 'VERIFIED SNAPSHOT (Backend offline)',
    reason,
    snapshot,
  };
}

export async function proxyPostJson(
  upstreamUrl: string,
  body: unknown,
  snapshot: unknown,
): Promise<NextResponse<LiveProxyJson>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LIVE_PROXY_TIMEOUT_MS);
  try {
    const res = await fetch(upstreamUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body ?? {}),
      signal: controller.signal,
    });
    clearTimeout(timer);
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      data = { raw: await res.text().catch(() => '') };
    }
    if (!res.ok) {
      return NextResponse.json(
        {
          ...offline('upstream_error', snapshot),
          upstreamStatus: res.status,
          data,
        },
        { status: 200 },
      );
    }
    return NextResponse.json(
      {
        live: true,
        badge: 'LIVE FASTAPI',
        data,
      },
      { status: 200 },
    );
  } catch (err) {
    clearTimeout(timer);
    const reason =
      err instanceof Error && (err.name === 'AbortError' || err.message.includes('aborted'))
        ? 'timeout'
        : 'backend_offline';
    return NextResponse.json(offline(reason, snapshot), { status: 200 });
  }
}