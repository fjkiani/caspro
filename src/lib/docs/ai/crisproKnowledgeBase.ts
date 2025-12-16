/**
 * CrisPRO Knowledge Base - Comprehensive indexing of all documentation
 * This ensures the LLM only uses information from our actual documentation
 */

import { MDCParser } from '../parser/MDCParser';
import { parseEndpointsMDC } from '../parser';
import { parseSyntheticLethalityUseCase } from '../parser/parseUseCaseMDC';
import fs from 'fs/promises';
import path from 'path';

export interface KnowledgeChunk {
  id: string;
  type: 'endpoint' | 'use-case' | 'moat' | 'care-plan' | 'concept' | 'case-study';
  title: string;
  content: string;
  url?: string;
  metadata: {
    category?: string;
    tags?: string[];
    source?: string;
    validated?: boolean;
  };
}

/**
 * Parse all knowledge base files from .cursor/rules/APIs/knowledgeBase/
 */
async function parseKnowledgeBaseFiles(): Promise<KnowledgeChunk[]> {
  const chunks: KnowledgeChunk[] = [];
  const knowledgeBasePath = path.join(process.cwd(), '.cursor/rules/APIs/knowledgeBase');

  try {
    const files = await fs.readdir(knowledgeBasePath);
    
    for (const file of files) {
      // Skip non-documentation files
      if (!file.endsWith('.mdc') && !file.endsWith('.md')) continue;
      // Skip hidden files
      if (file.startsWith('.')) continue;

      try {
        // Handle files with special characters in name (e.g., "AK.moat.mdc(use_case)")
        const filePath = path.join(knowledgeBasePath, file);
        
        // Try to read the file directly if MDCParser fails
        let parsed;
        try {
          parsed = await MDCParser.parse(filePath);
        } catch (parseError) {
          // Fallback: read file directly
          const content = await fs.readFile(filePath, 'utf-8');
          parsed = { content, frontmatter: {} };
        }

        // Determine type from filename
        let type: KnowledgeChunk['type'] = 'concept';
        if (file.includes('moat')) type = 'moat';
        else if (file.includes('CARE_PLAN')) type = 'care-plan';
        else if (file.includes('use_case')) type = 'use-case';

        // Extract title (first # heading)
        const titleMatch = parsed.content.match(/^#\s+(.+?)$/m);
        const title = titleMatch?.[1]?.trim() || file.replace(/\.(mdc|md)$/, '');

        // Extract key sections
        const sections = extractSections(parsed.content);

        // Create chunks for each major section
        sections.forEach((section, idx) => {
          chunks.push({
            id: `kb-${file}-${idx}`,
            type,
            title: section.title || title,
            content: section.content,
            metadata: {
              source: file,
              tags: extractTags(parsed.content, file),
              validated: true, // All our docs are validated
            },
          });
        });
      } catch (error) {
        console.error(`Error parsing knowledge base file ${file}:`, error);
      }
    }
  } catch (error) {
    console.error('Error reading knowledge base directory:', error);
  }

  return chunks;
}

/**
 * Extract major sections from MDC content
 */
function extractSections(content: string): Array<{ title: string; content: string }> {
  const sections: Array<{ title: string; content: string }> = [];

  // Extract all ## and ### sections
  const sectionRegex = /^(#{2,3})\s+(.+?)$/gm;
  let lastIndex = 0;
  let lastTitle = 'Overview';
  let match;

  while ((match = sectionRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const startIndex = match.index;
    const endIndex = sectionRegex.lastIndex;

    // Save previous section
    if (startIndex > lastIndex) {
      sections.push({
        title: lastTitle,
        content: content.slice(lastIndex, startIndex).trim(),
      });
    }

    lastTitle = title;
    lastIndex = startIndex;
  }

  // Add final section
  if (lastIndex < content.length) {
    sections.push({
      title: lastTitle,
      content: content.slice(lastIndex).trim(),
    });
  }

  // If no sections found, use entire content
  if (sections.length === 0) {
    sections.push({
      title: 'Overview',
      content: content.trim(),
    });
  }

  return sections;
}

/**
 * Extract tags from content and filename
 */
function extractTags(content: string, filename: string): string[] {
  const tags: string[] = [];

  // Extract from filename
  if (filename.includes('MOAT')) tags.push('moat', 'competitive-advantage');
  if (filename.includes('CARE_PLAN')) tags.push('care-plan', 'clinical');
  if (filename.includes('RESISTANCE')) tags.push('resistance', 'prediction');
  if (filename.includes('TOXICITY')) tags.push('toxicity', 'nutrition');
  if (filename.includes('MECHANISM')) tags.push('mechanism', 'trial-matching');
  if (filename.includes('LLM')) tags.push('llm', 'personalization');

  // Extract from content
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('s/p/e')) tags.push('spe-framework');
  if (lowerContent.includes('synthetic lethality')) tags.push('synthetic-lethality');
  if (lowerContent.includes('brca')) tags.push('brca', 'ovarian-cancer');
  if (lowerContent.includes('parp')) tags.push('parp-inhibitor');
  if (lowerContent.includes('oracle')) tags.push('oracle', 'discriminative');
  if (lowerContent.includes('forge')) tags.push('forge', 'generative');

  return [...new Set(tags)]; // Remove duplicates
}

/**
 * Build complete CrisPRO knowledge base
 */
export async function buildCrisPROKnowledgeBase(): Promise<KnowledgeChunk[]> {
  const chunks: KnowledgeChunk[] = [];

  // 1. Add API endpoints
  try {
    const endpoints = await parseEndpointsMDC();
    endpoints.forEach((endpoint: any) => {
      const params = endpoint.parameters || [];
      const examples = endpoint.codeExamples || [];
      const paramsText = params.map((p: { name: string; type: string; description?: string }) => 
        `Parameter: ${p.name} (${p.type}) - ${p.description || ''}`
      ).join('\n');
      const examplesText = examples.map((ex: { language: string; code: string }) => 
        `Example (${ex.language}):\n${ex.code}`
      ).join('\n\n');
      chunks.push({
        id: `endpoint-${endpoint.id}`,
        type: 'endpoint',
        title: endpoint.name,
        content: `${endpoint.description.text}\n\nPath: ${endpoint.path}\nCategory: ${endpoint.category}\nMethod: ${endpoint.method}\n${paramsText}\n${examplesText}`,
        url: `/docs/api/${endpoint.id}`,
        metadata: {
          category: endpoint.category,
          tags: [endpoint.category.toLowerCase(), endpoint.path],
          validated: true,
        },
      });
    });
  } catch (error) {
    console.error('Error parsing endpoints:', error);
  }

  // 2. Add use cases
  try {
    const useCase = await parseSyntheticLethalityUseCase();
    if (useCase) {
      chunks.push({
        id: `usecase-${useCase.id}`,
        type: 'use-case',
        title: useCase.title,
        content: `${useCase.description.text}\n\nSteps: ${useCase.steps.map(s => `${s.order}. ${s.title}: ${s.description.text}`).join('\n')}\n\nOutcomes: ${useCase.outcomes.join(', ')}`,
        url: `/docs/use-cases/${useCase.slug}`,
        metadata: {
          category: useCase.industry,
          tags: ['use-case', 'synthetic-lethality', useCase.industry?.toLowerCase() || ''],
          validated: true,
        },
      });
    }
  } catch (error) {
    console.error('Error parsing use case:', error);
  }

  // 3. Add knowledge base files
  try {
    const kbChunks = await parseKnowledgeBaseFiles();
    chunks.push(...kbChunks);
  } catch (error) {
    console.error('Error parsing knowledge base files:', error);
  }

  return chunks;
}

/**
 * Search knowledge base with relevance scoring
 */
export async function searchCrisPROKnowledgeBase(
  query: string,
  limit = 5,
  typeFilter?: KnowledgeChunk['type']
): Promise<KnowledgeChunk[]> {
  const kb = await buildCrisPROKnowledgeBase();
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2);

  // Score each chunk
  const scored = kb
    .filter(chunk => !typeFilter || chunk.type === typeFilter)
    .map(chunk => {
      const lowerTitle = chunk.title.toLowerCase();
      const lowerContent = chunk.content.toLowerCase();
      const lowerTags = chunk.metadata.tags?.join(' ').toLowerCase() || '';

      // Scoring algorithm
      let score = 0;

      // Exact title match (highest priority)
      if (lowerTitle.includes(lowerQuery)) score += 10;
      
      // Title word matches
      queryWords.forEach(word => {
        if (lowerTitle.includes(word)) score += 5;
      });

      // Content matches
      queryWords.forEach(word => {
        const contentMatches = (lowerContent.match(new RegExp(word, 'g')) || []).length;
        score += Math.min(contentMatches * 0.5, 3); // Cap at 3 per word
      });

      // Tag matches
      queryWords.forEach(word => {
        if (lowerTags.includes(word)) score += 2;
      });

      // Exact phrase match in content
      if (lowerContent.includes(lowerQuery)) score += 3;

      // Type-specific boosts
      if (chunk.type === 'endpoint' && queryWords.some(w => ['api', 'endpoint', 'predict', 'generate'].includes(w))) {
        score += 2;
      }

      return { chunk, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(item => item.chunk);
}

/**
 * Get context string for LLM from search results
 */
export function buildContextString(chunks: KnowledgeChunk[]): string {
  if (chunks.length === 0) {
    return 'No relevant documentation found.';
  }

  return chunks
    .map((chunk, idx) => {
      const typeLabel = chunk.type.toUpperCase().replace('-', ' ');
      return `
[${idx + 1}] ${typeLabel}: ${chunk.title}
${chunk.content.slice(0, 800)}${chunk.content.length > 800 ? '...' : ''}
${chunk.url ? `Source: ${chunk.url}` : `Source: ${chunk.metadata.source || 'CrisPRO Documentation'}`}
---`;
    })
    .join('\n\n');
}

