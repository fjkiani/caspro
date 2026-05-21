/**
 * Top-level Zeta navigation.
 * Dropdowns: Research (content types), Ledger (decoded trials), Engines (platform engines).
 */

import { ROUTES } from '@/constants/routes';
import { TRIAL_LEDGER_ENTRIES } from '@/data/trial-ledger-registry';
import { getProductEngines, productMenuTitle } from './product-engines';

export interface NavDropdownItem {
  label: string;
  description?: string;
  href: string;
  accent?: 'cyan' | 'amber' | 'indigo';
}

export interface NavTopItem {
  id: string;
  label: string;
  href: string;
  /** Empty = plain link. Populated = dropdown panel. */
  dropdownItems?: NavDropdownItem[];
}

const researchDropdown: NavDropdownItem[] = [
  {
    label: 'Decks',
    description: 'Slide decks & programmatic posters',
    href: '/research/?tab=decks',
    accent: 'cyan',
  },
  {
    label: 'Manuscripts',
    description: 'Long-form PDFs from Hygraph',
    href: ROUTES.MANUSCRIPTS,
    accent: 'indigo',
  },
  {
    label: 'Blog',
    description: 'Articles & news',
    href: `${ROUTES.BLOG}/`,
    accent: 'indigo',
  },
  {
    label: 'Abstracts',
    description: 'Conference abstracts (Hygraph — coming soon)',
    href: '/research/?tab=abstracts',
    accent: 'amber',
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
  })),
];

const engineDropdown: NavDropdownItem[] = getProductEngines().map((engine) => ({
  label: productMenuTitle(engine),
  description: engine.desc,
  href: engine.route,
  accent: 'cyan' as const,
}));

export const TOP_NAV_ITEMS: NavTopItem[] = [
  {
    id: 'research',
    label: 'RESEARCH',
    href: '/research/',
    dropdownItems: researchDropdown,
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
    href: '/engine/target-lock/',
    dropdownItems: engineDropdown,
  },
];
