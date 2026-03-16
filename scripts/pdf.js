// @ts-check
import { mkdirSync } from 'fs';
import playwright from 'playwright';

const url = process.env.DEV_URL || 'http://localhost:5173';

const browser = await playwright.chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  // Wait for fonts to finish loading
  await page.waitForFunction(() => document.fonts.ready);
  mkdirSync('dist', { recursive: true });
  await page.pdf({ path: 'dist/cv.pdf' });
} finally {
  await browser.close();
}
