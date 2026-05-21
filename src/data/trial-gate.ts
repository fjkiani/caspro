/** Trials that require passcode before opening ledger receipt or hero slide. */

/** All ledger trial receipts require passcode before open (hero dock, nav, /ledger routes). */
export const GATED_LEDGER_TRIAL_SLUGS = [
  'ceacam5',
  'latify',
  'capri',
  'adavosertib',
  'berzosertib',
] as const;

export type GatedLedgerTrialSlug = (typeof GATED_LEDGER_TRIAL_SLUGS)[number];

const GATED_SET = new Set<string>(GATED_LEDGER_TRIAL_SLUGS);

export function isGatedLedgerTrial(slug: string | undefined | null): boolean {
  if (!slug) return false;
  return GATED_SET.has(slug.trim().toLowerCase());
}

const STORAGE_PREFIX = 'crispro:trial-gate:';

export function trialGateStorageKey(slug: string): string {
  return `${STORAGE_PREFIX}${slug.trim().toLowerCase()}`;
}

export function isTrialGateUnlocked(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(trialGateStorageKey(slug)) === '1';
}

export function unlockTrialGate(slug: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(trialGateStorageKey(slug), '1');
}

/** Persist unlock from a post-passcode destination URL. */
export function unlockTrialGateFromUrl(url: string): void {
  const match = url.match(/\/ledger\/([^/]+)/i);
  if (match?.[1]) unlockTrialGate(match[1]);
}
