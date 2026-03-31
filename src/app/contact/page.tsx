'use client';

import React from 'react';
import ContactSection from '@/components/sections/ContactSection';
import { useTheme } from '@/context/ThemeContext';

export default function ContactPage() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <ContactSection />
    </div>
  );
}
