'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Mail } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-slate-200 mb-6">Page Not Found</h2>
        <p className="text-lg text-slate-400 mb-10 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href={ROUTES.HOME}
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-lg"
          >
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Link>
          <Link 
            href={ROUTES.CONTACT}
            className="inline-flex items-center px-6 py-3 bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 transition-colors"
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 