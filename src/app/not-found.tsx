'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Mail, Construction, Sparkles } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
              <Construction className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-4">
          Coming Soon
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold text-slate-200 mb-6">
          This page is under development
        </h2>
        <p className="text-base md:text-lg text-slate-300 mb-10 max-w-md mx-auto leading-relaxed">
          We're working hard to bring you this feature. Check back soon or explore what we've already built.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href={ROUTES.HOME}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Link>
          <Link 
            href={ROUTES.CONTACT}
            className="inline-flex items-center px-6 py-3 bg-slate-700/50 backdrop-blur-sm text-slate-200 rounded-lg hover:bg-slate-600/50 transition-all border border-slate-600"
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Us
          </Link>
        </div>

        {/* Additional helpful links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-700"
        >
          <p className="text-sm text-slate-400 mb-4">Or explore our platform:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products/oracle" className="text-sm text-blue-400 hover:text-blue-300 underline">
              Oracle Intelligence
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/products/forge" className="text-sm text-blue-400 hover:text-blue-300 underline">
              Forge Intelligence
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/platform" className="text-sm text-blue-400 hover:text-blue-300 underline">
              Platform
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 