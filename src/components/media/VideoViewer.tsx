'use client';

import { ExternalLink, Video as VideoIcon } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import { resolveMediaContent } from '@/lib/docs/hygraph/media-queries';

interface VideoViewerProps {
  media: MediaItem;
  showToolbar?: boolean;
}

export default function VideoViewer({ media, showToolbar = false }: VideoViewerProps) {
  const mediaWithContent = resolveMediaContent(media);
  
  // Priority: uploaded videoFile > videoEmbedUrl > videoFileUrl > videoUrl
  const videoUrl = 
    media.videoFile?.url || // Uploaded video file (highest priority)
    mediaWithContent.content?.videoEmbedUrl || 
    mediaWithContent.content?.videoFileUrl ||
    media.videoUrl;
  
  // Only treat as embed if it's actually embeddable (YouTube/Vimeo)
  // Google Video URLs should be tried as direct video first, then fallback to iframe
  const isGoogleVideo = videoUrl?.includes('googlevideo.com');
  const isUploadedFile = !!media.videoFile?.url; // Check if it's an uploaded file
  const isEmbed = !!(
    !isUploadedFile && // Uploaded files are never embeds
    mediaWithContent.content?.videoEmbedUrl && 
    (mediaWithContent.content.videoEmbedUrl.includes('youtube.com/embed') || 
     mediaWithContent.content.videoEmbedUrl.includes('vimeo.com/video'))
  );

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[VideoViewer] Media:', media);
    console.log('[VideoViewer] Video URL:', videoUrl);
    console.log('[VideoViewer] Is Embed:', isEmbed);
  }

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Video not available</p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="text-xs mt-4 text-gray-400">
            {JSON.stringify({ media, mediaWithContent }, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {showToolbar && (
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
      )}

      {/* Video Player */}
      <div className="flex-1 relative bg-black w-full" style={{ minHeight: '600px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {isEmbed ? (
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={media.title}
            />
          ) : isGoogleVideo ? (
            // Google Video URLs often have CORS issues - show direct link
            <div className="w-full h-full flex flex-col items-center justify-center text-white text-center p-8">
              <VideoIcon className="w-20 h-20 mb-6 text-white/50" />
              <h3 className="text-2xl font-bold mb-4">{media.title}</h3>
              <p className="text-lg mb-6 text-white/70 max-w-2xl">
                This video is hosted on Google Video and cannot be embedded due to CORS restrictions.
                Please click the button below to open it in a new tab.
              </p>
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors flex items-center gap-3 text-lg"
              >
                <ExternalLink className="w-6 h-6" />
                Open Video in New Tab
              </a>
              <p className="text-sm text-white/50 mt-4">
                The video will open in a new browser tab
              </p>
            </div>
          ) : (
            <video
              src={videoUrl}
              controls
              className="w-full h-full max-w-full max-h-full object-contain"
              autoPlay
              playsInline
              crossOrigin="anonymous"
              style={{ maxHeight: '100vh' }}
            >
              Your browser does not support the video tag.
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
