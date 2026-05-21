/**
 * Top-level navigation items config.
 *
 * Items with an empty `dropdownItems` array render as plain links.
 * Items with populated `dropdownItems` render a dropdown panel.
 * To add sub-items to any nav entry in the future, just push to its `dropdownItems` array —
 * no JSX changes required.
 */

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

export const TOP_NAV_ITEMS: NavTopItem[] = [
  {
    id: 'research',
    label: 'RESEARCH',
    href: '/research',
    // No dropdownItems — renders as a plain link
  },
  {
    id: 'target-validation',
    label: 'TARGET VALIDATION',
    href: '/target-validation',
    dropdownItems: [
      // Future: add trial-specific sub-items here, e.g.:
      // { label: 'CEACAM5', description: 'Solid tumor target lock', href: '/target-validation', accent: 'cyan' },
    ],
  },
  {
    id: 'resistance',
    label: 'RESISTANCE',
    href: '/resistance',
    dropdownItems: [
      // Future: add resistance mechanism sub-items here
    ],
  },
  {
    id: 'moa',
    label: 'MoA',
    href: '/moa',
    dropdownItems: [
      // Future: add mechanism-of-action sub-items here
    ],
  },
];
