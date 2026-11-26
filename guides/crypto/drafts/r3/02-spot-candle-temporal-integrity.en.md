# Spot candles: closure, availability and temporal integrity

Teaching examples for Binance Spot. Market values and observation times in the examples are hypothetical, not measurements of the live market or latency. Use paper exercises or saved teaching data only, without connecting to an exchange or using real API keys, accounts or orders.

## 1. Different clocks and different evidence
In the Binance Spot candle stream, k.t identifies the start of the interval, k.T its close time, k.x whether the candle is closed, and E the event time [1]. Separately record when your system actually received the message and when the processed data became available to its consumer. Exchange event time does not establish client-side availability time.

For REST data, the documentation describes separate opening and closing times, but the displayed response schema has no x field [2]. Do not carry the WebSocket closure flag over to the REST format without verification. Treating a REST candle as final requires a verified interval boundary, reliable receipt-time context and a justified finality policy for that source. Opening time alone is insufficient.

## 2. Check availability as of the selected time
For a hypothetical UTC 5m candle, use the interval [10:00:00, 10:05:00). In the example's millisecond representation, the last time inside the interval is 10:04:59.999. The final open-candle update was received at 10:04:58.000 with x=false; a message with x=true was received and available for analysis only at 10:05:02.000.

| Analysis time UTC | What the premise establishes | Use the completed candle? |
|---|---|---|
| 10:04:59.000 | Only x=false is available | No |
| 10:05:01.000 | The interval ended, but the final message is not available | No |
| 10:05:02.000 | x=true for the intended candle has arrived and is available | Yes, subject to the remaining checks |

Time alignment and availability are supplied premises here. Check closure, correct identity and absence of conflicts separately. A historical file obtained later does not establish that the final value was known at interval close. For historical modeling without recorded receipt times, explicitly state the availability and delay assumption; this is not proven real-time replay.

## 3. Timestamp units and calendar boundaries
Binance Spot REST defaults to milliseconds in JSON responses; the X-MBX-TIME-UNIT header can select microseconds. WebSocket streams have a separate timeUnit parameter for microseconds [1, 2]. Binance Public Data documentation separately specifies microseconds for Spot data from 01.01.2025 onward [3]. Establish the unit from the particular source, format and version, not the file type or digit count.

| Teaching timestamp | Unit from metadata | UTC |
|---|---|---|
| 1735689600000 | ms | 2025-01-01 00:00:00 |
| 1735689600000000 | us | 2025-01-01 00:00:00 |

To normalize the first timestamp to microseconds, multiply it by 1000. Do not multiply the second again. If the original unit is unverified or conflicts with the format, withhold the record from a verified time series. Retain the original value, unit, normalized value and provenance. Do not lose precision in conversion.

Interval boundaries and timestamp units are different parameters. The documentation describes UTC+8 WebSocket candles and the REST timeZone setting. At UTC+8 the start of 26.11.2026 corresponds to 25.11.2026 16:00 UTC; Unix timestamps are interpreted in UTC, and REST startTime/endTime are interpreted in UTC regardless of timeZone [1, 2]. Do not merge daily candles with different day boundaries simply because their calendar labels match. For weeks and months, verify the particular calendar interval rules rather than substituting a universal duration in seconds.

## 4. Gaps, duplicates and row position
In a paper example, four completed 1m candles are expected to start at 10:00, 10:01, 10:02 and 10:03 UTC. Only 10:00, 10:02 and 10:03 were obtained. Missing 10:01 does not mean zero volume or prove no trades occurred. A task requiring the full interval remains on HOLD until the gap is reconciled or the selection conditions are explicitly changed.

| Observation | Teaching treatment |
|---|---|
| The last row is already confirmed closed | Do not discard it merely because of row position |
| The last row is still forming | Do not use it as completed |
| Same candle key and identical final record | Count once |
| Same key with conflicting final values | HOLD: verify version and provenance |
| An expected interval is missing | HOLD for the complete window, not an invented candle |

Within a particular series, candle identity is tied to open time [2]; a local dataset additionally needs source, product, symbol, interval and calendar-boundary scope. Row position is not evidence of closure. Universally substituting df.iloc[-2] for df.iloc[-1] is therefore incorrect: an export containing only closed candles would lose its last one, and shuffled rows or gaps would remain unresolved. Determine missing bars using expected boundaries and the actual key set, not elapsed polling time alone.

Binance Public Data provides ZIP checksums and warns that archived files can be replaced [3]. A matching checksum establishes correspondence of a particular file version to its checksum record, not time-series completeness, correctness of every trade or historical availability. Retain late corrections with their own date and version rather than silently substituting them for an earlier historical dataset.

## 5. Keep source units, client clocks and data versions separate
The R2 normalized teaching format specifies the source timestamp unit separately from the client receipt and availability timestamp unit. Older teaching records may use an explicitly stipulated common unit. This is a dataset premise, not a way to guess the unit from a number's magnitude. Comparing timestamps requires a comparable time scale and known clock precision.

For example, in one hypothetical record, source event timestamp 1735689660000000 us and receipt timestamp 1735689662000 ms normalize to 2025-01-01 00:01:00 UTC and 2025-01-01 00:01:02 UTC respectively. The difference is 2 seconds on the supplied common time scale. Without established clock comparability this is not a measured transmission delay.

| Condition in the normalized teaching model | Outcome |
|---|---|
| Source and client times use different known units | Normalize each unit separately |
| Observation unit is unknown | HOLD: timestamp provenance is unverified |
| Under the supplied comparable-clock premise, event time is later than receipt | HOLD: investigate the contradiction |
| Final event timestamp precedes the last native timestamp increment within the interval | HOLD under the conservative local policy |
| Record version is supplied but its availability is unverified or conflicts with the claimed record availability | HOLD: verify version evidence |
| A corrected record has known availability later than the analysis time | Exclude it from the earlier snapshot; a later visible conflict requires separate reconciliation |

The last timestamp increment is not the candle duration or a market price tick. With a normalized exclusive right boundary, the teaching model uses 1000 us for a millisecond source representation and 1 us for a microsecond representation. This check does not establish a mandatory Binance message delay. The model contains no measurements of actual clock synchronization, uncertainty tolerances or universal REST finality rules.

Version ID and version availability are additional fields of the local teaching record, not native API fields or proof of archive authenticity. Even if the new version's checksum matches, it does not move its availability into the past. When a later correction becomes available, a conflict with a prior final value is not automatically resolved by choosing the newer file. If the record's own time envelope is malformed, the conservative teaching model may withhold validation of the entire window: the record's position relative to the analysis time is not established.

## 6. The inference boundary of OHLCV
A candle aggregates an interval rather than recording the complete trade sequence or order queue. For example, two hypothetical price paths, 100 → 110 → 90 → 105 and 100 → 90 → 110 → 105, give identical O=100, H=110, L=90, C=105 but different ordering of extremes. With equal aggregate volume, OHLCV can also be identical. If a conclusion depends on the order of price touches, these aggregates cannot establish it uniquely. Do not treat a price touch as a confirmed order fill.

The original teaching model passed 28 of 28 initial scenarios. Rereading the saved additional tests exposed a recording defect in the X12 input: the shared object was changed while preparing X13, so both records received the same analysis time despite different expected results. The first reproduction confirmed only 15 of 16 additional candidate scenarios. A new fixture version restores the intended X12 analysis time: 1 microsecond before the later record becomes available, as in the original K01 example. The previous file is retained, with the change explicitly recorded; expected results and model code are unchanged. After fixture correction, the original model passed 5 of 16 additional scenarios and the candidate passed 16 of 16; all previous 28 results were preserved exactly. A further 4 future-data exclusion and availability-boundary checks also passed. In total, 48 of 48 checks were reproduced for the candidate against the corrected evidence. These are bounded local checks, not an audit of Binance or independent acceptance. The model covers only the supplied fixed intervals 1m, 5m and 1d, UTC and UTC+8 offsets and limited teaching windows; arbitrary calendar intervals, live sources and actual data availability are not tested.

Proposed teaching check: for closed-candle-only analysis, verify series identity, time format and unit, interval boundaries, closure, availability as of the chosen time, completeness of the required window and absence of unresolved conflicts. HOLD and SUBSET_OK are local labels, not Binance statuses. Even SUBSET_OK does not establish fillability or strategy profitability. This material supplies no entry rules, stop parameters, investment advice or authorization to trade.

## Sources
1. [Binance Spot WebSocket time units](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-streams.md#L62-L64)
   - [UTC candles and closure flag](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-streams.md#L353-L415)
   - [Timezone-offset candles](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/web-socket-streams.md#L418-L460)
2. [Binance Spot REST timestamp units](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L103-L105)
   - [REST klines schema and calendar parameters](https://github.com/binance/binance-spot-api-docs/blob/3cdca01b7241b5539a8691a259a95cfeb21c256b/rest-api.md#L1278-L1342)
3. [Binance Public Data Spot timestamp transition](https://github.com/binance/binance-public-data/blob/d571690eb66760763b0bd6e27e8cd35603c7e244/README.md#L7-L24)
   - [ZIP checksums and archive changes](https://github.com/binance/binance-public-data/blob/d571690eb66760763b0bd6e27e8cd35603c7e244/README.md#L88-L101)
