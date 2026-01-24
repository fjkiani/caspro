'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Maximize2, Play, FileText, Video as VideoIcon } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import VideoViewer from '@/components/media/VideoViewer';
import { resolveMediaContent } from '@/lib/docs/hygraph/media-queries';

interface UnifiedMediaViewerProps {
  media: MediaItem;
}

export default function UnifiedMediaViewer({ media }: UnifiedMediaViewerProps) {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const mediaContent = resolveMediaContent(media);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
      if (e.key === 'ArrowLeft') {
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

  const renderMediaContent = () => {
    switch (media.type) {
      case 'VIDEO':
        return (
          <div className="w-full h-full bg-black flex items-center justify-center min-h-[600px]">
            <VideoViewer media={media} />
          </div>
        );
      case 'DECK':
        // For now, show a placeholder - we'll enhance this with deck rendering
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="text-center max-w-2xl p-8">
              <FileText className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h2 className="text-3xl font-bold mb-4">{media.title}</h2>
              {media.excerpt && (
                <p className="text-xl text-slate-300 mb-8">{media.excerpt}</p>
              )}
              {media.description?.html && (
                <div 
                  className="prose prose-invert max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: media.description.html }}
                />
              )}
              <p className="text-slate-400">Deck viewer coming soon - will integrate with slide deck system</p>
            </div>
          </div>
        );
      case 'PDF':
        const pdfUrl = mediaContent.content?.pdfUrl || media.pdfFile?.url;
        if (!pdfUrl) {
          return (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">PDF not available</p>
            </div>
          );
        }
        return (
          <div className="w-full h-full">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title={media.title}
            />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Unsupported media type: {media.type}</p>
          </div>
        );
    }
  };

  const containerClass = isFullscreen 
    ? 'fixed inset-0 z-50 bg-black' 
    : 'min-h-screen bg-gradient-to-br from-white via-slate-50 to-white';

  return (
    <div className={containerClass}>
      {!isFullscreen && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
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
                <div className="flex items-center gap-2">
                  {media.type === 'VIDEO' && <VideoIcon className="w-5 h-5 text-blue-600" />}
                  {media.type === 'DECK' && <FileText className="w-5 h-5 text-purple-600" />}
                  {media.type === 'PDF' && <FileText className="w-5 h-5 text-red-600" />}
                  <h1 className="text-lg font-semibold text-gray-900">{media.title}</h1>
                </div>
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

      <div className={isFullscreen ? 'h-screen' : 'min-h-[calc(100vh-80px)]'}>
        {renderMediaContent()}
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
