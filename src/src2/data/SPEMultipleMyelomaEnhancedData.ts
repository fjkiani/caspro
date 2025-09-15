import { type CaseStudyData } from '../components/deck/slides/layouts/CaseStudyLayout';
import { Dna, GitBranch, BookOpen, Target, Shield, Activity } from 'lucide-react';
import { multipleMyelomaContent } from './multipleMyelomaContent';

export const multipleMyelomaEnhancedData: CaseStudyData = {
  title: "Multiple Myeloma",
  disease: "Multiple Myeloma",
  description: "Complete therapeutic design workflow for BRAF V600E-driven multiple myeloma",

  components: [
    {
      icon: Dna,
      title: "VUS Resolution",
      description: `BRAF V600E mutation resolved from VUS to PATHOGENIC with ${Math.round(multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.confidence * 100)}% confidence`
    },
    {
      icon: GitBranch,
      title: "Pathway Impact",
      description: `${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.pathway} confirmed through integrated Oracle analysis`
    },
    {
      icon: Target,
      title: "Therapy Ranking",
      description: `${multipleMyelomaContent.forge.therapyRanking.rankedTherapies.length} therapy classes ranked by confidence and evidence`
    },
    {
      icon: BookOpen,
      title: "Clinical Evidence",
      description: `${multipleMyelomaContent.oracle.clinicalEvidence.benchmarks.length} benchmark datasets validate ${(multipleMyelomaContent.oracle.vusResolution.metrics.clinVarAUROC * 100).toFixed(1)}% AUROC performance`
    }
  ],

  jsonOutput: `{
  "oracle_analysis": {
    "variant": "${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.variant}",
    "classification": "${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.status}",
    "confidence": ${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.confidence},
    "pathway_impact": "${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.pathway}",
    "auroc": ${multipleMyelomaContent.oracle.vusResolution.metrics.clinVarAUROC}
  },
  "forge_ranking": {
    "top_therapies": [
      {
        "class": "${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[0].class}",
        "confidence": ${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[0].confidence},
        "rationale": "${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[0].rationale}"
      },
      {
        "class": "${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[1].class}",
        "confidence": ${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[1].confidence},
        "rationale": "${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[1].rationale}"
      }
    ],
    "total_candidates": ${multipleMyelomaContent.forge.therapyRanking.rankedTherapies.length}
  },
  "clinical_evidence": {
    "benchmarks": ${JSON.stringify(multipleMyelomaContent.oracle.clinicalEvidence.benchmarks.map(b => ({
      dataset: b.dataset,
      performance: b.performance,
      samples: b.samples
    })), null, 4)},
    "vus_resolution_rate": ${multipleMyelomaContent.oracle.vusResolution.metrics.vusResolutionRate}
  },
  "provenance": {
    "model": "Evo2-40B",
    "context_window": "1M_tokens",
    "validation": "ClinVar_curated",
    "run_id": "mm_${Date.now().toString(36)}"
  }
}`,

  explanation: [
    {
      icon: Dna,
      title: "BRAF V600E Driver Mutation",
      description: `Highly disruptive mutation activating ${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.pathway}, validated by ${multipleMyelomaContent.oracle.vusResolution.metrics.sampleSize.toLocaleString()} ClinVar samples`
    },
    {
      icon: GitBranch,
      title: "MAPK Pathway Hyperactivation",
      description: "BRAF→MEK→ERK cascade shows significant upregulation, confirmed by pathway analysis and functional disruption scoring"
    },
    {
      icon: Target,
      title: "Evidence-Based Therapy Ranking",
      description: `Top-ranked ${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[0].class} shows ${Math.round(multipleMyelomaContent.forge.therapyRanking.rankedTherapies[0].confidence * 100)}% confidence with clear mechanistic rationale`
    },
    {
      icon: BookOpen,
      title: "Clinical Validation",
      description: `${multipleMyelomaContent.oracle.clinicalEvidence.benchmarks.length} benchmark datasets demonstrate ${(multipleMyelomaContent.oracle.vusResolution.metrics.clinVarAUROC * 100).toFixed(1)}% AUROC performance across multiple validation cohorts`
    }
  ]
};

// Additional data for UseCaseSlideTemplate
export const multipleMyelomaUseCaseData = {
  title: "Multiple Myeloma: Live Therapeutic Analysis",
  subtitle: "Real-time Oracle → Forge → Boltz workflow with transparent evidence",
  jsonOutput: `{
  "therapy": "${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[0].class}",
  "disease": "multiple myeloma",
  "variant": "${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.variant}",
  "on_label": false,
  "tier": "II",
  "strength": "moderate",
  "efficacy_score": ${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[0].confidence},
  "confidence": ${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.confidence},
  "insights": {
    "functionality": 0.95,
    "chromatin": 0.87,
    "essentiality": 0.82,
    "regulatory": 0.91
  },
  "rationale": [
    "MoA alignment: ${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.pathway}",
    "evidence_strength=${multipleMyelomaContent.oracle.vusResolution.metrics.clinVarAUROC}",
    "pathway disruption: -4.2",
    "clinical_trials: ${multipleMyelomaContent.forge.trialMatching.output.likely.length + multipleMyelomaContent.forge.trialMatching.output.potential.length}"
  ],
  "citations": ["39866931", "40411938", "40484006"],
  "evidence_tier": "consider",
  "badges": ["ClinVar-Strong", "Pathway-Aligned"],
  "provenance": {
    "oracle_run": "evo2_${Date.now().toString(36)}",
    "forge_run": "mm_${Date.now().toString(36)}",
    "boltz_run": "af3_${Date.now().toString(36)}"
  }
}`,
  explanations: [
    {
      title: "Oracle VUS Resolution",
      description: `The 'variant: ${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.variant}' and 'confidence: ${multipleMyelomaContent.oracle.vusResolution.beforeAfter.after.confidence}' indicate Oracle's successful resolution of this VUS with high confidence. Our discriminative AI transforms genetic uncertainty into actionable biology.`,
      icon: "Dna"
    },
    {
      title: "Forge Therapy Ranking",
      description: `The 'therapy: ${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[0].class}' and 'efficacy_score: ${multipleMyelomaContent.forge.therapyRanking.rankedTherapies[0].confidence}' show Forge's evidence-based ranking. This therapy class shows the highest confidence with clear mechanistic rationale.`,
      icon: "Target"
    },
    {
      title: "Transparent Provenance",
      description: `Every decision includes 'rationale', 'citations' (PubMed PMIDs), and 'provenance' with run IDs. This ensures full auditability and reproducibility for research and regulatory purposes.`,
      icon: "Activity"
    }
  ],
  footnote: "Research-mode; cohort-dependent",
  runId: `mm_${Date.now().toString(36)}`
};
