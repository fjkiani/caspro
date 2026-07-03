#!/usr/bin/env node
/**
 * audit:meta — asserts no empty/boilerplate descriptions.
 */
const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(process.cwd(), 'src', 'app');
const errors = [];
const BOILERPLATE = ['lorem ipsum', 'todo', 'placeholder', 'tbd', 'coming soon'];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name === 'page.tsx' || entry.name === 'layout.tsx') {
      checkMeta(fullPath);
    }
  }
}

function checkMeta(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rel = path.relative(APP_DIR, filePath);

  const descMatch = content.match(/description:\s*["'`]([^"'`]+)["'`]/);
  if (descMatch) {
    const desc = descMatch[1].toLowerCase();
    if (desc.length < 50) {
      errors.push(`SHORT DESCRIPTION (${desc.length} chars): ${rel}`);
    }
    for (const bp of BOILERPLATE) {
      if (desc.includes(bp)) {
        errors.push(`BOILERPLATE DESCRIPTION: ${rel} contains "${bp}"`);
      }
    }
  }
}

walk(APP_DIR);

if (errors.length > 0) {
  console.error('META AUDIT FAILED:');
  errors.forEach(e => console.error(`  ${e}`));
  process.exit(1);
} else {
  console.log('META AUDIT PASSED: all descriptions are substantive');
}
