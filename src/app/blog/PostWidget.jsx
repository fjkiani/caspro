"use client";

import React from 'react';
import moment from 'moment';
import Link from 'next/link'; // Changed from react-router-dom

// Removed useState, useEffect, and service imports as data will be passed via props
// Removed grpahCMSImageLoader import, assuming standard img src usage for now

const PostWidget = ({ posts, title }) => { // Expects posts and a title prop
  if (!posts || posts.length === 0) {
    return null; // Don't render if no posts
  }

  return (
    <div className="bg-slate-800/50 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-slate-100 border-b border-slate-700 pb-4 mb-6">{title}</h3>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={post.slug || index} className="flex items-start w-full">
            {post.featuredImage?.url && (
              <div className="w-16 h-16 flex-none mr-4">
                <Link href={`/blog/post/${post.slug}`}>
                  <img
                    alt={post.title}
                    className="align-middle rounded-md object-cover w-full h-full"
                    src={post.featuredImage.url}
                  />
                </Link>
              </div>
            )}
            <div className="flex-grow">
              <p className="text-xs text-slate-400 mb-1">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <Link href={`/blog/post/${post.slug}`} className="text-slate-200 hover:text-primary transition duration-300 text-sm font-medium leading-tight">
                {post.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostWidget;

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className="shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
       <img
      // loader={grpahCMSImageLoader}
        alt={post.title}
        height={60}  // Removed "px" and used numeric values
        width={60}   // Removed "px" and used numeric values
        unoptimized
        className="align-middle rounded-full"
        src={post.featuredImage.url}
/>
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link to={`/blog/post/${post.slug}`} className="text-md" key={index}> {post.title}
                </Link>         
           </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
