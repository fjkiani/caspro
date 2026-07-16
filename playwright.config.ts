import { defineConfig, devices } from '@playwright/test';

/**
 * CrisPRO W5 Release-A Playwright config.
 *
 * Specs live in /mnt/shared-workspace/product_truth/W5_frontend/playwright/
 * so they persist across sandboxes and can be re-run against any dev preview.
 *
 * Screenshots + HTML report land in /mnt/shared-workspace/product_truth/W5_frontend/
 * screenshots/{desktop,mobile}/ and playwright-report/.
 */
export default defineConfig({
  testDir: '/mnt/shared-workspace/product_truth/W5_frontend/playwright',
  outputDir: '/workspace/caspro/playwright-test-results',
  fullyParallel: false, // dev server single origin, avoid overload
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: '/mnt/shared-workspace/product_truth/W5_frontend/playwright/report.json' }],
    ['html', { outputFolder: '/workspace/caspro/playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: process.env.RELEASE_A_BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    },
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      // iPhone 13 emulation but forced onto the Chromium engine (WebKit isn't
      // installed on the sandbox; we only need the viewport + userAgent shape,
      // not real Safari fidelity).
      name: 'mobile-chromium',
      use: {
        ...devices['iPhone 13'],
        defaultBrowserType: 'chromium',
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  // dev server is started outside Playwright so screenshots step can reuse it.
  // webServer: { command: 'npm run dev', url: 'http://127.0.0.1:3000', reuseExistingServer: true },
});
