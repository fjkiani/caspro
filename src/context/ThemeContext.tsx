'use client';

import React, { createContext, useContext, useState, useRef, useLayoutEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isResearchMode: boolean;
  isDarkMode: boolean;
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
  const didHydrateTheme = useRef(false);

  useLayoutEffect(() => {
    let t = theme;
    let rm = isResearchMode;

    if (!didHydrateTheme.current) {
      didHydrateTheme.current = true;
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const savedResearchMode = localStorage.getItem('researchMode') === 'true';
      if (savedTheme === 'dark' || savedTheme === 'light') {
        t = savedTheme;
        setTheme(savedTheme);
      }
      rm = savedResearchMode;
      setIsResearchMode(savedResearchMode);
    }

    localStorage.setItem('theme', t);
    localStorage.setItem('researchMode', String(rm));

    if (t === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-mode');
    }
  }, [theme, isResearchMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    setIsResearchMode((prev) => !prev);
  };

  const isDarkMode = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isResearchMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
