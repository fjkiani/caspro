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
};
