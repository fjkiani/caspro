import React from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

interface GuideRNA {
  sequence: string;
  efficacy: number;
  frameshift: number;
  pam: string;
  position: number;
}

interface CrisprEfficacyCardProps {
  targetGene: string;
  targetLocus: string;
  guides: GuideRNA[];
  metrics?: {
    avgEfficacy: number;
    topGuideScore: number;
    frameshiftRate: number;
  };
}

const CrisprEfficacyCard: React.FC<CrisprEfficacyCardProps> = ({ 
  targetGene, 
  targetLocus, 
  guides, 
  metrics 
}) => {
  const { getTextSize } = useAccessibility();

  const getEfficacyColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEfficacyBg = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-bold text-white ${getTextSize('text-xl')}`}>
              ✂️ CRISPR Spacer Efficacy
            </h3>
            <p className={`text-slate-300 ${getTextSize('text-sm')}`}>
              {targetGene} • {targetLocus}
            </p>
          </div>
          {metrics && (
            <div className="text-right">
              <div className={`font-bold text-purple-400 ${getTextSize('text-2xl')}`}>
                {(metrics.topGuideScore * 100).toFixed(1)}%
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                Top Guide Efficacy
              </div>
            </div>
          )}
        </div>

        {/* Metrics Overview */}
        {metrics && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-700/50 rounded-lg">
            <div className="text-center">
              <div className={`font-bold text-purple-400 ${getTextSize('text-lg')}`}>
                {(metrics.avgEfficacy * 100).toFixed(1)}%
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Avg Efficacy</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-purple-400 ${getTextSize('text-lg')}`}>
                {(metrics.frameshiftRate * 100).toFixed(1)}%
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Frameshift Rate</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-purple-400 ${getTextSize('text-lg')}`}>
                {guides.length}
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Candidates</div>
            </div>
          </div>
        )}

        {/* Guide RNA List */}
        <div className="space-y-3">
          <h4 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
            Top Guide RNA Candidates
          </h4>
          {guides.slice(0, 5).map((guide, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-cyan-300 ${getTextSize('text-sm')}`}>
                    {guide.sequence}
                  </span>
                  <span className={`text-slate-400 ${getTextSize('text-xs')}`}>
                    {guide.pam}
                  </span>
                </div>
                <div className={`text-slate-400 ${getTextSize('text-xs')} mt-1`}>
                  Position: {guide.position.toLocaleString()}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Efficacy Score */}
                <div className="text-center">
                  <div className={`font-bold ${getEfficacyColor(guide.efficacy)} ${getTextSize('text-sm')}`}>
                    {(guide.efficacy * 100).toFixed(1)}%
                  </div>
                  <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Efficacy</div>
                </div>
                
                {/* Frameshift Probability */}
                <div className="text-center">
                  <div className={`font-bold text-orange-400 ${getTextSize('text-sm')}`}>
                    {(guide.frameshift * 100).toFixed(1)}%
                  </div>
                  <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Frameshift</div>
                </div>
                
                {/* Visual Efficacy Bar */}
                <div className="w-16 h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getEfficacyBg(guide.efficacy)} transition-all duration-300`}
                    style={{ width: `${guide.efficacy * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Indicators */}
        <div className="flex items-center justify-between p-3 bg-purple-900/20 border border-purple-700/50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-purple-400">🎯</span>
            <span className={`text-purple-300 font-medium ${getTextSize('text-sm')}`}>
              Correlation with experimental cutting: 76%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">📊</span>
            <span className={`text-purple-300 font-medium ${getTextSize('text-sm')}`}>
              Frameshift prediction accuracy: 82%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisprEfficacyCard; 