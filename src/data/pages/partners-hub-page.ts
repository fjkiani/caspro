// ==============================================================================
// /partners/ — hub linking to relationship surfaces. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
export const PARTNERS_HUB_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Partners',
  title: 'The relationships underneath the mechanism-alignment layer.',
  subtitle:
    'CrisPRO ships against public data, cited under open licenses, in a public ledger. This page names the relationships that make that discipline possible — the academic host, the identity provider, and the professional society that keeps the field honest.',
  sections: [
    {
      id: 'academic',
      label: 'Academic host',
      eyebrow: 'Relationship 1 · Academic host',
      headline: 'A public-university host for the research corpus.',
      iconKey: 'graduation-cap',
      body: [
        'The CrisPRO research corpus is hosted through an academic partnership that anchors the public ledger to a public-university institutional commitment. Academic hosting is not incidental — it is the reason every claim in CrisPRO must trace to a public source.',
      ],
      cta: { label: 'Open the academic partner page', href: '/partners/uc-berkeley/' },
    },
    {
      id: 'identity',
      label: 'Identity',
      eyebrow: 'Relationship 2 · Identity & access',
      headline: 'Sponsor-grade identity for gated engagement surfaces.',
      iconKey: 'shield',
      body: [
        'When a CrisPRO surface needs to gate sensitive engagement material behind sponsor-side identity, we use an enterprise-grade identity provider. Public ledger content stays public; sponsor-side working documents stay gated.',
      ],
      cta: { label: 'Open the identity partner page', href: '/partners/auth0/' },
    },
    {
      id: 'society',
      label: 'Society',
      eyebrow: 'Relationship 3 · Professional society',
      headline: 'A professional-society context for the field.',
      iconKey: 'trophy',
      body: [
        'CrisPRO tracks and cites the professional-society context — annual meetings, position statements, and consensus guidelines — so every mechanism-alignment call sits inside the field\'s scholarly conversation.',
      ],
      cta: { label: 'Open the society partner page', href: '/partners/aacr/' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Relationship 4 · Talk to us',
      headline: 'New partnerships are scoped through the contact channel.',
      iconKey: 'handshake',
      body: [
        'If your institution or organization wants to explore a mechanism-alignment partnership — hosting, evidence integration, guideline development, or an educational program — start with the contact channel.',
      ],
      cta: { label: 'Contact the team', href: '/contact/' },
    },
  ],
};
