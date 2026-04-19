/**
 * Hygraph queries for `/manuscripts`: `MediaItem` rows typed as long-form (`PDF`, aliases) or
 * carrying `manuscriptPdf`. Slide decks use `type: DECK` (and `pdfDeck` / `pdfFile` there) — we
 * never treat `pdfFile` on a `PDF` row as a deck. Enum override:
 * `NEXT_PUBLIC_HYGRAPH_MEDIA_ITEM_MANUSCRIPT_ENUM` (e.g. `Pdf`).
 */

import { fetchWithCache, hygraphClient } from './client';
import type { CmsUseCase } from './use-case-types';
import type { Asset } from './types';

const isHygraphConfigured = !!(
  process.env.HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
);

/** GraphQL enum literal for manuscript list (`MediaItem.type`). Default: PDF. */
function manuscriptListTypeEnumLiteral(): string {
  const raw = (process.env.NEXT_PUBLIC_HYGRAPH_MEDIA_ITEM_MANUSCRIPT_ENUM || 'PDF').trim();
  if (!/^[A-Za-z][_A-Za-z0-9]*$/.test(raw)) return 'PDF';
  return raw;
}

const LIST_MEDIA_TYPE_ENUM = manuscriptListTypeEnumLiteral();

const DECK_OR_VIDEO_TYPES = new Set(['DECK', 'Deck', 'deck', 'VIDEO', 'Video', 'video']);

/** Hygraph enum variants we still treat as long-form manuscripts (not slide decks / video). */
const MANUSCRIPT_TYPE_ALIASES = new Set([
  'MANUSCRIPT',
  'Manuscript',
  'manuscript',
  'ARTICLE',
  'Article',
  'article',
  'LONGFORM',
  'Longform',
  'PAPER',
  'Paper',
  'RESEARCH',
  'ResearchPaper',
  'PDF_MANUSCRIPT',
  'DOCUMENT',
  'Document',
]);

function isManuscriptListType(t: string | null | undefined): boolean {
  if (t == null || t === '') return false;
  if (DECK_OR_VIDEO_TYPES.has(t)) return false;
  if (MANUSCRIPT_TYPE_ALIASES.has(t)) return true;
  if (t === LIST_MEDIA_TYPE_ENUM) return true;
  if (LIST_MEDIA_TYPE_ENUM === 'PDF' && (t === 'Pdf' || t === 'pdf')) return true;
  return false;
}

const richTextFields = `
  html
  text
`;

function normalizeSlugParam(s: string): string {
  const raw = String(s || '')
    .replace(/\/+$/, '')
    .trim();
  try {
    return decodeURIComponent(raw)
      .replace(/\/+$/, '')
      .trim();
  } catch {
    return raw;
  }
}

type PdfAsset = Pick<Asset, 'id' | 'url'> & Partial<Pick<Asset, 'fileName' | 'mimeType'>>;

type MediaItemGql = {
  id: string;
  slug: string | null;
  title: string;
  type?: string | null;
  excerpt?: string | null;
  videoUrl?: string | null;
  description?: { html?: string | null; text?: string | null } | null;
  pdfFile?: PdfAsset | null;
  pdfDeck?: PdfAsset | null;
  manuscriptPdf?: PdfAsset | null;
  thumbnail?: Asset | null;
  featuredImage?: Asset | null;
};

function toAsset(a: PdfAsset | null | undefined): Asset | null {
  if (!a?.url) return null;
  return {
    id: a.id,
    url: a.url,
    fileName: a.fileName ?? '',
    mimeType: a.mimeType,
  };
}

function isDeckMediaType(t: string | null | undefined): boolean {
  return Boolean(t && DECK_OR_VIDEO_TYPES.has(t));
}

/** Deck rows: slide PDF may live on `pdfDeck` or `pdfFile` in Hygraph. */
function pickDeckAsset(mi: MediaItemGql): Asset | null {
  return toAsset(mi.pdfDeck) || toAsset(mi.pdfFile);
}

function pickManuscriptFieldOnly(mi: MediaItemGql): Asset | null {
  return toAsset(mi.manuscriptPdf);
}

/**
 * Long-form manuscript asset: explicit `manuscriptPdf`, else `pdfFile` when the row is not a deck
 * (`type: PDF` manuscripts store the file on `pdfFile`; decks are `type: DECK`).
 */
function pickManuscriptDisplayAsset(mi: MediaItemGql): Asset | null {
  const fromField = pickManuscriptFieldOnly(mi);
  if (fromField) return fromField;
  if (isDeckMediaType(mi.type)) return null;
  return toAsset(mi.pdfFile);
}

function descriptionPlain(mi: MediaItemGql): string | null {
  const t = mi.description?.text?.trim();
  if (t) return t;
  const h = mi.description?.html;
  if (h && typeof h === 'string') {
    const stripped = h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (stripped) return stripped;
  }
  const ex = typeof mi.excerpt === 'string' ? mi.excerpt.trim() : '';
  return ex || null;
}

function mapMediaItemToCmsUseCase(mi: MediaItemGql): CmsUseCase {
  let deck: Asset | null = null;
  let manuscript: Asset | null = null;
  if (isDeckMediaType(mi.type)) {
    deck = pickDeckAsset(mi);
    manuscript = pickManuscriptFieldOnly(mi);
  } else {
    manuscript = pickManuscriptDisplayAsset(mi);
    deck = toAsset(mi.pdfDeck);
  }
  return {
    id: mi.id,
    title: mi.title,
    slug: mi.slug,
    description: descriptionPlain(mi),
    resultsHeadline: mi.excerpt?.trim() || null,
    demoVideoUrl: mi.videoUrl?.trim() || null,
    pdfDeck: deck,
    manuscriptPdf: manuscript,
    thumbnail: mi.thumbnail ?? null,
    heroImage: mi.featuredImage ?? null,
  };
}

function mergeUseCaseNarrativeInto(target: CmsUseCase, rich: CmsUseCase): void {
  const assign = <K extends keyof CmsUseCase>(key: K) => {
    const v = rich[key];
    if (v === undefined || v === null) return;
    if (typeof v === 'string' && !v.trim()) return;
    (target as CmsUseCase)[key] = v;
  };
  assign('description');
  assign('clientChallenge');
  assign('beforeState');
  assign('jediApproach');
  assign('outcomes');
  assign('resultsHeadline');
  assign('resultsNarrative');
  assign('architectureNarrative');
  assign('technologyNarrative');
  assign('capabilityNarrative');
  assign('prerequisites');
  assign('risksAndMitigations');
  assign('testScenarios');
  if (rich.heroImage?.url && !target.heroImage?.url) target.heroImage = rich.heroImage;
  if (rich.thumbnail?.url && !target.thumbnail?.url) target.thumbnail = rich.thumbnail;
  if (rich.demoVideoUrl && !target.demoVideoUrl) target.demoVideoUrl = rich.demoVideoUrl;
  if (rich.pdfDeck?.url && !target.pdfDeck?.url) target.pdfDeck = rich.pdfDeck;
  if (rich.manuscriptPdf?.url && !target.manuscriptPdf?.url) target.manuscriptPdf = rich.manuscriptPdf;
}

const MEDIA_ITEM_CORE = `
  id
  slug
  title
  type
  excerpt
  videoUrl
  description { ${richTextFields} }
  pdfFile { id url fileName mimeType }
  pdfDeck { id url fileName mimeType }
  manuscriptPdf { id url fileName mimeType }
  thumbnail { id url fileName mimeType width height }
  featuredImage { id url fileName mimeType width height }
`;

/** Explicit manuscript asset on MediaItem (Hygraph field `manuscriptPdf`). */
function hasExplicitManuscriptPdf(mi: MediaItemGql): boolean {
  return Boolean(toAsset(mi.manuscriptPdf));
}

function mediaItemAllowedForManuscriptRoute(mi: MediaItemGql): boolean {
  if (isDeckMediaType(mi.type)) return false;
  if (hasExplicitManuscriptPdf(mi)) return true;
  if (isManuscriptListType(mi.type)) return true;
  const t = mi.type;
  if (t == null || t === '') {
    return process.env.NEXT_PUBLIC_MANUSCRIPT_ALLOW_UNTAGGED_MEDIA === '1';
  }
  return false;
}

async function requestMediaItemBySlug(slug: string): Promise<MediaItemGql | null> {
  if (!hygraphClient) return null;
  const q = `query MediaItemUseCase($slug: String!) {
    mediaItem(where: { slug: $slug }) {
      ${MEDIA_ITEM_CORE}
    }
  }`;
  try {
    const data = await fetchWithCache<{ mediaItem: MediaItemGql | null }>(q, { slug });
    return data?.mediaItem ?? null;
  } catch (e) {
    console.warn('[use-case-queries] MediaItem full query failed, trying minimal fields:', e);
  }
  const minimalWithType = `query MediaItemUseCaseMin($slug: String!) {
    mediaItem(where: { slug: $slug }) {
      id
      slug
      title
      type
      pdfFile { id url fileName mimeType }
      thumbnail { id url fileName mimeType width height }
    }
  }`;
  try {
    const data = await fetchWithCache<{ mediaItem: MediaItemGql | null }>(minimalWithType, { slug });
    return data?.mediaItem ?? null;
  } catch {
    /* `type` may not exist on older schemas */
  }
  const minimal = `query MediaItemUseCaseBare($slug: String!) {
    mediaItem(where: { slug: $slug }) {
      id
      slug
      title
      pdfFile { id url fileName mimeType }
      thumbnail { id url fileName mimeType width height }
    }
  }`;
  try {
    const data = await fetchWithCache<{ mediaItem: MediaItemGql | null }>(minimal, { slug });
    return data?.mediaItem ?? null;
  } catch (e2) {
    console.error('[use-case-queries] MediaItem minimal query failed:', e2);
    return null;
  }
}

async function fetchUseCaseRichOnly(slug: string): Promise<CmsUseCase | null> {
  if (!hygraphClient) return null;
  const query = `
    query GetUseCaseBySlug($slug: String!) {
      useCase(where: { slug: $slug }) {
        id
        title
        slug
        description
        clientChallenge { ${richTextFields} }
        beforeState { ${richTextFields} }
        jediApproach { ${richTextFields} }
        outcomes { ${richTextFields} }
        resultsHeadline
        resultsNarrative { ${richTextFields} }
        architectureNarrative { ${richTextFields} }
        technologyNarrative { ${richTextFields} }
        capabilityNarrative { ${richTextFields} }
        prerequisites { ${richTextFields} }
        risksAndMitigations { ${richTextFields} }
        testScenarios { ${richTextFields} }
        demoVideoUrl
        heroImage { id url fileName mimeType width height }
        thumbnail { id url fileName mimeType width height }
        pdfDeck { id url fileName mimeType }
        manuscriptPdf { id url fileName mimeType }
      }
    }
  `;
  try {
    const data = await fetchWithCache<{ useCase: CmsUseCase | null }>(query, { slug });
    return data?.useCase ?? null;
  } catch {
    return null;
  }
}

/**
 * Manuscript detail: same eligibility as the list (`mediaItemAllowedForManuscriptRoute`);
 * otherwise falls back to legacy `UseCase` by slug.
 */
export async function getUseCaseBySlugCms(slug: string): Promise<CmsUseCase | null> {
  if (!isHygraphConfigured || !hygraphClient) return null;
  const normalized = normalizeSlugParam(slug);

  try {
    const media = await requestMediaItemBySlug(normalized);
    if (media) {
      if (!mediaItemAllowedForManuscriptRoute(media)) {
        return null;
      }
      const base = mapMediaItemToCmsUseCase(media);
      const rich = await fetchUseCaseRichOnly(normalized);
      if (rich) mergeUseCaseNarrativeInto(base, rich);
      return base;
    }

    return await fetchUseCaseRichOnly(normalized);
  } catch (error) {
    console.error('[getUseCaseBySlugCms] Error:', error);
    return null;
  }
}

function manuscriptListWhereClause(publishedOnly: boolean): string {
  if (publishedOnly) {
    return `where: { AND: [{ type: ${LIST_MEDIA_TYPE_ENUM} }, { isPublished: true }] }`;
  }
  return `where: { type: ${LIST_MEDIA_TYPE_ENUM} }`;
}

const MANUSCRIPT_LIST_FIRST = 250;

type MediaItemGqlWithPub = MediaItemGql & { isPublished?: boolean | null };

/**
 * Smallest `mediaItems` selection that still maps to `CmsUseCase`.
 * Runs first so a missing Hygraph field (`manuscriptPdf`, `description`, …) never blanks the whole list.
 */
async function tryManuscriptMediaItemsBareSelection(
  plural: 'mediaItems' | 'mediaItemS',
  publishedOnly: boolean
): Promise<CmsUseCase[] | null> {
  if (!hygraphClient) return null;
  const run = async (whereFragment: string, includeIsPublished: boolean): Promise<CmsUseCase[] | null> => {
    const args = `${whereFragment}, orderBy: title_ASC, first: ${MANUSCRIPT_LIST_FIRST})`;
    const pubField = includeIsPublished ? '\n        isPublished' : '';
    const q = `
    query ManuscriptMediaListBare {
      ${plural}(${args} {
        id
        slug
        title
        type
        excerpt
        pdfFile { id url fileName mimeType }
        pdfDeck { id url fileName mimeType }
        thumbnail { id url fileName mimeType }${pubField}
      }
    }
  `;
    try {
      const data = await fetchWithCache<Record<string, unknown>>(q);
      const rows = data?.[plural];
      if (!Array.isArray(rows)) return null;
      let list = rows as MediaItemGqlWithPub[];
      if (publishedOnly && includeIsPublished) {
        list = list.filter((r) => r.isPublished !== false);
      }
      const filtered = list.filter((r) => mediaItemAllowedForManuscriptRoute(r));
      if (filtered.length === 0) return null;
      return filtered.map((r) => mapMediaItemToCmsUseCase(r));
    } catch {
      return null;
    }
  };

  const strictWhere = manuscriptListWhereClause(publishedOnly);
  const got = await run(strictWhere, false);
  if (got !== null) return got;

  if (publishedOnly) {
    const looseWhere = `where: { type: ${LIST_MEDIA_TYPE_ENUM} }`;
    return await run(looseWhere, true);
  }

  return null;
}

/** Same as bare selection but omits `pdfDeck` when that field is absent from the schema. */
async function tryManuscriptMediaItemsBareNoPdfDeck(
  plural: 'mediaItems' | 'mediaItemS',
  publishedOnly: boolean
): Promise<CmsUseCase[] | null> {
  if (!hygraphClient) return null;
  const w = manuscriptListWhereClause(publishedOnly);
  const args = `${w}, orderBy: title_ASC, first: ${MANUSCRIPT_LIST_FIRST})`;
  const q = `
    query ManuscriptMediaListBareNoDeck {
      ${plural}(${args} {
        id
        slug
        title
        type
        excerpt
        pdfFile { id url fileName mimeType }
        thumbnail { id url fileName mimeType }
      }
    }
  `;
  try {
    const data = await fetchWithCache<Record<string, unknown>>(q);
    const rows = data?.[plural];
    if (!Array.isArray(rows)) return null;
    const filtered = (rows as MediaItemGql[]).filter((r) => mediaItemAllowedForManuscriptRoute(r));
    if (filtered.length === 0) return null;
    return filtered.map((r) => mapMediaItemToCmsUseCase(r));
  } catch {
    return null;
  }
}

async function tryManuscriptMediaItems(
  plural: 'mediaItems' | 'mediaItemS',
  publishedOnly: boolean
): Promise<CmsUseCase[] | null> {
  if (!hygraphClient) return null;
  const w = manuscriptListWhereClause(publishedOnly);
  const args = `${w}, orderBy: title_ASC, first: ${MANUSCRIPT_LIST_FIRST})`;

  const bare = await tryManuscriptMediaItemsBareSelection(plural, publishedOnly);
  if (bare !== null) return bare;

  const bareNoDeck = await tryManuscriptMediaItemsBareNoPdfDeck(plural, publishedOnly);
  if (bareNoDeck !== null) return bareNoDeck;

  const extended = `
    query ManuscriptMediaList {
      ${plural}(${args} {
        id
        slug
        title
        type
        excerpt
        description { text }
        manuscriptPdf { id url fileName mimeType }
        pdfFile { id url fileName mimeType }
        thumbnail { id url fileName }
      }
    }
  `;
  try {
    const data = await fetchWithCache<Record<string, unknown>>(extended);
    const rows = data?.[plural];
    if (!Array.isArray(rows)) return null;
    const filtered = (rows as MediaItemGql[]).filter((r) => mediaItemAllowedForManuscriptRoute(r));
    if (filtered.length === 0) return null;
    return filtered.map((r) => mapMediaItemToCmsUseCase(r));
  } catch {
    /* enum or `type` / `isPublished` may not match this project yet */
  }

  const minimal = `
    query ManuscriptMediaListMin {
      ${plural}(${args} {
        id
        slug
        title
        type
        manuscriptPdf { id url fileName mimeType }
        pdfFile { id url fileName mimeType }
        thumbnail { id url fileName }
      }
    }
  `;
  try {
    const data = await fetchWithCache<Record<string, unknown>>(minimal);
    const rows = data?.[plural];
    if (!Array.isArray(rows)) return null;
    const filtered = (rows as MediaItemGql[]).filter((r) => mediaItemAllowedForManuscriptRoute(r));
    if (filtered.length === 0) return null;
    return filtered.map((r) => mapMediaItemToCmsUseCase(r));
  } catch {
    return null;
  }
}

/** When the enum filter is not deployed yet: fetch candidates and keep manuscript types only. */
async function tryManuscriptMediaItemsClientFilter(
  plural: 'mediaItems' | 'mediaItemS',
  publishedOnly: boolean
): Promise<CmsUseCase[] | null> {
  if (!hygraphClient) return null;
  const pub = publishedOnly ? 'where: { isPublished: true }, ' : '';
  const argsLoose = `(${pub}orderBy: publishedAt_DESC, first: ${MANUSCRIPT_LIST_FIRST})`;
  const qLooseBare = `
    query ManuscriptMediaListLooseBare {
      ${plural}${argsLoose} {
        id
        slug
        title
        type
        excerpt
        pdfFile { id url fileName mimeType }
        pdfDeck { id url fileName mimeType }
        thumbnail { id url fileName mimeType }
      }
    }
  `;
  try {
    const data = await fetchWithCache<Record<string, unknown>>(qLooseBare);
    const rows = data?.[plural];
    if (!Array.isArray(rows)) return null;
    const filtered = (rows as MediaItemGql[]).filter((r) => mediaItemAllowedForManuscriptRoute(r));
    if (filtered.length > 0) return filtered.map((r) => mapMediaItemToCmsUseCase(r));
  } catch {
    /* `publishedAt` ordering or `pdfDeck` may be absent */
  }

  const argsLooseTitle = `(${pub}orderBy: title_ASC, first: ${MANUSCRIPT_LIST_FIRST})`;
  const qLooseBareTitle = `
    query ManuscriptMediaListLooseBareTitle {
      ${plural}${argsLooseTitle} {
        id
        slug
        title
        type
        excerpt
        pdfFile { id url fileName mimeType }
        pdfDeck { id url fileName mimeType }
        thumbnail { id url fileName mimeType }
      }
    }
  `;
  try {
    const data = await fetchWithCache<Record<string, unknown>>(qLooseBareTitle);
    const rows = data?.[plural];
    if (!Array.isArray(rows)) return null;
    const filtered = (rows as MediaItemGql[]).filter((r) => mediaItemAllowedForManuscriptRoute(r));
    if (filtered.length > 0) return filtered.map((r) => mapMediaItemToCmsUseCase(r));
  } catch {
    /* fall through */
  }

  const args = `(${pub}orderBy: title_ASC, first: ${MANUSCRIPT_LIST_FIRST})`;
  const q = `
    query ManuscriptMediaListLoose {
      ${plural}${args} {
        id
        slug
        title
        type
        excerpt
        description { text }
        manuscriptPdf { id url fileName mimeType }
        pdfFile { id url fileName mimeType }
        thumbnail { id url fileName }
      }
    }
  `;
  try {
    const data = await fetchWithCache<Record<string, unknown>>(q);
    const rows = data?.[plural];
    if (!Array.isArray(rows)) return null;
    const filtered = (rows as MediaItemGql[]).filter((r) => mediaItemAllowedForManuscriptRoute(r));
    return filtered.map((r) => mapMediaItemToCmsUseCase(r));
  } catch {
    return null;
  }
}

/**
 * Published `MediaItem` rows eligible as manuscripts (see `mediaItemAllowedForManuscriptRoute`).
 * Loose queries + client filter run when strict `type: PDF` Hygraph filters return nothing.
 */
export async function getAllUseCasesCms(): Promise<CmsUseCase[]> {
  if (!isHygraphConfigured || !hygraphClient) return [];

  const attempts: Array<() => Promise<CmsUseCase[] | null>> = [
    () => tryManuscriptMediaItems('mediaItems', true),
    () => tryManuscriptMediaItems('mediaItems', false),
    () => tryManuscriptMediaItems('mediaItemS', true),
    () => tryManuscriptMediaItems('mediaItemS', false),
    () => tryManuscriptMediaItemsClientFilter('mediaItems', true),
    () => tryManuscriptMediaItemsClientFilter('mediaItems', false),
    () => tryManuscriptMediaItemsClientFilter('mediaItemS', true),
    () => tryManuscriptMediaItemsClientFilter('mediaItemS', false),
  ];

  for (const run of attempts) {
    const rows = await run();
    if (rows !== null && rows.length > 0) return rows;
  }

  return [];
}
