'use client';

/**
 * Fallback hook for AccessibilityContext compatibility
 * Provides default values when AccessibilityContext is not available
 * Used for adapting src2 components to Next.js
 */
export const useAccessibilityFallback = () => {
  return {
    largeTextMode: false,
    toggleLargeText: () => {},
    getTextSize: (baseSize: string) => baseSize, // Return as-is
    getIconSize: (baseSize: number) => baseSize,
    themeMode: 'default' as const,
    setThemeMode: () => {},
    getBackgroundClass: (baseClass: string) => baseClass,
    getCardClass: (baseClass: string = '') => baseClass,
  };
};

