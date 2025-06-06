'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import PostCard from './PostCard';
import { PostNode } from './page'; // Category and RecentPost removed from import
// CategoriesWidget and PostWidget imports removed

interface BlogPageClientProps {
  posts: PostNode[];
  // categories and recentPosts props removed
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <>
      <main className="pt-24 pb-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto" // Adjusted max-width for a more focused content area
          >
            <div className="mb-16 text-center"> {/* Increased bottom margin */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">CrisPRO Blog</h1> {/* Slightly increased top heading size & margin */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Insights, news, and research at the intersection of AI and oncology
              </p>
            </div>

            {/* Main Content Area - Simplified Layout */}
            <div className="mb-16"> {/* Increased bottom margin */}
              {/* Removed "Latest Articles" heading for a cleaner look, title implies this */}
              {posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12"> {/* Adjusted grid and gap */}
                  {posts.map((post: PostNode, index: number) => (
                    <PostCard key={post.slug || index} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16"> {/* Increased padding */}
                  <p className="text-xl text-muted-foreground">No blog posts found. Check back soon!</p>
                </div>
              )}
            </div>
            
            {/* Join the Conversation - Simplified */}
            <div className="py-12 border-t border-slate-700/50 text-center"> {/* Adjusted padding and border color */}
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Join the Conversation</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Follow us on social media or contact us to suggest topics you'd like us to cover.
              </p>
              <div className="flex justify-center space-x-6">
                <Link href="#" className="text-primary hover:text-primary-dark transition-colors duration-300">LinkedIn</Link>
                <Link href="#" className="text-primary hover:text-primary-dark transition-colors duration-300">Twitter</Link>
                <Link href={ROUTES.CONTACT} className="text-primary hover:text-primary-dark transition-colors duration-300">Contact</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
} 
 