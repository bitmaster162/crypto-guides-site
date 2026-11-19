---
site: crypto.bitevo.work
slug: perpetual-funding-and-liquidation-risk
path: /en/guides/perpetual-funding-and-liquidation-risk
alternate: /guides/perpetual-funding-and-liquidation-risk
lang: en
category: Risk Management
title: "Perpetual futures funding: payments, hedging and liquidation risk"
seo_title: "Perpetual Funding and Liquidation Risk | Crypto Guides"
description: "How to audit perpetual funding, margin, basis and execution costs without risk-free profit claims."
reviewed: "2026-11-19"
next_review: "2027-02-19"
related: [https://crypto.bitevo.work/en/guides/low-cap-grid-bots-costs-and-risks]
schema: [Article, BreadcrumbList]
research_source: "Internal funding-convergence repair review (2026-08-14); current product documentation rechecked 2026-11-19; no live fills or account evidence"
sources:
  - title: "Bybit V5 Get Funding Rate History"
    url: https://bybit-exchange.github.io/docs/v5/market/history-fund-rate
  - title: "Bybit V5 Get Instruments Info"
    url: https://bybit-exchange.github.io/docs/v5/market/instrument
  - title: "Coinbase US perpetual-style futures overview"
    url: https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview
  - title: "Coinbase perpetual-style futures settlement mechanics"
    url: https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics
  - title: "Bybit V5 Get Position Info"
    url: https://bybit-exchange.github.io/docs/v5/position
  - title: "Bybit margin calculation update"
    url: https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation
toc: [{"title":"What funding is","id":"1-what-funding-is"},{"title":"Rate, sign and schedule","id":"2-rate-sign-and-schedule"},{"title":"Why a hedge does not eliminate liquidation","id":"3-why-a-hedge-does-not-eliminate-liquidation"},{"title":"Paper cost example","id":"4-paper-cost-example"},{"title":"Research protocol","id":"5-research-protocol"},{"title":"Limits and authority","id":"6-limits-and-authority"},{"title":"Primary sources and evidence boundary","id":"7-primary-sources-and-evidence-boundary"}]
layout: ../../../layouts/EnglishReviewedGuideLayout.astro
---

Research guide · derivatives mechanics, not a trading signal

# Perpetual futures funding: why “delta-neutral” does not mean “risk-free”

**Checked 19 November 2026.** This article explains how to audit perpetual-contract mechanics and a hypothetical cost model. It is not investment advice, an instruction to open positions or a promise of returns. Leverage, counterparty risk and price moves can destroy the entire posted collateral; further obligations depend on the specific product rules. Nothing here grants trading or capital authority.

## 1. What funding is

A conventional perpetual futures contract lacks a scheduled expiry, but the term *perpetual-style* does not certify identical expiry rules across products. [Coinbase's US perpetual-style overview](https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview) describes five-year contracts that do expire, while [another Coinbase settlement help page](https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics) describes a contract without a fixed expiry. These descriptions must not be treated as one verified contract specification; identify the exact product. On some products, venues use **funding** — periodic cash credits or debits between long and short holders associated with a mechanism intended to keep derivatives and underlying markets aligned. Funding is **not** an insured deposit yield and cannot be projected to an annual return without accounting for all other cash flows.

For [Coinbase US perpetual-style futures](https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview), a positive funding rate means longs pay shorts; a negative rate reverses the direction. That convention is grounded in the named product; verify the terms separately for every other venue and contract type.

## 2. Rate, sign and schedule

The rate on a screen today is not a locked sequence of future payments. It may change or switch sign, and it may no longer apply after a position closes. Mind the units: a rate **per settlement period** is not an annualized return.

[Bybit V5 funding history](https://bybit-exchange.github.io/docs/v5/market/history-fund-rate) expressly says intervals differ by instrument; [the instruments endpoint](https://bybit-exchange.github.io/docs/v5/market/instrument) exposes *fundingInterval* in minutes. By contrast, [Coinbase describes hourly rate calculation](https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview) for its specified US perpetual-style product. Therefore, “funding occurs every 8 hours everywhere” is not a valid universal rule.

Even for related products, the **rate calculation window**, **cash posting time**, and **economic accrual period** may not be identical. [Coinbase documents settlement mechanics separately](https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics). For a comparison, record the instrument, timezone, current version of the venue rules and timestamped historical rates — not one screenshot.

## 3. Why a hedge does not eliminate liquidation

In a hypothetical “spot + short perpetual” setup, a long spot holding may offset some directional changes in the short derivative. **Combined portfolio valuation is not the same as available collateral at the venue holding the short.** One leg can be liquidated before gains on the other become available to cover it.

Basis risk and mismatched hedge notionals remain, as do entry and exit fees, spread, slippage, collateral transfer delays, API outages and venue failure. Funding can turn negative; leverage and margin requirements may change. Calling the structure “fully risk-free” would be misleading.

[Bybit V5 Position Info](https://bybit-exchange.github.io/docs/v5/position) describes *liqPrice* under cross margin as an estimate, and the field can be blank for portfolio margin. [Bybit's margin-calculation update](https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation) ties parts of the margin computation to mark price and margin mode. This guide therefore provides neither a universal “safe leverage” multiple nor one universal liquidation-distance percentage.

## 4. Paper cost example

**Synthetic illustration**, not a market quote or backtest: a **$5,000** spot leg and a **$5,000** short perpetual notional. If a *hypothetical* funding rate for one settlement period were **+0.01%**, the short might receive approximately **+$0.50** before costs with unchanged notional. A negative rate would reverse the payment direction.

Assume solely for arithmetic that each of **4** fills to open and close both legs has $5,000 notional and a *hypothetical* **0.04%** fee. Total fee-bearing turnover would be **$20,000**, producing **$8.00** in illustrative fees. These are not quotes from any venue.

| Illustrative component in one scenario | USD |
| --- | ---: |
| Funding credited to short for one period | +0.50 |
| Fees on four fills | −8.00 |
| Difference before spread, basis and other costs | **−7.50** |

**Do not call this the return of a strategy.** The example deliberately omits mark-price moves, a real funding schedule, borrowing costs, liquidation, tax, transfer risk and partial fills. Do not add one hypothetical payment to unverified closed-trade PnL or count funding twice after it has entered account balances.

## 5. Research protocol

For a paper audit, not for sending real orders, record:

- **Exact contract.** Venue, product type, settlement currency, margin mode and when the documented rules were checked.
- **Rate history.** Timestamped rates and instrument-specific intervals; label missing or unverified points UNKNOWN.
- **Both legs.** Notionals, actual or modeled fills, spread, fees, inventory and collateral availability at each venue.
- **Stress conditions.** Funding sign reversal, abrupt basis changes, API interruption, delayed collateral transfers and liquidation of one leg.
- **Reconcilable results.** Equity, realized and unrealized components, funding debits and credits, cost to exit and reproducible source data.

A modeled price touch does not establish an executed fill. An absent funding calculation, uncertain position state or unavailable margin should be **UNKNOWN/HOLD**, not fictitious positive PnL. Evaluate hypotheses on periods not used to select their parameters.

## 6. Limits and authority

The Bybit and Coinbase documents support these mechanics **within the specified products and versions**, not the profitability of a particular pair or trading system. The Crypto Guides internal funding-convergence review dated 14 August 2026 classified a universal eight-hour cadence, fixed thresholds and “risk-free” profit as unsupported claims. This article does **not** restore them.

**Research validation is not trading authorization.** There are no current live-account calculations, verified fills, safe leverage multiples or buy/sell signals here. Total capital loss is possible. Anyone considering an independent financial decision must review the specific contractual terms and risks; this project grants no capital-use authority.

## 7. Primary sources and evidence boundary

Primary sources: [Bybit funding history](https://bybit-exchange.github.io/docs/v5/market/history-fund-rate), [Bybit instruments info](https://bybit-exchange.github.io/docs/v5/market/instrument), [Coinbase perpetual-style futures overview](https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview), [Coinbase settlement mechanics](https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics), [Bybit position info](https://bybit-exchange.github.io/docs/v5/position), and [Bybit's margin-calculation update](https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation). These documents do not establish expected profitability, immunity from liquidation or any trading system's correctness. Product rules can change; next review is 19 February 2027.
