#!/usr/bin/env node
// ============================================================================
// scripts/demos/freeze-manifest.mjs
//
// Compute SHA-256 + byte size for every JSON under src/data/demos/ and write
// to src/data/demos/manifest.frozen.json. Ships in the repo as the immutable
// contract that the specs have not drifted.
//
// SHAPE (canonical, matched by scripts/demos/check-verbatim.mjs and
// scripts/demos/check_verbatim.py):
//
//   {
//     "frozen_at": "YYYY-MM-DD",
//     "files": {
//       "src/data/demos/<name>.json": { "sha256": "…", "bytes": N },
//       …
//     }
//   }
//
// USAGE:
//   node scripts/demos/freeze-manifest.mjs           # write / overwrite
//   node scripts/demos/freeze-manifest.mjs --verify  # exit 1 on drift
// ============================================================================

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const DEMOS_DIR = join(REPO, 'src', 'data', 'demos');
const MANIFEST_PATH = join(DEMOS_DIR, 'manifest.frozen.json');

const MODE = process.argv.includes('--verify') ? 'verify' : 'freeze';

const specFiles = readdirSync(DEMOS_DIR)
  .filter((f) => f.endsWith('.json') && f !== 'manifest.frozen.json')
  .sort();

const entries = {};
for (const f of specFiles) {
  const buf = readFileSync(join(DEMOS_DIR, f));
  const rel = `src/data/demos/${f}`;
  entries[rel] = {
    sha256: createHash('sha256').update(buf).digest('hex'),
    bytes: buf.length,
  };
}

const payload = {
  frozen_at: new Date().toISOString().slice(0, 10),
  files: entries,
};

if (MODE === 'freeze') {
  writeFileSync(MANIFEST_PATH, JSON.stringify(payload, null, 2) + '\n');
  console.log('Frozen', Object.keys(entries).length, 'spec files to', MANIFEST_PATH);
  for (const [rel, e] of Object.entries(entries)) {
    console.log('  ', rel, e.sha256, `(${e.bytes}B)`);
  }
  process.exit(0);
}

// verify mode
let frozen;
try {
  frozen = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
} catch {
  console.error('ERROR: manifest.frozen.json missing or invalid. Run without --verify first.');
  process.exit(1);
}

let drift = false;
for (const [rel, e] of Object.entries(entries)) {
  const want = frozen.files?.[rel]?.sha256;
  if (!want) {
    console.error('DRIFT: new spec file not in frozen manifest:', rel);
    drift = true;
  } else if (want !== e.sha256) {
    console.error('DRIFT:', rel);
    console.error('  frozen:', want);
    console.error('  actual:', e.sha256);
    drift = true;
  }
}
for (const rel of Object.keys(frozen.files ?? {})) {
  if (!(rel in entries)) {
    console.error('DRIFT: spec file was removed:', rel);
    drift = true;
  }
}
if (drift) process.exit(1);
console.log('OK', Object.keys(entries).length, 'spec files match frozen manifest.');
