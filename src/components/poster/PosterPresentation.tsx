'use client';

import React, { useState } from 'react';
import PosterHeader from './PosterHeader';
import ProblemSection from './ProblemSection';
import VariantInterpretationSection from './VariantInterpretationSection';
import TherapeuticDesignSection from './TherapeuticDesignSection';
import ConclusionSection from './ConclusionSection';
import PrintControls from './PrintControls';

const PosterPresentation: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a new window for printing to PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>CrisPRO.ai Poster - Download</title>
            <link to="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
            <style>
              @page { size: 48in 24in; margin: 0.5in; }
              body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
              .poster-container { width: 100vw; height: 100vh; margin: 0; padding: 1rem; }
            </style>
          </head>
          <body>
            ${document.querySelector('.poster-container')?.outerHTML || ''}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`bg-gray-100 print:p-0 ${isFullscreen ? 'fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden' : 'pt-20 pb-8 min-h-screen'}`}>
      <PrintControls
        onPrint={handlePrint}
        onDownload={handleDownload}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />
      
      <div className={`poster-container bg-white grid grid-cols-6 gap-8 p-12 ${isFullscreen ? 'w-full max-w-[90vw] max-h-[90vh] transform scale-75' : 'w-full'}`}>
        {/* Header spans all 6 columns */}
        <PosterHeader />
        
        {/* Column 1-2: The Problem & Introduction (wider) */}
        <div className="col-span-2 poster-column flex flex-col gap-8">
          <ProblemSection />
        </div>

        {/* Column 3-4: Automated Variant Interpretation (wider) */}
        <div className="col-span-2 poster-column flex flex-col gap-8">
          <VariantInterpretationSection />
        </div>

        {/* Column 5-6: In-Silico Therapeutic Design & Validation (wider) */}
        <div className="col-span-2 poster-column flex flex-col gap-8">
          <TherapeuticDesignSection />
        </div>

        {/* Conclusion spans bottom 6 columns */}
        <div className="col-span-6 poster-column flex flex-col gap-8">
          <ConclusionSection />
        </div>
      </div>
    </div>
  );
};

export default PosterPresentation;





