import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:3111';
const OUT = 'release-a/screenshots';
mkdirSync(OUT, { recursive: true });

const routes = [
  ['products-interception', '/products/interception/'],
  ['products-insilico-trials', '/products/insilico-trials/'],
  ['products-tumor-board', '/products/tumor-board/'],
];
const viewports = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
];

const browser = await chromium.launch();
let shots = 0;
for (const [vpName, vp] of viewports) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  // Swallow noisy client console errors (GraphCMS nav env warning) so they don't abort.
  page.on('pageerror', (e) => console.log('  [pageerror ignored]', String(e).slice(0, 120)));
  for (const [name, path] of routes) {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait for the VerticalSurface page H1 title strip to actually render (not the loading spinner).
    try {
      await page.waitForSelector('h1', { state: 'visible', timeout: 20000 });
      // Ensure the h1 has real text (title strip painted), not empty shell.
      await page.waitForFunction(
        () => {
          const h = document.querySelector('h1');
          return h && h.textContent && h.textContent.trim().length > 3;
        },
        { timeout: 20000 }
      );
    } catch (e) {
      console.log('  [warn] h1 wait failed for', path, String(e).slice(0, 80));
    }
    // Settle for fonts/layout + lazy nav.
    await page.waitForTimeout(1800);
    const file = `${OUT}/${name}__${vpName}.png`;
    await page.screenshot({ path: file, fullPage: false });
    const h1txt = await page.evaluate(() => (document.querySelector('h1')?.textContent || '').trim().slice(0, 60));
    console.log('shot', file, '| h1:', JSON.stringify(h1txt));
    shots++;
  }
  await ctx.close();
}
await browser.close();
console.log(`DONE ${shots} screenshots`);
