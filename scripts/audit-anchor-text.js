#!/usr/bin/env node
/**
 * audit:anchor-text — enumerate anchors and flag:
 *  - Generic anchor text (click here, learn more, read more)
 *  - External <a> without rel="noopener"
 *  - Empty anchor text
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

const generic = /(click here|read more|learn more|here|more info)/i;

const generics = [];
const emptyAnchors = [];
const externNoRel = [];

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const anchors = [...html.matchAll(/<a\s+([^>]*)>([\s\S]*?)<\/a>/gi)];
  for (const a of anchors) {
    const attrs = a[1];
    const text = a[2].replace(/<[^>]+>/g, '').trim();
    const hrefM = attrs.match(/href=["']([^"']+)["']/i);
    if (!hrefM) continue;
    const href = hrefM[1];
    if (!text) emptyAnchors.push({ file: f, href });
    if (generic.test(text)) generics.push({ file: f, text, href });
    if (/^https?:\/\//.test(href) && !/rel=["'][^"']*noopener/i.test(attrs)) externNoRel.push({ file: f, href });
  }
}

console.log(`\n=== audit:anchor-text report ===`);
console.log(`Files scanned: ${files.length}`);
console.log(`Generic anchor text: ${generics.length}`);
for (const r of generics.slice(0, 15)) console.log(`  "${r.text}" → ${r.href}\n      ${path.relative(process.cwd(), r.file)}`);
console.log(`\nEmpty anchors: ${emptyAnchors.length}`);
for (const r of emptyAnchors.slice(0, 15)) console.log(`  ${r.href}\n      ${path.relative(process.cwd(), r.file)}`);
console.log(`\nExternal links missing rel=noopener: ${externNoRel.length}`);
process.exit(0);
