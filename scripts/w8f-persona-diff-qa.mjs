#!/usr/bin/env node
/**
 * w8f-persona-diff-qa
 * ─────────────────────────────────────────────────────────────────────────────
 * Persona-swap coverage gate.
 *
 * For every route in the D11–D16 sweep, load with `?persona=oncologist`,
 * `?persona=patient`, and `?persona=pharma`, and assert the rendered
 * `document.body.innerText` differs by at least MIN_JACCARD_DELTA between
 * every pair. If a surface renders nearly-identical text across personas,
 * the toggle is a lie — the gate fails and the sweep can't merge.
 *
 * Word-level Jaccard distance is used (1 − intersection/union of word sets),
 * so a threshold of 0.20 means at least 20% of the words must differ.
 *
 * Ignored surfaces (documented in PLAN.md §11): /docs/, /legal/, /privacy/,
 * /careers/, /contact/, /security-overview/, /hipaa-statement/, /media/,
 * /blog/, /research/blog/, and the homepage /.
 *
 * Usage:
 *   node scripts/w8f-persona-diff-qa.mjs
 *   node scripts/w8f-persona-diff-qa.mjs --json
 *   QA_BASE_URL=http://127.0.0.1:3100 node scripts/w8f-persona-diff-qa.mjs
 *
 * Exit codes:
 *   0 — every checked pair meets or exceeds the threshold
 *   1 — one or more pairs fell below threshold (the drift the user complained about)
 *   2 — invocation / IO error
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const BASE = process.env.QA_BASE_URL || 'http://127.0.0.1:3100';
const OUT_DIR = process.env.QA_OUT_DIR || '/workspace/caspro/qa/w8f-persona-diff';
const TIMEOUT = 30_000;
const MIN_JACCARD_DELTA = Number(process.env.PERSONA_MIN_JACCARD || 0.20);

const PERSONAS = ['oncologist', 'patient', 'pharma'];

// Routes in scope for the persona sweep (matches D11–D16 plan).
// Add per-ticket as new persona-scoped routes land.
const ROUTES = [
  // Tumor-board (D12)
  '/tumor-board/AK/',
  '/tumor-board/BR01/',
  '/tumor-board/CRC01/',
  '/tumor-board/BM01/',
  '/tumor-board-scroll/',
  // Ledger (D13)
  '/ledger/',
  '/ledger/decode-wall/',
  '/ledger/af3-provenance/',
  // Pipeline (D13)
  '/pipeline/',
  // Engine (D14)
  '/engine/target-lock/',
  '/engine/mechanism-alignment/',
  '/engine/synthetic-lethality/',
  '/engine/safety-dosing/',
  '/engine/mechanism-alignment/tabs/',
  '/engine/synthetic-lethality/tabs/',
  '/engine/safety-dosing/tabs/',
];

const failures = [];
const successes = [];

function tokens(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((w) => w.length > 2),
  );
}

function jaccardDelta(a, b) {
  const A = tokens(a);
  const B = tokens(b);
  const inter = new Set([...A].filter((x) => B.has(x)));
  const union = new Set([...A, ...B]);
  if (union.size === 0) return 0;
  return 1 - inter.size / union.size;
}

async function renderPersonaText(browser, route, persona) {
  const url = `${BASE}${route}${route.includes('?') ? '&' : '?'}persona=${persona}`;
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    if (!resp || !resp.ok()) {
      await context.close();
      return { ok: false, status: resp && resp.status(), text: '' };
    }
    // Ensure client-side persona hydrates + JSX renders any conditional blocks.
    await page.waitForTimeout(1500);
    const text = await page.evaluate(() => document.body.innerText || '');
    await context.close();
    return { ok: true, status: resp.status(), text };
  } catch (e) {
    await context.close();
    return { ok: false, status: 'error', text: '', error: String(e) };
  }
}

async function checkRoute(browser, route) {
  const renders = {};
  for (const persona of PERSONAS) {
    renders[persona] = await renderPersonaText(browser, route, persona);
    if (!renders[persona].ok) {
      failures.push({
        kind: 'render',
        route,
        persona,
        detail: `HTTP ${renders[persona].status}${renders[persona].error ? ` · ${renders[persona].error}` : ''}`,
      });
      return;
    }
  }
  const pairs = [
    ['oncologist', 'patient'],
    ['oncologist', 'pharma'],
    ['patient', 'pharma'],
  ];
  for (const [a, b] of pairs) {
    const delta = jaccardDelta(renders[a].text, renders[b].text);
    const rec = {
      kind: 'persona-diff',
      route,
      pair: `${a}↔${b}`,
      delta: Number(delta.toFixed(3)),
      threshold: MIN_JACCARD_DELTA,
    };
    if (delta >= MIN_JACCARD_DELTA) successes.push(rec);
    else failures.push({ ...rec, detail: `word-jaccard delta ${delta.toFixed(3)} below threshold ${MIN_JACCARD_DELTA}` });
  }
}

async function main() {
  const wantJson = process.argv.includes('--json');
  const browser = await chromium.launch({ headless: true });
  try {
    for (const route of ROUTES) await checkRoute(browser, route);
  } finally {
    await browser.close();
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  const report = {
    threshold: MIN_JACCARD_DELTA,
    routes: ROUTES.length,
    personas: PERSONAS.length,
    passed: successes.length,
    failed: failures.length,
    successes,
    failures,
    timestamp: new Date().toISOString(),
  };
  await fs.writeFile(path.join(OUT_DIR, 'latest.json'), JSON.stringify(report, null, 2));

  if (wantJson) {
    process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  } else {
    console.log(`[w8f-persona-diff] threshold=${MIN_JACCARD_DELTA} routes=${ROUTES.length}`);
    console.log(`[w8f-persona-diff] passed ${successes.length}   failed ${failures.length}`);
    for (const f of failures) {
      console.log(`  FAIL ${JSON.stringify(f)}`);
    }
  }

  process.exit(failures.length === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('[w8f-persona-diff] fatal:', err?.stack || err);
  process.exit(2);
});
