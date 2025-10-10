'use client';

import React from 'react';
import { Printer, Download, Maximize2, Minimize2 } from 'lucide-react';

interface PrintControlsProps {
  onPrint: () => void;
  onDownload: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

const PrintControls: React.FC<PrintControlsProps> = ({
  onPrint,
  onDownload,
  onToggleFullscreen,
  isFullscreen
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 print:hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print Poster
        </button>
        
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        
        <button
          onClick={onToggleFullscreen}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-600">
        <p><strong>Optimized for:</strong> 96×48 inches (Primary)</p>
        <p><strong>Also supports:</strong> 48×24, 72×36, 84×42 inches</p>
        <p><strong>Recommended:</strong> Use browser's print dialog for best results</p>
      </div>
    </div>
  );
};

export default PrintControls;
