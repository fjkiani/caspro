#!/usr/bin/env node
/**
 * w8a-visual-qa.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Playwright headless QA for the w7-shipped tumor-board-shape routes plus
 * cascade DOM assertions. Emits screenshots to /workspace/caspro/qa/w8a/ and
 * exits non-zero on any failure.
 *
 * Requires: `pnpm start` (or `next start`) already serving on PORT (default 3100).
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.QA_BASE_URL || 'http://127.0.0.1:3100';
const OUT_DIR = process.env.QA_OUT_DIR || '/workspace/caspro/qa/w8a';
const TIMEOUT = 45_000;

const TUMOR_BOARD_ROUTES = [
  '/engine/target-lock/',
  '/engine/target-lock/scroll/',
  '/engine/target-lock/tabs/',
  '/engine/synthetic-lethality/',
  '/engine/synthetic-lethality/scroll/',
  '/engine/synthetic-lethality/tabs/',
];

// w8a scope: verify that surfaces already declared to carry engine cascade
// footers still contain the cascade links. Ledger cross-engine links belong
// to w8c and are covered there.
const CASCADE_ROUTES = [
  { route: '/industry/biotech/', mustContain: ['/engine/target-lock/scroll'] },
  { route: '/industry/genetic-testing/', mustContain: ['/engine/target-lock/scroll'] },
  { route: '/industry/healthcare/', mustContain: ['/engine/target-lock/scroll'] },
  { route: '/industry/research/', mustContain: ['/engine/target-lock/scroll'] },
  { route: '/patients/', mustContain: ['/engine/target-lock/scroll'] },
  { route: '/products/oracle/', mustContain: ['/engine/target-lock/scroll'] },
  { route: '/products/patient/', mustContain: ['/engine/target-lock/scroll'] },
];

const failures = [];
const successes = [];

async function withTheme(context, theme) {
  await context.addInitScript((t) => {
    try {
      localStorage.setItem('theme', t);
    } catch {}
  }, theme);
}

async function shootRoute(browser, route, theme) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await withTheme(context, theme);
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(`console.error: ${m.text()}`);
  });
  const url = BASE + route;
  const slug = route.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_') || 'root';
  const fname = path.join(OUT_DIR, `${slug}__${theme}.png`);
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    if (!resp || !resp.ok()) {
      failures.push({ route, theme, reason: `HTTP ${resp && resp.status()} at ${url}` });
      await page.screenshot({ path: fname, fullPage: false });
      return;
    }
    await page.waitForTimeout(2500); // let framer-motion/three.js settle
    await page.screenshot({ path: fname, fullPage: false });
    // Domchecks: not entirely blank
    const bodyText = await page.evaluate(() => document.body.innerText.length);
    if (bodyText < 100) {
      failures.push({ route, theme, reason: `page body too short (${bodyText} chars)` });
    } else {
      successes.push({ route, theme, chars: bodyText, screenshot: fname });
    }
    if (consoleErrors.length) {
      failures.push({ route, theme, reason: `console errors: ${consoleErrors.slice(0, 3).join(' | ')}` });
    }
  } catch (e) {
    failures.push({ route, theme, reason: `exception: ${e.message}` });
  } finally {
    await context.close();
  }
}

async function assertCascade(browser, { route, mustContain }) {
  // Cascade check inspects rendered HTML — we don't need networkidle. Use
  // domcontentloaded so long-lived animation sockets don't stall the check.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await withTheme(context, 'dark');
  const page = await context.newPage();
  const url = BASE + route;
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    if (!resp || !resp.ok()) {
      failures.push({ route, kind: 'cascade', reason: `HTTP ${resp && resp.status()}` });
      return;
    }
    // Give client-side render a moment to hydrate cascade footer.
    await page.waitForTimeout(2500);
    const html = await page.content();
    const missing = mustContain.filter((needle) => !html.includes(needle));
    if (missing.length) {
      failures.push({ route, kind: 'cascade', reason: `missing links: ${missing.join(', ')}` });
    } else {
      successes.push({ route, kind: 'cascade', found: mustContain.length });
    }
  } catch (e) {
    failures.push({ route, kind: 'cascade', reason: `exception: ${e.message}` });
  } finally {
    await context.close();
  }
}

async function assertThemeToggleActuallyChanges(browser, route) {
  // Load twice (once with theme=light, once with theme=dark) and confirm
  // that the outer <html> class actually swaps between 'dark' and 'light-mode'.
  const results = {};
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await withTheme(context, theme);
    const page = await context.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: TIMEOUT });
      await page.waitForTimeout(500);
      const cls = await page.evaluate(() => document.documentElement.className);
      results[theme] = cls;
    } finally {
      await context.close();
    }
  }
  const darkHasDark = results.dark.includes('dark');
  const lightHasLight = results.light.includes('light-mode') || !results.light.includes('dark');
  if (!darkHasDark) {
    failures.push({ route, kind: 'theme-toggle', reason: `theme=dark <html> has no 'dark' class: ${results.dark}` });
  } else if (!lightHasLight) {
    failures.push({ route, kind: 'theme-toggle', reason: `theme=light <html> did not enter light mode: ${results.light}` });
  } else {
    successes.push({ route, kind: 'theme-toggle', darkClass: results.dark, lightClass: results.light });
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`[w8a-qa] BASE=${BASE}  OUT=${OUT_DIR}`);
  const browser = await chromium.launch();
  try {
    // 6 routes × 2 themes = 12 screenshots
    for (const route of TUMOR_BOARD_ROUTES) {
      for (const theme of ['dark', 'light']) {
        console.log(`  route ${route}  theme=${theme}`);
        await shootRoute(browser, route, theme);
      }
    }
    // 10 cascade assertions
    for (const c of CASCADE_ROUTES) {
      console.log(`  cascade  ${c.route}`);
      await assertCascade(browser, c);
    }
    // 2 theme-toggle assertions on w7 surfaces
    await assertThemeToggleActuallyChanges(browser, '/engine/target-lock/scroll/');
    await assertThemeToggleActuallyChanges(browser, '/engine/synthetic-lethality/scroll/');
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
  await fs.writeFile(
    path.join(OUT_DIR, 'qa-report.json'),
    JSON.stringify(report, null, 2),
  );
  console.log(`[w8a-qa] passed ${successes.length}   failed ${failures.length}`);
  if (failures.length) {
    for (const f of failures) console.log('  FAIL', JSON.stringify(f));
    process.exit(1);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error('[w8a-qa] fatal:', e);
  process.exit(2);
});
