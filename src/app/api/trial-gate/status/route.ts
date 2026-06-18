import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { isGatedLedgerTrial } from '@/data/trial-gate';
import { isTrialGateAuthorized } from '@/lib/trial-gate-server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug')?.trim().toLowerCase() ?? '';

  if (!slug || !isGatedLedgerTrial(slug)) {
    return NextResponse.json({ unlocked: true });
  }

  const unlocked = await isTrialGateAuthorized(cookies(), slug);
  return NextResponse.json({ unlocked });
}
