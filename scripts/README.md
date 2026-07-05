# LexAudit report export scripts

## PDF — `export-report-pdf.mjs` (RR-002)

Generates a client-ready PDF from the canonical HTML report using Playwright/Chromium.

```bash
npm run build          # optional; ensures dist assets exist for preview workflows
npm run export:report:pdf
```

Default output: `public/reports/lexaudit-report-v3.pdf`

The script serves `public/` over HTTP so absolute asset paths (`/reports/report.css`, `/logo.svg`) and Google Fonts resolve correctly, then prints with `@media print` rules.

## Homepage screenshots — `capture-report-screenshots.mjs`

Regenerates homepage preview images from the canonical HTML report:

```bash
npm run capture:report:screenshots
```

Outputs:

- `public/reports/lexaudit-report-v3-cover.png` (+ `@1x`) — cover page
- `public/reports/lexaudit-report-v3-sample.png` (+ `@1x`) — executive summary page

Full page margins and footers are preserved (element screenshots of each `.page` section).

Dependencies:

```bash
npm install
npx playwright install chromium
```

## DOCX — planned (RR-003)

DOCX export is **not** implemented here yet.

Architecture:

- **HTML/PDF** — visual renderer; HTML is canonical for layout.
- **DOCX** — must be generated from structured report data in `legal-ai-audit`, not by converting the visual HTML.

Reason:

- Lawyers need editable paragraphs, tables, and lists in Word.
- HTML-to-DOCX conversion typically produces poor Hebrew/RTL fidelity or embeds layout as images.
- A separate data-driven DOCX renderer (likely via RR-007 report-data pipeline) should map section hierarchy, facts, ARL, clause tables, exposures, and recommendations into a simpler legal-document Word template.

Prerequisite work:

1. Stable structured report-data object (RR-007).
2. DOCX template mapping per section type.
3. RTL paragraph styles in Word (Hebrew body, LTR metadata where needed).

See `legal-ai-audit/docs/roadmaps/REPORT_SYSTEM_ROADMAP.md` for status.
