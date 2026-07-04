import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const SITE = 'https://crispro.ai';

/** Route → change frequency map */
const FREQ_MAP: Array<[RegExp, 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never']> = [
  [/^\/$/, 'daily'],
  [/^\/blog(\/|$)/, 'weekly'],
  [/^\/research(\/|$)/, 'weekly'],
  [/^\/manuscripts(\/|$)/, 'weekly'],
  [/^\/case-studies(\/|$)/, 'monthly'],
  [/^\/comparison(\/|$)/, 'monthly'],
  [/^\/(products|platform|engine|solutions)(\/|$)/, 'monthly'],
  [/^\/(faq|contact|about|pricing|privacy|terms|security)/, 'yearly'],
];

function freqFor(route: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  for (const [re, f] of FREQ_MAP) if (re.test(route)) return f;
  return 'monthly';
}

function gitLastModified(filePath: string): Date | undefined {
  try {
    const iso = execSync(`git log -1 --format=%aI -- "${filePath}"`, { cwd: process.cwd() }).toString().trim();
    if (iso) return new Date(iso);
  } catch {}
  return undefined;
}

/** Enumerate all page.tsx files under src/app and return their public routes */
function enumerateRoutes(): Array<{ route: string; filePath: string }> {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const out: Array<{ route: string; filePath: string }> = [];
  function walk(dir: string, base: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.join(base, entry.name);
      if (entry.isDirectory()) {
        // Skip dynamic segments and private folders in the naive enum
        if (entry.name.startsWith('(') || entry.name.startsWith('_')) {
          walk(full, base); // treat groups transparently
        } else if (entry.name.startsWith('[')) {
          // Dynamic route — cannot enumerate leaves without extra work; skip.
        } else {
          walk(full, rel);
        }
      } else if (entry.isFile() && entry.name === 'page.tsx') {
        const route = '/' + base.replace(/\\/g, '/');
        out.push({ route: route === '/' ? '/' : route.replace(/\/+$/, ''), filePath: full });
      }
    }
  }
  walk(appDir, '');
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = enumerateRoutes();
  const now = new Date();
  return routes.map(({ route, filePath }) => ({
    url: SITE + route,
    lastModified: gitLastModified(filePath) ?? now,
    changeFrequency: freqFor(route),
    priority: route === '/' ? 1.0 : route.split('/').filter(Boolean).length === 1 ? 0.8 : 0.6,
  }));
}
