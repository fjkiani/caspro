// ==============================================================================
// /products/r-d/ — Pipeline decisions with a mechanism-alignment gate.. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
export const R_D_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · R&D',
  title: 'Pipeline decisions with a mechanism-alignment gate.',
  subtitle: 'For franchise-scope pipeline decisions. Multi-asset mechanism-alignment scoring, ranked by evidence tier, with per-asset next-step routing.',
  sections: [
    {
      id: 'audience',
      label: 'For whom',
      eyebrow: 'Chapter 1 · Who this is for',
      headline: 'Pipeline heads, portfolio leads, franchise strategists.',
      iconKey: 'layers',
      body: [
        'For pipeline-scale decisions — which asset to advance, which to gate at Phase I, which to reposition, which to license out. The R&D surface returns a mechanism-alignment score across a portfolio, ranked by evidence tier, with a comparator against the existing stratification layers.',
      ],
    },
    {
      id: 'what',
      label: 'What it returns',
      eyebrow: 'Chapter 2 · What it returns',
      headline: 'Multi-asset mechanism-alignment scoring.',
      iconKey: 'clipboard-check',
      body: [
        'For every asset in a portfolio, the surface returns a mechanism-alignment score at defined evidence tier, ranked against peer assets in the same mechanism class. The output is a decision-grade table that a pipeline review committee can defend.',
      ],
      bullets: [
        'Multi-asset scoring across a portfolio',
        'Mechanism-class ranking against peer assets',
        'Comparator against histology / CGP / RWE',
        'Next-step offering routing per asset',
      ],
      cta: { label: 'See the capability spine', href: '/engine/' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 3 · Proof',
      headline: 'Public ledger of decoded programs.',
      iconKey: 'git-branch',
      body: [
        'The R&D surface has been used against pipelines in target-directed antibody-drug conjugates, replication-stress-response inhibitors, DNA-damage-response axes, and biomarker-driven checkpoint combinations.',
      ],
      caseStudies: [
        { slug: 'ceacam5', title: 'Target-directed ADC franchise scope', summary: 'Franchise-adjacent asset repositioning window preserved by naming a stricter target-expression threshold.' },
        { slug: 'adavosertib', title: 'DDR/WEE1 mechanism-class review', summary: 'Class-wide mechanism-alignment scoring for the WEE1 inhibitor franchise.' },
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Chapter 4 · How to engage',
      headline: 'Send a portfolio. Receive a ranked table.',
      iconKey: 'sparkles',
      body: [
        'Portfolio-scale engagements start with a scoped asset list. CrisPRO returns a ranked mechanism-alignment table with per-asset next-step offerings.',
      ],
      cta: { label: 'See BD Intelligence offering', href: '/pipeline/?offer=bd-intelligence-package' },
    },
  ],
};
