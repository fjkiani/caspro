import React from 'react';
import { Type, Eye, Moon, Sun, Palette } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface AccessibilityToggleProps {
  positionClass?: string;
}

const AccessibilityToggle: React.FC<AccessibilityToggleProps> = ({ positionClass = "fixed top-4 right-4 z-50" }) => {
  const { largeTextMode, toggleLargeText, themeMode, setThemeMode } = useAccessibility();

  return (
    <div className={`${positionClass} flex flex-col gap-2`}>
      {/* Large Text Toggle */}
      <button
        onClick={toggleLargeText}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
          largeTextMode
            ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
            : 'bg-white/10 text-slate-300 border-slate-600 hover:bg-white/20 backdrop-blur-sm'
        }`}
        title={largeTextMode ? 'Disable Large Text' : 'Enable Large Text for Better Readability'}
        aria-label={largeTextMode ? 'Disable Large Text' : 'Enable Large Text'}
      >
        {largeTextMode ? (
          <Eye size={16} />
        ) : (
          <Type size={16} />
        )}
        <span className="text-sm font-medium">
          {largeTextMode ? 'Large Text: ON' : 'Large Text'}
        </span>
      </button>

      {/* Theme Cycle Toggle */}
      <button
        onClick={() => {
          const nextTheme = themeMode === 'default' ? 'black' : themeMode === 'black' ? 'white' : 'default';
          setThemeMode(nextTheme);
        }}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
          themeMode === 'black'
            ? 'bg-gray-900 text-white border-gray-700 shadow-lg'
            : themeMode === 'white'
            ? 'bg-white text-gray-900 border-gray-300 shadow-lg'
            : 'bg-white/10 text-slate-300 border-slate-600 hover:bg-white/20 backdrop-blur-sm'
        }`}
        title={`Current: ${themeMode.charAt(0).toUpperCase() + themeMode.slice(1)} Theme - Click to cycle`}
        aria-label={`Switch from ${themeMode} theme`}
      >
        {themeMode === 'black' ? (
          <Moon size={16} />
        ) : themeMode === 'white' ? (
          <Sun size={16} />
        ) : (
          <Palette size={16} />
        )}
        <span className="text-sm font-medium">
          {themeMode === 'black' ? 'Black Theme' : themeMode === 'white' ? 'White Theme' : 'Default Theme'}
        </span>
      </button>
    </div>
  );
};

export default AccessibilityToggle; 