'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import PDFViewer from './PDFViewer';
import VideoViewer from './VideoViewer';
import DeckViewer from './DeckViewer';

interface MediaViewerProps {
  media: MediaItem;
  onClose: () => void;
}

export default function MediaViewer({ media, onClose }: MediaViewerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const renderContent = () => {
    switch (media.type) {
      case 'PDF':
        return <PDFViewer media={media} />;
      case 'VIDEO':
        return <VideoViewer media={media} />;
      case 'DECK':
        return <DeckViewer media={media} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Unsupported media type</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{media.title}</h2>
            {media.excerpt && (
              <p className="text-sm text-gray-600 mt-1">{media.excerpt}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
