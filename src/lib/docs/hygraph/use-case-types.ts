/**
 * Hygraph UseCase content types (CMS UseCase model).
 * Used for the Use Case section: rich narrative, scientific/engineering focus.
 */

import type { Asset } from './types';

export interface UseCaseRichText {
  html?: string;
  text?: string;
  raw?: unknown;
}

export interface CmsUseCase {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;

  // Narrative sections (RICHTEXT) – optional
  clientChallenge?: UseCaseRichText | null;
  beforeState?: UseCaseRichText | null;
  jediApproach?: UseCaseRichText | null;
  outcomes?: UseCaseRichText | null;
  resultsHeadline?: string | null;
  resultsNarrative?: UseCaseRichText | null;
  architectureNarrative?: UseCaseRichText | null;
  technologyNarrative?: UseCaseRichText | null;
  capabilityNarrative?: UseCaseRichText | null;
  prerequisites?: UseCaseRichText | null;
  risksAndMitigations?: UseCaseRichText | null;
  testScenarios?: UseCaseRichText | null;

  // Media
  heroImage?: Asset | null;
  thumbnail?: Asset | null;
  pdfDeck?: Asset | null;
  demoVideoUrl?: string | null;
}
