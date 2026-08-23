# BTC Futures public repair evidence R1

Date: 2026-08-15
Scope:
- `bitcoin-futures-2026`
- `btc-futures-trading-strategies`

State: `SOURCE_REPAIRS_APPLIED_EXACT_HEAD_BUILD_REVERIFY_PENDING`
Review status: `YMYL_TRADING_REVIEW_REQUIRED`
Currentness: `HISTORICAL_REVERIFY_REQUIRED`
Repair IDs:
- `bitcoin-futures-2026-r1`
- `btc-futures-trading-strategies-r1`

The prior implementation hold is cleared. `funding-convergence-r1`, the global direct-guide sanitizer, and `liquidation-cascades-r1` all received real exact-head Vercel execution before these two repairs were added. The BTC-futures repairs are now present in source, but remain unvalidated until a fresh exact-head build executes after this change.

## Why repair is required

The restored routes mix legitimate educational concepts with current-market assertions, venue lists, performance ranges, fees, leverage and risk thresholds, legal/tax statements and strategy labels that look like durable recommendations. Those claim classes have materially different evidence requirements.

The repair does not replace old magic numbers with new magic numbers. Time-sensitive venue/product facts require current primary-source evidence and explicit scope; strategy thresholds require reproducible evaluation; legal/tax claims require dedicated current official-source review.

## Current primary-source anchors rechecked 2026-08-15

### Funding cadence is product/instrument state

Bybit V5:
- `https://bybit-exchange.github.io/docs/v5/market/history-fund-rate`
- `https://bybit-exchange.github.io/docs/v5/market/instrument`

Bybit states that symbols can have different funding intervals and exposes `fundingInterval` in minutes as instrument metadata.

Coinbase derivatives:
- `https://help.coinbase.com/en/coinbase/derivatives/funding-rate`
- `https://help.coinbase.com/en/derivatives/perpetual-style-futures/funding-rate`

Coinbase describes hourly funding for the scoped perpetual products documented on those pages. This is product evidence, not proof of an exchange-independent universal cadence.

### Moscow Exchange historical product fact

Primary source:
- `https://www.moex.com/n95316`

Moscow Exchange announced that trading in cash-settled futures on its Bitcoin and Ether indices would begin 18 November 2025. The announcement states that the instruments were available only to qualified investors and did not involve delivery of digital currency.

This fact is retained only with its date and scope.

## Route: bitcoin-futures-2026

### KEEP_VERIFIED / bounded

- Perpetual funding transfers value between long and short holders according to the rules of the specific product.
- Funding cadence/formula are venue/product/instrument state and must be queried or reverified.
- Futures leverage creates liquidation risk; current margin and liquidation mechanics must be scoped to the specific contract.
- Dated exchange/product events may remain when date, product and source are explicit.

### REVERIFY_CURRENT

- leverage caps and margin requirements;
- maker/taker fees;
- volume and market-share figures;
- yield/APY or carry-return claims;
- current venue/product availability and jurisdictional access;
- throughput/latency and licensing/regulatory descriptions.

### INTERNAL_HEURISTIC / model input only

Fixed OI/funding thresholds, generic leverage ranges, exit windows and liquidation-heatmap triggers are not promoted to current public recommendations unless tied to a reproducible strategy-specific evidence set.

### REMOVE_OR_REWRITE

- unsupported win-rate and per-trade return claims;
- universal profitability certification or “working strategy” language;
- generic double-digit expected-return statements for basis/carry/funding structures;
- claims of universal intentional manipulation by institutional market makers;
- any implication that hedged or delta-neutral means risk-free.

## Route: btc-futures-trading-strategies

### KEEP_VERIFIED / bounded

- the 18 November 2025 MOEX launch fact with qualified-investor and cash-settlement scope;
- methodology guidance to include fees/slippage/funding in backtests;
- separation of model development from out-of-sample evaluation;
- position sizing, leverage and stops as context-dependent risk controls rather than universal constants.

### REVERIFY_CURRENT

- exchange fee schedules and maker/taker programs;
- leverage limits, maintenance margin and liquidation rules;
- current product/venue access;
- legal/regulatory treatment;
- all tax assertions.

The restored static Russian tax statement is not retained as current authority. A future tax statement requires a dedicated, dated official-source review with taxpayer/instrument scope.

### INTERNAL_HEURISTIC / example only

Restored leverage bands, risk-per-trade constants, R:R targets, Profit Factor/Sharpe/DD targets and fixed slippage assumptions are not universal current recommendations.

### REMOVE_OR_REWRITE

- generic annual-return tables for scalping, intraday, swing, position or arbitrage;
- risk-free arbitrage wording;
- stale venue lists;
- unscoped fixed fee numbers;
- current legal/tax assertions without dedicated official-source review;
- language that equates a strategy description with expected profitability.

## Shared public-copy boundary

The repaired pages separate:
1. current source-scoped market/product mechanics;
2. dated historical events;
3. strategy methodology and internal heuristics;
4. empirical performance claims requiring reproducible evidence;
5. legal/tax claims requiring dedicated official-source review.

Generated HTML must not expose restored executable-looking constants as default live settings and must not use a disclaimer to legitimize unsupported performance or legal claims.

## Deterministic repair requirements

The exact-head build must fail if generated repaired HTML leaks legacy generic return ranges, old win-rate/per-trade claims, fixed universal funding/leverage patterns, stale FTX current-venue references, static tax claims or risk-free wording.

Each repaired route must also preserve:
- `YMYL_TRADING_REVIEW_REQUIRED`;
- `HISTORICAL_REVERIFY_REQUIRED`;
- explicit primary-source links;
- the shared risk qualification that delta-neutral is not risk-neutral;
- an explicit non-execution/non-trading-authority boundary.

## Evidence ladder after this source change

- Evidence: READY.
- Public repair source: APPLIED ON DRAFT BRANCH for both routes.
- Exact-head BUILD: PENDING.
- Deployment/readback: PENDING.
- Production effect: NONE.

No BUILD PASS may be claimed for either BTC-futures repair until an exact-head executor emits their `PUBLIC_GUIDE_REPAIR_APPLY` and `PUBLIC_GUIDE_REPAIR_GATE` receipts.

## Governance

- Public repairs applied in source: **yes, draft branch only**.
- Route deletion: **no**.
- Redirect: **no**.
- Merge authorization: **no**.
- Production promotion authorization: **no**.
- Billing mutation: **no**.
- Runtime mutation: **no**.
- Trading effect: **none**.
- `can_trade=false`.
- `capital_permission=DENY`.
