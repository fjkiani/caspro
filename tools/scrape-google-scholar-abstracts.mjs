#!/usr/bin/env node
/**
 * Scrape conference-style publications from a Google Scholar profile.
 * Usage: node tools/scrape-google-scholar-abstracts.mjs [userId]
 * Output: src/data/research-abstracts-seed.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USER_ID = process.argv[2] || 'HrO6JwkAAAAJ';
const SCHOLAR_URL = `https://scholar.google.com/citations?user=${USER_ID}&hl=en&cstart=0&pagesize=100`;

const KNOWN_LINKS = {
  'abstract lb340': 'https://aacrjournals.org/cancerres/article/86/8_Supplement/LB340/782958',
  'intercepting metastasis': 'https://aacrjournals.org/cancerres/article/86/7_Supplement/2235/776855',
  'abstract b065': 'https://aacrjournals.org/cancerres/article/86/6_Supplement/B065/775413',
  'abstract lb-b013': 'https://aacrjournals.org/cancerimmunolres/article/14/2_Supplement/LB-B013/775104',
  'abstract b025': 'https://aacrjournals.org/cancerimmunolres/article/13/9_Supplement/B025/765414/Abstract-B025-An-agentic-platform-for-designing',
};

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function decodeHtml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function parseScholarHtml(html) {
  const rows = [];
  const trRe = /<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g;
  let m;
  while ((m = trRe.exec(html))) {
    const block = m[1];
    const titleM = block.match(/class="gsc_a_at"[^>]*>([^<]+)</);
    if (!titleM) continue;

    const title = decodeHtml(titleM[1].trim());
    const hrefM = block.match(/class="gsc_a_at" href="([^"]*)"/);
    let link = hrefM?.[1]?.trim() || null;
    if (link && !link.startsWith('http')) {
      link = `https://scholar.google.com${link}`;
    }

    const grays = [...block.matchAll(/class="gs_gray"[^>]*>([\s\S]*?)<\/div>/g)].map((g) =>
      decodeHtml(g[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()),
    );
    const authorLine = grays[0] || '';
    const venue = grays[1] || '';
    const yearM = block.match(/class="gsc_a_y"[^>]*>[\s\S]*?(\d{4})/) || venue.match(/(\d{4})/);
    const year = yearM ? Number(yearM[1]) : null;

    const key = title.toLowerCase();
    for (const [k, url] of Object.entries(KNOWN_LINKS)) {
      if (key.includes(k)) link = url;
    }

    const bodyText = [authorLine, venue].filter(Boolean).join(' · ');
    rows.push({
      title,
      slug: slugify(title),
      authorLine,
      venue,
      year,
      link,
      bodyText,
      bodyHtml: `<p>${[authorLine, venue].filter(Boolean).join('<br/>')}</p>`,
      imageUrl: '/images/partners/events/aacr.png',
      order: rows.length + 1,
      publishedAt: year ? `${year}-04-01T00:00:00.000Z` : new Date().toISOString(),
    });
  }
  return rows;
}

async function main() {
  console.log(`Fetching ${SCHOLAR_URL} ...`);
  const res = await fetch(SCHOLAR_URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html',
    },
  });
  if (!res.ok) throw new Error(`Scholar HTTP ${res.status}`);
  const html = await res.text();
  const items = parseScholarHtml(html);
  if (!items.length) {
    console.error('No publications parsed — Scholar HTML layout may have changed.');
    process.exit(1);
  }

  const outJson = path.join(__dirname, '../src/data/research-abstracts-seed.json');
  fs.writeFileSync(outJson, JSON.stringify({ scrapedAt: new Date().toISOString(), userId: USER_ID, items }, null, 2));
  console.log(`Wrote ${items.length} items → ${outJson}`);
  items.forEach((i, idx) => console.log(`  ${idx + 1}. ${i.title.slice(0, 72)}…`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
