# Funding Convergence public content repair R1

Date: 2026-08-14
Scope: `funding-convergence-arbitrage`
Decision: `BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS`
Review status after repair: `YMYL_TRADING_REVIEW_REQUIRED`
Currentness after repair: `HISTORICAL_REVERIFY_REQUIRED`

## Why this repair exists

The restored article contained venue-independent execution language and hard-coded parameters that were not supported as universal current facts. R1 repairs only the public copy. It does not certify a profitable strategy, current runtime implementation, live bot, transfer path, leverage policy, or universal risk thresholds.

The original restored source remains in Git history and in the source corpus for provenance. The build applies a deterministic public-artifact repair to the single route and then verifies that the legacy executable-looking claims are absent from the generated HTML.

## Current primary-source evidence

### Bybit instrument-specific cadence

Source: https://bybit-exchange.github.io/docs/v5/market/instrument
Accessed: 2026-08-14
Evidence class: verified fact, current vendor documentation

The V5 `Get Instruments Info` response exposes `fundingInterval` as an integer funding interval in minutes. This means the interval is instrument metadata and must be read from current product state rather than assumed from a universal constant.

Source: https://bybit-exchange.github.io/docs/v5/market/history-fund-rate
Accessed: 2026-08-14
Evidence class: verified fact, current vendor documentation

Bybit's `Get Funding Rate History` documentation explicitly states that each symbol can have a different funding interval and directs clients to instruments-info to query it.

### Coinbase product/version dependence

Source: https://help.coinbase.com/en/coinbase/derivatives/funding-rate
Accessed: 2026-08-14
Evidence class: verified fact, current vendor documentation

Coinbase's International Derivatives help page describes funding payments as charged or credited hourly for that product and explains the sign convention: positive funding means longs pay shorts; negative funding means shorts pay longs.

Source: https://help.coinbase.com/en/international-exchange/deribit/coinbase-faqs
Accessed: 2026-08-14
Evidence class: verified fact, current vendor migration documentation

The Deribit integration FAQ describes a different upgraded-platform mechanic: funding accrues continuously during the day and the net amount settles once daily at 08:00 UTC. This does not contradict the scoped International Derivatives page; it demonstrates why venue, product and platform version must be explicit in any current funding claim.

## Resulting claims boundary

Verified / retained:
- funding payments exist between long and short holders in perpetual products;
- payment direction follows the sign convention defined by the specific venue/product;
- funding cadence is product/instrument state and must be queried or reverified;
- delta-neutral positioning can reduce directional exposure but does not remove non-directional risks.

Removed from public artifact as unsupported universal/actionable claims:
- universal 8-hour cadence;
- guaranteed, risk-free or fully price-independent profit framing;
- `min_funding_spread_annualized=0.15` as a universal entry threshold;
- `max_margin_ratio=0.5` as a universal safety threshold;
- `rebalance_threshold_bps=20` as a universal rebalance rule;
- `max delta drift=0.05` with automatic `rebalance_portfolio` as if a live runtime were proven;
- legacy Binance and Bybit RPC endpoint presentation as executable public configuration.

## Risk qualification retained

The repaired public copy explicitly names basis, execution/slippage, liquidation on an individual leg, funding sign/size changes, collateral and margin fragmentation, fees, transfer latency/halts, API/data availability, venue/counterparty and operational mismatch as remaining risks. No numerical trading threshold is promoted to a current universal rule.

## Unresolved / intentionally not claimed

- Current funding interval for any specific Binance symbol was not established in this R1 repair.
- No venue-specific fee schedule, leverage limit, liquidation formula, collateral transfer SLA or profitability estimate is certified here.
- No live bot/runtime/funds-movement receipt was reviewed.
- No trade execution permission is created by this document or by the public repair.

## Gate

`PUBLIC_GUIDE_REPAIR_GATE` must fail if the generated route regains legacy executable parameters, legacy RPC endpoints, universal eight-hour cadence wording, price-independence overclaim, or loses the YMYL/currentness/non-execution boundary.
