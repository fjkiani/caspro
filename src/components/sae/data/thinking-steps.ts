import type { ThinkingStep, VUSVariant } from '../types';
import { getSAEFeatures } from '../utils/variant-helpers';

/**
 * Generate thinking steps for DynamicOracleExplain component
 */
export const createThinkingSteps = (variant: VUSVariant): ThinkingStep[] => {
  const saeFeatures = getSAEFeatures(variant.gene);
  const impactLevel = Math.abs(variant.deltaLikelihood) > 2 ? 'severe' : 
                     Math.abs(variant.deltaLikelihood) > 1 ? 'moderate' : 'mild';

  return [
    {
      title: "SAE Feature Activation (Layer 26)",
      description: `Batch-TopK SAE trained on 1B tokens reveals ${saeFeatures.length} active biological features`,
      detail: "Real mechanistic interpretability from Evo2 paper - features learned without supervision",
      component: "OracleExplainTrack",
      icon: "🔍",
      color: "text-cyan-400",
      paperRef: "Figure 4A-G: SAE features capture exon-intron boundaries, TF motifs, protein structure"
    },
    {
      title: "Δ Likelihood Computation",
      description: `Zero-shot likelihood scoring: ${variant.deltaLikelihood.toFixed(2)} functional disruption`,
      detail: "StripedHyena 2 architecture with 1M token context - no task-specific training needed",
      component: "VariantDetailCard",
      icon: "📊",
      color: "text-purple-400",
      paperRef: "ClinVar AUROC: 0.957 for SNVs, 0.939 for non-SNVs - state-of-the-art zero-shot"
    },
    {
      title: "Gene Essentiality Context",
      description: `Context-dependent essentiality analysis for ${variant.gene} across cell types`,
      detail: "Learned representations capture mutational severity and cellular context specificity",
      component: "EssentialityChart",
      icon: "🧬",
      color: "text-green-400",
      paperRef: "Figure 4E: Features activate preferentially after frameshift mutations"
    },
    {
      title: "Protein Functional Impact",
      description: `Protein-level predictions: ${impactLevel} functional disruption`,
      detail: "SAE features capture protein secondary structure (α-helices, β-sheets) and folding impact",
      component: "ProteinDeltaCard",
      icon: "🧪",
      color: "text-orange-400",
      paperRef: "Figure 4D: SAE features associated with α-helices and β-sheets in protein structures"
    },
    {
      title: "Chromatin Accessibility",
      description: `Regulatory context analysis - chromatin state affects variant interpretation`,
      detail: "Features activate on TF binding motifs and regulatory elements in promoter regions",
      component: "AccessibilityTrack",
      icon: "🎯",
      color: "text-blue-400",
      paperRef: "Figure 4F: Features activate on DNA motifs resembling human TF binding sites"
    }
  ];
};

/**
 * Default thinking step interval (ms)
 */
export const THINKING_STEP_INTERVAL = 2000;

/**
 * Default scroll delay (ms)
 */
export const SCROLL_DELAY = 500;



