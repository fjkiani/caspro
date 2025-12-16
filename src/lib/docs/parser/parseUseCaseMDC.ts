/**
 * Parse use case from MDC file
 */

import { MDCParser } from './MDCParser';
import { UseCaseParser } from './UseCaseParser';
import type { UseCase } from '../hygraph/types';

export async function parseUseCaseMDC(filePath: string): Promise<UseCase | null> {
  const parsed = await MDCParser.parse(filePath);
  return UseCaseParser.parseUseCase(parsed.content, filePath);
}

/**
 * Parse synthetic lethality use case
 */
export async function parseSyntheticLethalityUseCase(): Promise<UseCase | null> {
  return parseUseCaseMDC('.cursor/rules/APIs/synthethic-lethality.mdc');
}




