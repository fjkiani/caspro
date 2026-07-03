#!/usr/bin/env node
/**
 * audit:titles — walks all page.tsx and layout.tsx files, asserts metadata
 * present (either in the page itself or a sibling/parent layout), asserts
 * title uniqueness.
 *
 * A page.tsx is considered to have metadata if:
 *   - The page.tsx itself has export const metadata or generateMetadata, OR
 *   - A sibling layout.tsx in the same directory has metadata, OR
 *   - A parent layout.tsx has metadata (inherited)
 */
const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(process.cwd(), 'src', 'app');
const errors = [];
const titles = new Map();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name === 'page.tsx' || entry.name === 'layout.tsx') {
      checkFile(fullPath);
    }
  }
}

function hasMetadataInLayout(dir) {
  // Check sibling layout.tsx
  const layoutPath = path.join(dir, 'layout.tsx');
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf-8');
    if (/export\s+const\s+metadata\s*[:=]/.test(content) ||
        /export\s+async\s+function\s+generateMetadata/.test(content)) {
      return true;
    }
  }
  // Check parent directories
  let parent = path.dirname(dir);
  while (parent.startsWith(APP_DIR)) {
    const parentLayout = path.join(parent, 'layout.tsx');
    if (fs.existsSync(parentLayout)) {
      const content = fs.readFileSync(parentLayout, 'utf-8');
      if (/export\s+const\s+metadata\s*[:=]/.test(content) ||
          /export\s+async\s+function\s+generateMetadata/.test(content)) {
        return true;
      }
    }
    parent = path.dirname(parent);
  }
  return false;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rel = path.relative(APP_DIR, filePath);
  const dir = path.dirname(filePath);

  const hasMetadata = /export\s+const\s+metadata\s*[:=]/.test(content) ||
                      /export\s+async\s+function\s+generateMetadata/.test(content);

  // Check if this is a client component
  const isClient = content.trimStart().startsWith("'use client'") || content.trimStart().startsWith('"use client"');

  // For page.tsx files, also check if a layout has metadata
  if (!hasMetadata && filePath.endsWith('page.tsx')) {
    if (hasMetadataInLayout(dir)) {
      // Metadata is inherited from a layout — this is fine
      return;
    }
  }

  // For client component layout.tsx files, skip metadata check (they inherit from parent)
  if (!hasMetadata && filePath.endsWith('layout.tsx') && isClient) {
    if (hasMetadataInLayout(path.dirname(dir))) {
      // Parent layout has metadata — this is fine
      return;
    }
  }

  if (!hasMetadata) {
    errors.push(`MISSING METADATA: ${rel}`);
  }

  // Extract title (only for files that have metadata)
  if (hasMetadata) {
    const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/);
    if (titleMatch) {
      const title = titleMatch[1];
      if (titles.has(title)) {
        // Don't flag page.tsx vs layout.tsx in the same directory as duplicate
        const existing = titles.get(title);
        const existingDir = path.dirname(path.join(APP_DIR, existing));
        if (existingDir === dir) {
          // Same directory — layout + page, this is inheritance not duplication
          return;
        }
        errors.push(`DUPLICATE TITLE "${title}": ${rel} vs ${existing}`);
      } else {
        titles.set(title, rel);
      }
    }
  }
}

walk(APP_DIR);

if (errors.length > 0) {
  console.error('TITLE AUDIT FAILED:');
  errors.forEach(e => console.error(`  ${e}`));
  process.exit(1);
} else {
  console.log(`TITLE AUDIT PASSED: ${titles.size} unique titles, all pages have metadata (direct or inherited)`);
}
