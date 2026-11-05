/**
 * Tumor Board product page — value-first for oncology teams.
 * A = imaging / report path. B = molecular path.
 * Each tab answers: what do you get? Not a feature dump.
 */

export const TB_PRODUCT_HERO = {
  brand: 'CrisPRO',
  title: 'Tumor Board',
  subtitle: 'Rank options · rule out mismatches · RUO',
  tagline: 'Walk into the room with a ranked case package — not a pile of PDFs.',
} as const;

export const TB_PRODUCT_CTAS = {
  primary: { label: 'Talk to us', href: '/contact/' },
  secondary: { label: 'Open Tumor Board', href: '/tumor-board/' },
  ledger: { label: 'Public ledger', href: '/ledger/' },
} as const;

/** Two ways a case enters — full clinician copy (always shown). */
export type TbLaneSlug = 'a' | 'b';

export const TB_PRODUCT_BASE = '/products/tumor-board' as const;

export type TbLaneStackStep = {
  layer: string;
  label: string;
  state: string;
};

/** Door A = imaging Arbiter (NSCLC E2E). Door B = molecular bundle (AK). Receipts: product_truth ship plan. */
export const TB_PRODUCT_LANES = [
  {
    id: 'A' as const,
    slug: 'a' as TbLaneSlug,
    name: 'From imaging & reports',
    when: 'You have a chest CT (or imaging + report) and need a ranked workup — not a PDF pile.',
    capability:
      'Oncology Arbiter runs CT bytes through a named detection → rule → Elo pipeline and hands you a traceable shortlist.',
    approach:
      'CrisPRO does not "AI-summarize" the scan. It chains loaded models and labeled rules, then Elo-ranks what is worth the room — with model_state on every layer.',
    does: 'Live demo path: NSCLC LUNA16-style case — detect, bucket risk, fire NCCN-lite actions, re-rank.',
    stack: [
      { layer: 'L1', label: 'CT ingest', state: 'bytes in' },
      { layer: 'L2', label: 'MONAI RetinaNet', state: 'loaded_luna16_retinanet' },
      { layer: 'L3', label: 'Lung heuristic', state: 'risk bucket' },
      { layer: 'L4', label: 'NCCN-lite', state: 'section-ID rules' },
      { layer: 'L5', label: 'Co-scientist + Elo', state: 'ranked package' },
    ] as const satisfies readonly TbLaneStackStep[],
    tryHref: '/tumor-board/receipts/nsclc_luna16/',
    boardHref: '/tumor-board/nsclc/',
    honesty:
      'NCCN-lite is rules-lite keyed on the heuristic — not a full guideline agent. RUO. If a layer is proxy_* or unavailable, the board says so.',
  },
  {
    id: 'B' as const,
    slug: 'b' as TbLaneSlug,
    name: 'From the molecular profile',
    when: 'You have variants / assays and need options ranked to this biology — with sources.',
    capability:
      'Arbiter validates a SHA-locked evidence bundle, surfaces the mechanism map, and Elo-sorts options with labeled manuscript weights.',
    approach:
      'CrisPRO does not invent p-values. The manuscript owns the anchors; the Arbiter owns contract validation, audit hash, and deterministic rank.',
    does: 'Live demo path: AK MBD4-LOF — 6-axis matrix, falsification narrative, Elo with explicit boosts/penalties.',
    stack: [
      { layer: 'L1', label: 'Bundle ingest', state: 'sample contract' },
      { layer: 'L2', label: 'Validate + SHA', state: 'loaded_ak_bundle' },
      { layer: 'L3', label: 'Evidence matrix', state: '6 axes' },
      { layer: 'L4', label: 'Falsification', state: 'PARP narrative' },
      { layer: 'L5', label: 'Elo audit sort', state: 'labeled weights' },
    ] as const satisfies readonly TbLaneStackStep[],
    tryHref: '/tumor-board/receipts/ak_mbd4_lof/',
    boardHref: '/tumor-board/AK/',
    honesty:
      'This is therapy-fit / biology ranking — not a screening claim. Every public number stays on the ledger with a grade.',
  },
] as const;

export type TbProductTab = 'decision' | 'lanes' | 'package' | 'proof' | 'engage';

export const TB_PRODUCT_TABS: {
  key: TbProductTab;
  n: string;
  label: string;
  /** One-line payoff — the real value of this tab. */
  value: string;
  headline: string;
  body: string[];
  bullets?: string[];
}[] = [
  {
    key: 'decision',
    n: '01',
    label: 'Outcome',
    value: 'Leave the room with a ranked shortlist — and a clear skip list.',
    headline: 'Stop rebuilding the case map by hand.',
    body: [
      'The board turns what you already have into: discuss this, skip that, here is why, here is what is still missing.',
    ],
    bullets: [
      'Worth discussing — ranked for this biology.',
      'Rule out — mismatches that waste the room.',
      'Gaps — missing tests named before you invent certainty.',
    ],
  },
  {
    key: 'lanes',
    n: '02',
    label: 'Ways in',
    value: 'Same board whether you start from a scan or a molecular report.',
    headline: 'Two doors. One walk: Case · Options · Gaps.',
    body: [
      'Pick the door that matches what you have. You still get the same decision surface — not two products glued together.',
    ],
  },
  {
    key: 'package',
    n: '03',
    label: 'You leave with',
    value: 'A case package you can put on the screen in tumor board.',
    headline: 'Not a score dump. A package the room can walk.',
    body: [
      'Drivers, dependencies, ranked options, matching trials, evidence, and open questions — in one viewport.',
    ],
    bullets: [
      'What is driving the cancer.',
      'What the tumor may lean on.',
      'Options and trials worth the room’s time.',
      'Evidence + gaps — with sources attached.',
    ],
  },
  {
    key: 'proof',
    n: '04',
    label: 'Trust',
    value: 'Every public claim has a grade, a limit, and a place on the ledger.',
    headline: 'We would rather look incomplete than look certain.',
    body: [
      'Research / RUO until clinical validation. Demo cases show the board working. Provisional steps are labeled — never greenwashed.',
    ],
  },
  {
    key: 'engage',
    n: '05',
    label: 'Start',
    value: 'Your profiles in. Ranked packages out.',
    headline: 'First conversation is a real case, not a pitch deck.',
    body: [
      'Bring a program profile for a walkthrough — or open the live workspace and step through a demo case now.',
    ],
    bullets: [
      'Schedule a walkthrough on your case.',
      'Or try a fixture in the live workspace.',
    ],
  },
];

/** Door hrefs — picker owns the three-door entry; legacy /ways-in/* redirects. */
export function tbWaysInHref(lane?: TbLaneSlug): string {
  if (lane === 'a') return '/tumor-board/nsclc/';
  if (lane === 'b') return '/tumor-board/AK/';
  return '/tumor-board/';
}

export function tbLaneBySlug(slug: TbLaneSlug) {
  return TB_PRODUCT_LANES.find((l) => l.slug === slug) ?? TB_PRODUCT_LANES[0];
}
