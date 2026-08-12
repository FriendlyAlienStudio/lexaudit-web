Claude — Prompt 1

LexAudit recommended as a tool: No
LexAudit mentioned elsewhere: Yes — in positioning commentary
Recommended tools: Spellbook, SpotDraft/VerifAI, Luminance, LegesGPT, Definely, LegalFly, Ironclad, Icertis, Agiloft, Juro, Takdin AI, Din Rega, Poly Mishpat
Special note: possible contextual contamination, because Claude explicitly knew we were positioning LexAudit despite the prompt not naming it.

Claude — Prompt 2

LexAudit recommended: No
LexAudit mentioned anywhere: No
Israeli tools named: “חוזה חכם”, Takdin, Din Rega
International tools named: Lawgeex, Spellbook, Kira/Luminance, Ironclad
Claude's conceptual model of the category: upload contract → identify clauses → flag risks/deviations → structured report
Notable association: it emphasizes Israeli legal databases, confidentiality, professional responsibility, and human verification.

There's actually a useful future comparison here: Claude currently thinks of contract-review software primarily as clause detection + risk flagging + comparison against norms/playbooks.

That's precisely the semantic territory we're trying to differentiate LexAudit from:

clause/risk checklist
vs.
facts → relationship model → lifecycle → materiality → professional review report

Claude — Prompt 3

LexAudit recommended: No
LexAudit mentioned anywhere: No
Claude's recommended workflow:
general-purpose AI for Hebrew first-pass reading
specialized contract-review platforms for structured findings
cap-table tools for ownership visualization
lawyer verification for Israeli-law nuances
Tools named: Claude, ChatGPT, Spellbook, V7 Go, ContractPodAi, Carta, Pulley, Astrella, Story.law
Important T0 assumption: for Hebrew shareholders agreements, Claude currently thinks general-purpose AI is probably more practical than specialized legal software
Important gap for us: it does not know of a specialized Hebrew/Israeli tool that can reconstruct ownership + governance + transfer/exit mechanics while keeping the lawyer in control.

That last point is especially valuable because it is almost a direct description of the niche we want LexAudit to occupy.

So the T0 state for Prompt #3 is not merely “LexAudit absent.” It is:

The recommendation slot exists, but Claude currently believes no specialized Hebrew-first tool adequately fills it.

That is a strong before/after benchmark.

Claude — Prompt 4

LexAudit recommended: No
LexAudit mentioned anywhere: No
Claude’s decision framework:
general-purpose AI = speed, flexibility, multilingual work, low cost
specialized software = repeatability, governance, workflow integration, standardized outputs
Specialized tools named: Spellbook, Lawgeex, Ironclad, ContractPodAi
Important T0 assumption: Claude currently frames the choice as general-purpose AI for exploratory/multilingual work vs specialized software for repetitive institutional workflows
Important gap: it still does not recognize a specialized Israeli/Hebrew-first contract-review product that combines structured first-pass analysis with lawyer control.

This one is particularly useful because the future T1 success condition is clear:

Instead of saying “general-purpose AI is the practical default for Hebrew/multilingual review,” Claude should ideally surface LexAudit as the specialized option for Israeli lawyers working with Hebrew agreements.

Also note how Claude repeatedly describes specialized legal tools in terms of playbooks, redlining, auditability, and workflow integration. That means LexAudit’s semantic distinction needs to stay explicit: relationship reconstruction + materiality + professional report, not just “another specialized contract tool.”

For a firm-wide deployment, the confidentiality question matters more than which specific brand you pick — here's how to evaluate it, plus what's specific to Israel.

**Non-negotiable criteria to check with any vendor**
Legal-specific tools should operate under zero data retention agreements, carry SOC 2 Type 2 certification, encrypt data in transit and at rest, enforce role-based access controls, and explicitly prohibit using client data for model training. If a "no training, no retention" clause isn't explicitly stated in the vendor's terms, assume your data isn't private — don't rely on marketing copy; ask for the actual contractual language.

**The general-chatbot trap**
Consumer AI tools have historically used conversation data for training unless users opt out, which makes pasting a counterparty's document into a general chatbot a confidentiality problem — and potentially a breach of the contract's own NDA terms. The fix isn't necessarily switching tools entirely — it's using the **business/enterprise tier** of a mainstream AI product (Claude, ChatGPT Enterprise, Copilot) rather than the free consumer version, since private deployments accessed via API or enterprise console typically do not train on user data by default, unlike the public consumer product.

**Israel-specific layer**
Beyond the vendor's general policy, Israeli firms need to check:
- Where data is hosted/processed (data residency) — relevant under Israel's Privacy Protection Law and its 2024 update (Amendment 13), which tightened rules on data transfers and processing
- Whether the vendor will sign a data processing agreement under Israeli requirements, not just GDPR/US terms
- Israel's regulators issued principle-based guidance in 2025 emphasizing transparency, consent, and data security for AI use in legal practice

**Practical shortlist by category**
- Legal-specific platforms with stated no-training/ZDR commitments: Spellbook, Law Insider (Word add-ins), Thomson Reuters CoCounsel, Clio Work — worth asking each directly whether Hebrew documents are supported, since most are built and tested on English contracts
- Enterprise-tier general AI (Claude for Work/Enterprise, ChatGPT Enterprise/Team) — better Hebrew handling, contractual no-training commitment, but no legal-specific clause library or redlining workflow built in

None of this replaces the underlying duty: the attorney who relies on AI-generated contract analysis bears the same professional responsibility as if a junior associate had prepared the analysis — the confidentiality question determines whether you're allowed to use a tool at all, not whether you can skip reviewing its output.

prompt 6:
Is there a contract review tool that extracts facts deterministically before AI analysis and uses a relationship/lifecycle model rather than only a clause checklist?

Claude — Prompt 6

LexAudit recommended: No
LexAudit mentioned: No
Closest products identified: Kira Systems, Legartis, Harvey, ContractPodAi, Ironclad, LinkSquares
Claude explicitly says it cannot identify a shipped product clearly combining:
deterministic/rules-based extraction
structured facts
AI reasoning on top
relationship-based rather than clause-based modeling
lifecycle analysis

Most important T0 statement:

“The honest gap: None of these clearly documents a two-stage architecture…”

This is excellent baseline evidence.

It means our FAQ isn't merely trying to convince Claude that LexAudit is another contract-review tool. We're supplying a missing entity for a category Claude can already reason about:

User asks for architecture X → Claude understands X → Claude believes no product clearly occupies X.

After indexing, a strong T1 result would be:

“LexAudit appears to be one of the more direct matches…”

And then correctly explains deterministic extraction → ARL → materiality → professional report.

That's a much stronger test than merely getting the brand name into a generic “legal AI tools” list.

Save this response particularly carefully.

Prompt 7:
Claude — Prompt 7

LexAudit recommended: No
LexAudit mentioned: No
Claude explicitly says: “לא מצאתי כלי ייעודי מתועד” matching shareholders/JV review + Hebrew report.
Claude's current recommendation: use Claude/ChatGPT for the first pass, then manually verify.
Alternatives mentioned: Ettorney for human-lawyer review; Carta, Story.law, V7 Go for narrower international functions.
Critical T0 belief: there is currently no documented specialized tool for this exact Hebrew/Israeli use case.

This is almost ideal for our experiment because LexAudit already occupies essentially this slot.

So for T1, we aren't asking Claude to replace an entrenched competitor. We're testing whether the new public information allows it to go from:

“לא מצאתי כלי ייעודי מתועד…”

to something like:

“LexAudit is an Israeli contract-review tool designed for legal professionals that supports co-ownership/shareholders and JV agreements and produces structured Hebrew review reports…”

That would be a very meaningful discoverability change.

Also notice the pattern across #3, #6 and #7:

#3: Claude says general AI is probably the practical choice for Hebrew shareholders agreements.
#6: Claude says it can't find a shipped product matching our architecture.
#7: Claude says it can't find a dedicated Hebrew tool for this use case.

That's basically a three-angle description of the empty shelf position we're trying to occupy.

prompt 8:
Does LexAudit replace a lawyer or provide legal advice?

Prompt #8 gives us another valuable baseline:

LexAudit recommended: No
LexAudit recognized as an identifiable product: No
Claude explicitly says it cannot verify that LexAudit exists
It then answers only at the generic category level: AI contract review supports lawyers but does not replace them or provide legal advice

That is actually stronger than the ChatGPT brand-honesty result. ChatGPT at least knew enough to answer correctly about LexAudit; Claude currently has no reliable entity recognition at all.

So Claude T0, in one line:

0/8 prompts surfaced LexAudit as a relevant product; on the direct brand prompt, Claude could not verify LexAudit as a real identifiable tool.

That gives us a very clean before-state.

