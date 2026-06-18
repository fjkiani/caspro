import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  isTrialGateAuthorized,
  parseGatedProofSlug,
} from '@/lib/trial-gate-server';

export async function middleware(request: NextRequest) {
  const slug = parseGatedProofSlug(request.nextUrl.pathname);
  if (!slug) return NextResponse.next();

  const authorized = await isTrialGateAuthorized(request.cookies, slug);
  if (authorized) return NextResponse.next();

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/ledger/${slug}/`;
  redirectUrl.searchParams.set('locked', '1');
  redirectUrl.searchParams.set(
    'next',
    request.nextUrl.pathname.endsWith('/')
      ? request.nextUrl.pathname
      : `${request.nextUrl.pathname}/`,
  );

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/proof/:trialId', '/proof/:trialId/', '/proof/:trialId/case', '/proof/:trialId/case/'],
};
