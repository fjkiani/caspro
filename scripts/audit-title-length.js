#!/usr/bin/env node
/**
 * audit:title-length — flag titles >70 chars or <15 chars.
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

const tooLong = [];
const tooShort = [];
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const t = m ? m[1] : '';
  if (!t) continue;
  if (t.length > 70) tooLong.push({ file: f, title: t, len: t.length });
  if (t.length < 15) tooShort.push({ file: f, title: t, len: t.length });
}

console.log(`\n=== audit:title-length report ===`);
console.log(`HTML files scanned: ${files.length}`);
console.log(`Titles >70 chars: ${tooLong.length}`);
for (const r of tooLong.slice(0, 25)) console.log(`  (${r.len}) ${path.relative(process.cwd(), r.file)}\n      → "${r.title}"`);
console.log(`\nTitles <15 chars: ${tooShort.length}`);
for (const r of tooShort.slice(0, 25)) console.log(`  (${r.len}) ${path.relative(process.cwd(), r.file)}\n      → "${r.title}"`);
process.exit(tooLong.length ? 1 : 0);
