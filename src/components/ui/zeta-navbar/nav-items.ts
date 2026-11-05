/**
 * Top-level Zeta navigation.
 * Dropdowns: PRODUCTS (brochure hub + 3 workspaces), RESEARCH.
 * Everything else is a first-class capability / utility item.
 * Persona-aware (oncologist / patient / pharma) — items are filtered by the
 * persona from PersonaContext.
 *
 * PRODUCTS vs live surfaces:
 * - `/products/interception|insilico-trials|tumor-board/` = flagship product workspaces
 * - `/tumor-board/` = demo fixture picker; `/tumor-board/[id]/ = same TB surface (live)
 * - `/engine/*` = L1 engines (e.g. Target Lock) under products
 *
 * One-liners: product_truth/AGENT_SOURCE.md (Interception / IST / Tumor Board).
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

/** Brochure product doors — AGENT_SOURCE one-liners. Not engine routes. */
const productsDropdown: NavDropdownItem[] = [
  {
    label: 'Interception',
    description: 'Discover the next metastasis target worth testing.',
    href: '/products/interception/',
    accent: 'cyan',
  },
  {
    label: 'In-Silico Trials',
    description: 'Score who responds — before the trial starts.',
    href: '/products/insilico-trials/',
    accent: 'amber',
  },
  {
    label: 'Tumor Board',
    description: 'Rank the options for this case. Rule out the mismatches.',
    href: '/products/tumor-board/',
    accent: 'indigo',
  },
];

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
 * PRODUCTS leads: brochure doors for the three workspaces. Live engines
 * (Target Lock / MOA Align / SL Engine) and live Tumor Board stay as
 * capability links — engines are not products.
 */
export function buildTopNavItems(
  abstracts: AbstractNavItem[] = [],
  persona: Persona = 'oncologist',
): NavTopItem[] {
  const all: NavTopItem[] = [
    {
      id: 'products',
      label: 'PRODUCTS',
      href: '/products/',
      dropdownItems: productsDropdown,
      personas: ['oncologist', 'patient', 'pharma'],
    },
    { id: 'tumor-board', label: 'TUMOR BOARD', href: '/tumor-board/',                     personas: ['oncologist', 'patient', 'pharma'] },
    {
      id: 'engines',
      label: 'ENGINES',
      href: '/engine/target-lock/',
      personas: ['oncologist', 'pharma'],
      dropdownItems: [
        {
          label: 'Target Lock',
          description: 'Is this a real driver for this biology?',
          href: '/engine/target-lock/',
          accent: 'cyan',
        },
        {
          label: 'MOA Align',
          description: 'Does the mechanism fit this profile?',
          href: '/engine/mechanism-alignment/',
          accent: 'amber',
        },
        {
          label: 'SL Engine',
          description: 'What does this tumor depend on?',
          href: '/engine/synthetic-lethality/',
          accent: 'indigo',
        },
      ],
    },
    { id: 'my-trials',   label: 'MY TRIALS',   href: '/ledger/?persona=patient',          personas: ['patient'] },
    { id: 'understand',  label: 'UNDERSTAND',  href: '/engine/target-lock/?persona=patient', personas: ['patient'] },
    { id: 'ledger',      label: 'LEDGER',      href: '/ledger/',                          personas: ['oncologist', 'pharma'] },
    { id: 'pipeline',    label: 'PIPELINE',    href: '/pipeline/',                        personas: ['pharma'] },
    { id: 'governance',  label: 'GOVERNANCE',  href: '/governance/',                      personas: ['pharma'] },
    // RESEARCH: desktop keeps section dropdown. Mobile flattens hub-only (ZetaMobileDrawer).
    { id: 'research',    label: 'RESEARCH',    href: '/research/',
      dropdownItems: buildResearchDropdown(abstracts),                                    personas: ['oncologist', 'patient', 'pharma'] },
    { id: 'demos',       label: 'DEMOS',       href: '/demo/',                            personas: ['oncologist', 'patient', 'pharma'] },
    // CONTACT lives in toolbar CTA — keep out of the link row to stop wrap/overlap
    { id: 'org',         label: 'ORG',         href: 'https://crispro.org/', external: true,
                                                                                          personas: ['oncologist', 'patient', 'pharma'] },
  ];
  return all.filter((item) => !item.personas || item.personas.includes(persona));
}

/** Static fallback before client feed loads. */
export const TOP_NAV_ITEMS: NavTopItem[] = buildTopNavItems();
