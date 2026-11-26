# Self-trades and prevented execution

**DRAFT_HOLD.** Paper teaching material; no request or trading permission.

## 1. What STP does
Self-trade prevention (STP) is a mechanism for preventing opposing orders from matching against one's own orders. Binance Spot compares orders within the same account or across accounts sharing an assigned tradeGroupId [S1]. A value of -1 means that no group is assigned, not that all such accounts form a shared group. This does not establish the absence of self-trades across multiple systems.

Check the symbol-specific allowed and default modes: allowedSelfTradePreventionModes and defaultSelfTradePreventionMode [S1]. Do not carry settings from one instrument over to another. This article does not recommend selecting a mode, disabling STP or testing it with actual opposing orders.

## 2. Modes and prevented-quantity scope

| Mode | Meaning within the documented scope [S1] |
|---|---|
| NONE | STP does not prevent the match |
| EXPIRE_TAKER | The taker order's remaining quantity expires |
| EXPIRE_MAKER | The potential maker order's remaining quantity expires |
| EXPIRE_BOTH | Both orders' remaining quantities expire |
| DECREMENT | Both orders accumulate the prevented matching quantity; the smaller exhausts its remainder |
| TRANSFER | Special mode; asset transfers can occur across accounts in the same group |

Behavior generally depends on the taker mode. In the cited documentation, TRANSFER requires both orders to specify that mode; when only the taker specifies it, DECREMENT applies. The mode actually applied may differ from the mode specified on a particular order. When present, effectiveSelfTradePreventionMode and eV help distinguish these cases [S1, S2]. Their absence does not mean NONE.

Do not infer unchanged balances merely from the absence of a trade: for TRANSFER, the documentation describes movement of the prevented quantity and its notional between accounts in the same group. Even under ordinary modes, changes in locked funds need separate reconciliation.

## 3. Three quantities instead of a single remainder
For an open order expressed in base-asset quantity, documentation [S1] relates the original, executed and prevented quantities.

Hypothetical example without TRANSFER: original quantity 5, actual execution 1.2, prevented quantity 0.8. Quantity available for further execution is 5 - 1.2 - 0.8 = 3.0. Executed quantity remains 1.2, not 2.0. Prevented quantity is not a fill.

If a subsequent event reports cumulative prevented quantity A = 1.1 and last prevented quantity B = 0.3, with an established sequence it is consistent with previous A = 0.8. Do not add both values to previous A. This is a synthetic example, not a guarantee of event delivery order.

The remainder formula applies to an open order in the stated context. After termination, do not label the arithmetic remainder as available for execution. Reconcile the status and history.

## 4. Distinguishing records

| Observation | Proposed paper-simulation check |
|---|---|
| executionReport with execution type TRADE_PREVENTION | Separate the prevented event from a trade execution |
| Fields A and B | Distinguish cumulative quantity from the last event's quantity |
| Fields l and z | Reconcile last and cumulative executed quantity separately |
| EXPIRED_IN_MATCH status | Do not assume all earlier executions were zero |
| Repeated record or conflicting cumulative values | HOLD until identity and consistent history are established |
| TRANSFER or unknown mode | HOLD for the simplified model; reconcile asset movements separately |

Proposed control: bind records to the account, symbol, order identifier and available event identifiers. Do not confuse preventedMatchId with tradeId; a single prevented match may affect both orders. The REST reference [S3] documents GET /api/v3/myPreventedMatches and combinations of symbol with preventedMatchId or orderId for lookup. However, the FAQ [S1] at the same snapshot uses a different path. This is a documentation discrepancy, not confirmation that both routes work. Verify the current contract separately before implementing; no account requests were made here.

## 5. Reconciling both sides of a prevented match

One preventedMatchId does not mean one order. Reconciliation requires an established association with the symbol, account and identifier of each order, as well as its maker or taker role. For distinct accounts, an assigned shared group must also be established. A value of -1 on both accounts does not establish a shared group.

Paper example: taker original quantity is 5, executed 1.2, previously prevented 0.8; remainder 3. Maker original quantity is 2, executed 0, prevented 0; remainder 2. Under the stipulated DECREMENT match, 2 is prevented on each side. Afterwards the taker's cumulative prevented quantity is 2.8 and its available remainder is 1; the maker's cumulative prevented quantity is 2 and its order is terminated. Executed quantities remain 1.2 and 0.

| Paper reconciliation condition | Expected outcome |
|---|---|
| DECREMENT, both sides bound to the same match | Reconcile equal increases in prevented quantity |
| EXPIRE_TAKER | Reconcile expiry of the taker remainder without attributing prevented quantity to the maker |
| EXPIRE_MAKER | Reconcile expiry of the maker remainder without attributing prevented quantity to the taker |
| EXPIRE_BOTH | Reconcile expiry of both remainders, which can differ |
| One side lacks corroboration | HOLD |
| TRANSFER applies to the match | HOLD in the simplified model; reconcile asset movements separately |

The unchanged-side observation in these exercises is supplied separately. This does not assert that the exchange must emit a special event for an unchanged order. Sequence, membership and completeness of records must be established.

## 6. Why individually consistent records do not establish pair consistency

In the same baseline example, the taker reports an increase in prevented quantity of 0.3, while the maker reports 2. Each order's arithmetic may be internally consistent when considered separately. But under an established shared DECREMENT match, those increments are inconsistent. R2 returns HOLD without a reconciled projection.

If the taker specifies TRANSFER and the maker specifies another mode, documentation [S1] describes application of DECREMENT. If both specify TRANSFER, the R2 teaching model stops even for the same account: this is a model limitation, not an exchange prohibition of the mode. PAPER_PAIR_RECONCILED_SUBSET means only consistency of the stipulated quantity observations. It does not establish complete execution history, asset movements, commissions or locked-fund state.

## 7. Scope
HOLD is a local teaching state of uncertainty, not an exchange status. The model does not establish event delivery, complete history, permission to repeat an order, accurate real commission accounting or transfers between accounts. All quantities are hypothetical; the article makes no profitability promises and authorizes no trades.

## Sources

- [S1: Binance Spot STP FAQ](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/faqs/stp_faq.md#L13-L162)
- [S2: Binance Spot user data stream](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/user-data-stream.md#L86-L179)
- [S3: Binance Spot REST Query Prevented Matches](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L4850-L4899)
