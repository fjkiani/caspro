'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full border transition-colors group ${
        isLight 
          ? 'border-slate-200 bg-white/50 hover:bg-slate-100' 
          : 'border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900'
      }`}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {isLight ? (
        <Moon className={`w-4 h-4 text-slate-500 group-hover:text-indigo-600`} />
      ) : (
        <Sun className={`w-4 h-4 text-zinc-400 group-hover:text-yellow-400`} />
      )}
    </button>
  );
};
