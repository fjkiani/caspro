/**
 * Top-level Zeta navigation.
 * Dropdowns: Research, Abstracts (dynamic), Ledger, Engines.
 */

import { RESEARCH_SECTIONS } from '@/lib/research/paths';
import { TRIAL_LEDGER_ENTRIES } from '@/data/trial-ledger-registry';
import { isGatedLedgerTrial } from '@/data/trial-gate';
import { getProductEngines, productMenuTitle } from './product-engines';
import type { AbstractNavItem } from '@/lib/docs/hygraph/research-abstract-queries';

export interface NavDropdownItem {
  label: string;
  description?: string;
  href: string;
  accent?: 'cyan' | 'amber' | 'indigo';
  /** Open in new tab (external Scholar / journal links). */
  external?: boolean;
  /** Ledger receipt — requires passcode before navigate */
  gated?: boolean;
}

export interface NavTopItem {
  id: string;
  label: string;
  href: string;
  dropdownItems?: NavDropdownItem[];
}

const researchDropdown: NavDropdownItem[] = [
  {
    label: 'Blog',
    description: 'Articles & series',
    href: '/research/blog/',
    accent: 'indigo',
  },
  {
    label: 'Manuscripts',
    description: 'Long-form PDFs from Hygraph',
    href: '/research/manuscripts/',
    accent: 'indigo',
  },
  {
    label: 'Decks',
    description: 'Slide decks & programmatic posters',
    href: '/research/decks/',
    accent: 'cyan',
  },
];

const ledgerDropdown: NavDropdownItem[] = [
  {
    label: 'Ledger hub',
    description: 'Former Target Validation / Resistance / MoA pages',
    href: '/ledger/',
    accent: 'cyan',
  },
  ...TRIAL_LEDGER_ENTRIES.map((entry) => ({
    label: `${entry.label} // ${entry.sublabel}`,
    description: `${entry.route.replace(/\/$/, '')}${entry.legacyRoutes[0] ? ` · was ${entry.legacyRoutes[0]}` : ''}`,
    href: entry.route,
    accent: entry.preview === 'target-lock' ? 'cyan' : entry.preview === 'kill-chain' ? 'amber' : 'indigo',
    gated: isGatedLedgerTrial(entry.slug),
  })),
];

const engineDropdown: NavDropdownItem[] = getProductEngines().map((engine) => ({
  label: productMenuTitle(engine),
  description: engine.desc,
  href: engine.route,
  accent: 'cyan' as const,
}));

function truncateTitle(title: string, max = 52): string {
  const t = title.trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

function buildAbstractsDropdown(abstracts: AbstractNavItem[]): NavDropdownItem[] {
  const hub: NavDropdownItem = {
    label: 'All abstracts',
    description: 'Conference abstracts index',
    href: RESEARCH_SECTIONS.abstracts,
    accent: 'amber',
  };

  const entries = abstracts.map((ab) => ({
    label: truncateTitle(ab.title),
    description: ab.description,
    href: ab.href,
    accent: 'amber' as const,
    external: ab.href.startsWith('http'),
  }));

  return [hub, ...entries];
}

/** Build nav with live abstract list from Hygraph (client: pass feed from useZetaNavFeed). */
export function buildTopNavItems(abstracts: AbstractNavItem[] = []): NavTopItem[] {
  return [
    {
      id: 'research',
      label: 'RESEARCH',
      href: '/research/',
      dropdownItems: researchDropdown,
    },
    {
      id: 'abstracts',
      label: 'ABSTRACTS',
      href: RESEARCH_SECTIONS.abstracts,
      dropdownItems: buildAbstractsDropdown(abstracts),
    },
    {
      id: 'ledger',
      label: 'LEDGER',
      href: '/ledger/',
      dropdownItems: ledgerDropdown,
    },
    {
      id: 'engines',
      label: 'ENGINES',
      href: '/engine/',
      dropdownItems: engineDropdown,
    },
  ];
}

/** Static fallback before client feed loads. */
export const TOP_NAV_ITEMS: NavTopItem[] = buildTopNavItems();
