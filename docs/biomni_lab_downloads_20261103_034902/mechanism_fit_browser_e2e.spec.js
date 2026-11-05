import { test, expect } from '@playwright/test';

const forbiddenVisibleText = [
  'Drugs Ranked',
  'RECOMMENDED TESTS',
  'Eligibility Analysis',
  'Actionable Recommendations',
  'Top options',
];

test('bounded mechanism-fit board renders without legacy ranking surfaces', async ({ page }) => {
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('http://127.0.0.1:5173/ayesha/journey/board', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Mechanism-Fit Tumor-Board Packet' })).toBeVisible();
  await expect(page.getByText(/Mechanism overlap is not protocol eligibility/)).toBeVisible();
  await expect(page.getByText(/No ordering is implied/).first()).toBeVisible();

  for (const text of forbiddenVisibleText) {
    await expect(page.getByText(text, { exact: false })).toHaveCount(0);
  }
  await expect(page.getByRole('tab')).toHaveCount(0);

  await page.screenshot({ path: '/mnt/results/mechanism_fit_tumor_board.png', fullPage: true });

  const relevantErrors = consoleErrors.filter((message) =>
    !message.includes('favicon') &&
    !message.includes('profile') &&
    !message.includes('Error fetching agents') &&
    !message.includes('Error fetching alerts') &&
    !message.includes('Failed to load resource')
  );
  expect(relevantErrors).toEqual([]);
});
