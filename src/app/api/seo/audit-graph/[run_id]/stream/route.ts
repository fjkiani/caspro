/**
 * /api/seo/audit-graph/[run_id]/stream — SSE passthrough to Railway FastAPI
 *
 * Pipes the upstream SSE stream directly to the browser.
 * This avoids CORS issues and keeps the Railway URL server-side.
 *
 * The browser's EventSource connects here; this route connects to FastAPI
 * and forwards every chunk as it arrives.
 */
import { NextRequest } from 'next/server';

const SEO_API_URL =
  process.env.SEO_API_URL ?? 'https://reliable-abundance-production-aac6.up.railway.app';

export async function GET(
  request: NextRequest,
  { params }: { params: { run_id: string } },
) {
  const { run_id } = params;

  const upstream = await fetch(
    `${SEO_API_URL}/api/v1/audit-graph/${run_id}/stream`,
    {
      headers: {
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
        ...(request.headers.get('authorization')
          ? { Authorization: request.headers.get('authorization')! }
          : {}),
      },
      // Required for streaming — do not buffer
      cache: 'no-store',
    },
  );

  if (!upstream.ok || !upstream.body) {
    return new Response(
      `data: ${JSON.stringify({ type: 'error', message: 'Upstream stream unavailable' })}\n\n`,
      {
        status: upstream.status,
        headers: { 'Content-Type': 'text/event-stream' },
      },
    );
  }

  // Pipe upstream body directly to the browser
  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable Nginx buffering on Railway
    },
  });
}
