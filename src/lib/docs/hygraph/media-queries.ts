/**
 * HyGraph GraphQL Queries for Media Content
 */

import { hygraphClient, fetchWithCache } from './client';
import type { MediaItem, MediaCategory, MediaItemWithContent } from './media-types';

const isHygraphConfigured = !!process.env.HYGRAPH_ENDPOINT || !!process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

// =====================================================
// GraphQL Queries
// =====================================================

const GET_ALL_MEDIA = `
  query GetAllMedia($where: MediaItemWhereInput, $orderBy: MediaItemOrderByInput) {
    mediaItems(where: $where, orderBy: $orderBy) {
      id
      title
      slug
      description {
        html
        text
      }
      excerpt
      type
      category {
        id
        title
        slug
      }
      tags
      pdfFile {
        id
        url
        fileName
        mimeType
      }
      videoUrl
      videoFile {
        id
        url
        fileName
        mimeType
      }
      thumbnail {
        id
        url
        fileName
        width
        height
      }
      deckId
      deckSlug
      featuredImage {
        id
        url
        fileName
        width
        height
      }
      publishedAt
      updatedAt
      author {
        name
        avatar {
          url
        }
      }
      seoMetadata {
        metaTitle
        metaDescription
        keywords
      }
      order
      isPublished
    }
  }
`;

const GET_MEDIA_BY_SLUG = `
  query GetMediaBySlug($slug: String!) {
    mediaItem(where: { slug: $slug }) {
      id
      title
      slug
      description {
        html
        text
      }
      excerpt
      type
      category {
        id
        title
        slug
      }
      tags
      pdfFile {
        id
        url
        fileName
        mimeType
      }
      videoUrl
      videoFile {
        id
        url
        fileName
        mimeType
      }
      thumbnail {
        id
        url
        fileName
        width
        height
      }
      deckId
      deckSlug
      featuredImage {
        id
        url
        fileName
        width
        height
      }
      publishedAt
      updatedAt
      author {
        name
        avatar {
          url
        }
      }
      seoMetadata {
        metaTitle
        metaDescription
        keywords
      }
      order
      isPublished
    }
  }
`;

const GET_ALL_MEDIA_CATEGORIES = `
  query GetAllMediaCategories {
    mediaCategories(orderBy: order_ASC) {
      id
      title
      slug
      description {
        html
        text
      }
      order
      mediaItems(where: { isPublished: true }) {
        id
        title
        slug
        type
      }
    }
  }
`;

const GET_MEDIA_CATEGORY_BY_SLUG = `
  query GetMediaCategoryBySlug($slug: String!) {
    mediaCategory(where: { slug: $slug }) {
      id
      title
      slug
      description {
        html
        text
      }
      order
      mediaItems(where: { isPublished: true }, orderBy: order_ASC) {
        id
        title
        slug
        type
        excerpt
        featuredImage {
          url
          fileName
        }
        pdfFile {
          url
          fileName
        }
        videoUrl
        videoFile {
          url
          fileName
        }
        thumbnail {
          url
        }
        deckSlug
      }
    }
  }
`;

// =====================================================
// API Functions
// =====================================================

/**
 * Get all media items with optional filtering
 */
export async function getAllMedia(
  filter?: {
    type?: 'PDF' | 'VIDEO' | 'DECK';
    category?: string;
    tags?: string[];
    search?: string;
  },
  orderBy: 'order_ASC' | 'order_DESC' | 'publishedAt_DESC' | 'title_ASC' = 'order_ASC'
): Promise<MediaItem[]> {
  if (!isHygraphConfigured) return [];
  
  const where: any = { isPublished: true };
  
  if (filter?.type) {
    where.type = filter.type;
  }
  
  if (filter?.category) {
    where.category = { slug: filter.category };
  }
  
  if (filter?.tags && filter.tags.length > 0) {
    where.tags_contains_some = filter.tags;
  }
  
  if (filter?.search) {
    where._search = filter.search;
  }
  
  const { mediaItems } = await fetchWithCache<{ mediaItems: MediaItem[] }>(
    GET_ALL_MEDIA,
    { where, orderBy }
  );
  
  return mediaItems || [];
}

/**
 * Get a media item by slug
 */
export async function getMediaBySlug(slug: string): Promise<MediaItem | null> {
  if (!isHygraphConfigured) return null;
  
  const { mediaItem } = await fetchWithCache<{ mediaItem: MediaItem | null }>(
    GET_MEDIA_BY_SLUG,
    { slug }
  );
  
  return mediaItem;
}

/**
 * Get all media categories
 */
export async function getAllMediaCategories(): Promise<MediaCategory[]> {
  if (!isHygraphConfigured) return [];
  
  const { mediaCategories } = await fetchWithCache<{ mediaCategories: MediaCategory[] }>(
    GET_ALL_MEDIA_CATEGORIES
  );
  
  return mediaCategories || [];
}

/**
 * Get a media category by slug with its items
 */
export async function getMediaCategoryBySlug(slug: string): Promise<MediaCategory | null> {
  if (!isHygraphConfigured) return null;
  
  const { mediaCategory } = await fetchWithCache<{ mediaCategory: MediaCategory | null }>(
    GET_MEDIA_CATEGORY_BY_SLUG,
    { slug }
  );
  
  return mediaCategory;
}

/**
 * Convert video URLs to embed format
 */
function convertToEmbedUrl(url: string): string {
  // YouTube
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // Vimeo
  if (url.includes('vimeo.com/')) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
  }
  
  // Return original if not recognized
  return url;
}

/**
 * Resolve media content URLs and prepare for display
 */
export function resolveMediaContent(media: MediaItem): MediaItemWithContent {
  const content: MediaItemWithContent['content'] = {};
  
  if (media.type === 'PDF' && media.pdfFile) {
    content.pdfUrl = media.pdfFile.url;
  }
  
  if (media.type === 'VIDEO') {
    if (media.videoUrl) {
      // Convert YouTube/Vimeo URLs to embed format
      content.videoEmbedUrl = convertToEmbedUrl(media.videoUrl);
    } else if (media.videoFile) {
      content.videoFileUrl = media.videoFile.url;
    }
  }
  
  if (media.type === 'DECK' && media.deckSlug) {
    // Deck data would be loaded separately
    content.deckData = { slug: media.deckSlug, id: media.deckId };
  }
  
  return {
    ...media,
    content,
  };
}

// Export queries for custom usage
export const mediaQueries = {
  GET_ALL_MEDIA,
  GET_MEDIA_BY_SLUG,
  GET_ALL_MEDIA_CATEGORIES,
  GET_MEDIA_CATEGORY_BY_SLUG,
};
