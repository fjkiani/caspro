// ==============================================================================
// /products/boltz/ — Structure-informed mechanism alignment.. Vague-safe.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
export const BOLTZ_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products · Boltz',
  title: 'Structure-informed mechanism alignment.',
  subtitle: 'A structure-informed reader for mechanism-alignment questions where the target has a well-characterized pocket or interface.',
  sections: [
    {
      id: 'audience',
      label: 'For whom',
      eyebrow: 'Chapter 1 · Who this is for',
      headline: 'Structure-informed mechanism reviewers.',
      iconKey: 'zap',
      body: [
        'Boltz is a structure-informed reader for mechanism-alignment questions where the target has a well-characterized pocket or interface. Used complementary to sequence-based reads when the mechanism turns on a specific structural feature.',
      ],
    },
    {
      id: 'what',
      label: 'What it returns',
      eyebrow: 'Chapter 2 · What it returns',
      headline: 'Structure-informed mechanism-alignment context.',
      iconKey: 'clipboard-check',
      body: [
        'For structural mechanism questions, Boltz returns a residue-level alignment context that explains why a drug\'s mechanism aligns (or misaligns) with a patient\'s target biology.',
      ],
      bullets: [
        'Residue-level structural mechanism context',
        'Complementary to sequence-based reads',
        'Every claim traces to a public structural source',
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
        'Boltz has been used against structural mechanism questions in target-directed antibody-drug conjugate binding-interface programs.',
      ],
      cta: { label: 'Open the ledger', href: '/ledger/' },
    },
    {
      id: 'engage',
      label: 'Engage',
      eyebrow: 'Chapter 4 · How to engage',
      headline: 'Send a structural mechanism question.',
      iconKey: 'sparkles',
      body: [
        'Boltz engagements are scoped inside a broader mechanism-alignment audit — typically embedded in a Trial Failure Decode or IST Design Support offering.',
      ],
      cta: { label: 'See the pipeline', href: '/pipeline/' },
    },
  ],
};
