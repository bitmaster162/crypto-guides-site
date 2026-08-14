# BTC Futures public repair evidence R1

Date: 2026-08-14
Scope:
- `bitcoin-futures-2026`
- `btc-futures-trading-strategies`

State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
Review status: `YMYL_TRADING_REVIEW_REQUIRED`
Currentness: `HISTORICAL_REVERIFY_REQUIRED`

This document prepares bounded public-copy repairs for the two restored BTC-futures routes. It does not add another post-build rewrite while `funding-convergence-r1` remains without a full exact-head build execution.

## Why repair is required

The restored routes mix legitimate educational concepts with current-market assertions, venue lists, performance ranges, fees, leverage and risk thresholds, legal/tax statements and strategy labels that look like durable recommendations. Those claim classes have materially different evidence requirements and must not be flattened into one current guide.

The correct repair is not to replace old magic numbers with newer magic numbers. Time-sensitive venue/product facts require current primary-source evidence and explicit scope; strategy thresholds require reproducible evaluation; legal/tax claims require dedicated current official-source review.

## Current primary-source anchors

### Funding cadence is not a universal constant

Bybit V5:
- `https://bybit-exchange.github.io/docs/v5/market/history-fund-rate`
- `https://bybit-exchange.github.io/docs/v5/market/instrument`

Current Bybit documentation states that symbols can have different funding intervals and exposes `fundingInterval` in minutes as instrument metadata. A public guide must not hard-code one cadence as a universal exchange-independent truth.

Coinbase derivatives:
- `https://help.coinbase.com/en/coinbase/derivatives/funding-rate`
- `https://help.coinbase.com/en/derivatives/perpetual-style-futures/funding-rate`
- `https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview`

Current Coinbase help describes hourly funding for scoped perpetual products. This is product evidence, not proof that every venue uses the same cadence or settlement mechanics.

### Moscow Exchange crypto-index futures historical fact

Primary source:
`https://www.moex.com/n95316`

Moscow Exchange announced that on 18 November 2025 it would begin trading cash-settled futures on its Bitcoin and Ether indices (`MOEXBTC`, `MOEXETH`). The announcement states that these instruments were available only to qualified investors and did not involve delivery of digital currency.

This event may be retained with its date and scope. It must not be generalized into unrestricted retail availability, physical crypto delivery or a timeless product-access statement.

## Route: bitcoin-futures-2026

### KEEP_VERIFIED / bounded

- Perpetual funding transfers value between long and short holders according to the sign and rules of the specific product.
- Funding cadence and formula are venue/product/instrument state and must be queried or reverified.
- Futures leverage creates liquidation risk; margin and liquidation mechanics must be scoped to the specific contract and venue.
- Historical exchange/product events may remain when date, product and source are explicit.

### REVERIFY_CURRENT

- current leverage caps and margin requirements;
- maker/taker fees;
- volume and market-share figures;
- yield/APY or carry-return claims;
- current venue/product availability and jurisdictional access;
- venue throughput/latency claims;
- licensing/regulatory descriptions;
- DEX or institutional market-share percentages.

### INTERNAL_HEURISTIC / model input only

- fixed OI confirmation thresholds such as `+3%`;
- fixed funding thresholds such as `0.05% / 8h`;
- generic 2x–5x or other leverage ranges;
- fixed exit windows and indicator thresholds;
- any liquidation-heatmap trigger not tied to a reproducible sample and out-of-sample evaluation.

### REMOVE_OR_REWRITE

- approximately `75% win rate` and `3.8% per trade` without a reproducible dataset, sample period, fees/slippage model and independent calculation;
- claims that institutional market makers deliberately push price into liquidation clusters as a universal fact;
- “working strategy”, “stable profit” or similar profitability certification derived from prose alone;
- generic “double-digit annual returns” for cash-and-carry or basis/funding structures;
- any implication that hedged or delta-neutral means risk-free.

## Route: btc-futures-trading-strategies

### KEEP_VERIFIED / bounded

- The 18 November 2025 MOEX launch event may be stated as a dated historical fact: cash-settled Bitcoin/Ether index futures, qualified investors only, no digital-currency delivery.
- Fees and slippage should be included in backtests as methodology guidance.
- Backtests should separate model development from out-of-sample evaluation and should disclose cost assumptions.
- Stop-losses, position sizing and leverage are risk controls whose parameter values depend on strategy, instrument and portfolio context.

### REVERIFY_CURRENT

- exchange fee schedules and maker/taker programs;
- leverage limits, maintenance margin and liquidation rules;
- product availability and venue access;
- exchange lists presented as “suitable now”;
- current legal/regulatory treatment;
- all Russian tax assertions.

The restored text's static Russian `13%` NDFL statements are not retained as current authority by this evidence review. A later public repair should remove them from general trading guidance unless a dedicated, dated legal/tax review binds the exact claim to current official sources and taxpayer/instrument scope.

### INTERNAL_HEURISTIC / example only

The restored route contains strategy tables and constants such as:
- scalping leverage `5–20x`;
- intraday leverage `3–10x`;
- swing leverage `1–5x`;
- position leverage `1–3x`;
- beginner leverage `2–5x`;
- `1–2%` risk per trade;
- `R:R >= 1:2`;
- Profit Factor, Sharpe and maximum-drawdown target labels;
- fixed slippage assumptions.

None of these values is promoted to a universal current recommendation by this review. If retained at all, they must be explicitly labelled as examples/internal heuristics or tied to a reproducible strategy-specific evidence set.

### REMOVE_OR_REWRITE

The restored comparison table assigns generic annual-return ranges such as:
- scalping up to `10–30%`;
- intraday `10–50%`;
- swing `20–100%`;
- position trading up to `50%` in a trend;
- arbitrage `5–15%`.

These ranges must not remain as generic expected returns without a defined dataset, strategy implementation, period, sample size, leverage, fees, slippage, survivorship treatment and out-of-sample evidence.

Also remove/rewrite:
- “risk-free arbitrage” or equivalent zero-risk framing;
- stale/current venue lists that have not been reverified;
- fixed fee numbers presented without venue/product/tier/date scope;
- current legal/tax assertions without dedicated official-source review;
- language that equates a strategy description with expected profitability.

## Shared public-copy boundary

A future bounded repair for these routes should clearly separate:
1. market/product mechanics supported by current primary sources;
2. dated historical events;
3. strategy examples and internal heuristics;
4. empirical performance claims requiring reproducible evidence;
5. legal/tax claims requiring a dedicated official-source review.

The public copy must not expose restored executable-looking constants as default live settings and must not imply that a disclaimer converts unsupported performance or legal claims into acceptable current guidance.

## Future deterministic repair requirements

Do not implement these public rewrites until the existing `funding-convergence-r1` repair receives an executed full-build proof.

When implementation resumes, route-specific gates should fail if generated public HTML contains unsupported generic performance ranges, static current tax claims, universal funding cadence, unscoped fee/leverage constants or risk-free wording as current guidance.

The gates must also require:
- `YMYL_TRADING_REVIEW_REQUIRED`;
- `HISTORICAL_REVERIFY_REQUIRED` until the relevant claims are independently upgraded;
- explicit evidence/source links for retained time-sensitive facts;
- an explicit non-execution/non-trading-authority boundary.

## Governance

- Public repairs applied: **no**.
- Route deletion: **no**.
- Redirect: **no**.
- Merge authorization: **no**.
- Production promotion authorization: **no**.
- Billing mutation: **no**.
- Runtime mutation: **no**.
- Trading effect: **none**.
- `can_trade=false`.
- `capital_permission=DENY`.
