// ==============================================================================
// /partners/aacr/ — professional-society context. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
export const PARTNERS_AACR_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Partners · Professional society',
  title: 'A society-anchored home for mechanism-alignment briefs.',
  subtitle:
    'CrisPRO tracks and cites professional-society context — annual meetings, position statements, and consensus guidelines — so every mechanism-alignment call sits inside the scholarly conversation of the field.',
  sections: [
    {
      id: 'why',
      label: 'Why society context',
      eyebrow: 'Chapter 1 · Why society context matters',
      headline: 'Mechanism-alignment claims sit inside a scholarly conversation.',
      iconKey: 'trophy',
      body: [
        'A mechanism-alignment claim is not a market claim — it is a scientific claim. That means it has to sit inside the scholarly conversation the field is already having: consensus guidelines, position statements, and annual-meeting scientific programs. CrisPRO tracks that conversation and cites it in every brief.',
      ],
    },
    {
      id: 'presence',
      label: 'Presence',
      eyebrow: 'Chapter 2 · Society presence',
      headline: 'Annual-meeting scientific submissions.',
      iconKey: 'book',
      body: [
        'CrisPRO participates in the annual-meeting scientific program of the relevant professional society — as scientific submissions, not as commercial exhibitors. Submissions cover mechanism-alignment methodology, decoded programs, and open-assumption reports.',
      ],
      cta: { label: 'See the research hub', href: '/research/' },
    },
    {
      id: 'guidelines',
      label: 'Guidelines',
      eyebrow: 'Chapter 3 · Guidelines & consensus',
      headline: 'Every brief cites the current guideline context.',
      iconKey: 'users',
      body: [
        'For every decoded program, the accompanying brief cites the current guideline context — which consensus statements apply, which position papers are relevant, and how the mechanism-alignment call sits inside that context.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 4 · Proof',
      headline: 'Public ledger anchored to society-cited sources.',
      iconKey: 'clipboard-check',
      body: [
        'Every claim in the public ledger traces to a public source; the society-cited sources are one of the primary citation anchors.',
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
  ],
};
