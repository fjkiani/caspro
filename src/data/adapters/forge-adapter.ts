// Forge Content Adapter
// Connects migrated Forge data to existing components

import { forgeContent } from '../products/forge/content';
import { forgeCapabilities } from '../products/forge/capabilities';
import { forgeGenerativeAPIs } from '../products/forge/apis';

// Re-export Forge content with proper typing
export const forgeGenerativeContent = forgeContent;
export const forgeMultiModalGeneration = forgeCapabilities.multiModalGeneration;
export const forgeAPIDemos = forgeGenerativeAPIs;

// Forge endpoints for API integration
export const forgeEndpoints = forgeGenerativeAPIs;

// Forge transformation data
export const forgeTransformation = {};

// Forge use cases and capabilities
export const forgeUseCases = {};
export const forgeAgentic = forgeContent.agentic;

// Component adapter for existing homepage integration
export const adaptForgeForHomepage = () => ({
  apis: forgeEndpoints,
  capabilities: forgeMultiModalGeneration,
  transformation: forgeTransformation,
  useCases: forgeUseCases,
  agentic: forgeAgentic,
  content: forgeGenerativeContent
});

export type ForgeHomepageData = ReturnType<typeof adaptForgeForHomepage>;
