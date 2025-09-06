'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isResearchMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isResearchMode, setIsResearchMode] = useState(true);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedResearchMode = localStorage.getItem('researchMode') === 'true';
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedResearchMode !== undefined) {
      setIsResearchMode(savedResearchMode);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('researchMode', isResearchMode.toString());
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isResearchMode]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    setIsResearchMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isResearchMode }}>
      {children}
    </ThemeContext.Provider>
  );
};