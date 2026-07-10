#!/usr/bin/env node
/**
 * w8-tumor-board-visual.mjs
 * Captures 4 screenshots of the rebuilt tumor-board surfaces:
 *   /tumor-board/               (dark, light)
 *   /tumor-board-scroll/        (dark, light)
 * Written to /mnt/results/tumor-board-rebuild/*.png for user review.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.QA_BASE_URL || 'http://127.0.0.1:3100';
const OUT_DIR = process.env.QA_OUT_DIR || '/mnt/results/tumor-board-rebuild';
const TIMEOUT = 45_000;

async function capture(browser, route, theme, filename) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: theme,
  });
  const page = await context.newPage();
  try {
    const resp = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    if (!resp || !resp.ok()) {
      console.log(`FAIL ${route} (${theme}) HTTP ${resp && resp.status()}`);
      return;
    }
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT_DIR, filename), fullPage: true });
    console.log(`OK   ${filename}`);
  } finally {
    await context.close();
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    await capture(browser, '/tumor-board/', 'dark', 'tumor-board__dark.png');
    await capture(browser, '/tumor-board/', 'light', 'tumor-board__light.png');
    await capture(browser, '/tumor-board-scroll/', 'dark', 'tumor-board-scroll__dark.png');
    await capture(browser, '/tumor-board-scroll/', 'light', 'tumor-board-scroll__light.png');
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
