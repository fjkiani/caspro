import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { GATED_LEDGER_TRIAL_SLUGS, isGatedLedgerTrial } from '@/data/trial-gate';

export const TRIAL_GATE_COOKIE = 'crispro_trial_gate';

const TOKEN_VERSION = 1;
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

type GateTokenPayload = {
  v: number;
  exp: number;
  /** '*' unlocks every gated trial slug */
  scope: '*' | string[];
};

type CookieStore = Pick<ReadonlyRequestCookies, 'get'> | Pick<RequestCookies, 'get'>;

/** Local dev only — production must set TRIAL_RECEIPT_PASSCODE. */
const DEV_FALLBACK_PASSCODE = 'curecancer';

function getSigningSecret(): string | null {
  const gateSecret = process.env.TRIAL_GATE_SECRET?.trim();
  if (gateSecret) return gateSecret;
  return getTrialReceiptPasscode();
}

export function getTrialReceiptPasscode(): string | null {
  const configured = process.env.TRIAL_RECEIPT_PASSCODE?.trim();
  if (configured) return configured;
  if (process.env.NODE_ENV !== 'production') return DEV_FALLBACK_PASSCODE;
  return null;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string): Uint8Array | null {
  try {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/');
    const padLen = (4 - (padded.length % 4)) % 4;
    const binary = atob(padded + '='.repeat(padLen));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

async function signPayload(payload: GateTokenPayload, secret: string): Promise<string> {
  const body = JSON.stringify(payload);
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  return `${toBase64Url(new TextEncoder().encode(body))}.${toBase64Url(new Uint8Array(sig))}`;
}

async function verifyToken(token: string, secret: string): Promise<GateTokenPayload | null> {
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;

  const bodyPart = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);
  const bodyBytes = fromBase64Url(bodyPart);
  const sigBytes = fromBase64Url(sigPart);
  if (!bodyBytes || !sigBytes) return null;

  const body = new TextDecoder().decode(bodyBytes);
  const key = await importHmacKey(secret);
  const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(body));
  if (!valid) return null;

  let payload: GateTokenPayload;
  try {
    payload = JSON.parse(body) as GateTokenPayload;
  } catch {
    return null;
  }

  if (payload.v !== TOKEN_VERSION || typeof payload.exp !== 'number') return null;
  if (Date.now() > payload.exp) return null;
  if (payload.scope !== '*' && !Array.isArray(payload.scope)) return null;

  return payload;
}

function payloadAllowsSlug(payload: GateTokenPayload, slug: string): boolean {
  const normalized = slug.trim().toLowerCase();
  if (payload.scope === '*') return isGatedLedgerTrial(normalized);
  return payload.scope.map((s) => s.trim().toLowerCase()).includes(normalized);
}

export async function createTrialGateToken(): Promise<string | null> {
  const secret = getSigningSecret();
  if (!secret) return null;

  const payload: GateTokenPayload = {
    v: TOKEN_VERSION,
    exp: Date.now() + TOKEN_TTL_MS,
    scope: '*',
  };

  return signPayload(payload, secret);
}

export async function isTrialGateAuthorized(
  cookieStore: CookieStore,
  slug: string,
): Promise<boolean> {
  if (!isGatedLedgerTrial(slug)) return true;

  const secret = getSigningSecret();
  if (!secret) return false;

  const raw = cookieStore.get(TRIAL_GATE_COOKIE)?.value;
  if (!raw) return false;

  const payload = await verifyToken(raw, secret);
  if (!payload) return false;

  return payloadAllowsSlug(payload, slug);
}

export function trialGateCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: TOKEN_TTL_MS / 1000,
  };
}

/** Paths that must never be served without a valid gate cookie. */
export function parseGatedProofSlug(pathname: string): string | null {
  const match = pathname.match(/^\/proof\/([^/]+)(?:\/case)?\/?$/i);
  if (!match?.[1]) return null;
  const slug = match[1].trim().toLowerCase();
  return isGatedLedgerTrial(slug) ? slug : null;
}

export { GATED_LEDGER_TRIAL_SLUGS };
