// ==============================================================================
// /partners/auth0/ — identity & access. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
export const PARTNERS_AUTH0_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Partners · Identity & access',
  title: 'Enterprise identity for the gated side of CrisPRO.',
  subtitle:
    'The public ledger stays public. But sponsor-side working documents — pre-publication briefs, mid-engagement deliverables, and franchise-scope diligence packs — require sponsor-grade identity and access controls.',
  sections: [
    {
      id: 'split',
      label: 'Public vs gated',
      eyebrow: 'Chapter 1 · The public / gated split',
      headline: 'Two surfaces, one discipline.',
      iconKey: 'shield',
      body: [
        'CrisPRO runs two surfaces in parallel. The public ledger — every decoded program, every mechanism-alignment split, every receipt — is open by default. The engagement surface — pre-publication briefs, franchise-scope diligence, and IST design documents — is gated behind sponsor-grade identity.',
        'The discipline is the same on both sides: no fabricated numbers, every claim traceable to a public source and evidence tier.',
      ],
    },
    {
      id: 'controls',
      label: 'Controls',
      eyebrow: 'Chapter 2 · Access controls',
      headline: 'Enterprise identity provider, role-based access.',
      iconKey: 'lock',
      body: [
        'Gated engagement content is protected by an enterprise-grade identity provider with role-based access controls. Sponsor teams get scoped access to their own engagement material; nothing crosses engagement boundaries.',
      ],
      bullets: [
        'Enterprise-grade identity provider',
        'Role-based access controls per engagement',
        'No cross-engagement leakage',
      ],
    },
    {
      id: 'audit',
      label: 'Audit',
      eyebrow: 'Chapter 3 · Audit trail',
      headline: 'Every gated access is auditable.',
      iconKey: 'key-round',
      body: [
        'Every access to a gated engagement document is logged with an audit trail. Sponsor teams can request an audit report at any time.',
      ],
    },
    {
      id: 'proof',
      label: 'Proof',
      eyebrow: 'Chapter 4 · Proof',
      headline: 'The public ledger stays public.',
      iconKey: 'clipboard-check',
      body: [
        'Identity gating never touches the public ledger. Every decoded program, every mechanism-alignment split, every receipt remains open for inspection.',
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
  ],
};
