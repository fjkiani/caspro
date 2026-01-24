'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FileText, Video, Presentation, Filter, Search, Grid, List } from 'lucide-react';
import type { MediaItem, MediaCategory } from '@/lib/docs/hygraph/media-types';
import MediaCard from '@/components/media/MediaCard';
import InlineMediaViewer from '@/components/homepage/InlineMediaViewer';

interface MediaPageClientProps {
  initialMedia: MediaItem[];
  categories: MediaCategory[];
}

export default function MediaPageClient({ initialMedia, categories }: MediaPageClientProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'PDF' | 'VIDEO' | 'DECK'>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter media items
  const filteredMedia = useMemo(() => {
    return initialMedia.filter((item) => {
      // Type filter
      if (filterType !== 'ALL' && item.type !== filterType) {
        return false;
      }

      // Category filter
      if (filterCategory !== 'ALL' && item.category?.slug !== filterCategory) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesExcerpt = item.excerpt?.toLowerCase().includes(query);
        const matchesTags = item.tags?.some((tag) => tag.toLowerCase().includes(query));
        
        if (!matchesTitle && !matchesExcerpt && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [initialMedia, filterType, filterCategory, searchQuery]);

  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
  };

  const handleCloseViewer = () => {
    setSelectedMedia(null);
  };

  // Count by type
  const counts = useMemo(() => {
    return {
      all: initialMedia.length,
      pdf: initialMedia.filter((m) => m.type === 'PDF').length,
      video: initialMedia.filter((m) => m.type === 'VIDEO').length,
      deck: initialMedia.filter((m) => m.type === 'DECK').length,
    };
  }, [initialMedia]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Media</h1>
          <p className="text-gray-600">
            Browse our collection of 1-pagers, slide decks, and videos
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'ALL'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => setFilterType('PDF')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filterType === 'PDF'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              PDFs ({counts.pdf})
            </button>
            <button
              onClick={() => setFilterType('VIDEO')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filterType === 'VIDEO'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Video className="w-4 h-4" />
              Videos ({counts.video})
            </button>
            <button
              onClick={() => setFilterType('DECK')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filterType === 'DECK'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Presentation className="w-4 h-4" />
              Decks ({counts.deck})
            </button>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterCategory('ALL')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filterCategory === 'ALL'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilterCategory(category.slug)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filterCategory === category.slug
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No media found matching your filters.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((media) => (
              <div key={media.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300">
                {/* Inline viewer - click to play/view */}
                <div className="relative">
                  <InlineMediaViewer media={media} />
                </div>
                {/* Card content */}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                    {media.title}
                  </h3>
                  {media.excerpt && (
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                      {media.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      media.type === 'VIDEO' 
                        ? 'bg-blue-100 text-blue-700' 
                        : media.type === 'DECK'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {media.type}
                    </span>
                    <Link 
                      href={`/media/${media.slug}`}
                      className="text-sm text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      <span>Full Page</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMedia.map((media) => (
              <div key={media.id} className="bg-white rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="md:w-64 flex-shrink-0">
                    <InlineMediaViewer media={media} />
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {media.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ml-2 ${
                        media.type === 'VIDEO' 
                          ? 'bg-blue-100 text-blue-700' 
                          : media.type === 'DECK'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {media.type}
                      </span>
                    </div>
                    {media.excerpt && (
                      <p className="text-slate-600 mb-3 line-clamp-2">
                        {media.excerpt}
                      </p>
                    )}
                    {media.tags && media.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {media.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link 
                      href={`/media/${media.slug}`}
                      className="text-sm text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      <span>View Full Page</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
