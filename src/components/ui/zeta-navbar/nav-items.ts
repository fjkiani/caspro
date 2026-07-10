/**
 * Top-level Zeta navigation — flat 6-item capability nav (no dropdowns).
 * Rewritten 2026-07-10 per W4 directive.
 *
 * Capabilities (in order):
 *   TARGET LOCK   →  /engine/target-lock/           (L1: BrM cascade intro)
 *   MOA ALIGN     →  /engine/mechanism-alignment/   (L2: Mechanism/PARP-arc receipt)
 *   SL ENGINE     →  /engine/synthetic-lethality/   (L3: synthetic lethal targets)
 *   TUMOR BOARD   →  /tumor-board/                  (L4: physician case surface)
 *   LEDGER        →  /ledger/                       (Trial receipts)
 *   ORG           →  https://crispro.org/           (Organization site)
 *
 * Research / Abstracts / Governance / Pipeline are still first-class routes,
 * still linked from the mobile drawer's sitemap block, and still reachable by
 * direct URL and via footer. They are intentionally out of the primary nav.
 *
 * The AbstractNavItem/HAND_AUTHORED_TRIAL_LEDGER_ENTRIES/getProductEngines
 * feeds are preserved as unused imports below to make future re-enable easy;
 * remove if the exports become genuinely dead.
 */

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
  /** Opens in a new tab (e.g. crispro.org). */
  external?: boolean;
}

/**
 * Secondary sitemap surfaced in the mobile drawer only — desktop stays strictly flat.
 * Keeps Research/Abstracts/Governance/Pipeline reachable without adding dropdowns.
 */
export interface NavSitemapItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}
export const SITEMAP_ITEMS: NavSitemapItem[] = [
  { id: 'research', label: 'RESEARCH', href: '/research/', description: 'Blog · manuscripts · decks' },
  { id: 'abstracts', label: 'ABSTRACTS', href: '/research/abstracts/', description: 'Conference abstracts' },
  { id: 'governance', label: 'GOVERNANCE', href: '/governance/', description: 'Formula · policies · receipts' },
  { id: 'pipeline', label: 'PIPELINE', href: '/pipeline/', description: 'Programs · gate status' },
];

/** Build nav with live abstract list from Hygraph. `abstracts` accepted for backward-compat; unused in flat nav. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildTopNavItems(_abstracts: AbstractNavItem[] = []): NavTopItem[] {
  return [
    {
      id: 'target-lock',
      label: 'TARGET LOCK',
      href: '/engine/target-lock/',
    },
    {
      id: 'moa-align',
      label: 'MOA ALIGN',
      href: '/engine/mechanism-alignment/',
    },
    {
      id: 'sl-engine',
      label: 'SL ENGINE',
      href: '/engine/synthetic-lethality/',
    },
    {
      id: 'tumor-board',
      label: 'TUMOR BOARD',
      href: '/tumor-board/',
    },
    {
      id: 'ledger',
      label: 'LEDGER',
      href: '/ledger/',
    },
    {
      id: 'org',
      label: 'ORG',
      href: 'https://crispro.org/',
      external: true,
    },
  ];
}

/** Static fallback before client feed loads (also the runtime source of truth in flat mode). */
export const TOP_NAV_ITEMS: NavTopItem[] = buildTopNavItems();
