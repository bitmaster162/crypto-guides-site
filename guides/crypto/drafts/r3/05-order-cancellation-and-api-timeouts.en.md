# Why a timeout does not prove cancellation

Sending a request, receiving a response and an actual order-state change are distinct events. After a connection failure the client may not know whether the exchange processed the request. A blind replacement can create unintended exposure.

## 1. What the exchange confirms
Binance Spot documents an uncertain execution outcome for -1007. An HTTP 5xx response does not establish that the operation failed to execute. If the user data stream provides no confirmation, reconcile the status separately [1]. The order.status method returns individual order data, including executedQty and order status; executionReport carries order updates [2, 3]. The WebSocket request ID is distinct from the order ID. When order.status is queried with both orderId and origClientOrderId, Binance checks that they match. For some historical orders, a negative cummulativeQuoteQty indicates unavailable data, not zero volume [2].

**UNKNOWN describes the client's knowledge, not an exchange order status.** Keep the last confirmed state separate. A cancellation timeout does not turn NEW into CANCELED; a missing submission response does not imply REJECTED. Conflicting evidence leaves the current outcome unresolved.

## 2. Partial fills and cancellation of the remainder
Hypothetical example: a buy order for 1 unit fills 0.4, and the remaining 0.6 is canceled. The executed quantity remains, while the open quantity is 0.0. Before considering fees and other operations, the completed purchase of 0.4 does not disappear. Canceled unfilled quantity is different from remaining open quantity.

Associate events with the venue, account, instrument and exchange orderId. Preserve the mapping to client identifiers: upon successful cancellation in Binance cancelReplace, cancelNewClientOrderId, when supplied, replaces the canceled order's clientOrderId; newClientOrderId specifies the client ID for the new order. The canceled order's old client ID can be reused [5]. A repeated report of cumulative fill 0.4 is not another purchase of 0.4. Do not reduce a confirmed filled quantity merely because a message arrives late. Unproven event ordering or incompatible terminal states require reconciliation. An empty open-order list does not establish that no trade occurred. If the state of any tracked order remains unresolved, a confirmed-open count of 0 does not establish that no orders remain open.
## 3. Replacement and emergency cancellation
Binance Spot REST documents HTTP 409 for partial cancelReplace success, with failed cancellation and successful placement as its general-information example [1]. The WebSocket Trade documentation also distinguishes cancellation and placement outcomes [5]: the original cancellation can fail while the new order is placed, or cancellation can succeed while placement fails. Reconcile cancelResult and newOrderResult separately. Do not assume the successful operation is rolled back. A WebSocket response status field is not an HTTP transport code. Outcomes depend on the selected mode and applicable limits. In the documented case of newOrderResult: NOT_ATTEMPTED, the unfilled order count increases by 1 [5]. This does not establish that a new order was placed. Do not treat that counter as the number of confirmed open orders.

Kraken Spot REST provides CancelAllOrdersAfter, an exchange-side order cancellation timer. On expiry, client orders are canceled and the timer remains disabled until rearmed [4]. Timer expiry alone is not an observed confirmation of each individual order state. The mechanism cannot guarantee the absence of fills or losses. The documentation warns of order cancellation when the matching engine returns from downtime if the timer was enabled; this is not evidence of each order's state during the outage. A local client timer is not a substitute for exchange evidence [4].

## 4. Synthetic-event checks

| Scenario | Observable requirement |
|---|---|
| Submission or cancellation timeout | UNKNOWN; do not invent a terminal status |
| Partial fill and cancellation of remainder | Preserve fill 0.4 with open quantity 0.0 |
| Repeated cumulative-fill report | Do not double-count executed quantity |
| Partial cancelReplace success | Reconcile both operation results separately |
| Conflicting or missing evidence | Do not assert a definite current outcome |
| Exchange timer expires | Reconcile orders and trades; do not promise zero risk |
| Old event repeated after a timeout | Do not treat repetition as proof of a fresh state |
| Fractional fill of 0.04 out of 1 | Do not round it to 0.0; open quantity is 0.96 after a confirmed partial fill |
| Conflicting states or identifiers | Keep the conflict separate from confirmed facts |

Two separate teaching models initially passed 12 of 12 and 10 of 10 synthetic cases. However, an expanded set of 9 cases exposed 7 gaps against the additional requirements: repeated and stale events, quantity precision, consistency of status and filled quantity, and confirmation of client identifiers. A separate corrected teaching candidate then reproduced the results of the 22 original cases and satisfied all 9 additional criteria.

This illustrates why a successful limited test does not prove system safety. Event-ordering rules and valid states are defined for the teaching model, not established for every exchange API. The models cannot send orders; neither independent review nor actual-bot testing has occurred.

This material explains engineering risks, not a trading strategy or universal settings. Financial risks remain; it is not investment advice.

## 5. Sources

1. [Binance Spot REST general information](https://developers.binance.com/en/docs/products/spot/rest-api)
   - [Pinned evidence 1](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L118-L142)
2. [Binance Spot WebSocket API Account, Query order](https://developers.binance.com/en/docs/catalog/core-trading-spot-trading/api/ws-api/account)
   - [Pinned evidence 1](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-api.md#L180-L184)
   - [Pinned evidence 2](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-api.md#L6949-L6990)
3. [Binance Spot User Data Streams, Order Update](https://developers.binance.com/en/docs/products/spot/user-data-stream)
   - [Pinned evidence 1](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/user-data-stream.md#L84-L92)
4. [Kraken Spot REST Cancel All Orders After X](https://docs.kraken.com/api-reference/trading/cancel-all-orders-after-x)
5. [Binance Spot WebSocket API Trade, Cancel and replace order](https://developers.binance.com/en/docs/catalog/core-trading-spot-trading/api/ws-api/trade)
   - [Pinned evidence 1](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-api.md#L4369-L4377)
   - [Pinned evidence 2](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-api.md#L4385-L4421)
   - [Pinned evidence 3](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-api.md#L4593-L4613)
