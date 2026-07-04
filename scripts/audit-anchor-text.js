#!/usr/bin/env node
/**
 * audit-anchor-text.js
 *
 * Scans .next/server/app/**\/*.html for generic anchor / button text that
 * carries no semantic signal ("Learn More", "Click here", ...). Reports
 * per-file counts and a total.
 *
 * Also scans src/ for the same phrases so authors can fix the source and
 * see the delta.
 *
 * Usage:  node scripts/audit-anchor-text.js
 * Exits:  0 = 0 rendered generic anchors AND 0 src generic anchors
 *         1 = any generic anchors found
 *
 * Env:    AUDIT_ANCHOR_MAX_RENDERED (default 0) - allowed rendered occurrences
 *         AUDIT_ANCHOR_MAX_SRC      (default 0) - allowed src occurrences
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const APP_DIR = path.join(ROOT, '.next', 'server', 'app');
const SRC_DIR = path.join(ROOT, 'src');

const MAX_RENDERED = parseInt(process.env.AUDIT_ANCHOR_MAX_RENDERED || '0', 10);
const MAX_SRC = parseInt(process.env.AUDIT_ANCHOR_MAX_SRC || '0', 10);

// Match the visible label of an anchor / button. Case-insensitive.
// We look at raw HTML, not tag-stripped text, so we accept the phrase
// followed optionally by whitespace, an arrow, or the closing tag.
const GENERIC_PATTERNS = [
  /\bLearn\s+More\b/i,
  /\bLearn\s+more\b/,
  /\bRead\s+More\b/i,
  /\bRead\s+more\b/,
  /\bSee\s+More\b/i,
  /\bClick\s+here\b/i,
  /\bFind\s+out\s+more\b/i,
];

// Only look at these src file types when scanning source.
const SRC_EXTS = new Set(['.tsx', '.ts', '.jsx', '.js']);

function* walk(dir, filter) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and next build cache
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      yield* walk(full, filter);
    } else if (entry.isFile() && filter(full, entry.name)) {
      yield full;
    }
  }
}

function countMatches(text, regex) {
  const globalRe = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
  return (text.match(globalRe) || []).length;
}

function scanTree(root, filter, label) {
  const perFile = [];
  let total = 0;
  for (const file of walk(root, filter)) {
    const text = fs.readFileSync(file, 'utf8');
    let fileCount = 0;
    for (const pat of GENERIC_PATTERNS) {
      fileCount += countMatches(text, pat);
    }
    if (fileCount > 0) {
      perFile.push({ file: path.relative(root, file), count: fileCount });
      total += fileCount;
    }
  }
  perFile.sort((a, b) => b.count - a.count);
  console.log(`\n${label}: ${perFile.length} file(s), ${total} occurrence(s)`);
  for (const rec of perFile) {
    console.log(`  ${rec.count.toString().padStart(3)}  ${rec.file}`);
  }
  return total;
}

if (!fs.existsSync(APP_DIR)) {
  console.error(`FAIL: ${APP_DIR} does not exist. Run 'npm run build' first.`);
  process.exit(2);
}

console.log('audit-anchor-text: scanning generic anchor phrases');
console.log(`  patterns: ${GENERIC_PATTERNS.map((p) => p.source).join(', ')}`);

const renderedTotal = scanTree(APP_DIR, (_full, name) => name.endsWith('.html'), 'RENDERED (.next/server/app)');
const srcTotal = scanTree(SRC_DIR, (_full, name) => SRC_EXTS.has(path.extname(name)), 'SRC (src/)');

console.log(`\nTHRESHOLDS: rendered <= ${MAX_RENDERED}, src <= ${MAX_SRC}`);
console.log(`TOTALS:     rendered = ${renderedTotal}, src = ${srcTotal}`);

if (renderedTotal <= MAX_RENDERED && srcTotal <= MAX_SRC) {
  console.log('\nPASSED: generic anchor budget respected.\n');
  process.exit(0);
}

console.log('\nFAIL: generic anchor budget exceeded.\n');
process.exit(1);
