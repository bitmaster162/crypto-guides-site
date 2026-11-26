# Spot commissions: from fills to balance changes

Teaching examples for Binance Spot. Prices, quantities, commissions and valuation rates in the examples are hypothetical and are not current exchange fee schedules. Use paper exercises or saved teaching data only, without connecting to an exchange or using real accounts, API keys or orders.

## 1. A quoted rate is not a confirmed deduction
A fill's commission can depend on the symbol, maker/taker role, buy or sell side and applicable account conditions. Binance Spot documentation distinguishes standardCommission, specialCommission and taxCommission, as well as conditions for paying fees in BNB at a discount [1, 2]. A discount on standard commission does not imply the same discount on the other components. Do not apply an arbitrary current rate to historical fills or assume commissions are always paid in a single asset.

A current-rate response or a commission calculation for a test order does not establish an actual deduction on a completed trade. Fill accounting needs the actual quantity, transacted amount, fee amount and fee asset. The taxCommission field is API terminology, not a conclusion about a person's tax obligations. Taxes are not calculated here, and no tax advice is provided.

## 2. Keep changes separate for each asset
In BASE/QUOTE, BASE is the asset whose quantity is measured, and QUOTE is the unit of price and value. A buy adds the filled base quantity and subtracts the transacted quote amount; a sell does the reverse. The actual fee is subtracted from the change in its corresponding asset. If the fee is deducted in a separate asset F, it cannot be subtracted arithmetically from BASE quantity or QUOTE amount without conversion of units.

| Separate teaching BUY | BASE change | QUOTE change | F change |
|---|---:|---:|---:|
| Buy 1.000 BASE for 100.00 QUOTE, fee 0.001 BASE | +0.999 | −100.00 | 0 |
| Buy 1.000 BASE for 100.00 QUOTE, fee 0.10 QUOTE | +1.000 | −100.10 | 0 |
| Buy 1.000 BASE for 100.00 QUOTE, fee 0.002 F | +1.000 | −100.00 | −0.002 |

These are alternative hypothetical examples with supplied deductions, not a sequence of trades or a claim that a given payment option is available for a BUY. Each assumes no other changes and sufficient starting balance of the relevant asset. Actual availability of funds, reservations, instrument constraints and executability are not tested.

## 3. A teaching cycle and remaining base inventory
Consider a separate paper example with a buy commission in BASE and a sell commission in QUOTE. Buy 1.000 BASE for 100.00 QUOTE. The 0.001 BASE fee leaves a net increase of 0.999 BASE. Assume the next trade sells precisely 0.999 BASE at 102.00 QUOTE per unit, with a fee of 0.101898 QUOTE.

| Measure | Value in stated units |
|---|---:|
| Initial QUOTE expenditure | 100.00 |
| Sale proceeds before commission | 101.898 |
| Sell commission in QUOTE | 0.101898 |
| Net QUOTE proceeds | 101.796102 |
| Total QUOTE change | +1.796102 |
| Total BASE change | 0.000 |

Under the stated conditions the QUOTE change already incorporates both commissions: the buy reduced acquired quantity and the sell reduced proceeds. Subtracting the value of a fee already accounted for would double-count it. Selling the original 1.000 instead of the net acquired 0.999 would require other BASE inventory; it cannot automatically be treated as closing this purchase alone. The table does not establish available balance or instruct anyone to submit an order.

## 4. A separate fee asset requires separate valuation
In another hypothetical cycle, both the buy and sell are for 1.000 BASE. Expenditure is 100.00 QUOTE and proceeds are 102.00 QUOTE. The buy fee is 0.002 F and the sell fee is 0.003 F. The change vector is BASE 0, QUOTE +2.00, F −0.005. This is not yet the full change in value measured in QUOTE.

At a single hypothetical valuation rate of 1 F = 20.00 QUOTE, the fee in F is valued at 0.10 QUOTE and the aggregate valued change is +1.90 QUOTE. If the rate is unspecified or its provenance unknown, preserve the separate −0.005 F change rather than declaring +2.00 the entire cycle's net profit. Record the quotation unit, valuation time, source and method. This example values the change vector at one hypothetical rate; it is not tax or historical cost-basis accounting for F, complete portfolio PnL, or a return forecast.

## 5. Minimal reconciliation of actual fills
For executionReport, documentation identifies l and L as the last executed quantity and price, z and Z as cumulative quantity and transacted amount, Y as the last transacted quote amount, n and N as fee amount and asset, and t as trade ID; x is execution type and X is order status [3]. REST myTrades history provides individual trade rows with id, orderId, qty, quoteQty, commission and commissionAsset [4].

| Observation | Accounting treatment |
|---|---|
| Multiple partial fills of one order | Include each confirmed trade once; do not sum cumulative quantities on every notification. |
| Repeated delivery of the same trade | Match record identity within venue, account and symbol scope, including trade ID and any other attributes required by the specific format. Do not count a repeat as another fee. |
| Positive commission but missing fee asset | HOLD for full reconciliation. Do not default to QUOTE. |
| Fee field absent or value unknown | UNKNOWN, not a zero fee. An explicitly confirmed zero differs from missing data. |
| Order status FILLED but incomplete fill detail | Status alone does not establish a complete fee record. Reconcile fill detail and actual balance movements. |

Proposed teaching procedure: retain record provenance, time, identifiers and units, reconcile actual fills and balance movements, and handle transfers and other movements separately. If amounts disagree, do not replace a recorded amount with your own price-times-quantity calculation without checking rounding and format. Do not treat a hypothetical amount as net PnL while material data remain missing. HOLD and UNKNOWN are local reconciliation labels, not Binance statuses.

## 6. Additional checks before valuing the result
The R2 teaching model uses normalized fill records for one pair rather than raw API messages. It checks consistency of trade side within a single identified order, rejects unknown fields in its limited schema, and requires a common hypothetical valuation time for multiple separate fee assets. Do not transplant these rules onto raw exchange messages: additional provider fields need deliberate schema mapping, not automatic rejection of every API extension.

| Situation in the teaching model | Outcome |
|---|---|
| Two different trades of the same order have opposite BUY and SELL sides | HOLD: order-side conflict |
| An unknown additional-commission field appears in a normalized record | HOLD: field meaning not established |
| Asset changes are known, but rates for separate fee assets refer to different valuation times | SUBSET_OK for the change vector; aggregate valuation withheld |
| Total BASE change is zero, but completeness of the fill set is unverified | HOLD: a closed cycle is not established |

For example, a separate hypothetical fill set gives BASE 0, QUOTE +2.00, F −0.002, G −0.003. At a common supplied valuation time, with rates of 1 F = 20.00 QUOTE and 1 G = 10.00 QUOTE, the valued change is 2.00 − 0.04 − 0.03 = +1.93 QUOTE. If rates refer to different times or their comparability is unknown, this teaching model withholds aggregate valuation. Matching time strings alone do not establish rate freshness or provenance. This is a static valuation of supplied changes, not historical cost basis.

Even zero total BASE change and the presence of buys and sells do not establish that the fills belong to one strategy or that an original position has been fully closed. Those conclusions require verified selection boundaries, fill attribution, opening and closing balances and other movements. SUBSET_OK denotes passing specific limited checks, not complete account reconciliation.

The original teaching model passed 24 of 24 initial scenarios. On 12 additional scenarios it passed 7 of 12; 5 gaps against three additional requirements were observed. The corrected candidate preserved the exact results of all previous 24 checks and passed 12 of 12 new cases. This is a finite local test set, not independent validation, an exchange audit or confirmation of operation with real accounts. Fill completeness and valuation rates were supplied premises, not obtained from an exchange.

This material supplements the general Grid OS guide on costs, liquidity and residual inventory. It is limited to separate-asset accounting of supplied Spot fills; it does not automatically extend to futures, margin borrowing or every special settlement type. The examples are not investment advice or authorization to trade.

## Sources
1. [Binance Spot commission FAQ, pinned](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/faqs/commission_faq.md#L9-L38)
   - [Commission calculation, payment asset and discount conditions](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/faqs/commission_faq.md#L149-L218)
2. [Binance Spot account commission rates](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L4971-L5017)
3. [Binance Spot user data stream](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/user-data-stream.md#L100-L126)
4. [Binance Spot account trade list](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L4745-L4797)
