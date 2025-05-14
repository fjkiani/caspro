'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-[70vh] py-24">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-7xl mb-6 block">😕</span>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
            <p className="text-xl text-slate-600 mb-8">
              Sorry, we couldn't find the page you're looking for.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href={ROUTES.HOME}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Go to Homepage
              </Link>
              <Link 
                href={ROUTES.CONTACT}
                className="px-6 py-3 bg-slate-100 text-slate-800 rounded-md hover:bg-slate-200 transition-colors"
              >
                Contact Support
              </Link>
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">You might be looking for:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link href={ROUTES.ABOUT} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <h3 className="font-medium text-primary">About Us</h3>
                  <p className="text-sm text-slate-600">Learn about our mission</p>
                </Link>
                <Link href={ROUTES.PRIVACY} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <h3 className="font-medium text-primary">Privacy Policy</h3>
                  <p className="text-sm text-slate-600">How we protect your data</p>
                </Link>
                <Link href={ROUTES.TERMS} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <h3 className="font-medium text-primary">Terms of Service</h3>
                  <p className="text-sm text-slate-600">Our usage guidelines</p>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 