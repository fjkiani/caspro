#!/usr/bin/env node
// ============================================================================
// w8c-governance-qa — content QA for w8c work
// ----------------------------------------------------------------------------
// 1. DL-07 negative — the R&D surfaces no longer pair 'DDR' with '0.983'.
//    Also verified: the mechanism-alignment engine + tumor-board surfaces
//    stay clean (they already were, but we re-check after edits).
// 2. Ledger engine deep-dive links — /ledger/{latify,berzosertib,capri}/
//    each emit a preview-appropriate primary engine link + secondary
//    engine links + the full 8D proof-map link.
// 3. Governance policy declarations still visible where they belong (the
//    L2 mechanism-alignment engine page continues to describe PATH A /
//    PATH B in prohibition-context prose).
// ----------------------------------------------------------------------------
// Uses server already running on http://localhost:3100.
// ============================================================================

import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3100';
const OUT_DIR = '/mnt/results/w8c-qa';
const RESULTS = [];

function record(id, route, ok, detail = '') {
  RESULTS.push({ id, route, ok, detail });
  const flag = ok ? 'PASS' : 'FAIL';
  console.log(`[w8c-qa] ${flag}  ${id.padEnd(28)}  ${route.padEnd(40)}  ${detail}`);
}

async function getText(browser, route, { unlock = false } = {}) {
  const ctx = await browser.newContext();
  if (unlock) await unlockGate(ctx);
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    if (!resp || !resp.ok()) {
      await ctx.close();
      return null;
    }
    // Wait a beat for client-only surfaces to hydrate (ledger receipt is ssr:false).
    // Ledger receipt page runs client-side gate re-check and only mounts engine
    // deep-dive links after `unlocked` state settles — give it enough time.
    await page.waitForTimeout(2500);
    const text = await page.content();
    await ctx.close();
    return text;
  } catch (e) {
    await ctx.close();
    return null;
  }
}

/**
 * Unlock the trial-gate cookie for this browser context.  The dev passcode
 * is `curecancer` (see src/lib/trial-gate-server.ts); the API returns an
 * httpOnly cookie that Playwright will carry on subsequent requests.
 */
async function unlockGate(ctx) {
  const res = await ctx.request.post(`${BASE}/api/trial-gate/unlock/`, {
    data: { code: process.env.TRIAL_RECEIPT_PASSCODE || 'curecancer' },
  });
  if (!res.ok()) {
    console.warn(`[w8c-qa] gate unlock failed: ${res.status()} ${await res.text()}`);
    return false;
  }
  return true;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    // -----------------------------------------------------------------------
    // 1. DL-07 negative on the previously-leaking R&D surfaces + engine pages
    // -----------------------------------------------------------------------
    const dlRoutes = [
      '/products/r-d/',
      '/engine/mechanism-alignment/',
      '/engine/mechanism-alignment/scroll/',
      '/engine/mechanism-alignment/tabs/',
      '/tumor-board/',
      '/tumor-board-scroll/',
    ];
    for (const r of dlRoutes) {
      const text = await getText(browser, r);
      if (text === null) {
        record('dl07-guard', r, false, 'route unreachable or 5xx');
        continue;
      }
      const ddrHits = /\bDDR\b/.test(text);
      const num983 = /0\.983/.test(text);
      const ok = !(ddrHits && num983);
      record(
        'dl07-guard',
        r,
        ok,
        ok
          ? `DDR=${ddrHits ? 'seen' : 'absent'}, 0.983=${num983 ? 'seen' : 'absent'} — no co-occurrence`
          : 'DL-07 VIOLATION: DDR and 0.983 both render',
      );
    }

    // -----------------------------------------------------------------------
    // 2. Ledger trial receipt → engine deep-dive link wiring
    // -----------------------------------------------------------------------
    const LEDGER_CASES = [
      { slug: 'latify',       expectPrimary: '/engine/mechanism-alignment/', primaryLabel: 'Mechanism alignment' },
      { slug: 'berzosertib',  expectPrimary: '/engine/mechanism-alignment/', primaryLabel: 'Mechanism alignment' },
      { slug: 'capri',        expectPrimary: '/engine/synthetic-lethality/scroll', primaryLabel: 'Synthetic lethality' },
    ];
    for (const c of LEDGER_CASES) {
      const route = `/ledger/${c.slug}/`;
      const text = await getText(browser, route, { unlock: true });
      if (text === null) {
        record('ledger-primary-link', route, false, 'route unreachable');
        continue;
      }
      const hasPrimary = text.includes(`href="${c.expectPrimary}"`);
      record(
        'ledger-primary-link',
        route,
        hasPrimary,
        hasPrimary ? `primary → ${c.expectPrimary}` : `missing primary link to ${c.expectPrimary}`,
      );
      // Engine link markers: 1 primary + 2 secondary + 1 proof = 4
      const engineLinkCount = (text.match(/data-engine-link="[^"]+"/g) || []).length;
      const hasSecondary = /data-engine-link="secondary"/.test(text);
      const hasProof = /data-engine-link="proof"/.test(text);
      record(
        'ledger-secondary-links',
        route,
        hasSecondary && hasProof && engineLinkCount >= 4,
        `engine link markers=${engineLinkCount} (primary + 2 secondary + proof expected)`,
      );
      const hasPrimaryLabel = text.includes(`Deep-dive: ${c.primaryLabel} engine`);
      record(
        'ledger-primary-label',
        route,
        hasPrimaryLabel,
        hasPrimaryLabel ? `label reads "Deep-dive: ${c.primaryLabel} engine →"` : 'primary label mismatch',
      );
    }

    // -----------------------------------------------------------------------
    // 3. Policy declaration on the L2 mechanism-alignment page
    // -----------------------------------------------------------------------
    const l2 = await getText(browser, '/engine/mechanism-alignment/');
    if (l2 === null) {
      record('policy-visible', '/engine/mechanism-alignment/', false, 'route unreachable');
    } else {
      const hasFormula = l2.includes('clip((p · t) / ‖t‖₂, 0, 1)') || l2.includes('clip((p·t) / ‖t‖₂, 0, 1)');
      const pathBSentences = (l2.match(/[^.\n]*\bPATH B\b[^.\n]*/gi) || []);
      const pathBOffending = pathBSentences.filter((s) =>
        !/prohibit|forbid|banned|not\s+offer|no\s+longer|never|blocked|no\s+PATH\s*B|not\s+PATH\s*B/i.test(s),
      );
      const pathBOk = pathBOffending.length === 0;
      record('policy-formula', '/engine/mechanism-alignment/', hasFormula, hasFormula ? 'PATH A formula present' : 'PATH A formula missing');
      record(
        'policy-pathB',
        '/engine/mechanism-alignment/',
        pathBOk,
        pathBOk ? `PATH B mentions=${pathBSentences.length}, all in prohibition context` : `PATH B surfaced without prohibition context (${pathBOffending[0]?.slice(0, 100)})`,
      );
    }
  } finally {
    await browser.close();
  }

  const passed = RESULTS.filter((r) => r.ok).length;
  const failed = RESULTS.length - passed;
  await fs.writeFile(path.join(OUT_DIR, 'results.json'), JSON.stringify({ passed, failed, results: RESULTS }, null, 2));
  console.log('');
  console.log(`[w8c-qa] passed ${passed}   failed ${failed}`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('[w8c-qa] fatal:', err?.stack || err);
  process.exit(2);
});
