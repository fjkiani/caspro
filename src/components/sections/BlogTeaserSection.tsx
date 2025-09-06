'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getPosts } from '@/services';
import PostCard from '@/app/blog/PostCard';
import DnaSection from '../layouts/DnaSection';

const BlogTeaserSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((newPosts) => setPosts(newPosts.slice(0, 3) || []));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="blog-teaser" className="relative py-16 md:py-24 bg-background text-foreground overflow-hidden">
    

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center mb-6">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Latest Research</h2>
          <p className="text-lg text-muted-foreground">
            Explore our latest research, analysis, and discoveries from the front lines of genomic science.
          </p>
        </motion.div>

        {posts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post: any, i) => (
              <motion.div key={i} variants={itemVariants} className="h-full">
                <div className="h-full bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm overflow-hidden">
                  <PostCard post={post.node} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black text-lg font-bold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              View All Posts <ArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogTeaserSection; 