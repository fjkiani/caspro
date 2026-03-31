'use client';

import { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';

interface PDFViewerProps {
  media: MediaItem;
}

export default function PDFViewer({ media }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!media.pdfFile) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">PDF file not available</p>
      </div>
    );
  }

  const pdfUrl = media.pdfFile.url;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">PDF Viewer</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            to={pdfUrl}
            download={media.pdfFile.fileName}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
          <a
            to={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Open in New Tab
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 relative bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading PDF...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <a
                to={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open PDF in new tab
              </a>
            </div>
          </div>
        )}

        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError('Failed to load PDF. Please try downloading it instead.');
          }}
          title={media.title}
        />
      </div>
    </div>
  );
}
