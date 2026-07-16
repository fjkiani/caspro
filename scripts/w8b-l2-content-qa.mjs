#!/usr/bin/env node
/**
 * w8b-l2-content-qa.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Content-level assertions for the L2 Mechanism Alignment surface. Verifies:
 *   1. PATH A formula string is rendered on all 3 L2 surfaces.
 *   2. Every illustrative divergence case renders on the scroll surface.
 *   3. The governance tab is reachable and names the DL-07 quarantine rule.
 *   4. DL-07 negative check: no L2 surface pairs the token 'DDR' with '0.983'
 *      anywhere in the rendered DOM (governance guard, matches
 *      layer2_gates/governance_gate.py).
 *   5. PATH B negative check: 'PATH B' never appears as an available fallback
 *      on any L2 surface.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.QA_BASE_URL || 'http://127.0.0.1:3100';
const OUT_DIR = process.env.QA_OUT_DIR || '/workspace/caspro/qa/w8b';
const TIMEOUT = 45_000;

const failures = [];
const successes = [];

function record(kind, route, ok, detail) {
  const rec = { kind, route, detail };
  if (ok) successes.push(rec);
  else failures.push(rec);
}

async function getText(browser, route) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  try {
    const resp = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    if (!resp || !resp.ok()) {
      failures.push({ kind: 'load', route, detail: `HTTP ${resp && resp.status()}` });
      return null;
    }
    await page.waitForTimeout(2500);
    const text = await page.evaluate(() => document.documentElement.innerText);
    return text;
  } finally {
    await context.close();
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    const routes = [
      '/engine/mechanism-alignment/',
      '/engine/mechanism-alignment/scroll/',
      '/engine/mechanism-alignment/tabs/',
    ];
    const captured = {};
    for (const r of routes) {
      const text = await getText(browser, r);
      if (text === null) continue;
      captured[r] = text;

      // 1. PATH A formula present
      const hasFormula = text.includes('clip((p · t) / ‖t‖₂, 0, 1)') || text.includes('clip((p·t) / ‖t‖₂, 0, 1)');
      record('formula', r, hasFormula, hasFormula ? 'PATH A formula rendered' : 'PATH A formula string missing');

      // 4. DL-07 negative: DDR + 0.983 must NOT co-occur
      const ddrHits = /\bDDR\b/.test(text);
      const num983 = /0\.983/.test(text);
      const dl07Ok = !(ddrHits && num983);
      record('dl07-guard', r, dl07Ok, dl07Ok ? 'no DDR + 0.983 co-occurrence' : 'DL-07 VIOLATION: DDR and 0.983 co-occur');

      // 5. PATH B negative — allowed only inside explicit prohibition/quarantine
      // language ("PATH B fallback is prohibited", "No PATH B fallback",
      // "never PATH B", etc.). Fail if PATH B appears in a way that could be
      // read as an offered fallback.
      const pathBMatches = text.match(/[^.\n]*\bPATH B\b[^.\n]*/gi) || [];
      const badMentions = pathBMatches.filter(sentence => {
        return !/prohibit|forbid|banned|not\s+offer|not\s+available|no\s+longer|never|blocked|\bno\s+path\s*b/i.test(sentence);
      });
      const pathBOk = badMentions.length === 0;
      record('pathB-prohibition', r, pathBOk,
        pathBOk ? `PATH B appears only in prohibition context (${pathBMatches.length} matches)` : `PATH B surfaced as fallback: ${badMentions[0]?.slice(0, 100)}`);
    }

    // 2. Divergence cases on scroll
    const scrollText = captured['/engine/mechanism-alignment/scroll/'] || '';
    for (const caseId of ['DIV-01', 'DIV-02', 'DIV-03']) {
      const ok = scrollText.includes(caseId);
      record('divergence-case', '/engine/mechanism-alignment/scroll/', ok, ok ? `case ${caseId} present` : `case ${caseId} missing from scroll`);
    }

    // 3. Governance tab content (visible only when the Gov tab is selected)
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      try {
        await page.goto(BASE + '/engine/mechanism-alignment/tabs/', { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
        await page.waitForTimeout(2000);
        // Click the GOV tab
        const gov = page.locator('button', { hasText: 'GOV' }).first();
        await gov.click({ timeout: 5000 });
        await page.waitForTimeout(1000);
        const govText = await page.evaluate(() => document.documentElement.innerText);
        const hasDl07 = /DL-07/.test(govText);
        const hasRss = /RSS/.test(govText) && /PMID/.test(govText);
        const hasSigned = /2026-04-28/.test(govText);
        record('governance-tab', '/engine/mechanism-alignment/tabs/#gov', hasDl07 && hasRss && hasSigned,
          `dl07=${hasDl07} rss=${hasRss} signed=${hasSigned}`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const report = {
    ts: new Date().toISOString(),
    base: BASE,
    total_checks: successes.length + failures.length,
    successes: successes.length,
    failures: failures.length,
    detail_failures: failures,
    detail_successes: successes,
  };
  await fs.writeFile(path.join(OUT_DIR, 'l2-content-report.json'), JSON.stringify(report, null, 2));
  console.log(`[w8b-content] passed ${successes.length}   failed ${failures.length}`);
  if (failures.length) {
    for (const f of failures) console.log('  FAIL', JSON.stringify(f));
    process.exit(1);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error('[w8b-content] fatal:', e);
  process.exit(2);
});
