'use client';

/**
 * persona-content.tsx — PersonaCopyDeck<T> + <PersonaContent> + <PersonaGate>
 *
 * Foundation W3/W4/W5 depend on. Every user-facing block gets 3 explicit,
 * hand-authored copies (oncologist / patient / pharma), read from the same
 * PersonaContext value. This is the layer between "raw data + registry" and
 * "what a visitor actually sees on screen".
 *
 * NOT a translation layer. Each deck is authored, versioned, and grep-able.
 *
 * SOURCE: Fahad Kiani directive 2026-07-10 — "each persona switch changes
 * content, not just filters visibility".
 */

import { type ReactNode } from 'react';
import { usePersona, type Persona } from './PersonaContext';

// ─── deck primitive ────────────────────────────────────────────────────────

export type PersonaCopyDeck<T = string> = Record<Persona, T>;

/**
 * Optional deck — if a persona has null, that persona sees nothing.
 * Use for "pharma-only" or "oncologist-only" blocks.
 */
export type PersonaOptionalDeck<T = string> = Partial<Record<Persona, T>>;

// ─── hooks ────────────────────────────────────────────────────────────────

/**
 * Pull the persona-matched entry from a deck. Returns the deck value directly.
 * Non-null unless deck is a PersonaOptionalDeck with missing entries.
 */
export function usePersonaContent<T>(deck: PersonaCopyDeck<T>): T;
export function usePersonaContent<T>(deck: PersonaOptionalDeck<T>): T | undefined;
export function usePersonaContent<T>(
  deck: PersonaCopyDeck<T> | PersonaOptionalDeck<T>,
): T | undefined {
  const { persona } = usePersona();
  return (deck as PersonaOptionalDeck<T>)[persona];
}

// ─── renderer components ──────────────────────────────────────────────────

interface PersonaContentProps<T> {
  deck: PersonaCopyDeck<T> | PersonaOptionalDeck<T>;
  render: (copy: T) => ReactNode;
  fallback?: ReactNode;
}

/**
 * Render the persona-matched entry through a custom renderer.
 *
 * Example:
 *   <PersonaContent
 *     deck={INTRO}
 *     render={(copy) => <p className="text-lg">{copy}</p>}
 *   />
 */
export function PersonaContent<T>({ deck, render, fallback = null }: PersonaContentProps<T>) {
  const copy = usePersonaContent(deck as PersonaOptionalDeck<T>);
  if (copy === undefined || copy === null) return <>{fallback}</>;
  return <>{render(copy)}</>;
}

/**
 * Convenience: render a string deck as a plain fragment.
 * Common case where you just want the persona-matched text inline.
 */
export function PersonaText({
  deck,
  fallback = '',
}: {
  deck: PersonaCopyDeck<string> | PersonaOptionalDeck<string>;
  fallback?: string;
}) {
  const copy = usePersonaContent(deck as PersonaOptionalDeck<string>);
  return <>{copy ?? fallback}</>;
}

// ─── gate ─────────────────────────────────────────────────────────────────

interface PersonaGateProps {
  show: Persona | Persona[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Render children only when current persona is in the allow-list.
 *
 * Example:
 *   <PersonaGate show="pharma">
 *     <PortfolioComparatorMatrix />
 *   </PersonaGate>
 *
 *   <PersonaGate show={['oncologist', 'pharma']}>
 *     <TechnicalDetails />
 *   </PersonaGate>
 */
export function PersonaGate({ show, children, fallback = null }: PersonaGateProps) {
  const { persona } = usePersona();
  const allow = Array.isArray(show) ? show : [show];
  if (!allow.includes(persona)) return <>{fallback}</>;
  return <>{children}</>;
}

// ─── helpers ──────────────────────────────────────────────────────────────

/**
 * Build a deck where all three personas share the same value.
 * Use sparingly — the whole point is per-persona copy, not identical text.
 * Legitimate use: shared numeric literals or invariant labels.
 */
export function samePersonaDeck<T>(value: T): PersonaCopyDeck<T> {
  return { oncologist: value, patient: value, pharma: value };
}

/**
 * Compose two decks per-persona (useful for prefixing / suffixing).
 */
export function combinePersonaDecks(
  a: PersonaCopyDeck<string>,
  b: PersonaCopyDeck<string>,
  separator = ' ',
): PersonaCopyDeck<string> {
  return {
    oncologist: `${a.oncologist}${separator}${b.oncologist}`,
    patient: `${a.patient}${separator}${b.patient}`,
    pharma: `${a.pharma}${separator}${b.pharma}`,
  };
}

// ─── re-exports ───────────────────────────────────────────────────────────

export type { Persona } from './PersonaContext';
export { usePersona } from './PersonaContext';
