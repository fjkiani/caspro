'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, FileText, Video as VideoIcon, BookOpen, ArrowRight } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import VideoViewer from '@/components/media/VideoViewer';
import CTASection from '@/components/shared/CTASection';
import { motion } from 'framer-motion';

interface MediaLearningHubProps {
  media: MediaItem;
  relatedMedia?: MediaItem[];
}

export default function MediaLearningHub({ media, relatedMedia = [] }: MediaLearningHubProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'details' | 'resources'>('video');

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/media"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Media</span>
              </Link>
              <div className="border-l border-gray-300 pl-4">
                <div className="flex items-center gap-2">
                  {media.type === 'VIDEO' && <VideoIcon className="w-5 h-5 text-blue-600" />}
                  {media.type === 'DECK' && <FileText className="w-5 h-5 text-purple-600" />}
                  {media.type === 'PDF' && <FileText className="w-5 h-5 text-red-600" />}
                  <h1 className="text-xl font-bold text-gray-900">{media.title}</h1>
                </div>
                {media.excerpt && (
                  <p className="text-sm text-gray-500 mt-1">{media.excerpt}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-1">
            {media.type === 'VIDEO' && (
              <button
                onClick={() => setActiveTab('video')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'video'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <VideoIcon className="w-4 h-4 inline-block mr-2" />
                Video
              </button>
            )}
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'details'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-4 h-4 inline-block mr-2" />
              Details
            </button>
            {relatedMedia.length > 0 && (
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'resources'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4 inline-block mr-2" />
                Related Resources ({relatedMedia.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Video Tab */}
        {activeTab === 'video' && media.type === 'VIDEO' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-8"
            style={{ minHeight: '600px' }}
          >
            <VideoViewer media={media} showToolbar={true} />
          </motion.div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Rich Description */}
            {media.description?.html && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Content</h2>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: media.description.html }}
                />
              </div>
            )}

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {media.tags && media.tags.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {media.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {media.publishedAt && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Published</h3>
                  <p className="text-gray-600">
                    {new Date(media.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Download/External Links */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources</h2>
              <div className="flex flex-wrap gap-4">
                {media.videoFile?.url && (
                  <a
                    to={media.videoFile.url}
                    download
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download Video
                  </a>
                )}
                {media.videoUrl && (
                  <a
                    to={media.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Open Original
                  </a>
                )}
                {media.pdfFile?.url && (
                  <a
                    to={media.pdfFile.url}
                    download
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && relatedMedia.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedMedia.map((item) => (
                  <Link
                    key={item.id}
                    to={`/media/${item.slug}`}
                    className="block group"
                  >
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        {item.type === 'VIDEO' && <VideoIcon className="w-5 h-5 text-blue-600" />}
                        {item.type === 'DECK' && <FileText className="w-5 h-5 text-purple-600" />}
                        {item.type === 'PDF' && <FileText className="w-5 h-5 text-red-600" />}
                        <span className="text-sm font-semibold text-gray-500 uppercase">
                          {item.type}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {item.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                        <span>View Resource</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <div className="mt-12">
          <CTASection
            title="Ready to Learn More?"
            description="Explore how CrisPRO.ai can transform your research and clinical workflows with AI-powered precision."
            primaryButton={{
              text: 'Schedule a Demo',
              href: '/contact',
              color: 'blue',
            }}
            secondaryButton={{
              text: 'View All Media',
              href: '/media',
              color: 'blue',
            }}
            backgroundColor="blue"
          />
        </div>
      </main>
    </div>
  );
}
