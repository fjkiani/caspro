/**
 * Tumor Board product chrome — short surface copy.
 * Case switcher + evidence: src/data/clinical-case-ui.ts
 */

import { TB_SURFACE_HERO } from '@/data/clinical-case-ui';

export const TB_PRODUCT_HERO = {
  brand: 'CrisPRO',
  title: 'Tumor Board',
  subtitle: TB_SURFACE_HERO.headline,
  tagline: TB_SURFACE_HERO.subhead,
} as const;

export const TB_PRODUCT_CTAS = {
  primary: { label: 'Talk to us', href: '/contact/' },
  secondary: { label: 'Open Tumor Board', href: '/tumor-board/' },
  ledger: { label: 'Public ledger', href: '/ledger/' },
} as const;

export const TB_PRODUCT_BASE = '/products/tumor-board' as const;

export type TbProductTab = 'decision' | 'package' | 'proof' | 'engage';

/** Four tabs: three product surfaces + live runner */
export const TB_PRODUCT_TABS: {
  key: TbProductTab;
  n: string;
  label: string;
  value: string;
  headline: string;
  body: string[];
}[] = [
  {
    key: 'decision',
    n: '01',
    label: 'Cases',
    value: 'Pick ovarian, myeloma, colorectal, or lung CT.',
    headline: 'Pick a case. See the meters.',
    body: ['Metric tiles and case switcher. Evidence stays in Clinical Proof.'],
  },
  {
    key: 'package',
    n: '02',
    label: 'Treatment decision',
    value: 'PRIORITIZE vs BLOCK for the active case.',
    headline: 'What to discuss. What to skip.',
    body: ['Prioritized therapies and explicit rule-outs — no duplicate case card.'],
  },
  {
    key: 'proof',
    n: '03',
    label: 'Clinical proof',
    value: 'Study-backed lines for the active case.',
    headline: 'Citations without the homepage wall.',
    body: ['Days, cohorts, and regimens live here — not on the hero.'],
  },
  {
    key: 'engage',
    n: '04',
    label: 'Live runner',
    value: 'Run live scoring when backends answer.',
    headline: 'Try the API on this case.',
    body: ['Live badge only when FastAPI responds. Otherwise verified snapshot.'],
  },
];