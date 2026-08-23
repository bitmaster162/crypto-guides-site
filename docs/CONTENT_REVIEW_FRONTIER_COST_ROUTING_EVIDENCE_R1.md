# Frontier Models Cost Routing — vendor-state evidence R1

Date: 2026-08-15
Route: `frontier-models-cost-routing`
Status: `SOURCE_REPAIR_APPLIED_EXACT_HEAD_BUILD_REVERIFY_PENDING`
Repair ID: `frontier-cost-routing-vendor-state-r1`
Review status: `VOLATILE_VENDOR_STATE`
Currentness: `REVERIFY_REQUIRED`

## Why repair is required

The restored route embeds a static multi-vendor model/cost matrix and derives routing recommendations from it. The source contains fixed per-million-token prices, fixed context-block costs, a fixed Fable/DeepSeek cost ratio, model-role tiers and current-sounding model rankings.

Fresh primary-provider documentation already diverges from multiple restored rows. The repair therefore does not replace the old table with another supposedly permanent table. It changes the public contract to a dated/provider-bound model registry plus workload-specific evaluation.

## Restored-source findings

The restored route includes, among other values:
- a fixed price matrix for Claude Fable/Mythos/Opus, GPT-5.5, Gemini, Grok and DeepSeek;
- fixed approximate context-block costs;
- a fixed Fable/DeepSeek cost ratio;
- tier labels such as commodity / interactive / high-stakes / experimental;
- an `estimate_cost`-style routing description that can read as automatic authority to choose the cheapest sufficient model.

These are historical design inputs, not current billing authority.

## Fresh primary-provider evidence rechecked 2026-08-15

### OpenAI
Primary source:
- `https://developers.openai.com/api/docs/models/gpt-5.5`

The current GPT-5.5 API page documents model ID, context/output limits, standard token pricing, cached-input pricing and long-context pricing behavior. The restored GPT-5.5 base input/output pair happens to align with the current standard page, but that does not validate the rest of the historical matrix or make the value durable.

### Google Gemini
Primary sources:
- `https://ai.google.dev/gemini-api/docs/models`
- `https://ai.google.dev/gemini-api/docs/pricing`
- `https://ai.google.dev/gemini-api/docs/latest-model`

Current Google documentation shows a changed Gemini lineup and pricing surface relative to the restored snapshot. Stable/preview status also changes over time. Therefore model ID, price, context/output limits and lifecycle must be versioned vendor state.

### xAI
Primary sources:
- `https://docs.x.ai/developers/models`
- `https://docs.x.ai/developers/models/grok-4.3`
- `https://docs.x.ai/developers/migration/may-15-retirement`
- `https://x.ai/news/grok-4-5`

Current xAI documentation shows Grok 4.3 with a different output price from the restored matrix, documents alias/retirement redirects, and later introduced Grok 4.5. This proves that both price and model-lineup assumptions can become stale while old slugs may continue resolving.

### DeepSeek
Primary source:
- `https://api-docs.deepseek.com/quick_start/pricing`

DeepSeek V4 pricing currently separates cache-hit and cache-miss input prices from output pricing. The page explicitly warns that prices may change and recommends checking the current page. The restored static output price does not match the current page.

### Anthropic
Primary product surface:
- `https://www.anthropic.com/claude/fable`

Anthropic Fable/Mythos availability and access already changed materially during June/July 2026 and are separately covered by `CONTENT_REVIEW_ANTHROPIC_VENDOR_STATE_EVIDENCE_R1.md`. The frontier routing page must therefore consume Anthropic state as dated vendor data, not duplicate a static billing/access table.

## Claim disposition

### KEEP_AS_METHOD
- capability-based routing;
- cost estimation using actual token/tool profile;
- tier/policy abstraction as an implementation pattern;
- workload-specific evaluation;
- explicit fallback for provider/model retirement or outage;
- versioned model registry with timestamp and source.

### REMOVE_AS_CURRENT_AUTHORITY
- the restored full static price matrix;
- fixed per-context-block dollar values;
- fixed cross-vendor cost ratios;
- permanent model-to-tier assignment;
- current-sounding best/default ranking from one dated benchmark snapshot;
- automatic authority to purchase a provider, increase billing, or route production to an unapproved paid model.

### REVERIFY_BEFORE_OPERATIONAL_USE
- exact model IDs and aliases;
- model availability / stable-vs-preview lifecycle;
- input, cached-input, output, reasoning, tool/search and long-context pricing;
- context/output limits;
- rate limits, regional availability and plan/provider distribution;
- benchmark quality and methodology;
- latency and reliability;
- workload-specific pass rate and retry/failure cost.

## Cost-routing contract

A production-grade router should treat cost as a function of a versioned provider snapshot and actual workload, not a constant table embedded in prose. At minimum it should bind:
- `provider`;
- `model_id`;
- `observed_at`;
- primary pricing/model source;
- input/cached/output/tool pricing dimensions;
- context/output limits;
- availability/lifecycle state;
- workload eval version;
- allowed-use authority and fallback.

A cheapest-model decision is only valid inside an already approved model/provider pool and after capability/evaluation gates. It does not authorize a new purchase, plan upgrade, billing-limit increase or production routing mutation.

## Deterministic public repair gate

Generated HTML must fail if it leaks the targeted restored fixed context-block values, fixed Fable/DeepSeek ratio, stale Gemini/Grok/DeepSeek static price patterns, or automatic cheapest-model authority.

Generated HTML must include:
- `VOLATILE_VENDOR_STATE`;
- `REVERIFY_REQUIRED`;
- primary provider-source links;
- capability/workload routing language;
- exact boundary: `This pricing snapshot is dated, not billing authority.`;
- explicit no-purchase/no-billing/no-production-routing authority.

## Evidence ladder

- Evidence: READY.
- Public repair: APPLIED IN SOURCE ON DRAFT BRANCH.
- Exact-head BUILD: PENDING after this source change.
- Deployment/readback: PENDING.
- Production effect: NONE.

No BUILD PASS may be claimed until an exact-head executor emits route-specific `PUBLIC_GUIDE_REPAIR_APPLY` and `PUBLIC_GUIDE_REPAIR_GATE` plus sanitizer/public-contract PASS receipts.

## Governance

- no merge;
- no production promotion;
- no billing/plan mutation;
- no vendor purchase;
- no API-key/credential mutation;
- no automatic model-pool expansion;
- no runtime routing mutation;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
