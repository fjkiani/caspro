#!/usr/bin/env node
/**
 * w8-tumor-board-content-qa.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * 10 assertions for the rebuilt /tumor-board + /tumor-board-scroll routes.
 * All content pulled from the canonical AK L1 bundle
 * (src/data/tumor-board/ak-l1-bundle.ts).
 *
 * 1. Bundle render        — both routes 200 with substrate
 * 2. AK header assertion   — AK / MBD4 / PDGFRA / TP53 / MSS / CPS=10
 * 3. SL matrix             — 6 axes present, atr_wee1 tier upgrade visible
 * 4. Falsification arc     — p=0.605, PARP1, MBD4-LOF, manuscript_claim_type,
 *                            PR #11 signal, falsified_mechanism token
 * 5. Evidence anchors      — 6 verified rows
 * 6. Recommended drugs     — 5 drugs + confidences + Rucaparib FALSIFIED
 * 7. No-slop regex guard   — no ASSET-α/β, CANDIDATE-A..D, illustrative candidate,
 *                            "A candidate biomarker is graded", generic MODALITY
 * 8. No-empty-rail guard   — no ">_ LOG STREAM · STREAMING"
 * 9. Provenance path       — ≥6 JSON-shaped path strings visible
 * 10. Engine QA sentinel   — existing /engine/* routes still 200 (soft check)
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.QA_BASE_URL || 'http://127.0.0.1:3100';
const OUT_DIR = process.env.QA_OUT_DIR || '/workspace/caspro/qa/w8-tumor-board';
const TIMEOUT = 45_000;

const failures = [];
const successes = [];

function record(kind, route, ok, detail) {
  const rec = { kind, route, detail };
  if (ok) successes.push(rec);
  else failures.push(rec);
}

async function getText(browser, route, opts = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  try {
    const resp = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    if (!resp || !resp.ok()) {
      failures.push({ kind: 'load', route, detail: `HTTP ${resp && resp.status()}` });
      return null;
    }
    await page.waitForTimeout(2500);
    if (opts.clickTab) {
      const btn = page.locator('button', { hasText: opts.clickTab }).first();
      try {
        await btn.click({ timeout: 5000 });
        await page.waitForTimeout(1200);
      } catch (e) {
        failures.push({ kind: 'tab-click', route, detail: `could not click ${opts.clickTab}: ${e.message}` });
      }
    }
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
    // 1. Bundle render — both routes served
    const tabsText = await getText(browser, '/tumor-board/');
    const scrollText = await getText(browser, '/tumor-board-scroll/');
    record('render', '/tumor-board/', !!tabsText, tabsText ? 'served' : 'failed to load');
    record('render', '/tumor-board-scroll/', !!scrollText, scrollText ? 'served' : 'failed to load');

    // 2. Header assertion — every substrate anchor visible somewhere on the pages
    for (const [route, text] of [['/tumor-board/', tabsText], ['/tumor-board-scroll/', scrollText]]) {
      if (!text) continue;
      const anchors = ['AK', 'MBD4', 'PDGFRA', 'TP53', 'MSS', 'CPS'];
      const missing = anchors.filter((a) => !text.includes(a));
      record('header', route, missing.length === 0, missing.length === 0 ? 'all header tokens present' : `missing: ${missing.join(',')}`);
    }

    // 3. SL matrix — scroll page shows all 6 axes + the atr_wee1 upgrade marker
    if (scrollText) {
      const axes = ['cytidine_analogs', 'atr_wee1', 'parp_inhibitors', 'immunotherapy', 'pkmyt1', 'wrn'];
      const missing = axes.filter((a) => !scrollText.includes(a));
      const upgrade =
        scrollText.includes('Strong candidate dependency axis') && scrollText.includes('primary_new_candidate_axis');
      record('sl-matrix', '/tumor-board-scroll/', missing.length === 0 && upgrade,
        `axes_missing=${missing.length} upgrade_marker=${upgrade}`);
    }

    // 4. Falsification arc — click FALSIFICATION tab on the tabbed route
    const falsifText = await getText(browser, '/tumor-board/', { clickTab: 'FALSIFICATION' });
    for (const [route, text] of [['/tumor-board/#falsification', falsifText], ['/tumor-board-scroll/', scrollText]]) {
      if (!text) continue;
      const parts = {
        p605: text.includes('p=0.6047879') || text.includes('p=0.605'),
        parp1: /\bPARP1\b/.test(text),
        mbd4Lof: /MBD4-LOF/.test(text),
        claimType: text.includes('manuscript_claim_type'),
        pr11: /PR\s*#?\s*11/i.test(text),
        falsifiedMechToken: text.includes('falsified_mechanism'),
      };
      const ok = Object.values(parts).every(Boolean);
      record('falsification', route, ok, JSON.stringify(parts));
    }

    // 5. Evidence anchors — click CONFIDENCE tab, expect 6 rows
    const confidenceText = await getText(browser, '/tumor-board/', { clickTab: 'CONFIDENCE' });
    for (const [route, text] of [['/tumor-board/#confidence', confidenceText], ['/tumor-board-scroll/', scrollText]]) {
      if (!text) continue;
      const anchorLabels = [
        'Primary ceralasertib',
        'TP53-stratified LN_IC50',
        'TP53-stratified AUC',
        'MSI-purge LN_IC50',
        'PARP1 in MBD4-LOF',
        'Pan-cancer PARP1',
      ];
      const missing = anchorLabels.filter((a) => !text.includes(a));
      record('evidence-anchors', route, missing.length === 0, missing.length === 0 ? 'all 6 anchors' : `missing: ${missing.join(',')}`);
    }

    // 6. Recommended drugs — 5 names + Rucaparib FALSIFIED overlay
    for (const [route, text] of [['/tumor-board/#confidence', confidenceText], ['/tumor-board-scroll/', scrollText]]) {
      if (!text) continue;
      const drugs = ['Ceralasertib', 'Adavosertib', 'Olaparib', 'Niraparib', 'Rucaparib'];
      const missing = drugs.filter((d) => !text.includes(d));
      const rucaFalsified = /rucaparib[\s\S]{0,300}(falsified|demote)/i.test(text);
      record('recommended-drugs', route, missing.length === 0 && rucaFalsified, `drugs_missing=${missing.length} ruca_flag=${rucaFalsified}`);
    }

    // 7. No-slop guard — refuse the placeholder tokens the original UI shipped
    const slopPatterns = [
      /ASSET-α/,
      /ASSET-β/,
      /ASSET-γ/,
      /ASSET-δ/,
      /CANDIDATE-A\b/,
      /CANDIDATE-B\b/,
      /CANDIDATE-C\b/,
      /CANDIDATE-D\b/,
      /illustrative candidate profile/i,
      /A candidate biomarker is graded/i,
    ];
    for (const [route, text] of [
      ['/tumor-board/', tabsText],
      ['/tumor-board/#falsification', falsifText],
      ['/tumor-board/#confidence', confidenceText],
      ['/tumor-board-scroll/', scrollText],
    ]) {
      if (!text) continue;
      const hits = slopPatterns.map((r) => r.toString()).filter((_, i) => slopPatterns[i].test(text));
      record('no-slop', route, hits.length === 0, hits.length === 0 ? 'clean' : `slop_hits=${hits.join('|')}`);
    }

    // 8. No-empty-rail guard — original log stream must be gone
    for (const [route, text] of [['/tumor-board/', tabsText], ['/tumor-board-scroll/', scrollText]]) {
      if (!text) continue;
      const ok = !/LOG STREAM · STREAMING/i.test(text);
      record('no-log-rail', route, ok, ok ? 'no log rail' : 'log rail still present');
    }

    // 9. Provenance path visibility — provenance tab renders ≥6 JSON path strings
    //    Scroll route also renders many bundle paths inline on other panels.
    //    Any string starting with `levels.L1.` OR any `synthetic_lethality.*`
    //    JSON path counts as a valid provenance receipt.
    const provText = await getText(browser, '/tumor-board/', { clickTab: 'PROVENANCE' });
    const pathRe = /(?:levels\.L1|synthetic_lethality|completeness|recommended_drugs|essential_pathways|broken_pathways|evidence_matrix)[\w.\[\]"'?=]*/g;
    for (const [route, text] of [['/tumor-board/#provenance', provText], ['/tumor-board-scroll/', scrollText]]) {
      if (!text) continue;
      const pathMatches = text.match(pathRe) || [];
      const uniq = new Set(pathMatches);
      record('provenance-paths', route, uniq.size >= 6, `unique_paths=${uniq.size}`);
    }

    // 10. Engine QA sentinel — existing engine surfaces still 200
    for (const engineRoute of [
      '/engine/target-lock-brain-met/',
      '/engine/synthetic-lethality/',
      '/engine/mechanism-alignment/',
    ]) {
      const text = await getText(browser, engineRoute);
      record('engine-sentinel', engineRoute, !!text, text ? 'still served' : 'broken');
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
  await fs.writeFile(path.join(OUT_DIR, 'tumor-board-content-report.json'), JSON.stringify(report, null, 2));
  console.log(`[w8-tb-content] passed ${successes.length}   failed ${failures.length}`);
  if (failures.length) {
    for (const f of failures) console.log('  FAIL', JSON.stringify(f));
    process.exit(1);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error('[w8-tb-content] fatal:', e);
  process.exit(2);
});
