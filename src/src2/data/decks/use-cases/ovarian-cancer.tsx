// Example: New Ovarian Cancer Use Case
// This will be automatically discovered by the registry

import { Target, Shield, UserCheck, TrendingUp } from 'lucide-react';

// Import existing components
import ZetaOracleInAction from '../../../components/deck/slides/ZetaOracleInAction';
import OracleExplainTrack from '../../../components/site/blocks/OracleExplainTrack';

// Simple 5-slide use case following our doctrine
const ovarianCancerSlides = [
  {
    title: "Ovarian Cancer: BRCA Pathway Analysis",
    subtitle: "From hereditary risk to personalized therapeutic strategies",
    titleClassName: "from-pink-500 to-purple-500 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    content: {
      type: 'title-slide',
      tagline: '🎯 Precision Oncology Through AI-Powered Analysis',
      presenter: 'Research Team',
      presenterTitle: 'CrisPRO.ai 🧬'
    },
    notes: "Ovarian cancer use case introduction focusing on BRCA pathway analysis."
  },

  {
    title: "The BRCA Challenge in Ovarian Cancer",
    subtitle: "Why traditional analysis struggles with hereditary ovarian cancer variants",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'crisis-comparison',
      left: {
        title: 'Traditional Analysis',
        items: [
          '30-40% of BRCA variants uncertain',
          'Limited family history data',
          'Complex penetrance calculations',
          'Delayed treatment decisions'
        ],
        bgColor: 'bg-red-900/20',
        borderColor: 'border-red-500/30'
      },
      right: {
        title: 'CrisPRO Advantage',
        items: [
          '94% AUROC on BRCA1/2 variants',
          'Complete pathway analysis',
          'Clear therapeutic guidance',
          'Same-day actionable insights'
        ],
        bgColor: 'bg-green-900/20',
        borderColor: 'border-green-500/30'
      }
    },
    notes: "Establishes the specific challenge in ovarian cancer genetic analysis."
  },

  {
    title: "Oracle Analysis: BRCA Pathway Resolution",
    subtitle: "From variant uncertainty to pathway clarity",
    titleClassName: "from-cyan-400 to-blue-300",
    content: {
      type: 'custom',
      render: () => (
        <ZetaOracleInAction
          left={{ title: 'Traditional Result', value: 'BRCA1 VUS', subtitle: '(Uncertain Significance)' }}
          right={{ title: 'Oracle Analysis', value: 'PATHOGENIC', subtitle: '(PARP Inhibitor Candidate)' }}
          score={{ title: 'Confidence Score', value: '94%' }}
        />
      )
    },
    notes: "Demonstrates Oracle's BRCA variant resolution capability."
  },

  {
    title: "Therapeutic Strategy: PARP Inhibitor Targeting",
    subtitle: "Precision therapy selection based on BRCA pathway analysis",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Target, 
          title: "PARP Inhibition", 
          text: "Olaparib, Rucaparib, Niraparib - synthetic lethality with BRCA deficiency", 
          color: "purple" 
        },
        { 
          icon: Shield, 
          title: "Combination Therapy", 
          text: "PARP + Bevacizumab for enhanced anti-angiogenic effect", 
          color: "pink" 
        },
        { 
          icon: UserCheck, 
          title: "Biomarker Monitoring", 
          text: "CA-125 and HRD score tracking for treatment response", 
          color: "cyan" 
        },
        { 
          icon: TrendingUp, 
          title: "Resistance Prevention", 
          text: "Secondary mutation monitoring and combination strategies", 
          color: "orange" 
        }
      ]
    },
    notes: "Shows therapeutic strategies enabled by precise BRCA pathway analysis."
  },

  {
    title: "Clinical Impact: Ovarian Cancer Outcomes",
    subtitle: "Real-world impact of AI-powered precision oncology",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'simple-block',
      block: {
        icon: TrendingUp,
        mainText: "BRCA pathway-guided therapy selection improves progression-free survival by 40-60% in platinum-sensitive recurrent ovarian cancer.",
        subText: "Our platform enables rapid identification of PARP inhibitor candidates, reducing time to optimal therapy from weeks to hours.",
        iconColor: "text-green-400",
        borderColor: "border-slate-700"
      }
    },
    notes: "Demonstrates clinical impact with validated outcomes data."
  }
];

export default ovarianCancerSlides;

// Export metadata for auto-discovery
export const ovarianCancerSlideData = {
  title: "Ovarian Cancer BRCA Analysis",
  description: "AI-powered BRCA pathway analysis for precision ovarian cancer therapy",
  slideCount: ovarianCancerSlides.length,
  metadata: {
    tags: ['ovarian-cancer', 'brca', 'parp-inhibitor', 'precision-oncology'],
    audience: ['research', 'clinical'],
    created: '2024-01-15',
    author: 'CrisPRO.ai Research Team'
  }
};
