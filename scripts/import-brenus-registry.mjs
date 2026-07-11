#!/usr/bin/env node
/**
 * import-brenus-registry.mjs — sync the Brenus registry into caspro/src/data/brenus/.
 *
 * Usage:  node scripts/import-brenus-registry.mjs [--brenus-root=/workspace/Brenus]
 *
 * Behaviour:
 *   1. Reads /workspace/Brenus/engagements/brenus/trial_intelligence/trial_decode_registry_v2.json
 *      (or --brenus-root override)
 *   2. Validates required top-level keys (metadata.total_trials, trials[] length match)
 *   3. Writes to src/data/brenus/trial_decode_registry_v2.json
 *   4. Emits summary counts (decoded / not_decoded / numeric_delta / quarantined)
 *
 * DOES NOT regenerate the TS mirror — trial-decode-registry.ts is hand-written
 * against a stable schema. If Brenus adds fields, update the .ts by hand.
 *
 * SOURCE: Fahad Kiani directive 2026-07-10.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^-+/, ''), true];
  }),
);

const BRENUS_ROOT = argv['brenus-root'] || '/workspace/Brenus';
const SRC = path.join(
  BRENUS_ROOT,
  'engagements/brenus/trial_intelligence/trial_decode_registry_v2.json',
);
const DST_DIR = path.resolve(process.cwd(), 'src/data/brenus');
const DST = path.join(DST_DIR, 'trial_decode_registry_v2.json');

if (!fs.existsSync(SRC)) {
  console.error(`[brenus-import] source missing: ${SRC}`);
  console.error(`[brenus-import] pass --brenus-root=<absolute path> if Brenus is checked out elsewhere.`);
  process.exit(2);
}

const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));

if (!raw?.metadata?.total_trials || !Array.isArray(raw.trials)) {
  console.error(`[brenus-import] schema check failed — expected metadata.total_trials + trials[]`);
  process.exit(3);
}
if (raw.trials.length !== raw.metadata.total_trials) {
  console.error(
    `[brenus-import] trials[] length (${raw.trials.length}) mismatches metadata.total_trials (${raw.metadata.total_trials})`,
  );
  process.exit(4);
}

fs.mkdirSync(DST_DIR, { recursive: true });
fs.writeFileSync(DST, JSON.stringify(raw, null, 2) + '\n');

const decoded = raw.trials.filter(
  (t) => typeof t['8d_primary_domain'] === 'string' && t['8d_primary_domain'] !== 'unknown',
).length;
const numericDelta = raw.trials.filter((t) => typeof t.delta_approx === 'number').length;
const quarantined = raw.trials.filter((t) => t.delta_status === 'QUARANTINED').length;

console.log(`[brenus-import] wrote ${DST}`);
console.log(`[brenus-import] total=${raw.metadata.total_trials} decoded=${decoded} not_decoded=${raw.trials.length - decoded} numeric_delta=${numericDelta} quarantined=${quarantined}`);
console.log(`[brenus-import] REMEMBER: update src/data/brenus/trial-decode-registry.ts if the schema changed.`);
