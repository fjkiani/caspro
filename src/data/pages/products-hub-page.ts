// ==============================================================================
// /products/ — Hub. Three product paths only (deep links to other routes still work).
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';

export const PRODUCTS_HUB_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products',
  title: 'Three paths. One biology spine.',
  subtitle: 'Tumor Board, In-Silico Trials, and Interception share the same ranked evidence.',
  sections: [
    {
      id: 'tumor-board',
      label: 'Tumor Board',
      eyebrow: 'Product 1 · Tumor Board',
      headline: 'Rank the patient before the drug list.',
      iconKey: 'microscope',
      body: [
        'Switch cases. PRIORITIZE fits. BLOCK mismatches.',
      ],
      cta: { label: 'Open Tumor Board', href: '/products/tumor-board/' },
    },
    {
      id: 'insilico-trials',
      label: 'In-Silico Trials',
      eyebrow: 'Product 2 · In-Silico Trials',
      headline: 'Pressure-test the protocol before lock.',
      iconKey: 'git-branch',
      body: [
        'Name who the drug helps. Block ungated enrollment.',
      ],
      cta: { label: 'Open In-Silico Trials', href: '/products/insilico-trials/' },
    },
    {
      id: 'interception',
      label: 'Interception',
      eyebrow: 'Product 3 · Interception',
      headline: 'Pick the metastasis target worth testing.',
      iconKey: 'target',
      body: [
        'Rank the spread step first. Leave with a testable package.',
      ],
      cta: { label: 'Open Interception', href: '/products/interception/' },
    },
  ],
};