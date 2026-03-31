import React, { useEffect } from 'react';
import NextLink from 'next/link';
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from 'next/navigation';

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: string;
  href?: string;
  replace?: boolean;
};

export function Link({ to, href, children, ...rest }: LinkProps) {
  const resolvedHref = href ?? to ?? '#';
  return (
    <NextLink href={resolvedHref} {...rest}>
      {children}
    </NextLink>
  );
}

export const SafeLink = Link;

export function useNavigate() {
  const router = useNextRouter();
  return (to: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      router.replace(to);
      return;
    }
    router.push(to);
  };
}

export function useRouterCompat() {
  const router = useNextRouter();
  return {
    push: router.push,
    replace: router.replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
    prefetch: router.prefetch,
  };
}

export const useRouter = useRouterCompat;

export function useLocation() {
  const pathname = useNextPathname() ?? '/';
  if (typeof window === 'undefined') {
    return { pathname, search: '', hash: '', state: null, key: 'server' };
  }
  return {
    pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: null,
    key: 'client',
  };
}

export function usePathnameCompat() {
  return useNextPathname() ?? '/';
}

export const usePathname = usePathnameCompat;

export function useParams<T extends Record<string, string | string[]>>() {
  return {} as T;
}

export function BrowserRouter({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Routes({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Route({ element }: { element: React.ReactNode }) {
  return <>{element}</>;
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (replace) {
      router.replace(to);
      return;
    }
    router.push(to);
  }, [replace, router, to]);
  return null;
}
