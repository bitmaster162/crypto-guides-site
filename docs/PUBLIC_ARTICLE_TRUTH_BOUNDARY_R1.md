# Crypto Guides — Public Article Truth Boundary R1

Status: SOURCE SPEC / NO PRODUCTION EFFECT

## Problem

The restored corpus now has a source-derived review/index layer, but direct article routes still render historical content before a reader sees any current review-state boundary. For YMYL/trading pages this means stale or unsupported performance, leverage, funding, fee, API, venue and execution claims can still look current even though `/guides` and `/api/public-guides.json` classify them as review-required.

The exact preview on source head `921718551457901d23b3b67baa45bd3c263c1f5b` proved this mismatch. Examples include:

- `bitcoin-futures-2026`: claims such as approximately 75% win rate / 3.8% per trade, fixed funding thresholds, venue fee/leverage/current-market figures and generic profitability wording;
- `btc-futures-trading-strategies`: example return ranges, leverage recommendations, risk-per-trade constants, stale/current venue/legal assertions and "risk-free" arbitrage wording;
- `liquidation-cascades-arbitrage`: hard-coded venue API path, 20% OI/funding thresholds, delta-drift constants and zero-risk language;
- `funding-convergence-arbitrage`: universal 8-hour cadence, fixed spread/margin/rebalance thresholds and "risk-free profit" / fully price-independent wording;
- `risk-freymvork-dlya-kripto-botov`: prescriptive DD, latency and recovery thresholds plus broad "2026 institutional standard" framing.

The claim dispositions for these five routes are recorded in `docs/CONTENT_CLAIM_REVIEW_TRADING_RISK_CLUSTER_R1.md`.

## Required public boundary

Every built `/guides/<slug>` route should visibly expose the generated review state before the article header/body:

- `reviewStatus`;
- `currentness`;
- `ymyl`;
- statement that restored publication is not factual certification/currentness;
- for YMYL routes, explicit warning that trading/performance/leverage/funding/fee/API/venue claims require separate verification;
- statement that numeric thresholds are examples/hypotheses unless a reproducible evidence receipt is attached;
- statement that article content is not runtime configuration, trading authority or a guarantee of result;
- link back to `/guides` for the source-derived review index.

## Executable-looking metadata boundary

The current article template labels restored metadata blocks as `Executable Parameters` and `Safety Guards`. Those labels are stronger than the evidence permits. In the public build they should be relabelled to:

- `Historical / Illustrative Parameters`;
- `Historical / Illustrative Safety Guards`.

This is a presentation/truth-boundary change only. The historical records are not deleted.

## Deterministic post-build implementation

Preferred implementation: a post-build transformer that runs after `apply:review-status`, because `dist/guides-index.json` is then the single generated source for `reviewStatus/currentness/ymyl`.

Expected pipeline:

```text
astro build
-> generate:discovery
-> apply:review-status
-> generate:public-api
-> inject:review-boundaries
-> verify:public
```

The transformer must:

1. load `dist/guides-index.json`;
2. require at least 150 records;
3. open each `dist/guides/<slug>/index.html`;
4. fail if a review-boundary marker is already present before injection;
5. inject exactly one boundary before `.article-header`;
6. make YMYL wording conditional on `record.ymyl === true`;
7. relabel the two executable-looking headings in generated HTML;
8. fail if any YMYL page lacks the YMYL warning after transformation;
9. fail if any original `Executable Parameters` heading remains;
10. require injected count to equal the guide-record count.

Expected build receipt:

```text
PUBLIC_ARTICLE_REVIEW_BOUNDARY=PASS guides=162 ymyl=<derived> params_relabelled=<derived> safety_relabelled=<derived>
```

## Safety-interlock receipt

An attempt to create the deterministic transformer source (`scripts/inject-review-boundaries.mjs`) was blocked by the OpenAI connector safety interlock. No alternate wiring or low-level Git workaround was used. Therefore this document preserves the required patch semantics and tests, but does **not** claim the article-boundary transformer is applied.

## Taxonomy/YMYL interaction

A separate defect was found in the review router: the restored corpus contains stale/misclassified `category: Trading` labels on many clearly non-trading AI/system pages. Using `category` as trading-YMYL evidence therefore polluted the YMYL census.

The branch now changes trading-YMYL matching to `slug + title` only while preserving other rule matching against `slug + title + category`. Known genuine cross-category trading routes remain gated explicitly. The first exact-head preview for this taxonomy-scope change failed because the overlap control set incorrectly required `risk-freymvork-dlya-kripto-botov` to match two rules; that control was corrected on successor source head `6811c394d8142f6e60d2920f8ed8dc91541ed4ea`.

At the time of this receipt, Vercel did not execute that successor build because the Hobby build-rate limit reappeared. Therefore the corrected YMYL census is `SOURCE_ADVANCED / EXACT_BUILD_UNVERIFIED`.

## Governance

- no guide deletion;
- no redirect/canonical winner change;
- no production promotion;
- no DNS/domain change;
- no billing/plan change;
- no runtime/trading/capital effect;
- merge remains separately gated.
