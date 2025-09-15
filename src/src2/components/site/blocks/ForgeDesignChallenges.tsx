import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

interface DesignChallenge {
  id: string;
  title: string;
  gene: string;
  target: string;
  position: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  designType: 'guide_rna' | 'hdr_template' | 'therapeutic_protein' | 'regulatory_element';
  context: string;
  requirements: string[];
  expectedOutcome: string;
}

interface ForgeDesignChallengesProps {
  onDesignStarted?: (challenge: DesignChallenge) => void;
}

const ForgeDesignChallenges: React.FC<ForgeDesignChallengesProps> = ({ onDesignStarted }) => {
  const { getTextSize } = useAccessibility();
  const [selectedChallenge, setSelectedChallenge] = useState<DesignChallenge | null>(null);
  const [isDesigning, setIsDesigning] = useState(false);

  const designChallenges: DesignChallenge[] = [
    {
      id: 'brca1_knockout',
      title: 'BRCA1 Knockout Design',
      gene: 'BRCA1',
      target: 'Exon 11',
      position: 'chr17:43044295-43044395',
      difficulty: 'Medium',
      designType: 'guide_rna',
      context: 'Therapeutic gene editing for cancer research',
      requirements: ['High on-target efficiency (>85%)', 'Minimal off-targets (<2)', 'NGG PAM compatibility'],
      expectedOutcome: 'Complete gene knockout with frameshift mutation'
    },
    {
      id: 'cf_correction',
      title: 'CFTR ΔF508 HDR Correction',
      gene: 'CFTR',
      target: 'F508del mutation',
      position: 'chr7:117199644-117199646',
      difficulty: 'Hard',
      designType: 'hdr_template',
      context: 'Cystic fibrosis therapeutic correction',
      requirements: ['4kb+ homology arms', 'High HDR efficiency', 'Avoid repeat elements'],
      expectedOutcome: 'Precise restoration of wild-type CFTR function'
    },
    {
      id: 'pdl1_nanobody',
      title: 'Anti-PD-L1 Nanobody Design',
      gene: 'PD-L1',
      target: 'Immune checkpoint',
      position: 'Extracellular domain',
      difficulty: 'Hard',
      designType: 'therapeutic_protein',
      context: 'Cancer immunotherapy enhancement',
      requirements: ['High binding affinity (Kd < 1nM)', 'Low immunogenicity', 'Stable expression'],
      expectedOutcome: 'Potent PD-L1 blocking nanobody for immunotherapy'
    },
    {
      id: 'liver_promoter',
      title: 'Hepatocyte-Specific Promoter',
      gene: 'Synthetic',
      target: 'Liver tissue',
      position: 'Regulatory element',
      difficulty: 'Medium',
      designType: 'regulatory_element',
      context: 'Gene therapy vector targeting',
      requirements: ['Liver-specific expression', 'Minimal leakage (<5%)', 'High expression level'],
      expectedOutcome: 'Tissue-specific promoter for liver-targeted gene therapy'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'Hard': return 'text-red-400 bg-red-900/20 border-red-500/30';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
    }
  };

  const getDesignTypeIcon = (type: string) => {
    switch (type) {
      case 'guide_rna': return '✂️';
      case 'hdr_template': return '🔧';
      case 'therapeutic_protein': return '🧬';
      case 'regulatory_element': return '⚡';
      default: return '🎯';
    }
  };

  const getDesignTypeName = (type: string) => {
    switch (type) {
      case 'guide_rna': return 'Guide RNA Design';
      case 'hdr_template': return 'HDR Template Design';
      case 'therapeutic_protein': return 'Protein Engineering';
      case 'regulatory_element': return 'Regulatory Design';
      default: return 'Design Challenge';
    }
  };

  const runDesignChallenge = async (challenge: DesignChallenge) => {
    setSelectedChallenge(challenge);
    setIsDesigning(true);
    
    // Auto-scroll to design section if available
    setTimeout(() => {
      const designSection = document.querySelector('[data-section="design-interface"]');
      if (designSection) {
        designSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);

    // Simulate design time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsDesigning(false);
    
    // Trigger parent callback
    if (onDesignStarted) {
      onDesignStarted(challenge);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className={`font-bold text-white ${getTextSize('text-3xl')}`}>
          🎯 Design Challenges
        </h2>
        <p className={`text-slate-300 max-w-3xl mx-auto ${getTextSize('text-lg')}`}>
          Test Forge's generative capabilities on real therapeutic design challenges. 
          Each challenge represents a different design modality with specific requirements and constraints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {designChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="group bg-slate-800 border-2 border-slate-700 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
            onClick={() => runDesignChallenge(challenge)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{getDesignTypeIcon(challenge.designType)}</div>
                <div>
                  <h3 className={`font-bold text-white ${getTextSize('text-xl')}`}>
                    {challenge.title}
                  </h3>
                  <p className={`text-purple-400 font-medium ${getTextSize('text-sm')}`}>
                    {getDesignTypeName(challenge.designType)}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full border ${getDifficultyColor(challenge.difficulty)} ${getTextSize('text-xs')} font-bold`}>
                {challenge.difficulty}
              </div>
            </div>

            {/* Target Info */}
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Gene:</span>
                  <span className={`ml-2 font-mono text-cyan-300 ${getTextSize('text-sm')}`}>
                    {challenge.gene}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Target:</span>
                  <span className={`ml-2 font-mono text-cyan-300 ${getTextSize('text-sm')}`}>
                    {challenge.target}
                  </span>
                </div>
              </div>
              
              <div>
                <span className="text-slate-400 text-sm">Position:</span>
                <span className={`ml-2 font-mono text-cyan-300 ${getTextSize('text-sm')}`}>
                  {challenge.position}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-sm">Context:</span>
                <p className={`text-slate-300 mt-1 ${getTextSize('text-sm')}`}>
                  {challenge.context}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h4 className={`font-semibold text-white mb-2 ${getTextSize('text-sm')}`}>
                Design Requirements:
              </h4>
              <ul className="space-y-1">
                {challenge.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className={`text-slate-300 ${getTextSize('text-sm')}`}>
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Outcome */}
            <div className="mb-6">
              <h4 className={`font-semibold text-white mb-2 ${getTextSize('text-sm')}`}>
                Expected Outcome:
              </h4>
              <p className={`text-slate-300 ${getTextSize('text-sm')}`}>
                {challenge.expectedOutcome}
              </p>
            </div>

            {/* Action Button */}
            <div className="text-center pt-4 border-t-2 border-purple-500/30">
              {selectedChallenge?.id === challenge.id && isDesigning ? (
                <div className="flex items-center justify-center gap-3 text-purple-400 bg-purple-950/50 p-4 rounded-xl border border-purple-500/30">
                  <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className={`font-bold ${getTextSize('text-lg')}`}>Designing with Forge...</span>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 p-4 rounded-xl border-2 border-purple-400/50 group-hover:border-purple-300 transition-all duration-200 shadow-lg hover:shadow-purple-500/20">
                  <div className="text-white font-bold">
                    <div className={`${getTextSize('text-xl')} mb-2`}>
                      🚀 Click to Design
                    </div>
                    <div className={`text-purple-100 font-semibold ${getTextSize('text-base')}`}>
                      Zero-shot generative design
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForgeDesignChallenges; 