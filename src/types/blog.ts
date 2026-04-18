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
    text?: string;
  };
  /** Optional Hygraph Asset — same pattern as CMS UseCase `pdfDeck`. */
  pdfDeck?: { url: string; fileName?: string | null } | null;
  /** Registry slug / id for `DynamicDeckViewer` (e.g. safety, trials, crispro-101). */
  slideDeckSlug?: string | null;
}

/** Minimal post row for “next in category” navigation */
export interface BlogAdjacentPost {
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: FeaturedImage;
  createdAt: string;
}