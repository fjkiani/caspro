import type { TLSThinkingStep } from '../TLSSAEThinkingProcess';
import { 
  DEFAULT_TLS_THINKING_STEPS, 
  TLS_DEFAULT_VARIANT,
  TLS_EXPLAIN_TRACK_DATA,
  TLS_VARIANT_DETAIL_DATA,
  TLS_KPI_METRICS,
  TLS_ENGINEERING_METRICS,
  TLS_RUO_DISCLAIMER,
  TLS_THINKING_DESCRIPTION,
  TLS_ANALYSIS_SUMMARY
} from '../constants/tls-sae-thinking-constants';

export interface SAEThinkingConfig {
  useCaseId: string;
  variant?: {
    gene: string;
    change: string;
    deltaLikelihood: number;
    confidence: number;
    finalStatus: string;
  };
  customSteps?: TLSThinkingStep[];
  showRUODisclaimer?: boolean;
  // Additional data for component rendering
  explainTrackData?: any;
  variantDetailData?: any;
  kpiMetrics?: Array<{ label: string; value: string }>;
  engineeringMetrics?: Array<{ label: string; value: string }>;
  ruoDisclaimer?: { title: string; description: string };
  thinkingDescription?: string;
  analysisSummary?: { saeFeatures: string; readiness: string; verdict: string };
}

/**
 * Adapter for creating SAE thinking process configurations for different use cases
 * This keeps the SAE component modular and reusable across different demos
 */
export const createSAEThinkingConfig = (useCaseId: string, config?: Partial<SAEThinkingConfig>): SAEThinkingConfig => {
  const defaultConfig: SAEThinkingConfig = {
    useCaseId,
    variant: {
      gene: 'TP53',
      change: 'c.456G>A',
      deltaLikelihood: -2.1,
      confidence: 0.89,
      finalStatus: 'Likely Pathogenic'
    },
    showRUODisclaimer: true,
    explainTrackData: TLS_EXPLAIN_TRACK_DATA,
    variantDetailData: TLS_VARIANT_DETAIL_DATA,
    kpiMetrics: TLS_KPI_METRICS,
    engineeringMetrics: TLS_ENGINEERING_METRICS,
    ruoDisclaimer: TLS_RUO_DISCLAIMER,
    thinkingDescription: TLS_THINKING_DESCRIPTION,
    analysisSummary: TLS_ANALYSIS_SUMMARY
  };

  return { ...defaultConfig, ...config };
};

/**
 * TLS-specific SAE thinking configuration
 * Uses TLS-specific variant and thinking steps
 */
export const createTLSSAEConfig = (): SAEThinkingConfig => {
  return createSAEThinkingConfig('tls_seed_generation', {
    variant: TLS_DEFAULT_VARIANT,
    customSteps: DEFAULT_TLS_THINKING_STEPS,
    showRUODisclaimer: true
  });
};

/**
 * BRCA-specific SAE thinking configuration
 * Uses BRCA-specific variant and thinking steps
 */
export const createBRCASAEConfig = (): SAEThinkingConfig => {
  return createSAEThinkingConfig('brca_analysis', {
    variant: {
      gene: 'BRCA1',
      change: 'c.5266dupC',
      deltaLikelihood: -3.2,
      confidence: 0.94,
      finalStatus: 'Pathogenic'
    },
    showRUODisclaimer: false // BRCA analysis is more established
  });
};

/**
 * Generic cancer variant SAE thinking configuration
 * Uses generic cancer variant and thinking steps
 */
export const createCancerVariantSAEConfig = (gene: string, change: string): SAEThinkingConfig => {
  return createSAEThinkingConfig('cancer_variant_analysis', {
    variant: {
      gene,
      change,
      deltaLikelihood: -2.5,
      confidence: 0.87,
      finalStatus: 'Likely Pathogenic'
    },
    showRUODisclaimer: true
  });
};

/**
 * Use case specific SAE configurations
 * Maps use case IDs to their appropriate SAE thinking configurations
 */
export const getSAEConfigForUseCase = (useCaseId: string): SAEThinkingConfig => {
  switch (useCaseId) {
    case 'tls_seed_generation':
      return createTLSSAEConfig();
    case 'brca_analysis':
      return createBRCASAEConfig();
    case 'oncogene_activation':
      return createCancerVariantSAEConfig('KRAS', 'c.35G>A');
    case 'protein_therapy_design':
      return createCancerVariantSAEConfig('TP53', 'c.524G>A');
    default:
      return createSAEThinkingConfig(useCaseId);
  }
};



