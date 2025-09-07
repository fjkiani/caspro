import { KeyStats } from './types';

// Key Statistics Summary
export const keyStats: KeyStats = {
  totalVariants: 53210,
  aurocScore: 95.7,
  vusResolution: 73,
  contextWindow: "1M tokens",
  timelineCompression: "36x",
  costReduction: "96%",
  crossSpeciesRange: "0.82-0.99 AUROC",
  speciesCount: 8
};

// Helper functions for key stats
export const getFormattedStats = () => ({
  totalVariants: keyStats.totalVariants.toLocaleString(),
  aurocScore: `${keyStats.aurocScore}%`,
  vusResolution: `${keyStats.vusResolution}%`,
  contextWindow: keyStats.contextWindow,
  timelineCompression: keyStats.timelineCompression,
  costReduction: keyStats.costReduction,
  crossSpeciesRange: keyStats.crossSpeciesRange,
  speciesCount: keyStats.speciesCount
});

export const getStatsByCategory = (category: 'performance' | 'business' | 'technical') => {
  switch (category) {
    case 'performance':
      return {
        aurocScore: keyStats.aurocScore,
        vusResolution: keyStats.vusResolution,
        crossSpeciesRange: keyStats.crossSpeciesRange
      };
    case 'business':
      return {
        timelineCompression: keyStats.timelineCompression,
        costReduction: keyStats.costReduction
      };
    case 'technical':
      return {
        totalVariants: keyStats.totalVariants,
        contextWindow: keyStats.contextWindow,
        speciesCount: keyStats.speciesCount
      };
    default:
      return keyStats;
  }
};
