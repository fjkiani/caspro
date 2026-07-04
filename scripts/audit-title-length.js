#!/usr/bin/env node
/**
 * audit-title-length.js
 *
 * Scans .next/server/app/**\/*.html and flags <title> tags whose text is:
 *   - shorter than MIN_LEN characters, OR
 *   - longer than MAX_LEN characters.
 *
 * Skips pages whose <meta name="robots"> excludes indexing — their title
 * never surfaces on a SERP so it's out of scope for this audit.
 *
 * Rationale: search snippets truncate at ~60-70 chars; extremely short
 * titles under-describe pages. Both hurt organic CTR.
 *
 * Usage:  node scripts/audit-title-length.js
 * Exits:  0 = all indexable titles within bounds
 *         1 = one or more violations found
 */

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '..', '.next', 'server', 'app');
const MIN_LEN = 15;
const MAX_LEN = 70;

if (!fs.existsSync(APP_DIR)) {
  console.error(`FAIL: ${APP_DIR} does not exist. Run 'npm run build' first.`);
  process.exit(2);
}

/** Recursively walk a directory, yielding absolute .html file paths. */
function* walkHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkHtml(full);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      yield full;
    }
  }
}

/** Extract the plaintext of the first <title>...</title> in the HTML. */
function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return null;
  // Decode common HTML entities that Next.js emits inside <title>.
  return m[1]
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/** True if the HTML declares noindex via <meta name="robots">. */
function isNoIndex(html) {
  // Match: <meta name="robots" content="noindex, ...">
  const m = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
  if (!m) return false;
  return /\bnoindex\b/i.test(m[1]);
}

const violations = [];
let scanned = 0;
let skipped = 0;

for (const file of walkHtml(APP_DIR)) {
  scanned += 1;
  const html = fs.readFileSync(file, 'utf8');
  if (isNoIndex(html)) {
    skipped += 1;
    continue;
  }
  const title = extractTitle(html);
  const rel = path.relative(APP_DIR, file);
  if (!title) {
    violations.push({ file: rel, len: 0, title: '(no <title> tag)', kind: 'MISSING' });
    continue;
  }
  const len = title.length;
  if (len < MIN_LEN) {
    violations.push({ file: rel, len, title, kind: 'TOO_SHORT' });
  } else if (len > MAX_LEN) {
    violations.push({ file: rel, len, title, kind: 'TOO_LONG' });
  }
}

console.log(`\naudit-title-length: scanned ${scanned} HTML pages (skipped ${skipped} noindex)`);
console.log(`  bounds: ${MIN_LEN} <= length <= ${MAX_LEN} chars\n`);

if (violations.length === 0) {
  console.log('PASSED: every indexable title is within bounds.\n');
  process.exit(0);
}

console.log(`FAIL: ${violations.length} title length violation(s):\n`);
for (const v of violations) {
  console.log(`  [${v.kind}] ${v.file}`);
  console.log(`    len=${v.len}  title="${v.title}"`);
}
console.log('');
process.exit(1);
