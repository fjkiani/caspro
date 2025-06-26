'use client';

import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggleButton = ({ isScrolled, isMenuOpen }: { isScrolled: boolean, isMenuOpen: boolean }) => {
  const { theme, toggleTheme } = useTheme();

  const buttonColor = isScrolled || isMenuOpen ? 'text-slate-600 hover:text-primary' : 'text-gray-200 hover:text-white';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-300 ${buttonColor}`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}; 