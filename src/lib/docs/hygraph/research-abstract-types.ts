/** Slide deck / PDF attachment (same Hygraph fields as blog Post). */
export type ResearchAbstractDeck = {
  slideDeckSlug: string | null;
  pdfDeckUrl: string | null;
  pdfDeck: { url: string; fileName?: string | null; mimeType?: string | null } | null;
};

/** Conference abstract — Hygraph `ResearchAbstract` or local fallback. */
export type ResearchAbstract = {
  id: string;
  slug: string;
  title: string;
  bodyHtml: string | null;
  bodyText: string | null;
  link: string | null;
  imageUrl: string | null;
  authorLine: string | null;
  venue: string | null;
  year: number | null;
  order: number | null;
  publishedAt: string | null;
  /** Direct aacrjournals.org page — used for poster image clicks */
  aacrImageUrl: string;
  deck?: ResearchAbstractDeck | null;
};
