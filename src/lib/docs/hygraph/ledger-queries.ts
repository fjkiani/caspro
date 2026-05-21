/**
 * Trial Ledger + Abstracts — Hygraph queries with local fallback from trial-case-files.
 */

import { fetchWithCache, hygraphClient } from './client';
import {
  TRIAL_LEDGER_ENTRIES,
  getTrialLedgerEntry,
  ledgerSlugPath,
  type TrialLedgerEntry,
} from '@/data/trial-ledger-registry';
import { TRIAL_CASE_FILES } from '@/data/trial-case-files';
import type { CmsAbstract, CmsTrialLedger } from './ledger-types';

const isHygraphConfigured = !!(
  process.env.HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
);

const GET_TRIAL_LEDGERS = `
  query GetTrialLedgers {
    trialLedgers(first: 50, orderBy: order_ASC) {
      id
      slug
      title
      receiptLabel
      sublabel
      previewKind
      trialId
      phase
      cancer
      drugLine
      order
      vectorJson
      responderVectorJson
      nonResponderVectorJson
      summary {
        text
        html
      }
      legacyRoute
    }
  }
`;

const GET_ABSTRACTS = `
  query GetAbstracts {
    mediaItems(
      first: 50
      orderBy: publishedAt_DESC
      where: { type: ABSTRACT }
    ) {
      id
      slug
      title
      excerpt
      publishedAt
    }
  }
`;

function localLedgerEntries(): TrialLedgerEntry[] {
  return TRIAL_LEDGER_ENTRIES;
}

/**
 * All ledger entries — Hygraph when `trialLedgers` exists, else local registry.
 */
export async function getTrialLedgerEntries(): Promise<{
  source: 'hygraph' | 'local';
  entries: TrialLedgerEntry[];
}> {
  if (!isHygraphConfigured || !hygraphClient) {
    return { source: 'local', entries: localLedgerEntries() };
  }

  try {
    const data = await fetchWithCache<{ trialLedgers: CmsTrialLedger[] }>(GET_TRIAL_LEDGERS);
    const rows = data.trialLedgers ?? [];
    if (!rows.length) {
      return { source: 'local', entries: localLedgerEntries() };
    }

    const entries: TrialLedgerEntry[] = rows
      .map((r) => {
        const local = getTrialLedgerEntry(r.slug);
        if (!local) return null;
        const preview = (r.previewKind as TrialLedgerEntry['preview']) || local.preview;
        return {
          ...local,
          label: r.receiptLabel || r.title || local.label,
          sublabel: r.sublabel || local.sublabel,
          receiptId: (r.receiptLabel || local.receiptId).toUpperCase(),
          preview,
          route: ledgerSlugPath(r.slug),
          trialId: r.trialId || local.trialId,
          phase: r.phase || local.phase,
          cancer: r.cancer || local.cancer,
          drugLine: r.drugLine || local.drugLine,
          legacyRoutes: r.legacyRoute ? [r.legacyRoute, ...local.legacyRoutes] : local.legacyRoutes,
          order: r.order ?? local.order,
        };
      })
      .filter((e): e is TrialLedgerEntry => e != null)
      .sort((a, b) => a.order - b.order);

    return entries.length ? { source: 'hygraph', entries } : { source: 'local', entries: localLedgerEntries() };
  } catch (error) {
    console.error('[ledger] Hygraph trialLedgers query failed, using local registry:', error);
    return { source: 'local', entries: localLedgerEntries() };
  }
}

/** Conference abstracts — requires `ABSTRACT` on MediaItem enum in Hygraph. */
export async function getAbstractsCms(): Promise<CmsAbstract[]> {
  if (!isHygraphConfigured || !hygraphClient) return [];

  try {
    const data = await fetchWithCache<{ mediaItems: CmsAbstract[] }>(GET_ABSTRACTS);
    return data.mediaItems ?? [];
  } catch (error) {
    console.error('[ledger] Hygraph abstracts query failed:', error);
    return [];
  }
}

/** Export local 8D vectors for a trial slug (until Hygraph stores JSON). */
export function getLocalTrialVectors(slug: string) {
  const file = TRIAL_CASE_FILES[slug.trim().toLowerCase()];
  if (!file) return null;
  return {
    trial: file.trialVector,
    responder: file.responderVector,
    nonResponder: file.nonResponderVector,
    cosineResponder: file.cosineResponder,
    deltaImpact: file.deltaImpact,
  };
}
