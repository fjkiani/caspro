'use client';

import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { PostNode } from '@/types/blog'; // Corrected import path
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: PostNode;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const postData = post;

  return (
    <div className="group bg-slate-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-slate-700 hover:border-primary/30 h-full flex flex-col">
      <Link href={`/blog/post/${postData.slug}`}>
        <div className="relative block h-48 overflow-hidden">
          {postData.featuredImage?.url ? (
            <img
              src={postData.featuredImage.url}
              alt={postData.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-slate-700 flex items-center justify-center">
              <span className="text-slate-400 text-sm">No Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs text-slate-400 mb-2">
          {moment(postData.createdAt).format('MMMM DD, YYYY')}
        </p>
        <h3 className="text-lg font-semibold text-slate-100 mb-3 flex-grow hover:text-primary transition-colors duration-200">
          <Link href={`/blog/post/${postData.slug}`}>
            {postData.title}
          </Link>
        </h3>
        <p className="text-sm text-slate-300 mb-4 line-clamp-3">
            {postData.excerpt}
        </p>
        <div className="mt-auto">
          <Link href={`/blog/post/${postData.slug}`} className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-300">
              Read More
              <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard; 