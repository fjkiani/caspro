/**
 * Knowledge Base Builder
 * Builds a searchable knowledge base from parsed documentation
 */

import { parseEndpointsMDC } from '../parser';
import { parseSyntheticLethalityUseCase } from '../parser/parseUseCaseMDC';

export interface KnowledgeChunk {
  id: string;
  type: 'endpoint' | 'use-case' | 'concept';
  title: string;
  content: string;
  url: string;
  metadata: {
    category?: string;
    tags?: string[];
  };
}

/**
 * Build knowledge base from all parsed documentation
 */
export async function buildKnowledgeBase(): Promise<KnowledgeChunk[]> {
  const chunks: KnowledgeChunk[] = [];

  // Add endpoints
  try {
    const endpoints = await parseEndpointsMDC();
    endpoints.forEach((endpoint: any) => {
      const params = endpoint.parameters || [];
      const paramsText = params.map((p: { name: string; type: string }) => 
        `Parameter: ${p.name} (${p.type})`
      ).join('\n');
      chunks.push({
        id: `endpoint-${endpoint.id}`,
        type: 'endpoint',
        title: endpoint.name,
        content: `${endpoint.description.text}\n\nPath: ${endpoint.path}\nCategory: ${endpoint.category}\n${paramsText}`,
        url: `/docs/api/${endpoint.id}`,
        metadata: {
          category: endpoint.category,
          tags: [endpoint.category, endpoint.path],
        },
      });
    });
  } catch (error) {
    console.error('Error parsing endpoints for knowledge base:', error);
  }

  // Add use cases
  try {
    const useCase = await parseSyntheticLethalityUseCase();
    if (useCase) {
      chunks.push({
        id: `usecase-${useCase.id}`,
        type: 'use-case',
        title: useCase.title,
        content: `${useCase.description.text}\n\nSteps: ${useCase.steps.map(s => s.title).join(', ')}\nOutcomes: ${useCase.outcomes.join(', ')}`,
        url: `/docs/use-cases/${useCase.slug}`,
        metadata: {
          category: useCase.industry,
          tags: ['use-case', 'synthetic-lethality', useCase.industry || ''],
        },
      });
    }
  } catch (error) {
    console.error('Error parsing use case for knowledge base:', error);
  }

  return chunks;
}

/**
 * Search knowledge base by query (simple text matching for now)
 * TODO: Replace with vector search when embeddings are available
 */
export async function searchKnowledgeBase(query: string, limit = 5): Promise<KnowledgeChunk[]> {
  const kb = await buildKnowledgeBase();
  const lowerQuery = query.toLowerCase();

  // Simple text matching
  const scored = kb.map(chunk => {
    const titleMatch = chunk.title.toLowerCase().includes(lowerQuery) ? 3 : 0;
    const contentMatch = chunk.content.toLowerCase().includes(lowerQuery) ? 1 : 0;
    const tagMatch = chunk.metadata.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ? 2 : 0;
    const score = titleMatch + contentMatch + tagMatch;
    return { chunk, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.chunk);
}


