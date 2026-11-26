# Local order book: data integrity and visible liquidity

Teaching examples for Binance Spot. Market parameters in the examples are hypothetical. Use paper exercises or saved teaching data only, without connecting to an exchange or using real API keys, accounts or orders. This is not authorization for real trades.

## 1. Snapshots and updates are different
A REST snapshot contains bid and ask levels and the lastUpdateId. The Diff. Depth Stream carries level changes; U and u identify the first and last updates covered by an event. E is the event time and s identifies the symbol. Local reconstruction requires aligning a snapshot and feed for the same symbol, rather than choosing whichever message looks newer by time alone [1, 2].

An updated level's quantity is an absolute replacement. Do not add it to the previous quantity. Zero removes the level [1]. A change in displayed quantity alone does not establish which individual order filled or was canceled, who acted, or their intent.

## 2. Recognizing a missing update
The documented Binance Spot startup procedure buffers events before obtaining a snapshot. If the snapshot precedes U of the first received event, it is obtained again. Buffered events already covered by the snapshot (u no greater than lastUpdateId) are excluded; in the pinned edition read for this draft, the snapshot ID must fall within the U–u range of the first remaining event [1]. If this condition is unverified, the teaching model leaves initialization on HOLD; it does not substitute the rule for updating an already aligned book. Do not transplant initialization rules from older documentation or different products.

After alignment, let S be the current local book update ID. The documentation says to disregard an event with u below S. If U exceeds S + 1, updates are missing: discard the local representation and resynchronize [1]. This does not mean the market disappeared; the current state of the local representation is unknown.

| Teaching event | S before event | Outcome |
|---|---:|---|
| Initial snapshot 101; first aligned event U=100, u=102 | 101 | Apply level values, S=102 |
| Next event U=103, u=104 | 102 | Apply values, S=104 |
| Late event U=100, u=102 | 104 | Ignore, S=104 |
| Next event U=106, u=107 | 104 | Gap: INVALID, resynchronize |

The table is a paper example, not a complete connection algorithm. Level values after the first event correspond to its final update ID. Under an additional conservative teaching policy, distinguish an exact repeat of an observed event from a conflicting event with the same ID: absolute values in an exact repeat must not be accumulated, and a conflict must not be treated as a confirmed book. This is a local safeguard, not a distinct Binance error code.

## 3. Validate inputs before using the book
An event sequence may have no gap while the data themselves are unusable. The teaching model checks message shape, symbol, session identity, update ID range, price and quantity before changing levels. Both sets of changes (bids and asks) are parsed before application; corruption of either must not leave a partially modified book.

| Teaching input | Local outcome |
|---|---|
| Exact repeat of an already applied event | Do not accumulate absolute quantities |
| Conflicting event with the same final update ID | INVALID; do not use the copy as current |
| Missing symbol or session, malformed level array | Do not apply changes; INVALID |
| After the proposed update, the best known bid is no lower than the best known ask | INVALID under the conservative teaching policy |
| IDs are continuous, but freshness is unverified | HOLD for use as current state |

Rejecting crossed or locked known best prices is a local safeguard for this model, not a claim about a universal exchange invariant or the cause of such a snapshot. Levels retained after an error are diagnostic only; reuse requires verified alignment. Individual events and snapshots do not establish completeness.

## 4. How much liquidity is actually visible
The 24 November 2026 changelog announces additional depth levels. The pinned REST description read for this draft specifies a maximum limit of 7500; the startup example uses 5000. This is a documentation observation, not a test of the parameter's live availability. Do not request maximum depth merely because it is documented: request weight depends on depth [2, 3].

Even a correctly synchronized copy has an initial coverage boundary: levels outside the snapshot may remain unknown until corresponding updates arrive [1]. Do not label unseen quantities as zero or describe the copy as the complete order book.

## 5. Paper example: best quotes do not guarantee execution price
In a separate hypothetical snapshot, the best bid is 100.00 and best ask is 101.00. Only the following ask levels are visible:

| Price | Visible quantity | Teaching cost of the entire level |
|---:|---:|---:|
| 101.00 | 0.40 | 40.40 |
| 102.00 | 0.60 | 61.20 |

If those levels remain unchanged, hypothetical consumption of exactly 1.00 base units costs 101.60, for an average price of 101.60 before fees. The difference from the starting best ask is 0.60 per unit. For 1.20 units, the visible data are insufficient: the final 0.20 cannot be priced using an invented next level. Do not treat that remaining amount as zero or guaranteed available.

This is a static calculation over two supplied levels, not a slippage forecast. Orders can change between a snapshot and any real execution. Fees, instrument constraints, order queues and other participants' reactions are excluded.

## 6. What the checks establish
- Sequence continuity and freshness are distinct. Continuous update IDs do not establish the absence of delay. An acceptable data-age threshold depends on the task and verified conditions, not a universal number.
- A connection loss, update gap, unknown symbol or unverified freshness requires withholding use of this copy as confirmed current state. Do not mix it with a new session without alignment.
- Record synchronization state, event and receipt times, last applied update ID and known depth separately. SYNCED_SUBSET, INVALID and HOLD are proposed local teaching-model labels, not Binance statuses. UNKNOWN describes unknown data state, not a separate confirmed exchange status.
- A displayed book does not confirm execution of one's own order. Order and fill evidence is required; an educational liquidity calculation cannot replace it.

The initial teaching checks passed 20 of 20 sequence cases and 6 of 6 visible-liquidity calculations. On 12 additional boundary scenarios, the original model met only 1 of 12 new criteria. There were 11 gaps against these extra requirements; the corrected candidate preserved the exact results of the previous 26 checks and passed 12 of 12 new cases. These are bounded tests of one teaching model, not findings of Binance defects or independent acceptance. A live stream, asynchronous buffering, reconnection and market-data freshness were not tested.

This material is not investment advice or authorization to trade. Results concern separate teaching scenarios, not a running bot.

## Sources
1. [Binance Spot WebSocket streams](https://developers.binance.com/en/docs/products/spot/web-socket-streams)
   - [depth event fields](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-streams.md#L743-L774)
   - [synchronization and coverage](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-streams.md#L776-L809)
2. [Binance Spot REST API](https://developers.binance.com/en/docs/products/spot/rest-api)
   - [depth endpoint and request weights](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L1073-L1116)
3. [Binance Spot changelog](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/CHANGELOG.md#L5-L10)
