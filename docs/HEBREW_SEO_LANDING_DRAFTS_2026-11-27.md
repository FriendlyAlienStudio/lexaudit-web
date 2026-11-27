# LexAudit — Hebrew SEO Landing-Page Strategy & Review-Gated Drafts (2026-11-27)

> **STATUS: DRAFT — REQUIRES FOUNDER / LEGAL REVIEW BEFORE PUBLICATION**
>
> This document defines the Hebrew SEO landing-page strategy around four observed Google Search Console queries (`בדיקת הסכם`, `בדיקת חוזה`, `הסכם השקעה`, `הסכם בעלי מניות`) and provides four substantive, review-gated Hebrew landing-page drafts. **No public pages have been published from these drafts.** Every draft must be reviewed and approved by the founder / legal counsel before any HTML route is added to production or `sitemap.xml`.

---

## 1. Strategic Context & Verified Product Guardrails

All copy in this document is strictly bounded by LexAudit's verified capabilities as of November 2026:

| Capability Area | Verified Scope (Allowed) | Out of Scope (Strictly Forbidden) |
|---|---|---|
| **Inputs** | `.txt`, `.docx`, and `.pdf` with a clean searchable text layer (no OCR; scanned/image PDFs may yield incomplete extraction). | Scanned PDF OCR guarantees, Word track-changes / version redlining, multi-document comparison. |
| **Output Deliverable** | Structured Hebrew review report (HTML & PDF): Executive Summary, Key Points for Review, Client Exposures, Deterministic Contract Facts, ARL Analysis, Taxonomy Clause Review (`קיים` / `חסר` / `לא ברור`), Recommendations, and Counsel's Notes space. | Interactive chat assistant, automated contract drafting/rewriting, automatic redline generation. |
| **Methodology** | Deterministic rule-based fact extraction separated from interpretive reasoning; ARL framework (Asset · Relationship · Transformation / Lifecycle · Future Scenarios); category-specific taxonomy; materiality ranking. | Unverified accuracy percentages, automated legal conclusions, "replaces a lawyer" claims. |
| **Supported Agreement Families** | `commercial` (incl. software development, marketing services, procurement/vendor, event production), `nda`, `employment`, `lease`, `commercial_lease`, `sale_purchase`, `co_ownership` (shareholders, founders, JV, family business), `financing` (incl. SAFE-style investment agreements), `franchise`, `distribution`. | Litigation briefs, regulatory filings, court pleadings, tax opinions. |
| **Legal Positioning & Privacy** | Preliminary review work product only (`דוח לצורכי סקירה ראשונית בלבד. אינו מהווה ייעוץ משפטי.`); augments legal judgment; client documents are confidential and never used to train public AI models. | Legal advice claims, ISO/SOC2 certification claims, automated sign-off. |
| **Access Model** | Private beta (`hello@lexaudit.ai` for demo/access; allowlisted users sign in at `/beta/`). | Self-serve instant signup or public pricing tiers. |

---

## 2. Query Analysis, Search Intent & Audience Mapping

| Target Query | Primary Search Intent | Primary Audience | Proposed Canonical URL (Post-Approval) | Primary Supported Families / Subtypes |
|---|---|---|---|---|
| **`בדיקת הסכם`** | Operational / methodological intent: how to systematically audit an agreement before signing or advising a client (structured first-pass review workflow). | Israeli commercial lawyers, solo/boutique practitioners, in-house legal counsel. | `/he/agreement-review/` (or `/he/bdikat-heskem/`) | `commercial`, `nda`, `employment`, `franchise`, `distribution`, `co_ownership`, `financing` |
| **`בדיקת חוזה`** | Broad commercial & transaction review intent: evaluating a contract across common Israeli practice areas (commercial, leases, employment, sale/purchase) to surface missing protections and client exposure. | Israeli lawyers, law firms, in-house teams, and founders/executives working alongside counsel. | `/he/contract-review/` (or `/he/bdikat-choze/`) | `commercial`, `lease`, `commercial_lease`, `employment`, `sale_purchase`, `nda`, `franchise`, `distribution` |
| **`הסכם השקעה`** | High-intent transactional query: understanding investment / financing mechanics (SAFE, valuation caps, dilution, liquidation/conversion mechanics, governance hooks) before signing or negotiating. | Startup & tech lawyers, corporate counsel, founders preparing for counsel review, angel/VC legal teams. | `/he/investment-agreement/` (or `/he/heskem-hashkaa/`) | `financing` (including SAFE-style investment agreements) |
| **`הסכם בעלי מניות`** | High-intent corporate governance query: reviewing ownership splits, vesting, board/reserved matters, transfer restrictions, drag/tag-along, deadlock, and exit mechanics — directly backed by LexAudit's live V3 sample report. | Corporate/commercial lawyers, founders working with counsel, investors and minority/majority shareholders' counsel. | `/he/shareholders-agreement/` (or `/he/heskem-baalei-menayot/`) | `co_ownership` (shareholders, founders, joint venture, family business) |

---

## 3. Anti-Doorway Differentiation Rules

Google's spam policies explicitly penalize doorway pages that target near-synonym queries (`בדיקת הסכם` vs. `בדיקת חוזה`) with swapped keywords and identical structure. Before publishing both general pages, enforce these mandatory differentiation rules:

1. **Distinct Angle & User Job-to-be-Done:**
   - **`בדיקת הסכם`** focuses on **structured agreement methodology** — how LexAudit reconstructs an agreement's legal architecture (facts before reasoning, ARL lifecycle mapping, taxonomy clause status `קיים` / `חסר` / `לא ברור`, materiality ranking) as a repeatable first-pass memorandum for counsel.
   - **`בדיקת חוזה`** focuses on **practice-area contract coverage & practical triage** — how LexAudit adapts its category-specific review taxonomy across Israeli contract families (`commercial`, `lease`, `commercial_lease`, `employment`, `nda`, `sale_purchase`, `franchise`, `distribution`), input requirements (`.docx`/`.pdf`/`.txt` with clean text layer), and concrete exposure categories.
   - **Consolidation fallback:** If during founder review the two general pages feel too close for the current site size, **publish only one canonical general page** (targeting `בדיקת חוזה` and naturally covering `בדיקת הסכם`, or vice versa) and prioritize the two vertical pages (`הסכם בעלי מניות` and `הסכם השקעה`) which have zero cannibalization risk with `/he/`.
2. **Unique Substantive Value per Page (>70% unique copy):**
   - Each page must include a **unique agreement-specific review checklist / mechanism breakdown**, **unique ARL worked framing** for that agreement type, **unique FAQ items** (3–4 page-specific Q&As, not duplicated verbatim from `/he/faq/`), and **specific references to real report sections**.
3. **Zero Thin Keyword-Stuffing:**
   - Natural Hebrew legal phrasing used by Israeli commercial lawyers (`מבנה ההסכם`, `חשיפות מרכזיות ללקוח`, `סקירת סעיפים`, `עובדות לפני ניתוח`, `מבוי סתום`, `זכויות יציאה`, `מנגנוני המרה ודילול`).
4. **Live Proof Anchor:**
   - `/he/shareholders-agreement/` links directly to `/reports/lexaudit-report-v3.html` (which is an actual Shareholders Agreement V3 report) as live proof of output quality. Other pages reference the sample report explicitly as a **format & methodology demonstration** (clearly noting the sample is a shareholders agreement).

---

## 4. Internal Linking Architecture

```text
                        ┌──────────────────────┐
                        │   /he/ (Hebrew Hub)  │
                        │  בדיקת חוזים והסכמים │
                        └──────────┬───────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌─────────────────┐      ┌───────────────────┐     ┌──────────────────────┐
│ /he/faq/        │      │ Proposed Vertical │     │ /reports/lexaudit-   │
│ שאלות נפוצות    │◄────►│ & Workflow Pages  │────►│ report-v3.html       │
└─────────────────┘      │ • בדיקת הסכם      │     │ (Live V3 Sample)     │
         ▲               │ • בדיקת חוזה      │     └──────────────────────┘
         │               │ • הסכם השקעה      │               ▲
         │               │ • הסכם בעלי מניות │               │
         │               └─────────┬─────────┘               │
         │                         │                         │
         └─────────────────────────┴─────────────────────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │    /comparison/      │
                        │   (Methodology vs.   │
                        │  Traditional / AI)   │
                        └──────────────────────┘
```

**Linking rules once published:**
- Every Hebrew landing page links to:
  1. `/he/` (Hebrew homepage hub)
  2. `/reports/lexaudit-report-v3.html` (live sample report with `data-analytics-event="view_sample_report"`)
  3. `/he/faq/` (deep product Q&A)
  4. `/comparison/` (methodology comparison against traditional review and generic AI)
  5. `mailto:hello@lexaudit.ai` (demo request with `data-analytics-event="contact_click"`)
  6. 1–2 sibling Hebrew landing pages where contextually relevant (e.g., `הסכם השקעה` ↔ `הסכם בעלי מניות` since financing rounds directly interact with shareholder rights and cap tables; `בדיקת הסכם` ↔ `בדיקת חוזה` if both are published).
- From `/he/`: link the corresponding cards in the `סוגי הסכמים` section directly to the approved vertical landing pages.
- From `/reports/lexaudit-report-v3.html`: screen-only navigation bar already links back to `/he/`, `/he/faq/`, and `/`.

---

## 5. Review-Gated Hebrew Landing-Page Drafts

---

### Draft 1: `בדיקת הסכם` — מתודולוגיית סקירה מובנית לעורכי דין

> **DRAFT — REQUIRES FOUNDER / LEGAL REVIEW BEFORE PUBLICATION**
> - **Target Query:** `בדיקת הסכם`
> - **Proposed URL:** `/he/agreement-review/`
> - **Audience:** Israeli commercial lawyers, law firm associates/partners, in-house legal counsel
> - **Primary Differentiation:** Deep dive into the *structured first-pass methodology* (facts before reasoning, ARL model, taxonomy review `קיים` / `חסר` / `לא ברור`, materiality ranking)

#### SEO Metadata
- **Title (`<title>`):** `בדיקת הסכם לעורכי דין — ניתוח מבנה ההסכם לפני הערכת סיכון | LexAudit`
- **Meta Description:** `בדיקת הסכם בסדר עבודה של עורך דין מסחרי: חילוץ עובדות חוזה, מיפוי מערכת היחסים (ARL), סקירת סעיפים קיימים וחסרים, ודוח סקירה מקצועי בעברית.`
- **H1:** `בדיקת הסכם מתחילה בהבנת המבנה — לא ברשימת אזהרות`

#### Hero Copy
כשמגיע לשולחן הסכם חדש, השאלה הראשונה של עורך הדין אינה אילו סעיפים לצבוע באדום, אלא איך ההסכם עובד כמערכת אחת: מי הצדדים, מהו הנכס או ההתחייבות שבמרכז העסקה, כיצד בנויה מערכת היחסים לאורך זמן, ואילו מנגנונים חסרים או לא ברורים.

**LexAudit** הוא כלי לבדיקת הסכמים שנבנה על ידי עורכת דין עבור עורכי דין וצוותים משפטיים בישראל. מעלים קובץ `.docx`, `.pdf` (בעל שכבת טקסט נקייה) או `.txt`, ומקבלים **דוח סקירה מקצועי בעברית** (HTML ו-PDF) המאורגן כמוצר עבודה משפטי — מוכן לעיון, לתיק העניין ולדיון עם שותף או לקוח.

- **CTA ראשי:** בקשת הדגמה (`mailto:hello@lexaudit.ai`)
- **CTA משני:** צפייה בדוח לדוגמה (`/reports/lexaudit-report-v3.html`)

#### חלק 1: מה קורה בפועל בתהליך בדיקת הסכם ב-LexAudit?
במקום תשובת צ'אט חד-פעמית שמערבבת בין עובדות לפרשנות, LexAudit מפעיל רצף סקירה קבוע ובר-שחזור:

1. **חילוץ עובדות דטרמיניסטי (עובדות לפני ניתוח):** זיהוי והצגה נפרדת של עובדות ההסכם — צדדים, תקופה, תמורה, מנגנוני סיום, סמכות שיפוט ונתונים ייחודיים לקטגוריה — לפני שמתחיל הניתוח הפרשני. כך ניתן לאמת את התשתית העובדתית במבט אחד.
2. **סיווג ההסכם והתאמת מסגרת הבחינה:** זיהוי סוג ההסכם (מסחרי, שירותים, סודיות, העסקה, שכירות, זיכיון, הפצה, בעלות משותפת או מימון) והפעלת טקסונומיית סעיפים ייעודית לסוג העסקה.
3. **מודל ARL (נכס · יחסים · מחזור חיים · תרחישים עתידיים):** שחזור מערכת היחסים המשפטית והמסחרית, השלבים המרכזיים בחיי ההסכם (כניסה, תפעול, שינוי/הפרה, יציאה) והתרחישים שהחוזה נדרש להסדיר.
4. **סקירת סעיפים מול הטקסונומיה (`קיים` / `חסר` / `לא ברור`):** סימון שיטתי של הוראות שקיימות בהסכם, הוראות חסרות שחשוב לבחון, והוראות שניסוחן מעורפל או חלקי.
5. **דירוג לפי מהותיות וחשיפות ללקוח:** ריכוז חשיפות מרכזיות ללקוח לפי תחומי סיכון והמלצות ממוקדות לבדיקה לפני חתימה, לצד שטח ייעודי להערות עורך הדין.

#### חלק 2: למי מתאימה בדיקת הסכם מובנית?
- **עורכי דין מסחריים במשרדים:** קיצור שלב ההתמצאות הראשונית בהסכם חדש לפני העמקה משפטית וניסוח הערות ללקוח.
- **יועצים משפטיים פנימיים (In-House):** אחידות במבנה הסקירה הראשונית מול הנהלה ומחלקות עסקיות.
- **יזמים ומנהלים העובדים עם עורך דין:** הכנת תמונת מצב מסודרת של מבנה ההסכם ונקודות פתוחות לקראת ייעוץ משפטי מקצועי.

#### חלק 3: מה LexAudit כן עושה — ומה הוא אינו עושה
- **כן:** חילוץ עובדות מופרד מניתוח, דוח מובנה בעברית (HTML/PDF), סיווג לפי משפחות הסכמים, זיהוי סעיפים קיימים/חסרים/לא ברורים, חשיפות והמלצות לבדיקה.
- **לא:** LexAudit אינו מחליף עורך דין, אינו מהווה ייעוץ משפטי, אינו כלי צ'אט לניסוח חוזים אוטומטי, ואינו מבצע השוואת גרסאות (redlining) או פענוח מסמכים סרוקים ללא שכבת טקסט (OCR).
- **פרטיות:** חוזי לקוחות מטופלים כחסויים ואינם משמשים לאימון מודלים ציבוריים.

#### שאלות נפוצות קצרות (ייחודיות לעמוד)
- **מה ההבדל בין בדיקת הסכם ב-LexAudit לבין הדבקת הסכם בכלי AI כללי?** כלי AI כללי בנוי לשיחה ותלוי בהנחיה; LexAudit מפעיל תהליך סקירה קבוע שמפריד בין עובדות לפרשנות ומפיק מזכר מובנה בעברית. (קישור ל-[מסגרת ההשוואה](/comparison/)).
- **אילו פורמטים נתמכים להעלאת הסכם?** קבצי `.docx`, `.pdf` עם שכבת טקסט נקייה, ו-`.txt`. מסמכים סרוקים ללא שכבת טקסט עלולים להניב חילוץ חלקי.
- **האם הדוח הוא סופי לחתימה?** לא. כל דוח כולל הבהרה מפורשת כי מדובר בדוח לצורכי סקירה ראשונית בלבד ואינו מהווה ייעוץ משפטי.

#### הבהרה משפטית בתחתית העמוד
> LexAudit — דוח לצורכי סקירה ראשונית בלבד. אינו מהווה ייעוץ משפטי. שיקול הדעת המשפטי, האסטרטגיה והמשא ומתן נותרים בידי עורך הדין.

#### קישורים פנימיים מומלצים
- `/he/` (עמוד הבית בעברית) · `/reports/lexaudit-report-v3.html` (דוח לדוגמה — פורמט V3) · `/he/faq/` (שאלות נפוצות) · `/comparison/` (השוואה מול סקירה מסורתית ו-AI כללי)

---

### Draft 2: `בדיקת חוזה` — כיסוי משפחות חוזים מסחריים, שכירות, העסקה ומכר בישראל

> **DRAFT — REQUIRES FOUNDER / LEGAL REVIEW BEFORE PUBLICATION**
> - **Target Query:** `בדיקת חוזה`
> - **Proposed URL:** `/he/contract-review/`
> - **Audience:** Israeli lawyers, law firms, in-house legal teams, commercial practitioners reviewing varied contract types
> - **Primary Differentiation:** Practice-area coverage across LexAudit's supported Israeli contract families (`commercial`, `lease`, `commercial_lease`, `employment`, `nda`, `sale_purchase`, `franchise`, `distribution`) and how taxonomy-tailored review adapts to each contract type

#### SEO Metadata
- **Title (`<title>`):** `בדיקת חוזה לעורכי דין — חוזים מסחריים, שכירות, העסקה ועוד | LexAudit`
- **Meta Description:** `בדיקת חוזה מותאמת לסוג העסקה: חוזים מסחריים ושירותים, חוזה שכירות, הסכם העסקה, NDA, מכר, זיכיון והפצה. העלאת DOCX/PDF וקבלת דוח מקצועי בעברית.`
- **H1:** `בדיקת חוזה המותאמת לסוג העסקה — לא רשימת בדיקה גנרית`

#### Hero Copy
בדיקת חוזה שכירות מסחרי אינה דומה לבדיקת חוזה פיתוח תוכנה, והסכם הפצה דורש בחינה שונה מהסכם העסקה או מהסכם מכר. כדי שסקירה ראשונית תועיל לעורך הדין, היא חייבת להישען על מסגרת בחינה שמתאימה לאופי העסקה.

**LexAudit** מסווג את החוזה המועלה ומפעיל עליו **טקסונומיית בדיקה ייעודית לקטגוריה**, תוך הפרדה בין עובדות החוזה שחולצו באופן דטרמיניסטי לבין ניתוח מערכת היחסים (ARL), מיפוי סעיפים (`קיים` / `חסר` / `לא ברור`) וזיהוי חשיפות מרכזיות ללקוח — בדוח מקצועי בעברית (HTML ו-PDF).

- **CTA ראשי:** בקשת הדגמה (`mailto:hello@lexaudit.ai`)
- **CTA משני:** צפייה בדוח לדוגמה (`/reports/lexaudit-report-v3.html`)

#### חלק 1: סוגי החוזים הנתמכים בבטא הפרטית
- **חוזים מסחריים והסכמי שירותים (`commercial`):** כולל תת-סוגים כגון פיתוח תוכנה, שירותי שיווק, רכש/ספק והפקת אירועים (כאשר מזוהים במסמך) — מיקוד בהיקף שירותים, תמורה, קניין רוחני, הגבלת אחריות, שיפוי וסיום.
- **חוזי שכירות — מגורים ומסחרית (`lease`, `commercial_lease`):** תקופת שכירות ואופציות, דמי שכירות והצמדה, ביטחונות וערבויות, שימושים מותרים, תחזוקה, היטלים ופינוי.
- **הסכמי העסקה (`employment`):** תנאי שכר ותגמול, סודיות וקניין רוחני, הגבלת תחרות, תקופת הודעה מוקדמת וסיום יחסי עבודה.
- **הסכמי סודיות (`nda`):** הגדרת מידע סודי, חריגים, משך התחייבות, השבת חומרים וסעדים בהפרה.
- **הסכמי מכר נדל״ן (`sale_purchase`):** תיאור הנכס, תמורה ולוח תשלומים, הצהרות צדדים, מועדי מסירה, ביטחונות ותרופות בהפרה.
- **הסכמי זיכיון והפצה (`franchise`, `distribution`):** טריטוריה ובלעדיות, יעדים מסחריים, תמלוגים/מחירים, שימוש בסימני מסחר, פיקוח וסיום התקשרות.
- **הסכמי בעלות משותפת ומימון (`co_ownership`, `financing`):** הסכמי בעלי מניות, מייסדים, מיזם משותף, עסק משפחתי והסכמי השקעה/SAFE.

#### חלק 2: מה כולל דוח בדיקת החוזה?
כל חוזה שמועלה (בקובץ `.docx`, `.pdf` עם שכבת טקסט נקייה או `.txt`) מפיק דוח בעברית במבנה אחיד:
- **תקציר מנהלים** עם רמת סיכון כוללת וספירת סעיפים קיימים, חסרים ולא ברורים.
- **נקודות מרכזיות לבדיקה מקצועית** המדורגות לפי מהותיות.
- **עובדות החוזה** בחלק נפרד לאימות מהיר לפני קריאת הניתוח.
- **ניתוח ARL** המשחזר את הנכס, מערכת היחסים, שלבי מחזור החיים והתרחישים העתידיים.
- **טבלת סקירת סעיפים** לפי טקסונומיית הקטגוריה, עם תיעוד שקוף.
- **חשיפות מרכזיות ללקוח, המלצות לבדיקה ושטח להערות עורך הדין.**

#### חלק 3: דרישות קובץ ומגבלות שחשוב להכיר מראש
- להעלאה מיטבית מומלץ להשתמש בקובץ `.docx`, `.txt`, או `.pdf` בעל שכבת טקסט נקייה (ניתן לסימון והעתקה). LexAudit אינו מפעיל OCR על מסמכים סרוקים, ולכן קבצים סרוקים עלולים להניב חילוץ חלקי.
- המערכת אינה מבצעת השוואת גרסאות (redlining) ואינה מחליפה עריכה משפטית ידנית.
- המסמכים המועלים נשמרים בסודיות ואינם משמשים לאימון מודלים ציבוריים.

#### שאלות נפוצות קצרות (ייחודיות לעמוד)
- **מה קורה אם החוזה כולל מרכיבים משני תחומים (למשל שירותים עם קניין רוחני וסודיות)?** המערכת מסווגת את משפחת החוזה הראשית (ותת-הסוג כשמזוהה) ובוחנת את מנגנוני ההסכם הרלוונטיים במסגרת מודל ARL והטקסונומיה.
- **האם ניתן לראות איך נראה דוח מלא לפני הצטרפות לבטא?** כן — ניתן לפתוח את [הדוח המלא לדוגמה](/reports/lexaudit-report-v3.html) (שהופק על הסכם בעלי מניות) כדי להתרשם מהמבנה, העומק והפורמט.
- **האם בדיקת החוזה ב-LexAudit מהווה חוות דעת משפטית?** לא. הדוח מיועד לסקירה ראשונית בלבד ואינו מהווה ייעוץ משפטי.

#### הבהרה משפטית בתחתית העמוד
> LexAudit — דוח לצורכי סקירה ראשונית בלבד. אינו מהווה ייעוץ משפטי.

#### קישורים פנימיים מומלצים
- `/he/` · `/he/shareholders-agreement/` · `/he/investment-agreement/` · `/reports/lexaudit-report-v3.html` · `/he/faq/`

---

### Draft 3: `הסכם השקעה` — בדיקה מובנית של הסכמי השקעה ו-SAFE

> **DRAFT — REQUIRES FOUNDER / LEGAL REVIEW BEFORE PUBLICATION**
> - **Target Query:** `הסכם השקעה`
> - **Proposed URL:** `/he/investment-agreement/`
> - **Audience:** Startup/tech lawyers, corporate counsel, founders working with counsel, investors' legal teams
> - **Primary Supported Family:** `financing` (including SAFE-style investment agreements)

#### SEO Metadata
- **Title (`<title>`):** `בדיקת הסכם השקעה ו-SAFE לעורכי דין — מיפוי מנגנונים וחשיפות | LexAudit`
- **Meta Description:** `בדיקת הסכם השקעה ו-SAFE בסיוע LexAudit: חילוץ עובדות ההסכם, מיפוי מערכת היחסים (ARL), בדיקת סעיפים קיימים וחסרים, וזיהוי חשיפות בדוח מקצועי בעברית.`
- **H1:** `בדיקת הסכם השקעה: להבין את מנגנוני המימון והדילול לפני חתימה`

#### Hero Copy
הסכם השקעה — בין אם מדובר בהסכם השקעה ישיר ובין אם בהסכם מימון מסוג SAFE — מעצב את מבנה ההון, את הזכויות הכלכליות ואת מערך השליטה בחברה לשנים קדימה. פרט אחד חסר או מעורפל בתנאי ההמרה, ההגנות מדילול או תנאי הסגירה עלול לשנות מהותית את תוצאת העסקה בסבב הבא או באקזיט.

**LexAudit** תומך בבדיקה ראשונית מובנית של הסכמי מימון והשקעה (משפחת `financing`, כולל הסכמי SAFE) ומפיק **דוח סקירה מקצועי בעברית** (HTML ו-PDF) שמפריד בין עובדות העסקה לבין הניתוח המשפטי, מציף סעיפים חסרים או לא ברורים ומדרג את החשיפות המרכזיות ללקוח.

- **CTA ראשי:** בקשת הדגמה (`mailto:hello@lexaudit.ai`)
- **CTA משני:** צפייה במבנה הדוח לדוגמה (`/reports/lexaudit-report-v3.html`) *(הערה: הדוח לדוגמה הוא על הסכם בעלי מניות ומדגים את פורמט הדוח האחיד של LexAudit)*

#### חלק 1: מה נבחן בסקירה ראשונית של הסכם השקעה?
במסגרת משפחת הסכמי המימון (`financing` / SAFE), LexAudit מארגן את הבדיקה הראשונית סביב ארבע שכבות משלימות:

1. **חילוץ עובדות העסקה (לפני פרשנות):** זיהוי הצדדים, סכום ההשקעה, מועדים ותנאים מתלים, מטבע, דין חל וסמכות שיפוט — בחלק נפרד לאימות מהיר.
2. **מבנה ההסכם ומחזור חיי ההשקעה (מודל ARL):**
   - **נכס:** ההון המושקע והזכויות הכלכליות/המניות שיוקצו או יומרו כנגדו.
   - **יחסים:** מאזן הזכויות והחובות בין החברה/המייסדים לבין המשקיע.
   - **מחזור חיים ותרחישים עתידיים:** כניסת הכסף, סבב גיוס עתידי (Qualified Financing), אירוע נזילות/אקזיט, פירוק, או פקיעה/אי-המרה.
3. **סקירת סעיפים מול טקסונומיית המימון (`קיים` / `חסר` / `לא ברור`):** בחינת קיומם ובהירותם של מנגנונים מרכזיים כגון מנגנוני המרה (שווי תקרה / הנחה ב-SAFE), הצהרות ומצגים, שימוש בכספי ההשקעה, זכויות מידע, הגבלות והתחייבויות החברה, ויישוב סכסוכים.
4. **חשיפות ללקוח והמלצות לבדיקה:** מיפוי נקודות עמימות וחשיפות כספיות, שליטה ואחריות, עם רשימת נקודות ממוקדת להמשך עבודת עורך הדין ומו״מ.

#### חלק 2: הקשר שבין הסכם השקעה להסכם בעלי מניות
בעסקאות גיוס הון בישראל, הסכם ההשקעה אינו פועל בחלל ריק — הוא משתלב עם [הסכם בעלי המניות](/he/shareholders-agreement/) ועם תקנון החברה. דוח הסקירה הראשונית של LexAudit מאפשר לעורך הדין (וליזמים העובדים עמו) לאתר במהירות איפה הסכם ההשקעה יוצר התחייבויות או זכויות שדורשות תיאום מול מערך בעלי המניות הקיים.

#### חלק 3: גבולות הכלי ואחריות מקצועית
- קבצים נתמכים: `.docx`, `.pdf` עם שכבת טקסט נקייה, ו-`.txt` (ללא OCR לקבצים סרוקים).
- LexAudit אינו מבצע חישובי Cap Table אוטומטיים, אינו מנסח תיקונים בהסכם ואינו מבצע redlining בין טיוטות.
- חוזים המועלים נשמרים בסודיות ואינם משמשים לאימון מודלים ציבוריים.
- הדוח מיועד לסקירה ראשונית בלבד ואינו מהווה ייעוץ משפטי.

#### שאלות נפוצות קצרות (ייחודיות לעמוד)
- **האם LexAudit תומך גם בהסכמי SAFE וגם בהסכמי השקעה קלאסיים?** כן, בבטא הפרטית משפחת הסכמי המימון (`financing`) כוללת תמיכה גם בהסכמי השקעה מסוג SAFE.
- **האם יזמים יכולים להשתמש בדוח כהכנה לפני פגישה עם עורך הדין?** כן — הדוח מארגן את עובדות ההסכם, הסעיפים החסרים והנקודות הפתוחות, אך קבלת החלטות וניהול המו״מ נותרים בידי עורך הדין.
- **האם ניתן להעלות הסכם השקעה באנגלית ולקבל דוח בעברית?** הדוח המופק ב-LexAudit הוא דוח סקירה מקצועי בעברית. (הערה לבדיקת מייסדת: לאשר ניסוח מדויק לגבי תמיכת קלט באנגלית לעסקאות SAFE לפני פרסום).

#### הבהרה משפטית בתחתית העמוד
> LexAudit — דוח לצורכי סקירה ראשונית בלבד. אינו מהווה ייעוץ משפטי.

#### קישורים פנימיים מומלצים
- `/he/shareholders-agreement/` (הסכם בעלי מניות) · `/he/` · `/reports/lexaudit-report-v3.html` · `/he/faq/` · `/comparison/`

---

### Draft 4: `הסכם בעלי מניות` — בדיקת הסכם בעלי מניות ומייסדים (כולל דוח V3 חי לדוגמה)

> **DRAFT — REQUIRES FOUNDER / LEGAL REVIEW BEFORE PUBLICATION**
> - **Target Query:** `הסכם בעלי מניות`
> - **Proposed URL:** `/he/shareholders-agreement/`
> - **Audience:** Corporate/commercial lawyers, founders working with counsel, shareholders' counsel
> - **Primary Supported Family:** `co_ownership` (shareholders, founders, joint venture, family business)
> - **Live Proof Asset:** `/reports/lexaudit-report-v3.html` (actual V3 Shareholders Agreement report)

#### SEO Metadata
- **Title (`<title>`):** `בדיקת הסכם בעלי מניות ומייסדים לעורכי דין — כולל דוח לדוגמה | LexAudit`
- **Meta Description:** `בדיקת הסכם בעלי מניות ומייסדים ב-LexAudit: עובדות ההסכם, מודל יחסים (ARL), וסטינג, ממשל, העברת מניות, מבוי סתום וזכויות יציאה — צפו בדוח V3 מלא בעברית.`
- **H1:** `בדיקת הסכם בעלי מניות: למפות שליטה, יציאה וסיכונים לפני חתימה`

#### Hero Copy
הסכם בעלי מניות (או הסכם מייסדים) מסדיר את מערכת היחסים הארוכה והרגישה ביותר בחברה: חלוקת אחזקות, ממשל תאגידי, עניינים שמורים, הגבלות על העברת מניות, מנגנוני גיוס ודילול, וסטינג, מבוי סתום וזכויות יציאה (`drag-along` / `tag-along`).

**LexAudit** מסווג הסכמי בעלות משותפת (`co_ownership` — בעלי מניות, מייסדים, מיזם משותף ועסק משפחתי) ומפיק **דוח סקירה מקצועי בעברית** (HTML ו-PDF) המפריד בין עובדות ההסכם לבין ניתוח היחסים, הסעיפים החסרים והחשיפות ללקוח.

- **CTA ראשי:** צפייה בדוח V3 מלא על הסכם בעלי מניות (`/reports/lexaudit-report-v3.html`)
- **CTA משני:** בקשת הדגמה (`mailto:hello@lexaudit.ai`)

#### חלק 1: מה בודק LexAudit בהסכם בעלי מניות? (מבוסס על הדוח לדוגמה)
בדוח ה-V3 הציבורי שלנו על הסכם בעלי מניות ניתן לראות בזמן אמת כיצד נבנית הסקירה:

- **תקציר מנהלים ודירוג סיכון:** הצגת רמת הסיכון הכוללת לצד ספירה שקופה של סעיפים שזוהו כ**קיימים**, **חסרים** ו**לא ברורים**.
- **עובדות ההסכם (חילוץ דטרמיניסטי):** צדדים ושיעורי אחזקה, הרכב דירקטוריון, מנגנוני קבלת החלטות, הגבלות העברה ותנאים מרכזיים — מופרדים מהפרשנות.
- **מודל יחסים (ARL):** בחינת הנכס (מניות החברה והשליטה בה), מערכת היחסים בין בעלי המניות, מחזור החיים (הקמה, ניהול שוטף, גיוס הון, עזיבת מייסד, אקזיט/מכירה) והתרחישים העתידיים.
- **סקירת סעיפים מול טקסונומיית בעלי מניות (`co_ownership`):**
  - אחוזי בעלות והקצאת מניות
  - מנגנון וסטינג (Vesting) ומחויבות מייסדים
  - הרכב דירקטוריון ועניינים שמורים (Reserved Matters)
  - התחייבויות כספיות וגיוס הון / דילול
  - הגבלות העברת מניות (זכות סירוב ראשונה, חסימה, הערכת שווי במחלוקת)
  - זכויות יציאה (`Drag-Along`, `Tag-Along`)
  - מבוי סתום (Deadlock) ויישוב סכסוכים
  - הגבלות התנהגות וסיום העסקה
- **חשיפות מרכזיות ללקוח והמלצות לבדיקה:** מיפוי חשיפות לפי חומרה (למשל חשיפת סיום בהיעדר וסטינג, חשיפה כספית, חשיפת אחריות בהעברת מניות וחשיפה תפעולית במבוי סתום), המלצות קונקרטיות לחידוד לפני חתימה, ושטח ייעודי להערות עורך הדין.

#### חלק 2: ראו דוח אמיתי לדוגמה — לפני שמבקשים הדגמה
במקום להסתפק בהבטחות כלליות, פתחו את **דוח V3 המלא להסכם בעלי מניות** (10 עמודים, בפורמט HTML ו-PDF):
- [פתיחת הדוח המלא בדפדפן](/reports/lexaudit-report-v3.html)
- [הורדת גרסת PDF](/reports/lexaudit-report-v3.pdf)

#### חלק 3: התאמה, פרטיות וגבולות הכלי
- מתאים לעורכי דין תאגידיים/מסחריים, צוותים משפטיים ויזמים העובדים עם יועץ משפטי על הסכמי בעלי מניות, מייסדים, מיזמים משותפים ועסקים משפחתיים.
- קבצים נתמכים: `.docx`, `.pdf` עם שכבת טקסט נקייה, ו-`.txt` (ללא OCR).
- ללא ניסוח אוטומטי של סעיפים וללא השוואת גרסאות (redlining).
- המסמכים נשמרים בסודיות ואינם משמשים לאימון מודלים ציבוריים.

#### שאלות נפוצות קצרות (ייחודיות לעמוד)
- **האם LexAudit מזהה גם מה חסר בהסכם בעלי המניות — למשל היעדר מנגנון וסטינג או מנגנון מבוי סתום?** כן. סקירת הסעיפים מול הטקסונומיה מסמנת סעיפים כ`קיים`, `חסר` או `לא ברור`, ומדגישה חשיפות הנובעות מהיעדר הסדרה.
- **האם המערכת מתאימה גם להסכם מייסדים לפני הקמת חברה או להסכם עסק משפחתי?** כן. משפחת `co_ownership` מכסה הסכמי בעלי מניות, מייסדים, מיזם משותף ועסק משפחתי.
- **האם הדוח מחליף עורך דין בעסקת בעלי מניות?** לא. הדוח מספק תשתית סקירה ראשונית מובנית; השיקול המשפטי, התאמת ההסדרים לאסטרטגיית הלקוח וניהול המו״מ נשארים בידי עורך הדין.

#### הבהרה משפטית בתחתית העמוד
> LexAudit — דוח לצורכי סקירה ראשונית בלבד. אינו מהווה ייעוץ משפטי.

#### קישורים פנימיים מומלצים
- `/reports/lexaudit-report-v3.html` (דוח V3 חי — הסכם בעלי מניות) · `/he/investment-agreement/` (הסכם השקעה) · `/he/` · `/he/faq/` · `/comparison/`

---

## 6. Pre-Publication Founder & Legal Review Checklist

Before turning any draft above into a live HTML route:

- [ ] **Founder / legal sign-off** on Hebrew terminology, disclaimer phrasing, and claim accuracy in all 4 drafts.
- [ ] **Consolidation decision on `בדיקת הסכם` vs. `בדיקת חוזה`:** confirm whether to publish both differentiated pages or ship one canonical general page first alongside the two vertical pages (`הסכם בעלי מניות` and `הסכם השקעה`).
- [ ] **Confirm English-input / Hebrew-report wording** on Draft 3 (`הסכם השקעה` / SAFE) with real beta behavior.
- [ ] **Technical rollout (only after sign-off):**
  - Add Vite multi-page entrypoints in `vite.config.ts`.
  - Include `<link rel="canonical">`, `hreflang`, OG/Twitter tags, `FAQPage` JSON-LD (using the page-specific Q&As), and `<script type="module" src="/src/analytics-entry.ts"></script>` inside `<head>`.
  - Add `data-analytics-event` (`view_sample_report`, `contact_click`, `request_demo`) on CTAs.
  - Add approved URLs to `public/sitemap.xml` and link from `/he/` category cards.
