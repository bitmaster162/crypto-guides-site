# Crypto Guides — Trading Risk Cluster Claim Review R1

Status: SOURCE REVIEW / NO PRODUCTION EFFECT

Scope: claim-level review of five restored public routes whose content includes current-market, leverage, funding, liquidation, return, execution, legal/tax, or HFT-risk assertions.

Reviewed routes:

- `bitcoin-futures-2026`
- `btc-futures-trading-strategies`
- `liquidation-cascades-arbitrage`
- `funding-convergence-arbitrage`
- `risk-freymvork-dlya-kripto-botov`

This document classifies claims; it does not certify a strategy, authorize trading, or establish production/runtime state.

## Disposition vocabulary

- `KEEP_VERIFIED` — supported by a current primary source with bounded wording.
- `REVERIFY_CURRENT` — time-sensitive venue/product/current-state claim; do not present as durable truth without fresh primary-source evidence.
- `INTERNAL_HEURISTIC` — threshold, parameter, leverage, sizing or rule may be retained only as an example/internal hypothesis, not as a universal recommendation or exchange rule.
- `REMOVE_OR_REWRITE` — wording overstates certainty, safety, causality, or performance and should not remain in a current public guide as written.
- `HISTORICAL` — may remain only with date/snapshot framing.

## Primary-source anchors used in this review

- Bybit funding history docs: https://bybit-exchange.github.io/docs/v5/market/history-fund-rate — each symbol can have a different funding interval; query instrument information for the interval.
- Coinbase US perpetual-style futures overview: https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview — funding is calculated/applied on an hourly cadence for this product.
- Coinbase International funding interval: https://help.coinbase.com/en/international-exchange/funding/what-is-the-funding-interval — current funding interval is one hour for that venue/product.
- Moscow Exchange launch notice: https://www.moex.com/n95316 — cash-settled futures on MOEXBTC/MOEXETH indices launched 18 Nov 2025 and were made available only to qualified investors.
- Binance Developer Docs catalog: https://developers.binance.com/en/docs/catalog — current official API catalog is the authority for supported Binance interfaces.

## Route: bitcoin-futures-2026

### KEEP_VERIFIED / bounded

- The Bybit open-interest methodology change can remain only with the already-reviewed primary-source boundary from the separate microstructure review. Do not turn the approximate display effect into a universal historical-data calibration rule.
- Funding direction semantics (positive funding: longs pay shorts; negative funding: shorts pay longs) are standard venue mechanics, but interval and formula details are venue/product specific.

### REVERIFY_CURRENT

- Exchange leverage caps, maker/taker fees, daily volume figures, yield/APY claims, specific venue technology throughput, DEX market-share percentages, and current product availability.
- Any claim naming a venue as currently regulated/available to a jurisdiction or describing a current licensing state.

### INTERNAL_HEURISTIC

- `OI +3%` confirmation threshold.
- `funding <= 0.05% / 8h` and `funding > 0.05% / 8h` trading thresholds.
- 2x–5x leverage examples.
- Any fixed exit window or signal threshold not tied to a cited dataset and out-of-sample evaluation.

### REMOVE_OR_REWRITE

- Approximate `75% win rate` and `3.8% per trade` liquidation-heatmap performance claims unless a reproducible dataset, sample window, costs/slippage model, and independent calculation are attached.
- Causal wording that institutional market makers deliberately push price to liquidation clusters as a general market fact. Rewrite as a hypothesis about liquidity concentration and forced-order-flow effects unless directly evidenced.
- “Working strategies”, “stable profit”, or equivalent wording that implies validated profitability from the article alone.
- “Double-digit annual returns” as a generic cash-and-carry outcome. Basis/funding carry is variable and venue/execution/counterparty dependent.

## Route: btc-futures-trading-strategies

### KEEP_VERIFIED / bounded

- MOEX crypto-linked futures existence may be retained only in exact form: Moscow Exchange announced cash-settled futures on the Bitcoin and Ether indices beginning 18 Nov 2025, available to qualified investors. Do not generalize this to unrestricted retail access or physical crypto delivery.
- Backtests should account for fees/slippage and use out-of-sample controls as methodological guidance, without claiming that a particular parameter guarantees robustness.

### REVERIFY_CURRENT

- Current exchange fee ranges, leverage limits, contract availability, venue access, and legal/regulatory claims.
- Russia tax/legal statements. A static `13%` statement is not durable legal authority and requires a separate current review against official tax/legal sources before publication as current guidance.

### INTERNAL_HEURISTIC

- Beginner/strategy-specific leverage ranges (2–5x, 5–20x, 3–10x, etc.).
- `1–2% risk per trade`, `R:R >= 1:2`, `Profit Factor > 1.5`, Sharpe labels, maximum-drawdown targets, slippage assumptions and indicator defaults.
- Example annual/monthly return objectives and sample trade-plan parameters.

### REMOVE_OR_REWRITE

- Annual-return ranges such as scalping `10–30%`, intraday `10–50%`, swing `20–100%`, arbitrage `5–15%` unless bound to a reproducible evidence set.
- “Risk-free arbitrage” language. Delta-neutral or hedged structures still retain basis, execution, liquidation, funding, venue/counterparty, collateral-transfer and operational risks.
- Any stale venue references in a current-availability list should be moved to historical context or removed after fresh verification.

## Route: liquidation-cascades-arbitrage

### REVERIFY_CURRENT

- Hard-coded Binance path `https://fapi.binance.com/fapi/v1/liquidationOrders`. Rebind against the current official Binance Futures API documentation before treating it as a supported integration path. The current official developer catalog is the authority; the reviewed source did not establish this specific path as current.
- Funding intervals and venue-specific mechanics.

### INTERNAL_HEURISTIC

- `funding_arbitrage_annualized_trigger = 0.20`.
- `max_margin_ratio = 0.60`.
- `oi_drop_rebound_threshold_pct = 20`.
- `max_delta_drift = 0.05` and `rebalance_portfolio` as an implementation pattern.

### REMOVE_OR_REWRITE

- “Without price risk” or equivalent zero-risk language.
- The statement that an OI decline over 20% identifies a complete leverage washout and a local bottom. This is a strategy hypothesis, not a universal market law.
- “Predicts squeeze boundaries” unless tied to an evaluated model and explicit error distribution.

## Route: funding-convergence-arbitrage

### KEEP_VERIFIED / bounded

- Funding-rate differentials across venues can exist and can motivate hedged/funding-spread strategies.
- Positive funding generally transfers value from longs to shorts and negative funding the reverse, subject to venue/product rules.

### REVERIFY_CURRENT

- Funding cadence. Do not hard-code `8 hours` as universal: Bybit explicitly documents symbol-dependent intervals; Coinbase current perpetual products use hourly funding mechanics.
- Venue APIs, transfer mechanics, margin rules and product availability.

### INTERNAL_HEURISTIC

- `min_funding_spread_annualized = 0.15`.
- `max_margin_ratio = 0.50`.
- `rebalance_threshold_bps = 20`.
- `max_delta_drift = 0.05`.

### REMOVE_OR_REWRITE

- “Risk-free profit”, “fully price independent”, or equivalent guarantees. Delta-neutral exposure does not remove basis, execution, liquidation, funding-sign, collateral, transfer, venue, counterparty and operational risks.
- Runtime wording that implies a currently deployed bot automatically moves funds or rebalances unless a separate runtime/effect receipt proves that state.

## Route: risk-freymvork-dlya-kripto-botov

### KEEP_AS_RESEARCH_CONCEPT / source-quality review still required

- CDaR, covariance shrinkage/Ledoit-Wolf, realized-spread decomposition, VPIN/order-flow-toxicity research and order-flow-imbalance concepts are legitimate research topics.
- Their presence in literature does not validate the article’s exact implementation, thresholds, latency claims, or “2026 institutional standard” framing.

### INTERNAL_HEURISTIC / REVERIFY

- Daily DD `3–5%`, weekly `6–8%`, monthly `10–12%`, total `15–20%`.
- `30` profitable virtual trades as a re-entry gate.
- `20–50 microseconds` staleness limits, percentile gates, reduction percentages and staged re-entry fractions.
- Claims that a specific IPC architecture or risk-control pattern is universally required for every 100+ bot fleet.

### REMOVE_OR_REWRITE

- “Top firms/market makers use X as the 2026 standard” without high-grade current primary/institutional evidence.
- Absolutist wording such as “fundamental vulnerability”, “unquestionable proof”, or “necessary for survival” when the cited evidence only supports one engineering approach.
- Any prescriptive threshold presented as institutional fact when the article’s source list is mixed across papers, vendor materials, blogs, aggregators and secondary summaries.

## Cross-route public contract

The following must hold before these routes can be treated as reviewed-current public guidance:

1. `ymyl=true` and a visible review/currentness state.
2. Performance claims require reproducible evidence, including sample, period, costs, slippage and methodology.
3. Venue/product/API values require current primary-source receipts.
4. Strategy thresholds remain `INTERNAL_HEURISTIC` unless independently validated and explicitly scoped.
5. Delta-neutral is not synonymous with risk-free.
6. Funding cadence is venue/product/symbol specific; no universal 8-hour rule.
7. Legal/tax assertions require a dedicated current official-source review.
8. No content here authorizes live trading, capital use, order placement, runtime deployment or production promotion.

## Current decision

All five routes remain publishable only as restored research under explicit review boundaries. None is promoted to `CURRENT_VERIFIED` by this review. The review is evidence for safer classification and later copy repair; it is not a trading signal or a certification of profitability.