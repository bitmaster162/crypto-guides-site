# Spot order filters: price, quantity and notional

Teaching examples for Binance Spot. All numbers are hypothetical; this is not authorization for real trades.

## 1. What must be checked
Binance Spot exposes rules for symbols, the exchange and assets through filters. Retrieve the applicable symbol rules from exchangeInfo and record the retrieval time. Do not reuse values from another symbol or product [1, 2].

| Filter | Meaning |
|---|---|
| PRICE_FILTER | Price bounds and tickSize divisibility. A zero value disables the corresponding constraint of this particular filter. |
| LOT_SIZE | Quantity bounds and stepSize divisibility. |
| MIN_NOTIONAL / NOTIONAL | Minimum or allowed range of notional value; for a limit order, evaluate price times quantity. |
| MARKET_LOT_SIZE | Separate quantity constraints for market orders. |
| PERCENT_PRICE / PERCENT_PRICE_BY_SIDE | Additional price range relative to an exchange-defined reference; limits can differ by side. |

With a nonzero increment, the Spot PRICE_FILTER and LOT_SIZE test divisibility of the value itself, not its difference from the minimum. Counting decimal places does not replace divisibility checks. These are documented Spot-filter rules [1], not universal rounding rules.

## 2. Paper example: minimum notional versus budget
Hypothetical limit order: fixed price 10.00 quote units, tickSize = 0.05; minQty = 0.03, maxQty = 3.00, stepSize = 0.03; minNotional = 10.00; maximum budget 10.00 before fees. Other exchange constraints are not specified in this example.

| Value checked | Notional | Conclusion within the example |
|---|---:|---|
| Price 10.03 | — | Not divisible by 0.05 |
| Quantity 1.00 at price 10.00 | 10.00 | Not divisible by 0.03 |
| Quantity 0.99 at price 10.00 | 9.90 | Divisible by step, but below minNotional |
| Quantity 1.02 at price 10.00 | 10.20 | Divisible by step, but above budget |

Under these assumptions and at the fixed price, no quantity satisfies both the minimum notional and budget. Do not automatically increase authorized spending to pass a filter or assume reducing quantity always solves the problem. Fees, available balance and other constraints may further reduce the feasible amount. This is a teaching example about constraints, not an instruction to place an order.

## 3. Dynamic price constraints
For PERCENT_PRICE and PERCENT_PRICE_BY_SIDE, Binance Spot documents the priority of an available (non-null) reference price. If the exchange establishes that no reference price exists, it uses VWAP over avgPriceMins, or the last price for a zero window. A local client's unknown reference availability is not the same as confirmed absence. PERCENT_PRICE_BY_SIDE uses bidMultiplierDown / bidMultiplierUp for BUY and askMultiplierDown / askMultiplierUp for SELL. The bounds are inclusive [1].

Separate hypothetical example: reference price 10.00, tickSize = 0.05; general-range multipliers 0.90 and 1.10; BUY multipliers 0.95 and 1.05, SELL multipliers 0.80 and 1.20.

| Rule being checked | Allowed range | Result for price 10.60 |
|---|---|---|
| PRICE_FILTER: divisibility only | Step 0.05 | Divisible |
| PERCENT_PRICE | 9.00–11.00 | In range |
| PERCENT_PRICE_BY_SIDE, BUY | 9.50–10.50 | Out of range |
| PERCENT_PRICE_BY_SIDE, SELL | 8.00–12.00 | In range |

This is a separate example, not a continuation of the budget calculation in section 2. It shows that the same price can pass one constraint and fail another. Consider all actually applicable constraints; the table does not assert that both dynamic filter types must coexist on a specific symbol. If applicability or reference-price freshness is unverified, the local decision remains HOLD; a known violation is sufficient to withhold a pass for the checked subset. This is a conservative teaching policy, not a Binance response code.

## 4. Why MARKET requires a different check
A MARKET order has no specified limit price. For applicable MIN_NOTIONAL / NOTIONAL checks, Spot documentation prioritizes an available (non-null) reference price; otherwise it uses VWAP over avgPriceMins, or the last price when avgPriceMins is zero. Applicability depends on applyToMarket, applyMinToMarket and applyMaxToMarket; consider MARKET_LOT_SIZE separately [1]. The price used for a filter does not guarantee the average execution price.

The quantity field represents a base-asset amount; quoteOrderQty for MARKET expresses the intended quote-asset spending when buying or proceeds when selling. These are different inputs, not interchangeable numbers [2]. Do not substitute an arbitrary local price for the exchange's evaluation or label a calculated quantity a confirmed fill.

## 5. Observable checks on teaching data
- Parse decimal strings with exact decimal arithmetic; verify bounds and divisibility before evaluating notional.
- Recompute notional from the final price and quantity, not their pre-rounding values.
- Check budget and estimated fees separately; never automatically expand the authorized spending limit.
- If filter data is absent or its freshness unverified, an applicable rule is unknown, or the required reference price is unavailable, leave the result UNKNOWN/HOLD. This is a conservative local requirement, not an exchange status.
- Even a successful local check does not establish acceptance, execution or the absence of other constraints. Order state and fills require exchange evidence.

The first standalone teaching test reproduced 20 original cases and ran 12 additional input checks. A separate dynamic-range teaching test passed 22 of 22 specified cases. These are two distinct, limited sets of checks, not validation of a single trading validator. Filter and reference-price freshness were synthetic model inputs; actual exchange data and fills were not tested. No independent review has taken place.

Passing a subset of filter tests does not validate a complete trading system. This material is not investment advice, a promise of profit or authorization for real operations.

## Sources
1. [Binance Spot Filters](https://developers.binance.com/en/docs/products/spot/filters)
   - [PRICE_FILTER and PERCENT_PRICE](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/filters.md#L38-L114)
   - [LOT_SIZE, MIN_NOTIONAL, NOTIONAL and MARKET_LOT_SIZE](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/filters.md#L129-L242)
2. [Binance Spot REST API](https://developers.binance.com/en/docs/products/spot/rest-api)
   - [exchangeInfo](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L886)
   - [quantity / quoteOrderQty](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L2189-L2210)
