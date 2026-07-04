'use client';

import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { PostNode } from '@/types/blog'; // Corrected import path
import { researchBlogPostPath } from '@/lib/research/paths';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: PostNode;
  /** Slightly larger typography and border accent for “standalone” grid. */
  prominent?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, prominent }) => {
  const postData = post;

  return (
    <div
      className={`group rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col border shadow-md hover:shadow-lg ${
        prominent
          ? 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-600 hover:border-cyan-500/40 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06]'
          : 'bg-white dark:bg-slate-800/50 rounded-lg shadow-lg hover:shadow-primary/20 border-slate-200 dark:border-slate-700 hover:border-primary/30'
      }`}
    >
      <Link href={researchBlogPostPath(postData.slug)}>
        <div className={`relative block overflow-hidden ${prominent ? 'h-52 sm:h-56' : 'h-48'}`}>
          {postData.featuredImage?.url ? (
            <img
              src={postData.featuredImage.url}
              alt={postData.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <span className="text-slate-500 dark:text-slate-400 text-sm">No Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </Link>
      
      <div className={`flex flex-col flex-grow ${prominent ? 'p-6 sm:p-7' : 'p-6'}`}>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          {moment(postData.createdAt).format('MMMM DD, YYYY')}
        </p>
        <h3
          className={`font-semibold text-slate-900 dark:text-slate-100 mb-3 flex-grow hover:text-primary transition-colors duration-200 ${
            prominent ? 'text-xl leading-snug' : 'text-lg'
          }`}
        >
          <Link href={researchBlogPostPath(postData.slug)}>
            {postData.title}
          </Link>
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
            {postData.excerpt}
        </p>
        <div className="mt-auto">
          <Link href={researchBlogPostPath(postData.slug)} className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-300">
              Read the post
              <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard; 