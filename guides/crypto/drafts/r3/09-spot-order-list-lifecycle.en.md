# Linked orders: list state is not execution

**DRAFT_HOLD.** Teaching material; no request or trading permission.

## 1. Three structures, distinct states
In Binance Spot, OCO links 2 orders: activation of one cancels the other. OTO has a working and a pending order; the pending order enters the book only after the working order fills completely. OTOCO has 3 orders: a working order and a pending OCO pair subject to the same full-fill condition [S1]. This describes lifecycle behavior, not a recommendation to use a particular structure.

| Structure | What must be distinguished |
|---|---|
| OCO | Two linked orders, their activation, execution and termination |
| OTO | Working order and pending order |
| OTOCO | Working order and pending OCO pair |

Do not infer actual active quantity from the number of list members. Placement conditions, applicable filters and individual order states require separate verification.

## 2. Full fill and pending order
A hypothetical OTO working order has original quantity 5 and confirmed execution 2. Unfilled quantity is 5 - 2 = 3. While the working order is only partially filled, the full-fill condition is not met. This does not establish the current state of the pending order without an observation of that order.

OTO documentation describes a boundary case: the working order immediately becomes FILLED while the placement response still shows the pending order as PENDING_NEW [S1]. Do not interpret that response as confirmation that the pending order is active. Establish its subsequent state with separate evidence. Do not place a duplicate based on this response alone.

## 3. List state, order state and execution

| Field or observation | Meaning and limit |
|---|---|
| listStatusType | Type of list state or update |
| listOrderStatus | State of the list as a whole |
| ALL_DONE | List is no longer active; not proof of no trades |
| PENDING_NEW | Pending phase of an order, not confirmation of an active order |
| executionReport: X, l, z | Order status, last and cumulative execution |
| listStatus: g, O | List identifier and member-order details |

Binance Spot documents listStatus notifications in addition to executionReport for linked orders [S2, S3]. Retain the venue, account, symbol, orderListId and individual orderId association. Request identifiers and client aliases do not substitute for this association. Member identities in a list-query response do not provide the full execution history [S1]. No atomic common snapshot of the two notification types or universal delivery ordering guarantee is assumed.

## 4. Cancellation and state recovery
The reference describes cancellation of the entire list when a member is canceled [S1]. A cancellation timeout, however, does not establish its outcome. Confirmed cancellation also does not erase prior executions.

| Observation | Proposed teaching response |
|---|---|
| ALL_DONE, execution details unavailable | HOLD: reconcile members and executions |
| Working FILLED, pending PENDING_NEW in placement response | HOLD: separately establish subsequent state |
| List absent from open lists | HOLD: absence does not establish zero execution |
| Event from another order or account | HOLD: establish membership before combining |
| Repeated cumulative execution | Check identity; do not add it again |

Hypothetical OCO example: confirmed execution on one order equals 1.2, and the other is canceled without execution. With consistent evidence the list can be ALL_DONE while executed quantity remains 1.2. This is a state example, not a promised execution path. Balance and fee reconciliation remain separate.

## 5. Scope
HOLD is a local teaching state. This example does not define a strategy, protection against losses, activation timing, a complete supported-type map or actual order parameters. In the pinned snapshot REST describes OTOCO, whereas the ContingencyType enumeration lists OCO and OTO; do not infer a required field value in every response from a structure name [S1, S3]. Verify the contract separately before implementation. All numbers are hypothetical; the material authorizes no requests, cancellation, replacement orders or trades.

## 6. Teaching validation: what exactly is established

Two versions of an offline linked-order snapshot reconciliation model accompany this guide. The original set of 32 scenarios checks list membership, status consistency, cumulative execution, cancellation and the working-order full-fill condition. R2 adds 34 input-contract boundary checks. All 66 scenarios were reproduced with their expected results: 54 HOLD and 12 PAPER_LIST_RECONCILED_SUBSET. On the new cases, the original version produced 9 exceptions and 7 unsupported positive results where the expanded contract requires HOLD.

| Scenario | R2 teaching-model result |
|---|---|
| L02: ALL_DONE; one order canceled with cumulative execution 1.2 | PAPER_LIST_RECONCILED_SUBSET: execution 1.2 retained |
| L11: common observation boundary not corroborated | HOLD: OBSERVATION_BOUNDARY_UNKNOWN |
| L28: working FILLED and pending PENDING_NEW in response | HOLD: PENDING_AFTER_FULL_NEEDS_REFRESH |
| B05: unknown-cancellation-outcome flag is null | HOLD: EVIDENCE_FLAG_SHAPE |
| B28: PENDING_NEW for an ordinary OCO member | HOLD: PENDING_ROLE_OUTSIDE_SUBSET |
| B32: records for the same list members reordered | PAPER_LIST_RECONCILED_SUBSET: same projection |

R2 requires an exact inventory of normalized fields, Boolean flags, nonempty bounded identifiers and corroborated membership for every order. At most 3 role bindings and 12 observation records are admitted; decimal strings have teaching-specific length and precision limits. These bounds are not Binance limits. The model does not decode raw JSON bytes, prove the reliability of flags, reconstruct event history or reconcile actual balances, fees or individual trades.

Arithmetic unfilled quantity does not mean available order quantity. Even PAPER_LIST_RECONCILED_SUBSET describes only consistency of the stipulated observation subset. The conditional PENDING_NEW restriction and HOLD for nonzero execution on both pair sides are not universal statements about exchange behavior. No result authorizes external action; independent review has not occurred.

## Sources

- [S1: OCO](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L3311-L3327)
- [S1: OTO](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L3445-L3462)
- [S1: OTOCO](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L3587-L3598)
- [S1: Cancellation](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L4047-L4071)
- [S1: List query](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L4569-L4612)
- [S1: Open lists](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L4695-L4727)
- [S2: Individual order fields](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/user-data-stream.md#L99-L118)
- [S2: List notification](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/user-data-stream.md#L205-L238)
- [S3: Order and list enums](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/enums.md#L45-L80)
