# Request limits and safe backoff

**DRAFT_HOLD.** Paper teaching material; no request or trading permission.

## 1. Two separate controls
Binance Spot REST describes RAW_REQUESTS, REQUEST_WEIGHT and ORDERS limits in exchangeInfo [S1]. Requests carry different weights; X-MBX-USED-WEIGHT-(intervalNum)(intervalLetter) reports used weight for the IP. The weight limit belongs to the IP rather than an individual API key. Multiple clients sharing a public IP can consume the same budget.

The ORDERS counter belongs to the account (including a subaccount), not the IP; separate keys and interfaces can share the counter [S1, S2]. X-MBX-ORDER-COUNT-(intervalNum)(intervalLetter) helps observe it in successful order-placement responses; the header is not guaranteed in unsuccessful responses. An absent header does not imply zero consumption.

Do not substitute the number of open orders or an estimate of market exposure for ORDERS. An order's first fill can decrement the counter; the amount follows exchange rules, and an update may be delayed. Cancellation or expiry alone does not decrement the counter [S2]. A filled order can nevertheless change exposure.

## 2. Responding to throttling
HTTP 429 denotes a rate-limit violation; exceeding ORDERS may also produce 429 with code -1015. Continuing requests after an IP-limit violation can result in an HTTP 418 ban. Spot REST documentation describes Retry-After in seconds for these responses [S1, S2].

Proposed client rule: on 429, suspend affected requests, classify the restriction using available evidence, and observe the indicated waiting interval; if its scope is unclear, do not presume other requests are permitted. On 418, maintain the affected IP hold until the indicated period expires. Do not use additional keys or IPs to circumvent limits.

If Retry-After is missing, invalid or contradictory, do not substitute an arbitrary interval as exchange-confirmed. Retain HOLD and clarify the state through an approved safe process. A positive waiting interval is not a guarantee of admission when it expires: account for other limits, evidence freshness and available budget. Local elapsed time may be measured monotonically from receipt, but must not be represented as the exchange clock.

## 3. Paper calculation (hypothetical numbers)
Suppose a teaching IP budget is 100 weight units, observed consumption is 90, and the intended request costs 15. Then 90 + 15 = 105, above 100. The local guard does not admit that request. Independently assume a teaching ORDERS limit of 4 and an observed counter of 3. Room for one more order in that counter does not make the IP budget sufficient.

If the teaching counter is 3 and one unfilled order is cancelled, it cannot automatically be recorded as 2. Cancellation does not decrement ORDERS. If another order subsequently receives its first fill, the observed value still cannot be guessed without fresh evidence. All numbers here are hypothetical, not Binance limits.

## 4. Decision before another attempt

| Event | Proposed paper-simulation response |
|---|---|
| Next request weight exceeds remaining IP budget | HOLD; do not send |
| HTTP 429, known restriction scope | HOLD affected scope; observe Retry-After |
| HTTP 429, unknown restriction scope | HOLD both potential scopes until clarified |
| HTTP 418 | HOLD IP; do not bypass ban |
| No reliable Retry-After | HOLD; do not invent an exchange deadline |
| Order cancelled without fills | Do not decrement ORDERS manually |
| First fill, counter not yet updated | Do not assume immediate budget availability |
| HTTP 5xx or uncertain placement outcome | UNKNOWN original request state; no blind replacement |

Rate limiting and actual order state are separate variables. Even after a waiting period ends, an earlier ambiguous order can remain unresolved. Documentation [S1] separately warns that server errors may leave the execution outcome uncertain. In simulation, retain the intent and original order identifiers; reconcile the state before considering another action. HOLD and UNKNOWN in this article are teaching states of local control, not exchange statuses.

## 5. Multiple windows and shared budgets

When a limit type has multiple time windows, check every applicable window. Bind observations to the correct IP or account, configuration and observation time. A missing window does not imply available capacity.

Paper example: with consumption of 90 and a limit of 100, two requests weighing 6 each separately project to 96. Together they project to 90 + 6 + 6 = 102. The whole batch receives HOLD. RAW_REQUESTS and ORDERS are checked separately. All figures are hypothetical.

| Paper condition | R2 outcome |
|---|---|
| Requests fit separately but not together | Batch HOLD |
| Applicable window missing | HOLD |
| Earlier submitted request belongs to the window but is not yet included in the counter | Add its cost |
| Request already included in the counter | Do not add twice |
| Membership, inclusion or coverage unknown | HOLD |

Establish pending-operation membership and inclusion separately for every window. The model computes a batch projection rather than executing concurrent requests. Locks, distributed reservation and atomic submission are not implemented; another client can change consumption after the snapshot.

## 6. Backoff expiry and renewed observation

Paper monotonic time scale: a restriction is received at 108, Retry-After is 5 seconds, and the calculated boundary is 113. The last observation at 105 does not become fresh when the interval expires. Conservative R2 policy requires observation for the affected applicable scope at or after 113.

| Paper condition | R2 outcome |
|---|---|
| Backoff remains active | HOLD |
| Backoff elapsed, observation predates the calculated boundary | HOLD pending refresh |
| Observation refreshed and all other checks pass | PAPER_BATCH_ELIGIBLE |
| Previous order outcome unknown | HOLD the new order |

This is a local teaching policy, not a Binance rule or an instruction to send a request. PAPER_BATCH_ELIGIBLE means passing the stipulated checks, not request or trading permission. Coverage, freshness and membership of observations are assumed in the fixtures, not established on a real account.

## 7. Scope
This is an engineering draft for paper simulation. It specifies no live limit values, retry latency, execution guarantee, profitability or trading permission. Any implementation requires separate checks of current configuration, permissions and recovery rules.

## Sources

- [S1: Binance Spot REST](https://raw.githubusercontent.com/binance/binance-spot-api-docs/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md)
- [S2: Binance Spot unfilled order count](https://raw.githubusercontent.com/binance/binance-spot-api-docs/3cdca01b7241b5539a8691a259a95cfeb21c256b/faqs/order_count_decrement.md)
