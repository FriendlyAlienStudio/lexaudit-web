#!/usr/bin/env node
/**
 * Capture homepage report preview images from the canonical HTML report.
 *
 * Usage:
 *   npm run capture:report:screenshots
 */

import { createServer } from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream, existsSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');
const reportsDir = join(publicDir, 'reports');
const reportUrlPath = 'reports/lexaudit-report-v3.html';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

/** Homepage assets: section index in main.report > section.page */
const CAPTURES = [
  {
    index: 0,
    label: 'Cover',
    base: 'lexaudit-report-v3-cover',
  },
  {
    index: 1,
    label: 'Executive Summary',
    base: 'lexaudit-report-v3-sample',
  },
];

function startStaticServer(root) {
  return new Promise((resolvePromise, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const requestUrl = new URL(req.url ?? '/', 'http://127.0.0.1');
        let pathname = decodeURIComponent(requestUrl.pathname);
        if (pathname.endsWith('/')) pathname += 'index.html';

        const filePath = resolve(join(root, pathname.replace(/^\//, '')));
        if (!filePath.startsWith(resolve(root))) {
          res.writeHead(403);
          res.end('Forbidden');
          return;
        }

        const fileStat = await stat(filePath);
        if (!fileStat.isFile()) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }

        const ext = extname(filePath).toLowerCase();
        res.writeHead(200, {
          'Content-Type': MIME_TYPES[ext] ?? 'application/octet-stream',
        });
        createReadStream(filePath).pipe(res);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      resolvePromise({
        server,
        baseUrl: `http://127.0.0.1:${port}`,
      });
    });

    server.on('error', reject);
  });
}

function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
}

function createRetinaPair(sourcePath, baseName) {
  const hiRes = join(reportsDir, `${baseName}.png`);
  const loRes = join(reportsDir, `${baseName}@1x.png`);

  const sips = spawnSync('sips', ['-g', 'pixelWidth', sourcePath], { encoding: 'utf8' });
  if (sips.status !== 0) {
    throw new Error(`sips failed for ${sourcePath}`);
  }

  const widthMatch = sips.stdout.match(/pixelWidth:\s*(\d+)/);
  const sourceWidth = widthMatch ? Number(widthMatch[1]) : 820;
  const targetWidth = Math.min(596, sourceWidth);

  const copyHi = spawnSync('cp', [sourcePath, hiRes]);
  if (copyHi.status !== 0) throw new Error(`Failed to write ${hiRes}`);

  const resize = spawnSync('sips', ['--resampleWidth', String(targetWidth), hiRes, '--out', loRes]);
  if (resize.status !== 0) throw new Error(`Failed to write ${loRes}`);
}

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    console.error(`Error: Playwright is not installed.

Run:
  npm install
  npx playwright install chromium
`);
    process.exit(1);
  }
}

async function main() {
  const htmlPath = join(reportsDir, 'lexaudit-report-v3.html');
  if (!existsSync(htmlPath)) {
    console.error(`Error: Report HTML not found: ${htmlPath}`);
    process.exit(1);
  }

  const playwright = await loadPlaywright();
  const { server, baseUrl } = await startStaticServer(publicDir);
  const pageUrl = `${baseUrl}/${reportUrlPath}`;

  console.log(`Capturing from: ${pageUrl}`);

  const browser = await playwright.chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: 980, height: 1400 },
      deviceScaleFactor: 2,
    });

    await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 120_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: 'body { background: #eae6db !important; padding: 24px 0 !important; }',
    });

    const sections = page.locator('main.report > section.page');
    const count = await sections.count();

    for (const capture of CAPTURES) {
      if (capture.index >= count) {
        throw new Error(`Report page index ${capture.index} (${capture.label}) not found.`);
      }

      const section = sections.nth(capture.index);
      await section.scrollIntoViewIfNeeded();
      const tempPath = join(reportsDir, `${capture.base}.capture.png`);
      await section.screenshot({ path: tempPath, type: 'png', animations: 'disabled' });
      createRetinaPair(tempPath, capture.base);
      unlinkSync(tempPath);

      console.log(`  ${capture.label} → ${capture.base}.png, ${capture.base}@1x.png`);
    }
  } finally {
    await browser.close();
    await closeServer(server);
  }

  console.log('Screenshot capture complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
