'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import { resolveMediaContent } from '@/lib/docs/hygraph/media-queries';

interface VideoViewerProps {
  media: MediaItem;
}

export default function VideoViewer({ media }: VideoViewerProps) {
  const mediaWithContent = resolveMediaContent(media);
  const videoUrl = mediaWithContent.content?.videoEmbedUrl || mediaWithContent.content?.videoFileUrl;
  const isEmbed = !!mediaWithContent.content?.videoEmbedUrl;

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Video not available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Video Player</span>
        </div>
        {media.videoUrl && (
          <a
            href={media.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Open Original
          </a>
        )}
      </div>

      {/* Video Player */}
      <div className="flex-1 relative bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          {isEmbed ? (
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={media.title}
            />
          ) : (
            <video
              src={videoUrl}
              controls
              className="w-full h-full"
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>

      {/* Description */}
      {media.description && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: media.description.html }}
          />
        </div>
      )}
    </div>
  );
}
