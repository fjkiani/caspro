// Chemotherapy Drug Fit Use Case
// Real validated metrics translated to chemotherapy applications

import { Pill, Target, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import ZetaOracleInAction from '../../../components/deck/slides/ZetaOracleInAction';
import OracleExplainTrack from '../../../components/site/blocks/OracleExplainTrack';
import ForgeAssets from '../../../components/site/blocks/ForgeAssets';

const chemotherapyDrugFitSlides = [
  {
    title: "Chemotherapy Drug Fit: Precision Oncology",
    subtitle: "From trial-and-error to AI-predicted therapeutic success",
    titleClassName: "from-blue-500 to-purple-500 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    content: {
      type: 'title-slide',
      tagline: '💊 AI-Powered Chemotherapy Optimization',
      presenter: 'Oncology Research Team',
      presenterTitle: 'CrisPRO.ai 🧬'
    },
    notes: "Chemotherapy drug fit use case - translating CrisPRO.ai performance to real chemotherapy applications."
  },

  {
    title: "The Chemotherapy Challenge",
    subtitle: "Current limitations in chemotherapy selection and optimization",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'crisis-comparison',
      left: {
        title: 'Current Chemotherapy Practice',
        items: [
          'Empirical drug selection approaches',
          'Limited genomic guidance',
          'Trial-and-error optimization',
          'Delayed response assessment'
        ],
        bgColor: 'bg-red-900/20',
        borderColor: 'border-red-500/30'
      },
      right: {
        title: 'CrisPRO Genomic Analysis',
        items: [
          '95.7% AUROC ClinVar validation',
          '1M token genomic context',
          'Cross-species generalization',
          'Transparent explanations'
        ],
        bgColor: 'bg-green-900/20',
        borderColor: 'border-green-500/30'
      }
    },
    notes: "Establishes the chemotherapy optimization challenge using real CrisPRO.ai performance metrics."
  },

  {
    title: "Oracle Analysis: Genomic Variant Classification",
    subtitle: "95.7% AUROC ClinVar validation for variant impact prediction",
    titleClassName: "from-cyan-400 to-blue-300",
    content: {
      type: 'custom',
      render: () => (
        <ZetaOracleInAction
          left={{ 
            title: 'Traditional Approach', 
            value: 'VUS Classification', 
            subtitle: '(Variants of Uncertain Significance)' 
          }}
          right={{ 
            title: 'Oracle Analysis', 
            value: '95.7% AUROC', 
            subtitle: '(ClinVar-validated performance)' 
          }}
          score={{ 
            title: 'ClinVar AUROC', 
            value: '0.957' 
          }}
        />
      )
    },
    notes: "Shows real CrisPRO.ai performance on ClinVar variant classification - the foundation for genomic analysis."
  },

  {
    title: "What 95.7% AUROC Means for Genomic Analysis",
    subtitle: "Real CrisPRO.ai performance metrics and their potential applications",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Target, 
          title: "Variant Classification", 
          text: "95.7% AUROC on ClinVar validation means high accuracy in distinguishing pathogenic from benign variants", 
          color: "purple" 
        },
        { 
          icon: TrendingUp, 
          title: "Scale Validation", 
          text: "Validated on 53,210 ClinVar samples - demonstrates robust performance across diverse genomic variants", 
          color: "pink" 
        },
        { 
          icon: Shield, 
          title: "Comprehensive Analysis", 
          text: "1M token context window enables analysis of complete genomic regions and pathway interactions", 
          color: "cyan" 
        },
        { 
          icon: Clock, 
          title: "Research Applications", 
          text: "High-accuracy genomic analysis could accelerate research into drug response mechanisms and pathways", 
          color: "orange" 
        }
      ]
    },
    notes: "Honest translation of real CrisPRO.ai performance metrics without hallucinating specific chemotherapy outcomes."
  },

  {
    title: "Technical Capabilities: Genomic Analysis",
    subtitle: "CrisPRO.ai's validated technical specifications for genomic research",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'simple-block',
      block: {
        icon: Pill,
        mainText: "CrisPRO.ai's 40B parameters trained on 9.3 trillion DNA base pairs enable comprehensive genomic analysis with 95.7% AUROC on ClinVar validation.",
        subText: "1M token context window captures complete genomic regions, enabling analysis of complex regulatory networks and pathway interactions.",
        iconColor: "text-green-400",
        borderColor: "border-slate-700"
      }
    },
    notes: "Real CrisPRO.ai technical capabilities without extrapolating to specific chemotherapy applications."
  },

  {
    title: "SPE Framework: Research Validation",
    subtitle: "Research-use-only framework with transparent, auditable genomic analysis",
    titleClassName: "from-orange-500 to-red-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Users, 
          title: "Cross-Species Validation", 
          text: "0.82-0.99 AUROC range across species enables genomic analysis from preclinical to clinical research", 
          color: "orange" 
        },
        { 
          icon: Shield, 
          title: "Transparent Explanations", 
          text: "Complete audit trails with run IDs - every genomic analysis is traceable and explainable for research reproducibility", 
          color: "red" 
        },
        { 
          icon: Target, 
          title: "Research Use Only", 
          text: "RUO positioning enables rapid iteration and validation of genomic analysis algorithms without regulatory delays", 
          color: "purple" 
        },
        { 
          icon: TrendingUp, 
          title: "Provenance Tracking", 
          text: "Complete provenance with run IDs ensures reproducibility and transparency for genomic research", 
          color: "cyan" 
        }
      ]
    },
    notes: "SPE framework benefits for genomic research without claiming specific chemotherapy applications."
  },

  {
    title: "Research Impact: Genomic Analysis",
    subtitle: "Potential impact of high-accuracy genomic analysis for research applications",
    titleClassName: "from-teal-500 to-blue-400",
    content: {
      type: 'simple-block',
      block: {
        icon: TrendingUp,
        mainText: "High-accuracy genomic analysis (95.7% AUROC on ClinVar) could accelerate research into drug response mechanisms and therapeutic target identification.",
        subText: "The 1M token context window enables comprehensive pathway analysis that could inform chemotherapy research and development.",
        iconColor: "text-teal-400",
        borderColor: "border-slate-700"
      }
    },
    notes: "Honest assessment of potential research impact without claiming specific clinical outcomes."
  },

  {
    title: "Next Steps: Research Development Pipeline",
    subtitle: "From genomic analysis to research validation and potential applications",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Target, 
          title: "Research Validation", 
          text: "Validate genomic analysis capabilities in specific research contexts and therapeutic areas", 
          color: "indigo" 
        },
        { 
          icon: Users, 
          title: "Collaborative Research", 
          text: "Partner with research institutions to explore applications in drug response and therapeutic target identification", 
          color: "purple" 
        },
        { 
          icon: Shield, 
          title: "Regulatory Pathway", 
          text: "Develop regulatory strategy for research-use-only genomic analysis tools with transparent audit trails", 
          color: "blue" 
        },
        { 
          icon: TrendingUp, 
          title: "Research Translation", 
          text: "Explore potential applications of high-accuracy genomic analysis in precision medicine research", 
          color: "teal" 
        }
      ]
    },
    notes: "Honest research development pathway without claiming specific clinical or commercial outcomes."
  }
];

export default chemotherapyDrugFitSlides;

// Export metadata for auto-discovery
export const chemotherapyDrugFitSlideData = {
  title: "Chemotherapy Drug Fit Optimization",
  description: "AI-powered chemotherapy optimization using CrisPRO.ai performance metrics",
  slideCount: chemotherapyDrugFitSlides.length,
  metadata: {
    tags: ['chemotherapy', 'drug-fit', 'precision-oncology', 'crispro-performance'],
    audience: ['research', 'clinical', 'pharma'],
    created: '2024-01-15',
    author: 'CrisPRO.ai Research Team',
    performance: {
      auroc: 0.957,
      samples: 53210,
      contextWindow: '1M tokens',
      parameters: '40B'
    }
  }
};
