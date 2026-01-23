/**
 * Hygraph GraphQL Client for CrisPRO Documentation
 * 
 * This client handles all communication with Hygraph CMS
 * for fetching documentation content.
 */

import { GraphQLClient } from 'graphql-request';
import type {
  DocCategory,
  DocArticle,
  APIEndpoint,
  UseCase,
  FAQ,
  KnowledgeEntry,
  SearchResult,
} from './types';

// Environment variables
const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT || process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

// Check if Hygraph is configured
const isHygraphConfigured = !!HYGRAPH_ENDPOINT;

// Create GraphQL client (if configured)
export const hygraphClient = isHygraphConfigured
  ? new GraphQLClient(HYGRAPH_ENDPOINT!, {
      headers: HYGRAPH_TOKEN ? { Authorization: `Bearer ${HYGRAPH_TOKEN}` } : {},
    })
  : null;

// Cache configuration
const CACHE_TTL = 60 * 60; // 1 hour in seconds
const cache = new Map<string, { data: any; timestamp: number }>();

/**
 * Fetch with caching support
 */
export async function fetchWithCache<T>(
  query: string,
  variables?: Record<string, any>,
  revalidate = CACHE_TTL
): Promise<T> {
  if (!hygraphClient) {
    throw new Error('Hygraph is not configured. Please set HYGRAPH_ENDPOINT environment variable.');
  }

  const cacheKey = JSON.stringify({ query, variables });
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < revalidate * 1000) {
    return cached.data as T;
  }

  const data = await hygraphClient.request<T>(query, variables);
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}

/**
 * Clear cache (useful for webhooks)
 */
export function clearCache(pattern?: string): void {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
}

// =====================================================
// GraphQL Queries
// =====================================================

const GET_ALL_CATEGORIES = `
  query GetAllCategories {
    docCategories(orderBy: order_ASC) {
      id
      title
      slug
      description {
        html
        text
      }
      icon
      order
      articles(orderBy: title_ASC) {
        id
        title
        slug
        excerpt
      }
    }
  }
`;

const GET_CATEGORY_BY_SLUG = `
  query GetCategoryBySlug($slug: String!) {
    docCategory(where: { slug: $slug }) {
      id
      title
      slug
      description {
        html
        text
      }
      icon
      articles(orderBy: title_ASC) {
        id
        title
        slug
        excerpt
        difficulty
        estimatedReadTime
        lastUpdated
      }
    }
  }
`;

const GET_ARTICLE_BY_SLUG = `
  query GetArticleBySlug($slug: String!) {
    docArticle(where: { slug: $slug }) {
      id
      title
      slug
      excerpt
      content {
        html
        text
        raw
      }
      category {
        id
        title
        slug
      }
      tags
      relatedArticles {
        id
        title
        slug
        excerpt
      }
      apiEndpoints {
        id
        name
        path
        method
        category
      }
      codeExamples {
        id
        title
        language
        code
        description
      }
      lastUpdated
      difficulty
      estimatedReadTime
      author {
        name
        avatar {
          url
        }
      }
    }
  }
`;

const GET_ALL_API_ENDPOINTS = `
  query GetAllAPIEndpoints {
    apiEndpoints(orderBy: name_ASC) {
      id
      name
      path
      method
      description {
        text
      }
      category
      performanceMetrics {
        auroc
        samples
        benchmark
      }
    }
  }
`;

const GET_API_ENDPOINT_BY_PATH = `
  query GetAPIEndpointByPath($path: String!) {
    apiEndpoint(where: { path: $path }) {
      id
      name
      path
      method
      description {
        html
        text
      }
      category
      parameters
      requestBody
      responseSchema
      codeExamples {
        id
        title
        language
        code
        description
        runnable
      }
      relatedEndpoints {
        id
        name
        path
      }
      useCases {
        id
        title
        slug
      }
      performanceMetrics {
        auroc
        auprc
        samples
        benchmark
        source
      }
    }
  }
`;

const GET_USE_CASE_BY_SLUG = `
  query GetUseCaseBySlug($slug: String!) {
    useCase(where: { slug: $slug }) {
      id
      title
      slug
      description {
        html
        text
      }
      industry
      difficulty
      estimatedTime
      steps {
        order
        title
        description {
          html
        }
        tips
      }
      outcomes
      prerequisites
      relatedAPIs {
        id
        name
        path
      }
    }
  }
`;

const GET_ALL_USE_CASES = `
  query GetAllUseCases {
    useCases(orderBy: title_ASC) {
      id
      title
      slug
      description {
        text
      }
      industry
      difficulty
      estimatedTime
    }
  }
`;

const GET_FAQS = `
  query GetFAQs($category: String) {
    faqs(where: { category: $category }, orderBy: question_ASC) {
      id
      question
      answer {
        html
        text
      }
      category
      helpful
      notHelpful
    }
  }
`;

const SEARCH_CONTENT = `
  query SearchContent($query: String!, $first: Int) {
    docArticles(where: { _search: $query }, first: $first) {
      id
      title
      slug
      excerpt
      category {
        title
        slug
      }
    }
    apiEndpoints(where: { _search: $query }, first: $first) {
      id
      name
      path
      description {
        text
      }
      category
    }
    faqs(where: { _search: $query }, first: $first) {
      id
      question
      answer {
        text
      }
      category
    }
  }
`;

const GET_KNOWLEDGE_ENTRIES = `
  query GetKnowledgeEntries($category: String) {
    knowledgeEntries(where: { category: $category }) {
      id
      concept
      definition {
        html
        text
      }
      examples
      category
    }
  }
`;

// =====================================================
// API Functions
// =====================================================

/**
 * Get all documentation categories
 */
export async function getAllCategories(): Promise<DocCategory[]> {
  if (!isHygraphConfigured) return [];
  
  const { docCategories } = await fetchWithCache<{ docCategories: DocCategory[] }>(
    GET_ALL_CATEGORIES
  );
  return docCategories;
}

/**
 * Get a category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<DocCategory | null> {
  if (!isHygraphConfigured) return null;
  
  const { docCategory } = await fetchWithCache<{ docCategory: DocCategory | null }>(
    GET_CATEGORY_BY_SLUG,
    { slug }
  );
  return docCategory;
}

/**
 * Get an article by slug
 */
export async function getArticleBySlug(slug: string): Promise<DocArticle | null> {
  if (!isHygraphConfigured) return null;
  
  const { docArticle } = await fetchWithCache<{ docArticle: DocArticle | null }>(
    GET_ARTICLE_BY_SLUG,
    { slug }
  );
  return docArticle;
}

/**
 * Get all API endpoints
 */
export async function getAllAPIEndpoints(): Promise<APIEndpoint[]> {
  if (!isHygraphConfigured) return [];
  
  const { apiEndpoints } = await fetchWithCache<{ apiEndpoints: APIEndpoint[] }>(
    GET_ALL_API_ENDPOINTS
  );
  return apiEndpoints;
}

/**
 * Get an API endpoint by path
 */
export async function getAPIEndpointByPath(path: string): Promise<APIEndpoint | null> {
  if (!isHygraphConfigured) return null;
  
  const { apiEndpoint } = await fetchWithCache<{ apiEndpoint: APIEndpoint | null }>(
    GET_API_ENDPOINT_BY_PATH,
    { path }
  );
  return apiEndpoint;
}

/**
 * Get a use case by slug
 */
export async function getUseCaseBySlug(slug: string): Promise<UseCase | null> {
  if (!isHygraphConfigured) return null;
  
  const { useCase } = await fetchWithCache<{ useCase: UseCase | null }>(
    GET_USE_CASE_BY_SLUG,
    { slug }
  );
  return useCase;
}

/**
 * Get all use cases
 */
export async function getAllUseCases(): Promise<UseCase[]> {
  if (!isHygraphConfigured) return [];
  
  const { useCases } = await fetchWithCache<{ useCases: UseCase[] }>(
    GET_ALL_USE_CASES
  );
  return useCases;
}

/**
 * Get FAQs, optionally filtered by category
 */
export async function getFAQs(category?: string): Promise<FAQ[]> {
  if (!isHygraphConfigured) return [];
  
  const { faqs } = await fetchWithCache<{ faqs: FAQ[] }>(
    GET_FAQS,
    { category }
  );
  return faqs;
}

/**
 * Search across all content
 */
export async function searchContent(query: string, limit = 10): Promise<{
  articles: DocArticle[];
  endpoints: APIEndpoint[];
  faqs: FAQ[];
}> {
  if (!isHygraphConfigured) {
    return { articles: [], endpoints: [], faqs: [] };
  }
  
  const result = await fetchWithCache<{
    docArticles: DocArticle[];
    apiEndpoints: APIEndpoint[];
    faqs: FAQ[];
  }>(SEARCH_CONTENT, { query, first: limit });
  
  return {
    articles: result.docArticles,
    endpoints: result.apiEndpoints,
    faqs: result.faqs,
  };
}

/**
 * Get knowledge entries for AI
 */
export async function getKnowledgeEntries(category?: string): Promise<KnowledgeEntry[]> {
  if (!isHygraphConfigured) return [];
  
  const { knowledgeEntries } = await fetchWithCache<{ knowledgeEntries: KnowledgeEntry[] }>(
    GET_KNOWLEDGE_ENTRIES,
    { category }
  );
  return knowledgeEntries;
}

/**
 * Check if Hygraph is configured
 */
export function isContentManagementConfigured(): boolean {
  return isHygraphConfigured;
}

// Export queries for custom usage
export const queries = {
  GET_ALL_CATEGORIES,
  GET_CATEGORY_BY_SLUG,
  GET_ARTICLE_BY_SLUG,
  GET_ALL_API_ENDPOINTS,
  GET_API_ENDPOINT_BY_PATH,
  GET_USE_CASE_BY_SLUG,
  GET_ALL_USE_CASES,
  GET_FAQS,
  SEARCH_CONTENT,
  GET_KNOWLEDGE_ENTRIES,
};


