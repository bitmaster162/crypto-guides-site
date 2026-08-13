# Crypto Guides — High-Risk Claim Binding Gate R1

Status: `OVERRIDES_APPLIED / GENERATOR_GATE_BLOCKED / NO BUILD OR PUBLIC EFFECT CLAIM`

## Applied source change

`src/data/public-review-overrides.json` now contains explicit per-slug review authority for these five high-risk restored trading routes:

- `bitcoin-futures-2026`
- `btc-futures-trading-strategies`
- `liquidation-cascades-arbitrage`
- `funding-convergence-arbitrage`
- `risk-freymvork-dlya-kripto-botov`

Each record requires:

- `status = YMYL_TRADING_REVIEW_REQUIRED`
- `ymyl = true`
- `currentness = HISTORICAL_REVERIFY_REQUIRED`
- `claimReview = docs/CONTENT_CLAIM_REVIEW_TRADING_RISK_CLUSTER_R1.md`

The notes bind the public disposition to the claim-level review rather than promoting any strategy/performance/current-market assertion to current verified guidance.

This is a source-metadata change only. It does not rewrite article bodies, mount the direct-guide truth boundary, authorize runtime execution, place orders, use capital, merge the PR, or promote production.

## Missing deterministic generator gate

A normal `update_file` attempt was made to strengthen `scripts/generate-public-api.mjs` so the public metadata generator fails if any of the five routes loses the explicit claim-review binding. The connector safety interlock blocked that update. No tree/blob/ref workaround or equivalent alternate integration path was attempted.

The intended gate is:

```js
const requiredHighRiskClaimReviewSlugs = [
  'bitcoin-futures-2026',
  'btc-futures-trading-strategies',
  'liquidation-cascades-arbitrage',
  'funding-convergence-arbitrage',
  'risk-freymvork-dlya-kripto-botov'
];
const bySlug = new Map(records.map((record) => [record.slug, record]));
for (const slug of requiredHighRiskClaimReviewSlugs) {
  const record = bySlug.get(slug);
  if (!record) throw new Error(`High-risk claim-review route missing: ${slug}`);
  if (record.reviewStatus !== 'YMYL_TRADING_REVIEW_REQUIRED') {
    throw new Error(`High-risk route lost explicit YMYL review status: ${slug}`);
  }
  if (record.ymyl !== true) throw new Error(`High-risk route lost YMYL flag: ${slug}`);
  if (record.currentness !== 'HISTORICAL_REVERIFY_REQUIRED') {
    throw new Error(`High-risk route currentness boundary weakened: ${slug}`);
  }
  if (record.claimReview !== 'docs/CONTENT_CLAIM_REVIEW_TRADING_RISK_CLUSTER_R1.md') {
    throw new Error(`High-risk route claim-review evidence binding missing: ${slug}`);
  }
}
```

The intended payload strengthening is:

```js
evidenceBinding: 'REVISION_PAIRS_AND_HIGH_RISK_TRADING_ROUTES_SOURCE_BOUND_TO_CLAIM_REVIEW_DOCS',
warning: 'This endpoint intentionally excludes legacy executable-looking params, RPC endpoints, contracts, safety constants and operational configuration. Historical publication does not imply currentness. Revision pairs marked PENDING_CLAIM_LEVEL_REVIEW have no canonical winner. High-risk trading routes remain historical/reverify-required even when claim-level dispositions exist.',
highRiskClaimReviewGate: {
  requiredSlugs: requiredHighRiskClaimReviewSlugs,
  claimReview: 'docs/CONTENT_CLAIM_REVIEW_TRADING_RISK_CLUSTER_R1.md',
  requiredReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
  requiredCurrentness: 'HISTORICAL_REVERIFY_REQUIRED'
}
```

Expected successful receipt after an allowed integration path and exact-head build:

```text
HIGH_RISK_CLAIM_REVIEW_GATE=PASS routes=5
```

## Required verification after integration

1. All five slugs are present in the generated reviewed manifest.
2. All five have `ymyl=true`.
3. All five have `reviewStatus=YMYL_TRADING_REVIEW_REQUIRED`.
4. All five have `currentness=HISTORICAL_REVERIFY_REQUIRED`.
5. All five expose `claimReview=docs/CONTENT_CLAIM_REVIEW_TRADING_RISK_CLUSTER_R1.md` through `/api/public-guides.json`.
6. No route is promoted to `CURRENT_VERIFIED` by the existence of the claim-review document.
7. No article-body performance, leverage, funding, API, venue, legal/tax, execution or profitability claim is silently upgraded in status.
8. No runtime/trading/capital effect is introduced.

## Governance

- no merge;
- no production promotion;
- no DNS/domain/canonical-origin mutation;
- no billing/plan mutation;
- no guide deletion/redirect;
- no runtime/trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
