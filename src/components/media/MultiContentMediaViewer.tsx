'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Maximize2, Video as VideoIcon, FileText, Presentation, Download } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import VideoViewer from '@/components/media/VideoViewer';
import DynamicDeckViewer from '@/components/media/DynamicDeckViewer';
import { motion } from 'framer-motion';

interface MultiContentMediaViewerProps {
  media: MediaItem;
}

type ContentTab = 'video' | 'deck' | 'pdf';

export default function MultiContentMediaViewer({ media }: MultiContentMediaViewerProps) {
  const router = useRouter();
  
  // Determine available content types
  const hasVideo = !!(media.videoUrl || media.videoFile?.url);
  // Deck can be: deckSlug/deckId (registry) OR pdfFile (uploaded deck file)
  // If type is DECK, the pdfFile is the deck. If type is VIDEO but has pdfFile, show it as deck too.
  const hasDeck = !!(media.deckSlug || media.deckId || (media.pdfFile?.url && (media.type === 'DECK' || media.type === 'VIDEO')));
  // PDF/1-Pager is separate - only show if type is PDF (not when it's used as deck)
  const hasPdf = !!(media.pdfFile?.url && media.type === 'PDF');

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[MultiContentMediaViewer] Media:', {
      title: media.title,
      type: media.type,
      hasVideo,
      hasDeck,
      hasPdf,
      deckSlug: media.deckSlug,
      deckId: media.deckId,
      pdfFile: media.pdfFile?.url ? 'exists' : 'missing',
      videoUrl: media.videoUrl ? 'exists' : 'missing',
      videoFile: media.videoFile?.url ? 'exists' : 'missing',
    });
  }

  // Set initial tab based on what's available
  const getInitialTab = (): ContentTab => {
    if (hasVideo) return 'video';
    if (hasDeck) return 'deck';
    if (hasPdf) return 'pdf';
    return 'video'; // fallback
  };

  const [activeTab, setActiveTab] = useState<ContentTab>(getInitialTab());
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
      if (e.key === 'ArrowLeft' && e.ctrlKey) {
        router.back();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // Prevent body scroll in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const renderContent = () => {
    switch (activeTab) {
      case 'video':
        if (!hasVideo) {
          return (
            <div className="flex items-center justify-center h-full min-h-[600px]">
              <p className="text-gray-500">Video not available</p>
            </div>
          );
        }
        return (
          <div className="w-full h-full bg-black flex items-center justify-center min-h-[600px]">
            <VideoViewer media={media} showToolbar={true} />
          </div>
        );

      case 'deck':
        if (!hasDeck) {
          return (
            <div className="flex items-center justify-center h-full min-h-[600px]">
              <p className="text-gray-500">Deck not available</p>
            </div>
          );
        }
        // If deck is from registry (deckSlug/deckId), use DynamicDeckViewer
        if (media.deckSlug || media.deckId) {
          return (
            <div className="w-full h-full min-h-screen">
              <DynamicDeckViewer media={media} showControls={!isFullscreen} />
            </div>
          );
        }
        // If deck is uploaded as PDF file, display it directly like a PDF
        if (media.pdfFile?.url) {
          return (
            <div className="w-full h-full bg-gray-100">
              <iframe
                src={`${media.pdfFile.url}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full border-0"
                title={`${media.title} - Deck`}
              />
            </div>
          );
        }
        return (
          <div className="flex items-center justify-center h-full min-h-[600px]">
            <p className="text-gray-500">Deck not available</p>
          </div>
        );

      case 'pdf':
        if (!hasPdf) {
          return (
            <div className="flex items-center justify-center h-full min-h-[600px]">
              <p className="text-gray-500">PDF not available</p>
            </div>
          );
        }
        return (
          <div className="w-full h-full min-h-[600px] bg-gray-100">
            <iframe
              src={`${media.pdfFile?.url}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full border-0"
              title={media.title}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const containerClass = isFullscreen 
    ? 'fixed inset-0 z-50 bg-black' 
    : 'min-h-screen bg-gradient-to-br from-white via-slate-50 to-white';

  return (
    <div className={containerClass}>
      {!isFullscreen && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()} 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-lg font-semibold text-gray-900">{media.title}</h1>
                {media.excerpt && (
                  <p className="text-sm text-gray-500 mt-1">{media.excerpt}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsFullscreen(true)} 
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Enter fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          {(hasVideo || hasDeck || hasPdf) && (
            <div className="border-t border-gray-200">
              <div className="flex gap-1 px-4 max-w-7xl mx-auto">
                {hasVideo && (
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                      activeTab === 'video'
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900 border-transparent'
                    }`}
                  >
                    <VideoIcon className="w-4 h-4 inline-block mr-2" />
                    Video
                  </button>
                )}
                {hasDeck && (
                  <button
                    onClick={() => setActiveTab('deck')}
                    className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                      activeTab === 'deck'
                        ? 'text-purple-600 border-purple-600'
                        : 'text-gray-600 hover:text-gray-900 border-transparent'
                    }`}
                  >
                    <Presentation className="w-4 h-4 inline-block mr-2" />
                    Deck
                  </button>
                )}
                {hasPdf && (
                  <button
                    onClick={() => setActiveTab('pdf')}
                    className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                      activeTab === 'pdf'
                        ? 'text-red-600 border-red-600'
                        : 'text-gray-600 hover:text-gray-900 border-transparent'
                    }`}
                  >
                    <FileText className="w-4 h-4 inline-block mr-2" />
                    1-Pager
                  </button>
                )}
              </div>
            </div>
          )}
        </header>
      )}

      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
          title="Exit fullscreen (ESC)"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      <div className={isFullscreen ? 'h-screen' : activeTab === 'deck' ? 'h-[calc(100vh-140px)]' : 'min-h-[calc(100vh-80px)]'}>
        {renderContent()}
      </div>

      {!isFullscreen && media.description?.html && (
        <div className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: media.description.html }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
