#!/usr/bin/env node
// ============================================================================
// caspro-lint — governance-aware repo-wide scanner
// ----------------------------------------------------------------------------
// Enforces the governance rules that browser-side content QA cannot see, by
// walking source files directly:
//
//   1. DL-07 (DDR + 0.983 co-occurrence)
//      Any line/file that puts the token `DDR` and the number `0.983`
//      within the same content window is flagged, UNLESS the line is
//      structurally a rule declaration (line starts with a comment
//      marker AND mentions "DL-07"/"forbidden"/"quarantine"/"prohibit").
//
//   2. PATH B fallback surfacing
//      Any prose sentence containing `PATH B` that is NOT inside a
//      prohibition context ("prohibited", "forbidden", "never", "not
//      offer", "no PATH B", etc.). Comment-declarations of the rule
//      itself are exempt (same criterion as DL-07).
//
//   3. Tumor-board slop patterns
//      ASSET-α..δ, CANDIDATE-A..D, "illustrative candidate profile",
//      "A candidate biomarker is graded" — the exact slop the tumor-board
//      rebuild eliminated. These must never come back into src/.
//
// Rules #1 and #2 are governance blockers (non-zero exit).
// Rule #3 is a governance blocker for src/components/tumor-board/**.
//
// Exit codes:
//   0 — clean
//   1 — governance violations found
//   2 — invocation / IO error
//
// Usage:
//   node scripts/caspro-lint.mjs
//   node scripts/caspro-lint.mjs --json     # machine-readable output
//   node scripts/caspro-lint.mjs --scope src/data,src/components
// ============================================================================

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);

const args = process.argv.slice(2);
const wantJson = args.includes('--json');
const scopeArgIdx = args.indexOf('--scope');
const DEFAULT_SCOPE = ['src'];
const scope =
  scopeArgIdx >= 0 && args[scopeArgIdx + 1]
    ? args[scopeArgIdx + 1].split(',').map((s) => s.trim()).filter(Boolean)
    : DEFAULT_SCOPE;

// ----------------------------------------------------------------------------
// File walker (excludes node_modules / .next / build outputs)
// ----------------------------------------------------------------------------
const IGNORE_DIRS = new Set([
  'node_modules',
  '.next',
  '.turbo',
  '.cache',
  'dist',
  'build',
  'coverage',
  'out',
  '.git',
]);
const CODE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.mdx']);

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const ent of entries) {
    if (IGNORE_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      await walk(full, out);
    } else if (ent.isFile()) {
      const ext = path.extname(ent.name).toLowerCase();
      if (CODE_EXTS.has(ext)) out.push(full);
    }
  }
  return out;
}

// ----------------------------------------------------------------------------
// Rule-declaration detector
//   A line is treated as a rule declaration (exempt) when it:
//     - starts (after whitespace) with `//`, `/*`, `*`, or `#`, AND
//     - mentions one of the governance-vocabulary tokens.
// This is what lets the mechanism-alignment-data.ts header, LogStream.tsx
// header, and MultiAssetEngine.tsx header describe DL-07/COSINE without
// being flagged as violations.
// ----------------------------------------------------------------------------
const RULE_VOCAB_RE =
  /\b(DL-07|forbidden|forbid|quarantine|quarantined|prohibit|prohibited|banned|not\s+offer|no\s+longer|never|blocked|no\s+PATH\s*B|PATH\s*B\s+prohibit|PERMANENTLY_BLOCKED|PERMANENTLY_DOWNGRADED)\b/i;

function isRuleDeclaration(line) {
  const trimmed = line.trimStart();
  const looksLikeComment =
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('#');
  if (!looksLikeComment) return false;
  return RULE_VOCAB_RE.test(line);
}

// ----------------------------------------------------------------------------
// Rule 1: DL-07 (DDR + 0.983 in same window)
//   Window = the same line.  Paired-across-lines cases exist in prose
//   (rare), but line-level catches the R&D leak surface that motivated
//   the rule.  Rule declarations are exempt.
// ----------------------------------------------------------------------------
function findDL07(lines, relPath) {
  const violations = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!/\bDDR\b/.test(line) || !/0\.983/.test(line)) continue;
    if (isRuleDeclaration(line)) continue;
    violations.push({
      rule: 'DL-07',
      file: relPath,
      line: i + 1,
      text: line.trim().slice(0, 200),
      message: 'DDR and 0.983 co-occur on this line (governance DL-07).',
    });
  }
  return violations;
}

// ----------------------------------------------------------------------------
// Rule 2: PATH B not in prohibition context
//   We only look at prose sentences containing the exact token "PATH B"
//   (case-insensitive).  A sentence is any run of characters delimited
//   by `.`, `!`, `?`, or newline.  If the sentence contains prohibition
//   vocabulary, it's fine.  Rule-declaration lines are still exempt.
// ----------------------------------------------------------------------------
const PATHB_TOKEN_RE = /\bPATH\s*B\b/i;
const PROHIBITION_RE =
  /\b(prohibit|prohibited|forbid|forbidden|banned|not\s+offer|not\s+available|no\s+longer|never|blocked|no\s+PATH\s*B|not\s+PATH\s*B)\b/i;

function findPathB(lines, relPath) {
  const violations = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!PATHB_TOKEN_RE.test(line)) continue;
    if (isRuleDeclaration(line)) continue;
    // Look at the sentence containing PATH B (loose regex; line-scoped)
    const sentences = line.split(/[.!?\n]+/);
    for (const s of sentences) {
      if (!PATHB_TOKEN_RE.test(s)) continue;
      if (PROHIBITION_RE.test(s)) continue;
      violations.push({
        rule: 'PATH_B_SURFACE',
        file: relPath,
        line: i + 1,
        text: s.trim().slice(0, 200),
        message:
          'PATH B mentioned outside prohibition context (governance requires "prohibited"/"forbidden"/"no PATH B" nearby).',
      });
      break; // one hit per line
    }
  }
  return violations;
}

// ----------------------------------------------------------------------------
// Rule 3: Tumor-board slop patterns
//   Only enforced inside src/components/tumor-board/** and src/data/tumor-board/**.
// ----------------------------------------------------------------------------
const SLOP_PATTERNS = [
  { re: /ASSET-[αβγδ]/, name: 'ASSET-α/β/γ/δ placeholder' },
  { re: /\bCANDIDATE-[ABCD]\b/, name: 'CANDIDATE-A/B/C/D placeholder' },
  { re: /illustrative candidate profile/i, name: '"illustrative candidate profile" boilerplate' },
  { re: /A candidate biomarker is graded/i, name: '"A candidate biomarker is graded" boilerplate' },
  { re: /LOG STREAM · STREAMING/i, name: 'LOG STREAM · STREAMING rail (log-stream slop)' },
];

function findSlop(lines, relPath) {
  if (!(relPath.includes('src/components/tumor-board/') || relPath.includes('src/data/tumor-board/'))) {
    return [];
  }
  const violations = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isRuleDeclaration(line)) continue;
    for (const p of SLOP_PATTERNS) {
      if (p.re.test(line)) {
        violations.push({
          rule: 'TUMOR_BOARD_SLOP',
          file: relPath,
          line: i + 1,
          text: line.trim().slice(0, 200),
          message: `Tumor-board rebuild forbids ${p.name}.`,
        });
      }
    }
  }
  return violations;
}

// ----------------------------------------------------------------------------
// Driver
// ----------------------------------------------------------------------------
async function main() {
  const files = [];
  for (const s of scope) {
    const abs = path.resolve(ROOT, s);
    await walk(abs, files);
  }

  const violations = [];
  let scanned = 0;

  for (const abs of files) {
    let src;
    try {
      src = await fs.readFile(abs, 'utf8');
    } catch {
      continue;
    }
    scanned += 1;
    const relPath = path.relative(ROOT, abs);
    const lines = src.split('\n');
    violations.push(...findDL07(lines, relPath));
    violations.push(...findPathB(lines, relPath));
    violations.push(...findSlop(lines, relPath));
  }

  const summary = {
    scanned_files: scanned,
    scope,
    by_rule: {
      'DL-07': violations.filter((v) => v.rule === 'DL-07').length,
      'PATH_B_SURFACE': violations.filter((v) => v.rule === 'PATH_B_SURFACE').length,
      'TUMOR_BOARD_SLOP': violations.filter((v) => v.rule === 'TUMOR_BOARD_SLOP').length,
    },
    total: violations.length,
  };

  if (wantJson) {
    process.stdout.write(JSON.stringify({ summary, violations }, null, 2) + '\n');
  } else {
    if (violations.length === 0) {
      console.log(`[caspro-lint] clean — scanned ${scanned} files across ${scope.join(', ')}`);
    } else {
      console.log(`[caspro-lint] ${violations.length} governance violation(s) across ${scanned} files:`);
      console.log('');
      for (const v of violations) {
        console.log(`  ${v.rule}  ${v.file}:${v.line}`);
        console.log(`    ${v.message}`);
        console.log(`    ${v.text}`);
        console.log('');
      }
      console.log('[caspro-lint] rule counts:', summary.by_rule);
    }
  }

  process.exit(violations.length === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('[caspro-lint] fatal:', err?.stack || err);
  process.exit(2);
});
