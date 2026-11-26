# Spot: recovering account state after a stream interruption

Engineering reliability education. This guide concerns ordinary spot balances and fills, not margin positions, derivatives, SOR or complex order lists. All numbers are hypothetical. Reconciliation is neither a trading signal nor permission to resume trading.

## 1. Three representations of state are not interchangeable

The Binance Spot User Data Stream communicates account and order changes [1]. REST snapshots and trade history can provide additional evidence [2–4]. Balance state, order state and an economic movement ledger answer different questions.

| Evidence | Meaning | Does not establish |
|---|---|---|
| outboundAccountPosition, B[].a/f/l | Free and locked balance values for listed assets | Complete account asset inventory |
| balanceUpdate, a/d/T | Balance change from deposits, withdrawals or inter-account transfers; d is a delta | New absolute balance, unique delivery |
| executionReport, i/x/X/l/z/t | Order ID, execution type, status, last and cumulative fill, trade ID | Complete history after a gap, absence of other account changes |
| GET /api/v3/account | Account information and balance snapshot; account for request parameters | One atomic boundary shared by all other requests and events |
| GET /api/v3/openOrders and /api/v3/order | Open orders and a particular order's state | That an order absent from the list necessarily filled |
| GET /api/v3/myTrades | Fills for a particular account and symbol | Completeness beyond the requested pages and scope |

For example, outboundAccountPosition may list only ETH in B. Do not replace the entire balance map or set omitted USDT to zero. Use absolute f/l values only within verified freshness for that asset. The externalLockUpdate event concerns locking or unlocking part of a Spot wallet through an external system [1]; its delta alone does not establish the complete new free and locked balances.

## 2. Establish scope and evidence first

After disconnection or subscription termination, treat the local projection as unconfirmed. Even a newly successful subscription does not establish that missed events have been recovered. This is a proposed control rule, not an exchange guarantee.

- Record the venue, environment, account, symbols, subscription and its local connection epoch. Associate the subscription ID with its account within the connection context, not as a globally unique account ID.
- Preserve the last confirmed snapshot and journal, mark the gap and do not substitute zero for unknown data. Keep new state-dependent actions blocked.
- In the teaching workflow, buffer the reconnected stream. Consider the account snapshot, open orders, individual order lookup and relevant trade history separately. This describes reconciliation, not instructions to execute requests against a real account.
- For every observation, retain provenance, requested range, send/receipt times, timestamp unit, availability and completeness evidence. Do not treat local receipt time as an exchange sequence number.
- An order's absence from openOrders has several explanations. Obtain a verified state and, for a fill, corresponding history records. Do not substitute an assumed fill or cancellation.

The documentation describes asynchronous data retrieval and different sources: Matching Engine, Memory and Database [2]. Event E, account update u, transaction or clearance T and snapshot updateTime have different meanings. Equal timestamps do not establish a common sequence or prove no gap. If the boundary between snapshot and stream is not verified, use HOLD rather than automatically adding all received deltas.

## 3. Paper example: partial update and double counting

Consider a hypothetical state without commissions, transfers between account types or other movements except those explicitly specified. Do not add quantities of different assets.

| Observation | ETH free/locked | USDT free/locked |
|---|---|---|
| Last confirmed snapshot | 2 / 0 | 100 / 20 |
| Partial absolute update; B contains ETH only | 3 / 0 | not represented |
| Candidate local projection after update | 3 / 0 | 100 / 20, last known |

The last row does not establish that USDT was confirmed at the newer event time: it has its own freshness. Now a separate balanceUpdate reports d = +10 USDT, and a later account snapshot returns USDT free 110, locked 20. If that snapshot already includes this movement, adding its delta again creates an incorrect free balance of 120. If inclusion has not been established, neither can the delta simply be declared processed.

Maintain two separate views: observed current state and the movement ledger. Associating a delta with a snapshot requires evidence that it was included or excluded. Identical event text does not establish that two separate equal movements are one movement.

## 4. Fills: last quantity is not cumulative quantity

The executionReport distinguishes l (last fill) and z (cumulative filled quantity); Z is cumulative quote quantity [1]. Consider a hypothetical ordinary order for 5 units:

| Record | l | z | Status |
|---|---:|---:|---|
| A | 2 | 2 | PARTIALLY_FILLED |
| B | 1 | 3 | PARTIALLY_FILLED |
| replay B | 1 | 3 | PARTIALLY_FILLED |
| C | 2 | 5 | FILLED |

The sum of unique fills A+B+C = 5. Adding cumulative z yields 10 even without the replay; adding every l including the replay yields 6. Deduplicate only using verified fill identity, scoped to venue, environment, account, symbol and the applicable identifiers. An identical identifier with conflicting content requires investigation, not selecting the last received row. A negative or missing trade identifier must not become a universal event key. Cumulative quantity can cross-check the order projection, but does not replace individual fills and their commissions.

If only the last record C is available during reconciliation, z = 5 indicates the accumulated fill for that order. It does not recover the exact history of A and B. Do not conceal gaps with fabricated fills. For ordinary fills, match stream data against myTrades history using verified identity and scope. Do not apply this rule to SOR/allocations, STP or special event types without separate verification.

## 5. Recovery boundary and a safe outcome

The myTrades list is bounded by request parameters and page size; without a suitable constraint it returns recent records, while fromId provides a starting ID boundary. Supported parameter combinations are documented [4]. A page of 1000 records does not by itself establish complete coverage of the selected interval. Retain verifiable evidence for pagination completion and account for asynchronous data sources. Do not claim absence of gaps from consecutive timestamps or an unverified assumption of continuous identifiers.

| Teaching outcome | Condition |
|---|---|
| HOLD | Account scope, freshness, snapshot-stream relationship or required history completeness is unknown, or a conflict exists |
| RECONCILED_SUBSET | Verified limited scope is consistent; sources, boundaries, replays and remaining unknowns are documented |
| REVIEW_REQUIRED | Access, risk, policy and authority for any real actions require separate review |

Even matching successive snapshots cannot exclude intermediate movements that offset one another in the final balance. Balance agreement also does not prove completeness of the trade ledger. RECONCILED_SUBSET is a local teaching label, not a Binance status or trading permission.

Before accepting a limited result, explicitly record: the reconciled scope; sources and ranges used; events that could not be linked; conflict handling; assets, orders and movements still unknown; and who can decide the next step. Consider external locks, commission assets and non-order changes separately. No universal timeout or automatic resumption of trading from a single receipt.

## 6. Agreement with one snapshot does not establish correct ordering

Suppose a confirmed paper snapshot contains 100 free USDT and 20 locked. Assume it is established that a movement of +10 USDT is not yet included in the original snapshot and affects only the free balance. A subsequent absolute update to a free balance of 110 already incorporates that movement.

| Processing order | Intermediate free balance | Result |
|---|---:|---|
| Verified order: delta, then absolute update | 110 | 110 USDT |
| Incorrect order: absolute update, then the same delta | 110 | 120 USDT (double counting) |
| Economic effect order unconfirmed | unknown | HOLD |

Both events may be newer than the initial snapshot. That is insufficient to determine their relationship to each other. Sorting by receipt time or matching exchange timestamps does not recover a verified order. If a delta is already reflected in a later absolute state, applying it again is incorrect.

The R2 teaching model uses a local snapshot identifier, a connection epoch and a verified order of economic effects. These are invented normalized example fields, not Binance fields or guarantees. The snapshot identifier denotes an evidence comparison scope, not an atomic transaction across the exchange. Assigning ranks from arrival order and then treating them as proof is invalid. If confirmation is absent or ordering is contradictory, the model rejects the input rather than guessing a permutation.

A replay of a movement with the same verified identity and effect may be counted once. Two distinct verified movements of equal size remain two movements. For balanceUpdate, the example movement identifier is not a native unique event key. Without identity evidence, use HOLD rather than hashing event text as a substitute for proof.

## 7. Matching fill quantities still do not establish reconciliation

For a hypothetical ordinary order with a specified base-asset quantity, suppose the original quantity is 5 and three confirmed records yield 2 + 1 + 2 = 5. Compare not only the numbers, but also the scope, status, quantity basis and history boundary.

| Scenario | Unique fill total | Order evidence | Teaching outcome |
|---|---:|---|---|
| Complete history in the required scope | 5 | FILLED, original 5 | RECONCILED_SUBSET if other conditions are confirmed |
| Order record from another account | 5 | FILLED, original 5 | HOLD |
| Order record from a different reconciliation boundary | 5 | FILLED, original 5 | HOLD |
| Status contradicts quantity | 5 | FILLED, original 6 | HOLD |
| Canceled order with partial fills | 2 | CANCELED, original 5 | RECONCILED_SUBSET if history and other conditions are confirmed |

CANCELED does not erase completed fills. FILLED in this example requires the executed quantity to equal the verified comparable original quantity. The rule is limited to ordinary orders with a fixed base-asset quantity; quote-sized orders, quantity amendments, allocations and special modes need a separate data contract. Do not turn this teaching check into a universal validator for all orders.

Before accepting bounded reconciliation, verify the scope of every source and membership of fills in the selected history boundary. Even a correct sum does not establish completeness or individual fill membership. R2 checks the order evidence binding to a local boundary but does not establish that every trade belongs to that boundary; this is a separate condition requiring external evidence.

**Practical conclusion:** state reconciliation and completeness of the economic ledger are different checks. Numerical agreement is no substitute for confirmed sources and ranges. Even a positive teaching label does not authorize resuming trading.

## Sources

1. [Binance Spot User Data Stream — event semantics](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/user-data-stream.md#L20-L125)
   - [Stream termination and external lock update](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/user-data-stream.md#L255-L298)
2. [Binance Spot REST API — Data Sources](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L247-L261)
3. [Account snapshot](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L4293-L4355)
   - [Order lookup and open orders](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L4356-L4493)
4. [Account trade list and supported parameters](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L4743-L4780)
