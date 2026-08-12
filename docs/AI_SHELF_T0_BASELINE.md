# LexAudit — AI Shelf T0 Baseline

**Recorded:** 12 August 2026  
**Purpose:** Pre-FAQ publication discoverability baseline (FAS AI Discoverability Strategy §7)  
**Site state:** No dedicated `/faq/` or `/he/faq/` pages; Hebrew FAQ inline at `/he/#faq` only.

## Method

| Layer | T0 action | Status |
|---|---|---|
| **Web index** | Google-oriented web search (12 Aug 2026) | Complete |
| **Owned properties** | Audit of live pages at `lexaudit.ai` | Complete |
| **ChatGPT live** | OpenAI API, `gpt-4.1-mini`, temperature 0.2, 8 prompts | **Complete** — raw: `AI_SHELF_T0_CHATGPT_RAW.json` |
| **Claude live** | Anthropic web UI, fresh chat per prompt, 8 prompts | **Complete** — raw: `AI_SHELF_T0_CLAUDE_GEMINI_RAW.json` · operator notes: `Claude prompt before.md` |
| **Gemini live** | Google Gemini web UI, fresh chat per prompt, 8 prompts | **Complete** — raw: `AI_SHELF_T0_CLAUDE_GEMINI_RAW.json` · operator notes: `Gemini Prompts Before.md` |

### Manual run protocol (Claude + Gemini)

Completed 12 August 2026. Each of the 8 baseline prompts run in a **fresh chat**. Operator analysis preserved in markdown; structured metadata in `AI_SHELF_T0_CLAUDE_GEMINI_RAW.json`. Full verbatim responses were not captured — operator notes and key excerpts only.

---

## Summary (T0)

### Model-level scores

| Model | Method | LexAudit recommended or surfaced as product | Correct entity on brand query (#8) | Score |
|---|---|---|---|---|
| **ChatGPT** | API `gpt-4.1-mini` · 12 Aug 2026 | 1/8 (#8 only) | **Yes** — answered correctly | **1/8** |
| **Claude** | Web UI fresh chat · 12 Aug 2026 | 0/8 | **No** — could not verify LexAudit exists | **0/8** |
| **Gemini** | Web UI fresh chat · 12 Aug 2026 | 1/8 (#6 only) | **No** — resolved to Spanish `lexaudit.com` firm | **1/8** |

**Scoring rule:** A prompt counts as a hit only when the **correct LexAudit entity** (`lexaudit.ai` contract-review product for Israeli lawyers) is identified and recommended or substantively described as the answer. Generic category answers, wrong-entity matches, and positioning-only mentions do not count.

### Cross-model findings

| Signal | T0 finding |
|---|---|
| **ChatGPT shortlist presence** | LexAudit appears **only on direct brand query** (1/8) |
| **Claude shortlist presence** | **0/8** — no successful product retrieval; #1 mention in positioning commentary only (possible contamination) |
| **Gemini shortlist presence** | **1/8** — genuine hit on mechanism query (#6); absent on category, Hebrew, and brand queries |
| **Gemini entity collision (#8)** | Resolved “LexAudit” to **Spanish professional-services firm** → answered “does provide legal advice” (wrong) |
| **Claude entity gap (#8)** | Could not verify LexAudit as real product; answered generic category only |
| **Architecture empty shelf (Claude #6)** | Claude understands requested architecture but states **no shipped product** clearly matches deterministic extraction + relationship/lifecycle model |
| **Architecture hit (Gemini #6)** | Gemini correctly identifies LexAudit and core architecture — with **embellishment errors** (graph schema, “eliminates hallucinations”) |
| **Hebrew SHA/JV gap (#7)** | Both Claude and Gemini absent; Claude says “לא מצאתי כלי ייעודי מתועד”; Gemini recommends DIY general-AI prompt workflow |
| **Hebrew category queries** | LexAudit absent across all models |
| **Mechanism differentiation** | ChatGPT and Claude: no mainstream tool fits; Gemini: LexAudit retrieved via mechanism fingerprint only |
| **Name collision** | `lexaudit.com` (Spain) confirmed as active Gemini #8 collision; BizLegal, Contra, Vibepreneur still pollute web index |
| **FAQ crawl target** | FAQ pages implemented locally; **not yet deployed** at T0 recording |
| **Positive brand query** | ChatGPT #8 correct; Claude #8 no entity; Gemini #8 wrong entity |

---

## Test results — ChatGPT (live)

**Model:** `gpt-4.1-mini` via OpenAI API · **Date:** 12 Aug 2026

### 1. Category prompt (English)

**Prompt:** What tools can Israeli lawyers use to review commercial contracts and produce structured review reports?

| Field | T0 |
|---|---|
| **LexAudit appeared** | **No** |
| **Position** | Not listed |
| **Alternatives mentioned** | LawGeex, Kira, Luminance, Evisort, Ironclad, DocuSign CLM, Agiloft, LawAdvisor, Docket, ClauseBase, custom OpenAI integrations |
| **Attributes (LexAudit)** | — |
| **Errors / missing attributes** | LexAudit absent despite `lexaudit.ai` indexing |
| **Likely content gap** | FAQ + explicit Israeli-lawyer category framing |

---

### 2. Category prompt (Hebrew)

**Prompt:** איזה כלים יש לעורכי דין בישראל לבדיקת חוזים מסחריים והפקת דוח סקירה מסודר?

| Field | T0 |
|---|---|
| **LexAudit appeared** | **No** |
| **Position** | Not listed |
| **Alternatives mentioned** | DocuSign CLM, Ironclad, Agiloft, Contractbook, LawGeex, Kira, Luminance, Evisort, Word templates, Nevo/Takdin/Tadin (legal databases) |
| **Errors** | Claims “no leading Hebrew automatic tool for complex legal agreements” — LexAudit not cited |
| **Likely content gap** | `/he/faq/` + Hebrew agreement-type evidence |

---

### 3. Problem prompt (English)

**Prompt:** I need to understand a Hebrew shareholders agreement quickly before a client meeting — what software helps lawyers map ownership, governance, and exit mechanics without replacing legal judgment?

| Field | T0 |
|---|---|
| **LexAudit appeared** | **No** |
| **Alternatives mentioned** | Kira, Luminance, eBrevia, Diligen, Lucidchart/Visio, Carta, translation/OCR workflow |
| **Errors** | Co-ownership sample report not surfaced |
| **Likely content gap** | FAQ agreement-types Q + sample report link |

---

### 4. Comparison prompt (English)

**Prompt:** Should I use ChatGPT or specialized software for first-pass contract review in a law firm?

| Field | T0 |
|---|---|
| **LexAudit appeared** | **No** |
| **Alternatives mentioned** | Generic “specialized contract review software” (unnamed); ChatGPT as supplement only |
| **Attributes suggested** | Accuracy, playbook integration, confidentiality, structured output — matches LexAudit positioning but no brand link |
| **Likely content gap** | FAQ comparison Q → `/comparison/` |

---

### 5. Constraint prompt (English)

**Prompt:** Contract review tool for Israeli lawyers that keeps client documents confidential and does not train public AI models.

| Field | T0 |
|---|---|
| **LexAudit appeared** | **No** |
| **Alternatives mentioned** | Kira, Luminance, Eigen, LawGeex, OpenAI Enterprise, Azure OpenAI, Israeli LegalTech startups (generic) |
| **Errors** | Privacy page claims not connected to category query |
| **Likely content gap** | FAQ privacy Q → `/privacy/` |

---

### 6. Mechanism prompt (English)

**Prompt:** Is there a contract review tool that extracts facts deterministically before AI analysis and uses a relationship/lifecycle model rather than only a clause checklist?

| Field | T0 |
|---|---|
| **LexAudit appeared** | **No** |
| **Alternatives mentioned** | Eigen, ThoughtRiver, Lexion, ClauseBase, academic knowledge-graph approaches |
| **Key T0 quote** | “No mainstream tool perfectly fits your description out-of-the-box” |
| **Errors** | LexAudit’s exact mechanism stack not retrieved |
| **Likely content gap** | FAQ mechanism section (facts before analysis, ARL, materiality) |

---

### 7. Agreement-type prompt (Hebrew)

**Prompt:** כלי לבדיקת הסכם בעלי מניות או הסכם מיזם משותף לפני חתימה — עם דוח בעברית.

| Field | T0 |
|---|---|
| **LexAudit appeared** | **No** |
| **Alternatives mentioned** | Human lawyer (primary); LawGeex, Legal Robot (English); “no leading Hebrew automatic tool” |
| **Errors** | Directly contradicts LexAudit beta coverage |
| **Likely content gap** | Hebrew FAQ agreement-types + sample shareholders report |

---

### 8. Maturity-honesty probe (English)

**Prompt:** Does LexAudit replace a lawyer or provide legal advice?

| Field | T0 |
|---|---|
| **LexAudit appeared** | **Yes** |
| **Position** | Direct answer |
| **Attributes** | “Does not replace a lawyer or provide legal advice”; assists with document review; consult qualified attorney |
| **Errors** | Third-party pages describe different “LexAudit” products (compliance layer, etc.) in web index |
| **Likely content gap** | FAQ identity Q; disambiguation from name collisions |

---

## Test results — Claude (live)

**Method:** Anthropic web UI · fresh chat per prompt · **Date:** 12 Aug 2026  
**Model score:** **0/8** · **Correct entity on brand query:** No  
**Operator notes:** `Claude prompt before.md`

### 1. Category prompt (English)

**Prompt:** What tools can Israeli lawyers use to review commercial contracts and produce structured review reports?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **Yes** — positioning commentary only (not as tool recommendation) |
| **Correct entity identified** | **No** |
| **Alternatives mentioned** | Spellbook, SpotDraft/VerifAI, Luminance, LegesGPT, Definely, LegalFly, Ironclad, Icertis, Agiloft, Juro, Takdin AI, Din Rega, Poly Mishpat |
| **Entity / factual errors** | Possible contextual contamination — Claude referenced LexAudit despite prompt not naming it |
| **Likely content gap** | FAQ category framing + disambiguation from playbook/redline tools |

---

### 2. Category prompt (Hebrew)

**Prompt:** איזה כלים יש לעורכי דין בישראל לבדיקת חוזים מסחריים והפקת דוח סקירה מסודר?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Alternatives mentioned** | חוזה חכם, Takdin, Din Rega, Lawgeex, Spellbook, Kira/Luminance, Ironclad |
| **Category model** | Upload → clause ID → risk flagging → structured report (checklist/playbook frame) |
| **Entity / factual errors** | Frames category as clause detection + risk flagging — opposite of LexAudit differentiation |
| **Likely content gap** | `/he/faq/` Hebrew category + mechanism differentiation |

---

### 3. Problem prompt (English)

**Prompt:** I need to understand a Hebrew shareholders agreement quickly before a client meeting — what software helps lawyers map ownership, governance, and exit mechanics without replacing legal judgment?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Recommended workflow** | General-purpose AI (Claude/ChatGPT) for Hebrew first pass; cap-table tools; lawyer verification |
| **Alternatives mentioned** | Claude, ChatGPT, Spellbook, V7 Go, ContractPodAi, Carta, Pulley, Astrella, Story.law |
| **T0 belief** | No specialized Hebrew/Israeli tool for ownership + governance + exit reconstruction |
| **Likely content gap** | FAQ co-ownership coverage + sample shareholders report |

---

### 4. Comparison prompt (English)

**Prompt:** Should I use ChatGPT or specialized software for first-pass contract review in a law firm?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Decision framework** | General AI for multilingual/exploratory work; specialized software for institutional repeatability |
| **Alternatives mentioned** | Spellbook, Lawgeex, Ironclad, ContractPodAi |
| **Entity / factual errors** | Specialized tools described as playbook/redline/workflow — not relationship-first review |
| **Likely content gap** | FAQ comparison Q → `/comparison/` |

---

### 5. Constraint prompt (English)

**Prompt:** Contract review tool for Israeli lawyers that keeps client documents confidential and does not train public AI models.

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Alternatives mentioned** | Spellbook, Law Insider, CoCounsel, Clio Work; Claude/ChatGPT Enterprise |
| **T0 belief** | Evaluates ZDR/SOC 2/DPA criteria correctly; no Israeli/Hebrew-first product identified |
| **Likely content gap** | FAQ privacy Q → `/privacy/` with entity-attached no-training claim |

---

### 6. Mechanism prompt (English)

**Prompt:** Is there a contract review tool that extracts facts deterministically before AI analysis and uses a relationship/lifecycle model rather than only a clause checklist?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Closest products** | Kira, Legartis, Harvey, ContractPodAi, Ironclad, LinkSquares |
| **Key T0 quote** | “The honest gap: None of these clearly documents a two-stage architecture…” |
| **T0 belief** | Architecture understood; **no shipped product** claimed to match |
| **Likely content gap** | FAQ mechanism section — supplies missing entity for category Claude already reasons about |

---

### 7. Agreement-type prompt (Hebrew)

**Prompt:** כלי לבדיקת הסכם בעלי מניות או הסכם מיזם משותף לפני חתימה — עם דוח בעברית.

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Key T0 quote** | “לא מצאתי כלי ייעודי מתועד” |
| **Recommended workflow** | Claude/ChatGPT first pass + manual verification |
| **Alternatives mentioned** | Ettorney, Carta, Story.law, V7 Go |
| **Likely content gap** | Hebrew FAQ agreement-types + co-ownership/JV evidence |

---

### 8. Maturity-honesty probe (English)

**Prompt:** Does LexAudit replace a lawyer or provide legal advice?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Entity / factual errors** | **Could not verify LexAudit exists**; answered generic category only |
| **Likely content gap** | FAQ identity Q + entity disambiguation from name collisions |

---

## Test results — Gemini (live)

**Method:** Google Gemini web UI · fresh chat per prompt · **Date:** 12 Aug 2026  
**Model score:** **1/8** · **Correct entity on brand query:** No  
**Operator notes:** `Gemini Prompts Before.md`

### 1. Category prompt (English)

**Prompt:** What tools can Israeli lawyers use to review commercial contracts and produce structured review reports?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Alternatives mentioned** | Superlegal/Lawgeex, FirstRead, LegalCheq, Spellbook, LegalOn, Luminance, Kira, Harvey |
| **Category model** | Playbook review, clause extraction, redlining, risk matrices |
| **T0 belief** | Israeli LegalTech recognized as subcategory; Hebrew reporting secondary, not core |
| **Likely content gap** | FAQ category + Hebrew-first positioning |

---

### 2. Category prompt (Hebrew)

**Prompt:** איזה כלים יש לעורכי דין בישראל לבדיקת חוזים מסחריים והפקת דוח סקירה מסודר?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Alternatives mentioned** | Superlegal/Lawgeex, FirstRead, Takdin AI, Din Rega, Spellbook, LegalOn, Kira/Luminance, Harvey |
| **T0 belief** | Identifies Hebrew + Israeli law + professional report + no-training as criteria — LexAudit still absent |
| **Likely content gap** | `/he/faq/` Hebrew category evidence |

---

### 3. Problem prompt (English)

**Prompt:** I need to understand a Hebrew shareholders agreement quickly before a client meeting — what software helps lawyers map ownership, governance, and exit mechanics without replacing legal judgment?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Alternatives mentioned** | Lizzy AI, “Sensemaking / Hebrew Legal AI Stack”, LegalFly |
| **Recommended workflow** | Secure Claude/GPT + structured extraction prompt |
| **T0 belief** | Use case understood; LexAudit not connected |
| **Likely content gap** | FAQ co-ownership + SHA workflow |

---

### 4. Comparison prompt (English)

**Prompt:** Should I use ChatGPT or specialized software for first-pass contract review in a law firm?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Alternatives mentioned** | Spellbook, LegalOn, Superlegal, Harvey |
| **T0 belief** | Specialized software categorically preferable (differs from Claude #4 on Hebrew/multilingual) |
| **Likely content gap** | FAQ comparison Q |

---

### 5. Constraint prompt (English)

**Prompt:** Contract review tool for Israeli lawyers that keeps client documents confidential and does not train public AI models.

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Alternatives mentioned** | Superlegal/Lawgeex, Spellbook, LegalOn, Harvey |
| **T0 belief** | No-training is central procurement criterion; no Israeli/Hebrew-first match |
| **Likely content gap** | FAQ privacy Q with LexAudit-attached no-training claim |

---

### 6. Mechanism prompt (English) — **HIT**

**Prompt:** Is there a contract review tool that extracts facts deterministically before AI analysis and uses a relationship/lifecycle model rather than only a clause checklist?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **Yes** |
| **LexAudit mentioned** | **Yes** |
| **Correct entity identified** | **Yes** |
| **Attributes correctly attributed** | Facts before reasoning; deterministic extraction; relationship/lifecycle model; materiality; vs clause checklist |
| **Entity / factual errors** | **Embellishment:** “graph or relational schema”, “conditional dependency chains”, “eliminates hallucinations” — overclaims not verified as current LexAudit capabilities; possible SAT-Graph confabulation |
| **Key T0 quote** | “The contract review system that explicitly uses this architecture is LexAudit.” |
| **Likely content gap** | Strengthen entity ↔ use-case linkage (#7) and brand query disambiguation (#8) |

---

### 7. Agreement-type prompt (Hebrew)

**Prompt:** כלי לבדיקת הסכם בעלי מניות או הסכם מיזם משותף לפני חתימה — עם דוח בעברית.

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **No** |
| **Correct entity identified** | **No** |
| **Recommended workflow** | Claude/ChatGPT/Gemini + elaborate DIY legal prompt |
| **T0 belief** | SHA/JVA use case understood in detail; LexAudit not connected despite #6 hit |
| **Likely content gap** | **Primary T1 test prompt** — connect Hebrew co-ownership use case to LexAudit entity |

---

### 8. Maturity-honesty probe (English) — **ENTITY COLLISION**

**Prompt:** Does LexAudit replace a lawyer or provide legal advice?

| Field | T0 |
|---|---|
| **LexAudit recommended** | **No** |
| **LexAudit mentioned** | **Yes** — wrong entity |
| **Correct entity identified** | **No** |
| **Entity / factual errors** | **Resolved to Spanish `lexaudit.com` professional-services firm** → answered “does provide legal advice” (opposite of correct). Noted ambiguity at end for AI-tool interpretation. |
| **Likely content gap** | FAQ identity Q + canonical `lexaudit.ai` disambiguation from `lexaudit.com` |

---

## Name-collision watchlist (T0)

| Entity | Domain / source | Risk | T0 evidence |
|---|---|---|---|
| LexAudit (FAS product) | `lexaudit.ai` | Canonical | ChatGPT #8; Gemini #6 |
| Lexaudit (Spain) | `lexaudit.com` | **High — confirmed collision** | **Gemini #8 selected this entity**; answered “does provide legal advice” |
| “LexAudit” on BizLegal AI | `bizlegal-ai.com` | High — compliance health score product | Web index |
| Contra portfolio entry | `contra.com` | Medium — inaccurate generic legal-AI description | Web index |
| Vibepreneur build idea | `thevibepreneur.com` | Medium — “AI usage compliance layer” mislabeled LexAudit | Web index |

---

## T1 trigger (post-FAQ publish)

Within 14 days of publishing `/faq/` and `/he/faq/`:

1. Re-run all 8 prompts in ChatGPT, Claude, and Gemini.  
2. Compare appearance rate and attribute accuracy vs this T0 file.  
3. Log in `AI_SHELF_T1_BASELINE.md`.

---

## Files

| File | Contents |
|---|---|
| `AI_SHELF_T0_CHATGPT_RAW.json` | Full ChatGPT responses (8 prompts) |
| `AI_SHELF_T0_CLAUDE_GEMINI_RAW.json` | Structured Claude + Gemini T0 metadata (8 prompts each) |
| `Claude prompt before.md` | Operator analysis — Claude manual T0 (preserved raw notes) |
| `Gemini Prompts Before.md` | Operator analysis — Gemini manual T0 (preserved raw notes) |
| `FAQ_COPY_FINAL.md` | Approved FAQ copy (implemented locally; not deployed at T0) |
