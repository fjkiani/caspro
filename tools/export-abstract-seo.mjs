/**
 * Export conference abstract SEO metadata to src/data/research-abstracts-seo.json
 * node tools/export-abstract-seo.mjs
 */
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GraphQLClient } from 'graphql-request';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || process.env.HYGRAPH_ENDPOINT;
const TOKEN = process.env.GRAPHCMS_TOKEN || process.env.HYGRAPH_TOKEN;
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://crispro.ai').replace(/\/$/, '');

if (!ENDPOINT || !TOKEN) {
  console.error('Missing Hygraph env');
  process.exit(1);
}

const client = new GraphQLClient(ENDPOINT, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});

const QUERY = `{ posts(where:{categories_some:{slug:"conference-abstracts"}}, first:50) {
  id slug title excerpt publishedAt featuredImage { url } content { text }
} }`;

function parseAuthors(line) {
  if (!line) return ['F Kiani'];
  return line.split(',').map((s) => s.trim()).filter(Boolean);
}

function parseId(title) {
  const m = title.match(/Abstract\s+([A-Z]{1,3}-?[A-Z]?\d+)/i);
  return m ? m[1].toUpperCase() : null;
}

const { posts } = await client.request(QUERY);
const items = (posts || []).map((p) => {
  const excerpt = p.excerpt || '';
  const parts = excerpt.split('·').map((s) => s.trim());
  const authorLine = parts[0] || null;
  const venue = parts.length > 1 ? parts.slice(1).join(' · ') : null;
  const yearMatch = venue?.match(/\b(20\d{2})\b/);
  const slug = p.slug.replace(/-+$/, '');
  const abstractId = parseId(p.title);
  const canonicalUrl = `${SITE}/research/abstracts/${encodeURIComponent(slug)}/`;
  const description = p.content?.text?.trim() || excerpt || p.title;

  return {
    id: p.id,
    slug,
    title: p.title,
    description: description.slice(0, 320),
    authors: parseAuthors(authorLine),
    venue,
    year: yearMatch ? Number(yearMatch[1]) : null,
    publishedAt: p.publishedAt,
    abstractId,
    canonicalUrl,
    imageUrl: p.featuredImage?.url || 'https://www.aacr.org/wp-content/uploads/2019/01/AACR-Logo-4C.png',
    keywords: [
      'CrisPRO',
      'conference abstract',
      'AACR',
      abstractId,
      authorLine,
      yearMatch?.[1],
    ].filter(Boolean),
  };
});

const out = {
  exportedAt: new Date().toISOString(),
  siteUrl: SITE,
  count: items.length,
  items,
};

const outPath = path.join(__dirname, '../src/data/research-abstracts-seo.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${items.length} entries → ${outPath}`);
