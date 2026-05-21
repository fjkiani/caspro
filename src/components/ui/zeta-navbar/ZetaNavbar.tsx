'use client';

import { Suspense } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useTheme } from '@/context/ThemeContext';
import { getNavTheme } from './nav-theme';
import { useZetaNavFeed } from './useZetaNavFeed';
import { useZetaNavbar } from './useZetaNavbar';
import { ZetaBrand } from './ZetaBrand';
import { ZetaDesktopNav } from './ZetaDesktopNav';
import { ZetaMobileDrawer } from './ZetaMobileDrawer';
import { ZetaToolbar } from './ZetaToolbar';

export function ZetaNavbar({ isProcessing = false }: { isProcessing?: boolean }) {
  const { isLargeText, toggleLargeText } = useAccessibility();
  const { isDarkMode } = useTheme();
  const theme = getNavTheme(isDarkMode);
  const nav = useZetaNavbar();
  const feed = useZetaNavFeed();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] w-full pointer-events-auto backdrop-blur-md border-b ${theme.navSurface}`}>
      <div className="flex items-center justify-between h-14 px-4 sm:px-6 max-w-[1920px] mx-auto w-full gap-2">
        <ZetaBrand isDarkMode={isDarkMode} brandBorder={theme.brandBorder} />
        <Suspense fallback={<div className="hidden lg:flex flex-1 min-w-0 justify-end" aria-hidden />}>
          <ZetaDesktopNav
            pathname={nav.pathname}
            isDarkMode={isDarkMode}
            navMuted={theme.navMuted}
            navHover={theme.navHover}
            productEngines={nav.productEngines}
            blogOpen={nav.blogOpen}
            setBlogOpen={nav.setBlogOpen}
            manuscriptsOpen={nav.manuscriptsOpen}
            setManuscriptsOpen={nav.setManuscriptsOpen}
            navigate={nav.navigate}
            blogRef={nav.blogRef}
            manuscriptsRef={nav.manuscriptsRef}
            manuscripts={feed.manuscripts}
            blogPosts={feed.blogPosts}
            blogCategories={feed.blogCategories}
            openDropdownId={nav.openDropdownId}
            toggleDropdown={nav.toggleDropdown}
            setDropdownRef={nav.setDropdownRef}
          />
        </Suspense>
        <ZetaToolbar
          isDarkMode={isDarkMode}
          mobileMenuOpen={nav.mobileMenuOpen}
          toggleMobileMenu={nav.toggleMobileMenu}
          isLargeText={isLargeText}
          toggleLargeText={toggleLargeText}
          isProcessing={isProcessing}
          onCtaClick={nav.handleCtaClick}
        />
      </div>

      <ZetaMobileDrawer
        open={nav.mobileMenuOpen}
        onClose={() => nav.setMobileMenuOpen(false)}
        pathname={nav.pathname}
        isDarkMode={isDarkMode}
        navMuted={theme.navMuted}
        productEngines={nav.productEngines}
        navigate={nav.navigate}
        manuscripts={feed.manuscripts}
        blogPosts={feed.blogPosts}
        blogCategories={feed.blogCategories}
      />
    </nav>
  );
}
