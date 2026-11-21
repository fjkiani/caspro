import { NextRequest } from 'next/server';
import { proxyPostJson } from '@/lib/live-proxy';
import { saeSnapshot } from '@/data/live-scoring-snapshots';
import type { ClinicalCaseId } from '@/data/clinical-case-ui-types';
import { SAE_BRCA1_VARIANT_REQUEST } from '@/data/live-sae-fixtures';

const DEFAULT_MODAL_SAE =
  'https://fjkiani--sae-service-saeservice-api.us-east.modal.run';

function isCaseId(v: unknown): v is ClinicalCaseId {
  return v === 'ovarian' || v === 'myeloma' || v === 'crc' || v === 'lung';
}

function stripProxyFields(body: Record<string, unknown>): Record<string, unknown> {
  const { caseId: _c, scenario: _s, ...rest } = body;
  return rest;
}

function hasSaeInput(body: Record<string, unknown>): boolean {
  if (body.activations != null) return true;
  return (
    typeof body.chrom === 'string' &&
    typeof body.pos === 'number' &&
    typeof body.ref === 'string' &&
    typeof body.alt === 'string'
  );
}

function resolveUpstreamUrl(): string {
  const direct = process.env.SAE_SERVICE_URL?.replace(/\/$/, '');
  if (direct) {
    return `${direct}/extract_features`;
  }
  const backend = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
  return `${backend}/api/sae/extract_features`;
}

/** POST /api/live/sae → BACKEND /api/sae/extract_features or Modal /extract_features */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const caseId = isCaseId(body.caseId) ? body.caseId : 'ovarian';
  const upstream = resolveUpstreamUrl();
  const snapshot = saeSnapshot(caseId);

  const stripped = stripProxyFields(body);
  const payload = hasSaeInput(stripped) ? stripped : { ...SAE_BRCA1_VARIANT_REQUEST };

  const envelope = await proxyPostJson(upstream, payload, {
    ...snapshot,
    upstreamHint: process.env.SAE_SERVICE_URL ? 'SAE_SERVICE_URL' : 'BACKEND_API_URL',
    modalDefault: DEFAULT_MODAL_SAE,
    request: payload,
  });
  return envelope;
}