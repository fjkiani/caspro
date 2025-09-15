import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type ThemeMode = 'default' | 'black' | 'white';

interface AccessibilityContextType {
  largeTextMode: boolean;
  toggleLargeText: () => void;
  getTextSize: (baseSize: string) => string;
  getIconSize: (baseSize: number) => number;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  getBackgroundClass: (baseClass: string) => string;
  getCardClass: (baseClass?: string) => string;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [largeTextMode, setLargeTextMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('accessibility.largeTextMode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('accessibility.themeMode');
      return (saved ? JSON.parse(saved) : 'white') as ThemeMode;
    } catch {
      return 'white';
    }
  });

  const applyRootFontSize = (enabled: boolean) => {
    try {
      const root = document.documentElement;
      if (enabled) {
        root.style.fontSize = '18px'; // scale up Tailwind rem-based sizes
        root.setAttribute('data-large-text', 'true');
      } else {
        root.style.fontSize = '';
        root.removeAttribute('data-large-text');
      }
    } catch {}
  };

  const applyTheme = (mode: ThemeMode) => {
    try {
      const root = document.documentElement;
      // Remove all theme attributes first
      root.removeAttribute('data-dark-theme');
      root.removeAttribute('data-white-theme');
      
      // Apply the selected theme
      if (mode === 'black') {
        root.setAttribute('data-dark-theme', 'true');
      } else if (mode === 'white') {
        root.setAttribute('data-white-theme', 'true');
      }
      // 'default' mode has no special attribute
    } catch {}
  };

  useEffect(() => {
    applyRootFontSize(largeTextMode);
  }, [largeTextMode]);

  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]);

  const toggleLargeText = () => {
    setLargeTextMode(prev => {
      const next = !prev;
      try { localStorage.setItem('accessibility.largeTextMode', JSON.stringify(next)); } catch {}
      applyRootFontSize(next);
      return next;
    });
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try { 
      localStorage.setItem('accessibility.themeMode', JSON.stringify(mode)); 
    } catch {}
    applyTheme(mode);
  };

  // Helper function to scale text sizes
  const getTextSize = (baseSize: string) => {
    if (!largeTextMode) return baseSize;
    
    const sizeMap: { [key: string]: string } = {
      'text-xs': 'text-sm',
      'text-sm': 'text-base',
      'text-base': 'text-lg',
      'text-lg': 'text-xl',
      'text-xl': 'text-2xl',
      'text-2xl': 'text-3xl',
      'text-3xl': 'text-4xl',
      'text-4xl': 'text-5xl',
      'text-5xl': 'text-6xl',
      'text-6xl': 'text-7xl',
      'text-7xl': 'text-8xl',
    };
    
    return sizeMap[baseSize] || baseSize;
  };

  // Helper function to scale icon sizes
  const getIconSize = (baseSize: number) => {
    return largeTextMode ? Math.floor(baseSize * 1.25) : baseSize;
  };

  // Helper function to get background classes based on theme
  const getBackgroundClass = (baseClass: string) => {
    if (themeMode === 'black') {
      return baseClass
        .replace(/bg-slate-900/g, 'bg-black')
        .replace(/bg-slate-800/g, 'bg-black')
        .replace(/bg-slate-700/g, 'bg-gray-900');
    } else if (themeMode === 'white') {
      return baseClass
        .replace(/bg-slate-900/g, 'bg-white')
        .replace(/bg-slate-800/g, 'bg-gray-50')
        .replace(/bg-slate-700/g, 'bg-gray-100');
    }
    return baseClass;
  };

  // Helper function to get card classes with theme
  const getCardClass = (baseClass: string = '') => {
    if (themeMode === 'black') {
      return `bg-black border-slate-600 ${baseClass}`;
    } else if (themeMode === 'white') {
      return `bg-white border-gray-300 ${baseClass}`;
    }
    return `bg-slate-800/50 border-slate-600 ${baseClass}`;
  };

  const value = {
    largeTextMode,
    toggleLargeText,
    getTextSize,
    getIconSize,
    themeMode,
    setThemeMode,
    getBackgroundClass,
    getCardClass,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}; 