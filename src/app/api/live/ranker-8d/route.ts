import { NextRequest } from 'next/server';
import { proxyPostJson } from '@/lib/live-proxy';
import { ranker8dSnapshot } from '@/data/live-scoring-snapshots';
import type { ClinicalCaseId } from '@/data/clinical-case-ui-types';
import {
  RANKER_8D_AK_OVARIAN,
  RANKER_8D_CRC_GATE2_HOT,
} from '@/data/live-ranker-8d-fixtures';

function isCaseId(v: unknown): v is ClinicalCaseId {
  return v === 'ovarian' || v === 'myeloma' || v === 'crc' || v === 'lung';
}

function stripProxyFields(body: Record<string, unknown>): Record<string, unknown> {
  const { caseId: _c, scenario: _s, ...rest } = body;
  return rest;
}

function hasRankerInput(body: Record<string, unknown>): boolean {
  const cf = body.clinical_features;
  const p = body.p_signed_8d;
  const hasCf = cf && typeof cf === 'object' && Object.keys(cf as object).length > 0;
  const hasP = Array.isArray(p) && p.length === 8;
  return Boolean(hasCf || hasP);
}

/** POST /api/live/ranker-8d → MOAT /v1/ranker/8d/bilinear */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const caseId = isCaseId(body.caseId) ? body.caseId : 'ovarian';
  const base = process.env.MOAT_API_URL || 'http://127.0.0.1:8001';
  const upstream = `${base}/v1/ranker/8d/bilinear`;
  const snapshot = ranker8dSnapshot(caseId);

  const stripped = stripProxyFields(body);
  let payload: Record<string, unknown>;
  if (hasRankerInput(stripped)) {
    payload = stripped;
  } else if (caseId === 'ovarian') {
    payload = { ...RANKER_8D_AK_OVARIAN };
  } else if (caseId === 'crc') {
    payload = { ...RANKER_8D_CRC_GATE2_HOT };
  } else {
    payload = stripped;
  }

  return proxyPostJson(upstream, payload, snapshot);
}