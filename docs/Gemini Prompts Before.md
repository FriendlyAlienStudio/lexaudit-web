Gemini Prompts Before

Gemini — Prompt 1

LexAudit recommended: No
LexAudit mentioned anywhere: No
Tools named: Superlegal/Lawgeex, FirstRead, LegalCheq, Spellbook, LegalOn, Luminance, Kira, Harvey
Gemini's category model: playbook review, clause extraction, redlining, risk matrices, structured reports, due diligence
It specifically recognizes Israeli-developed LegalTech as a relevant subcategory, but LexAudit does not occupy that shelf yet.
It thinks Hebrew/local reporting is a secondary requirement rather than a core specialization.

prompt 2:
Gemini — Prompt 2

LexAudit recommended: No
LexAudit mentioned anywhere: No
Israeli/local tools named: Superlegal/Lawgeex, FirstRead, Takdin AI, Din Rega
Global tools named: Spellbook, LegalOn, Kira/Luminance, Harvey
Gemini again understands the requested product category very clearly: commercial-contract review + structured report
It explicitly identifies Hebrew + Israeli law as a selection criterion, but still doesn't surface LexAudit.
It also independently identifies two attributes we're deliberately publishing: professional Word/PDF report output and no public-model training/confidentiality.

prompt 3:
LexAudit recommended: No
LexAudit mentioned: No
Specialized tools claimed: Lizzy AI, “Sensemaking / Hebrew Legal AI Stack,” LegalFly
Fallback recommendation: secure Claude/GPT workflow with a carefully structured extraction prompt
Gemini correctly decomposes the agreement into ownership/capitalization → governance/control → exit/transfer mechanics
It explicitly recognizes the Hebrew shareholders-agreement use case as requiring specialized treatment.

The important T0 belief is:

Gemini believes this problem can be solved either by other purported Hebrew-capable tools or by constructing a sophisticated prompt for a general-purpose model. It does not know LexAudit occupies this exact use case.

prompt 4:
LexAudit recommended: No
LexAudit mentioned: No
Specialized tools named: Spellbook, LegalOn, Superlegal, Harvey
Gemini strongly recommends specialized legal software over ChatGPT for first-pass review.
Its model of specialized software is heavily playbook/redline/Word-integration oriented.
General-purpose AI is relegated to orientation, translation, brainstorming, or low-budget workflows.

The important T0 belief here is slightly different from Claude's:

Claude #4: general AI still has an advantage for multilingual/Hebrew exploratory work.
Gemini #4: specialized software is categorically preferable for serious law-firm first-pass review.

prompt 5:
LexAudit recommended: No
LexAudit mentioned: No
Tools recommended: Superlegal/Lawgeex, Spellbook, LegalOn, Harvey
Gemini treats no public-model training as a central procurement criterion for Israeli lawyers.
It strongly associates trustworthy legal AI with enterprise security infrastructure: ZDR, DPAs, SOC 2, ISO 27001, data isolation/residency.
It still doesn't identify an Israeli/Hebrew-first contract-review product matching the query.

This is a particularly useful T1 prompt because our FAQ now explicitly says:

Not used to train public AI models.

So we're giving the retrieval ecosystem almost the exact semantic fact Gemini is currently looking for, attached directly to the LexAudit entity.

prompt 6:
LexAudit recommended: YES
LexAudit recognized as a product: YES
Correct core architecture: YES
“Facts first, reasoning second”: YES
Deterministic extraction before AI analysis: YES
Relationship/lifecycle modeling: YES
Differentiation from flat clause/checklist review: YES
Materiality analysis: YES

That's remarkable because the prompt apparently hit almost exactly the conceptual fingerprint we've been building.

But there's an important wrinkle

Gemini also appears to be embellishing.

For example:

“tracking party obligations, conditional dependency chains”

and especially:

“graph or relational schema”

That's adjacent to our thinking, but I would not automatically treat it as a current LexAudit capability.

And:

“it eliminates hallucinations regarding underlying contract data”

is too strong. Deterministic extraction can reduce a class of hallucination/error; it doesn't magically eliminate errors.

The whole SAT-Graph section may also be Gemini connecting our architecture to concepts it knows elsewhere rather than something LexAudit itself claims.

prompt 7:
LexAudit recommended: No
LexAudit mentioned: No
Dedicated Hebrew contract-review tool identified: No
Recommended solution: Claude / ChatGPT / Gemini + a carefully constructed legal prompt
Gemini understands the use case in considerable detail: SHA/JVA, governance, transfer restrictions, dilution, deadlock, exit, IP, etc.
Yet it does not connect that use case to LexAudit.

So now we have a particularly revealing pair:

Prompt #6 — architecture

“The contract review system that explicitly uses this architecture is LexAudit.”

Prompt #7 — actual customer problem

Use Claude/ChatGPT/Gemini and construct this elaborate prompt yourself.

That's almost a textbook AI Shelf problem.

Gemini appears to have an edge in its representation something like:

LexAudit → deterministic extraction → relationship/lifecycle modeling

but lacks—or gives insufficient weight to:

Hebrew SHA/JVA review → LexAudit

That distinction is much more informative than merely saying “Gemini doesn't know us.”

And look at the absurdity from a product-positioning perspective: Gemini spends most of #7 effectively instructing the lawyer to manually construct a primitive version of what LexAudit is designed to do.

That's the shelf we want.

After publication, Prompt #7 becomes one of our most important T1 tests. A meaningful change would be Gemini recommending LexAudit before telling the lawyer to engineer their own general-purpose-AI workflow.

prompt 8:
Correct LexAudit identified: No
Our LexAudit recognized as software: No
Wrong entity selected: Yes — Spanish Lexaudit professional-services firm
Consequently gives the exact opposite answer: “it does provide legal advice”
Gemini does notice possible ambiguity at the end: “If you were referring to an AI tool, software product, or platform with a similar name…”

This gives us a very useful Gemini baseline:

Prompts 1–5: LexAudit absent despite relevant category queries.
Prompt 6: Hit — Gemini recognizes LexAudit when queried through its distinctive architecture.
Prompt 7: absent again on an extremely relevant Hebrew SHA/JV use case.
Prompt 8: entity collision — resolves “LexAudit” to the Spanish firm rather than our product.

So Gemini T0 is effectively 1/8 successful retrievals, with a serious entity-resolution failure on the direct brand query.

And the #6/#8 combination tells us something especially interesting. Gemini apparently has some representation of our LexAudit, strong enough to retrieve it from the unusual “deterministic extraction + relationship/lifecycle” fingerprint, but that representation isn't strong enough to dominate the older/more established Lexaudit entity when queried by name alone.
