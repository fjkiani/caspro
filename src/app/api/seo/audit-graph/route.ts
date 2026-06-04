/**
 * /api/seo/audit-graph — POST proxy to Railway FastAPI
 * Hides SEO_API_URL from the browser. Returns { run_id }.
 */
import { NextRequest, NextResponse } from 'next/server';

const SEO_API_URL =
  process.env.SEO_API_URL ?? 'https://reliable-abundance-production-aac6.up.railway.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Inject tenant context from session/JWT if available
    // For now, pass through body as-is (tenant_id comes from body)
    const res = await fetch(`${SEO_API_URL}/api/v1/audit-graph`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward auth header if present
        ...(request.headers.get('authorization')
          ? { Authorization: request.headers.get('authorization')! }
          : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.detail ?? 'Audit submission failed' },
        { status: res.status },
      );
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
