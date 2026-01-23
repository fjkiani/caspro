/**
 * Media Content Types for CrisPRO Media Page
 * 
 * Supports PDFs, Videos, and Slide Decks from HyGraph CMS
 */

import type { Asset, RichText } from './types';

// Media Type Enum
export type MediaType = 'PDF' | 'VIDEO' | 'DECK';

// Media Category
export interface MediaCategory {
  id: string;
  title: string;
  slug: string;
  description?: RichText;
  order: number;
  mediaItems: MediaItem[];
}

// Media Item (1-pager, deck, video)
export interface MediaItem {
  id: string;
  title: string;
  slug: string;
  description?: RichText;
  excerpt?: string;
  type: MediaType;
  category?: MediaCategory;
  tags?: string[];
  
  // PDF-specific fields
  pdfFile?: Asset; // Uploaded PDF file
  
  // Video-specific fields
  videoUrl?: string; // External video URL (YouTube, Vimeo, etc.)
  videoFile?: Asset; // Uploaded video file
  thumbnail?: Asset; // Video thumbnail
  
  // Deck-specific fields
  deckId?: string; // Reference to existing deck
  deckSlug?: string; // Slug for deck navigation
  
  // Common fields
  featuredImage?: Asset;
  publishedAt: string;
  updatedAt: string;
  author?: {
    name: string;
    avatar?: Asset;
  };
  
  // SEO
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  
  // Display order
  order: number;
  
  // Visibility
  isPublished: boolean;
}

// Media Item with resolved content
export interface MediaItemWithContent extends MediaItem {
  // Resolved content based on type
  content?: {
    pdfUrl?: string;
    videoEmbedUrl?: string;
    videoFileUrl?: string;
    deckData?: any; // Deck data structure
  };
}

// Media Filter Options
export interface MediaFilter {
  type?: MediaType;
  category?: string;
  tags?: string[];
  search?: string;
}

// Media Page Metadata
export interface MediaPageMetadata {
  title: string;
  description: string;
  categories: MediaCategory[];
  totalItems: number;
}
