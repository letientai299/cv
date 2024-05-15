// @ts-check
import playwright from 'playwright';

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.pdf({ path: `dist/cv.pdf` });
  await browser.close();
})();
