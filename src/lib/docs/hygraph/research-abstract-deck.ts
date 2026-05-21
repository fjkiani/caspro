/**
 * Deck / PDF on conference abstracts — same Post fields as blog (`slideDeckSlug`, `pdfDeckUrl`, `pdfDeck`).
 * Merges optional fields when present on Content API; falls back to `abstract-deck-config.json`.
 */

import { fetchWithCache, hygraphClient } from './client';
import type { ResearchAbstractDeck } from './research-abstract-types';
import deckConfig from '@/data/abstract-deck-config.json';

type PdfAsset = { id?: string; url: string; fileName?: string | null; mimeType?: string | null };

type DeckMergeResult = {
  slideDeckSlug?: string | null;
  pdfDeckUrl?: string | null;
  pdfDeck?: PdfAsset | null;
};

const configBySlug = new Map(
  (deckConfig.items || []).map((row) => [row.slug.replace(/-+$/, ''), row]),
);

async function tryMergePostField<T>(slug: string, query: string): Promise<T | null> {
  if (!hygraphClient) return null;
  try {
    const data = await fetchWithCache<{ post: T | null }>(query, { slug }, 60);
    return data.post ?? null;
  } catch {
    return null;
  }
}

/** Same merge order as `getPostDetails` in services/index.js (stripped to deck fields). */
export async function fetchAbstractDeckBySlug(slug: string): Promise<DeckMergeResult> {
  const s = slug.replace(/\/+$/, '').replace(/-+$/, '');
  const out: DeckMergeResult = {};

  const pdfDeckQuery = `
    query MergeAbstractPdfDeck($slug: String!) {
      post(where: { slug: $slug }) {
        pdfDeck { id url fileName mimeType }
      }
    }
  `;
  const slideSlugQuery = `
    query MergeAbstractSlideDeckSlug($slug: String!) {
      post(where: { slug: $slug }) { slideDeckSlug }
    }
  `;
  const pdfUrlQuery = `
    query MergeAbstractPdfDeckUrl($slug: String!) {
      post(where: { slug: $slug }) { pdfDeckUrl }
    }
  `;
  const deckAssetQuery = `
    query MergeAbstractDeckAsset($slug: String!) {
      post(where: { slug: $slug }) {
        deck { id url fileName mimeType }
      }
    }
  `;
  const slideAssetQuery = `
    query MergeAbstractSlideDeckAsset($slug: String!) {
      post(where: { slug: $slug }) {
        slideDeck { id url fileName mimeType }
      }
    }
  `;
  const deckSlugQuery = `
    query MergeAbstractDeckSlug($slug: String!) {
      post(where: { slug: $slug }) { deckSlug }
    }
  `;

  const pdf = await tryMergePostField<{ pdfDeck: PdfAsset | null }>(s, pdfDeckQuery);
  if (pdf?.pdfDeck?.url) out.pdfDeck = pdf.pdfDeck;

  const slide = await tryMergePostField<{ slideDeckSlug: string | null }>(s, slideSlugQuery);
  if (slide?.slideDeckSlug?.trim()) out.slideDeckSlug = slide.slideDeckSlug.trim();

  const pdfUrl = await tryMergePostField<{ pdfDeckUrl: string | null }>(s, pdfUrlQuery);
  if (pdfUrl?.pdfDeckUrl?.trim()) out.pdfDeckUrl = pdfUrl.pdfDeckUrl.trim();

  const deckAsset = await tryMergePostField<{ deck: PdfAsset | null }>(s, deckAssetQuery);
  if (deckAsset?.deck?.url && !out.pdfDeck?.url) out.pdfDeck = deckAsset.deck;

  const slideAsset = await tryMergePostField<{ slideDeck: PdfAsset | null }>(s, slideAssetQuery);
  if (slideAsset?.slideDeck?.url && !out.pdfDeck?.url) out.pdfDeck = slideAsset.slideDeck;

  const deckSlug = await tryMergePostField<{ deckSlug: string | null }>(s, deckSlugQuery);
  if (deckSlug?.deckSlug?.trim() && !out.slideDeckSlug) out.slideDeckSlug = deckSlug.deckSlug.trim();

  // MediaItem paired by same slug (trial/blog pattern)
  const mediaItemQuery = `
    query MergeAbstractMediaItem($slug: String!) {
      mediaItem(where: { slug: $slug }) {
        deckSlug
        pdfFile { id url fileName mimeType }
        pdfDeck { id url fileName mimeType }
      }
    }
  `;
  try {
    if (hygraphClient) {
      const data = await fetchWithCache<{
        mediaItem: {
          deckSlug?: string | null;
          pdfFile?: PdfAsset | null;
          pdfDeck?: PdfAsset | null;
        } | null;
      }>(mediaItemQuery, { slug: s }, 60);
      const mi = data.mediaItem;
      if (mi) {
        const pdfMi = mi.pdfFile?.url ? mi.pdfFile : mi.pdfDeck?.url ? mi.pdfDeck : null;
        if (pdfMi?.url) out.pdfDeck = pdfMi;
        if (mi.deckSlug?.trim()) out.slideDeckSlug = mi.deckSlug.trim();
      }
    }
  } catch {
    /* MediaItem not in schema or no row */
  }

  const local = configBySlug.get(s);
  if (local) {
    if (!out.slideDeckSlug && local.slideDeckSlug) out.slideDeckSlug = local.slideDeckSlug;
    if (!out.pdfDeckUrl && local.pdfDeckUrl) out.pdfDeckUrl = local.pdfDeckUrl;
    if (!out.pdfDeck?.url && local.pdfDeckUrl) {
      out.pdfDeckUrl = local.pdfDeckUrl;
    }
  }

  return out;
}

export function toResearchAbstractDeck(merged: DeckMergeResult): ResearchAbstractDeck | null {
  const slideDeckSlug = merged.slideDeckSlug?.trim() || null;
  const pdfDeckUrl = merged.pdfDeckUrl?.trim() || null;
  const pdfDeck = merged.pdfDeck?.url
    ? {
        url: merged.pdfDeck.url,
        fileName: merged.pdfDeck.fileName ?? null,
        mimeType: merged.pdfDeck.mimeType ?? null,
      }
    : null;

  if (!slideDeckSlug && !pdfDeckUrl && !pdfDeck) return null;

  return { slideDeckSlug, pdfDeckUrl, pdfDeck };
}

export function abstractHasDeck(deck: ResearchAbstractDeck | null | undefined): boolean {
  if (!deck) return false;
  return Boolean(
    deck.slideDeckSlug?.trim() || deck.pdfDeckUrl?.trim() || deck.pdfDeck?.url?.trim(),
  );
}
