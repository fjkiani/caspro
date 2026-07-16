/**
 * persona-copy-guards.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Runtime invariant enforcement for PersonaCopyDeck substrates.
 *
 * Every persona-scoped copy block in this app has a set of things it is NOT
 * allowed to lose during rewrite:
 *   - Governance tokens (formula, quarantines, downgrades, PATH B forbidden)
 *   - Numeric receipts (delta numbers, IDs, DOIs, NCT IDs)
 *   - Drug/target/biomarker names (PARP1, MBD4, mFOLFOX6, Berzosertib, etc.)
 *
 * These guards fire at MODULE LOAD (not at render). If any persona variant of
 * a deck is missing a declared invariant, the app fails fast in dev, and the
 * caspro-lint governance gate mirrors the same rule at build time (so the
 * failure lands as a lint failure in CI, not just runtime).
 *
 * Usage:
 *
 *   import { assertInvariants, assertNumericParity, assertNameParity } from '@/lib/persona-copy-guards';
 *
 *   const HEADER_DECK: PersonaCopyDeck<{...}> = { oncologist: {...}, patient: {...}, pharma: {...} };
 *
 *   assertInvariants(HEADER_DECK, {
 *     deck: 'LedgerMainPage.HEADER_DECK',
 *     tokens: ['PATH A', '42'],           // formula/quarantine/downgrade invariants
 *   });
 *   assertNumericParity(HEADER_DECK, {
 *     deck: 'LedgerMainPage.HEADER_DECK',
 *     numbers: ['42', '17', '6'],
 *   });
 *   assertNameParity(HEADER_DECK, {
 *     deck: 'LedgerMainPage.HEADER_DECK',
 *     names: [],   // no drug names in this deck
 *   });
 *
 * IMPORTANT: these guards throw in development but only warn in production
 * (so a runtime miss never bricks a live user session). caspro-lint is the
 * production gate — if it goes green, the runtime guard should never fire.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Persona } from '@/context/PersonaContext';

const PERSONAS: Persona[] = ['oncologist', 'patient', 'pharma'];
const IS_PROD = process.env.NODE_ENV === 'production';

type AnyDeck = Record<Persona, unknown>;

interface GuardOpts {
  /** Human-readable deck identifier used in error messages, e.g. 'LedgerMainPage.HEADER_DECK'. */
  deck: string;
}

interface InvariantOpts extends GuardOpts {
  /** Substrings every persona variant must contain (case-insensitive, whole-string search). */
  tokens: string[];
}

interface NumericOpts extends GuardOpts {
  /** Numeric strings (e.g. '0.138', '42', 'NCT02264678') every variant must expose. */
  numbers: string[];
}

interface NameOpts extends GuardOpts {
  /** Drug / target / biomarker names every variant must preserve verbatim. */
  names: string[];
}

/** Recursively pull every string leaf out of an object. */
function collectStrings(value: unknown, acc: string[] = []): string[] {
  if (typeof value === 'string') {
    acc.push(value);
    return acc;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, acc);
    return acc;
  }
  if (value && typeof value === 'object') {
    for (const v of Object.values(value)) collectStrings(v, acc);
    return acc;
  }
  return acc;
}

function fail(deck: string, persona: Persona, kind: string, missing: string[]): never | void {
  const msg = `[persona-copy-guards] ${deck} · ${persona} missing ${kind}: ${missing.join(', ')}`;
  if (IS_PROD) {
    // Never block a live user session on a runtime guard — that would be worse UX than the drift.
    // eslint-disable-next-line no-console
    console.warn(msg);
    return;
  }
  throw new Error(msg);
}

/**
 * Assert that every persona variant of `deck` contains every string in `opts.tokens`
 * (case-insensitive substring match on the concatenation of all leaves in that variant).
 */
export function assertInvariants(deck: AnyDeck, opts: InvariantOpts): void {
  const lowered = opts.tokens.map((t) => t.toLowerCase());
  for (const persona of PERSONAS) {
    const strings = collectStrings(deck[persona]).join(' \u0001 ').toLowerCase();
    const missing = opts.tokens.filter((_, i) => !strings.includes(lowered[i]));
    if (missing.length > 0) fail(opts.deck, persona, 'invariant tokens', missing);
  }
}

/**
 * Assert numeric-receipt parity: every declared number must appear verbatim in every
 * persona variant. Numbers are checked as substrings (so '0.138' catches 'Berzosertib 0.138').
 */
export function assertNumericParity(deck: AnyDeck, opts: NumericOpts): void {
  for (const persona of PERSONAS) {
    const strings = collectStrings(deck[persona]).join(' \u0001 ');
    const missing = opts.numbers.filter((n) => !strings.includes(n));
    if (missing.length > 0) fail(opts.deck, persona, 'numeric receipts', missing);
  }
}

/**
 * Assert name parity: every drug / target / biomarker name in `opts.names` must appear
 * verbatim (case-sensitive) in every persona variant.
 */
export function assertNameParity(deck: AnyDeck, opts: NameOpts): void {
  for (const persona of PERSONAS) {
    const strings = collectStrings(deck[persona]).join(' \u0001 ');
    const missing = opts.names.filter((n) => !strings.includes(n));
    if (missing.length > 0) fail(opts.deck, persona, 'name parity', missing);
  }
}

/**
 * Convenience helper: apply all three checks in one call. Prefer this at the module top
 * where every deck lives so the guard configuration is co-located with the deck literal.
 */
export function assertPersonaDeck(
  deck: AnyDeck,
  opts: {
    deck: string;
    invariants?: string[];
    numbers?: string[];
    names?: string[];
  },
): void {
  if (opts.invariants && opts.invariants.length > 0) {
    assertInvariants(deck, { deck: opts.deck, tokens: opts.invariants });
  }
  if (opts.numbers && opts.numbers.length > 0) {
    assertNumericParity(deck, { deck: opts.deck, numbers: opts.numbers });
  }
  if (opts.names && opts.names.length > 0) {
    assertNameParity(deck, { deck: opts.deck, names: opts.names });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// personaField — sidecar-in-place lookup for registry-shaped entries.
//
// Pattern: each registry entry keeps its existing English fields, and
// optionally carries a `personaCopy?: Partial<Record<Persona, Partial<T>>>`
// sibling that lists ONLY the string fields that should differ per persona.
// personaField(entry, key, persona) returns the persona variant when present
// and the English default otherwise. Non-breaking: existing entries without
// personaCopy render exactly as before.
//
// This is the workhorse for the "retrofit registries in place" strategy —
// components change one line per string:
//     {cap.oneLiner}
// becomes
//     {personaField(cap, 'oneLiner', persona)}
// and the migration proceeds field-by-field without a big-bang refactor.
// ─────────────────────────────────────────────────────────────────────────────
export type PersonaOverlay<T> = Partial<Record<Persona, Partial<T>>>;

export interface WithPersonaCopy<T> {
  personaCopy?: PersonaOverlay<T>;
}

export function personaField<T, K extends keyof T>(
  entry: T & WithPersonaCopy<T>,
  key: K,
  persona: Persona,
): T[K] {
  const overlay = entry.personaCopy?.[persona];
  if (overlay && key in overlay) {
    const val = overlay[key as keyof typeof overlay];
    // Only override with defined values; undefined means "no persona variant, use English".
    if (val !== undefined && val !== null) {
      return val as T[K];
    }
  }
  return entry[key];
}

/**
 * Assert registry-overlay parity: every declared persona variant of `entry.personaCopy`
 * MUST carry a value for every key in `keys`. Missing keys mean a persona surface is
 * silently falling back to English — the guard forces the author to declare it explicitly.
 *
 * This is looser than assertInvariants (which enforces cross-persona token parity on a
 * PersonaCopyDeck); this one just enforces "if you opened a persona variant, you named
 * every field you claimed to override".
 */
export function assertPersonaOverlay<T>(
  entry: T & WithPersonaCopy<T>,
  opts: { deck: string; keys: (keyof T)[]; requiredPersonas?: Persona[] },
): void {
  const requiredPersonas = opts.requiredPersonas ?? PERSONAS;
  const overlays = entry.personaCopy;
  if (!overlays) return; // no overlay declared = English-only entry; caller opted out.
  for (const persona of requiredPersonas) {
    const bag = overlays[persona];
    if (!bag) continue; // this persona has no overlay at all — that's a caller choice, not drift.
    const missing = opts.keys.filter((k) => bag[k] === undefined || bag[k] === null);
    if (missing.length > 0) {
      fail(opts.deck, persona, 'overlay keys', missing.map(String));
    }
  }
}
