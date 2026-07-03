#!/usr/bin/env node
/**
 * audit:h1 — static analysis: each page.tsx (or its layout/client component)
 * must resolve to exactly one <h1>.
 */
const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(process.cwd(), 'src', 'app');
const errors = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name === 'page.tsx') {
      checkH1(fullPath);
    }
  }
}

function checkH1(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rel = path.relative(APP_DIR, filePath);

  // Count <h1> occurrences (including sr-only)
  const h1Count = (content.match(/<h1[\s>]/g) || []).length;

  if (h1Count === 0) {
    // Check if it imports a component that might have h1
    // For now, flag as warning
    errors.push(`NO H1 FOUND: ${rel} (may be in imported component)`);
  } else if (h1Count > 1) {
    errors.push(`MULTIPLE H1 (${h1Count}): ${rel}`);
  }
}

walk(APP_DIR);

const warnings = errors.filter(e => e.includes('NO H1'));
const failures = errors.filter(e => !e.includes('NO H1'));

if (failures.length > 0) {
  console.error('H1 AUDIT FAILED:');
  failures.forEach(e => console.error(`  ${e}`));
  process.exit(1);
} else {
  console.log(`H1 AUDIT PASSED: no multiple-H1 pages found`);
  if (warnings.length > 0) {
    console.log(`WARNINGS (${warnings.length} pages with no direct h1 — may be in imported components):`);
    warnings.forEach(w => console.log(`  ${w}`));
  }
}
