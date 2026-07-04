import Script from 'next/script';

export interface Crumb {
  name: string;
  url: string;
}

export function BreadcrumbListJsonLd({ crumbs, id = 'breadcrumb-jsonld' }: { crumbs: Crumb[]; id?: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Derive crumbs from a URL path like /research/blog/gbm */
export function crumbsFromPath(path: string, siteRoot = 'https://crispro.ai'): Crumb[] {
  const parts = path.split('/').filter(Boolean);
  const crumbs: Crumb[] = [{ name: 'Home', url: siteRoot + '/' }];
  let accum = '';
  for (const p of parts) {
    accum += '/' + p;
    crumbs.push({ name: p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), url: siteRoot + accum });
  }
  return crumbs;
}
