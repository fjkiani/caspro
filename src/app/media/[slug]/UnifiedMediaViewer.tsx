'use client';

import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import MultiContentMediaViewer from '@/components/media/MultiContentMediaViewer';

interface UnifiedMediaViewerProps {
  media: MediaItem;
}

export default function UnifiedMediaViewer({ media }: UnifiedMediaViewerProps) {
  // Use the multi-content viewer which handles video, deck, and PDF all in one
  return <MultiContentMediaViewer media={media} />;
}
