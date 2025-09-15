import React, { useState } from 'react';
import { CommandInterface } from '../components/site/blocks';
import AccessibilityToggle from '../components/AccessibilityToggle';

const CommandInterfaceDemo: React.FC = () => {
  const [analysisStarted, setAnalysisStarted] = useState(false);

  const handleStartAnalysis = () => {
    setAnalysisStarted(true);
    // Simulate analysis completion after 3 seconds
    setTimeout(() => setAnalysisStarted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <AccessibilityToggle />
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Command Interface Demo</h1>
          <p className="text-slate-300 text-lg">
            Improved text contrast for better readability
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Original Style (Poor Contrast) */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">❌ Poor Contrast (Original)</h2>
            <div className="bg-slate-800 rounded-xl border border-slate-600 p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">⚡</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl">ZETA COMMAND CENTER</h3>
                  <p className="text-slate-400 text-sm">All systems armed • Ready for deployment</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-400 font-medium text-sm">Zeta Command</span>
              </div>
              
              {/* Poor contrast text */}
              <div className="p-4">
                <p className="text-slate-400 leading-relaxed">
                  Zeta Forge Command interface online. Mission: Execute in-silico conquest of PIK3CA E542K. Awaiting your command to initiate target validation.
                </p>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg">
                Start Analysis
              </button>
            </div>
          </div>

          {/* Improved Style (Better Contrast) */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">✅ Improved Contrast</h2>
            <CommandInterface
              title="ZETA COMMAND CENTER"
              subtitle="All systems armed • Ready for deployment"
              status={analysisStarted ? "Analysis Running..." : "Zeta Command"}
              missionText="Zeta Forge Command interface online. Mission: Execute in-silico conquest of PIK3CA E542K. Awaiting your command to initiate target validation."
              onStartAnalysis={handleStartAnalysis}
            />
          </div>
        </div>

        {/* Contrast Improvements Explanation */}
        <div className="bg-slate-800 border border-slate-600 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">🎨 Contrast Improvements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Before (Poor Contrast)</h4>
              <ul className="space-y-1 text-slate-300">
                <li>• Mission text: <span className="text-slate-400">text-slate-400</span> on dark background</li>
                <li>• Status text: <span className="text-slate-400">text-slate-400</span> (hard to read)</li>
                <li>• No background for mission text</li>
                <li>• Low contrast ratio (~2.5:1)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">After (Better Contrast)</h4>
              <ul className="space-y-1 text-slate-300">
                <li>• Mission text: <span className="text-slate-100">text-slate-100</span> on slate-700 background</li>
                <li>• Status text: <span className="text-green-400">text-green-400</span> (high visibility)</li>
                <li>• Dedicated background container</li>
                <li>• High contrast ratio (~7:1)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-slate-800 border border-slate-600 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">💻 Usage Example</h3>
          <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-200 overflow-x-auto">
{`import { CommandInterface } from '../components/site/blocks';

<CommandInterface
  title="ZETA COMMAND CENTER"
  subtitle="All systems armed • Ready for deployment"
  status="Zeta Command"
  missionText="Mission text with improved readability..."
  onStartAnalysis={() => console.log('Analysis started')}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CommandInterfaceDemo; 