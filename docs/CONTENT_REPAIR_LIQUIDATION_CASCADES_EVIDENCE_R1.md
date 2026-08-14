# Liquidation Cascades public repair evidence R1

Date: 2026-08-14
Scope: `liquidation-cascades-arbitrage`
State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
Review status: `YMYL_TRADING_REVIEW_REQUIRED`
Currentness: `HISTORICAL_REVERIFY_REQUIRED`

This document prepares the evidence boundary for a later public-copy repair. It deliberately does **not** add another post-build repair while the existing `funding-convergence-r1` repair has not yet received a full exact-head build execution.

## Decision

The restored liquidation-cascade article must not treat a user-account force-order REST endpoint as a public liquidation feed, must not rely on a deprecated Bybit liquidation topic, and must not present liquidation/OI thresholds as exchange rules or deterministic bottom/squeeze predictors.

A future bounded public repair should preserve the educational microstructure concept while removing stale integration paths, zero-risk language, deterministic market-bottom claims, and executable-looking universal thresholds.

## Current venue/API evidence

### Binance USDⓈ-M Futures

Primary source: Binance official `binance/binance-connector-go` repository, source commit `a0c61d1ef7539023322e3b138a16cc077f9ea1d1`.

Public WebSocket market-stream documentation:
`clients/derivativestradingusdsfutures/src/websocketstreams/docs/MarketAPI.md`

The generated official connector documentation exposes:
- `LiquidationOrderStreams` at `/<symbol>@forceOrder`;
- `AllMarketLiquidationOrderStreams` at `/!forceOrder@arr`;
- both as market WebSocket streams with no authorization requirement in the generated API docs.

User-account REST documentation:
`clients/derivativestradingusdsfutures/src/restapi/docs/TradeAPI.md`

The same official connector documentation exposes:
- `GET /fapi/v1/forceOrders` as **User's Force Orders (USER_DATA)**.

### Binance disposition

`GET /fapi/v1/forceOrders` must not be presented as the public global liquidation stream. The current public integration surface documented by Binance's official connector is the `forceOrder` WebSocket market stream, while the REST force-orders route belongs to user-account data.

This evidence does not claim that the WebSocket stream is a complete historical liquidation database or that it is sufficient by itself for backtesting. Collection semantics, gaps, reconnection, sampling, retention, symbol coverage and timestamp handling remain implementation concerns.

### Bybit V5

Primary source: Bybit V5 API documentation.

Current public liquidation topic:
`https://bybit-exchange.github.io/docs/v5/websocket/public/all-liquidation`

The page documents:
- topic `allLiquidation.{symbol}`;
- coverage for USDT, USDC and inverse contracts;
- push frequency 500 ms;
- event fields including symbol, side, executed size and bankruptcy price.

Changelog authority:
`https://bybit-exchange.github.io/docs/changelog/v5`

The 2025-02-20 V5 changelog states:
- `All Liquidation` was introduced as a new topic for full liquidation events;
- the old `Liquidation` topic was deprecated because it only pushed one liquidation per second and could be discarded.

### Bybit disposition

A current public guide must use the `allLiquidation.{symbol}` evidence boundary rather than imply that the old liquidation topic remains the preferred complete stream. The documented 500 ms push frequency is transport/product behavior, not proof that every downstream collector receives a gap-free historical record.

## Claim classification for the restored route

### KEEP_VERIFIED / bounded

- Liquidation events and forced position closures are observable exchange events on supported derivatives venues.
- Public liquidation feeds exist on Binance and Bybit, but the API transport, stream naming and event semantics are venue-specific.
- A cascade can create concentrated forced order flow and short-lived liquidity stress; this should be described as a market-microstructure mechanism, not a guaranteed trading edge.

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

- the legacy public-feed claim around `https://fapi.binance.com/fapi/v1/liquidationOrders` or any equivalent stale/public-REST framing not established by current official documentation;
- use of `GET /fapi/v1/forceOrders` as if it were public market-wide liquidation data;
- stale Bybit liquidation-topic instructions that ignore the current `allLiquidation.{symbol}` stream and deprecation history;
- “without price risk”, “risk-free” or equivalent zero-risk language;
- claims that an OI decline over a fixed percentage proves a complete leverage washout or identifies a local bottom;
- claims that a liquidation cluster deterministically predicts squeeze boundaries without an evaluated model, dataset, error distribution, fees/slippage treatment and out-of-sample evidence;
- runtime wording that implies a live rebalance/transfer/trading bot without a separate runtime/effect receipt.

## Required risk boundary for future public repair

A future public copy must state that liquidation-event strategies retain, at minimum:
- adverse directional and basis movement during/after forced flow;
- partial or delayed stream observation;
- gaps/reconnect and timestamp-ordering risk;
- slippage, spread expansion and order-book depletion;
- liquidation risk on the user's own leveraged legs;
- funding and margin-rule changes;
- venue, API, collateral, counterparty and operational risk;
- selection/confirmation bias when inferring bottoms or squeezes from observed cascades.

Delta-neutral or hedged construction does not erase these risks.

## Future deterministic public-repair gate

Do not implement this gate until `funding-convergence-r1` has an executed full-build proof. When implementation resumes, the liquidation route gate should fail if generated public HTML contains any of the following as current/executable guidance:

- `fapi.binance.com/fapi/v1/liquidationOrders`;
- `/fapi/v1/forceOrders` described as public market-wide liquidation data;
- the deprecated Bybit liquidation topic presented as the preferred current full feed;
- `funding_arbitrage_annualized_trigger`;
- `max_margin_ratio`;
- `oi_drop_rebound_threshold_pct`;
- `max_delta_drift`;
- `rebalance_portfolio`;
- zero-risk / price-risk-free wording;
- deterministic local-bottom or squeeze-boundary claims.

The future gate must also require current review/currentness/YMYL labels and an explicit non-execution boundary.

## Governance

- Public repair applied: **no**.
- Route deletion: **no**.
- Redirect: **no**.
- Merge authorization: **no**.
- Production promotion authorization: **no**.
- Runtime mutation: **no**.
- Trading effect: **none**.
- `can_trade=false`.
- `capital_permission=DENY`.
