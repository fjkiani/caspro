// Hygraph Content Types for CrisPRO Documentation

// Rich Text type from Hygraph
export interface RichText {
  html: string;
  text: string;
  raw: any;
}

// Document Category
export interface DocCategory {
  id: string;
  title: string;
  slug: string;
  description?: RichText;
  icon?: string;
  order: number;
  articles: DocArticle[];
  parentCategory?: DocCategory;
  childCategories?: DocCategory[];
}

// Documentation Article
export interface DocArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: RichText;
  category: DocCategory;
  tags?: string[];
  relatedArticles?: DocArticle[];
  apiEndpoints?: APIEndpoint[];
  codeExamples?: CodeExample[];
  lastUpdated: string;
  author?: Author;
  seoMetadata?: SEOMetadata;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedReadTime?: number;
}

// API Endpoint
export interface APIEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  description: RichText;
  category: 'ORACLE_DISCRIMINATIVE' | 'FORGE_GENERATIVE' | 'BOLTZ_STRUCTURAL' | 'COMMAND_CENTER';
  parameters: APIParameter[];
  requestBody?: Record<string, any>;
  responseSchema?: Record<string, any>;
  codeExamples: CodeExample[];
  relatedEndpoints?: APIEndpoint[];
  useCases?: UseCase[];
  performanceMetrics?: PerformanceMetrics;
}

// API Parameter
export interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
  example?: string;
  constraints?: string[];
  enum?: string[];
}

// Code Example
export interface CodeExample {
  id: string;
  title: string;
  language: 'PYTHON' | 'JAVASCRIPT' | 'TYPESCRIPT' | 'CURL' | 'GO' | 'JAVA' | 'RUBY';
  code: string;
  description?: string;
  runnable?: boolean;
  expectedOutput?: string;
}

// Use Case / Journey
export interface UseCase {
  id: string;
  title: string;
  slug: string;
  description: RichText;
  industry?: 'BIOTECH' | 'CLINICAL' | 'RESEARCH' | 'PHARMA';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedTime?: string;
  steps: UseCaseStep[];
  outcomes: string[];
  relatedAPIs?: APIEndpoint[];
  prerequisites?: string[];
  thumbnail?: Asset;
}

// Use Case Step
export interface UseCaseStep {
  order: number;
  title: string;
  description: RichText;
  codeExample?: CodeExample;
  tips?: string[];
  apiEndpoint?: APIEndpoint;
}

// FAQ
export interface FAQ {
  id: string;
  question: string;
  answer: RichText;
  category?: string;
  relatedArticles?: DocArticle[];
  helpful?: number;
  notHelpful?: number;
}

// Knowledge Entry (for AI knowledge base)
export interface KnowledgeEntry {
  id: string;
  concept: string;
  definition: RichText;
  relatedConcepts?: KnowledgeEntry[];
  examples?: string[];
  category?: string;
  embeddings?: number[]; // Vector embeddings for RAG
}

// Performance Metrics
export interface PerformanceMetrics {
  auroc?: number;
  auprc?: number;
  samples?: number;
  benchmark?: string;
  source?: string;
  validatedDate?: string;
}

// SEO Metadata
export interface SEOMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

// Author
export interface Author {
  id: string;
  name: string;
  avatar?: Asset;
  bio?: string;
}

// Asset (images, files)
export interface Asset {
  id: string;
  url: string;
  fileName: string;
  mimeType?: string;
  width?: number;
  height?: number;
}

// Search Result
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'article' | 'api' | 'faq' | 'concept' | 'example';
  url: string;
  category?: string;
  relevance: number;
  highlights?: string[];
}

// Navigation Item (for sidebar)
export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  items?: NavItem[];
  external?: boolean;
}

// Navigation Group
export interface NavGroup {
  group: string;
  items: NavItem[];
}

// Page Context (for AI assistant)
export interface PageContext {
  path: string;
  title: string;
  category?: string;
  type: 'article' | 'api' | 'useCase' | 'home';
  contentId?: string;
  relatedTopics?: string[];
}

// AI Chat Message
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: ChatSource[];
  actions?: SuggestedAction[];
  isStreaming?: boolean;
}

// Chat Source Citation
export interface ChatSource {
  title: string;
  url: string;
  excerpt: string;
  type: 'article' | 'api' | 'example';
  relevance: number;
}

// Suggested Action
export interface SuggestedAction {
  label: string;
  type: 'navigate' | 'search' | 'code' | 'contact';
  payload: string;
}

// RAG Response
export interface RAGResponse {
  answer: string;
  confidence: number;
  sources: ChatSource[];
  relatedQuestions?: string[];
  suggestedActions?: SuggestedAction[];
}

// API Playground State
export interface PlaygroundRequest {
  headers: Record<string, string>;
  body: Record<string, any>;
  params: Record<string, any>;
}

export interface PlaygroundResponse {
  status: number;
  data: any;
  duration: number;
  headers: Record<string, string>;
}

export interface PlaygroundState {
  request: PlaygroundRequest;
  response: PlaygroundResponse | null;
  isLoading: boolean;
  error: string | null;
  savedPresets?: { name: string; request: PlaygroundRequest }[];
}


