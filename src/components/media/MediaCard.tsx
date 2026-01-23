'use client';

import { FileText, Video, Presentation } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import Image from 'next/image';

interface MediaCardProps {
  media: MediaItem;
  onClick: () => void;
}

export default function MediaCard({ media, onClick }: MediaCardProps) {
  const getIcon = () => {
    switch (media.type) {
      case 'PDF':
        return <FileText className="w-6 h-6" />;
      case 'VIDEO':
        return <Video className="w-6 h-6" />;
      case 'DECK':
        return <Presentation className="w-6 h-6" />;
    }
  };

  const getTypeColor = () => {
    switch (media.type) {
      case 'PDF':
        return 'bg-red-100 text-red-700';
      case 'VIDEO':
        return 'bg-blue-100 text-blue-700';
      case 'DECK':
        return 'bg-purple-100 text-purple-700';
    }
  };

  const thumbnail = media.thumbnail || media.featuredImage;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail.url}
            alt={media.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className={`${getTypeColor()} p-4 rounded-lg`}>
              {getIcon()}
            </div>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span className={`${getTypeColor()} px-2 py-1 rounded-md text-xs font-medium`}>
            {media.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {media.title}
        </h3>
        
        {media.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {media.excerpt}
          </p>
        )}

        {/* Category */}
        {media.category && (
          <div className="text-xs text-gray-500 mb-2">
            {media.category.title}
          </div>
        )}

        {/* Tags */}
        {media.tags && media.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {media.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
