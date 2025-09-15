// Multiple Myeloma Content Adapters
// Following DRY principles and component reuse patterns

import type { MultipleMyelomaContent } from '../multipleMyelomaContent';

// Transform MM Oracle content into component props
export const toMMOracleBlocks = (content: MultipleMyelomaContent) => ([
  {
    kind: 'oracle-vus-resolution',
    props: {
      title: content.oracle.vusResolution.title,
      subtitle: content.oracle.vusResolution.subtitle,
      beforeAfter: content.oracle.vusResolution.beforeAfter,
      metrics: content.oracle.vusResolution.metrics
    }
  },
  {
    kind: 'oracle-pathway-analysis', 
    props: {
      title: content.oracle.pathwayAnalysis.title,
      primaryPathway: content.oracle.pathwayAnalysis.primaryPathway,
      secondaryPathways: content.oracle.pathwayAnalysis.secondaryPathways
    }
  },
  {
    kind: 'vep-metrics',
    props: {
      title: content.oracle.clinicalEvidence.title,
      benchmarks: content.oracle.clinicalEvidence.benchmarks
    }
  }
]);

// Transform MM Forge content into component props
export const toMMForgeBlocks = (content: MultipleMyelomaContent) => ([
  {
    kind: 'therapy-ranking',
    props: {
      title: content.forge.therapyRanking.title,
      subtitle: content.forge.therapyRanking.subtitle,
      rankedTherapies: content.forge.therapyRanking.rankedTherapies
    }
  },
  {
    kind: 'combination-therapy',
    props: {
      title: content.forge.combinationTherapy.title,
      strategy: content.forge.combinationTherapy.strategy
    }
  },
  {
    kind: 'trial-matching',
    props: {
      title: content.forge.trialMatching.title,
      workflow: content.forge.trialMatching.workflow,
      output: content.forge.trialMatching.output
    }
  }
]);

// Transform MM Boltz content into component props  
export const toMMBoltzBlocks = (content: MultipleMyelomaContent) => ([
  {
    kind: 'dossier-generation',
    props: {
      title: content.boltz.dossierGeneration.title,
      components: content.boltz.dossierGeneration.components,
      auditTrail: content.boltz.dossierGeneration.auditTrail
    }
  },
  {
    kind: 'provenance-panel',
    props: {
      title: content.boltz.provenance.title,
      transparency: content.boltz.provenance.transparency,
      methodology: content.boltz.provenance.methodology
    }
  }
]);

// Transform MM content into slide-ready props
export const toMMSlideProps = (content: MultipleMyelomaContent) => ({
  oracle: {
    vusResolution: {
      title: content.oracle.vusResolution.title,
      beforeAfter: content.oracle.vusResolution.beforeAfter,
      metrics: {
        auroc: content.oracle.vusResolution.metrics.clinVarAUROC,
        vusRate: content.oracle.vusResolution.metrics.vusResolutionRate,
        samples: content.oracle.vusResolution.metrics.sampleSize
      }
    },
    pathways: {
      primary: content.oracle.pathwayAnalysis.primaryPathway,
      secondary: content.oracle.pathwayAnalysis.secondaryPathways
    }
  },
  forge: {
    therapies: content.forge.therapyRanking.rankedTherapies,
    twoHit: content.forge.combinationTherapy.strategy,
    trials: content.forge.trialMatching.output
  },
  boltz: {
    dossier: content.boltz.dossierGeneration,
    provenance: content.boltz.provenance
  }
});

// Component mapping for MM use case
export const mmComponentMapping = {
  // Oracle components
  'oracle-vus-resolution': 'ZetaOracleInAction',
  'oracle-pathway-analysis': 'OracleExplainTrack', 
  'vep-metrics': 'VEPMetrics',
  
  // Forge components
  'therapy-ranking': 'ForgeAssets', // Can be adapted for therapy ranking
  'combination-therapy': 'ProcessStepper', // For two-hit strategy
  'trial-matching': 'GuidedDesignPanel', // For trial co-pilot
  
  // Boltz components  
  'dossier-generation': 'DesignResultSummary',
  'provenance-panel': 'ProvenancePanel'
};

// Slide composition helpers
export const createMMSlide = (
  title: string,
  subtitle: string,
  contentType: string,
  props: any,
  siteBlocks?: any[]
) => ({
  title,
  subtitle,
  titleClassName: "from-red-500 to-purple-500 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
  backgroundClass: "bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900",
  content: {
    type: contentType,
    ...props
  },
  siteBlocks: siteBlocks || [],
  notes: `Multiple Myeloma use case slide: ${title}`
});
