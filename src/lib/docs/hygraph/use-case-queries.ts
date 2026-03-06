/**
 * Hygraph GraphQL queries for Use Case content (CMS UseCase model).
 * Fetches full narrative + rich text + assets for the Use Case section.
 */

import { fetchWithCache } from './client';
import type { CmsUseCase } from './use-case-types';

const isHygraphConfigured = !!(
  process.env.HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
);

const richTextFields = `
  html
  text
`;

/**
 * Get a single UseCase by slug (full content for detail page).
 */
export async function getUseCaseBySlugCms(slug: string): Promise<CmsUseCase | null> {
  if (!isHygraphConfigured) return null;

  try {
    const query = `
      query GetUseCaseBySlug($slug: String!) {
        useCase(where: { slug: $slug }) {
          id
          title
          slug
          description
          clientChallenge { ${richTextFields} }
          beforeState { ${richTextFields} }
          jediApproach { ${richTextFields} }
          outcomes { ${richTextFields} }
          resultsHeadline
          resultsNarrative { ${richTextFields} }
          architectureNarrative { ${richTextFields} }
          technologyNarrative { ${richTextFields} }
          capabilityNarrative { ${richTextFields} }
          prerequisites { ${richTextFields} }
          risksAndMitigations { ${richTextFields} }
          testScenarios { ${richTextFields} }
          demoVideoUrl
          heroImage { id url fileName mimeType width height }
          thumbnail { id url fileName mimeType width height }
          pdfDeck { id url fileName mimeType }
        }
      }
    `;
    const data = await fetchWithCache<{ useCase: CmsUseCase | null }>(query, { slug });
    return data?.useCase ?? null;
  } catch (error) {
    console.error('[getUseCaseBySlugCms] Error:', error);
    return null;
  }
}

/**
 * Get all UseCases for listing (minimal fields).
 */
export async function getAllUseCasesCms(): Promise<CmsUseCase[]> {
  if (!isHygraphConfigured) return [];

  try {
    const query = `
      query GetAllUseCasesCms {
        useCaseS(orderBy: title_ASC) {
          id
          title
          slug
          description
          resultsHeadline
          thumbnail { id url fileName }
        }
      }
    `;
    const data = await fetchWithCache<{ useCaseS: CmsUseCase[] }>(query);
    return data?.useCaseS ?? [];
  } catch (error) {
    console.error('[getAllUseCasesCms] Error:', error);
    return [];
  }
}
