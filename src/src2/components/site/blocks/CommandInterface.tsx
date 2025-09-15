import React from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

interface CommandInterfaceProps {
  title?: string;
  subtitle?: string;
  status?: string;
  missionText?: string;
  onStartAnalysis?: () => void;
  className?: string;
}

const CommandInterface: React.FC<CommandInterfaceProps> = ({
  title = "ZETA COMMAND CENTER",
  subtitle = "All systems armed • Ready for deployment",
  status = "Zeta Command",
  missionText = "Zeta Forge Command interface online. Mission: Execute in-silico conquest of PIK3CA E542K. Awaiting your command to initiate target validation.",
  onStartAnalysis,
  className = ""
}) => {
  const { getTextSize } = useAccessibility();

  return (
    <div className={`bg-slate-800 rounded-xl border border-slate-600 p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">⚡</span>
        </div>
        <div>
          <h2 className={`font-bold text-white ${getTextSize('text-xl')}`}>
            {title}
          </h2>
          <p className={`text-green-400 ${getTextSize('text-sm')}`}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className={`text-green-400 font-medium ${getTextSize('text-sm')}`}>
          {status}
        </span>
      </div>

      {/* Mission Text - Improved Contrast */}
      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
        <p className={`text-slate-100 leading-relaxed ${getTextSize('text-base')}`}>
          {missionText}
        </p>
      </div>

      {/* Start Analysis Button */}
      {onStartAnalysis && (
        <button
          onClick={onStartAnalysis}
          className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg transition-colors duration-200 ${getTextSize('text-lg')}`}
        >
          Start Analysis
        </button>
      )}
    </div>
  );
};

export default CommandInterface; 