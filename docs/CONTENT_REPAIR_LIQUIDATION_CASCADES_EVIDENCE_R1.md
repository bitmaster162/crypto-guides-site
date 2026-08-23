# Liquidation Cascades public repair evidence R1

Date: 2026-08-15
Scope: `liquidation-cascades-arbitrage`
State: `SOURCE_REPAIR_APPLIED_EXACT_HEAD_BUILD_REVERIFY_PENDING`
Review status: `YMYL_TRADING_REVIEW_REQUIRED`
Currentness: `HISTORICAL_REVERIFY_REQUIRED`
Repair ID: `liquidation-cascades-r1`

The prior implementation hold is cleared: the predecessor exact head `20ed5033aa7211a37e28665701646a65a8a9c278` received a real Vercel build that executed both `PUBLIC_GUIDE_REPAIR_*` for funding convergence and the global `DIRECT_GUIDE_SANITIZER_*` gates successfully. This document now binds the next bounded public-copy repair. The new liquidation repair remains source-only until a fresh exact-head build executes after this change.

## Decision

The restored liquidation-cascade article must not treat a user-account force-order REST endpoint as a public liquidation feed, must not rely on a deprecated Bybit liquidation topic, and must not present liquidation/OI thresholds as exchange rules or deterministic bottom/squeeze predictors.

The bounded public repair preserves the educational microstructure concept while removing stale integration paths, zero-risk language, deterministic market-bottom claims, executable-looking universal thresholds and unproven runtime implications.

## Current venue/API evidence

### Binance USDⓈ-M Futures

Primary sources rechecked 2026-08-15:

- Binance official futures connector source/documentation:
  `https://github.com/binance/binance-futures-connector-python/blob/main/binance/websocket/um_futures/websocket_client.py`
- Binance official CLI USDⓈ-M Futures examples:
  `https://github.com/binance/binance-cli/blob/master/examples/derivatives-trading-usds-futures.md`

The official WebSocket client documents:
- symbol liquidation stream `<symbol>@forceOrder`;
- all-market liquidation stream `!forceOrder@arr`.

The official CLI documentation exposes:
- `GET /fapi/v1/forceOrders` as **User's Force Orders (USER_DATA)**.

### Binance disposition

`GET /fapi/v1/forceOrders` must not be presented as the public global liquidation stream. The documented public market integration surface is the `forceOrder` WebSocket stream, while the REST force-orders route belongs to user-account data.

This evidence does not claim that the WebSocket stream is a complete historical liquidation database or that it is sufficient by itself for backtesting. Collection semantics, gaps, reconnection, sampling, retention, symbol coverage and timestamp handling remain implementation concerns.

### Bybit V5

Primary sources rechecked 2026-08-15:

- current public liquidation topic:
  `https://bybit-exchange.github.io/docs/v5/websocket/public/all-liquidation`
- V5 changelog:
  `https://bybit-exchange.github.io/docs/changelog/v5`

The current page documents:
- topic `allLiquidation.{symbol}`;
- coverage for USDT, USDC and inverse contracts;
- push frequency 500 ms;
- event fields including symbol, side, executed size and bankruptcy price.

The 2025-02-20 V5 changelog states:
- `All Liquidation` was introduced as a new topic for full liquidation events;
- the old `Liquidation` topic was deprecated because it only pushed one liquidation per second and could be discarded.

### Bybit disposition

A current public guide must use the `allLiquidation.{symbol}` evidence boundary rather than imply that the old liquidation topic remains the preferred complete stream. The documented 500 ms push frequency is transport/product behavior, not proof that every downstream collector receives a gap-free historical record.

## Claim classification for the restored route

### KEEP_VERIFIED / bounded

- Liquidation events and forced position closures are observable exchange events on supported derivatives venues.
- Public liquidation feeds exist on Binance and Bybit, but API transport, stream naming and event semantics are venue-specific.
- A cascade can create concentrated forced order flow and short-lived liquidity stress; this is a market-microstructure mechanism, not a guaranteed trading edge.

### REVERIFY_CURRENT

- Every venue endpoint, stream name, payload field, push frequency, authentication requirement and product coverage.
- Funding cadence and margin/liquidation mechanics for any named product.
- Any exchange-specific claim about current data completeness, retention, throttling or reconnect behavior.

### INTERNAL_HEURISTIC / research hypothesis

- `funding_arbitrage_annualized_trigger = 0.20`.
- `max_margin_ratio = 0.60`.
- `oi_drop_rebound_threshold_pct = 20`.
- `max_delta_drift = 0.05`.
- any fixed rebound window, liquidation-intensity trigger, leverage cap or automatic rebalance threshold not tied to a reproducible dataset and scoped risk model.

These values are not exchange rules and are not promoted to current public recommendations by this evidence review.

### REMOVE_OR_REWRITE

- the legacy public-feed claim around `https://fapi.binance.com/fapi/v1/liquidationOrders` or equivalent stale/public-REST framing not established by current official documentation;
- use of `GET /fapi/v1/forceOrders` as if it were public market-wide liquidation data;
- stale Bybit liquidation-topic instructions that ignore the current `allLiquidation.{symbol}` stream and deprecation history;
- “without price risk”, “risk-free” or equivalent zero-risk language;
- claims that an OI decline over a fixed percentage proves a complete leverage washout or identifies a local bottom;
- claims that a liquidation cluster deterministically predicts squeeze boundaries without an evaluated model, dataset, error distribution, fees/slippage treatment and out-of-sample evidence;
- runtime wording that implies a live rebalance/transfer/trading bot without a separate runtime/effect receipt.

## Required risk boundary

The repaired public copy must state that liquidation-event strategies retain, at minimum:
- adverse directional and basis movement during/after forced flow;
- partial or delayed stream observation;
- gaps/reconnect and timestamp-ordering risk;
- slippage, spread expansion and order-book depletion;
- liquidation risk on the user's own leveraged legs;
- funding and margin-rule changes;
- venue, API, collateral, counterparty and operational risk;
- selection/confirmation bias when inferring bottoms or squeezes from observed cascades.

Delta-neutral or hedged construction does not erase these risks.

## Deterministic public-repair gate

The source repair is now registered as `liquidation-cascades-r1`. Its generated public HTML must fail verification if it contains any of the following as current/executable guidance:

- `fapi.binance.com/fapi/v1/liquidationOrders`;
- legacy internal constants `funding_arbitrage_annualized_trigger`, `max_margin_ratio`, `oi_drop_rebound_threshold_pct`, `max_delta_drift`;
- `rebalance_portfolio` runtime implication;
- zero-price-risk wording;
- deterministic guaranteed-bottom or guaranteed-squeeze claims.

The gate also requires current review/currentness/YMYL labels, the current Binance/Bybit source markers, the distinction between `/fapi/v1/forceOrders` and public market streams, an explicit non-execution boundary and the shared risk/review qualification text.

## Evidence ladder after this source change

- Evidence: READY.
- Public repair source: APPLIED ON DRAFT BRANCH.
- Exact-head BUILD for the new repair: PENDING.
- Deployment/readback for the new repair: PENDING.
- Production effect: NONE.

No BUILD PASS may be claimed for `liquidation-cascades-r1` until Vercel or another exact-head executor actually runs the build and emits `PUBLIC_GUIDE_REPAIR_APPLY` and `PUBLIC_GUIDE_REPAIR_GATE` receipts for this slug.

## Governance

- Public repair applied in source: **yes, draft branch only**.
- Route deletion: **no**.
- Redirect: **no**.
- Merge authorization: **no**.
- Production promotion authorization: **no**.
- Runtime mutation: **no**.
- Trading effect: **none**.
- `can_trade=false`.
- `capital_permission=DENY`.
