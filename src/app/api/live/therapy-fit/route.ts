import { NextRequest, NextResponse } from 'next/server';
import { proxyPostJson } from '@/lib/live-proxy';
import { therapyFitSnapshot } from '@/data/live-scoring-snapshots';
import type { ClinicalCaseId } from '@/data/clinical-case-ui-types';
import {
  THERAPY_FIT_AK_REQUEST,
  THERAPY_FIT_BUNDLE_QUERY,
  type TherapyFitAkScenario,
} from '@/data/ayesha/therapy-fit-bundle-fixtures';

function isCaseId(v: unknown): v is ClinicalCaseId {
  return v === 'ovarian' || v === 'myeloma' || v === 'crc' || v === 'lung';
}

function isAkScenario(v: unknown): v is TherapyFitAkScenario {
  return v === 'day0' || v === 'door2';
}

function stripProxyFields(body: Record<string, unknown>): Record<string, unknown> {
  const { caseId: _c, scenario: _s, useV4: _v, patientId: _p, ...rest } = body;
  return rest;
}

function resolveAkScenario(body: Record<string, unknown>): TherapyFitAkScenario {
  if (isAkScenario(body.scenario)) return body.scenario;
  const h = body.post_H_clean;
  if (typeof h === 'number' && h > 1.0165) return 'door2';
  return 'day0';
}

/**
 * POST /api/live/therapy-fit
 * Proxies therapy-fit bundle (default) or v4 score when body.useV4 === true.
 * AK ovarian: `scenario: "day0"` → `{}` L1 base; `scenario: "door2"` → EOC153 post-NACT RNA fields.
 * Offline: 200 + { live: false, badge, snapshot } — never masquerade static as live.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const caseId = isCaseId(body.caseId) ? body.caseId : 'ovarian';
  const useV4 = Boolean(body.useV4);
  const base = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';

  const akScenario = caseId === 'ovarian' ? resolveAkScenario(body) : 'day0';
  const snapshot = therapyFitSnapshot(caseId, caseId === 'ovarian' ? akScenario : undefined);

  const snap = snapshot as { patientId?: string };
  const patientId =
    typeof body.patientId === 'string' ? body.patientId : snap.patientId ?? 'AK';

  const upstream = useV4
    ? `${base}/api/ayesha/therapy-fit/v4/score`
    : `${base}/api/ayesha/therapy-fit/bundle`;

  const query = useV4 ? '' : THERAPY_FIT_BUNDLE_QUERY;

  let payload: Record<string, unknown>;
  if (useV4) {
    payload = body;
  } else if (caseId === 'ovarian' && !body.tier2_rna && Object.keys(stripProxyFields(body)).length === 0) {
    payload = { ...THERAPY_FIT_AK_REQUEST[akScenario] };
  } else if (caseId === 'ovarian' && isAkScenario(body.scenario)) {
    payload = { ...THERAPY_FIT_AK_REQUEST[body.scenario], ...stripProxyFields(body) };
  } else {
    payload = {
      ...stripProxyFields(body),
      patient_id: body.patient_id ?? body.patientId ?? patientId,
    };
  }

  return proxyPostJson(`${upstream}${query}`, payload, snapshot);
}

/** GET — health/fallback probe: always returns snapshot envelope without calling upstream. */
export async function GET(request: NextRequest) {
  const scenarioParam = request.nextUrl.searchParams.get('scenario');
  const scenario = scenarioParam === 'door2' ? 'door2' : 'day0';
  const snapshot = therapyFitSnapshot('ovarian', scenario);
  return NextResponse.json({
    live: false,
    badge: 'VERIFIED SNAPSHOT (Backend offline)',
    reason: 'probe_only',
    snapshot,
  });
}