#!/usr/bin/env node
/**
 * Export a LexAudit HTML report to PDF using Playwright/Chromium.
 *
 * The HTML report is the canonical visual renderer. This script prints it
 * with @media print rules — no screenshots or image-only export.
 *
 * Usage:
 *   npm run export:report:pdf
 *   node scripts/export-report-pdf.mjs --url http://127.0.0.1:5173/reports/lexaudit-report-v3.html
 *   node scripts/export-report-pdf.mjs --output public/reports/lexaudit-report-v3.pdf
 */

import { createServer } from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');

const DEFAULT_REPORT = 'reports/lexaudit-report-v3.html';
const DEFAULT_OUTPUT = 'public/reports/lexaudit-report-v3.pdf';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function parseArgs(argv) {
  const args = { input: DEFAULT_REPORT, output: DEFAULT_OUTPUT, url: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--url') {
      args.url = argv[++i];
    } else if (arg === '--input') {
      args.input = argv[++i];
    } else if (arg === '--output') {
      args.output = argv[++i];
    } else if (arg === '--help' || arg === '-h') {
      console.log(`Usage: node scripts/export-report-pdf.mjs [options]

Options:
  --input <path>   Report HTML path relative to public/ (default: ${DEFAULT_REPORT})
  --output <path>  PDF output path (default: ${DEFAULT_OUTPUT})
  --url <url>      Full report URL (skips local static server; use for vite dev/preview)
  --help           Show this help
`);
      process.exit(0);
    }
  }
  return args;
}

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

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    console.error(`Error: Playwright is not installed.

Install it with:
  npm install
  npx playwright install chromium

Then run:
  npm run export:report:pdf
`);
    process.exit(1);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outputPath = resolve(projectRoot, args.output);
  mkdirSync(dirname(outputPath), { recursive: true });

  const playwright = await loadPlaywright();

  let pageUrl = args.url;
  let server;

  if (!pageUrl) {
    const reportRelative = args.input.replace(/^public\//, '').replace(/^\//, '');
    const htmlPath = join(publicDir, reportRelative);
    if (!existsSync(htmlPath)) {
      console.error(`Error: Report HTML not found: ${htmlPath}`);
      process.exit(1);
    }

    const staticServer = await startStaticServer(publicDir);
    server = staticServer.server;
    pageUrl = `${staticServer.baseUrl}/${reportRelative}`;
  }

  console.log(`Rendering: ${pageUrl}`);
  console.log(`Output:    ${outputPath}`);

  const browser = await playwright.chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 120_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    console.log('PDF export complete.');
  } finally {
    await browser.close();
    if (server) await closeServer(server);
  }
}

main().catch((err) => {
  if (String(err.message || err).includes('Executable doesn\'t exist')) {
    console.error(`Error: Playwright Chromium browser is not installed.

Run:
  npx playwright install chromium

Then retry:
  npm run export:report:pdf
`);
    process.exit(1);
  }

  console.error(err);
  process.exit(1);
});
