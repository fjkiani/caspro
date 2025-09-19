// Master Data Adapter
// Central hub for all migrated CrisPRO.ai content

export * from './oracle-adapter';
export * from './forge-adapter';

// Discriminative AI (Oracle) exports
export { 
  oracleContent, 
  oracleEndpoints, 
  oracleMultiModalPredictions,
  oracleScientificValidation,
  adaptOracleForHomepage 
} from './oracle-adapter';

// Generative AI (Forge) exports  
export {
  forgeGenerativeContent,
  forgeAPIDemos as forgeEndpoints,
  forgeMultiModalGeneration,
  adaptForgeForHomepage
} from './forge-adapter';

// Use Cases
export { hereditaryBreastCancer, oncogeneActivation, therapeuticTargeting } from '../use-cases/discriminative';
export { crisprTherapyDesign, proteinTherapyDesign, geneTherapyVectorDesign, personalizedCancerTherapy } from '../use-cases/generative';

// Multi-modal contexts for business applications
export { multiModalContexts } from '../contexts/multiModalContexts';

// Dossier summaries for API results
export { discriminativeAPIDossiers, getDossierByAPI, generateDynamicDossier } from '../products/dossierSummaries';

// Combined platform data for homepage integration
export const adaptPlatformForHomepage = () => ({
  oracle: adaptOracleForHomepage(),
  forge: adaptForgeForHomepage(),
  // Add other engines as they're migrated
});

export type PlatformHomepageData = ReturnType<typeof adaptPlatformForHomepage>;
