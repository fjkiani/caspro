'use client';

import { Suspense, useMemo } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useTheme } from '@/context/ThemeContext';
import { getNavTheme } from './nav-theme';
import { buildTopNavItems } from './nav-items';
import { useZetaNavFeed } from './useZetaNavFeed';
import { useZetaNavbar } from './useZetaNavbar';
import { PasscodeModal } from '@/components/ui/PasscodeModal';
import { ZetaBrand } from './ZetaBrand';
import { ZetaDesktopNav } from './ZetaDesktopNav';
import { ZetaMobileDrawer } from './ZetaMobileDrawer';
import { ZetaToolbar } from './ZetaToolbar';
import { useGatedNavClick } from './useGatedNavClick';

export function ZetaNavbar({ isProcessing = false }: { isProcessing?: boolean }) {
  const { isLargeText, toggleLargeText } = useAccessibility();
  const { isDarkMode } = useTheme();
  const theme = getNavTheme(isDarkMode);
  const nav = useZetaNavbar();
  const feed = useZetaNavFeed();
  const topNavItems = useMemo(() => buildTopNavItems(feed.abstracts), [feed.abstracts]);
  const { gateTarget, handleDropdownClick, closeGate } = useGatedNavClick(nav.navigate);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] w-full pointer-events-auto backdrop-blur-md border-b ${theme.navSurface}`}>
      <div className="flex items-center justify-between h-14 px-4 sm:px-6 max-w-[1920px] mx-auto w-full gap-2">
        <ZetaBrand isDarkMode={isDarkMode} brandBorder={theme.brandBorder} />
        <Suspense fallback={<div className="hidden lg:flex flex-1 min-w-0 justify-end" aria-hidden />}>
          <ZetaDesktopNav
            navItems={topNavItems}
            pathname={nav.pathname}
            isDarkMode={isDarkMode}
            navMuted={theme.navMuted}
            navHover={theme.navHover}
            navigate={nav.navigate}
            onDropdownClick={handleDropdownClick}
            openDropdownId={nav.openDropdownId}
            openDropdown={nav.openDropdown}
            scheduleCloseDropdown={nav.scheduleCloseDropdown}
            cancelCloseDropdown={nav.cancelCloseDropdown}
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
        navItems={topNavItems}
        open={nav.mobileMenuOpen}
        onClose={() => nav.setMobileMenuOpen(false)}
        pathname={nav.pathname}
        isDarkMode={isDarkMode}
        navMuted={theme.navMuted}
        navigate={nav.navigate}
        onDropdownClick={handleDropdownClick}
      />

      {gateTarget && (
        <PasscodeModal
          open
          onClose={closeGate}
          proofUrl={gateTarget.href}
          targetLabel={gateTarget.label}
        />
      )}
    </nav>
  );
}
