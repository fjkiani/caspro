/**
 * Trial Ledger — single source of truth for decoded clinical trials.
 * Local registry today; Hygraph `TrialLedger` model will mirror these fields (see docs/HYGRAPH_TRIAL_LEDGER.md).
 */

import { Target, Fingerprint, Cpu, type LucideIcon } from 'lucide-react';
import { TRIAL_CASE_FILES, TRIAL_IDS, VECTOR_AXIS_META, type TrialCaseFile, type VectorAxes } from './trial-case-files';

export type TrialReceiptPreview =
  | 'target-lock'
  | 'moa-align'
  | 'kill-chain'
  | 'vector-map';

export interface TrialLedgerEntry {
  slug: string;
  label: string;
  sublabel: string;
  receiptId: string;
  preview: TrialReceiptPreview;
  icon: LucideIcon;
  /** Primary receipt route */
  route: string;
  /** Full 8D de-risking map */
  proofRoute: string;
  trialId: string;
  phase: string;
  cancer: string;
  drugLine: string;
  /** Wrong top-level routes that previously pointed at this trial */
  legacyRoutes: string[];
  order: number;
}

const PREVIEW_BY_SLUG: Record<string, TrialReceiptPreview> = {
  ceacam5: 'target-lock',
  latify: 'moa-align',
  capri: 'kill-chain',
  adavosertib: 'vector-map',
  berzosertib: 'vector-map',
};

const ICON_BY_PREVIEW: Record<TrialReceiptPreview, LucideIcon> = {
  'target-lock': Target,
  'moa-align': Fingerprint,
  'kill-chain': Cpu,
  'vector-map': Target,
};

const SUBLABEL_BY_PREVIEW: Record<TrialReceiptPreview, string> = {
  'target-lock': 'TARGET-LOCK',
  'moa-align': 'MOA-ALIGN',
  'kill-chain': 'KILL-CHAIN',
  'vector-map': 'DE-RISK MAP',
};

/** Routes that incorrectly mapped engine categories → trial receipts */
export const LEGACY_TRIAL_ROUTE_REDIRECTS: Record<string, string> = {
  '/target-validation': '/ledger/ceacam5/',
  '/resistance': '/ledger/capri/',
  '/moa': '/ledger/latify/',
};

const ORDER: Record<string, number> = {
  latify: 1,
  ceacam5: 2,
  capri: 3,
  adavosertib: 4,
  berzosertib: 5,
};

const LEDGER_LABELS: Record<string, string> = {
  latify: 'LATIFY',
  ceacam5: 'CEACAM5',
  capri: 'CAPRI',
  adavosertib: 'ADAVOSERTIB',
  berzosertib: 'BERZOSERTIB',
};

function buildEntry(slug: string, file: TrialCaseFile): TrialLedgerEntry {
  const preview = PREVIEW_BY_SLUG[slug] ?? 'vector-map';
  const legacyRoutes = Object.entries(LEGACY_TRIAL_ROUTE_REDIRECTS)
    .filter(([, dest]) => dest.includes(`/ledger/${slug}`))
    .map(([src]) => src);

  return {
    slug,
    label: LEDGER_LABELS[slug] ?? slug.toUpperCase(),
    sublabel: SUBLABEL_BY_PREVIEW[preview],
    receiptId: slug.toUpperCase(),
    preview,
    icon: ICON_BY_PREVIEW[preview],
    route: preview === 'vector-map' ? `/proof/${slug}/` : `/ledger/${slug}/`,
    proofRoute: `/proof/${slug}/`,
    trialId: file.trialId,
    phase: file.phase,
    cancer: file.cancer,
    drugLine: file.drugLine,
    legacyRoutes,
    order: ORDER[slug] ?? 99,
  };
}

/** All decoded trials in ledger display order */
export const TRIAL_LEDGER_ENTRIES: TrialLedgerEntry[] = TRIAL_IDS.map((id) =>
  buildEntry(id, TRIAL_CASE_FILES[id]!)
).sort((a, b) => a.order - b.order);

export const TRIAL_LEDGER_BY_SLUG: Record<string, TrialLedgerEntry> = Object.fromEntries(
  TRIAL_LEDGER_ENTRIES.map((e) => [e.slug, e])
);

export const TRIAL_LEDGER_SLUGS = TRIAL_LEDGER_ENTRIES.map((e) => e.slug);

export function getTrialLedgerEntry(slug: string): TrialLedgerEntry | null {
  const key = slug.trim().toLowerCase();
  return TRIAL_LEDGER_BY_SLUG[key] ?? null;
}

export function getTrialCaseForSlug(slug: string): TrialCaseFile | null {
  return TRIAL_CASE_FILES[slug.trim().toLowerCase()] ?? null;
}

export { VECTOR_AXIS_META, type VectorAxes };
