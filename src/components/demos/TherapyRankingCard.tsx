import React from 'react';
import { TrendingUp, Target, Shield, Users } from 'lucide-react';

interface TherapyRankingProps {
  title?: string;
  subtitle?: string;
  rankedTherapies: Array<{
    class: string;
    confidence: number;
    rationale: string;
    examples: string[];
    evidenceLevel: string;
  }>;
}

const getEvidenceColor = (level: string) => {
  switch (level) {
    case 'Strong': return 'text-green-400 border-green-400 bg-green-900/20';
    case 'Supported': return 'text-blue-400 border-blue-400 bg-blue-900/20';
    case 'Consider': return 'text-yellow-400 border-yellow-400 bg-yellow-900/20';
    default: return 'text-gray-400 border-gray-400 bg-gray-900/20';
  }
};

const getTherapyIcon = (therapyClass: string) => {
  if (therapyClass.includes('MAPK')) return Target;
  if (therapyClass.includes('Proteasome')) return Shield;
  if (therapyClass.includes('CD38')) return Users;
  return TrendingUp;
};

const TherapyRankingCard: React.FC<TherapyRankingProps> = ({
  title = "Therapy Ranking",
  subtitle = "Ranked by confidence and evidence",
  rankedTherapies
}) => {
  return (
    <div className="w-full bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-slate-200 mb-2">{title}</h3>
        <p className="text-lg text-slate-400">{subtitle}</p>
      </div>
      
      <div className="space-y-6">
        {rankedTherapies.map((therapy, index) => {
          const Icon = getTherapyIcon(therapy.class);
          const evidenceColors = getEvidenceColor(therapy.evidenceLevel);
          
          return (
            <div 
              key={index}
              className={`border rounded-xl p-6 ${evidenceColors}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Icon size={24} className={evidenceColors.split(' ')[0]} />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-semibold text-slate-200">
                      #{index + 1} {therapy.class}
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${evidenceColors}`}>
                        {therapy.evidenceLevel}
                      </span>
                      <span className="text-2xl font-bold text-slate-200">
                        {Math.round(therapy.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-4">{therapy.rationale}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {therapy.examples.map((example, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
        <p className="text-sm text-slate-400 text-center">
          <span className="font-medium">Research Use Only:</span> Rankings based on pathway analysis and literature evidence. 
          Not intended for clinical decision making.
        </p>
      </div>
    </div>
  );
};

export default TherapyRankingCard;
