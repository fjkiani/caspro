#!/usr/bin/env node
/**
 * scripts/demos/check-verbatim.mjs
 *
 * Discipline gate for the demo pages.
 *
 * Rule: every user-visible string in src/components/demos/ and
 * src/app/demo/ must be either
 *   (a) a value from UI_LABELS in src/components/demos/labels.ts,
 *   (b) sourced from the vendored JSON specs (bound via a spec field),
 *   (c) a Tailwind class name / aria attribute / dev-only value.
 *
 * This script scans JSX string literals AND JSX text nodes and rejects any
 * that don't fit those categories. It also confirms the vendored JSON
 * files still match manifest.frozen.json byte-for-byte.
 *
 * Usage:
 *   node scripts/demos/check-verbatim.mjs
 *   node scripts/demos/check-verbatim.mjs --json  (machine-readable)
 *
 * Exit code:
 *   0 — clean
 *   1 — one or more violations (drift, prose leak, or manifest mismatch)
 *
 * Companion: check_verbatim.py provides an identical local runner for
 * environments without node.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..', '..');

const JSON_TARGETS = [
  'src/data/demos/demo_index.json',
  'src/data/demos/demo_patient_spec.json',
  'src/data/demos/demo_pharma_spec.json',
  'src/data/demos/demo_tumor_board_spec.json',
];
const MANIFEST_PATH = 'src/data/demos/manifest.frozen.json';

const SCAN_DIRS = [
  'src/components/demos',
  'src/app/demo',
];

const SCAN_ALLOWLIST_COMPONENTS = new Set([
  'DemoWalker.tsx',
  'DemoStageRail.tsx',
  'DemoStageBody.tsx',
  'DemoRoadmapSection.tsx',
  'DemoChooserCard.tsx',
  'GovernanceStatusPill.tsx',
  'labels.ts',
]);

const LITERAL_PROP_VALUES = new Set([
  'validated', 'in_development', 'mechanistic_hypothesis',
  'VERIFIED', 'PEER-REVIEWED', 'MECHANISTIC HYPOTHESIS',
  'oncologist', 'patient', 'pharma', 'hospital',
  'stat_callout', 'mechanism_profile', 'ranking_overview',
  'subgroup_comparison', 'axis_contribution', 'trial_decode_summary',
  'strategic_recommendation', 'case_overview', 'data_readiness',
  'drug_ranking', 'resistance_forecast', 'synthetic_lethality',
  'evidence_vault', 'strategic_priorities', 'patient_profile_summary',
  'biomarker_intelligence', 'trial_matching', 'therapy_fit',
  'care_plan_summary',
]);

const NON_ATTR_LHS = new Set([
  'activeIndex', 'activeStageId', 'stageCount', 'idx', 'i', 'j', 'k',
  'count', 'index', 'value', 'val', 'const', 'let', 'var', 'if', 'while',
  'for', 'return', 'yield',
]);

const LABELS_PATH = 'src/components/demos/labels.ts';

// ── helpers ────────────────────────────────────────────────────────────────

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

function readManifest() {
  const p = join(ROOT, MANIFEST_PATH);
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, 'utf8'));
}

function checkManifest() {
  const manifest = readManifest();
  if (!manifest) return [{ file: MANIFEST_PATH, kind: 'missing', msg: 'manifest.frozen.json missing' }];
  const errs = [];
  for (const rel of JSON_TARGETS) {
    const full = join(ROOT, rel);
    if (!existsSync(full)) {
      errs.push({ file: rel, kind: 'missing', msg: 'vendored JSON missing' });
      continue;
    }
    const actual = sha256(readFileSync(full));
    const expected = manifest.files?.[rel]?.sha256;
    if (!expected) {
      errs.push({ file: rel, kind: 'unpinned', msg: 'no entry in manifest.frozen.json' });
    } else if (expected !== actual) {
      errs.push({
        file: rel,
        kind: 'hash_mismatch',
        msg: `SHA-256 changed (frozen=${expected} actual=${actual})`,
      });
    }
  }
  return errs;
}

// Load UI_LABELS values from labels.ts by parsing the source with a regex
// that captures the outer object literal.
function loadAllowedLabels() {
  const src = readFileSync(join(ROOT, LABELS_PATH), 'utf8');
  const bodyMatch = src.match(/export const UI_LABELS\s*=\s*\{([\s\S]*?)\}\s*as const/);
  if (!bodyMatch) throw new Error(`Could not parse UI_LABELS from ${LABELS_PATH}`);
  const body = bodyMatch[1];
  const values = new Set();
  // Each entry is `key: 'value',` or `key: "value",` (with optional trailing newlines).
  const entryRe = /:\s*(['"`])([\s\S]*?)\1\s*,/g;
  let m;
  while ((m = entryRe.exec(body)) !== null) {
    values.add(m[2]);
  }
  // Also collect GOVERNANCE_STATUS_LABELS + EVIDENCE_GRADE_LABELS values.
  for (const key of ['GOVERNANCE_STATUS_LABELS', 'EVIDENCE_GRADE_LABELS']) {
    const bm = src.match(new RegExp(`export const ${key}\\s*=\\s*\\{([\\s\\S]*?)\\}\\s*as const`));
    if (bm) {
      const b = bm[1];
      let mm;
      const rx = /:\s*(['"`])([\s\S]*?)\1\s*,/g;
      while ((mm = rx.exec(b)) !== null) values.add(mm[2]);
    }
  }
  return values;
}

// Walk .tsx files in scan dirs.
function walk(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    let entries;
    try {
      entries = readdirSync(d);
    } catch {
      continue;
    }
    for (const name of entries) {
      const full = join(d, name);
      const st = statSync(full);
      if (st.isDirectory()) {
        stack.push(full);
      } else if (['.tsx', '.ts'].includes(extname(name))) {
        // Legacy factory-demo files under src/components/demos/ live
        // alongside our shell. Restrict scan to shell allowlist; renderers/
        // are always included.
        const posix = full.split(/[\\/]/).join('/');
        if (posix.includes('components/demos') && !posix.includes('/renderers/')) {
          if (!SCAN_ALLOWLIST_COMPONENTS.has(name)) continue;
        }
        out.push(full);
      }
    }
  }
  return out;
}

// ── string-literal + JSX-text scanner ──────────────────────────────────────
//
// We do NOT flag:
//   - imports (import '...' / from '...')
//   - `className=` values
//   - aria-* / role / id / data-* / href / src / key / alt
//   - values inside object-property positions on our own vocab
//     (component prop keys are TSX identifiers, not values, so they slip past)
//   - template literals with any ${...} interpolation
//   - strings ≤ 8 chars (chevron / punctuation / tokens / units)
//   - strings that are pure Tailwind class fragments
//   - strings that appear verbatim in ../../src/data/demos/*.json
//
// We DO flag any remaining literal string, whether in a JSX attr value like
// `title="…"` or a JSX text node like `>Foo</p>`.

const IGNORED_ATTR_PREFIXES = ['aria-', 'data-', 'href', 'src', 'key', 'alt', 'role', 'id', 'className', 'class', 'name', 'type'];
const TAILWIND_HINT = /^(?:[a-z0-9:_/\-\[\]\.]+\s*)+$/;

function isTailwindLike(s) {
  if (s.length < 3) return true;
  // Multi-word tokens with spaces + lowercase + hyphens/colons look like TW.
  if (!/[A-Z]/.test(s) && /^[a-z0-9\s:\-_/\[\]\.,#%]+$/.test(s) && /\s/.test(s)) {
    // Reject if it clearly looks like a plain-English sentence (contains "the ", "a ", "is ").
    if (/\b(the|and|is|of|to|with|for)\b/i.test(s)) return false;
    return TAILWIND_HINT.test(s);
  }
  return false;
}

function scanFile(fp, allowedLabels, specVocab) {
  const src = readFileSync(fp, 'utf8');
  const rel = relative(ROOT, fp);
  const violations = [];

  const lines = src.split(/\r?\n/);
  lines.forEach((line, idx) => {
    // Skip lines that are pure imports / re-exports / type declarations.
    if (/^\s*(import|export\s+(?:type|\*|\{))/.test(line)) return;
    // Skip comment lines.
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;

    // Attribute strings: attr="value" — require preceding whitespace or `<`
    // so we don't fire on TS expressions like `x >= 0 && "y"`.
    const attrRe = /(?:^|[\s<])([A-Za-z][\w-]*)(?<![><!=])=(?![>=])\s*"([^"\n]{9,})"/g;
    let m;
    while ((m = attrRe.exec(line)) !== null) {
      const [, attr, val] = m;
      if (NON_ATTR_LHS.has(attr)) continue;
      if (IGNORED_ATTR_PREFIXES.some((p) => attr === p || attr.startsWith(p))) continue;
      if (LITERAL_PROP_VALUES.has(val)) continue;
      if (allowedLabels.has(val)) continue;
      if (specVocab.has(val)) continue;
      if (isTailwindLike(val)) continue;
      violations.push({ file: rel, line: idx + 1, kind: 'attr', attr, value: val });
    }

    // JSX text nodes: >Hello World< — guard against comparison chains
    // like `activeIndex >= 0 && activeIndex <` by rejecting the leading `>`
    // if it's part of `>=`, `>>`, `!=`, `<=`, or an arrow.
    const textRe = /(?<![=!<>])>([^<>{}\n]{9,}?)<(?![=!<])/g;
    while ((m = textRe.exec(line)) !== null) {
      const val = m[1].trim();
      if (val.length < 9) continue;
      if (allowedLabels.has(val)) continue;
      if (specVocab.has(val)) continue;
      if (isTailwindLike(val)) continue;
      if (!/[a-zA-Z]/.test(val)) continue;
      if (/(?:&&|\|\||=>|===|!==)/.test(val)) continue;
      violations.push({ file: rel, line: idx + 1, kind: 'jsx-text', value: val });
    }
  });

  return violations;
}

// Build a rough vocabulary of every string that appears verbatim in any of
// the vendored specs. Anything in this set is presumed to be spec-bound.
function loadSpecVocab() {
  const vocab = new Set();
  const stack = [];
  for (const rel of JSON_TARGETS) {
    const full = join(ROOT, rel);
    if (!existsSync(full)) continue;
    stack.push(JSON.parse(readFileSync(full, 'utf8')));
  }
  while (stack.length) {
    const node = stack.pop();
    if (typeof node === 'string') {
      if (node.length >= 3) vocab.add(node);
    } else if (Array.isArray(node)) {
      for (const it of node) stack.push(it);
    } else if (node && typeof node === 'object') {
      for (const k of Object.keys(node)) stack.push(node[k]);
    }
  }
  return vocab;
}

// ── main ───────────────────────────────────────────────────────────────────

function main() {
  const asJson = process.argv.includes('--json');
  const manifestErrors = checkManifest();
  const allowedLabels = loadAllowedLabels();
  const specVocab = loadSpecVocab();

  let files = [];
  for (const d of SCAN_DIRS) files = files.concat(walk(join(ROOT, d)));

  let violations = [];
  for (const f of files) {
    violations = violations.concat(scanFile(f, allowedLabels, specVocab));
  }

  if (asJson) {
    console.log(JSON.stringify({ manifest_errors: manifestErrors, prose_violations: violations }, null, 2));
  } else {
    if (manifestErrors.length) {
      console.error('\n[demos] MANIFEST DRIFT:');
      for (const e of manifestErrors) console.error(`  ${e.file}: ${e.kind} — ${e.msg}`);
    }
    if (violations.length) {
      console.error('\n[demos] PROSE / STRING VIOLATIONS:');
      for (const v of violations) {
        const label = v.kind === 'attr' ? `${v.attr}=` : '';
        console.error(`  ${v.file}:${v.line}  ${label}"${v.value}"`);
      }
    }
    if (!manifestErrors.length && !violations.length) {
      console.log('[demos] check-verbatim: clean');
    }
  }

  if (manifestErrors.length || violations.length) process.exit(1);
}

main();
