export interface Author {
  bio?: string;
  name: string;
  id: string;
  photo?: {
    url: string;
  };
}

export interface FeaturedImage {
  url: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface PostNode {
  author?: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: FeaturedImage;
  categories?: Category[];
}

export interface PostDetail extends PostNode {
  content: {
    raw: any;
    html?: string;
    /** Hygraph Rich Text → Markdown projection (when the field is queried). */
    markdown?: string | null;
    /** Hygraph Rich Text → plain-text projection (when the field is queried). */
    text?: string | null;
  };
  /**
   * PDF for the hero/iframe — from `Post.pdfDeck` when present, else merged from
   * `MediaItem.pdfFile` when a `MediaItem` shares the same slug as this post.
   */
  pdfDeck?: { id?: string; url: string; fileName?: string | null; mimeType?: string | null } | null;
  /** Direct HTTPS link to a PDF when Asset upload/picker is not used. */
  pdfDeckUrl?: string | null;
  /** Registry slug / id for `DynamicDeckViewer` (e.g. safety, trials, crispro-101). */
  slideDeckSlug?: string | null;
}