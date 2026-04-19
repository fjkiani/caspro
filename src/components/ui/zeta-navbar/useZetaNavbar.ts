'use client';

import { useState, useRef, useEffect, useCallback, type MouseEvent as ReactMouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getProductEngines } from './product-engines';

export function useZetaNavbar() {
  const pathname = usePathname();
  const [receiptsOpen, setReceiptsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [manuscriptsOpen, setManuscriptsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const receiptsRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const manuscriptsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const productEngines = getProductEngines();

  const closeAllDropdowns = useCallback(() => {
    setReceiptsOpen(false);
    setProductOpen(false);
    setBlogOpen(false);
    setManuscriptsOpen(false);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!receiptsRef.current?.contains(t)) setReceiptsOpen(false);
      if (!productRef.current?.contains(t)) setProductOpen(false);
      if (!blogRef.current?.contains(t)) setBlogOpen(false);
      if (!manuscriptsRef.current?.contains(t)) setManuscriptsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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

  return {
    pathname,
    productEngines,
    receiptsOpen,
    setReceiptsOpen,
    productOpen,
    setProductOpen,
    blogOpen,
    setBlogOpen,
    manuscriptsOpen,
    setManuscriptsOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    receiptsRef,
    productRef,
    blogRef,
    manuscriptsRef,
    navigate,
    toggleMobileMenu,
    handleCtaClick,
  };
}
