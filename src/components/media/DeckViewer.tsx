'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import { useRouter } from 'next/navigation';

interface DeckViewerProps {
  media: MediaItem;
}

export default function DeckViewer({ media }: DeckViewerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Navigate to deck viewer page
  useEffect(() => {
    if (media.deckSlug) {
      // If we have a deck slug, we can navigate to the deck viewer
      // For now, we'll show a message and link
      setIsLoading(false);
    } else if (media.deckId) {
      // If we have a deck ID, we can use that
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [media]);

  const handleViewDeck = () => {
    if (media.deckSlug) {
      // Navigate to deck viewer - adjust route based on your deck structure
      router.push(`/decks/${media.deckSlug}`);
    } else if (media.deckId) {
      router.push(`/decks/${media.deckId}`);
    }
  };

  if (!media.deckSlug && !media.deckId) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Deck not available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Slide Deck</span>
        </div>
        <button
          onClick={handleViewDeck}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Open Full Deck Viewer
        </button>
      </div>

      {/* Deck Preview/Info */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md p-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{media.title}</h3>
          {media.excerpt && (
            <p className="text-gray-600 mb-6">{media.excerpt}</p>
          )}
          <button
            onClick={handleViewDeck}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Full Deck
            <ArrowRight className="w-5 h-5" />
          </button>
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
