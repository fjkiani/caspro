'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, FileText, ArrowRight, Video as VideoIcon } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import { motion } from 'framer-motion';
import InlineMediaViewer from './InlineMediaViewer';

interface FeaturedMediaPreviewProps {
  mediaItems: MediaItem[];
}

export default function FeaturedMediaPreview({ mediaItems }: FeaturedMediaPreviewProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  // Debug in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[FeaturedMediaPreview] Received mediaItems:', mediaItems?.length || 0, mediaItems);
  }
  
  if (!mediaItems || mediaItems.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[FeaturedMediaPreview] No media items, returning null');
    }
    return null;
  }

  // Get the featured item (first one, or filter by tag "featured")
  const featuredItem = mediaItems.find(item => item.tags?.includes('featured')) || mediaItems[0];

  if (!featuredItem) {
    return null;
  }

  // Thumbnail might not be available, use placeholder
  const thumbnailUrl = featuredItem.thumbnail?.url || featuredItem.featuredImage?.url || null;
  const isVideo = featuredItem.type === 'VIDEO';
  const isDeck = featuredItem.type === 'DECK';

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Content
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our latest presentations, videos, and resources
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300">
            {/* Inline Media Viewer - works for video, PDF, and deck */}
            <InlineMediaViewer 
              media={featuredItem}
              onClose={() => setShowVideoModal(false)}
            />

            {/* Content */}
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                {featuredItem.title}
              </h3>
              {featuredItem.excerpt && (
                <p className="text-slate-600 text-lg mb-6 line-clamp-2">
                  {featuredItem.excerpt}
                </p>
              )}
              <Link 
                href={`/media/${featuredItem.slug}`}
                className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all inline-block"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Additional Media Items Grid */}
        {mediaItems.length > 1 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.slice(1, 4).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 h-full">
                  {/* Inline viewer for grid items too */}
                  <div className="relative">
                    <InlineMediaViewer media={item} />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                      {item.title}
                    </h4>
                    {item.excerpt && (
                      <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                        {item.excerpt}
                      </p>
                    )}
                    <Link 
                      href={`/media/${item.slug}`}
                      className="text-sm text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      <span>View Full Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
