# LexAudit FAQ — Final Copy (EN + HE)

**Status:** Approved — ready for HTML implementation  
**Routes:** `/faq/` (en), `/he/faq/` (he)  
**Audience:** Israeli lawyers, law firms, and in-house legal teams  
**Date:** 12 August 2026

---

# English — `/faq/`

## Page meta

**Title:** FAQ — LexAudit Contract Review for Lawyers  
**Meta description:** Answers for Israeli lawyers and in-house legal teams about LexAudit: how structured contract review works, what reports include, supported agreement types, privacy, and how to request access.

---

## Hero

**Eyebrow:** Product knowledge  
**H1:** Frequently asked questions  
**Lead:** LexAudit is structured contract review software for Israeli lawyers, law firms, and in-house legal teams. It produces professional Hebrew review reports — not chat transcripts.  
**Links:** [View sample report](/reports/lexaudit-report-v3.html) · [Request a demo](mailto:hello@lexaudit.ai)

---

## A. What LexAudit is

### What is LexAudit?

LexAudit is contract review software built for legal professionals. You upload an agreement; LexAudit extracts verifiable contract facts, reconstructs how the agreement works as a legal relationship, prioritizes issues according to materiality, and delivers a structured Hebrew review report formatted as attorney work product.

LexAudit is designed to **augment legal judgment — not replace it**.

### Does LexAudit replace a lawyer?

No. LexAudit organizes first-pass understanding of an agreement: facts, relationship structure, category-appropriate clause review, and issues ranked by consequence. Professional judgment, client strategy, negotiation, and final advice remain with counsel.

### Is LexAudit legal advice?

No. LexAudit reports are preliminary review work product. Every report includes a disclaimer that the output is for initial review purposes only and does not constitute legal advice.

---

## B. Who it is for

### Who is LexAudit for?

LexAudit is for **Israeli lawyers, law firms, and in-house legal teams** who review agreements as part of regular practice — especially when a structured first pass is needed before deeper review, internal briefing, or client discussion.

### When is LexAudit useful in a typical review workflow?

LexAudit is useful when a new agreement arrives and counsel needs to understand **how the deal works** before prioritizing issues: who the parties are, what each side contributes, which legal mechanisms hold the relationship together, and which provisions materially affect the client. It is designed for repeatable first-pass review, not for final sign-off.

---

## C. How LexAudit works

### How does LexAudit review a contract?

LexAudit follows a fixed analytical sequence:

1. **Deterministic extraction** — verifiable facts are extracted by rule-based logic before interpretive analysis begins.  
2. **Contract-type classification** — the system identifies the agreement category and applies a **category-aware clause taxonomy** (for example, employment vs. NDA vs. co-ownership).  
3. **Relationship modeling (ARL)** — the agreement is modeled as Asset · Relationship · Lifecycle · Future Scenarios — not only as a flat clause list.  
4. **Materiality ranking** — prioritizes issues according to materiality before they are written up.  
5. **Structured report** — findings are rendered as a professional Hebrew memorandum (HTML and PDF).

Interpretation does not precede verified facts. The report communicates an analysis that has already been structured.

### What does “facts before reasoning” mean in practice?

It means extracted facts — parties, term, payment, termination, jurisdiction, and category-specific groupings where available — appear as **deterministic outputs** in the report, separate from interpretive sections such as client exposures, clause assessment, and recommendations. A lawyer can verify factual extraction before relying on the analysis built on top of it.

LexAudit does not ask the model to invent or restate basic contract facts from memory.

### What is ARL (Asset · Relationship · Lifecycle)?

ARL is LexAudit’s framework for understanding what an agreement **governs** and **how it evolves over time**:

- **Asset** — the economic or legal object at the center of the deal  
- **Relationship** — the enduring legal and commercial relationship between the parties  
- **Lifecycle** — how that relationship changes through stages (entry, operation, breach, exit)  
- **Future scenarios** — the events the contract anticipates and allocates risk for  

Clause review is informed by this structure. The goal is to understand the relationship structure before assessing risk — not a generic clause list applied to every agreement type.

### How is LexAudit different from reviewing a contract with a general-purpose AI assistant?

A general-purpose AI assistant is built for conversation: you paste text, write instructions, and receive a single narrative answer in a chat window. LexAudit is built as a **fixed review process** with a defined deliverable:

| | General-purpose AI assistant | LexAudit |
|---|---|---|
| **Workflow** | Ad-hoc question and answer | Fixed multi-stage review sequence |
| **Input** | Enter text and provide instructions | Upload TXT, DOCX, or PDF |
| **Facts vs. analysis** | Typically combined in one response | Facts extracted first, shown in separate report sections |
| **Review frame** | Depends on how you instruct the model | Review framework tailored to agreement type |
| **Analysis model** | Often clause-by-clause summary | Relationship structure examined first (ARL) before risk write-up |
| **Prioritization** | Often a flat list of points | Issues ranked according to materiality |
| **Output format** | Chat message | Professional Hebrew review memorandum |

LexAudit is not a better instruction set for a chat tool. It is a structured review process whose deliverable is a professional report.

For a fuller comparison against traditional review and generic AI, see the [comparison framework](/comparison/).

---

## D. What you receive

### What do I receive after an analysis?

A structured **Hebrew review report**, typically including:

- Executive summary  
- Key points for professional review  
- Client exposures (where applicable)  
- Extracted contract facts  
- ARL relationship analysis  
- Clause review against the category taxonomy (with attention to missing or unclear provisions)  
- Recommended items for lawyer follow-up  
- Space for counsel notes  

See the public [sample report](/reports/lexaudit-report-v3.html) for the full structure and presentation standard.

Reports are designed for internal review, matter files, and client briefing — not as a chat log.

---

## E. Supported agreements (beta coverage)

### Which agreement types does LexAudit support?

LexAudit classifies agreements automatically and applies a **category-specific review taxonomy**. During the private beta, the platform supports review across a broad set of agreement families, including:

- **Commercial agreements and services** — including software development, marketing services, procurement/vendor, and event production subtypes where detected  
- **NDAs**  
- **Employment agreements**  
- **Residential lease** and **commercial lease**  
- **Sale and purchase** (real estate)  
- **Co-ownership** — shareholders, founders, joint venture, and family business agreements  
- **Financing** — including SAFE-style investment agreements  
- **Franchise**  
- **Distribution**

Coverage continues to expand as the beta hardens extraction and review against real specimens from practicing lawyers. If you work primarily with one agreement type, mention it when requesting access so we can prioritize your workflow.

### Can LexAudit analyze PDF and Word contracts?

Yes. LexAudit accepts **TXT, DOCX, and PDF** uploads. Extraction quality depends on the document: searchable text and clean PDF text layers produce the best results; scanned or OCR-heavy PDFs may yield incomplete fact extraction.

---

## F. Privacy and professional responsibility

### Are uploaded contracts kept confidential?

Yes. Uploaded contracts are treated as confidential. LexAudit does not sell or share your documents with third parties for their own purposes. **Customer contracts are not used to train public AI models.**

Product improvement relies on curated legal knowledge assets (taxonomies, extraction rules, ontologies, style guides) — not on absorbing client documents. Full details are in the [Privacy policy](/privacy/).

### What are my professional responsibilities when using LexAudit?

LexAudit is a review aid. You remain responsible for client representation, privilege, conflicts, confidentiality obligations, and all professional decisions. Verify extracted facts, apply judgment to recommendations, and treat the report as structured input to your review — not as a substitute for your own analysis.

---

## G. Access

### How do I access LexAudit today?

LexAudit is in **private beta**.

- **Request a demo:** [hello@lexaudit.ai](mailto:hello@lexaudit.ai)  
- **Approved beta users:** sign in at [/beta/](/beta/) with an allowlisted phone number  

Access is limited while we work with pilot lawyers and in-house teams to harden review quality across agreement types.

---

## Closing CTA

LexAudit helps Israeli lawyers understand the agreement before prioritizing risk — with facts separated from analysis, relationship structure examined first, and a professional report as the deliverable.

[Request a demo](mailto:hello@lexaudit.ai) · [View sample report](/reports/lexaudit-report-v3.html) · [Comparison framework](/comparison/) · [Privacy](/privacy/)

---

---

# Hebrew — `/he/faq/`

## Page meta

**Title:** שאלות נפוצות — LexAudit לבדיקת חוזים לעורכי דין  
**Meta description:** תשובות לעורכי דין, משרדי עורכי דין וצוותים משפטיים בחברות: איך LexAudit בודק הסכמים, מה כולל הדוח, אילו סוגי הסכמים נתמכים, פרטיות וגישה לבטא.

---

## Hero

**Eyebrow:** ידע מוצר  
**H1:** שאלות נפוצות  
**Lead:** LexAudit הוא כלי לבדיקת חוזים לעורכי דין, משרדי עורכי דין וצוותים משפטיים בחברות בישראל. התוצר הוא **דוח סקירה מקצועי בעברית** — לא תמליל שיחה.  
**Links:** [דוח לדוגמה](/reports/lexaudit-report-v3.html) · [בקשת הדגמה](mailto:hello@lexaudit.ai)

---

## א. מה זה LexAudit

### מה זה LexAudit?

LexAudit הוא כלי ל**בדיקת חוזים** ו**ניתוח הסכמים** לעורכי דין. מעלים הסכם; המערכת מחלצת עובדות חוזיות שניתן לאמת, משחזרת כיצד ההסכם פועל כ**מערכת יחסים משפטית**, מדרגת סוגיות לפי מהותיות, ומפיקה **דוח סקירה מקצועי** בפורמט של מוצר עבודה משפטי.

הכלי נועד **לחזק את שיקול הדעת המשפטי — לא להחליף אותו**.

### האם LexAudit מחליף עורך דין?

לא. LexAudit מארגן את שלב ההבנה הראשונית: עובדות, מבנה ההתקשרות, סקירת סעיפים לפי סוג ההסכם, וסוגיות מדורגות לפי משמעות. השיקול המקצועי, האסטרטגיה מול הלקוח, המו״מ והייעוץ הסופי נשארים בידי עורך הדין.

### האם LexAudit מהווה ייעוץ משפטי?

לא. הדוח נועד לסקירה ראשונית; שיקול הדעת המשפטי, האסטרטגיה והמשא ומתן נותרים בידי עורך הדין.

---

## ב. למי מיועד

### למי מיועד LexAudit?

ל**עורכי דין, משרדי עורכי דין וצוותים משפטיים בחברות** בישראל שבוחנים הסכמים כחלק מהשגרה — במיוחד כשצריך מעבר ראשון מסודר לפני העמקה, תיאום פנימי או הצגה ללקוח.

### מתי LexAudit שימושי בתהליך סקירה רגיל?

כשמגיע הסכם חדש והשאלה הראשונה היא **איך העסקה עובדת** — מי הצדדים, מה כל צד נותן, אילו מנגנונים משפטיים מחזיקים את ההתקשרות, ומה עלול להשפיע מהותית על הלקוח — לפני דירוג סיכונים. LexAudit בנוי לסקירה ראשונית חוזרת, לא לאישור סופי.

---

## ג. איך LexAudit עובד

### איך LexAudit בודק חוזה?

תהליך קבוע:

1. **חילוץ לפי כללים קבועים** — עובדות שניתן לאמת נחלצות בכללים, לפני שהניתוח המפרשי מתחיל.  
2. **סיווג סוג ההסכם** — זיהוי קטגוריה ו**מסגרת בחינה המותאמת לסוג ההסכם** (למשל העסקה מול NDA מול בעלי מניות).  
3. **מודל יחסים (ARL)** — נכס · יחסים · מחזור חיים · תרחישים עתידיים — לא רק רשימת סעיפים שטוחה.  
4. **דירוג לפי מהותיות** — סוגיות מדורגות לפי משמעות משפטית לפני הניסוח.  
5. **דוח מובנה** — מזכר מקצועי בעברית (HTML ו-PDF).

פרשנות לא קודמת לעובדות מאומתות. הדוח מעביר ניתוח שכבר עבר מבנה.

### מה זה "עובדות לפני ניתוח" בפועל?

עובדות שחולצו — צדדים, תקופה, תמורה, סיום, סמכות שיפוט, ומיפוי לפי קטגוריה — מופיעות בדוח **בנפרד** מסעיפים מפרשיים כמו חשיפות ללקוח, סקירת סעיפים והמלצות. עורך הדין יכול לאמת עובדות לפני שמסתמך על הניתוח שבנוי עליהן.

LexAudit לא מבקש מהמודל "להמציא" עובדות בסיסיות מתוך זיכרון כללי.

### מה זה ARL (נכס · יחסים · מחזור חיים)?

מסגרת להבנת **מה ההסכם מסדיר** ו**איך ההתקשרות מתפתחת**:

- **נכס** — האובייקט הכלכלי או המשפטי במרכז העסקה  
- **יחסים** — מערכת היחסים המשפטית והמסחרית בין הצדדים  
- **מחזור חיים** — שלבי ההתקשרות (כניסה, תפעול, הפרה, יציאה)  
- **תרחישים עתידיים** — אירועים שהחוזה צופה ומקצה להם סיכון  

סקירת הסעיפים נשענת על מבנה זה. המטרה: **הבנת מערכת היחסים לפני הערכת הסיכונים**, לא רשימת סעיפים גנרית לכל הסכם.

### במה LexAudit שונה מסקירת חוזה עם עוזר AI כללי?

עוזר AI כללי (ChatGPT, Claude וכו') בנוי לשיחה: מדביקים טקסט, כותבים הנחיה, ומקבלים תשובה אחת בחלון שיחה. LexAudit בנוי כ**תהליך סקירה קבוע** עם תוצר מוגדר:

| | עוזר AI כללי | LexAudit |
|---|---|---|
| **תהליך** | שאלה ותשובה לפי הצורך | רצף סקירה קבוע בשלבים |
| **קלט** | הזנת הטקסט ומתן הנחיות | העלאת TXT, DOCX או PDF |
| **עובדות מול ניתוח** | לרוב משולבים בתשובה אחת | עובדות נחלצות תחילה, מוצגות בחלקים נפרדים בדוח |
| **מסגרת סקירה** | תלוי בניסוח ההנחיה | מסגרת בחינה המותאמת לסוג ההסכם |
| **מודל ניתוח** | לעיתים סיכום סעיף-סעיף | בחינת מערכת היחסים תחילה (ARL) לפני כתיבת סיכונים |
| **עדיפויות** | לעיתים רשימה שטוחה | סוגיות המדורגות לפי מהותיות |
| **תוצר** | הודעת צ'אט | מזכר סקירה מקצועי בעברית |

LexAudit הוא לא "הנחיה טובה יותר" לכלי שיחה. זה **תהליך סקירה מובנה שהתוצר שלו הוא דוח מקצועי**.

להשוואה מלאה מול סקירה מסורתית ו-AI גנרי: [מסגרת ההשוואה](/comparison/).

---

## ד. מה מקבלים

### מה מקבלים בסוף הבדיקה?

**דוח סקירה מקצועי בעברית**, הכולל בדרך כלל:

- תקציר מנהלים  
- נקודות מרכזיות לבדיקה מקצועית  
- חשיפות מרכזיות ללקוח (במידת הרלוונטיות)  
- עובדות חוזה שחולצו  
- ניתוח ARL — מבנה ההסכם ומערכת היחסים  
- סקירת סעיפים מול מסגרת הבחינה של הקטגוריה (כולל סעיפים חסרים או לא ברורים)  
- המלצות לבדיקה ולפעולה  
- שטח להערות עורך הדין  

ראו [דוח לדוגמה](/reports/lexaudit-report-v3.html) למבנה המלא.

הדוח מיועד לעיון פנימי, לתיק העניין ולתמצות מול לקוח — לא כתמליל שיחה.

---

## ה. סוגי הסכמים (כיסוי בטא)

### באילו סוגי הסכמים אפשר להשתמש?

LexAudit מסווג הסכמים אוטומטית ומפעיל **מסגרת בחינה המותאמת לסוג ההסכם**. בבטא הפרטית נתמכים בין היתר:

- **חוזים מסחריים והסכמי שירותים** — כולל תת-סוגים כמו פיתוח תוכנה, שיווק, רכש/ספק, והפקת אירועים (כשמזוהים במסמך)  
- **הסכמי סודיות (NDA)**  
- **הסכמי העסקה**  
- **חוזי שכירות** (מגורים ומסחרית)  
- **הסכמי מכר** (נדל״ן)  
- **הסכמי בעלות משותפת** — בעלי מניות, מייסדים, מיזם משותף, ועסק משפחתי  
- **הסכמי מימון** — כולל הסכמי השקעה מסוג SAFE  
- **זיכיון (Franchise)**  
- **הפצה (Distribution)**

הכיסוי מתרחב במהלך הבטא, עם חיזוק מול דגימות אמיתיות מעורכי דין במסגרת הפיילוט. אם אתם עובדים בעיקר על סוג הסכם אחד — ציינו זאת בבקשת גישה.

### האם אפשר להעלות PDF ו-Word?

כן. **TXT, DOCX ו-PDF**. איכות החילוץ תלויה במסמך: שכבת טקסט נקייה נותנת תוצאות טובות יותר; PDF סרוק או OCR חלש עלול לייצר חילוץ חלקי.

---

## ו. פרטיות ואחריות מקצועית

### האם החוזים שמועלים נשמרים בפרטיות?

כן. חוזים מטופלים כחסויים. LexAudit לא מוכר או משתף מסמכים עם צדדים שלישיים לצרכיהם. **חוזי לקוחות אינם משמשים לאימון מודלים ציבוריים.**

שיפור המוצר מתבסס על נכסי ידע משפטיים מובנים (טקסונומיות, כללי חילוץ, אונטולוגיה, מדריך סגנון) — לא על ספיגת מסמכי לקוח. פירוט ב[מדיניות הפרטיות](/privacy/).

### מה האחריות המקצועית שלי?

LexAudit הוא עזר לסקירה. האחריות לייצוג, חסיון, ניגוד עניינים, סודיות מול הלקוח וכל החלטה מקצועית נשארת אצלכם. אמתו עובדות, הפעילו שיקול דעת על ההמלצות, והתייחסו לדוח כקלט מובנה — לא תחליף לניתוח שלכם.

---

## ז. גישה

### איך מקבלים גישה היום?

LexAudit ב**בטא פרטית**.

- **בקשת הדגמה:** [hello@lexaudit.ai](mailto:hello@lexaudit.ai)  
- **משתמשים מאושרים:** כניסה ב-[/beta/](/beta/) עם מספר טלפון ברשימת ההיתר  

הגישה מוגבלת בזמן שאנחנו מחזקים איכות הסקירה עם עורכי דין וצוותים משפטיים בפיילוט.

---

## Closing CTA

LexAudit מסייע לעורכי דין בישראל להבין את ההסכם לפני שמדרגים סיכון — עם עובדות נפרדות מניתוח, בחינת מערכת היחסים תחילה, ודוח מקצועי כתוצר.

[בקשת הדגמה](mailto:hello@lexaudit.ai) · [דוח לדוגמה](/reports/lexaudit-report-v3.html) · [השוואה](/comparison/) · [פרטיות](/privacy/)
