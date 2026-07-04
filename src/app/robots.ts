import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/co-pilot-app',
          '/visualization-demo',
          '/learn/universal-demo',
          '/poster',
          '/insilico',
          '/private/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://crispro.ai/sitemap.xml',
    host: 'https://crispro.ai',
  };
}
