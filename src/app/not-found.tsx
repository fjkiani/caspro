'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Mail, FileQuestion } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

/** Real 404 — do not reuse “coming soon” copy (that confused users with the live home page). */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6">
      <div className="text-center max-w-lg">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
            <FileQuestion className="w-10 h-10 text-slate-300" aria-hidden />
          </div>
        </div>

        <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-500 mb-3">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          This URL does not match any route on CrisPRO.ai. If you followed an old bookmark, use the links below.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={ROUTES.HOME}
            prefetch={false}
            className="inline-flex items-center px-5 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors text-sm font-semibold"
          >
            <Home className="mr-2 h-4 w-4" aria-hidden />
            Home
          </Link>
          <Link
            href={`${ROUTES.BLOG}/`}
            prefetch={false}
            className="inline-flex items-center px-5 py-2.5 bg-slate-800 text-slate-100 rounded-lg hover:bg-slate-700 transition-colors text-sm font-semibold border border-slate-600"
          >
            Blog
          </Link>
          <Link
            href="/contact/"
            prefetch={false}
            className="inline-flex items-center px-5 py-2.5 bg-slate-800 text-slate-100 rounded-lg hover:bg-slate-700 transition-colors text-sm font-semibold border border-slate-600"
          >
            <Mail className="mr-2 h-4 w-4" aria-hidden />
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
