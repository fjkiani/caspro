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
} 