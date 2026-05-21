'use client';

import { useState, useRef, useEffect, useCallback, type MouseEvent as ReactMouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getProductEngines } from './product-engines';
import { TOP_NAV_ITEMS } from './nav-items';

export function useZetaNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Single open-dropdown tracker — id matches NavTopItem.id or 'blog' | 'manuscripts'
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // One ref per possible dropdown panel (blog, manuscripts + dynamic items)
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const productEngines = getProductEngines();

  const closeAllDropdowns = useCallback(() => setOpenDropdownId(null), []);

  const toggleDropdown = useCallback((id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  }, []);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelCloseDropdown = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleCloseDropdown = useCallback(() => {
    cancelCloseDropdown();
    closeTimerRef.current = setTimeout(() => setOpenDropdownId(null), 180);
  }, [cancelCloseDropdown]);

  const openDropdown = useCallback(
    (id: string) => {
      cancelCloseDropdown();
      setOpenDropdownId(id);
    },
    [cancelCloseDropdown],
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      const anyContains = Object.values(dropdownRefs.current).some((el) => el?.contains(t));
      if (!anyContains) setOpenDropdownId(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const navigate = useCallback(
    (href: string) => {
      closeAllDropdowns();
      setMobileMenuOpen(false);
      router.push(href);
    },
    [router, closeAllDropdowns]
  );

  const toggleMobileMenu = useCallback((e?: ReactMouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setMobileMenuOpen((open) => !open);
  }, []);

  const handleCtaClick = useCallback(() => {
    router.push('/contact/');
  }, [router]);

  const setDropdownRef = useCallback((id: string, el: HTMLDivElement | null) => {
    dropdownRefs.current[id] = el;
  }, []);

  return {
    pathname,
    productEngines,
    topNavItems: TOP_NAV_ITEMS,
    openDropdownId,
    toggleDropdown,
    openDropdown,
    scheduleCloseDropdown,
    cancelCloseDropdown,
    closeAllDropdowns,
    mobileMenuOpen,
    setMobileMenuOpen,
    dropdownRefs,
    setDropdownRef,
    navigate,
    toggleMobileMenu,
    handleCtaClick,
    // Legacy aliases kept so ZetaNavbar.tsx compiles without changes
    blogOpen: openDropdownId === 'blog',
    setBlogOpen: (v: boolean) => setOpenDropdownId(v ? 'blog' : null),
    manuscriptsOpen: openDropdownId === 'manuscripts',
    setManuscriptsOpen: (v: boolean) => setOpenDropdownId(v ? 'manuscripts' : null),
    // Legacy refs — still used by ZetaNavbar prop drilling; point to dropdownRefs entries
    blogRef: { current: null } as React.RefObject<HTMLDivElement>,
    manuscriptsRef: { current: null } as React.RefObject<HTMLDivElement>,
    // Removed: receiptsOpen, receiptsRef, productOpen, productRef
  };
}
