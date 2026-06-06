/**
 * /api/seo/audit-graph — POST proxy to openclaw-api (synchronous)
 *
 * Calls the live double-dip ZIE endpoint:
 *   POST https://openclaw-api-k30t.onrender.com/api/v1/seo/audit
 *
 * The openclaw endpoint is synchronous — it runs Dip 1 (gpt-oss-20b),
 * and if confidence < 0.85 fires Dip 2 (gpt-oss-120b), then returns
 * the full result. Total time: 5–55s depending on which dip fires.
 *
 * This route awaits the full result and returns it directly.
 * No run_id, no polling, no status endpoint needed.
 *
 * Request body:
 *   domain: string
 *   github_owner: string
 *   github_repo: string
 *   github_branch?: string  (default: "main")
 *   keywords: Array<{ keyword: string; volume: number; competition_index: number }>
 *   desktop_performance?: number  (0-100, default: 90)
 *
 * Response: full SeoAuditResult from openclaw-api
 *   { domain, vite_audit, sci_rankings, synthesis, model_used, dip_used, ... }
 */
import { NextRequest, NextResponse } from 'next/server';

const OPENCLAW_API_URL =
  process.env.SEO_API_URL ?? 'https://openclaw-api-k30t.onrender.com';

// 65s — Dip 2 can take up to 55s, add 10s buffer
const TIMEOUT_MS = 65_000;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${OPENCLAW_API_URL}/api/v1/seo/audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENCLAW_API_KEY ?? 'test'}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timer);

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: (data as { error?: string })?.error ?? `openclaw-api returned ${res.status}` },
        { status: res.status },
      );
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Audit timed out after 65s — try again' },
        { status: 504 },
      );
    }
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
