// ==============================================================================
// /products/forge/ — IST design & prospective gate definition.. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
export const FORGE_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · Forge',
  title: 'IST design & prospective gate definition.',
  subtitle: 'A design surface used to define a prospective mechanism-alignment gate for an investigator-sponsored trial before enrollment opens.',
  sections: [
    {
      id: 'audience',
      label: 'For whom',
      eyebrow: 'Chapter 1 · Who this is for',
      headline: 'IST designers and prospective-gate architects.',
      iconKey: 'hammer',
      body: [
        'The Forge is a design surface — used to define a prospective mechanism-alignment gate for an investigator-sponsored trial before enrollment opens. The output is a defensible enrollment gate, not a post-hoc apology.',
      ],
    },
    {
      id: 'what',
      label: 'What it returns',
      eyebrow: 'Chapter 2 · What it returns',
      headline: 'A prospective enrollment gate with an evidence chain.',
      iconKey: 'clipboard-check',
      body: [
        'For an IST, the Forge returns a scoped enrollment gate that names the mechanism-alignment axis, sets the tier threshold, and links every criterion to a public evidence source.',
      ],
      bullets: [
        'Prospective enrollment gate at defined tier',
        'Every criterion linked to a public evidence source',
        'Handoff-ready for regulatory review',
      ],
      cta: { label: 'See IST Design Support', href: '/pipeline/?offer=ist-design-support' },
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 3 · Proof',
      headline: 'Public ledger of decoded programs.',
      iconKey: 'git-branch',
      body: [
        'The Forge design surface has been used across DNA-damage-response and replication-stress-response mechanism-alignment gates.',
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Chapter 4 · How to engage',
      headline: 'Send an IST concept. Receive a gate.',
      iconKey: 'sparkles',
      body: [
        'IST engagements start with a concept letter and target population. The Forge returns a scoped gate inside the IST Design Support offering timeline.',
      ],
      cta: { label: 'See the pipeline', href: '/pipeline/' },
    },
  ],
};
