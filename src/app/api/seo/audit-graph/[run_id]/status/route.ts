/**
 * /api/seo/audit-graph/[run_id]/status — GET proxy to Railway FastAPI
 * Returns { status, routing_path, loop_counter, client_report, error_message }
 */
import { NextRequest, NextResponse } from 'next/server';

const SEO_API_URL =
  process.env.SEO_API_URL ?? 'https://reliable-abundance-production-aac6.up.railway.app';

export async function GET(
  request: NextRequest,
  { params }: { params: { run_id: string } },
) {
  try {
    const { run_id } = params;

    const res = await fetch(
      `${SEO_API_URL}/api/v1/audit-graph/${run_id}/status`,
      {
        headers: {
          ...(request.headers.get('authorization')
            ? { Authorization: request.headers.get('authorization')! }
            : {}),
        },
        // Don't cache status responses — they change every 2s
        cache: 'no-store',
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.detail ?? 'Status fetch failed' },
        { status: res.status },
      );
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
