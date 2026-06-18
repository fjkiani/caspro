import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import {
  createTrialGateToken,
  getTrialReceiptPasscode,
  trialGateCookieOptions,
  TRIAL_GATE_COOKIE,
} from '@/lib/trial-gate-server';

function passcodesMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided.trim().toLowerCase());
  const b = Buffer.from(expected.trim().toLowerCase());
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const expected = getTrialReceiptPasscode();
  if (!expected) {
    return NextResponse.json({ ok: false, error: 'gate_unconfigured' }, { status: 503 });
  }

  let body: { code?: string };
  try {
    body = (await request.json()) as { code?: string };
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  const code = typeof body.code === 'string' ? body.code : '';
  if (!code || !passcodesMatch(code, expected)) {
    return NextResponse.json({ ok: false, error: 'invalid_code' }, { status: 401 });
  }

  const token = await createTrialGateToken();
  if (!token) {
    return NextResponse.json({ ok: false, error: 'gate_unconfigured' }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(TRIAL_GATE_COOKIE, token, trialGateCookieOptions());
  return response;
}
