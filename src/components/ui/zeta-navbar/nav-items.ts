/**
 * Top-level Zeta navigation.
 * Single dropdown: RESEARCH. Everything else is a first-class capability item.
 * Persona-aware (oncologist / patient / pharma) — items are filtered by the
 * persona from PersonaContext.
 *
 * SOURCE: user request 2026-07-10 — persona-aware nav + W4 flat capability shift.
 *
 * ─── W3 reconciliation note ────────────────────────────────────────────────
 * `/proof/*` was hard-deleted 2026-07-10 in the target-lock cleanup (308
 * redirects in next.config.js → `/ledger/`). PROOF is therefore INTENTIONALLY
 * absent from this nav: the durable trial-receipts surface is `/ledger/`,
 * and adding a nav item that only 308-bounces the user through a retired
 * route would create a confusing dead-end. If PROOF returns as a distinct
 * surface it must be re-added here.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { RESEARCH_SECTIONS } from '@/lib/research/paths';
import type { AbstractNavItem } from '@/lib/docs/hygraph/research-abstract-queries';
import type { Persona } from '@/context/PersonaContext';

export interface NavDropdownItem {
  label: string;
  description?: string;
  href: string;
  accent?: 'cyan' | 'amber' | 'indigo';
  external?: boolean;
  gated?: boolean;
}

export interface NavTopItem {
  id: string;
  label: string;
  href: string;
  dropdownItems?: NavDropdownItem[];
  external?: boolean;
  /** Which personas can see this item. Empty/undefined = all. */
  personas?: Persona[];
}

function truncateTitle(title: string, max = 52): string {
  const t = title.trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

const researchDropdown: NavDropdownItem[] = [
  { label: 'Blog',        description: 'Articles & series',            href: '/research/blog/',           accent: 'indigo' },
  { label: 'Manuscripts', description: 'Long-form PDFs',               href: '/research/manuscripts/',    accent: 'indigo' },
  { label: 'Decks',       description: 'Slide decks',                  href: '/research/decks/',          accent: 'cyan'   },
  { label: 'Abstracts',   description: 'Conference abstracts index',   href: RESEARCH_SECTIONS.abstracts, accent: 'amber'  },
];

function buildResearchDropdown(abstracts: AbstractNavItem[]): NavDropdownItem[] {
  const extra = abstracts.slice(0, 6).map((ab) => ({
    label: truncateTitle(ab.title),
    description: ab.description,
    href: ab.href,
    accent: 'amber' as const,
    external: ab.href.startsWith('http'),
  }));
  return [...researchDropdown, ...extra];
}

/**
 * Build nav. Persona-aware. New top-level items should be added here and
 * tagged with the personas that see them.
 *
 * MOA ALIGN sits alongside Target Lock and SL Engine as an engine capability
 * because the three form the L1/L2/L3 mechanism triad that the tumor board
 * decomposes each trial into.
 */
export function buildTopNavItems(
  abstracts: AbstractNavItem[] = [],
  persona: Persona = 'oncologist',
): NavTopItem[] {
  const all: NavTopItem[] = [
    { id: 'tumor-board', label: 'TUMOR BOARD', href: '/tumor-board/',                     personas: ['oncologist', 'patient', 'pharma'] },
    { id: 'target-lock', label: 'TARGET LOCK', href: '/engine/target-lock/',              personas: ['oncologist', 'pharma'] },
    { id: 'moa-align',   label: 'MOA ALIGN',   href: '/engine/mechanism-alignment/',      personas: ['oncologist', 'pharma'] },
    { id: 'sl-engine',   label: 'SL ENGINE',   href: '/engine/synthetic-lethality/',      personas: ['oncologist', 'pharma'] },
    { id: 'my-trials',   label: 'MY TRIALS',   href: '/ledger/?persona=patient',          personas: ['patient'] },
    { id: 'understand',  label: 'UNDERSTAND',  href: '/engine/target-lock/?persona=patient', personas: ['patient'] },
    { id: 'ledger',      label: 'LEDGER',      href: '/ledger/',                          personas: ['oncologist', 'pharma'] },
    { id: 'pipeline',    label: 'PIPELINE',    href: '/pipeline/',                        personas: ['pharma'] },
    { id: 'governance',  label: 'GOVERNANCE',  href: '/governance/',                      personas: ['pharma'] },
    { id: 'research',    label: 'RESEARCH',    href: '/research/',
      dropdownItems: buildResearchDropdown(abstracts),                                    personas: ['oncologist', 'patient', 'pharma'] },
    { id: 'org',         label: 'ORG',         href: 'https://crispro.org/', external: true,
                                                                                          personas: ['oncologist', 'patient', 'pharma'] },
  ];
  return all.filter((item) => !item.personas || item.personas.includes(persona));
}

/** Static fallback before client feed loads. */
export const TOP_NAV_ITEMS: NavTopItem[] = buildTopNavItems();
