// @ts-check
import { mkdirSync } from 'fs';
import playwright from 'playwright';
import { createServer } from 'vite';

const server = await createServer({ server: { port: 0 } });
await server.listen();
const url = server.resolvedUrls?.local[0];
if (!url) throw new Error('vite dev server has no local url');

const browser = await playwright.chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  mkdirSync('dist', { recursive: true });
  await page.pdf({ path: 'dist/cv.pdf' });
} finally {
  await browser.close();
  await server.close();
}
