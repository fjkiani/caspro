import { oracleContent } from '../oracleContent';

export const adaptOracleContent = () => {
  return {
    title: 'Solving 40% VUS Crises',
    subtitle: 'CrisPRO.ai Discriminative AI is the world\'s most powerful discriminative AI for biological sequences. Zero-shot prediction of variant pathogenicity, splice effects, and protein function—without any task-specific training.',
    badge: {
      icon: '🔮',
      text: 'Discriminative AI',
      color: 'cyan'
    },
    metrics: [
      {
        value: '95.7%',
        label: 'ClinVar AUROC',
        description: 'Zero-shot pathogenicity'
      },
      {
        value: '95%',
        label: 'BRCA1 AUROC',
        description: 'Breast cancer variants'
      },
      {
        value: '73%',
        label: 'VUS Reduction',
        description: '40-60% → 15% VUS rate'
      },
      {
        value: '32K',
        label: 'SAE Features',
        description: 'Learned biological concepts'
      }
    ],
    contextTags: [...oracleContent.about.evo2Context],
    processSteps: [
      { 
        title: 'Ingest Variant', 
        description: '8,192 nt window with single-nucleotide resolution',
        accent: 'cyan' as const
      },
      { 
        title: 'Zero-Shot Prediction', 
        description: 'Evo2 likelihood scoring without task-specific training',
        accent: 'purple' as const
      },
      { 
        title: 'Clinical Verdict', 
        description: 'Calibrated pathogenicity with explainable evidence',
        accent: 'orange' as const
      },
    ],
    oracleScore: {
      left: { title: 'Traditional Verdict', value: 'VUS', subtitle: '(Uncertain)' },
      right: { title: 'Oracle Verdict', value: 'Pathogenic', subtitle: '(Actionable)' },
      score: { title: 'Zeta Score (Functional Damage)', value: '-26140.8' }
    },
    explainTrack: oracleContent.explain,
    vepMetrics: oracleContent.vepMetrics,
    variantDetail: {
      id: oracleContent.useCases.hereditaryBreastCancer.examples[0].id,
      region: oracleContent.useCases.hereditaryBreastCancer.examples[0].region,
      zeroShot: oracleContent.useCases.hereditaryBreastCancer.examples[0].zeroShot,
      verdict: oracleContent.useCases.hereditaryBreastCancer.examples[0].verdict,
      notes: oracleContent.useCases.hereditaryBreastCancer.examples[0].notes
    },
    performanceMetrics: [
      { label: '% VUS resolved', value: oracleContent.discriminativePerformance.vusResolution.improvement }, 
      { label: 'Zero-shot AUROC', value: oracleContent.discriminativePerformance.clinVar.codingSNV.auroc.toFixed(3) }, 
      { label: 'BRCA1 AUROC', value: oracleContent.discriminativePerformance.brca1.allSNV_AUROC.toFixed(2) }, 
      { label: 'SAE Features', value: oracleContent.discriminativePerformance.saeFeatures.totalFeatures.toLocaleString() }
    ],
    multiModal: {
      essentialitySeries: oracleContent?.essentialitySeries || [
        { context: { cellLine: 'A549', mutations: ['TP53', 'KEAP1'] }, score: 0.82 },
        { context: { cellLine: 'MCF7', mutations: ['PIK3CA'] }, score: 0.67 }
      ],
      accessibilityTracks: oracleContent.accessibilityTracks,
      proteinDelta: oracleContent.proteinDelta
    },
    validation: oracleContent.vepMetrics,
    transformations: oracleContent.industryTransformations.map(t => ({
      id: t.id,
      title: t.title,
      subtitle: t.subtitle,
      icon: t.icon,
      color: t.color,
      metrics: t.metrics.map(m => ({ label: m.label, value: m.value })),
      description: t.description,
      href: t.href,
      buttonText: t.buttonText
    }))
  };
}; 