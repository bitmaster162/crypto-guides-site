# Crypto Guides — Market-Neutral Claim Review R1

Baseline: `ddff9cb569e2ea6a109696c01b22a3b968bdbc56`
Target route: `rynochno-neytralnye-kriptostrategii-2026`
Review as of: `2026-08-28`
Task class: SOURCE-ONLY / BOUNDED PUBLIC REPAIR / FAIL-CLOSED

## Purpose

This document records the claim-level review decision for the restored market-neutral guide. It is a review receipt, not proof that a strategy is profitable, current, deployed, or suitable for live trading. It does not replace venue documentation, reproducible datasets, or independent out-of-sample evidence. `primarySourceRequired=true` therefore remains in force after this review document is bound.

## Terminal evidence that controls public framing

Later TradingOS evidence conflicts with the restored article's current-looking strategy promotion:

- `BASIS_SHOCK_REVERSION` — rejected at the train gate; no qualified candidate was promoted and validation/OOS remained closed.
- `BASIS_SHOCK_FUNDING_ALIGNMENT` — rejected/not promoted.
- `BASIS_FUNDING_CARRY` — rejected/not promoted.
- `BASIS_DISPERSION_REVERSION` — rejected/not promoted.
- `CROSS_ASSET_RESIDUAL_REVERSION` — rejected/not promoted.
- funding lead/lag — collector/research hypothesis only; healthy data collection or alignment is not evidence of an actionable edge.

The governing rule is latest-verdict propagation: a restored article must not present a family as a current positive-expectancy strategy when later evidence rejected it, left it research-only, or did not promote it beyond train/collector state.

## Claim disposition

### Retain with qualification

The repaired public route may retain:

- market-neutral / delta-neutral exposure as a portfolio construction concept;
- basis and funding as venue- and product-dependent variables that can be researched;
- pairs/cointegration, Kalman-style state estimation and DRL as research method families;
- execution, basis, funding, liquidity, margin/liquidation, venue/counterparty, model and operational risks;
- methodology requiring all-in costs, train/validation/OOS separation, stability checks and independent forward evidence before promotion.

### Remove or rewrite

The repaired public route must not retain as current facts:

- guaranteed, riskless or certainty-style arbitrage/hedge framing;
- generic positive-expectancy labels for funding, basis, pairs, liquidation-rebound or outcome-market strategies;
- rejected TradingOS families presented as viable current strategies;
- funding lead/lag presented as an actionable predictor merely because a collector or statistical relationship exists;
- PPO/LSTM/DRL presented as required or adopted before simpler baselines and independent evidence justify that choice;
- outcome-market mechanics presented as a proven cross-instrument arbitrage edge;
- exact performance, Sharpe/Sortino, capacity, opportunity-frequency, fee, pricing, volume, TPS or latency numbers that are not separately rebound to dated primary evidence.

## Required public boundary

The page must state that market-neutral does not mean risk-neutral. A reduction in directional beta does not remove basis, funding-rate, execution, liquidity, margin, venue/counterparty, model, data or operational risk.

The page may be used as a research taxonomy and validation checklist only. It must not provide live entry, exit, leverage, sizing, capital-routing or deployment authority.

## Lifecycle disposition

After the bounded public repair and verifier pass:

- this route must leave `POST_R13_CONTENT_TRUTH_HOLD`;
- it must derive `REVIEW_DOC_BOUND` from this exact `claimReview` reference;
- `latestVerdict` must be `REVIEW_DOC_BOUND_NO_CURRENTNESS_UPGRADE`;
- `primarySourceRequired` must remain `true`;
- `evidenceAsOf` and `reverifyAfter` remain `null` unless separately approved;
- the other four post-R13 content-truth routes remain on their exact existing HOLDs.

Expected corpus lifecycle counts after this source patch are:

- `REVIEW_DOC_BOUND = 16`
- `POST_R13_CONTENT_TRUTH_HOLD = 4`
- `UNBOUND_REVIEW_REQUIRED = 142`
- total `162`

## Effect boundary

This review does not authorize merge, production promotion, manual Actions reruns, manual Vercel deployment, route deletion/redirect, runtime changes, trading or capital movement.
