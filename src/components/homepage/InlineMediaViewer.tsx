'use client';

import { useState } from 'react';
import { X, Play, FileText, Maximize2, Minimize2 } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import VideoViewer from '@/components/media/VideoViewer';
import { motion, AnimatePresence } from 'framer-motion';

interface InlineMediaViewerProps {
  media: MediaItem;
  onClose?: () => void;
}

export default function InlineMediaViewer({ media, onClose }: InlineMediaViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const hasVideo = !!(media.videoUrl || media.videoFile?.url);
  const hasPdf = !!media.pdfFile?.url;

  // Determine what to show
  const showVideo = hasVideo && (media.type === 'VIDEO' || !hasPdf);
  const showPdf = hasPdf && (media.type === 'PDF' || (!hasVideo && media.type === 'DECK'));

  if (!isPlaying && !isFullscreen) {
    // Show thumbnail/preview
    const thumbnailUrl = media.thumbnail?.url || media.featuredImage?.url;
    
    return (
      <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl overflow-hidden group cursor-pointer">
        {/* Thumbnail or placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={media.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-white/50">
              {showVideo && <Play className="w-20 h-20" />}
              {showPdf && <FileText className="w-20 h-20" />}
            </div>
          )}
        </div>
        
        {/* Play/View overlay */}
        <div 
          className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center"
          onClick={() => setIsPlaying(true)}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {showVideo ? (
              <Play className="w-12 h-12 text-blue-600 ml-1" fill="currentColor" />
            ) : (
              <FileText className="w-12 h-12 text-purple-600" />
            )}
          </motion.div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-white font-semibold text-lg">{media.title}</h3>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-video bg-black rounded-xl overflow-hidden'}`}
      >
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          )}
          {!isFullscreen && (
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          )}
          {onClose && (
            <button
              onClick={() => {
                setIsPlaying(false);
                setIsFullscreen(false);
                onClose?.();
              }}
              className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className={isFullscreen ? 'h-screen' : 'h-full'}>
          {showVideo ? (
            <VideoViewer media={media} showToolbar={false} />
          ) : showPdf ? (
            <iframe
              src={`${media.pdfFile?.url}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full border-0"
              title={media.title}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <p>Content not available</p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
