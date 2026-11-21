// Legacy vertical surface — keep short; canonical UI uses ClinicalCaseSwitcher.
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { TB_SURFACE_HERO } from '@/data/clinical-case-ui';

export const PRODUCTS_TUMOR_BOARD_PAGE_DATA: VerticalPageData = {
  eyebrow: 'CrisPRO · Tumor Board',
  title: TB_SURFACE_HERO.headline,
  subtitle: TB_SURFACE_HERO.subhead,
  sections: [
    {
      id: 'cases',
      label: 'Cases',
      eyebrow: 'Switch disease',
      headline: 'Ovarian, myeloma, or colorectal.',
      iconKey: 'microscope',
      body: [
        'One case at a time. Evidence opens in a drawer — not a wall of text.',
      ],
      cta: { label: 'Open Tumor Board', href: '/products/tumor-board/' },
    },
  ],
};
