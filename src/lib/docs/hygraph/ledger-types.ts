import type { TrialReceiptPreview } from '@/data/trial-ledger-registry';
import type { VectorAxes } from '@/data/trial-case-files';

/** Hygraph `TrialLedger` entry (scaffold — create model in Studio). */
export type CmsTrialLedger = {
  id: string;
  slug: string;
  title: string;
  receiptLabel: string;
  sublabel: string;
  previewKind: TrialReceiptPreview;
  trialId: string;
  phase: string | null;
  cancer: string | null;
  drugLine: string | null;
  order: number | null;
  /** JSON string or component — 8-axis vector for ITT cohort */
  vectorJson?: string | null;
  responderVectorJson?: string | null;
  nonResponderVectorJson?: string | null;
  summary?: { text?: string | null; html?: string | null } | null;
  legacyRoute?: string | null;
};

export type CmsAbstract = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  conference: string | null;
  year: number | null;
  publishedAt: string | null;
};

export type ParsedVectors = {
  trial?: VectorAxes;
  responder?: VectorAxes;
  nonResponder?: VectorAxes;
};
