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
   * PDF for the hero/iframe — from `Post.pdfDeck`, optional Hygraph aliases `deck` / `slideDeck`
   * (Asset), or merged from `MediaItem` / `Post.deck` (MediaItem) when it shares the post slug.
   */
  pdfDeck?: { id?: string; url: string; fileName?: string | null; mimeType?: string | null } | null;
  /** Direct HTTPS link to a PDF when Asset upload/picker is not used. */
  pdfDeckUrl?: string | null;
  /**
   * Registry id for `DynamicDeckViewer` (`getDeckBySlug`), from `slideDeckSlug`, `deckSlug`,
   * `deckId`, `MediaItem.deckSlug` / `slideDeckSlug`, or linked `Post.deck` (MediaItem).
   */
  slideDeckSlug?: string | null;
}