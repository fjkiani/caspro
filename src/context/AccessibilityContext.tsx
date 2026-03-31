'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  isLargeText: boolean;
  toggleLargeText: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('large-text');
    if (saved === 'true') {
      setIsLargeText(true);
      document.documentElement.classList.add('large-text');
    }
  }, []);

  const toggleLargeText = () => {
    setIsLargeText(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('large-text');
        localStorage.setItem('large-text', 'true');
      } else {
        document.documentElement.classList.remove('large-text');
        localStorage.setItem('large-text', 'false');
      }
      return next;
    });
  };

  return (
    <AccessibilityContext.Provider value={{ isLargeText, toggleLargeText }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
