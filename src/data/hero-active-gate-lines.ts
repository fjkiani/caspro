import type { HeadlineEntry } from '@/data/hero-headlines';

/**
 * ACTIVE GATE — short surface lines only (≤20 words).
 * Study IDs and day math live in ClinicalCaseSwitcher evidence drawers.
 */
export const HERO_ACTIVE_GATE_LINES: HeadlineEntry[] = [
  {
    text: 'Real target. Wrong patients. Endpoints missed.',
    highlight: 'Pressure-test the subgroup before protocol lock.',
    href: '/products/insilico-trials/',
    trial: 'In-Silico Trials',
  },
  {
    text: 'Metastasis programs chase the wrong step of spread.',
    highlight: 'Rank the colonization step first.',
    href: '/products/interception/',
    trial: 'Interception',
  },
  {
    text: 'Drug lists before patient splits waste the room.',
    highlight: 'Switch ovarian, myeloma, or colorectal below.',
    href: '/tumor-board/',
    trial: 'Tumor Board',
  },
  {
    text: 'STK11 collected at screen — then ignored at enroll.',
    highlight: 'Block the next ungated DDR miss.',
    href: '/ledger/latify/',
    trial: 'LATIFY',
  },
  {
    text: 'Expression gate missing. Phase III endpoints missed.',
    highlight: 'Require the gate before another CEACAM5-style miss.',
    href: '/ledger/ceacam5/',
    trial: 'CEACAM5',
  },
  {
    text: 'PARP by reflex when PARP1 never rose.',
    highlight: 'Block PARP monotherapy on that biology.',
    href: '/engine/synthetic-lethality/',
    trial: 'Synthetic Lethality',
  },
];
