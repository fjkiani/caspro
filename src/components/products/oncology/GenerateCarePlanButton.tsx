'use client';

import React from 'react';
import { useOncologyAgents } from '@/contexts/OncologyAgentContext';

const GenerateCarePlanButton: React.FC = () => {
  const { startCascade, isPlaying, isComplete, resetCascade } = useOncologyAgents();

  const handleGenerate = () => {
    if (isComplete) {
      resetCascade();
      setTimeout(() => startCascade(), 300);
    } else if (!isPlaying) {
      startCascade();
    }
    
    // Scroll to cascade section
    setTimeout(() => {
      const element = document.getElementById('cascade-experience');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <button
      onClick={handleGenerate}
      className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
    >
      🚀 Generate Care Plan
      <span className="text-sm opacity-90">See unified intelligence in action</span>
    </button>
  );
};

export default GenerateCarePlanButton;
