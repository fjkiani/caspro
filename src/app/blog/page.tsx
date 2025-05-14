'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function BlogPage() {
  const blogPosts = [
    {
      title: 'The Future of AI in Cancer Genomics',
      excerpt: 'How advanced AI models like Evo2 and AlphaFold 3 are revolutionizing our understanding of cancer mutations and enabling more targeted therapies.',
      date: 'Coming soon',
      category: 'Technology'
    },
    {
      title: 'Precision Medicine: From Data to Treatment',
      excerpt: 'Exploring the complete workflow from genomic data collection to personalized treatment design in modern oncology care.',
      date: 'Coming soon',
      category: 'Research'
    },
    {
      title: 'Privacy and Ethics in Healthcare AI',
      excerpt: 'Addressing the important considerations around patient data, model bias, and responsible AI development in healthcare applications.',
      date: 'Coming soon',
      category: 'Ethics'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">CasPro Blog</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Insights, news, and research at the intersection of AI and oncology
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl mb-12 text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Coming Soon</h2>
              <p className="text-slate-700 mb-6">
                Our blog is under development and will be launching soon with in-depth articles from our team of experts.
                Check back for updates or subscribe to be notified.
              </p>
              <Link
                href={ROUTES.CONTACT}
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
              >
                Subscribe for Updates
              </Link>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Upcoming Articles</h2>
              <div className="grid gap-6">
                {blogPosts.map((post, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">{post.category}</span>
                      <span className="text-slate-500 text-sm">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{post.title}</h3>
                    <p className="text-slate-700">{post.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Join the Conversation</h2>
              <p className="text-slate-700 mb-6">
                Follow us on social media or contact us to suggest topics you'd like us to cover.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="#" className="text-primary hover:text-primary-dark">LinkedIn</Link>
                <Link href="#" className="text-primary hover:text-primary-dark">Twitter</Link>
                <Link href={ROUTES.CONTACT} className="text-primary hover:text-primary-dark">Contact</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 