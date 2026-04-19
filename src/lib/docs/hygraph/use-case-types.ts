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
  /** Slide deck / general PDF (legacy iframe path superseded by flip reader when present alone). */
  pdfDeck?: Asset | null;
  /**
   * Optional long-form manuscript PDF — preferred for the page-flip reader when set.
   * Can live on `UseCase` and/or the `MediaItem` with the same slug (merged at fetch time).
   */
  manuscriptPdf?: Asset | null;
  demoVideoUrl?: string | null;
}
