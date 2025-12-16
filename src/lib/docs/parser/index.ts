/**
 * Parser exports - Main entry point for MDC parsing
 */

export { MDCParser, type ParsedMDC } from './MDCParser';
export { EndpointParser } from './EndpointParser';
export { UseCaseParser } from './UseCaseParser';
export { parseUseCaseMDC, parseSyntheticLethalityUseCase } from './parseUseCaseMDC';

/**
 * Parse endpoints.mdc (full file - all endpoints)
 */
export async function parseEndpointsMDC(): Promise<any[]> {
  const { MDCParser } = await import('./MDCParser');
  const { EndpointParser } = await import('./EndpointParser');

  // Parse the full endpoints.mdc file
  const parsed = await MDCParser.parse('.cursor/rules/APIs/endpoints.mdc');
  
  // Parse all endpoints from the full content
  const endpoints = EndpointParser.parseEndpoints(parsed.content);
  
  return endpoints;
}

