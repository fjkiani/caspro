#!/usr/bin/env node
/**
 * audit:meta — check description length + uniqueness.
 * Traverses .next/server/app for prerendered HTML and extracts <meta name="description">.
 */
const fs = require('fs');
const path = require('path');
const glob = (dir, pattern) => {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    if (!fs.existsSync(cur)) continue;
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (pattern.test(entry.name)) out.push(full);
    }
  }
  return out;
};

const APP = path.join(process.cwd(), '.next', 'server', 'app');
const files = glob(APP, /\.html$/);

const byDesc = new Map();
const perFile = [];
const tooShort = [];
const tooLong = [];

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const m = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const desc = m ? m[1] : '';
  perFile.push({ file: path.relative(process.cwd(), f), desc });
  if (!desc) continue;
  if (desc.length < 70) tooShort.push({ file: f, desc });
  if (desc.length > 160) tooLong.push({ file: f, desc });
  byDesc.set(desc, (byDesc.get(desc) || []).concat(f));
}

const dupes = [...byDesc.entries()].filter(([, arr]) => arr.length > 1);

console.log(`\n=== audit:meta report ===`);
console.log(`HTML files scanned: ${files.length}`);
console.log(`Missing descriptions: ${perFile.filter((p) => !p.desc).length}`);
console.log(`Too short (<70): ${tooShort.length}`);
console.log(`Too long (>160): ${tooLong.length}`);
console.log(`Duplicate descriptions: ${dupes.length}`);
if (dupes.length) {
  console.log(`\n--- duplicates ---`);
  for (const [d, arr] of dupes.slice(0, 25)) {
    console.log(`  "${d.slice(0, 80)}${d.length > 80 ? '…' : ''}" — used by ${arr.length} pages`);
    for (const a of arr.slice(0, 5)) console.log(`      ${path.relative(process.cwd(), a)}`);
  }
}
process.exit(dupes.length ? 1 : 0);
