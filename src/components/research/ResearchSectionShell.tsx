'use client';

import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { useTheme } from '@/context/ThemeContext';
import ResearchChrome, { type ResearchChromeProps } from './ResearchChrome';

export default function ResearchSectionShell({
  chrome,
  children,
}: {
  chrome: ResearchChromeProps;
  children: React.ReactNode;
}) {
  const { isDarkMode } = useTheme();

  return (
    <>
      <ZetaNavbar />
      <div
        className={`min-h-screen pt-14 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <ResearchChrome {...chrome} />
        {children}
      </div>
    </>
  );
}
