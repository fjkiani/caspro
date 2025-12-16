'use client';

import React, { useState } from 'react';
import RDIntelligenceCascadeModalWrapper from './RDIntelligenceCascadeModalWrapper';

/**
 * Generate Design Button for R&D Product Page
 * 
 * Similar to GenerateCarePlanButton for Oncology, but tailored for R&D product.
 * Opens the Intelligence Cascade modal showing the R&D workflow.
 */
export default function GenerateDesignButton() {
  const [showModal, setShowModal] = useState(false);

  const handleGenerate = () => {
    // Open modal immediately to show step-by-step animation
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // After modal closes, scroll to the interactive showcase section
    setTimeout(() => {
      const element = document.getElementById('interactive-showcase');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // Small delay for modal close animation
  };

  return (
    <>
      <button
        onClick={handleGenerate}
        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
      >
        🚀 Generate Design
        <span className="text-sm opacity-90">See unified intelligence in action</span>
      </button>

      <RDIntelligenceCascadeModalWrapper
        isOpen={showModal}
        onClose={handleCloseModal}
        projectId="RD-001"
      />
    </>
  );
}

